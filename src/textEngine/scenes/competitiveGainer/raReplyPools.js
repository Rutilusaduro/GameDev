// Priya group-chat RA replies — pools from CG_RA_REPLY_TEXT + variants.
import { registerDimension, registerPool } from '../../engine.js';
import { CG_RA_REPLY_TEXT, CG_STAGE_KEYS } from '../../../gameData/competitiveGainerText.js';

function fillCgTemplate(str, g = {}) {
  if (!str) return '';
  return str
    .replace(/\{residentName\}/g, g.residentName || 'the hall')
    .replace(/\{bodypart\}/g, g.bodypart || 'measurements')
    .replace(/\{priyaValue\}/g, g.priyaValue != null ? String(g.priyaValue) : '')
    .replace(/\{targetValue\}/g, g.targetValue != null ? String(g.targetValue) : '');
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
      text: [fn, fn, (ctx) => `${fn(ctx)} Priya types back immediately.`],
    });
  }
  const fallback = def.fallback || '';
  const fb = (ctx) => fillCgTemplate(fallback, ctx.globals);
  entries.push({
    when: { cgRaHasComparison: ['no'] },
    text: [fb, fb, (ctx) => `${fb(ctx)} The corkboard pings in the background.`],
  });
  entries.push({
    when: {},
    text: [fb, fb, fb],
  });
  registerPool(`cg.raReply.${optId}`, entries);
}

export { fillCgTemplate };
