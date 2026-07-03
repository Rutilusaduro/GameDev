// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Leviathan (stage 11) immobility overrides for intimacy arrival beats, plus
// the pin blackout pool. At stage 11 she cannot lower herself, cannot roll,
// cannot climb — so the arrival beats say so, and YOU do the positioning.
//
// Overrides use registerModuleVariants + priority:1: in pool mode a matching
// priority:1 variant hard-gates out every priority:0 base variant, so at
// stage 11 the immobile beat replaces the mobile one cleanly; below 11 it
// never matches and the base pool is untouched.
import { registerPool, registerModuleVariants } from '../../engine.js';

// ── Immobile arrival — "her weight on you" at leviathan ────────
// Shape: FULL SENTENCE. She can't lower herself; you position, her mass eases
// over you, and once it's down it stays.
registerPool('intimacy.immob.herWeight.arrive', [
  { when: {}, text: [
    `There's no lowering herself onto anyone now — she can't move like that. You settle against her and ease a share of her weight over your lap. Once it arrives, it stays, and so do you.`,
    `She can't come down onto you; that kind of moving is behind her. So you get into position and help work the warm mass of her over you, and once it's down, it's down.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"Get under me," she says, because she can't do the moving herself. You do, and help drag the warm weight of her over you until you're pinned beneath a fraction of her, going nowhere.`,
  ]},
]);

// ── Immobile arrival — "under her" at leviathan ───────────────
registerPool('intimacy.immob.underHer.arrive', [
  { when: {}, text: [
    `She can't roll onto you — there's no rolling left in her. You work underneath instead, easing beneath the overhang of her belly until her weight settles over you on its own.`,
    `There's no way for her to climb over you, so you go under her. You ease beneath her until she rests on you fully. Getting back out is hers to allow, not yours to manage.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She directs you under her with a look and a word. You slide beneath the vast warm overhang of her, and her weight comes down to keep you. You'll surface when she decides you do.`,
  ]},
]);

// Wire the overrides onto the generated arrival skeletons. priority:1 gates
// the base pool at stage 11 only.
registerModuleVariants('intimacy.her_weight.p0', [
  { when: { stageMin: 11 }, priority: 1, text: [`{intimacy.immob.herWeight.arrive}`] },
]);
registerModuleVariants('intimacy.under_her.p0', [
  { when: { stageMin: 11 }, priority: 1, text: [`{intimacy.immob.underHer.arrive}`] },
]);

// ── intimacy.blackout — the pin pass-out ──────────────────────
// Composed skeleton: you go under, then wake to a week gone.
registerPool('intimacy.blackout', [
  { when: {}, text: [`{intimacy.blackout.out} {intimacy.blackout.wake}`] },
]);

// Shape: FULL SENTENCE. Her mass over you takes your air; you black out.
registerPool('intimacy.blackout.out', [
  { when: {}, text: [
    `Her weight settles across your chest at the wrong angle, and the room goes soft, then dark. You don't feel yourself go under.`,
    `A shift of her mass presses the air out of you slow, and the edges of the room dim and fold. You're gone before you can say so.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `There's too much of her over you and not enough room to breathe under it. The light narrows to a point and closes. You go out without a sound.`,
  ]},
]);

// Shape: FULL SENTENCE. You wake, the week gone. Corruption shades her reaction.
registerPool('intimacy.blackout.wake', [
  { when: {}, text: [
    `You surface a long time later, still half beneath the warm mass of her, the light in the windows all wrong. Days went by while you were under. The week is simply gone.`,
    `You come back slowly, pinned and warm and disoriented, with no idea how long. Long enough. The week bled away while you were out cold beneath her.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `You come to with her watching you, mortified. "You stopped answering," she says, small. "I couldn't get off you to check." The whole week slipped past while you were out.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `You wake beneath her, hours or days on. She's unbothered. "You went under," she says, pleased. "I kept you warm. You missed the whole week." She does not sound sorry.`,
  ]},
]);
