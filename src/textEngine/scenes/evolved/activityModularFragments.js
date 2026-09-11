// Evolved passive activities — atmosphere + stakes composable beats.
import { registerModuleVariants } from '../../engine.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedActivityData.js';

const ACTIVITY_SKELETON = '{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';

for (const formId of Object.keys(EVOLVED_ACTIVITY_TEXT)) {
  if (!Array.isArray(EVOLVED_ACTIVITY_TEXT[formId])) continue;
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
