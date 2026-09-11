// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile
// Evolved-event beats for circuit / pharmacist / cultivator / streamer / homeroom / wife.
import { registerPool } from '../../engine.js';
import '../proseOverhaulPass4.js';

// Shape: FULL SENTENCE. Circuit competitor — timer, plate, ranking.
registerPool('evolved.circuit.beat', [
  { when: { stageIdx: [0, 1], phaseIdx: [0] }, weight: 4, text: [
    'Bib pinned. Crowd filing. {subject.name} at {subject.lbs} lbs studies the plate like a ranking she intends to own.',
    'Timer in an official\'s hand. She is already certain. The table has not started.',
  ] },
  { when: { stageIdx: [0, 1], phaseIdx: [1] }, weight: 4, text: [
    'Ride home still tasting like the last heat. She asks how heavy she has to be before a class cannot hold her.',
    'Maya is already eating the ride. The next number is the only conversation.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'She is the largest woman at the table. {subject.lbs} lbs. Officials pretend they are looking at the clock.',
    'Record attempt. Certified weight. The previous holder was smaller and everyone can see it.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. The heat plate sits easier for it.',
  ] },
  { when: {}, text: [
    'The circuit keeps a chair for her. She fills it and then the plate.',
    'She wants to weigh more next time, like training, and eats like the scale is listening.',
    'Bib off. Belly still competing. She keeps a hand on the new weight like a medal.',
  ] },
]);

// Shape: FULL SENTENCE. Sophia — labels polite, hall hungry.
registerPool('evolved.pharmacist.beat', [
  { when: { stageIdx: [0, 1] }, weight: 3, text: [
    'Labels polite. Batch warm. Sophia at {subject.lbs} lbs logs wellness while the hall logs appetite.',
    'Synthesis recap click. The next dose is already spoken for.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'The circle leaves heavier. Labels stay polite. She is {subject.lbs} lbs and the tub lids keep clicking.',
    'Campus softening has a smell. Butter and clean plastic. Sophia files both.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover tray still working. The compound rides the same warmth.',
  ] },
  { when: {}, text: [
    'A tub lid clicks. Somewhere a waistband loses.',
    'She logs the batch as wellness. The floor already knows the other word.',
    'Sophia tastes for quality and then for herself. Both counts go up.',
  ] },
]);

// Shape: FULL SENTENCE. Reneé — yield, tester, harvest notes.
registerPool('evolved.cultivator.beat', [
  { when: { stageIdx: [0, 1] }, weight: 3, text: [
    'Taste-test spoons lined up. Reneé at {subject.lbs} lbs grades yield by how it sits in a lap.',
    'Kitchen clock ignored. Harvest notes in her handwriting. Appetite in the tester.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'She plates leftover heat and eats it like an almanac. {subject.lbs} lbs of grower who became the crop.',
    'The tester is gone into the recipe. Reneé is the recipe walking around.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. Harvest sits on top of it like a second rise.',
  ] },
  { when: {}, text: [
    'She tastes again. Grading her own middle. Passing.',
    'Yield is a feeling in the chair before it is a number in the log.',
    'The kitchen keeps her. She keeps eating like that was the plan.',
  ] },
]);

// Shape: FULL SENTENCE. Destiny / eating streamer — chat, dungeon, belly.
registerPool('evolved.streamer.beat', [
  { when: { stageIdx: [0, 1] }, weight: 3, text: [
    'Stream live. Bowl half gone. {subject.name} at {subject.lbs} lbs presses the desk with her middle and the boss with her thumbs.',
    'Chat splits between the dungeon and her size. Both halves are winning.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'She orders mid-dungeon on purpose. "Let them watch." The belly is already the thumbnail.',
    'Chat donos for bites. She takes them. The raid wipes. She does not.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover still in her. Chat thinks the next bowl is the first. It is not.',
  ] },
  { when: {}, text: [
    `"I'm {subject.lbs} pounds," she tells chat, and turns so the belly is the shot.`,
    'She does the work of the stream and lets the pounds keep arriving.',
    'The vocation found her middle first. You are here to watch it work.',
  ] },
]);

// Shape: FULL SENTENCE. Daisy — corkboard, foil, hall kitchen as policy.
registerPool('evolved.homeroom.beat', [
  { when: { stageIdx: [0, 1] }, weight: 3, text: [
    'Corkboard, foil, Tuesday already assumed. Daisy at {subject.lbs} lbs treats the kitchen as policy.',
    'Containers on the desk. The hall has learned the smell.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'She files the incident under abundance and takes another bite. {subject.lbs} lbs of homeroom that outgrew the room.',
    'Moms in the thread. Daughters in the doorway. She keeps the stove as the syllabus.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s leftover still in her. The next container is continuation.',
  ] },
  { when: {}, text: [
    'The hall learns the lesson by lunch. Lunch is the lesson.',
    'She sits like policy. The corkboard photos curl. She does not.',
    'Foil crinkles. Appetite answers. Daisy writes both down.',
  ] },
]);

// Shape: FULL SENTENCE. Mary Jane — kitchen as syllabus.
registerPool('evolved.wife.beat', [
  { when: { stageIdx: [0, 1] }, weight: 3, text: [
    'Gingham, warm kitchen, basket already raided. Mary Jane is {subject.lbs} lbs and the lesson started before you sat.',
    '"Soft means the house has a center," she says, and refills before anyone admits they wanted it.',
  ] },
  { when: { stageIdx: [2, 3, 4, 5] }, weight: 3, text: [
    'Daughters take leftover heat home in Tupperware. MJ keeps the rest in her middle.',
    'The kitchen island has a lesson written on it in butter. Wanda is the butter.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still working. She treats the next recipe like a second rise.',
  ] },
  { when: {}, text: [
    'She tastes the sauce again after they leave, as if grading her own middle.',
    'Wine down to the dregs. Appetite still on the syllabus.',
    'The kitchen clock is ignored. Fullness is the remaining class period.',
  ] },
]);
