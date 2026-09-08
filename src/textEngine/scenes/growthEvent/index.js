// ═══════════════════════════════════════════════════════════════
// SCENE: GROWTH EVENT — multi-beat major gain scenes
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import { getEquippedDeviceIds } from '../../../gameData/deviceEquip.js';
import { getDependenceTier } from '../../../gameData/psychState.js';
import { MARQUEE_GROWTH_DEVICE_IDS } from '../../../gameData/devices.js';
import './digestScene.js';
import './fragments.js';
import './environment.js';
import './stageCrossings.js';
import './garments.js';
import './personas.js';
import '../../modules.js';

function weightBandFromStage(stageId) {
  if (stageId <= 2) return 'lean';
  if (stageId <= 5) return 'mid';
  if (stageId <= 8) return 'heavy';
  return 'extreme';
}

function deviceDependenceTier(student) {
  const dep = student?.psych?.dependence ?? 0;
  const equipped = getEquippedDeviceIds(student).length;
  return getDependenceTier(dep + equipped * 8).id;
}

export function buildGrowthGlobals(student, params = {}) {
  const endStage = params.endStage ?? getStage(student?.lbs ?? 130).id;
  const startStage = params.startStage ?? endStage;
  const equipped = getEquippedDeviceIds(student);
  return {
    causeType: params.causeType || 'device_use',
    deviceId: params.deviceId || null,
    featureId: params.featureId || null,
    gainLbs: params.gainLbs ?? 0,
    gainLbsMin: params.gainLbs ?? 0,
    startStage,
    endStage,
    stagesJumped: params.stagesJumped ?? Math.max(0, endStage - startStage),
    growthZone: params.growthZone || 'belly',
    growthMethod: params.growthMethod || 'feed',
    growthIntensity: params.growthIntensity || 'steady',
    sensation: params.sensation || 'fullness',
    malfunctionTier: params.malfunctionTier || null,
    isMalfunction: !!params.isMalfunction,
    isPermanent: !!params.isPermanent,
    limitRemoved: !!student?.limitRemoved || !!params.limitRemoved,
    locale: params.locale || 'campus',
    outfitHint: params.outfitHint || student?.archetype || 'default',
    pantsFactor: params.pantsFactor ?? 0,
    weightBand: weightBandFromStage(endStage),
    bodyState: student?.bodyOverride?.stateType || null,
    deviceDependence: equipped.length > 0,
    deviceDependenceTier: deviceDependenceTier(student),
    equippedWaist: student?.equip?.waist?.defId || null,
    equippedHead: student?.equip?.head?.defId || null,
    equippedCountMin: equipped.length >= 3 ? equipped.length : 0,
    isMarqueeDevice: params.deviceId ? MARQUEE_GROWTH_DEVICE_IDS.includes(params.deviceId) : false,
  };
}

function growthCtx(student, params, opts = {}) {
  return createContext({
    subject: student,
    week: params.week ?? 1,
    globals: buildGrowthGlobals(student, params),
  });
}

function magnitudeFromGlobals(g) {
  if (g.stagesJumped >= 2 || g.malfunctionTier === 'critical' || g.isMarqueeDevice) return 'dramatic';
  if (g.stagesJumped >= 1 || g.malfunctionTier === 'major' || g.malfunctionTier === 'moderate') return 'significant';
  if (g.endStage >= 6 && g.stagesJumped === 0) return 'significant';
  return 'notable';
}

function assembleDigestBeats(ctx, trace = null) {
  const r = (tpl) => render(tpl, ctx, { trace });
  const beats = [];
  beats.push(r('{ge.digestOnset}'));
  beats.push(r('{ge.digestNotice}'));
  if (ctx.globals.stagesJumped >= 1) {
    const crossing = r('{grow.crossing}');
    const crossingDlg = r('{grow.crossingDialogue}');
    beats.push([crossing, crossingDlg].filter(Boolean).join(' '));
  }
  beats.push(r('{ge.digestReaction}'));
  beats.push(r('{ge.digestSettle}'));
  return beats.filter(b => b && b.trim());
}

function assembleBeats(ctx, magnitude, trace = null) {
  const r = (tpl) => render(tpl, ctx, { trace });
  const beats = [];
  beats.push(r('{ge.onset}'));
  beats.push(r('{ge.surge}'));
  if (magnitude !== 'notable') {
    beats.push(r('{ge.strain}'));
  }
  if (magnitude === 'dramatic' || (magnitude === 'significant' && ctx.globals.endStage >= 6)) {
    beats.push(r('{ge.environment}'));
  }
  if (ctx.globals.stagesJumped >= 1) {
    const crossing = r('{grow.crossing}');
    const crossingDlg = r('{grow.crossingDialogue}');
    beats.push([crossing, crossingDlg].filter(Boolean).join(' '));
  }
  beats.push(r('{ge.reaction}'));
  const settle = r('{ge.settle}');
  const talia = r('{ge.taliaCameo}');
  beats.push([settle, talia].filter(Boolean).join('\n'));
  return beats.filter(b => b && b.trim());
}

export function renderGrowthScene(student, params = {}, opts = {}) {
  const ctx = growthCtx(student, params, opts);
  let base;
  if (ctx.globals.featureId === 'digest_stageup') {
    base = assembleDigestBeats(ctx, opts.trace || null).join('\n\n');
  } else {
    const magnitude = magnitudeFromGlobals(ctx.globals);
    base = assembleBeats(ctx, magnitude, opts.trace || null).join('\n\n');
  }
  return appendV2Depth(base, 'growth', ctx, opts.v2DepthChance ?? 0.35);
}

export function renderStageCrossingLine(student, { endStage, week = 1 } = {}) {
  const ctx = growthCtx(student, {
    endStage,
    startStage: Math.max(0, endStage - 1),
    stagesJumped: 1,
    week,
  });
  const base = render('{grow.crossing} {grow.crossingDialogue}', ctx);
  return appendV2Depth(base, 'growth', ctx, 0.38);
}

registerPool('ge.beat.test', [
  { when: {}, text: ['{ge.onset}'] },
]);
