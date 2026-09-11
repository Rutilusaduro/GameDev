// Blob + evolution + journal depth (Pass 129).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.blobIntro.s13', [
  {
    when: { studentId: [13] },
    weight: 1,
    text: [
      'Daisy’s door does not open wide anymore — meals arrive like hall policy written in steam and frosting.',
    ],
  },
]);

registerModuleVariants('evolution.offer.swimmer.intro', [
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Lane discipline cracks — she wants a path where appetite keeps pace with medals.',
    ],
  },
]);

registerModuleVariants('evolved.reaction.feedee_creator.s3', [
  {
    when: { evolvedFormId: ['feedee_creator'] },
    weight: 1,
    text: [
      'Comments spike before she finishes chewing — the creator path feeds the audience and the belly at once.',
    ],
  },
]);

registerModuleVariants('journal.feeder.cheerleader.s2', [
  {
    when: { stageMin: [6] },
    weight: 1,
    text: [
      'Formation notes become portion charts — leadership means nobody on the squad stays hungry alone.',
    ],
  },
]);
