import { C } from '../styles.js';
import { AIB_AGENDA_CARDS, getAvailableCounters, getCounterGateHints, getOversightTelegraph, getAgendaCounterHint } from '../gameData/opposition.js';
import { getOppositionActSummary, isBoardDormant } from '../gameData/oppositionActs.js';
import { canArchivistFreeDiscredit } from '../gameData/supernaturalForms.js';

export function OversightView({
  opposition,
  adminScrutiny,
  ap,
  students,
  week,
  lilithUnlocked,
  pharmacistStage,
  oppositionCtx,
  onRunCounter,
  onRunCounterOnMember,
  onStartHearing,
  onClose,
}) {
  const aib = opposition?.aib;
  const actSummary = getOppositionActSummary(week ?? 1, opposition, adminScrutiny, students);
  const dormant = isBoardDormant(week ?? 1, adminScrutiny, opposition);

  if (!aib?.unlocked && dormant) {
    return (
      <div style={{ padding: 24, color: '#888', maxWidth: 640 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#888', marginBottom: 8 }}>
          ACT {actSummary.act.id} — {actSummary.act.label}
        </div>
        <p style={{ fontSize: 13, color: '#bbb', lineHeight: 1.7 }}>
          {actSummary.act.antagonist}. The Board is still dormant — scrutiny whispers, not agendas.
          Hall transformation pressure: {actSummary.classPressure}/100.
        </p>
        {(opposition?.meta?.rumorCount ?? 0) > 0 && (
          <p style={{ fontSize: 11, color: '#907060', fontStyle: 'italic' }}>
            Rumors logged this semester: {opposition.meta.rumorCount}
          </p>
        )}
        <p style={{ fontSize: 12, marginTop: 12 }}>
          Oversight unlocks when scrutiny reaches 25 or week 8 arrives.
        </p>
        <button type="button" style={{ ...C.btn('#555'), marginTop: 12 }} onClick={onClose}>← Back</button>
      </div>
    );
  }

  if (!aib?.unlocked) {
    return (
      <div style={{ padding: 24, color: '#888' }}>
        <p>Administrative oversight is quiet — for now. Scrutiny must reach 25 before the Residence Review Board takes notice.</p>
        <button type="button" style={{ ...C.btn('#555'), marginTop: 12 }} onClick={onClose}>← Back</button>
      </div>
    );
  }

  const telegraph = getOversightTelegraph(opposition);
  const debuffs = aib.activeDebuffs || {};
  const canDiscredit = oppositionCtx?.hasCassidyResearcher || oppositionCtx?.hasKylieStream
    || canArchivistFreeDiscredit(students, opposition);
  const discreditable = canDiscredit
    ? AIB_AGENDA_CARDS.filter((c) => !aib.deckRemoved.includes(c.id))
    : [];
  const captureTargets = aib.members.filter((m) => m.resolve <= 40 && m.stance !== 'compromised' && m.stance !== 'consumed');
  const pendingConfiscation = aib.agendaQueue?.some((item) => item.cardId === 'device_confiscation');
  const markedHuntMember = aib.markedForHunt
    ? aib.members.find((m) => m.id === aib.markedForHunt)
    : null;

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: '0 auto' }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: '#c44', marginBottom: 8 }}>👁 OVERSIGHT — RESIDENCE REVIEW BOARD</div>
      <div style={{ fontSize: 11, color: '#a88', padding: '8px 10px', background: '#1a1018', borderRadius: 6, marginBottom: 10, lineHeight: 1.6 }}>
        <strong>Act {actSummary.act.id}</strong> — {actSummary.act.label} · {actSummary.act.antagonist}<br />
        Hall pressure {actSummary.classPressure}/100 · {actSummary.act.scrutinyRole}
        {opposition.supernatural?.actTriggered && opposition.supernatural.curseQueue?.length > 0 && (
          <span> · {opposition.supernatural.curseQueue.length} active curse(s)</span>
        )}
      </div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 8 }}>
        Scrutiny {adminScrutiny} · Scandal {aib.scandalMeter} · Truce {aib.truceWeeks}w
        {opposition.proxies?.wellnessCoalition && ' · Wellness Coalition'}
        {opposition.proxies?.accreditation && ` · Accreditation${opposition.proxies?.observerName ? ` (${opposition.proxies.observerName})` : ''}`}
        {opposition.proxies?.asceticCircle && ' · Ascetic Circle'}
        {opposition.supernatural?.actTriggered && ` · Scarcity ${opposition.supernatural.scarcityPressure}`}
        {opposition.supernatural?.famineWeek && ' · FAMINE WEEK'}
      </div>
      {opposition.supernatural?.famineWeek && (
        <div style={{ fontSize: 11, color: '#f88', padding: '10px 12px', background: '#301018', borderRadius: 6, marginBottom: 12, lineHeight: 1.6 }}>
          🕯️ <strong>Famine Week</strong> — scarcity pressure peaked. Complete a <strong>Refeast Ritual</strong> (4 AP, Hall Actions) before the semester can advance.
        </div>
      )}
      {pendingConfiscation && (
        <div style={{ fontSize: 11, color: '#eaa', padding: '8px 10px', background: '#2a2010', borderRadius: 4, marginBottom: 12 }}>
          🔧 Device confiscation queued — equip backup gear or counter with Floor Pressure / Evolved Student Op before it resolves.
        </div>
      )}
      {markedHuntMember && (
        <div style={{ fontSize: 11, color: '#c8a0d0', padding: '8px 10px', background: '#1a1028', borderRadius: 4, marginBottom: 12 }}>
          🩸 {markedHuntMember.name} marked for Lilith — open Lilith&apos;s hunt from her student panel.
        </div>
      )}
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
        {aib.agendaQueue?.length ? aib.agendaQueue.map((item, i) => {
          const hint = getAgendaCounterHint(item.cardId);
          return (
            <div key={i} style={{ fontSize: 12, color: '#eaa', padding: '8px 10px', background: '#2a1818', borderRadius: 4, marginBottom: 6 }}>
              {item.label} — resolves week {item.resolvesWeek}
              {hint && <span style={{ display: 'block', fontSize: 10, color: '#a88', marginTop: 4 }}>Suggested counter: {hint}</span>}
            </div>
          );
        }) : <div style={{ fontSize: 12, color: '#6a6' }}>No pending agenda cards.</div>}
      </div>

      {aib.pendingHearing && (
        <div style={{ fontSize: 11, color: '#e88', marginBottom: 12, padding: 10, background: '#301010', borderRadius: 6 }}>
          ⚠️ Removal hearing pending for {students.find((s) => s.id === aib.pendingHearing.studentId)?.name || 'student'}.
          {onStartHearing && (
            <button type="button" style={{ ...C.btn('#6a2838'), width: '100%', marginTop: 8, fontSize: 11 }} onClick={() => onStartHearing('removal', aib.pendingHearing.studentId)}>
              Begin Removal Hearing
            </button>
          )}
        </div>
      )}
      {aib.emergencyHearingDue && (
        <div style={{ fontSize: 11, color: '#eaa', marginBottom: 12, padding: 10, background: '#2a1810', borderRadius: 6 }}>
          🚨 Emergency Board hearing — scandal meter critical.
          {onStartHearing && (
            <button type="button" style={{ ...C.btn('#6a2838'), width: '100%', marginTop: 8, fontSize: 11 }} onClick={() => onStartHearing('emergency')}>
              Face Emergency Hearing
            </button>
          )}
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
            {m.resolve <= 40 && m.stance !== 'compromised' && m.stance !== 'consumed' && (
              <button
                type="button"
                disabled={ap < 2}
                style={{ ...C.btn('#3a4a30'), fontSize: 10, padding: '4px 8px', opacity: ap >= 2 ? 1 : 0.4 }}
                title="Bureaucratic capture — convert wavering member"
                onClick={() => onRunCounterOnMember('bureaucratic_capture', m.id)}
              >
                Capture
              </button>
            )}
            <button
              type="button"
              disabled={ap < 2 || !oppositionCtx?.hasGrowthChamber}
              style={{ ...C.btn('#5a3040'), fontSize: 10, padding: '4px 8px', opacity: ap >= 2 && oppositionCtx?.hasGrowthChamber ? 1 : 0.4 }}
              title={oppositionCtx?.hasGrowthChamber ? 'Machine fatten in chamber' : 'Requires growth accelerator chamber'}
              onClick={() => onRunCounterOnMember('machine_fatten', m.id)}
            >
              Chamber
            </button>
            {lilithUnlocked && m.stance !== 'consumed' && m.stance !== 'removed' && (
              <button
                type="button"
                disabled={ap < 1}
                style={{ ...C.btn('#4a2050'), fontSize: 10, padding: '4px 8px', opacity: ap >= 1 ? 1 : 0.4 }}
                title="Mark for Lilith hunt map"
                onClick={() => onRunCounterOnMember('lilith_hunt', m.id)}
              >
                🩸 Hunt
              </button>
            )}
          </div>
        ))}
        {aib.rotatingAdvocate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '8px 10px', background: '#141820', borderRadius: 6, border: '1px solid #304050' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#c8d0e0' }}>{aib.rotatingAdvocate.name}</div>
              <div style={{ fontSize: 10, color: '#8090a8' }}>{aib.rotatingAdvocate.role} · {aib.rotatingAdvocate.personality || 'rotating'}</div>
            </div>
            <div style={{ fontSize: 10, color: '#90a8c0' }}>resolve {aib.rotatingAdvocate.resolve}</div>
            <div style={{ fontSize: 10, color: aib.rotatingAdvocate.stance === 'compromised' ? '#8a8' : aib.rotatingAdvocate.stance === 'neutral' ? '#8ac' : '#c88' }}>
              {aib.rotatingAdvocate.stance}
            </div>
          </div>
        )}
      </div>

      {captureTargets.length > 0 && (
        <div style={{ fontSize: 10, color: '#8a9', marginBottom: 12 }}>
          Wavering members (resolve ≤ 40): {captureTargets.map((m) => m.name).join(', ')} — use Capture on their row.
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>COUNTERS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {getAvailableCounters(opposition, students, { ...oppositionCtx, lilithUnlocked, pharmacistStage }).map((c) => (
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
        {oppositionCtx && getCounterGateHints(oppositionCtx).length > 0 && (
          <div style={{ fontSize: 10, color: '#888', marginTop: 8, lineHeight: 1.5 }}>
            Locked: {getCounterGateHints(oppositionCtx).map((g) => `${g.id.replace(/_/g, ' ')} (${g.gate})`).join(' · ')}
          </div>
        )}
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

      <button type="button" style={{ ...C.btn('#555') }} onClick={onClose}>← Back to roster</button>
    </div>
  );
}
