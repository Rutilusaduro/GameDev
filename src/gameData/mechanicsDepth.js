// ═══════════════════════════════════════════════════════════════
// MECHANICS DEPTH LAYER — ~50% richer knobs on core loops (Pass: overhaul)
// Pure functions; wired from HallPass + feedingSession + floor actions.
// ═══════════════════════════════════════════════════════════════
import { GAIN_CONFIG } from './gainSystem.js';
import { getHungerTier } from './hungerAddiction.js';
import { getCorruptionTier } from './corruption.js';
import { getStage } from './stages.js';

/** Extra session paces beyond the base three. */
export const EXTENDED_SESSION_PACES = [
  { id: 'indulgent', label: 'Indulgent drift', refusalBonus: -0.1, tapOutMult: 0.7, calMult: 1.06, desc: 'She floats into yes; calories linger.' },
  { id: 'command', label: 'Quiet command', refusalBonus: 0.08, tapOutMult: 1.15, calMult: 1.12, desc: 'Your voice steers; refusal is performance.' },
];

export function getExtendedPace(id) {
  return EXTENDED_SESSION_PACES.find((p) => p.id === id) || null;
}

/** Hall-wide feed action cal multiplier from blueprint + week rhythm. */
export function hallActionCalMultiplier({ hallCalMult = 0, week = 1, famineWeek = false } = {}) {
  let mult = 1 + (hallCalMult || 0);
  if (week % 4 === 0) mult *= 1.05;
  if (famineWeek) mult *= 0.92;
  return mult;
}

/** Deeper force-feed context stack. */
export function depthForceFeedAdjustments(student, { blueprintForceBonus = 0, paceRefusalBonus = 0 } = {}) {
  const hunger = getHungerTier(student);
  const cor = getCorruptionTier(student?.corruption || 0).id;
  const stage = getStage(student?.lbs || 130).id;
  let bonus = blueprintForceBonus + (paceRefusalBonus || 0);
  if (hunger.id >= 2) bonus += 0.06;
  if (cor >= 2) bonus += 0.05;
  if (stage >= 6) bonus += 0.04;
  if ((student?.fullness || 0) > (student?.stomachCapacity || GAIN_CONFIG.baseCapacity) * 0.85) bonus += 0.03;
  return { refusalBonus: bonus };
}

/** Weekly digest bonus when Atmosphere Weave pulsed + synergies. */
export function depthDigestMultiplier(student, { weavePulse = false, synergyDigestMult = 0 } = {}) {
  let mult = 1 + (synergyDigestMult || 0);
  if (weavePulse) mult += 0.08;
  const cap = student?.stomachCapacity || GAIN_CONFIG.baseCapacity;
  if ((student?.fullness || 0) > cap) mult += 0.04;
  return mult;
}

/** Floor check-in choice gain scaling — rewards hall investment. */
export function depthFloorChoiceGainMult({ loungeGainMult = 0, relBonus = 0 } = {}) {
  return {
    gainMult: 1 + (loungeGainMult || 0),
    extraRel: relBonus || 0,
  };
}

/** Talk relationship bonus from blueprint synergies. */
export function depthTalkRelBonus(baseRel, { relTalkBonus = 0 } = {}) {
  return baseRel + (relTalkBonus || 0);
}
