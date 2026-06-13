// ═══════════════════════════════════════════════════════════════
// DEVICE BLUEPRINT CATEGORIES — lab UI grouping
// ═══════════════════════════════════════════════════════════════

export const DEVICE_BLUEPRINT_CATEGORIES = [
  {
    id: 'feeding',
    label: 'Feeding',
    icon: '🍽️',
    deviceIds: [
      'auto_feeder_arm',
      'calorie_paste_printer',
      'growth_serum_injector',
      'auto_bloating_belt',
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    icon: '🌊',
    deviceIds: [
      'growth_accelerator_chamber',
      'growth_serum_sprayer',
      'bloating_gas_canister',
      'erogenous_growth_stimulator',
      'growth_limit_remover',
      'rapid_mutation_chamber',
    ],
  },
  {
    id: 'control',
    label: 'Control',
    icon: '🧠',
    deviceIds: [
      'endless_hunger_engine',
      'regression_ray',
    ],
  },
];

export function recipesForCategory(categoryId) {
  const cat = DEVICE_BLUEPRINT_CATEGORIES.find(c => c.id === categoryId);
  return cat?.deviceIds ?? [];
}

export function categorizedDeviceIds() {
  return new Set(DEVICE_BLUEPRINT_CATEGORIES.flatMap(c => c.deviceIds));
}
