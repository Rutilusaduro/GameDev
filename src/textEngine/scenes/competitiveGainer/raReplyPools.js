// Priya group-chat RA replies — pools from CG_RA_REPLY_TEXT + variants.
import { registerDimension, registerPool } from '../../engine.js';
import { CG_RA_REPLY_TEXT, CG_STAGE_KEYS } from '../../../gameData/competitiveGainerText.js';
import { cgSceneTailBeat } from '../evolved/proseTails.js';
import { CG_RA_REPLY_ALTS } from './cgRaReplyAlts.js';

export function fillCgTemplate(str, g = {}) {
  if (!str) return '';
  return String(str).replace(/\{(\w+)\}/g, (_, key) => {
    if (g[key] != null) return String(g[key]);
    if (key === 'residentName') return g.targetName || 'the hall';
    if (key === 'bodypart') return g.bodypart || 'measurements';
    return `{${key}}`;
  });
}

export function cgTemplateFromCtx(ctx) {
  return (template) => fillCgTemplate(template, ctx.globals || {});
}

registerDimension('cgRaStage', (ctx) => ctx.globals?.cgRaStage ?? 'Heavy');
registerDimension('cgRaHasComparison', (ctx) => (ctx.globals?.cgRaHasComparison ? 'yes' : 'no'));

for (const [optId, def] of Object.entries(CG_RA_REPLY_TEXT)) {
  const entries = [];
  for (const stage of CG_STAGE_KEYS) {
    const prose = def.byStage?.[stage];
    if (!prose) continue;
    const fn = (ctx) => fillCgTemplate(prose, ctx.globals);
    entries.push({
      when: { cgRaStage: [stage], cgRaHasComparison: ['yes'] },
      weight: 2,
      text: [
        fn,
        cgSceneTailBeat(`ra:${optId}:${stage}`, 0),
        (ctx) => {
          const base = fn(ctx);
          return base ? `${base} Priya types back immediately.` : base;
        },
      ],
    });
  }
  const fallback = def.fallback || '';
  const fb = (ctx) => fillCgTemplate(fallback, ctx.globals);
  entries.push({
    when: { cgRaHasComparison: ['no'] },
    text: [
      fb,
      (ctx) => {
        const base = fb(ctx);
        return base ? `${base} The corkboard pings in the background.` : base;
      },
      cgSceneTailBeat(`ra:${optId}:solo`, 1),
    ],
  });
  const alts = CG_RA_REPLY_ALTS[optId] || [];
  entries.push({
    when: {},
    text: [fb, ...alts, cgSceneTailBeat(`ra:${optId}`, 0), cgSceneTailBeat(`ra:${optId}`, 1)],
  });
  registerPool(`cg.raReply.${optId}`, entries);
}
