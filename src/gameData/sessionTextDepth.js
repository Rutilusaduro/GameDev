// Session / ranked-session narrative depth — V2 append chance helpers.
import { depthNarrativeAppendChance } from './mechanicsDepthLayer.js';

export function rankedSessionV2DepthChance(base = 0.28) {
  return depthNarrativeAppendChance(base);
}

export function privateSessionV2DepthChance(base = 0.3) {
  return depthNarrativeAppendChance(base);
}
