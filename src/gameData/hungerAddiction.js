// ═══════════════════════════════════════════════════════════════
// HUNGER & ADDICTION — player-specific craving system (Sophia path)
// Modifiers from skill trees + physical traits (Body's Surrender).
// See docs/Pharmacist/Hunger And Addiction.txt
// ═══════════════════════════════════════════════════════════════

import { getCorruptionTier } from './corruption.js';
import { PHYSICAL_TRAITS } from './skillTrees.js';
import { getStage } from './stages.js';
import { TALK_CONFIG } from './talkSystem.js';

export const ADDICTION_LEVELS = [
  { id: 0, label: "None",       color: null },
  { id: 1, label: "Mild",       color: "rgba(200,120,80,0.12)" },
  { id: 2, label: "Moderate",   color: "rgba(210,90,50,0.18)" },
  { id: 3, label: "Severe",     color: "rgba(220,60,40,0.24)" },
  { id: 4, label: "Dependent",  color: "rgba(230,40,30,0.30)" },
];

export const HUNGER_TIERS = [
  { id: 0, label: "Normal" },
  { id: 1, label: "Increased" },
  { id: 2, label: "High" },
  { id: 3, label: "Craving" },
  { id: 4, label: "Starving" },
];

export const HUNGER_CONFIG = {
  weeksToWithdrawal: 2,
  feedHungerDrop: [0, 1, 2, 2, 3],
  compoundHungerDrop: [0, 2, 2, 3, 3],
  denyHungerGain: 1,
  talkHungerDrop: 1,
  interruptChance: { craving: 0.45, starving: 0.7, withdrawal: 0.55 },
  passiveHungerRise: { 0: 0, 1: 0.15, 2: 0.25, 3: 0.4, 4: 0.55 },
  withdrawalGainMult: 0.55,
  withdrawalRelPenalty: 3,
  denyRelLoss: { default: 5, craving: 8, starving: 14, withdrawal: 12 },
};

/** Per-student hunger modifiers from owned skills, weekly arms, and physical traits. */
export function getHungerModifiers(student, skillEffects = {}, weeklyArms = {}) {
  const eff = skillEffects || {};
  const traits = student?.physicalTraits || [];
  const mod = {
    passiveRiseMult: 1,
    interruptBonus: 0,
    feedDropMult: 1,
    talkDropBonus: 0,
    addictionDriftChance: 0,
    addictionFloorForCraving: 2,
    forceInterrupt: false,
    feedAddictionChance: 0,
  };

  if (eff.devouringPresence && weeklyArms.devouringStudentId === student?.id && !weeklyArms.devouringConsumed) {
    mod.forceInterrupt = true;
    mod.interruptBonus = 1;
    mod.talkDropBonus += 1;
  }

  if (eff.willingVessel && getCorruptionTier(student?.corruption || 0).id >= 2) {
    mod.passiveRiseMult *= 1.55;
    mod.interruptBonus += 0.18;
    mod.addictionFloorForCraving = 1;
  }

  if (eff.cravingSubmission) mod.passiveRiseMult *= 1.12;
  if (eff.corruptionRate) mod.addictionDriftChance += 0.06 * eff.corruptionRate;

  if (eff.gluttonsInstinct) {
    const cap = student?.stomachCapacity || 100;
    if ((student?.fullness || 0) / cap >= 0.7) mod.passiveRiseMult *= 1.4;
  }

  if (eff.lingeringFullness) {
    mod.feedDropMult *= Math.max(0.55, 1 - eff.lingeringFullness * 0.45);
  }

  if (eff.appetiteBoost && getAddictionLevel(student) >= 1) {
    mod.feedAddictionChance += 0.08 * eff.appetiteBoost;
  }

  if (traits.includes('growth_addiction')) mod.passiveRiseMult *= 1.28;
  if (traits.includes('feeding_aura')) mod.passiveRiseMult *= 1.22;
  if (traits.includes('hungry_awakening')) mod.addictionDriftChance += 0.14;

  return mod;
}

export function getAddictionLevel(student) {
  return Math.min(4, Math.max(0, student?.addictionLevel ?? 0));
}

export function getHungerTier(student) {
  const raw = Math.min(4, Math.max(0, student?.hungerTier ?? 0));
  const addiction = getAddictionLevel(student);
  if (raw >= 3 && addiction < 2) return 2;
  return raw;
}

export function isInWithdrawal(student) {
  const addiction = getAddictionLevel(student);
  if (addiction < 2) return false;
  return (student?.weeksWithoutPlayerFeed ?? 0) >= HUNGER_CONFIG.weeksToWithdrawal;
}

export function addictionTint(student) {
  return ADDICTION_LEVELS[getAddictionLevel(student)]?.color || null;
}

export function addAddiction(student, amount = 1) {
  const next = Math.min(4, getAddictionLevel(student) + amount);
  return { ...student, addictionLevel: next };
}

export function setHungerTier(student, tier) {
  const addiction = getAddictionLevel(student);
  let t = Math.min(4, Math.max(0, tier));
  if (t >= 3 && addiction < 2) t = 2;
  return { ...student, hungerTier: t };
}

export function adjustHunger(student, delta) {
  return setHungerTier(student, getHungerTier(student) + delta);
}

/** Prime an armed devouring target so her hunger can surface as an event. */
export function primeDevouringHunger(student) {
  let s = { ...student };
  if (getAddictionLevel(s) < 1) s = addAddiction(s, 1);
  if (getHungerTier(s) < 2) s = adjustHunger(s, 1);
  return s;
}

export function feedResolvesHunger(student, usedCompound = false, skillEffects = {}, weeklyArms = {}) {
  const mod = getHungerModifiers(student, skillEffects, weeklyArms);
  const baseDrop = usedCompound
    ? HUNGER_CONFIG.compoundHungerDrop[getHungerTier(student)]
    : HUNGER_CONFIG.feedHungerDrop[getHungerTier(student)];
  const drop = Math.max(0, Math.round(baseDrop * mod.feedDropMult));
  let s = adjustHunger(student, -drop);
  s = { ...s, weeksWithoutPlayerFeed: 0 };
  if (getAddictionLevel(s) >= 2 && !usedCompound) s = addAddiction(s, 0);
  if (!usedCompound && mod.feedAddictionChance > 0 && Math.random() < mod.feedAddictionChance) {
    s = addAddiction(s, 1);
  }
  return s;
}

export function denyHunger(student) {
  let s = adjustHunger(student, HUNGER_CONFIG.denyHungerGain);
  s = { ...s, weeksWithoutPlayerFeed: (s.weeksWithoutPlayerFeed ?? 0) + 1 };
  return s;
}

export function isWithdrawalAggressive(student) {
  return isInWithdrawal(student) && getAddictionLevel(student) >= 2;
}

/** Relationship, mood, and aggression fallout when turning a hungry girl away. */
export function applyDenialConsequences(student) {
  let s = denyHunger(student);
  const tier = getHungerTier(s);
  const withdrawal = isInWithdrawal(s);
  const losses = HUNGER_CONFIG.denyRelLoss;

  let relLoss = losses.default;
  if (withdrawal) relLoss = losses.withdrawal;
  else if (tier >= 4) relLoss = losses.starving;
  else if (tier >= 3) relLoss = losses.craving;

  s = {
    ...s,
    relationship: Math.max(0, (s.relationship || 0) - relLoss),
    mood: withdrawal || tier >= 3 ? 'stressed' : 'sad',
    withdrawalAggroWeeks: withdrawal ? (s.withdrawalAggroWeeks || 0) + 2 : (s.withdrawalAggroWeeks || 0),
  };
  return s;
}

/** Passive gain penalty while in withdrawal. */
export function withdrawalGainMultiplier(student) {
  return isInWithdrawal(student) ? HUNGER_CONFIG.withdrawalGainMult : 1;
}

export function tickWithdrawalAggression(student) {
  let s = { ...student };
  if (!isInWithdrawal(s)) {
    if ((s.withdrawalAggroWeeks || 0) > 0) {
      s.withdrawalAggroWeeks = Math.max(0, s.withdrawalAggroWeeks - 1);
    }
    return s;
  }
  if (Math.random() < 0.4) s.mood = 'stressed';
  if (Math.random() < 0.2) {
    s.relationship = Math.max(0, (s.relationship || 0) - HUNGER_CONFIG.withdrawalRelPenalty);
  }
  return s;
}

export function talkCalmsHunger(student, skillEffects = {}, weeklyArms = {}) {
  const mod = getHungerModifiers(student, skillEffects, weeklyArms);
  let drop = HUNGER_CONFIG.talkHungerDrop + mod.talkDropBonus;
  if (weeklyArms.devouringStudentId === student?.id && skillEffects?.devouringPresence) {
    drop += Math.ceil(TALK_CONFIG.devouringBonus * 3);
  }
  return adjustHunger(student, -drop);
}

export function applyTraitHungerWeekly(student) {
  let s = { ...student };
  const traits = s.physicalTraits || [];
  for (const tid of traits) {
    const trait = PHYSICAL_TRAITS.find(t => t.id === tid);
    if (!trait?.weekly?.selfFeedCals) continue;
    if (Math.random() < 0.42) s = adjustHunger(s, 1);
  }
  return s;
}

export function tickHungerAddiction(student, playerFedThisWeek = false, skillEffects = {}, weeklyArms = {}) {
  let s = { ...student };
  const mod = getHungerModifiers(s, skillEffects, weeklyArms);

  if (!playerFedThisWeek && getAddictionLevel(s) >= 1) {
    s.weeksWithoutPlayerFeed = (s.weeksWithoutPlayerFeed ?? 0) + 1;
  }

  const addiction = getAddictionLevel(s);
  const rise = (HUNGER_CONFIG.passiveHungerRise[addiction] ?? 0) * mod.passiveRiseMult;
  if (rise > 0 && Math.random() < rise) {
    s = adjustHunger(s, 1);
  }

  if (mod.addictionDriftChance > 0 && addiction < 4 && Math.random() < mod.addictionDriftChance) {
    s = addAddiction(s, 1);
  }

  s = tickWithdrawalAggression(s);
  s = applyTraitHungerWeekly(s);
  return s;
}

export function needsHungerInterrupt(student, skillEffects = {}, weeklyArms = {}) {
  const mod = getHungerModifiers(student, skillEffects, weeklyArms);
  if (mod.forceInterrupt) return true;

  const tier = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const floor = mod.addictionFloorForCraving;
  const withdrawal = isInWithdrawal(student);
  const chanceBonus = mod.interruptBonus;

  if (withdrawal) return Math.random() < Math.min(1, HUNGER_CONFIG.interruptChance.withdrawal + chanceBonus);
  if (tier >= 4 && addiction >= floor) return Math.random() < Math.min(1, HUNGER_CONFIG.interruptChance.starving + chanceBonus);
  if (tier >= 3 && addiction >= floor) return Math.random() < Math.min(1, HUNGER_CONFIG.interruptChance.craving + chanceBonus);
  return false;
}

export function pickInterruptStudent(students, skillEffects = {}, weeklyArms = {}) {
  const candidates = students.filter(s => !s.hidden);

  if (skillEffects?.devouringPresence && weeklyArms.devouringStudentId != null && !weeklyArms.devouringConsumed) {
    const armed = candidates.find(s => s.id === weeklyArms.devouringStudentId);
    if (armed) return primeDevouringHunger(armed);
  }

  const urgent = candidates.filter(s => {
    const mod = getHungerModifiers(s, skillEffects, weeklyArms);
    const t = getHungerTier(s);
    const a = getAddictionLevel(s);
    return isInWithdrawal(s) || (t >= 3 && a >= mod.addictionFloorForCraving);
  });
  if (!urgent.length) return null;

  const triggered = urgent.filter(s => needsHungerInterrupt(s, skillEffects, weeklyArms));
  if (!triggered.length) return null;
  return triggered[Math.floor(Math.random() * triggered.length)];
}
