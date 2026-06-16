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

export function emitFragmentPools(fragmentPools, esc) {
  return fragmentPools.map(
    (fp) => `registerPool('${fp.key}', [\n  { when: {}, text: ${esc(fp.text)} },\n]);`,
  );
}
