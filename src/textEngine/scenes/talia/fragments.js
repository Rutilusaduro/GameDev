// Talia weigh-in / talk fragments — shared skeleton slots
import { registerPool } from '../../engine.js';

registerPool('wi.taliaAside', [
  { when: {}, text: [''] },
  { when: { equippedWaist: 'auto_bloating_belt' }, weight: 3, text: [
    'The belt readout still glows at her hip — duty cycle logged, variance acceptable.',
  ]},
  { when: { dependenceTierMin: 1 }, weight: 2, text: [
    'She mentions machine-assisted intake like it is already the default baseline.',
  ]},
]);

registerPool('enc.taliaClinical', [
  { when: {}, text: [
    '"Optimization is a kindness," she says, already measuring. "Resistance is just inefficient data."',
  ]},
  { when: { bodyState: 'bloated' }, weight: 3, text: [
    '"Inflation response is within spec," she murmurs, eyes on your midsection instead of your face.',
  ]},
]);
