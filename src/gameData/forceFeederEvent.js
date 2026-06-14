// ═══════════════════════════════════════════════════════════════
// FORCE FEEDER EVENT — Gullet Calibration mini-game logic
// ═══════════════════════════════════════════════════════════════
import { WEIGHT_STAGES, getStage } from './stages.js';
import { getCorruptionTier } from './corruption.js';
import { getTier } from './sessions.js';
import {
  stageBumpForPerformance,
  timingWindowMs,
  getForceFeederBoardMods,
} from './inventionUpgrades.js';

export const GULLET_BEAT_COUNT = 8;
export const PERFORMANCE_TIERS = ['perfect', 'good', 'messy', 'failure'];
export const CHOKE_MAX = 100;
export const PULSE_START_MS = 1400;
export const PULSE_INTERVAL_MS = 1300;

const CHOKE_PER_LABEL = { perfect: 0, good: 4, messy: 10, miss: 18 };
const CHOKE_PASSIVE_PER_SEC = 3.5;
const MISS_GRACE_MULT = 2.2;

export function scoreToTier(efficiencyPct, chokeMeter, chokedOut = false) {
  if (chokedOut || chokeMeter >= CHOKE_MAX) return 'failure';
  if (efficiencyPct >= 88 && chokeMeter < 22) return 'perfect';
  if (efficiencyPct >= 68 && chokeMeter < 48) return 'good';
  if (efficiencyPct >= 38 && chokeMeter < 78) return 'messy';
  return 'failure';
}

export function createGulletSession(labState, growthZone = 'default') {
  const mods = getForceFeederBoardMods(labState);
  const windowMs = timingWindowMs(labState);
  const beatCount = Math.max(6, Math.round(GULLET_BEAT_COUNT * mods.beatCountMult));
  const interval = mods.overclockedPump ? 1000 : PULSE_INTERVAL_MS;
  const beats = [];
  for (let i = 0; i < beatCount; i++) {
    beats.push({
      id: i,
      pulseAt: PULSE_START_MS + i * interval,
      windowMs,
      hit: null,
      deltaMs: null,
      points: null,
    });
  }
  return {
    beats,
    beatIndex: 0,
    scoreSum: 0,
    chokeMeter: 0,
    chokedOut: false,
    emergencyUsed: false,
    growthZone,
    phase: 'playing',
    holding: false,
    lastTickMs: 0,
    pulseInterval: interval,
  };
}

export function evaluateBeat(deltaMs, windowMs) {
  const abs = Math.abs(deltaMs);
  if (abs <= windowMs * 0.35) return { points: 100, label: 'perfect' };
  if (abs <= windowMs * 0.7) return { points: 75, label: 'good' };
  if (abs <= windowMs * 1.15) return { points: 45, label: 'messy' };
  return { points: 8, label: 'miss' };
}

function applyChoke(session, amount, mods) {
  const scaled = amount * (mods.chokeGainMult ?? 1) * (mods.chokePressureMult ?? 1);
  const next = Math.min(CHOKE_MAX, (session.chokeMeter ?? 0) + scaled);
  return { ...session, chokeMeter: next, chokedOut: next >= CHOKE_MAX };
}

export function tickGulletSession(session, nowMs, labState, { holding = false } = {}) {
  if (!session || session.phase === 'complete' || session.chokedOut) return session;
  const mods = getForceFeederBoardMods(labState);
  const elapsed = session.lastTickMs ? nowMs - session.lastTickMs : 0;
  const dtSec = Math.min(0.25, elapsed / 1000);
  let next = { ...session, lastTickMs: nowMs, holding };

  if (session.phase === 'playing') {
    const passive = CHOKE_PASSIVE_PER_SEC * dtSec * (mods.chokePressureMult ?? 1);
    next = applyChoke(next, passive, mods);
    if (holding) next = applyChoke(next, 5 * dtSec, mods);
    next = maybeAutoMissBeat(next, nowMs, labState);
  }
  if (next.chokedOut && next.beatIndex < next.beats.length) {
    next = { ...next, phase: 'complete' };
  }
  return next;
}

export function registerBeatHit(session, nowMs, labState) {
  const beat = session.beats[session.beatIndex];
  if (!beat || beat.hit != null || session.chokedOut) return session;
  const mods = getForceFeederBoardMods(labState);
  const deltaMs = nowMs - beat.pulseAt;
  const result = evaluateBeat(deltaMs, beat.windowMs);
  let points = result.points + (result.label === 'perfect' ? mods.efficiencyBonus : 0);
  const beats = session.beats.map((b, i) => (
    i === session.beatIndex
      ? { ...b, hit: result.label, deltaMs, points }
      : b
  ));
  let next = {
    ...session,
    beats,
    scoreSum: session.scoreSum + points,
    beatIndex: session.beatIndex + 1,
    phase: 'playing',
  };
  next = applyChoke(next, CHOKE_PER_LABEL[result.label] ?? 12, mods);
  if (next.beatIndex >= session.beats.length || next.chokedOut) {
    next.phase = 'complete';
  }
  return next;
}

export function registerMissedBeat(session, labState) {
  const beat = session.beats[session.beatIndex];
  if (!beat || beat.hit != null || session.chokedOut) return session;
  const result = { points: 8, label: 'miss' };
  const mods = getForceFeederBoardMods(labState);
  const beats = session.beats.map((b, i) => (
    i === session.beatIndex
      ? { ...b, hit: result.label, deltaMs: beat.windowMs * 2, points: result.points }
      : b
  ));
  let next = {
    ...session,
    beats,
    scoreSum: session.scoreSum + result.points,
    beatIndex: session.beatIndex + 1,
    phase: 'playing',
  };
  next = applyChoke(next, CHOKE_PER_LABEL.miss, mods);
  if (next.beatIndex >= session.beats.length || next.chokedOut) {
    next.phase = 'complete';
  }
  return next;
}

export function isInPulseWindow(session, nowMs) {
  const beat = session.beats[session.beatIndex];
  if (!beat || beat.hit != null) return false;
  return Math.abs(nowMs - beat.pulseAt) <= beat.windowMs * 1.15;
}

export function maybeAutoMissBeat(session, nowMs, labState) {
  const beat = session.beats[session.beatIndex];
  if (!beat || beat.hit != null || session.chokedOut || session.phase === 'complete') return session;
  if (nowMs < beat.pulseAt - beat.windowMs * 0.4) return session;
  if (nowMs <= beat.pulseAt + beat.windowMs * MISS_GRACE_MULT) return session;
  return registerMissedBeat(session, labState);
}

export function mistimedPress(session, labState) {
  if (!session || session.chokedOut || session.phase === 'complete') return session;
  const mods = getForceFeederBoardMods(labState);
  let next = applyChoke(session, 12, mods);
  if (next.chokedOut) next = { ...next, phase: 'complete' };
  return next;
}

export function emergencyRelease(session, labState) {
  const mods = getForceFeederBoardMods(labState);
  if (!mods.emergencyRelease || session.emergencyUsed || session.chokedOut) return session;
  return {
    ...session,
    chokeMeter: Math.max(0, (session.chokeMeter ?? 0) - 32),
    scoreSum: Math.max(0, (session.scoreSum ?? 0) - 60),
    emergencyUsed: true,
    chokedOut: false,
  };
}

export function finalizeGulletScore(session, labState) {
  const max = session.beats.length * 100;
  const efficiencyPct = max > 0 ? Math.round((session.scoreSum / max) * 100) : 0;
  const chokeMeter = Math.round(session.chokeMeter ?? 0);
  const tier = scoreToTier(efficiencyPct, chokeMeter, session.chokedOut);
  return {
    efficiencyPct,
    chokeMeter,
    chokedOut: !!session.chokedOut,
    tier,
    scorePct: efficiencyPct,
  };
}

export function getFeedAttitude(student, labState = null) {
  const cor = getCorruptionTier(student?.corruption ?? 0).id;
  const rel = getTier(student?.relationship ?? 0).id;
  const mods = labState ? getForceFeederBoardMods(labState) : null;
  if (mods?.gentleOverride && cor === 0 && rel <= 0) return 'willing';
  if (cor >= 2 || rel >= 2) return 'willing';
  if (cor === 0 && rel <= 0) return 'resistant';
  return 'willing';
}

export function isHighRelationship(student) {
  return getTier(student?.relationship ?? 0).id >= 2;
}

export function lbsToReachStage(currentLbs, stageBump, growthZone = 'default', labState = null) {
  const start = getStage(currentLbs).id;
  const targetId = Math.min(WEIGHT_STAGES.length - 1, start + stageBump);
  const targetMin = WEIGHT_STAGES[targetId].min;
  let gain = Math.max(0, targetMin - currentLbs + 3);
  const mods = labState ? getForceFeederBoardMods(labState) : null;
  if (mods?.rapidSaturation && growthZone === 'rapid') gain += 4;
  if (mods?.highPressure) gain += 2;
  return gain;
}

export function growthZoneForEffect(growthZone) {
  if (growthZone === 'belly') return 'belly';
  if (growthZone === 'lower_body') return 'lower_body';
  if (growthZone === 'even') return 'full';
  return 'bodyType';
}

export function buildForceFeederEffect(target, performanceTier, labState, week, opts = {}) {
  const {
    targetIsTalia = false,
    growthZone = 'default',
    efficiencyPct = 0,
    chokeMeter = 0,
  } = opts;
  const stageBump = stageBumpForPerformance(performanceTier, labState);
  const gainLbs = lbsToReachStage(target.lbs, stageBump, growthZone, labState);
  const psychDelta = { dependence: 3, shame: 1 };
  const mods = getForceFeederBoardMods(labState);

  if (performanceTier === 'perfect') {
    psychDelta.dependence = 4;
    psychDelta.obsession = 1;
    psychDelta.shame = targetIsTalia ? 0 : 1;
  } else if (performanceTier === 'good') {
    psychDelta.dependence = 3;
    psychDelta.shame = 2;
  } else if (performanceTier === 'messy') {
    psychDelta.dependence = 2;
    psychDelta.shame = mods.tier >= 2 ? 3 : 5;
  } else {
    psychDelta.dependence = 2;
    psychDelta.shame = 6;
    psychDelta.obsession = 1;
  }
  if (targetIsTalia) psychDelta.obsession = (psychDelta.obsession ?? 0) + 2;
  if (mods.intimateCalibration && isHighRelationship(target)) {
    psychDelta.dependence = (psychDelta.dependence ?? 0) + 1;
  }

  const bloatedBump = performanceTier === 'failure' ? 3 : performanceTier === 'messy' ? 2 : 1;
  return {
    gainLbs: [gainLbs, gainLbs + (performanceTier === 'failure' ? 4 : 2)],
    bodyOverride: {
      stateType: 'bloated',
      stageBump: bloatedBump,
      durationWeeks: performanceTier === 'failure' ? 2 : 1,
    },
    psychDelta,
    startStage: getStage(target.lbs).id,
    endStage: Math.min(WEIGHT_STAGES.length - 1, getStage(target.lbs).id + stageBump),
    stagesJumped: stageBump,
    performanceTier,
    targetIsTalia,
    feedAttitude: getFeedAttitude(target, labState),
    growthZone,
    efficiencyPct,
    chokeMeter,
    chokedOut: opts.chokedOut,
    week,
    zoneOverride: growthZoneForEffect(growthZone),
  };
}

export function isForceFeederInstalled(labState) {
  return !!labState?.installedInventions?.feeding_mask;
}
