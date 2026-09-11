// CG corkboard + binge scenes — decomposed pools from competitiveGainerText.
import { registerDimension, registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
  CG_FILLED_SELF_REVIEW,
  CG_FILLED_MEASUREMENT_REACTIONS,
} from '../../../gameData/competitiveGainerText.js';
import { cgSceneTailBeat } from '../evolved/proseTails.js';
import { fillCgTemplate } from './raReplyPools.js';

/** Map legacy `{var}` braces to engine slots so text:lint accepts decomposed CG prose. */
function cgProseSlots(str) {
  return String(str || '')
    .replace(/\{targetName\}/g, '{cg.targetName}')
    .replace(/\{residentName\}/g, '{cg.targetName}')
    .replace(/\{measurement\}/g, '{cg.measurement}')
    .replace(/\{measurementCategory\}/g, '{cg.bodypart}')
    .replace(/\{bodypart\}/g, '{cg.bodypart}')
    .replace(/\{priyaWeight\}/g, '{cg.priyaWeight}');
}

registerPool('cg.targetName', [{ when: {}, text: [(ctx) => ctx.globals?.targetName || ctx.globals?.residentName || 'her'] }]);
registerPool('cg.measurement', [{ when: {}, text: [(ctx) => String(ctx.globals?.measurement ?? '')] }]);
registerPool('cg.bodypart', [{ when: {}, text: [(ctx) => ctx.globals?.bodypart || ctx.globals?.measurementCategory || 'measurements'] }]);
registerPool('cg.priyaWeight', [{ when: {}, text: [(ctx) => String(ctx.globals?.priyaWeight ?? '')] }]);

registerDimension('cgStageKey', (ctx) => ctx.globals?.cgStageKey ?? 'Heavy');
registerDimension('cgSceneVisit', (ctx) => String(ctx.globals?.cgSceneVisit ?? 0));
registerDimension('cgMeasureRel', (ctx) => ctx.globals?.cgMeasureRel ?? 'priya_larger');
registerDimension('cgMeasureCat', (ctx) => ctx.globals?.cgMeasureCat ?? 'waist');

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
    registerDecomposedPool(bodyKey, cgProseSlots(prose));
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

for (const [stageKey, tierMap] of Object.entries(CG_FILLED_SELF_REVIEW)) {
  for (const [tier, entry] of Object.entries(tierMap)) {
    const prose = entry?.text || '';
    if (!prose) continue;
    const poolKey = `cg.scene.selfReview.${stageKey}.${tier}`;
    const bodyKey = `${poolKey}.body`;
    registerDecomposedPool(bodyKey, cgProseSlots(prose));
    registerPool(poolKey, [
      {
        when: { cgStageKey: [stageKey], cgDriveTier: [tier] },
        weight: 2,
        text: [
          (ctx) => {
            const line = render(`{${bodyKey}}`, ctx)?.trim();
            return line && !line.includes('{unresolved}') ? line : fillCgTemplate(prose, ctx.globals);
          },
          cgSceneTailBeat(`self:${stageKey}:${tier}`, 0),
          cgSceneTailBeat(`self:${stageKey}:${tier}`, 1),
        ],
      },
      {
        when: {},
        text: [
          (ctx) => fillCgTemplate(prose, ctx.globals),
          cgSceneTailBeat(`self:${stageKey}:${tier}`, 2),
        ],
      },
    ]);
  }
}

for (const [rel, tierMap] of Object.entries(CG_FILLED_MEASUREMENT_REACTIONS)) {
  for (const [tier, catMap] of Object.entries(tierMap)) {
    for (const [cat, prose] of Object.entries(catMap)) {
      if (!prose || typeof prose !== 'string') continue;
      const poolKey = `cg.scene.reaction.${rel}.${tier}.${cat}`;
      const bodyKey = `${poolKey}.body`;
      registerDecomposedPool(bodyKey, cgProseSlots(prose));
      registerPool(poolKey, [
        {
          when: { cgMeasureRel: [rel], cgDriveTier: [tier], cgMeasureCat: [cat] },
          weight: 2,
          text: [
            (ctx) => {
              const line = render(`{${bodyKey}}`, ctx)?.trim();
              return line && !line.includes('{unresolved}') ? line : fillCgTemplate(prose, ctx.globals);
            },
            cgSceneTailBeat(`rx:${rel}:${cat}`, 0),
            cgSceneTailBeat(`rx:${rel}:${cat}`, 1),
          ],
        },
        {
          when: {},
          text: [
            (ctx) => fillCgTemplate(prose, ctx.globals),
            cgSceneTailBeat(`rx:${rel}:${cat}`, 2),
          ],
        },
      ]);
    }
  }
}
