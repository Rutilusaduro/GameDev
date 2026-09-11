// ═══════════════════════════════════════════════════════════════
// OPPOSITION TEXT — thin render helpers (§29, §23)
// ═══════════════════════════════════════════════════════════════

import { render, createContext } from '../textEngine/engine.js';
import { appendV2Depth } from '../textEngine/scenes/v2/depthRenderer.js';
import { depthNarrativeAppendChance } from './mechanicsDepthLayer.js';

export function renderOppositionLine(pool, ctx = {}, opts = {}) {
  try {
    const engineCtx = createContext(ctx);
    const line = render(`{${pool}}`, engineCtx);
    if (!line || line.includes('{unresolved}')) return null;
    const chance = opts.v2DepthChance ?? depthNarrativeAppendChance(0.34);
    return appendV2Depth(line, 'opposition', engineCtx, chance);
  } catch {
    return null;
  }
}

export function oppositionUnlockLine(week) {
  return renderOppositionLine('opposition.aib.unlocked', { week })
    || 'The Residence Review Board has noticed your hall.';
}

export function oppositionProxyLine(proxyKey, week) {
  const pool = proxyKey === 'wellnessCoalition'
    ? 'opposition.proxy.wellness_coalition'
    : proxyKey === 'asceticCircle'
      ? 'opposition.proxy.ascetic_circle'
      : null;
  if (!pool) return null;
  return renderOppositionLine(pool, { week });
}

export function supernaturalActLine(week) {
  return renderOppositionLine('supernatural.act.open', { week })
    || 'The Supernatural Act begins — scarcity watches.';
}

export function agendaResolveLine(cardId, week) {
  const pool = `opposition.agenda.${cardId}`;
  return renderOppositionLine(pool, { week, globals: { card: cardId } });
}

export function counterSuccessLine(counterId) {
  return renderOppositionLine('opposition.counter.success', { counter: counterId, globals: { counter: counterId } });
}
