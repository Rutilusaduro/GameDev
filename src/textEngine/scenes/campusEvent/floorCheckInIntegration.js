// Floor check-in scene + choice prose — registered from FLOOR_SCENES (§9d).
import { registerPool, render, createContext } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { FLOOR_SCENES } from '../../../gameData/floorEvents.js';
import { INIT_STUDENTS } from '../../../gameData/students.js';
import { renderFloorCheckinScene, renderFloorCheckinResult } from '../overhaul/floorCheckin.js';

const sampleStudent = INIT_STUDENTS[0];
const SLOT_STUDENT = { ...sampleStudent, name: '{subject.name}', first: '{subject.first}' };

function resolveLegacyText(fnOrStr, student) {
  if (typeof fnOrStr === 'function') {
    try {
      return fnOrStr(student || sampleStudent) || '';
    } catch {
      return '';
    }
  }
  return fnOrStr || '';
}

for (const scene of FLOOR_SCENES) {
  const sceneText = resolveLegacyText(scene.text, SLOT_STUDENT);
  if (sceneText) {
    registerPool(`campusEvent.scene.${scene.id}`, [
      { when: {}, text: [sceneText] },
    ]);
  }
  scene.choices.forEach((choice, idx) => {
    const resultText = resolveLegacyText(choice.result, SLOT_STUDENT);
    if (resultText) {
      registerPool(`campusEvent.choice.${scene.id}.${idx}`, [
        { when: {}, text: [resultText] },
      ]);
    }
  });
}

function joinBeats(parts) {
  return parts
    .map((p) => (p || '').trim())
    .filter((p) => p && !p.includes('{unresolved}'))
    .join(' ');
}

/** Campus observation + floor check-in scene intro composed. */
export function renderFloorSceneText(scene, student, week = 1, opts = {}) {
  if (!scene || !student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    ...opts,
    globals: { floorSceneId: scene.id, ...(opts.globals || {}) },
  });
  const open = render('{floor.checkin.open}', ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = renderFloorCheckinScene(scene.id, student, week, opts);
  const modular = render(`{campusEvent.scene.${scene.id}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const legacy = resolveLegacyText(scene.text, student);
  const linger = render('{overhaul.linger.social}', ctx, { trace: opts.trace || null })?.trim();
  const body = composed || modular || legacy;
  if (composed) return joinBeats([open, body, linger]);
  const heat = render('{floor.checkin.heat}', ctx, { trace: opts.trace || null })?.trim() || '';
  return joinBeats([open, body, heat, linger]);
}

export function renderFloorChoiceResult(scene, choiceIdx, student, week = 1, opts = {}) {
  if (!scene || choiceIdx == null || !student) return '';
  const choice = scene.choices?.[choiceIdx];
  if (!choice) return '';
  const foodish = (choice.effect?.gain?.[1] || 0) > 0;
  const extraChoiceId = choice.extraId || '';
  const ctx = buildTextContext({
    subject: student,
    week,
    ...opts,
    globals: { floorSceneId: scene.id, floorChoiceKind: foodish ? 'feed' : 'talk', extraChoiceId, ...(opts.globals || {}) },
  });
  const composed = renderFloorCheckinResult(scene.id, foodish ? 'feed' : 'talk', student, week, {
    ...opts,
    globals: { extraChoiceId, ...(opts.globals || {}) },
  });
  const modular = render(`{campusEvent.choice.${scene.id}.${choiceIdx}}`, ctx, { trace: opts.trace || null })?.trim();
  const linger = render(foodish ? '{overhaul.linger.food}' : '{overhaul.linger.social}', ctx, { trace: opts.trace || null })?.trim()
    || render('{overhaul.linger}', ctx, { trace: opts.trace || null })?.trim();
  if (composed) return joinBeats([composed, linger]);
  const body = modular || resolveLegacyText(choice.result, student);
  const resultBeat = render(foodish ? '{floor.checkin.result.feed}' : '{floor.checkin.result.talk}', ctx, { trace: opts.trace || null })?.trim();
  return joinBeats([body, resultBeat, linger]);
}

export function renderFloorHallText(scene, week = 1, opts = {}) {
  if (!scene) return '';
  const ctx = opts.subject
    ? buildTextContext({
      subject: opts.subject,
      week,
      ...opts,
      globals: { floorSceneId: scene.id, ...(opts.globals || {}) },
    })
    : createContext({ week, globals: { floorSceneId: scene.id, ...(opts.globals || opts) } });
  const composed = opts.subject
    ? renderFloorCheckinScene(scene.id, opts.subject, week, opts)
    : render('{floor.checkin.scene}', ctx, { trace: opts.trace || null })?.trim();
  const body = (composed && !composed.includes('{unresolved}')) ? composed : resolveLegacyText(scene.text, null);
  const hall = render('{floor.checkin.hall}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{overhaul.linger.food}', ctx, { trace: opts.trace || null })?.trim()
    || render('{overhaul.linger}', ctx, { trace: opts.trace || null })?.trim();
  return joinBeats([body, hall, linger]);
}

/** @deprecated use renderFloorSceneText */
export const renderClassSceneText = renderFloorSceneText;
/** @deprecated use renderFloorChoiceResult */
export const renderClassChoiceResult = renderFloorChoiceResult;
