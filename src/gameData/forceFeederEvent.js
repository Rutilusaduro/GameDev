// ═══════════════════════════════════════════════════════════════
// FORCE FEEDER EVENT — Gullet Calibration mini-game logic
// ═══════════════════════════════════════════════════════════════
import { WEIGHT_STAGES, getStage } from './stages.js';
import { getCorruptionTier } from './corruption.js';
import { getTier } from './sessions.js';
import { stageBumpForPerformance, timingWindowMs } from './inventionUpgrades.js';

export const GULLET_BEAT_COUNT = 8;
export const PERFORMANCE_TIERS = ['perfect', 'good', 'messy', 'failure'];

export function scoreToTier(scorePct) {
  if (scorePct >= 90) return 'perfect';
  if (scorePct >= 70) return 'good';
  if (scorePct >= 40) return 'messy';
  return 'failure';
}

export function createGulletSession(upgradeLevel = 0) {
  const windowMs = timingWindowMs(upgradeLevel);
  const beats = [];
  for (let i = 0; i < GULLET_BEAT_COUNT; i++) {
    beats.push({
      id: i,
      pulseAt: 900 + i * 1100 + Math.round(Math.random() * 180),
      windowMs,
      hit: null,
      deltaMs: null,
    });
  }
  return {
    beats,
    beatIndex: 0,
    scoreSum: 0,
    startedAt: null,
    phase: 'ready',
  };
}

export function evaluateBeat(deltaMs, windowMs) {
  const abs = Math.abs(deltaMs);
  if (abs <= windowMs * 0.35) return { points: 100, label: 'perfect' };
  if (abs <= windowMs * 0.7) return { points: 75, label: 'good' };
  if (abs <= windowMs * 1.2) return { points: 45, label: 'messy' };
  return { points: 10, label: 'miss' };
}

export function registerBeatHit(session, nowMs) {
  const beat = session.beats[session.beatIndex];
  if (!beat || beat.hit != null) return session;
  const deltaMs = nowMs - beat.pulseAt;
  const result = evaluateBeat(deltaMs, beat.windowMs);
  const beats = session.beats.map((b, i) => (
    i === session.beatIndex
      ? { ...b, hit: result.label, deltaMs, points: result.points }
      : b
  ));
  const scoreSum = session.scoreSum + result.points;
  const nextIndex = session.beatIndex + 1;
  return {
    ...session,
    beats,
    scoreSum,
    beatIndex: nextIndex,
    phase: nextIndex >= GULLET_BEAT_COUNT ? 'complete' : 'playing',
  };
}

export function finalizeGulletScore(session) {
  const max = GULLET_BEAT_COUNT * 100;
  const pct = Math.round((session.scoreSum / max) * 100);
  return { scorePct: pct, tier: scoreToTier(pct) };
}

export function getFeedAttitude(student) {
  const cor = getCorruptionTier(student?.corruption ?? 0).id;
  const rel = getTier(student?.relationship ?? 0).id;
  if (cor >= 2 || rel >= 2) return 'willing';
  if (cor === 0 && rel <= 0) return 'resistant';
  return 'willing';
}

export function lbsToReachStage(currentLbs, stageBump) {
  const start = getStage(currentLbs).id;
  const targetId = Math.min(WEIGHT_STAGES.length - 1, start + stageBump);
  const targetMin = WEIGHT_STAGES[targetId].min;
  return Math.max(0, targetMin - currentLbs + 3);
}

export function buildForceFeederEffect(target, performanceTier, upgradeLevel, week, targetIsTalia = false) {
  const stageBump = stageBumpForPerformance(performanceTier, upgradeLevel);
  const gainLbs = lbsToReachStage(target.lbs, stageBump);
  const psychDelta = { dependence: 3, shame: 1 };
  if (performanceTier === 'perfect') {
    psychDelta.dependence = 4;
    psychDelta.obsession = 1;
    psychDelta.shame = targetIsTalia ? 0 : 1;
  } else if (performanceTier === 'good') {
    psychDelta.dependence = 3;
    psychDelta.shame = 2;
  } else if (performanceTier === 'messy') {
    psychDelta.dependence = 2;
    psychDelta.shame = upgradeLevel >= 2 ? 3 : 5;
  } else {
    psychDelta.dependence = 2;
    psychDelta.shame = 6;
    psychDelta.obsession = 1;
  }
  if (targetIsTalia) {
    psychDelta.obsession = (psychDelta.obsession ?? 0) + 2;
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
    feedAttitude: getFeedAttitude(target),
    week,
  };
}

export function isForceFeederInstalled(labState) {
  return !!labState?.installedInventions?.feeding_mask;
}
