// ═══════════════════════════════════════════════════════════════
// TRANSFORMATION PRESSURE — unified per-student surrender readout (DEPTH_PLAN §1)
// ═══════════════════════════════════════════════════════════════
import { getCorruptionTier } from './corruption.js';
import { getAddictionLevel, getHungerTier, HUNGER_TIERS, ADDICTION_LEVELS } from './hungerAddiction.js';
import { getStage } from './stages.js';
import { getTier } from './sessions.js';
import { EVOLVED_FORM_META } from './evolvedForms.js';

const SURRENDER_COLORS = {
  emerging: '#7a8a9a',
  rising: '#c8860a',
  committed: '#a05030',
  surrendered: '#c03050',
};

const FAVORITISM_LABELS = {
  favored: 'Your priority this week',
  neglected: 'Feeling sidelined',
};

export function getDominantEvolvedLabel(student) {
  if (!student?.evolvedForm) return null;
  return EVOLVED_FORM_META[student.evolvedForm]?.label || student.evolvedForm;
}

export function computeSurrenderVector(student, extras = {}) {
  const stage = getStage(student?.lbs ?? 130);
  const corruption = getCorruptionTier(student?.corruption ?? 0);
  const addiction = getAddictionLevel(student);
  const hunger = getHungerTier(student);
  const relTier = getTier(student?.relationship ?? 0);
  const relValue = student?.relationship ?? 0;
  const favoritism = student?.rosterEcology?.favoritism ?? null;
  const week = extras.week ?? 0;

  const stageScore = stage.id / 11;
  const corScore = (student?.corruption ?? 0) / 100;
  const addScore = addiction / 4;
  const hungerScore = hunger / 4;
  const relScore = relValue / 100;
  let composite = stageScore * 0.30 + corScore * 0.28 + addScore * 0.18
    + hungerScore * 0.14 + relScore * 0.10;
  if (student?.leftoverFedThisWeek) composite += 0.04;
  if (week && student?.lastNightVisitWeek === week) composite += 0.03;
  composite = Math.min(1, composite);

  let band = 'emerging';
  if (composite >= 0.72) band = 'surrendered';
  else if (composite >= 0.52) band = 'committed';
  else if (composite >= 0.32) band = 'rising';

  return {
    composite: Math.round(composite * 100),
    band,
    color: SURRENDER_COLORS[band],
    stage: { id: stage.id, label: stage.label },
    corruption: { value: student?.corruption ?? 0, tier: corruption.id, label: corruption.label },
    addiction: { level: addiction, label: ADDICTION_LEVELS[addiction]?.label || 'None' },
    hunger: { tier: hunger, label: HUNGER_TIERS[hunger]?.label || 'Normal' },
    relationship: { value: relValue, tier: relTier.id, label: relTier.label },
    evolvedForm: getDominantEvolvedLabel(student),
    favoritism,
    favoritismLabel: favoritism ? FAVORITISM_LABELS[favoritism] : null,
  };
}

export function formatSurrenderSummary(student, extras = {}) {
  const v = computeSurrenderVector(student, extras);
  const parts = [
    v.stage.label,
    v.corruption.label,
    v.addiction.label !== 'None' ? v.addiction.label : null,
    v.relationship.label,
    v.evolvedForm,
    v.favoritismLabel,
  ].filter(Boolean);
  return parts.join(' · ');
}
