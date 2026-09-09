// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// V2.0 Craving Resonance prose
import { registerPool, render, createContext } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import './depth.js';

registerPool('res.link', [
  { when: {}, text: [
    'Something threads between them — invisible, hungry. When one eats, the other will feel it before the week is out.',
    'You bind their appetites. A quiet pact. Craving will travel the wire.',
    'Linked at the level of want — appetite braided, contagious, quietly inevitable.',
  ]},
]);

registerPool('res.pulse', [
  { when: { stageMin: 6 }, text: [
    'Across campus, her linked sister feels it — a sudden hollow behind the ribs, a warmth in the belly that was not there a moment ago.',
    'Resonance translates feeding into feeling — her mouth opens though she did not choose hunger yet.',
  ]},
  { when: { stageMin: 3 }, text: [
    'A tremor of borrowed appetite — not quite pain, not quite thought, just the ghost of someone else\'s bite.',
  ]},
  { when: {}, text: [
    'The resonance hums. Somewhere else, another mouth opens without quite knowing why.',
    'Pulse across the wire — hunger echoing hunger, soft and immediate.',
  ]},
]);

registerPool('res.surge', [
  { when: { stageMin: 7 }, text: [
    'Hive surge — the linked floor hungers as one body with many mouths. Delivery apps light up in synchrony.',
  ]},
  { when: { stageMin: 4 }, text: [
    'The network peaks. Snack drawers empty. Fullness echoes between dorms like weather.',
  ]},
  { when: {}, text: [
    'The hall hungers as one. Snack drawers empty. Delivery apps light up. The resonance network sings — a chord of appetite no single girl started alone.',
    'A surge rolls through the linked girls. Fullness echoes. Crumbs multiply. Resonance deepens through the harmony.',
  ]},
]);

function withLocalDepth(base, depthKey, ctx, v2Kind, chance) {
  const trimmed = base?.trim() || '';
  const local = render(`{${depthKey}}`, ctx)?.trim();
  const combined = local && trimmed ? `${trimmed}\n\n${local}` : (local || trimmed);
  return appendV2Depth(combined, v2Kind, ctx, chance);
}

export function renderResonanceLink(ctx) {
  return withLocalDepth(render('{res.link}', ctx), 'res.link.depth', ctx, 'resonance', 0.35);
}
export function renderResonancePulse(ctx) {
  return withLocalDepth(render('{res.pulse}', ctx), 'res.pulse.depth', ctx, 'resonance', 0.32);
}
export function renderResonanceSurge(ctx) {
  return withLocalDepth(render('{res.surge}', ctx), 'res.surge.depth', ctx, 'resonance', 0.38);
}
