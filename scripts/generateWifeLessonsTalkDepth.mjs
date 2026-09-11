// Generate wifeLessons/talkDepth.js — pad wifeLessons.talk.* pools to ≥3 texts.
// Run: node scripts/generateWifeLessonsTalkDepth.mjs
import { writeFileSync } from 'fs';

await import('../src/textEngine/scenes/wifeLessons/index.js');
const { _registryEntries } = await import('../src/textEngine/engine.js');

const DAUGHTERS = new Set(['Emma', 'Chloe', 'Kezia', 'Lila']);
const FRAG_MAX = 200;

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick2(bank, seed, exclude = new Set()) {
  const pool = bank.filter((t) => !exclude.has(t) && t.length <= FRAG_MAX);
  if (pool.length < 2) {
    const fb = bank.filter((t) => t.length <= FRAG_MAX);
    return [fb[seed % fb.length], fb[(seed + 1) % fb.length]];
  }
  const i0 = seed % pool.length;
  let i1 = (seed * 7 + 3) % pool.length;
  if (i1 === i0) i1 = (i0 + 1) % pool.length;
  return [pool[i0], pool[i1]];
}

function esc(s) {
  return JSON.stringify(s);
}

function getTexts(variants) {
  const out = [];
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const s of arr) if (typeof s === 'string') out.push(s);
  }
  return out;
}

function kindFromKey(key) {
  const tail = key.split('.').pop();
  if (tail === 'greeting') return 'greeting';
  if (tail === 'capped') return 'capped';
  if (tail === 'overtook') return 'overtook';
  if (tail.startsWith('opt') && !key.includes('.sub')) return 'opt';
  if (key.includes('.sub')) return 'sub';
  return 'generic';
}

function personFromKey(key) {
  const parts = key.split('.');
  return parts[2] || '';
}

const BANKS = {
  mom_greeting: [
    '"Good evening, Professor. The kitchen smells like butter before we even sit down."',
    '"Hello again. The girls asked on Monday what we\'re making this week."',
    '"We drove over hungry. That should tell you how the week went."',
    '"Mary Jane\'s table feels like the warmest room in town right now."',
    '"The ride over was quiet — anticipation, I think. Mine and theirs."',
  ],
  daughter_greeting: [
    '"Hi, Professor. I\'m still full from last week, honestly."',
    '"Mary Jane waved us in before we knocked. She always knows."',
    '"I brought an appetite. Mom says that\'s the only luggage that matters."',
    '"The kitchen already smells incredible. We haven\'t even started."',
    '"I\'ve been thinking about this lesson since Tuesday."',
  ],
  mom_capped: [
    '"We hit the mark. I said the number out loud and nobody flinched."',
    '"Both girls reached the cap. I\'m calling that progress with a full heart."',
    '"The scale told a story this week. We listened without arguing."',
    '"New uniforms again. I stopped apologizing for the sizes."',
    '"I wrote the number on the calendar. Pride, not panic."',
  ],
  daughter_capped: [
    '"I crossed the line Mary Jane set. It felt like a win."',
    '"Mom noticed before I said anything. She looked pleased, not worried."',
    '"The number surprised me a little. The fullness didn\'t."',
    '"I can feel the milestone in how clothes sit now."',
    '"Cap reached. I celebrated with seconds."',
  ],
  mom_overtook: [
    '"One passed the other. Complicated — and still beautiful."',
    '"The gap\'s real now. I\'m proud of both and measuring nothing."',
    '"Rivalry warmed up when the sizes changed. Healthier than I expected."',
    '"I stopped keeping score when they started clapping for each other."',
    '"Sisters and numbers — messy, honest, ours."',
  ],
  daughter_overtook: [
    '"I\'m ahead for now. She\'ll catch up — she always does."',
    '"Mom pretends not to compare. We all notice anyway."',
    '"Winning feels good. Sharing the table feels better."',
    '"I didn\'t chase her. Appetite just outran us differently."',
    '"Lead changes. Hunger doesn\'t."',
  ],
  mom_opt: [
    '"The girls eat like it\'s a vocation now. I watch and swell up with it."',
    '"Our recipes were simple once. Mary Jane taught us abundance."',
    '"I catch my reflection in the oven door and see a softer woman. Fed."',
    '"Emma and Chloe compare plates at home. I pretend not to referee."',
    '"This kitchen is warmer than our dining room ever was."',
  ],
  daughter_opt: [
    '"I love the food here more than I admit out loud."',
    '"Lessons feel less like class and more like permission."',
    '"Mom relaxes when Mary Jane stirs. So do I."',
    '"I clean my plate before anyone asks. Habit now."',
    '"Competition at home, comfort here — good balance."',
  ],
  mom_sub: [
    '"That\'s what matters — full plates, full hearts."',
    '"Thank you. We mean that every week."',
    '"You see us clearly. That helps."',
    '"I\'ll tell them you said so. They\'ll glow."',
    '"Honest answer: we\'re grateful to belong here."',
  ],
  daughter_sub: [
    '"Yeah. That\'s true."',
    '"I feel that too."',
    '"Mom would agree."',
    '"You put words to what I couldn\'t."',
    '"Hearing it said out loud makes it real."',
  ],
};

function bankFor(key, existing) {
  const person = personFromKey(key);
  const kind = kindFromKey(key);
  const isDaughter = DAUGHTERS.has(person);
  if (kind === 'greeting') return isDaughter ? BANKS.daughter_greeting : BANKS.mom_greeting;
  if (kind === 'capped') return isDaughter ? BANKS.daughter_capped : BANKS.mom_capped;
  if (kind === 'overtook') return isDaughter ? BANKS.daughter_overtook : BANKS.mom_overtook;
  if (kind === 'opt') return isDaughter ? BANKS.daughter_opt : BANKS.mom_opt;
  if (kind === 'sub') return isDaughter ? BANKS.daughter_sub : BANKS.mom_sub;
  return BANKS.mom_opt;
}

const thin = [];
for (const [key, variants] of _registryEntries()) {
  if (!key.startsWith('wifeLessons.talk.')) continue;
  const texts = getTexts(variants);
  if (texts.length < 3) thin.push({ key, existing: texts[0] || '' });
}

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateWifeLessonsTalkDepth.mjs',
  '// Wildcard depth for wifeLessons.talk.* pools (mom/daughter 1-on-1 dialogue).',
  "import { registerModuleVariants } from '../../engine.js';",
  "import { legacyBridgeWhen } from '../legacyPoolPolicy.js';",
  '',
];

for (const { key, existing } of thin) {
  const seed = hash(key + existing);
  const exclude = new Set([existing]);
  const [a, b] = pick2(bankFor(key, existing), seed, exclude);
  const extras = [a, b].filter((t) => t && !exclude.has(t));
  if (extras.length < 2) continue;
  lines.push(
    `registerModuleVariants(${esc(key)}, [{ when: legacyBridgeWhen(), weight: 3, text: [${extras.map(esc).join(', ')}] }]);`,
  );
}

writeFileSync('src/textEngine/scenes/wifeLessons/talkDepth.js', `${lines.join('\n')}\n`);
console.log(`generateWifeLessonsTalkDepth: ${thin.length} pools → talkDepth.js`);
