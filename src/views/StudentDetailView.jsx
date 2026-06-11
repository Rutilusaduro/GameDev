import { ASCENSION_BRIDGE, EVOLUTION_BUTTON_BLURB, EVOLUTION_OFFER, EVOLVED_ACTIVITY_META, EVOLVED_FORM_META, FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../gameData/evolvedForms.js';
import { ASCENSION_STAGE_REACTIONS, CELESTIAL_STAGES, CONVERGENCE_STAGE, GODDESS_ACTIONS, GODDESS_ATTITUDE, GODDESS_STAGES, PRIMORDIAL_ACTIONS, PRIMORDIAL_STAGES, PRIMORDIAL_TRIUMVIRATE_ACTIONS, PRIMORDIAL_TRIUMVIRATE_BODY_DESC, SANGUINE_ACTIONS, SANGUINE_STAGES, SINGULARITY_ACTIONS, SINGULARITY_STAGES, TRIUMVIRATE_ACTIONS, UMBRAL_STAGES, VERDANT_ACTIONS, VERDANT_STAGES, getGoddessStage } from '../gameData/ascension.js';
import { ATMOSPHERE_TIERS, GUEST_TIERS, MENU_TIERS } from '../gameData/chapterHostess.js';
import { C } from '../styles.js';
import { LilithPixelArt } from '../components/LilithPixelArt.jsx';
import { getCorruptionTier, CORRUPTION_CONFIG } from '../gameData/corruption.js';
import { CASE_STUDY_PAIRS } from '../gameData/communityResearcher.js';
import { EVOLVED_SKILL_TREES } from '../gameData/skills.js';
import { INNER_CIRCLE_TIERS, getTier } from '../gameData/sessions.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { RECRUITMENT_SCENE, TESTER_APPEARANCE } from '../gameData/cultivator.js';
import { SANGUINE_MARK_DRAIN_BY_STAGE, VERDANT_CULTIVATE_GAIN_BY_STAGE, getBodyDesc, getDiary, getEvolvedReaction, getOutfit, getPrimordialStage, getSingularityStage } from '../utils/gameHelpers.js';
import { STAGE_REACTIONS } from '../gameData/content.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';

export function StudentDetailView({ openWeighIn, addBlobToReligion, ap, ascendStudent, celestialMassBless, celestialMassPull, celestialMassPush, chapterHostessState, communityResearcherState, consumeIncarnatedGoddess, consumePrimordialIncarnatedGoddess, consumedStudents, cultivatorState, doEvolvedActivity, doGoddessAction, doPrimordialAction, doSanguineAction, doSingle, doSingularityAction, doVerdantAction, effectiveSingleActions, finalConsumptionDone, foundReligion, goddessIncarnateId, goddessSeen, lilithKillCount, lilithUnlocked, openCaseStudyGrid, openCultivatorHarvest, openCultivatorRecruit, openDigestCheck, openEvolutionModal, openFeastPrep, openFinalReview, openIntimacySelector, openLilithHunt, openThesisBoard, primordialFinalConsumptionDone, primordialGoddessIncarnateId, purchaseEvolvedSkill, recoverConsumedStudent, religion, sanguineMarks, sel, sessionHistory, setChapterHostessState, setNadiaNotesState, setStudents, setSubjectJournalState, setView, startCultivatorSession, startPrivateSession, startRecordingSession, students, triggerGoddessIncarnation, triggerPrimordialGoddessIncarnation, umbralConsumeStudent, umbralVoidPull, verdantCultivations }){
            const s=sel;
            const st=getStage(s.lbs);

            // ── LILITH — custom detail panel ──────────────────────────────────
            if(s.id===LILITH_ID){
              const stageId=st.id;
              const isBlob=stageId>=9;
              const menConsumed=Math.max(0,stageId); // roughly 1 man per stage
              const dark="#1a001a";
              const accent="#8020a0";
              const nextSt=WEIGHT_STAGES[Math.min(10,stageId+1)];
              const lbsToNext=nextSt&&nextSt.id>stageId?Math.max(0,nextSt.min-Math.round(s.lbs)):0;
              return(
                <div>
                  <div style={{...C.card,cursor:"default",marginBottom:10,background:`linear-gradient(160deg,${dark},#100015)`,border:`1px solid ${accent}50`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <h2 style={{margin:0,color:accent,fontSize:22}}>{s.name}</h2>
                        <span style={{fontSize:10,fontWeight:700,color:accent,background:`${accent}22`,borderRadius:6,padding:"2px 8px"}}>🌑 Feasting Beauty</span>
                      </div>
                      <StageTag stage={st}/>
                    </div>
                    <div style={{fontSize:11,color:"#604070",marginBottom:8}}>{s.role} · age {s.age} · {s.desc}</div>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                      <LilithPixelArt stageId={stageId} size={170}/>
                    </div>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:6}}>
                      <div style={{flex:1,minWidth:150}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:1}}>
                          <div style={{fontSize:9,color:"#500050",letterSpacing:2}}>WEIGHT</div>
                          <button style={{...C.smBtn,fontSize:9,padding:"2px 7px",margin:0,background:"rgba(80,0,80,0.4)",borderColor:`${accent}60`,color:accent}} onClick={()=>openWeighIn&&openWeighIn(s)}>⚖ Weigh In</button>
                        </div>
                        <Bar val={s.lbs} color={accent}/>
                        <div style={{fontSize:11,color:"#906090"}}>{Math.round(s.lbs)} lbs{lbsToNext>0?` · ${lbsToNext} lbs to ${nextSt.label}`:""}</div>
                      </div>
                      <div style={{flex:1,minWidth:150}}>
                        <div style={{fontSize:9,color:"#500050",letterSpacing:2,marginBottom:1}}>HUNTS</div>
                        <div style={{fontSize:14,color:accent,fontWeight:700}}>{menConsumed}</div>
                        <div style={{fontSize:10,color:"#604070"}}>
                          {isBlob?"No longer leaves the room.":stageId>=7?"Range severely limited.":stageId>=5?"Range narrowing.":"Campus is open."}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={C.infoBox("rgba(20,0,30,0.6)")}>
                    <div style={{fontSize:9,color:"#500050",letterSpacing:2,marginBottom:4}}>CURRENT APPEARANCE</div>
                    <div style={{fontSize:13,color:"#e0c0e0",lineHeight:1.8,fontStyle:"italic"}}>{getBodyDesc(s)}</div>
                  </div>
                  <div style={{background:"rgba(15,0,25,0.7)",border:`1px solid ${accent}40`,borderRadius:10,padding:14,marginBottom:10}}>
                    <div style={{fontSize:9,letterSpacing:3,color:accent,marginBottom:6}}>🌑 FEASTING BEAUTY</div>
                    <div style={{fontSize:12,color:"#c0a0c0",lineHeight:1.75,marginBottom:10,fontStyle:"italic"}}>
                      {isBlob
                        ?"She doesn't go anywhere anymore. The hunger hasn't gone anywhere either. Things come to her now."
                        :stageId>=7?"She moves through the campus slowly. Deliberately. There's no need to hurry — they're not going anywhere."
                        :stageId>=4?"She's larger than she was. It shows. It also helps."
                        :"She moves through the campus like she owns it. Nobody knows what she is. That's her favorite part."}
                    </div>
                    {isBlob?(
                      <button style={{...C.btn("#500060"),width:"100%",fontSize:13}} onClick={openLilithHunt}>
                        📱 Call for Delivery
                      </button>
                    ):(
                      <button style={{...C.btn("#400050"),width:"100%",fontSize:13}} onClick={openLilithHunt}>
                        🌑 Go Hunting (free)
                      </button>
                    )}
                  </div>
                  <button style={{...C.smBtn,width:"100%",marginTop:4}} onClick={()=>setView("class")}>← Back to Class</button>
                </div>
              );
            }

            return(
              <div>
                {/* Header card */}
                {(()=>{const detailEvMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null; return(
                <div style={{...C.card,cursor:"default",marginBottom:10,borderColor:detailEvMeta&&!s.ascensionPath?`${detailEvMeta.color}60`:""}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <h2 style={{margin:0,color:detailEvMeta&&!s.ascensionPath?detailEvMeta.color:"#d8a8ff",fontSize:22}}>{s.name}</h2>
                      {detailEvMeta&&!s.ascensionPath&&<span style={{fontSize:11,fontWeight:700,color:detailEvMeta.color,background:`${detailEvMeta.color}22`,borderRadius:6,padding:"2px 8px"}}>✦ {detailEvMeta.title}</span>}
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <StageTag stage={st}/>
                      <span style={C.tag("#2a1050","#b080e0")}>{s.personality}</span>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:"#70509a",marginBottom:8}}>{s.role||s.archetype} · {s.archetype} · age {s.age} · {s.bodyType} body · fav: {s.favFood} · hobby: {s.hobby}</div>

                  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:8}}>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:1}}>
                        <div style={{fontSize:9,color:"#5028a0",letterSpacing:2}}>WEIGHT</div>
                        <button style={{...C.smBtn,fontSize:9,padding:"2px 7px",margin:0}} onClick={()=>openWeighIn&&openWeighIn(s)}>⚖ Weigh In</button>
                      </div>
                      <Bar val={s.lbs} color={st.color}/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.lbs} lbs · started {s.startLbs} · gained {s.lbs-s.startLbs} lbs</div>
                      {(()=>{
                        const cap=s.stomachCapacity||100;
                        const full=s.fullness||0;
                        const pct=Math.round((full/cap)*100);
                        const stuffed=full>cap;
                        return(
                          <div style={{marginTop:7}}>
                            <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>STOMACH {stuffed&&<span style={{color:"#e07030"}}>· STUFFED</span>}</div>
                            <Bar val={Math.min(full,cap*1.5)} max={cap*1.5} color={stuffed?"#e07030":pct>=70?"#d0a020":"#40a060"}/>
                            <div style={{fontSize:10,color:"#907050"}}>
                              {full}/{cap} fullness{(s.consumedCalories||0)>0&&<span> · {(s.consumedCalories||0).toLocaleString()} cal digesting (≈+{Math.round((s.consumedCalories||0)/3500)} lbs at week's end)</span>}
                              {(s.stuffedStreak||0)>0&&<span style={{color:"#e07030"}}> · {s.stuffedStreak}w stuffed streak</span>}
                            </div>
                            {s.relationship>=CORRUPTION_CONFIG.revealRelationship&&(()=>{
                              const ct=getCorruptionTier(s.corruption||0);
                              return(
                                <div style={{fontSize:10,marginTop:4,color:ct.color}}>
                                  🕯️ Psyche: <b>{ct.label}</b> <span style={{color:"#705050"}}>— {ct.desc}</span>
                                </div>
                              );
                            })()}
                          </div>
                        );
                      })()}
                    </div>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>RELATIONSHIP</div>
                      <Bar val={s.relationship} max={100} color="#c040e0"/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.relationship}% · <MoodBadge mood={s.mood}/></div>
                      {(()=>{
                        const tier=getTier(s.relationship);
                        const next=INNER_CIRCLE_TIERS[tier.id+1];
                        return(
                          <div style={{fontSize:10,color:tier.color,marginTop:3,display:"flex",alignItems:"center",gap:5}}>
                            <span>{tier.emoji} {tier.label}</span>
                            {next&&<span style={{color:"#40304060"}}>· {next.relMin-s.relationship}% to {next.emoji} {next.label}</span>}
                            {tier.id===3&&<span style={{fontSize:9,color:"#a050e0"}}>· +10% gain bonus active</span>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {WEIGHT_STAGES.map(ws=>(
                      <span key={ws.id} style={{background:ws.id<=st.id?ws.color:"#130920",color:ws.id<=st.id?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:ws.id===st.id?"1px solid #c060ff":"1px solid transparent",fontWeight:ws.id===st.id?700:400}}>
                        {ws.label}
                      </span>
                    ))}
                    {s.ascensionPath==="celestial"&&CELESTIAL_STAGES.map((cs,i)=>(
                      <span key={`c${i}`} style={{background:i<=(s.ascensionStage||0)?cs.color:"#100820",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #c0b0ff":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        ✦{cs.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="umbral"&&UMBRAL_STAGES.map((us,i)=>(
                      <span key={`u${i}`} style={{background:i<=(s.ascensionStage||0)?us.color:"#100008",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #ff6060":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        🌑{us.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="convergence"&&<span style={{background:"#222",color:"#fff",borderRadius:8,padding:"2px 7px",fontSize:9,border:"1px solid #fff",fontWeight:700}}>⚡Singularity</span>}
                  </div>
                </div>
                );})()}

                {/* Appearance */}
                <div style={C.infoBox("rgba(70,15,110,0.25)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:5}}>CURRENT APPEARANCE</div>
                  <div style={{fontSize:13,color:"#e0d0b0",lineHeight:1.8,fontStyle:"italic"}}>{getBodyDesc(s)}</div>
                </div>

                {/* Outfit / Divinity */}
                {s.ascensionPath?(()=>{
                  const pathMeta={
                    celestial:{label:"CELESTIAL FORM",accent:"#c8b0ff",bg:"rgba(60,30,140,0.3)",border:"#7050c040",glow:"#8060ff20"},
                    umbral:   {label:"VOID FORM",     accent:"#ff9090",bg:"rgba(80,10,10,0.35)",border:"#801010 40",glow:"#ff202020"},
                    sanguine: {label:"BLOOD FORM",    accent:"#ff7070",bg:"rgba(80,10,20,0.35)",border:"#c0203040",glow:"#c0102020"},
                    verdant:  {label:"VERDANT FORM",  accent:"#80d080",bg:"rgba(20,60,20,0.35)",border:"#40803040",glow:"#20802020"},
                    convergence:s.triumvirateUnlocked
                              ?{label:"🔱 TRIUMVIRATE FORM",accent:"#ffd700",bg:"rgba(40,30,10,0.4)",border:"#ffd70040",glow:"#ffd70015"}
                              :{label:"⚡ SINGULARITY FORM",accent:"#d0d0ff",bg:"rgba(20,15,50,0.45)",border:"#8080ff40",glow:"#8080ff10"},
                    primordial:s.primordialTriumvirateUnlocked
                              ?{label:"🌑🌿 FIRST TRIUMVIRATE FORM",accent:"#c09040",bg:"rgba(30,20,5,0.5)",border:"#c0904040",glow:"#b0702010"}
                              :{label:"🌑🌿 PRIMORDIAL FORM",accent:"#c09040",bg:"rgba(25,15,5,0.45)",border:"#a0703040",glow:"#90601010"},
                  }[s.ascensionPath]||{label:"DIVINITY",accent:"#d8a8ff",bg:"rgba(50,10,90,0.25)",border:"#50109040",glow:"transparent"};
                  return(
                    <div style={{background:pathMeta.bg,border:`1px solid ${pathMeta.border}`,borderRadius:10,padding:12,marginBottom:8,boxShadow:`0 0 16px ${pathMeta.glow}`}}>
                      <div style={{fontSize:9,color:pathMeta.accent,letterSpacing:3,marginBottom:6,fontWeight:700}}>{pathMeta.label}</div>
                      <div style={{fontSize:12,color:"#e0d0c0",lineHeight:1.85,fontStyle:"italic"}}>{getOutfit(s)}</div>
                    </div>
                  );
                })():(
                  <div style={C.infoBox("rgba(50,10,90,0.25)")}>
                    <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>OUTFIT</div>
                    <div style={{fontSize:12,color:"#c0a8d8",lineHeight:1.7}}>{getOutfit(s)}</div>
                  </div>
                )}

                {/* Stage reaction */}
                <div style={C.infoBox("rgba(40,8,70,0.35)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>CURRENT ATTITUDE</div>
                  <div style={{fontSize:13,color:"#e8d8a8",fontStyle:"italic",lineHeight:1.75}}>
                    "{(()=>{
                      if(s.incarnatedGoddess){return GODDESS_ATTITUDE[getGoddessStage(s.lbs).id-1];}
                      if(s.ascensionPath&&s.ascensionPath!=="convergence"){ const ar=ASCENSION_STAGE_REACTIONS[s.ascensionPath]?.[s.ascensionStage||0]; if(ar) return ar; const rb=STAGE_REACTIONS[s.archetype]?.[st.id]; return typeof rb==='function'?rb(s):rb; }
                      const evR=getEvolvedReaction(s); if(evR) return evR;
                      const rb=STAGE_REACTIONS[s.archetype]?.[st.id]; return typeof rb==='function'?rb(s):rb;
                    })()}"
                  </div>
                </div>

                {/* Diary */}
                <div style={C.infoBox("rgba(30,5,60,0.4)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>DIARY ENTRY</div>
                  <div style={{fontSize:12,color:"#c8b898",fontStyle:"italic",lineHeight:1.8}}>{getDiary(s)}</div>
                </div>

                {/* ── ASCENSION SECTION ── */}
                {goddessSeen&&st.id>=10&&!s.ascensionPath&&(
                  <div style={{background:"rgba(40,5,60,0.7)",border:"1px solid #8030e0",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,letterSpacing:3,color:"#a060ff",marginBottom:6}}>✦ ASCENSION AVAILABLE</div>
                    {s.evolvedForm&&ASCENSION_BRIDGE[s.evolvedForm]&&(
                      <div style={{...C.infoBox("rgba(30,5,50,0.5)"),marginBottom:10,fontSize:12,color:"#c8a8f0",fontStyle:"italic",lineHeight:1.85}}>
                        {ASCENSION_BRIDGE[s.evolvedForm](s)}
                      </div>
                    )}
                    <div style={{fontSize:13,color:"#d0b0f0",lineHeight:1.8,marginBottom:12}}>
                      {s.name} has reached the threshold. Four paths open before her. Choose.
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button style={{...C.btn("#3020a0"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"celestial")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#d0b8ff",marginBottom:3}}>✦ Celestial Path</div>
                        <div style={{fontSize:10,color:"#9070d0"}}>Angel features · Mass transfer · Sacred warmth</div>
                      </button>
                      <button style={{...C.btn("#800010"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"umbral")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#ff9090",marginBottom:3}}>🌑 Umbral Path</div>
                        <div style={{fontSize:10,color:"#a06060"}}>Demon features · Consumption · Void power</div>
                      </button>
                      <button style={{...C.btn("#6b1010"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"sanguine")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#ff8888",marginBottom:3}}>🩸 Sanguine Path</div>
                        <div style={{fontSize:10,color:"#a05050"}}>Blood heat · Life drain · Fever marks</div>
                      </button>
                      <button style={{...C.btn("#0a3a0a"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"verdant")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#88cc88",marginBottom:3}}>🌿 Verdant Path</div>
                        <div style={{fontSize:10,color:"#507050"}}>Root system · Patient cultivation · Earth draw</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Ascension status card */}
                {s.ascensionPath&&s.ascensionPath!=="convergence"&&s.ascensionPath!=="primordial"&&(()=>{
                  const path=s.ascensionPath;
                  const isCelestial=path==="celestial";
                  const isUmbral=path==="umbral";
                  const isSanguine=path==="sanguine";
                  const isVerdant=path==="verdant";
                  const stages=isCelestial?CELESTIAL_STAGES:isUmbral?UMBRAL_STAGES:isSanguine?SANGUINE_STAGES:VERDANT_STAGES;
                  const stage=stages[s.ascensionStage||0];
                  const nextStage=stages[(s.ascensionStage||0)+1];
                  const pathColor=isCelestial?"#b898ff":isUmbral?"#cc3030":isSanguine?"#ff6666":"#66cc66";
                  const pathBg=isCelestial?"rgba(60,20,150,0.35)":isUmbral?"rgba(80,5,5,0.5)":isSanguine?"rgba(80,10,10,0.45)":"rgba(10,50,10,0.45)";
                  const pathLabel=isCelestial?"✦ CELESTIAL":isUmbral?"🌑 UMBRAL":isSanguine?"🩸 SANGUINE":"🌿 VERDANT";
                  const otherStudents=students.filter(st=>st.id!==s.id);
                  return(
                    <div style={{background:pathBg,border:`1px solid ${pathColor}60`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:pathColor,marginBottom:4}}>{pathLabel} · STAGE {(s.ascensionStage||0)+1}/5</div>
                      <div style={{fontSize:16,fontWeight:700,color:pathColor,marginBottom:4}}>{stage.label}</div>
                      <div style={{fontSize:11,color:pathColor,marginBottom:6,fontStyle:"italic",opacity:0.8}}>{stage.aura||stage.shadow||""}</div>
                      <div style={{fontSize:12,color:"#d0c0b0",lineHeight:1.7,marginBottom:8}}>{stage.features}</div>
                      <div style={{fontSize:11,color:"#8060a0",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{stage.desc}</div>
                      {/* Attitude */}
                      <div style={{...C.infoBox(isCelestial?"rgba(50,20,120,0.3)":isUmbral?"rgba(40,5,5,0.5)":isSanguine?"rgba(50,5,5,0.4)":"rgba(5,30,5,0.4)"),marginBottom:10}}>
                        <div style={{fontSize:9,color:"#5030a0",letterSpacing:2,marginBottom:4}}>ATTITUDE</div>
                        <div style={{fontSize:12,color:pathColor,fontStyle:"italic",lineHeight:1.7,opacity:0.9}}>
                          "{ASCENSION_STAGE_REACTIONS[path]?.[s.ascensionStage||0]||""}"
                        </div>
                      </div>
                      {nextStage&&<div style={{fontSize:10,color:"#503060",marginBottom:8}}>Next stage at {nextStage.min.toLocaleString()} lbs — {nextStage.min-s.lbs} lbs to go</div>}
                      {/* Consumed students (Umbral only) */}
                      {isUmbral&&(s.consumedIds||[]).length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#903030",marginBottom:4}}>CONSUMED WITHIN</div>
                          {(s.consumedIds||[]).map(cid=>{
                            const cs=consumedStudents.find(x=>x.id===cid);
                            return cs?(
                              <div key={cid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(40,0,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#c07070"}}>{cs.name} ({cs.lbs} lbs)</span>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>↑ Release (3 AP)</button>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Sanguine marks */}
                      {isSanguine&&sanguineMarks.length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#cc3030",marginBottom:4}}>MARKED FOR DRAIN ({sanguineMarks.length})</div>
                          {sanguineMarks.map(mid=>{
                            const ms=students.find(x=>x.id===mid);
                            return ms?(
                              <div key={mid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(40,0,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#cc7070"}}>{ms.name}</span>
                                <span style={{fontSize:10,color:"#805050"}}>drains {SANGUINE_MARK_DRAIN_BY_STAGE[s.ascensionStage||0]} lbs/wk</span>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Verdant cultivations */}
                      {isVerdant&&verdantCultivations.length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#336633",marginBottom:4}}>CULTIVATED ({verdantCultivations.length})</div>
                          {verdantCultivations.map(cid=>{
                            const cs=students.find(x=>x.id===cid);
                            return cs?(
                              <div key={cid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,30,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#70cc70"}}>{cs.name}</span>
                                <span style={{fontSize:10,color:"#508050"}}>gains {VERDANT_CULTIVATE_GAIN_BY_STAGE[s.ascensionStage||0]} lbs/wk</span>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Actions */}
                      <div style={{...C.secT,marginBottom:6}}>{isSanguine?"Sanguine":isVerdant?"Verdant":"Divine"} Actions</div>
                      {isCelestial&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,20,130,0.4)"}} onClick={()=>celestialMassPull(s.id,t.id)}>↓ Pull {t.name.split(" ")[0]} (2AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>↑ Push {t.name.split(" ")[0]} (1AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>✦ Bless {t.name.split(" ")[0]} (2AP)</button>
                            </div>
                          ))}
                        </div>
                      )}
                      {isUmbral&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>🌑 Void Pull {t.name.split(" ")[0]} (2AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>🌑 Consume {t.name.split(" ")[0]} (3AP)</button>
                            </div>
                          ))}
                        </div>
                      )}
                      {isSanguine&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {SANGUINE_ACTIONS.map(a=>{
                            const disabled=ap<a.apCost;
                            return(
                              <button key={a.id} style={{...C.smBtn,fontSize:10,background:"rgba(80,10,10,0.5)",opacity:disabled?0.4:1}}
                                onClick={()=>!disabled&&doSanguineAction(s,a.id)}>
                                {a.label} ({a.apCost}AP){a.gainRange&&a.gainRange[1]>0?` +${a.gainRange[0]}–${a.gainRange[1]}`:""}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {isVerdant&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {VERDANT_ACTIONS.map(a=>{
                            const disabled=ap<a.apCost;
                            return(
                              <button key={a.id} style={{...C.smBtn,fontSize:10,background:"rgba(10,50,10,0.5)",opacity:disabled?0.4:1}}
                                onClick={()=>!disabled&&doVerdantAction(s,a.id)}>
                                {a.label} ({a.apCost}AP){a.gainRange&&a.gainRange[1]>0?` +${a.gainRange[0]}–${a.gainRange[1]}`:""}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {/* Religion */}
                      {!religion&&(
                        <button style={{...C.btn("#401020"),width:"100%"}} onClick={()=>foundReligion(s.id)}>⛪ Found Religion (2AP)</button>
                      )}
                      {religion&&!religion.worshippedIds.includes(s.id)&&(
                        <button style={{...C.btn("#301040"),width:"100%"}} onClick={()=>addBlobToReligion(s.id)}>⛪ Add to Religion Pantheon</button>
                      )}
                    </div>
                  );
                })()}

                {/* Singularity action panel */}
                {s.ascensionPath==="convergence"&&(()=>{
                  const sg=getSingularityStage(s.lbs);
                  const sgLabel=s.triumvirateUnlocked?"🔱 The Triumvirate":sg?`⚡ ${sg.label}`:"⚡ Convergent";
                  const sgColor=s.triumvirateUnlocked?"#ffd700":sg?sg.color:"#2a0045";
                  const sgDesc=s.triumvirateUnlocked?CONVERGENCE_STAGE.desc:sg?sg.desc:CONVERGENCE_STAGE.desc;
                  const actions=[...SINGULARITY_ACTIONS,...(s.triumvirateUnlocked?TRIUMVIRATE_ACTIONS:[])];
                  const goddessStudent=goddessIncarnateId?students.find(st=>st.id===goddessIncarnateId):null;
                  const canSubsume=!goddessIncarnateId&&sg&&sg.id>=5&&religion&&religion.devotees>=1;
                  return(
                    <div style={{background:"rgba(10,5,20,0.95)",border:`2px solid ${sgColor}80`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:sgColor,marginBottom:4}}>{s.triumvirateUnlocked?"🔱 THE TRIUMVIRATE":"⚡ THE SINGULARITY"}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:sgColor}}>{sgLabel}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      {sg&&!s.triumvirateUnlocked&&(
                        <div style={{fontSize:10,color:"#888",marginBottom:6}}>
                          Stage {sg.id}/5 {sg.id<5&&`· next: ${SINGULARITY_STAGES[sg.id].min.toLocaleString()} lbs`}
                        </div>
                      )}
                      <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{sgDesc}</div>
                      {/* Goddess incarnate status */}
                      {goddessStudent&&(
                        <div style={{background:"rgba(60,40,0,0.5)",border:"1px solid #ffd70080",borderRadius:7,padding:8,marginBottom:10}}>
                          <div style={{fontSize:10,color:"#ffd700",marginBottom:4}}>✦ THE INCARNATED GODDESS</div>
                          <div style={{fontSize:11,color:"#e0c060"}}>{goddessStudent.name} — {Math.round(goddessStudent.lbs).toLocaleString()} lbs</div>
                          <button style={{...C.btn("#6a4000"),marginTop:6,width:"100%",fontSize:11,opacity:ap>=5?1:0.4}}
                            onClick={()=>ap>=5&&consumeIncarnatedGoddess(s.id)}>
                            🌟 Consume the Incarnated Goddess (5 AP)
                          </button>
                        </div>
                      )}
                      {/* Subsume religion option */}
                      {canSubsume&&!s.triumvirateUnlocked&&(
                        <button style={{...C.btn("#3a0060"),width:"100%",marginBottom:10,fontSize:11}}
                          onClick={triggerGoddessIncarnation}>
                          ⚡ Subsume the Other Religion
                        </button>
                      )}
                      {/* Action grid */}
                      <div style={{...C.secT,marginBottom:7}}>Singularity Actions · {ap} AP</div>
                      <div style={C.grid3}>
                        {actions.map(a=>{
                          const disabled=ap<a.apCost||(a.needsDevotee&&(!religion||religion.devotees<1))||(a.oneTime&&a.id==="triv_final"&&finalConsumptionDone);
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${sgColor}40`}}
                              onClick={()=>!disabled&&doSingularityAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#e8d8ff",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.apCost} AP</span>
                                {a.gainRange&&a.gainRange[1]>0&&<span style={{fontSize:10,color:"#a08060"}}>+{a.gainRange[0]}–{a.gainRange[1]}</span>}
                                {a.needsDevotee&&<span style={{fontSize:9,color:"#a05050"}}>devotee</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Goddess inspect panel */}
                {s.incarnatedGoddess&&(()=>{
                  const gs=getGoddessStage(s.lbs);
                  const gsColor=gs.color;
                  return(
                    <div style={{background:"rgba(15,10,0,0.97)",border:`2px solid ${gsColor}90`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:gsColor,marginBottom:4}}>✦ THE INCARNATED GODDESS</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:gsColor}}>✦ {gs.label}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      <div style={{fontSize:10,color:"#888",marginBottom:8}}>Stage {gs.id}/4{gs.id<4&&` · next: ${GODDESS_STAGES[gs.id].min.toLocaleString()} lbs`}</div>
                      {/* Practical actions */}
                      <div style={{...C.secT,marginBottom:7}}>Offerings · {ap} AP</div>
                      <div style={C.grid3}>
                        {GODDESS_ACTIONS.filter(a=>a.type==="practical").map(a=>{
                          const disabled=ap<a.cost;
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${gsColor}40`}}
                              onClick={()=>!disabled&&doGoddessAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#f0d070",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0&&<span style={{color:"#60c060",marginLeft:3}}>FREE</span>}</span>
                                {a.gain[1]>0&&<span style={{fontSize:10,color:"#a08060"}}>+{a.gain[0]}–{a.gain[1]}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* Explore actions */}
                      <div style={{...C.secT,marginBottom:7,marginTop:10}}>Explore Her Form · {ap} AP</div>
                      <div style={C.grid3}>
                        {GODDESS_ACTIONS.filter(a=>a.type==="explore").map(a=>{
                          const disabled=ap<a.cost;
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${gsColor}30`,background:"rgba(20,12,0,0.8)"}}
                              onClick={()=>!disabled&&doGoddessAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#e0c080",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0&&<span style={{color:"#60c060",marginLeft:3}}>FREE</span>}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {(s.goddessOfferingsTotal||0)>0&&(
                        <div style={{fontSize:10,color:"#a08040",marginTop:8}}>✦ {(s.goddessOfferingsTotal||0).toLocaleString()} lbs offered while incarnate</div>
                      )}
                    </div>
                  );
                })()}

                {/* Primordial action panel */}
                {s.ascensionPath==="primordial"&&(()=>{
                  const pg=getPrimordialStage(s.lbs);
                  const pgLabel=s.primordialTriumvirateUnlocked?"🔱 Primordial Triumvirate":pg?`🌍 ${pg.label}`:"🌍 Bloodroot";
                  const pgColor=s.primordialTriumvirateUnlocked?"#c8a060":pg?pg.color:"#3d1a0a";
                  const pgDesc=s.primordialTriumvirateUnlocked?PRIMORDIAL_TRIUMVIRATE_BODY_DESC:pg?pg.desc:"...";
                  const actions=[...PRIMORDIAL_ACTIONS,...(s.primordialTriumvirateUnlocked?PRIMORDIAL_TRIUMVIRATE_ACTIONS:[])];
                  const incarnateStudent=primordialGoddessIncarnateId?students.find(st=>st.id===primordialGoddessIncarnateId):null;
                  const canSubsume=!incarnateStudent&&pg&&pg.id>=5&&religion&&religion.devotees>=1;
                  return(
                    <div style={{background:"rgba(8,4,2,0.95)",border:`2px solid ${pgColor}80`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:pgColor,marginBottom:4}}>🌍 THE PRIMORDIAL</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:pgColor}}>{pgLabel}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      {pg&&!s.primordialTriumvirateUnlocked&&(
                        <div style={{fontSize:10,color:"#888",marginBottom:6}}>Stage {pg.id}/5{pg.id<5&&` · next: ${PRIMORDIAL_STAGES[pg.id].min.toLocaleString()} lbs`}</div>
                      )}
                      <div style={{fontSize:11,color:"#b0a090",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{pgDesc.substring(0,200)}…</div>
                      {/* Goddess incarnate */}
                      {incarnateStudent&&(
                        <div style={{background:"rgba(40,20,0,0.5)",border:"1px solid #a0704080",borderRadius:7,padding:8,marginBottom:10}}>
                          <div style={{fontSize:10,color:"#c08040",marginBottom:4}}>🌿 THE INCARNATED GODDESS</div>
                          <div style={{fontSize:11,color:"#c09050"}}>{incarnateStudent.name} — {Math.round(incarnateStudent.lbs).toLocaleString()} lbs</div>
                          <button style={{...C.btn("#5a3a00"),marginTop:6,width:"100%",fontSize:11,opacity:ap>=5?1:0.4}}
                            onClick={()=>ap>=5&&consumePrimordialIncarnatedGoddess(s.id)}>
                            🌿 Consume the Incarnated Goddess (5 AP)
                          </button>
                        </div>
                      )}
                      {canSubsume&&!s.primordialTriumvirateUnlocked&&(
                        <button style={{...C.btn("#2a1800"),width:"100%",marginBottom:10,fontSize:11}}
                          onClick={triggerPrimordialGoddessIncarnation}>
                          🌍 Subsume the Other Religion
                        </button>
                      )}
                      {/* Action grid */}
                      <div style={{...C.secT,marginBottom:7}}>Primordial Actions · {ap} AP</div>
                      <div style={C.grid3}>
                        {actions.map(a=>{
                          const disabled=ap<a.apCost||(a.needsDevotee&&(!religion||religion.devotees<1))||(a.oneTime&&a.id==="ptr_final"&&primordialFinalConsumptionDone);
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${pgColor}40`}}
                              onClick={()=>!disabled&&doPrimordialAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:pgColor,marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.apCost} AP</span>
                                {a.gainRange&&a.gainRange[1]>0&&<span style={{fontSize:10,color:"#685040"}}>+{a.gainRange[0]}–{a.gainRange[1]}</span>}
                                {a.needsDevotee&&<span style={{fontSize:9,color:"#a05050"}}>devotee</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* ── EP2: EVOLUTION SECTION ── */}
                {!s.ascensionPath&&(()=>{
                  const canOffer=s.archetype==='culinary'
                    ?!s.evolvedForm&&lilithUnlocked&&lilithKillCount>=1&&s.relationship>=60&&!!EVOLUTION_OFFER[s.archetype]
                    :!s.evolvedForm&&st.id>=4&&s.relationship>=60&&!!EVOLUTION_OFFER[s.archetype];
                  const hasEvolved=!!s.evolvedForm;
                  const meta=hasEvolved?EVOLVED_ACTIVITY_META[s.evolvedForm]:null;
                  const tree=hasEvolved?EVOLVED_SKILL_TREES[s.evolvedForm]||[]:[];
                  const skills=s.evolvedSkills||[];
                  const totalGained=s.lbs-s.startLbs;
                  const spent=s.evolvedSkillsSpent||0;
                  const availLbs=totalGained-spent;
                  if(!canOffer&&!hasEvolved) return null;
                  return(
                    <div style={{marginBottom:14}}>
                      {canOffer&&!hasEvolved&&(()=>{
                        const blurb=EVOLUTION_BUTTON_BLURB[s.archetype];
                        return(
                          <div style={{background:"rgba(40,10,80,0.5)",border:"1px solid #7030c0",borderRadius:10,padding:12,marginBottom:10}}>
                            <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:5}}>✦ EVOLUTION AVAILABLE</div>
                            <div style={{fontSize:12,color:"#c0a0e0",lineHeight:1.75,marginBottom:8,fontStyle:"italic"}}>
                              {blurb?blurb(s):`${s.name} has grown into something the original path can't contain. A new direction is possible.`}
                            </div>
                            <button style={{...C.btn("#5a18b0"),width:"100%"}} onClick={()=>openEvolutionModal(s)}>
                              ✦ Propose a New Direction
                            </button>
                          </div>
                        );
                      })()}
                      {hasEvolved&&(()=>{
                        const evFormMeta=EVOLVED_FORM_META[s.evolvedForm];
                        const borderColor=evFormMeta?`${evFormMeta.color}80`:"#6030b080";
                        const titleColor=evFormMeta?evFormMeta.color:"#c080ff";
                        // ── CULTIVATOR — custom panel ──
                        if(s.evolvedForm==='cultivator'&&cultivatorState){
                          const cs=cultivatorState;
                          const brown="#8B4513";
                          const exhausted=cs.harvestsCompleted>=4;
                          const hasActive=!!cs.testerName&&!exhausted;
                          const isDigesting=!hasActive&&!exhausted&&cs.digestWeeksLeft>0;
                          const digestPct=cs.digestTotalWeeks>0?(1-cs.digestWeeksLeft/cs.digestTotalWeeks)*100:0;
                          const testerStageName=cs.testerName?getStage(cs.testerLbs).label:'—';
                          const fatPct=Math.min(100,cs.fatBar);
                          const suspPct=Math.min(100,cs.suspicion/2);
                          return(
                            <div style={{background:"rgba(30,12,5,0.6)",border:`1px solid ${brown}80`,borderRadius:10,padding:12}}>
                              <div style={{fontSize:9,letterSpacing:3,color:brown,marginBottom:4}}>🍰 EVOLVED PATH</div>
                              <div style={{fontSize:13,fontWeight:700,color:"#CD853F",marginBottom:8}}>The Cultivator</div>
                              {exhausted?(
                                <div style={{color:"#7a4020",fontSize:11,fontStyle:"italic",padding:"8px 0"}}>All subjects cultivated. No further yield is possible.</div>
                              ):isDigesting?(
                                <div>
                                  <div style={{background:"rgba(10,4,0,0.5)",borderRadius:7,padding:"8px 10px",marginBottom:8}}>
                                    <div style={{fontSize:10,color:"#a07040",fontWeight:700,marginBottom:6}}>Reneé — digesting</div>
                                    <div style={{fontSize:9,color:"#7a5030",marginBottom:2}}>PROCESSING — {cs.digestWeeksLeft} week{cs.digestWeeksLeft!==1?"s":""} remaining</div>
                                    <div style={{background:"#1a0800",borderRadius:3,height:6,overflow:"hidden",marginBottom:8}}>
                                      <div style={{width:`${digestPct}%`,height:"100%",background:`linear-gradient(90deg,${brown},#CD853F)`,transition:"width 0.3s"}}/>
                                    </div>
                                    <div style={{fontSize:10,color:"#6a4020",fontStyle:"italic",lineHeight:1.5}}>She is unavailable. Passive gain suspended.</div>
                                  </div>
                                  <button style={{...C.btn("#2a0e04"),width:"100%"}} onClick={openDigestCheck}>
                                    👁 Check on Her
                                  </button>
                                </div>
                              ):!hasActive?(
                                <div>
                                  <div style={{color:"#9a6030",fontSize:11,lineHeight:1.6,marginBottom:10,fontStyle:"italic"}}>{RECRUITMENT_SCENE.slice(0,120)}…</div>
                                  <div style={{color:"#7a5030",fontSize:10,marginBottom:8}}>Cycles remaining: {4-cs.harvestsCompleted}/4</div>
                                  <button style={{...C.btn(brown),width:"100%"}} onClick={()=>openCultivatorRecruit()}>
                                    Recruit 🐷 <s style={{opacity:0.6}}>'Taste Tester'</s>
                                  </button>
                                </div>
                              ):(
                                <div>
                                  <div style={{background:"rgba(10,4,0,0.5)",borderRadius:7,padding:"8px 10px",marginBottom:8}}>
                                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                      <span style={{color:"#a07040",fontSize:11,fontWeight:700}}>{cs.testerName}</span>
                                      <span style={{color:"#906030",fontSize:10}}>{testerStageName} · {Math.round(cs.testerLbs)} lbs</span>
                                    </div>
                                    <div style={{marginBottom:3}}>
                                      <div style={{fontSize:9,color:"#7a5030",marginBottom:2}}>CULTIVATION {Math.round(fatPct)}%</div>
                                      <div style={{background:"#1a0800",borderRadius:3,height:6,overflow:"hidden"}}>
                                        <div style={{width:`${fatPct}%`,height:"100%",background:`linear-gradient(90deg,${brown},#CD853F)`,transition:"width 0.3s"}}/>
                                      </div>
                                    </div>
                                    <div>
                                      <div style={{fontSize:9,color:cs.suspicion>150?"#e05030":cs.suspicion>100?"#c07030":"#7a5030",marginBottom:2}}>SUSPICION {cs.suspicion}/200{cs.suspicion>150?" ⚠️":""}</div>
                                      <div style={{background:"#1a0800",borderRadius:3,height:6,overflow:"hidden"}}>
                                        <div style={{width:`${suspPct}%`,height:"100%",background:cs.suspicion>150?"#e05030":cs.suspicion>100?"#c07030":"#5a3020",transition:"width 0.3s"}}/>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{display:"flex",gap:6}}>
                                    <button style={{...C.btn("#3a1808"),flex:1,opacity:ap<1?0.4:1,fontSize:10}} onClick={()=>startCultivatorSession(s)}>
                                      🍰 Taste Test (1 AP)
                                    </button>
                                    <button style={{...C.btn("#5a2010"),flex:1,opacity:ap<1?0.4:1,fontSize:10}} onClick={()=>openCultivatorHarvest(s)}>
                                      ✓ Harvest (1 AP)
                                    </button>
                                  </div>
                                  <div style={{textAlign:"center",fontSize:9,color:"#5a3020",marginTop:6}}>
                                    Cycle {cs.harvestsCompleted+1} of 4 · {TESTER_APPEARANCE[cs.testerStageId]||""}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                        // ── COMMUNITY RESEARCHER — custom panel ──
                        if(s.evolvedForm==='community_researcher'&&communityResearcherState){
                          const crs=communityResearcherState;
                          const blue="#4a6fa5"; const lblue="#8fa8e0";
                          const allDone=crs.caseStudyStage>=4;
                          const isCRPairAvailable=(pair)=>{
                            if(crs.pairsUsed.includes(pair.id)) return false;
                            if(pair.unlockImmediate) return true;
                            return pair.studentIds.every(id=>{
                              const st=students.find(x=>x.id===id);
                              if(!st) return false;
                              const ok=getStage(st.lbs).id>=4&&st.relationship>=60;
                              if(id===10) return ok&&lilithUnlocked&&lilithKillCount>=1;
                              return ok;
                            });
                          };
                          const availCount=CASE_STUDY_PAIRS.filter(p=>isCRPairAvailable(p)).length;
                          return(
                            <div style={{background:"rgba(5,10,30,0.6)",border:`1px solid ${blue}80`,borderRadius:10,padding:12}}>
                              <div style={{fontSize:9,letterSpacing:3,color:blue,marginBottom:4}}>📋 EVOLVED PATH</div>
                              <div style={{fontSize:13,fontWeight:700,color:lblue,marginBottom:8}}>Community Researcher</div>
                              {!crs.thesisComplete?(
                                <div>
                                  <div style={{color:"#6080a0",fontSize:11,lineHeight:1.6,marginBottom:10,fontStyle:"italic"}}>
                                    The proposal is approved. You need only walk through the door and say the words.
                                  </div>
                                  <button style={{...C.btn(blue),width:"100%",opacity:ap<1?0.4:1}} onClick={()=>openThesisBoard(s)}>
                                    📜 Present Thesis (1 AP)
                                  </button>
                                </div>
                              ):allDone?(
                                crs.thesisApproved?(
                                  <div style={{color:"#6aaa80",fontSize:11,fontStyle:"italic",padding:"8px 0"}}>PhD Approved ✓</div>
                                ):crs.thesisRejected?(
                                  <div style={{color:"#a05060",fontSize:11,fontStyle:"italic",padding:"8px 0"}}>Thesis Rejected</div>
                                ):(
                                  <div>
                                    <div style={{fontSize:10,color:"#506090",marginBottom:6,fontStyle:"italic"}}>
                                      All four case studies complete. The committee is waiting.
                                    </div>
                                    <div style={{fontSize:9,color:"#405070",marginBottom:8}}>
                                      Cumulative suspicion: {crs.totalSuspicion||0} / 28
                                    </div>
                                    <button style={{...C.btn(blue),width:"100%",opacity:ap<1?0.4:1}} onClick={()=>openFinalReview(s)}>
                                      📋 Request Final Review (1 AP)
                                    </button>
                                  </div>
                                )
                              ):(
                                <div>
                                  <div style={{fontSize:10,color:"#6080b0",marginBottom:4}}>
                                    Case Study {crs.caseStudyStage+1} of 4
                                  </div>
                                  <div style={{fontSize:10,color:"#5070a0",marginBottom:10}}>
                                    {availCount} pair{availCount!==1?"s":""} available
                                    {crs.lastPairId?` · ${CASE_STUDY_PAIRS.find(p=>p.id===crs.lastPairId)?.label||''} recently studied`:''}
                                  </div>
                                  <button style={{...C.btn(blue),width:"100%",opacity:ap<1?0.4:1}} onClick={()=>openCaseStudyGrid(s)}>
                                    📋 Conduct Case Study (1 AP)
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        }
                        // ── CHAPTER HOSTESS — custom two-button layout ──
                        if(s.evolvedForm==='chapter_hostess'&&chapterHostessState){
                          const ch=chapterHostessState;

                          const canHangOut=ch.prepDaysLeft>0;
                          const feastReady=!ch.feastLogOpen&&!ch.feastPrepOpen;
                          return(
                            <div style={{background:"rgba(30,8,60,0.5)",border:`1px solid ${borderColor}`,borderRadius:10,padding:12}}>
                              <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:4}}>✦ EVOLVED PATH</div>
                              <div style={{fontSize:13,fontWeight:700,color:titleColor,marginBottom:6}}>Chapter Hostess</div>
                              <div style={{fontSize:10,color:"#9060c0",marginBottom:2}}>Feast Stage {ch.stageIdx+1} of 6</div>
                              <div style={{fontSize:11,color:canHangOut?"#b080e0":"#5040702",marginBottom:8,fontWeight:600}}>
                                {canHangOut?`Days until feast: ${ch.prepDaysLeft}`:"Feast day — ready when you are."}
                              </div>
                              <div style={{display:"flex",gap:6,marginBottom:8}}>
                                <button
                                  style={{...C.btn("#2a1060"),flex:1,opacity:canHangOut?1:0.3,fontSize:10}}
                                  onClick={()=>{if(canHangOut)setChapterHostessState(prev=>({...prev,hangoutOpen:true,hangoutStudentId:null,hangoutPhaseIdx:0,hangoutHistory:[]}))}}>
                                  🧑‍🤝‍🧑 Hang Out
                                </button>
                                <button
                                  style={{...C.btn("#401060"),flex:1,opacity:feastReady?1:0.3,fontSize:10}}
                                  onClick={()=>{if(feastReady)openFeastPrep()}}>
                                  🍽️ Begin Feast Prep
                                </button>
                              </div>
                              {/* Upgrade status */}
                              <div style={{background:"rgba(20,5,40,0.5)",borderRadius:7,padding:"7px 10px",fontSize:10,color:"#7050a0"}}>
                                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                                  <span>Menu</span><span style={{color:"#a070d0"}}>{MENU_TIERS[ch.menuUnlocks]?.label}</span>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                                  <span>Atmosphere</span><span style={{color:"#a070d0"}}>{ATMOSPHERE_TIERS[ch.atmosphereUnlocks]?.label}</span>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                  <span>Guest List</span><span style={{color:"#a070d0"}}>{GUEST_TIERS[ch.guestUnlocks]?.label}</span>
                                </div>
                              </div>
                              {ch.sisters&&(
                                <div style={{marginTop:8,fontSize:10,color:"#907080"}}>
                                  {ch.sisters.map(sis=>(
                                    <div key={sis.name} style={{display:"flex",justifyContent:"space-between"}}>
                                      <span>{sis.name}</span><span>{Math.round(sis.lbs)} lbs</span>
                                    </div>
                                  ))}
                                  {ch.stageIdx>=1&&(<div style={{display:"flex",justifyContent:"space-between"}}><span>Camille</span><span>{Math.round(ch.camille.lbs)} lbs</span></div>)}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return(
                        <div style={{background:"rgba(30,8,60,0.5)",border:`1px solid ${borderColor}`,borderRadius:10,padding:12}}>
                          <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:4}}>✦ EVOLVED PATH</div>
                          <div style={{fontSize:13,fontWeight:700,color:titleColor,marginBottom:4}}>{evFormMeta?.title||meta?.label||s.evolvedForm}</div>
                          <button style={{...C.btn("#401890"),opacity:ap<(meta?.apCost||1)?0.4:1,marginBottom:s.evolvedForm==='feedee_creator'&&getTier(s.relationship).id>=3?4:10,width:"100%"}} onClick={()=>doEvolvedActivity(s)}>
                            {meta?.label||"Activity"} ({meta?.apCost||1} AP) · +{meta?.gainRange?.[0]}–{meta?.gainRange?.[1]} lbs
                          </button>
                          {s.evolvedForm==='feedee_creator'&&getTier(s.relationship).id>=3&&(
                            <button style={{...C.btn("#804020"),opacity:ap<2?0.4:1,marginBottom:10,width:"100%"}} onClick={()=>startRecordingSession(s)}>
                              🎬 Film Her Session (2 AP)
                            </button>
                          )}
                          {tree.length>0&&(
                            <div>
                              <div style={{fontSize:9,letterSpacing:2,color:"#6030a0",marginBottom:6}}>EVOLVED SKILLS · {availLbs} lbs available</div>
                              {tree.map(sk=>{
                                const owned=skills.includes(sk.id);
                                const canBuy=!owned&&availLbs>=sk.cost;
                                return(
                                  <div key={sk.id} style={{background:owned?"rgba(60,20,100,0.5)":"rgba(20,5,40,0.4)",border:`1px solid ${owned?"#7040c080":"#30206030"}`,borderRadius:7,padding:"7px 9px",marginBottom:5,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                                    <div style={{flex:1}}>
                                      <div style={{fontSize:11,fontWeight:700,color:owned?"#c080ff":"#7050a0",marginBottom:1}}>{sk.label} {owned&&"✓"}</div>
                                      <div style={{fontSize:10,color:owned?"#9060c0":"#503070",lineHeight:1.4}}>{sk.desc}</div>
                                    </div>
                                    {!owned&&(
                                      <button style={{...C.smBtn,opacity:canBuy?1:0.35,fontSize:10,whiteSpace:"nowrap"}} onClick={()=>canBuy&&purchaseEvolvedSkill(s.id,sk.id)}>
                                        {sk.cost} lbs
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {s.evolvedForm==='psych_researcher'&&s.researchSubjectId!=null&&(()=>{
                            const subj=students.find(st=>st.id===s.researchSubjectId);
                            if(!subj) return null;
                            const sid=getStage(subj.lbs).id;
                            const tier=sid<=2?0:sid<=4?1:sid<=6?2:sid<=8?3:4;
                            const W=[36,46,58,72,86][tier];
                            const H=[60,56,50,44,38][tier];
                            const BR=[`50% 50% 55% 55%`,`50% 50% 58% 58%`,`50% 50% 65% 65%`,`50% 50% 70% 70%`,`50% 50% 75% 75%`][tier];
                            return(
                              <div style={{marginTop:10,padding:"10px 12px",background:"rgba(15,5,30,0.6)",border:"1px solid #4020806a",borderRadius:8}}>
                                <div style={{fontSize:9,letterSpacing:3,color:"#6b5b95",marginBottom:8}}>RESEARCH SUBJECT</div>
                                <div style={{display:"flex",alignItems:"center",gap:14}}>
                                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                                    <div style={{width:14,height:14,borderRadius:"50%",background:"#5030904d"}}/>
                                    <div style={{width:W,height:H,background:"#5030904d",borderRadius:BR,boxShadow:"0 0 6px #50309050",transition:"all 0.4s ease"}}/>
                                  </div>
                                  <div>
                                    <div style={{color:"#c0a0e0",fontSize:13,fontWeight:700}}>{subj.name}</div>
                                    <div style={{color:"#7050a0",fontSize:10}}>{getStage(subj.lbs).label} · {Math.round(subj.lbs)} lbs</div>
                                    <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                                      {s.researchFocus==='feeder_focus'&&FEEDER_SUBJECT_JOURNALS[subj.archetype]&&(
                                        <button style={{...C.smBtn,fontSize:10}} onClick={()=>setSubjectJournalState({subjectId:subj.id,currentPage:getStage(subj.lbs).id})}>📔 Journal</button>
                                      )}
                                      {NADIA_SUBJECT_JOURNALS[subj.archetype]&&(
                                        <button style={{...C.smBtn,fontSize:10,background:"#0a0020",border:"1px solid #5030a040"}} onClick={()=>setNadiaNotesState({nadiaId:s.id,subjectId:subj.id,currentPage:-1})}>📓 Notes</button>
                                      )}
                                      <button style={{...C.smBtn,fontSize:10,opacity:0.7}} onClick={()=>{setStudents(prev=>prev.map(x=>x.id===s.id?{...x,researchSubjectId:null}:x));}}>Change</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        );
                      })()}
                    </div>
                  );
                })()}


          

                {/* Personal actions — hidden for convergence/singularity/goddess students */}
                {s.ascensionPath!=="convergence"&&!s.incarnatedGoddess&&(
                <>
                <div style={{...C.secT,marginBottom:7}}>Personal Actions · {ap} AP</div>
                <div style={C.grid3}>
                  {effectiveSingleActions.map(a=>(
                    <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}} onClick={()=>doSingle(a,s)}>
                      <div style={{fontWeight:700,fontSize:12,color:"#c090e8",marginBottom:2}}>{a.label}</div>
                      <div style={{fontSize:10,color:"#5a3888",lineHeight:1.4,marginBottom:4}}>{a.desc}</div>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0?<span style={{color:"#60c060",marginLeft:3}}>FREE</span>:null}</span>
                        <span style={{fontSize:10,color:"#685040"}}>interactive evening</span>
                      </div>
                    </div>
                  ))}
                </div>
                </>
                )}

                {/* Private Session */}
                {(()=>{
                  const tier=getTier(s.relationship);
                  const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
                  const eligible=tier.id>=1;
                  return(
                    <div style={{marginTop:14}}>
                      <div style={{...C.secT,marginBottom:7,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <span>Private Feeding Session</span>
                        {hist.count>0&&<span style={{fontSize:9,color:"#7040c0",fontWeight:400}}>{hist.count} sessions · +{hist.totalGain} lbs · capacity +{hist.capacityBonus}</span>}
                      </div>
                      {!eligible?(
                        <div style={{fontSize:11,color:"#5a3888"}}>
                          Reach <span style={{color:"#7040a0",fontWeight:700}}>🤝 Close</span> tier to unlock private sessions with {s.name}.
                          <span style={{color:"#5030a0",marginLeft:6}}>{45-s.relationship > 0 ? `(${45-s.relationship}% to go)`:""}</span>
                        </div>
                      ):(
                        <div>
                          {hist.count>0&&(
                            <div style={{...C.infoBox("rgba(60,10,100,0.2)"),fontSize:11,color:"#8050b0",marginBottom:8,lineHeight:1.6}}>
                              {hist.count} session{hist.count!==1?"s":""} completed.
                              Her appetite has expanded — she can now comfortably eat {hist.capacityBonus}% more than when you started.
                            </div>
                          )}
                          <button style={{...C.btn("#5818a8"),opacity:ap<2?0.4:1}} onClick={()=>startPrivateSession(s)}>
                            🌙 Private Session (2 AP)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* EP5: Intimacy */}
                {(()=>{
                  const tier=getTier(s.relationship);
                  if(tier.id<2||s.ascensionPath) return null;
                  return(
                    <div style={{marginTop:14}}>
                      <div style={C.secT}>Intimacy</div>
                      <div style={{fontSize:11,color:"#7050a0",marginBottom:8,fontStyle:"italic"}}>
                        She trusts you completely. The space between you has changed.
                      </div>
                      <button style={{...C.btn("#6020a0"),opacity:ap<1?0.4:1}} onClick={()=>openIntimacySelector(s)}>
                        💜 Get Close (1–2 AP)
                      </button>
                    </div>
                  );
                })()}

              </div>
            );
}
