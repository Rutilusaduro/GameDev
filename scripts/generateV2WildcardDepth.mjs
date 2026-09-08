// Generate scenes/v2WildcardDepth.js — pad wildcard pools to ≥3 texts.
// Run: node scripts/generateV2WildcardDepth.mjs
import { writeFileSync } from 'fs';

const OUT_PATH = 'src/textEngine/scenes/v2WildcardDepth.js';
const FRAG_MAX = 200;

writeFileSync(OUT_PATH, `// stub during scan
import { registerModuleVariants } from '../engine.js';
`);

await import('../src/textEngine/scenes/index.js');
const { _registryEntries } = await import('../src/textEngine/engine.js');

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function esc(s) {
  return JSON.stringify(s);
}

function wildcardTexts(variants) {
  const out = [];
  for (const v of variants) {
    if (v.when && Object.keys(v.when).length > 0) continue;
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const s of arr) if (typeof s === 'string') out.push(s);
  }
  return out;
}

function pickN(bank, seed, exclude, n) {
  const pool = bank.filter((t) => !exclude.has(t) && t.length <= FRAG_MAX);
  const out = [];
  const used = new Set(exclude);
  for (let i = 0; i < n && pool.length; i++) {
    const idx = (seed + i * 7) % pool.length;
    let line = pool[idx];
    let guard = 0;
    while (used.has(line) && guard++ < pool.length) {
      line = pool[(idx + guard) % pool.length];
    }
    if (!used.has(line)) {
      out.push(line);
      used.add(line);
    }
  }
  return out;
}

const ECHO = [
  'The moment returns warmer — appetite sharper, body more present than memory promised.',
  'Archive replay: fullness intact, growth undeniable, shame absent.',
  'She crossed a threshold the room still feels when you revisit it.',
  'Digits climbed. She watched without flinching. Growth acknowledged.',
  'Fabric surrendered. Appetite did not. The echo preserves both.',
  'Want reorganized around yes. Hunger spoke without filter.',
  'Evolution caught mid-breath — form chosen, appetite amplified.',
];

const ECHO_REPLAY = [
  'The echo replays fuller — heat, weight, the sound of satisfaction after thirds.',
  'Memory-flesh yields under attention. Each revisit adds sensory proof.',
  'You return to the moment. Her belly still sways in archive-physics.',
];

const DREAM = [
  'Dream logic: portions without ceiling, warmth without apology.',
  'Sleep opens appetite\'s country — symbolic, generous, impossible to map awake.',
  'She eats in the dream because the dream insists. Fullness follows.',
  'Sweetness coats want. Permission tastes like honey and distance.',
  'Torches, courses, belly as throne — honored, fed, impossible to ignore.',
  'Reflection eats with her. Fullness doubles across glass.',
  'Food orbits mass. Mouth opens; orbit decays into warmth.',
  'She wakes humming — hands to belly before eyes open.',
];

const RITUAL = [
  'Ceremony complete. Bellies remember. Appetite consecrated.',
  'Shared plate, shared heat — intimacy measured in bites.',
  'Courses stack like architecture. The class eats with ceremonial hunger.',
  'Bedside tribute — food carried to warm altars that cannot travel.',
  'The ritual lingers after plates empty — butter, surrender, spirit pleased.',
];

const EMB = [
  'Hunger steered from within. She obeys and calls it craving.',
  'Spirit at the wheel. Food arrives; resistance becomes theater.',
  'Fullness gathers while shame schedules a late arrival.',
  'She eats standing, sitting, publicly — appetite honest in every register.',
  'Crumbs, wrappers, evidence. The body keeps score warmly.',
];

const RES = [
  'Appetite travels the wire between them — invisible, hungry, impossible to unfeel.',
  'The resonance hums. Hunger shared before it is confessed.',
  'Linked at the level of want — soft, certain, quietly inevitable.',
  'Pulse lands warm — craving contagious, fullness echoing across the roster.',
  'Surge builds like weather. Mass answers mass through the link.',
];

const V2_DEPTH = [
  'Warmth and weight settle — unhurried, present, sensually real.',
  'Appetite deepens the scene by degrees. Neither of you rushes.',
  'Growth reads in posture, fabric, the room learning her shape.',
  'Hunger has a voice now. It sounds like belonging.',
  'Institutional eyes narrow; plates stay generous anyway.',
  'Campus air tastes of butter, permission, consequence deferred.',
  'History sits in belly and memory — meals crossed like thresholds.',
  'Technology meets flesh — remote warmth, unintended discovery.',
  'Before cameras: mirror, outfit, appetite rehearsed in private.',
];

const EVOLVED_FORM = {
  salon: [
    'Wine, butter, scandal — appetite dressed as civilization.',
    'Courses arrive. Laughter thickens. The salon hums with warmth.',
    'Guests orbit abundance. Prestige and indulgence share the room.',
  ],
  gallery: [
    'Prints on twine. Bodies in frame. Growth made exhibition.',
    'The archive grows — appetite caught mid-bite, mid-laugh.',
    'Patrons murmur. Evidence mounts on every wall.',
  ],
  cultivator: [
    'Kitchen smells technique and appetite. Growth harvested with intention.',
    'Yield beyond specification — warmth served, hunger cultivated.',
    'Chef, subject, cultivator merged in one warm session.',
  ],
  feedee: [
    'Spectacle made sincere. Growth made content. Hunger made career.',
    'Camera honest. Appetite subscriber-facing. Numbers reflect honesty.',
    'Content and appetite finally the same thing.',
  ],
  machine: [
    'Flesh and firmware meshed. Hunger engineered outward from stillness.',
    'Campus hums her design. Devices tick on bodies she will not visit.',
    'Inventor inside invention — appetite the final spec.',
  ],
  pharmacist: [
    'Compound hunger saturates campus. Wellness rhetoric surrenders to warmth.',
    'Batch cooling. She tasted dose one herself — data starts inside.',
    'Appetite stimulant, pleasure enhancer, transformation architect.',
  ],
  gainer: [
    'Every measurement victory. Every pound a data point conquered.',
    'Spreadsheet and stomach aligned. Optimization succeeded beyond spec.',
    'Competitive gainer evolution — shame benched, appetite peer-reviewed.',
  ],
  homeroomQueen: [
    'Classroom as court. Appetite as curriculum. Butter as diplomacy.',
    'Parents fed. Curriculum optional. Daisy smiling at center.',
    'Bake-sale theology — soft power measured in containers.',
  ],
};

const HOMEROOM = [
  'Three mothers, one Daisy, zero empty hands. The room smells like baking.',
  'Agenda survives when everyone leaves fed. Containers at the door.',
  'Numbers read into the file — accurate, notable, destined for review.',
  'Scale at front. Girls waiting. Daisy arranges it with ceremony.',
];

function bankFor(key) {
  if (key.startsWith('echo.type.')) return ECHO;
  if (key.startsWith('echo.replay')) return ECHO_REPLAY;
  if (key.startsWith('echo.')) return ECHO;
  if (key.startsWith('dream.')) return DREAM;
  if (key.startsWith('ritual.')) return RITUAL;
  if (key.startsWith('emb.')) return EMB;
  if (key.startsWith('res.')) return RES;
  if (key.startsWith('homeroom.activity.')) return HOMEROOM;
  if (key.startsWith('evolved.salon.')) return EVOLVED_FORM.salon;
  if (key.startsWith('evolved.gallery.')) return EVOLVED_FORM.gallery;
  if (key.startsWith('evolved.cultivator.')) return EVOLVED_FORM.cultivator;
  if (key.startsWith('evolved.feedee.')) return EVOLVED_FORM.feedee;
  if (key.startsWith('evolved.machine.')) return EVOLVED_FORM.machine;
  if (key.startsWith('evolved.pharmacist.')) return EVOLVED_FORM.pharmacist;
  if (key.startsWith('evolved.gainer.')) return EVOLVED_FORM.gainer;
  if (key.startsWith('evolved.homeroomQueen.')) return EVOLVED_FORM.homeroomQueen;
  if (key.endsWith('.v2.depth')) return V2_DEPTH;
  return V2_DEPTH;
}

const PREFIXES = [
  'emb.', 'res.', 'ritual.', 'echo.', 'dream.',
  'homeroom.activity.',
  'milestone.v2.depth', 'campus.v2.depth', 'device.v2.depth', 'intimacy.v2.depth',
  'hunger.v2.depth', 'growth.v2.depth', 'immobility.v2.depth', 'weekly.v2.depth',
  'confront.v2.depth', 'psych.v2.depth', 'eating.v2.depth', 'clothing.v2.depth',
  'origin.v2.depth', 'ascension.v2.depth', 'feedVoice.v2.depth', 'earlyGain.v2.depth',
  'echo.v2.depth', 'wifeLessonsTalk.v2.depth', 'evolved.',
];

const thin = [];
for (const [key, variants] of _registryEntries()) {
  if (!PREFIXES.some((p) => key.startsWith(p) || key === p)) continue;
  const texts = wildcardTexts(variants);
  if (texts.length >= 3) continue;
  thin.push({ key, texts, need: 3 - texts.length });
}

const lines = [
  '// The Squad — Lead: A4 Architect | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateV2WildcardDepth.mjs',
  '// Wildcard depth for V2 pools (emb, res, ritual, echo, dream, *.v2.depth, homeroom).',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

for (const { key, texts, need } of thin) {
  const exclude = new Set(texts);
  const seed = hash(key + (texts[0] || ''));
  const extras = pickN(bankFor(key), seed, exclude, need);
  if (extras.length < need) continue;
  lines.push(
    `registerModuleVariants(${esc(key)}, [{ when: {}, weight: 3, text: [${extras.map(esc).join(', ')}] }]);`,
  );
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateV2WildcardDepth: ${thin.length} thin wildcard pools → ${lines.length - 5} padded`);
