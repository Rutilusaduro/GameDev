// CG corkboard + binge scenes — decomposed pools from competitiveGainerText.
import { registerDimension, registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
} from '../../../gameData/competitiveGainerText.js';
import { cgSceneTailBeat } from '../evolved/proseTails.js';

registerDimension('cgStageKey', (ctx) => ctx.globals?.cgStageKey ?? 'Heavy');
registerDimension('cgSceneVisit', (ctx) => String(ctx.globals?.cgSceneVisit ?? 0));

for (const [tier, scenes] of Object.entries(CG_FILLED_CORKBOARD_SCENES)) {
  const arr = Array.isArray(scenes) ? scenes : [scenes];
  arr.forEach((scene, idx) => {
    registerDecomposedPool(`cg.scene.corkboard.${tier}.v${idx}`, scene);
  });
  registerPool(`cg.scene.corkboard.${tier}`, [
    {
      when: { cgDriveTier: [tier] },
      weight: 2,
      text: [
        (ctx) => {
          const vi = Number(ctx.globals?.cgSceneVisit ?? 0);
          const i = vi % arr.length;
          const line = render(`{cg.scene.corkboard.${tier}.v${i}}`, ctx)?.trim();
          return line && !line.includes('{unresolved}') ? line : arr[i];
        },
        cgSceneTailBeat(`cork:${tier}`, 0),
        cgSceneTailBeat(`cork:${tier}`, 1),
      ],
    },
    {
      when: {},
      text: [
        (ctx) => {
          const vi = Number(ctx.globals?.cgSceneVisit ?? 0);
          const i = vi % arr.length;
          return arr[i];
        },
        cgSceneTailBeat(`cork:${tier}`, 2),
      ],
    },
  ]);
}

for (const [stageKey, tierMap] of Object.entries(CG_FILLED_BINGE_SCENES)) {
  for (const [tier, prose] of Object.entries(tierMap)) {
    const poolKey = `cg.scene.binge.${stageKey}.${tier}`;
    const bodyKey = `${poolKey}.body`;
    registerDecomposedPool(bodyKey, prose);
    registerPool(poolKey, [
      {
        when: { cgStageKey: [stageKey], cgDriveTier: [tier] },
        weight: 2,
        text: [
          (ctx) => {
            const line = render(`{${bodyKey}}`, ctx)?.trim();
            return line && !line.includes('{unresolved}') ? line : prose;
          },
          cgSceneTailBeat(`binge:${stageKey}:${tier}`, 0),
          cgSceneTailBeat(`binge:${stageKey}:${tier}`, 1),
        ],
      },
      {
        when: {},
        text: [
          (ctx) => prose,
          cgSceneTailBeat(`binge:${stageKey}:${tier}`, 2),
        ],
      },
    ]);
  }
}
