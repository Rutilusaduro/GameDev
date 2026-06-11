import { C } from '../styles.js';
import { ENCOURAGEMENT_ACTIONS, PRIVATE_FOODS, PRIVATE_VENUES, SESSION_FULLNESS_DESCS, getFullnessStage, getTier } from '../gameData/sessions.js';
import { MJ_RECIPES } from '../gameData/miniGames.js';
import { getStage } from '../gameData/stages.js';

export function PrivateSessionModal({ chooseSessionVenue, endPrivateSession, feedInSession, getMoreFood, privateSession, sessionLog, setAp, setPrivateSession, skillTapOutResistance, startIntimacyScene, useSessionEncouragement }){
        const ps=privateSession;
        const s=ps.student;
        const effectiveMax=ps.maxFullness+ps.toleranceBuffer;
        const fPct=ps.fullness>0?Math.round((ps.fullness/effectiveMax)*100):0;
        const fsStage=getFullnessStage(fPct);
        const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
        const currentDesc=ps.fullness>0?descFns[Math.min(fsStage.id,descFns.length-1)](s):null;
        const courseOrder=["opener","main","more","dessert","extra"];
        const tier=getTier(s.relationship);
        const availableVenueList=PRIVATE_VENUES.filter(v=>tier.id>=v.minTier);
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640,padding:20}}>

              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:3}}>PRIVATE SESSION #{ps.sessionNum}</div>
                  <div style={{fontSize:16,fontWeight:700,color:"#d8a8ff"}}>{s.name}</div>
                  <div style={{fontSize:10,color:"#6a4880"}}>{s.lbs} lbs · {getStage(s.lbs).label} · {tier.emoji} {tier.label}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#806090",marginBottom:2}}>{ps.totalGain.toLocaleString()} cal this session</div>
                  <div style={{fontSize:10,color:"#504060"}}>Capacity: {effectiveMax} ({ps.toleranceBuffer>0?`+${ps.toleranceBuffer} buffer`:"base"})</div>
                </div>
              </div>

              {/* Venue selection */}
              {ps.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#7060a0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {s.name} tonight?
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                    {availableVenueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer"}} onClick={()=>chooseSessionVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4870"}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button style={C.btn("#444")} onClick={()=>setPrivateSession(null)}>Cancel</button>
                </div>
              )}

              {/* Feeding phase */}
              {ps.phase==="feeding"&&(
                <div>
                  {/* Fullness bar */}
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:700,color:fsStage.color}}>{fsStage.label}</span>
                      <span style={{fontSize:11,color:fPct>=100?"#e04040":"#a080c0"}}>{fPct}% full</span>
                    </div>
                    <div style={{position:"relative",height:10,background:"rgba(255,255,255,0.07)",borderRadius:5,overflow:"hidden"}}>
                      <div style={{
                        position:"absolute",left:0,top:0,height:"100%",borderRadius:5,
                        background:`linear-gradient(90deg,#30a060,${fsStage.color})`,
                        width:`${Math.min(100,fPct)}%`,transition:"width 0.5s ease"
                      }}/>
                      {fPct>100&&(
                        <div style={{position:"absolute",left:`${Math.min(100,fPct-100)/2}%`,top:0,height:"100%",width:`${Math.min(50,fPct-100)/2}%`,background:"rgba(200,20,20,0.5)"}}/>
                      )}
                    </div>
                    {currentDesc&&(
                      <div style={{fontSize:12,color:"#c0a8d0",fontStyle:"italic",marginTop:6,lineHeight:1.65}}>
                        {currentDesc}
                      </div>
                    )}
                  </div>

                  {/* Food menu */}
                  <div style={{...C.secT,marginBottom:6}}>Food</div>
                  <div style={{maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:3,marginBottom:10}}>
                    {courseOrder.map(course=>{
                      const items=PRIVATE_FOODS.filter(f=>f.course===course);
                      const courseLabel={opener:"Starters",main:"Main Course",more:"Second Helpings",dessert:"Dessert",extra:"More"}[course];
                      return(
                        <div key={course}>
                          <div style={{fontSize:9,color:"#4a2060",letterSpacing:2,padding:"4px 0 2px",borderTop:"1px solid rgba(80,18,140,0.15)"}}>{courseLabel.toUpperCase()}</div>
                          <div style={{display:"flex",flexDirection:"column",gap:2}}>
                            {items.map(food=>{
                              const ordered=ps.foods.includes(food.id);
                              return(
                                <div key={food.id}
                                  style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:5,
                                    background:ordered?"rgba(80,18,140,0.08)":"transparent",
                                    cursor:ordered?"default":"pointer",opacity:ordered?0.45:1}}
                                  onClick={()=>!ordered&&feedInSession(food)}>
                                  <span style={{flex:1,fontSize:12,color:ordered?"#5a3888":"#c8a8f0"}}>{ordered?"✓ ":""}{food.label}</span>
                                  <span style={{fontSize:10,color:"#8060a0"}}>+{food.gain[0]}–{food.gain[1]} lbs</span>
                                  {!ordered&&<div style={{fontSize:9,color:"#6a4880",maxWidth:140,textAlign:"right"}}>{food.desc.slice(0,45)}…</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Grandma Mae's Recipes — farm_girl only */}
                  {s.archetype==='farm_girl'&&(s.mjRecipes||[]).length>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{...C.secT,marginBottom:6}}>🏡 Grandma Mae's Recipes</div>
                      <div style={{display:"flex",flexDirection:"column",gap:2}}>
                        {(s.mjRecipes||[]).map(recipeId=>{
                          const r=MJ_RECIPES[recipeId];
                          if(!r) return null;
                          const fobj={id:'mj_'+recipeId, label:r.emoji+' '+r.name, gain:[r.lbs-2,r.lbs+2], fullness:r.fullness, desc:"Grandma Mae's recipe. Rich, homemade, the real thing."};
                          const ordered=ps.foods.includes(fobj.id);
                          return(
                            <div key={recipeId}
                              style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:5,
                                background:ordered?"rgba(140,60,18,0.08)":"transparent",
                                cursor:ordered?"default":"pointer",opacity:ordered?0.45:1}}
                              onClick={()=>!ordered&&feedInSession(fobj)}>
                              <span style={{flex:1,fontSize:12,color:ordered?"#8a5a30":"#d4a070"}}>{ordered?"✓ ":""}{fobj.label}</span>
                              <span style={{fontSize:10,color:"#9a7040"}}>+{r.lbs-2}–{r.lbs+2} lbs</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Session log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:150,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {sessionLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{s.name} settles in. The evening begins.</div>
                      :sessionLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,lineHeight:1.6,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍽️")?"#d0a860":line.startsWith("   ")?"#c0a8d0":"#b090c8",borderBottom:i<sessionLog.length-1?"1px solid rgba(80,20,120,0.1)":"none",paddingBottom:i<sessionLog.length-1?3:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  {/* Encouragement */}
                  <div style={{...C.secT,marginBottom:6}}>Encouragement</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {ENCOURAGEMENT_ACTIONS.map(enc=>{
                      const used=ps.encouragementsUsed.includes(enc.id);
                      return(
                        <button key={enc.id}
                          style={{...C.smBtn,opacity:used?0.35:1,textDecoration:used?"line-through":"none",
                            background:used?"rgba(40,10,60,0.2)":"rgba(80,18,140,0.35)"}}
                          onClick={()=>!used&&useSessionEncouragement(enc)}>
                          {enc.label}
                        </button>
                      );
                    })}
                  </div>


                  {/* Normal footer — always accessible */}
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:fPct>=100?"#f07050":"#f0a060",fontWeight:700,flex:1}}>
                      {fPct>=200?"Well past limits 🔴"
                      :fPct>=155?"Absolutely packed 🔴"
                      :fPct>=120?"Overfull 🔴"
                      :fPct>=95?"Stuffed 🟠"
                      :fPct>=70?"Full 🟡"
                      :fPct>=40?"Getting warm 🟢"
                      :"Still hungry 🟢"}
                      {fPct>=150&&<span style={{fontSize:9,color:"#ff7050",marginLeft:6}}>
                        {fPct>=250?"WILL tap out":"tap-out risk"}
                        {skillTapOutResistance>0?` (−${Math.round(skillTapOutResistance*100)}% from skills)`:""}
                      </span>}
                    </div>
                    {ps.foods.length>0&&(ps.refillRound||0)<3&&(
                      <button style={{...C.btn("#304060"),fontSize:10}} onClick={getMoreFood}>🛒 Get More</button>
                    )}
                    {fPct>=80&&getTier(s.relationship).id>=2&&(
                      <button style={{...C.btn("#601080"),fontSize:10}} onClick={()=>{setPrivateSession(null);startIntimacyScene(s,"session_high_fullness");}}>💜 Get Close</button>
                    )}
                    <button style={C.btn("#2a6830")} onClick={endPrivateSession}>End Session ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setPrivateSession(null);}}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
}
