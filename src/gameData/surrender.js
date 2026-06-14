// ═══════════════════════════════════════════════════════════════
// SURRENDER READOUT — composite transformation vector per student
// ═══════════════════════════════════════════════════════════════

import { getStage } from './stages.js';
import { getCorruptionTier } from './corruption.js';
import { getAddictionLevel, getHungerTier } from './hungerAddiction.js';
import { getTier } from './sessions.js';
import { EVOLVED_FORM_META } from './evolvedForms.js';

const SURRENDER_WEIGHTS = {
  stage: 0.35,
  corruption: 0.25,
  addiction: 0.2,
  relationship: 0.1,
  evolved: 0.1,
};

export function computeSurrenderScore(student) {
  if (!student) return 0;
  const stageNorm = getStage(student.lbs).id / 11;
  const corruptionNorm = (student.corruption ?? 0) / 100;
  const addictionNorm = getAddictionLevel(student) / 4;
  const relNorm = (student.relationship ?? 0) / 100;
  const evolvedNorm = student.evolvedForm ? 1 : 0;

  const score =
    stageNorm * SURRENDER_WEIGHTS.stage +
    corruptionNorm * SURRENDER_WEIGHTS.corruption +
    addictionNorm * SURRENDER_WEIGHTS.addiction +
    relNorm * SURRENDER_WEIGHTS.relationship +
    evolvedNorm * SURRENDER_WEIGHTS.evolved;

  return Math.round(score * 100);
}

export function getSurrenderTier(score) {
  if (score >= 85) return { id: 4, label: 'Arrived', color: '#c03050' };
  if (score >= 65) return { id: 3, label: 'Surrendered', color: '#c06030' };
  if (score >= 45) return { id: 2, label: 'Yielding', color: '#c09020' };
  if (score >= 25) return { id: 1, label: 'Softening', color: '#809040' };
  return { id: 0, label: 'Resistant', color: '#607080' };
}

export function getSurrenderReadout(student) {
  const score = computeSurrenderScore(student);
  const tier = getSurrenderTier(score);
  const stage = getStage(student.lbs);
  const corruption = getCorruptionTier(student.corruption ?? 0);
  const addiction = getAddictionLevel(student);
  const hunger = getHungerTier(student);
  const rel = getTier(student.relationship ?? 0);
  const evolved = student.evolvedForm
    ? (EVOLVED_FORM_META[student.evolvedForm]?.label || student.evolvedForm)
    : null;

  return {
    score,
    tier,
    axes: {
      stage: { value: stage.id, label: stage.label },
      corruption: { value: student.corruption ?? 0, label: corruption.label },
      addiction: { value: addiction, label: ['None', 'Mild', 'Moderate', 'Severe', 'Dependent'][addiction] },
      hunger: { value: hunger, label: ['Normal', 'Increased', 'High', 'Craving', 'Starving'][hunger] },
      relationship: { value: student.relationship ?? 0, label: rel.label },
      evolved,
    },
  };
}
