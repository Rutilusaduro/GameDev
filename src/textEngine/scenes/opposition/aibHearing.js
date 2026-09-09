// The Squad — Lead: A2 Psych | Support: A4 Architect
// Opposition hearing pools — removal & emergency phases, choice results, endings.
import { registerModule } from '../../engine.js';
import { registerPoolAutoDecompose } from '../decomposePools.js';

registerModule('studentLbs', [{ when: {}, text: (ctx) => String(ctx.globals?.studentLbs ?? 0) }]);

// ── Removal hearing ───────────────────────────────────────────
registerPoolAutoDecompose('opposition.hearing.removal.phase0', [
  { when: {}, text: [
    'Chairwoman Vance opens the hearing. Photos of {subject.name} fill the screen — abundance framed as concern. "The Board must protect institutional wellness," she says. Your resident sits beside you, {studentLbs} lbs and unapologetic.',
    'Vance taps the projector. {subject.name} at {studentLbs} pounds becomes a slide deck. The room performs worry while your resident performs hunger.',
    'The hearing begins with documentation — timestamps, meal photos, a body counted like liability. {subject.name} stays seated, warm and enormous beside you.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.phase1', [
  { when: {}, text: [
    'Vance taps her folder. "{subject.name} may remain enrolled only if this hall demonstrates… restraint." The word hangs wrong in the air.',
    'Second motion: conditional enrollment. Restraint spoken like virtue while {subject.name}\'s belly still remembers lunch.',
    'Vance wants a promise of discretion. The Board wants language that makes appetite sound temporary.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.testify', [
  { when: {}, text: [
    'A resident speaks — warm, specific, unashamed. The room shifts.',
    'Testimony lands soft and certain. Someone loves {subject.name} out loud and the Board flinches.',
    'Devotion spoken in plain sentences. Vance\'s pen stops moving.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.advocate', [
  { when: {}, text: [
    'The advocate frames appetite as resident autonomy. Vance\'s mouth tightens.',
    'Jordan Ellis cites procedure and dignity. Hunger defended as choice, not scandal.',
    'Resident voice enters the record — polite, fierce, impossible to unhear.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.discredit', [
  { when: {}, text: [
    'Side-by-side banquet photos. Wellness language curdles in Vance\'s mouth.',
    'Hypocrisy projected large. The Board ate while preaching restraint.',
    'Evidence lands surgical. Vance looks at her own catered lunch photos and says nothing.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.feast', [
  { when: {}, text: [
    'You serve. They eat. The hearing becomes dinner.',
    'Trays arrive mid-procedure. Appetite interrupts institutional theater.',
    'The room fills with steam and sweetness. Procedure dissolves into seconds helpings.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.hold_firm', [
  { when: {}, text: [
    'You do not apologize. Several members look away first.',
    'Abundance named as curriculum. Vance\'s folder feels thinner suddenly.',
    'You hold the line without flinching. Hunger stays on the meal plan.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.negotiate', [
  { when: {}, text: [
    'A compromise no one believes. It buys time.',
    'Public discretion promised, private indulgence implied. The Board nods without joy.',
    'You trade language for weeks. Everyone knows the trade is temporary.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.result.spirit', [
  { when: {}, text: [
    'Plates appear. Resolve softens with every bite.',
    'Floor pressure turns the Board\'s table into yours. Fullness does what argument could not.',
    'Mandatory tasting for five hostile members. Appetite wins by contact.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.ending.advocate_voice', [
  { when: {}, text: [
    'Resident voice carries. Removal denied with the advocate on record.',
    'The advocate\'s argument stands. {subject.name} stays — enrollment intact, appetite unmoved.',
    'Jordan Ellis closes the record. {subject.name} remains enrolled — procedure outpaced by testimony.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.ending.discredit_feast', [
  { when: {}, text: [
    'The hearing collapses into crumbs and contradiction. Removal denied. The Board leaves hungry.',
    'Hypocrisy and hospitality undo the motion. {subject.name} walks out fed and enrolled.',
    'Catering photos meet wellness slides. The motion dies between bites.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.ending.testify_firm', [
  { when: {}, text: [
    'Testimony lands. You hold the line. Removal denied — narrowly.',
    '{subject.name} stays. The gavel never finds the word suspend.',
    'Devotion spoken plain. Vance closes without the signature she wanted.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.ending.messy_victory', [
  { when: {}, text: [
    'A messy victory. She stays — but the Board will watch closer.',
    'Removal denied with conditions nobody trusts. {subject.name} remains yours, for now.',
    'Win without grace. Enrollment intact, scrutiny doubled.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.removal.ending.suspended', [
  { when: {}, text: [
    'The gavel falls. She is suspended from public campus life for four weeks.',
    '{subject.name} hidden from the quad — not expelled, not free. The Board calls it care.',
    'Suspension ordered. Hunger continues off the record.',
  ]},
]);

// ── Emergency hearing ─────────────────────────────────────────
registerPoolAutoDecompose('opposition.hearing.emergency.phase0', [
  { when: {}, text: [
    'Scandal meter critical. Vance calls an emergency session — no agenda, only exposure. "Explain yourself, RA."',
    'Emergency convening — no notice, no mercy. Vance wants housing on record tonight.',
    'The scandal chart glows red. Every board member arrived angry and underfed.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.phase1', [
  { when: {}, text: [
    'The room waits. Accreditation observer takes notes. Every counter has a cost.',
    'Second round — reputations weighed like bodies. The observer\'s pen never stops.',
    'Vance offers no path that does not cost you something. Choose what the hall can afford.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.deflect', [
  { when: {}, text: [
    'Charts, saturation data, feasts as community.',
    'You redirect to metrics — culture, retention, satisfaction curves the Board cannot argue with cleanly.',
    'Institutional language meets institutional language. The room blinks.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.feast_bribe', [
  { when: {}, text: [
    'Trays arrive mid-sentence. Appetite interrupts procedure.',
    'Catering lands before the motion finishes. Hunger rewrites the agenda.',
    'You feed the hearing itself. Procedure slows around chewing.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.sacrifice', [
  { when: {}, text: [
    'You point at the softest resolve on the Board.',
    'A scapegoat named. Survival purchased with someone else\'s reputation.',
    'You sacrifice a member. The room accepts the trade without grace.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.double_down', [
  { when: {}, text: [
    'You speak hunger like gospel. Half the room flinches.',
    'No apology — abundance declared as housing\'s future. Vance goes pale.',
    'You double down. The observer writes faster.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.absorb', [
  { when: {}, text: [
    'You take the hit. They stay fed.',
    'Blame absorbed. The hall protected at your expense.',
    'You accept the scandal so their plates stay full.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.result.hive', [
  { when: {}, text: [
    'Delivery confusion becomes plausible deniability.',
    'Maya\'s hive misdirects records — wrong building, wrong numbers, beautiful chaos.',
    'Paperwork diverges. The audit trail loses its appetite.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.ending.catered_future', [
  { when: {}, text: [
    'They ate through the emergency. Scandal dissipates like steam.',
    'Full bellies adjourn the crisis. The meter cools around crumbs.',
    'Procedure drowned in hospitality. Crisis deferred, appetites satisfied.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.ending.scapegoat_survive', [
  { when: {}, text: [
    'A member falls. You survive. The meter cools — not clean, but quieter.',
    'Sacrifice accepted. You remain standing while scandal finds another target.',
    'Someone else pays. You walk out with the hall intact.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.ending.absorb_cost', [
  { when: {}, text: [
    'You absorb the scandal. The hall eats free this month.',
    'Personal cost, collective relief. Hunger funded by your reputation.',
    'Your name on the report. Their plates full anyway.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.emergency.ending.unresolved', [
  { when: {}, text: [
    'Emergency hearing adjourns unresolved. Scrutiny tightens.',
    'No clean verdict. The Board leaves hungrier and more suspicious.',
    'Ambiguous adjournment. Scandal meter cools without closing.',
  ]},
]);

// ── Legacy open / verdict pools (oversight telegraph) ───────────
registerPoolAutoDecompose('opposition.hearing.open', [
  { when: { hearing: 'emergency' }, text: [
    'Emergency session — scandal meter critical. Every board member watches without sitting.',
    'No agenda, only exposure. Vance wants answers before the room cools.',
  ]},
  { when: {}, text: [
    'The conference room smells like toner and denial. Chairwoman Vance has a folder thick enough to bruise.',
    'Toner and denial in the conference air — five members wait like a verdict in advance.',
  ]},
]);

registerPoolAutoDecompose('opposition.hearing.verdict', [
  { when: { outcome: 'win' }, text: [
    'Vance closes the folder without a signature. For now, the hall remains yours.',
    'Removal denied. The gavel never lands where she wanted.',
  ]},
  { when: { outcome: 'loss' }, text: [
    'The suspension order prints before you leave the room.',
    'Loss on the record. {subject.name} pays the price of their attention.',
  ]},
  { when: {}, text: [
    'The board adjourns without clarity — a temporary reprieve.',
    'Ambiguous adjournment. Neither victory nor surrender — yet.',
  ]},
]);
