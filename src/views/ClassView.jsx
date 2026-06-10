// ═══════════════════════════════════════════════════════════════
// CLASS VIEW — HR observer card, Vaughan card, class roster
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { getHrDispLevel, getHrDispDesc, getTier } from '../gameData/sessions.js';
import { EVOLVED_FORM_META } from '../gameData/evolvedForms.js';
import { CELESTIAL_STAGES, UMBRAL_STAGES, SANGUINE_STAGES, VERDANT_STAGES, GODDESS_STAGES, GODDESS_ATTITUDE, getGoddessStage, ASCENSION_STAGE_REACTIONS, SANGUINE_REACTIONS, VERDANT_REACTIONS, CONVERGENCE_STAGE } from '../gameData/ascension.js';
import { STAGE_REACTIONS } from '../gameData/content.js';
import { rnd, getEvolvedReaction } from '../utils/gameHelpers.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';

export function ClassView({ view, hrObserver, vaughan, vaughanAlly, ap, feedObserver, talkToObserver, students, lilithUnlocked, avgLbs, setSelectedId, setView }){
  return(<>
          {/* ── HR OBSERVER CARD ── */}
          {hrObserver&&view==="class"&&(()=>{
            const dl=getHrDispLevel(hrObserver.disposition);
            const st=getStage(hrObserver.lbs);
            return(
              <div style={{background:"rgba(60,10,10,0.35)",border:`1px solid ${dl.color}40`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:dl.color}}>{hrObserver.name}</span>
                    <span style={{fontSize:10,color:"#805060",marginLeft:8,letterSpacing:1}}>HR OBSERVER · {hrObserver.lbs} lbs · {st.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:dl.color,background:`${dl.color}25`,borderRadius:8,padding:"2px 8px"}}>{dl.label}</span>
                </div>
                <div style={{position:"relative",height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,marginBottom:8}}>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,background:dl.color,width:`${hrObserver.disposition}%`,transition:"width 0.4s"}}/>
                  <div style={{position:"absolute",left:"65%",top:-1,height:7,width:2,background:"rgba(255,255,255,0.3)",borderRadius:1}}/>
                </div>
                <div style={{fontSize:11,color:"#907090",lineHeight:1.6,marginBottom:8,fontStyle:"italic"}}>{getHrDispDesc(hrObserver)}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={C.btn("#5a1030")} onClick={()=>feedObserver(rnd(2,5),8)}>🍽️ Offer her something (free)</button>
                  <button style={{...C.btn("#3a1060"),opacity:ap<1?0.4:1}} onClick={talkToObserver}>💬 Discuss pedagogy (1 AP, +12 disp)</button>
                  {hrObserver.disposition>=65&&<span style={{fontSize:11,color:"#40c060",alignSelf:"center"}}>✓ Will intervene at termination</span>}
                </div>
              </div>
            );
          })()}

          {/* ── VAUGHAN CARD ── */}
          {vaughan&&view==="class"&&(()=>{
            const vSt=getStage(vaughan.lbs);
            return(
              <div style={{background:"rgba(10,30,50,0.45)",border:`1px solid ${vaughanAlly?"#30905050":"#20405060"}`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:vaughanAlly?"#50c080":"#4080a0"}}>{vaughan.name}</span>
                    <span style={{fontSize:10,color:"#3a5060",marginLeft:8,letterSpacing:1}}>{vaughan.dept} · {vaughan.lbs} lbs · {vSt.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:vaughanAlly?"#50c080":"#c05040",background:vaughanAlly?"rgba(30,80,30,0.35)":"rgba(70,15,15,0.35)",borderRadius:8,padding:"2px 8px"}}>
                    {vaughanAlly?"ALLY":"RIVAL"}
                  </span>
                </div>
                {!vaughanAlly&&(
                  <div>
                    <div style={{display:"flex",gap:10,marginBottom:6}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>SUSPICION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.suspicion>=80?"#c03030":vaughan.suspicion>=50?"#c06020":"#406080",
                            width:`${vaughan.suspicion}%`}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.suspicion}/100</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>DISPOSITION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.disposition>=40?"#40c070":"#607090",
                            width:`${vaughan.disposition}%`}}/>
                          <div style={{position:"absolute",left:"40%",top:-1,height:6,width:2,background:"rgba(255,255,255,0.25)",borderRadius:1}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.disposition}/40 needed</div>
                      </div>
                    </div>
                    <div style={{fontSize:10,color:"#4a6070",lineHeight:1.55,fontStyle:"italic"}}>
                      {vaughan.disposition>=40&&vaughan.lbs>=162?"She is close to letting this go entirely."
                      :vaughan.suspicion>=80?"She knows. One confrontation away from a crisis — or an alliance."
                      :vaughan.suspicion>=50?"She's been asking questions. Feed her at social events to shift her perspective."
                      :"She's noticed something. Not sure what yet."}
                    </div>
                    {vaughan.disposition>=40&&vaughan.lbs<162&&(
                      <div style={{fontSize:9,color:"#40806050",marginTop:3}}>
                        Ally trigger: {162-vaughan.lbs} lbs to go — host events she attends to help her gain.
                      </div>
                    )}
                  </div>
                )}
                {vaughanAlly&&(
                  <div style={{fontSize:11,color:"#4a9060",lineHeight:1.65,fontStyle:"italic"}}>
                    She files favorable reports and covers for you with HR. Scrutiny reduced by 3/week.
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── CLASS ROSTER ── */}
          {view==="class"&&(
            <div>
              <p style={C.secT}>Students — {students.filter(s=>!s.hidden||lilithUnlocked).length} enrolled · avg {avgLbs} lbs</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gridAutoRows:"minmax(140px,auto)",gap:8}}>
                {[...students].filter(s=>!s.hidden||lilithUnlocked).sort((a,b)=>{
                  const aG=a.incarnatedGoddess?2:0;
                  const bG=b.incarnatedGoddess?2:0;
                  if(aG!==bG) return aG-bG;
                  return a.id-b.id;
                }).map(s=>{
                  const st=getStage(s.lbs);
                  const evMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null;
                  const isSingularity=s.ascensionPath==="convergence"&&!s.triumvirateUnlocked;
                  const isTriumvirate=s.ascensionPath==="convergence"&&!!s.triumvirateUnlocked;
                  const isPrimordial=s.ascensionPath==="primordial"&&!s.primordialTriumvirateUnlocked;
                  const isPrimTriumvirate=s.ascensionPath==="primordial"&&!!s.primordialTriumvirateUnlocked;
                  const colSpan=isTriumvirate||isPrimTriumvirate?3:isSingularity||isPrimordial?2:1;
                  // Card border/bg
                  const cardBorder=isTriumvirate?"2px solid #ffd70090":isPrimTriumvirate?"2px solid #c0803090":isSingularity?"2px solid #ffffff60":isPrimordial?"2px solid #c0904060":s.ascensionPath==="celestial"?"1px solid #8060c060":s.ascensionPath==="umbral"?"1px solid #80101060":s.ascensionPath==="sanguine"?"1px solid #c0203060":s.ascensionPath==="verdant"?"1px solid #40802060":evMeta?`1px solid ${evMeta.color}80`:"1px solid #180830";
                  const cardBg=isTriumvirate?"linear-gradient(135deg,#0a0510,#1a0a30,#100520,#0a0510)":isPrimTriumvirate?"linear-gradient(135deg,#0a0800,#1a0e00,#0f0a00,#0a0800)":isSingularity?"linear-gradient(135deg,#080510,#121020,#0a0818,#080510)":isPrimordial?"linear-gradient(135deg,#080500,#14090000,#100700,#080500)":"";
                  const nameColor=isTriumvirate?"#ffd700":isPrimTriumvirate?"#c09040":isSingularity?"#e8e8ff":isPrimordial?"#d4a050":s.ascensionPath==="celestial"?"#c8b0ff":s.ascensionPath==="umbral"?"#ff9090":s.ascensionPath==="sanguine"?"#ff7070":s.ascensionPath==="verdant"?"#80d080":evMeta?evMeta.color:"#d8a8ff";
                  const barColor=isTriumvirate?"#ffd700":isPrimTriumvirate?"#b07030":isSingularity?"#c8c8ff":isPrimordial?"#c09040":s.ascensionPath==="celestial"?CELESTIAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="umbral"?UMBRAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="sanguine"?"#e03050":s.ascensionPath==="verdant"?"#50a050":st.color;
                  const barMax=isTriumvirate||isPrimTriumvirate?60000:isSingularity||isPrimordial?20000:s.ascensionPath?3000:1100;
                  // ── Goddess special card ──
                  if(s.incarnatedGoddess){
                    const gs=getGoddessStage(s.lbs);
                    const nextGs=GODDESS_STAGES[gs.id]||null;
                    const godAccent=gs.color;
                    const godQuote=(GODDESS_ATTITUDE[gs.id-1]||"").slice(0,120);
                    return(
                      <div key={s.id} style={{
                        ...C.card,
                        gridColumn:"span 2",gridRow:"span 2",
                        background:"linear-gradient(155deg,#0e0700,#1e0e00,#150b05,#0e0700)",
                        border:`2px solid ${godAccent}70`,
                        boxShadow:`0 0 24px ${godAccent}20, inset 0 0 30px rgba(0,0,0,0.6)`,
                        position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",gap:6,
                      }} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                        {/* pulsing top strip */}
                        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${godAccent},${godAccent}cc,${godAccent},transparent)`,opacity:0.85}}/>
                        {/* corner sigil */}
                        <div style={{position:"absolute",top:6,right:8,fontSize:22,opacity:0.18}}>✦</div>
                        <div style={{position:"absolute",bottom:6,left:8,fontSize:22,opacity:0.18}}>✦</div>
                        {/* Stage badge */}
                        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                          <span style={{fontSize:9,letterSpacing:3,color:godAccent,fontWeight:700}}>THE GODDESS</span>
                          <span style={{fontSize:9,background:`${godAccent}22`,color:godAccent,borderRadius:6,padding:"1px 7px",border:`1px solid ${godAccent}40`,letterSpacing:1}}>{gs.label.toUpperCase()}</span>
                        </div>
                        {/* Name */}
                        <div style={{fontSize:20,fontWeight:700,color:godAccent,lineHeight:1.1,letterSpacing:1}}>{s.name}</div>
                        {/* Weight large */}
                        <div style={{fontSize:14,color:"#e8c870",fontWeight:700}}>{s.lbs.toLocaleString()} lbs</div>
                        {/* Progress toward next stage */}
                        {nextGs?(
                          <div>
                            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#806030",marginBottom:2}}>
                              <span>Stage {gs.id}/4</span>
                              <span>{nextGs.min.toLocaleString()} lbs → {nextGs.label}</span>
                            </div>
                            <Bar val={s.lbs-gs.min} max={nextGs.min-gs.min} color={godAccent}/>
                          </div>
                        ):(
                          <div style={{fontSize:9,color:godAccent,letterSpacing:2}}>STAGE 4 — CONSUMING ✦</div>
                        )}
                        {/* Attitude quote */}
                        <div style={{fontSize:11,color:"#c8a060",fontStyle:"italic",lineHeight:1.65,flex:1,marginTop:2}}>
                          "{godQuote}…"
                        </div>
                        {/* Relationship */}
                        <div style={{fontSize:10,color:"#806030",marginTop:"auto"}}>
                          {(()=>{const tier=getTier(s.relationship);return `${tier.emoji} ${tier.label} · ❤ ${s.relationship}%`;})()}
                        </div>
                      </div>
                    );
                  }
                  return(
                    <div key={s.id} style={{...C.card,border:cardBorder,gridColumn:`span ${colSpan}`,background:cardBg||C.card.background,position:"relative",overflow:"hidden"}} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      {/* Fused accent glow strip */}
                      {(isSingularity||isTriumvirate)&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:isTriumvirate?"linear-gradient(90deg,#ffd700,#fff,#ffd700)":"linear-gradient(90deg,#8080ff,#ffffff,#8080ff)",opacity:0.7}}/>}
                      {(isPrimordial||isPrimTriumvirate)&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#8b4513,#c09040,#8b4513)",opacity:0.7}}/>}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                          <span style={{fontWeight:700,fontSize:isSingularity||isPrimordial?17:isTriumvirate||isPrimTriumvirate?19:15,color:nameColor}}>{s.name}</span>
                          {(()=>{const tier=getTier(s.relationship);return tier.id>0?<span style={{fontSize:12,opacity:0.9}}>{tier.emoji}</span>:null;})()}
                          {s.ascensionPath==="celestial"&&<span style={{fontSize:11,color:"#a080ff"}}>✦{CELESTIAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="umbral"&&<span style={{fontSize:11,color:"#cc4040"}}>🌑{UMBRAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="sanguine"&&<span style={{fontSize:11,color:"#e05050"}}>🩸{SANGUINE_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="verdant"&&<span style={{fontSize:11,color:"#60b060"}}>🌿{VERDANT_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {isPrimordial&&<span style={{fontSize:12,color:"#c09040",fontWeight:700,letterSpacing:1}}>🌑🌿 Primordial</span>}
                          {isPrimTriumvirate&&<span style={{fontSize:13,color:"#d4a050",fontWeight:700,letterSpacing:1}}>🌑🌿 First Triumvirate</span>}
                          {isSingularity&&<span style={{fontSize:12,color:"#c0c0ff",fontWeight:700,letterSpacing:1}}>⚡ Singularity</span>}
                          {isTriumvirate&&<span style={{fontSize:13,color:"#ffd700",fontWeight:700,letterSpacing:2}}>🔱 TRIUMVIRATE</span>}
                          {!s.ascensionPath&&evMeta&&<span style={{fontSize:10,color:evMeta.color,fontWeight:600}}>✦ {evMeta.title}</span>}
                        </div>
                        <StageTag stage={st}/>
                      </div>
                      {!(isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate)&&(
                        <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      )}
                      {(isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate)&&(
                        <div style={{fontSize:10,color:isPrimordial||isPrimTriumvirate?"#907040":"#8080b0",marginBottom:4,fontStyle:"italic"}}>
                          {isSingularity||isTriumvirate?"One being. Two origins. One convergence.":"The first hunger. The living earth. One origin."}
                        </div>
                      )}
                      <Bar val={s.lbs} max={barMax} color={barColor}/>
                      <div style={{fontSize:11,color:isTriumvirate?"#ffd700":isPrimTriumvirate?"#c09040":"#a88050",margin:"2px 0",fontWeight:isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate?700:400}}>
                        {s.lbs.toLocaleString()} lbs{(isSingularity||isPrimordial||isTriumvirate||isPrimTriumvirate)?"":`  (+${s.lbs-s.startLbs})`} · ❤ {s.relationship}%
                      </div>
                      <div style={{fontSize:10,color:isPrimordial||isPrimTriumvirate?"#705030":isSingularity||isTriumvirate?"#6060a0":"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {(()=>{
                          if(s.ascensionPath){const _r=s.ascensionPath==="celestial"?ASCENSION_STAGE_REACTIONS.celestial:s.ascensionPath==="umbral"?ASCENSION_STAGE_REACTIONS.umbral:s.ascensionPath==="sanguine"?SANGUINE_REACTIONS:s.ascensionPath==="verdant"?VERDANT_REACTIONS:[CONVERGENCE_STAGE.desc];const _e=_r[s.ascensionStage||0]||"";return((typeof _e==='function'?_e(s):_e)||"").slice(0,90);}
                          const evR=getEvolvedReaction(s); if(evR) return evR.slice(0,62);
                          const rxn=STAGE_REACTIONS[s.archetype]?.[st.id]; return ((typeof rxn==='function'?rxn(s):rxn)||"").slice(0,62);
                        })()}…
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
  </>);
}
