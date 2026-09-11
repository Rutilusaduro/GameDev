// Homeroom + CG + hall depth (Pass 133).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Bri.intro', [
  {
    when: { weekMin: [5] },
    weight: 1,
    text: [
      'Bri’s eyes find the desk drawer before the agenda — practical hunger dressed as parent conference.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0', [
  {
    when: { hallAmbiancePeakMin: [30] },
    weight: 1,
    text: [
      'Batch bake steam meets hall ambiance — the kitchen club feels like policy the whole floor voted for.',
    ],
  },
]);

registerModuleVariants('cg.scene.corkboard.Invested', [
  {
    when: { cgDriveTier: ['Invested'] },
    weight: 1,
    text: [
      'Pins and numbers glare under Priya’s handwriting — the corkboard is a leaderboard nobody admits is erotic.',
    ],
  },
]);

registerModuleVariants('journal.nadia.cheerleader.intro.l0', [
  {
    when: { corruptionMin: [0] },
    weight: 1,
    text: [
      'Nadia’s intro page smells like toner and appetite — research subject zero for the feeder focus.',
    ],
  },
]);
