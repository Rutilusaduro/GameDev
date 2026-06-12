// ═══════════════════════════════════════════════════════════════
// NETWORK EXPERIMENTS — slot into node graph for bonuses
// ═══════════════════════════════════════════════════════════════

export const NETWORK_EXPERIMENTS = {
  exp_caloric_loop: {
    id: 'exp_caloric_loop',
    label: 'Caloric Efficiency Loop',
    icon: '♻️',
    desc: 'Recycles waste heat into denser paste delivery.',
    nodeTypes: ['feeder'],
    requiresDevice: 'auto_feeder_arm',
    effects: { caloricBonus: 0.15, maintenance: 1 },
  },
  exp_remote_mesh: {
    id: 'exp_remote_mesh',
    label: 'Remote Mesh Uplink',
    icon: '📡',
    desc: 'Extends feeder reach across campus without physical presence.',
    nodeTypes: ['control', 'hub'],
    requiresDevice: 'remote_feeding_system',
    effects: { coverage: 1, automation: 1, detection: 3 },
  },
  exp_passive_overnight: {
    id: 'exp_passive_overnight',
    label: 'Passive Overnight Drip',
    icon: '🌙',
    desc: 'Sleep-stage calibrated feeding while targets rest.',
    nodeTypes: ['feeder'],
    requiresDevice: 'sleep_feeding_system',
    effects: { caloricBonus: 0.2, influence: 2, detection: 2 },
  },
  exp_mask_protocol: {
    id: 'exp_mask_protocol',
    label: 'Mask Lock Protocol',
    icon: '🎭',
    desc: 'Forced intake compliance routing through the network.',
    nodeTypes: ['feeder', 'control'],
    requiresDevice: 'feeding_mask',
    effects: { caloricBonus: 0.25, influence: 4, detection: 5 },
  },
  exp_water_infusion: {
    id: 'exp_water_infusion',
    label: 'Water Fattening Mesh',
    icon: '💧',
    desc: 'Turns mundane hydration into stealth gain infrastructure.',
    nodeTypes: ['feeder', 'stealth'],
    requiresDevice: 'liquid_fat_infuser',
    effects: { caloricBonus: 0.3, detection: -2 },
  },
  exp_furniture_station: {
    id: 'exp_furniture_station',
    label: 'Living Furniture Station',
    icon: '🪑',
    desc: 'Objectification rig networked for multi-user comfort metrics.',
    nodeTypes: ['hub', 'feeder'],
    requiresDevice: 'living_furniture_rig',
    effects: { influence: 5, stability: -5, maintenance: 3 },
  },
  exp_bloat_regulator: {
    id: 'exp_bloat_regulator',
    label: 'Bloat Pressure Regulator',
    icon: '⭕',
    desc: 'Stabilizes inflation cycles on belt-fed subjects.',
    nodeTypes: ['feeder', 'maintenance'],
    requiresDevice: 'auto_bloating_belt',
    effects: { stability: 8, caloricBonus: 0.1 },
  },
  exp_serum_injector_rack: {
    id: 'exp_serum_injector_rack',
    label: 'Serum Injector Rack',
    icon: '💉',
    desc: 'Volatile growth bursts on network trigger.',
    nodeTypes: ['feeder'],
    requiresDevice: 'growth_serum_injector',
    effects: { caloricBonus: 0.4, stability: -10, detection: 4 },
  },
  exp_logic_core: {
    id: 'exp_logic_core',
    label: 'Automation Logic Core',
    icon: '🧠',
    desc: 'Universal control firmware — raises automation ceiling.',
    nodeTypes: null,
    requiresBlueprint: 'bp_feeder_arm',
    effects: { automation: 1, stability: 5 },
  },
  exp_stealth_baffle: {
    id: 'exp_stealth_baffle',
    label: 'Stealth Baffle Array',
    icon: '👁️‍🗨️',
    desc: 'Dampens visible signatures of network activity.',
    nodeTypes: ['stealth', 'sensor'],
    requiresBlueprint: 'bp_remote_feeding',
    effects: { detection: -6, stability: 3 },
  },
  exp_sensor_grid: {
    id: 'exp_sensor_grid',
    label: 'Behavior Sensor Grid',
    icon: '📊',
    desc: 'Collects fullness, mood, and resistance telemetry.',
    nodeTypes: ['sensor'],
    requiresBlueprint: 'bp_paste_printer',
    effects: { influence: 3, detection: 2, coverage: 1 },
  },
  exp_repair_drones: {
    id: 'exp_repair_drones',
    label: 'Repair Drone Swarm',
    icon: '🛠️',
    desc: 'Autonomous maintenance reduces cascade failure risk.',
    nodeTypes: ['maintenance', 'hub'],
    requiresBlueprint: 'bp_redistribution_rig',
    effects: { stability: 12, maintenance: 4, automation: 1 },
  },
  exp_conditioning_wave: {
    id: 'exp_conditioning_wave',
    label: 'Compliance Conditioning Wave',
    icon: '〰️',
    desc: 'Stage 3 — soft behavioral conditioning through the mesh.',
    nodeTypes: ['conditioning'],
    unlockStage: 3,
    requiresBlueprint: 'bp_predator_capture',
    effects: { influence: 8, detection: 6, backlash: 3 },
  },
  exp_nexus_sync: {
    id: 'exp_nexus_sync',
    label: 'Nexus Synchronization',
    icon: '🌐',
    desc: 'Links all branches to the central intelligence.',
    nodeTypes: ['hub', 'control'],
    unlockStage: 3,
    requiresBlueprint: 'bp_furniture_rig',
    effects: { automation: 2, stability: 10, integration: 5 },
  },
};

export function getExperiment(id) {
  return NETWORK_EXPERIMENTS[id] || null;
}

export function experimentsAvailable(labState, deviceInventory = {}) {
  const stage = labState?.stage ?? 1;
  const researched = new Set(labState?.researchedBlueprints || []);
  return Object.values(NETWORK_EXPERIMENTS).filter(exp => {
    if ((exp.unlockStage ?? 2) > stage) return false;
    if (exp.requiresDevice && !(deviceInventory[exp.requiresDevice] > 0)) return false;
    if (exp.requiresBlueprint && !researched.has(exp.requiresBlueprint)) return false;
    return true;
  });
}

export function canSlotExperiment(exp, nodeType, labState) {
  if (!exp) return false;
  if ((exp.unlockStage ?? 2) > (labState?.stage ?? 1)) return false;
  if (exp.nodeTypes && !exp.nodeTypes.includes(nodeType)) return false;
  return true;
}
