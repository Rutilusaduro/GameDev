// Unique extras for cultivator harvest / digest / stage-up parents.
// Run: node scripts/generateHarvestUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/cultivator/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/cultivator/harvestUpgrade.js';

const KIND = {
  planned: [
    'The tasting closes on the clock.',
    'She finishes the session the way she scheduled it.',
    'No scramble. The harvest arrives when she said it would.',
    'The kitchen stays orderly while the yield transfers.',
  ],
  emergency: [
    'The tester bolts; Reneé finishes the work anyway.',
    'Suspicion sparks a chase that ends at the table.',
    'Timing goes messy. The yield still lands.',
    'She blocks the door with her bulk and completes the harvest.',
  ],
};

const SIZE = {
  heavy: [
    'Her belly hangs a little heavier; the notebook is already out.',
    'Flour still on her knuckles, she writes the transfer down.',
    'The chair takes more of her as she logs the result.',
  ],
  fat: [
    'She sits wider, warmer, logging without hurry.',
    'Clothes pinch; she notes the pinch as data.',
    'The kitchen feels closer around her hips.',
  ],
  veryFat: [
    'Rolls settle; she needs leverage to reach the pen.',
    'Her belly rests lower on her lap while she records the yield.',
    'Furniture complains once, then holds.',
  ],
  enormous: [
    'The room feels smaller. She calls that expected.',
    'She barely reaches the notebook without shifting first.',
    'Vast softness, quiet satisfaction, exact notes.',
  ],
  colossal: [
    'The apartment is already rearranged around her stillness.',
    'She logs mentally first, then with great care.',
    'Kitchen still works. She is exactly as large as the plan required.',
  ],
};

const TESTER = {
  t6: [
    '{subject.name} is gone; the air smells like completion.',
    'The first scheduled yield from {subject.name} sits in her middle now.',
    '{subject.name} trusted the tasting. Reneé trusted the schedule.',
  ],
  t7: [
    '{subject.name} integrated; Reneé writes the exact transfer.',
    'Heavier than last time. {subject.name} made a richer harvest.',
    'She records {subject.name} as a clean, dense result.',
  ],
  t8: [
    '{subject.name} taken slowly; Reneé sits fuller and still.',
    'The vast tester named {subject.name} becomes quiet mass.',
    'She savors {subject.name} like a recipe that finally printed.',
  ],
  t9: [
    '{subject.name} barely fit the door. The yield is immense.',
    'Effort in, stillness out. {subject.name} is data now.',
    'Reneé rests a hand on herself and names {subject.name} complete.',
  ],
  t10: [
    '{subject.name} arrived as a mountain; Reneé logs the maximum.',
    'Immobile tester, maximum yield, quiet apartment after {subject.name}.',
    'She processes {subject.name} like the last page of a successful paper.',
  ],
};

const DIGEST_SLOT = {
  earlyPlus1: [
    'Fresh yield. A seam pops when she shifts toward the kitchen.',
    'Thighs rub. Chair louder. She writes the distribution down.',
    'Hands on her middle, she treats the new softness as a result.',
  ],
  earlyPlus2: [
    'She stays seated while the larger yield settles.',
    'Handwriting changes from the pressure on her wrist. She notes it.',
    'The apartment contracts around her hips. Metabolically correct.',
  ],
  earlyPlus3: [
    'She barely rises. The kitchen holds a heavier, calmer presence.',
    'Reinforced seating takes the swell. She stays inward and pleased.',
    'Days of stillness. The cycle is doing the work without her walking.',
  ],
  latePlus1: [
    'Weeks later the clothes stay torn. She moves with returning precision.',
    'Permanent tighter seams. She logs them without sentiment.',
    'The apartment has adapted. So has her handwriting.',
  ],
  latePlus2: [
    'Furniture holds now. She reviews the notes and approves the result.',
    'The groan is quieter. The softness is not.',
    'She calls the settled proportions expected and keeps baking.',
  ],
  latePlus3: [
    'Processing closed. She sits vast, warm, already considering the next list.',
    'Floorboards remember her. She is content with that memory.',
    'Cycle concluded. Hungry again, professionally.',
  ],
  early: [
    'The living space fills on purpose. Digestion begins as quiet work.',
    'She becomes the room\'s warm center and breathes through the first days.',
    'Foundations settle under her. She stays focused inward.',
  ],
  late: [
    'Long weeks later she is still the centerpiece, kitchen running around her.',
    'Visitors get the calm clinical look. She is finished and satisfied.',
    'Supports stay strengthened. She regards that as correct housing.',
  ],
};

const STAGE_UP = {
  t6: [
    '{subject.name} mentions new clothes like logistics, then eats everything without being asked.',
    'She sits like someone who already needs more chair. Appetite improved.',
  ],
  t7: [
    '{subject.name} calls the hunger stress and then does not wait for the plate.',
    'More of her to settle, more of her to carry. She starts before you finish plating.',
  ],
  t8: [
    '{subject.name} checks the chair, fills it, and drops the explanations.',
    'Size is simply there. She eats like pretending already ended.',
  ],
  t9: [
    '{subject.name} calculates doorways and still finishes every serving.',
    'A wider bag, no story attached. She eats with the old thoroughness, more of her.',
  ],
};

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(arr, key, n) {
  if (!arr?.length) return '';
  return arr[(hash(key) + n * 17) % arr.length];
}

function trim200(s) {
  return [...s].length > 198 ? s.slice(0, 190).replace(/\s+\S*$/, '') : s;
}

function harvestLine(key, n) {
  const parts = key.split('.');
  // cultivator.harvest.{kind}.{size}.{tester}
  const kind = parts[2];
  const size = parts[3];
  const tester = parts[4];
  const a = pick(KIND[kind], key, n);
  const b = pick(SIZE[size], key, n + 1);
  const c = pick(TESTER[tester], key, n + 2);
  return trim200(`${a} ${b} ${c}`);
}

function digestLine(key, n) {
  const parts = key.split('.');
  // cultivator.digest.{size}.{slot}
  const size = parts[2];
  const slot = parts[3];
  const a = pick(SIZE[size] || SIZE.heavy, key, n);
  const b = pick(DIGEST_SLOT[slot] || DIGEST_SLOT.earlyPlus1, key, n + 3);
  return trim200(`${a} ${b}`);
}

function stageLine(key, n) {
  const tail = key.split('.').pop();
  return pick(STAGE_UP[tail] || STAGE_UP.t6, key, n);
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => !k.includes('._') && (
    k.startsWith('cultivator.harvest.')
    || k.startsWith('cultivator.digest.')
    || k.startsWith('cultivator.stageUp.')
  ));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateHarvestUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let n = 0;
for (const key of keys) {
  let texts;
  if (key.startsWith('cultivator.harvest.')) texts = [0, 1].map((i) => harvestLine(key, i));
  else if (key.startsWith('cultivator.digest.')) texts = [0, 1].map((i) => digestLine(key, i));
  else texts = [0, 1].map((i) => stageLine(key, i));
  const uniq = [...new Set(texts.filter(Boolean))];
  if (!uniq.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 6, text: ${JSON.stringify(uniq)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateHarvestUpgrade: ${n} pools → ${OUT}`);
