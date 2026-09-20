import { UNLOCK_POOL_IDS, getStudentHomeDorm, getDorm } from './dorms.js';
import { depthPassiveTrustDrip } from './mechanicsDepthLayer.js';
import {
  ROSTER_TRUST_GATE,
  countOpenPoolStudents,
  getRosterSlotCount,
  isHallReachable,
} from './rosterUnlock.js';

const HINTS_LOW = [
  'A rumor circulates on another hall — someone heard you run a generous floor.',
  'Dining-hall chatter mentions an RA who actually shows up. Not your name. Not yet.',
  'Passive trust is building somewhere you cannot see. Keep being visible on your hall.',
  'Word travels between halls like heat through vents. Something is warming up.',
];

const HINTS_MID = [
  'Whoever they are, they are paying attention to how you treat your residents.',
  'Campus gossip tags you as "the RA who feeds people." That travels farther than the quad.',
  'Another hall is close to believing you are worth knowing. No names — just momentum.',
];

const HINTS_HIGH = [
  'A seat on your roster is almost ready to open — when it does, she will appear without warning.',
  'Trust on a distant hall has crossed the line from curiosity into intent.',
  'Someone is ready to knock on your floor. Make sure you have room.',
];

function pickHint(progress, week) {
  const pool = progress >= 0.85 ? HINTS_HIGH : progress >= 0.45 ? HINTS_MID : HINTS_LOW;
  return pool[(week + Math.floor(progress * 10)) % pool.length];
}

/**
 * Anonymous passive-trust readout — no locked resident names.
 * @returns {null | { progress: number, hint: string, hallFlavor: string|null, nearlyReady: boolean, slotsFull: boolean }}
 */
export function getMysteryTrustPulse(students = [], { unlockedDorms = [], reachLevel = 1, week = 1 } = {}) {
  const slots = getRosterSlotCount(reachLevel);
  const openCount = countOpenPoolStudents(students);
  if (openCount >= slots) {
    return { progress: 1, hint: 'Your roster is full — new faces will wait for a seat to open.', hallFlavor: null, nearlyReady: false, slotsFull: true };
  }

  const lockedReachable = students.filter(
    (s) => s.lockState === 'locked'
      && UNLOCK_POOL_IDS.includes(s.id)
      && isHallReachable(s, unlockedDorms),
  );
  if (!lockedReachable.length) return null;

  const maxTrust = Math.max(...lockedReachable.map((s) => s.passiveTrust || 0));
  const progress = Math.min(1, depthPassiveTrustDrip(maxTrust) / ROSTER_TRUST_GATE);
  const nearlyReady = lockedReachable.some((s) => (s.passiveTrust || 0) >= ROSTER_TRUST_GATE);

  const homeIds = [...new Set(lockedReachable.map((s) => getStudentHomeDorm(s.id)).filter(Boolean))];
  const hallFlavor = homeIds.length === 1
    ? getDorm(homeIds[0])?.shortLabel || null
    : homeIds.length > 1
      ? 'cross-hall'
      : null;

  return {
    progress,
    hint: pickHint(progress, week),
    hallFlavor,
    nearlyReady,
    slotsFull: false,
  };
}
