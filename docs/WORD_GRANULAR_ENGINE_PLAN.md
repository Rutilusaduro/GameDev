# Word-Granular Text Engine — Upgrade Plan

**Status:** all phases implemented and pushed (2026-07). Phases 1–5:
engine + lint complete. Phase 6: framework done across every family —
talk.checkIn decomposition, body.portrait monolith retired (16.8%→0.3%
triples), hunger-interrupt tone facts, campus.seenBeat, enc. tracking,
irregular stem folds; full-sweep triple rate 0.90%, gate at the 1%
target. Phase 7: engine core is game-free behind registerSubjectDeriver;
Professor Sim's setting pack lives in gameData/textContext.js per §8.
Ongoing (by design, forever): authoring more variants into pools and
decomposing remaining legacy sentence pools as they're touched — §6 is
the standing checklist for that work.
**Audience:** any competent model or developer. Every phase names its files, its
exact API changes, and a runnable verification step. If you can edit JS and run
`npm run text:lint`, you can execute this plan.
**Scope decision (owner-approved):** upgrade the existing engine in-place with
portable conventions; word pools + coherence layer (no full NLG grammar);
garment-state runtime model for clothing; this document is the deliverable,
implementation happens in later sessions.

How to use this document: read §1–§4 once for the design, then execute §5
phase by phase. Each phase is independently shippable and ends with a
verification command. Do not start phase N+1 until phase N's "done when"
line passes. §6 is the standing checklist for anyone authoring content
against the upgraded engine. §8 lists what a project other than Professor Sim
must supply to reuse the system.

---

## 1. Goal and non-goals

**Goal.** Move the engine's unit of variation from the sentence down to the
word. A rendered beat should be assembled from word-grain pools — verb,
adjective, adverbial, noun phrase — where every word choice can react to the
character's body, outfit, personality, psychology, and to the *other words
already chosen in the same passage*. Concretely, three coherence guarantees:

1. **No repeats** — the same salient word (or its stem) does not appear twice
   in one rendered passage, even when two different pools both know it.
2. **No contradictions** — if an early sentence establishes a fact ("the
   button is gone", "she is seated"), later slots in the same scene cannot
   select text that assumes the opposite.
3. **Grammatical fit** — a/an, plural, tense, and pronoun agreement are the
   engine's job, so one lexicon entry serves many grammatical positions.

**Non-goals.**

- No syntax-tree NLG, no POS tagger, no grammar formalism. Authors still write
  plain English fragments with declared shapes; the engine composes and
  arbitrates. (Rejected because a grammar engine multiplies authoring cost for
  every future contributor and replaces a working resolver.)
- No rewrite of existing content. Every change below is additive; all current
  pools keep working unmodified.
- No LLM-at-runtime generation. The lexicon is authored, deterministic data.
- Extraction into a published package is deferred (§5 Phase 7 sketches it).

---

## 2. Baseline: what the engine already has

Read `src/textEngine/engine.js` (570 lines) before touching anything. The
upgrade builds on five existing mechanisms; do not duplicate them.

| Capability | Where it lives today | Gap this plan closes |
|---|---|---|
| `when`-keyed variant pools, specificity weighting | `registerPool` / `evalWhen`, `engine.js:251-458` | none — this is the foundation |
| Anti-repetition | `sessionUsed`/`weekUsed` Sets, repeat multipliers `engine.js:21-46` | tracks whole variant texts, not words — two pools can both say "heavy" in one paragraph |
| Contradiction control | `consumes` / `requireAbsent` boolean flags, `engine.js:393-401` | booleans only, no values, no "asserting X blocks not-X" semantics, flags die with the context object |
| Word-grain pools | `src/textEngine/lexicon/adverbs.js`, `compounds.js`, `moveVerbs.js` | exist for adverbs/verbs only; no dedupe between them, no shared grammar contract doc |
| Grammar filters | `cap`, `lower`, `a`, `prefix:`, `suffix:` (`engine.js:472-483`) | no plural, tense, or pronoun support |
| Clothing text | `word.clothingFit` keyed on season × stage (`lexicon.js`) | static dictionary; no garment state, no intra-scene continuity after a seam fails |
| Personality/psych keys | `corruption`, `mood`, psych tiers in `ctx.d` | works, but nothing forces word pools to use them; convention needed, not mechanism |
| Lint harness | `scripts/textLint.mjs` (static checks + dynamic render sweeps) | no word-repeat sweep, no contradiction check, no garment coverage rule |

---

## 3. Architecture

Six layers. L0 exists; L1 partially exists; L2–L5 are this plan.

```
L5  Tooling         textLint rules per layer; sample-render sweeps
L4  Setting pack    project-supplied dimensions, ladders, lexicon data (§8)
L3  Character       trait axes + outfit/garment state → derived dimensions
L2  Coherence       fact ledger · stem dedupe · morphology filters
L1  Lexicon grain   POS-shaped word pools with declared shapes and tags
L0  Core resolver   slots, when-selectors, pools, weighting  (exists, unchanged)
```

The composition model: a beat is a **skeleton** of slots; each slot is either a
sub-sentence pool (today's pattern) or a **word slot** (`word.*` pool whose
variants are single words or short phrases with a declared grammatical shape).
The coherence layer sits inside variant selection: before the weighted pick,
candidates that repeat a used stem or contradict a ledger fact are
down-weighted to near zero or filtered out entirely.

Order of resolution matters and is the contradiction-resolution rule: slots
resolve left to right, depth first (`resolveText`, `engine.js:516`). The first
slot to assert a fact wins; later candidates that would contradict it become
ineligible. Authors exploit this deliberately — put the fact-establishing beat
first in the skeleton.

### 3.1 Extended variant shape

Today: `{ when, priority?, weight?, text, consumes?, requireAbsent? }`.
After Phase 1–2, four optional fields are added. All are backward compatible;
a variant using none of them behaves exactly as today.

```js
{
  when: { … },
  weight: 2,
  text: ["plush", "yielding"],

  // NEW — coherence fields (all optional):
  tags: ["soft"],               // dedupe identity; overrides auto-stemming
  asserts:  { posture: "seated" },   // on pick, write facts to the ledger
  requires: { posture: "seated" },   // eligible only if ledger matches
  forbids:  { posture: "standing" }, // ineligible if ledger matches
}
```

`consumes: ['x']` and `requireAbsent: ['x']` remain supported forever as sugar
for `asserts: { x: true }` and `forbids: { x: true }`.

---

## 4. Specifications

### 4.1 Fact ledger (Phase 1)

A ledger is a `Map` of `topic → value` shared across every render of one game
event (a weigh-in, a dinner), exactly like `sessionUsed` is shared today.

```js
// engine.js — new exports
export function createFacts() { return new Map(); }

// createContext(raw) gains: facts: raw.facts instanceof Map ? raw.facts : createFacts()
// ctx.flags stays for one release, aliased onto facts (boolean topics).
```

Eligibility rules, applied inside `selectVariantRecord` for both modes,
immediately after `evalWhen` and `flagsAbsent`:

1. **requires** — for each `topic: v` pair: the ledger must contain `topic`
   and its value must equal `v` (or be a member, if `v` is an array).
   Missing topic ⇒ ineligible.
2. **forbids** — for each pair: if the ledger value equals/members `v` ⇒
   ineligible. Shorthand `forbids: ["topic"]` (array of strings) means
   "ineligible if topic is set at all".
3. **contradiction guard** — for each `asserts` pair `topic: v`: if the ledger
   already holds `topic` with a *different* value ⇒ ineligible. Same value is
   fine (re-asserting is a no-op). This single rule implements "if two
   statements would contradict, only one is said."

On pick (`selectVariant`, next to `applyConsumes`): write each `asserts` pair
into the ledger.

Topic naming convention (documented in `AUTHORING.md` during Phase 1):
`domain.instance` — `garment.top`, `posture`, `speech.tone`. Values are short
strings or `true`. Keep topics coarse; a ledger with 10 live topics is doing
its job, one with 100 is authoring noise.

Call-site change: wherever a scene today creates `sessionUsed` and shares it
across renders (`createSessionUsed()`), also create and pass `facts`. One
`grep -rn "createSessionUsed" src/` finds every site.

### 4.2 Stem dedupe (Phase 2)

Goal: the word "heavy" (or "heavily", "heaviness") appears at most once per
rendered passage regardless of which pool produced it.

**Identity.** A variant's dedupe identity is its `tags` array if present,
otherwise auto-stems computed from the picked text: lowercase → split on
non-letters → drop stopwords and words shorter than 4 letters → strip one
suffix of `ing|ed|es|s` when the remainder keeps ≥ 4 letters. The stopword
list (~40 common words: the, and, her, she, with, that, …) lives in
`engine.js` as an exported const so setting packs can extend it.

**Scope of application.** Auto-stemming applies only to modules whose key
starts with `word.` (the lexicon namespace), or any module registered with
`opts.dedupe: 'stem'`. Sentence-level pools are exempt — stemming full
sentences would make everything collide. Sentence pools that need dedupe use
explicit `tags`.

**Mechanics.** Reuse the existing repeat-penalty pipeline
(`repeatMultiplier`, `buildPickEntries`). Two new tracking sets on ctx,
mirroring `sessionUsed`/`weekUsed`:

```js
ctx.renderStems  // fresh per render() call — cleared in render()
ctx.sceneStems   // shared across renders of one event, like sessionUsed
```

New constants next to the existing ones (`engine.js:21`):

```js
export const STEM_RENDER_REPEAT = 0.02;  // same passage: effectively banned
export const STEM_SCENE_REPEAT  = 0.3;   // same event: discouraged
```

In `buildPickEntries`, for eligible variants in a stem-tracked module, compute
the candidate text's stems; multiply weight by `STEM_RENDER_REPEAT` if any
stem is in `renderStems`, by `STEM_SCENE_REPEAT` if in `sceneStems`. On pick,
record the stems in both sets. The existing fallback path (`pickFromEntries`
retries without penalties when everything zeroes out) already guarantees the
pool never goes silent — keep it.

### 4.3 Morphology filters and pronouns (Phase 3)

New file `src/textEngine/morphology.js` (~80 lines), imported by `engine.js`:

```js
export function pluralize(word)   // rules + IRREGULAR_PLURALS map
export function pastTense(verb)   // rules + IRREGULAR_PAST map (sit→sat, eat→ate, is→was, …)
export function presentParticiple(verb)  // -ing with doubling/e-drop rules
export function thirdPerson(verb) // -s / -es
export const IRREGULAR_PLURALS, IRREGULAR_PAST  // exported so projects extend them
```

Wire into `applyFilters` (`engine.js:472`) as filters `plural`, `past`, `ing`,
`s3`. Only the last word of the resolved text is transformed (so
`{word.moveVerb|past}` works on "waddles across" → "waddled across" is wrong;
transform the **first** word for verb pools, last word for noun pools — encode
this as two filters where it matters: `past` transforms the first word,
`plural` the last). Naive rules with a ~30-entry irregular table cover the
authored corpus; the lint sweep (Phase 3 verify) catches the stragglers, which
get added to the irregular maps.

Pronouns: new modules in `modules.js` — `{subject.they}`, `{subject.them}`,
`{subject.their}`, `{subject.theirs}`, `{subject.themself}` — reading
`subject.pronouns` (`"she" | "he" | "they"`, default `"she"` for this
project) from a small lookup table. Professor Sim's cast is all-she; the slots
exist so lexicon entries written once port to any project (§8).

### 4.4 Outfit and garment state (Phase 4)

**Data model** — new file `src/gameData/outfits.js` (engine-free, per the
repo rule that game state lives in `gameData/`):

```js
// A garment the character is wearing.
// slot: 'top' | 'bottom' | 'waist' | 'underwear' | 'outer' | 'feet'
// fitLbs: the weight the garment was fitted at.
// integrity: 1 → intact … 0 → destroyed (persisted on the student).
export const FIT_STATES = ['loose','fitted','snug','straining','failing','burst'];

export function garmentFitState(garment, lbs) {
  if (!garment) return null;
  if (garment.integrity <= 0) return 'burst';
  const r = lbs / garment.fitLbs;
  if (r < 0.85) return 'loose';
  if (r < 1.05) return 'fitted';
  if (r < 1.15) return 'snug';
  if (r < 1.30) return 'straining';
  if (r < 1.50) return 'failing';
  return 'burst';
}
```

Thresholds are starting values; tune against sample renders, and leave them as
named constants. `student.outfit` is an object keyed by slot:
`{ top: { id, name, material, fitLbs, integrity }, bottom: {…}, … }`.
Outfit definitions (what the wardrobe offers) are plain data in the same file;
assignment/purchase flows are out of scope for this plan.

**Derived dimensions** — registered from `src/gameData/textContext.js` (the
existing plumbing site) via the existing `registerDimension`:

```js
registerDimension('fitTop',    ctx => garmentFitState(ctx.subject?.outfit?.top,    ctx.subject?.lbs));
registerDimension('fitBottom', …); registerDimension('fitWaist', …);
registerDimension('worstFit',  ctx => /* max-severity fit state across worn slots */);
```

Because `evalWhen`'s default branch already falls through to `ctx.d[key]`,
`when: { fitTop: 'straining' }` works with zero engine changes.

**Continuity** — a garment failing *during* a scene is a game-state mutation
(set `integrity: 0`) plus a ledger fact (`asserts: { 'garment.top': 'burst' }`)
on the variant that narrates it. Damage persists across weeks until the girl
changes that garment (owner decision, 2026-07); swapping a garment resets its
slot to the new garment's `integrity: 1`. Later slots in the scene key on the fact:
descriptions of an intact top carry `forbids: { 'garment.top': 'burst' }`.
The derived dimension covers scenes that start after the damage; the fact
covers the scene where it happens.

**Lexicon** — new file `src/textEngine/lexicon/garments.js`: pools
`word.garment.top`, `word.garment.bottom`, `word.garment.waist`, each keyed
on fit state × stage band (and season where it reads naturally), each with a
`{ when: {} }` fallback. Coverage rule (enforced Phase 4 lint): every
`word.garment.*` pool has at least one variant per FIT_STATE, and stage
coverage per the repo's existing weight-stage rule.

### 4.5 Personality and psychology registers (Phase 5 — convention, not mechanism)

No new engine code. Traits already reach `when` via `ctx.d` (corruption, mood,
`fixationTier`, `obsessionTier`, `dependenceTier`, `shameTier`) and any
project can add axes with `registerDimension` (e.g. `boldness`, `vanity`,
`denial` read from `student.traits`). What Phase 5 adds is the **binding
convention**, written into `AUTHORING.md` and enforced socially plus by one
lint warning:

> Every `word.*` pool that renders inside dialogue or interior monologue must
> carry at least one psych-keyed variant group (corruption, mood, or a psych
> tier) in addition to its generic fallback. Persona lines stay on
> `studentId` at weight 4, exactly as today.

That is the whole rule. A shy character and a brazen one already *can* pull
different adjectives; the convention makes sure new pools actually author for
it. Phase 5 also retrofits two existing pools as the worked exemplar.

### 4.6 Word-slot grammar shapes (authoring contract)

Every word pool declares one shape in its header comment, from this closed
list. Variants in a pool must all fit the declared shape — that is what makes
free recombination grammatical.

| Shape | Contract | Example entries |
|---|---|---|
| `ADJ` | bare adjective, lowercase, no period | "plush", "room-filling" |
| `NP` | noun phrase, no article (compose with `\|a`) | "heavy belly", "avalanche of hip and thigh" |
| `VP-3SG` | verb phrase, third-person singular present | "settles into the chair", "waddles across" |
| `ADV` | adverbial, lowercase, may be empty string | "without hurry", "" |
| `PP` | prepositional/clausal tail | "past the hips", "at her size" |
| `SENT` | full sentence with terminal punctuation | today's sentence pools |
| `LINE` | dialogue beat | today's dialogue pools |

Empty-string entries in `ADV`/`PP` pools are the sanctioned way to make a
modifier optional (already the pattern in `adverbs.js`). Tense/number changes
happen at the *slot*, via filters (`{word.moveVerb|past}`), never by
duplicating entries.

A skeleton then reads like a sentence diagram:

```js
registerPool("dinner.sitBeat", [
  { when: {}, text: [
    "{subject.first} {word.moveVerb.sit} {word.adv.pace|prefix: }{word.garment.bottom.strainTail|prefix:, }.",
  ]},
]);
```

### 4.7 Why this yields near-infinite output

Ten skeletons per beat × 8 verb variants × 12 adjectives × 6 adverbials × 5
garment tails ≈ 28,800 surface forms for one beat *before* multiplying by the
state dimensions (12 stages × 3 corruption tiers × 6 fit states × moods) that
change which entries are eligible. The coherence layer is what keeps that
volume from reading like a slot machine: dedupe stops the same word echoing,
the ledger stops the combinations that would lie, and morphology lets one
entry serve several grammatical positions. Variety comes from combinatorics;
quality comes from arbitration.

---

## 5. Phased implementation

Rules for every phase: additive changes only; `npm run text:lint`,
`npm run lint`, and `npm run build` must be clean before a phase is done;
each phase is one commit (or one small PR) so rollback is `git revert` of a
single commit. No phase requires touching existing scene content except where
stated.

### Phase 1 — Fact ledger

- **Files:** `src/textEngine/engine.js`, `scripts/textLint.mjs`,
  `src/textEngine/AUTHORING.md`.
- **Steps:**
  1. Add `createFacts`, ctx wiring, and the three eligibility rules of §4.1 to
     `selectVariantRecord`; write `asserts` in `selectVariant`.
  2. Re-express `flagsAbsent`/`applyConsumes` on top of the ledger; keep the
     old field names working.
  3. Static lint rule: a `requires`/`forbids`/`asserts` value must be a
     string, boolean, number, or array of those; topic must match
     `/^[a-z][\w.]*$/`.
  4. Dynamic lint rule: for every module, if any variant `asserts` topic T,
     warn when no variant anywhere `requires` or `forbids` T (a fact nobody
     reads is dead weight) — warning, not error.
  5. Document topic conventions in `AUTHORING.md`.
- **Verify:** add a temporary demo pool in the lint harness that asserts
  `posture: "seated"` in slot 1 and holds a `posture: "standing"`-asserting
  variant in slot 2; sweep 200 renders; assert the contradicting text never
  appears. Keep this as a permanent lint self-check, not a throwaway.
- **Done when:** self-check passes, `text:lint` clean, existing sweeps
  unchanged.

### Phase 2 — Stem dedupe

- **Files:** `src/textEngine/engine.js`, `scripts/textLint.mjs`.
- **Steps:** implement §4.2 (stopword list, stemmer, the two ctx sets, the two
  constants, penalty wiring in `buildPickEntries`, recording on pick,
  `renderStems` reset at the top of `render()`).
- **Verify:** new dynamic lint sweep: render each existing SWEEP template 200
  times; for each render, stem the output and **error** on any stem occurring
  3+ times, **warn** on 2 (some doubles are legitimate English; threshold is
  tunable). Also assert no sweep regresses to empty renders (fallback path
  intact).
- **Done when:** sweep passes across all existing sweeps without content edits
  (tune `STEM_*` constants if needed), lint/build clean.

### Phase 3 — Morphology filters and pronouns

- **Files:** new `src/textEngine/morphology.js`, `src/textEngine/engine.js`
  (filter wiring), `src/textEngine/modules.js` (pronoun slots),
  `scripts/textLint.mjs`.
- **Steps:** §4.3. Start the irregular maps with the verbs actually present in
  `moveVerbs.js` and the lexicon (grep the corpus, don't guess).
- **Verify:** table-driven self-check inside the lint script: ~40 fixed
  input/output pairs per filter (including irregulars) asserted equal. Add a
  sweep that renders `{word.moveVerb|past}`-style probes for every verb pool
  and errors on obviously broken forms (ends in "eded", "sss", …).
- **Done when:** self-checks pass, lint/build clean.

### Phase 4 — Outfits and garment lexicon

- **Files:** new `src/gameData/outfits.js`, `src/gameData/textContext.js`
  (dimension registration), new `src/textEngine/lexicon/garments.js` (+ barrel
  entry in `lexicon/index.js`), `scripts/textLint.mjs`, starter outfits on the
  student roster data.
- **Steps:** §4.4. Give every student a default outfit (one line each). Author
  the three `word.garment.*` pools with full FIT_STATE coverage. Wire one
  existing scene (the weigh-in `wi.pop` beat is the natural fit) to assert
  `garment.*` facts and mutate `integrity` — this proves the continuity loop
  end to end.
- **Verify:** lint coverage rule: every `word.garment.*` pool errors unless it
  covers all six FIT_STATES and passes the existing stage-coverage check.
  Dynamic sweep: render the wired scene across stages 3–11 and assert no
  output describes an intact garment after the burst fact is set (probe by
  forbidden-phrase list, same mechanism the sweeps already use).
- **Done when:** coverage + continuity sweeps pass, lint/build clean.

### Phase 5 — Personality register retrofit

- **Files:** `src/textEngine/AUTHORING.md`, two lexicon pools (suggested:
  `word.adv.pace` is already compliant — use `word.size` and one garment pool
  as the retrofit exemplars), `scripts/textLint.mjs`.
- **Steps:** write the §4.5 convention into `AUTHORING.md`; add psych-keyed
  variant groups to the two exemplar pools; add the lint **warning** (not
  error) for `word.*` pools with zero psych-keyed variants.
- **Verify:** lint warning fires on a deliberately non-compliant test pool and
  not on the exemplars; sample renders of the exemplars at corruption 0 vs 2
  read differently (manual spot check, 10 renders each).
- **Done when:** warnings behave, docs merged, lint/build clean.

### Phase 6 — Author the word-grain content wave

The engine phases above are enablers; this phase is the payoff and the bulk
of the hours. Squad rules apply in full (leads per `SQUAD.md`, Artisan pass,
Editor sign-off).

- **Steps:** for each high-traffic beat family, decompose the top sentence
  pools into skeleton + word slots per §4.6, reusing existing sentences as
  the `SENT` fallbacks so nothing is lost. Add `tags`/`asserts`/`forbids`
  where the prose is stateful. The families:
  - **Dialogue & self-reaction** (owner-flagged priority): the `talk.*`
    trees, `interior.selfObs` / `interior.sizeRealize` / `interior.gainPride`,
    and the `body.*` semantic skeleton (`scenes/body/depth.js`). Special
    attention: several `talk.*` body beats are flat today —
    `talk.checkIn.acceptBody` (`talkCheckIn.js:136`) carries only generic
    `when: {}` variants, so a girl at stage 3 and stage 10 speak identically.
    Decomposition here must key on stage bands, `gainStance`, corruption, and
    the new fit dims, and route her size-reactions through the §4.5 psych
    convention. `interior.selfObs` (keyed on `gainStance`) is the shape to
    copy.
  - **Campus** (owner-requested): the `scenes/campus/` skeleton + personas,
    `campusEvent/`, `campusExplorationText.js`, `campusSoftening.js`. These
    beats play out in public space, so they lean hardest on `mobilityLevel`,
    `campusLocale`, and the garment-fit dims — she is seen, and the words
    should know it.
  - **Hunger interrupt** (owner-requested): `scenes/hungerInterrupt/`,
    `hungerInterruptPersonal.js`, `hungerLexicon.js`,
    `hungerArchetypeBehavior.js`. Keyed on `hungerTier`, `addictionLevel`,
    `inWithdrawal`; the interrupt is stateful by nature (she stops, she eats,
    she resumes) — a natural first user of `asserts`/`requires` facts
    (`interrupt.phase: 'eating'`) inside one composed scene.
  - Weigh-in, dinner, eating, clothing, movement — pick order within these by
    render frequency.
- **Verify:** per family: `text:lint` clean, the Phase 2 dedupe sweep and
  Phase 1 contradiction self-checks pass, and a 20-render sample per family
  is read by a human (or the Editor agent) for flow.
- **Done when:** the chosen families render word-granular; old monoliths for
  them are retired per `MIGRATION.md`.

### Phase 7 — Portability extraction (optional, later)

Mechanical once phases 1–5 exist: move `deriveFor`'s game-specific body
(`engine.js:165-200`) behind a `registerSubjectDeriver(fn)` hook registered
from `src/gameData/textContext.js`, delete the `gameData` imports from
`engine.js`, and the engine core (`engine.js`, `morphology.js`) becomes
game-free. Do this only when a second project actually wants the engine —
until then it is speculative packaging.

---

## 6. Authoring checklist (for any model writing content against this engine)

Follow in order. Items 1–7 are today's rules restated; 8–11 are new.

1. Pick your Squad lead (`src/textEngine/SQUAD.md`); open
   `scenes/weighIn/breakScene.js` as the shape reference.
2. Compose a skeleton of slots; never a monolithic paragraph.
3. One shape per pool, declared in the header comment (§4.6 table).
4. Every pool gets a `{ when: {} }` fallback. No exceptions.
5. Weight-related pools cover every applicable stage (count before commit).
6. Persona lines: `studentId` + weight 4. Psych generics: weight 2 with
   `{subject.name}`.
7. Backtick template literals for any text containing quotes.
8. **Stateful prose declares its state.** Text that establishes a physical
   fact carries `asserts`; text that assumes one carries `requires` or
   `forbids`. If your line only reads right after a button pops, say so in
   the variant, not in your head.
9. **Signature words get `tags`** when the auto-stemmer would miss the
   collision (multi-word phrases whose punch word is under 4 letters, or two
   phrasings that mean the same thing: tag both `["sway"]`).
10. **Never duplicate an entry for grammar.** Need past tense? Use `|past` at
    the slot. Need plural? `|plural`. Extend the irregular maps in
    `morphology.js` when a form comes out wrong.
11. Garment prose keys on `fitTop`/`fitBottom`/`fitWaist` (or `worstFit`),
    never on raw stage alone — stage says how big she is, fit state says how
    the clothes are coping, and they diverge on purpose.
12. Finish with the gate: `npm run text:lint` until clean → sample renders →
    `npm run lint` → `npm run build`.

Do-not list: no engine stage names in player-facing prose; no clinical
language; no minors ever (house rules, `DESIGN_BIBLE.md`); no new `when` keys
without checking `evalWhen`'s default fallthrough already handles them; no
editing `engine.js` to fix a content problem.

---

## 7. Risks and rollback

- **Biggest risk: coherence penalties starve small pools.** A 3-entry pool
  whose stems all got used renders its fallback constantly. Mitigation:
  `pickFromEntries` already retries penalty-free before going silent, the
  Phase 2 sweep measures repeat rates empirically, and the constants are
  exported knobs. If a pool starves, the fix is more entries, not weaker
  penalties.
- **Stemmer false positives** ("seated"/"seat" colliding with "seating chart")
  are handled by explicit `tags` overriding auto-stems; the lint sweep
  surfaces them as repeat warnings you can inspect.
- **Ledger misuse** (asserting per-render trivia as scene facts) shows up as
  pools mysteriously going ineligible. The Phase 1 "dead fact" warning and
  the topic-naming convention bound the blast radius; the Dialogue Lab's
  `getEligibleVariants` already exists for interactive debugging.
- **Rollback:** each phase is one revertable commit with no content migration
  until Phase 6, and Phase 6 retires monoliths only after their replacements
  pass lint. Reverting Phase 6 means restoring the retired pools from git
  history.

---

## 8. Reusing this in another project (setting pack contract)

The engine core after Phase 7 has no game imports. A new project supplies:

1. **A subject deriver** — `registerSubjectDeriver(fn)` mapping its character
   objects to `ctx.d` dimensions (its own stage ladder, its own psych axes).
2. **Dimensions** — `registerDimension` calls for anything its `when` clauses
   key on (locale, faction, whatever the setting needs).
3. **A lexicon** — `word.*` pools authored to §4.6 shapes against its own
   dimensions, plus stopword/irregular-map extensions for its vocabulary.
4. **Outfit data** — its own `outfits.js` with garment slots and fit
   thresholds that make sense for its wardrobe.
5. **Lint sweeps** — SWEEP entries in its lint harness covering its templates
   across its state space.

Everything in §4 (ledger semantics, dedupe, morphology, shape contracts, the
checklist) transfers verbatim. Nothing in the coherence layer knows what a
weight stage is.

---

## 9. Open questions (product calls, not engineering calls)

1. Phase 6 beat-family order beyond the first — dialogue & self-reaction goes
   first (owner-flagged, 2026-07); the rest default to render frequency
   (weigh-in, dinner, eating, clothing, movement) unless the owner reorders.

Resolved (owner, 2026-07):

2. Garment damage **persists across weeks** until the girl changes that
   garment; changing garments resets the slot (§4.4).
3. Per-girl wardrobe authoring is **long-term roadmap**, not part of this
   plan. Phase 4 ships placeholder default outfits only.
