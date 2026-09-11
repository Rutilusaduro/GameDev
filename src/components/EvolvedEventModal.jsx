import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { EVOLVED_EVENTS, EVOLVED_FORM_META, HOMEROOM_SUSPICION_DELTAS } from '../gameData/evolvedForms.js';
import { renderEvolvedEventProse } from '../textEngine/scenes/evolved/index.js';

export function EvolvedEventModal({ batchBakerState, closeEvolvedEvent, collabPartnerId, evolvedEventState, makeEvolvedEventChoice, openSalonHub, openGalleryHub, push, setChallengeState, setDeliveryState, setEvolvedEventState, setPresentationState, startCollabStream, startEatingContest, startFairDay, startRankedSession, startSumoMatch, startStream, students, week = 1, soundEnabled = true }){
        const{studentId,formId,stageIdx,phaseIdx,history,logLines,done,endingText,startsContest,startsMatch,startsStream,startsFairDay,startsSession,startsPresentation,startsDelivery,startsChallenge,startsSalon,startsGallery}=evolvedEventState;
  useEffect(() => { playHallPassSound('tier', soundEnabled); }, [soundEnabled, studentId, formId, stageIdx, phaseIdx]);
        const s=students.find(st=>st.id===studentId);
        const evDef=EVOLVED_EVENTS[formId]?.[stageIdx];
        if(!s||!evDef) return null;
        const phase=!done?evDef.phases[phaseIdx]:null;
        const collabPartner=collabPartnerId?students.find(st=>st.id===collabPartnerId):null;
        const researchSubject=(formId==='psych_researcher'&&s?.researchSubjectId!=null)?students.find(st=>st.id===s.researchSubjectId):null;
        const rawPhaseText=phase?(typeof phase.text==="function"?phase.text(history,s,collabPartner||researchSubject):phase.text):null;
        const depthOpts={formId,stageIdx,v2DepthChance:0.28};
        const phaseText=rawPhaseText?renderEvolvedEventProse(rawPhaseText,s,week,depthOpts):null;
        const endingRendered=endingText?renderEvolvedEventProse(endingText,s,week,{...depthOpts,v2DepthChance:0.32,ending:true}):null;
        const evMeta=EVOLVED_FORM_META[formId];
        const accentColor=evMeta?.color||"#7030c0";
        return(
          <ModalOverlay dismissible={false} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in evolved-event-modal" style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#07030f,#120820,#07030f)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>{evDef.title.toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:700,color:evMeta?.color||"#d8a8ff",marginBottom:12}}>{s.name}</div>
              {/* Hall kitchen queen: suspicion + NPC weight bars */}
              {formId==='homeroom_queen'&&(()=>{
                const suspDelta=Object.entries(HOMEROOM_SUSPICION_DELTAS).reduce((acc,[flag,delta])=>acc+(history.includes(flag)?delta:0),0);
                const currentSusp=Math.max(0,Math.min(10,batchBakerState.suspicion+suspDelta));
                const suspPct=currentSusp*10;
                const classPct=Math.min(100,Math.round(batchBakerState.classWeight/2));
                const momPct=Math.min(100,Math.round(batchBakerState.momWeight/1.3));
                return(
                  <div style={{marginBottom:12,padding:"8px 10px",background:"rgba(196,122,42,0.08)",border:"1px solid #c47a2a30",borderRadius:6}}>
                    <div style={{display:"flex",gap:12,marginBottom:6}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,letterSpacing:2,color:suspPct>70?"#e05030":"#c47a2a",marginBottom:3}}>SUSPICION {currentSusp}/10</div>
                        <div style={{height:6,background:"#1a0800",borderRadius:3,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${suspPct}%`,background:suspPct>70?"#e05030":suspPct>40?"#c47a2a":"#a05020",transition:"width 0.3s"}}/>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:12}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,letterSpacing:2,color:"#7db87d",marginBottom:3}}>HALL {batchBakerState.classWeight} wt</div>
                        <div style={{height:4,background:"#0a1a0a",borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${classPct}%`,background:"#4a8a4a",transition:"width 0.3s"}}/>
                        </div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,letterSpacing:2,color:"#8a7dba",marginBottom:3}}>MOMS {batchBakerState.momWeight} wt</div>
                        <div style={{height:4,background:"#0a0a1a",borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${momPct}%`,background:"#5a4a8a",transition:"width 0.3s"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              {/* History of completed phases */}
              {logLines.length>0&&(
                <div style={{marginBottom:12}}>
                  {logLines.map((line,i)=>(
                    <div key={i} style={{fontSize:11,color:"#7060a0",lineHeight:1.75,marginBottom:6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${accentColor}30`}}>{renderEvolvedEventProse(line,s,week,{...depthOpts,v2DepthChance:0.18})}</div>
                  ))}
                </div>
              )}
              {/* Current phase or ending */}
              <div style={{fontSize:12,color:"#c0b0e0",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>{done?endingRendered:phaseText}</div>
              {/* Choices or close button */}
              {!done&&phase&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {phase.choices.map(ch=>{
                    const locked=ch.requires&&!history.includes(ch.requires);
                    const excluded=ch.requiresNot&&history.includes(ch.requiresNot);
                    if(excluded) return null;
                    return(
                      <button key={ch.id} type="button" className="evolved-event-choice-row"
                        style={{...C.btn(locked?"#1a1a2a":accentColor),opacity:locked?0.35:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        disabled={!!locked}
                        onClick={()=>makeEvolvedEventChoice(ch.id)}>
                        <span style={{fontWeight:700}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                        {ch.feedOther&&<span style={{color:"#ff9060",marginLeft:4,fontSize:10}}>feeds squad</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&!startsContest&&!startsMatch&&!startsStream&&!startsFairDay&&!startsSession&&!startsPresentation&&!startsDelivery&&!startsChallenge&&!startsSalon&&!startsGallery&&<button type="button" className="evolved-event-choice-row" style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={closeEvolvedEvent}>Continue ✓</button>}
              {done&&startsContest&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#1a6030"),width:"100%",marginTop:4}} onClick={()=>startEatingContest(studentId,stageIdx,history)}>🍽️ Step to the Table</button>}
              {done&&startsMatch&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#7a2018"),width:"100%",marginTop:4}} onClick={()=>startSumoMatch(studentId,stageIdx,history)}>🥋 Step Onto the Dohyo</button>}
              {done&&startsStream&&formId==='eating_streamer'&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#a02030"),width:"100%",marginTop:4}} onClick={()=>{setEvolvedEventState(null);if(s)startStream(s);}}>📡 Go Live — Challenge Mode</button>}
              {done&&startsStream&&formId==='feedee_creator'&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#6a1878"),width:"100%",marginTop:4}} onClick={()=>{const partner=students.find(st=>st.id===collabPartnerId);if(!partner){push("⚠️ No collab partner selected.");return;}startCollabStream(studentId,collabPartnerId,stageIdx,history);}}>🎥 Go Live Together</button>}
              {done&&startsFairDay&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#C8860A"),width:"100%",marginTop:4}} onClick={()=>{const s2=students.find(st=>st.id===studentId);if(s2)startFairDay(s2,stageIdx);}}>🎡 Step Onto the Scale</button>}
              {done&&startsSession&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#1a5a7a"),width:"100%",marginTop:4}} onClick={()=>startRankedSession(studentId,stageIdx)}>🎮 Start the Session</button>}
              {done&&startsPresentation&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#2c5f8a"),width:"100%",marginTop:4}} onClick={()=>{setPresentationState({studentId,stageIdx});setEvolvedEventState(null);}}>📊 Begin the Defense</button>}
              {done&&startsDelivery&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#4a6a4a"),width:"100%",marginTop:4}} onClick={()=>{setDeliveryState({studentId,stageIdx});setEvolvedEventState(null);}}>🍜 Place the Order</button>}
              {done&&startsChallenge&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#7a4a1a"),width:"100%",marginTop:4}} onClick={()=>{setChallengeState({studentId,stageIdx});setEvolvedEventState(null);}}>🍺 Take the Challenge</button>}
              {done&&startsSalon&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#8b2942"),width:"100%",marginTop:4}} onClick={()=>{setEvolvedEventState(null);openSalonHub(studentId);}}>🥂 Open the Salon</button>}
              {done&&startsGallery&&<button type="button" className="evolved-event-choice-row" style={{...C.btn("#c47a2a"),width:"100%",marginTop:4}} onClick={()=>{setEvolvedEventState(null);openGalleryHub(studentId);}}>🖼 Open the Gallery</button>}
            </div>
          </ModalOverlay>
        );
}
