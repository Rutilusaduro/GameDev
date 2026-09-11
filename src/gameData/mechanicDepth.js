// Live inventory of mechanic depth hooks. Tests assert every system has a payoff.
import { aggregateFloorDepth, extraFeedCalories, completedRoomCount, roomFill } from './floorBlueprint.js';
import { plannerSlotCount, resolveWeekPlan, emptyWeekPlan } from './weekPlanner.js';
import { clothingStateForStage } from './textContext.js';
import { pickHearingEnding, REMOVAL_HEARING } from './oppositionHearings.js';

/** before = live payoff axes at start of overhaul; after = live axes now. */
export const MECHANIC_DEPTH_INVENTORY = [
  { id: 'talk', before: 1, after: 3, hook: 'talkRelBonus+talkCorruptionBonus+hungerTalkDrop' },
  { id: 'feed', before: 1, after: 2, hook: 'extraFeedCalories' },
  { id: 'dinner', before: 1, after: 2, hook: 'dinnerCalBonus' },
  { id: 'feast', before: 1, after: 3, hook: 'feastCalBonus+kitchenFill' },
  { id: 'hunger', before: 1, after: 2, hook: 'interruptReduce' },
  { id: 'ecology', before: 1, after: 2, hook: 'ecologyDecayReduce' },
  { id: 'weighIn', before: 1, after: 2, hook: 'weighInRelBonus' },
  { id: 'roomVisit', before: 1, after: 2, hook: 'roomVisitRelBonus' },
  { id: 'intimacy', before: 1, after: 2, hook: 'intimacyRelBonus' },
  { id: 'devices', before: 1, after: 2, hook: 'deviceTickBonus' },
  { id: 'pantry', before: 1, after: 2, hook: 'pantryBonus+itemCalBonus' },
  { id: 'campus', before: 1, after: 2, hook: 'campusYieldBonus' },
  { id: 'opposition', before: 1, after: 2, hook: 'oppositionCover+hearingShield' },
  { id: 'clothing', before: 1, after: 2, hook: 'clothingEase' },
  { id: 'streaming', before: 1, after: 2, hook: 'streamRelBonus+audience' },
  { id: 'sessions', before: 1, after: 2, hook: 'sessionCapNextWeek' },
  { id: 'circuit', before: 0, after: 3, hook: 'walkAfterHours' },
  { id: 'planner', before: 1, after: 3, hook: 'resolveWeekPlan+venuePick' },
  { id: 'floorCheckIn', before: 1, after: 3, hook: 'kitchenChoice+loungeGainMult' },
  { id: 'hunt', before: 1, after: 2, hook: 'kitchenHuntBonus' },
  { id: 'trust', before: 1, after: 2, hook: 'socialTrustDrip' },
  { id: 'discontent', before: 1, after: 2, hook: 'comfortFramingDecay' },
  { id: 'evolved', before: 1, after: 2, hook: 'completedRoomActivityGain' },
  { id: 'influence', before: 1, after: 2, hook: 'pairGainFromSocial' },
  { id: 'narrativeEvents', before: 1, after: 2, hook: 'echoRelBonus' },
];

export function kitchenHuntBonus(baseGain, owned = {}) {
  const fill = aggregateFloorDepth(owned);
  return Math.round((baseGain || 0) * (0.12 + (fill.synergyGainMult || 0)));
}

export function socialTrustDrip(owned = {}) {
  const rooms = completedRoomCount(owned);
  const social = aggregateFloorDepth(owned).talkRelBonus || 0;
  return Math.min(8, Math.floor(rooms / 3) + Math.min(3, Math.floor(social / 3)));
}

export function comfortFramingDecay(owned = {}) {
  return owned.comfort_framing ? 3 : 0;
}

export function floorCheckInGainMult(owned = {}) {
  return 1 + Math.min(0.3, completedRoomCount(owned) * 0.03);
}

export function itemCalorieBonus(label, owned = {}) {
  return extraFeedCalories(label, owned);
}

/** Kitchen/dining fill extra calories on hall-wide pizza/potluck/feast. */
export function hallKitchenFillCalories(owned = {}) {
  return Math.round(roomFill('kitchen', owned) * 2400 + roomFill('dining', owned) * 800);
}

export function hallDiningFillFullness(owned = {}) {
  return Math.round(roomFill('dining', owned) * 8 + roomFill('kitchen', owned) * 4);
}

export function assertMechanicDepthCoverage() {
  return MECHANIC_DEPTH_INVENTORY.map((row) => row.id);
}

export {
  plannerSlotCount,
  resolveWeekPlan,
  emptyWeekPlan,
  clothingStateForStage,
  pickHearingEnding,
  REMOVAL_HEARING,
};
