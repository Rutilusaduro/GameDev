// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('interior.selfObs', [
  { when: {}, text: ['', ''] },
  // A6 Slender — early interior, corruption 0
  { when: { corruption: [0], stageMax: 2 }, text: [
    'The body is still mostly the old story. The margins are changing.',
    'She catches herself standing differently — weight shifted, hips softer.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'opposed' }, weight: 2, text: [
    'She inventories the new softness with something like dread.',
    'The mirror is an argument she keeps losing.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'reluctant' }, text: [
    'She notices the curve at her hip and does not know what to call the feeling.',
    'Want and worry share the same room in her chest.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'secret' }, weight: 2, text: [
    'She checks the strain of her waistband when no one is watching.',
    'The softness is private property. She visits it often.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'neutral' }, text: [
    'She notes the change and moves on.',
    'A little softer. Fine. There are readings to do.',
  ] },
  { when: { stageMin: 3, corruption: [0] }, text: [
    'She catches herself touching her middle — reflex, not intention.',
    'The body is changing faster than the story she tells about it.',
  ] },
  { when: { stageMin: 5, corruption: [1] }, text: [
    'She inventories the new softness without the old panic.',
    'The reflection is honest now. She looks longer than she used to.',
  ] },
  { when: { stageMin: 7 }, text: [
    'She knows her size practically — which doors, which chairs, which angles.',
    'Mass is a fact she carries the way she carries her bag.',
  ] },
  { when: { corruption: [2], stageMin: 4 }, text: [
    'She looks at herself with the fondness of someone checking progress.',
    'The body is a project. The project is going well.',
  ] },
]);
