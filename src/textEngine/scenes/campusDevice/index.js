// ═══════════════════════════════════════════════════════════════
// SCENE: CAMPUS DEVICE — public API (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import { getDeviceDependence, getDeviceDependenceTier } from '../../../gameData/deviceDependence.js';
import './fragments.js';
import '../../modules.js';
import './campusDeviceSceneDepth.js';

registerPool('campus.deviceEncounter', [
  { when: { targetType: 'student' }, text: [
    'You spot {subject.name} {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
    '{subject.name} is {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
    'On campus: {subject.name}, {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
  ] },
  { when: { targetType: 'npc' }, text: [
    '{subject.name} is {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
    'A target of opportunity: {subject.name}, {campus.dev.vulnerability}.',
    'Off-roster but reachable: {subject.name} {campus.dev.vulnerability}.',
  ] },
  { when: {}, text: [
    '{subject.name} is within device range.',
    'You have a clean line on {subject.name}.',
    '{subject.name} crosses the mesh without noticing.',
    '{subject.name} drifts through coverage — unaware, reachable.',
  ] },
]);

registerPool('campus.deviceResult', [
  { when: {}, text: [
    '{campus.dev.delivery} — {subject.name} {campus.dev.reaction}.',
    'On {subject.name}: {campus.dev.delivery}{join:campus.dev.reaction|prefix: — }.',
    '{campus.dev.delivery}; {subject.name} {campus.dev.reaction}.',
    'Deploy lands on {subject.name}: {campus.dev.delivery}{campus.dev.reaction|prefix: — }.',
  ] },
]);

registerPool('campus.device.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Foil warmth still under her shirt. The mesh reads extra yield.',
    'Galley seconds ride her walk. Portable gear likes a body already eating.',
  ] },
  { when: { leftoverFed: true, stageMin: 8 }, weight: 3, text: [
    'Kitchen heat already occupies the outline. The kit only confirms the acreage.',
    'Last night\'s tray still rounding at this scale. Deploy is a caption on a body that arrived.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen heat is already in her. The deploy just names it.',
    'Last night\'s tray still rounding. The field kit finds a willing outline.',
  ] },
  { when: { nightVisit: true, stageMin: 8 }, weight: 3, text: [
    'Quiet-hours knock still in a body this large. Daylight gear does not have to argue.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You were at her door after lights. Daylight gear works the same open body.',
    'Quiet-hours heat still in her posture. The device skips the persuasion.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Coverage has to go around her. It does. The kit logs the detour as yield.',
    'The mesh treats her as geography. She treats the pulse as another plate.',
  ] },
  { when: {}, text: [
    'The mesh keeps a quiet lock until she turns a corner.',
    'Coverage follows her like a second shadow and a plate.',
    'She does not know the kit is live. The kit already knows her shape.',
  ] },
]);

function weightBandFromLbs(lbs) {
  const stageId = lbs ? getStage(lbs).id : 3;
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) return band;
  }
  return 'lean';
}

function leftoverNightGlobals(target, explorationCtx) {
  const isStudent = target?.type === 'student' || target?.studentId != null;
  const leftoverFed = isStudent
    ? !!target?.leftoverFedThisWeek
    : !!(target?.leftoverFedThisWeek || explorationCtx?.leftoverKitchen);
  const nightVisit = isStudent
    ? !!(explorationCtx?.week && target?.lastNightVisitWeek === explorationCtx.week)
    : (explorationCtx?.nightIntimacy || 0) >= 12;
  return { leftoverFed, nightVisit };
}

function withDeviceLinger(base, ctx, alwaysWrap = true) {
  if (!base) return base;
  const leftover = !!(ctx.d?.leftoverFed || ctx.globals?.leftoverFed);
  const night = !!(ctx.d?.nightVisit || ctx.globals?.nightVisit);
  if (!alwaysWrap && !leftover && !night) return base;
  const linger = render('{campus.device.linger}', ctx)?.trim() || '';
  return linger ? `${base}\n\n${linger}` : base;
}

function encounterContext(target, nodeId, explorationCtx) {
  const ln = leftoverNightGlobals(target, explorationCtx);
  return createContext({
    subject: {
      name: target.name,
      archetype: target.archetype,
      lbs: target.lbs,
      id: target.studentId,
      leftoverFedThisWeek: !!target.leftoverFedThisWeek,
      lastNightVisitWeek: target.lastNightVisitWeek,
    },
    week: explorationCtx.week ?? 1,
    globals: {
      targetType: target.type,
      role: target.role || 'student',
      archetype: target.archetype,
      nodeId,
      weightBand: weightBandFromLbs(target.lbs),
      leftoverFed: ln.leftoverFed,
      nightVisit: ln.nightVisit,
    },
  });
}

function resultContext(encounter, deviceId, modeId, result, nodeId, student = null, week = 1, extras = {}) {
  const target = encounter?.target || {};
  const subj = student || {
    name: target.name,
    archetype: target.archetype,
    lbs: target.lbs,
    leftoverFedThisWeek: !!target.leftoverFedThisWeek,
    lastNightVisitWeek: target.lastNightVisitWeek,
    deviceDependence: {},
  };
  const depLevel = getDeviceDependence(subj, deviceId);
  const ln = leftoverNightGlobals({ ...target, leftoverFedThisWeek: subj.leftoverFedThisWeek, lastNightVisitWeek: subj.lastNightVisitWeek }, { week, leftoverKitchen: extras.leftoverKitchen, nightIntimacy: extras.nightIntimacy });
  return createContext({
    subject: subj,
    week: week ?? 1,
    globals: {
      deviceId,
      modeId: modeId || result.modeId || 'default',
      targetType: encounter.target.type,
      nodeId,
      discovered: !!result.discovered,
      npcGain: result.npcGain ?? null,
      deviceDependence: depLevel,
      deviceDependenceTier: getDeviceDependenceTier(depLevel).id,
      leftoverFed: ln.leftoverFed || !!extras.leftoverFed,
      nightVisit: ln.nightVisit || !!extras.nightVisit,
    },
  });
}

export function renderCampusDeviceEncounter(target, nodeId, explorationCtx, opts = {}) {
  const ctx = encounterContext(target, nodeId, explorationCtx);
  const base = render('{campus.deviceEncounter}', ctx, { trace: opts.trace || null });
  return appendV2Depth(withDeviceLinger(base, ctx, true), 'campusDevice', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderCampusDeviceResult(encounter, deviceId, modeId, result, nodeId, student = null, week = 1, extras = {}) {
  const ctx = resultContext(encounter, deviceId, modeId, result, nodeId, student, week, extras);
  const base = render('{campus.deviceResult}', ctx);
  return appendV2Depth(withDeviceLinger(base, ctx, true), 'campusDevice', ctx, 0.3);
}

export function renderCampusDeviceFlavor(flavorDevice, explorationCtx) {
  const ln = leftoverNightGlobals(null, explorationCtx);
  const ctx = createContext({
    week: explorationCtx.week ?? 1,
    globals: {
      flavorDevice,
      campusTier: explorationCtx.campusTier ?? 0,
      leftoverFed: ln.leftoverFed,
      nightVisit: ln.nightVisit,
    },
  });
  const base = render('{campus.deviceFlavor}', ctx);
  return appendV2Depth(withDeviceLinger(base, ctx, false), 'campusDevice', ctx, 0.25);
}
