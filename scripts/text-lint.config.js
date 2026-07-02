// Text lint configuration — style ledger automation and sampling defaults.
export const BANNED_PATTERNS = [
  { pattern: /\. That is /i, message: "Fold judgment into behavior; cut 'That is X' constructions" },
  { pattern: /you both know/i, message: "Show behavior, don't narrate shared knowledge" },
  { pattern: /water weight/i, message: "No gain-excuse language (gate below stage 2 instead)" },
  { pattern: /I have become the/i, message: "Character dialogue cliché — show metaphorically" },
  { pattern: /adipose|BMI|obesity|weight issues/i, message: "Clinical language banned" },
  { pattern: /\b(leviathan|blob) scale\b/i, message: "Never use engine stage labels in player-facing prose" },
  { pattern: /\bat blob scale\b/i, message: "Never use engine stage labels in player-facing prose" },
  { pattern: /\bthe leviathan rests\b/i, message: "Never use stage names as nouns for the character" },
  { pattern: /\b(Colossal|Blob|Leviathan):\s/i, message: "Stage-name label crossing — describe lived threshold, not stage title" },
];

export const SAMPLE_SCENES = {
  wi: '{wi.arrival} {wi.settle} {wi.approachSentence} {wi.scaleSentence}',
  eat: '{eat.scene}',
  campus: '{campus.scene}',
  cloth: '{cloth.scene}',
  immob: '{immob.scene}',
  shift: '{shift.scene}',
  slender: '{slender.scene}',
};

export const COVERAGE_STAGE_PROBES = [0, 2, 4, 6, 8, 10, 11];

// Pools expected to have stage 10-11 weight-related variants.
export const STAGE_COVERAGE_PREFIXES = [
  'wi.', 'eat.', 'cloth.', 'campus.', 'immob.', 'slender.', 'word.moveVerb', 'word.adv.',
];

/** Squad stage bands for --coverage dashboard (Step 12). */
export const COVERAGE_BANDS = [
  {
    id: 'early',
    label: 'Early (A6 Slender)',
    stages: [0, 1, 2, 3, 4],
    corruption: [0],
    prefixes: ['slender.', 'wi.'],
  },
  {
    id: 'mobile',
    label: 'Mobile (A1)',
    stages: [5, 6, 7, 8, 9],
    prefixes: ['campus.', 'cloth.', 'eat.', 'wi.'],
  },
  {
    id: 'vast',
    label: 'Vast (A3 Immobility)',
    stages: [8, 9, 10, 11],
    prefixes: ['immob.', 'wi.', 'eat.', 'cloth.', 'word.moveVerb'],
  },
];

/** Corruption tiers probed for psych-heavy namespaces in --coverage. */
export const COVERAGE_CORRUPTION_PROBES = [0, 1, 2];

/** Dynamic lexicon / subject plumbing — allowed to stay on registerModule best-mode. */
export const INFRA_MODULE_KEYS = new Set([
  'subject.name', 'subject.first', 'subject.lbs', 'subject.semesterGain',
  'subject.they', 'subject.them', 'subject.their', 'subject.theirs', 'subject.themself',
  'char.desc', 'sizeCompare', 'bodyType.desc', 'clothing.desc', 'group.desc', 'device.label',
  'word.size', 'word.movement', 'word.body', 'word.clothingFit', 'word.fullness',
]);

/** --strict-volume: fail when thin wildcard pools remain (Phase A gate). */
export const STRICT_VOLUME_MAX_THIN = 0;

/** --strict-coverage: fail when overall band coverage falls below this percent. */
export const STRICT_COVERAGE_MIN_PCT = 80;

/** Psych-register convention (AUTHORING.md): word.* pools exempt from the
 *  "at least one psych-keyed variant" warning — mechanical corpora only. */
export const PSYCH_REGISTER_EXEMPT_PREFIXES = [
  'word.moveVerb', 'word.adv.sizeQual.body', 'word.needleVerb',
];

/** Stem-repeat gate: max % of sweep renders allowed to carry a 3×-repeated
 *  stem. Ratcheted to the plan's 1% target (measured 0.90% after the
 *  Phase 6 fixes: enc. tracking, irregular stem folds, portrait retirement). */
export const STEM_TRIPLE_MAX_PCT = 1;

// §9 programmatic bridges — legacy prose registered verbatim pending MIGRATION.md decomposition.
export const MIGRATION_BRIDGE_PREFIXES = [
  'journal.feeder.',
  'journal.nadia.',
  'campusEvent.scene.',
  'campusEvent.choice.',
  'dinner.dish.',
  'hunt.feast.',
  'wifeLessons.lesson.',
  'wifeLessons.talk.',
];

// Squad-owned namespaces for --volume reporting (Step 9 content targets).
export const VOLUME_SQUAD_PREFIXES = [
  'slender.', 'campus.', 'eat.', 'cloth.', 'shift.', 'interior.', 'immob.',
];

// Pools where empty-string wildcards are intentional optional slots.
export const OPTIONAL_EMPTY_POOLS = new Set([
  'eat.midMeal', 'eat.pacing', 'eat.hungerClause', 'eat.bodyResponse', 'eat.soundTex', 'eat.aroma',
  'eat.portionObs', 'cloth.failSound', 'cloth.aftermath',
  'campus.obstacle', 'campus.spaceObs', 'campus.soundTex',
  'immob.attempt', 'immob.assistClause', 'immob.assistance',
  'shift.denial', 'shift.scene',
  'interior.selfObs', 'interior.sizeRealize', 'interior.gainPride',
  'slender.deflect', 'slender.neutral', 'slender.secret', 'slender.mirror', 'slender.eatPause',
  'word.addictedHunger', 'word.addictedEating', 'word.withdrawal',
]);
