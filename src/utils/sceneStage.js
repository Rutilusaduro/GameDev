// Beat splitting + choice intent mapping for SceneStage (B2).

export const CHOICE_INTENTS = {
  observe: { icon: '👁', label: 'Observe' },
  press: { icon: '➡', label: 'Press' },
  feed: { icon: '🍽', label: 'Feed' },
  comfort: { icon: '🤝', label: 'Comfort' },
  wait: { icon: '⏸', label: 'Wait' },
};

const INTENT_RULES = [
  { intent: 'feed', re: /\b(feed|eat|serve|plate|bite|meal|feast|stuff|order)/i },
  { intent: 'comfort', re: /\b(apolog|comfort|hear|peace|gift|amends|reassur|hold)/i },
  { intent: 'press', re: /\b(continue|see it through|accept|yes|push|insist|demand|proceed)/i },
  { intent: 'wait', re: /\b(wait|not yet|leave|dismiss|later|skip|close|be for now)/i },
  { intent: 'observe', re: /\b(watch|listen|note|look|read|study)/i },
];

/** Split rendered prose into paragraph beats. */
export function splitProseToBeats(prose = '') {
  const raw = String(prose || '').trim();
  if (!raw) return [];
  const blocks = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  if (blocks.length > 1) return blocks;
  const lines = raw.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1) return lines;
  const sentences = raw.split(/(?<=[.!?…])\s+/).map((s) => s.trim()).filter(Boolean);
  return sentences.length > 1 ? sentences : [raw];
}

/** Guess stance icon from choice label text. */
export function inferChoiceIntent(label = '', explicitIntent) {
  if (explicitIntent && CHOICE_INTENTS[explicitIntent]) return explicitIntent;
  const text = String(label);
  for (const rule of INTENT_RULES) {
    if (rule.re.test(text)) return rule.intent;
  }
  return 'press';
}

/** Map trace nodes to beat indices by cumulative text length. */
export function mapTraceNodesToBeats(beats, traceNodes = []) {
  if (!beats.length || !traceNodes.length) return beats.map((text, i) => ({ text, nodes: [], index: i }));
  const full = beats.join(' ');
  let cursor = 0;
  return beats.map((text, index) => {
    const start = full.indexOf(text, cursor);
    const end = start >= 0 ? start + text.length : cursor + text.length;
    cursor = end;
    const nodes = traceNodes.filter((n) => {
      const pos = full.indexOf(n.text);
      return pos >= start && pos < end;
    });
    return { text, nodes, index };
  });
}
