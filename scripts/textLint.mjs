// ═══════════════════════════════════════════════════════════════
// TEXT LINT — static + dynamic checks over the text-engine registry.
// Run: npm run text:lint
//      npm run text:lint -- --sample=500 --scene=wi
//      npm run text:lint -- --coverage
//      npm run text:lint -- --coverage=slender.
//      npm run text:lint -- --volume
//      npm run text:lint -- --strict-volume
//      npm run text:lint -- --strict-coverage
// See src/textEngine/AUTHORING.md for the rules this enforces.
// ═══════════════════════════════════════════════════════════════
import '../src/textEngine/scenes/index.js';
import '../src/gameData/textContext.js'; // registers garment-fit dimensions
import {
  _registryEntries, _moduleOpts, hasModule,
  createContext, render, registerPool, stemsOf, createFacts,
} from '../src/textEngine/engine.js';
import { FIT_STATES } from '../src/gameData/outfits.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { WEIGHT_STAGES } from '../src/gameData/stages.js';
import { getCorruptionTier } from '../src/gameData/corruption.js';
import { DEVICES } from '../src/gameData/devices.js';
import { renderGrowthScene } from '../src/textEngine/scenes/growthEvent/index.js';
import { pastTense, presentParticiple, thirdPerson, pluralize } from '../src/textEngine/morphology.js';
import { MOVE_VERB_CORPUS } from '../src/textEngine/lexicon/moveVerbs.js';
import {
  BANNED_PATTERNS, SAMPLE_SCENES, COVERAGE_STAGE_PROBES, STAGE_COVERAGE_PREFIXES,
  VOLUME_SQUAD_PREFIXES, OPTIONAL_EMPTY_POOLS, MIGRATION_BRIDGE_PREFIXES,
  COVERAGE_BANDS, COVERAGE_CORRUPTION_PROBES,
  INFRA_MODULE_KEYS, STRICT_VOLUME_MAX_THIN, STRICT_COVERAGE_MIN_PCT,
  STEM_TRIPLE_MAX_PCT, PSYCH_REGISTER_EXEMPT_PREFIXES,
} from './text-lint.config.js';

const CLI_ARGS = process.argv.slice(2);
const sampleArg = CLI_ARGS.find((a) => a.startsWith('--sample='));
const sceneArg = CLI_ARGS.find((a) => a.startsWith('--scene='));
const SAMPLE_COUNT = sampleArg ? parseInt(sampleArg.split('=')[1], 10) : 0;
const SAMPLE_SCENE = sceneArg ? sceneArg.split('=')[1] : 'wi';
const RUN_COVERAGE = CLI_ARGS.includes('--coverage');
const coveragePrefixArg = CLI_ARGS.find((a) => a.startsWith('--coverage='));
const COVERAGE_PREFIX_FILTER = coveragePrefixArg ? coveragePrefixArg.split('=')[1] : null;
const RUN_VOLUME = CLI_ARGS.includes('--volume');
const volumePrefixArg = CLI_ARGS.find((a) => a.startsWith('--volume='));
const VOLUME_PREFIX_FILTER = volumePrefixArg ? volumePrefixArg.split('=')[1] : null;
const STRICT_VOLUME = CLI_ARGS.includes('--strict-volume');
const STRICT_COVERAGE = CLI_ARGS.includes('--strict-coverage');

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warning = (msg) => warnings.push(msg);

// Modules that intentionally have no wildcard fallback (selector-complete
// or deliberately silent outside their domain). Add sparingly, with reason.
const NO_WILDCARD_OK = new Set([
  // legacy modules are only warned about, not whitelisted here
]);

function isMigrationBridge(key) {
  return MIGRATION_BRIDGE_PREFIXES.some((p) => key.startsWith(p));
}

// ── static checks ─────────────────────────────────────────────

const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?(?:\|[^}]*)?\}/g;
const entries = _registryEntries();
const registeredKeys = new Set(entries.map(([k]) => k));

function* stringTexts(variants) {
  for (const v of variants) {
    const t = v.text;
    const arr = Array.isArray(t) ? t : [t];
    for (const text of arr) if (typeof text === 'string') yield { variant: v, text };
  }
}

for (const [key, variants] of entries) {
  const isPool = _moduleOpts(key).select === 'pool';
  const label = `${isPool ? 'pool' : 'module'} "${key}"`;

  // 1. Wildcard fallback presence.
  const hasWildcard = variants.some((v) => !v.when || Object.keys(v.when).length === 0);
  if (!hasWildcard && !NO_WILDCARD_OK.has(key)) {
    (isPool ? err : warning)(`${label}: no wildcard fallback variant ({ when: {} })`);
  }

  // 2. Monolith detector — fragments must stay fragment-sized.
  for (const { text } of stringTexts(variants)) {
    if (isMigrationBridge(key)) continue;
    if (isPool && text.length > 200) {
      err(`${label}: ${text.length}-char text in a pool module — decompose into a skeleton + fragments: "${text.slice(0, 60)}…"`);
    } else if (!isPool && text.length > 320) {
      warning(`${label}: ${text.length}-char legacy monolith: "${text.slice(0, 60)}…"`);
    }
  }

  // 3. Slot references in string texts resolve to registered modules.
  for (const { text } of stringTexts(variants)) {
    SLOT_RE.lastIndex = 0;
    let m;
    while ((m = SLOT_RE.exec(text))) {
      const [, name, arg] = m;
      const refs = name === 'join'
        ? (arg || '').split(',').map((k) => k.trim()).filter(Boolean)
        : [name];
      for (const ref of refs) {
        if (!registeredKeys.has(ref)) err(`${label}: references unregistered module "{${ref}}"`);
      }
    }
  }

  // 4. Pool depth at wildcard (pool modules only — variety floor).
  if (isPool) {
    const wildcardTexts = variants
      .filter((v) => !v.when || Object.keys(v.when).length === 0)
      .reduce((n, v) => n + (Array.isArray(v.text) ? v.text.length : 1), 0);
    if (hasWildcard && wildcardTexts < 3) {
      warning(`${label}: only ${wildcardTexts} wildcard text(s) — aim for ≥3 for variety`);
    }
  }
}

// ── fact-ledger static checks (WORD_GRANULAR_ENGINE_PLAN §4.1) ────────
// requires/forbids/asserts topics must be `domain.instance` strings with
// scalar (or scalar-array) values. A fact that is asserted but never read
// anywhere is dead weight — warned, not errored.

const TOPIC_RE = /^[a-z][\w.]*$/;
const FACT_SCALARS = new Set(['string', 'boolean', 'number']);
const factValueOk = (v) => FACT_SCALARS.has(typeof v)
  || (Array.isArray(v) && v.every((x) => FACT_SCALARS.has(typeof x)));

const assertedFactTopics = new Map(); // topic → Set of asserting module keys
const readFactTopics = new Set();     // topics read via requires/forbids/requireAbsent

for (const [key, variants] of entries) {
  for (const v of variants) {
    for (const field of ['requires', 'forbids', 'asserts']) {
      const val = v[field];
      if (val == null) continue;
      if (Array.isArray(val)) {
        if (field !== 'forbids') { err(`${key}: ${field} must be an object of topic→value`); continue; }
        for (const t of val) {
          if (typeof t !== 'string' || !TOPIC_RE.test(t)) err(`${key}: forbids topic "${t}" must be a domain.instance string`);
          else readFactTopics.add(t);
        }
        continue;
      }
      if (typeof val !== 'object') { err(`${key}: ${field} must be an object of topic→value`); continue; }
      for (const [t, tv] of Object.entries(val)) {
        if (!TOPIC_RE.test(t)) err(`${key}: ${field} topic "${t}" must be a domain.instance string`);
        if (!factValueOk(tv)) err(`${key}: ${field}.${t} value must be string/boolean/number or an array of those`);
        if (field === 'asserts') {
          if (!assertedFactTopics.has(t)) assertedFactTopics.set(t, new Set());
          assertedFactTopics.get(t).add(key);
        } else {
          readFactTopics.add(t);
        }
      }
    }
    // Legacy sugar still counts as a read (consumes-only flags predate the
    // ledger and are exempt from the dead-fact warning).
    if (v.requireAbsent) for (const t of v.requireAbsent) readFactTopics.add(t);
  }
}
for (const [topic, keys] of assertedFactTopics) {
  if (!readFactTopics.has(topic)) {
    warning(`fact "${topic}" asserted (${[...keys].slice(0, 3).join(', ')}) but never read by requires/forbids — dead weight`);
  }
}

// ── psych-register convention (AUTHORING.md / plan §4.5) ──────────────
// word.* pool-mode pools should shade at least one variant group on a
// psychology dimension. Warning, not error — mechanical corpora are exempt.

const PSYCH_KEYS = /^(corruption|mood|gainStance|inWithdrawal)$|^(shame|fixation|obsession|dependence)Tier(Min|Max)$|^addictionLevel(Min|Max)$/;
for (const [key, variants] of entries) {
  if (!key.startsWith('word.')) continue;
  if (_moduleOpts(key).select !== 'pool') continue;
  if (PSYCH_REGISTER_EXEMPT_PREFIXES.some((p) => key.startsWith(p))) continue;
  const hasPsych = variants.some((v) => v.when && Object.keys(v.when).some((k) => PSYCH_KEYS.test(k)));
  if (!hasPsych) warning(`pool "${key}": no psych-keyed variant group (see AUTHORING.md psych-register convention)`);
}

// Legacy registerModule (best-mode) audit — prose should use registerPool.
for (const [key] of entries) {
  const opts = _moduleOpts(key);
  if (opts.select === 'pool') continue;
  if (INFRA_MODULE_KEYS.has(key)) continue;
  warning(`module "${key}": legacy registerModule (best mode) — migrate to registerPool`);
}

// ── dynamic sweep ─────────────────────────────────────────────
// Renders the flagship templates across a grid of synthetic states and
// asserts clean output. Only runs for templates whose modules exist.

const SWEEPS = [
  { name: 'WI_INTRO', root: 'wi.arrival', tpl: '{wi.arrival} {wi.settle} {wi.approachSentence} {wi.scaleSentence}' },
  { name: 'WI_INTRO_BIG', root: 'wi.approachSentence', tpl: '{wi.arrival} {wi.settle} {wi.approachSentence} {wi.scaleSentence}', bigScale: true },
  { name: 'WI_INTRO_LEGACY', root: 'wi.scaleApproach', tpl: '{wi.arrival} {wi.settle} {wi.scaleApproach}' },
  { name: 'WI_REACTION', root: 'wi.reply', tpl: '{wi.stepOff}\n\n{wi.reply}' },
  { name: 'WI_BREAK', root: 'wi.breakLine', tpl: '{wi.breakBeat} {wi.breakLine}' },
  { name: 'talk.encourage', root: 'talk.encourage', tpl: '{talk.encourage}' },
  { name: 'grow.crossing', root: 'grow.crossing', tpl: '{grow.crossing} {grow.crossingDialogue}' },
  { name: 'ff.feed', root: 'ff.feed', tpl: '{ff.feed}' },
  { name: 'ff.aftermath', root: 'ff.aftermath', tpl: '{ff.aftermath}' },
  { name: 'eat.scene', root: 'eat.scene', tpl: '{eat.scene}' },
  { name: 'campus.scene', root: 'campus.scene', tpl: '{campus.scene}' },
  { name: 'cloth.scene', root: 'cloth.scene', tpl: '{cloth.scene}' },
  { name: 'immob.scene', root: 'immob.scene', tpl: '{immob.scene}' },
  { name: 'slender.scene', root: 'slender.scene', tpl: '{slender.scene}', corruptionTier: [0], stageMax: 4 },
  { name: 'slender.mirror', root: 'slender.mirror', tpl: '{slender.mirror} {slender.mindFeel}', corruptionTier: [0], stageMax: 4 },
  { name: 'dinner.overfill', root: 'dinner.overfill', tpl: '{dinner.overfill}' },
  { name: 'feed.voice', root: 'feed.voice', tpl: '{feed.voice}' },
  { name: 'body.portrait.depth', root: 'body.portrait.depth', tpl: '{body.portrait.depth}' },
];

const STAGE_PROBES = [0, 2, 4, 6, 8, 10, 11];
const stageLbs = (id) => WEIGHT_STAGES[id].min + 10;
const CORRUPTIONS = [0, 50, 95];
const MOODS = ['happy', 'stressed', 'tired', 'content'];
const HUNGER_TIERS = [0, 4];
const CAMPUS_TIERS = [0, 2];
const RENDERS_PER_CELL = 5;

const ARTIFACTS = [
  ['{', 'unresolved slot'],
  ['undefined', 'literal "undefined"'],
  [' ,', 'space before comma'],
  ['and .', 'dangling "and"'],
  [', .', 'orphaned comma'],
  ['  ', 'double space'],
];

// Stem-repeat check (WORD_GRANULAR_ENGINE_PLAN Phase 2): a salient stem
// appearing 3+ times in ONE rendered passage is repetition slop. Gate is
// rate-based so RNG can't flake the lint: error when >1% of renders carry a
// triple; the first few examples surface as warnings. Doubles are counted
// in aggregate (some doubles are legitimate English).
let stemDoubleRenders = 0;
let stemTripleRenders = 0;
const STEM_TRIPLE_EXAMPLES = [];
function checkStemRepeats(name, out, meta) {
  const counts = new Map();
  for (const s of stemsOf(out)) counts.set(s, (counts.get(s) || 0) + 1);
  let hasDouble = false, hasTriple = false;
  for (const [s, n] of counts) {
    if (n >= 3) {
      hasTriple = true;
      if (STEM_TRIPLE_EXAMPLES.length < 10) {
        STEM_TRIPLE_EXAMPLES.push(`${name}: stem "${s}" ×${n} (${meta}): "${out.slice(0, 120)}"`);
      }
    } else if (n === 2) {
      hasDouble = true;
    }
  }
  if (hasTriple) stemTripleRenders++;
  if (hasDouble) stemDoubleRenders++;
}

let cells = 0, rendersDone = 0, lowVariety = 0;
for (const sweep of SWEEPS) {
  if (!hasModule(sweep.root)) continue;
  for (const base of INIT_STUDENTS) {
    for (const stage of STAGE_PROBES) {
      if (sweep.stageMax != null && stage > sweep.stageMax) continue;
      if (sweep.stageMin != null && stage < sweep.stageMin) continue;
      for (const corruption of CORRUPTIONS) {
        const corTier = getCorruptionTier(corruption).id;
        if (sweep.corruptionTier != null && !sweep.corruptionTier.includes(corTier)) continue;
        for (const mood of MOODS) {
          for (const hungerOverride of HUNGER_TIERS) {
            for (const campusTier of CAMPUS_TIERS) {
              const student = {
                ...base, lbs: stageLbs(stage), corruption, mood,
                hungerTier: hungerOverride, addictionLevel: hungerOverride >= 3 ? 2 : 0,
                fullness: 20, stomachCapacity: 100,
              };
              const ctx = createContext({
                subject: student, week: 6,
                globals: {
                  campusFattening: campusTier > 0,
                  campusTier,
                  bigScale: sweep.bigScale ?? stage >= 7,
                },
              });
              const outs = new Set();
              for (let i = 0; i < RENDERS_PER_CELL; i++) {
                const out = render(sweep.tpl, ctx);
                rendersDone++;
                if (!out || !out.trim()) {
                  err(`${sweep.name}: empty render (student=${base.name} stage=${stage} cor=${corruption} mood=${mood})`);
                  continue;
                }
                for (const [needle, desc] of ARTIFACTS) {
                  if (out.includes(needle)) {
                    err(`${sweep.name}: ${desc} (student=${base.name} stage=${stage} cor=${corruption} mood=${mood} hunger=${hungerOverride}): "${out.slice(0, 140)}"`);
                    break;
                  }
                }
                checkStemRepeats(sweep.name, out, `student=${base.name} stage=${stage} cor=${corruption}`);
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
}
if (cells > 0 && lowVariety / cells > 0.05) {
  warning(`dynamic sweep: ${lowVariety}/${cells} cells produced identical output across ${RENDERS_PER_CELL} renders — variety is low`);
}
const triplePct = rendersDone > 0 ? (100 * stemTripleRenders) / rendersDone : 0;
if (triplePct > STEM_TRIPLE_MAX_PCT) {
  err(`stem dedupe: ${stemTripleRenders}/${rendersDone} renders (${triplePct.toFixed(1)}% > ${STEM_TRIPLE_MAX_PCT}%) contain a 3×-repeated stem`);
  for (const ex of STEM_TRIPLE_EXAMPLES) warning(ex);
} else if (stemTripleRenders > 0) {
  warning(`stem dedupe: ${stemTripleRenders}/${rendersDone} renders (${triplePct.toFixed(1)}%) contain a 3×-repeated stem (gate: ${STEM_TRIPLE_MAX_PCT}%)`);
}
if (rendersDone > 0 && stemDoubleRenders / rendersDone > 0.2) {
  warning(`stem dedupe: ${stemDoubleRenders}/${rendersDone} renders contain a doubled stem — consider tags/asserts on the offenders`);
}

// ── garment lexicon checks (WORD_GRANULAR_ENGINE_PLAN Phase 4) ────────
// Coverage: every word.garment.* pool must key at least one variant per
// FIT_STATE on its fit dimension.

const GARMENT_POOLS = {
  'word.garment.top': 'fitTop',
  'word.garment.bottom': 'fitBottom',
  'word.garment.waist': 'fitWaist',
};
for (const [key, fitKey] of Object.entries(GARMENT_POOLS)) {
  const pool = entries.find(([k]) => k === key);
  if (!pool) { err(`garment coverage: pool "${key}" is not registered`); continue; }
  const covered = new Set(pool[1].map((v) => v.when?.[fitKey]).filter(Boolean));
  for (const state of FIT_STATES) {
    if (!covered.has(state)) err(`garment coverage: ${key} has no variant for ${fitKey}: '${state}'`);
  }
}

// Continuity: once garment.event.waistFail asserts the burst fact, no later
// slot in the same event may describe an intact waistband. The markers below
// appear only in intact-state variants, which all carry forbids.
if (hasModule('garment.event.waistFail')) {
  const INTACT_MARKERS = /finger of room|resting flush|lying flat|asking politely|seam-mark|biting into|holding on technique|lapping quietly|undoes only|button digs|learned to savor|waistband loses|trembling at the end|descending on its own|folded under her belly/;
  const base = INIT_STUDENTS[0];
  const student = { ...base, lbs: Math.round((base.startLbs ?? base.lbs) * 1.2) }; // dim reads 'straining'
  for (let i = 0; i < 100; i++) {
    const facts = createFacts();
    render('{garment.event.waistFail}', createContext({ subject: student, week: 4, facts }));
    const out = render('{word.garment.waist}', createContext({ subject: student, week: 4, facts }));
    rendersDone++;
    if (INTACT_MARKERS.test(out)) {
      err(`garment continuity: intact waistband described after burst fact (render ${i}): "${out}"`);
      break;
    }
  }
}

// ── morphology self-check (permanent) ─────────────────────────
// Table-driven: fixed input/output pairs per filter function, plus a probe
// over the tagged verb corpus for obviously broken forms.

{
  const cases = [
    // pastTense (input may be 3sg — de3sg normalizes)
    [pastTense, 'waddles', 'waddled'], [pastTense, 'strides', 'strode'],
    [pastTense, 'comes', 'came'], [pastTense, 'sits', 'sat'],
    [pastTense, 'eases', 'eased'], [pastTense, 'crosses', 'crossed'],
    [pastTense, 'carries', 'carried'], [pastTense, 'goes', 'went'],
    [pastTense, 'sinks', 'sank'], [pastTense, 'settles', 'settled'],
    [pastTense, 'heaves', 'heaved'], [pastTense, 'spreads', 'spread'],
    [pastTense, 'shifts', 'shifted'], [pastTense, 'rolls', 'rolled'],
    [pastTense, 'slips', 'slipped'], [pastTense, 'is', 'was'],
    [pastTense, 'eats', 'ate'], [pastTense, 'sways', 'swayed'],
    // presentParticiple
    [presentParticiple, 'waddles', 'waddling'], [presentParticiple, 'eases', 'easing'],
    [presentParticiple, 'sits', 'sitting'], [presentParticiple, 'comes', 'coming'],
    [presentParticiple, 'carries', 'carrying'], [presentParticiple, 'lies', 'lying'],
    [presentParticiple, 'sees', 'seeing'], [presentParticiple, 'slips', 'slipping'],
    // thirdPerson (base → 3sg)
    [thirdPerson, 'waddle', 'waddles'], [thirdPerson, 'cross', 'crosses'],
    [thirdPerson, 'carry', 'carries'], [thirdPerson, 'go', 'goes'],
    [thirdPerson, 'have', 'has'], [thirdPerson, 'push', 'pushes'],
    // pluralize
    [pluralize, 'thigh', 'thighs'], [pluralize, 'dress', 'dresses'],
    [pluralize, 'belly', 'bellies'], [pluralize, 'inch', 'inches'],
    [pluralize, 'woman', 'women'], [pluralize, 'foot', 'feet'],
    [pluralize, 'tray', 'trays'], [pluralize, 'button', 'buttons'],
  ];
  for (const [fn, input, want] of cases) {
    const got = fn(input);
    if (got !== want) err(`morphology: ${fn.name}("${input}") = "${got}", want "${want}"`);
  }

  // Verb-corpus probe: |past and |ing over every single-word move verb must
  // not produce obviously broken forms.
  const BROKEN = /(eded|inging|sss|ieed)$/;
  for (const entry of MOVE_VERB_CORPUS) {
    const first = entry.text.split(' ')[0];
    // Only probe 3sg-shaped verbs; the corpus holds a few already-past
    // phrases ("edged", "required two attempts…") the filters never target.
    if (!/[a-z]+s$/.test(first) || first === 'was' || first === 'is') continue;
    for (const fn of [pastTense, presentParticiple]) {
      const out = fn(first);
      if (BROKEN.test(out)) err(`morphology: ${fn.name}("${first}") = "${out}" — broken form; extend the irregular maps`);
    }
  }
}

// ── fact-ledger dynamic self-check (permanent) ────────────────
// Slot 1 asserts posture:seated; slot 2 holds a contradicting
// posture:standing variant plus a requires-gated one. Across 200 renders
// the contradiction must never surface and the gated line always must.
// Registered after the static snapshot on purpose — these are probes,
// not content.

registerPool('lint.factCheck.first', [
  { when: {}, asserts: { 'lint.posture': 'seated' }, text: [
    'She sits.', 'She settles into the chair.', 'She takes a seat.',
  ] },
]);
registerPool('lint.factCheck.second', [
  { when: {}, asserts: { 'lint.posture': 'standing' }, text: ['LINT-CONTRADICTION-STANDING'] },
  { when: {}, requires: { 'lint.posture': 'seated' }, text: [
    'Still seated.', 'Still seated, comfortably.', 'Still seated — no hurry.',
  ] },
]);
for (let i = 0; i < 200; i++) {
  const ctx = createContext({ subject: INIT_STUDENTS[0], week: 2 });
  const out = render('{lint.factCheck.first} {lint.factCheck.second}', ctx);
  rendersDone++;
  if (out.includes('LINT-CONTRADICTION-STANDING')) {
    err(`factCheck: contradiction guard failed — asserted posture was overridden (render ${i})`);
    break;
  }
  if (!out.includes('Still seated')) {
    err(`factCheck: requires-gated variant did not render (render ${i}): "${out}"`);
    break;
  }
}

// ── growth event sweeps ───────────────────────────────────────

const DEVICE_IDS = Object.keys(DEVICES);
const MALF_TIERS = [null, 'moderate', 'critical'];
const BODY_REP_STUDENTS = [INIT_STUDENTS[0], INIT_STUDENTS[5], INIT_STUDENTS[10]];
const SPAN_PROBES = [[2, 3], [6, 7]];
const CAUSE_TYPES = ['device_use', 'device_malfunction', 'digest_stageup', 'feature'];
const LOCALES = ['office', 'dorm', 'lab', 'stream_setup', 'dining_hall', 'kitchen', 'campus'];
const OUTFIT_HINTS = ['casual', 'contest', 'cheerleader', 'gamer'];
const GROWTH_RENDERS = 2;

function assertGrowthOut(name, out, meta) {
  rendersDone++;
  if (!out || !out.trim()) {
    err(`${name}: empty render (${meta})`);
    return;
  }
  for (const [needle, desc] of ARTIFACTS) {
    if (out.includes(needle)) {
      err(`${name}: ${desc} (${meta}): "${out.slice(0, 140)}"`);
      break;
    }
  }
}

let growthCells = 0;
if (hasModule('ge.onset')) {
  // Grid A — devices
  for (const deviceId of DEVICE_IDS) {
    for (const malfTier of MALF_TIERS) {
      for (const base of BODY_REP_STUDENTS) {
        for (const [startStage, endStage] of SPAN_PROBES) {
          const student = {
            ...base,
            lbs: stageLbs(endStage),
            corruption: 50,
            psych: { fixation: 20, obsession: 30, dependence: 25, shame: 15 },
          };
          for (let i = 0; i < GROWTH_RENDERS; i++) {
            const out = renderGrowthScene(student, {
              causeType: malfTier ? 'device_malfunction' : 'device_use',
              deviceId,
              gainLbs: endStage - startStage >= 2 ? 22 : 10,
              startStage,
              endStage,
              stagesJumped: endStage - startStage,
              malfunctionTier: malfTier,
              isMalfunction: !!malfTier,
              locale: 'lab',
              week: 6,
            });
            assertGrowthOut('GE_DEVICE', out, `device=${deviceId} malf=${malfTier} student=${base.name}`);
          }
          growthCells++;
        }
      }
    }
  }

  // Grid B — stage crossings
  for (let endStage = 2; endStage <= 11; endStage++) {
    for (const base of INIT_STUDENTS) {
      for (const corruption of CORRUPTIONS) {
        const student = {
          ...base,
          lbs: stageLbs(endStage),
          corruption,
          psych: initPsych(corruption),
        };
        const out = renderGrowthScene(student, {
          causeType: 'digest_stageup',
          featureId: 'digest_stageup',
          growthMethod: 'digest',
          growthIntensity: 'gradual',
          sensation: 'fullness',
          gainLbs: 12,
          startStage: endStage - 1,
          endStage,
          stagesJumped: 1,
          locale: 'campus',
          week: 6,
        });
        assertGrowthOut('GE_CROSSING', out, `end=${endStage} student=${base.name} cor=${corruption}`);
        if (!out.includes('cross') && !out.includes('Soft') && !out.includes('Chubby') && endStage >= 2) {
          // crossing beat should appear when stagesJumped >= 1
          const hasCrossingBeat = out.split('\n\n').length >= 4;
          if (!hasCrossingBeat) {
            warning(`GE_CROSSING: short scene at stage ${endStage} for ${base.name}`);
          }
        }
        growthCells++;
      }
    }
  }

  // Grid C — cause/locale/outfit
  for (const causeType of CAUSE_TYPES) {
    for (const locale of LOCALES) {
      for (const outfitHint of OUTFIT_HINTS) {
        for (const base of BODY_REP_STUDENTS) {
          for (const [startStage, endStage] of SPAN_PROBES) {
            const student = { ...base, lbs: stageLbs(endStage), corruption: 50 };
            const out = renderGrowthScene(student, {
              causeType,
              featureId: causeType === 'feature' ? 'stream' : null,
              deviceId: 'growth_serum_injector',
              gainLbs: 14,
              startStage,
              endStage,
              stagesJumped: endStage - startStage,
              locale,
              outfitHint,
              week: 6,
            });
            assertGrowthOut('GE_CAUSE', out, `cause=${causeType} locale=${locale} outfit=${outfitHint}`);
            growthCells++;
          }
        }
      }
    }
  }
}

function initPsych(corruption) {
  const scale = corruption >= 90 ? 1.4 : corruption >= 40 ? 1 : 0.5;
  return {
    fixation: Math.round(20 * scale),
    obsession: Math.round(25 * scale),
    dependence: Math.round(30 * scale),
    shame: Math.round(35 * scale),
  };
}

cells += growthCells;

// ── combinatorial sampling mode ───────────────────────────────

if (SAMPLE_COUNT > 0) {
  const tpl = SAMPLE_SCENES[SAMPLE_SCENE];
  if (!tpl) {
    err(`--scene=${SAMPLE_SCENE}: unknown scene (known: ${Object.keys(SAMPLE_SCENES).join(', ')})`);
  } else {
    const trigramCounts = new Map();
    let shortCount = 0;
    let longCount = 0;
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const base = INIT_STUDENTS[Math.floor(Math.random() * INIT_STUDENTS.length)];
      const stage = COVERAGE_STAGE_PROBES[Math.floor(Math.random() * COVERAGE_STAGE_PROBES.length)];
      const corruption = [0, 50, 95][Math.floor(Math.random() * 3)];
      const student = {
        ...base,
        lbs: stageLbs(stage),
        corruption,
        mood: MOODS[Math.floor(Math.random() * MOODS.length)],
        hungerTier: HUNGER_TIERS[Math.floor(Math.random() * HUNGER_TIERS.length)],
        fullness: 20 + Math.random() * 80,
        stomachCapacity: 100,
      };
      const ctx = createContext({
        subject: student,
        week: 1 + Math.floor(Math.random() * 12),
        globals: {
          campusFattening: Math.random() > 0.5,
          campusTier: CAMPUS_TIERS[Math.floor(Math.random() * CAMPUS_TIERS.length)],
          bigScale: stage >= 7,
          locale: LOCALES[Math.floor(Math.random() * LOCALES.length)],
          mealType: ['breakfast', 'binge', 'snack', 'campus_meal', 'meal'][Math.floor(Math.random() * 5)],
          clothingState: ['button_pop', 'zipper_fail', 'seam_split', 'fitted'][Math.floor(Math.random() * 4)],
        },
      });
      const out = render(tpl, ctx);
      rendersDone++;
      if (out.length < 20) shortCount++;
      if (out.length > 250) longCount++;
      for (const { pattern, message } of BANNED_PATTERNS) {
        if (pattern.test(out)) err(`sample ${i}: banned pattern (${message}): "${out.slice(0, 100)}"`);
      }
      const words = out.toLowerCase().split(/\s+/).filter(Boolean);
      for (let w = 0; w < words.length - 2; w++) {
        const tri = `${words[w]} ${words[w + 1]} ${words[w + 2]}`;
        trigramCounts.set(tri, (trigramCounts.get(tri) || 0) + 1);
      }
    }
    const hotTrigrams = [...trigramCounts.entries()].filter(([, n]) => n > 3);
    if (shortCount > SAMPLE_COUNT * 0.05) {
      warning(`sample: ${shortCount}/${SAMPLE_COUNT} outputs under 20 chars — slot may resolve empty`);
    }
    if (longCount > SAMPLE_COUNT * 0.05) {
      warning(`sample: ${longCount}/${SAMPLE_COUNT} outputs over 250 chars — possible slot doubling`);
    }
    for (const [tri, n] of hotTrigrams.slice(0, 10)) {
      warning(`sample: trigram "${tri}" appeared ${n}× in ${SAMPLE_COUNT} samples`);
    }
    console.log(`textLint sample: ${SAMPLE_COUNT} renders of scene "${SAMPLE_SCENE}"`);
  }
}

// ── volume dashboard (Squad Step 9 targets) ───────────────────

function countTexts(variant) {
  const t = variant.text;
  return Array.isArray(t) ? t.length : 1;
}

function wildcardVariants(variants) {
  return variants.filter((v) => !v.when || Object.keys(v.when).length === 0);
}

function wildcardTextCount(variants) {
  return wildcardVariants(variants).reduce((n, v) => n + countTexts(v), 0);
}

function nonEmptyWildcardCount(variants) {
  return wildcardVariants(variants)
    .flatMap((v) => (Array.isArray(v.text) ? v.text : [v.text]))
    .filter((t) => typeof t === 'string' && t.trim()).length;
}

function personaCoverage(variants) {
  const byStudent = new Map();
  for (const v of variants) {
    const sid = v.when?.studentId;
    if (sid == null) continue;
    const ids = Array.isArray(sid) ? sid : [sid];
    const n = countTexts(v);
    for (const id of ids) {
      byStudent.set(id, (byStudent.get(id) || 0) + n);
    }
  }
  return byStudent;
}

if (RUN_VOLUME) {
  const prefixes = VOLUME_PREFIX_FILTER
    ? VOLUME_SQUAD_PREFIXES.filter((p) => p.startsWith(VOLUME_PREFIX_FILTER) || p === VOLUME_PREFIX_FILTER)
    : VOLUME_SQUAD_PREFIXES;
  const squadEntries = entries.filter(([key]) =>
    prefixes.some((p) => key.startsWith(p)) && _moduleOpts(key).select === 'pool'
  );

  const thinWildcard = [];
  const thinKeyed = [];
  const personaGaps = [];
  const PERSONA_POOLS = new Set([
    'slender.deflect', 'slender.neutral', 'slender.secret', 'slender.eatPause', 'slender.mindFeel',
    'eat.firstBite', 'eat.finish', 'cloth.reaction', 'shift.interior', 'shift.physical', 'shift.coda',
    'interior.selfObs', 'immob.register', 'immob.settledState',
  ]);

  for (const [key, variants] of squadEntries) {
    const wc = wildcardTextCount(variants);
    const nonEmpty = nonEmptyWildcardCount(variants);
    const optional = OPTIONAL_EMPTY_POOLS.has(key);
    if (!optional && (wc < 4 || nonEmpty < 3)) {
      thinWildcard.push({ key, wc, nonEmpty });
    } else if (optional && wc < 4) {
      thinWildcard.push({ key, wc, nonEmpty, optional: true });
    }

    const keyed = new Map();
    for (const v of variants) {
      if (!v.when || Object.keys(v.when).length === 0) continue;
      const k = JSON.stringify(v.when);
      keyed.set(k, (keyed.get(k) || 0) + countTexts(v));
    }
    for (const [k, n] of keyed) {
      if (n < 3) thinKeyed.push({ key, when: k, count: n });
    }

    if (PERSONA_POOLS.has(key)) {
      const cov = personaCoverage(variants);
      for (const base of INIT_STUDENTS) {
        const n = cov.get(base.id) || 0;
        if (n < 2) personaGaps.push({ key, student: base.name, id: base.id, count: n });
      }
    }
  }

  console.log(`\nVolume dashboard (MIGRATION.md targets: pool ≥4 wildcard, keyed ≥3, persona ≥2/student)`);
  console.log(`Namespaces: ${prefixes.join(', ')}`);
  console.log(`Pools scanned: ${squadEntries.length}`);
  console.log(`Thin wildcard pools: ${thinWildcard.length} (${thinWildcard.filter((t) => !t.optional).length} need prose)`);
  for (const t of thinWildcard.filter((x) => !x.optional).slice(0, 25)) {
    console.log(`  · ${t.key}: ${t.wc} wildcard (${t.nonEmpty} non-empty)`);
  }
  if (thinWildcard.filter((t) => !t.optional).length > 25) {
    console.log(`  … and ${thinWildcard.filter((t) => !t.optional).length - 25} more`);
  }
  console.log(`Keyed cells under 3 texts: ${thinKeyed.length}`);
  for (const t of thinKeyed.slice(0, 20)) console.log(`  · ${t.key} ${t.when}: ${t.count}`);
  if (thinKeyed.length > 20) console.log(`  … and ${thinKeyed.length - 20} more`);
  console.log(`Persona gaps (<2 lines/student): ${personaGaps.length}`);
  const gapByPool = new Map();
  for (const g of personaGaps) {
    gapByPool.set(g.key, (gapByPool.get(g.key) || 0) + 1);
  }
  for (const [pool, n] of [...gapByPool.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`  · ${pool}: ${n} student(s) under target`);
  }

  if (STRICT_VOLUME) {
    const needProse = thinWildcard.filter((t) => !t.optional).length;
    if (needProse > STRICT_VOLUME_MAX_THIN) {
      err(`strict-volume: ${needProse} thin wildcard pool(s) exceed max ${STRICT_VOLUME_MAX_THIN}`);
    }
    if (personaGaps.length > 0) {
      err(`strict-volume: ${personaGaps.length} persona gap(s) remain`);
    }
  }
}

// ── stage coverage report (Step 12 — squad band dashboard) ────

function variantCoversStage(variant, stage) {
  const w = variant.when || {};
  if (!w.stageMin && !w.stageMax && w.stage == null) return false;
  const min = w.stageMin ?? 0;
  const max = w.stageMax ?? 11;
  if (w.stage != null) {
    return Array.isArray(w.stage) ? w.stage.includes(stage) : w.stage === stage;
  }
  return stage >= min && stage <= max;
}

function variantCoversCorruption(variant, corTier) {
  const w = variant.when || {};
  if (w.corruption == null) return true;
  const tiers = Array.isArray(w.corruption) ? w.corruption : [w.corruption];
  return tiers.includes(corTier);
}

function poolHasStageCoverage(variants, stage, corTier = null) {
  return variants.some((v) => {
    if (!variantCoversStage(v, stage)) return false;
    if (corTier != null && !variantCoversCorruption(v, corTier)) return false;
    return true;
  });
}

if (RUN_COVERAGE) {
  const bands = COVERAGE_BANDS.map((band) => ({
    ...band,
    prefixes: COVERAGE_PREFIX_FILTER
      ? band.prefixes.filter((p) => p.startsWith(COVERAGE_PREFIX_FILTER) || p === COVERAGE_PREFIX_FILTER)
      : band.prefixes,
  })).filter((band) => band.prefixes.length > 0);

  const relevant = entries.filter(([key]) =>
    STAGE_COVERAGE_PREFIXES.some((p) => key.startsWith(p)) && _moduleOpts(key).select === 'pool',
  );

  console.log(`\nCoverage dashboard (squad stage bands — pool × stage matrix)`);
  if (COVERAGE_PREFIX_FILTER) console.log(`Filter: ${COVERAGE_PREFIX_FILTER}`);
  console.log(`Pools scanned: ${relevant.length}`);

  let totalCells = 0;
  let totalGaps = 0;
  const allGaps = [];

  for (const band of bands) {
    const bandPools = relevant.filter(([key]) => band.prefixes.some((p) => key.startsWith(p)));
    const corProbes = band.corruption ?? COVERAGE_CORRUPTION_PROBES;
    const gaps = [];
    let cells = 0;

    for (const [key, variants] of bandPools) {
      const needsCorruption = key.startsWith('shift.') || key.startsWith('interior.')
        || key.includes('corruption') || key.startsWith('psych');
      const corruptionPasses = needsCorruption ? corProbes : [null];

      for (const stage of band.stages) {
        for (const corTier of corruptionPasses) {
          cells++;
          totalCells++;
          const covered = poolHasStageCoverage(variants, stage, corTier);
          if (!covered) {
            const label = corTier != null ? `${key}@stage${stage}/cor${corTier}` : `${key}@stage${stage}`;
            gaps.push(label);
            allGaps.push({ band: band.id, label });
            totalGaps++;
          }
        }
      }
    }

    const covered = cells - gaps.length;
    const pct = cells ? Math.round((covered / cells) * 100) : 100;
    console.log(`\n${band.label}: ${covered}/${cells} cells covered (${pct}%) · ${bandPools.length} pools`);
    for (const g of gaps.slice(0, 20)) console.log(`  · ${g}`);
    if (gaps.length > 20) console.log(`  … and ${gaps.length - 20} more`);
  }

  // Legacy vast-stage focus (stages 8–11 across all STAGE_COVERAGE_PREFIXES)
  const legacyGaps = [];
  for (const [key, variants] of relevant) {
    for (const stage of COVERAGE_STAGE_PROBES) {
      if (stage < 8) continue;
      if (!poolHasStageCoverage(variants, stage)) legacyGaps.push(`${key}@stage${stage}`);
    }
  }
  console.log(`\nLegacy vast focus (stages 8–11): ${legacyGaps.length} gap(s)`);
  for (const g of legacyGaps.slice(0, 15)) console.log(`  · ${g}`);
  if (legacyGaps.length > 15) console.log(`  … and ${legacyGaps.length - 15} more`);

  const overallPct = totalCells ? Math.round(((totalCells - totalGaps) / totalCells) * 100) : 100;
  console.log(`\nOverall band coverage: ${totalCells - totalGaps}/${totalCells} (${overallPct}%)`);

  if (STRICT_COVERAGE && overallPct < STRICT_COVERAGE_MIN_PCT) {
    err(`strict-coverage: ${overallPct}% below minimum ${STRICT_COVERAGE_MIN_PCT}%`);
  }
}

// ── banned pattern static scan ────────────────────────────────

for (const [key, variants] of entries) {
  for (const { text } of stringTexts(variants)) {
    for (const { pattern, message } of BANNED_PATTERNS) {
      if (pattern.test(text)) {
        warning(`${key}: banned pattern (${message}): "${text.slice(0, 60)}…"`);
      }
    }
  }
}

// ── report ────────────────────────────────────────────────────

console.log(`textLint: ${entries.length} modules, ${cells} sweep cells, ${rendersDone} renders`);
const MAX_SHOWN = 300;
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, MAX_SHOWN)) console.log(`  ⚠ ${w}`);
  if (warnings.length > MAX_SHOWN) console.log(`  … and ${warnings.length - MAX_SHOWN} more`);
}
if (errors.length) {
  console.log(`\n✖ ${errors.length} error(s):`);
  for (const e of errors.slice(0, MAX_SHOWN)) console.log(`  ✖ ${e}`);
  if (errors.length > MAX_SHOWN) console.log(`  … and ${errors.length - MAX_SHOWN} more`);
  process.exit(1);
}
console.log(errors.length || warnings.length ? '' : '✔ clean');
