Professor Sim — Mechanical Depth & Gameplay Plan

Professor Sim is a sensual weight-gain college sim (React + Vite) whose pleasure is the transformation of its students — their bodies and identities — framed as desirable and never apologized for (per DESIGN_BIBLE.md). The codebase is already a dense, multi-system game:
Modular text engine (src/textEngine/) — pool-based, stage-aware, 17+ selector dimensions, strict authoring contract (AUTHORING.md).
Gain core (gainSystem.js, stages.js) — cals→fullness→weekly digestion→lbs; 12 weight stages; capacity growth; force-feed odds.
Psych axes — corruption.js (3 tiers) and hungerAddiction.js (5 addiction × 5 hunger tiers, withdrawal, door-knock interrupts) — the latter mostly implemented with skill/trait/device modifiers.
Talia (the inventor) — talia.js, devices.js, inventionUpgrades.js, labParts.js, labTechTree.js, researchTree.js, forceFeederEvent.js + CircuitBoardModal.jsx, LabBuildModal.jsx. A full loop: Lab session → breakthroughs → tech/research → build (parts+money+Talia-lbs) → install → use device (rhythm mini-game) → invention points → circuit-board nodes → gameplay mods.
Pharmacist (Sophia) — pharmacist.js, pharmacistCult.js, pharmacistCampus.js, pharmacistIngredients.js, faculty.js — compounds delivered via food, campus-wide passive fattening, cult loyalty.
Evolved Forms (evolvedForms.js, ~5.8k lines) — per-student mid-game identity arcs with side skill trees and mini-games.
The problem this plan addresses: the systems are individually rich but the seams are thin. Three parallel device currencies don't talk to each other; only 1 of 9 devices has a circuit board; devices, corruption, hunger/addiction, relationships and evolved forms each progress in their own silo; the weekly loop rewards repetition more than mastery; and there is no real endgame structure. The goal is depth through integration and finishing, not new breadth — increasing meaningful decisions, long-term loops, and a sense of mastery while preserving the warm, sensual, appreciative tone.
This plan's scope is design strategy (a committed docs/DEPTH_PLAN.md design doc), not a code change yet. It is sequenced so each phase is independently shippable.
Executive Summary
The single highest-leverage move is to make the Circuit Board the universal progression language of the device layer, then wire that layer into the psych axes (corruption + hunger/addiction) and the evolved-form arcs so growth, devices, and relationships feed one loop instead of three. Concretely:
Finish the Circuit Board pattern across all devices (only feeding_mask has one). Each device gets a small board earned by using it, with a distinct micro-interaction — turning "owning a device" into "mastering a device."
Collapse the three device currencies (breakthroughs / invention points / experiment risk) into a clear, legible economy with one research currency and one per-device mastery track.
Make the weekly loop a scheduling/triage puzzle by leaning on the already-built hunger interrupt system: limited AP + competing demands (withdrawal, cravings, device maintenance, cult supply) force real trade-offs.
Cross-wire the axes: corruption gates device intensity, devices drive addiction, addiction unlocks deranged-hunger feeding tiers, evolved forms grant unique board branches. Every system should push or pull at least two others.
Add an endgame spine: a "campus saturation" meta-track + per-student "arrival" capstones that give long-term direction and a satisfying sense of completion without a hard ending.
Heal the worst silos: unify the isolated "Take to Dinner" system onto the shared fullness/calorie/refusal + corruption/hunger + item systems (§8), and run a text-modularization track that pulls the largest hardcoded prose grids (body descriptions, dinner, intimacy) into the existing modular engine (§9).
1. Core Progression Systems
Today: weight (cals→lbs weekly), corruption (0–100, 3 tiers), addiction/hunger (5×5 + withdrawal), relationship (0–100, 5 tiers) each move largely independently. Weight is the only axis with strong second-order consequences; the others mostly gate text and a few multipliers.
Make them interlock into one "transformation pressure" model:
Corruption as the permission axis. Gate device intensity and deranged feeding behind corruption tier, not just dialogue. Tier 0 → only gentle/worn devices accepted; Tier 1 → stationary rigs & force-feeding; Tier 2 → growth chamber/serum, public demos, self-experiment. This gives corruption a mechanical payoff and a reason to invest in it.
Addiction as the dependency axis (already player-specific in hungerAddiction.js). Reinforce the existing rule that hunger tiers 3–4 (Craving/Starving) require addiction ≥2. Add: addiction lowers refusal (cheaper force-feeds) but raises interrupt frequency — a genuine risk/reward, not pure upside.
Relationship as the access + warmth axis. Add relationship decay when a student is ignored for N weeks (currently absent — surfaced in exploration), and jealousy/favoritism state when one student is fed far more than peers. This converts the roster from parallel tracks into a managed ecology.
A unified "Surrender" readout. Expose a small per-student composite (weight stage + corruption + addiction + dominant evolved identity) so the player can read where each girl is and aim. Mastery comes from steering that vector, not from a single bar.
Reuse: getCorruptionTier(), getAddictionLevel(), getHungerTier(), getTier(rel), getHungerModifiers() already exist — this is wiring, not new math.
2. Inventions / Devices — Talia's Circuit Board System
This is the centerpiece and the biggest opportunity. The architecture is excellent; it's under-populated and over-fragmented.
2a. Finish the Circuit Board pattern for all 9 devices
Currently only feeding_mask has a board (CIRCUIT_BOARDS in inventionUpgrades.js); the other 8 are placeholder-ready. Author a board per device using the existing { mainPath, branches } shape. Each board should express the device's fantasy:
Auto-Feed Arm — automation board: passive lbs/week scaling, multi-target, "set and forget" vs "supervised burst."
Living Furniture Rig — comfort/permanence board: furniture-comfort economy, stage-bump pacing, immobility milestones.
Growth Chamber / Serum — burst-power board: magnitude vs instability/malfunction trade, permanent-conversion nodes.
Endless Hunger Engine — friction board: hunger-rise rate, distress states, campus-deploy discovery-risk reduction (already hooks hungerAddiction modifiers).
Obedience/Weight Belts — submission board: shame/obsession/dependence dials.
2b. Give each device a distinct usage micro-interaction
The force feeder's rhythm/choke mini-game (forceFeederEvent.js) is the proof of concept that using well > using often. Don't clone it — give 2–3 interaction archetypes and assign devices to them:
Rhythm/pressure (force feeder) — timing under a failure meter.
Resource/route (auto-feeder, campus tools) — allocate a budget across zones/targets under discovery risk.
Tuning/stability (chamber, serum) — push magnitude vs instability, manage malfunction rolls.
Performance tiers (perfect/good/messy/failure) → invention points (the existing recordForceFeederUse() model). This is the core moment-to-moment depth.
2c. Collapse the three currencies into a legible economy
Today: breakthroughs (lab→tech tree), invention points (use→circuit board), experiment cost (AP+instability→research). The tech tree and research tree both unlock blueprints — redundant. Recommend:
Research currency (breakthroughs): ONE tree that unlocks blueprints. Fold labTechTree.js and researchTree.js into a single gated tree (keep relationship/risk gating from research, keep prereq chains from tech).
Invention points (per device): stay device-local; earned only by usage. This is the "skill tree you level by playing."
Instability/maintenance: keep as the friction/risk meter that makes the lab a system to manage, not a vending machine. Maintenance debt and instability should occasionally force a "downtime" week — pacing pressure.
2d. Finish the half-built pieces (found in code)
🔴 forceFeederState is never declared in ProfessorSim.jsx — setForceFeederState(...) (≈line 2724) and the {forceFeederState && <ForceFeederModal/>} render (≈line 6045) reference a hook that doesn't exist, so the entire Force Feeder mini-game is dead on Primary (handlers openForceFeeder/handleForceFeederComplete/closeForceFeeder all no-op). The flagship usage→circuit-points loop literally cannot run today. One-line fix (const [forceFeederState, setForceFeederState] = useState(null)), but it gates everything in §2a/§2b. Do this first.
networkState.js is imported by talia.js but missing — Talia's stage-2+ "network" feature is stubbed. Define or remove.
deviceDependence and campusModes are defined but barely used — wire dependence into refusal/withdrawal and add UI to pick campus modes.
permanentConvert malfunction effect has no handler — implement or cut.
2e. Integration hooks (the payoff)
Devices drive addiction (endless hunger already does) and corruption (psychDelta), which gate higher-tier device acceptance — a closed growth loop.
Evolved forms grant exclusive circuit branches (e.g., the eating-competitor unlocks a "metabolic override" node) so the device tree and identity arcs reinforce each other.
3. Player Agency & Decision-Making
The biggest agency gaps are opportunity cost and irreversibility:
Scarce AP + competing demands. With interrupts, maintenance, cult supply, and per-student needs all wanting AP, the player must triage weekly. This is where mastery lives. Tune AP so you can't do everything.
Build/spec choices that lock. Circuit boards should have mutually exclusive branch tips (you can't max every branch on one device) so a force feeder built for "gentle override" plays differently from one built for "high pressure." Respec should cost (instability or breakthroughs), not be free.
Per-student strategy. Decay + jealousy mean choosing whom to push and whom to coast creates emergent narratives.
Risk dials the player sets. Instability, discovery risk, and malfunction odds should be visible levers the player can push for bigger payoffs — informed gambles, not hidden RNG.
4. Event & Activity Design
Convert narrative-only beats into small decision spaces; the engine already supports rich text under any state.
Hunger Interrupts as the flagship loop (HungerInterruptModal.jsx, hungerInterrupt.js exist). Each knock = a 4-option decision (Feed / Compound / Talk / Deny) with real stat consequences (HUNGER_CONFIG.denyRelLoss, etc.). Make outcomes branch on corruption/addiction/relationship so the same interrupt plays differently per girl. This is the single best ROI for "mechanical, not just narrative."
Feeding sessions gain mid-scene choices (pace, encourage, push past capacity) that feed the force-feed roll — small tactical layer over the existing dinner/private-session flow (sessions.js).
Campus events should read and write persistent state (scrutiny, who-was-seen, campus-saturation tier) instead of one-shot flavor. Wire adminScrutiny to actual consequences (it currently tracks to 100 and does nothing).
Mini-game reuse: standardize the existing contest/sumo/stream mini-games on the same performance-tier → reward contract as device usage, so the player's skills transfer and the UI language is consistent.
5. Long-Term Loops & Endgame
Currently open-ended with no spine. Add direction without a hard ending (matches the bible's "arrival, not rescue"):
Campus Saturation meta-track (extend pharmacistCampus.js's getCampusFatteningTier). A campus-wide gauge raised by cult supply, devices deployed on campus, and aggregate student weight. Tiers visibly change the world: heavier new students, softer ambient events, new venues. A long arc to fill.
Per-student "Arrival" capstones. Each evolved form gets a final, authored capstone state (the bible's "inevitable" endpoint) that flips on a unique repeatable activity and a permanent board branch — completion that keeps giving.
Talia's lab tiers (1→3) as the device-tech spine: stage 3 unlocks the network/automation endgame where devices run semi-autonomously across the roster — the "factory" phase of mastery.
Prestige-lite / New Semester (optional): carry over a small amount (one maxed board branch, lab tier) into a fresh class for replay variety. Lower priority.
6. Balance & Pacing
Diminishing returns on raw feeding; increasing returns on systems. Pure pizza-party spam should plateau; devices, compounds, and corruption-gated feeding should be how you break past mid-stages. This pushes engagement into the deep systems.
Instability/maintenance as a metronome. Periodic forced downtime weeks prevent monotone optimization and create rhythm (push → recover → push).
Addiction as the pacing brake. Interrupt frequency scales with how hard you push — self-balancing throttle that also generates content.
Stage-coverage discipline. Per DESIGN_BIBLE.md/AUTHORING.md, any new mechanic touching bodies needs text for all 12 stages and must pass npm run text:lint. Bake this into every content task.
Numbers pass: audit GAIN_CONFIG, board node costs, and currency yields so a full board feels like ~a mid-game arc, not a grind or a giveaway.
7. System Integration
The thesis: every system should push or pull at least two others. Target wiring:
Source →
Weight
Corruption
Addiction/Hunger
Relationship
Devices
Evolved Form
Weight stage-up
—
+corruption
unlocks device tiers
new events
enables rigs
triggers arc
Corruption
gates extreme gain
—
raises craving ceiling
unlocks psyche
gates device intensity
gates capstone
Addiction/Hunger
withdrawal slows gain
drift ↑
—
decay/penalty
endless-hunger synergy
feeds chemist arc
Devices (use)
direct lbs
psychDelta
drives addiction
intimacy branches
invention points
exclusive branches
Evolved form
identity gain
tier reactions
chemist=addiction
unique scenes
exclusive nodes
—
Text engine is the connective tissue — it already exposes hungerTier, addictionLevel, inWithdrawal, lastCompound, campusFattening, corruption, stage, etc. as selectors. New mechanics should add derived selectors, not bespoke text, so content composes automatically.
8. "Take to Dinner" — Unify onto the Shared Systems
Dinner (sessions.js) is today a near-complete parallel feeding implementation that shares almost nothing with the core loop. The integration target is: dinner becomes one venue-flavored skin over the shared feeding/psych/text systems. Five concrete seams:
Fullness — collapse to one model. Dinner keeps a local dinnerEvent.fullness and maxFullness = 60 + getStage(s.lbs).id*14, and separately inflates student.fullness by ~50% of dish fullness — a confusing double-write. Fix: drop the local fields; read/write student.fullness against student.stomachCapacity (the real, growing capacity from GAIN_CONFIG). One belly, one curve, persists across the week — so a dinner fills her up for whatever comes next that week, which is the whole point of integration.
Gain pathway — route through feedStudentCalories(). Dinner writes consumedCalories directly; instead funnel every dish through the shared feedStudentCalories(s, cals, fullnessCost, rel, label) so digestion, capacity growth, stuffed-streak, and skill effects all apply uniformly.
Refusal & force-feed — use forceFeedChance(). Dinner currently never refuses (only a narrative offenseLevel ends it). Wire the shared forceFeedChance(s, food, spirit) + REFUSAL_LINES/FORCE_SUCCESS_LINES so pushing a stuffed girl through another course is a real roll — modified, per §1, by corruption (resistance) and addiction (compliance).
Corruption & hunger matter. Dinner reads neither today. Make them inputs and outputs: a Craving/Starving (hunger ≥3) girl orders more aggressively and a dinner can resolve a pending hunger interrupt (a legitimate "Feed" response); corruption tier shifts her dialogue and lowers refusal; successful over-stuffing grants perForceFeed/perStuffedWeek corruption like other feeds. This turns dinner into a tool for managing the very pressures §1/§4 create.
Bring-your-own items. Venue dishes are inline objects, disconnected from items.js. Unify the dish data model with ITEMS[] (cal/full/rarity), let the player spend inventory items mid-dinner (a "share something you brought" action — already the pattern in private sessions' PRIVATE_FOODS/feedInSession), and let venues expose a curated subset of the shared item pool.
Text → modular engine (see §9). Dinner's ~6.7k words of inline templates (WAITER_DESC, the 4×4 DINNER_ENDING_TEXT grid, DINNER_CONVERSATION, jealousy/encourage/retort sets, venue desc) are the single largest non-modular surface and the prime conversion target.
Note: group dinner (groupDinnerEvent) and private sessions (privateSession) share dinner's parallel-fullness pattern — unify all three in the same pass.
9. Text Modularization — Type-by-Type Allocation
The engine is excellent and already powers ~34 scene files / ~120 pools (weighIn, growthEvent, diary, talkEncourage/Codas, hungerLexicon/Interrupt, device/talia, hiveIntake, etc.) — but a large mass of prose still lives as hardcoded grids/dicts outside it. Governing rule (from AUTHORING.md): convert highest-duplication / worst stage-coverage text first into skeleton + fragment pools, one grammar shape per pool, a tone-neutral wildcard always present; preserve per-character voice via studentId personas (weight 4) layered over archetype fragments (weight 2); every conversion must pass npm run text:lint.
9a. Allocation by content type
Content type
File(s)
~Vol
Modular?
Shape today → target
Body portrait
content.js, evolvedForms.js
~1.5–2k lines
No
BODY_DESCS[type][stage] 110-cell monolith grid → body.* skeleton (face/torso/lower/movement/clothing) reusing word.body+word.clothingFit; add mood/fullness/relSize
Dinner / feeding narration
sessions.js
~1k lines
No
4×4 DINNER_ENDING_TEXT grid + waiter/jealousy/conversation dicts → dinner.* skeleton (setup/courseReaction/endReflection/exit) + dinner.jealousy pool
Intimacy
intimacy.js
~950 lines
No
11 archetype dicts + 18 per-student dicts (heavy duplication) → intimacy.* skeleton (approach/bodyFeel/resistance/psychVoice/climax); studentId personas over archetype fallback
Evolved-form diaries/arcs
evolvedForms.js, competitiveGainerText.js
~3k+ lines
Partial (3 forms in diary.js)
Per-(form×student×tier) string grids → migrate all forms into diary.js skeleton with stage/corruption/season/mood selectors
Hunger/corruption inner-voice
corruption.js, hungerLexicon.js
~200 lines
Partial
CORRUPTION_FEED_LINES[tier][0-3] (only 12 lines) → hunger.voice/hunger.physical + corruption.voice pools keyed on hungerTier/addiction/withdrawal/corruption/mood
Talk codas/topics
talkCodas.js, talkSystem.js
~50 lines
Partial (modular but thin)
2 lines/register → expand to 5–8 with mood/stage/relationship + personas
Cultivator recipes
cultivator.js
~380 lines
No
Inline junction/choice/reaction prose → cultivator.* pools keyed recipe/junction/suspicionTier; Reneé persona
Device/Talia catalog flavor
devices.js (+ existing deviceUse/,talia/ scenes ✓)
~600 lines
Partial
Hardcoded 1–2 line devices.js descs → device.* sensation/psych pools keyed deviceId/zone/sensation
Lilith hunt
lilith.js
~380 lines
No
HUNT_NODES/HUNT_MEN descs → hunt.* pools keyed nodeId/targetId/lilithStage/relSize
Class/campus events
classEvents.js, campusSoftening.js
~430 lines
Mixed
Extract repeating observation prose into campusEvent.* pools; add campusFattening selector
Already modular (exemplars to copy)
weighIn/, growthEvent/, hiveIntake.js, talkEncourage.js, forceFeeder/
—
Yes
Use as canonical skeleton+fragment+persona templates
9b. New lexicon pools to add (lexicon.js)
Reusable word.* dictionaries that many of the above conversions will share: word.psychVoice (shame/reluctance/pride/submission/contentment × stage), word.breathQuality (shallow→labored×fullness), word.jealousyReaction (noticing/calculating/concealing × bodyType/stage), word.hungerPhrase (low-belly→physical-ache × hungerTier/addiction/withdrawal). Body strain is already covered by CLOTHING_FIT — expose it as a standalone slot.
9c. Selectors to retrofit (already exist, under-used)
The engine already supports them; the hardcoded prose just never keyed on them. Retrofit during conversion so content composes automatically: mood (almost no current prose inflects on it — add to dinner/body/intimacy/corruption), season (extend beyond clothing to dinners/campus/device sensations), relationship (add to feeding/dinner — first-date vs. devoted), skill (growth/hunger flavor), campusFattening (campus events/NPC lines), relSize/refStage (body descriptions relative to a reference, as hiveIntake.js already does).
9d. Conversion sequence (relative effort, not a single milestone)
Quick wins first (small, high-visibility): expand talk.coda; extract a jealousy.reaction pool; expand corruption.voice (12→~40 variants); verify hungerInterruptPersonal is wired into every feed moment.
Critical grids (biggest duplication / worst coverage): Dinner (do with §8 — convert as you reroute the mechanics), then Body portraits, then Intimacy. Each becomes a render<Scene>() exported from a new src/textEngine/scenes/<name>/ folder (index + fragments + personas) added to the scenes barrel.
High : migrate remaining evolved-form diaries into diary.js; build the hunger/corruption voice scene usable from any feed/interrupt moment.
Medium/Low : cultivator, device catalog flavor, Lilith hunt, campus events.
Success criteria: each converted type yields many more readable combinations from far fewer authored fragments, every fragment keyed on ≥2 axes, per-student voice preserved, text:lint green, full 0–11 stage coverage.
10. Prioritization (impact × effort)
Tier 1 — Highest leverage (do first):
0. 🔴 Declare forceFeederState (§2d) — one line; unblocks the entire usage→circuit-points loop that is dead on Primary. Trivial effort, prerequisite for everything else in §2.
Finish Circuit Boards for all devices (§2a) — high impact, medium effort; pattern exists. This is the headline feature.
Wire Hunger Interrupts into the loop as decision events (§4) — high impact, low–medium effort; code largely exists, needs surfacing/branching.
Cross-wire corruption ↔ device intensity ↔ addiction (§1, §2e) — high impact, low effort; mostly conditional gating on existing values.
Tier 2 — Strong, moderate effort:
4. Collapse the three currencies / merge tech+research trees (§2c) — clarity unlock; medium effort, some refactor risk.
5. Device usage micro-interaction archetypes (§2b) — high engagement; medium-high effort (2–3 new mini-interactions).
6. Relationship decay + jealousy (§1) — converts roster into an ecology; medium effort.
7. Unify "Take to Dinner" onto shared fullness/calorie/refusal + corruption/hunger + items (§8) — high integration payoff, medium effort; mostly rerouting 3 functions (orderDish, triggerDinnerEnd, group-dinner loop) and dropping the duplicate fullness fields. Do the mechanics unify before the text conversion.
Tier 3 — Depth & endgame:
8. Campus Saturation meta-track + Arrival capstones (§5) — long-term direction; higher effort/content.
9. Finish stubs: networkState.js, deviceDependence, campusModes, permanentConvert (§2d) — unblocks Talia stage 2–3.
10. Scrutiny consequences, prestige-lite, numbers pass (§4, §5, §6).
Cross-cutting (sequence alongside the above):
Text modularization (§9) — a standalone track, not one milestone. Order: (a) quick wins (talk.coda, jealousy.reaction, corruption.voice, hunger-persona wiring); (b) the three critical grids — dinner (paired with §8), body portraits, intimacy; (c) evolved-form diaries + hunger/corruption voice; (d) cultivator/device-flavor/Lilith/campus. New word.* lexicons (§9b) and retrofitted selectors (§9c) are shared infrastructure built as the conversions need them.
Risks & Things to Watch
Branch hygiene (blocking): must rebase onto origin/Primary first or work lands on dead code.
Currency refactor risk: merging tech+research trees touches save/state shape and several files (talia.js, labTechTree.js, researchTree.js, LabBuildModal.jsx). Sequence it behind a state-migration shim; ship boards (§2a) first since they're additive.
Complexity creep vs. tone: more systems must not bury the sensual core. Every mechanic needs the warm, present-tense, stage-complete text the bible mandates; gate merges behind npm run text:lint.
Friction fatigue: interrupts/maintenance are pacing tools, not punishment. Tune frequency; always give the player a satisfying response, never a dead tax.
Save compatibility: new per-device boards and selectors should default-initialize gracefully for existing saves.
Scope: treat Tier 1 as the shippable milestone; Tiers 2–3 are follow-on. Don't start the refactor (§2c) and the boards (§2a) simultaneously.
Verification
After branch reset: npm install && npm run dev, confirm the app boots on Primary and Talia's Lab/Circuit/ForceFeeder flows render.
Per feature: exercise the loop end-to-end in-app — run a lab session, build a device, use it (mini-game), spend invention points on its new board, confirm mods apply on next use.
Integration checks: push a student's corruption/addiction and confirm gated device tiers and interrupt frequency change as designed.
Content gate: npm run text:lint must pass; spot-check new prose across low/mid/blob stages for tone + full stage coverage.
Regression: load a pre-change save to confirm graceful default-init of new state.
Deliverable
Commit this plan as docs/DEPTH_PLAN.md alongside DESIGN_BIBLE.md on a branch rebased onto origin/Primary, then push. (User expressed no preference on form; a committed design doc matches the repo's existing docs/ convention and the branch name.)
