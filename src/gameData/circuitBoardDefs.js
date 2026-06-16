// ═══════════════════════════════════════════════════════════════
// CIRCUIT BOARD DEFINITIONS — all 9 device mastery trees
// ═══════════════════════════════════════════════════════════════

function branch(id, label, nodes, requiresTier = null) {
  return { id, label, ...(requiresTier ? { requiresTier } : {}), nodes };
}

function node(id, label, desc, cost = 1, extra = {}) {
  return { id, label, cost, desc, ...extra };
}

function mainPath(prefix, labels, descs, milestones = { 4: 2, 9: 3 }) {
  return labels.map((label, i) => {
    const n = i + 1;
    const entry = node(`${prefix}_main_${n}`, label, descs[i] ?? label);
    if (milestones[n]) entry.milestone = milestones[n];
    return entry;
  });
}

function buildLayout(mainIds, branchMap) {
  const layout = {};
  mainIds.forEach((id, i) => {
    layout[id] = { x: 50, y: 92 - i * 9 };
  });
  const branchKeys = Object.keys(branchMap);
  branchKeys.forEach((key, bi) => {
    const x = bi % 2 === 0 ? 14 + (bi % 2) * 4 : 84;
    branchMap[key].forEach((nodeId, ni) => {
      layout[nodeId] = { x: bi < 2 ? 12 + bi * 6 : 86 + (bi - 2) * 4, y: 68 - ni * 14 };
    });
  });
  return layout;
}

function buildEdges(mainIds, branchAnchors) {
  const edges = [];
  for (let i = 0; i < mainIds.length - 1; i++) {
    edges.push({ from: mainIds[i], to: mainIds[i + 1], kind: 'main' });
  }
  for (const [nodeId, anchor] of Object.entries(branchAnchors)) {
    edges.push({ from: anchor, to: nodeId, kind: 'branch' });
  }
  return edges;
}

function makeBoard(deviceDefId, label, prefix, tierLabels, mainLabels, mainDescs, branchDefs, branchAnchors) {
  const mp = mainPath(prefix, mainLabels, mainDescs);
  const mainIds = mp.map((n) => n.id);
  const branches = {};
  const branchNodeIds = {};
  for (const [key, def] of Object.entries(branchDefs)) {
    branches[key] = branch(key, def.label, def.nodes, def.requiresTier);
    branchNodeIds[key] = def.nodes.map((n) => n.id);
  }
  return {
    deviceDefId,
    label,
    tierLabels,
    mainPath: mp,
    branches,
    layout: buildLayout(mainIds, branchNodeIds),
    edges: buildEdges(mainIds, branchAnchors),
  };
}

const AUTO_FEEDER = makeBoard(
  'auto_feeder_arm',
  'Auto-Feed Arm',
  'afa',
  { 1: 'Basic Servo Arm', 2: 'Zone Router', 3: 'Campus Autofeed' },
  ['Servo Link', 'Rhythm Encoder', 'Port Manifold', 'Zone Router Core', 'Burst Scheduler', 'Idle Watchdog', 'Multi-Target Bus', 'Greedy Safeguard', 'Autofeed Nexus'],
  [
    'Smoother mechanical handoff between feed pulses.',
    'Steadier rhythm on long sessions.',
    'Routes paste to the correct intake port.',
    'Unlocks multi-zone routing in setup.',
    'Short supervised burst windows for extra lbs.',
    'Prevents runaway feeding when unattended.',
    'Feed two targets per weekly tick (reduced each).',
    'Caps greedy-mode malfunction severity.',
    'Unlocks campus passive scaling on equipped students.',
  ],
  {
    automation: {
      label: 'Set & Forget',
      nodes: [
        node('afa_passive_gain', 'Passive Gain +15%', 'Weekly lbs tick +15%.', 1, { mod: { weeklyGainMult: 0.15 } }),
        node('afa_quiet_mode', 'Quiet Mode', 'Lower shame ticks from public feeding.', 1, { mod: { shameMult: 0.85 } }),
        node('afa_unattended', 'Unattended Protocol', 'Arm keeps feeding through low resistance.', 2, { mod: { unattended: true } }),
      ],
    },
    burst: {
      label: 'Supervised Burst',
      requiresTier: 2,
      nodes: [
        node('afa_burst_lbs', 'Burst Payload', 'Burst mode +20% gain.', 1, { mod: { burstGainMult: 0.2 } }),
        node('afa_burst_risk', 'Controlled Surge', 'Burst malfunctions −25%.', 2, { mod: { malfunctionMult: 0.75 } }),
      ],
    },
    campus: {
      label: 'Campus Routing',
      requiresTier: 2,
      nodes: [
        node('afa_campus_range', 'Extended Range', 'Campus tool discovery risk −10%.', 1, { mod: { discoveryMult: 0.9 } }),
        node('afa_campus_pulse', 'Pulse Scheduler', 'Campus pulse hits +1 hunger tier chance.', 2, { mod: { hungerPulse: true } }),
      ],
    },
  },
  {
    afa_passive_gain: 'afa_main_2', afa_quiet_mode: 'afa_main_3', afa_unattended: 'afa_main_5',
    afa_burst_lbs: 'afa_main_4', afa_burst_risk: 'afa_main_6',
    afa_campus_range: 'afa_main_5', afa_campus_pulse: 'afa_main_7',
  },
);

const OBEDIENCE_BELT = makeBoard(
  'obedience_belt',
  'Obedience Belt',
  'ob',
  { 1: 'Compliance Harness', 2: 'Shame Amplifier', 3: 'Total Submission' },
  ['Latch Sync', 'Cue Uplink', 'Waist Calibrator', 'Shame Relay', 'Obedience Loop', 'Pulse Discipline', 'Dependence Coil', 'Public Cue', 'Submission Core'],
  [
    'Harness reads hesitation faster.',
    'Compliance cues arrive on-beat.',
    'Waist sensors track posture under load.',
    'Unlocks shame-amplified weekly ticks.',
    'Obedience loop tightens after each refusal.',
    'Discipline pulses on failed commands.',
    'Dependence climbs faster while equipped.',
    'Public compliance cues (relationship-gated).',
    'Unlocks max shame/dependence scaling.',
  ],
  {
    shame: {
      label: 'Shame Dial',
      nodes: [
        node('ob_shame_up', 'Shame Amplifier', 'Shame psych +20%.', 1, { mod: { shameMult: 1.2 } }),
        node('ob_shame_voice', 'Hum Feedback', 'Extra shame text on weekly tick.', 1, { mod: { shameVoice: true } }),
      ],
    },
    dependence: {
      label: 'Dependence Dial',
      nodes: [
        node('ob_dep_gain', 'Need Loop', 'Dependence +25% from belt.', 1, { mod: { dependenceMult: 1.25 } }),
        node('ob_dep_lock', 'Obedience Lock', 'Unequip resistance (dependence floor).', 2, { mod: { unequipResistance: true } }),
      ],
    },
    obsession: {
      label: 'Obsession',
      requiresTier: 2,
      nodes: [
        node('ob_obsession', 'Fixation Coil', 'Obsession ticks on compliance.', 2, { mod: { obsessionGain: 1 } }),
        node('ob_public', 'Public Demo', 'Semi-public belt scenes.', 3, { mod: { publicDemo: true }, requiresTier: 3 }),
      ],
    },
  },
  {
    ob_shame_up: 'ob_main_3', ob_shame_voice: 'ob_main_4',
    ob_dep_gain: 'ob_main_5', ob_dep_lock: 'ob_main_6',
    ob_obsession: 'ob_main_7', ob_public: 'ob_main_8',
  },
);

const WEIGHT_BELT = makeBoard(
  'auto_bloating_belt',
  'Weight Belt',
  'abb',
  { 1: 'Pressure Belt', 2: 'Bloat Engine', 3: 'Surge Harness' },
  ['Pressure Seal', 'Slow Inflate', 'Waist Monitor', 'Bloat Engine', 'Stage Pusher', 'Comfort Valve', 'Surge Capacitor', 'Emergency Vent', 'Overload Bloat'],
  [
    'Seals slower but steadier bloat cycles.',
    'Gradual inflate reduces malfunction spikes.',
    'Monitors waist strain during bloat.',
    'Unlocks stage-bump efficiency +1 on tick.',
    'Pushes stage visuals harder each week.',
    'Comfort valve reduces furniture discomfort.',
    'Stores pressure for burst bloat actions.',
    'Emergency vent on malfunction.',
    'Unlocks double stage-bump on perfect use.',
  ],
  {
    pressure: {
      label: 'Pressure',
      nodes: [
        node('abb_slow_bloat', 'Gradual Swell', 'Bloat malfunctions −20%.', 1, { mod: { malfunctionMult: 0.8 } }),
        node('abb_tight_bloat', 'Tight Swell', 'Bloat intensity +15%.', 2, { mod: { bloatMult: 1.15 } }),
      ],
    },
    stage: {
      label: 'Stage Push',
      nodes: [
        node('abb_stage_bump', 'Visual Surge', 'Stage bump +1 on weekly tick.', 1, { mod: { stageBumpBonus: 1 } }),
        node('abb_rapid', 'Rapid Saturation', 'Manual bloat +extra stage bump.', 2, { mod: { manualStageBump: true } }),
      ],
    },
  },
  {
    abb_slow_bloat: 'abb_main_2', abb_tight_bloat: 'abb_main_5',
    abb_stage_bump: 'abb_main_4', abb_rapid: 'abb_main_6',
  },
);

const FURNITURE_RIG = makeBoard(
  'living_furniture_rig',
  'Furniture Harness',
  'lfr',
  { 1: 'Comfort Frame', 2: 'Living Furniture', 3: 'Permanent Fixture' },
  ['Frame Lock', 'Comfort Pad', 'Weight Distribution', 'Furniture Mode', 'Stage Anchor', 'Immobility Rail', 'Comfort Feed', 'Public Seat', 'Fixture Core'],
  [
    'Frame locks reduce comfort decay.',
    'Padding softens long sessions.',
    'Distributes load across hips and belly.',
    'Unlocks furniture-comfort economy tuning.',
    'Stage anchor slows mobility recovery.',
    'Immobility milestones arrive earlier.',
    'Comfort feeding restores furniture comfort.',
    'Public seating scenes (high relationship).',
    'Unlocks permanent fixture comfort floor.',
  ],
  {
    comfort: {
      label: 'Comfort Economy',
      nodes: [
        node('lfr_comfort_slow', 'Comfort Retention', 'Comfort decays 20% slower.', 1, { mod: { comfortDecayMult: 0.8 } }),
        node('lfr_comfort_feed', 'Comfort Meal', 'Use action restores +15 comfort.', 1, { mod: { comfortFeedBonus: 15 } }),
      ],
    },
    permanence: {
      label: 'Permanence',
      requiresTier: 2,
      nodes: [
        node('lfr_immobile', 'Early Immobility', 'Immobility threshold −1 stage.', 2, { mod: { immobileThreshold: -1 } }),
        node('lfr_fixture', 'Fixture Mode', 'Furniture override lasts +1 week.', 2, { mod: { overrideWeeks: 1 } }),
      ],
    },
  },
  {
    lfr_comfort_slow: 'lfr_main_2', lfr_comfort_feed: 'lfr_main_4',
    lfr_immobile: 'lfr_main_6', lfr_fixture: 'lfr_main_8',
  },
);

const REINFORCED_LEGS = makeBoard(
  'reinforced_legs',
  'Reinforced Legs',
  'rl',
  { 1: 'Basic Braces', 2: 'Load Bearers', 3: 'Furniture Stabilizers' },
  ['Ankle Brace', 'Knee Strut', 'Load Sensor', 'Stabilizer Core', 'Comfort Tread', 'Furniture Load', 'Wide Base', 'Lock Step', 'Anchor Legs'],
  [
    'Ankle braces reduce strain text.',
    'Knee struts support heavier harness loads.',
    'Sensors predict furniture-weight failure.',
    'Unlocks furniture comfort bonus while rigged.',
    'Comfort tread softens long standing sessions.',
    'Bears furniture-rig weight without penalty.',
    'Wide base reduces immobility risk.',
    'Lock step for public furniture demos.',
    'Maximum stability under full-body rigs.',
  ],
  {
    stability: {
      label: 'Stability',
      nodes: [
        node('rl_comfort', 'Comfort Tread +', 'Furniture comfort +8 weekly.', 1, { mod: { furnitureComfort: 8 } }),
        node('rl_stable', 'Stable Stand', 'Malfunction shame −30%.', 1, { mod: { shameMult: 0.7 } }),
      ],
    },
    support: {
      label: 'Support',
      requiresTier: 2,
      nodes: [
        node('rl_load', 'Heavy Load', 'Supports stage 8+ furniture weight.', 2, { mod: { heavyLoad: true } }),
      ],
    },
  },
  {
    rl_comfort: 'rl_main_3', rl_stable: 'rl_main_4', rl_load: 'rl_main_6',
  },
);

const GROWTH_CHAMBER = makeBoard(
  'growth_accelerator_chamber',
  'Growth Chamber',
  'gac',
  { 1: 'Basic Chamber', 2: 'Field Tuner', 3: 'Overload Chamber' },
  ['Field Coil', 'Warmth Regulator', 'Dose Limiter', 'Field Tuner', 'Magnitude Push', 'Stability Grid', 'Rapid Deposition', 'Malfunction Baffle', 'Overload Field'],
  [
    'Smoother field ramp between pulses.',
    'Warmth stays pleasurable longer.',
    'Limits runaway deposition spikes.',
    'Unlocks magnitude vs stability tuning UI.',
    'Push magnitude for bigger session lbs.',
    'Stability grid reduces major malfunctions.',
    'Rapid deposition on good tuning runs.',
    'Baffles convert malfunctions to soft bloat.',
    'Unlocks overload attempts (high risk).',
  ],
  {
    magnitude: {
      label: 'Magnitude',
      nodes: [
        node('gac_gain_up', 'Field Amplifier', 'Session gain +18%.', 1, { mod: { gainMult: 1.18 } }),
        node('gac_stage_push', 'Stage Cascade', 'Perfect tuning +2 stage bump.', 2, { mod: { perfectStageBump: 2 } }),
      ],
    },
    stability: {
      label: 'Stability',
      nodes: [
        node('gac_stable', 'Grid Stabilizer', 'Major malfunction chance −35%.', 1, { mod: { majorMalfunctionMult: 0.65 } }),
        node('gac_soft_fail', 'Soft Failover', 'Failed tuning still grants half gain.', 2, { mod: { failureHalfGain: true } }),
      ],
    },
    permanent: {
      label: 'Permanent Conversion',
      requiresTier: 3,
      nodes: [
        node('gac_permanent', 'Permanent Lattice', 'Unlocks permanent-convert malfunction handler.', 3, { mod: { permanentConvert: true }, requiresTier: 3 }),
      ],
    },
    identity: {
      label: 'Identity Branch',
      requiresTier: 2,
      nodes: [
        node('gac_metabolic_override', 'Metabolic Override', 'Exclusive: competitive gainer unlocks +15% chamber gain.', 2, {
          mod: { gainMult: 1.15 },
          requiresEvolvedForm: 'competitive_gainer',
          requiresTier: 2,
        }),
      ],
    },
  },
  {
    gac_gain_up: 'gac_main_4', gac_stage_push: 'gac_main_6',
    gac_stable: 'gac_main_3', gac_soft_fail: 'gac_main_5',
    gac_permanent: 'gac_main_8',
    gac_metabolic_override: 'gac_main_5',
  },
);

const GROWTH_SERUM = makeBoard(
  'growth_serum_injector',
  'Growth Formula',
  'gsi',
  { 1: 'Basic Injector', 2: 'Volatile Mix', 3: 'Cascade Formula' },
  ['Vial Lock', 'Flow Meter', 'Chaos Baffle', 'Volatile Mix', 'Localized Swell', 'Cascade Timer', 'Stop Valve', 'Permanent Trace', 'Formula Overrun'],
  [
    'Vial lock prevents premature discharge.',
    'Flow meter widens perfect tuning window.',
    'Baffles chaotic serum spread.',
    'Unlocks magnitude tuning mini-game.',
    'Targets localized swell zones.',
    'Cascade timer extends dramatic growth.',
    'Stop valve ends overrun early.',
    'Permanent trace lbs on critical success.',
    'Unlocks formula overrun (max gain, max risk).',
  ],
  {
    burst: {
      label: 'Burst Power',
      nodes: [
        node('gsi_burst', 'Volatile Dose', 'Injector gain +20%.', 1, { mod: { gainMult: 1.2 } }),
        node('gsi_cascade', 'Cascade', 'Good+ runs add +1 stage bump.', 2, { mod: { goodStageBump: 1 } }),
      ],
    },
    risk: {
      label: 'Risk',
      nodes: [
        node('gsi_chaos', 'Chaos Tolerance', 'Malfunction overrun −25%.', 1, { mod: { overrunMult: 0.75 } }),
        node('gsi_permanent', 'Permanent Trace', 'Handles permanentConvert on serum overrun.', 2, { mod: { permanentConvert: true } }),
      ],
    },
  },
  {
    gsi_burst: 'gsi_main_4', gsi_cascade: 'gsi_main_6',
    gsi_chaos: 'gsi_main_3', gsi_permanent: 'gsi_main_7',
  },
);

const HUNGER_RAY = makeBoard(
  'endless_hunger_engine',
  'Hunger Ray',
  'ehe',
  { 1: 'Basic Ray', 2: 'Sustained Beam', 3: 'Campus Hunger' },
  ['Satiety Suppressor', 'Craving Amplifier', 'Range Finder', 'Sustained Beam', 'Distress Limiter', 'Campus Stealth', 'Hunger Rise', 'Withdrawal Hook', 'Campus Saturation'],
  [
    'Suppresses satiety signals more cleanly.',
    'Amplifies craving without instant distress.',
    'Extends effective campus range.',
    'Unlocks sustain vs pulse campus modes.',
    'Caps distress state severity.',
    'Campus discovery risk −15%.',
    'Passive hunger rise +10% (more content).',
    'Withdrawal hooks drive interrupt scenes.',
    'Unlocks campus saturation synergy.',
  ],
  {
    hunger: {
      label: 'Hunger Rise',
      nodes: [
        node('ehe_hunger_up', 'Craving Engine', 'Passive hunger rise +15%.', 1, { mod: { hungerRiseMult: 1.15 } }),
        node('ehe_feed_drop', 'Satiety Block', 'Feed hunger drop −20% (stays needy).', 2, { mod: { feedDropMult: 0.8 } }),
      ],
    },
    campus: {
      label: 'Campus Deploy',
      requiresTier: 2,
      nodes: [
        node('ehe_stealth', 'Stealth Coat', 'Discovery risk −15%.', 1, { mod: { discoveryMult: 0.85 } }),
        node('ehe_sustain', 'Sustain Mode', 'Unlocks sustained craving campus mode.', 2, { mod: { sustainMode: true } }),
      ],
    },
    distress: {
      label: 'Distress Control',
      nodes: [
        node('ehe_distress_cap', 'Distress Limiter', 'Distress malfunctions −30%.', 1, { mod: { distressMult: 0.7 } }),
        node('ehe_interrupt', 'Knock Generator', 'Interrupt bonus +12% (more scenes).', 1, { mod: { interruptBonus: 0.12 } }),
      ],
    },
  },
  {
    ehe_hunger_up: 'ehe_main_2', ehe_feed_drop: 'ehe_main_5',
    ehe_stealth: 'ehe_main_4', ehe_sustain: 'ehe_main_6',
    ehe_distress_cap: 'ehe_main_3', ehe_interrupt: 'ehe_main_7',
  },
);

export const ADDITIONAL_CIRCUIT_BOARDS = {
  auto_feeder_arm: AUTO_FEEDER,
  obedience_belt: OBEDIENCE_BELT,
  auto_bloating_belt: WEIGHT_BELT,
  living_furniture_rig: FURNITURE_RIG,
  reinforced_legs: REINFORCED_LEGS,
  growth_accelerator_chamber: GROWTH_CHAMBER,
  growth_serum_injector: GROWTH_SERUM,
  endless_hunger_engine: HUNGER_RAY,
};

export const BOARD_LAYOUTS = Object.fromEntries(
  Object.entries(ADDITIONAL_CIRCUIT_BOARDS).map(([id, b]) => [id, b.layout]),
);

export const BOARD_EDGES = Object.fromEntries(
  Object.entries(ADDITIONAL_CIRCUIT_BOARDS).map(([id, b]) => [id, b.edges]),
);

export const DEVICE_TIER_LABELS = Object.fromEntries(
  Object.entries(ADDITIONAL_CIRCUIT_BOARDS).map(([id, b]) => [id, b.tierLabels]),
);

export function stripBoardMeta(board) {
  const { layout, edges, tierLabels, ...rest } = board;
  return rest;
}

export function collectBoardMods(labState, deviceDefId, hasNode) {
  const board = ADDITIONAL_CIRCUIT_BOARDS[deviceDefId];
  if (!board) return {};
  const mods = {};
  for (const n of board.mainPath) {
    if (hasNode(n.id) && n.mod) Object.assign(mods, n.mod);
  }
  for (const br of Object.values(board.branches)) {
    for (const n of br.nodes) {
      if (hasNode(n.id) && n.mod) Object.assign(mods, n.mod);
    }
  }
  return mods;
}
