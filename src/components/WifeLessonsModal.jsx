// ═══════════════════════════════════════════════════════════════
// WIFE LESSONS MINI-GAME
// ═══════════════════════════════════════════════════════════════
import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { WL_CONFIG, WL_LESSONS } from '../gameData/evolvedForms.js';
import { FlaggedProse } from './TextFlagToolbar.jsx';
import { SceneBackdrop } from './v2/SceneBackdrop.jsx';

/** Weight daughters must reach to advance — bumps to next stage's bar once current is met. */
function wlNextThresholdCap(stage, daughters) {
  if (stage >= 8) return Infinity;
  const exitCap = WL_CONFIG.stageCaps[stage];
  const allReady = Object.values(daughters).every((w) => w >= exitCap);
  if (allReady && stage < 8) return WL_CONFIG.stageCaps[stage + 1];
  return exitCap;
}

export function WifeLessonsModal({ wifeLessonsState, makeWifeLessonsConversationChoice, makeWifeLessonsSubChoice, dismissWifeLessonsConversation, chooseWifeLessonsLesson, startWifeLessonsConversation, closeWifeLessonsSession, soundEnabled = true }){
        const{stage,daughters,moms,session}=wifeLessonsState;
        const{lessonChosen,lessonId,lessonProse,mjGainAccum,relAccum,conversationState,log}=session;
        useEffect(() => {
          playHallPassSound('confirm', soundEnabled);
        }, [soundEnabled, stage, lessonId, conversationState?.person, conversationState?.optionIdx]);

        const WINE_BG="#0e0508";
        const WINE_DIM="#5a2040";
        const WINE_TEXT="#e8c8d8";
        const WINE_SUBTLE="#b890a8";
        const WINE_ACCENT="#c03070";
        const cap=wlNextThresholdCap(stage, daughters);
        const exitCap=WL_CONFIG.stageCaps[stage];
        const isDaughterStage=stage>=WL_CONFIG.daughtersFrom;
        const lessons=WL_LESSONS[stage]||[];
        const chosenLesson=lessonId?lessons.find(l=>l.id===lessonId):null;

        // ── Conversation panel ──
        if(conversationState){
          const{person,stageEntry,optionIdx,atGreeting,done,history}=conversationState;
          const isDaughter=['Emma','Chloe','Kezia','Lila'].includes(person);
          const personWeight=isDaughter?daughters[person]:moms[person];
          const transcript=history?.length?history:[];
          return(
            <div style={{...C.overlay,zIndex:360}}>
              <div className="hall-pass-modal-in" style={{...C.modal,maxWidth:560,background:WINE_BG,border:`1px solid ${WINE_ACCENT}40`,maxHeight:"88vh",overflowY:"auto"}}>
                <SceneBackdrop variant="wifeLessons" />
                <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:4,color:WINE_ACCENT}}>💬 {person.toUpperCase()}</div>
                  <div style={{marginLeft:"auto",fontSize:9,color:WINE_DIM}}>{Math.round(personWeight)} lbs · Stage {stage}</div>
                </div>
                {transcript.length>0&&(
                  <div style={{marginBottom:14,display:"flex",flexDirection:"column",gap:10}}>
                    {transcript.map((line,i)=>(
                      <FlaggedProse
                        key={i}
                        section={`wifeLessons.talk.${person}`}
                        text={line}
                        stateLine={`${person} · Stage ${stage}`}
                        style={{fontSize:12,color:WINE_TEXT,lineHeight:1.75,padding:"10px 12px",background:"rgba(139,34,82,0.08)",border:`1px solid ${WINE_DIM}40`,borderRadius:5}}
                      />
                    ))}
                  </div>
                )}
                {atGreeting&&!done&&(
                  <button style={{...C.btn(WINE_ACCENT),width:"100%"}} onClick={()=>makeWifeLessonsConversationChoice(0)}>Continue →</button>
                )}
                {!atGreeting&&optionIdx==null&&!done&&(
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {stageEntry.options.map((opt,i)=>(
                      <button key={i} style={{...C.btn(WINE_DIM),textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        onClick={()=>makeWifeLessonsConversationChoice(i)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {!atGreeting&&optionIdx!=null&&!done&&(
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {stageEntry.options[optionIdx].subs.map((sub,i)=>(
                      <button key={i} style={{...C.btn(WINE_DIM),textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        onClick={()=>makeWifeLessonsSubChoice(i)}>
                        {sub.label}
                        {sub.outcome?.daughterLbs&&<span style={{color:"#ffaacc",marginLeft:8,fontSize:10}}>+{sub.outcome.daughterLbs} lbs</span>}
                        {sub.outcome?.momLbs&&<span style={{color:"#ffaacc",marginLeft:8,fontSize:10}}>+{sub.outcome.momLbs} lbs</span>}
                        {sub.outcome?.mjLbs&&<span style={{color:"#ffd0e8",marginLeft:4,fontSize:10}}>you +{sub.outcome.mjLbs}</span>}
                      </button>
                    ))}
                  </div>
                )}
                {done&&(
                  <button style={{...C.btn(WINE_ACCENT),width:"100%",marginTop:4}} onClick={dismissWifeLessonsConversation}>← Back</button>
                )}
              </div>
            </div>
          );
        }

        // ── Main session view ──
        return(
          <div style={{...C.overlay,zIndex:360}}>
            <div className="hall-pass-modal-in" style={{...C.modal,maxWidth:640,background:WINE_BG,border:`1px solid ${WINE_ACCENT}40`,maxHeight:"90vh",overflowY:"auto"}}>
              <SceneBackdrop variant="wifeLessons" />
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:9,letterSpacing:4,color:WINE_ACCENT}}>🍷 WIFE LESSONS</div>
                <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{fontSize:9,color:WINE_DIM}}>STAGE {stage}</div>
                  <div style={{fontSize:9,color:WINE_SUBTLE}}>Next threshold: {cap===Infinity?"—":`${cap} lbs`}</div>
                </div>
              </div>

              {/* Lesson selection */}
              {!lessonChosen?(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:3,color:WINE_DIM,marginBottom:8}}>CHOOSE TODAY'S LESSON</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {lessons.map(l=>(
                      <button key={l.id}
                        style={{...C.btn(WINE_DIM),textAlign:"left",padding:"10px 14px",lineHeight:1.5}}
                        onClick={()=>chooseWifeLessonsLesson(l.id)}>
                        <span style={{fontWeight:700,fontSize:12,color:WINE_TEXT}}>{l.label}</span>
                        <span style={{color:"#ffaacc",marginLeft:10,fontSize:10}}>+{l.daughterLbs} daughters</span>
                        <span style={{color:"#c898b8",marginLeft:6,fontSize:10}}>+{l.momLbs} moms</span>
                        <span style={{color:"#ffd0e8",marginLeft:6,fontSize:10}}>you +{l.mjLbs}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ):(
                <div style={{marginBottom:14}}>
                  <div style={{padding:"8px 12px",background:"rgba(139,34,82,0.08)",border:`1px solid ${WINE_DIM}30`,borderRadius:5,marginBottom:chosenLesson?.text?10:0}}>
                    <div style={{fontSize:9,color:WINE_SUBTLE}}>Lesson done · You +{mjGainAccum} lbs this session · +{relAccum} rel</div>
                  </div>
                  {chosenLesson?.text&&(
                    <FlaggedProse
                      section={`wifeLessons.lesson.${chosenLesson.id}`}
                      text={lessonProse||chosenLesson.text}
                      stateLine={`Stage ${stage} · ${chosenLesson.label}`}
                      style={{fontSize:12,color:WINE_TEXT,lineHeight:1.75,padding:"10px 12px",background:"rgba(139,34,82,0.06)",border:`1px solid ${WINE_DIM}30`,borderRadius:5}}
                    />
                  )}
                </div>
              )}

              {/* Daughters (from stage 6) */}
              {isDaughterStage&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:3,color:WINE_DIM,marginBottom:8}}>DAUGHTERS</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                    {Object.entries(daughters).map(([name,wt])=>{
                      const isCapped=wt>=exitCap;
                      const isLeader=name==='Chloe'&&stage>=WL_CONFIG.chloeRivalFrom&&wt>daughters.Emma;
                      return(
                        <div key={name} style={{background:"#130610",border:`1px solid ${isCapped?WINE_ACCENT:WINE_DIM}40`,borderRadius:5,padding:"8px 10px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                            <span style={{fontSize:11,fontWeight:700,color:WINE_TEXT}}>{name}{isLeader?" ★":""}</span>
                            <span style={{fontSize:10,color:isCapped?WINE_ACCENT:WINE_SUBTLE}}>{Math.round(wt)} lbs{isCapped?" ✓":""}</span>
                          </div>
                          <button
                            style={{...C.btn(WINE_DIM),width:"100%",fontSize:10,padding:"4px 8px"}}
                            onClick={()=>startWifeLessonsConversation(name)}>
                            Talk
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Moms */}
              <div style={{marginBottom:16}}>
                <div style={{fontSize:9,letterSpacing:3,color:WINE_DIM,marginBottom:8}}>MOMS</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                  {Object.entries(moms).map(([name,wt])=>{
                    const isCapped=wt>=exitCap;
                    return(
                      <div key={name} style={{background:"#130610",border:`1px solid ${isCapped?WINE_ACCENT:WINE_DIM}40`,borderRadius:5,padding:"8px 10px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                          <span style={{fontSize:11,fontWeight:700,color:WINE_TEXT}}>{name}</span>
                          <span style={{fontSize:10,color:isCapped?WINE_ACCENT:WINE_SUBTLE}}>{Math.round(wt)} lbs</span>
                        </div>
                        <button
                          style={{...C.btn(WINE_DIM),width:"100%",fontSize:10,padding:"4px 8px"}}
                          onClick={()=>startWifeLessonsConversation(name)}>
                          Talk
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session log */}
              {log.length>0&&(
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:WINE_DIM,marginBottom:6}}>SESSION LOG</div>
                  {log.map((line,i)=>(
                    <div key={i} style={{fontSize:10,color:WINE_SUBTLE,lineHeight:1.75,paddingLeft:8,borderLeft:`2px solid ${WINE_ACCENT}30`}}>{line}</div>
                  ))}
                </div>
              )}

              <button
                style={{...C.btn("#0e0508"),width:"100%",marginTop:4,border:`1px solid ${WINE_ACCENT}30`,fontSize:12}}
                onClick={()=>{ playHallPassSound('click', soundEnabled); closeWifeLessonsSession(); }}>
                End Session{mjGainAccum>0?` · +${mjGainAccum} lbs to Mary Jane`:""}
              </button>
            </div>
          </div>
        );
}
