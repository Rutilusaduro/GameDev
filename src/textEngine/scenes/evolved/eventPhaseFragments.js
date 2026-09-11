// Evolved branching events — composable slots on every phase/choice/ending pool.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';

registerPool('evolved.scene.atmosphere', [
  {
    when: {},
    weight: 2,
    text: [
      'The room smells like food and ambition — warm light, heavier bodies, nobody pretending.',
      'Ambient noise drops when plates arrive; appetite becomes the only agenda.',
      'Fabric strains, chairs creak, and the mood stays tender instead of tense.',
      'Floor heat and cooking scent braid together — the hall feels complicit tonight.',
      'Someone whispers that the floor smells like food; nobody disagrees, and plates keep arriving.',
    ],
  },
]);

registerPool('evolved.scene.stakes', [
  {
    when: {},
    weight: 2,
    text: [
      'Every choice tonight will show up on the scale and in the retelling.',
      'The next bite is not casual — it is a direction.',
      'Winning here means growing into something the old self could not hold.',
      'Whatever she picks, the RA log will remember the appetite behind it.',
    ],
  },
]);

registerPool('evolved.scene.hungerCue', [
  {
    when: { stageMin: [4] },
    weight: 2,
    text: [
      'Her belly leads when she moves — soft, forward, impossible to ignore.',
      'Fullness sits in her lap like a trophy she is still earning.',
    ],
  },
  {
    when: {},
    text: [
      'Hunger hums under her ribs, polite but persistent.',
      'She eats like someone who already knows the ending and wants it sooner.',
    ],
  },
]);

registerPool('evolved.choice.chatReact', [
  {
    when: {},
    weight: 2,
    text: [
      'The room reacts — laughter, envy, hunger mirrored back at her.',
      'Someone nearby exhales like they might start eating too; she does not discourage it.',
      'Approval lands soft and heavy, the way praise always feeds.',
    ],
  },
]);

registerPool('evolved.choice.bodyResult', [
  {
    when: {},
    weight: 2,
    text: [
      'She leans into the bite and the moment feels warmer, heavier, more real.',
      'Her belly shifts; fabric whispers; appetite wins the argument.',
      'Fullness spreads slow and sweet — she looks pleased, not surprised.',
    ],
  },
]);

registerPool('evolved.ending.streamCoda', [
  {
    when: {},
    weight: 2,
    text: [
      'The next beat waits — plates, cameras, or confession, depending on the path.',
      'She exhales; the hall feels ready for whatever she does next.',
      'Appetite and momentum braid together; there is no pretending this is small.',
    ],
  },
]);

registerPool('evolved.ending.relGain', [
  {
    when: {},
    weight: 2,
    text: [
      'She feels seen in the way that makes eating easier — not judged, just witnessed.',
      'Trust settles in her shoulders; the next meal already feels allowed.',
    ],
  },
]);

const EVENT_SKELETON = '{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';
const CHOICE_SKELETON = '{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: }';
const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

let phasePools = 0;
let choicePools = 0;
let endingPools = 0;

for (const [formId, stages] of Object.entries(EVOLVED_EVENTS)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((evDef, stageIdx) => {
    if (!evDef?.phases) return;
    evDef.phases.forEach((phase, phaseIdx) => {
      const phaseKey = `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`;
      phasePools += 1;
      registerModuleVariants(phaseKey, [
        {
          when: { weekMin: 18 },
          weight: 5,
          priority: 4,
          text: [EVENT_SKELETON],
        },
        {
          when: { weekMin: 10 },
          weight: 3,
          priority: 2,
          text: [EVENT_SKELETON],
        },
        {
          when: { weekMin: 5 },
          weight: 2,
          priority: 1,
          text: ['{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: }'],
        },
      ]);
      for (const ch of phase.choices || []) {
        if (!ch?.id) continue;
        const choiceKey = `${phaseKey}.${ch.id}`;
        choicePools += 1;
        registerModuleVariants(choiceKey, [
          {
            when: { weekMin: 16 },
            weight: 4,
            priority: 3,
            text: [CHOICE_SKELETON],
          },
          {
            when: { weekMin: 6 },
            weight: 3,
            priority: 2,
            text: [CHOICE_SKELETON],
          },
        ]);
      }
    });
    (evDef.endings || []).forEach((_, endingIdx) => {
      const endKey = `evolved.event.${formId}.s${stageIdx}.end${endingIdx}`;
      endingPools += 1;
      registerModuleVariants(endKey, [
        {
          when: { weekMin: 16 },
          weight: 4,
          priority: 3,
          text: [ENDING_SKELETON],
        },
        {
          when: { weekMin: 7 },
          weight: 3,
          priority: 2,
          text: [ENDING_SKELETON],
        },
      ]);
    });
  });
}

export const EVOLVED_MODULAR_STATS = { phasePools, choicePools, endingPools };
