# The Modular Text Engine Manifesto

**What this is:** a complete, self-contained kit for building a word-granular
procedural prose engine for text games. Read only this file and you can build
the whole thing: the spec, a full JavaScript reference implementation, a
worked setting pack, the shell contract, the authoring law, a four-layer
lint harness, a mechanism self-check, and the build order. Nothing here
requires access to any other repository.

**Who this is for:** any developer or model, including small ones. Every
mechanism comes with exact data shapes, exact math, complete code, and a
runnable check that fails if you got it wrong. Where this document says
MUST, a lint rule enforces it. Every line of code in Parts III, IV, V, VII,
and VIII has been executed together: the mechanism checks pass, the lint
harness runs clean on the worked example, and deliberately planted defects
(a deleted fallback, a wrong verb form) are caught. If you copy the code and
a check fails, the defect is in the copying.

**What it produces:** a game whose prose is assembled at render time from
pools of small, grammar-shaped fragments keyed on game state — so a
character described at one body size, mood, wardrobe state, and psychology
reads differently from the same character one stage later, and two renders
of the same scene rarely repeat. The design is proven in production: a
shipped game built on this exact architecture runs a six-figure render
sweep on every commit with a measured word-repetition rate under 1% and
zero state-contradiction failures.

---

## Part I — Philosophy

Five laws. Everything else in this document is machinery for enforcing them.

1. **Never write a monolithic paragraph as one string.** A paragraph is a
   *skeleton* of slots; each slot is a *pool* of small variants. Monoliths
   cannot react to state, repeat their own imagery internally, and rot.
2. **Every pool always answers.** Every pool carries a generic fallback that
   matches any state. A silent slot is a bug; the lint harness renders your
   whole game across a state grid and fails on any empty output.
3. **State picks the words.** Variants declare the game states they fit
   (`when` conditions); the engine scores specificity and prefers the most
   specific eligible text while keeping generics alive as spice.
4. **Words know about each other.** Within one passage, a salient word is
   said once (stem dedupe); within one scene, an established fact is never
   contradicted (the fact ledger). Variety without arbitration is a slot
   machine; arbitration is what makes combinatorics read as prose.
5. **Trust only the harness.** No content ships on "looks right." The lint
   harness runs static checks and thousands of real renders, and every
   engine mechanism carries a permanent self-check that pins its behavior.

Combinatorics are the payoff: ten skeletons × eight verbs × twelve
adjectives × six adverbials × five wardrobe clauses is 28,800 surface forms
for one beat, before multiplying by the state dimensions that change which
entries are eligible. The coherence layer keeps that volume honest.

---

## Part II — Vocabulary

| Term | Meaning |
|---|---|
| **template** | A string with `{slots}`: `"{intro} {action} {reaction}"` |
| **slot** | `{key}`, `{key:arg}`, `{key\|filter}` — resolved recursively |
| **module / pool** | A registered list of variants under a key |
| **variant** | `{ when, text, weight?, priority?, tags?, asserts?, requires?, forbids? }` |
| **when** | AND-ed state conditions; match count = specificity score |
| **ctx** | The render context: subject character, reference character, week, globals, plus derived dimensions |
| **ctx.d** | Derived dimensions — the subject mapped to selector values (stage, mood, tiers…) by the game's *subject deriver* |
| **dimension** | A named selector value; games register derivers for their own |
| **fact ledger** | A `Map(topic → value)` shared across one event's renders; powers assert/require/forbid |
| **stem** | The dedupe identity of a content word ("straining" → `strain`) |
| **skeleton** | A pool whose texts are templates stitching sub-pools together |
| **shape** | The declared grammatical contract of a pool (Part VI) |
| **setting pack** | Everything game-specific: deriver, dimensions, identity modules, lexicon, ladders (Part V) |
| **lint pack** | The game-specific half of the lint harness: sweep templates, state grid, coverage spec, banned patterns (Part VII) |
| **trace** | Per-slot provenance collected during render; powers the tuning tools (Part IX) |
| **shell** | The host game — VN runner, management loop, parser — that owns state, choices, and saves; the engine is one pure `(template, ctx) → prose` call (3.10) |
| **seed** | Value fed to `seededRandom` so a render sequence replays exactly (3.9) |

Naming law: module keys are `namespace.beatName` (`din.arrival`,
`word.size`, `case.clueBeat`). One short namespace per feature. The `word.`
namespace is reserved for word-grain lexicon pools and is always
dedupe-tracked. `join` is a reserved key. `subject.*` and `ref.*` are
reserved for identity modules (Part V).

---

## Part III — The Specification

### 3.1 Variant shape

```js
{
  when:     { stageMin: 3, mood: ['tired', 'stressed'] },  // AND-ed; {} = wildcard
  weight:   2,          // share multiplier (default 1); 0 parks a draft
  priority: 1,          // pool mode: hard gate — only max-priority matches stay
  text:     "…",        // string | (ctx) => string | array of either
  tags:     ['strain'], // dedupe identity override (else auto-stemmed)
  asserts:  { 'garment.top': 'burst' },  // write facts on pick
  requires: { posture: 'seated' },       // eligible only if ledger matches
  forbids:  { posture: 'standing' },     // ineligible if ledger matches
                                          // (array form: ['topic'] = "if set at all")
}
```

`text` strings may contain `{slots}` (resolved recursively, depth cap 5).
Backticks are the sane way to hold dialogue quotes. Array `text` = one entry
is picked; each entry gets its own dedupe/repeat identity.

### 3.2 `when` evaluation — exact rules

A `when` object matches if **every** key matches. The score (specificity) is
the number of matched conditions, except a Min/Max range pair on the same
base name counts once.

- `season`: equality, or membership if the condition value is an array.
- `skill`: truthy lookup in `ctx.skillEffects[value]`.
- Any key ending in `Min` / `Max`: numeric compare against
  `ctx.d[base] ?? ctx.globals[base]` where `base` is the key minus the
  suffix (`stageMin` → `d.stage >= v`). A missing dimension fails the match.
- Every other key: equality against `ctx.d[key] ?? ctx.globals[key]`
  (array condition value = membership; boolean condition values coerce the
  actual with `!!`).

This generalized rule means **any dimension a game registers is instantly
usable in `when`, including as a range**, with no engine edits. One trap
follows from it, already fixed in the reference code: values that live on
the context itself rather than on `ctx.d` are invisible to the rule.
`createContext` therefore seeds `ctx.d.week = week`, which is what makes
`weekMin`/`weekMax` work. If you add another context-level value (a scene
id, a difficulty setting), either seed it onto `ctx.d` the same way or pass
it through `globals` — a `when` key that silently never matches is a
missing-content bug the dynamic sweep cannot see.

### 3.3 Selection — exact math

Two modes. `registerPool` (mode `'pool'`) is the default for ALL content;
`registerModule` (mode `'best'`) is for foundational descriptor dictionaries
and identity lookups where the single most-specific match should win
outright.

**Pool mode:**
1. Collect all variants whose `when` matches AND whose ledger fields pass
   (3.4). Track each variant's `priority` (default 0).
2. Keep only variants at the **maximum priority** present (the hard gate).
3. Build one weighted entry per text:
   `w = (variant.weight ?? 1) × poolBase^score × repeatPenalty × stemPenalty`
   with `poolBase = 3` (override per pool via `opts.poolBase`). So a
   2-condition variant outweighs a wildcard 9:1 — specific flavor
   dominates, generic surfaces roughly 10–25% of the time as spice.
4. Weighted-random pick. If penalties zeroed everything, rebuild the
   entries **without penalties** and pick — a pool never goes silent.

**Best mode:** highest score wins; ties broken by higher `priority`; final
ties pool together and pick as above.

**Repeat penalty:** every text has a stable usage key
`"moduleKey#variantIndex:textIndex"`. If it was already picked this
*session* (one event — pass a shared Set across the event's renders) its
weight ×0.12; already picked this *week* (persist a Set on the character)
×0.4. Record on pick.

**Stem penalty (dedupe):** for pools in a tracked namespace, each candidate
text's stems (3.5) are checked: any stem already used in this *render*
(passage) ×0.02; in this *scene* (shared Set like the session Set) ×0.3.
Record stems on pick. Function texts can't be stemmed before resolution —
record their stems *after* resolving, so later slots still dedupe against
them.

### 3.4 The fact ledger

`ctx.facts` is a `Map(topic → value)`, fresh per context by default,
shareable across an event by passing one Map into every context of that
event (exactly like the session Set). Topics are `domain.instance` strings
(`garment.top`, `posture`, `scene.tone`); values are short scalars.

Eligibility, applied with `when`:
- **requires** — every `topic: v` must be present and equal (array =
  membership). Missing topic fails.
- **forbids** — object form fails on a value match; array-of-strings form
  fails if the topic is set at all.
- **contradiction guard** — a variant *asserting* `topic: v2` while the
  ledger holds `topic: v1` (different value) is **ineligible**. This single
  rule implements "of two statements that would contradict, only one is
  said."

On pick, `asserts` pairs are written to the ledger. Slots resolve left to
right, so **the first slot to assert a fact wins**; authors put the
fact-establishing beat first in the skeleton. Keep topics coarse: a scene
with ~10 live topics is healthy; 100 is authoring noise.

### 3.5 Stems

`stemsOf(text)`:
1. Strip `{slot}` syntax. Lowercase. Split on non-letters (keep apostrophes,
   then drop them).
2. Drop words under 4 letters and stopwords (common function words,
   pronouns, contraction remnants like `doesnt`, and generic
   attribution/perception verbs — `says`, `look`, `take`, `know`…).
3. Strip ONE suffix of `ing|ed|es|s` when ≥4 letters remain; re-check the
   stopword list on the stripped stem.
4. Fold irregulars to one identity via a small map
   (`broke/broken → break`, `gave/given → give`, `took/taken → take`, …).

Per-variant `tags: ['strain']` overrides auto-stemming — use it when the
punch word is under 4 letters or two phrasings share a meaning.

Tracked namespaces: `word.` always; games opt whole scene namespaces in
with `trackStemsFor('din.')` and single pools with
`registerPool(key, variants, { dedupe: 'stem' })`. Do NOT track pools whose
texts are long multi-sentence passages — stemming those collides on
everything. Decompose them instead.

### 3.6 Filters and the join meta-slot

Slot form: `{key:arg|filter|filter:x}`. `:ref` / `:group` retarget the slot
onto the reference character / first group member (re-deriving `ctx.d` for
them); any other `:arg` is passed to function texts as `ctx.arg`.

| Filter | Effect |
|---|---|
| `cap` / `lower` | Capitalize first letter / lowercase all |
| `a` | Prepend "a "/"an " by first letter |
| `prefix:X` / `suffix:X` | Add X only if the slot resolved non-empty |
| `past` / `ing` / `s3` | Verb morphology on the FIRST word (Part IV code) |
| `plural` | Noun morphology on the LAST word |

`prefix:`/`suffix:` are the optionality mechanism: a slot that resolves
empty vanishes cleanly, taking its punctuation with it.

`{join:a,b,c|...}` resolves each listed module, drops empties, and glues
survivors with commas and a final "and". Combine with `|prefix:`/`|suffix:`
to make a whole clause group optional. Reserved key — never register a
module named `join`.

### 3.7 Post-processing

After resolution, `smooth()` collapses double spaces, removes space before
punctuation, fixes `..` artifacts, and capitalizes after sentence ends.
`{{` escapes a literal `{`. Unknown modules resolve to `""` with a dev
warning — the engine never throws at render time.

Two hard-won details:

- **The smoothing pass capitalizes after `. ` and at string start, but NOT
  after `\n\n`.** A fragment that opens a paragraph must be authored
  capitalized or piped through `|cap`.
- **The literal-brace escape token is a private-use Unicode character and
  MUST be written as the escape sequence `'\uE000'`, never pasted as the
  raw character.** The raw character is invisible; when a copy drops it,
  the token degrades to an empty string, and
  `text.replace(new RegExp('', 'g'), '{')` inserts a `{` between every
  character of every render. This exact defect has been found in the wild,
  introduced by copying code through a document.

### 3.8 The persistence contract

The anti-repetition and coherence layers only work if their scopes are
wired to real game lifetimes:

| Scope | Object | Lifetime | Wiring |
|---|---|---|---|
| render | `ctx.renderStems` | one `render()` call | automatic — the engine resets it |
| event/scene | `ctx.facts`, `ctx.sessionUsed`, `ctx.sceneStems` | one game event (a dinner, a weigh-in) | create once per event (`createFacts()`, `createSessionUsed()`, `new Set()`), pass the same objects into every `createContext` of that event |
| week | `ctx.weekUsed` | one game week | persist on the character: save `[...set]`, load `new Set(array)`, clear on week advance |

Skipping the event scope is the most common integration mistake: every
render gets fresh facts and a fresh session Set, and the game "works" while
silently allowing contradictions and back-to-back repeats.

### 3.9 The random source (determinism)

Every roll — array pick and weighted pick — flows through one injectable
function. `setRandomSource(seededRandom(seed))` makes every subsequent
render reproducible; a falsy argument restores `Math.random`. Games never
call this; the tooling does:

- **Replay:** the dev panel stamps each rolled sample with the seed that
  produced it, so a flagged render can be replayed as the exact same text
  (Part IX) instead of re-rolled and hoped for.
- **CI:** the rate-based gates (Part VII) stay on true randomness on
  purpose — but a suspected flake can be pinned to a seed while you
  investigate.

One rule follows: reproduction needs the same *call sequence*. Replay the
whole event from its first render — a seed applied mid-scene diverges,
because earlier renders already advanced the generator.

### 3.10 The shell contract (driving the engine from any game)

The engine is one pure call: `render(template, ctx) → string`. Everything
else belongs to the shell — the VN runner, management loop, or parser that
owns game state, choices, and saves. The whole integration surface:

```js
// A game event = one scope bundle + a sequence of beats.
export function runEvent(beats, { subject, ref = null, week, globals = {}, weekUsed }) {
  // One event = one scope bundle (3.8). Create once, thread everywhere.
  const scopes = {
    facts: createFacts(),
    sessionUsed: createSessionUsed(),
    sceneStems: new Set(),
    weekUsed,                       // persisted on the character by the shell
  };
  const ctxFor = () => createContext({ subject, ref, week, globals, ...scopes });
  const out = [];
  for (const beat of beats) {
    if (beat.choice) {
      // Menu labels render with a THROWAWAY scope copy: an option the
      // player never picks must not burn dedupe state or assert facts.
      const labels = beat.choice.map((opt) => ({
        ...opt,
        label: render(opt.labelTpl, createContext({ subject, ref, week, globals })),
      }));
      out.push({ choice: labels });   // the shell shows the menu, waits,
      continue;                       // then runs the picked option's beats
    }
    out.push({ text: render(beat.tpl, ctxFor()) }); // paragraphs: one render
  }                                                 // per beat, join '\n\n'
  return out;
}
```

Four rules the example encodes:

1. **One event, one scope bundle** (3.8): `facts`, `sessionUsed`, and
   `sceneStems` are created once per event and threaded into every context;
   `weekUsed` comes from the character and outlives the event.
2. **Paragraphs are separate renders** joined with `\n\n` — remember the
   smoothing gotcha (3.7): a paragraph-opening fragment is authored
   capitalized or piped through `|cap`.
3. **Menu labels render with a throwaway scope.** A label the player never
   picks must not record dedupe usage or assert facts. Labels get fresh
   contexts; only the chosen branch renders into the event scope.
4. **The shell mutates state, then renders.** Weight changes, damage,
   psych-tier moves — apply them to the character first, then create the
   context; `ctx.d` derives once per context, never live.

Shell shapes: in a **management sim**, an event is one scheduler tick's
scene (a meal, an interrupt); clear each character's `weekUsed` on week
advance. In a **VN**, an event is one labeled scene block — beats map to
text nodes, choices to menu nodes. In a **parser game**, an event is one
player command's full response. Saves persist `weekUsed` as an array (3.8)
and never persist `facts` — facts die with their event.

---

## Part IV — Reference implementation

Two files, complete, game-free. Copy them verbatim; the only things you
write for your game are the setting pack (Part V) and the lint pack
(Part VII). These exact files pass the mechanism checks in Part VIII.

### 4.1 `engine.js`

```js
// ═══════════════════════════════════════════════════════════════
// MODULAR TEXT ENGINE — game-free core.
// Games supply a subject deriver, dimensions, and lexicon (the
// setting pack). The engine never throws at render time.
// ═══════════════════════════════════════════════════════════════
import {
  pastTense, presentParticiple, thirdPerson, pluralize,
  transformFirstWord, transformLastWord,
} from './morphology.js';

const DEV = typeof process === 'undefined' || process.env?.NODE_ENV !== 'production';
const warn = (...a) => { if (DEV) console.warn('[textEngine]', ...a); };

// ── anti-repetition constants ─────────────────────────────────
export const SESSION_REPEAT_WEIGHT = 0.12;
export const WEEK_REPEAT_WEIGHT = 0.4;
export const STEM_RENDER_REPEAT = 0.02;
export const STEM_SCENE_REPEAT = 0.3;

export function createSessionUsed() { return new Set(); }
export function createFacts() { return new Map(); }

// ── stems ─────────────────────────────────────────────────────
export const STEM_STOPWORDS = new Set([
  'the', 'and', 'her', 'hers', 'she', 'his', 'him', 'with', 'that', 'this',
  'from', 'into', 'onto', 'over', 'under', 'then', 'than', 'when', 'what',
  'have', 'has', 'had', 'been', 'being', 'they', 'them', 'their', 'there',
  'here', 'where', 'which', 'while', 'about', 'again', 'against', 'between',
  'through', 'because', 'before', 'after', 'above', 'below', 'down', 'just',
  'more', 'most', 'much', 'some', 'such', 'very', 'your', 'yours', 'like',
  'does', 'doesn', 'still', 'every', 'each', 'both', 'around', 'without',
  'toward', 'towards', 'himself', 'herself', 'itself',
  // Generic verbs of attribution/perception — normal English glue, not slop.
  'says', 'said', 'saying', 'look', 'take', 'know', 'make', 'want', 'really',
  // Contractions (apostrophes are stripped before matching) and their stems.
  'doesnt', 'dont', 'isnt', 'wasnt', 'cant', 'wont', 'didnt', 'youre',
  'shes', 'hes', 'thats', 'theres', 'weve', 'youve', 'hasnt', 'havent',
  'youll', 'someth', 'anyth', 'everyth', 'noth',
]);

// Irregular forms folded to one identity so "broke"/"broken"/"breaks" collide.
export const STEM_FOLDS = {
  broke: 'break', broken: 'break', gave: 'give', given: 'give',
  took: 'take', taken: 'take', wore: 'wear', worn: 'wear',
  sank: 'sink', sunk: 'sink', fell: 'fall', fallen: 'fall',
  went: 'gone', grew: 'grow', grown: 'grow', held: 'hold',
  strode: 'stride', swept: 'sweep', crept: 'creep',
};

/** Salient stems of a text fragment: lowercase content words ≥4 letters,
 *  one plural/tense suffix stripped, irregulars folded. Slot syntax ignored. */
export function stemsOf(text) {
  if (typeof text !== 'string' || !text) return [];
  const stems = [];
  const cleaned = text.replace(/\{[^}]*\}/g, ' ').toLowerCase();
  for (const raw of cleaned.split(/[^a-z']+/)) {
    const w = raw.replace(/'/g, '');
    if (w.length < 4 || STEM_STOPWORDS.has(w)) continue;
    let s = w;
    for (const suf of ['ing', 'ed', 'es', 's']) {
      if (s.endsWith(suf) && s.length - suf.length >= 4) { s = s.slice(0, -suf.length); break; }
    }
    if (STEM_STOPWORDS.has(s)) continue; // re-check the stripped stem
    stems.push(STEM_FOLDS[s] ?? s);
  }
  return stems;
}

const STEM_TRACKED_PREFIXES = ['word.'];
export function trackStemsFor(prefix) {
  if (!STEM_TRACKED_PREFIXES.includes(prefix)) STEM_TRACKED_PREFIXES.push(prefix);
}
function isStemTracked(key) {
  return STEM_TRACKED_PREFIXES.some((p) => key.startsWith(p))
    || MODULE_OPTS.get(key)?.dedupe === 'stem';
}

function stemMultiplier(stems, ctx) {
  let m = 1;
  for (const s of stems) {
    if (ctx.renderStems?.has(s)) return STEM_RENDER_REPEAT;
    if (ctx.sceneStems?.has(s)) m = STEM_SCENE_REPEAT;
  }
  return m;
}
function recordStems(stems, ctx) {
  for (const s of stems) { ctx.renderStems?.add(s); ctx.sceneStems?.add(s); }
}

// ── usage-key repeat penalty ──────────────────────────────────
export function variantUsageKey(moduleKey, variantIndex, textIndex) {
  return `${moduleKey}#${variantIndex}:${textIndex}`;
}
function repeatMultiplier(usageKey, ctx) {
  if (!usageKey) return 1;
  let m = 1;
  if (ctx.sessionUsed?.has(usageKey)) m *= SESSION_REPEAT_WEIGHT;
  if (ctx.weekUsed?.has(usageKey)) m *= WEEK_REPEAT_WEIGHT;
  return m;
}
function recordVariantUsage(usageKey, ctx) {
  if (!usageKey) return;
  ctx.sessionUsed?.add(usageKey);
  ctx.weekUsed?.add(usageKey);
}

// ── random source ─────────────────────────────────────────────
// Every roll flows through one injectable function. Games never touch
// this; the tuning loop and CI do: setRandomSource(seededRandom(seed))
// makes every render reproducible, so a flagged sample can be replayed
// exactly. Pass a falsy value to restore Math.random.
let RANDOM = Math.random;
export function setRandomSource(fn) {
  RANDOM = typeof fn === 'function' ? fn : Math.random;
}
/** mulberry32 — tiny seeded PRNG, good enough for prose dice. */
export function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── random helpers ────────────────────────────────────────────
export function pick(arr) { return arr[Math.floor(RANDOM() * arr.length)]; }
export function weightedPick(entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  if (total <= 0) return entries.length ? entries[0].item : undefined;
  let roll = RANDOM() * total;
  for (const e of entries) { roll -= e.w; if (roll <= 0) return e.item; }
  return entries[entries.length - 1].item;
}

// ── dimensions & subject deriver (the setting-pack hooks) ─────
const DIMENSION_DERIVERS = new Map();
export function registerDimension(key, deriveFn) {
  if (DIMENSION_DERIVERS.has(key)) warn(`dimension "${key}" re-registered`);
  DIMENSION_DERIVERS.set(key, deriveFn);
}

let SUBJECT_DERIVER = null;
export function registerSubjectDeriver(fn) {
  if (SUBJECT_DERIVER) warn('subject deriver re-registered');
  SUBJECT_DERIVER = fn;
}
function deriveFor(subject, ref, skillEffects) {
  if (!subject) return {};
  if (!SUBJECT_DERIVER) {
    warn('no subject deriver registered — ctx.d is minimal');
    return { subjectId: subject.id ?? null };
  }
  return SUBJECT_DERIVER(subject, ref, skillEffects) || {};
}

// ── context ───────────────────────────────────────────────────
const SEASONS = ['fall', 'winter', 'spring', 'summer'];
export function getSeason(week) {
  return SEASONS[Math.floor((Math.max(1, week || 1) - 1) / 4) % 4];
}

export function createContext(raw = {}) {
  const { subject = null, ref = null, group = null, week = 1,
          skillEffects = {}, globals = {} } = raw;
  const ctx = {
    subject, ref, group, week,
    season: raw.season || getSeason(week),
    skillEffects, globals,
    facts: raw.facts instanceof Map ? raw.facts : createFacts(),
    sessionUsed: raw.sessionUsed instanceof Set ? raw.sessionUsed : createSessionUsed(),
    weekUsed: raw.weekUsed instanceof Set ? raw.weekUsed : new Set(),
    renderStems: new Set(),
    sceneStems: raw.sceneStems instanceof Set ? raw.sceneStems : new Set(),
    d: deriveFor(subject, ref, skillEffects),
  };
  // `week` must be visible to the generalized when-rule (weekMin/weekMax),
  // so seed it as a dimension unless the deriver already set one.
  if (ctx.d.week == null) ctx.d.week = week;
  for (const [key, fn] of DIMENSION_DERIVERS) {
    try { ctx.d[key] = fn(ctx); } catch (e) { warn(`dimension "${key}" failed`, e); }
  }
  return ctx;
}

function retarget(ctx, who) {
  if (who === 'ref' && ctx.ref) {
    const d = deriveFor(ctx.ref, ctx.subject, ctx.skillEffects);
    if (d.week == null) d.week = ctx.week;
    return { ...ctx, subject: ctx.ref, ref: ctx.subject, d };
  }
  if (who === 'group' && ctx.group?.length) {
    const d = deriveFor(ctx.group[0], ctx.ref, ctx.skillEffects);
    if (d.week == null) d.week = ctx.week;
    return { ...ctx, subject: ctx.group[0], d };
  }
  return ctx;
}

// ── registry ──────────────────────────────────────────────────
const REGISTRY = new Map();
const MODULE_OPTS = new Map();

export function registerModule(key, variants, opts = {}) {
  if (key === 'join') { warn('"join" is reserved'); return; }
  if (REGISTRY.has(key)) warn(`module "${key}" re-registered`);
  REGISTRY.set(key, Array.isArray(variants) ? variants : [variants]);
  MODULE_OPTS.set(key, opts);
}
export function registerPool(key, variants, opts = {}) {
  registerModule(key, variants, { select: 'pool', ...opts });
}
export function registerModuleVariants(key, variants) {
  const extra = Array.isArray(variants) ? variants : [variants];
  REGISTRY.set(key, [...extra, ...(REGISTRY.get(key) || [])]);
}
export function hasModule(key) { return REGISTRY.has(key); }
export function _registryEntries() { return [...REGISTRY.entries()]; }   // lint/tooling only
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || {}; }  // lint/tooling only

// ── when evaluation ───────────────────────────────────────────
// Generalized rule: any dimension a game registers is instantly usable in
// `when`, including as a Min/Max range, with no engine edits.
function evalWhen(when, ctx) {
  if (!when || Object.keys(when).length === 0) return { match: true, score: 0 };
  const d = ctx.d || {};
  let score = 0;
  const rangeSeen = new Set();
  for (const [k, v] of Object.entries(when)) {
    let ok;
    if (k === 'season') {
      ok = Array.isArray(v) ? v.includes(ctx.season) : ctx.season === v;
    } else if (k === 'skill') {
      ok = !!(ctx.skillEffects && ctx.skillEffects[v]);
    } else if (k.endsWith('Min') || k.endsWith('Max')) {
      const base = k.slice(0, -3);
      const actual = d[base] ?? ctx.globals?.[base];
      ok = actual != null && (k.endsWith('Min') ? actual >= v : actual <= v);
      if (!ok) return { match: false, score: 0 };
      if (!rangeSeen.has(base)) { rangeSeen.add(base); score += 1; }
      continue;
    } else {
      const actual = d[k] ?? ctx.globals?.[k];
      ok = Array.isArray(v) ? v.includes(actual)
        : typeof v === 'boolean' ? !!actual === v
        : actual === v;
    }
    if (!ok) return { match: false, score: 0 };
    score += 1;
  }
  return { match: true, score };
}

// ── fact-ledger eligibility ───────────────────────────────────
function factsEligible(ctx, variant) {
  const facts = ctx.facts;
  if (!facts) return true;
  const { requires, forbids, asserts } = variant;
  if (requires) {
    for (const [t, v] of Object.entries(requires)) {
      const cur = facts.get(t);
      if (!(Array.isArray(v) ? v.includes(cur) : cur === v)) return false;
    }
  }
  if (forbids) {
    if (Array.isArray(forbids)) {
      if (forbids.some((t) => facts.has(t))) return false;
    } else {
      for (const [t, v] of Object.entries(forbids)) {
        if (!facts.has(t)) continue;
        const cur = facts.get(t);
        if (Array.isArray(v) ? v.includes(cur) : cur === v) return false;
      }
    }
  }
  if (asserts) {
    for (const [t, v] of Object.entries(asserts)) {
      if (facts.has(t) && facts.get(t) !== v) return false;   // contradiction guard
    }
  }
  return true;
}
function applyAsserts(ctx, variant) {
  if (!ctx.facts || !variant.asserts) return;
  for (const [t, v] of Object.entries(variant.asserts)) ctx.facts.set(t, v);
}

// ── selection ─────────────────────────────────────────────────
function buildPickEntries(moduleKey, matches, poolBase, ctx, applyPenalty) {
  const entries = [];
  const stemTracked = isStemTracked(moduleKey);
  for (const m of matches) {
    const { variant, score, variantIndex } = m;
    const baseW = (variant.weight ?? 1) * Math.pow(poolBase, score);
    const push = (text, textIndex) => {
      const usageKey = variantUsageKey(moduleKey, variantIndex, textIndex);
      // Dedupe identity: explicit tags win; else auto-stems of the raw text
      // (function texts have no stems until resolved — see selectVariant).
      const stems = stemTracked ? (variant.tags ?? stemsOf(text)) : [];
      let w = baseW;
      if (applyPenalty) w *= repeatMultiplier(usageKey, ctx) * stemMultiplier(stems, ctx);
      if (w > 0) entries.push({ item: { variant, text, usageKey, stems }, w });
    };
    const t = variant.text;
    if (Array.isArray(t)) t.forEach(push); else push(t, 0);
  }
  return entries;
}
function pickFromEntries(entries, moduleKey, matches, poolBase, ctx) {
  if (!entries.length && matches.length) {
    // Penalty-free retry — a pool never goes silent just because everything
    // eligible was recently used.
    entries = buildPickEntries(moduleKey, matches, poolBase, ctx, false);
  }
  if (!entries.length) return null;
  return weightedPick(entries);
}

function selectVariantRecord(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) { warn(`unknown module "${key}"`); return null; }
  const opts = MODULE_OPTS.get(key) || {};
  const base = opts.poolBase ?? 3;

  if (opts.select === 'pool') {
    const matches = [];
    let maxPriority = -Infinity;
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const { match, score } = evalWhen(v.when, ctx);
      if (!match || !factsEligible(ctx, v)) continue;
      const priority = v.priority || 0;
      if (priority > maxPriority) maxPriority = priority;
      matches.push({ variant: v, score, priority, variantIndex: i });
    }
    const eligible = matches.filter((m) => m.priority === maxPriority);
    if (!eligible.length) return null;
    return pickFromEntries(buildPickEntries(key, eligible, base, ctx, true), key, eligible, base, ctx);
  }

  let best = [], bestScore = -1, bestPriority = -Infinity;
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    const { match, score } = evalWhen(v.when, ctx);
    if (!match || !factsEligible(ctx, v)) continue;
    const priority = v.priority || 0;
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      best = [{ variant: v, score, priority, variantIndex: i }];
      bestScore = score; bestPriority = priority;
    } else if (score === bestScore && priority === bestPriority) {
      best.push({ variant: v, score, priority, variantIndex: i });
    }
  }
  if (!best.length) return null;
  return pickFromEntries(buildPickEntries(key, best, base, ctx, true), key, best, base, ctx);
}

function selectVariant(key, ctx) {
  const picked = selectVariantRecord(key, ctx);
  if (!picked) return '';
  if (picked.usageKey) recordVariantUsage(picked.usageKey, ctx);
  applyAsserts(ctx, picked.variant);
  const t = picked.text;
  const out = typeof t === 'function' ? (t(ctx) ?? '') : (t ?? '');
  if (picked.stems?.length) recordStems(picked.stems, ctx);
  // Function texts have no stems until resolved — record them now so later
  // slots still dedupe against dictionary-driven modules.
  else if (typeof t === 'function' && isStemTracked(key)) recordStems(stemsOf(out), ctx);
  return out;
}

/** Eligible variants for a key under ctx, sorted by weight, annotated with
 *  pick probability. Powers the Slot Inspector dev panel — not game code. */
export function getEligibleVariants(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) return [];
  const poolBase = MODULE_OPTS.get(key)?.poolBase ?? 3;
  const results = [];
  for (const v of variants) {
    const { match, score } = evalWhen(v.when ?? {}, ctx);
    if (!match) continue;
    const weight = (v.weight ?? 1) * Math.pow(poolBase, score);
    const texts = Array.isArray(v.text) ? v.text
      : typeof v.text === 'function' ? ['[dynamic]']
      : [v.text];
    results.push({ when: v.when ?? {}, score, weight, texts });
  }
  const total = results.reduce((s, r) => s + r.weight, 0);
  return results
    .sort((a, b) => b.weight - a.weight)
    .map((r) => ({ ...r, probability: total > 0 ? Math.round((r.weight / total) * 100) : 0 }));
}

// ── filters ───────────────────────────────────────────────────
function applyFilters(text, filters) {
  let out = text;
  for (const f of filters) {
    if (f === 'cap') out = out ? out.charAt(0).toUpperCase() + out.slice(1) : out;
    else if (f === 'lower') out = out.toLowerCase();
    else if (f === 'a') out = out ? (/^[aeiou]/i.test(out) ? 'an ' : 'a ') + out : out;
    else if (f.startsWith('prefix:')) out = out ? f.slice(7) + out : out;
    else if (f.startsWith('suffix:')) out = out ? out + f.slice(7) : out;
    else if (f === 'past') out = out ? transformFirstWord(out, pastTense) : out;
    else if (f === 'ing') out = out ? transformFirstWord(out, presentParticiple) : out;
    else if (f === 's3') out = out ? transformFirstWord(out, thirdPerson) : out;
    else if (f === 'plural') out = out ? transformLastWord(out, pluralize) : out;
    else warn(`unknown filter "${f}"`);
  }
  return out;
}

// ── template resolution ───────────────────────────────────────
const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?((?:\|[^}]*)?)\}/g;
// Literal-brace escape: `{{` becomes this private-use character during
// resolution, then a real `{` afterwards. MUST be a character that can
// never appear in prose. Write it exactly like this — as an escape
// sequence, never pasted raw (an invisible/lost char here corrupts every
// render).
const ESCAPE_TOKEN = '\uE000';
const MAX_DEPTH = 5;

// Resolve one slot: pick the variant, recurse into its output, and (when
// tracing) record { key, text, leaf, depth }. A "leaf" fragment contained
// no further content slots — the natural annotation unit for dev tools.
// subject.* identity slots don't make a fragment composite.
function resolveSlot(name, slotCtx, depth, trace) {
  const raw = String(selectVariant(name, slotCtx));
  let leaf = true;
  SLOT_RE.lastIndex = 0;
  let m;
  while ((m = SLOT_RE.exec(raw))) {
    if (!m[1].startsWith('subject.')) { leaf = false; break; }
  }
  const out = resolveText(raw, slotCtx, depth + 1, trace);
  if (trace && out.trim()) trace.push({ key: name, text: out.trim(), leaf, depth });
  return out;
}

function resolveText(text, ctx, depth, trace) {
  if (depth >= MAX_DEPTH) {
    SLOT_RE.lastIndex = 0;
    if (SLOT_RE.test(text)) {
      warn('max depth; stripping slots');
      SLOT_RE.lastIndex = 0;
      text = text.replace(SLOT_RE, '');
    }
    return text;
  }
  SLOT_RE.lastIndex = 0;
  return text.replace(SLOT_RE, (_, name, arg, filterStr) => {
    const filters = filterStr ? filterStr.split('|').filter(Boolean) : [];
    // {join:a,b,c|...} — reserved meta-slot: resolve each listed module,
    // drop empties, glue survivors with commas + a final "and".
    if (name === 'join') {
      const parts = (arg || '').split(',').map((k) => k.trim()).filter(Boolean)
        .map((k) => resolveSlot(k, ctx, depth, trace).trim()).filter(Boolean);
      const out = parts.length <= 1 ? (parts[0] || '')
        : parts.length === 2 ? `${parts[0]} and ${parts[1]}`
        : `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;
      return applyFilters(out, filters);
    }
    let slotCtx = ctx;
    if (arg === 'ref' || arg === 'group') slotCtx = retarget(ctx, arg);
    else if (arg) slotCtx = { ...ctx, arg }; // pass-through arg for module fns
    return applyFilters(resolveSlot(name, slotCtx, depth, trace), filters);
  });
}

function smooth(text) {
  return text
    .replace(/ {2,}/g, ' ')            // collapse runs of spaces
    .replace(/ ([.,!?;:])/g, '$1')     // space before punctuation
    .replace(/\.{2,}/g, '.')           // ".." artifacts (preserves "…")
    .replace(/(^|[.!?] )([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase())
    .trim();
}

// render(template, ctx, opts) — the single public entry point. Never throws;
// unknown modules resolve to "" with a dev warning.
// opts.trace: array to collect { key, text, leaf, depth } per resolved slot.
// opts.noSmooth: skip whitespace/punctuation cleanup (normally leave it on).
export function render(template, ctx, opts = {}) {
  if (ctx) ctx.renderStems = new Set();          // per-passage dedupe scope
  let text = String(template).replace(/\{\{/g, ESCAPE_TOKEN);
  text = resolveText(text, ctx, 0, opts.trace || null);
  text = text.replace(new RegExp(ESCAPE_TOKEN, 'g'), '{');
  return opts.noSmooth ? text : smooth(text);
}
```

### 4.2 `morphology.js`

```js
// Naive inflection + irregular maps, exposed as render filters.
// Corpus verbs are stored third-person singular; transforms normalize
// through de3sg() first. Extend the maps when a form renders wrong —
// the lint harness's morphology table is where wrong forms get pinned.

export const IRREGULAR_PAST = {
  is: 'was', are: 'were', has: 'had', have: 'had', do: 'did', go: 'went',
  come: 'came', sit: 'sat', eat: 'ate', take: 'took', give: 'gave', get: 'got',
  make: 'made', find: 'found', hold: 'held', keep: 'kept', leave: 'left',
  feel: 'felt', stand: 'stood', rise: 'rose', fall: 'fell', sink: 'sank',
  swing: 'swung', spread: 'spread', put: 'put', set: 'set', let: 'let',
  shut: 'shut', hit: 'hit', catch: 'caught', bring: 'brought', buy: 'bought',
  think: 'thought', say: 'said', see: 'saw', run: 'ran', begin: 'began',
  stride: 'strode', slide: 'slid', cling: 'clung', wear: 'wore', tear: 'tore',
  bear: 'bore', draw: 'drew', grow: 'grew', know: 'knew', throw: 'threw',
  sweep: 'swept', creep: 'crept', mean: 'meant', lead: 'led', read: 'read',
  lie: 'lay', lay: 'laid', win: 'won', spin: 'spun', stick: 'stuck',
  shake: 'shook', ride: 'rode',
};
export const IRREGULAR_PLURALS = {
  woman: 'women', man: 'men', foot: 'feet', tooth: 'teeth', child: 'children',
  person: 'people', mouse: 'mice', shelf: 'shelves', half: 'halves',
  life: 'lives', loaf: 'loaves',
};
const IRREGULAR_3SG = { be: 'is', have: 'has', do: 'does', go: 'goes' };
const VOWELS = 'aeiou';

function doublesFinal(w) {
  if (w.length < 3 || w.length > 5) return false;
  const [a, b, c] = [w[w.length - 3], w[w.length - 2], w[w.length - 1]];
  return !VOWELS.includes(a) && VOWELS.includes(b)
    && !VOWELS.includes(c) && !'wxy'.includes(c);
}

export function de3sg(verb) {
  if (/(ss|sh|ch|x|z)es$/.test(verb)) return verb.slice(0, -2);
  if (/oes$/.test(verb)) return verb.slice(0, -2);
  if (/[^aeiou]ies$/.test(verb)) return verb.slice(0, -3) + 'y';
  if (verb.length >= 4 && /[^su]s$/.test(verb)) return verb.slice(0, -1);
  return verb;
}
export function pastTense(verb) {
  const raw = verb.toLowerCase();
  if (IRREGULAR_PAST[raw]) return IRREGULAR_PAST[raw];
  const v = de3sg(raw);
  if (IRREGULAR_PAST[v]) return IRREGULAR_PAST[v];
  if (v.endsWith('e')) return v + 'd';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
  if (doublesFinal(v)) return v + v[v.length - 1] + 'ed';
  return v + 'ed';
}
export function presentParticiple(verb) {
  const v = de3sg(verb.toLowerCase());
  if (v.endsWith('ie')) return v.slice(0, -2) + 'ying';
  if (v.endsWith('e') && !v.endsWith('ee')) return v.slice(0, -1) + 'ing';
  if (doublesFinal(v)) return v + v[v.length - 1] + 'ing';
  return v + 'ing';
}
export function thirdPerson(verb) {
  const v = verb.toLowerCase();
  if (IRREGULAR_3SG[v]) return IRREGULAR_3SG[v];
  if (/(s|sh|ch|x|z)$/.test(v)) return v + 'es';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies';
  return v + 's';
}
export function pluralize(noun) {
  const n = noun.toLowerCase();
  if (IRREGULAR_PLURALS[n]) return IRREGULAR_PLURALS[n];
  if (/(s|sh|ch|x|z)$/.test(n)) return n + 'es';
  if (/[^aeiou]y$/.test(n)) return n.slice(0, -1) + 'ies';
  return n + 's';
}

function matchCase(orig, out) {
  return /^[A-Z]/.test(orig) ? out.charAt(0).toUpperCase() + out.slice(1) : out;
}
export function transformFirstWord(text, fn) {
  return text.replace(/^([A-Za-z']+)/, (w) => matchCase(w, fn(w)));
}
export function transformLastWord(text, fn) {
  return text.replace(/([A-Za-z']+)([^A-Za-z']*)$/, (_, w, t) => matchCase(w, fn(w)) + t);
}
```

---

## Part V — The setting pack

The engine core knows nothing about your game. One file (conventionally
`settingPack.js`, loaded by your app root AND your lint harness before any
render) supplies:

1. **Ladders** — plain data arrays: id ascends with intensity. Any stat
   that changes prose gets one (exhaustion, suspicion, corruption, body
   size…).
2. **The subject deriver** — maps your character object to `ctx.d`.
3. **Dimensions** — `registerDimension` for anything your `when` clauses
   key on beyond the deriver's output. Comparison dimensions belong here
   too: a `relSize` dimension that buckets `subject.stat / ref.stat` into
   `much_smaller … much_larger` gives you two-character scenes for free.
   Production thresholds that read right for bodies: ratio < 0.6
   `much_smaller`, < 0.85 `smaller`, ≤ 1.18 `similar`, ≤ 1.67 `larger`,
   else `much_larger` (null when either side is missing).
4. **Stem-tracked namespaces** — `trackStemsFor('yourScene.')` for every
   prose namespace.
5. **Identity modules** — `subject.name`, `subject.first`, `ref.name`, the
   pronoun set, and any numeric-stat slots. Templates use these
   everywhere; a game without them renders empty names. Write lexicon
   entries with `{subject.they}`/`{subject.them}`/`{subject.their}` and
   they port across any cast.
6. **The lexicon** — your `word.*` pools (authoring law in Part VI).

The worked example below is a detective noir game — deliberately a
different genre from the engine's origin, to show nothing is genre-bound.
It is also the content the lint harness in Part VII runs against, and it
demonstrates every load-bearing pattern: ladder bands, psych registers,
optional adverbials, fact assertion, and a composed skeleton.

### 5.1 `settingPack.js`

```js
// ═══════════════════════════════════════════════════════════════
// SETTING PACK — everything game-specific, in one file.
// Worked example: a detective noir game (deliberately a different
// genre from the engine's origin, to prove nothing is genre-bound).
// Your game replaces the ladders, deriver, dimensions, and lexicon;
// the identity-module section ports unchanged.
// ═══════════════════════════════════════════════════════════════
import {
  registerSubjectDeriver, registerDimension, trackStemsFor,
  registerModule, registerPool,
} from './engine.js';

// ── 1. Ladders — plain data, id ascends with intensity ────────
export const EXHAUSTION = [
  { id: 0, key: 'fresh',  min: 0 },
  { id: 1, key: 'worn',   min: 30 },
  { id: 2, key: 'ragged', min: 60 },
  { id: 3, key: 'hollow', min: 85 },
];
export const ladder = (defs, v) => [...defs].reverse().find((s) => v >= s.min) ?? defs[0];

// ── 2. The subject deriver — character object → ctx.d ─────────
registerSubjectDeriver((det, ref) => ({
  subjectId: det.id ?? null,
  exhaustion: ladder(EXHAUSTION, det.fatigue ?? 0).id,
  integrity: det.bribesTaken > 2 ? 'bent' : det.bribesTaken > 0 ? 'bending' : 'straight',
  mood: det.mood ?? null,
  caseHeat: det.caseHeat ?? 0,
}));

// ── 3. Extra dimensions (usable in `when` immediately) ────────
registerDimension('cityDistrict', (ctx) => ctx.globals?.district ?? 'downtown');
registerDimension('rainState', (ctx) => ctx.globals?.rain ?? 'dry');

// ── 4. Stem-tracked namespaces ────────────────────────────────
trackStemsFor('case.');
trackStemsFor('office.');

// ── 5. Identity modules — every game needs these ──────────────
// Templates use {subject.name} etc. everywhere; register them here.
// registerModule (best mode): identity is a lookup, not a pool.
registerModule('subject.name', [
  { when: {}, text: [(ctx) => ctx.subject?.name || 'Someone'] },
]);
registerModule('subject.first', [
  { when: {}, text: [(ctx) => (ctx.subject?.name || 'Someone').split(' ')[0]] },
]);
registerModule('ref.name', [
  { when: {}, text: [(ctx) => ctx.ref?.name || 'someone'] },
]);
// Pronoun slots read subject.pronouns ('she' | 'he' | 'they'; default
// per game). Lexicon written with {subject.they}/{subject.them}/… ports
// across any cast.
const PRONOUN_SETS = {
  she:  { they: 'she',  them: 'her',  their: 'her',   theirs: 'hers',   themself: 'herself' },
  he:   { they: 'he',   them: 'him',  their: 'his',   theirs: 'his',    themself: 'himself' },
  they: { they: 'they', them: 'them', their: 'their', theirs: 'theirs', themself: 'themself' },
};
for (const slot of ['they', 'them', 'their', 'theirs', 'themself']) {
  registerModule(`subject.${slot}`, [
    { when: {}, text: [(ctx) => (PRONOUN_SETS[ctx.subject?.pronouns] || PRONOUN_SETS.he)[slot]] },
  ]);
}
// Numeric-stat slots are one-liners in the same shape:
registerModule('subject.fatigue', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.subject?.fatigue ?? 0))] },
]);

// ── 6. Word-grain lexicon, keyed on the game's own dimensions ─
// Shape: VP-3SG (verb phrase, third-person singular).
registerPool('word.walkVerb', [
  { when: {}, text: ['walks', 'moves', 'heads'] },
  { when: { exhaustionMin: 2 }, weight: 2, text: ['trudges', 'drags {subject.themself}', 'shuffles'] },
  { when: { rainState: 'pouring' }, text: ['splashes', 'hunches'] },
]);
// Shape: ADV (adverbial; empty strings make it optional). Covers every
// EXHAUSTION rung in bands — the coverage rule, demonstrated.
registerPool('word.adv.pace', [
  { when: {}, text: ['', '', 'without hurry'] },
  { when: { exhaustionMax: 1 }, text: ['', 'with the day still in front of {subject.them}'] },
  { when: { exhaustionMin: 2 }, weight: 2, text: ['on borrowed legs', 'slower than yesterday'] },
  { when: { integrity: 'bent' }, weight: 2, text: ['like a man who owes the room money'] },
]);
// Psych register: the same fact reads differently through different minds.
registerPool('word.debtSize', [
  { when: {}, text: ['sizable', 'serious', 'ugly'] },
  { when: { integrity: 'straight' }, weight: 2, text: ['a number he refuses to say out loud'] },
  { when: { integrity: 'bent' }, weight: 2, text: ['a number he has stopped apologizing for'] },
]);

// ── 7. A skeleton + facts — the coherence layer in this genre ─
// Shape: SENT.
// (Prose craft: the skeleton names the character ONCE; sub-beats use
// pronoun slots so composed passages don't drum the name.)
registerPool('case.lightBeat', [
  { when: {}, asserts: { 'office.light': 'off' }, text: [
    'The office is dark when {subject.they} gets there.',
    'No light under the door. {subject.they} lets {subject.themself} in.',
    'The dark office smells of yesterday.',
  ] },
  { when: { caseHeatMin: 3 }, weight: 2, asserts: { 'office.light': 'on' }, text: [
    'The light is already on. {subject.they} did not leave it on.',
  ] },
]);
// Shape: SENT.
registerPool('case.deskBeat', [
  { when: {}, text: [
    '{subject.they} drops the file on the desk.',
    'The file lands on the blotter.',
    '{subject.they} sets the folder down where the coffee ring lives.',
  ] },
  // Impossible after the dark-office fact — the contradiction guard blocks it:
  { when: {}, asserts: { 'office.light': 'off' }, weight: 2, text: [
    '{subject.they} reads by the window instead of touching the lamp.',
  ] },
  { when: {}, requires: { 'office.light': 'on' }, weight: 4, text: [
    'Whoever turned the light on left the file square in its center.',
  ] },
]);
// Shape: SKELETON — the composed beat. 3+ skeleton shapes so sentence
// rhythm varies, not just word choice.
registerPool('case.arrival', [
  { when: {}, text: [
    '{subject.name} {word.walkVerb} in{word.adv.pace|prefix: }. {case.lightBeat} {case.deskBeat}',
    '{case.lightBeat} {subject.name} {word.walkVerb} in{word.adv.pace|prefix: }. {case.deskBeat}',
    '{subject.name} {word.walkVerb} in. {case.lightBeat} {case.deskBeat}',
  ] },
]);
// render('{case.arrival}', ctx) can never say the light is both on and
// off. That is the whole trick, in any genre.
```

---

## Part VI — Authoring law

These rules are what keep a thousand small fragments composable. The lint
harness (Part VII) enforces the testable ones.

### 6.1 Shape contracts

Every pool declares ONE shape in a header comment. All texts in the pool
MUST fit it — that is what makes recombination grammatical.

| Shape | Contract | Example |
|---|---|---|
| `ADJ` | bare adjective, lowercase, no period | "rain-soaked" |
| `NP` | noun phrase, no article (compose with `\|a`) | "dead-end lead" |
| `VP-3SG` | verb phrase, 3rd-person singular present | "checks the lock twice" |
| `ADV` | adverbial, lowercase, MAY be empty string | "without hurry", "" |
| `PP` | prepositional/clausal tail | "past the file cabinets" |
| `CLAUSE` | participial clause, reads after a comma | "his coat still dripping" |
| `SENT` | full sentence with terminal punctuation | |
| `LINE` | dialogue beat | |
| `SKELETON` | template stitching sub-pools | `"{a} {b}{c\|prefix:, }."` |

Empty-string entries in `ADV`/`PP`/`CLAUSE` pools are the sanctioned way to
make a modifier optional. Tense and number change at the SLOT via filters,
never by duplicating entries.

### 6.2 The twelve commandments of pools

1. Namespace keys `feature.beatName`; one prefix per feature.
2. Shape comment above every pool.
3. **Every pool has a `{ when: {} }` fallback with ≥3 texts.** No exceptions
   (an optional pool's fallback includes empty strings, and the pool is
   listed in the lint pack's optional-empty set).
4. **Wildcard texts are tone-neutral.** There are no NOT-conditions: a
   wildcard can fire while the character is exhausted, grieving, or
   euphoric, so it must read correctly under ANY state ("she crosses the
   room" qualifies; "she bounces in cheerfully" gets a `mood` key). Any
   fragment carrying tier-specific psychology gets a gate, full stop.
5. Keep pool texts under ~200 characters; longer means you skipped
   decomposition.
6. Persona lines (character-unique voice) key on the character id at
   `weight: 4`, pooled WITH trait-keyed generics at `weight: 2` that use
   `{subject.name}` — identity dominates, psychology still shades.
7. Compose skeletons from sub-pools; sub-pools from `word.*`; reuse the
   lexicon instead of re-describing. Give each beat 3–6 skeleton shapes so
   sentence rhythm varies, not just word choice.
8. **The skeleton names the character once; sub-beats use pronoun slots.**
   Composed passages that say the name in every sentence read like a
   police report, and the name is the one stem dedupe won't save you from.
9. Stateful prose declares its state: `asserts` when text establishes a
   physical fact, `requires`/`forbids` when text assumes one.
10. Every state-relevant pool covers EVERY applicable rung of its ladder
    (exact value or Min/Max bands). Count before committing; the lint
    coverage layer errors on gaps.
11. Every dialogue/interior word pool carries at least one
    psychology-keyed variant group (the register convention) — a timid
    character and a brazen one must not pull identical word lists.
12. Big systematic corpora live in data files; a loop builds the variants
    and ALWAYS appends the generic fallback:

```js
function buildVariants(chunks) {
  const variants = chunks.flatMap((c) =>
    c.moods.map((mood) => ({ when: { mood, district: c.district }, text: c.texts }))
  );
  variants.push({ when: {}, text: [ /* ≥3 generic fallbacks */ ] });
  return variants;
}
registerPool('street.corner', buildVariants(CORNER_CHUNKS));
```

### 6.3 The optionality pattern

```
"{subject.name} {word.walkVerb} in{word.adv.pace|prefix: }{case.rainTail|prefix:, }."
```

If `word.adv.pace` resolves empty its leading space vanishes; if
`case.rainTail` is empty the comma goes with it. `smooth()` cleans the rest.
This one pattern produces most of the surface-form variety.

### 6.4 Psych registers

The same fact reads differently through different minds. Implement as
overlay variants keyed on your psychology dimensions:

```js
registerPool('word.debtSize', [
  { when: {}, text: ['sizable', 'serious', 'ugly'] },
  { when: { integrity: 'straight' }, weight: 2, text: ['a number he refuses to say out loud'] },
  { when: { integrity: 'bent' }, weight: 2, text: ['a number he has stopped apologizing for'] },
]);
```

### 6.5 `weight` vs `priority`

`weight` tunes shares among co-eligible variants — flavor. `priority` is a
hard gate that silences everything below it — suppression. The known case
where you need the gate: a skeleton pool whose variants are shaped per
psychology tier. In pool mode the wildcard skeleton stays RNG-eligible, so
a tier-0-shaped fallback leaks into tier-2 renders as a rare wrong-register
event that playtesting misses. `priority: 1` on the tier-shaped variants is
the fix. Document every `priority` use with a comment saying what it
suppresses.

### 6.6 The standard lexicon inventory

The `word.*` families every game builds before its first feature, in build
order. Names are conventions; shapes are law. Counts are launch floors at
wildcard — keyed variants come on top.

| Pool family | Shape | Keyed on | Wildcard floor |
|---|---|---|---|
| `word.<quality>` — the game's central quality (size, exhaustion, suspicion…) | ADJ | main ladder × psych overlay | 6 |
| `word.<thing>` — the described thing itself (body, office, evidence…) | NP | type × ladder band | 6 |
| `word.moveVerb` (+ `.sit`, `.rise` sub-pools as scenes demand) | VP-3SG | ladder + scenario | 8 |
| `word.adv.pace`, `word.adv.<axis>Qual` | ADV | psych / ladder | 4 + `""` entries |
| `word.<prop>.*` — whatever the state model tracks (garments, gear, rooms) | CLAUSE / PP | state dims (fit, damage…) | 3 per state |
| `word.<sense>` — sound / smell / light texture of the setting | NP / CLAUSE | locale / season | 4 |

Seeding method: fill each wildcard with the ten most concrete words the
setting owns, then expand axis by axis — at each ladder rung and psych tier
ask "which of these words become MORE true here, and what word exists
*only* here?" The only-here words are the ones players remember; spend most
of the authoring budget on them.

---

## Part VII — The lint harness

The harness is two files: a generic `textLint.mjs` you copy verbatim, and a
`lintPack.js` you own — sweep templates, the state grid, ladder-coverage
spec, banned patterns, continuity sweeps, morphology table. Run
`node textLint.mjs` until clean before every commit; exit non-zero is the
only quality signal that matters.

Four layers:

- **Layer 1 — static** over `_registryEntries()`: wildcard fallback present
  (error) with ≥3 texts (warning); all-empty wildcard on a pool not
  declared optional (error); no pool text over 200 chars — the monolith
  detector (error); every `{slot}` reference resolves to a registered key
  (error); fact field shapes valid, topics `domain.instance` (error);
  facts asserted but never read (warning); word pools without a
  psych-keyed variant group (warning, exempt list); ladder coverage per
  the lint pack spec (error).
- **Layer 2 — dynamic sweep**: each flagship template rendered across the
  full state grid, several renders per cell. Error on empty output, `{` in
  output, literal "undefined", double spaces, orphaned punctuation, banned
  patterns. Warn when >5% of cells render identically every time.
- **Layer 3 — coherence** (rate-based so RNG can't flake CI): stem the
  output of every sweep render, error when >1% of renders contain any stem
  3+ times (cast names excluded — identity is not imagery); a permanent
  contradiction probe (assert `seated`, verify a `standing`-asserting
  variant never surfaces across 200 renders while a `requires`-gated one
  always does); one continuity sweep per stateful feature, declared in the
  lint pack.
- **Layer 4 — morphology table**: fixed input/output pairs per filter
  asserted equal, plus every corpus verb run through `past`/`ing` with junk
  endings (`eded`, `inging`, `sss`) as errors.

Content files register pools at import time; a `scenes/index.js` barrel
imports every content file so the harness sees the full registry. **A file
missing from the barrel does not exist.**

The growth protocol: every bug found by hand becomes a lint entry the same
day — a banned-pattern regex, a continuity sweep, a morphology row, a new
grid axis. The production game's quality came from that ratchet, and its
lint pack is several times the size of the starter below. Yours should end
up the same way.

### 7.1 `lintPack.js`

```js
// ═══════════════════════════════════════════════════════════════
// LINT PACK — the game-specific half of the lint harness.
// The harness (textLint.mjs) is generic; this file tells it what to
// sweep, which states to probe, which ladders demand coverage, and
// which phrasings are banned. Grows with the game, forever.
// ═══════════════════════════════════════════════════════════════

// Characters the sweep instantiates (minimum: every distinct cast
// member the deriver treats differently; synthetic is fine).
export const LINT_CHARACTERS = [
  { id: 0, name: 'Ray Vessel', pronouns: 'he', fatigue: 0, bribesTaken: 0, mood: 'flat', caseHeat: 0 },
  { id: 1, name: 'June Calloway', pronouns: 'she', fatigue: 0, bribesTaken: 0, mood: 'sharp', caseHeat: 0 },
];

// The state grid — every combination is rendered RENDERS_PER_CELL times.
// Add an axis the day you add a dimension that changes prose.
export const LINT_GRID = {
  fatigue: [0, 45, 90],            // spans every EXHAUSTION rung
  bribesTaken: [0, 1, 3],          // integrity: straight / bending / bent
  mood: ['flat', 'sharp', 'raw'],
  globals: [
    { district: 'downtown', rain: 'dry' },
    { district: 'docks', rain: 'pouring' },
  ],
};
export const RENDERS_PER_CELL = 5;

// Flagship templates — every feature adds its top-level template here
// the day it ships. A template not swept is a template not tested.
export const SWEEPS = [
  { name: 'case.arrival', root: 'case.arrival', tpl: '{case.arrival}' },
];

// Ladder coverage: pools under these prefixes must cover every rung of
// the named dimension (via exact value or Min/Max bands). `rungs` lists
// the applicable rungs — narrower for content that only exists at some.
export const LADDER_COVERAGE = [
  { prefixes: ['word.adv.pace'], dimension: 'exhaustion', rungs: [0, 1, 2, 3] },
];

// Pools where empty-string wildcard texts are intentional (optional slots).
export const OPTIONAL_EMPTY_POOLS = new Set(['word.adv.pace']);

// Psych-register convention: word.* pools should shade on at least one
// psychology dimension. List your game's psych keys; exempt mechanical
// corpora by prefix.
export const PSYCH_KEYS = /^(integrity|mood)$|^exhaustion(Min|Max)$/;
export const PSYCH_REGISTER_EXEMPT_PREFIXES = ['word.walkVerb'];

// Style ledger, automated. Grows every tuning batch — when a banned
// construction generalizes, its regex lands here the same day.
export const BANNED_PATTERNS = [
  { pattern: /\. That is /i, message: "narrator tic 'That is X' — fold judgment into behavior" },
  { pattern: /you both know/i, message: 'narrated telepathy — show the behavior' },
  { pattern: /\bsuddenly\b/i, message: 'unearned — build pressure, let it break' },
];

// Continuity sweeps: one per stateful feature. Render setup (asserts a
// fact), then probe the descriptor pool; the forbidden phrasing must
// never surface while the fact holds.
export const CONTINUITY_SWEEPS = [
  {
    name: 'office light stays off',
    setupTpl: '{case.lightBeat}',
    setupRequiredFact: ['office.light', 'off'],   // only probe when setup asserted this
    probeTpl: '{case.deskBeat}',
    forbidden: /turned the light on/i,
    renders: 100,
  },
];

// Morphology table — pin every filter with fixed pairs; extend when a
// corpus verb renders wrong.
export const MORPH_CASES = [
  ['past', 'walks', 'walked'], ['past', 'strides', 'strode'],
  ['past', 'carries', 'carried'], ['past', 'is', 'was'],
  ['past', 'slips', 'slipped'], ['past', 'goes', 'went'],
  ['ing', 'walks', 'walking'], ['ing', 'eases', 'easing'],
  ['ing', 'sits', 'sitting'], ['ing', 'lies', 'lying'],
  ['s3', 'walk', 'walks'], ['s3', 'cross', 'crosses'],
  ['s3', 'carry', 'carries'], ['s3', 'have', 'has'],
  ['plural', 'shelf', 'shelves'], ['plural', 'inch', 'inches'],
  ['plural', 'alley', 'alleys'], ['plural', 'woman', 'women'],
];

// Verb corpus probe: every 3sg verb your lexicon stores, run through
// past/ing, must not produce junk endings.
export const VERB_CORPUS = ['walks', 'moves', 'heads', 'trudges', 'shuffles', 'splashes', 'hunches'];
```

### 7.2 `textLint.mjs`

```js
// ═══════════════════════════════════════════════════════════════
// TEXT LINT — generic four-layer harness. Run: node textLint.mjs
// Exit non-zero on any error. Game specifics live in lintPack.js.
// ═══════════════════════════════════════════════════════════════
import './settingPack.js';
// import './scenes/index.js';   // barrel of every content file, once you have one
import {
  _registryEntries, _moduleOpts, hasModule, createContext, createFacts,
  render, registerPool, stemsOf,
} from './engine.js';
import { pastTense, presentParticiple, thirdPerson, pluralize } from './morphology.js';
import {
  LINT_CHARACTERS, LINT_GRID, RENDERS_PER_CELL, SWEEPS,
  LADDER_COVERAGE, OPTIONAL_EMPTY_POOLS, PSYCH_KEYS,
  PSYCH_REGISTER_EXEMPT_PREFIXES, BANNED_PATTERNS, CONTINUITY_SWEEPS,
  MORPH_CASES, VERB_CORPUS,
} from './lintPack.js';

const errors = [], warnings = [];
const err = (m) => errors.push(m);
const warning = (m) => warnings.push(m);
const entries = _registryEntries();
const registeredKeys = new Set(entries.map(([k]) => k));
const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?(?:\|[^}]*)?\}/g;
const STEM_TRIPLE_MAX_PCT = 1;

function* stringTexts(variants) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const text of arr) if (typeof text === 'string') yield { variant: v, text };
  }
}

// ── Layer 1 — static checks ───────────────────────────────────
for (const [key, variants] of entries) {
  const isPool = _moduleOpts(key).select === 'pool';
  const label = `${isPool ? 'pool' : 'module'} "${key}"`;

  // Wildcard fallback presence + depth.
  const wildcards = variants.filter((v) => !v.when || Object.keys(v.when).length === 0);
  if (!wildcards.length) (isPool ? err : warning)(`${label}: no { when: {} } fallback`);
  const wcTexts = wildcards.reduce((n, v) => n + (Array.isArray(v.text) ? v.text.length : 1), 0);
  if (isPool && wildcards.length && wcTexts < 3) {
    warning(`${label}: only ${wcTexts} wildcard text(s) — aim for ≥3`);
  }
  if (isPool && !OPTIONAL_EMPTY_POOLS.has(key)) {
    const nonEmpty = wildcards
      .flatMap((v) => (Array.isArray(v.text) ? v.text : [v.text]))
      .filter((t) => typeof t !== 'string' || t.trim()).length;
    if (wildcards.length && nonEmpty === 0) err(`${label}: wildcard is all empty strings but pool is not in OPTIONAL_EMPTY_POOLS`);
  }

  for (const { text } of stringTexts(variants)) {
    // Monolith detector.
    if (isPool && text.length > 200) {
      err(`${label}: ${text.length}-char text — decompose into skeleton + fragments: "${text.slice(0, 60)}…"`);
    }
    // Every referenced slot resolves.
    SLOT_RE.lastIndex = 0;
    let m;
    while ((m = SLOT_RE.exec(text))) {
      const [, name, arg] = m;
      const refs = name === 'join'
        ? (arg || '').split(',').map((k) => k.trim()).filter(Boolean) : [name];
      for (const ref of refs) {
        if (!ref.startsWith('subject.') && !ref.startsWith('ref.') && !registeredKeys.has(ref)) {
          err(`${label}: references unregistered module "{${ref}}"`);
        }
      }
    }
    // Banned patterns, statically.
    for (const { pattern, message } of BANNED_PATTERNS) {
      if (pattern.test(text)) warning(`${label}: banned pattern (${message}): "${text.slice(0, 60)}…"`);
    }
  }

  // Fact field shapes; collect topics for the dead-fact warning.
}
const TOPIC_RE = /^[a-z][\w.]*$/;
const SCALARS = new Set(['string', 'boolean', 'number']);
const factValueOk = (v) => SCALARS.has(typeof v) || (Array.isArray(v) && v.every((x) => SCALARS.has(typeof x)));
const assertedTopics = new Map(), readTopics = new Set();
for (const [key, variants] of entries) {
  for (const v of variants) {
    for (const field of ['requires', 'forbids', 'asserts']) {
      const val = v[field];
      if (val == null) continue;
      if (Array.isArray(val)) {
        if (field !== 'forbids') { err(`${key}: ${field} must be an object`); continue; }
        for (const t of val) {
          if (typeof t !== 'string' || !TOPIC_RE.test(t)) err(`${key}: forbids topic "${t}" malformed`);
          else readTopics.add(t);
        }
        continue;
      }
      if (typeof val !== 'object') { err(`${key}: ${field} must be an object`); continue; }
      for (const [t, tv] of Object.entries(val)) {
        if (!TOPIC_RE.test(t)) err(`${key}: ${field} topic "${t}" must be domain.instance`);
        if (!factValueOk(tv)) err(`${key}: ${field}.${t} value must be scalar or scalar array`);
        if (field === 'asserts') {
          if (!assertedTopics.has(t)) assertedTopics.set(t, new Set());
          assertedTopics.get(t).add(key);
        } else readTopics.add(t);
      }
    }
  }
}
for (const [topic, keys] of assertedTopics) {
  if (!readTopics.has(topic)) {
    warning(`fact "${topic}" asserted (${[...keys].slice(0, 3).join(', ')}) but never read — dead weight`);
  }
}

// Psych-register convention.
for (const [key, variants] of entries) {
  if (!key.startsWith('word.')) continue;
  if (_moduleOpts(key).select !== 'pool') continue;
  if (PSYCH_REGISTER_EXEMPT_PREFIXES.some((p) => key.startsWith(p))) continue;
  const hasPsych = variants.some((v) => v.when && Object.keys(v.when).some((k) => PSYCH_KEYS.test(k)));
  if (!hasPsych) warning(`pool "${key}": no psych-keyed variant group`);
}

// Ladder coverage.
function coversRung(variant, dim, rung) {
  const w = variant.when || {};
  if (w[dim] != null) return Array.isArray(w[dim]) ? w[dim].includes(rung) : w[dim] === rung;
  const min = w[`${dim}Min`], max = w[`${dim}Max`];
  if (min == null && max == null) return false;
  return rung >= (min ?? -Infinity) && rung <= (max ?? Infinity);
}
for (const { prefixes, dimension, rungs } of LADDER_COVERAGE) {
  for (const [key, variants] of entries) {
    if (!prefixes.some((p) => key.startsWith(p))) continue;
    for (const rung of rungs) {
      if (!variants.some((v) => coversRung(v, dimension, rung))) {
        err(`coverage: ${key} has no variant covering ${dimension}=${rung}`);
      }
    }
  }
}

// ── Layer 2 — dynamic sweep ───────────────────────────────────
const ARTIFACTS = [
  ['{', 'unresolved slot'], ['undefined', 'literal "undefined"'],
  [' ,', 'space before comma'], ['and .', 'dangling "and"'],
  [', .', 'orphaned comma'], ['  ', 'double space'],
];
let cells = 0, rendersDone = 0, lowVariety = 0;
let stemTripleRenders = 0;
const stemTripleExamples = [];
// Cast names are identity, not imagery — exclude them from the slop gate.
const NAME_STEMS = new Set(LINT_CHARACTERS.flatMap((c) => stemsOf(c.name)));
function checkStems(name, out, meta) {
  const counts = new Map();
  for (const s of stemsOf(out)) {
    if (NAME_STEMS.has(s)) continue;
    counts.set(s, (counts.get(s) || 0) + 1);
  }
  for (const [s, n] of counts) {
    if (n >= 3) {
      stemTripleRenders++;
      if (stemTripleExamples.length < 5) stemTripleExamples.push(`${name}: stem "${s}" ×${n} (${meta}): "${out.slice(0, 100)}"`);
      return;
    }
  }
}
for (const sweep of SWEEPS) {
  if (!hasModule(sweep.root)) { warning(`sweep ${sweep.name}: root module missing — skipped`); continue; }
  for (const base of LINT_CHARACTERS) {
    for (const fatigue of LINT_GRID.fatigue) {
      for (const bribesTaken of LINT_GRID.bribesTaken) {
        for (const mood of LINT_GRID.mood) {
          for (const globals of LINT_GRID.globals) {
            const subject = { ...base, fatigue, bribesTaken, mood };
            const ctx = createContext({ subject, week: 3, globals });
            const outs = new Set();
            for (let i = 0; i < RENDERS_PER_CELL; i++) {
              ctx.facts = createFacts();     // fresh scene per render
              const out = render(sweep.tpl, ctx);
              rendersDone++;
              if (!out || !out.trim()) {
                err(`${sweep.name}: empty render (char=${base.name} fatigue=${fatigue} bribes=${bribesTaken} mood=${mood})`);
                continue;
              }
              for (const [needle, desc] of ARTIFACTS) {
                if (out.includes(needle)) {
                  err(`${sweep.name}: ${desc} (char=${base.name} fatigue=${fatigue}): "${out.slice(0, 120)}"`);
                  break;
                }
              }
              for (const { pattern, message } of BANNED_PATTERNS) {
                if (pattern.test(out)) err(`${sweep.name}: banned pattern in output (${message}): "${out.slice(0, 100)}"`);
              }
              checkStems(sweep.name, out, `char=${base.name} fatigue=${fatigue}`);
              outs.add(out);
            }
            cells++;
            if (outs.size === 1 && RENDERS_PER_CELL > 1) lowVariety++;
          }
        }
      }
    }
  }
}
if (cells > 0 && lowVariety / cells > 0.05) {
  warning(`sweep: ${lowVariety}/${cells} cells rendered identically ${RENDERS_PER_CELL}× — variety is low`);
}

// ── Layer 3 — coherence gates (rate-based; RNG can't flake CI) ─
const triplePct = rendersDone ? (100 * stemTripleRenders) / rendersDone : 0;
console.log(`stem dedupe: ${stemTripleRenders}/${rendersDone} renders carry a 3×-repeated stem (${triplePct.toFixed(2)}%, gate ${STEM_TRIPLE_MAX_PCT}%)`);
if (triplePct > STEM_TRIPLE_MAX_PCT) {
  err(`stem dedupe: ${triplePct.toFixed(1)}% > ${STEM_TRIPLE_MAX_PCT}% of renders contain a 3×-repeated stem`);
  for (const ex of stemTripleExamples) warning(ex);
}

// Contradiction probe — registered here on purpose; probes, not content.
registerPool('lint.factCheck.first', [
  { when: {}, asserts: { 'lint.posture': 'seated' }, text: [
    'She sits.', 'She settles into the chair.', 'She takes a seat.',
  ] },
]);
registerPool('lint.factCheck.second', [
  { when: {}, asserts: { 'lint.posture': 'standing' }, text: ['LINT-CONTRADICTION'] },
  { when: {}, requires: { 'lint.posture': 'seated' }, text: [
    'Still seated.', 'Still seated, comfortably.', 'Still seated — no hurry.',
  ] },
]);
for (let i = 0; i < 200; i++) {
  const ctx = createContext({ subject: LINT_CHARACTERS[0], week: 2 });
  const out = render('{lint.factCheck.first} {lint.factCheck.second}', ctx);
  rendersDone++;
  if (out.includes('LINT-CONTRADICTION')) { err(`factCheck: contradiction guard failed (render ${i})`); break; }
  if (!out.includes('Still seated')) { err(`factCheck: requires-gated variant did not render (render ${i}): "${out}"`); break; }
}

// Continuity sweeps from the pack.
for (const cs of CONTINUITY_SWEEPS) {
  let probed = 0;
  for (let i = 0; i < cs.renders; i++) {
    const facts = createFacts();
    render(cs.setupTpl, createContext({ subject: LINT_CHARACTERS[0], week: 3, facts }));
    if (cs.setupRequiredFact && facts.get(cs.setupRequiredFact[0]) !== cs.setupRequiredFact[1]) continue;
    const out = render(cs.probeTpl, createContext({ subject: LINT_CHARACTERS[0], week: 3, facts }));
    rendersDone++; probed++;
    if (cs.forbidden.test(out)) { err(`continuity "${cs.name}": forbidden phrasing surfaced (render ${i}): "${out}"`); break; }
  }
  if (probed === 0) warning(`continuity "${cs.name}": setup never asserted the required fact — probe never ran`);
}

// ── Layer 4 — morphology table ────────────────────────────────
const MORPH_FNS = { past: pastTense, ing: presentParticiple, s3: thirdPerson, plural: pluralize };
for (const [filter, input, want] of MORPH_CASES) {
  const got = MORPH_FNS[filter](input);
  if (got !== want) err(`morphology: ${filter}("${input}") = "${got}", want "${want}"`);
}
const BROKEN = /(eded|inging|sss|ieed)$/;
for (const verb of VERB_CORPUS) {
  for (const fn of [pastTense, presentParticiple]) {
    const out = fn(verb);
    if (BROKEN.test(out)) err(`morphology: ${fn.name}("${verb}") = "${out}" — extend the irregular maps`);
  }
}

// ── report ────────────────────────────────────────────────────
console.log(`textLint: ${entries.length} modules, ${cells} sweep cells, ${rendersDone} renders`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (errors.length) {
  console.log(`\n✖ ${errors.length} error(s):`);
  for (const e of errors) console.log(`  ✖ ${e}`);
  process.exit(1);
}
console.log('✔ clean');
```

---

## Part VIII — Mechanism self-check and build order

### 8.1 `smoke.mjs`

Nineteen assertions that pin every engine mechanism: pool variety, silent
unknowns, week ranges, specificity math, ladder gating, the fact ledger,
render-scope dedupe, session repeat penalty, the priority gate, all seven
filters, `{join}`, brace escaping, smoothing behavior (including the `\n\n`
gotcha), `:ref` retargeting, pronoun modules, trace, the slot inspector,
seasons, and seeded replay. Run it after copying Part IV; run it again any
time you touch the engine. If you reimplement the engine in another
language, port this file first — it IS the spec in executable form.

```js
// Phase-1/2 verification from the manifesto build order — engine mechanics
// pinned by assertion. Run: node smoke.mjs
import './settingPack.js';
import {
  createContext, createFacts, createSessionUsed, render, registerPool,
  stemsOf, getSeason, getEligibleVariants, setRandomSource, seededRandom,
} from './engine.js';
import assert from 'node:assert';

const det = (over = {}) => ({
  id: 0, name: 'Ray Vessel', pronouns: 'he',
  fatigue: 0, bribesTaken: 0, mood: 'flat', caseHeat: 0, ...over,
});
const ctxOf = (over = {}, raw = {}) => createContext({ subject: det(over), week: 3, ...raw });

// 1. Two-variant pool: both texts appear across renders.
registerPool('t.two', [{ when: {}, text: ['alpha', 'beta'] }]);
{
  const seen = new Set();
  for (let i = 0; i < 60; i++) seen.add(render('{t.two}', ctxOf()));
  assert(seen.has('Alpha') && seen.has('Beta'), `both texts appear (saw ${[...seen]})`);
}

// 2. Unknown module renders "" (never throws).
assert.equal(render('{t.missing}', ctxOf()), '');

// 3. weekMin/weekMax work via the generalized rule (regression: `week`
//    must be seeded onto ctx.d).
registerPool('t.week', [
  { when: {}, text: ['early'] },
  { when: { weekMin: 10 }, weight: 1000, text: ['late'] },
]);
assert.equal(render('{t.week}', createContext({ subject: det(), week: 3 })), 'Early');
assert.equal(render('{t.week}', createContext({ subject: det(), week: 12 })), 'Late');

// 4. Specificity weighting: 2-condition variant outweighs wildcard 9:1.
registerPool('t.spec', [
  { when: {}, text: ['generic'] },
  { when: { integrity: 'bent', mood: 'flat' }, text: ['specific'] },
]);
{
  let specific = 0;
  for (let i = 0; i < 400; i++) {
    if (render('{t.spec}', ctxOf({ bribesTaken: 3 })) === 'Specific') specific++;
  }
  assert(specific > 300 && specific < 395, `specific ≈90% (got ${specific}/400)`);
}

// 5. Ladder-derived dimension gates content (exhaustion via deriver).
{
  const outs = new Set();
  for (let i = 0; i < 80; i++) outs.add(render('{word.walkVerb}', ctxOf({ fatigue: 90 })));
  assert([...outs].some((o) => /trudges|drags|shuffles/i.test(o)), 'ragged verbs surface at high fatigue');
  const fresh = new Set();
  for (let i = 0; i < 80; i++) fresh.add(render('{word.walkVerb}', ctxOf()));
  assert(![...fresh].some((o) => /trudges|drags|shuffles/i.test(o)), 'ragged verbs never at fatigue 0');
}

// 6. Fact ledger: contradiction guard + requires, shared facts across renders.
{
  for (let i = 0; i < 200; i++) {
    const facts = createFacts();
    const c1 = createContext({ subject: det({ caseHeat: 5 }), week: 3, facts });
    const first = render('{case.lightBeat}', c1);
    const c2 = createContext({ subject: det({ caseHeat: 5 }), week: 3, facts });
    const second = render('{case.deskBeat}', c2);
    const lightOn = facts.get('office.light') === 'on';
    if (lightOn) assert(!/window instead of touching the lamp/i.test(second), 'no dark-office line after light-on fact');
    else assert(!/turned the light on/i.test(second), 'no light-on line after dark fact');
    assert(first.length > 0 && second.length > 0);
  }
}

// 7. Stem dedupe: a word.* stem used earlier in the same render is near-blocked.
registerPool('word.t.echo', [{ when: {}, text: ['trudges heavily'] }]);
registerPool('word.t.echo2', [
  { when: {}, text: ['trudges again', 'keeps going'] },
]);
{
  let echoed = 0;
  for (let i = 0; i < 300; i++) {
    const out = render('{word.t.echo} {word.t.echo2}', ctxOf());
    if (/trudges.*trudges/i.test(out)) echoed++;
  }
  // 0.02 penalty ≈ 2% of picks; allow slack.
  assert(echoed < 30, `render-scope dedupe suppresses repeats (echoed ${echoed}/300)`);
}

// 8. Session repeat penalty: same line rarely twice running in one event.
registerPool('t.sess', [{ when: {}, text: ['one', 'two'] }]);
{
  let repeats = 0;
  for (let i = 0; i < 300; i++) {
    const sessionUsed = createSessionUsed();
    const a = render('{t.sess}', createContext({ subject: det(), week: 3, sessionUsed }));
    const b = render('{t.sess}', createContext({ subject: det(), week: 3, sessionUsed }));
    if (a === b) repeats++;
  }
  // Unpenalized would repeat ~50%; 0.12 penalty predicts ~11%.
  assert(repeats < 75, `session penalty works (repeats ${repeats}/300)`);
}

// 9. Priority is a hard gate in pool mode.
registerPool('t.prio', [
  { when: {}, text: ['base'] },
  { when: { mood: 'raw' }, priority: 1, text: ['gated'] },
]);
{
  const outs = new Set();
  for (let i = 0; i < 60; i++) outs.add(render('{t.prio}', ctxOf({ mood: 'raw' })));
  assert.deepEqual([...outs], ['Gated'], 'only max-priority variants survive');
  assert.equal(render('{t.prio}', ctxOf()), 'Base');
}

// 10. Filters: a / cap / past / ing / s3 / plural / prefix vanishing.
registerPool('t.noun', [{ when: {}, text: ['empty room'] }]);
registerPool('t.verb', [{ when: {}, text: ['strides out'] }]);
registerPool('t.empty', [{ when: {}, text: [''] }]);
assert.equal(render('{t.noun|a}', ctxOf(), { noSmooth: true }), 'an empty room');
assert.equal(render('{t.verb|past}', ctxOf(), { noSmooth: true }), 'strode out');
assert.equal(render('{t.verb|ing}', ctxOf(), { noSmooth: true }), 'striding out');
assert.equal(render('{t.noun|plural}', ctxOf(), { noSmooth: true }), 'empty rooms');
assert.equal(render('x{t.empty|prefix:, }y', ctxOf(), { noSmooth: true }), 'xy');

// 11. {join} drops empties and glues survivors.
registerPool('t.ja', [{ when: {}, text: ['coat soaked'] }]);
registerPool('t.jb', [{ when: {}, text: [''] }]);
registerPool('t.jc', [{ when: {}, text: ['hat gone'] }]);
assert.equal(
  render('{join:t.ja,t.jb,t.jc}', ctxOf(), { noSmooth: true }),
  'coat soaked and hat gone',
);

// 12. {{ escapes a literal brace.
assert.equal(render('{{literal}', ctxOf(), { noSmooth: true }), '{literal}');

// 13. smooth(): punctuation cleanup + capitalization (NOT after \n\n).
registerPool('t.lc', [{ when: {}, text: ['lower start.'] }]);
assert.equal(render('{t.lc} {t.lc}', ctxOf()), 'Lower start. Lower start.');
assert.equal(render('{t.lc}\n\n{t.lc}', ctxOf()), 'Lower start.\n\nlower start.');

// 14. :ref retargeting re-derives dimensions for the reference character.
registerPool('t.who', [{ when: {}, text: ['{subject.first}'] }]);
{
  const ctx = createContext({ subject: det(), ref: det({ id: 1, name: 'June Calloway' }), week: 3 });
  assert.equal(render('{t.who}', ctx, { noSmooth: true }), 'Ray');
  assert.equal(render('{t.who:ref}', ctx, { noSmooth: true }), 'June');
}

// 15. Pronoun modules follow subject.pronouns.
{
  const she = createContext({ subject: det({ name: 'June Calloway', pronouns: 'she' }), week: 3 });
  assert.equal(render('{subject.their} desk', she, { noSmooth: true }), 'her desk');
}

// 16. Trace records provenance with leaf flags.
{
  const trace = [];
  render('{case.arrival}', ctxOf(), { trace });
  assert(trace.length >= 3, 'trace collected');
  assert(trace.some((t) => t.leaf), 'leaf fragments present');
  assert(trace.some((t) => t.key === 'case.arrival'), 'root slot traced');
}

// 17. getEligibleVariants reports probabilities for the state.
{
  const rows = getEligibleVariants('word.walkVerb', ctxOf({ fatigue: 90 }));
  assert(rows.length >= 2 && rows[0].probability > 0, 'inspector rows with probabilities');
}

// 18. getSeason cycles every 4 weeks.
assert.equal(getSeason(1), 'fall');
assert.equal(getSeason(5), 'winter');

// 19. Seeded RNG: same seed → identical render sequence; falsy restores
//     Math.random. This is what makes flagged samples replayable (Part IX).
{
  const runs = [];
  for (let r = 0; r < 2; r++) {
    setRandomSource(seededRandom(1234));
    const ctx = createContext({ subject: det(), week: 3 });
    const outs = [];
    for (let i = 0; i < 10; i++) outs.push(render('{case.arrival}', ctx));
    runs.push(outs.join('\n'));
  }
  setRandomSource(null);
  assert.equal(runs[0], runs[1], 'seeded runs reproduce exactly');
}

console.log('✔ smoke: all 19 mechanism checks passed');
```

### 8.2 Build order

Each phase is one commit. Do not start phase N+1 until phase N's check
passes. "Clean" means: `node textLint.mjs` exits 0, your project's code
linter passes, and your app builds.

| # | Build | Verify |
|---|---|---|
| 1 | `engine.js` + `morphology.js` verbatim from Part IV | `smoke.mjs` (needs a minimal setting pack — Part V's works) passes all 18 checks |
| 2 | `settingPack.js`: ladders, deriver, dimensions, identity modules for YOUR game | Render `{word.*}` probes at 3 ladder rungs; outputs differ by rung |
| 3 | `lintPack.js` + `textLint.mjs`; wire your grid and sweeps | Deliberately break a fallback and a morphology row; both are caught; fix; clean |
| 4 | First feature: one skeleton + 3 sub-pools + lexicon reuse, per Part VI | Its template in SWEEPS; sweep clean; 20 sample renders read well |
| 5 | Coherence: facts on the feature's stateful beats; stem tracking on its namespace; a continuity sweep in the lint pack | Layer 3 clean |
| 6 | Repeat 4–5 per feature; wire game UI to `render()` calls | Full lint stays clean; play the game |
| 7 | The persistence contract (3.8): share event scopes, persist `weekUsed` | Two renders in one event never contradict or repeat; facts carry across the event |
| 8 | Tooling (Part IX): thread `trace`, build the roll/flag panel | You can roll any beat at any state and see per-slot provenance |

The engine is ~470 lines you copy once. All real effort is content: expect
1 part engine work to 10 parts authoring, forever. That ratio is the sign
you built it right.

---

## Part IX — Tooling and the tuning loop

The engine ships with four hooks that exist for one purpose: making bad
renders traceable to the pool that produced them. Build the thin UI over
them early; it repays itself within a week.

- **`render(tpl, ctx, { trace: [] })`** fills the array with
  `{ key, text, leaf, depth }` per resolved slot. A `leaf` fragment
  contained no further content slots — the natural unit for annotation
  (`subject.*` identity slots don't break leaf status, so sentences with
  `{subject.name}` stay annotatable).
- **`getEligibleVariants(key, ctx)`** returns every variant eligible at a
  state, with computed pick probabilities — the "why did/didn't line X
  fire" inspector.
- **`setRandomSource(seededRandom(seed))`** (3.9) — the dev panel rolls
  each sample under a fresh visible seed, so every flag is replayable as
  the exact text, not a re-roll that may refuse to misbehave.
- **A dev panel** (in-game debug screen or a node REPL script) that: picks
  a beat, locks or randomizes state params, rolls N samples, and lets a
  reader flag a sample with per-slot notes (the trace supplies the slot
  tags). Flagged output looks like:

```
section: case.arrival
state: Ray Vessel · fatigue 90 (ragged) · bribes 3 (bent) · mood raw · rain pouring
seed: 884213
---
<the rendered text>
--- problems ---
[word.adv.pace] "with the day still in front of him" → he's ragged; wrong register
```

### The flag-batch loop

Tuning runs as batches of flagged samples, not one-off edits:

1. Reader rolls and flags; each flag carries the section, the FULL
   generating state, the text, and per-slot notes.
2. Fixer triages the whole batch in one pass, then commits once.
3. Per flag: **locate** (the slot tag names the pool), **reproduce**
   (rebuild the captured state; with a captured seed,
   `setRandomSource(seededRandom(seed))` replays the exact text —
   otherwise render 5–10×), **classify** against the taxonomy below,
   **fix the class** — then **hunt the pattern**: every flag is a sample
   from a class, so grep for siblings before moving on.
4. Re-verify: re-render the captured state until the problem can't appear;
   add the generalized pattern to the lint pack's banned list; lint clean.

| Diagnosis | Signature | Fix pattern |
|---|---|---|
| Missing selector gate | line implies state the character isn't in | add/tighten `when`; write replacement content for the now-empty cell |
| Tier leak through pooling | wildcard surfaces wrong-register psychology | `priority` gate on tier-shaped skeletons; psych-gate the fragment (6.2 #4) |
| Adjacent-beat contradiction | two slots in one skeleton fight | rephrase one side to coexist, or drop the clashing slot from that skeleton |
| Intra-sentence contradiction | independently rolled slots collide ("wearily breezes") | make one pool neutral to the other's axis, or key both on the same axis |
| Shape violation | fragment doesn't fit the slot's declared shape | rewrite to shape |
| Game-logic violation | text describes what game state forbids | gate at the dimension/render level, not just prose |
| Stale-context line | content true in a different beat ("Same time next week" said pre-event) | relocate to the beat where it's true |
| Verbatim correction | reader supplies exact wording | apply exactly; their wording wins |
| Feature request in disguise | "she should ask for X after Y" | new pool: empty wildcard + heavily weighted state-keyed variants (weights 6–12 make conditional behavior reliable), wired with `{slot\|prefix: }` |

When a fix generalizes, it becomes a **style-ledger** entry: a short rule
plus, wherever mechanically detectable, a regex in the lint pack's
`BANNED_PATTERNS`. The ledger is append-only and lives with the lint pack;
new prose is checked against it, not just fixed prose. Migration is
finished when a flag batch comes back boring.

---

## Part X — Pitfalls (each observed in practice)

1. **Writing a paragraph as one variant.** The monolith detector exists
   because everyone does this. Decompose: skeleton + fragments.
2. **Forgetting the fallback.** One missing `{ when: {} }` = intermittent
   blank prose that playtesting misses and the sweep catches instantly.
3. **Registering content but not adding the file to the barrel.** The game
   renders `""`, the lint can't see the pool. Check the barrel first when a
   key mysteriously doesn't exist.
4. **Escaped quotes in single-quoted strings.** Use backticks for any text
   containing dialogue. This kills a whole bug class.
5. **Pasting the escape token as a raw character.** It's invisible; it gets
   lost in copies; a lost token corrupts every render (3.7). Write
   `'\uE000'`.
6. **A `when` key that reads a value the engine can't see.** Context-level
   values must be seeded onto `ctx.d` or passed via `globals` (3.2), or the
   condition never matches and the content silently never fires.
7. **Fresh event scopes per render.** Facts and session dedupe do nothing
   if each render gets new objects — wire the persistence contract (3.8).
8. **Stemming sentence pools.** Track word/clause namespaces; decompose
   long-passage pools instead of tracking them — stems of a paragraph
   collide on everything.
9. **Uniform-cell repetition.** If EVERY candidate in a pool's state cell
   contains the same word, dedupe can't help (the penalty is uniform).
   The fix is more varied entries, never weaker penalties.
10. **Function texts dodging dedupe.** Dictionary-driven texts must have
    their stems recorded AFTER resolution (the reference code does this).
    If you reimplement, do not lose it.
11. **Asserting per-render trivia as scene facts.** Pools mysteriously go
    ineligible. Keep topics coarse; watch the dead-fact warning.
12. **Using `priority` for flavor.** Priority silences everything below
    it. Flavor wants `weight`; suppression wants `priority` (6.5).
13. **Tone-loaded wildcards.** The pooling model has no NOT-conditions;
    an affect-heavy generic will eventually fire in the one state where it
    reads absurd (6.2 #4).
14. **Name drumming.** `{subject.name}` in every sub-beat survives stem
    review right up until a composed passage says the name three times
    (6.2 #8).
15. **Trusting your eyes over the harness.** You cannot proofread 28,800
    surface forms. The sweep can. Wire every new mechanism to a permanent
    self-check the day you build it.
16. **Rendering menu labels through the event scope.** Labels for options
    the player never picks record dedupe usage, burn stems, and can assert
    facts the scene then honors. Labels get throwaway contexts; only the
    chosen branch renders into the event scope (3.10).

---

## Part XI — Migrating existing prose (when you have a legacy game)

Building fresh, skip this. Converting a game with handwritten paragraphs:

1. **Inventory every text source** — registered strings, data dictionaries,
   and prose hardcoded in UI components (there is always some). Map the
   render call sites. Legacy indexing (tier arrays, stage-band grids) is
   your selector map.
2. **Design beats and slots before writing text.** Slot inventory table:
   key, shape, axes, which legacy text feeds it. One dialogue slot per beat
   that carries personality.
3. **Mine the legacy.** Quoted dialogue → persona variants VERBATIM (the
   voice lives in the quotes; never paraphrase them). Description →
   normalize to the destination shape. Connective tissue → drop; skeletons
   supply it now. One legacy paragraph yields 2–4 fragments.
4. **Re-gate mined lines for their wider reach.** A line written for one
   band may now be selectable everywhere — if it implies state, gate it.
   This is the single most common migration bug.
5. **Wire up, then retire the legacy source in the same commit** as its
   replacement. Preserve cross-feature keys verbatim.
6. **Verify:** lint clean, spot-renders at the extremes (lowest rung ×
   lowest psych, highest × highest, plus 2–3 distinct characters), then
   run the flag-batch loop until a batch comes back boring.

Volume floors while migrating: every pool ≥4 texts at wildcard, every
keyed cell ≥3, every main character ≥2 dialogue beats per psych tier in
personality slots.

---

*End of manifesto. Build the engine once, verify each phase, then spend the
rest of your life on words — which is where the game actually lives.*
