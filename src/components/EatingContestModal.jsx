// ═══════════════════════════════════════════════════════════════
// EATING CONTEST — Mini-game modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { CONTEST_MAYA_WEIGHTS, CONTEST_WEIGH_IN_2_TEXT, CONTEST_PAYOFF_TEXT } from '../gameData/miniGames.js';

export function EatingContestModal({ eatingContestState, students, toggleFoodSelection, eatContestFood, doContestAction, doDevour, setEatingContestState, closeEatingContest, dismissContestPopup }){
        const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,popupText,phase,pantsFactor,actions}=eatingContestState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const mayaLbs=CONTEST_MAYA_WEIGHTS[stageIdx]||330;
        const effectiveMax=maxYourFullness-pantsFactor;
        const yourPct=Math.min(100,Math.round((yourFullness/effectiveMax)*100));
        const mayaPct=Math.min(100,Math.round((mayaFullness/maxMayaFullness)*100));
        const won=yourGain>=mayaGain;
        const devourUnlocked=stageIdx>=3;
        const TITLE_LABELS=["Regional Open","Circuit Regular","Conference Championship","National Qualifier","National Championship Final","Grand Invitational"];
        const contestTitle=TITLE_LABELS[stageIdx]||"Competition";
        const selectedYourCount=(yourFoods||[]).filter(f=>f.selected&&!f.consumed).length;
        const selectedMayaCount=(mayaFoods||[]).filter(f=>f.selected&&!f.consumed).length;
        const selectedCount=selectedYourCount+selectedMayaCount;
        const payoffText=CONTEST_PAYOFF_TEXT[stageIdx]?.(yourGain)||`${Math.round(yourGain)} pounds added to your frame. You can feel it. You are heavier than when you walked in.`;
        const completions=s.contestCompletions||0;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:620,background:"linear-gradient(160deg,#030e04,#061a08,#030e04)",border:"1px solid #20803050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#30a050",marginBottom:4}}>{contestTitle.toUpperCase()} — COMPETITION</div>
              <div style={{fontSize:14,fontWeight:700,color:"#60dd80",marginBottom:4}}>{s.name}</div>
              {completions>0&&<div style={{fontSize:9,color:"#20804a",marginBottom:8,letterSpacing:1}}>VETERAN ×{completions+1} — capacity ×{(1+0.15*completions).toFixed(2)}</div>}

              {/* EATING PHASE */}
              {phase==='eating'&&(
                <>
                  {/* Fullness bars */}
                  <div style={{display:"flex",gap:12,marginBottom:12}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#50c060",letterSpacing:2,marginBottom:3}}>YOUR FULLNESS {yourFullness}/{effectiveMax}</div>
                      <div style={{height:8,background:"#0a1a0a",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${yourPct}%`,background:yourPct>85?"#e05020":yourPct>65?"#c0a020":"#30a050",transition:"width 0.3s"}}/>
                      </div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#508060",letterSpacing:2,marginBottom:3}}>MAYA FULLNESS {mayaFullness}/{maxMayaFullness}</div>
                      <div style={{height:8,background:"#0a1a0a",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${mayaPct}%`,background:"#607060",transition:"width 0.3s"}}/>
                      </div>
                    </div>
                  </div>

                  {devourUnlocked&&<div style={{fontSize:9,color:"#a0d060",letterSpacing:1,marginBottom:6,textAlign:"center"}}>DEVOUR MODE — tap food on either side to select, then Devour all at once. Match ends when all food is gone.</div>}

                  {/* Food tables */}
                  <div style={{display:"flex",gap:10,marginBottom:12}}>
                    {/* Your table */}
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#30a050",letterSpacing:2,marginBottom:6}}>YOUR TABLE</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {yourFoods.map((food,idx)=>{
                          const tooFull=stageIdx<3&&(yourFullness+(food.fullness||0)>effectiveMax);
                          const disabled=food.consumed||(stageIdx<3&&tooFull);
                          const isSelected=food.selected&&!food.consumed;
                          return(
                            <button key={food.key!==undefined?food.key:idx}
                              style={{...C.btn(food.consumed?"#0a1a0a":isSelected?"#1a4800":"#103520"),opacity:food.consumed?0.3:tooFull?0.5:1,textAlign:"left",padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,cursor:food.consumed?"not-allowed":"pointer",border:isSelected?"1px solid #a0e040":"1px solid transparent"}}
                              disabled={disabled}
                              onClick={()=>devourUnlocked?toggleFoodSelection('your',food.key):eatContestFood(idx)}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":isSelected?"#c0ff40":"#80d090"}}>{food.name||food.id}</span>
                              {isSelected&&<span style={{fontSize:9,color:"#a0e040",marginLeft:"auto"}}>✓</span>}
                              {!food.consumed&&!isSelected&&<span style={{fontSize:9,color:"#40804a",marginLeft:"auto"}}>+{food.lbs}lb</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Maya's table */}
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#508060",letterSpacing:2,marginBottom:6}}>MAYA'S TABLE ({mayaLbs} lbs)</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {mayaFoods.map((food,idx)=>{
                          const isSelected=food.selected&&!food.consumed;
                          return devourUnlocked?(
                            <button key={food.key!==undefined?food.key:100+idx}
                              style={{...C.btn(food.consumed?"#0a1a0a":isSelected?"#3a1800":"#0f1a0a"),opacity:food.consumed?0.3:1,textAlign:"left",padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,cursor:food.consumed?"not-allowed":"pointer",border:isSelected?"1px solid #e07040":"1px solid transparent"}}
                              disabled={food.consumed}
                              onClick={()=>toggleFoodSelection('maya',food.key)}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":isSelected?"#ffa060":"#608070"}}>{food.name||food.id}</span>
                              {isSelected&&<span style={{fontSize:9,color:"#e07040",marginLeft:"auto"}}>✓</span>}
                              {!food.consumed&&!isSelected&&<span style={{fontSize:9,color:"#407050",marginLeft:"auto"}}>+{food.lbs}lb</span>}
                            </button>
                          ):(
                            <div key={food.key!==undefined?food.key:100+idx}
                              style={{padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,opacity:food.consumed?0.3:1,background:"#050f06",borderRadius:4,border:"1px solid #0a1a0a"}}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":"#608070"}}>{food.name||food.id}</span>
                              {food.consumed&&<span style={{fontSize:9,color:"#305030",marginLeft:"auto"}}>eaten</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Lbs gained tracker */}
                  <div style={{fontSize:10,color:"#40a060",marginBottom:10,textAlign:"center"}}>
                    You: +{Math.round(yourGain)} lbs this contest · Maya: +{Math.round(mayaGain)} lbs
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                    <button style={{...C.btn(actions.unbuttoned?"#0a1a0a":"#1a4030"),fontSize:11,padding:"6px 10px",opacity:actions.unbuttoned?0.4:1}} disabled={actions.unbuttoned} onClick={()=>doContestAction('unbutton')}>
                      👖 Unbutton Pants{actions.unbuttoned?" ✓":""}
                    </button>
                    <button style={{...C.btn(actions.rubUses>=3?"#0a1a0a":"#1a3020"),fontSize:11,padding:"6px 10px",opacity:actions.rubUses>=3?0.4:1}} disabled={actions.rubUses>=3} onClick={()=>doContestAction('rub')}>
                      ✋ Rub Belly ({3-actions.rubUses} left)
                    </button>
                    <button style={{...C.btn(actions.taunted?"#0a1a0a":"#1a2a10"),fontSize:11,padding:"6px 10px",opacity:actions.taunted?0.4:1}} disabled={actions.taunted} onClick={()=>doContestAction('taunt')}>
                      😏 Taunt Maya{actions.taunted?" ✓":""}
                    </button>
                    {devourUnlocked&&(
                      <button style={{...C.btn(selectedCount>0?"#2a4800":"#1a2a08"),fontSize:12,padding:"6px 14px",fontWeight:700,color:selectedCount>0?"#c0ff40":"#507030",opacity:selectedCount>0?1:0.5,border:selectedCount>0?"1px solid #80c020":"none"}} disabled={selectedCount===0} onClick={doDevour}>
                        🍽️ DEVOUR{selectedCount>0?` (${selectedCount})`:""}
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* WEIGH-IN 2 PHASE */}
              {phase==='weigh_in_2'&&(
                <>
                  <div style={{fontSize:12,color:"#80c090",lineHeight:1.9,marginBottom:16,fontStyle:"italic",whiteSpace:"pre-line"}}>
                    {CONTEST_WEIGH_IN_2_TEXT[stageIdx]?.(s,yourGain,mayaGain,mayaLbs)||''}
                  </div>
                  <button style={{...C.btn("#1a5030"),width:"100%"}} onClick={()=>setEatingContestState(prev=>({...prev,phase:'scoreboard'}))}>
                    📊 See the Results
                  </button>
                </>
              )}

              {/* SCOREBOARD PHASE */}
              {phase==='scoreboard'&&(
                <>
                  <div style={{background:"#0a1a0a",border:"1px solid #20602040",borderRadius:6,padding:14,marginBottom:12,fontFamily:"monospace"}}>
                    <div style={{fontSize:10,color:"#30a050",letterSpacing:3,marginBottom:8}}>FINAL RESULTS</div>
                    <div style={{fontSize:13,color:won?"#60dd80":"#80c090",marginBottom:4,display:"flex",justifyContent:"space-between"}}>
                      <span>You: +{Math.round(yourGain)} lbs</span>
                      {won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                    </div>
                    <div style={{fontSize:13,color:!won?"#60dd80":"#608070",display:"flex",justifyContent:"space-between"}}>
                      <span>Maya: +{Math.round(mayaGain)} lbs</span>
                      {!won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                    </div>
                    <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #20602040",fontSize:10,color:"#408050"}}>
                      Your final weight: {Math.round(s.lbs)} lbs · Maya: {Math.round(mayaLbs+mayaGain)} lbs
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#c0d8b0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>
                    {payoffText}
                  </div>
                  <button style={{...C.btn("#1a4020"),width:"100%"}} onClick={closeEatingContest}>
                    Close
                  </button>
                </>
              )}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#05120a",border:"1px solid #30804050",borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#b0d8a0",lineHeight:1.9,fontStyle:"italic",marginBottom:14}}>{popupText}</div>
                    <button style={{...C.btn("#1a4030"),width:"100%"}} onClick={dismissContestPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
}
