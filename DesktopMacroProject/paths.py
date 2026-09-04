"""PyInstaller-safe file locations.

Templates: prefer a PNG sitting next to the .exe (drop-in override without rebuild),
then fall back to files bundled inside the one-file exe (`sys._MEIPASS`).
Writable files (coords, optional log) always stay next to the script or .exe.
"""

from __future__ import annotations

import sys
from pathlib import Path


def _bundle_dir() -> Path:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parent


def _writable_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent


def resource_path(*parts: str) -> Path:
    """Template/asset path. Beside the exe wins if that file exists."""
    beside = _writable_dir().joinpath(*parts)
    if beside.is_file():
        return beside
    return _bundle_dir().joinpath(*parts)


def writable_path(*parts: str) -> Path:
    """User-writable file next to the script or the .exe."""
    return _writable_dir().joinpath(*parts)
