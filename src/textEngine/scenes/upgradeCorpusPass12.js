// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Pass 12 — campus-event uniqueness, stream milestone/special, collab leftovers.
import { registerModuleVariants } from '../engine.js';

// ── campus observation / result ───────────────────────────────
registerModuleVariants('campusEvent.observation', [
  { when: { studentId: 0, mood: 'stressed' }, weight: 6, text: [
    'Brittany hits the chair like a missed landing. Ponytail still tight. Appetite underneath the lecture.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny slumps in yesterday\'s hoodie. The lecture is a loading screen. Hunger is the queue.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya takes the back row and says nothing. The notebook is open. The appetite is quieter.',
  ] },
  { when: { studentId: 7, mood: 'stressed' }, weight: 6, text: [
    'Priya\'s planner is color-coded and losing. She looks at you like a deadline with a pulse.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé claims the chair like a salon seat. American lecture hall. She makes it work.',
  ] },
  { when: { campusFattening: true, stageMin: 4 }, weight: 4, text: [
    'Campus portions have been generous. {subject.name} sits like she already ate and could eat again.',
  ] },
]);
registerModuleVariants('campusEvent.result', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya nods once. Thanks enough. She looks more herself.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany sits straighter. Whatever you did, she files it as a win.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé tastes the leftover warmth like a note she intends to keep.',
  ] },
  { when: { relationship: [3], mood: ['content', 'happy'] }, weight: 4, text: [
    '"Thanks for noticing," {subject.name} says. She means the food and the looking.',
  ] },
]);

// ── campus scenes: unique per id, not recycled warmth-stems ───
registerModuleVariants('campusEvent.scene.mood_stressed', [
  { when: { studentId: 7 }, weight: 7, text: [
    'Priya\'s energy drink sweats. The planner is a crime scene. She has not mentioned lunch.',
  ] },
  { when: { studentId: 16 }, weight: 7, text: [
    'Sophia looks like a protocol failed. Hollow, precise, one sip from folding.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_stressed.0', [
  { when: { studentId: 7 }, weight: 7, text: [
    'Cookies land on the planner. Priya blinks, then eats like the rubric just changed.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_stressed.1', [
  { when: { studentId: 1 }, weight: 7, text: [
    'Madeline offloads in complete sentences. By the end the notebook can open.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_tired', [
  { when: { studentId: 5 }, weight: 7, text: [
    'Destiny is already mid-nap by slide two. Chin vs chest. Chest is winning.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_tired.0', [
  { when: { studentId: 5 }, weight: 7, text: [
    'Thermos, pastry, Destiny upright in four bites. "Okay. I\'m queued."',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_nervous', [
  { when: { studentId: 16 }, weight: 7, text: [
    'Sophia fidgets the phone like a pipette. Something in the hall has her wound.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_nervous.0', [
  { when: { studentId: 16 }, weight: 7, text: [
    'Warm tin, whole tin gone. Sophia unclenches one shoulder at a time.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_focused', [
  { when: { studentId: 1 }, weight: 7, text: [
    'Madeline has not looked up. The notes are a fortress. Hunger is the moat.',
  ] },
  { when: { studentId: 18 }, weight: 7, text: [
    'Talia is in the schematic. Interruption would cost a variable. Food would not.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_focused.0', [
  { when: { studentId: 1 }, weight: 7, text: [
    'Pastry lands. Madeline nods, keeps writing, and the pastry is gone by the hour.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_excited', [
  { when: { studentId: 2 }, weight: 7, text: [
    'Kylie has answered questions you have not asked. The neighbor is already content.',
  ] },
  { when: { studentId: 6 }, weight: 7, text: [
    'Tiffany is hosting the row. Excitement needs a tray or it will invent one.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_excited.2', [
  { when: { studentId: 2 }, weight: 7, text: [
    'Celebratory spread. Kylie eats like the camera is off and the bit is real.',
  ] },
]);
registerModuleVariants('campusEvent.scene.mood_content', [
  { when: { studentId: 8 }, weight: 7, text: [
    'Maya is already the picture. Soft chair, small smile, no need to perform ease.',
  ] },
  { when: { studentId: 13 }, weight: 7, text: [
    'Daisy looks like she brought the kitchen with her. Settled. Ready to feed or be fed.',
  ] },
]);
registerModuleVariants('campusEvent.choice.mood_content.0', [
  { when: { studentId: 8 }, weight: 7, text: [
    'Warm pastry. Maya accepts it without breaking the quiet. Slow bites. Whole pastry.',
  ] },
]);

registerModuleVariants('campusEvent.scene.arch_cheerleader', [
  { when: { studentId: 0 }, weight: 8, text: [
    'Brittany arrives late, squad politics still on her. She sighs at the room like a coach.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_cheerleader.0', [
  { when: { studentId: 0 }, weight: 8, text: [
    'Campus diner, largest cake. By bite three Brittany is laughing at the tryout drama.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_bookworm', [
  { when: { studentId: 1 }, weight: 8, text: [
    'Madeline found a gap Thursday and has not eaten about it. Brilliant. Hollow. Still citing.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_bookworm.0', [
  { when: { studentId: 1 }, weight: 8, text: [
    'Full meal at her table. She eats without pausing the page. You sit opposite. Silence works.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_influencer', [
  { when: { studentId: 2 }, weight: 8, text: [
    'Kylie films the aisle. Followers want the bite. She wants the bite more.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_influencer.0', [
  { when: { studentId: 2 }, weight: 8, text: [
    'Snack lands. Kylie angles it once, then eats it like the story can wait.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_athlete', [
  { when: { studentId: 3 }, weight: 8, text: [
    'Serena calls it a recovery day. The appetite already signed the waiver.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_athlete.0', [
  { when: { studentId: 3 }, weight: 8, text: [
    'You load the plate like a heat. Serena respects the fuel math and finishes it.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_artsy', [
  { when: { studentId: 4 }, weight: 8, text: [
    'Fiona\'s page is blank. Charcoal waiting. Hunger would give the page a subject.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_artsy.0', [
  { when: { studentId: 4 }, weight: 8, text: [
    'Food as still life, then as lunch. Fiona eats the study.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_gamer', [
  { when: { studentId: 5 }, weight: 8, text: [
    'Destiny in patch-day gravity. Hoodie, headphones, hunger on delay until delivery.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_gamer.0', [
  { when: { studentId: 5 }, weight: 8, text: [
    'Delivery lands. Destiny queues it like a raid snack and clears the tray.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_sorority', [
  { when: { studentId: 6 }, weight: 8, text: [
    'Tiffany\'s spreadsheet will not cooperate. Catering is the only language it speaks.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_sorority.0', [
  { when: { studentId: 6 }, weight: 8, text: [
    'You feed the planner. Tiffany eats and the event crisis shrinks one plate.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_overachiever', [
  { when: { studentId: 7 }, weight: 8, text: [
    'Priya handed in forty pages and asked for the next assignment. Lunch was not on the rubric.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_overachiever.0', [
  { when: { studentId: 7 }, weight: 8, text: [
    'You put food on the extra-credit pile. Priya files it under required and finishes it.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_quiet', [
  { when: { studentId: 8 }, weight: 8, text: [
    'Maya is already in the back. The room does not need her voice. The plate might.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_quiet.0', [
  { when: { studentId: 8 }, weight: 8, text: [
    'Snack arrives without a speech. Maya eats. Exchange over.',
  ] },
]);
registerModuleVariants('campusEvent.scene.arch_transfer', [
  { when: { studentId: 9 }, weight: 8, text: [
    'Chloé treats the hour like a salon that forgot the wine. American portions would help.',
  ] },
]);
registerModuleVariants('campusEvent.choice.arch_transfer.0', [
  { when: { studentId: 9 }, weight: 8, text: [
    'You produce something rich. Chloé says oui with her mouth full and stays seated.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_early', [
  { when: { stageMax: 2, corruption: [0] }, weight: 6, text: [
    '{subject.name} still fits the chair like last month. The snack you offer is the first argument.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_heavy', [
  { when: { stageMin: 5 }, weight: 6, text: [
    '{subject.name} takes two seats\' worth of ease. The lecture hall notices. She does not hide it.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_snack_break', [
  { when: {}, weight: 5, text: [
    'The box opens and the row leans in. Appetite was already on the syllabus.',
  ] },
]);
registerModuleVariants('campusEvent.choice.class_snack_break.0', [
  { when: { studentId: 14 }, weight: 6, text: [
    'Mary Jane treats the break like a harvest sample. The box does not survive.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_potluck', [
  { when: {}, weight: 5, text: [
    'Everyone brought a dish. Everyone is expected to try everything. The room smells like a dare.',
  ] },
]);
registerModuleVariants('campusEvent.choice.class_potluck.0', [
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé plates seconds like a tasting flight that forgot to stop.',
  ] },
]);

// ── stream milestones / specials (Destiny dialogue) ───────────
registerModuleVariants('stream.milestone.first_stream', [
  { when: {}, weight: 4, text: [
    'First stream in the books. Chat, you witnessed the tutorial boss.',
    'Debut sit done. I\'m logging off before I queue another tray.',
  ] },
]);
registerModuleVariants('stream.milestone.streams_5', [
  { when: {}, weight: 4, text: [
    'Five sits. This is a schedule now. Don\'t make it weird.',
  ] },
]);
registerModuleVariants('stream.milestone.streams_15', [
  { when: {}, weight: 4, text: [
    'Fifteen. The chair knows my name. So does the overlay.',
  ] },
]);
registerModuleVariants('stream.milestone.streams_30', [
  { when: {}, weight: 4, text: [
    'Thirty streams. I live here. The hoodie is a lease.',
  ] },
]);
registerModuleVariants('stream.milestone.audience_500', [
  { when: {}, weight: 4, text: [
    'Five hundred of you watching me sit. Okay. Behave.',
  ] },
]);
registerModuleVariants('stream.milestone.audience_2500', [
  { when: {}, weight: 4, text: [
    '2.5K. I felt that in the chair. Clip responsibly.',
  ] },
]);
registerModuleVariants('stream.milestone.audience_10000', [
  { when: {}, weight: 4, text: [
    'Ten K. I\'m a venue now. The tray is the opener.',
  ] },
]);
registerModuleVariants('stream.milestone.favor_max', [
  { when: {}, weight: 4, text: [
    'Brand favorite. They can send crates. I will sit in them.',
  ] },
]);
registerModuleVariants('stream.milestone.stage', [
  { when: { stageMin: 6 }, weight: 5, text: [
    'New size, live. The angle does not negotiate. Clip it.',
  ] },
  { when: { stageMax: 3 }, weight: 4, text: [
    'Number ticked. Still deniable. Chat, stop doing math.',
  ] },
]);
registerModuleVariants('stream.special.perfect_stream', [
  { when: {}, weight: 4, text: [
    'Clean run. Every round. I\'m going to be insufferable about this.',
  ] },
]);
registerModuleVariants('stream.special.viral_moment', [
  { when: {}, weight: 4, text: [
    'Phone exploding. I went viral for chewing. Peak career.',
  ] },
]);
registerModuleVariants('stream.special.brand_gift', [
  { when: {}, weight: 4, text: [
    'Crate mid-wrap. They\'re proud of the sit. I accept the bribe.',
  ] },
]);
registerModuleVariants('stream.special.feast_god', [
  { when: {}, weight: 4, text: [
    'Feast numbers are rude. I\'m framing the overlay.',
  ] },
]);
registerModuleVariants('stream.special.comeback_queen', [
  { when: {}, weight: 4, text: [
    'They counted me out. I popped off at the end. Stay for the VOD.',
  ] },
]);
registerModuleVariants('stream.special.chat_legend', [
  { when: {}, weight: 4, text: [
    'Chat carried. I sat. We\'re even. Don\'t get sentimental.',
  ] },
]);

// ── collab leftovers ──────────────────────────────────────────
registerModuleVariants('collab.reveal.open', [
  { when: { studentId: 2 }, weight: 6, text: [
    'You put Kylie\'s number on the mic. She already has the angle.',
  ] },
]);
registerModuleVariants('collab.reveal.kylie.body', [
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    'Kylie fills the frame on purpose. Belly first. Chat second.',
  ] },
]);
registerModuleVariants('collab.reveal.kylie.chat', [
  { when: {}, weight: 4, text: [
    'Donos tick before the echo dies. Regulars type MORE in caps.',
  ] },
]);
registerModuleVariants('collab.reveal.partner.close', [
  { when: {}, weight: 4, text: [
    '{partnerName} touches the swell once and keeps eating. Silence as content.',
  ] },
]);
registerModuleVariants('collab.zoom.open', [
  { when: { studentId: 2 }, weight: 5, text: [
    'You tighten on Kylie and {partnerName}. Two middles. One table.',
  ] },
]);
registerModuleVariants('collab.zoom.table', [
  { when: { stageMin: 6 }, weight: 5, text: [
    '{subject.name} at {subject.lbs} and {partnerName} at {partnerLbs} — both leaning into the shot.',
  ] },
]);
registerModuleVariants('collab.chat.wren', [
  { when: {}, weight: 4, text: [
    'Wren does not wait: {wrenLine}',
  ] },
]);
registerModuleVariants('collab.chat.bump', [
  { when: {}, weight: 4, text: [
    'Viewer count hops. The table notices. The forks do not stop.',
  ] },
]);
registerModuleVariants('collab.stream.wren.s0', [
  { when: {}, weight: 4, text: [
    'Wren is already typing like the collab started an hour ago.',
  ] },
]);
registerModuleVariants('collab.stream.wren.s3', [
  { when: {}, weight: 4, text: [
    'Wren sounds proud of the sit. The chat agrees too loud.',
  ] },
]);

// ── leftover dinner group beats ───────────────────────────────
registerModuleVariants('dinner.groupConv.get_them_talking.l2', [
  { when: { studentId: 5 }, weight: 5, text: [
    `Destiny: "We're talking. We're also eating. Priorities."`,
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    `Reneé turns the topic into a tasting note. {ref.name} takes notes with a fork.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.let_it_settle.l1', [
  { when: { studentId: 13 }, weight: 5, text: [
    `Daisy lets the table go quiet like a kitchen after grace. Then seconds.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.toast_together_group.l2', [
  { when: { studentId: 9 }, weight: 5, text: [
    `Chloé toasts in English, drinks like Paris, and eyes the bread.`,
  ] },
]);
registerModuleVariants('dinner.waiter.bistro._f1', [
  { when: { studentId: 9 }, weight: 5, text: [
    'The bistro waiter clocks Chloé and already knows there will be a second bottle.',
  ] },
]);
registerModuleVariants('dinner.waiter.home_dinner._f1', [
  { when: { studentId: 13 }, weight: 5, text: [
    'No waiter. Daisy is the service. Plates keep arriving from her own hands.',
  ] },
]);

// ── leftover hunt feast stages (extras on monoliths, not replacements)
registerModuleVariants('hunt.feast.s1', [
  { when: { corruption: [0] }, weight: 3, text: [
    'Afterward she maps the new softness with black nails, curious more than sorry.',
  ] },
]);
registerModuleVariants('hunt.feast.s2', [
  { when: { relationship: [2, 3] }, weight: 3, text: [
    'She lets you see the swell. The hunt is over. The keeping is not.',
  ] },
]);
registerModuleVariants('hunt.feast.s5', [
  { when: { stageMin: 5 }, weight: 3, text: [
    'She settles the new weight like furniture she already owns.',
  ] },
]);
registerModuleVariants('hunt.feast.s7', [
  { when: { stageMin: 7 }, weight: 3, text: [
    'The room has less aisle. She smiles like that was the point.',
  ] },
]);
registerModuleVariants('hunt.feast.s8', [
  { when: { isImmobile: true }, weight: 4, text: [
    'She does not chase anymore. Delivery is the hunt now. You stay close.',
  ] },
]);
