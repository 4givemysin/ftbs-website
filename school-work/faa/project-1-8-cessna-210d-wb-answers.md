# Project 1-8 Weight & Balance — Cessna 210D Answers
**Aircraft:** TEXTRON / CESSNA CENTURION 210D · S/N **21058230**  
**TCDS:** **3A21** (eligible S/N 21058221–21058510)  
**Units used:** lb, in, lb-in, gal, qt, rpm, b.hp

> Confirm oil density with your instructor if your class uses a different lb/qt than **7.5 lb/gal (1.875 lb/qt)**.  
> Tare assumed **0 lb** (blank on sheet).

---

## Page 2 — Research form (TCDS 3A21)

| Block | Answer |
|-------|--------|
| **TCDS Number** | **3A21** |
| **Datum Location** | Fuselage station **0.0 in** — **front face of firewall** |
| **Engine Max BHP & RPM** | **285 b.hp** @ **2700 rpm** (Continental **IO-520-A**) |
| **Maximum Gross Weight** | **3100 lb** |
| **Leveling Means** | **Baggage compartment floor** (also top of tailcone per TCDS notes for some models) |
| **Fuel capacity and location** | **65 gal** total (**63.4 gal** usable); two **32.5 gal** wing tanks at **+48 in** |
| **Oil capacity and location** | **12 qt** at **−19.4 in** (**6 qt** usable) |
| **Seat locations and number of seats** | **4 seats**: 2 at **+36 in**, 2 at **+70 in** |
| **Baggage Max Weight / Location** | See aircraft W&B data (TCDS: “Reference weight and balance data”; many early 210s **120 lb** aft — use POH/equipment list if assigned) |

### CG Range Table (Normal Category, landing gear extended)

| | FWD CG LIMIT | AFT CG LIMIT | Weight |
|--|--------------|--------------|--------|
| Normal Cat. | **+39.2 in** | **+46.6 in** | **3100 lb** |
| Normal Cat. | **+33.0 in** | **+46.6 in** | **2250 lb** or less |
| Normal Cat. | Straight-line variation between points | | |

---

## Weighing sheet (scale readings)

Assume **tare = 0 lb** (not written on sheet).

| Weighing point | Scale reading | − Tare | = Net weight | × Arm | = Moment |
|----------------|---------------|--------|--------------|-------|----------|
| LEFT MAIN | **629 lb** | **0 lb** | **629 lb** | **59.75 in** | **37,582.75 lb-in** |
| RIGHT MAIN | **623 lb** | **0 lb** | **623 lb** | **59.75 in** | **37,224.25 lb-in** |
| NOSE | **713 lb** | **0 lb** | **713 lb** | **−7.0625 in** | **−5,035.56 lb-in** |
| **TOTAL AS WEIGHED** | | | **1,965 lb** | **CG 35.51 in** | **69,771.44 lb-in** |

**As-weighed CG** = total moment ÷ total weight  
`69,771.44 lb-in ÷ 1,965 lb =` → **35.51 in**

---

## Empty weight (add full oil — sheet note)

Aircraft weighed with **ZERO OIL**. Add full oil for Part 23 empty weight.

| Item | Net weight | Arm | Moment |
|------|------------|-----|--------|
| AIRCRAFT AS WEIGHED | **1,965 lb** | **35.51 in** | **69,771.44 lb-in** |
| ENGINE #1 OIL FULL = **12 qt** | **22.5 lb** *(12 qt × 1.875 lb/qt)* | **−19.4 in** | **−436.50 lb-in** |
| **CORRECTED AIRCRAFT EW & MOMENT** | **1,987.5 lb** | **34.89 in** | **69,334.94 lb-in** |

### Bottom blocks
| Item | Answer |
|------|--------|
| **CG RANGE** | **(+39.2 in)** to **(+46.6 in)** at **3100 lb** |
| | **(+33.0 in)** to **(+46.6 in)** at **2250 lb** or less |
| **MAXIMUM ALLOWABLE GROSS WEIGHT** | **3100 lb** |
| **AIRCRAFT CURRENT EMPTY WEIGHT CG** | **34.89 in** |
| **AIRCRAFT CURRENT EMPTY WEIGHT** | **1,987.5 lb** |
| **AIRCRAFT USEFUL LOAD** | **1,112.5 lb** *(3100 − 1987.5)* |

---

## Ballast / baggage fix (out of limits page)

**Given:** Aircraft **2400 lb** · CG **49.0 in** · Limits **35.0 in – 48.0 in** · Baggage **70.0 in** · Fwd ballast **18.0 in**

CG is **aft** of aft limit by: `49.0 − 48.0 =` → **1.0 in**

### Fix with ballast (forward)
**Ballast weight = (Aircraft weight × distance to CG limit) ÷ (ballast station to CG limit)**

| Item | Value |
|------|--------|
| Aircraft | **2400 lb** @ **49.0 in** |
| CG limit exceeded | **Aft 48.0 in** |
| Distance to CG limit | **1.0 in** |
| Ballast arm to datum | **18.0 in** |
| Ballast arm to CG limit | `48.0 − 18.0 =` **30.0 in** |
| Empty wt × dist to limit | `2400 lb × 1.0 in =` **2400 lb-in** |
| **Ballast weight** | `2400 ÷ 30 =` → **80.0 lb** |

### Fix by removing baggage
| Item | Value |
|------|--------|
| Distance to CG limit | **1.0 in** |
| Baggage arm to datum | **70.0 in** |
| Baggage arm to CG limit | `70.0 − 48.0 =` **22.0 in** |
| Aircraft wt × dist | **2400 lb-in** |
| **Baggage weight to remove** | `2400 ÷ 22 =` → **109.09 lb** |

---

## Short answers (mechanic actions / hazards)

### 1) Actions to assure aircraft is within CG / weight limits
- Research TCDS / AFM / current W&B records for max weight and CG envelope.  
- Weigh or compute with current equipment list; include oil/fuel rules required by Part 23 / procedure.  
- Account for **tare** (chocks, jacks, etc.).  
- Compute loaded weight and CG (`CG = total moment ÷ total weight`).  
- If over weight: reduce fuel, baggage, or passengers.  
- If CG out of limits: shift load, reduce baggage, or add **ballast** at the correct station; recompute.  
- Update equipment list / logbook when equipment or ballast changes; placard as required.  
- Do not return to service until within limits.

### 2) Hazards of exceeding forward or aft CG limits
- **Too far forward:** heavy nose — hard to rotate, hard flare, higher stall speed, possible nosewheel damage / porpoising.  
- **Too far aft:** light nose — pitch unstable, easy to stall/spin, hard or impossible recovery, elevator less effective for recovery.  
- Either condition can cause loss of control and structural overload.

---

## Sample logbook entry (ballast added)

**DATE:** (today’s date)  
**TACH TIME:** UNK  
**TOTAL TIME IN SERVICE:** UNK  

**MAINTENANCE ENTRY:**  
Installed **80.0 lb** ballast at station **18.0 in** to correct aft CG condition (aircraft was **2400 lb** at CG **49.0 in**; aft limit **48.0 in**). Recalculated weight and balance; aircraft returned to within CG limits. Equipment list / W&B records revised. Aircraft approved for return to service.

---

## Extreme forward / aft CG tables
Use **EW = 1,987.5 lb** and **EW moment = 69,334.94 lb-in** (or EW CG **34.89 in**).  
Load items per **AC 43.13-1B Para 10-17** and your instructor’s assigned pilot/pax/fuel/baggage weights (often **170 lb** per person).  
**FWD CG limit** / **AFT CG limit** from TCDS envelope at the resulting total weight (interpolate between **2250 lb** and **3100 lb** points).

If you send the assigned useful-load weights for those tables, I’ll fill every row with units.
