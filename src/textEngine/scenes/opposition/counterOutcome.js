import { registerPool } from '../../engine.js';

registerPool('opposition.counter.success', [
  { when: { counter: 'feast_bribe' }, text: 'Lavish catering buys a week of institutional blindness.' },
  { when: { counter: 'public_discredit' }, text: 'Cassidy\'s projector makes abundance look like team culture, not scandal.' },
  { when: { counter: 'network_misdirect' }, text: 'Talia\'s mesh buries the audit trail under thermal noise.' },
  { when: {}, text: 'Your counter lands — the board stumbles, briefly off-balance.' },
]);
