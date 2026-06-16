#!/usr/bin/env node
/**
 * Decompose stream.pre.* monoliths into clause pools + line pools + skeleton.
 * Each clause pool mirrors parent when-keys; clauses stay under 195 chars.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const SRC = 'src/textEngine/scenes/streamPreStream.js';
const OUT_DIR = 'src/textEngine/scenes/streamPreStream';
const MAX = 195;

function splitProseDialogue(raw) {
  const idx = raw.indexOf('\n\n"');
  if (idx === -1) return { body: raw, line: null };
  return { body: raw.slice(0, idx).trim(), line: raw.slice(idx + 2).trim() };
}

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
      if (s.length <= MAX) cur = s;
      else {
        for (let i = 0; i < s.length; i += MAX) out.push(s.slice(i, i + MAX));
        cur = '';
      }
    }
  }
  if (cur) out.push(cur);
  return out;
}

function parseModules(source) {
  const modules = [];
  const re = /registerModule\(\s*['"]([^'"]+)['"]\s*,\s*\[/g;
  let m;
  while ((m = re.exec(source))) {
    const key = m[1];
    let depth = 0;
    for (let i = source.indexOf('[', m.index); i < source.length; i++) {
      if (source[i] === '[') depth++;
      else if (source[i] === ']') {
        depth--;
        if (!depth) {
          modules.push({ key, block: source.slice(m.index, i + 1) });
          break;
        }
      }
    }
  }
  return modules;
}

function parseVariants(block) {
  const inner = block.replace(/^registerModule\([^,]+,\s*\[/, '').replace(/\]\s*\);?\s*$/, '');
  const variants = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (inner[i] === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        variants.push(inner.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return variants.map((piece) => {
    const when = (piece.match(/when:\s*(\{[^}]*\})/) || [])[1] || '{}';
    const priority = (piece.match(/priority:\s*(\d+)/) || [])[1];
    const priorityStr = priority ? `, priority: ${priority}` : '';
    if (/\(ctx\)/.test(piece)) {
      const fm = piece.match(/\(ctx\)\s*=>\s*(`(?:\\.|[^`])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/);
      const raw = fm ? fm[1].slice(1, -1).replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"') : '';
      const { body, line } = splitProseDialogue(raw);
      return { when, priorityStr, fn: true, body, line, fnSrc: fm?.[1] };
    }
    const texts = [];
    const sm = piece.match(/text:\s*\[([\s\S]*?)\]/);
    if (sm) {
      const tr = /['"]((?:\\.|[^'\\])*)['"]/g;
      let t;
      while ((t = tr.exec(sm[1]))) {
        texts.push(t[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"'));
      }
    }
    return { when, priorityStr, fn: false, texts };
  });
}

function q(s) {
  if (s.includes('"') && !s.includes("'")) return JSON.stringify(s);
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const source = readFileSync(SRC, 'utf8');
const modules = parseModules(source);
const frag = [
  '// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor',
  '// Destiny pre-stream vignettes — clause + line decomposition.',
  "import { registerPool } from '../../engine.js';",
  "import { BRANDS } from '../../../gameData/streaming.js';",
  '',
  "const bn = (ctx) => BRANDS[ctx.d.brand]?.name || 'the brand';",
  '',
];
const index = [
  '// ═══════════════════════════════════════════════════════════════',
  '// DESTINY STREAM — pre-stream vignettes (stage-bucketed, composed)',
  '// ═══════════════════════════════════════════════════════════════',
  "import './fragments.js';",
  "import '../streamPreStreamBrand.js';",
  '',
];

for (const { key, block } of modules) {
  const variants = parseVariants(block);
  const lineKey = `${key}.line`;
  const clauseMap = new Map(); // clauseIdx -> [{when, priorityStr, texts|fn}]
  const lineVariants = [];
  let maxClauses = 0;

  for (const v of variants) {
    if (v.fn) {
      if (!clauseMap.has(0)) clauseMap.set(0, []);
      clauseMap.get(0).push({
        when: v.when,
        priorityStr: v.priorityStr,
        fn: `(ctx) => ${v.fnSrc}`,
      });
      maxClauses = Math.max(maxClauses, 1);
      if (v.line) {
        lineVariants.push({ when: v.when, priorityStr: v.priorityStr, fn: `(ctx) => \`${v.line.replace(/`/g, '\\`')}\`` });
      } else {
        const dm = v.body.match(/"([^"]+)"/);
        if (dm) lineVariants.push({ when: v.when, priorityStr: v.priorityStr, texts: [`"${dm[1]}"`] });
      }
      continue;
    }
    for (const t of v.texts) {
      const { body, line } = splitProseDialogue(t);
      const chunks = chunkUnderMax(body);
      maxClauses = Math.max(maxClauses, chunks.length);
      chunks.forEach((c, i) => {
        if (!clauseMap.has(i)) clauseMap.set(i, []);
        clauseMap.get(i).push({ when: v.when, priorityStr: v.priorityStr, texts: [c] });
      });
      if (line) lineVariants.push({ when: v.when, priorityStr: v.priorityStr, texts: [line] });
    }
  }

  frag.push(`// ── ${key} ─────────────────────────────────────────────`);
  const clauseKeys = [];
  for (let i = 0; i < maxClauses; i++) {
    const ck = `${key}.c${i + 1}`;
    clauseKeys.push(`{${ck}}`);
    const entries = clauseMap.get(i) || [];
    frag.push(`registerPool('${ck}', [`);
    for (const e of entries) {
      frag.push(`  { when: ${e.when}${e.priorityStr}, text: [`);
      if (e.fn) frag.push(`    ${e.fn},`);
      else frag.push(`    ${q(e.texts[0])},`);
      frag.push('  ] },');
    }
    // Optional trailing clauses resolve empty at low-specificity stages.
    if (i > 0) frag.push(`  { when: {}, text: [''] },`);
    frag.push(']);', '');
  }

  if (lineVariants.length) {
    frag.push(`registerPool('${lineKey}', [`);
    for (const lv of lineVariants) {
      frag.push(`  { when: ${lv.when}${lv.priorityStr}, text: [`);
      if (lv.fn) frag.push(`    ${lv.fn},`);
      else frag.push(`    ${q(lv.texts[0])},`);
      frag.push('  ] },');
    }
    frag.push(']);', '');
  }

  const bodySkel = clauseKeys.join(' ');
  const skel = lineVariants.length ? `${bodySkel}\\n\\n{${lineKey}}` : bodySkel;
  index.push(`registerPool('${key}', [`);
  index.push(`  { when: {}, text: ['${skel}'] },`);
  index.push(']);', '');
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/fragments.js`, frag.join('\n'));
writeFileSync(`${OUT_DIR}/index.js`, index.join('\n'));
console.log('Generated', OUT_DIR);
