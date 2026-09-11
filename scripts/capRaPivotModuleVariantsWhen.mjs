#!/usr/bin/env node
/** Cap raPivot registerModuleVariants: when: {} → legacyBridgeWhen() (skip bulk registerPool passes 54–57). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scenesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/textEngine/scenes');
const skip = new Set(['raPivotProseDepthPass54.js', 'raPivotProseDepthPass55.js', 'raPivotProseDepthPass56.js', 'raPivotProseDepthPass57.js']);

let changedFiles = 0;
let changedWhen = 0;

for (const name of fs.readdirSync(scenesDir)) {
  if (!/^raPivotProseDepthPass\d+\.js$/.test(name) || skip.has(name)) continue;
  const filePath = path.join(scenesDir, name);
  let src = fs.readFileSync(filePath, 'utf8');
  if (!src.includes('registerModuleVariants')) continue;

  const blockRe = /registerModuleVariants\([^)]+\),\s*\[([\s\S]*?)\]\s*\);/g;
  let next = src;
  let fileHits = 0;
  next = src.replace(blockRe, (block, inner) => {
    if (!/when:\s*\{\}/.test(inner)) return block;
    const count = (inner.match(/when:\s*\{\}/g) || []).length;
    fileHits += count;
    const fixedInner = inner.replace(/when:\s*\{\}/g, 'when: legacyBridgeWhen()');
    return block.replace(inner, fixedInner);
  });

  if (next === src) continue;

  changedWhen += fileHits;
  let out = next;
  if (!out.includes("from './legacyPoolPolicy.js'")) {
    if (out.includes("import { registerModuleVariants } from '../engine.js';")) {
      out = out.replace(
        "import { registerModuleVariants } from '../engine.js';",
        "import { registerModuleVariants } from '../engine.js';\nimport { legacyBridgeWhen } from './legacyPoolPolicy.js';",
      );
    } else if (out.includes("import { registerModuleVariants, registerPool } from '../engine.js';")) {
      out = out.replace(
        "import { registerModuleVariants, registerPool } from '../engine.js';",
        "import { registerModuleVariants, registerPool } from '../engine.js';\nimport { legacyBridgeWhen } from './legacyPoolPolicy.js';",
      );
    }
  }

  fs.writeFileSync(filePath, out);
  changedFiles += 1;
}

console.log(`capRaPivotModuleVariantsWhen: ${changedWhen} when blocks in ${changedFiles} files`);
