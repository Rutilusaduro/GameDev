// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('opposition.counter.success', [
  { when: {}, text: [
    'Your counter lands — scrutiny blinks, the agenda loses a week of certainty.',
    'The board hesitates; your hall looks like care dressed as programming, and care is hard to punish.',
    'Paperwork stalls; whispers turn sideways; residents keep eating while administrators pretend not to notice.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'Visible softness on your floor makes their concern look prudish — abundance as community, not conspiracy.',
  ]},
]);
