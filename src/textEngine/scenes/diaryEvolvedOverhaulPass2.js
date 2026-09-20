// The Squad — Lead: A2 Psych | Support: A5 Editor
// Evolved diary c2/c3 depth — stages 5–10, corruption-keyed.
import { registerModuleVariants } from '../engine.js';

const W = 3;

const forms = [
  'eating_competitor', 'speed_eater', 'ranked_feedee', 'chapter_hostess',
  'body_positive_greek', 'eating_diarist', 'big_squad_captain',
];

forms.forEach((form) => {
  registerModuleVariants(`diary.${form}.c2`, [
    { when: { stageMin: 5, stageMax: 7, corruption: [0] }, weight: W, text: [
      'I still double-check the number like it might be a mistake. It never is. Appetite keeps winning the argument.',
      'Restraint visits less often. When it does, I feed it until it leaves.',
    ]},
    { when: { stageMin: 5, stageMax: 7, corruption: [2] }, weight: W, text: [
      'Want is not a flaw in the data. Want is the data.',
      'I stopped apologizing to the mirror. The mirror adjusted.',
    ]},
    { when: { stageMin: 8, corruptionMin: 1 }, weight: W, text: [
      'Scale, chair, room — all negotiated in my favor now. I eat like policy.',
    ]},
  ]);
  registerModuleVariants(`diary.${form}.c3`, [
    { when: { stageMin: 6, corruption: [1] }, weight: W, text: [
      'Fullness feels like completion, not excess. I schedule around it.',
    ]},
    { when: { stageMin: 9 }, weight: W, text: [
      'Mass is momentum. I do not brake for shame anymore.',
    ]},
    { when: {}, text: [
      'Another week, another inch of honesty. Body and appetite aligned.',
    ]},
  ]);
});

registerModuleVariants('diary.sumo.c2', [
  { when: { stageMin: 6, corruption: [1] }, weight: 4, text: [
    'Dana and I share warmup rice now. Rivals who understand the menu.',
  ]},
]);

registerModuleVariants('diary.feedee_creator.c2', [
  { when: { stageMin: 6, corruptionMin: 2 }, weight: 4, text: [
    'Wren films my appetite like art. Chat tips when I take another bite. Everyone wins.',
  ]},
]);
