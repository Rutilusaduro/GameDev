#!/usr/bin/env node
/**
 * Split any pool variant text over maxLen into sentence-chunk sub-pools.
 * Rewrites streamPreStream/fragments.js in place.
 */
import fs from 'fs';

const FILE = 'src/textEngine/scenes/streamPreStream/fragments.js';
const INDEX = 'src/textEngine/scenes/streamPreStream/index.js';
const MAX = 195;

function sentences(text) {
  const parts = text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text];
  return parts.map(s => s.trim()).filter(Boolean);
}

function chunkSentences(sents, max = MAX) {
  const chunks = [];
  let cur = '';
  for (const s of sents) {
    const next = cur ? `${cur} ${s}` : s;
    if (next.length <= max) cur = next;
    else {
      if (cur) chunks.push(cur);
      cur = s.length <= max ? s : s.slice(0, max);
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

function splitLong(text) {
  if (text.length <= MAX) return [text];
  return chunkSentences(sentences(text));
}

// Parse generated fragments loosely — rebuild from original streamPreStream.js with smarter split
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

const orig = readFileSync('src/textEngine/scenes/streamPreStream.js', 'utf8');

function splitProseDialogue(raw) {
  const idx = raw.indexOf('\n\n"');
  if (idx === -1) return { body: raw, line: null };
  return { body: raw.slice(0, idx).trim(), line: raw.slice(idx + 2).trim() };
}

function parseModules(source) {
  const modules = [];
  const re = /registerModule\(\s*['"]([^'"]+)['"]\s*,\s*\[/g;
  let m;
  while ((m = re.exec(source))) {
    const key = m[1];
    let depth = 0;
    let i = source.indexOf('[', m.index);
    for (; i < source.length; i++) {
      if (source[i] === '[') depth++;
      else if (source[i] === ']') { depth--; if (!depth) { modules.push({ key, block: source.slice(m.index, i + 1) }); break; } }
    }
  }
  return modules;
}

function extractStringLiterals(block) {
  const texts = [];
  const fnTexts = [];
  const whenBlocks = [];
  const variantRe = /\{\s*when:\s*(\{[^}]*\})([\s\S]*?)\}(?=\s*,|\s*\])/g;
  let vm;
  while ((vm = variantRe.exec(block))) {
    const when = vm[1];
    const rest = vm[2];
    const pri = (rest.match(/priority:\s*(\d+)/) || [])[1];
    const priority = pri ? `, priority: ${pri}` : '';
    if (/\(ctx\)/.test(rest)) {
      const fm = rest.match(/\(ctx\)\s*=>\s*(`(?:\\.|[^`])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/);
      if (fm) {
        const raw = fm[1].slice(1, -1).replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"');
        const { body, line } = splitProseDialogue(raw);
        whenBlocks.push({ when, priority, fn: true, body, line, raw: fm[1] });
      }
    } else {
      const arr = [];
      const sm = rest.match(/text:\s*\[([\s\S]*?)\]/);
      if (sm) {
        const tr = /['"]((?:\\.|[^'\\])*)['"]/g;
        let t;
        while ((t = tr.exec(sm[1]))) {
          arr.push(t[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"'));
        }
      }
      whenBlocks.push({ when, priority, fn: false, texts: arr });
    }
  }
  return whenBlocks;
}

function q(s) {
  if (!s) return "''";
  if (s.includes('"') && !s.includes("'")) return JSON.stringify(s);
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const modules = parseModules(orig);
const out = [
  "// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor",
  "// Destiny pre-stream vignettes — body + line decomposition.",
  "import { registerPool } from '../../engine.js';",
  "import { BRANDS } from '../../../gameData/streaming.js';",
  "",
  "const bn = (ctx) => BRANDS[ctx.d.brand]?.name || 'the brand';",
  "",
];

const index = [
  "// ═══════════════════════════════════════════════════════════════",
  "// DESTINY STREAM — pre-stream vignettes (stage-bucketed, composed)",
  "// ═══════════════════════════════════════════════════════════════",
  "import './fragments.js';",
  "import '../streamPreStreamBrand.js';",
  "",
];

for (const { key, block } of modules) {
  const variants = extractStringLiterals(block);
  const bodyKey = `${key}.body`;
  const lineKey = `${key}.line`;
  const bodyParts = [];
  const lineParts = [];
  const bodySlots = [];
  let partIdx = 0;

  out.push(`// ── ${key} ─────────────────────────────────────────────`);

  const addBodyChunks = (when, priority, text, isFn = false, fnTemplate = null) => {
    const chunks = isFn ? [text] : splitLong(text);
    const slotRefs = [];
    for (const chunk of chunks) {
      if (chunk.length > MAX && !isFn) {
        const sub = splitLong(chunk);
        for (const c of sub) {
          partIdx++;
          const pk = `${bodyKey}.p${partIdx}`;
          bodyParts.push({ key: pk, when, priority, texts: [c] });
          slotRefs.push(`{${pk}}`);
        }
      } else {
        partIdx++;
        const pk = `${bodyKey}.p${partIdx}`;
        if (isFn) {
          bodyParts.push({ key: pk, when, priority, fn: fnTemplate || `(ctx) => ${fnTemplate}` });
        } else {
          bodyParts.push({ key: pk, when, priority, texts: [chunk] });
        }
        slotRefs.push(`{${pk}}`);
      }
    }
    return slotRefs.join(' ');
  };

  for (const v of variants) {
    if (v.fn) {
      const bodyChunks = splitLong(v.body);
      const slotRefs = [];
      if (bodyChunks.length === 1 && v.body.length <= MAX) {
        partIdx++;
        const pk = `${bodyKey}.p${partIdx}`;
        const prose = v.body.replace(/[`\\]/g, '\\$&');
        bodyParts.push({ key: pk, when: v.when, priority: v.priority, fn: `(ctx) => \`${v.body.replace(/`/g, '\\`')}\`` });
        slotRefs.push(`{${pk}}`);
      } else {
        for (const c of bodyChunks) {
          partIdx++;
          const pk = `${bodyKey}.p${partIdx}`;
          bodyParts.push({ key: pk, when: v.when, priority: v.priority, texts: [c] });
          slotRefs.push(`{${pk}}`);
        }
      }
      if (v.line) {
        lineParts.push({ when: v.when, priority: v.priority, fn: `(ctx) => \`${v.line.replace(/`/g, '\\`')}\`` });
      } else if (v.body.includes('"')) {
        const dm = v.body.match(/"([^"]+)"/);
        if (dm) lineParts.push({ when: v.when, priority: v.priority, texts: [`"${dm[1]}"`] });
      }
      continue;
    }
    for (const t of v.texts) {
      const { body, line } = splitProseDialogue(t);
      addBodyChunks(v.when, v.priority, body);
      if (line) lineParts.push({ when: v.when, priority: v.priority, texts: [line] });
    }
  }

  // dedupe body parts by key — merge same-key
  const mergedBody = new Map();
  for (const p of bodyParts) {
    const id = `${p.key}|${p.when}|${p.priority}|${(p.texts || [p.fn]).join('|')}`;
    if (!mergedBody.has(p.key)) mergedBody.set(p.key, p);
  }

  for (const p of mergedBody.values()) {
    out.push(`registerPool('${p.key}', [`);
    out.push(`  { when: ${p.when}${p.priority}, text: [`);
    if (p.fn) out.push(`    ${p.fn},`);
    else for (const t of p.texts) out.push(`    ${q(t)},`);
    out.push('  ] },');
    out.push(']);', '');
  }

  if (lineParts.length) {
    out.push(`registerPool('${lineKey}', [`);
    for (const lp of lineParts) {
      out.push(`  { when: ${lp.when}${lp.priority}, text: [`);
      if (lp.fn) out.push(`    ${lp.fn},`);
      else for (const t of lp.texts) out.push(`    ${q(t)},`);
      out.push('  ] },');
    }
    out.push(']);', '');
  }

  const bodySlotKeys = [...mergedBody.keys()].map(k => `{${k}}`).join(' ');
  const skel = lineParts.length
    ? `${bodySlotKeys}\\n\\n{${lineKey}}`
    : bodySlotKeys;
  index.push(`registerPool('${key}', [`);
  index.push(`  { when: {}, text: ['${skel}'] },`);
  index.push(']);', '');
}

writeFileSync(FILE, out.join('\n'));
writeFileSync(INDEX, index.join('\n'));
console.log('Rewrote stream pre-stream with sentence splitting');
