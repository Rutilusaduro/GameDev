// Generate deviceFlavorDepth.js — pad device wildcard pools to ≥3 texts.
// Run: node scripts/generateDeviceDepth.mjs
import { readFileSync, writeFileSync } from 'fs';
import { DEVICES } from '../src/gameData/devices.js';
import { DEVICE_CATALOG_BLURBS } from '../src/textEngine/scenes/deviceFlavor.js';

const OUT_PATH = 'src/textEngine/scenes/deviceFlavorDepth.js';

const CATALOG_ALT = {
  feeding_mask: [
    'Harness locks; pump delivers on schedule — mechanical feeding without negotiation.',
    'Intake rig calibrated to advance her whether she is ready or not.',
  ],
  auto_feeder_arm: [
    'Servo arm cycles tray after tray — feeding as automation, appetite as output.',
    'Steady mechanical rhythm; she receives what the arm decides.',
  ],
  obedience_belt: [
    'Waist harness wired to compliance — hesitation costs, obedience rewards.',
    'Shame and dependence climb with every pound the belt counts.',
  ],
  auto_bloating_belt: [
    'Reinforced waist rig cycles pressure outward — middle volume on a timer.',
    'Slow relentless inflation; skin drum-tight, breath shallow with fullness.',
  ],
  living_furniture_rig: [
    'Restraints reshape her into functional furniture — fed to stay comfortable.',
    'Immobility as feature; harness presents belly, cushions weight.',
  ],
  reinforced_legs: [
    'Braced supports bear furniture-scale loads — stability while she swells.',
    'Thigh stabilizers creak; leverage where softness needs structure.',
  ],
  growth_accelerator_chamber: [
    'Sealed chamber warmth accelerates deposition — pleasurable, unpredictable growth.',
    'Radiation field hums; adipose answers faster than caution allows.',
  ],
  growth_serum_injector: [
    'One-shot volatile delivery — dramatic localized growth, never fully predictable.',
    'Compound floods tissue; curves answer before she can brace.',
  ],
  endless_hunger_engine: [
    'Handheld ray suppresses satiety — hunger becomes obsession until she feeds.',
    'Engine hum rewrites appetite; stomach insists past every limit.',
  ],
};

const PSYCH_ALT = {
  feeding_mask: [
    'Swallow reflex yields to the machine — body learning obedience by repetition.',
    'She stops counting bites; the mask counts for her.',
  ],
  auto_feeder_arm: [
    'Mechanical generosity removes choice — she eats because the arm insists.',
    'Rhythm replaces willpower; fullness arrives on schedule.',
  ],
  obedience_belt: [
    'Compliance settles into muscle memory — shame optional, obedience not.',
    'She breathes around the belt like it always belonged there.',
  ],
  auto_bloating_belt: [
    'Pressure becomes familiar — swelling expected, even welcomed.',
    'She tracks the cycle clinically, then surrenders to the swell.',
  ],
  living_furniture_rig: [
    'Furniture-comfort rewires want — stillness feels earned, feeding feels kind.',
    'She accepts the rig like a throne built for her size.',
  ],
  reinforced_legs: [
    'Braces make heaviness possible — she trusts the supports with her weight.',
    'Stability lets appetite run; the legs hold what the belly gains.',
  ],
  growth_accelerator_chamber: [
    'Growth surge thrills more than it frightens — she watches herself arrive.',
    'Chamber warmth breeds anticipation; change feels like reward.',
  ],
  growth_serum_injector: [
    'Serum heat spreads outward — curiosity wins over caution.',
    'She feels the compound work and does not ask it to stop.',
  ],
  endless_hunger_engine: [
    'Hunger rewrites the week — distress and want braid together.',
    'Appetite friction becomes obsession; feeding feels like relief.',
  ],
};

const TICK_ALTS = {
  'device.tick.malfClause': ['', '', ''],
  'device.tick.synergy': [''],
  'device.tick.gainTag': ['', ''],
  'device.tick.beat': [
    '{device.tick.action}{device.tick.anchor}{join:device.tick.dependence|prefix: — }; {device.tick.growth}{join:device.tick.sensation|prefix: — }.',
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A4 Architect | Support: A2 Psych, A5 Editor',
  '// Auto-generated — run: node scripts/generateDeviceDepth.mjs',
  '// Wildcard depth for device.catalog, device.psych, device.tick pools (Pass 34).',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

let poolCount = 0;

for (const deviceId of Object.keys(DEVICES)) {
  const catalogExtras = CATALOG_ALT[deviceId] || [
    'Lab-grade hardware tuned for deliberate, sensual advancement.',
    'Mechanical precision meets appetite — results measured in warmth and weight.',
  ];
  lines.push(`registerModuleVariants('device.catalog.${deviceId}', [{ when: {}, text: [${catalogExtras.map(esc).join(', ')}] }]);`);
  poolCount++;

  const psychExtras = PSYCH_ALT[deviceId] || [
    'Body learns the machine — sensation becoming familiar, then wanted.',
    'Hardware and appetite negotiate; want wins by degrees.',
  ];
  lines.push(`registerModuleVariants('device.psych.${deviceId}', [{ when: {}, text: [${psychExtras.map(esc).join(', ')}] }]);`);
  poolCount++;
}

for (const [key, extras] of Object.entries(TICK_ALTS)) {
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${extras.map(esc).join(', ')}] }]);`);
  poolCount++;
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateDeviceDepth: ${poolCount} pools → ${OUT_PATH}`);
