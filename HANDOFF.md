# Professor Sim — Narrative-Depth Implementation Handoff

> Audience: a coding agent and a UI agent who have **not** seen the design-review conversation.
> Everything you need to start is in this document. Read it top to bottom before touching code.
> File paths verified against source on 2026-06-20.

---

## 1. Project context

**Professor Sim** is an adults-only (18+) React + Vite weight-gain college management / corruption sim. All narrative prose is produced by a **modular text engine**: templated slot skeletons are filled from a registry of `when`-keyed prose variants. Selection is **most-specific-wins**, or **pooled by specificity** (`registerPool`). Game state (per-girl stats, hidden meters, week counter) is the selector input; the engine never hardcodes story text inline — it always resolves through the registry.

For the full engine API, the lexicon/module catalog, the breakScene authoring pattern, and The Squad ownership matrix, invoke the `gamedev-text-engine` skill or read `src/textEngine/SQUAD.md`. This document does not duplicate the engine tutorial; it assumes you will lean on that skill.

---

## 2. Process rules (NON-NEGOTIABLE)

These are gating requirements. A PR that violates any of them does not merge.

1. **`registerPool` semantics.** `registerPool(key, variants, opts = {})` (defined in `src/textEngine/engine.js:261`) is `registerModule` with `select: 'pool'`. Variants are selected by specificity of their `when` clause; among equally-specific matches one is picked from the pool. More keys in `when` = more specific = higher priority.

2. **Mandatory `{ when: {} }` wildcard fallback.** Every pool you register MUST contain at least one variant with an empty `when: {}` (or no `when`) so the selector can never return nothing. A pool with only conditional variants can resolve to empty text for some game states — this is the most common lint failure. Always write the catch-all first, then layer specific variants on top.

3. **Barrel requirement.** Every NEW scene file MUST be imported in `src/textEngine/scenes/index.js`. That barrel is what `scripts/textLint.mjs` and the DebugPanel sweeps load to populate the full registry. A scene file that exists but is not in the barrel is invisible to the linter and to coverage checks. Add the import line alphabetically/by-section consistent with the existing groupings. (Game runtime code imports scene files individually for smaller graphs — but the barrel import is still required.)

4. **Lint-then-build, both clean, before any PR.**
   ```
   npm run text:lint     # node scripts/textLint.mjs  — content/coverage linter
   npm run build         # vite build                 — must compile clean
   ```
   Both must pass with zero errors. `text:lint` enforces weight-stage coverage and the wildcard-fallback rule; `build` catches import/syntax breakage. Do not open a PR on red.

---

## 3. The 12 improvements

Split by implementation complexity. Tier A = small, leverages systems already armed. Tier B = moderate, needs one new data type or moderate wiring. Tier C = larger, new content axis or multi-file.

### TIER A — armed systems, prose + thin wiring only

**A1. Scrutiny tier-up voiced event**
- *What:* When `scrutiny` crosses a SCRUTINY_TIER boundary, fire a voiced beat instead of a silent stat change.
- *Files:* new pool file `src/textEngine/scenes/scrutiny/index.js` (create), barrel line in `src/textEngine/scenes/index.js`; selector source `src/gameData/scrutinyConsequences.js` (exists — SCRUTINY_TIERS 0/50/75/90 Quiet/Noticed/Review/Investigation).
- *Exists vs new:* tiers + mechanical penalties (tier 2 = apPenalty 1; tier 3 = apPenalty 2 + eventBlock) already exist. Only the voiced tierUp prose is new.
- *Guardrail:* tone is institutional dread, not titillation — this is the consequence axis.

**A2. Discontent confrontation callbacks**
- *What:* Let a resentful/rebellious girl bring up a specific past grievance in dialogue.
- *Files:* `src/textEngine/scenes/confront/index.js` (exists), `src/textEngine/scenes/discontent/index.js` (exists); data `src/gameData/discontent.js` (exists).
- *Exists vs new:* grievances are ALREADY written to the memory store as negative-type entries; DISCONTENT_TIERS 0/20/50/80, `discontentRefusalChance`, `forceFeedIsBetrayal` all exist. New work = confrontation prose that reads the stored grievance and references it. Nearly free.
- *Guardrail:* the girl has agency here; her refusal/resentment must read as legitimate, not as an obstacle to be steamrolled.

**A3. Ecology favoritism report-card beat**
- *What:* A voiced "favored / neglected" line surfaced from favoritism flags.
- *Files:* new pool `src/textEngine/scenes/rosterTell/` (exists — extend) or a new sibling; data `src/gameData/relationshipEcology.js` (exists — `computeFavoritismFlags`, `favoritismSummary`, feed-gap 3 threshold).
- *Exists vs new:* flags + summary already computed and currently feed interrupt weighting only. New = dedicated voiced report-card prose.

**A4. Long-arc memory callback expansion**
- *What:* Widen `pickStudentMemory` long-arc callbacks into more scenes (weigh-in, dinner, stream).
- *Files:* `src/gameData/memory.js` (exists), consumer scenes under `src/textEngine/scenes/weighIn/`, `dinner/`, `stream.js`.
- *Exists vs new:* `pickStudentMemory(student, week)` and `pickClassMemory(students, week, excludeId)` exist and return selector globals (`memScope`, `memType`, `memWeeksAgo` / `memName`). New = wiring more scenes to call them + prose variants keyed on those globals.

### TIER B — one new data type or moderate wiring

**B1. Relationship-tier-cross memory + callback** — see Section 5 (the one new mechanic). This is the keystone of Tier B.

**B2. Interior monologue Talk-action surfacing**
- *What:* Give the existing interior pools (selfObs, sizeRealize, gainPride, personas) a Talk-action entry point, not just diary surfacing.
- *Files:* `src/textEngine/scenes/interior/index.js` (exists, pool-only), Talk scene files `src/textEngine/scenes/talkCheckIn.js` / `talkSuggest.js` (exist). NOTE: this touches an action flow — coordinate with UI agent only if a new button is needed; if it rides an existing Talk option it is coding-agent-only.
- *Exists vs new:* interior pools exist and are surfaced in the diary. New = a non-diary entry path.

**B3. Psych-state text-dim layering (no gates)**
- *What:* Let fixation/obsession/dependence/shame tiers tint existing prose (word choice, intrusive-thought asides) without adding hard gameplay gates.
- *Files:* `src/gameData/psychState.js` (exists — PSYCH_TIERS 0/25/50/75, `applyPsychDelta`, per-dim tier getters); apply in high-traffic pools (intimacy, interior, feedReaction).
- *Exists vs new:* dims + tiers + getters exist and are TEXT-DIM ONLY today. New = `when`-keyed variants that read the tier getters. **Do NOT add compulsion locks or AP pressure here** (see Section 7).
- *Guardrail:* shame/dependence asides must stay in-character interiority, never authorial moralizing or punishment framing.

### TIER C — new content axis / multi-file

**C1. Girl↔girl content axis** — see Section 6. This is the single largest new vein. Treat as its own track.

**C2. Class-gossip cross-girl web**
- *What:* Expand `pickClassMemory` cross-girl callbacks into a richer gossip layer (who noticed whom, jealousy spillover).
- *Files:* `src/gameData/memory.js` (exists), `src/textEngine/scenes/jealousyReaction.js` (exists), new gossip pool under `src/textEngine/scenes/rosterTell/` or new `gossip/index.js` (create + barrel).
- *Exists vs new:* `pickClassMemory` exists (scans scaleBreak/stageUp in last 3 weeks). New = breadth of voiced gossip + jealousy tie-in.

**C3. Per-girl arc continuity pass**
- *What:* Audit each girl's scenes so callbacks (memory, discontent, psych) read as one continuous arc rather than isolated beats.
- *Files:* cross-cutting — `src/textEngine/scenes/**`, per-girl data (`students.js`, character files like `talia.js`, `mayaHive.js`).
- *Exists vs new:* mostly consolidation/QA of A1–B3 once they land. Schedule last.

---

## 4. Systems already armed (quick reference)

All paths under `src/gameData/`. Verified 2026-06-20 — re-grep before relying on a specific symbol.

| System | File | Tiers / thresholds | Already wired | Gap |
|---|---|---|---|---|
| Scrutiny | `scrutinyConsequences.js` | SCRUTINY_TIERS 0/50/75/90 (Quiet/Noticed/Review/Investigation) | tier 2 apPenalty 1; tier 3 apPenalty 2 + eventBlock | no voiced tierUp event (A1) |
| Discontent | `discontent.js` | DISCONTENT_TIERS 0/20/50/80 (content/miffed/resentful/rebellious) | DISLIKE_SENSITIVITY, `grievanceGain`, `discontentRefusalChance` (0.25/0.5), `forceFeedIsBetrayal`; grievances written to memory as negatives | confrontation prose (A2) |
| Relationship ecology | `relationshipEcology.js` | feed-gap 3 → favored/neglected | `tickRelationshipDecay`, `computeFavoritismFlags`, `favoritismSummary`, `applyJealousyRelDelta`; feeds interrupt weighting | no voiced report card (A3) |
| Memory store | `memory.js` | n/a (event log on `student.memories`, cap 24) | `appendMemory`, `pickStudentMemory`, `pickClassMemory`; types feast/forced/stuffed/stageUp/scaleBreak + discontent negatives | no relationship/tier-cross type (B1) |
| Psych state | `psychState.js` | PSYCH_TIERS 0/25/50/75 (Low/Elevated/High/Extreme) | `applyPsychDelta`, per-dim tier getters; TEXT-DIM ONLY | text layering not yet keyed (B3) |
| Interior monologue | `textEngine/scenes/interior/` | n/a | pools selfObs/sizeRealize/gainPride/personas; surfaced in diary | no Talk-action entry (B2) |

---

## 5. The one new mechanic needed — relationship memory type

**File:** `src/gameData/memory.js` (exists, currently 65 lines, engine-free).

The memory store records notable events onto `student.memories` (persisted with saves). Entry shape:
```js
// { t: type, w: week, v?: value }
// existing types: 'feast' | 'forced' | 'stuffed' | 'stageUp' | 'scaleBreak' (+ discontent negatives)
```

**Add a relationship-tier-cross memory type** so the prose can call back to the moment a bond changed level (e.g., trust crossed up, or a betrayal crossed a girl into resentment). Concretely:

1. Add a type token — e.g. `'bondShift'` — to the documented type list in the header comment and emit it via the existing `appendMemory(memories, type, week, value)`. Use the optional `v` field to carry the direction/level (e.g. `v: 'trust+'` or `v: 'betrayal'`).
2. Extend `pickStudentMemory(student, week)` so the long-arc pool can surface `bondShift` entries (it currently filters `stageUp | scaleBreak | stuffed`). Return the existing selector globals (`memScope`, `memType`, `memWeeksAgo`) so no consumer changes are needed beyond adding `when: { memType: 'bondShift' }` prose variants.
3. The emit call site is wherever the relationship tier actually crosses — pair this with `relationshipEcology.js` / discontent tier transitions so the memory is written at the moment of the cross.

This is small-cost: the store, the append API, and the pick API all already exist. You are adding one token + one filter branch + the emit call, then prose variants keyed on it. Do NOT redesign the memory store.

---

## 6. The girl↔girl gap (biggest new content axis)

The game's relationship and memory systems are almost entirely **player↔girl**. Girl↔girl dynamics exist only as mechanical spillover (`applyJealousyRelDelta`, favoritism flags, `pickClassMemory` gossip) — there is very little *voiced* girl-to-girl content. **This is the single largest untapped vein** and should be treated as its own track (C1), not folded into other items.

How to approach it:

- **Build on what's armed.** `computeFavoritismFlags` / `favoritismSummary` (favored vs neglected) and `pickClassMemory` (who-noticed-whom in the last 3 weeks) already give you the relational substrate. Voice it; don't rebuild it.
- **Start with reactive beats, not full sub-routes.** Lowest-risk first content: one girl reacting to another's scaleBreak/stageUp (jealousy, admiration, rivalry, encouragement) — these can ride `pickClassMemory` globals (`memName`, `memType`, `memWeeksAgo`).
- **Then escalate to dyadic chemistry.** Only after reactive beats land should you author girl↔girl chemistry/intimacy. Establish personality-driven chemistry BEFORE any escalation — the same rule as player routes. A dyad needs its own small relationship signal before it gets a steamy beat.
- **New files, new barrel entries.** Likely a new `src/textEngine/scenes/gossip/index.js` and/or a `src/textEngine/scenes/dyad/index.js`, each with the mandatory `{ when: {} }` fallback and each added to `src/textEngine/scenes/index.js`.
- **Consent/agency guardrail:** girl↔girl content is between consenting adults with their own desires — neither girl is a prop for the player's gratification. Their chemistry must read as theirs. Keep every character 18+ and unambiguously adult in the prose.

---

## 7. What NOT to do (cut ideas + why)

These were considered and **rejected**. Do not implement them; do not "improve" them back in.

- **0-AP Notice action** — a free observe/notice action. Cut: erodes the AP economy's scarcity, which is what gives feeding/talk choices weight.
- **Interior readout panel** — a UI surfacing of raw interior state. Cut: kills the subtext; interiority should stay in prose (see B2/B3 which surface it *as prose*, never as a readout).
- **HUD surrender ladder** — a visible escalation meter on the HUD. Cut: turns a felt narrative arc into a number to grind; also reads as coercive framing.
- **Psych-state AP drain** — making high psych tiers drain action points. Cut: psych is TEXT-DIM ONLY by design (B3). Mechanical punishment via AP loss is not the intended use and reads as the game punishing the player for content states.
- **Supernatural destabilization** — adding instability/chaos to the supernatural forms layer. Cut: out of scope for this narrative-depth pass; supernatural scenes already exist and are not the priority vein.
- **Stat visibility gradient** — progressively revealing hidden meters. Cut: the hidden-state systems (discontent, psych, ecology) derive their narrative power from being *inferred through prose*, not displayed.
- **Elara** — a proposed new character. Cut: the priority is deepening the existing cast's arcs (C3) and the girl↔girl axis (C1), not adding cast surface area.

---

## 8. Split between coding agent and UI agent

**Coding agent (pure gameData / logic / prose — no React component changes):**
- A1 Scrutiny tier-up voiced event (new pool + barrel + read existing tiers)
- A2 Discontent confrontation callbacks (prose reading stored grievances)
- A3 Ecology favoritism report-card beat (prose from existing flags)
- A4 Long-arc memory callback expansion (wire more scenes to existing pick APIs)
- B1 Relationship-tier-cross memory type (`memory.js` + emit + prose) — Section 5
- B3 Psych-state text-dim layering (`when`-keyed variants reading existing getters)
- C1 Girl↔girl axis (data substrate already exists; this is prose + new pool files)
- C2 Class-gossip cross-girl web (extend `pickClassMemory` consumers + prose)
- C3 Per-girl arc continuity pass (prose/QA consolidation)

**UI agent (requires React component changes):**
- **B2 Interior monologue Talk-action surfacing** — ONLY if a new Talk button / action entry is needed in the UI. If it can ride an existing Talk option's flow, B2 is coding-agent-only. Coding agent should attempt the ride-along first and escalate to the UI agent only if a new control is required.

Everything else in the 12 is gameData/logic/prose and stays with the coding agent. There are **no mandatory** React component changes in this pass except the conditional B2 case. If a tier-up beat (A1) or report card (A3) needs a new surfacing surface beyond existing scene flow, flag it to the UI agent — but the default assumption is they ride existing scene render paths.

---

## 9. Definition of done (per item)

- [ ] New scene files imported in `src/textEngine/scenes/index.js`
- [ ] Every new pool has a `{ when: {} }` wildcard fallback
- [ ] Weight-stage coverage satisfied (enforced by `text:lint`)
- [ ] `npm run text:lint` clean
- [ ] `npm run build` clean
- [ ] Consent/agency + adults-only (18+) guardrails respected in all new prose
- [ ] Cut ideas (Section 7) not reintroduced
