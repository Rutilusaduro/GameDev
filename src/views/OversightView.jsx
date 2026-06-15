import { C } from '../styles.js';
import { AIB_COUNTERS } from '../gameData/opposition.js';

export function OversightView({
  opposition,
  adminScrutiny,
  ap,
  onRunCounter,
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

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: '0 auto' }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: '#c44', marginBottom: 8 }}>👁 OVERSIGHT — ACADEMIC INQUIRY BOARD</div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 16 }}>
        Scrutiny {adminScrutiny} · Scandal {aib.scandalMeter} · Truce weeks {aib.truceWeeks}
        {opposition.proxies?.wellnessCoalition && ' · Wellness Coalition active'}
        {opposition.proxies?.accreditation && ' · Accreditation Observer'}
        {opposition.supernatural?.actTriggered && ` · Scarcity pressure ${opposition.supernatural.scarcityPressure}`}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>AGENDA QUEUE</div>
        {aib.agendaQueue?.length ? aib.agendaQueue.map((item, i) => (
          <div key={i} style={{ fontSize: 12, color: '#eaa', padding: '8px 10px', background: '#2a1818', borderRadius: 4, marginBottom: 6 }}>
            {item.label} — resolves week {item.resolvesWeek}
          </div>
        )) : <div style={{ fontSize: 12, color: '#6a6' }}>No pending agenda cards.</div>}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>BOARD MEMBERS</div>
        {aib.members.map((m) => (
          <div key={m.id} style={{ fontSize: 11, color: '#ccc', padding: '6px 0', borderBottom: '1px solid #333' }}>
            <strong>{m.name}</strong> — {m.role}<br />
            <span style={{ color: '#999' }}>Resolve {m.resolve} · {m.stance} · {Math.round(m.weightLbs)} lbs</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>COUNTERS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {AIB_COUNTERS.map((c) => (
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

      <button type="button" style={{ ...C.btn('#555') }} onClick={onClose}>← Back to class</button>
    </div>
  );
}
