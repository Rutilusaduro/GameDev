// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// V2.0 Craving Resonance prose
import { registerPool, render, createContext } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';

registerPool('res.link', [
  { when: {}, text: [
    'Something threads between them — invisible, hungry. When one eats, the other will feel it before the week is out.',
    'You bind their appetites. A quiet pact. Craving will travel the wire.',
  ]},
]);

registerPool('res.pulse', [
  { when: { stageMin: 6 }, text: [
    'Across campus, her linked sister feels it — a sudden hollow behind the ribs, a warmth in the belly that was not there a moment ago.',
  ]},
  { when: {}, text: [
    'The resonance hums. Somewhere else, another mouth opens without quite knowing why.',
  ]},
]);

registerPool('res.surge', [
  { when: {}, text: [
    'The class hungers as one. Snack drawers empty. Delivery apps light up. The resonance network sings — a chord of appetite no single girl started alone.',
    'A surge rolls through the linked girls. Fullness echoes. Crumbs multiply. The spirit drinks the harmony.',
  ]},
]);

export function renderResonanceLink(ctx) {
  return appendV2Depth(render('{res.link}', ctx), 'resonance', ctx, 0.35);
}
export function renderResonancePulse(ctx) {
  return appendV2Depth(render('{res.pulse}', ctx), 'resonance', ctx, 0.32);
}
export function renderResonanceSurge(ctx) {
  return appendV2Depth(render('{res.surge}', ctx), 'resonance', ctx, 0.38);
}
