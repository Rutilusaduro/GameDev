// Unique extras for intimacy.*._f* fragments. Preserve glue/prefix.
// Run: node scripts/generateIntimacyFragmentUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/intimacy/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/intimacy/fragmentUpgrade.js';

const OPEN = [
  'She sits and lets the warmth arrive in counted layers.',
  'Her weight finds your lap like it already had the address.',
  'She settles until there is no spare inch left.',
  'She lowers herself like the space was reserved.',
  'The first contact is thigh; the rest follows without hurry.',
  'She reads your face, then sits as if the answer was obvious.',
  'Warmth lands in stages and stays at each one.',
  'She makes a small sound when the last of her arrives.',
  'You brace; she adjusts you instead.',
  'She claims the lap the way she claims a chair now.',
  'The descent is careful and completely sure.',
  'She arrives more than she approaches.',
  'Her belly finds your arm and keeps it.',
  'She shifts once on purpose so you feel the extent.',
  'The mass of her redistributes until it is simply true.',
  'She stays where the heat is best.',
  'You feel the count of her without needing numbers.',
  'She treats your body like furniture that wanted this.',
  'The press starts gentle and then becomes the point.',
  'She does not ask if you are ready. She sits.',
  'Warmth through cloth, then through everything.',
  'She lets you have the full weather of her.',
  'A pause, then the rest of her decides.',
  'She is heavier than last time and she lets you feel the difference.',
  'The room shrinks to the shape of her in your lap.',
  'She keeps some of her on you even after she settles.',
  'Hands find her before words do.',
  'She exhales and the weight finishes arriving.',
  'You stop adjusting. She notices.',
  'She sits like a conclusion you both wanted.',
];

const SCENE = {
  her_weight: [
    'She sits and the warmth of her arrives in layers you can count.',
    'Her weight finds your lap like it already had the address.',
    'She settles until there is no spare inch between you.',
  ],
  wall_press: [
    'The wall takes her softness and gives it back as heat.',
    'Pinned, she still manages to take up more of you.',
    'Paint disappears. There is only her press.',
  ],
  belly_focus: [
    'Her middle is the subject. She lets you study it.',
    'Warm roundness gathers under your palms and stays.',
    'The belly answers first and does not apologize.',
  ],
  chest_buried: [
    'You disappear into warmth that intends to keep you.',
    'Her chest makes a room. You stay in it.',
    'Breath and heartbeat replace the rest of the evening.',
  ],
  thighs_lap: [
    'Her thighs close the argument without a word.',
    'Lap and heat and the slow claim of sitting still.',
    'She holds you with softness that has learned how.',
  ],
  under_her: [
    'She lets you take the full weather of her.',
    'Under her, the world shrinks to warmth and breath.',
    'She tests the give of you, then stays.',
  ],
  feed_close: [
    'Food and closeness share a fork. She does not separate them.',
    'Each bite lands closer. So does she.',
    'Feeding becomes the intimacy, not the prelude.',
  ],
  kissing_pull: [
    'The kiss pulls her whole body into the bargain.',
    'Mouth first, then the rest of her arrives.',
    'She kisses like she is rearranging the room.',
  ],
  squeeze_thighs: [
    'Her thighs take the squeeze and ask for another.',
    'More give than last week, and proud of it.',
    'You measure her in handfuls. She lets the number climb.',
  ],
  squeeze_chest: [
    'The weight in your hands is the point. She knows.',
    'She watches you hold what she grew.',
    'Warm, heavy, unhurried — she leans into the grip.',
  ],
  session_high_fullness: [
    'She is too full to pretend this is casual.',
    'Packed and pleased, she wants the evidence witnessed.',
    'The evening sits in her middle. She keeps you near it.',
  ],
  session_tapout: [
    'She stopped eating. She did not stop wanting hands.',
    'Done with the plate, not done being held.',
    'Tap-out is rest. She stays against you.',
  ],
  dinner_afterward: [
    'Restaurant heat still on her clothes. Home heat on her skin.',
    'The walk back was short. The settling is not.',
    'Dinner made her softer. She wants that noticed.',
  ],
};

const SHORT = [
  'ready for.',
  'expecting.',
  'asking for.',
  'holding still.',
  'staying put.',
  'letting you.',
  'unhurried.',
  'sure of it.',
];

const GLUE = [
  'The warmth sharpens and she stays.',
  'She shifts once so you feel all of it.',
  'Heat pools where skin meets fabric.',
  'Her breath changes; she does not pull away.',
  'The mass of her redistributes and settles.',
  'You feel every pound decide to remain.',
];

const MARK = [
  'Palm heat.', 'A small sound.', 'Fabric yielding.', 'Breath held, then given.',
  'Weight deciding.', 'A slower exhale.', 'Skin answering.', 'No spare inch.',
  'The chair complains once.', 'Warmth stacking.', 'She notices you notice.',
  'Hands stay.', 'The room shrinks.', 'Pride in the press.', 'Quiet yes.',
  'More of her than last week.', 'She does not hide it.', 'Heat through cloth.',
  'A shift for emphasis.', 'The settle completes.', 'Softness leading.',
  'You adjust; she stays.', 'The moment lengthens.', 'Unhurried claim.',
  'Belly first.', 'Thighs second.', 'Then the rest.', 'Chosen stillness.',
  'She makes sure.', 'You feel the count.', 'Warm layers.', 'No rush left.',
  'Closer than talk.', 'The give of her.', 'A pleased hush.', 'Weight as answer.',
  'She keeps you there.', 'The press sweetens.', 'Familiar now.', 'Essential now.',
  'Lap full.', 'Wall warm.', 'Fork forgotten.', 'Kiss unfinished, then finished.',
  'Measure failing.', 'Hands not enough.', 'She likes the failing.', 'Again.',
  'Dinner still in her.', 'Plate forgotten.', 'Tap-out, not retreat.', 'Held.',
  'Chest as room.', 'Heartbeat close.', 'Thighs closing.', 'Under her weather.',
  'Feed and stay.', 'Pull and arrive.', 'Squeeze and ask.', 'Full and witnessed.',
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(arr, key, n) {
  return arr[(hash(key) + n * 17) % arr.length];
}

function firstText(variants) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const t of arr) if (typeof t === 'string' && t.trim()) return t;
  }
  return '';
}

function prefixOf(text) {
  const m = String(text).match(/^(\.(?:\s+)?)/);
  return m ? m[1] : '';
}

function sceneOf(key) {
  return key.split('.')[1] || 'her_weight';
}

function trim200(s) {
  return [...s].length > 198 ? s.slice(0, 188).replace(/\s+\S*$/, '') : s;
}

function line(key, sample, n) {
  const prefix = prefixOf(sample);
  const rest = String(sample).slice(prefix.length);
  const mark = pick(MARK, key, n + 3);
  if ([...rest].length < 28 && /^[a-z]/.test(rest)) {
    return `${prefix}${pick(SHORT, key, n)} ${mark}`;
  }
  if (prefix) {
    return trim200(`${prefix}${pick(GLUE, key, n)} ${mark}`);
  }
  if (/^[a-z]/.test(rest)) {
    const g = pick(GLUE, key, n);
    return trim200(`${g.charAt(0).toLowerCase()}${g.slice(1)} ${mark}`);
  }
  return trim200(`${pick(OPEN, key, n)} ${mark}`);
}

const keys = _registryEntries()
  .map(([k, v]) => [k, v])
  .filter(([k]) => k.startsWith('intimacy.') && k.includes('._f'));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateIntimacyFragmentUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

const seen = new Set();
let n = 0;
for (const [key, variants] of keys) {
  const sample = firstText(variants);
  const texts = [0, 1].map((i) => line(key, sample, i)).filter(Boolean);
  const uniq = [];
  for (const t of texts) {
    if (seen.has(t) && uniq.length) {
      if (!uniq.includes(t)) uniq.push(t);
      continue;
    }
    if (!uniq.includes(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
  if (!uniq.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 5, text: ${JSON.stringify(uniq)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateIntimacyFragmentUpgrade: ${n} pools → ${OUT}`);
