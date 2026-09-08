// Shared pool registration — split prose >200 chars into skeleton + fragments (text:lint).
import { registerPool } from '../engine.js';

export const FRAG_MAX = 200;

let decomposeId = 0;

/** Split long prose into ≤FRAG_MAX-char fragments. */
export function splitProseFragments(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return [];
  if (trimmed.length <= FRAG_MAX) return [trimmed];

  const chunks = [];
  const push = (s) => {
    const t = s.trim();
    if (t) chunks.push(t);
  };

  const splitLong = (para) => {
    if (para.length <= FRAG_MAX) {
      push(para);
      return;
    }
    const sentences = para.split(/(?<=[.!?])\s+/);
    let buf = '';
    for (const sent of sentences) {
      const piece = sent.trim();
      if (!piece) continue;
      if (piece.length > FRAG_MAX) {
        if (buf) { push(buf); buf = ''; }
        let remaining = piece;
        while (remaining.length > FRAG_MAX) {
          let cut = remaining.lastIndexOf(' ', FRAG_MAX);
          if (cut < FRAG_MAX * 0.45) cut = FRAG_MAX;
          push(remaining.slice(0, cut).trim());
          remaining = remaining.slice(cut).trim();
        }
        if (remaining) buf = remaining;
      } else if ((`${buf} ${piece}`).trim().length <= FRAG_MAX) {
        buf = buf ? `${buf} ${piece}` : piece;
      } else {
        push(buf);
        buf = piece;
      }
    }
    if (buf) push(buf);
  };

  for (const para of trimmed.split(/\n\n+/)) {
    splitLong(para.trim());
  }
  return chunks;
}

function chunkSlotRefs(refs) {
  const segments = [];
  let buf = '';
  for (const ref of refs) {
    const next = buf ? `${buf}\n\n${ref}` : ref;
    if (next.length > FRAG_MAX && buf) {
      segments.push(buf);
      buf = ref;
    } else {
      buf = next;
    }
  }
  if (buf) segments.push(buf);
  return segments;
}

function registerSlotSkeleton(poolKey, refs) {
  const segments = chunkSlotRefs(refs);
  if (segments.length === 1) {
    registerPool(poolKey, [{ when: {}, text: [segments[0]] }]);
    return;
  }
  segments.forEach((seg, i) => {
    registerPool(`${poolKey}.z${i}`, [{ when: {}, text: [seg] }]);
  });
  const childRefs = segments.map((_, i) => `{${poolKey}.z${i}}`);
  registerSlotSkeleton(poolKey, childRefs);
}

/** Register one pool from prose — decomposes when longer than FRAG_MAX. */
export function registerDecomposedPool(poolKey, text) {
  const fragments = splitProseFragments(text);
  if (!fragments.length) return;
  if (fragments.length === 1) {
    registerPool(poolKey, [{ when: {}, text: fragments }]);
    return;
  }
  const fragBase = `_${decomposeId++}`;
  fragments.forEach((frag, i) => {
    registerPool(`${fragBase}.f${i}`, [{ when: {}, text: [frag] }]);
  });
  const refs = fragments.map((_, i) => `{${fragBase}.f${i}}`);
  registerSlotSkeleton(poolKey, refs);
}

let settlingSubCounter = 0;

/**
 * registerPool wrapper — long static strings become skeleton slots preserving full render.
 * Functions pass through unchanged (dynamic prose).
 */
export function registerPoolAutoDecompose(key, variants) {
  const newVariants = variants.map((v) => {
    const texts = Array.isArray(v.text) ? v.text : [v.text];
    const newTexts = texts.map((t) => {
      if (typeof t === 'function') return t;
      if (typeof t === 'string' && t.length > FRAG_MAX) {
        const subKey = `${key}._d${settlingSubCounter++}`;
        registerDecomposedPool(subKey, t);
        return `{${subKey}}`;
      }
      return t;
    });
    return { ...v, text: newTexts.length === 1 ? newTexts[0] : newTexts };
  });
  registerPool(key, newVariants);
}
