// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// Per-resident eating voice — studentId-keyed persona lines.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('eat.firstBite', [
  { when: { studentId: 0 }, weight: 4, text: [
    'Brittany logs the first bite like data — portion, macro, intention. Then she takes it.',
    'She treats the opening bite as warm-up. The meal is training.',
    'The first forkful is discipline. The second is already less disciplined.',
  ] },
  { when: { studentId: 1 }, weight: 4, text: [
    'Cassidy notes the first bite in her head — time, portion, set number — and eats anyway.',
    'The opening mouthful is rep one. The pace is clear by bite three.',
    'She rolls her shoulders like pre-lane ritual and begins. Discipline and appetite run in parallel.',
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    'Kylie films the first bite. "Content," she says, mouth full. "Authentic."',
    'The first bite is performance. The second is already honest.',
    'She angles the fork for light. Hunger does not wait for the perfect shot.',
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    'Serena eats like it is fuel — efficient, committed, already thinking about the next plate.',
    'First bite: ignition. She does not idle long.',
    'Athlete appetite — the fork moves like a starting gun.',
  ] },
  { when: { studentId: 4 }, weight: 4, text: [
    'Fiona closes her eyes on the first bite — color, texture, warmth cataloged.',
    'The opening mouthful is a sketch. She will finish the painting.',
    'She savors slowly, then forgets to savor and simply eats.',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny eats the first bite without looking away from her screen.',
    'The opening mouthful goes down while her attention stays on the chat.',
    'She eats like someone refueling between rounds — quick, committed, already reaching again.',
  ] },
  { when: { studentId: 6 }, weight: 4, text: [
    'Tiffany takes the first bite mid-sentence about rush week. The sentence continues. The plate empties.',
    'First bite is social. Second is strategic. Third is sincere.',
    'She laughs with her mouth full. Chapter sisters do not apologize for appetite.',
  ] },
  { when: { studentId: 7 }, weight: 4, text: [
    'Priya eats the first bite between planner entries. Multitasking includes calories now.',
    'The opening forkful is scheduled between two deadlines. Both slip.',
    'She meant to taste. She meant to stop. The fork disagrees.',
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya eats. No commentary. The first bite is simply the first bite.',
    'She takes food the way she takes everything — quietly, completely.',
    'The first mouthful disappears. So does the second. She does not announce either.',
  ] },
  { when: { studentId: 9 }, weight: 4, text: [
    'Chloé tastes the first bite like wine — slow, scandalized, approving.',
    'American portions begin with a single forkful. She already plans the sequel.',
    'The first bite is amused. The second is committed.',
  ] },
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé tastes the first bite the way she tastes wine — eyes closed, cataloging notes.',
    'The first forkful is an evaluation. She approves, and the meal officially begins.',
    'Flavor map: excellent. She opens her eyes and accelerates.',
  ] },
  { when: { studentId: 11 }, weight: 4, text: [
    'Kaylee calls it "aggressive self-care" and takes the first bite like following protocol.',
    'The first mouthful is caloric intake, medically justified. She is very calm about this.',
    'Vitals stable. Appetite engaged. Proceeding.',
  ] },
  { when: { studentId: 12 }, weight: 4, text: [
    'Nadia notes the first bite in her notebook without looking up. "Baseline established."',
    'She eats while watching who watches her eat. The first bite is both data and bait.',
    'Opening mouthful logged. Field study continues.',
  ] },
  { when: { studentId: 13 }, weight: 4, text: [
    'Daisy takes the first bite like offering communion — warm, unhurried, generous.',
    'The opening forkful is kindness to herself. There will be more kindness.',
    'Bless this food, she thinks, and takes another.',
  ] },
  { when: { studentId: 14 }, weight: 4, text: [
    'Mary Jane digs in with farm-table enthusiasm. The first bite is never small.',
    'Opening mouthful: honest country appetite. Seconds follow like sunrise.',
    'She hums around the first taste. The plate does not stand a chance.',
  ] },
  { when: { studentId: 15 }, weight: 4, text: [
    'Lilith watches you while she eats the first bite. Portions are not discussed.',
    'The first bite happens while her attention stays on you. She simply continues.',
    'She eats without explaining hunger. The fork is the only narrative.',
  ] },
  { when: { studentId: 16 }, weight: 4, text: [
    'Sophia measures the first bite twice, eats once, anxiety and appetite tied.',
    'The opening mouthful is logged mentally. Side effects: fullness, acceptable.',
    'She eats like a trial participant. The trial is going well.',
  ] },
  { when: { studentId: 17 }, weight: 4, text: [
    'Indiana eats the first bite like trail rations at a dig — quick, satisfied, already scouting seconds.',
    'Opening mouthful: fuel for the expedition. The expedition is lunch.',
    'She grins around the first taste. Provisions: adequate. Morale: rising.',
  ] },
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    'Talia eats the first bite while calculating efficiency. Efficiency loses to flavor.',
    'Opening input registered. Output: pleasure. Acceptable variance.',
    'The prototype mouthful succeeds. She iterates immediately.',
  ] },
]);

registerModuleVariants('eat.finish', [
  { when: { studentId: 0 }, weight: 4, text: [
    'Brittany finishes and logs the total. "Good session," she says, like the gym.',
    'Plate empty. Stats updated. She is already eyeing dessert.',
    'Recovery meal complete. Personal record pending sweets.',
  ] },
  { when: { studentId: 1 }, weight: 4, text: [
    'Cassidy sets the fork down and updates the mental training log. Intake: substantial.',
    'The meal concludes. The weekly curve bends again. She logs it without panic.',
    'Set complete: satisfied. She closes the old season plan on shame.',
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie licks her fork for the camera. "That's a wrap," she says. "Until snacks."`,
    'Empty plate, full belly, content banked. She checks the angle one last time.',
    'Post rolls to stories. Belly rolls first.',
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    'Serena finishes clean. "Recovery meal," she says, already hungry for the next one.',
    'The plate is a finish line. She crosses it every time.',
    'Fuel cycle complete. Next loading window already open.',
  ] },
  { when: { studentId: 4 }, weight: 4, text: [
    'Fiona sets the fork down gently, like signing a canvas. The meal is complete.',
    'She exhales, hand drifting to her middle. Satisfied in colors she cannot name.',
    'The painting is fed. Warmth pools where brushstrokes used to be flat.',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny finishes and glances at the empty plate like a cleared objective.',
    'Full enough to queue the next episode. Snacks already in mind.',
    'Quest complete. Side quest: raid the fridge.',
  ] },
  { when: { studentId: 6 }, weight: 4, text: [
    'Tiffany finishes with a bubbly sigh. "Dessert?" she asks, already answering yes.',
    'Empty plate, social calories burned and banked. Chapter business concluded.',
    'Plate cleared. Bubblegum pop, belly pat, zero regret.',
  ] },
  { when: { studentId: 7 }, weight: 4, text: [
    'Priya finishes on schedule — late, over target, documented. She closes the planner anyway.',
    'The meal ends. The metric exceeded projection. She will adjust tomorrow. Probably.',
    'Actuals beat forecast. She will not revise the numbers down.',
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    'Maya is done. She was done before you noticed she was eating.',
    'The plate is empty. She says nothing. Her hand rests on her middle briefly.',
    'Finished. No caption. Warmth enough.',
  ] },
  { when: { studentId: 9 }, weight: 4, text: [
    'Chloé finishes with a satisfied hum. "American dining," she says, "is an education."',
    'Empty plate, fuller body, amusement intact. She orders coffee and does not refuse pastry.',
    'Fin. Wine ordered. Something sweet already incoming.',
  ] },
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé sets the fork down with the satisfaction of a course completed. "The finish is clean."',
    'She pats her middle once, chef\'s approval. Kitchen closed. Belly open.',
    'Course cleared. The kitchen hums approval in her ribs.',
  ] },
  { when: { studentId: 11 }, weight: 4, text: [
    'Kaylee finishes and exhales clinically. "Intake adequate. Self-care: aggressive, successful."',
    'The plate is empty. She checks her fullness like a vital sign. Stable. High.',
    'Intake logged. Fullness robust. Shame absent.',
  ] },
  { when: { studentId: 12 }, weight: 4, text: [
    'Nadia closes her notebook on an empty plate. "Conclusion: appetite confirmed."',
    'She finishes watching you watch her finish. The dynamic holds.',
    'Trial segment complete. Replication encouraged.',
  ] },
  { when: { studentId: 13 }, weight: 4, text: [
    'Daisy finishes with a warm pat to her belly. "Bless it, that hit the spot, honey."',
    'Empty plate, fuller figure, zero regret. She starts thinking about what\'s for dessert.',
    'Lord, that was good. Seconds later, bless her heart.',
  ] },
  { when: { studentId: 14 }, weight: 4, text: [
    'Mary Jane finishes and leans back, sunnier and softer. "Y\'all got any pie?"',
    'The plate is history. She is already eyeing yours.',
    'Well fed. Pie inquiry still stands.',
  ] },
  { when: { studentId: 15 }, weight: 4, text: [
    'Lilith finishes. She does not explain how much she ate. She never does.',
    'Empty plate, steady gaze. Hunger satisfied. Conversation optional.',
    'Finished. The silence says enough.',
  ] },
  { when: { studentId: 16 }, weight: 4, text: [
    'Sophia finishes with trembling precision. "Trial complete. Fullness within… acceptable parameters."',
    'She logs the meal mentally and loosens her lab coat button. One data point richer.',
    'Dose administered. Subject content. Continue protocol.',
  ] },
  { when: { studentId: 17 }, weight: 4, text: [
    'Indiana finishes and wipes her mouth like closing a field journal. "Provisions secured."',
    'Empty plate, fuller pack weight. She is ready for the next dig — or the next course.',
    'Field rations depleted. Morale: high.',
  ] },
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    'Talia finishes and updates the model. "Output: satisfied. Recommend repeat trial."',
    'Plate empty, belly fuller, hypothesis supported. She queues seconds in her head.',
    'Intake complete. Variance acceptable. She is already planning the next meal.',
  ] },
  { when: { studentId: 18 }, weight: 4, text: [
    'Talia finishes and updates the model. "Output: satisfied. Recommend repeat trial."',
    'Plate empty, belly fuller, hypothesis supported. She queues seconds in her head.',
    'Intake complete. Variance acceptable. She is already planning the next meal.',
  ] },
]);
