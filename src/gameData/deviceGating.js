// ═══════════════════════════════════════════════════════════════
// DEVICE GATING — corruption permission axis + addiction compliance
// Tier 0: gentle/worn only · Tier 1: rigs & force-feed · Tier 2: extreme
// ═══════════════════════════════════════════════════════════════
import { getCorruptionTier } from './corruption.js';
import { getAddictionLevel } from './hungerAddiction.js';

/** Minimum corruption tier (0–2) before a student accepts equipping/using a device. */
export const DEVICE_CORRUPTION_GATES = {
  feeding_mask: 1,
  auto_feeder_arm: 0,
  obedience_belt: 0,
  auto_bloating_belt: 0,
  living_furniture_rig: 1,
  reinforced_legs: 0,
  growth_accelerator_chamber: 2,
  growth_serum_injector: 2,
  endless_hunger_engine: 2,
};

/** Intensity multiplier applied to device psych/gain effects by corruption tier. */
const CORRUPTION_INTENSITY = { 0: 0.72, 1: 1.0, 2: 1.18 };

export function getDeviceCorruptionGate(deviceDefId) {
  return DEVICE_CORRUPTION_GATES[deviceDefId] ?? 0;
}

export function canStudentAcceptDevice(student, deviceDefId) {
  const gate = getDeviceCorruptionGate(deviceDefId);
  const tier = getCorruptionTier(student?.corruption ?? 0).id;
  return tier >= gate;
}

export function deviceAcceptanceBlockReason(student, deviceDefId) {
  if (canStudentAcceptDevice(student, deviceDefId)) return null;
  const gate = getDeviceCorruptionGate(deviceDefId);
  const labels = ['Hesitant', 'Conflicted', 'Broken In'];
  return `${student?.name || 'She'} isn't ready for that rig yet — needs ${labels[gate] || 'higher'} corruption.`;
}

export function getDeviceIntensityMult(student) {
  const tier = getCorruptionTier(student?.corruption ?? 0).id;
  const base = CORRUPTION_INTENSITY[tier] ?? 1;
  const addiction = getAddictionLevel(student);
  const addictionMult = addiction >= 2 ? 1 + (addiction - 1) * 0.05 : 1;
  return base * addictionMult;
}

/** Addiction makes stuffed girls more compliant (lowers refusal) but is wired separately in feed. */
export function getForceFeedComplianceBonus(student) {
  const addiction = getAddictionLevel(student);
  if (addiction < 2) return 0;
  return Math.min(0.22, (addiction - 1) * 0.06);
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
