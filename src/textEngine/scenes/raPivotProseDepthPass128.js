// Journal + outfit rhythm tails (Pass 128).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('journal.feeder.swimmer.s0', [
  {
    when: { stageMin: [5] },
    weight: 1,
    text: [
      'Her strokes slow in the journal ink — buoyancy traded for belly, lap times for late-night pantry raids.',
    ],
  },
]);

registerModuleVariants('journal.nadia.cheerleader.s1.l1', [
  {
    when: { corruptionMin: [1] },
    weight: 1,
    text: [
      'Nadia underlines appetite like choreography — every bite a step the squad was not taught.',
    ],
  },
]);

registerModuleVariants('evolved.outfit.eating_streamer.s2', [
  {
    when: { hallAmbiancePeakMin: [35] },
    weight: 1,
    text: [
      'Branded hoodie, bib centered for chat — the hall ambiance makes every frame feel like a watch party.',
    ],
  },
]);

registerModuleVariants('session.tapOut.s1.st2', [
  {
    when: { studentId: [1] },
    weight: 1,
    text: [
      'Cassidy taps out laughing — competitive even when surrendering, plate pushed away like a finished race.',
    ],
  },
]);
