// ═══════════════════════════════════════════════════════════════
// CAMPUS SATURATION — meta-track beyond pharmacist stage alone
// ═══════════════════════════════════════════════════════════════

import { getStage } from './stages.js';
import { getCampusFatteningTier } from './pharmacistCampus.js';

export const SATURATION_TIERS = [
  { id: 0, min: 0, label: 'Unremarkable', passiveBonus: [0, 0], newStudentLbsBonus: 0 },
  { id: 1, min: 25, label: 'Softening', passiveBonus: [0, 1], newStudentLbsBonus: 5 },
  { id: 2, min: 50, label: 'Indulgent', passiveBonus: [1, 2], newStudentLbsBonus: 12 },
  { id: 3, min: 75, label: 'Saturated', passiveBonus: [2, 3], newStudentLbsBonus: 20 },
  { id: 4, min: 100, label: 'Transformed', passiveBonus: [3, 5], newStudentLbsBonus: 35 },
];

export function computeCampusSaturation(ctx = {}) {
  const {
    pharmacistState = null,
    labState = null,
    students = [],
    cultSupply = 0,
  } = ctx;

  let score = 0;

  if (pharmacistState?.campusFattening) {
    score += (pharmacistState.stage ?? 1) * 12;
    score += (pharmacistState.cult?.supplyReservoir ?? 0) * 0.4;
    score += cultSupply * 2;
  }

  const deployments = labState?.network?.deployments?.length ?? 0;
  score += deployments * 8;
  score += (labState?.network?.nodes?.length ?? 0) * 3;

  const visible = students.filter((s) => !s.hidden);
  if (visible.length) {
    const avgStage = visible.reduce((a, s) => a + getStage(s.lbs).id, 0) / visible.length;
    score += avgStage * 4;
    const heavyCount = visible.filter((s) => getStage(s.lbs).id >= 5).length;
    score += heavyCount * 5;
  }

  return Math.min(100, Math.round(score));
}

export function getSaturationTier(score) {
  return [...SATURATION_TIERS].reverse().find((t) => score >= t.min) || SATURATION_TIERS[0];
}

export function rollSaturationPassiveLbs(score, pharmacistState, rndFn) {
  const tier = getSaturationTier(score);
  const pharmaTier = getCampusFatteningTier(pharmacistState);
  const [lo, hi] = tier.passiveBonus;
  let gain = rndFn(lo, hi);
  if (pharmaTier) {
    const [plo, phi] = pharmaTier.passiveLbs;
    gain += rndFn(plo, phi);
  }
  return gain;
}

export function saturationAmbientLine(score) {
  const tier = getSaturationTier(score);
  const lines = {
    0: 'The campus feels ordinary — for now.',
    1: 'Something in the air is softer. Portions creep upward without announcement.',
    2: 'New students arrive already curious about appetite. The dining hall hums.',
    3: 'The whole campus breathes indulgence. Heavier bodies are the new normal.',
    4: 'Transformation is ambient. The college has become a place that grows girls.',
  };
  return { tier, label: tier.label, text: lines[tier.id] || lines[0] };
}
