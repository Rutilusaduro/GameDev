// The Squad — Lead: A5 Editor
// Last-wins overwrite of leftover hunt.feast.sN monoliths. Import after hunt/index.
import { registerPool } from '../../engine.js';

for (let i = 0; i <= 9; i++) {
  registerPool(`hunt.feast.s${i}`, [
    { when: {}, text: [
      '{hunt.feast.scene}',
      '{hunt.feast.setup} {hunt.feast.swallow} {hunt.feast.grow}',
      '{hunt.feast.setup} {hunt.feast.grow}',
    ]},
  ]);
}
