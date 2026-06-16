// Regenerate src/textEngine/scenes/squadStageCoverage.js from registry gaps.
// Run: node scripts/generateStageCoverage.mjs
import { writeFileSync } from 'fs';
import '../src/textEngine/modules.js';
import '../src/textEngine/lexicon/index.js';
// Scene barrel minus squadStageCoverage (avoid circular self-reference).
const sceneImports = [
  './attitude.js', './campusExplorationText.js', './campusDevice/index.js',
  './campusSoftening.js', './destinyOffstream.js', './diary.js', './diaryBase.js',
  './hiveIntake.js', './hungerArchetypeBehavior.js', './hungerInterrupt/index.js',
  './hungerInterruptPersonal.js', './hungerLexicon.js', './stream.js',
  './streamChatIngest.js', './streamExtended.js', './streamPreStream/index.js',
  './streamPreStreamBrand.js', './talkCodas.js', './talkEncourage.js', './talkCheckIn.js',
  './talkCompliment.js', './oppositionSalonGallery.js', './opposition/aibHearing.js',
  './opposition/agendaFire.js', './opposition/counterOutcome.js', './opposition/weighInMandatory.js',
  './supernatural/ascension.js', './supernatural/thinVoice.js', './supernatural/refeedSurge.js',
  './supernatural/scarcityCurse.js', './jealousyReaction.js', './opposition/endgameBeat.js',
  './dinner/endingScene.js', './growthEvent/index.js', './weeklyEvent/index.js',
  './weighIn/index.js', './deviceBody.js', './deviceTick/index.js', './suddenGrowth/index.js',
  './talia/index.js', './eating/index.js', './clothing/index.js', './campus/index.js',
  './immobility/index.js', './psychShift/index.js', './interior/index.js',
  './npcReactions.js', './earlyGain/index.js', './forceFeeder/index.js',
];
for (const p of sceneImports) {
  await import(`../src/textEngine/scenes/${p}`);
}

import { _registryEntries, _moduleOpts } from '../src/textEngine/engine.js';
import { STAGE_COVERAGE_PREFIXES } from './text-lint.config.js';

function covers(variants, stage) {
  return variants.some((v) => {
    const w = v.when || {};
    if (!w.stageMin && !w.stageMax && w.stage == null) return false;
    const min = w.stageMin ?? 0;
    const max = w.stageMax ?? 11;
    if (w.stage != null) {
      return Array.isArray(w.stage) ? w.stage.includes(stage) : w.stage === stage;
    }
    return stage >= min && stage <= max;
  });
}

function wildcardStrings(variants) {
  const out = [];
  for (const v of variants) {
    if (v.when && Object.keys(v.when).length) continue;
    const t = v.text;
    if (typeof t === 'function') continue;
    if (Array.isArray(t)) out.push(...t.filter((x) => typeof x === 'string'));
    else if (typeof t === 'string') out.push(t);
  }
  return out.length ? out.slice(0, 4) : [''];
}

function mergeRanges(stages) {
  if (!stages.length) return [];
  const ranges = [];
  let start = stages[0];
  let end = stages[0];
  for (let i = 1; i < stages.length; i++) {
    if (stages[i] === end + 1) end = stages[i];
    else {
      ranges.push([start, end]);
      start = end = stages[i];
    }
  }
  ranges.push([start, end]);
  return ranges;
}

const entries = _registryEntries().filter(([k]) =>
  STAGE_COVERAGE_PREFIXES.some((p) => k.startsWith(p)) && _moduleOpts(k).select === 'pool',
);

const lines = [
  '// The Squad — Lead: A4 Architect | Phase B stage-band coverage',
  '// Auto-generated — run: node scripts/generateStageCoverage.mjs',
  '// Prose reuses wildcard skeletons; gameplay variety comes from keyed variants.',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

let bandCount = 0;
const poolSet = new Set();
for (const [key, variants] of entries) {
  const gaps = [];
  for (let s = 0; s <= 11; s++) if (!covers(variants, s)) gaps.push(s);
  if (!gaps.length) continue;
  poolSet.add(key);
  const textLit = JSON.stringify(wildcardStrings(variants));
  for (const [min, max] of mergeRanges(gaps)) {
    const when = max === min ? `{ stage: [${min}] }` : `{ stageMin: ${min}, stageMax: ${max} }`;
    lines.push(`registerModuleVariants('${key}', [{ when: ${when}, weight: 1, text: ${textLit} }]);`);
    bandCount++;
  }
}

writeFileSync('src/textEngine/scenes/squadStageCoverage.js', `${lines.join('\n')}\n`);
console.log(`generateStageCoverage: ${bandCount} bands across ${poolSet.size} pools`);
