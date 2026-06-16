// The Squad — Lead: A4 Architect | Support: A2 Psych, A7 Artisan, A5 Editor
// Shared psych/hunger/jealousy phrase pools (DEPTH_PLAN §9b).
import { registerPool } from '../engine.js';

// ── word.psychVoice — interior tone clause ────────────────────
registerPool('word.psychVoice', [
  { when: { shameTierMin: 2, corruption: [0] }, text: [
    'voice tight with practiced denial',
    'words arriving a half-second late, as if edited on the way out',
    'tone careful, as if the wrong syllable might confess something',
  ] },
  { when: { shameTier: [1], corruption: [0] }, text: [
    'voice wavering between protest and curiosity',
    'words that start firm and soften before the period',
    'tone unsure whether she is allowed to want this',
  ] },
  { when: { fixationTierMin: 2, corruption: [0] }, text: [
    'voice low, pleased, trying not to show it',
    'words soft with a hunger she will not name',
    'tone private, as if speaking to herself',
  ] },
  { when: { corruption: [1] }, text: [
    'voice flat with familiar appetite',
    'words matter-of-fact about a body she no longer argues with',
    'tone settled, like a fact repeated until it feels true',
  ] },
  { when: { corruption: [2] }, text: [
    'voice warm with open want',
    'words unhurried, proud without performance',
    'tone content, as if fullness were a compliment',
  ] },
  { when: {}, text: [
    'voice even, unbothered',
    'words filed like any other weekly detail',
    'tone calm, almost administrative',
  ] },
]);

// ── word.breathQuality — fullness-keyed breath clause ───────────
registerPool('word.breathQuality', [
  { when: { fullnessMin: 1.1 }, text: [
    'breath shallow around drum-tight fullness',
    'each inhale negotiated around packed middle',
    'breathing careful, as if the air has to find a new route',
  ] },
  { when: { fullnessMin: 0.9 }, text: [
    'breath slowed by heavy fullness',
    'sighing between sentences, belly high',
    'breathing deeper, as if making room',
  ] },
  { when: { fullnessMin: 0.6 }, text: [
    'breath warm and satisfied',
    'breathing easy after a good meal',
    'a content exhale between words',
  ] },
  { when: {}, text: [
    'breath steady',
    'breathing unremarkable',
    'air moving without effort',
  ] },
]);

// ── word.jealousyReaction — peer comparison beat ───────────────
registerPool('word.jealousyReaction', [
  { when: { stageMin: 5, relationship: [2, 3, 4] }, text: [
    'watching with a smile that does not quite reach her eyes',
    'laughing a beat too late, attention on the plate instead',
    'complimenting the moment while measuring herself against it',
  ] },
  { when: { stageMin: 3, relationship: [1, 2, 3, 4] }, text: [
    'glancing down at her own middle, then away',
    'going quiet in the way people do when comparison lands',
    'fiddling with her napkin while someone else eats',
  ] },
  { when: {}, text: [
    'pretending not to notice',
    'keeping her expression pleasant and closed',
    'looking elsewhere while the room reacts',
  ] },
]);

// ── word.hungerPhrase — hunger-tier appetite clause ────────────
registerPool('word.hungerPhrase', [
  { when: { hungerTier: [4] }, text: [
    'hunger sharp enough to feel physical',
    'appetite frantic at the edges',
    'stomach insisting in a voice she cannot ignore',
  ] },
  { when: { hungerTier: [3] }, text: [
    'craving pulling at her attention',
    'hunger restless between sentences',
    'appetite louder than the conversation',
  ] },
  { when: { hungerTier: [2] }, text: [
    'clearly thinking about food',
    'hunger present in every pause',
    'appetite climbing through the afternoon',
  ] },
  { when: { hungerTier: [1] }, text: [
    'a little hungrier than usual',
    'appetite nudging at the margins',
    'stomach reminding her it exists',
  ] },
  { when: {}, text: [
    'appetite ordinary for the hour',
    'hunger nothing she remarks on',
    'no unusual pull toward food',
  ] },
]);
