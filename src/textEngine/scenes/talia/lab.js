// The Squad — Lead: A4 Architect | Support: A5 Editor
// Talia lab session prose — inventor path flavor beats.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

registerPool('lab.session.beat', [
  { when: { stageMin: 5 }, text: [
    'Talia measures the workbench with grease-stained fingers. Her body is inventory now — mass traded for mechanism, hunger traded for hypothesis.',
    'The lab hums. She talks about optimization the way other people talk about dessert — precise, eager, already tasting the outcome.',
  ]},
  { when: {}, text: [
    'Circuits and calipers. Talia treats appetite like an engineering problem — inputs, outputs, a body willing to be iterated on.',
    'She hunches over the bench, hoodie slipping, eyes bright. The inventor path smells like solder and something sweeter underneath.',
    'Parts scatter across steel. Talia narrates each choice like a proof — clinical on the surface, hungry underneath.',
  ]},
]);

registerPool('lab.session.acquire', [
  { when: {}, text: [
    'Acquisition means scavenging campus, trading favors, spending what she has stored in flesh.',
    'She lists what the build needs without looking up. Her thighs press the stool. Mass is currency here.',
    'Parts on the list, mass in reserve. Talia spends both without sentiment — inventory and appetite aligned.',
  ]},
]);

registerPool('lab.session.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley surplus still in the hoodie. She treats the bench like a second sitting.',
    'Last night\'s tray plus this test. Mass is the successful output.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'After-hours knock still in her. The lab uses the same open door.',
  ] },
  { when: {}, text: [
    'Solder cools. She does not. The hoodie rides and she leaves it.',
    'The bench keeps her heat. Breakthroughs keep her hungry.',
    'She palms the new of her like a successful test. The lab agrees.',
  ] },
]);

export function renderLabSessionBeat(student, week = 1, phase = 'session', opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { labPhase: phase, ...(opts.globals || {}) },
    ...opts,
  });
  const pool = phase === 'acquire' ? 'lab.session.acquire' : 'lab.session.beat';
  const base = render(`{${pool}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{lab.session.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth([base, linger].filter(Boolean).join('\n\n'), 'lab', ctx, opts.v2DepthChance ?? 0.3);
}
