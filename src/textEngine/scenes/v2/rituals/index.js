// The Squad — Lead: A1 Mobile | Support: A5 Editor
// V2.0 Feast Rituals prose
import { registerPool, render } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import './depth.js';

registerPool('ritual.communion_snack', [
  { when: {}, text: [
    '{ritual.communion_snack.beat} {ritual.communion_snack.after}',
  ]},
]);
registerPool('ritual.communion_snack.beat', [
  { when: { stageMin: 5 }, text: [
    'A shared plate between them — fingers brushing, crumbs falling, bellies rising in quiet synchrony.',
  ]},
  { when: {}, text: [
    'A shared plate between them — fingers brushing, crumbs falling, nobody pretending they are not watching each other eat.',
  ]},
]);
registerPool('ritual.communion_snack.after', [
  { when: {}, text: [
    'Fullness settles in pairs. The room smells like butter and surrender.',
    'Two appetites satisfied together. The ritual is small. The intimacy is not.',
  ]},
]);

registerPool('ritual.hall_banquet', [
  { when: { stageMin: 6 }, text: [
    'Courses arrive like architecture — soup, bread, mains, dessert refusing refusal. Competitive chewing softens into collective surrender.',
  ]},
  { when: {}, text: [
    'Courses arrive in sequence — soup, bread, mains, something sweet that nobody refuses. The room fills with heat and chewing. Appetite becomes ceremony.',
  ]},
]);

registerPool('ritual.sacred_gluttony', [
  { when: { stageMin: 8 }, text: [
    'Candles. Platters like altars. Six or more bellies rise in devotional unison — influence drinking restraint from the air.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Candles. Platters like altars. They eat with the focus of worshippers — bellies rising, breath deepening, influence saturating the room, drinking restraint dry.',
  ]},
  { when: {}, text: [
    'Floor feast: the hall eats as one body with many mouths. Fullness is the only sermon.',
  ]},
]);

registerPool('ritual.leviathan_vigil', [
  { when: { stageMin: 9 }, text: [
    'Bedside feasts for immobile grandeur — food carried like tribute to warm, vast altars that cannot travel.',
  ]},
  { when: {}, text: [
    'Bedside feasts for bodies too vast to travel. Food brought like offerings to warm, immobile altars. They eat lying down and still take more than the room expected.',
  ]},
]);

registerPool('ritual.generic', [
  { when: {}, text: [
    'The ritual completes. Bellies swell. The resonance is satisfied.',
    'Ceremony ends. Fullness remains. Appetite consecrated.',
  ]},
]);

function withRitualDepth(base, ritualId, ctx) {
  const trimmed = base?.trim() || '';
  const local = render(`{ritual.${ritualId}.depth}`, ctx)?.trim()
    || render('{ritual.generic.depth}', ctx)?.trim();
  const combined = local && trimmed ? `${trimmed}\n\n${local}` : (local || trimmed);
  return appendV2Depth(combined, 'ritual', ctx, 0.38);
}

export function renderRitual(ritualId, ctx) {
  const key = `ritual.${ritualId}`;
  const out = render(`{${key}}`, ctx);
  const base = out?.trim() || render('{ritual.generic}', ctx);
  return withRitualDepth(base, ritualId, ctx);
}
