// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE WEEKLY TICK — public API
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import { getEquippedDeviceIds } from '../../../gameData/deviceEquip.js';
import { getDeviceDependence, getDeviceDependenceTier } from '../../../gameData/deviceDependence.js';
import { resolveGrowthZone, SUDDEN_GROWTH_LBS_MIN } from '../../growthLexicon.js';
import '../../growthLexicon.js';
import './fragments.js';
import '../../modules.js';
import './deviceTickSceneDepth.js';

registerPool('device.tick.beat', [
  { when: { isMalfunction: true, gainLbsMin: SUDDEN_GROWTH_LBS_MIN }, text: [
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }{join:device.tick.malfClause|prefix: — }; {grow.sudden}',
    '⚠️ {device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }{join:device.tick.malfClause|prefix: — }; {grow.sudden}',
  ] },
  { when: { isMalfunction: true }, text: [
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }{join:device.tick.malfClause|prefix: — }; {device.tick.growth}{join:device.tick.sensation|prefix: — }.',
  ] },
  { when: { gainLbsMin: SUDDEN_GROWTH_LBS_MIN }, text: [
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {grow.sudden}{join:device.tick.synergy|prefix: }.',
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {grow.sudden}',
  ] },
  { when: {}, text: [
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {device.tick.growth}{join:device.tick.sensation|prefix: — }{join:device.tick.synergy|prefix: }.',
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {device.tick.growth}{join:device.tick.gainTag|prefix: }.',
  ] },
]);

function weightBandFromLbs(lbs) {
  const stageId = getStage(lbs ?? 130).id;
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) return band;
  }
  return 'lean';
}

function primaryAttachment(attachmentIds = []) {
  return attachmentIds[0] || null;
}

function tickGrowthZone(deviceId, student) {
  const profile = getDevice(deviceId)?.growthProfile;
  if (profile?.zoneBias === 'lower_body') return 'lower_body';
  const bodyType = student?.bodyOverride?.bodyTypeOverride || student?.bodyType;
  return resolveGrowthZone(profile, null, bodyType);
}

export function renderDeviceTickLine({
  student,
  deviceId,
  deviceLabel,
  slot,
  gainLbs = 0,
  malfunctionTier = null,
  attachmentIds = [],
  isMalfunction = false,
  week = 1,
  modificationState = [],
  dependenceLevel = 0,
  dependenceTier = 0,
  trace = null,
}) {
  const equipped = getEquippedDeviceIds(student);
  const comfort = student?.deviceState?.furnitureComfort ?? 100;
  const depLevel = getDeviceDependence(student, deviceId);
  const depTier = getDeviceDependenceTier(depLevel).id;
  const ctx = createContext({
    subject: student,
    week,
    globals: {
      deviceId,
      deviceLabel,
      slot,
      gainLbs,
      gainLbsMin: gainLbs,
      malfunctionTier,
      isMalfunction,
      hasAttachment: primaryAttachment(attachmentIds),
      attachmentIds,
      modificationState,
      dependenceLevel,
      dependenceTier,
      weightBand: weightBandFromLbs(student?.lbs),
      bodyState: student?.bodyOverride?.stateType || null,
      equippedCountMin: equipped.length >= 3 ? equipped.length : 0,
      equippedWaist: student?.equip?.waist?.defId || null,
      equippedHead: student?.equip?.head?.defId || null,
      furnitureComfortLow: deviceId === 'living_furniture_rig' && comfort < 40,
      deviceDependence: depLevel,
      deviceDependenceTier: depTier,
      growthZone: resolveGrowthZone(student),
    },
  });
  const base = render('{device.tick.beat}', ctx, { trace });
  return appendV2Depth(base, 'device', ctx, 0.3);
}
