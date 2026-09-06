// Generate session/fullnessDepth.js — pad session.fullness wildcard pools to ≥3 texts.
// Run: node scripts/generateSessionFullnessDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const FULLNESS_PATH = 'src/textEngine/scenes/session/fullness.js';
const OUT_PATH = 'src/textEngine/scenes/session/fullnessDepth.js';

const CONTINUATION = [
  ' She does not hurry the next bite.',
  ' Warmth pools under her ribs — patient, lush, real.',
  ' Appetite outpaces embarrassment tonight.',
  ' She eats like the room belongs to her.',
  ' Fullness arrives in layers she welcomes.',
  ' Her breath slows; the fork does not.',
  ' Satisfaction shows in how she settles into the chair.',
  ' She leans back only to lean forward again.',
  ' The meal lengthens; she lets it.',
  ' Heat gathers in her middle — soft, deliberate, sure.',
];

const DIALOGUE = [
  '"I\'m okay," she murmurs — to herself as much as to you.',
  '"Keep going," she says, already reaching again.',
  '"I can handle more," she insists, cheeks flushed.',
  '"Don\'t stop yet," she breathes, pleased and stubborn.',
  '"I\'m not done," she admits, finally plain about it.',
  '"One more," she promises — then another after that.',
  '"I want it," she whispers, unashamed.',
  '"Feed me," she asks, voice low and certain.',
  '"I know," she answers, warm and unhurried.',
  '"Yes," she breathes. "Yes to all of it."',
];

const FULLNESS_TIER = {
  f0: [
    'She eats easily, appetite open, middle still quiet.',
    'Fork steady, mood light — she has barely begun.',
    'Warmth is a rumor so far; she commits like it is a sport.',
    'She takes bites without performance, comfortable and curious.',
    'The meal is young; she looks pleased to be here.',
  ],
  f1: [
    'A warmth spreads through her middle; she slows but does not stop.',
    'Cheeks color; conversation thins as food wins attention.',
    'Her shirt rests a little tighter; she keeps eating anyway.',
    'Breath deepens between bites — appetite sharpening, not fading.',
    'She has been at it awhile; the pace stays eager.',
  ],
  f2: [
    'She is genuinely full — you see it in her breath — and keeps going.',
    'Belly rounds softly; movements slow, fork still busy.',
    'Fullness shows at her waistband; she pretends not to notice.',
    'She presses her palm to her middle once, then reaches again.',
    'Satisfaction and hunger braid together; she eats through both.',
  ],
  f3: [
    'Her belly is firm and round, very full; she picks the fork back up.',
    'Middle drum-tight with warmth; she exhales and commits to more.',
    'She cups her middle briefly — checking, not stopping.',
    'Fullness pools under her ribs; color high, mood loose.',
    'She is packed and pleased; the next bite is already chosen.',
  ],
  f4: [
    'Past full for some time — belly heavy in her lap, bites deliberate.',
    'She breathes between swallows; stubborn appetite refuses the ceiling.',
    'Movements go slow and sure; she eats like it is a decision.',
    'Her middle dominates the chair; she makes room and keeps going.',
    'Overfull and unhurried — she treats capacity as a suggestion.',
  ],
  f5: [
    'She has eaten an extraordinary amount — middle enormous, warm, tight.',
    'Packed to radiance; she finishes one bite and rests hands on herself.',
    'Belly vast with the meal; she sounds genuinely impressed with herself.',
    'Fullness crowns her lap; she leans back, then leans into more.',
    'The spread surrenders; she glows with the weight of it inside her.',
  ],
};

const ARCHETYPE_FLAVOR = {
  cheerleader: [
    'Good posture, squad mentality: she commits fully to every bite.',
    'She eats like a captain — loud appetite, louder pride.',
    'Rosy cheeks, competitive grin; she will finish what she starts.',
  ],
  bookworm: [
    'She reads between bites, then forgets the page for the plate.',
    'Quiet focus on flavor; fullness arrives before she looks up.',
    'She savors like she annotates — slow, thorough, greedy.',
  ],
  athlete: [
    'Old discipline shows in how she paces bites — then abandons it for more.',
    'She eats like training: reps of appetite until capacity yields.',
    'Muscle memory says stop; appetite overrules.',
  ],
  influencer: [
    'She eats camera-aware and still sincere — pleasure is content.',
    'Every bite looks accidental; none of them are.',
    'She narrates fullness like a story her followers would envy.',
  ],
  gamer: [
    'One hand on the controller, one on the fork — both win tonight.',
    'She snacks in streaks, fullness stacking between rounds.',
    'Lag between bites shrinks; appetite levels up.',
  ],
  quiet: [
    'She eats in small motions that add up fast.',
    'Silence around the plate; fullness speaks for her.',
    'She blushes when you notice how much is gone.',
  ],
  sorority: [
    'She eats like the table is a party and she is hosting.',
    'Laughter thins as fullness thickens; she keeps the mood warm.',
    'Sisterhood energy: share the plate, outdo the appetite.',
  ],
  artsy: [
    'She treats the meal like composition — color, texture, excess.',
    'Fullness becomes aesthetic; she admires the curve it makes.',
    'She eats with ceremony, then abandons ceremony for greed.',
  ],
  overachiever: [
    'She tracks bites like milestones — then exceeds the plan.',
    'Fullness is a metric she intends to beat.',
    'She eats efficiently until efficiency loses to want.',
  ],
  transfer: [
    'New appetite, new appetite — she samples everything twice.',
    'She eats like she is catching up on a life of restraint.',
    'Curiosity and hunger braid; she refuses to leave food unexplored.',
  ],
  default: [
    'Warmth and appetite braid; she stays with the meal.',
    'She eats steadily, unselfconscious, pleased to be fed.',
    'Fullness deepens; she does not suggest stopping.',
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

function tierFromKey(key) {
  const m = key.match(/\.f(\d+)/);
  return m ? `f${m[1]}` : 'f2';
}

function archetypeFromKey(key) {
  const m = key.match(/session\.fullness\.([^.]+)/);
  return m ? m[1] : 'default';
}

function classify(text) {
  const t = text.trim();
  if (t.includes('{session.fullness.')) return 'skeleton';
  if (t.startsWith('.')) return 'continuation';
  if (/^"[^"]+"\s*(she|he)/i.test(t) || /^`/.test(t)) return 'dialogue';
  return 'prose';
}

function altsFor(text, key) {
  const seed = hash(text + key);
  const kind = classify(text);
  if (kind === 'continuation') return pick2(CONTINUATION, seed);
  if (kind === 'dialogue') return pick2(DIALOGUE, seed);
  const tier = tierFromKey(key);
  const archetype = archetypeFromKey(key);
  const tierBank = FULLNESS_TIER[tier] || FULLNESS_TIER.f2;
  const archBank = ARCHETYPE_FLAVOR[archetype] || ARCHETYPE_FLAVOR.default;
  const [a] = pick2(tierBank, seed);
  const [b] = pick2(archBank, seed + 1);
  return [a, b];
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
  if (texts[0]?.includes('{session.fullness.')) {
    const allSlots = [];
    const allRe = /text:\s*\[([\s\S]*?)\]/g;
    let am;
    while ((am = allRe.exec(body))) {
      for (const t of parseQuotedTexts(am[1])) {
        if (t.includes('{session.fullness.')) allSlots.push(t);
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
    if (!key.startsWith('session.fullness') || key === 'session.fullness') continue;
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

const src = readFileSync(FULLNESS_PATH, 'utf8');
const pools = parsePools(src);

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateSessionFullnessDepth.mjs',
  '// Wildcard depth for session.fullness pools (Pass 28).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const { key, extras } of pools) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

lines.push(
  "registerModuleVariants('session.fullness', [{ when: {}, text: ['{subject.name} eats steadily, warmth spreading through her middle.', '{subject.name} keeps going — appetite bright, belly warming by degrees.'] }]);",
);

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateSessionFullnessDepth: ${pools.length} pools → ${OUT_PATH}`);
