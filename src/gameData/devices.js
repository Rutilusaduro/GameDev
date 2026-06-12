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
