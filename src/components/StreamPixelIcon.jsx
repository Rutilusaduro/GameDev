// ═══════════════════════════════════════════════════════════════
// STREAM PIXEL ICON — tiny sprite for pre-stream choice cards
// ═══════════════════════════════════════════════════════════════
import { STREAM_PIXEL_PALETTE, PRE_STREAM_SPRITES } from '../gameData/streamPreStreamArt.js';

export function StreamPixelIcon({ spriteKey, size = 48, glow }) {
  const grid = PRE_STREAM_SPRITES[spriteKey];
  if (!grid) return <div style={{ width: size, height: size }} />;
  const rows = grid.length;
  const cols = grid[0].length;
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={size}
      style={{
        imageRendering: 'pixelated',
        flexShrink: 0,
        background: 'radial-gradient(circle at 50% 55%, #1a1020, #0a060c)',
        border: `1px solid ${glow || '#ffffff18'}`,
        borderRadius: 8,
        boxShadow: glow ? `0 0 12px ${glow}` : 'none',
      }}
      shapeRendering="crispEdges"
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
    </svg>
  );
}
