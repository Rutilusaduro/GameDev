// ═══════════════════════════════════════════════════════════════
// SPRITE TEST VIEW — render pixel grids for tuning
// ═══════════════════════════════════════════════════════════════
import { LILITH_STAGE_6 } from '../gameData/profileSprites.js';
import { C } from '../styles.js';

const PIX = 2;
const PIX_C = { 1: '#f2eeff', 2: '#0a000e', 3: '#1c0030', 4: '#070010' };

function renderGrid(grid, size = 2) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={cols * size}
      height={rows * size}
      style={{ imageRendering: 'pixelated', border: '1px solid #4a1590', background: 'radial-gradient(circle at 50% 60%, #1a0a20, #0a0510)' }}
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) => {
        const rects = [];
        let x = 0;
        while (x < row.length) {
          const ch = row[x];
          if (ch === 0) { x++; continue; }
          let run = 1;
          while (x + run < row.length && row[x + run] === ch) run++;
          rects.push(
            <rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={PIX_C[ch] || '#f0f'} />
          );
          x += run;
        }
        return rects;
      })}
    </svg>
  );
}

export function SpriteTestView() {
  return (
    <div style={{ ...C.body, flexDirection: 'column', padding: 20 }}>
      <h1 style={{ color: '#d8a8ff', marginBottom: 20 }}>Sprite Grid Test</h1>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ color: '#c090ff', marginBottom: 10 }}>Lilith Stage 6 (22×40)</h3>
          <div style={{ padding: 10, background: 'rgba(0,0,0,0.3)', borderRadius: 8, display: 'inline-block' }}>
            {renderGrid(LILITH_STAGE_6, 2)}
          </div>
          <p style={{ color: '#a88050', marginTop: 10, fontSize: 12 }}>Extremely fat (~400 lbs)</p>
        </div>
      </div>
    </div>
  );
}
