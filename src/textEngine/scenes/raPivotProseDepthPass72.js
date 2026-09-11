// Hall kitchen NPC depth (Pass 72).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.npc.Mrs_Monroe.s4', [
  {
    when: { npcKey: ['Mrs_Monroe'], npcStage: [4] },
    weight: 3,
    text: [
      () => 'She made abundance look effortless — wide, warm, and already pouring the good wine before anyone asked.',
    ],
  },
]);
