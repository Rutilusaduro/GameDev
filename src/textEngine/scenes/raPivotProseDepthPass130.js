// Roster unlock + ranked session depth (Pass 130).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('roster.unlock.s5', [
  {
    when: { studentId: [5] },
    weight: 1,
    text: [
      'Destiny’s door cracks open on RGB glow — trust unlock reads like a new stream category: private, ranked, hungry.',
    ],
  },
]);

registerModuleVariants('session.rae.arrival.s3', [
  {
    when: { sessionStage: [3] },
    weight: 1,
    text: [
      'Rae drops in with backup calories like patch notes — Destiny grins, queue unpaused, belly unmuted.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s2.butter_cake', [
  {
    when: { weekMin: [4] },
    weight: 1,
    text: [
      'Mary Jane ladles the lesson slow — daughters learn appetite is hospitality, not scandal, at this table.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.prestige', [
  {
    when: { ambianceTier: ['high', 'max'] },
    weight: 1,
    text: [
      'Atrium prestige ripples down the wing — residents stand taller in doorways, plates fuller, pride softer.',
    ],
  },
]);
