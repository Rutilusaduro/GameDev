// ═══════════════════════════════════════════════════════════════
// PER-DEVICE DEPENDENCE — how hooked a girl is on a specific rig
// Map: deviceId → 0–100. Distinct from global psych.dependence.
// ═══════════════════════════════════════════════════════════════
import { PSYCH_TIERS } from './psychState.js';

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

/** Slot-based dependence (deviceEffects compatibility). */
export function getDependenceLevel(student, slot) {
  const defId = student?.equip?.[slot]?.defId;
  if (!defId) return 0;
  return getDeviceDependence(student, defId);
}

export function getDependenceTier(level) {
  return getDeviceDependenceTier(level);
}

/** Addiction-style compliance bonus from device dependence (lowers refusal). */
export function dependenceRefusalBonus(student, deviceId) {
  const level = getDeviceDependence(student, deviceId);
  return Math.min(0.2, level * 0.002);
}

export function dependenceWithdrawalRisk(student, deviceId) {
  const level = getDeviceDependence(student, deviceId);
  if (level < 40) return 0;
  return Math.min(0.35, (level - 40) * 0.004);
}
