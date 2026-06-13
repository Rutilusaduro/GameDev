// ═══════════════════════════════════════════════════════════════
// DEVICE DEPENDENCE — per-slot addiction, bonuses, withdrawal
// Engine-free. Mirrors psychState tier ladders.
// ═══════════════════════════════════════════════════════════════
import { getDependenceTier as psychDependenceTier } from './psychState.js';
import { applyPsychDelta } from './psychState.js';
import { adjustHunger } from './hungerAddiction.js';
import { getDevice } from './devices.js';

export const DEPENDENCE_TIERS = [
  { id: 0, min: 0, label: 'Low', color: '#7a8a9a' },
  { id: 1, min: 25, label: 'Attached', color: '#c8860a' },
  { id: 2, min: 50, label: 'Needy', color: '#c05030' },
  { id: 3, min: 75, label: 'Hooked', color: '#a02050' },
];

export function getDependenceLevel(student, slotOrDefId) {
  return student?.deviceState?.dependence?.[slotOrDefId] ?? 0;
}

export function getDependenceTier(level) {
  return psychDependenceTier(level ?? 0);
}

function mergeDependence(student, slot, delta) {
  const prev = student?.deviceState?.dependence?.[slot] ?? 0;
  const next = Math.min(100, Math.max(0, prev + delta));
  return {
    ...student,
    deviceState: {
      ...(student.deviceState || {}),
      dependence: {
        ...(student.deviceState?.dependence || {}),
        [slot]: next,
      },
    },
  };
}

/** Raise dependence after weekly tick or manual use. */
export function tickDependence(student, slot, intensity = 1, def = null) {
  const deviceDef = def || getDevice(student?.equip?.[slot]?.defId);
  const strength = deviceDef?.effectStrength ?? 0.5;
  const psychBoost = 1 + ((student?.psych?.dependence ?? 0) / 200);
  const delta = Math.max(1, Math.round(strength * 10 * intensity * psychBoost));
  return mergeDependence(student, slot, delta);
}

/** Scale effect spec gain/psych by dependence level. */
export function applyDependenceBonuses(effectSpec, level) {
  if (!effectSpec || level < 20) return effectSpec;
  const mult = 1 + level / 150;
  const next = { ...effectSpec };
  if (next.gainLbs) {
    next.gainLbs = [
      Math.round((next.gainLbs[0] || 0) * mult),
      Math.round((next.gainLbs[1] || 0) * mult),
    ];
  }
  if (next.psychDelta) {
    const scaled = {};
    for (const [k, v] of Object.entries(next.psychDelta)) {
      scaled[k] = Math.round(v * mult);
    }
    next.psychDelta = scaled;
  }
  return next;
}

/** Malfunction severity multiplier at high dependence. */
export function dependenceMalfunctionScale(level) {
  if (level < 50) return 1;
  if (level < 75) return 1.25;
  return 1.5;
}

/** Temporary penalties when unequipping a high-dependence device. */
export function applyWithdrawal(student, slot, defId = null) {
  const level = getDependenceLevel(student, slot);
  if (level < 30) {
    return { student, withdrawal: false };
  }
  let next = { ...student };
  const shameDelta = Math.round(level / 15);
  const dependenceDelta = Math.round(level / 20);
  next.psych = applyPsychDelta(next.psych || {}, {
    shame: shameDelta,
    dependence: dependenceDelta,
    obsession: level >= 60 ? 3 : 0,
  });
  if (level >= 50) {
    next = adjustHunger(next, 1);
  }
  const deviceState = { ...(next.deviceState || {}) };
  const dependence = { ...(deviceState.dependence || {}) };
  delete dependence[slot];
  next = {
    ...next,
    deviceState: {
      ...deviceState,
      dependence,
      withdrawalCrash: {
        slot,
        defId: defId || student?.equip?.[slot]?.defId,
        level,
        expiresWeek: null,
      },
    },
  };
  return { student: next, withdrawal: true, level };
}
