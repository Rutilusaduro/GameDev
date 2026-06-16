// One-time generator: legacy talk suggest pools → text-engine modules.
// Run: node scripts/generateTalkSuggest.mjs
import { writeFileSync } from 'fs';
import { SUGGEST_INDULGENCE, SUGGEST_GROWTH } from './legacyTalkSuggest.snapshot.mjs';
import { resetFragCounter, emitFragmentPools } from './poolTextSplit.mjs';

const MARKER_NAME = '__SUBJECT_NAME__';
const MARKER_LBS = 99999;
const OPENER = '{talk.moodOpener|suffix:\n\n}';
const MAX = 195;
const MAX_SLOTS_PER_LINE = 3;

function esc(s) {
  return JSON.stringify(s);
}

function convertLegacy(fn) {
  const raw = fn({ name: MARKER_NAME, lbs: MARKER_LBS });
  return raw
    .replaceAll(MARKER_NAME, '{subject.name}')
    .replaceAll('99,999', '{subject.lbs}')
    .replaceAll(String(MARKER_LBS), '{subject.lbs}');
}

function splitChunk(text) {
  if (text.length <= MAX) return [text];
  const chunks = [];
  let rest = text.trim();
  while (rest.length > MAX) {
    let cut = rest.lastIndexOf('. ', MAX);
    if (cut < MAX * 0.2) cut = rest.lastIndexOf(' ', MAX);
    if (cut < MAX * 0.2) cut = MAX;
    const piece = rest.slice(0, cut + (rest[cut] === '.' ? 1 : 0)).trim();
    chunks.push(piece);
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function registerFragment(bodyKey, chunk, fragmentPools, counter) {
  const fragKey = `${bodyKey}._f${counter.n}`;
  counter.n += 1;
  fragmentPools.push({ key: fragKey, text: [chunk] });
  return `{${fragKey}}`;
}

function buildBodyPool(bodyKey, body, fragmentPools) {
  const counter = { n: 1 };
  const lines = [];
  for (const para of body.split(/\n\n+/)) {
    const chunks = splitChunk(para.trim());
    let slotBatch = [];
    for (const chunk of chunks) {
      const slot = registerFragment(bodyKey, chunk, fragmentPools, counter);
      slotBatch.push(slot);
      const batchLen = slotBatch.join(' ').length;
      if (slotBatch.length >= MAX_SLOTS_PER_LINE || batchLen > 160) {
        lines.push(slotBatch.join(' '));
        slotBatch = [];
      }
    }
    if (slotBatch.length) lines.push(slotBatch.join(' '));
  }
  const skeleton = lines.join('\n\n');
  return `registerPool('${bodyKey}', [\n  { when: {}, text: ${esc([skeleton])} },\n]);`;
}

function emitTopic(topicId, pools) {
  const poolKey = `talk.${topicId}`;
  const fragmentPools = [];
  const bodyPools = [];
  const variants = [];

  pools.forEach((tierPool, tier) => {
    const texts = tierPool.map((fn, vi) => {
      const bodyKey = `${poolKey}.b${tier}${vi}`;
      bodyPools.push(buildBodyPool(bodyKey, convertLegacy(fn), fragmentPools));
      return `${OPENER}{${bodyKey}}`;
    });
    variants.push({ when: { corruption: [tier] }, priority: 1, text: texts });
  });
  variants.push({
    when: {},
    text: [`${OPENER}{${poolKey}.b00}`],
  });

  const lines = variants.map((v) => {
    const extra = v.priority != null ? `, priority: ${v.priority}` : '';
    return `  { when: ${esc(v.when)}${extra}, text: ${esc(v.text)} }`;
  });
  const frags = emitFragmentPools(fragmentPools, esc);
  const body = `registerPool('${poolKey}', [\n${lines.join(',\n')},\n]);`;
  return [...bodyPools, '', ...frags, '', body].filter(Boolean).join('\n');
}

resetFragCounter();

const out = [
  '// The Squad — Lead: A2 Psych | Support: A7 Artisan',
  '// Talk suggest topics — migrated from talkDialogue.js (Phase C.2).',
  '// Regenerate: node scripts/generateTalkSuggest.mjs',
  "import { registerPool } from '../engine.js';",
  "import './talkEncourage.js'; // talk.moodOpener",
  '',
  emitTopic('suggest_indulgence', SUGGEST_INDULGENCE),
  '',
  emitTopic('suggest_growth', SUGGEST_GROWTH),
  '',
];

writeFileSync('src/textEngine/scenes/talkSuggest.js', `${out.join('\n')}\n`);
console.log('generateTalkSuggest: wrote src/textEngine/scenes/talkSuggest.js');
