// Evolved form stage reactions — bridge from EVOLVED_REACTIONS monolith.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getStage } from '../../../gameData/stages.js';
import { EVOLVED_REACTIONS } from '../../../gameData/evolvedForms.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { depthNarrativeAppendChance } from '../../../gameData/mechanicsDepthLayer.js';

function registerReactionBeat(poolKey, prose) {
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
      text: [slot, slot, slot],
    },
  ]);
}

for (const [formId, lines] of Object.entries(EVOLVED_REACTIONS)) {
  if (!Array.isArray(lines)) continue;
  lines.forEach((prose, idx) => {
    registerReactionBeat(`evolved.reaction.${formId}.s${idx}`, prose);
  });
}

export function renderEvolvedReaction(student, week = 1, opts = {}) {
  if (!student?.evolvedForm) return null;
  const arr = EVOLVED_REACTIONS[student.evolvedForm];
  if (!arr?.length) return null;
  const stageIdx = getStage(student.lbs ?? 0).id - 5;
  if (stageIdx < 0) return null;
  const si = Math.min(stageIdx, arr.length - 1);
  const formId = student.evolvedForm;
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'evolved_reaction',
      evolvedFormId: formId,
      reactionStageIdx: si,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  let line = '';
  try {
    line = render(`{evolved.reaction.${formId}.s${si}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) line = (arr[si] || '').trim();
  if (!line) return null;
  return appendV2Depth(
    line,
    'evolvedReaction',
    ctx,
    opts.v2DepthChance ?? depthNarrativeAppendChance(0.26),
  );
}
