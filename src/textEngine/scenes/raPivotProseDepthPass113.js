// Roster unlock + pharmacist + collab + homeroom (Pass 113).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('roster.unlock.s0', [
  {
    when: { studentId: [0] },
    weight: 1,
    text: [
      'Brittany hands you the squad count — macros loose, appetite louder than discipline now.',
    ],
  },
]);

registerModuleVariants('roster.unlock.s2', [
  {
    when: { studentId: [2] },
    weight: 1,
    text: [
      'Kylie keeps a second bowl off-camera — the feed she saves just for your floor.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mrs. Reyes talks over everyone — voice warm, portions already multiplying in her bag.',
    ],
  },
]);

registerModuleVariants('collab.payoff.feel', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Collab wrap — both creators still eating, chat begging for the after-show.',
    ],
  },
]);

registerModuleVariants('weekly.chair_breaks', [
  {
    when: { endStageMin: [6] },
    weight: 1,
    text: [
      'Chair surrenders — laughter first, then the slow applause of witnesses.',
    ],
  },
]);

registerModuleVariants('evolved.activity.pharmacist.s2', [
  {
    when: { evolvedFormId: ['pharmacist'], evolvedStageIdx: [2] },
    weight: 1,
    text: [
      'Campus trial doses — Sophia measures appetite like a controlled substance.',
    ],
  },
]);
