// ═══════════════════════════════════════════════════════════════
// OPPOSITION CAMPUS EVENTS — Vance spawns, Portion Saint, proxies (§30.6, §31, §33.3)
// ═══════════════════════════════════════════════════════════════

const VANCE_LINES = {
  health_center: [
    '👁 Dr. Helena Vance reviews wellness charts in the health center — her pen pauses when she sees your class on the roster.',
    '👁 Vance confers with a nurse about "concerning BMI trends." She does not look surprised to see you.',
  ],
  faculty_lounge: [
    '👁 Chairwoman Vance sips tea in the staff lounge, folder labeled INQUIRY within arm\'s reach.',
    '👁 Vance and Martin Orr compare catering invoices. The conversation stops when you enter.',
  ],
};

const PORTION_SAINT_LINES = [
  '🕯️ The Portion Saint lingers by the serving line — thin, radiant, counting every tray.',
  '🕯️ A possessed dining liaison whispers portion sizes. Lilith would recognize the hunger in her eyes.',
];

const MIRROR_FAST_LINES = [
  '🪞 The Mirror Fast glides through the hall — hunger idealized into something that refuses to be fed.',
  '🪞 A thin enforcer counts bites in the air. Refeed surges are the only language it fears.',
];

const LEDGER_WIGHT_LINES = [
  '📒 The Ledger Wight audits the quad — every feast logged, every pound questioned.',
  '📒 Compliance made flesh tallies trays. Discredit and machine fattening are its counters.',
];

export function rollVanceCampusEvent(nodeId, opposition, rng = Math.random) {
  if (!opposition?.aib?.unlocked) return null;
  if (nodeId !== 'health_center' && nodeId !== 'faculty_lounge') return null;
  if (rng() > 0.32) return null;
  const pool = VANCE_LINES[nodeId];
  return pool[Math.floor(rng() * pool.length)];
}

export function rollAccreditationObserverEvent(nodeId, opposition, rng = Math.random) {
  if (!opposition?.proxies?.accreditation) return null;
  if (nodeId !== 'lecture_hall') return null;
  if (rng() > 0.28) return null;
  const name = opposition.proxies.observerName || 'The Regional Observer';
  const lines = [
    `📋 ${name} takes notes in the lecture hall — accreditation eyes on your class.`,
    `📋 ${name} compares your syllabus to wellness metrics. The pen never stops.`,
  ];
  return lines[Math.floor(rng() * lines.length)];
}

export function rollAsceticGardenProtest(nodeId, opposition, rng = Math.random) {
  if (!opposition?.proxies?.asceticCircle) return null;
  if (nodeId !== 'garden') return null;
  if (rng() > 0.3) return null;
  return '🕯️ Ascetic Circle protest at the garden — campus appetite chills for the week.';
}

export function applyAsceticGardenProtest(campusState) {
  const sat = campusState?.saturation || { score: 0, tier: 0, weeksAtTier: 0 };
  return {
    ...campusState,
    saturation: {
      ...sat,
      score: Math.max(0, (sat.score || 0) - 8),
      weeksAtTier: 0,
    },
    asceticProtestWeek: true,
  };
}

export function rollMirrorFastEvent(nodeId, opposition, rng = Math.random) {
  if (!opposition?.supernatural?.actTriggered) return null;
  if ((opposition.supernatural.scarcityPressure || 0) < 45) return null;
  if (nodeId !== 'gym' && nodeId !== 'health_center') return null;
  if (rng() > 0.22) return null;
  return MIRROR_FAST_LINES[Math.floor(rng() * MIRROR_FAST_LINES.length)];
}

export function rollLedgerWightEvent(nodeId, opposition, rng = Math.random) {
  if (!opposition?.supernatural?.actTriggered) return null;
  if ((opposition.supernatural.scarcityPressure || 0) < 55) return null;
  if (nodeId !== 'admin' && nodeId !== 'office') return null;
  if (rng() > 0.2) return null;
  return LEDGER_WIGHT_LINES[Math.floor(rng() * LEDGER_WIGHT_LINES.length)];
}

export function rollPortionSaintEvent(nodeId, opposition, lilithUnlocked, rng = Math.random) {
  if (!lilithUnlocked || !opposition?.supernatural?.actTriggered) return null;
  if (nodeId !== 'dining_hall') return null;
  if ((opposition.supernatural.scarcityPressure || 0) < 35) return null;
  if (opposition.supernatural.portionSaintConsumed) return null;
  if (rng() > 0.25) return null;
  return PORTION_SAINT_LINES[Math.floor(rng() * PORTION_SAINT_LINES.length)];
}

export function consumePortionSaint(opposition) {
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      portionSaintConsumed: true,
      scarcityPressure: Math.max(0, (opposition.supernatural.scarcityPressure || 0) - 50),
      famineWeek: false,
    },
  };
}

/** Ledger Wight weakens after public discredit or machine fattening counter. */
export function ledgerWightRepelled(opposition, amount = 6) {
  if (!opposition?.supernatural?.actTriggered) return opposition;
  return {
    ...opposition,
    supernatural: {
      ...opposition.supernatural,
      scarcityPressure: Math.max(0, (opposition.supernatural.scarcityPressure || 0) - amount),
    },
  };
}

/** Mirror Fast — campus appetite chills; refeed surges counter it. */
export function applyMirrorFastEncounter(campusState, opposition) {
  return {
    campus: {
      ...campusState,
      mirrorFastWeek: true,
    },
    opposition: opposition ? {
      ...opposition,
      supernatural: {
        ...opposition.supernatural,
        scarcityPressure: Math.min(100, (opposition.supernatural?.scarcityPressure || 0) + 4),
      },
    } : opposition,
    scrutinyDelta: 0,
  };
}

/** Ledger Wight — audits feasts unless recently discredited. */
export function applyLedgerWightEncounter(opposition) {
  if (!opposition?.supernatural?.actTriggered) {
    return { opposition, scrutinyDelta: 0 };
  }
  const repelled = (opposition.meta?.counterTypesUsed || []).includes('public_discredit')
    || (opposition.meta?.counterTypesUsed || []).includes('machine_fatten');
  const scrutinyDelta = repelled ? 1 : 4;
  return {
    opposition: {
      ...opposition,
      supernatural: {
        ...opposition.supernatural,
        scarcityPressure: Math.min(100, (opposition.supernatural.scarcityPressure || 0) + (repelled ? 2 : 6)),
      },
    },
    scrutinyDelta,
  };
}
