// The Squad — Lead: A2 Psych | Support: A5 Editor
// Per-resident corruption-shift interior beats — 6-line arc mined across tiers.
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;

registerModuleVariants('shift.interior', [
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany stops calling it a setback. The scoreboard still works — different sport.',
    'Winning used to mean smaller. She is rearranging the definition without shame now.',
    'The pep talk she gives herself now ends with seconds.',
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    'The argument is over. She wanted more. She is getting more. Victory, quiet and warm.',
    'Shame left the building. Appetite has the keys.',
    'Captain of a new league: heavier, happier, still in charge.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Cassidy files the warmth under new taxonomy. The old categories no longer fit.',
    'The dataset includes feelings she did not predict. She keeps collecting.',
    'Correlation with pleasure: statistically significant. She accepts the p-value.',
  ]},
  { when: { studentId: 1, corruption: [2] }, weight: W, text: [
    'Hyposeason plan upgraded to conclusion. She is the result she meant to study.',
    'The interior is quiet — the quiet of a lab after a successful run.',
    'Peer review would be jealous. She publishes nothing. She eats.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie stops performing denial for an audience of one. The audience is her now.',
    'Relatability was a costume. Softness fits better.',
    'The caption she does not post: finally honest.',
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    'She is the brand. The brand is vast. Engagement: personal.',
    'Content and body align. No filter required.',
    'Followers can wait. Fullness is live.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya does not name it. She draws it instead — curves where lines used to be.',
    'The notebook gets quieter. The body gets louder. She listens.',
    'Wanting shows up in charcoal before it shows up in words.',
  ]},
  { when: { studentId: 8, corruption: [2] }, weight: W, text: [
    'She looks at herself the way she looks at finished work — long, still, pleased.',
    'Wanting is no longer a secret sketch in the margin. It is the whole page.',
    'The exhibit is her. Admission: appetite.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé tastes the shift the way she tastes reduction — slow, rich, inevitable.',
    'Appetite was always professional. Now it is personal too.',
    'The kitchen voice in her head says more. She obeys.',
  ]},
  { when: { studentId: 10, corruption: [2] }, weight: W, text: [
    'She is the meal and the chef. The metaphor stopped being metaphor.',
    'Fullness is craft. She is mastering it.',
    'Seconds are not indulgence. They are technique.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia updates the dynamic in her head. Subject: her. Observer: you. Results: interesting.',
    'Shame was a control variable. She removed it from the hall log.',
    'The hypothesis now includes wanting to be watched eating.',
  ]},
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    'She wanted to be watched gaining. She is. The experiment is a success.',
    'The interior voice sounds like certainty wearing a smirk.',
    'Replication encouraged. She plans to exceed prior results.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith\'s stillness deepens. Amusement does not leave. It settles.',
    'She does not explain the shift. She lets you feel it.',
    'Patience was always predatory. Now it has mass.',
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    'Predator logic: more mass, more gravity, more truth. She approves.',
    'The old hunger was a sketch. This is the finished thing.',
    'Stillness at this size is its own threat. She enjoys that.',
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena stops treating softness as off-season. Her body is in year-round training.',
    'The interior argument quiets. Appetite keeps reps.',
    'Discipline redirected: feed the muscle, feed the belly.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona keeps the new curves on the page. Erasure is over.',
    'She feels the shift like color deepening — slow, irreversible, right.',
    'The composition chose her. She stopped resisting the brush.',
  ]},
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny stops apologizing for appetite. Hunger stays front and center.',
    'Offline appetite is honest appetite. She prefers offline.',
    'Chat can wait. The plate cannot.',
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    'Tiffany stops apologizing to the mirror. Chapter standards were always flexible.',
    'She likes the new silhouette. Bubblegum covers it. She knows.',
    'Sorority cute and plush — she claims both.',
  ]},
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    'Priya stops scheduling guilt. Eating stays on the calendar.',
    'The planner has a new priority flag. She obeys it.',
    'Efficiency includes pleasure now. She optimizes accordingly.',
  ]},
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    'Chloé names the shift in French first, English second. Both mean appetite.',
    'Scandal becomes appetite becomes fact. She sips wine mentally.',
    'C\'est la vie — enlarged, unapologetic, delicious.',
  ]},
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    'Kaylee charts shame down, warmth up. Clinical, accurate, relieved.',
    'Self-care now includes wanting seconds. She prescribes it.',
    'Vitals stable. Appetite elevated. She signs off.',
  ]},
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    'Mary Jane feels the shift like bread proofing — patient, warm, inevitable.',
    'Harvest logic applies inward. She is not stingy with herself anymore.',
    'The oven timer is her belly. It keeps ringing.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia updates the trial notes. Side effect: pleasure. Severity: mild. Acceptable.',
    'Anxiety thins. Wanting does not.',
    'The literature did not warn her. She is not complaining.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia stops arguing with the numbers. Appetite wins the model.',
    'The model converges on softness. She does not interrupt training.',
    'Loss function: minimized shame. Accuracy: improving.',
  ]},
  { when: { studentId: 18, corruption: [1] }, weight: W, text: [
    'Talia stops arguing with the numbers. Appetite wins the model.',
    'The model converges on softness. She does not interrupt training.',
    'Loss function: minimized shame. Accuracy: improving.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy feels the shift like bread rising in a warm kitchen — patient, sure, fed.',
    'She stops apologizing to her own appetite. Bless her heart.',
    'Southern hospitality starts at home — she feeds herself first now.',
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    'Indiana charts the inner shift like a newly opened wing of ruins — vast, interesting, hers.',
    'The map inside matches the map outside. Both expanding.',
    'Every new pound is a room she did not know she owned.',
  ]},
]);

registerModuleVariants('shift.physical', [
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena\'s hand rests on her middle without the old flinch. Athlete\'s discipline redirected.',
    'Her body sways when she stops. She does not correct it anymore.',
    'Warmth pools where muscle used to be taut. She lets it.',
  ]},
  { when: { studentId: 6, corruption: [2] }, weight: W, text: [
    'Tiffany smooths pastel over abundance and smiles. The fabric lost. She won.',
    'Her hips settle into every chair like they belong. They do.',
    'Bubblegum pink over plush curves — aesthetic achieved.',
  ]},
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    'Chloé\'s belly leads the room now. She lets it. Silk was always a suggestion.',
    'She breathes around fullness like a woman tasting wine — slow, appreciative, done apologizing.',
    'The waistband surrendered weeks ago. She considers that progress.',
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    'Mary Jane pats her own softness with farm-girl pride. Harvest keeps coming.',
    'Her body moves like summer — heavy, warm, impossible to rush.',
    'Apron strings would not reach. She does not mind.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia presses palm to belly and reads the feedback. Output exceeds target. Acceptable.',
    'The prototype body reports success. She does not roll back.',
    'Sensor array: soft, warm, expanding. All green.',
  ]},
  { when: { studentId: 18, corruption: [1] }, weight: W, text: [
    'Talia presses palm to belly and reads the feedback. Output exceeds target. Acceptable.',
    'The prototype body reports success. She does not roll back.',
    'Sensor array: soft, warm, expanding. All green.',
  ]},
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany feels mass shift when she turns. She does not tighten. She expands.',
    'Her palm rests on hip like a trophy shelf.',
    'The uniform strains. She wears the strain like a medal.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Cassidy breathes around fullness without apologizing to the data.',
    'Her middle softens against the desk. She leans in.',
    'The chair creaks. She notes the creak. She stays seated.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie sways to the mirror and approves the shot unposted.',
    'Her belly meets fabric honestly. She does not suck in.',
    'Ring light off. Body on. Still photogenic.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona traces the curve at her side like ink finding its line.',
    'Warmth pools low when she sits. She sits longer.',
    'Paint-stained fingers follow the new contour. Satisfied.',
  ]},
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny shifts weight in the chair. The chair creaks. She stays.',
    'Hoodie rides up. She treats it as UI, not error.',
    'Controller in one hand, snack in the other. Balance achieved.',
  ]},
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    'Priya exhales into fullness and keeps eating.',
    'Her waistband imprints. She does not smooth it away.',
    'Spreadsheet open, plate fuller. Multitasking perfected.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya touches her middle once, briefly, like signing her work.',
    'Softness is present. She stops hiding the signature.',
    'Charcoal on fingers, curve under palm. Evidence.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé pats her belly after tasting. Chef\'s approval. Dish approved.',
    'Warmth spreads and stays. She savors the staying.',
    'Apron bowed outward. She ties it looser and keeps cooking.',
  ]},
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    'Kaylee rests hand on middle — vitals good, fullness good.',
    'She breathes around capacity like it is medicine. It is.',
    'Scrubs stretch. She buys the next size without drama.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia opens posture under your gaze. Mass included.',
    'Fullness proves the hypothesis. Her body is the chart.',
    'She angles herself for better observation. Deliberate.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy pats her belly with southern warmth. Seconds were love.',
    'The chair remembers. She does not get up quickly.',
    'Bless her heart, she jiggles when she laughs now. She laughs more.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith settles heavier. Satisfaction without sound.',
    'Mass increases. Stillness deepens. Both intended.',
    'Gravity answers to her now. She enjoys the obedience.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia loosens her coat button around fullness. Hands steadier.',
    'Her middle presses forward. She does not retreat.',
    'Lab coat strains. She schedules a larger size. Science continues.',
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    'Indiana feels gear dig and smiles. Explorer softer, provisions ample.',
    'Her footprint widens. The map grows with it.',
    'Bootlaces strain. She packs more snacks. Expedition rules.',
  ]},
]);

registerModuleVariants('shift.coda', [
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    'Destiny is already thinking about the next meal. The week rolls forward.',
    'The week rolls forward. Fullness is baseline now.',
    'Save file: satisfied. Next quest: dinner.',
  ]},
  { when: { studentId: 7, corruption: [2] }, weight: W, text: [
    'Priya updates the planner. Goal: larger. Status: on track. Next: dinner.',
    'Optimization complete for today. Tomorrow will exceed it.',
    'KPI met. Appetite trending up. She schedules accordingly.',
  ]},
  { when: { studentId: 11, corruption: [2] }, weight: W, text: [
    'Kaylee exhales, hand on belly, calm as triage after a good shift. "Healthy appetite."',
    'She tucks the old shame away like a chart she no longer needs.',
    'Discharge papers: full, content, hungry again by morning.',
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    'Daisy hums while fullness settles. Bless her heart, she is still hungry for kindness.',
    'The week ends warm. She ends warmer.',
    'Sunday supper starts with herself. She approves.',
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    'Sophia logs the shift with trembling precision. Variable: shame. Value: declining.',
    'The formulation holds. So does she — softer, fuller, still standing.',
    'Week closed. Side effects: pleasant. Continue trial.',
  ]},
  { when: { studentId: 17, corruption: [2] }, weight: W, text: [
    'Indiana marks the week on her map. X marks the spot. She is the spot.',
    'Another landmark logged. The expedition continues inward.',
    'Terrain: softer. Supplies: ample. Route: more.',
  ]},
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    'Brittany rolls forward into the week broader and unashamed.',
    'New baseline logged. She is still captain.',
    'Team morale: high. Waistline: higher. She calls it winning.',
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    'Cassidy closes the notebook on shame. Opens it on appetite.',
    'Continuing study. Subject: satisfied.',
    'Next chapter: replication with larger sample — herself.',
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    'Kylie schedules snacks before content. Priorities clarified.',
    'The week ends soft. She ends softer.',
    'Engagement metrics can wait. Fullness posts itself.',
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    'Serena treats the shift like a training block. Completed. Next load.',
    'Appetite is part of the program now.',
    'Recovery day: cancelled. Feeding day: extended.',
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    'Fiona sketches the week as curves. The page is full. She is pleased.',
    'Color deepens. So does she.',
    'Studio closes. Appetite stays open.',
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    'Tiffany texts the group chat a selfie and a wink. Standards updated.',
    'Pastel week. Plush results.',
    'Rush chair approves. Mirror approves louder.',
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    'Maya closes the journal on denial. Opens it on appetite.',
    'Quiet week. Loud fullness.',
    'Ink dries. Belly does not.',
  ]},
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    'Chloé ends the week wine-warm and fuller. C\'est la vie, enlarged.',
    'Portions continue. So does she.',
    'Bon appétit — to herself, without irony.',
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    'Reneé clears the table like a final course. Belly: satisfied. Week: complete.',
    'Kitchen closed. Appetite open.',
    'Menu for tomorrow: more of everything.',
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    'Nadia closes the field notes. Conclusion: she wanted this.',
    'The dynamic holds into next week.',
    'Further observation required. She volunteers.',
  ]},
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    'Mary Jane hums into the weekend fuller and sunnier.',
    'Harvest week. Personal yield: excellent.',
    'Pantry restocked — starting with her.',
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    'Lilith ends the week stiller, heavier, amused.',
    'Silence carries forward. So does mass.',
    'Prey would not recognize her. She prefers that.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [1] }, weight: W, text: [
    'Talia accepts the change and plans the next meal. More.',
    'Next sprint: more.',
    'Deploy to production: this body. No rollback.',
  ]},
  { when: { studentId: 18, corruption: [1] }, weight: W, text: [
    'Talia accepts the change and plans the next meal. More.',
    'Next sprint: more.',
    'Deploy to production: this body. No rollback.',
  ]},
]);
