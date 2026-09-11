// Evolution blurb tails (Pass 126).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolution.blurb.influencer', [
  {
    when: { archetype: ['influencer'] },
    weight: 1,
    text: [
      'She films, deletes, reframes — the new angle is appetite, and the quad is already watching.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.inventor', [
  {
    when: { archetype: ['inventor'] },
    weight: 1,
    text: [
      'Midnight bench littered with harness specs — she models growth as a control problem you can authorize.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.pharmacy_grad', [
  {
    when: { archetype: ['pharmacy_grad'] },
    weight: 1,
    text: [
      'After-hours dosage tables — appetite curves crossed out until the safe delivery route wins.',
    ],
  },
]);
