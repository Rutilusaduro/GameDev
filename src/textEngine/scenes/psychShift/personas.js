// The Squad — Lead: A2 Psych | Support: A5 Editor
// Per-girl corruption-shift interior beats — 6-line arc mined across tiers.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;

registerModuleVariants('shift.interior', [
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany stops calling it a setback. The scoreboard still works — different sport.',
    'Winning used to mean smaller. She is rearranging the definition without shame now.',
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    'The argument is over. She wanted more. She is getting more. That is victory.',
    'Shame left the building. Appetite has the keys.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Madeline files the warmth under new taxonomy. The old categories no longer fit.',
    'The dataset includes feelings she did not predict. She keeps collecting.',
  ]},
  { when: { studentId: 1, corruption: [2] }, weight: W, text: [
    'Hypothesis upgraded to conclusion. She is the result she meant to study.',
    'The interior is quiet — the quiet of a lab after a successful run.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie stops performing denial for an audience of one. The audience is her now.',
    'Relatability was a costume. Softness fits better.',
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    'She is the brand. The brand is vast. Engagement: personal.',
    'Content and body align. No filter required.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya does not name it. She draws it instead — curves where lines used to be.',
    'The notebook gets quieter. The body gets louder. She listens.',
  ]},
  { when: { studentId: 8, corruption: [2] }, weight: W, text: [
    'She looks at herself the way she looks at finished work — long, still, pleased.',
    'Wanting is no longer a secret sketch in the margin. It is the whole page.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé tastes the shift the way she tastes reduction — slow, rich, inevitable.',
    'Appetite was always professional. Now it is personal too.',
  ]},
  { when: { studentId: 10, corruption: [2] }, weight: W, text: [
    'She is the meal and the chef. The metaphor stopped being metaphor.',
    'Fullness is craft. She is mastering it.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia updates the dynamic in her head. Subject: her. Observer: you. Results: interesting.',
    'Shame was a control variable. She removed it from the study.',
  ]},
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    'She wanted to be watched gaining. She is. The experiment is a success.',
    'The interior voice sounds like certainty wearing a smirk.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith\'s stillness deepens. Amusement does not leave. It settles.',
    'She does not explain the shift. She lets you feel it.',
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    'Predator logic: more mass, more gravity, more truth. She approves.',
    'The old hunger was a sketch. This is the finished thing.',
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena stops treating softness as off-season. Her body is in year-round training.',
    'The interior argument quiets. Appetite keeps reps.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona keeps the new curves on the page. Erasure is over.',
    'She feels the shift like color deepening — slow, irreversible, right.',
  ]},
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny stops apologizing for appetite. Hunger stays front and center.',
    'Offline appetite is honest appetite. She prefers offline.',
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    'Tiffany stops apologizing to the mirror. Chapter standards were always flexible.',
    'She likes the new silhouette. Bubblegum covers it. She knows.',
  ]},
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    'Priya stops scheduling guilt. Eating stays on the calendar.',
    'The planner has a new priority flag. She obeys it.',
  ]},
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    'Chloé names the shift in French first, English second. Both mean appetite.',
    'Scandal becomes appetite becomes fact. She sips wine mentally.',
  ]},
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    'Kaylee charts shame down, warmth up. Clinical, accurate, relieved.',
    'Self-care now includes wanting seconds. She prescribes it.',
  ]},
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    'Mary Jane feels the shift like bread proofing — patient, warm, inevitable.',
    'Harvest logic applies inward. She is not stingy with herself anymore.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia updates the trial notes. Side effect: pleasure. Severity: mild. Acceptable.',
    'Anxiety thins. Wanting does not.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia stops arguing with the numbers. Appetite wins the model.',
    'The model converges on softness. She does not interrupt training.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy feels the shift like bread rising in a warm kitchen — patient, sure, fed.',
    'She stops apologizing to her own appetite. Bless her heart.',
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    'Indiana charts the inner shift like a newly opened wing of ruins — vast, interesting, hers.',
    'The map inside matches the map outside. Both expanding.',
  ]},
]);

registerModuleVariants('shift.physical', [
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena\'s hand rests on her middle without the old flinch. Athlete\'s discipline redirected.',
    'Her body sways when she stops. She does not correct it anymore.',
  ]},
  { when: { studentId: 6, corruption: [2] }, weight: W, text: [
    'Tiffany smooths pastel over abundance and smiles. The fabric lost. She won.',
    'Her hips settle into every chair like they belong. They do.',
  ]},
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    'Chloé\'s belly leads the room now. She lets it. Silk was always a suggestion.',
    'She breathes around fullness like a woman tasting wine — slow, appreciative, done apologizing.',
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    'Mary Jane pats her own softness with farm-girl pride. Harvest keeps coming.',
    'Her body moves like summer — heavy, warm, impossible to rush.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia presses palm to belly and reads the feedback. Output exceeds target. Acceptable.',
    'The prototype body reports success. She does not roll back.',
  ]},
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany feels mass shift when she turns. She does not tighten. She expands.',
    'Her palm rests on hip like a trophy shelf.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Madeline breathes around fullness without apologizing to the data.',
    'Her middle softens against the desk. She leans in.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie sways to the mirror and approves the shot unposted.',
    'Her belly meets fabric honestly. She does not suck in.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona traces the curve at her side like ink finding its line.',
    'Warmth pools low when she sits. She sits longer.',
  ]},
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny shifts weight in the chair. The chair creaks. She stays.',
    'Hoodie rides up. She treats it as UI, not error.',
  ]},
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    'Priya exhales into fullness and keeps eating.',
    'Her waistband imprints. She does not smooth it away.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya touches her middle once, briefly, like signing her work.',
    'Softness is present. She stops hiding the signature.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé pats her belly after tasting. Chef\'s approval. Dish approved.',
    'Warmth spreads and stays. She savors the staying.',
  ]},
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    'Kaylee rests hand on middle — vitals good, fullness good.',
    'She breathes around capacity like it is medicine. It is.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia opens posture under your gaze. Mass included.',
    'Fullness proves the hypothesis. Her body is the chart.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy pats her belly with southern warmth. Seconds were love.',
    'The chair remembers. She does not get up quickly.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith settles heavier. Satisfaction without sound.',
    'Mass increases. Stillness deepens. Both intended.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia loosens her coat button around fullness. Hands steadier.',
    'Her middle presses forward. She does not retreat.',
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    'Indiana feels gear dig and smiles. Explorer softer, provisions ample.',
    'Her footprint widens. The map grows with it.',
  ]},
]);

registerModuleVariants('shift.coda', [
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny is already thinking about the next meal. The week rolls forward.',
    'The week rolls forward. Fullness is baseline now.',
  ]},
  { when: { studentId: 7, corruption: [2] }, weight: W, text: [
    'Priya updates the planner. Goal: larger. Status: on track. Next: dinner.',
    'Optimization complete for today. Tomorrow will exceed it.',
  ]},
  { when: { studentId: 11, corruption: [2] }, weight: W, text: [
    'Kaylee exhales, hand on belly, calm as triage after a good shift. "Healthy appetite."',
    'She tucks the old shame away like a chart she no longer needs.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy hums while fullness settles. Bless her heart, she is still hungry for kindness.',
    'The week ends warm. She ends warmer.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia logs the shift with trembling precision. Variable: shame. Value: declining.',
    'The formulation holds. So does she — softer, fuller, still standing.',
  ]},
  { when: { studentId: 17, corruption: [2] }, weight: W, text: [
    'Indiana marks the week on her map. X marks the spot. She is the spot.',
    'Another landmark logged. The expedition continues inward.',
  ]},
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany rolls forward into the week broader and unashamed.',
    'New baseline logged. She is still captain.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Madeline closes the notebook on shame. Opens it on appetite.',
    'Continuing study. Subject: satisfied.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie schedules snacks before content. Priorities clarified.',
    'The week ends soft. She ends softer.',
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena treats the shift like a training block. Completed. Next load.',
    'Appetite is part of the program now.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona sketches the week as curves. The page is full. She is pleased.',
    'Color deepens. So does she.',
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    'Tiffany texts the group chat a selfie and a wink. Standards updated.',
    'Pastel week. Plush results.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya closes the journal on denial. Opens it on appetite.',
    'Quiet week. Loud fullness.',
  ]},
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    'Chloé ends the week wine-warm and fuller. C\'est la vie, enlarged.',
    'Portions continue. So does she.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé clears the table like a final course. Belly: satisfied. Week: complete.',
    'Kitchen closed. Appetite open.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia closes the field notes. Conclusion: she wanted this.',
    'The dynamic holds into next week.',
  ]},
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    'Mary Jane hums into the weekend fuller and sunnier.',
    'Harvest week. Personal yield: excellent.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith ends the week stiller, heavier, amused.',
    'Silence carries forward. So does mass.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia accepts the change and plans the next meal. More.',
    'Next sprint: more.',
  ]},
]);
