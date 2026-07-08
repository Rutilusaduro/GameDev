#!/usr/bin/env node
import {
  defaultCampusInstitutionState,
  applyInaugurateTier,
  canInaugurateTier,
  diningMealDiscount,
  groupDinnersUnlocked,
  rollInstitutionInterrupts,
  tickInstitutionDiscovery,
  institutionAtNode,
} from '../src/gameData/campusInstitutions.js';
import { renderInstitutionInauguration } from '../src/textEngine/scenes/campusInstitutions/index.js';

let failures = 0;
function assert(cond, msg) {
  if (!cond) { failures += 1; console.error(`FAIL: ${msg}`); }
}

let state = defaultCampusInstitutionState();
const check = canInaugurateTier(state, 'dining', { money: 500, ap: 3 });
assert(check.ok, 'can inaugurate dining T1');

state = applyInaugurateTier(state, 'dining', 2);
assert(state.tiers.dining === 1, 'dining tier 1 applied');
assert(diningMealDiscount(state) > 0, 'dining discount active');

state = applyInaugurateTier(applyInaugurateTier(state, 'dining', 3), 'dining', 4);
assert(groupDinnersUnlocked(state), 'group dinners at dining T2+');

const inaug = renderInstitutionInauguration('dining', 1, 1);
assert(inaug && inaug.length > 8, 'inauguration prose renders');

const atNode = institutionAtNode('dining_hall', state);
assert(atNode.some((i) => i.id === 'dining'), 'dining at dining_hall node');

state = tickInstitutionDiscovery(state, { saturationTier: 2 });
assert(state.discovered.gainers_society, 'gainers society discovered at saturation 2');

const interrupts = rollInstitutionInterrupts(state, 5, { rng: () => 0 });
assert(interrupts.length >= 1, 'interrupt roll fires with rng=0');

console.log(`campus-institutions:probe — ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
