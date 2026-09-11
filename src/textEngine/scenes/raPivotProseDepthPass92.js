// Evolved + fair + CG post depth (Pass 92).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('evolved.event.state_fair_queen.s0.p1', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Livestock scale groans — Darcy reads your number like weather she did not order.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.end0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'First Tuesday closes warm — Daisy’s notebook already plans next week’s butter budget.',
    ],
  },
]);

registerModuleVariants('evolved.activity.eating_streamer', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Ring light, delivery bags, chat scrolling — appetite becomes content before the first bite lands.',
    ],
  },
]);

registerModuleVariants('fair.training.Lilith', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Lilith’s recruits chant while MJ swallows — fair pride spikes like kettle corn in the dark.',
    ],
  },
]);

registerModuleVariants('fair.training.Renee', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Renee starts shy at the corn-dog line and ends loud — pride grows wherever she finally lets herself eat.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.Heavy.Driven', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Priya posts mid-tier numbers like a teaser — the thread holds its breath before the next meal.',
    ],
  },
]);

registerModuleVariants('cg.scene.binge.Heavy.Invested', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Delivery stacks while the corkboard watches — invested hunger does not pause for dignity.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s6.daughters_bake', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Daughters run the counters now — mothers learn to applaud with full mouths.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.summary', [
  {
    when: { ambianceTier: ['high'] },
    weight: 1,
    text: [
      'The floor hums like a body that learned permission — every corridor smells like seconds.',
    ],
  },
]);
