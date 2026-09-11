// Room visit beats — intro at the door + stage-keyed check-ins.
import './personas.js';
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { getStage } from '../../../gameData/stages.js';

registerPool('room.visit.intro.lead', [
  { when: {}, text: [
    'You knock. The nameplate matches the roster. Time to make yourself known.',
    'The hall is quiet except for muffled music behind this door. You knock twice.',
    'Housing said meet everyone before midterms. This door is next on your list.',
  ] },
]);

registerPool('room.visit.stage.room', [
  { when: {}, text: [
    'The room holds the usual student clutter — lived in, personal, hers.',
    'Posters, bedding, the small rituals of someone making a space home.',
    'A faint scent of laundry and something sweet — the private world behind her nameplate.',
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
    `She shifts on the bed so you have space — warm, unhurried, already glad you came.`,
    `"I was hoping you'd knock," she murmurs. "{ra.name}. The hall feels different when you're nearby."`,
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
    `Her belly rests in her lap like something poured and left to set. She watches you notice — slow, pleased, certain.`,
    `"Stay a minute," she says. Not a request. A small command wrapped in softness. "{ra.name}, I like when you see me like this."`,
    `Heat pools in the narrow space between you. She breathes deep; fabric strains; the room holds the sound.`,
  ] },
]);

registerPool('room.visit.ambient', [
  { when: {}, text: [
    'You linger in the doorway a minute. The room is quiet — lived in, familiar.',
    `{subject.name} waves you in. "Nothing urgent. I just like when you stop by, {ra.name}."`,
    `Same posters, same chair, same girl — but the air between you feels settled now.`,
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
    ].filter(Boolean).join('\n\n');
  }
  if (mode === 'stage') {
    return [
      render('{room.visit.stage.room}', ctx),
      render('{room.visit.stage.beat}', ctx, { trace: opts.trace || null }),
      render('{room.visit.stage.beat.persona}', ctx, { trace: opts.trace || null }),
    ].filter((p) => p?.trim()).join('\n\n');
  }
  return render('{room.visit.ambient}', ctx);
}
