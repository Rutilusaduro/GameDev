// Fair collabs, homeroom tails, WL + CG beats (Pass 88).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('fair.boost.Brittany', [
  {
    when: { fairBoostTier: ['Mid'] },
    weight: 1,
    text: [
      'Brittany treats the midway like a gym — reps are bites, rest is optional, pride is the scoreboard.',
    ],
  },
]);

registerModuleVariants('fair.boost.Serena', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Serena poses between funnel cakes — every flash adds a pound of legend before MJ claims the ribbon.',
    ],
  },
]);

registerModuleVariants('fair.boost.Renee', [
  {
    when: { fairBoostTier: ['Low'] },
    weight: 1,
    text: [
      'Renee starts shy at the corn-dog line and ends loud — fair pride grows wherever she finally lets herself eat.',
    ],
  },
]);

registerModuleVariants('fair.boost.Daisy', [
  {
    when: { fairBoostTier: ['Mid'] },
    weight: 1,
    text: [
      'Daisy maps the food map like homework — MJ follows the highlighter straight into another trophy photo.',
    ],
  },
]);

registerModuleVariants('fair.boost.Lilith', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Lilith’s recruits chant while MJ swallows — pride spikes like kettle corn popping in the dark.',
    ],
  },
]);

registerModuleVariants('fair.photo.Brittany', [
  {
    when: {},
    weight: 1,
    text: [
      'Brittany’s grin outshines the fryer glow — the corkboard gains another greasy saint.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.offer_tasting', [
  {
    when: {},
    weight: 1,
    text: [
      'Wrapped slice steams on laminate — Mrs. Calloway takes it like policy finally admitted appetite counts.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Reyes.honest_talk', [
  {
    when: {},
    weight: 1,
    text: [
      'Coffee cools while truth warms — Mrs. Reyes and Daisy trade stress for permission without a single wellness slide.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Sofia.portfolio', [
  {
    when: {},
    weight: 1,
    text: [
      'Sofia grades art with the same focus she’ll use on cake — portfolio closed, container already waiting.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Darlene.s1.opt0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Darlene’s yes is quiet but final — the kitchen schedule reshuffles around daughters who finally want seconds.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s3.bread_pudding', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Berry juice stains aprons like badges — mothers teach daughters that sweetness is a skill, not an accident.',
    ],
  },
]);

registerModuleVariants('cg.chat.resident.Brittany.close', [
  {
    when: {},
    weight: 1,
    text: [
      'Brittany’s first message is all caps and hunger — the corkboard was never enough, she needs a witness.',
    ],
  },
]);

registerModuleVariants('cg.scene.reaction.priya_larger.Driven.belly', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.globals?.targetName || 'She';
        return `${n} laughs when the tape slips — belly wins the measurement round before pride catches up.`;
      },
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s0.p1', [
  {
    when: {},
    weight: 1,
    text: [
      'Midway lights blur — MJ tastes county fame and decides the crown is edible.',
    ],
  },
]);

registerModuleVariants('evolved.activity.competitive_gainer', [
  {
    when: {},
    weight: 1,
    text: [
      'Scale rivalry hums under dorm quiet — every RA ping is another dare to grow louder.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.appetite', [
  {
    when: {},
    weight: 1,
    text: [
      'Hall air thickens with fried memory — residents sniff toward the lounge before their feet agree.',
    ],
  },
]);
