// ═══════════════════════════════════════════════════════════════
// INVENTION UPGRADE TREES — per-device tier investments
// ═══════════════════════════════════════════════════════════════

export const INVENTION_UPGRADE_TREES = {
  feeding_mask: {
    deviceDefId: 'feeding_mask',
    label: 'Force Feeder',
    tiers: [
      {
        id: 'ff_calibrated_flow',
        tier: 1,
        label: 'Calibrated Flow',
        desc: 'Wider timing windows and smoother paste delivery — easier Perfect ratings.',
        cost: { abundance: 5, parts: { circuits: 2 } },
      },
      {
        id: 'ff_reinforced_harness',
        tier: 2,
        label: 'Reinforced Harness',
        desc: 'Better head restraint — Messy sessions spill less and shame ticks soften.',
        cost: { abundance: 8, parts: { scrap: 3, servos: 1 } },
        requiresTier: 1,
      },
      {
        id: 'ff_overpressure',
        tier: 3,
        label: 'Overpressure Mode',
        desc: 'A Perfect calibration can advance two weight stages instead of one.',
        cost: { abundance: 12, parts: { servos: 2, reagents: 2, exotics: 1 } },
        requiresTier: 2,
      },
    ],
  },
};

export function getUpgradeLevel(labState, deviceDefId) {
  return labState?.inventionUpgrades?.[deviceDefId] ?? 0;
}

export function getUpgradeTree(deviceDefId) {
  return INVENTION_UPGRADE_TREES[deviceDefId] || null;
}

export function nextUpgradeDef(deviceDefId, currentLevel) {
  const tree = getUpgradeTree(deviceDefId);
  if (!tree) return null;
  return tree.tiers.find((t) => t.tier === currentLevel + 1) || null;
}

export function canPurchaseUpgrade(labState, deviceDefId) {
  const tree = getUpgradeTree(deviceDefId);
  if (!tree || !labState) return false;
  const level = getUpgradeLevel(labState, deviceDefId);
  const next = nextUpgradeDef(deviceDefId, level);
  if (!next) return false;
  if (!labState.installedInventions?.[deviceDefId]) return false;
  if (next.requiresTier && level < next.requiresTier) return false;
  const abundance = labState.abundancePoints ?? 0;
  if (abundance < (next.cost.abundance ?? 0)) return false;
  const pool = labState.parts || {};
  for (const [k, n] of Object.entries(next.cost.parts || {})) {
    if ((pool[k] || 0) < n) return false;
  }
  return true;
}

export function purchaseUpgrade(labState, deviceDefId) {
  const next = nextUpgradeDef(deviceDefId, getUpgradeLevel(labState, deviceDefId));
  if (!canPurchaseUpgrade(labState, deviceDefId) || !next) return labState;
  const parts = { ...(labState.parts || {}) };
  for (const [k, n] of Object.entries(next.cost.parts || {})) {
    parts[k] = Math.max(0, (parts[k] || 0) - n);
  }
  return {
    ...labState,
    parts,
    abundancePoints: Math.max(0, (labState.abundancePoints ?? 0) - (next.cost.abundance ?? 0)),
    inventionUpgrades: {
      ...(labState.inventionUpgrades || {}),
      [deviceDefId]: next.tier,
    },
    instability: Math.min(100, (labState.instability ?? 0) + 2),
  };
}

export function timingWindowMs(upgradeLevel) {
  const base = 220;
  return base + upgradeLevel * 40;
}

export function stageBumpForPerformance(tier, upgradeLevel) {
  if (tier === 'perfect' && upgradeLevel >= 3) return 2;
  return 1;
}
