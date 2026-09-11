// Exploration find tiers + ambiance-gated blueprint (Pass 98).
import { registerModuleVariants } from '../engine.js';

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
