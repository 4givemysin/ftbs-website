"""Windows SendInput mouse — Roblox ignores PyAutoGUI SetCursorPos.

Physical mouse hardware sends WM_INPUT / relative packets. pyautogui.moveTo
only teleports the OS cursor, so the game does not highlight Spawn Pack until
you touch the mouse. This module walks there with relative SendInput moves
and fires a real left button down/up the same way.
"""

from __future__ import annotations

import ctypes
import time
from ctypes import wintypes

user32 = ctypes.WinDLL("user32", use_last_error=True)

MOUSEEVENTF_MOVE = 0x0001
MOUSEEVENTF_LEFTDOWN = 0x0002
MOUSEEVENTF_LEFTUP = 0x0004
MOUSEEVENTF_MOVE_NOCOALESCE = 0x2000
INPUT_MOUSE = 0


class MOUSEINPUT(ctypes.Structure):
    _fields_ = (
        ("dx", wintypes.LONG),
        ("dy", wintypes.LONG),
        ("mouseData", wintypes.DWORD),
        ("dwFlags", wintypes.DWORD),
        ("time", wintypes.DWORD),
        ("dwExtraInfo", ctypes.POINTER(ctypes.c_ulong)),
    )


class INPUT(ctypes.Structure):
    class _I(ctypes.Union):
        _fields_ = (("mi", MOUSEINPUT),)

    _anonymous_ = ("_i",)
    _fields_ = (("type", wintypes.DWORD), ("_i", _I))


class POINT(ctypes.Structure):
    _fields_ = (("x", ctypes.c_long), ("y", ctypes.c_long))


user32.SendInput.argtypes = (wintypes.UINT, ctypes.POINTER(INPUT), ctypes.c_int)
user32.SendInput.restype = wintypes.UINT
user32.GetCursorPos.argtypes = (ctypes.POINTER(POINT),)
user32.GetCursorPos.restype = wintypes.BOOL


def _pos() -> tuple[int, int]:
    pt = POINT()
    user32.GetCursorPos(ctypes.byref(pt))
    return int(pt.x), int(pt.y)


def position() -> tuple[int, int]:
    return _pos()


def _send(flags: int, dx: int = 0, dy: int = 0) -> None:
    extra = ctypes.c_ulong(0)
    inp = INPUT()
    inp.type = INPUT_MOUSE
    inp.mi = MOUSEINPUT(dx, dy, 0, flags, 0, ctypes.pointer(extra))
    sent = user32.SendInput(1, ctypes.byref(inp), ctypes.sizeof(INPUT))
    if sent != 1:
        raise ctypes.WinError(ctypes.get_last_error())


def _ease(t: float) -> float:
    if t < 0.5:
        return 2.0 * t * t
    u = -2.0 * t + 2.0
    return 1.0 - (u * u) / 2.0


def slide_to(x: int, y: int, duration: float = 0.35) -> tuple[int, int]:
    """Relative SendInput walk to (x, y). Returns the OS cursor at the end."""
    x, y = int(x), int(y)
    sx, sy = _pos()
    duration = max(0.05, float(duration))
    dist = max(abs(x - sx), abs(y - sy), 1)
    steps = max(12, min(80, int(duration * 90) + dist // 8))
    last_x, last_y = sx, sy
    t0 = time.perf_counter()
    for i in range(1, steps + 1):
        t = _ease(i / steps)
        nx = int(round(sx + (x - sx) * t))
        ny = int(round(sy + (y - sy) * t))
        dx = nx - last_x
        dy = ny - last_y
        if dx or dy:
            _send(MOUSEEVENTF_MOVE | MOUSEEVENTF_MOVE_NOCOALESCE, dx, dy)
            last_x, last_y = nx, ny
        # Keep wall-clock duration close to requested.
        target_t = t0 + duration * (i / steps)
        remain = target_t - time.perf_counter()
        if remain > 0:
            time.sleep(remain)
    # Correct leftover pixels the game/OS still missed.
    cx, cy = _pos()
    fix_x, fix_y = x - cx, y - cy
    if fix_x or fix_y:
        _send(MOUSEEVENTF_MOVE | MOUSEEVENTF_MOVE_NOCOALESCE, fix_x, fix_y)
    return _pos()


def left_click() -> None:
    _send(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.03)
    _send(MOUSEEVENTF_LEFTUP)
