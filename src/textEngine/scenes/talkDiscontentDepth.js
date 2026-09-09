// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for talk.discontentCoda — per-student + stage bands.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('talk.discontentCoda', [
  // Tier expansions
  { when: { discontentTier: 1, stageMin: 6 }, weight: 2, text: [
    ` She answers you, but her body turns away — belly still, gaze cool, appetite withheld.`,
    ` Courtesy remains; warmth does not. Something in her posture says she is eating elsewhere tonight.`,
  ]},
  { when: { discontentTier: 2, relationship: [0, 1] }, weight: 2, text: [
    ` Every reply is short enough to end the conversation; she seems eager for it to end.`,
    ` She watches you like a problem she has not decided how to solve.`,
  ]},
  { when: { discontentTier: 3, corruption: [2] }, weight: 2, text: [
    ` The devotion is gone — replaced by a flat certainty that you have wasted her time.`,
    ` She gives you nothing to work with. At {subject.lbs} lbs she does not need your attention to keep growing.`,
  ]},
  // Per-student voice (weight 4)
  { when: { studentId: 0, discontentTier: [2, 3] }, weight: 4, text: [
    ` Brittany's smile never reaches her eyes. "Anything else, Professor?" Captain tone. Bench-you tone.`,
  ]},
  { when: { studentId: 1, discontentTier: [1, 2, 3] }, weight: 4, text: [
    ` Madeline's pen stops. "Noted," she says, and does not elaborate. The silence is annotated anyway.`,
  ]},
  { when: { studentId: 2, discontentTier: [2, 3] }, weight: 4, text: [
    ` Kylie films nothing. "We're done," she says, flat. The phone stays down.`,
  ]},
  { when: { studentId: 3, discontentTier: [2, 3] }, weight: 4, text: [
    ` Serena's jaw sets. "Bad coaching," she says. "I'm done for today."`,
  ]},
  { when: { studentId: 5, discontentTier: [1, 2, 3] }, weight: 4, text: [
    ` Destiny doesn't look up. "Stream ending early," she mutters. "Lag in the conversation."`,
  ]},
  { when: { studentId: 7, discontentTier: [2, 3] }, weight: 4, text: [
    ` Priya closes her planner. "Inefficient use of desk hours," she says. "Rescheduling myself."`,
  ]},
  { when: { studentId: 8, discontentTier: [1, 2, 3] }, weight: 4, text: [
    ` Maya says less than usual — which was already almost nothing. The distance is louder.`,
  ]},
  { when: { studentId: 10, discontentTier: [2, 3] }, weight: 4, text: [
    ` Reneé turns back to the stove. "Kitchen's closed to you tonight," she says, gentle and final.`,
  ]},
  { when: { studentId: 12, discontentTier: [2, 3] }, weight: 4, text: [
    ` Nadia writes without looking at you. "Subject disengaged," she murmurs. Clinical. Cutting.`,
  ]},
  { when: { studentId: 13, discontentTier: [2, 3] }, weight: 4, text: [
    ` Daisy's warmth goes professional. "I think we're done here, sugar," she says, already packing up.`,
  ]},
  { when: { studentId: 15, discontentTier: [2, 3] }, weight: 4, text: [
    ` Lilith's stillness turns predatory. "You bore me," she says, like a verdict.`,
  ]},
  { when: { studentId: 16, discontentTier: [1, 2, 3] }, weight: 4, text: [
    ` Sophia won't meet your eyes. "This is contraindicated," she whispers. "I'm leaving."`,
  ]},
  { when: { studentId: 18, discontentTier: [2, 3] }, weight: 4, text: [
    ` Talia caps her pen. "Experiment paused," she says. "Variables contaminated."`,
  ]},
]);
