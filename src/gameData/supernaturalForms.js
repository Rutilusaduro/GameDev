// ═══════════════════════════════════════════════════════════════
// SUPERNATURAL ASCENSION — thin-form templates (§32)
// ═══════════════════════════════════════════════════════════════

export const SUPERNATURAL_FORMS = {
  athlete: { id: 'sumo_wraith', label: 'Sumo Wraith', gainMult: 1.5, scrutinyDrain: 3 },
  influencer: { id: 'hollow_icon', label: 'Hollow Icon', gainMult: 1.4, scrutinyDrain: 2 },
  cheerleader: { id: 'pep_ghost', label: 'Pep Ghost', gainMult: 1.35, scrutinyDrain: 4 },
  bookworm: { id: 'archivist_skin', label: 'Archivist Skin', gainMult: 1.3, scrutinyDrain: 2 },
  gamer: { id: 'lag_sprite', label: 'Lag Sprite', gainMult: 1.45, scrutinyDrain: 2 },
  sorority: { id: 'silhouette_host', label: 'Silhouette Host', gainMult: 1.4, scrutinyDrain: 3 },
  overachiever: { id: 'metric_hollow', label: 'Metric Hollow', gainMult: 1.5, scrutinyDrain: 2 },
  artsy: { id: 'curator_wraith', label: 'Curator Wraith', gainMult: 1.35, scrutinyDrain: 3 },
  quiet: { id: 'hive_mote', label: 'Hive Mote', gainMult: 1.4, scrutinyDrain: 3 },
  transfer: { id: 'salon_wraith', label: 'Salon Wraith', gainMult: 1.45, scrutinyDrain: 4 },
  eced: { id: 'apple_oracle', label: 'Apple Oracle', gainMult: 1.3, scrutinyDrain: 2 },
  farm_girl: { id: 'harvest_maiden', label: 'Harvest Maiden', gainMult: 1.4, scrutinyDrain: 2 },
  psych: { id: 'mirror_thin', label: 'Mirror Thin', gainMult: 1.35, scrutinyDrain: 2 },
  culinary: { id: 'sous_wight', label: 'Sous Wight', gainMult: 1.4, scrutinyDrain: 2 },
  pharmacy: { id: 'dose_saint', label: 'Dose Saint', gainMult: 1.3, scrutinyDrain: 3 },
  inventor: { id: 'wire_saint', label: 'Wire Saint', gainMult: 1.35, scrutinyDrain: 2 },
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

export function applyRefeedSurge(student, lbsGain = 12) {
  if (!student?.supernaturalForm) return student;
  const memory = student.memoryMass || student.lbs;
  return {
    ...student,
    lbs: student.lbs + lbsGain,
    memoryMass: memory,
  };
}
