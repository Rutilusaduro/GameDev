// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Competitive gainer binge — slot skeleton. Unique CG_BINGE_SCENES is fallback.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('cgDrive', (ctx) => ctx.globals?.cgDrive ?? 'Invested');

// Shape: FULL SENTENCE. Desk, containers, how she starts.
registerPool('cg.binge.setup', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 4, text: [
    'Priya lines containers at the desk. Galley leftover still in her. This is the logged second sitting.',
    'Foil from earlier, then the measured feast. She treats both as data.',
  ] },
  { when: { leftoverFed: true }, weight: 4, text: [
    'Last night\'s tray plus a scheduled binge. Priya sits like the corkboard asked for a follow-up.',
    'Kitchen heat still under the blazer. She opens the next container without waiting to be empty.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You saw her after hours. Daylight binge uses the same appetite, just with labels.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 3, text: [
    'Priya sits at her desk with a planner and too much food. She calls it maintenance. The waistband disagrees.',
    'Containers arranged neat. She eats steadily, as if a lead can be built before the body looks like one.',
  ] },
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'Containers stacked. Belly already in her lap. She eats like the board is watching the swallows.',
    'Desk edge meets a warm middle. She does not push the chair back until the first box is gone.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'The desk is a shoreline. Priya eats from it without standing. The chair already knows the assignment.',
    'Custom clothes, oversized order, a middle that takes the room. She logs the start by sitting heavier.',
  ] },
  { when: {}, text: [
    'Priya sits at her desk with containers arranged like a study plan.',
    'High-calorie meals in a neat row. She starts the way she starts everything: on purpose.',
    'The corkboard waits. She feeds the numbers first.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event during the binge.
registerPool('cg.binge.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat plus this spread. Her middle reports both before she finishes the second box.',
    'The binge lands easier because the galley already opened her. Softness does the rest.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Each bite leaves a little more of her against the desk. She pretends it is posture.',
    'A new softness answers first. The planner does not have a column for that, so she keeps eating.',
  ] },
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'Her belly rounds warmer against the desk edge. Rolls form where the blazer used to lie.',
    'Thighs take more of the chair. Fabric argues. She finishes the container anyway.',
  ] },
  { when: { stageMin: 8, stageMax: 9 }, weight: 3, text: [
    'The gut surges in slow waves. Waistband surrenders. The chair complains and she does not.',
    'Heavy folds spill into her lap. She keeps a palm on the dome like checking a readout.',
  ] },
  { when: { stageMin: 10 }, weight: 3, text: [
    'Vastness finishes moving long after the swallow. Warmth pools. The reinforced chair tilts a degree and stays.',
    'She is the furniture the feast arranged itself on. The next bite still happens.',
  ] },
  { when: {}, text: [
    'Fullness builds with every swallow. She lets it.',
    'The body arrives while she is busy logging. Soft, warm, ahead of the plan.',
    'She eats until the spread is a memory and the middle is the record.',
  ] },
]);

// Shape: DIALOGUE / CLOSE BEAT. Drive-keyed.
registerPool('cg.binge.line', [
  { when: { leftoverFed: true, cgDrive: 'Ruthless' }, weight: 4, text: [
    '"Leftovers count," Priya says, hands on the swell. "The board will show both sittings."',
  ] },
  { when: { cgDrive: 'Invested', stageMax: 6 }, weight: 4, text: [
    '"Maintenance," Priya says, already calculating the margin this adds.',
    'She closes a container. "Lead holds if intake holds."',
  ] },
  { when: { cgDrive: 'Invested' }, weight: 3, text: [
    '"Logged," she says, satisfied, palm on a middle that did the work.',
  ] },
  { when: { cgDrive: 'Driven' }, weight: 4, text: [
    '"Catch up," she tells the empty corkboard, and rests both hands on the new weight.',
    'She finishes every box. "Gap widening. As designed."',
  ] },
  { when: { cgDrive: 'Frenzied' }, weight: 4, text: [
    'She barely pauses. "Need the number. Need it now."',
    '"Cannot stall," Priya says, breath warm, fork already moving.',
  ] },
  { when: { cgDrive: 'Ruthless' }, weight: 4, text: [
    'She stares at the corkboard. "Biggest. Already."',
    'Hands on the tight dome. "No one closes this."',
  ] },
  { when: {}, text: [
    'She sits back. The meal keeps a hand on her.',
    'Priya looks from the empty boxes to you. The looking is the rest of the log.',
    '"Apply it," she says, meaning the gain, meaning the board.',
  ] },
]);

registerPool('cg.binge.scene', [
  { when: {}, text: [
    '{cg.binge.setup} {cg.binge.growth} {cg.binge.line}',
    '{cg.binge.setup} {cg.binge.line} {cg.binge.growth}',
    '{cg.binge.growth} {cg.binge.setup} {cg.binge.line}',
  ] },
]);

export function renderCgBingeScene(priya, week, driveLabel) {
  if (!priya) return '';
  const ctx = buildTextContext({
    subject: priya,
    week,
    globals: { cgDrive: driveLabel || 'Invested' },
  });
  return render('{cg.binge.scene}', ctx)?.trim() || '';
}

registerPool('cg.inch', [
  { when: {}, text: [
    (ctx) => String(ctx.globals?.cgInch ?? ''),
    (ctx) => String(ctx.globals?.cgInch ?? ''),
    (ctx) => String(ctx.globals?.cgInch ?? ''),
  ] },
]);

// ── Corkboard ─────────────────────────────────────────────────────────────
registerPool('cg.cork.setup', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Priya leans the leftover heat into the corkboard. Pins, columns, a middle that already ate.',
    'Galley foil still on her fingers while she adjusts a pin. The board is the second sitting.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You saw her after hours. Daylight corkboard uses the same appetite with better lighting.',
  ] },
  { when: { cgDrive: 'Ruthless', stageMin: 8 }, weight: 4, text: [
    'She fills the space in front of the board. Columns wait. Her name already owns them.',
  ] },
  { when: { cgDrive: 'Frenzied' }, weight: 3, text: [
    'First thing, already at the pins. Marker sharper than the last visit.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Early board, neat pins. She stands like the data might still be modest.',
  ] },
  { when: {}, text: [
    'Priya stands before the corkboard with a marker and a plan.',
    'Pins, photos, columns. She treats the wall like a ranking she intends to keep.',
    'The board waits. She updates it the way she updates a lead.',
  ] },
]);

registerPool('cg.cork.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover warmth presses the desk edge. The numbers look better for it.',
    'Last night\'s tray plus this column. Softness does the math without asking.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'Belly takes the ledge. The chair reports her. She keeps marking.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'A new softness answers the lean-in. She files it as posture and keeps writing.',
  ] },
  { when: {}, text: [
    'The lean sends a slow shift through her middle. She notes a figure anyway.',
    'Thighs take more of the chair while she surveys the standings.',
    'The body arrives while she is busy with pins. Soft, warm, ahead of the column.',
  ] },
]);

registerPool('cg.cork.line', [
  { when: { leftoverFed: true, cgDrive: 'Ruthless' }, weight: 4, text: [
    '"Leftovers count," she says, marker still moving. "The board will show both sittings."',
  ] },
  { when: { cgDrive: 'Invested' }, weight: 3, text: [
    'She nods once. "Standings hold."',
    '"Logged," Priya says, stepping back as much as the middle allows.',
  ] },
  { when: { cgDrive: 'Driven' }, weight: 3, text: [
    '"Gap widening," she says, and means it as a schedule.',
  ] },
  { when: { cgDrive: 'Frenzied' }, weight: 3, text: [
    'A red pin. "Threat. Fix it."',
  ] },
  { when: { cgDrive: 'Ruthless' }, weight: 3, text: [
    'Marker down. "Mine. Every column."',
  ] },
  { when: {}, text: [
    'She sets the marker down like a period.',
    'The board is updated. So is she.',
    'Priya looks from the pins to you. The looking is the rest of the log.',
  ] },
]);

registerPool('cg.corkboard.scene', [
  { when: {}, text: [
    '{cg.cork.setup} {cg.cork.growth} {cg.cork.line}',
    '{cg.cork.setup} {cg.cork.line} {cg.cork.growth}',
    '{cg.cork.growth} {cg.cork.setup} {cg.cork.line}',
  ] },
]);

// ── Self-review ───────────────────────────────────────────────────────────
registerPool('cg.self.setup', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Tape out. Galley leftover still in the waist she is about to number.',
    'Mirror, tape, last night\'s tray still warm under the numbers.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Priya wraps the tape with clinical calm. The middle is already arguing with modest.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'She measures what she can reach. The rest of her is the rest of the room.',
  ] },
  { when: {}, text: [
    'Priya stands before the mirror with the tape and a plan.',
    'Tape around a middle that has been working. She wants the inches in writing.',
    'Self-review. Numbers first. Softness is the method.',
  ] },
]);

registerPool('cg.self.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat yields under the tape. The inch arrives honest.',
    'Last night plus this wrap. The tape sinks into work already done.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'Warm flesh takes the tape and keeps some. Rolls shift after she stops moving.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'A new softness answers the wrap. She files it as early lead.',
  ] },
  { when: {}, text: [
    'The tape finds give. She lets it.',
    'Warmth, yield, a number that climbed since last review.',
    'She checks twice. The body already knew.',
  ] },
]);

registerPool('cg.self.line', [
  { when: { cgDrive: 'Ruthless' }, weight: 4, text: [
    'She murmurs "{cg.inch} inches of growing lead," palm still on the swell.',
  ] },
  { when: { cgDrive: 'Frenzied' }, weight: 3, text: [
    '"{cg.inch}," she says, already hungry for the next sitting.',
  ] },
  { when: { cgDrive: 'Driven' }, weight: 3, text: [
    'Waist at {cg.inch}. She nods like a schedule just confirmed.',
  ] },
  { when: { cgDrive: 'Invested' }, weight: 3, text: [
    '"Logged. {cg.inch}." Quiet approval. Already imagining the climb.',
  ] },
  { when: {}, text: [
    'The number sits between her hands. She keeps it.',
    'Priya files {cg.inch} like a win she intends to feed.',
    'Tape off. Softness stays. The board will hear about this.',
  ] },
]);

registerPool('cg.self.scene', [
  { when: {}, text: [
    '{cg.self.setup} {cg.self.growth} {cg.self.line}',
    '{cg.self.setup} {cg.self.line} {cg.self.growth}',
    '{cg.self.growth} {cg.self.setup} {cg.self.line}',
  ] },
]);

// ── Measuring another resident ────────────────────────────────────────────
registerPool('cg.measure.setup', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Tape between them. Priya still warm from leftover. {ref.name} already knows the drill.',
    'Galley heat in Priya\'s middle while she measures {ref.name}. Both numbers will move.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Priya takes {ref.name}\'s measure like a study session. Tape, notes, a lead she intends to keep.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'Priya sits. {ref.name} stands or sits as the tape requires. The comparison is the point.',
  ] },
  { when: {}, text: [
    'Priya measures {ref.name} with the same tape she uses on herself.',
    'Tape, columns, {ref.name} in the doorway. Priya wants every category honest.',
    'A session. Inches. The board will eat whatever they find.',
  ] },
]);

registerPool('cg.measure.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover still in Priya. She reads {ref.name}\'s curve like a threat or a snack.',
  ] },
  { when: {}, text: [
    'The tape reports {ref.name}. Priya\'s middle answers by sitting heavier.',
    'Softness on both sides of the number. Priya keeps the pencil moving.',
    'A yield under the tape. Priya files it. Then she files herself against it.',
  ] },
]);

registerPool('cg.measure.line', [
  { when: { leftoverFed: true, cgDrive: 'Ruthless' }, weight: 4, text: [
    '"Yours counts. Mine counts more," Priya says, already hungry for the next column.',
  ] },
  { when: { cgDrive: 'Invested' }, weight: 3, text: [
    '"Logged," Priya says. "{ref.name} is in the set now."',
  ] },
  { when: { cgDrive: 'Driven' }, weight: 3, text: [
    '"Close or not, I want it on the board," Priya says.',
  ] },
  { when: {}, text: [
    'Priya looks from the tape to {ref.name}. The looking is the rest of the session.',
    '"Hold still," Priya says, which is also "I am winning this inch."',
    'The comparison is warm. So is Priya. She writes both.',
  ] },
]);

registerPool('cg.measure.scene', [
  { when: {}, text: [
    '{cg.measure.setup} {cg.measure.growth} {cg.measure.line}',
    '{cg.measure.setup} {cg.measure.line} {cg.measure.growth}',
    '{cg.measure.growth} {cg.measure.setup} {cg.measure.line}',
  ] },
]);

export function renderCgCorkboardScene(priya, week, driveLabel) {
  if (!priya) return '';
  const ctx = buildTextContext({
    subject: priya,
    week,
    globals: { cgDrive: driveLabel || 'Invested' },
  });
  return render('{cg.corkboard.scene}', ctx)?.trim() || '';
}

export function renderCgSelfScene(priya, week, driveLabel, inch) {
  if (!priya) return '';
  const ctx = buildTextContext({
    subject: priya,
    week,
    globals: { cgDrive: driveLabel || 'Invested', cgInch: inch ?? '' },
  });
  return render('{cg.self.scene}', ctx)?.trim() || '';
}

export function renderCgMeasureScene(priya, target, week, driveLabel) {
  if (!priya || !target) return '';
  const ctx = buildTextContext({
    subject: priya,
    ref: target,
    week,
    globals: { cgDrive: driveLabel || 'Invested' },
  });
  return render('{cg.measure.scene}', ctx)?.trim() || '';
}
