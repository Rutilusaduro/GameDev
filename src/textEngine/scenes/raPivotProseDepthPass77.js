// Hall blueprint ambiance + wing blurbs depth (Pass 77).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hall.ambiance.summary', [
  {
    when: { ambianceTier: ['mid'] },
    weight: 1,
    text: [
      'Residents stop apologizing for second plates — the blueprint made that the default.',
      'The hall learns names and portions in the same breath.',
    ],
  },
  {
    when: { ambianceTier: ['high'] },
    weight: 1,
    text: [
      'Elevators smell like someone is always baking. Nobody complains.',
      'Your wing shows up on unofficial campus maps as "the good floor."',
    ],
  },
]);

registerModuleVariants('hall.blueprint.purchase', [
  {
    when: {},
    weight: 1,
    text: [
      'Contractors leave sawdust and a new appetite in the air — both settle by morning.',
      'You initial the invoice; the wing initials your residents with extra inches.',
    ],
  },
]);
