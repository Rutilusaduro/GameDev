// ═══════════════════════════════════════════════════════════════
// LAB + NETWORK DEPTH — hall blueprint synergies ↔ Talia mesh
// ═══════════════════════════════════════════════════════════════
import { getActiveBlueprintSynergies } from './hallBlueprint.js';

export function hallLabNetworkModifiers(ownedHallSkills = {}) {
  const active = getActiveBlueprintSynergies(ownedHallSkills);
  const ids = new Set(active.map((s) => s.id));
  const synergyCount = active.length;
  return {
    breakthroughBonus: (ids.has('institutional_whisper') ? 1 : 0) + (ids.has('legendary_flow') ? 1 : 0),
    meshThresholdReduction: synergyCount >= 2 ? 2 : ids.has('feast_corridor') ? 1 : 0,
    meshDripMult: ids.has('feast_corridor') ? 1.14 : synergyCount >= 1 ? 1.06 : 1,
    detectionRiskMult: ids.has('institutional_whisper') ? 0.82 : 1,
    integrationBonus: synergyCount * 0.6 + (ids.has('soft_permission') ? 1.5 : 0),
    instabilityEase: ids.has('scent_lane') ? 1 : 0,
  };
}

/** Extra breakthroughs on a saved lab session from hall investment. */
export function depthLabSessionBreakthroughBonus(ownedHallSkills = {}) {
  return hallLabNetworkModifiers(ownedHallSkills).breakthroughBonus;
}

/** Lower instability tick cost when sanctum/kitchen synergies align. */
export function depthLabSessionInstability(sessionInstability, ownedHallSkills = {}) {
  const ease = hallLabNetworkModifiers(ownedHallSkills).instabilityEase;
  return Math.max(3, (sessionInstability || 5) - ease);
}

/** Apply hall modifiers to a network week tick result (pure transform). */
export function depthNetworkTickAdjust(netTick, hallMods, rng = Math.random) {
  if (!netTick || !hallMods) return netTick;
  let studentDeltas = netTick.studentDeltas || [];
  if (hallMods.meshDripMult > 1 && studentDeltas.length) {
    studentDeltas = studentDeltas.map((d) => ({
      ...d,
      gainLbs: Math.max(1, Math.round(d.gainLbs * hallMods.meshDripMult)),
    }));
  }
  let scrutinyDelta = netTick.scrutinyDelta || 0;
  if (hallMods.detectionRiskMult < 1 && scrutinyDelta > 0 && rng() < 0.45) {
    scrutinyDelta = Math.max(0, scrutinyDelta - 1);
  }
  const labState = netTick.labState;
  let nextLab = labState;
  if (labState?.network && hallMods.integrationBonus > 0) {
    nextLab = {
      ...labState,
      network: {
        ...labState.network,
        integration: Math.min(
          100,
          Math.round((labState.network.integration ?? 45) + hallMods.integrationBonus),
        ),
      },
    };
  }
  return { ...netTick, studentDeltas, scrutinyDelta, labState: nextLab };
}

/** Lower automation threshold when hall routes calories institutionally. */
export function depthNetworkAutomationThreshold(baseThreshold, hallMods) {
  const cut = hallMods?.meshThresholdReduction ?? 0;
  return Math.max(8, baseThreshold - cut);
}
