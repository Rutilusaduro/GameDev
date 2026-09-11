// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('milestone.line', [
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    `{subject.first} touches the new softness like it might vanish — then exhales and keeps her hand there.`,
    'She whispers that it feels real now. Not a mistake. A direction.',
  ]},
  { when: { stageMax: 3, corruption: [2] }, weight: 3, text: [
    'She smiles at the threshold and does not look back. More was always the plan.',
  ]},
  { when: { stageMin: 4, stageMax: 6, corruption: [1] }, weight: 3, text: [
    'She names the change out loud for once — fuller, warmer, pleased — and means every syllable.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'The new size of her is not a surprise anymore. It is inventory. It is home.',
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya presses both palms to the swell and nods once, slow. "Yeah," she says. "This."',
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    'Kylie spins for the mirror, delighted. "Content gold," she murmurs. "Look at me go."',
  ]},
]);

registerModuleVariants('milestone.crest', [
  { when: { corruptionMin: 2, stageMin: 5 }, weight: 3, text: [
    'Heat rolls through her and stays — appetite and mass sharing the same long breath.',
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    'The crest does not end. It keeps settling, soft mass finding new geography minute by minute.',
  ]},
]);
