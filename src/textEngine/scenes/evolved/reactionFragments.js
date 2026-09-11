// Evolved stage reactions — composable witness + appetite slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_REACTIONS } from '../../../gameData/evolvedReactionsOutfits.js';

registerPool('evolved.reaction.witness', [
  {
    when: {},
    weight: 2,
    text: [
      'Residents notice before she speaks — weight, confidence, appetite on display.',
      'The hall reads her body like a bulletin board: fuller, slower, happier.',
      'Someone whispers; someone else reaches for a plate — contagion dressed as curiosity.',
    ],
  },
]);

registerPool('evolved.reaction.appetite', [
  {
    when: {},
    weight: 2,
    text: [
      'She eats without apology; the evolved form suits hunger like a second skin.',
      'Every bite lands soft and certain — growth as lifestyle, not accident.',
      'Fullness shows in her posture; pride shows in how she keeps going.',
    ],
  },
]);

const REACTION_SKELETON = '{evolved.reaction.witness|prefix:} {evolved.reaction.appetite|prefix: }';

for (const [formId, lines] of Object.entries(EVOLVED_REACTIONS)) {
  if (!Array.isArray(lines)) continue;
  lines.forEach((_, idx) => {
    registerModuleVariants(`evolved.reaction.${formId}.s${idx}`, [
      {
        when: { weekMin: 16 },
        weight: 4,
        priority: 3,
        text: [REACTION_SKELETON],
      },
      {
        when: { weekMin: 8 },
        weight: 3,
        priority: 2,
        text: [REACTION_SKELETON],
      },
    ]);
  });
}
