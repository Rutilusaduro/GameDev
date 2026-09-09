// The Squad — Lead: A4 Architect | Support: A2 Psych
// ═══════════════════════════════════════════════════════════════
// GATEWAY MOMENTS — per-resident "signature threshold" diary unlocks.
//
// The highest-weight (5) diary entries in diary.js are gated behind a
// per-student boolean — brittanyUniformStrained, kyliePrivateMoment,
// fionaSelfPhotographed, … — that represents "her signature threshold beat
// has happened." These flags were authored (init false in students.js, read
// in diary.js) but were never SET and never exposed to the selector engine,
// so every one of those payoff entries was permanently unreachable.
//
// This module is the single source of truth that closes both gaps:
//   • gatewayFlagPatch()       — sets a flag in the weekly gain / stage path.
//   • gatewaySelectorGlobals() — exposes the flags (plus a derived isImmobile)
//                                to the diary render context so the gated
//                                entries can actually match.
//
// Two trigger styles, by whether her archetype has a narrative event:
//   • eventId  — flag set once her signature NARRATIVE_EVENTS beat has fired
//                (the public moment IS the gate). Read from triggeredEvents so
//                it catches the event whenever it happened, on any gain path.
//   • stageMin — for archetypes with no narrative event, the private reckoning
//                lands when she settles into the stage her diary speaks from.
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';

export const GATEWAY_MOMENTS = [
  // Event-gated — her signature public beat is the gate.
  { studentId: 0,  flag: 'brittanyUniformStrained', eventId: 'uniform_split' },
  { studentId: 2,  flag: 'kyliePrivateMoment',      eventId: 'viral_post' },
  { studentId: 4,  flag: 'fionaSelfPhotographed',   eventId: 'art_exhibition' },
  { studentId: 6,  flag: 'tiffanySatDownAtTable',   eventId: 'intervention_fails' },
  // Stage-gated — no archetype narrative event; reckoning lands at the gate stage.
  { studentId: 10, flag: 'reneePotNightEating',     stageMin: 4 },
  { studentId: 12, flag: 'nadiaBracketsNote',       stageMin: 5 },
  { studentId: 13, flag: 'daisyPermissionSlip',     stageMin: 4 },
  { studentId: 16, flag: 'sophiaAnnotatedLog',      stageMin: 4 },
  { studentId: 18, flag: 'taliaScaleSurprise',      stageMin: 6 },
];

export const GATEWAY_FLAG_KEYS = GATEWAY_MOMENTS.map((g) => g.flag);

/**
 * Patch of any gateway flags newly unlocked for this student at her current
 * stage. Event-gated flags read student.triggeredEvents (so they catch the
 * signature beat whenever it fired); stage-gated flags compare newStageId to
 * the gate stage. Only sets flags not already true — returns {} when nothing
 * changes, so it is always safe to spread onto the student.
 *
 * @param {object} student   student snapshot (with up-to-date triggeredEvents)
 * @param {number} newStageId  the student's current weight-stage id
 */
export function gatewayFlagPatch(student, newStageId = 0) {
  if (!student) return {};
  const triggered = student.triggeredEvents || [];
  const patch = {};
  for (const g of GATEWAY_MOMENTS) {
    if (g.studentId !== student.id || student[g.flag]) continue;
    const byEvent = g.eventId && triggered.includes(g.eventId);
    const byStage = g.stageMin != null && newStageId >= g.stageMin;
    if (byEvent || byStage) patch[g.flag] = true;
  }
  return patch;
}

/**
 * Selector globals so the diary's `when: { <flag>: true }` gates can match.
 * renderDiary builds its context via createContext directly (no buildTextGlobals),
 * so the persisted gateway booleans have to be handed in as globals here.
 * Also derives isImmobile (top-stage or an explicit immobile flag) for the
 * immobility diary entries, which had the same dead-selector problem.
 */
export function gatewaySelectorGlobals(student) {
  if (!student) return {};
  const globals = {};
  for (const key of GATEWAY_FLAG_KEYS) globals[key] = !!student[key];
  globals.isImmobile = !!student.isImmobile || getStage(student.lbs ?? 0).id >= 10;
  return globals;
}
