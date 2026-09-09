// Floor check-in scene + choice prose — registered from FLOOR_SCENES (§9d).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { FLOOR_SCENES } from '../../../gameData/floorEvents.js';
import { INIT_STUDENTS } from '../../../gameData/students.js';

const sampleStudent = INIT_STUDENTS[0];

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
  const sceneText = resolveLegacyText(scene.text, sampleStudent);
  if (sceneText) {
    registerPool(`campusEvent.scene.${scene.id}`, [
      { when: {}, text: [sceneText] },
    ]);
  }
  scene.choices.forEach((choice, idx) => {
    const resultText = resolveLegacyText(choice.result, sampleStudent);
    if (resultText) {
      registerPool(`campusEvent.choice.${scene.id}.${idx}`, [
        { when: {}, text: [resultText] },
      ]);
    }
  });
}

/** Campus observation + legacy floor check-in scene intro composed. */
export function renderFloorSceneText(scene, student, week = 1, opts = {}) {
  if (!scene || !student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const beat = render('{campusEvent.beat}', ctx, { trace: opts.trace || null })?.trim() || '';
  const modular = render(`{campusEvent.scene.${scene.id}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const legacy = resolveLegacyText(scene.text, student);
  const body = modular || legacy;
  if (beat && body) return `${beat} ${body}`;
  return beat || body;
}

export function renderFloorChoiceResult(scene, choiceIdx, student, week = 1, opts = {}) {
  if (!scene || choiceIdx == null || !student) return '';
  const choice = scene.choices?.[choiceIdx];
  if (!choice) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const modular = render(`{campusEvent.choice.${scene.id}.${choiceIdx}}`, ctx, { trace: opts.trace || null })?.trim();
  return modular || resolveLegacyText(choice.result, student);
}

/** @deprecated use renderFloorSceneText */
export const renderClassSceneText = renderFloorSceneText;
/** @deprecated use renderFloorChoiceResult */
export const renderClassChoiceResult = renderFloorChoiceResult;
