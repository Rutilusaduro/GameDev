// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Hint escalation prose + preference fulfillment beats.
// Pools keyed on courtHintTier (1/2/3) and courtBoonTier ('early'/'standard').
import { registerPool } from '../../engine.js';

// ── immob.hint.heat ───────────────────────────────────────────
registerPool('immob.hint.heat', [
  { when: {}, text: ['', '', ''] },
  { when: { courtHintTier: [1] }, text: [
    `She mentions, almost offhand, that she's been warm lately. More than usual.`,
    `It's warm where she rests — has been for a while. She says it the way people mention weather: casually, as fact.`,
    `Heat pools under her skin when she shifts. She fans herself once and does not comment further.`,
    `She says the room feels close today. Her body radiates warmth like a settled furnace.`,
  ]},
  { when: { courtHintTier: [2] }, text: [
    `She brings it up again — the warmth. She runs hot now, at this scale. She says it like the conclusion to something she's been working out.`,
    `Still warm, she says. More than comfortable. She's said it before. She says it again.`,
    `Her skin glistens when she exhales. "It's the size," she says. "It holds heat."`,
    `She mentions moving air the way other people mention thirst — casually, repeatedly, increasingly direct.`,
  ]},
  { when: { courtHintTier: [3] }, text: [
    `She says it plainly: she needs moving air. A fan. She is not asking subtly anymore.`,
    `"I need a fan," she says. "It's time." She is calm about it. She has been warm for a long time.`,
    `"I'm too warm," she says, without apology. "Fix it."`,
    `She breathes slow through the heat she carries. "Air," she says. "Please."`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `At this scale, warmth is constant — a soft furnace she inhabits. She mentions it like weather that will not change on its own.`,
    `Heat rises off her in visible waves. She has stopped pretending it is temporary.`,
  ]},
]);

// ── immob.hint.position ───────────────────────────────────────
registerPool('immob.hint.position', [
  { when: {}, text: ['', '', ''] },
  { when: { courtHintTier: [1] }, text: [
    `She shifts slightly as you tend her — looking for something. Not quite finding it. She doesn't say what.`,
    `There's a small adjustment she keeps making — a search for the arrangement that works. She hasn't said it out loud yet.`,
    `Her weight redistributes with a small, unsatisfied sigh. Something in the geometry is not quite right.`,
    `She rolls her shoulder once, twice — seeking a position her mass will accept.`,
  ]},
  { when: { courtHintTier: [2] }, text: [
    `She mentions it now — there's a position, a settled arrangement, that she hasn't found yet. Something isn't quite right.`,
    `"There's a way I want to rest," she says, "that I haven't got to yet." She says it to the room as much as to you.`,
    `"My hips need support," she says, practical. "The pillows aren't doing it."`,
    `She tries another angle and settles wrong again. "Almost," she murmurs. Not almost.`,
  ]},
  { when: { courtHintTier: [3] }, text: [
    `She tells you directly: she wants help finding the right arrangement. Cushions, positioning — whatever it takes.`,
    `"Help me get settled," she says. "Properly." She's been working around it long enough.`,
    `"I need to be arranged," she says, calm and certain. "Do it right this time."`,
    `She looks at the cushions like they owe her an apology. "Fix it," she says. "I'm done negotiating with furniture."`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `Immobility makes position a project. She mentions it the way architects mention load-bearing walls.`,
    `Her mass needs geometry she has not found yet. She says so without embarrassment.`,
  ]},
]);

// ── immob.hint.food ───────────────────────────────────────────
// ctx fn — exempt from 200-char limit; reads pendingCourtPreference from globals.
registerPool('immob.hint.food', [
  { when: {}, text: ['', '', ''] },
  { when: { courtHintTier: [1] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'something spicy', volume: 'more of everything' }[pref] || 'something specific';
      return `She mentions a craving — ${taste}, lately. She says it idly, between bites, like she's just noticing it herself.`;
    },
    `She eyes what you brought and mentions, lightly, that she'd prefer something different next time.`,
    `Her appetite has a preference she hasn't named yet — you can see it in how she picks at the tray.`,
  ]},
  { when: { courtHintTier: [2] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'something with heat', volume: 'volume' }[pref] || 'what she wants';
      return `She says it again — the preference for ${taste}. Not a complaint. A preference. She'd like it reflected in what you bring her.`;
    },
    `"Bring me what I actually want," she says, not unkindly. "You know what that is."`,
    `She finishes what you brought without enthusiasm. The message is clear.`,
  ]},
  { when: { courtHintTier: [3] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'spice', volume: 'volume — more of everything' }[pref] || 'what she prefers';
      return `She's direct about it now: she wants ${taste}. Has wanted it a while. She'd like what you bring her to reflect that.`;
    },
    `"I'm tired of polite trays," she says. "Feed me what I asked for."`,
    `Her hunger is specific now — vast, particular, no longer willing to accept substitutes.`,
  ]},
]);

// ── immob.pref.heat ───────────────────────────────────────────
registerPool('immob.pref.heat', [
  { when: {}, text: ['', ''] },
  { when: { courtBoonTier: ['early'] }, text: [
    `You said once was enough — you heard her the first time and came back with a solution. She looks at the fan, then at you. "Once," she says. "I only said it once."`,
    `The fan arrives before she had to ask again. She watches you set it up. Something quiet and pleased settles into her expression.`,
    `Moving air finds her skin. She closes her eyes. "You listen," she says, and means it as praise.`,
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    `She accepts the fan with the warmth of someone who waited longer than she needed to. "Finally," she says — the way you say something you've been holding a while.`,
    `The fan goes in. She closes her eyes into the moving air. "Thank you," she says, and means it.`,
    `Cool air crosses the warm expanse of her. She exhales long and slow. "That's better," she murmurs.`,
    `She does not thank you twice. She lets the fan run and lets her body receive it.`,
  ]},
]);

// ── immob.pref.position ───────────────────────────────────────
registerPool('immob.pref.position', [
  { when: {}, text: ['', ''] },
  { when: { courtBoonTier: ['early'] }, text: [
    `She mentioned it once and you came back ready to fix it. She shifts as you adjust — finding it without effort now. "There," she says. "That's exactly it."`,
    `You caught it the first time she let on. She settles into the arrangement you've made. "You were listening," she says.`,
    `Cushions move; mass follows. She goes still in the new geometry — finally, properly held.`,
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    `She settles into the new arrangement — better, finally. She says "better" and closes her eyes.`,
    `"That's right," she says, once you've adjusted everything. She goes still in it. She has been waiting for this.`,
    `The tension she'd been carrying releases — small ongoing discomfort, finally solved.`,
    `She tests the new position once and stops adjusting. "Don't move anything," she says. "This is it."`,
  ]},
]);

// ── immob.pref.food ───────────────────────────────────────────
// ctx fn — reads courtPreference from subject or globals.
registerPool('immob.pref.food', [
  { when: {}, text: ['', ''] },
  { when: { courtBoonTier: ['early'] }, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const taste = { sweet: 'the sweets', savory: 'the savory spread', spicy: 'the heat', volume: 'the volume' }[pref] || 'what you brought';
      return `She accepts what you've brought and eats with an ease that hasn't been there in weeks. You heard her early. ${taste === 'what you brought' ? 'This was right.' : `${taste} — right.`} She knew what she wanted.`;
    },
    `She eats without commentary — fast, focused, satisfied. You brought what she wanted. That is the whole message.`,
    `The tray is right. Her appetite knows it before her mouth does.`,
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const taste = { sweet: 'sweets', savory: 'something savory', spicy: 'the spice', volume: 'the volume' }[pref] || 'what she asked for';
      return `She takes what you've brought — ${taste}, finally — and eats with quiet satisfaction. "Yes," she says. "Like that."`;
    },
    `She eats like someone whose preference was finally honored — unhurried, thorough, pleased.`,
    `"Finally," she says around the first bite. The word means everything.`,
    `Fullness gathers warm and right. She pats her middle once, approving.`,
  ]},
]);
