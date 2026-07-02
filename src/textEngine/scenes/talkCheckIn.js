// The Squad — Lead: A2 Psych | Support: A1 Mobile, A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// SCENE: TALK — "Check in", slot-composed (MIGRATION.md).
// Body beats decomposed to word-granular skeletons (Phase 6,
// WORD_GRANULAR_ENGINE_PLAN): settle core × garment clause × touch
// beat, keyed on stage bands, psych tiers, and garment fit dims.
// Replaces check_in tier pools in gameData/talkDialogue.js.
// Week-aware clothes beat fixes early-semester contradiction.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';
import '../modules.js';

// ── talk.checkIn.greetQuote — DIALOGUE BEAT
registerPool('talk.checkIn.greetQuote', [
  { when: {}, text: [
    `"Oh — hi, Professor."`,
    `"Hi, Professor."`,
    `"Good to see you,"`,
    `"Hey, Professor."`,
  ] },
]);

// ── talk.checkIn.greetBeat — FULL SENTENCE
registerPool('talk.checkIn.greetBeat', [
  { when: {}, text: [
    `{subject.name} tucks a strand of hair back and glances at the snack stash she's been pretending isn't hers.`,
    `{subject.name} smiles, a little guarded, and sets down whatever she was holding.`,
    `{subject.name} looks up, caught mid-snack, and does not bother hiding it.`,
    `{subject.name} says, and sounds like she means it.`,
  ] },
]);

// ── talk.checkIn.greetClose — DIALOGUE BEAT
registerPool('talk.checkIn.greetClose', [
  { when: {}, text: [
    `"I'm good. Busy. Hungry, kind of constantly, which is — anyway." She laughs once, embarrassed. "Good. I'm good."`,
    `"Things are fine. Classes are fine."`,
    `"I'm okay. Hungry, but okay."`,
    `"I'm good," she adds, a beat late.`,
  ] },
]);

// ── talk.checkIn.dining — FULL SENTENCE
registerPool('talk.checkIn.dining', [
  { when: {}, text: [
    `Her hand drifts to her waist, thumb hooking the waistband.`,
    `She glances at the snacks within reach.`,
    `"The dining hall and I are on better terms lately," she admits.`,
    `Her eyes flick to food before they return to you.`,
  ] },
]);

// ── talk.checkIn.diningLine — DIALOGUE BEAT
registerPool('talk.checkIn.diningLine', [
  { when: {}, text: [
    `"The dining hall got better, did you notice? Or I did. One of those."`,
    `"I've been eating more," she says, like it is weather. "It agrees with me."`,
    `"I keep finding reasons to be hungry," she murmurs.`,
    `"Better portions lately," she says. "Or better appetite."`,
  ] },
]);

// ── talk.checkIn.clothes — FULL SENTENCE; week-aware
registerPool('talk.checkIn.clothes', [
  { when: { weekMax: 1 }, text: [
    `Her top tugs when she breathes. She adjusts without comment.`,
    `Something about the fit of her clothes looks newly unfamiliar to her.`,
    `Her waistband sits tighter than her posture suggests she planned.`,
    `She shifts and fabric pulls across her middle.`,
  ] },
  { when: { weekMin: 2, weekMax: 8 }, text: [
    `Her clothes fit like they belong to an earlier version of her.`,
    `Fabric pulls where it used to hang loose.`,
    `The semester has left evidence in seams and waistbands.`,
    `She shifts and you notice the snug fit at her hips.`,
  ] },
  { when: { weekMin: 9 }, text: [
    `Her clothes protest softly — seams long past their original job.`,
    `Her outfit looks like a memory of a smaller size.`,
    `She takes up more of the chair than her clothes were built for.`,
    `Every adjustment admits the semester has been generous.`,
  ] },
  { when: {}, text: [
    `Her clothes tell a story she may not be ready to read aloud.`,
    `Fabric pulls where softness has arrived.`,
    `She adjusts her top without meeting your eyes.`,
    `She shifts and the fit looks honest, if snug.`,
  ] },
]);

// ── talk.checkIn.clothesNote — FULL SENTENCE; week-aware nuance
registerPool('talk.checkIn.clothesNote', [
  { when: { weekMax: 1 }, text: [
    `She hasn't noticed you noticing. Or she's pretending not to.`,
    `She does not comment on the tug.`,
    `She keeps talking as if the fit is still theoretical.`,
    ``,
  ] },
  { when: { weekMin: 2 }, text: [
    `She hasn't noticed you noticing. Or she's pretending not to.`,
    `She changes the subject before you can name it.`,
    `She carries the new softness like a secret.`,
    ``,
  ] },
  { when: {}, text: [
    ``,
    `She does not ask what you see.`,
    `She lets the silence hold.`,
    ``,
  ] },
]);

// ── talk.checkIn.earlyWeight — FULL SENTENCE
registerPool('talk.checkIn.earlyWeight', [
  { when: { stageMax: 3 }, text: [
    `At {subject.lbs} lbs she could still call it a phase. She does not.`,
    `She's {subject.lbs} lbs now — still early enough to call it temporary. She doesn't.`,
    `The number is {subject.lbs} lbs. She changes the subject before you can comment.`,
    `She is {subject.lbs} lbs and still deciding what name to give it.`,
  ] },
  { when: {}, text: [
    `At {subject.lbs} lbs she takes up a little more space than she used to.`,
    `She's {subject.lbs} lbs now and no longer sounds surprised by it.`,
    `She carries {subject.lbs} lbs like a fact she is learning to keep.`,
    `The scale would say {subject.lbs} lbs. She does not bring it up.`,
  ] },
]);

// ── talk.checkIn.acceptOpen — DIALOGUE BEAT (tier 1)
registerPool('talk.checkIn.acceptOpen', [
  { when: {}, text: [
    `"Better now," {subject.name} says, and means the company, or possibly the snacks you tend to bring. Probably both.`,
    `"I'm not fighting it anymore," she admits, quieter.`,
    `"Honestly? Really good."`,
    `"You helped," she says. "I know you helped. I'm not mad about it."`,
  ] },
]);

// ── talk.checkIn.bodySettle — SENTENCE CORE (no terminal period)
// How she settles into the office chair; stage-banded so the same beat
// scales from soft to room-filling. (Phase 6 decomposition of the old
// flat acceptBody — WORD_GRANULAR_ENGINE_PLAN.)
registerPool('talk.checkIn.bodySettle', [
  { when: {}, text: [
    'She settles deeper into her chair',
    'She lets the chair take her weight',
    'She makes herself comfortable by degrees',
  ] },
  { when: { stageMin: 2, stageMax: 4 }, text: [
    'She curls into the chair, new softness folding easily around her',
    'She sits back, rounder than last month and easier about it',
    'She tucks herself into the seat{word.adv.pace|prefix: }',
  ] },
  { when: { stageMin: 5, stageMax: 7 }, text: [
    'She eases down — the chair creaks once — and spreads to fill it',
    'She lowers herself{word.adv.pace|prefix: } and lets her body find its arrangement',
    'She settles, and the chair reports every generous pound of the settling',
  ] },
  { when: { stageMin: 8, stageMax: 9 }, text: [
    'She takes the reinforced chair with practiced economy',
    'Settling is a project now; she manages it with unhurried grace',
    'She descends into the seat in stages, each one soft and certain',
  ] },
  { when: { stageMin: 10 }, text: [
    'She is already settled — these days the room arranges itself around her',
    'She shifts her mass by degrees until everything rests where it wants to',
    'Sitting is a state she inhabits rather than an act she performs',
  ] },
]);

// ── talk.checkIn.bodyTouch — FULL SENTENCE — her hands on the change.
// Psych-shaded per the AUTHORING.md register convention.
registerPool('talk.checkIn.bodyTouch', [
  { when: {}, text: [
    'She runs her palm along the curve of her belly through her top.',
    'Her hands find the new territory without embarrassment.',
    'She rests both hands on her middle like it answered a question.',
  ] },
  { when: { shameTierMin: 2 }, weight: 2, text: [
    'She smooths her top down, then stops pretending that was about wrinkles.',
    'Her arms settle over her middle — half shield, half acknowledgment.',
  ] },
  { when: { fixationTierMin: 2 }, weight: 2, text: [
    'Her thumb hooks the waistband for a private check she thinks you miss.',
    'Her fingers return to the soft crest of her belly the way a tongue finds a loose tooth.',
  ] },
  { when: { corruption: [1], stageMin: 5 }, weight: 2, text: [
    'She traces where her belly rests on her lap, matter-of-fact, almost fond.',
    'She pats the widest part of herself once, a greeting between old colleagues.',
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    'She strokes the round of her belly slowly, for her own pleasure and your attention, in that order.',
  ] },
]);

// ── talk.checkIn.acceptBody — SKELETON (tier 1)
// Composes settle core + garment clause + touch beat; the strongest of the
// old flat lines survive as SENT fallbacks so nothing is lost.
registerPool('talk.checkIn.acceptBody', [
  { when: {}, text: [
    '{talk.checkIn.bodySettle}, {word.garment.waist}.',
    '{talk.checkIn.bodySettle}, {word.garment.bottom}. {talk.checkIn.bodyTouch}',
    '{talk.checkIn.bodySettle}. {talk.checkIn.bodyTouch}',
    '{talk.checkIn.bodyTouch}',
    `At {subject.lbs} lbs she takes up more of the office than she used to.`,
    `Her thighs press together when she crosses her legs; her belly rounds when she leans back.`,
  ] },
]);

// ── talk.checkIn.acceptClose — DIALOGUE BEAT (tier 1)
registerPool('talk.checkIn.acceptClose', [
  { when: {}, text: [
    `"The hunger, the weight, all of it. It feels… honest."`,
    `"I used to hold my breath around this stuff. I don't anymore."`,
    `"I've stopped fighting myself about… most things."`,
    `She meets your eyes without flinching.`,
  ] },
]);

// ── talk.checkIn.ownedOpen — DIALOGUE BEAT (tier 2)
registerPool('talk.checkIn.ownedOpen', [
  { when: {}, text: [
    `{subject.name} lights up the moment she sees you. "I was hoping you'd come by. Sit. Watch me finish this."`,
    `"I'm wonderful," {subject.name} says simply.`,
    `"Talk to me," she murmurs. "Or don't. Just stay a while."`,
    `"I saved you the good stuff," she says. "Well. I saved some of it."`,
  ] },
]);

// ── talk.checkIn.ownedGesture — SENTENCE CORE (no terminal period)
// The display move; corruption-2 register, stage-banded.
registerPool('talk.checkIn.ownedGesture', [
  { when: {}, text: [
    'She pats the seat beside her like granting an audience',
    'She arranges herself to be admired and waits for you to catch up',
    'She spreads her hands over the warm round of her belly',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'She leans back so the full soft geography of her is on display',
    'She stretches, deliberate, letting every curve state its case',
  ] },
  { when: { stageMin: 8 }, text: [
    'She presides from the chair the way weather presides over a valley',
    'She lifts her chin and lets the sheer fact of herself do the greeting',
  ] },
]);

// ── talk.checkIn.ownedTable — FULL SENTENCE — the standing feast.
registerPool('talk.checkIn.ownedTable', [
  { when: {}, text: [
    'Pastries, takeout, and something warm still steaming wait within reach.',
    'The desk beside her is a small economy of snacks in various states of surrender.',
    'A box of something rich sits open at her elbow, clearly not her first.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'She keeps one hand in a bakery box while she talks, unwilling to choose between you and it.',
  ] },
]);

// ── talk.checkIn.ownedSpread — SKELETON (tier 2)
registerPool('talk.checkIn.ownedSpread', [
  { when: {}, text: [
    '{talk.checkIn.ownedGesture}, {word.garment.top}.',
    '{talk.checkIn.ownedGesture}. {talk.checkIn.ownedTable}',
    '{talk.checkIn.ownedGesture}, {word.garment.waist}.',
    `At {subject.lbs} lbs she is plush and present and completely unashamed.`,
  ] },
]);

// ── talk.checkIn.ownedClose — DIALOGUE BEAT (tier 2)
registerPool('talk.checkIn.ownedClose', [
  { when: {}, text: [
    `"I'm fed, I'm growing, and you're here. List complete."`,
    `Her thighs spread wide in the chair; her breathing is easy; her smile is real.`,
    `She says it without performance. Without asking if it's okay.`,
    `Her body has grown into the invitation.`,
  ] },
]);

// ── talk.interior.aside — INTERIOR BEAT (optional, ~50% hit rate via empty variants)
// Shape: SHORT SENTENCE or empty string — a stray thought that surfaces
// during conversation without being announced. Reads as her inner life
// leaking through, not a readout. Wildcard fallback must include empty
// strings so roughly half the time it stays silent (natural conversation).
registerPool('talk.interior.aside', [
  // Mandatory fallback with empty options — keeps the pool optional.
  { when: {}, text: ['', '', ''] },

  // A6 Slender — early gain, awareness still tentative
  { when: { corruption: [0], stageMin: 1, stageMax: 3 }, weight: 2, text: [
    `She pauses mid-sentence, her hand finding the waistband of her jeans before she catches herself.`,
    `Something crosses her face — not quite worry, not quite the opposite of worry — and vanishes.`,
    '',
  ]},
  { when: { corruption: [0], stageMin: 2, stageMax: 4 }, weight: 2, text: [
    `She loses the thread for a half-beat, gaze dropping to her lap. She finds it again. "Anyway."`,
    `Her hand stills on the hem of her top. She doesn't seem to notice she's holding it.`,
    '',
  ]},

  // A1 Mobile — mid-stage awareness, more body comfort
  { when: { corruption: [1], stageMin: 3, stageMax: 6 }, weight: 2, text: [
    `She shifts in her seat and her belly presses forward against her top, and she notices, and doesn't move.`,
    `She half-smiles at something that wasn't said. Her weight settles warm in the chair.`,
    '',
  ]},
  { when: { corruption: [1], stageMin: 5, stageMax: 8 }, weight: 2, text: [
    `She spreads her hands over her thighs as she talks, unhurried, like checking in on something she trusts.`,
    `Her attention drifts for one second — just long enough to feel the pull of wanting something — then comes back.`,
    '',
  ]},

  // A2 Psych — ownership, body as fact
  { when: { corruption: [2], stageMin: 4 }, weight: 3, text: [
    `She lets the silence sit. Her body fills the chair the way she fills any room now — completely, without apology.`,
    `Something warm and certain settles in her expression before she goes on. Like a private agreement she just made.`,
    '',
  ]},
  { when: { corruption: [2], stageMin: 7 }, weight: 3, text: [
    `She catches your eye and holds it a beat longer than the conversation asks for.`,
    `Her breathing slows for just a moment. Her body takes up so much of the room, and she knows it, and the knowing is a kind of pleasure.`,
    '',
  ]},
]);

// ── talk.check_in — corruption-tier skeletons
registerPool('talk.check_in', [
  { when: { corruption: [0] }, priority: 1, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.greetQuote} {talk.checkIn.greetBeat} {talk.checkIn.greetClose}\n\n{talk.checkIn.clothes}{talk.checkIn.clothesNote|prefix: }{talk.interior.aside|prefix:\n\n}',
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.greetQuote} {talk.checkIn.greetBeat}\n\n{talk.checkIn.dining} {talk.checkIn.diningLine}\n\n{talk.checkIn.earlyWeight}{talk.interior.aside|prefix:\n\n}',
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.greetQuote} {talk.checkIn.greetBeat} {talk.checkIn.greetClose}\n\n{talk.checkIn.clothes}{talk.checkIn.clothesNote|prefix: }\n\n{talk.checkIn.earlyWeight}',
  ] },
  { when: { corruption: [1] }, priority: 1, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.acceptOpen}\n\n{talk.checkIn.acceptBody}{talk.interior.aside|prefix:\n\n}\n\n{talk.checkIn.acceptClose}',
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.acceptOpen} {talk.checkIn.acceptBody}{talk.interior.aside|prefix:\n\n}',
  ] },
  { when: { corruption: [2] }, priority: 1, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.ownedOpen}\n\n{talk.checkIn.ownedSpread}{talk.interior.aside|prefix:\n\n}\n\n{talk.checkIn.ownedClose}',
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.ownedOpen} {talk.checkIn.ownedSpread}{talk.interior.aside|prefix:\n\n}',
  ] },
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.checkIn.greetQuote} {talk.checkIn.greetBeat}',
  ] },
]);
