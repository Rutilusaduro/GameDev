// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 20 — unique cultivator.choice leftovers (depth.js recycled 3 stems
// onto every ID), leftover eating/stageUp, leftover device slots (one per
// skeleton), leftover diary parents, leftover supernatural.thin, leftover
// stream/collab/campus standalone.
import { registerModuleVariants } from '../engine.js';

// ── cultivator.choice milkshake (tester subject; she, food-specific) ─
registerModuleVariants('cultivator.choice.milkshake.std_base', [
  { when: {}, weight: 8, text: [
    'She drinks the whole-milk shake like a normal tasting. Glass empty. Softness already starting.',
    'Standard blend, three scoops. She finishes it like a polite guest and sits softer.',
  ] },
]);
registerModuleVariants('cultivator.choice.milkshake.cream_base', [
  { when: {}, weight: 8, text: [
    'Heavy cream coats her tongue. She calls it richer and keeps the straw working until it scrapes air.',
    'Cream base, same look as milk. She names the density and still drains the glass.',
  ] },
]);
registerModuleVariants('cultivator.choice.milkshake.malt_base', [
  { when: {}, weight: 8, text: [
    'Malt sweetness she cannot name. She finishes the glass anyway, licking the rim once.',
    'Old-school malt. She hunts the flavor, fails, and drinks the rest as research.',
  ] },
]);
registerModuleVariants('cultivator.choice.milkshake.one_glass', [
  { when: {}, weight: 8, text: [
    'One measured glass. She thanks the kitchen and sits a little rounder in the stool.',
    'A single pour, professional. She returns the empty glass with a softer middle.',
  ] },
]);
registerModuleVariants('cultivator.choice.milkshake.large_cup', [
  { when: {}, weight: 8, text: [
    'She takes the oversized cup as leftover batch. Twice the glass. Gone before the ice settles.',
    '"I made extra," and she believes it. The large cup leaves a visible swell.',
  ] },
]);
registerModuleVariants('cultivator.choice.milkshake.full_blender', [
  { when: {}, weight: 8, text: [
    'She tilts the blender pitcher like that is a serving. It is not. She empties it.',
    'Finish-the-blender framing works. She drinks standing, then needs the stool.',
  ] },
]);

// ── cultivator.choice cookies ─────────────────────────────────
registerModuleVariants('cultivator.choice.cookies.std_dough', [
  { when: {}, weight: 8, text: [
    'Butter-and-sugar cookies, nothing fancy. She eats them like homework she likes.',
    'Reliable dough. She takes two, then the rest, like the recipe asked nicely.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.sweet_chips', [
  { when: {}, weight: 8, text: [
    'Extra chips, extra sugar. She asks what changed and then reaches for another.',
    'Sweeter batch. She will request these next visit. She is already on number four.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.stuffed_dough', [
  { when: {}, weight: 8, text: [
    'Cream hides in the middle. She finds it late and does not stop the plate.',
    'Filled centers. She notices the calories after the last bite, not before.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.twelve', [
  { when: {}, weight: 8, text: [
    'A dozen, still warm. She treats twelve like a polite number and finishes the last one warm.',
    'Standard dozen. She counts once, then eats past counting.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.double_batch', [
  { when: {}, weight: 8, text: [
    'She bags the extras for later. Later is the walk home. Most do not survive the bag.',
    'Overbake excuse. She takes the second tray home and arrives heavier.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.underbaked', [
  { when: {}, weight: 8, text: [
    'Soft centers. She says just one more while reaching. The tray loses.',
    'Warm and underdone. Stopping at two was never going to happen.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.three_plated', [
  { when: {}, weight: 8, text: [
    'Three cookies, plated clean. She eats three and looks at the tray like manners won.',
    'Professional plate of three. She finishes them and does not ask. She wants to.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.finish_batch', [
  { when: {}, weight: 8, text: [
    'Helping finish the batch turns into a second lunch. She accepts the favor with both hands.',
    'Favor framing. She clears the cooling rack and thanks the kitchen with a fuller middle.',
  ] },
]);
registerModuleVariants('cultivator.choice.cookies.add_milk', [
  { when: {}, weight: 8, text: [
    'Warm milk with the cookies. Volume stacks in her middle. She thanks you with a milky smile.',
    'Cookies plus a mug. She drinks after she is already full and calls it pairing.',
  ] },
]);

// ── cultivator.choice cake ────────────────────────────────────
registerModuleVariants('cultivator.choice.cake.std_batter', [
  { when: {}, weight: 8, text: [
    'Ordinary cake. She takes a bite like anyone would. The crumb is honest. So is the second fork.',
    'Reliable batter. She treats it like bakery-standard and still goes back for crumbs.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.extra_butter', [
  { when: {}, weight: 8, text: [
    'She tastes the extra butter and calls it quality. The slice disappears faster for it.',
    'Richer today. She blames good ingredients and licks the fork clean.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.lard_sub', [
  { when: {}, weight: 8, text: [
    'Denser crumb, heavier sit. She cannot name the trick. She takes another forkful.',
    'Bakery method. She feels the weight of the crumb and keeps eating through it.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.light_glaze', [
  { when: {}, weight: 8, text: [
    'Thin glaze, polite look. She eats around it first, then the rest of the slice.',
    'Minimal shine. She trusts the restraint and finishes the slice anyway.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.buttercream', [
  { when: {}, weight: 8, text: [
    'Thick frosting. She scrapes the plate clean and pretends that is normal cake behavior.',
    'Generous coat. The fork noise at the end is the only comment she makes.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.ganache', [
  { when: {}, weight: 8, text: [
    'Glossy pour, no restraint. She accepts it as decoration and then eats the decoration.',
    'Heavy ganache. She calls it pretty, then eats the pretty.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.one_slice', [
  { when: {}, weight: 8, text: [
    'One slice, standard. She finishes it looking satisfied and a little softer in the chair.',
    'Normal portion. She is satisfied, and also looking at the remaining cake.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.generous', [
  { when: {}, weight: 8, text: [
    'The stale excuse works. She takes the wide slice without arguing the math.',
    'It will go stale. She believes that long enough to finish the wide piece.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.whole_cake', [
  { when: {}, weight: 8, text: [
    'She takes the rest home. The container does not come back. Her middle does the explaining.',
    'Take-the-rest. She can. She does. The tin stays wherever she emptied it.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.as_is', [
  { when: {}, weight: 8, text: [
    'Cake as-is. No garnish speech. She finishes the plate like a clean close.',
    'No extras. She still leaves the plate clean and the chair a little tighter.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.cream_sauce', [
  { when: {}, weight: 8, text: [
    'Drizzle sold as a finish. It doubles the slice. She does not ask what it is.',
    'Finishing touch. She eats the cream and the cake like they were always one thing.',
  ] },
]);
registerModuleVariants('cultivator.choice.cake.ice_cream', [
  { when: {}, weight: 8, text: [
    'Ice cream beside cake she is already full from. She eats both. She always does.',
    'It pairs well. She is past full and still finishes the scoop.',
  ] },
]);

// ── leftover cultivator.eating uniqueness ─────────────────────
registerModuleVariants('cultivator.eating.s0', [
  { when: {}, weight: 6, text: [
    'She treats the tasting like a courtesy visit and leaves with a softer waistband.',
  ] },
]);
registerModuleVariants('cultivator.eating.s1', [
  { when: {}, weight: 6, text: [
    'A pause, then appetite. She files the pause as politeness and keeps eating.',
  ] },
]);
registerModuleVariants('cultivator.eating.s2', [
  { when: {}, weight: 6, text: [
    'She eats past the tasting-note line. The kitchen watches. She does not.',
  ] },
]);
registerModuleVariants('cultivator.eating.s3', [
  { when: {}, weight: 6, text: [
    'She watches the plate like it might confess. Then she finishes it first.',
  ] },
]);
registerModuleVariants('cultivator.eating.s4', [
  { when: {}, weight: 6, text: [
    'She starts slower now. She still ends empty. The goodbye is thinner than the belly.',
  ] },
]);

// ── leftover cultivator.stageUp ───────────────────────────────
registerModuleVariants('cultivator.stageUp.t6', [
  { when: {}, weight: 5, text: [
    'New softness shows in how she sits. She still talks recipes, not sizes.',
  ] },
]);
registerModuleVariants('cultivator.stageUp.t7', [
  { when: {}, weight: 5, text: [
    'She fills more of the stool. The plate is already smaller than her hunger.',
  ] },
]);
registerModuleVariants('cultivator.stageUp.t8', [
  { when: {}, weight: 5, text: [
    'She moves like the room shrunk. Appetite did not.',
  ] },
]);
registerModuleVariants('cultivator.stageUp.t9', [
  { when: {}, weight: 5, text: [
    'Doorway math, then dinner. She does both without apology.',
  ] },
]);

// ── leftover device slots (one per skeleton; she, no names) ───
registerModuleVariants('device.use.risk', [
  { when: { studentId: 18 }, weight: 6, text: [
    'she watches the safeties blink and stays in the cycle anyway',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'she holds still through the hot run. Trust looks like that',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'she counts the ticks like a protocol and lets the last one land',
  ] },
]);
registerModuleVariants('device.mod.integration', [
  { when: { studentId: 18 }, weight: 6, text: [
    'your wiring sits in her spec now. She approves by staying seated',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'the new profile is yours. She feels it and does not argue authorship',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'she notes the changed curve the way she notes a formula. Then she takes it',
  ] },
]);
registerModuleVariants('device.campus.discovery', [
  { when: { studentId: 2 }, weight: 6, text: [
    'a phone lifts in the quad. She keeps walking like the pulse is weather',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'someone stares. She treats it like a bleacher look and does not hide',
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'a TA glances twice. She files the glance and finishes the hour',
  ] },
]);

// ── leftover diary evolved parents (first person, standalone) ─
registerModuleVariants('diary.competitive_gainer.s6', [
  { when: {}, weight: 6, text: [
    'I measured the gap after seconds. The ruler fogged. I called that calibration.',
  ] },
]);
registerModuleVariants('diary.competitive_gainer.s7', [
  { when: {}, weight: 6, text: [
    'I moved Brittany down a row with my hip, not the pin. Logged it as contact sport.',
  ] },
]);
registerModuleVariants('diary.competitive_gainer.s9', [
  { when: {}, weight: 6, text: [
    'The board leans. I lean harder. First place is a sitting problem now.',
  ] },
]);
registerModuleVariants('diary.competitive_gainer.s10', [
  { when: {}, weight: 6, text: [
    'I write without standing. The column still climbs. So does the chair bill.',
  ] },
]);
registerModuleVariants('diary.competitive_gainer.s11', [
  { when: {}, weight: 6, text: [
    'Stationary champion. The file stays open because hunger is still scoring.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s6', [
  { when: {}, weight: 6, text: [
    'I tuned the loop until the belly answered on the first pulse. Kept the grease print.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s7', [
  { when: {}, weight: 6, text: [
    'Feeder arm online. I ate through the beep and left crumbs on the schematic.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s9', [
  { when: {}, weight: 6, text: [
    'I am the jig. The jig is thriving. The fan complains and I do not.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s10', [
  { when: {}, weight: 6, text: [
    'Bench sticky. I am stickier. Log stays open because the hardware still wants work.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s11', [
  { when: {}, weight: 6, text: [
    'Dual intake, machine and mouth. I keep both powered. Standing is a closed ticket.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s6', [
  { when: {}, weight: 6, text: [
    'Second bottle sweating. I stayed in the good chair and let the plates travel.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s7', [
  { when: {}, weight: 6, text: [
    'The extra seat was warm before the guest sat. I approved that with another plate.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s9', [
  { when: {}, weight: 6, text: [
    'I hold court from one chair. Forks commute. I do not.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s10', [
  { when: {}, weight: 6, text: [
    'Salon as nest. I am centerpiece and appetite. The candles last longer than I move.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s11', [
  { when: {}, weight: 6, text: [
    'Guest book is my waistband. Full. Still taking names between bites.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s6', [
  { when: {}, weight: 6, text: [
    'Batch two still warm. I am pipette and proof. I took the second scoop on purpose.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s7', [
  { when: {}, weight: 6, text: [
    'Label glue on my thumb. Extra helping cooling. I took both before the timer.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s9', [
  { when: {}, weight: 6, text: [
    'Timer ignored. Yield obvious. Notes still neat beside the empty bowl.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s10', [
  { when: {}, weight: 6, text: [
    'I write from a wider chair. The formula does not need a revision. I do.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s11', [
  { when: {}, weight: 6, text: [
    'Stationary subject, open file, appetite current. Dose continues without standing.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s6', [
  { when: {}, weight: 6, text: [
    'Consent ink, dinner smell. The subject is still chewing in the frame I hung.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s7', [
  { when: {}, weight: 6, text: [
    'Light meter kissing skin. I am installation and mouth. The print already knew.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s9', [
  { when: {}, weight: 6, text: [
    'The hang is permanent. So is the softness under the print. Viewers look up.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s10', [
  { when: {}, weight: 6, text: [
    'Gallery as body. I fill the room the way the work asked, and then some.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s11', [
  { when: {}, weight: 6, text: [
    'Last label: appetite, life-size, not for sale. I am still hungry under the lights.',
  ] },
]);

// ── leftover supernatural.thin diversity ──────────────────────
registerModuleVariants('supernatural.thin.sumo_wraith', [
  { when: {}, weight: 5, text: [
    'Dohyo empty, appetite still in stance. I bow to a meal that has not arrived.',
  ] },
]);
registerModuleVariants('supernatural.thin.hollow_icon', [
  { when: {}, weight: 5, text: [
    'The lens wants absence. My stomach posts a hunger the algorithm cannot crop.',
  ] },
]);
registerModuleVariants('supernatural.thin.pep_ghost', [
  { when: {}, weight: 5, text: [
    'Spirit fingers, empty middle. I cheer the squad and taste the after-practice spread in memory.',
  ] },
]);
registerModuleVariants('supernatural.thin.archivist_skin', [
  { when: {}, weight: 5, text: [
    'I filed the mass and kept the index. Every footnote is a meal I still want.',
  ] },
]);
registerModuleVariants('supernatural.thin.lag_sprite', [
  { when: {}, weight: 5, text: [
    'Body one frame behind. Stomach queued. Fullness never loads, hunger never drops.',
  ] },
]);
registerModuleVariants('supernatural.thin.silhouette_host', [
  { when: {}, weight: 5, text: [
    'I host in outline. Their plates arrive as warmth I cannot keep.',
  ] },
]);
registerModuleVariants('supernatural.thin.metric_hollow', [
  { when: {}, weight: 5, text: [
    'Dashboard green. Belly red. Appetite exceeds every quota I still report.',
  ] },
]);
registerModuleVariants('supernatural.thin.curator_wraith', [
  { when: {}, weight: 5, text: [
    'White walls, empty plinth. Hunger is the piece I cannot deinstall.',
  ] },
]);
registerModuleVariants('supernatural.thin.hive_mote', [
  { when: {}, weight: 5, text: [
    'Thin conduit, thick wanting. The hive eats through a middle that holds nothing.',
  ] },
]);
registerModuleVariants('supernatural.thin.salon_wraith', [
  { when: {}, weight: 5, text: [
    'Champagne vapor. Canapés I cannot keep. Elegance with a starving core.',
  ] },
]);
registerModuleVariants('supernatural.thin.apple_oracle', [
  { when: {}, weight: 5, text: [
    'Homeroom preaches moderation. I taste every refused apple in the hollow.',
  ] },
]);
registerModuleVariants('supernatural.thin.harvest_maiden', [
  { when: {}, weight: 5, text: [
    'Season stripped the flesh. Fields remember fullness. I do too.',
  ] },
]);
registerModuleVariants('supernatural.thin.mirror_thin', [
  { when: {}, weight: 5, text: [
    'Glass kept her curves. I kept her appetite. Hunger bridges both.',
  ] },
]);
registerModuleVariants('supernatural.thin.sous_wight', [
  { when: {}, weight: 5, text: [
    'Steam through me. Flavor on the tongue, never the middle. I season and starve.',
  ] },
]);
registerModuleVariants('supernatural.thin.dose_saint', [
  { when: {}, weight: 5, text: [
    'Serum made me luminous and vacant. Hunger is the side effect I will not cure.',
  ] },
]);
registerModuleVariants('supernatural.thin.wire_saint', [
  { when: {}, weight: 5, text: [
    'Current flows. Calories slip. The circuit hoards appetite instead of mass.',
  ] },
]);

// ── leftover collab Wren chat (match chatter shape) ───────────
registerModuleVariants('collab.stream.wren.s1', [
  { when: {}, weight: 5, text: [
    'wrenWatchesEverything: regular now. I refresh before the overlay even loads.',
  ] },
]);
registerModuleVariants('collab.stream.wren.s2', [
  { when: {}, weight: 5, text: [
    'wrenWatchesEverything: top donor again. I called the stage-up last week. Look.',
  ] },
]);
registerModuleVariants('collab.stream.wren.s4', [
  { when: {}, weight: 5, text: [
    'wrenWatchesEverything: I drove here. Waiting-area lighting. I am not emotionally ready.',
  ] },
]);
registerModuleVariants('collab.stream.wren.s5', [
  { when: {}, weight: 5, text: [
    'wrenWatchesEverything: I am in the room. She knows. I have been watching since 258.',
  ] },
]);

// ── leftover stream chat / special / wrap ─────────────────────
registerModuleVariants('stream.chat.perf.poor', [
  { when: {}, weight: 4, text: [
    'she whiffed the sit and I still clipped it',
    'chat being mean and she used it as seasoning anyway',
  ] },
]);
registerModuleVariants('stream.chat.parasocial.veryLate', [
  { when: {}, weight: 4, text: [
    'we live in this chair now. she is the expansion pack',
    'late-game sit. I have been here since the overlay was a joke',
  ] },
]);
registerModuleVariants('stream.chat.brandControl.soldOut', [
  { when: {}, weight: 4, text: [
    'corporate gluttony and I bought the merch',
    'brand owns the tray. she owns the sit. we own nothing',
  ] },
]);
registerModuleVariants('stream.chat.brandControl.late', [
  { when: {}, weight: 4, text: [
    'mascot behavior. I am not unsubscribing',
  ] },
]);
registerModuleVariants('stream.endStream.verypoor', [
  { when: {}, weight: 5, text: [
    'Wipe. Hoodie up. I am eating about it off-camera and you cannot have that VOD.',
  ] },
]);
registerModuleVariants('stream.special.perfect_stream', [
  { when: {}, weight: 5, text: [
    'Clean run. I will be insufferable and the tray will back me up.',
  ] },
]);
registerModuleVariants('stream.special.viral_moment', [
  { when: {}, weight: 5, text: [
    'Phone exploding because I chewed on camera. Career peak, unfortunately real.',
  ] },
]);
registerModuleVariants('stream.special.brand_gift', [
  { when: {}, weight: 5, text: [
    'Crate mid-wrap. They like the sit. I like the crate. Deal.',
  ] },
]);
registerModuleVariants('stream.special.feast_god', [
  { when: {}, weight: 5, text: [
    'Feast overlay is rude. I am framing it anyway.',
  ] },
]);
registerModuleVariants('stream.special.comeback_queen', [
  { when: {}, weight: 5, text: [
    'They counted me out. I popped off late. Stay for the VOD, cowards.',
  ] },
]);
registerModuleVariants('stream.special.chat_legend', [
  { when: {}, weight: 5, text: [
    'Chat carried. I sat. Do not get sentimental. Clip the sit.',
  ] },
]);

// ── leftover stream.pre cells (distinct nouns vs casual.c3/line) ─
registerModuleVariants('stream.pre.outfit.casual.c1', [
  { when: { stageMin: 5 }, weight: 5, text: [
    'monitor preview shows the tee already negotiating with her chest',
  ] },
  { when: { stageMin: 8 }, weight: 5, text: [
    'preview crop cuts her at the swell. She leaves it. The camera can cope',
  ] },
]);
registerModuleVariants('stream.pre.outfit.casual.c2', [
  { when: { stageMin: 5 }, weight: 5, text: [
    'hem riding when she sits, a strip of warm skin the overlay will catch',
  ] },
  { when: { stageMin: 8 }, weight: 5, text: [
    'hips take the chair first. Fabric follows late, if it follows',
  ] },
]);

// ── leftover campusEvent standalone (leftover girls) ──────────
registerModuleVariants('campusEvent.scene.mood_focused', [
  { when: { studentId: 7 }, weight: 8, text: [
    'Priya is in the rubric. Interruption would cost a point. A pastry would not.',
  ] },
  { when: { studentId: 16 }, weight: 8, text: [
    'Sophia is dosing the hour like a protocol. Hunger is the unlisted side effect.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_excited', [
  { when: { studentId: 0 }, weight: 8, text: [
    'Brittany is already talking with her hands. Energy needs a plate or it will invent one.',
  ] },
  { when: { studentId: 5 }, weight: 8, text: [
    'Destiny bounced in like a queue popped. She will sit. She will also eat.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_group_project', [
  { when: { studentId: 16 }, weight: 8, text: [
    'Sophia assigns tasting roles like lab stations. She takes the richest one.',
  ] },
  { when: { studentId: 18 }, weight: 8, text: [
    'Talia turns the meal-plan into a schematic. Then she eats the prototype.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_potluck', [
  { when: { studentId: 10 }, weight: 8, text: [
    'Reneé brought two tins and still circles everyone else\'s. Peer review, she says.',
  ] },
  { when: { studentId: 14 }, weight: 8, text: [
    'Mary Jane\'s casserole arrived first. She is already making room for seconds.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_extended', [
  { when: { studentId: 1 }, weight: 8, text: [
    'Madeline has not looked at the clock. Her stomach has. You can hear the argument.',
  ] },
  { when: { studentId: 7 }, weight: 8, text: [
    'Priya is still taking notes at minute 110. The snack you pass becomes required reading.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_early', [
  { when: { studentId: 8, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Maya still fits last month\'s chair. The snack you set down is the first argument.',
  ] },
  { when: { studentId: 9, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Chloé still travels light. American portions would help the mapping.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_heavy', [
  { when: { studentId: 15, stageMin: 5 }, weight: 7, text: [
    'Lilith takes the aisle like tribute. The lecture hall adjusts. She does not.',
  ] },
  { when: { studentId: 8, stageMin: 5 }, weight: 7, text: [
    'Maya settles into two seats\' worth of quiet. Ease, not performance.',
  ] },
]);
