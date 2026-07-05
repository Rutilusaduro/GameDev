// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerModuleVariants } from '../../../engine.js';

const W = 4;

registerModuleVariants('asc.ceremony.emergence', [
  { when: { studentId: 3, formId: 'mermaid' }, weight: W, asserts: { 'asc.reborn': true }, text: [
    "The pool lifts her at a hundred pounds — tail lane-line blue, shoulders still a swimmer's.",
    'She breaks the surface light and laughing; the water keeps her before gravity argues.',
    'Serena rises in lane-line blue, small again only by numbers, every inch trained and certain.',
  ]},
]);

registerModuleVariants('asc.ceremony.firstWords', [
  { when: { studentId: 3, formId: 'mermaid' }, weight: W, text: [
    `Serena laughs once, sharp and pleased. "No weight class in open water. Finally."`,
    `"Same athlete," Serena says, grinning at her hands. "New event. I'll take the water."`,
    `Serena looks at the pool, then at you. "Start the clock. I want to see what this body does."`,
  ]},
]);

registerModuleVariants('asc.decline.line', [
  { when: { studentId: 3, formId: 'mermaid' }, weight: W, text: [
    `"Not yet," Serena says, easy, like a postponed race. "I'll hold the line until you're ready."`,
    `"Go," Serena says. "I'll be here. Water doesn't rush the swimmer."`,
    `Serena nods toward the water. "No false starts. We do it when we both mean it."`,
  ]},
]);
