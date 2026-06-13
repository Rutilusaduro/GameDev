// ═══════════════════════════════════════════════════════════════
// DEVICE BLUEPRINT CATEGORIES — equipable vs event inventions
// ═══════════════════════════════════════════════════════════════

export const DEVICE_BLUEPRINT_CATEGORIES = [
  {
    id: 'equipable',
    label: 'Equipable',
    icon: '🧩',
    deviceIds: [
      'auto_feeder_arm',
      'feeding_mask',
      'obedience_belt',
      'auto_bloating_belt',
      'living_furniture_rig',
      'reinforced_legs',
    ],
  },
  {
    id: 'event',
    label: 'Event',
    icon: '⚡',
    deviceIds: [
      'growth_accelerator_chamber',
      'growth_serum_injector',
      'endless_hunger_engine',
    ],
  },
];

export function recipesForCategory(categoryId) {
  const cat = DEVICE_BLUEPRINT_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.deviceIds ?? [];
}

export function categorizedDeviceIds() {
  return new Set(DEVICE_BLUEPRINT_CATEGORIES.flatMap((c) => c.deviceIds));
}
