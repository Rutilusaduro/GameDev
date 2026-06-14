# Professor Sim — Depth Plan

> **Status:** Committed design strategy. No code changes in this document — each phase below is independently shippable.
>
> **Companions:** `DESIGN_BIBLE.md` (tone & stage coverage) · `src/textEngine/AUTHORING.md` (prose contract) · `docs/modular-text-system.md` (engine reference)

---

## Executive Summary

Professor Sim is a sensual weight-gain college sim (React + Vite) whose pleasure is the transformation of its students — their bodies and identities — framed as desirable and never apologized for. The codebase is already a dense, multi-system game:

| Layer | Key files | What it does |
|---|---|---|
| Modular text engine | `src/textEngine/` | Pool-based, stage-aware, 17+ selector dimensions; strict authoring contract (`AUTHORING.md`) |
| Gain core | `gainSystem.js`, `stages.js` | cals → fullness → weekly digestion → lbs; 12 weight stages; capacity growth; force-feed odds |
| Psych axes | `corruption.js`, `hungerAddiction.js` | 3 corruption tiers; 5 addiction × 5 hunger tiers, withdrawal, door-knock interrupts |
| Talia (inventor) | `talia.js`, `devices.js`, `inventionUpgrades.js`, `labParts.js`, `labTechTree.js`, `researchTree.js`, `forceFeederEvent.js` + modals | Lab session → breakthroughs → tech/research → build → install → use device → invention points → circuit-board nodes |
| Pharmacist (Sophia) | `pharmacist.js`, `pharmacistCult.js`, `pharmacistCampus.js`, `pharmacistIngredients.js`, `faculty.js` | Compounds via food, campus-wide passive fattening, cult loyalty |
| Evolved Forms | `evolvedForms.js` (~5.8k lines) | Per-student mid-game identity arcs with side skill trees and mini-games |

**The problem:** systems are individually rich but the seams are thin. Three parallel device currencies don't talk to each other; only 1 of 9 devices has a circuit board; devices, corruption, hunger/addiction, relationships, and evolved forms each progress in their own silo; the weekly loop rewards repetition more than mastery; and there is no real endgame structure.

**The goal:** depth through integration and finishing, not new breadth — increasing meaningful decisions, long-term loops, and a sense of mastery while preserving the warm, sensual, appreciative tone from `DESIGN_BIBLE.md`.

**The single highest-leverage move:** make the Circuit Board the universal progression language of the device layer, then wire that layer into the psych axes (corruption + hunger/addiction) and the evolved-form arcs so growth, devices, and relationships feed one loop instead of three.

Concretely:

1. Finish the Circuit Board pattern across all devices (only `feeding_mask` has one today).
2. Collapse the three device currencies (breakthroughs / invention points / experiment risk) into a clear, legible economy.
3. Make the weekly loop a scheduling/triage puzzle via the hunger interrupt system.
4. Cross-wire the axes so every system pushes or pulls at least two others.
5. Add an endgame spine: campus saturation meta-track + per-student arrival capstones.
6. Heal the worst silos: unify "Take to Dinner" onto shared systems (§8) and modularize the largest hardcoded prose grids (§9).

---

## 1. Core Progression Systems

### Today

Weight (cals → lbs weekly), corruption (0–100, 3 tiers), addiction/hunger (5×5 + withdrawal), and relationship (0–100, 5 tiers) each move largely independently. Weight is the only axis with strong second-order consequences; the others mostly gate text and a few multipliers.

### Target: "Transformation Pressure"

Make the axes interlock into one readable model the player steers deliberately.

#### Corruption as the permission axis

Gate device intensity and deranged feeding behind corruption tier, not just dialogue:

| Tier | Mechanical unlock |
|---|---|
| 0 | Only gentle / worn devices accepted |
| 1 | Stationary rigs & force-feeding |
| 2 | Growth chamber/serum, public demos, self-experiment |

This gives corruption a mechanical payoff and a reason to invest in it.

#### Addiction as the dependency axis

Already player-specific in `hungerAddiction.js`. Reinforce the existing rule that hunger tiers 3–4 (Craving / Starving) require addiction ≥ 2. Add: addiction lowers refusal (cheaper force-feeds) but raises interrupt frequency — genuine risk/reward, not pure upside.

#### Relationship as the access + warmth axis

- Add relationship decay when a student is ignored for N weeks (currently absent).
- Add jealousy / favoritism state when one student is fed far more than peers.
- Converts the roster from parallel tracks into a managed ecology.

#### Unified "Surrender" readout

Expose a small per-student composite (weight stage + corruption + addiction + dominant evolved identity) so the player can read where each girl is and aim. Mastery comes from steering that vector, not from a single bar.

#### Reuse (wiring, not new math)

`getCorruptionTier()`, `getAddictionLevel()`, `getHungerTier()`, `getTier(rel)`, `getHungerModifiers()` already exist.

---

## 2. Inventions / Devices — Talia's Circuit Board System

This is the centerpiece and the biggest opportunity. The architecture is excellent; it's under-populated and over-fragmented.

### 2a. Finish the Circuit Board pattern for all 9 devices

Currently only `feeding_mask` has a board (`CIRCUIT_BOARDS` in `inventionUpgrades.js`); the other eight are placeholder-ready. Author a board per device using the existing `{ mainPath, branches }` shape. Each board should express the device's fantasy:

| Device | Board fantasy |
|---|---|
| **Auto-Feed Arm** | Automation: passive lbs/week scaling, multi-target, "set and forget" vs "supervised burst" |
| **Living Furniture Rig** | Comfort/permanence: furniture-comfort economy, stage-bump pacing, immobility milestones |
| **Growth Chamber / Serum** | Burst-power: magnitude vs instability/malfunction trade, permanent-conversion nodes |
| **Endless Hunger Engine** | Friction: hunger-rise rate, distress states, campus-deploy discovery-risk reduction (hooks `hungerAddiction` modifiers) |
| **Obedience / Weight Belts** | Submission: shame / obsession / dependence dials |
| **Reinforced Legs** | Mobility/support: weight-bearing, waddle mitigation, furniture dependency |
| *(remaining devices)* | Same pattern — one board, distinct branch identity |

### 2b. Distinct usage micro-interactions

The force feeder's rhythm/choke mini-game (`forceFeederEvent.js`) is proof that using well > using often. Don't clone it — assign devices to 2–3 interaction archetypes:

| Archetype | Example devices | Player skill |
|---|---|---|
| **Rhythm / pressure** | Force feeder | Timing under a failure meter |
| **Resource / route** | Auto-feeder, campus tools | Allocate budget across zones/targets under discovery risk |
| **Tuning / stability** | Chamber, serum | Push magnitude vs instability, manage malfunction rolls |

Performance tiers (perfect / good / messy / failure) → invention points (the existing `recordForceFeederUse()` model). This is the core moment-to-moment depth.

### 2c. Collapse the three currencies

**Today:** breakthroughs (lab → tech tree), invention points (use → circuit board), experiment cost (AP + instability → research). The tech tree and research tree both unlock blueprints — redundant.

**Recommend:**

| Currency | Role |
|---|---|
| **Research (breakthroughs)** | ONE tree that unlocks blueprints. Fold `labTechTree.js` and `researchTree.js` into a single gated tree (keep relationship/risk gating from research, prereq chains from tech). |
| **Invention points (per device)** | Stay device-local; earned only by usage. The "skill tree you level by playing." |
| **Instability / maintenance** | Friction/risk meter that makes the lab a system to manage, not a vending machine. Maintenance debt and instability should occasionally force a "downtime" week — pacing pressure. |

### 2d. Finish the half-built pieces

| Issue | Location | Action |
|---|---|---|
| 🔴 **`forceFeederState` never declared** | `ProfessorSim.jsx` — `setForceFeederState(...)` (~line 2724) and `{forceFeederState && <ForceFeederModal/>}` (~line 6045) reference a hook that doesn't exist | One-line fix: `const [forceFeederState, setForceFeederState] = useState(null)`. **Do this first** — the flagship usage→circuit-points loop is dead on Primary. |
| **`networkState.js` missing** | Imported by `talia.js` but file absent | Define or remove; Talia stage-2+ "network" feature is stubbed. |
| **`deviceDependence` / `campusModes` underused** | `deviceDependence.js`, `devices.js` | Wire dependence into refusal/withdrawal; add UI to pick campus modes. |
| **`permanentConvert` no handler** | `deviceEffects.js` / `devices.js` | Implement or cut. |

### 2e. Integration hooks (the payoff)

- Devices drive addiction (endless hunger already does) and corruption (`psychDelta`), which gate higher-tier device acceptance — a closed growth loop.
- Evolved forms grant exclusive circuit branches (e.g., the eating-competitor unlocks a "metabolic override" node) so the device tree and identity arcs reinforce each other.

---

## 3. Player Agency & Decision-Making

The biggest agency gaps are opportunity cost and irreversibility.

### Scarce AP + competing demands

With interrupts, maintenance, cult supply, and per-student needs all wanting AP, the player must triage weekly. This is where mastery lives. Tune AP so you can't do everything.

### Build/spec choices that lock

Circuit boards should have mutually exclusive branch tips (you can't max every branch on one device) so a force feeder built for "gentle override" plays differently from one built for "high pressure." Respec should cost (instability or breakthroughs), not be free.

### Per-student strategy

Decay + jealousy mean choosing whom to push and whom to coast creates emergent narratives.

### Risk dials the player sets

Instability, discovery risk, and malfunction odds should be visible levers the player can push for bigger payoffs — informed gambles, not hidden RNG.

---

## 4. Event & Activity Design

Convert narrative-only beats into small decision spaces; the engine already supports rich text under any state.

### Hunger Interrupts as the flagship loop

`HungerInterruptModal.jsx`, `hungerInterrupt.js` exist. Each knock = a 4-option decision (Feed / Compound / Talk / Deny) with real stat consequences (`HUNGER_CONFIG.denyRelLoss`, etc.). Make outcomes branch on corruption/addiction/relationship so the same interrupt plays differently per girl. **Single best ROI for "mechanical, not just narrative."**

### Feeding sessions gain mid-scene choices

Pace, encourage, push past capacity — small tactical layer over the existing dinner/private-session flow (`sessions.js`).

### Campus events read/write persistent state

Scrutiny, who-was-seen, campus-saturation tier — not one-shot flavor. Wire `adminScrutiny` to actual consequences (it currently tracks to 100 and does nothing beyond UI).

### Mini-game reuse

Standardize contest/sumo/stream mini-games on the same performance-tier → reward contract as device usage, so player skills transfer and the UI language is consistent.

---

## 5. Long-Term Loops & Endgame

Currently open-ended with no spine. Add direction without a hard ending (matches the bible's "arrival, not rescue").

### Campus Saturation meta-track

Extend `pharmacistCampus.js`'s `getCampusFatteningTier`. A campus-wide gauge raised by cult supply, devices deployed on campus, and aggregate student weight. Tiers visibly change the world: heavier new students, softer ambient events, new venues.

### Per-student "Arrival" capstones

Each evolved form gets a final, authored capstone state (the bible's "inevitable" endpoint) that flips on a unique repeatable activity and a permanent board branch — completion that keeps giving.

### Talia's lab tiers (1→3)

Stage 3 unlocks the network/automation endgame where devices run semi-autonomously across the roster — the "factory" phase of mastery.

### Prestige-lite / New Semester (optional, lower priority)

Carry over a small amount (one maxed board branch, lab tier) into a fresh class for replay variety.

---

## 6. Balance & Pacing

- **Diminishing returns on raw feeding; increasing returns on systems.** Pure pizza-party spam should plateau; devices, compounds, and corruption-gated feeding break past mid-stages.
- **Instability/maintenance as a metronome.** Periodic forced downtime weeks prevent monotone optimization (push → recover → push).
- **Addiction as the pacing brake.** Interrupt frequency scales with how hard you push — self-balancing throttle that also generates content.
- **Stage-coverage discipline.** Per `DESIGN_BIBLE.md` / `AUTHORING.md`, any new mechanic touching bodies needs text for all 12 stages and must pass `npm run text:lint`.
- **Numbers pass:** audit `GAIN_CONFIG`, board node costs, and currency yields so a full board feels like ~a mid-game arc, not a grind or a giveaway.

---

## 7. System Integration

**Thesis:** every system should push or pull at least two others.

| Source → | Weight | Corruption | Addiction/Hunger | Relationship | Devices | Evolved Form |
|---|---|---|---|---|---|---|
| **Weight stage-up** | — | +corruption | unlocks device tiers | new events | enables rigs | triggers arc |
| **Corruption** | gates extreme gain | — | raises craving ceiling | unlocks psyche | gates device intensity | gates capstone |
| **Addiction/Hunger** | withdrawal slows gain | drift ↑ | — | decay/penalty | endless-hunger synergy | feeds chemist arc |
| **Devices (use)** | direct lbs | psychDelta | drives addiction | intimacy branches | invention points | exclusive branches |
| **Evolved form** | identity gain | tier reactions | chemist=addiction | unique scenes | exclusive nodes | — |

The text engine is the connective tissue — it already exposes `hungerTier`, `addictionLevel`, `inWithdrawal`, `lastCompound`, `campusFattening`, `corruption`, `stage`, etc. as selectors. New mechanics should add derived selectors, not bespoke text, so content composes automatically.

---

## 8. "Take to Dinner" — Unify onto Shared Systems

Dinner (`sessions.js` + dinner handlers in `ProfessorSim.jsx`) is today a near-complete parallel feeding implementation that shares almost nothing with the core loop. The integration target: dinner becomes one venue-flavored skin over the shared feeding/psych/text systems.

### Five concrete seams

#### 1. Fullness — collapse to one model

Dinner keeps local `dinnerEvent.fullness` and `maxFullness = 60 + getStage(s.lbs).id * 14`, and separately inflates `student.fullness` by ~50% of dish fullness — a confusing double-write.

**Fix:** drop the local fields; read/write `student.fullness` against `student.stomachCapacity` (the real, growing capacity from `GAIN_CONFIG`). One belly, one curve, persists across the week.

#### 2. Gain pathway — route through `feedStudentCalories()`

Dinner writes `consumedCalories` directly. Funnel every dish through `feedStudentCalories(s, cals, fullnessCost, rel, label)` so digestion, capacity growth, stuffed-streak, and skill effects all apply uniformly.

#### 3. Refusal & force-feed — use `forceFeedChance()`

Dinner currently never refuses (only narrative `offenseLevel` ends it). Wire `forceFeedChance(s, food, spirit)` + `REFUSAL_LINES` / `FORCE_SUCCESS_LINES` so pushing a stuffed girl through another course is a real roll — modified by corruption (resistance) and addiction (compliance).

#### 4. Corruption & hunger matter

Dinner reads neither today. Make them inputs and outputs:

- Craving/Starving (hunger ≥ 3) → orders more aggressively; dinner can resolve a pending hunger interrupt (legitimate "Feed" response).
- Corruption tier shifts dialogue and lowers refusal.
- Successful over-stuffing grants `perForceFeed` / `perStuffedWeek` corruption like other feeds.

#### 5. Bring-your-own items

Venue dishes are inline objects, disconnected from `items.js`. Unify the dish data model with `ITEMS[]` (cal/full/rarity); let the player spend inventory mid-dinner ("share something you brought" — pattern already exists in private sessions' `PRIVATE_FOODS` / `feedInSession`); let venues expose a curated subset of the shared item pool.

### Scope note

Group dinner (`groupDinnerEvent`) and private sessions (`privateSession`) share dinner's parallel-fullness pattern — unify all three in the same pass. Do mechanics unify **before** text conversion (§9).

---

## 9. Text Modularization — Type-by-Type Allocation

The engine is excellent and already powers ~34 scene files / ~120 pools (`weighIn`, `growthEvent`, `diary`, `talkEncourage`/`Codas`, `hungerLexicon`/`Interrupt`, `device`/`talia`, `hiveIntake`, etc.) — but a large mass of prose still lives as hardcoded grids/dicts outside it.

**Governing rule** (from `AUTHORING.md`): convert highest-duplication / worst stage-coverage text first into skeleton + fragment pools, one grammar shape per pool, a tone-neutral wildcard always present; preserve per-character voice via `studentId` personas (weight 4) layered over archetype fragments (weight 2); every conversion must pass `npm run text:lint`.

### 9a. Allocation by content type

| Content type | File(s) | ~Vol | Modular? | Shape today → target |
|---|---|---|---|---|
| Body portrait | `content.js`, `evolvedForms.js` | ~1.5–2k lines | No | `BODY_DESCS[type][stage]` 110-cell grid → `body.*` skeleton (face/torso/lower/movement/clothing) reusing `word.body` + `word.clothingFit`; add mood/fullness/relSize |
| Dinner / feeding narration | `sessions.js` | ~1k lines | No | 4×4 `DINNER_ENDING_TEXT` grid + waiter/jealousy/conversation dicts → `dinner.*` skeleton + `dinner.jealousy` pool |
| Intimacy | `intimacy.js` | ~950 lines | No | 11 archetype dicts + 18 per-student dicts → `intimacy.*` skeleton; studentId personas over archetype fallback |
| Evolved-form diaries/arcs | `evolvedForms.js`, `competitiveGainerText.js` | ~3k+ lines | Partial (3 forms in `diary.js`) | Per-(form×student×tier) grids → migrate all forms into `diary.js` skeleton with stage/corruption/season/mood selectors |
| Hunger/corruption inner-voice | `corruption.js`, `hungerLexicon.js` | ~200 lines | Partial | `CORRUPTION_FEED_LINES[tier][0-3]` (12 lines) → `hunger.voice` / `hunger.physical` + `corruption.voice` pools |
| Talk codas/topics | `talkCodas.js`, `talkSystem.js` | ~50 lines | Partial | 2 lines/register → expand to 5–8 with mood/stage/relationship + personas |
| Cultivator recipes | `cultivator.js` | ~380 lines | No | Inline prose → `cultivator.*` pools keyed recipe/junction/suspicionTier |
| Device/Talia catalog flavor | `devices.js` (+ existing `deviceUse/` / `talia/` scenes ✓) | ~600 lines | Partial | Hardcoded descs → `device.*` sensation/psych pools keyed deviceId/zone/sensation |
| Lilith hunt | `lilith.js` | ~380 lines | No | `HUNT_NODES` / `HUNT_MEN` descs → `hunt.*` pools |
| Class/campus events | `classEvents.js`, `campusSoftening.js` | ~430 lines | Mixed | Extract repeating observation prose into `campusEvent.*` pools; add `campusFattening` selector |
| **Already modular (exemplars)** | `weighIn/`, `growthEvent/`, `hiveIntake.js`, `talkEncourage.js`, `forceFeeder/` | — | Yes | Copy as canonical skeleton+fragment+persona templates |

### 9b. New lexicon pools (`lexicon.js`)

Reusable `word.*` dictionaries shared across conversions:

- `word.psychVoice` — shame/reluctance/pride/submission/contentment × stage
- `word.breathQuality` — shallow → labored × fullness
- `word.jealousyReaction` — noticing/calculating/concealing × bodyType/stage
- `word.hungerPhrase` — low-belly → physical-ache × hungerTier/addiction/withdrawal

Body strain is already covered by `CLOTHING_FIT` — expose it as a standalone slot.

### 9c. Selectors to retrofit (exist, under-used)

Retrofit during conversion so content composes automatically:

- `mood` — almost no current prose inflects on it; add to dinner/body/intimacy/corruption
- `season` — extend beyond clothing to dinners/campus/device sensations
- `relationship` — add to feeding/dinner (first-date vs devoted)
- `skill` — growth/hunger flavor
- `campusFattening` — campus events/NPC lines
- `relSize` / `refStage` — body descriptions relative to a reference (`hiveIntake.js` pattern)

### 9d. Conversion sequence

Relative effort, not a single milestone:

1. **Quick wins** (small, high-visibility): expand `talk.coda`; extract `jealousy.reaction` pool; expand `corruption.voice` (12→~40 variants); verify `hungerInterruptPersonal` is wired into every feed moment.
2. **Critical grids** (biggest duplication / worst coverage): Dinner (paired with §8), then Body portraits, then Intimacy. Each becomes a `render<Scene>()` exported from `src/textEngine/scenes/<name>/` (index + fragments + personas) added to the scenes barrel.
3. **High:** migrate remaining evolved-form diaries into `diary.js`; build hunger/corruption voice scene usable from any feed/interrupt moment.
4. **Medium/Low:** cultivator, device catalog flavor, Lilith hunt, campus events.

**Success criteria:** each converted type yields many more readable combinations from far fewer authored fragments; every fragment keyed on ≥ 2 axes; per-student voice preserved; `text:lint` green; full 0–11 stage coverage.

---

## 10. Prioritization (impact × effort)

### Tier 1 — Highest leverage (do first)

| # | Task | Ref | Impact | Effort |
|---|---|---|---|---|
| 0 | 🔴 Declare `forceFeederState` | §2d | Unblocks entire usage→circuit-points loop | Trivial |
| 1 | Finish Circuit Boards for all devices | §2a | Headline feature | Medium |
| 2 | Wire Hunger Interrupts as decision events | §4 | Mechanical depth | Low–medium |
| 3 | Cross-wire corruption ↔ device intensity ↔ addiction | §1, §2e | System cohesion | Low |

### Tier 2 — Strong, moderate effort

| # | Task | Ref | Notes |
|---|---|---|---|
| 4 | Collapse three currencies / merge tech+research trees | §2c | Clarity unlock; refactor risk — sequence behind state-migration shim |
| 5 | Device usage micro-interaction archetypes | §2b | 2–3 new mini-interactions |
| 6 | Relationship decay + jealousy | §1 | Roster ecology |
| 7 | Unify "Take to Dinner" onto shared systems | §8 | Mechanics before text conversion |

### Tier 3 — Depth & endgame

| # | Task | Ref |
|---|---|---|
| 8 | Campus Saturation + Arrival capstones | §5 |
| 9 | Finish stubs: `networkState.js`, `deviceDependence`, `campusModes`, `permanentConvert` | §2d |
| 10 | Scrutiny consequences, prestige-lite, numbers pass | §4, §5, §6 |

### Cross-cutting (alongside the above)

**Text modularization (§9)** — standalone track, not one milestone. Order: (a) quick wins; (b) three critical grids — dinner (paired with §8), body, intimacy; (c) evolved-form diaries + hunger/corruption voice; (d) cultivator/device-flavor/Lilith/campus. New `word.*` lexicons (§9b) and retrofitted selectors (§9c) are shared infrastructure built as conversions need them.

---

## Risks & Things to Watch

| Risk | Mitigation |
|---|---|
| **Branch hygiene** | Rebase onto `origin/Primary` before implementation work or changes land on dead code. |
| **Currency refactor** | Merging tech+research trees touches save/state shape (`talia.js`, `labTechTree.js`, `researchTree.js`, `LabBuildModal.jsx`). Sequence behind a state-migration shim; ship boards (§2a) first since they're additive. |
| **Complexity creep vs. tone** | More systems must not bury the sensual core. Every mechanic needs warm, present-tense, stage-complete text; gate merges behind `npm run text:lint`. |
| **Friction fatigue** | Interrupts/maintenance are pacing tools, not punishment. Tune frequency; always give a satisfying response, never a dead tax. |
| **Save compatibility** | New per-device boards and selectors should default-initialize gracefully for existing saves. |
| **Scope** | Treat Tier 1 as the shippable milestone; Tiers 2–3 are follow-on. Don't start the refactor (§2c) and the boards (§2a) simultaneously. |

---

## Verification

After branch reset:

```bash
npm install && npm run dev
```

Confirm the app boots on Primary and Talia's Lab / Circuit / ForceFeeder flows render.

**Per feature:** exercise the loop end-to-end — run a lab session, build a device, use it (mini-game), spend invention points on its board, confirm mods apply on next use.

**Integration checks:** push a student's corruption/addiction and confirm gated device tiers and interrupt frequency change as designed.

**Content gate:** `npm run text:lint` must pass; spot-check new prose across low/mid/blob stages for tone + full stage coverage.

**Regression:** load a pre-change save to confirm graceful default-init of new state.

---

## Implementation Sequencing Summary

```
Tier 0  forceFeederState fix (1 line)
   ↓
Tier 1  Circuit boards (all devices) + hunger interrupt surfacing + psych cross-wiring
   ↓
Tier 2  Currency merge · device micro-interactions · relationship ecology · dinner unification
   ↓
Tier 3  Endgame spine · stub completion · balance pass
   ║
   ╚══ Text modularization (parallel track, paired with dinner at Tier 2)
```

Each tier is independently shippable. Preserve the bible's tone at every step: transformation as desirable, bodies described with care, students as complete people inhabiting their growth.
