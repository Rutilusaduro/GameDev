// Evolution offer + blob session tails (Pass 124).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolution.offer.cheerleader.intro', [
  {
    when: { archetype: ['cheerleader'] },
    weight: 1,
    text: [
      'She still wears the sash — the squad’s future and her belly finally share a language.',
    ],
  },
]);

registerModuleVariants('evolution.offer.gamer.intro', [
  {
    when: { archetype: ['gamer'] },
    weight: 1,
    text: [
      'Controller still warm — she wants ranked sessions and ranked appetite in the same build.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.s5', [
  {
    when: { studentId: [5] },
    weight: 1,
    text: [
      'Forty-one seconds up the fold — Destiny times the climb like a speedrun category.',
    ],
  },
]);
