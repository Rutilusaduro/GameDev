#!/usr/bin/env node
/**
 * Safe diary pool migration: registerPool + clause split only when text > 195 chars.
 */
import { readFileSync, writeFileSync } from 'fs';

const MAX = 195;
const file = process.argv[2] || 'src/textEngine/scenes/diary.js';

function sentences(text) {
  return (text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text]).map(s => s.trim()).filter(Boolean);
}

function chunkUnderMax(text) {
  if (text.length <= MAX) return [text];
  const sents = sentences(text);
  const out = [];
  let cur = '';
  for (const s of sents) {
    const next = cur ? `${cur} ${s}` : s;
    if (next.length <= MAX) cur = next;
    else {
      if (cur) out.push(cur);
      cur = s.length <= MAX ? s : s.slice(0, MAX);
    }
  }
  if (cur) out.push(cur);
  return out;
}

function parseWhen(piece) {
  const wi = piece.indexOf('when:');
  if (wi < 0) return '{}';
  const start = piece.indexOf('{', wi);
  let d = 0;
  for (let i = start; i < piece.length; i++) {
    if (piece[i] === '{') d++;
    else if (piece[i] === '}') { d--; if (!d) return piece.slice(start, i + 1); }
  }
  return '{}';
}

function parseExtras(piece) {
  const weight = (piece.match(/weight:\s*(\d+)/) || [])[1];
  const priority = (piece.match(/priority:\s*(\d+)/) || [])[1];
  return `${weight ? `, weight: ${weight}` : ''}${priority ? `, priority: ${priority}` : ''}`;
}

function parseTexts(piece) {
  const texts = [];
  const sm = piece.match(/text:\s*\[([\s\S]*?)\]/);
  if (!sm) return texts;
  const tr = /`((?:\\.|[^`])*)`|'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/g;
  let t;
  while ((t = tr.exec(sm[1]))) {
    texts.push((t[1] || t[2] || t[3]).replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"'));
  }
  return texts;
}

function q(s) {
  if (s.includes('`')) return JSON.stringify(s);
  if (s.includes('"') && !s.includes("'")) return JSON.stringify(s);
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const source = readFileSync(file, 'utf8');
const parts = source.split(/registerModule\(/);
const header = parts[0].replace('registerModule', 'registerPool');
const out = [header.endsWith('registerPool') ? parts[0].replace(/import \{ registerModule/, 'import { registerPool') : parts[0].replace(/import \{ registerModule/, 'import { registerPool')];

// Fix header import only
let result = source.replace(/import \{ registerModule, createContext, render \}/, 'import { registerPool, createContext, render }');
result = result.replace(/import \{ registerModule \}/, 'import { registerPool }');

const moduleRe = /registerModule\(\s*['"]([^'"]+)['"]\s*,\s*\[([\s\S]*?)\]\s*\)\s*;/g;
let last = 0;
const chunks = [];
let match;
while ((match = moduleRe.exec(source))) {
  chunks.push({ type: 'text', content: source.slice(last, match.index) });
  chunks.push({ type: 'module', key: match[1], inner: match[2] });
  last = match.index + match[0].length;
}
chunks.push({ type: 'text', content: source.slice(last) });

const emitted = [];
emitted.push(source.slice(0, chunks[0]?.content?.length || 0).replace(/import \{ registerModule/, 'import { registerPool'));

for (const chunk of chunks) {
  if (chunk.type === 'text') {
    emitted.push(chunk.content);
    continue;
  }
  const { key, inner } = chunk;
  const variants = [];
  let depth = 0, start = -1;
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (inner[i] === '}') { depth--; if (depth === 0 && start >= 0) { variants.push(inner.slice(start, i + 1)); start = -1; } }
  }

  const parsed = variants.map((p) => ({ when: parseWhen(p), extras: parseExtras(p), texts: parseTexts(p) }));
  const needsSplit = parsed.some((v) => v.texts.some((t) => t.length > MAX));

  if (!needsSplit) {
    emitted.push(`registerPool("${key}", [`);
    emitted.push(inner.trim());
    emitted.push(']);');
    continue;
  }

  emitted.push(`// ── ${key} (decomposed) ─────────────────────────────────────`);
  const clauseMap = new Map();
  let maxClauses = 0;
  for (const v of parsed) {
    for (const t of v.texts) {
      const chunksT = chunkUnderMax(t);
      maxClauses = Math.max(maxClauses, chunksT.length);
      chunksT.forEach((c, i) => {
        if (!clauseMap.has(i)) clauseMap.set(i, []);
        clauseMap.get(i).push({ when: v.when, extras: v.extras, text: c });
      });
    }
  }
  const clauseKeys = [];
  for (let i = 0; i < maxClauses; i++) {
    const ck = `${key}.c${i + 1}`;
    clauseKeys.push(`{${ck}}`);
    emitted.push(`registerPool('${ck}', [`);
    for (const e of clauseMap.get(i) || []) {
      emitted.push(`  { when: ${e.when}${e.extras}, text: [${q(e.text)}] },`);
    }
    if (i > 0) emitted.push(`  { when: {}, text: [''] },`);
    emitted.push(']);');
    emitted.push('');
  }
  emitted.push(`registerPool('${key}', [`);
  emitted.push(`  { when: {}, text: ['${clauseKeys.join(' ')}'] },`);
  emitted.push(']);');
}

let output = source.replace(/import \{ registerModule, createContext, render \}/, 'import { registerPool, createContext, render }');
output = output.replace(/registerModule\(/g, 'registerPool(');

// Now decompose only pools that still have >200 char strings - do second pass on output
const blocks = [...output.matchAll(/registerPool\(\s*['"]([^'"]+)['"]\s*,\s*\[([\s\S]*?)\]\s*\)\s*;/g)];
let decomposed = '';
let cursor = 0;
for (const m of blocks) {
  decomposed += output.slice(cursor, m.index);
  const key = m[1];
  const inner = m[2];
  if (key.includes('.c')) { decomposed += m[0]; cursor = m.index + m[0].length; continue; }

  const variants = [];
  let depth = 0, start = -1;
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (inner[i] === '}') { depth--; if (depth === 0 && start >= 0) { variants.push(inner.slice(start, i + 1)); start = -1; } }
  }
  const parsed = variants.map((p) => ({ when: parseWhen(p), extras: parseExtras(p), texts: parseTexts(p) }));
  const needsSplit = parsed.some((v) => v.texts.some((t) => t.length > MAX));

  if (!needsSplit || key.startsWith('diary.innerBeat') || key.startsWith('diary.lilith')) {
    decomposed += m[0];
  } else {
    decomposed += `// ── ${key} (decomposed) ─────────────────────────────────────\n`;
    const clauseMap = new Map();
    let maxClauses = 0;
    for (const v of parsed) {
      for (const t of v.texts) {
        const chunksT = chunkUnderMax(t);
        maxClauses = Math.max(maxClauses, chunksT.length);
        chunksT.forEach((c, i) => {
          if (!clauseMap.has(i)) clauseMap.set(i, []);
          clauseMap.get(i).push({ when: v.when, extras: v.extras, text: c });
        });
      }
    }
    const clauseKeys = [];
    for (let i = 0; i < maxClauses; i++) {
      const ck = `${key}.c${i + 1}`;
      clauseKeys.push(`{${ck}}`);
      decomposed += `registerPool('${ck}', [\n`;
      for (const e of clauseMap.get(i) || []) {
        decomposed += `  { when: ${e.when}${e.extras}, text: [${q(e.text)}] },\n`;
      }
      if (i > 0) decomposed += `  { when: {}, text: [''] },\n`;
      decomposed += `]);\n\n`;
    }
    decomposed += `registerPool('${key}', [\n  { when: {}, text: ['${clauseKeys.join(' ')}'] },\n]);\n`;
  }
  cursor = m.index + m[0].length;
}
decomposed += output.slice(cursor);
writeFileSync(file, decomposed);
console.log('Migrated', file);
