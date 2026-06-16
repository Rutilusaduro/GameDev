// Eating scene core beat pools.
import { registerPool } from '../../engine.js';

// ── eat.settleIn — FULL SENTENCE ──────────────────────────────
registerPool('eat.settleIn', [
  { when: {}, text: [
    '{subject.name} takes her seat and orients toward the food without preamble.',
    'The meal begins the way most meals do — {subject.first} present, appetite accounted for.',
    '{subject.name} settles in, tray or plate arranged within reach.',
  ] },
  { when: { stageMin: 4 }, text: [
    '{subject.name} chooses the chair that has learned her and sits with the ease of practice.',
    'She claims a seat wide enough and pulls the tray closer — a small negotiation she has stopped noticing.',
  ] },
  { when: { stageMin: 7 }, text: [
    '{subject.name} takes the reinforced chair by reflex and lets the table accommodate her.',
    'Furniture has been evaluated; she sits where the geometry works.',
  ] },
  { when: { stageMin: 10 }, weight: 2, text: [
    'The meal comes to her — settled warmth, food within arm\'s reach of immobile abundance.',
    '{subject.name} does not travel to the food anymore. The food travels to her.',
  ] },
  { when: { campusLocale: 'cafeteria' }, text: [
    'The cafeteria noise folds around her as she takes her place in line, then at a table.',
    'Tray balanced, {subject.name} finds her usual corner of the dining hall.',
  ] },
  { when: { campusLocale: 'dorm_room' }, text: [
    'Takeout containers open on the dorm desk — private, unhurried, no audience required.',
    '{subject.name} arranges the spread within reach and closes the door on the hallway.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'There is too much food and not enough pretense — {subject.name} has arranged for both.',
    'The spread is deliberate. She has been thinking about this.',
  ] },
]);

// ── eat.firstBite — FULL SENTENCE ─────────────────────────────
registerPool('eat.firstBite', [
  { when: {}, text: [
    'She takes the first bite without ceremony.',
    'The first mouthful goes down easy — appetite still polite, not yet committed.',
    'She eats the way people eat when they are only starting to mean it.',
  ] },
  { when: { hungerTierMin: 2 }, weight: 2, text: [
    'The first bite lands like relief — she was hungrier than she admitted.',
    'She does not savor the opening bite. She needs it.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 3, text: [
    'The first bite is not a beginning. It is a correction.',
    'She eats the first mouthful like someone making up for lost time.',
  ] },
  { when: { corruption: [0], stageMin: 2 }, text: [
    'She takes a careful first bite — measured, as if the calories might be watching.',
    'The first forkful goes down with the performance of someone still deciding.',
  ] },
  { when: { corruption: [1] }, text: [
    'She starts eating without the old argument — not eager, not resisting, simply continuing.',
    'The first bite is unremarkable. That is new, and she notices.',
  ] },
  { when: { corruption: [2] }, text: [
    'She begins with the confidence of someone who knows how this ends.',
    'The first bite is an opening move. There will be more. She intends there to be more.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She leans forward to meet the food — belly clearing the table edge by habit now.',
    'The first bite requires a small repositioning. She has learned the geometry.',
  ] },
]);

// ── eat.midMeal — FULL SENTENCE (optional) ────────────────────
registerPool('eat.midMeal', [
  { when: {}, text: ['', '', ''] },
  { when: { hungerTierMin: 2 }, text: [
    'Halfway through, the pace does not slow — if anything it steadies into purpose.',
    'The middle of the meal finds her committed, fork moving with quiet efficiency.',
  ] },
  { when: { corruption: [2], fullnessMin: 0.5 }, text: [
    'She pauses only to breathe around fullness, then continues — appetite undiminished.',
    'The middle stretch is where appetite stops asking permission.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'Course gives way to course; she does not pretend this is a single serving anymore.',
    'The middle of the binge is where intention becomes fact.',
  ] },
]);

// ── eat.bitePace — ADVERBIAL ──────────────────────────────────
registerPool('eat.bitePace', [
  { when: {}, text: ['', 'steadily', 'without hurry'] },
  { when: { hungerTierMin: 2 }, text: ['with growing urgency', 'a little faster than polite'] },
  { when: { hungerTierMin: 3 }, weight: 2, text: ['quickly', 'with single-minded focus'] },
  { when: { corruption: [0] }, text: ['carefully', 'as if each bite requires justification'] },
  { when: { corruption: [2] }, text: ['with open appetite', 'like someone who has stopped pretending'] },
]);

// ── eat.pacing — FULL SENTENCE fragment (optional) ──────────────
registerPool('eat.pacing', [
  { when: {}, text: ['', '', ''] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She eats {eat.bitePace} — the plate emptying faster than conversation could keep up.',
  ] },
  { when: { stageMin: 7, fullnessMin: 0.6 }, text: [
    'Each bite requires a small breath around fullness; she takes the breath and continues.',
  ] },
]);

// ── eat.portionObs — PARTICIPLE CLAUSE ──────────────────────────
registerPool('eat.portionObs', [
  { when: {}, text: ['', 'portions disappearing with quiet efficiency'] },
  { when: { fullnessMin: 0.5 }, text: [
    'the plate thinning despite fullness already present',
    'servings vanishing at a pace that outruns comfort',
  ] },
  { when: { stageMin: 5 }, text: [
    'portions sized for someone smaller disappearing all the same',
    'the quantity not matching the body it is feeding — and neither of them commenting',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'quantities that would feed a table going to one person by design',
    'the spread yielding faster than apology could keep up',
  ] },
]);

// ── eat.hungerClause — FULL SENTENCE (optional lead) ───────────
registerPool('eat.hungerClause', [
  { when: {}, text: ['', ''] },
  { when: { hungerTierMin: 2 }, text: [
    'She was hungry before she sat down — the meal is overdue.',
    'Appetite arrived ahead of her; the food is catching up.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'Hunger has been driving for an hour. The food is finally in range.',
    'She needs this — not wants, needs — and the distinction has stopped mattering.',
  ] },
  { when: { inWithdrawal: true }, weight: 3, text: [
    'Withdrawal sits under the hunger like static. Food is the only clear signal.',
    'Her hands are not quite steady until the first bite lands.',
  ] },
  { when: { addictionLevelMin: 3 }, weight: 2, text: [
    'This is not optional in any sense she still respects.',
    'The arrangement is understood: she eats, and the rest follows.',
  ] },
]);

// ── eat.bodyResponse — PARTICIPLE CLAUSE ────────────────────────
registerPool('eat.bodyResponse', [
  { when: {}, text: ['', ''] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'her middle softening visibly with each course',
    'waistband working harder as the meal progresses',
    'a gentle rounding becoming harder to ignore',
  ] },
  { when: { stageMin: 6, stageMax: 8 }, text: [
    'her belly rising and settling with each swallowed bite',
    'fullness visible in the forward sway of her middle',
    'soft flesh shifting as capacity fills',
  ] },
  { when: { stageMin: 9 }, text: [
    'abundance settling deeper with every course',
    'warm mass rearranging around new fullness',
    'the body receiving food the way geography receives rain',
  ] },
  { when: { bodyType: 'apple', stageMin: 4 }, text: ['her belly leading the expansion, round and forward'] },
  { when: { bodyType: 'pear', stageMin: 4 }, text: ['hips and thighs taking their share of the surplus'] },
  { when: { fullnessMin: 0.8 }, text: [
    'breathing around fullness that has become the primary fact',
    'each bite adding to a drum-tight middle',
  ] },
]);

// ── eat.soundTex — PARTICIPLE CLAUSE ────────────────────────────
registerPool('eat.soundTex', [
  { when: {}, text: ['', ''] },
  { when: { hungerTierMin: 2 }, text: ['fork moving faster than conversation'] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'the small sounds of urgent eating',
    'plates scraping closer without being asked',
  ] },
  { when: { stageMin: 6 }, text: [
    'chair protesting softly under shifting weight',
    'the table accepting more than it was designed for',
  ] },
]);

// ── eat.finish — FULL SENTENCE ──────────────────────────────────
registerPool('eat.finish', [
  { when: {}, text: [
    'She finishes what she started.',
    'The plate empties. She sets the fork down with finality.',
    'The last bite goes down; the meal is complete.',
  ] },
  { when: { corruption: [0], fullnessMin: 0.7 }, text: [
    'She stops before the plate is clean — then goes back for one more bite anyway.',
    'She finishes and immediately wonders if she should have stopped earlier.',
  ] },
  { when: { corruption: [1] }, text: [
    'She finishes without the old negotiation. That is its own kind of news.',
    'The plate is empty. She notices and does not apologize.',
  ] },
  { when: { corruption: [2] }, text: [
    'She finishes everything within reach and looks for what comes next.',
    'The plate is a formality by the end — she was always going to finish.',
    'She licks the last of it from her fingers without performance.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She finishes and is already thinking about what comes after.',
    'Empty plate, appetite not quite answered — but closer.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'The binge ends when the food does — not when appetite does.',
    'She finishes the spread because that was the point.',
  ] },
]);

// ── eat.aftermath — FULL SENTENCE ───────────────────────────────
registerPool('eat.aftermath', [
  { when: {}, text: [
    'She sits back, satisfied in the ordinary way.',
    'Fullness settles; the meal becomes memory.',
    'A quiet aftermath — appetite answered, body warm.',
  ] },
  { when: { fullnessMin: 0.7 }, text: [
    'She sits back heavily, hand finding her middle without being told.',
    'Fullness has become the room\'s second occupant.',
    'She breathes around fullness and looks pleased despite herself.',
  ] },
  { when: { corruption: [2], fullnessMin: 0.6 }, text: [
    'She pats her middle once, affectionately. The meal was a success.',
    'Satisfied in the specific way of someone who intended to end up this full.',
  ] },
  { when: { stageMin: 6, fullnessMin: 0.7 }, text: [
    'Her belly rests forward, heavy and warm — the meal visible in her posture.',
    'She shifts in the chair and the chair remembers.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Fullness joins the abundance already present — another layer of warmth.',
    'The meal settles into mass that was already vast.',
  ] },
  { when: { hungerTierMin: 3, fullnessMin: 0.5 }, text: [
    'Still hungry, technically — but the edge is gone. She can think again.',
    'Appetite quieted, not silenced. She will eat again soon.',
  ] },
]);
