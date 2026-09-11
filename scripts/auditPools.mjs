// One-off audit: rank pools by thinness (variant/text counts) and state-keying.
// Usage: node scripts/auditPools.mjs [--min N]
import '../src/textEngine/modules.js';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const rows = [];
for (const [key, variants] of _registryEntries()) {
  let texts = 0;
  let keyed = 0;
  for (const v of variants) {
    const t = Array.isArray(v.text) ? v.text.length : 1;
    texts += t;
    if (v.when && Object.keys(v.when).length > 0) keyed += 1;
  }
  rows.push({ key, variants: variants.length, texts, keyed });
}
rows.sort((a, b) => a.texts - b.texts || a.variants - b.variants);
const min = Number(process.argv[process.argv.indexOf('--min') + 1]) || 6;
const thin = rows.filter(r => r.texts < min);
console.log(`total pools: ${rows.length}; thin (<${min} texts): ${thin.length}`);
for (const r of thin) console.log(`${r.texts}\t${r.variants}v\t${r.keyed}k\t${r.key}`);
const unkeyed = rows.filter(r => r.keyed === 0 && r.texts >= min);
console.log(`\npools with NO state-keyed variants (>=${min} texts): ${unkeyed.length}`);
for (const r of unkeyed.slice(0, 80)) console.log(`${r.texts}\t${r.key}`);
