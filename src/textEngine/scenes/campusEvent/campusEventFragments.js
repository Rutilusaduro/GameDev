// Floor check-in scenes — composable hall + choice slots (MIGRATION bridge).
import { registerPool, registerModuleVariants } from '../../engine.js';
import { FLOOR_SCENES } from '../../../gameData/floorEvents.js';

registerPool('campusEvent.scene.hallTone', [
  {
    when: {},
    weight: 2,
    text: [
      'The lounge smells like policy and takeout — wellness words, hungry subtext.',
      'Residents orbit the couches; appetite is the unofficial agenda item.',
      'Floor check-in energy turns soft when someone admits they are already thinking about dinner.',
    ],
  },
]);

registerPool('campusEvent.scene.choiceEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'You log the intervention; she logs the calories — both ledgers stay honest.',
      'Small choice, loud consequence — growth dressed as care again.',
      'The moment passes warm; the hall remembers who fed whom.',
    ],
  },
]);

const SCENE_SKELETON = '{campusEvent.scene.hallTone|prefix:} {campusEvent.scene.choiceEcho|prefix: }';

for (const scene of FLOOR_SCENES) {
  if (!scene?.id) continue;
  registerModuleVariants(`campusEvent.scene.${scene.id}`, [
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 4,
      text: [SCENE_SKELETON],
    },
    {
      when: { weekMin: 8 },
      weight: 3,
      priority: 2,
      text: [SCENE_SKELETON],
    },
  ]);
  (scene.choices || []).forEach((_, idx) => {
    registerModuleVariants(`campusEvent.choice.${scene.id}.${idx}`, [
      {
        when: { weekMin: 20 },
        weight: 5,
        priority: 4,
        text: [SCENE_SKELETON],
      },
      {
        when: { weekMin: 8 },
        weight: 3,
        priority: 2,
        text: [SCENE_SKELETON],
      },
    ]);
  });
}
