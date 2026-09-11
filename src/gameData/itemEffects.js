// Pantry item feed scaling — metadata in items.js.
import { depthIntensityMult, depthRelBonus } from './mechanicsDepthLayer.js';

export function scalePantryItemCalories(baseCal = 0) {
  if (!baseCal || baseCal <= 0) return 0;
  return Math.round(baseCal * depthIntensityMult(1));
}

/** Relationship tick bundled with pantry feeds (Hall Pass default +1). */
export function scalePantryItemRelGrant(baseRel = 1) {
  return depthRelBonus(baseRel);
}

/** Apply depth scaling to a pantry ITEM row before feeding or display. */
export function scaleItemForFeed(item) {
  if (!item) return item;
  return {
    ...item,
    cal: scalePantryItemCalories(item.cal),
    full: item.full,
  };
}
