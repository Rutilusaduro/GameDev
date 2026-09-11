// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych, A3 Immobility
// Linger codas for every scene family that routes through appendV2Depth,
// plus longer skeletons for clothing / dinner / recap / campus / milestone.
import { registerPool, registerModuleVariants } from '../../engine.js';

// ── overhaul.linger — FULL SENTENCE. Generic coda so no scene goes quiet.
registerPool('overhaul.linger', [
  { when: {}, text: [
    'She stays in the moment a little longer than manners require. You let her.',
    'Warmth hangs in the air after she stops moving. The extra of her is still arriving.',
    'You watch her settle. Softness keeps a calendar even when she pretends not to.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs a hem and pretends the pull is the garment, not the body filling it.',
    'A snack wrapper crackles in her lap. She looks at it like it appeared without her.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'When she stands, the chair keeps a dent. She notices. She sits back down.',
    'Her belly takes a share of the goodbye. She rests a hand there, fond and distracted.',
  ]},
  { when: { stageMin: 7, stageMax: 9 }, weight: 2, text: [
    'The doorway has an opinion. She negotiates with a hip and a smile and wins.',
    'She is slower to leave than she used to be. The leaving is part of the show.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'She does not get up. Getting up is a project for later. You stay.',
    'Vast, warm, content. The room has rearranged itself around the fact of her.',
  ]},
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    'She wants the looking to continue. She makes sure there is more to look at.',
  ]},
]);

registerPool('overhaul.linger.food', [
  { when: {}, text: [
    'The swallow finishes traveling. She breathes around it, pleased with the work.',
    'She checks her middle the way some people check a watch. Right on time.',
    'Another bite would be greedy. She takes it anyway, unhurried.',
  ]},
  { when: { stageMax: 3 }, weight: 2, text: [
    'A tight swell under her shirt, still deniable if she keeps talking. She keeps talking.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'There is so much of her that fullness is weather. You can watch it move.',
  ]},
  { when: { feedRoom: 'past' }, weight: 3, text: [
    'She is packed and still making room, a thick satisfied press she leans into.',
  ]},
]);

registerPool('overhaul.linger.social', [
  { when: {}, text: [
    'The conversation ends. The closeness does not. She eats the last thing in reach.',
    'She says your name once more, like a bookmark. Then she stays seated.',
    'Rapport sits in the chair with her, warm, a little sticky, not leaving yet.',
  ]},
  { when: { corruption: [0], stageMax: 4 }, weight: 2, text: [
    'She laughs too bright and reaches for another bite like the laugh gave permission.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"Don't go yet," she says, already feeding herself. "I'm not done being looked at."`,
  ]},
]);

registerPool('overhaul.linger.ceremony', [
  { when: {}, text: [
    'The number is only the receipt. The body is the event, still happening in front of you.',
    'She steps off and the platform keeps a memory of her. So do you.',
    'Someone should clap. Nobody does. The quiet is the applause.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'Fabric files a quiet complaint. She answers by standing there, heavier, proud of the noise.',
  ]},
]);

registerPool('overhaul.linger.campus', [
  { when: {}, text: [
    'Campus keeps pretending this is ordinary. Her walk home argues otherwise.',
    'A stranger looks twice. She pretends not to notice. She notices.',
    'The path back to the hall is downhill. She still takes it slow.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The quad path is wide. She still takes it slower, a soft procession of one.',
  ]},
]);

registerPool('overhaul.linger.hunt', [
  { when: {}, text: [
    'Heat off her body reaches him before her greeting does.',
    'He looks at the extra of her and forgets the line he prepared.',
    'Softness fills the space between them. He stays in it.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'She fills the approach. He has already lost the argument with his own attention.',
  ]},
]);

registerPool('overhaul.linger.opposition', [
  { when: {}, text: [
    'Clipboard, lanyard, appetite. The hall still smells like dinner after they leave.',
    'They write concern. Your residents keep eating. The paper does not get the last word.',
    'Policy talks. The lounge answers with crumbs and a wider sit.',
  ]},
]);

registerPool('overhaul.linger.evolved', [
  { when: {}, text: [
    'The extra of her keeps arriving after the beat ends. You let it.',
    'She stays in the warmth a little longer than the scene required.',
    'Softness takes a bow. She does not hurry the looking.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'Soft mass settles. The room rearranges around her and does not complain.',
  ]},
]);

registerPool('overhaul.linger.cg', [
  { when: {}, text: [
    'Priya treats the number like a rival she can out-eat. She wants it higher.',
    'She checks the board again. Hunger is the strategy. Softness is the score.',
    'The extra of her is the argument. She keeps making it.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'She fills more of the frame than last week. The corkboard already knows.',
  ]},
]);

registerPool('overhaul.cg.kitchen', [
  { when: {}, text: [
    'Priya takes the hall kitchen first. Hot pans, extra portions, no audience but you.',
    'Floor kitchen first. She eats standing so the mass can settle on the walk back.',
    'The kitchen light finds her mid-bite. She does not stop for it.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The kitchen already knows her appetite. She gives it more to work with.',
  ]},
]);

registerPool('overhaul.linger.hive', [
  { when: {}, text: [
    'Lavender warmth holds after the tribute. Maya records it without writing anything down.',
    'The Nest keeps the heat. Soft mass at the center, quiet and fed.',
    'She accepts the offering the way a queen accepts weather: as hers.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'The room rearranges around her. Recruits will feel this in the walls later.',
  ]},
]);

registerPool('overhaul.linger.fair', [
  { when: {}, text: [
    'Ribbon still on, belly still working. The fair was only the first course.',
    'She keeps the number like a souvenir and the fullness like a prize.',
    'Judges already left. She is still eating. The ranking that matters is still in her.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The scale is done. She is not. Soft mass keeps arriving in the afterglow.',
  ]},
]);

registerPool('overhaul.linger.device', [
  { when: {}, text: [
    'The machine goes quiet. Her body keeps the instruction.',
    'Warmth stays in the padding after the cycle. She stays with it.',
    'She breathes around the extra. The workshop smells like cream and metal.',
  ]},
]);

registerPool('overhaul.linger.body', [
  { when: {}, text: [
    'You take her in again before she covers. Soft mass, heat, the extra that was not here last week.',
    'She lets the garment lose. The body that beat it stays, warm and obvious.',
    'A seam remembers the fight. She does not. She is already thinking about food.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of her to look at. She knows. She does not hurry the looking.',
  ]},
]);

registerPool('overhaul.linger.night', [
  { when: {}, text: [
    'The hall is quiet enough to hear a mini-fridge working too hard somewhere.',
    'Lights-out is a suggestion. Hunger keeps its own hours.',
    'Your keys tick against the rail. She is still awake behind at least one door.',
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She came hungry. She will leave heavier if you let her.',
  ]},
]);

registerPool('overhaul.linger.media', [
  { when: {}, text: [
    'The ring light stays on a second too long. She uses it. The belly photographs well.',
    'Chat would have opinions. The room already has one: more.',
    'She thumbs the recording off and keeps the pose. The camera was never the point.',
  ]},
  { when: { studentId: 2 }, weight: 3, text: [
    'Kylie angles for one more shot. The shot is her, overflowing the frame on purpose.',
  ]},
  { when: { studentId: 5 }, weight: 3, text: [
    'Destiny kills the stream and keeps eating. The audience can wait. The plate cannot.',
  ]},
]);

registerPool('overhaul.linger.diary', [
  { when: {}, text: [
    'She writes it down like the page might argue. The page does not argue.',
    'The entry ends. The hunger that wrote it does not.',
    'She dots the date harder than the rest, as if that made it official.',
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    'She almost tears the page out. She does not. She dates it instead.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She rereads the last line and adds a second helping in the margin.',
  ]},
]);

registerModuleVariants('cloth.scene', [
  { when: {}, weight: 3, text: [
    '{cloth.discovery} {cloth.struggle} {cloth.moment} {cloth.reaction}{cloth.aftermath|prefix: } {overhaul.linger.body}',
    '{cloth.discovery} {cloth.failBeat} {cloth.reaction} {overhaul.linger}',
  ]},
]);

registerModuleVariants('week.recap', [
  { when: {}, weight: 3, text: [
    '{week.recap.beat} {week.recap.line}\n\n{weekly.linger}',
    '{week.recap.beat} {week.recap.line} {overhaul.linger.social}',
  ]},
]);

registerModuleVariants('dinner.ending', [
  { when: {}, weight: 3, text: [
    '{dinner.endOpen} {dinner.endClose}\n\n{dinner.linger}',
    '{dinner.endOpen} {dinner.endClose} {overhaul.linger.food}',
  ]},
]);

registerModuleVariants('milestone', [
  { when: {}, weight: 3, text: [
    '{milestone.body} {cloth.scene} {milestone.crest} {milestone.line}\n\n{overhaul.linger.ceremony}',
  ]},
]);

registerModuleVariants('campus.scene', [
  { when: {}, weight: 3, text: [
    '{campus.localeIntro} {campus.moveSentence} {campus.spaceObs|prefix: } {overhaul.linger.campus}',
    '{campus.moveSentence} {campus.seenBeat|prefix: }{campus.spaceObs|prefix: } {overhaul.linger}',
  ]},
]);

registerModuleVariants('feed.react', [
  { when: {}, weight: 3, text: [
    '{feed.react.beat} {feed.react.body} {feed.react.line} {overhaul.linger.food}',
  ]},
]);

// Shape: WORD. Pantry item name from globals.itemLabel.
registerPool('item.label', [
  { when: {}, text: [(ctx) => ctx.globals?.itemLabel || 'snack'] },
]);

// Shape: FULL SENTENCE. Pantry item landing.
registerPool('pantry.use', [
  { when: {}, text: [
    'You produce the {item.label}. Her attention arrives before any objection does.',
    'She asks if the {item.label} is for her, already reaching. It does not survive the hour.',
    'You leave the {item.label} where she will find it. She finds it. She finishes it.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The {item.label} wrap is already open. Her belly takes the rest as if the pantry were a course on the hall menu.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She does not pretend the {item.label} was accidental. She eats it in front of you and waits to be watched.',
  ]},
]);

registerPool('pantry.use.share', [
  { when: {}, text: [
    'You split it. She still takes the larger half, then looks at you like that was the point.',
    'Two forks. One plate. She leans in until the sharing is mostly her.',
    'She offers you a bite, then eats it herself, laughing, already reaching again.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'Sharing, she calls it. Her belly takes the last bite anyway and she smiles like you agreed.',
  ]},
]);

registerPool('pantry.use.binge', [
  { when: {}, text: [
    'She stops pretending this is a snack. The whole thing goes, fast, warm, watched.',
    'She eats it standing. Wrapper gone. Breath caught. Hand on the new press of herself.',
    'No plates. No pause. She finishes it and looks down like the work pleased her.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'A binge in the pantry light. Soft mass working. She wants you to see the finish.',
  ]},
]);

// Shape: FULL SENTENCE. Locked week-plan payoff.
registerPool('planner.beat', [
  { when: {}, text: [
    'The slot you locked last week comes due. She shows up fed and a little closer.',
    'Attention, scheduled. She still eats like it was her idea.',
    'The plan holds. So does she. Warmer, rounder, expected.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The venue you picked still fits her, barely. She treats that as a compliment.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She kept the appointment like a date with her own appetite. You both knew.',
  ]},
]);

// Shape: FULL SENTENCE. Floor check-in atmosphere before the scene body.
registerPool('floor.checkin.open', [
  { when: {}, text: [
    'The lounge holds the check-in the way a warm room holds a body. Close. Unhurried.',
    'Snack wrappers tick in the trash. She stays seated like leaving would be work.',
    'A fridge kicks on down the hall. She notices. She does not get up.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She sits in the chair like she is borrowing it. The waistband is only a little honest tonight.',
  ]},
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'When she shifts, the chair answers. Soft mass settling, a slow sway after she stills.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'She fills the seat in every direction that matters. The lounge was built for this and is still catching up.',
  ]},
]);

registerPool('floor.checkin.heat', [
  { when: {}, text: [
    'You take her in before the question does. Heat, extra, the week sitting on her.',
    'Her middle keeps a share of the conversation. She rests a hand there without performing it.',
    'The check-in is paperwork. The body in the chair is the actual agenda.',
  ]},
  { when: { stageMax: 3 }, weight: 2, text: [
    'A softer line at the waist. A shirt that meets her like a rumor she has not admitted yet.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    'Belly first. A warm curve her waistband is negotiating with in public.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of her to look at. She knows. She does not hurry the looking.',
  ]},
]);

registerPool('floor.checkin.result.feed', [
  { when: {}, text: [
    'The swallow finishes traveling. She breathes around it, pleased with the work.',
    'She checks her middle the way some people check a watch. Right on time.',
    'Another bite would be greedy. She takes it anyway, unhurried.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'There is so much of her that fullness is weather. You can watch it move.',
  ]},
]);

registerPool('floor.checkin.result.talk', [
  { when: {}, text: [
    'The conversation ends. The closeness does not. She stays seated.',
    'She says your name once more, like a bookmark, then reaches for whatever is left.',
    'Rapport sits in the chair with her. Warm. A little sticky. Not leaving yet.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"Don't go yet," she says. "I'm not done being looked at."`,
  ]},
]);

registerPool('floor.checkin.hall', [
  { when: {}, text: [
    'The whole floor leans toward the food like it was the point of the meeting.',
    'Chairs scrape closer. Someone laughs with her mouth full. Nobody apologizes.',
    'The lounge smells like a decision you already made for them.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The heavier residents claim the reinforced seats first. The food still reaches the back row.',
  ]},
]);
