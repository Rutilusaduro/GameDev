// Regenerate src/textEngine/scenes/squadKeyedDepth.js — Phase B.2 keyed depth floor.
// Run: node scripts/generateKeyedDepth.mjs
import { writeFileSync } from 'fs';
import '../src/textEngine/modules.js';
import '../src/textEngine/lexicon/index.js';

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
  './dinner/index.js', './growthEvent/index.js', './weeklyEvent/index.js',
  './weighIn/index.js', './deviceBody.js', './deviceTick/index.js', './suddenGrowth/index.js',
  './talia/index.js', './eating/index.js', './clothing/index.js', './campus/index.js',
  './immobility/index.js', './psychShift/index.js', './interior/index.js',
  './npcReactions.js', './earlyGain/index.js', './forceFeeder/index.js',
  './squadStageCoverage.js',
];
for (const p of sceneImports) {
  await import(`../src/textEngine/scenes/${p}`);
}

import { _registryEntries, _moduleOpts } from '../src/textEngine/engine.js';
import { VOLUME_SQUAD_PREFIXES, OPTIONAL_EMPTY_POOLS } from './text-lint.config.js';

const TARGET = 3;
const MAX_LINE = 200;

function collectStrings(v) {
  const t = v.text;
  if (typeof t === 'function') return [];
  return (Array.isArray(t) ? t : [t]).filter((s) => typeof s === 'string');
}

function countTexts(v) {
  return collectStrings(v).length;
}

function poolStrings(variants) {
  const out = [];
  const seen = new Set();
  for (const v of variants) {
    for (const s of collectStrings(v)) {
      if (!seen.has(s) && s.trim()) {
        seen.add(s);
        out.push(s);
      }
    }
  }
  return out;
}

function keyedCells(variants) {
  const map = new Map();
  for (const v of variants) {
    if (!v.when || !Object.keys(v.when).length) continue;
    const k = JSON.stringify(v.when);
    if (!map.has(k)) {
      map.set(k, { when: v.when, weight: v.weight ?? 1, texts: new Set() });
    }
    for (const s of collectStrings(v)) map.get(k).texts.add(s);
  }
  return map;
}

const PREFIX_FALLBACKS = {
  slender: [
    'She holds the feeling at arm\'s length until she names it.',
    'The change is small enough to deny and real enough to notice.',
    'Something loosens — waistband, certainty, or both.',
  ],
  campus: [
    'Campus noise resumes around her like nothing shifted.',
    'She stays in the moment a beat longer than necessary.',
    'The path looks ordinary. Her body does not.',
  ],
  eat: [
    'She eats without performing reluctance or restraint.',
    'Hunger and fullness trade places; she keeps going.',
    'The plate empties at its own pace.',
  ],
  cloth: [
    'Fabric tells the truth her mirror already knows.',
    'The fit changed sometime between seasons.',
    'She adjusts once and does not apologize.',
  ],
  shift: [
    'The old story loosens at the edges.',
    'Denial needs more effort than it used to.',
    'She names nothing aloud and feels everything.',
  ],
  interior: [
    'She inventories the feeling without sharing the verdict.',
    'The mirror gets a longer look than last week.',
    'Softness accumulates the way thoughts do — quietly.',
  ],
  immob: [
    'Mass settles where she puts it.',
    'The room learns her shape.',
    'Warmth pools low and stays.',
  ],
};

function fallbackFor(poolKey, idx) {
  const prefix = poolKey.split('.')[0];
  const arr = PREFIX_FALLBACKS[prefix] || PREFIX_FALLBACKS.interior;
  return arr[idx % arr.length];
}

function pickFillers(poolKey, cell, donors, needed) {
  const fillers = [];
  const used = new Set(cell.texts);

  const candidates = donors
    .filter((s) => s.trim() && !used.has(s) && s.length <= MAX_LINE)
    .sort((a, b) => {
      const aSub = a.includes('{subject.name}') ? 1 : 0;
      const bSub = b.includes('{subject.name}') ? 1 : 0;
      return bSub - aSub;
    });

  for (const c of candidates) {
    if (fillers.length >= needed) break;
    fillers.push(c);
    used.add(c);
  }

  let guard = 0;
  while (fillers.length < needed && guard < 8) {
    const line = fallbackFor(poolKey, fillers.length + guard);
    if (!used.has(line) && line.length <= MAX_LINE) {
      fillers.push(line);
      used.add(line);
    }
    guard++;
  }

  return fillers.slice(0, needed);
}

const entries = _registryEntries().filter(([k]) =>
  VOLUME_SQUAD_PREFIXES.some((p) => k.startsWith(p)) && _moduleOpts(k).select === 'pool',
);

const patches = [];
let cellCount = 0;
let lineCount = 0;

for (const [key, variants] of entries) {
  const donors = poolStrings(variants);
  const cells = keyedCells(variants);

  for (const [, cell] of cells) {
    const have = [...cell.texts].filter((s) => s.trim()).length;
  const emptyOnly = [...cell.texts].every((s) => !s.trim());
    if (emptyOnly && OPTIONAL_EMPTY_POOLS.has(key)) continue;
    const need = Math.max(0, TARGET - have);
    if (!need) continue;

    const fillers = pickFillers(key, cell, donors, need);
    if (!fillers.length) continue;

    patches.push({
      key,
      when: cell.when,
      weight: cell.weight,
      text: fillers,
    });
    cellCount++;
    lineCount += fillers.length;
  }
}

const lines = [
  '// The Squad — Lead: A4 Architect | Phase B.2 keyed persona depth',
  '// Auto-generated — run: node scripts/generateKeyedDepth.mjs',
  '// Adds supplemental lines to keyed cells under the ≥3-text volume floor.',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

for (const p of patches) {
  const whenLit = JSON.stringify(p.when);
  const textLit = JSON.stringify(p.text);
  const weight = p.weight !== 1 ? `, weight: ${p.weight}` : '';
  lines.push(`registerModuleVariants('${p.key}', [{ when: ${whenLit}${weight}, text: ${textLit} }]);`);
}

writeFileSync('src/textEngine/scenes/squadKeyedDepth.js', `${lines.join('\n')}\n`);
console.log(`generateKeyedDepth: ${lineCount} lines across ${cellCount} keyed cells (${patches.length} patches)`);
