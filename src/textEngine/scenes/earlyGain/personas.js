// The Squad — Lead: A6 Slender | Support: A2 Psych, A5 Editor
// Per-girl early-game voice — extends slender.* pools via registerModuleVariants.
// Key: studentId + corruption [0] + stageMax 4 + gainStance where applicable.
// Roster: AUTHORING.md §3 (ids 0–18).
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;
const EARLY = { corruption: [0], stageMax: 4 };

registerModuleVariants('slender.bodyFeel', [
  { when: { studentId: 0, ...EARLY }, weight: W, text: [
    'Brittany still feels fast on her feet — until she sits and the chair argues.',
    'Competition muscle softening at the edges; she flexes and feels plush where tone used to be.',
  ]},
  { when: { studentId: 2, ...EARLY }, weight: W, text: [
    'Kylie feels the curve when she turns for a thumbnail angle — content, body, same problem.',
    'Her waistband resists after lunch; she smooths her crop top and keeps filming.',
  ]},
  { when: { studentId: 5, ...EARLY }, weight: W, text: [
    'Destiny feels heavier after off-stream binges — soft, warm, logged in a private folder.',
    'Her hoodie still fits. The fit is informational: softness pooling at belly and hip.',
  ]},
  { when: { studentId: 8, ...EARLY }, weight: W, text: [
    'Maya feels fullness settle slow — a quiet weight low in her belly she does not name.',
    'Her thighs brush when she walks to class; the sensation is new and oddly grounding.',
  ]},
  { when: { studentId: 10, ...EARLY }, weight: W, text: [
    'Reneé feels each course in her middle — warmth, swell, the pleasant drag of a full belly.',
    'Her hand rests on her hip after tasting; the hip is rounder than last month.',
  ]},
  { when: { studentId: 12, ...EARLY }, weight: W, text: [
    'Nadia feels you watching her soften and catalogs the heat in her cheeks.',
    'Softness gathers at her waist; she presses there once, privately, and says nothing.',
  ]},
  { when: { studentId: 14, ...EARLY }, weight: W, text: [
    'Mary Jane feels abundance in her hips when she walks — farm-girl sway, unhurried, real.',
    'Fullness after jam tasting sits warm in her belly; she pats it like a satisfied harvest.',
  ]},
  { when: { studentId: 15, ...EARLY }, weight: W, text: [
    'Lilith feels mass settle with unnerving calm — as if her body always meant to thicken.',
    'Softness at her thigh and belly arrives without alarm. She does not flinch from it.',
  ]},
]);

registerModuleVariants('slender.mindFeel', [
  // ── 0 Brittany ───────────────────────────────────────────────
  { when: { studentId: 0, ...EARLY }, weight: W, text: [
    'She still thinks of her body as a scoreboard. The numbers are climbing in a direction she has not named yet.',
    'Winning used to mean smaller. She is rearranging the definition without admitting it.',
  ]},
  // ── 1 Madeline ───────────────────────────────────────────────
  { when: { studentId: 1, ...EARLY }, weight: W, text: [
    'She has started a private dataset. The trend line is not cooperating with her hypotheses.',
    'Every softening inch feels like a footnote she will have to address eventually.',
  ]},
  // ── 2 Kylie ──────────────────────────────────────────────────
  { when: { studentId: 2, ...EARLY }, weight: W, text: [
    'She frames the softness as relatable before she has decided if she believes it.',
    'The mirror is content now. She is still deciding if she is the audience.',
  ]},
  // ── 3 Serena ─────────────────────────────────────────────────
  { when: { studentId: 3, ...EARLY }, weight: W, text: [
    'Her body is adapting to a sport she did not sign up for. She calls it cross-training in her head.',
    'Discipline without a finish line — she is not sure she wants one anymore.',
  ]},
  // ── 4 Fiona ──────────────────────────────────────────────────
  { when: { studentId: 4, ...EARLY }, weight: W, text: [
    'She sees the rounding as composition — negative space filling in, slowly, on purpose or not.',
    'The canvas is changing. She is too interested to look away.',
  ]},
  // ── 5 Destiny ────────────────────────────────────────────────
  { when: { studentId: 5, ...EARLY }, weight: W, text: [
    'Her hoodie still fits. The fit is informational, not alarming.',
    'Her body updated quietly. She has not filed a complaint.',
  ]},
  // ── 6 Tiffany ────────────────────────────────────────────────
  { when: { studentId: 6, ...EARLY }, weight: W, text: [
    'Chapter standards are flexible. She is testing the elasticity personally.',
    'Pastel still matches. The silhouette underneath is negotiating.',
  ]},
  // ── 7 Priya ──────────────────────────────────────────────────
  { when: { studentId: 7, ...EARLY }, weight: W, text: [
    'The metric is off-trend. She has seventeen explanations and none of them satisfy.',
    'Overperformance was the goal. She did not specify which axis.',
  ]},
  // ── 8 Maya ───────────────────────────────────────────────────
  { when: { studentId: 8, ...EARLY }, weight: W, text: [
    'She notices. She does not comment. The notebook gets a new drawing instead.',
    'Softness accumulates the way she accumulates everything — quietly, completely.',
  ]},
  // ── 9 Chloé ──────────────────────────────────────────────────
  { when: { studentId: 9, ...EARLY }, weight: W, text: [
    'American portions are field research. Her waistband is taking notes.',
    'She treats the gain like a cultural artifact — fascinating, slightly scandalous, not yet admitted.',
  ]},
  // ── 10 Reneé ─────────────────────────────────────────────────
  { when: { studentId: 10, ...EARLY }, weight: W, text: [
    'She catalogs the new softness the way she catalogs flavor — texture, warmth, finish.',
    'Her body is developing notes she did not write down on purpose.',
  ]},
  // ── 11 Kaylee ────────────────────────────────────────────────
  { when: { studentId: 11, ...EARLY }, weight: W, text: [
    'She would chart this if charting did not require admitting she is the patient.',
    'Clinical language helps until it does not. The curve on the graph is hers.',
  ]},
  // ── 12 Nadia ─────────────────────────────────────────────────
  { when: { studentId: 12, ...EARLY }, weight: W, text: [
    'She watches you watch her soften. The dynamic is the most interesting variable.',
    'She has theories about why she is rounding. She is not sharing all of them.',
  ]},
  // ── 13 Daisy ─────────────────────────────────────────────────
  { when: { studentId: 13, ...EARLY }, weight: W, text: [
    'Bless it, she is a little fuller. She has children to feed and herself to tend — same category.',
    'Southern warmth does not require a smaller dress size. She is practical about that.',
  ]},
  // ── 14 Mary Jane ─────────────────────────────────────────────
  { when: { studentId: 14, ...EARLY }, weight: W, text: [
    'Harvest season on a person — slow, generous, nothing wasted.',
    'She carries abundance the way she carries jam jars: openly, with pride she has not named yet.',
  ]},
  // ── 15 Lilith ────────────────────────────────────────────────
  { when: { studentId: 15, ...EARLY }, weight: W, text: [
    'She is stiller than the change warrants. Amusement lives somewhere under the surface.',
    'The softness does not surprise her. She behaves as if she expected it.',
  ]},
  // ── 16 Sophia ────────────────────────────────────────────────
  { when: { studentId: 16, ...EARLY }, weight: W, text: [
    'Wellness research was supposed to be abstract. Her waistband disagrees.',
    'She double-checks the number the way she double-checks formulations — twice, then again.',
  ]},
  // ── 17 Indiana ───────────────────────────────────────────────
  { when: { studentId: 17, ...EARLY }, weight: W, text: [
    'Every pound is a landmark on a map she did not know she was drawing.',
    'The expedition continues. Provisions have been generous.',
  ]},
  // ── 18 Talia ─────────────────────────────────────────────────
  { when: { studentId: 18, custom: false, ...EARLY }, weight: W, text: [
    'Inputs exceeded projections. She is revising the model without announcing it.',
    'Her body keeps outpacing the spreadsheet. She lets it.',
  ]},
]);

registerModuleVariants('slender.deflect', [
  { when: { studentId: 0, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"It's muscle. Or retention. Or both."`,
    `"I'm still in competition shape. The scale doesn't know that."`,
  ]},
  { when: { studentId: 1, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"Within expected variance for semester dietary changes."`,
    `"I'll adjust the variables. This is manageable."`,
  ]},
  { when: { studentId: 3, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Different training load," she says. Not quite a lie.`,
    `"I'm adapting. Athletes adapt."`,
  ]},
  { when: { studentId: 6, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"It's just bloating, babe."`,
    `"Chapter brunch counts as a meal plan, right?"`,
  ]},
  { when: { studentId: 7, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"This is off-schedule."`,
    `"I have a remediation plan. Starting Monday."`,
  ]},
  { when: { studentId: 9, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"American portions," she says dryly. "My mam will have words."`,
    `"It's field research. That is all."`,
  ]},
  { when: { studentId: 11, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"I'm monitoring intake. This is a data anomaly."`,
    `"Stress eating. Clinically normal. Nothing to see."`,
  ]},
  { when: { studentId: 16, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"The scale needs calibration."`,
    `"Hydration status affects mass. I read the literature."`,
  ]},
  { when: { studentId: 18, custom: false, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Margin of error," she mutters.`,
    `"The prototype diet wasn't optimized yet."`,
    `"Sensor drift," she says. "Not mass gain."`,
  ]},
  { when: { studentId: 2, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"It's the camera angle," Kylie says. "And stress. Mostly stress."`,
    `"Bloat content," she mutters. "Not real. Probably."`,
  ]},
  { when: { studentId: 4, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Artist body," Fiona says softly. "It changes. That's… normal."`,
    `"Composition shift," she murmurs. Not quite convinced.`,
  ]},
  { when: { studentId: 8, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"It's fine," Maya says, too quiet. "I'm fine."`,
    `"Sweater weather," she offers. The sweater disagrees.`,
  ]},
  { when: { studentId: 10, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Tasting portions," Reneé says. "Professional hazard."`,
    `"Kitchen samples add up," she admits, cheeks warm.`,
  ]},
  { when: { studentId: 13, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"Bless it, I'm just tired," Daisy says. "Not… bigger."`,
    `"Snacks for the kids," she says. Some stayed with her.`,
  ]},
  { when: { studentId: 14, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Farm appetite," Mary Jane laughs nervously. "Comes with the territory."`,
    `"Jam testing," she says. "Quality control."`,
  ]},
  { when: { studentId: 15, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `Lilith says nothing. The silence argues better than words.`,
    `"Temporary," she says once, without conviction.`,
  ]},
  { when: { studentId: 5, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"Lag spike," Destiny says. "Not mass."`,
    `"Stream lag," Destiny mutters. "Not me."`,
  ]},
  { when: { studentId: 12, gainStance: 'opposed', ...EARLY }, weight: W, text: [
    `"Within normal variance," Nadia says, watching you.`,
    `"Subject error," she murmurs. She is the subject.`,
  ]},
  { when: { studentId: 17, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Trail weight," Indiana says. "Provisions stick."`,
    `"Map says I'm bigger. Map's not wrong."`,
  ]},
]);

registerModuleVariants('slender.neutral', [
  { when: { studentId: 5, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Cool. Next."`,
    `"Logged."`,
  ]},
  { when: { studentId: 8, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Okay."`,
    `"Mm."`,
  ]},
  { when: { studentId: 13, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Well, bless it."`,
    `"That's all right, honey."`,
  ]},
  { when: { studentId: 17, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Noted for the field journal."`,
    `"Could be worse. I've seen worse ruins."`,
  ]},
  { when: { studentId: 0, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"New baseline," she says, like a stat line.`,
    `"Still winning."`,
  ]},
  { when: { studentId: 1, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Recorded."`,
    `"Continuing observation."`,
    `"Within tolerance," she says, already moving on.`,
  ]},
  { when: { studentId: 2, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Content," she says lightly. "Relatable scale moment."`,
    `"Fine. Fine. Next."`,
  ]},
  { when: { studentId: 3, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Different training load," Serena says, shrugging.`,
    `"Still fast," she adds, ambiguous.`,
  ]},
  { when: { studentId: 4, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Canvas changed," Fiona says. "That's all."`,
    `"Notes for later," she murmurs.`,
  ]},
  { when: { studentId: 6, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Chapter brunch counts," Tiffany says, bubbly.`,
    `"Still cute," she decides.`,
  ]},
  { when: { studentId: 7, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Logged," Priya says. "Next task."`,
    `"Variance noted," she says, closing the planner.`,
  ]},
  { when: { studentId: 9, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"American semester," Chloé says dryly. "C'est la vie."`,
    `"Portions happen," she shrugs.`,
  ]},
  { when: { studentId: 10, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Tasting schedule," Reneé says. "Professional."`,
    `"Good ingredients show," she notes.`,
  ]},
  { when: { studentId: 11, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Within normal parameters," Kaylee says calmly.`,
    `"Self-care includes mass," she adds, clinical.`,
  ]},
  { when: { studentId: 12, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Noted," Nadia says, watching your face.`,
    `"Interesting," she murmurs. Not distressed.`,
  ]},
  { when: { studentId: 14, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Harvest happens," Mary Jane says, sunny.`,
    `"Still me," she grins.`,
  ]},
  { when: { studentId: 15, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `Lilith inclines her head. Acknowledgment without commentary.`,
    `"Expected," she says, once.`,
  ]},
  { when: { studentId: 16, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Within study bounds," Sophia says, tense.`,
    `"Documented," she whispers.`,
  ]},
  { when: { studentId: 18, custom: false, gainStance: 'neutral', ...EARLY }, weight: W, text: [
    `"Output nominal," Talia says.`,
    `"Continuing trial," she adds.`,
  ]},
]);

registerModuleVariants('slender.secret', [
  { when: { studentId: 2, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'She checks the angle in the mirror and does not look away fast enough.',
    'Her hand rests on her hip. The content writes itself.',
  ]},
  { when: { studentId: 4, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'She traces the new curve like she is studying brushwork.',
    'The softness pleases her in a way she will not say out loud.',
  ]},
  { when: { studentId: 10, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'She presses her palm to her middle and exhales slowly — tasting the fullness.',
    'The rounding is a recipe finishing in the oven. She is patient.',
  ]},
  { when: { studentId: 12, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'She names the dynamic out loud to herself and smiles anyway.',
    'The gain satisfies a hypothesis she will not publish yet.',
  ]},
  { when: { studentId: 14, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'She pats her hip with farm-girl pride she pretends is absentminded.',
    'Abundance feels correct on her. She will not argue with harvest logic.',
  ]},
  { when: { studentId: 15, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Her stillness sharpens. She is pleased. She does not explain why.',
    'The number rises. She watches you watching. That is enough.',
    'A faint smile. Hunger and mass align. She says nothing.',
  ]},
  { when: { studentId: 1, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Madeline presses palm to softness and exhales data she will not publish yet.',
    'The curve pleases her more than her voice admits.',
  ]},
  { when: { studentId: 3, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Serena flexes, then relaxes into the new give at her thigh. She likes the heaviness.',
    'She checks the mirror twice. Performance and pleasure blur.',
  ]},
  { when: { studentId: 6, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Tiffany smooths pastel over a hip that has outgrown rush standards. She does not mind.',
    'She bites her lip at the number. Bubblegum excuse. Real appetite underneath.',
  ]},
  { when: { studentId: 7, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Priya files the gain under private goals she did not put in the planner.',
    'Her hand rests on her middle a beat too long. Optimization can wait.',
  ]},
  { when: { studentId: 8, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Maya draws the new curve later that night from memory. Accurate. Affectionate.',
    'She touches her waistband in the dorm mirror when the hall is empty.',
  ]},
  { when: { studentId: 9, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Chloé\'s breath catches on the number — scandal and satisfaction braided together.',
    'She blames American butter. Her smile blames nothing.',
  ]},
  { when: { studentId: 11, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Kaylee calls it clinical curiosity while her cheeks flush. The chart lies. She does not.',
    'She weighs herself at home and is not always upset about the result.',
  ]},
  { when: { studentId: 13, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Daisy pats her hip when she thinks no one sees. Southern warmth, private appetite.',
    'She hums while fullness settles. The hum sounds like contentment.',
  ]},
  { when: { studentId: 16, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Sophia exhales shakily at the number — not dismay. Relief wearing anxiety\'s coat.',
    'She locks the bathroom door before stepping on the scale again. Curious, not clinical.',
  ]},
  { when: { studentId: 17, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Indiana maps the new softness like discovered territory. X marks the spot. She is the spot.',
    'She eats stolen dining hall rolls in the stairwell and savors every one.',
  ]},
  { when: { studentId: 18, custom: false, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Talia runs a hand along her side and updates the model with a private smile.',
    'Inputs exceeded projections. She is not correcting the error.',
  ]},
  { when: { studentId: 0, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Brittany checks the curve in the locker mirror and does not look away fast enough.',
    'Winning feels different now. She is not sure she minds.',
  ]},
  { when: { studentId: 5, gainStance: 'secret', ...EARLY }, weight: W, text: [
    'Destiny eats off-stream with focus that would alarm her chat.',
    'She saves the softer screenshots in a private folder. Unposted. Liked.',
  ]},
]);

registerModuleVariants('slender.eatPause', [
  { when: { studentId: 0, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Brittany eats like fueling — portioned, committed, already thinking about the next plate.',
    'Second helping arrives before the first plate is moral history.',
  ]},
  { when: { studentId: 1, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Madeline annotates the meal in her head between bites. The plate empties anyway.',
    'She pauses to record a note. The pause does not slow consumption.',
  ]},
  { when: { studentId: 2, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Kylie eats on camera and off — the off-camera bites are more honest.',
    'She stops filming and starts eating for real. Appetite uncut.',
  ]},
  { when: { studentId: 3, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Serena eats with athlete discipline redirected toward appetite.',
    'Training table rules dissolve halfway through. She keeps going.',
  ]},
  { when: { studentId: 4, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Fiona savors each bite the way she savors color — slowly, reverently.',
    'Reverence gives way to hunger. The plate does not mind.',
  ]},
  { when: { studentId: 5, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Destiny eats one-handed, eyes on the screen until hunger wins.',
    'The plate empties before she looks away from the monitor.',
  ]},
  { when: { studentId: 6, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Tiffany treats the table like chapter business — bubbly, social, second helpings included.',
    'She talks through bites. The talking does not reduce intake.',
  ]},
  { when: { studentId: 7, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Priya eats while reviewing notes. Multitasking includes calories now.',
    'The highlighter caps. The fork does not.',
  ]},
  { when: { studentId: 8, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Maya eats without commentary. The fork does not hesitate.',
    'Quiet appetite — thorough, unannounced, complete.',
  ]},
  { when: { studentId: 9, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Chloé tastes American abundance with amused precision — unhurried, scandalized, continuing.',
    'She declares the portions obscene and finishes them anyway.',
  ]},
  { when: { studentId: 10, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Reneé eats like a chef grading her own work — eyes closed on the first bite, approving on the third.',
    'She samples, then commits. Commitment is generous.',
  ]},
  { when: { studentId: 11, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Kaylee calls it aggressive self-care and eats with clinical calm.',
    'She recommends seconds to herself. Patient complies.',
  ]},
  { when: { studentId: 12, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Nadia eats while observing everyone else eat. Field notes optional. Appetite mandatory.',
    'She watches you watch her chew. The observation does not slow her fork.',
  ]},
  { when: { studentId: 13, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Daisy eats like feeding is kindness — warm, unhurried, generous with seconds.',
    'She hums between bites. The hum means satisfied.',
  ]},
  { when: { studentId: 14, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Mary Jane eats with country abundance — nothing skimped, nothing rushed.',
    'She asks if you want more before her own plate is clean.',
  ]},
  { when: { studentId: 15, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Lilith eats without explaining her appetite. Portions are not discussed.',
    'Her gaze stays on you. The fork moves anyway.',
  ]},
  { when: { studentId: 16, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Sophia eats with anxious precision — measured bites, rising fullness noted and filed.',
    'Anxiety thins. Appetite does not.',
  ]},
  { when: { studentId: 17, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Indiana eats like trail rations at a dig site — practical, satisfied, ready for more.',
    'She pockets a roll for later and eats two now.',
  ]},
  { when: { studentId: 18, custom: false, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Talia eats while calculating caloric efficiency. The calculation keeps losing to appetite.',
    'She revises the model mid-meal. New assumption: more is better.',
  ]},
]);
