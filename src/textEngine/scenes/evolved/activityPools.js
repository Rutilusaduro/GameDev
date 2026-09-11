// Evolved form — passive activity beats (EVOLVED_ACTIVITY_TEXT → pools).
import { registerDimension, registerPool } from '../../engine.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedForms.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { atmosphereBeat } from './proseTails.js';

registerDimension('evolvedFormId', (ctx) => ctx.globals?.evolvedFormId ?? ctx.globals?.formId ?? ctx.d?.evolvedForm ?? 'evolved');
registerDimension('evolvedStageIdx', (ctx) => ctx.globals?.evolvedStageIdx ?? ctx.globals?.stageIdx ?? 0);

function beatFn(entry) {
  return (ctx) => {
    if (typeof entry === 'function') return entry(ctx.subject);
    return String(entry || '').trim();
  };
}

for (const [formId, arr] of Object.entries(EVOLVED_ACTIVITY_TEXT)) {
  if (!Array.isArray(arr)) continue;
  const entries = [];
  for (let si = 0; si < arr.length; si++) {
    const entry = arr[si];
    if (entry == null) continue;
    if (typeof entry === 'string' && entry.trim()) {
      registerDecomposedPool(`evolved.activity.${formId}.s${si}.legacyBody`, entry.trim());
    }
    const core = beatFn(entry);
    entries.push({
      when: { evolvedFormId: [formId], evolvedStageIdx: [si] },
      weight: 2,
      text: [
        core,
        atmosphereBeat(formId, si, 0),
        atmosphereBeat(formId, si, 1),
      ],
    });
  }
  entries.push({
    when: { evolvedFormId: [formId] },
    text: [
      (ctx) => {
        const si = Math.min(arr.length - 1, Math.max(0, ctx.globals?.evolvedStageIdx ?? 0));
        const e = arr[si];
        return e ? beatFn(e)(ctx) : "She's in her element.";
      },
      atmosphereBeat(formId, arr.length - 1, 0),
      (ctx) => "She's in her element — heavier, surer, already thinking about the next meal.",
    ],
  });
  entries.push({
    when: {},
    text: [
      (ctx) => beatFn(arr[0])(ctx),
      atmosphereBeat(formId, 0, 2),
      (ctx) => beatFn(arr[Math.min(arr.length - 1, 0)])(ctx),
    ],
  });
  registerPool(`evolved.activity.${formId}`, entries);
}
