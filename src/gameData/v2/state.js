// ═══════════════════════════════════════════════════════════════
// V2.0 — shared state factory
// ═══════════════════════════════════════════════════════════════

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

export function createInitialV2State() {
  return {
    embodiment: {
      activeStudentId: null,
      usedThisWeek: 0,
      totalSessions: 0,
      lastAction: null,
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
