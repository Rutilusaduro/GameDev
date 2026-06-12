// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Device catalog (schema + pass-1 representative set)
// ═══════════════════════════════════════════════════════════════

export const DEVICE_SLOTS = [
  'head', 'neck', 'back', 'waist', 'arms', 'legs', 'fullBody',
];

export const DEVICES = {
  auto_bloating_belt: {
    id: 'auto_bloating_belt',
    label: 'Auto-Bloating Belt',
    icon: '⭕',
    form: 'worn',
    slot: 'waist',
    tier: 1,
    stability: 0.55,
    risk: 0.45,
    effectStrength: 0.7,
    maintenanceCost: 2,
    rarity: 'uncommon',
    desc: 'A reinforced waist harness that slowly but relentlessly bloats the wearer\'s stomach — constant pressure, visible swelling, inescapable fullness.',
    weeklyEffect: {
      bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 },
      gainLbs: [1, 3],
      psychDelta: { dependence: 2, shame: 1 },
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'The belt hiccups — one side inflates faster than the other, leaving an uneven swell.', effect: { psychDelta: { shame: 3 } } },
      { tier: 'moderate', weight: 3, text: 'A sudden pulse of pressure locks the buckle. The wearer\'s belly surges outward in one brutal swell.', effect: { bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 2 }, gainLbs: [2, 5] } },
      { tier: 'major', weight: 2, text: 'Over-inflation. The belt won\'t release and breathing gets shallow around a drum-tight midsection.', effect: { bodyOverride: { stateType: 'bloated', stageBump: 4, durationWeeks: 3 }, gainLbs: [4, 8], psychDelta: { dependence: 5, shame: 4 } } },
      { tier: 'critical', weight: 1, text: 'The stretch doesn\'t fully reverse when the belt finally unlocks — the stomach remembers being enormous.', effect: { permanentConvert: { gainLbs: [6, 12], bodyState: 'bloated' } } },
    ],
  },
  auto_feeder_arm: {
    id: 'auto_feeder_arm',
    label: 'Auto-Feeder Arm',
    icon: '🦾',
    form: 'installed',
    slot: 'back',
    attachmentSlots: ['feedSource'],
    tier: 1,
    stability: 0.65,
    risk: 0.35,
    effectStrength: 0.65,
    maintenanceCost: 3,
    rarity: 'uncommon',
    desc: 'A servo-driven arm that delivers food to the target\'s mouth at a steady mechanical rhythm — feeding without consent or effort.',
    weeklyEffect: {
      gainLbs: [3, 6],
      psychDelta: { dependence: 3 },
    },
    attachmentBonus: {
      feedSource: {
        calorie_paste_printer: { gainLbsBonus: [2, 4], psychDelta: { fixation: 2 } },
        liquid_fat_infuser: { gainLbsBonus: [3, 6], psychDelta: { fixation: 3, dependence: 2 } },
      },
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'The arm misjudges timing — food lands on her cheek instead of her mouth.', effect: {} },
      { tier: 'moderate', weight: 3, text: 'Greedy mode engages unbidden. The feeding accelerates until someone hits the kill switch.', effect: { gainLbs: [4, 7], bodyOverride: { stateType: 'bloated', stageBump: 1, durationWeeks: 1 } } },
      { tier: 'major', weight: 2, text: 'The arm refuses to stop. Food keeps coming until the hopper runs dry.', effect: { gainLbs: [8, 14], psychDelta: { dependence: 6, shame: 3 } } },
    ],
  },
  calorie_paste_printer: {
    id: 'calorie_paste_printer',
    label: 'Calorie Paste Printer',
    icon: '🖨️',
    form: 'attachment',
    attachesTo: ['auto_feeder_arm'],
    attachSlot: 'feedSource',
    tier: 1,
    stability: 0.8,
    risk: 0.25,
    effectStrength: 0.85,
    maintenanceCost: 2,
    rarity: 'rare',
    desc: 'Upgraded paste system — dense, optimized calories engineered for maximum storage efficiency. Slots into a feeder arm.',
    weeklyEffect: {},
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'Wrong flavor batch — overly sweet, cloying, impossible to stop swallowing.', effect: { psychDelta: { fixation: 2 } } },
      { tier: 'moderate', weight: 3, text: 'Growth-focused formula runs hot. One serving hits like three.', effect: { gainLbs: [3, 6] } },
    ],
  },
  growth_serum_injector: {
    id: 'growth_serum_injector',
    label: 'Unstable Growth Serum Injector',
    icon: '💉',
    form: 'consumable',
    tier: 2,
    stability: 0.2,
    risk: 0.85,
    effectStrength: 0.95,
    maintenanceCost: 0,
    rarity: 'rare',
    desc: 'One-shot volatile serum delivery — rapid, dramatic, never fully predictable localized growth.',
    useEffect: {
      gainLbs: [10, 22],
      bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 2 },
      psychDelta: { obsession: 5, shame: 3 },
    },
    malfunctions: [
      { tier: 'minor', weight: 3, text: 'Uneven deposition — growth clusters in one area and skips another.', effect: { gainLbs: [6, 10] } },
      { tier: 'moderate', weight: 3, text: 'Extreme localized swell — belly or hips balloon in minutes.', effect: { gainLbs: [12, 18], bodyOverride: { stateType: 'bloated', stageBump: 4, durationWeeks: 2 } } },
      { tier: 'major', weight: 2, text: 'Chaotic cascade — the serum keeps working after it should have stopped.', effect: { gainLbs: [15, 25], permanentConvert: { gainLbs: [4, 8] } } },
      { tier: 'critical', weight: 1, text: 'The batch goes wrong in a beautiful, terrifying way. Nothing looks the same afterward.', effect: { gainLbs: [20, 30], permanentConvert: { gainLbs: [8, 15], bodyTypeOverride: 'hourglass' } } },
    ],
  },
  weight_redistribution_rig: {
    id: 'weight_redistribution_rig',
    label: 'Weight Redistribution Rig',
    icon: '⚖️',
    form: 'worn',
    slot: 'fullBody',
    tier: 2,
    stability: 0.5,
    risk: 0.55,
    effectStrength: 0.8,
    maintenanceCost: 4,
    rarity: 'rare',
    desc: 'Pressure, vibration, and compounds that let Talia sculpt fat between major zones — intimate, controlling body redesign.',
    weeklyEffect: {
      bodyOverride: { bodyTypeOverride: 'pear', durationWeeks: 2 },
      psychDelta: { shame: 2, obsession: 1 },
    },
    useEffect: {
      bodyOverride: { bodyTypeOverride: 'pear', durationWeeks: 3 },
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'Lumpy redistribution — fat settles in uneven pockets.', effect: { psychDelta: { shame: 2 } } },
      { tier: 'moderate', weight: 3, text: 'Fat migrates to an unintended zone. She can feel it happening.', effect: { bodyOverride: { bodyTypeOverride: 'apple', durationWeeks: 2 } } },
      { tier: 'major', weight: 2, text: 'Lock-in mode sticks. The new shape holds longer than planned.', effect: { permanentConvert: { bodyTypeOverride: 'pear' } } },
    ],
  },
  remote_feeding_system: {
    id: 'remote_feeding_system',
    label: 'Remote Feeding System',
    icon: '📡',
    form: 'campus_tool',
    tier: 2,
    stability: 0.55,
    risk: 0.45,
    effectStrength: 0.75,
    maintenanceCost: 3,
    rarity: 'rare',
    desc: 'Drones, wireless tubes, and hidden pumps — feed a target from anywhere on campus without standing beside them.',
    campusModes: [
      { id: 'stealth', label: 'Stealth drip', gainLbs: [1, 3], psychDelta: { dependence: 1 }, discoveryRisk: 0.08 },
      { id: 'tease', label: 'Tease mode', gainLbs: [2, 4], psychDelta: { dependence: 2, fixation: 1 }, discoveryRisk: 0.12 },
      { id: 'force', label: 'Force pulse', gainLbs: [4, 7], bodyOverride: { stateType: 'bloated', stageBump: 1, durationWeeks: 1 }, psychDelta: { dependence: 3, shame: 1 }, discoveryRisk: 0.22 },
      { id: 'punishment', label: 'Punishment burst', gainLbs: [6, 10], bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 }, psychDelta: { dependence: 4, shame: 3 }, discoveryRisk: 0.35 },
    ],
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'The drone misses — delivery splashes the wrong bench.', effect: {} },
      { tier: 'moderate', weight: 3, text: 'Lag hits mid-pulse. Food lands on clothes in plain sight.', effect: { psychDelta: { shame: 4 } } },
      { tier: 'major', weight: 2, text: 'The system feeds the wrong person nearby.', effect: { gainLbs: [3, 6] } },
    ],
  },
  sleep_feeding_system: {
    id: 'sleep_feeding_system',
    label: 'Sleep-Feeding System',
    icon: '🌙',
    form: 'worn',
    slot: 'head',
    attachmentSlots: ['feedSource'],
    tier: 2,
    stability: 0.7,
    risk: 0.4,
    effectStrength: 0.85,
    maintenanceCost: 3,
    rarity: 'rare',
    desc: 'Soft mask, drip tubes, and sleep sensors — steady overnight calories while the target is helpless and unconscious.',
    weeklyEffect: {
      gainLbs: [4, 8],
      bodyOverride: { stateType: 'bloated', stageBump: 1, durationWeeks: 1 },
      psychDelta: { dependence: 4, fixation: 2 },
    },
    attachmentBonus: {
      feedSource: {
        liquid_fat_infuser: { gainLbsBonus: [3, 6], psychDelta: { fixation: 3, dependence: 2 } },
        calorie_paste_printer: { gainLbsBonus: [2, 4], psychDelta: { fixation: 1 } },
      },
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'The drip runs too slow — modest gains, restless sleep.', effect: { gainLbs: [1, 2] } },
      { tier: 'moderate', weight: 3, text: 'Deep-sleep overfeed — she wakes bloated and gurgling.', effect: { bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 1 }, gainLbs: [3, 6] } },
      { tier: 'major', weight: 2, text: 'Feeding continues after she wakes. Panic before the shutoff.', effect: { gainLbs: [6, 10], psychDelta: { shame: 5, dependence: 4 } } },
      { tier: 'critical', weight: 1, text: 'Runaway overnight pump — she cannot stop swallowing until empty.', effect: { gainLbs: [10, 16], psychDelta: { dependence: 8, obsession: 4 } } },
    ],
  },
  feeding_mask: {
    id: 'feeding_mask',
    label: 'Feeding Mask',
    icon: '🎭',
    form: 'worn',
    slot: 'head',
    attachmentSlots: ['feedSource', 'captureUpgrade'],
    tier: 2,
    stability: 0.6,
    risk: 0.55,
    effectStrength: 0.9,
    maintenanceCost: 3,
    rarity: 'rare',
    desc: 'A locking lower-face mask that forces consumption through an integrated tube — you will eat.',
    weeklyEffect: {
      gainLbs: [3, 7],
      psychDelta: { dependence: 3, shame: 2 },
    },
    useEffect: {
      gainLbs: [5, 9],
      bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 },
      psychDelta: { dependence: 4, shame: 3 },
    },
    campusModes: [
      { id: 'steady', label: 'Steady force-feed', gainLbs: [5, 9], psychDelta: { dependence: 3, shame: 2 }, discoveryRisk: 0.18 },
      { id: 'capture', label: 'Predator capture + feed', gainLbs: [6, 11], bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 }, psychDelta: { dependence: 5, shame: 4 }, discoveryRisk: 0.32 },
    ],
    attachmentBonus: {
      feedSource: {
        liquid_fat_infuser: { gainLbsBonus: [4, 8], psychDelta: { fixation: 4 } },
      },
    },
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'A seal leaks — paste smears her chin.', effect: { psychDelta: { shame: 2 } } },
      { tier: 'moderate', weight: 3, text: 'Flow spikes. She chokes, swallows, and keeps swelling.', effect: { gainLbs: [4, 7], bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 } } },
      { tier: 'major', weight: 2, text: 'The mask locks until a quota is met.', effect: { gainLbs: [8, 12], psychDelta: { dependence: 6 } } },
    ],
  },
  predator_capture_module: {
    id: 'predator_capture_module',
    label: 'Predator Capture Module',
    icon: '🕷️',
    form: 'attachment',
    attachesTo: ['feeding_mask'],
    attachSlot: 'captureUpgrade',
    tier: 3,
    stability: 0.65,
    risk: 0.7,
    effectStrength: 0.95,
    maintenanceCost: 2,
    rarity: 'rare',
    desc: 'Launch-and-lock arms plus mild sedative gas — grab unwilling targets on campus and mask them before they can flee.',
    weeklyEffect: {},
    campusCapture: true,
  },
  liquid_fat_infuser: {
    id: 'liquid_fat_infuser',
    label: 'Liquid Fat Infuser',
    icon: '💧',
    form: 'attachment',
    attachesTo: ['auto_feeder_arm', 'sleep_feeding_system', 'feeding_mask'],
    attachSlot: 'feedSource',
    tier: 2,
    stability: 0.55,
    risk: 0.6,
    effectStrength: 0.95,
    maintenanceCost: 3,
    rarity: 'rare',
    desc: 'Turns ordinary liquids into dense fattening slurry — devastating in Water Fattening mode.',
    weeklyEffect: {},
    useEffect: {
      gainLbs: [6, 12],
      bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 1 },
      psychDelta: { fixation: 4, dependence: 3 },
    },
    campusModes: [
      { id: 'water_subtle', label: 'Subtle water fattening', gainLbs: [2, 4], psychDelta: { fixation: 2 }, discoveryRisk: 0.1 },
      { id: 'water_aggressive', label: 'Aggressive infusion', gainLbs: [5, 9], bodyOverride: { stateType: 'bloated', stageBump: 2, durationWeeks: 1 }, psychDelta: { fixation: 4, dependence: 2 }, discoveryRisk: 0.25 },
    ],
    malfunctions: [
      { tier: 'minor', weight: 4, text: 'Uneven flow — pockets of heavy slurry and air.', effect: { gainLbs: [2, 4] } },
      { tier: 'moderate', weight: 3, text: 'Sudden heavy infusion — belly balloons in minutes.', effect: { gainLbs: [6, 10], bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 1 } } },
      { tier: 'major', weight: 2, text: 'Compound overload — temporary immobility from sheer fullness.', effect: { gainLbs: [10, 15], psychDelta: { shame: 5 } } },
      { tier: 'critical', weight: 1, text: 'The compound lingers — every drink hits harder for days.', effect: { gainLbs: [8, 12], psychDelta: { fixation: 8, dependence: 5 } } },
    ],
  },
  living_furniture_rig: {
    id: 'living_furniture_rig',
    label: 'Living Furniture Rig',
    icon: '🪑',
    form: 'worn',
    slot: 'fullBody',
    tier: 3,
    stability: 0.5,
    risk: 0.65,
    effectStrength: 0.9,
    maintenanceCost: 5,
    rarity: 'rare',
    desc: 'Restraints and reshaping frames that turn a person into functional furniture — chair, couch, ottoman — fed to stay comfortable.',
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
      { tier: 'minor', weight: 4, text: 'The frame creaks — uncomfortably sensitive padding.', effect: { psychDelta: { shame: 3 } } },
      { tier: 'moderate', weight: 3, text: 'She moans when someone sits. Hard to pretend it is normal furniture.', effect: { psychDelta: { shame: 5, dependence: 2 } } },
      { tier: 'major', weight: 2, text: 'Lock-in extends — furniture form holds another week.', effect: { bodyOverride: { stateType: 'furniture', stageBump: 2, durationWeeks: 3 } } },
      { tier: 'critical', weight: 1, text: 'She starts answering to the furniture name Talia gave her.', effect: { psychDelta: { obsession: 8, dependence: 6 } } },
    ],
  },
};

export function getDevice(defId) {
  return DEVICES[defId] || null;
}

export function devicesForStage(stage) {
  return Object.values(DEVICES).filter(d => (d.tier ?? 1) <= stage);
}

export function isPortableDevice(def) {
  return def && def.form !== 'installed';
}

export function isCampusTool(def) {
  return def?.form === 'campus_tool' || (def?.campusModes?.length > 0);
}
