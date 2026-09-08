// ═══════════════════════════════════════════════════════════════
// BODY ECHO ARCHIVE — replay transformation moments
// ═══════════════════════════════════════════════════════════════
import { V2_CONFIG } from './state.js';

export const ECHO_TYPES = {
  stage_up: { label: 'Stage Ascension', icon: '⬆' },
  corruption_tier: { label: 'Corruption Shift', icon: '🕯' },
  evolution: { label: 'Evolved Form', icon: '✨' },
  immobility: { label: 'Immobile Threshold', icon: '🏔' },
  weigh_in: { label: 'Weigh-In Revelation', icon: '⚖' },
  dinner_unbutton: { label: 'Dinner Surrender', icon: '🍷' },
  first_force_feed: { label: 'First Overflow', icon: '🌊' },
};

export function hasEchoType(echoesState, studentId, type) {
  return (echoesState?.moments || []).some((m) => m.studentId === studentId && m.type === type);
}

export function captureEcho(echoesState, { studentId, type, week, stageId, meta = {} }) {
  const id = `echo_${studentId}_${type}_${week}_${Date.now()}`;
  const moment = {
    id,
    studentId,
    type,
    week,
    stageId,
    meta,
    replayCount: 0,
    capturedAt: week,
  };
  return {
    ...echoesState,
    moments: [...(echoesState.moments || []), moment],
  };
}

/** Capture only if this student has no echo of this type yet. */
export function captureEchoOnce(echoesState, params) {
  if (hasEchoType(echoesState, params.studentId, params.type)) return echoesState;
  return captureEcho(echoesState, params);
}

export function getStudentEchoes(studentId, echoesState) {
  return (echoesState.moments || [])
    .filter((m) => m.studentId === studentId)
    .sort((a, b) => b.week - a.week);
}

export function replayEcho(echoesState, echoId) {
  const moments = (echoesState.moments || []).map((m) =>
    m.id === echoId ? { ...m, replayCount: (m.replayCount || 0) + 1 } : m,
  );
  return { ...echoesState, moments };
}

export function canViewEchoArchive(ownedSkills = {}, ownedClassSkills = {}) {
  return (ownedSkills.memory_palace || 0) >= 1 && !!ownedClassSkills.echo_gallery;
}

export function canResonateEcho(echoesState, echoId, ownedSkills = {}, ownedClassSkills = {}) {
  if ((ownedSkills.memory_palace || 0) < 1) return { ok: false, reason: 'Requires Memory Palace skill' };
  if (!ownedClassSkills.echo_gallery) return { ok: false, reason: 'Requires Echo Gallery classroom upgrade' };
  const moment = (echoesState.moments || []).find((m) => m.id === echoId);
  if (!moment) return { ok: false, reason: 'Echo not found' };
  if ((echoesState.resonated || []).includes(echoId)) return { ok: false, reason: 'Already resonated' };
  return { ok: true, apCost: V2_CONFIG.echoResonateAp, moment };
}

export function resonateEcho(echoesState, echoId) {
  return {
    ...echoesState,
    resonated: [...(echoesState.resonated || []), echoId],
    moments: (echoesState.moments || []).map((m) =>
      m.id === echoId ? { ...m, resonated: true } : m,
    ),
  };
}

export function echoDepthTier(replayCount) {
  if (replayCount >= 3) return 3;
  if (replayCount >= 1) return 2;
  return 1;
}
