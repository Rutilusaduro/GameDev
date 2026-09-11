// Evolved form — passive activity beats (EVOLVED_ACTIVITY_TEXT → pools).
import { registerDimension, registerPool } from '../../engine.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedForms.js';

registerDimension('evolvedFormId', (ctx) => ctx.globals?.evolvedFormId ?? ctx.globals?.formId ?? ctx.d?.evolvedForm ?? 'evolved');
registerDimension('evolvedStageIdx', (ctx) => ctx.globals?.evolvedStageIdx ?? ctx.globals?.stageIdx ?? 0);

function beatFn(entry) {
  return (ctx) => {
    if (typeof entry === 'function') return entry(ctx.subject);
    return String(entry || '').trim();
  };
}

const ACTIVITY_ATMOSPHERE = [
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    const lbs = Math.round(ctx.subject?.lbs ?? 0);
    return lbs > 0
      ? `${n} leaves ${lbs} pounds of presence in the hallway when she goes.`
      : `${n} leaves appetite in the hallway when she goes.`;
  },
  'The floor remembers the session long after the plates are empty.',
  (ctx) => {
    const w = ctx.week ?? 1;
    return `Week ${w} stacks habit on habit — nobody pretends this is accidental anymore.`;
  },
  'Someone down the hall smells what happened and starts thinking about seconds.',
  (ctx) => {
    const n = ctx.subject?.name || 'She';
    return `${n} moves slower afterward, satisfied in a way the building rewards.`;
  },
  'Radiators hum. Bellies settle. The RA log can wait.',
];

function atmosphereBeat(formId, stageIdx, slot = 0) {
  const i = (formId.length * 7 + stageIdx * 3 + slot) % ACTIVITY_ATMOSPHERE.length;
  const fn = ACTIVITY_ATMOSPHERE[i];
  return typeof fn === 'function' ? fn : () => fn;
}

for (const [formId, arr] of Object.entries(EVOLVED_ACTIVITY_TEXT)) {
  if (!Array.isArray(arr)) continue;
  const entries = [];
  for (let si = 0; si < arr.length; si++) {
    const entry = arr[si];
    if (entry == null) continue;
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
