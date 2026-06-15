// ═══════════════════════════════════════════════════════════════
// SUPERNATURAL ASCENSION — thin-form templates (§32)
// ═══════════════════════════════════════════════════════════════

export const SUPERNATURAL_FORMS = {
  athlete: { id: 'sumo_wraith', label: 'Sumo Wraith', gainMult: 1.5, scrutinyDrain: 3, activityScarcityDrain: 5, activityGainBonus: 2 },
  influencer: { id: 'hollow_icon', label: 'Hollow Icon', gainMult: 1.4, scrutinyDrain: 2, activityScrutinyDrain: 3 },
  cheerleader: { id: 'pep_ghost', label: 'Pep Ghost', gainMult: 1.35, scrutinyDrain: 4, activityScarcityDrain: 6 },
  bookworm: { id: 'archivist_skin', label: 'Archivist Skin', gainMult: 1.3, scrutinyDrain: 2, activityScrutinyDrain: 4 },
  gamer: { id: 'lag_sprite', label: 'Lag Sprite', gainMult: 1.45, scrutinyDrain: 2, activityGainBonus: 1 },
  sorority: { id: 'silhouette_host', label: 'Silhouette Host', gainMult: 1.4, scrutinyDrain: 3, activityScarcityDrain: 4 },
  overachiever: { id: 'metric_hollow', label: 'Metric Hollow', gainMult: 1.5, scrutinyDrain: 2, activityGainBonus: 3 },
  artsy: { id: 'curator_wraith', label: 'Curator Wraith', gainMult: 1.35, scrutinyDrain: 3, activityScarcityDrain: 5 },
  quiet: { id: 'hive_mote', label: 'Hive Mote', gainMult: 1.4, scrutinyDrain: 3, activityScarcityDrain: 4 },
  transfer: { id: 'salon_wraith', label: 'Salon Wraith', gainMult: 1.45, scrutinyDrain: 4, activityScarcityDrain: 7 },
  eced: { id: 'apple_oracle', label: 'Apple Oracle', gainMult: 1.3, scrutinyDrain: 2, activityScrutinyDrain: 2 },
  farm_girl: { id: 'harvest_maiden', label: 'Harvest Maiden', gainMult: 1.4, scrutinyDrain: 2, activityGainBonus: 2 },
  psych: { id: 'mirror_thin', label: 'Mirror Thin', gainMult: 1.35, scrutinyDrain: 2, activityScarcityDrain: 3 },
  culinary: { id: 'sous_wight', label: 'Sous Wight', gainMult: 1.4, scrutinyDrain: 2, activityScarcityDrain: 4 },
  pharmacy: { id: 'dose_saint', label: 'Dose Saint', gainMult: 1.3, scrutinyDrain: 3, activityScarcityDrain: 6 },
  inventor: { id: 'wire_saint', label: 'Wire Saint', gainMult: 1.35, scrutinyDrain: 2, activityScrutinyDrain: 3 },
};

export function canSupernaturalEvolve(student, opposition) {
  if (!opposition?.supernatural?.actTriggered) return false;
  if (!student?.evolvedForm) return false;
  if (student.supernaturalForm) return false;
  return !!SUPERNATURAL_FORMS[student.archetype];
}

export function getSupernaturalFormForStudent(student) {
  return SUPERNATURAL_FORMS[student?.archetype] || null;
}

export function getSupernaturalGainMult(student) {
  if (!student?.supernaturalForm) return 1;
  const form = SUPERNATURAL_FORMS[student.archetype];
  return form?.gainMult ?? 1;
}

export function getSupernaturalActivityBonus(student) {
  if (!student?.supernaturalForm) {
    return { gainBonus: 0, scarcityDrain: 0, scrutinyDrain: 0 };
  }
  const form = SUPERNATURAL_FORMS[student.archetype];
  return {
    gainBonus: form?.activityGainBonus ?? 0,
    scarcityDrain: form?.activityScarcityDrain ?? 0,
    scrutinyDrain: form?.activityScrutinyDrain ?? 0,
  };
}

export function applySupernaturalActivityPressure(opposition, student) {
  const bonus = getSupernaturalActivityBonus(student);
  if (!bonus.scarcityDrain && !bonus.scrutinyDrain) return { opposition, scrutinyDelta: 0 };
  let next = opposition;
  if (bonus.scarcityDrain) {
    next = {
      ...next,
      supernatural: {
        ...next.supernatural,
        scarcityPressure: Math.max(0, (next.supernatural?.scarcityPressure || 0) - bonus.scarcityDrain),
      },
    };
  }
  return { opposition: next, scrutinyDelta: -(bonus.scrutinyDrain || 0) };
}

export function applyRefeedSurge(student, lbsGain = 12) {
  if (!student?.supernaturalForm) return student;
  const memory = student.memoryMass || student.lbs;
  return {
    ...student,
    lbs: student.lbs + lbsGain,
    memoryMass: memory,
  };
}
