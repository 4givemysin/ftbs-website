"""Two isolated phases — they never share a click loop.

1) run_spawn_until_warn: only Spawn Pack clicks. Stops when WARN is up.
2) run_okay_then_buy: only Okay + buy. Rebellion reads rarity; All packs (test)
   always buys. Then the caller starts spawn again from scratch.

Never click Base / Plaza / Sell / Shop / Conveyor Settings.
"""

from __future__ import annotations

import threading
import time
from pathlib import Path
from typing import Optional

import numpy as np

import config
import raw_mouse
from actions import (
    check_watch_or_stop,
    click_match_center,
    cursor_near,
    halt_requested,
    press_key,
)
from matcher import MatchBox, ScoredMatch, grab_scan, log_miss, match_any_in_image, match_template, score_in_image

STATE_SPAWN = "spawn"
STATE_EVALUATE_BELT = "evaluate_belt"

_state = STATE_SPAWN
_eval_settle_until = 0.0
_eval_deadline = 0.0
_last_spawn_box: Optional[MatchBox] = None
_last_spawn_xy: Optional[tuple[int, int]] = None


def forget_spawn_target() -> None:
    """Drop the last stool so the next spawn pass must find Spawn Pack again."""
    global _last_spawn_box, _last_spawn_xy
    _last_spawn_box = None
    _last_spawn_xy = None


def reset_pack_state() -> None:
    global _state, _eval_settle_until, _eval_deadline
    _state = STATE_SPAWN
    _eval_settle_until = 0.0
    _eval_deadline = 0.0
    forget_spawn_target()


def _pretty(filename: str) -> str:
    stem = Path(filename).stem
    if stem.startswith("rarity_"):
        stem = stem[len("rarity_") :]
    if stem.endswith("_pack"):
        stem = stem[: -len("_pack")] + " pack"
    return stem.replace("_", " ")


def find_warn_banner(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    return match_template(
        config.TEMPLATE_PATHS["warn_banner"],
        region=config.WARN_REGION,
        haystack_bgr=haystack_bgr,
        origin=origin,
    )


def find_okay_button(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    return match_template(
        config.TEMPLATE_PATHS["okay_button"],
        region=config.OKAY_REGION,
        haystack_bgr=haystack_bgr,
        origin=origin,
    )


def warning_active(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    """2D overlay: red WARN banner and/or green Okay. Do not match Dynasty text."""
    return (
        find_warn_banner(haystack_bgr, origin) is not None
        or find_okay_button(haystack_bgr, origin) is not None
    )


def dismiss_warn(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    """Left-click Okay. Does not click Spawn Pack."""
    okay = find_okay_button(haystack_bgr, origin)
    if okay is None:
        config.log("[warn] WARN visible but Okay not located — skip dismiss")
        return False
    xy = click_match_center(okay, pace="normal", soft=True)
    if xy is None:
        return False
    if config.is_all_packs_mode():
        wait_msg = "waiting then buy all-packs (not spawning yet)"
    else:
        wait_msg = "waiting to read rarity (not spawning yet)"
    config.log(f"[warn] okay clicked at {xy} — {wait_msg}")
    time.sleep(float(getattr(config, "WARN_DISMISS_SECONDS", 0.2)))
    return True


def find_pack(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int] = (0, 0),
) -> Optional[tuple[MatchBox, str]]:
    return match_any_in_image(
        haystack_bgr,
        config.TEMPLATE_PATHS["packs"],
        origin=origin,
        region=config.PACK_REGION,
    )


def find_rarity(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int] = (0, 0),
) -> Optional[tuple[MatchBox, str]]:
    return match_any_in_image(
        haystack_bgr,
        config.TEMPLATE_PATHS["rarities"],
        origin=origin,
        region=config.RARITY_REGION,
    )


def find_buy_e(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    if haystack_bgr is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return None
    scored = score_in_image(
        haystack_bgr,
        config.TEMPLATE_PATHS["buy_e"],
        origin=origin,
        confidence=float(getattr(config, "BUY_E_CONFIDENCE", 0.60)),
    )
    if scored.box is None:
        return None
    h, w = haystack_bgr.shape[:2]
    cx, cy = scored.box.center
    rel_x = cx - int(origin[0])
    rel_y = cy - int(origin[1])
    # Belt card only — not left HUD, not PackMacro on the right.
    if rel_x < w * 0.18 or rel_x > w * 0.62:
        return None
    if rel_y < h * 0.22 or rel_y > h * 0.78:
        return None
    return scored.box


def _spawn_search_crop(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
) -> tuple[np.ndarray, tuple[int, int]]:
    """Search the world pedestal only — never left friends/shop or the cash bar."""
    h, w = haystack_bgr.shape[:2]
    x0 = int(w * float(getattr(config, "SPAWN_SEARCH_X0", 0.18)))
    x1 = int(w * float(getattr(config, "SPAWN_SEARCH_X1", 0.82)))
    y0 = int(h * float(getattr(config, "SPAWN_SEARCH_Y0", 0.40)))
    y1 = int(h * float(getattr(config, "SPAWN_SEARCH_Y1", 0.86)))
    x0 = max(0, min(x0, w - 2))
    x1 = max(x0 + 1, min(x1, w))
    y0 = max(0, min(y0, h - 2))
    y1 = max(y0 + 1, min(y1, h))
    return haystack_bgr[y0:y1, x0:x1], (int(origin[0]) + x0, int(origin[1]) + y0)


def _spawn_target_ok(
    box: MatchBox,
    hay_w: int,
    hay_h: int,
    origin: tuple[int, int],
) -> bool:
    """False for friends/0%, cash, shop, or any left/bottom chrome."""
    cx, cy = box.center
    rel_x = cx - int(origin[0])
    rel_y = cy - int(origin[1])
    if rel_x < hay_w * 0.18 or rel_x > hay_w * 0.82:
        return False
    if rel_y < hay_h * 0.38 or rel_y > hay_h * 0.86:
        return False
    if rel_x < hay_w * 0.30 and rel_y > hay_h * 0.66:
        return False
    if box.width < 28 or box.height < 12:
        return False
    return True


def _try_spawn_template(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
    key: str,
    confidence: float,
    max_scale: float,
) -> Optional[ScoredMatch]:
    path = config.TEMPLATE_PATHS.get(key)
    if path is None or not Path(path).is_file():
        return None
    scored = score_in_image(
        haystack_bgr,
        path,
        origin=origin,
        confidence=confidence,
        max_scale=max_scale,
    )
    if scored.box is None:
        return None
    return scored


def score_spawn_pack(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int] = (0, 0),
) -> tuple[ScoredMatch, str]:
    """Pedestal (bottom half) → full 'Spawn Pack' text → partial words.

    via= is pedestal, text, or partial. Shop-card 'Pack' at 2.20x is excluded
    by searching the lower half and capping text/partial scale.
    """
    search, search_origin = _spawn_search_crop(haystack_bgr, origin)
    hay_h, hay_w = haystack_bgr.shape[:2]
    best = ScoredMatch(None, -1.0, 1.0)
    best_via = "none"

    def _keep(scored: Optional[ScoredMatch], via: str) -> Optional[ScoredMatch]:
        nonlocal best, best_via
        if scored is None or scored.box is None:
            return None
        if not _spawn_target_ok(scored.box, hay_w, hay_h, origin):
            return None
        if scored.score > best.score:
            best = scored
            best_via = via
        return scored

    ped_max = float(getattr(config, "SPAWN_PEDESTAL_MAX_SCALE", 1.85))
    for key, conf_name, conf_default in (
        ("spawn_pack", "SPAWN_CONFIDENCE", 0.62),
        ("spawn_pack_mark", "SPAWN_MARK_CONFIDENCE", 0.68),
        ("spawn_pack_alt", "SPAWN_CONFIDENCE", 0.62),
    ):
        hit = _keep(
            _try_spawn_template(
                search,
                search_origin,
                key,
                float(getattr(config, conf_name, conf_default)),
                ped_max,
            ),
            "pedestal",
        )
        if hit is not None:
            return hit, "pedestal"

    text_max = float(getattr(config, "SPAWN_TEXT_MAX_SCALE", 1.40))
    hit = _keep(
        _try_spawn_template(
            search,
            search_origin,
            "spawn_pack_text",
            float(getattr(config, "SPAWN_TEXT_CONFIDENCE", 0.70)),
            text_max,
        ),
        "text",
    )
    if hit is not None:
        return hit, "text"

    part_max = float(getattr(config, "SPAWN_PARTIAL_MAX_SCALE", 1.40))
    part_conf = float(getattr(config, "SPAWN_PARTIAL_CONFIDENCE", 0.84))
    # spawn_sp ("Sp") false-hits the friends 0% icon — do not use it.
    for key in ("spawn_awn", "spawn_pack_pa"):
        hit = _keep(
            _try_spawn_template(search, search_origin, key, part_conf, part_max),
            "partial",
        )
        if hit is not None:
            return hit, "partial"

    return best, best_via


def find_spawn_pack(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    if haystack_bgr is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return None
    scored, _name = score_spawn_pack(haystack_bgr, origin)
    return scored.box


def _locate_spawn(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> tuple[Optional[MatchBox], str, float]:
    if haystack_bgr is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return None, "none", -1.0
    scored, src = score_spawn_pack(haystack_bgr, origin)
    if scored.box is None:
        return None, src, scored.score
    return scored.box, src, scored.score


def _after_okay_buy(on_status=None) -> None:
    """After Okay: wait for the card, then E (all-packs) or whitelist rarity."""
    if halt_requested():
        return
    settle = float(getattr(config, "WARN_OKAY_SETTLE_SECONDS", 1.2))
    timeout = float(getattr(config, "BELT_EVAL_TIMEOUT_SECONDS", 3.0))
    if on_status:
        on_status("Belt")
    time.sleep(settle)
    if halt_requested():
        return

    if config.is_all_packs_mode():
        config.log("[belt] all-packs — buy (E)")
        if on_status:
            on_status("Buying")
        hay, origin = grab_scan()
        if hay is not None:
            accept_buy(hay, origin)
        else:
            press_key(config.CLAIM_KEY)
            time.sleep(config.BUY_TO_SPAWN_SECONDS)
        return

    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline and not halt_requested():
        hay, origin = grab_scan()
        if hay is None:
            time.sleep(0.2)
            continue
        if warning_active(hay, origin):
            dismiss_warn(hay, origin)
            time.sleep(0.15)
            continue
        rarity = find_rarity(hay, origin)
        if rarity is not None and config.ENABLE_AUTO_BUY:
            config.log(f"[belt] rarity={_pretty(rarity[1])} buy")
            if on_status:
                on_status("Buying")
            accept_buy(hay, origin)
            return
        time.sleep(0.2)
    config.log("[belt] rarity not listed — skip buy, back to spawn")


def click_spawn_pack(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
    on_status=None,
) -> str:
    """Phase 1 only: click Spawn Pack until WARN. Does not click Okay or buy.

    Returns 'warn', 'halt', or 'lost'.
    """
    global _last_spawn_box, _last_spawn_xy
    if halt_requested():
        return "halt"
    # Always find Spawn Pack on this pass. Do not reuse a leftover x,y.
    box, src, score = _locate_spawn(haystack_bgr, origin)
    if box is None:
        box, src, score = _locate_spawn()
    if box is None:
        log_miss(
            "spawn",
            f"[spawn] Spawn Pack not found (best={score:.2f} via {src}). "
            "Not clicking Base/Plaza/Sell.",
        )
        return "lost"
    xy = click_match_center(box, pace="spawn")
    if xy is None:
        return "lost"
    _last_spawn_box = box
    _last_spawn_xy = xy
    interval = float(getattr(config, "SPAWN_CLICK_INTERVAL_SECONDS", 0.05))
    config.log(
        f"[spawn] LIVE on Spawn Pack at {xy} via={src} "
        f"score={score:.2f} — {int(interval * 1000)}ms clicks, no belt wait"
    )
    last_box = box
    last_xy = xy
    clicks = 1
    nudge = 1
    t_next = time.perf_counter() + interval
    warn_flag = threading.Event()
    stop_warn = threading.Event()

    def _warn_worker() -> None:
        while not stop_warn.is_set() and not halt_requested():
            time.sleep(0.65)
            if stop_warn.is_set() or halt_requested():
                return
            hay, _origin = grab_scan()
            if hay is not None and warning_active(hay, _origin):
                warn_flag.set()

    worker = threading.Thread(target=_warn_worker, daemon=True)
    worker.start()
    try:
        while not halt_requested():
            if warn_flag.is_set():
                warn_flag.clear()
                hay, origin = grab_scan()
                if hay is not None and warning_active(hay, origin):
                    config.log("[spawn] WARN up — leaving spawn phase")
                    return "warn"

            now = time.perf_counter()
            if now < t_next:
                time.sleep(min(0.002, t_next - now))
                continue

            if not cursor_near(last_xy[0], last_xy[1], 80):
                xy = click_match_center(last_box, pace="spawn")
                if xy is not None:
                    last_xy = xy
                    _last_spawn_xy = xy
                    clicks += 1
                    t_next = time.perf_counter() + interval
                    continue

            try:
                raw_mouse.left_click_jitter(nudge)
            except OSError as exc:
                config.log(f"[spawn] click failed: {exc}")
                return "halt"
            nudge = -nudge
            clicks += 1
            t_next = time.perf_counter() + interval
            if clicks % 50 == 0:
                found, via, sc = _locate_spawn()
                if found is not None:
                    fxy = found.center
                    moved = abs(fxy[0] - last_xy[0]) > 24 or abs(fxy[1] - last_xy[1]) > 24
                    last_box = found
                    _last_spawn_box = found
                    if moved:
                        walked = click_match_center(found, pace="spawn")
                        if walked is not None:
                            last_xy = walked
                            _last_spawn_xy = walked
                            clicks += 1
                            t_next = time.perf_counter() + interval
                            config.log(
                                f"[spawn] Spawn Pack moved — now clicking it at {walked} "
                                f"via={via} score={sc:.2f}"
                            )
                            continue
                    config.log(
                        f"[spawn] still clicking Spawn Pack x{clicks} at {last_xy} "
                        f"via={via} score={sc:.2f}"
                    )
                else:
                    config.log(
                        f"[spawn] still clicking Spawn Pack x{clicks} at {last_xy} "
                        "(stool not re-seen this check)"
                    )
    finally:
        stop_warn.set()
    return "halt"


def accept_buy(haystack_bgr: np.ndarray, origin: tuple[int, int]) -> None:
    """Move onto the card's [E] Buy prompt, then SendInput E. Do not E from Spawn Pack."""
    deadline = time.monotonic() + 1.6
    while time.monotonic() < deadline and not halt_requested():
        buy = find_buy_e(haystack_bgr, origin)
        if buy is None:
            haystack_bgr, origin = grab_scan()
            if haystack_bgr is None:
                press_key(config.CLAIM_KEY)
                time.sleep(0.15)
                continue
            buy = find_buy_e(haystack_bgr, origin)
        if buy is not None:
            xy = click_match_center(buy, pace="normal", ignore_hud=True, soft=True)
            if xy is None:
                config.log("[buy] E Buy found but click refused — SendInput E anyway")
            else:
                config.log(f"[buy] on E Buy prompt at {xy} — SendInput E")
            press_key(config.CLAIM_KEY)
            time.sleep(0.08)
            press_key(config.CLAIM_KEY)
            time.sleep(0.35)
            haystack_bgr, origin = grab_scan()
            if haystack_bgr is None or find_buy_e(haystack_bgr, origin) is None:
                config.log("[buy] E Buy prompt gone — card grabbed")
                return
            continue
        press_key(config.CLAIM_KEY)
        time.sleep(0.25)
        haystack_bgr, origin = grab_scan()
    config.log("[buy] E Buy still on screen — resume spawn")
    time.sleep(config.BUY_TO_SPAWN_SECONDS)


def _enter_evaluate_belt() -> None:
    global _state, _eval_settle_until, _eval_deadline
    settle = float(getattr(config, "WARN_OKAY_SETTLE_SECONDS", 1.2))
    timeout = float(getattr(config, "BELT_EVAL_TIMEOUT_SECONDS", 3.0))
    now = time.monotonic()
    _state = STATE_EVALUATE_BELT
    _eval_settle_until = now + settle
    _eval_deadline = now + settle + timeout


def _finish_evaluate_and_spawn(haystack_bgr=None, origin=(0, 0)) -> str:
    global _state
    _state = STATE_SPAWN
    if click_spawn_pack(haystack_bgr, origin):
        return "spawn"
    time.sleep(config.IDLE_SLEEP_SECONDS)
    return "idle"


def _buy_then_spawn(haystack_bgr=None, origin=(0, 0), on_status=None) -> str:
    if on_status:
        on_status("Buying")
    if haystack_bgr is not None:
        accept_buy(haystack_bgr, origin)
    else:
        press_key(config.CLAIM_KEY)
        time.sleep(config.BUY_TO_SPAWN_SECONDS)
    return _finish_evaluate_and_spawn()


def _tick_evaluate_belt(on_status=None) -> str:
    """After Okay: wait settle, then E (mode) or spawn. Never Okay+spawn."""
    if halt_requested():
        return "idle"
    now = time.monotonic()
    if on_status:
        on_status("Belt")

    if now < _eval_settle_until:
        time.sleep(min(0.2, max(0.05, _eval_settle_until - now)))
        return "evaluate"

    haystack_bgr, origin = grab_scan()
    if haystack_bgr is None:
        if now >= _eval_deadline:
            if config.is_all_packs_mode():
                config.log("[belt] timeout — all-packs buy then spawn")
                return _buy_then_spawn(on_status=on_status)
            config.log("[belt] timeout — spawn")
            return _finish_evaluate_and_spawn()
        time.sleep(float(getattr(config, "BELT_EVAL_RETRY_SECONDS", 0.3)))
        return "evaluate"

    if warning_active(haystack_bgr, origin):
        dismiss_warn(haystack_bgr, origin)
        time.sleep(float(getattr(config, "BELT_EVAL_RETRY_SECONDS", 0.3)))
        return "evaluate"

    if config.is_all_packs_mode():
        config.log("[belt] all-packs — buy (no rarity/name check)")
        return _buy_then_spawn(haystack_bgr, origin, on_status=on_status)

    pack = find_pack(haystack_bgr, origin)
    rarity = find_rarity(haystack_bgr, origin)
    pack_name = _pretty(pack[1]) if pack else "—"
    rarity_name = _pretty(rarity[1]) if rarity else "—"

    if rarity is not None:
        if config.ENABLE_AUTO_BUY:
            config.log(f"[belt] rarity={rarity_name} pack={pack_name} buy")
            return _buy_then_spawn(haystack_bgr, origin, on_status=on_status)
        config.log(f"[belt] rarity={rarity_name} pack={pack_name} buy (auto-buy off)")
        return _finish_evaluate_and_spawn(haystack_bgr, origin)

    if pack is not None and now >= _eval_deadline:
        config.log(f"[belt] rarity not listed — spawn pack={pack_name}")
        return _finish_evaluate_and_spawn(haystack_bgr, origin)

    if now >= _eval_deadline:
        config.log("[belt] rarity not listed — spawn")
        return _finish_evaluate_and_spawn(haystack_bgr, origin)

    log_miss(
        "belt-wait",
        f"[belt] waiting for rarity/name (pack={pack_name} rarity={rarity_name})",
    )
    time.sleep(float(getattr(config, "BELT_EVAL_RETRY_SECONDS", 0.3)))
    return "evaluate"


def run_okay_then_buy(on_status=None) -> None:
    """Phase 2 only: Okay, then buy. Never clicks Spawn Pack."""
    if on_status:
        on_status("Warn")
    hay, origin = grab_scan()
    if hay is None or not warning_active(hay, origin):
        hay, origin = grab_scan()
    if hay is None:
        return
    if not dismiss_warn(hay, origin):
        config.log("[warn] Okay not clicked — skip buy, spawn will resume")
        return

    settle = float(getattr(config, "WARN_OKAY_SETTLE_SECONDS", 1.2))
    if on_status:
        on_status("Belt")
    time.sleep(settle)
    if halt_requested():
        return

    hay, origin = grab_scan()
    if hay is None:
        if config.is_all_packs_mode():
            config.log("[buy] no shot — SendInput E")
            press_key(config.CLAIM_KEY)
        return

    if config.is_all_packs_mode():
        config.log("[buy] all-packs test — buy the card")
        if on_status:
            on_status("Buying")
        accept_buy(hay, origin)
        return

    rarity = find_rarity(hay, origin)
    if rarity is not None and config.ENABLE_AUTO_BUY:
        config.log(f"[buy] rarity={_pretty(rarity[1])} — buy")
        if on_status:
            on_status("Buying")
        accept_buy(hay, origin)
        return
    config.log("[buy] rarity not listed — skip card, spawn will resume")


def run_pack_tick(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
    on_status=None,
) -> str:
    """Alternate isolated phases: spawn until WARN, then Okay+buy, then spawn again."""
    while not halt_requested():
        hay, origin = grab_scan()
        if hay is not None and warning_active(hay, origin):
            forget_spawn_target()
            run_okay_then_buy(on_status=on_status)
            continue
        if on_status:
            on_status("Spawning")
        why = click_spawn_pack(hay, origin if hay is not None else (0, 0), on_status=on_status)
        if why == "warn":
            forget_spawn_target()
            run_okay_then_buy(on_status=on_status)
            continue
        if why == "lost":
            time.sleep(config.IDLE_SLEEP_SECONDS)
            continue
        return why
    return "idle"
