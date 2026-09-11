// Final origin sweep + hall ambiance beats (Pass 120).
import { registerModuleVariants } from '../engine.js';

const W = 3;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('eat.firstBite', [
  {
    when: { studentId: 0, origin: 'britt_gymnast', ...EARLY },
    weight: W,
    text: [
      'Coach voice in her head — appetite answers anyway on the first forkful.',
      'Discipline cracks at the teeth; rebellion tastes like seconds.',
    ],
  },
  {
    when: { studentId: 1, origin: 'madd_subject_zero', ...EARLY },
    weight: W,
    text: [
      'Subject zero logs intake — methodology begins with swallowing pride.',
      'The first bite is control group she already plans to beat.',
    ],
  },
  {
    when: { studentId: 15, origin: 'lilith_always_watching', ...EARLY },
    weight: W,
    text: [
      'She eats like someone who has been counting your plates all week.',
      'First bite is invitation; the room feels smaller afterward.',
    ],
  },
  {
    when: { studentId: 18, custom: true, ...EARLY },
    weight: W,
    text: [
      'Field test: opening intake exceeds predicted variance — she keeps logging.',
      'Prototype appetite online; fork throughput nominal.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.appetite', [
  {
    when: { hallAmbiancePeakMin: [50] },
    weight: 1,
    text: [
      'The wing hums at peak ambiance — residents move slower, fuller, happier.',
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
