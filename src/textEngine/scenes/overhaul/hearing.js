// The Squad — Lead: A5 Editor | Support: A2 Psych
// Overwrite leftover opposition.hearing.* (registerPool last-wins). No em dashes.
import { registerPool } from '../../engine.js';

function ov(key, setup, body) {
  registerPool(`${key}.setup`, [{ when: {}, text: setup }]);
  registerPool(`${key}.body`, [{ when: {}, text: body }]);
  registerPool(key, [{ when: {}, text: [
    `{${key}.setup} {${key}.body}`,
    `{${key}.body} {${key}.setup}`,
    `{${key}.setup}`,
  ]}]);
}

ov('opposition.hearing.removal.phase0', [
  'Chairwoman Vance opens the folder. Photos of {subject.name} fill the screen. The Board performs worry.',
  'Vance taps the projector. {subject.name} at {studentLbs} pounds becomes a slide deck.',
  'Documentation first: timestamps, meal photos, a body counted like liability.',
], [
  'Your resident sits beside you, {studentLbs} lbs and unapologetic. Warm. Obvious.',
  '{subject.name} stays seated. The extra of her does the talking the slides cannot.',
  'Hunger sits in the chair next to you. The Board tries to call it a file.',
]);

ov('opposition.hearing.removal.phase1', [
  'Vance taps her folder. "{subject.name} may remain enrolled only if this hall demonstrates restraint."',
  'Second motion: conditional enrollment. Restraint spoken like virtue.',
  'Vance wants a promise of discretion. Language that makes appetite sound temporary.',
], [
  'The word hangs wrong in the air. {subject.name}\'s belly still remembers lunch.',
  'The Board wants paper. The floor already has pounds.',
  '{subject.name} does not look restrained. She looks fed.',
]);

ov('opposition.hearing.removal.result.testify', [
  'A resident speaks, warm and unashamed. The room shifts.',
  'Testimony lands soft and certain. Someone loves {subject.name} out loud.',
  'Devotion spoken in plain sentences. Vance\'s pen stops moving.',
], [
  'The Board flinches at affection it cannot file.',
  'Hunger defended as care. The folder feels thinner.',
  '{subject.name} stays seated like the testimony was always going to happen.',
]);

ov('opposition.hearing.removal.result.advocate', [
  'The advocate frames appetite as resident autonomy. Vance\'s mouth tightens.',
  'Jordan Ellis cites procedure and dignity. Hunger defended as choice.',
  'Resident voice enters the record. Polite. Fierce. Impossible to unhear.',
], [
  'Procedure, for once, points at keeping her.',
  'The Board hears a person where it wanted a problem.',
  '{subject.name} listens like someone being described accurately.',
]);

ov('opposition.hearing.removal.result.discredit', [
  'Side-by-side banquet photos. Wellness language curdles in Vance\'s mouth.',
  'Hypocrisy projected large. The Board ate while preaching restraint.',
  'Evidence lands surgical. Vance looks at her own catered lunch photos.',
], [
  'She says nothing. The room does the rest.',
  'Restraint as policy looks expensive when the receipts are catering.',
  '{subject.name} watches the slides like dessert.',
]);

ov('opposition.hearing.removal.result.feast', [
  'You serve. They eat. The hearing becomes dinner.',
  'Trays arrive mid-procedure. Appetite interrupts institutional theater.',
  'Steam and sweetness fill the room. Procedure dissolves into second helpings.',
], [
  'Full mouths make poor motions.',
  '{subject.name} is already eating. The Board catches up.',
  'Hospitality does what argument could not.',
]);

ov('opposition.hearing.removal.result.hold_firm', [
  'You do not apologize. Several members look away first.',
  'Abundance named as hall policy. Vance\'s folder feels thinner suddenly.',
  'You hold the line without flinching. Hunger stays on the meal plan.',
], [
  'The record takes your certainty and has nowhere to put it.',
  '{subject.name} sits like the policy was always her body.',
  'Restraint leaves the sentence. Enrollment stays.',
]);

ov('opposition.hearing.removal.result.negotiate', [
  'A compromise no one believes. It buys time.',
  'Public discretion promised. Private indulgence implied. The Board nods without joy.',
  'You trade language for weeks. Everyone knows the trade is temporary.',
], [
  '{subject.name} will still be hungry next week. The Board missed that.',
  'Paper peace. Floor appetite. Both signed.',
  'Vance files the wording. The pounds keep arriving.',
]);

ov('opposition.hearing.removal.result.floor_pressure', [
  'Plates appear. Resolve softens with every bite.',
  'Floor pressure turns the Board\'s table into yours.',
  'Mandatory tasting for five hostile members. Appetite wins by contact.',
], [
  'Fullness does what argument could not.',
  '{subject.name} watches them eat like a hostess.',
  'The motion loses flavor halfway through the second plate.',
]);

ov('opposition.hearing.removal.ending.advocate_voice', [
  'Resident voice carries. Removal denied with the advocate on record.',
  'Jordan Ellis closes the file. {subject.name} remains enrolled.',
  'The advocate\'s argument stands. Appetite unmoved. Enrollment intact.',
], [
  'Procedure outpaced by testimony.',
  '{subject.name} walks out still yours, still hungry.',
  'Vance does not get the signature she wanted.',
]);

ov('opposition.hearing.removal.ending.discredit_feast', [
  'The hearing collapses into crumbs and contradiction. Removal denied.',
  'Hypocrisy and hospitality undo the motion. {subject.name} walks out fed and enrolled.',
  'Catering photos meet wellness slides. The motion dies between bites.',
], [
  'The Board leaves hungry anyway.',
  'Enrollment intact. The extra of her is the exhibit they failed to bury.',
  'Vance packs a folder that now smells like lunch.',
]);

ov('opposition.hearing.removal.ending.testify_firm', [
  'Testimony lands. You hold the line. Removal denied, narrowly.',
  '{subject.name} stays. The gavel never finds the word suspend.',
  'Devotion spoken plain. Vance closes without the signature she wanted.',
], [
  'Enrollment intact. Appetite louder.',
  'The Board files a loss it will call a delay.',
  'She sits beside you like winning was a body, not a vote.',
]);

ov('opposition.hearing.removal.ending.messy_victory', [
  'A messy victory. She stays. The Board will watch closer.',
  'Removal denied with conditions nobody trusts. {subject.name} remains yours, for now.',
  'Win without grace. Enrollment intact, scrutiny doubled.',
], [
  'Hunger continues on the record they failed to close.',
  'You take the win you can spend. She takes the chair.',
  'Vance writes follow-up in the margin. The pounds will be there.',
]);

ov('opposition.hearing.removal.ending.suspended', [
  'The gavel falls. She is suspended from public campus life for four weeks.',
  '{subject.name} hidden from the quad. The Board calls it care.',
  'Suspension ordered. Hunger continues off the record.',
], [
  'The floor still feeds her. Quietly. Completely.',
  'Public life paused. Appetite did not get the memo.',
  'You walk her back to the hall. The extra of her stays enrolled in you.',
]);

ov('opposition.hearing.emergency.phase0', [
  'Scandal meter critical. Vance calls an emergency session. No agenda. Only exposure.',
  'Emergency convening. Vance wants housing on record tonight.',
  'The scandal chart glows red. Every board member arrived angry and underfed.',
], [
  '"Explain yourself, RA." {subject.name} sits warm beside you anyway.',
  'No notice. Plenty of appetite in the room if anyone would admit it.',
  'The folder is thicker than last time. She is too.',
]);

ov('opposition.hearing.emergency.phase1', [
  'The room waits. An accreditation observer takes notes. Every counter has a cost.',
  'Second round. Reputations weighed like bodies. The observer\'s pen never stops.',
  'Vance offers no path that does not cost you something.',
], [
  'Choose what the hall can afford.',
  '{subject.name} breathes like the hearing is another meal she will finish.',
  'Cost sits on the table next to the water pitcher.',
]);

ov('opposition.hearing.emergency.result.deflect', [
  'Charts, saturation data, feasts as community.',
  'You redirect to metrics. Culture, retention, satisfaction curves.',
  'Institutional language meets institutional language. The room blinks.',
], [
  'The Board cannot argue the curves cleanly.',
  '{subject.name} is the retention they are describing and pretending not to see.',
  'Numbers do the covering. Appetite does the living.',
]);

ov('opposition.hearing.emergency.result.feast_bribe', [
  'Trays arrive mid-sentence. Appetite interrupts procedure.',
  'Catering lands before the motion finishes. Hunger rewrites the agenda.',
  'You feed the hearing itself. Procedure slows around chewing.',
], [
  'Full mouths adjourn faster.',
  '{subject.name} was already eating. Now they are too.',
  'Crisis cools around steam and second helpings.',
]);

ov('opposition.hearing.emergency.result.sacrifice', [
  'You point at the softest resolve on the Board.',
  'A scapegoat named. Survival purchased with someone else\'s reputation.',
  'You sacrifice a member. The room accepts the trade without grace.',
], [
  'Scandal finds another target. The hall stays fed.',
  '{subject.name} does not have to be the example tonight.',
  'You spend a name so the meal plan survives.',
]);

ov('opposition.hearing.emergency.result.double_down', [
  'You speak hunger like gospel. Half the room flinches.',
  'No apology. Abundance declared as housing\'s future. Vance goes pale.',
  'You double down. The observer writes faster.',
], [
  'The record takes a position it cannot un-hear.',
  '{subject.name} sits like the future already arrived in her lap.',
  'Restraint leaves the sentence for good.',
]);

ov('opposition.hearing.emergency.result.absorb', [
  'You take the hit. They stay fed.',
  'Blame absorbed. The hall protected at your expense.',
  'You accept the scandal so their plates stay full.',
], [
  'Your name on the report. Their pounds intact.',
  '{subject.name} watches you spend reputation like calories.',
  'Personal cost, collective relief.',
]);

ov('opposition.hearing.emergency.result.hive', [
  'Delivery confusion becomes plausible deniability.',
  'Maya\'s hive misdirects records. Wrong building, wrong numbers.',
  'Paperwork diverges. The audit trail loses its appetite.',
], [
  'The observer cannot file what will not sit still.',
  '{subject.name} is not in the building they think she is.',
  'Lavender light somewhere else. This room gets a rumor.',
]);

ov('opposition.hearing.emergency.ending.catered_future', [
  'They ate through the emergency. Scandal dissipates like steam.',
  'Full bellies adjourn the crisis. The meter cools around crumbs.',
  'Procedure drowned in hospitality. Crisis deferred, appetites satisfied.',
], [
  'The hall remains yours. The extra of her remains the point.',
  'Vance closes a folder that now smells like catering.',
  '{subject.name} leaves heavier than she arrived. So does the mood.',
]);

ov('opposition.hearing.emergency.ending.scapegoat_survive', [
  'A member falls. You survive. The meter cools, quieter than it was.',
  'Sacrifice accepted. You remain standing while scandal finds another target.',
  'Someone else pays. You walk out with the hall intact.',
], [
  '{subject.name} is still enrolled. Still hungry. Still yours.',
  'The Board has a name to chew. Hers stays off the page.',
  'Survival purchased. Appetite continues.',
]);

ov('opposition.hearing.emergency.ending.absorb_cost', [
  'You absorb the scandal. The hall eats free this month.',
  'Personal cost, collective relief. Hunger funded by your reputation.',
  'Your name on the report. Their plates full anyway.',
], [
  '{subject.name} does not have to be the example. You already were.',
  'The meter cools around your signature.',
  'Enrollment intact. Appetite louder. You pay the invoice.',
]);

ov('opposition.hearing.emergency.ending.unresolved', [
  'Emergency hearing adjourns unresolved. Scrutiny tightens.',
  'No clean verdict. The Board leaves hungrier and more suspicious.',
  'Ambiguous adjournment. Scandal meter cools without closing.',
], [
  '{subject.name} walks out with you. The extra of her is still the exhibit.',
  'Nothing finished. Everything heavier.',
  'Vance keeps the folder open. So does appetite.',
]);

registerPool('opposition.hearing.open', [
  { when: {}, text: [
    '{opposition.hearing.open.setup} {opposition.hearing.open.body}',
    '{opposition.hearing.open.body} {opposition.hearing.open.setup}',
    '{opposition.hearing.open.setup}',
  ]},
]);
registerPool('opposition.hearing.open.setup', [
  { when: {}, text: [
    'The conference room smells like toner and denial. Chairwoman Vance has a folder thick enough to bruise.',
    'Five members wait like a verdict rehearsed in advance.',
    'Housing on the table. Appetite in the chair beside you.',
  ]},
  { when: { hearingType: 'emergency' }, weight: 4, text: [
    'Emergency session. Scandal meter critical. Every board member watches without sitting.',
    'No agenda. Only exposure. Vance wants answers before the room cools.',
    'The chart glows red. Underfed and furious, they arrived anyway.',
  ]},
]);
registerPool('opposition.hearing.open.body', [
  { when: {}, text: [
    '{subject.name} sits warm and obvious. The extra of her is already evidence.',
    'You take the chair they left for the RA. It is too small for the week.',
    'Photos wait in the folder. She waits in the flesh.',
  ]},
]);

registerPool('opposition.hearing.verdict', [
  { when: {}, text: [
    '{opposition.hearing.verdict.setup} {opposition.hearing.verdict.body}',
    '{opposition.hearing.verdict.body} {opposition.hearing.verdict.setup}',
    '{opposition.hearing.verdict.setup}',
  ]},
]);
registerPool('opposition.hearing.verdict.setup', [
  { when: {}, text: [
    'The board adjourns without clarity. A temporary reprieve.',
    'Ambiguous adjournment. The folder stays half-closed.',
    'The folder closes without deciding what it saw.',
  ]},
  { when: { outcome: 'win' }, weight: 4, text: [
    'Vance closes the folder without a signature. For now, the hall remains yours.',
    'Removal denied. The gavel never lands where she wanted.',
    'Enrollment intact. Appetite louder than the minutes.',
  ]},
  { when: { outcome: 'loss' }, weight: 4, text: [
    'The suspension order prints before you leave the room.',
    'Loss on the record. {subject.name} pays the price of their attention.',
    'The gavel finds a week it can take. Not her appetite.',
  ]},
]);
registerPool('opposition.hearing.verdict.body', [
  { when: {}, text: [
    '{subject.name} stands when you stand. The extra of her leaves with you.',
    'Minutes will be typed. Pounds will not wait for them.',
    'The hallway outside smells like the dining hall. She notices first.',
  ]},
]);
