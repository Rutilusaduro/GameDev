// ═══════════════════════════════════════════════════════════════
// APPETITE DREAMS — surreal subconscious feeding
// ═══════════════════════════════════════════════════════════════
import { getStage } from '../stages.js';
import {
  depthCorruptionGrant,
  depthRelBonus,
  depthResonancePassiveBonus,
} from '../mechanicsDepthLayer.js';
import { V2_CONFIG } from './state.js';

export function scaleDreamChoiceEffect(choice) {
  if (!choice) return { calories: 0, rel: 0, corruption: 0 };
  return {
    calories: depthResonancePassiveBonus(choice.calories || 0),
    rel: depthRelBonus(choice.rel || 0),
    corruption: depthCorruptionGrant(choice.corruption || 0),
  };
}

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
    { id: 'lucid_devour', label: 'Steer: devour the dream whole', calories: 6000, rel: 10, corruption: 14, lucidOnly: true },
  ],
};

/** Lucid-only steering choices — direct player control over dream outcome. */
export const LUCID_DREAM_STEER = {
  endless_buffet: { id: 'lucid_indulge', label: 'Steer: eat until the dream obeys', calories: 3500, rel: 6, corruption: 8 },
  floating_cake: { id: 'lucid_climb', label: 'Steer: claim the whole cake', calories: 2800, rel: 7, corruption: 7 },
  feast_hall: { id: 'lucid_head', label: 'Steer: command the head table', calories: 4000, rel: 8, corruption: 9 },
  honey_river: { id: 'lucid_drink', label: 'Steer: drink until honey wins', calories: 3800, rel: 7, corruption: 8 },
  mirror_feast: { id: 'lucid_feed', label: 'Steer: feed every reflection', calories: 4500, rel: 9, corruption: 10 },
  gravity_well: { id: 'lucid_fall', label: 'Steer: fall without braking', calories: 5000, rel: 8, corruption: 11 },
  leviathan_dream: { id: 'lucid_become', label: 'Steer: become the mountain', calories: 6500, rel: 10, corruption: 15 },
};

export function getDreamChoices(scenarioId, lucidUnlocked = false) {
  const base = DREAM_CHOICES[scenarioId] || DREAM_CHOICES.endless_buffet;
  if (!lucidUnlocked) return base;
  const steer = LUCID_DREAM_STEER[scenarioId];
  const extras = base.filter((c) => c.lucidOnly);
  return steer ? [...base.filter((c) => !c.lucidOnly), steer, ...extras] : base;
}

export function canTriggerDream(student, { ownedSkills = {}, ownedHallSkills = {}, dreamsState = {}, week = 1, manual = false } = {}) {
  if ((ownedSkills.dream_walk || 0) < 1) return { ok: false, reason: 'Requires Dream Walk skill' };
  const stage = getStage(student.lbs).id;
  if (stage < 2) return { ok: false, reason: 'Student too early in growth' };
  if ((student.corruption || 0) < 40) return { ok: false, reason: 'Corruption too low for dreams' };
  if (manual && !ownedHallSkills.dream_chamber) return { ok: false, reason: 'Requires Dream Chamber upgrade' };
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
  const totalDreams = (dreamsState.totalDreams || 0) + 1;
  const lucidUnlocked = dreamsState.lucidUnlocked
    || totalDreams >= V2_CONFIG.dreamLucidUnlockCount;
  return {
    ...dreamsState,
    lastDreamWeek: { ...dreamsState.lastDreamWeek, [studentId]: week },
    totalDreams,
    lastScenario: scenarioId,
    lucidUnlocked,
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
