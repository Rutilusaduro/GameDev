// ═══════════════════════════════════════════════════════════════
// PER-DEVICE DEPENDENCE — how hooked a resident is on a specific rig
// Map: deviceId → 0–100. Distinct from global psych.dependence.
// DEPTH_PLAN §2d — wired into refusal, withdrawal, malfunctions.
// ═══════════════════════════════════════════════════════════════
import { PSYCH_TIERS } from './psychState.js';
import { adjustHunger } from './hungerAddiction.js';

const WEEKLY_WEAR_GAIN = 3;
const EQUIP_GAIN = 5;
const CAMPUS_USE_GAIN = 4;

function tierFor(val) {
  return [...PSYCH_TIERS].reverse().find(t => (val ?? 0) >= t.min) || PSYCH_TIERS[0];
}

export function initDeviceDependence() {
  return {};
}

export function getDeviceDependence(student, deviceId) {
  if (!deviceId) return 0;
  return student?.deviceDependence?.[deviceId] ?? 0;
}

export function getDeviceDependenceTier(level) {
  return tierFor(level ?? 0);
}

export function applyDeviceDependenceDelta(student, deviceId, delta) {
  if (!deviceId || !delta) return student;
  const map = { ...(student.deviceDependence || {}) };
  map[deviceId] = Math.min(100, Math.max(0, (map[deviceId] ?? 0) + delta));
  return { ...student, deviceDependence: map };
}

export function bumpWeeklyDeviceDependence(student, deviceId, def = null) {
  let gain = WEEKLY_WEAR_GAIN;
  if (def?.weeklyEffect?.psychDelta?.dependence) gain += 1;
  return applyDeviceDependenceDelta(student, deviceId, gain);
}

export function bumpEquipDeviceDependence(student, deviceId) {
  return applyDeviceDependenceDelta(student, deviceId, EQUIP_GAIN);
}

export function bumpCampusDeviceDependence(student, deviceId) {
  return applyDeviceDependenceDelta(student, deviceId, CAMPUS_USE_GAIN);
}

export function deviceDependenceLabel(student, deviceId) {
  const level = getDeviceDependence(student, deviceId);
  if (level <= 0) return null;
  const tier = getDeviceDependenceTier(level);
  return { level, tier: tier.id, label: tier.label, color: tier.color };
}

/** Resolve dependence level for an equip slot (or slot name fallback). */
export function getDependenceLevel(student, slotOrDeviceId) {
  if (!student) return 0;
  const equip = student.equip || {};
  const entry = equip[slotOrDeviceId];
  const deviceId = entry?.defId || slotOrDeviceId;
  if (!deviceId || !equip[slotOrDeviceId] && !student.deviceDependence?.[deviceId]) {
    const fromSlot = Object.values(equip).find(e => e?.defId);
    if (fromSlot?.defId && slotOrDeviceId === fromSlot.defId) {
      return getDeviceDependence(student, fromSlot.defId);
    }
  }
  return getDeviceDependence(student, deviceId);
}

/** Hooked residents comply more readily when pushed past capacity. */
export function getDependenceRefusalBonus(student, deviceId = null) {
  let level = 0;
  if (deviceId) {
    level = getDeviceDependence(student, deviceId);
  } else if (student?.equip) {
    level = Math.max(0, ...Object.values(student.equip).filter(Boolean).map(e => getDeviceDependence(student, e.defId)));
  }
  if (level >= 70) return 0.10;
  if (level >= 45) return 0.06;
  if (level >= 25) return 0.03;
  return 0;
}

export function applyDependenceBonuses(effectSpec, dependenceLevel = 0) {
  if (!effectSpec || dependenceLevel < 25) return effectSpec;
  const mult = dependenceLevel >= 70 ? 1.25 : dependenceLevel >= 45 ? 1.15 : 1.08;
  const next = { ...effectSpec };
  if (next.gainLbs) {
    next.gainLbs = [
      Math.max(1, Math.round((next.gainLbs[0] || 0) * mult)),
      Math.max(1, Math.round((next.gainLbs[1] || 0) * mult)),
    ];
  }
  if (next.psychDelta?.dependence) {
    next.psychDelta = {
      ...next.psychDelta,
      dependence: Math.round(next.psychDelta.dependence * mult),
    };
  }
  return next;
}

export function dependenceMalfunctionScale(dependenceLevel = 0) {
  if (dependenceLevel >= 70) return 1.35;
  if (dependenceLevel >= 45) return 1.18;
  if (dependenceLevel >= 25) return 1.08;
  return 1;
}

export function tickDependence(student, slot, delta = 1, def = null) {
  const entry = student?.equip?.[slot];
  const deviceId = entry?.defId || def?.id;
  if (!deviceId) return student;
  return applyDeviceDependenceDelta(student, deviceId, delta);
}

/** Unequip withdrawal — hunger spike and dependence taper for hooked girls. */
export function applyWithdrawal(student, slot, deviceId) {
  const level = getDeviceDependence(student, deviceId);
  if (level < 20) {
    return { student: applyDeviceDependenceDelta(student, deviceId, -2) };
  }
  let next = applyDeviceDependenceDelta(student, deviceId, -Math.min(8, Math.round(level * 0.08)));
  if (level >= 40) next = adjustHunger(next, 1);
  if (level >= 60) next = { ...next, mood: 'stressed' };
  return { student: next };
}
