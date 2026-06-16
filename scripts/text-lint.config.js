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
]);
