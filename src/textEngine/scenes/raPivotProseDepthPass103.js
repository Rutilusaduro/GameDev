// Fair boost + WL talk + weekly (Pass 103).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('fair.boost.Serena', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'High-tier Serena training — dohyo drills and chanko until pride steams off MJ’s shoulders.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Darlene.s2.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Darlene’s greeting smells like butter — the lesson already started before words.',
    ],
  },
]);

registerModuleVariants('weekly.intervention_fails', [
  {
    when: {},
    weight: 1,
    text: [
      'The intervention plateaus on pie — concern dissolves into seconds.',
    ],
  },
]);

registerModuleVariants('weekly.quiet_opens_up', [
  {
    when: {},
    weight: 1,
    text: [
      'She talks through a full mouth — quiet no longer means empty.',
    ],
  },
]);

registerModuleVariants('evolved.event.sumo.s0.p0.load_hard.legacyBody', [
  {
    when: {},
    weight: 1,
    text: [
      'Chanko steam — belly ballast before the first shove.',
    ],
  },
]);
