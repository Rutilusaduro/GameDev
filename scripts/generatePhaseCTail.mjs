// Phase C tail — body portraits, dinner waiter, session fullness/aftermath, command_finish.
// Run: node scripts/generatePhaseCTail.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { BODY_DESCS } from '../src/gameData/content.js';
import {
  WAITER_DESC,
  SESSION_FULLNESS_DESCS,
  SESSION_AFTERMATH,
} from './legacySessionsTail.snapshot.js';
import { resetFragCounter, buildBodyPool, emitFragmentPools } from './poolTextSplit.mjs';
import { readFileSync } from 'fs';

const MARKER = '__SUBJECT_NAME__';

function esc(s) {
  return JSON.stringify(s);
}

function convertText(text) {
  return text
    .replaceAll(MARKER, '{subject.name}')
    .replace(/\$\{s\.name\}/g, '{subject.name}');
}

function emitPoolBlock(poolKey, text, fragmentPools) {
  const converted = convertText(text);
  const before = fragmentPools.length;
  const { mainSkeleton, subPools } = buildBodyPool(poolKey, converted, fragmentPools);
  const fragsOut = emitFragmentPools(fragmentPools.slice(before), esc);
  const subOut = subPools.map(
    (sp) => `registerPool('${sp.key}', [\n  { when: {}, text: ${esc([sp.skeleton])} },\n]);`,
  );
  const body = `registerPool('${poolKey}', [\n  { when: {}, text: ${esc([mainSkeleton])} },\n]);`;
  return [...fragsOut, ...subOut, body].filter(Boolean).join('\n\n');
}

// ── body portraits ─────────────────────────────────────────────
resetFragCounter();
const bodyFragments = [];
const bodyBlocks = [];
const bodySelectorLines = [];

for (const [bodyType, stages] of Object.entries(BODY_DESCS)) {
  stages.forEach((text, stageIdx) => {
    if (typeof text !== 'string' || !text.trim()) return;
    const poolKey = `body.portrait.${bodyType}.s${stageIdx}`;
    bodyBlocks.push(emitPoolBlock(poolKey, text, bodyFragments));
    bodySelectorLines.push(
      `  { when: { bodyType: ${esc(bodyType)}, stage: [${stageIdx}] }, text: ['{${poolKey}}'] },`,
    );
  });
}

const bodyOut = [
  '// The Squad — Lead: A1 Mobile | Support: A4 Architect',
  '// Body portrait prose — migrated from gameData/content.js BODY_DESCS (Phase C).',
  '// Regenerate: node scripts/generatePhaseCTail.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
  ...bodyBlocks,
  '',
  "registerPool('body.portrait', [",
  ...bodySelectorLines,
  "  { when: {}, text: ['{word.body|cap}, {word.clothingFit}.'] },",
  ']);',
  '',
].join('\n');

mkdirSync('src/textEngine/scenes/body', { recursive: true });
writeFileSync('src/textEngine/scenes/body/portraits.js', bodyOut);

// ── dinner waiter ──────────────────────────────────────────────
resetFragCounter();
const waiterBlocks = [];
const waiterSelectorLines = [];

for (const [venueId, fn] of Object.entries(WAITER_DESC)) {
  const text = typeof fn === 'function' ? fn({ name: MARKER }) : String(fn);
  const poolKey = `dinner.waiter.${venueId}`;
  const frags = [];
  waiterBlocks.push(emitPoolBlock(poolKey, text, frags));
  waiterSelectorLines.push(
    `  { when: { venueId: ${esc(venueId)} }, text: ['{${poolKey}}'] },`,
  );
}

const waiterOut = [
  '// The Squad — Lead: A1 Mobile | Support: A4 Architect',
  '// Dinner venue waiter lines — migrated from sessions.js WAITER_DESC (Phase C).',
  '// Regenerate: node scripts/generatePhaseCTail.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
  ...waiterBlocks,
  '',
  "registerPool('dinner.waiter', [",
  ...waiterSelectorLines,
  `  { when: {}, text: ['The server arrives. "Shall I bring more?" she asks.'] },`,
  ']);',
  '',
].join('\n');

writeFileSync('src/textEngine/scenes/dinner/waiter.js', waiterOut);

// ── session fullness ───────────────────────────────────────────
resetFragCounter();
const fullnessBlocks = [];
const fullnessSelectorLines = [];

for (const [archetype, fns] of Object.entries(SESSION_FULLNESS_DESCS)) {
  fns.forEach((fn, stageIdx) => {
    const text = typeof fn === 'function' ? fn({ name: MARKER }) : String(fn);
    const poolKey = `session.fullness.${archetype}.f${stageIdx}`;
    const frags = [];
    fullnessBlocks.push(emitPoolBlock(poolKey, text, frags));
    fullnessSelectorLines.push(
      `  { when: { archetype: ${esc(archetype)}, fullnessStage: [${stageIdx}] }, text: ['{${poolKey}}'] },`,
    );
  });
}

const fullnessOut = [
  '// The Squad — Lead: A1 Mobile | Support: A2 Psych',
  '// Private/group session fullness beats — migrated from SESSION_FULLNESS_DESCS (Phase C).',
  '// Regenerate: node scripts/generatePhaseCTail.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
  ...fullnessBlocks,
  '',
  "registerPool('session.fullness', [",
  ...fullnessSelectorLines,
  `  { when: {}, text: ['{subject.name} eats steadily, warmth spreading through her middle.'] },`,
  ']);',
  '',
].join('\n');

mkdirSync('src/textEngine/scenes/session', { recursive: true });
writeFileSync('src/textEngine/scenes/session/fullness.js', fullnessOut);

// ── session aftermath ──────────────────────────────────────────
resetFragCounter();
const aftermathBlocks = [];
const aftermathSelectorLines = [];

for (const entry of SESSION_AFTERMATH) {
  const text = typeof entry.scene === 'function' ? entry.scene({ name: MARKER }) : String(entry.scene);
  const poolKey = `session.aftermath.${entry.key}`;
  const frags = [];
  aftermathBlocks.push(emitPoolBlock(poolKey, text, frags));
  aftermathSelectorLines.push(
    `  { when: { aftermathBand: ${esc(entry.key)} }, text: ['{${poolKey}}'] },`,
  );
}

const aftermathOut = [
  '// The Squad — Lead: A1 Mobile | Support: A2 Psych',
  '// Private session closing beats — migrated from SESSION_AFTERMATH (Phase C).',
  '// Regenerate: node scripts/generatePhaseCTail.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
  ...aftermathBlocks,
  '',
  "registerPool('session.aftermath', [",
  ...aftermathSelectorLines,
  `  { when: {}, text: ['{subject.name} settles back, full and warm, pleased with the evening.'] },`,
  ']);',
  '',
].join('\n');

writeFileSync('src/textEngine/scenes/session/aftermath.js', aftermathOut);

// ── talk command_finish success ──────────────────────────────────
// Parse command_finish tiers from talkDialogue.js
const talkSrc = readFileSync('scripts/legacyTalkCommandFinish.snapshot.js', 'utf8');
const cmdMatch = talkSrc.match(/command_finish:\s*\[([\s\S]*?)\],\s*\};/);
if (!cmdMatch) throw new Error('command_finish block not found in talkDialogue.js');

const tierBlocks = [...cmdMatch[1].matchAll(/\[\s*((?:\([^)]*\)\s*=>\s*`[\s\S]*?`,?\s*)+)\]/g)];
resetFragCounter();
const cmdBlocks = [];
const cmdSelectorLines = [];
const cmdFragments = [];

tierBlocks.forEach((m, tierIdx) => {
  const fnTexts = [...m[1].matchAll(/\([^)]*\)\s*=>\s*`([\s\S]*?)`/g)].map((x) => x[1]);
  const bodyKeys = [];
  fnTexts.forEach((t, vi) => {
    const bodyKey = `talk.command_finish.t${tierIdx}v${vi}`;
    const before = cmdFragments.length;
    const { mainSkeleton, subPools } = buildBodyPool(
      bodyKey,
      convertText(t.replace(/\$\{lbs\(s\)\}/g, '{subject.lbs}')),
      cmdFragments,
    );
    const frags = emitFragmentPools(cmdFragments.slice(before), esc);
    const subOut = subPools.map(
      (sp) => `registerPool('${sp.key}', [\n  { when: {}, text: ${esc([sp.skeleton])} },\n]);`,
    );
    cmdBlocks.push(
      [...frags, ...subOut, `registerPool('${bodyKey}', [\n  { when: {}, text: ${esc([mainSkeleton])} },\n]);`]
        .filter(Boolean)
        .join('\n\n'),
    );
    bodyKeys.push(`{${bodyKey}}`);
  });
  cmdBlocks.push(`registerPool('talk.command_finish.t${tierIdx}', [\n  { when: {}, text: ${esc(bodyKeys)} },\n]);`);
  cmdSelectorLines.push(
    `  { when: { corruption: [${tierIdx}] }, priority: 1, text: ['{talk.command_finish.t${tierIdx}}'] },`,
  );
});

const cmdOut = [
  '// The Squad — Lead: A2 Psych | Support: A4 Architect',
  '// Command: clean every plate — success prose (Phase C).',
  '// Regenerate: node scripts/generatePhaseCTail.mjs',
  "import { registerPool } from '../engine.js';",
  '',
  ...cmdBlocks,
  '',
  "registerPool('talk.command_finish', [",
  ...cmdSelectorLines,
  `  { when: {}, text: ['{talk.command_finish.t0}'] },`,
  ']);',
  '',
].join('\n');

writeFileSync('src/textEngine/scenes/talkCommandFinish.js', cmdOut);

console.log('generatePhaseCTail: wrote body, dinner/waiter, session, talkCommandFinish');
