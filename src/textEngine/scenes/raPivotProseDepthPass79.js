// Evolved homestead / wife-lessons activity depth (Pass 79).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('evolved.activity.homestead_queen', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n}'s dorm smells like butter and brown sugar — homestead logic eating the hallway.`;
      },
      'Flour on the counter, warmth in the walls, nobody leaves hungry or on time.',
    ],
  },
]);

registerModuleVariants('evolved.activity.wife_lessons', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} teaches with her hands in the dough and her voice in their mothers' ears.`;
      },
      'Tuesday tradition thickens — recipes, relationships, and waistlines in the same bowl.',
    ],
  },
]);

registerModuleVariants('evolved.activity.eating_competitor', [
  {
    when: { evolvedStageIdx: [2] },
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} studies the plate like a finish line — regional day is just math with applause.`;
      },
    ],
  },
]);
