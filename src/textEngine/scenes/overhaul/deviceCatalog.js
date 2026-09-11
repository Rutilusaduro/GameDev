// The Squad — Lead: A5 Editor | Support: A2 Psych
// Overwrite leftover device.catalog / sensation / psych (registerPool last-wins).
import { registerPool } from '../../engine.js';
import { DEVICES } from '../../../gameData/devices.js';

const CATALOG = {
  feeding_mask: [
    'Lab intake rig. Locking harness. Pump set to a pace she already agreed to.',
    'A mounted feeder with a calibrated swallow. Mechanical, fond, thorough.',
    'Harness, hose, a rhythm that treats her hunger like a schedule.',
  ],
  auto_feeder_arm: [
    'Servo arm, tray after tray. She sits. The machine keeps her company.',
    'A mechanical server with patience. Portions arrive whether she reaches or not.',
    'Set the cadence. Soften into the chair. The arm does the rest.',
  ],
  obedience_belt: [
    'Waist harness with a gentle cue. When she hesitates, it reminds her she wanted this.',
    'A belt that counts yeses. Appetite is the setting.',
    'Cinch, cue, compliance she already signed for. The extra gathers under it.',
  ],
  auto_bloating_belt: [
    'Reinforced waist rig that slowly adds volume. Pressure in. Softness out.',
    'A swelling cycle she can feel in the chair. Warm. Relentless. Wanted.',
    'Belt working. Middle answering. The drum-tight heat is the point.',
  ],
  living_furniture_rig: [
    'Frames and cushions that treat her as the furniture. Fed so she stays comfortable.',
    'Restraints that look like lounge gear. Belly presented. Comfort first.',
    'She is the seat and the display. The rig keeps her there, happily.',
  ],
  reinforced_legs: [
    'Braced supports for furniture-weight thighs. She swells. The braces keep up.',
    'Stabilizers under added mass. Softness with leverage.',
    'Legs braced so the extra of her can keep arriving.',
  ],
  growth_accelerator_chamber: [
    'Sealed session. Warm air. Soft tissue answering on a faster clock.',
    'Chamber heat, scale climbing, breath easy with the change.',
    'A closed room that treats growth like weather she stepped into on purpose.',
  ],
  growth_serum_injector: [
    'One-shot formula. Heat under the skin. Curves answering in minutes.',
    'Injection warmth spreading. Localized, dramatic, invited.',
    'Chemical generosity. She watches the extra arrive.',
  ],
  endless_hunger_engine: [
    'Handheld ray that turns satiety down. Hunger becomes a project until she feeds.',
    'Engine hum. Stomach insisting. She asked for the insist.',
    'Appetite friction on purpose. The next plate is already implied.',
  ],
};

const SENSATION = {
  feeding_mask: [
    'Mechanical rhythm at the jaw. Swallow following the pump.',
    'Harness locked. Intake calibrated. She breathes around the cadence.',
    'Pump pressure. Warm formula. A body learning the schedule.',
  ],
  auto_feeder_arm: [
    'Automated portions arriving on time. Tray after tray.',
    'The arm cycles. Fullness builds without a debate.',
    'Set-and-forget softness. She watches the next bite land.',
  ],
  obedience_belt: [
    'Belt pressure. A cue she already said yes to.',
    'Waist counted. Appetite answering the cinch.',
    'Hardware at the middle. Want sitting under it.',
  ],
  auto_bloating_belt: [
    'Pressure in. Volume out. Middle swelling on a timer.',
    'Belt cycles. Skin warm and tight in a way she likes.',
    'Inflation rhythm. The chair takes more of her.',
  ],
  living_furniture_rig: [
    'Furniture-comfort harness. Belly presented like a feature.',
    'Immobility as a setting. She is displayed and fed.',
    'Rig braces and cushions. Soft mass doing the decorating.',
  ],
  reinforced_legs: [
    'Braced thighs bearing the load. Softness with support.',
    'Stabilizers creaking under added mass. Fond noise.',
    'Leverage where the extra needs a place to sit.',
  ],
  growth_accelerator_chamber: [
    'Chamber warmth. Scale climbing. Nerves pleased with the speed.',
    'Growth surge she can feel spreading. Breath easy.',
    'Closed air, open appetite. The body answers fast.',
  ],
  growth_serum_injector: [
    'Serum heat spreading outward. Curves answering.',
    'Injection site warm. Softness taking the invitation.',
    'Chemical generosity under the skin. Visible in minutes.',
  ],
  endless_hunger_engine: [
    'Hunger rising like weather she walked into.',
    'Engine hum. Stomach insisting. She smiles at the insist.',
    'Satiety turned down. The next plate is already a plan.',
  ],
};

export function applyDeviceCatalogOverhaul() {
for (const id of Object.keys(DEVICES)) {
  registerPool(`device.catalog.${id}`, [
    { when: {}, text: CATALOG[id] || [
      'A lab device with a patient appetite of its own.',
      'Hardware for softness. She already knows the setting she wants.',
      'The machine keeps time. Her body keeps the extra.',
    ] },
  ]);
  registerPool(`device.sensation.${id}`, [
    { when: {}, text: SENSATION[id] || [
      'Device warmth. Pressure. Fullness building.',
      'Hardware working. Softness answering.',
      'She feels the cycle and lets it.',
    ] },
    { when: { stageMin: 7 }, weight: 2, text: [
      'Mass answering at scale. The device sounds pleased.',
      'At this size the hardware is a small weather system.',
    ] },
  ]);
  registerPool(`device.psych.${id}`, [
    { when: {}, text: [
      'She adjusts to the sensation. Body learning the machine.',
      'Curiosity first. Then appetite. Then a slower breath.',
      'The cycle feels earned. She stays in it.',
    ] },
    { when: { corruption: [0] }, weight: 2, text: [
      'Novelty, nerves, then curious compliance anyway.',
      'Uncertainty flickers. The device keeps working. She lets it.',
    ] },
    { when: { corruption: [2] }, weight: 3, text: [
      'She welcomes the cycle. Proud. Open. Hungry for more.',
      'Want is the setting. She would queue another session.',
    ] },
  ]);
}
}

applyDeviceCatalogOverhaul();
