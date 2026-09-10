// ═══════════════════════════════════════════════════════════════
// ROSTER UNLOCK — passive trust, seat slots, late-game catch-up
// ═══════════════════════════════════════════════════════════════
import { UNLOCK_POOL_IDS, getStudentHomeDorm } from './dorms.js';

export const ROSTER_TRUST_GATE = 60;
export const ROSTER_START_SLOTS = 5;

/** Roster seats unlocked by hall reach (pool residents only). */
export function getRosterSlotCount(reachLevel = 1) {
  return ROSTER_START_SLOTS + Math.max(0, reachLevel - 1);
}

/** Count unlock-pool residents who have crossed the trust door. */
export function countOpenPoolStudents(students = []) {
  return students.filter(
    (s) => UNLOCK_POOL_IDS.includes(s.id) && s.lockState !== 'locked',
  ).length;
}

/** Weekly passive trust for one locked pool resident — scales with hall reach + week. */
export function weeklyTrustDripAmount({ reachLevel = 1, week = 1, rng = Math.random } = {}) {
  const base = 6 + Math.floor(rng() * 7); // 6–12
  const reachBonus = Math.max(0, reachLevel - 2) * 3;
  const weekBonus = Math.floor(week / 8);
  return base + reachBonus + weekBonus;
}

export function getStudentHomeHall(student) {
  return student?.homeDorm || getStudentHomeDorm(student?.id) || null;
}

/** Locked pool residents only accrue trust once their home hall is unlocked. */
export function isHallReachable(student, unlockedDorms = []) {
  if (!student || !UNLOCK_POOL_IDS.includes(student.id)) return true;
  const home = getStudentHomeHall(student);
  if (!home) return true;
  return (unlockedDorms || []).includes(home);
}

export function grantPassiveTrust(student, amount, unlockedDorms = null) {
  if (!student || student.lockState !== 'locked') return student;
  if (unlockedDorms && !isHallReachable(student, unlockedDorms)) return student;
  const next = Math.min(100, (student.passiveTrust || 0) + amount);
  return { ...student, passiveTrust: next };
}

export function applyWeeklyTrustDrip(students, { reachLevel = 1, week = 1, unlockedDorms = [], rng = Math.random } = {}) {
  const hasLocked = students.some((s) => s.lockState === 'locked' && isHallReachable(s, unlockedDorms));
  if (!hasLocked) return students;
  return students.map((s) => {
    if (s.lockState !== 'locked' || !isHallReachable(s, unlockedDorms)) return s;
    const drip = weeklyTrustDripAmount({ reachLevel, week, rng });
    return grantPassiveTrust(s, drip);
  });
}

/** True while the resident's first week on the active roster. */
export function isRosterNew(student, week = 1) {
  return student?.rosterNewWeek != null && student.rosterNewWeek === week;
}

export function openRosterResident(student, week = 1) {
  return { ...student, lockState: 'open', rosterNewWeek: week };
}

export function pickRipeUnlock(students, reachLevel = 1, unlockedDorms = []) {
  const slots = getRosterSlotCount(reachLevel);
  const openCount = countOpenPoolStudents(students);
  if (openCount >= slots) return null;
  return students
    .filter((s) => s.lockState === 'locked'
      && isHallReachable(s, unlockedDorms)
      && (s.passiveTrust || 0) >= ROSTER_TRUST_GATE)
    .sort((a, b) => (b.passiveTrust || 0) - (a.passiveTrust || 0))[0] || null;
}
