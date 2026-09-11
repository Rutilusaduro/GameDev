// Hall blueprint UI — composable upgrade + room blurb slots.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('hall.blueprint.construction', [
  {
    when: {},
    weight: 2,
    text: [
      'Dust and drywall; the wing grows on purpose, not by accident.',
      'Reinforced joists arrive with a wink — the building expects heavier traffic.',
      'Blueprint ink dries while residents already test the new square footage.',
      'Late-semester upgrades hum through the wing — drywall dust, fuller chairs, louder kitchens.',
      'Hall door propped for deliveries; wellness framing ready before anyone asks.',
    ],
  },
]);

registerPool('hall.blueprint.permission', [
  {
    when: {},
    weight: 2,
    text: [
      'Every upgrade whispers the same policy: stay, eat, spread out.',
      'The floor learns appetite as architecture — linger longer, carry more.',
      'Hall Ambiance climbs with the walls; habit follows the hammer.',
      'Fullness climbs in the floor plan — linger longer, eat more, spread out on purpose.',
      'Reinforced joists wink at heavier traffic; the building expects what residents become.',
    ],
  },
]);

const BLUEPRINT_SKELETON = '{hall.blueprint.construction|prefix:} {hall.blueprint.permission|prefix: }';

registerModuleVariants('hall.blueprint.synergy', [
  {
    when: { hallAmbiancePeakMin: [50], weekMin: 12 },
    weight: 4,
    priority: 4,
    text: [
      'Wing resonance hums — lounge warmth and kitchen steam trade favors.',
      BLUEPRINT_SKELETON,
    ],
  },
]);

for (const key of [
  'hall.blueprint.purchase',
  'hall.blueprint.upgrade.confirm',
  'hall.blueprint.synergy',
  'hall.room.blurb',
]) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 12 },
      weight: 4,
      priority: 3,
      text: [BLUEPRINT_SKELETON],
    },
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [BLUEPRINT_SKELETON],
    },
  ]);
}

registerModuleVariants('hall.blueprint.purchase', [
  {
    when: { hallAmbiancePeakMin: [35], weekMin: 10 },
    weight: 5,
    priority: 5,
    text: [
      'Room upgrade seals — the wing exhales warmth through every labeled doorway.',
      BLUEPRINT_SKELETON,
    ],
  },
]);
