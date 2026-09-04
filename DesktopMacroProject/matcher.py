"""OpenCV template matching plus primary-monitor screenshots.

Clicks are never guessed: a match returns a box; callers click its center.
Default capture is the PRIMARY monitor (game). PackMacro on monitor 2 is ignored.
Missing template files are logged once and skipped (no crash).
"""

from __future__ import annotations

import ctypes
import sys
import time
from pathlib import Path
from typing import Iterable, NamedTuple, Optional, Sequence, Tuple, Union

import cv2
import numpy as np
from PIL import ImageGrab

import config
from paths import writable_path

Region = Tuple[int, int, int, int]
PathLike = Union[str, Path]

_missing_logged: set[str] = set()
_last_miss_log: dict[str, float] = {}
_debug_saved = False


class MatchBox(NamedTuple):
    """Screen-pixel box. Center is (left + width/2, top + height/2)."""

    left: int
    top: int
    width: int
    height: int

    @property
    def center(self) -> tuple[int, int]:
        return (self.left + self.width // 2, self.top + self.height // 2)


class ScoredMatch(NamedTuple):
    box: Optional[MatchBox]
    score: float
    scale: float


def _log_missing(path: Path) -> None:
    key = path.name.lower()
    if key in _missing_logged:
        return
    _missing_logged.add(key)
    config.log(
        f"[matcher] template '{path.name}' not found — skip this check. "
        f"Drop the PNG next to the exe or into DesktopMacroProject."
    )


def log_miss(key: str, msg: str) -> None:
    """Rate-limit 'not found' lines so the UI log stays readable."""
    interval = float(getattr(config, "MISS_LOG_SECONDS", 4.0))
    now = time.monotonic()
    last = _last_miss_log.get(key, 0.0)
    if now - last < interval:
        return
    _last_miss_log[key] = now
    config.log(msg)


def monitor_count() -> int:
    if sys.platform != "win32":
        return 1
    try:
        return int(ctypes.windll.user32.GetSystemMetrics(80))  # SM_CMONITORS
    except Exception:
        return 1


def virtual_origin() -> tuple[int, int]:
    """Top-left of the virtual desktop (may be negative if a monitor is left of primary)."""
    if sys.platform != "win32":
        return (0, 0)
    try:
        user32 = ctypes.windll.user32
        return int(user32.GetSystemMetrics(76)), int(user32.GetSystemMetrics(77))
    except Exception:
        return (0, 0)


def primary_size() -> tuple[int, int]:
    if sys.platform != "win32":
        shot = ImageGrab.grab()
        return shot.size
    try:
        user32 = ctypes.windll.user32
        return int(user32.GetSystemMetrics(0)), int(user32.GetSystemMetrics(1))
    except Exception:
        shot = ImageGrab.grab()
        return shot.size


def _pil_to_bgr(shot) -> np.ndarray:
    rgb = np.array(shot.convert("RGB"))
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)


def grab_primary() -> tuple[Optional[np.ndarray], tuple[int, int]]:
    """Legacy helper. Prefer grab_scan() which locks to Sceptre K25."""
    from monitors import grab_watch_bgr

    got = grab_watch_bgr()
    if got is None:
        return None, (0, 0)
    hay, origin, _mon = got
    return hay, origin


def grab_all_monitors() -> tuple[np.ndarray, tuple[int, int]]:
    """Disabled. Always crop to the watch monitor instead."""
    return grab_primary()


def grab_region(region: Region) -> np.ndarray:
    """Screenshot a box on the virtual desktop. Returns BGR."""
    left, top, width, height = region
    bbox = (int(left), int(top), int(left + width), int(top + height))
    shot = ImageGrab.grab(bbox=bbox)
    return _pil_to_bgr(shot)


def grab_fullscreen() -> Optional[np.ndarray]:
    hay, _origin = grab_scan()
    return hay


def grab_scan() -> tuple[Optional[np.ndarray], tuple[int, int]]:
    """Screenshot ONLY the Sceptre K25 rectangle. Never all monitors."""
    from monitors import grab_watch_bgr

    region = config.SCAN_REGION
    if region is not None:
        return grab_region(region), (int(region[0]), int(region[1]))
    got = grab_watch_bgr()
    if got is None:
        return None, (0, 0)
    hay, origin, _mon = got
    return hay, origin


def hud_present(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    """True if distinctive game HUD is on the watch-monitor screenshot."""
    keys = ("items_bag", "spawn_pack", "spawn_pack_text", "spawn_pack_mark")
    spawn_conf = {
        "spawn_pack": float(getattr(config, "SPAWN_CONFIDENCE", 0.62)),
        "spawn_pack_text": float(getattr(config, "SPAWN_TEXT_CONFIDENCE", 0.70)),
        "spawn_pack_mark": float(getattr(config, "SPAWN_MARK_CONFIDENCE", 0.68)),
    }
    hits = 0
    for key in keys:
        path = config.TEMPLATE_PATHS.get(key)
        if path is None:
            continue
        scored = score_in_image(
            haystack_bgr, path, origin=origin, confidence=spawn_conf.get(key)
        )
        if scored.box is not None:
            hits += 1
    need = int(getattr(config, "HUD_MIN_HITS", 2))
    return hits >= need


def save_debug_capture(haystack_bgr: np.ndarray, origin: tuple[int, int]) -> Path:
    path = writable_path("debug_capture.png")
    cv2.imwrite(str(path), haystack_bgr)
    h, w = haystack_bgr.shape[:2]
    nmon = monitor_count()
    pw, ph = primary_size()
    config.log(
        f"[capture] Sceptre K25 only  "
        f"shot={w}x{h} origin={origin} monitors={nmon} primary={pw}x{ph}  saved {path.name}"
    )
    return path


def maybe_save_startup_debug(haystack_bgr: np.ndarray, origin: tuple[int, int]) -> None:
    global _debug_saved
    if _debug_saved:
        return
    _debug_saved = True
    save_debug_capture(haystack_bgr, origin)
    _log_startup_scores(haystack_bgr, origin)


def reset_debug_flag() -> None:
    global _debug_saved
    _debug_saved = False


def _log_startup_scores(haystack_bgr: np.ndarray, origin: tuple[int, int]) -> None:
    keys = (
        ("spawn-text", "spawn_pack_text"),
        ("spawn", "spawn_pack"),
        ("spawn-mark", "spawn_pack_mark"),
        ("items", "items_bag"),
        ("buy_e", "buy_e"),
        ("warn", "warn_banner"),
        ("okay", "okay_button"),
    )
    for label, key in keys:
        path = config.TEMPLATE_PATHS.get(key)
        if path is None:
            continue
        scored = score_in_image(haystack_bgr, path, origin=origin)
        hit = "FOUND" if scored.box is not None else "miss"
        config.log(
            f"[{label}] {hit} best={scored.score:.2f} scale={scored.scale:.2f}x"
        )


def _load_template(path: Path, grayscale: bool) -> Optional[np.ndarray]:
    flag = cv2.IMREAD_GRAYSCALE if grayscale else cv2.IMREAD_COLOR
    needle = cv2.imread(str(path), flag)
    if needle is None:
        _log_missing(path)
        return None
    return needle


def _to_search_gray_or_bgr(haystack_bgr: np.ndarray, grayscale: bool) -> np.ndarray:
    if grayscale:
        return cv2.cvtColor(haystack_bgr, cv2.COLOR_BGR2GRAY)
    return haystack_bgr


def _scales() -> Sequence[float]:
    scales = getattr(config, "MATCH_SCALES", (1.0,))
    if not scales:
        return (1.0,)
    return tuple(float(s) for s in scales)


def _effective_confidence(needle: np.ndarray, confidence: float) -> float:
    th, tw = needle.shape[:2]
    min_side = min(int(th), int(tw))
    small_side = int(getattr(config, "SMALL_TEMPLATE_SIDE", 40))
    floor = float(getattr(config, "SMALL_TEMPLATE_CONFIDENCE", 0.74))
    if min_side < small_side:
        return max(floor, min(float(confidence), floor + 0.02))
    return float(confidence)


def score_in_image(
    haystack_bgr: np.ndarray,
    template_path: PathLike,
    origin: tuple[int, int] = (0, 0),
    confidence: Optional[float] = None,
    grayscale: Optional[bool] = None,
    max_scale: Optional[float] = None,
) -> ScoredMatch:
    """Best multi-scale match. box is None when below confidence; score is always set."""
    path = Path(template_path)
    if not path.is_file():
        _log_missing(path)
        return ScoredMatch(None, -1.0, 1.0)

    if confidence is None:
        confidence = config.CONFIDENCE
    if grayscale is None:
        grayscale = config.USE_GRAYSCALE

    needle = _load_template(path, bool(grayscale))
    if needle is None:
        return ScoredMatch(None, -1.0, 1.0)

    confidence = _effective_confidence(needle, float(confidence))
    haystack = _to_search_gray_or_bgr(haystack_bgr, bool(grayscale))
    hh, hw = haystack.shape[:2]
    origin_x, origin_y = int(origin[0]), int(origin[1])
    min_side = int(getattr(config, "MIN_TEMPLATE_SIDE", 12))
    scale_cap = None if max_scale is None else float(max_scale)

    best_val = -1.0
    best_scale = 1.0
    best_box: Optional[MatchBox] = None

    for scale in _scales():
        if scale_cap is not None and scale > scale_cap + 1e-6:
            continue
        if abs(scale - 1.0) < 1e-6:
            scaled = needle
        else:
            th0, tw0 = needle.shape[:2]
            new_w = max(1, int(round(tw0 * scale)))
            new_h = max(1, int(round(th0 * scale)))
            if new_w < min_side or new_h < min_side:
                continue
            interp = cv2.INTER_AREA if scale < 1.0 else cv2.INTER_LINEAR
            scaled = cv2.resize(needle, (new_w, new_h), interpolation=interp)

        th, tw = scaled.shape[:2]
        if th > hh or tw > hw:
            continue

        result = cv2.matchTemplate(haystack, scaled, cv2.TM_CCOEFF_NORMED)
        _min_val, max_val, _min_loc, max_loc = cv2.minMaxLoc(result)
        if max_val > best_val:
            best_val = float(max_val)
            best_scale = float(scale)
            best_box = MatchBox(
                origin_x + int(max_loc[0]),
                origin_y + int(max_loc[1]),
                int(tw),
                int(th),
            )
        if best_val >= 0.99:
            break

    if best_box is None or best_val < confidence:
        return ScoredMatch(None, best_val, best_scale)
    return ScoredMatch(best_box, best_val, best_scale)


def match_in_image(
    haystack_bgr: np.ndarray,
    template_path: PathLike,
    origin: tuple[int, int] = (0, 0),
    confidence: Optional[float] = None,
    grayscale: Optional[bool] = None,
) -> Optional[MatchBox]:
    """Find `template_path` inside an already-captured BGR screenshot."""
    return score_in_image(
        haystack_bgr,
        template_path,
        origin=origin,
        confidence=confidence,
        grayscale=grayscale,
    ).box


def match_any_in_image(
    haystack_bgr: np.ndarray,
    template_paths: Iterable[PathLike],
    origin: tuple[int, int] = (0, 0),
    confidence: Optional[float] = None,
    grayscale: Optional[bool] = None,
    region: Optional[Region] = None,
) -> Optional[tuple[MatchBox, str]]:
    """Return the first matching template (name, box) from a whitelist list."""
    search = haystack_bgr
    search_origin = origin
    if region is not None:
        left, top, width, height = region
        x0 = max(0, int(left) - int(origin[0]))
        y0 = max(0, int(top) - int(origin[1]))
        search = haystack_bgr[y0 : y0 + int(height), x0 : x0 + int(width)]
        if search.size == 0:
            return None
        search_origin = (int(left), int(top))

    for template_path in template_paths:
        box = match_in_image(
            search,
            template_path,
            origin=search_origin,
            confidence=confidence,
            grayscale=grayscale,
        )
        if box is not None:
            return box, Path(template_path).name
    return None


def match_template(
    template_path: PathLike,
    region: Optional[Region] = None,
    confidence: Optional[float] = None,
    grayscale: Optional[bool] = None,
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    """Find `template_path` on screen with cv2.matchTemplate.

    Returns the best match box, or None if missing/too large/below confidence.
    Pass haystack_bgr to reuse a screenshot already taken this tick.
    """
    if haystack_bgr is None:
        if region is None:
            haystack_bgr, origin = grab_scan()
        else:
            haystack_bgr = grab_region(region)
            origin = (int(region[0]), int(region[1]))
            region = None

    if region is not None:
        left, top, width, height = region
        x0 = max(0, int(left) - int(origin[0]))
        y0 = max(0, int(top) - int(origin[1]))
        crop = haystack_bgr[y0 : y0 + int(height), x0 : x0 + int(width)]
        if crop.size == 0:
            return None
        return match_in_image(
            crop,
            template_path,
            origin=(int(left), int(top)),
            confidence=confidence,
            grayscale=grayscale,
        )

    return match_in_image(
        haystack_bgr,
        template_path,
        origin=origin,
        confidence=confidence,
        grayscale=grayscale,
    )


def locate_on_screen(
    template_path: PathLike,
    confidence: Optional[float] = None,
    region: Optional[Region] = None,
    grayscale: Optional[bool] = None,
) -> Optional[MatchBox]:
    """OpenCV match first; pyautogui.locateOnScreen is a fallback."""
    box = match_template(
        template_path,
        region=region,
        confidence=confidence,
        grayscale=grayscale,
    )
    if box is not None:
        return box

    path = Path(template_path)
    if not path.is_file():
        return None
    if confidence is None:
        confidence = config.CONFIDENCE
    if grayscale is None:
        grayscale = config.USE_GRAYSCALE
    search = None
    if region is not None:
        search = (int(region[0]), int(region[1]), int(region[2]), int(region[3]))
    try:
        import pyautogui

        found = pyautogui.locateOnScreen(
            str(path),
            confidence=float(confidence),
            region=search,
            grayscale=bool(grayscale),
        )
    except Exception:
        return None
    if found is None:
        return None
    return MatchBox(int(found.left), int(found.top), int(found.width), int(found.height))
