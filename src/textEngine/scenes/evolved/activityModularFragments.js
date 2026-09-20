// Evolved passive activities — atmosphere + stakes composable beats.
import { registerModuleVariants } from '../../engine.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedActivityData.js';

const ACTIVITY_SKELETON = '{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';

for (const formId of Object.keys(EVOLVED_ACTIVITY_TEXT)) {
  const stages = EVOLVED_ACTIVITY_TEXT[formId];
  if (!Array.isArray(stages)) continue;
  stages.forEach((_, si) => {
    registerModuleVariants(`evolved.activity.${formId}.s${si}.legacyBody`, [
      {
        when: { weekMin: 20, evolvedFormId: [formId], evolvedStageIdx: [si] },
        weight: 6,
        priority: 6,
        text: [ACTIVITY_SKELETON],
      },
      {
        when: { weekMin: 14, evolvedFormId: [formId], evolvedStageIdx: [si] },
        weight: 4,
        priority: 4,
        text: [ACTIVITY_SKELETON],
      },
    ]);
  });
  stages.forEach((_, si) => {
    registerModuleVariants(`evolved.activity.${formId}.s${si}`, [
      {
        when: { weekMin: 18, evolvedFormId: [formId], evolvedStageIdx: [si] },
        weight: 6,
        priority: 5,
        text: [ACTIVITY_SKELETON],
      },
    ]);
  });
  registerModuleVariants(`evolved.activity.${formId}`, [
    {
      when: { weekMin: 18 },
      weight: 5,
      priority: 4,
      text: [ACTIVITY_SKELETON],
    },
    {
      when: { weekMin: 10 },
      weight: 3,
      priority: 2,
      text: ['{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: }'],
    },
  ]);
}

registerModuleVariants('evolved.activity.eating_streamer', [
  {
    when: { evolvedStageIdx: [2] },
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} streams with bib centered — chat donates calories like ranked queue tips.`;
      },
    ],
  },
]);
