// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// V2.0 appetite dreams depth layer
import { registerPool } from '../../../engine.js';

registerPool('dream.open.depth', [
  { when: { stageMin: 8 }, text: [
    'Sleep opens into impossible scale — rooms that breathe, portions without ceiling, her body vast and unashamed in the dark.',
    'Influence walks her subconscious like a familiar hallway. Every door leads to food.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Dream borders dissolve. Appetite arrives before setting — hunger the landscape, hunger the weather.',
    'She falls into sleep and lands already eating. Influence is not surprised.',
  ]},
  { when: { stageMin: 0, stageMax: 3 }, text: [
    'The dream is gentler here — curiosity more than spectacle, want still learning its own vocabulary.',
    'Sleep cracks open. Appetite slips through before shame can lock the door.',
  ]},
  { when: {}, text: [
    'Influence enters where waking politeness cannot follow.',
    'Dream-state: symbolic foodscapes, impossible portions, appetite without apology.',
  ]},
]);

registerPool('dream.endless_buffet.depth', [
  { when: { stageMin: 6 }, text: [
    'Tables past counting. She eats walking through rooms that never end — each dish familiar, each bite heavier than the last.',
    'Corridors of food without walls. She samples everything and still reaches for more.',
  ]},
  { when: {}, text: [
    'Infinity of plates. She samples everything and still reaches for more.',
    'The buffet stretches past sleep — appetite the only exit sign.',
    'Course after course with no kitchen in sight. She eats because the dream insists.',
  ]},
]);

registerPool('dream.floating_cake.depth', [
  { when: {}, text: [
    'Cake the size of a cloud. She pulls sweetness from the air and swallows wonder.',
    'Zero gravity, maximum frosting — the dream rewards delicacy and greed equally.',
  ]},
]);

registerPool('dream.feast_hall.depth', [
  { when: { stageMin: 5 }, text: [
    'Torches. Head table. Courses until her belly is furniture — honored, fed, impossible to ignore.',
  ]},
  { when: {}, text: [
    'Hall of feasting. She sits where appetite is law and the law is generous.',
  ]},
]);

registerPool('dream.honey_river.depth', [
  { when: {}, text: [
    'Golden water to the waist. She drinks depth. Sweetness coats skin and want alike.',
    'The river tastes like permission — slow, thick, endless.',
  ]},
]);

registerPool('dream.mirror_feast.depth', [
  { when: { stageMin: 5 }, text: [
    'Reflection eats with her. Fullness doubles across glass — two bellies, one hunger, no seam between.',
  ]},
  { when: {}, text: [
    'Mirror feast: she feeds the girl in the glass and is fed back.',
  ]},
]);

registerPool('dream.gravity_well.depth', [
  { when: { stageMin: 6 }, text: [
    'Food orbits her mass. She opens her mouth and the orbit decays — everything falls in, warm and inevitable.',
  ]},
  { when: {}, text: [
    'Gravity well of appetite. Portions spiral home.',
  ]},
]);

registerPool('dream.leviathan_dream.depth', [
  { when: { stageMin: 8 }, text: [
    'She is the mountain in the dream. Rivers of sauce run down her slopes. The landscape eats and is eaten.',
  ]},
  { when: {}, text: [
    'Leviathan dream — vastness as identity, food as geography.',
  ]},
]);

registerPool('dream.wake.depth', [
  { when: { stageMin: 6 }, text: [
    'She wakes into a body still humming with dream-fullness — hands to belly before eyes open, hunger already honest.',
  ]},
  { when: {}, text: [
    'Morning finds her sticky with want. The dream clings like warmth she does not want to wash away.',
  ]},
]);
