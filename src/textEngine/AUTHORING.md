# Text Engine Authoring Guide

> **Audience: you, the LLM (or human) about to write game prose.** Read this whole file before writing or editing ANY narrative text. The engine reference is `docs/modular-text-system.md`; this file is the content contract. The canonical exemplar files to copy are `src/textEngine/scenes/weighIn/` and `src/textEngine/scenes/talkEncourage.js`.
>
> **The Squad:** All narrative work is owned by the six-agent team in **`SQUAD.md`** — identify your lead agent before editing. **Early game (stages 0–4, corruption 0) is Agent 6 (Slender).** Every prose pass ends with Agent 5's quality gate.
>
> Companions: `SQUAD.md` (agent ownership & workflow) · `MIGRATION.md` (legacy → modular) · `TUNING.md` (flag-batch loop + **Style Ledger**)

## 0. Prime directive

**Never register a monolithic paragraph as a variant.** If a text you are about to write is longer than ~200 characters, it is a *skeleton* candidate: break it into a skeleton template plus fragment slots. The whole point of this system is that fragments mix and match combinatorially — one 4-fragment sentence with 5 options per slot yields 625 readable sentences; one handwritten paragraph yields 1. `npm run text:lint` enforces this (error at >200 chars in pool modules).

The second rule: **the player rereads this prose hundreds of times.** Variety, personality, and state-reactivity are the product. A line that ignores the girl's mood, body type, or hunger when those should obviously change it is a bug.

## 1. Mental model

Two layers, always:

1. **Skeletons** — short sentence templates containing slots, registered as the *beat* module (e.g. `wi.arrival`). A beat has 3-6 skeleton shapes so sentence rhythm varies, not just word choice.
2. **Fragments** — small pools of words/clauses/dialogue beats that fill the slots (e.g. `wi.moveVerb`, `wi.bodyClause`). Each fragment variant declares `when` selectors; the engine picks among ALL matching variants, weighted toward specificity.

```js
import { registerPool } from '../engine.js';

registerPool("wi.arrival", [
  { when: {}, text: [
    "{subject.name} {wi.pace} {wi.moveVerb} {wi.doorway}{join:wi.bodyClause,wi.faceClause|prefix:, }.",
    "{subject.name} {wi.moveVerb} in{join:wi.bodyClause,wi.soundClause|prefix:, }.",
  ]},
]);

registerPool("wi.bodyClause", [
  { when: {}, text: ["", "", "her steps unhurried"] },                       // weighted-empty: clause often omitted
  { when: { bodyType: ["pear", "hourglass"], stageMin: 6 }, text: [
    "her wide hips catching briefly in the door",
    "her hips brushing both sides of the frame",
  ]},
  { when: { bodyType: "topHeavy", stageMin: 6 }, text: [
    "her heavy bust arriving a beat before she does",
  ]},
]);
```

### `registerPool` vs `registerModule`

- **`registerPool` — the default for ALL new content.** Every matching variant stays RNG-eligible; weight = `(variant.weight ?? 1) * 3^specificity`. A 2-condition variant beats a wildcard 9:1, so specific flavor usually wins but generic lines surface as spice (~10-25%).
- **`registerModule` ('best' mode) — legacy/suppressive.** Most specific match wins outright. Use ONLY when less-specific variants must be *impossible*, not just rare (e.g. `talk.coda` registers an empty wildcard so the coda is silent unless a corruption register fires).
- `weight` raises/lowers a variant's share (`weight: 4` on persona variants keeps the girl's own voice dominant; `weight: 0` parks a draft).
- `priority` in pool mode is a **hard gate**: only max-priority matches survive. Use rarely and document why in a comment.

### Inter-slot flags (`consumes` / `requireAbsent`)

`createContext()` initializes `ctx.flags` — a per-render bag for inter-slot exclusivity. Variant fields:

- `consumes: ['flagName']` — sets the flag after this variant is selected.
- `requireAbsent: ['flagName']` — excludes the variant if the flag is already set.

Authorized namespaces: `psych_mood`, `scale_ref`, `speed_mod`, `size_reminder`, `sound_tex`, `spatial_obs`. Use only for known problem pairings (e.g. pace adverb + psychological annotation both firing). Most pools need neither field.

### Anti-repetition (`sessionUsed` / `weekUsed`)

Pool picks record a stable key per variant line (`moduleKey#variantIndex:textIndex`). Lines already chosen this **session** (one weigh-in, dinner, digest beat) or this **week** (`student.textUsedKeys`) are deprioritized, not excluded — weights multiply by `0.12` (session) and `0.4` (week). If every eligible line is penalized, the engine falls back to full weights.

Gameplay passes a shared `sessionUsed` Set across renders in one event; `weekUsed` loads from / saves to `student.textUsedKeys` via `textContext.js` helpers. Cleared on week advance in `clearWeeklyTextFlags`.

### Extensible dimensions (`registerDimension`)

New game-state dimensions can be registered without editing `engine.js`:

```js
import { registerDimension } from '../engine.js';
registerDimension('myKey', (ctx) => ctx.globals?.myValue ?? 'default');
```

Results land on `ctx.d.myKey` and are usable in `when` immediately. Built-in dimensions: `campusLocale`, `mobilityLevel`, `clothingState`, `mealContext`, `isGaining`, `lastCorruptionShift`, **`gainStance`** (A6 — `opposed` | `reluctant` | `secret` | `neutral` | `acclimating`; derived from shame/fixation tiers at corruption 0).

### Consequence of pooling: generic fragments must be tone-neutral

There are no NOT-conditions. A wildcard fragment can fire while the girl is in withdrawal, grieving, or ecstatic — so wildcard texts must read correctly under ANY state ("she crosses the room" ✓, "she bounces in cheerfully" ✗ — key that one on `mood`).

## 2. Grammar-shape contracts

Every fragment pool has ONE grammatical shape. Mixing shapes inside a pool breaks every skeleton that uses it. Declare the shape in a comment above each pool.

| Shape | Rules | Example |
|---|---|---|
| **ADVERBIAL** | lowercase, no punctuation | `without hurry`, `with single-minded momentum` |
| **VERB PHRASE** | lowercase, follows a subject, no punctuation | `waddles`, `angles sideways through` |
| **PARTICIPLE CLAUSE** | lowercase, no leading cap, no trailing period; reads after a comma | `her wide hips catching briefly in the door` |
| **FULL SENTENCE** | Capitalized, ends with `.` (or `!?`) | `The dial holds at {subject.lbs}.` |
| **DIALOGUE BEAT** | Full sentence(s) containing a quote + attribution | `"Coach would lose his mind. I don't care," she says.` |

### Idioms

- **Optional clause group:** `{join:wi.bodyClause,wi.faceClause|prefix:, }` — resolves both, drops empties, glues survivors with `, ` + final `and`, and only emits the leading `, ` if anything survived. This is THE way to stack body/mood clauses onto a sentence.
- **Optional single slot:** `{wi.moodTag|prefix: }` — leading space only when non-empty.
- **Sometimes-omit:** put `""` entries in the wildcard pool (each `""` is one share of the RNG). Two empties + one text ≈ 33% emission at wildcard.
- **Weight callout:** `{subject.lbs}` (rounded number), `{subject.name}`, `{subject.first}`.
- **Smoothing gotcha:** the smoothing pass capitalizes after `. ` and at string start, but NOT after `\n\n` — fragments that open a paragraph must be authored capitalized or piped through `|cap`.
- Never name a module `join` (reserved). Never use `{` or `}` in prose (write `{{` for a literal brace).

## 3. Selector cookbook

All keys combine (AND within a variant; value arrays are OR). Unlisted keys are looked up on `ctx.d` directly.

| Key | Values |
|---|---|
| `stage` / `stageMin`+`stageMax` | 0 Slight · 1 Slim · 2 Soft · 3 Chubby · 4 Plump · 5 Heavy · 6 Fat · 7 Very Fat · 8 Enormous · 9 Colossal · 10 Blob · 11 Leviathan. Bands used by weigh-in content: light ≤2, rounded 3-5, heavy 6-8, vast 9+ |
| `corruption` | 0 Hesitant · 1 Conflicted · 2 Broken In |
| `relationship` | 0 Acquaintance · 1 Close · 2 Intimate · 3 Devoted |
| `mood` | happy, focused, excited, content, tired, stressed, warm, observant, cheerful, bemused, curious, nervous (new moods may appear — ALWAYS provide a wildcard) |
| `bodyType` | pear, apple, hourglass, athletic, straight, rotund, voluptuous, mom_bod, fertility_goddess, topHeavy (+ `default` row convention in lexicon) |
| `archetype` | cheerleader, bookworm, influencer, athlete, artsy, gamer, sorority, overachiever, quiet, transfer, culinary, nursing, psych, eced, farm_girl, predator, pharmacy_grad, explorer |
| `hungerTierMin/Max` | 0 Normal · 1 Increased · 2 High · 3 Craving · 4 Starving |
| `addictionLevelMin/Max` | 0 None · 1 Mild · 2 Moderate · 3 Severe · 4 Dependent |
| `inWithdrawal` | true/false — shaky, irritable, food-fixated register |
| `fullnessMin/Max` | fullness ÷ stomachCapacity (can exceed 1) |
| `studentId` | value or array — see roster below |
| `lastCompound` | pharmacist drug last applied: appetite_stimulant, mild_pleasure, metabolic_slowdown, weight_gain_potion, strong_appetite, high_pleasure, digestion_supplement, craving_inducer, sensitivity_serum, intentional_addiction, loyalty_enhancer, rapid_expansion, addiction_cure, cult_appetite, cult_pleasure, dependency_maintenance |
| `season` | fall, winter, spring, summer (4-week cycles) |
| `campusFattening` / `campusTierMin/Max` | school-wide softening flag / tier 0-3 |
| `bigScale` | true when the industrial scale is in play (say "display", not "dial") |
| `campusLocale` | hallway, lecture_hall, gym, cafeteria, dorm_room, stairwell, elevator, prof_office (via `registerDimension`) |
| `mobilityLevel` | full · present · planning · economy · minimal · immobile (derived from stage) |
| `clothingState` | fitted, button_pop, zipper_fail, seam_split, waistband_surrender, sleeve_restriction, shirt_rise, bra_protest |
| `mealContext` | breakfast, binge, snack, campus_meal, meal |
| `isGaining` | true when week-over-week gain is active |
| `lastCorruptionShift` | true in the week corruption actually increased (psych shift scenes) |
| `skill` | one skillEffects flag name, truthy check |
| `relSize` / `refStage` | vs `ctx.ref`: much_smaller, smaller, similar, larger, much_larger |
| `causeType` | device_use, device_malfunction, weekly_tick, digest_stageup, feature |
| `featureId` | stream, compound, cultivator, contest, digest_stageup |
| `growthMethod` | feed, bloat, serum, gas, radiation, stimulate, limit_break, sculpt, infuse |
| `growthIntensity` | gradual, steady, rapid, violent |
| `sensation` | pressure, fullness, warmth, pleasure, stretch |
| `growthZone` | belly, hips, thighs, ass, chest, full, lower_body |
| `locale` | lab, dorm, campus, stream_setup, dining_hall, kitchen, office |
| `outfitHint` | archetype string or override: stream outfit, contest, casual |
| `startStageMin/Max` | pre-gain stage (globals.startStage) |
| `endStageMin/Max` | post-gain stage (globals.endStage); `endStage` exact for crossings |
| `stagesJumpedMin` | stage span of the event |
| `limitRemoved` | student/globals flag — runaway growth residual |
| `isPermanent` / `isMalfunction` / `malfunctionTier` | growth event tone gates |
| `deviceDependenceTierMin` | 0–3 psych+equip composite |
| `gainLbsMin` | minimum pounds gained this event |

### Student roster + voice cheat-sheet

| id | Name | Archetype | Body | Voice in one line |
|---|---|---|---|---|
| 0 | Brittany | cheerleader | pear | Competitor reframing gain as winning; "I'm keeping score." |
| 1 | Madeline | bookworm | straight | Academic self-study; datasets, hypotheses; "I am the result." |
| 2 | Kylie | influencer | hourglass | Everything is content; brand, engagement, "no filter. Just me." |
| 3 | Serena | athlete | athletic | Split-times and discipline redirected; "New event. No weight class." |
| 4 | Fiona | artsy | straight | Sees herself as composition/canvas; reverent, unhurried. |
| 5 | Destiny | gamer | apple | Dry gamer idiom; builds, patch notes, "new high score." |
| 6 | Tiffany | sorority | hourglass | Bubbly chapter-president; "More is more, babe." |
| 7 | Priya | overachiever | straight | KPIs and frameworks; gain as overperformance. |
| 8 | Maya | quiet | pear | Few words, all load-bearing; "More." / "Home." |
| 9 | Chloe | transfer | apple | Dry Dublin wit; American portions as field research; "my mam will have words." |
| 10 | Reneé | culinary | rotund | Chef's sensory vocabulary; body as kitchen/recipe. |
| 11 | Kaylee | nursing | fertility_goddess | Clinical warmth turned on herself; "aggressive self-care." |
| 12 | Nadia | psych | voluptuous | Analyst watching you watch her; names the dynamic out loud. |
| 13 | Daisy | eced | mom_bod | Southern warmth, endearments; "bless it", feeding as kindness. |
| 14 | Mary Jane | farm_girl | hourglass | Country abundance; harvest/hay-scale imagery. |
| 15 | Lilith | predator | hourglass | Sparse, unsettling, amused; never explains; "Soon." |
| 16 | Sophia | pharmacy_grad | pear | Anxious precision; wellness-research framing, double-checked numbers. |
| 17 | Indiana Bones | explorer | straight | Roguish archaeology bravado; everything is an expedition. |

### Per-girl corruption arc voice (6-line guide)

**Squad lead: Agent 2 (Psych)** for beats 2–6. **Agent 6 (Slender)** owns beat 1 and all early-game staging. Agent 5 (Editor) holds final voice consistency.

For each student, calibrate interior voice across these beats — use when writing `shift.*`, `interior.*`, `slender.*`, `eat.*` persona lines, and `diary` entries:

1. **Corruption 0, visible gain** — **A6 Slender:** resistance, neutrality, or secret appetite; excuses vs. unfussed vs. body contradicting words; `gainStance` keys. Subtle physical change on still-thin bodies.
2. **Corruption 0→1 transition** — first crack; pleasure where dread was; files feeling elsewhere, does not stay filed.
3. **Corruption 1** — ambivalent; stopped fighting, not yet celebrating; flat familiarity.
4. **Corruption 1→2 transition** — surrender; social witness; interior goes quiet; nothing left to argue.
5. **Corruption 2** — settled; appetite open; body as project/status report; "more."
6. **Stage 10-11** — leviathan reality; practical knowledge of scale; immobility as fact, not emergency.

Archetype colors the six lines (competitor/data for Brittany, sensory catalog for Reneé, resource management for Destiny, clinical warmth for Kaylee, silence for Maya, predator watchfulness for Lilith) but corruption tier is the primary axis.

## 4. Per-girl persona conventions

- Persona variants live in a dedicated `personas.js` next to the scene (see `scenes/weighIn/personas.js`), registered into the SAME slot keys via `registerModuleVariants` — they extend the shared pool, they don't replace it.
- Key on `studentId` (+ `corruption`, + wide `stageMin/stageMax` ranges so several lines co-pool) and set `weight: 4` so the girl's own voice dominates without silencing shared fragments.
- **Dialogue is sacred:** when migrating handwritten lines, keep quoted speech verbatim — the voice lives in the quotes. Narration around quotes may be genericized.
- Aim for ≥2 dialogue beats per girl per corruption tier in any slot that carries personality.

## 5. Authoring a new scene (checklist)

**Route through `SQUAD.md` first** — confirm lead agent, then:

1. New file under `src/textEngine/scenes/` (or a folder for multi-file scenes). Register scene-local modules at import time; export template constants + a `renderX()` wrapper. Namespace keys (`wi.*`, `enc.*`, `<feature>.*`).
2. Add the file to `src/textEngine/scenes/index.js` (the barrel — lint and DebugPanel sweep it).
3. Every pool: a `when: {}` wildcard variant (lint errors otherwise), ≥3 wildcard texts, one grammar shape, a shape comment.
4. Decide which axes the scene should react to (stage? bodyType? mood? hunger? per-girl?) and write keyed variants for the top 2-3 axes minimum.
5. `npm run text:lint` — must be clean for your keys. Then `npm run lint`.
6. **Agent 5 (Editor) gate:** sample renders + Style Ledger check (see `SQUAD.md`).
7. Eyeball renders: DebugPanel sweep buttons, or `node --input-type=module -e "import './src/textEngine/scenes/index.js'; import { createContext, render } from './src/textEngine/engine.js'; ..."`.

## 6. Anti-patterns

- **Monolith variant** — a paragraph as `text`. Decompose. (Lint error in pools.)
- **Missing wildcard** — module goes silent/crashes coverage in unforeseen states. (Lint error in pools.)
- **Shape mixing** — a full sentence inside a participle-clause pool mangles every skeleton downstream.
- **Slot overreach** — a `wi.bodyClause` that also describes her face does the neighbor slot's job; combined output reads twice-described.
- **Tone-loaded generics** — wildcard fragments with strong affect undercut mood/withdrawal-keyed contexts.
- **Re-registering a key** — overwrites silently in prod (dev warns). Check the namespace before naming.
- **Paraphrasing mined dialogue** — kills the character voice that playtesters already know.
- **`gameHelpers.rnd` vs `pick`** — `rnd(a,b)` is an int range, `pick(arr)` picks from an array. Never mix.
- **Anything in the TUNING.md Style Ledger** — banned constructions discovered through live tuning ("Statement. That is X.", knowing-narrator winks, gain-excuse lines below stage 2, double-described phenomena, pace/verb contradictions…). The ledger grows; check it before writing. Automated grep: `scripts/text-lint.config.js`.

## 7. Onboarding templates

### New character checklist

1. `studentId` + archetype/bodyType/voice row in this file.
2. Six-line corruption arc voice guide (§3 table format).
3. **A6 early lines:** `slender.*` or `wi.replyDialogue` persona (2× gainStance bands), `wi.bodyClause` stageMax 3 (1), `eat.firstBite` corruption 0 (1).
4. Per-girl lines in: `wi.breakLine` (1), `wi.arrival` persona (2×2 stage bands), `eat.firstBite` persona (2), diary base (3 across corruption).
5. `npm run text:lint` clean → `npm run build`.

### New campus locale checklist

1. Register `campusLocale` key via `registerDimension()` if new.
2. Navigation pool (`campus.moveSentence` + locale-keyed `campus.destination`) — 8+ entries across stage range.
3. Spatial observation (`campus.spaceObs`) — 5+ entries.
4. NPC presence (`npc.bystander` + locale `when`) — 5+ entries.
5. `npm run text:lint` clean → `npm run build`.

### Lint tooling

- `npm run text:lint` — static + dynamic sweep (required clean).
- `npm run text:lint -- --sample=500 --scene=wi` — combinatorial sampling with trigram/length checks.
- `npm run text:lint -- --coverage` — pool × stage matrix for stages 8-11 gaps.
