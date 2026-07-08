// C2 — institution inauguration + interrupt prose
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

const INAUG = '{inst.inaug.line}';
const INTERRUPT = '{inst.interrupt.line}';

registerPool('inst.inaug.line', [
  { when: { institutionId: 'dining', institutionTier: 1 }, weight: 3, text: [
    'The dining hall posts a new menu board — portions no longer pretend to be modest.',
  ] },
  { when: { institutionId: 'dining', institutionTier: 2 }, weight: 3, text: [
    'Booths arrive on a flatbed. Reinforced steel, wider seats, no apologies.',
  ] },
  { when: { institutionId: 'dining', institutionTier: 3 }, weight: 3, text: [
    'You sign the standing buffet contract. The campus smells like commitment.',
  ] },
  { when: { institutionId: 'gym', institutionTier: 1 }, weight: 3, text: [
    'New racks bolt into the gym floor — rated for bodies the old equipment refused.',
  ] },
  { when: { institutionId: 'gym', institutionTier: 2 }, weight: 3, text: [
    'A banner reads STRENGTH AT ANY SIZE. Someone cheers before the paint dries.',
  ] },
  { when: { institutionId: 'clinic', institutionTier: 2 }, weight: 3, text: [
    'The compounding lab opens behind frosted glass — prescriptions with appetite.',
  ] },
  { when: { institutionId: 'tailor', institutionTier: 1 }, weight: 3, text: [
    'The tailor posts RUSH ALTERATIONS. Wardrobe failures get a same-week reprieve.',
  ] },
  { when: { institutionId: 'gainers_society', institutionTier: 1 }, weight: 3, text: [
    'An unsigned invitation appears in your office — records nights, no return address.',
  ] },
  { when: {}, weight: 1, text: [
    'Campus infrastructure shifts. Someone visible will notice before the week ends.',
    'The upgrade is live — the building carries your intent now.',
  ] },
]);

registerPool('inst.interrupt.line', [
  { when: { institutionId: 'dining', institutionTierMin: 3 }, weight: 3, text: [
    'The dining hall runs the standing buffet again — trays circulate without being asked.',
  ] },
  { when: { institutionId: 'gym', institutionTierMin: 2 }, weight: 3, text: [
    'The gym hums with a pride-at-any-size class — bodies move like they belong here.',
  ] },
  { when: { institutionId: 'clinic', institutionTierMin: 1 }, weight: 2, text: [
    'A clinic memo circulates: consultations are booking faster than last month.',
  ] },
  { when: { institutionId: 'tailor', institutionTierMin: 1 }, weight: 2, text: [
    'The tailor sends a rack card: alterations queue cleared for your roster.',
  ] },
  { when: { institutionId: 'gainers_society', institutionTierMin: 2 }, weight: 3, text: [
    'Records night whispers through the union — leaderboards updated, rivalries fed.',
  ] },
  { when: {}, weight: 1, text: [
    'An institution you funded acts between your turns — the campus has its own appetite.',
  ] },
]);

export function renderInstitutionInauguration(institutionId, tier, week = 1, opts = {}) {
  const ctx = buildTextContext({
    subject: opts.subject || { id: 0, name: 'Campus', lbs: 200 },
    week,
    globals: { institutionId, institutionTier: tier },
    ...opts,
  });
  return render(INAUG, ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderInstitutionInterrupt(ev, week = 1, opts = {}) {
  if (!ev) return '';
  const ctx = buildTextContext({
    subject: opts.subject || { id: 0, name: 'Campus', lbs: 200 },
    week,
    globals: {
      institutionId: ev.institutionId,
      institutionTier: ev.tier,
      institutionTierMin: ev.tier,
      locale: ev.locale,
    },
    locale: ev.locale,
    ...opts,
  });
  return render(INTERRUPT, ctx, { trace: opts.trace || null })?.trim() || '';
}
