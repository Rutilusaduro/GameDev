// ═══════════════════════════════════════════════════════════════
// ROSTER UNLOCK — passive trust, seat slots, late-game catch-up
// ═══════════════════════════════════════════════════════════════
import { UNLOCK_POOL_IDS } from './spirits.js';

export const ROSTER_TRUST_GATE = 60;
export const ROSTER_START_SLOTS = 5;

/** Roster seats unlocked by spirit level (pool girls only). */
export function getRosterSlotCount(spiritLevel = 1) {
  return ROSTER_START_SLOTS + Math.max(0, spiritLevel - 1);
}

/** Count unlock-pool girls who have crossed the trust door. */
export function countOpenPoolStudents(students = []) {
  return students.filter(
    (s) => UNLOCK_POOL_IDS.includes(s.id) && s.lockState !== 'locked',
  ).length;
}

/** Weekly passive trust for one locked pool girl — scales with spirit level + week. */
export function weeklyTrustDripAmount({ spiritLevel = 1, week = 1, rng = Math.random } = {}) {
  const base = 6 + Math.floor(rng() * 7); // 6–12
  const spiritBonus = Math.max(0, spiritLevel - 2) * 3;
  const weekBonus = Math.floor(week / 8);
  return base + spiritBonus + weekBonus;
}

export function grantPassiveTrust(student, amount) {
  if (!student || student.lockState !== 'locked') return student;
  const next = Math.min(100, (student.passiveTrust || 0) + amount);
  return { ...student, passiveTrust: next };
}

export function applyWeeklyTrustDrip(students, { spiritLevel = 1, week = 1, rng = Math.random } = {}) {
  const hasLocked = students.some((s) => s.lockState === 'locked');
  if (!hasLocked) return students;
  return students.map((s) => {
    if (s.lockState !== 'locked') return s;
    const drip = weeklyTrustDripAmount({ spiritLevel, week, rng });
    return grantPassiveTrust(s, drip);
  });
}

export function pickRipeUnlock(students, spiritLevel = 1) {
  const slots = getRosterSlotCount(spiritLevel);
  const openCount = countOpenPoolStudents(students);
  if (openCount >= slots) return null;
  return students
    .filter((s) => s.lockState === 'locked' && (s.passiveTrust || 0) >= ROSTER_TRUST_GATE)
    .sort((a, b) => (b.passiveTrust || 0) - (a.passiveTrust || 0))[0] || null;
}
