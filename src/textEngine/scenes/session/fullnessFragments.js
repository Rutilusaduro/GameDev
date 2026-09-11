// Private session fullness — composable pressure + permission slots.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('session.fullness.pressure', [
  {
    when: {},
    weight: 2,
    text: [
      'Fullness climbs past comfortable — warm, insistent, impossible to ignore.',
      'Her middle resists the next bite and asks for it anyway.',
      'The session meter redlines; breath comes careful around a stuffed core.',
    ],
  },
]);

registerPool('session.fullness.permission', [
  {
    when: {},
    weight: 2,
    text: [
      'You keep the tone gentle — stop when she says, but the room already chose continue.',
      'Wellness framing holds; appetite wins the argument in whispers.',
      'She groans; you nod like this is exactly the data you wanted.',
    ],
  },
]);

const FULLNESS_SKELETON = '{session.fullness.pressure|prefix:} {session.fullness.permission|prefix: }';

for (const archetype of ['default', 'cheerleader', 'swimmer', 'gamer', 'bookworm']) {
  for (let f = 0; f <= 5; f += 1) {
    registerModuleVariants(`session.fullness.${archetype}.f${f}`, [
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [FULLNESS_SKELETON],
      },
    ]);
  }
}
