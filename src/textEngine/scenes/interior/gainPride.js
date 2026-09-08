// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('interior.gainPride', [
  { when: {}, text: [
    '',
    'The gain is visible. She is learning not to hide it.',
    'More of her every week — softness accumulating like evidence.',
    'She catches her reflection and does not look away fast.',
  ] },
  { when: { corruption: [1, 2], stageMin: 4 }, text: [
    'The gain is visible. She is not hiding it anymore.',
    'More of her every week — she has stopped treating that as emergency.',
    'She catches her reflection and does not look away fast.',
    'Softness accumulates like evidence she is proud to display.',
  ] },
  { when: { corruption: [2], stageMin: 6 }, weight: 2, text: [
    'She is proud in the specific way of someone who chose this.',
    'The number climbs. She smiles. Whole report in one expression.',
    'Progress is visible and intentional. She would not undo a pound.',
  ] },
  { when: { corruption: [2], stageMin: 10 }, text: [
    'Vastness is not accident. She intended every inch.',
    'She has become what she wanted to become. The wanting continues.',
    'Scale is testimony. She keeps adding evidence.',
  ] },

  // ── psych-state tinting ───────────────────────────────────────
  // Elevated obsession: the pride sharpens into something more focused.
  { when: { obsessionTierMin: 1, corruption: [1, 2], stageMin: 4 }, weight: 2, text: [
    'She is watching the progress the way you watch a project you cannot stop thinking about.',
    'It is the best thing she has going. She knows it. She is not embarrassed to know it.',
    'The gain has her full attention. Everything else is background.',
  ] },
  // High obsession: gaining is the organizing principle.
  { when: { obsessionTierMin: 2, corruption: [1, 2], stageMin: 5 }, weight: 3, text: [
    'Everything else happens around the growing. The growing is the main event.',
    'She is not becoming more comfortable with it — she is becoming more addicted to the comfort.',
    'Appetite and pride share a calendar. Both are full.',
  ] },
  // Extreme obsession: the desire has an appetite of its own.
  { when: { obsessionTierMin: 3, stageMin: 5 }, weight: 4, text: [
    'The wanting is autonomous now. She just tries to keep up with it.',
    'More is not enough and enough is not the right word — the right word is: more.',
    'She stopped asking if this is too much. Too much is the point.',
  ] },

  // Elevated fixation: pride is also surveillance.
  { when: { fixationTierMin: 1, corruption: [1, 2], stageMin: 3 }, weight: 2, text: [
    'She is watching herself the way she watches something she does not want to miss.',
    'The satisfaction in the mirror is real. The return trips are getting more frequent.',
    'Pride and surveillance blur. She keeps checking anyway.',
  ] },
  // High fixation: the surveillance has become intimate.
  { when: { fixationTierMin: 2, stageMin: 4 }, weight: 3, text: [
    'She knows the exact contour of what she has become. She keeps checking anyway.',
    'There is no new information in the mirror. There is always a reason to go back.',
    'The mirror is habit now. A good habit. A hungry one.',
  ] },

  // Elevated dependence: the pride is partly borrowed.
  { when: { dependenceTierMin: 1, corruption: [1, 2], stageMin: 4 }, weight: 2, text: [
    'The best part is being seen like this. By you specifically. She does not examine that too closely.',
    'Pride, but not private pride — the kind that needs a witness to be fully felt.',
    'Your gaze completes the feeling. She lets it.',
  ] },
  // High dependence: being seen is the substance of the pride.
  { when: { dependenceTierMin: 2, stageMin: 5 }, weight: 3, text: [
    'She is proud in the way of someone who has been admired into certainty.',
    'It started as wanting to be seen. Now it is something harder to name — needing to be seen like this, by you, or the pride has no place to go.',
    'Admiration taught her what to want. She graduated.',
  ] },
]);
