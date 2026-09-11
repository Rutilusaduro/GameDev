// Post-monolith extract depth (Pass 140) — fair + evolved event tails.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.train.Brittany.body', [
  {
    when: { weekMin: [18] },
    weight: 1,
    text: [
      'Brittany’s fair-prep run treats every rehearsal like a weigh-in — MJ’s kitchen heat already showing on the scoreboard.',
    ],
  },
]);

registerModuleVariants('evolved.sumo.s5.phase0.body', [
  {
    when: { stageMin: [5] },
    weight: 1,
    text: [
      'Chanko steam and liniment — the dohyo warm-up room knows you started as a cheerleader and stopped apologizing for it.',
    ],
  },
]);
