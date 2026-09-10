import { useEffect } from 'react';
import { C } from '../styles.js';
import { getFullnessStage } from '../gameData/sessions.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';


export function EvolutionOfferModal({ chooseEvolution, evolutionModal, setEvolutionModal, soundEnabled = true }){
  return(
        <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); setEvolutionModal(null); }} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in evolution-offer-modal" style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0c0520,#180840,#0c0520)",border:"2px solid #7030c060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>✦ A NEW DIRECTION</div>
            <div style={{fontSize:17,fontWeight:700,color:"#d0a0ff",marginBottom:10}}>{evolutionModal.student?.name}</div>
            <div style={{fontSize:12,color:"#b090d0",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>{evolutionModal.intro}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {(evolutionModal.paths||[]).map(p=>(
                <button key={p.id} type="button" className="evolution-offer-choice-row" style={{...C.btn("#40108080"),textAlign:"left",padding:"12px 14px",border:"1px solid #6030a060"}}
                  onClick={()=>{ playHallPassSound('confirm', soundEnabled); chooseEvolution(evolutionModal.student.id,p.id); }}>
                  <div style={{fontSize:13,fontWeight:700,color:"#c080ff",marginBottom:4}}>{p.label}</div>
                  <div style={{fontSize:11,color:"#8060a0",lineHeight:1.5}}>{p.desc}</div>
                </button>
              ))}
            </div>
            <button type="button" className="evolution-offer-choice-row" style={C.btn("#201040")} onClick={()=>{ playHallPassSound('click', soundEnabled); setEvolutionModal(null); }}>Not yet</button>
          </div>
        </ModalOverlay>
  );
}

export function SessionResultModal({ sessionResult, setSessionResult, soundEnabled = true }){
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled]);
  const dismiss = () => { playHallPassSound('confirm', soundEnabled); setSessionResult(null); };
  return(
        <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in session-result-modal" style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>ROOM SESSION LOGGED — #{sessionResult.sessionCount}</div>
            <div style={{fontSize:12,color:"#7a50a0",marginBottom:12}}>
              Resident {sessionResult.student.name} · {sessionResult.student.lbs} lbs · {getFullnessStage(sessionResult.fullnessPct).label} ({sessionResult.fullnessPct}%)
            </div>
            <div style={{...C.infoBox("rgba(60,10,100,0.25)"),lineHeight:1.9,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              {sessionResult.scene}
            </div>
            <div style={{...C.infoBox("rgba(40,5,70,0.3)"),fontSize:11,color:"#9060c0",marginBottom:14}}>
              {sessionResult.totalGain.toLocaleString()} cal this session (≈+{Math.round(sessionResult.totalGain/3500)} lbs digesting) · Appetite capacity expanded by +8 (total bonus: +{sessionResult.capacityBonus})
              <div style={{fontSize:10,color:"#604080",marginTop:3}}>
                She can now comfortably eat {sessionResult.capacityBonus}% more than when you first hosted her on your floor.
              </div>
            </div>
            <button type="button" className="session-result-choice-row" style={C.btn("#5818a8")} onClick={dismiss}>Continue →</button>
          </div>
        </ModalOverlay>
  );
}

export function TapOutPopup({ setTapOutPopup, tapOutPopup, soundEnabled = true }){
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled]);
  const dismiss = () => { playHallPassSound('click', soundEnabled); setTapOutPopup(null); };
  return(
        <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in tap-out-modal" style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c06060",marginBottom:6}}>⛔ SHE TAPS OUT</div>
            <div style={{fontSize:11,color:"#a06050",marginBottom:10}}>
              {tapOutPopup.student.name} · {tapOutPopup.totalGain.toLocaleString()} cal this session (≈+{Math.round(tapOutPopup.totalGain/3500)} lbs digesting)
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0c0",fontStyle:"italic",marginBottom:20,fontSize:13}}>
              {tapOutPopup.text}
            </p>
            <div style={{fontSize:11,color:"#705040",marginBottom:16}}>She ate enough for a family of five. The session is over.</div>
            <button type="button" className="tap-out-choice-row" style={C.btn("#5a1515")} onClick={dismiss}>Close</button>
          </div>
        </ModalOverlay>
  );
}




export function DormUnlockModal({ dorms, onContinue, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('unlock', soundEnabled); }, [soundEnabled]);
  if (!dorms?.length) return null;
  const primary = dorms[0];
  const dismiss = () => { playHallPassSound('click', soundEnabled); onContinue(); };
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
      <div
        className="hall-pass-modal-in hall-unlock-modal"
        style={{
          ...C.modal,
          maxWidth: 520,
          border: `2px solid ${primary.color}80`,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: 4, color: primary.color, marginBottom: 6 }}>🔓 HALL REACH EXPANDED</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#f0e8ff', marginBottom: 6 }}>
          {dorms.map((d) => `${d.emoji} ${d.label}`).join(' · ')}
        </div>
        <div style={{ fontSize: 11, color: '#a898c8', marginBottom: 14, lineHeight: 1.5 }}>
          New residents from {dorms.map((d) => d.shortLabel).join(' and ')} hall{dorms.length > 1 ? 's' : ''} can now build trust on your roster.
        </div>
        {dorms.map((d, i) => (
          <div
            key={d.id}
            className="hall-unlock-new"
            style={{
              ...C.infoBox(d.accentSoft || 'rgba(40,20,60,0.3)'),
              marginBottom: 10,
              borderLeft: `3px solid ${d.color}`,
              lineHeight: 1.7,
              fontSize: 12,
              color: '#e8e0f0',
              animationDelay: `${0.08 + i * 0.12}s, ${0.36 + i * 0.12}s`,
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: 2, color: d.color, marginBottom: 4, fontWeight: 700 }}>{d.tagline}</div>
            <div style={{ fontStyle: 'italic', color: '#c8b8e0' }}>{d.hook}</div>
          </div>
        ))}
        <button
          type="button"
          className="hall-unlock-cta"
          style={{ ...C.btn(primary.color), width: '100%', fontWeight: 700 }}
          onClick={dismiss}
        >
          View Roster →
        </button>
      </div>
    </ModalOverlay>
  );
}

export function TierUpModal({ setStudents, setTierUpModal, tierUpModal, soundEnabled = true }){
  useEffect(() => { playHallPassSound('tier', soundEnabled); }, [soundEnabled]);
  const dismiss = () => {
    if(tierUpModal.newTier.id===3){
      setStudents(prev=>prev.map(s=>s.id!==tierUpModal.student.id?s:{...s,gainMultiplier:(s.gainMultiplier||1)*1.1}));
    }
    playHallPassSound('confirm', soundEnabled);
    setTierUpModal(null);
  };
  return(
        <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
          <div
          className="hall-pass-modal-in tier-up-modal"
          style={{
            ...C.modal,
            maxWidth: 500,
            border: `1px solid ${tierUpModal.newTier.color}60`,
          }}
        >
            <div style={{fontSize:9,letterSpacing:3,color:tierUpModal.newTier.color,marginBottom:8}}>RELATIONSHIP MILESTONE</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <span style={{fontSize:26}}>{tierUpModal.newTier.emoji}</span>
              <div>
                <div style={{fontSize:17,fontWeight:700,color:tierUpModal.newTier.color}}>{tierUpModal.student.name}</div>
                <div style={{fontSize:12,color:"#7060a0",marginTop:2}}>
                  {tierUpModal.oldTier.emoji} {tierUpModal.oldTier.label}
                  <span style={{margin:"0 6px",color:"#4030608a"}}>→</span>
                  <span style={{color:tierUpModal.newTier.color,fontWeight:700}}>{tierUpModal.newTier.emoji} {tierUpModal.newTier.label}</span>
                </div>
              </div>
            </div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {tierUpModal.scene}
            </div>
            {tierUpModal.newTier.id===3&&(
              <div style={{...C.infoBox("rgba(80,10,130,0.3)"),fontSize:11,color:"#c060ff",marginBottom:12,lineHeight:1.6}}>
                🖤 <strong>Devoted.</strong> She accepts her situation completely.
                +10% gain multiplier applied. She passively covers 1 scrutiny point per week through glowing feedback.
              </div>
            )}
            {tierUpModal.newTier.id===2&&(
              <div style={{...C.infoBox("rgba(60,10,100,0.25)"),fontSize:11,color:"#9050c8",marginBottom:12}}>
                💜 <strong>Intimate.</strong> She trusts you implicitly. Talk actions give bonus relationship.
              </div>
            )}
            <button className="tier-up-cta" style={{...C.btn("#5020a0"),background:tierUpModal.newTier.color+"99",width:"100%"}} onClick={dismiss}>Continue →</button>
          </div>
        </ModalOverlay>
  );
}


