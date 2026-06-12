// ═══════════════════════════════════════════════════════════════
// SCENE: CAMPUS DEVICE — public API (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import './fragments.js';
import '../../modules.js';

registerPool('campus.deviceEncounter', [
  { when: { targetType: 'student' }, text: [
    'You spot {subject.name} {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
    '{subject.name} is {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
  ] },
  { when: { targetType: 'npc' }, text: [
    '{subject.name} is {campus.dev.vulnerability}{join:campus.dev.rangeNote|prefix: — }.',
    'A target of opportunity: {subject.name}, {campus.dev.vulnerability}.',
  ] },
  { when: {}, text: [
    '{subject.name} is within device range.',
    'You have a clean line on {subject.name}.',
    '{subject.name} crosses the mesh without noticing.',
  ] },
]);

registerPool('campus.deviceResult', [
  { when: {}, text: [
    '{campus.dev.delivery} — {subject.name} {campus.dev.reaction}.',
    'On {subject.name}: {campus.dev.delivery}{join:campus.dev.reaction|prefix: — }.',
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

function encounterContext(target, nodeId, explorationCtx) {
  return createContext({
    subject: { name: target.name, archetype: target.archetype, lbs: target.lbs, id: target.studentId },
    week: explorationCtx.week ?? 1,
    globals: {
      targetType: target.type,
      role: target.role || 'student',
      archetype: target.archetype,
      nodeId,
      weightBand: weightBandFromLbs(target.lbs),
    },
  });
}

function resultContext(encounter, deviceId, modeId, result, nodeId) {
  return createContext({
    subject: { name: encounter.target.name, archetype: encounter.target.archetype, lbs: encounter.target.lbs },
    week: 1,
    globals: {
      deviceId,
      modeId: modeId || result.modeId || 'default',
      targetType: encounter.target.type,
      nodeId,
      discovered: !!result.discovered,
      npcGain: result.npcGain ?? null,
    },
  });
}

export function renderCampusDeviceEncounter(target, nodeId, explorationCtx) {
  return render('{campus.deviceEncounter}', encounterContext(target, nodeId, explorationCtx));
}

export function renderCampusDeviceResult(encounter, deviceId, modeId, result, nodeId) {
  return render('{campus.deviceResult}', resultContext(encounter, deviceId, modeId, result, nodeId));
}

export function renderCampusDeviceFlavor(flavorDevice, explorationCtx) {
  const ctx = createContext({
    week: explorationCtx.week ?? 1,
    globals: { flavorDevice, campusTier: explorationCtx.campusTier ?? 0 },
  });
  return render('{campus.deviceFlavor}', ctx);
}
