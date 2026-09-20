// The Squad — Lead: A5 Editor | Support: A4 Architect
// Lab session + network proposal prose depth.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('lab.session.beat', [
  { when: {}, text: [
    'Talia wipes grease from her hands and grins — parts sorted, blueprints humming, the workshop smelling like hot metal and possibility.',
    'The session ends with bins full and Talia already sketching the next indulgence in calorie form.',
  ]},
  { when: { stageMin: 2 }, weight: 2, text: [
    'Mesh nodes blink online in the corner; Talia routes a test pulse and the air tastes faintly of syrup and compliance.',
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'She does not ask if the devices are ethical. She asks if they are hungry enough to work.',
  ]},
]);

registerModuleVariants('network.proposal.hook', [
  { when: {}, text: [
    'Talia slides a proposal across the bench — vents, relays, the quiet theft of surplus heat from cafeteria lines.',
    'A new routing plan glows on her tablet: calories as infrastructure, appetite as load-bearing design.',
    'She taps a schematic where pipes and pleasure overlap — "Approve this and the campus gets hungrier on schedule."',
  ]},
  { when: { stageMin: 3 }, weight: 2, text: [
    'Architect-phase schematics — nexus upgrades that treat the campus like a single stomach to fill.',
  ]},
]);

registerModuleVariants('week.recap.line', [
  { when: { gainBand: 'big', corruptionMin: 1 }, weight: 3, text: [
    'She catches herself in a window and does not look away — the week wrote itself across her without apology.',
  ]},
  { when: { stuffedWeek: true, stageMin: 4 }, weight: 3, text: [
    'Seven days of staying full left her drowsy, pleased, and visibly softer — hunger answered like a standing invitation.',
  ]},
  { when: { gainBand: 'trace', corruption: [0] }, weight: 2, text: [
    'Small changes, but she feels them when she sits — a gentler slope, a warmer center of gravity.',
  ]},
]);
