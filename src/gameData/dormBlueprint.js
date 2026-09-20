// ═══════════════════════════════════════════════════════════════
// DORM BLUEPRINT — spatial hall upgrades + Night Rounds
// Lounge prestige skills map onto labeled rooms. Resident rooms
// take per-door fit-outs. Night Rounds is the original mechanic:
// spend AP, walk the plan, knock, choose.
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';
import { getStage } from './stages.js';
import { getHungerTier, getAddictionLevel } from './hungerAddiction.js';
import { getCorruptionTier } from './corruption.js';
import { canBuyHallLoungeSkill, computeHallLoungeSkillCurrency } from './hallLoungeSkills.js';

export const CATEGORY_TO_ROOM = {
  environment: 'lounge',
  feeding: 'kitchen',
  efficiency: 'ra_desk',
  social: 'dining',
  psychology: 'annex',
  prestige: 'terrace',
};

export const BLUEPRINT_ROOMS = [
  {
    id: 'ra_desk',
    label: 'RA Desk',
    short: 'Desk',
    floor: 1,
    category: 'efficiency',
    col: 1, row: 3, w: 3, h: 2,
    blurb: 'Master keys, shift notes, the first door residents trust.',
  },
  {
    id: 'lounge',
    label: 'Common Lounge',
    short: 'Lounge',
    floor: 1,
    category: 'environment',
    col: 4, row: 1, w: 5, h: 3,
    blurb: 'Couches, lamps, the gravity well of the floor.',
  },
  {
    id: 'kitchen',
    label: 'Galley Kitchen',
    short: 'Kitchen',
    floor: 1,
    category: 'feeding',
    col: 9, row: 1, w: 3, h: 2,
    blurb: 'Stove, fridge, the smell that starts before anyone arrives.',
  },
  {
    id: 'dining',
    label: 'Dining Nook',
    short: 'Dining',
    floor: 1,
    category: 'social',
    col: 9, row: 3, w: 3, h: 2,
    blurb: 'A table that keeps getting longer. Courses, not meals.',
  },
  {
    id: 'annex',
    label: 'Quiet Annex',
    short: 'Annex',
    floor: 2,
    category: 'psychology',
    col: 1, row: 1, w: 3, h: 2,
    blurb: 'Soft light. No passing traffic. Work that needs privacy.',
  },
  {
    id: 'terrace',
    label: 'Roof Terrace',
    short: 'Terrace',
    floor: 2,
    category: 'prestige',
    col: 9, row: 1, w: 3, h: 2,
    blurb: 'Endgame air. The floor that outlasts a contract.',
  },
  {
    id: 'corridor',
    label: 'Resident Wing',
    short: 'Rooms',
    floor: 2,
    category: 'resident',
    col: 4, row: 3, w: 5, h: 2,
    blurb: 'Doors with names. Click a door to outfit her room — or knock after hours.',
  },
];

export const ROOM_FITS = [
  {
    id: 'fridge',
    label: 'Mini-fridge',
    cost: 40,
    desc: 'A quiet hum in the corner. Leftovers survive the night. She opens it without deciding to.',
    effect: 'Passive +1 lb/week. Hunger eases. Late snacks land as calories, not decisions.',
    passiveLbs: 1,
    hungerEase: 1,
  },
  {
    id: 'bed',
    label: 'Reinforced bed',
    cost: 85,
    stageMin: 4,
    desc: 'A frame that does not argue. She stops bracing when she sits. Sleep gets heavier, and so does she.',
    effect: '+6% personal gain. Private sessions hold +8 capacity.',
    gainMult: 0.06,
    sessionCap: 8,
  },
  {
    id: 'doorway',
    label: 'Wider doorway',
    cost: 130,
    stageMin: 6,
    desc: 'Housing calls it accessibility. She calls it not thinking about the frame anymore.',
    effect: 'Discontent eases. Stage 6+ residents move through their own door without the old pause.',
    discontentEase: 1,
    mobility: true,
  },
  {
    id: 'lighting',
    label: 'Warm lighting',
    cost: 35,
    desc: 'Amber lamps instead of the overhead. In this light she looks at herself longer, and likes what she sees.',
    effect: 'Talk +1 relationship. Shame drifts down a little each week.',
    talkRel: 1,
    shameEase: 2,
  },
  {
    id: 'snacks',
    label: 'Snack drawer',
    cost: 55,
    desc: 'The drawer that is never empty. She stops asking whose it is.',
    effect: 'Weekly +2,200 cal / +10 fullness while she sleeps.',
    weeklyCals: 2200,
    weeklyFull: 10,
  },
  {
    id: 'scale',
    label: 'Scale alcove',
    cost: 60,
    desc: 'A private scale behind a curtain. Weigh-ins start honest and stay that way.',
    effect: 'Weigh-in +2 relationship. +1 lb when she steps off, if she lets it land.',
    weighRel: 2,
    weighLbs: 1,
  },
  {
    id: 'outlets',
    label: 'Power drop',
    cost: 70,
    desc: 'Extra circuits for devices that like to run overnight. Housing signed the work order as "study lamps."',
    effect: 'Equipped devices tick 15% harder each week.',
    deviceTickMult: 0.15,
  },
];

export const HABIT_IDS = [
  'midnight_snack',
  'scale_private',
  'open_door',
  'late_study',
  'mirror_pause',
  'shared_stash',
];

export const NIGHT_ROUND_CONFIG = {
  apCost: 1,
  baseVisits: 3,
  lateNightBonus: 2,
  midnightRitualBonus: 1,
  maxFloorIntimacy: 100,
};

export function createInitialDormState() {
  return {
    roomFits: {},
    nightRounds: {
      lastWeek: 0,
      visitsThisWeek: 0,
      floorIntimacy: 0,
      habits: {},
      log: [],
    },
  };
}

export function skillsForRoom(roomId) {
  if (roomId === 'corridor') return [];
  return SKILL_TREE.filter((sk) => CATEGORY_TO_ROOM[sk.category] === roomId);
}

export function roomForSkill(skillId) {
  const sk = SKILL_TREE.find((s) => s.id === skillId);
  return sk ? CATEGORY_TO_ROOM[sk.category] || 'lounge' : 'lounge';
}

export function getRoomFit(fitId) {
  return ROOM_FITS.find((f) => f.id === fitId) || null;
}

export function studentFits(dormState, studentId) {
  return dormState?.roomFits?.[studentId] || {};
}

export function hasRoomFit(dormState, studentId, fitId) {
  return !!studentFits(dormState, studentId)[fitId];
}

export function fitCount(dormState, studentId) {
  return Object.values(studentFits(dormState, studentId)).filter(Boolean).length;
}

export function canBuyRoomFit(fitId, student, dormState, students, ownedHallSkills) {
  const fit = getRoomFit(fitId);
  if (!fit) return { ok: false, reason: 'Unknown fit-out' };
  if (!student) return { ok: false, reason: 'Pick a resident door' };
  if (hasRoomFit(dormState, student.id, fitId)) return { ok: false, reason: 'Already installed' };
  if (fit.stageMin != null && getStage(student.lbs || 0).id < fit.stageMin) {
    return { ok: false, reason: `She needs more size first` };
  }
  const currency = computeHallLoungeSkillCurrency(students, ownedHallSkills || {});
  if (currency < fit.cost) return { ok: false, reason: `Need ${fit.cost} lbs prestige` };
  return { ok: true, fit };
}

export function buyRoomFit(fitId, student, dormState, students, ownedHallSkills) {
  const check = canBuyRoomFit(fitId, student, dormState, students, ownedHallSkills);
  if (!check.ok) return check;
  const nextFits = {
    ...(dormState?.roomFits || {}),
    [student.id]: { ...studentFits(dormState, student.id), [fitId]: true },
  };
  return {
    ok: true,
    fit: check.fit,
    dormState: { ...dormState, roomFits: nextFits },
  };
}

export function roomCompletion(roomId, ownedHallSkills = {}) {
  const skills = skillsForRoom(roomId);
  if (!skills.length) return { owned: 0, total: 0, ratio: 0 };
  const owned = skills.filter((sk) => ownedHallSkills[sk.id]).length;
  return { owned, total: skills.length, ratio: owned / skills.length };
}

export function nightRoundVisitCap(ownedHallSkills = {}) {
  let n = NIGHT_ROUND_CONFIG.baseVisits;
  if (ownedHallSkills.late_night_access) n += NIGHT_ROUND_CONFIG.lateNightBonus;
  if (ownedHallSkills.midnight_ritual) n += NIGHT_ROUND_CONFIG.midnightRitualBonus;
  return n;
}

export function nightRoundApCost(week, dormState) {
  const nr = dormState?.nightRounds;
  if (nr?.lastWeek === week && (nr.visitsThisWeek || 0) > 0) return 0;
  return NIGHT_ROUND_CONFIG.apCost;
}

export function canStartNightRound(ap, week, dormState, ownedHallSkills = {}) {
  const nr = dormState?.nightRounds || createInitialDormState().nightRounds;
  const cap = nightRoundVisitCap(ownedHallSkills);
  const remaining = nr.lastWeek === week ? cap - (nr.visitsThisWeek || 0) : cap;
  if (remaining <= 0) return { ok: false, reason: 'Floor is quiet until next week', remaining: 0 };
  const cost = nightRoundApCost(week, dormState);
  if ((ap || 0) < cost) return { ok: false, reason: `Need ${cost} AP`, remaining };
  return { ok: true, remaining, cost };
}

export function neighborStudentIds(students = [], studentId) {
  const visible = [...students].filter((s) => !s.hidden).sort((a, b) => a.id - b.id);
  const idx = visible.findIndex((s) => s.id === studentId);
  if (idx < 0) return [];
  const ids = [];
  if (idx > 0) ids.push(visible[idx - 1].id);
  if (idx < visible.length - 1) ids.push(visible[idx + 1].id);
  return ids;
}

function pickHabit(student, dormState) {
  const fits = studentFits(dormState, student.id);
  if (fits.scale) return 'scale_private';
  if (fits.snacks || fits.fridge) return 'midnight_snack';
  if (fits.lighting) return 'mirror_pause';
  const hunger = getHungerTier(student);
  if (hunger >= 2) return 'midnight_snack';
  if ((student.relationship || 0) >= 55) return 'open_door';
  const stage = getStage(student.lbs || 0).id;
  if (stage >= 5) return 'mirror_pause';
  return 'late_study';
}

export function nightEncounterKind(student, dormState) {
  const hunger = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const cor = getCorruptionTier(student.corruption || 0).id;
  const stage = getStage(student.lbs || 0).id;
  const fullness = student.stomachCapacity
    ? (student.fullness || 0) / student.stomachCapacity
    : 0;
  const fits = studentFits(dormState, student.id);
  const habit = dormState?.nightRounds?.habits?.[student.id];

  if (hunger >= 3 || addiction >= 2) return 'craving';
  if (fullness >= 0.85) return 'stuffed';
  if (habit === 'midnight_snack' || fits.snacks) return 'raid';
  if (habit === 'scale_private' || fits.scale) return 'scale';
  if (cor >= 2) return 'invite';
  if (stage >= 8) return 'settled';
  if (cor === 0 && stage <= 3) return 'secret';
  return 'checkin';
}

export function nightEncounterChoices(kind) {
  const table = {
    craving: [
      { id: 'feed', label: 'Bring the leftovers', rel: 3, cals: 4200, full: 18, corruption: 2, hunger: -2 },
      { id: 'talk', label: 'Sit with her through it', rel: 6, corruption: 1, hunger: -1 },
      { id: 'observe', label: 'Note the pattern and leave a snack', rel: 2, cals: 1600, full: 6, discover: true },
    ],
    stuffed: [
      { id: 'ease', label: 'Dim the lamp. Let her settle', rel: 5, full: -8 },
      { id: 'praise', label: 'Tell her how she looks this full', rel: 4, corruption: 2, lbs: 1 },
      { id: 'observe', label: 'Watch the after-sway and go', rel: 2, discover: true },
    ],
    raid: [
      { id: 'feed', label: 'Restock the drawer with her', rel: 3, cals: 2800, full: 12, corruption: 1 },
      { id: 'join', label: 'Share whatever she already opened', rel: 5, cals: 1800, full: 8 },
      { id: 'observe', label: 'Catch the habit without naming it', rel: 2, discover: true },
    ],
    scale: [
      { id: 'weigh', label: 'Stay for the number', rel: 4, lbs: 1, corruption: 1 },
      { id: 'talk', label: 'Ask what the number did to her', rel: 6 },
      { id: 'observe', label: 'Leave the curtain how she likes it', rel: 2, discover: true },
    ],
    invite: [
      { id: 'feed', label: 'Accept the plate she already made', rel: 4, cals: 3600, full: 16, corruption: 2 },
      { id: 'stay', label: 'Stay until the hall goes quiet', rel: 7, corruption: 1 },
      { id: 'observe', label: 'Mark how ready she was', rel: 3, discover: true },
    ],
    settled: [
      { id: 'attend', label: 'Bring food to the bed', rel: 5, cals: 5000, full: 22, lbs: 2 },
      { id: 'talk', label: 'Sit where she can lean', rel: 6, corruption: 1 },
      { id: 'observe', label: 'Learn the new geography of the room', rel: 3, discover: true },
    ],
    secret: [
      { id: 'cover', label: 'Help her hide the wrappers', rel: 5, corruption: 1 },
      { id: 'feed', label: 'Pretend you brought this for you', rel: 3, cals: 2200, full: 10, corruption: 2 },
      { id: 'observe', label: 'Let the secret stay a secret', rel: 2, discover: true },
    ],
    checkin: [
      { id: 'feed', label: 'Leave something warm', rel: 3, cals: 2400, full: 10 },
      { id: 'talk', label: 'Ask how the week actually felt', rel: 5 },
      { id: 'observe', label: 'Read the room and go', rel: 2, discover: true },
    ],
  };
  return table[kind] || table.checkin;
}

export function applyNightVisit(dormState, week, student, choice, kind) {
  const prev = dormState?.nightRounds || createInitialDormState().nightRounds;
  const visits = prev.lastWeek === week ? (prev.visitsThisWeek || 0) + 1 : 1;
  const habits = { ...(prev.habits || {}) };
  if (choice.discover) habits[student.id] = pickHabit(student, dormState);
  const intimacy = Math.min(
    NIGHT_ROUND_CONFIG.maxFloorIntimacy,
    (prev.floorIntimacy || 0) + (choice.discover ? 4 : 2),
  );
  const log = [
    ...(prev.log || []).slice(-24),
    { week, studentId: student.id, kind, choiceId: choice.id },
  ];
  return {
    ...dormState,
    nightRounds: {
      lastWeek: week,
      visitsThisWeek: visits,
      floorIntimacy: intimacy,
      habits,
      log,
    },
  };
}

export function habitatForStudent(student, dormState, ownedHallSkills = {}) {
  const fits = studentFits(dormState, student?.id);
  const lounge = {
    passiveLbs: 0,
    gainMult: 0,
    sessionCap: 0,
    talkRel: 0,
    weeklyCals: 0,
    weeklyFull: 0,
    hungerEase: 0,
    shameEase: 0,
    weighRel: 0,
    weighLbs: 0,
    deviceTickMult: 0,
    pantryBonus: 0,
  };
  ROOM_FITS.forEach((fit) => {
    if (!fits[fit.id]) return;
    lounge.passiveLbs += fit.passiveLbs || 0;
    lounge.gainMult += fit.gainMult || 0;
    lounge.sessionCap += fit.sessionCap || 0;
    lounge.talkRel += fit.talkRel || 0;
    lounge.weeklyCals += fit.weeklyCals || 0;
    lounge.weeklyFull += fit.weeklyFull || 0;
    lounge.hungerEase += fit.hungerEase || 0;
    lounge.shameEase += fit.shameEase || 0;
    lounge.weighRel += fit.weighRel || 0;
    lounge.weighLbs += fit.weighLbs || 0;
    lounge.deviceTickMult += fit.deviceTickMult || 0;
  });
  const kitchen = roomCompletion('kitchen', ownedHallSkills);
  const loungeRoom = roomCompletion('lounge', ownedHallSkills);
  lounge.pantryBonus = kitchen.owned >= 2 ? 1 : 0;
  if (loungeRoom.owned >= 3) lounge.gainMult += 0.03;
  const intimacy = dormState?.nightRounds?.floorIntimacy || 0;
  if (intimacy >= 40) lounge.talkRel += 1;
  if (intimacy >= 70) lounge.gainMult += 0.04;
  return lounge;
}

export function listPurchasableRoomSkills(roomId, owned, students) {
  return skillsForRoom(roomId).filter((sk) => canBuyHallLoungeSkill(sk.id, owned, students).ok);
}

export function blueprintStudentDoors(students = []) {
  return [...students]
    .filter((s) => !s.hidden)
    .sort((a, b) => a.id - b.id)
    .slice(0, 12);
}
