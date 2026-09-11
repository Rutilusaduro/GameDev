// Wife Lessons — supplemental lesson beat variants (lint variety floor).
import { registerModuleVariants } from '../../engine.js';
import { legacyBridgeWhen } from '../legacyPoolPolicy.js';
import { WL_LESSONS } from '../../../gameData/wifeLessonsData.js';

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.id) continue;
    const label = lesson.label?.toLowerCase() || 'the lesson';
    registerModuleVariants(`wifeLessons.lesson.s${stage}.${lesson.id}`, [
      { when: legacyBridgeWhen(), text: [
        `The kitchen fills with the warmth of ${label} — flour, butter, and permission layered like a recipe for belonging.`,
        `Mary Jane guides them through ${label}; daughters and mothers eat without hurry, bellies softening in the shared heat.`,
        `Every bite of ${label} lands like theology — abundance taught patiently, appetite received as devotion.`,
      ]},
    ]);
  }
}
