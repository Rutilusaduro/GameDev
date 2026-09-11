// Campus find tier vignette (Pass 90) — generic find/travel bridges retired to fragments.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('campus.find', [
  {
    when: { campusTierMin: [2] },
    weight: 1,
    text: [
      'A maintenance closet yields sealed samples — campus wellness branding, appetite-forward chemistry.',
    ],
  },
]);
