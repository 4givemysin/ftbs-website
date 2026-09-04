"""Set per-monitor DPI awareness before tkinter/pyautogui.

Must run first so mss screenshots and pyautogui.moveTo share physical pixels.
"""
import sys

if sys.platform == "win32":
    try:
        import ctypes

        try:
            ctypes.windll.shcore.SetProcessDpiAwareness(2)
        except Exception:
            ctypes.windll.user32.SetProcessDPIAware()
    except Exception:
        pass
