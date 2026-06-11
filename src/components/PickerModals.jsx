import { C } from '../styles.js';
import { COLLAB_CONTENT_CREATOR_ARCHETYPES } from '../gameData/miniGames.js';
import { EVOLVED_ACTIVITY_META, EVOLVED_EVENTS, FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../gameData/evolvedForms.js';
import { INTIMACY_CONTEXTUAL, INTIMACY_SCENES } from '../gameData/intimacy.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';


export function NadiaSubjectNotesModal({ nadiaNotesState, setNadiaNotesState, students }){
        const{nadiaId,subjectId,currentPage}=nadiaNotesState;
        const nadia=students.find(st=>st.id===nadiaId);
        const subj=students.find(st=>st.id===subjectId);
        if(!nadia||!subj) return null;
        const journal=NADIA_SUBJECT_JOURNALS[subj.archetype];
        if(!journal) return null;
        const nadiaStageId=getStage(nadia.lbs).id;
        const nadiaLevel=nadiaStageId>=10?2:nadiaStageId>=8?1:0;
        const maxPage=getStage(subj.lbs).id;
        const STAGE_LABELS=["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
        const NADIA_LEVEL_LABELS=["Heavy–Very Fat","Enormous–Colossal","Blob"];
        const isIntro=currentPage===-1;
        const introText=Array.isArray(journal.intro)?journal.intro[nadiaLevel]||journal.intro[0]:journal.intro;
        const entryText=isIntro?introText:(journal.entries[currentPage]?.[nadiaLevel]||"[no entry]");
        const purple="#6b5b95";

        const canPrev=!isIntro;
        const canNext=!isIntro&&currentPage<maxPage;
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
            <div style={{background:`linear-gradient(170deg,#080015,#0d0025)`,border:`1px solid ${purple}60`,borderRadius:6,padding:0,maxWidth:520,width:"95%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:`0 8px 40px rgba(80,20,120,0.4)`}}>
              {/* Header */}
              <div style={{background:`linear-gradient(90deg,#0a0020,#150030,#0a0020)`,borderBottom:`1px solid ${purple}40`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"4px 4px 0 0"}}>
                <div style={{fontSize:9,letterSpacing:3,color:purple}}>📓 RESEARCH NOTES</div>
                <div style={{fontSize:11,color:"#c0a0e0",fontWeight:"bold"}}>{nadia.name} → {subj.name}</div>
                <button style={{...C.smBtn,fontSize:10,padding:"2px 8px",background:"transparent",border:`1px solid ${purple}30`,color:"#7050a0"}} onClick={()=>setNadiaNotesState(null)}>✕</button>
              </div>
              {/* Stage/level indicator */}
              <div style={{padding:"6px 16px",background:"#050010",borderBottom:`1px solid ${purple}20`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:9,color:"#5040708",letterSpacing:2}}>{isIntro?"INTRODUCTION":`SUBJECT: ${STAGE_LABELS[currentPage]}`}</div>
                <div style={{fontSize:9,color:"#6b5b95",letterSpacing:2}}>NADIA: {NADIA_LEVEL_LABELS[nadiaLevel]}</div>
              </div>
              {/* Entry */}
              <div style={{flex:1,overflowY:"auto",padding:"20px 22px",background:"#040010"}}>
                {isIntro&&<div style={{fontSize:9,letterSpacing:3,color:purple,marginBottom:10,textTransform:"uppercase"}}>Why this subject</div>}
                <div style={{fontSize:13,color:"#c0a8e8",lineHeight:1.9,fontFamily:"Georgia,serif",whiteSpace:"pre-wrap"}}>{entryText}</div>
              </div>
              {/* Navigation */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:`1px solid ${purple}30`}}>
                <button style={{...C.smBtn,opacity:canPrev?1:0.25,fontSize:11,minWidth:80}}
                  onClick={()=>canPrev&&setNadiaNotesState(p=>({...p,currentPage:p.currentPage===0?-1:p.currentPage-1}))}
                  disabled={!canPrev}>{isIntro?"":"← Earlier"}</button>
                <div style={{fontSize:10,color:"#6040a0",letterSpacing:1}}>{isIntro?"Intro":`${currentPage+1} / ${maxPage+1}`}</div>
                <button style={{...C.smBtn,opacity:(isIntro||canNext)?1:0.25,fontSize:11,minWidth:80}}
                  onClick={()=>{
                    if(isIntro) setNadiaNotesState(p=>({...p,currentPage:0}));
                    else if(canNext) setNadiaNotesState(p=>({...p,currentPage:p.currentPage+1}));
                  }}
                  disabled={!isIntro&&!canNext}>{isIntro?"Begin →":"Later →"}</button>
              </div>
            </div>
          </div>
        );
}

export function SubjectJournalModal({ setSubjectJournalState, students, subjectJournalState }){
        const{subjectId,currentPage}=subjectJournalState;
        const subj=students.find(st=>st.id===subjectId);
        if(!subj) return null;
        const maxPage=getStage(subj.lbs).id;
        const entries=FEEDER_SUBJECT_JOURNALS[subj.archetype]||[];
        const entry=entries[currentPage]||"No entry for this stage yet.";
        const STAGE_LABELS=["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
        const minPage=entries.findIndex(e=>e!=null);
        const canPrev=currentPage>Math.max(0,minPage);
        const canNext=currentPage<maxPage;
        const inkColor="#2a1a40";
        const pageColor="#f0eade";
        const borderColor="#8b7355";
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
            <div style={{background:`linear-gradient(170deg,#1a0a2e,#0d0520)`,border:`2px solid ${borderColor}80`,borderRadius:4,padding:0,maxWidth:520,width:"95%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 8px 40px rgba(0,0,0,0.7)"}}>
              {/* Spine header */}
              <div style={{background:`linear-gradient(90deg,#120820,#1e0a38,#120820)`,borderBottom:`1px solid ${borderColor}60`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"2px 2px 0 0"}}>
                <div style={{fontSize:9,letterSpacing:3,color:"#a08060"}}>📔 SUBJECT JOURNAL</div>
                <div style={{fontSize:11,color:"#c0a070",fontWeight:"bold"}}>{subj.name}</div>
                <button style={{...C.smBtn,fontSize:10,padding:"2px 8px",background:"transparent",border:"1px solid #40206040",color:"#806050"}} onClick={()=>setSubjectJournalState(null)}>✕</button>
              </div>
              {/* Page */}
              <div style={{flex:1,overflowY:"auto",padding:"20px 24px",background:pageColor,margin:12,borderRadius:2,boxShadow:"inset 0 1px 4px rgba(0,0,0,0.4)"}}>
                <div style={{fontSize:10,letterSpacing:2,color:"#6b5b40",marginBottom:6,textTransform:"uppercase"}}>Entry {currentPage+1} — {STAGE_LABELS[currentPage]}</div>
                <div style={{width:40,height:1,background:`${borderColor}80`,marginBottom:14}}/>
                <div style={{fontSize:13,color:inkColor,lineHeight:1.9,fontFamily:"Georgia,serif"}}>{entry}</div>
              </div>
              {/* Navigation */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:`1px solid ${borderColor}40`}}>
                <button style={{...C.smBtn,opacity:canPrev?1:0.25,fontSize:11,minWidth:80}} onClick={()=>canPrev&&setSubjectJournalState(p=>({...p,currentPage:p.currentPage-1}))} disabled={!canPrev}>← Earlier</button>
                <div style={{fontSize:10,color:"#806050",letterSpacing:1}}>{currentPage+1} / {maxPage+1}</div>
                <button style={{...C.smBtn,opacity:canNext?1:0.25,fontSize:11,minWidth:80}} onClick={()=>canNext&&setSubjectJournalState(p=>({...p,currentPage:p.currentPage+1}))} disabled={!canNext}>Later →</button>
              </div>
            </div>
          </div>
        );
}

export function ResearchSubjectPicker({ researchSubjectPicker, setAp, setEvolvedEventState, setResearchSubjectPicker, setStudents, students }){
        const{student:nadia}=researchSubjectPicker;
        const purple="#6b5b95";
        const eligible=students.filter(st=>st.id!==nadia.id&&getTier(st.relationship).id>=1);
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0a0010",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>📋 RESEARCH SUBJECT</div>
              <div style={{fontSize:14,color:"#c0a0e0",fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Select a Subject</div>
              <div style={{fontSize:11,color:"#8070a0",marginBottom:14,textAlign:"center"}}>Close tier or above · any weight stage</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible subjects — build a Close relationship first.</div>}
              {eligible.map(st=>(
                <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#080016",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{
                    setStudents(prev=>prev.map(x=>x.id===nadia.id?{...x,researchSubjectId:st.id}:x));
                    setResearchSubjectPicker(null);
                    const stageIdx=Math.max(0,Math.min(5,getStage(nadia.lbs).id-5));
                    const evDef=EVOLVED_EVENTS['psych_researcher']?.[stageIdx];
                    const meta=EVOLVED_ACTIVITY_META['psych_researcher'];
                    if(evDef){
                      setAp(a=>a-(meta?.apCost||1));
                      setEvolvedEventState({studentId:nadia.id,formId:'psych_researcher',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
                    }
                  }}>
                  <div style={{flex:1}}>
                    <div style={{color:"#c0a0e0",fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#806090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#a090c0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>setResearchSubjectPicker(null)}>Cancel</button>
            </div>
          </div>
        );
}

export function CollabPartnerPicker({ collabPartnerPicker, setCollabPartnerId, setCollabPartnerPicker, setEvolvedEventState, students }){
        const{student:kylie,announcementText,announcementPending}=collabPartnerPicker;
        const purple="#8e44ad";
        const lightPurple="#c490e8";
        // Find eligible partners: Intimate tier (rel>=70) + content creator archetypes + not blob
        const eligible=students.filter(st=>
          st.id!==kylie.id&&
          (getTier(st.relationship).id>=2)&&
          COLLAB_CONTENT_CREATOR_ARCHETYPES.includes(st.archetype)&&
          getStage(st.lbs).id<10
        );
        if(announcementPending&&announcementText){
          return(
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
              <div style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:460,width:"95%"}}>
                <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:8,textAlign:"center"}}>📢 STREAM ANNOUNCEMENT</div>
                <div style={{fontSize:12,color:"#d0a8e8",lineHeight:1.9,fontStyle:"italic",marginBottom:16}}>{announcementText}</div>
                <button style={{...C.btn(purple),width:"100%"}} onClick={()=>setCollabPartnerPicker({student:kylie})}>Continue to Stream →</button>
              </div>
            </div>
          );
        }
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>🎥 COLLAB STREAM</div>
              <div style={{fontSize:14,color:lightPurple,fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Choose a Collab Partner</div>
              <div style={{fontSize:11,color:"#a080c0",marginBottom:14,textAlign:"center"}}>Intimate tier · content-creator archetype</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible partners right now — need an Intimate-tier gamer, artsy, or quiet student.</div>}
              {eligible.map(st=>(
                <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#0a0018",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{setCollabPartnerId(st.id);setCollabPartnerPicker(null);const stageIdx=Math.max(0,Math.min(5,getStage(kylie.lbs).id-5));const evDef=EVOLVED_EVENTS['feedee_creator']?.[stageIdx];if(evDef){setEvolvedEventState({studentId:kylie.id,formId:'feedee_creator',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0,startsContest:false,startsMatch:false,startsStream:false,startsFairDay:false});}}}>
                  <div style={{flex:1}}>
                    <div style={{color:lightPurple,fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#907090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#c0a0e0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>setCollabPartnerPicker(null)}>Cancel</button>
            </div>
          </div>
        );
}

export function CampusChallengeModal({ challengeState, processStudentGain, push, setChallengeState, setStudents, students }){
        const{studentId,stageIdx}=challengeState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const accentColor="#7a4a1a";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#100800,#1a1000,#100800)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>CAMPUS LEGEND</div>
              <div style={{fontSize:15,color:"#e0b080",fontWeight:"bold",marginBottom:10}}>Food Challenge — Stage {stageIdx+1}</div>
              <div style={{color:"#907050",fontSize:12,lineHeight:1.6,marginBottom:16}}>
                {s.name} steps up to the counter. The menu is in front of her. There's a small crowd already forming.
                <br/><br/>
                <em style={{color:"#705030"}}>(Mini-game coming in Phase 3)</em>
              </div>
              <button style={{...C.btn(accentColor),width:"100%"}} onClick={()=>{
                const gain=Math.round(8+Math.random()*12);
                setStudents(ss=>ss.map(st=>st.id===studentId?processStudentGain(st,gain,9):st));
                push(`✦ ${s.name} — Campus Challenge: +${gain} lbs · +9 rel`);
                setChallengeState(null);
              }}>Challenge Complete ✓</button>
            </div>
          </div>
        );
}

export function DeliveryOrderModal({ deliveryState, processStudentGain, push, setDeliveryState, setStudents, students }){
        const{studentId,stageIdx}=deliveryState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const accentColor="#4a6a4a";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#030e03,#071407,#030e03)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>HOME NEST</div>
              <div style={{fontSize:15,color:"#a0c0a0",fontWeight:"bold",marginBottom:10}}>Order In — Stage {stageIdx+1}</div>
              <div style={{color:"#708070",fontSize:12,lineHeight:1.6,marginBottom:16}}>
                {s.name} opens her phone. The apartment is quiet. Three apps, twelve menus, and nowhere else to be.
                <br/><br/>
                <em style={{color:"#507050"}}>(Mini-game coming in Phase 3)</em>
              </div>
              <button style={{...C.btn(accentColor),width:"100%"}} onClick={()=>{
                const gain=Math.round(7+Math.random()*10);
                setStudents(ss=>ss.map(st=>st.id===studentId?processStudentGain(st,gain,7):st));
                push(`✦ ${s.name} — Home Nest Delivery: +${gain} lbs · +7 rel`);
                setDeliveryState(null);
              }}>Close the Apps ✓</button>
            </div>
          </div>
        );
}

export function PresentationDefenseModal({ presentationState, processStudentGain, push, setPresentationState, setStudents, students }){
        const{studentId,stageIdx}=presentationState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const accentColor="#2c5f8a";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#030b14,#071424,#030b14)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>ACADEMIC SUBJECT</div>
              <div style={{fontSize:15,color:"#a0c0e0",fontWeight:"bold",marginBottom:10}}>Committee Defense — Stage {stageIdx+1}</div>
              <div style={{color:"#8090a0",fontSize:12,lineHeight:1.6,marginBottom:16}}>
                {s.name} stands at the front of the room. The committee has questions. The data is... irregular.
                <br/><br/>
                <em style={{color:"#5070a0"}}>(Mini-game coming in Phase 3)</em>
              </div>
              <button style={{...C.btn(accentColor),width:"100%"}} onClick={()=>{
                const gain=Math.round(6+Math.random()*8);
                setStudents(ss=>ss.map(st=>st.id===studentId?processStudentGain(st,gain,8):st));
                push(`✦ ${s.name} — Academic Subject Defense: +${gain} lbs · +8 rel`);
                setPresentationState(null);
              }}>Conclude Defense ✓</button>
            </div>
          </div>
        );
}

export function ActiveIntimacyScene({ closeIntimacyEvent, intimacyEventState, makeIntimacyChoice, students }){
        const {studentId,sceneId,tier,phaseIdx,history,logLines,done,endingText,gainAccum}=intimacyEventState;
        const s=students.find(st=>st.id===studentId);
        const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId];
        if(!s||!def) return null;
        const phase=!done?def.phases[phaseIdx]:null;
        const phaseText=phase?(typeof phase.text==="function"?phase.text(history,s,tier):phase.text):null;
        const accentColor="#c050a0";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#0a0318,#160424,#0a0318)",border:`1px solid ${accentColor}40`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>{(def.label||sceneId).toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#e8a8d0",marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:10,color:"#7050a0",marginBottom:12}}>{s.lbs} lbs · {getStage(s.lbs).label}{gainAccum>0?` · +${gainAccum} lbs this scene`:""}
              </div>
              {logLines.length>0&&(
                <div style={{marginBottom:12}}>
                  {logLines.map((line,i)=>(
                    <div key={i} style={{fontSize:11,color:"#6040a0",lineHeight:1.75,marginBottom:6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${accentColor}25`}}>{line}</div>
                  ))}
                </div>
              )}
              <div style={{fontSize:12,color:"#d0a8c0",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>{done?endingText:phaseText}</div>
              {!done&&phase&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {phase.choices.map(ch=>{
                    const locked=ch.requires&&!history.includes(ch.requires);
                    const excluded=ch.requiresNot&&history.includes(ch.requiresNot);
                    if(excluded) return null;
                    return(
                      <button key={ch.id}
                        style={{...C.btn(locked?"#1a1a2a":"#5010a0"),opacity:locked?0.3:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5,border:`1px solid ${accentColor}30`}}
                        disabled={!!locked}
                        onClick={()=>makeIntimacyChoice(ch.id)}>
                        <span style={{fontWeight:700,color:"#e8a8d0"}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.feed&&<span style={{color:"#ff80c0",marginLeft:4,fontSize:10}}>+lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&<button style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={closeIntimacyEvent}>Continue ✓</button>}
            </div>
          </div>
        );
}

export function IntimacySceneSelector({ ap, intimacySceneSelector, setIntimacySceneSelector, startIntimacyScene }){
        const s=intimacySceneSelector.student;
        const tier=getTier(s.relationship);
        const availScenes=INTIMACY_SCENES.filter(sc=>tier.id>=sc.minTier);
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:600,background:"linear-gradient(160deg,#0a0318,#160528,#0a0318)",border:"1px solid #8030c050",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#c050a0",marginBottom:4}}>INTIMACY</div>
              <div style={{fontSize:15,fontWeight:700,color:"#e8a8d0",marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:11,color:"#7050a0",marginBottom:16,fontStyle:"italic"}}>
                {getStage(s.lbs).label} · {s.lbs} lbs · {tier.emoji} {tier.label}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {availScenes.map(sc=>(
                  <button key={sc.id}
                    style={{...C.btn("#3a0860"),textAlign:"left",padding:"10px 14px",opacity:ap<sc.apCost?0.4:1,border:"1px solid #7030a030"}}
                    onClick={()=>startIntimacyScene(s,sc.id)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#e8a8d0"}}>{sc.icon} {sc.label}</span>
                      <span style={{fontSize:10,color:"#c050a0"}}>{sc.apCost} AP{tier.id>=3?<span style={{color:"#ff80c0",marginLeft:6}}>✦ Devoted</span>:""}</span>
                    </div>
                    <div style={{fontSize:11,color:"#8050a0",lineHeight:1.5}}>{sc.desc}</div>
                  </button>
                ))}
              </div>
              <button style={C.btn("#333")} onClick={()=>setIntimacySceneSelector(null)}>Not now</button>
            </div>
          </div>
        );
}
