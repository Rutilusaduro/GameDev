// Wife lessons + CG measurement depth (Pass 82).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('wifeLessons.lesson.s1.honey_butter', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Butter glosses every knuckle — the kitchen teaches abundance before anyone speaks a lesson plan.',
    ],
  },
]);

registerModuleVariants('wifeLessons.v2.depth', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mary Jane ladles seconds like punctuation — nobody leaves the table still pretending they are full.',
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} watches mothers learn appetite the way daughters already have — quietly, then all at once.`;
      },
    ],
  },
]);

registerModuleVariants('cg.scene.reaction.priya_smaller.Frenzied.waist', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const t = ctx.globals?.targetName || 'She';
        return `Priya's jaw sets — ${t}'s waist is a threat written in inches, and threats get fed under.`;
      },
    ],
  },
]);

registerModuleVariants('cg.scene.selfReview.Heavy.Invested', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const m = ctx.globals?.measurement;
        return m != null
          ? `The mirror agrees: ${m} inches and climbing — data she can taste.`
          : 'The mirror agrees: the numbers climb, and she can taste the trend.';
      },
    ],
  },
]);
