// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. The player-facing consent choice.
registerPool('asc.decline.prompt', [
  { when: {}, text: [
    'She is asking you to see this through, and the choice is yours.',
    'The threshold opens; only your yes completes it.',
    'She will not cross without your witness.',
    'The moment waits on your word — vast, patient, hungry for permission.',
    'She has come this far. The last step is yours to grant or withhold.',
  ]},
]);

// Shape: DIALOGUE BEAT. Valid decline response; persona files extend this.
registerPool('asc.decline.line', [
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} nods, relieved and disappointed braided together. "Okay. When you're ready."`,
    `"I understand," {subject.first} says quietly. "I'll wait."`,
    `{subject.name} steps back, vast and patient. "No rush. I'll be here."`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} steps back from the line. "Not yet," she says. "But soon."`,
    `"I'll be here," {subject.first} murmurs. "Bigger. Patient."`,
    `{subject.name} almost smiles. "Soon. You'll know when."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} nods once. "Fine. I can wait at the top. I'm good at waiting now."`,
    `"Take your time," {subject.name} says, amused. "I'm not getting smaller while you decide."`,
    `{subject.first} smiles. "The threshold isn't going anywhere. Neither am I."`,
  ]},
  { when: {}, text: [
    `{subject.name} steps back from the threshold. "When you are," she says. "Not before."`,
    `"I'll stay," {subject.first} murmurs. "You know where to find me."`,
    `{subject.name} almost smiles. "Take your time. I already got this far."`,
    `{subject.name} settles back into her vastness. "Ask again when you're ready."`,
  ]},
]);

// Shape: FULL SENTENCE. Post-decline state.
registerPool('asc.decline.after', [
  { when: {}, text: [
    'The threshold settles, not closed — held.',
    'Nothing is lost. She waits with the same steady heat.',
    'The offer remains in the room after the light withdraws.',
    'Warmth persists — vast, patient, certain the answer will come.',
    'The ladder ends here for now. She makes a home of the ending.',
  ]},
]);

// Shape: SKELETON. Decline beat.
registerPool('asc.decline.scene', [
  { when: {}, text: [
    '{asc.decline.prompt} {asc.decline.line} {asc.decline.after}',
    '{asc.decline.line} {asc.decline.prompt} {asc.decline.after}',
    '{asc.decline.prompt} {asc.decline.after} {asc.decline.line}',
    '{asc.decline.after} {asc.decline.prompt} {asc.decline.line}',
  ]},
]);
