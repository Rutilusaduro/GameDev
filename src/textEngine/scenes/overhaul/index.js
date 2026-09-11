// The Squad — Lead: A6 Slender | Support: A1 Mobile, A2 Psych, A3 Immobility, A5 Editor
// PROSE OVERHAUL — longer modular beats, less repetition, context-keyed.
// Extra linger / atmosphere slots stitched into high-traffic skeletons.
import { registerPool, registerModuleVariants } from '../../engine.js';
import './more.js';
import './campusHunt.js';
import './evolvedActivity.js';
import './contestSumo.js';
import './evolvedEvent.js';
import './recording.js';
import './cgFair.js';
import './leftoverDisplay.js';
import './cgChat.js';
import './sessionNpc.js';
import './wlTalk.js';
import './homeroom.js';
import './pharmacist.js';
import './intimacy.js';

// ── talk.floor.atmosphere — FULL SENTENCE. The room around the talk.
registerPool('talk.floor.atmosphere', [
  { when: {}, text: [
    'The hall lounge holds the conversation the way a warm room holds a body — close, unhurried, a little too comfortable to leave.',
    'Somewhere down the corridor a fridge kicks on. She notices. She does not get up.',
    'A lamp buzzes. Snack wrappers tick in the trash. She stays seated.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'The chair still feels too big for her. She sits in it like she is borrowing someone else\'s comfort.',
    'Her waistband is only a little honest tonight. She keeps tugging it when she thinks you are looking at her face.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'When she shifts, the chair answers. Soft mass settling, a slow sway that keeps going after she stills.',
    'Her belly takes a share of her lap now. She rests a hand there without performing it.',
  ]},
  { when: { stageMin: 7, stageMax: 9 }, weight: 2, text: [
    'She fills the seat in every direction that matters. The lounge was built for this and is still catching up.',
    'Warmth radiates off her. You feel it before she speaks. The {word.size} of her makes the lamp look smaller.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'She is the furniture now — settled, attended, the room arranged around the fact of her.',
    'Sound arrives first: the soft creak of a reinforced frame taking her as a given.',
  ]},
]);

// ── talk.linger — FULL SENTENCE. The extra beat that makes talks feel finished, not clipped.
registerPool('talk.linger', [
  { when: {}, text: [
    'She does not rush you out. The silence after is full of snack wrappers and the heat she puts off.',
    'When she finally looks down at herself, it is not to hide. It is to check that you saw.',
    'She takes one more bite after the conversation is over, like punctuation.',
  ]},
  { when: { corruption: [0], stageMax: 4 }, weight: 2, text: [
    'She laughs once, too bright, and reaches for another bite like the laugh gave her permission.',
    'Her cheeks are hot. The food is already gone. She looks at the empty wrapper like it betrayed her.',
  ]},
  { when: { corruption: [1], stageMin: 3 }, weight: 2, text: [
    'She lets the fullness sit between you, a third person in the chair, warm and obvious.',
    'She says your name like a check-in of her own. Then she eats whatever is left.',
  ]},
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    'She is proud of the space she takes. She wants the pride witnessed. You stay until it is.',
    `"Don't go yet," she says, already feeding herself another slow bite. "I'm not done being looked at."`,
  ]},
]);

// ── wi.bodyRead — FULL SENTENCE. Body as event before the scale.
registerPool('wi.bodyRead', [
  { when: {}, text: [
    'You take her in before the number does — the way she carries tonight, the heat, the extra that was not here last week.',
    'Her body arrives in the room a half-beat before her greeting does.',
    'You read the week on her before she steps toward the platform.',
  ]},
  { when: { stageMax: 2 }, weight: 2, text: [
    'There is not much to announce yet. A softer line at the waist. A shirt that meets her like a rumor.',
    'She still looks like move-in week until she turns. Then the hips tell on her.',
  ]},
  { when: { stageMin: 3, stageMax: 4 }, weight: 2, text: [
    'Belly first, a warm curve that her waistband is negotiating with in public.',
    'Her thighs touch when she stands still. She notices. She stands still longer.',
  ]},
  { when: { stageMin: 5, stageMax: 6 }, weight: 2, text: [
    'She walks like she has somewhere to put all of this and has chosen you as the place.',
    'The {word.body} of her arrives a half-step before she does, soft and certain.',
  ]},
  { when: { stageMin: 7, stageMax: 9 }, weight: 2, text: [
    'Doorway, then her, then more of her. The scale is going to have an opinion. So will the floor.',
    'Every step redistributes her. Soft mass rolling, catching up, settling heavy against itself.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'She does not so much enter as occupy. The weigh-in comes to her because she has stopped coming to it.',
  ]},
]);

// ── wi.floor — FULL SENTENCE. Weigh-in room context.
registerPool('wi.floor', [
  { when: {}, text: [
    'The alcove light is kinder than Housing\'s fluorescent ever was. She uses that. You let her.',
    'The hall is quiet enough that you hear the platform take her weight.',
    'Someone left a plant next to the readout. It does not hide anything.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The wide platform waits. She breathes out, then in, then commits her weight like a promise.',
  ]},
]);

// ── feed.react.body — FULL SENTENCE. The body answering the bite.
registerPool('feed.react.body', [
  { when: {}, text: [
    'Each swallow has somewhere to go. You watch it arrive.',
    'The bite lands. Softness answers it.',
    'Her middle takes the food like it was expected.',
  ]},
  { when: { stageMax: 3 }, weight: 2, text: [
    'A small tight swell under her shirt, warm, still deniable if she keeps her hand off it. She does not keep her hand off it.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'Her belly takes the bite like it was waiting. Soft, spreading, a little heavier in her lap when she is done.',
  ]},
  { when: { stageMin: 7, stageMax: 9 }, weight: 2, text: [
    'The food lands in a body that already had plenty and wanted more anyway. The give of her is obscene and fond.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'There is so much of her that the swallow is a weather event — a slow travel you can follow by heat.',
  ]},
  { when: { feedRoom: 'past' }, weight: 3, text: [
    'She is past full and still making room. The press of it is a thick, satisfied ache she leans into.',
  ]},
  { when: { feedRoom: 'eager' }, weight: 2, text: [
    'She is not full yet. The next bite is already a decision she made two swallows ago.',
  ]},
]);

// ── room.visit.linger — FULL SENTENCE.
registerPool('room.visit.linger', [
  { when: {}, text: [
    'You stay in the doorway long enough for the room to tell on her — wrappers, the chair, the way she sits in it.',
    'The mini-fridge hums like a third person in the conversation.',
    'She makes space on the bed with a hip and a look. Sit or don\'t. The snack is already open.',
  ]},
  { when: { stageMax: 3 }, weight: 2, text: [
    'Move-in posters. A snack shelf winning against the textbooks. She notices you noticing and shrugs one shoulder.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The bed has become the center of gravity. Everything else has learned to live around her hips.',
  ]},
]);

// ── enc.linger / extra encourage beat
registerPool('enc.linger', [
  { when: {}, text: [
    'Permission, once given, does not go back in the bottle. She eats like she is testing that.',
    'She waits to see if you will stop her. You do not. She continues.',
    'Another bite. Then the look that asks for one more after that.',
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    'She mutters that she should stop. The mutter does not stop her. The next bite is slower and better.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She wants you to watch the swallow. She makes sure there is something to watch.',
  ]},
]);

registerPool('comp.linger', [
  { when: {}, text: [
    'The compliment stays in the air until she decides where to put it. She puts it on her body.',
    'She breathes in like the praise needed room. It did.',
    'Her hand finds the place you named and stays there, pleased.',
  ]},
  { when: { corruption: [0], stageMax: 3 }, weight: 2, text: [
    'She does not know if she is allowed to like it. Her mouth likes it first. Her posture follows.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She turns a little so you get the better angle. There is a better angle. There are several.',
  ]},
]);

// ── dinner.linger / weekly / hunger extras
registerPool('dinner.linger', [
  { when: {}, text: [
    'The walk back to the hall is slower. She keeps a hand on her middle like it might spill if she lets go.',
    'She unbuttons one button in the elevator and pretends it was always that way.',
    'The night air does nothing. She is still full when you reach her door.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'She chooses the wide chair in the lounge without asking. The dinner is still happening in her. You can see it.',
  ]},
  { when: { fullnessMin: 0.85 }, weight: 2, text: [
    'She is packed. Breathing is a careful hobby. She smiles anyway, dazed and fond of the problem.',
  ]},
]);

registerPool('weekly.linger', [
  { when: {}, text: [
    'The floor notices before Housing does. Someone has gotten heavier in a way you can hear.',
    'A chair complains. She sits anyway. The week keeps score.',
    'Gossip in the bathroom: she looks different. She does.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'Furniture files a quiet complaint. She answers by sitting down harder, like winning.',
  ]},
]);

registerPool('hunger.linger', [
  { when: {}, text: [
    'The craving has a temperature. It stands in the doorway with her, waiting for you to do something kind and irreversible.',
    'She came hungry. She will leave heavier if you let her. You are going to let her.',
    'Her stomach speaks first. Her mouth is only translating.',
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She is past polite hunger. The next thing you offer will not be a suggestion.',
  ]},
]);

registerModuleVariants('talk.suggest_indulgence', [
  { when: { corruption: [0] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b00}\n\n{talk.linger} {talk.floor.atmosphere}',
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b01}\n\n{enc.linger}',
  ]},
  { when: { corruption: [1] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b10}\n\n{talk.floor.atmosphere}',
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b11}\n\n{talk.linger}',
  ]},
  { when: { corruption: [2] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b20}\n\n{talk.linger}',
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b21}\n\n{talk.floor.atmosphere}',
  ]},
]);

registerModuleVariants('talk.suggest_growth', [
  { when: { corruption: [0] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b00}\n\n{talk.linger}',
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b01}\n\n{talk.floor.atmosphere}',
  ]},
  { when: { corruption: [1] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b10}\n\n{comp.linger}',
  ]},
  { when: { corruption: [2] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b20}\n\n{talk.linger} {talk.floor.atmosphere}',
    '{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b21}\n\n{enc.linger}',
  ]},
]);

registerModuleVariants('session.aftermath', [
  { when: { aftermathBand: 'stuffed' }, weight: 3, text: [
    '{session.aftermath.stuffed} {talk.linger}',
  ]},
  { when: { aftermathBand: 'packed' }, weight: 3, text: [
    '{session.aftermath.packed} {feed.react.body} {talk.floor.atmosphere}',
  ]},
  { when: { aftermathBand: 'full' }, weight: 2, text: [
    '{session.aftermath.full} {dinner.linger}',
  ]},
]);

// Lengthen talk.check_in — clothes AND dining AND linger, not one or the other.
registerPool('talk.check_in.hi', [
  { when: {}, text: [
    '{talk.checkIn.greetQuote} {talk.checkIn.greetBeat} {talk.checkIn.greetClose}',
    '{talk.checkIn.greetQuote} {talk.checkIn.greetBeat}',
    '{talk.checkIn.greetBeat} {talk.checkIn.greetClose}',
  ]},
]);
registerPool('talk.check_in.mid', [
  { when: {}, text: [
    '{talk.checkIn.clothes}{talk.checkIn.clothesNote|prefix: }\n\n{talk.checkIn.dining} {talk.checkIn.diningLine}',
    '{talk.checkIn.clothes} {talk.checkIn.diningLine}',
    '{talk.checkIn.dining} {talk.checkIn.clothesNote}',
  ]},
]);
registerPool('talk.check_in.tail', [
  { when: {}, text: [
    '{talk.checkIn.earlyWeight}{talk.interior.aside|prefix:\n\n}\n\n{talk.floor.atmosphere} {talk.linger}',
    '{talk.floor.atmosphere} {talk.linger}',
    '{talk.checkIn.earlyWeight} {talk.linger}',
  ]},
]);
registerPool('talk.check_in.ext0', [
  { when: {}, text: [
    '{talk.check_in.hi}\n\n{talk.check_in.mid}\n\n{talk.check_in.tail}',
    '{talk.check_in.hi}\n\n{talk.check_in.tail}',
    '{talk.check_in.mid}\n\n{talk.check_in.tail}',
  ]},
]);
registerPool('talk.check_in.ext1', [
  { when: {}, text: [
    '{talk.checkIn.acceptOpen}\n\n{talk.checkIn.acceptBody}\n\n{talk.floor.atmosphere} {talk.linger}',
    '{talk.checkIn.acceptOpen} {talk.checkIn.acceptClose}',
    '{talk.checkIn.acceptBody} {talk.linger}',
  ]},
]);
registerPool('talk.check_in.ext2', [
  { when: {}, text: [
    '{talk.checkIn.ownedOpen}\n\n{talk.checkIn.ownedSpread}\n\n{talk.floor.atmosphere} {talk.linger}',
    '{talk.checkIn.ownedOpen} {talk.checkIn.ownedClose}',
    '{talk.checkIn.ownedSpread} {talk.linger}',
  ]},
]);

registerModuleVariants('talk.check_in', [
  { when: { corruption: [0] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.check_in.ext0}',
  ]},
  { when: { corruption: [1] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.check_in.ext1}',
  ]},
  { when: { corruption: [2] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.check_in.ext2}',
  ]},
]);

registerModuleVariants('talk.encourage', [
  { when: { corruption: [0] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.deflect} {enc.reach}\n\n{enc.giveIn}{join:enc.bodyAside,enc.flush|prefix: }\n\n{enc.linger}\n\n{talk.floor.atmosphere}',
  ]},
  { when: { corruption: [1] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.accept} {enc.release}\n\n{enc.resolve}{enc.bodyAside|prefix: }\n\n{enc.linger} {talk.linger}',
  ]},
  { when: { corruption: [2] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.owned}\n\n{enc.display} {enc.stillHungry}\n\n{enc.linger}\n\n{talk.floor.atmosphere}',
  ]},
]);

registerModuleVariants('talk.compliment', [
  { when: { corruption: [0] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{comp.react}{comp.react.follow|prefix: }\n\n{comp.bodyNote} {comp.notMeant}\n\n{comp.linger}\n\n{talk.floor.atmosphere}',
  ]},
  { when: { corruption: [1] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{comp.preening}\n\n{comp.bodyNote} {comp.practicing}\n\n{comp.linger} {talk.linger}',
  ]},
  { when: { corruption: [2] }, priority: 1, weight: 3, text: [
    '{talk.moodOpener|suffix:\n\n}{comp.claiming}\n\n{comp.bodyNote} {comp.show}\n\n{comp.linger}\n\n{talk.floor.atmosphere}',
  ]},
]);
