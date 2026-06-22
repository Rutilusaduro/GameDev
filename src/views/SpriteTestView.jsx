// ═══════════════════════════════════════════════════════════════
// SPRITE TEST VIEW — pixel grid tuning workspace
// ═══════════════════════════════════════════════════════════════
import { LILITH_PROFILES, PROFILE_PALETTE } from '../gameData/profileSprites.js';
import { WEIGHT_STAGES } from '../gameData/stages.js';
import { C } from '../styles.js';

const PIX = 4;

// White outline via drop-shadow filter — same technique as hunt modal
const OUTLINE = [
  'drop-shadow(1px 0 0 rgba(255,255,255,0.9))',
  'drop-shadow(-1px 0 0 rgba(255,255,255,0.9))',
  'drop-shadow(0 1px 0 rgba(255,255,255,0.9))',
  'drop-shadow(0 -1px 0 rgba(255,255,255,0.9))',
  'drop-shadow(0 0 4px rgba(180,100,255,0.4))',
].join(' ');

function SpriteCard({ grid, stageId }) {
  const stage = WEIGHT_STAGES[stageId];
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        background: 'radial-gradient(circle at 50% 70%, #0d0020, #04000c)',
        border: `1px solid ${stage.color}60`,
        borderRadius: 8,
        padding: 16,
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        minWidth: cols * PIX + 32,
        minHeight: rows * PIX + 32,
      }}>
        <svg
          viewBox={`0 0 ${cols} ${rows}`}
          width={cols * PIX}
          height={rows * PIX}
          style={{ imageRendering: 'pixelated', display: 'block', filter: OUTLINE }}
          shapeRendering="crispEdges"
        >
          {grid.map((row, y) => {
            const rects = [];
            let x = 0;
            while (x < row.length) {
              const c = row[x];
              if (!c) { x++; continue; }
              let run = 1;
              while (x + run < row.length && row[x + run] === c) run++;
              rects.push(
                <rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={PROFILE_PALETTE[c] || '#f0f'} />
              );
              x += run;
            }
            return rects;
          })}
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          background: stage.color,
          color: '#fff',
          borderRadius: 10,
          padding: '2px 9px',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 4,
        }}>
          {stage.label.toUpperCase()}
        </div>
        <div style={{ fontSize: 9, color: '#60408a', letterSpacing: 1 }}>
          stage {stageId} · {cols}×{rows}px
        </div>
      </div>
    </div>
  );
}

export function SpriteTestView() {
  return (
    <div style={{ ...C.main }}>
      <div style={{ ...C.secT }}>Sprite Test — Lilith Profile (stages 0–{LILITH_PROFILES.length - 1})</div>
      <div style={{ fontSize: 11, color: '#503870', marginBottom: 20 }}>
        PIX={PIX} · white outline via drop-shadow · stages 7–11 pending authoring
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
        {LILITH_PROFILES.map((grid, i) => (
          <SpriteCard key={i} grid={grid} stageId={i} />
        ))}
      </div>
    </div>
  );
}
