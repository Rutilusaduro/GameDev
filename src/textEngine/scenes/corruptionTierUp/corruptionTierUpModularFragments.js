// Corruption tier-up — resident-specific beats (peeled from pass 66).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('corruption.tierUp.t1', [
  {
    when: { studentId: 8 },
    weight: 3,
    text: [
      () => 'Maya stops apologizing mid-sentence. The guilt leaves before she finishes the thought.',
    ],
  },
  {
    when: { studentId: 2 },
    weight: 3,
    text: [
      () => 'Kylie posts nothing about the shift — she just eats on camera like it\'s always been true.',
    ],
  },
]);

registerModuleVariants('corruption.tierUp.t2', [
  {
    when: { studentId: 6 },
    weight: 3,
    text: [
      () => 'Tiffany treats appetite like chapter business now. Proud. Public. Yours.',
    ],
  },
]);

registerModuleVariants('corruption.auto.stuff', [
  {
    when: { studentId: 5 },
    weight: 3,
    text: [
      () => 'Destiny\'s delivery stack is a flex. Chat already clipped it.',
    ],
  },
]);
