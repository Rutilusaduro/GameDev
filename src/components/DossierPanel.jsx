// ═══════════════════════════════════════════════════════════════
// DOSSIER PANEL — per-girl living journal (B1)
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { assembleDossier } from '../gameData/dossier.js';
import { PSYCH_TIERS } from '../gameData/psychState.js';
import { StageTag } from './ui.jsx';
import { getStage } from '../gameData/stages.js';
import { getDiary } from '../utils/gameHelpers.js';
import { DossierMomentModal } from './DossierMomentModal.jsx';
import { resolvePinExcerpt } from '../gameData/dossierReplay.js';

const PSYCH_COLORS = {
  fixation: '#c070e0',
  obsession: '#e07050',
  dependence: '#50a0e0',
  shame: '#a05080',
};

const PIN_BORDER = {
  stageUp: '#d8a030',
  scaleBreak: '#80c0e0',
  bondShift: '#c080e0',
  stuffed: '#d870b0',
  ascended: '#60d0f0',
  narrative: '#9070c0',
  gateway: '#b09050',
  garment: '#c05030',
  player: '#80c0a0',
};

function WeightSparkline({ snapshots, peakLbs, startLbs, onMarker }) {
  const data = snapshots.length ? snapshots : [{ week: 0, lbs: startLbs, stageId: 0 }];
  const lbsVals = data.map((d) => d.lbs);
  const minLbs = Math.min(...lbsVals, startLbs ?? lbsVals[0]) * 0.95;
  const maxLbs = Math.max(...lbsVals, peakLbs || 0) * 1.02;
  const range = Math.max(1, maxLbs - minLbs);
  const w = 320;
  const h = 72;
  const pad = 6;
  const points = data.map((d, i) => {
    const x = pad + (data.length <= 1 ? w / 2 : (i / (data.length - 1)) * (w - pad * 2));
    const y = h - pad - ((d.lbs - minLbs) / range) * (h - pad * 2);
    return { x, y, ...d };
  });
  const poly = points.map((p) => `${p.x},${p.y}`).join(' ');
  const waterY = peakLbs
    ? h - pad - ((peakLbs - minLbs) / range) * (h - pad * 2)
    : null;

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={w} height={h + 16} style={{ display: 'block', minWidth: w }}>
        {waterY != null && (
          <line x1={pad} y1={waterY} x2={w - pad} y2={waterY} stroke="#40b0d0" strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />
        )}
        {points.length > 1 && (
          <polyline fill="none" stroke="#a070d0" strokeWidth={2} points={poly} />
        )}
        {points.map((p, i) => {
          const prev = i > 0 ? points[i - 1] : null;
          const crossed = prev && p.stageId > prev.stageId;
          const garmentFail = p.flags?.some((f) => f.startsWith('garment:'));
          const r = crossed ? 5 : garmentFail ? 4 : 3;
          const fill = crossed ? '#d8a030' : garmentFail ? '#c05030' : '#c090e8';
          return (
            <circle
              key={`${p.week}-${i}`}
              cx={p.x}
              cy={p.y}
              r={r}
              fill={fill}
              stroke="#0e0820"
              strokeWidth={1}
              style={{ cursor: crossed || garmentFail ? 'pointer' : 'default' }}
              onClick={() => (crossed || garmentFail) && onMarker?.(p, crossed ? 'stage' : 'garment')}
            />
          );
        })}
        <text x={pad} y={h + 12} fill="#605080" fontSize={9}>W{data[0]?.week ?? 0}</text>
        <text x={w - pad} y={h + 12} fill="#605080" fontSize={9} textAnchor="end">W{data[data.length - 1]?.week ?? 0}</text>
      </svg>
      {peakLbs && (
        <div style={{ fontSize: 10, color: '#60b0d0', marginTop: 2 }}>
          Peak waterline · {Math.round(peakLbs)} lbs
        </div>
      )}
    </div>
  );
}

function PsychRibbons({ bands }) {
  if (!bands?.length) {
    return <div style={{ fontSize: 11, color: '#706090' }}>No psych history yet — ribbons fill as weeks pass.</div>;
  }
  const keys = ['fixation', 'obsession', 'dependence', 'shame'];
  const weeks = bands.map((b) => b.week);
  const minW = weeks[0];
  const maxW = weeks[weeks.length - 1] || minW;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {keys.map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 68, fontSize: 9, color: PSYCH_COLORS[key], letterSpacing: 1, textTransform: 'capitalize' }}>{key}</div>
          <div style={{ flex: 1, display: 'flex', gap: 2, height: 10, alignItems: 'stretch' }}>
            {bands.map((b) => {
              const tier = b.tiers?.[key] ?? 0;
              const color = PSYCH_TIERS[tier]?.color || '#3a3050';
              const flex = bands.length <= 1 ? 1 : 1;
              return (
                <div
                  key={`${key}-${b.week}`}
                  title={`W${b.week} · ${PSYCH_TIERS[tier]?.label}`}
                  style={{ flex, background: color, borderRadius: 2, minWidth: 4, opacity: 0.55 + tier * 0.15 }}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 9, color: '#504060', marginTop: 2 }}>Week {minW} → {maxW}</div>
    </div>
  );
}

export function DossierPanel({ student, week, diaryOpts, onClose }) {
  const [activePin, setActivePin] = useState(null);
  const dossier = useMemo(() => assembleDossier(student, week), [student, week]);
  const st = getStage(student.lbs);
  const threshold = dossier.nextThreshold;
  const diaryLine = getDiary(student, week, diaryOpts);

  const handleMarker = (point, kind) => {
    const pin = dossier.pinnedMoments.find((p) => p.week === point.week && (kind === 'stage' ? p.kind === 'stageUp' : p.kind === 'garment'));
    if (pin) setActivePin(pin);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#9050c8' }}>📖 THE DOSSIER</div>
        <button type="button" style={{ ...C.smBtn, margin: 0 }} onClick={onClose}>← Detail</button>
      </div>

      {/* Header strip */}
      <div style={{ ...C.card, cursor: 'default', marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ margin: 0, color: '#d8a8ff', fontSize: 20 }}>{dossier.header.name}</h2>
            <StageTag stage={st} />
          </div>
          <span style={C.tag(dossier.header.wowDelta > 0 ? '#2a4a2a30' : '#2a2a3a30', dossier.header.wowDelta > 0 ? '#80c080' : '#9080a0')}>
            {dossier.header.wowDelta > 0 ? `+${dossier.header.wowDelta} lbs this week` : 'steady week'}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#8060a0', marginTop: 4 }}>{dossier.header.lbs} lbs · {dossier.header.stageLabel}</div>
      </div>

      {/* Next threshold — front and center */}
      <div style={C.infoBox('rgba(50,30,10,0.35)')}>
        <div style={{ fontSize: 9, color: '#d8a030', letterSpacing: 2, marginBottom: 6 }}>NEXT THRESHOLD</div>
        <div style={{ fontSize: 12, color: '#e8d0a8', lineHeight: 1.7 }}>
          {threshold.lbsToNextRung > 0 && threshold.nextStageLabel && (
            <div>{threshold.lbsToNextRung} lbs to {threshold.nextStageLabel}</div>
          )}
          {threshold.garment && (
            <div>
              {threshold.garment.name} · {threshold.garment.state} ({threshold.garment.pct}% strain)
            </div>
          )}
          {threshold.psych && threshold.psych.gap <= 12 && (
            <div>
              {threshold.psych.axis} near {threshold.psych.nextTier.label} ({threshold.psych.gap} pts away)
            </div>
          )}
          {threshold.lockedScene && (
            <div style={{ fontStyle: 'italic', color: '#c0a880' }}>{threshold.lockedScene.hint}</div>
          )}
          {!threshold.lbsToNextRung && !threshold.garment && !threshold.lockedScene && (
            <div>She has room. Nothing urgent presses yet.</div>
          )}
        </div>
      </div>

      {/* Weight line */}
      <div style={C.infoBox('rgba(30,15,60,0.35)')}>
        <div style={{ fontSize: 9, color: '#8050c0', letterSpacing: 2, marginBottom: 6 }}>THE WEIGHT LINE</div>
        <WeightSparkline
          snapshots={dossier.weightLine.snapshots}
          peakLbs={dossier.weightLine.peakLbs}
          startLbs={dossier.weightLine.startLbs}
          onMarker={handleMarker}
        />
        <div style={{ fontSize: 10, color: '#706090', marginTop: 4 }}>
          Tap gold markers for stage crossings · red ticks for garment strain
        </div>
      </div>

      {/* Psych bands */}
      <div style={C.infoBox('rgba(40,10,40,0.3)')}>
        <div style={{ fontSize: 9, color: '#a05090', letterSpacing: 2, marginBottom: 6 }}>PSYCH BANDS</div>
        <PsychRibbons bands={dossier.psychBands} />
      </div>

      {/* Pinned moments */}
      <div style={C.infoBox('rgba(20,40,30,0.25)')}>
        <div style={{ fontSize: 9, color: '#50a080', letterSpacing: 2, marginBottom: 6 }}>PINNED MOMENTS</div>
        {dossier.pinnedMoments.length === 0 ? (
          <div style={{ fontSize: 11, color: '#607060' }}>Thresholds and beats pin here as they happen.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {dossier.pinnedMoments.map((pin) => {
              const preview = pin.excerpt || resolvePinExcerpt(student, pin, week);
              return (
              <button
                key={pin.id}
                type="button"
                onClick={() => setActivePin(pin)}
                style={{
                  ...C.card,
                  textAlign: 'left',
                  borderLeft: `3px solid ${PIN_BORDER[pin.kind] || '#605080'}`,
                  marginBottom: 0,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: '#c0d8c0' }}>{pin.label}</div>
                {preview && (
                  <div style={{ fontSize: 11, color: '#90a890', marginTop: 4, fontStyle: 'italic', lineHeight: 1.5 }}>
                    {preview.slice(0, 120)}{preview.length > 120 ? '…' : ''}
                  </div>
                )}
              </button>
            );})}
          </div>
        )}
      </div>

      {/* Diary */}
      <div style={C.infoBox('rgba(30,5,60,0.4)')}>
        <div style={{ fontSize: 9, color: '#5028a0', letterSpacing: 2, marginBottom: 4 }}>DIARY · NOW</div>
        <div style={{ fontSize: 12, color: '#c8b898', fontStyle: 'italic', lineHeight: 1.8 }}>{diaryLine}</div>
      </div>

      {/* Wardrobe morgue */}
      <div style={C.infoBox('rgba(40,20,10,0.25)')}>
        <div style={{ fontSize: 9, color: '#a06030', letterSpacing: 2, marginBottom: 6 }}>WARDROBE MORGUE</div>
        {dossier.wardrobeMorgue.length === 0 ? (
          <div style={{ fontSize: 11, color: '#806050' }}>Nothing retired yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {dossier.wardrobeMorgue.map((g) => (
              <div key={g.id} style={{ fontSize: 12, color: '#d0b090' }}>
                {g.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {activePin && (
        <DossierMomentModal pin={activePin} student={student} week={week} onClose={() => setActivePin(null)} />
      )}
    </div>
  );
}
