// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Evolved one-shot activities — slot skeleton replacing EVOLVED_ACTIVITY_TEXT.
import { registerPool } from '../../engine.js';
import '../proseOverhaulPass4.js';

// Shape: FULL SENTENCE. Setup at the vocation.
registerPool('evolved.activity.lead', [
  { when: { evolvedForm: 'sumo', stageIdx: [0, 1] }, weight: 4, text: [
    '{subject.name} finds you at the RA desk in warm-ups, {subject.lbs} lbs, belly already arguing with the mawashi bag.',
    'Regional heat on her breath. {subject.first} is {subject.lbs} lbs and already thinking about Dana.',
  ] },
  { when: { evolvedForm: 'sumo', stageIdx: [2, 3, 4, 5] }, weight: 4, text: [
    'Conference clay still on her thighs. {subject.name} is {subject.lbs} lbs and the board already knows her number.',
    'She arrives heavier than the last meet. {subject.lbs} lbs under the mawashi. Dana has to move all of it.',
  ] },
  { when: { evolvedForm: 'eating_competitor' }, weight: 3, text: [
    'Bib on. Crowd filing. {subject.name} at {subject.lbs} lbs studies the plate like a ranking.',
    'She is the largest woman at the table. {subject.lbs} lbs. The timer has not started and she is already certain.',
  ] },
  { when: { evolvedForm: 'eating_captain' }, weight: 3, text: [
    'Competition number pinned. {subject.name} fills the doorframe at {subject.lbs} lbs and does not ask you to come. You come.',
    'Hair up, bib around her neck, {subject.lbs} lbs of captain who decided she is something else now.',
  ] },
  { when: { evolvedForm: 'speed_eater' }, weight: 3, text: [
    'Timer in an official\'s hand. {subject.name} at {subject.lbs} lbs looks at the plate the way she used to look at a split.',
    'Record attempt. {subject.lbs} lbs certified. The previous holder was smaller and everyone can see it.',
  ] },
  { when: { evolvedForm: 'feedee_creator' }, weight: 3, text: [
    'Ring light on. Partner across the table. {subject.name} is {subject.lbs} lbs and chat is already climbing.',
    'Studio heat. Two plates. {subject.first} at {subject.lbs} lbs waits for go-live like a starting gun.',
  ] },
  { when: { evolvedForm: 'eating_streamer' }, weight: 3, text: [
    'Stream live. Bowl half gone. {subject.name} at {subject.lbs} lbs presses the desk with her middle and the boss with her thumbs.',
    'Chat splits between the dungeon and her size. She is {subject.lbs} lbs and both halves are winning.',
  ] },
  { when: { evolvedForm: 'asmr_creator' }, weight: 3, text: [
    'Mic two degrees left. Food in a chosen order. {subject.name} sits {subject.lbs} lbs and begins the quiet work.',
    'Recording chair, careful lighting. Her belly rounds the desk at {subject.lbs} lbs before the first bite sounds.',
  ] },
  { when: { evolvedForm: 'body_positive_creator' }, weight: 3, text: [
    'Camera roll. {subject.name} stands naturally at {subject.lbs} lbs — belly forward, thighs wide — and the shot is accurate.',
    'Comments climbing. She is {subject.lbs} lbs and reads the good ones aloud like they were the brief.',
  ] },
  { when: { evolvedForm: 'anonymous_blogger' }, weight: 3, text: [
    'Archive open. {subject.name} scrolls her own posts at {subject.lbs} lbs and eats while you read the latest.',
    'Forum threads guess at her body. She is {subject.lbs} lbs and pleased they still miss.',
  ] },
  { when: { evolvedForm: 'eating_diarist' }, weight: 3, text: [
    'Draft at nearly midnight. {subject.name} wrote {subject.lbs} lbs into the sentence and did not flinch.',
    'Agent call still in her voice. She eats while she talks about the book that is already her middle.',
  ] },
  { when: { evolvedForm: 'ff_author' }, weight: 3, text: [
    'Chapter open. {subject.name} at {subject.lbs} lbs has been writing the scene with her own lap as reference.',
    'She reads you a paragraph and then a plate. Both are the research.',
  ] },
  { when: { evolvedForm: 'food_photographer' }, weight: 3, text: [
    'Contact sheet still warm. {subject.name} is {subject.lbs} lbs and the subject in frame is mid-bite, honest.',
    'She shoots abundance and then sits in it. {subject.lbs} lbs. The camera stays on.',
  ] },
  { when: { evolvedForm: 'installation_artist' }, weight: 3, text: [
    'Gallery hush. {subject.name} at {subject.lbs} lbs walks the piece like it is a table setting.',
    'Viewers orbit the work. She is the scale the work was measured against.',
  ] },
  { when: { evolvedForm: 'salon_appetit' }, weight: 3, text: [
    'Butter and wine already in the air. {subject.name} pours at {subject.lbs} lbs without asking who wants what.',
    'Candles, cheese breathing. Chloé is {subject.lbs} lbs and the guests arrive hungry on purpose.',
  ] },
  { when: { evolvedForm: 'artisan_gallery' }, weight: 3, text: [
    'Pins, twine, a resident mid-laugh. Fiona at {subject.lbs} lbs calls the camera honest and keeps shooting.',
    'Opening night linen. She is {subject.lbs} lbs and eats in the corner on purpose.',
  ] },
  { when: { evolvedForm: 'chapter_hostess' }, weight: 3, text: [
    'Kitchen four hours in. {subject.name} at {subject.lbs} lbs has cooked more dishes than the feast required.',
    'Wednesday table set. She circulates at {subject.lbs} lbs, pressing seconds before plates empty.',
  ] },
  { when: { evolvedForm: 'body_positive_greek' }, weight: 3, text: [
    'Chapter colors. {subject.name} fills the room at {subject.lbs} lbs and treats size like a rush requirement nobody wrote down.',
    'Sisters already softer. She is the largest and the one pouring.',
  ] },
  { when: { evolvedForm: 'big_squad_captain' }, weight: 3, text: [
    'Practice jacket open. {subject.name} at {subject.lbs} lbs tells eighteen cheerleaders the weigh-in board is gone.',
    'Squad event. She stands {subject.lbs} lbs in front of them and talks performance, then dinner, in the same tone.',
  ] },
  { when: { evolvedForm: 'campus_legend' }, weight: 3, text: [
    'Corner booth ready before she sits. {subject.name} is {subject.lbs} lbs and the staff already knows the order.',
    'Dining hall as habitat. First-years watch. Someone says her name like a landmark.',
  ] },
  { when: { evolvedForm: 'food_tourist' }, weight: 3, text: [
    'Expedition bag packed with more than tickets. {subject.name} at {subject.lbs} lbs treats the city like a menu.',
    'She maps the next plate before the train. {subject.lbs} lbs. The itinerary is edible.',
  ] },
  { when: { evolvedForm: 'food_researcher' }, weight: 3, text: [
    'Station log open. {subject.name} writes {subject.lbs} lbs as the first data point and means it.',
    'Scale, tape, intake graph. She is participant and observer at the same desk.',
  ] },
  { when: { evolvedForm: 'community_researcher' }, weight: 3, text: [
    'Lane jacket, training log, two empty plates. Cassidy at {subject.lbs} lbs has been eating what the floor ate.',
    'Case-study notes beside dinner. She logs you as witness without asking.',
  ] },
  { when: { evolvedForm: 'wife_lessons' }, weight: 3, text: [
    'Gingham, warm kitchen, basket already raided. Mary Jane is {subject.lbs} lbs and the lesson started before you sat.',
    'Moms in chairs. Daughters in the doorway. {subject.name} at {subject.lbs} lbs keeps the stove as the syllabus.',
  ] },
  { when: { evolvedForm: 'homestead_queen' }, weight: 3, text: [
    'Harvest light. {subject.name} plates from a kitchen that has stopped pretending this is a hobby.',
    'She is {subject.lbs} lbs and the homestead smells like butter and yield.',
  ] },
  { when: { evolvedForm: 'state_fair_queen' }, weight: 3, text: [
    'Fairground heat. {subject.name} at {subject.lbs} lbs walks toward the scale like a heat she already won.',
    'Ribbon still in the future. The middle is not waiting.',
  ] },
  { when: { evolvedForm: 'homeroom_queen' }, weight: 3, text: [
    'Corkboard, foil, Tuesday already assumed. Daisy at {subject.lbs} lbs treats the kitchen as policy.',
    'Containers on the desk. She is {subject.lbs} lbs and the hall has learned the smell.',
  ] },
  { when: { evolvedForm: 'cultivator' }, weight: 3, text: [
    'Taste-test spoons lined up. Reneé at {subject.lbs} lbs grades yield by how it sits in a lap.',
    'Kitchen clock ignored. Harvest notes in her handwriting. Appetite in the tester.',
  ] },
  { when: { evolvedForm: 'pharmacist' }, weight: 3, text: [
    'Labels polite. Batch warm. Sophia at {subject.lbs} lbs logs wellness while the hall logs appetite.',
    'Synthesis recap click. She is {subject.lbs} lbs and the next dose is already spoken for.',
  ] },
  { when: { evolvedForm: 'machine_goddess' }, weight: 3, text: [
    'Lab hum. {subject.name} at {subject.lbs} lbs treats the bench like another body that wants feeding.',
    'Parts, heat, a readout that climbs. She climbs with it.',
  ] },
  { when: { evolvedForm: 'competitive_gainer' }, weight: 3, text: [
    'Progress thread open. Priya at {subject.lbs} lbs compares numbers like they are a sport she is winning.',
    'Corkboard photos, waist math, a plate she calls training.',
  ] },
  { when: { evolvedForm: 'ranked_feedee' }, weight: 3, text: [
    'Queue pop. Headset on. {subject.name} at {subject.lbs} lbs has a bag that was never on the ticket.',
    'Focus bar, fullness bar, Rae already in the doorway.',
  ] },
  { when: { evolvedForm: 'home_nest' }, weight: 3, text: [
    'Delivery stacked. {subject.name} nested at {subject.lbs} lbs treats the couch as the whole campus.',
    'Order-in as vocation. The door barely needs to open.',
  ] },
  { when: { evolvedForm: 'delivery_hive' }, weight: 3, text: [
    'Routes on a phone. Bags at the threshold. {subject.name} is {subject.lbs} lbs and the hive feeds through her.',
    'She dispatches and receives in the same breath.',
  ] },
  { when: { evolvedForm: 'psych_researcher' }, weight: 3, text: [
    'Hall log open. {subject.name} at {subject.lbs} lbs writes the session as if appetite were a finding.',
    'Notes in the margin. Seconds on the plate. Both get filed.',
  ] },
  { when: {}, text: [
    '{subject.name} is in her element at {subject.lbs} lbs, vocation already warm in the room.',
    'The calling found her middle first. {subject.lbs} lbs. You are here to watch it work.',
    'She does the work of her form and lets the pounds keep arriving.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event.
registerPool('evolved.activity.growth', [
  { when: { stageMax: 4 }, weight: 2, text: [
    'Clothes still argue. The body is already answering. Softness arrives in the pause after the bite.',
    'She notices the give under a hand and does not pull the hand away.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, weight: 2, text: [
    'Weight settles lower while she works. A chair reports it. She keeps going.',
    '{word.size} mass takes the light. The vocation uses it like a tool.',
  ] },
  { when: { stageMin: 9 }, weight: 3, text: [
    'Getting her turned toward the next plate is the rest of the scene. She takes the minutes.',
    'She occupies the furniture the way a result occupies a log. Warm. Settled. Still eating.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. The next course lands easier for it.',
    'Last night\'s tray is still working. She treats the new plate like a continuation.',
  ] },
  { when: {}, text: [
    'Growth happens in the doing. She finishes what the calling put in front of her.',
    'The work leaves her heavier than it found her. That was the work.',
    'She keeps a hand on the new weight like a tool she intends to use again.',
  ] },
]);

// Shape: DIALOGUE BEAT.
registerPool('evolved.activity.line', [
  { when: { evolvedForm: 'sumo' }, weight: 3, text: [
    '"Watch the board," she says. She means her number, and Dana\'s, and the gap closing.',
    `"She's still bigger," {subject.first} says afterward, eating. "For now."`,
  ] },
  { when: { evolvedForm: 'eating_competitor' }, weight: 3, text: [
    '"I want to weigh more next time," she says, like training, and eats the ride home.',
    'She asks how heavy she has to be before a class cannot hold her. She already wants that number.',
  ] },
  { when: { evolvedForm: 'eating_streamer' }, weight: 3, text: [
    `"I'm {subject.lbs} pounds," she tells chat, and turns so the belly is the thumbnail.`,
    'She orders mid-dungeon on purpose. "Let them watch."',
  ] },
  { when: { evolvedForm: 'salon_appetit' }, weight: 3, text: [
    `"In Paris they teach you to stop," she says, biting. "Here they teach you to continue."`,
    '"Let them arrive hungry." She pours as if that were hospitality law.',
  ] },
  { when: { evolvedForm: 'wife_lessons' }, weight: 3, text: [
    '"Soft means the house has a center," she says, and refills before anyone admits they wanted it.',
    'Wanda is eating bread before the lesson starts. "I\'m hungry," she says, and names the lesson by chewing.',
  ] },
  { when: { evolvedForm: 'community_researcher' }, weight: 3, text: [
    '"I ate what they ate," she says. "Refusing felt like skewing the intake log."',
    `"Similar rate of change," she tells you, graph open, plate not empty.`,
  ] },
  { when: { evolvedForm: 'campus_legend' }, weight: 3, text: [
    'A first-year asks if she is the one. "Yes," she says, and makes room in the booth.',
    '"It\'s right," she says, looking at the nameplate, then at the fourth plate.',
  ] },
  { when: {}, text: [
    'She looks at you once, then at the work, then keeps going.',
    `"Watch," {subject.first} says, as if you had any other job.`,
    'A small sound of satisfaction. The vocation heard it too.',
  ] },
]);

registerPool('evolved.activity.scene', [
  { when: {}, text: [
    '{evolved.activity.lead} {evolved.activity.growth} {evolved.activity.line}',
  ] },
]);
