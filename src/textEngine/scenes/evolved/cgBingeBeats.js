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
