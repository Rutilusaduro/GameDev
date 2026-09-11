// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Pass 8 — dinner waiters, session aftermath, intimacy, leftover stream.
import { registerModuleVariants } from '../engine.js';

// ── dinner waiters ────────────────────────────────────────────
registerModuleVariants('dinner.waiter.bistro._f1', [
  { when: { studentId: 14 }, weight: 5, text: [
    'The bistro girl clocks Mary Jane like a regular who taught the kitchen its butter habit. "Ready for more?"',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Soft apron, warmer smile. She already knows Chloé will say yes in two languages.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'The bistro waitress looks at {subject.name} the way people look at a reservation that never ends. "More?"',
  ] },
]);
registerModuleVariants('dinner.waiter.italian._f1', [
  { when: { studentId: 9 }, weight: 5, text: [
    'Bread basket lands before Chloé asks. "More? Of course more." The woman sounds like home.',
  ] },
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany gets the extra basket first. Chapter hostess recognizes chapter hostess.',
  ] },
]);
registerModuleVariants('dinner.waiter.steakhouse._f1', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Leather apron, professional nod. She treats Brittany\'s empty plates like a winning scorecard.',
  ] },
  { when: { studentId: 3 }, weight: 5, text: [
    'The steakhouse woman surveys Serena\'s cleared board like a coach who likes the new event.',
  ] },
]);
registerModuleVariants('dinner.waiter.french._f1', [
  { when: { studentId: 9 }, weight: 5, text: [
    'The sommelier refills Chloé without asking. Research, she calls it. Chloé calls it correct.',
  ] },
  { when: { studentId: 1 }, weight: 5, text: [
    'Wine first, then the next course question. Madeline answers with a footnote and an empty glass.',
  ] },
]);
registerModuleVariants('dinner.waiter.japanese._f1', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Quiet replacement of chopsticks. Maya reaches for the fresh menu without looking up.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'The server waits. Lilith does not. The menu is already in her hand.',
  ] },
]);
registerModuleVariants('dinner.waiter.private_club._f1', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Club livery, unhurried. A new card appears. Priya treats it like extra credit she already earned.',
  ] },
]);
registerModuleVariants('dinner.waiter.chefs_table._f1', [
  { when: { studentId: 10 }, weight: 5, text: [
    'The floor manager and Reneé exchange a look that is entirely about yield.',
  ] },
  { when: { studentId: 4 }, weight: 5, text: [
    'Tailored black, immense softness. Fiona photographs the next pour with her eyes first.',
  ] },
]);
registerModuleVariants('dinner.waiter.home_dinner._f1', [
  { when: { studentId: 14 }, weight: 5, text: [
    'You go back for the next course. Mary Jane is already making room on the table and on herself.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Kitchen to table. Maya has not moved. The plate can travel.',
  ] },
]);
registerModuleVariants('dinner.waiter.brunch_hall._f1', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Floral apron, two coffees, a fresh card. Kylie is already angling the pour for a story.',
  ] },
  { when: { studentId: 11 }, weight: 5, text: [
    'Plenty more, she says. Kaylee believes her and starts on the card.',
  ] },
]);
registerModuleVariants('dinner.waiter.atelier._f1', [
  { when: { studentId: 4 }, weight: 5, text: [
    'The maître d\' arrives like a moving installation. Fiona sits up. The kitchen has already been told.',
  ] },
  { when: { studentId: 2 }, weight: 5, text: [
    'Impeccable black, no menu question. Kylie straightens like the camera just found her.',
  ] },
]);

// ── session aftermath ─────────────────────────────────────────
registerModuleVariants('session.aftermath.light._f1', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya is full and loose-limbed with it. Last bites slow. "I\'m glad I came." She does not make it a speech.',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny leans back, comfortable, already thinking about the next sit-down. "Good session."',
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    '{subject.name} is full and trying not to sound pleased about it. The last bites betray her.',
  ] },
]);
registerModuleVariants('session.aftermath.full._f1', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany leans back, both hands on a full, round middle. "I can\'t move." She does not try. Captain\'s rest.',
  ] },
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie stays back, filming the curve of her own belly before she remembers to breathe.',
  ] },
]);
registerModuleVariants('session.aftermath.full._f2', [
  { when: { studentId: 8 }, weight: 5, text: [
    '. You drape the blanket. Maya is already asleep sitting up.',
  ] },
  { when: {}, weight: 3, text: [
    '. The blanket goes over her. She stays where the chair won.',
  ] },
]);
registerModuleVariants('session.aftermath.stuffed._f1', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany goes still, spectacularly full, hands flat on a warm round middle. Hostess off-duty.',
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé is very still. She presses her palms to the yield and files the sensation.',
  ] },
]);
registerModuleVariants('session.aftermath.stuffed._f2', [
  { when: { studentId: 6 }, weight: 5, text: [
    '. "I ate everything," she says, pleased. "I always do."',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    '. "Full clear," Destiny murmurs, and sounds glad.',
  ] },
]);
registerModuleVariants('session.aftermath.packed._f1', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Quiet. Maya is enormous with food, hands on the weight and warmth of it, no extra words.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith keeps her hands on the packed middle like a finished hunt. Extraordinary, and hers.',
  ] },
]);
registerModuleVariants('session.aftermath.packed._f2', [
  { when: { studentId: 8 }, weight: 5, text: [
    '. "This is what I want." Maya means the food. She also means staying.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    '. "This is what I want," she says. The plate and the size both count.',
  ] },
]);

// ── intimacy selectors ────────────────────────────────────────
registerModuleVariants('intimacy.moodTone', [
  { when: { studentId: 8, mood: 'content' }, weight: 5, text: [
    'Maya\'s contentment is quiet heat. She presses close and lets the silence work.',
  ] },
  { when: { studentId: 2, mood: 'excited' }, weight: 5, text: [
    'Kylie laughs into your shoulder like the camera is off and she is finally allowed.',
  ] },
  { when: { studentId: 15, mood: 'warm' }, weight: 5, text: [
    'Lilith\'s warmth is a claim. She settles her weight where she wants you kept.',
  ] },
]);
registerModuleVariants('intimacy.relOverlay', [
  { when: { studentId: 0, relTier: [3, 4] }, weight: 5, text: [
    'Brittany moves like a captain who already called the play. No performance left.',
  ] },
  { when: { studentId: 8, relTier: [3, 4] }, weight: 5, text: [
    'Maya stays. Hands, warmth, the choice repeating itself.',
  ] },
]);
registerModuleVariants('intimacy.campusNote', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Campus air still on her clothes. The room is quieter than any feed.',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Dining-hall heat followed her home. Chloé brings the booth into the dark.',
  ] },
]);

// ── leftover stream (Destiny first-person / chat lowercase) ────
registerModuleVariants('stream.betweenRound', [
  { when: { studentId: 5, perf: 'good' }, weight: 5, text: [
    'Okay… chair\'s winning and I\'m not mad about it.',
    'Next tray. I was gonna sit here anyway.',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Give me a second. Soft save. Then we go again.',
  ] },
]);
registerModuleVariants('stream.endStream.excellent', [
  { when: { studentId: 5 }, weight: 5, text: [
    'GG. I\'m huge and the numbers are huge. Same time.',
    'Best stream. Don\'t ask me to stand. I\'m not gonna.',
  ] },
]);
registerModuleVariants('stream.endStream.good', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Solid VOD. Softer overlay than when we started. I\'m keeping it.',
  ] },
]);
registerModuleVariants('stream.tapOut.fullness', [
  { when: { studentId: 5 }, weight: 5, text: [
    'I\'m packed. That\'s the clip. I\'m tapping.',
    'Chat, I\'m too full to queue another. Belly won.',
  ] },
]);
registerModuleVariants('stream.chat.parasocial.late', [
  { when: { stageMin: 8 }, weight: 4, text: [
    'she\'s filling the chair and still talking like this is normal',
    'the sit-down arc is the content now',
  ] },
]);
