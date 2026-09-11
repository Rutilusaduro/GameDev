// Ranked feedee session — Rae NPC + payoff (legacy evolvedForms → pools).
import { registerPool } from '../../engine.js';
import { SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from '../../../gameData/evolvedForms.js';

function registerFnPool(poolId, line) {
  const text = typeof line === 'string' ? line.trim() : '';
  if (!text) return;
  registerPool(poolId, [
    { when: {}, text: [(ctx) => text] },
    { when: {}, text: [(ctx) => text] },
    { when: {}, text: [(ctx) => `${text}`] },
  ]);
}

for (let si = 0; si <= 5; si += 1) {
  const row = SESSION_NPC_LINES[si];
  if (!row) continue;
  registerFnPool(`session.rae.arrival.s${si}`, row.arrival);
  registerFnPool(`session.rae.exit.s${si}`, row.exit);
  if (row.extra) registerFnPool(`session.rae.extra.s${si}`, row.extra);
}

for (let si = 0; si < SESSION_PAYOFF_TEXT.length; si += 1) {
  const fn = SESSION_PAYOFF_TEXT[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(
    ctx.globals?.sessionGain ?? 0,
    ctx.globals?.sessionEndReason ?? 'focus_out',
  );
  registerPool(`session.payoff.legacy.s${si}`, [
    { when: {}, text: [core] },
    { when: {}, text: [(ctx) => `${core(ctx)}\n\nRae already texted about next time.`] },
    { when: {}, text: [(ctx) => `Session log:\n\n${core(ctx)}`] },
  ]);
}
