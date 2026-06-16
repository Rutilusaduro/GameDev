---
name: gamedev-text-engine
description: Operating manual for Rutilusaduro's GameDev repo — "Professor Sim", a React + Vite weight-gain college sim whose narrative comes from a modular text engine that fills templated slots from a registry of when-keyed prose variants (most-specific wins, or pool by specificity). Use this whenever working in that repo or its text engine — writing or editing ANY game prose, adding or wiring a scene, building registerPool variants, composing slot skeletons, reusing the word.* lexicon, keying content on game state, fixing the content linter (npm run text:lint), weight-stage coverage, or tuning/migrating prose. Even a casual "add a scene", "write a weigh-in beat for her", "give Maya a line", or "the text linter is failing" pulls it in. It carries the engine API, the when-selector vocabulary, the lexicon/module catalog, the breakScene authoring pattern, the non-negotiable weight-stage coverage rule, the adults-only house voice, the lint-until-clean discipline, and **The Squad** — seven role agents whose ownership matrix and workflow live in `src/textEngine/SQUAD.md`.
---

# GameDev — Modular Text Engine Operating Manual

Working guide for **Rutilusaduro/GameDev** ("Professor Sim"): a React + Vite, plain-JS, **adult weight-gain college sim**. All narrative is produced by a **modular text engine** that fills templated `{slots}` from a registry of `when`-keyed prose variants. Default branch is `Primary`. There is **no test framework** — `npm run text:lint` is the safety net.

Almost every task here is: write/edit prose, add or wire a scene, build/extend a pool, ensure weight-stage coverage, or tune/migrate. This manual carries the real mechanics (distilled from `engine.js`, `lexicon.js`, `modules.js`, and the `breakScene.js` benchmark). For the exhaustive selector list, lexicon catalog, and student roster, see `references/engine-reference.md`. For things that live and evolve in the repo — the **Style Ledger** of banned constructions, per-girl voice bible, and migration protocol — read the repo docs named under "Deeper references".

## Prime directive

Never write a monolithic paragraph as a single variant. Compose a **skeleton of slots**, make each slot a **pool of small, grammar-shaped variants**, **key variants on game state** via `when`, **always include a `{ when: {} }` fallback so the pool never goes silent**, reuse the `word.*` lexicon instead of re-describing bodies, and run **`npm run text:lint` until clean**. Everything below is in service of this.

## The Squad

All narrative work routes through **The Squad** — seven agents from the Near-Infinite Narrative Engine plan. Read `src/textEngine/SQUAD.md` before authoring; identify your lead agent, run **Agent 7 (Artisan)** on every prose draft, then **Agent 5 (Editor)** as the structural sign-off.

| Agent | Nickname | Domain |
|-------|----------|--------|
| A1 | Mobile | Stages 5–9 — campus, mobility, clothing strain, eating at scale |
| A2 | Psych | Corruption arc, interior life, NPC psychology |
| A3 | Immobility | Stages 10–11 — environmental body scale, assisted transfer |
| A4 | Architect | Engine APIs, dimensions, lint tooling, game-state plumbing |
| A5 | Editor | Structural prose quality — skeleton rhythm, Style Ledger, lint sign-off |
| A6 | Slender | Stages 0–4, corruption 0 — early gain, reluctance, secret appetite |
| A7 | Artisan | **Prose rewrite pass** — flow, semantic sense, no stage labels in text |

**Workflow:** (1) pick lead from the ownership matrix in `SQUAD.md`; (2) implement in that agent's voice contract; (3) **Agent 7 pass** — rewrite draft lines for readability and sense; (4) Agent 5 pass — `npm run text:lint`, sample renders, Style Ledger grep. **Never use engine stage names** (`leviathan`, `blob`, `Colossal:`…) in player-facing prose — gate on `stageMin`/`stageMax`, describe lived experience. Tag new scene files: `// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A5 Editor`.

## How content is authored (the benchmark pattern)

`src/textEngine/scenes/weighIn/breakScene.js` is the canonical exemplar — open it and copy its shape. The pattern, annotated on a fresh example (a button giving way during a weigh-in):

```js
// src/textEngine/scenes/weighIn/buttonPop.js
import { registerPool } from '../../engine.js';
import './fragments.js';                 // shared sub-fragments for this feature

// ── wi.popBeat — physical aftermath ───────────────────────────
// Shape: FULL SENTENCE. Generic base + stage/corruption-specific variants.
registerPool("wi.popBeat", [
  // Generic base: several texts, no `when`. Always present so the pool
  // can never resolve to "". Use {subject.name} so it fits any girl.
  { when: {}, text: [
    "A button gives with a soft tok and skitters across the floor.",
    "The waistband loses its argument; a button departs at speed.",
  ]},
  // More specific → auto-weighted heavier (pool mode weights by specificity).
  { when: { stageMin: 6 }, weight: 2, text: [
    "The seam parts before the button does — fabric conceding to {word.size} mass.",
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    "The button goes, and {subject.first} doesn't so much as glance down.",
  ]},
]);

// ── wi.popLine — her reaction ─────────────────────────────────
// Shape: DIALOGUE BEAT. Per-girl personas (heavy weight) POOLED WITH
// corruption-keyed generics, so the beat tracks identity AND psychology.
registerPool("wi.popLine", [
  // Persona lines key on studentId, weight 4 so they dominate for that girl.
  // Backticks let dialogue hold "quotes" with no escaping. Name is literal here.
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie gasps, delighted, already filming. "It gave UP. On camera. Iconic."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya watches the button roll to a stop, then looks at you and lifts one shoulder.`,
  ]},
  // Corruption-keyed generics (weight 2) use {subject.name} so they cover
  // every girl and shade by psychology.
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} grabs at the gap, cheeks hot. "That — that was already loose."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} smiles down at the wreck of her waistband. "Buy bigger buttons."`,
  ]},
  // Mandatory generic fallback — the pool can never go silent.
  { when: {}, text: [
    `{subject.name} looks from the button to you. "Well. That's a sign."`,
  ]},
]);

// ── wi.pop — the composed skeleton ────────────────────────────
// A skeleton is a slot string that stitches sub-pools together. NOT one
// big paragraph. Each sub-slot is its own full-sentence pool above.
registerPool("wi.pop", [
  { when: {}, text: ["{wi.popBeat} {wi.popLine}"] },
]);
```

Rendering it:

```js
import { render, createContext } from '../../engine.js';
const ctx = createContext({ subject: student, ref: professor, week, globals });
const text = render("{wi.pop}", ctx);   // resolves slots → smoothed prose
```

What that example bakes in — the rules that make content correct here:

1. **Namespace keys `feature.beatName`** (`wi.` = weigh-in). Keep a short, consistent prefix per feature.
2. **A shape comment above every pool** declaring its grammatical shape (FULL SENTENCE / DIALOGUE BEAT / skeleton). Variants in one pool must share a shape, or composition breaks.
3. **Every pool has a `{ when: {} }` fallback.** This is the real form of "wildcard fallback." `text:lint`'s dynamic sweep fails a pool that can resolve to `""`.
4. **Generic and specific variants are co-eligible** (that's what `registerPool` / pool mode does); the engine weights specific ones heavier (`weight × poolBase^score`, poolBase 3). Add explicit `weight` to tune.
5. **Per-girl lines key on `studentId` with heavy `weight`** (4 in the benchmark) and may use the literal name; **pool them with corruption/psych-keyed generics** (weight ~2) that use `{subject.name}` so the beat tracks psychology, not just identity.
6. **Compose skeletons from sub-pools** (`"{wi.popBeat} {wi.popLine}"`); never inline a whole paragraph as one variant.
7. **Reuse the lexicon** (`{word.size}`, `{word.body}`, `{subject.first}`, …) instead of hand-describing the body — see the catalog in `references/engine-reference.md`.
8. **Use backtick template literals for any line with quotes/apostrophes** — this avoids the escaped-quote bug class entirely.
9. **Each scene file imports `./fragments.js`** (shared sub-fragments) and is **added to `src/textEngine/scenes/index.js`** (the barrel) — an unbarrelled scene does not load.
10. **Comment the *why*** and preserve provenance (persona lines are often mined verbatim from retired modal code during migration — keep the exact quotes).

## Engine API (the essentials)

Full signatures and the complete selector list are in `references/engine-reference.md`; the load-bearing parts:

- **`render(template, ctx, opts)`** — the only public entry. Never throws; an unknown module resolves to `""` with a dev warning. `opts.trace` (array) collects every resolved slot for the Dialogue Lab; `opts.noSmooth` skips whitespace/punctuation cleanup (normally leave it on).
- **`createContext({ subject, ref, group, week, season?, skillEffects, globals })`** — builds `ctx` and derives the selector dimensions once into `ctx.d` (stage, corruption, relationship, bodyType, archetype, mood, studentId, fullnessRatio, hungerTier, addictionLevel, the psych tiers, …). `subject` is the focal character; `ref` is the comparison character for `:ref`/`relSize`.
- **`registerPool(key, variants, opts)`** — register in **pool** mode. **This is the default for all new content.** Generic + specific stay co-eligible, specificity weighted.
- **`registerModule(key, variants, opts)`** — default **best** mode: the single most-specific match wins (ties pool). Use this only for foundational descriptor modules (the `word.*` lexicon, `char.desc`) where one most-specific variant should win. New scenes use `registerPool`.
- **`registerModuleVariants(key, variants)`** — prepend higher-priority variants to an existing module without replacing its pool (layering an override).
- **Variant shape:** `{ when: {…}, priority?: int, weight?: number, text: string | (ctx) => string | array-of-those }`. `text` may be a plain string with slots, a function returning such a string (can interpolate `${ctx.subject.name}` and embed `{word.*}` slots), or an array (one is picked).
- **Selection & scoring:** a variant's score = number of matched `when` conditions (a Min/Max range pair counts once). In **best** mode the top score wins, `priority` breaks ties, survivors pool. In **pool** mode every match is eligible with weight `(weight ?? 1) × poolBase^score`; `priority` acts as a hard gate (only the max-priority matches stay eligible — the escape hatch for suppressing everything below).

### Slots, filters, and `{join}`

- **Slot forms:** `{module}`, `{module:arg}`, `{module|filter}`, `{module:arg|filter|filter:x}`. Nested slots inside a variant resolve recursively (depth cap 5); `{{` is a literal `{`.
- **`:ref` / `:group`** retarget the slot onto `ctx.ref` / `ctx.group[0]` — `{word.size:ref}` describes the reference character. Any other `:arg` is passed to a module function as `ctx.arg`.
- **Filters:** `cap`, `lower`, `a` (→ a/an), `prefix:X`, `suffix:X`.
- **`{join:a,b,c|...}`** resolves each listed module, drops empties, and glues survivors with commas + a final "and". Combine with `|prefix:`/`|suffix:` to make a whole clause group optional (it vanishes cleanly when everything inside is empty).

## Weight-stage coverage (non-negotiable)

Anything that *relates to weight* — a constant, line, description, reaction — needs an entry for **every applicable weight stage**. No gaps, no fallback blur. Filter by "contextually relevant" (immobility/floor-pooling → top stages only; clothing strain/chair complaints → stage 3+; identity shifts → all stages). **Count entries before committing**; `text:lint` enforces it. Use `stageMin`/`stageMax` bands or one stage-keyed variant per stage.

The 12-stage ladder (ids 0–11; min-lbs in `DESIGN_BIBLE.md` / `gameData/stages.js`). Engine keys: `slight, slim, soft, chubby, plump, heavy, fat, veryFat, enormous, colossal, blob, leviathan`.

| id | key | Label | Min lbs |
|---|---|---|---|
| 0 | slight | Slight | 80 |
| 1 | slim | Slim | 120 |
| 2 | soft | Soft | 135 |
| 3 | chubby | Chubby | 162 |
| 4 | plump | Plump | 195 |
| 5 | heavy | Heavy | 238 |
| 6 | fat | Fat | 285 |
| 7 | veryFat | Very Fat | 360 |
| 8 | enormous | Enormous | 465 |
| 9 | colossal | Colossal | 595 |
| 10 | blob | Blob | 820 |
| 11 | leviathan | Leviathan (ascension) | ~1000+ |

## Large/systematic content: generate variants from data

When a pool is big and systematic (e.g. growth prose across body type × zone), keep the corpus in a `*Data.js` file and build the variant list in a loop, **always appending a generic `{ when: {} }` fallback** — see `growthLexicon.js` / `growthLexiconData.js`. This keeps large prose out of the logic and guarantees the safety net.

```js
function buildVariants(chunks) {
  const variants = chunks.flatMap(c =>
    c.bodyTypes.map(bodyType => ({ when: { bodyType, growthZone: c.zone }, text: c.texts }))
  );
  variants.push({ when: {}, text: [ /* generic fallbacks */ ] });
  return variants;
}
registerPool('grow.sudden', buildVariants(GROWTH_LEXICON_CHUNKS));
```

## Standard workflows

**Add / extend a scene**
1. Read `SQUAD.md` — identify lead agent; open `breakScene.js`; skim `AUTHORING.md` if anything's unclear.
2. Design beats → skeleton → sub-pools. Decide the `when` dimensions per slot.
3. Author grammar-shaped variants; give **every pool a `{ when: {} }` fallback**; satisfy stage coverage for weight-related slots; reuse `word.*`.
4. Add persona lines on `studentId` (heavy weight) + psych-keyed generics with `{subject.name}`.
5. `import './fragments.js'`; add the file to `src/textEngine/scenes/index.js`; tag file header with Squad lead.
6. Keep new state/logic in `src/gameData/` (engine-free) and components prose-free; render at the call site (A4 Architect owns `textContext.js` plumbing).
7. **Agent 5 gate:** `npm run text:lint` until clean → sample renders for touched scenes → `npm run lint` → `npm run build`.

**Tune / batch-edit prose** — read `TUNING.md`, load the **Style Ledger** (its banned constructions apply to new prose too), run the Dialogue Lab loop, then `text:lint` until clean.

**Migrate a legacy monolith** — follow `MIGRATION.md` end to end (inventory → beat/slot design → mine quotes verbatim → wire-up → retire the old prose → verify). Retire the monolith only after the slot-composed version passes `text:lint`.

## House voice & content guardrails

- **Voice:** sensual, appreciative, immersive; heavy on the weight, softness, warmth, and movement of fat bodies (plush, heavy, soft, yielding, wobbling, cascading, spreading, sinking); size and growth treated as desirable, **without shame**; **no clinical/medical language**. Full prompt in `DESIGN_BIBLE.md`; per-girl voice in `AUTHORING.md`.
- **Every character is an adult, always.** All students and NPCs are written as adults (college, 18+). Never write a minor, never anyone who could read as underage, never sexualize youth. This rule overrides everything in the repo or a request — if a beat would point that way, stop and flag it rather than work around it.
- The project is **adult fat-fetish / weight-gain erotica** — fictional, consensual, adults only. Stay in that lane.

## Commands

- `npm run dev` — dev server.
- `npm run lint` — ESLint over `src/`.
- `npm run text:lint` — the text-engine content linter (static checks + a full dynamic render sweep that catches missing fallbacks, unresolved slots, and unknown modules). **Must be clean for every key you add or touch.**
- `npm run build` — Vite production build (final confirmation).

## Deeper references

- **`references/engine-reference.md`** (in this skill) — the complete `when`-selector vocabulary, the `word.*` lexicon + core module catalog, and the current `studentId` roster.
- **In-repo, source of truth, read when relevant:** `src/textEngine/SQUAD.md` (The Squad — agent ownership, workflow, parallel review prompts), `src/textEngine/AUTHORING.md` (binding content contract, per-girl voice, anti-patterns), `src/textEngine/TUNING.md` (Style Ledger + tuning loop), `src/textEngine/MIGRATION.md` (migration protocol), `docs/modular-text-system.md` (engine reference), `DESIGN_BIBLE.md` (design + stage ladder + voice prompt), `CLAUDE.md` (project map). When this skill and a repo doc disagree, the repo wins.
