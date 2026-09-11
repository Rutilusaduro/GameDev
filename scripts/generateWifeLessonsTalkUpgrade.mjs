// Unique person-true extras for wifeLessons.talk.* — kills recycled bank stems.
// Run: node scripts/generateWifeLessonsTalkUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/wifeLessons/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/wifeLessons/talkUpgrade.js';

const PERSON = {
  Darlene: {
    greeting: [
      'Emma went quiet in the car. That usually means rolls are already on her mind.',
      'Chloe asked if we could stay late. I said we would see. I already know we will.',
      'I buttoned a jacket that used to close without a conversation.',
      'The girls compare notes in the back seat. I pretend the numbers are weather.',
      'We drove over hungry on purpose. I stopped pretending that was an accident.',
    ],
    capped: [
      'I wrote both girls\' numbers on the calendar. I used the good pen.',
      'Nobody flinched when I said the number out loud. I noticed that.',
      'New uniforms again. I am done apologizing for the sizes.',
      'Pride, not panic. I keep saying that until it sits right.',
    ],
    overtook: [
      'They clapped for each other before I could keep score. Good.',
      'Rivalry warmed up and then turned into seconds. I can live with that.',
      'I stopped counting who was ahead when the table got loud with joy.',
    ],
    opt: [
      'Emma and Chloe compare plates at home. I referee less every week.',
      'Our old recipes were simple country food. This kitchen taught them richness.',
      'I watch them eat like it is a vocation. I swell up with it.',
      'The dining room at home feels thinner than this one now.',
    ],
    sub: [
      'I will tell them you noticed. They will glow and then ask for more batter.',
      'Honest answer: we belong here, flour and all.',
      'Thank you. We mean it every week, even when the drive is quiet.',
      'You see us clearly. The seeing helps more than advice.',
    ],
  },
  Wanda: {
    greeting: [
      'I brought extra Tupperware. Last week I went home wishing I had.',
      'Kezia was humming in the car. Hungry humming. You learn the difference.',
      'Lila beat me to the door. I am choosing to be proud of that.',
      'I dressed for kitchen heat and still was not ready for the smell.',
      'We came early. The girls would not sit still in the driveway.',
    ],
    capped: [
      'I said the number once. Kezia said it again, happier.',
      'Caps reached. I packed the leftovers like trophies.',
      'The scale told on us. We listened and then we ate.',
      'I stopped making the number smaller in my head.',
    ],
    overtook: [
      'Lila pulled ahead and then handed Kezia the spoon. Those are my girls.',
      'They trade the lead like a recipe card. I just keep the pans coming.',
    ],
    opt: [
      'Kezia cleans a plate before I finish blessing it.',
      'Lila asks for the rich version first now. I let her.',
      'Home food was good. This food made home food look shy.',
      'I catch myself saving the extra butter for them. And for me.',
    ],
    sub: [
      'I will take that compliment home in the Tupperware too.',
      'They will hear you said so. Then they will ask what is in the oven.',
      'Grateful is a small word for a kitchen like this.',
      'Yes. Full plates. Full girls. I am not correcting either.',
    ],
  },
  Patrice: {
    greeting: [
      'I dressed for the kitchen heat. The cake smell still got there first.',
      'I catch my reflection in the oven door — softer, fed, not sorry.',
      'The ride over I thought about last week\'s frosting. Call it a confession.',
      'I came hungry and I am not performing otherwise.',
    ],
    capped: [
      'We said the number. Nobody reached for a smaller story after.',
      'I wrote it on the calendar in ink. Pride smudged the seven.',
      'The mark felt like a welcome, not a warning.',
    ],
    overtook: [
      'If someone pulled ahead, the table still passed the pan. I liked that better.',
    ],
    opt: [
      'I used to cook careful. Mary Jane taught me generous.',
      'The oven door reflection is becoming my favorite mirror.',
      'I watch the girls and remember I am allowed to eat like this too.',
      'Simple recipes raised me. Abundance is raising us now.',
    ],
    sub: [
      'You put words on something I was already wearing.',
      'I will tell them. They already know. They will still glow.',
      'Thank you. The kitchen heard it too.',
      'Fed is the word I wanted. You said it.',
    ],
  },
  Emma: {
    greeting: [
      'Hi. I am still thinking about the biscuits. Mom says that is allowed now.',
      'Mary Jane waved us in before we knocked. She always knows.',
      'I brought an appetite. Mom called it the only luggage that matters.',
      'The kitchen already smells like I belong in it.',
    ],
    capped: [
      'I crossed Mary Jane\'s line. I wanted another piece after.',
      'Mom noticed before I said anything. She looked pleased.',
      'The number surprised me a little. The fullness did not.',
      'Cap reached. I celebrated with the corner piece.',
    ],
    overtook: [
      'I am ahead for now. Chloe will catch up. She always does.',
      'I did not chase her. Appetite just ran different.',
      'Winning feels good. Sharing the table feels better.',
    ],
    opt: [
      'I clean my plate before anyone asks. Habit now.',
      'Lessons feel less like class and more like permission.',
      'I love the food here more than I admit in the car.',
      'Mom relaxes when Mary Jane stirs. So do I.',
    ],
    sub: [
      'Hearing it said out loud makes it sit in my chest.',
      'I feel that too. I just eat it instead of saying it.',
      'Mom would agree. Then she would pass the pan.',
      'You put words to what I keep chewing through.',
    ],
  },
  Chloe: {
    greeting: [
      'I asked if we could start with the sweet one. I already knew the answer.',
      'I want to run a recipe tonight. Mom can sit. I mean that kindly.',
      'Hi. I have been hungry since the driveway.',
      'Mary Jane pointed me at the mixer. I did not argue.',
    ],
    capped: [
      'I hit the mark and then licked the spoon like proof.',
      'Clothes sat different this morning. I called it a win.',
      'The number felt like a ribbon, not a scold.',
    ],
    overtook: [
      'Lead changes. Hunger does not. I can live with both.',
      'Emma can have the board. I want the batter.',
    ],
    opt: [
      'Competition at home, comfort here. Good balance.',
      'I take seconds before I take compliments.',
      'Permission tastes like cinnamon tonight.',
      'I clean the bowl because leaving batter is rude.',
    ],
    sub: [
      'Yeah. True. Pass the spoon.',
      'I feel that. I am going to keep eating about it.',
      'Mom would laugh and then take a bite too.',
      'Say it again. I like true things with frosting.',
    ],
  },
  Kezia: {
    greeting: [
      'The kitchen already smells like we belong in it. I brought an appetite that agrees.',
      'I have been thinking about this lesson since Tuesday. Wednesday too.',
      'Mom says humming means hungry. She is not wrong.',
    ],
    capped: [
      'I said the number happier than Mom did.',
      'Milestone sits in how my dress pulls. I like the pull.',
      'Cap reached. I asked what we were making next.',
    ],
    overtook: [
      'If I pulled ahead, I still handed Lila the spoon.',
      'Appetite outran the scoreboard. Fine by me.',
    ],
    opt: [
      'I finish before anyone checks. Then I look at the pan again.',
      'This does not feel like school. It feels like being allowed.',
      'Home food was good. This food made me braver.',
    ],
    sub: [
      'I will tell Mom you said that. She will pack extra.',
      'Yes. It sits right.',
      'I feel it. I am going to eat like I mean it.',
    ],
  },
  Lila: {
    greeting: [
      'I have been counting days since Tuesday. The lesson lives in my head that way.',
      'I beat Mom to the door. She pretended not to be proud.',
      'Hi. I came ready. Ready means hungry.',
    ],
    capped: [
      'I felt the milestone in the waistband first.',
      'We hit it. I asked for the corner piece as a ceremony.',
      'The number was loud. I was louder with the fork.',
    ],
    overtook: [
      'I got there first and then waited with the spoon.',
      'Ahead is a flavor. I still pass the pan.',
    ],
    opt: [
      'I love this food more than I say in front of Mom.',
      'Plate clean, then I hover. Habit.',
      'Mary Jane\'s kitchen makes bravery taste like butter.',
    ],
    sub: [
      'Hearing it helps. Eating it helps more.',
      'Mom would agree if she was not already chewing.',
      'True. I want another piece of true.',
    ],
  },
};

const STAGE_TAG = {
  1: 'First-week heat already in the doorway.',
  2: 'Pound-cake week. The knife went slow.',
  3: 'Cobbler weather. Extra spoon waiting.',
  4: 'Lasagna night. Layers of yes.',
  5: 'Mac-and-cake week. Nobody rationed.',
  6: 'Feast spread. Daughters at the table for real.',
  7: 'Overnight kitchen. Nobody stood to leave.',
  8: 'Final spread air. Memory in the gravy.',
};

function kindOf(key) {
  const tail = key.split('.').pop();
  if (tail === 'greeting') return 'greeting';
  if (tail === 'capped') return 'capped';
  if (tail === 'overtook') return 'overtook';
  if (key.includes('.sub')) return 'sub';
  if (tail.startsWith('opt')) return 'opt';
  return 'opt';
}

function personOf(key) {
  return key.split('.')[2] || '';
}

function stageOf(key) {
  const m = key.match(/\.s(\d+)\./);
  return m ? Number(m[1]) : 1;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function quote(s) {
  const t = s.replace(/^"+|"+$/g, '');
  return `"${t}"`;
}

function line(key, n) {
  const person = personOf(key);
  const kind = kindOf(key);
  const stage = stageOf(key);
  const bank = PERSON[person]?.[kind] || PERSON.Darlene.opt;
  const a = bank[(hash(key) + n * 5) % bank.length];
  const tag = STAGE_TAG[stage] || '';
  // Keep most lines single-beat; mix tag on n===1 for variety without cloning.
  const body = n === 1 && tag ? `${a} ${tag}` : a;
  const out = quote(body);
  return [...out].length > 198 ? quote(a) : out;
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => k.startsWith('wifeLessons.talk.') && PERSON[personOf(k)]);

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateWifeLessonsTalkUpgrade.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

const seen = new Set();
let n = 0;
for (const key of keys) {
  const texts = [0, 1].map((i) => line(key, i));
  const uniq = [];
  for (const t of texts) {
    const sig = `${key}::${t}`;
    if (seen.has(t) && uniq.length) {
      // allow reuse across keys only if this key still has one unique
      if (!uniq.includes(t)) uniq.push(t);
      continue;
    }
    if (!uniq.includes(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
  if (!uniq.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 7, text: ${JSON.stringify(uniq)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generateWifeLessonsTalkUpgrade: ${n} pools → ${OUT}`);
