"""Spawn Pack click loop, WARN→Okay, then EVALUATE_BELT.

Main job: keep left-clicking Spawn Pack. Do not scan the belt every tick.

When red WARN / green Okay appears: click Okay, then STOP spawning.
Enter EVALUATE_BELT, wait for the card (both buy modes), then:
  - Rebellion + rarity: whitelist rarity → E, then Spawn Pack; else Spawn Pack
  - All packs (test): always E after settle (no rarity/name gate), then Spawn Pack
Okay and Spawn Pack never run in the same tick.

Never click Base / Plaza / Sell / Shop / Conveyor Settings.
"""

from __future__ import annotations

import time
from pathlib import Path
from typing import Optional

import numpy as np

import config
from actions import click_match_center, halt_requested, press_key
from matcher import MatchBox, ScoredMatch, grab_scan, log_miss, match_any_in_image, match_template, score_in_image

STATE_SPAWN = "spawn"
STATE_EVALUATE_BELT = "evaluate_belt"

_state = STATE_SPAWN
_eval_settle_until = 0.0
_eval_deadline = 0.0


def reset_pack_state() -> None:
    global _state, _eval_settle_until, _eval_deadline
    _state = STATE_SPAWN
    _eval_settle_until = 0.0
    _eval_deadline = 0.0


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
    xy = click_match_center(okay)
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
    return match_template(
        config.TEMPLATE_PATHS["buy_e"],
        region=config.BUY_REGION,
        haystack_bgr=haystack_bgr,
        origin=origin,
    )


def _bottom_half(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
) -> tuple[np.ndarray, tuple[int, int]]:
    """Search the lower part of K25 so shop-card 'Pack' is less likely."""
    frac = float(getattr(config, "SPAWN_SEARCH_Y_FRACTION", 0.5))
    frac = min(0.85, max(0.25, frac))
    y0 = int(haystack_bgr.shape[0] * frac)
    if y0 <= 0:
        return haystack_bgr, origin
    return haystack_bgr[y0:, :], (int(origin[0]), int(origin[1]) + y0)


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
    search, search_origin = _bottom_half(haystack_bgr, origin)
    best = ScoredMatch(None, -1.0, 1.0)
    best_via = "none"

    def _keep(scored: Optional[ScoredMatch], via: str) -> Optional[ScoredMatch]:
        nonlocal best, best_via
        if scored is None:
            return None
        if scored.score > best.score:
            best = scored
            best_via = via
        return scored if scored.box is not None else None

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
    part_conf = float(getattr(config, "SPAWN_PARTIAL_CONFIDENCE", 0.76))
    for key in ("spawn_sp", "spawn_awn", "spawn_pack_pa"):
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


def click_spawn_pack(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    """Slide to Spawn Pack and left-click (pedestal / text / partial words)."""
    if halt_requested():
        return False
    if haystack_bgr is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return False
    scored, src = score_spawn_pack(haystack_bgr, origin)
    box = scored.box
    if box is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return False
        scored, src = score_spawn_pack(haystack_bgr, origin)
        box = scored.box
    if box is None:
        log_miss(
            "spawn",
            f"[spawn] Spawn Pack not found (best={scored.score:.2f} "
            f"scale={scored.scale:.2f}x via {src}). Not clicking Base/Plaza/Sell.",
        )
        return False
    xy = click_match_center(box)
    if xy is None:
        return False
    config.log(
        f"[spawn] LIVE clicked Spawn Pack at {xy} via={src} "
        f"score={scored.score:.2f} scale={scored.scale:.2f}x"
    )
    time.sleep(config.POST_ACTION_SECONDS)
    return True


def accept_buy(haystack_bgr: np.ndarray, origin: tuple[int, int]) -> None:
    """Click the E Buy HUD, or press keyboard E if the graphic is missing."""
    buy = find_buy_e(haystack_bgr, origin)
    if buy is not None:
        xy = click_match_center(buy)
        if xy is not None:
            config.log(f"[buy] LIVE clicked E keycap at {xy}")
            time.sleep(config.BUY_TO_SPAWN_SECONDS)
            return
    press_key(config.CLAIM_KEY)
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


def run_pack_tick(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
    on_status=None,
) -> str:
    """Spawn loop, or WARN→Okay→EVALUATE_BELT. No per-tick belt scan while spawning."""
    global _state
    if halt_requested():
        return "idle"

    if _state == STATE_EVALUATE_BELT:
        return _tick_evaluate_belt(on_status=on_status)

    if warning_active(haystack_bgr, origin):
        if on_status:
            on_status("Warn")
        if dismiss_warn(haystack_bgr, origin):
            _enter_evaluate_belt()
            return "evaluate"
        time.sleep(config.IDLE_SLEEP_SECONDS)
        return "idle"

    if on_status:
        on_status("Spawning")
    if click_spawn_pack(haystack_bgr, origin):
        return "spawn"
    time.sleep(config.IDLE_SLEEP_SECONDS)
    return "idle"
