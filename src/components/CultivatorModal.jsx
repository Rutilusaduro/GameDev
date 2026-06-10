// ═══════════════════════════════════════════════════════════════
// CULTIVATOR — Reneé taste-tester / harvest modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { RECRUITMENT_SCENE, RECIPES, getDigestVignette } from '../gameData/cultivator.js';
import { getStage } from '../gameData/stages.js';

export function CultivatorModal({ cultivatorState, students, setCultivatorState, confirmCultivatorRecruit, pickCultivatorFood, makeCultivatorChoice, confirmCultivatorSession, dismissCultivatorStageUp, confirmCultivatorHarvest, closeCultivatorGrowth }){
        const cs=cultivatorState;
        const brown="#8B4513"; const amber="#CD853F";
        const renee=students.find(s=>s.id===10);
        const wrap=(children)=>(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:500,background:"linear-gradient(160deg,#0a0400,#1a0800,#0a0400)",border:`1px solid ${brown}60`,maxHeight:"88vh",overflowY:"auto"}}>
              {children}
            </div>
          </div>
        );

        // ── RECRUIT SETUP ──
        if(cs.modalPhase==='recruit_setup') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 CULTIVATOR</div>
          <div style={{fontSize:14,fontWeight:700,color:amber,marginBottom:10}}>Select a Subject</div>
          <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:14,fontStyle:"italic"}}>{RECRUITMENT_SCENE}</div>
          <div style={{fontSize:11,color:"#8a5030",marginBottom:16}}>A candidate will be selected from your contact list. She will believe she is a paid taste tester. This is technically accurate. Cycle {cs.harvestsCompleted+1} of 4.</div>
          <div style={{display:"flex",gap:8}}>
            <button style={C.btn("#333")} onClick={()=>setCultivatorState(prev=>({...prev,modalPhase:null}))}>Cancel</button>
            <button style={{...C.btn(brown),flex:1}} onClick={confirmCultivatorRecruit}>Recruit Subject →</button>
          </div>
        </>);

        // ── SESSION ──
        if(cs.modalPhase==='session'&&cs.session){
          const{session}=cs;
          // Food picker
          if(!session.foodType) return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 TASTE-TEST SESSION</div>
            <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:6}}>Subject: {cs.testerName}</div>
            <div style={{fontSize:11,color:"#8a6030",marginBottom:14}}>{getStage(cs.testerLbs).label} · {Math.round(cs.testerLbs)} lbs</div>
            <div style={{fontSize:12,color:"#b08050",marginBottom:10,fontStyle:"italic"}}>What's on the menu today?</div>
            {Object.entries(RECIPES).map(([key,r])=>(
              <button key={key} style={{...C.btn("#2a0e04"),width:"100%",marginBottom:8,textAlign:"left",padding:"10px 14px"}} onClick={()=>pickCultivatorFood(key)}>
                <span style={{fontSize:16,marginRight:8}}>{r.icon}</span>
                <span style={{color:amber,fontWeight:700}}>{r.label}</span>
                <span style={{color:"#7a5030",fontSize:10,marginLeft:8}}>{r.junctions.length} decisions</span>
              </button>
            ))}
            <button style={{...C.btn("#333"),width:"100%",marginTop:4,fontSize:11}} onClick={()=>setCultivatorState(prev=>({...prev,modalPhase:null,session:null}))}>Cancel session</button>
          </>);
          // Junction phase
          if(!session.complete){
            const recipe=RECIPES[session.foodType];
            const junction=recipe?.junctions[session.junctionIdx];
            if(!junction) return null;
            const recipeIcon=recipe.icon;
            return wrap(<>
              <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>{recipeIcon} {recipe.label.toUpperCase()} — Decision {session.junctionIdx+1}/{recipe.junctions.length}</div>
              <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:4}}>{cs.testerName}</div>
              <div style={{fontSize:11,color:"#8a6030",marginBottom:10,fontStyle:"italic"}}>{session.junctionIdx===0?recipe.intro(cs.testerName):session.log[session.log.length-1]}</div>
              <div style={{fontSize:12,color:"#b08050",marginBottom:12,fontWeight:600}}>{junction.prompt}</div>
              {junction.choices.map(ch=>(
                <button key={ch.id} style={{...C.btn("#2a0e04"),width:"100%",marginBottom:8,textAlign:"left",padding:"10px 14px"}} onClick={()=>makeCultivatorChoice(ch)}>
                  <div style={{color:amber,fontWeight:700,fontSize:12,marginBottom:3}}>{ch.label}</div>
                  <div style={{color:"#8a5030",fontSize:10,lineHeight:1.4}}>{ch.desc}</div>
                  <div style={{color:"#5a3020",fontSize:9,marginTop:4}}>
                    +{ch.fatGain} fat · {ch.suspChange>=0?"+":""}{ch.suspChange} suspicion
                  </div>
                </button>
              ))}
            </>);
          }
          // Session summary
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 SESSION COMPLETE</div>
            <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:8}}>{cs.testerName} — {getStage(cs.testerLbs).label}</div>
            <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:12,fontStyle:"italic"}}>{session.eatingReaction}</div>
            <div style={{background:"rgba(10,4,0,0.5)",borderRadius:7,padding:"8px 12px",marginBottom:14,fontSize:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:"#7a5030"}}>Cultivation gained</span><span style={{color:amber}}>+{session.sessionFatAccum}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:"#7a5030"}}>Suspicion change</span>
                <span style={{color:session.sessionSuspAccum>0?"#e05030":"#60a030"}}>
                  {session.sessionSuspAccum>=0?"+":""}{session.sessionSuspAccum}
                </span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"#7a5030"}}>Suspicion total</span>
                <span style={{color:cs.suspicion+session.sessionSuspAccum>150?"#e05030":"#9a6030"}}>{Math.max(0,cs.suspicion+session.sessionSuspAccum)}/200</span>
              </div>
            </div>
            <button style={{...C.btn(brown),width:"100%"}} onClick={()=>confirmCultivatorSession(renee)}>Conclude Session ✓</button>
          </>);
        }

        // ── STAGE UP ──
        if(cs.modalPhase==='stage_up') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 SUBJECT PROGRESS</div>
          <div style={{fontSize:14,fontWeight:700,color:amber,marginBottom:4}}>{cs.testerName}</div>
          <div style={{fontSize:11,color:"#a07040",marginBottom:10}}>Advanced to {getStage(cs.testerLbs).label} — {Math.round(cs.testerLbs)} lbs</div>
          <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:14,fontStyle:"italic"}}>{cs.stageUpText||''}</div>
          <div style={{fontSize:10,color:"#5a3020",marginBottom:14}}>Harvest is now available. Continuing will grow the subject further.</div>
          <button style={{...C.btn(brown),width:"100%"}} onClick={dismissCultivatorStageUp}>Continue →</button>
        </>);

        // ── PLANNED HARVEST ──
        if(cs.modalPhase==='harvest') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 HARVEST</div>
          <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:4}}>{cs.testerName} — {getStage(cs.testerLbs).label}</div>
          <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:12,fontStyle:"italic"}}>{cs.harvestVignetteText||''}</div>
          <div style={{background:"rgba(10,4,0,0.5)",borderRadius:7,padding:"8px 12px",marginBottom:14,fontSize:11,color:amber,textAlign:"center"}}>
            Yield: +{cs.growthGain} lbs to Reneé
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={C.btn("#333")} onClick={()=>setCultivatorState(prev=>({...prev,modalPhase:null,harvestType:null,harvestVignetteText:null}))}>Wait</button>
            <button style={{...C.btn(brown),flex:1}} onClick={()=>confirmCultivatorHarvest(renee)}>Complete Harvest →</button>
          </div>
        </>);

        // ── EMERGENCY HARVEST ──
        if(cs.modalPhase==='emergency') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:"#e05030",marginBottom:4}}>⚠️ EMERGENCY HARVEST</div>
          <div style={{fontSize:13,fontWeight:700,color:"#ff8060",marginBottom:4}}>{cs.testerName} — Suspicion maxed</div>
          <div style={{fontSize:12,color:"#c08060",lineHeight:1.85,marginBottom:12,fontStyle:"italic"}}>{cs.harvestVignetteText||''}</div>
          <div style={{background:"rgba(20,4,0,0.6)",borderRadius:7,padding:"8px 12px",marginBottom:14,fontSize:11,color:"#ff8060",textAlign:"center"}}>
            Yield: +{cs.growthGain} lbs to Reneé (same as planned)
          </div>
          <button style={{...C.btn("#8B2000"),width:"100%"}} onClick={()=>confirmCultivatorHarvest(renee)}>Proceed →</button>
        </>);

        // ── GROWTH VIGNETTE ──
        if(cs.modalPhase==='growth') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>🍰 RENEÉ</div>
          <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:10}}>After the Harvest</div>
          <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:12,fontStyle:"italic"}}>{cs.growthVignetteText||''}</div>
          {cs.harvestsCompleted>=4?(
            <div style={{fontSize:11,color:"#7a5030",marginBottom:12,textAlign:"center"}}>All four cultivation cycles complete.</div>
          ):(
            <div style={{fontSize:11,color:"#7a5030",marginBottom:12,textAlign:"center"}}>Cycles remaining: {4-cs.harvestsCompleted}/4</div>
          )}
          <button style={{...C.btn(brown),width:"100%"}} onClick={closeCultivatorGrowth}>Continue ✓</button>
        </>);

        // ── DIGEST CHECK ──
        if(cs.modalPhase==='digest_check'){
          const isEarly=cs.digestWeeksLeft>cs.digestTotalWeeks/2;
          const vig=getDigestVignette(getStage(renee?.lbs||100).id,cs.testerName,cs.harvestStagesJumped||1,!isEarly);
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:brown,marginBottom:4}}>👁 CHECK ON HER</div>
            <div style={{fontSize:13,fontWeight:700,color:amber,marginBottom:4}}>Reneé</div>
            <div style={{fontSize:10,color:"#8a6030",marginBottom:10}}>{cs.digestWeeksLeft} week{cs.digestWeeksLeft!==1?"s":""} remaining</div>
            <div style={{fontSize:12,color:"#c09060",lineHeight:1.85,marginBottom:14,fontStyle:"italic"}}>{vig||'She is unavailable.'}</div>
            <button style={{...C.btn("#333"),width:"100%"}} onClick={()=>setCultivatorState(prev=>({...prev,modalPhase:null}))}>Leave</button>
          </>);
        }

        return null;
}
