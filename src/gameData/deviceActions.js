// ═══════════════════════════════════════════════════════════════
// CONTEXT-DEPENDENT DEVICE ACTIONS — registry for StudentDetailView
// ═══════════════════════════════════════════════════════════════
import { getEquippedDeviceIds } from './deviceEffects.js';

export const DEVICE_ACTIONS = [
  {
    id: 'trigger_belt_bloat',
    label: 'Trigger belt bloat now',
    icon: '⭕',
    requires: { equipped: 'auto_bloating_belt' },
    when: (student) => student?.equip?.waist?.defId === 'auto_bloating_belt',
  },
  {
    id: 'run_feeder_session',
    label: 'Run feeder session',
    icon: '🦾',
    requires: { equipped: 'auto_feeder_arm' },
    when: (student) => student?.equip?.back?.defId === 'auto_feeder_arm',
  },
  {
    id: 'inject_serum',
    label: 'Inject growth serum',
    icon: '💉',
    requires: { owned: 'growth_serum_injector' },
    when: (_student, ctx) => (ctx?.deviceInventory?.growth_serum_injector ?? 0) > 0,
  },
  {
    id: 'sculpt_redistribution',
    label: 'Run sculpt cycle',
    icon: '⚖️',
    requires: { equipped: 'weight_redistribution_rig' },
    when: (student) => student?.equip?.fullBody?.defId === 'weight_redistribution_rig',
  },
];

export function getAvailableDeviceActions(student, ctx = {}) {
  return DEVICE_ACTIONS.filter(action => {
    if (action.when && !action.when(student, ctx)) return false;
    if (action.requires?.equipped) {
      const ids = getEquippedDeviceIds(student);
      if (!ids.includes(action.requires.equipped)) return false;
    }
    if (action.requires?.owned) {
      const qty = ctx.deviceInventory?.[action.requires.owned] ?? 0;
      if (qty <= 0) return false;
    }
    return true;
  });
}

export function getBodyOverrideBadge(student) {
  const bo = student?.bodyOverride;
  if (!bo) return null;
  if (bo.stateType === 'bloated') return { label: 'Bloated', color: '#e07030' };
  if (bo.bodyTypeOverride) return { label: `Reshaped (${bo.bodyTypeOverride})`, color: '#9060c0' };
  return { label: 'Device effect', color: '#6080a0' };
}

export function bodyOverrideLabel(student) {
  const badge = getBodyOverrideBadge(student);
  return badge?.label || null;
}
