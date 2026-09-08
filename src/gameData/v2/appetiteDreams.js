// ═══════════════════════════════════════════════════════════════
// APPETITE DREAMS — surreal subconscious feeding
// ═══════════════════════════════════════════════════════════════
import { getStage } from '../stages.js';
import { V2_CONFIG } from './state.js';

export const DREAM_SCENARIOS = [
  { id: 'endless_buffet', label: 'Endless Buffet', minStage: 0, minCorruption: 0, archetypes: null },
  { id: 'floating_cake', label: 'Floating Cake', minStage: 2, minCorruption: 20, archetypes: ['artsy', 'bookworm', 'quiet'] },
  { id: 'feast_hall', label: 'Feast Hall', minStage: 3, minCorruption: 30, archetypes: ['cheerleader', 'sorority', 'influencer'] },
  { id: 'honey_river', label: 'Honey River', minStage: 4, minCorruption: 40, archetypes: ['farm_girl', 'culinary', 'nursing'] },
  { id: 'mirror_feast', label: 'Mirror Feast', minStage: 5, minCorruption: 50, archetypes: null },
  { id: 'gravity_well', label: 'Gravity Well', minStage: 6, minCorruption: 55, archetypes: ['athlete', 'gamer', 'overachiever'] },
  { id: 'leviathan_dream', label: 'Leviathan Dream', minStage: 8, minCorruption: 65, archetypes: null },
];

export const DREAM_CHOICES = {
  endless_buffet: [
    { id: 'indulge', label: 'Eat until the room dissolves', calories: 2000, rel: 4, corruption: 5 },
    { id: 'sample', label: 'Taste everything once', calories: 1200, rel: 2, corruption: 3 },
    { id: 'resist', label: 'Wake up hungry', calories: 400, rel: -1, corruption: 1 },
  ],
  floating_cake: [
    { id: 'climb', label: 'Climb the cake', calories: 1800, rel: 5, corruption: 4 },
    { id: 'slice', label: 'Take one perfect slice', calories: 900, rel: 3, corruption: 2 },
  ],
  feast_hall: [
    { id: 'head_table', label: 'Take the head table', calories: 2800, rel: 6, corruption: 7 },
    { id: 'serve', label: 'Let them serve you', calories: 2200, rel: 4, corruption: 5 },
  ],
  honey_river: [
    { id: 'drink', label: 'Drink deep', calories: 2400, rel: 5, corruption: 6 },
    { id: 'wade', label: 'Wade and taste', calories: 1600, rel: 3, corruption: 4 },
  ],
  mirror_feast: [
    { id: 'feed_reflection', label: 'Feed your reflection', calories: 3000, rel: 7, corruption: 8 },
    { id: 'watch', label: 'Watch her eat', calories: 1500, rel: 4, corruption: 5 },
  ],
  gravity_well: [
    { id: 'fall', label: 'Fall into the well', calories: 3500, rel: 5, corruption: 9 },
    { id: 'orbit', label: 'Orbit and snack', calories: 2000, rel: 3, corruption: 6 },
  ],
  leviathan_dream: [
    { id: 'become', label: 'Become the mountain', calories: 5000, rel: 8, corruption: 12 },
    { id: 'witness', label: 'Witness your vastness', calories: 2500, rel: 6, corruption: 8 },
  ],
};

export function canTriggerDream(student, { ownedSkills = {}, ownedClassSkills = {}, dreamsState = {}, week = 1, manual = false } = {}) {
  if ((ownedSkills.dream_walk || 0) < 1) return { ok: false, reason: 'Requires Dream Walk skill' };
  const stage = getStage(student.lbs).id;
  if (stage < 2) return { ok: false, reason: 'Student too early in growth' };
  if ((student.corruption || 0) < 40) return { ok: false, reason: 'Corruption too low for dreams' };
  if (manual && !ownedClassSkills.dream_chamber) return { ok: false, reason: 'Requires Dream Chamber upgrade' };
  const lastWeek = dreamsState.lastDreamWeek?.[student.id] || 0;
  if (lastWeek === week) return { ok: false, reason: 'Already dreamed this week' };
  return { ok: true, apCost: manual ? V2_CONFIG.dreamBaseAp : 0 };
}

export function pickDreamScenario(student) {
  const stage = getStage(student.lbs).id;
  const cor = student.corruption || 0;
  const arch = student.archetype;
  const eligible = DREAM_SCENARIOS.filter((d) => {
    if (stage < d.minStage) return false;
    if (cor < d.minCorruption) return false;
    if (d.archetypes && !d.archetypes.includes(arch)) return false;
    return true;
  });
  if (!eligible.length) return DREAM_SCENARIOS[0];
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function recordDream(dreamsState, studentId, week, scenarioId) {
  return {
    ...dreamsState,
    lastDreamWeek: { ...dreamsState.lastDreamWeek, [studentId]: week },
    totalDreams: (dreamsState.totalDreams || 0) + 1,
    lastScenario: scenarioId,
  };
}

export function rollWeeklyDreams(students, dreamsState, ownedSkills, week) {
  if ((ownedSkills.dream_walk || 0) < 1) return [];
  const triggers = [];
  for (const s of students) {
    if (s.hidden) continue;
    const check = canTriggerDream(s, { ownedSkills, dreamsState, week, manual: false });
    if (!check.ok) continue;
    if (Math.random() < 0.12) triggers.push(s.id);
  }
  return triggers;
}
