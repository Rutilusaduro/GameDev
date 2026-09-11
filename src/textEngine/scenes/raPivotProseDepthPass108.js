// Item use stage gate + fair boost tier beat (Pass 108) — session/WL/hall bridges retired.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('item.use.open', [
  {
    when: { endStageMin: [4] },
    weight: 1,
    text: [
      'You offer the {item.label} — {subject.name} accepts like the pantry was always meant to end here.',
    ],
  },
]);
