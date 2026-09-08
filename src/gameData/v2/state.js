// ═══════════════════════════════════════════════════════════════
// V2.0 — shared state factory
// ═══════════════════════════════════════════════════════════════

export const V2_CONFIG = {
  version: '2.0.0',
  embodimentBaseAp: 2,
  embodimentDiscountAp: 1,
  resonanceLinkAp: 1,
  dreamBaseAp: 2,
  ritualBaseAp: 2,
  echoResonateAp: 1,
  maxEmbodimentsPerWeek: 1,
  maxEmbodimentsDeepRide: 2,
  maxResonanceLinks: 6,
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
