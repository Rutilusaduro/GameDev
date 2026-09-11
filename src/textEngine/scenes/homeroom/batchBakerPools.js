// Hall kitchen NPC stage blurbs — BATCH_BAKER_NPCS → pools.
import { registerDimension, registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { BATCH_BAKER_NPCS } from '../../../gameData/homeroomEvents.js';
import { homeroomTailBeat } from '../evolved/proseTails.js';

registerDimension('npcStage', (ctx) => ctx.globals?.npcStage ?? 0);
registerDimension('npcKey', (ctx) => ctx.globals?.npcKey ?? 'Kayla');

function registerNpcStage(poolKey, npcKey, stageIdx, prose) {
  const text = String(prose).trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const lead = text.split(/(?<=[.!?])\s+/)[0] || text;
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  const snippet = (ctx) => (ctx.globals?.snippetOnly ? lead : slot(ctx));
  const seed = `${npcKey}:s${stageIdx}`;
  registerPool(poolKey, [
    {
      when: { npcKey: [npcKey], npcStage: [Number(stageIdx)] },
      weight: 2,
      text: [slot, snippet, homeroomTailBeat(seed, 0)],
    },
    {
      when: {},
      text: [slot, snippet, homeroomTailBeat(seed, 1), homeroomTailBeat(seed, 2)],
    },
  ]);
}

for (const [npcKey, stages] of Object.entries(BATCH_BAKER_NPCS)) {
  for (const [si, prose] of Object.entries(stages)) {
    registerNpcStage(`homeroom.npc.${npcKey}.s${si}`, npcKey, si, prose);
  }
}
