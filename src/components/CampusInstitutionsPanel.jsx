// C2 — institution upgrades at matching campus nodes
import { C } from '../styles.js';
import { formatMoney } from '../gameData/wallet.js';
import {
  institutionAtNode,
  nextTierOffer,
  canInaugurateTier,
  getInstitutionTier,
  institutionSummaryLine,
} from '../gameData/campusInstitutions.js';

export function CampusInstitutionsPanel({
  nodeId,
  institutionState,
  saturationTier = 0,
  money = 0,
  ap = 0,
  onInaugurate,
}) {
  const institutions = institutionAtNode(nodeId, institutionState, { saturationTier });
  if (!institutions.length) return null;

  return (
    <div style={{ ...C.card, marginTop: 8, padding: '10px 12px', borderColor: '#3a5040' }}>
      <div style={{ fontSize: 9, color: '#70a888', letterSpacing: 2, marginBottom: 8 }}>CAMPUS INSTITUTIONS</div>
      {institutions.map((inst) => {
        const tier = getInstitutionTier(institutionState, inst.id);
        const offer = nextTierOffer(institutionState, inst.id, { saturationTier });
        const check = offer ? canInaugurateTier(institutionState, inst.id, { money, ap }, { saturationTier }) : null;
        const summary = institutionSummaryLine(institutionState, inst.id, { saturationTier });

        return (
          <div key={inst.id} style={{ marginBottom: tier < 3 && offer ? 10 : 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a8d8b8', marginBottom: 2 }}>
              {inst.glyph} {inst.label}
              {tier > 0 && <span style={{ fontSize: 10, color: '#6a9878', marginLeft: 6 }}>Tier {tier}/{3}</span>}
            </div>
            {summary && tier > 0 && (
              <div style={{ fontSize: 10, color: '#88a898', marginBottom: 4 }}>{summary}</div>
            )}
            {offer ? (
              <div style={{ ...C.infoBox('rgba(20,40,28,0.35)'), marginBottom: 6 }}>
                <div style={{ fontSize: 11, color: '#c0e0c8', fontWeight: 600 }}>Next: {offer.label}</div>
                <div style={{ fontSize: 10, color: '#88a898', lineHeight: 1.5, marginTop: 4 }}>{offer.desc}</div>
                <div style={{ fontSize: 10, color: '#70a080', marginTop: 6 }}>
                  {formatMoney(offer.cost)} · {offer.apCost} AP inauguration slot
                </div>
                <button
                  type="button"
                  style={{
                    ...C.smBtn,
                    marginTop: 8,
                    fontSize: 10,
                    opacity: check?.ok ? 1 : 0.55,
                  }}
                  disabled={!check?.ok}
                  onClick={() => onInaugurate?.(inst.id)}
                >
                  Inaugurate tier {offer.tierIndex + 1}
                </button>
                {!check?.ok && check?.reason && (
                  <div style={{ fontSize: 9, color: '#c09070', marginTop: 4 }}>{check.reason}</div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: 10, color: '#6a8878', fontStyle: 'italic' }}>Fully upgraded.</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
