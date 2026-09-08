// ═══════════════════════════════════════════════════════════════
// CRAVING RESONANCE — appetite contagion between students
// ═══════════════════════════════════════════════════════════════
import { V2_CONFIG } from './state.js';

export const RESONANCE_TIERS = [
  { id: 0, label: 'Dormant', minLinks: 0, passiveBonus: 0, pulseMult: 1.0, desc: 'No resonance web yet.' },
  { id: 1, label: 'Stirring', minLinks: 2, passiveBonus: 1, pulseMult: 1.15, desc: 'Cravings echo between linked students.' },
  { id: 2, label: 'Harmonic', minLinks: 4, passiveBonus: 2, pulseMult: 1.3, desc: 'The class hums with shared appetite.' },
  { id: 3, label: 'Hive Appetite', minLinks: 6, passiveBonus: 4, pulseMult: 1.5, desc: 'One girl eats; they all feel it.' },
];

export function getResonanceTier(linkCount) {
  let tier = RESONANCE_TIERS[0];
  for (const t of RESONANCE_TIERS) {
    if (linkCount >= t.minLinks) tier = t;
  }
  return tier;
}

export function canCreateLink(aId, bId, students, resonanceState, ownedSkills = {}, ownedClassSkills = {}) {
  if ((ownedSkills.hunger_web || 0) < 1) return { ok: false, reason: 'Requires Hunger Web skill' };
  const maxLinks = ownedClassSkills.resonance_bells ? V2_CONFIG.maxResonanceLinks : 4;
  if ((resonanceState.links || []).length >= maxLinks) return { ok: false, reason: 'Link capacity full' };
  const a = students.find((s) => s.id === aId);
  const b = students.find((s) => s.id === bId);
  if (!a || !b || a.hidden || b.hidden) return { ok: false, reason: 'Invalid students' };
  if (aId === bId) return { ok: false, reason: 'Cannot link self' };
  const exists = (resonanceState.links || []).some(
    (l) => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId),
  );
  if (exists) return { ok: false, reason: 'Already linked' };
  return { ok: true, apCost: V2_CONFIG.resonanceLinkAp };
}

export function createResonanceLink(aId, bId, resonanceState) {
  const links = [...(resonanceState.links || []), { a: aId, b: bId, strength: 1 }];
  const tier = getResonanceTier(links.length).id;
  return { ...resonanceState, links, tier };
}

export function getLinkedStudents(studentId, resonanceState) {
  const linked = new Set();
  for (const l of resonanceState.links || []) {
    if (l.a === studentId) linked.add(l.b);
    if (l.b === studentId) linked.add(l.a);
  }
  return [...linked];
}

export function pulseResonance(fedStudentId, calories, students, resonanceState) {
  const linkedIds = getLinkedStudents(fedStudentId, resonanceState);
  if (!linkedIds.length) return { pulses: [], bonusCalories: 0 };
  const tier = getResonanceTier((resonanceState.links || []).length);
  const bonusCal = Math.round(calories * 0.08 * tier.pulseMult);
  const pulses = linkedIds.map((id) => {
    const s = students.find((st) => st.id === id);
    if (!s || s.hidden) return null;
    return { studentId: id, calories: bonusCal, rel: 1 };
  }).filter(Boolean);
  return { pulses, bonusCalories: bonusCal * pulses.length };
}

export function shouldResonanceSurge(resonanceState, week) {
  const tier = getResonanceTier((resonanceState.links || []).length);
  if (tier.id < 2) return false;
  if (resonanceState.lastSurgeWeek === week) return false;
  return Math.random() < 0.25 + tier.id * 0.05;
}
