// ═══════════════════════════════════════════════════════════════
// OPPOSITION — Academic Inquiry Board & escalation (§29–31)
// ═══════════════════════════════════════════════════════════════

export const AIB_MEMBERS = [
  { id: 'vance', name: 'Dr. Helena Vance', role: 'Chair, Dean of Student Life', resolve: 85, corruption: 0, weightLbs: 145, stance: 'hostile' },
  { id: 'orr', name: 'Martin Orr', role: 'Compliance Officer', resolve: 70, corruption: 0, weightLbs: 162, stance: 'hostile' },
  { id: 'jin', name: 'Dr. Priya Jin', role: 'Faculty Senate', resolve: 60, corruption: 0, weightLbs: 138, stance: 'hostile' },
  { id: 'washburn', name: 'Coach Dana Washburn', role: 'Athletics Liaison', resolve: 75, corruption: 0, weightLbs: 178, stance: 'hostile' },
  { id: 'platt', name: 'Ms. Evelyn Platt', role: 'Registrar Proxy', resolve: 65, corruption: 0, weightLbs: 152, stance: 'hostile' },
];

export const AIB_AGENDA_CARDS = [
  { id: 'wellness_audit', minScrutiny: 50, label: 'Wellness Audit', scrutiny: 8, message: '📋 AIB schedules wellness audits for your class.' },
  { id: 'device_confiscation', minScrutiny: 60, label: 'Device Confiscation', scrutiny: 10, message: '🔧 Compliance officer flags lab devices for review.' },
  { id: 'size_review', minScrutiny: 55, label: 'Class Size Review', scrutiny: 9, message: '⚖️ Board requests weigh-in documentation.' },
  { id: 'wellness_seminar', minScrutiny: 50, label: 'Wellness Seminar', scrutiny: 6, message: '📢 Mandatory wellness seminar scheduled campus-wide.' },
  { id: 'budget_freeze', minScrutiny: 75, label: 'Budget Freeze', scrutiny: 5, money: -200, message: '💸 Department budget frozen pending review.' },
  { id: 'removal_hearing', minScrutiny: 90, label: 'Removal Hearing', scrutiny: 12, message: '⚠️ Student removal hearing opened.' },
];

export const AIB_COUNTERS = [
  { id: 'feast_bribe', label: 'Feast Bribe', ap: 3, resolveHit: 5, scrutiny: -8, desc: 'Pause AIB actions one week with a lavish feast.' },
  { id: 'public_discredit', label: 'Public Discredit', ap: 2, resolveHit: 10, scrutiny: -10, desc: 'Discredit an agenda card permanently.' },
  { id: 'bureaucratic_capture', label: 'Bureaucratic Capture', ap: 2, resolveHit: 15, scrutiny: -5, desc: 'Convert a wavering member to compromised.' },
  { id: 'spirit_pressure', label: 'Spirit Pressure', ap: 1, resolveHit: 8, scrutiny: -3, desc: 'Force the top agenda card to misfire.' },
];

export function defaultOppositionState() {
  return {
    aib: {
      unlocked: false,
      members: AIB_MEMBERS.map((m) => ({ ...m })),
      agendaQueue: [],
      deckRemoved: [],
      scandalMeter: 0,
      truceWeeks: 0,
    },
    proxies: {
      wellnessCoalition: false,
      accreditation: false,
      asceticCircle: false,
    },
    supernatural: {
      actTriggered: false,
      actWeek: null,
      scarcityPressure: 0,
      curseQueue: [],
    },
  };
}

function drawAgendaCard(opposition, scrutiny) {
  const removed = new Set(opposition.aib.deckRemoved || []);
  const pool = AIB_AGENDA_CARDS.filter((c) => scrutiny >= c.minScrutiny && !removed.has(c.id));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function unlockOppositionIfNeeded(opposition, scrutiny) {
  if (opposition.aib.unlocked) return opposition;
  if (scrutiny < 25) return opposition;
  return {
    ...opposition,
    aib: { ...opposition.aib, unlocked: true },
  };
}

export function runAibCounter(opposition, counterId, memberId) {
  const counter = AIB_COUNTERS.find((c) => c.id === counterId);
  if (!counter) return { opposition, message: null, scrutinyDelta: 0, apCost: 0 };
  let next = { ...opposition, aib: { ...opposition.aib, members: [...opposition.aib.members] } };
  if (counterId === 'feast_bribe') {
    next.aib.truceWeeks = Math.max(next.aib.truceWeeks, 1);
    next.aib.members = next.aib.members.map((m) => ({ ...m, resolve: Math.max(0, m.resolve - counter.resolveHit) }));
    return { opposition: next, message: '🍷 Feast bribe accepted. AIB pauses this week.', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'public_discredit' && next.aib.agendaQueue.length) {
    const card = next.aib.agendaQueue[0];
    next.aib.agendaQueue = next.aib.agendaQueue.slice(1);
    next.aib.deckRemoved = [...next.aib.deckRemoved, card.cardId];
    return { opposition: next, message: `📰 Discredited: ${card.label}. Card removed from deck.`, scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'spirit_pressure' && next.aib.agendaQueue.length) {
    next.aib.agendaQueue = next.aib.agendaQueue.slice(1);
    return { opposition: next, message: '👁 Spirit pressure — agenda misfires into mandatory tasting.', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  if (counterId === 'bureaucratic_capture' && memberId) {
    next.aib.members = next.aib.members.map((m) => {
      if (m.id !== memberId) return m;
      if (m.resolve > 40) return m;
      return { ...m, stance: 'compromised', corruption: Math.min(100, m.corruption + 25) };
    });
    return { opposition: next, message: '📎 Member compromised — they look away at hearings.', scrutinyDelta: counter.scrutiny, apCost: counter.ap, moneyDelta: 0 };
  }
  return { opposition: next, message: null, scrutinyDelta: 0, apCost: counter.ap, moneyDelta: 0 };
}

export function processOppositionWeek(opposition, { week, scrutiny, students }) {
  let next = unlockOppositionIfNeeded(opposition, scrutiny);
  if (!next.aib.unlocked) return { opposition: next, scrutinyDelta: 0, moneyDelta: 0, logs: [] };

  const logs = [];
  let scrutinyDelta = 0;
  let moneyDelta = 0;

  // Proxy unlocks
  if (week >= 8 && scrutiny >= 40) next = { ...next, proxies: { ...next.proxies, wellnessCoalition: true } };
  if (week >= 14 && scrutiny >= 50) next = { ...next, proxies: { ...next.proxies, accreditation: true } };
  if (week >= 20) next = { ...next, proxies: { ...next.proxies, asceticCircle: true } };

  // Truce from feast bribe
  if (next.aib.truceWeeks > 0) {
    next = { ...next, aib: { ...next.aib, truceWeeks: next.aib.truceWeeks - 1 } };
    logs.push('🍷 AIB truce — no new agenda cards this week.');
    return { opposition: next, scrutinyDelta, moneyDelta, logs };
  }

  // Resolve due agenda
  const queue = [...next.aib.agendaQueue];
  const stillQueued = [];
  queue.forEach((item) => {
    if (item.resolvesWeek <= week) {
      const card = AIB_AGENDA_CARDS.find((c) => c.id === item.cardId);
      if (card) {
        logs.push(card.message);
        scrutinyDelta += card.scrutiny || 0;
        moneyDelta += card.money || 0;
      }
    } else {
      stillQueued.push(item);
    }
  });
  next = { ...next, aib: { ...next.aib, agendaQueue: stillQueued } };

  // Draw new cards
  const draws = next.proxies.accreditation ? 2 : 1;
  const newQueue = [...stillQueued];
  for (let i = 0; i < draws && newQueue.length < 2; i++) {
    const card = drawAgendaCard(next, scrutiny);
    if (!card) break;
    newQueue.push({ cardId: card.id, label: card.label, resolvesWeek: week + 1 });
    logs.push(`📌 AIB agenda queued: ${card.label}`);
  }
  next = { ...next, aib: { ...next.aib, agendaQueue: newQueue } };

  // Compromised majority reduces scrutiny
  const compromised = next.aib.members.filter((m) => m.stance === 'compromised').length;
  if (compromised >= 3) scrutinyDelta -= 2;

  // Member resolve softens when heavy
  next = {
    ...next,
    aib: {
      ...next.aib,
      members: next.aib.members.map((m) => ({
        ...m,
        resolve: m.weightLbs >= 195 ? Math.max(0, m.resolve - 3) : m.resolve,
      })),
    },
  };

  return { opposition: next, scrutinyDelta, moneyDelta, logs };
}

export function checkSupernaturalTrigger(opposition, { week, scrutiny, students, campusSaturation }) {
  if (opposition.supernatural.actTriggered) return opposition;
  const visible = students.filter((s) => !s.hidden);
  const avgPressure = visible.length
    ? visible.reduce((a, s) => {
        const stage = Math.min(11, Math.floor((s.lbs - 80) / 40));
        const corr = s.corruption || 0;
        return a + stage * 0.35 + corr * 0.3;
      }, 0) / visible.length
    : 0;
  const committed = avgPressure >= 55;
  const investigation = scrutiny >= 90;
  const regional = campusSaturation >= 85;
  if (committed && investigation) {
    return {
      ...opposition,
      supernatural: { ...opposition.supernatural, actTriggered: true, actWeek: week, scarcityPressure: 20 },
    };
  }
  if (regional && week >= 20) {
    return {
      ...opposition,
      supernatural: { ...opposition.supernatural, actTriggered: true, actWeek: week, scarcityPressure: 15 },
    };
  }
  return opposition;
}
