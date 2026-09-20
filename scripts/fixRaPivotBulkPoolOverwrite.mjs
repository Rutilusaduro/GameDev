#!/usr/bin/env node
/**
 * Passes 54–57 used registerPool and replaced modular talk pools.
 * Convert to registerModuleVariants + legacyBridgeWhen() so week 20+ keeps talkCheckIn/talkEncourage.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scenesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/textEngine/scenes');
const SKIP_KEYS = new Set(['talk.check_in', 'talk.encourage']);

const header = `// Auto-generated — node scripts/generateRaPivotBulkProse.mjs (overlay-only; does not replace base pools)
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

`;

for (const n of [54, 55, 56, 57]) {
  const name = `raPivotProseDepthPass${n}.js`;
  const filePath = path.join(scenesDir, name);
  let src = fs.readFileSync(filePath, 'utf8');
  const blocks = [];
  const re = /registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const key = m[1];
    if (SKIP_KEYS.has(key)) continue;
    const inner = m[2];
    const whenFixed = inner.replace(/when:\s*\{\}/g, 'when: legacyBridgeWhen()');
    blocks.push(`registerModuleVariants('${key}', [${whenFixed}]);`);
  }
  const out = header + blocks.join('\n\n') + '\n';
  fs.writeFileSync(filePath, out);
  console.log(`${name}: ${blocks.length} overlay pools (skipped ${SKIP_KEYS.size} talk roots)`);
}
