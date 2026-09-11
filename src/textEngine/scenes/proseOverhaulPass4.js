// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Pass 4 linger slots for remaining families. New pools only.
import { registerPool, hasModule } from '../engine.js';

function oncePool(key, variants) {
  if (hasModule(key)) return;
  registerPool(key, variants);
}

oncePool('hunger.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'She tugs her shirt down on a middle the kitchen already opened.',
    'The knock already happened. Foil did not finish her. She still looks hungry.',
  ] },
  { when: { leftoverFed: true, stageMin: 4, stageMax: 7 }, weight: 3, text: [
    'She leaves heavier than the tray left her, and does not hide the walk.',
    'The doorframe keeps kitchen heat and this visit in the same warm print.',
  ] },
  { when: { leftoverFed: true, stageMin: 8 }, weight: 3, text: [
    'Getting her turned around is the rest of the visit. Overnight dough takes the corridor at her pace.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'She goes. Second sitting stays in the doorway a beat longer.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs her shirt down on the way back like the hallway might have seen the wanting.',
    'The knock already happened. She still looks like she might apologize for being hungry.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She leaves heavier than she arrived and does not hide the walk.',
    'The doorframe keeps a little of her warmth after she is gone.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her turned around is the rest of the visit. She takes the corridor at her own pace.',
    'The floorboards remember her. Hunger does too.',
  ] },
  { when: {}, text: [
    'She goes. Appetite stays in the doorway a beat longer.',
    'You close the door on warmth that has a name.',
    'The hall is quieter. Her stomach is not.',
  ] },
]);

oncePool('campus.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She hurries a little, then forgets why, then buys something anyway.',
    'Quad wind finds the new tightness at her waist. She keeps walking.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. Campus kiosks feel like seconds.',
    'She buys anyway. The tray from last night made the walk hungrier.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in her. Daylight eating uses the same open door.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Paths make room. She takes the slow lane like it was built for her.',
    'A bench remembers her outline after she stands. Campus keeps the heat.',
  ] },
  { when: {}, text: [
    'Campus keeps moving. She keeps eating like the path is a table.',
    'You lose her in a cluster of trays and find her again by the laugh.',
    'The walk back smells like whatever she just finished.',
    'She stops once more at a kiosk. The kiosk is ready for her.',
  ] },
]);

oncePool('device.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Foil from the kitchen still answers under the cuff. The machine keeps overtime anyway.',
    'Overnight sitting plus the overnight device. Morning will find both.',
  ] },
  { when: {}, text: [
    'The hardware goes quiet. She does not. Softness keeps the overtime.',
    'She rests a hand where the device worked and leaves it there.',
    'Morning will find more of her. The device already knows.',
  ] },
]);

oncePool('wi.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'She steps off like the number might change. Foil in the clothes already answered.',
    'The scale is honest. Last night\'s sitting is the rest of the honesty.',
  ] },
  { when: { leftoverFed: true, stageMin: 8 }, weight: 3, text: [
    'Getting her off the platform is a ceremony. Kitchen heat enjoys the audience of one.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'The readout fades. Midnight dough does not.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She steps off like the number might change if she looks away fast enough.',
    'The scale is honest. She is still negotiating with the honesty.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her off the platform is a ceremony. She enjoys the audience of one.',
    'The number sits in the room like furniture. She sits with it, pleased.',
  ] },
  { when: {}, text: [
    'She looks down, then at you. The looking is the rest of the weigh-in.',
    'Clothes rearrange themselves around the new fact. She lets them.',
    'The readout fades. The body does not.',
  ] },
]);

oncePool('gossip.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'The rumor smells like a second sitting. Someone already knew.',
    'Hall glances include the midnight sitting. Nobody needs a name for it.',
  ] },
  { when: {}, text: [
    'Someone changes the subject. Nobody changes what they saw.',
    'The lounge keeps the story in glances. Glances are enough.',
    'By evening the rumor has hips.',
  ] },
]);

oncePool('confront.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'She blocks the door with a middle the kitchen already filled.',
    'Anger borrowed last night\'s appetite. She did not give it back.',
  ] },
  { when: {}, text: [
    'She is still standing in your way. The argument has a body now.',
    'The line she drew stays on the floor between you. So does the heat.',
    'She meant it. She also has not left.',
  ] },
]);

oncePool('session.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover was already in her. The session lands on warm dough.',
    'Last night\'s tray plus this plate. The chair reports both.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. She eats like the door never closed.',
  ] },
  { when: { stageMax: 3 }, weight: 2, text: [
    'She sits a minute longer than the meal required, surprised she wants to.',
  ] },
  { when: {}, text: [
    'The plates are done. She is not. She stays in the chair like it learned her name.',
    'You dim the lamp. Fullness keeps its own light.',
    'She breathes around the evening and does not ask to go yet.',
  ] },
]);

oncePool('intimacy.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'After, leftover heat and attended softness share the same slow breathing.',
    'She stays undressed a minute longer. Last night\'s tray plus this hour, more of her to cover.',
  ] },
  { when: {}, text: [
    'After, she is warmer and slower, a body that has been attended.',
    'The room keeps the shape of her against you for a while.',
    'She does not dress quickly. There is more of her to cover, and she knows it.',
  ] },
]);

oncePool('hive.afterglow', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Surplus trays still humming in a room that used to be a closet.',
    'Maya does not clock out. Galley surplus is already a Hive shift.',
  ] },
  { when: {}, text: [
    'The Nest hums. Someone is still eating in a room that used to be a closet.',
    'Maya does not check the clock. The Hive does not either.',
    'Lavender light, warm trays, members getting rounder on purpose.',
  ] },
]);

oncePool('pharmacist.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Union leftover still in the hood. She recaps the beaker as a second reagent.',
    'Sophia files leftover yield next to the batch. Waistbands will agree by evening.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Quiet-hours heat still in the reagents. She treats the knock as a catalyst.',
    'After-hours corridor still in her posture. The batch uses the same open body.',
  ] },
  { when: {}, text: [
    'Samples migrate. So do waistbands. Sophia files both as yield.',
    'The union table is empty by noon. The effects are not.',
    'She calls it wellness. The floor calls it seconds.',
    'Foil from the galley still scents the beaker. She recaps it anyway.',
    'She logs the batch as chemistry. The hall will log it as appetite.',
  ] },
]);

oncePool('stream.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Headset off. Kitchen sitting still in her. She thanks chat from a chair that already knew.',
    'Subscriber perk is a hand on leftover heat plus the broadcast gain.',
  ] },
  { when: {}, text: [
    'Chat keeps scrolling. She keeps a hand on the new weight like a subscriber perk.',
    'The overlay goes dark. Her belly does not. She sits in the leftover glow.',
    'She thanks chat and does not stand up yet. Standing can wait.',
  ] },
]);

oncePool('faculty.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still on the floor. She files your hall under appetite and does not pretend otherwise.',
    'Pastry plate gone. She talks housing with a mouth that already voted.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'After-hours knocks reached staff. She keeps her voice low and her plate closer.',
  ] },
  { when: {}, text: [
    'Crumbs on the notes. She does not brush them off until you leave.',
    'Staff lounge light finds the extra inch on everyone who sits too long.',
    'She talks housing. The pastry plate talks first.',
  ] },
]);

oncePool('faculty.afterglow', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still on your floor. Staff can smell the second course from here.',
    'Someone mentions your kitchen like weather. The pastry plate is already gone.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'They heard the after-hours knocks. Nobody writes it down. Everybody eats more.',
  ] },
  { when: {}, text: [
    'Staff lounge pastry plate, emptied again. You feel like a craftsman.',
    'She goes back to her notes. The notes have crumbs on them now.',
    'Housing will not write this meeting down. The appetite will.',
  ] },
]);

oncePool('faculty.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley surplus still in the building. She treats your floor like a second dining hall.',
    'The pastry plate is already gone. She talks housing with crumbs still on the notes.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Someone walked your corridor late. Staff lounge treats that as a catering brief.',
    'The after-hours kitchen light reached this table. She orders like it is still on.',
  ] },
  { when: {}, text: [
    'She shifts in the chair and the chair reports the term so far.',
    'A pastry flake on her sleeve. She leaves it. Appetite is the meeting.',
    'Housing talk waits until the plate is empty. The plate does not wait long.',
  ] },
]);

oncePool('faculty.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"Your kitchen is doing scholarship," she says, and means the seconds.',
    '"Save me a plate," she says, already reaching.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    '"Roman hours," she says. "Keep the kitchen light on."',
    '"I walked past," she says. "Continue the research."',
  ] },
  { when: {}, text: [
    '"Sit," she says, and the chair already knows the rest.',
    '"We are taking notes," she says, and the notes have crumbs.',
    '"Do continue," she says, which is permission and a second helping.',
  ] },
]);

oncePool('faculty.scene', [
  { when: {}, text: [
    '{faculty.voice} {faculty.growth} {faculty.line}',
    '{faculty.voice} {faculty.line} {faculty.growth}',
    '{faculty.growth} {faculty.voice} {faculty.line}',
  ] },
]);

oncePool('floor.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. Check-in treats the lounge like seconds.',
    'Last night\'s tray plus this hour. The couches keep both.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. Daylight check-in uses the same open door.',
  ] },
  { when: {}, text: [
    'Check-in ends. The couches keep the heat of whoever just ate.',
    'Someone leaves a box on a side table. The box does not last the hour.',
    'The floor learns the incident by dinner. Dinner is the incident.',
  ] },
]);

oncePool('evolved.linger', [
  { when: { featureId: 'salon_appetit' }, weight: 3, text: [
    'Wine rims keep a fingerprint. Chloé keeps the rest of the evening in her lap.',
    'Guests find the stairs slower. She finds another bite without standing.',
    '*À bientôt* means the next course, not goodbye.',
  ] },
  { when: { featureId: 'artisan_gallery' }, weight: 3, text: [
    'The print is dry. The model is not. Fiona pins both.',
    'Patrons talk framing. She talks appetite with her mouth full.',
    'The wall of proof gains a warm shadow where she stood too long.',
  ] },
  { when: { featureId: 'wife_lessons' }, weight: 3, text: [
    'Daughters take extra home in Tupperware. Mary Jane takes extra in her middle.',
    'The recipe card is flour-soft. So are the students.',
    'Kitchen clock lies. Fullness is the hour that counts.',
  ] },
  { when: { featureId: 'eating_competitor' }, weight: 3, text: [
    'Bib off. Belly still competing. Maya already knows the next number.',
    'The table is wreckage. She is the event sitting in it.',
    'Officials pack. She keeps a hand on the new weight like a medal.',
  ] },
  { when: { featureId: 'sumo' }, weight: 3, text: [
    'Dohyo dust on her thighs. Mass still arriving after the bout called itself over.',
    'Dana resets. The belly does not. Only one of those is smaller.',
    'Mawashi holds. Barely. She enjoys the barely.',
  ] },
  { when: { featureId: 'cultivator' }, weight: 3, text: [
    'Reneé plates the leftover heat and eats it like harvest notes.',
    'The kitchen clock is a liar. The belly is the almanac.',
    'She tastes again. Grading her own middle. Passing.',
  ] },
  { when: { featureId: 'homeroom_queen' }, weight: 3, text: [
    'Corkboard photos curl at the edges. Daisy does not. She sits like policy.',
    'The hall learns the lesson by lunch. Lunch is the lesson.',
    'She files the incident under abundance and takes another bite.',
  ] },
  { when: { featureId: 'feedee_creator' }, weight: 3, text: [
    'Ring light off. Chat still climbing. She keeps a hand on the new weight like a perk.',
    'The collab partner is still chewing. Kylie is still filming the chew.',
    'Wren would replay this. She is already living the replay.',
  ] },
  { when: { featureId: 'pharmacist' }, weight: 3, text: [
    'Sophia logs the batch as wellness. The hall logs it as appetite.',
    'The circle leaves heavier. Labels stay polite.',
    'A tub lid clicks. Somewhere a waistband loses.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 2, text: [
    'She tugs cloth that almost still works and files the warmth as weather.',
    'The vocation is new. The softness is newer. She pretends they are unrelated.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her turned toward the door is the rest of the scene. She takes the minutes.',
    'Form as furniture. Appetite as rent. She pays in pounds and likes the receipt.',
  ] },
  { when: {}, text: [
    'The vocation keeps working after the scene names itself over.',
    'She looks down, then at you. The looking is the rest of the arc.',
    'Whatever she became already arrived. She is the result walking around.',
    'Heat fades. Softness stays. She breathes around it like a title.',
  ] },
]);

oncePool('contest.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. The heat plate sits easier for it.',
    'Kitchen tray from earlier. Contest food on top. Both count.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round heat still in the middle. The table uses it.',
  ] },
  { when: { contestStage: [0, 1] }, weight: 2, text: [
    'The bib still fits if she does not breathe too honestly. She breathes anyway.',
    'Maya has not looked over. The belly has. It wants the next plate.',
  ] },
  { when: { contestStage: [3, 4, 5] }, weight: 2, text: [
    'The chair files a complaint. She files another bite.',
    'Crowd noise thins around her middle. She is the loudest thing at the table.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her sat was the opening ceremony. Standing can wait until the scoreboard.',
    'The table edge learns her. She lets it take notes in dents.',
  ] },
  { when: {}, text: [
    'Sauce on her wrist. She licks it like it counts. It does.',
    'She shifts, and the shift is a whole extra person arriving.',
    'Maya writes a number. She writes a swallow.',
    'Fullness climbs. She treats it like a ranking she intends to keep.',
  ] },
]);

oncePool('stream.destiny.spend', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Destiny dumps the cut into a third delivery while leftover heat still has her ordering.',
    'She feeds the share back into snack apps because the leftover sitting never quite closed.',
    'Destiny tips the money at foil still on the desk and hits reorder.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Destiny blows the share on a midnight order like the knock is still happening.',
  ] },
  { when: {}, text: [
    'Destiny burns the cut on a mic arm she already owned and a cart she did not.',
    'She vanishes the share into a snack-subscription she will unbox on camera.',
    'Destiny treats chat to a spontaneous drop because the vibe asked and her stomach answered.',
  ] },
]);

