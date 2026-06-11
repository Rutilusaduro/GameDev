// ═══════════════════════════════════════════════════════════════
// WALLET — player funds (costs/earnings wired up elsewhere later)
// ═══════════════════════════════════════════════════════════════

export const WALLET_CONFIG = {
  startingBalance: 850,
  currencyName: 'Funds',
  minBalance: 0,
};

/** Display string for HUD and logs. */
export function formatMoney(amount) {
  const n = Math.max(0, Math.round(amount ?? 0));
  return `$${n.toLocaleString()}`;
}

export function canAfford(balance, cost) {
  return (balance ?? 0) >= (cost ?? 0);
}

/** Add funds; returns the new balance (clamped at min). */
export function addFunds(balance, amount) {
  return Math.max(WALLET_CONFIG.minBalance, (balance ?? 0) + (amount ?? 0));
}

/** Spend if possible. Returns { ok, balance, shortfall }. */
export function trySpend(balance, cost) {
  const price = Math.max(0, cost ?? 0);
  const current = balance ?? 0;
  if (current < price) {
    return { ok: false, balance: current, shortfall: price - current };
  }
  return { ok: true, balance: current - price, shortfall: 0 };
}
