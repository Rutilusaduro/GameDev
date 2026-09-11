// Hall kitchen NPC stage blurbs — BATCH_BAKER_NPCS → pools.
import { registerDimension, registerPool } from '../../engine.js';
import { BATCH_BAKER_NPCS } from '../../../gameData/evolvedForms.js';

registerDimension('npcStage', (ctx) => ctx.globals?.npcStage ?? 0);
registerDimension('npcKey', (ctx) => ctx.globals?.npcKey ?? 'Kayla');

for (const [npcKey, stages] of Object.entries(BATCH_BAKER_NPCS)) {
  for (const [si, prose] of Object.entries(stages)) {
    const text = String(prose).trim();
    const lead = text.split(/(?<=[.!?])\s+/)[0] || text;
    registerPool(`homeroom.npc.${npcKey}.s${si}`, [
      {
        when: { npcKey: [npcKey], npcStage: [Number(si)] },
        weight: 2,
        text: [text],
      },
      {
        when: {},
        text: [
          text,
          (ctx) => text,
          (ctx) => (ctx.globals?.snippetOnly ? lead : text),
        ],
      },
    ]);
  }
}
