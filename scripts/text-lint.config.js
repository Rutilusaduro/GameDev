// Text lint configuration — style ledger automation and sampling defaults.
export const BANNED_PATTERNS = [
  { pattern: /\. That is /i, message: "Fold judgment into behavior; cut 'That is X' constructions" },
  { pattern: /you both know/i, message: "Show behavior, don't narrate shared knowledge" },
  { pattern: /water weight/i, message: "No gain-excuse language (gate below stage 2 instead)" },
  { pattern: /I have become the/i, message: "Character dialogue cliché — show metaphorically" },
  { pattern: /adipose|BMI|obesity|weight issues/i, message: "Clinical language banned" },
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
