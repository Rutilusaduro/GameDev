# The Modular Text Engine Manifesto

**What this is:** a complete, self-contained guide to building a word-granular
procedural prose engine for text games. Read only this file and you can build
the whole thing — the spec, a full JavaScript reference implementation, the
authoring rules, the lint harness, and the build order are all here. Nothing
in this document requires access to any other repository.

**Who this is for:** any model or developer, including small ones. Every
mechanism comes with exact data shapes, exact math, complete code, and a
runnable check that fails if you got it wrong. When this document says MUST,
a lint rule enforces it. Follow the build order in Part VIII and verify each
phase before starting the next.

**What it produces:** a game whose prose is assembled at render time from
pools of small, grammar-shaped fragments keyed on game state — so a
character described at one body size, mood, wardrobe state, and psychology
reads differently from the same character one stage later, and two renders
of the same scene almost never repeat. The engine has been proven in
production: a shipped game using it renders half a million lint passages
with under 1% word-repetition and zero state contradictions.

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
| **setting pack** | Everything game-specific: deriver, dimensions, lexicon, ladders |

Naming law: module keys are `namespace.beatName` (`din.arrival`,
`word.size`, `case.clueBeat`). One short namespace per feature. The `word.`
namespace is reserved for word-grain lexicon pools and is always
dedupe-tracked.

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

`text` strings may contain `{slots}` (resolved recursively, depth cap 5) and
backticks are the sane way to hold dialogue quotes. Array `text` = one entry
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
- Every other key: equality (or array membership) against
  `ctx.d[key] ?? ctx.globals[key]`. Booleans coerce both sides.

This generalized rule means **any dimension a game registers is instantly
usable in `when`, including as a range**, with no engine edits.

### 3.3 Selection — exact math

Two modes. `registerPool` (mode `'pool'`) is the default for ALL content;
`registerModule` (mode `'best'`) is only for foundational descriptor
dictionaries where the single most-specific match should win outright.

**Pool mode:**
1. Collect all variants whose `when` matches AND whose ledger fields pass
   (3.4). Track each variant's `priority` (default 0).
2. Keep only variants at the **maximum priority** present (the hard gate).
3. Build one weighted entry per text:
   `w = (variant.weight ?? 1) × poolBase^score × repeatPenalty × stemPenalty`
   with `poolBase = 3`. So a 2-condition variant outweighs a wildcard 9:1 —
   specific flavor dominates, generic surfaces ~10–25% as spice.
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

`ctx.facts` is a `Map(topic → value)`, default fresh per context, shareable
across an event by passing one Map into every context of that event
(exactly like the session Set). Topics are `domain.instance` strings
(`garment.top`, `posture`, `scene.tone`); values are short scalars.

Eligibility, applied with `when`:
- **requires** — every `topic: v` must be present and equal (array =
  membership). Missing topic fails.
- **forbids** — object form fails on a value match; array-of-strings form
  fails if the topic is set at all.
- **contradiction guard** — a variant *asserting* `topic: v2` while the
  ledger holds `topic: v1` (different value) is **ineligible**. This single
  rule implements "if two statements would contradict, only one is said."

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

`{join:a,b,c|prefix:, }` resolves each listed module, drops empties, and
glues survivors with commas and a final "and". Reserved key — never
register a module named `join`.

### 3.7 Post-processing

After resolution, `smooth()` collapses double spaces, removes space before
punctuation, fixes `..` artifacts, and capitalizes after sentence ends.
`{{` escapes a literal `{`. Unknown modules resolve to `""` with a dev
warning — the engine never throws at render time.

---

## Part IV — Reference implementation

Two files, complete, game-free. Copy them verbatim; the only thing you
write for your game is the setting pack (Part V). ~460 lines total.

### 4.1 `engine.js`

```js
// ═══════════════════════════════════════════════════════════════
// MODULAR TEXT ENGINE — game-free core.
// Games supply a subject deriver, dimensions, and lexicon (setting pack).
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
  'the','and','her','hers','she','his','him','with','that','this','from',
  'into','onto','over','under','then','than','when','what','have','has',
  'had','been','being','they','them','their','there','here','where','which',
  'while','about','again','against','between','through','because','before',
  'after','above','below','down','just','more','most','much','some','such',
  'very','your','yours','like','does','doesn','still','every','each','both',
  'around','without','toward','towards','himself','herself','itself',
  'says','said','saying','look','take','know','make','want','really',
  'doesnt','dont','isnt','wasnt','cant','wont','didnt','youre','shes','hes',
  'thats','theres','weve','youve','hasnt','havent','youll',
  'someth','anyth','everyth','noth',
]);

export const STEM_FOLDS = {
  broke:'break', broken:'break', gave:'give', given:'give',
  took:'take', taken:'take', wore:'wear', worn:'wear',
  sank:'sink', sunk:'sink', fell:'fall', fallen:'fall',
  went:'gone', grew:'grow', grown:'grow', held:'hold',
};

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
    if (STEM_STOPWORDS.has(s)) continue;
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

// ── random helpers ────────────────────────────────────────────
export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function weightedPick(entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  if (total <= 0) return entries.length ? entries[0].item : undefined;
  let roll = Math.random() * total;
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
    return { subjectId: subject.id ?? null, skillEffects: skillEffects || {} };
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
  for (const [key, fn] of DIMENSION_DERIVERS) {
    try { ctx.d[key] = fn(ctx); } catch (e) { warn(`dimension "${key}" failed`, e); }
  }
  return ctx;
}

function retarget(ctx, who) {
  if (who === 'ref' && ctx.ref) {
    return { ...ctx, subject: ctx.ref, ref: ctx.subject,
             d: deriveFor(ctx.ref, ctx.subject, ctx.skillEffects) };
  }
  if (who === 'group' && ctx.group?.length) {
    return { ...ctx, subject: ctx.group[0],
             d: deriveFor(ctx.group[0], ctx.ref, ctx.skillEffects) };
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
export function _registryEntries() { return [...REGISTRY.entries()]; }   // lint only
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || {}; }  // lint only

// ── when evaluation ───────────────────────────────────────────
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
      if (ok) { if (!rangeSeen.has(base)) { rangeSeen.add(base); score += 1; } continue; }
    } else {
      const actual = d[k] ?? ctx.globals?.[k];
      ok = Array.isArray(v) ? v.includes(actual) : (actual === v || !!actual === !!v && typeof v === 'boolean');
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
  const { requires, forbids, asserts, requireAbsent } = variant;
  if (requires) {
    for (const [t, v] of Object.entries(requires)) {
      const cur = facts.get(t);
      if (!(Array.isArray(v) ? v.includes(cur) : cur === v)) return false;
    }
  }
  if (requireAbsent?.length && requireAbsent.some((t) => facts.get(t))) return false;
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
  if (!ctx.facts) return;
  if (variant.consumes?.length) for (const t of variant.consumes) ctx.facts.set(t, true);
  if (variant.asserts) for (const [t, v] of Object.entries(variant.asserts)) ctx.facts.set(t, v);
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
    entries = buildPickEntries(moduleKey, matches, poolBase, ctx, false); // penalty-free retry
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
  else if (typeof t === 'function' && isStemTracked(key)) recordStems(stemsOf(out), ctx);
  return out;
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
const ESCAPE_TOKEN = '';
const MAX_DEPTH = 5;

function resolveSlot(name, slotCtx, depth, trace) {
  const raw = String(selectVariant(name, slotCtx));
  const out = resolveText(raw, slotCtx, depth + 1, trace);
  if (trace && out.trim()) trace.push({ key: name, text: out.trim(), depth });
  return out;
}

function resolveText(text, ctx, depth, trace) {
  if (depth >= MAX_DEPTH) {
    SLOT_RE.lastIndex = 0;
    if (SLOT_RE.test(text)) { warn('max depth; stripping slots'); text = text.replace(SLOT_RE, ''); }
    return text;
  }
  SLOT_RE.lastIndex = 0;
  return text.replace(SLOT_RE, (_, name, arg, filterStr) => {
    const filters = filterStr ? filterStr.split('|').filter(Boolean) : [];
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
    else if (arg) slotCtx = { ...ctx, arg };
    return applyFilters(resolveSlot(name, slotCtx, depth, trace), filters);
  });
}

function smooth(text) {
  return text
    .replace(/ {2,}/g, ' ')
    .replace(/ ([.,!?;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/(^|[.!?] )([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase())
    .trim();
}

// render(template, ctx, opts) — the single public entry point. Never throws.
// opts.trace: array to collect { key, text, depth }. opts.noSmooth: skip cleanup.
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
// through de3sg() first. Extend the maps when a form renders wrong.

export const IRREGULAR_PAST = {
  is:'was', are:'were', has:'had', have:'had', do:'did', go:'went',
  come:'came', sit:'sat', eat:'ate', take:'took', give:'gave', get:'got',
  make:'made', find:'found', hold:'held', keep:'kept', leave:'left',
  feel:'felt', stand:'stood', rise:'rose', fall:'fell', sink:'sank',
  swing:'swung', spread:'spread', put:'put', set:'set', let:'let',
  shut:'shut', hit:'hit', catch:'caught', bring:'brought', buy:'bought',
  think:'thought', say:'said', see:'saw', run:'ran', begin:'began',
  stride:'strode', slide:'slid', cling:'clung', wear:'wore', tear:'tore',
  bear:'bore', draw:'drew', grow:'grew', know:'knew', throw:'threw',
  sweep:'swept', creep:'crept', mean:'meant', lead:'led', read:'read',
  lie:'lay', lay:'laid', win:'won', spin:'spun', stick:'stuck',
  shake:'shook', ride:'rode',
};
export const IRREGULAR_PLURALS = {
  woman:'women', man:'men', foot:'feet', tooth:'teeth', child:'children',
  person:'people', mouse:'mice', shelf:'shelves', half:'halves',
  life:'lives', loaf:'loaves',
};
const IRREGULAR_3SG = { be:'is', have:'has', do:'does', go:'goes' };
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

## Part V — The setting pack contract

The engine core knows nothing about your game. One file (conventionally
`settingPack.js`, loaded by your app root AND your lint harness before any
render) supplies:

1. **The subject deriver** — maps your character object to `ctx.d`.
2. **Dimensions** — `registerDimension` for anything your `when` clauses key
   on beyond the deriver's output.
3. **Stem-tracked namespaces** — `trackStemsFor('yourScene.')` for every
   prose namespace.
4. **The lexicon** — your `word.*` pools (Part VI).

Worked example — a detective noir game (deliberately a different genre, to
show nothing here is tied to any one subject matter):

```js
// settingPack.js — noir detective game
import { registerSubjectDeriver, registerDimension, trackStemsFor,
         registerPool } from './engine.js';

// Ladders are plain data: id ascends with intensity, exactly like any
// stat ladder (exhaustion, corruption, suspicion, body size…).
const EXHAUSTION = [
  { id: 0, key: 'fresh',   min: 0  },
  { id: 1, key: 'worn',    min: 30 },
  { id: 2, key: 'ragged',  min: 60 },
  { id: 3, key: 'hollow',  min: 85 },
];
const ladder = (defs, v) => [...defs].reverse().find((s) => v >= s.min) ?? defs[0];

registerSubjectDeriver((det, ref) => ({
  subjectId: det.id ?? null,
  exhaustion: ladder(EXHAUSTION, det.fatigue ?? 0).id,
  integrity: det.bribesTaken > 2 ? 'bent' : det.bribesTaken > 0 ? 'bending' : 'straight',
  mood: det.mood ?? null,
  caseHeat: det.caseHeat ?? 0,
}));

registerDimension('cityDistrict', (ctx) => ctx.globals?.district ?? 'downtown');
registerDimension('rainState', (ctx) => ctx.globals?.rain ?? 'dry');
trackStemsFor('case.');
trackStemsFor('office.');

// Word-grain lexicon, keyed on the game's own dimensions:
registerPool('word.walkVerb', [
  { when: {}, text: ['walks', 'moves', 'heads'] },
  { when: { exhaustionMin: 2 }, weight: 2, text: ['trudges', 'drags himself', 'shuffles'] },
  { when: { rainState: 'pouring' }, text: ['splashes', 'hunches'] },
]);

// A skeleton + a fact demonstrate the coherence layer in this genre:
registerPool('case.lightBeat', [
  { when: {}, asserts: { 'office.light': 'off' }, text: [
    'The office is dark when he gets there.',
  ] },
  { when: { caseHeatMin: 3 }, weight: 2, asserts: { 'office.light': 'on' }, text: [
    'The light is already on. He did not leave it on.',
  ] },
]);
registerPool('case.deskBeat', [
  { when: {}, text: ['He drops the file on the desk.'] },
  // Impossible after the dark-office fact — the guard blocks it:
  { when: {}, asserts: { 'office.light': 'off' }, weight: 2, text: [
    'He reads the file by the window instead of touching the lamp.',
  ] },
  { when: {}, requires: { 'office.light': 'on' }, weight: 4, text: [
    'Whoever turned the light on left the file square in its center.',
  ] },
]);
// render('{case.lightBeat} {case.deskBeat}', ctx) can never say the light
// is both on and off. That is the whole trick, in any genre.
```

Character objects need only what your deriver reads. Give characters a
`pronouns` field (`'she' | 'he' | 'they'`) and register `subject.they/them/
their/theirs/themself` modules reading it, so lexicon entries port across
casts.

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

### 6.2 The ten commandments of pools

1. Namespace keys `feature.beatName`; one prefix per feature.
2. Shape comment above every pool.
3. **Every pool has a `{ when: {} }` fallback with ≥3 texts.** No exceptions
   (an optional pool's fallback includes empty strings).
4. Keep pool texts under ~200 characters; longer means you skipped
   decomposition.
5. Persona lines (character-unique voice) key on the character id at
   `weight: 4`, pooled WITH trait-keyed generics at `weight: 2` that use
   `{subject.name}` — identity dominates, psychology still shades.
6. Compose skeletons from sub-pools; sub-pools from `word.*`; reuse the
   lexicon instead of re-describing.
7. Stateful prose declares its state: `asserts` when text establishes a
   physical fact, `requires`/`forbids` when text assumes one.
8. Every state-relevant pool covers EVERY applicable rung of its ladder
   (stage/tier bands). Count before committing; lint checks coverage.
9. Every dialogue/interior word pool carries at least one
   psychology-keyed variant group (the register convention) — a timid
   character and a brazen one must not pull identical word lists.
10. Big systematic corpora live in data files; a loop builds the variants
    and ALWAYS appends the generic fallback.

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
  { when: {}, text: ['sizable', 'serious'] },
  { when: { integrity: 'straight' }, weight: 2, text: ['a number he refuses to say out loud'] },
  { when: { integrity: 'bent' }, weight: 2, text: ['a number he has stopped apologizing for'] },
]);
```

---

## Part VII — The lint harness

A node script (`textLint.mjs`) that imports every registered pool plus the
setting pack, then runs four layers. Exit non-zero on any error. Run it
until clean before every commit; it is the only quality gate that matters.

**Layer 1 — static checks** over `_registryEntries()`:
- every pool has a wildcard fallback (error) with ≥3 texts (warning);
- no pool text over 200 chars (error) — the monolith detector;
- every `{slot}` referenced in any text resolves to a registered key (error);
- `requires/forbids/asserts` field shapes valid; topics match
  `/^[a-z][\w.]*$/` (error); facts asserted but never read (warning);
- word pools without a psych-keyed variant group (warning, exempt list);
- ladder coverage: state-relevant pools cover every applicable rung (error).

**Layer 2 — dynamic sweep**: for each flagship template, render across the
full state grid (every character × every ladder rung × psych tiers × moods,
~5 renders per cell). Error on: empty output, `{` in output, literal
"undefined", double spaces, orphaned punctuation. Warn when >5% of cells
render identically 5× (variety floor).

**Layer 3 — coherence gates** (rate-based so RNG can't flake CI):
- stem the output of every sweep render; error when >1% of renders contain
  any stem 3+ times; report the rate as a permanent stat;
- contradiction self-check: register two probe pools where slot 1 asserts
  `probe.state: 'a'` and slot 2 holds an asserting-`'b'` variant plus a
  requires-`'a'` variant; 200 renders; the `'b'` text must never appear and
  the required text always must;
- one continuity sweep per stateful feature (e.g. assert a breakage fact,
  then render the descriptor pool 100×; no intact-marker phrase may appear).

**Layer 4 — morphology table**: ~40 fixed input/output pairs per filter
function asserted equal, plus a probe applying `past`/`ing` to every corpus
verb and erroring on junk endings (`eded`, `inging`, `sss`).

Skeleton:

```js
import './settingPack.js';
import './scenes/index.js';   // barrel that imports every content file
import { _registryEntries, _moduleOpts, createContext, render,
         stemsOf, createFacts, registerPool } from './engine.js';
const errors = [], warnings = [];
// … layers 1–4 as specified …
if (errors.length) { errors.forEach(e => console.error('✖', e)); process.exit(1); }
console.log('✔ clean');
```

Content files register pools at import time; a `scenes/index.js` barrel
imports every content file so the lint harness sees the full registry. **A
file missing from the barrel does not exist.**

---

## Part VIII — Build order

Each phase is one commit. Do not start phase N+1 until phase N's check
passes. "Clean" means: your lint script exits 0, your project's code
linter passes, and your app builds.

| # | Build | Verify |
|---|---|---|
| 1 | `engine.js` + `morphology.js` verbatim from Part IV | Node REPL: register a 2-variant pool, render 20×, both texts appear; unknown slot renders `""` |
| 2 | `settingPack.js`: deriver + dimensions + ladders for YOUR game | Render `{word.*}` probes at 3 ladder rungs; outputs differ by rung |
| 3 | Lint harness Layers 1+4 | Deliberately break a fallback and a verb; both are caught; fix; clean |
| 4 | First feature: one skeleton + 3 sub-pools + lexicon reuse, per Part VI | Layer 2 sweep for its template; 20 sample renders read well |
| 5 | Coherence: facts on the feature's stateful beats; stem tracking on its namespace | Layer 3 gates pass; write the continuity sweep |
| 6 | Repeat 4–5 per feature; wire game UI to `render()` calls | Full lint stays clean; play the game |
| 7 | Persist `weekUsed` on characters; share `sessionUsed`+`facts`+`sceneStems` per event | Two renders in one event never repeat a line; facts carry across the event |

The engine is ~460 lines you copy once. All real effort is content: expect
1 part engine work to 10 parts authoring, forever. That ratio is the sign
you built it right.

---

## Part IX — Pitfalls (each observed in practice)

1. **Writing a paragraph as one variant.** The monolith detector exists
   because everyone does this. Decompose: skeleton + fragments.
2. **Forgetting the fallback.** One missing `{ when: {} }` = intermittent
   blank prose that playtesting misses and the sweep catches instantly.
3. **Registering content but not adding the file to the barrel.** The game
   renders `""`, the lint can't see the pool. Check the barrel first when a
   key mysteriously doesn't exist.
4. **Escaped quotes in single-quoted strings.** Use backticks for any text
   containing dialogue. This kills a whole bug class.
5. **Stemming sentence pools.** Track word/clause namespaces; decompose
   long-passage pools instead of tracking them — stems of a paragraph
   collide on everything.
6. **Uniform-cell repetition.** If EVERY candidate in a pool's state cell
   contains the same word, dedupe cannot help (the penalty is uniform).
   The fix is more varied entries, never weaker penalties.
7. **Function texts dodging dedupe.** Dictionary-driven texts must have
   their stems recorded AFTER resolution (the reference code does this).
   If you reimplement, do not lose it.
8. **Asserting per-render trivia as scene facts.** Pools mysteriously go
   ineligible. Keep topics coarse; watch the dead-fact warning.
9. **Using `priority` for flavor.** Priority is a hard gate that silences
   everything below it. Flavor wants `weight`; suppression wants priority.
10. **Trusting your eyes over the harness.** You cannot proofread 28,800
    surface forms. The sweep can. Wire every new mechanism to a permanent
    self-check the day you build it.

---

*End of manifesto. Build the engine once, verify each phase, then spend the
rest of your life on words — which is where the game actually lives.*
