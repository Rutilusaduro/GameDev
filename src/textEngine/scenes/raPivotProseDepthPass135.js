// Blueprint synergy + session depth (Pass 135).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hall.blueprint.synergy', [
  {
    when: { hallAmbiancePeakMin: [45] },
    weight: 1,
    text: [
      'Two wings lock in — comfort bleeds into pantry steam until appetite walks the blueprint without a map.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.default', [
  {
    when: { stageMin: [8] },
    weight: 1,
    text: [
      'Default blob intro tail — you climb warm geography; she receives you like the room always meant immobility.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.swimmer', [
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Lane splits behind her — evolution card reads like a new PR category: appetite per serving.',
    ],
  },
]);

registerModuleVariants('cg.scene.binge.Heavy.Invested', [
  {
    when: { cgDriveTier: ['Invested'], cgStageKey: ['Heavy'] },
    weight: 1,
    text: [
      'Containers empty in ranked order — Priya binge scene reads like a bracket nobody streams but everybody feels.',
    ],
  },
]);
