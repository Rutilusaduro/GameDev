// Generate growthEvent/depth.js — pad ge.* wildcard pools to ≥3 texts.
// Run: node scripts/generateGrowthEventDepth.mjs
import { writeFileSync } from 'fs';

const OUT_PATH = 'src/textEngine/scenes/growthEvent/depth.js';

const POOL_ALTS = {
  'ge.onset': [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}, undeniable.',
  ],
  'ge.digestOnsetLine': [
    'slips into clothes that fit differently overnight',
    'notices heaviness in her step before breakfast',
  ],
  'ge.firstSensation': [
    'softness announcing itself under the skin',
  ],
  'ge.surge': [
    '{grow.sudden}{join:ge.zoneFocus|prefix: — }.',
  ],
  'ge.surgeDetail': [
    '',
  ],
  'ge.zoneFocus': [
    'Softness finds where the body was already leaning.',
  ],
  'ge.strain': [
    'Seams complain where curve meets fabric.',
    '{ge.garment} loses its argument with her new shape.',
  ],
  'ge.clothingStrain': [
    'stretches thin over fresh curve',
  ],
  'ge.clothingFail': [
    '',
  ],
  'ge.reaction': [
    '{ge.reactionBody}{join:ge.zoneFocus|prefix: — }.',
  ],
  'ge.reactionBody': [
    'breath shallow, palms on the new warmth',
    'stillness while the body finishes arriving',
  ],
  'ge.settle': [
    'Heat fades; weight stays — permanent, patient, real.',
  ],
  'ge.settleClause': [
    '',
  ],
  'ge.permanentNote': [
    '',
    '',
  ],
  'ge.deviceWindDown': [
    '',
  ],
  'ge.digestOnset': [
    '{subject.name} wakes heavier than she remembers going to sleep.',
    'Sunday morning arrives with softness she cannot dismiss.',
  ],
  'ge.digestNotice': [
    'Fabric that forgave her last week does not forgive her today.',
    'The mirror shows what eating promised — no single dramatic moment.',
  ],
  'ge.digestReaction': [
    '{subject.name} exhales, cheeks warming. "Okay. So that\'s where I am."',
    '"I felt it coming," {subject.name} says, not quite believing herself.',
  ],
  'ge.digestSettle': [
    'The gain does not explode; it settles, like a decision made one bite at a time.',
    'She carries the new weight into the week without ceremony.',
  ],
  'ge.environment': [
    'Space reshapes around her — furniture, doorways, the room learning her size.',
  ],
  'ge.furnitureEvent': [
    '',
  ],
  'ge.spaceEvent': [
    '',
  ],
  'ge.beat.test': [
    '{ge.onset} {ge.surge}',
    '{ge.digestOnset}',
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateGrowthEventDepth.mjs',
  '// Wildcard depth for growthEvent pools (Pass 35).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const [key, extras] of Object.entries(POOL_ALTS)) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateGrowthEventDepth: ${Object.keys(POOL_ALTS).length} pools → ${OUT_PATH}`);
