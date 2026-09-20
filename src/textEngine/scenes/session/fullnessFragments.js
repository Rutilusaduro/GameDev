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
      'Late-semester sessions treat fullness like data worth celebrating — warm, proud, winning.',
      'Hall Ambiance outside; inside, pressure and permission braid like policy you wrote together.',
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
      'Every choice tonight will show on the scale and in how she looks at you afterward.',
      'Clipboard stays out of sight; seconds stay unmistakably on the table anyway.',
    ],
  },
]);

const FULLNESS_SKELETON = '{session.fullness.pressure|prefix:} {session.fullness.permission|prefix: }';

registerModuleVariants('session.fullness', [
  {
    when: { hallAmbiancePeakMin: [25] },
    weight: 1,
    text: [
      'The room holds warmth from the blueprint wing — fullness feels invited, not accidental.',
    ],
  },
]);

for (const archetype of ['default', 'cheerleader', 'swimmer', 'gamer', 'bookworm']) {
  for (let f = 0; f <= 5; f += 1) {
    registerModuleVariants(`session.fullness.${archetype}.f${f}`, [
      {
        when: { weekMin: 22 },
        weight: 6,
        priority: 6,
        text: [FULLNESS_SKELETON],
      },
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [FULLNESS_SKELETON],
      },
    ]);
  }
}
