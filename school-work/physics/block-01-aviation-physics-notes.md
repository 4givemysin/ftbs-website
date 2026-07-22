# Block 01 Aviation Physics — Notebook Notes

Copy the **cheat rows** and **definitions** into your notebook. Label each part of every formula when you work problems.

## Sources (where this came from)

| Source | What to use |
|--------|-------------|
| **FAA-H-8083-30B** *Aviation Maintenance Technician Handbook — General*, **Chapter 5: Physics for Aviation** | Main handbook pages below |
| **FAA ACS** Aviation Mechanic Certification Standards — **AM.I.J Physics for Aviation** | Test objectives (K1–K13, S1–S8) |
| Class file: **Block 01 Aviation Physics.pptx** | Match these notes to your instructor slides |

### FAA-H-8083-30B Chapter 5 — page map

| Topic | Handbook page |
|-------|----------------|
| Matter / density / specific gravity | **5-1** to **5-2** |
| Energy (PE / KE) | **5-2** to **5-3** |
| Force, work, friction | **5-4** to **5-5** |
| Power & torque | **5-6** |
| Simple machines / mechanical advantage | **5-7** |
| Levers | **5-8** to **5-9** |
| Pulley / gear / inclined plane | **5-9** to **5-11** |
| Stress & strain | **5-12** to **5-14** |
| Motion / speed / acceleration | **5-14** to **5-15** |
| Newton’s laws | **5-16** to **5-17** |
| Heat / heat transfer / temperature | **5-18** to **5-22** |
| Pressure (gauge / absolute / differential) | **5-22** to **5-23** |
| Gas laws (Boyle, Charles, general) | **5-23** to **5-25** |
| Pascal’s Law | **5-27** |
| Bernoulli’s Principle | **5-29** |
| Four forces / theory of flight / airfoils | **5-36** to **5-38** |

> Page numbers are **FAA-H-8083-30B** chapter pages (like `5-16`). If your printout is **8083-30A**, topics match but page numbers can be off by ~1.

### Study images

![Formula cheat sheet](images/block-01-physics-formula-cheatsheet.png)

![Bernoulli, four forces, levers](images/block-01-physics-bernoulli-forces-levers.png)

---

## Calculator entry (how to punch formulas)

Use a basic 4-function calculator (or phone calc in **portrait** / basic mode).  
Key legend: `×` multiply · `÷` divide · `+` add · `−` subtract · `=` equals · `(` `)` parentheses if your calc has them

**Rules**
1. Write the formula and **label** each number first.
2. Enter numbers in the **same order** as the formula.
3. For squares: `v × v` (example: velocity squared).
4. For ½: type `0.5 ×` or `1 ÷ 2 ×`.
5. Gas-law “find the missing one”: do the **multiply side**, then **divide** by the known leftover.

### Master cheat row — labels + calculator keys

| Formula | Labels | Calculator entry (example numbers) |
|---------|--------|-------------------------------------|
| Density = m ÷ V | **mass** ÷ **volume** | `20 ÷ 4 =` → **5** |
| F = m × a | **mass** × **acceleration** | `10 × 3 =` → **30** |
| Work = F × d | **force** × **distance** | `50 × 4 =` → **200** |
| Power = W ÷ t | **work** ÷ **time** | `200 ÷ 5 =` → **40** |
| HP = (F × d) ÷ (550 × t) | **force**, **distance**, **time** | `550 × 10 ÷ 550 ÷ 2 =` → **5** *(or)* `( 550 × 10 ) ÷ ( 550 × 2 ) =` |
| Torque = F × r | **force** × **radius/arm** | `40 × 2 =` → **80** |
| Pressure = F ÷ A | **force** ÷ **area** | `100 ÷ 4 =` → **25** |
| MA = R ÷ E | **resistance** ÷ **effort** | `200 ÷ 50 =` → **4** |
| PE = W × h | **weight** × **height** | `100 × 6 =` → **600** |
| KE = ½ m v² | **mass**, **velocity** | `0.5 × 4 × 5 × 5 =` → **50** |
| °F = (°C × 1.8) + 32 | **Celsius** | `15 × 1.8 + 32 =` → **59** |
| °C = (°F − 32) ÷ 1.8 | **Fahrenheit** | `59 − 32 ÷ 1.8 =` ⚠️ better: `( 59 − 32 ) ÷ 1.8 =` → **15** |
| Boyle find P₂: P₂ = (P₁ × V₁) ÷ V₂ | **P1**, **V1**, **V2** | `30 × 4 ÷ 6 =` → **20** |
| Boyle find V₂: V₂ = (P₁ × V₁) ÷ P₂ | **P1**, **V1**, **P2** | `30 × 4 ÷ 20 =` → **6** |
| Charles find V₂: V₂ = (V₁ × T₂) ÷ T₁ | **V1**, **T2**, **T1** | `10 × 600 ÷ 300 =` → **20** |
| Charles find T₂: T₂ = (V₂ × T₁) ÷ V₁ | **V2**, **T1**, **V1** | `20 × 300 ÷ 10 =` → **600** |
| Combined find P₂ | **P1 V1 T2 / V2 T1** | `20 × 4 × 600 ÷ 5 ÷ 300 =` → **32** |
| Absolute pressure | **gauge** + **14.7** | `30 + 14.7 =` → **44.7** |
| Gear ratio | **teeth driven** ÷ **teeth drive** | `60 ÷ 20 =` → **3** |

**HP without parentheses (safe order):**  
`force × distance ÷ 550 ÷ time =`  
Example: force 550, distance 10, time 2 → `550 × 10 ÷ 550 ÷ 2 =` → **5 HP**

**°C without messing up order:**  
Always do subtract first: `( F − 32 ) ÷ 1.8`  
Or: `F − 32 =` → then `÷ 1.8 =`

**Half / square tip for KE:**  
`0.5 × mass × velocity × velocity =`

---

## 1) Matter & Density
**Ref: FAA-H-8083-30B pp. 5-1 to 5-2**

| Word | Meaning |
|------|---------|
| **Matter** | Anything that has mass and takes up space |
| **Mass** | Amount of matter (does not change with location) |
| **Weight** | Force of gravity on a mass (can change with location) |
| **Density** | Mass per unit volume |
| **Specific gravity** | Density of a substance compared to water (water = 1) |

**Formulas**
- Density = mass ÷ volume
- Specific gravity = density of substance ÷ density of water

**Cheat row**

| Idea | Formula | Labels | Calculator |
|------|---------|--------|------------|
| Density | D = m / V | **mass** / **volume** | `mass ÷ volume =` |
| Specific gravity | SG = D_substance / D_water | compare to water | `D_substance ÷ D_water =` |

---

## 2) Energy
**Ref: FAA-H-8083-30B pp. 5-2 to 5-3**

| Type | Meaning | Example |
|------|---------|---------|
| **Potential (PE)** | Stored energy (position / condition) | Aircraft on jack stands; compressed spring |
| **Kinetic (KE)** | Energy of motion | Moving aircraft / spinning prop |

Energy can change form, but total energy is conserved (minus losses to heat/friction).

**Formulas (common forms)**
- PE = weight × height  (or mgh)
- KE = ½ × mass × velocity²

**Cheat row**

| Energy | Formula | Labels | Calculator |
|--------|---------|--------|------------|
| Potential | PE = W × h | **weight** × **height** | `weight × height =` |
| Kinetic | KE = ½ m v² | **mass**, **velocity** | `0.5 × mass × v × v =` |

---

## 3) Force, Work, Power, Torque
**Ref: FAA-H-8083-30B pp. 5-4 to 5-6**

| Word | Meaning |
|------|---------|
| **Force** | A push or pull |
| **Work** | Force applied through a distance (same direction) |
| **Power** | How fast work is done (work ÷ time) |
| **Torque** | Twisting / rotational force |

**Formulas**
- Force: F = m × a  (Newton’s 2nd)
- Work: W = F × d
- Power: P = W ÷ t
- Horsepower (common AMT form): HP = (F × d) ÷ (550 × t)  
  (1 HP = 550 ft·lb/sec)
- Torque: Torque = Force × lever arm (radius)

**Cheat row**

| Idea | Formula | Labels | Calculator |
|------|---------|--------|------------|
| Force | F = m a | **mass** × **acceleration** | `mass × accel =` |
| Work | W = F d | **force** × **distance** | `force × distance =` |
| Power | P = W / t | **work** ÷ **time** | `work ÷ time =` |
| Horsepower | HP = (F × d) / (550 × t) | force, distance, time | `F × d ÷ 550 ÷ t =` |
| Torque | T = F × r | **force** × **radius/arm** | `force × radius =` |

---

## 4) Newton’s Laws (write these word-for-word)
**Ref: FAA-H-8083-30B pp. 5-16 to 5-17**

1. **1st (Inertia):** An object at rest stays at rest; an object in motion stays in motion in a straight line — unless an outside force acts.
2. **2nd (F = ma):** Force = mass × acceleration. More force → more accel; more mass → less accel for same force.
3. **3rd (Action/Reaction):** For every action there is an equal and opposite reaction.  
   Aircraft example: prop pushes air backward → air pushes aircraft forward (thrust).

**Motion labels**
- **Speed:** how fast
- **Velocity:** speed + direction
- **Acceleration:** change in velocity over time → a = (V₂ − V₁) / t

---

## 5) Simple Machines & Mechanical Advantage
**Ref: FAA-H-8083-30B pp. 5-7 to 5-11** (levers **5-8** to **5-9**)

Machines multiply force or change direction. They do **not** create energy.

**Mechanical advantage (MA)**
- MA = resistance force ÷ effort force  
  (or) MA = effort distance ÷ resistance distance

### Levers (label **effort**, **fulcrum**, **resistance**)

| Class | Order (left→right or arrangement) | Memory tip |
|-------|------------------------------------|------------|
| **1st** | Effort — Fulcrum — Resistance | Seesaw / crowbar; fulcrum in middle |
| **2nd** | Effort — Resistance — Fulcrum | Wheelbarrow; resistance in middle |
| **3rd** | Fulcrum — Effort — Resistance | Tweezers / landing gear retract; effort in middle |

Lever formula idea: Effort × effort arm = Resistance × resistance arm

### Gears (label **drive** / **driven**)

| Idea | Formula |
|------|---------|
| Gear ratio | teeth_driven ÷ teeth_drive |
| Speed vs torque | Bigger driven gear → slower speed, more torque |

Drive and driven gears turn **opposite** directions (external mesh).

### Pulley / inclined plane
- Fixed pulley: mainly changes direction (MA ≈ 1)
- Movable / block & tackle: MA ≈ number of supporting ropes
- Inclined plane MA ≈ length of slope ÷ height

**Cheat row**

| Machine | Formula / idea | Labels | Calculator |
|---------|----------------|--------|------------|
| MA | resistance ÷ effort | **resistance force**, **effort force** | `R ÷ E =` |
| Lever | E × EA = R × RA | **effort**, **effort arm**, **resistance**, **resistance arm** | to find E: `R × RA ÷ EA =` |
| Gears | GR = teeth_driven / teeth_drive | **drive**, **driven** | `teeth_driven ÷ teeth_drive =` |

---

## 6) Stress & Strain
**Ref: FAA-H-8083-30B pp. 5-12 to 5-14**

| Word | Meaning |
|------|---------|
| **Stress** | Internal force in a material from external load |
| **Strain** | How much the material deforms (changes shape/size) |

**5 stresses to memorize**

| Stress | What it does |
|--------|----------------|
| **Tension** | Pulls apart |
| **Compression** | Squeezes together |
| **Torsion** | Twists |
| **Shear** | Slides layers past each other |
| **Bending** | Combination (tension one side, compression other) |

---

## 7) Heat & Temperature
**Ref: FAA-H-8083-30B pp. 5-18 to 5-22**

| Word | Meaning |
|------|---------|
| **Heat** | Energy transfer because of temperature difference |
| **Temperature** | Measure of molecular motion / hotness |

**Heat moves 3 ways**
1. **Conduction** — through contact (metal)
2. **Convection** — by fluid movement (air/oil)
3. **Radiation** — through space/waves (sun, exhaust glow)

**Temp conversions (write both)**
- °F = (°C × 1.8) + 32
- °C = (°F − 32) ÷ 1.8
- Absolute: Kelvin / Rankine used with gas laws (no negative absolute temps)

**Cheat row**

| Convert | Formula | Calculator |
|---------|---------|------------|
| C → F | F = (C × 1.8) + 32 | `C × 1.8 + 32 =` |
| F → C | C = (F − 32) / 1.8 | `( F − 32 ) ÷ 1.8 =` |

---

## 8) Pressure
**Ref: FAA-H-8083-30B pp. 5-22 to 5-23**

**Pressure = Force ÷ Area**

| Type | Meaning |
|------|---------|
| **Absolute (psia)** | Pressure above a perfect vacuum |
| **Gauge (psig)** | Pressure above local atmosphere |
| **Differential** | Difference between two pressures |

Absolute ≈ Gauge + Atmospheric (≈ 14.7 psi at sea level)

**Cheat row**

| Idea | Formula | Labels | Calculator |
|------|---------|--------|------------|
| Pressure | P = F / A | **force** ÷ **area** | `F ÷ A =` |
| Absolute | P_abs ≈ P_gauge + 14.7 | gauge + atmosphere | `gauge + 14.7 =` |

---

## 9) Gas Laws
**Ref: FAA-H-8083-30B pp. 5-23 to 5-25** (Boyle **5-24**, Charles **5-25**)

| Law | Rule (words) | Formula |
|-----|--------------|---------|
| **Boyle’s** | Temp constant: pressure ↑ volume ↓ | P₁V₁ = P₂V₂ |
| **Charles’** | Pressure constant: volume ↑ with absolute temp | V₁/T₁ = V₂/T₂ |
| **General / Combined** | P, V, T all related | (P₁V₁)/T₁ = (P₂V₂)/T₂ |

Always use **absolute temperature** with gas laws.

**Cheat row**

| Law | Holds constant | Formula | Calculator (solve for missing) |
|-----|----------------|---------|--------------------------------|
| Boyle | Temperature | P₁V₁ = P₂V₂ | P₂: `P1 × V1 ÷ V2 =` · V₂: `P1 × V1 ÷ P2 =` |
| Charles | Pressure | V₁/T₁ = V₂/T₂ | V₂: `V1 × T2 ÷ T1 =` · T₂: `V2 × T1 ÷ V1 =` |
| Combined | — | P₁V₁/T₁ = P₂V₂/T₂ | P₂: `P1 × V1 × T2 ÷ V2 ÷ T1 =` |

---

## 10) Fluids — Pascal & Bernoulli
**Ref: Pascal 5-27 · Bernoulli 5-29** (FAA-H-8083-30B)

**Pascal’s Law:** Pressure applied to a confined fluid is transmitted equally in all directions.  
Hydraulics: small force on small piston → large force on large piston (same pressure).

- P = F / A  (same P on both pistons)
- F₂ = P × A₂

**Bernoulli’s Principle:** In a flowing fluid, when **velocity increases**, **pressure decreases** (and vice versa).  
Venturi / wing: faster air over curved upper surface → lower pressure → **lift**.

**Cheat row**

| Principle | Memory line |
|-----------|-------------|
| Pascal | Confined fluid → pressure equal everywhere |
| Bernoulli | Speed up → pressure down |

---

## 11) Atmosphere & Performance (quick)
**Ref: FAA-H-8083-30B Ch. 5 (atmosphere / performance discussion near theory of flight)** + ACS AM.I.J.S2–S3

Standard day (sea level typical values to know):
- Pressure ≈ **29.92 inHg** / **14.7 psi**
- Temp ≈ **59 °F** / **15 °C**

| Term | Meaning |
|------|---------|
| **Pressure altitude** | Altitude from standard pressure setting |
| **Density altitude** | Pressure altitude corrected for nonstandard temperature |

Hot + high + humid → higher density altitude → **worse** performance (engine, prop, wing).

---

## 12) Theory of Flight (must-know)
**Ref: FAA-H-8083-30B pp. 5-36 to 5-38**

**Four forces**
- **Lift** up
- **Weight** down
- **Thrust** forward
- **Drag** backward

Straight-and-level unaccelerated: Lift = Weight, Thrust = Drag

**Airfoil labels**
- **Chord line** — leading edge to trailing edge straight line
- **Camber** — curve of the airfoil
- **Relative wind** — airflow opposite flight path
- **Angle of attack (AOA)** — angle between chord line and relative wind

Lift comes from:
1. Bernoulli (pressure difference), and
2. Newton’s 3rd (air deflected down → equal/opposite upward force)

**Primary flight controls:** aileron, elevator, rudder  
**Secondary:** flaps, trim, etc.

---

## Master Formula Cheat Sheet (one notebook page)

| # | Formula | Labels | Calculator keys |
|---|---------|--------|-----------------|
| 1 | Density = m / V | mass ÷ volume | `m ÷ V =` |
| 2 | F = m a | mass × accel | `m × a =` |
| 3 | Work = F × d | force × distance | `F × d =` |
| 4 | Power = Work / t | work ÷ time | `W ÷ t =` |
| 5 | HP = (F × d) / (550 × t) | force, distance, time | `F × d ÷ 550 ÷ t =` |
| 6 | Torque = F × r | force × radius | `F × r =` |
| 7 | P = F / A | force ÷ area | `F ÷ A =` |
| 8 | MA = resistance / effort | resistance ÷ effort | `R ÷ E =` |
| 9 | Boyle → P₂ | (P₁×V₁)÷V₂ | `P1 × V1 ÷ V2 =` |
| 10 | Charles → V₂ | (V₁×T₂)÷T₁ | `V1 × T2 ÷ T1 =` |
| 11 | Combined → P₂ | P₁V₁T₂ / V₂T₁ | `P1 × V1 × T2 ÷ V2 ÷ T1 =` |
| 12 | °F from °C | (C×1.8)+32 | `C × 1.8 + 32 =` |
| 13 | °C from °F | (F−32)÷1.8 | `( F − 32 ) ÷ 1.8 =` |

---

## Stress / Law memory list (write once)

1. Tension – pull  
2. Compression – squeeze  
3. Torsion – twist  
4. Shear – slide  
5. Bending – mix  
6. Newton 1 – inertia  
7. Newton 2 – F=ma  
8. Newton 3 – action/reaction  
9. Pascal – pressure equal in confined fluid  
10. Bernoulli – faster flow, lower pressure  

---

## Extra notebook must-writes (don’t skip)

These show up a lot on Block 01 / ACS **AM.I.J** and fill gaps beyond the main formulas.

### Absolute temperature (needed for gas laws)
| Scale | How to get it | Calculator |
|-------|---------------|------------|
| **Kelvin (K)** | K = °C + 273 | `C + 273 =` |
| **Rankine (°R)** | °R = °F + 460 | `F + 460 =` |

Never use plain °F/°C alone in Boyle/Charles/combined — convert to absolute first.

### Standard atmosphere (memorize)
| Item | Value |
|------|-------|
| Sea-level temp | **15 °C** / **59 °F** |
| Sea-level pressure | **29.92 inHg** / **14.7 psi** / **1013.2 mb** |
| Rule of thumb | ~½ atmosphere pressure by **~18,000 ft** |

### Density / pressure altitude (words)
| Term | Meaning |
|------|---------|
| **Pressure altitude** | What altimeter shows when set to **29.92** |
| **Density altitude** | Pressure altitude corrected for nonstandard **temperature** (and humidity effect) |
| Hot / high / humid | Density altitude **up** → performance **down** |

### Hydraulics (Pascal) — two pistons
Same pressure on both sides: P = F ÷ A

| Find | Labels | Calculator |
|------|--------|------------|
| Pressure | force ÷ area | `F ÷ A =` |
| Big force F₂ | P × A₂ | `P × A2 =` |
| Or in one go | F₂ = F₁ × (A₂ ÷ A₁) | `F1 × A2 ÷ A1 =` |

### Venturi tube (Bernoulli skill)
As fluid goes through the **narrow** part:
- **Velocity ↑**
- **Pressure ↓**

### Efficiency
Efficiency (%) = (output ÷ input) × 100  
No machine is 100% (friction / heat losses).  
Calculator: `output ÷ input × 100 =`

### Friction types
| Type | When |
|------|------|
| **Static** | Not moving yet (hardest to start) |
| **Sliding / kinetic** | Already sliding |
| **Rolling** | Wheels/rollers (usually least) |

### Flight controls (ACS wants these)
| Kind | Controls |
|------|----------|
| **Primary** | Aileron, Elevator, Rudder |
| **Secondary** | Flaps, Trim tabs (spoilers / leading-edge devices as taught) |

### Extra aero devices (write names)
- **Vortex generators** — energize boundary layer / delay stall  
- **Wing fences** — stop spanwise flow  
- **Stall strips** — make root stall first (more predictable)

### Aircraft axes
| Axis | Runs | Motion name |
|------|------|-------------|
| **Longitudinal** | nose ↔ tail | **Roll** (ailerons) |
| **Lateral** | wingtip ↔ wingtip | **Pitch** (elevator) |
| **Vertical** | up ↔ down | **Yaw** (rudder) |

### Units cheat (label units on every problem)
| Idea | Common units |
|------|----------------|
| Force / weight | lb |
| Distance | ft / in |
| Work | ft·lb |
| Power | ft·lb/sec or HP |
| Pressure | psi |
| Area | in² |
| Time | sec |

### Matter reminder (K12)
If **temp ↑** (same pressure) → volume ↑ → density ↓  
Hot air = less dense → worse engine/wing/prop performance

_Last updated: 2026-07-22 — added extra notebook must-writes (absolute temp, std atm, hydraulics, controls, axes)_
