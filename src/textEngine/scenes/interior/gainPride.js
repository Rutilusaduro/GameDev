import { registerPool } from '../../engine.js';

registerPool('interior.gainPride', [
  { when: {}, text: ['', ''] },
  { when: { corruption: [1, 2], stageMin: 4 }, text: [
    'The gain is visible. She is not hiding it anymore.',
    'More of her every week — she has stopped treating that as emergency.',
  ] },
  { when: { corruption: [2], stageMin: 6 }, weight: 2, text: [
    'She is proud in the specific way of someone who chose this.',
    'The number climbs. She smiles. That is the whole report.',
  ] },
  { when: { corruption: [2], stageMin: 10 }, text: [
    'Vastness is not accident. She intended every inch.',
    'She has become what she wanted to become. The wanting continues.',
  ] },
]);
