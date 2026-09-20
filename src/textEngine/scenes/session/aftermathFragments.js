// Private session aftermath — composable glow + consent slots.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('session.aftermath.glow', [
  {
    when: {},
    weight: 2,
    text: [
      'Fullness settles like a blanket — warm, proud, impossible to rush.',
      'She breathes around a stuffed middle; the room smells like seconds already planned.',
      'Pleasure sits heavy in her lap; neither of you pretends this was accidental.',
      'Late-semester aftermath feels tender — timer stopped, appetite still humming anyway.',
      'Hall Ambiance outside; inside, glow and consent braided like policy you wrote together.',
    ],
  },
]);

registerPool('session.aftermath.consent', [
  {
    when: {},
    weight: 2,
    text: [
      '"I\'m glad I came," she says — appetite dressed as honesty.',
      'Wellness framing holds in your notes; her body holds the real verdict.',
      'She keeps her hands on her belly like a promise she intends to keep breaking.',
      'Every choice tonight will show on the scale and in how she looks at you afterward.',
      'Rae would call it compliance; you call it co-conspirator pride — both true.',
    ],
  },
]);

const AFTERMATH_SKELETON = '{session.aftermath.glow|prefix:} {session.aftermath.consent|prefix: }';

for (const band of ['light', 'full', 'stuffed', 'packed']) {
  registerModuleVariants(`session.aftermath.${band}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [AFTERMATH_SKELETON],
    },
    {
      when: { weekMin: 12 },
      weight: 4,
      priority: 3,
      text: [AFTERMATH_SKELETON],
    },
    {
      when: { weekMin: 8 },
      weight: 2,
      priority: 2,
      text: [AFTERMATH_SKELETON],
    },
  ]);
}

registerModuleVariants('session.aftermath', [
  {
    when: { weekMin: 22 },
    weight: 6,
    priority: 6,
    text: [AFTERMATH_SKELETON],
  },
  {
    when: { weekMin: 14 },
    weight: 2,
    priority: 2,
    text: [AFTERMATH_SKELETON],
  },
]);
