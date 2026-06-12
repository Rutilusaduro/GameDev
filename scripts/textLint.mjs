// ═══════════════════════════════════════════════════════════════
// TEXT LINT — static + dynamic checks over the text-engine registry.
// Run: npm run text:lint        (node scripts/textLint.mjs)
// See src/textEngine/AUTHORING.md for the rules this enforces.
// ═══════════════════════════════════════════════════════════════
import '../src/textEngine/scenes/index.js';
import {
  _registryEntries, _moduleOpts, hasModule,
  createContext, render,
} from '../src/textEngine/engine.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { WEIGHT_STAGES } from '../src/gameData/stages.js';

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warning = (msg) => warnings.push(msg);

// Modules that intentionally have no wildcard fallback (selector-complete
// or deliberately silent outside their domain). Add sparingly, with reason.
const NO_WILDCARD_OK = new Set([
  // legacy modules are only warned about, not whitelisted here
]);

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

// ── dynamic sweep ─────────────────────────────────────────────
// Renders the flagship templates across a grid of synthetic states and
// asserts clean output. Only runs for templates whose modules exist.

const SWEEPS = [
  { name: 'WI_INTRO', root: 'wi.arrival', tpl: '{wi.arrival} {wi.settle} {wi.scaleApproach}' },
  { name: 'WI_INTRO_BIG', root: 'wi.bigScaleApproach', tpl: '{wi.arrival} {wi.settle} {wi.bigScaleApproach}' },
  { name: 'WI_REACTION', root: 'wi.reply', tpl: '{wi.stepOff}\n\n{wi.reply}' },
  { name: 'WI_BREAK', root: 'wi.breakLine', tpl: '{wi.breakBeat} {wi.breakLine}' },
  { name: 'talk.encourage', root: 'talk.encourage', tpl: '{talk.encourage}' },
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

let cells = 0, rendersDone = 0, lowVariety = 0;
for (const sweep of SWEEPS) {
  if (!hasModule(sweep.root)) continue;
  for (const base of INIT_STUDENTS) {
    for (const stage of STAGE_PROBES) {
      for (const corruption of CORRUPTIONS) {
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
                globals: { campusFattening: campusTier > 0, campusTier, bigScale: stage >= 7 },
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

// ── report ────────────────────────────────────────────────────

console.log(`textLint: ${entries.length} modules, ${cells} sweep cells, ${rendersDone} renders`);
const MAX_SHOWN = 40;
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
