#!/usr/bin/env node
/** Cap raPivot registerModuleVariants wifeLessons.* rows: when: {} → legacyBridgeWhen(). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scenesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/textEngine/scenes');
const policyImport = "import { legacyBridgeWhen } from './legacyPoolPolicy.js';\n";

let changedFiles = 0;
let changedBlocks = 0;

for (const name of fs.readdirSync(scenesDir)) {
  if (!/^raPivotProseDepthPass\d+\.js$/.test(name)) continue;
  const filePath = path.join(scenesDir, name);
  let src = fs.readFileSync(filePath, 'utf8');
  if (!src.includes("registerModuleVariants('wifeLessons.") && !src.includes('registerModuleVariants("wifeLessons.')) {
    continue;
  }

  const re = /registerModuleVariants\((['"])wifeLessons\.[^'"]+\1,\s*\[\s*\{\s*\n(\s*)when:\s*\{\}/g;
  const next = src.replace(re, (match, _q, indent) => {
    changedBlocks += 1;
    return match.replace(`${indent}when: {}`, `${indent}when: legacyBridgeWhen()`);
  });

  if (next === src) continue;

  let out = next;
  if (!out.includes('legacyBridgeWhen')) {
    out = out.replace(
      /import \{ registerModuleVariants \} from '\.\.\/engine\.js';/,
      "import { registerModuleVariants } from '../engine.js';\n" + policyImport.trim() + '\n',
    );
  } else if (!out.includes("from './legacyPoolPolicy.js'") && !out.includes("from '../legacyPoolPolicy.js'")) {
    out = out.replace(
      /import \{ registerModuleVariants \} from '\.\.\/engine\.js';/,
      "import { registerModuleVariants } from '../engine.js';\n" + policyImport.trim() + '\n',
    );
  }

  fs.writeFileSync(filePath, out);
  changedFiles += 1;
}

console.log(`capRaPivotWifeLessonsWhen: ${changedBlocks} blocks in ${changedFiles} files`);
