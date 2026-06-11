// ═══════════════════════════════════════════════════════════════
// HUNGER & ADDICTION — player-specific craving system (Sophia path)
// See docs/Pharmacist/Hunger And Addiction.txt
// ═══════════════════════════════════════════════════════════════

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
};

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

export function feedResolvesHunger(student, usedCompound = false) {
  const drop = usedCompound
    ? HUNGER_CONFIG.compoundHungerDrop[getHungerTier(student)]
    : HUNGER_CONFIG.feedHungerDrop[getHungerTier(student)];
  let s = adjustHunger(student, -drop);
  s = { ...s, weeksWithoutPlayerFeed: 0 };
  if (getAddictionLevel(s) >= 2 && !usedCompound) s = addAddiction(s, 0);
  return s;
}

export function denyHunger(student) {
  let s = adjustHunger(student, HUNGER_CONFIG.denyHungerGain);
  s = { ...s, weeksWithoutPlayerFeed: (s.weeksWithoutPlayerFeed ?? 0) + 1 };
  return s;
}

export function talkCalmsHunger(student) {
  return adjustHunger(student, -HUNGER_CONFIG.talkHungerDrop);
}

export function tickHungerAddiction(student, playerFedThisWeek = false) {
  let s = { ...student };
  if (!playerFedThisWeek && getAddictionLevel(s) >= 1) {
    s.weeksWithoutPlayerFeed = (s.weeksWithoutPlayerFeed ?? 0) + 1;
  }
  const addiction = getAddictionLevel(s);
  const rise = HUNGER_CONFIG.passiveHungerRise[addiction] ?? 0;
  if (rise > 0 && Math.random() < rise) {
    s = adjustHunger(s, 1);
  }
  if (isInWithdrawal(s) && Math.random() < 0.35) {
    s.mood = "stressed";
  }
  return s;
}

export function needsHungerInterrupt(student) {
  const tier = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const withdrawal = isInWithdrawal(student);
  if (withdrawal) return Math.random() < HUNGER_CONFIG.interruptChance.withdrawal;
  if (tier >= 4 && addiction >= 2) return Math.random() < HUNGER_CONFIG.interruptChance.starving;
  if (tier >= 3 && addiction >= 2) return Math.random() < HUNGER_CONFIG.interruptChance.craving;
  return false;
}

export function pickInterruptStudent(students) {
  const candidates = students.filter(s => !s.hidden);
  const urgent = candidates.filter(s => {
    const t = getHungerTier(s);
    const a = getAddictionLevel(s);
    return isInWithdrawal(s) || (t >= 3 && a >= 2);
  });
  const pool = urgent.length ? urgent : [];
  if (!pool.length) return null;
  const triggered = pool.filter(needsHungerInterrupt);
  if (!triggered.length) return null;
  return triggered[Math.floor(Math.random() * triggered.length)];
}
