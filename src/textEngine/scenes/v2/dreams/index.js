// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// V2.0 Appetite Dreams prose
import { registerPool, render } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import './depth.js';

registerPool('dream.open', [
  { when: { stageMin: 8 }, text: [
    'She dreams in landscapes of flesh — rooms that breathe, food that arrives before want forms, her body vast and warm and unashamed.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Sleep opens into appetite\'s country — symbolic, generous, impossible to map on waking.',
  ]},
  { when: { stageMax: 3 }, text: [
    'The dream is soft-edged — curiosity more than spectacle, hunger still learning its own name.',
  ]},
  { when: {}, text: [
    'Sleep opens. The spirit walks the corridors of her appetite.',
    'Dream borders dissolve. Food waits on the other side of closed eyes.',
  ]},
]);

registerPool('dream.endless_buffet', [
  { when: { stageMin: 5 }, text: [
    'Tables past counting stretch into dream-distance. She eats walking, never reaching the end — and does not want to.',
  ]},
  { when: {}, text: [
    'Tables stretch to infinity. Every dish is hers. She eats walking, eating, never reaching the end — and does not want to.',
  ]},
]);

registerPool('dream.floating_cake', [
  { when: {}, text: [
    'A cake the size of a room drifts in zero gravity. She pulls off handfuls and eats them like clouds — sweet, impossible, hers.',
    'Frosting in the air. She bites the dream and sweetness answers.',
  ]},
]);

registerPool('dream.feast_hall', [
  { when: { stageMin: 4 }, text: [
    'Torches. Long tables. She sits at the head and they keep bringing courses until her belly is a throne honored by the hall.',
  ]},
  { when: {}, text: [
    'Torches. Long tables. She sits at the head and they keep bringing courses until her belly is a throne.',
  ]},
]);

registerPool('dream.honey_river', [
  { when: {}, text: [
    'Golden water up to her waist. She drinks and drinks. Sweetness coats her throat, her chest, the soft weight of her.',
    'Honey to the hips. She wades deeper and tastes permission.',
  ]},
]);

registerPool('dream.mirror_feast', [
  { when: { stageMin: 5 }, text: [
    'Her reflection eats across the glass with perfect hunger. She feeds it. It feeds her. Fullness doubles.',
  ]},
  { when: {}, text: [
    'Her reflection eats across the glass. She feeds it. It feeds her. Fullness doubles.',
  ]},
]);

registerPool('dream.gravity_well', [
  { when: { stageMin: 6 }, text: [
    'Food orbits her like planets at monumental scale. She opens her mouth and the orbit decays — everything falls in.',
  ]},
  { when: {}, text: [
    'Food orbits her like planets. She opens her mouth and the orbit decays — everything falls in.',
  ]},
]);

registerPool('dream.leviathan_dream', [
  { when: { stageMin: 8 }, text: [
    'She is the mountain in the dream. Rivers of sauce run down her slopes. She eats the landscape and it eats her back.',
  ]},
  { when: {}, text: [
    'She is the mountain. Rivers of sauce run down her slopes. She eats the dream and the dream eats her back.',
  ]},
]);

registerPool('dream.wake', [
  { when: { stageMin: 6 }, text: [
    'She wakes into a body still humming with dream-fullness — hands to belly before eyes open.',
  ]},
  { when: {}, text: [
    'She wakes sticky with want. Her hands go to her belly before her eyes fully open.',
    'Morning light. Hunger already ahead of her. The dream clings like warmth.',
  ]},
]);

function withDreamDepth(base, depthKey, ctx, chance) {
  const trimmed = base?.trim() || '';
  const local = render(`{${depthKey}}`, ctx)?.trim();
  const combined = local && trimmed ? `${trimmed}\n\n${local}` : (local || trimmed);
  return appendV2Depth(combined, 'dream', ctx, chance);
}

export function renderDreamOpen(ctx) {
  return withDreamDepth(render('{dream.open}', ctx), 'dream.open.depth', ctx, 0.35);
}
export function renderDreamScenario(scenarioId, ctx) {
  const out = render(`{dream.${scenarioId}}`, ctx);
  const base = out?.trim() || render('{dream.endless_buffet}', ctx);
  return withDreamDepth(base, `dream.${scenarioId}.depth`, ctx, 0.32);
}
export function renderDreamWake(ctx) {
  return withDreamDepth(render('{dream.wake}', ctx), 'dream.wake.depth', ctx, 0.3);
}
