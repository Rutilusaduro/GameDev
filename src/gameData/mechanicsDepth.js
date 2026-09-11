// ═══════════════════════════════════════════════════════════════
// MECHANICS DEPTH LAYER — ~50% richer knobs on core loops (Pass: overhaul)
// Pure functions; wired from HallPass + feedingSession + floor actions.
// ═══════════════════════════════════════════════════════════════
import { GAIN_CONFIG } from './gainSystem.js';
import { getHungerTier } from './hungerAddiction.js';
import { getCorruptionTier } from './corruption.js';
import { getStage } from './stages.js';
import { getActiveBlueprintSynergies, skillsForRoom } from './hallBlueprint.js';

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
export function depthTalkRelBonus(baseRel, { relTalkBonus = 0, skillRelBonus = 0 } = {}) {
  return baseRel + (relTalkBonus || 0) + (skillRelBonus || 0);
}

/** Opposition / scrutiny ease from blueprint institutional pressure. */
export function oppositionScrutinyEaseFromHall(ownedHallSkills = {}) {
  const syn = getActiveBlueprintSynergies(ownedHallSkills).length;
  const hasCover = !!ownedHallSkills?.institutional_cover || !!ownedHallSkills?.deep_cover;
  return Math.min(0.14, syn * 0.025 + (hasCover ? 0.04 : 0));
}

/** Counter attempt bonus when hall has social + crown synergy active. */
export function oppositionCounterRelBonus(ownedHallSkills = {}) {
  const syn = getActiveBlueprintSynergies(ownedHallSkills);
  const hasLegend = syn.some((s) => s.id === 'legendary_flow');
  return hasLegend ? 2 : syn.length >= 2 ? 1 : 0;
}

/** RA skill tree → feed session modifiers (reach / conversion path). */
export function depthSkillFeedModifiers(skillFx = {}) {
  const refusalBonus = (skillFx.forceFeedBonus || 0)
    + ((skillFx.extremeBonus || 0) * 0.45)
    + (skillFx.breakResistance ? 0.04 : 0);
  const calorieMult = 1
    + (skillFx.calorieBonus || 0)
    + (skillFx.conversionBonus || 0)
    + (skillFx.extremeBonus || 0) * 0.04;
  return { refusalBonus, calorieMult };
}

/** Device weekly gain scaling from lab stage + hall weave investment. */
export function depthDeviceGainMult({ labStage = 1, hallSynergyCount = 0, skillFx = {} } = {}) {
  let mult = 1;
  if ((labStage ?? 1) >= 2) mult += 0.05;
  if ((labStage ?? 1) >= 3) mult += 0.05;
  mult += Math.min(0.12, (hallSynergyCount || 0) * 0.025);
  if (skillFx.gluttonsInstinct) mult += 0.04;
  return mult;
}

export function scaleDeviceGainRange(gainRange, mult = 1) {
  if (!gainRange || mult === 1) return gainRange;
  return [
    Math.max(0, Math.round((gainRange[0] || 0) * mult)),
    Math.max(0, Math.round((gainRange[1] || 0) * mult)),
  ];
}

/** Campus saturation passive lbs bonus from hall prestige synergies. */
export function depthSaturationPassiveBonus(tierPassive, ownedHallSkills = {}) {
  const synCount = getActiveBlueprintSynergies(ownedHallSkills).length;
  return (tierPassive || 0) + (synCount >= 3 ? 1 : synCount >= 1 ? 0.5 : 0);
}

/** Hall blueprint → Craving Resonance pulse / passive / surge. */
export function depthResonanceHallMods(ownedHallSkills = {}) {
  const active = getActiveBlueprintSynergies(ownedHallSkills);
  const ids = new Set(active.map((s) => s.id));
  const sanctumOwned = skillsForRoom('sanctum').filter((sk) => ownedHallSkills[sk.id]).length;
  return {
    pulseMultBonus: active.length * 0.04 + (ids.has('soft_permission') ? 0.07 : 0),
    passiveTierExtra: sanctumOwned >= 2 ? 1 : sanctumOwned >= 1 ? 0.5 : 0,
    surgeChanceBonus: (ownedHallSkills?.resonance_bells ? 0.05 : 0) + active.length * 0.018,
    pulseRelBonus: ids.has('legendary_flow') ? 1 : 0,
  };
}

/** Ritual ceremony calories from kitchen + feast corridor investment. */
export function depthRitualCalMult(ownedHallSkills = {}) {
  const kitchenOwned = skillsForRoom('kitchen').filter((sk) => ownedHallSkills[sk.id]).length;
  const feastSyn = getActiveBlueprintSynergies(ownedHallSkills).some((s) => s.id === 'feast_corridor');
  return 1 + kitchenOwned * 0.045 + (feastSyn ? 0.12 : 0);
}

/** Sophia campus fattening + hall social investment. */
export function depthCampusPharmacistMods(ownedHallSkills = {}, saturationTier = 0) {
  const syn = getActiveBlueprintSynergies(ownedHallSkills).length;
  const parlorOwned = skillsForRoom('parlor').filter((sk) => ownedHallSkills[sk.id]).length;
  return {
    gainMult: 1 + syn * 0.028 + parlorOwned * 0.035 + (saturationTier >= 2 ? 0.08 : saturationTier >= 1 ? 0.04 : 0),
    eventChanceBonus: syn >= 2 ? 0.06 : syn >= 1 ? 0.03 : 0,
    passiveExtra: parlorOwned >= 2 ? 1 : parlorOwned >= 1 ? 0.5 : 0,
  };
}

/** Campus travel / search / embodied event bonuses from hall investment. */
export function depthExplorationMods(ownedHallSkills = {}, saturationTier = 0) {
  const syn = getActiveBlueprintSynergies(ownedHallSkills).length;
  const raOffice = skillsForRoom('ra_office').filter((sk) => ownedHallSkills[sk.id]).length;
  return {
    ingredientFindBonus: syn * 0.012 + (saturationTier >= 2 ? 0.025 : 0),
    travelEventBonus: syn >= 2 ? 0.04 : 0,
    trustGrantBonus: syn >= 1 ? 1 : 0,
    embodiedEventBonus: Math.min(0.08, syn * 0.015 + raOffice * 0.02),
    searchSecretBonus: raOffice >= 2 ? 0.06 : raOffice >= 1 ? 0.03 : 0,
  };
}

/** Evolved-form passive lbs scale with hall prestige synergies. */
export function depthEvolvedPassiveMult(ownedHallSkills = {}) {
  const syn = getActiveBlueprintSynergies(ownedHallSkills).length;
  return 1 + Math.min(0.2, syn * 0.035);
}
