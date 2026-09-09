// ═══════════════════════════════════════════════════════════════
// OPPOSITION ACTS — §29.2 escalation structure
// ═══════════════════════════════════════════════════════════════

import { computeSurrenderVector } from './transformationPressure.js';

export const OPPOSITION_ACTS = {
  I: {
    id: 'I',
    label: 'Semester Normalcy',
    weekRange: [1, 7],
    antagonist: 'Rumor + passive scrutiny',
    scrutinyRole: 'Meter only — Board dormant',
  },
  II: {
    id: 'II',
    label: 'Institutional',
    weekRange: [8, 19],
    antagonist: 'Academic Inquiry Board',
    scrutinyRole: 'Board drives agenda + meter',
  },
  III: {
    id: 'III',
    label: 'Proxy War',
    weekRange: [14, 24],
    antagonist: 'Board + mid-game proxies',
    scrutinyRole: 'Layered agendas',
  },
  IV: {
    id: 'IV',
    label: 'Supernatural',
    weekRange: [20, 99],
    antagonist: 'Spirit of Hunger / Scarcity',
    scrutinyRole: 'Scarcity pressure hybrid',
  },
};

/** Class-average transformation pressure (0–100) for supernatural triggers. */
export function computeClassTransformationPressure(students) {
  const visible = (students || []).filter((s) => !s.hidden);
  if (!visible.length) return 0;
  const sum = visible.reduce((a, s) => a + computeSurrenderVector(s).composite, 0);
  return Math.round(sum / visible.length);
}

/** Board dormant in Act I until week 8 or scrutiny early-unlock (§29.2 / §30.1). */
export function isBoardDormant(week, scrutiny, opposition) {
  if (opposition?.aib?.unlocked) return false;
  if (scrutiny >= 25) return false;
  return week < 8;
}

/** Resolve dominant act — acts overlap per §29.2. */
export function getOppositionAct(week, opposition) {
  if (opposition?.supernatural?.actTriggered) {
    return {
      ...OPPOSITION_ACTS.IV,
      scrutinyRole: `Scarcity ${opposition.supernatural.scarcityPressure ?? 0}/100`,
    };
  }
  const proxies = opposition?.proxies || {};
  const proxyWar = week >= 14 && (proxies.wellnessCoalition || proxies.accreditation || proxies.asceticCircle);
  if (proxyWar) return OPPOSITION_ACTS.III;
  if (opposition?.aib?.unlocked || week >= 8) return OPPOSITION_ACTS.II;
  return OPPOSITION_ACTS.I;
}

export function getOppositionActSummary(week, opposition, scrutiny = 0, students = []) {
  const act = getOppositionAct(week, opposition);
  const dormant = isBoardDormant(week, scrutiny, opposition);
  const pressure = computeClassTransformationPressure(students);
  return {
    act,
    boardDormant: dormant,
    classPressure: pressure,
    lines: [
      `Act ${act.id} — ${act.label}`,
      act.antagonist,
      dormant ? 'AIB dormant — rumors only' : act.scrutinyRole,
    ],
  };
}

/** Rumor log keys for Act I — picked by week band. */
export const ACT_I_RUMORS = [
  '📣 Whispers in the staff lounge about your "generous" catering budget.',
  '📣 A resident advisor asks if your class has a "nutrition plan."',
  '📣 Someone pinned a wellness flyer outside your classroom door.',
  '📣 The dining hall manager mentions your students twice in one sentence.',
  '📣 A peer professor jokes about your roster "filling out" — the joke lands wrong.',
];

export function pickActIRumor(week, rnd = Math.random) {
  const idx = Math.floor(rnd() * ACT_I_RUMORS.length);
  return ACT_I_RUMORS[idx];
}
