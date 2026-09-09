// AIB size-review mandatory weigh-in — overrides intro when aibMandatory is set.
import { registerPool } from '../../engine.js';

registerPool('wi.aibMandatory', [
  {
    when: {},
    text: [
      'Chairwoman Vance\'s clerk left a stamped notice on your desk: mandatory documented weigh-in for {subject.name}. The Residence Review Board will receive the reading.',
      'An AIB observer waits in the corridor with a clipboard. {subject.name} has been summoned for a compliance weigh-in — every pound becomes testimony.',
      'The wellness office forwarded {subject.name}\'s name to the Board. You are required to produce a scale reading before the week closes.',
    ],
  },
]);
