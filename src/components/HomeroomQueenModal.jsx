// ═══════════════════════════════════════════════════════════════
// HOMEROOM QUEEN — Daisy's classroom mini-interface
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES, BATCH_BAKER_NPCS } from '../gameData/evolvedForms.js';

const STUDENT_KEYS = ["Kayla", "Bri", "Sofia"];
const MOM_KEYS = ["Mrs_Calloway", "Mrs_Reyes", "Mrs_Monroe"];

function displayName(key) {
  return key.replace(/_/g, " ");
}

function ParticipantCard({ name, descIdx, npcKey, canAfford, onSelect, accent, dim }) {
  const desc = BATCH_BAKER_NPCS[npcKey]?.[descIdx] || "";
  const snippet = desc ? desc.split(".")[0] : "";
  const hasEvent = !!HOMEROOM_CONFERENCE_EVENTS[npcKey];
  const enabled = canAfford && hasEvent;
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={() => enabled && onSelect(npcKey)}
      style={{
        ...C.btn(enabled ? dim : "#1a0f06"),
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 0,
        padding: 0,
        opacity: enabled ? 1 : 0.38,
        textAlign: "left",
        overflow: "hidden",
        cursor: enabled ? "pointer" : "not-allowed",
      }}
    >
      <div style={{
        fontSize: 9,
        letterSpacing: 2,
        color: enabled ? accent : "#5a4030",
        padding: "5px 8px",
        textAlign: "center",
        borderBottom: `1px solid ${accent}35`,
        background: enabled ? `${accent}12` : "transparent",
      }}>
        Conference ↓
      </div>
      <div style={{
        background: "#120a04",
        borderTop: `3px solid ${enabled ? accent : "#3a2818"}70`,
        padding: "10px 10px 12px",
        textAlign: "center",
        flex: 1,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: enabled ? "#d4a060" : "#6a5040", letterSpacing: 1, marginBottom: 5 }}>
          {name.toUpperCase()}
        </div>
        <div style={{ fontSize: 9, color: "#806040", lineHeight: 1.55 }}>{snippet}{snippet ? "." : ""}</div>
      </div>
    </button>
  );
}

export function HomeroomQueenModal({ homeroomSessionState, students, batchBakerState, makeHomeroomActivityChoice, advanceHomeroomActivityPhase, dismissHomeroomActivity, openHomeroomConference, startHomeroomGroupActivity, closeHomeroomSession }){
        const{daisyStudentId,ap:classAp,log,activeActivity,daisyGain,classGainAccum,momGainAccum,suspDeltaAccum}=homeroomSessionState;
        const daisy=students.find(st=>st.id===daisyStudentId);
        if(!daisy) return null;
        const warmAccent="#c47a2a";
        const warmDim="#7a4a18";
        const warmText="#d4a060";
        const warmSubtle="#806040";
        const WARM_BG="linear-gradient(160deg,#0f0803,#1a0f06,#0f0803)";
        const currentSusp=Math.max(0,Math.min(10,batchBakerState.suspicion+suspDeltaAccum));
        const suspPct=currentSusp*10;
        const npcDescIdx=Math.min(2,Math.floor((batchBakerState.classWeight+classGainAccum)/100));
        const momDescIdx=Math.min(4,Math.floor((batchBakerState.momWeight+momGainAccum)/30));
        const apDots=Array.from({length:3},(_,i)=>i<classAp);

        if(activeActivity){
          const{type,key,phaseIdx,done,resultText,revealsWeights,revealsParentWeights}=activeActivity;
          let phaseText,choices,actTitle;
          if(type==='conference'){
            const evDef=HOMEROOM_CONFERENCE_EVENTS[key];
            phaseText=evDef?.text; choices=evDef?.choices||[]; actTitle=`Conference — ${displayName(key)}`;
          } else {
            const actDef=HOMEROOM_GROUP_ACTIVITIES[type];
            const phases=actDef?.phases||[{text:actDef?.text,choices:actDef?.choices||[]}];
            const phase=phases[phaseIdx];
            phaseText=phase?.text; choices=phase?.choices||[]; actTitle=actDef?.label||type;
          }
          return(
            <div style={{...C.overlay,zIndex:350}}>
              <div style={{...C.modal,maxWidth:560,background:WARM_BG,border:`1px solid ${warmAccent}40`,maxHeight:"85vh",overflowY:"auto"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <div style={{fontSize:9,letterSpacing:3,color:warmDim}}>🍪 DAISY'S CLASSROOM</div>
                  <div style={{display:"flex",gap:4,marginLeft:"auto",alignItems:"center"}}>
                    <div style={{fontSize:9,color:warmDim,marginRight:3}}>AP</div>
                    {apDots.map((filled,i)=>(
                      <div key={i} style={{width:8,height:8,borderRadius:"50%",background:filled?warmAccent:"#2a1808",border:`1px solid ${filled?warmAccent:warmDim}`}}/>
                    ))}
                  </div>
                </div>
                <div style={{fontSize:9,letterSpacing:3,color:warmAccent,marginBottom:8}}>{actTitle.toUpperCase()}</div>
                <div style={{fontSize:12,color:"#d4b898",lineHeight:1.9,marginBottom:14,fontStyle:"italic",whiteSpace:"pre-line"}}>
                  {resultText||phaseText}
                </div>
                {revealsWeights&&(
                  <div style={{marginBottom:12,padding:"8px 10px",background:"rgba(196,122,42,0.08)",border:`1px solid ${warmAccent}30`,borderRadius:6}}>
                    <div style={{fontSize:9,letterSpacing:2,color:warmAccent,marginBottom:6}}>MEASUREMENTS RECORDED</div>
                    <div style={{display:"flex",gap:10}}>
                      {["Kayla","Bri","Sofia"].map(name=>{
                        const desc=BATCH_BAKER_NPCS[name]?.[npcDescIdx]||"";
                        return(
                          <div key={name} style={{flex:1}}>
                            <div style={{fontSize:10,fontWeight:700,color:warmText,marginBottom:2}}>{name}</div>
                            <div style={{fontSize:9,color:warmSubtle,lineHeight:1.5}}>{desc?desc.split(".")[0]+".":""}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {revealsParentWeights&&(
                  <div style={{marginBottom:12,padding:"8px 10px",background:"rgba(90,60,20,0.12)",border:`1px solid ${warmDim}40`,borderRadius:6}}>
                    <div style={{fontSize:9,letterSpacing:2,color:warmAccent,marginBottom:6}}>PARENT MEASUREMENTS</div>
                    <div style={{display:"flex",gap:10}}>
                      {["Mrs_Calloway","Mrs_Reyes","Mrs_Monroe"].map(name=>{
                        const desc=BATCH_BAKER_NPCS[name]?.[momDescIdx]||"";
                        return(
                          <div key={name} style={{flex:1}}>
                            <div style={{fontSize:10,fontWeight:700,color:warmText,marginBottom:2}}>{name.replace("_"," ")}</div>
                            <div style={{fontSize:9,color:warmSubtle,lineHeight:1.5}}>{desc?desc.split(".")[0]+".":""}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {!resultText&&!done&&choices.length>0&&(
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {choices.map(ch=>(
                      <button key={ch.id}
                        style={{...C.btn(warmAccent),textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        onClick={()=>makeHomeroomActivityChoice(ch.id)}>
                        <span style={{fontWeight:700}}>{ch.label}</span>
                        {ch.classGain&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.classGain} class</span>}
                        {ch.momGain&&<span style={{color:"#a0c8ff",marginLeft:4,fontSize:10}}>+{ch.momGain} moms</span>}
                        {ch.lbs&&<span style={{color:"#ffa060",marginLeft:4,fontSize:10}}>+{ch.lbs} lbs</span>}
                      </button>
                    ))}
                  </div>
                )}
                {resultText&&!done&&(
                  <button style={{...C.btn(warmAccent),width:"100%",marginTop:4}} onClick={advanceHomeroomActivityPhase}>Continue →</button>
                )}
                {done&&(
                  <button style={{...C.btn(warmAccent),width:"100%",marginTop:4}} onClick={dismissHomeroomActivity}>← Back to Classroom</button>
                )}
              </div>
            </div>
          );
        }

        return(
          <div style={{...C.overlay,zIndex:350}}>
            <div style={{...C.modal,maxWidth:640,background:WARM_BG,border:`1px solid ${warmAccent}40`,maxHeight:"90vh",overflowY:"auto"}}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:9,letterSpacing:4,color:warmAccent}}>🍪 DAISY'S CLASSROOM</div>
                <div style={{display:"flex",gap:5,marginLeft:"auto",alignItems:"center"}}>
                  <div style={{fontSize:9,color:warmDim,marginRight:3}}>AP</div>
                  {apDots.map((filled,i)=>(
                    <div key={i} style={{width:10,height:10,borderRadius:"50%",background:filled?warmAccent:"#2a1808",border:`1px solid ${filled?warmAccent:warmDim}`}}/>
                  ))}
                </div>
              </div>
              {/* Status bars */}
              <div style={{marginBottom:14,padding:"8px 10px",background:"rgba(196,122,42,0.06)",border:`1px solid ${warmAccent}20`,borderRadius:6}}>
                <div style={{display:"flex",gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,letterSpacing:2,color:suspPct>70?"#e05030":warmAccent,marginBottom:3}}>SUSPICION {currentSusp}/10</div>
                    <div style={{height:4,background:"#1a0800",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${suspPct}%`,background:suspPct>70?"#e05030":suspPct>40?warmAccent:warmDim,transition:"width 0.3s"}}/>
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,letterSpacing:2,color:"#7db87d",marginBottom:3}}>CLASS {batchBakerState.classWeight+classGainAccum} wt</div>
                    <div style={{height:4,background:"#0a1a0a",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.min(100,Math.round((batchBakerState.classWeight+classGainAccum)/2))}%`,background:"#4a8a4a",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,letterSpacing:2,color:"#8a7dba",marginBottom:3}}>MOMS {batchBakerState.momWeight+momGainAccum} wt</div>
                    <div style={{height:4,background:"#0a0a1a",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.min(100,Math.round((batchBakerState.momWeight+momGainAccum)/1.3))}%`,background:"#5a4a8a",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                </div>
              </div>
              {/* Students */}
              <div style={{fontSize:9,letterSpacing:3,color:warmDim,marginBottom:10}}>STUDENTS · tap to conference</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                {STUDENT_KEYS.map(name=>(
                  <ParticipantCard
                    key={name}
                    name={name}
                    npcKey={name}
                    descIdx={npcDescIdx}
                    canAfford={classAp>=1}
                    onSelect={openHomeroomConference}
                    accent={warmAccent}
                    dim={warmDim}
                  />
                ))}
              </div>
              {/* Moms */}
              <div style={{fontSize:9,letterSpacing:3,color:warmDim,marginBottom:10}}>MOMS · tap to conference</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                {MOM_KEYS.map(key=>(
                  <ParticipantCard
                    key={key}
                    name={displayName(key)}
                    npcKey={key}
                    descIdx={momDescIdx}
                    canAfford={classAp>=1}
                    onSelect={openHomeroomConference}
                    accent="#8a7dba"
                    dim="#5a4a7a"
                  />
                ))}
              </div>
              {/* Group activities */}
              <div style={{fontSize:9,letterSpacing:3,color:warmDim,marginBottom:8}}>GROUP ACTIVITIES</div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {Object.entries(HOMEROOM_GROUP_ACTIVITIES).map(([key,actDef])=>{
                  const canAfford=classAp>=actDef.apCost;
                  return(
                    <button key={key}
                      style={{...C.btn(canAfford?warmDim:"#1a0f06"),flex:1,opacity:canAfford?1:0.38,padding:"9px 12px",lineHeight:1.4,textAlign:"left"}}
                      disabled={!canAfford}
                      onClick={()=>startHomeroomGroupActivity(key)}>
                      <div style={{fontWeight:700,fontSize:11}}>{actDef.label}</div>
                      <div style={{fontSize:9,color:"#a08050",marginTop:2}}>· {actDef.apCost} AP ·</div>
                    </button>
                  );
                })}
              </div>
              {/* Session log */}
              {log.length>0&&(
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:warmDim,marginBottom:6}}>SESSION LOG</div>
                  {log.map((line,i)=>(
                    <div key={i} style={{fontSize:10,color:warmSubtle,lineHeight:1.75,paddingLeft:8,borderLeft:`2px solid ${warmAccent}30`}}>{line}</div>
                  ))}
                </div>
              )}
              {/* End session */}
              <button style={{...C.btn("#1a0c04"),width:"100%",marginTop:4,border:`1px solid ${warmAccent}30`,fontSize:12}}
                onClick={closeHomeroomSession}>
                End Session{daisyGain>0?` · +${daisyGain} lbs to Daisy`:""}
              </button>
            </div>
          </div>
        );
}
