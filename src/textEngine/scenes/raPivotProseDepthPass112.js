// Lab + network + opposition + stream (Pass 112).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('opposition.hearing.emergency.result.feast_bribe', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Hearing catered — board members eat before they vote, and appetite wins the agenda.',
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
    when: legacyBridgeWhen(),
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
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Scarcity folds — the hall exhales abundance and the board stops pretending famine is policy.',
    ],
  },
]);
