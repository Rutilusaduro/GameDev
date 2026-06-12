# Modular Text System — Design Document

> **Status:** Foundational system, v1. On the same tier as the weight-gain model and the girls' state machines — every new narrative feature should build on this.

---

## 1. Overview & Motivation

Narrative prose in the game previously lived in eight or so ad-hoc patterns: corruption-tier-indexed arrays, archetype dictionaries, `[stageGroup][fullnessGroup]` grids, per-student dialogue dicts, hardcoded coda appends. Each new feature reinvented variant selection from scratch, and no pattern could react to more than one or two variables at once.

The **Modular Text System** replaces all of that with one idea: prose is assembled from **independent, swappable modules**. Each module selects its variant from game state — weight stage, corruption tier, relationship tier, body type, season, relative size against a reference character, skill effects — and modules combine naturally inside tagged templates.

Granularity is a dial, not a choice:

- **Scene level** — a whole multi-sentence narration (`HIVE_INTAKE_TEMPLATE`)
- **Phrase level** — a clause or sentence (`{sizeCompare}`, `{char.desc}`)
- **Word level** — a single descriptor (`{word.size}` → `slight` → `slim` → `soft` → `chubby` → `plump` → `heavy` → `fat` → `veryFat` → `enormous` → `colossal` → `blob`)

One template can react along every axis at once. That is the entire system.

---

## 2. Core Principles

1. **Modules over monoliths.** Never write a 16-cell text grid again. Write variants with `when` selectors and let the engine choose.
2. **Selector-driven variants.** A variant declares the conditions under which it applies; the engine picks the *most specific* match and randomizes among ties.
3. **Relative description.** Size is always describable relative to a reference character (`ctx.ref`). "Much larger than Lilith" is a first-class concept, not a hand-written special case.
4. **Graceful degradation.** The engine never throws. Unknown module → empty string + dev warning. No matching variant → wildcard fallback. Missing fields → sensible defaults. Bad text is a bug; a crashed render is unacceptable.
5. **Composition.** Module output may itself contain slots; the engine resolves recursively (depth-capped). Small modules build big scenes.

---

## 3. Template Grammar Reference

A template is a plain string containing **slots**:

| Syntax | Meaning |
|---|---|
| `{name}` | Invoke module `name` with the current context |
| `{name:ref}` | Retarget: the module describes `ctx.ref` instead of `ctx.subject` (their derived dims swap) |
| `{name:group}` | Retarget onto the group (first member is the proxy for derived dims) |
| `{name:foo}` | Any other arg is passed through as `ctx.arg` for module functions to read |
| `{name\|filter}` | Apply filters left-to-right after resolution |
| `{{` | Literal `{` |

Module keys are **flat registry strings** — `word.size` is the literal key `"word.size"`; dots are a naming convention, not object traversal.

### Filters

| Filter | Effect |
|---|---|
| `cap` | Capitalize first letter |
| `lower` | Lowercase everything |
| `a` | Prepend `a `/`an ` (vowel heuristic) |
| `prefix:X` | Prepend `X` **only if** output is non-empty |
| `suffix:X` | Append `X` **only if** output is non-empty |

`prefix:`/`suffix:` are the tool for optional clauses — `{talk.coda|prefix: }` adds a leading space only when a coda actually fired, so empty output leaves no stray punctuation.

### Smoothing pass

After resolution, `render` automatically: collapses runs of spaces, removes space before punctuation, fixes `..` artifacts, and capitalizes the first letter after `. ` and at string start. Opt out with `render(tpl, ctx, { noSmooth: true })` when the rule would mangle intentional lowercase.

### Recursion

Module output is re-scanned for slots and resolved with the same context, up to **depth 5**. Beyond that, leftover slots are stripped (with a dev warning) — a self-referencing module terminates instead of hanging.

---

## 4. Context API

`createContext(raw)` normalizes inputs and derives all selector dimensions **once**:

```js
import { createContext, render } from './textEngine/engine.js';

const ctx = createContext({
  subject: student,        // focal character (any student-like object with lbs etc.)
  ref: lilith,             // reference character for relative comparisons (optional)
  group: victims,          // array of characters (optional)
  week: 7,                 // drives season unless `season` passed explicitly
  skillEffects: effects,   // flat flags object from the skill system
  globals: { adminScrutiny }, // grab-bag for anything else
});
```

The derived block (`ctx.d`) is what selectors match against:

| Field | Source |
|---|---|
| `stage` | `getStage(subject.lbs).id` — 0..10 |
| `corruption` | `getCorruptionTier(subject.corruption).id` — 0..2 |
| `relationship` | `getTier(subject.relationship).id` — 0..3 |
| `bodyType`, `archetype`, `mood`, `evolvedForm` | straight off the subject |
| `relSize` | `relSize(subject, ref)` — see §5; `null` without a ref |
| `refStage` | ref's weight stage, `null` without a ref |
| `fullnessRatio` | `fullness / stomachCapacity` |

`ctx.season` is derived from week in **4-week cycles**: weeks 1–4 fall, 5–8 winter, 9–12 spring, 13–16 summer, then repeating.

---

## 5. Selector Reference

A module is registered as a list of variants:

```js
registerModule("talk.coda", [
  { when: { corruption: [2], skill: "brokenMind" }, priority: 1, text: [...] },
  { when: { corruption: [1, 2], skill: "internalizedRole" },     text: [...] },
  { when: {}, text: "" },   // wildcard fallback — ALWAYS provide one
]);
```

### `when` keys

| Key | Matches against | Notes |
|---|---|---|
| `corruption` | `d.corruption` | value or array (array = OR) |
| `stage` | `d.stage` | value or array |
| `stageMin` / `stageMax` | `d.stage` | range; the pair counts as ONE condition for scoring |
| `relationship` | `d.relationship` | value or array |
| `relSize` | `d.relSize` | `much_smaller \| smaller \| similar \| larger \| much_larger` |
| `bodyType` / `archetype` / `mood` / `evolvedForm` | `d.*` | value or array |
| `refStage` | `d.refStage` | value or array; `null` matches "no ref" |
| `season` | `ctx.season` | value or array |
| `skill` | `ctx.skillEffects[v]` truthy | single flag name |
| `weekMin` / `weekMax` | `ctx.week` | range (counts as one condition) |
| `studentId` | `d.studentId` (falls back to `ctx.globals.studentId`) | value or array — per-girl variants |
| `lastCompound` | `d.lastCompound` | pharmacist compound id active on the subject |
| `bigScale` | `ctx.globals.bigScale` | boolean — industrial scale in play |

Any unlisted key is looked up on `ctx.d` directly, so new derived dimensions work without engine changes.

### Resolution algorithm — `'best'` mode (default, `registerModule`)

1. **Filter:** keep variants whose *every* condition matches. Missing key = wildcard.
2. **Score:** +1 per satisfied condition key (a min/max range pair counts once). More conditions = more specific = wins.
3. **Tie-break:** higher `priority` (integer, default 0) wins among equal scores. **This is the escape hatch** when flat scoring picks the "wrong" equally-specific variant — e.g. the broken register beating the submissive register at corruption tier 2 when the character qualifies for both.
4. **Randomize:** all texts from the surviving tied variants are pooled and one is picked (weighted by `variant.weight`, default 1 — so without weights this is a uniform pick).
5. **Fallback:** zero matches → empty-`when` variant if present → else `""` (never a crash).

### Resolution algorithm — `'pool'` mode (`registerPool`, **default for new content**)

`registerPool(key, variants)` (or `registerModule(key, variants, { select: 'pool' })`) makes **every** matching variant RNG-eligible instead of only the most specific:

1. **Filter** as above, then **priority-gate**: only variants at the max `priority` among matches survive (priority is a hard suppressor here, not a tie-break).
2. **Weighted pick at the variant level:** `w = (variant.weight ?? 1) * poolBase**score` with `poolBase = 3` (override via `opts.poolBase`). A two-condition variant outweighs a wildcard 9:1 — specific flavor usually wins, generic lines surface as spice. `weight: 0` parks a variant without deleting it.
3. One text is then picked uniformly from the chosen variant's array.

Because generic variants can fire in any context, pool-mode generic fragments must be **tone-neutral** (see `src/textEngine/AUTHORING.md`).

### The `{join:...}` meta-slot

`{join:wi.bodyClause,wi.faceClause|prefix:, }` resolves each comma-listed module, drops empty results, and glues the survivors with commas plus a final "and" ("X", "X and Y", "X, Y, and Z"). Filters apply to the joined result, so the `|prefix:, ` idiom makes an entire clause group optional with correct punctuation. `join` is reserved — it cannot be registered as a module, and `:ref` retargeting is not available inside it.

### `text` forms

`text` may be a string, a `(ctx) => string` function, or an **array** of either (the array is the random pool). Strings and function outputs may contain slots — they resolve recursively.

### Relative size buckets

`relSize(subject, ref)` buckets the lbs ratio:

| Bucket | Ratio |
|---|---|
| `much_smaller` | < 0.6 |
| `smaller` | < 0.85 |
| `similar` | ≤ 1.18 |
| `larger` | ≤ 1.67 |
| `much_larger` | > 1.67 |

### Stage buckets (lexicon granularity)

`stageBucket(stageId)` returns one key per `WEIGHT_STAGES` id in `stages.js`: `slight` (0) · `slim` (1) · `soft` (2) · `chubby` (3) · `plump` (4) · `heavy` (5) · `fat` (6) · `veryFat` (7) · `enormous` (8) · `colossal` (9) · `blob` (10).

---

## 6. Authoring Guide — the Lilith Example, End to End

The canonical scene: Lilith leads new bodies into Maya's Central Nest.

**Template** (`src/textEngine/scenes/hiveIntake.js`):

```js
export const HIVE_INTAKE_TEMPLATE =
  "Lilith leads {group.desc} into the Central Nest. {char.desc:ref|cap}. " +
  "{sizeCompare|cap}, {bodyType.desc}, {clothing.desc}. " +
  "{hive.mayaWatches|cap}";
```

**How each slot reacts:**

| Slot | Reacts to |
|---|---|
| `{group.desc}` | group size + average weight stage |
| `{char.desc:ref}` | **Lilith's** size + corruption (the `:ref` retarget) |
| `{sizeCompare}` | victims' size *relative to Lilith* (`relSize` buckets) |
| `{bodyType.desc}` | victim body type × stage (via `{word.body}`) |
| `{clothing.desc}` | **season** × stage (via `{word.clothingFit}`) |
| `{hive.mayaWatches}` | scene-local module, varies freely |

**Calling it:**

```js
import { renderHiveIntake } from './textEngine/scenes/hiveIntake.js';
const text = renderHiveIntake(lilithStudent, victimArray, week);
```

Tiny Lilith + huge victims + winter produces "Her small frame nearly disappears between the heavy bodies she's guiding… thick winter layers stretched tight…"; colossal Lilith + thin victims + summer produces "Her massive form moves with slow, deliberate weight… summer clothes hanging loosely on narrow frames…" — *same template, zero branching in the caller.*

---

## 7. Lexicon Extension Guide

There are two distinct paths, and choosing the right one matters.

### Path A — growing the **core lexicon** (`src/textEngine/lexicon.js`)

For vocabulary that is **universally useful** (anything describing bodies, movement, fullness, clothing in general):

- **Add words to an existing bucket:** append to the arrays in `SIZE_WORDS`, `MOVEMENT_WORDS`, etc. More words = more variety for every consumer, instantly.
- **Grammatical-shape rule:** every entry within one dictionary must share grammatical function (all bare adjectives, or all verb phrases that follow a subject, or all noun phrases). A full clause hiding in a verb slot ("ripples in place — the room arranges itself around her") breaks every template that composes around it. If you want the atmospheric clause, put it in a phrase-level module variant, not the lexicon.
- **Add a row:** new bodyType in the game? Add its row to `BODY_WORDS` (the `default` row covers it until you do).
- **Add a whole dictionary:** new universal axis (skin descriptions, breathing, voice tone…)? Add the dictionary + a `registerModule("word.<name>", ...)` block at the bottom of lexicon.js. Follow the existing `byBucket` pattern.

### Path B — **context-specific lexicons** (scene-local)

For vocabulary that only makes sense inside one event or feature — e.g. a pool-party event needs swimwear references that would be noise everywhere else:

```js
// src/textEngine/scenes/poolParty.js
import { registerModule, stageBucket, pick } from '../engine.js';

const SWIM_FIT = {
  summer: {
    slight: ["a bikini with room to spare"],
    plump:  ["a one-piece negotiating with every curve"],
    fat:    ["a custom suit, straining anyway"],
    // ...
  },
};

registerModule("swim.fit", [{
  when: {},
  text: (ctx) => pick(SWIM_FIT[ctx.season]?.[stageBucket(ctx.d.stage)] || ["a swimsuit"]),
}]);

export const POOL_INTRO_TEMPLATE = "{char.desc|cap} arrives at the pool in {swim.fit}. ...";
```

The scene file registers its own lexicon on import and exports its templates. The vocabulary is namespaced (`swim.*`), invisible to other scenes, and lives next to the only templates that use it.

**Promotion rule:** when a second, unrelated scene wants the same vocabulary, promote it from the scene file into `lexicon.js` under `word.*`. Until then, keep it local.

### Namespacing convention

| Prefix | Meaning | Lives in |
|---|---|---|
| `word.*` | Core, universal descriptors | `lexicon.js` |
| `char.* / sizeCompare / group.* / clothing.* / bodyType.*` | Core phrase modules | `modules.js` |
| `talk.* / hive.* / swim.* / <feature>.*` | Scene/feature-local | `scenes/<feature>.js` |

One registry, so collisions are possible — the prefix discipline is what prevents them. Re-registering a key overwrites and warns in dev.

---

## 8. Integration Patterns

### Per-feature scene files

Every sub-feature gets **its own file** under `src/textEngine/scenes/` — never a monolithic scenes file. A scene file:

1. imports the engine (and `../modules.js` if it uses core phrase modules),
2. registers its scene-local modules at import time,
3. exports its template constants and/or a `renderX(...)` convenience wrapper.

### From game logic (gameData / ProfessorSim)

Call the scene's wrapper and push the string wherever it goes (event log, hive log, popup):

```js
const text = renderHiveIntake(lilith, victims, week);
log.push({ tag, text, type: "scene" });
```

Keep `gameData/*.js` files engine-free where possible — render at the call site (ProfessorSim or the view), not inside pure state-transition functions.

### From React components

```js
const ctx = createContext({ subject: student, week, skillEffects });
const coda = render("{talk.coda|prefix: }", ctx);
return base + coda;   // coda is "" when no register applies — prefix filter eats the space
```

### Skill-tree reconciliation

This is how willingness/corruption skill mechanics express themselves in text: skills set flags in `skillEffects`, variants select on `skill:` + `corruption:`, and prose escalates automatically as both progress. No `if (skillEffects.x && tier >= 2)` chains in components — the selector table *is* the design.

---

## 9. Migration Guide — legacy patterns → engine

| Legacy pattern | Example | Engine equivalent |
|---|---|---|
| Tier-indexed arrays | `CORRUPTION_FEED_LINES[tier]` | One module, variants with `when: { corruption: [n] }` |
| Archetype dicts | `THIN_JEALOUSY[archetype]` | Variants with `when: { archetype: "x" }` + wildcard default |
| 2D grids | `DINNER_ENDING_TEXT[stGrp][fullGrp]` | Variants combining `stageMin/Max` + a fullness dimension |
| Per-student dicts | `TAP_OUT_DIALOGUE[s.id]` | Variants keyed on a `studentId` derived dim (add to `ctx.d` when migrating) |
| Conditional coda appends | TalkModal's old if/else chain | `{x.coda\|prefix: }` with selector variants + `priority` (already done) |
| `(s) => string` content fns | everywhere | Reused as-is: `text: (ctx) => oldFn(ctx.subject)` — migration is mostly mechanical |

Migrate opportunistically: when touching a feature, move its text into a scene file. Don't big-bang it.

---

## 10. Dev Harness

- **DebugPanel → TEXT ENGINE section:** renders the hive intake scene across a sweep of (Lilith stage × victim stage × corruption × season) synthetic inputs — eyeball variant coverage and check no `{unresolved}` slots leak.
- **Console:** `window.__textEngine` exposes `{ render, createContext, getSeason, relSize }` in dev builds for live experimentation.

---

## 11. Non-Goals (v1)

- **No pronoun/verb agreement system** — all current characters are she/her; revisit if that changes.
- **No localization** — English-only authoring.
- **No seeded RNG** — `pick()` is `Math.random()`; if reproducible text is ever needed (tests, replays), thread a RNG through `render` opts.
- **No grammar beyond the `a/an` filter and smoothing pass** — authors write fragments that read correctly in their slot positions.

## 12. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Smoothing mangles intentional lowercase | Rule is minimal (only after `. `); `noSmooth` opt-out |
| Flat specificity scoring picks "wrong" tie | `priority` tiebreaker — use it deliberately, document in the variant |
| Registry key collisions | Namespacing convention (§7); dev warning on re-register |
| Recursion cycles | Depth-5 cap, strip + warn |
| `rnd` confusion | Engine exports `pick(arr)`; `gameHelpers.rnd(a,b)` is an int-range — never mix |
