import { registerPool } from '../../engine.js';

registerPool('supernatural.ascension.offer', [
  { when: {}, text: 'Lights dim. Stomachs flutter empty — hunger without mass. Something offers a second skin.' },
  { when: { supernaturalForm: 'curator_wraith' }, text: 'Fiona steps into the frame and the photograph forgets how thin she is supposed to be.' },
]);

registerPool('supernatural.ascension.accept', [
  { when: {}, text: 'She accepts the hollow gift — thin, luminous, remembering every pound.' },
]);
