// C1 — edge intro + joint beat prose
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

const EDGE_INTRO = '{edge.intro.line}';
const EDGE_BEAT = '{edge.beat.line}';
const EDGE_JOINT = '{edge.joint.line}';

registerPool('edge.intro.line', [
  { when: { studentId: 0, edgeType: 'rival' }, weight: 3, text: [
    '{subject.name} and {ref.name} still share a scoreboard neither has deleted. The gym remembers both of them.',
  ] },
  { when: { studentId: 3, edgeType: 'rival' }, weight: 3, text: [
    '{ref.name} still runs like the clock is personal. {subject.name} has started treating pounds like laps.',
  ] },
  { when: { studentId: 2, edgeType: 'partner' }, weight: 3, text: [
    '{subject.name} frames {ref.name} the way chapters frame feasts — public, hungry, on purpose.',
  ] },
  { when: { studentId: 6, edgeType: 'partner' }, weight: 3, text: [
    'The chapter house learned {ref.name} and {subject.name} share an appetite for spectacle.',
  ] },
  { when: { studentId: 12, edgeType: 'orbit' }, weight: 3, text: [
    '{subject.name} has a file open on {ref.name} that is not assigned coursework.',
  ] },
  { when: { studentId: 7, edgeType: 'rival' }, weight: 3, text: [
    '{subject.name} and {ref.name} compare outputs the way athletes compare times — politely, constantly.',
  ] },
  { when: {}, weight: 1, text: [
    '{subject.name} and {ref.name} are bound by a thread the campus can feel before it has a name.',
    'Something between {subject.name} and {ref.name} has its own gravity now.',
    '{subject.name} keeps finding reasons to measure herself against {ref.name}.',
  ] },
]);

registerPool('edge.beat.line', [
  { when: { edgeType: 'rival', edgeIntensityMin: 2 }, weight: 3, text: [
    '{subject.name} checks {ref.name} before she checks the scale — the rivalry has its own pulse.',
  ] },
  { when: { edgeType: 'partner' }, weight: 3, text: [
    '{subject.name} and {ref.name} eat like it is choreography they rehearsed without discussing it.',
  ] },
  { when: { edgeType: 'mentor' }, weight: 3, text: [
    '{subject.name} watches {ref.name} the way a thesis watches raw data — already drafting conclusions.',
  ] },
  { when: { edgeType: 'orbit' }, weight: 2, text: [
    '{subject.name} orbits {ref.name} at a distance that is not accidental.',
  ] },
  { when: {}, weight: 1, text: [
    'The room reads {subject.name} and {ref.name} as a pair even when you only called one of them.',
  ] },
]);

registerPool('edge.joint.line', [
  { when: { edgeType: 'partner' }, weight: 3, text: [
    '{subject.name} and {ref.name} share a table and a tempo — the week counts it as one appetite.',
  ] },
  { when: {}, weight: 1, text: [
    'You fed {subject.name} and {ref.name} in the same breath of the week. The campus noticed before you did.',
  ] },
]);

export function renderEdgeIntro(subject, ref, week = 1, opts = {}) {
  if (!subject || !ref) return '';
  const ctx = buildTextContext({
    subject,
    ref,
    week,
    globals: { edgeType: opts.edgeType || subject.edges?.[0]?.type },
    ...opts,
  });
  return render(EDGE_INTRO, ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderEdgeBeat(subject, ref, week = 1, opts = {}) {
  if (!subject || !ref) return '';
  const edge = subject.edges?.[0];
  const ctx = buildTextContext({
    subject,
    ref,
    week,
    globals: {
      edgeType: edge?.type,
      edgeIntensity: edge?.intensity ?? 0,
      edgeIntensityMin: edge?.intensity ?? 0,
    },
    ...opts,
  });
  return render(EDGE_BEAT, ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderEdgeJoint(subject, ref, week = 1, opts = {}) {
  if (!subject || !ref) return '';
  const ctx = buildTextContext({ subject, ref, week, globals: { edgeType: 'partner' }, ...opts });
  return render(EDGE_JOINT, ctx, { trace: opts.trace || null })?.trim() || '';
}
