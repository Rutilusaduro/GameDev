// Competitive Gainer group chat — composable Priya post slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { CG_FILLED_CHAT_TEMPLATES } from '../../../gameData/competitiveGainerText.js';
import { CG_CHAT_TEMPLATES } from '../../../gameData/competitiveGainerData.js';

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
      'Late-semester corkboard drama — numbers, photos, and hunger braided into one public dare.',
      'Someone schedules a measurement session in the replies; envy and admiration share the same breath.',
    ],
  },
]);

const CHAT_SKELETON = '{cg.chat.boardTone|prefix:} {cg.chat.residentReply|prefix: }';

registerPool('cg.chat.followupSting', [
  {
    when: {},
    weight: 2,
    text: [
      'Priya replies to the thread — numbers cool, ego warm, challenge unmistakable.',
      'She quotes a measurement like a verdict; nobody pretends it is casual.',
      'The follow-up lands sharp: lead secured, gap widening, appetite public.',
    ],
  },
]);

registerPool('cg.chat.followupPride', [
  {
    when: {},
    weight: 2,
    text: [
      'Residents read between the lines; hunger spikes in the replies.',
      'Someone vows a binge tonight; someone else already booked the scale.',
      'Competition turns communal — envy and admiration in the same breath.',
    ],
  },
]);

const FOLLOWUP_SKELETON = '{cg.chat.followupSting|prefix:} {cg.chat.followupPride|prefix: }';

for (const fkey of Object.keys(CG_FILLED_CHAT_TEMPLATES.priyaFollowup || {})) {
  const tierMap = CG_FILLED_CHAT_TEMPLATES.priyaFollowup[fkey] || {};
  for (const tier of Object.keys(tierMap)) {
    registerModuleVariants(`cg.chat.priyaFollowup.${fkey}.${tier}`, [
      {
        when: { weekMin: 14 },
        weight: 4,
        priority: 3,
        text: [FOLLOWUP_SKELETON],
      },
      {
        when: { weekMin: 6 },
        weight: 2,
        priority: 2,
        text: [FOLLOWUP_SKELETON],
      },
    ]);
  }
}

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

const RESIDENT_EXTRA = ['Maya', 'Tiffany'];
const RESIDENT_REPLY_TYPES = ['ahead', 'behind', 'close', 'proud', 'unmeasured'];

for (const [name, replies] of Object.entries(CG_CHAT_TEMPLATES.residents || {})) {
  const safeName = name.replace(/\s+/g, '_');
  for (const replyType of Object.keys(replies || {})) {
    registerModuleVariants(`cg.chat.resident.${safeName}.${replyType}`, [
      {
        when: { weekMin: 18 },
        weight: 5,
        priority: 5,
        text: [CHAT_SKELETON],
      },
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 3,
        text: [CHAT_SKELETON],
      },
    ]);
  }
}

registerModuleVariants('cg.chat.priyaPost.leading.High', [
  {
    when: { cgDriveTier: ['High'] },
    weight: 1,
    text: [
      'Priya posts the leaderboard screenshot — your hall’s name sits at the top, soft and undeniable.',
    ],
  },
]);

for (const name of RESIDENT_EXTRA) {
  for (const replyType of RESIDENT_REPLY_TYPES) {
    registerModuleVariants(`cg.chat.resident.${name}.${replyType}`, [
      {
        when: { weekMin: 18 },
        weight: 5,
        priority: 5,
        text: [CHAT_SKELETON],
      },
    ]);
  }
}
