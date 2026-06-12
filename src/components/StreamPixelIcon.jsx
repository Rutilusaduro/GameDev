// ═══════════════════════════════════════════════════════════════
// STREAM PIXEL ICON — tiny sprite for pre-stream choice cards
// ═══════════════════════════════════════════════════════════════
import { STREAM_PIXEL_PALETTE, PRE_STREAM_SPRITES, BRAND_HAT_LABELS } from '../gameData/streamPreStreamArt.js';

export function StreamPixelIcon({ spriteKey, size = 48, glow, brandId }) {
  const grid = PRE_STREAM_SPRITES[spriteKey];
  if (!grid) return <div style={{ width: size, height: size }} />;
  const rows = grid.length;
  const cols = grid[0].length;
  const hatLabel = spriteKey === 'outfit.branded' && brandId
    ? (BRAND_HAT_LABELS[brandId] || brandId.slice(0, 2).toUpperCase())
    : null;

  return (
    <div style={{
      width: size,
      height: size,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, #1a1020, #0a060c)',
      border: `1px solid ${glow || '#ffffff18'}`,
      borderRadius: 8,
      boxShadow: glow ? `0 0 12px ${glow}` : 'none',
      overflow: 'hidden',
    }}
    >
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        width={size - 8}
        height={size - 8}
        style={{ imageRendering: 'pixelated', display: 'block' }}
        shapeRendering="crispEdges"
        preserveAspectRatio="xMidYMid meet"
      >
        {grid.map((row, y) => {
          const rects = [];
          let x = 0;
          while (x < row.length) {
            const ch = row[x];
            if (ch === '.') { x++; continue; }
            let run = 1;
            while (x + run < row.length && row[x + run] === ch) run++;
            rects.push(
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={run}
                height={1}
                fill={STREAM_PIXEL_PALETTE[ch] || '#f0f'}
              />,
            );
            x += run;
          }
          return rects;
        })}
        {hatLabel && (
          <text
            x={cols / 2}
            y={4.6}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize="2.8"
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            style={{ pointerEvents: 'none' }}
          >
            {hatLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
