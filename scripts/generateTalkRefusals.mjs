// Generate talk.refusal.* pools from talkSystem.js legacy refusal strings.
// Run: node scripts/generateTalkRefusals.mjs
import { writeFileSync } from 'fs';
import { resetFragCounter, decomposeVariants, emitFragmentPools } from './poolTextSplit.mjs';

const REFUSALS = {
  command_finish: (s) => `${s.name} wavers — the command lands, but her body outvotes it. "I can't," she whispers, and means the physics, not the will. Her belly is too full, too tight, too honest about its limits. She trembles with how close she came to obeying anyway.`,
  command_devour: (s) => `Something ancient in ${s.name} rises to meet the command — and falters at the brink. Not tonight. Her body is too full to hold what you're asking. She trembles with how close it was, hands pressed to her middle, eyes dark with wanting anyway.`,
};

const MARKER = '__SUBJECT_NAME__';

function esc(s) {
  return JSON.stringify(s);
}

resetFragCounter();
const pools = Object.entries(REFUSALS).map(([id, fn]) => {
  const poolKey = `talk.refusal.${id}`;
  const text = fn({ name: MARKER }).replaceAll(MARKER, '{subject.name}');
  const { variants, fragmentPools } = decomposeVariants(poolKey, [{ when: {}, text: [text] }]);
  const frags = emitFragmentPools(fragmentPools, esc);
  const body = `registerPool('${poolKey}', [\n  { when: {}, text: ${esc(variants[0].text)} },\n]);`;
  return [...frags, body].filter(Boolean).join('\n\n');
});

const out = [
  '// The Squad — Lead: A2 Psych | Support: A4 Architect',
  '// Talk command refusal lines — migrated from talkSystem.js (Phase C.2).',
  '// Regenerate: node scripts/generateTalkRefusals.mjs',
  "import { registerPool } from '../engine.js';",
  '',
  ...pools,
  '',
];

writeFileSync('src/textEngine/scenes/talkRefusal.js', `${out.join('\n')}\n`);
console.log('generateTalkRefusals: wrote src/textEngine/scenes/talkRefusal.js');
