// The Squad — Lead: A4 Architect | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('device.tick.action', [
  { when: { stageMin: 7 }, weight: 3, text: [
    'The rig cycles through its quota — pressure, warmth, measured calories routed into soft mass already eager to receive.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'Straps cinch, release, cinch again — the device treating appetite like a schedule she is learning to keep.',
  ]},
  { when: {}, text: [
    'Hardware hums; her body answers on cue — fuller by degrees, obedient without drama.',
  ]},
]);

registerModuleVariants('device.tick.sensation', [
  { when: { corruptionMin: 2 }, weight: 3, text: [
    'Pleasure and fullness braid together until she stops separating them.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'Weight gathers low and heavy; the sensation spreads slow, like warm syrup finding every curve.',
  ]},
]);
