#!/usr/bin/env node
/** MIGRATION step 6 — salon/gallery evolved event prose → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SALON_EVOLVED_EVENTS } from '../src/gameData/chloeSalon.js';
import { GALLERY_EVOLVED_EVENTS } from '../src/gameData/fionaGallery.js';
import { emitEventArray } from './lib/stubEvolvedEventBlock.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));

function replaceExport(filePath, exportName, formId, stages) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const marker = `export const ${exportName}`;
  const start = raw.indexOf(marker);
  if (start < 0) throw new Error(`${exportName} not found in ${filePath}`);
  const prefix = raw.slice(0, start);
  const block = `${marker} = ${emitEventArray(formId, stages)};\n`;
  fs.writeFileSync(filePath, prefix + block);
  console.log(`stubSalonGallery: updated ${exportName} in ${path.basename(filePath)}`);
}

const salonPath = path.join(root, '../src/gameData/chloeSalon.js');
const galleryPath = path.join(root, '../src/gameData/fionaGallery.js');

replaceExport(salonPath, 'SALON_EVOLVED_EVENTS', 'salon_appetit', SALON_EVOLVED_EVENTS);
replaceExport(galleryPath, 'GALLERY_EVOLVED_EVENTS', 'artisan_gallery', GALLERY_EVOLVED_EVENTS);
