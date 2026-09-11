// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 15 — leftover talk.checkIn, stream.pre, recording, echo, campus, emb, evolved.
import { registerModuleVariants } from '../engine.js';

// ── talk.checkIn leftovers ────────────────────────────────────
registerModuleVariants('talk.checkIn.greetClose', [
  { when: { studentId: 0 }, weight: 6, text: [
    `"Winning the week. Hungry, but winning."`,
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    `"Notes are current. Appetite is… also current."`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `"Queue's fine. Stomach's louder than chat."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Fine." A beat. "Hungry. Fine."`,
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    `"Grand. American hours. American portions. I'm adapting."`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `"Present." Lilith does not decorate it.`,
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    `"Found the office. Found the snacks. Expedition's going well."`,
  ] },
]);

registerModuleVariants('talk.checkIn.dining', [
  { when: { studentId: 10 }, weight: 6, text: [
    `Reneé glances at the stash like a mise she already approved.`,
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    `Serena's eyes go to the snacks the way they go to a water station.`,
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    `Daisy already has something unwrapped. "Don't you start hungry too."`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `Sophia times a glance at the snacks like a measurement she will not log.`,
  ] },
  { when: { hungerTierMin: 2 }, weight: 5, text: [
    `Her attention lands on food and stays there a beat too long.`,
  ] },
]);

registerModuleVariants('talk.checkIn.diningLine', [
  { when: { studentId: 0 }, weight: 6, text: [
    `"Dining hall's been generous. I'm matching it."`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `"I optimized lunch. Then I optimized seconds."`,
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    `"Self-care looks a lot like extra helpings lately."`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    `"Harvest table's been kind. I haven't argued."`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `"Intake logs are up. The kitchen is cooperating."`,
  ] },
]);

registerModuleVariants('talk.checkIn.clothes', [
  { when: { studentId: 2, weekMin: 2 }, weight: 6, text: [
    `Kylie's top rides like last week's size is already archive footage.`,
  ] },
  { when: { studentId: 6, weekMin: 2 }, weight: 6, text: [
    `Tiffany's skirt sits like chapter standards moved and she did too.`,
  ] },
  { when: { studentId: 8, weekMin: 2 }, weight: 6, text: [
    `Maya's sweater clings at the middle. She does not adjust it.`,
  ] },
  { when: { studentId: 12, weekMin: 2 }, weight: 6, text: [
    `Nadia notes the waistband the way she notes a tell. Hers.`,
  ] },
  { when: { stageMin: 5 }, weight: 5, text: [
    `{subject.name}'s clothes keep the earlier version of her like a rumor.`,
  ] },
]);

registerModuleVariants('talk.checkIn.clothesNote', [
  { when: { studentId: 1 }, weight: 6, text: [
    `Madeline keeps talking as if fabric is off-topic.`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya lets you look. She does not narrate it.`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith watches you notice. Amused.`,
  ] },
  { when: { gainStance: 'secret', stageMax: 4 }, weight: 5, text: [
    `She changes the subject before the seam can become the subject.`,
  ] },
]);

registerModuleVariants('talk.checkIn.earlyWeight', [
  { when: { studentId: 0, stageMax: 4 }, weight: 6, text: [
    `At {subject.lbs} lbs Brittany still treats it like a season she can win.`,
  ] },
  { when: { studentId: 5, stageMax: 4 }, weight: 6, text: [
    `{subject.lbs} lbs. Destiny shrugs like a patch she already installed.`,
  ] },
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    `{subject.lbs} lbs. Sophia checks the number twice and leaves it there.`,
  ] },
  { when: { studentId: 17, stageMax: 4 }, weight: 6, text: [
    `{subject.lbs} lbs. Indiana calls it a find she is still mapping.`,
  ] },
]);

registerModuleVariants('talk.checkIn.bodySettle', [
  { when: { studentId: 3, stageMin: 5 }, weight: 6, text: [
    'Serena sits like a cooldown that decided to stay',
  ] },
  { when: { studentId: 8, stageMin: 5 }, weight: 6, text: [
    'Maya lets the chair take her without ceremony',
  ] },
  { when: { studentId: 10, stageMin: 5 }, weight: 6, text: [
    'Reneé settles the way a pot comes off the heat',
  ] },
  { when: { studentId: 14, stageMin: 5 }, weight: 6, text: [
    'Mary Jane fills the seat like a harvest wagon finding the barn',
  ] },
  { when: { stageMin: 8 }, weight: 5, text: [
    'She takes the reinforced chair as if it were built around her',
  ] },
]);

registerModuleVariants('talk.checkIn.bodyTouch', [
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    `Kylie cups the round of her belly like a thumbnail she already posted.`,
  ] },
  { when: { studentId: 8, stageMin: 5 }, weight: 6, text: [
    `Maya's palm rests on her middle and stays. Enough.`,
  ] },
  { when: { studentId: 12, stageMin: 5 }, weight: 6, text: [
    `Nadia names the gesture while she does it. "That's me checking in."`,
  ] },
  { when: { studentId: 15, stageMin: 5 }, weight: 6, text: [
    `Lilith's hand finds the warmest part of her and claims it.`,
  ] },
]);

registerModuleVariants('talk.checkIn.acceptClose', [
  { when: { studentId: 0 }, weight: 6, text: [
    `"I'm not fighting the roster. I'm filling it."`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `"The metric moved. I stopped calling it a problem."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Honest." Maya leaves it there.`,
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    `"I'm taking care of myself. Aggressively. On purpose."`,
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    `"Bless it. I like how this sits on me."`,
  ] },
]);

registerModuleVariants('talk.checkIn.ownedGesture', [
  { when: { studentId: 2, stageMin: 4 }, weight: 6, text: [
    'Kylie turns so the office gets the same angle chat would',
  ] },
  { when: { studentId: 6, stageMin: 4 }, weight: 6, text: [
    'Tiffany hosts her own body like a mixer already won',
  ] },
  { when: { studentId: 8, stageMin: 4 }, weight: 6, text: [
    'Maya presents the warm round of herself and waits',
  ] },
  { when: { studentId: 15, stageMin: 4 }, weight: 6, text: [
    'Lilith offers the view the way a hunter offers a kill',
  ] },
]);

registerModuleVariants('talk.checkIn.ownedTable', [
  { when: { studentId: 10 }, weight: 6, text: [
    `A plated extra sits at her elbow, still warm, clearly not the first.`,
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    `Tins and a covered dish wait like she packed for company and ate first.`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    `A jar of something homemade and a pastry box share the desk like harvest.`,
  ] },
  { when: { hungerTierMin: 2 }, weight: 5, text: [
    `She talks around a bite she never quite puts down.`,
  ] },
]);

registerModuleVariants('talk.checkIn.ownedClose', [
  { when: { studentId: 0 }, weight: 6, text: [
    `"Fed. Growing. You're here. That's the win column."`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `"Fed. Growing. Viewer present. Queue complete."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Stay." She means the food and the looking.`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `"Trial continues. You're the observer I wanted."`,
  ] },
]);

// ── leftover stream.pre cells (Destiny; gamer idiom in dialogue) ─
registerModuleVariants('stream.pre.outfit.revealing.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Crop top riding the new belly like it signed up for a different job.',
  ] },
]);
registerModuleVariants('stream.pre.outfit.revealing.c2', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'The shorts lose the argument with her thighs on camera.',
  ] },
]);
registerModuleVariants('stream.pre.outfit.revealing.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Chat asked for skin. Belly showed up first."`,
  ] },
]);
registerModuleVariants('stream.pre.outfit.branded.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Logo still fits. I don't. That's their problem."`,
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.quick.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'One pat to the swell, one glance at the preview, already done.',
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.quick.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Inventory: bigger. Moving on."`,
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.thorough.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Both hands sink into the middle she keeps promising is just a warm-up.',
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.thorough.c2', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Flesh folds slow between her fingers while the preview watches.',
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.thorough.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"That's today's map. Soft. Heavy. Mine."`,
  ] },
]);
registerModuleVariants('stream.pre.bodyCheck.showoff.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'She turns so the silhouette does the talking before she does.',
  ] },
]);
registerModuleVariants('stream.pre.snack.skip.c1', [
  { when: { hungerTierMin: 2 }, weight: 5, text: [
    'She pushes the plate away and watches it like it might crawl back.',
  ] },
]);
registerModuleVariants('stream.pre.snack.skip.line', [
  { when: { hungerTierMin: 2 }, weight: 5, text: [
    `"Saving the real raid for live. Don't test me."`,
  ] },
]);
registerModuleVariants('stream.pre.snack.light.c1', [
  { when: { stageMin: 5 }, weight: 5, text: [
    'She eats the small bag like a loading screen that already won.',
  ] },
]);
registerModuleVariants('stream.pre.snack.light.line', [
  { when: { stageMin: 5 }, weight: 5, text: [
    `"Tiny snack. Tiny lie. Stomach's already awake."`,
  ] },
]);
registerModuleVariants('stream.pre.snack.heavy.c1', [
  { when: { stageMin: 5 }, weight: 5, text: [
    'Takeout open, both hands working, overlay not even live yet.',
  ] },
]);
registerModuleVariants('stream.pre.snack.heavy.c2', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Her belly is already against the desk while she keeps chewing.',
  ] },
]);
registerModuleVariants('stream.pre.warmup.stretch.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Shoulders roll; the belly takes a second longer to finish moving.',
  ] },
]);
registerModuleVariants('stream.pre.warmup.stretch.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Body's logged in. Appetite's already in the lobby."`,
  ] },
]);
registerModuleVariants('stream.pre.warmup.eat.c1', [
  { when: { stageMin: 5 }, weight: 5, text: [
    'Practice bites land before the countdown. She does not hide them.',
  ] },
]);
registerModuleVariants('stream.pre.warmup.eat.line', [
  { when: { stageMin: 5 }, weight: 5, text: [
    `"Warm-up calories. Main event still queued."`,
  ] },
]);
registerModuleVariants('stream.pre.setup.minimal.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'One camera nudge around the new mass. She calls it good.',
  ] },
]);
registerModuleVariants('stream.pre.setup.minimal.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Angle's honest. That's the production value."`,
  ] },
]);
registerModuleVariants('stream.pre.setup.comfort.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Snacks, pillows, chair angle — she builds a nest the stream can sit in.',
  ] },
]);
registerModuleVariants('stream.pre.setup.production.c1', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'Lights and overlay get a real pass. The belly stays in the hero shot.',
  ] },
]);
registerModuleVariants('stream.pre.setup.production.line', [
  { when: { stageMin: 6 }, weight: 5, text: [
    `"Pretty lights. Honest belly. That's the brand."`,
  ] },
]);

// ── leftover recording ────────────────────────────────────────
registerModuleVariants('recording.wrap.good', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Good clip. Kylie at {subject.lbs} — softer, still performing, already asking for the next take.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Good take. Destiny wipes her mouth. "Ship it. Patch later."`,
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    'Good frame. Fiona looks at the playback like a composition that finally sat still.',
  ] },
]);
registerModuleVariants('recording.oneMore.s1', [
  { when: { studentId: 7 }, weight: 5, text: [
    `Priya nods. "Again. I can improve the take." She already has another bite ready.`,
  ] },
  { when: { studentId: 1 }, weight: 5, text: [
    `Madeline adjusts her glasses. "One more sample. For the record."`,
  ] },
]);
registerModuleVariants('recording.oneMore.s2', [
  { when: { studentId: 11 }, weight: 5, text: [
    `Kaylee smiles. "One more. Self-care looks good on camera."`,
  ] },
  { when: { studentId: 16 }, weight: 5, text: [
    `Sophia checks the slate. "Repeat trial. Same inputs."`,
  ] },
]);
registerModuleVariants('recording.oneMore.s4', [
  { when: { studentId: 17 }, weight: 5, text: [
    `Indiana grins. "Again. The find's still warm."`,
  ] },
  { when: { studentId: 18 }, weight: 5, text: [
    `Talia: "One more iteration. Camera stays."`,
  ] },
]);

// ── leftover echo depth ───────────────────────────────────────
registerModuleVariants('echo.capture.depth', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya lets the moment stay. The archive does not need her to explain it.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith keeps the instant like prey. Warm. Retrievable.',
  ] },
]);
registerModuleVariants('echo.replay.depth', [
  { when: { studentId: 1 }, weight: 5, text: [
    'Madeline revisits the sample. Heat returns with better notes.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'Nadia watches herself want. The echo names the dynamic again.',
  ] },
]);
registerModuleVariants('echo.resonate.depth', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie feels the clip in her body. Growth answers like a comment she pinned.',
  ] },
]);
registerModuleVariants('echo.type.stage_up.depth', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany crossed it like a scoreboard. The room kept the points.',
  ] },
]);
registerModuleVariants('echo.type.weigh_in.depth', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Priya filed the number. Then she smiled at the file.',
  ] },
]);
registerModuleVariants('echo.type.dinner_unbutton.depth', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé kept eating. The button became garnish.',
  ] },
]);
registerModuleVariants('echo.type.immobility.depth', [
  { when: { studentId: 13 }, weight: 5, text: [
    'Daisy stayed put. The world brought plates. She blessed every one.',
  ] },
]);
registerModuleVariants('echo.type.corruption_tier.depth', [
  { when: { studentId: 16 }, weight: 5, text: [
    'Sophia stopped asking the protocol for permission.',
  ] },
]);
registerModuleVariants('echo.type.evolution.depth', [
  { when: { studentId: 4 }, weight: 5, text: [
    'Fiona chose the form. The archive caught the first honest breath after.',
  ] },
]);
registerModuleVariants('echo.v2.depth', [
  { when: { studentId: 8, stageMin: 5 }, weight: 5, text: [
    `Maya's echo stays quiet and exact. The warmth is the whole file.`,
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    `Lilith's archive is a larder. Revisit means hunger again.`,
  ] },
]);

// ── leftover campus observation / result IDs ──────────────────
registerModuleVariants('campusEvent.observation', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline opens the notebook, then the snack. Lecture is the second tab.',
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    'Serena drops into the seat like a cooldown. Water bottle. Hidden pastry.',
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona arrives paint-smudged and already composing the hour around a bite.',
  ] },
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany treats the lecture hall like a mixer with assigned seating.',
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    'Kaylee scans the room for who needs care, then her own stomach answers first.',
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    'Nadia takes the back and watches the class watch her. Appetite included.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy unpacked a tin before the slides loaded. Policy.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane smells like kitchen and hay. She looks glad to sit and eat.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith claims the chair like a perch. Lecture is scenery.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia sits too straight. The thermos is a protocol she can still control.',
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    'Indiana boots on the rung, trail mix already open. Campus is a dig site.',
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia logs the hour, then the snack. Both go in the notebook.',
  ] },
]);
registerModuleVariants('campusEvent.result', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline writes one line, then eats. The page looks happier.',
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    'Serena sits easier. Whatever you did, she files it as recovery.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny nods at the food. "Queued. Thanks."`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya updates the plan. Appetite is now a scheduled item.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé calls it civilized. She means you noticed.',
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    'Kaylee looks cared-for. She lets that be enough.',
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    `Nadia says, "You intervened. I noticed." Then she eats.`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane beams like harvest landed in the lecture hall.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia unclenches one shoulder. Protocol survived. So did lunch.',
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    `Indiana pockets the last bite. "Good cache."`,
  ] },
]);

// ── leftover emb.action uniqueness ────────────────────────────
registerModuleVariants('emb.action.raid_pantry.beat', [
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny raids the shelves like a crate run. Cartons first. Naming later.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé inventories the pantry with both hands and no recipe card.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane treats the cabinet like a root cellar that finally opened.',
  ] },
]);
registerModuleVariants('emb.action.secret_binge.beat', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline locks the door and eats like the study is the experiment.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya eats in silence. Bags empty. The room keeps the secret.',
  ] },
]);
registerModuleVariants('emb.action.seduce_appetite', [
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany stops hosting politeness. Hunger gets the invite.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé lets want speak American. The plate answers.',
  ] },
]);
registerModuleVariants('emb.action.mirror_confession', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie tells the glass what chat already knows. She wants more.',
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    'Nadia narrates the confession as she makes it. The reflection agrees.',
  ] },
]);
registerModuleVariants('emb.action.text_professor', [
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya types "hungry again" like a status report. Sends it anyway.`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia sends the plain text. Then stares at the screen for a reply.',
  ] },
]);
registerModuleVariants('emb.action.roommate_tempt', [
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany orders for two. Eats for almost two. Leaves the evidence social.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy leaves tins out on purpose. Kindness, she will call it.',
  ] },
]);
registerModuleVariants('emb.action.public_eating', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany eats on the quad like a win the squad can watch.',
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    'Serena eats in public with athlete posture and no apology.',
  ] },
]);
registerModuleVariants('emb.action.midnight_snack', [
  { when: { studentId: 5 }, weight: 6, text: [
    '2 AM fridge light. Destiny raids on mute. Queue empty. Stomach not.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya in the blue glow. Spoon. Quiet. Enough.',
  ] },
]);
registerModuleVariants('emb.action.vending_splurge', [
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya empties the machine like a completed checklist. Eats walking.',
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    'Indiana treats the vending hall like a supply cache. Arms full.',
  ] },
]);
registerModuleVariants('emb.action.dessert_first', [
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé starts with pastry. Dinner can follow if it behaves.',
  ] },
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona opens with frosting. The rest of the plate is composition.',
  ] },
]);
registerModuleVariants('emb.action.body_exploration', [
  { when: { studentId: 8, stageMin: 5 }, weight: 6, text: [
    'Maya maps the new middle with both palms. She keeps what she finds.',
  ] },
  { when: { studentId: 11, stageMin: 5 }, weight: 6, text: [
    'Kaylee checks her own softness like care, then likes the answer.',
  ] },
]);
registerModuleVariants('emb.action.hunger_spiral', [
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith rides the spiral like a hunt that feeds itself.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny eats because the next bite is queued. Fullness can wait.',
  ] },
]);
registerModuleVariants('emb.action.auto_surrender', [
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    'Kylie opens the app and does not close it. Content will catch up.',
  ] },
]);
registerModuleVariants('emb.action.immobile_feast', [
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy stays seated. Plates arrive. She blesses the tribute and eats it.',
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane cannot rise. Harvest comes to her. She laughs and takes it.',
  ] },
]);
registerModuleVariants('emb.action.generic', [
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia follows the hands toward food. The model updates mid-bite.',
  ] },
]);

// ── leftover evolved / salon / artisan hubs ───────────────────
registerModuleVariants('salon_appetit.hub', [
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé sets four courses like a thesis on American appetite. Wine first.',
  ] },
  { when: { stageMin: 6 }, weight: 5, text: [
    'Candles, guest book, hips that already RSVP\'d yes to the last course.',
  ] },
]);
registerModuleVariants('artisan_gallery.hub', [
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona feeds the model, then clicks. The archive grows softer on the wall.',
  ] },
  { when: { stageMin: 6 }, weight: 5, text: [
    'Prints on twine. Bodies in frame. Evidence she will not call evidence.',
  ] },
]);
registerModuleVariants('evolved.v2.depth', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie\'s path is a channel. Appetite is the brand. Mass is the drop.',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Chloé\'s salon path makes hunger look like taste. The hips disagree politely.',
  ] },
  { when: { studentId: 4 }, weight: 5, text: [
    'Fiona\'s form is a composition she keeps enlarging on purpose.',
  ] },
]);
registerModuleVariants('evolved.salon.v2.depth', [
  { when: { studentId: 9, stageMin: 5 }, weight: 5, text: [
    'The salon is her. Courses, guests, a body that hosts the whole evening.',
  ] },
]);
registerModuleVariants('evolved.gallery.v2.depth', [
  { when: { studentId: 4, stageMin: 5 }, weight: 5, text: [
    'The gallery hangs what she became. She keeps adding canvases in flesh.',
  ] },
]);
registerModuleVariants('evolved.cultivator.v2.depth', [
  { when: { studentId: 14, stageMin: 5 }, weight: 5, text: [
    'Harvest lives on her. The garden is a belly that keeps ripening.',
  ] },
]);
registerModuleVariants('evolved.feedee.v2.depth', [
  { when: { studentId: 5, stageMin: 5 }, weight: 5, text: [
    'Destiny\'s feedee path is a queue that never empties. She likes the lag.',
  ] },
]);
registerModuleVariants('evolved.machine.v2.depth', [
  { when: { studentId: 18, stageMin: 5 }, weight: 5, text: [
    'Talia\'s machine path keeps printing mass. She calls it yield.',
  ] },
]);
registerModuleVariants('evolved.pharmacist.v2.depth', [
  { when: { studentId: 16, stageMin: 5 }, weight: 5, text: [
    'Sophia\'s path is a dose she keeps repeating. Softness is the result.',
  ] },
]);
registerModuleVariants('evolved.gainer.v2.depth', [
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    'Brittany treats the gainer path like a season record she intends to keep.',
  ] },
]);
registerModuleVariants('evolved.homeroomQueen.v2.depth', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'The classroom rearranges around her. Lessons arrive with extra servings.',
  ] },
]);

// ── leftover weekly uniqueness ────────────────────────────────
registerModuleVariants('weekly.viralPost.hook', [
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie posts the still before she reads the caption. Belly first. Brand later.',
  ] },
]);
registerModuleVariants('weekly.gamingSponsor.deal', [
  { when: { studentId: 5 }, weight: 6, text: [
    'The sponsor wants Destiny in their size. She is already past it.',
  ] },
]);
registerModuleVariants('weekly.artExhibition.opening', [
  { when: { studentId: 4 }, weight: 6, text: [
    'Fiona hangs the new work. The biggest piece is still wearing her clothes.',
  ] },
]);
registerModuleVariants('weekly.thesisRewrite.title', [
  { when: { studentId: 1 }, weight: 6, text: [
    'Madeline retitles the paper around appetite. The committee will blink.',
  ] },
]);
registerModuleVariants('weekly.quietOpen.close', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya finishes the confession the way she started it. Quiet. Kept.',
  ] },
]);
registerModuleVariants('weekly.customClothing.announce', [
  { when: { studentId: 6 }, weight: 6, text: [
    'Tiffany unveils the custom fit like a rush that finally caught up.',
  ] },
]);
registerModuleVariants('weekly.immobilityPeace.scene', [
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy stays. The room comes to her. Peace looks like extra pie.',
  ] },
]);
registerModuleVariants('weekly.blobEnding.line', [
  { when: { studentId: 15 }, weight: 6, text: [
    `"Soon," Lilith says, and the room already belongs to her.`,
  ] },
]);
