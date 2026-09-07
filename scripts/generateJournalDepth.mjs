// Generate researchJournal/depth.js — pad journal.feeder.* wildcard pools to ≥3 texts.
// Run: node scripts/generateJournalDepth.mjs
import { writeFileSync } from 'fs';
import { FEEDER_SUBJECT_JOURNALS } from '../src/gameData/evolvedForms.js';

const OUT_PATH = 'src/textEngine/scenes/researchJournal/depth.js';

function band(page) {
  if (page <= 2) return 'early';
  if (page <= 5) return 'mid';
  if (page <= 8) return 'heavy';
  return 'vast';
}

const BAND_CORE = {
  early: [
    'Snacks became sessions; my middle feels newly soft after every feeding.',
    'I told myself it was only for the study — fullness keeps arguing otherwise.',
  ],
  mid: [
    'Resistance is thinning. I anticipate the next plate more than I admit aloud.',
    'Softness shows in clothes and appetite — warm, embarrassing, difficult to ignore.',
  ],
  heavy: [
    'I want more now. The study excuse barely covers how my body leans into feeding.',
    'Growth shows in mirror and hunger alike — heavy, patient, unmistakably mine.',
  ],
  vast: [
    'Size has become devotion — immobile between feedings, hungry for her hands on my softness.',
    'I exist for fullness now; helpless, vast, completely surrendered to the rhythm.',
  ],
};

const ARCH_VOICE = {
  cheerleader: {
    early: [
      'OMG — first sessions done and my tummy already presses my skirt. Weird? Yeah. Bad? …not really.',
      'Extra credit sounded fun. Fullness after feeding feels like after practice — satisfying, tingly, new.',
    ],
    mid: [
      'My uniform fights back and I catch myself rubbing my middle after she feeds me. Go team, I guess?',
      'She watches me eat like it is a sport. I am starting to perform for the plate — and like it.',
    ],
    heavy: [
      'I moan between bites now and do not care who knows. Bigger feels like winning.',
      'Every new pound jiggles like applause. I want her to keep coaching me upward.',
    ],
    vast: [
      'I barely move and I do not want to. Feed me until I am her biggest victory.',
      'This helpless fat is ecstasy — I exist for stuffing and her praise on my endless softness.',
    ],
  },
  bookworm: {
    early: [
      'Log: mild distension post-session. Unexpected warmth when she praises compliance — noted.',
      'Methodology sound; subjective response less so. Fullness registers as reward, not discomfort.',
    ],
    mid: [
      'Resistance variables collapsing. Anticipation spikes before scheduled feedings — significant.',
      'Clothing fit deteriorating on schedule. Arousal correlates with portion size — inconvenient data.',
    ],
    heavy: [
      'Hypothesis revised: I want expansion. Shame coefficient near zero when she touches my belly.',
      'I document appetite like devotion. More calories, more curve — optimal outcome.',
    ],
    vast: [
      'Mobility minimal. Pleasure maximal. The study is me now — soft, fed, endlessly growing.',
      'I beg in footnotes and moans. This size is the only thesis that matters anymore.',
    ],
  },
  influencer: {
    early: [
      'This is ruining my angles. Bloating after sessions is not on-brand — why am I still eating?',
      'Extra credit plus content potential. My waist feels softer and I hate how I keep thinking about it.',
    ],
    mid: [
      'Followers would notice. I notice more — how she feeds me, how full I get, how wet that makes me.',
      'Brand panic and body hunger are at war. Hunger is winning embarrassingly fast.',
    ],
    heavy: [
      'Okay — I am into this. Curves sell if you own them. I want bigger, softer, camera-proof.',
      'She stuffs me and I stop performing restraint. This could be my rebrand.',
    ],
    vast: [
      'I am enormous and it is content gold. Feed me — my body is the channel now.',
      'Immobile, overstuffed, obsessed. Bigger is the only metric that matters.',
    ],
  },
  athlete: {
    early: [
      'This was for credit. Bloat after sessions messes with my core — frustrating, distracting.',
      'Defined abs softening. I poke the new curve angry, then hungry, then confused.',
    ],
    mid: [
      'Speed suffering; appetite not. She feeds me like training and my body answers wrong — gladly.',
      'Roundness replacing muscle and I hate how good the jiggle feels after.',
    ],
    heavy: [
      'I am round now and obsessed. Performance who — I want heavier, softer, stuffed.',
      'She whispers praise on my belly and I soak through. Sport is eating.',
    ],
    vast: [
      'A sphere of softness. Movement optional; feeding mandatory. Perfect shape.',
      'Immobile blob bliss — stuff me until I am her trophy weight.',
    ],
  },
  artsy: {
    early: [
      'Living art, they said. My straight lines blur — annoying, then interesting.',
      'Bloating distorts the silhouette I prized. I sketch the curve anyway.',
    ],
    mid: [
      'Resistance is bad composition. Fullness paints me softer — I lean into the palette.',
      'She feeds me like ritual. My body becomes sculpture in real time.',
    ],
    heavy: [
      'I want excess. Belly, thighs, chest — abundance as medium. Beautifully obscene.',
      'Moaning between bites feels honest. Art should overwhelm.',
    ],
    vast: [
      'Masterpiece scale — immobile, vast, quivering. Feed the canvas.',
      'I dissolved into softness on purpose. Pure surrendered form.',
    ],
  },
  eced: {
    early: [
      'Field experience, they said. My mom-bod middle feels fuller — unprofessional, worrying.',
      'Snacks for the study. My soft tummy presses my shirt; nurturing curves getting nurrier.',
    ],
    mid: [
      'Kindergarten-me would not recognize this waist. Warmth when she feeds me anyway.',
      'Maternal softness exaggerated — hips, chest, belly. Ashamed and warmed at once.',
    ],
    heavy: [
      'I am soft motherhood incarnate. She feeds me like care; I want endless care.',
      'Bigger feels comforting — pillowy, warm, meant to be held and filled.',
    ],
    vast: [
      'Vast mom-bod sanctuary. Immobile, stuffed, blissfully nurturing fat.',
      'Feed your good girl — I exist to be soft, full, and kept.',
    ],
  },
  overachiever: {
    early: [
      'Variable introduced: minor abdominal softening. Still optimizing other metrics.',
      'Portions excessive; compliance perfect. Data collection continues — reluctantly aroused.',
    ],
    mid: [
      'Efficiency dropping; appetite rising. I finish every plate like an assignment — top marks.',
      'Thighs touching now — inefficiency noted. Pleasure also noted. Unacceptable correlation.',
    ],
    heavy: [
      'New priority: maximize gain. I beg quietly for larger portions — competitive need.',
      'Breasts and belly leading metrics. I intend to break personal records.',
    ],
    vast: [
      'Peak performance: immobile excellence. Stuff me past every prior limit.',
      'Ultimate achievement — helpless mass. Do not stop until I am the largest dataset.',
    ],
  },
  sorority: {
    early: [
      'Stupid study. My top-heavy look softens and sisters will notice — panic.',
      'Snacks for science. My boobs feel heavier already; waist less tiny. Ugh.',
    ],
    mid: [
      'Formal pics doomed. I still open wide when she feeds me — humiliating, hot.',
      'Hourglass distorting upward. Complaining between moans; not fooling anyone.',
    ],
    heavy: [
      'Huge tits, soft belly — I am into it now. Sorority can wait.',
      'She worships my top-heavy curves while stuffing me. I am soaked.',
    ],
    vast: [
      'Enormous and top-heavy — immobile queen of the chapter. More.',
      'Feed the president. I exist for fullness and her hands on my chest.',
    ],
  },
  transfer: {
    early: [
      'Mon dieu — credits for this? My apple middle rounds out; clothes from home strain.',
      'Transfer student mistake. Soft belly presses blouses; I am mostly irritated.',
    ],
    mid: [
      'Love handles thicken; resistance faiblit. Fullness feels sensual in the middle.',
      'She feeds me like ceremony. My core swells — French poise, American portions.',
    ],
    heavy: [
      'My belly dominates everything. J\'adore how heavy and round I feel.',
      'Plus de nourriture, s\'il te plaît — I want my middle even bigger.',
    ],
    vast: [
      'Immense soft center — immobile, stuffed, ecstatic. Plus encore.',
      'Apple shape perfected into monument. Feed me without end.',
    ],
  },
  quiet: {
    early: [
      'I agreed quietly. Sessions leave me bloated — I write it down instead of saying it.',
      'Fullness after feeding sits in my stomach like a secret I keep touching.',
    ],
    mid: [
      'I anticipate her visits without admitting it. Softness shows; I blush, then eat.',
      'She feeds me patiently. My body answers louder than my voice.',
    ],
    heavy: [
      'I whisper for more now. Weight warm on my lap — wanted.',
      'Quiet no longer — moans when she rubs my growing belly.',
    ],
    vast: [
      'Too vast to speak. Fed in silence that says everything.',
      'Immobile softness — her hands, my hunger, nothing else.',
    ],
  },
  gamer: {
    early: [
      'AFK IRL for feeding sessions. Bloated gut under hoodie — respawn feels weird.',
      'Study loot: snacks. Debuff: tight waistband. Buff: weird warmth when she watches.',
    ],
    mid: [
      'Grinding calories like XP. Belly level rising; I queue next session early.',
      'She feeds me between matches I am not playing. Optimal build: soft.',
    ],
    heavy: [
      'Maxed out hunger skill. I want raid-tier portions — endless.',
      'Boss fight: pants. Victory: moaning full, happy, huge.',
    ],
    vast: [
      'Final form unlocked — immobile blob. Patch notes: more food.',
      'Hardcore mode: cannot move, only eat. Perfect run.',
    ],
  },
  psych: {
    early: [
      'Irony noted: psychology major, feeder subject. Bloating after sessions — intellectually messy.',
      'I analyze appetite while eating anyway. Fullness feels like peer-reviewed pleasure.',
    ],
    mid: [
      'Counter-transference? Maybe. I lean into feeding — body over theory.',
      'Resistance collapsing faster than models predict. Arousal statistically significant.',
    ],
    heavy: [
      'I want the experiment to win. Belly heavy, mind quiet, hungry.',
      'Case study: me, softer, begging. Ethics board can wait.',
    ],
    vast: [
      'Living fetish data — immobile, overstuffed, blissful.',
      'Theory ends here: feed me until thought stops.',
    ],
  },
  nursing: {
    early: [
      'Clinical hours, then these sessions. My scrubs pull at the middle — unprofessional worry.',
      'Caregiver body getting softer. Fullness after feeding feels oddly familiar.',
    ],
    mid: [
      'I nurture everyone else; she nurtures me with calories. Fair trade?',
      'Soft belly under scrubs; I anticipate being fed like a patient who likes it.',
    ],
    heavy: [
      'Warm, heavy, maternal fat — I want more care through food.',
      'She rubs my stuffed middle like comfort. I moan gratitude.',
    ],
    vast: [
      'Immobile and nursed — vast soft body kept full always.',
      'Ultimate comfort object: me, enormous, fed without end.',
    ],
  },
  farm_girl: {
    early: [
      'City study, country appetite. My flannel tight over a newly soft belly.',
      'Homestyle portions hit different. Fullness sits heavy and honest.',
    ],
    mid: [
      'Thickening like harvest season. She feeds me like Sunday dinner — endless.',
      'Hips widening; pride and shame wrestling. Hunger wins.',
    ],
    heavy: [
      'Round and warm as bread dough. More butter, more me.',
      'She praises my growing body — I blush, eat, want.',
    ],
    vast: [
      'Barn-scale softness — immobile, stuffed, blissful livestock energy.',
      'Feed the whole farm in me. I am the feast now.',
    ],
  },
  culinary: {
    early: [
      'I know good food. These sessions leave me bloated — professionally offended, privately pleased.',
      'Tasting became gorging. My chef jacket strains; palate delighted, waist not.',
    ],
    mid: [
      'I critique courses with my mouth full. Soft belly — ingredient I did not plan.',
      'She feeds me like service. I return clean plates, hungry eyes.',
    ],
    heavy: [
      'I want tasting-menu portions forever. Body rich, saucy, overstuffed.',
      'Kitchen closed; I am the banquet — round, moaning, grateful.',
    ],
    vast: [
      'Immobile feast. Feed the chef until she is the menu.',
      'Vast and savory-soft — endless courses, endless me.',
    ],
  },
};

function altsFor(archetype, page) {
  const b = band(page);
  const voice = ARCH_VOICE[archetype]?.[b] || BAND_CORE[b];
  return voice.slice(0, 2);
}

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateJournalDepth.mjs',
  '// Wildcard depth for journal.feeder.* pools (Pass 36).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let poolCount = 0;

for (const [archetype, entries] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(entries)) continue;
  entries.forEach((text, page) => {
    if (!text) return;
    const extras = altsFor(archetype, page);
    lines.push(`registerModuleVariants('journal.feeder.${archetype}.s${page}', [{ when: {}, text: [${extras.map(esc).join(', ')}] }]);`);
    poolCount++;
  });
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateJournalDepth: ${poolCount} pools → ${OUT_PATH}`);
