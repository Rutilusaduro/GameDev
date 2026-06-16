// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Approved invention catalog
// inventionKind: 'equipable' | 'event'
// Catalog prose: src/textEngine/scenes/deviceFlavor.js (device.catalog.*)
// ═══════════════════════════════════════════════════════════════

export const DEVICE_SLOTS = [
  'head', 'neck', 'back', 'waist', 'arms', 'legs', 'fullBody',
];

export const INVENTION_KINDS = {
  equipable: { id: 'equipable', label: 'Equipable', icon: '🧩' },
  event: { id: 'event', label: 'Event', icon: '⚡' },
};

const DEFAULT_GROWTH_PROFILE = {
  growthMethod: 'feed',
  zoneBias: 'bodyType',
  growthIntensity: 'steady',
  sensation: 'fullness',
};

export const MARQUEE_GROWTH_DEVICE_IDS = [
  'growth_accelerator_chamber',
  'growth_serum_injector',
];

export const DEVICES = {
  // ── Equipable inventions ─────────────────────────────────────
  feeding_mask: {
    id: 'feeding_mask',
    label: 'Force Feeder',
    icon: '🎭',
    form: 'stationary',
    inventionKind: 'event',
    labStation: true,
    tier: 1,
    stability: 0.6,
    risk: 0.55,
    effectStrength: 0.9,
    rarity: 'uncommon',
    growthProfile: { growthMethod: 'feed', zoneBias: 'belly', growthIntensity: 'steady', sensation: 'fullness' },
    useEffect: {
      gainLbs: [8, 14],
      bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 },
      psychDelta: { dependence: 4, shame: 2 },
    },
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'Flow spikes. She chokes, swallows, and keeps swelling.', effect: { gainLbs: [4, 7], bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 } } },
    ],
  },
  auto_feeder_arm: {
    id: 'auto_feeder_arm',
    label: 'Auto-Feed Arm',
    icon: '🦾',
    form: 'installed',
    slot: 'back',
    inventionKind: 'equipable',
    tier: 1,
    stability: 0.65,
    risk: 0.35,
    effectStrength: 0.65,
    rarity: 'uncommon',
    growthProfile: { growthMethod: 'feed', zoneBias: 'bodyType', growthIntensity: 'steady', sensation: 'fullness' },
    weeklyEffect: {
      gainLbs: [3, 6],
      psychDelta: { dependence: 3 },
    },
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'Greedy mode engages unbidden. The feeding accelerates until someone hits the kill switch.', effect: { gainLbs: [4, 7], bodyOverride: { stateType: 'bloated', stageBump: 1, durationWeeks: 1 } } },
    ],
  },
  obedience_belt: {
    id: 'obedience_belt',
    label: 'Obedience Belt',
    icon: '🔗',
    form: 'worn',
    slot: 'waist',
    inventionKind: 'equipable',
    tier: 1,
    stability: 0.7,
    risk: 0.4,
    effectStrength: 0.6,
    rarity: 'uncommon',
    growthProfile: { growthMethod: 'feed', zoneBias: 'bodyType', growthIntensity: 'gradual', sensation: 'pressure' },
    weeklyEffect: {
      gainLbs: [1, 3],
      psychDelta: { dependence: 3, shame: 2, obsession: 1 },
    },
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'The belt punishes resistance with a hum she feels in her bones.', effect: { psychDelta: { dependence: 5, shame: 4 } } },
    ],
  },
  auto_bloating_belt: {
    id: 'auto_bloating_belt',
    label: 'Weight Belt',
    icon: '⭕',
    form: 'worn',
    slot: 'waist',
    inventionKind: 'equipable',
    tier: 1,
    stability: 0.55,
    risk: 0.45,
    effectStrength: 0.7,
    rarity: 'uncommon',
    growthProfile: { growthMethod: 'bloat', zoneBias: 'belly', growthIntensity: 'gradual', sensation: 'pressure' },
    weeklyEffect: {
      bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 },
      gainLbs: [1, 3],
      psychDelta: { dependence: 2, shame: 1 },
    },
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'A sudden pulse of pressure locks the buckle. Her belly surges outward in one brutal swell.', effect: { bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 2 }, gainLbs: [2, 5] } },
    ],
  },
  living_furniture_rig: {
    id: 'living_furniture_rig',
    label: 'Furniture Harness',
    icon: '🪑',
    form: 'worn',
    slot: 'fullBody',
    inventionKind: 'equipable',
    tier: 2,
    stability: 0.5,
    risk: 0.65,
    effectStrength: 0.9,
    rarity: 'rare',
    growthProfile: { growthMethod: 'feed', zoneBias: 'full', growthIntensity: 'gradual', sensation: 'pressure' },
    weeklyEffect: {
      gainLbs: [2, 5],
      bodyOverride: { stateType: 'furniture', stageBump: 1, durationWeeks: 2 },
      psychDelta: { dependence: 3, shame: 4, obsession: 2 },
      furnitureComfortDelta: -12,
    },
    useEffect: {
      furnitureComfortDelta: 35,
      gainLbs: [1, 3],
      psychDelta: { dependence: 2 },
    },
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'She moans when someone sits. Hard to pretend it is normal furniture.', effect: { psychDelta: { shame: 5, dependence: 2 } } },
    ],
  },
  reinforced_legs: {
    id: 'reinforced_legs',
    label: 'Reinforced Legs',
    icon: '🦵',
    form: 'worn',
    slot: 'legs',
    inventionKind: 'equipable',
    tier: 2,
    stability: 0.75,
    risk: 0.3,
    effectStrength: 0.5,
    rarity: 'uncommon',
    growthProfile: { growthMethod: 'feed', zoneBias: 'lower_body', growthIntensity: 'gradual', sensation: 'pressure' },
    weeklyEffect: {
      gainLbs: [1, 2],
      psychDelta: { dependence: 1 },
      furnitureComfortDelta: 8,
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'A brace pinches — she shifts, and the harness creaks louder.', effect: { psychDelta: { shame: 2 } } },
    ],
  },
  // ── Event inventions ─────────────────────────────────────────
  growth_accelerator_chamber: {
    id: 'growth_accelerator_chamber',
    label: 'Growth Chamber',
    icon: '☢️',
    form: 'stationary',
    inventionKind: 'event',
    tier: 2,
    stability: 0.45,
    risk: 0.7,
    effectStrength: 0.95,
    rarity: 'rare',
    growthProfile: { growthMethod: 'radiation', zoneBias: 'bodyType', growthIntensity: 'rapid', sensation: 'warmth' },
    useEffect: {
      gainLbs: [12, 24],
      psychDelta: { obsession: 4, dependence: 3 },
    },
    malfunctions: [
      { tier: 'major', weight: 2, text: 'Field spike — near-immobility from sheer swell.', effect: { gainLbs: [8, 14], bodyOverride: { stateType: 'bloated', stageBump: 4, durationWeeks: 2 }, psychDelta: { shame: 5 } } },
    ],
  },
  growth_serum_injector: {
    id: 'growth_serum_injector',
    label: 'Growth Formula',
    icon: '💉',
    form: 'consumable',
    inventionKind: 'event',
    tier: 2,
    stability: 0.2,
    risk: 0.85,
    effectStrength: 0.95,
    rarity: 'rare',
    growthProfile: { growthMethod: 'serum', zoneBias: 'bodyType', growthIntensity: 'rapid', sensation: 'warmth' },
    useEffect: {
      gainLbs: [10, 22],
      bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 2 },
      psychDelta: { obsession: 5, shame: 3 },
    },
    malfunctions: [
      { tier: 'major', weight: 2, text: 'Chaotic cascade — the formula keeps working after it should have stopped.', effect: { gainLbs: [15, 25], permanentConvert: { gainLbs: [4, 8] } } },
    ],
  },
  endless_hunger_engine: {
    id: 'endless_hunger_engine',
    label: 'Hunger Ray',
    icon: '🔫',
    form: 'campus_tool',
    inventionKind: 'event',
    tier: 2,
    stability: 0.35,
    risk: 0.8,
    effectStrength: 0.92,
    rarity: 'rare',
    growthProfile: { growthMethod: 'hunger', zoneBias: 'bodyType', growthIntensity: 'steady', sensation: 'craving' },
    useEffect: {
      hungerDelta: 2,
      psychDelta: { fixation: 4, dependence: 3 },
      gainLbs: [2, 5],
    },
    campusModes: [
      { id: 'pulse', label: 'Hunger pulse', gainLbs: [2, 4], psychDelta: { fixation: 3, dependence: 2 }, discoveryRisk: 0.15 },
      { id: 'sustain', label: 'Sustained craving', gainLbs: [4, 7], psychDelta: { fixation: 5, dependence: 4 }, discoveryRisk: 0.22 },
    ],
    malfunctions: [
      { tier: 'moderate', weight: 3, text: 'The ray overruns — she cannot feel full even when overstuffed.', effect: { gainLbs: [3, 6], psychDelta: { dependence: 4, shame: 2 } } },
    ],
  },
};

export function getDevice(defId) {
  return DEVICES[defId] || null;
}

export function devicesForStage(stage) {
  return Object.values(DEVICES).filter((d) => (d.tier ?? 1) <= stage);
}

export function devicesByKind(kind) {
  return Object.values(DEVICES).filter((d) => d.inventionKind === kind);
}

export function isPortableDevice(def) {
  return def && def.form !== 'installed';
}

export function getGrowthProfile(defId) {
  const def = getDevice(defId);
  return def?.growthProfile || DEFAULT_GROWTH_PROFILE;
}

export function isStationaryDevice(def) {
  return def?.form === 'stationary';
}

export function isCampusTool(def) {
  return def?.form === 'campus_tool' || def?.form === 'stationary' || (def?.campusModes?.length > 0);
}

export function isEventInvention(def) {
  return def?.inventionKind === 'event';
}

export function isEquipableInvention(def) {
  return def?.inventionKind === 'equipable';
}
