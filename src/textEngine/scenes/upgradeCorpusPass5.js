// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile
// Pass 5 — dinner talk, hunt targets, device catalog, Phase D hubs, WL voices.
import { registerModuleVariants } from '../engine.js';

// ── dinner conversations ──────────────────────────────────────
registerModuleVariants('dinner.conv.compliment_appetite', [
  { when: { studentId: 8 }, weight: 5, text: [
    `You tell Maya you like watching her eat. She nods once and takes a larger bite. Review over.`,
  ] },
  { when: { studentId: 0, stageMin: 3 }, weight: 5, text: [
    `"I love watching you eat." Brittany points at you with the fork. "Then keep score. I'm winning."`,
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    `You compliment the appetite. Reneé tastes, nods, and demonstrates the critique by finishing the plate.`,
  ] },
  { when: { gainStance: 'opposed', corruption: [0], stageMax: 3 }, weight: 3, text: [
    `You mention how much she is enjoying it. {subject.name} flushes and eats anyway, like the compliment is a dare.`,
  ] },
]);

registerModuleVariants('dinner.conv.suggest_second', [
  { when: { studentId: 8 }, weight: 5, text: [
    `"More?" Maya is already lifting a hand. "Yes."`,
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    `You suggest the other dish. {subject.name} glances around, then orders it like the room cannot hear.`,
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 3, text: [
    `You barely finish "again" before {subject.name} has the waiter. "Obviously."`,
  ] },
]);

registerModuleVariants('dinner.conv.food_talk_dinner', [
  { when: { studentId: 10 }, weight: 5, text: [
    `Reneé dissects the sauce, then eats the evidence. Ten minutes. Two portions.`,
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    `Chloé calls the dish obscène and then orders it again to be sure.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `The critique is enthusiastic. The demonstration is a clean plate.`,
  ] },
]);

registerModuleVariants('dinner.conv.order_for_her', [
  { when: { relationship: [2, 3] }, weight: 3, text: [
    `You order the rich list without looking up. {subject.name} watches the parade arrive and says, "You know me."`,
  ] },
  { when: { gainStance: 'opposed', stageMax: 3 }, weight: 3, text: [
    `{subject.name} says "that's a lot" like a warning and then unfolds her napkin. Compliment received.`,
  ] },
]);

registerModuleVariants('dinner.conv.wine_and_cheese', [
  { when: {}, weight: 6, text: [
    `"Cheese course," you say. {subject.name} settles back. "Obviously." The board that arrives is a landscape. She maps all of it.`,
    `You do not ask about cheese. You order it. {subject.name} smiles like the table just told the truth.`,
  ] },
]);

registerModuleVariants('dinner.conv.overcomes_hesitation', [
  { when: { studentId: 1 }, weight: 5, text: [
    `Madeline says she should not. You remind her the study includes dinner. She orders the larger option and annotates nothing.`,
  ] },
  { when: { gainStance: 'reluctant', corruption: [0] }, weight: 3, text: [
    `{subject.name} hovers on "shouldn't." You wait. She picks the bigger plate like it lost the argument.`,
  ] },
]);

registerModuleVariants('dinner.conv.body_compliment', [
  { when: { studentId: 2, stageMin: 3 }, weight: 5, text: [
    `You tell Kylie she looks incredible. She angles her phone down, then away. "Working on it. Still working." Another bite.`,
  ] },
  { when: { studentId: 14 }, weight: 5, text: [
    `You tell Mary Jane she looks ripe. She laughs once, pleased, and keeps the fork moving.`,
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 4 }, weight: 2, text: [
    `You praise the middle she is leading with. She rests a hand there and eats like agreement.`,
  ] },
]);

registerModuleVariants('dinner.conv.personal_chef_story', [
  { when: { studentId: 10 }, weight: 5, text: [
    `You say the kitchen built the night around her. Reneé goes still, then finishes every course like a peer review.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `Menu in her honor. She accepts the honor with a clean plate and a second dessert.`,
  ] },
]);

registerModuleVariants('dinner.conv.endless_courses', [
  { when: { studentId: 0 }, weight: 5, text: [
    `Fourth plate. Brittany laughs. "Okay." Two hours later the laugh is still eating.`,
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    `You keep signaling. She keeps finishing. The table becomes a timeline of yes.`,
  ] },
]);

registerModuleVariants('dinner.conv.praise_capacity', [
  { when: { studentId: 3 }, weight: 5, text: [
    `"I cannot believe how much you've eaten." Serena looks at the empties. "I can. This is a different PR."`,
  ] },
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `You call the wreckage extraordinary. {subject.name} pats the vast middle. "Getting started."`,
  ] },
]);

registerModuleVariants('dinner.conv.ask_passion', [
  { when: { studentId: 5 }, weight: 5, text: [
    `You ask what she is into. Destiny talks builds for twenty minutes and the entrée vanishes like a loading screen.`,
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    `You ask what she loves. Maya says "this" and means the plate. Then she eats it.`,
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    `You ask about the work. Nadia names the dynamic and takes another bite in the same breath.`,
  ] },
]);

registerModuleVariants('dinner.conv.talk_genuinely', [
  { when: { studentId: 8 }, weight: 5, text: [
    `You put the menu down. Maya talks in short true sentences and empties two plates without noticing the count.`,
  ] },
  { when: { relationship: [2, 3] }, weight: 2, text: [
    `The talk turns real. She keeps eating through it, like honesty needs calories.`,
  ] },
]);

registerModuleVariants('dinner.conv.toast_together', [
  { when: { studentId: 9 }, weight: 5, text: [
    `"To abundance," you say. Chloé taps glass. "C'est obscène. Santé." She eats more after.`,
  ] },
  { when: { relationship: [3] }, weight: 3, text: [
    `The toast lands warm. {subject.name} drinks, then reaches for bread like the toast was permission.`,
  ] },
]);

registerModuleVariants('dinner.conv.share_a_dish', [
  { when: { studentId: 10 }, weight: 5, text: [
    `"We can share." Reneé nods, then eats the share plus the commentary.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `The shared plate becomes hers. You do not reclaim it.`,
  ] },
]);

registerModuleVariants('dinner.conv.after_dinner_stroll', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Dessert menu. Maya already has it. "All of it."`,
  ] },
  { when: { stageMin: 5, gainStance: 'acclimating' }, weight: 3, text: [
    `"I'm getting more." {subject.name} is already standing with you. Invitation unused.`,
  ] },
]);

registerModuleVariants('dinner.conv.awkward_comment', [
  { when: { studentId: 2 }, weight: 5, text: [
    `"That's a lot." Kylie\'s smile thins. "I know." She films nothing for a minute.`,
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    `You name the volume. The warmth drops a degree. She keeps the fork, slower.`,
  ] },
]);

registerModuleVariants('dinner.conv.suggest_diet', [
  { when: { studentId: 0 }, weight: 5, text: [
    `You nod at the salad. Brittany does not. "I know the menu. Sit down."`,
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    `Lighter option mentioned. She treats it like a wrong play-call and stays on her plate.`,
  ] },
]);

registerModuleVariants('dinner.conv.ask_about_weight', [
  { when: { studentId: 8 }, weight: 5, text: [
    `You ask if she has noticed. Maya looks at you. "Yes. Eat." The ease thins.`,
  ] },
  { when: { studentId: 16 }, weight: 5, text: [
    `You bring it up. Sophia sets the fork down. "I have the notes. Not at dinner."`,
  ] },
]);

registerModuleVariants('dinner.conv.second_table', [
  { when: { stageMin: 6, bodyType: ['pear', 'rotund', 'apple'] }, weight: 3, text: [
    `You move her before the chair argues. She settles and orders again like the new wood is a course.`,
  ] },
  { when: { studentId: 8, stageMin: 5 }, weight: 5, text: [
    `Better seat. Maya sits, exhales, and says "how did you know" without needing an answer.`,
  ] },
]);

registerModuleVariants('dinner.endOpen', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya sits back, full, and looks at you like the evening already decided something.',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany checks the scoreboard of empty plates and nods once. Win.',
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    '{subject.name} buttons nothing, says nothing, and looks privately pleased.',
  ] },
]);

registerModuleVariants('dinner.endClose', [
  { when: { relationship: [2, 3] }, weight: 3, text: [
    'She lets you walk her out slow. The fullness is a shared fact.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'She does not apologize for the night. She files it under repeat.',
  ] },
]);

// ── hunt targets (kill the cloned generic) ────────────────────
registerModuleVariants('hunt.man.chad_w', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Polo boy stopped blinking thirty seconds ago. The grin is still on. The choice is not his.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Half-tucked polo, unearned ease. Frat-row bait that thinks it is hunting.',
  ] },
]);
registerModuleVariants('hunt.man.tyler_b', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Shaker frozen mid-lift. Gym mirror forgotten. His nervous system clocked her first.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Post-set flush, vanity bright. He will follow a compliment into a darker hall.',
  ] },
]);
registerModuleVariants('hunt.man.zack_m', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Laptop lid still open. Page unread. He felt the room change before he saw her.',
  ] },
]);
registerModuleVariants('hunt.man.marcus_w', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'He is still pretending it is a run. His eyes are not. The loop path lost.',
  ] },
]);
registerModuleVariants('hunt.man.derek_o', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Table still talking. Derek is across the hall in his head, tray cooling.',
  ] },
]);
registerModuleVariants('hunt.man.noah_k', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Two doors down, frozen in the hallway. Scale locked him. He does not run.',
  ] },
]);
registerModuleVariants('hunt.man.jason_p', [
  { when: { stageMin: 5 }, weight: 4, text: [
    'Pen on the same word for two minutes. Library quiet works for her.',
  ] },
]);
registerModuleVariants('hunt.man.ryan_w', [
  { when: { stageMin: 6 }, weight: 4, text: [
    'Badge lanyard, no sentence. The TA posture is doing overtime and losing.',
  ] },
]);
registerModuleVariants('hunt.man.connor_b', [
  { when: { stageMin: 6 }, weight: 4, text: [
    'Frat president ease dies mid-greeting. He looked at her properly. That was the mistake.',
  ] },
]);
registerModuleVariants('hunt.man.ethan_c', [
  { when: { stageMin: 6 }, weight: 4, text: [
    'Hand on the radio, not using it. Security trained for wrong. He cannot file this.',
  ] },
]);
registerModuleVariants('hunt.man.brendan_m', [
  { when: { stageMax: 5 }, weight: 5, text: [
    'Library regular, pattern reader. She is a new pattern and he is already on the page.',
    'He watches people for a living of evenings. Tonight he is reading her and staying seated.',
  ] },
  { when: { stageMin: 6 }, weight: 5, text: [
    'He looked up when she entered and did not look down. He knows the air changed. He remains.',
    'Books forgotten. Brendan watches like a man who understands stories and still wants the ending.',
  ] },
]);
registerModuleVariants('hunt.man.prof_hayes', [
  { when: { stageMax: 5 }, weight: 5, text: [
    'Visiting professor, actually perceptive. The interesting one. He notices what others file as weather.',
    'Older, careful, already assembling a theory he will not write down.',
  ] },
  { when: { stageMin: 6 }, weight: 5, text: [
    'Recognition, not a cheap stare — like a footnote he once read just stood up in the hall.',
    'Hayes looks at her and the lecture voice fails. He has seen this described. He has not seen this.',
  ] },
]);
registerModuleVariants('hunt.man.danny_d', [
  { when: {}, weight: 5, text: [
    'Two knocks. Regular for three weeks. He always brings too much and never asks why the order grew.',
    'Danny in the dorm light, bags in both hands, smiling like this is still a normal delivery.',
  ] },
  { when: { stageMin: 9 }, weight: 6, text: [
    'He has stopped expecting her at the door. The door opens anyway. The bags go in first.',
  ] },
]);

// ── device catalog uniqueness ─────────────────────────────────
registerModuleVariants('device.catalog.feeding_mask', [
  { when: { corruption: [0] }, weight: 4, text: [
    'Locking harness, calibrated pump. She eyes the straps like a dare she has not accepted yet.',
  ] },
  { when: { corruption: [2] }, weight: 4, text: [
    'She leans into the mask the way other people lean into a kiss. Intake is the point.',
  ] },
]);
registerModuleVariants('device.catalog.auto_feeder_arm', [
  { when: { corruption: [0] }, weight: 4, text: [
    'Servo arm, steady rhythm. Feeding that does not ask. She watches the first cycle too long.',
  ] },
  { when: { stageMin: 6 }, weight: 3, text: [
    'The arm does not tire. At this size she praises the stamina.',
  ] },
]);
registerModuleVariants('device.catalog.obedience_belt', [
  { when: { gainStance: 'opposed' }, weight: 4, text: [
    'Waist harness, compliance cues. She calls it ridiculous and does not take it off.',
  ] },
  { when: { corruption: [2] }, weight: 4, text: [
    'The belt counts hesitation. She has stopped giving it reasons to beep.',
  ] },
]);
registerModuleVariants('device.catalog.auto_bloating_belt', [
  { when: { bodyType: ['apple', 'rotund'] }, weight: 3, text: [
    'Relentless swell at the middle she already leads with. Visible, scheduled, honest.',
  ] },
  { when: { corruption: [1] }, weight: 3, text: [
    'Pressure in, volume out. She keeps a hand on the drum of it.',
  ] },
]);
registerModuleVariants('device.catalog.living_furniture_rig', [
  { when: { stageMin: 8 }, weight: 4, text: [
    'Restraints as furniture, feeding as upkeep. She looks settled, not stored.',
  ] },
]);
registerModuleVariants('device.catalog.reinforced_legs', [
  { when: { stageMin: 7 }, weight: 4, text: [
    'Braces under furniture-weight thighs. Stability as courtesy, not a warning.',
  ] },
]);
registerModuleVariants('device.catalog.growth_accelerator_chamber', [
  { when: { corruption: [2] }, weight: 4, text: [
    'Sealed warmth, fast deposit. She books the session like a spa she intends to outgrow.',
  ] },
]);
registerModuleVariants('device.catalog.growth_serum_injector', [
  { when: { studentId: 16 }, weight: 5, text: [
    'Sophia reads the label twice, then offers her own arm. "Localized. Logged."',
  ] },
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia wants the volatility numbers. She still watches the curve rise with a grin.',
  ] },
]);
registerModuleVariants('device.catalog.endless_hunger_engine', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny calls it a hunger debuff and does not put the ray down.',
  ] },
  { when: { corruption: [0] }, weight: 3, text: [
    'Satiety gone at range. She swallows and looks annoyed that she wants the next plate already.',
  ] },
]);

// ── Phase D parent hubs ───────────────────────────────────────
registerModuleVariants('diary.competitive_gainer', [
  { when: { mood: ['focused'] }, weight: 2, text: [
    '{diary.competitive_gainer.s5}',
    '{diary.competitive_gainer.s7}',
  ] },
]);
registerModuleVariants('diary.machine_goddess', [
  { when: { mood: ['focused'] }, weight: 2, text: [
    '{diary.machine_goddess.s5}',
    '{diary.machine_goddess.s6}',
  ] },
]);
registerModuleVariants('diary.salon_appetit', [
  { when: { season: 'winter' }, weight: 2, text: [
    '{diary.salon_appetit.s5}',
    '{diary.salon_appetit.s7}',
  ] },
]);
registerModuleVariants('diary.artisan_gallery', [
  { when: { mood: ['content'] }, weight: 2, text: [
    '{diary.artisan_gallery.s5}',
    '{diary.artisan_gallery.s7}',
  ] },
]);
registerModuleVariants('diary.pharmacist', [
  { when: { mood: ['focused'] }, weight: 2, text: [
    '{diary.pharmacist.s5}',
    '{diary.pharmacist.s7}',
  ] },
]);

// ── wife-lessons talk: person voice, not recycled bank ────────
function wlGreet(person, extras) {
  for (const [key, variants] of extras) {
    registerModuleVariants(`wifeLessons.talk.${person}.${key}`, variants);
  }
}

wlGreet('Darlene', [
  ['s1.greeting', [{ when: {}, weight: 6, text: [
    `"Emma was quiet on the drive. That usually means she is already thinking about the rolls."`,
    `"Chloe asked if we could stay late. I said we would see. I already know we will."`,
  ] }]],
  ['s3.greeting', [{ when: {}, weight: 6, text: [
    `"The girls compare notes in the back seat now. I pretend I cannot hear the numbers."`,
  ] }]],
  ['s5.capped', [{ when: {}, weight: 6, text: [
    `"I wrote both girls' numbers on the calendar. I used the good pen. That should tell you."`,
  ] }]],
]);
wlGreet('Wanda', [
  ['s1.greeting', [{ when: {}, weight: 6, text: [
    `"I brought extra Tupperware. Last week I went home wishing I had."`,
    `"Kezia was humming in the car. Hungry humming. You learn the difference."`,
  ] }]],
  ['s4.greeting', [{ when: {}, weight: 6, text: [
    `"Lila beat me to the door. I am choosing to be proud of that."`,
  ] }]],
]);
wlGreet('Patrice', [
  ['s2.greeting', [{ when: {}, weight: 6, text: [
    `"I dressed for the kitchen heat. I still was not ready for the smell of that cake."`,
  ] }]],
  ['s5.capped', [{ when: {}, weight: 6, text: [
    `"We said the number. Nobody reached for a smaller story after."`,
  ] }]],
]);
wlGreet('Emma', [
  ['s6.greeting', [{ when: {}, weight: 6, text: [
    `"Hi. I am still thinking about the biscuits. Mom says that is allowed now."`,
  ] }]],
  ['s8.capped', [{ when: {}, weight: 6, text: [
    `"I crossed Mary Jane's line. I did not flinch. I wanted another piece after."`,
  ] }]],
]);
wlGreet('Chloe', [
  ['s6.greeting', [{ when: {}, weight: 6, text: [
    `"I asked if we could start with the sweet one. I already knew the answer."`,
    `"I want to run a recipe tonight. Mom can sit. I mean that kindly."`,
  ] }]],
]);
wlGreet('Kezia', [
  ['s6.greeting', [{ when: {}, weight: 6, text: [
    `"The kitchen already smells like we belong in it. I brought an appetite that agrees."`,
  ] }]],
]);
wlGreet('Lila', [
  ['s6.greeting', [{ when: {}, weight: 6, text: [
    `"I have been counting days since Tuesday. The lesson lives in my head that way."`,
  ] }]],
]);

// ── cultivator choices ────────────────────────────────────────
registerModuleVariants('cultivator.choice.milkshake.cream_base', [
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé nods at the cream base. "Good. Taste should leave a mark."',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.sweet_chips', [
  { when: { studentId: 10 }, weight: 4, text: [
    'Extra chips. She says it like a unit conversion she already did in her head.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.extra_butter', [
  { when: { studentId: 10 }, weight: 4, text: [
    'Richer batter. She plates a second look at the crumb before the tester asks.',
  ] },
]);
