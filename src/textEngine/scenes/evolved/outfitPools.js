// Evolved outfit flavor lines — bridge from EVOLVED_OUTFITS monolith.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getStage } from '../../../gameData/stages.js';
import { EVOLVED_OUTFITS } from '../../../gameData/evolvedForms.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { depthNarrativeAppendChance } from '../../../gameData/mechanicsDepthLayer.js';
import { outfitTailBeat } from './proseTails.js';

function registerOutfitBeat(poolKey, prose, seed) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    {
      when: {},
      weight: 3,
      text: [
        slot,
        outfitTailBeat(seed, 0),
        outfitTailBeat(seed, 1),
        outfitTailBeat(seed, 2),
      ],
    },
  ]);
}

for (const [formId, lines] of Object.entries(EVOLVED_OUTFITS)) {
  if (!Array.isArray(lines)) continue;
  lines.forEach((prose, idx) => {
    registerOutfitBeat(`evolved.outfit.${formId}.s${idx}`, prose, `${formId}:s${idx}`);
  });
}

export function renderEvolvedOutfit(student, week = 1, opts = {}) {
  if (!student?.evolvedForm) return null;
  const stageId = getStage(student.lbs ?? 0).id;
  if (stageId < 5) return null;
  const arr = EVOLVED_OUTFITS[student.evolvedForm];
  if (!arr?.length) return null;
  const si = Math.min(stageId - 5, arr.length - 1);
  const formId = student.evolvedForm;
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'evolved_outfit', evolvedFormId: formId, outfitStageIdx: si, ...(opts.globals || {}) },
    ...opts,
  });
  let line = '';
  try {
    line = render(`{evolved.outfit.${formId}.s${si}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) line = (arr[si] || '').trim();
  if (!line) return null;
  return appendV2Depth(
    line,
    'evolvedOutfit',
    ctx,
    opts.v2DepthChance ?? depthNarrativeAppendChance(0.2),
  );
}
