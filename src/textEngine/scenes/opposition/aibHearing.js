import { registerPool } from '../../engine.js';

registerPool('opposition.hearing.open', [
  { when: {}, text: 'The conference room smells like toner and denial. Chairwoman Vance has a folder thick enough to bruise.' },
  { when: { hearing: 'emergency' }, text: 'Emergency session — scandal meter critical. Every board member watches without sitting.' },
]);

registerPool('opposition.hearing.verdict', [
  { when: { outcome: 'win' }, text: 'Vance closes the folder without a signature. For now, the class remains yours.' },
  { when: { outcome: 'loss' }, text: 'The suspension order prints before you leave the room.' },
  { when: {}, text: 'The board adjourns without clarity — a temporary reprieve.' },
]);
