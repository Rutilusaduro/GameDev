// CG RA thread replies — composable wellness + competition slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { CG_RA_REPLY_TEXT } from '../../../gameData/competitiveGainerText.js';

registerPool('cg.raReply.wellnessFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'You keep the hall log neutral — appetite framed as wellness, competition as community.',
      'Clipboard closed; voice steady. The floor program language does the heavy lifting.',
      'RA reply lands soft: policy words, hungry subtext.',
    ],
  },
]);

registerPool('cg.raReply.boardNudge', [
  {
    when: {},
    weight: 2,
    text: [
      'Priya\'s corkboard pings; you acknowledge the numbers without feeding the feud.',
      'Someone tags the whole floor; you redirect to shared meals, not shame.',
      'The thread wants drama; you offer seconds instead.',
    ],
  },
]);

const RA_SKELETON = '{cg.raReply.wellnessFrame|prefix:} {cg.raReply.boardNudge|prefix: }';

for (const optId of Object.keys(CG_RA_REPLY_TEXT)) {
  registerModuleVariants(`cg.raReply.${optId}`, [
    {
      when: { weekMin: 12 },
      weight: 4,
      priority: 3,
      text: [RA_SKELETON],
    },
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [RA_SKELETON],
    },
  ]);
}
