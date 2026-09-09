// ═══════════════════════════════════════════════════════════════
// DORM HALLS — pre-game hall pick + resident roster
// ═══════════════════════════════════════════════════════════════

export const UNLOCK_POOL_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

/** One home hall per unlock-pool resident. */
export const STUDENT_HOME_DORM = {
  0: 'sporty',
  1: 'sporty',
  2: 'socialite',
  3: 'sporty',
  4: 'socialite',
  5: 'nerdy',
  6: 'socialite',
  7: 'nerdy',
  8: 'weirdos',
  9: 'socialite',
  10: 'weirdos',
  11: 'sporty',
  12: 'nerdy',
  13: 'nerdy',
  14: 'sporty',
};

export const DORMS = {
  sporty: {
    id: 'sporty',
    label: 'Victory Hall',
    shortLabel: 'Sporty',
    emoji: '🏊',
    color: '#e85d4a',
    accentSoft: 'rgba(232,93,74,0.22)',
    tagline: 'Athletes, early lifts, team dinners that never end.',
    hook: 'Your floor smells like chlorine and protein powder. The girls here treat appetite like training — and you are the one holding the meal plan.',
    gainMult: 1.1,
    scrutinyMult: 0.88,
    unlockWeek: 0,
  },
  nerdy: {
    id: 'nerdy',
    label: 'Scholar\'s Rest',
    shortLabel: 'Nerdy',
    emoji: '📚',
    color: '#4a7ae8',
    accentSoft: 'rgba(74,122,232,0.22)',
    tagline: 'Late stacks, lab deadlines, and takeout at 2 a.m.',
    hook: 'Quiet halls, louder minds. These residents rationalize every craving — until the numbers stop making sense.',
    gainMult: 1.0,
    scrutinyMult: 0.92,
    unlockWeek: 8,
  },
  socialite: {
    id: 'socialite',
    label: 'Rosewood House',
    shortLabel: 'Socialite',
    emoji: '💄',
    color: '#d84ab8',
    accentSoft: 'rgba(216,74,184,0.22)',
    tagline: 'Greek row energy without leaving the quad.',
    hook: 'Pastels, playlists, and parties that start with charcuterie. On this floor, indulgence is always on-brand.',
    gainMult: 1.05,
    scrutinyMult: 1.05,
    unlockWeek: 12,
  },
  weirdos: {
    id: 'weirdos',
    label: 'The Annex',
    shortLabel: 'Weirdos',
    emoji: '🦎',
    color: '#6ab84a',
    accentSoft: 'rgba(106,184,74,0.22)',
    tagline: 'The floor housing swears doesn\'t exist on the map.',
    hook: 'Art majors, streamers, and girls who treat the dorm kitchen like a laboratory. Nobody here eats "normal."',
    gainMult: 1.08,
    scrutinyMult: 0.95,
    unlockWeek: 16,
  },
};

// Attach resident lists derived from home assignments
for (const dorm of Object.values(DORMS)) {
  dorm.studentIds = UNLOCK_POOL_IDS.filter((id) => STUDENT_HOME_DORM[id] === dorm.id);
}

export const DORM_LIST = Object.values(DORMS);

export function getDorm(id) {
  return DORMS[id] || null;
}

export function getStudentHomeDorm(studentId) {
  return STUDENT_HOME_DORM[studentId] || null;
}

export function getDormResidents(dormId) {
  return DORMS[dormId]?.studentIds || [];
}

export function getLockedDormStudentIds(unlockedDorms = []) {
  const open = new Set(unlockedDorms);
  return UNLOCK_POOL_IDS.filter((id) => {
    const home = STUDENT_HOME_DORM[id];
    return home && !open.has(home);
  });
}

export function dormUnlocksForWeek(week, startDormId) {
  return DORM_LIST.filter(
    (d) => d.id !== startDormId && d.unlockWeek > 0 && week >= d.unlockWeek,
  ).map((d) => d.id);
}
