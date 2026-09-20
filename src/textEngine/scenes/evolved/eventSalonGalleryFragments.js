// Chloé salon + Fiona gallery evolved arcs — late-game composable beats.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';

registerPool('evolved.scene.salonAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Wine and butter braid through the dorm — candles, silk, appetite dressed as ceremony.',
      'Chloé pours like a hostess who already won; guests arrive hungry and leave complicit.',
      'French restraint melts into American portions; laughter stays low, plates stay full.',
      'Late-semester salon nights feel inevitable — scandal as seasoning, fullness as policy.',
    ],
  },
]);

registerPool('evolved.scene.galleryLight', [
  {
    when: {},
    weight: 2,
    text: [
      'Track lights warm bare skin and fuller curves — Fiona frames abundance like truth.',
      'Contact sheets multiply; every mid-bite laugh becomes proof the gallery demanded.',
      'Patrons lean closer than etiquette allows; hunger mirrors the subjects on the wall.',
      'Opening-night wine stains the floor; the art smells like butter and honest appetite.',
    ],
  },
]);

const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

function wireForm(formId, poolKey, skeleton) {
  const stages = EVOLVED_EVENTS[formId];
  if (!Array.isArray(stages)) return;
  stages.forEach((evDef, stageIdx) => {
    (evDef.phases || []).forEach((_, phaseIdx) => {
      const phaseKey = `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`;
      registerModuleVariants(phaseKey, [
        {
          when: { evolvedFormId: [formId], weekMin: 20 },
          weight: 6,
          priority: 6,
          text: [skeleton],
        },
      ]);
      const phase = evDef.phases[phaseIdx];
      for (const ch of phase?.choices || []) {
        if (!ch?.id) continue;
        registerModuleVariants(`${phaseKey}.${ch.id}`, [
          {
            when: { evolvedFormId: [formId], weekMin: 18 },
            weight: 5,
            priority: 5,
            text: ['{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: }'],
          },
        ]);
      }
    });
    (evDef.endings || []).forEach((_, endingIdx) => {
      registerModuleVariants(`evolved.event.${formId}.s${stageIdx}.end${endingIdx}`, [
        {
          when: { evolvedFormId: [formId], weekMin: 18 },
          weight: 5,
          priority: 5,
          text: [ENDING_SKELETON],
        },
      ]);
    });
  });
}

const SALON_SKELETON = '{evolved.scene.salonAir|prefix:} {evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';
const GALLERY_SKELETON = '{evolved.scene.galleryLight|prefix:} {evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';

wireForm('salon_appetit', 'evolved.scene.salonAir', SALON_SKELETON);
wireForm('artisan_gallery', 'evolved.scene.galleryLight', GALLERY_SKELETON);
