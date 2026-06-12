// ═══════════════════════════════════════════════════════════════
// PER-STUDENT PSYCH STATE — fixation, obsession, dependence, shame
// Light tier ladders for text dims + minor mechanics (pass 1).
// ═══════════════════════════════════════════════════════════════

export const PSYCH_TIERS = [
  { id: 0, min: 0, label: 'Low', color: '#7a8a9a' },
  { id: 1, min: 25, label: 'Elevated', color: '#c8860a' },
  { id: 2, min: 50, label: 'High', color: '#c05030' },
  { id: 3, min: 75, label: 'Extreme', color: '#a02050' },
];

function tierFor(val) {
  return [...PSYCH_TIERS].reverse().find(t => (val ?? 0) >= t.min) || PSYCH_TIERS[0];
}

export const getFixationTier = tierFor;
export const getObsessionTier = tierFor;
export const getDependenceTier = tierFor;
export const getShameTier = tierFor;

export function initPsychState() {
  return { fixation: 0, obsession: 0, dependence: 0, shame: 0 };
}

export function applyPsychDelta(psych, delta = {}) {
  const next = { ...psych };
  for (const k of ['fixation', 'obsession', 'dependence', 'shame']) {
    if (delta[k]) next[k] = Math.min(100, Math.max(0, (next[k] ?? 0) + delta[k]));
  }
  return next;
}
