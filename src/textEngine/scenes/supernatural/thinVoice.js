import { registerPool } from '../../engine.js';

registerPool('supernatural.thin.voice', [
  { when: { supernaturalForm: 'salon_wraith' }, text: 'The room is elegant and empty. My appetite is neither.' },
  { when: { supernatural: true }, text: 'I can feel every room I used to fill. The hunger stayed when the weight left.' },
  { when: {}, text: 'Thin skin, loud hunger — the body remembers what it was.' },
]);
