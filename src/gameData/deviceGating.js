// ═══════════════════════════════════════════════════════════════
// DEVICE GATING — corruption permission axis + addiction compliance
// DEPTH_PLAN §1: Tier 0 gentle/worn · Tier 1 rigs & force-feed · Tier 2 extreme
// ═══════════════════════════════════════════════════════════════
import { getCorruptionTier, CORRUPTION_CONFIG } from './corruption.js';
import { getAddictionLevel } from './hungerAddiction.js';
import { getDependenceRefusalBonus } from './deviceDependence.js';

/**
 * Minimum corruption tier (0–2) before a student accepts equipping or running a device.
 * Tier 0: worn belts/support · Tier 1: masks, arms, furniture rigs · Tier 2: growth/campus extreme
 */
export const DEVICE_CORRUPTION_GATES = {
  obedience_belt: 0,
  auto_bloating_belt: 0,
  reinforced_legs: 0,
  feeding_mask: 1,
  auto_feeder_arm: 1,
  living_furniture_rig: 1,
  growth_accelerator_chamber: 2,
  growth_serum_injector: 2,
  endless_hunger_engine: 2,
};

/** Intensity multiplier applied to device psych/gain effects by corruption tier. */
const CORRUPTION_INTENSITY = { 0: 0.72, 1: 1.0, 2: 1.18 };

const GATE_LABELS = ['Hesitant', 'Conflicted', 'Broken In'];

export function getDeviceCorruptionGate(deviceDefId) {
  return DEVICE_CORRUPTION_GATES[deviceDefId] ?? 0;
}

export function canStudentAcceptDevice(student, deviceDefId) {
  const gate = getDeviceCorruptionGate(deviceDefId);
  const tier = getCorruptionTier(student?.corruption ?? 0).id;
  return tier >= gate;
}

/** Alias — same permission check for equip and active use. */
export function canStudentUseDevice(student, deviceDefId) {
  return canStudentAcceptDevice(student, deviceDefId);
}

export function deviceAcceptanceBlockReason(student, deviceDefId) {
  if (canStudentAcceptDevice(student, deviceDefId)) return null;
  const gate = getDeviceCorruptionGate(deviceDefId);
  return `${student?.name || 'She'} isn't ready for that rig yet — needs ${GATE_LABELS[gate] || 'higher'} corruption.`;
}

export function getDeviceIntensityMult(student) {
  const tier = getCorruptionTier(student?.corruption ?? 0).id;
  const base = CORRUPTION_INTENSITY[tier] ?? 1;
  const addiction = getAddictionLevel(student);
  const addictionMult = addiction >= 2 ? 1 + (addiction - 1) * 0.05 : 1;
  return base * addictionMult;
}

/** Continuous corruption → easier force-feed past capacity (resistance axis). */
export function getCorruptionForceFeedBonus(student) {
  return Math.min(0.30, (student?.corruption ?? 0) * CORRUPTION_CONFIG.resistancePerPoint);
}

/**
 * Addiction compliance — stuffed girls push through more often (§1 risk/reward upside).
 * Paired with higher interrupt frequency from addiction in hungerAddiction.js.
 */
export function getForceFeedComplianceBonus(student) {
  const addiction = getAddictionLevel(student);
  if (addiction < 2) return 0;
  return Math.min(0.24, (addiction - 1) * 0.07);
}

/** All force-feed chance bonuses for feedStudentCalories. */
export function getForceFeedChanceBonuses(student) {
  return {
    corruptionBonus: getCorruptionForceFeedBonus(student),
    complianceBonus: getForceFeedComplianceBonus(student),
    dependenceBonus: getDependenceRefusalBonus(student),
    intensityMult: getDeviceIntensityMult(student),
  };
}

export function scalePsychDeltaForStudent(student, psychDelta) {
  if (!psychDelta) return psychDelta;
  const mult = getDeviceIntensityMult(student);
  if (mult === 1) return psychDelta;
  const scaled = {};
  for (const [k, v] of Object.entries(psychDelta)) {
    scaled[k] = typeof v === 'number' ? Math.round(v * mult) : v;
  }
  return scaled;
}

export function scaleGainRangeForStudent(student, range) {
  if (!Array.isArray(range) || range.length < 2) return range;
  const mult = getDeviceIntensityMult(student);
  return [Math.round(range[0] * mult), Math.round(range[1] * mult)];
}
