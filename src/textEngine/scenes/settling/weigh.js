// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling weigh-in — you go to HER. She cannot mount a scale; she cannot
// come to the office. Load-cell pads worked under where she rests do the
// reading. Stage 10: she can still shift a few inches to help. Stage 11:
// she cannot help at all, and the text says so plainly.
import { registerPool } from '../../engine.js';

// ── set.weigh.travel ──────────────────────────────────────────
// Shape: FULL SENTENCE. You cross to her. She does not arrive anywhere.
registerPool('set.weigh.travel', [
  { when: {}, text: [
    `It's weigh-day, so you go to her — kit under your arm, down the hall to the room she doesn't leave. She's exactly where she always is.`,
    `You bring the scale to {subject.name} now, not the other way around. She hasn't fit through the office door in a long time. You find her where she rests.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `Weigh-day means a walk to her room and a cartload of gear. {subject.name} doesn't come anywhere anymore. You go to her, and she's waiting, because there's nowhere else she could be.`,
    `You haul the load-cell rig down to where she rests. She used to meet you at a scale in the office; that's years of appetite behind her now. The whole apparatus travels to her.`,
  ]},
]);

// ── set.weigh.rig ─────────────────────────────────────────────
// Shape: FULL SENTENCE. The mechanics of weighing someone who can't
// stand on anything. THIS is where immobility is non-negotiable.
registerPool('set.weigh.rig', [
  { when: {}, text: [
    `There's no stepping onto anything. You work the flat load pads under the parts of her that carry the most, one at a time, and let the readout total what the floor's held all week.`,
    `No scale would take her standing, and there's no standing left in her anyway. So the scale comes to her: pads slid beneath her, the reading gathered from under her mass instead of over it.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `You work the first pad under her hip. She helps the only way she can — hips lifting a hand's width off the mattress — and even that costs her: a held breath, a flush, a sound as she settles back.`,
    `Seating the pads is a two-person job; her half is small and costly. "Ready," she says, and rocks what she can — a shoulder, a hip, an inch — while you slide the cells into the warm gaps beneath her.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `She can't help now, and you've both stopped pretending. You do all of it — lifting what must be lifted with your whole back, feeding the pads into the deep warm seams of her while she holds still.`,
    `There's no shifting left in her to offer. You seat every pad by hand, because she cannot lift a single part of herself off the surface she rests on. She just watches you work under the weight of her.`,
    `You get a shoulder under her lowest fold and take the weight long enough to slide the pad home. She doesn't move — she can't — she only breathes, warm and enormous, while your hands do her share.`,
  ]},
]);

// ── set.weigh.number ──────────────────────────────────────────
// Shape: FULL SENTENCE. The reading. The number is ALWAYS stated.
registerPool('set.weigh.number', [
  { when: {}, text: [
    `The pads settle, sum, and hold: {subject.lbs} pounds. You read it out. She likes it read out.`,
    `The readout climbs across the linked cells and stops. {subject.lbs}. You say the number; she takes it in.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `The cells total up and lock: {subject.lbs} pounds, more than last time. "Say it," she says, so you do. She's gained {subject.semesterGain} since the office could still hold her.`,
    `{subject.lbs} pounds, once everything under her is accounted for. You tell her the number. She's up again — always up — {subject.semesterGain} past where she started, and climbing.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `The linked cells resolve the whole enormous sum of her: {subject.lbs} pounds. You read it aloud — {subject.semesterGain} over her starting weight, most of it earned since she stopped walking.`,
    `{subject.lbs}. It takes the whole rig to arrive at it, every pad reporting a share of her. You say it out loud: {subject.semesterGain} pounds of her now, and no ceiling in sight.`,
  ]},
]);

// ── set.weigh.react ───────────────────────────────────────────
// Shape: DIALOGUE BEAT / reaction. Persona (studentId, weight 4) pooled
// with corruption generics.
registerPool('set.weigh.react', [
  { when: {}, text: [
    `She lets the number settle over her, warm and satisfied, and doesn't ask you to round it down.`,
    `"More than last time," she says, like it's the only result worth having. It is, to her.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `She's quiet with it for a second — the size of the number, the fact of needing a rig to find it. Then something in her settles toward pleased. "Okay," she says softly. "Good."`,
    `She colors a little at the total, still not used to being this much. But she doesn't look away from it, and she doesn't ask you to stop coming to weigh her.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `"Good," she says, flatly, factually — the number's up, the number's supposed to be up, the rig is just how you find out now. She's made her peace with all of it.`,
    `She takes the number the way she takes everything now: as information about what she's becoming. "Keep the pads," she says. "We'll need them next week too."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"That's the number," she says about herself, pleased down to the foundation. "Bigger than the rig expected. Buy a rig that expects more."`,
    `She receives the total like a scoreboard reading in her favor. "Higher next time," she says, giving it as an instruction, and settles deeper into the pads.`,
  ]},
  // Persona: Maya (id 8) — few words, all load-bearing.
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya listens to the number, closes her eyes, and says the only word she ever really needs. "More."`,
    `"{subject.lbs}," Maya repeats, testing the weight of it in her mouth. Then, satisfied: "Good number. Home."`,
  ]},
  // Persona: Kylie (id 2) — everything is content.
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie is already narrating it. "New personal record, and you needed FOUR sensors to find it. That's the post. That's literally the whole post."`,
  ]},
]);

// ── set.weigh.approach — panel 1 skeleton (travel + rig + scale) ─
registerPool('set.weigh.approach', [
  { when: {}, text: [`{set.weigh.travel} {set.weigh.rig}{set.enorm|prefix: }`] },
]);

// ── set.weigh.result — panel 2 skeleton (number + reaction) ────
registerPool('set.weigh.result', [
  { when: {}, text: [`{set.weigh.number} {set.weigh.react}`] },
]);
