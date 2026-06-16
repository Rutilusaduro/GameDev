// The Squad — Lead: A6 Slender | Support: A2 Psych, A5 Editor
// Early-game body change, reluctance, neutrality, and secret appetite.
import { registerPool } from '../../engine.js';

// ── slender.bodyNotice — PARTICIPLE CLAUSE ─────────────────────
// First visible changes: stages 0–3, still-thin bodies beginning to soften.
registerPool('slender.bodyNotice', [
  { when: {}, text: ['', '', 'still slender in the doorway'] },
  { when: { stageMax: 1 }, text: [
    'still mostly the girl she was at move-in',
    'clothes fitting the way they always have',
    'no obvious change yet — only a softness at the edges if you look',
  ] },
  { when: { stageMin: 2, stageMax: 3 }, text: [
    'a new softness at the waist when she breathes',
    'fabric sitting differently across her hips',
    'the faintest rounding where there was flat before',
    'her walk carrying a little more sway than last month',
  ] },
  { when: { bodyType: 'pear', stageMin: 2, stageMax: 3 }, text: [
    'her hips beginning to assert themselves in every step',
    'thighs touching at the top when she stands still',
    'lower curves arriving before she has language for them',
  ] },
  { when: { bodyType: 'apple', stageMin: 2, stageMax: 3 }, text: [
    'a gentle dome forming under her shirt',
    'her hand drifting to her middle without thinking',
    'waistband sitting lower than it used to',
  ] },
  { when: { bodyType: 'athletic', stageMin: 2, stageMax: 3 }, text: [
    'trained lines softening at the edges',
    'muscle giving way to plush at the thigh and hip',
    'her stride a little heavier than her old self',
  ] },
  { when: { bodyType: 'straight', stageMin: 2, stageMax: 3 }, text: [
    'even padding settling at cheek and hip alike',
    'her silhouette a fraction rounder everywhere at once',
    'clothes pulling gently across her back when she turns',
  ] },
  { when: { isGaining: true, stageMax: 3 }, weight: 2, text: [
    'this week\'s softness more legible than last week\'s',
    'the change small enough to deny, present enough to feel',
  ] },
]);

// ── slender.bodyFeel — FULL SENTENCE ───────────────────────────
// Sensation of early change on a still-small body.
registerPool('slender.bodyFeel', [
  { when: {}, text: [
    'Her body feels familiar — the same limbs, the same mirror — with something new tucked under the surface.',
    'She is aware of herself in a way she was not at the start of the semester.',
    'Warmth gathers low on her torso when she sits; she notices, then tries not to.',
  ] },
  { when: { stageMax: 1 }, text: [
    'She still feels light on her feet. The number is creeping anyway.',
    'Nothing dramatic yet — only the occasional brush of thigh against thigh.',
    'Her clothes still fit. They fit differently. She has not decided if that matters.',
  ] },
  { when: { stageMin: 2, stageMax: 3 }, text: [
    'Softness has started to answer when she presses her palm to her hip.',
    'Her waistband leaves a faint line now; she smooths it flat without looking down.',
    'She feels heavier in specific places — not everywhere, not yet, but enough to register.',
    'There is a new give beneath her ribs when she exhales after a meal.',
  ] },
  { when: { gainStance: 'opposed', stageMax: 4 }, weight: 2, text: [
    'The softness feels like trespassing — hers, but not invited.',
    'She catches herself pinching fabric away from her middle and hates that she noticed.',
    'Her body is doing something without permission. She is still arguing about it.',
  ] },
  { when: { gainStance: 'reluctant', stageMax: 4 }, weight: 2, text: [
    'The warmth low in her belly after eating lingers longer than it should.',
    'She tells herself she does not like the heaviness — then sits with it a moment anyway.',
    'Her thighs brush when she walks. The sensation is inconvenient. It is not entirely unwelcome.',
  ] },
  { when: { gainStance: 'secret', stageMax: 4 }, weight: 2, text: [
    'She feels the swell after a meal and pretends not to savor it.',
    'There is a private pleasure in how her waistband resists — she files it somewhere no one checks.',
    'Her body is rounding in small, definite ways. Part of her is keeping score.',
  ] },
  { when: { gainStance: 'neutral', stageMax: 4 }, text: [
    'The changes are minor enough to live with. She has other things to think about.',
    'She registers the softness the way she registers weather — noted, not dwelled on.',
    'Her body is a little fuller. She shrugs. Life continues.',
  ] },
]);

// ── slender.mindFeel — FULL SENTENCE ───────────────────────────
// Interior emotional texture at corruption 0.
registerPool('slender.mindFeel', [
  { when: {}, text: [
    'She is still deciding what this means — if it means anything yet.',
    'The story she tells herself has not caught up to the mirror.',
    'She holds the feeling at arm\'s length until she knows what to call it.',
  ] },
  { when: { gainStance: 'opposed' }, weight: 2, text: [
    'This is not what she planned. She rehearses the reasons it will reverse.',
    'Shame arrives before the number does — a hot, familiar flush she refuses to show.',
    'She wants to be the girl who still fits her old jeans. That girl is leaving.',
    'Every pound feels like evidence she will have to explain away.',
  ] },
  { when: { gainStance: 'reluctant' }, weight: 2, text: [
    'She is not ready to call it wanting. She is no longer sure it is only dread.',
    'The protest in her head has gone quieter. She has not decided if that is relief.',
    'She still says no out loud. Her body keeps a different calendar.',
    'Curiosity sits under the denial like warmth under skin — hard to locate, harder to ignore.',
  ] },
  { when: { gainStance: 'neutral' }, weight: 2, text: [
    'She is not fighting it. She is not cheering it. She is simply here, week after week.',
    'The number is a fact. She files it and moves on to lunch.',
    'Gaining is happening. She has not made it a personality yet.',
    'She treats the scale like a syllabus item — show up, note the result, leave.',
  ] },
  { when: { gainStance: 'secret' }, weight: 2, text: [
    'She will not admit how carefully she checks the curve in shop windows.',
    'The pleasure is private — a small, guilty warmth when fabric strains.',
    'She tells herself she is only being honest about appetite. Honesty has a hungry edge.',
    'No one knows she weighs herself at home too. No one knows she is not always upset.',
  ] },
  { when: { corruption: [0], isGaining: true }, text: [
    'This week\'s gain lands on top of last week\'s — a stack she is still pretending is temporary.',
    'The trend is visible now if you know her. She knows her.',
  ] },
]);

// ── slender.deflect — DIALOGUE BEAT ────────────────────────────
// Opposed / reluctant verbal armor — corruption 0, early stages.
registerPool('slender.deflect', [
  { when: {}, text: ['', '', '', ''] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    `"It's temporary," she says, too quickly.`,
    `"I've been stressed. That's all."`,
    `"Don't read into it."`,
    `"I start Monday. I mean it this time."`,
    `"It's the dining hall. Everyone gains freshman year."`,
  ] },
  { when: { gainStance: 'reluctant' }, weight: 2, text: [
    `"It's not that bad," she says, and does not sound convinced.`,
    `"I should probably slow down." She does not move away from the food.`,
    `"I'm fine. I'm… fine." The pause costs her.`,
    `"It's only a few pounds." She says it like a dare.`,
  ] },
  { when: { gainStance: 'opposed', isGaining: true }, weight: 2, text: [
    `"That can't be right."`,
    `"The scale is wrong. It has to be."`,
    `"I barely ate this week." She did.`,
    `"It's water. It's always water."`,
  ] },
]);

// ── slender.neutral — DIALOGUE BEAT ──────────────────────────────
// Genuinely unfussed — not opposed, not eager.
registerPool('slender.neutral', [
  { when: {}, text: ['', '', '', ''] },
  { when: { gainStance: 'neutral' }, weight: 3, text: [
    `"Okay," she says. "What's next?"`,
    `"Numbers," she says, and shrugs.`,
    `"Sure. That tracks."`,
    `"Noted." She is already thinking about her afternoon.`,
    `"Fine by me."`,
  ] },
  { when: { gainStance: 'neutral', stageMax: 2 }, text: [
    `"Still me," she says, lightly.`,
    `"Could be worse."`,
  ] },
]);

// ── slender.secret — FULL SENTENCE ─────────────────────────────
// Body contradicts stated resistance — hidden appetite, corruption 0.
registerPool('slender.secret', [
  { when: {}, text: ['', '', '', ''] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'Her breath catches on the number — not with dismay. She looks away too slowly.',
    'She smooths her top over a middle that has grown since last week and does not pull her hand back.',
    'Color rises in her cheeks. She blames the heat in the room.',
    'She says nothing. Her tongue touches her lip. She is already thinking about dinner.',
    'Her thighs press together when she steps off the scale — a small, involuntary pleasure.',
  ] },
  { when: { gainStance: 'secret', hungerTierMin: 2 }, weight: 2, text: [
    'Hunger has been louder than shame all week. She stopped pretending otherwise somewhere around Wednesday.',
    'She checks whether you have snacks before she checks whether you noticed the gain.',
  ] },
  { when: { gainStance: 'secret', isGaining: true }, text: [
    'She files the gain under things she will not discuss out loud — and under things she will remember.',
    'The upward tick satisfies something she will not name. Her face stays carefully neutral.',
  ] },
]);

// ── slender.mirror — FULL SENTENCE (optional) ──────────────────
registerPool('slender.mirror', [
  { when: {}, text: ['', '', '', ''] },
  { when: { stageMin: 2, stageMax: 4, corruption: [0] }, text: [
    'She catches her reflection and pauses a beat longer than necessary.',
    'The mirror shows someone softer at the edges. She is still learning that face.',
    'She turns sideways without meaning to — checking, comparing, not quite admitting it.',
  ] },
  { when: { gainStance: 'opposed', stageMin: 2, stageMax: 4 }, weight: 2, text: [
    'She avoids the mirror on the way out. She saw enough.',
    'The reflection does not match the story she is telling. She chooses the story. For now.',
  ] },
  { when: { gainStance: 'secret', stageMin: 2, stageMax: 4 }, weight: 2, text: [
    'She lingers at the mirror when she thinks no one is watching.',
    'Her hand rests on her hip. She does not scold herself for it.',
  ] },
]);

// ── slender.eatPause — FULL SENTENCE ─────────────────────────────
// Early eating beats — reluctant/neutral/secret at the table.
registerPool('slender.eatPause', [
  { when: {}, text: ['', '', '', ''] },
  { when: { corruption: [0], stageMax: 3 }, text: [
    'She eats like someone still negotiating portion size with herself.',
    'Each bite is measured — performance, not yet appetite.',
    'The plate empties anyway. She notices that before she comments on it.',
  ] },
  { when: { gainStance: 'opposed', stageMax: 3 }, weight: 2, text: [
    'She eats slowly, as if speed would count against her.',
    'She stops once, fork hovering — then continues. The argument is internal.',
    '"I shouldn\'t," she says, and takes another bite.',
  ] },
  { when: { gainStance: 'neutral', stageMax: 3 }, text: [
    'She eats without commentary. The food is food.',
    'Hunger is hunger. She answers it and moves on.',
  ] },
  { when: { gainStance: 'secret', stageMax: 3 }, weight: 2, text: [
    'She eats with quiet focus — not rushing, not stopping.',
    'Her cheeks flush as she leans into the second helping. She blames the sauce.',
    'She says she is not hungry. The fork disagrees.',
  ] },
  { when: { hungerTierMin: 2, corruption: [0], stageMax: 4 }, weight: 2, text: [
    'Politeness loses to appetite halfway through the meal.',
    'She eats faster once she stops performing restraint.',
  ] },
]);
