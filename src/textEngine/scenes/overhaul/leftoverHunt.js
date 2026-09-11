// The Squad — Lead: A5 Editor
// Last-wins overwrite of leftover hunt.node.* / hunt.man.* monoliths.
// Unique module so a later hunt/index.js import cannot keep leftover HUNT_NODES.desc.
import { registerPool } from '../../engine.js';
import { HUNT_NODES, HUNT_MEN } from '../../../gameData/lilith.js';

for (const nodeId of Object.keys(HUNT_NODES)) {
  registerPool(`hunt.node.${nodeId}`, [
    { when: {}, text: [
      '{hunt.arrive.scene}',
      '{hunt.arrive.setup} {hunt.arrive.body}',
      '{hunt.arrive.setup}',
    ]},
  ]);
}

for (const man of HUNT_MEN) {
  registerPool(`hunt.man.${man.id}`, [
    { when: {}, text: [
      '{hunt.target.scene}',
      '{hunt.target.setup} {hunt.target.body}',
      '{hunt.target.setup}',
    ]},
  ]);
}
