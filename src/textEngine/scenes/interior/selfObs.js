// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('interior.selfObs', [
  { when: {}, text: [
    '',
    'She catches herself standing differently — weight shifted, hips softer.',
    'The body is changing faster than the story she tells about it.',
    'The mirror holds a version of her she is still meeting.',
  ] },
  // A6 Slender — early interior, corruption 0
  { when: { corruption: [0], stageMax: 2 }, text: [
    'The body is still mostly the old story. The margins are changing.',
    'She catches herself standing differently — weight shifted, hips softer.',
    'The old silhouette is still recognizable. The margins are not.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'opposed' }, weight: 2, text: [
    'She inventories the new softness with something like dread.',
    'The mirror is an argument she keeps losing.',
    'Denial needs more effort each week. Effort is finite.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'reluctant' }, text: [
    'She notices the curve at her hip and does not know what to call the feeling.',
    'Want and worry share the same room in her chest.',
    'She names it curiosity when shame is not listening.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'secret' }, weight: 2, text: [
    'She checks the strain of her waistband when no one is watching.',
    'The softness is private property. She visits it often.',
    'She maps the new softness when the room is empty.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 3, gainStance: 'neutral' }, text: [
    'She notes the change and moves on.',
    'A little softer. Fine. There are readings to do.',
    'Change logged. Reaction pending. Appetite operational.',
  ] },
  { when: { stageMin: 3, corruption: [0] }, text: [
    'She catches herself touching her middle — reflex, not intention.',
    'The body is changing faster than the story she tells about it.',
    'The mirror holds a version of her she is still meeting.',
  ] },
  { when: { stageMin: 5, corruption: [1] }, text: [
    'She inventories the new softness without the old panic.',
    'The reflection is honest now. She looks longer than she used to.',
    'Acceptance arrives before vocabulary does.',
  ] },
  { when: { stageMin: 7 }, text: [
    'She knows her size practically — which doors, which chairs, which angles.',
    'Mass is a fact she carries the way she carries her bag.',
    'Doorways and chairs have opinions. She has learned to hear them.',
  ] },
  { when: { corruption: [2], stageMin: 4 }, text: [
    'She looks at herself with the fondness of someone checking progress.',
    'The body is a project. The project is going well.',
    'Progress looks good in the mirror. She checks again anyway.',
  ] },

  // ── psych-state tinting — fixation / obsession / dependence / shame ──
  // These ride on top of existing stage/corruption coverage.

  // Elevated fixation: the noticing has a charge.
  { when: { fixationTierMin: 1, stageMin: 2 }, weight: 2, text: [
    'She catches her reflection and the pause is one beat too long — measuring something.',
    'Her hand goes to her belly without instruction. She clocks it. Leaves it there.',
    'The pause at her reflection lengthens. She does not hurry it.',
  ] },
  // High fixation: body becomes a recurring thought-loop.
  { when: { fixationTierMin: 2, stageMin: 3 }, weight: 3, text: [
    'The body is back in her head again before she has finished looking away from it.',
    'She keeps returning to it — softer than last week, heavier than last month — like pressing a bruise, gently.',
    'She returns to the same thought: more, softer, again.',
  ] },
  // Extreme fixation: crowding out other thought.
  { when: { fixationTierMin: 3, stageMin: 3 }, weight: 4, text: [
    'She loses the thread of whatever else was happening. The body is all the thought, for a moment.',
    'It is the only thing she is really looking at, even when she is looking at something else.',
    'Other thoughts arrive and leave. The body stays.',
  ] },

  // Elevated obsession: the growth feels purposeful.
  { when: { obsessionTierMin: 1, stageMin: 3 }, weight: 2, text: [
    'She marks the softness the way you mark a page — something to come back to.',
    'The change has an urgency to it now. Not dread. More like: keep going.',
    'The trajectory feels inevitable. She is not fighting that feeling.',
  ] },
  // High obsession: the trajectory feels non-negotiable.
  { when: { obsessionTierMin: 2, stageMin: 4 }, weight: 3, text: [
    'There is a direction to all of this. She can feel it pulling the way gravity pulls.',
    'She checks the waistband not to gauge how bad it is — to gauge how far.',
    'Forward is the only direction that interests her now.',
  ] },

  // Elevated shame: self-consciousness going underground.
  { when: { shameTierMin: 1, corruption: [0], stageMin: 2 }, weight: 2, text: [
    'The old urge to cover herself is still there, still familiar — but she does not move.',
    'She is aware of herself in the specific way of someone who has been told, once, not to be.',
    'Heat rises in her cheeks. Her hand stays on her middle.',
  ] },
  // High shame: wanting and not-wanting share a nerve.
  { when: { shameTierMin: 2, corruption: [0], stageMin: 3 }, weight: 3, text: [
    'Want and the memory of shame share the same nerve. She has stopped trying to separate them.',
    'She does not look away. She should. The fact that she does not feels like progress.',
    'She watches herself want. The watching is new. The want is not.',
  ] },

  // Elevated dependence: her desire has started to feel entangled with yours.
  { when: { dependenceTierMin: 1, corruption: [1], stageMin: 3 }, weight: 2, text: [
    'She wonders if she would notice herself the same way if you were not in the habit of noticing her.',
    'Is this hers, or is this yours now? The question passes without being spoken.',
    'Your attention changed what she looks for in the mirror.',
  ] },
  // High dependence: the interiority is genuinely entangled.
  { when: { dependenceTierMin: 2, stageMin: 4 }, weight: 3, text: [
    'It is hard to know where the wanting started. She stopped keeping track of where it started.',
    'Her appetite, her softness, the way she keeps looking at herself — these are yours, a little. She does not mind.',
    'Some of this hunger wears your fingerprints. She does not wipe them away.',
  ] },
]);
