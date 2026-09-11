// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A3 Immobility
// Pass 2 — dinner, device, compliment, check-in, immobility, talk leftovers.
import { registerModuleVariants } from '../engine.js';

// ── dinner overfill ───────────────────────────────────────────
registerModuleVariants('dinner.overfill', [
  { when: { corruption: [0], stageMin: 3, stageMax: 6 }, weight: 3, text: [
    '{subject.name} sets the fork down like it might argue. "I\'m done." She sounds surprised she means it.',
    '{subject.first} presses both palms to her middle. "That\'s… enough. I actually mean enough."',
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 3, text: [
    '{subject.name} leans back, pleased and packed. "Hold that thought. I\'m keeping this fullness overnight."',
    '{subject.first} pats the dome of herself. "Line drawn. Not because I lost — because I won."',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 4 }, weight: 2, text: [
    'Her belly has the last word. She listens, hands already there, evening closed.',
    '{subject.name}\'s middle sits forward, drum-warm. The fork is retired with honors.',
  ] },
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 4 }, weight: 2, text: [
    'She sits wider, thighs claiming the chair, and calls the meal finished from the hips up.',
    'Fullness settles low. She stays that way — hips, belly, decision.',
  ] },
  { when: { relationship: [2, 3] }, weight: 2, text: [
    'She looks at you when she stops, as if the limit needed a witness.',
    '"Walk me home like this," she says, not moving yet. The walk can wait.',
  ] },
]);

// ── dinner waiters ────────────────────────────────────────────
registerModuleVariants('dinner.waiter.bistro._f1', [
  { when: {}, weight: 4, text: [
    'The bistro waitress — softly built, apron flour-dusted — clocks {subject.name}\'s plate and smiles like a conspirator. "Another basket? I already told the kitchen."',
    'She arrives with bread before anyone asks. "You two look like you\'re doing this properly," she says, eyes on {subject.name}\'s middle.',
  ] },
  { when: { stageMin: 6 }, weight: 5, text: [
    'The waitress takes one look at how {subject.name} fills the booth and brings the large plates without comment. "More is coming."',
  ] },
]);
registerModuleVariants('dinner.waiter.italian._f1', [
  { when: {}, weight: 4, text: [
    'Nonna energy, no blood relation — she refills oil, bread, and wine in one orbit. "Eat. Tonight has one job."',
    'She sets a second basket down and squeezes {subject.name}\'s shoulder. "Good. You came hungry."',
  ] },
]);
registerModuleVariants('dinner.waiter.steakhouse._f1', [
  { when: {}, weight: 4, text: [
    'The steakhouse server surveys the wreckage of the last course with professional pride. "Kitchen\'s still hot."',
    'She is built like she believes in the menu. "Next cut?" she asks, already sure of the answer.',
  ] },
]);
registerModuleVariants('dinner.waiter.french._f1', [
  { when: {}, weight: 4, text: [
    'The sommelier refills without theatre. "The pairing wants another course. So does she," she adds, glancing at {subject.name}.',
    'Crisp blazer, generous figure, no wasted words. "Encore?" The bottle is already tilting.',
  ] },
]);
registerModuleVariants('dinner.waiter.japanese._f1', [
  { when: {}, weight: 4, text: [
    'She replaces chopsticks, pours water, and leaves a new card. Silence as hospitality. {subject.name} understands.',
    'A small bow, a larger plate. She does not narrate. The food does.',
  ] },
]);
registerModuleVariants('dinner.waiter.private_club._f1', [
  { when: {}, weight: 4, text: [
    'Club livery, unhurried mass, a menu card that appears like a magic trick. "Whenever you are ready. The kitchen already is."',
  ] },
]);
registerModuleVariants('dinner.waiter.chefs_table._f1', [
  { when: {}, weight: 4, text: [
    'The floor manager materializes — tailored black, immense, tasting-menu posture. "The kitchen assumed you would continue."',
  ] },
]);
registerModuleVariants('dinner.waiter.home_dinner._f1', [
  { when: {}, weight: 4, text: [
    'You carry the next course from the kitchen. {subject.name} is already making space on the table — and on herself.',
    'Home service: no apron, no performance. Just more food and the person it is for.',
  ] },
  { when: { relationship: [2, 3] }, weight: 5, text: [
    'You bring the next plate yourself. She watches the doorway like the food is a love letter.',
  ] },
]);
registerModuleVariants('dinner.waiter.brunch_hall._f1', [
  { when: {}, weight: 4, text: [
    'Floral apron, extra coffee, a pastry card she slides toward {subject.name} first. "Bottomless means bottomless."',
  ] },
]);
registerModuleVariants('dinner.waiter.atelier._f1', [
  { when: {}, weight: 4, text: [
    'The maître d\' arrives like weather — enormous, impeccable, already deciding the next course for you.',
  ] },
]);

// ── devices ───────────────────────────────────────────────────
const DEVICE_IDS = [
  'feeding_mask', 'auto_feeder_arm', 'obedience_belt', 'auto_bloating_belt',
  'living_furniture_rig', 'reinforced_legs', 'growth_accelerator_chamber',
  'growth_serum_injector', 'endless_hunger_engine',
];

for (const id of DEVICE_IDS) {
  registerModuleVariants(`device.psych.${id}`, [
    { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
      'She tells herself this is research. Her body files a different report.',
      'She flinches at the first cycle, then stays. Staying is the whole story.',
    ] },
    { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
      'She keeps her face carefully bored. The rest of her is paying attention.',
      'A private yes hides under the compliance. The device does not need her to say it.',
    ] },
    { when: { relationship: [2, 3] }, weight: 2, text: [
      'She looks at you when the cycle starts, as if the machine were your hand.',
      'Hardware, yes — but she is answering you, not the manual.',
    ] },
    { when: { stageMin: 8 }, weight: 2, text: [
      'At her size the device is less novelty than infrastructure.',
      'The machine works; the mass agrees; the room adjusts.',
    ] },
  ]);
  registerModuleVariants(`device.sensation.${id}`, [
    { when: { bodyType: ['apple', 'rotund'] }, weight: 2, text: [
      'pressure gathering at the middle, belly taking the lesson first',
      'forward warmth, the gut answering before the rest of her does',
    ] },
    { when: { bodyType: ['pear', 'fertility_goddess'] }, weight: 2, text: [
      'heat settling low, hips and thighs taking the surplus',
      'a widening yes from the waist down',
    ] },
    { when: { bodyType: ['topHeavy', 'voluptuous'] }, weight: 2, text: [
      'warmth blooming high, chest heavy with the cycle',
      'upper-body plushness answering first, the rest catching up',
    ] },
    { when: { fullnessMin: 0.8 }, weight: 2, text: [
      'sensation stacked on fullness already present',
      'the device adding to a middle that was already occupying the room',
    ] },
  ]);
}

// ── compliment ────────────────────────────────────────────────
registerModuleVariants('comp.bodyNote', [
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 3 }, weight: 2, text: [
    'The compliment has somewhere obvious to land — hips, thighs, the wide warm seat of her.',
    'At {subject.lbs} lbs the lower half of her is the argument, and it has already won.',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 3 }, weight: 2, text: [
    'You are complimenting a belly that arrived first and stayed.',
    'At {subject.lbs} lbs her middle is the portrait. Everything else is the frame.',
  ] },
  { when: { bodyType: ['topHeavy', 'voluptuous'], stageMin: 3 }, weight: 2, text: [
    'The praise has a shelf to sit on — heavy, warm, already listening.',
    'At {subject.lbs} lbs the upper half of her takes a compliment like a toast.',
  ] },
  { when: { isGaining: true, stageMin: 2 }, weight: 2, text: [
    'This week added something the compliment can point at without squinting.',
    'The newest softness is still settling. You named it anyway.',
  ] },
]);

registerModuleVariants('comp.react', [
  { when: { gainStance: 'opposed', corruption: [0], stageMin: 2, stageMax: 5 }, weight: 3, text: [
    `"Don't," {subject.name} says, too fast, hands already on the place you meant.`,
    `"You're not supposed to like it," she mutters. She does not specify who isn't.`,
  ] },
  { when: { gainStance: 'secret', corruption: [0], stageMin: 2, stageMax: 5 }, weight: 3, text: [
    `{subject.name} goes pink and pleased and pretends it is the room. "Oh."`,
    `She looks down at herself like the compliment confirmed a private score.`,
  ] },
  { when: { archetype: 'influencer', stageMin: 4 }, weight: 3, text: [
    `"Say it again for the camera," {subject.name} says, then remembers there isn't one. "Say it anyway."`,
  ] },
  { when: { archetype: 'quiet', stageMin: 4 }, weight: 3, text: [
    `{subject.name} nods once. The rest of the reaction happens in her hands, on her middle.`,
    `"Okay," she says, which from her is a paragraph.`,
  ] },
]);

registerModuleVariants('comp.show', [
  { when: { bodyType: ['apple', 'rotund'], stageMin: 5 }, weight: 2, text: [
    'She turns enough that the belly leads. The compliment has a target now.',
    'She lifts her shirt a fraction. The middle does the rest of the showing.',
  ] },
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 5 }, weight: 2, text: [
    'She shifts her weight so the hips tell on themselves.',
    'A slow turn. Thighs, seat, the wide fact of her.',
  ] },
]);

// ── check-in ──────────────────────────────────────────────────
registerModuleVariants('talk.checkIn.greetQuote', [
  { when: { mood: ['happy', 'cheerful', 'excited'] }, weight: 3, text: [
    `"Hey — I was hoping you'd come by."`,
    `"Perfect timing,"`,
  ] },
  { when: { mood: ['tired', 'stressed'] }, weight: 3, text: [
    `"Oh. Hi." She sounds like the week got here first.`,
    `"Hey. Sit. I need a minute that isn't homework."`,
  ] },
  { when: { hungerTierMin: 3 }, weight: 3, text: [
    `"Please tell me you brought something."`,
    `"Hi. Food first. Then office hours."`,
  ] },
  { when: { corruption: [2], stageMin: 4 }, weight: 2, text: [
    `"There you are. I was getting hungry waiting."`,
    `"Good. I wanted an audience."`,
  ] },
]);

// ── immobility ────────────────────────────────────────────────
registerModuleVariants('immob.settledState', [
  { when: { bodyType: ['apple', 'rotund'], stageMin: 10 }, weight: 2, text: [
    'Her belly is the room\'s furniture now — forward, warm, not negotiating exits.',
    'She rests as a climate of middle. Everything else is weather around it.',
  ] },
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 10 }, weight: 2, text: [
    'Hips and thighs have become the floor plan. She lives in it.',
    'The lower half of her is the settlement. The rest of her keeps it company.',
  ] },
  { when: { relationship: [3], stageMin: 10 }, weight: 2, text: [
    'She is the house. You are the one who knows how to come home to it.',
    'Immobile, adored, arranged for your arrival — she does not need to move to receive you.',
  ] },
  { when: { corruption: [2], stageMin: 10 }, weight: 2, text: [
    'She chose this stillness the way she chose the last thousand bites.',
    'Rest is not a compromise. Rest is the prize.',
  ] },
]);

registerModuleVariants('immob.refit', [
  { when: { corruption: [0] }, weight: 2, text: [
    'New clothes that fit. She holds the old size in her lap a second too long, then lets it go.',
    'The tape is honest. She flushes, then nods. Honesty is easier than the old seams.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'She orders the next size like a forecast. "Leave room," she adds. "I\'m not finished."',
    'The fitting is a celebration with pins in it.',
  ] },
]);

registerModuleVariants('immob.comfort.bed', [
  { when: { relationship: [2, 3] }, weight: 2, text: [
    'The new frame holds her. She pats the space beside what is left of the mattress. "You. Here."',
    'She settles, then looks at you like the bed was built for two jobs: her mass, your attention.',
  ] },
]);

// ── talk leftovers ────────────────────────────────────────────
registerModuleVariants('talk.suggest_indulgence.b00._f1', [
  { when: {}, weight: 4, text: [
    'You mention food the way you mention weather. {subject.name}\'s attention arrives before the sentence ends.',
    'The idea of more lands in the room. Her pupils do the rest of the agreeing.',
  ] },
  { when: { hungerTierMin: 2 }, weight: 5, text: [
    'You barely start the suggestion. She is already hungry enough to finish it for you.',
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b00._f4', [
  { when: {}, weight: 4, text: [
    'The idea stays. She will call it her own idea later. You can live with that.',
    'She keeps talking. Her hand has already voted.',
  ] },
]);
registerModuleVariants('talk.refusal.command_finish._f1', [
  { when: {}, weight: 4, text: [
    '{subject.name} shakes her head, palm on a middle that has already filed the paperwork. "I can\'t. Not another bite. I want to. I can\'t."',
    '"Stop," she says, and means the physics. Appetite is still standing in the doorway.',
  ] },
]);

registerModuleVariants('talk.discontentCoda', [
  { when: { discontentTier: 1, stageMin: 5 }, weight: 2, text: [
    ` Courtesy intact. The extra of her turns a few degrees away, as if even mass can sulk.`,
  ] },
  { when: { discontentTier: 2, hungerTierMin: 2 }, weight: 2, text: [
    ` She is hungry and unhappy, which is a dangerous pairing. The answers stay short.`,
  ] },
]);

// ── settling feed ─────────────────────────────────────────────
registerModuleVariants('stream.chat.scenario.eating', [
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    'the shirt is losing and I am thriving',
    'she said one more bite like 12 bites ago',
  ] },
  { when: { stageMin: 7 }, weight: 2, text: [
    'the chair has entered the chat',
    'mass + mukbang = content',
  ] },
  { when: { audienceTier: 'late', corruption: [2] }, weight: 2, text: [
    'she KNOWS we\'re watching the belly. she likes it.',
    'unbothered. unbuttoned. uploading.',
  ] },
]);

registerModuleVariants('stream.chat.scenario.struggling', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'physics said no, destiny said one more',
    'she is negotiating with a plate and the plate is winning',
  ] },
  { when: { challengeType: 'speed' }, weight: 2, text: [
    'speed round vs a whole person. close match.',
    'chat slow down she cannot',
  ] },
]);

registerModuleVariants('stream.chat.scenario.teased', [
  { when: { corruption: [2] }, weight: 2, text: [
    'she\'s using the chat as seasoning',
    'the bullying is just garnish at this point',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'talk shit all you want she still finishing',
    'chat being loud, belly being louder',
  ] },
]);

registerModuleVariants('set.feed.preferred', [
  { when: { relationship: [3] }, weight: 2, text: [
    'You already know the taste. She already knows your hand. The rest is ritual.',
    'Preference met, devotion visible. She eats like the argument ended weeks ago.',
  ] },
  { when: { corruption: [2], stageMin: 10 }, weight: 2, text: [
    'She does not thank you. She feeds, and the thanks is the way she settles deeper.',
    'Hand to mouth to vastness. She runs this. You are the good instrument.',
  ] },
]);
