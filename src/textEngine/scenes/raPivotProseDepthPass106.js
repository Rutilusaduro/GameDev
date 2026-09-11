// Remaining weekly narrative roots + homeroom health unit (Pass 106).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('weekly.overachiever_pivot', [
  {
    when: {},
    weight: 1,
    text: [
      'Season plan pivots — spreadsheets yield to appetite, coach nods anyway.',
    ],
  },
]);

registerModuleVariants('weekly.custom_clothing', [
  {
    when: {},
    weight: 1,
    text: [
      'Shopping trip — elastic declared victory before the receipt printed.',
    ],
  },
]);

registerModuleVariants('weekly.immobility_peace', [
  {
    when: {},
    weight: 1,
    text: [
      'Comfortable at last — the room rearranges itself around her stillness.',
    ],
  },
]);

registerModuleVariants('weekly.blob_ending', [
  {
    when: {},
    weight: 1,
    text: [
      'Final form — the floor accepts her shape like a custom mattress.',
    ],
  },
]);

registerModuleVariants('weekly.team_weigh_in', [
  {
    when: {},
    weight: 1,
    text: [
      'Team weigh-in — numbers become gossip, gossip becomes appetite.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p1.weigh_moms', [
  {
    when: {},
    weight: 1,
    text: [
      'Moms on the scale — Kayla’s secret safe until laughter betrays it.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.synergy', [
  {
    when: { hallAmbiancePeakMin: [50] },
    weight: 1,
    text: [
      'Wing resonance hums — lounge warmth and kitchen steam trade favors.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s5.choc_cake', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Chocolate layer cake — mothers compete in frosting, daughters in seconds.',
    ],
  },
]);
