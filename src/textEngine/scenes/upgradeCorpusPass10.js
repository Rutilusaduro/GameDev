// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A6 Slender
// Pass 10 — device unique, leftover stream chat, group dinner, slender depth.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('device.unique.open', [
  { when: { studentId: 13 }, weight: 5, text: [
    'Talia watches two rigs share {subject.name} like a proof she authored',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'the stack hits Destiny in the chair — she calls it a stacked buff',
  ] },
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie keeps the camera on the overlap like the combo was the bit',
  ] },
  { when: { uniqueTag: 'device_synergy_feeder_paste' }, weight: 3, text: [
    'paste and feeder lock a schedule on {subject.name} she does not argue with',
  ] },
]);
registerModuleVariants('device.unique.synergy', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé would log the overlap as yield. {subject.name} just feels it',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'the combo writes extra softness into the same hour and she likes the math',
  ] },
]);
registerModuleVariants('device.unique.sensation', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya goes quiet between the two pressures and stays there',
  ] },
  { when: { mood: 'curious' }, weight: 3, text: [
    'she keeps a hand on both kinds of swell like she is checking a result',
  ] },
]);
registerModuleVariants('device.unique.context', [
  { when: { studentId: 13, stageMin: 7 }, weight: 5, text: [
    'Talia notes the room getting smaller and does not call it a problem',
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'she wants the stack and also wants the lab door closed',
  ] },
]);

registerModuleVariants('stream.chat.perf.excellent', [
  { when: {}, weight: 3, text: [
    'she\'s sitting like the chair paid her',
    'hitbox got buffed mid-stream lmao',
  ] },
]);
registerModuleVariants('stream.chat.perf.good', [
  { when: {}, weight: 3, text: [
    'she\'s keeping the tray honest',
    'soft save and she\'s still going',
  ] },
]);
registerModuleVariants('stream.chat.perf.average', [
  { when: {}, weight: 3, text: [
    'mid tray mid vibe still seated',
    'she looks fuller than the starting overlay',
  ] },
]);
registerModuleVariants('stream.chat.scenario.eating', [
  { when: {}, weight: 3, text: [
    'the chew is the content',
    'another bite and chat loses it',
  ] },
]);
registerModuleVariants('stream.chat.scenario.struggling', [
  { when: {}, weight: 3, text: [
    'she\'s fighting the last third and it\'s winning cute',
    'packed and still talking like this is normal',
  ] },
]);
registerModuleVariants('stream.chat.brand.fizzpeak', [
  { when: {}, weight: 3, text: [
    'fizzpeak said chaos and she sat in it',
  ] },
]);
registerModuleVariants('stream.chat.brand.glazeco', [
  { when: {}, weight: 3, text: [
    'glazeco brat arc in 4k',
  ] },
]);
registerModuleVariants('stream.chat.parasocial.early', [
  { when: {}, weight: 3, text: [
    'we\'ve been here since the skinny overlay huh',
  ] },
]);
registerModuleVariants('stream.chat.tapOut.fullness', [
  { when: {}, weight: 3, text: [
    'belly won, VOD won, she\'s tapping',
  ] },
]);

registerModuleVariants('dinner.groupConv.get_them_talking.l1', [
  { when: { studentId: 0 }, weight: 5, text: [
    `You ask Brittany about the squad. She starts — and {ref.name} leans in like a bench player.`,
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    `You ask Maya about {dinner.groupTopic}. She starts small. {ref.name} still leans in.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.get_them_talking.l3', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya: "You never asked." No edge. Just fact, then another bite.`,
  ] },
  { when: { studentId: 1 }, weight: 5, text: [
    `Madeline: "You never asked." She footnotes it with a forkful.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.compliment_both.l1', [
  { when: { studentId: 2 }, weight: 5, text: [
    `You tell them they both look good. Kylie already has the angle. {ref.name} pretends not to pose.`,
  ] },
  { when: { studentId: 6 }, weight: 5, text: [
    `You compliment the table. Tiffany hosts the praise and passes the bread.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.order_for_table.l1', [
  { when: { studentId: 14 }, weight: 5, text: [
    `You order another round. Mary Jane sounds like the kitchen already agreed.`,
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    `You order for the table. Chloé says yes in English on purpose.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.let_it_settle.l2', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya lets the quiet finish the compliment. Then she eats.`,
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    `Lilith lets the silence hunt. {ref.name} reaches for bread anyway.`,
  ] },
]);
registerModuleVariants('dinner.groupConv.toast_together_group.l1', [
  { when: { studentId: 6 }, weight: 5, text: [
    `Tiffany lifts first. Chapter policy: glasses up, plates not empty.`,
  ] },
]);

registerModuleVariants('slender.bodyNotice', [
  { when: { studentId: 0, stageMax: 3 }, weight: 5, text: [
    'captain lines still there, fabric sitting a fraction less obedient',
  ] },
  { when: { studentId: 8, stageMax: 3 }, weight: 5, text: [
    'Maya still reads small until you look twice at the waistband',
  ] },
  { when: { studentId: 7, stageMax: 3 }, weight: 5, text: [
    'Priya still gold-star slim, a softness she has not footnoted yet',
  ] },
]);
registerModuleVariants('slender.secret', [
  { when: { studentId: 0, gainStance: 'secret' }, weight: 5, text: [
    'Brittany files the extra bite under later and keeps her chin up',
  ] },
  { when: { studentId: 8, gainStance: 'secret' }, weight: 5, text: [
    'Maya does not name it. The second helping names it for her',
  ] },
]);
registerModuleVariants('slender.deflect', [
  { when: { studentId: 0, gainStance: 'opposed' }, weight: 5, text: [
    `"Don't read the roster," she says, already reaching for the plate.`,
  ] },
  { when: { studentId: 7, gainStance: 'reluctant' }, weight: 5, text: [
    `"Variance," Priya says, and then takes another bite anyway.`,
  ] },
]);
