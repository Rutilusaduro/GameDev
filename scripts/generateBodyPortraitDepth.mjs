// Generate body/portraitDepth.js — pad body.portrait wildcard pools to ≥3 texts.
// Run: node scripts/generateBodyPortraitDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const PORTRAITS_PATH = 'src/textEngine/scenes/body/portraits.js';
const OUT_PATH = 'src/textEngine/scenes/body/portraitDepth.js';

const CONTINUATION = [
  ' Softness gathers where fabric used to lie flat.',
  ' The change reads in silhouette before it reads on the scale.',
  ' Warmth and weight have begun to claim their territory.',
  ' She carries the new mass like a secret she is not hiding anymore.',
  ' Curves deepen by small, undeniable degrees.',
  ' Fabric tells the truth her mirror already knows.',
  ' Fullness settles low, then higher, then everywhere at once.',
  ' Her body answers appetite with shape — patient, lush, real.',
  ' The frame is softer now; movement costs a little more attention.',
  ' She takes up space differently — not apologetically, just honestly.',
];

const MOVEMENT = [
  'She moves with unhurried confidence, mass shifting in gentle rhythm.',
  'Every step negotiates new weight; she has learned the language of it.',
  'She walks slower now, hips and thighs leading the procession.',
  'Movement is deliberate — soft flesh answering gravity with grace.',
  'She settles into chairs like she belongs to them.',
  'Her gait has widened; the room adjusts when she crosses it.',
  'She shifts carefully, breath easy, body vast and unashamed.',
  'Getting up takes a moment; she breathes through it without complaint.',
  'She does not rush — scale has taught her patience.',
  'The floor knows her now; so does every sturdy piece of furniture.',
];

const FACE_EARLY = [
  'Her face is sharp at the cheekbones, jaw neat, neck slender and clear.',
  'Angular lines still define her — cheekbones high, collarbones visible when she lifts her chin.',
  'Her features are fine-boned and alert; softness has only just begun to visit.',
  'A slender neck, a defined jaw — the face of someone who still moves like a whisper.',
  'Cheeks smooth, eyes bright; the body beneath is still mostly suggestion.',
];

const FACE_MID = [
  'Her face has rounded — fuller cheeks, a softer jaw, color high when she is pleased.',
  'Features soften around the eyes; a double chin appears when she looks down.',
  'Her neck thickens smoothly; the angular girl is becoming someone warmer.',
  'Cheeks plush now, smile wider; her face frames abundance without apology.',
  'Her expression is open, readable — pleasure and appetite written plainly there.',
];

const FACE_HEAVY = [
  'Her face is a small, serene oval above the immensity below — soft, present, unhurried.',
  'Features settle into the calm authority of scale; she looks pleased to be looked at.',
  'Her face catches light above vast softness — gentle, indulgent, sure of herself.',
  'Cheeks full, eyes half-lidded with contentment; the face of someone well-fed and well-held.',
  'She meets your gaze without flinching; warmth radiates from her expression.',
];

const TORSO_EARLY = [
  'Her torso is flat, ribs faint through thin fabric, belly a quiet suggestion when she sits.',
  'The middle is still narrow — a gentle swell at the navel, nothing dramatic yet.',
  'Chest and waist hold the old geometry; softness gathers at the upper arms first.',
  'Fabric falls straight from her shoulders; the belly has only begun to curve.',
  'Her bust fits as it always did; the torso tells a story still in its first chapter.',
];

const TORSO_MID = [
  'Her middle rounds forward — belly soft at the navel, bust fuller against her shirts.',
  'Torso dominance grows: chest heavier, waist softer, fabric pulling across her ribs.',
  'A soft apron forms below the navel; warmth gathers under her arms when she reaches.',
  'Her bust has grown clearly; necklines strain, soft weight resting on her ribcage.',
  'Belly and chest share the spotlight now — rounded, warm, impossible to ignore in fitted tops.',
];

const TORSO_HEAVY = [
  'Her torso is the story — belly vast and hanging, bust heavy above rolling softness.',
  'Middle dominates the frame: deep belly rolls, chest pressed into warm abundance.',
  'Fabric surrenders across her torso; fullness pools under her ribs and spills forward.',
  'Her belly extends in layered softness, each roll deep and patient, heat radiating through cloth.',
  'Chest and belly are one continuous landscape of give — vast, warm, immobile with satisfaction.',
];

const LOWER_PEAR = [
  'Hips flare wide; thighs press together from hip to knee, seatline full and heavy.',
  'Lower body leads the eye — pear-shaped heft settling low, hips brushing doorframes.',
  'Thighs thick and soft, touching from mid-thigh down; her bottom pulls at every waistband.',
  'The dramatic curve lives below the waist — hips vast, legs plush, movement swaying gentle.',
  'Her lower half pools into chairs; thighs reshape every seat she claims.',
];

const LOWER_HOURGLASS = [
  'Curves cinch and flare — waist still hinted, hips and thighs carrying weight with grace.',
  'Hourglass geometry at scale: bust and hips balanced, thighs soft and pressing close.',
  'Her lower body balances fullness above — hips wide, thighs rounded, seat generous.',
  'The silhouette still dips and swells; hips and thighs have grown lush and deliberate.',
  'Thick thighs and a full seat; the hourglass has simply become more generous.',
];

const LOWER_APPLE = [
  'Her lower half has grown, though the belly still wins every comparison.',
  'Thighs and hips are present — soft, substantial — but the torso remains the headline.',
  'Legs have thickened; she navigates around the forward mass of her middle.',
  'Hips and thighs carry weight, yet everything refers back to the belly in front.',
  'Lower body rounded and warm, secondary to the vast landscape of her torso.',
];

const LOWER_ATHLETIC = [
  'Thighs still remember muscle under softness — broad, heavy, planted wide.',
  'Her athletic frame shows in the breadth of hip and thigh, power turned plush.',
  'Legs thick enough to reshape chairs; the old stride buried under generous flesh.',
  'Thighs vast, stance wide — the body of someone who once ran, now still and full.',
  'Lower body dense and soft; muscle memory lives in how she holds her mass.',
];

const LOWER_STRAIGHT = [
  'Weight distributes evenly — belly, hips, and thighs sharing the gain without drama.',
  'Her lower body has thickened in proportion; thighs touch, hips softened, seat fuller.',
  'Legs rounded and unhurried; the straight silhouette simply became more substantial.',
  'Hips and thighs grew together, an even swell from waist to knee.',
  'Lower body plush and symmetrical — no single curve steals the show.',
];

const GENERIC_PROSE = [
  'Warmth and softness define her now — unhurried, present, sensually real.',
  'Her body tells the story of appetite answered: lush curves, patient give, honest scale.',
  'Fabric strains where softness insists; she wears the change without shame.',
  'Mass has arrived in layers — face, torso, thighs — each softer than the last visit.',
  'She occupies space with new authority; the room adjusts around her warmth.',
];

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

function stageNum(key) {
  const m = key.match(/\.s(\d+)/);
  return m ? Number(m[1]) : 5;
}

function bodyTypeFromKey(key) {
  const m = key.match(/body\.portrait\.([^.]+)/);
  return m ? m[1] : 'generic';
}

function fragmentKind(key, text) {
  const t = text.trim();
  if (t.includes('{body.portrait.')) return 'skeleton';
  if (t.startsWith('.')) return 'continuation';
  if (/_f\d+$/.test(key)) {
    const fn = key.match(/_f(\d+)$/)?.[1];
    if (fn && Number(fn) >= 5) return 'movement';
  }
  const lower = t.toLowerCase();
  if (/\b(move|walk|gait|shift|step|navigate|immobile|does not move)\b/.test(lower)) return 'movement';
  if (/\b(face|cheek|jaw|neck|chin|brow)\b/.test(lower)) return 'face';
  if (/\b(belly|bust|torso|ribs|chest|apron|middle)\b/.test(lower)) return 'torso';
  if (/\b(hip|thigh|leg|seat|bottom|lower)\b/.test(lower)) return 'lower';
  return 'prose';
}

function stageBand(stage) {
  if (stage <= 2) return 'early';
  if (stage <= 6) return 'mid';
  if (stage <= 9) return 'heavy';
  return 'immob';
}

function lowerBank(bodyType) {
  switch (bodyType) {
    case 'pear': return LOWER_PEAR;
    case 'hourglass': return LOWER_HOURGLASS;
    case 'apple': return LOWER_APPLE;
    case 'athletic': return LOWER_ATHLETIC;
    case 'straight': return LOWER_STRAIGHT;
    default: return GENERIC_PROSE;
  }
}

function faceBank(band) {
  if (band === 'early') return FACE_EARLY;
  if (band === 'mid') return FACE_MID;
  return FACE_HEAVY;
}

function torsoBank(band) {
  if (band === 'early') return TORSO_EARLY;
  if (band === 'mid') return TORSO_MID;
  return TORSO_HEAVY;
}

function altsFor(text, key) {
  const seed = hash(text + key);
  const kind = fragmentKind(key, text);
  const stage = stageNum(key);
  const band = stageBand(stage);
  const bodyType = bodyTypeFromKey(key);

  if (kind === 'continuation') return pick2(CONTINUATION, seed);
  if (kind === 'movement') return pick2(MOVEMENT, seed);
  if (kind === 'face') return pick2(faceBank(band), seed);
  if (kind === 'torso') return pick2(torsoBank(band), seed);
  if (kind === 'lower') return pick2(lowerBank(bodyType), seed);
  return pick2(GENERIC_PROSE, seed);
}

function esc(s) {
  return JSON.stringify(s);
}

function parseQuotedTexts(arrayBody) {
  const texts = [];
  const patterns = [
    /"((?:\\.|[^"\\])*)"/g,
    /'((?:\\.|[^'\\])*)'/g,
  ];
  for (const strRe of patterns) {
    let sm;
    while ((sm = strRe.exec(arrayBody))) texts.push(sm[1]);
  }
  return texts;
}

function padExtras(texts, key, body) {
  const need = Math.max(0, 3 - (texts?.length || 0));
  if (need === 0 || !texts?.[0]) return [];
  const extras = [];
  if (texts[0]?.includes('{body.portrait.')) {
    const allSlots = [];
    const allRe = /text:\s*\[([\s\S]*?)\]/g;
    let am;
    while ((am = allRe.exec(body))) {
      for (const t of parseQuotedTexts(am[1])) {
        if (t.includes('{body.portrait.')) allSlots.push(t);
      }
    }
    const unique = [...new Set(allSlots)].filter((s) => !texts.includes(s));
    for (let i = 0; i < need; i++) extras.push(unique[i % unique.length] || texts[0]);
    return extras;
  }
  const [a, b] = altsFor(texts[0], key);
  return need === 1 ? [a] : [a, b];
}

function parsePortraitPools(src) {
  const pools = [];
  const re = /registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g;
  let m;
  while ((m = re.exec(src))) {
    const key = m[1];
    if (!key.startsWith('body.portrait') || key === 'body.portrait') continue;
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

const src = readFileSync(PORTRAITS_PATH, 'utf8');
const pools = parsePortraitPools(src);

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateBodyPortraitDepth.mjs',
  '// Wildcard depth for body.portrait pools (Pass 27).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const { key, extras } of pools) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

// Root selector fallback — lexicon-only cell; pad with semantic skeleton alternates.
lines.push(
  "registerModuleVariants('body.portrait', [{ when: {}, text: ['{body.face} {body.torso} {body.lower}.', '{body.face} {body.torso} {body.movement}.'] }]);",
);

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateBodyPortraitDepth: ${pools.length} pools → ${OUT_PATH}`);
