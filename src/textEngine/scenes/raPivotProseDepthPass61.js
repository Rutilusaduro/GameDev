// Collab compose + hall blueprint ambient depth (Pass 61).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('collab.stageup.close', [
  { when: { collabStage: [4, 5] }, weight: 3, text: [
    'Wren is in the building somewhere — you reach for the plate anyway.',
    'The biggest stream on the platform and you are still feeding. Good.',
  ]},
]);

registerModuleVariants('collab.payoff.tag', [
  { when: { studentId: 2, collabStage: [2, 3, 4, 5] }, weight: 3, text: [
    'Kylie checks the VOD queue. Numbers already climbing offline.',
    'Content uploaded in her head before the mic cools.',
  ]},
]);

registerModuleVariants('hall.blueprint.purchase', [
  { when: { stageMin: 3 }, weight: 2, text: [
    'The blueprint updates — another room labeled, another appetite corridor unlocked.',
    'You stamp the work order. The hall grows on purpose now, not by accident.',
  ]},
]);

registerModuleVariants('hall.ambiance.pulse.comfort', [
  { when: {}, weight: 2, text: [
    'Comfort pulse: chairs wider, lights warmer — the floor teaches residents to stay.',
    'The lounge exhales. Snack drawers feel closer than they did yesterday.',
  ]},
]);

registerModuleVariants('hall.ambiance.pulse.appetite', [
  { when: {}, weight: 2, text: [
    'Appetite pulse: portions feel generous, hunger feels invited.',
    'Someone opens a second bag of chips without shame. The ambiance did that.',
  ]},
]);
