"""PackMacro UI. Does not start the loop until you press Start.

    python main.py

Stop with the Stop button, Ctrl+C, or by moving the mouse into a screen corner.
Do not auto-start. The compiled PackMacro.exe launches this same window.
"""

from __future__ import annotations

import subprocess
import sys
import threading
import tkinter as tk
from tkinter import ttk

REQUIRED_IMPORTS = ("pyautogui", "PIL", "cv2", "pynput", "mss")
PIP_PACKAGES = ("pyautogui", "pillow", "opencv-python", "pynput", "keyboard", "mss")


def ensure_packages() -> None:
    missing = []
    for name in REQUIRED_IMPORTS:
        try:
            __import__(name)
        except ImportError:
            missing.append(name)
    if missing:
        subprocess.check_call([sys.executable, "-m", "pip", "install", *PIP_PACKAGES])
    import cv2  # noqa: F401
    import pyautogui  # noqa: F401
    from PIL import Image  # noqa: F401


def enable_windows_dpi_awareness() -> None:
    if sys.platform != "win32":
        return
    try:
        import ctypes

        try:
            ctypes.windll.shcore.SetProcessDpiAwareness(2)
        except Exception:
            ctypes.windll.user32.SetProcessDPIAware()
    except Exception:
        pass


class PackMacroApp(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("PackMacro")
        self.geometry("520x600")
        self.minsize(460, 500)

        self._stop = threading.Event()
        self._thread: threading.Thread | None = None

        self.status_var = tk.StringVar(value="Idle")
        self.watch_var = tk.StringVar(value="Watching: …")
        self.conf_var = tk.DoubleVar(value=0.80)
        self.idle_var = tk.StringVar(value="0.5")
        self.popup_var = tk.BooleanVar(value=False)
        self.buy_mode_var = tk.StringVar(value="Rebellion + rarity")
        self.buff_var = tk.BooleanVar(value=False)
        self.dry_var = tk.BooleanVar(value=False)
        self.top_var = tk.BooleanVar(value=True)
        self.hotkey_var = tk.StringVar(value="=")
        self._hotkey_backend = None
        self._pynput_listener = None

        self._build()
        self.protocol("WM_DELETE_WINDOW", self._on_close)
        self._apply_topmost()
        self.after(200, self._install_hotkey)
        self.after(150, self._refresh_watch)
        self.after(250, self._poll_auto_stop)

    def _build(self) -> None:
        pad = {"padx": 10, "pady": 4}

        row = ttk.Frame(self)
        row.pack(fill="x", **pad)
        self.start_btn = ttk.Button(row, text="Start", command=self._start)
        self.start_btn.pack(side="left")
        self.stop_btn = ttk.Button(row, text="Stop", command=self._stop_loop, state="disabled")
        self.stop_btn.pack(side="left", padx=(8, 0))
        ttk.Label(row, text="Status:").pack(side="left", padx=(16, 4))
        ttk.Label(row, textvariable=self.status_var, font=("Segoe UI", 11, "bold")).pack(side="left")

        ttk.Label(self, textvariable=self.watch_var, font=("Segoe UI", 10, "bold")).pack(
            anchor="w", padx=10, pady=(0, 2)
        )

        conf = ttk.Frame(self)
        conf.pack(fill="x", **pad)
        ttk.Label(conf, text="Confidence").pack(side="left")
        scale = ttk.Scale(
            conf,
            from_=0.50,
            to=0.95,
            variable=self.conf_var,
            command=lambda _v: self.conf_label.config(text=f"{self.conf_var.get():.2f}"),
        )
        scale.pack(side="left", fill="x", expand=True, padx=8)
        self.conf_label = ttk.Label(conf, text="0.80", width=4)
        self.conf_label.pack(side="left")

        idle = ttk.Frame(self)
        idle.pack(fill="x", **pad)
        ttk.Label(idle, text="Idle delay (seconds)").pack(side="left")
        ttk.Entry(idle, textvariable=self.idle_var, width=6).pack(side="left", padx=8)

        opts = ttk.Frame(self)
        opts.pack(fill="x", **pad)
        ttk.Checkbutton(
            opts,
            text="Close in-game overlay X (never the Roblox window Close)",
            variable=self.popup_var,
        ).pack(anchor="w")
        buy_row = ttk.Frame(opts)
        buy_row.pack(anchor="w", fill="x")
        ttk.Label(buy_row, text="Buy mode:").pack(side="left")
        buy_combo = ttk.Combobox(
            buy_row,
            textvariable=self.buy_mode_var,
            values=("Rebellion + rarity", "All packs (test)"),
            state="readonly",
            width=22,
        )
        buy_combo.pack(side="left", padx=8)
        buy_combo.bind("<<ComboboxSelected>>", lambda _e: self._apply_settings())
        ttk.Checkbutton(opts, text="Auto-buffs / Items bag", variable=self.buff_var).pack(anchor="w")
        ttk.Checkbutton(
            opts,
            text="Dry run — detect only, do not click",
            variable=self.dry_var,
            command=self._on_dry_toggle,
        ).pack(anchor="w")
        ttk.Checkbutton(
            opts,
            text="Always on top",
            variable=self.top_var,
            command=self._apply_topmost,
        ).pack(anchor="w")

        hk = ttk.Frame(self)
        hk.pack(fill="x", **pad)
        ttk.Label(hk, text="Start/Stop hotkey:").pack(side="left")
        hk_entry = ttk.Entry(hk, textvariable=self.hotkey_var, width=6)
        hk_entry.pack(side="left", padx=8)
        hk_entry.bind("<FocusOut>", lambda _e: self._install_hotkey())
        hk_entry.bind("<Return>", lambda _e: self._install_hotkey())
        ttk.Label(hk, text="(global — works while the game is focused)").pack(side="left")

        ttk.Label(
            self,
            text="Failsafe: R, Stop, leave Sceptre K25, or tab to the other monitor.\n"
            "Watches Sceptre K25 only. Start with R while the game is focused on K25.\n"
            "Loop: Spawn Pack. WARN→Okay, wait, then E (whitelist or all-packs). Not both in one tick.\n"
            "Never clicks Base, Plaza, Sell, Shop, or Conveyor Settings.",
            wraplength=480,
        ).pack(fill="x", **pad)

        ttk.Label(self, text="Log").pack(anchor="w", padx=10)
        log_frame = ttk.Frame(self)
        log_frame.pack(fill="both", expand=True, padx=10, pady=(0, 10))
        self.log_box = tk.Text(log_frame, height=14, wrap="word", state="disabled")
        scroll = ttk.Scrollbar(log_frame, command=self.log_box.yview)
        self.log_box.configure(yscrollcommand=scroll.set)
        self.log_box.pack(side="left", fill="both", expand=True)
        scroll.pack(side="right", fill="y")

        self._append_log("Idle. Dry run OFF — Start or R for LIVE clicks on Sceptre K25 only.")
        self._append_log("Press R while the game is focused and the cursor is on Sceptre K25.")
        self._append_log("Buy mode default: Rebellion + rarity. All packs (test) always E after Okay wait.")
        self._append_log("Tabbing away auto-stops the loop (window stays open). Never clicks Base/Plaza/Sell/Shop/Conveyor Settings.")

    def _apply_topmost(self) -> None:
        self.attributes("-topmost", bool(self.top_var.get()))

    def _append_log(self, msg: str) -> None:
        self.log_box.configure(state="normal")
        self.log_box.insert("end", msg.rstrip() + "\n")
        lines = int(self.log_box.index("end-1c").split(".")[0])
        if lines > 400:
            self.log_box.delete("1.0", "100.0")
        self.log_box.see("end")
        self.log_box.configure(state="disabled")

    def log_from_thread(self, msg: str) -> None:
        self.after(0, lambda m=msg: self._append_log(m))

    def status_from_thread(self, msg: str) -> None:
        self.after(0, lambda m=msg: self.status_var.set(m))

    def _apply_settings(self) -> None:
        import config

        try:
            config.CONFIDENCE = float(self.conf_var.get())
        except (TypeError, ValueError):
            config.CONFIDENCE = 0.8
        try:
            config.IDLE_SLEEP_SECONDS = max(0.1, float(self.idle_var.get()))
        except (TypeError, ValueError):
            config.IDLE_SLEEP_SECONDS = 0.5
        config.ENABLE_INTERCEPTOR = bool(self.popup_var.get())
        label = (self.buy_mode_var.get() or "Rebellion + rarity").strip()
        if label.startswith("All packs"):
            config.BUY_MODE = config.BUY_MODE_ALL_PACKS
        else:
            config.BUY_MODE = config.BUY_MODE_REBELLION_RARITY
        config.ENABLE_AUTO_BUY = True
        config.ENABLE_AUTO_BUFFS = bool(self.buff_var.get())
        config.DRY_RUN = bool(self.dry_var.get())
        config.HOTKEY = self._hotkey_name()

    def _on_dry_toggle(self) -> None:
        import config

        config.DRY_RUN = bool(self.dry_var.get())
        self._append_log("Dry run ON — detect only" if config.DRY_RUN else "Dry run OFF — LIVE clicks")

    def _refresh_watch(self) -> None:
        from monitors import find_watch_monitor

        mon = find_watch_monitor()
        if mon is None:
            self.watch_var.set("Watching: monitor not found")
        else:
            self.watch_var.set(
                f"Watching: {mon.friendly}  ({mon.left},{mon.top} {mon.width}x{mon.height})"
            )
        self.after(2000, self._refresh_watch)

    def _poll_auto_stop(self) -> None:
        # Stops the worker only. Never destroys or relaunches this window.
        if self._loop_running() and not self._stop.is_set():
            from monitors import cursor_on_watch, find_watch_monitor, foreground_on_watch

            mon = find_watch_monitor()
            if mon is None:
                self._stop_loop(source="auto")
                self._append_log("[auto-stop] Sceptre K25 not found")
            elif not cursor_on_watch(mon):
                self._stop_loop(source="auto")
                self._append_log("[auto-stop] cursor left Sceptre K25")
            elif not foreground_on_watch(mon):
                self._stop_loop(source="auto")
                self._append_log("[auto-stop] focus left Sceptre K25")
        self.after(250, self._poll_auto_stop)

    def _start(self) -> None:
        if self._thread is not None and self._thread.is_alive():
            return
        from monitors import find_watch_monitor

        if find_watch_monitor() is None:
            self._append_log("Sceptre K25 not found — IDLE, no clicks.")
            return
        self._apply_settings()
        self._stop = threading.Event()
        self.start_btn.configure(state="disabled")
        self.stop_btn.configure(state="normal")
        self.status_var.set("Scanning")
        mode = "DRY" if self.dry_var.get() else "LIVE"
        import config

        self._append_log(
            f"Start pressed ({mode}, {config.buy_mode_label()}). watching Sceptre K25 only"
        )

        def worker() -> None:
            from engine import run_loop

            run_loop(self._stop, on_status=self.status_from_thread, on_log=self.log_from_thread)
            self.after(0, self._on_thread_done)

        self._thread = threading.Thread(target=worker, daemon=True)
        self._thread.start()

    def _on_thread_done(self) -> None:
        self.start_btn.configure(state="normal")
        self.stop_btn.configure(state="disabled")
        if self.status_var.get() != "Stopped":
            self.status_var.set("Idle")

    def _stop_loop(self, source: str = "button") -> None:
        # Halt the scan thread only. Do not destroy() or create a new Tk root.
        self._stop.set()
        self.status_var.set("Stopped")
        if source == "hotkey":
            self._append_log("[hotkey] stopped")
        elif source == "auto":
            self._append_log("Auto-stopped.")
        else:
            self._append_log("Stop pressed.")

    def _hotkey_name(self) -> str:
        raw = (self.hotkey_var.get() or "=").strip().lower()
        if not raw:
            return "="
        return raw.split()[0][:16]

    def _loop_running(self) -> bool:
        return self._thread is not None and self._thread.is_alive()

    def _toggle_from_hotkey(self) -> None:
        if self._loop_running():
            self._stop_loop(source="hotkey")
        else:
            self._append_log("[hotkey] starting")
            self._start()

    def _install_hotkey(self) -> None:
        key = self._hotkey_name()
        self.hotkey_var.set(key.upper())
        self._remove_hotkey()
        try:
            import keyboard

            keyboard.add_hotkey(key, lambda: self.after(0, self._toggle_from_hotkey), suppress=False)
            self._hotkey_backend = "keyboard"
            self._append_log(f"Start/Stop hotkey: {key.upper()} (global)")
            return
        except Exception:
            self._hotkey_backend = None
        try:
            from pynput import keyboard as pk

            want = key

            def on_press(pressed) -> None:
                name = None
                try:
                    if getattr(pressed, "char", None):
                        name = str(pressed.char).lower()
                except Exception:
                    name = None
                if name is None:
                    try:
                        name = str(pressed).replace("Key.", "").lower()
                    except Exception:
                        name = None
                if name == want:
                    self.after(0, self._toggle_from_hotkey)

            listener = pk.Listener(on_press=on_press)
            listener.daemon = True
            listener.start()
            self._pynput_listener = listener
            self._hotkey_backend = "pynput"
            self._append_log(f"Start/Stop hotkey: {key.upper()} (global)")
        except Exception as exc:
            self._append_log(f"[hotkey] could not bind {key.upper()}: {exc!r}")

    def _remove_hotkey(self) -> None:
        if self._hotkey_backend == "keyboard":
            try:
                import keyboard

                keyboard.clear_all_hotkeys()
            except Exception:
                pass
        if self._pynput_listener is not None:
            try:
                self._pynput_listener.stop()
            except Exception:
                pass
            self._pynput_listener = None
        self._hotkey_backend = None

    def _on_close(self) -> None:
        self._stop.set()
        self._remove_hotkey()
        self.destroy()


def main() -> None:
    enable_windows_dpi_awareness()
    ensure_packages()
    app = PackMacroApp()
    app.mainloop()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped (KeyboardInterrupt).")
