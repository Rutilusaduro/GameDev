// The Squad — Lead: A3 Immobility | Support: A4 Architect
// ═══════════════════════════════════════════════════════════════
// IMMOBILITY ARRIVAL — "The Settling": the weight endgame.
//
// The evolved-form Arrival capstones (arrivalCapstones.js) give a repeatable
// endgame loop, but they are gated on evolvedForm. Immobility — the natural
// physical endgame any girl reaches at stage 10+ (blob / leviathan) — had only
// descriptive prose and two one-shot narrative beats, no loop and no sense of
// culmination for a girl who simply grows enormous. This is its capstone:
//
//   • Hold Court — a repeatable activity for any immobile girl. You bring the
//     day to her where she rests; she settles deeper and the bond deepens.
//   • Settling — once she has Arrived, sustained care keeps her gently growing
//     without active feeding (the kept, set-and-forget endgame reward).
//
// Two tiers, by lived scale (never named in player prose — the engine gates
// on stage, the text describes the room arranging itself around her):
//   tier 1 — settled in place (stage 10)
//   tier 2 — the room's whole gravity (stage 11)
//
// Mirrors the arrivalCapstones.js shape so ProfessorSim/StudentDetailView wire
// it the same way (getX / markX / run-on-button).
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';

// Blob+. The threshold where movement becomes optional and care comes to her.
export const IMMOBILITY_THRESHOLD = 10;

export const IMMOBILITY_ARRIVAL = {
  apCost: 2,
  label: 'Hold Court',
  desc: 'She has arrived at her settled size. Court her where she rests — bring her the day, tend her vastness, and let her go on settling deeper into being kept.',
  gain: [5, 10],
  rel: 6,
  settlePassive: [2, 5], // weekly passive lbs once Arrived
};

/** 0 = mobile, 1 = settled (stage 10), 2 = the room's gravity (stage 11). */
export function getImmobilityTier(student) {
  const id = getStage(student?.lbs ?? 0).id;
  if (id >= 11) return 2;
  if (id >= IMMOBILITY_THRESHOLD) return 1;
  return 0;
}

/** The repeatable Hold Court capstone for an immobile girl, or null. */
export function getImmobilityArrival(student) {
  if (!student) return null;
  const tier = getImmobilityTier(student);
  if (tier < 1) return null;
  return {
    ...IMMOBILITY_ARRIVAL,
    tier,
    firstUnlock: !(student.immobilityArrived ?? false),
  };
}

export function markImmobilityArrived(student) {
  return { ...student, immobilityArrived: true };
}

/**
 * Passive weekly "settling" gain. Once she has Arrived at immobility, sustained
 * care keeps her gently growing without active feeding — the permanent,
 * set-and-forget reward of the endgame. Returns 0 until she has both reached
 * immobility and had her first Hold Court.
 */
export function immobilitySettleGain(student, rng = Math.random) {
  if (!student?.immobilityArrived || getImmobilityTier(student) < 1) return 0;
  const [lo, hi] = IMMOBILITY_ARRIVAL.settlePassive;
  return lo + Math.floor(rng() * (hi - lo + 1));
}
