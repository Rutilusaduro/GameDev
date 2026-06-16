// The Squad — Lead: A6 Slender | Support: A2 Psych, A5 Editor
// Per-girl early-game voice — extends slender.* pools via registerModuleVariants.
// Key: studentId + corruption [0] + stageMax 4 + gainStance where applicable.
// Roster: AUTHORING.md §3 (ids 0–18).
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;
const EARLY = { corruption: [0], stageMax: 4 };

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
    'Patch notes: minor texture update. She has not filed a bug report.',
    'Her hoodie still fits. The fit is informational, not alarming.',
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
  { when: { studentId: 18, ...EARLY }, weight: W, text: [
    'Inputs exceeded projections. She is revising the model without announcing it.',
    'Optimization problem: her body found a local maximum she did not specify.',
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
  { when: { studentId: 18, gainStance: 'reluctant', ...EARLY }, weight: W, text: [
    `"Margin of error," she mutters.`,
    `"The prototype diet wasn't optimized yet."`,
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
  ]},
]);

registerModuleVariants('slender.eatPause', [
  { when: { studentId: 0, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Brittany eats like fueling — portioned, committed, already thinking about the next plate.',
  ]},
  { when: { studentId: 1, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Madeline annotates the meal in her head between bites. The plate empties anyway.',
  ]},
  { when: { studentId: 2, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Kylie eats on camera and off — the off-camera bites are more honest.',
  ]},
  { when: { studentId: 3, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Serena eats with athlete discipline redirected toward appetite.',
  ]},
  { when: { studentId: 4, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Fiona savors each bite the way she savors color — slowly, reverently.',
  ]},
  { when: { studentId: 5, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Destiny eats one-handed. Efficiency unchanged. Fullness: updating.',
  ]},
  { when: { studentId: 6, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Tiffany treats the table like chapter business — bubbly, social, second helpings included.',
  ]},
  { when: { studentId: 7, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Priya eats while reviewing notes. Multitasking includes calories now.',
  ]},
  { when: { studentId: 8, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Maya eats without commentary. The fork does not hesitate.',
  ]},
  { when: { studentId: 9, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Chloé tastes American abundance with amused precision — unhurried, scandalized, continuing.',
  ]},
  { when: { studentId: 10, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Reneé eats like a chef grading her own work — eyes closed on the first bite, approving on the third.',
  ]},
  { when: { studentId: 11, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Kaylee calls it aggressive self-care and eats with clinical calm.',
  ]},
  { when: { studentId: 12, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Nadia eats while observing everyone else eat. Field notes optional. Appetite mandatory.',
  ]},
  { when: { studentId: 13, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Daisy eats like feeding is kindness — warm, unhurried, generous with seconds.',
  ]},
  { when: { studentId: 14, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Mary Jane eats with country abundance — nothing skimped, nothing rushed.',
  ]},
  { when: { studentId: 15, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Lilith eats without explaining her appetite. Portions are not discussed.',
  ]},
  { when: { studentId: 16, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Sophia eats with anxious precision — measured bites, rising fullness noted and filed.',
  ]},
  { when: { studentId: 17, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Indiana eats like trail rations at a dig site — practical, satisfied, ready for more.',
  ]},
  { when: { studentId: 18, corruption: [0], stageMax: 3 }, weight: W, text: [
    'Talia eats while calculating caloric efficiency. The calculation keeps losing to appetite.',
  ]},
]);
