// ═══════════════════════════════════════════════════════════════
// CHAPTER HOSTESS — Hangout picker, Feast prep, Feast log modals
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { HOSTESS_HANGOUTS, MENU_TIERS, ATMOSPHERE_TIERS, GUEST_TIERS } from '../gameData/chapterHostess.js';

export function ChapterHostessHangoutModal({ chapterHostessState, students, openHostessHangout, setChapterHostessState, makeHostessHangoutChoice }){
        const ch=chapterHostessState;
        const keyMap={2:'kylie',4:'fiona',10:'renee'};
        const nameMap={2:'Kylie',4:'Fiona',10:'Reneé'};
        const categoryMap={2:'Guest List',4:'Atmosphere',10:'Menu'};
        // If no student selected yet — show picker
        if(!ch.hangoutStudentId){
          return(
            <div style={{...C.overlay,zIndex:1200}}>
              <div style={{...C.modal,maxWidth:440,background:"linear-gradient(160deg,#0e0520,#180830,#0e0520)",border:"1px solid #6c348340"}}>
                <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>HANG OUT · {ch.prepDaysLeft} DAY{ch.prepDaysLeft!==1?"S":""} LEFT</div>
                <div style={{fontSize:14,fontWeight:700,color:"#c080ff",marginBottom:4}}>Who do you spend the day with?</div>
                <div style={{fontSize:11,color:"#604080",marginBottom:14,fontStyle:"italic"}}>Each hangout unlocks the next tier of their category.</div>
                {[{id:10,key:'renee',unlocks:ch.menuUnlocks},{id:4,key:'fiona',unlocks:ch.atmosphereUnlocks},{id:2,key:'kylie',unlocks:ch.guestUnlocks}].map(({id,key,unlocks})=>{
                  const maxed=unlocks>=6;
                  const tierName=[MENU_TIERS,ATMOSPHERE_TIERS,GUEST_TIERS][['renee','fiona','kylie'].indexOf(key)];
                  const nextTier=tierName?.[Math.min(unlocks+1,5)];
                  return(
                    <button key={id}
                      style={{...C.btn(maxed?"#30205040":"#401060"),width:"100%",marginBottom:8,opacity:maxed?0.4:1,textAlign:"left",padding:"10px 14px"}}
                      onClick={()=>!maxed&&openHostessHangout(id)}>
                      <div style={{fontWeight:700,fontSize:12}}>{nameMap[id]} — {categoryMap[id]}</div>
                      <div style={{fontSize:10,color:"#9060b0",marginTop:2}}>{maxed?"Fully upgraded":nextTier?`Unlocks: ${nextTier.label}`:"—"}</div>
                    </button>
                  );
                })}
                <button style={{...C.btn("#28184060"),width:"100%",marginTop:4}} onClick={()=>setChapterHostessState(prev=>({...prev,hangoutOpen:false,hangoutStudentId:null}))}>Cancel</button>
              </div>
            </div>
          );
        }
        // Vignette is open
        const key=keyMap[ch.hangoutStudentId];
        const unlockIdx=key==='kylie'?ch.guestUnlocks:key==='renee'?ch.menuUnlocks:ch.atmosphereUnlocks;
        const vignette=HOSTESS_HANGOUTS[key]?.[unlockIdx];
        if(!vignette) return null;
        const tiffany=students.find(s=>s.evolvedForm==='chapter_hostess');
        const chosenId=ch.hangoutHistory?.[0];
        const chosenChoice=chosenId?vignette.choices.find(c=>c.id===chosenId):null;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:480,background:"linear-gradient(160deg,#0e0520,#180830,#0e0520)",border:"1px solid #6c348340",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>HANG OUT — {nameMap[ch.hangoutStudentId]?.toUpperCase()}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#c080ff",marginBottom:10}}>{vignette.title}</div>
              {ch.hangoutPhaseIdx===0&&(
                <>
                  <div style={{fontSize:12,color:"#a080c0",lineHeight:1.75,marginBottom:16,whiteSpace:"pre-line"}}>{typeof vignette.intro==='function'?vignette.intro(tiffany):vignette.intro}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {vignette.choices.map(c=>(
                      <button key={c.id} style={{...C.btn("#401060"),width:"100%",textAlign:"left",padding:"10px 14px",fontSize:11}} onClick={()=>makeHostessHangoutChoice(c.id)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {ch.hangoutPhaseIdx===1&&chosenChoice&&(
                <>
                  <div style={{fontSize:12,color:"#a080c0",lineHeight:1.75,marginBottom:6,whiteSpace:"pre-line"}}>{typeof vignette.intro==='function'?vignette.intro(tiffany):vignette.intro}</div>
                  <div style={{background:"rgba(60,20,90,0.5)",border:"1px solid #6040a050",borderRadius:8,padding:12,marginBottom:14}}>
                    <div style={{fontSize:11,color:"#d0a0ff",lineHeight:1.65}}>{chosenChoice.result}</div>
                  </div>
                  <div style={{fontSize:10,color:"#70508090",marginBottom:12,fontStyle:"italic"}}>+{vignette.gainBonus} lbs · +{vignette.relBonus} rel · upgrade unlocked</div>
                  <button style={{...C.btn("#5a18b0"),width:"100%"}} onClick={()=>makeHostessHangoutChoice('confirm')}>Continue ✓</button>
                </>
              )}
            </div>
          </div>
        );
}

export function ChapterHostessFeastPrepModal({ chapterHostessState, beginFeast, setChapterHostessState }){
        const ch=chapterHostessState;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:480,background:"linear-gradient(160deg,#100520,#1e0a38,#100520)",border:"1px solid #7034a040",maxHeight:"88vh",overflowY:"auto",padding:22}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>FEAST PREP — STAGE {ch.stageIdx+1}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#c080ff",marginBottom:14}}>Wednesday Feast</div>
              {ch.prepDaysLeft>0&&(
                <div style={{background:"rgba(80,20,20,0.3)",border:"1px solid #80303030",borderRadius:7,padding:"8px 12px",marginBottom:12,fontSize:10,color:"#c06060"}}>
                  You still have {ch.prepDaysLeft} prep {ch.prepDaysLeft===1?"day":"days"} left. Starting now forfeits them.
                </div>
              )}
              <div style={{fontSize:11,color:"#8060a0",marginBottom:16}}>Here's what you've prepared. Lock it in and begin the feast.</div>
              {[
                {label:"Menu",       tier:ch.menuUnlocks,       tiers:MENU_TIERS,       icon:"🍽️"},
                {label:"Atmosphere", tier:ch.atmosphereUnlocks,  tiers:ATMOSPHERE_TIERS, icon:"✨"},
                {label:"Guest List", tier:ch.guestUnlocks,       tiers:GUEST_TIERS,      icon:"👥"},
              ].map(({label,tier,tiers,icon})=>(
                <div key={label} style={{background:"rgba(30,10,60,0.6)",border:"1px solid #5030806a",borderRadius:8,padding:"10px 14px",marginBottom:10}}>
                  <div style={{fontSize:10,color:"#7050a0",marginBottom:3,letterSpacing:1}}>{icon} {label.toUpperCase()}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#b080e0"}}>{tiers[tier]?.label||"—"}</div>
                  <div style={{fontSize:10,color:"#60408070",marginTop:2,fontStyle:"italic"}}>{tiers[tier]?.desc||""}</div>
                </div>
              ))}
              <button style={{...C.btn("#5a18b0"),width:"100%",marginTop:6,fontSize:13}} onClick={beginFeast}>Begin the Feast ✦</button>
              <button style={{...C.btn("#28104060"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>setChapterHostessState(prev=>({...prev,feastPrepOpen:false}))}>Go Back</button>
            </div>
          </div>
        );
}

export function ChapterHostessFeastLogModal({ chapterHostessState, completeFeast }){
        const ch=chapterHostessState;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0c0418,#160828,#0c0418)",border:"1px solid #6c348340",maxHeight:"90vh",overflowY:"auto",padding:22}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>WEDNESDAY FEAST — STAGE {ch.stageIdx+1}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#c080ff",marginBottom:14}}>The Table</div>
              <div style={{maxHeight:440,overflowY:"auto",marginBottom:14,display:"flex",flexDirection:"column",gap:8}}>
                {ch.feastLog.map((entry,i)=>{
                  if(entry.type==="header") return <div key={i} style={{textAlign:"center",fontSize:10,letterSpacing:3,color:"#8050b0",padding:"6px 0",borderTop:"1px solid #40208030",borderBottom:"1px solid #40208030"}}>{entry.text}</div>;
                  if(entry.type==="gain")   return <div key={i} style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#d090ff",padding:"2px 0"}}>{entry.text}</div>;
                  if(entry.type==="food")   return <div key={i} style={{fontSize:12,color:"#c0a0d0",lineHeight:1.6,fontStyle:"italic"}}>{entry.text}</div>;
                  if(entry.type==="sister") return <div key={i} style={{fontSize:11,color:"#9070b0",lineHeight:1.55}}>{entry.text}</div>;
                  if(entry.type==="camille")return <div key={i} style={{fontSize:11,color:"#b080c0",lineHeight:1.55,fontStyle:"italic"}}>{entry.text}</div>;
                  return <div key={i} style={{fontSize:11,color:"#8060a0",lineHeight:1.65}}>{entry.text}</div>;
                })}
              </div>
              <div style={{background:"rgba(50,15,80,0.5)",border:"1px solid #60309050",borderRadius:8,padding:"10px 14px",marginBottom:14}}>
                <div style={{fontSize:10,color:"#7050a0",marginBottom:4,letterSpacing:1}}>TOTALS</div>
                <div style={{fontSize:13,color:"#d090ff",fontWeight:700}}>Tiffany +{ch.feastGainTotal} lbs · +{ch.feastRelTotal} rel</div>
                {ch.sisters&&<div style={{fontSize:10,color:"#806090",marginTop:4}}>{ch.sisters.map(sis=>`${sis.name} +${ch.pendingSisterGains?.[sis.name]||0} lbs`).join(" · ")}{ch.stageIdx>=1?` · Camille +${ch.pendingCamilleGain||0} lbs`:""}</div>}
              </div>
              <button style={{...C.btn("#5a18b0"),width:"100%",fontSize:13}} onClick={completeFeast}>The Feast is Done ✓</button>
            </div>
          </div>
        );
}
