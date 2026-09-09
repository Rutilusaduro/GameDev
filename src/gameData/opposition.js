// ═══════════════════════════════════════════════════════════════
// OPPOSITION — Academic Inquiry Board & escalation (§29–33)
// ═══════════════════════════════════════════════════════════════

import { getStage } from './stages.js';
import { digestNpc } from './gainSystem.js';
import { applySupernaturalAgendaHook } from './supernaturalForms.js';
import {
  isBoardDormant, pickActIRumor, computeClassTransformationPressure,
} from './oppositionActs.js';
import {
  oppositionUnlockLine, oppositionProxyLine, supernaturalActLine, agendaResolveLine, counterSuccessLine,
} from './oppositionText.js';
import {
  counterGateReason, getEvolvedOpMessage, proxyUnlockFlags, recordCounterType, wellnessScrutinyBonus,
} from './oppositionIntegration.js';

export const AIB_MEMBERS = [
  { id: 'vance', name: 'Dr. Helena Vance', role: 'Chair, Dean of Student Life', resolve: 85, corruption: 0, weightLbs: 145, stance: 'hostile' },
  { id: 'orr', name: 'Martin Orr', role: 'Compliance Officer', resolve: 70, corruption: 0, weightLbs: 162, stance: 'hostile' },
  { id: 'jin', name: 'Dr. Priya Jin', role: 'Housing Council', resolve: 60, corruption: 0, weightLbs: 138, stance: 'hostile' },
  { id: 'washburn', name: 'Coach Dana Washburn', role: 'Athletics Liaison', resolve: 75, corruption: 0, weightLbs: 178, stance: 'hostile' },
  { id: 'platt', name: 'Ms. Evelyn Platt', role: 'Registrar Proxy', resolve: 65, corruption: 0, weightLbs: 152, stance: 'hostile' },
];

export const ROTATING_ADVOCATES = [
  { id: 'advocate_1', name: 'Jordan Ellis', role: 'Student Advocate (rotating)', resolve: 55, corruption: 0, weightLbs: 128, stance: 'neutral', personality: 'sympathetic' },
  { id: 'advocate_2', name: 'Sam Okonkwo', role: 'Student Advocate (rotating)', resolve: 50, corruption: 0, weightLbs: 134, stance: 'neutral', personality: 'procedural' },
  { id: 'advocate_3', name: 'Riley Chen', role: 'Student Advocate (rotating)', resolve: 60, corruption: 0, weightLbs: 122, stance: 'neutral', personality: 'activist' },
];

export const AIB_AGENDA_CARDS = [
  { id: 'wellness_audit', minScrutiny: 50, label: 'Wellness Audit', scrutiny: 8, message: '📋 AIB wellness audit — a student is flagged for assessment.', effect: 'wellness_audit' },
  { id: 'device_confiscation', minScrutiny: 60, label: 'Device Confiscation', scrutiny: 10, message: '🔧 Compliance confiscates a lab device for review.', effect: 'device_confiscation' },
  { id: 'size_review', minScrutiny: 55, label: 'Floor Size Review', scrutiny: 9, message: '⚖️ Board demands documented weigh-ins for the hall.', effect: 'size_review' },
  { id: 'wellness_seminar', minScrutiny: 50, label: 'Wellness Seminar', scrutiny: 6, message: '📢 Mandatory wellness seminar dampens campus appetite.', effect: 'wellness_seminar' },
  { id: 'budget_freeze', minScrutiny: 75, label: 'Budget Freeze', scrutiny: 5, money: -200, message: '💸 Department budget frozen pending review.', effect: 'budget_freeze' },
  { id: 'removal_hearing', minScrutiny: 90, label: 'Removal Hearing', scrutiny: 12, message: '⚠️ Student removal hearing opened.', effect: 'removal_hearing' },
  { id: 'mandatory_fitness', minScrutiny: 40, label: 'Mandatory Fitness', scrutiny: 5, message: '🏃 Wellness Coalition orders fitness assessments.', effect: 'mandatory_fitness', proxy: 'wellnessCoalition' },
  { id: 'shame_vigil', minScrutiny: 45, label: 'Shame Vigil', scrutiny: 7, message: '🕯️ Ascetic Circle vigil — shame ripples through the hall.', effect: 'shame_vigil', proxy: 'asceticCircle' },
  { id: 'faculty_informant', minScrutiny: 55, label: 'Staff Informant', scrutiny: 4, message: '📝 Staff informant briefs the Board on your hall.', effect: 'faculty_informant' },
  { id: 'student_advocacy', minScrutiny: 35, label: 'Student Advocacy Session', scrutiny: 4, message: '📣 Rotating advocate schedules a student voice session.', effect: 'student_advocacy' },
];

export const AIB_COUNTERS = [
  { id: 'feast_bribe', label: 'Feast Bribe', ap: 3, resolveHit: 5, scrutiny: -8, desc: 'Pause AIB actions one week with a lavish feast.' },
  { id: 'public_discredit', label: 'Public Discredit', ap: 2, resolveHit: 10, scrutiny: -10, desc: 'Remove one agenda card type from the deck permanently.' },
  { id: 'bureaucratic_capture', label: 'Bureaucratic Capture', ap: 2, resolveHit: 15, scrutiny: -5, desc: 'Convert a wavering member (resolve ≤ 40) to compromised.' },
  { id: 'spirit_pressure', label: 'Floor Pressure', ap: 1, resolveHit: 8, scrutiny: -3, desc: 'Force the top agenda card to misfire harmlessly.' },
  { id: 'evolved_student_op', label: 'Evolved Student Operation', ap: 2, resolveHit: 0, scrutiny: -5, desc: 'An evolved student delays the top agenda card one week.' },
  { id: 'machine_fatten', label: 'Machine Fattening', ap: 2, resolveHit: 12, scrutiny: 5, desc: 'Growth chamber targets a board member (+lbs, −resolve, scandal risk).' },
  { id: 'faculty_testimony', label: 'Staff Testimony', ap: 1, resolveHit: 0, scrutiny: -4, desc: 'Staff ally cancels informant effects for two weeks.' },
  { id: 'lilith_hunt', label: 'Lilith AIB Hunt', ap: 1, resolveHit: 20, scrutiny: -15, desc: 'Mark a board member for Lilith\'s hunt map (difficulty 4).', path: 'lilith' },
  { id: 'compound_seduction', label: 'Compound Seduction', ap: 2, resolveHit: 8, scrutiny: -6, desc: 'Sophia seduces staff lounge intel — slows scrutiny.', path: 'pharmacist' },
  { id: 'network_misdirect', label: 'Network Misdirect', ap: 1, resolveHit: 0, scrutiny: -5, desc: 'Lab network buries scandal traces — detection risk on fail.', path: 'network' },
];

export function getAvailableCounters(opposition, students, ctx = {}) {
  const hasEvolved = students.some((s) => s.evolvedForm);
  const agendaLen = opposition?.aib?.agendaQueue?.length || 0;
  return AIB_COUNTERS.filter((c) => {
    if (c.id === 'evolved_student_op' && !hasEvolved) return false;
    if (c.id === 'spirit_pressure' && agendaLen === 0) return false;
    if (c.path === 'lilith' && (!ctx.lilithUnlocked || !students.some((s) => s.id === 15))) return false;
    if (c.path === 'pharmacist' && ((ctx.pharmacistStage ?? 0) < 2 || !students.some((s) => s.evolvedForm === 'pharmacist'))) return false;
    if (c.path === 'network' && (ctx.networkStage ?? 1) < 2) return false;
    const gate = counterGateReason(c, ctx);
    if (gate) return false;
    return true;
  });
}

export function getCounterGateHints(ctx = {}) {
  return AIB_COUNTERS.map((c) => ({ id: c.id, gate: counterGateReason(c, ctx) })).filter((x) => x.gate);
}

export function defaultOppositionState() {
  return {
    aib: {
      unlocked: false,
      members: AIB_MEMBERS.map((m) => ({ ...m })),
      rotatingAdvocate: null,
      advocateRotateWeek: 0,
      agendaQueue: [],
      deckRemoved: [],
      scandalMeter: 0,
      truceWeeks: 0,
      informantShieldWeeks: 0,
      activeDebuffs: {
        gainMult: 1,
        gainMultWeeks: 0,
        budgetFrozenWeeks: 0,
        forcedWeighInWeek: null,
      },
      pendingHearing: null,
      emergencyHearingDue: false,
      pendingForcedWeighInStudentId: null,
      markedForHunt: null,
    },
    proxies: {
      wellnessCoalition: false,
      accreditation: false,
      asceticCircle: false,
      observerName: null,
    },
    supernatural: {
      actTriggered: false,
      actWeek: null,
      scarcityPressure: 0,
      curseQueue: [],
      ascensionOffered: false,
      famineWeek: false,
      portionSaintConsumed: false,
      synthesisAlly: false,
    },
    meta: {
      aibUnlockWeek: null,
      supernaturalAnnounced: false,
      rumorCount: 0,
      counterTypesUsed: [],
      investigationReached: false,
      jointSeminarFired: false,
      archivistDiscreditUsed: false,
      echoedWillSpentWeek: null,
    },
  };
}

function pickRandomVisible(students, rnd = Math.random) {
  const vis = students.filter((s) => !s.hidden);
  if (!vis.length) return null;
  return vis[Math.floor(rnd() * vis.length)];
}

function drawAgendaCard(opposition, scrutiny, rnd = Math.random, saturationTier = 0) {
  const removed = new Set(opposition.aib.deckRemoved || []);
  let pool = AIB_AGENDA_CARDS.filter((c) => {
    if (scrutiny < c.minScrutiny || removed.has(c.id)) return false;
    if (c.id === 'wellness_seminar' && saturationTier < 1) return false;
    if (c.id === 'faculty_informant' && !opposition.meta?.facultyInformantActive) return false;
    return true;
  });
  if (opposition.proxies?.wellnessCoalition) {
    pool = [...pool, ...AIB_AGENDA_CARDS.filter((c) => c.proxy === 'wellnessCoalition' && !removed.has(c.id))];
  }
  if (opposition.proxies?.asceticCircle) {
    pool = [...pool, ...AIB_AGENDA_CARDS.filter((c) => c.proxy === 'asceticCircle' && !removed.has(c.id))];
  }
  const unique = [...new Map(pool.map((c) => [c.id, c])).values()];
  if (!unique.length) return null;
  return unique[Math.floor(rnd() * unique.length)];
}

export function unlockOppositionIfNeeded(opposition, scrutiny, week = 1) {
  if (opposition.aib.unlocked) return opposition;
  if (scrutiny < 25) return opposition;
  return {
    ...opposition,
    aib: { ...opposition.aib, unlocked: true },
    meta: { ...opposition.meta, aibUnlockWeek: week },
  };
}

function tickMemberStances(members) {
  return members.map((m) => {
    let { resolve, stance, corruption, weightLbs } = m;
    if (corruption >= 67) resolve = Math.max(0, resolve - 10);
    if (corruption >= 50 && stance !== 'compromised') stance = 'compromised';
    else if (resolve < 20 && stance === 'hostile') stance = 'wavering';
    else if (resolve < 20 && stance === 'wavering') stance = 'compromised';
    else if (resolve < 40 && stance === 'hostile') stance = 'wavering';
    if (weightLbs >= 195) resolve = Math.max(0, resolve - 3);
    return { ...m, resolve, stance };
  });
}

/** Latent Appetite — non-evolved students gain corruption when Supernatural Act is active (§29 design). */
export function applyLatentAppetiteWeek(students, opposition, rnd = Math.random) {
  if (!opposition?.supernatural?.actTriggered) return { students, patches: [], logs: [] };
  const logs = [];
  const patches = [];
  const updated = students.map((s) => {
    if (s.hidden || s.evolvedForm || s.supernaturalForm) return s;
    if (rnd() > 0.45) return s;
    const delta = rnd() < 0.3 ? 2 : 1;
    patches.push({ id: s.id, corruptionDelta: delta });
    logs.push(`👁 Latent appetite — ${s.name} feels the hollow pull (+${delta} corruption).`);
    return { ...s, corruption: Math.min(100, (s.corruption || 0) + delta) };
  });
  return { students: updated, patches, logs };
}

export function getOppositionGainMult(opposition) {
  const debuffs = opposition?.aib?.activeDebuffs;
  if (!debuffs || debuffs.gainMultWeeks <= 0) return 1;
  return debuffs.gainMult ?? 1;
}

export function getAibScrutinyMod(opposition, students = []) {
  if (!opposition?.aib?.unlocked) return 0;
  const compromised = opposition.aib.members.filter((m) => m.stance === 'compromised').length;
  let mod = compromised >= 3 ? -2 : 0;
  mod += getAdvocateScrutinyMod(opposition.aib.rotatingAdvocate);
  if (opposition.proxies?.wellnessCoalition) mod += 1 + wellnessScrutinyBonus(students);
  if (opposition.aib.informantShieldWeeks > 0) mod -= 1;
  return mod;
}

export function getOversightTelegraph(opposition) {
  const queue = opposition?.aib?.agendaQueue || [];
  if (!queue.length) return null;
  const next = queue[0];
  const hint = getAgendaCounterHint(next.cardId);
  const base = `👁 AIB agenda pending: ${next.label} (week ${next.resolvesWeek})`;
  return hint ? `${base} · Counter: ${hint}` : base;
}

const AGENDA_COUNTER_HINTS = {
  wellness_audit: 'feast bribe or evolved student op',
  device_confiscation: 'spirit pressure or evolved student op',
  size_review: 'complete mandatory weigh-in or discredit',
  wellness_seminar: 'feast bribe',
  budget_freeze: 'public discredit or feast bribe',
  removal_hearing: 'hearing scene — discredit + spirit pressure',
  mandatory_fitness: 'evolved student op',
  shame_vigil: 'Apple Oracle shields some students',
  faculty_informant: 'faculty testimony',
  student_advocacy: 'feast bribe or high class relationship',
};

export function getAgendaCounterHint(cardId) {
  return AGENDA_COUNTER_HINTS[cardId] || null;
}

function resolveAgendaEffect(card, students, opposition, rnd = Math.random) {
  const effects = { studentPatches: [], scrutinyDelta: 0, moneyDelta: card.money || 0, oppositionPatch: {}, logs: [] };

  switch (card.effect) {
    case 'wellness_audit': {
      const target = pickRandomVisible(students, rnd);
      if (target) {
        effects.studentPatches.push({ id: target.id, relDelta: -8, mood: 'ashamed' });
        effects.logs.push(`📋 ${target.name} flagged in wellness audit (−8 rel).`);
      }
      break;
    }
    case 'device_confiscation':
      effects.oppositionPatch.pendingDeviceConfiscation = true;
      effects.logs.push('🔧 A device will be confiscated unless countered.');
      break;
    case 'size_review': {
      const target = pickRandomVisible(students, rnd);
      effects.oppositionPatch.activeDebuffs = {
        ...opposition.aib.activeDebuffs,
        forcedWeighInWeek: true,
      };
      if (target) {
        effects.oppositionPatch.pendingForcedWeighInStudentId = target.id;
        effects.logs.push(`⚖️ ${target.name} flagged for mandatory class weigh-in.`);
      }
      effects.scrutinyDelta += 3;
      effects.logs.push('⚖️ Class weigh-in documentation demanded (+3 scrutiny).');
      break;
    }
    case 'wellness_seminar':
      effects.oppositionPatch.activeDebuffs = {
        ...opposition.aib.activeDebuffs,
        gainMult: 0.85,
        gainMultWeeks: 1,
      };
      effects.logs.push('📢 Wellness seminar — class gain −15% this week.');
      break;
    case 'budget_freeze':
      effects.oppositionPatch.activeDebuffs = {
        ...opposition.aib.activeDebuffs,
        budgetFrozenWeeks: Math.max(opposition.aib.activeDebuffs?.budgetFrozenWeeks || 0, 2),
      };
      break;
    case 'removal_hearing': {
      const heavy = students.filter((s) => !s.hidden && getStage(s.lbs).id >= 9);
      const target = heavy.length ? heavy[Math.floor(rnd() * heavy.length)] : pickRandomVisible(students, rnd);
      if (target) {
        effects.oppositionPatch.pendingHearing = { studentId: target.id, resolvesWeek: null };
        effects.logs.push(`⚠️ Removal hearing opened for ${target.name}.`);
      }
      break;
    }
    case 'mandatory_fitness': {
      const target = pickRandomVisible(students, rnd);
      if (target) {
        effects.studentPatches.push({ id: target.id, relDelta: -5, hungerDelta: 2 });
        effects.logs.push(`🏃 ${target.name} ordered to fitness assessment (−5 rel, +hunger).`);
      }
      break;
    }
    case 'shame_vigil':
      effects.studentPatches.push(
        ...students.filter((s) => !s.hidden && s.supernaturalForm !== 'apple_oracle').map((s) => ({ id: s.id, corruptionDelta: -5 })),
      );
      if (students.some((s) => s.supernaturalForm === 'apple_oracle')) {
        effects.logs.push('🍎 Apple Oracle shields the homeroom from shame — one student untouched.');
      }
      effects.logs.push('🕯️ Shame vigil — corruption −5 for visible students.');
      break;
    case 'faculty_informant':
      if ((opposition.aib.informantShieldWeeks || 0) <= 0) {
        effects.scrutinyDelta += 4;
        effects.logs.push('📝 Faculty informant escalates Board scrutiny (+4).');
      } else {
        effects.logs.push('📝 Informant report filed — faculty testimony shields you.');
      }
      break;
    case 'student_advocacy': {
      const advocate = opposition.aib.rotatingAdvocate;
      const visible = students.filter((s) => !s.hidden);
      const avgRel = visible.length
        ? visible.reduce((a, s) => a + (s.relationship || 0), 0) / visible.length
        : 0;
      if (advocate && (advocate.stance === 'neutral' || advocate.stance === 'compromised' || advocate.stance === 'wavering' || avgRel >= 50)) {
        effects.scrutinyDelta -= 3;
        effects.oppositionPatch.agendaDelay = true;
        effects.logs.push(`📣 ${advocate.name} amplifies student voice — scrutiny −3, top agenda delayed.`);
      } else if (advocate?.personality === 'activist') {
        effects.scrutinyDelta -= 1;
        effects.logs.push(`📣 ${advocate.name} files a dissent — scrutiny −1.`);
      } else {
        const target = pickRandomVisible(students, rnd);
        if (target) {
          effects.studentPatches.push({ id: target.id, relDelta: -4 });
          effects.logs.push(`📣 Advocacy session backfires — ${target.name} singled out (−4 rel).`);
        }
        effects.scrutinyDelta += 2;
      }
      break;
    }
    default:
      break;
  }
  return applySupernaturalAgendaHook(card.effect, students, effects);
}

function tickDebuffs(debuffs) {
  const next = { ...debuffs };
  if (next.gainMultWeeks > 0) {
    next.gainMultWeeks -= 1;
    if (next.gainMultWeeks <= 0) next.gainMult = 1;
  }
  if (next.budgetFrozenWeeks > 0) next.budgetFrozenWeeks -= 1;
  if (next.forcedWeighInWeek === true) next.forcedWeighInWeek = null;
  return next;
}

function rotateAdvocate(opposition, week, students = []) {
  const rotateEvery = 6;
  let advocate;
  if (opposition.aib.rotatingAdvocate && week - (opposition.aib.advocateRotateWeek || 0) < rotateEvery) {
    advocate = { ...opposition.aib.rotatingAdvocate };
  } else {
    const idx = Math.floor(week / rotateEvery) % ROTATING_ADVOCATES.length;
    advocate = { ...ROTATING_ADVOCATES[idx] };
  }
  return tickAdvocateStance(advocate, students);
}

function tickAdvocateStance(advocate, students = []) {
  if (!advocate) return advocate;
  let { resolve, stance, corruption } = advocate;
  const visible = students.filter((s) => !s.hidden);
  const avgRel = visible.length
    ? visible.reduce((a, s) => a + (s.relationship || 0), 0) / visible.length
    : 0;
  const evolvedCount = visible.filter((s) => s.evolvedForm).length;
  if (corruption >= 50) stance = 'compromised';
  else if (avgRel >= 55 || evolvedCount >= 3) {
    if (stance === 'hostile') stance = 'wavering';
    else if (stance === 'wavering' || stance === 'neutral') stance = 'neutral';
    resolve = Math.min(100, resolve + 2);
  } else if (avgRel < 30) {
    resolve = Math.max(0, resolve - 2);
    if (resolve < 45 && stance === 'neutral') stance = 'wavering';
  }
  if (advocate.personality === 'sympathetic' && avgRel >= 45) resolve = Math.min(100, resolve + 1);
  if (advocate.personality === 'activist' && evolvedCount >= 2) resolve = Math.min(100, resolve + 2);
  return { ...advocate, resolve, stance, corruption };
}

export function getAdvocateScrutinyMod(advocate) {
  if (!advocate) return 0;
  if (advocate.stance === 'compromised') return -2;
  if (advocate.stance === 'neutral' || advocate.stance === 'wavering') return -1;
  if (advocate.personality === 'activist') return 0;
  return 1;
}

export function runAibCounter(opposition, counterId, memberId, options = {}) {
  const counter = AIB_COUNTERS.find((c) => c.id === counterId);
  if (!counter) return { opposition, message: null, scrutinyDelta: 0, apCost: 0 };
  let next = { ...opposition, aib: { ...opposition.aib, members: [...opposition.aib.members] } };

  if (counterId === 'feast_bribe') {
    next.aib.truceWeeks = Math.max(next.aib.truceWeeks, 1);
    next.aib.members = next.aib.members.map((m) => ({ ...m, resolve: Math.max(0, m.resolve - counter.resolveHit) }));
    return { opposition: { ...next, meta: recordCounterType(next.meta, counterId) }, message: counterSuccessLine(counterId) || '🍷 Feast bribe accepted. AIB pauses this week.', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'public_discredit') {
    const cardId = options.cardId;
    const pool = AIB_AGENDA_CARDS.map((c) => c.id).filter((id) => !next.aib.deckRemoved.includes(id));
    const archivistFree = options.archivistDiscreditFree;
    const removeId = cardId && pool.includes(cardId) ? cardId : pool[Math.floor(Math.random() * pool.length)];
    if (!removeId && !archivistFree) return { opposition: next, message: '⚠️ No agenda cards left to discredit.', scrutinyDelta: 0, apCost: counter.ap, moneyDelta: 0 };
    if (removeId) {
      next.aib.deckRemoved = [...next.aib.deckRemoved, removeId];
      next.aib.agendaQueue = next.aib.agendaQueue.filter((q) => q.cardId !== removeId);
    }
    const label = removeId ? (AIB_AGENDA_CARDS.find((c) => c.id === removeId)?.label || removeId) : 'agenda pressure';
    next.aib.members = next.aib.members.map((m) => ({ ...m, resolve: Math.max(0, m.resolve - 3) }));
    const meta = recordCounterType(next.meta, counterId);
    if (archivistFree) meta.archivistDiscreditUsed = true;
    return {
      opposition: { ...next, meta },
      message: archivistFree
        ? `📚 Archivist Skin — discredit lands unchallenged: ${label}.`
        : (counterSuccessLine(counterId) || `📰 Discredited: ${label}. Card removed from deck.`),
      scrutinyDelta: counter.scrutiny,
      apCost: archivistFree ? 0 : counter.ap,
      moneyDelta: 0,
    };
  }
  if (counterId === 'spirit_pressure' && next.aib.agendaQueue.length) {
    if (options.spendEchoedWill && !options.spendEchoedWill()) {
      return { opposition: next, message: '⚠️ Echoed Will spent — nothing left to press.', scrutinyDelta: 0, apCost: 0, moneyDelta: 0 };
    }
    const misfired = next.aib.agendaQueue[0];
    next.aib.agendaQueue = next.aib.agendaQueue.slice(1);
    const misfireMsg = counterSuccessLine(counterId)
      || (misfired?.cardId === 'removal_hearing'
        ? '👁 Floor pressure — removal hearing misfires into mandatory tasting.'
        : '👁 Floor pressure — agenda misfires into mandatory tasting.');
    return { opposition: { ...next, meta: recordCounterType(next.meta, counterId) }, message: misfireMsg, scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'evolved_student_op' && next.aib.agendaQueue.length) {
    next.aib.agendaQueue = next.aib.agendaQueue.map((item, i) => (
      i === 0 ? { ...item, resolvesWeek: item.resolvesWeek + 1 } : item
    ));
    const msg = options.evolvedOpMessage || '✦ Evolved student operation — top agenda delayed one week.';
    return {
      opposition: { ...next, meta: recordCounterType(next.meta, counterId) },
      message: msg,
      scrutinyDelta: counter.scrutiny,
      apCost: counter.ap,
      moneyDelta: 0,
    };
  }
  if (counterId === 'machine_fatten' && memberId) {
    const scandalRoll = Math.random();
    next.aib.members = next.aib.members.map((m) => {
      if (m.id !== memberId) return m;
      const cals = rndRange(28000, 42000);
      const fed = {
        ...m,
        stomachCapacity: m.stomachCapacity || 80,
        consumedCalories: (m.consumedCalories || 0) + cals,
        fullness: Math.min((m.fullness || 0) + 30, 110),
      };
      const dig = digestNpc(fed);
      const newResolve = Math.max(0, m.resolve - counter.resolveHit);
      const newStance = newResolve < 40 && m.stance === 'hostile' ? 'wavering' : m.stance;
      return {
        ...fed,
        weightLbs: dig.weightLbs,
        resolve: newResolve,
        stance: newStance,
        ...dig.reset,
      };
    });
    if (scandalRoll > 0.55) {
      next.aib.scandalMeter = Math.min(100, next.aib.scandalMeter + 15);
      return { opposition: next, message: '🧪 Chamber session succeeded — but someone saw. Scandal +15.', scrutinyDelta: counter.scrutiny + 8, apCost: counter.ap, moneyDelta: 0 };
    }
    return { opposition: next, message: '🧪 Board member softened in the growth chamber (−resolve, +lbs).', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'faculty_testimony') {
    next.aib.informantShieldWeeks = 2;
    return { opposition: next, message: '📎 Faculty testimony on record — informant muted 2 weeks.', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'bureaucratic_capture') {
    if (!memberId) {
      return { opposition: next, message: '⚠️ Select a board member with resolve ≤ 40 to capture.', scrutinyDelta: 0, apCost: 0, moneyDelta: 0 };
    }
    const target = next.aib.members.find((m) => m.id === memberId);
    if (!target || target.resolve > 40) {
      return {
        opposition: next,
        message: target
          ? `⚠️ ${target.name} is too resolved (${target.resolve}) — capture needs wavering resolve (≤40).`
          : '⚠️ Board member not found.',
        scrutinyDelta: 0,
        apCost: 0,
        moneyDelta: 0,
      };
    }
    next.aib.members = next.aib.members.map((m) => {
      if (m.id !== memberId) return m;
      return { ...m, stance: 'compromised', corruption: Math.min(100, m.corruption + 25) };
    });
    const msg = counterSuccessLine(counterId) || '📎 Member compromised — they look away at hearings.';
    return { opposition: { ...next, meta: recordCounterType(next.meta, counterId) }, message: msg, scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0, boardCompromised: true };
  }
  if (counterId === 'lilith_hunt') {
    const huntMemberId = options.memberId || memberId;
    const target = huntMemberId
      ? next.aib.members.find((m) => m.id === huntMemberId)
      : [...next.aib.members].sort((a, b) => a.resolve - b.resolve)[0];
    if (!target) return { opposition: next, message: '⚠️ No board members remain.', scrutinyDelta: 0, apCost: counter.ap, moneyDelta: 0 };
    next = {
      ...next,
      aib: { ...next.aib, markedForHunt: target.id },
    };
    return {
      opposition: next,
      message: `🩸 ${target.name} marked for Lilith's hunt — find them on the map.`,
      scrutinyDelta: 0,
      apCost: counter.ap,
      moneyDelta: 0,
      openLilithAibHunt: true,
      aibMemberId: target.id,
    };
  }
  if (counterId === 'compound_seduction') {
    next.aib.informantShieldWeeks = Math.max(next.aib.informantShieldWeeks || 0, 3);
    next.aib.scandalMeter = Math.max(0, next.aib.scandalMeter - 8);
    return {
      opposition: { ...next, meta: recordCounterType(next.meta, counterId) },
      message: '💊 Compound seduction — staff lounge whispers favor abundance.',
      scrutinyDelta: counter.scrutiny,
      apCost: counter.ap,
      moneyDelta: 0,
    };
  }
  if (counterId === 'network_misdirect') {
    const detected = Math.random() < 0.35;
    next.aib.scandalMeter = Math.max(0, next.aib.scandalMeter - 20);
    if (detected) {
      next.aib.scandalMeter = Math.min(100, next.aib.scandalMeter + 12);
      return {
        opposition: { ...next, meta: recordCounterType(next.meta, counterId) },
        message: '📡 Network misdirect traced — scandal scrubbed, but compliance noticed (+12 scandal).',
        scrutinyDelta: counter.scrutiny + 8,
        apCost: counter.ap,
        moneyDelta: 0,
      };
    }
    return {
      opposition: { ...next, meta: recordCounterType(next.meta, counterId) },
      message: '📡 Network misdirect — audit trails dissolve (−20 scandal).',
      scrutinyDelta: counter.scrutiny,
      apCost: counter.ap,
      moneyDelta: 0,
    };
  }
  return { opposition: next, message: null, scrutinyDelta: 0, apCost: counter.ap, moneyDelta: 0 };
}

function rndRange(a, b) {
  return a + Math.floor(Math.random() * (b - a + 1));
}

const ACCREDITATION_OBSERVERS = [
  'Dr. Ellis Marchetti',
  'Prof. Yuki Okonkwo',
  'Ms. Renata Cole',
  'Dr. Samuel Greer',
];

function pickAccreditationObserver(rng = Math.random) {
  return ACCREDITATION_OBSERVERS[Math.floor(rng() * ACCREDITATION_OBSERVERS.length)];
}

export function processOppositionWeek(opposition, {
  week, scrutiny, students, rnd = Math.random,
  saturationTier = 0,
  weeksAtRegionalExcess = 0,
  pharmacistCultStage = 0,
  facultyInformantRisk = false,
}) {
  let next = {
    ...opposition,
    meta: {
      rumorCount: 0,
      aibUnlockWeek: null,
      supernaturalAnnounced: false,
      counterTypesUsed: [],
      investigationReached: false,
      jointSeminarFired: false,
      ...opposition.meta,
    },
  };
  if (scrutiny >= 90) {
    next = { ...next, meta: { ...next.meta, investigationReached: true } };
  }
  if (facultyInformantRisk) {
    next = { ...next, meta: { ...next.meta, facultyInformantActive: true } };
  }
  const logs = [];
  let scrutinyDelta = 0;
  let moneyDelta = 0;
  const studentPatches = [];
  let pendingDeviceConfiscation = false;

  // Act I — rumors only while board dormant (§29.2)
  if (isBoardDormant(week, scrutiny, next)) {
    if (rnd() < 0.4) {
      logs.push(pickActIRumor(week, rnd));
      next = { ...next, meta: { ...next.meta, rumorCount: (next.meta.rumorCount || 0) + 1 } };
    }
    return { opposition: next, scrutinyDelta, moneyDelta, logs, studentPatches, pendingDeviceConfiscation };
  }

  const wasUnlocked = next.aib.unlocked;
  next = unlockOppositionIfNeeded(next, scrutiny, week);
  if (!wasUnlocked && next.aib.unlocked) {
    logs.push(`👁 ${oppositionUnlockLine(week)}`);
  }
  if (!next.aib.unlocked) {
    return { opposition: next, scrutinyDelta, moneyDelta, logs, studentPatches, pendingDeviceConfiscation };
  }

  const advocate = rotateAdvocate(next, week, students);
  next = {
    ...next,
    aib: {
      ...next.aib,
      rotatingAdvocate: advocate,
      advocateRotateWeek: next.aib.advocateRotateWeek || week,
      activeDebuffs: tickDebuffs(next.aib.activeDebuffs || defaultOppositionState().aib.activeDebuffs),
      informantShieldWeeks: Math.max(0, (next.aib.informantShieldWeeks || 0) - 1),
    },
  };

  if (next.aib.activeDebuffs.budgetFrozenWeeks > 0) {
    moneyDelta -= 200;
    logs.push('💸 Budget freeze continues (−$200).');
  }

  // Proxy unlocks (§31)
  const proxyFlags = proxyUnlockFlags(week, scrutiny, saturationTier, pharmacistCultStage);
  next = {
    ...next,
    proxies: {
      wellnessCoalition: next.proxies.wellnessCoalition || proxyFlags.wellnessCoalition,
      accreditation: next.proxies.accreditation || proxyFlags.accreditation,
      asceticCircle: next.proxies.asceticCircle || proxyFlags.asceticCircle,
    },
  };

  if (next.proxies.wellnessCoalition && week === 8) {
    logs.push(`🏥 ${oppositionProxyLine('wellnessCoalition', week) || 'Wellness Coalition forms on campus.'}`);
  }
  if (next.proxies.accreditation && week === 14) {
    const observerName = pickAccreditationObserver(rnd);
    next = { ...next, proxies: { ...next.proxies, observerName } };
    logs.push(`📨 Regional Accreditation Observer letter arrives — ${observerName} will be watching.`);
  }
  if (next.proxies.asceticCircle && week === 20) {
    logs.push(`🕯️ ${oppositionProxyLine('asceticCircle', week) || 'Ascetic Circle protests begin at the garden.'}`);
  }
  if (week === 18 && next.proxies.wellnessCoalition && !next.meta.jointSeminarFired) {
    next = { ...next, meta: { ...next.meta, jointSeminarFired: true } };
    logs.push('📢 Joint Wellness Coalition + AIB seminar — double agenda pressure this week.');
  }

  // Truce from feast bribe
  if (next.aib.truceWeeks > 0) {
    next = { ...next, aib: { ...next.aib, truceWeeks: next.aib.truceWeeks - 1 } };
    logs.push('🍷 AIB truce — no new agenda cards this week.');
    return { opposition: next, scrutinyDelta, moneyDelta, logs, studentPatches, pendingDeviceConfiscation };
  }

  // Resolve due agenda
  const queue = [...next.aib.agendaQueue];
  const stillQueued = [];
  let delayNextAgenda = false;
  queue.forEach((item) => {
    if (item.resolvesWeek <= week) {
      const card = AIB_AGENDA_CARDS.find((c) => c.id === item.cardId);
      if (card) {
        const flavor = agendaResolveLine(card.id, week);
        logs.push(flavor || card.message);
        scrutinyDelta += card.scrutiny || 0;
        moneyDelta += card.money || 0;
        const fx = resolveAgendaEffect(card, students, next, rnd);
        scrutinyDelta += fx.scrutinyDelta;
        moneyDelta += fx.moneyDelta;
        studentPatches.push(...fx.studentPatches);
        logs.push(...fx.logs);
        if (fx.oppositionPatch.pendingDeviceConfiscation) pendingDeviceConfiscation = true;
        if (fx.oppositionPatch.activeDebuffs) {
          next = { ...next, aib: { ...next.aib, activeDebuffs: fx.oppositionPatch.activeDebuffs } };
        }
        if (fx.oppositionPatch.pendingHearing) {
          next = { ...next, aib: { ...next.aib, pendingHearing: fx.oppositionPatch.pendingHearing } };
        }
        if (fx.oppositionPatch.pendingForcedWeighInStudentId) {
          next = {
            ...next,
            aib: { ...next.aib, pendingForcedWeighInStudentId: fx.oppositionPatch.pendingForcedWeighInStudentId },
          };
        }
        if (fx.oppositionPatch.agendaDelay) delayNextAgenda = true;
      }
    } else {
      stillQueued.push(item);
    }
  });
  if (delayNextAgenda && stillQueued.length) {
    stillQueued[0] = { ...stillQueued[0], resolvesWeek: stillQueued[0].resolvesWeek + 1 };
    logs.push('📣 Student advocate delay — top agenda pushed one week.');
  }
  next = { ...next, aib: { ...next.aib, agendaQueue: stillQueued } };

  // Draw new cards — Investigation tier draws 2/week (§30.5)
  let draws = next.proxies.accreditation || scrutiny >= 90 ? 2 : 1;
  if (week >= 26 && !next.supernatural?.actTriggered && (next.proxies.wellnessCoalition || next.proxies.accreditation || next.proxies.asceticCircle)) {
    draws += 1;
  }
  if (week === 18 && next.meta.jointSeminarFired) draws += 1;
  if (next.aib.informantShieldWeeks > 0) draws = Math.max(1, draws - 1);
  const newQueue = [...stillQueued];
  for (let i = 0; i < draws && newQueue.length < 3; i++) {
    const card = drawAgendaCard(next, scrutiny, rnd, saturationTier);
    if (!card) break;
    newQueue.push({ cardId: card.id, label: card.label, resolvesWeek: week + 1 });
    logs.push(`📌 AIB agenda queued: ${card.label}`);
  }
  next = { ...next, aib: { ...next.aib, agendaQueue: newQueue } };

  scrutinyDelta += getAibScrutinyMod(next, students);

  // Member resolve softens when heavy; digest chamber calories; stance transitions
  next = {
    ...next,
    aib: {
      ...next.aib,
      members: tickMemberStances(
        next.aib.members.map((m) => {
          let member = m;
          if (member.consumedCalories > 0) {
            const dig = digestNpc(member);
            member = { ...member, weightLbs: dig.weightLbs, ...dig.reset };
          }
          return member;
        }),
      ),
    },
  };

  if (next.aib.scandalMeter >= 60 && !next.aib.emergencyHearingDue) {
    next = { ...next, aib: { ...next.aib, emergencyHearingDue: true } };
    logs.push('🚨 Scandal meter critical — emergency Board hearing convened.');
  }

  return { opposition: next, scrutinyDelta, moneyDelta, logs, studentPatches, pendingDeviceConfiscation, forcedWeighInStudentId: next.aib.pendingForcedWeighInStudentId || null };
}

export function checkSupernaturalTrigger(opposition, {
  week, scrutiny, students, campusSaturation, weeksAtRegionalExcess = 0,
}) {
  if (opposition.supernatural.actTriggered) return opposition;
  const avgPressure = computeClassTransformationPressure(students);
  const committed = avgPressure >= 55;
  const investigation = scrutiny >= 90 || opposition.meta?.investigationReached;
  const regional = weeksAtRegionalExcess >= 3 && week >= 20;
  const counterPath = (opposition.meta?.counterTypesUsed?.length ?? 0) >= 3 && week >= 22;
  const fire = (committed && investigation) || regional || counterPath;
  if (!fire) return opposition;
  const scarcityStart = regional ? 15 : committed ? 20 : 18;
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      actTriggered: true,
      actWeek: week,
      scarcityPressure: scarcityStart,
      ascensionOffered: false,
      famineWeek: false,
    },
    meta: { ...opposition.meta, supernaturalAnnounced: false },
  };
}

export function tickSupernaturalWeek(opposition, students, rnd = Math.random, week = 0) {
  if (!opposition.supernatural?.actTriggered) return { opposition, logs: [], studentPatches: [] };
  const logs = [];
  const studentPatches = [];
  let scarcityPressure = (opposition.supernatural.scarcityPressure || 0) + 5;
  let curseQueue = [...(opposition.supernatural.curseQueue || [])];
  let famineWeek = opposition.supernatural.famineWeek || false;

  const compromised = opposition.aib?.members?.filter((m) => m.stance === 'compromised').length ?? 0;
  if (compromised >= 4) scarcityPressure = Math.min(scarcityPressure, 60);

  scarcityPressure += curseQueue.length * 0.5;

  if (scarcityPressure > 0 && rnd() < 0.35) {
    const vis = students.filter((s) => !s.hidden);
    const target = vis.length ? vis[Math.floor(rnd() * vis.length)] : null;
    if (target) {
      studentPatches.push({ id: target.id, passiveGainBlocked: true });
      curseQueue.push({ studentId: target.id, week });
      logs.push(`👻 Hunger curse — ${target.name} gains nothing passively this week.`);
      scarcityPressure = Math.min(100, scarcityPressure + 2);
    }
  }
  curseQueue = curseQueue.slice(-12);

  if (scarcityPressure >= 100) {
    scarcityPressure = 100;
    famineWeek = true;
    logs.push('🕯️ Famine Week — scarcity pressure peaks. Complete a Refeast Ritual to continue.');
  }

  const latent = applyLatentAppetiteWeek(students, opposition, rnd);
  logs.push(...latent.logs);
  studentPatches.push(...latent.patches);

  return {
    opposition: {
      ...opposition,
      supernatural: {
        ...opposition.supernatural,
        scarcityPressure: Math.round(scarcityPressure),
        curseQueue,
        famineWeek,
      },
    },
    logs,
    studentPatches,
  };
}
