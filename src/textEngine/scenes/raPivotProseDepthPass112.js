// Lab + network + opposition + stream (Pass 112).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('device.campus.beat', [
  {
    when: { endStageMin: [4] },
    weight: 1,
    text: [
      'Campus rig whirs — a remote pulse of appetite finds her between classes.',
    ],
  },
]);

registerModuleVariants('opposition.hearing.emergency.result.feast_bribe', [
  {
    when: {},
    weight: 1,
    text: [
      'Hearing catered — board members eat before they vote, and appetite wins the agenda.',
    ],
  },
]);

registerModuleVariants('stream.endStream.good', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Sign-off lands — chat still hungry, tips still ticking after the camera dies.',
    ],
  },
]);

registerModuleVariants('weekly.thesis_rewrite', [
  {
    when: { archetype: ['overachiever'] },
    weight: 1,
    text: [
      'Season spreadsheet yields — appetite columns wider than discipline rows.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.intro', [
  {
    when: {},
    weight: 1,
    text: [
      'Mrs. Calloway arrives buttoned — jacket already losing the fight with her middle.',
    ],
  },
]);

registerModuleVariants('evolved.activity.sumo.s3', [
  {
    when: { evolvedFormId: ['sumo'], evolvedStageIdx: [3] },
    weight: 1,
    text: [
      'National qualifier — press watches her belly argue with the sport’s weight classes.',
    ],
  },
]);

registerModuleVariants('opposition.endgame.synthesis', [
  {
    when: {},
    weight: 1,
    text: [
      'Scarcity folds — the hall exhales abundance and the board stops pretending famine is policy.',
    ],
  },
]);
