// ═══════════════════════════════════════════════════════════════
// SUMO MATCH — Mini-game modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { SUMO_MOVES, SUMO_RIVAL_NAME, SUMO_CORNER_FEED, SUMO_MATCH_AFTERMATH, SUMO_PAYOFF_TEXT } from '../gameData/miniGames.js';
import { getStage } from '../gameData/stages.js';

export function SumoMatchModal({ sumoMatchState, students, sumoPlayMove, sumoCornerFeed, sumoStartNextBout, setSumoMatchState, closeSumoMatch, dismissSumoPopup }){
        const{studentId,stageIdx,oppLbs,ringPos,yourBalance,oppBalance,yourBouts,oppBouts,gainAccum,telegraph,exchangeLine,phase,popupText,fillRingUsed}=sumoMatchState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const won=yourBouts>oppBouts;
        const markerPct=Math.max(0,Math.min(100,(ringPos+100)/2));
        const feed=SUMO_CORNER_FEED[stageIdx]||SUMO_CORNER_FEED[0];
        const isBlob=getStage(s.lbs).id>=10;
        const payoffText=SUMO_PAYOFF_TEXT[stageIdx]?.(gainAccum)||`${Math.round(gainAccum)} pounds added to your frame since you stepped onto the dohyo. You can feel it. More.`;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:620,background:"linear-gradient(160deg,#140404,#1f0808,#140404)",border:"1px solid #80303050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#d05040",marginBottom:4}}>THE DOHYO — vs {SUMO_RIVAL_NAME.toUpperCase()}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#ff8060",marginBottom:12}}>{s.name}</div>

              {/* MATCH PHASE */}
              {phase==='match'&&(<>
                {/* Bout counter */}
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:10}}>
                  <span style={{color:"#ff9070"}}>You {Math.round(s.lbs)} lbs · Bouts: {yourBouts}</span>
                  <span style={{color:"#a07060"}}>Bouts: {oppBouts} · Dana {oppLbs} lbs</span>
                </div>
                {/* Ring position bar */}
                <div style={{fontSize:9,color:"#c06050",letterSpacing:2,marginBottom:3,textAlign:"center"}}>RING POSITION</div>
                <div style={{position:"relative",height:14,background:"linear-gradient(90deg,#5a1810,#2a1208,#102a10)",borderRadius:7,marginBottom:4,border:"1px solid #40201840"}}>
                  <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#80604040"}}/>
                  <div style={{position:"absolute",left:`calc(${markerPct}% - 7px)`,top:-2,width:14,height:18,background:ringPos>=0?"#40c060":"#e05030",borderRadius:4,transition:"left 0.35s",boxShadow:"0 0 6px rgba(0,0,0,0.6)"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:"#705048",marginBottom:12}}>
                  <span>◄ your edge</span><span>her edge ►</span>
                </div>
                {/* Balance bars */}
                <div style={{display:"flex",gap:12,marginBottom:12}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:"#d07060",letterSpacing:1,marginBottom:3}}>YOUR BALANCE {yourBalance}</div>
                    <div style={{height:6,background:"#1a0a0a",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${yourBalance}%`,background:yourBalance<25?"#e03020":yourBalance<50?"#c0a020":"#40b050",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:"#906058",letterSpacing:1,marginBottom:3}}>DANA'S BALANCE {oppBalance}</div>
                    <div style={{height:6,background:"#1a0a0a",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${oppBalance}%`,background:"#806058",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                </div>
                {/* Exchange commentary */}
                <div style={{fontSize:12,color:"#e0b0a0",lineHeight:1.8,marginBottom:10,fontStyle:"italic"}}>{exchangeLine}</div>
                {/* Telegraph */}
                <div style={{...C.infoBox("rgba(90,20,10,0.3)"),fontSize:11,color:"#ffb090",marginBottom:12,border:"1px solid #80303040"}}>
                  ⚠️ {telegraph}
                </div>
                {/* Move buttons */}
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {SUMO_MOVES.filter(mv=>!mv.blobOnly).map(mv=>{
                    const lowBal=yourBalance<=0&&mv.id!=='brace';
                    return(
                      <button key={mv.id}
                        style={{...C.btn(lowBal?"#2a1410":"#5a1c14"),textAlign:"left",padding:"8px 12px",fontSize:12,lineHeight:1.4,opacity:lowBal?0.55:1}}
                        onClick={()=>sumoPlayMove(mv.id)}>
                        <span style={{fontSize:15,marginRight:6}}>{mv.emoji}</span>
                        <span style={{fontWeight:700,color:"#ffc0a0"}}>{mv.label}</span>
                        {lowBal&&<span style={{color:"#ff6040",marginLeft:8,fontSize:9}}>off balance — you'll stumble</span>}
                        <div style={{fontSize:10,color:"#b08070",marginTop:2,fontStyle:"italic"}}>{mv.desc}</div>
                      </button>
                    );
                  })}
                  {isBlob&&(()=>{const mv=SUMO_MOVES.find(m=>m.id==='fill_ring'); return mv?(
                    <button key="fill_ring"
                      style={{...C.btn(fillRingUsed?"#1a0808":"#6a2800"),textAlign:"left",padding:"8px 12px",fontSize:12,lineHeight:1.4,opacity:fillRingUsed?0.4:1,border:fillRingUsed?"none":"1px solid #e0801080"}}
                      disabled={fillRingUsed}
                      onClick={()=>sumoPlayMove('fill_ring')}>
                      <span style={{fontSize:15,marginRight:6}}>{mv.emoji}</span>
                      <span style={{fontWeight:700,color:fillRingUsed?"#806050":"#ffb060"}}>{mv.label}{fillRingUsed?" (used)":""}</span>
                      <div style={{fontSize:10,color:"#c09060",marginTop:2,fontStyle:"italic"}}>{mv.desc}</div>
                    </button>
                  ):null;})()}
                </div>
              </>)}

              {/* INTER-BOUT PHASE — corner feed */}
              {phase==='interbout'&&(<>
                <div style={{fontSize:11,color:"#c08070",marginBottom:8,textAlign:"center"}}>Bouts: You {yourBouts} — {oppBouts} Dana · first to 2 wins the match</div>
                <div style={{fontSize:12,color:"#e0b0a0",lineHeight:1.85,marginBottom:14,fontStyle:"italic"}}>
                  Your corner is set up between bouts. The chanko is hot and waiting. Every pound you add now is a pound Dana has to move in the next bout — and getting heavier is the whole strategy.
                </div>
                <button style={{...C.btn("#7a3010"),width:"100%",marginBottom:8}} onClick={sumoCornerFeed}>
                  🍲 Fuel in Your Corner <span style={{color:"#ffd080",fontSize:11}}>+{feed.lbs} lbs · restores balance</span>
                </button>
                <button style={{...C.btn("#3a1810"),width:"100%"}} onClick={sumoStartNextBout}>
                  Skip — straight back to center
                </button>
              </>)}

              {/* AFTERMATH PHASE */}
              {phase==='aftermath'&&(<>
                <div style={{fontSize:12,color:"#e0b8a8",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>
                  {SUMO_MATCH_AFTERMATH[stageIdx]?.(s,gainAccum,won,oppLbs)||''}
                </div>
                <button style={{...C.btn("#7a2018"),width:"100%"}} onClick={()=>setSumoMatchState(prev=>({...prev,phase:'scoreboard'}))}>
                  📊 See the Result
                </button>
              </>)}

              {/* SCOREBOARD PHASE */}
              {phase==='scoreboard'&&(<>
                <div style={{background:"#1a0808",border:"1px solid #80303040",borderRadius:6,padding:14,marginBottom:12,fontFamily:"monospace"}}>
                  <div style={{fontSize:10,color:"#d05040",letterSpacing:3,marginBottom:8}}>MATCH RESULT</div>
                  <div style={{fontSize:14,color:won?"#ff9060":"#a07060",marginBottom:4,display:"flex",justifyContent:"space-between"}}>
                    <span>You — {yourBouts} bouts</span>
                    {won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                  </div>
                  <div style={{fontSize:14,color:!won?"#ff9060":"#806058",display:"flex",justifyContent:"space-between"}}>
                    <span>Dana — {oppBouts} bouts</span>
                    {!won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                  </div>
                  <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #80303040",fontSize:10,color:"#c07050"}}>
                    Gained in the corner today: +{Math.round(gainAccum)} lbs · Your weight: {Math.round(s.lbs)} lbs
                  </div>
                </div>
                <div style={{fontSize:12,color:"#e0c0b0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>{payoffText}</div>
                <button style={{...C.btn("#5a1c14"),width:"100%"}} onClick={closeSumoMatch}>Close</button>
              </>)}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#160606",border:"1px solid #80303050",borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#e8b8a8",lineHeight:1.9,fontStyle:"italic",marginBottom:14}}>{popupText}</div>
                    <button style={{...C.btn("#5a1c14"),width:"100%"}} onClick={dismissSumoPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
}
