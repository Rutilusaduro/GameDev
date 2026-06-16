// ═══════════════════════════════════════════════════════════════
// TEXT LINT — static + dynamic checks over the text-engine registry.
// Run: npm run text:lint
//      npm run text:lint -- --sample=500 --scene=wi
//      npm run text:lint -- --coverage
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
import {
  BANNED_PATTERNS, SAMPLE_SCENES, COVERAGE_STAGE_PROBES, STAGE_COVERAGE_PREFIXES,
} from './text-lint.config.js';

const CLI_ARGS = process.argv.slice(2);
const sampleArg = CLI_ARGS.find((a) => a.startsWith('--sample='));
const sceneArg = CLI_ARGS.find((a) => a.startsWith('--scene='));
const SAMPLE_COUNT = sampleArg ? parseInt(sampleArg.split('=')[1], 10) : 0;
const SAMPLE_SCENE = sceneArg ? sceneArg.split('=')[1] : 'wi';
const RUN_COVERAGE = CLI_ARGS.includes('--coverage');

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
  { name: 'eat.scene', root: 'eat.scene', tpl: '{eat.scene}' },
  { name: 'campus.scene', root: 'campus.scene', tpl: '{campus.scene}' },
  { name: 'cloth.scene', root: 'cloth.scene', tpl: '{cloth.scene}' },
  { name: 'immob.scene', root: 'immob.scene', tpl: '{immob.scene}' },
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

// ── stage coverage report ─────────────────────────────────────

if (RUN_COVERAGE) {
  const stageIds = COVERAGE_STAGE_PROBES;
  const relevant = entries.filter(([key]) =>
    STAGE_COVERAGE_PREFIXES.some((p) => key.startsWith(p))
  );
  const gaps = [];
  for (const [key, variants] of relevant) {
    for (const stage of stageIds) {
      if (stage < 8) continue; // focus report on stages 8-11 per plan
      const hasStage = variants.some((v) => {
        const w = v.when || {};
        if (!w.stageMin && !w.stageMax && !w.stage) return false;
        const min = w.stageMin ?? 0;
        const max = w.stageMax ?? 11;
        if (w.stage != null) return Array.isArray(w.stage) ? w.stage.includes(stage) : w.stage === stage;
        return stage >= min && stage <= max;
      });
      if (!hasStage) gaps.push(`${key}@stage${stage}`);
    }
  }
  console.log(`\nCoverage report (stages 8-11): ${relevant.length} pools scanned, ${gaps.length} gap(s)`);
  for (const g of gaps.slice(0, 30)) console.log(`  · ${g}`);
  if (gaps.length > 30) console.log(`  … and ${gaps.length - 30} more`);
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
