// ═══════════════════════════════════════════════════════════════
// FEAST RITUALS — ceremonial multi-student feeding
// ═══════════════════════════════════════════════════════════════

export const FEAST_RITUALS = [
  {
    id: 'communion_snack',
    tier: 1,
    label: 'Communion Snack',
    icon: '🥐',
    minStudents: 2,
    maxStudents: 3,
    apCost: 2,
    caloriesEach: 1400,
    relEach: 5,
    corruptionEach: 4,
    requiresSkill: null,
    requiresClass: 'ritual_kitchen',
    minWeek: 1,
    minSpiritLevel: 1,
    desc: 'A shared plate. Fingers brush. Nobody pretends they are not watching each other eat.',
  },
  {
    id: 'class_banquet',
    tier: 2,
    label: 'Hall Banquet',
    icon: '🍽',
    minStudents: 4,
    maxStudents: 6,
    apCost: 3,
    caloriesEach: 2200,
    relEach: 4,
    corruptionEach: 5,
    requiresSkill: null,
    requiresClass: 'ritual_kitchen',
    minWeek: 4,
    minSpiritLevel: 2,
    desc: 'Courses arrive in sequence. The room fills with heat and chewing. Appetite becomes ceremony.',
  },
  {
    id: 'sacred_gluttony',
    tier: 3,
    label: 'Floor Feast',
    icon: '🔥',
    minStudents: 6,
    maxStudents: 8,
    apCost: 4,
    caloriesEach: 3200,
    relEach: 6,
    corruptionEach: 8,
    requiresSkill: 'ritual_master',
    requiresClass: 'ritual_kitchen',
    minWeek: 8,
    minSpiritLevel: 3,
    desc: 'Candles. Chanting is optional. Fullness is mandatory. The spirit drinks the room.',
  },
  {
    id: 'leviathan_vigil',
    tier: 4,
    label: 'Leviathan Vigil',
    icon: '🏔',
    minStudents: 1,
    maxStudents: 4,
    apCost: 3,
    caloriesEach: 5000,
    relEach: 8,
    corruptionEach: 10,
    requiresSkill: 'ritual_master',
    requiresClass: 'ritual_kitchen',
    minWeek: 12,
    minSpiritLevel: 4,
    minStage: 7,
    immobileOnly: true,
    desc: 'Bedside feasts for bodies too vast to travel. Food brought like offerings.',
  },
];

export function getAvailableRituals({ ownedSkills = {}, ownedClassSkills = {}, students = [], week = 1, spiritLevel = 1 } = {}) {
  const visible = students.filter((s) => !s.hidden);
  return FEAST_RITUALS.filter((r) => {
    if (r.requiresClass && !ownedClassSkills[r.requiresClass]) return false;
    if (r.requiresSkill && (ownedSkills[r.requiresSkill] || 0) < 1) return false;
    if (r.minWeek && week < r.minWeek) return false;
    if (r.minSpiritLevel && spiritLevel < r.minSpiritLevel) return false;
    if (r.immobileOnly) {
      const immobile = visible.filter((s) => (s.lbs || 0) >= 360);
      if (immobile.length < r.minStudents) return false;
    } else if (visible.length < r.minStudents) return false;
    return true;
  });
}

export function canRunRitual(ritualId, studentIds, ctx) {
  const ritual = FEAST_RITUALS.find((r) => r.id === ritualId);
  if (!ritual) return { ok: false, reason: 'Unknown ritual' };
  const available = getAvailableRituals(ctx);
  if (!available.find((r) => r.id === ritualId)) return { ok: false, reason: 'Ritual locked' };
  if (studentIds.length < ritual.minStudents || studentIds.length > ritual.maxStudents) {
    return { ok: false, reason: `Select ${ritual.minStudents}–${ritual.maxStudents} students` };
  }
  if (ritual.immobileOnly) {
    const bad = studentIds.some((id) => {
      const s = ctx.students.find((st) => st.id === id);
      return !s || (s.lbs || 0) < 360;
    });
    if (bad) return { ok: false, reason: 'Leviathan Vigil requires immobile students' };
  }
  return { ok: true, ritual, apCost: ritual.apCost };
}
