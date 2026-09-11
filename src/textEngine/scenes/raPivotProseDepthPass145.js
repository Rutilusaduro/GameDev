// Modular endings + talk branches (Pass 145).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.ending.streamCoda', [
  {
    when: { weekMin: [18] },
    weight: 1,
    text: [
      'The hall ambiance meter ticks up — stream night counts as floor culture now.',
    ],
  },
]);

registerModuleVariants('wl.talk.branchAnswer', [
  {
    when: { weekMin: [12] },
    weight: 1,
    text: [
      '"Mary Jane says appetite is hospitality. We\'re learning that lesson in our bodies."',
    ],
  },
]);
