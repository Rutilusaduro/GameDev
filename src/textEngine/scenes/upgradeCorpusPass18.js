// The Squad — Lead: A2 Psych | Support: A1 Mobile, A3 Immobility, A6 Slender, A5 Editor
// Pass 18 — leftover hunger responses, dinner conv, embodiment parents, campus leftovers,
// digest/eat/cloth, leftover immob comfort, command-finish, stream, hunt.
import { registerModuleVariants } from '../engine.js';

const HI = { hungerTierMin: 2 };
const IM10 = { stageMin: 10 };

// ── leftover hunger responses ─────────────────────────────────
registerModuleVariants('hunger.response.compound.offer', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya takes it. No speech. The relief starts in her shoulders.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia checks the label once. Then she takes it like the study just ended.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany palms it mid-sentence. "Put me back in."',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith accepts the dose like tribute. Already calmer for having been fed.',
  ] },
]);
registerModuleVariants('hunger.response.compound.relief', [
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya unclenches the planner. The metric she needed was this.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny slumps like a lag spike finally cleared. "Okay. I\'m back."',
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    'Nadia names the drop in her own voice. Then she lets it happen.',
  ] },
]);
registerModuleVariants('hunger.response.deny.reaction', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya goes still. The ask was the whole speech. She has nothing left.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany blinks like a play got called off. Hurt, then pride.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé mutters "right, so" and looks at the floor. American no still stings.',
  ] },
]);
registerModuleVariants('hunger.response.deny.exit', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline files the refusal. She leaves with the notebook held too tight.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith turns. The doorway keeps her longer than the no did.',
  ] },
]);
registerModuleVariants('hunger.response.talk.calm', [
  { when: { studentId: 11 }, weight: 6, text: [
    'Kaylee breathes the way she teaches patients. Hunger stays, but it sits.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya listens. The quiet does half the work.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia repeats your words like a protocol. It almost works.',
  ] },
]);
registerModuleVariants('hunger.response.talk.depart', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie leaves filming nothing. The hallway is not the take she wanted.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane nods once and heads for any kitchen that will have her.',
  ] },
]);
registerModuleVariants('hunger.response.feed.eating', [
  { when: { studentId: 8, ...HI }, weight: 6, text: [
    'Maya eats like the argument already ended. Fast. Quiet. Complete.',
  ] },
  { when: { studentId: 10, ...HI }, weight: 6, text: [
    'Reneé eats with a cook\'s attention and a starving girl\'s pace.',
  ] },
  { when: { studentId: 5, ...HI }, weight: 6, text: [
    'Destiny eats on mute. The only sound is the bag emptying.',
  ] },
]);
registerModuleVariants('hunger.response.feed.aftermath', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya sits with both hands on the warmth. "Thanks." Review over.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany exhales like a timeout that worked. "Okay. I can think again."',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy blesses the plate she emptied. Color back. Smile back.',
  ] },
]);
registerModuleVariants('hunger.response.feed.lunge', [
  { when: { studentId: 15, ...HI }, weight: 6, text: [
    'Lilith is already in reach. Agreement was decoration.',
  ] },
  { when: { studentId: 17, ...HI }, weight: 6, text: [
    'Indiana hits the drawer like a cache she mapped last week.',
  ] },
]);

// ── leftover dinner conversations ─────────────────────────────
registerModuleVariants('dinner.conv.wine_and_cheese', [
  { when: { studentId: 10 }, weight: 8, text: [
    `Reneé rates the rind, then finishes the landscape. "Again."`,
  ] },
  { when: { studentId: 9 }, weight: 8, text: [
    `Chloé calls the board generous like a field note. Then she maps it.`,
  ] },
  { when: { studentId: 6 }, weight: 8, text: [
    `Tiffany hosts the cheese like a mixer. Nobody leaves hungry. Least of all her.`,
  ] },
]);
registerModuleVariants('dinner.conv.after_dinner_stroll', [
  { when: { studentId: 2 }, weight: 7, text: [
    `Dessert menu. Kylie already has the camera down. "All of it. Off the record."`,
  ] },
  { when: { studentId: 17 }, weight: 7, text: [
    `Indiana treats dessert like another chamber. "We go deeper."`,
  ] },
]);
registerModuleVariants('dinner.conv.awkward_comment', [
  { when: { studentId: 8 }, weight: 7, text: [
    `"That's a lot." Maya looks at the plate, then you. "Yes." She keeps eating.`,
  ] },
  { when: { studentId: 16 }, weight: 7, text: [
    `You name the volume. Sophia flushes and writes nothing. The fork stays busy.`,
  ] },
]);
registerModuleVariants('dinner.conv.personal_chef_story', [
  { when: { studentId: 13 }, weight: 7, text: [
    `You say the kitchen cooked for her. Daisy blesses the first plate and claims the rest.`,
  ] },
  { when: { studentId: 18 }, weight: 7, text: [
    `Talia treats a menu in her honor like a successful trial. She eats the results.`,
  ] },
]);
registerModuleVariants('dinner.conv.second_table', [
  { when: { studentId: 0, stageMin: 6 }, weight: 7, text: [
    `Better chair. Brittany sits like a starter who finally got the right bench.`,
  ] },
  { when: { studentId: 11, stageMin: 6 }, weight: 7, text: [
    `Kaylee settles into the wider seat. "Self-care," she says, and orders again.`,
  ] },
]);
registerModuleVariants('dinner.conv.share_a_dish', [
  { when: { studentId: 8 }, weight: 7, text: [
    `"Share." Maya nods. The shared plate becomes a one-girl study.`,
  ] },
  { when: { studentId: 15 }, weight: 7, text: [
    `Lilith shares by letting you watch. The dish does not come back.`,
  ] },
]);
registerModuleVariants('dinner.conv.suggest_diet', [
  { when: { studentId: 3 }, weight: 7, text: [
    `You nod at greens. Serena does not. "Wrong event. Sit."`,
  ] },
  { when: { studentId: 7 }, weight: 7, text: [
    `Lighter option. Priya files it under rejected hypothesis and stays on her plate.`,
  ] },
]);
registerModuleVariants('dinner.conv.talk_genuinely', [
  { when: { studentId: 1 }, weight: 7, text: [
    `Madeline talks method and empties two plates like the method includes them.`,
  ] },
  { when: { studentId: 12 }, weight: 7, text: [
    `Nadia names the intimacy of watching her eat, then demonstrates.`,
  ] },
]);
registerModuleVariants('dinner.conv.toast_together', [
  { when: { studentId: 6 }, weight: 7, text: [
    `"To more," Tiffany says, already pouring. The next toast is food.`,
  ] },
  { when: { studentId: 14 }, weight: 7, text: [
    `Mary Jane taps glass like a harvest blessing. Then she reaches for bread.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.get_them_talking.l4', [
  { when: { studentId: 8 }, weight: 7, text: [
    `"Don't stop," Maya says. She means the food. She also means you.`,
  ] },
  { when: { studentId: 10 }, weight: 7, text: [
    `"Don't stop," Reneé murmurs, already tasting the next idea.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.order_for_table.l2', [
  { when: { studentId: 6 }, weight: 7, text: [
    `{ref.name} lights up before the waiter leaves. Tiffany already planned the extras.`,
  ] },
  { when: { studentId: 2 }, weight: 7, text: [
    `{ref.name} reacts like a drop just posted. Kylie is already filming the arrival.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.order_for_table.l3', [
  { when: { studentId: 0 }, weight: 7, text: [
    `"Keep watching," Brittany says. The fork is already scoring.`,
  ] },
  { when: { studentId: 15 }, weight: 7, text: [
    `"Watch." Lilith does not waste a second verb.`,
  ] },
]);

// ── leftover emb.action parents ───────────────────────────────
registerModuleVariants('emb.action.public_eating', [
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    'Kylie eats where people can see. The wrappers are the caption.',
  ] },
  { when: { studentId: 8, stageMin: 5 }, weight: 6, text: [
    'Maya eats in public without performing it. The body keeps the receipt.',
  ] },
]);
registerModuleVariants('emb.action.auto_surrender', [
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia calls it craving so the protocol can survive. Then she obeys it.',
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline names the compulsion, then follows it like a method.',
  ] },
]);
registerModuleVariants('emb.action.body_exploration', [
  { when: { studentId: 12 }, weight: 6, text: [
    'Nadia narrates the hands as they find new softness. The notes are the pleasure.',
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona maps herself like a canvas still taking paint.',
  ] },
]);
registerModuleVariants('emb.action.immobile_feast', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    'Maya cannot rise. Platters come. She accepts them like weather.',
  ] },
  { when: { studentId: 15, ...IM10 }, weight: 6, text: [
    'Lilith feasts without standing. The world learned the route.',
  ] },
]);
registerModuleVariants('emb.action.dessert_first', [
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany opens with cake. Dinner can RSVP if it wants.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy blesses dessert first. The rest of the meal can wait in line.',
  ] },
]);
registerModuleVariants('emb.action.midnight_snack', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya and the fridge light. Bags empty. Nobody else gets a report.',
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline eats standing at 2 AM like the stacks finally closed.',
  ] },
]);
registerModuleVariants('emb.action.hunger_spiral', [
  { when: { studentId: 7, ...HI }, weight: 6, text: [
    'Priya schedules one more bite. The schedule fails. She keeps eating.',
  ] },
  { when: { studentId: 5, ...HI }, weight: 6, text: [
    'Destiny queues another bag. The queue does not end.',
  ] },
]);
registerModuleVariants('emb.action.generic', [
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia follows the hands toward food like a successful input.',
  ] },
  { when: { studentId: 17 }, weight: 5, text: [
    'Indiana lets the spirit steer. The cache was this way anyway.',
  ] },
]);
registerModuleVariants('emb.action.raid_pantry', [
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane raids like a cellar after harvest. Both hands. No leftover argument.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé inventories, then empties. The pantry was always a kitchen.',
  ] },
]);
registerModuleVariants('emb.action.seduce_appetite', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie talks appetite into the room until the room agrees.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith does not seduce the hunger. She unveils it.',
  ] },
]);
registerModuleVariants('emb.action.mirror_confession', [
  { when: { studentId: 8, stageMax: 4 }, weight: 6, text: [
    'Maya tells the glass the truth and keeps it off the record.',
  ] },
  { when: { studentId: 0, stageMax: 4 }, weight: 6, text: [
    'Brittany confesses the extra softness like a score she still wants.',
  ] },
]);
registerModuleVariants('emb.action.text_professor', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya sends "hungry." One word. The rest is implied.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie texts a photo of an empty plate. Caption: "again?"',
  ] },
]);
registerModuleVariants('emb.action.roommate_tempt', [
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny leaves two-player snacks. She will eat both if nobody queues.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé offers "just a taste" in careful English. The taste is a meal.',
  ] },
]);
registerModuleVariants('emb.action.vending_splurge', [
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny feeds the machine like a gacha pity timer. Bags drop. She stays.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany treats the machine like overtime snacks. Arms full. No regret.',
  ] },
]);

// ── leftover emb.event girls ──────────────────────────────────
registerModuleVariants('emb.event.stuck_door', [
  { when: { studentId: 8, stageMin: 6 }, weight: 6, text: [
    'Maya turns, then turns again. The frame keeps a souvenir of hip.',
  ] },
  { when: { studentId: 9, stageMin: 6 }, weight: 6, text: [
    'Chloé laughs once. "American doors." She negotiates the rest with her middle.',
  ] },
]);
registerModuleVariants('emb.event.clothes_burst', [
  { when: { studentId: 6, stageMin: 5 }, weight: 6, text: [
    'Tiffany\'s stitch pops mid-host. She keeps smiling. The chapter heard it.',
  ] },
  { when: { studentId: 14, stageMin: 5 }, weight: 6, text: [
    'Mary Jane\'s seam gives like harvest cloth. She keeps walking.',
  ] },
]);
registerModuleVariants('emb.event.npc_stare', [
  { when: { studentId: 15 }, weight: 5, text: [
    '{ref.name} looks too long. Lilith looks back until the look becomes tribute.',
  ] },
  { when: { studentId: 3 }, weight: 5, text: [
    '{ref.name} clocks the new mass. Serena treats it like a rival staring first.',
  ] },
]);
registerModuleVariants('emb.event.gossip_whisper', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya hears her name and does not turn. The whisper can keep the rumor.',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Voices dip. Brittany files it under noise and keeps the snack.',
  ] },
]);
registerModuleVariants('emb.event.cafeteria_binge', [
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny takes unlimited as a patch note. Tray after tray. AFK from shame.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya goes back without announcing it. The dining hall already knew.',
  ] },
]);
registerModuleVariants('emb.event.faculty_treats', [
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia takes one éclair, then the second "for the sample." The third is quiet.',
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya rates the lounge pastry, then exceeds the serving guideline.',
  ] },
]);

// ── leftover campus event uniqueness ──────────────────────────
registerModuleVariants('campusEvent.scene.mood_tired', [
  { when: { studentId: 11 }, weight: 8, text: [
    'Kaylee looks post-shift. Care used up. A pastry would put her back on her feet.',
  ] },
  { when: { studentId: 3 }, weight: 8, text: [
    'Serena ran on empty. The desk is a bench. Sugar would be the recovery drink.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_nervous', [
  { when: { studentId: 9 }, weight: 8, text: [
    'Chloé\'s badge chain won\'t stay still. New-country jitters. Food would land.',
  ] },
  { when: { studentId: 8 }, weight: 8, text: [
    'Maya\'s hands hide in sleeves. Quiet panic. Warmth would fix more than talk.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_content', [
  { when: { studentId: 10 }, weight: 8, text: [
    'Reneé looks fed already and still interested. The chair is a tasting stool.',
  ] },
  { when: { studentId: 5 }, weight: 8, text: [
    'Destiny is comfortable in the worst chair. Queue empty. Mood green.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_stressed', [
  { when: { studentId: 0 }, weight: 8, text: [
    'Brittany\'s ponytail is a warning flag. Practice plus midterms. She skipped lunch.',
  ] },
  { when: { studentId: 12 }, weight: 8, text: [
    'Nadia over-analyzes the hour. Shoulders high. Appetite is the only soft data.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_snack_break', [
  { when: { studentId: 8 }, weight: 8, text: [
    'The tin opens. Maya takes one, then another, like the tin asked first.',
  ] },
  { when: { studentId: 0 }, weight: 8, text: [
    'Snacks hit the row. Brittany treats them like a timeout she earned.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_birthday', [
  { when: { studentId: 13 }, weight: 8, text: [
    'Daisy brought extra frosting "just in case." The case arrives immediately.',
  ] },
  { when: { studentId: 8 }, weight: 8, text: [
    'Cake rumor. Maya is already looking at the door like it might feed her.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_slump', [
  { when: { studentId: 11 }, weight: 8, text: [
    '3 PM. Kaylee diagnoses the slump as low sugar and looks at you like you have the kit.',
  ] },
  { when: { studentId: 14 }, weight: 8, text: [
    'Heads down. Mary Jane looks harvest-tired. A bun would restart the afternoon.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_mid', [
  { when: { studentId: 8, stageMin: 4, stageMax: 6 }, weight: 7, text: [
    'Maya takes the chair like it was always this wide. Ease winning.',
  ] },
  { when: { studentId: 2, stageMin: 4, stageMax: 6 }, weight: 7, text: [
    'Kylie sits like the thumbnail finally matches the body.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_tired.1', [
  { when: { studentId: 11 }, weight: 8, text: [
    'You say Kaylee\'s name soft. She answers, stays, and finishes the pastry you left.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_tired.2', [
  { when: { studentId: 5 }, weight: 8, text: [
    'Back row. Destiny naps like a loading screen. She looks grateful you dimmed it.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_nervous.1', [
  { when: { studentId: 9 }, weight: 8, text: [
    'Easy task, clear steps. Chloé gets through it. The badge chain finally stills.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_nervous.2', [
  { when: { studentId: 8 }, weight: 8, text: [
    'After class you listen. Maya takes the walk snack and does not waste words on thanks.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_stressed.2', [
  { when: { studentId: 7 }, weight: 8, text: [
    'A finishable task. Priya locks in. The hour becomes a completed row.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_focused.1', [
  { when: { studentId: 18 }, weight: 8, text: [
    'Optional extra. Talia accepts like you handed her another variable.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_focused.2', [
  { when: { studentId: 1 }, weight: 8, text: [
    'You stay out of Madeline\'s notes. She powers through. Correct call.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_excited.0', [
  { when: { studentId: 6 }, weight: 8, text: [
    'Group work eats the energy. Tiffany feeds the group and herself in the same pass.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_excited.1', [
  { when: { studentId: 2 }, weight: 8, text: [
    'You let Kylie run the segment. She thrives. The row becomes an audience.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_content.1', [
  { when: { studentId: 13 }, weight: 8, text: [
    'Quiet reading, just for Daisy. She is still there twenty minutes late, smiling.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_content.2', [
  { when: { studentId: 8 }, weight: 8, text: [
    'You sit on the desk edge. Maya stays open. The hour does not need a plot.',
  ] },
]);

// ── leftover digest / eat / cloth ─────────────────────────────
registerModuleVariants('ge.digestReaction', [
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany palms the new softness. "Okay. Season's going my way."`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny pokes the gain. "Patch notes in real time. I'm keeping it."`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `Sophia measures with both hands. The protocol did not budget for this smile.`,
  ] },
]);
registerModuleVariants('ge.digestNotice', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie\'s yesterday-fit does not forgive the overnight. She films the proof.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya\'s waistband tells on last night. She leaves it telling.',
  ] },
]);
registerModuleVariants('ge.digestSettle', [
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane\'s gain settles like soil after rain. She is bigger when she stands.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé\'s overnight weight sits like a sauce that reduced itself into her.',
  ] },
]);
registerModuleVariants('ge.digestOnset', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline wakes heavier and reaches for the notebook before the mirror.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith wakes already fed by the night. She stretches into the extra.',
  ] },
]);
registerModuleVariants('eat.settleIn', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya sits where the plate and you share the same line of sight.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé arranges the plate like mise en place, then drops the formality.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany claims the chair like a starting spot. Food is the opponent.',
  ] },
]);
registerModuleVariants('eat.aftermath', [
  { when: { studentId: 8, fullnessMin: 0.6 }, weight: 6, text: [
    'Maya sits back. The middle does the talking. She lets it.',
  ] },
  { when: { studentId: 2, fullnessMin: 0.6 }, weight: 6, text: [
    'Kylie does not tidy the view. Fullness is the thumbnail now.',
  ] },
  { when: { studentId: 15, fullnessMin: 0.6 }, weight: 6, text: [
    'Lilith rests a hand on the swell like a kept thing. Satisfied. Still interested.',
  ] },
]);
registerModuleVariants('eat.hungerClause', [
  { when: { studentId: 5, ...HI }, weight: 6, text: [
    'Destiny sat down already queued. The meal is the patch.',
  ] },
  { when: { studentId: 16, ...HI }, weight: 6, text: [
    'Sophia was hungrier than the notes allowed. The notes lost.',
  ] },
]);
registerModuleVariants('eat.midMeal', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Halfway, Priya stops performing pace. The plate is the only KPI left.',
  ] },
  { when: { studentId: 13 }, weight: 5, text: [
    'Daisy eats through the middle like Sunday never ended.',
  ] },
]);
registerModuleVariants('cloth.discovery', [
  { when: { studentId: 8, stageMin: 4 }, weight: 6, text: [
    'Maya feels the strain before she looks. She looks anyway.',
  ] },
  { when: { studentId: 0, stageMin: 4 }, weight: 6, text: [
    'Brittany notices the uniform lying. She keeps the set going anyway.',
  ] },
  { when: { studentId: 2, stageMin: 4 }, weight: 6, text: [
    'Kylie sees the strain in the preview before she feels it. She keeps the fit.',
  ] },
]);
registerModuleVariants('cloth.reaction', [
  { when: { studentId: 8, stageMin: 4 }, weight: 6, text: [
    `Maya smooths what she can. "Okay." The rest can show.`,
  ] },
  { when: { studentId: 16, stageMin: 4 }, weight: 6, text: [
    `Sophia stares at the gap. Then she files it under later and lets it breathe.`,
  ] },
  { when: { studentId: 3, stageMin: 4 }, weight: 6, text: [
    `Serena tugs once. "New size. Fine." She does not hide the loss.`,
  ] },
]);
registerModuleVariants('cloth.failBeat', [
  { when: { studentId: 6, stageMin: 5 }, weight: 5, text: [
    'Tiffany\'s outfit gives mid-host. She treats it like a wardrobe change.',
  ] },
  { when: { studentId: 14, stageMin: 5 }, weight: 5, text: [
    'Mary Jane\'s closure loses. Harvest does not apologize.',
  ] },
]);

// ── leftover immob comfort / pref / hint ──────────────────────
registerModuleVariants('immob.comfort.ac', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `Cool finds Maya. She breathes longer. The heat she carries finally has somewhere to go.`,
  ] },
  { when: { studentId: 5, ...IM10 }, weight: 6, text: [
    `Destiny sighs when the air kicks on. "That's the setting. Leave it."`,
  ] },
]);
registerModuleVariants('immob.comfort.arrangement', [
  { when: { studentId: 7, ...IM10 }, weight: 6, text: [
    `Priya surveys trays at height, paths cleared. "Correct layout," she says, and stays.`,
  ] },
  { when: { studentId: 13, ...IM10 }, weight: 6, text: [
    `Daisy looks at the room edited around her. "Bless you." She does not need to rise.`,
  ] },
]);
registerModuleVariants('immob.hint.heat', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    'Maya\'s warmth pools thicker. She glances at the fan like a request.',
  ] },
  { when: { studentId: 15, ...IM10 }, weight: 6, text: [
    'Lilith runs hotter. The look she gives the air is an order.',
  ] },
]);
registerModuleVariants('immob.hint.position', [
  { when: { studentId: 0, ...IM10 }, weight: 6, text: [
    'Brittany shifts once, seeking a geometry that still feels like a win.',
  ] },
  { when: { studentId: 18, ...IM10 }, weight: 6, text: [
    'Talia tests two angles. The third is the successful configuration.',
  ] },
]);
registerModuleVariants('immob.pref.food', [
  { when: { studentId: 10, ...IM10 }, weight: 6, text: [
    'Reneé eats the preferred tray first. Fast. Focused. The cook in her is pleased.',
  ] },
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    'Maya eats without commentary. Preference honored. Court stays quiet.',
  ] },
]);
registerModuleVariants('immob.pref.heat', [
  { when: { studentId: 5, ...IM10 }, weight: 6, text: [
    'Destiny closes her eyes into the fan. "Yeah. That."',
  ] },
  { when: { studentId: 11, ...IM10 }, weight: 6, text: [
    'Kaylee receives the cool like care she would give anyone. She keeps it.',
  ] },
]);
registerModuleVariants('immob.pref.position', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    'Maya settles into the new geometry. "There." She is done moving.',
  ] },
  { when: { studentId: 0, ...IM10 }, weight: 6, text: [
    'Brittany finds the angle that still feels like home turf. She stays.',
  ] },
]);

// ── leftover talk.command_finish (full-sentence slots only) ───
registerModuleVariants('talk.command_finish.t0v0._f1', [
  { when: { studentId: 8 }, weight: 6, text: [
    `The command lands. Maya's eyes widen, then her hands move. Surprise, then appetite.`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `Sophia hears the order and loses the protocol mid-breath. Her hands already obey.`,
  ] },
]);
registerModuleVariants('talk.command_finish.t0v0._f2', [
  { when: { studentId: 8 }, weight: 6, text: [
    `She eats startled, then eager, like the first bite taught the rest.`,
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    `Madeline eats like the study just became the method. Wide-eyed. Thorough.`,
  ] },
]);
registerModuleVariants('talk.command_finish.t0v0._f5', [
  { when: { studentId: 8 }, weight: 6, text: [
    `After, Maya sits still, hands on the swell. "I couldn't stop." She does not sound sorry.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany stares at the empties. "I finished it. All of it." Pride under the shock.`,
  ] },
]);
registerModuleVariants('talk.command_finish.t1v0._f1', [
  { when: { studentId: 2 }, weight: 6, text: [
    `Kylie hears finish and drops the performance. The plates are the only camera.`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya treats "finish" like a deadline she intends to beat.`,
  ] },
]);
registerModuleVariants('talk.command_finish.t2v0._f1', [
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith was already going to finish. The command is just permission she did not need.`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya starts before you finish the word. Home. More.`,
  ] },
]);

// ── leftover stream end / tap ─────────────────────────────────
registerModuleVariants('stream.endStream.excellent', [
  { when: { studentId: 2 }, weight: 6, text: [
    `"Best VOD this month. Don't ask me to stand. Clip the sit."`,
  ] },
]);
registerModuleVariants('stream.endStream.good', [
  { when: { studentId: 2 }, weight: 6, text: [
    `"Solid stream. Belly did numbers. I'm logging off in this chair."`,
  ] },
]);
registerModuleVariants('stream.endStream.average', [
  { when: { studentId: 2 }, weight: 6, text: [
    `"Mid chat, mid tray. Still sitting. That's the brand today."`,
  ] },
]);
registerModuleVariants('stream.tapOut.fullness', [
  { when: { studentId: 2 }, weight: 6, text: [
    `"I'm tapping before this becomes a compilation. Soft. Done. Posted."`,
  ] },
]);
registerModuleVariants('stream.tapOut.stamina', [
  { when: { studentId: 2 }, weight: 6, text: [
    `"Hands are cooked. Middle is not. Ending it."`,
  ] },
]);

// ── leftover slender girls ────────────────────────────────────
registerModuleVariants('slender.mirror', [
  { when: { studentId: 2, stageMax: 4 }, weight: 6, text: [
    `Kylie checks the preview, then the glass. She does not post either.`,
  ] },
  { when: { studentId: 5, stageMax: 4 }, weight: 6, text: [
    `Destiny treats the reflection like a spoiler. She alt-tabs away from it.`,
  ] },
  { when: { studentId: 9, stageMax: 4 }, weight: 6, text: [
    `Chloé studies the new softness like American portions finally signed the form.`,
  ] },
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    `Sophia measures the glass, then her notes. The notes lose.`,
  ] },
]);
registerModuleVariants('slender.scene', [
  { when: { studentId: 8, stageMax: 4 }, weight: 5, text: [
    `Maya keeps the softness in the corner of her eye. The center stays yours.`,
  ] },
  { when: { studentId: 3, stageMax: 4 }, weight: 5, text: [
    `Serena files the new line under later. Later keeps arriving at practice.`,
  ] },
]);

// ── leftover enc / weekly crumbs ──────────────────────────────
registerModuleVariants('enc.display', [
  { when: { studentId: 8, stageMin: 5 }, weight: 5, text: [
    `Maya turns enough that you see it. She does not narrate the view.`,
  ] },
  { when: { studentId: 15, stageMin: 5 }, weight: 5, text: [
    `Lilith presents the mass like a warning that wants to be praised.`,
  ] },
]);
registerModuleVariants('enc.release', [
  { when: { studentId: 0 }, weight: 5, text: [
    `Brittany's shoulders drop. The play is over. The warmth stays in.`,
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    `Nadia names the release as it happens. Then she lets her belly have the last word.`,
  ] },
]);
registerModuleVariants('weekly.interventionFails.setup', [
  { when: { studentId: 0 }, weight: 6, text: [
    `Someone planned to talk Brittany down. She already set extra plates.`,
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    `The intervention RSVP list looks like a mixer. Tiffany brought dip.`,
  ] },
]);
registerModuleVariants('weekly.interventionFails.payoff', [
  { when: { studentId: 0 }, weight: 6, text: [
    `The lecture becomes a table. Brittany eats more than the committee and looks pleased.`,
  ] },
]);
registerModuleVariants('weekly.transferSettled.call', [
  { when: { studentId: 9 }, weight: 6, text: [
    `Home rings. Chloé looks at the portions on her desk before she answers.`,
  ] },
]);
registerModuleVariants('weekly.transferSettled.after', [
  { when: { studentId: 9 }, weight: 6, text: [
    `She stays. Campus has her number, her appetite, and the better bread.`,
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.forced', [
  { when: { studentId: 3 }, weight: 6, text: [
    `Serena steps on because the program said so. The platform tells on the season.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany takes the number like a score she can still spin.`,
  ] },
]);
registerModuleVariants('weekly.uniformSplit.recovery', [
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany pins what she can. Dignity first. The rip can wait in the locker.`,
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany laughs it into a wardrobe story. The chapter already saw the stitch give.`,
  ] },
]);

// ── leftover hunt feast uniqueness (Lilith) ───────────────────
registerModuleVariants('hunt.feast.s0', [
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith lures him into incense and bass. One swallow. The room gets warmer.',
  ] },
]);
registerModuleVariants('hunt.feast.s3', [
  { when: { studentId: 15, stageMin: 3 }, weight: 6, text: [
    'Velvet voice, corset at its last argument. She takes him in and settles heavier.',
  ] },
]);
registerModuleVariants('hunt.feast.s4', [
  { when: { studentId: 15, stageMin: 4 }, weight: 6, text: [
    'She waddles him into reach. Pillows of her do the rest. After, she is thicker for it.',
  ] },
]);
registerModuleVariants('hunt.feast.s6', [
  { when: { studentId: 15, stageMin: 6 }, weight: 6, text: [
    'The door complains. She smiles at the complaint and feeds anyway.',
  ] },
]);
registerModuleVariants('hunt.feast.s9', [
  { when: { studentId: 15, ...IM10 }, weight: 6, text: [
    'She does not rise. The offering comes in. She keeps him, and the furniture learns.',
  ] },
]);

// ── leftover device psych (leftover catalog rows) ─────────────
registerModuleVariants('device.psych.auto_bloating_belt', [
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia treats the swell like a successful cycle. Pressure, then pride.',
  ] },
  { when: { studentId: 16 }, weight: 5, text: [
    'Sophia expected the volume. She still breathes like the data surprised her.',
  ] },
]);
registerModuleVariants('device.psych.auto_feeder_arm', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya stops choosing. The arm insists. She lets it.',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny calls it AFK feeding. She still opens for every tray.',
  ] },
]);
registerModuleVariants('device.psych.growth_serum_injector', [
  { when: { studentId: 16 }, weight: 5, text: [
    'Serum heat wins the argument Sophia was writing. Curiosity keeps the needle.',
  ] },
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia watches the localized surge like a graph she caused on purpose.',
  ] },
]);
registerModuleVariants('device.psych.reinforced_legs', [
  { when: { studentId: 3, stageMin: 7 }, weight: 5, text: [
    'Serena trusts the braces the way she trusted tape. Heavier is still a sport.',
  ] },
  { when: { studentId: 0, stageMin: 7 }, weight: 5, text: [
    'Brittany leans on the supports like new gear. The season got bigger.',
  ] },
]);
registerModuleVariants('device.psych.living_furniture_rig', [
  { when: { studentId: 8, ...IM10 }, weight: 5, text: [
    'Maya lets stillness feel kind. Feeding arrives. She is the furniture and the guest.',
  ] },
  { when: { studentId: 15, ...IM10 }, weight: 5, text: [
    'Lilith enjoys being sat with. The rig keeps her. Tribute keeps coming.',
  ] },
]);
