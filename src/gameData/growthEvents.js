// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT ORCHESTRATION — engine-free
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';
import { getDevice, getGrowthProfile, MARQUEE_GROWTH_DEVICE_IDS } from './devices.js';
import { getEquippedDeviceIds } from './deviceEquip.js';
import { getDependenceTier } from './psychState.js';
import { renderGrowthScene } from '../textEngine/scenes/growthEvent/index.js';

const ZONE_POOL = ['belly', 'hips', 'thighs', 'ass', 'chest', 'full', 'lower_body'];

export function resolveGrowthZone(profile, zoneOverride = null, bodyType = null) {
  if (zoneOverride && zoneOverride !== 'random') return zoneOverride;
  const bias = profile?.zoneBias || 'bodyType';
  if (bias === 'bodyType') {
    const map = {
      pear: 'hips',
      apple: 'belly',
      hourglass: 'hips',
      athletic: 'thighs',
      topHeavy: 'chest',
      rotund: 'belly',
      voluptuous: 'chest',
      mom_bod: 'belly',
      fertility_goddess: 'hips',
    };
    return map[bodyType] || 'belly';
  }
  if (bias === 'lower_body') return 'hips';
  if (bias === 'full') return 'full';
  return bias;
}

export function isMajorGrowth(cause, gainLbs, stagesJumped) {
  const type = cause?.type;
  if (type === 'device_use' && cause.deviceId && MARQUEE_GROWTH_DEVICE_IDS.includes(cause.deviceId)) {
    return true;
  }
  if (type === 'device_malfunction') {
    return gainLbs >= 8;
  }
  if (type === 'weekly_tick' || type === 'digest_stageup') {
    return stagesJumped >= 1 && gainLbs >= 8;
  }
  if (type === 'feature') {
    return gainLbs >= 8 || stagesJumped >= 1;
  }
  return false;
}

function magnitudeTier(stagesJumped, cause) {
  if (stagesJumped >= 2) return 'dramatic';
  if (cause?.malfunctionTier === 'critical') return 'dramatic';
  if (cause?.deviceId && MARQUEE_GROWTH_DEVICE_IDS.includes(cause.deviceId)) return 'dramatic';
  if (stagesJumped >= 1 || cause?.malfunctionTier === 'major' || cause?.malfunctionTier === 'moderate') {
    return 'significant';
  }
  return 'notable';
}

function outfitHintFor(student, cause) {
  if (cause?.outfitHint) return cause.outfitHint;
  return student?.archetype || 'default';
}

function deviceDependenceTier(student) {
  const dep = student?.psych?.dependence ?? 0;
  const equipped = getEquippedDeviceIds(student).length;
  const score = dep + equipped * 8;
  return getDependenceTier(score).id;
}

export function buildGrowthEvent(student, params = {}) {
  const {
    cause = {},
    preLbs = student?.lbs ?? 130,
    gainLbs = 0,
    week = 1,
    malfunction = null,
    isPermanent = false,
    pantsFactor = 0,
  } = params;

  const startStage = getStage(preLbs).id;
  const endStage = getStage(student?.lbs ?? preLbs).id;
  const stagesJumped = Math.max(0, endStage - startStage);

  if (!isMajorGrowth(cause, gainLbs, stagesJumped)) return null;

  const deviceId = cause.deviceId || null;
  const def = deviceId ? getDevice(deviceId) : null;
  const profile = deviceId ? getGrowthProfile(deviceId) : getGrowthProfile(null);
  const growthZone = resolveGrowthZone(profile, cause.zoneOverride || malfunction?.effect?.zoneOverride, student?.bodyType);

  const prose = renderGrowthScene(student, {
    causeType: cause.type,
    deviceId,
    featureId: cause.featureId || null,
    gainLbs,
    startStage,
    endStage,
    stagesJumped,
    growthZone,
    growthMethod: profile.growthMethod,
    growthIntensity: profile.growthIntensity,
    sensation: profile.sensation,
    malfunctionTier: malfunction?.tier || cause.malfunctionTier || null,
    isMalfunction: !!(malfunction || cause.type === 'device_malfunction'),
    isPermanent: isPermanent || !!student?.limitRemoved,
    locale: cause.locale || 'campus',
    outfitHint: outfitHintFor(student, cause),
    pantsFactor,
    week,
  });

  return {
    kind: 'growth_scene',
    studentId: student.id,
    studentName: student.name,
    deviceId,
    deviceIcon: def?.icon || '🌊',
    deviceLabel: def?.label || (cause.featureId ? 'Growth event' : 'Body change'),
    causeType: cause.type,
    featureId: cause.featureId || null,
    gainLbs,
    startStage,
    endStage,
    stagesJumped,
    malfunction,
    prose,
    magnitude: magnitudeTier(stagesJumped, { ...cause, malfunctionTier: malfunction?.tier }),
  };
}

export function buildGrowthEventFromGain(student, preLbs, gainLbs, cause, opts = {}) {
  return buildGrowthEvent(student, { cause, preLbs, gainLbs, ...opts });
}
