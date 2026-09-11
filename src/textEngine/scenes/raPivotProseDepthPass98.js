// Exploration find tiers + evolved legacyBody tails (Pass 98).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('campus.find', [
  {
    when: { explorationFindTier: ['rare'] },
    weight: 1,
    text: [
      'Rare find — archive dust and tunnel glow cling to whatever you pocket.',
      'The campus yields something older than the meal plan; you take it before curiosity names it.',
    ],
  },
  {
    when: { explorationFindTier: ['corrupted'] },
    weight: 1,
    text: [
      'Corrupted sweetness coats your fingers — devotion and chemistry, bottled while still warm.',
      'A tithe jar or saturated runoff: the air tastes like a gathering that never quite ended.',
    ],
  },
  {
    when: { explorationFindTier: ['uncommon'] },
    weight: 1,
    text: [
      'Uncommon salvage — greenhouse resin, theater pigment, something worth hiding in your tote.',
    ],
  },
]);

registerModuleVariants('evolved.event.feedee_creator.s2.p0.legacyBody', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'The ring light hums — appetite becomes content before the first bite lands on camera.',
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s3.p1.legacyBody', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'County fair heat presses in — ribbon politics and pie steam share the same breath.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s2.p0.legacyBody', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Homeroom queens measure loyalty in shared plates — the table is already set.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s3.potluck', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Potluck steam fogs the kitchen — every mother competes with butter and pride.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.upgrade.confirm', [
  {
    when: { hallAmbiancePeakMin: [60] },
    weight: 1,
    text: [
      'The floor feels the upgrade before the paint dries — appetite travels room to room.',
    ],
  },
]);
