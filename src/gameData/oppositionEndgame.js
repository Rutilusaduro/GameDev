// ═══════════════════════════════════════════════════════════════
// OPPOSITION ENDGAME — capture & scarcity banishment (§33)
// ═══════════════════════════════════════════════════════════════

import { getStage } from './stages.js';

export function checkOppositionEndgame(opposition, students) {
  const members = opposition?.aib?.members || [];
  const compromised = members.filter((m) => m.stance === 'compromised').length;
  const supernatural = opposition?.supernatural || {};
  const ascended = (students || []).filter((s) => s.supernaturalForm);
  const refedThin = ascended.filter((s) => getStage(s.lbs).id >= 6).length;
  const vanceCompromised = members.some((m) => m.id === 'vance' && m.stance === 'compromised');

  return {
    institutionalCapture: compromised >= 4,
    compromisedCount: compromised,
    scarcityBanished: !!supernatural.actTriggered && (supernatural.scarcityPressure || 0) <= 0,
    refedThinCount: refedThin,
    ascendedCount: ascended.length,
    allThinAscended: ascended.length > 0 && ascended.every((s) => !!s.supernaturalForm),
    vanceCompromised,
    scarcityCapped: compromised >= 4 && (supernatural.scarcityPressure || 0) <= 60,
  };
}

/** Weekly scarcity drain when ascended residents are well-fed. */
export function tickScarcityBanishment(opposition, students, extras = {}) {
  if (!opposition?.supernatural?.actTriggered) return opposition;
  let pressure = opposition.supernatural.scarcityPressure || 0;
  if (pressure <= 0) return opposition;

  const ascended = (students || []).filter((s) => s.supernaturalForm);
  if (!ascended.length) return opposition;

  const avgStage = ascended.reduce((a, s) => a + getStage(s.lbs).id, 0) / ascended.length;
  if (avgStage >= 5) pressure = Math.max(0, pressure - 2);
  else if (avgStage >= 3) pressure = Math.max(0, pressure - 1);

  const refedCount = ascended.filter((s) => getStage(s.lbs).id >= 6).length;
  if (refedCount >= 3) pressure = Math.max(0, pressure - 3);
  if (extras.leftoverKitchen) pressure = Math.max(0, pressure - 2);
  if (extras.nightRound) pressure = Math.max(0, pressure - 1);

  return {
    ...opposition,
    supernatural: { ...opposition.supernatural, scarcityPressure: pressure },
  };
}
