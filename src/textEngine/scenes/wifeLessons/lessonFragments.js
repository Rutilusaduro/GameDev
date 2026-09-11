// Wife Lessons — composable lesson beat slots (MIGRATION.md Step 2 pilot).
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('wl.lesson.aroma', [
  {
    when: {},
    weight: 2,
    text: [
      'The kitchen fills with yeasty warmth — butter, sugar, permission.',
      'Flour dust hangs in the lamplight; the air tastes like belonging.',
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
      '"This is the kind of care that shows up as seconds," she adds, gentle and certain.',
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

const MODULAR_LESSON_KEYS = [
  'wifeLessons.lesson.s1.honey_butter',
  'wifeLessons.lesson.s1.cream_biscuits',
  'wifeLessons.lesson.s1.cinnamon_pull',
  'wifeLessons.lesson.s2.butter_cake',
  'wifeLessons.lesson.s2.cream_rolls',
  'wifeLessons.lesson.s2.pot_pie',
];

const SKELETON = '{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: } {wl.lesson.raWitness|prefix: }';

for (const key of MODULAR_LESSON_KEYS) {
  registerModuleVariants(key, [
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
