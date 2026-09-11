// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A6 Slender
// Pass 9 — device use/malf/mod/campus, leftover stream, Phase D parents.
import { registerModuleVariants } from '../engine.js';

// ── device use (verb / clause shapes) ─────────────────────────
registerModuleVariants('device.use.action', [
  { when: { studentId: 13, actionId: 'tighten_pulse' }, weight: 5, text: [
    'Talia cinches the {device.label} like a calibration she already approved',
  ] },
  { when: { studentId: 5, actionId: 'burst_feed' }, weight: 5, text: [
    'the feeder dumps a burst into Destiny while she stays seated for it',
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    'the {device.label} works Kylie in footage-ready increments',
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    'the {device.label} runs on {subject.name} while she still calls it optional',
  ] },
]);
registerModuleVariants('device.use.sensation', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya goes quiet and takes the warmth without decorating it',
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé files the pressure as data, then forgets to stay clinical',
  ] },
  { when: { mood: 'curious' }, weight: 3, text: [
    'she keeps a hand on the change like she is checking a result',
  ] },
]);
registerModuleVariants('device.use.effect', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany\'s seams report the cycle before she does',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'the gain shows and she looks pleased about the showing',
  ] },
]);
registerModuleVariants('device.use.context', [
  { when: { studentId: 13 }, weight: 5, text: [
    'the lab smells like warm plastic and Talia\'s satisfaction',
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'she wants the result and also wants the door closed',
  ] },
]);

registerModuleVariants('device.malf.open', [
  { when: { studentId: 13 }, weight: 5, text: [
    'the {device.label} overruns Talia\'s spec and she watches like a proud author',
  ] },
  { when: { malfunctionTier: 'critical' }, weight: 3, text: [
    'the {device.label} refuses the stop command and keeps feeding {subject.name}',
  ] },
]);
registerModuleVariants('device.malf.consequence', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie keeps the camera on the glitch like it was the bit',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny calls the extra swell a free buff and stays in the chair',
  ] },
]);
registerModuleVariants('device.malf.sensation', [
  { when: { mood: 'content' }, weight: 3, text: [
    'warm stretch arriving faster than the profile promised',
  ] },
  { when: { gainStance: 'reluctant' }, weight: 3, text: [
    'a surge she pretends to resent while her hands stay on it',
  ] },
]);

registerModuleVariants('device.mod.open', [
  { when: { studentId: 13 }, weight: 5, text: [
    'Talia seats {device.componentLabel} like she is signing her name in hardware',
  ] },
]);
registerModuleVariants('device.mod.context', [
  { when: { studentId: 13 }, weight: 5, text: [
    'next cycle will feel like her handwriting',
  ] },
]);

registerModuleVariants('device.campus.remote', [
  { when: { studentId: 2 }, weight: 5, text: [
    'the pulse finds Kylie between takes — she keeps filming anyway',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany feels it mid-drill and treats it like a new play-call',
  ] },
]);
registerModuleVariants('device.campus.class', [
  { when: { studentId: 6 }, weight: 5, text: [
    'the hall takes the pulse; Tiffany already has snacks for the aftermath',
  ] },
]);
registerModuleVariants('device.campus.context', [
  { when: { studentId: 13 }, weight: 5, text: [
    'Talia\'s catalog leaves the lab and still sounds like her',
  ] },
]);

registerModuleVariants('campus.dev.vulnerability', [
  { when: { studentId: 2 }, weight: 5, text: [
    'checking the lighting, back turned, already composing the next clip',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'reading with her guard down, mouth slightly open',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'seated, headset on, the chair already doing half the hiding',
  ] },
]);
registerModuleVariants('campus.dev.reaction', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany swears once, then files it under later',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Chloé mutters in French and keeps walking toward food',
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'she pretends nothing happened and checks her waistband in a window',
  ] },
]);

// ── leftover stream ───────────────────────────────────────────
registerModuleVariants('stream.roundStart', [
  { when: { studentId: 5, challengeType: 'endurance' }, weight: 5, text: [
    'Long sit. I already picked the chair. Let\'s go.',
  ] },
  { when: { studentId: 5, challengeType: 'speed' }, weight: 5, text: [
    'Fast round. No thinking. Tray first.',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'Overlay\'s on. I\'m softer than last VOD. Deal with it, chat.',
  ] },
]);
registerModuleVariants('stream.endStream.average', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Mid stream, mid tray. I\'m still sitting. That counts.',
  ] },
]);
registerModuleVariants('stream.endStream.poor', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Rough VOD. I\'m logging off from this chair. Don\'t clip the stand.',
  ] },
]);
registerModuleVariants('stream.tapOut.stamina', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Hands are done. Belly is not. I\'m tapping.',
  ] },
]);
registerModuleVariants('stream.tapOut.performance', [
  { when: { studentId: 5 }, weight: 5, text: [
    'I\'m ending it before chat turns the struggle into a compilation.',
  ] },
]);
registerModuleVariants('stream.chat.brand.velvetmelt', [
  { when: {}, weight: 3, text: [
    'velvetmelt really said sit and swell',
    'the melt arc is the content',
  ] },
]);
registerModuleVariants('stream.chat.brand.crunchforge', [
  { when: {}, weight: 3, text: [
    'crunchforge buffed her hitbox lmao',
    'she\'s tanking snacks like a raid boss',
  ] },
]);

// ── Phase D parent hubs (unique extras, under 200) ────────────
registerModuleVariants('diary.competitive_gainer.s5', [
  { when: {}, weight: 4, text: [
    'I pinned the gap after dinner. Brittany\'s number sat under mine. I ate to keep it there.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s5', [
  { when: {}, weight: 4, text: [
    'Workshop log: belt hummed, belly answered, I called it a clean run and kept the printout.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s5', [
  { when: {}, weight: 4, text: [
    'I hosted myself. The guest list was one plate and the girl who finished it.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s5', [
  { when: {}, weight: 4, text: [
    'The work is appetite. I hung it at belly height so nobody could pretend they missed it.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s5', [
  { when: {}, weight: 4, text: [
    'Dose logged. Side effect: I wanted the second scoop and wrote that down too.',
  ] },
]);
registerModuleVariants('diary.competitive_gainer.s8', [
  { when: {}, weight: 4, text: [
    'Leaderboard night. I sat wider and called the chair friction a win condition.',
  ] },
]);
registerModuleVariants('diary.machine_goddess.s8', [
  { when: {}, weight: 4, text: [
    'I tightened a strap and loosened a waistband in the same hour. Repeatable.',
  ] },
]);
registerModuleVariants('diary.salon_appetit.s8', [
  { when: {}, weight: 4, text: [
    'The room came to me. I approved the seating chart with a nod and another plate.',
  ] },
]);
registerModuleVariants('diary.artisan_gallery.s8', [
  { when: {}, weight: 4, text: [
    'Viewers had to look up. I painted the overflow and then became it.',
  ] },
]);
registerModuleVariants('diary.pharmacist.s8', [
  { when: {}, weight: 4, text: [
    'The compound worked. I am the proof, and I keep taking the proof home.',
  ] },
]);
