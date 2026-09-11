// The Squad — Lead: A3 Immobility | Support: A2 Psych, A6 Slender, A5 Editor
// Pass 17 — leftover immob, emb depth, weekly/suggest crumbs, dream, enc, dinner IDs.
import { registerModuleVariants } from '../engine.js';

const IM10 = { stageMin: 10 };

// ── leftover immob (A3; celebrate scale, no decline) ──────────
registerModuleVariants('immob.settledState', [
  { when: { studentId: 0, ...IM10 }, weight: 6, text: [
    `Brittany holds the room like home turf. The field got bigger. She stayed captain.`,
  ] },
  { when: { studentId: 5, ...IM10 }, weight: 6, text: [
    `Destiny is AFK in the best way. Headset off. Mass on. Queue closed.`,
  ] },
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `Maya rests. Vast. Quiet. The room already learned her name.`,
  ] },
  { when: { studentId: 13, ...IM10 }, weight: 6, text: [
    `Daisy fills the porch-swing of the whole room. Bless it. She is staying.`,
  ] },
  { when: { studentId: 15, ...IM10 }, weight: 6, text: [
    `Lilith is the warm center. Prey walks in. She does not need to rise.`,
  ] },
]);
registerModuleVariants('immob.spaceObs', [
  { when: { studentId: 1, ...IM10 }, weight: 6, text: [
    `Madeline notes the floor plan revised itself around one sample.`,
  ] },
  { when: { studentId: 7, ...IM10 }, weight: 6, text: [
    `Priya's constraint list now starts with doorways. She adapted.`,
  ] },
  { when: { studentId: 18, ...IM10 }, weight: 6, text: [
    `Talia calls the room a successful load-bearing test. She is the load.`,
  ] },
]);
registerModuleVariants('immob.environmental', [
  { when: { studentId: 4, ...IM10 }, weight: 6, text: [
    `Fiona's mass has an audio signature. The room composes around it.`,
  ] },
  { when: { studentId: 10, ...IM10 }, weight: 6, text: [
    `Warmth like a kitchen left on. Reneé is the oven now.`,
  ] },
  { when: { studentId: 14, ...IM10 }, weight: 6, text: [
    `The floor remembers harvest. Mary Jane is the barn it was waiting for.`,
  ] },
]);
registerModuleVariants('immob.attempt', [
  { when: { studentId: 3, ...IM10 }, weight: 6, text: [
    `Serena shifts like a cooldown that decided to stay seated.`,
  ] },
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `Maya considers an inch. Takes it. Travel plan complete.`,
  ] },
]);
registerModuleVariants('immob.bodyDesc', [
  { when: { studentId: 2, ...IM10 }, weight: 6, text: [
    'soft geography Kylie would film if the camera could hold it',
  ] },
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    'quiet vastness settled in layers she does not explain',
  ] },
  { when: { studentId: 11, ...IM10 }, weight: 6, text: [
    'warmth Kaylee would call stable and then enjoy anyway',
  ] },
]);
registerModuleVariants('immob.arrival.tend', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `You bring the day to Maya. She stays. Arrangement complete.`,
  ] },
  { when: { studentId: 0, ...IM10 }, weight: 6, text: [
    `You ferry trays to Brittany like a trainer hitting the sideline. She receives the win.`,
  ] },
  { when: { studentId: 13, ...IM10 }, weight: 6, text: [
    `You bring plates to Daisy. She blesses the delivery and does not rise.`,
  ] },
]);
registerModuleVariants('immob.arrival.deepen', [
  { when: { studentId: 10, ...IM10 }, weight: 6, text: [
    `Tended, Reneé softens like a sauce left on low. More of her. Same kitchen.`,
  ] },
  { when: { studentId: 6, ...IM10 }, weight: 6, text: [
    `Tiffany hosts the cushions. The chapter meeting is her body staying put.`,
  ] },
]);
registerModuleVariants('immob.arrival.devotion', [
  { when: { studentId: 8, corruption: [2], ...IM10 }, weight: 6, text: [
    `"Stay." Maya means the food and the looking and the not-leaving.`,
  ] },
  { when: { studentId: 15, ...IM10 }, weight: 6, text: [
    `Lilith accepts tribute with a small smile. Court is a larder.`,
  ] },
  { when: { studentId: 2, ...IM10 }, weight: 6, text: [
    `"Wide frame," Kylie says, settled. "This is the clip. Don't move me."`,
  ] },
]);
registerModuleVariants('immob.comfort.bed', [
  { when: { studentId: 5, ...IM10 }, weight: 6, text: [
    `Destiny tests the frame. "Comfort patch installed. Not moving."`,
  ] },
  { when: { studentId: 14, ...IM10 }, weight: 6, text: [
    `Mary Jane sinks into the new bed like a hayloft that finally fit.`,
  ] },
]);
registerModuleVariants('immob.comfort.fan', [
  { when: { studentId: 3, ...IM10 }, weight: 6, text: [
    `Serena wants the fan like a sideline breeze. Heat is the new opponent.`,
  ] },
]);
registerModuleVariants('immob.comfort.position', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `Maya finds the angle. Stays. The room can rotate around that.`,
  ] },
]);
registerModuleVariants('immob.refit', [
  { when: { studentId: 6, ...IM10 }, weight: 6, text: [
    `Tiffany treats the new garments like a rush order that finally caught up.`,
  ] },
  { when: { studentId: 16, ...IM10 }, weight: 6, text: [
    `Sophia checks the measurements twice. The clothes already knew.`,
  ] },
]);
registerModuleVariants('immob.hint.food', [
  { when: { studentId: 10, ...IM10 }, weight: 6, text: [
    `Reneé glances at the empty tray. The hint is a kitchen order.`,
  ] },
  { when: { studentId: 13, ...IM10 }, weight: 6, text: [
    `Daisy mentions pie the way other people mention weather.`,
  ] },
]);
registerModuleVariants('immob.visit', [
  { when: { studentId: 8, ...IM10 }, weight: 6, text: [
    `{ref.name} sits. Maya does not fill the hour. The hour fills itself.`,
  ] },
  { when: { studentId: 0, ...IM10 }, weight: 6, text: [
    `{ref.name} visits the captain where the field became a room.`,
  ] },
]);

// ── leftover emb.action depth ─────────────────────────────────
registerModuleVariants('emb.action.raid_pantry.depth', [
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny maps the shelves like a crate run. Cold air. Warm belly. No save point.`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    `Mary Jane treats the pantry like a root cellar that finally unlocked.`,
  ] },
]);
registerModuleVariants('emb.action.secret_binge.depth', [
  { when: { studentId: 1 }, weight: 6, text: [
    `Madeline locks the door and eats like the study is the only method left.`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya eats in the dark. Bags empty. The room keeps the secret.`,
  ] },
]);
registerModuleVariants('emb.action.text_professor.depth', [
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya sends "hungry again" like a status report. Then she stares at the screen.`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `Sophia types the plain text twice. Sends the second. Protocol broken on purpose.`,
  ] },
]);
registerModuleVariants('emb.action.roommate_tempt.depth', [
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany leaves two-person evidence on the counter. Chapter hospitality, mostly eaten.`,
  ] },
]);
registerModuleVariants('emb.action.midnight_snack.depth', [
  { when: { studentId: 5 }, weight: 6, text: [
    `2 AM fridge light. Destiny raids on mute. Queue empty. Stomach not.`,
  ] },
]);
registerModuleVariants('emb.action.vending_splurge.depth', [
  { when: { studentId: 17 }, weight: 6, text: [
    `Indiana treats the machine like a supply cache. Arms full. Path home shorter.`,
  ] },
]);
registerModuleVariants('emb.action.dessert_first.depth', [
  { when: { studentId: 10 }, weight: 6, text: [
    `Reneé opens with pastry. Dinner can follow if it behaves.`,
  ] },
]);
registerModuleVariants('emb.action.mirror_confession.depth', [
  { when: { studentId: 12 }, weight: 6, text: [
    `Nadia narrates the confession as she makes it. The glass agrees.`,
  ] },
]);
registerModuleVariants('emb.action.hunger_spiral.depth', [
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith rides the spiral like a hunt that feeds itself.`,
  ] },
]);
registerModuleVariants('emb.action.raid_pantry.after', [
  { when: { studentId: 5 }, weight: 5, text: [
    `Crumbs on the hoodie. Destiny will call it a snack. The carton disagrees.`,
  ] },
]);
registerModuleVariants('emb.action.secret_binge.after', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya hides the bags. The warmth stays.`,
  ] },
]);

// ── leftover weekly fragments ─────────────────────────────────
registerModuleVariants('weekly.customClothing.line', [
  { when: { studentId: 2 }, weight: 6, text: [
    `Kylie calls the new fit a drop. The seam calls it overdue.`,
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany unveils it like rush week finally caught the waistband.`,
  ] },
]);
registerModuleVariants('weekly.viralPost.reaction', [
  { when: { studentId: 2 }, weight: 6, text: [
    `Kylie watches the count climb and does not crop the belly out.`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny shrugs at the clip. "Chat already clipped it."`,
  ] },
]);
registerModuleVariants('weekly.gamingSponsor.line', [
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny reads the contract size. She is already past it.`,
  ] },
]);
registerModuleVariants('weekly.artExhibition.line', [
  { when: { studentId: 4 }, weight: 6, text: [
    `Fiona's best piece is still wearing her clothes.`,
  ] },
]);
registerModuleVariants('weekly.overachieverPivot.submit', [
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya files the new thesis. Appetite is the method now.`,
  ] },
]);
registerModuleVariants('weekly.transferSettled.answer', [
  { when: { studentId: 9 }, weight: 6, text: [
    `Chloé tells home the portions won. English on purpose.`,
  ] },
]);

// ── leftover talk.suggest fragments (match grammar) ───────────
registerModuleVariants('talk.suggest_indulgence.b11._f1', [
  { when: { studentId: 10 }, weight: 6, text: [
    `Reneé nods at a second dinner you barely named. The kitchen is already awake.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany files "second dinner" under extra practice. She is already standing.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b21._f1', [
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya's eyes go soft. Then she looks at you like the answer is already yes.`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith refocuses on you. Hungry. Ready. No decoration.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b11._f1', [
  { when: { studentId: 7 }, weight: 6, text: [
    `"More," Priya echoes, and underlines it in the air. Destination logged.`,
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    `"More." Serena tastes it like a new event. "I can train for that."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b21._f1', [
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya puts your hand on the warm crest of her. "This. Talk to this."`,
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    `Kylie plants your palm on the belly the camera loves. "Project. Stay on it."`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b01._f1', [
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    `Sophia loses the protocol mid-sentence. Hunger arrived first.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b01._f1', [
  { when: { studentId: 1, stageMax: 4 }, weight: 6, text: [
    `Madeline laughs it off. The laugh dies. Her hand checks the claim anyway.`,
  ] },
]);

// ── leftover dream / ritual ───────────────────────────────────
registerModuleVariants('dream.floating_cake', [
  { when: { studentId: 13 }, weight: 5, text: [
    `Daisy dreams cake that comes to her. She blesses every slice in her sleep.`,
  ] },
]);
registerModuleVariants('dream.honey_river', [
  { when: { studentId: 10 }, weight: 5, text: [
    `Reneé dreams a river of honey. She wades in with a spoon.`,
  ] },
]);
registerModuleVariants('dream.gravity_well', [
  { when: { studentId: 18 }, weight: 5, text: [
    `Talia dreams mass as a successful gravity test. She stays at the center.`,
  ] },
]);
registerModuleVariants('dream.wake.depth', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya wakes already touching her middle. The dream left instructions.`,
  ] },
]);
registerModuleVariants('ritual.communion_snack.after', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya keeps the shared warmth. No speech. The vow holds.`,
  ] },
]);
registerModuleVariants('ritual.leviathan_vigil', [
  { when: { studentId: 15, stageMin: 10 }, weight: 5, text: [
    `Lilith keeps vigil by staying. The room is the altar.`,
  ] },
]);
registerModuleVariants('ritual.generic.depth', [
  { when: { studentId: 4 }, weight: 5, text: [
    `Fiona moves through the rite like a canvas still wet.`,
  ] },
]);

// ── leftover enc / comp / slender ─────────────────────────────
registerModuleVariants('enc.display', [
  { when: { studentId: 2, stageMin: 5 }, weight: 5, text: [
    `Kylie turns so the hallway gets the same angle chat would.`,
  ] },
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    `Brittany presents the new mass like a scoreboard you can touch.`,
  ] },
]);
registerModuleVariants('enc.stageHunger', [
  { when: { studentId: 5, hungerTierMin: 2 }, weight: 5, text: [
    `Destiny's hunger is the only queue that matters.`,
  ] },
  { when: { studentId: 15, hungerTierMin: 2 }, weight: 5, text: [
    `Lilith's hunger does not ask. It waits in the doorway.`,
  ] },
]);
registerModuleVariants('enc.release', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya lets the moment go. The warmth stays.`,
  ] },
]);
registerModuleVariants('enc.reach', [
  { when: { studentId: 14 }, weight: 5, text: [
    `Mary Jane reaches like harvest is within arm's length.`,
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    `Reneé reaches for the next plate before the last one empties.`,
  ] },
]);
registerModuleVariants('comp.preening', [
  { when: { studentId: 2 }, weight: 5, text: [
    `Kylie arranges herself for the compliment like a thumbnail.`,
  ] },
]);
registerModuleVariants('comp.claiming', [
  { when: { studentId: 0 }, weight: 5, text: [
    `Brittany claims the praise like a win column.`,
  ] },
]);
registerModuleVariants('comp.practicing', [
  { when: { studentId: 3 }, weight: 5, text: [
    `Serena treats the compliment like a drill she intends to keep.`,
  ] },
]);
registerModuleVariants('comp.notMeant', [
  { when: { studentId: 16, stageMax: 4 }, weight: 5, text: [
    `Sophia files the compliment under error. Then she keeps it anyway.`,
  ] },
]);
registerModuleVariants('comp.show', [
  { when: { studentId: 6, stageMin: 5 }, weight: 5, text: [
    `Tiffany shows the new softness like a mixer already won.`,
  ] },
]);
registerModuleVariants('slender.mirror', [
  { when: { studentId: 8, stageMax: 4, gainStance: 'secret' }, weight: 6, text: [
    `Maya looks once. Keeps it. The glass does not get a speech.`,
  ] },
  { when: { studentId: 0, stageMax: 4, gainStance: 'reluctant' }, weight: 6, text: [
    `Brittany checks the glass like a score she did not mean to post.`,
  ] },
  { when: { studentId: 1, stageMax: 4 }, weight: 5, text: [
    `Madeline studies the new softness like a margin note she will reread.`,
  ] },
]);
registerModuleVariants('slender.scene', [
  { when: { studentId: 16, stageMax: 4, gainStance: 'opposed' }, weight: 6, text: [
    `{slender.bodyNotice} Sophia tells herself the protocol still holds. {slender.deflect}`,
  ] },
]);

// ── leftover dinner reaction IDs ──────────────────────────────
registerModuleVariants('dinner.reaction.thinJealousy', [
  { when: { studentId: 11, reactionLevel: [0, 1] }, weight: 7, text: [
    `Kaylee watches {ref.name}'s plate like care she forgot to give herself.`,
  ] },
  { when: { studentId: 12, reactionLevel: [0, 1] }, weight: 7, text: [
    `Nadia observes her own envy. Then she watches another bite land.`,
  ] },
  { when: { studentId: 16, reactionLevel: [0, 1] }, weight: 7, text: [
    `Sophia counts {ref.name}'s courses. The count is not theoretical.`,
  ] },
  { when: { studentId: 17, reactionLevel: [0, 1] }, weight: 7, text: [
    `Indiana eyes the other plate like a cache she has not opened yet.`,
  ] },
]);
registerModuleVariants('dinner.reaction.fatEncourage', [
  { when: { studentId: 11, reactionLevel: [2, 3] }, weight: 7, text: [
    `Kaylee presses {ref.name}'s hand to her own middle. "Self-care. Try mine."`,
  ] },
  { when: { studentId: 13, reactionLevel: [2, 3] }, weight: 7, text: [
    `Daisy wants that fullness for {ref.name}. Bless it. The plate is the sermon.`,
  ] },
  { when: { studentId: 18, reactionLevel: [2, 3] }, weight: 7, text: [
    `Talia treats encouragement like a successful trial. "Repeat the input."`,
  ] },
]);
registerModuleVariants('dinner.reaction.fatRetort', [
  { when: { studentId: 12, reactionLevel: [2, 3] }, weight: 7, text: [
    `Nadia names the jab, then eats through it. The analysis is the retort.`,
  ] },
  { when: { studentId: 17, reactionLevel: [2, 3] }, weight: 7, text: [
    `Indiana grins at the comment. "Find your own cache."`,
  ] },
]);

// ── leftover homeroom uniqueness (recycled stems lose at 8) ───
registerModuleVariants('homeroom.conference.Kayla.intro', [
  { when: {}, weight: 8, text: [
    `Kayla sits like Tuesday already signed the permission slip.`,
  ] },
]);
registerModuleVariants('homeroom.conference.Bri.intro', [
  { when: {}, weight: 8, text: [
    `Bri's first question is food. Grades can wait in the hallway.`,
  ] },
]);
registerModuleVariants('homeroom.conference.Sofia.intro', [
  { when: {}, weight: 8, text: [
    `Sofia fills the chair and the silence. The meeting was never about the syllabus.`,
  ] },
]);
registerModuleVariants('homeroom.conference.Mrs_Monroe.intro', [
  { when: {}, weight: 8, text: [
    `Mrs. Monroe skips knock and greeting. "What's on?" means the menu.`,
  ] },
]);
registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  { when: {}, weight: 8, text: [
    `The container opens before the agenda. Monroe is already mid-piece.`,
  ] },
]);
registerModuleVariants('homeroom.activity.health_unit.p0.personal', [
  { when: {}, weight: 8, text: [
    `Daisy's private notebook gets the numbers. The school file can wait.`,
  ] },
]);
