// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// V2.0 Appetite Dreams prose
import { registerPool, render } from '../../../engine.js';

registerPool('dream.open', [
  { when: { stageMin: 8 }, text: [
    'She dreams in landscapes of flesh — rooms that breathe, food that arrives before want forms, her body vast and warm and unashamed.',
  ]},
  { when: {}, text: [
    'Sleep opens. The spirit walks the corridors of her appetite.',
  ]},
]);

registerPool('dream.endless_buffet', [
  { when: {}, text: [
    'Tables stretch to infinity. Every dish is hers. She eats walking, eating, never reaching the end — and does not want to.',
  ]},
]);
registerPool('dream.floating_cake', [
  { when: {}, text: [
    'A cake the size of a room drifts in zero gravity. She pulls off handfuls and eats them like clouds — sweet, impossible, hers.',
  ]},
]);
registerPool('dream.feast_hall', [
  { when: {}, text: [
    'Torches. Long tables. She sits at the head and they keep bringing courses until her belly is a throne.',
  ]},
]);
registerPool('dream.honey_river', [
  { when: {}, text: [
    'Golden water up to her waist. She drinks and drinks. Sweetness coats her throat, her chest, the soft weight of her.',
  ]},
]);
registerPool('dream.mirror_feast', [
  { when: {}, text: [
    'Her reflection eats across the glass. She feeds it. It feeds her. Fullness doubles.',
  ]},
]);
registerPool('dream.gravity_well', [
  { when: {}, text: [
    'Food orbits her like planets. She opens her mouth and the orbit decays — everything falls in.',
  ]},
]);
registerPool('dream.leviathan_dream', [
  { when: {}, text: [
    'She is the mountain. Rivers of sauce run down her slopes. She eats the dream and the dream eats her back.',
  ]},
]);

registerPool('dream.wake', [
  { when: {}, text: [
    'She wakes sticky with want. Her hands go to her belly before her eyes fully open.',
    'Morning light. Hunger already ahead of her. The dream clings like warmth.',
  ]},
]);

export function renderDreamOpen(ctx) { return render('{dream.open}', ctx); }
export function renderDreamScenario(scenarioId, ctx) {
  const out = render(`{dream.${scenarioId}}`, ctx);
  return out?.trim() || render('{dream.endless_buffet}', ctx);
}
export function renderDreamWake(ctx) { return render('{dream.wake}', ctx); }
