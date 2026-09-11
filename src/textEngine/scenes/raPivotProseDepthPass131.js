// Fair day + competitive gainer depth (Pass 131).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.day.weighIn.endingA', [
  {
    when: { fairInfluence: ['Brittany', 'Britt'] },
    weight: 1,
    text: [
      'Brittany’s influence shows — MJ holds the scale like a captain who outgrew the squad and kept the crowd.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.ending', [
  {
    when: { fairStageIdx: [4, 5] },
    weight: 1,
    text: [
      'Afterparty lights glaze every curve — county fair pride and appetite share the same trophy case.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.Heavy.Invested', [
  {
    when: { cgDriveTier: ['Invested'] },
    weight: 1,
    text: [
      'Priya posts numbers like patch notes — waist, bust, hips — and the hall pretends it is not watching.',
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s0.p0', [
  {
    when: { evolvedFormId: ['state_fair_queen'] },
    weight: 1,
    text: [
      'Fair queen arc opens on sawdust and sugar — MJ already tastes the crown before the weigh-in.',
    ],
  },
]);
