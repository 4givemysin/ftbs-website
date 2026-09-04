"""Items bag restock for Luck III and Mutation III.

Only logs opened/closed after a real click AND a follow-up screenshot proves it.
Does not click Items every tick.
"""

from __future__ import annotations

import time
from typing import Optional

import numpy as np

import config
from actions import click_match_center, failsafe_triggered, halt_requested
from matcher import grab_scan, log_miss, score_in_image

_last_items_click = 0.0
_bag_open = False


def _bottom_slice(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
) -> tuple[np.ndarray, tuple[int, int]]:
    frac = float(getattr(config, "BUFF_BOTTOM_FRACTION", 0.45))
    frac = min(0.9, max(0.2, frac))
    h = haystack_bgr.shape[0]
    top = int(h * (1.0 - frac))
    return haystack_bgr[top:, :], (origin[0], origin[1] + top)


def find_buff_luck(haystack_bgr: np.ndarray, origin: tuple[int, int] = (0, 0)):
    slice_bgr, slice_origin = _bottom_slice(haystack_bgr, origin)
    return score_in_image(
        slice_bgr, config.TEMPLATE_PATHS["buff_luck"], origin=slice_origin
    ).box


def find_buff_mutation(haystack_bgr: np.ndarray, origin: tuple[int, int] = (0, 0)):
    slice_bgr, slice_origin = _bottom_slice(haystack_bgr, origin)
    return score_in_image(
        slice_bgr, config.TEMPLATE_PATHS["buff_mutation"], origin=slice_origin
    ).box


def missing_buffs(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int] = (0, 0),
) -> tuple[bool, bool]:
    return find_buff_luck(haystack_bgr, origin) is None, find_buff_mutation(
        haystack_bgr, origin
    ) is None


def inventory_grid_visible(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    if haystack_bgr is None:
        haystack_bgr, origin = grab_scan()
        if haystack_bgr is None:
            return False
    luck = score_in_image(haystack_bgr, config.TEMPLATE_PATHS["luck_iii"], origin=origin)
    mut = score_in_image(
        haystack_bgr, config.TEMPLATE_PATHS["mutation_iii"], origin=origin
    )
    return luck.box is not None or mut.box is not None


def _abort(stop_event) -> bool:
    if stop_event is not None and stop_event.is_set():
        return True
    if halt_requested():
        return True
    return failsafe_triggered()


def _score_named(key: str, hay=None, origin=(0, 0)):
    if hay is None:
        hay, origin = grab_scan()
    if hay is None:
        return None
    return score_in_image(
        hay,
        config.TEMPLATE_PATHS[key],
        origin=origin,
    )


def _click_named(key: str, label: str) -> bool:
    scored = _score_named(key)
    if scored is None or scored.box is None:
        best = -1.0 if scored is None else scored.score
        scale = 1.0 if scored is None else scored.scale
        log_miss(
            f"bag-{key}",
            f"[bag] {label} not found (best={best:.2f} scale={scale:.2f}x)",
        )
        return False
    xy = click_match_center(scored.box)
    if xy is None:
        return False
    config.log(
        f"[bag] LIVE clicked {label} at {xy} score={scored.score:.2f} scale={scored.scale:.2f}x"
    )
    time.sleep(config.BAG_STEP_SECONDS)
    return True


def _use_item(stop_event) -> None:
    for i in range(int(config.USE_5X_CLICKS)):
        if _abort(stop_event):
            return
        if not _click_named("use_5x", f"Use (5x) #{i + 1}"):
            break
    for i in range(int(config.USE_1X_CLICKS)):
        if _abort(stop_event):
            return
        if not _click_named("use_1x", f"Use #{i + 1}"):
            break


def _toggle_items(want_open: bool) -> bool:
    """Click Items once, then verify inventory grid. Honest logs only."""
    global _last_items_click, _bag_open
    now = time.monotonic()
    cooldown = float(getattr(config, "BAG_TOGGLE_COOLDOWN_SECONDS", 2.5))
    if now - _last_items_click < cooldown:
        log_miss("bag-cd", "[bag] Items toggle on cooldown — skip")
        return _bag_open == want_open

    hay, origin = grab_scan()
    if hay is None:
        return False
    already = inventory_grid_visible(hay, origin)
    if want_open and already:
        _bag_open = True
        config.log("[bag] inventory already open — not clicking Items")
        return True
    if (not want_open) and (not already):
        _bag_open = False
        config.log("[bag] inventory already closed — not clicking Items")
        return True

    scored = score_in_image(hay, config.TEMPLATE_PATHS["items_bag"], origin=origin)
    if scored.box is None:
        log_miss(
            "bag-items_bag",
            f"[bag] Items button not found (best={scored.score:.2f} scale={scored.scale:.2f}x)",
        )
        return False
    xy = click_match_center(scored.box)
    _last_items_click = time.monotonic()
    if xy is None:
        return False
    time.sleep(float(getattr(config, "BAG_VERIFY_SECONDS", 0.9)))
    after, after_origin = grab_scan()
    grid = inventory_grid_visible(after, after_origin)
    if want_open:
        if grid:
            _bag_open = True
            config.log(f"[bag] opened Items at {xy} (inventory grid seen)")
            return True
        config.log(f"[bag] clicked Items at {xy} but inventory grid not seen — not logging opened")
        return False
    if not grid:
        _bag_open = False
        config.log(f"[bag] closed Items at {xy} (inventory grid gone)")
        return True
    config.log(f"[bag] clicked Items at {xy} but inventory still visible — not logging closed")
    return False


def run_bag_if_needed(
    haystack_bgr: np.ndarray,
    origin: tuple[int, int],
    stop_event=None,
) -> bool:
    """If a buff is missing, open Items, restock, close bag. True if the routine ran."""
    luck_missing, mut_missing = missing_buffs(haystack_bgr, origin)
    if not luck_missing and not mut_missing:
        return False

    log_miss(
        "bag-missing",
        f"[bag] buffs missing: luck={luck_missing} mutation={mut_missing}",
    )
    items = score_in_image(
        haystack_bgr, config.TEMPLATE_PATHS["items_bag"], origin=origin
    )
    if config.DRY_RUN:
        config.log(
            f"[DRY] would open Items and restock "
            f"(items best={items.score:.2f} scale={items.scale:.2f}x)"
        )
        return False

    if not _toggle_items(want_open=True):
        return True
    time.sleep(config.BAG_OPEN_WAIT_SECONDS)

    if luck_missing and not _abort(stop_event):
        if _click_named("luck_iii", "Luck III"):
            _use_item(stop_event)
    if mut_missing and not _abort(stop_event):
        if _click_named("mutation_iii", "Mutation III"):
            _use_item(stop_event)

    _toggle_items(want_open=False)
    time.sleep(config.POST_ACTION_SECONDS)
    return True
