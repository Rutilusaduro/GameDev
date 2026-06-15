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
import { DEVICES } from '../src/gameData/devices.js';
import { renderGrowthScene } from '../src/textEngine/scenes/growthEvent/index.js';

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warning = (msg) => warnings.push(msg);

// Migrated weekly-event pools still carry legacy-length prose (>200 chars)
// pending fragment decomposition — keyed variants are live; monolith split is backlog.
const POOL_MONOLITH_OK_PREFIX = 'weekly.';

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
    if (isPool && text.length > 200 && !key.startsWith(POOL_MONOLITH_OK_PREFIX)) {
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
  { name: 'grow.crossing', root: 'grow.crossing', tpl: '{grow.crossing} {grow.crossingDialogue}' },
  { name: 'ff.feed', root: 'ff.feed', tpl: '{ff.feed}' },
  { name: 'ff.aftermath', root: 'ff.aftermath', tpl: '{ff.aftermath}' },
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
