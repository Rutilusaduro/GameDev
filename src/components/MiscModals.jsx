import { C } from '../styles.js';
import { GODDESS_VISION } from '../gameData/ascension.js';
import { HR_OBSERVER_POOL, getFullnessStage, getTier } from '../gameData/sessions.js';
import { getStage } from '../gameData/stages.js';
import { rnd } from '../utils/gameHelpers.js';


export function EvolutionOfferModal({ chooseEvolution, evolutionModal, setEvolutionModal }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0c0520,#180840,#0c0520)",border:"2px solid #7030c060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>✦ A NEW DIRECTION</div>
            <div style={{fontSize:17,fontWeight:700,color:"#d0a0ff",marginBottom:10}}>{evolutionModal.student?.name}</div>
            <div style={{fontSize:12,color:"#b090d0",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>{evolutionModal.intro}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {(evolutionModal.paths||[]).map(p=>(
                <button key={p.id} style={{...C.btn("#40108080"),textAlign:"left",padding:"12px 14px",border:"1px solid #6030a060"}}
                  onClick={()=>chooseEvolution(evolutionModal.student.id,p.id)}>
                  <div style={{fontSize:13,fontWeight:700,color:"#c080ff",marginBottom:4}}>{p.label}</div>
                  <div style={{fontSize:11,color:"#8060a0",lineHeight:1.5}}>{p.desc}</div>
                </button>
              ))}
            </div>
            <button style={C.btn("#201040")} onClick={()=>setEvolutionModal(null)}>Not yet</button>
          </div>
        </div>
  );
}

export function GoddessVisionModal({ push, setGoddessModal, setView }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:560,background:"linear-gradient(160deg,#0a0520,#12082a,#0a0520)",border:"2px solid #8040ff80"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#a060ff",marginBottom:8}}>✦ VISION</div>
            <h2 style={{margin:"0 0 16px",color:"#d4aaff",fontSize:19,fontWeight:400,letterSpacing:1}}>{GODDESS_VISION.title}</h2>
            <div style={{...C.infoBox("rgba(60,10,120,0.25)"),lineHeight:2,fontSize:13,color:"#e8d8ff",fontStyle:"italic",marginBottom:16,maxHeight:380,overflowY:"auto",whiteSpace:"pre-line"}}>
              {GODDESS_VISION.scene}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {GODDESS_VISION.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn("#401080"),textAlign:"left",padding:"10px 14px",lineHeight:1.5}}
                  onClick={()=>{
                    push(`✦ ${ch.label} — ${ch.text}`);
                    push(`✦ The Divine skill tree is now unlocked. Visit Skills → Divine.`);
                    setGoddessModal(null);
                    setView("divine");
                  }}>
                  <div style={{fontSize:12,fontWeight:700,color:"#c8a8ff",marginBottom:2}}>{ch.label}</div>
                  <div style={{fontSize:11,color:"#907090",fontStyle:"italic"}}>{ch.text}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
  );
}

export function SessionResultModal({ sessionResult, setSessionResult }){
  return(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>SESSION COMPLETE — #{sessionResult.sessionCount}</div>
            <div style={{fontSize:12,color:"#7a50a0",marginBottom:12}}>
              {sessionResult.student.name} · {sessionResult.student.lbs} lbs · {getFullnessStage(sessionResult.fullnessPct).label} ({sessionResult.fullnessPct}%)
            </div>
            <div style={{...C.infoBox("rgba(60,10,100,0.25)"),lineHeight:1.9,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              {sessionResult.scene}
            </div>
            <div style={{...C.infoBox("rgba(40,5,70,0.3)"),fontSize:11,color:"#9060c0",marginBottom:14}}>
              +{sessionResult.totalGain} lbs this session · Appetite capacity expanded by +8 (total bonus: +{sessionResult.capacityBonus})
              <div style={{fontSize:10,color:"#604080",marginTop:3}}>
                She can now comfortably eat {sessionResult.capacityBonus}% more than when you first started feeding her privately.
              </div>
            </div>
            <button style={C.btn("#5818a8")} onClick={()=>setSessionResult(null)}>Continue →</button>
          </div>
        </div>
  );
}

export function TapOutPopup({ setTapOutPopup, tapOutPopup }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c06060",marginBottom:6}}>⛔ SHE TAPS OUT</div>
            <div style={{fontSize:11,color:"#a06050",marginBottom:10}}>
              {tapOutPopup.student.name} · +{tapOutPopup.totalGain} lbs this session
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0c0",fontStyle:"italic",marginBottom:20,fontSize:13}}>
              {tapOutPopup.text}
            </p>
            <div style={{fontSize:11,color:"#705040",marginBottom:16}}>She ate enough for a family of five. The session is over.</div>
            <button style={C.btn("#5a1515")} onClick={()=>setTapOutPopup(null)}>Close</button>
          </div>
        </div>
  );
}

export function SocialEventResult({ setSocialResult, socialResult }){
  return(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENT COMPLETE</div>
            <h2 style={{margin:"0 0 10px",color:"#c898ff",fontSize:18}}>{socialResult.event.label}</h2>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {socialResult.scene}
            </div>
            <div style={{fontSize:12,color:"#a080c0",marginBottom:16}}>
              {socialResult.attendees} students · +{socialResult.totalGain} lbs total gained
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setSocialResult(null)}>Continue →</button>
          </div>
        </div>
  );
}

export function SocialEventPicker({ confirmSocialEvent, setSocialPicker, socialPicker, students }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SOCIAL EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:18}}>{socialPicker.event.label}</h2>
            <div style={{fontSize:12,color:"#7060a0",lineHeight:1.6,marginBottom:12}}>{socialPicker.event.desc}</div>
            <div style={{...C.secT,marginBottom:8}}>
              Invite students
              <span style={{fontWeight:400,color:"#5030a0",marginLeft:6}}>
                {socialPicker.selected.length} selected · need {socialPicker.event.minStudents}–{socialPicker.event.maxStudents}
              </span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14,maxHeight:290,overflowY:"auto"}}>
              {students.map(s=>{
                const tier=getTier(s.relationship);
                const isSel=socialPicker.selected.includes(s.id);
                const atMax=!isSel&&socialPicker.selected.length>=socialPicker.event.maxStudents;
                return(
                  <div key={s.id}
                    style={{...C.card,padding:"7px 10px",cursor:atMax?"not-allowed":"pointer",opacity:atMax?0.4:1,
                      background:isSel?"rgba(80,20,140,0.35)":"rgba(255,255,255,0.03)",
                      border:isSel?"1px solid #8040c8":"1px solid #180830"}}
                    onClick={()=>!atMax&&setSocialPicker(prev=>({
                      ...prev,
                      selected:isSel?prev.selected.filter(id=>id!==s.id):[...prev.selected,s.id]
                    }))}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:13}}>{isSel?"☑":"☐"}</span>
                      <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{s.name}</span>
                      <span style={{fontSize:10,color:tier.color}}>{tier.emoji} {tier.label}</span>
                      <span style={{fontSize:10,color:"#6a4880",marginLeft:"auto"}}>{getStage(s.lbs).label} · {s.lbs} lbs</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#444")} onClick={()=>setSocialPicker(null)}>Cancel</button>
              <button
                style={{...C.btn("#5020a0"),flex:1,opacity:socialPicker.selected.length>=socialPicker.event.minStudents?1:0.5}}
                onClick={confirmSocialEvent}>
                {socialPicker.selected.length>=socialPicker.event.minStudents
                  ?`Host — ${socialPicker.event.apCost} AP →`
                  :`Need ${socialPicker.event.minStudents-socialPicker.selected.length} more`}
              </button>
            </div>
          </div>
        </div>
  );
}

export function VaughanEventModal({ resolveVaughanEvent, vaughan, vaughanModal }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#408090",marginBottom:6}}>DR. VAUGHAN — WELLNESS & KINESIOLOGY</div>
            <h2 style={{margin:"0 0 14px",color:"#70c0d8",fontSize:17,fontWeight:400}}>{vaughanModal.title}</h2>
            <div style={{...C.infoBox("rgba(5,25,40,0.5)"),lineHeight:1.8,fontSize:13,color:"#d0c8b8",fontStyle:"italic",marginBottom:16}}>
              {vaughanModal.scene()}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {vaughanModal.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn(ch.vDelta&&ch.vDelta>10?"#204060":ch.delta&&ch.delta>5?"#601010":"#2a2a40"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>resolveVaughanEvent(vaughanModal,ch)}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#304050",marginTop:10}}>
              Suspicion: {vaughan?.suspicion||0}/100 · Disposition: {vaughan?.disposition||0}/100 · {vaughan?.lbs||0} lbs
            </div>
          </div>
        </div>
  );
}

export function TierUpModal({ setStudents, setTierUpModal, tierUpModal }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
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
            <button style={{...C.btn("#5020a0"),background:tierUpModal.newTier.color+"99"}} onClick={()=>{
              if(tierUpModal.newTier.id===3){
                setStudents(prev=>prev.map(s=>s.id!==tierUpModal.student.id?s:{...s,gainMultiplier:(s.gainMultiplier||1)*1.1}));
              }
              setTierUpModal(null);
            }}>Continue →</button>
          </div>
        </div>
  );
}

export function StudyCheckInModal({ setStudyCheckIn, studyCheckIn }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>RESEARCH CHECK-IN — SESSION {studyCheckIn.index+1}</div>
            <div style={{fontSize:12,color:"#9070b0",marginBottom:10}}>{studyCheckIn.student.name} · {studyCheckIn.student.lbs} lbs · {getStage(studyCheckIn.student.lbs).label}</div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#d0c0e0",fontStyle:"italic",marginBottom:16}}>
              {studyCheckIn.scene}
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setStudyCheckIn(null)}>Close</button>
          </div>
        </div>
  );
}

export function AdminEventModal({ addScrutiny, adminEvent, adminScrutiny, hrObserver, push, setAdminEvent, setAdminScrutiny, setHrObserver }){
  return(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c04030",marginBottom:6}}>ADMINISTRATION</div>
            <h2 style={{margin:"0 0 14px",color:"#ff8070",fontSize:17,fontWeight:400}}>{adminEvent.title}</h2>
            <div style={{...C.infoBox("rgba(80,10,10,0.3)"),lineHeight:1.8,fontSize:13,color:"#d0b0a0",marginBottom:16,fontStyle:"italic"}}>
              {adminEvent.scene()}
            </div>
            {/* Termination: show observer intervention status */}
            {adminEvent.isGameOver&&(
              <div style={{...C.infoBox(hrObserver&&hrObserver.disposition>=65?"rgba(20,70,20,0.4)":"rgba(60,20,0,0.3)"),fontSize:12,marginBottom:12,color:hrObserver&&hrObserver.disposition>=65?"#70d080":"#906040"}}>
                {hrObserver
                  ? hrObserver.disposition>=65
                    ? `✅ ${hrObserver.name} has become sympathetic (${hrObserver.disposition} disposition). She will intervene on your behalf.`
                    : `⚠️ ${hrObserver.name} is observing (${hrObserver.disposition}/65 needed to save you). If she were more sympathetic, she could file a favorable report.`
                  : `No one is in your corner right now.`}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {adminEvent.choices.map((ch,i)=>(
                <button key={i} style={{...C.btn(ch.delta<0?"#184020":ch.delta>5?"#601010":"#2a1040"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>{
                    push(`🏛️ ${adminEvent.title}: ${ch.text}`);
                    if(ch.delta>0) addScrutiny(ch.delta);
                    else if(ch.delta<0) setAdminScrutiny(prev=>Math.max(0,prev+ch.delta));
                    if(adminEvent.spawnsObserver){
                      const obs=HR_OBSERVER_POOL[rnd(0,HR_OBSERVER_POOL.length-1)];
                      setHrObserver({...obs,lbs:obs.startLbs,disposition:0,weeksPresent:0});
                      push(`👤 ${obs.intro}`);
                    }
                    if(adminEvent.isGameOver){
                      if(hrObserver&&hrObserver.disposition>=65){
                        push(`✅ ${hrObserver.name} files her report. "I cannot support the findings of the initial review. The pedagogy is excellent, the students are thriving, and I am closing the file."`);
                        push(`📧 Dean Holloway replies within the hour: "Thank you for your thorough assessment." The semester continues.`);
                        setAdminScrutiny(30);
                        setHrObserver(prev=>({...prev,saved:true}));
                      } else {
                        push("💀 Your contract has not been renewed. The semester ends here.");
                      }
                    }
                    setAdminEvent(null);
                  }}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#502030",marginTop:10}}>Scrutiny: {adminScrutiny}/100</div>
          </div>
        </div>
  );
}
