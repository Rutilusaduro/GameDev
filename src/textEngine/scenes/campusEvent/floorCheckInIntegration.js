// Floor check-in scene + choice prose — registered from FLOOR_SCENES (§9d).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { FLOOR_SCENES } from '../../../gameData/floorEvents.js';
import { INIT_STUDENTS } from '../../../gameData/students.js';
import '../proseOverhaulPass4.js';
import './floorBeats.js';

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
      const texts = idx === 3
        ? [
          resultText,
          `${choice.label} becomes the rest of the hour. She eats like it was scheduled.`,
          `You follow through. The food leaves with her. The lounge pretends it was always this full.`,
        ]
        : [resultText];
      registerPool(`campusEvent.choice.${scene.id}.${idx}`, [
        { when: {}, text: texts },
      ]);
    }
  });
}

/** Floor check-in intro — leftover/night skeleton primary, unique scene fallback. */
export function renderFloorSceneText(scene, student, week = 1, opts = {}) {
  if (!scene || !student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const composed = render('{floor.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
  const modular = render(`{campusEvent.scene.${scene.id}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const legacy = resolveLegacyText(scene.text, student);
  const body = composed || modular || legacy;
  const linger = render('{floor.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return [body, linger].filter(Boolean).join('\n\n');
}

export function renderFloorChoiceResult(scene, choiceIdx, student, week = 1, opts = {}) {
  if (!scene || choiceIdx == null || !student) return '';
  const choice = scene.choices?.[choiceIdx];
  if (!choice) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const modular = render(`{campusEvent.choice.${scene.id}.${choiceIdx}}`, ctx, { trace: opts.trace || null })?.trim();
  const unique = modular || resolveLegacyText(choice.result, student);
  const wrap = render('{floor.choice.wrap}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{floor.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return [unique, wrap, linger].filter(Boolean).join('\n\n');
}

/** @deprecated use renderFloorSceneText */
export const renderClassSceneText = renderFloorSceneText;
/** @deprecated use renderFloorChoiceResult */
export const renderClassChoiceResult = renderFloorChoiceResult;
