// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// V2.0 Appetite Dreams prose
import { registerPool, registerModuleVariants, render } from '../../../engine.js';
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
    'Sleep opens. Influence walks the corridors of her appetite.',
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

registerPool('dream.night_kitchen', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'The galley is empty except for her and a fridge that knows her name. She takes one tray. Then another.',
    'Night kitchen light. She eats standing, guilty and warm, like the floor might still be asleep.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'Leftovers keep arriving. She sits on the counter and finishes them the way she finishes secrets.',
    'The fridge hums. She answers it with both hands. Morning is a rumor.',
  ]},
  { when: {}, text: [
    'The hall kitchen at 2 a.m. Trays from dinner still warm. She eats like the building asked her to.',
    'Night galley. She opens the fridge and the dream opens with it.',
    'Counters, foil, a chair that already knows her. She stays until the trays are empty.',
  ]},
]);

registerPool('dream.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She almost remembers the kitchen on waking. The hunger does the rest.',
    'The dream leaves a taste. She looks for it in the real fridge first.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Sleep lets go slowly. Appetite does not. Her hands are already on her middle.',
  ] },
  { when: {}, text: [
    'The dream sticks to her sheets like warmth.',
    'She wakes still chewing the idea of more.',
    'Morning finds her softer than the night promised.',
  ] },
]);

registerModuleVariants('dream.open', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Sleep opens on leftover heat. The dream kitchen already knows her name.',
    'She falls asleep still tasting foil. Appetite walks in without knocking.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover warmth follows her into sleep. The dream only has to continue.',
    'The galley started it. Sleep finishes the sitting.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You knocked after hours. The dream knocks the same door.',
  ] },
]);

registerModuleVariants('dream.night_kitchen', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'The dream galley is last night\'s galley. She finishes trays she already finished.',
    'Foil, fridge, leftover heat. Sleep just turns the lights lower.',
    'She eats the same second sitting again, slower, like the building asked twice.',
  ] },
]);

registerModuleVariants('dream.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'She wakes looking for the fridge she already raided.',
    'The dream leaves leftover taste. Morning has the same foil.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Sleep lets go. Leftover does not. Her hands find the same middle.',
    'She wakes still working last night\'s tray.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'The knock from the round is still in the wood when she wakes hungry.',
  ] },
]);

function withDreamDepth(base, depthKey, ctx, chance) {
  const trimmed = base?.trim() || '';
  const local = render(`{${depthKey}}`, ctx)?.trim();
  const linger = render('{dream.linger}', ctx)?.trim();
  const combined = [trimmed, local, linger].filter(Boolean).join('\n\n');
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
