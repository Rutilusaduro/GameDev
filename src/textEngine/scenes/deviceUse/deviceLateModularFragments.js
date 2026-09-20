// Device manual + campus remote beats — late-semester modular overlays.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('device.use.scene.labHum', [
  {
    when: {},
    weight: 2,
    text: [
      'The lab hums with warm paste and calibrated hunger — Hall Ambiance muted behind soundproofing that never quite works.',
      'Timers, hoses, and the soft click of a rig waking up: appetite engineered like a peer-reviewed ritual.',
      'Late-semester device nights smell like sugar coolant and someone breathing harder than wellness forms allow.',
      'Your hand on the control panel feels like permission with a warranty — every pulse logged in her body.',
      'Fluorescents flatten shame; the {device.label} does not pretend this is accidental.',
    ],
  },
]);

registerPool('device.use.scene.afterPulse', [
  {
    when: {},
    weight: 2,
    text: [
      'She carries the spike in her posture before the cycle finishes — growth as lifestyle, immediate and undeniable.',
      'Fullness blooms where the rig insists; she steadies like compliance was always the plan.',
      'The change is measurable on the spot — scale numbers waiting their turn while she swallows pride.',
      'Warm weight settles; need radiates off her when dependence has been training her for this.',
      'Control and consequence share the same readout — pounds, pressure, and a smile she cannot quite hide.',
    ],
  },
]);

registerPool('device.campus.scene.meshAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Campus mesh flickers — appetite routed through hall Wi‑Fi like a secret RAs pretend not to manage.',
      'Between rounds, the rig finds her anyway: remote pulse, local blush, wellness framing thin as coverage bars.',
      'Late-semester coverage maps hunger to hallways — you watch the ping land on {subject.name} and exhale.',
      'Distant machines tick; your deploy crosses quad air heavy with fryer vent and ambition.',
      'Hall Ambiance thins outdoors; the device does not care about property lines.',
    ],
  },
]);

registerPool('device.campus.scene.deployEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'Discovery risk tastes like adrenaline — she feels the hit before anyone names what happened.',
      'The hall log stays neutral; her middle does not.',
      'Remote kindness or remote cruelty — either way the portion lands and the crowd keeps moving.',
      'She steadies mid-step, already fuller than the itinerary promised.',
      'Your choice echoes in fabric strain and a glance that says she knows who pulled the trigger.',
    ],
  },
]);

const USE_LATE = '{device.use.scene.labHum|prefix:} {device.use.action|cap}; {device.use.sensation|cap}. {device.use.scene.afterPulse|prefix: }';
const CAMPUS_LATE = '{device.campus.scene.meshAir|prefix:} {device.campus.remote|cap} — {device.campus.discovery|cap}. {device.campus.scene.deployEcho|prefix: }';
const CAMPUS_HALL_LATE = '{device.campus.scene.meshAir|prefix:} {device.campus.hall|cap}. {device.campus.risk|cap}. {device.campus.scene.deployEcho|prefix: }';

registerModuleVariants('device.use.beat', [
  {
    when: { weekMin: 20 },
    weight: 5,
    priority: 6,
    text: [USE_LATE],
  },
  {
    when: { weekMin: 12 },
    weight: 3,
    priority: 3,
    text: [USE_LATE],
  },
]);

registerModuleVariants('device.campus.beat', [
  {
    when: { weekMin: 20, targetType: ['group_hall'] },
    weight: 5,
    priority: 6,
    text: [CAMPUS_HALL_LATE],
  },
  {
    when: { weekMin: 20 },
    weight: 5,
    priority: 6,
    text: [CAMPUS_LATE],
  },
  {
    when: { weekMin: 12 },
    weight: 3,
    priority: 3,
    text: [CAMPUS_LATE],
  },
]);
