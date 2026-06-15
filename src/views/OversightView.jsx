import { C } from '../styles.js';
import { AIB_AGENDA_CARDS, AIB_COUNTERS, getOversightTelegraph } from '../gameData/opposition.js';

export function OversightView({
  opposition,
  adminScrutiny,
  ap,
  students,
  onRunCounter,
  onRunCounterOnMember,
  onClose,
}) {
  const aib = opposition?.aib;
  if (!aib?.unlocked) {
    return (
      <div style={{ padding: 24, color: '#888' }}>
        <p>Administrative oversight is quiet — for now. Scrutiny must reach 25 before the Academic Inquiry Board takes notice.</p>
        <button type="button" style={{ ...C.btn('#555'), marginTop: 12 }} onClick={onClose}>← Back</button>
      </div>
    );
  }

  const telegraph = getOversightTelegraph(opposition);
  const debuffs = aib.activeDebuffs || {};
  const discreditable = AIB_AGENDA_CARDS.filter((c) => !aib.deckRemoved.includes(c.id));

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: '0 auto' }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: '#c44', marginBottom: 8 }}>👁 OVERSIGHT — ACADEMIC INQUIRY BOARD</div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 8 }}>
        Scrutiny {adminScrutiny} · Scandal {aib.scandalMeter} · Truce {aib.truceWeeks}w
        {opposition.proxies?.wellnessCoalition && ' · Wellness Coalition'}
        {opposition.proxies?.accreditation && ' · Accreditation Observer'}
        {opposition.proxies?.asceticCircle && ' · Ascetic Circle'}
        {opposition.supernatural?.actTriggered && ` · Scarcity ${opposition.supernatural.scarcityPressure}`}
      </div>
      {telegraph && (
        <div style={{ fontSize: 11, color: '#eaa', padding: '8px 10px', background: '#2a1818', borderRadius: 4, marginBottom: 12 }}>
          {telegraph}
        </div>
      )}
      {(debuffs.gainMultWeeks > 0 || debuffs.budgetFrozenWeeks > 0) && (
        <div style={{ fontSize: 11, color: '#c9a060', marginBottom: 12 }}>
          Active debuffs:
          {debuffs.gainMultWeeks > 0 && ` gain ×${debuffs.gainMult} (${debuffs.gainMultWeeks}w)`}
          {debuffs.budgetFrozenWeeks > 0 && ` · budget frozen (${debuffs.budgetFrozenWeeks}w)`}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>AGENDA QUEUE</div>
        {aib.agendaQueue?.length ? aib.agendaQueue.map((item, i) => (
          <div key={i} style={{ fontSize: 12, color: '#eaa', padding: '8px 10px', background: '#2a1818', borderRadius: 4, marginBottom: 6 }}>
            {item.label} — resolves week {item.resolvesWeek}
          </div>
        )) : <div style={{ fontSize: 12, color: '#6a6' }}>No pending agenda cards.</div>}
      </div>

      {aib.pendingHearing && (
        <div style={{ fontSize: 11, color: '#e88', marginBottom: 12, padding: 10, background: '#301010', borderRadius: 6 }}>
          ⚠️ Removal hearing pending for {students.find((s) => s.id === aib.pendingHearing.studentId)?.name || 'student'}.
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>BOARD MEMBERS</div>
        {aib.members.map((m) => (
          <div key={m.id} style={{ fontSize: 11, color: '#ccc', padding: '6px 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div>
              <strong>{m.name}</strong> — {m.role}<br />
              <span style={{ color: '#999' }}>Resolve {m.resolve} · {m.stance} · {Math.round(m.weightLbs)} lbs</span>
            </div>
            <button
              type="button"
              disabled={ap < 2}
              style={{ ...C.btn('#5a3040'), fontSize: 10, padding: '4px 8px', opacity: ap >= 2 ? 1 : 0.4 }}
              onClick={() => onRunCounterOnMember('machine_fatten', m.id)}
            >
              Chamber
            </button>
          </div>
        ))}
        {aib.rotatingAdvocate && (
          <div style={{ fontSize: 10, color: '#888', marginTop: 8 }}>
            Rotating seat: {aib.rotatingAdvocate.name}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>COUNTERS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {AIB_COUNTERS.filter((c) => c.id !== 'machine_fatten').map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={ap < c.ap}
              style={{ ...C.btn(ap >= c.ap ? '#5a3030' : '#333'), textAlign: 'left', fontSize: 12, opacity: ap >= c.ap ? 1 : 0.5 }}
              onClick={() => onRunCounter(c.id)}
            >
              {c.label} ({c.ap} AP) — {c.desc}
            </button>
          ))}
        </div>
      </div>

      {discreditable.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>DISCREDIT TARGET (2 AP)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {discreditable.map((c) => (
              <button
                key={c.id}
                type="button"
                disabled={ap < 2}
                style={{ ...C.btn('#4a3a28'), fontSize: 10, opacity: ap >= 2 ? 1 : 0.4 }}
                onClick={() => onRunCounter('public_discredit', { cardId: c.id })}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button type="button" style={{ ...C.btn('#555') }} onClick={onClose}>← Back to class</button>
    </div>
  );
}
