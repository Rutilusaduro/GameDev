// The Squad — Lead: A2 Psych | Support: A6 Slender, A1 Mobile, A5 Editor
// Pass 22 — leftover word.* lexicon (never overlaid; no names — these
// compose), leftover portrait _f1 stages 1/3/4/6/7/9/11, leftover
// bodyType stub stages, leftover hunger.desc.
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

// ── leftover word.psychVoice (clause, lowercase, no names) ────
registerModuleVariants('word.psychVoice', [
  { when: { studentId: 8, corruption: [0] }, weight: 6, text: [
    'voice small, the words already edited down to nothing',
    'tone that files the feeling before it leaves her mouth',
  ] },
  { when: { studentId: 0, corruption: [0] }, weight: 6, text: [
    'voice still calling plays, a half-beat late on the soft ones',
    'tone that treats appetite like a timeout she did not schedule',
  ] },
  { when: { studentId: 2, corruption: [1, 2] }, weight: 6, text: [
    'voice already framing the next take, warm underneath',
    'tone that likes being looked at and does not hide it',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'voice that treats speech as optional',
    'tone like a claim already settled',
  ] },
  { when: { studentId: 10, corruption: [1, 2] }, weight: 6, text: [
    'voice tasting the sentence before she finishes it',
    'tone of a cook who already knows the yield',
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    'voice citing itself, then going quieter',
    'tone that wants a footnote for the warmth',
  ] },
]);

// ── leftover word.breathQuality ───────────────────────────────
registerModuleVariants('word.breathQuality', [
  { when: { studentId: 8, fullnessMin: 0.6 }, weight: 6, text: [
    'breath slow enough to count',
    'a quiet exhale that stays in the room',
  ] },
  { when: { studentId: 3, fullnessMin: 0.6 }, weight: 6, text: [
    'breath like a recovered interval, then another bite',
    'air moving like she still owns the clock',
  ] },
  { when: { studentId: 5, fullnessMin: 0.6 }, weight: 6, text: [
    'breath of someone who sat down on purpose',
    'a hoodie-muffled sigh that does not apologize',
  ] },
  { when: { studentId: 11, fullnessMin: 0.6 }, weight: 6, text: [
    'breath warm the way care is warm',
    'an exhale that sounds like staying',
  ] },
]);

// ── leftover word.jealousyReaction ────────────────────────────
registerModuleVariants('word.jealousyReaction', [
  { when: { studentId: 0 }, weight: 6, text: [
    'watching the plate like a rival scoreboard',
    'smiling captain-bright while she counts someone else\'s bites',
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'ranking the portion against her own unfinished column',
    'going quiet in the way she goes quiet when a metric moves',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'already seeing the other girl\'s angle and wanting a better one',
    'laughing once, then watching the fork like a thumbnail',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'looking at the plate, then at her own hands, then nowhere',
    'keeping still while comparison does the talking',
  ] },
]);

// ── leftover word.hungerPhrase (tier 3/4 never fire alone) ────
registerModuleVariants('word.hungerPhrase', [
  { when: { studentId: 8 }, weight: 6, text: [
    'hunger she will not narrate',
    'appetite sitting in the quiet like a second person',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'hunger with a cook\'s vocabulary and a girl\'s urgency',
    'appetite already plating itself',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'craving logged as a side effect she intends to keep',
    'appetite that outran the protocol',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'hunger queued and not leaving',
    'appetite treating the afternoon like a tray already claimed',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'hunger as tribute already owed',
    'appetite that does not ask',
  ] },
]);

// ── leftover word.adv.pace / manner (adverbial, lowercase) ────
registerModuleVariants('word.adv.pace', [
  { when: { studentId: 8 }, weight: 5, text: [
    'without announcing it',
    'like the room already understood',
  ] },
  { when: { studentId: 0, mood: ['happy', 'excited'] }, weight: 5, text: [
    'like a play she already called',
  ] },
  { when: { studentId: 18 }, weight: 5, text: [
    'as if measuring the next step first',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'like she is still mapping the country',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'as if the room already belongs to her',
  ] },
]);
registerModuleVariants('word.adv.manner', [
  { when: { studentId: 10 }, weight: 5, text: [
    'like a tasting she already passed',
    'with a cook\'s attention and no leftovers',
  ] },
  { when: { studentId: 13 }, weight: 5, text: [
    'as if blessing the plate first',
  ] },
  { when: { studentId: 4 }, weight: 5, text: [
    'like the bite is another study',
  ] },
  { when: { studentId: 14 }, weight: 5, text: [
    'with porch-logic generosity',
  ] },
]);

// ── leftover hunger.desc ──────────────────────────────────────
registerModuleVariants('hunger.desc', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Hunger sits in Maya like a held note. She will not name it. She will eat it.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé is hungry the way a kitchen is hungry — already reaching for a spoon.',
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia\'s appetite exceeded the label. She keeps the label anyway.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany skipped lunch for practice and the skip is now the whole hour.',
  ] },
]);

// ── leftover portrait _f1 stages 1/3/4/6/7/9/11 ───────────────
face('body.portrait.pear.s1._f1', 0, 'Brittany\'s face is still captain-clean. A first softness at the cheek she will call lighting.');
face('body.portrait.pear.s3._f1', 0, 'Brittany\'s cheeks have gone rounder. The ponytail still means business. The chin is starting to argue.');
face('body.portrait.pear.s4._f1', 0, 'Brittany\'s face is plump-soft now. Soft chin when she looks down, eyes still scoring the room.');
face('body.portrait.pear.s6._f1', 0, 'Brittany\'s face is full and sure. Captain mouth, padded jaw, the whistle still in the look.');
face('body.portrait.pear.s7._f1', 0, 'Brittany\'s face is a small, commanding moon. Soft everywhere the uniform used to lie.');
face('body.portrait.pear.s9._f1', 0, 'Brittany\'s face is present and proud above the vast sit. She still calls the play from here.');
face('body.portrait.pear.s11._f1', 0, 'Brittany\'s face is calm weather above the rest. The squad comes to her now.');

face('body.portrait.pear.s1._f1', 8, 'Maya\'s face is still quiet geometry, a first kindness at the cheek she will not mention.');
face('body.portrait.pear.s3._f1', 8, 'Maya\'s cheeks have filled. The eyes keep logging. The mouth stays off the record.');
face('body.portrait.pear.s4._f1', 8, 'Maya\'s face is rounder, chin soft. She lets you look and files the looking.');
face('body.portrait.pear.s6._f1', 8, 'Maya\'s face is full and still. Soft chin, watchful mouth, no performance.');
face('body.portrait.pear.s7._f1', 8, 'Maya\'s face is a small serious moon. The quiet got heavier with her.');
face('body.portrait.pear.s9._f1', 8, 'Maya\'s face is present above the sit. One look. The whole sentence.');
face('body.portrait.pear.s11._f1', 8, 'Maya\'s face is unhurried weather. The inventory closed. She kept the warmth.');

face('body.portrait.pear.s1._f1', 16, 'Sophia\'s face is still lab-tight. A first soft deposit she will footnote later.');
face('body.portrait.pear.s3._f1', 16, 'Sophia\'s cheeks have softened. She checks the mirror like a titration.');
face('body.portrait.pear.s4._f1', 16, 'Sophia\'s face is plump-round now. Soft chin, the protocol already behind the curve.');
face('body.portrait.pear.s6._f1', 16, 'Sophia\'s face is full and annotated. The numbers live in the cheeks.');
face('body.portrait.pear.s7._f1', 16, 'Sophia\'s face is a soft instrument. She keeps writing. The body already published.');
face('body.portrait.pear.s9._f1', 16, 'Sophia\'s face is present above the sit. Study closed. Appetite current.');
face('body.portrait.pear.s11._f1', 16, 'Sophia\'s face is still taking notes. The subject is the whole room.');

face('body.portrait.hourglass.s1._f1', 2, 'Kylie\'s face is still contour-sharp. A first soft filter at the cheek she already likes.');
face('body.portrait.hourglass.s3._f1', 2, 'Kylie\'s cheeks have gone camera-sweet. She knows the angle. She keeps it.');
face('body.portrait.hourglass.s4._f1', 2, 'Kylie\'s face is plump and pleased. Soft chin, bright mouth, thumbnail-ready.');
face('body.portrait.hourglass.s6._f1', 2, 'Kylie\'s face is full and famous-looking. The caption is already the rest of her.');
face('body.portrait.hourglass.s7._f1', 2, 'Kylie\'s face is a small, lit moon. She still finds the light.');
face('body.portrait.hourglass.s9._f1', 2, 'Kylie\'s face is serene above the sit. The feed comes to her.');
face('body.portrait.hourglass.s11._f1', 2, 'Kylie\'s face is present and done traveling. The light stays. So does she.');

face('body.portrait.hourglass.s1._f1', 6, 'Tiffany\'s face is still hostess-clean. A first social softness she will call the lighting.');
face('body.portrait.hourglass.s3._f1', 6, 'Tiffany\'s cheeks have gone event-soft. The smile still does chapter work.');
face('body.portrait.hourglass.s4._f1', 6, 'Tiffany\'s face is plump and practiced. Soft chin, pastel mouth, seating chart in the eyes.');
face('body.portrait.hourglass.s6._f1', 6, 'Tiffany\'s face is full and hosting. People come to the chair now.');
face('body.portrait.hourglass.s7._f1', 6, 'Tiffany\'s face is a small greeting moon. The room rearranges.');
face('body.portrait.hourglass.s9._f1', 6, 'Tiffany\'s face is reception. She does not stand to welcome anyone.');
face('body.portrait.hourglass.s11._f1', 6, 'Tiffany\'s face is calm weather. The chapter is the sit.');

face('body.portrait.hourglass.s1._f1', 9, 'Chloé\'s face is still lipstick and assessment. A first American softness she names like weather.');
face('body.portrait.hourglass.s3._f1', 9, 'Chloé\'s cheeks have filled. Dublin eyes, wine-dark mouth, portions doing the rest.');
face('body.portrait.hourglass.s4._f1', 9, 'Chloé\'s face is plump and unbothered. Soft chin, salon-still.');
face('body.portrait.hourglass.s6._f1', 9, 'Chloé\'s face is full and pleased. She came for buildings. The face already stayed.');
face('body.portrait.hourglass.s7._f1', 9, 'Chloé\'s face is a small pleased moon. Portions finished the map.');
face('body.portrait.hourglass.s9._f1', 9, 'Chloé\'s face is amused above the sit. American air, settled now.');
face('body.portrait.hourglass.s11._f1', 9, 'Chloé\'s face is present weather. The country got mapped. She is the landmark.');

face('body.portrait.hourglass.s1._f1', 14, 'Mary Jane\'s face is still sun and jam. A first pie-softness she will feed you about.');
face('body.portrait.hourglass.s3._f1', 14, 'Mary Jane\'s cheeks have gone harvest-round. The smile still opens the room.');
face('body.portrait.hourglass.s4._f1', 14, 'Mary Jane\'s face is plump and warm. Soft chin, kitchen heat still on her.');
face('body.portrait.hourglass.s6._f1', 14, 'Mary Jane\'s face is full and generous. Porch logic in the eyes.');
face('body.portrait.hourglass.s7._f1', 14, 'Mary Jane\'s face is a sweet settled moon. Yield showing.');
face('body.portrait.hourglass.s9._f1', 14, 'Mary Jane\'s face is sunny above the sit. She stays put when the crop is good.');
face('body.portrait.hourglass.s11._f1', 14, 'Mary Jane\'s face is present weather. The farm came indoors.');

face('body.portrait.hourglass.s1._f1', 15, 'Lilith\'s face is still stillness. A first soft claim she will not explain.');
face('body.portrait.hourglass.s3._f1', 15, 'Lilith\'s cheeks have taken a quiet deposit. Hunger is still the only expression.');
face('body.portrait.hourglass.s4._f1', 15, 'Lilith\'s face is fuller, chin soft. She looks like a nest starting.');
face('body.portrait.hourglass.s6._f1', 15, 'Lilith\'s face is full and fed. Tribute sits under the look.');
face('body.portrait.hourglass.s7._f1', 15, 'Lilith\'s face is a small satisfied moon. You are already in reach.');
face('body.portrait.hourglass.s9._f1', 15, 'Lilith\'s face is present above the nest. Speech optional.');
face('body.portrait.hourglass.s11._f1', 15, 'Lilith\'s face is weather. The room is hers. So are you.');

face('body.portrait.straight.s1._f1', 1, 'Madeline\'s face is still all glasses and angle. A first soft deposit she will cite.');
face('body.portrait.straight.s3._f1', 1, 'Madeline\'s cheeks have filled. The glasses slide. The notes stay immaculate.');
face('body.portrait.straight.s4._f1', 1, 'Madeline\'s face is plump-round now. Soft chin, thick neck starting, eyes still citing.');
face('body.portrait.straight.s6._f1', 1, 'Madeline\'s face is full and even. The dataset arrived in the cheeks.');
face('body.portrait.straight.s7._f1', 1, 'Madeline\'s face is a small sweet moon. She is the file.');
face('body.portrait.straight.s9._f1', 1, 'Madeline\'s face is serene above the sit. The column still climbs.');
face('body.portrait.straight.s11._f1', 1, 'Madeline\'s face is weather. Observation closed around her.');

face('body.portrait.straight.s1._f1', 4, 'Fiona\'s face is still paint-smudge and distance. A first glaze at the cheek.');
face('body.portrait.straight.s3._f1', 4, 'Fiona\'s cheeks have filled. She treats it like a study she meant to start.');
face('body.portrait.straight.s4._f1', 4, 'Fiona\'s face is plump and unfocused-on-purpose. Soft chin, subject arriving.');
face('body.portrait.straight.s6._f1', 4, 'Fiona\'s face is full and hung. The work is the rest of her.');
face('body.portrait.straight.s7._f1', 4, 'Fiona\'s face is a small hung moon. Viewers look up.');
face('body.portrait.straight.s9._f1', 4, 'Fiona\'s face is dreamy above the sit. The gallery came indoors.');
face('body.portrait.straight.s11._f1', 4, 'Fiona\'s face is weather. The installation is permanent.');

face('body.portrait.straight.s1._f1', 7, 'Priya\'s face is still planner-tight. A first softness she did not color-code.');
face('body.portrait.straight.s3._f1', 7, 'Priya\'s cheeks have filled. She schedules around it and keeps the highlighters.');
face('body.portrait.straight.s4._f1', 7, 'Priya\'s face is plump and driven. Soft chin, rubric still winning the eyes.');
face('body.portrait.straight.s6._f1', 7, 'Priya\'s face is full and scoring. First place is getting heavier.');
face('body.portrait.straight.s7._f1', 7, 'Priya\'s face is a small efficient moon. The column is a sitting problem.');
face('body.portrait.straight.s9._f1', 7, 'Priya\'s face is still scoring above the sit. She does not get up to win.');
face('body.portrait.straight.s11._f1', 7, 'Priya\'s face is weather. The file stays open. So does the appetite.');

face('body.portrait.straight.s1._f1', 17, 'Indiana\'s face is still sunburn and grin. A first camp-softness at the cheek.');
face('body.portrait.straight.s3._f1', 17, 'Indiana\'s cheeks have filled. She calls it trail food and keeps mapping.');
face('body.portrait.straight.s4._f1', 17, 'Indiana\'s face is plump and pleased. Soft chin, mud a rumor at the hairline.');
face('body.portrait.straight.s6._f1', 17, 'Indiana\'s face is full and found. The relic was closer than the hallway.');
face('body.portrait.straight.s7._f1', 17, 'Indiana\'s face is a small grinning moon. Map ending well.');
face('body.portrait.straight.s9._f1', 17, 'Indiana\'s face is curious above the sit. The dig stopped here.');
face('body.portrait.straight.s11._f1', 17, 'Indiana\'s face is weather. The map ends in a nest she likes.');

face('body.portrait.straight.s1._f1', 18, 'Talia\'s face is still grease-smudge and measure. A first delta at the cheek.');
face('body.portrait.straight.s3._f1', 18, 'Talia\'s cheeks have softened. She notes it and does not halt the run.');
face('body.portrait.straight.s4._f1', 18, 'Talia\'s face is plump and calibrated. Soft chin, model already updated.');
face('body.portrait.straight.s6._f1', 18, 'Talia\'s face is full and satisfied. The jig is taking mass.');
face('body.portrait.straight.s7._f1', 18, 'Talia\'s face is a small readout moon. Hardware thriving.');
face('body.portrait.straight.s9._f1', 18, 'Talia\'s face is present above the sit. Dual intake still on.');
face('body.portrait.straight.s11._f1', 18, 'Talia\'s face is weather. Both systems powered. Standing closed.');

face('body.portrait.apple.s1._f1', 5, 'Destiny\'s face is still dry and precise. A first hoodie-hidden softness at the cheek.');
face('body.portrait.apple.s3._f1', 5, 'Destiny\'s cheeks have rounded. She shrugs. The hoodie can cope. For now.');
face('body.portrait.apple.s4._f1', 5, 'Destiny\'s face is plump and unbothered. Soft chin, tired mouth, sit becoming the bit.');
face('body.portrait.apple.s6._f1', 5, 'Destiny\'s face is full and done performing surprise. The chair already knows.');
face('body.portrait.apple.s7._f1', 5, 'Destiny\'s face is a small dry moon. Chat can cope.');
face('body.portrait.apple.s9._f1', 5, 'Destiny\'s face is present above the sit. Overlay optional.');
face('body.portrait.apple.s11._f1', 5, 'Destiny\'s face is weather. The chair is the whole show.');

face('body.portrait.athletic.s1._f1', 3, 'Serena\'s face is still race-clean. A first softness she will call recovery.');
face('body.portrait.athletic.s3._f1', 3, 'Serena\'s cheeks have filled. The jaw still looks like a start line.');
face('body.portrait.athletic.s4._f1', 3, 'Serena\'s face is plump and competitive. Soft chin, thick neck starting.');
face('body.portrait.athletic.s6._f1', 3, 'Serena\'s face is full and proud. Recovery became the sport.');
face('body.portrait.athletic.s7._f1', 3, 'Serena\'s face is a small fierce moon. The meet is the sit.');
face('body.portrait.athletic.s9._f1', 3, 'Serena\'s face is proud above the sit. Strength is how she holds still.');
face('body.portrait.athletic.s11._f1', 3, 'Serena\'s face is weather. The clock stopped. She still won.');

// ── leftover bodyType stub stages 1/3/4/6/7/9/11 ──────────────
stub(10, 'rotund', 1, 'Reneé\'s face is still kitchen-awake. A first recipe-softness at the cheek she will taste-test.');
stub(10, 'rotund', 3, 'Reneé\'s cheeks have filled. Flour at the temple. The middle already taking notes.');
stub(10, 'rotund', 4, 'Reneé\'s face is plump and sensory. Soft chin, a cook becoming the batch.');
stub(10, 'rotund', 6, 'Reneé\'s face is full and pleased. Kneaded warmth under the look.');
stub(10, 'rotund', 7, 'Reneé\'s face is a small pleased moon. The kitchen rearranged.');
stub(10, 'rotund', 9, 'Reneé\'s face is calm above the sit. Yield obvious.');
stub(10, 'rotund', 11, 'Reneé\'s face is weather. The plan completed itself.');

stub(11, 'fertility_goddess', 1, 'Kaylee\'s face is still warm attention. A first soft care at the cheek she will call sleep.');
stub(11, 'fertility_goddess', 3, 'Kaylee\'s cheeks have filled. Kind mouth, the holding already starting.');
stub(11, 'fertility_goddess', 4, 'Kaylee\'s face is plump and nurturing. Soft chin, shift-warmth in the eyes.');
stub(11, 'fertility_goddess', 6, 'Kaylee\'s face is full and staying. Care has weight now.');
stub(11, 'fertility_goddess', 7, 'Kaylee\'s face is a small kind moon. She hosts from the chair.');
stub(11, 'fertility_goddess', 9, 'Kaylee\'s face is gentle above the sit. Care stays.');
stub(11, 'fertility_goddess', 11, 'Kaylee\'s face is weather. The nest is the whole shift.');

stub(12, 'voluptuous', 1, 'Nadia\'s face is still evaluation. A first soft variable at the cheek she will name.');
stub(12, 'voluptuous', 3, 'Nadia\'s cheeks have filled. Notebook still open behind the eyes.');
stub(12, 'voluptuous', 4, 'Nadia\'s face is plump and assessing. Soft chin, case study arriving.');
stub(12, 'voluptuous', 6, 'Nadia\'s face is full and pleased with the data. She is the data.');
stub(12, 'voluptuous', 7, 'Nadia\'s face is a small clinical moon. Logging continues.');
stub(12, 'voluptuous', 9, 'Nadia\'s face is present above the sit. Study closed around her.');
stub(12, 'voluptuous', 11, 'Nadia\'s face is weather. The file is the body.');

stub(13, 'mom_bod', 1, 'Daisy\'s face is still cookie-warm. A first snack-softness she will bless.');
stub(13, 'mom_bod', 3, 'Daisy\'s cheeks have filled. Practical mouth, already offering you one.');
stub(13, 'mom_bod', 4, 'Daisy\'s face is plump and settled. Soft chin, kitchen smell, bag optional.');
stub(13, 'mom_bod', 6, 'Daisy\'s face is full and blessing. She feeds the room from the chair.');
stub(13, 'mom_bod', 7, 'Daisy\'s face is a small blessing moon. Nest logic.');
stub(13, 'mom_bod', 9, 'Daisy\'s face is warm above the sit. Snacks travel. She does not.');
stub(13, 'mom_bod', 11, 'Daisy\'s face is weather. The nest is permanent.');
