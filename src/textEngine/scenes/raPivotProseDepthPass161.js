// Late-game WL lesson slot reinforcement (Pass 161).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.lesson.circleEat', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester circle eats feel like policy the whole hall already voted for — seconds without debate.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s1.honey_butter', [
  {
    when: { weekMin: 20 },
    weight: 4,
    priority: 6,
    text: [
      '{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: } {wl.lesson.raWitness|prefix: }',
    ],
  },
]);
