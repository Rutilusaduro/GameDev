// Feeder / Nadia subject journals — composable field-note slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { FEEDER_SUBJECT_JOURNALS } from '../../../gameData/feederSubjectJournals.js';
import { NADIA_SUBJECT_JOURNALS } from '../../../gameData/nadiaSubjectJournals.js';

registerPool('journal.scene.fieldNotes', [
  {
    when: {},
    weight: 2,
    text: [
      'Clipboard margins fill with appetite curves — neat handwriting, hungry data.',
      'You date the entry before the ink dries; the hall keeps feeding whether IRB notices or not.',
      'Observation beats intervention tonight — you log what the body admits before the mind does.',
    ],
  },
]);

registerPool('journal.scene.subjectFocus', [
  {
    when: {},
    weight: 2,
    text: [
      'She softens on camera and off it; the journal catches both versions without judgment.',
      'Weight gain reads as compliance when you frame it as wellness — she cooperates beautifully.',
      'Every pound is a datapoint; every sigh is consent dressed as fatigue.',
    ],
  },
]);

const FEEDER_SKELETON = '{journal.scene.fieldNotes|prefix:} {journal.scene.subjectFocus|prefix: }';

for (const archetype of Object.keys(FEEDER_SUBJECT_JOURNALS)) {
  registerModuleVariants(`journal.feeder.${archetype}.s0`, [
    {
      when: { weekMin: 5 },
      weight: 3,
      priority: 2,
      text: [FEEDER_SKELETON],
    },
  ]);
}

for (const archetype of Object.keys(NADIA_SUBJECT_JOURNALS)) {
  registerModuleVariants(`journal.nadia.${archetype}.intro.l0`, [
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [FEEDER_SKELETON],
    },
  ]);
}
