"""Master tick: watch-guard → HUD → popup → bag → WARN/pack → Spawn Pack / idle.

Does not start itself. The UI calls run_loop(...) on a worker thread.
"""

from __future__ import annotations

import time
from typing import Callable, Optional

import pyautogui

import config
from actions import (
    check_watch_or_stop,
    enable_failsafe,
    failsafe_triggered,
    halt_requested,
    request_auto_stop,
    set_stop_event,
)
from bag_loop import missing_buffs, run_bag_if_needed
from interceptor import try_handle as handle_popup
from matcher import grab_scan, hud_present, log_miss, maybe_save_startup_debug, reset_debug_flag
from monitors import find_watch_monitor
from warn_loop import reset_pack_state, run_pack_tick

StatusFn = Callable[[str], None]
LogFn = Callable[[str], None]


def run_loop(stop_event, on_status: Optional[StatusFn] = None, on_log: Optional[LogFn] = None) -> None:
    def status(msg: str) -> None:
        if on_status:
            on_status(msg)

    if on_log:
        config.set_log_fn(on_log)
    set_stop_event(stop_event)
    reset_debug_flag()
    reset_pack_state()
    config.refresh_template_paths()
    enable_failsafe()
    mon = find_watch_monitor()
    if mon is None:
        request_auto_stop("Sceptre K25 not found")
        status("Stopped")
        config.log("Loop stopped.")
        set_stop_event(None)
        config.set_log_fn(None)
        return

    mode = "DRY-RUN (no clicks)" if config.DRY_RUN else "LIVE"
    hotkey = str(getattr(config, "HOTKEY", "=") or "=").upper()
    config.log(
        f"Loop started ({mode}). Watching {mon.friendly} "
        f"{mon.left},{mon.top} {mon.width}x{mon.height}. "
        f"Confidence={config.CONFIDENCE:g} idle={config.IDLE_SLEEP_SECONDS:g}s. "
        f"Hotkey {hotkey} / leave K25 / Stop to quit. "
        f"Buy mode: {config.buy_mode_label()}. "
        "Spawn click loop. WARN→Okay→EVALUATE_BELT (no instant spawn). "
        "Never clicks Base/Plaza/Sell/Shop/Conveyor Settings."
    )
    status("Scanning")

    try:
        first_tick = True
        while not stop_event.is_set() and not halt_requested():
            if not check_watch_or_stop():
                break
            if failsafe_triggered():
                config.log("Failsafe corner detected — stopping.")
                break
            try:
                grabbed = grab_scan()
                if grabbed[0] is None:
                    log_miss("hud", "[idle] Sceptre K25 capture failed")
                    time.sleep(config.IDLE_SLEEP_SECONDS)
                    continue
                hay, origin = grabbed
                if first_tick:
                    maybe_save_startup_debug(hay, origin)
                    first_tick = False
                if halt_requested():
                    break
                if not hud_present(hay, origin):
                    log_miss("hud", "[idle] game HUD not on Sceptre K25")
                    time.sleep(config.IDLE_SLEEP_SECONDS)
                    continue

                if config.ENABLE_INTERCEPTOR and handle_popup(hay, origin):
                    status("Popup")
                    continue

                if config.ENABLE_AUTO_BUFFS:
                    luck_m, mut_m = missing_buffs(hay, origin)
                    if luck_m or mut_m:
                        status("Bag")
                        if run_bag_if_needed(hay, origin, stop_event):
                            continue

                status("Scanning")
                run_pack_tick(hay, origin, on_status=status)
            except pyautogui.FailSafeException:
                config.log("PyAutoGUI failsafe — stopping.")
                break
            except Exception as exc:
                config.log(f"[loop] error: {exc!r}")
                time.sleep(config.IDLE_SLEEP_SECONDS)
    finally:
        set_stop_event(None)
        config.set_log_fn(None)
        status("Stopped")
        config.log("Loop stopped.")
