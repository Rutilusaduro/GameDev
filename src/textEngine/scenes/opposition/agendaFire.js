import { registerPool } from '../../engine.js';

registerPool('opposition.agenda.fire', [
  { when: { card: 'wellness_audit' }, text: 'Compliance flags a student for individualized assessment — shame arrives dressed as care.' },
  { when: { card: 'size_review' }, text: 'The Board demands documented weigh-ins. Every scale becomes evidence.' },
  { when: { card: 'shame_vigil' }, text: 'Ascetic candles flicker outside the garden. Corruption wilts in the cold.' },
  { when: {}, text: 'An agenda card resolves — institutional friction made flesh.' },
]);
