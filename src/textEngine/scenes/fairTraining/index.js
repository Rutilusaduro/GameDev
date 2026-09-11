// The Squad — Lead: A1 Mobile | Support: A5 Editor, A2 Psych
// State Fair Queen — engine pools replacing placeholder tag tables.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';

registerDimension('collab', (ctx) => ctx.globals?.collab ?? '');
registerDimension('boostTier', (ctx) => ctx.globals?.boostTier ?? '');
registerDimension('influence', (ctx) => ctx.globals?.influence ?? 'None');
registerDimension('fairChoice', (ctx) => ctx.globals?.fairChoice ?? 0);

registerPool('fair.training.scene', [
  { when: { collab: 'Brittany', stageMax: 6 }, weight: 3, text: [
    'Brittany sets a timer on the picnic table. Mary Jane matches her bite for bite until the horn, belly warm and competitive under the county-fair lights.',
    'Capacity drill. Brittany counts swallows. Mary Jane finishes the pan and looks at the captain like the record was personal.',
  ] },
  { when: { collab: 'Brittany', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'The picnic table was built for two ordinary women. Brittany keeps time anyway. Mary Jane\'s middle takes the drill like a ranking.',
    'Speed, then volume. Brittany nods once when the second pan empties. Fair week is a sport and they are both in season.',
  ] },
  { when: { collab: 'Brittany', stageMin: 9 }, weight: 3, text: [
    'Brittany brings the food to Mary Jane\'s seat. The captain still times it. The belly still wins. The horn is a courtesy.',
    'They train without standing more than they must. Brittany calls the count. Mary Jane answers in pounds.',
  ] },
  { when: { collab: 'Kylie', stageMax: 6 }, weight: 3, text: [
    'Kylie angles the phone. "Eat like the county is watching." Mary Jane does. Chat would have loved the butter on her wrist.',
    'Ring light against barn wood. Kylie stuffs and films. Mary Jane laughs with her mouth full and lets the camera keep it.',
  ] },
  { when: { collab: 'Kylie', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'Two bodies, one frame, a table that complains. Kylie hypes the next bite. Mary Jane gives it to the lens without apology.',
    'Kylie says "one more for the thumbnail." Mary Jane knows that means three. The fair will see the softness either way.',
  ] },
  { when: { collab: 'Kylie', stageMin: 9 }, weight: 3, text: [
    'The camera sits low so it can take all of her. Kylie films from the chair beside. Mary Jane eats like the county already bought tickets.',
    'Chat is imaginary and still loud. Kylie narrates the spread. Mary Jane is the spread.',
  ] },
  { when: { collab: 'Serena', stageMax: 6 }, weight: 3, text: [
    'Chanko in a fairground kitchen. Serena talks force. Mary Jane eats until her stance feels heavier on the packed dirt.',
    'Serena plants her feet and watches Mary Jane finish the pot. Mass is the drill. The ribbon is later.',
  ] },
  { when: { collab: 'Serena', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'Two heavy women sharing a pot that was meant for a team. Serena grins when Mary Jane goes back for ballast.',
    'The mawashi mindset without the ring. Serena counts bowls. Mary Jane counts how the ground reports her.',
  ] },
  { when: { collab: 'Serena', stageMin: 9 }, weight: 3, text: [
    'Serena brings the pot to her. "Weight is the argument." Mary Jane eats the argument until it sits in her lap.',
    'They train seated. Serena still talks drive and plant. Mary Jane\'s belly is the dohyo now.',
  ] },
  { when: { collab: 'Renee', stageMax: 6 }, weight: 3, text: [
    'Reneé plates courses like a harvest log. Mary Jane tastes, then finishes, then asks what the next technique does to a middle.',
    'Butter, cream, a second sauce. Reneé watches the yield. Mary Jane is the yield, pleased about it.',
  ] },
  { when: { collab: 'Renee', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'The menu has no off-ramp. Reneé keeps pouring. Mary Jane keeps a hand on the new weight like a tasting note.',
    'Slow feast, rich as the land. Reneé names the course. Mary Jane names how it lands.',
  ] },
  { when: { collab: 'Renee', stageMin: 9 }, weight: 3, text: [
    'Courses come to the chair. Reneé feeds the method. Mary Jane is past walking the kitchen and past pretending that matters.',
    'Harvest in a lap. Reneé looks proud. Mary Jane looks fed. The fair will weigh both facts.',
  ] },
  { when: { collab: 'Daisy', stageMax: 6 }, weight: 3, text: [
    'Daisy packs a training lunch like a care package. Mary Jane eats it in the bleachers and goes back for the extra tray.',
    'Encouragement, then seconds. Daisy claps when the container empties. Mary Jane blushes and keeps chewing.',
  ] },
  { when: { collab: 'Daisy', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'The snack table is policy. Daisy restocks. Mary Jane treats restocking as an invitation and is not wrong.',
    'Daisy talks wellness with her mouth full of cake. Mary Jane matches her, softer every session.',
  ] },
  { when: { collab: 'Daisy', stageMin: 9 }, weight: 3, text: [
    'Daisy brings the table to her. "You trained." Mary Jane is the proof, vast and warm in the fairground shade.',
    'No one asks her to stand. Daisy keeps the trays coming. The hall energy followed them to the county.',
  ] },
  { when: { collab: 'Lilith', stageMax: 6 }, weight: 3, text: [
    'Lilith arrives with three hungry recruits. The picnic becomes a hunt that ends in feeding. Mary Jane holds the center plate.',
    'Recruits glance at Mary Jane and then at the food. Lilith smiles. Training is appetite with witnesses.',
  ] },
  { when: { collab: 'Lilith', stageMin: 7, stageMax: 8 }, weight: 3, text: [
    'The recruits are already softer than last week. Lilith notices. Mary Jane eats like the demonstration is the point.',
    'Lilith orbits the table. Three guests, one champion. Mary Jane finishes what they cannot and looks satisfied about the leftover.',
  ] },
  { when: { collab: 'Lilith', stageMin: 9 }, weight: 3, text: [
    'Recruits sit close because there is no other way to share a bench with her. Lilith feeds the nearest mouth. Mary Jane is the weather.',
    'The hunt ends at her lap. Lilith calls it training. The recruits call it dinner. Mary Jane calls for more.',
  ] },
  { when: {}, text: [
    'Fairground heat, a shared table, another session that leaves Mary Jane heavier than it found her.',
    'They train the only way this county understands: eat, laugh, weigh later.',
    'The barn kitchen smells like butter and competition. Mary Jane takes both personally.',
    'Another plate. Another pound. The ribbon is still days away and already assumed.',
  ] },
]);

registerPool('fair.training.photo', [
  { when: { collab: 'Brittany' }, weight: 3, text: [
    'Timer in the foreground. Two emptied pans. Mary Jane mid-swallow, competitive and pleased.',
    'Captain and champion, bibs optional, bellies not.',
  ] },
  { when: { collab: 'Kylie' }, weight: 3, text: [
    'Ring light catch on butter. Mary Jane looking at the lens like the county already subscribed.',
    'Thumbnail energy: two soft women, one table, no apology.',
  ] },
  { when: { collab: 'Serena' }, weight: 3, text: [
    'Chanko steam, planted feet, Mary Jane\'s middle taking the light like a ranking.',
    'Two heavy silhouettes. The pot is empty. The dirt remembers.',
  ] },
  { when: { collab: 'Renee' }, weight: 3, text: [
    'Course wreckage, tasting spoons, Mary Jane\'s hand on a belly that graded the menu.',
    'Harvest light. A plate that lost. A champion who did not.',
  ] },
  { when: { collab: 'Daisy' }, weight: 3, text: [
    'Tupperwares stacked like trophies. Daisy grinning. Mary Jane still chewing.',
    'Bleacher shade, crumb on a wrist, care that landed as pounds.',
  ] },
  { when: { collab: 'Lilith' }, weight: 3, text: [
    'Three recruits in the blur. Mary Jane sharp in the center, fed and watching.',
    'Lilith\'s smile, a licked spoon, a champion who kept the last bite.',
  ] },
  { when: {}, text: [
    'County-fair light on a full middle. The trophy wall will keep this heat.',
    'A still of appetite. The ribbon comes later.',
    'Butter on a wrist. Mary Jane mid-laugh. The county will keep this.',
  ] },
]);

registerPool('fair.boost', [
  { when: { collab: 'Brittany', boostTier: 'High' }, weight: 3, text: [
    'The captain\'s drills stuck. Pride runs hot. The weigh-in will hear the horn in her belly.',
  ] },
  { when: { collab: 'Brittany' }, weight: 2, text: [
    'Table discipline lingers. Fair Pride ticks up like a split time.',
  ] },
  { when: { collab: 'Kylie', boostTier: 'High' }, weight: 3, text: [
    'Camera hunger transferred. The county is already an audience. Pride is loud.',
  ] },
  { when: { collab: 'Kylie' }, weight: 2, text: [
    'She ate for a lens that was not even there. Pride noticed.',
  ] },
  { when: { collab: 'Serena', boostTier: 'High' }, weight: 3, text: [
    'Ballast training took. She feels heavier on purpose. Pride sits low and sure.',
  ] },
  { when: { collab: 'Serena' }, weight: 2, text: [
    'Mass-as-force is in her stance. Fair Pride likes the weight of it.',
  ] },
  { when: { collab: 'Renee', boostTier: 'High' }, weight: 3, text: [
    'The menu rewrote her. Pride is rich, slow, and already counting the ribbon.',
  ] },
  { when: { collab: 'Renee' }, weight: 2, text: [
    'Courses linger in her. Pride warms like a reduction.',
  ] },
  { when: { collab: 'Daisy', boostTier: 'High' }, weight: 3, text: [
    'Care packed as calories. Pride is domestic and enormous.',
  ] },
  { when: { collab: 'Daisy' }, weight: 2, text: [
    'The extra tray did its job. Pride ticks up kind.',
  ] },
  { when: { collab: 'Lilith', boostTier: 'High' }, weight: 3, text: [
    'Witnesses, leftovers, a hunt that ended in her. Pride is predatory and pleased.',
  ] },
  { when: { collab: 'Lilith' }, weight: 2, text: [
    'The recruits left hungrier. She did not. Pride noticed the difference.',
  ] },
  { when: {}, text: [
    'Fair Pride climbs. The scale will have opinions.',
    'Another session banked. The county will feel it.',
    'Training sticks in the middle. Pride follows.',
  ] },
]);

registerPool('fair.day.weighin', [
  { when: { influence: 'Brittany' }, weight: 3, text: [
    'The fair scale. Brittany\'s voice in her head counting swallows. Mary Jane steps on like a heat.',
  ] },
  { when: { influence: 'Kylie' }, weight: 3, text: [
    'Cameras at the weigh-in. Mary Jane lets them look. The number is content.',
  ] },
  { when: { influence: 'Serena' }, weight: 3, text: [
    'She plants before she steps on. Serena taught that. The board will read force.',
  ] },
  { when: { influence: 'Renee' }, weight: 3, text: [
    'Last night\'s courses are still in her. The scale is a tasting. She already knows she passed.',
  ] },
  { when: { influence: 'Daisy' }, weight: 3, text: [
    'Daisy packed her to this number. Mary Jane smiles at the official like this is care.',
  ] },
  { when: { influence: 'Lilith' }, weight: 3, text: [
    'The crowd leans in. Lilith would call them prey. Mary Jane calls them an audience and steps on.',
  ] },
  { when: { stageMin: 9 }, weight: 2, text: [
    'Getting her onto the platform is the opening ceremony. The number takes a second to arrive. So does the roar.',
  ] },
  { when: {}, text: [
    'County scale, barn light, a champion who ate her way to this number on purpose.',
    'The official waits. Mary Jane settles. The board is about to tell the truth.',
    'Weigh-in hush. Her belly takes the light. She does not suck it in.',
  ] },
]);

registerPool('fair.day.weighin.result', [
  { when: { fairChoice: 1 }, weight: 2, text: [
    'She holds still and lets the number land. Weight, honest and public.',
    'Feet planted. Breath even. The board ticks up and she does not flinch.',
  ] },
  { when: { fairChoice: 2 }, weight: 2, text: [
    'She turns into the noise and lets them see all of her. The number is a show and she is the act.',
    'A wave, a laugh, a belly that fills the platform. The crowd answers.',
  ] },
  { when: {}, text: [
    'The scale speaks. She stays on it a beat longer than required.',
    'Official writes. County watches. She already knew.',
    'The board ticks. She does not step off until the roar starts.',
  ] },
]);

registerPool('fair.day.judging', [
  { when: { influence: 'Brittany' }, weight: 2, text: [
    'Judges talk capacity and presence. Brittany would have timed this. Mary Jane just occupies the space.',
  ] },
  { when: { influence: 'Kylie' }, weight: 2, text: [
    'Someone in the stands is filming. Mary Jane poses without being asked. The judges write faster.',
  ] },
  { when: { influence: 'Serena' }, weight: 2, text: [
    'They walk the line. She does not. Mass is the argument and the panel has no counter.',
  ] },
  { when: {}, text: [
    'Judges murmur about presence, softness, the way she fills the stall. The ribbon is a formality wearing a delay.',
    'Barn hush. Clipboard scratch. Mary Jane is the heaviest fact in the building.',
    'They look at her the way counties look at a good harvest: greedy, proud, a little stunned.',
  ] },
]);

registerPool('fair.day.afterparty', [
  { when: { influence: 'Brittany' }, weight: 2, text: [
    'The afterparty table is another heat. Brittany would start the timer. Mary Jane starts the plate.',
  ] },
  { when: { influence: 'Lilith' }, weight: 2, text: [
    'Recruits from training show up sticky with funnel cake. Lilith would be pleased. Mary Jane feeds the nearest one.',
  ] },
  { when: {}, text: [
    'String lights, fried sugar, a champion still eating because the ribbon did not fill her.',
    'The fair does not end when they pin her. It ends when she decides she is done. She is not.',
    'Afterparty heat. Someone puts a plate in her lap. She treats that as correct.',
  ] },
]);

registerPool('fair.day.afterparty.result', [
  { when: { fairChoice: 1 }, weight: 2, text: [
    'She celebrates with the woman who trained her. Shared bites. Shared pride. Extra pounds as the toast.',
  ] },
  { when: { fairChoice: 2 }, weight: 2, text: [
    'She goes to the crowd with a plate and lets them feed the champion. Hands, food, heat. She takes all of it.',
  ] },
  { when: {}, text: [
    'The night keeps serving. She keeps receiving.',
    'Ribbon on the stall. Appetite still on the clock.',
    'String lights, a last plate, a champion who treats closing time as a rumor.',
  ] },
]);

registerPool('fair.linger', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley leftover still in Mary Jane. Fairground butter is the second sitting.',
    'Last night\'s tray plus this drill. She treats the picnic table like seconds.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen heat under the bib. The county is a logged follow-up plate.',
    'Two kitchens, one champion. She lets the pounds finish arriving from both.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in her. Daylight training uses the same open door.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her off the bench is tomorrow\'s problem. Tonight she is the fair.',
    'The stall keeps her outline after she leans back. County nights are long. So is she.',
  ] },
  { when: {}, text: [
    'Funnel-cake sugar on a wrist. She licks it like a ranking.',
    'The midway keeps spinning. Her middle keeps the score.',
    'She sits in the leftover heat and lets the pounds finish arriving.',
  ] },
]);

function fairCtx(student, week, globals = {}, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'fair_training', ...globals },
    ...opts,
  });
}

function compose(keys, ctx, chance = 0.28) {
  const lines = keys.map((k) => render(`{${k}}`, ctx)?.trim()).filter(Boolean);
  const linger = render('{fair.linger}', ctx)?.trim();
  if (linger) lines.push(linger);
  return appendV2Depth(lines.join('\n\n'), 'fairTraining', ctx, chance);
}

export function renderFairTrainingScene(mj, week, collabKey, partnerStage = 5) {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { collab: collabKey, partnerStage });
  return compose(['fair.training.scene'], ctx, 0.3);
}

export function renderFairTrainingPhoto(mj, week, collabKey) {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { collab: collabKey });
  return render('{fair.training.photo}', ctx)?.trim() || 'County-fair light on a full middle.';
}

export function renderFairBoost(mj, week, collabKey, boostTier = 'Low') {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { collab: collabKey, boostTier });
  return render('{fair.boost}', ctx)?.trim() || 'Fair Pride climbs.';
}

export function renderFairDayWeighIn(mj, week, influence = 'None') {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { influence, featureId: 'fair_day' });
  return compose(['fair.day.weighin'], ctx, 0.3);
}

export function renderFairDayWeighInResult(mj, week, influence, choice) {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { influence, fairChoice: choice, featureId: 'fair_day' });
  return compose(['fair.day.weighin.result'], ctx, 0.26);
}

export function renderFairDayJudging(mj, week, influence = 'None') {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { influence, featureId: 'fair_day' });
  return compose(['fair.day.judging'], ctx, 0.28);
}

export function renderFairDayAfterparty(mj, week, influence = 'None') {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { influence, featureId: 'fair_day' });
  return compose(['fair.day.afterparty'], ctx, 0.28);
}

export function renderFairDayAfterpartyResult(mj, week, influence, choice) {
  if (!mj) return '';
  const ctx = fairCtx(mj, week, { influence, fairChoice: choice, featureId: 'fair_day' });
  return compose(['fair.day.afterparty.result'], ctx, 0.26);
}

export const RECRUIT_SIZE_WORD = [
  'slight', 'slim', 'soft', 'round', 'plush', 'heavy',
  'thick', 'ample', 'vast', 'immense', 'monumental', 'settled',
];

export function recruitSizeWord(stage = 0) {
  return RECRUIT_SIZE_WORD[Math.max(0, Math.min(RECRUIT_SIZE_WORD.length - 1, stage))] || 'soft';
}
