// Split legacy monolith prose into fragment pools for text:lint (≤200 chars per pool text).
const MAX = 195;

let fragCounter = 0;

export function resetFragCounter() {
  fragCounter = 0;
}

function splitChunk(text) {
  if (text.length <= MAX) return [text];
  const chunks = [];
  let rest = text.trim();
  while (rest.length > MAX) {
    let cut = rest.lastIndexOf('. ', MAX);
    if (cut < MAX * 0.2) cut = rest.lastIndexOf(' ', MAX);
    if (cut < MAX * 0.2) cut = MAX;
    const piece = rest.slice(0, cut + (rest[cut] === '.' ? 1 : 0)).trim();
    chunks.push(piece);
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function registerFragment(poolKey, chunk, fragmentPools) {
  const id = ++fragCounter;
  const fragKey = `${poolKey}._f${id}`;
  fragmentPools.push({ key: fragKey, text: [chunk] });
  return `{${fragKey}}`;
}

export function decomposeText(poolKey, text, fragmentPools) {
  if (text.length <= MAX && !text.includes('\n\n')) return text;
  const paragraphs = text.split(/\n\n+/);
  const out = paragraphs.map((para) => {
    const chunks = splitChunk(para.trim());
    if (chunks.length === 1) return chunks[0];
    return chunks.map((c) => registerFragment(poolKey, c, fragmentPools)).join(' ');
  });
  return out.join('\n\n');
}

export function decomposeVariants(poolKey, variants) {
  const fragmentPools = [];
  const newVariants = variants.map((v) => ({
    ...v,
    text: v.text.map((t) => decomposeText(poolKey, t, fragmentPools)),
  }));
  return { variants: newVariants, fragmentPools };
}

const MAX_SLOTS_PER_LINE = 2;
const MAX_LINE_CHARS = 100;

/** Build a lint-safe skeleton from monolith prose (≤200 chars per pool text). */
export function buildBodyPool(bodyKey, body, fragmentPools, counter = { n: 1 }) {
  const lines = [];
  for (const para of body.split(/\n\n+/)) {
    const chunks = splitChunk(para.trim());
    let slotBatch = [];
    for (const chunk of chunks) {
      const fragKey = `${bodyKey}._f${counter.n}`;
      counter.n += 1;
      fragmentPools.push({ key: fragKey, text: [chunk] });
      slotBatch.push(`{${fragKey}}`);
      if (slotBatch.length >= MAX_SLOTS_PER_LINE || slotBatch.join(' ').length > MAX_LINE_CHARS) {
        lines.push(slotBatch.join(' '));
        slotBatch = [];
      }
    }
    if (slotBatch.length) lines.push(slotBatch.join(' '));
  }

  const parts = [];
  let batch = [];
  let batchLen = 0;
  for (const line of lines) {
    const addLen = (batch.length ? 2 : 0) + line.length;
    if (batchLen + addLen > MAX && batch.length) {
      parts.push(batch.join('\n\n'));
      batch = [line];
      batchLen = line.length;
    } else {
      batch.push(line);
      batchLen += addLen;
    }
  }
  if (batch.length) parts.push(batch.join('\n\n'));

  if (parts.length === 1) return { mainSkeleton: parts[0], subPools: [] };

  const subPools = parts.map((skeleton, i) => ({ key: `${bodyKey}._sk${i}`, skeleton }));
  const mainSkeleton = subPools.map((sp) => `{${sp.key}}`).join('\n\n');
  return { mainSkeleton, subPools };
}

export function emitFragmentPools(fragmentPools, esc) {
  return fragmentPools.map(
    (fp) => `registerPool('${fp.key}', [\n  { when: {}, text: ${esc(fp.text)} },\n]);`,
  );
}
