// The Squad — Lead: A5 Editor
// Last-wins overwrite of leftover pools. Import AFTER leftover scene modules
// (campusEvent/index.js, hunt/index.js, deviceFlavor.js). Unique module so
// a later leftover import cannot keep monoliths; do not import from overhaul/index.js.
import './leftoverFeast.js';
import './leftoverHunt.js';
import './leftoverCampusEvent.js';
import './leftoverDevice.js';
import { applyCultivatorOverhaul } from './leftoverCultivator.js';
import { applyDishOverhaul } from './leftoverDish.js';

applyCultivatorOverhaul();
applyDishOverhaul();
