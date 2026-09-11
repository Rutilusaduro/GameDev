// Competitive Gainer group chat — composable Priya post slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { CG_FILLED_CHAT_TEMPLATES } from '../../../gameData/competitiveGainerText.js';

registerPool('cg.chat.boardTone', [
  {
    when: {},
    weight: 2,
    text: [
      'Priya posts the weekly numbers — waist, bust, hip, thigh — like a dare dressed as data.',
      'The corkboard photo catches light; every column is a challenge written in ink.',
      'She captions the update with a smiley that does not soften the competition.',
    ],
  },
]);

registerPool('cg.chat.residentReply', [
  {
    when: {},
    weight: 2,
    text: [
      'Replies stack up — envy, pride, hunger mirrored in equal measure.',
      'Someone threatens to book a measurement session; someone else already did.',
      'The thread turns competitive fast — every emoji is a dare.',
    ],
  },
]);

const CHAT_SKELETON = '{cg.chat.boardTone|prefix:} {cg.chat.residentReply|prefix: }';

const stageKeys = Object.keys(CG_FILLED_CHAT_TEMPLATES.priyaPost || {});
for (const stageKey of stageKeys) {
  const tierMap = CG_FILLED_CHAT_TEMPLATES.priyaPost[stageKey] || {};
  for (const tier of Object.keys(tierMap)) {
    registerModuleVariants(`cg.chat.priyaPost.${stageKey}.${tier}`, [
      {
        when: { weekMin: 16 },
        weight: 4,
        priority: 3,
        text: [CHAT_SKELETON],
      },
      {
        when: { weekMin: 6 },
        weight: 2,
        priority: 2,
        text: [CHAT_SKELETON],
      },
    ]);
  }
}
