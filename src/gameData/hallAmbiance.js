// ═══════════════════════════════════════════════════════════════
// HALL AMBIANCE — floor atmosphere ledger (new mechanic)
// Six meters rise from room development; thresholds grant perks + weekly beats.
// ═══════════════════════════════════════════════════════════════
import { HALL_ROOMS, countOwnedInRoom, roomDevelopmentTier } from './hallBlueprint.js';
import { SKILL_TREE } from './skills.js';
import { depthAmbiancePerkScalars, scaleDepthBonus } from './mechanicsDepthLayer.js';

export function depthAmbianceMeterCap(raw) {
  return Math.min(100, Math.round(raw * (1 + (scaleDepthBonus(1, 1.5) - 1) * 0.15)));
}

export const AMBIANCE_AXES = [
  { id: 'comfort', label: 'Comfort', roomId: 'common_lounge', color: '#88b8e8' },
  { id: 'appetite', label: 'Appetite', roomId: 'kitchen_pantry', color: '#e8a868' },
  { id: 'logistics', label: 'Logistics', roomId: 'ra_office', color: '#a8c8a0' },
  { id: 'socialHeat', label: 'Social Heat', roomId: 'social_salon', color: '#e888c8' },
  { id: 'intimacy', label: 'Intimacy', roomId: 'wellness_nook', color: '#b888e8' },
  { id: 'prestige', label: 'Prestige', roomId: 'grand_atrium', color: '#e8d888' },
];

const MAX_METER = 100;

function meterFromRoom(owned, roomId) {
  const tier = roomDevelopmentTier(owned, roomId);
  const count = countOwnedInRoom(owned, roomId);
  const base = tier * 22 + Math.min(12, count * 2);
  return depthAmbianceMeterCap(Math.min(MAX_METER, base));
}

export function computeHallAmbianceMeters(owned = {}) {
  const meters = {};
  AMBIANCE_AXES.forEach((axis) => {
    meters[axis.id] = meterFromRoom(owned, axis.roomId);
  });
  return meters;
}

/** Dominant axis id (tie → first in list). */
export function dominantAmbianceAxis(meters = {}) {
  let best = AMBIANCE_AXES[0].id;
  let val = meters[best] || 0;
  AMBIANCE_AXES.forEach((a) => {
    if ((meters[a.id] || 0) > val) {
      val = meters[a.id];
      best = a.id;
    }
  });
  return best;
}

/**
 * Mechanical perks from high ambiance — stacks with skill effects, not multiplicative on each other.
 */
export function computeHallAmbiancePerks(owned = {}) {
  const m = computeHallAmbianceMeters(owned);
  const perks = {
    talkRelBonus: 0,
    passiveBonus: 0,
    gainMult: 0,
    scrutinyPassiveReduce: 0,
    sessionCapBonus: 0,
  };
  if (m.comfort >= 55) perks.passiveBonus += 1;
  if (m.appetite >= 55) perks.gainMult += 0.04;
  if (m.logistics >= 50) perks.scrutinyPassiveReduce += 0.03;
  if (m.socialHeat >= 55) perks.talkRelBonus += 2;
  if (m.intimacy >= 60) perks.sessionCapBonus += 8;
  if (m.prestige >= 45) perks.gainMult += 0.03;
  if (m.comfort >= 80 && m.appetite >= 80) perks.gainMult += 0.03;
  return depthAmbiancePerkScalars(perks);
}

export function createInitialHallAmbianceState() {
  return { lastPulseWeek: 0, pulseCount: 0 };
}

/**
 * Once per week when any meter ≥ 40, return a pulse descriptor for UI + optional lbs drip.
 */
export function rollWeeklyAmbiancePulse(owned = {}, week = 1, state = {}) {
  if (state.lastPulseWeek === week) return null;
  const meters = computeHallAmbianceMeters(owned);
  const peak = Math.max(...AMBIANCE_AXES.map((a) => meters[a.id] || 0));
  if (peak < 40) return null;
  const axis = dominantAmbianceAxis(meters);
  const axisMeta = AMBIANCE_AXES.find((a) => a.id === axis);
  const passiveDrip = peak >= 70 ? Math.max(1, Math.round(scaleDepthBonus(1))) : 0;
  return {
    week,
    axis,
    axisLabel: axisMeta?.label || axis,
    peak,
    passiveDrip,
    nextState: {
      ...state,
      lastPulseWeek: week,
      pulseCount: (state.pulseCount || 0) + 1,
    },
  };
}

export function ambianceSummaryLine(owned = {}) {
  const m = computeHallAmbianceMeters(owned);
  const dom = dominantAmbianceAxis(m);
  const label = AMBIANCE_AXES.find((a) => a.id === dom)?.label || 'Floor';
  const val = m[dom] || 0;
  if (val < 25) return 'The floor still feels like default housing — potential waiting on your blueprint.';
  if (val < 55) return `${label} ambiance is rising — residents linger longer in the halls.`;
  if (val < 80) return `${label} owns the atmosphere now — appetite and habit follow the air.`;
  return `${label} saturates every corridor — the building breathes with your residents.`;
}

export function totalHallUpgradeCount(owned = {}) {
  return SKILL_TREE.reduce((n, sk) => n + (owned[sk.id] ? 1 : 0), 0);
}
