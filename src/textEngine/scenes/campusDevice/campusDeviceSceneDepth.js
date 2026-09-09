// The Squad — Lead: A4 Architect | Support: A2 Psych
// Per-student depth on campus device encounter + result pools.
import { registerModuleVariants } from '../../engine.js';

const W = 4;

registerModuleVariants('campus.dev.vulnerability', [
  { when: { studentId: 0, targetType: 'student' }, weight: W, text: [
    `stretching between drills, guard down, belly soft from post-practice snacks`,
    `cooling down after practice, jersey riding up, unaware of portable lab gear`,
    `reaching for a second protein bar, focus on reps not surroundings`,
  ]},
  { when: { studentId: 1, targetType: 'student' }, weight: W, text: [
    `annotating in the quad, glasses slipping, snack wrappers at her feet`,
    `cross-legged with spreadsheets, hunger deferred until it isn't`,
    `reviewing data outdoors, posture open, device range clean`,
  ]},
  { when: { studentId: 2, targetType: 'student' }, weight: W, text: [
    `filming B-roll without checking behind her — profile content, unaware`,
    `adjusting ring light on a bench, stomach growl audible on mic`,
    `posing for thumbnails, hunger trending, guard completely down`,
  ]},
  { when: { studentId: 3, targetType: 'student' }, weight: W, text: [
    `post-run cooldown, leggings straining, water bottle forgotten`,
    `stretching at the track edge, appetite returning faster than breath`,
    `toweling off, midriff exposed, oblivious to field kit signal`,
  ]},
  { when: { studentId: 4, targetType: 'student' }, weight: W, text: [
    `sketching strangers from a café table, pastry half-eaten, absorbed`,
    `framing a shot of architecture, crumbs on her sketchbook`,
    `people-watching with charcoal on her fingers, reachable and still`,
  ]},
  { when: { studentId: 5, targetType: 'student' }, weight: W, text: [
    `streaming from a bench, headset on, both hands on controller not food`,
    `between ranked matches, raid snacks untouched, perfect deploy window`,
    `chat scrolling, belly soft under hoodie, unaware of lab gear`,
  ]},
  { when: { studentId: 6, targetType: 'student' }, weight: W, text: [
    `fixing rush banners, back turned, pastel straining across her middle`,
    `stacking bake-sale trays, flour on her cheeks, defenseless`,
    `pinning flyers, hunger humming under sisterhood cheer`,
  ]},
  { when: { studentId: 7, targetType: 'student' }, weight: W, text: [
    `updating her leaderboard corkboard outdoors, waistband tight, distracted`,
    `timing intake between hall rounds, spreadsheet open, guard low`,
    `comparing notes with herself aloud, optimization blind to surroundings`,
  ]},
  { when: { studentId: 8, targetType: 'student' }, weight: W, text: [
    `sketching in plain sight, absorbed, appetite quiet until it isn't`,
    `sitting on low wall, thighs spread comfortable, food bag unguarded`,
    `watching pigeons, stillness total, device window wide open`,
  ]},
  { when: { studentId: 9, targetType: 'student' }, weight: W, text: [
    `reading on the grass, scarf loose, pastry crumbs on her chest`,
    `practicing French aloud, wine-colored lips, completely unguarded`,
    `sunbathing between hall rounds, bikini strap digging, hunger lazy and real`,
  ]},
  { when: { studentId: 10, targetType: 'student' }, weight: W, text: [
    `tasting something from the cafeteria line, eyes closed, defenseless`,
    `adjusting a stockpot on a portable burner, steam on her face`,
    `sampling sauce from a spoon, chef focus, portable gear unnoticed`,
  ]},
  { when: { studentId: 11, targetType: 'student' }, weight: W, text: [
    `wheeling a supply cart, cap askew, kindness making her reachable`,
    `checking a patient's snack chart outdoors, stethoscope swinging`,
    `offering crackers to a stranger, belly soft, guard completely down`,
  ]},
  { when: { studentId: 12, targetType: 'student' }, weight: W, text: [
    `observing foot traffic, notebook open, not watching for portable lab gear`,
    `timing eating patterns in the quad, pen tapping, target rich`,
    `cataloguing behaviors, hunger notes piling, unaware of deployment`,
  ]},
  { when: { studentId: 13, targetType: 'student' }, weight: W, text: [
    `arranging a sample tray for passersby, apron dusted, beaming and open`,
    `tasting frosting off her thumb, hall keys jingling`,
    `chatting with parents on the path, Tupperware in hand, defenseless`,
  ]},
  { when: { studentId: 14, targetType: 'student' }, weight: W, text: [
    `laughing with friends, third snack in hand, completely off guard`,
    `sharing harvest apples, overalls straining, joy loud and reachable`,
    `leaning on a fence post, belly rounding, sun-warm and unaware`,
  ]},
  { when: { studentId: 15, targetType: 'student' }, weight: W, text: [
    `moving through crowd like weather — distracted, reachable, hungry`,
    `watching couples eat, predator patience, portable gear invisible to her`,
    `standing too still in sunlight, hunger coiled, perfect window`,
  ]},
  { when: { studentId: 16, targetType: 'student' }, weight: W, text: [
    `handing out sample vials, lab coat open, curves advertised casually`,
    `explaining compounds to a curious freshman, waistband stressed`,
    `checking inventory on a bench, hunger masked as wellness pitch`,
  ]},
  { when: { studentId: 17, targetType: 'student' }, weight: W, text: [
    `studying a campus map at a bad angle — gear belt, open target`,
    `sketching ruins in chalk on pavement, knees wide, snack bag open`,
    `measuring doorway widths for fun, belly brushing stone, absorbed`,
  ]},
  { when: { studentId: 18, custom: false, targetType: 'student' }, weight: W, text: [
    `calibrating a handheld unit, goggles up, belly soft from vending runs`,
    `testing range in the open quad, muttering specs, unaware she's watched`,
    `bench-testing hunger hardware on herself, ironic and reachable`,
  ]},
]);

registerModuleVariants('campus.dev.reaction', [
  { when: { studentId: 0, deviceId: 'endless_hunger_engine' }, weight: W, text: [
    `Brittany clutches her stomach and heads for the nearest protein bar like mission orders.`,
    `She breaks into a jog toward the vending bank — appetite now tactical.`,
    `Practice discipline dissolves. She eats standing, furious and pleased.`,
  ]},
  { when: { studentId: 2, deviceId: 'endless_hunger_engine' }, weight: W, text: [
    `Kylie's eyes go distant — hunger trending. She livestreams the scramble for food.`,
    `She narrates the craving spike for chat. Donations roll in. She orders.`,
    `Content writes itself: hunger ray, real reaction, no filter.`,
  ]},
  { when: { studentId: 5, deviceId: 'feeding_mask', modeId: 'capture' }, weight: W, text: [
    `Destiny muffles a protest into another swallow. "Clip that," she thinks. Can't.`,
    `Stream overlay glitches. She keeps eating. Chat goes feral.`,
    `Capture mode locks. Fullness climbs. She blames lag.`,
  ]},
  { when: { studentId: 8, deviceId: 'endless_hunger_engine' }, weight: W, text: [
    `Maya blinks, suddenly ravenous. She changes direction toward food without deciding.`,
    `Hunger arrives like weather. She walks to the café as if summoned.`,
    `Sketch forgotten. She eats slowly, completely present in appetite.`,
  ]},
  { when: { studentId: 10, deviceId: 'feeding_mask' }, weight: W, text: [
    `Reneé sags into the seal — resistance brief, fullness immediate, almost grateful.`,
    `She tastes the paste, sighs, keeps swallowing. Technique overrides pride.`,
    `Harness locks. She catalogs sensation instead of fighting.`,
  ]},
  { when: { studentId: 12, deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, weight: W, text: [
    `Nadia leans into the tube before paste arrives. She will publish nothing about this.`,
    `Data and fullness merge. She notes the compliance reflex clinically.`,
    `She swallows on schedule. Shame absent. Curiosity enormous.`,
  ]},
  { when: { studentId: 15, deviceId: 'endless_hunger_engine' }, weight: W, text: [
    `Lilith's gaze sharpens — hunger becoming hunt. She smiles at the wrong person.`,
    `Want coils tighter. She follows the nearest food source like prey.`,
    `Predator patience snaps. She eats with unsettling focus.`,
  ]},
  { when: { studentId: 18, custom: false, deviceId: 'endless_hunger_engine' }, weight: W, text: [
    `Talia scans for snacks with clinical urgency. "Expected outcome," she mutters.`,
    `She documents the hunger spike in her head. Then she feeds it.`,
    `Inventor becomes subject. She eats while calculating next iteration.`,
  ]},
  { when: { discovered: true, studentId: 2 }, weight: W, text: [
    `Someone films the deployment. Kylie will have opinions about the angle later.`,
    `A bystander gasps. Kylie waves them closer. Content is content.`,
    `Discovery becomes B-roll. She keeps eating. Brand intact.`,
  ]},
]);

registerModuleVariants('campus.deviceFlavor', [
  { when: { flavorDevice: 'auto_feeder_arm', campusTierMin: 2 }, weight: 3, text: [
    `A servo arm retracts behind a vending alcove — paste still warm on the tray.`,
    `Mechanical rhythm echoes in the stairwell — someone ate here recently.`,
    `Tray residue and servo oil — field deployment, recently active.`,
  ]},
  { when: { flavorDevice: 'obedience_belt' }, weight: 3, text: [
    `A discarded belt buckle glints in the grass — shame hardware, recently worn.`,
    `Waist harness abandoned near a bench — compliance session just ended.`,
    `Belt pressure marks on bark — someone leaned here, obedient and full.`,
  ]},
  { when: { flavorDevice: 'growth_serum_injector' }, weight: 3, text: [
    `Empty injector cartridges litter a lab bench — field kit was here recently.`,
    `Serum warmth still radiates from a spent vial — dramatic growth nearby.`,
    `Volatile compound smell clings to the grass — curves answered fast.`,
  ]},
]);
