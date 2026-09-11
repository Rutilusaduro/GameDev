// Evolved reaction tails + journal ambiance (Pass 121).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.reaction.sumo.s2', [
  {
    when: { evolvedForm: ['sumo'] },
    weight: 1,
    text: [
      'The board remembers your number — Dana’s clap still echoes in your belly.',
    ],
  },
]);

registerModuleVariants('evolved.reaction.feedee_creator.s4', [
  {
    when: { evolvedForm: ['feedee_creator'] },
    weight: 1,
    text: [
      'Collab season peaks — camera, partner, appetite, all one warm frame.',
    ],
  },
]);

registerModuleVariants('evolved.reaction.eating_competitor.s3', [
  {
    when: { evolvedForm: ['eating_competitor'] },
    weight: 1,
    text: [
      'Regional record shattered — the table still trembles when you sit down.',
    ],
  },
]);

registerModuleVariants('journal.feeder.cheerleader.s1', [
  {
    when: { archetype: ['cheerleader'] },
    weight: 1,
    text: [
      'Field notes: pom-poms aside, appetite leads the squad now.',
    ],
  },
]);
