// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for memory callback pools (Pass 30).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('memory.self', [{ when: {}, text: [
  'Something from the last few weeks still lingers in how she carries herself.',
  'The past week left a mark she keeps touching without meaning to.',
] }]);

registerModuleVariants('memory.hall', [{ when: {}, text: [
  "Someone else's gain has become lounge furniture — noticed, filed, discussed in glances.",
  "The hall tracks who is changing; nobody pretends otherwise anymore.",
] }]);
registerModuleVariants('memory.class', [{ when: {}, text: [
  "Someone else's gain has become lounge furniture — noticed, filed, discussed in glances.",
  "The hall tracks who is changing; nobody pretends otherwise anymore.",
] }]);

registerModuleVariants('memory.self', [
  {
    when: { memScope: ['longArc'], memType: ['stuffed'] },
    weight: 1,
    text: [
      'That stuffed night still echoes — she reaches for seconds before she reaches for excuses.',
    ],
  },
]);
