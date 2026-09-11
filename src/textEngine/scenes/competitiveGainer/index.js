// Competitive Gainer — measurement session bridge (replaces [MeasurementScene_*] tags).
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import { cgMeasureSession, cgTargetStageBucket } from './fragments.js';
import './raReplyPools.js';
import { fillCgTemplate } from './raReplyPools.js';
import { CG_RA_REPLY_TEXT } from '../../../gameData/competitiveGainerText.js';

registerDimension('targetStageBucket', (ctx) => ctx.globals?.targetStageBucket ?? 'mid');
registerDimension('cgDriveTier', (ctx) => ctx.globals?.cgDriveTier ?? 'Invested');

const tiers = ['Invested', 'Driven', 'Frenzied', 'Ruthless'];
const buckets = ['mid', 'heavy', 'vast'];

const sessionEntries = [];
for (const tier of tiers) {
  for (const bucket of buckets) {
    sessionEntries.push({
      when: { cgDriveTier: [tier], targetStageBucket: [bucket] },
      weight: 2,
      text: [cgMeasureSession],
    });
  }
}
sessionEntries.push({
  when: {},
  text: [
    cgMeasureSession,
    (ctx) => `${cgMeasureSession(ctx)}\n\nThe corkboard waits like a verdict.`,
    cgMeasureSession,
  ],
});
registerPool('cg.measurement.session', sessionEntries);

export function buildCGMeasureCtx(target, priya, week, opts = {}) {
  const targetStage = getStage(target?.lbs ?? 200).id;
  return buildTextContext({
    subject: target,
    ref: priya,
    week,
    globals: {
      featureId: 'competitive_gainer',
      targetName: target?.name,
      priyaName: priya?.name || 'Priya',
      targetStage,
      targetStageBucket: cgTargetStageBucket(targetStage),
      cgDriveTier: opts.driveTierLabel || 'Invested',
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderCGMeasurementScene(target, priya, week, driveTierLabel = 'Invested', opts = {}) {
  if (!target || !priya) return '';
  const ctx = buildCGMeasureCtx(target, priya, week, { driveTierLabel, ...opts });
  try {
    const line = render('{cg.measurement.session}', ctx)?.trim();
    if (!line || line.includes('{unresolved}')) return '';
    return appendV2Depth(line, 'competitiveGainer', ctx, opts.v2DepthChance ?? 0.28);
  } catch {
    return '';
  }
}

/** Legacy tag `[MeasurementScene_Name_S#]` or raw placeholder. */
export function renderCGRaReply(optId, priya, week, stageKey, vars = {}, hasComparison = false, opts = {}) {
  if (!priya || !optId) return '';
  const ctx = buildTextContext({
    subject: priya,
    week,
    globals: {
      featureId: 'competitive_gainer',
      cgRaStage: stageKey || 'Heavy',
      cgRaHasComparison: hasComparison,
      residentName: vars.residentName,
      bodypart: vars.bodypart,
      priyaValue: vars.priyaValue,
      targetValue: vars.targetValue,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  try {
    let line = render(`{cg.raReply.${optId}}`, ctx)?.trim();
    if (!line || line.includes('{unresolved}')) {
      const def = CG_RA_REPLY_TEXT[optId];
      const template = hasComparison ? (def?.byStage?.[stageKey] || def?.fallback) : def?.fallback;
      line = fillCgTemplate(template, ctx.globals);
    } else {
      line = fillCgTemplate(line, ctx.globals);
    }
    if (!line) return '';
    return appendV2Depth(line, 'competitiveGainer', ctx, opts.v2DepthChance ?? 0.24);
  } catch {
    const def = CG_RA_REPLY_TEXT[optId];
    const template = hasComparison ? (def?.byStage?.[stageKey] || def?.fallback) : def?.fallback;
    return fillCgTemplate(template, { ...vars, residentName: vars.residentName, bodypart: vars.bodypart });
  }
}

export function resolveCGMeasurementTag(tagOrText, target, priya, week, driveTierLabel = 'Invested') {
  const s = (tagOrText || '').trim();
  if (!s.startsWith('[MeasurementScene_')) {
    return s;
  }
  const rendered = renderCGMeasurementScene(target, priya, week, driveTierLabel);
  return rendered || s;
}
