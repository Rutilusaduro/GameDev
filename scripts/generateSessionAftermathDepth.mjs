// Generate session/aftermathDepth.js — pad session.aftermath wildcard pools to ≥3 texts.
// Run: node scripts/generateSessionAftermathDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const AFTERMATH_PATH = 'src/textEngine/scenes/session/aftermath.js';
const OUT_PATH = 'src/textEngine/scenes/session/aftermathDepth.js';

const CONTINUATION = [
  ' The room goes quiet around her fullness.',
  ' Warmth pools in her middle — patient, lush, settled.',
  ' She breathes slow; satisfaction replaces urgency.',
  ' Fabric whispers; she does not shift to accommodate it.',
  ' The evening softens into aftermath glow.',
  ' Heat radiates through her where hands rest.',
  ' She lets the meal finish inside her without hurry.',
  ' Fullness becomes the furniture she sits in.',
  ' Her eyes half-close; appetite gives way to contentment.',
  ' The chair knows her weight now; so do you.',
];

const DIALOGUE = [
  '"I\'m glad I came," she says, voice loose with satisfaction.',
  '"I can\'t move," she admits, not trying to.',
  '"I ate everything," she murmurs, quietly proud.',
  '"This is what I want," she says eventually — plain, sure.',
  '"Don\'t go yet," she breathes, hands on her middle.',
  '"I always do this," she laughs softly, pleased.',
  '"Stay," she asks, warm and unhurried.',
  '"More next time," she promises, already planning.',
  '"I feel enormous," she whispers, and smiles.',
  '"Thank you," she says — for food, for attention, for both.',
];

const BAND_PROSE = {
  light: [
    'She is full and comfortable, loose-limbed, eating the last bites without urgency.',
    'Pleasant fullness settles; she savors the end of the meal like dessert.',
    'Warm and satisfied, she slows — appetite satisfied, mood easy.',
    'The evening ends gently; she is full enough to glow, not enough to stall.',
    'She finishes unhurried, pleased with how the session went.',
  ],
  full: [
    'She leans back and stays back, both hands on her full round belly, breathing carefully.',
    'Middle drum-tight with warmth; she does not attempt to stand.',
    'Full enough that movement is optional; she chooses stillness.',
    'Her belly rests heavy in her lap; she breathes around it, content.',
    'She is packed pleasant — round, warm, unwilling to rush the settling.',
  ],
  stuffed: [
    'She has gone very still, spectacularly full, belly a round warm mass under her palms.',
    'Past comfortable and into wonder — she presses hands flat, feeling every ounce.',
    'Enormous with the meal, she moves only to breathe deeper.',
    'Stuffed and serene; fullness owns the room around her.',
    'She sits like a monument to appetite answered — vast, warm, unmoving.',
  ],
  packed: [
    'She is enormous with food — belly rounded, firm, extraordinary under her hands.',
    'Packed to the ceiling of capacity; warmth radiates from her middle.',
    'The meal lives inside her like architecture — vast, warm, absolute.',
    'She keeps her hands on her belly, feeling weight, heat, the truth of how much.',
    'Extraordinary fullness crowns her; the silence between you is reverent.',
  ],
};

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

function bandFromKey(key) {
  const m = key.match(/aftermath\.([^.]+)/);
  return m ? m[1] : 'light';
}

function classify(text) {
  const t = text.trim();
  if (t.includes('{session.aftermath.')) return 'skeleton';
  if (t.startsWith('.')) return 'continuation';
  if (/^"[^"]+"\s/.test(t)) return 'dialogue';
  return 'prose';
}

function altsFor(text, key) {
  const seed = hash(text + key);
  const kind = classify(text);
  if (kind === 'continuation') return pick2(CONTINUATION, seed);
  if (kind === 'dialogue') return pick2(DIALOGUE, seed);
  const band = bandFromKey(key);
  const bank = BAND_PROSE[band] || BAND_PROSE.light;
  return pick2(bank, seed);
}

function esc(s) {
  return JSON.stringify(s);
}

function parseQuotedTexts(arrayBody) {
  const texts = [];
  const strRe = /"((?:\\.|[^"\\])*)"/g;
  let sm;
  while ((sm = strRe.exec(arrayBody))) texts.push(sm[1]);
  return texts;
}

function padExtras(texts, key, body) {
  const need = Math.max(0, 3 - (texts?.length || 0));
  if (need === 0 || !texts?.[0]) return [];
  if (texts[0]?.includes('{session.aftermath.')) {
    const allSlots = [];
    const allRe = /text:\s*\[([\s\S]*?)\]/g;
    let am;
    while ((am = allRe.exec(body))) {
      for (const t of parseQuotedTexts(am[1])) {
        if (t.includes('{session.aftermath.')) allSlots.push(t);
      }
    }
    const unique = [...new Set(allSlots)].filter((s) => !texts.includes(s));
    const extras = [];
    for (let i = 0; i < need; i++) extras.push(unique[i % unique.length] || texts[0]);
    return extras;
  }
  const [a, b] = altsFor(texts[0], key);
  return need === 1 ? [a] : [a, b];
}

function parsePools(src) {
  const pools = [];
  const re = /registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g;
  let m;
  while ((m = re.exec(src))) {
    const key = m[1];
    if (!key.startsWith('session.aftermath') || key === 'session.aftermath') continue;
    const body = m[2];
    if (/when:\s*\{[^}\s]/.test(body)) continue;
    const wildMatch = body.match(/\{\s*when:\s*\{\}\s*,\s*text:\s*\[([\s\S]*?)\]\s*\}/);
    if (!wildMatch) continue;
    const texts = parseQuotedTexts(wildMatch[1]);
    const extras = padExtras(texts, key, body);
    if (extras.length) pools.push({ key, extras });
  }
  return pools;
}

const src = readFileSync(AFTERMATH_PATH, 'utf8');
const pools = parsePools(src);

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateSessionAftermathDepth.mjs',
  '// Wildcard depth for session.aftermath pools (Pass 29).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const { key, extras } of pools) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

lines.push(
  "registerModuleVariants('session.aftermath', [{ when: {}, text: ['{subject.name} settles back, full and warm, pleased with the evening.', '{subject.name} rests heavy and content, the meal settling into soft warmth.'] }]);",
);

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateSessionAftermathDepth: ${pools.length} pools → ${OUT_PATH}`);
