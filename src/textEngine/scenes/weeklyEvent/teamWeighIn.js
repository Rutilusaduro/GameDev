// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — athletics department weigh-in
// Migrated from NARRATIVE_EVENTS monolith (team_weigh_in).
// Beats: dodge → mandatory → verdict → aftermath.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// ── weekly.teamWeighIn.dodge — FULL SENTENCE: she's been putting it off
registerPool('weekly.teamWeighIn.dodge', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    '{subject.name} has been dodging the athletics office scale since preseason.',
    'The track board still lists {subject.name} at her old weight. She has avoided the official scale for weeks.',
    '{subject.name} has been treating the athletics office scale like a rival she does not intend to race.',
  ] },
  { when: { archetype: 'athlete' }, text: [
    '{subject.name} has been avoiding the athletics department scale for weeks.',
    'The team weigh-in has been on the calendar. {subject.name} has been conspicuously elsewhere.',
    'Every reminder about the athletics scale has met the same answer from {subject.name}: later.',
  ] },
  { when: {}, text: [
    '{subject.name} has been putting off a scale she knows will not flatter her.',
    'The official weigh-in has been looming. {subject.name} has been skilled at not being there.',
    'She has dodged the athletics scale as long as policy allowed.',
    'The number waiting for her has been obvious for weeks. She has avoided hearing it out loud.',
  ] },
]);

// ── weekly.teamWeighIn.forced — FULL SENTENCE: today she cannot dodge
registerPool('weekly.teamWeighIn.forced', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    'Today she cannot.',
    'This week the athletics office makes it mandatory.',
  ] },
  { when: { archetype: 'athlete' }, text: [
    'Today the athletics department scale is mandatory. {subject.name} cannot dodge it again.',
    'Today there is no excuse left. She steps on anyway.',
    'The athletics office finally runs out of patience. She goes in.',
  ] },
  { when: {}, text: [
    'Today the scale wins.',
    'This week she has to stand on it anyway.',
    'The appointment arrives whether she is ready or not.',
    'She goes in because there is no remaining way around it.',
  ] },
]);

// ── weekly.teamWeighIn.verdict — FULL SENTENCE: what the scale found
registerPool('weekly.teamWeighIn.verdict', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    'She tells you flatly: "Thirty-five pounds over their limit."',
    'She reports the number without drama: thirty-five pounds past what track will allow.',
  ] },
  { when: { archetype: 'athlete', endStageMin: 5 }, text: [
    'She tells you flatly: "{subject.semesterGain} pounds over their limit."',
    'The athletics office reads her {subject.semesterGain} pounds past eligibility. She repeats it like a split time she already knew.',
  ] },
  { when: { archetype: 'athlete' }, text: [
    'She is over the team limit — not by a little. She reports the number without drama.',
    'The scale puts her well past program weight. She says it like weather.',
    'She is out of compliance by a margin that ends the pretense.',
  ] },
  { when: { endStageMin: 6 }, text: [
    'The number on the athletics scale is far past what her program allows. She delivers it without flinching.',
    'She is so far over limit that the staff go quiet before she does. She states the pounds anyway.',
  ] },
  { when: {}, text: [
    'The number is well past what her program allows. She says it like weather.',
    'She is out of bounds on the official scale and says so plainly.',
    'The weigh-in finds her well over limit. She does not dress it up.',
    'She reports the overage without performance. The number is simply too large to argue with.',
  ] },
]);

// ── weekly.teamWeighIn.professional — DIALOGUE BEAT: staff handled it
registerPool('weekly.teamWeighIn.professional', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    'Beat. "They were very professional about it."',
    '"They were very professional about it," she adds, like that matters more than the number.',
  ] },
  { when: { archetype: 'athlete' }, text: [
    'Beat. "They were professional about it."',
    '"The staff were polite," she says. "That helped."',
    'She pauses. "They did not make it weird. I appreciated that."',
  ] },
  { when: {}, text: [
    'The staff keep their voices level. She appreciates that more than she says.',
    'Nobody gawks. The room stays civil. She notes it.',
    'The athletics office handles it like paperwork. She handles it like weather.',
    '',
  ] },
]);

// ── weekly.teamWeighIn.afterDialogue — DIALOGUE BEAT: how she takes it
registerPool('weekly.teamWeighIn.afterDialogue', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    'Another beat. "I ate an entire pizza on the way home and I feel fine, actually."',
    '"I ate an entire pizza on the way home," she says. "I feel fine, actually."',
  ] },
  { when: { archetype: 'athlete', corruption: [2] }, text: [
    'She shrugs. "Wrong sport now, maybe." She does not sound upset.',
    '"New event," she says. "No weight class." She almost smiles.',
    '"Track can keep their chart," she murmurs. "I found a better training table."',
  ] },
  { when: { archetype: 'athlete', corruption: [1] }, text: [
    '"So that is where I am," she says, and does not sound finished.',
    'She exhales. "Okay. Okay." Then she asks what is for dinner.',
  ] },
  { when: { archetype: 'athlete' }, text: [
    'On the way back she stops for food anyway.',
    '"I am still hungry," she admits, like that explains everything.',
    'She talks about pasta before she talks about the team.',
  ] },
  { when: { corruption: [2] }, text: [
    'She laughs once, surprised at her own calm. "Well. More room for me now."',
    '"Could be worse," she says. "Could be hungry."',
  ] },
  { when: {}, text: [
    'She handles the news with more calm than you expected.',
    'The number does not ruin her mood. A small surprise.',
    'She leaves lighter in spirit if not on the scale.',
    'She seems almost relieved to stop pretending.',
  ] },
]);

// ── weekly.teamWeighIn.afterLook — FULL SENTENCE: how she looks taking it
registerPool('weekly.teamWeighIn.afterLook', [
  { when: { studentId: 3 }, priority: 1, weight: 4, text: [
    'She does look fine — soft and full-cheeked and more relaxed than you have ever seen her.',
    'Soft and full-cheeked, she looks more at ease than competitive season ever allowed.',
  ] },
  { when: { endStageMin: 5, endStageMax: 7 }, text: [
    'She looks softer than her program photos, and considerably happier.',
    'Her face has rounded; her shoulders have dropped. She looks fed and unafraid.',
    'The gain shows in her cheeks and her calm. She does not seem inclined to fight it.',
  ] },
  { when: { endStageMin: 3, endStageMax: 4 }, text: [
    'She looks fuller than her roster photo and less tense than her split times ever suggested.',
    'There is new softness at her middle. She carries it without apology.',
  ] },
  { when: {}, text: [
    'She looks steadier than the number would suggest.',
    'Whatever the scale said, she looks comfortable in herself.',
    'She looks fed, warm, and unbothered.',
    'The weigh-in did not steal her appetite or her color.',
  ] },
]);

// ── weekly.team_weigh_in — skeleton
registerPool('weekly.team_weigh_in', [
  { when: {}, text: [
    '{weekly.teamWeighIn.dodge} {weekly.teamWeighIn.forced} {weekly.teamWeighIn.verdict} {weekly.teamWeighIn.professional|prefix: } {weekly.teamWeighIn.afterDialogue} {weekly.teamWeighIn.afterLook}',
    '{weekly.teamWeighIn.dodge} {weekly.teamWeighIn.forced} {weekly.teamWeighIn.verdict}{weekly.teamWeighIn.professional|prefix: } {weekly.teamWeighIn.afterDialogue}{weekly.teamWeighIn.afterLook|prefix: }',
  ] },
]);
