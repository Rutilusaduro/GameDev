// ═══════════════════════════════════════════════════════════════
// SCENE BACKDROP — decorative pixel-art headers for V2 modals
// ═══════════════════════════════════════════════════════════════

const VARIANTS = {
  spirit: { colors: ['#4a2870', '#8a4be0', '#2a1840'], pattern: '◆◇◆◇◆◇◆' },
  feast: { colors: ['#8a4020', '#c06030', '#3a2010'], pattern: '🍽·🍷·🍽·🍷' },
  dream: { colors: ['#284868', '#6090c8', '#1a2840'], pattern: '☾ · ✦ · ☾ · ✦' },
  echo: { colors: ['#3060a0', '#90b0c8', '#1a2848'], pattern: '⌁ ≋ ⌁ ≋ ⌁' },
  lab: { colors: ['#4a6080', '#80a0c0', '#1a2030'], pattern: '⚙ ◈ ⚙ ◈ ⚙' },
  embodiment: { colors: ['#4a2870', '#c0a0e0', '#1a1028'], pattern: '🌒 · ◐ · 🌒' },
  opposition: { colors: ['#304860', '#6080a0', '#101820'], pattern: '⚖ · 🏛 · ⚖' },
};

export function SceneBackdrop({ variant = 'spirit', height = 48 }) {
  const v = VARIANTS[variant] || VARIANTS.spirit;
  const [c1, c2, c3] = v.colors;
  return (
    <div
      style={{
        height,
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${c3} 0%, ${c1} 40%, ${c2} 100%)`,
        border: `1px solid ${c2}40`,
        position: 'relative',
      }}
    >
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x={i * 15}
            y={4 + (i % 3)}
            width={8 + (i % 4) * 2}
            height={4}
            fill={c2}
            opacity={0.4 + (i % 3) * 0.15}
          />
        ))}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          letterSpacing: 6,
          color: `${c2}99`,
          userSelect: 'none',
        }}
      >
        {v.pattern}
      </div>
    </div>
  );
}
