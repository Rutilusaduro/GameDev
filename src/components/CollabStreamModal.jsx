// ═══════════════════════════════════════════════════════════════
// COLLAB STREAM — Mini-game modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';

export function CollabStreamModal({ collabStreamState, students, doCollabAction, closeCollabStream, dismissCollabPopup }){
        const{kylieId,partnerId,stageIdx,qualityBar,kylieGain,partnerGain,foodQueue,chatLines,phase,popupText,actions}=collabStreamState;
        const kylie=students.find(st=>st.id===kylieId);
        const partner=students.find(st=>st.id===partnerId);
        if(!kylie||!partner) return null;
        const purple="#8e44ad";
        const lightPurple="#c490e8";
        const STREAM_TITLE_LABELS=["First Collab","Weekly Collab","Featured Collab","Brand Collab","Anniversary Collab","The Grand Collab"];
        const streamTitle=STREAM_TITLE_LABELS[stageIdx]||"Collab Stream";
        const qualColor=qualityBar>60?"#60e080":qualityBar>30?"#e0c040":"#e04040";

        return(
          <div style={{position:"fixed",inset:0,background:"rgba(5,0,15,0.94)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0a0016",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:520,width:"95%",maxHeight:"92vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:2,textAlign:"center"}}>🎥 COLLAB STREAM</div>
              <div style={{fontSize:14,fontWeight:"bold",color:lightPurple,marginBottom:2,textAlign:"center"}}>{kylie.name} × {partner.name}</div>
              <div style={{fontSize:10,color:"#9060b0",marginBottom:12,textAlign:"center"}}>{streamTitle}</div>

              {phase==='streaming'&&(<>
                {/* Quality bar */}
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#c0a0e0",marginBottom:3}}>
                    <span>📺 CONTENT QUALITY</span>
                    <span style={{color:qualColor,fontWeight:"bold"}}>{Math.round(qualityBar)}/100</span>
                  </div>
                  <div style={{background:"#15002a",borderRadius:4,height:12}}>
                    <div style={{background:`linear-gradient(90deg,${qualityBar>60?"#2a8040,#60e080":qualityBar>30?"#805020,#e0c040":"#802020,#e04040"})`,width:`${Math.max(0,qualityBar)}%`,height:"100%",borderRadius:4,transition:"width 0.3s"}}/>
                  </div>
                  {qualityBar<=25&&<div style={{fontSize:9,color:"#e04040",textAlign:"center",marginTop:2}}>⚠️ Low quality — feed them to keep the stream alive!</div>}
                </div>

                {/* Weights */}
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1,background:"#0d001f",border:`1px solid ${purple}40`,borderRadius:6,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#a080c0",letterSpacing:1}}>KYLIE</div>
                    <div style={{fontSize:14,color:lightPurple,fontWeight:"bold"}}>{Math.round(kylie.lbs)} lbs</div>
                    <div style={{fontSize:9,color:"#7050a0"}}>+{Math.round(kylieGain)} this stream</div>
                  </div>
                  <div style={{flex:1,background:"#0d001f",border:`1px solid ${purple}40`,borderRadius:6,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#a080c0",letterSpacing:1}}>{partner.name.toUpperCase()}</div>
                    <div style={{fontSize:14,color:lightPurple,fontWeight:"bold"}}>{Math.round(partner.lbs)} lbs</div>
                    <div style={{fontSize:9,color:"#7050a0"}}>+{Math.round(partnerGain)} this stream</div>
                  </div>
                </div>

                {/* Food queue */}
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:9,color:"#a070c0",marginBottom:5,letterSpacing:2}}>FOOD ON TABLE</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                    {foodQueue.filter(f=>!f.consumed).map((food)=>{
                      const unlocked=food.tierUnlocked;
                      return(
                        <div key={food.key} style={{opacity:unlocked?1:0.35}}>
                          {unlocked?(
                            <div style={{display:"flex",gap:4,marginBottom:2}}>
                              <button style={{...C.btn("#3a0a60"),flex:1,fontSize:10,padding:"4px 6px"}} onClick={()=>doCollabAction('feed_kylie',food.key)}>
                                {food.emoji} → Kylie +{food.lbsKylie}
                              </button>
                              <button style={{...C.btn("#1a1a60"),flex:1,fontSize:10,padding:"4px 6px"}} onClick={()=>doCollabAction('feed_partner',food.key)}>
                                {food.emoji} → {partner.name.split(' ')[0]} +{food.lbsPartner}
                              </button>
                            </div>
                          ):(
                            <div style={{background:"#0a0018",border:"1px solid #30104050",borderRadius:4,padding:"4px 6px",fontSize:10,color:"#503060",textAlign:"center"}}>
                              🔒 {food.name} — unlocks after current tier
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {foodQueue.every(f=>f.consumed)&&<div style={{gridColumn:"1/-1",color:"#60a060",textAlign:"center",fontSize:10,padding:8}}>✓ All food eaten — stream complete!</div>}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:9,color:"#a070c0",marginBottom:5,letterSpacing:2}}>STREAM ACTIONS</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    <button style={{...C.btn(actions.kylieRevealed?"#1a0030":"#4a1070"),fontSize:10,opacity:actions.kylieRevealed?0.5:1}} disabled={actions.kylieRevealed} onClick={()=>doCollabAction('reveal_kylie')}>⚖️ Kylie's Weight {actions.kylieRevealed?"✓":""}</button>
                    <button style={{...C.btn(actions.partnerRevealed?"#1a0030":"#1a1060"),fontSize:10,opacity:actions.partnerRevealed?0.5:1}} disabled={actions.partnerRevealed} onClick={()=>doCollabAction('reveal_partner')}>⚖️ {partner.name.split(' ')[0]}'s Weight {actions.partnerRevealed?"✓":""}</button>
                    <button style={{...C.btn(actions.zoomUses<=0?"#1a0030":"#2a0850"),fontSize:10,opacity:actions.zoomUses<=0?0.5:1}} disabled={actions.zoomUses<=0} onClick={()=>doCollabAction('zoom_in')}>📸 Zoom In ({actions.zoomUses})</button>
                    <button style={{...C.btn(actions.chatUses<=0?"#1a0030":"#2a0850"),fontSize:10,opacity:actions.chatUses<=0?0.5:1}} disabled={actions.chatUses<=0} onClick={()=>doCollabAction('chat_moment')}>💬 Chat Moment ({actions.chatUses})</button>
                    <button style={{...C.btn(actions.pushUsed?"#1a0030":"#501060"),fontSize:10,opacity:actions.pushUsed?0.5:1,gridColumn:"1/-1"}} disabled={actions.pushUsed} onClick={()=>doCollabAction('push_harder')}>🔥 Push Harder {actions.pushUsed?"(done)":""}</button>
                  </div>
                </div>

                {/* Chat window */}
                {chatLines.length>0&&(
                  <div style={{background:"#080014",border:`1px solid ${purple}30`,borderRadius:6,padding:8,marginBottom:10,maxHeight:55,overflowY:"auto"}}>
                    {chatLines.map((l,i)=><div key={i} style={{fontSize:9,color:"#b090d0",marginBottom:1}}>💬 {l}</div>)}
                  </div>
                )}

                <button style={{...C.btn("#150025"),width:"100%",fontSize:10}} onClick={closeCollabStream}>End Stream Early</button>
              </>)}

              {phase==='scoreboard'&&(<>
                <div style={{background:"#08001a",border:`1px solid ${purple}40`,borderRadius:8,padding:12,marginBottom:14,fontSize:12}}>
                  <div style={{color:lightPurple,fontWeight:"bold",marginBottom:8,letterSpacing:2,fontSize:10}}>STREAM RESULTS</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>Content Quality</span>
                    <span style={{color:qualColor,fontWeight:"bold"}}>{Math.round(qualityBar)}/100</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>Kylie gained</span>
                    <span style={{color:"#e060c0",fontWeight:"bold"}}>+{Math.round(kylieGain)} lbs</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>{partner.name} gained</span>
                    <span style={{color:"#e060c0",fontWeight:"bold"}}>+{Math.round(partnerGain)} lbs</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:"#c0a0e0"}}>Tiers completed</span>
                    <span style={{color:"#60e080"}}>{foodQueue.filter(f=>f.consumed).length}/{foodQueue.length}</span>
                  </div>
                </div>
                <button style={{...C.btn(purple),width:"100%"}} onClick={closeCollabStream}>Close Stream ✓</button>
              </>)}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#0c0018",border:`1px solid ${purple}50`,borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#d0a8e8",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{popupText}</div>
                    <button style={{...C.btn(purple),width:"100%"}} onClick={dismissCollabPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
}
