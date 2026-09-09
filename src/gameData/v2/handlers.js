// ═══════════════════════════════════════════════════════════════
// V2.0 HANDLERS — game logic wired from ProfessorSim
// ═══════════════════════════════════════════════════════════════
import {
  canEmbody, startEmbodiment, endEmbodiment, applyEmbodimentAction,
  EMBODIMENT_ACTIONS,
} from './spiritEmbodiment.js';
import {
  canCreateLink, createResonanceLink, pulseResonance, shouldResonanceSurge,
  applyResonancePassiveBonus, applyResonanceSurgeBonus, getCombinedClassLbs, getResonanceTier,
} from './cravingResonance.js';
import { canRunRitual, FEAST_RITUALS } from './feastRituals.js';
import { captureEcho, captureEchoOnce, canResonateEcho, resonateEcho, replayEcho } from './bodyEcho.js';
import { getStage } from '../stages.js';
import {
  canTriggerDream, pickDreamScenario, recordDream, rollWeeklyDreams,
} from './appetiteDreams.js';
import { renderResonanceSurge } from '../../textEngine/scenes/v2/resonance/index.js';
import { createContext } from '../../textEngine/engine.js';
import {
  canEmbodiedMove,
  isEmbodiedImmobile,
  rollEmbodiedArrivalEvent,
  applyEmbodiedEvent,
  moveEmbodiment,
  recordEmbodiedEvent,
  applyTrustGrants,
  embodiedActionsAtNode,
  appendEmbodimentWalkLog,
} from './embodiedCampus.js';
import { V2_CONFIG } from './state.js';

export function resetV2Weekly(v2State) {
  return {
    ...v2State,
    embodiment: {
      ...v2State.embodiment,
      activeStudentId: null,
      usedThisWeek: 0,
      at: null,
      lastEventKey: null,
    },
  };
}

function echoCaptureWrap(v2State, echoes) {
  const before = v2State?.echoes?.moments?.length || 0;
  const after = echoes?.moments?.length || 0;
  return {
    v2State: { ...v2State, echoes },
    didCapture: after > before,
  };
}

export function captureStageUpEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEcho(v2State.echoes, {
    studentId, type: 'stage_up', week, stageId,
  }));
}

export function captureWeighInEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEcho(v2State.echoes, {
    studentId, type: 'weigh_in', week, stageId,
  }));
}

export function captureEvolutionEcho(v2State, studentId, week, stageId, formId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEcho(v2State.echoes, {
    studentId, type: 'evolution', week, stageId, meta: { formId },
  }));
}

export function captureFeedEcho(v2State, student, week, { forced = false, feast = false } = {}) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  const stageId = getStage(student?.lbs || 0).id;
  let type = null;
  if (forced && (student.timesForceFed || 0) <= 1) type = 'first_force_feed';
  else if (feast) type = 'dinner_unbutton';
  if (!type) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEchoOnce(v2State.echoes, {
    studentId: student.id, type, week, stageId,
  }));
}

export function captureDinnerUnbuttonEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEchoOnce(v2State.echoes, {
    studentId, type: 'dinner_unbutton', week, stageId,
  }));
}

export function captureImmobilityEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEchoOnce(v2State.echoes, {
    studentId, type: 'immobility', week, stageId,
  }));
}

export function captureCorruptionTierEcho(v2State, studentId, week, stageId, tierId) {
  if (!v2State?.echoes) return { v2State, didCapture: false };
  return echoCaptureWrap(v2State, captureEchoOnce(v2State.echoes, {
    studentId, type: 'corruption_tier', week, stageId, meta: { tierId },
  }));
}

export function runWeeklyV2Events(v2State, students, ownedSkills, ownedClassSkills, week) {
  let next = resetV2Weekly(v2State);
  const messages = [];

  // Resonance passive bonus — class-wide appetite calories before digest
  const passive = applyResonancePassiveBonus(students, next.resonance);
  if (passive.tier.passiveBonus > 0) {
    messages.push({ type: 'passive', tier: passive.tier.label, bonus: passive.tier.passiveBonus });
  }

  // Resonance surge — requires resonance_bells hall lounge upgrade
  if (shouldResonanceSurge(next.resonance, week, students, ownedClassSkills || {})) {
    next = {
      ...next,
      resonance: { ...next.resonance, lastSurgeWeek: week },
    };
    const ctx = createContext({ group: students.filter((s) => !s.hidden) });
    messages.push({ type: 'surge', text: renderResonanceSurge(ctx), applySurge: true });
  }

  // Weekly dream rolls — queue interactive dreams (resolved when player chooses)
  const dreamIds = rollWeeklyDreams(students, next.dreams, ownedSkills, week);
  for (const id of dreamIds) {
    const s = students.find((st) => st.id === id);
    if (!s) continue;
    const scenario = pickDreamScenario(s);
    messages.push({ type: 'dream', studentId: id, scenarioId: scenario.id, interactive: true });
  }

  return { v2State: next, messages, passiveStudents: passive.students };
}

export function handleEmbodimentStart(student, ctx) {
  const check = canEmbody(student, ctx);
  if (!check.ok) return { ok: false, reason: check.reason };
  const v2State = startEmbodiment(student.id, ctx.v2State);
  return { ok: true, apCost: check.apCost, v2State };
}

export function handleEmbodimentAction(action, student, v2State) {
  const act = EMBODIMENT_ACTIONS.find((a) => a.id === action.id) || action;
  const v2 = applyEmbodimentAction(v2State, act.id);
  return {
    ok: true,
    v2State: v2,
    calories: act.calories || 0,
    fullness: act.fullness || 0,
    rel: act.rel || 0,
    corruption: act.corruption || 0,
    scrutiny: act.scrutiny || 0,
  };
}

export function handleEmbodimentRelease(v2State, week = 1) {
  const studentId = v2State.embodiment?.activeStudentId ?? null;
  return {
    ok: true,
    v2State: endEmbodiment(v2State),
    echoStudentId: studentId,
    echoDigestWeek: week + 1,
    echoDigestMult: V2_CONFIG.embodimentEchoDigestMult,
  };
}

export function handleEmbodiedMove(student, fromId, toId, v2State, week, { students = [], rng = Math.random } = {}) {
  if (!canEmbodiedMove(fromId, toId, student)) {
    const reason = isEmbodiedImmobile(student)
      ? 'She cannot leave — too vast to move'
      : 'Cannot reach that location';
    return { ok: false, reason };
  }
  const event = rollEmbodiedArrivalEvent(student, toId, v2State.embodiment, { students, rng });
  let nextState = moveEmbodiment(v2State, toId);
  return { ok: true, v2State: nextState, event, fromId, toId, week, students };
}

export function handleEmbodiedEventResolve(student, event, v2State, { students = [], rng = Math.random } = {}) {
  if (!event) return { ok: true, v2State, student, trustGrants: [], scrutiny: 0 };
  const locked = students.filter((s) => s.lockState === 'locked');
  const applied = applyEmbodiedEvent(student, event, { lockedStudents: locked, rng });
  const nextState = recordEmbodiedEvent(v2State, event.eventKey, '');
  const patchedStudents = applyTrustGrants(students, applied.trustGrants);
  return {
    ok: true,
    v2State: nextState,
    student: applied.student,
    students: patchedStudents,
    trustGrants: applied.trustGrants,
    scrutiny: applied.scrutiny || 0,
  };
}

export function getEmbodiedCampusActions(student, nodeId, ownedSkills, ownedClassSkills) {
  return embodiedActionsAtNode(student, nodeId, ownedSkills, ownedClassSkills);
}

export function handleResonanceLink(aId, bId, students, v2State, ownedSkills, ownedClassSkills) {
  const check = canCreateLink(aId, bId, students, v2State.resonance, ownedSkills, ownedClassSkills);
  if (!check.ok) return { ok: false, reason: check.reason };
  const resonance = createResonanceLink(aId, bId, v2State.resonance, students);
  const relCost = check.relCost || 0;
  const relPatches = relCost > 0 ? [{ id: aId, relDelta: -relCost }, { id: bId, relDelta: -relCost }] : [];
  return {
    ok: true,
    apCost: check.apCost,
    relPatches,
    v2State: { ...v2State, resonance },
  };
}

export function handleRitual(ritualId, studentIds, ctx) {
  const check = canRunRitual(ritualId, studentIds, ctx);
  if (!check.ok) return { ok: false, reason: check.reason };
  const ritual = check.ritual;
  const effects = studentIds.map((id) => ({
    studentId: id,
    calories: ritual.caloriesEach,
    rel: ritual.relEach,
    corruption: ritual.corruptionEach,
  }));
  const rituals = {
    ...ctx.v2State.rituals,
    completed: {
      ...ctx.v2State.rituals.completed,
      [ritualId]: (ctx.v2State.rituals.completed[ritualId] || 0) + 1,
    },
    lastRitualWeek: ctx.week,
  };
  return {
    ok: true,
    apCost: ritual.apCost,
    effects,
    spiritFavor: ritualId === 'sacred_gluttony' ? V2_CONFIG.ritualSacredFavor : 0,
    v2State: { ...ctx.v2State, rituals },
  };
}

export function handleDreamChoice(scenario, choice, student, v2State, week) {
  const dreams = recordDream(v2State.dreams, student.id, week, scenario.id);
  return {
    ok: true,
    calories: choice.calories || 0,
    rel: choice.rel || 0,
    corruption: choice.corruption || 0,
    v2State: { ...v2State, dreams },
  };
}

export function handleEchoReplay(v2State, echoId) {
  return { v2State: { ...v2State, echoes: replayEcho(v2State.echoes, echoId) } };
}

export function handleEchoResonate(echoId, v2State, ownedSkills, ownedClassSkills) {
  const check = canResonateEcho(v2State.echoes, echoId, ownedSkills, ownedClassSkills);
  if (!check.ok) return { ok: false, reason: check.reason };
  const echoes = resonateEcho(v2State.echoes, echoId);
  return { ok: true, apCost: check.apCost, moment: check.moment, v2State: { ...v2State, echoes } };
}

export { applyResonanceSurgeBonus, getCombinedClassLbs, getResonanceTier } from './cravingResonance.js';

export function handleFeedResonancePulse(fedStudentId, calories, students, v2State) {
  const { pulses } = pulseResonance(fedStudentId, calories, students, v2State.resonance);
  if (!pulses.length) return { pulses: [], v2State };
  const totalPulses = (v2State.resonance.totalPulses || 0) + pulses.length;
  const classLbs = getCombinedClassLbs(students);
  const tier = getResonanceTier((v2State.resonance.links || []).length, classLbs);
  return {
    pulses,
    v2State: {
      ...v2State,
      resonance: { ...v2State.resonance, totalPulses, tier: tier.id },
    },
  };
}
