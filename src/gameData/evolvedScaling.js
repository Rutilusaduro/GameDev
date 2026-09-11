// Depth-scaled evolved / wife-lesson payouts.
import { depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';

export function scaleEvolvedEventLbs(lbs = 0) {
  if (!lbs || lbs <= 0) return lbs || 0;
  return depthLbsGrant(lbs);
}

export function scaleEvolvedEventRel(rel = 0) {
  if (!rel) return 0;
  if (rel < 0) return rel;
  return depthRelBonus(rel);
}

export function scaleWlLessonLbs(lbs = 0) {
  return scaleEvolvedEventLbs(lbs);
}

export function scaleWlLessonRel(rel = 0) {
  return scaleEvolvedEventRel(rel);
}
