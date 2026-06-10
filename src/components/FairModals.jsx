// ═══════════════════════════════════════════════════════════════
// STATE FAIR QUEEN — Pre-Fair Training hub + Fair Day modals
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { FAIR_TRAINING_CONFIG, FAIR_DAY_SCENES } from '../gameData/evolvedForms.js';

export function FairTrainingHub({ ft, students, ap, getFairPrideTier, startFairTrainingSession, launchFairDayEvent, closeFairTraining, setFairTrainingState }){
  const mj=students.find(st=>st.id===ft.mjStudentId);
  if(!mj) return null;
  const fairOrange='#C8860A';
  const tier=getFairPrideTier(ft.fairPride);
  const fairReady=ft.sessionsThisCycle>=FAIR_TRAINING_CONFIG.maxSessionsPerCycle;
  return(
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:560,background:"linear-gradient(160deg,#0a0600,#140c00,#0a0600)",border:`2px solid ${fairOrange}50`}}>
        <div style={{fontSize:9,letterSpacing:4,color:fairOrange,marginBottom:6}}>🎡 PRE-FAIR TRAINING — CYCLE {ft.cycleNum+1}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:11,color:"#d0b080"}}>
          <span>{mj.name} — {Math.round(mj.lbs)} lbs</span>
          <span>Sessions: {ft.sessionsThisCycle}/{FAIR_TRAINING_CONFIG.maxSessionsPerCycle}</span>
        </div>

        {/* Fair Pride meter */}
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:"#a08060",marginBottom:4}}>
            Fair Pride: {ft.fairPride} — <span style={{color:tier.color,fontWeight:"bold"}}>{tier.label}</span>
          </div>
          <div style={{height:10,background:"#1a1000",borderRadius:5,overflow:"hidden",border:"1px solid #40300040"}}>
            <div style={{height:"100%",width:`${Math.min(100,(ft.fairPride/40)*100)}%`,background:tier.color,borderRadius:5,transition:"width 0.3s"}}/>
          </div>
        </div>

        {ft.view==='main'&&(
          <>
            <div style={{fontSize:10,color:"#907050",marginBottom:6}}>TRAINING PARTNERS {ft.lastCollaborator&&<span style={{color:"#705030"}}>(repeating {ft.lastCollaborator} halves the pride boost)</span>}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,marginBottom:10}}>
              {Object.entries(FAIR_TRAINING_CONFIG.collaborators).map(([key,cfg])=>{
                const partner=students.find(st=>st.evolvedForm===cfg.evolvedForm);
                const avail=!!partner&&!fairReady&&ap>=FAIR_TRAINING_CONFIG.apCost;
                return(
                  <button key={key} disabled={!avail} onClick={()=>startFairTrainingSession(key)}
                    style={{...C.btn(avail?fairOrange:"#2a1800"),opacity:avail?1:0.4,fontSize:12,padding:"8px 6px",textAlign:"left"}}>
                    {cfg.label}{cfg.special?' ✦':''}<br/>
                    <span style={{fontSize:9,color:"#c0a070"}}>{partner?`${partner.name} — ${Math.round(partner.lbs)} lbs`:'not evolved'}</span>
                  </button>
                );
              })}
            </div>
            <div style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:10,fontSize:10,color:"#907050"}}>
              Each session: 1 AP • Mary Jane and her partner both gain • Fair Pride builds toward the Weigh-In bonus ({Math.round((FAIR_TRAINING_CONFIG.weighInBonus[tier.label]||0)*100)}% at current tier)
            </div>
            <div style={{display:"flex",gap:6}}>
              {fairReady&&<button style={{...C.btn("#1a6030"),flex:1}} onClick={launchFairDayEvent}>🎡 Fair Day</button>}
              {ft.trophyPhotos.length>0&&<button style={{...C.btn("#3a2a00"),flex:1}} onClick={()=>setFairTrainingState(p=>({...p,view:'trophies'}))}>🏆 Trophy Wall ({ft.trophyPhotos.length})</button>}
              <button style={{...C.btn("#2a1800"),flex:1}} onClick={closeFairTraining}>Close</button>
            </div>
          </>
        )}

        {ft.view==='session'&&(
          <>
            <div style={{fontSize:9,letterSpacing:3,color:fairOrange,marginBottom:6}}>TRAINING SESSION — {ft.pendingCollab}</div>
            <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:10,whiteSpace:"pre-line"}}>{ft.sessionSceneTag}</div>
            {ft.pendingRecruits&&(
              <div style={{...C.infoBox("rgba(20,0,20,0.5)"),marginBottom:10,fontSize:10,color:"#b080b0"}}>
                Lilith's recruits: {ft.pendingRecruits.map((r)=>`a stage-${r.stage} ${r.bodyType.replace('_',' ')} woman`).join(', ')}
              </div>
            )}
            <div style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:10,fontSize:11,color:"#c0a060",fontStyle:"italic"}}>{ft.sessionBoostSummary}</div>
            <div style={{...C.infoBox("rgba(10,8,0,0.6)"),marginBottom:10,fontSize:10,color:"#907050"}}>
              📸 Vignette pinned to the Trophy Wall: <span style={{fontStyle:"italic",color:"#c0a070"}}>{ft.sessionPhotoTag}</span>
            </div>
            {ft.sessionLog&&(
              <div style={{display:"flex",gap:10,marginBottom:10,fontSize:12,color:"#d0b080",textAlign:"center"}}>
                <div style={{flex:1}}><div style={{color:fairOrange,fontWeight:"bold"}}>+{ft.sessionLog.mjGain} lbs</div><div style={{fontSize:10,color:"#907050"}}>{mj.name}</div></div>
                <div style={{flex:1}}><div style={{color:"#a08060",fontWeight:"bold"}}>+{ft.sessionLog.cGain} lbs</div><div style={{fontSize:10,color:"#907050"}}>{ft.sessionLog.collabName}</div></div>
                <div style={{flex:1}}><div style={{color:tier.color,fontWeight:"bold"}}>+{ft.sessionLog.prideBoost}</div><div style={{fontSize:10,color:"#907050"}}>Fair Pride</div></div>
              </div>
            )}
            <button style={{...C.btn(fairOrange),width:"100%"}} onClick={()=>setFairTrainingState(p=>({...p,view:'main',pendingCollab:null,pendingRecruits:null}))}>Continue ✓</button>
          </>
        )}

        {ft.view==='trophies'&&(
          <>
            <div style={{fontSize:9,letterSpacing:3,color:fairOrange,marginBottom:8}}>🏆 TROPHY WALL</div>
            <div style={{maxHeight:300,overflowY:"auto",marginBottom:10}}>
              {ft.trophyPhotos.map((p,i)=>(
                <div key={i} style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:6,fontSize:10,color:"#c0a070"}}>
                  <span style={{color:"#907050"}}>Cycle {p.cycle+1} — {p.collab}:</span> <span style={{fontStyle:"italic"}}>{p.tag}</span>
                </div>
              ))}
            </div>
            <button style={{...C.btn(fairOrange),width:"100%"}} onClick={()=>setFairTrainingState(p=>({...p,view:'main'}))}>Back</button>
          </>
        )}
      </div>
    </div>
  );
}

export function FairDayModal({ fd, students, fairPride, getFairPrideTier, chooseFairWeighIn, advanceFairDayPhase, chooseFairAfterparty, closeFairDay }){
  const s=students.find(st=>st.id===fd.studentId);
  if(!s) return null;
  const fairOrange='#C8860A';
  const key=`${fd.stageIdx}_${fd.influenceKey}`;
  const tier=getFairPrideTier(fairPride);
  return(
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0a0600,#140c00,#0a0600)",border:`2px solid ${fairOrange}50`}}>
        <div style={{fontSize:9,letterSpacing:4,color:fairOrange,marginBottom:6}}>
          🎡 FAIR DAY — {fd.phase==='weighin'?'THE WEIGH-IN':fd.phase==='judging'?'THE JUDGING':'THE AFTERPARTY'}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"#d0b080"}}>
          <span>{s.name} — {Math.round(s.lbs)} lbs</span>
          <span style={{color:tier.color}}>Fair Pride: {tier.label}{fd.influenceKey!=='None'&&` • ${fd.influenceKey}'s influence`}</span>
        </div>

        {fd.phase==='weighin'&&(()=>{
          const sc=FAIR_DAY_SCENES.weighIn[key];
          return(
            <>
              {!fd.weighInChoice&&<>
                <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:12,whiteSpace:"pre-line"}}>{sc.open}</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <button style={{...C.btn(fairOrange),width:"100%"}} onClick={()=>chooseFairWeighIn(1)}>⚖️ {sc.choice1.label}</button>
                  <button style={{...C.btn("#3a2a00"),width:"100%"}} onClick={()=>chooseFairWeighIn(2)}>🎪 {sc.choice2.label}</button>
                </div>
              </>}
              {fd.weighInChoice&&<>
                <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:10,whiteSpace:"pre-line"}}>{fd.weighInResultText}</div>
                <div style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:10,fontSize:11,color:"#c0a060"}}>
                  The scale reads <b style={{color:fairOrange}}>+{fd.weighInGain} lbs</b>{(FAIR_TRAINING_CONFIG.weighInBonus[tier.label]||0)>0&&<span> (Fair Pride bonus +{Math.round((FAIR_TRAINING_CONFIG.weighInBonus[tier.label])*100)}%)</span>} · +{fd.weighInRel} rel
                </div>
                <button style={{...C.btn(fairOrange),width:"100%"}} onClick={advanceFairDayPhase}>Continue to Judging →</button>
              </>}
            </>
          );
        })()}

        {fd.phase==='judging'&&(
          <>
            <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:12,whiteSpace:"pre-line"}}>{FAIR_DAY_SCENES.judging[key]}</div>
            <button style={{...C.btn(fairOrange),width:"100%"}} onClick={advanceFairDayPhase}>To the Afterparty →</button>
          </>
        )}

        {fd.phase==='afterparty'&&(()=>{
          const sc=FAIR_DAY_SCENES.afterparty[key];
          return(
            <>
              {!fd.afterpartyChoice&&<>
                <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:12,whiteSpace:"pre-line"}}>{sc.open}</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <button style={{...C.btn(fairOrange),width:"100%"}} onClick={()=>chooseFairAfterparty(1)}>🥂 {sc.choice1.label}</button>
                  <button style={{...C.btn("#3a2a00"),width:"100%"}} onClick={()=>chooseFairAfterparty(2)}>🎡 {sc.choice2.label}</button>
                </div>
              </>}
              {fd.afterpartyChoice&&<>
                <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:10,whiteSpace:"pre-line"}}>{fd.afterpartyResultText}</div>
                <div style={{display:"flex",gap:10,marginBottom:10,fontSize:12,color:"#d0b080",textAlign:"center"}}>
                  <div style={{flex:1}}><div style={{color:fairOrange,fontWeight:"bold",fontSize:14}}>+{Math.round(fd.totalGain)} lbs</div><div style={{fontSize:10,color:"#907050"}}>total gained</div></div>
                  <div style={{flex:1}}><div style={{color:"#a08060",fontWeight:"bold",fontSize:14}}>+{fd.relBonus}</div><div style={{fontSize:10,color:"#907050"}}>relationship</div></div>
                </div>
                <button style={{...C.btn(fairOrange),width:"100%"}} onClick={closeFairDay}>Leave the Fair ✓</button>
              </>}
            </>
          );
        })()}
      </div>
    </div>
  );
}
