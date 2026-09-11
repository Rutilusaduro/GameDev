// Batch-baker NPC blurbs — composable kitchen-mom slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { BATCH_BAKER_NPCS } from '../../../gameData/homeroomEvents.js';

registerPool('homeroom.npc.kitchenGossip', [
  {
    when: {},
    weight: 2,
    text: [
      'She measures progress in pans, not pounds — until both disagree.',
      'Apron dusted white; eyes sharp on every resident who lingers too long at the counter.',
      'The moms trade recipes like secrets and calories like compliments.',
    ],
  },
]);

registerPool('homeroom.npc.momHeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Oven warmth follows her into conversation — soft authority, hard portions.',
      'She smiles like hospitality and feeds like strategy.',
      'Every hug comes with a container for the walk home.',
    ],
  },
]);

const NPC_SKELETON = '{homeroom.npc.kitchenGossip|prefix:} {homeroom.npc.momHeat|prefix: }';

for (const [npcKey, stages] of Object.entries(BATCH_BAKER_NPCS)) {
  for (const si of Object.keys(stages)) {
    registerModuleVariants(`homeroom.npc.${npcKey}.s${si}`, [
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [NPC_SKELETON],
      },
    ]);
  }
}
