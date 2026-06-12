// ═══════════════════════════════════════════════════════════════
// GROWTH LEXICON — registers mined sudden-growth prose pools
// ═══════════════════════════════════════════════════════════════
import { registerPool } from './engine.js';
import {
  GROWTH_LEXICON_CHUNKS,
  GROWTH_ZONE_BY_BODY_TYPE,
  SUDDEN_GROWTH_LBS_MIN,
} from './growthLexiconData.js';

function buildVariants(chunks) {
  const variants = [];
  for (const chunk of chunks) {
    for (const bodyType of chunk.bodyTypes) {
      variants.push({
        when: { bodyType, growthZone: chunk.zone },
        text: chunk.texts,
      });
    }
  }
  variants.push({
    when: {},
    text: [
      "{subject.name}'s body swelled with sudden, unmistakable softness — the gain visible before she could name it.",
      "Weight settled rapidly into {subject.first}'s frame, thickening her in quiet, visible inches.",
      "{subject.name} thickened all at once — plush fat accumulating where the surge hit hardest.",
      "Soft fat built up on {subject.first} faster than the week should allow, reshaping her silhouette in real time.",
    ],
  });
  return variants;
}

registerPool('grow.sudden', buildVariants(GROWTH_LEXICON_CHUNKS));

export function resolveGrowthZone(student) {
  const bt = student?.bodyOverride?.bodyTypeOverride || student?.bodyType || 'default';
  return GROWTH_ZONE_BY_BODY_TYPE[bt] || GROWTH_ZONE_BY_BODY_TYPE.default;
}

export function isSuddenGrowth(gainLbs) {
  return (gainLbs ?? 0) >= SUDDEN_GROWTH_LBS_MIN;
}

export { SUDDEN_GROWTH_LBS_MIN, GROWTH_ZONE_BY_BODY_TYPE };
