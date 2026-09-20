// The Squad — Lead: A1 Mobile | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('dinner.ending', [
  { when: { stageMin: 6 }, weight: 3, text: [
    'She leaves the table with her belt surrendered and her belly leading — satisfied, visible, unbothered.',
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'Dessert was never optional. She knew that walking in. She walks out fuller and smug.',
  ]},
  { when: {}, text: [
    'The check arrives and she is still picking at crumbs — appetite polite on the surface, hungry underneath.',
  ]},
]);

registerModuleVariants('dinner.conv.suggest_second', [
  { when: { stageMin: 5, corruption: [1] }, weight: 3, text: [
    'She laughs with her mouth full and does not apologize for either.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    'She covers her mouth when she giggles, then orders another round anyway.',
  ]},
]);
