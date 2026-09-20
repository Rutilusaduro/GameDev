// The Squad — Lead: A5 Editor | Support: A2 Psych
// V2 depth pool expansion — appendV2Depth kinds get richer variants.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('lab.v2.depth', [
  { when: { stageMin: 6 }, weight: 3, text: [
    'Workshop heat and measured calories — invention treating appetite as engineering problem, solved warmly.',
  ]},
  { when: {}, text: [
    'Grease, blueprints, and the quiet promise of hardware that feeds on schedule.',
  ]},
]);

registerModuleVariants('scrutiny.v2.depth', [
  { when: {}, weight: 2, text: [
    'Paperwork watches — you keep feeding anyway, hall warmth louder than clipboard shame.',
  ]},
]);

registerModuleVariants('campusSecret.v2.depth', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'Secret found — appetite hidden in architecture, yours to spend.',
  ]},
]);

registerModuleVariants('journal.v2.depth', [
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'Ink and fullness share the page — honesty without performance.',
  ]},
]);

registerModuleVariants('evolved.v2.depth', [
  { when: { stageMin: 7 }, weight: 3, text: [
    'Evolved life means appetite as profession — the week feeds the legend on purpose.',
  ]},
]);

registerModuleVariants('embodiment.v2.depth', [
  { when: { stageMin: 6 }, weight: 3, text: [
    'Piloting her mass across campus — every step a negotiation between gravity and want.',
  ]},
]);

registerModuleVariants('opposition.v2.depth', [
  { when: {}, weight: 2, text: [
    'Institutional friction — policy searching for a throat to choke; dinner still wins.',
  ]},
]);

registerModuleVariants('homeroom.v2.depth', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'Floor culture bends around fed bodies — your hall sets the menu for the week.',
  ]},
]);
