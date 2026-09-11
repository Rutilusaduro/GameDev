// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Slot-composed contest + sumo beats. Renderers prefer these over monoliths.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('contestAction', (ctx) => ctx.globals?.contestAction ?? '');
registerDimension('contestFood', (ctx) => ctx.globals?.contestFood ?? '');
registerDimension('sumoBucket', (ctx) => ctx.globals?.sumoBucket ?? 'clash');

registerPool('contest.food.scene', [
  { when: {}, text: [
    '{contest.food.setup} {contest.food.body}\n\n{contest.food.event}',
    '{contest.food.setup}\n\n{contest.food.body} {contest.food.event}',
    '{contest.food.body} {contest.food.setup}\n\n{contest.food.event}',
  ]},
]);

registerPool('contest.food.setup', [
  { when: {}, text: [
    'The plate is in front of you. Maya is across. The crowd has already decided this is about mass.',
    'Judges, lights, a table that knows what it is for. You pick the next thing and begin.',
    'Your lane is food. Hers is food. The difference is how much of you the chair already holds.',
  ]},
  { when: { contestFood: 'hotdogs' }, weight: 4, text: [
    'Hot dogs, warmup food, already warm. You treat them like crackers.',
    'Salt and bun. The crowd is still sitting down. You are already moving.',
  ]},
  { when: { contestFood: 'wings' }, weight: 4, text: [
    'Wings, messy and fast. Sauce on the wrist. Bones stacking.',
    'You pull meat without slowing. Maya is a sound to your left.',
  ]},
  { when: { contestFood: 'pizza' }, weight: 4, text: [
    'Pizza, fold, swallow. The slice is a unit you have already counted.',
    'Cheese stretch, then gone. The next slice is already a decision.',
  ]},
  { when: { contestFood: 'cake' }, weight: 4, text: [
    'Cake as strategy, not dessert. Frosting first if you want the sugar hit.',
    'Sweet, dense, official. You eat it like the clock is the only critic.',
  ]},
  { when: { contestFood: 'burger' }, weight: 4, text: [
    'Burger, dense, a real landing. You feel the weight settle and keep going.',
    'One burger is a unit. You finish it and the next item is already a decision.',
  ]},
  { when: { contestFood: 'pie' }, weight: 4, text: [
    'Pie, warm crust, filling that means it. Your middle takes the receipt.',
    'Slice, then another. The crust is a method. You stay in the method.',
  ]},
  { when: { contestFood: 'nachos' }, weight: 4, text: [
    'Nachos, salt, cheese pull. Fast food for a body that already knows the pace.',
    'Chips disappear in stacks. You do not perform it. You make them gone.',
  ]},
  { when: { contestFood: 'icecream' }, weight: 4, text: [
    'Ice cream, cold against the heat of everything else. You eat it like punctuation.',
    'Sweet, easy, official. The bowl is a pause that still counts as mass.',
  ]},
]);

registerPool('contest.food.body', [
  { when: {}, text: [
    '{word.size} of you takes the chair and the table both. Soft mass working.',
    'You feel the bite land. Warmth. The extra of you arriving on purpose.',
    'Belly to the table edge. You make room by taking more of the seat.',
  ]},
  { when: { stageMax: 4 }, weight: 2, text: [
    'A little of you yet. The bib is already telling. You keep eating.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'There is a lot of you to feed. The plate looks small against the work.',
  ]},
  { when: { contestStage: [4, 5] }, weight: 3, text: [
    'At this size the table is furniture you occupy. The food is weather. You take it in.',
  ]},
]);

registerPool('contest.food.event', [
  { when: {}, text: [
    'Maya does not look over. You do not need her to. The judges write anyway.',
    'The plate goes. You reach again. The crowd finds a sound and uses it.',
    'You finish the unit and sit back a half inch. The next unit is already yours.',
  ]},
  { when: { contestFood: 'ribs' }, weight: 4, text: [
    'Ribs, dense, honest. You work them down and your middle takes the receipt.',
    'Bone pile. Warm press. Maya\'s side is still a project. Yours is a method.',
  ]},
  { when: { contestFood: 'pasta' }, weight: 4, text: [
    'Pasta disappears in folds. You do not perform it. You just make it gone.',
    'Noodles, sauce, the specific weight of a second wind. You take it.',
  ]},
]);

registerPool('contest.action.scene', [
  { when: {}, text: [
    '{contest.action.setup} {contest.action.body}',
    '{contest.action.body} {contest.action.setup}',
    '{contest.action.setup}\n\n{contest.action.body}',
  ]},
]);

registerPool('contest.action.setup', [
  { when: {}, text: [
    'You use a contest trick the way some people use a timeout. It works.',
    'Strategy, then food. The table waits. You do not.',
    'A move, then the next bite. Maya files it. The judges pretend not to.',
  ]},
  { when: { contestAction: 'unbutton' }, weight: 4, text: [
    'The button gives. Your belly comes forward into the lights like it had been queued.',
    'Waistband loses. Soft mass takes the table. There is room now. You use it.',
  ]},
  { when: { contestAction: 'rub' }, weight: 4, text: [
    'Both palms on the warm round of you. Pressure eases a fraction. You eat again.',
    'You work the tightness with slow circles. Enough. The next item is still there.',
  ]},
  { when: { contestAction: 'taunt' }, weight: 4, text: [
    'You look at Maya. She looks at her plate. The whole conversation lives there.',
    'Eye contact, then a bite. She eats faster. You counted on that.',
  ]},
  { when: { contestAction: 'steal' }, weight: 4, text: [
    'You reach across the divider. The crowd makes a noise. Maya lets the plate go.',
    'Her pasta becomes yours. She says oh, quietly, and goes back to what is left.',
  ]},
  { when: { contestAction: 'kitchen_plate' }, weight: 4, text: [
    'A runner from the hall kitchen slides a warm plate under your elbow. Fuel, actually.',
    'Hall leftovers, still hot. Maya has no claim on this plate. You eat them standing a little more open.',
  ]},
  { when: { contestAction: 'lounge_cheer' }, weight: 4, text: [
    'Someone from your lounge starts a chant. The sound hits like permission.',
    'The hall section knows your name. You breathe into the noise and keep going.',
  ]},
]);

registerPool('contest.action.body', [
  { when: {}, text: [
    'Softness answers. You put the extra where the next bite can use it.',
    '{word.size} of you resettles. The chair keeps score. You do too.',
    'Warmth, press, a half-inch more of you in the lights. Then food.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is so much of you that the trick is geography. You rearrange it and continue.',
  ]},
]);

registerPool('contest.devour.scene', [
  { when: {}, text: [
    '{contest.food.setup} You stop pacing and just take. {contest.food.body}',
    'You clear what is in reach. Maya watches the math happen. {contest.food.event}',
    '{contest.food.body} Devour as policy. The table on your side becomes a rumor.',
  ]},
]);

registerPool('contest.payoff.scene', [
  { when: {}, text: [
    'The number is a receipt. {word.size} of you is the event. Maya already knows.',
    'You step off heavier than you sat down. That was the point of the hour.',
    'Pounds added on purpose, in public. You feel them. You want the next invite.',
  ]},
  { when: { contestStage: [4, 5] }, weight: 3, text: [
    'National lights. The scale takes a breath. You do not. You are the result.',
  ]},
]);

registerPool('sumo.open.scene', [
  { when: {}, text: [
    '{sumo.open.setup} {sumo.open.body}',
    '{sumo.open.body} {sumo.open.setup}',
    '{sumo.open.setup}\n\n{sumo.open.body}',
  ]},
]);

registerPool('sumo.open.setup', [
  { when: {}, text: [
    'First tachi-ai. Dana Mercer across the line, veteran mass, already set.',
    'The crowd settles. Clay under wide feet. You choose the opening.',
    'Dohyo, mawashi, the particular quiet before contact. You square up.',
  ]},
]);

registerPool('sumo.open.body', [
  { when: {}, text: [
    '{word.size} of you is the argument. She has to move all of it.',
    'You feel the extra of you in the stance. Heavier is a plan, not a mood.',
    'Belly forward, feet planted. The ring was not drawn for this much of you. Good.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the tawara is a suggestion. You intend to fill the suggestion.',
  ]},
]);

registerPool('sumo.exchange.scene', [
  { when: {}, text: [
    '{sumo.exchange.setup} {sumo.exchange.body}',
    '{sumo.exchange.body} {sumo.exchange.setup}',
    '{sumo.exchange.setup}\n\n{sumo.exchange.body}',
  ]},
]);

registerPool('sumo.exchange.setup', [
  { when: {}, text: [
    'Contact. Clay. The crowd holds a breath and then spends it.',
    'You meet her where mass meets craft. Someone has to give.',
    'The bout is a conversation in weight. You keep talking.',
  ]},
  { when: { sumoBucket: 'you_drive' }, weight: 4, text: [
    'You drive. She has to go with all of you or she goes out.',
    'Forward, belly first. Dana\'s feet scrape. The tawara gets honest.',
  ]},
  { when: { sumoBucket: 'you_crush' }, weight: 4, text: [
    'You drop the extra of you on the problem. The problem is her stance.',
    'Crush as tactic. Soft mass, hard math. She feels the number.',
  ]},
  { when: { sumoBucket: 'she_drives' }, weight: 4, text: [
    'Dana fires first. You take it on the middle and make her move the rest of you.',
    'She drives. You are a lot to move. The clay records both facts.',
  ]},
  { when: { sumoBucket: 'clash' }, weight: 4, text: [
    'Even clash. Two bodies, one line, no one conceding the story yet.',
    'You meet in the middle. Heat. The crowd likes a stalemate that cannot last.',
  ]},
  { when: { sumoBucket: 'brace' }, weight: 4, text: [
    'You root. She spends herself on the fact of you. The fact holds.',
    'Brace. Belly as wall. Dana finds less give than she budgeted.',
  ]},
]);

registerPool('sumo.exchange.body', [
  { when: {}, text: [
    'Warmth, press, {word.size} doing work the old cheerleader never filed.',
    'You feel her try to find an edge. Softness does not offer many.',
    'The extra of you is leverage. You keep it in the ring on purpose.',
  ]},
]);

registerPool('sumo.corner.scene', [
  { when: {}, text: [
    'Corner chanko, dense and warm. You eat it down. You go back heavier.',
    'Bowl after bowl in the break. Belly settles lower. Dana watches and does not eat.',
    'The corner ritual: fuel into mass into force. You stand up bigger than you sat down.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'The bowls are serious. So is the belly that receives them. You return to center as ballast.',
  ]},
]);

registerPool('sumo.bout.won', [
  { when: {}, text: [
    'She steps out. The ring is yours. The crowd finds your name and uses it.',
    'Bout to you. Mass made the argument. Dana already knows the next one will be heavier.',
    'You stay in. She steps out. The judges already know how to count it.',
  ]},
]);

registerPool('sumo.bout.lost', [
  { when: {}, text: [
    'You go out by inches. You are not discouraged. You are already thinking about the corner.',
    'She takes this one. You take the next bowl. The gap is a number you can feed.',
    'Loss on the clay. Win in the plan. You eat anyway, in public, on purpose.',
  ]},
]);

registerPool('contest.weigh2.scene', [
  { when: {}, text: [
    '{contest.weigh2.setup} {contest.weigh2.body}',
    '{contest.weigh2.body} {contest.weigh2.setup}',
    '{contest.weigh2.setup}\n\n{contest.weigh2.body}',
  ]},
]);

registerPool('contest.weigh2.setup', [
  { when: {}, text: [
    'Eating over. Judges call both of you to the scale. The room is still warm from the work.',
    'Horn, then the walk. Maya is already moving. You are the larger fact in the aisle.',
    'Final weigh-in. Catering tables gone. The scale is the last course.',
  ]},
]);

registerPool('contest.weigh2.body', [
  { when: {}, text: [
    '{word.size} of you takes the platform. Soft mass, heat, the extra you just installed.',
    'You step on. Maya steps on. The judge writes both numbers without performing surprise.',
    'Belly forward onto the scale. The crowd does the math before the microphone does.',
  ]},
  { when: { contestStage: [4, 5] }, weight: 3, text: [
    'At this size the walk to the scale is a procession. The platform takes you like a promise.',
  ]},
]);

registerPool('sumo.fill.scene', [
  { when: {}, text: [
    'You expand into the ring until there is no argument left. Dana steps outside.',
    'Fill as tactic. Soft mass, hard geography. The tawara loses.',
    'You occupy the dohyo. She has to leave it. Bout to you.',
  ]},
]);

registerPool('sumo.next.scene', [
  { when: {}, text: [
    'Center again. Dana sets her feet. You choose the next opening.',
    'You square up. The extra of you is still arriving from the corner.',
    'Another bout. Clay, mawashi, the particular quiet before contact.',
  ]},
  { when: { matchWon: true }, weight: 2, text: [
    'You return heavier than you left. Dana already knows the next one will feel it.',
  ]},
]);

registerPool('sumo.aftermath.scene', [
  { when: {}, text: [
    '{sumo.open.setup} The match is over. {word.size} of you is the record the clay kept.',
    'You step off heavier than you stepped on. Dana files it. So does the crowd.',
    'Dohyo behind you. Extra of you in front. The hour did what hours of mass do.',
  ]},
  { when: { matchWon: true }, weight: 3, text: [
    'Win on the clay. Win in the body. You can feel the added pounds working already.',
  ]},
]);

registerPool('sumo.payoff.scene', [
  { when: {}, text: [
    'Pounds added on purpose, in public. You feel them. You want the next card.',
    'The number is a receipt. {word.size} of you is the event. Dana already knows.',
    'You leave the venue heavier than you entered. That was the point of the hour.',
  ]},
]);
