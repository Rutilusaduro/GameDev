// Fair day tags bridge, evolved, WL, hall (Pass 96).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('fair.day.weighIn.endingA', [
  {
    when: {},
    weight: 1,
    text: [
      'Ground holds — MJ owns the number while the crowd learns her name.',
    ],
  },
]);

registerModuleVariants('fair.day.weighIn.endingB', [
  {
    when: {},
    weight: 1,
    text: [
      'Crowd roars — MJ feeds the moment until pride outweighs modesty.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.open', [
  {
    when: {},
    weight: 1,
    text: [
      'Fair night air tastes like sugar — afterparty is where winners keep winning.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.end1', [
  {
    when: {},
    weight: 1,
    text: [
      'Tuesday ends with empty platters — Daisy’s notebook already sketches next week.',
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s0.end1', [
  {
    when: {},
    weight: 1,
    text: [
      'Warm and ready — Darcy waits while MJ decides the table is hers.',
    ],
  },
]);

registerModuleVariants('evolved.activity.feedee_creator', [
  {
    when: {},
    weight: 1,
    text: [
      'Ring light on, plates staged — appetite becomes the script.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s1.cream_biscuits', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Cream biscuits melt on tongues — daughters learn tenderness is a recipe.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Wanda.s1.opt1', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"Our recipes were simple once. Mary Jane taught us abundance tastes like home."',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.intro', [
  {
    when: {},
    weight: 1,
    text: [
      'Mrs. Calloway arrives buttoned tight — wellness policy versus butter smell, round one.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.purchase', [
  {
    when: {},
    weight: 1,
    text: [
      'Work order signed — the wing changes smell before the paint dries.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.socialHeat', [
  {
    when: {},
    weight: 1,
    text: [
      'Doorways stay open — gossip and snacks trade places in the hallway.',
    ],
  },
]);

registerModuleVariants('cg.raReply.taunt', [
  {
    when: {},
    weight: 1,
    text: [
      'Your needle lands — Priya answers with calories, not courtesy.',
    ],
  },
]);
