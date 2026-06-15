// ═══════════════════════════════════════════════════════════════
// DIGEST STAGE-UP — slow, between-weeks growth scenes
// Domestic noticing (clothes, mirror, Sunday morning) — not device surges.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import './fragments.js';

registerPool('ge.digestOnset', [
  { when: { featureId: 'digest_stageup' }, text: [
    '{subject.name} wakes on Sunday feeling heavier before her feet hit the floor.',
    'Getting dressed takes {subject.name} longer than it did last week — she notices before the mirror does.',
    '{subject.name} reaches for clothes that felt fine on Friday and hesitates.',
    'The week catches up with {subject.name} quietly, between meals and mirror checks.',
    '{subject.name} {ge.digestOnsetLine}.',
  ] },
  { when: {}, text: ['{subject.name} {ge.digestOnsetLine}.'] },
]);

registerPool('ge.digestNotice', [
  { when: { featureId: 'digest_stageup', endStage: 3 }, text: [
    'She hooks her bra on the next clasp out and tells herself it is temporary.',
    '{ge.garment} digs in differently — waistband, bra band, something she kept dismissing all week.',
    '{ge.garment} rides higher on her hips than it did on Monday.',
    'The mirror shows what eating promised: softer face, tighter waistband, no single dramatic moment.',
    'She tugs {ge.garment} straight and knows it will not stay that way long.',
  ] },
  { when: { featureId: 'digest_stageup', endStage: 4 }, text: [
    '{ge.garment} — tighter now, in all the places the week kept feeding.',
    'Buttons and elastic tell the truth before the scale does.',
    'She exhales getting into {ge.garment}; it fit on Thursday.',
    'Stairs take a little more breath; {ge.garment} was the first clue.',
  ] },
  { when: { featureId: 'digest_stageup' }, text: [
    '{ge.garment} fits differently than she remembers from Monday.',
    'Fabric that forgave her last week does not forgive her today.',
    'She adjusts {ge.garment} twice before leaving the room.',
  ] },
  { when: {}, text: ['{ge.garment} fits differently than she remembers.'] },
]);

registerPool('ge.digestReaction', [
  { when: { featureId: 'digest_stageup', corruption: [0] }, text: [
    '{subject.name} exhales, cheeks warming. "Okay. So that\'s where I am."',
    '"I felt it coming," {subject.name} says, not quite believing herself.',
    '{subject.name} looks down, then away. "That\'s… new."',
  ] },
  { when: { featureId: 'digest_stageup', corruption: [1] }, text: [
    '{subject.name} huffs a laugh. "Well. That explains the week."',
    '"Could be worse," {subject.name} says, adjusting {ge.garment} again.',
  ] },
  { when: { featureId: 'digest_stageup' }, text: [
    '{subject.name} meets her own eyes in the mirror and does not look away.',
    '"Huh," {subject.name} says softly. Not shocked — just arrived.',
    '{subject.name} steadies herself and keeps dressing.',
  ] },
  { when: {}, text: ['{subject.name} takes a breath and keeps going.'] },
]);

registerPool('ge.digestSettle', [
  { when: { featureId: 'digest_stageup' }, text: [
    'By evening it feels normal again — heavier, softer, undeniably hers.',
    'The gain does not explode; it settles, like a decision she made one bite at a time.',
    'She carries the new weight into the week without ceremony.',
    'The week\'s meals have left their mark — slow, steady, and entirely welcome.',
  ] },
  { when: {}, text: ['The softness stays.'] },
]);
