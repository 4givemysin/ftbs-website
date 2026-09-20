# Ch. 10 NDT / NDI — Full Notebook Notes

**Source:** FAA-H-8083-30A Chapter 10 (Nondestructive Inspection/Testing)  
**Class file:** `8083-30A Ch. 10 NDT.pptx`

Copy cheat rows into your notebook. Label each idea clearly.

---

## 1) What is NDT / NDI?

| Term | Meaning |
|------|---------|
| **NDT** | Nondestructive **Testing** |
| **NDI** | Nondestructive **Inspection** |
| **Goal** | Check if a part is airworthy **without damaging** it |

Manufacturer / FAA usually says **which method** to use (MM, AD, SB, SSID).

### Training note
Some methods (eddy, ultrasonic, x-ray) need a **qualified / certified** inspector.  
Follow school + company procedures.

---

## 2) Big method cheat table (memorize)

| Method | Code | Works on | Finds | Key limit |
|--------|------|----------|-------|-----------|
| **Visual** | VT | almost anything | surface condition | mainly **surface**; can miss tiny/hidden |
| **Liquid penetrant** | PT | nonporous (Al, Mg, steel, titanium, etc.) | **open-to-surface** cracks | must be **open to surface** |
| **Magnetic particle** | MT | **ferromagnetic** only (iron/steel) | surface + near-surface | not for Al/Mg; must **demagnetize** after |
| **Eddy current** | ET | **electrically conductive** metals | surface / near-surface; corrosion; conductivity | needs probe access + skill |
| **Ultrasonic** | UT | many materials | **internal** flaws + thickness | needs **couplant** + skill |
| **Radiographic (X-ray / gamma)** | RT | many materials | surface + **internal** / hidden | **radiation hazard**; expensive; skill |

### Quick “which method?” memory
| If the part is… | Often use… |
|-----------------|-------------|
| Just looking / first check | **Visual** (+ light, glass, borescope) |
| Non-magnetic, surface crack | **Penetrant** |
| Steel / iron, surface crack | **Magnetic particle** |
| Aluminum skin / holes / conductivity | **Eddy current** |
| Internal crack / thickness / composites | **Ultrasonic** |
| Hidden internal structure | **Radiography** |

---

## 3) Must-know words

| Word | Meaning |
|------|---------|
| **Discontinuity / defect / flaw** | interruption in the material |
| **Indication** | what the test **shows** (may or may not be a real defect) |
| **False indication** | looks like a defect but isn’t |
| **Reference standard** | known sample used to **calibrate / set up** the instrument |
| **Couplant** | liquid/gel that lets ultrasonic sound enter the part (oil, water, grease, glycerin) |
| **Ferromagnetic** | can be strongly magnetized (iron, steel, some alloys) |
| **Conductive** | electricity can flow (needed for eddy current) |
| **Nonporous** | no open pores (needed for good penetrant results) |

---

## 4) Before any NDT (general prep)

1. Know the **procedure** for that method  
2. **Clean** the area / part  
3. May need to **remove** paint, sealant, or the part itself  
4. Equipment **calibration / setup** current if required  
5. Use correct **reference standards**

---

## 5) Visual Inspection (VT) — pp. ~10-18

### Idea
Use your **eyes**, often with aids.

### Aids
- Bright light / flashlight  
- Magnifying glass (often **10×** to confirm a crack)  
- Mirror  
- **Borescope** (see inside without full teardown)

### Flashlight tip for cracks
Shine light at about a **5°–45°** angle to the surface.  
Don’t aim the reflection straight into your eyes.  
Trace crack length with light more square to the crack.

### Borescope uses (write examples)
- Turbine engines (access ports)  
- Cylinders, combustion areas  
- Hydraulic cylinders / valves  
- Hard-to-reach seals / FOD checks  

Two types: **rigid** and **flexible (fiber optic)**; many have lights + video.

### Visual — advantages / disadvantages
| + | − |
|---|---|
| Cheap, fast, portable | Surface / larger defects mainly |
| Little training | Easy to misread scratches |
| Immediate | May miss subsurface |

---

## 6) Liquid Penetrant (PT / Dye Penetrant)

### Idea
Colored or fluorescent liquid **seeps into** surface openings, then **developer** pulls it back out so you can see it.

### Works on
Aluminum, magnesium, brass, copper, cast iron, stainless, titanium, ceramics, plastics, glass — **nonporous**.

### Does **not** find
Internal defects that are **not open to the surface**.

### If part is magnetic…
Magnetic particle is often preferred when equipment is available.

### Types of dye
| Type | How you see it |
|------|----------------|
| **Visible** | bright **red** on white developer |
| **Fluorescent** | brilliant **yellow-green** under **black light** (background blue-violet) |

### Steps (write in order)
1. **Clean** thoroughly  
2. **Apply penetrant** (give dwell / soak time)  
3. **Remove** excess penetrant (cleaner / emulsifier) — don’t wash defect empty  
4. **Dry**  
5. **Apply developer**  
6. **Inspect / interpret**  
7. Post-clean as required  

### Interpretation tips
- Fine cracks need **longer** penetrant time  
- Bigger / deeper cracks → broader, brighter indication  
- Poor washing → broad smears (reprocess)  
- Press-fit lines can show normal “joint” indications  

### Penetrant — advantages / disadvantages
| + | − |
|---|---|
| Cheap, portable, sensitive | Surface-open only |
| Fairly quick | Needs cleanliness |
| Lower skill than UT/RT | Rough/porous surfaces interfere |

---

## 7) Magnetic Particle (MT)

### Idea
Magnetize a **ferromagnetic** part. Flaws disrupt the magnetic field → particles gather and show the flaw.

### Works on
**Ferromagnetic only** (steel / iron-type).  
**Not** for aluminum or magnesium.

### Finds
**Surface and near-surface** discontinuities.

### Important rules
- Often magnetize in **at least 2 directions** (about **90°** apart)  
- Wet fluorescent method is common / sensitive in aviation  
- **Demagnetize** the part when done  

### Magnetic — advantages / disadvantages
| + | − |
|---|---|
| Fast, sensitive, surface + near-surface | Ferro materials only |
| Relatively inexpensive | Must demagnetize |
| Moderate skill | Field direction matters; prep needed |

---

## 8) Eddy Current (ET)

### Idea
AC in a **coil/probe** makes a magnetic field → induces **eddy currents** in conductive metal.  
Cracks / corrosion / thickness / hardness changes alter the signal.

### Works on
**Electrically conductive** materials (e.g., aluminum aircraft structure).

### Used for
- Cracks (skin, fastener holes, wheels, shafts)  
- Subsurface corrosion  
- Thickness / conductivity / heat-treat condition checks  

### Key setup word
**Reference standard** = same material with **known flaws** (needed to calibrate).

### Eddy — advantages / disadvantages
| + | − |
|---|---|
| Portable, sensitive, often little coating removal | Conductive materials only |
| Immediate results | Skill / training required |
| Many uses (cracks, corrosion, sorting) | Large areas can take time |

---

## 9) Ultrasonic (UT)

### Idea
High-frequency **sound** travels into the part. Reflections show fronts, backs, and **internal flaws**.  
Display on scope / screen (**A / B / C scans**).

### Needs
- Access to surface (often one side is enough)  
- **Couplant** (sound won’t travel well through air)  
- **Reference standards** for calibration / sensitivity  

### Couplant examples
Water, glycerin, oil, grease.

### Main methods
| Method | Idea |
|--------|------|
| **Pulse-echo** | Send & receive on same side; time + amplitude show flaw depth/location |
| **Through-transmission** | Sender on one side, receiver on other; loss of signal = flaw |
| **Resonance** | Vary frequency; used a lot for **thickness** when backside hard to reach |
| **Angle beam** | Sound enters at an angle (good for welds / angled paths) |

### Contact vs immersion
| Type | Where used |
|------|------------|
| **Contact** | Field / hangar (couplant on surface) |
| **Immersion** | Part + probe in liquid tank |

### Ultrasonic — advantages / disadvantages
| + | − |
|---|---|
| Finds very small internal flaws | High skill needed |
| Portable; little prep | Beam orientation matters |
| Thickness measurement | Rough surfaces interfere |

---

## 10) Radiographic (RT) — X-ray / Gamma

### Idea
Radiation passes through the part → film or digital image shows internal differences (voids, cracks, inclusions, geometry).

| Source | Type |
|--------|------|
| **X-ray** | electronic generator |
| **Gamma** | isotope source (strict handling rules) |

### Big warnings
- **Radiation hazard** — follow federal/state + shop safety  
- Expensive / slower  
- Needs skilled exposure + interpretation  
- Flaw **orientation** matters  
- Can give a **permanent record**

### Radiography — advantages / disadvantages
| + | − |
|---|---|
| Internal + hidden areas | Safety hazard |
| Permanent record | Cost / time / skill |
| Minimal part prep | Directional sensitivity |

---

## 11) Master comparison cheat (one notebook page)

| Method | Surface? | Subsurface / internal? | Material limit |
|--------|----------|-------------------------|----------------|
| Visual | Yes | Limited / no | General |
| Penetrant | Yes (open) | No | Nonporous |
| Magnetic | Yes | Near-surface | **Ferro only** |
| Eddy | Yes | Near-surface | **Conductive** |
| Ultrasonic | Possible | **Yes (internal)** | Broad |
| X-ray | Yes | **Yes (internal)** | Broad + safety |

---

## 12) Oral / test memory lines

1. NDT finds problems **without destroying** the part.  
2. Penetrant = defect must be **open to the surface**.  
3. Magnetic = **ferromagnetic only** + **demagnetize after**.  
4. Eddy = **conductive** metal + **reference standard**.  
5. Ultrasonic = sound + **couplant** + good for **internal** / thickness.  
6. X-ray = internal image + **radiation hazard**.  
7. Visual is usually the **first** inspection and part of other NDT setups.  
8. An **indication** is not automatically a reject — interpret per procedure.

---

## 13) Tie to your class PPT
Match these notes to slides in:  
`8083-30A Ch. 10 NDT.pptx`

If a slide names a method, write:
- What it finds  
- Material limit  
- 1 advantage / 1 disadvantage  
- Special word (couplant, demagnetize, black light, reference standard, etc.)

---

_Last updated: 2026-08-10 — FAA-H-8083-30A Ch.10 NDT full notebook notes_
