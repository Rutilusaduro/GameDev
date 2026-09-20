// The Squad — Lead: A4 Architect
// After all scene imports: variant-only modules lack pool select — promote them for lint + pool RNG.
import { _registryEntries, _moduleOpts, ensurePoolSelectMode } from '../engine.js';
import { INFRA_MODULE_KEYS } from '../../../scripts/text-lint.config.js';

for (const [key] of _registryEntries()) {
  if (INFRA_MODULE_KEYS.has(key)) continue;
  if (_moduleOpts(key).select === 'pool') continue;
  ensurePoolSelectMode(key);
}
