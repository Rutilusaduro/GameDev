// The Squad — Lead: A1 Mobile | Support: A5 Editor
// V2.0 Feast Rituals prose
import { registerPool, render } from '../../../engine.js';

registerPool('ritual.communion_snack', [
  { when: {}, text: [
    '{ritual.communion_snack.beat} {ritual.communion_snack.after}',
  ]},
]);
registerPool('ritual.communion_snack.beat', [
  { when: {}, text: [
    'A shared plate between them — fingers brushing, crumbs falling, nobody pretending they are not watching each other eat.',
  ]},
]);
registerPool('ritual.communion_snack.after', [
  { when: {}, text: [
    'Fullness settles in pairs. The room smells like butter and surrender.',
  ]},
]);

registerPool('ritual.class_banquet', [
  { when: {}, text: [
    'Courses arrive in sequence — soup, bread, mains, something sweet that nobody refuses. The room fills with heat and chewing. Appetite becomes ceremony.',
  ]},
]);

registerPool('ritual.sacred_gluttony', [
  { when: { stageMin: 5 }, text: [
    'Candles. Platters like altars. They eat with the focus of worshippers — bellies rising, breath deepening, the spirit drinking the room dry of restraint.',
  ]},
  { when: {}, text: [
    'Sacred gluttony: the class eats as one body with many mouths. Fullness is the only sermon.',
  ]},
]);

registerPool('ritual.leviathan_vigil', [
  { when: {}, text: [
    'Bedside feasts for bodies too vast to travel. Food brought like offerings to warm, immobile altars. They eat lying down and still take more than the room expected.',
  ]},
]);

export function renderRitual(ritualId, ctx) {
  const key = `ritual.${ritualId}`;
  const out = render(`{${key}}`, ctx);
  return out?.trim() || render('{ritual.generic}', ctx);
}

registerPool('ritual.generic', [
  { when: {}, text: [
    'The ritual completes. Bellies swell. The spirit is satisfied.',
  ]},
]);
