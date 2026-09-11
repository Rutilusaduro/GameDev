// Campus find ids + homeroom + evolved activity (Pass 100).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('campus.find.wild_mint', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Wild mint bruises sweet on your palm — the quad smells like dessert before dinner.',
    ],
  },
]);

registerModuleVariants('campus.find.cult_tithe_jar', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'The tithe jar sticks — devotion and sugar cured together under a candle stub.',
    ],
  },
]);

registerModuleVariants('campus.find.find_honey_tart', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Honey tart still warm — greenhouse bench remembers who left it and who took it.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Oven heat rolls down the homeroom hall — every desk learns the smell of yes.',
    ],
  },
]);

registerModuleVariants('evolved.activity.wife_lessons', [
  {
    when: { evolvedStageIdx: [2] },
    weight: 1,
    text: [
      'MJ writes recipes the way other RAs write warnings — gentle, binding, impossible to refuse.',
    ],
  },
]);

registerModuleVariants('evolved.activity.state_fair_queen', [
  {
    when: { evolvedStageIdx: [4] },
    weight: 1,
    text: [
      'Fair ribbons stack on her corkboard — each one bought with appetite displayed in public.',
    ],
  },
]);

registerModuleVariants('weekly.uniform_split', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'The uniform gives up at the seam — the squad cheers before shame can arrive.',
    ],
  },
]);
