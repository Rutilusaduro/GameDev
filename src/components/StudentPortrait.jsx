// ═══════════════════════════════════════════════════════════════
// STUDENT PORTRAIT — pixel silhouette renderer
// ═══════════════════════════════════════════════════════════════
import { getStage } from '../gameData/stages.js';
import { getStudentSprite, PORTRAIT_PALETTE, PORTRAIT_TIER_LABELS, portraitTier } from '../gameData/studentSprites.js';

export function StudentPortrait({ student, size = 80, showLabel = true }) {
  const stageId = student?.lbs != null ? getStage(student.lbs).id : 0;
  const tier = portraitTier(stageId);
  const { grid, accent, flip } = getStudentSprite(stageId, student?.id ?? 0, student?.bodyType || 'straight');
  const rows = grid.length;
  const cols = grid[0].length;
  const palette = { ...PORTRAIT_PALETTE, a: accent, h: `${accent}cc`, S: accent, s: `${accent}99` };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        width={size}
        height={size}
        style={{
          imageRendering: 'pixelated',
          background: `radial-gradient(circle at 50% 60%, ${accent}22, #0a0510)`,
          border: `1px solid ${accent}60`,
          borderRadius: 10,
          transform: flip ? 'scaleX(-1)' : undefined,
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
              <rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[ch] || accent} />,
            );
            x += run;
          }
          return rects;
        })}
      </svg>
      {showLabel && (
        <span style={{ fontSize: 9, letterSpacing: 2, color: `${accent}aa` }}>
          {PORTRAIT_TIER_LABELS[tier]?.toUpperCase() || 'PORTRAIT'}
        </span>
      )}
    </div>
  );
}
