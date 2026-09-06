// Generate researchJournal/nadiaDepth.js — pad journal.nadia.* wildcard pools to ≥3 texts.
// Run: node scripts/generateNadiaJournalDepth.mjs
import { writeFileSync } from 'fs';
import { NADIA_SUBJECT_JOURNALS } from '../src/gameData/nadiaSubjectJournals.js';

const OUT_PATH = 'src/textEngine/scenes/researchJournal/nadiaDepth.js';

function band(page) {
  if (page <= 2) return 'early';
  if (page <= 5) return 'mid';
  if (page <= 8) return 'heavy';
  return 'vast';
}

const NADIA_INTRO = {
  0: [
    'I chose her for the study — curious how softness will reshape her mind and body. My belly rests heavy on my lap while I plan the first sessions.',
    'Independent study begins tonight. I want every inch documented and her warmth pressed against mine as she grows.',
  ],
  1: [
    'She is still too slim — that irritates me more than it should. This study is cover for making her exactly what I need.',
    'My colossal frame spreads across the bed while I plan her transformation. She will swell until she matches my hunger.',
  ],
  2: [
    'The study is a front now. I am immobile and vast — I will grow through her body instead.',
    'My blob form pins me to this reinforced bed. Every pound she gains is mine to feel against my endless softness.',
  ],
};

const NADIA_ENTRY = {
  0: {
    early: [
      'She ate steadily tonight. Early softness is showing — belly rounding when full, thighs brushing on good days. I held her afterward and felt promise between us.',
      'First real progress: appetite opening, body answering. My gut pressed her slimmer middle; the contrast felt delicious.',
    ],
    mid: [
      'Her waist is softening and fullness lasts longer after sessions. I rubbed her back while our middles molded together — warm, patient, inevitable.',
      'She handles extra helpings now without flinching. I keep imagining how good she will feel when there is much more of her to squeeze.',
    ],
    heavy: [
      'She is properly chubby now — belly plush, thighs brushing, breasts heavier. I buried my face against her softness and did not want to stop.',
      'Feeding left her groaning and round. I loved the weight of her against my own heavy body — surrender in every breath.',
    ],
    vast: [
      'She waddles now, belly swaying, breasts pendulous. Our fat folded together on the bed and I felt heaven in the squish.',
      'She is heavy and jiggly for me. I held her close afterward, licking sweetness from overstuffed calm — obsessed and grateful.',
    ],
  },
  1: {
    early: [
      'Still too athletic for my taste. I fed her aggressively tonight — pasta, shakes, dessert until she groaned. She leaves rounder; I leave hungry for more.',
      'That flat stomach annoyed me. I did not let her slow down once. My belly smothered hers afterward — possessive, impatient, perfect.',
    ],
    mid: [
      'First real yield: waist widening, thighs touching, breasts swelling. I groped new softness while she whimpered against my chest.',
      'She is filling out but not fast enough. I kept her pressed to me for hours, whispering how much better she will feel when she is truly heavy.',
    ],
    heavy: [
      'Her belly sways now and I could not be happier. I ground our middles together and smothered her in my cleavage until she moaned.',
      'Plump, jiggly, mine. I fed until she panted, then held her fat against mine — rolling, folding, addictive.',
    ],
    vast: [
      'She is heavy and rippling, athletic poise gone. I pulled her fully against my colossal body and groped every new inch.',
      'Immobile myself, I live through her expansion. Tonight our bellies spilled over each other — I need her even bigger.',
    ],
  },
  2: {
    early: [
      'She climbed onto my bed and sank into my blob body tonight. Still too small — I fed her from my immobility until her middle swelled painfully.',
      'My vast belly rose beside her slim frame. I smothered her face in my tits and rubbed her bloated gut — she must grow faster for me.',
    ],
    mid: [
      'Her plush belly met my mountain of fat. I held her head down in my cleavage while she whimpered — every pound on her is mine now.',
      'She is softening but I need oceans more. I whispered how incredible she will feel when our fat can properly merge.',
    ],
    heavy: [
      'She squashed onto my enormous gut, warm fat melding. I licked her swelling breasts while grinding what movement I have left against her.',
      'Growing in my place — that is what she is for. I told her how proud I am and how much further we are taking this.',
    ],
    vast: [
      'Hours pressed together: bellies rolling in thick waves. I smothered her in my tits while squeezing her heavy sides — pure bliss.',
      'She jiggles into me perfectly now. My immobility limits me; her expansion does not. I need her enormous against my endless mass.',
    ],
  },
};

const NADIA_ARCH_FLAVOR = {
  cheerleader: {
    early: 'That hourglass is finally starting to yield.',
    mid: 'Uniforms fight a losing war with her middle.',
    heavy: 'Pom-pom bounce replaced by belly sway — better.',
    vast: 'Cheerleader poise drowned in soft fat — exquisite.',
  },
  bookworm: {
    early: 'Notes forgotten between bites; data getting personal.',
    mid: 'Footnotes and waistlines both expanding on schedule.',
    heavy: 'Hypothesis revised: she wants to be stuffed.',
    vast: 'Living bibliography of appetite — immobile appendix.',
  },
  influencer: {
    early: 'Angles ruined; appetite winning the brand war.',
    mid: 'Followers would notice — she keeps eating anyway.',
    heavy: 'Curves sell when you own them; she is learning.',
    vast: 'Content is her body now — vast and shameless.',
  },
  athlete: {
    early: 'Muscle softening; split times irrelevant.',
    mid: 'Track body surrendering to plush middle.',
    heavy: 'Round replaces defined — she moans, not sprints.',
    vast: 'Sport is eating now; she is undefeated.',
  },
  artsy: {
    early: 'Straight lines blurring into softer composition.',
    mid: 'She sketches curves she used to resist.',
    heavy: 'Abundance as medium — belly, thighs, chest.',
    vast: 'Living sculpture — immobile, overstuffed, honest.',
  },
  sorority: {
    early: 'Chapter gossip will notice her top-heavy softening.',
    mid: 'Formal pics doomed; appetite undeterred.',
    heavy: 'President-sized curves — she owns the room.',
    vast: 'Enormous and top-heavy — throne of softness.',
  },
  overachiever: {
    early: 'GPA logic bent around extra portions.',
    mid: 'She optimizes gain like another metric.',
    heavy: 'Valedictorian of appetite — round and proud.',
    vast: 'Peak performance: helpless, fed, vast.',
  },
  gamer: {
    early: 'AFK for feeding; debuff: tight waistband.',
    mid: 'XP in calories; belly level rising.',
    heavy: 'Raid-tier portions; boss fight: pants.',
    vast: 'Final form unlocked — immobile blob bliss.',
  },
  farm_girl: {
    early: 'Country appetite meets city portions.',
    mid: 'Thickening like harvest season.',
    heavy: 'Round and warm as bread dough.',
    vast: 'Barn-scale softness — stuffed and blissful.',
  },
  eced: {
    early: 'Gentle feeding; patience rewarded with softness.',
    mid: 'Nurture through calories — she blooms wider.',
    heavy: 'Warm maternal fat — she wants more care.',
    vast: 'Immobile and nursed — vast comfort object.',
  },
  quiet: {
    early: 'She speaks little; appetite speaks loudly.',
    mid: 'Stillness hides hunger sharpening.',
    heavy: 'Quiet moans when her belly is rubbed.',
    vast: 'Silent devotion — enormous and fed.',
  },
  transfer: {
    early: 'New campus, new appetite — waist rounding.',
    mid: 'Home clothes strain; she stays anyway.',
    heavy: 'Belly dominates; poise surrendered.',
    vast: 'Campus kept her — literally and figuratively.',
  },
  nursing: {
    early: 'Caregiver body softening under study portions.',
    mid: 'She nurtures others; I nurture her with food.',
    heavy: 'Warm heavy curves — clinical poise melting.',
    vast: 'Nursed into immobility — vast and content.',
  },
  culinary: {
    early: 'Chef jacket strains; palate delighted.',
    mid: 'Tasting became gorging — professional sin.',
    heavy: 'She is the banquet now — round, moaning.',
    vast: 'Immobile feast — endless courses, endless her.',
  },
};

function altsFor(archetype, level, page) {
  if (page === 'intro') return NADIA_INTRO[level];
  const b = band(page);
  const base = NADIA_ENTRY[level][b];
  const flavor = NADIA_ARCH_FLAVOR[archetype]?.[b];
  if (!flavor) return base;
  return [`${base[0]} ${flavor}`, `${base[1]} ${flavor}`];
}

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateNadiaJournalDepth.mjs',
  '// Wildcard depth for journal.nadia.* pools (Pass 39).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

let poolCount = 0;

for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  if (!journal) continue;
  const intros = Array.isArray(journal.intro) ? journal.intro : [journal.intro];
  intros.forEach((text, level) => {
    if (!text) return;
    const extras = altsFor(archetype, level, 'intro');
    lines.push(`registerModuleVariants('journal.nadia.${archetype}.intro.l${level}', [{ when: {}, text: [${extras.map(esc).join(', ')}] }]);`);
    poolCount++;
  });
  (journal.entries || []).forEach((row, page) => {
    if (!row) return;
    [0, 1, 2].forEach((level) => {
      const text = row[level];
      if (!text) return;
      const extras = altsFor(archetype, level, page);
      lines.push(`registerModuleVariants('journal.nadia.${archetype}.s${page}.l${level}', [{ when: {}, text: [${extras.map(esc).join(', ')}] }]);`);
      poolCount++;
    });
  });
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateNadiaJournalDepth: ${poolCount} pools → ${OUT_PATH}`);
