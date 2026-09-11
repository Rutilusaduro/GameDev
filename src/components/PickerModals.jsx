import { useEffect, useState } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { COLLAB_CONTENT_CREATOR_ARCHETYPES } from '../gameData/miniGames.js';
import { EVOLVED_ACTIVITY_META, EVOLVED_EVENTS } from '../gameData/evolvedForms.js';
import { renderNadiaJournalEntry, renderFeederJournalEntry } from '../textEngine/scenes/researchJournal/index.js';
import { INTIMACY_CONTEXTUAL, INTIMACY_SCENES } from '../gameData/intimacy.js';
import { intimacySceneAllowed, choiceCanPin } from '../gameData/intimacyGating.js';
import { renderIntimacyPhase } from '../textEngine/scenes/intimacy/index.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { EVOLVED_MINIGAMES, computeMinigameOutcome, minigameTierLabel } from '../gameData/evolvedMinigames.js';


export function NadiaSubjectNotesModal({ nadiaNotesState, setNadiaNotesState, students, soundEnabled = true }){
        const{nadiaId,subjectId,currentPage}=nadiaNotesState;
        useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, subjectId, currentPage]);
        const nadia=students.find(st=>st.id===nadiaId);
        const subj=students.find(st=>st.id===subjectId);
        if(!nadia||!subj) return null;
        const journalAvailable=!!subj?.archetype;
        if(!journalAvailable) return null;
        const nadiaStageId=getStage(nadia.lbs).id;
        const nadiaLevel=nadiaStageId>=10?2:nadiaStageId>=8?1:0;
        const maxPage=getStage(subj.lbs).id;
        const STAGE_LABELS=["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
        const NADIA_LEVEL_LABELS=["Heavy–Very Fat","Enormous–Colossal","Blob"];
        const isIntro=currentPage===-1;
        const introText=renderNadiaJournalEntry(subj.archetype, -1, nadiaLevel, subj, 1);
        const entryText=isIntro?introText:renderNadiaJournalEntry(subj.archetype, currentPage, nadiaLevel, subj, 1);
        const purple="#6b5b95";

        const canPrev=!isIntro;
        const canNext=!isIntro&&currentPage<maxPage;
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
            <div className="hall-pass-modal-in picker-modal" style={{background:`linear-gradient(170deg,#080015,#0d0025)`,border:`1px solid ${purple}60`,borderRadius:6,padding:0,maxWidth:520,width:"95%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:`0 8px 40px rgba(80,20,120,0.4)`}}>
              {/* Header */}
              <div style={{background:`linear-gradient(90deg,#0a0020,#150030,#0a0020)`,borderBottom:`1px solid ${purple}40`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"4px 4px 0 0"}}>
                <div style={{fontSize:9,letterSpacing:3,color:purple}}>📓 RESEARCH NOTES</div>
                <div style={{fontSize:11,color:"#c0a0e0",fontWeight:"bold"}}>{nadia.name} → {subj.name}</div>
                <button style={{...C.smBtn,fontSize:10,padding:"2px 8px",background:"transparent",border:`1px solid ${purple}30`,color:"#7050a0"}} onClick={()=>{ playHallPassSound('click', soundEnabled); setNadiaNotesState(null); }}>✕</button>
              </div>
              {/* Stage/level indicator */}
              <div style={{padding:"6px 16px",background:"#050010",borderBottom:`1px solid ${purple}20`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:9,color:"#5040708",letterSpacing:2}}>{isIntro?"INTRODUCTION":`STAGE: ${STAGE_LABELS[currentPage]}`}</div>
                <div style={{fontSize:9,color:"#6b5b95",letterSpacing:2}}>NADIA: {NADIA_LEVEL_LABELS[nadiaLevel]}</div>
              </div>
              {/* Entry */}
              <div style={{flex:1,overflowY:"auto",padding:"20px 22px",background:"#040010"}}>
                {isIntro&&<div style={{fontSize:9,letterSpacing:3,color:purple,marginBottom:10,textTransform:"uppercase"}}>Why this resident</div>}
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

export function SubjectJournalModal({ setSubjectJournalState, students, subjectJournalState, soundEnabled = true }){
        const{subjectId,currentPage}=subjectJournalState;
        useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, subjectId, currentPage]);
        const subj=students.find(st=>st.id===subjectId);
        if(!subj) return null;
        const maxPage=getStage(subj.lbs).id;
        const entry=renderFeederJournalEntry(subj.archetype, currentPage, subj, 1) || "No entry for this stage yet.";
        const STAGE_LABELS=["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
        const minPage=0;
        const canPrev=currentPage>Math.max(0,minPage);
        const canNext=currentPage<maxPage;
        const inkColor="#2a1a40";
        const pageColor="#f0eade";
        const borderColor="#8b7355";
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
            <div className="hall-pass-modal-in picker-modal" style={{background:`linear-gradient(170deg,#1a0a2e,#0d0520)`,border:`2px solid ${borderColor}80`,borderRadius:4,padding:0,maxWidth:520,width:"95%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 8px 40px rgba(0,0,0,0.7)"}}>
              {/* Spine header */}
              <div style={{background:`linear-gradient(90deg,#120820,#1e0a38,#120820)`,borderBottom:`1px solid ${borderColor}60`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"2px 2px 0 0"}}>
                <div style={{fontSize:9,letterSpacing:3,color:"#a08060"}}>📔 RESIDENT JOURNAL</div>
                <div style={{fontSize:11,color:"#c0a070",fontWeight:"bold"}}>{subj.name}</div>
                <button style={{...C.smBtn,fontSize:10,padding:"2px 8px",background:"transparent",border:"1px solid #40206040",color:"#806050"}} onClick={()=>{ playHallPassSound('click', soundEnabled); setSubjectJournalState(null); }}>✕</button>
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

export function ResearchSubjectPicker({ researchSubjectPicker, setAp, setEvolvedEventState, setResearchSubjectPicker, setStudents, students, soundEnabled = true }){
        const{student:nadia}=researchSubjectPicker;
        useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, nadia?.id]);
        const purple="#6b5b95";
        const eligible=students.filter(st=>st.id!==nadia.id&&getTier(st.relationship).id>=1);
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div className="hall-pass-modal-in picker-modal" style={{background:"#0a0010",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>📋 HALL LOG FOCUS</div>
              <div style={{fontSize:14,color:"#c0a0e0",fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Select a Resident</div>
              <div style={{fontSize:11,color:"#8070a0",marginBottom:14,textAlign:"center"}}>Close tier or above · any weight stage</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible residents — build a Close relationship first.</div>}
              {eligible.map(st=>(
                <div key={st.id} role="button" tabIndex={0} className="picker-choice-row" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#080016",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{
                    playHallPassSound('confirm', soundEnabled);
                    setStudents(prev=>prev.map(x=>x.id===nadia.id?{...x,researchSubjectId:st.id}:x));
                    setResearchSubjectPicker(null);
                    const stageIdx=Math.max(0,Math.min(5,getStage(nadia.lbs).id-5));
                    const evDef=EVOLVED_EVENTS['psych_researcher']?.[stageIdx];
                    const meta=EVOLVED_ACTIVITY_META['psych_researcher'];
                    if(evDef){
                      setAp(a=>a-(meta?.apCost||1));
                      setEvolvedEventState({studentId:nadia.id,formId:'psych_researcher',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
                    }
                  }}
                  onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.currentTarget.click(); } }}>
                  <div style={{flex:1}}>
                    <div style={{color:"#c0a0e0",fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#806090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#a090c0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>{ playHallPassSound('click', soundEnabled); setResearchSubjectPicker(null); }}>Cancel</button>
            </div>
          </div>
        );
}

export function CollabPartnerPicker({ collabPartnerPicker, setCollabPartnerId, setCollabPartnerPicker, setEvolvedEventState, students, soundEnabled = true }){
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
        useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, kylie?.id, announcementPending]);
        if(announcementPending&&announcementText){
          return(
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
              <div className="hall-pass-modal-in picker-modal" style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:460,width:"95%"}}>
                <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:8,textAlign:"center"}}>📢 STREAM ANNOUNCEMENT</div>
                <div style={{fontSize:12,color:"#d0a8e8",lineHeight:1.9,fontStyle:"italic",marginBottom:16}}>{announcementText}</div>
                <button style={{...C.btn(purple),width:"100%"}} onClick={()=>{ playHallPassSound('confirm', soundEnabled); setCollabPartnerPicker({student:kylie}); }}>Continue to Stream →</button>
              </div>
            </div>
          );
        }
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div className="hall-pass-modal-in picker-modal" style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>🎥 COLLAB STREAM</div>
              <div style={{fontSize:14,color:lightPurple,fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Choose a Collab Partner</div>
              <div style={{fontSize:11,color:"#a080c0",marginBottom:14,textAlign:"center"}}>Intimate tier · content-creator archetype</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible partners right now — need an Intimate-tier gamer, artsy, or quiet resident.</div>}
              {eligible.map(st=>(
                <div key={st.id} role="button" tabIndex={0} className="picker-choice-row" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#0a0018",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{ playHallPassSound('confirm', soundEnabled); setCollabPartnerId(st.id);setCollabPartnerPicker(null);const stageIdx=Math.max(0,Math.min(5,getStage(kylie.lbs).id-5));const evDef=EVOLVED_EVENTS['feedee_creator']?.[stageIdx];if(evDef){setEvolvedEventState({studentId:kylie.id,formId:'feedee_creator',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0,startsContest:false,startsMatch:false,startsStream:false,startsFairDay:false});}}}
                  onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.currentTarget.click(); } }}>
                  <div style={{flex:1}}>
                    <div style={{color:lightPurple,fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#907090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#c0a0e0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>{ playHallPassSound('click', soundEnabled); setCollabPartnerPicker(null); }}>Cancel</button>
            </div>
          </div>
        );
}

function EvolvedMinigameModal({ gameId, studentId, stageIdx, students, processStudentGain, setStudents, push, onClose, soundEnabled = true, week = 1 }) {
  const def = EVOLVED_MINIGAMES[gameId];
  const s = students.find((st) => st.id === studentId);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [history, setHistory] = useState([]);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const [outcome, setOutcome] = useState(null);
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, gameId, studentId, phaseIdx, done]);
  if (!def || !s) return null;

  const ctx = { studentName: s.name, stageIdx };
  const phase = !done ? def.phases[phaseIdx] : null;
  const phaseText = phase ? (typeof phase.text === 'function' ? phase.text(ctx) : phase.text) : null;

  const pickChoice = (choice) => {
    const nextLog = [...log, choice.log];
    const nextHistory = [...history, choice];
    const nextPhase = phaseIdx + 1;
    if (nextPhase >= def.phases.length) {
      const result = computeMinigameOutcome(gameId, nextHistory, stageIdx, {
        leftoverFed: !!s.leftoverFedThisWeek,
        nightVisit: s.lastNightVisitWeek === week,
      });
      setStudents((ss) => ss.map((st) => (st.id === studentId ? processStudentGain(st, result.gain, result.rel) : st)));
      const labels = {
        campus_challenge: 'Campus Challenge',
        delivery_order: 'Home Nest Delivery',
        presentation_defense: 'Hall Log Defense',
      };
      push(`✦ ${s.name} — ${labels[gameId]}: ${minigameTierLabel(result.tier)} · +${result.gain} lbs · +${result.rel} rel`);
      setOutcome(result);
      setLog(nextLog);
      setHistory(nextHistory);
      setDone(true);
      return;
    }
    setLog(nextLog);
    setHistory(nextHistory);
    setPhaseIdx(nextPhase);
  };

  const dismissMinigame = () => { if (done) { playHallPassSound('click', soundEnabled); onClose(); } };
  return (
    <ModalOverlay onClose={dismissMinigame} dismissible={done} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in picker-modal" style={{ ...C.modal, maxWidth: 540, background: 'linear-gradient(160deg,#100800,#1a1000,#100800)', border: `1px solid ${def.accent}50`, maxHeight: '85vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: def.accent, marginBottom: 4 }}>{def.tag}</div>
        <div style={{ fontSize: 15, color: '#e0d0c0', fontWeight: 'bold', marginBottom: 4 }}>{def.title} — Stage {stageIdx + 1}</div>
        <div style={{ fontSize: 10, color: '#907060', marginBottom: 10 }}>{s.name} · {Math.round(s.lbs)} lbs</div>
        {log.map((line, i) => (
          <div key={i} style={{ fontSize: 11, color: '#806050', fontStyle: 'italic', marginBottom: 6, paddingLeft: 8, borderLeft: `2px solid ${def.accent}30` }}>{line}</div>
        ))}
        <div style={{ color: '#a09080', fontSize: 12, lineHeight: 1.7, marginBottom: 16 }}>
          {done ? `${s.name} exhales, full and satisfied. ${outcome ? minigameTierLabel(outcome.tier) : ''}` : phaseText}
        </div>
        {!done && phase && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {phase.choices.map((ch) => (
              <button key={ch.id} type="button" className="evolved-minigame-choice-row" style={{ ...C.btn(def.accent), textAlign: 'left', fontSize: 12 }} onClick={() => { playHallPassSound('click', soundEnabled); pickChoice(ch); }}>
                {ch.label}
              </button>
            ))}
          </div>
        )}
        {done && (
          <button type="button" className="evolved-minigame-choice-row" style={{ ...C.btn(def.accent), width: '100%' }} onClick={() => { playHallPassSound('confirm', soundEnabled); onClose(); }}>Continue ✓</button>
        )}
      </div>
    </ModalOverlay>
  );
}

export function CampusChallengeModal({ challengeState, processStudentGain, push, setChallengeState, setStudents, students, soundEnabled = true, week = 1 }) {
  if (!challengeState) return null;
  return (
    <EvolvedMinigameModal
      gameId="campus_challenge"
      studentId={challengeState.studentId}
      stageIdx={challengeState.stageIdx}
      students={students}
      processStudentGain={processStudentGain}
      setStudents={setStudents}
      push={push}
      onClose={() => setChallengeState(null)}
      soundEnabled={soundEnabled}
      week={week}
    />
  );
}

export function DeliveryOrderModal({ deliveryState, processStudentGain, push, setDeliveryState, setStudents, students, soundEnabled = true, week = 1 }) {
  if (!deliveryState) return null;
  return (
    <EvolvedMinigameModal
      gameId="delivery_order"
      studentId={deliveryState.studentId}
      stageIdx={deliveryState.stageIdx}
      students={students}
      processStudentGain={processStudentGain}
      setStudents={setStudents}
      push={push}
      onClose={() => setDeliveryState(null)}
      soundEnabled={soundEnabled}
      week={week}
    />
  );
}

export function PresentationDefenseModal({ presentationState, processStudentGain, push, setPresentationState, setStudents, students, soundEnabled = true, week = 1 }) {
  if (!presentationState) return null;
  return (
    <EvolvedMinigameModal
      gameId="presentation_defense"
      studentId={presentationState.studentId}
      stageIdx={presentationState.stageIdx}
      students={students}
      processStudentGain={processStudentGain}
      setStudents={setStudents}
      push={push}
      onClose={() => setPresentationState(null)}
      soundEnabled={soundEnabled}
      week={week}
    />
  );
}

export function ActiveIntimacyScene({ closeIntimacyEvent, intimacyEventState, makeIntimacyChoice, students, soundEnabled = true }){
        const {studentId,sceneId,tier,week:sceneWeek,phaseIdx,history,logLines,done,endingText,gainAccum}=intimacyEventState;
        useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, sceneId, phaseIdx, done]);
        const s=students.find(st=>st.id===studentId);
        const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId];
        if(!s||!def) return null;
        const phase=!done?def.phases[phaseIdx]:null;
        const phaseText=phase?renderIntimacyPhase(sceneId,phaseIdx,s,history,tier,sceneWeek??1):null;
        const accentColor="#c050a0";
        return(
          <ModalOverlay dismissible={false}>
            <div className="hall-pass-modal-in picker-modal" style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#0a0318,#160424,#0a0318)",border:`1px solid ${accentColor}40`,maxHeight:"85vh",overflowY:"auto"}}>
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
                      <button key={ch.id} type="button" className="intimacy-choice-row"
                        style={{...C.btn(locked?"#1a1a2a":"#5010a0"),opacity:locked?0.3:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5,border:`1px solid ${accentColor}30`}}
                        disabled={!!locked}
                        onClick={()=>{ playHallPassSound('click', soundEnabled); makeIntimacyChoice(ch.id); }}>
                        <span style={{fontWeight:700,color:"#e8a8d0"}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.feed&&<span style={{color:"#ff80c0",marginLeft:4,fontSize:10}}>+lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                        {choiceCanPin(sceneId,ch.id,s)&&<span style={{display:"block",color:"#ffa030",fontSize:9.5,marginTop:3,fontStyle:"italic"}}>⚠ she could put you out for the week</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&<button type="button" className="intimacy-choice-row" style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={()=>{ playHallPassSound('confirm', soundEnabled); closeIntimacyEvent(); }}>Continue ✓</button>}
            </div>
          </ModalOverlay>
        );
}

export function IntimacySceneSelector({ ap, intimacySceneSelector, setIntimacySceneSelector, startIntimacyScene, soundEnabled = true }){
        const s=intimacySceneSelector.student;
        useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, s?.id]);
        const tier=getTier(s.relationship);
        const availScenes=INTIMACY_SCENES.filter(sc=>tier.id>=sc.minTier&&intimacySceneAllowed(sc.id,s));
        const dismissSelector=()=>{ playHallPassSound('click', soundEnabled); setIntimacySceneSelector(null); };
        return(
          <ModalOverlay onClose={dismissSelector} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in picker-modal" style={{...C.modal,maxWidth:600,background:"linear-gradient(160deg,#0a0318,#160528,#0a0318)",border:"1px solid #8030c050",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#c050a0",marginBottom:4}}>INTIMACY</div>
              <div style={{fontSize:15,fontWeight:700,color:"#e8a8d0",marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:11,color:"#7050a0",marginBottom:16,fontStyle:"italic"}}>
                {getStage(s.lbs).label} · {s.lbs} lbs · {tier.emoji} {tier.label}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {availScenes.map(sc=>(
                  <button key={sc.id} type="button" className="intimacy-choice-row"
                    style={{...C.btn("#3a0860"),textAlign:"left",padding:"10px 14px",opacity:ap<sc.apCost?0.4:1,border:"1px solid #7030a030"}}
                    onClick={()=>{ playHallPassSound('click', soundEnabled); startIntimacyScene(s,sc.id); }}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#e8a8d0"}}>{sc.icon} {sc.label}</span>
                      <span style={{fontSize:10,color:"#c050a0"}}>{sc.apCost} AP{tier.id>=3?<span style={{color:"#ff80c0",marginLeft:6}}>✦ Devoted</span>:""}</span>
                    </div>
                    <div style={{fontSize:11,color:"#8050a0",lineHeight:1.5}}>{sc.desc}</div>
                  </button>
                ))}
              </div>
              <button type="button" className="intimacy-choice-row" style={C.btn("#333")} onClick={dismissSelector}>Not now</button>
            </div>
          </ModalOverlay>
        );
}
