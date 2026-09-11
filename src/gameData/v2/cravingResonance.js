// ═══════════════════════════════════════════════════════════════
// CRAVING RESONANCE — appetite contagion between residents
// ═══════════════════════════════════════════════════════════════
import { V2_CONFIG } from './state.js';
import { depthResonancePassiveBonus, depthResonancePulseMult } from '../mechanicsDepthLayer.js';

export const RESONANCE_TIERS = [
  { id: 0, label: 'Dormant', minLinks: 0, minHallLbs: 0, passiveBonus: 0, pulseMult: 1.0, desc: 'No resonance web yet.' },
  { id: 1, label: 'Stirring', minLinks: 1, minHallLbs: 0, passiveBonus: 1, pulseMult: 1.15, desc: 'Cravings echo between linked residents.' },
  { id: 2, label: 'Harmonic', minLinks: 2, minHallLbs: 2000, passiveBonus: 2, pulseMult: 1.3, desc: 'The hall hums with shared appetite.' },
  { id: 3, label: 'Hive Appetite', minLinks: 3, minHallLbs: 5000, passiveBonus: 4, pulseMult: 1.5, desc: 'One resident eats; they all feel it.' },
];

export function getCombinedHallLbs(students) {
  return (students || []).filter((s) => !s.hidden).reduce((sum, s) => sum + (s.lbs || 0), 0);
}

/** @deprecated use getCombinedHallLbs */
export const getCombinedClassLbs = getCombinedHallLbs;

export function getResonanceTier(linkCount, hallLbs = 0) {
  let tier = RESONANCE_TIERS[0];
  for (const t of RESONANCE_TIERS) {
    if (linkCount >= t.minLinks && hallLbs >= t.minHallLbs) tier = t;
  }
  return tier;
}

export function getMaxResonanceLinks(ownedHallSkills = {}) {
  return ownedHallSkills.resonance_bells
    ? V2_CONFIG.maxResonanceLinksWithBells
    : V2_CONFIG.maxResonanceLinks;
}

export function canCreateLink(aId, bId, students, resonanceState, ownedSkills = {}, ownedHallSkills = {}) {
  if ((ownedSkills.hunger_web || 0) < 1) return { ok: false, reason: 'Requires Hunger Web skill' };
  const maxLinks = getMaxResonanceLinks(ownedHallSkills);
  if ((resonanceState.links || []).length >= maxLinks) return { ok: false, reason: 'Link capacity full' };
  const a = students.find((s) => s.id === aId);
  const b = students.find((s) => s.id === bId);
  if (!a || !b || a.hidden || b.hidden) return { ok: false, reason: 'Invalid residents' };
  if (aId === bId) return { ok: false, reason: 'Cannot link self' };
  const relCost = V2_CONFIG.resonanceLinkRelCost;
  if ((a.relationship || 0) < relCost || (b.relationship || 0) < relCost) {
    return { ok: false, reason: `Both residents need ${relCost}+ relationship` };
  }
  const exists = (resonanceState.links || []).some(
    (l) => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId),
  );
  if (exists) return { ok: false, reason: 'Already linked' };
  return { ok: true, apCost: V2_CONFIG.resonanceLinkAp, relCost };
}

export function createResonanceLink(aId, bId, resonanceState, students) {
  const links = [...(resonanceState.links || []), { a: aId, b: bId, strength: 1 }];
  const hallLbs = getCombinedHallLbs(students);
  const tier = getResonanceTier(links.length, hallLbs).id;
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
  const hallLbs = getCombinedHallLbs(students);
  const tier = getResonanceTier((resonanceState.links || []).length, hallLbs);
  const bonusCal = Math.round(calories * 0.08 * depthResonancePulseMult(tier.pulseMult));
  const pulses = linkedIds.map((id) => {
    const s = students.find((st) => st.id === id);
    if (!s || s.hidden) return null;
    return { studentId: id, calories: bonusCal, rel: 1 };
  }).filter(Boolean);
  return { pulses, bonusCalories: bonusCal * pulses.length };
}

export function shouldResonanceSurge(resonanceState, week, students = [], ownedHallSkills = {}) {
  if (!ownedHallSkills.resonance_bells) return false;
  const hallLbs = getCombinedHallLbs(students);
  const tier = getResonanceTier((resonanceState.links || []).length, hallLbs);
  if (tier.id < 2) return false;
  if (resonanceState.lastSurgeWeek === week) return false;
  return Math.random() < 0.25 + tier.id * 0.05;
}

/** Hall-wide passive appetite bonus — extra calories before weekly digest. */
export function applyResonancePassiveBonus(students, resonanceState) {
  const hallLbs = getCombinedHallLbs(students);
  const tier = getResonanceTier((resonanceState.links || []).length, hallLbs);
  if (tier.passiveBonus <= 0) return { students, tier };
  const bonusCals = depthResonancePassiveBonus(tier.passiveBonus) * 250;
  const next = students.map((s) => {
    if (s.hidden) return s;
    return { ...s, consumedCalories: (s.consumedCalories || 0) + bonusCals };
  });
  return { students: next, tier };
}

/** Surge event — linked students receive a craving pulse of calories. */
export function applyResonanceSurgeBonus(students, resonanceState) {
  const hallLbs = getCombinedHallLbs(students);
  const tier = getResonanceTier((resonanceState.links || []).length, hallLbs);
  const linkedIds = new Set();
  for (const l of resonanceState.links || []) {
    linkedIds.add(l.a);
    linkedIds.add(l.b);
  }
  if (!linkedIds.size) return students;
  const surgeCals = Math.round(450 * depthResonancePulseMult(tier.pulseMult));
  return students.map((s) => {
    if (!linkedIds.has(s.id) || s.hidden) return s;
    return { ...s, consumedCalories: (s.consumedCalories || 0) + surgeCals };
  });
}
