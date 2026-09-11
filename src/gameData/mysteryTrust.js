import { UNLOCK_POOL_IDS, getStudentHomeDorm, getDorm } from './dorms.js';
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

const HINTS_LEFTOVER = [
  'Galley leftover travels farther than names. Another hall is smelling your kitchen.',
  'Someone heard you send trays after hours. Trust is building on a floor you have not met.',
  'Word of leftover plates moves between halls like heat. Curiosity is getting a name.',
];

const HINTS_NIGHT = [
  'Night-round knock is campus gossip now. Distant halls are listening for the same door.',
  'Quiet hours on your floor leaked. Someone is deciding you are worth knowing.',
  'A late knock on your hall got retold. Trust is warming up somewhere you cannot see.',
];

function pickHint(progress, week, extras = {}) {
  if (extras.leftoverKitchen) {
    return HINTS_LEFTOVER[(week + Math.floor(progress * 10)) % HINTS_LEFTOVER.length];
  }
  if (extras.nightRound) {
    return HINTS_NIGHT[(week + Math.floor(progress * 7)) % HINTS_NIGHT.length];
  }
  const pool = progress >= 0.85 ? HINTS_HIGH : progress >= 0.45 ? HINTS_MID : HINTS_LOW;
  return pool[(week + Math.floor(progress * 10)) % pool.length];
}

/**
 * Anonymous passive-trust readout — no locked resident names.
 * @returns {null | { progress: number, hint: string, hallFlavor: string|null, nearlyReady: boolean, slotsFull: boolean }}
 */
export function getMysteryTrustPulse(students = [], { unlockedDorms = [], reachLevel = 1, week = 1, dormState = null } = {}) {
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
  const floorNudge = Math.min(8, Math.floor((dormState?.nightRounds?.floorIntimacy || 0) / 12));
  const leftoverKitchen = (students || []).some((s) => s.leftoverFedThisWeek);
  const leftoverNudge = Math.min(6, (students || []).filter((s) => s.leftoverFedThisWeek).length);
  const nightNudge = Math.min(4, (students || []).filter((s) => week && s.lastNightVisitWeek === week).length);
  const progress = Math.min(1, (maxTrust + floorNudge + leftoverNudge + nightNudge) / ROSTER_TRUST_GATE);
  const nearlyReady = lockedReachable.some((s) => (s.passiveTrust || 0) >= ROSTER_TRUST_GATE);

  const homeIds = [...new Set(lockedReachable.map((s) => getStudentHomeDorm(s.id)).filter(Boolean))];
  const hallFlavor = homeIds.length === 1
    ? getDorm(homeIds[0])?.shortLabel || null
    : homeIds.length > 1
      ? 'cross-hall'
      : null;

  return {
    progress,
    hint: pickHint(progress, week, { leftoverKitchen, nightRound: nightNudge > 0 }),
    hallFlavor,
    nearlyReady,
    slotsFull: false,
  };
}
