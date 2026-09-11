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
      'IRB paperwork can wait; the resident\'s appetite cannot — you note both without irony.',
      'Pen scratches keep time with chewing; the hall hums approval through the wall.',
      'Late-semester entries stack thick — every subject trending heavier, every margin honest.',
      'The journal stops pretending neutrality when she asks for seconds and means it.',
    ],
  },
]);

registerPool('journal.scene.subjectFocus', [
  {
    when: {},
    weight: 2,
    text: [
      'She softens on camera and off it; the journal catches both versions without judgment.',
      'Weight gain reads as compliance when you frame it as wellness — every pound a datapoint she cooperates into.',
      'Every pound is a datapoint; every sigh is consent dressed as fatigue.',
      'She blushes when praised for finishing; you write down the flush as data.',
      'Compliance reads as wellness on the form; hunger reads as honesty in the room.',
    ],
  },
]);

registerPool('journal.scene.lateObsession', [
  {
    when: {},
    weight: 2,
    text: [
      'Late-semester entries blur — appetite, attachment, and the scale read as one story.',
      'She begs for more between bites; the journal stops pretending neutrality while you log progress.',
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
        when: { weekMin: 20 },
        weight: 6,
        priority: 5,
        text: [page >= 6 ? LATE_FEEDER_SKELETON : FEEDER_SKELETON],
      },
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

registerModuleVariants('journal.feeder.cheerleader.s1', [
  {
    when: { archetype: ['cheerleader'] },
    weight: 1,
    text: [
      'Field notes: pom-poms aside, appetite leads the squad now.',
    ],
  },
]);

registerModuleVariants('journal.feeder.swimmer.s0', [
  {
    when: { stageMin: [5] },
    weight: 1,
    text: [
      'Her strokes slow in the journal ink — buoyancy traded for belly, lap times for late-night pantry raids.',
    ],
  },
]);

registerModuleVariants('journal.nadia.cheerleader.s1.l1', [
  {
    when: { corruptionMin: [1] },
    weight: 1,
    text: [
      'Nadia underlines appetite like choreography — every bite a step the squad was not taught.',
    ],
  },
]);

registerModuleVariants('journal.feeder.cheerleader.s2', [
  {
    when: { stageMin: [6] },
    weight: 1,
    text: [
      'Formation notes become portion charts — leadership means nobody on the squad stays hungry alone.',
    ],
  },
]);

registerModuleVariants('journal.feeder.cheerleader.s3', [
  {
    when: { stageMin: [4] },
    weight: 1,
    text: [
      'Uniform fights back — she cheers for more anyway, wellness season rewriting squad rules in real time.',
    ],
  },
]);

registerModuleVariants('journal.feeder.influencer.s1', [
  {
    when: { archetype: ['influencer'] },
    weight: 1,
    text: [
      'Kylie’s journal admits the ring light loves curves — wellness season became content season.',
    ],
  },
]);

registerModuleVariants('journal.nadia.swimmer.intro.l1', [
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Nadia’s second intro — Cassidy’s lane discipline reframed as appetite waiting for a new finish line.',
    ],
  },
]);
