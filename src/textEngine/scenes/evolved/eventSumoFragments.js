// Sumo evolved path — late-game composable beats.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';

registerPool('evolved.scene.sumoDohyo', [
  {
    when: {},
    weight: 2,
    text: [
      'Chanko steam and liniment braid behind the dohyo — bellies warm, rivals measuring without words.',
      'The board posts weights like scripture; she steps forward heavier each tournament, proud and unhurried.',
      'Fabric strains around her mawashi; the crowd learns her name the way they learn thunder.',
      'Every shove lands soft and decisive — mass as argument, appetite as training.',
    ],
  },
]);

const SUMO_SKELETON = '{evolved.scene.sumoDohyo|prefix:} {evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';
const SUMO_CHOICE = '{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: } {evolved.scene.sumoDohyo|prefix: }';

const stages = EVOLVED_EVENTS.sumo;
if (Array.isArray(stages)) {
  stages.forEach((evDef, stageIdx) => {
    (evDef.phases || []).forEach((phase, phaseIdx) => {
      const phaseKey = `evolved.event.sumo.s${stageIdx}.p${phaseIdx}`;
      registerModuleVariants(phaseKey, [
        {
          when: { evolvedFormId: ['sumo'], weekMin: 20 },
          weight: 6,
          priority: 6,
          text: [SUMO_SKELETON],
        },
      ]);
      for (const ch of phase?.choices || []) {
        if (!ch?.id) continue;
        registerModuleVariants(`${phaseKey}.${ch.id}`, [
          {
            when: { evolvedFormId: ['sumo'], weekMin: 18 },
            weight: 5,
            priority: 5,
            text: [SUMO_CHOICE],
          },
        ]);
      }
    });
  });
}
