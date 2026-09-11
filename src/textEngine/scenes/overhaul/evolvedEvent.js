// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile, A6 Slender
// Slot-composed evolved-event beats. Replaces EVOLVED_EVENTS monoliths at render.
import { registerPool } from '../../engine.js';

registerPool('evolved.event.scene', [
  { when: {}, text: [
    '{evolved.event.setup} {evolved.event.body}\n\n{evolved.event.turn}',
    '{evolved.event.setup}\n\n{evolved.event.body} {evolved.event.turn}',
    '{evolved.event.body}\n\n{evolved.event.setup} {evolved.event.turn}',
  ]},
]);

registerPool('evolved.event.setup', [
  { when: {}, text: [
    '{subject.name} has you in it already. The week has a ritual and she is the extra of it.',
    'She arrives like a course you ordered. The room rearranges around the fact of her.',
    'You meet her where the hall keeps the heat. The event has started. The food is implied.',
  ]},
  { when: { evolvedForm: 'sumo' }, weight: 4, text: [
    'Warm-up room, liniment, chanko. Dana Mercer is already tying her mawashi like you are weather.',
    'Qualifier air. She wants you watching. The dohyo is a sentence she intends to finish.',
  ]},
  { when: { evolvedForm: 'eating_competitor' }, weight: 4, text: [
    'Bib on. Plate waiting. She studies it the way she used to study a meet sheet.',
    'The crowd files in. She is already the largest at the table and she likes the math.',
  ]},
  { when: { evolvedForm: 'feedee_creator' }, weight: 4, text: [
    'Ring light. Two sides of the table. Chat is climbing before she sits.',
    'Collab night. She loads the warmup and lets the partner match her bite for bite.',
  ]},
  { when: { evolvedForm: 'eating_streamer' }, weight: 4, text: [
    'Stream live. Boss in one window. A bowl already half gone in the other.',
    'Chat splits between the game and the body filling the chair. She feeds both.',
  ]},
  { when: { evolvedForm: 'chapter_hostess' }, weight: 4, text: [
    'Chapter kitchen, hours in. Dishes wait. Sisters will arrive hungry.',
    'Wednesday feast. She circulates with a ladle and a belly that leads the room.',
  ]},
  { when: { evolvedForm: 'state_fair_queen' }, weight: 4, text: [
    'Competition tank. Number pinned. Darcy from Meadowview is the fact she means to revise.',
    'Fairgrounds air. Last year\'s number is a recipe she intends to beat.',
  ]},
  { when: { evolvedForm: 'homestead_queen' }, weight: 4, text: [
    'Butter and brown sugar in the hall. She is at the stove when you knock.',
    'The dorm kitchen no longer looks like a dorm. MJ texts sit. You sit.',
  ]},
  { when: { evolvedForm: 'wife_lessons' }, weight: 4, text: [
    'Kitchen warm. Table set. Wanda is already in the bread basket.',
    'Gingham apron. The moms arrive like they live here now.',
  ]},
  { when: { evolvedForm: 'community_researcher' }, weight: 4, text: [
    'Lane jacket. Training log. She ate what the floor ate and logged you as witness.',
    'Case-study night. Two plates empty beside the notes. She is done pretending they are separate.',
  ]},
  { when: { evolvedForm: 'campus_legend' }, weight: 4, text: [
    'The booth is already hers. Staff has the usual ready before she sits.',
    'Dining hall corner, good light. First-years learn her name by watching her order.',
  ]},
  { when: { evolvedForm: 'salon_appetit' }, weight: 4, text: [
    'Candles, cheese, a guest list that will leave curious and full.',
    'Chloé hosts like philosophy. The croissant is the argument.',
  ]},
  { when: { evolvedForm: 'artisan_gallery' }, weight: 4, text: [
    'Contact sheets of residents mid-bite. Release forms become contracts.',
    'She eats in the corner of her own opening. The review will say generous. She will pin it.',
  ]},
  { when: { evolvedForm: 'ranked_feedee' }, weight: 4, text: [
    'Focus bar. Fullness bar. The ranked table is already set.',
    'Session queued. She sits like the chair is a bracket and the food is the opponent.',
  ]},
  { when: { evolvedForm: 'homeroom_queen' }, weight: 4, text: [
    'Cookie sheets. Hall kitchen. Daisy has a cart. The enrichment hour has a smell.',
    'Moms on the agenda. Leftovers on the cart. She runs both.',
  ]},
  { when: { evolvedForm: 'eating_captain' }, weight: 4, text: [
    'Bib around her neck. Number pinned. She wants a witness and does not ask twice.',
    'Competition jacket. She says Maya\'s name like a number she has been chewing.',
  ]},
  { when: { evolvedForm: 'home_nest' }, weight: 4, text: [
    'Bags on the bed. Receipts. She orders like the nest is a second stomach.',
    'Delivery pile. She pats the mattress and the extra of her makes a valley.',
  ]},
  { when: { evolvedForm: 'delivery_hive' }, weight: 4, text: [
    'The hive pinged. She is the Nest and the order both. Drivers already know the door.',
    'Shift board. Tribute bags. She eats what the floor sends up first.',
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

registerPool('evolved.event.body', [
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

registerPool('evolved.event.turn', [
  { when: {}, text: [
    'The beat asks you to choose. She will eat through whichever door you open.',
    'A decision sits between you, warm as a plate. She waits, already a little hungrier.',
    'She wants the next move witnessed. You are here to witness it. Then she eats.',
  ]},
  { when: { evolvedForm: 'sumo' }, weight: 4, text: [
    'Between bouts she will eat in the corner. Dana has to move all of it. Pick how this starts.',
    'She is not discouraged by inches. She is feeding the next number. Your call.',
  ]},
  { when: { evolvedForm: 'eating_competitor' }, weight: 4, text: [
    'The clock is a suggestion. She wants to weigh more next time. Choose the pressure.',
    'Record, then the drive-home meal. Training, she calls it. She means every pound.',
  ]},
  { when: { evolvedForm: 'chapter_hostess' }, weight: 4, text: [
    'Sisters will eat. She will watch, then eat a very great deal. Steer the feast.',
    'The culture is a table that never really ends. Pick who gets thirds.',
  ]},
  { when: { evolvedForm: 'state_fair_queen' }, weight: 4, text: [
    'Darcy recalibrates when MJ fills two warmup plates. Pick the heat.',
    'She keeps eating when the crowd makes a sound. You decide what the sound is for.',
  ]},
  { when: { evolvedForm: 'wife_lessons' }, weight: 4, text: [
    'Soft means warm, she says, not as metaphor. Wanda already knew. Choose the lesson.',
    'Daughters, doorways, extra butter. MJ refills. You pick the next plate.',
  ]},
  { when: { evolvedForm: 'community_researcher' }, weight: 4, text: [
    'Two curves, both up. She calls it data. Choose how honest the log gets tonight.',
    'The hall log will be honest. She writes herself in as a variable. Your call on the next line.',
  ]},
  { when: { evolvedForm: 'eating_captain' }, weight: 4, text: [
    'Bib tight across what she grew on purpose. Pick how loud the board gets.',
    'Maya is in the building. She wants you to see the number land. Choose the heat.',
  ]},
  { when: { evolvedForm: 'home_nest' }, weight: 4, text: [
    'The mattress is already a nest. Pick what gets ordered next.',
    'Bags, receipts, a valley in the bed. Choose how full the nest gets tonight.',
  ]},
  { when: { evolvedForm: 'delivery_hive' }, weight: 4, text: [
    'Drivers know the door. Tribute first, then her. Steer the shift.',
    'The hive wants a Nest who eats. Pick the next bag.',
  ]},
  { when: { phaseIdx: [1] }, weight: 3, text: [
    'Second beat. She is already further along than the first choice implied. Pick again.',
    'The room has learned her shape. The next door is still yours to open.',
  ]},
  { when: { phaseIdx: [2] }, weight: 3, text: [
    'Last turn before the ending. She is waiting on the plate you have not named yet.',
    'She checks herself the way some people check a score. Your move closes it.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the event is also a procession. Soft mass arriving, staying, being seen. Choose.',
  ]},
]);
