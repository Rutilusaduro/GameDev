// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor, A6 Slender
// Pass 13 — embodied campus leftovers + leftover class scenes.
import { registerModuleVariants } from '../engine.js';

// ── leftover campus scenes ────────────────────────────────────
registerModuleVariants('campusEvent.scene.stage_mid', [
  { when: { studentId: 0, stageMin: 3, stageMax: 4 }, weight: 6, text: [
    'Brittany moves slower and eats like the room already accepted the new roster.',
  ] },
  { when: { studentId: 8, stageMin: 3, stageMax: 4 }, weight: 6, text: [
    'Maya takes space without announcing it. The old self-consciousness is late.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_group_project', [
  { when: {}, weight: 5, text: [
    'Lecture cancelled for a meal-plan project. The class packed supplies like they knew.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_birthday', [
  { when: {}, weight: 5, text: [
    'Birthday rumor, cake expectation. The room is already looking at the door.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_slump', [
  { when: {}, weight: 5, text: [
    '3PM crash. Heads down. Someone asleep with commitment. Action required.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_extended', [
  { when: {}, weight: 5, text: [
    'Two hours in. Nobody clocks out. Stomachs start filing the objection.',
  ] },
]);

// ── emb.enter / release leftovers ─────────────────────────────
registerModuleVariants('emb.enter', [
  { when: { studentId: 8, stageMax: 4, corruption: [0] }, weight: 5, text: [
    'You slip into Maya quiet. Hunger stirs. She will call it hers later.',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny\'s hoodie is already a room. You settle in. The queue opens.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith receives the spirit like prey walking in. Patient. Already hungry.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0], stageMax: 3 }, weight: 5, text: [
    'She tenses when you arrive. Appetite still answers before pride does.',
  ] },
]);
registerModuleVariants('emb.release', [
  { when: { studentId: 0 }, weight: 5, text: [
    'You leave Brittany standing. She will find crumbs and call it a missed heat.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'You lift out of Maya. She blinks, full, and does not ask the question.',
  ] },
]);

// ── emb.action beats (not skeleton parents) ───────────────────
registerModuleVariants('emb.action.raid_pantry.beat', [
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé raids like a kitchen she already owns — leftovers named, then finished.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny one-hands the shelves. Cold pasta, something sweet, no commentary.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane treats the pantry like a harvest crate. Both hands. No leftovers.',
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 4, text: [
    'She eats standing, door half-closed, like the hall might still catch her.',
  ] },
]);
registerModuleVariants('emb.action.raid_pantry.after', [
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya wipes her mouth and files it under unscheduled. The file is lying.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya leaves crumbs. She will not mention this. The quiet keeps it.',
  ] },
]);
registerModuleVariants('emb.action.secret_binge.beat', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie locks the door. Camera down. She eats like the story can wait.',
  ] },
  { when: { studentId: 16, corruption: [0] }, weight: 6, text: [
    'Sophia eats fast, then slower, then until the bags are a warm fact.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith does not binge. She harvests. The bags empty anyway.',
  ] },
]);
registerModuleVariants('emb.action.secret_binge.after', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany breathes around the weight and calls it necessary. Evidence hidden.',
  ] },
  { when: { gainStance: 'secret' }, weight: 4, text: [
    'Wrappers gone. Belly warm. The secret stays in the room.',
  ] },
]);
registerModuleVariants('emb.action.seduce_appetite', [
  { when: { studentId: 9 }, weight: 6, text: [
    'Want pools behind Chloé\'s ribs. She reaches like the answer finally asked itself.',
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany stops hosting the hunger and lets it host her.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 4, text: [
    'You whisper want into the polite places. She still calls it just hungry.',
  ] },
]);
registerModuleVariants('emb.action.mirror_confession', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany tells the glass she likes this. The reflection does not argue.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia reports the truth to the mirror like a successful spec. She wants more.',
  ] },
  { when: { gainStance: 'reluctant', corruption: [0] }, weight: 4, text: [
    'She says it once, quiet. The glass heard. She does not take it back.',
  ] },
]);
registerModuleVariants('emb.action.text_professor', [
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny: "hungry again." Sent. She watches the screen like a queue pop.`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya types it plain. "Hungry." She waits like the reply is the rest of the sentence.',
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya sends it like a status report. Hungry again. Awaiting instruction.',
  ] },
]);
registerModuleVariants('emb.action.roommate_tempt', [
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany orders for two, eats for almost two, leaves the evidence like hospitality.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy leaves wrappers on the counter the way she leaves cookies: on purpose.',
  ] },
]);
registerModuleVariants('emb.action.public_eating', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Quad, open container. Kylie eats like the camera is off. People look. She does not stop.',
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    'Serena fuels in public like a heat anyone can watch. No apology.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 4, text: [
    'She eats on the bench and keeps glancing at the path. Appetite still wins.',
  ] },
]);
registerModuleVariants('emb.action.generic', [
  { when: { studentId: 8 }, weight: 5, text: [
    'You move Maya\'s hands toward food. She follows. No speech required.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Your will, Lilith\'s mouth. She treats the blur like a hunt she already won.',
  ] },
]);
registerModuleVariants('emb.action.auto_surrender', [
  { when: { studentId: 5, stageMin: 5 }, weight: 6, text: [
    'Destiny opens the app and does not close it until the bags are a landscape.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia surrenders like gravity. Food arrives. She accepts every piece.',
  ] },
]);
registerModuleVariants('emb.action.immobile_feast', [
  { when: { studentId: 15, isImmobile: true }, weight: 6, text: [
    'Lilith cannot stand. Tribute arrives. She takes it like a larder that hunts sitting down.',
  ] },
  { when: { studentId: 0, stageMin: 10 }, weight: 6, text: [
    'Brittany feasts from the chair. The world brings the heat to her.',
  ] },
]);
registerModuleVariants('emb.action.midnight_snack', [
  { when: { studentId: 5 }, weight: 6, text: [
    '2 AM fridge light on Destiny. She eats standing. The queue can wait.',
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline and the blue glow. Cartons open. The source can wait until morning.',
  ] },
]);
registerModuleVariants('emb.action.vending_splurge', [
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya buys more than the rubric requires. You help her not care.',
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    'Indiana treats the machine like a cache. Bags fall. She eats before the bench.',
  ] },
]);
registerModuleVariants('emb.action.dessert_first', [
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé starts with dessert like a country that already decided.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane calls pie the first course and proves the recipe.',
  ] },
]);
registerModuleVariants('emb.action.body_exploration', [
  { when: { studentId: 8, stageMin: 4 }, weight: 6, text: [
    'Maya\'s hands map the new softness. She does not narrate. She stays there.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia measures the change like a prototype. The data is warm.',
  ] },
]);
registerModuleVariants('emb.action.hunger_spiral', [
  { when: { studentId: 16, hungerTierMin: 2 }, weight: 6, text: [
    'Sophia\'s ache stacks. She eats to quiet it and the quiet asks for more.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith does not spiral. She descends. The hunger is a staircase she owns.',
  ] },
]);

// ── emb.walk leftovers ────────────────────────────────────────
registerModuleVariants('emb.walk.arrive', [
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    'Brittany arrives like a captain who outgrew the hallway. Mass first.',
  ] },
  { when: { studentId: 8, stageMax: 3 }, weight: 5, text: [
    'Maya crosses campus small until you look twice at the stride.',
  ] },
]);
registerModuleVariants('emb.walk.move', [
  { when: { studentId: 3, stageMin: 5 }, weight: 5, text: [
    '→ {campus.destination} — Serena treats the walk like a heat she refuses to DNF.',
  ] },
]);

// ── emb.event leftovers ───────────────────────────────────────
registerModuleVariants('emb.event.stuck_door', [
  { when: { studentId: 0, stageMin: 6 }, weight: 6, text: [
    'Brittany turns sideways and still has to tug. She laughs like a scoreboard.',
  ] },
  { when: { studentId: 6, stageMin: 6 }, weight: 6, text: [
    'Tiffany misjudges the angle. Soft hip, then belly. The frame remembers.',
  ] },
]);
registerModuleVariants('emb.event.clothes_burst', [
  { when: { studentId: 0, stageMin: 5 }, weight: 6, text: [
    'A stitch pops on Brittany. She keeps walking like the uniform still won.',
  ] },
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    'Kylie\'s top rides up. She tugs once, then lets the frame have it.',
  ] },
]);
registerModuleVariants('emb.event.npc_stare', [
  { when: { studentId: 8 }, weight: 5, text: [
    '{ref.name} looks too long. Maya feels it and does not comment.',
  ] },
  { when: { studentId: 2 }, weight: 5, text: [
    '{ref.name} looks twice. Kylie calls it content and keeps eating.',
  ] },
]);
registerModuleVariants('emb.event.gossip_whisper', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Voices dip. Tiffany keeps walking. Appetite keeps score.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'Nadia catches her name in a sentence. She files it. She keeps eating.',
  ] },
]);
registerModuleVariants('emb.event.vending_splurge', [
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny feeds the machine like a gacha. Bags fall. She eats standing.',
  ] },
]);
registerModuleVariants('emb.event.cafeteria_binge', [
  { when: { studentId: 3, stageMin: 5 }, weight: 6, text: [
    'Serena takes unlimited personally. Tray, tray, tray. Staff stay neutral.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane treats the line like Sunday. The dining hall is winning with her.',
  ] },
]);
registerModuleVariants('emb.event.quad_picnic', [
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy accepts the unasked plate like she baked it. The lawn keeps offering.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Picnic smells find Chloé. She sits. She does not leave hungry.',
  ] },
]);
registerModuleVariants('emb.event.gym_scale_shame', [
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    'Sophia reads the number once and walks away flushed. The scale keeps the proof.',
  ] },
  { when: { studentId: 3, stageMin: 5 }, weight: 6, text: [
    'Serena steps on out of habit. The platform dips. She steps off like a false start.',
  ] },
]);
registerModuleVariants('emb.event.elevator_groan', [
  { when: { studentId: 0, stageMin: 7 }, weight: 6, text: [
    'The car complains when Brittany fills it. She pretends it is the cable.',
  ] },
  { when: { studentId: 15, stageMin: 8 }, weight: 6, text: [
    'Lilith fills the car. The indicator hesitates. She looks fed by the hesitation.',
  ] },
]);
registerModuleVariants('emb.event.faculty_treats', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline eats two éclairs before the footnote arrives with the third.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé accepts the last danish like departmental policy she wrote.',
  ] },
]);
registerModuleVariants('emb.event.immobile_anchor', [
  { when: { studentId: 15, stageMin: 10 }, weight: 6, text: [
    'Lilith is the room now. Drivers know the number. Tribute arrives. She accepts.',
  ] },
  { when: { studentId: 8, stageMin: 10 }, weight: 6, text: [
    'Maya cannot leave. Food comes. She thanks you with the quiet of a kept country.',
  ] },
]);
registerModuleVariants('emb.event.bully_forcefeed', [
  { when: { studentId: 8, refArchetype: 'cheerleader' }, weight: 6, text: [
    '{ref.name} plants a hand on Maya like squad policy. Maya eats. She does not narrate it.',
  ] },
]);
registerModuleVariants('emb.event.classmate_sighting', [
  { when: { studentId: 18 }, weight: 5, text: [
    '{ref.name} clocks Talia\'s change. Talia nods like a successful output.',
  ] },
]);

// ── leftover dinner group ─────────────────────────────────────
registerModuleVariants('dinner.groupConv.compliment_both.l2', [
  { when: { studentId: 4 }, weight: 5, text: [
    `You compliment both. Fiona looks at {ref.name} like a paired study, then eats.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.compliment_both.l3', [
  { when: { studentId: 10 }, weight: 5, text: [
    `Reneé accepts the compliment as a tasting note and finishes the evidence.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.let_it_settle.l3', [
  { when: { studentId: 5 }, weight: 5, text: [
    `Destiny lets the quiet finish the bit. Then she queues another bite.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.toast_together_group.l3', [
  { when: { studentId: 14 }, weight: 5, text: [
    `Mary Jane toasts like a harvest blessing and immediately cuts more pie.`,
  ] },
]);
registerModuleVariants('dinner.waiter.italian._f1', [
  { when: { studentId: 9 }, weight: 5, text: [
    'The Italian hostess clocks Chloé and refills bread like a country recognizing another.',
  ] },
]);
registerModuleVariants('dinner.waiter.french._f1', [
  { when: { studentId: 9 }, weight: 5, text: [
    'The French waiter hears Chloé and drops the English. The bread still arrives.',
  ] },
]);

// ── leftover collab ───────────────────────────────────────────
registerModuleVariants('collab.reveal.kylie.number', [
  { when: {}, weight: 4, text: [
    'Chat types the digits back in caps before Kylie finishes posing.',
  ] },
]);
registerModuleVariants('collab.zoom.mass', [
  { when: { studentId: 2, stageMin: 7 }, weight: 5, text: [
    'Close-up: Kylie and {partnerName} take the frame as weather, not decoration.',
  ] },
]);
registerModuleVariants('collab.push.good.open', [
  { when: { studentId: 2 }, weight: 5, text: [
    'You push the tray. Kylie treats the extra like content she already sold.',
  ] },
]);
registerModuleVariants('collab.push.bad.recover', [
  { when: { studentId: 2 }, weight: 5, text: [
    'The bit wobbles. Kylie eats through it until chat forgets the miss.',
  ] },
]);
registerModuleVariants('collab.crash.open', [
  { when: { studentId: 2 }, weight: 5, text: [
    'The collab tips. Kylie laughs with her mouth full and keeps the sit.',
  ] },
]);
