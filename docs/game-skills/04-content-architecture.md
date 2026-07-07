# Skill: Content Architecture — Structuring Prose at Scale

A fattening game needs thousands of lines that stay coherent as state
changes. This skill is how to organize them. It works standalone (Twine,
Ren'Py, chat-adventure, plain React menus) and has a dedicated section for
the Modular Text Engine (see the Text Engine Manifesto) when available.

## 1. Beat families (organize by moment, not by chapter)

All content groups into **beat families** — recurring scene types keyed to
state. The staple families, roughly by content priority:

1. **Observation/portrait** — the player looks at her. Highest render
   frequency in the whole game; deepest state coverage required.
2. **Dialogue & self-reaction** — conversations; her own size-awareness
   (mirror moments, doorway lessons, interior asides).
3. **Feeding/meals** — the core verb: anticipation, indulgence, aftermath.
4. **Weigh-in/measurement** — ritualized numbers; threshold ceremonies.
5. **Wardrobe** — fit states, strain events, failures, replacement trips.
6. **Public/campus/world** — being seen; environment negotiation.
7. **Interrupts** — she comes to the player: hunger knocks, cravings,
   late-night raids. (Stateful by nature; see continuity below.)
8. **Rung-crossing events** — the threshold ceremonies between stages.
9. **Endings/epilogues** — the matrix payoff.

For each family, write a **beat card** before any prose: trigger, state
inputs read, choice outputs, intensity band, and which ladder rungs it must
cover.

## 2. The coverage matrix (the non-negotiable)

Content that relates to a ladder covers EVERY applicable rung of that
ladder. Filter by relevance (immobility beats: top rungs only; first-
softness beats: early rungs only; identity beats: all rungs) — then no
gaps. Maintain a spreadsheet or lint rule: beat family × rung, every cell
either filled or marked N/A on purpose. An uncovered cell is where a player
at that stage reads prose that ignores her body. That is the genre's
cardinal sin.

Same rule for psychology: dialogue-bearing beats cover each corruption/
stance tier they can fire at.

## 3. State-keyed writing without an engine

If you're in Twine/Ren'Py/plain code, reproduce the essentials manually
(rigor tiers and the pure-branching mapping: `12-any-game.md` §2, §5):

- **Descriptor functions, not inline description:** one function per
  described thing (`bodyLine(girl)`, `outfitLine(girl)`, `moveVerb(girl)`)
  switching on stage/psych — called everywhere, written once.
- **Variant arrays per cell** — every descriptor cell holds 3+ variants,
  picked randomly, tracked so the same variant doesn't repeat twice
  consecutively.
- **A facts dict per scene** — before writing a line that assumes state
  ("her top is intact"), check the scene's facts; when a line establishes
  state ("the button goes"), write it. Discipline substitutes for the
  engine's guard.

## 4. With the Modular Text Engine (recommended)

Wire beat families as namespaced pools (`meal.`, `wardrobe.`, `interrupt.`).
Per the Manifesto: skeletons compose sub-pools; sub-pools reuse the `word.*`
lexicon; `when` keys on stage bands + psych tiers + fit states; every pool
carries a wildcard fallback; stateful beats use `asserts`/`requires`/
`forbids`; namespaces get stem-tracking.

Four laws that bite hardest in practice:

- **Wildcard texts are tone-neutral.** Pooling has no NOT-conditions; a
  generic can fire during withdrawal, grief, or euphoria. "She crosses the
  room" qualifies; "she bounces in cheerfully" needs a mood key.
- **Tier-shaped skeletons need a `priority` gate.** The wildcard skeleton
  stays RNG-eligible in pool mode, so a tier-0-shaped fallback leaks into
  tier-2 renders as a rare wrong-register event playtesting misses.
  `weight` is for flavor; `priority` is for suppression.
- **Skeletons name her once; sub-beats use pronoun slots.** See `02` §6.
- **Volume floors:** every pool ≥4 texts at wildcard (≥3 non-empty), every
  keyed cell ≥3, every main character ≥2 persona beats per psych tier in
  personality slots. Below the floor, a pool reads as a loop within one
  session.

The lexicon to build first for THIS genre:

- `word.size` (ADJ, stage × corruption overlay), `word.body` (NP, bodyType ×
  stage), `word.moveVerb` (VP-3SG, stage + scenario tags), `word.fullness`
  (fullness ratio bands), `word.garment.*` (CLAUSE, fit-state keyed),
  `word.adv.pace` / `word.adv.sizeQual` (ADV, psych/stage keyed).

The forge method — pool briefs, sourcing sweeps, the only-here-word test —
is `09-lexicon-forge.md`; shell wiring is `08-shell-integration.md`.

## 5. The wardrobe state model (portable)

Garments carry `fitLbs` (weight they fit at) and `integrity`. Fit state
derives from current weight ÷ fitLbs: loose <0.85 ≤ fitted <1.05 ≤ snug
<1.15 ≤ straining <1.30 ≤ failing <1.50 ≤ burst. Track top / bottom /
waist separately with staggered baselines so they fail in sequence
(waistband first, top last). Failures are events AND facts: once the button
goes, no later line in that scene may describe it intact. Damage persists
until the garment is replaced.

## 6. Scene templates (steal these skeletons)

- **Meal:** venue line → her arrival (stage-keyed movement) → appetite beat
  (psych-keyed) → indulgence escalation (2–3 beats) → threshold → aftermath
  settle → interior note → choice.
- **Weigh-in:** arrival → settle/small-talk (psych register) → approach
  (movement + wardrobe clause) → the number (ritual; the ONE place numbers
  live) → her reaction (stance × delta keyed) → player response choice.
- **Wardrobe trip:** trigger (failure or milestone) → the trying-on beat
  (fit ladder dramatized) → size-number moment (rung ceremony) → her
  register (shame/ownership) → purchase choice with economy hook.
- **Interrupt:** arrival knock (urgency-keyed) → appearance (stage) →
  behavior (psych, ASSERTS a tone fact) → request (must agree with tone) →
  player choice → outcome + aftermath.
- **Mirror/self:** privacy establish → the look (bodyType geography) →
  the touch (stance-keyed) → the register line (what she lets herself
  think) → optional resolve shift (psych tier nudge).

## 7. Data-driven bulk content

Systematic corpora (growth descriptions across bodyType × zone; NPC
reactions across stance × stage) belong in data tables with a generator
loop, never hand-repeated. Always append the generic fallback row. Budget
rule of thumb per main character: ~60% generics shared by all, ~25%
trait-keyed, ~15% persona-unique.

## 8. Migrating legacy prose (when a game already exists)

Converting handwritten paragraphs into state-keyed content:

1. **Inventory every text source** — registered strings, data
   dictionaries, and prose hardcoded in UI components (there is always
   some). The legacy indexing (tier arrays, stage-band grids) is your
   selector map.
2. **Design beats and slots before writing text** — a slot inventory
   table: key, grammar shape, state axes, which legacy text feeds it.
   Reserve one dialogue slot per beat that carries personality.
3. **Mine, don't rewrite.** Quoted dialogue → persona lines VERBATIM
   (`03` §8). Description → normalized to the destination slot's shape.
   Connective tissue → dropped; skeletons supply it now. One legacy
   paragraph yields 2–4 fragments.
4. **Re-gate mined lines for their wider reach.** A line written for one
   stage band may now be selectable everywhere; if it implies gain, gate
   it. This is the single most common migration bug.
5. **Retire the legacy source in the same commit** as its replacement.
6. **Verify:** lint clean, spot-renders at the extremes, then live tuning
   (the flag-batch loop, `07` §3) until a flag batch comes back boring —
   that is the done signal.

## 9. Continuity discipline

- One shared session token (Set/dict) per game event, so repeated renders
  within the event don't repeat lines or re-contradict facts.
- Week-persistent no-repeat memory on each character for signature lines.
- Threshold events set persistent flags the whole world can key on
  ("brokeOfficeChair", "outgrewBoothSeats") — callbacks to these flags weeks
  later are the cheapest high-value content in the genre.
