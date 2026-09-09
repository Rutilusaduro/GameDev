// ═══════════════════════════════════════════════════════════════
// V2.0 — shared state factory
// ═══════════════════════════════════════════════════════════════
import { migrateEmbodimentState } from './embodiedCampus.js';

export const V2_CONFIG = {
  version: '2.0.0',
  embodimentBaseAp: 2,
  embodimentDeepRideAp: 1,
  embodimentDiscountAp: 1,
  embodimentEchoDigestMult: 1.2,
  resonanceLinkAp: 1,
  resonanceLinkRelCost: 5,
  dreamBaseAp: 2,
  dreamLucidUnlockCount: 5,
  ritualBaseAp: 2,
  ritualSacredFavor: 15,
  echoResonateAp: 1,
  maxEmbodimentsPerWeek: 1,
  maxEmbodimentsDeepRide: 2,
  maxResonanceLinks: 1,
  maxResonanceLinksWithBells: 3,
};

/** Normalize v2 save blobs after embodied-event renames (e.g. classmate → resident). */
export function normalizeV2State(v2State) {
  if (!v2State) return createInitialV2State();
  const embodiment = migrateEmbodimentState(v2State.embodiment || {});
  if (embodiment === v2State.embodiment) return v2State;
  return { ...v2State, embodiment };
}

export function createInitialV2State() {
  return {
    embodiment: {
      activeStudentId: null,
      usedThisWeek: 0,
      totalSessions: 0,
      lastAction: null,
      at: null,
      steps: 0,
      walkLog: [],
      eventsSeen: {},
      lastEventKey: null,
      lastEventStep: 0,
    },
    resonance: {
      links: [], // [{ a, b, strength }]
      tier: 0,
      lastSurgeWeek: 0,
      totalPulses: 0,
    },
    rituals: {
      completed: {}, // ritualId → count
      lastRitualWeek: 0,
      unlockedTiers: [1],
    },
    echoes: {
      moments: [], // [{ id, studentId, type, week, stageId, replayCount }]
      resonated: [],
    },
    dreams: {
      lastDreamWeek: {},
      lucidUnlocked: false,
      totalDreams: 0,
    },
  };
}
