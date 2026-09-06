// Generate polishDepthPass40.js — pad misc thin catch-all pools.
// Run: node scripts/generateMiscDepthPass40.mjs
import { writeFileSync } from 'fs';

const OUT_PATH = 'src/textEngine/scenes/polishDepthPass40.js';

const POOL_ALTS = {
  'salon_appetit.hub': [
    'Chloé lights the candles. Prestige and appetite share the same room tonight.',
  ],
  'artisan_gallery.hub': [
    'Fiona hangs the prints. The camera waits; the subject is already hungry.',
  ],
  'jealousy.reaction': [
    (ctx) => `${ctx.subject.name} compares plates without meaning to — then pretends she did not.`,
    (ctx) => `Someone else ate well this week. ${ctx.subject.name} files that away quietly.`,
  ],
  'corruption.voice': [
    (ctx) => `${ctx.subject.name} eats with quiet focus — watched, and not minding it.`,
    (ctx) => `Hunger and attention braid together while ${ctx.subject.name} keeps reaching for more.`,
  ],
  'enc.taliaClinical': [
    '"Baseline established," she says, already reaching for the next measurement.',
    '"Compliance is efficiency," Talia murmurs, eyes on the readout instead of your face.',
  ],
  'shift.scene': ['', ''],
  'npc.bystander': [
    'A glance becomes a double-take — then a polite look away.',
  ],
  'npc.peer': [
    '"You\'re filling out," a classmate says — not cruel, just observant.',
  ],
  'npc.coach': ['', ''],
  'npc.staff': ['', ''],
  'prof.observation': [
    'You note the change the way you note weather — inevitable, worth tracking.',
  ],
  'scrutiny.tierUp.header': [
    'Administrative mail arrives with the quiet violence of procedure.',
  ],
  'scrutiny.tierUp.body': [
    'The institution has begun counting what you have been doing in plain sight.',
    'Paper trails do not care how consensual the appetite felt from inside the room.',
  ],
  'scrutiny.tierUp.coda': [
    'The notice closes. The pressure does not.',
  ],
  'scrutiny.tierUp': [
    '{scrutiny.tierUp.header}\n\n{scrutiny.tierUp.body}',
    '{scrutiny.tierUp.body}\n\n{scrutiny.tierUp.coda}',
  ],
};

function esc(s) {
  if (typeof s === 'function') return s.toString();
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A5 Editor | Support: A2 Psych',
  '// Auto-generated — run: node scripts/generateMiscDepthPass40.mjs',
  '// Wildcard depth for misc thin pools (Pass 40).',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

for (const [key, extras] of Object.entries(POOL_ALTS)) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, text: [${textList}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateMiscDepthPass40: ${Object.keys(POOL_ALTS).length} pools → ${OUT_PATH}`);
