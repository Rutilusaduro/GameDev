// Generate campusEvent/depth.js — pad campusEvent.scene/choice pools to ≥3 texts.
// Run: node scripts/generateCampusEventDepth.mjs
import { writeFileSync } from 'fs';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';

const sampleStudent = INIT_STUDENTS[0];

function resolveLegacyText(fnOrStr, student) {
  if (typeof fnOrStr === 'function') {
    try {
      return fnOrStr(student || sampleStudent) || '';
    } catch {
      return '';
    }
  }
  return fnOrStr || '';
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick2(bank, seed) {
  const n = bank.length;
  if (n < 2) return [bank[0], bank[0]];
  const i0 = seed % n;
  let i1 = (seed * 7 + 3) % n;
  if (i1 === i0) i1 = (i0 + 1) % n;
  return [bank[i0], bank[i1]];
}

const MOOD_SCENE = {
  stressed: [
    'She slumps into her seat — hollow-eyed, notebook closed, appetite waiting underneath the exhaustion.',
    'Stress sits in her shoulders; the lecture hall feels too bright, food the only soft thing in reach.',
  ],
  tired: [
    'Her chin keeps drifting toward her chest — present in body, absent in focus.',
    'She runs on fumes and caffeine; warmth and sugar would help if anyone offered.',
  ],
  nervous: [
    'She fidgets near the front, phone up and down — wound tight, easy to soothe with care.',
    'Jittery energy radiates off her; something has her chewing her lip between glances at the door.',
  ],
  focused: [
    'She barely looks up from immaculate notes — deep in the zone, hungry in the background.',
    'Flow state holds her still; interruption would sting, but reward would land sweet.',
  ],
  excited: [
    'She bubbles over before class starts — energy looking for an outlet and a plate.',
    'Enthusiasm spills into whispers and half-raised hands; appetite rides the same current.',
  ],
  content: [
    'She is the picture of ease — soft smile, chair claimed, exactly where she wants to be.',
    'Comfortable and settled; the room feels warmer for how at home she looks.',
  ],
};

const ARCH_SCENE = {
  cheerleader: [
    'Squad drama still clings to her — flustered arrival, loud sigh, appetite underneath the politics.',
    'Practice gear, political exhaustion, and the particular hunger of someone who performs all day.',
  ],
  bookworm: [
    'She found a research rabbit hole and has not surfaced — brilliant, hollow, food an afterthought.',
    'Notes multiply; she has not mentioned eating since Thursday, apparently.',
  ],
  influencer: [
    'She films between slides — snacks, angles, followers invested in every bite you provide.',
    'Content and appetite braid together; the camera loves what the plate is doing to her.',
  ],
  athlete: [
    'Recovery week leaves her restless — energy with nowhere to go, body asking for fuel logic.',
    'Lighter training means heavier appetite; she respects the excuse to load up.',
  ],
  artsy: [
    'Charcoal still, blank page winning — creative block visible in how she holds her breath.',
    'She stares at nothing and everything; food as subject might unlock her.',
  ],
  gamer: [
    'Yesterday\'s hoodie, headphones on — patch day gravity holding her in the chair.',
    'She arrived in gamer mode; hunger will arrive when the delivery does.',
  ],
  sorority: [
    'Spreadsheet open, phone on mute — event-planning crisis written across her face.',
    'She manages something large that will not cooperate; catering is always the answer.',
  ],
  overachiever: [
    'Forty pages for a five-page assignment — impossible standards, circled weaknesses, no rest.',
    'She hands in excess and asks for more; exhaustion dressed as diligence.',
  ],
  quiet: [
    'Back corner, small careful drawings — paying close attention without asking to be seen.',
    'Invisible by choice until someone leaves warmth on her desk without making it a thing.',
  ],
  transfer: [
    'Still sampling the campus — three different foods today, intensity of someone catching up.',
    'New place, new appetite; she tries everything like she is mapping a country.',
  ],
};

const STAGE_SCENE = {
  early: [
    'She smooths her shirt mid-lecture — aware something is changing, not alarmed yet.',
    'Gym mentions and sidelong glances; early softness still negotiable in her mind.',
  ],
  mid: [
    'She has made peace with appetite — moves slower, eats openly, cares less who watches.',
    'Ease shows in how she takes space; the old self-consciousness is losing its grip.',
  ],
  heavy: [
    'She commands the room without trying — reinforced seat, calm authority, body at home.',
    'Scale shows in how she settles; the lecture hall adjusts around her warmth.',
  ],
};

const CLASS_SCENE = {
  class_snack_break: [
    'You call an unscheduled break and produce snacks — no reason needed, hunger sufficient.',
    'Mid-lecture pause, box opened; the class needs no excuse to descend.',
  ],
  class_group_project: [
    'Lecture becomes a meal-plan project — hypothetical on paper, very real on plates.',
    'Groups form around food logic; taste-testing becomes primary research.',
  ],
  class_birthday: [
    'Birthday week rumor has spread — cake expectation hangs in the air.',
    'Someone celebrates; the class expects dessert diplomacy.',
  ],
  class_slump: [
    'Three PM slump — drooping heads, aggressive naps, action required.',
    'Energy crash owns the room; caffeine and sugar are the obvious medicine.',
  ],
  class_potluck: [
    'Potluck seriousness exceeded your announcement — containers line the walls, smell extraordinary.',
    'The room became a buffet; nobody pretends this is only academic.',
  ],
  class_extended: [
    'Dense material, real engagement — two hours in and nobody has looked at the clock.',
    'The session runs long because it is working; stomachs register the omission eventually.',
  ],
};

const CHOICE_FEED = [
  'Warmth spreads through the moment — plates cleared, appetite answered, mood softening.',
  'Food does what food does best; color returns, shoulders drop, the room exhales.',
  'She eats without performance — steady, pleased, grateful in the unhurried way of being fed.',
];

const CHOICE_SOCIAL = [
  'Trust deepens in small talk — the kind that leaves her lighter than she arrived.',
  'Conversation eases what stress tightened; she thanks you like she means it.',
  'You listen; she unloads; something in her posture unlocks by degrees.',
];

const CHOICE_NEUTRAL = [
  'The task lands; focus returns; energy finds a channel that is not food — for now.',
  'Quiet competence takes over — nothing dramatic, but the hour improves.',
  'You get out of her way or give her structure; either way, the moment stabilizes.',
];

function sceneAlts(sceneId, baseText) {
  const seed = hash(sceneId + baseText);
  if (sceneId.startsWith('mood_')) {
    const mood = sceneId.replace('mood_', '');
    return pick2(MOOD_SCENE[mood] || CHOICE_SOCIAL, seed);
  }
  if (sceneId.startsWith('arch_')) {
    const arch = sceneId.replace('arch_', '');
    return pick2(ARCH_SCENE[arch] || CHOICE_SOCIAL, seed);
  }
  if (sceneId.startsWith('stage_')) {
    const stage = sceneId.replace('stage_', '');
    return pick2(STAGE_SCENE[stage] || CHOICE_SOCIAL, seed);
  }
  if (sceneId.startsWith('class_')) {
    return pick2(CLASS_SCENE[sceneId] || CHOICE_FEED, seed);
  }
  return pick2(CHOICE_SOCIAL, seed);
}

function choiceAlts(choice, sceneId, baseText) {
  const seed = hash(`${sceneId}:${choice.label}:${baseText}`);
  const gainMax = choice.effect?.gain?.[1] ?? 0;
  const label = String(choice.label || '').toLowerCase();
  if (gainMax >= 5 || /food|snack|eat|spread|cake|delivery|pastry|feast|potluck|fuel|bring/.test(label)) {
    return pick2(CHOICE_FEED, seed);
  }
  if (gainMax === 0 && /vent|talk|chat|listen|help|draft|ask|praise|mentor|check/.test(label)) {
    return pick2(CHOICE_SOCIAL, seed);
  }
  if (gainMax === 0) return pick2(CHOICE_NEUTRAL, seed);
  if (gainMax >= 3) return pick2(CHOICE_FEED, seed);
  return pick2(CHOICE_NEUTRAL, seed);
}

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateCampusEventDepth.mjs',
  '// Wildcard depth for campusEvent.scene + campusEvent.choice pools (Pass 31).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let poolCount = 0;

for (const scene of CLASS_SCENES) {
  const sceneText = resolveLegacyText(scene.text, sampleStudent);
  if (sceneText) {
    const [a, b] = sceneAlts(scene.id, sceneText);
    lines.push(`registerModuleVariants('campusEvent.scene.${scene.id}', [{ when: {}, text: [${esc(a)}, ${esc(b)}] }]);`);
    poolCount++;
  }
  scene.choices.forEach((choice, idx) => {
    const resultText = resolveLegacyText(choice.result, sampleStudent);
    if (resultText) {
      const [a, b] = choiceAlts(choice, scene.id, resultText);
      lines.push(`registerModuleVariants('campusEvent.choice.${scene.id}.${idx}', [{ when: {}, text: [${esc(a)}, ${esc(b)}] }]);`);
      poolCount++;
    }
  });
}

lines.push(
  "registerModuleVariants('campusEvent.result', [{ when: {}, text: ['Small kindness, real effect — appetite acknowledged, warmth returned.'] }]);",
  "registerModuleVariants('campusEvent.beat', [{ when: {}, text: [",
  "  '{campusEvent.observation}\\n\\n{campusEvent.result}',",
  "  '{campusEvent.observation} {campusEvent.result}',",
  ']}]);',
);

writeFileSync('src/textEngine/scenes/campusEvent/depth.js', `${lines.join('\n')}\n`);
console.log(`generateCampusEventDepth: ${poolCount} pools → src/textEngine/scenes/campusEvent/depth.js`);
