// Intimacy choice / ending numeric scaling (metadata stays in intimacyData.js).
import { depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';

export function scaleIntimacyChoiceRewards(choice = {}) {
  const out = {
    lbs: choice.lbs ? depthLbsGrant(choice.lbs) : 0,
    rel: choice.rel ? depthRelBonus(choice.rel) : 0,
    gainRange: null,
  };
  if (Array.isArray(choice.gainRange) && choice.gainRange.length >= 2) {
    out.gainRange = [depthLbsGrant(choice.gainRange[0]), depthLbsGrant(choice.gainRange[1])];
  }
  return out;
}

export function scaleIntimacyEndingBonuses(ending = {}) {
  return {
    gainBonus: ending.gainBonus ? depthLbsGrant(ending.gainBonus) : 0,
    relBonus: ending.relBonus ? depthRelBonus(ending.relBonus) : 0,
  };
}
