// Which main nav tabs are visible — tabs appear when their gate clears (no greyed previews).

function pantryHasItems(inventory = {}) {
  return Object.values(inventory).some((q) => (q || 0) > 0);
}

function anyHallLoungeOwned(ownedHallSkills = {}) {
  return Object.keys(ownedHallSkills).length > 0;
}

function anyRoomIntroduced(students = []) {
  return students.some((s) => s.lockState === 'open' && s.roomIntroduced);
}

function campusEngaged(campusState = {}, week = 1) {
  const exp = campusState.exploration || {};
  const visits = exp.visitCount ?? Object.keys(exp.visited || {}).length;
  return week >= 2 || visits > 0 || !!exp.elaraDiscovered;
}

/** @returns {Record<string, boolean>} */
export function computeNavVisibility({
  week = 1,
  raProfile = null,
  students = [],
  ownedHallSkills = {},
  inventory = {},
  achievements = [],
  reachLevel = 1,
  settledStudents = [],
  opposition = null,
  adminScrutiny = 0,
  labState = null,
  campusState = {},
  sel = null,
  effectiveHallActions = [],
}) {
  const briefingDone = !!raProfile?.floorBriefingDone;
  const actionsReady = anyHallLoungeOwned(ownedHallSkills)
    || (effectiveHallActions.length > 0 && week >= 2);

  return {
    roster: true,
    'hall-lounge': briefingDone,
    influence: briefingDone && anyRoomIntroduced(students),
    student: !!sel,
    actions: briefingDone && actionsReady,
    inventory: briefingDone && (pantryHasItems(inventory) || week >= 3),
    campus: briefingDone && campusEngaged(campusState, week),
    skills: briefingDone && (reachLevel >= 2 || week >= 3),
    achievements: (achievements || []).length > 0,
    settling: settledStudents.length > 0,
    oversight: week >= 8 || !!opposition?.aib?.unlocked || adminScrutiny >= 25,
    lab: !!labState,
    devices: !!labState,
    network: !!(labState && (labState.stage ?? 1) >= 2),
  };
}

export const NAV_TAB_META = [
  ['roster', '📋 RA Desk'],
  ['hall-lounge', '🏠 Hall Lounge'],
  ['influence', '✨ Influence'],
  ['student', null],
  ['actions', '🎭 Actions'],
  ['inventory', '🎒 Pantry'],
  ['campus', '🗺️ Campus'],
  ['skills', '📈 Reach'],
  ['achievements', '🏆 Achievements'],
  ['settling', '✦ The Settling'],
  ['oversight', '👁 Oversight'],
  ['lab', '🔧 The Lab'],
  ['devices', '🛠 Devices'],
  ['network', '🌐 Network'],
];

export const NAV_UNLOCK_BLURB = {
  'hall-lounge': 'Hall Lounge — spend floor weight on permanent upgrades.',
  influence: 'Influence — resonance links and floor rituals.',
  actions: 'Hall-Wide Actions — feed the whole floor at once.',
  inventory: 'Pantry — items and gifts for residents.',
  campus: 'Campus map — explore and run into residents.',
  skills: 'Reach — spend influence on resident skills.',
  achievements: 'Achievements — milestones you have earned.',
  settling: 'The Settling — residents who have moved on.',
  oversight: 'Oversight — scrutiny and opposition.',
  lab: 'The Lab — Talia\'s inventions.',
  devices: 'Devices — build and equip gear.',
  network: 'Network — deployed invention grid.',
};
