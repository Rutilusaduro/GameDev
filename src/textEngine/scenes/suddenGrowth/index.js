// ═══════════════════════════════════════════════════════════════
// SCENE: SUDDEN GROWTH — public API
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import {
  resolveGrowthZone,
  isSuddenGrowth,
  SUDDEN_GROWTH_LBS_MIN,
} from '../../growthLexicon.js';
import '../../growthLexicon.js';

function weightBandFromLbs(lbs) {
  const stageId = getStage(lbs ?? 130).id;
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) return band;
  }
  return 'lean';
}

/**
 * Render a sudden-growth line from the growth lexicon.
 * Returns empty string if gainLbs is below sudden threshold.
 */
export function renderSuddenGrowthLine(student, {
  gainLbs = 0,
  growthZone = null,
  week = 1,
  bodyState = null,
} = {}) {
  if (!student || !isSuddenGrowth(gainLbs)) return '';
  const zone = growthZone || resolveGrowthZone(student);
  const ctx = createContext({
    subject: student,
    week,
    globals: {
      growthZone: zone,
      gainLbs,
      gainLbsMin: gainLbs,
      suddenGrowth: true,
      bodyState: bodyState || student?.bodyOverride?.stateType || null,
      weightBand: weightBandFromLbs(student?.lbs),
    },
  });
  return render('{grow.sudden}', ctx);
}

export { SUDDEN_GROWTH_LBS_MIN, resolveGrowthZone, isSuddenGrowth };
