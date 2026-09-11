// Session aftermath modular + late CG corkboard slot reinforcement (Pass 157).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.aftermath.glow', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester aftermath lingers — habit, heat, and the hall log already expecting round two.',
    ],
  },
]);

registerModuleVariants('cg.scene.dataObsession', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Priya treats the corkboard like scripture — late-semester numbers dominate every margin.',
    ],
  },
]);
