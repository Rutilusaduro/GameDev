// ═══════════════════════════════════════════════════════════════
// OPPOSITION HEARINGS — removal & emergency (§30.6)
// Text resolved via text engine pools in opposition/aibHearing.js
// ═══════════════════════════════════════════════════════════════

export const REMOVAL_HEARING = {
  title: 'Resident Removal Hearing',
  phases: [
    {
      pool: 'opposition.hearing.removal.phase0',
      choices: [
        { id: 'testify', label: 'Have a devoted resident testify to her character', relReq: 70, resultPool: 'opposition.hearing.removal.result.testify', flag: 'testify' },
        { id: 'advocate', label: 'Yield floor to the rotating resident advocate', resultPool: 'opposition.hearing.removal.result.advocate', flag: 'advocate' },
        { id: 'discredit', label: 'Present hypocrisy evidence (Cassidy/Kylie path)', resultPool: 'opposition.hearing.removal.result.discredit', flag: 'discredit' },
        { id: 'feast_demo', label: 'Stage a live tasting demonstration', resultPool: 'opposition.hearing.removal.result.feast', flag: 'feast' },
      ],
    },
    {
      pool: 'opposition.hearing.removal.phase1',
      choices: [
        { id: 'hold_firm', label: 'Hold firm — abundance is the hall program', resultPool: 'opposition.hearing.removal.result.hold_firm', flag: 'firm' },
        { id: 'negotiate', label: 'Negotiate — private indulgence, public discretion', resultPool: 'opposition.hearing.removal.result.negotiate', flag: 'negotiate' },
        { id: 'floor_pressure', label: 'Floor pressure — mandatory tasting for the Board', resultPool: 'opposition.hearing.removal.result.floor_pressure', flag: 'floor_pressure' },
      ],
    },
  ],
  endings: [
    {
      poolKey: 'advocate_voice',
      condition: (h) => h.includes('advocate') && (h.includes('firm') || h.includes('floor_pressure') || h.includes('spirit')),
      studentHiddenWeeks: 0, scrutinyDelta: -6, resolveHitAll: 10,
    },
    {
      poolKey: 'discredit_feast',
      condition: (h) => h.includes('discredit') && (h.includes('floor_pressure') || h.includes('spirit')),
      studentHiddenWeeks: 0, scrutinyDelta: -10, resolveHitAll: 15, scandalDelta: -10,
    },
    {
      poolKey: 'testify_firm',
      condition: (h) => h.includes('testify') && h.includes('firm'),
      studentHiddenWeeks: 0, scrutinyDelta: -5, resolveHitAll: 8,
    },
    {
      poolKey: 'messy_victory',
      condition: (h) => h.includes('feast') || h.includes('negotiate'),
      studentHiddenWeeks: 0, scrutinyDelta: 2, resolveHitAll: 5,
    },
    {
      poolKey: 'suspended',
      condition: () => true,
      studentHiddenWeeks: 4, scrutinyDelta: 8, resolveHitAll: 0,
    },
  ],
};

export const EMERGENCY_HEARING = {
  title: 'Emergency Board Hearing',
  phases: [
    {
      pool: 'opposition.hearing.emergency.phase0',
      choices: [
        { id: 'deflect', label: 'Deflect to campus culture metrics', resultPool: 'opposition.hearing.emergency.result.deflect', flag: 'deflect' },
        { id: 'feast_bribe', label: 'Cater the hearing itself', resultPool: 'opposition.hearing.emergency.result.feast_bribe', flag: 'catered' },
        { id: 'sacrifice', label: 'Sacrifice a compromised member as scapegoat', resultPool: 'opposition.hearing.emergency.result.sacrifice', flag: 'scapegoat' },
      ],
    },
    {
      pool: 'opposition.hearing.emergency.phase1',
      choices: [
        { id: 'double_down', label: 'Double down — this is the future of the floor', resultPool: 'opposition.hearing.emergency.result.double_down', flag: 'double' },
        { id: 'absorb', label: 'Absorb blame — protect the hall', resultPool: 'opposition.hearing.emergency.result.absorb', flag: 'absorb' },
        { id: 'hive', label: 'Maya hive misdirect — wrong building, wrong records', resultPool: 'opposition.hearing.emergency.result.hive', flag: 'misdirect' },
      ],
    },
  ],
  endings: [
    {
      poolKey: 'catered_future',
      condition: (h) => h.includes('catered') && h.includes('double'),
      scrutinyDelta: -15, scandalDelta: -40, truceWeeks: 1,
    },
    {
      poolKey: 'scapegoat_survive',
      condition: (h) => h.includes('scapegoat') || h.includes('misdirect'),
      scrutinyDelta: 5, scandalDelta: -25, memberResolveHit: 30,
    },
    {
      poolKey: 'absorb_cost',
      condition: (h) => h.includes('absorb'),
      scrutinyDelta: 12, scandalDelta: -20, moneyDelta: -300,
    },
    {
      poolKey: 'unresolved',
      condition: () => true,
      scrutinyDelta: 10, scandalDelta: 5,
    },
  ],
};

export function pickHearingEnding(hearingDef, history) {
  return hearingDef.endings.find((e) => e.condition(history)) || hearingDef.endings[hearingDef.endings.length - 1];
}
