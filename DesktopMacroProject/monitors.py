"""Find and lock to the Sceptre K25 game monitor. Never use 'Windows primary'."""

from __future__ import annotations

import ctypes
import sys
from ctypes import POINTER, WINFUNCTYPE, Structure, byref, sizeof
from ctypes import wintypes
from typing import NamedTuple, Optional

import config


class RECT(Structure):
    _fields_ = [
        ("left", ctypes.c_long),
        ("top", ctypes.c_long),
        ("right", ctypes.c_long),
        ("bottom", ctypes.c_long),
    ]


class MONITORINFOEXW(Structure):
    _fields_ = [
        ("cbSize", wintypes.DWORD),
        ("rcMonitor", RECT),
        ("rcWork", RECT),
        ("dwFlags", wintypes.DWORD),
        ("szDevice", wintypes.WCHAR * 32),
    ]


class LUID(Structure):
    _fields_ = [("LowPart", wintypes.DWORD), ("HighPart", wintypes.LONG)]


class DISPLAYCONFIG_PATH_SOURCE_INFO(Structure):
    _fields_ = [
        ("adapterId", LUID),
        ("id", wintypes.UINT),
        ("modeInfoIdx", wintypes.UINT),
        ("statusFlags", wintypes.UINT),
    ]


class DISPLAYCONFIG_PATH_TARGET_INFO(Structure):
    _fields_ = [
        ("adapterId", LUID),
        ("id", wintypes.UINT),
        ("modeInfoIdx", wintypes.UINT),
        ("outputTechnology", wintypes.UINT),
        ("rotation", wintypes.UINT),
        ("scaling", wintypes.UINT),
        ("refreshRate_num", wintypes.UINT),
        ("refreshRate_den", wintypes.UINT),
        ("scanLineOrdering", wintypes.UINT),
        ("targetAvailable", wintypes.BOOL),
        ("statusFlags", wintypes.UINT),
    ]


class DISPLAYCONFIG_PATH_INFO(Structure):
    _fields_ = [
        ("sourceInfo", DISPLAYCONFIG_PATH_SOURCE_INFO),
        ("targetInfo", DISPLAYCONFIG_PATH_TARGET_INFO),
        ("flags", wintypes.UINT),
    ]


class DISPLAYCONFIG_DEVICE_INFO_HEADER(Structure):
    _fields_ = [
        ("type", wintypes.INT),
        ("size", wintypes.UINT),
        ("adapterId", LUID),
        ("id", wintypes.UINT),
    ]


class DISPLAYCONFIG_TARGET_DEVICE_NAME(Structure):
    _fields_ = [
        ("header", DISPLAYCONFIG_DEVICE_INFO_HEADER),
        ("flags", wintypes.UINT),
        ("outputTechnology", wintypes.INT),
        ("edidManufactureId", wintypes.USHORT),
        ("edidProductCodeId", wintypes.USHORT),
        ("connectorInstance", wintypes.UINT),
        ("monitorFriendlyDeviceName", wintypes.WCHAR * 64),
        ("monitorDevicePath", wintypes.WCHAR * 128),
    ]


class DISPLAYCONFIG_SOURCE_DEVICE_NAME(Structure):
    _fields_ = [
        ("header", DISPLAYCONFIG_DEVICE_INFO_HEADER),
        ("viewGdiDeviceName", wintypes.WCHAR * 32),
    ]


class POINT(Structure):
    _fields_ = [("x", wintypes.LONG), ("y", wintypes.LONG)]


MONITORENUMPROC = WINFUNCTYPE(
    wintypes.BOOL, wintypes.HMONITOR, wintypes.HDC, POINTER(RECT), wintypes.LPARAM
)

QDC_ONLY_ACTIVE_PATHS = 2
DISPLAYCONFIG_DEVICE_INFO_GET_TARGET_NAME = 2
DISPLAYCONFIG_DEVICE_INFO_GET_SOURCE_NAME = 1
MONITOR_DEFAULTTONEAREST = 2


class GameMonitor(NamedTuple):
    friendly: str
    device: str
    left: int
    top: int
    width: int
    height: int
    path: str

    @property
    def right(self) -> int:
        return self.left + self.width

    @property
    def bottom(self) -> int:
        return self.top + self.height

    def contains(self, x: int, y: int, margin: int = 0) -> bool:
        return (
            self.left + margin <= x < self.right - margin
            and self.top + margin <= y < self.bottom - margin
        )


def _user32():
    return ctypes.windll.user32


def _friendly_by_gdi() -> dict[str, tuple[str, str]]:
    """Map \\\\.\\DISPLAYn -> (friendly name, device path)."""
    if sys.platform != "win32":
        return {}
    user32 = _user32()
    path_count = wintypes.UINT()
    mode_count = wintypes.UINT()
    if user32.GetDisplayConfigBufferSizes(
        QDC_ONLY_ACTIVE_PATHS, byref(path_count), byref(mode_count)
    ):
        return {}
    paths = (DISPLAYCONFIG_PATH_INFO * path_count.value)()
    modes = (ctypes.c_byte * (256 * max(1, mode_count.value)))()
    if user32.QueryDisplayConfig(
        QDC_ONLY_ACTIVE_PATHS,
        byref(path_count),
        paths,
        byref(mode_count),
        modes,
        None,
    ):
        return {}
    out: dict[str, tuple[str, str]] = {}
    for i in range(path_count.value):
        p = paths[i]
        tgt = DISPLAYCONFIG_TARGET_DEVICE_NAME()
        tgt.header.type = DISPLAYCONFIG_DEVICE_INFO_GET_TARGET_NAME
        tgt.header.size = sizeof(DISPLAYCONFIG_TARGET_DEVICE_NAME)
        tgt.header.adapterId = p.targetInfo.adapterId
        tgt.header.id = p.targetInfo.id
        user32.DisplayConfigGetDeviceInfo(byref(tgt))
        src = DISPLAYCONFIG_SOURCE_DEVICE_NAME()
        src.header.type = DISPLAYCONFIG_DEVICE_INFO_GET_SOURCE_NAME
        src.header.size = sizeof(DISPLAYCONFIG_SOURCE_DEVICE_NAME)
        src.header.adapterId = p.sourceInfo.adapterId
        src.header.id = p.sourceInfo.id
        user32.DisplayConfigGetDeviceInfo(byref(src))
        gdi = src.viewGdiDeviceName
        friendly = tgt.monitorFriendlyDeviceName
        path = tgt.monitorDevicePath
        if gdi:
            out[gdi] = (friendly or "", path or "")
    return out


def list_monitors() -> list[GameMonitor]:
    if sys.platform != "win32":
        return []
    user32 = _user32()
    names = _friendly_by_gdi()
    found: list[GameMonitor] = []

    def _cb(hmon, hdc, lprect, lparam):
        info = MONITORINFOEXW()
        info.cbSize = sizeof(MONITORINFOEXW)
        user32.GetMonitorInfoW(hmon, byref(info))
        r = info.rcMonitor
        device = info.szDevice
        friendly, path = names.get(device, ("", ""))
        found.append(
            GameMonitor(
                friendly=friendly or device,
                device=device,
                left=int(r.left),
                top=int(r.top),
                width=int(r.right - r.left),
                height=int(r.bottom - r.top),
                path=path,
            )
        )
        return True

    user32.EnumDisplayMonitors(0, 0, MONITORENUMPROC(_cb), 0)
    return found


def find_watch_monitor(needle: Optional[str] = None) -> Optional[GameMonitor]:
    want = (needle or getattr(config, "WATCH_MONITOR", "Sceptre K25")).strip().lower()
    if not want:
        return None
    aliases = {want, "sceptre k25", "spt629c"}
    for mon in list_monitors():
        blob = " ".join([mon.friendly, mon.device, mon.path]).lower()
        if any(a in blob for a in aliases if a):
            return mon
    return None


def watch_label() -> str:
    mon = find_watch_monitor()
    if mon is None:
        return "monitor not found"
    return mon.friendly or "Sceptre K25"


def cursor_pos() -> tuple[int, int]:
    pt = POINT()
    _user32().GetCursorPos(byref(pt))
    return int(pt.x), int(pt.y)


def cursor_on_watch(mon: Optional[GameMonitor] = None) -> bool:
    mon = mon or find_watch_monitor()
    if mon is None:
        return False
    x, y = cursor_pos()
    return mon.contains(x, y)


def foreground_on_watch(mon: Optional[GameMonitor] = None) -> bool:
    mon = mon or find_watch_monitor()
    if mon is None:
        return False
    user32 = _user32()
    hwnd = user32.GetForegroundWindow()
    if not hwnd:
        return False
    hmon = user32.MonitorFromWindow(hwnd, MONITOR_DEFAULTTONEAREST)
    if not hmon:
        return False
    info = MONITORINFOEXW()
    info.cbSize = sizeof(MONITORINFOEXW)
    if not user32.GetMonitorInfoW(hmon, byref(info)):
        return False
    r = info.rcMonitor
    return (
        int(r.left) == mon.left
        and int(r.top) == mon.top
        and int(r.right - r.left) == mon.width
        and int(r.bottom - r.top) == mon.height
    )


class WindowRect(NamedTuple):
    left: int
    top: int
    right: int
    bottom: int

    @property
    def width(self) -> int:
        return self.right - self.left

    @property
    def height(self) -> int:
        return self.bottom - self.top


def find_game_window() -> Optional[WindowRect]:
    """Roblox (or similar) window on the watch monitor. Windowed or fullscreen."""
    if sys.platform != "win32":
        return None
    user32 = _user32()
    hits: list[WindowRect] = []
    needle = tuple(
        s.lower()
        for s in getattr(config, "GAME_WINDOW_TITLE_HINTS", ("roblox",))
    )

    WNDENUMPROC = WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)

    def _cb(hwnd, _lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        buf = ctypes.create_unicode_buffer(512)
        user32.GetWindowTextW(hwnd, buf, 512)
        title = (buf.value or "").lower()
        if not title or not any(n in title for n in needle):
            return True
        rc = RECT()
        if not user32.GetWindowRect(hwnd, byref(rc)):
            return True
        hits.append(
            WindowRect(int(rc.left), int(rc.top), int(rc.right), int(rc.bottom))
        )
        return True

    user32.EnumWindows(WNDENUMPROC(_cb), 0)
    mon = find_watch_monitor()
    if mon is None:
        return hits[0] if hits else None
    on_watch = [
        w
        for w in hits
        if mon.contains((w.left + w.right) // 2, (w.top + w.bottom) // 2)
    ]
    if not on_watch:
        return None
    on_watch.sort(key=lambda w: w.width * w.height, reverse=True)
    return on_watch[0]


def is_os_close_or_titlebar(x: int, y: int, mon: Optional[GameMonitor] = None) -> bool:
    """True if (x,y) could be the Roblox/Windows Close button. Never click there.

    Uses a large top-right keepout so a white-X template cannot close the app
    in windowed or fullscreen.
    """
    mon = mon or find_watch_monitor()
    title_h = int(getattr(config, "WINDOW_TITLEBAR_PX", 80))
    close_w = int(getattr(config, "WINDOW_CLOSE_WIDTH_PX", 140))
    if mon is not None:
        if y <= mon.top + title_h and x >= mon.right - close_w:
            return True
        # Top-right 18% x 12% of the monitor — OS close lives here.
        if y <= mon.top + int(mon.height * 0.12) and x >= mon.left + int(mon.width * 0.82):
            return True
    win = find_game_window()
    if win is None:
        return False
    if y < win.top - 8 or y > win.bottom or x < win.left or x > win.right + 8:
        return False
    if y <= win.top + title_h and x >= win.right - close_w:
        return True
    if y <= win.top + int(win.height * 0.14) and x >= win.left + int(win.width * 0.80):
        return True
    almost_fs = False
    if mon is not None:
        almost_fs = abs(win.width - mon.width) < 48 and abs(win.height - mon.height) < 64
    if not almost_fs and win.top <= y <= win.top + title_h:
        return True
    return False


def grab_watch_bgr() -> Optional[tuple["object", tuple[int, int], GameMonitor]]:
    """Screenshot ONLY the watch monitor. Returns (bgr, origin, monitor) or None."""
    import cv2
    import numpy as np

    mon = find_watch_monitor()
    if mon is None:
        return None
    left, top, width, height = mon.left, mon.top, mon.width, mon.height
    try:
        from mss import mss

        with mss() as sct:
            raw = sct.grab(
                {"left": left, "top": top, "width": width, "height": height}
            )
            bgra = np.frombuffer(raw.bgra, dtype=np.uint8).reshape(
                (raw.height, raw.width, 4)
            )
            bgr = cv2.cvtColor(bgra, cv2.COLOR_BGRA2BGR)
            return bgr, (left, top), mon
    except Exception:
        from PIL import ImageGrab

        shot = ImageGrab.grab(bbox=(left, top, left + width, top + height))
        rgb = np.array(shot.convert("RGB"))
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
        return bgr, (left, top), mon
