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
    ],
  },
]);

const BLUEPRINT_SKELETON = '{hall.blueprint.construction|prefix:} {hall.blueprint.permission|prefix: }';

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
