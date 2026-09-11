// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Extra afterglow beats appended onto talk, weigh-in, feed, session,
// dinner, room visit, week recap — longer scenes via more slots,
// not monoliths. Context: stage, corruption, habit, night rounds.
import { registerPool, registerModuleVariants } from '../engine.js';
import './dorm/index.js';

// ── talk.afterglow — extra paragraph after any talk topic
registerPool('talk.afterglow', [
  { when: { stageMax: 2, corruption: [0] }, weight: 2, text: [
    'When she stands, the shirt settles wrong for a second. She pretends not to check.',
    'She walks you to the door lighter in mood and not lighter in the middle.',
  ] },
  { when: { stageMin: 3, stageMax: 5 }, weight: 2, text: [
    'She stays seated a beat too long, belly in her lap, as if standing is optional now.',
    'The chair keeps her a moment after the conversation ends. She lets it.',
  ] },
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    'Getting up is a project she enjoys you watching. The sway lasts after she is still.',
    'She palms her middle absently, fond, like checking a thing she already knows is there.',
  ] },
  { when: { stageMin: 9 }, weight: 2, text: [
    'She does not rise. The talk ends where she is, which is most of the furniture.',
    'You leave the food where her hands can reach. New politeness: no one asks her to stand.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'She looks at you like the conversation was a course, and she wants the next one.',
  ] },
  { when: {}, text: [
    'The pause after she stops talking is warm. Neither of you fills it with an excuse.',
    'You leave her with the feeling of being seen, which is also the feeling of being fed.',
    'She watches you go without getting up. The chair has already won.',
  ] },
]);

// ── wi.afterglow — extra sensory beat after the number
registerPool('wi.afterglow', [
  { when: { stageMax: 3 }, text: [
    'She glances down as if the number might show on her yet. A softness answers first.',
    'The scale lets her go. Her waistband does not, not quite.',
  ] },
  { when: { stageMin: 4, stageMax: 6 }, text: [
    'She steps off and the floor takes her weight like it has been practicing.',
    'A hand finds the lower curve of her belly, claiming the readout without saying it.',
  ] },
  { when: { stageMin: 7, stageMax: 9 }, text: [
    'The platform sighs. She does not. She looks proud in a way she would have denied in August.',
    'Getting clear of the scale is a slow roll of hip and belly. You do not rush her.',
  ] },
  { when: { stageMin: 10 }, text: [
    'The number is ceremony. The body in front of you is the fact, vast and warm and finished moving.',
  ] },
  { when: {}, text: [
    'The readout hangs in the air between you, warmer than plastic has any right to be.',
    'She steps off slower than she stepped on.',
    'The number is already behind her; the body is not.',
  ] },
]);

// ── feed.afterglow
registerPool('feed.afterglow', [
  { when: { stageMax: 3 }, text: [
    'She covers a small sound with a laugh. The last bite made more of her than she planned.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'Fullness sits in her like a second person. She arranges it with both hands, pleased.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The meal keeps happening in her after the plate is gone — a slow settling, a deeper heat.',
  ] },
  { when: {}, text: [
    'She is fuller than when you started. The room can tell. So can you.',
    'A last swallow, then the quiet of someone who is done arguing with her plate.',
    'She sits back. The meal keeps a hand on her.',
  ] },
]);

// ── session.afterglow
registerPool('session.afterglow', [
  { when: { stageMax: 4 }, text: [
    'She stays in the chair because standing would make the fullness obvious, and it already is.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, text: [
    'Encouragement has a residue. She keeps eating the way some people keep talking.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The session ends when you stop bringing plates. She has not moved. She does not need to.',
  ] },
  { when: {}, text: [
    'Private hours leave a dent in the afternoon and a rounder outline in the chair.',
    'She stays seated after the last plate. Standing would be a different conversation.',
    'The session ends in warmth, crumbs, and a shirt that has given up.',
  ] },
]);

// ── dinner.afterglow
registerPool('dinner.afterglow', [
  { when: {}, text: [
    'The walk back is slower. Her shoulder keeps brushing yours because there is more of her to brush.',
    'She talks less on the return. Fullness is occupying the part of her that makes small talk.',
    'Outside, the night air makes her clothes feel tighter. She does not mind.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'A booth was a mistake she enjoyed. Standing up is the sequel, and it has a wobble.',
  ] },
]);

// Extra clothes/dining fragments so check-ins remix more
registerModuleVariants('talk.checkIn.clothes', [
  { when: { stageMin: 2, stageMax: 4 }, weight: 2, text: [
    'The waistband has opinions it did not have in August.',
    'She keeps smoothing a shirt that has started telling the truth.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, weight: 2, text: [
    'Fabric across her middle shines a little where it is working hardest.',
    'A button has learned a new hobby: holding on for the bit of conversation.',
  ] },
]);

registerModuleVariants('talk.checkIn.greetClose', [
  { when: {}, weight: 2, text: [
    'She glances at the snacks like they are part of the greeting.',
    'The smile lasts long enough to be an invitation to stay.',
  ] },
]);

registerModuleVariants('enc.bodyAside', [
  { when: { stageMin: 3, stageMax: 6 }, weight: 2, text: [
    'Her belly answers the encouragement with a slow outward ease.',
    'A new softness shows when she laughs, then stays when she stops.',
  ] },
  { when: { stageMin: 7 }, weight: 2, text: [
    'The mass of her shifts toward you, warm, as if agreeing out loud would be redundant.',
  ] },
]);

registerModuleVariants('wi.reply', [
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    `"That's the number," {subject.name} says, and rests a hand where the number lives.`,
  ] },
]);

registerModuleVariants('comp.bodyNote', [
  { when: { stageMin: 3, stageMax: 6 }, weight: 2, text: [
    'The compliment finds the place her waistband is losing. She does not pull her shirt down this time.',
    'You can see the extra of her in the chair. Naming it makes her sit heavier, not smaller.',
  ] },
  { when: { stageMin: 7 }, weight: 2, text: [
    'There is so much of her to praise that a single sentence feels stingy. You make it specific anyway.',
  ] },
]);

registerModuleVariants('room.visit.stage.room', [
  { when: { habitId: 'midnight_snack' }, weight: 3, text: [
    'The snack drawer is slightly open, a habit you both already know.',
  ] },
  { when: { habitId: 'scale_private' }, weight: 3, text: [
    'The alcove curtain is not fooling anyone. The scale lives here now.',
  ] },
]);

registerModuleVariants('week.recap.beat', [
  { when: {}, weight: 2, text: [
    'The floor smells like butter and lamp heat. Her clothes argue a little more than last Sunday.',
    'A week of quiet feeding shows on her before anyone names it.',
    'Sunday finds her warmer, rounder, slower to get up from wherever she sat.',
  ] },
]);

// Extra composed afterglows — length via extra slots, not monoliths.
registerPool('week.recap.afterglow', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs a shirt that still mostly works and pretends the tug is nothing.',
    'The number from midweek sits in her like a private joke she will not tell.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She sits heavier in the lounge recap than she did seven days ago. The couch agrees.',
    'A hand finds her middle while she listens. Habit now. Warm.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'The recap happens around her. She is the furniture the week arranged itself on.',
  ] },
  { when: {}, text: [
    'She leaves the recap fuller than the notes admit.',
    'The week wrote itself on her waistband. Nobody needs the minutes.',
    'You watch her go and the going takes more of the doorway than last time.',
  ] },
]);

registerPool('hunger.afterglow', [
  { when: { stageMax: 3 }, text: [
    'She eats like the knock was the honest part. The rest is chewing.',
    'Relief lands in her middle first. Her face catches up a bite later.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'Fullness sits her down. The doorframe looks narrower on the way out, or she looks wider. Both.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She does not hurry back. Bodies this size make hunger into an appointment, and she kept it.',
  ] },
  { when: {}, text: [
    'The hallway smells like whatever you gave her. She takes that smell with her.',
    'She leaves slower than she arrived. Hunger made her fast. Food made her honest.',
    'You close the door on a resident who is done pretending she was not hungry.',
  ] },
]);

registerPool('campus.afterglow', [
  { when: {}, text: [
    'The hour keeps a taste of her in the room after she stands.',
    'Campus noise returns. Her appetite does not clock out with the meeting.',
    'Someone else notices how she fills the chair. She notices that they notice.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Getting out of the seat is a small performance. The floor watches without calling it that.',
  ] },
]);

registerPool('intimacy.afterglow', [
  { when: { stageMax: 4 }, text: [
    'She stays close. Heat and a new softness share the same inch of air.',
    'The quiet after is the part she will replay. The body is already replaying it.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, weight: 2, text: [
    'She lets you hold the weight of her. There is more of it than last time, and she knows.',
  ] },
  { when: { stageMin: 9 }, weight: 2, text: [
    'Leaving the bed is not on the agenda. You come to her. The arrangement is the intimacy.',
  ] },
  { when: {}, text: [
    'She breathes against you, warm, pleased, not finished being seen.',
    'A hand stays on her middle like a bookmark. The page is this body.',
    'The room holds the two of you and the extra of her that arrived while you were busy.',
  ] },
]);

registerPool('opposition.afterglow', [
  { when: {}, text: [
    'Paperwork cannot see what the floor already decided.',
    'The board wants a narrative. The residents want seconds.',
    'You file the hour anyway. The body evidence will not fit the form.',
  ] },
]);

registerPool('stream.afterglow', [
  { when: {}, text: [
    'Chat keeps typing after she stops. Her belly answers by staying.',
    'The light goes off. She does not. Fullness is the encore.',
    'She peels a headset off and the rest of her stays exactly as broadcast.',
  ] },
]);

registerPool('device.afterglow', [
  { when: {}, text: [
    'The device ticks. She breathes around a change that has already started.',
    'Hardware is patient. Softness arrives on the schedule it prefers.',
    'She rests a palm where the work landed. Warm. Occupied.',
  ] },
]);

registerModuleVariants('talk.check_in', [
  { when: { habitId: 'midnight_snack' }, weight: 3, text: [
    'You do not mention the wrappers. She mentions hunger first, which is the same confession.',
  ] },
]);

registerModuleVariants('wi.bodyClause', [
  { when: { stageMin: 3, stageMax: 6 }, weight: 2, text: [
    'Softness occupies the platform like it paid rent.',
    'The scale takes her in stages: heel, thigh, the warm arrival of belly.',
  ] },
]);
