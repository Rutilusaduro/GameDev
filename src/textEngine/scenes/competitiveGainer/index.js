// Competitive Gainer — measurement session bridge (replaces [MeasurementScene_*] tags).
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import { cgMeasureSession, cgTargetStageBucket } from './fragments.js';
import './raReplyPools.js';
import './cgScenePools.js';
import { fillCgTemplate } from './raReplyPools.js';
import {
  CG_RA_REPLY_TEXT,
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
} from '../../../gameData/competitiveGainerText.js';

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
    (ctx) => {
      const p = ctx.globals?.priyaName || 'Priya';
      return `${p} taps the corkboard before the ink dries — habit dressed as science.`;
    },
    (ctx) => {
      const t = ctx.globals?.targetName || 'her';
      return `Tape and scale agree: ${t} is measurable, memorable, and still hungry.`;
    },
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

function buildCGSceneCtx(priya, week, globals = {}, opts = {}) {
  return buildTextContext({
    subject: priya,
    week,
    globals: {
      featureId: 'competitive_gainer',
      priyaName: priya?.name || 'Priya',
      cgDriveTier: globals.cgDriveTier || 'Invested',
      ...globals,
    },
    ...opts,
  });
}

export function renderCGCorkboardScene(priya, week, driveTierLabel = 'Invested', visitIdx = 0, opts = {}) {
  if (!priya) return '';
  const tier = driveTierLabel || 'Invested';
  const arr = CG_FILLED_CORKBOARD_SCENES[tier] || CG_FILLED_CORKBOARD_SCENES.Invested || [];
  const fallback = arr[visitIdx % arr.length] || '';
  const ctx = buildCGSceneCtx(priya, week, { cgDriveTier: tier, cgSceneVisit: visitIdx }, opts);
  try {
    const line = render(`{cg.scene.corkboard.${tier}}`, ctx)?.trim();
    if (line && !line.includes('{unresolved}')) {
      return appendV2Depth(line, 'competitiveGainer', ctx, opts.v2DepthChance ?? 0.26);
    }
  } catch {
    /* fallback */
  }
  return renderCGSceneBeat(fallback, priya, week, tier, 'corkboard', opts);
}

export function renderCGBingeScene(priya, week, stageKey = 'Heavy', driveTierLabel = 'Invested', opts = {}) {
  if (!priya) return '';
  const tier = driveTierLabel || 'Invested';
  const sk = stageKey || 'Heavy';
  const fallback = CG_FILLED_BINGE_SCENES[sk]?.[tier] || CG_FILLED_BINGE_SCENES.Heavy?.Invested || '';
  const ctx = buildCGSceneCtx(priya, week, { cgDriveTier: tier, cgStageKey: sk }, opts);
  const poolKey = `cg.scene.binge.${sk}.${tier}`;
  try {
    const line = render(`{${poolKey}}`, ctx)?.trim();
    if (line && !line.includes('{unresolved}')) {
      return appendV2Depth(line, 'competitiveGainer', ctx, opts.v2DepthChance ?? 0.26);
    }
  } catch {
    /* fallback */
  }
  return renderCGSceneBeat(fallback, priya, week, tier, 'binge', opts);
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
/** Corkboard / self-review / binge / measurement prose — V2 depth on rendered beat. */
export function renderCGSceneBeat(rawText, priya, week = 1, driveTierLabel = 'Invested', beat = 'scene', opts = {}) {
  const line = (rawText || '').trim();
  if (!line || !priya) return line;
  const ctx = buildTextContext({
    subject: priya,
    week,
    globals: {
      featureId: 'competitive_gainer',
      cgDriveTier: driveTierLabel,
      cgBeat: beat,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  return appendV2Depth(line, 'competitiveGainer', ctx, opts.v2DepthChance ?? 0.26);
}

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
