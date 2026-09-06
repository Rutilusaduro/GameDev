// Generate intimacy fragmentDepth.js — pad intimacy wildcard pools to ≥3 texts.
// Run: node scripts/generateIntimacyFragmentDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const FRAGMENTS_PATH = 'src/textEngine/scenes/intimacy/fragments.js';
const SKELETONS_PATH = 'src/textEngine/scenes/intimacy/skeletons.js';
const OUT_PATH = 'src/textEngine/scenes/intimacy/fragmentDepth.js';

const CONTINUATION = [
  '. The warmth sharpens; neither of you breaks contact.',
  '. Her body settles deeper — soft, deliberate, sure.',
  '. Breath slows; the moment lengthens without hurry.',
  '. Weight finds its angle and stays.',
  '. Heat pools where skin meets fabric.',
  '. She exhales and leans into the touch.',
  '. The stillness feels chosen, not accidental.',
  '. Soft flesh yields under your hands.',
  '. Contact deepens by degrees.',
  '. She does not rush the settling.',
  '. Fullness presses close — warm, patient, real.',
  '. The room narrows to where you touch.',
  '. Her mass redistributes; you feel every inch.',
  '. Warmth arrives in layers.',
  '. She lets you feel all of it.',
  '. The pressure sweetens; she stays.',
  '. A small sound escapes her — pleased, unguarded.',
  '. She shifts once, making sure you notice.',
  '. The give of her body answers your hands.',
  '. She trusts you with the weight of her.',
];

const DIALOGUE = [
  '"Stay," she murmurs — not asking, inviting.',
  '"Don\'t stop," she breathes, already closer.',
  '"Like that," she whispers. "Exactly like that."',
  '"More," she says, voice low and certain.',
  '"I know," she answers, warm and unhurried.',
  '"You feel it too," she says — not a question.',
  '"Good," she murmurs. "Keep going."',
  '"I\'m not going anywhere," she promises softly.',
  '"Say it again," she asks, cheeks flushed.',
  '"Yes," she breathes. "Yes to all of it."',
  '"Don\'t be gentle," she whispers — then laughs at herself.',
  '"I want this," she admits, finally plain about it.',
];

const SCENE_PROSE = {
  her_weight: [
    'She pauses before you, reading your face, then commits — lowering herself into your lap.',
    'Caution first, then weight: she settles against you in one slow, deliberate motion.',
    'Hesitation flickers; she sits anyway, and warmth arrives in stages.',
    'She lowers herself carefully, distributing mass until you feel all of her.',
    'The descent is unhurried — thighs, hips, belly finding you by degrees.',
  ],
  wall_press: [
    'Her back meets the wall; your body meets hers — warmth building between you.',
    'She lets you pin her gently, soft resistance melting into welcome.',
    'Contact sharpens: belly, hips, the slow press of shared heat.',
    'She braces against the wall and pulls you closer with her mass.',
    'The wall holds her; you hold the rest — warm, close, intent.',
  ],
  belly_focus: [
    'Her hands guide yours to the soft crest of her middle.',
    'She lifts her shirt without ceremony — belly warm, rounded, offered.',
    'Attention settles on her belly like sunlight: slow, worshipful, sure.',
    'She arches slightly, presenting the curve you both know you want.',
    'Warm flesh yields under your palms; she watches your face, not her body.',
  ],
  chest_buried: [
    'Softness envelops you — warmth, weight, the hush of her breathing.',
    'She draws you in until the world narrows to heat and give.',
    'You sink into her; she holds you there, patient and vast.',
    'Breath and softness surround you — intimate, overwhelming, safe.',
    'She cradles your head; the rest of her becomes the room.',
  ],
  dinner_afterward: [
    'Fullness lingers between you — plates cleared, bodies closer.',
    'She is pleasantly packed; the evening leans toward softness.',
    'Satisfaction pools in her middle; she makes room for you anyway.',
    'The meal is over; appetite has become something slower and warmer.',
    'She pats her belly once, content, and reaches for you instead of dessert.',
  ],
  feed_close: [
    'She eats while you watch — unhurried, aware of your eyes, pleased.',
    'Bite after bite, closeness builds faster than fullness.',
    'Food and attention braid together; she feeds, you witness.',
    'She chews slowly, letting you see every swallow land.',
    'The feeding is intimate before it is finished — you both know it.',
  ],
  kissing_pull: [
    'She kisses you and pulls you closer — hunger in the mouth, hunger everywhere.',
    'The kiss deepens; her body follows, soft and insistent.',
    'She draws you in by the mouth and by the weight of her.',
    'Lips, breath, belly — everything leans toward more contact.',
    'She tastes like want; her hands refuse to let you go.',
  ],
  session_high_fullness: [
    'She is overstuffed and radiant — belly tight, mood loose, yours to touch.',
    'Fullness makes her languid; she offers the warm expanse of herself anyway.',
    'Packed middle rises and falls; she is drunk on food and attention.',
    'She can barely shift, but she shifts toward you — greedy for contact.',
    'The session left her vast inside; she wants you to feel the aftermath.',
  ],
  session_tapout: [
    'She taps out breathless — full, flushed, still hungry for your hands.',
    'Capacity reached; desire has not. She looks at you, pleading and proud.',
    'She surrendered to fullness but not to you — not yet.',
    'Overfull and overstimulated, she trembles when you touch her anyway.',
    'The tap was for food, not for this. She stays close, begging with her eyes.',
  ],
  squeeze_chest: [
    'Soft weight spills into your hands — generous, warm, impossible to ignore.',
    'She presses forward, offering softness without apology.',
    'Your fingers sink; she exhales, pleased to be held there.',
    'Warmth and give answer your grip; she leans into it.',
    'She watches your hands work — proud, breathless, unashamed.',
  ],
  squeeze_thighs: [
    'Thick thighs part under your hands — warm, heavy, welcoming.',
    'She spreads slightly, letting you feel the breadth of her.',
    'Soft muscle and softer flesh yield; she hums low in her throat.',
    'Her legs are an invitation; she guides your palms along them.',
    'Pressure meets give; she does not pretend to be small.',
  ],
  thighs_lap: [
    'Her thighs bracket you — warm walls of softness, close and sure.',
    'She settles astride or aside until your world is legs and heat.',
    'Thick thighs press close; movement becomes optional.',
    'She uses her lap like a throne and pulls you into it.',
    'Warm weight of her legs steadies you; she likes being the anchor.',
  ],
  under_her: [
    'She looms soft above you — belly, breath, the slow tide of her.',
    'Warm shadow and warmer flesh; you are beneath all of her.',
    'She cages you gently with mass — not trapping, holding.',
    'The view is belly and smile; she likes that you chose it.',
    'She lowers herself by inches until you are fully under her warmth.',
  ],
};

const GENERIC_PROSE = [
  'Warmth and weight settle between you — unhurried, present, real.',
  'She moves closer until contact becomes the whole conversation.',
  'Soft flesh finds your hands; she exhales, pleased and patient.',
  'The moment deepens; neither of you suggests stopping.',
  'Her body answers touch with give, heat, and quiet certainty.',
  'She stays where she is — vast, warm, willing to be felt.',
  'Contact sharpens by degrees until want is the only language left.',
  'She lets you take your time; she has plenty of herself to offer.',
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

function classify(text) {
  const t = text.trim();
  if (t.length < 30 && (t.startsWith('.') || /^[a-z]/.test(t))) return 'continuation';
  if (t.includes('"') || t.includes("'")) return 'dialogue';
  return 'prose';
}

function sceneFromKey(key) {
  const m = key.match(/^intimacy\.([^.]+)/);
  return m ? m[1] : 'generic';
}

function altsFor(text, key) {
  const cls = classify(text);
  const seed = hash(text);
  if (cls === 'continuation') return pick2(CONTINUATION, seed);
  if (cls === 'dialogue') return pick2(DIALOGUE, seed);
  const scene = sceneFromKey(key);
  const bank = SCENE_PROSE[scene] || GENERIC_PROSE;
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
  const need = Math.max(0, 3 - texts.length);
  if (need === 0) return [];
  const extras = [];
  if (texts[0]?.includes('{intimacy.')) {
    const allSlots = [];
    const allRe = /text:\s*\[([\s\S]*?)\]/g;
    let am;
    while ((am = allRe.exec(body))) {
      for (const t of parseQuotedTexts(am[1])) {
        if (t.includes('{intimacy.')) allSlots.push(t);
      }
    }
    const unique = [...new Set(allSlots)].filter((s) => !texts.includes(s));
    for (let i = 0; i < need; i++) extras.push(unique[i % unique.length] || texts[0]);
    return extras;
  }
  const [a, b] = altsFor(texts[0], key);
  return need === 1 ? [a] : [a, b];
}

function parseFragmentPools(src) {
  const pools = [];
  const re = /registerPool\('([^']+)',\s*\[\s*\{\s*when:\s*\{\},\s*text:\s*\[([^\]]+)\]\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const key = m[1];
    const text = m[2].trim().replace(/^"/, '').replace(/"$/, '');
    pools.push({ key, extras: padExtras([text], key, '') });
  }
  return pools;
}

function parseSkeletonPools(src) {
  const pools = [];
  const re = /registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g;
  let m;
  while ((m = re.exec(src))) {
    const key = m[1];
    const body = m[2];
    const wildMatch = body.match(/\{\s*when:\s*\{\}\s*,\s*text:\s*\[([\s\S]*?)\]\s*\}/);
    if (!wildMatch) continue;
    const texts = parseQuotedTexts(wildMatch[1]);
    const extras = padExtras(texts, key, body);
    if (extras.length) pools.push({ key, extras });
  }
  return pools;
}

const fragSrc = readFileSync(FRAGMENTS_PATH, 'utf8');
const skelSrc = readFileSync(SKELETONS_PATH, 'utf8');
const pools = [...parseFragmentPools(fragSrc), ...parseSkeletonPools(skelSrc)];

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateIntimacyFragmentDepth.mjs',
  '// Wildcard depth for intimacy fragment + skeleton pools (Pass 26).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const { key, extras } of pools) {
  if (!extras.length) continue;
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateIntimacyFragmentDepth: ${pools.length} pools → ${OUT_PATH}`);
