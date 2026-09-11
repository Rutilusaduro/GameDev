// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Modular evolved-activity beats. Replaces leftover EVOLVED_ACTIVITY_TEXT
// monoliths with slot-composed, form-keyed, stage-banded pools.
import { registerPool } from '../../engine.js';

registerPool('evolved.activity.scene', [
  { when: {}, text: [
    '{evolved.activity.setup} {evolved.activity.body}\n\n{evolved.activity.event}',
    '{evolved.activity.setup}\n\n{evolved.activity.body} {evolved.activity.event}',
    '{evolved.activity.body}\n\n{evolved.activity.setup} {evolved.activity.event}',
  ]},
]);

registerPool('evolved.activity.setup', [
  { when: {}, text: [
    '{subject.name} finds you already in it. The week has a shape and she is the extra of it.',
    'She does not knock like a visitor. She arrives like a course you already ordered.',
    'You meet her where the hall keeps the heat. She is ready. The food is implied.',
  ]},
  { when: { evolvedForm: 'sumo' }, weight: 4, text: [
    'She is in the mawashi-bag, calm, {word.size}. Dana Mercer is on the card. She wants you watching.',
    'Qualifier day. She finds you at the desk and does not ask. You are coming to the dohyo.',
  ]},
  { when: { evolvedForm: 'eating_competitor' }, weight: 4, text: [
    'Bib on. Plate waiting. She studies it the way she used to study a meet sheet.',
    'The crowd files in. She is already the largest at the table and she likes the math.',
  ]},
  { when: { evolvedForm: 'feedee_creator' }, weight: 4, text: [
    'Ring light on. Two sides of the table set. Chat is already climbing before she sits.',
    'Collab night. She loads in the warmup and lets the partner match her bite for bite.',
  ]},
  { when: { evolvedForm: 'eating_streamer' }, weight: 4, text: [
    'The stream is live. Boss fight in one window. A bowl already half gone in the other.',
    'Chat splits between the game and the body filling the chair. She feeds both.',
  ]},
  { when: { evolvedForm: 'chapter_hostess' }, weight: 4, text: [
    'The chapter kitchen has been hers for hours. Dishes wait. Sisters will arrive hungry.',
    'Wednesday feast. She circulates with a ladle and a belly that leads the room.',
  ]},
  { when: { evolvedForm: 'homestead_queen' }, weight: 4, text: [
    'The dorm kitchen no longer looks like a dorm. MJ texts sit. You sit.',
    'Butter and brown sugar in the hall. She is already at the stove when you knock.',
  ]},
  { when: { evolvedForm: 'state_fair_queen' }, weight: 4, text: [
    'Competition tank. Number pinned. Darcy from Meadowview is the fact she means to revise.',
    'Fairgrounds air. She writes last year\'s number down like a recipe she intends to beat.',
  ]},
  { when: { evolvedForm: 'community_researcher' }, weight: 4, text: [
    'Lane jacket. Training log. She ate what the floor ate and logged you as witness.',
    'Case-study night. Two plates empty beside the notes. She is done pretending they are separate.',
  ]},
  { when: { evolvedForm: 'campus_legend' }, weight: 4, text: [
    'The booth is already hers. Staff has the usual ready before she sits.',
    'Dining hall corner, good light. First-years learn her name by watching her order.',
  ]},
  { when: { evolvedForm: 'wife_lessons' }, weight: 4, text: [
    'Kitchen warm. Table set. Wanda is already in the bread basket. The lesson has started.',
    'Gingham apron. MJ at the counter. The moms arrive like they live here now.',
  ]},
  { when: { evolvedForm: 'eating_captain' }, weight: 4, text: [
    'Bib around her neck. Number pinned. She wants a witness and does not ask twice.',
    'Competition jacket. She says Maya\'s name like a number she has been chewing.',
  ]},
  { when: { evolvedForm: 'ranked_feedee' }, weight: 4, text: [
    'Focus bar. Fullness bar. The ranked table is already set with extra from the hall.',
    'Session queued. She sits like the chair is a bracket and the food is the opponent.',
  ]},
  { when: { evolvedForm: 'home_nest' }, weight: 4, text: [
    'Bags on the bed. Receipts. She orders like the nest is a second stomach.',
    'Delivery pile. She pats the mattress and the extra of her makes a valley.',
  ]},
  { when: { evolvedForm: 'delivery_hive' }, weight: 4, text: [
    'The hive pinged. She is the Nest and the order both. Drivers already know the door.',
    'Shift board. Tribute bags. She eats what the floor sends up first.',
  ]},
  { when: { evolvedForm: 'homeroom_queen' }, weight: 4, text: [
    'Cookie sheets. Hall kitchen. Daisy has a cart. The enrichment hour has a smell.',
    'Moms on the agenda. Leftovers on the cart. She runs both without raising her voice.',
  ]},
  { when: { evolvedForm: 'psych_researcher' }, weight: 4, text: [
    'Hall log open. Subject in the chair. She writes while she eats what they eat.',
    'Session notes. She is the instrument and the variable. The graph already knows.',
  ]},
  { when: { evolvedForm: 'cultivator' }, weight: 4, text: [
    'Taste-test night. Reneé is already sampling. The kitchen is a greenhouse with plates.',
    'Batch on the counter. She wants you to watch the swallow the way she watches growth.',
  ]},
  { when: { evolvedForm: 'machine_goddess' }, weight: 4, text: [
    'Lab light. Parts on the bench. She eats standing while the rig warms up.',
    'The bay hums. She treats calories like firmware and installs them with her mouth.',
  ]},
  { when: { evolvedForm: 'pharmacist' }, weight: 4, text: [
    'Synthesis night. Stocked compounds. She tastes the floor leftovers between brews.',
    'Chem session. Kitchen extract in the plan. She is hungry in a precise way.',
  ]},
]);

registerPool('evolved.activity.body', [
  { when: {}, text: [
    '{word.size} of her takes the chair first. Soft mass, heat, the extra that was not here last week.',
    'You read the week on her before she speaks. {word.body} arriving half a beat early.',
    'She settles. The furniture has an opinion. She wins it without raising her voice.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'Not much to announce yet. A softer line. A shirt that meets her like a rumor she keeps feeding.',
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    'Belly first, warm and certain. Thighs claiming the seat. She rests a hand there without performing it.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'There is a lot of her to look at. She knows. Doorways negotiate. She does not hurry the looking.',
  ]},
]);

registerPool('evolved.activity.event', [
  { when: {}, text: [
    'She does the work of the day and eats through it. You stay until the extra of her has arrived.',
    'The activity ends. She is heavier for it. She wants that witnessed.',
    'When it is over she checks herself the way some people check a score. Right on time.',
  ]},
  { when: { evolvedForm: 'sumo' }, weight: 4, text: [
    'Between bouts she eats in the corner. Dana has to move all of it. The plan shows on the scale.',
    'She loses by inches or she does not. Either way she is not discouraged. She is feeding the next number.',
  ]},
  { when: { evolvedForm: 'eating_competitor' }, weight: 4, text: [
    'The plate is gone with an economy that looks casual until the clock is. She wants to weigh more next time.',
    'Record, then the drive home meal. Training strategy, she calls it. She means every pound.',
  ]},
  { when: { evolvedForm: 'feedee_creator' }, weight: 4, text: [
    'Chat finds something true and stays. Wren is already in the comments like furniture.',
    'Mutual. Real. The partner matches her and the numbers do what numbers do when the food is honest.',
  ]},
  { when: { evolvedForm: 'body_positive_creator' }, weight: 4, text: [
    'She films the number and the body that made it. Comments climb. She eats between takes.',
    'Campaign light, natural stand, belly forward. She names it hers. The afternoon shots are fuller.',
  ]},
  { when: { evolvedForm: 'eating_captain' }, weight: 4, text: [
    'Bib tight across what she grew on purpose. She wants you to see her number at the top of the board.',
    'Maya is in the building. She says the name like a fact she has been chewing for weeks.',
  ]},
  { when: { evolvedForm: 'big_squad_captain' }, weight: 4, text: [
    'Size rules gone. She tells eighteen cheerleaders to eat well like it is formation notes.',
    'The heaviest squad on campus is the assignment. She runs it from the front, {word.size} and sure.',
  ]},
  { when: { evolvedForm: 'eating_diarist' }, weight: 4, text: [
    'The draft is exact. Belly, clothes, the meal that taught her something. She sends it hungry.',
    'Agent, book, second book. She writes the number in and then eats enough to need a new chapter.',
  ]},
  { when: { evolvedForm: 'food_researcher' }, weight: 4, text: [
    'Scale, tape, intake log. Primary participant is her. The graph goes up. She makes you sign as witness.',
    'Hall log language, clean data, a hypothesis she has already confirmed with her mouth.',
  ]},
  { when: { evolvedForm: 'eating_streamer' }, weight: 4, text: [
    'She finishes the boss and the bowl together. Chat nicknames the size. She uses the nickname.',
    'Controller almost lost to a belly. Clip goes wide. She wants the five-hundred stream to be the biggest yet.',
  ]},
  { when: { evolvedForm: 'speed_eater' }, weight: 4, text: [
    'Timer, plate, physics. More weight, more at once. She talks like the table is a lab.',
    'The record falls. She is already naming the next number she wants to bring to the chair.',
  ]},
  { when: { evolvedForm: 'chapter_hostess' }, weight: 4, text: [
    'Sisters eat. She watches, then eats a very great deal. The culture is a table that never really ends.',
    'She presses thirds on the ones who look at her middle with that particular hunger.',
  ]},
  { when: { evolvedForm: 'body_positive_greek' }, weight: 4, text: [
    'No weigh-ins. She says her number into the chapter room like a gavel. Nobody leaves.',
    'Rush triples after the piece runs. She prints the number on purpose.',
  ]},
  { when: { evolvedForm: 'installation_artist' }, weight: 4, text: [
    'Plaster, photos, a belly cast already out of date. She eats from takeout between fragments.',
    'The grid of weeks is a document. Visitors count frames. She wants more frames.',
  ]},
  { when: { evolvedForm: 'food_photographer' }, weight: 4, text: [
    'The last frame has her in it: hand, dish, the lower third of a {word.size} honesty.',
    'She reshoots when she outgrows the last book. The frame is wrong until she is bigger.',
  ]},
  { when: { evolvedForm: 'anonymous_blogger' }, weight: 4, text: [
    'A link at midnight. No name. The body is described exactly. Readers arrive anyway.',
    'Forums guess wrong. She is pleased. She eats pasta while the traffic spike refreshes.',
  ]},
  { when: { evolvedForm: 'asmr_creator' }, weight: 4, text: [
    'Mic two degrees left. Soft sounds, careful food, {word.size} of her filling the lower frame.',
    'Viewers eat along. She says good when they admit the pounds. Then she records again.',
  ]},
  { when: { evolvedForm: 'salon_appetit' }, weight: 4, text: [
    'Candles, cheese, wine that does not ask who wants what. She bites a croissant like philosophy.',
    'Guests leave curious and full. Chloé licks pastry cream and says encore to the semester.',
  ]},
  { when: { evolvedForm: 'artisan_gallery' }, weight: 4, text: [
    'Contact sheets of residents mid-bite. Release forms become contracts. Everyone signs.',
    'She eats in the corner of her own opening. The review says uncomfortably generous. She pins it.',
  ]},
  { when: { evolvedForm: 'campus_legend' }, weight: 4, text: [
    'A brass plate on the booth. Complimentary fourth plate. She tells the director she will be bigger.',
    'Tours stop. The guide recovers. Institution, they call her. She takes another bite.',
  ]},
  { when: { evolvedForm: 'food_tourist' }, weight: 4, text: [
    'Notebook, one of everything, research she finds pleasurable. She writes in the parking lot after.',
    'The list ends. She starts a new list from the cab. She sounds calm about it.',
  ]},
  { when: { evolvedForm: 'ff_author' }, weight: 4, text: [
    'A printed chapter, no cover. The protagonist is round and specific. She watches your face.',
    'She reads a passage aloud that describes a woman who looks like her. Nothing to add.',
  ]},
  { when: { evolvedForm: 'homestead_queen' }, weight: 4, text: [
    'Six things to try. The bowl is large. Mae is in the recipe even when Mae is not in the room.',
    'She barely leaves. You come to her. The plate she sets is bigger than the last one.',
  ]},
  { when: { evolvedForm: 'state_fair_queen' }, weight: 4, text: [
    'Darcy recalibrates. MJ fills two warmup plates and eats both while judges check credentials.',
    'She crosses the board. The crowd makes a sound. She keeps eating.',
  ]},
  { when: { evolvedForm: 'wife_lessons' }, weight: 4, text: [
    'Soft means warm, she says, not as metaphor. Wanda already knew. She came anyway.',
    'Daughters, doorways, reinforced chairs. MJ refills. The kitchen holds more women than it was drawn for.',
  ]},
  { when: { evolvedForm: 'community_researcher' }, weight: 4, text: [
    'Two curves, both up. She calls it interesting data. She goes back to her plate.',
    'The hall log will be honest. She writes herself in as a variable and rehearses with her mouth full.',
  ]},
  { when: { evolvedForm: 'ranked_feedee' }, weight: 4, text: [
    'She picks the extra plate like it is a ranked item. Focus climbs. Softness does too.',
    'The session ends when fullness wins. She looks pleased about losing that particular match.',
  ]},
  { when: { evolvedForm: 'home_nest' }, weight: 4, text: [
    'Bags empty. She is the nest now. The mattress keeps the shape of a bigger night.',
    'She orders one more because the nest should not go quiet. You stay for the swallow.',
  ]},
  { when: { evolvedForm: 'delivery_hive' }, weight: 4, text: [
    'Tribute lands. She eats it as policy. The hive gets heavier in the only way that counts.',
    'Shift over. Soft mass settled. Drivers will come back because the Nest is still hungry.',
  ]},
  { when: { evolvedForm: 'homeroom_queen' }, weight: 4, text: [
    'The enrichment hour ends sticky and warm. She writes nothing. The hall got bigger anyway.',
    'Moms leave with recipes. Residents leave fuller. Daisy wheels the empty cart like a secret.',
  ]},
  { when: { evolvedForm: 'psych_researcher' }, weight: 4, text: [
    'She closes the log on a higher number. The subject is her. The data is visible.',
    'Notes done. She eats the leftover like a control condition she already confirmed.',
  ]},
  { when: { evolvedForm: 'cultivator' }, weight: 4, text: [
    'Reneé takes seconds. The batch worked. She watches growth the way some people watch weather.',
    'Taste-test logged. The kitchen smells like proof. She wants another round on the counter.',
  ]},
  { when: { evolvedForm: 'machine_goddess' }, weight: 4, text: [
    'The rig ticks. She is heavier by a firmware version. She wants the next install tonight.',
    'Parts stocked. Calories installed. She treats the extra of her like a successful build.',
  ]},
  { when: { evolvedForm: 'pharmacist' }, weight: 4, text: [
    'Brew done. She tastes the floor extract like it belongs in the protocol. It does.',
    'Stock up. She is fuller and more precise about it. The next synthesis already has a snack.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the activity is also a procession. Soft mass arriving, staying, being seen.',
  ]},
]);
