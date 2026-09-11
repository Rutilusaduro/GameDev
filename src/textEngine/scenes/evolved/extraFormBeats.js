// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Remaining evolved-form beats — leftover-aware, form-specific.
import { registerPool } from '../../engine.js';

registerPool('evolved.sumo.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in the mawashi line. Mass arrives on a warm start.',
  ] },
  { when: {}, text: [
    'Clay on her thighs. Dana has to move all of it. The belly does not reset.',
    'Mawashi holds. Barely. She enjoys the barely.',
    'Conference scale, {subject.lbs} lbs written down. She puts a hand on the number.',
  ] },
]);

registerPool('evolved.speed.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover tray still in her. The split looks friendlier.',
  ] },
  { when: {}, text: [
    'Timer up. Plate as a split. {subject.lbs} lbs certified before the first bite.',
    'Record attempt. Previous holder was smaller. Everyone can see it.',
    'Officials watch the clock. She watches the plate.',
  ] },
]);

registerPool('evolved.asmr.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s galley still in the quiet. The mic catches the second course.',
  ] },
  { when: {}, text: [
    'Mic two degrees left. Chosen order. Belly rounds the desk before the first sound.',
    'Recording chair. Careful lighting. {subject.lbs} lbs of quiet work.',
    'Listeners hear chewing. She hears capacity. Both tracks are honest.',
  ] },
]);

registerPool('evolved.diarist.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat in the draft. She writes the tray into the sentence.',
  ] },
  { when: {}, text: [
    'Midnight draft. {subject.lbs} lbs in the sentence. She does not flinch.',
    'Agent still in her voice. She eats while she talks about the book that is already her middle.',
    'Pages thicken. So does she. The diary keeps both counts.',
  ] },
]);

registerPool('evolved.photo.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Contact sheet still warm. So is last night\'s leftover in the subject.',
  ] },
  { when: {}, text: [
    'She shoots abundance, then sits in it. The camera stays on.',
    'Frame is mid-bite, honest. {subject.lbs} lbs. The print will not lie.',
    'Photographer became the subject. She hangs in her own proof.',
  ] },
]);

registerPool('evolved.bodypos.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Comments climbing. Leftover tray still in the shot she did not stage.',
  ] },
  { when: {}, text: [
    'Belly forward, thighs wide. The shot is accurate. She reads the good comments aloud.',
    'Camera roll. {subject.lbs} lbs standing naturally. Accuracy is the brief.',
    'She keeps the blooper. Engagement spikes. Softness stays in frame.',
  ] },
]);

registerPool('evolved.research.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Intake log already has last night. She treats the next plate as replication.',
  ] },
  { when: {}, text: [
    'Clipboard, warm sample, a note she will eat later. She eats it now.',
    'Yield numbers climb. So does she. The lab coat argues and loses.',
    '{subject.lbs} lbs of method. Appetite is the instrument.',
  ] },
]);

registerPool('evolved.tourist.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Campus leftover plus a new stall. She calls it fieldwork.',
  ] },
  { when: {}, text: [
    'Map of stalls, grease on the crease. She is the itinerary.',
    'Another vendor, another seat that reports her. {subject.lbs} lbs of souvenir.',
    'She collects places by how they fill her. The list is getting heavy.',
  ] },
]);

registerPool('evolved.homestead.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover in the jar row. She cans the rest of the appetite.',
  ] },
  { when: {}, text: [
    'Pots, preserves, a kitchen that intends to stay. She is the harvest.',
    'Apron string loses. She does not retie it tighter.',
    'Mason jars and a middle that keeps extra. Both are the plan.',
  ] },
]);

registerPool('evolved.fair.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover under the ribbon. The scale already knew.',
  ] },
  { when: {}, text: [
    'Sawdust, livestock, a number she wants heavier next year.',
    'Pride in the belt. {subject.lbs} lbs. The pie booth is not a side quest.',
    'She treats the fair like training. Training treats her like a result.',
  ] },
]);

registerPool('evolved.author.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Chapter open. Leftover tray as reference material.',
  ] },
  { when: {}, text: [
    'She writes the scene with her own lap as the research.',
    'A paragraph, then a plate. Both are the draft.',
    '{subject.lbs} lbs of citation. The manuscript keeps gaining pages.',
  ] },
]);

registerPool('evolved.psych.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Subject already leftover-fed. The notes call it baseline.',
  ] },
  { when: {}, text: [
    'Clipboard between them. Appetite in the margin. She files both.',
    'The study eats. So does she. Observation is a shared plate.',
    '{subject.lbs} lbs of notes she is also living.',
  ] },
]);

registerPool('evolved.community.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"I ate what they ate," she says. Last night\'s tray is already in the intake log.',
  ] },
  { when: {}, text: [
    'Graph open, plate not empty. Similar rate of change.',
    'She refuses to skew the sample by staying hungry. The sample grows.',
    'Field notes in grease. {subject.lbs} lbs of participant-observer.',
  ] },
]);

registerPool('evolved.greek.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Chapter leftovers from Wednesday. She pours seconds like rush.',
  ] },
  { when: {}, text: [
    'Chapter colors. Size like a requirement nobody wrote down.',
    'Sisters already softer. She is the largest and the one pouring.',
    '{subject.lbs} lbs of hospitality. The house learns it by dinner.',
  ] },
]);

registerPool('evolved.install.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Gallery hush. Leftover heat in the model the work was measured against.',
  ] },
  { when: {}, text: [
    'Viewers orbit the piece. She is the scale it was cut to.',
    'She walks the installation like a table setting. Then she sits in it.',
    '{subject.lbs} lbs of proof. The wall keeps a warm shadow.',
  ] },
]);

registerPool('evolved.blogger.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Archive open. Leftover tray in the latest post she has not typed yet.',
  ] },
  { when: {}, text: [
    'Forum threads guess at her body. {subject.lbs} lbs. She is pleased they miss.',
    'She scrolls her own posts and eats while you read.',
    'Anonymous until the middle gives her away. She keeps posting.',
  ] },
]);

registerPool('evolved.hive.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Delivery stacked on leftover heat. The door barely needs to open.',
  ] },
  { when: {}, text: [
    'Bags at the threshold. Resonance in the rooms. She is the hive mouth.',
    'Maya at {subject.lbs} lbs treats knock as a course.',
    'Sisters soften in other rooms. The hallway learns the smell.',
  ] },
]);

registerPool('evolved.gainer.beat', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Warm-up leftover still in her. The log treats it as volume.',
  ] },
  { when: {}, text: [
    'Priya logs the session like training. {subject.lbs} lbs is the working set.',
    'She wants to weigh more next time, like programming, and eats like the scale is listening.',
    'Loaded bar. Loaded plate. She treats both like volume.',
  ] },
]);
