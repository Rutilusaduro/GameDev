// Unique extras for Phase D diary fragments. Only keys that already exist.
// Run: node scripts/generatePhaseDUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/diaryPhaseD.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/diaryPhaseDUpgrade.js';

const FORM = {
  competitive_gainer: {
    full: [
      'I logged the board again after dinner and left the pins where the numbers argued.',
      'Leaderboard night. I sat wider and called it data collection.',
      'I compared columns until my own waist won, then I ate to defend the lead.',
      'Tape measure on the desk, crumbs in the margins, first place still mine.',
      'I moved a pin up and felt the chair take more of me.',
      'Competitive category: mass. I am not drafting a silver medal.',
      'Brittany\'s thigh number sits under mine. I intend to keep it there.',
      'Kylie\'s bust column is loud. My middle is louder.',
      'I wrote "gap" in red and then widened it at the dining hall.',
      'The corkboard leans from the weight of paper. So do I.',
    ],
    glue: [
      'The desk meets belly first now; I log that as a win condition.',
      'Pins slide easier when I lean. Softness is doing the work.',
      'Waistband reports in. I file the report under satisfactory.',
      'Chair friction is a metric I keep returning to.',
      'I already know I will be the largest. The board is catching up.',
      'Second place can stay folklore. I am writing first.',
      'Spreadsheets do not blush. I do, then I add another row.',
      'Appetite has a scoring system and I am on a streak.',
    ],
    talk: [
      '"Largest. The only category." I pin it anyway.',
      '"I am not researching this anymore," I tell the empty room, and keep measuring.',
    ],
  },
  machine_goddess: {
    full: [
      'Workshop log: belt hummed, belly answered, I called it a clean run.',
      'Solder smell, warm paste, another self-test I refused to farm out.',
      'Feeder arm online. I ate through calibration and kept the printout.',
      'I built the loop to be honest. Pressure in, volume out, notes in black ink.',
      'The bench is sticky with success. I am stickier.',
      'I logged "repeatable" and then repeated it because I wanted to.',
      'Machine and mouth, dual intake. Professional language for a private grin.',
      'I tightened a strap and loosened a waistband in the same hour.',
      'Prototype three sits on my hips like it belongs there.',
      'I am the test jig. The jig is thriving.',
    ],
    glue: [
      'Self-test: green. Margin: three checkmarks I did not need and kept.',
      'Belt warm, data clean, shame still listed as optional.',
      'I wrote successful until the word looked like appetite.',
      'Closed loop. I am both input and output.',
      'The arm does not get tired. I do not ask it to stop.',
      'Paste on the tongue, numbers on the pad. Correlation holds.',
      'I calibrated pleasure and called the file firmware.',
      'Hardware fits better when there is more of me to fit.',
    ],
    talk: [
      '"Successful," I say to the empty shop, and start the next run.',
      '"Leave it on," I tell the belt, as if it asked.',
    ],
  },
  salon_appetit: {
    full: [
      'Butter in the dorm air. I poured before anyone sat.',
      'Guests arrived to candles and a board already breathing.',
      'Paris taught stop. I am teaching continue, course by course.',
      'I set three plates and then a fourth because the table looked lonely.',
      'Wine first, names later. The room understood.',
      'I ate with them and then past them. Hostess privilege.',
      'The croissant shed crumbs on a dress that has learned new geography.',
      'I unlearned restraint so thoroughly the guests took notes.',
      'Salon rule: no one leaves lighter than they came, including me.',
      'I kept the candles lit after they left and finished the board.',
    ],
    glue: [
      'She pours without asking. Abundance is the only dialect tonight.',
      'Cheese breathing, guests hungry on purpose, hostess already ahead.',
      'Wine finds glasses the way appetite finds me.',
      'I bite and talk and refuse the old Paris stop.',
      'The board empties from the middle outward. So do I fill.',
      'Candlelight is flattering to a second helping.',
      'Continue, I said, and meant the platter and my waist.',
      'Guests learn the house style by watching my plate.',
    ],
    talk: [
      '"In Paris they teach you to stop. Here I teach continue."',
      '"Sit. Eat. I already decided for the table."',
    ],
  },
  artisan_gallery: {
    full: [
      'Contact sheet up. Subject mid-bite, mid-laugh, mid-yes.',
      'I pinned the honest frame and left the caption off.',
      'The series is appetite. I am in two of the frames on purpose.',
      'Studio light, no retouch. Fullness does the composition.',
      'I signed the wall label with a weight I am not hiding.',
      'Camera stays. Plate stays. I stay in the chair between shots.',
      'Everyone signed. Everyone ate. The show is already happening.',
      'I photographed a classmate\'s second helping and then had my own.',
      'In Progress row is a row of middles. Mine leads the hang.',
      'The best subject keeps returning to the kitchen.',
    ],
    glue: [
      'The subject cooperates. Meaning the mouth, not the pose.',
      'Camera does not flatter and does not need to.',
      'Consent forms on the table, crumbs on the forms.',
      'Good subject: hungry, unashamed, still chewing.',
      'I load film with greasy fingers and call it process.',
      'The print is honest. So is the waistband in it.',
      'I hung the work at belly height. Viewers have to look up.',
      'Art contract, dinner contract — same signature.',
    ],
    talk: [
      '"The subject cooperates," I say, already reaching for more film.',
      '"The camera does not lie. Neither does the plate."',
    ],
  },
  pharmacist: {
    full: [
      'Home lab, batch one cooling, my handwriting on the stimulant label.',
      'I tasted the dose first. Methodology starts in the gut.',
      'Kitchen smells like glassware and want. I logged expected variance.',
      'Beakers on the rack, appetite on the clock, ethics nodding along.',
      'I synthesized, I swallowed, I updated the sheet in that order.',
      'Professional responsibility tasted warm. I did not dilute it.',
      'Batch two is richer. I am richer. The correlation is the point.',
      'I stopped pretending the trial had a control group.',
      'Labels in my hand, softness in my lap, notes in black ink.',
      'The kitchen is a lab and I am the preferred solvent.',
    ],
    glue: [
      'Self-administered. Warmth immediate. Spreadsheet green.',
      'I drank it before anyone else. Data likes a first body.',
      'Expected variance, unexpected grin. I kept both.',
      'Ethics committee in my head stamped approve.',
      'Stomach first, citation later.',
      'I logged the heat and then asked the pot for seconds.',
      'Participation is not optional when the hypothesis is me.',
      'Dose landed. Appetite climbed. I called it on-spec.',
    ],
    talk: [
      '"Batch one works," I tell the empty kitchen, and pour another.',
      '"Expected variance," I say, hand on the warmth.',
    ],
  },
};

const STAGE_BIT = {
  5: ['Early board, early heat.', 'Week-one softness already measurable.'],
  6: ['The loop is tighter this week.', 'Calibration becoming habit.'],
  7: ['Scale jumped. I did not flinch.', 'Mid-arc and still adding.'],
  8: ['Furniture has opinions now.', 'I fill the chair like a conclusion.'],
  9: ['Vast on purpose. Notes still neat.', 'I move less and record more.'],
  10: ['Immobile-adjacent. Appetite current.', 'The room rearranges around the work.'],
  11: ['Stationary and finished only on paper.', 'I keep the file open.'],
};

function prefixOf(text) {
  const m = String(text).match(/^(\.(?:\s+)?|\s+)/);
  return m ? m[1] : '';
}

function isTalk(text) {
  return /^\s*"/.test(String(text).slice(prefixOf(text).length));
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const FRAG_MARK = {
  competitive_gainer: [
    'Cork dust on my fingers.', 'A crumb on the ruler.', 'Chair arms disappearing.',
    'Ink still wet on the column.', 'The zipper already arguing.', 'Warmth under the notebook.',
    'Red string between two pins.', 'My palm finds the new roll.', 'The scale still in the hallway.',
    'A smear of sauce on the margin.',
  ],
  machine_goddess: [
    'Solder smoke in the hair.', 'Paste on the wristwatch.', 'A strap mark fading slow.',
    'The arm clicks once more.', 'Belt heat through the shirt.', 'Grease on the keypad.',
    'A washer under the bench.', 'The fan kicking on.', 'Wire clippings in the cuff.',
    'The prototype humming idle.',
  ],
  salon_appetit: [
    'Candle wax on the cloth.', 'Wine ghost on the rim.', 'Butter on the guest list.',
    'A croissant flake on silk.', 'The board breathing still.', 'A cork by the lamp.',
    'Perfume and gravy sharing air.', 'Napkin lipstick, mine.', 'The extra chair already warm.',
    'A second bottle sweating.',
  ],
  artisan_gallery: [
    'Film tabs under a nail.', 'Fixer smell, dinner smell.', 'A print curling at the belly.',
    'Consent ink not dry.', 'The hang at navel height.', 'Light meter kissing skin.',
    'A clip on the contact sheet.', 'Flour on the darkroom door.', 'The subject still chewing.',
    'Tape on the wall, peeling.',
  ],
  pharmacist: [
    'Beaker water spotting wood.', 'Label glue on my thumb.', 'A pipette rolling to a stop.',
    'The dose cup in the sink.', 'Steam on the range hood.', 'A second helping cooling.',
    'Capsules in a saucer.', 'The timer I ignored.', 'A stir-rod in the jam jar.',
    'Batch two still warm.',
  ],
};

function lineFor(form, stage, frag, n, prefix, talk) {
  const bank = FORM[form];
  if (!bank) return '';
  const pool = talk ? bank.talk : (prefix ? bank.glue : bank.full);
  const a = pool[(hash(`${form}.${stage}.${frag}.${n}`) + n) % pool.length];
  const b = STAGE_BIT[stage]?.[n % 2] || '';
  const marks = FRAG_MARK[form] || FRAG_MARK.competitive_gainer;
  const c = marks[(frag + n * 3) % marks.length];
  const body = [a, b, c].filter(Boolean).join(' ');
  const out = `${prefix}${body}`;
  return [...out].length > 198 ? `${prefix}${a} ${c}` : out;
}

function firstText(variants) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const t of arr) if (typeof t === 'string' && t.trim()) return t;
  }
  return '';
}

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => /^diary\.(competitive_gainer|machine_goddess|salon_appetit|artisan_gallery|pharmacist)\.s\d+\._f\d+$/.test(k));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generatePhaseDUpgrade.mjs',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

const seen = new Set();
let n = 0;
for (const key of keys) {
  const rec = _registryEntries().find(([k]) => k === key);
  const sample = firstText(rec?.[1] || []);
  const prefix = prefixOf(sample);
  const talk = isTalk(sample);
  const m = key.match(/diary\.([a-z_]+)\.s(\d+)\._f(\d+)/);
  if (!m) continue;
  const [, form, stageStr, fragStr] = m;
  const stage = Number(stageStr);
  const frag = Number(fragStr);
  const texts = [0, 1].map((i) => lineFor(form, stage, frag, i, prefix, talk)).filter(Boolean);
  const uniq = [];
  for (const t of texts) {
    if (seen.has(t) || uniq.includes(t)) continue;
    seen.add(t);
    uniq.push(t);
  }
  if (!uniq.length) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 5, text: ${JSON.stringify(uniq)} }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generatePhaseDUpgrade: ${n} pools → ${OUT}`);
