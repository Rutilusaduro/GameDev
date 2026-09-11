// Floor talk — suggest indulgence composable beats (late-game; pass 57 is bridge-only).
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.suggest.indulgenceWarmth', [
  {
    when: {},
    weight: 2,
    text: [
      'The moment stretches — hall-quiet, plates implied, appetite already leaning your way.',
      'Warmth pools in the room the way fullness pools in her; nobody rushes the offer.',
      'Late-semester indulgence feels tender — wellness framing ready, seconds unmistakable.',
      'Fabric shifts when she breathes; she does not hide hunger anymore, just waits for permission.',
      'Hunger hums under polite small talk; you both hear it like shared secret.',
    ],
  },
]);

registerPool('talk.suggest.indulgenceInvite', [
  {
    when: {},
    weight: 2,
    text: [
      '{subject.name} meets your eyes like the rest of the floor can wait — fork, tray, or delivery.',
      'You phrase it as care; she hears it as invitation — co-conspirator smile, softer waistline.',
      'Clipboard stays out of sight; the suggestion lands like a hug with portions.',
      'Every choice tonight will show on the scale and in how she looks at you afterward.',
      'Hall Ambiance thins outside the door; inside, indulgence feels like policy you wrote together.',
    ],
  },
]);

const INDULGENCE_SKELETON = '{talk.suggest.indulgenceWarmth|prefix:} {talk.suggest.indulgenceInvite|prefix: }';

const BRANCH_KEYS = [
  'talk.suggest_indulgence',
  'talk.suggest_indulgence.b00',
  'talk.suggest_indulgence.b01',
  'talk.suggest_indulgence.b10',
  'talk.suggest_indulgence.b11',
  'talk.suggest_indulgence.b20',
  'talk.suggest_indulgence.b21',
];

for (const key of BRANCH_KEYS) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [INDULGENCE_SKELETON],
    },
    {
      when: { weekMin: 18 },
      weight: 4,
      priority: 4,
      text: [INDULGENCE_SKELETON],
    },
  ]);
}
