// Lilith hunt feast — composable hunger + dominance slots.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('hunt.feast.hungerCall', [
  {
    when: {},
    weight: 2,
    text: [
      'Hunger arrives enormous and specific — built since the last feast, patient and sure.',
      'The room feels smaller when appetite walks in; you are the appetite.',
      'Every pound you carry is a summons; someone always answers.',
      'Late-semester rituals feel heavier — dominance dressed as hospitality, yield dressed as praise.',
      'Hall log will note the aftermath; the feast writes itself on both bodies first.',
    ],
  },
]);

registerPool('hunt.feast.yieldBeat', [
  {
    when: {},
    weight: 2,
    text: [
      'She comes because the ritual demands it — curiosity dressed as compliance, compliance dressed as pleasure.',
      'Thank-you words land soft; the feeding that follows lands heavier.',
      'The feast writes itself on both bodies; the hall log only sees the aftermath.',
      'Hunger hums under polite gratitude; every swallowed bite is co-conspirator policy.',
      'Someone whispers that the floor will smell like victory before lights-out.',
    ],
  },
]);

const FEAST_SKELETON = '{hunt.feast.hungerCall|prefix:} {hunt.feast.yieldBeat|prefix: }';

for (let stage = 0; stage <= 9; stage += 1) {
  registerModuleVariants(`hunt.feast.s${stage}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [FEAST_SKELETON],
    },
    {
      when: { weekMin: 16 },
      weight: 4,
      priority: 3,
      text: [FEAST_SKELETON],
    },
    {
      when: { weekMin: 8 },
      weight: 2,
      priority: 2,
      text: [FEAST_SKELETON],
    },
  ]);
}

registerModuleVariants('hunt.feast.deliveryIntro', [
  {
    when: { weekMin: 14 },
    weight: 3,
    priority: 2,
    text: [FEAST_SKELETON],
  },
]);
