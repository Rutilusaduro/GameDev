// Generate intimacy scene prose pools + slim metadata from legacy intimacy.js.
// Run: node scripts/generateIntimacy.mjs
import { writeFileSync } from 'fs';
import { INTIMACY_SCENES, INTIMACY_CONTEXTUAL } from './legacyIntimacy.snapshot.js';
import { resetFragCounter, decomposeVariants, emitFragmentPools } from './poolTextSplit.mjs';

const MARKER = '__SUBJECT_NAME__';
const STAGE_BANDS = [
  { stageMax: 3, lbs: 145 },
  { stageMin: 4, stageMax: 6, lbs: 195 },
  { stageMin: 7, stageMax: 9, lbs: 265 },
  { stageMin: 10, lbs: 380 },
];
const REL_TIERS = [1, 2, 3, 4];

function esc(s) {
  return JSON.stringify(s);
}

function sample(lbs) {
  return { name: MARKER, lbs, id: 1, archetype: 'cheerleader' };
}

function convertText(text) {
  return text.replaceAll(MARKER, '{subject.name}');
}

function collectHistoryFlags(fn) {
  if (typeof fn !== 'function') return [];
  return [...new Set([...fn.toString().matchAll(/history\.includes\(["'](\w+)["']\)/g)].map((m) => m[1]))];
}

function buildWhen(band, tier, history, flags) {
  const when = { ...band, relTier: tier };
  for (const f of flags) when[f] = history.includes(f);
  return when;
}

function samplePhaseVariants(textFn, flags) {
  const histories = [[]];
  for (const f of flags) histories.push([f]);
  const byText = new Map();
  for (const band of STAGE_BANDS) {
    const bandWhen = { ...band };
    delete bandWhen.lbs;
    for (const tier of REL_TIERS) {
      for (const hist of histories) {
        const raw = textFn(hist, sample(band.lbs), tier);
        const text = convertText(raw);
        const when = buildWhen(bandWhen, tier, hist, flags);
        if (!byText.has(text)) byText.set(text, when);
      }
    }
  }
  const variants = [...byText.entries()].map(([text, when]) => ({ when, text: [text] }));
  if (!variants.length) {
    variants.push({ when: {}, text: ['{subject.name} leans close, warm and unhurried.'] });
  } else {
    variants.push({ when: {}, text: [variants[0].text[0]] });
  }
  return variants;
}

function emitPool(poolKey, variants) {
  const { variants: decomposed, fragmentPools } = decomposeVariants(poolKey, variants);
  const lines = decomposed.map((v) => `  { when: ${esc(v.when)}, text: ${esc(v.text)} }`);
  const frags = emitFragmentPools(fragmentPools, esc);
  const skeleton = `registerPool('${poolKey}', [\n${lines.join(',\n')},\n]);`;
  return { skeleton, fragments: frags, fragmentPools };
}

function processScenes(scenes, out) {
  const meta = [];
  for (const scene of scenes) {
    const sceneMeta = {
      id: scene.id,
      label: scene.label,
      icon: scene.icon,
      desc: scene.desc,
      apCost: scene.apCost ?? 0,
      minTier: scene.minTier,
      phases: [],
      endings: [],
    };
    scene.phases.forEach((phase, pi) => {
      const textKey = `intimacy.${scene.id}.p${pi}`;
      if (typeof phase.text === 'function') {
        const flags = collectHistoryFlags(phase.text);
        const variants = samplePhaseVariants(phase.text, flags);
        const { skeleton, fragments, fragmentPools } = emitPool(textKey, variants);
        out.skeletonBlocks.push(skeleton);
        out.fragmentBlocks.push(...fragments);
        out.fragmentPools.push(...fragmentPools);
      }
      sceneMeta.phases.push({
        textKey,
        choices: phase.choices.map((c) => {
          const resultText = convertText(
            typeof c.result === 'function' ? c.result(sample(180)) : c.result,
          );
          const resultKey = `intimacy.${scene.id}.ch.${c.id}`;
          const { skeleton, fragments, fragmentPools } = emitPool(resultKey, [{ when: {}, text: [resultText] }]);
          out.skeletonBlocks.push(skeleton);
          out.fragmentBlocks.push(...fragments);
          out.fragmentPools.push(...fragmentPools);
          const { id, label, lbs, rel, flag, feed, gainRange, requires, requiresNot } = c;
          return { id, label, lbs, rel, flag, feed, gainRange, requires, requiresNot, resultKey };
        }),
      });
    });
    scene.endings.forEach((ending, ei) => {
      const textKey = `intimacy.${scene.id}.end${ei}`;
      const endText = convertText(
        typeof ending.text === 'function' ? ending.text(sample(200)) : ending.text,
      );
      const { skeleton, fragments, fragmentPools } = emitPool(textKey, [{ when: {}, text: [endText] }]);
      out.skeletonBlocks.push(skeleton);
      out.fragmentBlocks.push(...fragments);
      out.fragmentPools.push(...fragmentPools);
      sceneMeta.endings.push({
        conditionSrc: ending.condition.toString(),
        gainBonus: ending.gainBonus,
        relBonus: ending.relBonus,
        textKey,
      });
    });
    meta.push(sceneMeta);
  }
  return meta;
}

const FILE_HEADER = [
  '// The Squad — Lead: A2 Psych | Support: A7 Artisan',
  '// Intimacy scene prose — migrated from gameData/intimacy.js (Phase C.2).',
  '// Regenerate: node scripts/generateIntimacy.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
];

resetFragCounter();
const out = { skeletonBlocks: [], fragmentBlocks: [], fragmentPools: [] };
const mainMeta = processScenes(INTIMACY_SCENES, out);
const contextualMeta = processScenes(Object.values(INTIMACY_CONTEXTUAL), out);

const fragmentsOut = [
  ...FILE_HEADER,
  '// Fragment pools (._fN) — lint-sized prose chunks.',
  '',
  ...out.fragmentBlocks,
  '',
].join('\n');

const skeletonsOut = [
  ...FILE_HEADER,
  '// Phase / choice / ending skeleton pools.',
  '',
  ...out.skeletonBlocks,
  '',
].join('\n');

const scenesOut = [
  ...FILE_HEADER,
  "import './fragments.js';",
  "import './skeletons.js';",
  '',
].join('\n');

writeFileSync('src/textEngine/scenes/intimacy/fragments.js', `${fragmentsOut}\n`);
writeFileSync('src/textEngine/scenes/intimacy/skeletons.js', `${skeletonsOut}\n`);
writeFileSync('src/textEngine/scenes/intimacy/scenes.js', `${scenesOut}\n`);

const dataOut = `// Intimacy scene metadata — choices, flags, effects (prose in textEngine/scenes/intimacy/).
// Generated by scripts/generateIntimacy.mjs
export const INTIMACY_SCENES = ${JSON.stringify(mainMeta, null, 2)};

export const INTIMACY_CONTEXTUAL = ${JSON.stringify(
  Object.fromEntries(contextualMeta.map((s) => [s.id, s])),
  null,
  2,
)};

export function evalIntimacyEndingCondition(conditionSrc, history) {
  try {
    const fn = new Function('history', \`return (\${conditionSrc})(history);\`);
    return !!fn(history);
  } catch {
    return false;
  }
}
`;

writeFileSync('src/gameData/intimacyData.js', dataOut);
console.log(
  `generateIntimacy: wrote fragments.js (${out.fragmentBlocks.length} pools), skeletons.js (${out.skeletonBlocks.length} pools), scenes.js barrel`,
);
