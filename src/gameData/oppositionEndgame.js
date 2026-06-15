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

  return {
    institutionalCapture: compromised >= 3,
    compromisedCount: compromised,
    scarcityBanished: !!supernatural.actTriggered && (supernatural.scarcityPressure || 0) <= 0,
    refedThinCount: refedThin,
    ascendedCount: ascended.length,
  };
}

/** Weekly scarcity drain when ascended students are well-fed. */
export function tickScarcityBanishment(opposition, students) {
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

  return {
    ...opposition,
    supernatural: { ...opposition.supernatural, scarcityPressure: pressure },
  };
}
