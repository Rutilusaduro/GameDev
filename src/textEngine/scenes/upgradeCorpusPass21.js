// The Squad — Lead: A6 Slender | Support: A1 Mobile, A3 Immobility, A5 Editor
// Pass 21 — leftover portrait _f1 uniqueness (one slot, face only) keyed
// on studentId × stage. Leftover bodyTypes (rotund / fertility_goddess /
// voluptuous / mom_bod) currently fall through to a two-slot stub; give
// them real portraits on the parent. Leftover intimacy selectors.
import { registerModuleVariants } from '../engine.js';

function face(key, studentId, text) {
  registerModuleVariants(key, [
    { when: { studentId }, weight: 8, text: [text] },
  ]);
}

function stub(studentId, bodyType, stage, text) {
  registerModuleVariants('body.portrait', [
    { when: { studentId, bodyType, stage: [stage] }, weight: 8, text: [text] },
  ]);
}

// ── pear _f1 — Brittany / Maya / Sophia ───────────────────────
face('body.portrait.pear.s0._f1', 0, 'Brittany\'s face is all captain: clean jaw, tight ponytail, eyes already scoring the room.');
face('body.portrait.pear.s2._f1', 0, 'Brittany\'s cheeks have taken a first soft deposit. The jaw still commands. The ponytail still means it.');
face('body.portrait.pear.s5._f1', 0, 'Brittany\'s face is rounder now, chin soft when she looks down, eyes still calling the play.');
face('body.portrait.pear.s8._f1', 0, 'Brittany\'s face sits small and sure above the rest of her. Captain energy, moon-soft edges.');
face('body.portrait.pear.s10._f1', 0, 'Brittany\'s face is calm above the sit. The look is still a whistle. The body already won.');

face('body.portrait.pear.s0._f1', 8, 'Maya\'s face is quiet geometry — neat jaw, dark eyes that take inventory and file it.');
face('body.portrait.pear.s2._f1', 8, 'Maya\'s cheeks have gone kinder. She notices. She does not comment. The eyes keep logging.');
face('body.portrait.pear.s5._f1', 8, 'Maya\'s face is full and still. Soft chin, watchful mouth. The looking does the talking.');
face('body.portrait.pear.s8._f1', 8, 'Maya\'s face is a small, serious moon. She lets you look. She looks back once.');
face('body.portrait.pear.s10._f1', 8, 'Maya\'s face is present and unhurried above the rest. The quiet is the whole speech.');

face('body.portrait.pear.s0._f1', 16, 'Sophia\'s face is lab-precise — tight mouth, anxious eyes, hair pulled back like a protocol.');
face('body.portrait.pear.s2._f1', 16, 'Sophia\'s cheeks have softened. She keeps checking the mirror like a side-effect log.');
face('body.portrait.pear.s5._f1', 16, 'Sophia\'s face is rounder, chin doubled when she looks down. She writes that down too.');
face('body.portrait.pear.s8._f1', 16, 'Sophia\'s face is a soft instrument panel. The numbers are in the cheeks now.');
face('body.portrait.pear.s10._f1', 16, 'Sophia\'s face is still taking notes above a body that closed the study.');

// ── hourglass _f1 — Kylie / Tiffany / Chloé / Mary Jane / Lilith
face('body.portrait.hourglass.s0._f1', 2, 'Kylie\'s face is contour and angle, phone-ready even when the phone is down.');
face('body.portrait.hourglass.s2._f1', 2, 'Kylie\'s cheeks have taken the first filter. She already knows the angle that loves it.');
face('body.portrait.hourglass.s5._f1', 2, 'Kylie\'s face is full and camera-sweet. Soft chin, bright mouth, the thumbnail already decided.');
face('body.portrait.hourglass.s8._f1', 2, 'Kylie\'s face is a small, famous moon. The rest of her is the caption.');
face('body.portrait.hourglass.s10._f1', 2, 'Kylie\'s face is serene above the sit. She still finds the light. The light finds her first.');

face('body.portrait.hourglass.s0._f1', 6, 'Tiffany\'s face is blowout and hostess smile, everything already arranged.');
face('body.portrait.hourglass.s2._f1', 6, 'Tiffany\'s cheeks have gone social-season soft. The smile still does event work.');
face('body.portrait.hourglass.s5._f1', 6, 'Tiffany\'s face is plush and practiced. Soft chin, pastel mouth, hosting from a wider chair.');
face('body.portrait.hourglass.s8._f1', 6, 'Tiffany\'s face is a sweet, seated greeting. The chapter comes to her now.');
face('body.portrait.hourglass.s10._f1', 6, 'Tiffany\'s face is calm reception. The room arrives. She does not have to.');

face('body.portrait.hourglass.s0._f1', 9, 'Chloé\'s face is lipstick and assessment — Dublin eyes, American air still new on her.');
face('body.portrait.hourglass.s2._f1', 9, 'Chloé\'s cheeks have taken a first American softness. She names it like weather.');
face('body.portrait.hourglass.s5._f1', 9, 'Chloé\'s face is full and unbothered. Soft chin, wine-dark mouth, salon-still.');
face('body.portrait.hourglass.s8._f1', 9, 'Chloé\'s face is a small, pleased moon. Portions finished the building she came for.');
face('body.portrait.hourglass.s10._f1', 9, 'Chloé\'s face is present and amused above the sit. She came for buildings. She stayed for this.');

face('body.portrait.hourglass.s0._f1', 14, 'Mary Jane\'s face is sun and jam — big smile, open cheeks, nothing hidden.');
face('body.portrait.hourglass.s2._f1', 14, 'Mary Jane\'s cheeks have gone pie-soft. The smile still harvests the room.');
face('body.portrait.hourglass.s5._f1', 14, 'Mary Jane\'s face is generous and warm. Soft chin, kitchen heat still on her.');
face('body.portrait.hourglass.s8._f1', 14, 'Mary Jane\'s face is a sweet, settled harvest. She greets you from the chair like a porch.');
face('body.portrait.hourglass.s10._f1', 14, 'Mary Jane\'s face is sunny above the sit. The farm taught her to stay put when the yield is good.');

face('body.portrait.hourglass.s0._f1', 15, 'Lilith\'s face is stillness. Dark mouth. Eyes that already decided you are food or furniture.');
face('body.portrait.hourglass.s2._f1', 15, 'Lilith\'s cheeks have taken a first soft claim. She does not explain it.');
face('body.portrait.hourglass.s5._f1', 15, 'Lilith\'s face is fuller, chin soft, hunger still the only expression she bothers with.');
face('body.portrait.hourglass.s8._f1', 15, 'Lilith\'s face is a small, satisfied moon. Tribute sits under it.');
face('body.portrait.hourglass.s10._f1', 15, 'Lilith\'s face is present and fed. The rest of her is the nest. You are already in it.');

// ── straight _f1 — Madeline / Fiona / Priya / Indiana / Talia ─
face('body.portrait.straight.s0._f1', 1, 'Madeline\'s face is all angles and glasses — lean jaw, temples hollow, eyes already citing.');
face('body.portrait.straight.s2._f1', 1, 'Madeline\'s cheeks have softened. She files it under observation and keeps the glasses sliding.');
face('body.portrait.straight.s5._f1', 1, 'Madeline\'s face is round and full. Soft chin, thick neck, the notes still immaculate.');
face('body.portrait.straight.s8._f1', 1, 'Madeline\'s face is small and sweet in a vast, even head. The dataset is her.');
face('body.portrait.straight.s10._f1', 1, 'Madeline\'s face is serene above the sit. The file stays open because she is the file.');

face('body.portrait.straight.s0._f1', 4, 'Fiona\'s face is paint-smudge and distance — lean, dreamy, already looking past you.');
face('body.portrait.straight.s2._f1', 4, 'Fiona\'s cheeks have taken a first soft glaze. She treats it like a study.');
face('body.portrait.straight.s5._f1', 4, 'Fiona\'s face is full and unfocused-on-purpose. Soft chin, the subject arriving in the cheeks.');
face('body.portrait.straight.s8._f1', 4, 'Fiona\'s face is a small hung moon. The rest of her is the work.');
face('body.portrait.straight.s10._f1', 4, 'Fiona\'s face is present and dreamy above the sit. The gallery came to her.');

face('body.portrait.straight.s0._f1', 7, 'Priya\'s face is planner-tight — lean jaw, stressed mouth, three thoughts visible at once.');
face('body.portrait.straight.s2._f1', 7, 'Priya\'s cheeks have softened. She schedules around it and does not drop a color.');
face('body.portrait.straight.s5._f1', 7, 'Priya\'s face is round and driven. Soft chin, the rubric still winning the eyes.');
face('body.portrait.straight.s8._f1', 7, 'Priya\'s face is a small, efficient moon. First place is a sitting problem now.');
face('body.portrait.straight.s10._f1', 7, 'Priya\'s face is still scoring above the sit. The column climbs. She does not.');

face('body.portrait.straight.s0._f1', 17, 'Indiana\'s face is sunburn and grin — lean, roguish, already mapping the exit.');
face('body.portrait.straight.s2._f1', 17, 'Indiana\'s cheeks have taken trail-softness. She calls it camp food and keeps grinning.');
face('body.portrait.straight.s5._f1', 17, 'Indiana\'s face is full and pleased. Soft chin, mud still a rumor at the hairline.');
face('body.portrait.straight.s8._f1', 17, 'Indiana\'s face is a small, found moon. The relic was her. She is still grinning.');
face('body.portrait.straight.s10._f1', 17, 'Indiana\'s face is curious above the sit. The map ends here. She likes the ending.');

face('body.portrait.straight.s0._f1', 18, 'Talia\'s face is grease-smudge and measure — lean jaw, eyes that take inputs.');
face('body.portrait.straight.s2._f1', 18, 'Talia\'s cheeks have softened. She notes the delta and does not stop the run.');
face('body.portrait.straight.s5._f1', 18, 'Talia\'s face is full and calibrated. Soft chin, the model already updated.');
face('body.portrait.straight.s8._f1', 18, 'Talia\'s face is a small, satisfied readout. The jig is thriving.');
face('body.portrait.straight.s10._f1', 18, 'Talia\'s face is present above the hardware. Dual intake. She keeps both powered.');

// ── apple _f1 — Destiny ───────────────────────────────────────
face('body.portrait.apple.s0._f1', 5, 'Destiny\'s face is dry and precise — lean cheeks, hoodie shadow, mouth already unimpressed.');
face('body.portrait.apple.s2._f1', 5, 'Destiny\'s cheeks have rounded. She shrugs like the hoodie can handle it.');
face('body.portrait.apple.s5._f1', 5, 'Destiny\'s face is full and unbothered. Soft chin, tired mouth, the sit already her bit.');
face('body.portrait.apple.s8._f1', 5, 'Destiny\'s face is a small, dry moon. Chat can cope. She already did.');
face('body.portrait.apple.s10._f1', 5, 'Destiny\'s face is present and done moving. The chair is the overlay now.');

// ── athletic _f1 — Serena ─────────────────────────────────────
face('body.portrait.athletic.s0._f1', 3, 'Serena\'s face is race-clean — angular jaw, lean neck, eyes already on a clock.');
face('body.portrait.athletic.s2._f1', 3, 'Serena\'s cheeks have softened. The jaw still looks like a start line.');
face('body.portrait.athletic.s5._f1', 3, 'Serena\'s face is full and competitive. Soft chin, thick strong neck, recovery written on it.');
face('body.portrait.athletic.s8._f1', 3, 'Serena\'s face is a small, fierce moon. The meet is the sit. She is still winning.');
face('body.portrait.athletic.s10._f1', 3, 'Serena\'s face is present and proud above the sit. Strength remembered in how she holds still.');

// ── leftover bodyTypes: parent extras replace the two-slot stub ─
stub(10, 'rotund', 0, 'Reneé\'s face is kitchen-awake — lean cheeks, flour at a temple, eyes already tasting the air.');
stub(10, 'rotund', 2, 'Reneé\'s cheeks have gone recipe-soft. She talks flavor while the middle starts its own argument.');
stub(10, 'rotund', 5, 'Reneé\'s face is full and sensory. Soft chin, warm mouth, a cook who became the batch.');
stub(10, 'rotund', 8, 'Reneé\'s face is a small, pleased moon above a vast, kneaded middle. The kitchen rearranged around her.');
stub(10, 'rotund', 10, 'Reneé\'s face is calm above the sit. Yield logged. She is exactly as large as the plan.');

stub(11, 'fertility_goddess', 0, 'Kaylee\'s face is warm attention — clean jaw, kind mouth, the look that asks how you are and means it.');
stub(11, 'fertility_goddess', 2, 'Kaylee\'s cheeks have taken a first soft care. She notices and calls it sleep, then keeps smiling.');
stub(11, 'fertility_goddess', 5, 'Kaylee\'s face is full and nurturing. Soft chin, thick warmth, the body already doing the holding.');
stub(11, 'fertility_goddess', 8, 'Kaylee\'s face is a small, kind moon. She hosts from the chair the way she used to host a shift.');
stub(11, 'fertility_goddess', 10, 'Kaylee\'s face is present and gentle above the sit. Care stays. She does.');

stub(12, 'voluptuous', 0, 'Nadia\'s face is evaluation — lean, watchful, notebook already open behind the eyes.');
stub(12, 'voluptuous', 2, 'Nadia\'s cheeks have softened. She names the variable and does not put the pen down.');
stub(12, 'voluptuous', 5, 'Nadia\'s face is full and assessing. Soft chin, the case study arriving in the cheeks.');
stub(12, 'voluptuous', 8, 'Nadia\'s face is a small, clinical moon. She is the data. She likes the data.');
stub(12, 'voluptuous', 10, 'Nadia\'s face is present and still logging above the sit. The study closed around her.');

stub(13, 'mom_bod', 0, 'Daisy\'s face is cookie-warm — open cheeks, practical mouth, already looking after you.');
stub(13, 'mom_bod', 2, 'Daisy\'s cheeks have gone snack-soft. She blesses it and offers you one too.');
stub(13, 'mom_bod', 5, 'Daisy\'s face is full and settled. Soft chin, kitchen smell, the bag of snacks now optional.');
stub(13, 'mom_bod', 8, 'Daisy\'s face is a small, blessing moon. She stays seated and still finds a way to feed the room.');
stub(13, 'mom_bod', 10, 'Daisy\'s face is present and warm above the sit. The nest is her. The snacks come to it.');

// ── leftover intimacy selectors ───────────────────────────────
registerModuleVariants('intimacy.moodTone', [
  { when: { studentId: 1, mood: ['focused'] }, weight: 6, text: [
    'Madeline\'s focus is a second pair of hands. She catalogs the heat and stays in it.',
  ] },
  { when: { studentId: 10, mood: ['content'] }, weight: 6, text: [
    'Reneé\'s contentment tastes like a finished batch. She presses close and keeps you there.',
  ] },
  { when: { studentId: 11, mood: ['warm'] }, weight: 6, text: [
    'Kaylee\'s warmth is care with weight behind it. She holds you like a shift she will not leave.',
  ] },
  { when: { studentId: 5, mood: ['tired'] }, weight: 6, text: [
    'Destiny is tired and still here. The sit is the affection. She lets you take it.',
  ] },
  { when: { studentId: 7, mood: ['stressed'] }, weight: 6, text: [
    'Priya\'s stress unclenches against you. The planner can wait. This cannot.',
  ] },
]);
registerModuleVariants('intimacy.relOverlay', [
  { when: { studentId: 10, relationship: [3] }, weight: 6, text: [
    'Reneé treats you like mise en place. Close. Necessary. Already claimed.',
  ] },
  { when: { studentId: 16, relationship: [3] }, weight: 6, text: [
    'Sophia lets the protocol drop. Hands stay. The result she wanted.',
  ] },
  { when: { studentId: 14, relationship: [3] }, weight: 6, text: [
    'Mary Jane keeps you in the warm. Porch logic. You do not get up first.',
  ] },
]);
registerModuleVariants('intimacy.campusNote', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Hallway quiet followed Maya home. She keeps that quiet against you.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Dining-hall steam is still in Reneé\'s hair. The kitchen came with her.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Practice dust on Brittany. She sheds the squad and keeps the heat.',
  ] },
]);

// ── leftover slender (early, cor 0; leftover leftover leftover IDs) ─
registerModuleVariants('slender.mirror', [
  { when: { studentId: 1, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Madeline checks the glass like a citation. The softness is still deniable. She writes it anyway.',
  ] },
  { when: { studentId: 7, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Priya squares her shoulders in the mirror. The planner did not budget this softness.',
  ] },
  { when: { studentId: 3, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Serena turns sideways like a weigh-in she did not schedule. The line is still hers. Barely.',
  ] },
]);
registerModuleVariants('slender.secret', [
  { when: { studentId: 8, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Maya hides the extra bite the way she hides the notebook. No speech. The body keeps it.',
  ] },
  { when: { studentId: 16, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Sophia calls it a protocol deviation and eats it anyway. The log will be vague.',
  ] },
]);
registerModuleVariants('slender.deflect', [
  { when: { studentId: 0, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Brittany blames the uniform cut. The chin already knows better.',
  ] },
  { when: { studentId: 2, stageMax: 3, corruption: [0] }, weight: 7, text: [
    'Kylie calls it the lighting. She still turns to check the other angle.',
  ] },
]);
