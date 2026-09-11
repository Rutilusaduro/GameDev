// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// Extra talk topics: linger, notice room, midnight habit.
import { registerPool } from '../engine.js';
import './dorm/index.js';

registerPool('talk.linger.open', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'You stay. Leftover warmth is already on the bed like a third person.',
    'The official reason ended. Kitchen heat did not.',
    'You do not stand. Foil-warmth keeps the visit open past the script.',
  ] },
  { when: {}, text: [
    'You do not stand. The visit stretches past the official reason for it.',
    'She makes space on the bed without calling it that.',
    'The clock on her desk is ignored by both of you.',
  ] },
]);

registerPool('talk.linger.body', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Close up, leftover warmth is honest — a belly that stayed when the tray left.',
    'Her sleep shirt rides. Galley foil smell on her. She tugs the hem and does not succeed.',
  ] },
  { when: { leftoverFed: true, stageMin: 4, stageMax: 7 }, weight: 3, text: [
    'When she leans, leftover heat arrives first. She watches you notice and keeps leaning.',
    'Her thigh is warm. Last night\'s tray is still in the room with her.',
  ] },
  { when: { leftoverFed: true, stageMin: 8 }, weight: 3, text: [
    'Staying means leftover and this visit stacked in the same climate. The bed is her.',
    'You sit where she indicates. The indication is a shift of occupied, yielding weight.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You were here after hours. Lingering now is the same permission in better light.',
  ] },
  { when: { stageMax: 3 }, text: [
    'Close up, the new softness is honest — a belly that stays when she laughs.',
    'Her sleep shirt rides when she sits back. She tugs it and does not succeed.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'Her thigh is warm against the mattress edge. She does not pull it back.',
    'When she leans, her belly arrives first. She watches you notice and keeps leaning.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Staying means being claimed by the heat of her. The bed has one climate and it is her.',
    'You sit where she indicates. The indication is a shift of immense, yielding weight.',
  ] },
  { when: {}, text: [
    'The extra minutes fill with warmth and the quiet decision not to leave yet.',
    'She tucks a foot under herself and stays. So do you.',
    'Conversation slows. Appetite does not.',
  ] },
]);

registerPool('talk.linger.line', [
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter business can wait," Tiffany says, already pouring.`,
  ] },
  { when: { studentId: 9 }, weight: 4, text: [
    `"Americans rush," Chloé murmurs. "Sit. There is still cheese."`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"You don't have to go yet," {subject.name} says, then looks like she did not mean to say it.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"Stay," {subject.name} says, hand on her middle. "I'm better when you're here."`,
  ] },
  { when: {}, text: [
    `"Don't go yet," {subject.name} says, and means the food and you both.`,
    `{subject.name} pats the mattress. "Sit. I'm not done talking."`,
    `"Stay for one more," {subject.name} says, and the 'one' is already lying.`,
  ] },
]);

registerPool('talk.linger', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.linger.open} {talk.linger.body}\n\n{talk.linger.line}',
    '{talk.moodOpener|suffix:\n\n}{talk.linger.line} {talk.linger.body}',
    '{talk.linger.open}\n\n{talk.linger.line} {talk.linger.body}',
  ] },
]);

registerPool('talk.notice_room.open', [
  { when: {}, text: [
    'You look at the room the way an RA is supposed to, then the way you actually do.',
    'The upgrades have a smell — new wood, warm lamps, food that lives here now.',
    'Her space has been arranged around appetite. You say so without the memo language.',
  ] },
]);

registerPool('talk.notice_room.line', [
  { when: {}, text: [
    `"You did this for me," {subject.name} says, not quite a question.`,
    `{subject.name} follows your gaze to the chair, the fridge, the light. "It's better," she admits.`,
    `"If housing asks, it was always like this," {subject.name} says.`,
    `"Don't write this up as furniture," {subject.name} says. "Write it as me."`,
  ] },
]);

registerPool('talk.notice_room.body', [
  { when: { stageMax: 4 }, text: [
    'She tests the chair like it might still be a trick. It holds. She melts a little.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, text: [
    'She sits and the new furniture accepts her without a sound. Her shoulders drop.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The room was built outward to meet her. She looks like the reason it exists.',
  ] },
  { when: {}, text: [
    'The space fits her more than it used to. She notices. She likes noticing.',
    'She tests a chair with her full weight. It holds. She looks almost grateful.',
    'The room has learned her outline. She wears that knowledge easily.',
  ] },
]);

registerPool('talk.notice_room', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.notice_room.open} {talk.notice_room.body}\n\n{talk.notice_room.line}',
    '{talk.notice_room.open}\n\n{talk.notice_room.line} {talk.notice_room.body}',
    '{talk.notice_room.body} {talk.notice_room.line}',
  ] },
]);

registerPool('talk.midnight_habit.open', [
  { when: {}, text: [
    'You mention last night without making it a report. She knows which night.',
    'The after-hours version of her is still sitting in the room, even at noon.',
    'You knock on the memory instead of the door. She answers both.',
  ] },
]);

registerPool('talk.midnight_habit.line', [
  { when: { habitId: 'midnight_snack' }, weight: 3, text: [
    `"The drawer is a problem," {subject.name} says, and smiles like it is not.`,
    `"I was hungry. I am still hungry. That's the update," {subject.name} says.`,
  ] },
  { when: { habitId: 'scale_private' }, weight: 3, text: [
    `"The number went up," {subject.name} says. She does not sound sorry.`,
  ] },
  { when: { habitId: 'open_door' }, weight: 3, text: [
    `"I leave it unlatched now," {subject.name} says. "In case."`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"You weren't supposed to see that," {subject.name} says, then: "I'm glad you did."`,
  ] },
  { when: {}, text: [
    `{subject.name} looks at her hands. "You walk late. I eat late. That's the overlap."`,
    `"You saw me," {subject.name} says, not quite sorry.`,
    `{subject.name} shrugs, then smiles. "Midnight is when I'm honest."`,
  ] },
]);

registerPool('talk.midnight_habit', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.midnight_habit.open}\n\n{talk.midnight_habit.line} {talk.linger.body}',
    '{talk.midnight_habit.open} {talk.midnight_habit.line}',
    '{talk.midnight_habit.line}\n\n{talk.linger.body}',
  ] },
]);

registerPool('talk.weigh_together.open', [
  { when: {}, text: [
    'The scale in her room is no longer furniture. You nod at it. She already knows.',
    'You offer a private number, no log, no lounge. She sits before she answers.',
    'The curtain over the scale is a joke you both stopped telling.',
  ] },
]);

registerPool('talk.weigh_together.line', [
  { when: { corruption: [0] }, weight: 2, text: [
    `"Don't put it in the file," {subject.name} says. She steps on anyway.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"Say it out loud," {subject.name} says. "I like hearing it from you."`,
  ] },
  { when: {}, text: [
    `"Fine," {subject.name} says. "But you stay."`,
    `{subject.name} peels the curtain back. "You wanted this. Watch."`,
    `"The number's been climbing," {subject.name} says. "That's why you're here."`,
  ] },
]);

registerPool('talk.weigh_together.body', [
  { when: { stageMax: 3 }, text: [
    'The platform takes a softness she still tries to stand smaller than. The display does not cooperate.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'She has to settle her belly before the readout steadies. She does not apologize for the wait.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The scale complains in a language she now finds funny. She laughs with her whole weight.',
  ] },
  { when: {}, text: [
    'Warmth, plastic, a number that belongs in this room now.',
    'She watches your face instead of the digits. The digits still arrive.',
    'The private weigh-in is the most honest conversation on the floor.',
  ] },
]);

registerPool('talk.weigh_together', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.weigh_together.open} {talk.weigh_together.body}\n\n{talk.weigh_together.line}',
    '{talk.weigh_together.open}\n\n{talk.weigh_together.line} {talk.weigh_together.body}',
    '{talk.weigh_together.line}\n\n{talk.weigh_together.body}',
  ] },
]);

registerPool('talk.raid_stash.open', [
  { when: {}, text: [
    'The snack drawer has a personality. Tonight it is generous.',
    'You both pretend this is inventory. It is not inventory.',
    'Wrappers already in the bin. The rest of the stash still waiting.',
  ] },
]);

registerPool('talk.raid_stash.line', [
  { when: {}, text: [
    `"Take one," {subject.name} says, already taking three.`,
    `"I bought these for emergencies," {subject.name} says. "This counts."`,
    `{subject.name} tosses you a bar and keeps the bigger bag.`,
  ] },
]);

registerPool('talk.raid_stash.body', [
  { when: { stageMax: 3 }, text: [
    'She eats standing, quick, like someone who still thinks this is a snack.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'She sits to eat. The drawer stays open. So does her appetite.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The stash was sized for a smaller resident. She finishes it like a footnote.',
  ] },
  { when: {}, text: [
    'Sugar and salt and the quiet of a room that has decided food lives here.',
    'She licks a finger. The drawer does not close.',
    'Sharing was the excuse. Eating is the event.',
  ] },
]);

registerPool('talk.raid_stash', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.raid_stash.open} {talk.raid_stash.body}\n\n{talk.raid_stash.line}',
    '{talk.raid_stash.open}\n\n{talk.raid_stash.line} {talk.raid_stash.body}',
    '{talk.raid_stash.line}\n\n{talk.raid_stash.body}',
  ] },
]);

registerPool('talk.refit_wardrobe.open', [
  { when: {}, text: [
    'You bring a kit and an honest eye. The clothes have been losing all week.',
    'She already knows why you are here. The waistband announced it first.',
    'Needle, extra fabric, a tape that does not lie. The room gets quiet.',
  ] },
]);

registerPool('talk.refit_wardrobe.line', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    `"It was already tight this morning," {subject.name} says. "Don't look at me like that."`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"Make them honest," {subject.name} says. "I want to feel the new size."`,
  ] },
  { when: {}, text: [
    `"If you let them out, I'll fill them again," {subject.name} says.`,
    `{subject.name} holds the fabric away from her middle. "See? It was already arguing."`,
    `"Do it," {subject.name} says. "I am tired of pretending these still fit."`,
  ] },
]);

registerPool('talk.refit_wardrobe.body', [
  { when: { stageMax: 3 }, text: [
    'The extra inch of fabric is small. The relief on her face is not. She breathes and the shirt stays closed.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'You work around a belly that keeps arriving while you sew. She watches, fond, as the waistband learns her name again.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The garment becomes a project of geography. She sits. You sew around the heat of her. The new ease is already a promise.',
  ] },
  { when: {}, text: [
    'Thread, warmth, a body that has outgrown last week\'s numbers. The clothes catch up for now.',
    'She turns so you can mark the seam. Softness fills the space the old size left empty.',
    'When she stands, the fabric holds. She tests it with a breath. Then she looks at you like dessert.',
  ] },
]);

registerPool('talk.refit_wardrobe', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.refit_wardrobe.open} {talk.refit_wardrobe.body}\n\n{talk.refit_wardrobe.line}',
    '{talk.refit_wardrobe.open}\n\n{talk.refit_wardrobe.line} {talk.refit_wardrobe.body}',
    '{talk.refit_wardrobe.line}\n\n{talk.refit_wardrobe.body}',
  ] },
]);

registerPool('talk.leftover_plate.open', [
  { when: {}, text: [
    'You bring a foil tray from the galley. The fridge light has been working overtime.',
    'Kitchen leftovers, still warm. You knock with both hands full.',
    'You do not pretend this is a wellness check. The food is the check.',
  ] },
]);

registerPool('talk.leftover_plate.line', [
  { when: { studentId: 10 }, weight: 4, text: [
    `"If this sat too long I will be offended," Reneé says, already peeling foil.`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"I already ate," {subject.name} says. She takes the tray anyway.`,
  ] },
  { when: {}, text: [
    `"You brought me the good leftovers," {subject.name} says, pleased.`,
    `{subject.name} makes room on the bed for the tray. "Stay while I finish it."`,
    `"If you leave it, I'll eat it," {subject.name} says. "So. Leave it."`,
    `"Warm still," {subject.name} says. "You timed this. I like that."`,
  ] },
]);

registerPool('talk.leftover_plate.body', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Second foil tray this week. She eats standing, then sits when it gets serious. The shirt rides again.',
  ] },
  { when: { leftoverFed: true, stageMin: 4, stageMax: 7 }, weight: 3, text: [
    'Another tray in her lap. Last night\'s leftover still there. She treats her belly like the table it has become.',
  ] },
  { when: { leftoverFed: true, stageMin: 8 }, weight: 3, text: [
    'You set the tray where she can reach. She was already full from the last drop. She reaches anyway.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Foil again. She was not going to sleep hungry the first time either. She finishes what the floor forgot twice.',
  ] },
  { when: { stageMax: 3 }, text: [
    'She eats standing first, then sits when the tray gets serious. The shirt rides. She tugs it and keeps going.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'The tray lands in her lap and she treats that as the serving dish. Warmth, foil, a belly that makes a table of itself.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'You set the tray where she can reach without standing. She reaches. The room smells like the kitchen coming to her.',
  ] },
  { when: {}, text: [
    'Foil, steam, a resident who was not going to sleep hungry. She finishes what the floor forgot.',
    'She eats with a fork from the galley drawer. The leftovers become dinner. Then they become seconds.',
    'When the tray is empty she looks at you like there might be another one. There might.',
    'The foil remembers the kitchen. Her middle remembers the extra. She keeps eating until both are empty.',
  ] },
]);

registerPool('talk.leftover_plate', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.leftover_plate.open} {talk.leftover_plate.body}\n\n{talk.leftover_plate.line}',
    '{talk.leftover_plate.open}\n\n{talk.leftover_plate.line} {talk.leftover_plate.body}',
    '{talk.leftover_plate.line}\n\n{talk.leftover_plate.body}',
    '{talk.leftover_plate.open} {talk.leftover_plate.line}\n\n{talk.leftover_plate.body}',
  ] },
]);

registerPool('talk.encourage.linger', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She looks at the plate like it overheard you. Then she takes another bite anyway.',
    'The encouragement sits in the room after you stop talking. So does her appetite.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'She palms her middle, fond, as if you just gave the belly permission it already had.',
    'The talk ends. Eating does not. She treats that as the point.',
  ] },
  { when: {}, text: [
    'She keeps eating after the sentence. The sentence was never the meal.',
    'You said more. She heard seconds. Both of you know it.',
    'The fork stays in her hand. Encouragement has a body now.',
  ] },
]);

registerPool('talk.command_finish.linger', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She stares at the empty plate like it might argue. It does not.',
    'The command lingers warmer than the food. She sits with both.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'She leans back, packed, pleased, waiting to be told she did it right.',
    'Every plate is gone. She stays in the chair, waiting.',
  ] },
  { when: {}, text: [
    'Clean plates. A resident who did as she was told and wants the telling again.',
    'The command holds after the last bite. She holds with it.',
    'She sets the fork down only when you let her. Softness lives in the waiting.',
  ] },
]);

// Shape: FULL SENTENCE. Setup for asking how she landed on the floor.
registerPool('talk.origin_echo.open', [
  { when: {}, text: [
    'You ask how she landed on this floor. She does not rush the answer.',
    'The origin question sits between you like a plate she has been saving.',
    'You leave room for the story she has not told housing.',
  ] },
]);

// Shape: DIALOGUE BEAT. How she got here — origin keyed, then generic.
registerPool('talk.origin_echo.line', [
  { when: { studentId: 0, origin: 'britt_gymnast' }, weight: 4, text: [
    `"Coach had a speech about hunger," Brittany says. "I stopped attending."`,
  ] },
  { when: { studentId: 0, origin: 'britt_pageant' }, weight: 4, text: [
    `"Pretty was homework," Brittany says. "Full is the elective I actually wanted."`,
  ] },
  { when: { studentId: 8, origin: 'maya_moved_often' }, weight: 4, text: [
    `"Third address," Maya says. "First kitchen that let me leave a dish in the sink."`,
  ] },
  { when: { studentId: 8, origin: 'maya_eight_siblings' }, weight: 4, text: [
    `"We ate in shifts at home," Maya says. "Here the table waits for me."`,
  ] },
  { when: { studentId: 1, origin: 'madd_subject_zero' }, weight: 4, text: [
    `"I was supposed to stay on the page," Cassidy says. "The protocol followed me in."`,
  ] },
  { when: { studentId: 2, origin: 'kylie_brand_body' }, weight: 4, text: [
    `"The brand had a size," Kylie says. "I ate past it and kept the ring light on."`,
  ] },
  { when: { studentId: 6, origin: 'tiffany_feast_founder' }, weight: 4, text: [
    `"Wednesday was always extra," Tiffany says. "I started keeping Thursday too."`,
  ] },
  { when: { studentId: 10, origin: 'renee_line_cook' }, weight: 4, text: [
    `"Staff meal was still a meal," Reneé says. "I stopped pretending it was small."`,
  ] },
  { when: { studentId: 14, origin: 'mj_homestead_abundance' }, weight: 4, text: [
    `"No sense being shy around a table," Mary Jane says. "I proved the proverb."`,
  ] },
  { when: { studentId: 3, origin: 'serena_missed_nationals' }, weight: 4, text: [
    `"Fuel used to be a split," Serena says. "Tonight it is the whole event."`,
  ] },
  { when: { studentId: 3, origin: 'serena_bored_undefeated' }, weight: 4, text: [
    `"Winning got dull," Serena says. "Eating is a heat I can still take."`,
  ] },
  { when: { studentId: 4, origin: 'fiona_model_sidegig' }, weight: 4, text: [
    `"Hold still was the job," Fiona says. "The belly started moving first."`,
  ] },
  { when: { studentId: 4, origin: 'fiona_self_portrait' }, weight: 4, text: [
    `"The subject keeps changing," Fiona says. "I am the sitting."`,
  ] },
  { when: { studentId: 5, origin: 'destiny_ranked_grind' }, weight: 4, text: [
    `"Hunger was a debuff," Destiny says. "I stacked it on purpose."`,
  ] },
  { when: { studentId: 5, origin: 'destiny_offline_lobby' }, weight: 4, text: [
    `"No spectators used to mean more snacks," Destiny says. "I kept the snacks."`,
  ] },
  { when: { studentId: 7, origin: 'priya_parental_track' }, weight: 4, text: [
    `"Deviation was supposed to get remediated," Priya says. "I ordered dessert."`,
  ] },
  { when: { studentId: 7, origin: 'priya_reward_system' }, weight: 4, text: [
    `"Milestone reached," Priya says. "The bonus is always edible."`,
  ] },
  { when: { studentId: 9, origin: 'chloe_scandal_abroad' }, weight: 4, text: [
    `"Armor used to be silk and portions," Chloé says. "The portions went soft."`,
  ] },
  { when: { studentId: 9, origin: 'chloe_first_to_leave' }, weight: 4, text: [
    `"I had to host myself first," Chloé says. "The table finally has company."`,
  ] },
  { when: { studentId: 11, origin: 'kaylee_perfect_rotation' }, weight: 4, text: [
    `"Care plans do not skip lunch," Kaylee says. "Mine started including dessert."`,
  ] },
  { when: { studentId: 11, origin: 'kaylee_self_care' }, weight: 4, text: [
    `"Orders for me too," Kaylee says. "Tonight the order is another helping."`,
  ] },
  { when: { studentId: 12, origin: 'nadia_thesis_others' }, weight: 4, text: [
    `"Observation was supposed to stay clean," Nadia says. "The observer is chewing."`,
  ] },
  { when: { studentId: 12, origin: 'nadia_dream_journal' }, weight: 4, text: [
    `"I woke hungry before the journal caught up," Nadia says. "Breakfast is the footnote."`,
  ] },
  { when: { studentId: 13, origin: 'daisy_potluck_virtue' }, weight: 4, text: [
    `"Bring enough for everyone included a plate I skipped," Daisy says. "I do not skip."`,
  ] },
  { when: { studentId: 13, origin: 'daisy_snack_mom' }, weight: 4, text: [
    `"I packed extra," Daisy says. "Tonight the extra has my name on it."`,
  ] },
  { when: { studentId: 15, origin: 'lilith_always_watching' }, weight: 4, text: [
    `"Soon began before anyone noticed," Lilith says. "The noticing is the treat."`,
  ] },
  { when: { studentId: 16, origin: 'sophia_dissertation_stress' }, weight: 4, text: [
    `"Baseline check," Sophia says. "The baseline just asked for more."`,
  ] },
  { when: { studentId: 16, origin: 'sophia_sample_closet' }, weight: 4, text: [
    `"Statistically significant," Sophia says, and reaches for another sample.`,
  ] },
  { when: { studentId: 17, origin: 'indy_trust_fund_expedition' }, weight: 4, text: [
    `"Field rations can be decadent," Indiana says. "I packed like I meant it."`,
  ] },
  { when: { studentId: 17, origin: 'indy_map_vault' }, weight: 4, text: [
    `"Treasure is stored value," Indiana says. "Calories count. I am cataloguing."`,
  ] },
  { when: { studentId: 18, origin: 'talia_lab_accident' }, weight: 4, text: [
    `"The experiment affected the experimenter," Talia says. "Noted. Repeating."`,
  ] },
  { when: { studentId: 18, origin: 'talia_optimization_run' }, weight: 4, text: [
    `"I was already testing myself," Talia says. "The floor is a better lab."`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"I didn't plan this," {subject.name} says. "I just stopped leaving food."`,
    `"If housing asks, I transferred for the quiet," {subject.name} says. "The quiet is a kitchen."`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"You already know," {subject.name} says. "You just wanted to hear me say it."`,
    `"This floor is the plot," {subject.name} says, fond. "I walked into it on purpose."`,
  ] },
  { when: {}, text: [
    `"That's how I got here," {subject.name} says, palm on her middle like a footnote.`,
    `{subject.name} shrugs, then does not. "I stayed. The food stayed."`,
    `"You asked," {subject.name} says. "So here is the part I do not put in the file."`,
    `{subject.name} looks at the plate, then at you. "This is the transfer story."`,
  ] },
]);

// Shape: FULL SENTENCE. Body of the origin talk.
registerPool('talk.origin_echo.body', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'The story still fits a smaller frame. Appetite is already rewriting the ending.',
    'She tells it with her shirt tugged down. The tug does not last the whole paragraph.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She tells it with her belly in her lap, like the plot needed somewhere to sit.',
    'The origin arrives between bites. She does not pause the fork for history.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'The origin is small next to her. She tells it anyway, warm and certain.',
    'She fills the chair while she talks. The past has to share the furniture.',
  ] },
  { when: {}, text: [
    'The past arrives as warmth and a second helping she does not name.',
    'She talks with food still in reach. Origin and plate share a table.',
    'Whatever brought her here is still working. You can see it in how she sits.',
    'The story has crumbs on it. She does not brush them off.',
  ] },
]);

registerPool('talk.origin_echo', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.origin_echo.open} {origin.stirring.line}\n\n{talk.origin_echo.line} {talk.origin_echo.body}',
    '{talk.moodOpener|suffix:\n\n}{talk.origin_echo.line}\n\n{origin.stirring.line} {talk.origin_echo.body}',
    '{talk.origin_echo.open}\n\n{talk.origin_echo.line} {origin.stirring.line}',
    '{talk.origin_echo.line}\n\n{talk.origin_echo.body} {talk.origin_echo.linger}',
  ] },
]);

registerPool('talk.origin_echo.linger', [
  { when: { stageMax: 3 }, text: [
    'The story stays in the room after she stops talking. So does her appetite.',
    'She looks at you like the origin is still happening.',
  ] },
  { when: {}, text: [
    'Whatever she admitted keeps working after you leave.',
    'She sits with the telling. The plate does too.',
    'The origin does not close. It just gets quieter.',
  ] },
]);
