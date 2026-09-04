"""Optional fullscreen overlay to pick a watch region. Not required at startup.

New default is full-screen matching (config.USE_OVERLAY = False).
Set USE_OVERLAY = True in config.py if you want to drag a box first.
"""

from __future__ import annotations

import tkinter as tk
from typing import Optional, Tuple

Region = Tuple[int, int, int, int]
Point = Tuple[int, int]


class _OverlayBase:
    """Shared fullscreen, always-on-top, dimmed canvas."""

    def __init__(self, title: str, hint: str) -> None:
        self.root = tk.Tk()
        self.root.title(title)
        self.root.attributes("-fullscreen", True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-alpha", 0.35)
        self.root.configure(bg="black")
        self.root.overrideredirect(True)

        self.canvas = tk.Canvas(
            self.root,
            cursor="cross",
            bg="black",
            highlightthickness=0,
        )
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.canvas.create_text(
            20,
            20,
            anchor="nw",
            fill="white",
            font=("Segoe UI", 16, "bold"),
            text=hint,
        )
        self.root.bind("<Escape>", self._on_cancel)
        self.root.focus_force()

    def _on_cancel(self, _event=None) -> None:
        self.root.destroy()


def select_region() -> Optional[Region]:
    """Click-and-drag a bounding box. Release confirms. ESC cancels."""
    overlay = _RegionOverlay()
    overlay.root.mainloop()
    return overlay.result


def select_point() -> Optional[Point]:
    """Click once to capture an (x, y). ESC cancels. Unused by the master loop."""
    overlay = _PointOverlay()
    overlay.root.mainloop()
    return overlay.result


class _RegionOverlay(_OverlayBase):
    def __init__(self) -> None:
        super().__init__(
            title="Select region",
            hint="Click and drag to select a watch region. Release to confirm. ESC to cancel.",
        )
        self.start_x: Optional[int] = None
        self.start_y: Optional[int] = None
        self.rect_id: Optional[int] = None
        self.result: Optional[Region] = None
        self.canvas.bind("<ButtonPress-1>", self._on_press)
        self.canvas.bind("<B1-Motion>", self._on_drag)
        self.canvas.bind("<ButtonRelease-1>", self._on_release)

    def _on_press(self, event: tk.Event) -> None:
        self.start_x = event.x
        self.start_y = event.y
        if self.rect_id is not None:
            self.canvas.delete(self.rect_id)
        self.rect_id = self.canvas.create_rectangle(
            self.start_x,
            self.start_y,
            self.start_x,
            self.start_y,
            outline="#00FF66",
            width=2,
        )

    def _on_drag(self, event: tk.Event) -> None:
        if self.rect_id is None or self.start_x is None or self.start_y is None:
            return
        self.canvas.coords(self.rect_id, self.start_x, self.start_y, event.x, event.y)

    def _on_release(self, event: tk.Event) -> None:
        if self.start_x is None or self.start_y is None:
            return
        x1, y1 = self.start_x, self.start_y
        x2, y2 = event.x, event.y
        left = min(x1, x2)
        top = min(y1, y2)
        width = abs(x2 - x1)
        height = abs(y2 - y1)
        if width < 5 or height < 5:
            return
        self.result = (left, top, width, height)
        self.root.destroy()


class _PointOverlay(_OverlayBase):
    def __init__(self) -> None:
        super().__init__(
            title="Select point",
            hint="Click once to capture a point, or ESC to skip.",
        )
        self.result: Optional[Point] = None
        self.canvas.bind("<ButtonPress-1>", self._on_click)

    def _on_click(self, event: tk.Event) -> None:
        self.result = (event.x, event.y)
        self.root.destroy()
