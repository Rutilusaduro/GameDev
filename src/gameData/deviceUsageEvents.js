// ═══════════════════════════════════════════════════════════════
// DEVICE USAGE MINI-GAMES — tuning / route / rhythm archetypes
// ═══════════════════════════════════════════════════════════════
import { recordDeviceUse, getDeviceBoardMods } from './inventionUpgrades.js';
import { applyDeviceEffect, rollMalfunction } from './deviceEffects.js';
import { getDependenceLevel } from './deviceDependence.js';
import { DEVICES } from './devices.js';
import { canStudentUseDevice, deviceAcceptanceBlockReason } from './deviceGating.js';

export const DEVICE_INTERACTION_TYPES = {
  feeding_mask: 'rhythm',
  growth_accelerator_chamber: 'tuning',
  growth_serum_injector: 'tuning',
  auto_feeder_arm: 'route',
  endless_hunger_engine: 'route',
  obedience_belt: 'tuning',
  auto_bloating_belt: 'tuning',
  living_furniture_rig: 'route',
};

export function interactionTypeForDevice(deviceDefId) {
  return DEVICE_INTERACTION_TYPES[deviceDefId] || 'direct';
}

export function createTuningSession(deviceDefId, magnitude = 0.55) {
  return {
    type: 'tuning',
    deviceDefId,
    magnitude: Math.min(1, Math.max(0.2, magnitude)),
    stability: 1 - magnitude * 0.65,
    rolls: [],
    phase: 'setup',
  };
}

export function rollTuningAttempt(session, rng = Math.random) {
  const instability = (1 - session.stability) * 0.35 + session.magnitude * 0.25;
  const roll = rng();
  const success = roll > instability;
  const quality = success
    ? (roll > 0.85 ? 'perfect' : roll > 0.6 ? 'good' : 'messy')
    : 'failure';
  return { ...session, phase: 'complete', resultQuality: quality, roll };
}

export function tuningPerformanceToTier(session) {
  return session.resultQuality || 'messy';
}

export function createRouteSession(deviceDefId, budget = 100) {
  return {
    type: 'route',
    deviceDefId,
    budget,
    allocations: { belly: 40, campus: 35, reserve: 25 },
    phase: 'setup',
  };
}

export function scoreRouteSession(session, discoveryRiskBase = 0.15, labState = null, deviceDefId = null) {
  const campus = session.allocations?.campus ?? 0;
  const belly = session.allocations?.belly ?? 0;
  const reserve = session.allocations?.reserve ?? 0;
  let discoveryRisk = discoveryRiskBase * (campus / 50);
  if (labState && deviceDefId) {
    const mods = getDeviceBoardMods(labState, deviceDefId);
    if (mods.discoveryMult) discoveryRisk *= mods.discoveryMult;
  }
  discoveryRisk *= Math.max(0.45, 1 - reserve / 130);
  const gainMult = 1 + belly / 120 + reserve / 400;
  const efficiency = Math.min(100, belly + campus * 0.7 + reserve * 0.25);
  let tier = 'good';
  if (efficiency >= 88 && discoveryRisk < 0.2) tier = 'perfect';
  else if (efficiency >= 65) tier = 'good';
  else if (efficiency >= 40) tier = 'messy';
  else tier = 'failure';
  return { performanceTier: tier, gainMult, discoveryRisk, efficiency };
}

export function applyDeviceUsageReward(labState, deviceDefId, performanceTier, extras = {}) {
  return recordDeviceUse(labState, deviceDefId, {
    performanceTier,
    bonusPoints: extras.bonusPoints ?? 0,
  });
}

export function runStationaryDeviceSession(student, deviceDefId, week, rng = Math.random, opts = {}) {
  const def = DEVICES[deviceDefId];
  if (!def?.useEffect) return { ok: false, lines: ['⚠️ Device has no session effect.'] };
  if (!canStudentUseDevice(student, deviceDefId)) {
    return { ok: false, lines: [`⚠️ ${deviceAcceptanceBlockReason(student, deviceDefId)}`] };
  }
  const gainMult = opts.gainMult ?? 1;
  const effect = { ...def.useEffect };
  if (effect.gainLbs && gainMult !== 1) {
    effect.gainLbs = effect.gainLbs.map((g) => Math.max(1, Math.round(g * gainMult)));
  }
  const effectCtx = { week, sourceDeviceId: deviceDefId, rng, labState: opts.labState };
  const applied = applyDeviceEffect(student, effect, effectCtx);
  let next = applied.student;
  let lines = applied.lines;
  let malfunction = null;
  if (def.malfunctions?.length) {
    malfunction = rollMalfunction(def, next, rng, {
      dependenceLevel: getDependenceLevel(student, deviceDefId),
      labState: opts.labState,
      deviceDefId,
    });
    if (malfunction) {
      const m2 = applyDeviceEffect(next, malfunction.effect, effectCtx);
      next = m2.student;
      lines = [...lines, malfunction.text];
    }
  }
  return {
    ok: true,
    student: next,
    lines,
    zoneOverride: applied.zoneOverride,
    malfunction,
    performanceTier: opts.performanceTier ?? 'good',
  };
}

export function runRouteDeviceSession(student, deviceDefId, week, routeResult, rng = Math.random) {
  const def = DEVICES[deviceDefId];
  if (!canStudentUseDevice(student, deviceDefId)) {
    return { ok: false, lines: [`⚠️ ${deviceAcceptanceBlockReason(student, deviceDefId)}`] };
  }
  const tier = routeResult?.performanceTier ?? 'good';
  const gainMult = routeResult?.gainMult ?? 1;
  const base = def?.useEffect?.gainLbs ?? [4, 8];
  const effect = {
    gainLbs: base.map((g) => Math.max(1, Math.round(g * gainMult))),
    psychDelta: def?.useEffect?.psychDelta ?? { dependence: 2 },
  };
  const effectCtx = { week, sourceDeviceId: deviceDefId, rng, labState: routeResult?.labState };
  const applied = applyDeviceEffect(student, effect, effectCtx);
  return { ok: true, ...applied, performanceTier: tier, discoveryRisk: routeResult?.discoveryRisk ?? 0 };
}

export function tuningGainMult(session, labState, deviceDefId) {
  const mods = getDeviceBoardMods(labState, deviceDefId);
  const base = 1 + (session.magnitude ?? 0.5) * 0.35;
  const modMult = mods.gainMult ?? 1;
  const tier = tuningPerformanceToTier(session);
  const tierMult = { perfect: 1.25, good: 1.0, messy: 0.85, failure: 0.5 }[tier] ?? 1;
  const overclock = tier === 'perfect' && (session.magnitude ?? 0) >= 0.85 ? 1.1 : 1;
  return base * modMult * tierMult * overclock;
}

export function tuningMalfunctionChance(session, labState, deviceDefId) {
  const mods = getDeviceBoardMods(labState, deviceDefId);
  const base = (1 - (session.stability ?? 0.5)) * 0.4;
  const modMult = mods.majorMalfunctionMult ?? mods.overrunMult ?? 1;
  return Math.min(0.85, base * modMult);
}
