// Evolved form — passive activity beats (EVOLVED_ACTIVITY_TEXT → pools).
import { registerDimension, registerPool } from '../../engine.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedActivityData.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { atmosphereBeat } from './proseTails.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

const SAMPLE_ACTIVITY_SUBJECT = { id: 'mj', name: 'MJ', lbs: 220, archetype: 'cheerleader' };

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
    let legacySample = '';
    if (typeof entry === 'string' && entry.trim()) legacySample = entry.trim();
    else if (typeof entry === 'function') {
      try {
        legacySample = String(entry(SAMPLE_ACTIVITY_SUBJECT)).trim();
      } catch {
        legacySample = '';
      }
    }
    if (legacySample) {
      registerDecomposedPool(`evolved.activity.${formId}.s${si}.legacyBody`, legacySample);
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
    when: legacyBridgeWhen(),
    text: [
      (ctx) => beatFn(arr[0])(ctx),
      atmosphereBeat(formId, 0, 2),
      (ctx) => beatFn(arr[Math.min(arr.length - 1, 0)])(ctx),
    ],
  });
  entries.push(lintWildcardVariant('{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }'));
  registerPool(`evolved.activity.${formId}`, entries);
}
