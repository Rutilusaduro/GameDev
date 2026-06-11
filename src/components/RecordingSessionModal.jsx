// ═══════════════════════════════════════════════════════════════
// RECORDING SESSION — Film her session modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { RECORDING_OPENING_TEXT, RECORDING_TAKE_INTRO_TEXT } from '../gameData/miniGames.js';

export function RecordingSessionModal({ recordingSessionState, students, setRecordingSessionState, makeRecordingChoice, wrapRecordingSession, oneMoreTake, closeRecordingSession, dismissRecordingChoicePopup }){
        const rs=recordingSessionState;
        const kylie=students.find(st=>st.id===rs.studentId);
        if(!kylie) return null;
        const amber='#c08040';
        const amberDim='#80502a';
        const bg='linear-gradient(160deg,#100800,#1a1000,#100800)';
        const qualBadge={okay:'#808080',good:'#60a060',great:'#60a0e0',perfect:'#c0a020'};
        const choiceLabels={
          angle_low:'📷 Get low — floor angle, looking up',
          angle_wide:'📷 Go wide — full body, scale of her',
          angle_close:'📷 Close up — face and chest',
          food_heavy:'🍖 Heavy food — dense and filling',
          food_build:'🥗 Start light, build to heavier',
          food_hers:'💜 Let her choose what she wants',
          pace_push:'⚡ Push her — more, faster',
          pace_settle:'🌊 Let her set the pace',
          pace_surge:'🌀 Pause — let it land — then surge',
        };
        const stepLabels=['📷 Camera angle','🍽️ Food','⏱️ Pacing'];
        const angleChoices=['angle_low','angle_wide','angle_close'];
        const foodChoices=['food_heavy','food_build','food_hers'];
        const paceChoices=['pace_push','pace_settle','pace_surge'];
        const stepChoices=[angleChoices,foodChoices,paceChoices];
        const timeBar='█'.repeat(rs.timeLeft)+'░'.repeat(3-rs.timeLeft);
        return(
          <div style={C.overlay} key="recording-modal">
            <div style={{...C.modal,maxWidth:520,background:bg,border:`1px solid ${amber}50`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{color:amber,fontWeight:"bold",letterSpacing:2,fontSize:11}}>🎬 FILM HER SESSION — {kylie.name.toUpperCase()}</div>
                <div style={{color:amberDim,fontSize:11}}>Time {timeBar} | Take {rs.takeNum}</div>
              </div>

              {/* OPEN PHASE */}
              {rs.phase==='open'&&(
                <>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {(()=>{const fn=RECORDING_OPENING_TEXT[rs.stageIdx];return typeof fn==='function'?fn(kylie.lbs):(fn||'');})()}
                  </div>
                  <button style={{...C.btn(amber),width:"100%"}} onClick={()=>setRecordingSessionState(p=>({...p,phase:'directing'}))}>
                    🎬 Pick up the camera
                  </button>
                </>
              )}

              {/* DIRECTING PHASE */}
              {rs.phase==='directing'&&(
                <>
                  <div style={{fontSize:11,color:"#d8c0a0",lineHeight:1.8,marginBottom:8,fontStyle:"italic"}}>
                    {(()=>{const fn=RECORDING_TAKE_INTRO_TEXT[rs.stageIdx];return typeof fn==='function'?fn(kylie.lbs):(fn||'');})()}
                  </div>
                  {/* Step indicator */}
                  <div style={{display:"flex",gap:4,marginBottom:12}}>
                    {[0,1,2].map(i=>(
                      <div key={i} style={{flex:1,padding:"4px 6px",borderRadius:4,fontSize:10,textAlign:"center",
                        background:i<rs.choiceStep?`${amber}30`:i===rs.choiceStep?`${amber}20`:'#0a0600',
                        border:`1px solid ${i===rs.choiceStep?amber:i<rs.choiceStep?amberDim:'#302010'}`,
                        color:i===rs.choiceStep?amber:i<rs.choiceStep?amberDim:'#604020'}}>
                        {i<rs.choiceStep?'✓ '+stepLabels[i].split(' ').slice(1).join(' '):stepLabels[i]}
                      </div>
                    ))}
                  </div>
                  {/* Current step choices */}
                  {rs.choiceStep<3&&(
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {stepChoices[rs.choiceStep].map(cid=>(
                        <button key={cid} style={{...C.btn(amberDim),textAlign:"left",padding:"8px 12px",fontSize:12}}
                          onClick={()=>makeRecordingChoice(cid)}>
                          {choiceLabels[cid]||cid}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* TAKE RESULT PHASE */}
              {rs.phase==='take_result'&&(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{fontSize:11,color:amberDim,letterSpacing:1}}>TAKE {rs.takeNum} RESULT</div>
                    <div style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:"bold",
                      background:`${qualBadge[rs.lastTakeQuality]||'#808080'}20`,
                      border:`1px solid ${qualBadge[rs.lastTakeQuality]||'#808080'}`,
                      color:qualBadge[rs.lastTakeQuality]||'#808080'}}>
                      {(rs.lastTakeQuality||'').toUpperCase()}
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {rs.lastTakeText||''}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{...C.btn(amber),flex:1}} onClick={wrapRecordingSession}>
                      ✓ Wrap it
                    </button>
                    {rs.timeLeft>0&&(
                      <button style={{...C.btn(amberDim),flex:1}} onClick={oneMoreTake}>
                        🔄 One more take ({rs.timeLeft} left)
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* DONE PHASE */}
              {rs.phase==='done'&&(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{fontSize:11,color:amberDim,letterSpacing:1}}>SESSION WRAPPED</div>
                    <div style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:"bold",
                      background:`${qualBadge[rs.bestClip]||'#808080'}20`,
                      border:`1px solid ${qualBadge[rs.bestClip]||'#808080'}`,
                      color:qualBadge[rs.bestClip]||'#808080'}}>
                      {(rs.bestClip||'').toUpperCase()} CLIP
                    </div>
                    {rs.perfectTakeAchieved&&<div style={{padding:"2px 8px",borderRadius:4,fontSize:10,color:"#c0a020",border:"1px solid #c0a020"}}>✨ PERFECT TAKE</div>}
                  </div>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {rs.endingText||''}
                  </div>
                  <button style={{...C.btn(amber),width:"100%"}} onClick={closeRecordingSession}>
                    Close ✓
                  </button>
                </>
              )}

              {/* POPUP OVERLAY — direction choice result */}
              {rs.popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#100800",border:`1px solid ${amber}50`,borderRadius:10,padding:20,maxWidth:440,margin:16}}>
                    <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{rs.popupText}</div>
                    <button style={{...C.btn(amber),width:"100%"}} onClick={dismissRecordingChoicePopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
}
