// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. The player-facing consent choice.
registerPool('asc.decline.prompt', [
  { when: {}, text: [
    'She is asking you to see this through, and the choice is yours.',
    'The threshold opens; only your yes completes it.',
    'She will not cross without your witness.',
  ]},
]);

// Shape: DIALOGUE BEAT. Valid decline response; persona files extend this.
registerPool('asc.decline.line', [
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} nods once. "Fine. I can wait at the top. I'm good at waiting now."`,
  ]},
  { when: {}, text: [
    `{subject.name} steps back from the threshold. "When you are," she says. "Not before."`,
    `"I'll stay," {subject.first} murmurs. "You know where to find me."`,
    `{subject.name} almost smiles. "Take your time. I already got this far."`,
  ]},
]);

// Shape: FULL SENTENCE. Post-decline state.
registerPool('asc.decline.after', [
  { when: {}, text: [
    'The threshold settles, not closed — held.',
    'Nothing is lost. She waits with the same steady heat.',
    'The offer remains in the room after the light withdraws.',
  ]},
]);

// Shape: SKELETON. Decline beat.
registerPool('asc.decline.scene', [
  { when: {}, text: [
    '{asc.decline.prompt} {asc.decline.line} {asc.decline.after}',
    '{asc.decline.line} {asc.decline.prompt} {asc.decline.after}',
    '{asc.decline.prompt} {asc.decline.after} {asc.decline.line}',
  ]},
]);
