"""Clicks and keypresses. Click only a matched box center on Sceptre K25.

LIVE: slide the cursor on both axes to the target, hover, then left-click.
Never log LIVE unless the pointer actually arrived and the left button ran.
DRY: log and do not move the mouse or press keys.
"""

from __future__ import annotations

import time
from typing import Optional

import pyautogui

import config
import raw_mouse
from matcher import MatchBox
from monitors import (
    cursor_on_watch,
    find_watch_monitor,
    foreground_on_watch,
    is_os_close_or_titlebar,
)

_stop_event = None


def set_stop_event(event) -> None:
    """Loop / hotkey halt flag. Clicks check this so R stops ASAP."""
    global _stop_event
    _stop_event = event


def halt_requested() -> bool:
    return _stop_event is not None and _stop_event.is_set()


def request_auto_stop(reason: str) -> None:
    config.log(f"[auto-stop] {reason}")
    if _stop_event is not None:
        _stop_event.set()


def check_watch_or_stop() -> bool:
    """True if still allowed to run. False if auto-stopped."""
    mon = find_watch_monitor()
    if mon is None:
        request_auto_stop("Sceptre K25 not found")
        return False
    if not cursor_on_watch(mon):
        request_auto_stop("cursor left Sceptre K25 — no mouse")
        return False
    if not foreground_on_watch(mon):
        request_auto_stop("focus left Sceptre K25 — no mouse")
        return False
    return True


def forbidden_hud_reason(rel_x: int, rel_y: int, width: int, height: int) -> Optional[str]:
    """Never click Base / Plaza / Sell / Shop / Conveyor Settings."""
    if rel_y < 110 and 0.22 * width <= rel_x <= 0.78 * width:
        return "Plaza/Base/Sell"
    if rel_y > height - 78:
        return "bottom HUD"
    if rel_x < 0.28 * width and rel_y > height - 200:
        return "Conveyor Settings"
    if rel_x < 150 and rel_y < 280:
        return "Shop"
    return None


def enable_failsafe() -> None:
    """Corner failsafe stays on, but auto-stop is the real guard."""
    pyautogui.FAILSAFE = True
    pyautogui.PAUSE = 0.02
    # Keep animated moves visible; never let PyAutoGUI snap/teleport.
    pyautogui.MINIMUM_DURATION = 0.05
    pyautogui.MINIMUM_SLEEP = 0.005


def failsafe_triggered() -> bool:
    """True if the pointer is already in a failsafe corner of the watch monitor."""
    mon = find_watch_monitor()
    if mon is None:
        return True
    x, y = pyautogui.position()
    margin = 2
    on_left = x <= mon.left + margin
    on_top = y <= mon.top + margin
    on_right = x >= mon.right - 1 - margin
    on_bottom = y >= mon.bottom - 1 - margin
    return (on_left or on_right) and (on_top or on_bottom)


def _near(ax: int, ay: int, bx: int, by: int, px: int) -> bool:
    return abs(int(ax) - int(bx)) <= px and abs(int(ay) - int(by)) <= px


def click_match_center(box: MatchBox) -> Optional[tuple[int, int]]:
    """Slide to the match center on K25, hover, then left-click. None if skipped.

    Never moves unless the cursor is already on Sceptre K25 and the game is
    focused there. Does not teleport. Does not log LIVE unless the cursor
    arrived within CLICK_ARRIVE_PX and a real left mouseDown/mouseUp ran.
    """
    x, y = box.center
    if halt_requested():
        config.log("[hotkey] halt — skip click")
        return None
    if config.DRY_RUN:
        config.log(f"[DRY] skip click {x},{y}  box={tuple(box)}")
        return None
    if failsafe_triggered():
        config.log("[click] failsafe — no move")
        return None
    mon = find_watch_monitor()
    if mon is None:
        request_auto_stop("Sceptre K25 not found")
        return None
    if not mon.contains(x, y, margin=4):
        config.log(
            f"[skip] click {x},{y} is outside Sceptre K25 "
            f"{mon.left},{mon.top} {mon.width}x{mon.height}"
        )
        return None
    if not cursor_on_watch(mon):
        request_auto_stop("cursor left Sceptre K25 — no mouse")
        return None
    if not foreground_on_watch(mon):
        request_auto_stop("focus left Sceptre K25 — no mouse")
        return None
    if is_os_close_or_titlebar(x, y, mon):
        config.log(f"[skip] refused window Close/titlebar click {x},{y}")
        return None
    rel_x = x - mon.left
    rel_y = y - mon.top
    reason = forbidden_hud_reason(rel_x, rel_y, mon.width, mon.height)
    if reason is not None:
        config.log(f"[skip] refused {reason} click {x},{y}")
        return None

    duration = float(getattr(config, "CLICK_MOVE_DURATION", 0.35))
    hover = float(getattr(config, "CLICK_HOVER_SECONDS", 0.1))
    arrive = int(getattr(config, "CLICK_ARRIVE_PX", 15))

    # Roblox ignores SetCursorPos (pyautogui.moveTo). Walk with SendInput
    # relative packets so the game sees the same kind of motion as a real mouse.
    try:
        got_x, got_y = raw_mouse.slide_to(x, y, duration=duration)
    except OSError as exc:
        config.log(f"[click] sendinput move failed: {exc}")
        return None

    if failsafe_triggered():
        config.log("[click] failsafe during move — no click")
        return None

    time.sleep(hover)
    got_x, got_y = raw_mouse.position()
    if not _near(got_x, got_y, x, y, arrive):
        config.log(f"[click] move failed at ({got_x}, {got_y}) target=({x}, {y})")
        return None
    if not mon.contains(got_x, got_y, margin=0):
        request_auto_stop("cursor left Sceptre K25")
        return None

    try:
        raw_mouse.left_click()
    except OSError as exc:
        config.log(f"[click] sendinput click failed: {exc}")
        return None

    config.log(f"[LIVE click] {got_x},{got_y} sendinput")
    return (int(got_x), int(got_y))


def press_key(key: Optional[str] = None) -> None:
    """Press a keyboard key (default CLAIM_KEY / E)."""
    k = (key or config.CLAIM_KEY).lower()
    if halt_requested():
        config.log("[hotkey] halt — skip key")
        return
    if config.DRY_RUN:
        config.log(f"[DRY] skip press '{k}'")
        return
    if not check_watch_or_stop():
        return
    pyautogui.press(k)
    config.log(f"[LIVE key] '{k}'")


def press_claim_key(key: Optional[str] = None) -> None:
    press_key(key)
