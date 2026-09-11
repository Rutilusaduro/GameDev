// The Squad — Lead: A2 Psych | Support: A3 Immobility
// Mid-ladder evolved diary chapter beats (stages 7–10).
import { registerModuleVariants } from '../engine.js';

const W = 3;

registerModuleVariants('diary.eating_streamer.c1', [
  { when: { stageMin: 7, stageMax: 9 }, weight: W, text: [
    'Chat knows my schedule better than I do. I know my appetite better than both. Alignment.',
    'Brand deals arrive with calories attached. I read the contract with one hand on a plate.',
  ]},
]);

registerModuleVariants('diary.feedee_creator.c1', [
  { when: { stageMin: 7, stageMax: 9, corruptionMin: 1 }, weight: W, text: [
    'Wren and I measure success in watch hours and waist inches. Both metrics up. Good week.',
  ]},
]);

registerModuleVariants('diary.sumo.c1', [
  { when: { stageMin: 7, stageMax: 9, corruption: [2] }, weight: W, text: [
    'The dohyo remembers my weight before I step in. I eat to make the memory honest.',
  ]},
]);

registerModuleVariants('diary.body_positive_creator.c1', [
  { when: { stageMin: 7, stageMax: 10 }, weight: W, text: [
    'Message unchanged: your body is good. Mine demonstrates at scale now. Comments agree.',
  ]},
]);

registerModuleVariants('diary.food_researcher.c1', [
  { when: { stageMin: 8 }, weight: W, text: [
    'Field notes: appetite correlates with warmth, company, and second servings. Publishing soon.',
  ]},
]);
