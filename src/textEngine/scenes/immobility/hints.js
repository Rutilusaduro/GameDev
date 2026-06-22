// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Hint escalation prose + preference fulfillment beats.
// Pools keyed on courtHintTier (1/2/3) and courtBoonTier ('early'/'standard').
import { registerPool } from '../../engine.js';

// ── immob.hint.heat ───────────────────────────────────────────
registerPool('immob.hint.heat', [
  { when: { courtHintTier: [1] }, text: [
    `She mentions, almost offhand, that she's been warm lately. More than usual.`,
    `It's warm where she rests — has been for a while. She says it the way people mention weather: casually, as fact.`,
  ]},
  { when: { courtHintTier: [2] }, text: [
    `She brings it up again — the warmth. She runs hot now, at this scale. She says it like the conclusion to something she's been working out.`,
    `Still warm, she says. More than comfortable. She's said it before. She says it again.`,
  ]},
  { when: { courtHintTier: [3] }, text: [
    `She says it plainly: she needs moving air. A fan. She is not asking subtly anymore.`,
    `"I need a fan," she says. "It's time." She is calm about it. She has been warm for a long time.`,
  ]},
]);

// ── immob.hint.position ───────────────────────────────────────
registerPool('immob.hint.position', [
  { when: { courtHintTier: [1] }, text: [
    `She shifts slightly as you tend her — looking for something. Not quite finding it. She doesn't say what.`,
    `There's a small adjustment she keeps making — a search for the arrangement that works. She hasn't said it out loud yet.`,
  ]},
  { when: { courtHintTier: [2] }, text: [
    `She mentions it now — there's a position, a settled arrangement, that she hasn't found yet. Something isn't quite right.`,
    `"There's a way I want to rest," she says, "that I haven't got to yet." She says it to the room as much as to you.`,
  ]},
  { when: { courtHintTier: [3] }, text: [
    `She tells you directly: she wants help finding the right arrangement. Cushions, positioning — whatever it takes.`,
    `"Help me get settled," she says. "Properly." She's been working around it long enough.`,
  ]},
]);

// ── immob.hint.food ───────────────────────────────────────────
// ctx fn — exempt from 200-char limit; reads pendingCourtPreference from globals.
registerPool('immob.hint.food', [
  { when: { courtHintTier: [1] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'something spicy', volume: 'more of everything' }[pref] || 'something specific';
      return `She mentions a craving — ${taste}, lately. She says it idly, between bites, like she's just noticing it herself.`;
    },
  ]},
  { when: { courtHintTier: [2] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'something with heat', volume: 'volume' }[pref] || 'what she wants';
      return `She says it again — the preference for ${taste}. Not a complaint. A preference. She'd like it reflected in what you bring her.`;
    },
  ]},
  { when: { courtHintTier: [3] }, text: [
    ctx => {
      const pref = ctx.globals?.pendingCourtPreference;
      const taste = { sweet: 'sweets', savory: 'savory things', spicy: 'spice', volume: 'volume — more of everything' }[pref] || 'what she prefers';
      return `She's direct about it now: she wants ${taste}. Has wanted it a while. She'd like what you bring her to reflect that.`;
    },
  ]},
]);

// ── immob.pref.heat ───────────────────────────────────────────
registerPool('immob.pref.heat', [
  { when: { courtBoonTier: ['early'] }, text: [
    `You said once was enough — you heard her the first time and came back with a solution. She looks at the fan, then at you. "Once," she says. "I only said it once."`,
    `The fan arrives before she had to ask again. She watches you set it up. Something quiet and pleased settles into her expression.`,
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    `She accepts the fan with the warmth of someone who waited longer than she needed to. "Finally," she says — the way you say something you've been holding a while.`,
    `The fan goes in. She closes her eyes into the moving air. "Thank you," she says, and means it.`,
  ]},
]);

// ── immob.pref.position ───────────────────────────────────────
registerPool('immob.pref.position', [
  { when: { courtBoonTier: ['early'] }, text: [
    `She mentioned it once and you came back ready to fix it. She shifts as you adjust — finding it without effort now. "There," she says. "That's exactly it."`,
    `You caught it the first time she let on. She settles into the arrangement you've made. "You were listening," she says.`,
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    `She settles into the new arrangement — better, finally. She says "better" and closes her eyes.`,
    `"That's right," she says, once you've adjusted everything. She goes still in it. She has been waiting for this.`,
  ]},
]);

// ── immob.pref.food ───────────────────────────────────────────
// ctx fn — reads courtPreference from subject or globals.
registerPool('immob.pref.food', [
  { when: { courtBoonTier: ['early'] }, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const taste = { sweet: 'the sweets', savory: 'the savory spread', spicy: 'the heat', volume: 'the volume' }[pref] || 'what you brought';
      return `She accepts what you've brought and eats with an ease that hasn't been there in weeks. You heard her early. ${taste === 'what you brought' ? 'This was right.' : `${taste} — right.`} She knew what she wanted.`;
    },
  ]},
  { when: { courtBoonTier: ['standard'] }, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const taste = { sweet: 'sweets', savory: 'something savory', spicy: 'the spice', volume: 'the volume' }[pref] || 'what she asked for';
      return `She takes what you've brought — ${taste}, finally — and eats with quiet satisfaction. "Yes," she says. "Like that."`;
    },
  ]},
]);
