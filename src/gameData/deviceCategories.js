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
];

export function recipesForCategory(categoryId) {
  const cat = DEVICE_BLUEPRINT_CATEGORIES.find(c => c.id === categoryId);
  return cat?.deviceIds ?? [];
}

export function categorizedDeviceIds() {
  return new Set(DEVICE_BLUEPRINT_CATEGORIES.flatMap(c => c.deviceIds));
}
