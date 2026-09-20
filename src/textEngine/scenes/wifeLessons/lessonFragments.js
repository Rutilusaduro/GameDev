// Wife Lessons — composable lesson beat slots (MIGRATION.md Step 2 pilot).
import { registerPool, registerModuleVariants } from '../../engine.js';
import { WL_LESSONS } from '../../../gameData/wifeLessonsData.js';

registerPool('wl.lesson.aroma', [
  {
    when: {},
    weight: 2,
    text: [
      'The kitchen fills with yeasty warmth — butter, sugar, permission.',
      'Flour dust and yeasty warmth hang in the lamplight; the air tastes like belonging.',
      'Steam and sweetness braid together until the whole room feels upholstered.',
      'A slow oven heat makes every surface feel like an invitation to stay.',
    ],
  },
]);

registerPool('wl.lesson.mjDoctrine', [
  {
    when: {},
    weight: 2,
    text: [
      '"Fat is what makes a home feel like home," Mary Jane says, gingham apron dusted white.',
      '"No need for fuss — let the richness do the work," she murmurs, spooning with steady hands.',
      '"It\'s meant to be shared, piece by piece, until you\'re full and connected," she smiles.',
      '"Fat is what makes a home feel like home — this care shows up as seconds," she adds, gentle and certain.',
    ],
  },
]);

registerPool('wl.lesson.circleEat', [
  {
    when: {},
    weight: 2,
    text: [
      'Darlene and Wanda tear warm bites straight from the pan; glaze shines on their fingers.',
      'The moms nibble, then reach again — approval murmured between soft chews.',
      'Hands dive into sticky bread; laughter stays low, satisfied, unhurried.',
      'Plates empty in quiet waves while you watch from the doorway, witness to the ritual.',
    ],
  },
  {
    when: { stageMin: [3] },
    weight: 2,
    text: [
      'Daughters lean in now too, bellies rounding as portions grow bolder each week.',
      'The circle widens — mothers and daughters eating with the ease of a shared secret.',
    ],
  },
]);

registerPool('wl.lesson.raWitness', [
  {
    when: {},
    text: [
      'You stay at the edge of the warmth, logging the scene without interrupting it.',
      'The RA notebook stays closed; some lessons are meant to be felt before they are filed.',
      'Floor check-in can wait — this kitchen has its own attendance.',
    ],
  },
]);

registerPool('wl.lesson.lateFeast', [
  {
    when: {},
    weight: 2,
    text: [
      'The table groans under every favorite dish — a living archive of every lesson so far.',
      'Daughters serve mothers now; the circle inverts without losing its warmth.',
      'Oven heat and satisfied groans braid together until midnight feels like afternoon.',
    ],
  },
]);

const MODULAR_LESSON_KEYS = [];
for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (lesson?.id) MODULAR_LESSON_KEYS.push(`wifeLessons.lesson.s${stage}.${lesson.id}`);
  }
}

const SKELETON = '{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: } {wl.lesson.raWitness|prefix: }';

const LATE_SKELETON = '{wl.lesson.lateFeast|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: } {wl.lesson.raWitness|prefix: }';

for (const key of MODULAR_LESSON_KEYS) {
  const stageNum = Number(key.match(/\.s(\d+)\./)?.[1] || 0);
  registerModuleVariants(key, [
    {
      when: { weekMin: [6] },
      weight: 3,
      priority: 3,
      text: [stageNum >= 6 ? LATE_SKELETON : SKELETON],
    },
    {
      when: { weekMin: [3] },
      weight: 3,
      priority: 2,
      text: [SKELETON],
    },
    {
      when: {},
      weight: 2,
      priority: 1,
      text: [
        '{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: }',
      ],
    },
  ]);
}

registerModuleVariants('wl.lesson.mjDoctrine', [
  {
    when: { weekMin: [12] },
    weight: 2,
    text: [
      '"The hall taught me appetite is hospitality," Mary Jane says, ladling without measuring.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s8.legacy_recipe', [
  {
    when: { weekMin: [16] },
    weight: 2,
    text: [
      '{wl.lesson.lateFeast|prefix:} Mary Jane unwraps the sealed recipe card like scripture — daughters leaning in, bellies soft against the table edge.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s6.daughters_bake', [
  {
    when: { weekMin: [20] },
    weight: 1,
    text: [
      'Daughters run the counter now — MJ watches from the stool, flour on her apron like a badge the hall already recognizes.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s2.butter_cake', [
  {
    when: { weekMin: [4] },
    weight: 1,
    text: [
      'Mary Jane ladles the lesson slow — daughters learn appetite is hospitality, not scandal, at this table.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s4.lasagna', [
  {
    when: { hallAmbiancePeakMin: [20] },
    weight: 1,
    text: [
      'Lasagna steam meets hall warmth — Wednesday feels like policy now.',
    ],
  },
]);

registerModuleVariants('wifeLessons.v2.depth', [
  {
    when: { weekMin: 20 },
    weight: 6,
    priority: 6,
    text: [LATE_SKELETON],
  },
  {
    when: { weekMin: 12 },
    weight: 4,
    priority: 4,
    text: [SKELETON],
  },
]);
