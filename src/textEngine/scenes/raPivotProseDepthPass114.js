// Roster unlock tails + opposition + dinner + WL (Pass 114).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('roster.unlock.s7', [
  {
    when: { studentId: [7] },
    weight: 1,
    text: [
      '{roster.unlock.s7.legacyBody}',
    ],
  },
]);

registerModuleVariants('roster.unlock.s10', [
  {
    when: { studentId: [10] },
    weight: 1,
    text: [
      'Reneé tastes the menu twice — cook’s tax climbing, your frequency in every bite.',
    ],
  },
]);

registerModuleVariants('opposition.hearing.removal.result.hold_firm', [
  {
    when: {},
    weight: 1,
    text: [
      'You hold the line — abundance named as policy, board members too full to argue.',
    ],
  },
]);

registerModuleVariants('dinner.depth', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Courses keep arriving — she stops pretending one plate was ever the plan.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s4.lasagna', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Lasagna for six, eaten by three — cheese stretching like the week’s ambition.',
    ],
  },
]);

registerModuleVariants('evolved.activity.body_positive_creator.s2', [
  {
    when: { evolvedFormId: ['body_positive_creator'], evolvedStageIdx: [2] },
    weight: 1,
    text: [
      'Campaign shoot — she poses in truth, belly forward, brand finally honest.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.purchase', [
  {
    when: { hallAmbiancePeakMin: [35] },
    weight: 1,
    text: [
      'Room upgrade seals — the wing exhales warmth through every labeled doorway.',
    ],
  },
]);
