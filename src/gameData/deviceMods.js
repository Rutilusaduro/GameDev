// ═══════════════════════════════════════════════════════════════
// DEVICE MODIFICATIONS — placeholder component catalog + apply
// TODO: wire real Pharmacist/Relic acquisition sources
// ═══════════════════════════════════════════════════════════════

export const MOD_COMPONENTS = {
  paste_core: {
    id: 'paste_core',
    label: 'Paste Core',
    icon: '🧪',
    source: 'pharmacist',
    effect: { gainLbsBonus: [1, 2] },
    riskDelta: 0.04,
    stabilityDelta: -0.03,
    addsTags: ['paste_mod'],
  },
  stabilizer_reagent: {
    id: 'stabilizer_reagent',
    label: 'Stabilizer Reagent',
    icon: '⚗️',
    source: 'pharmacist',
    effect: { stabilityBonus: 0.08 },
    riskDelta: -0.05,
    stabilityDelta: 0.08,
    addsTags: ['stabilized'],
  },
  relic_stabilizer: {
    id: 'relic_stabilizer',
    label: 'Relic Stabilizer',
    icon: '✦',
    source: 'relic',
    // TODO: wire real relic source
    effect: { psychDeltaBonus: { fixation: 1 } },
    riskDelta: -0.03,
    stabilityDelta: 0.1,
    addsTags: ['relic_stabilized'],
  },
  relic_amplifier: {
    id: 'relic_amplifier',
    label: 'Relic Amplifier',
    icon: '✦',
    source: 'relic',
    // TODO: wire real relic source
    effect: { gainLbsBonus: [2, 3] },
    riskDelta: 0.08,
    stabilityDelta: -0.06,
    addsTags: ['relic_amp'],
  },
  lab_precision_node: {
    id: 'lab_precision_node',
    label: 'Precision Node',
    icon: '🔩',
    source: 'lab',
    effect: { stabilityBonus: 0.05 },
    riskDelta: -0.02,
    stabilityDelta: 0.05,
    addsTags: ['precision'],
  },
};

/** Placeholder starter mods unlocked for UI testing. */
export const DEFAULT_MOD_INVENTORY = {
  paste_core: 2,
  stabilizer_reagent: 1,
  lab_precision_node: 1,
};

export function getModComponent(id) {
  return MOD_COMPONENTS[id] || null;
}

export function applyModificationToEntry(entry, componentId) {
  if (!entry?.defId) return { entry, ok: false, reason: 'no_entry' };
  const comp = MOD_COMPONENTS[componentId];
  if (!comp) return { entry, ok: false, reason: 'unknown_component' };
  const mods = [...(entry.mods || [])];
  if (mods.includes(componentId)) return { entry, ok: false, reason: 'already_applied' };
  mods.push(componentId);
  return {
    entry: { ...entry, mods },
    ok: true,
    component: comp,
  };
}

export function foldModPatches(effectSpec, modIds = [], baseDef = null) {
  let spec = effectSpec ? { ...effectSpec } : {};
  let stabilityDelta = 0;
  let riskDelta = 0;
  const tags = [...(baseDef?.uniqueInteractionTags || [])];

  for (const id of modIds) {
    const comp = MOD_COMPONENTS[id];
    if (!comp) continue;
    stabilityDelta += comp.stabilityDelta || 0;
    riskDelta += comp.riskDelta || 0;
    if (comp.addsTags) tags.push(...comp.addsTags);
    if (comp.effect?.gainLbsBonus && spec.gainLbs) {
      const [b0, b1] = comp.effect.gainLbsBonus;
      spec.gainLbs = [
        (spec.gainLbs[0] || 0) + b0,
        (spec.gainLbs[1] || 0) + b1,
      ];
    }
    if (comp.effect?.psychDeltaBonus) {
      spec.psychDelta = { ...(spec.psychDelta || {}), ...comp.effect.psychDeltaBonus };
    }
  }

  return {
    effectSpec: spec,
    stabilityDelta,
    riskDelta,
    tags: [...new Set(tags)],
    effectiveStability: Math.min(0.95, Math.max(0.1, (baseDef?.stability ?? 0.5) + stabilityDelta)),
    effectiveRisk: Math.min(0.9, Math.max(0.05, (baseDef?.risk ?? 0.3) + riskDelta)),
  };
}

export function summarizeModList(modIds = []) {
  return modIds.map((id) => MOD_COMPONENTS[id]?.label || id).join(', ');
}
