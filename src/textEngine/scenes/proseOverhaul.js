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
    'You leave the food where her hands can reach. That is the new politeness.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'She looks at you like the conversation was a course, and she wants the next one.',
  ] },
  { when: {}, text: [
    'The pause after she stops talking is warm. Neither of you fills it with an excuse.',
    'You leave her with the feeling of being seen, which is also the feeling of being fed.',
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
  ] },
]);

// ── dinner.afterglow
registerPool('dinner.afterglow', [
  { when: {}, text: [
    'The walk back is slower. Her shoulder keeps brushing yours because there is more of her to brush.',
    'She talks less on the return. Fullness is occupying the part of her that makes small talk.',
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
  ] },
]);
