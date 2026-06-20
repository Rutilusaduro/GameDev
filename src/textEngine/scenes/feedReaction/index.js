// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// FEED REACTION — the per-feed payoff beat for the everyday loop.
// Every routine feed (item, dinner dish, class action) now resolves
// to an in-voice reaction instead of a bare stat line, so the loop
// stops feeling silent and a donut stops reading like a banquet.
//
//   feed.react.beat  — how she eats THIS food at THIS fullness
//                      (foodKind × feedRoom × stage, lexicon-reused)
//   feed.react.line  — her reaction (per-girl studentId, weight 4,
//                      pooled with corruption/room-keyed generics)
//   feed.react       — composed skeleton "{beat} {line}"
//
// Custom selectors travel in via ctx.globals (engine default-case
// matches unknown `when` keys against ctx.globals):
//   foodKind ∈ sweet | hearty | drink | spread
//   feedRoom ∈ eager | filling | tight | past   (post-feed fullness)
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

// ── feed.react.beat ───────────────────────────────────────────
// Shape: FULL SENTENCE — the act of eating, shaded by what it is
// and how much room is left. Reuses {word.*} for body/fullness.
registerPool('feed.react.beat', [
  // Mandatory generic fallback — pool can never go silent.
  { when: {}, text: [
    'She settles into the food without ceremony, working through it bite after warm bite.',
    'She eats the way she always does once she starts — steady, unhurried, pleased.',
  ]},

  // ── foodKind ───────────────────────────────────────────────
  { when: { foodKind: 'sweet' }, weight: 2, text: [
    'She works through it in slow, melting bites, sugar gleaming on her lower lip before her tongue chases it.',
    'Rich and dense and sweet — she lets each forkful sit on her tongue a moment longer than she means to.',
  ]},
  { when: { foodKind: 'hearty' }, weight: 2, text: [
    'She digs in with real appetite, savory and warm, one forkful already loaded before the last one lands.',
    'It is heavy, comforting food and she leans into it, plate emptying faster than she expected.',
  ]},
  { when: { foodKind: 'drink' }, weight: 2, text: [
    'It goes down easy and sweet — cream and sugar she barely has to swallow, gone before she clocks how much.',
    'She tips it back without thinking, all those soft calories sliding down warm and unnoticed.',
  ]},
  { when: { foodKind: 'spread' }, weight: 2, text: [
    'She grazes across the spread without pausing, one rich thing leading straight into the next.',
    'There is too much to be polite about it; she just keeps reaching, helping herself to more of everything.',
  ]},

  // ── feedRoom (post-feed fullness) ──────────────────────────
  { when: { feedRoom: 'eager' }, weight: 2, text: [
    'There is plenty of room and she knows it — she eats like the meal is just getting started.',
    'Her appetite is well ahead of her stomach; she finishes and her eyes are already somewhere hungrier.',
  ]},
  { when: { feedRoom: 'filling' }, weight: 2, text: [
    'A pleasant heaviness settles in as she eats, warm and low, and she sinks a little deeper into her seat.',
    'You can watch it catch up to her — the bites slowing, a soft warmth spreading through her middle.',
  ]},
  { when: { feedRoom: 'tight' }, weight: 2, text: [
    `She slows, a hand drifting to her side where the waistband has started to press back. {word.fullness}.`,
    'The last few bites take effort, her breath going shallow and her belly snug against everything she is wearing.',
  ]},
  { when: { feedRoom: 'past' }, weight: 2, text: [
    `She takes it past the point of comfortable and keeps going, breath catching, both hands coming to rest on the taut curve of her belly. {word.fullness}.`,
    'It is more than she had room for and she finishes anyway, sitting back heavy and breathless, swollen tight and warm.',
  ]},

  // ── stage escalation — her whole body in it (reuse lexicon) ─
  { when: { stageMin: 5, feedRoom: 'past' }, weight: 3, text: [
    `By the end she is sunk back and spreading, {word.body} rising and falling with each slow breath, every part of her warm and full to the limit.`,
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    `Eating is a whole-body affair at her size now — {word.body}, her breath working, the chair taking all of her as she settles in to finish.`,
  ]},
]);

// ── feed.react.line ───────────────────────────────────────────
// Shape: DIALOGUE / BEHAVIOR BEAT — her response. Per-girl persona
// lines (studentId, weight 4) POOLED WITH corruption/room generics
// (weight 2, {subject.name}) so the beat tracks identity AND psyche.
registerPool('feed.react.line', [
  // Persona lines — heavy weight so they dominate for that girl.
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany licks her thumb clean and points it at you like a verdict. "Okay. That was annoyingly good."`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline finishes, considers the empty plate with mild scholarly surprise, and makes a small note to herself.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie catches the last bite on camera, narrating around a full mouth. "Okay this is unreal, you guys."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena clears it like it is part of training, then eyes what is left. "That all? I could go again."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona eats slow and dreamy, savoring the textures, already half-composing it into something she will paint later.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny doesn't look up from her phone, just keeps eating one-handed. "Mm. Good. Keep it coming."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany makes a delighted little noise and squeezes your arm. "Oh my god, okay, I'm obsessed, I need more of these."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya eats efficiently between tasks, barely breaking focus. "Good fuel. Faster than I expected. Noted."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya finishes quietly, sets the plate down, and gives you a small, satisfied look that says more than she will.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé dabs the corner of her mouth, unhurried and pleased. "Mm. I will admit — that one earns its place."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé eats with her eyes half-closed, deconstructing it as she goes. "Rich. Too rich. I'm having more."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee finishes with a warm, contented sigh and pats her middle. "That's exactly what I needed, thank you."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia observes her own eagerness with clinical interest even as she keeps eating. "Fascinating, how quickly the resistance goes."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy beams and goes back for more without being asked. "Mmh — it tastes just like home, I can't stop."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane clears the plate with sunny, farm-raised appetite. "Shoot, that didn't stand a chance. Got any more?"`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia eats faster than she wants to, a flush rising as the want outruns her. "I — I shouldn't be this hungry."`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `Talia eats one-handed over a blueprint, registering the pleasure a beat late. "Hm. Caloric density's excellent, actually."`,
  ]},

  // ── corruption / room generics — cover every girl, shade by psyche ─
  { when: { corruption: [0], feedRoom: 'eager' }, weight: 2, text: [
    `{subject.name} catches herself going back for more and pulls up short, cheeks warming. "That's — that's just because it's good."`,
  ]},
  { when: { corruption: [0], feedRoom: 'past' }, weight: 2, text: [
    `{subject.name} presses a hand flat to her swollen belly, flustered. "I did not mean to eat all of that."`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} finishes and lets herself want the next thing without arguing about it for once.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} doesn't apologize for any of it. She just holds your eye, satisfied, and reaches for more.`,
  ]},
  { when: { feedRoom: 'past' }, weight: 2, text: [
    `{subject.name} sits back, breath shallow, one hand resting on the warm tight curve of her belly. "Okay. Okay, that's — a lot."`,
  ]},

  // Mandatory generic fallback.
  { when: {}, text: [
    `{subject.name} finishes, warm and pleased, and looks up at you for whatever comes next.`,
  ]},
]);

// ── feed.react — composed skeleton ────────────────────────────
// Shape: SKELETON — stitches the two sub-pools. Never a paragraph.
registerPool('feed.react', [
  { when: {}, text: ['{feed.react.beat} {feed.react.line}'] },
]);

/**
 * Render the per-feed reaction beat.
 * @param student  the fed student (post-feed lbs/corruption are fine)
 * @param week     current week
 * @param opts.foodKind  sweet | hearty | drink | spread
 * @param opts.feedRoom  eager | filling | tight | past
 */
export function renderFeedReaction(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { foodKind: opts.foodKind || null, feedRoom: opts.feedRoom || null },
    ...opts,
  });
  return render('{feed.react}', ctx, { trace: opts.trace || null })?.trim() || '';
}

/** Categorize any feed into a foodKind from its label + cal/fullness profile.
 *  Word boundaries (\b) matter: "platter" contains "latte", so naive
 *  substring matching mis-reads a banquet as a drink. Spread/sweet are
 *  checked before drink so multi-item feasts win over stray collisions. */
export function foodKindFromFeed(label = '', calories = 0, fullnessCost = 0) {
  const l = String(label).toLowerCase();
  if (/\b(platter|banquet|crate|feast|spread|buffet|sampler|board)\b/.test(l)) return 'spread';
  if (/\b(cake|fudge|donut|doughnut|dozen|tart|pie|pastry|sweet|honey|chocolate|sugar|brownie|cookie|dessert)\b/.test(l)) return 'sweet';
  if (/\b(shake|latte|coffee|smoothie|cocoa|tea|drink|juice|soda)\b/.test(l)) return 'drink';
  if (/\b(lasagna|pasta|loaf|bread|stew|pizza|burger|roast|casserole|ramen|potluck|dinner|platter)\b/.test(l)) return 'hearty';
  // Profile fallback: thin liquids are drinks; very calorie-dense reads sweet.
  if (fullnessCost > 0 && fullnessCost <= 8) return 'drink';
  if (fullnessCost > 0 && calories / fullnessCost >= 260) return 'sweet';
  return 'hearty';
}

/** Band the post-feed fullness ratio into a feedRoom selector. */
export function feedRoomFromFullness(fullnessRatio = 0, forced = false) {
  if (forced || fullnessRatio >= 1) return 'past';
  if (fullnessRatio < 0.45) return 'eager';
  if (fullnessRatio < 0.8) return 'filling';
  return 'tight';
}
