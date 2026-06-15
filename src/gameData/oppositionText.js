// ═══════════════════════════════════════════════════════════════
// OPPOSITION TEXT — thin render helpers (§29, §23)
// ═══════════════════════════════════════════════════════════════

import { render, createContext } from '../textEngine/engine.js';

export function renderOppositionLine(pool, ctx = {}) {
  try {
    const line = render(`{${pool}}`, createContext(ctx));
    if (!line || line.includes('{unresolved}')) return null;
    return line;
  } catch {
    return null;
  }
}

export function oppositionUnlockLine(week) {
  return renderOppositionLine('opposition.aib.unlocked', { week })
    || 'The Academic Inquiry Board has noticed your class.';
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
  return renderOppositionLine(pool, { week });
}
