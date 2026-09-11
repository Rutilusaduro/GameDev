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

registerPool('journal.scene.lateObsession', [
  {
    when: {},
    weight: 2,
    text: [
      'Late-semester entries blur — appetite, attachment, and the scale read as one story.',
      'She begs for more between bites; you log it as progress and mean it.',
      'The journal stops pretending neutrality; every page wants her heavier.',
    ],
  },
]);

const FEEDER_SKELETON = '{journal.scene.fieldNotes|prefix:} {journal.scene.subjectFocus|prefix: }';
const LATE_FEEDER_SKELETON = '{journal.scene.lateObsession|prefix:} {journal.scene.subjectFocus|prefix: }';

for (const [archetype, entries] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(entries)) continue;
  entries.forEach((_, page) => {
    const skeleton = page >= 6 ? LATE_FEEDER_SKELETON : FEEDER_SKELETON;
    registerModuleVariants(`journal.feeder.${archetype}.s${page}`, [
      {
        when: { weekMin: 18 },
        weight: 4,
        priority: 3,
        text: [LATE_FEEDER_SKELETON],
      },
      {
        when: { weekMin: 5 },
        weight: 3,
        priority: 2,
        text: [skeleton],
      },
    ]);
  });
}

for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  if (!journal) continue;
  const intros = Array.isArray(journal.intro) ? journal.intro : [journal.intro];
  intros.forEach((_, level) => {
    registerModuleVariants(`journal.nadia.${archetype}.intro.l${level}`, [
      {
        when: { weekMin: 16 },
        weight: 3,
        priority: 3,
        text: [LATE_FEEDER_SKELETON],
      },
      {
        when: { weekMin: 6 },
        weight: 2,
        priority: 2,
        text: [FEEDER_SKELETON],
      },
    ]);
  });
  (journal.entries || []).forEach((row, page) => {
    if (!row) return;
    [0, 1, 2].forEach((level) => {
      if (!row[level]) return;
      const skeleton = page >= 4 ? LATE_FEEDER_SKELETON : FEEDER_SKELETON;
      registerModuleVariants(`journal.nadia.${archetype}.s${page}.l${level}`, [
        {
          when: { weekMin: 14 },
          weight: 3,
          priority: 3,
          text: [LATE_FEEDER_SKELETON],
        },
        {
          when: { weekMin: 8 },
          weight: 2,
          priority: 2,
          text: [skeleton],
        },
      ]);
    });
  });
}
