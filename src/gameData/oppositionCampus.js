// ═══════════════════════════════════════════════════════════════
// OPPOSITION CAMPUS EVENTS — Vance spawns, Portion Saint (§30.6, §33.3)
// ═══════════════════════════════════════════════════════════════

const VANCE_LINES = {
  health_center: [
    '👁 Dr. Helena Vance reviews wellness charts in the health center — her pen pauses when she sees your class on the roster.',
    '👁 Vance confers with a nurse about "concerning BMI trends." She does not look surprised to see you.',
  ],
  faculty_lounge: [
    '👁 Chairwoman Vance sips tea in the faculty lounge, folder labeled INQUIRY within arm\'s reach.',
    '👁 Vance and Martin Orr compare catering invoices. The conversation stops when you enter.',
  ],
};

const PORTION_SAINT_LINES = [
  '🕯️ The Portion Saint lingers by the serving line — thin, radiant, counting every tray.',
  '🕯️ A possessed dining liaison whispers portion sizes. Lilith would recognize the hunger in her eyes.',
];

export function rollVanceCampusEvent(nodeId, opposition, rng = Math.random) {
  if (!opposition?.aib?.unlocked) return null;
  if (nodeId !== 'health_center' && nodeId !== 'faculty_lounge') return null;
  if (rng() > 0.32) return null;
  const pool = VANCE_LINES[nodeId];
  return pool[Math.floor(rng() * pool.length)];
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
