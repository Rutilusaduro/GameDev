// Room visit beats — intro at the door + stage-keyed check-ins.
import './personas.js';
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getStage } from '../../../gameData/stages.js';
import '../dorm/index.js';
import '../proseOverhaul.js';

registerPool('room.visit.intro.lead', [
  { when: {}, text: [
    'You knock. The nameplate matches the roster. Time to make yourself known.',
    'The hall is quiet except for muffled music behind this door. You knock twice.',
    'Housing said meet everyone before midterms. This door is next on your list.',
  ] },
]);

registerPool('room.visit.stage.room', [
  { when: { leftoverFed: true, stageMax: 2 }, weight: 3, text: [
    'Snack shelf plus foil from the galley. Move-in week already eating overtime.',
    'The room still reads new. Last night\'s sitting is the part that does not.',
  ] },
  { when: { leftoverFed: true, stageMin: 3, stageMax: 5 }, weight: 3, text: [
    'The chair creaks on leftover heat. Wrappers and a tray share the bin.',
    'Her mirror angled away. Kitchen leftover still in the clothes on the chair.',
  ] },
  { when: { leftoverFed: true, stageMin: 6, stageMax: 8 }, weight: 3, text: [
    'Furniture migrated. Floor path from bed to fridge still warm from last night.',
    'The room rearranged around leftover sitting. Sturdier chair. Reachable food.',
  ] },
  { when: { leftoverFed: true, stageMin: 9 }, weight: 3, text: [
    'Doorway tighter. Inside, leftover heat made the nest. Reachable food, blankets, her.',
    'You stop in the threshold. Last night\'s tray is part of the architecture now.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'A desk, a bed, leftover foil she did not hide. The room smells like seconds.',
  ] },
  { when: {}, text: [
    'The room holds the usual student clutter — lived in, personal, hers.',
    'Posters, bedding, the small rituals of someone making a space home.',
    'A desk, a bed, the smell of whatever she ate last and did not hide.',
  ] },
  { when: { stageMax: 2 }, text: [
    'Posters, a narrow desk, clothes that still mostly fit the hangers.',
    'The room still reads like move-in week — except the snack shelf is already better stocked than the textbooks.',
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'The chair creaks when she shifts. Empty wrappers have started to colonize the trash bin.',
    'Her mirror is angled away from the bed. The closet door stays half open like it is working something out.',
  ] },
  { when: { stageMin: 6, stageMax: 8 }, text: [
    'Furniture has migrated to give her more space. The floor creaks in a path from bed to mini-fridge.',
    'The room has rearranged itself around her — wider clearances, sturdier chair, softer lighting.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The doorway feels tighter than it used to. Inside, everything substantial has been pushed toward the walls to make a nest.',
    'You stop in the threshold out of habit. The room is built around her now — blankets, pillows, reachable food.',
  ] },
]);

registerPool('room.visit.stage.beat', [
  { when: {}, text: [
    `{subject.name} makes room for you. "Thanks for checking in, {ra.name}."`,
    `"You're good to me," she says. "{ra.name}. Don't think I haven't noticed."`,
    `She pats the chair beside her. "Sit. Tell me what the rest of the floor is up to."`,
  ] },
  { when: { stageMin: 3, stageMax: 4 }, text: [
    `{subject.name} laughs when she catches you looking. "Yeah. It's new. Don't make it a thing, {ra.name}."`,
    `She runs a hand over her hip, thoughtful. "The scale and I are in negotiations. You didn't hear that."`,
  ] },
  { when: { stageMin: 5, stageMax: 6 }, text: [
    `{subject.name} pats the chair beside her. "I cleared space. Sit. I want to show you what this week did."`,
    `"You're going to notice," she says, not quite shy. "I want you to notice, {ra.name}."`,
  ] },
  { when: { stageMin: 7 }, text: [
    `She doesn't get up — doesn't need to. "{ra.name}." Her voice is warm, heavy with satisfaction. "Look what your hall did to me."`,
    `The room smells like lotion and something sweet. {subject.name} smiles like the walls are in on the secret.`,
    `"Door's always open for you," she murmurs. "{ra.name}. You know that by now."`,
  ] },
]);

registerPool('room.visit.ambient', [
  { when: {}, text: [
    'You linger in the doorway a minute. The room is quiet — lived in, familiar.',
    `{subject.name} waves you in. "Nothing urgent. I just like when you stop by, {ra.name}."`,
    `Same posters, same chair, same girl — but the air between you feels settled now.`,
    `She left the chair pulled out. You are expected.`,
  ] },
]);

registerPool('room.visit.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'She stands at the door. Leftover foil still on the shelf she half-hid.',
    'She covers the snack shelf, then leaves a corner of last night showing.',
  ] },
  { when: { leftoverFed: true, stageMin: 7 }, weight: 3, text: [
    'The threshold keeps leftover heat after you step back into the hall.',
    'She does not get up. Kitchen sitting plus this visit. The room is built around staying.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'The hall smells like leftover and whatever she just finished.',
  ] },
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She stands a little too long at the door after you turn to go, like the room got quieter.',
    'She covers the snack shelf with a textbook, then leaves a corner showing.',
  ] },
  { when: { stageMin: 7 }, weight: 2, text: [
    'The threshold keeps a little of her warmth after you step back into the hall.',
    'She does not get up to see you out. The room is built around staying.',
  ] },
  { when: {}, text: [
    'You leave the door a little open. She does not close it.',
    'The hall smells like whatever she just finished.',
    'Her chair still holds the shape of her when you look back.',
  ] },
]);

export function renderRoomVisitScene(student, week, opts = {}) {
  if (!student) return '';
  const mode = opts.mode || 'ambient';
  const ctx = buildTextContext({
    subject: student,
    week,
    raProfile: opts.raProfile,
    globals: {
      raName: opts.raName,
      visitMode: mode,
      ...(opts.globals || {}),
    },
  });
  if (mode === 'intro') {
    return [
      render('{room.visit.intro.lead}', ctx),
      render('{room.visit.intro.meet}', ctx),
      render('{room.visit.stage.room}', ctx),
      render('{room.visit.linger}', ctx),
    ].filter(Boolean).join('\n\n');
  }
  if (mode === 'stage') {
    return [
      render('{room.visit.stage.room}', ctx),
      render('{room.visit.stage.beat}', ctx, { trace: opts.trace || null }),
      render('{room.visit.stage.beat.persona}', ctx, { trace: opts.trace || null }),
      render('{talk.roomFitCoda}', ctx),
      render('{room.visit.linger}', ctx),
    ].filter((p) => p?.trim()).join('\n\n');
  }
  return [render('{room.visit.ambient}', ctx), render('{room.visit.linger}', ctx)].filter((p) => p?.trim()).join('\n\n');
}
