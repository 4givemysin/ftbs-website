"""In-game overlay X only (Join Event). Never the window Close button.

Windowed Roblox is fine. The OS/title-bar X is refused even if the template
matches. In-game X sits on a dark overlay; the app Close button does not.
"""

from __future__ import annotations

import time
from typing import Optional

import numpy as np

import config
from actions import click_match_center
from matcher import MatchBox, match_template
from monitors import find_watch_monitor, is_os_close_or_titlebar


def _dark_enough(haystack_bgr: np.ndarray, box: MatchBox, origin: tuple[int, int]) -> bool:
    """Join Event X is white on dark gray. Window chrome is not."""
    ox, oy = origin
    x0 = max(0, box.left - ox - 6)
    y0 = max(0, box.top - oy - 6)
    x1 = min(haystack_bgr.shape[1], box.left - ox + box.width + 6)
    y1 = min(haystack_bgr.shape[0], box.top - oy + box.height + 6)
    if x1 <= x0 or y1 <= y0:
        return False
    patch = haystack_bgr[y0:y1, x0:x1]
    if patch.size == 0:
        return False
    # BGR mean luminance
    mean = float(patch.mean())
    return mean <= float(getattr(config, "POPUP_X_DARK_MAX", 90))


def find_popup_x(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> Optional[MatchBox]:
    if not config.ENABLE_INTERCEPTOR:
        return None
    box = match_template(
        config.TEMPLATE_PATHS["popup_close_x"],
        region=config.POPUP_REGION,
        confidence=config.CONFIDENCE,
        haystack_bgr=haystack_bgr,
        origin=origin,
    )
    if box is None:
        return None
    cx, cy = box.center
    # Hard keepout: top-right of the capture (window Close lives here).
    if haystack_bgr is not None:
        h, w = haystack_bgr.shape[:2]
        ox, oy = origin
        rel_x, rel_y = cx - ox, cy - oy
        if rel_x >= int(w * 0.78) and rel_y <= int(h * 0.16):
            config.log("[popup] ignored — top-right Close keepout")
            return None
    if is_os_close_or_titlebar(cx, cy, find_watch_monitor()):
        config.log("[popup] ignored — that X is the window Close, not an overlay")
        return None
    if haystack_bgr is not None and not _dark_enough(haystack_bgr, box, origin):
        config.log("[popup] ignored — X is not on a dark in-game overlay")
        return None
    return box


def try_handle(
    haystack_bgr: Optional[np.ndarray] = None,
    origin: tuple[int, int] = (0, 0),
) -> bool:
    """If the overlay X is visible, click its center, pause, return True."""
    box = find_popup_x(haystack_bgr=haystack_bgr, origin=origin)
    if box is None:
        return False
    xy = click_match_center(box)
    if xy is None:
        return False
    config.log(
        f"[popup] LIVE clicked overlay X at {xy}, pause {config.POPUP_RESUME_WAIT_SECONDS:g}s"
    )
    time.sleep(config.POPUP_RESUME_WAIT_SECONDS)
    return True
