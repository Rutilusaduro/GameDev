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
  const nextLbs = student.lbs + lbsGain;
  return {
    ...student,
    lbs: nextLbs,
    memoryMass: memory,
    etherealLbs: student.etherealLbs ?? student.lbs,
    lastRefeedSurgeWeek: true,
  };
}

export function getEtherealDisplayLbs(student) {
  if (!student?.supernaturalForm) return student?.lbs ?? 0;
  return student.etherealLbs ?? student.lbs;
}

export function applyAscensionThinForm(student, form) {
  const memory = student.lbs;
  const ethereal = Math.max(student.startLbs || 110, Math.round((student.startLbs || 110) * 0.92));
  return {
    ...student,
    supernaturalForm: form.id,
    memoryMass: memory,
    etherealLbs: ethereal,
    lbs: ethereal,
  };
}

/** Hollow Icon — streams pull scarcity attention away. */
export function hollowIconStreamDrain(opposition, amount = 4) {
  if (!opposition?.supernatural?.actTriggered) return opposition;
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      scarcityPressure: Math.max(0, (opposition.supernatural.scarcityPressure || 0) - amount),
    },
  };
}

export function canArchivistFreeDiscredit(students, opposition) {
  if (opposition?.meta?.archivistDiscreditUsed) return false;
  return students.some((s) => s.supernaturalForm === 'archivist_skin');
}

/** Per-form supernatural hooks on AIB agenda resolution (§32 opposition). */
export function applySupernaturalAgendaHook(cardEffect, students, effects) {
  const forms = new Set((students || []).filter((s) => s.supernaturalForm).map((s) => s.supernaturalForm));
  if (!forms.size) return effects;

  if (cardEffect === 'wellness_audit' && forms.has('hive_mote')) {
    effects.scrutinyDelta = (effects.scrutinyDelta || 0) - 2;
    effects.logs = [...(effects.logs || []), '🐝 Hive Mote — audit findings dissolve into collective noise (−2 scrutiny).'];
    effects.studentPatches = (effects.studentPatches || []).map((p) => ({ ...p, relDelta: (p.relDelta || 0) + 3 }));
  }
  if (cardEffect === 'mandatory_fitness' && forms.has('pep_ghost')) {
    effects.studentPatches = (effects.studentPatches || []).map((p) => ({ ...p, relDelta: (p.relDelta || 0) + 4, hungerDelta: Math.max(0, (p.hungerDelta || 0) - 1) }));
    effects.logs = [...(effects.logs || []), '👻 Pep Ghost — fitness order becomes pep rally; one resident spared the worst (−hunger).'];
  }
  if (cardEffect === 'shame_vigil' && forms.has('salon_wraith')) {
    effects.studentPatches = (effects.studentPatches || []).map((p) => {
      const s = students.find((st) => st.id === p.id);
      if (s?.supernaturalForm === 'salon_wraith') return { ...p, corruptionDelta: 0 };
      return p;
    });
    effects.logs = [...(effects.logs || []), '🥀 Salon Wraith — shame slides off the hostess like silk.'];
  }
  if (cardEffect === 'faculty_informant' && forms.has('dose_saint')) {
    effects.scrutinyDelta = Math.max(0, (effects.scrutinyDelta || 0) - 2);
    effects.logs = [...(effects.logs || []), '💊 Dose Saint — informant report arrives chemically illegible (−2 scrutiny).'];
  }
  if (cardEffect === 'size_review' && forms.has('mirror_thin')) {
    effects.scrutinyDelta = Math.max(0, (effects.scrutinyDelta || 0) - 1);
    effects.logs = [...(effects.logs || []), '🪞 Mirror Thin — weigh-in documentation blurs at the edges (−1 scrutiny).'];
  }
  if (cardEffect === 'wellness_seminar' && forms.has('wire_saint')) {
    effects.oppositionPatch = {
      ...(effects.oppositionPatch || {}),
      activeDebuffs: {
        ...(effects.oppositionPatch?.activeDebuffs || {}),
        gainMult: 0.92,
        gainMultWeeks: 1,
      },
    };
    effects.logs = [...(effects.logs || []), '⚡ Wire Saint — workshop interference softens appetite dampening (−8% not −15%).'];
  }
  return effects;
}

/** Hearing paths unlocked by ascended thin-forms. */
export function getSupernaturalHearingFlags(students) {
  const forms = new Set((students || []).filter((s) => s.supernaturalForm).map((s) => s.supernaturalForm));
  const hasEmbodimentPath = forms.size > 0;
  return {
    hasInfluencePath: hasEmbodimentPath,
    hasEmbodimentPath,
    /** @deprecated use hasEmbodimentPath */
    hasSpiritPath: hasEmbodimentPath,
    hasArchivistDiscredit: forms.has('archivist_skin'),
    hasHiveShield: forms.has('hive_mote'),
    hasSalonCharm: forms.has('salon_wraith'),
    hasMetricHollow: forms.has('metric_hollow'),
  };
}
