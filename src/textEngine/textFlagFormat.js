/** Filter engine trace to annotatable leaf nodes. */
export function traceToFlagNodes(trace = []) {
  return (trace || []).filter(
    (t) => t.leaf && t.text?.trim() && !t.key?.startsWith('subject.'),
  );
}

/** Split prose into sentence-sized flag units when no trace exists. */
export function proseToFlagNodes(text = '') {
  const parts = String(text)
    .split(/\n+/)
    .flatMap((block) => block.split(/(?<=[.!?])\s+/))
    .map((t) => t.trim())
    .filter(Boolean);
  return parts.map((t, i) => ({
    key: `line:${i + 1}`,
    text: t,
    leaf: true,
    depth: 0,
  }));
}

export function formatTextFlagExport(flagged) {
  return flagged
    .map((f, i) => {
      const problems = f.problems?.length
        ? `\n--- problems ---\n${f.problems.map((p) => `[${p.key}] "${p.text}" → ${p.note || '(flagged, no note)'}`).join('\n')}`
        : '';
      return `=== FLAGGED ${i + 1}/${flagged.length} ===\nsection: ${f.section}\nstate: ${f.stateLine}\n---\n${f.text}${problems}`;
    })
    .join('\n\n');
}

export function buildStateLine(student, extras = {}) {
  const name = student?.name || 'Unknown';
  const id = student?.id ?? '?';
  const lbs = Math.round(student?.lbs ?? 0);
  const stage = extras.stageLabel || '';
  const bits = [`${name} (id ${id})`, `${lbs} lbs${stage ? ` (${stage})` : ''}`];
  if (extras.mood) bits.push(`mood ${extras.mood}`);
  if (extras.week) bits.push(`week ${extras.week}`);
  if (extras.extra) bits.push(extras.extra);
  return bits.join(' · ');
}
