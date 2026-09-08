// Generate scenes/namedPoolDepth.js — pad remaining named thin pools to ≥3 texts.
// Run: node scripts/generateNamedPoolDepth.mjs
import { writeFileSync } from 'fs';

const OUT_PATH = 'src/textEngine/scenes/namedPoolDepth.js';

// Stub so scenes/index import does not apply stale depth while scanning.
writeFileSync(OUT_PATH, `// stub during scan
import { registerModuleVariants } from '../engine.js';
`);

await import('../src/textEngine/scenes/index.js');
const { _registryEntries } = await import('../src/textEngine/engine.js');

const FRAG_MAX = 200;

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
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

function bankFor(key) {
  if (key.startsWith('echo.type.')) return ECHO;
  if (key.startsWith('echo.replay')) return ECHO_REPLAY;
  if (key.startsWith('dream.')) return DREAM;
  if (key.startsWith('ritual.')) return RITUAL;
  if (key.startsWith('emb.action.')) return EMB;
  if (key.endsWith('.v2.depth')) return V2_DEPTH;
  if (key.startsWith('opposition.')) return OPPOSITION;
  if (key.startsWith('cultivator.')) return CULTIVATOR;
  if (key.startsWith('supernatural.')) return SUPERNATURAL;
  if (key.startsWith('scrutiny.')) return SCRUTINY;
  if (key === 'bodyType.desc') return BODY;
  if (key === 'clothing.desc') return CLOTHING;
  return GENERIC;
}

const ECHO = [
  'The moment returns warmer — appetite sharper, body more present than memory promised.',
  'Archive replay: fullness intact, growth undeniable, shame absent.',
  'She crossed a threshold the room still feels when you revisit it.',
  'Digits climbed. She watched without flinching. Growth acknowledged.',
  'Fabric surrendered. Appetite did not. The echo preserves both.',
  'Immobile and content — vastness settled, food brought to her.',
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
  'Mountain-dream: sauce-rivers, landscape appetite, mutual consumption.',
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

const OPPOSITION = [
  'Institutional teeth find language for appetite — folders thick, concern performed.',
  'Vance taps once. Cooperation expected. Your class feels the room lean.',
  'Garden candles outside; dinner smells inside. Restraint flickers, appetite wins.',
];

const CULTIVATOR = [
  'Integration complete. Reneé reviews data from within her immensity — calm, correct.',
  'Digestion settles. Kitchen still functions around her permanent presence.',
];

const SUPERNATURAL = [
  'Runes glow. Scarcity arrives wearing wellness language like a crown.',
  'Actually thin — wrongness steals breath; hunger rolls off her sharper than before.',
  'The hollow act flickers — famine language failing against real appetite.',
  'Skin too tight on memory-mass. Luminous hunger beneath, honest and enormous.',
];

const SCRUTINY = [
  'Tier rises. The body on record grows harder to explain away.',
  'Institutional attention sharpens. Growth has paperwork now.',
];

const BODY = ['{word.body}', '{word.size}', '{word.movement}'];
const CLOTHING = ['{word.clothingFit}', '{word.garment.top}', '{word.garment.waist}'];

const GENERIC = [
  'Warmth and weight settle between you — unhurried, present, real.',
  'The moment deepens. Appetite honest. Fullness welcome.',
  'Soft flesh yields; she exhales, pleased and patient.',
];

const thin = [];
for (const [key, variants] of _registryEntries()) {
  if (/^_\d+\.f\d+$/.test(key)) continue;
  const texts = getTexts(variants);
  if (texts.length >= 3 || texts.length === 0) continue;
  thin.push({ key, texts, need: 3 - texts.length });
}

const lines = [
  '// The Squad — Lead: A4 Architect | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateNamedPoolDepth.mjs',
  '// Wildcard depth for named thin pools (echo, dream, ritual, v2.depth, emb, etc.).',
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
console.log(`generateNamedPoolDepth: ${thin.length} thin pools → ${lines.length - 5} padded`);
