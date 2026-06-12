import { EVOLUTION_BUTTON_BLURB, EVOLUTION_OFFER, EVOLVED_ACTIVITY_META, EVOLVED_FORM_META, FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../gameData/evolvedForms.js';
import { ATMOSPHERE_TIERS, GUEST_TIERS, MENU_TIERS } from '../gameData/chapterHostess.js';
import { C } from '../styles.js';
import { LilithPixelArt } from '../components/LilithPixelArt.jsx';
import { BRANDS, getBrandControlLabel, getStreamVoiceLabel } from '../gameData/streaming.js';
import { formatMoney } from '../gameData/wallet.js';
import { getCorruptionTier, CORRUPTION_CONFIG } from '../gameData/corruption.js';
import { CASE_STUDY_PAIRS } from '../gameData/communityResearcher.js';
import { EVOLVED_SKILL_TREES } from '../gameData/skills.js';
import { INNER_CIRCLE_TIERS, getTier } from '../gameData/sessions.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { RECRUITMENT_SCENE, TESTER_APPEARANCE } from '../gameData/cultivator.js';
import { getAttitude, getBodyDesc, getDiary, getOutfit, pharmacistTextOpts } from '../utils/gameHelpers.js';
import { COMPOUNDS, PHARMACIST_STAGES, PHARMACIST_ACTIVITIES } from '../gameData/pharmacist.js';
import { INVENTOR_PATH_STAGES, INVENTOR_ACTIVITIES } from '../gameData/talia.js';
import { networkSummary } from '../gameData/networkState.js';
import { getAvailableDeviceActions, getBodyOverrideBadge } from '../gameData/deviceActions.js';
import { EquipmentButton } from '../components/StudentEquipModal.jsx';
import { formatIngredientBag } from '../gameData/pharmacistIngredients.js';
import { CAMPUS_NARRATIVE_LABELS, getCampusNarrativeTier } from '../gameData/pharmacistCampus.js';
import { getAddictionLevel, getHungerTier, HUNGER_TIERS, ADDICTION_LEVELS } from '../gameData/hungerAddiction.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { TALK_CONFIG } from '../gameData/talkSystem.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';

export function StudentDetailView({ openWeighIn, openTalk, ap, chapterHostessState, communityResearcherState, cultivatorState, pharmacistState, labState, deviceInventory, runPharmacistSynthesis, runPharmacistCultDistribution, runLabSession, openLabView, openNetworkView, openNetworkControl, openEquipModal, runDeviceAction, unequipDeviceSlot, doEvolvedActivity, doSingle, effectiveSingleActions, lilithKillCount, lilithUnlocked, openCaseStudyGrid, openCultivatorHarvest, openCultivatorRecruit, openDigestCheck, openEvolutionModal, openFeastPrep, openFinalReview, openIntimacySelector, openLilithHunt, openThesisBoard, purchaseEvolvedSkill, openDestinySpend, sel, sessionHistory, setChapterHostessState, setNadiaNotesState, setStudents, setSubjectJournalState, setView, startCultivatorSession, startPrivateSession, startRecordingSession, startStream, students, week }){
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
                <div style={{...C.card,cursor:"default",marginBottom:10,borderColor:detailEvMeta?`${detailEvMeta.color}60`:""}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <h2 style={{margin:0,color:detailEvMeta?detailEvMeta.color:"#d8a8ff",fontSize:22}}>{s.name}</h2>
                      {detailEvMeta&&<span style={{fontSize:11,fontWeight:700,color:detailEvMeta.color,background:`${detailEvMeta.color}22`,borderRadius:6,padding:"2px 8px"}}>✦ {detailEvMeta.title}</span>}
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
                  </div>
                </div>
                );})()}

                {/* Appearance */}
                <div style={C.infoBox("rgba(70,15,110,0.25)")}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <div style={{fontSize:9,color:"#5028a0",letterSpacing:2}}>CURRENT APPEARANCE</div>
                    {(()=>{
                      const badge=getBodyOverrideBadge(s);
                      return badge?(
                        <span style={{...C.tag(`${badge.color}30`,badge.color),fontSize:8}}>{badge.label}</span>
                      ):null;
                    })()}
                  </div>
                  <div style={{fontSize:13,color:"#e0d0b0",lineHeight:1.8,fontStyle:"italic"}}>{getBodyDesc(s, week)}</div>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <EquipmentButton onClick={() => openEquipModal?.(s.id)} />
                </div>

                {getAvailableDeviceActions(s,{deviceInventory}).length>0&&(
                  <div style={C.infoBox("rgba(30,40,55,0.4)")}>
                    <div style={{fontSize:9,color:"#506080",letterSpacing:2,marginBottom:6}}>DEVICE ACTIONS</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {getAvailableDeviceActions(s,{deviceInventory}).map(act=>(
                        <button key={act.id} style={{...C.smBtn,fontSize:10}} onClick={()=>runDeviceAction(act.id,s.id)}>
                          {act.icon} {act.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outfit */}
                <div style={C.infoBox("rgba(50,10,90,0.25)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>OUTFIT</div>
                  <div style={{fontSize:12,color:"#c0a8d8",lineHeight:1.7}}>{getOutfit(s)}</div>
                </div>

                {/* Stage reaction */}
                <div style={C.infoBox("rgba(40,8,70,0.35)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>CURRENT ATTITUDE</div>
                  <div style={{fontSize:13,color:"#e8d8a8",fontStyle:"italic",lineHeight:1.75}}>
                    "{getAttitude(s, week, pharmacistTextOpts(pharmacistState, week))}"
                  </div>
                </div>

                {/* Hunger / addiction (subtle) */}
                {(getAddictionLevel(s)>0||getHungerTier(s)>0)&&(
                  <div style={C.infoBox("rgba(50,20,10,0.25)")}>
                    <div style={{fontSize:9,color:"#804030",letterSpacing:2,marginBottom:4}}>CRAVING STATE</div>
                    <div style={{fontSize:12,color:"#c8a090",lineHeight:1.7}}>
                      Hunger: {HUNGER_TIERS[getHungerTier(s)]?.label} · Addiction: {ADDICTION_LEVELS[getAddictionLevel(s)]?.label}
                    </div>
                  </div>
                )}

                {/* Diary */}
                <div style={C.infoBox("rgba(30,5,60,0.4)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>DIARY ENTRY</div>
                  <div style={{fontSize:12,color:"#c8b898",fontStyle:"italic",lineHeight:1.8}}>{getDiary(s, week, pharmacistTextOpts(pharmacistState, week))}</div>
                </div>

                {/* ── EP2: EVOLUTION SECTION ── */}
                {(()=>{
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
                        // ── MACHINE GODDESS (Talia) — custom panel ──
                        if(s.evolvedForm==='machine_goddess'&&labState){
                          const ls=labState;
                          const steel="#4a6080";
                          const stageMeta=INVENTOR_PATH_STAGES.find(x=>x.id===ls.stage);
                          const act=INVENTOR_ACTIVITIES[1];
                          const netSum=ls.stage>=2?networkSummary(ls):null;
                          return(
                            <div style={{background:"rgba(8,12,22,0.6)",border:`1px solid ${steel}80`,borderRadius:10,padding:12}}>
                              <div style={{fontSize:9,letterSpacing:3,color:steel,marginBottom:4}}>🔧 EVOLVED PATH</div>
                              <div style={{fontSize:13,fontWeight:700,color:"#90a8c8",marginBottom:6}}>Machine Goddess — {stageMeta?.label||'Tinkerer'}</div>
                              <div style={{fontSize:10,color:"#607090",marginBottom:8,lineHeight:1.6}}>
                                Instability {ls.instability??0}% · Sessions {ls.sessionsRun??0}
                                · 💡 {ls.breakthroughs??0} Breakthroughs
                                <div style={{marginTop:4}}>Talia: {Math.round(s.lbs)} lbs (builds spend her mass)</div>
                                {netSum&&(
                                  <div style={{marginTop:4,color:"#50c0e0"}}>
                                    Mesh: stability {netSum.stability}% · detection {netSum.detectionRisk}% · {netSum.nodeCount} nodes
                                    {ls.stage>=3&&` · integration ${netSum.integration}%`}
                                  </div>
                                )}
                              </div>
                              <div style={{fontSize:9,color:"#506070",marginBottom:8,lineHeight:1.5}}>{act.desc}</div>
                              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                                <button style={{...C.btn(steel),flex:"1 1 120px",opacity:ap<(act.apCost||1)?0.4:1}} onClick={()=>runLabSession(s)}>
                                  🔧 Run Lab Session ({act.apCost||1} AP)
                                </button>
                                <button style={{...C.btn("#2a3848"),flex:"1 1 100px"}} onClick={openLabView}>
                                  The Lab
                                </button>
                                {ls.stage>=2&&openNetworkControl&&(
                                  <button style={{...C.btn("#1a4050"),flex:"1 1 100px",opacity:ap<1?0.4:1}} onClick={()=>openNetworkControl(s)}>
                                    ⚙️ Network ({INVENTOR_ACTIVITIES[ls.stage]?.apCost||1} AP)
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }
                        // ── PHARMACIST (Sophia) — custom panel ──
                        if(s.evolvedForm==='pharmacist'&&pharmacistState){
                          const ps=pharmacistState;
                          const green="#2e6b5a";
                          const stageMeta=PHARMACIST_STAGES.find(x=>x.id===ps.stage);
                          const act=PHARMACIST_ACTIVITIES[ps.stage]||PHARMACIST_ACTIVITIES[1];
                          const actLabel=stageMeta?.label||'Chemist';
                          const stocked=(ps.unlockedCompounds||[]).filter(id=>(ps.compoundInventory?.[id]??0)>0);
                          const campusLabel=CAMPUS_NARRATIVE_LABELS[getCampusNarrativeTier(ps)];
                          const ingredients=formatIngredientBag(ps.ingredients||{});
                          const cult=ps.cult||{};
                          const purple="#6b4a8a";
                          return(
                            <div style={{background:"rgba(8,30,22,0.6)",border:`1px solid ${green}80`,borderRadius:10,padding:12}}>
                              <div style={{fontSize:9,letterSpacing:3,color:green,marginBottom:4}}>🧪 EVOLVED PATH</div>
                              <div style={{fontSize:13,fontWeight:700,color:"#6ab89a",marginBottom:6}}>The Chemist — {actLabel}</div>
                              <div style={{fontSize:10,color:"#508070",marginBottom:8,lineHeight:1.6}}>
                                Exposure {ps.exposureRisk}% · Sessions {ps.sessionsRun||0}
                                {campusLabel?` · ${campusLabel}`:""}
                                {(ps.synthesisPausedWeeks||0)>0?` · Synthesis paused ${ps.synthesisPausedWeeks}w`:""}
                              </div>
                              {ps.cultActive&&(
                                <div style={{background:"rgba(40,20,60,0.35)",border:`1px solid ${purple}50`,borderRadius:8,padding:8,marginBottom:8}}>
                                  <div style={{fontSize:9,letterSpacing:2,color:purple,marginBottom:4}}>🕯️ THE CIRCLE</div>
                                  <div style={{fontSize:10,color:"#9070b0",lineHeight:1.55,marginBottom:8}}>
                                    {cult.circleSize??0} devotees · Devotion {cult.devotion??0}% · Supply {cult.supplyReservoir??0}
                                    {cult.bulkProductionUnlocked?" · Bulk brew unlocked":""}
                                  </div>
                                  <button style={{...C.btn(purple),width:"100%",fontSize:11}} onClick={()=>runPharmacistCultDistribution(s)}>
                                    🕯️ Route Distribution (1–2 AP)
                                  </button>
                                </div>
                              )}
                              {ingredients.length>0&&(
                                <>
                                  <div style={{fontSize:9,color:"#406858",marginBottom:6}}>Saved ingredients:</div>
                                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                                    {ingredients.map(item=>(
                                      <span key={item.id} style={{...C.tag("rgba(46,107,90,0.2)","#8ad4b0"),fontSize:8}}>
                                        {item.icon} {item.label} ×{item.qty}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              )}
                              <div style={{fontSize:9,color:"#406858",marginBottom:6}}>Home lab stash:</div>
                              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                                {(ps.unlockedCompounds||[]).map(id=>{
                                  const qty=ps.compoundInventory?.[id]??0;
                                  return(
                                    <span key={id} style={{...C.tag(qty>0?"rgba(46,107,90,0.25)":"rgba(40,40,40,0.4)",qty>0?"#8ad4b0":"#666"),fontSize:8}}>
                                      {COMPOUNDS[id]?.label||id} ×{qty}
                                    </span>
                                  );
                                })}
                              </div>
                              {stocked.length===0&&(
                                <div style={{fontSize:9,color:"#a07050",fontStyle:"italic",marginBottom:8}}>
                                  Stash empty — brew a batch to lace feeds.
                                </div>
                              )}
                              <div style={{fontSize:9,color:"#406858",marginBottom:8,lineHeight:1.5}}>
                                {act.desc}
                              </div>
                              <button style={{...C.btn(green),width:"100%",opacity:ap<(act.apCost||1)?0.4:1}} onClick={()=>runPharmacistSynthesis(s)}>
                                {act.label||"🧪 Run Synthesis Session"} ({act.apCost||1} AP)
                              </button>
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
                                  {allDone?(
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
                              ):(
                                <div style={{fontSize:10,color:"#6080b0"}}>
                                  <button style={{...C.btn(blue),width:"100%",opacity:ap<1?0.4:1}} onClick={()=>openThesisBoard(s)}>
                                    📜 Present Thesis (1 AP)
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
                          {s.evolvedForm==='eating_streamer'&&s.brand&&(
                            <div style={{fontSize:10,color:"#e08090",marginBottom:6,padding:"6px 10px",background:"rgba(80,10,20,0.35)",borderRadius:6,border:"1px solid #e74c3c33"}}>
                              📡 Sponsor: <span style={{color:"#ff8090",fontWeight:700}}>{BRANDS[s.brand]?.name||s.brand}</span>
                              {s.audience!=null&&<span style={{color:"#a06070"}}> · {Math.round(s.audience)} followers</span>}
                              {(s.totalStreams||0)>0&&<span style={{color:"#a06070"}}> · {s.totalStreams} streams</span>}
                              {(s.brandStreaks?.[s.brand]||0)>0&&(
                                <span style={{color:"#ff6080"}}> · {getBrandControlLabel(s.brandStreaks[s.brand])} ({s.brandStreaks[s.brand]} streak)</span>
                              )}
                              {s.sponsorFavor?.[s.brand]!=null&&(
                                <span style={{color:"#c08090"}}> · favor {Math.round(s.sponsorFavor[s.brand])}%</span>
                              )}
                              {(s.destinyMoney||0)>0&&(
                                <span style={{color:"#ffe080"}}> · {formatMoney(s.destinyMoney)}</span>
                              )}
                              {s.streamVoice&&s.streamVoice!=='default'&&(
                                <span style={{color:"#ff90a0"}}> · {getStreamVoiceLabel(s.streamVoice)}</span>
                              )}
                            </div>
                          )}
                          {s.evolvedForm==='eating_streamer'&&s.brand&&openDestinySpend&&(
                            <button style={{...C.btn("#802030"),marginBottom:6,width:"100%"}} onClick={()=>openDestinySpend(s.id)}>
                              💸 Destiny&apos;s Shop
                            </button>
                          )}
                          {s.evolvedForm==='eating_streamer'&&(
                            <button style={{...C.btn("#a02030"),opacity:ap<2?0.4:1,marginBottom:10,width:"100%"}} onClick={()=>startStream(s)}>
                              {s.brand?'📡 Go Live (2 AP)':'📡 Sign Sponsor & Go Live'}
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

                {/* Talk */}
                <div style={{marginBottom:14}}>
                  <div style={{...C.secT,marginBottom:7}}>Conversation</div>
                  <button
                    style={{...C.btn("#6a28b0"),width:"100%",opacity:ap<TALK_CONFIG.apCost?0.45:1}}
                    disabled={ap<TALK_CONFIG.apCost}
                    onClick={()=>openTalk&&openTalk(s)}
                  >
                    💬 Talk with {s.name} ({TALK_CONFIG.apCost} AP)
                  </button>
                  <div style={{fontSize:10,color:"#6a4a88",marginTop:6,lineHeight:1.5}}>
                    Office-hours conversation — relationship, corruption, and topics unlocked by Spirit skills.
                  </div>
                </div>

                {/* Personal actions */}
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
                  if(tier.id<2) return null;
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
