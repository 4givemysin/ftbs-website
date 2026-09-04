# PackMacro roadmap

Basics first. Extra features wait until spawn + WARN + buy actually work.

**Rule:** do not start extras until Phase 0 exit criteria pass.

Status as of **Sep 4, 2026 ~10:43 AM** (paused — resume with `python main.py`).

---

## Phase timeline

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Basics | In progress — mouse works in Roblox (SendInput). Spawn/WARN/buy still need a clean live pass. |
| 1 | Core loop solid | Gated on Phase 0 |
| 2 | Buffs / Items | Half-built, off by default |
| 3 | Later extras | Backlog — Plaza/boss portal queued |

---

## Phase 0 — Basics (must finish first)

Paused mid-test. Extra features wait until spawn, WARN, and buy actually work.

### Exit criteria (do not start extras until these pass)

1. Mouse visibly slides to Spawn Pack and left-clicks; the game registers the spawn
2. Log never says LIVE click if the mouse did not move there
3. WARN → Okay → wait → read rarity (or All packs always E) → then spawn
4. Stays on belt camera (never clicks Base)
5. Off K25 = no mouse move, loop stops

### Done this morning

- [x] SendInput mouse — Roblox sees the cursor (not SetCursorPos)
- [x] Slide on X/Y, hover, left mouseDown/Up
- [x] Honest LIVE log only if pointer arrived
- [x] Partial word match for Spawn Pack
- [x] Overlay X **off** (was closing Roblox window)
- [x] Window Close / title bar keepout
- [x] Windowed (not exclusive fullscreen) OK
- [x] Start/Stop default **`=`**

### Still flaky / next session

- Confirm spawn click registers every time
- WARN → Okay → belt rarity / All packs E
- `PackMacro.exe` one-file build crashed (`encodings` module) — use `python main.py`

### Already in place (DONE-ish)

- Sceptre K25 lock
- Auto-stop if cursor/tab leaves that screen
- No Base / Plaza / Sell / Shop / Conveyor Settings clicks
- WARN Okay
- Wait after Okay before spawn
- Buy mode dropdown (Rebellion+rarity vs All packs test)
- Start/Stop hotkey default **`=`** (source; restart PackMacro to pick up)
- Windowed exe
- `E` buy path exists

---

## Phase 1 — Core loop solid

Start only after Phase 0 exit criteria pass.

- Spawn: 3D pedestal first, else full "Spawn Pack" text, else partial letters
- WARN always Rebellion (conveyor already set)
- Rebellion+rarity whitelist: Blessed, Radioactive, Glitch, Starfallen, Admin, Nullstar, Venomous
- All packs test mode for faster debugging
- Popup X closer (optional checkbox)

---

## Phase 2 — Buffs / Items

Already half-built. Keep **off by default** until the spawn loop is honest.

- Open Items only if bottom buff icons missing
- Luck III + Mutation III, Use 5x then Use 1x
- Do not steal focus from spawn loop; only when buffs expired

---

## Phase 3 — Later extras (backlog)

Do **not** build this until Phase 0–1 spawn/WARN/buy is solid.

### Plaza → boss portal → fight → Base (user requested 2026-09-04)

After a fight cycle, more automation:

1. Click **Plaza**
2. Move the camera until the **boss fight portal** is in view
3. Walk into the portal on its own
4. Select the **right cards** and the **right difficulty**
5. When the fight is finished, **return to Base**
6. Walk a little **forward** and set the **camera** so Spawn Pack, the belt pack, WARN/Okay, and E Buy are all in frame again

Needs from you later (screenshots, not now): Plaza button, portal, walk path, card-select UI, difficulty UI, “fight over” cue, Base button, and the parked camera at the belt.

### Other wanted later

- OCR for pack names if templates stay flaky
- More pack types in the dropdown
- Stats (spawns, buys, skips)
- Hide/show log
- Windowed (not exclusive fullscreen) is OK
- Never click the Windows/Roblox **window Close (X)** or title bar; only the dark in-game overlay X
- `=` hotkey is now the source default (restart / next run)
- Don't reopen exe on every tiny tweak (dev workflow)

### Wanted later (add items here)

Add more `-` bullets below this line.
