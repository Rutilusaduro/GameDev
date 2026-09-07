// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Eating scene core beat pools.
import { registerPool } from '../../engine.js';

// ── eat.settleIn — FULL SENTENCE ──────────────────────────────
registerPool('eat.settleIn', [
  { when: {}, text: [
    '{subject.name} takes her seat and orients toward the food without preamble.',
    'The meal begins the way most meals do — {subject.first} present, appetite accounted for.',
    '{subject.name} settles in, tray or plate arranged within reach.',
    'Food within reach, {subject.name} begins without ceremony.',
  ] },
  { when: { stageMin: 4 }, text: [
    '{subject.name} chooses the chair that has learned her and sits with the ease of practice.',
    'She claims a seat wide enough and pulls the tray closer — a small negotiation she has stopped noticing.',
    'Her hips clear the armrests; she has stopped performing the clearance check.',
  ] },
  { when: { stageMin: 7 }, text: [
    '{subject.name} takes the reinforced chair by reflex and lets the table accommodate her.',
    'Furniture has been evaluated; she sits where the geometry works.',
    'The table edge meets her sooner than it used to. She accommodates without comment.',
  ] },
  { when: { stageMin: 10 }, weight: 2, text: [
    'The meal comes to her — settled warmth, food within arm\'s reach of immobile mass.',
    '{subject.name} does not travel to the food anymore. The food travels to her.',
    'Meal service settles around her — trays within reach, warmth within reach.',
  ] },
  { when: { campusLocale: 'cafeteria' }, text: [
    'The cafeteria noise folds around her as she takes her place in line, then at a table.',
    'Tray balanced, {subject.name} finds her usual corner of the dining hall.',
    'Steam from the line meets her before she sits; appetite already awake.',
  ] },
  { when: { campusLocale: 'dorm_room' }, text: [
    'Takeout containers open on the dorm desk — private, unhurried, no audience required.',
    '{subject.name} arranges the spread within reach and closes the door on the hallway.',
    'The room holds delivery heat and the quiet promise of going back for seconds.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'There is too much food and not enough pretense — {subject.name} has arranged for both.',
    'The spread is deliberate. She has been thinking about this.',
    'Containers open like promises — too much food, exactly enough intention.',
  ] },
]);

// ── eat.firstBite — FULL SENTENCE ─────────────────────────────
registerPool('eat.firstBite', [
  { when: {}, text: [
    'She takes the first bite without ceremony.',
    'The first mouthful goes down easy — appetite still polite, not yet committed.',
    'She eats the way people eat when they are only starting to mean it.',
    'The opening bite is small. The intention is not.',
  ] },
  { when: { hungerTierMin: 2 }, weight: 2, text: [
    'The first bite lands like relief — she was hungrier than she admitted.',
    'She does not savor the opening bite. She needs it.',
    'The fork does not wait for permission once appetite takes over.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 3, text: [
    'The first bite is not a beginning. It is a correction.',
    'She eats the first mouthful like someone making up for lost time.',
    'She eats the first mouthful like someone plugging a leak.',
  ] },
  { when: { corruption: [0], stageMin: 2 }, text: [
    'She takes a careful first bite — measured, as if the calories might be watching.',
    'The first forkful goes down with the performance of someone still deciding.',
    'Warmth follows the first bite; she notices and keeps chewing.',
  ] },
  { when: { corruption: [0], stageMax: 3, gainStance: 'opposed' }, weight: 2, text: [
    'She eats the first bite like it counts against her.',
    'The opening mouthful is small — apology sized.',
    '"I shouldn\'t," she murmurs, and eats anyway.',
  ] },
  { when: { corruption: [0], stageMax: 3, gainStance: 'reluctant' }, weight: 2, text: [
    'The first bite lands; she pauses, surprised by how much she wanted it.',
    'She eats slowly, then faster once she stops performing restraint.',
    'Hunger wins the opening argument — softly, without spectacle.',
  ] },
  { when: { corruption: [0], stageMax: 3, gainStance: 'neutral' }, text: [
    'She eats the first bite the way anyone eats when they are hungry.',
    'Food, fork, mouth — no commentary required.',
    'Hunger answered; conversation can wait until later.',
  ] },
  { when: { corruption: [0], stageMax: 3, gainStance: 'secret' }, weight: 2, text: [
    'The first bite goes down with quiet focus — appetite unmasked.',
    'She leans into the food before she remembers to look casual.',
    'Her eyes close on the first mouthful. She blames how good it smells.',
  ] },
  { when: { corruption: [1] }, text: [
    'She starts eating without the old argument — not eager, not resisting, simply continuing.',
    'The first bite is unremarkable. That is new, and she notices.',
    'Appetite arrives without the old guilt attached.',
  ] },
  { when: { corruption: [2] }, text: [
    'She begins with the confidence of someone who knows how this ends.',
    'The first bite is an opening move. There will be more. She intends there to be more.',
    'The first bite is appetite unmasked — no performance left.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She leans forward to meet the food — belly clearing the table edge by habit now.',
    'The first bite requires a small repositioning. She has learned the geometry.',
    'Her belly meets the table before the fork does. She adjusts and eats.',
  ] },
]);

// ── eat.midMeal — FULL SENTENCE (optional) ────────────────────
registerPool('eat.midMeal', [
  { when: {}, text: [
    '',
    'The middle of the meal finds a steady rhythm.',
    'Warmth spreads low while she eats; she shifts and continues.',
    'Halfway through, appetite stops performing small.',
  ] },
  { when: { stageMin: 0, stageMax: 2 }, text: [
    'The meal settles into an easy middle — fork moving, conversation optional.',
    'She eats through the center of the plate without commentary.',
    'Mid-meal fullness is still a novelty; she notices it and keeps going.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, text: [
    'Her belly meets the table edge mid-meal; she adjusts and does not slow down.',
    'The middle stretch is where appetite stops asking permission.',
    'Fullness arrives early; the fork keeps moving anyway.',
  ] },
  { when: { hungerTierMin: 2 }, text: [
    'Halfway through, the pace does not slow — if anything it steadies into purpose.',
    'The middle of the meal finds her committed, fork moving with quiet efficiency.',
    'She eats through the middle stretch like someone who stopped pretending restraint.',
    'The plate thins; her appetite does not.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 4 }, text: [
    'Mid-meal guilt flickers and loses. The fork keeps moving.',
    'She slows once, hand on her middle, then takes another bite without commentary.',
    'Warmth spreads low while she eats — she shifts, breathes, continues.',
  ] },
  { when: { corruption: [2], fullnessMin: 0.5 }, text: [
    'She pauses only to breathe around fullness, then continues — appetite undiminished.',
    'The middle stretch is where appetite stops asking permission.',
    'Fullness arrives; she welcomes it and keeps eating.',
    'Her belly swells visibly mid-meal; she shifts and continues without apology.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'Course gives way to course; she does not pretend this is a single serving anymore.',
    'The middle of the binge is where intention becomes fact.',
    'The binge finds its rhythm mid-meal — hunger, fullness, hunger again.',
  ] },
]);

// ── eat.bitePace — ADVERBIAL ──────────────────────────────────
registerPool('eat.bitePace', [
  { when: {}, text: ['', 'steadily', 'without hurry', 'with polite restraint'] },
  { when: { hungerTierMin: 2 }, text: ['with growing urgency', 'a little faster than polite', 'like someone catching up'] },
  { when: { hungerTierMin: 3 }, weight: 2, text: ['quickly', 'with single-minded focus', 'without pausing for manners'] },
  { when: { corruption: [0] }, text: ['carefully', 'as if each bite requires justification', 'with small guilty pauses that never last'] },
  { when: { corruption: [2] }, text: ['with open appetite', 'like someone who has stopped pretending', 'like the meal was always hers to finish'] },
]);

// ── eat.pacing — FULL SENTENCE fragment (optional) ──────────────
registerPool('eat.pacing', [
  { when: {}, text: [
    '',
    'She eats {eat.bitePace} — the plate thinning steadily.',
    'The meal proceeds without hurry and without apology.',
    'Conversation loses to the fork halfway through.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She eats {eat.bitePace} — the plate emptying faster than conversation could keep up.',
    'The fork keeps moving; conversation loses priority.',
    'Hunger outpaces talk; the meal proceeds without commentary.',
  ] },
  { when: { stageMin: 7, fullnessMin: 0.6 }, text: [
    'Each bite requires a small breath around fullness; she takes the breath and continues.',
    'Fullness presses; appetite negotiates a truce and keeps eating.',
    'She eats through fullness the way she has learned — breathe, shift, continue.',
  ] },
]);

// ── eat.portionObs — PARTICIPLE CLAUSE ──────────────────────────
registerPool('eat.portionObs', [
  { when: {}, text: ['', '', 'portions disappearing with quiet efficiency', 'the plate thinning steadily'] },
  { when: { stageMin: 0, stageMax: 4 }, text: [
    'the plate thinning despite fullness already present',
    'small portions disappearing with quiet efficiency',
    'early hunger making the serving look modest — briefly',
  ] },
  { when: { fullnessMin: 0.5 }, text: [
    'the plate thinning despite fullness already present',
    'servings vanishing at a pace that outruns comfort',
    'portions disappearing while fullness already announces itself',
  ] },
  { when: { stageMin: 5 }, text: [
    'portions sized for someone smaller disappearing all the same',
    'the quantity not matching the body it is feeding — and neither of them commenting',
    'portions sized for ceremony disappearing into earnest hunger',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'quantities that would feed a table going to one person by design',
    'the spread yielding faster than apology could keep up',
    'servings stacked like intent, then demolished like appetite',
  ] },
]);

// ── eat.hungerClause — FULL SENTENCE (optional lead) ───────────
registerPool('eat.hungerClause', [
  { when: {}, text: [
    '',
    'Appetite arrived before she sat down.',
    'She was hungrier than she meant to admit.',
    'The meal is overdue; her stomach made that clear.',
  ] },
  { when: { stageMin: 0, stageMax: 2 }, text: [
    'Campus hunger is ordinary until the tray arrives — then it sharpens.',
    'She did not think she was that hungry until food was in reach.',
    'A normal appetite, she tells herself. The fork disagrees.',
  ] },
  { when: { hungerTierMin: 2 }, text: [
    'She was hungry before she sat down — the meal is overdue.',
    'Appetite arrived ahead of her; the food is catching up.',
    'Her stomach has been ahead of her all afternoon.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'Hunger has been driving for an hour. The food is finally in range.',
    'She needs this — not wants, needs — and the distinction has stopped mattering.',
    'Hunger sharpened everything; food is the first dull edge.',
  ] },
  { when: { inWithdrawal: true }, weight: 3, text: [
    'Withdrawal sits under the hunger like static. Food is the only clear signal.',
    'Her hands are not quite steady until the first bite lands.',
    'The craving is specific — food, now, before thought returns.',
  ] },
  { when: { addictionLevelMin: 3 }, weight: 2, text: [
    'This is not optional in any sense she still respects.',
    'The arrangement is understood: she eats, and the rest follows.',
    'She eats because the arrangement demands continuity.',
  ] },
]);

// ── eat.bodyResponse — PARTICIPLE CLAUSE ────────────────────────
registerPool('eat.bodyResponse', [
  { when: {}, text: [
    '',
    'warmth gathering low with each bite',
    'her middle softening under the shirt',
    'fullness announcing itself between courses',
  ] },
  { when: { stageMin: 0, stageMax: 2 }, text: [
    'a faint warmth low on her torso after the first few bites',
    'waistband sitting a little tighter by mid-meal',
    'subtle rounding that only she notices — for now',
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'her middle softening visibly with each course',
    'waistband working harder as the meal progresses',
    'a gentle rounding becoming harder to ignore',
    'her shirt skimming a belly that grows warmer with every bite',
    'thighs spreading wider in the chair as fullness accumulates',
  ] },
  { when: { stageMin: 6, stageMax: 8 }, text: [
    'her belly rising and settling with each swallowed bite',
    'fullness visible in the forward sway of her middle',
    'soft flesh shifting as capacity fills',
  ] },
  { when: { stageMin: 9 }, text: [
    'weight settling deeper with every course',
    'warm mass rearranging around new fullness',
    'the body receiving food the way geography receives rain',
  ] },
  { when: { bodyType: 'apple', stageMin: 4 }, text: [
    'her belly leading the expansion, round and forward',
    'her middle rounding ahead of the rest of her',
    'soft weight gathering under her shirt with each course',
  ] },
  { when: { bodyType: 'pear', stageMin: 4 }, text: [
    'hips and thighs taking their share of the surplus',
    'lower curves deepening as the meal progresses',
    'thighs pressing wider in the chair, warmth pooling low',
  ] },
  { when: { fullnessMin: 0.8 }, text: [
    'breathing around fullness that has become the primary fact',
    'each bite adding to a drum-tight middle',
    'each swallow tightening the drum of her middle',
  ] },
]);

// ── eat.soundTex — PARTICIPLE CLAUSE ────────────────────────────
registerPool('eat.soundTex', [
  { when: {}, text: [
    '',
    'fork and plate keeping quiet company',
    'the small sounds of steady eating',
    'utensils moving with unhurried purpose',
  ] },
  { when: { stageMin: 0, stageMax: 4 }, text: [
    'silverware on ceramic, unhurried',
    'the soft scrape of a fork finding more',
    'chewing sounds she does not bother to hide',
  ] },
  { when: { hungerTierMin: 2 }, text: [
    'fork moving faster than conversation',
    'the small sounds of urgent eating',
    'plates scraping closer without being asked',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'the small sounds of urgent eating',
    'plates scraping closer without being asked',
    'utensils moving with single-minded rhythm',
  ] },
  { when: { stageMin: 6 }, text: [
    'chair protesting softly under shifting weight',
    'the table accepting more than it was designed for',
    'soft creak of furniture learning her appetite',
  ] },
]);

// ── eat.finish — FULL SENTENCE ──────────────────────────────────
registerPool('eat.finish', [
  { when: {}, text: [
    'She finishes what she started.',
    'The plate empties. She sets the fork down with finality.',
    'The last bite goes down; the meal is complete.',
    'Empty plate, appetite acknowledged. She is done for now.',
  ] },
  { when: { corruption: [0], fullnessMin: 0.7 }, text: [
    'She stops before the plate is clean — then goes back for one more bite anyway.',
    'She finishes and immediately wonders if she should have stopped earlier.',
    'The last bite wins the argument she was having with herself.',
  ] },
  { when: { corruption: [1] }, text: [
    'She finishes without the old negotiation. That is its own kind of news.',
    'The plate is empty. She notices and does not apologize.',
    'Empty dish, quiet acceptance — the meal filed without protest.',
  ] },
  { when: { corruption: [2] }, text: [
    'She finishes everything within reach and looks for what comes next.',
    'The plate is a formality by the end — she was always going to finish.',
    'She licks the last of it from her fingers without performance.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She finishes and is already thinking about what comes after.',
    'Empty plate, appetite not quite answered — but closer.',
    'The meal ends; hunger softens without fully leaving.',
  ] },
  { when: { mealContext: 'binge' }, weight: 2, text: [
    'The binge ends when the food does — not when appetite does.',
    'She finishes the spread because that was the point.',
    'Plates cleared, intention honored — she sits back into the warmth of it.',
  ] },
]);

// ── eat.aftermath — FULL SENTENCE ───────────────────────────────
registerPool('eat.aftermath', [
  { when: {}, text: [
    'She sits back, satisfied in the ordinary way.',
    'Fullness settles; the meal becomes memory.',
    'A quiet aftermath — appetite answered, body warm.',
    'She exhales; the meal loosens its grip and warmth spreads low.',
    'Her hand drifts to her middle without thinking — a new habit, soft and automatic.',
    'Fullness pools low and warm; she shifts once and lets it stay.',
  ] },
  { when: { fullnessMin: 0.7 }, text: [
    'She sits back heavily, hand finding her middle without being told.',
    'Fullness has become the room\'s second occupant.',
    'She breathes around fullness and looks pleased despite herself.',
    'Her belly presses forward, drum-tight and warm; she pats it once, absently.',
    'She loosens something at her waist and sighs like a woman who ate well.',
  ] },
  { when: { corruption: [2], fullnessMin: 0.6 }, text: [
    'She pats her middle once, affectionately. The meal was a success.',
    'Satisfied in the specific way of someone who intended to end up this full.',
    'She smiles at her own fullness — pleased, proprietary.',
  ] },
  { when: { stageMin: 6, fullnessMin: 0.7 }, text: [
    'Her belly rests forward, heavy and warm — the meal visible in her posture.',
    'She shifts in the chair and the chair remembers.',
    'The chair remembers her; she remembers the meal.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Fullness joins the softness already present — another layer of warmth.',
    'The meal settles into mass that was already vast.',
    'New warmth layers onto old mass — another course accepted.',
  ] },
  { when: { hungerTierMin: 3, fullnessMin: 0.5 }, text: [
    'Still hungry, technically — but the edge is gone. She can think again.',
    'Appetite quieted, not silenced. She will eat again soon.',
    'Hunger dulled enough to think; appetite still patient nearby.',
  ] },
]);
