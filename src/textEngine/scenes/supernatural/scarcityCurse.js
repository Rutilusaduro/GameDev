import { registerPool } from '../../engine.js';

registerPool('supernatural.curse.hunger', [
  { when: {}, text: 'The dining hall lights buzz flat. Every plate looks smaller than it is.' },
  { when: { scarcityPressureBand: 'high' }, text: 'Something counts bites without eating. Permission itself is under audit.' },
]);

registerPool('supernatural.curse.clear', [
  { when: {}, text: 'Refeast steam rises — curses dissolve into appetite again.' },
]);
