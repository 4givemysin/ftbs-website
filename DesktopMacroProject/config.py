"""Master-loop settings. Full-screen scan by default (no overlay required).

Loop order (see engine.py / warn_loop.py):
  1) FAILSAFE corner / Stop / R / leave Sceptre K25
  2) popup interceptor (popup_close_x.png)
  3) bag/buff restock ONLY if Auto-buffs is checked (off by default)
  4) Click Spawn Pack (main loop). Do not scan the belt every tick.
  5) If red WARN banner or green Okay is visible → click Okay (do not match Dynasty).
  6) After Okay enter EVALUATE_BELT: wait settle (both buy modes).
     Do not click Spawn Pack on the same tick as Okay.
     Rebellion + rarity: whitelist rarity (and Rebellion) → E, then Spawn Pack.
     All packs (test): always E after settle, no rarity/name gate, then Spawn Pack.

Do not OCR/scan every pack on the belt every tick.
Never click Base, Plaza, Sell, Shop, or Conveyor Settings.

PyAutoGUI FAILSAFE: move the mouse into any screen corner to kill the loop.
"""

from __future__ import annotations

from typing import Callable, Optional

from paths import resource_path, writable_path

# --- Matching -----------------------------------------------------------
CONFIDENCE = 0.8
USE_GRAYSCALE = False
# Cover chat-crop vs live UI, plus this 1024-wide plaza shot vs 1080p/1440p.
MATCH_SCALES = (
    0.40, 0.46, 0.52, 0.58, 0.67, 0.77, 0.88,
    1.00, 1.15, 1.32, 1.50, 1.65,
    1.85, 2.05, 2.20,
)
MIN_TEMPLATE_SIDE = 12
SMALL_TEMPLATE_SIDE = 40
SMALL_TEMPLATE_CONFIDENCE = 0.74
SPAWN_TEXT_CONFIDENCE = 0.70  # "Spawn Pack" words — more stable than the 3D brick
SPAWN_CONFIDENCE = 0.62  # typical-camera green ? + words; multi-scale covers zoom
SPAWN_MARK_CONFIDENCE = 0.68  # green ? fallback
SPAWN_PARTIAL_CONFIDENCE = 0.76  # half-word fragments; keep strict to avoid shop UI
SPAWN_TEXT_MAX_SCALE = 1.40  # tiny text at 2.20x matches shop-card "Pack"
SPAWN_PARTIAL_MAX_SCALE = 1.40
SPAWN_PEDESTAL_MAX_SCALE = 1.85  # green ? + words; skip 2.05/2.20 shop false hits
SPAWN_SEARCH_Y_FRACTION = 0.50  # 3D pedestal lives in the bottom half of K25
CLICK_MOVE_DURATION = 0.35  # visible slide on both axes; do not teleport
CLICK_HOVER_SECONDS = 0.10
CLICK_ARRIVE_PX = 15  # after moveTo, position() must be this close or no LIVE log
IDLE_SLEEP_SECONDS = 0.5
WARN_DISMISS_SECONDS = 0.2  # click Okay only; belt settle is separate
WARN_OKAY_SETTLE_SECONDS = 1.2  # wait after Okay before first belt read
BELT_EVAL_TIMEOUT_SECONDS = 3.0  # retries after settle; then E vs spawn
BELT_EVAL_RETRY_SECONDS = 0.3
POST_ACTION_SECONDS = 0.8
BUY_TO_SPAWN_SECONDS = 0.25
MISS_LOG_SECONDS = 4.0
# Game monitor is Sceptre K25. Never scan Windows "primary" or all monitors.
SCAN_ALL_MONITORS = False
WATCH_MONITOR = "Sceptre K25"
HOTKEY = "="  # Start/Stop; global. Default equals so R is free in-game.
BAG_TOGGLE_COOLDOWN_SECONDS = 2.5
BAG_VERIFY_SECONDS = 0.9
HUD_MIN_HITS = 1  # items bag or Spawn Pack — never require Base/Plaza

# --- Feature toggles (UI can change these before Start) -----------------
ENABLE_INTERCEPTOR = False  # off by default — overlay X was closing Roblox
# In-game overlay X only. Never the Windows/Roblox window Close button.
WINDOW_TITLEBAR_PX = 80
WINDOW_CLOSE_WIDTH_PX = 140
POPUP_X_DARK_MAX = 90  # mean brightness around in-game X (Join Event is dark)
GAME_WINDOW_TITLE_HINTS = ("roblox",)
ENABLE_AUTO_BUY = True
# rebellion_rarity = whitelist gate (default). all_packs = always E after settle.
BUY_MODE_REBELLION_RARITY = "rebellion_rarity"
BUY_MODE_ALL_PACKS = "all_packs"
BUY_MODE = BUY_MODE_REBELLION_RARITY
BUY_MODE_CHOICES = (
    (BUY_MODE_REBELLION_RARITY, "Rebellion + rarity"),
    (BUY_MODE_ALL_PACKS, "All packs (test)"),
)
ENABLE_AUTO_BUFFS = False  # optional; off so bag does not steal the spawn loop
ENABLE_BASE_RETURN = False  # NEVER click Base — user is already centered at Base
DRY_RUN = False  # find templates, log them, never click or press keys


def buy_mode_label(mode: str | None = None) -> str:
    want = BUY_MODE if mode is None else mode
    for key, label in BUY_MODE_CHOICES:
        if key == want:
            return label
    return "Rebellion + rarity"


def is_all_packs_mode() -> bool:
    return BUY_MODE == BUY_MODE_ALL_PACKS


# --- Template filenames -------------------------------------------------
POPUP_CLOSE_X = "popup_close_x.png"
WARN_BANNER = "warn_banner.png"
OKAY_BUTTON = "okay_button.png"
SPAWN_PACK = "spawn_pack.png"
SPAWN_PACK_TEXT = "spawn_pack_text.png"
SPAWN_PACK_MARK = "spawn_pack_mark.png"
SPAWN_PACK_ALT = "spawn_pack_alt.png"
SPAWN_PACK_SP = "spawn_sp.png"
SPAWN_PACK_AWN = "spawn_awn.png"
SPAWN_PACK_PA = "spawn_pack_pa.png"
BUY_E = "buy_e.png"
ITEMS_BAG = "items_bag.png"
PLAZA_TAB = "plaza_tab.png"
BASE_BUTTON = "base_button.png"
LUCK_III = "luck_iii.png"
MUTATION_III = "mutation_iii.png"
USE_1X = "use_1x.png"
USE_5X = "use_5x.png"
BUFF_LUCK = "buff_luck.png"
BUFF_MUTATION = "buff_mutation.png"

PACK_TEMPLATES = [
    "rebellion_pack.png",
]

RARITY_TEMPLATES = [
    "rarity_blessed.png",
    "rarity_radioactive.png",
    "rarity_glitch.png",
    "rarity_starfallen.png",
    "rarity_admin.png",
    "rarity_nullstar.png",
    "rarity_venomous.png",
]

# None = full virtual desktop. Optional (left, top, width, height).
SCAN_REGION = None
POPUP_REGION = None
WARN_REGION = None
OKAY_REGION = None
PACK_REGION = None
RARITY_REGION = None
BUY_REGION = None
SPAWN_REGION = None
BAG_REGION = None
BUFF_BOTTOM_FRACTION = 0.45  # search buff icons in the bottom portion of the shot

# --- Interceptor / claim ------------------------------------------------
POPUP_RESUME_WAIT_SECONDS = 1.0
CLAIM_KEY = "e"

# --- Bag / potions ------------------------------------------------------
USE_5X_CLICKS = 5
USE_1X_CLICKS = 1
BAG_STEP_SECONDS = 0.45
BAG_OPEN_WAIT_SECONDS = 0.55

# --- Overlay (off) ------------------------------------------------------
USE_OVERLAY = False
COORDS_FILE = writable_path("selected_coords.json")

_log_fn: Optional[Callable[[str], None]] = None


def set_log_fn(fn: Optional[Callable[[str], None]]) -> None:
    global _log_fn
    _log_fn = fn


def log(msg: str) -> None:
    print(msg)
    if _log_fn is not None:
        try:
            _log_fn(msg)
        except Exception:
            pass
    try:
        from datetime import datetime

        path = writable_path("packmacro_live.log")
        with path.open("a", encoding="utf-8") as fh:
            fh.write(f"{datetime.now().strftime('%H:%M:%S')} {msg.rstrip()}\n")
    except Exception:
        pass


def template_path(filename: str):
    return resource_path(filename)


TEMPLATE_PATHS = {
    "popup_close_x": template_path(POPUP_CLOSE_X),
    "warn_banner": template_path(WARN_BANNER),
    "okay_button": template_path(OKAY_BUTTON),
    "spawn_pack": template_path(SPAWN_PACK),
    "spawn_pack_text": template_path(SPAWN_PACK_TEXT),
    "spawn_pack_mark": template_path(SPAWN_PACK_MARK),
    "spawn_pack_alt": template_path(SPAWN_PACK_ALT),
    "spawn_sp": template_path(SPAWN_PACK_SP),
    "spawn_awn": template_path(SPAWN_PACK_AWN),
    "spawn_pack_pa": template_path(SPAWN_PACK_PA),
    "buy_e": template_path(BUY_E),
    "items_bag": template_path(ITEMS_BAG),
    "luck_iii": template_path(LUCK_III),
    "mutation_iii": template_path(MUTATION_III),
    "use_1x": template_path(USE_1X),
    "use_5x": template_path(USE_5X),
    "buff_luck": template_path(BUFF_LUCK),
    "buff_mutation": template_path(BUFF_MUTATION),
    "packs": [template_path(name) for name in PACK_TEMPLATES],
    "rarities": [template_path(name) for name in RARITY_TEMPLATES],
}


def refresh_template_paths() -> None:
    """Rebuild paths (e.g. after dropping new PNGs next to the exe)."""
    TEMPLATE_PATHS["popup_close_x"] = template_path(POPUP_CLOSE_X)
    TEMPLATE_PATHS["warn_banner"] = template_path(WARN_BANNER)
    TEMPLATE_PATHS["okay_button"] = template_path(OKAY_BUTTON)
    TEMPLATE_PATHS["spawn_pack"] = template_path(SPAWN_PACK)
    TEMPLATE_PATHS["spawn_pack_text"] = template_path(SPAWN_PACK_TEXT)
    TEMPLATE_PATHS["spawn_pack_mark"] = template_path(SPAWN_PACK_MARK)
    TEMPLATE_PATHS["spawn_pack_alt"] = template_path(SPAWN_PACK_ALT)
    TEMPLATE_PATHS["spawn_sp"] = template_path(SPAWN_PACK_SP)
    TEMPLATE_PATHS["spawn_awn"] = template_path(SPAWN_PACK_AWN)
    TEMPLATE_PATHS["spawn_pack_pa"] = template_path(SPAWN_PACK_PA)
    TEMPLATE_PATHS["buy_e"] = template_path(BUY_E)
    TEMPLATE_PATHS["items_bag"] = template_path(ITEMS_BAG)
    TEMPLATE_PATHS["luck_iii"] = template_path(LUCK_III)
    TEMPLATE_PATHS["mutation_iii"] = template_path(MUTATION_III)
    TEMPLATE_PATHS["use_1x"] = template_path(USE_1X)
    TEMPLATE_PATHS["use_5x"] = template_path(USE_5X)
    TEMPLATE_PATHS["buff_luck"] = template_path(BUFF_LUCK)
    TEMPLATE_PATHS["buff_mutation"] = template_path(BUFF_MUTATION)
    TEMPLATE_PATHS["packs"] = [template_path(name) for name in PACK_TEMPLATES]
    TEMPLATE_PATHS["rarities"] = [template_path(name) for name in RARITY_TEMPLATES]
