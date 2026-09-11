// Homeroom + hall lounge + destiny origin (Pass 117).
import { registerModuleVariants } from '../engine.js';

const W = 3;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('homeroom.conference.batch_bake.intro', [
  {
    when: { hallAmbiancePeakMin: [30] },
    weight: 1,
    text: [
      'The kitchen runs hot — your upgraded hall keeps ovens honest and residents hungry.',
    ],
  },
]);

registerModuleVariants('hall.lounge.skill.purchase', [
  {
    when: { hallRoomId: ['kitchen'] },
    weight: 1,
    text: [
      'The kitchen upgrade hums — every labeled room on the blueprint feels closer to the stove.',
    ],
  },
]);

registerModuleVariants('eat.firstBite', [
  {
    when: { studentId: 5, origin: 'destiny_ranked_grind', ...EARLY },
    weight: W,
    text: [
      'She frames the first bite as a patch note — hunger buff, no cooldown.',
      'Ranked queue can wait. This plate is the real meta.',
    ],
  },
  {
    when: { studentId: 5, origin: 'destiny_offline_lobby', ...EARLY },
    weight: W,
    text: [
      'Offline mode: snacks enabled, spectators disabled. She eats like she already won.',
      'No stream, no chat — just fork DPS and a full inventory bar.',
    ],
  },
  {
    when: { studentId: 1, origin: 'madd_hidden_binge', ...EARLY },
    weight: W,
    text: [
      'Wrappers in the data set; the first bite is primary source material.',
      'She eats like someone who already lost the control group.',
    ],
  },
]);

registerModuleVariants('opposition.proxy.line', [
  {
    when: { weekMin: [10] },
    weight: 1,
    text: [
      'The proxy smiles through policy — your hall’s abundance is the exhibit they fear.',
    ],
  },
]);
