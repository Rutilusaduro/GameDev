// The Squad — Lead: A4 Architect | Support: A2 Psych, A5 Editor
// ═══════════════════════════════════════════════════════════════
// SCRUTINY TIER-UP BEATS — voiced institutional dread when admin
// attention crosses a threshold. Tone: consequence axis, not
// titillation. Each tier has its own specific beat; a generic
// fallback catches anything the specifics miss.
//
//   globals: scrutinyTierId ∈ 1 | 2 | 3  (the NEW tier id)
//   Called from game code after detecting adminScrutiny crossed
//   a SCRUTINY_TIERS boundary (prev tier id < new tier id).
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { registerPoolAutoDecompose } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

// ── scrutiny.tierUp.header ────────────────────────────────────
// Shape: SHORT SENTENCE — the administrative channel the news arrives on.
registerPool('scrutiny.tierUp.header', [
  { when: {}, text: [
    `An internal memo lands in your faculty inbox.`,
    `A new notification sits in the department portal, timestamped this morning.`,
  ]},
  { when: { scrutinyTierId: 1 }, weight: 3, text: [
    `A brief note from the department secretary. Routine, almost.`,
    `An automated flag from the wellness compliance system — low priority, for now.`,
  ]},
  { when: { scrutinyTierId: 2 }, weight: 3, text: [
    `An email from the Dean of Academic Affairs. The subject line is three words: "Preliminary Welfare Review."`,
    `A formal notice through the faculty channel — Office of Student Affairs letterhead.`,
  ]},
  { when: { scrutinyTierId: 3 }, weight: 3, text: [
    `A certified letter from the Provost's office arrives through campus mail.`,
    `A calendar invite: "Formal Review — Mandatory Attendance." No explanation. You already know.`,
  ]},
]);

// ── scrutiny.tierUp.body ──────────────────────────────────────
// Shape: SHORT PARAGRAPH — what the notice says and what it means.
registerPoolAutoDecompose('scrutiny.tierUp.body', [
  { when: {}, text: [
    `Something about your hall has caught an eye it shouldn't have. No specifics. Not yet.`,
  ]},
  { when: { scrutinyTierId: 1 }, weight: 3, text: [
    `"Patterns consistent with non-standard dietary supplementation have been observed in your enrolled cohort." Bureaucratic language for: someone noticed.`,
    `A wellness coordinator has flagged "anomalous weight change velocity" among students in your section. The word "anomalous" is doing a lot of work.`,
    `An anonymous concern — filed through the student wellness portal, passed up the chain. Nothing actionable yet, but the paper trail has started.`,
  ]},
  { when: { scrutinyTierId: 2 }, weight: 3, text: [
    `Your class is under a preliminary welfare review. You have two weeks to submit documentation of your pedagogical approach to student wellness. The clock is already running.`,
    `Faculty governance has authorized a file review. No interview, not yet — but they're pulling grade records, attendance logs, and the health center check-ins. The net is widening.`,
    `"This office has received multiple independent reports regarding the physical welfare of students in your section. A formal review period commences immediately." You read it three times.`,
  ]},
  { when: { scrutinyTierId: 3 }, weight: 3, text: [
    `You are under formal investigation by the Office of Academic Integrity and Student Welfare. Public events involving your enrolled cohort are suspended pending outcome. The institution is no longer looking the other way.`,
    `"A full investigative inquiry has been opened. You are advised not to alter the conditions of your hall until the review concludes." Everything you have built is in the light now.`,
    `The letter is three pages. The first is procedure. The second is a list of incidents they've already documented. The third is a timeline. They've been watching longer than you realized.`,
  ]},
]);

// ── scrutiny.tierUp.coda ─────────────────────────────────────
// Shape: SHORT SENTENCE — the weight of it settling.
registerPool('scrutiny.tierUp.coda', [
  { when: {}, text: [
    `You close the window and sit with it for a moment.`,
    `The notification dismisses itself. The problem does not.`,
  ]},
  { when: { scrutinyTierId: 1 }, weight: 2, text: [
    `A word of caution to yourself: keep the profile low for a while.`,
    `It's a warning shot. Treat it like one.`,
  ]},
  { when: { scrutinyTierId: 2 }, weight: 2, text: [
    `There is no good version of a welfare review. Only a manageable one.`,
    `The margin for error has gotten considerably smaller.`,
  ]},
  { when: { scrutinyTierId: 3 }, weight: 2, text: [
    `Everything from here is damage control, or it is over.`,
    `The institution has named what you're doing. What happens next is up to how carefully you move.`,
  ]},
]);

// ── scrutiny.tierUp — composed skeleton ───────────────────────
registerPool('scrutiny.tierUp', [
  { when: {}, text: [
    '{scrutiny.tierUp.header} {scrutiny.tierUp.body} {scrutiny.tierUp.coda}',
  ]},
]);

/** Render the tier-up beat for the new scrutiny tier. */
export function renderScrutinyTierUp(tierId = 1, opts = {}) {
  const ctx = buildTextContext({
    subject: opts.subject || null,
    week: opts.week || 1,
    globals: { scrutinyTierId: tierId, ...(opts.globals || {}) },
  });
  const base = render('{scrutiny.tierUp}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'scrutiny', ctx, opts.v2DepthChance ?? 0.35);
}
