// ═══════════════════════════════════════════════════════════════
// SPIRIT HUB — V2.0 central view (embodiment, resonance, rituals)
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { getResonanceTier, getCombinedClassLbs } from '../gameData/v2/cravingResonance.js';
import { canTriggerDream } from '../gameData/v2/appetiteDreams.js';
import { getAvailableRituals } from '../gameData/v2/feastRituals.js';
import { StudentPortrait } from '../components/StudentPortrait.jsx';

const ACCENT = '#8a4be0';

export function SpiritHubView({
  students,
  v2State,
  ownedSkills,
  ownedClassSkills,
  embodimentState,
  onOpenEmbodiment,
  onCreateLink,
  onOpenRituals,
  onOpenDream,
  ap,
}) {
  const [linkPickA, setLinkPickA] = useState(null);
  const visible = students.filter((s) => !s.hidden);
  const links = v2State?.resonance?.links || [];
  const tier = getResonanceTier(links.length, getCombinedClassLbs(students));
  const rituals = getAvailableRituals({ ownedSkills, ownedClassSkills, students });
  const hasSpiritRide = (ownedSkills?.spirit_ride || 0) >= 1;
  const hasHungerWeb = (ownedSkills?.hunger_web || 0) >= 1;
  const hasDreamWalk = (ownedSkills?.dream_walk || 0) >= 1;
  const activeId = embodimentState?.activeStudentId ?? v2State?.embodiment?.activeStudentId;

  const isLinked = (aId, bId) => links.some(
    (l) => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId),
  );

  const handleStudentPick = (id) => {
    if (linkPickA == null) {
      setLinkPickA(id);
      return;
    }
    if (linkPickA === id) {
      setLinkPickA(null);
      return;
    }
    if (isLinked(linkPickA, id)) {
      setLinkPickA(null);
      return;
    }
    onCreateLink?.(linkPickA, id);
    setLinkPickA(null);
  };

  const linkedIds = (id) => links.flatMap((l) => (l.a === id ? [l.b] : l.b === id ? [l.a] : []));
  const pickLabel = linkPickA == null
    ? 'Select first student to link'
    : `Select partner for ${visible.find((s) => s.id === linkPickA)?.name || 'student'}`;

  return (
    <div>
      <p style={C.secT}>Spirit Dominion — 2.0</p>
      <div style={{ ...C.card, borderColor: `${ACCENT}60`, marginBottom: 12 }}>
        <p style={{ fontSize: 11, color: '#b0a0d0', lineHeight: 1.6 }}>
          The gluttony spirit extends beyond the professor. Inhabit students. Bind their appetites. Feast as ceremony. Dream in hunger.
        </p>
      </div>

      {/* Embodiment */}
      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#c0a0e0', marginBottom: 8, letterSpacing: 1 }}>
          🌒 SPIRIT EMBODIMENT
        </div>
        {!hasSpiritRide ? (
          <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>Unlock Spirit Ride in the Influence skill tree.</p>
        ) : (
          <>
            {activeId != null && (
              <p style={{ fontSize: 11, color: '#90c0a0', marginBottom: 8 }}>
                Currently inhabiting: {visible.find((s) => s.id === activeId)?.name || 'unknown'}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {visible.map((s) => (
                <button key={s.id} type="button" style={{ ...C.btn('#4a2870'), fontSize: 10, padding: '6px 10px' }}
                  onClick={() => onOpenEmbodiment?.(s)}>
                  <StudentPortrait student={s} size={48} showLabel={false} />
                  <span style={{ display: 'block', marginTop: 4 }}>{s.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Resonance */}
      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#c0a0e0', marginBottom: 8, letterSpacing: 1 }}>
          🔗 CRAVING RESONANCE — {tier.label}
        </div>
        {!hasHungerWeb ? (
          <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>Unlock Hunger Web in the Gluttony skill tree.</p>
        ) : (
          <>
            <p style={{ fontSize: 10, color: '#8090a0', marginBottom: 8 }}>{tier.desc} · {links.length} links</p>
            {visible.length >= 2 && (
              <div style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 10, color: '#90a8c0', marginBottom: 6 }}>{pickLabel}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {visible.map((s) => {
                    const selected = linkPickA === s.id;
                    const alreadyLinked = linkPickA != null && linkPickA !== s.id && isLinked(linkPickA, s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        disabled={alreadyLinked}
                        style={{
                          ...C.smBtn,
                          fontSize: 10,
                          background: selected ? '#2a4860' : undefined,
                          opacity: alreadyLinked ? 0.4 : 1,
                        }}
                        onClick={() => handleStudentPick(s.id)}
                      >
                        {s.name}
                        {linkedIds(s.id).length > 0 && (
                          <span style={{ display: 'block', fontSize: 8, color: '#6080a0' }}>
                            {linkedIds(s.id).length} link{linkedIds(s.id).length > 1 ? 's' : ''}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {linkPickA != null && (
                  <button type="button" style={{ ...C.smBtn, fontSize: 9, marginTop: 6 }} onClick={() => setLinkPickA(null)}>
                    Cancel
                  </button>
                )}
              </div>
            )}
            {links.map((l, i) => {
              const a = visible.find((s) => s.id === l.a);
              const b = visible.find((s) => s.id === l.b);
              return (
                <div key={i} style={{ fontSize: 10, color: '#7090a0', marginBottom: 4 }}>
                  {a?.name} ↔ {b?.name}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Rituals */}
      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#c0a0e0', marginBottom: 8, letterSpacing: 1 }}>
          🍽 FEAST RITUALS
        </div>
        {rituals.length === 0 ? (
          <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>Unlock Ritual Kitchen classroom upgrade.</p>
        ) : (
          <button type="button" style={{ ...C.btn('#8a4020'), width: '100%' }} onClick={onOpenRituals}>
            Open Feast Rituals ({rituals.length} available)
          </button>
        )}
      </div>

      {/* Dreams */}
      <div style={{ ...C.card }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#c0a0e0', marginBottom: 8, letterSpacing: 1 }}>
          💤 APPETITE DREAMS
        </div>
        {!hasDreamWalk ? (
          <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>Unlock Dream Walk in the Corruption skill tree.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {visible.filter((s) => (s.corruption || 0) >= 40).map((s) => (
              <button key={s.id} type="button" style={{ ...C.smBtn, fontSize: 10 }}
                disabled={ap < 2}
                onClick={() => onOpenDream?.(s)}>
                Dream: {s.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
