import { ACHIEVEMENT_LIST } from '../gameData/sessions.js';
import { C } from '../styles.js';
import { CELESTIAL_STAGES, CONVERGENCE_STAGE, PRIMORDIAL_RITES, PRIMORDIAL_STAGES, RELIGION_RITES, SANGUINE_ACTIONS, SANGUINE_STAGES, SINGULARITY_RITES, SINGULARITY_STAGES, UMBRAL_STAGES, VERDANT_ACTIONS, VERDANT_STAGES } from '../gameData/ascension.js';
import { getPrimordialStage, getSingularityStage } from '../utils/gameHelpers.js';
import { getStage } from '../gameData/stages.js';

export function AchievementsView({ achievements }){
  return(
            <div>
              <p style={C.secT}>Achievements — {achievements.length}/{ACHIEVEMENT_LIST.length} unlocked</p>
              <div style={C.grid2}>
                {ACHIEVEMENT_LIST.map(a=>{
                  const unlocked=achievements.includes(a.id);
                  return(
                    <div key={a.id} style={{...C.card,cursor:"default",opacity:unlocked?1:0.4,border:unlocked?"1px solid #4a18a0":"1px solid #180830"}}>
                      <div style={{fontSize:16,marginBottom:4}}>{a.label}</div>
                      <div style={{fontSize:11,color:unlocked?"#c0a0e8":"#5a4070"}}>{a.desc}</div>
                      {unlocked&&<div style={{fontSize:10,color:"#7040c0",marginTop:4}}>✓ Unlocked</div>}
                    </div>
                  );
                })}
              </div>
            </div>
  );
}

export function DivinePanel({ addBlobToReligion, ap, ascendStudent, celestialMassBless, celestialMassPull, celestialMassPush, consumedStudents, divineRiteBlobMult, doPrimordialRite, doSanguineAction, doSingularityRite, doVerdantAction, foundReligion, holdRite, recoverConsumedStudent, religion, sanguineMarks, students, umbralConsumeStudent, umbralVoidPull, verdantCultivations }){
            const ascended=students.filter(s=>s.ascensionPath&&s.ascensionPath!=="convergence"&&s.ascensionPath!=="primordial");
            const celestials=ascended.filter(s=>s.ascensionPath==="celestial");
            const umbrals=ascended.filter(s=>s.ascensionPath==="umbral");
            const sanguines=ascended.filter(s=>s.ascensionPath==="sanguine");
            const verdants=ascended.filter(s=>s.ascensionPath==="verdant");
            const singularities=students.filter(s=>s.ascensionPath==="convergence");
            const primordials=students.filter(s=>s.ascensionPath==="primordial");
            const blobsEligible=students.filter(s=>getStage(s.lbs).id>=10&&!s.ascensionPath);
            return(
              <div>
                <p style={C.secT}>✦ Divine Realm</p>

                {/* Goddess message */}
                <div style={{background:"rgba(20,5,40,0.8)",border:"1px solid #6030c080",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8050c0",marginBottom:6}}>THE GODDESS SPEAKS</div>
                  <div style={{fontSize:13,color:"#d0b0f0",fontStyle:"italic",lineHeight:1.85}}>
                    {singularities.length>0
                      ? "The Singularity has been achieved. The goddess is silent, because she is pleased beyond words."
                      : umbrals.some(u=>u.ascensionStage>=4)&&celestials.some(c=>c.ascensionStage>=4)
                      ? "An Umbral Sovereign and a Celestial Apex exist simultaneously. The convergence is possible. The choice is yours."
                      : ascended.length===0
                      ? "The vision has been received. You may now ascend any Blob-stage student along the Celestial or Umbral path. Find them in the class roster."
                      : "The paths are open. She watches your class with great interest. Make them vast."}
                  </div>
                </div>

                {/* Blob-eligible students */}
                {blobsEligible.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>Eligible for Ascension</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {blobsEligible.map(s=>(
                        <div key={s.id} style={{...C.card,cursor:"default"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                            <span style={{fontWeight:700,fontSize:14,color:"#d8a8ff"}}>{s.name}</span>
                            <span style={{fontSize:11,color:"#806090"}}>{s.lbs} lbs · {getStage(s.lbs).label}</span>
                          </div>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            <button style={{...C.btn("#3020a0"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"celestial")}>✦ Celestial</button>
                            <button style={{...C.btn("#800010"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"umbral")}>🌑 Umbral</button>
                            <button style={{...C.btn("#6b1010"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"sanguine")}>🩸 Sanguine</button>
                            <button style={{...C.btn("#0a3a0a"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"verdant")}>🌿 Verdant</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Celestial roster */}
                {celestials.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>✦ Celestial ({celestials.length})</div>
                    {celestials.map(s=>{
                      const stage=CELESTIAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(40,10,100,0.35)",border:"1px solid #6040c060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#c0a8ff",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#9070d0",background:"rgba(80,30,160,0.3)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#8060a0"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#503080",marginTop:2}}>Next: {CELESTIAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>celestialMassPull(s.id,t.id)}>↓Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>↑Push {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>✦Bless {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Umbral roster */}
                {umbrals.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌑 Umbral ({umbrals.length})</div>
                    {umbrals.map(s=>{
                      const stage=UMBRAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(50,5,5,0.55)",border:"1px solid #80101060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#ff8080",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#cc5050",background:"rgba(80,5,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#a06060"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5 · {(s.consumedIds||[]).length} consumed</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#703030",marginTop:2}}>Next: {UMBRAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          {(s.consumedIds||[]).length>0&&(
                            <div style={{marginTop:5}}>
                              <div style={{fontSize:9,color:"#903030",letterSpacing:1,marginBottom:3}}>CONSUMED:</div>
                              {(s.consumedIds||[]).map(cid=>{
                                const cs=consumedStudents.find(x=>x.id===cid);
                                return cs?(
                                  <div key={cid} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#c07070",padding:"2px 0"}}>
                                    <span>{cs.name} ({cs.lbs} lbs)</span>
                                    <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>Release (3AP)</button>
                                  </div>
                                ):null;
                              })}
                            </div>
                          )}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>🌑Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>🌑Consume {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Sanguine roster */}
                {sanguines.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🩸 Sanguine ({sanguines.length})</div>
                    {sanguines.map(s=>{
                      const stage=SANGUINE_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(50,5,5,0.55)",border:"1px solid #cc303060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#ff8888",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#cc5050",background:"rgba(80,5,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#a06060"}}>{Math.round(s.lbs).toLocaleString()} lbs · Stage {(s.ascensionStage||0)+1}/5 · {sanguineMarks.filter(id=>students.find(st=>st.id===id)).length} marked</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#703030",marginTop:2}}>Next: {SANGUINE_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {SANGUINE_ACTIONS.map(a=>(
                              <button key={a.id} style={{...C.smBtn,fontSize:9,background:"rgba(80,10,10,0.5)",opacity:ap<a.apCost?0.4:1}}
                                onClick={()=>ap>=a.apCost&&doSanguineAction(s,a.id)}>
                                {a.label} ({a.apCost}AP)
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Verdant roster */}
                {verdants.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌿 Verdant ({verdants.length})</div>
                    {verdants.map(s=>{
                      const stage=VERDANT_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(5,30,5,0.55)",border:"1px solid #33663360",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#88cc88",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#55aa55",background:"rgba(5,40,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#70a070"}}>{Math.round(s.lbs).toLocaleString()} lbs · Stage {(s.ascensionStage||0)+1}/5 · {verdantCultivations.filter(id=>students.find(st=>st.id===id)).length} cultivated</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#305030",marginTop:2}}>Next: {VERDANT_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {VERDANT_ACTIONS.map(a=>(
                              <button key={a.id} style={{...C.smBtn,fontSize:9,background:"rgba(10,50,10,0.5)",opacity:ap<a.apCost?0.4:1}}
                                onClick={()=>ap>=a.apCost&&doVerdantAction(s,a.id)}>
                                {a.label} ({a.apCost}AP)
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Singularity */}
                {singularities.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>⚡ The Singularity</div>
                    {singularities.map(s=>{
                      const sg=getSingularityStage(s.lbs);
                      const sgLabel=s.triumvirateUnlocked?"🔱 The Triumvirate":sg?sg.label:CONVERGENCE_STAGE.label;
                      const sgColor=s.triumvirateUnlocked?"#ffd700":sg?sg.color:"#ffffff";
                      return(
                        <div key={s.id} style={{background:"rgba(20,20,20,0.9)",border:`2px solid ${sgColor}60`,borderRadius:8,padding:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <div style={{fontWeight:700,color:sgColor,fontSize:14}}>{s.name}</div>
                            <div style={{fontSize:11,color:sgColor,background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"1px 8px"}}>{sgLabel}</div>
                          </div>
                          <div style={{fontSize:11,color:"#e0e0e0",marginBottom:4}}>{Math.round(s.lbs).toLocaleString()} lbs{sg&&sg.id<5?` · next: ${SINGULARITY_STAGES[sg.id].min.toLocaleString()}`:" · MAX"}</div>
                          <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65}}>{sg?sg.desc:CONVERGENCE_STAGE.aura}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Primordial roster */}
                {primordials.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌍 The Primordial</div>
                    {primordials.map(s=>{
                      const pg=getPrimordialStage(s.lbs);
                      const pgLabel=s.primordialTriumvirateUnlocked?"🔱 Primordial Triumvirate":pg?pg.label:"Bloodroot";
                      const pgColor=s.primordialTriumvirateUnlocked?"#c8a060":pg?pg.color:"#3d1a0a";
                      return(
                        <div key={s.id} style={{background:"rgba(8,4,2,0.9)",border:`2px solid ${pgColor}60`,borderRadius:8,padding:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <div style={{fontWeight:700,color:pgColor,fontSize:14}}>{s.name}</div>
                            <div style={{fontSize:11,color:pgColor,background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"1px 8px"}}>{pgLabel}</div>
                          </div>
                          <div style={{fontSize:11,color:"#c0a080",marginBottom:4}}>{Math.round(s.lbs).toLocaleString()} lbs{pg&&pg.id<5?` · next: ${PRIMORDIAL_STAGES[pg.id].min.toLocaleString()}`:" · MAX"}</div>
                          <div style={{fontSize:11,color:"#a08060",fontStyle:"italic",lineHeight:1.65}}>{pg?pg.desc:"Ancient hunger, ancient patience."}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Religion panel */}
                <div style={{background:"rgba(30,5,20,0.6)",border:"1px solid #80204060",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#b04060",marginBottom:8}}>⛪ RELIGION</div>
                  {!religion?(
                    <div>
                      <div style={{fontSize:12,color:"#906070",lineHeight:1.7,marginBottom:10}}>
                        Found a religion centred on an ascended blob. Devotees gather. The student body grows heavier in proximity to the sacred.
                      </div>
                      {[...ascended,...sanguines,...verdants,...singularities,...primordials].length>0?(
                        <div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {[...ascended,...sanguines,...verdants,...singularities,...primordials].map(s=>(
                            <button key={s.id} style={C.btn("#401020")} onClick={()=>foundReligion(s.id)}>
                              ⛪ Found religion around {s.name} (2AP)
                            </button>
                          ))}
                        </div>
                      ):(
                        <div style={{fontSize:11,color:"#604050"}}>Ascend a student first to found a religion.</div>
                      )}
                    </div>
                  ):(
                    <div>
                      <div style={{display:"flex",gap:14,marginBottom:10,flexWrap:"wrap"}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#e08090"}}>{religion.devotees}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#d06070"}}>{religion.ritesHeld}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>RITES HELD</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#c05060"}}>{religion.worshippedIds.length}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>BLOBS WORSHIPPED</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#b04050"}}>{(religion.weeklyPassiveGain||0).toFixed(1)}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES/WEEK</div>
                        </div>
                      </div>
                      <div style={{fontSize:10,color:"#704050",marginBottom:8}}>
                        Founded week {religion.founded} · {religion.worshippedIds.map(id=>students.find(s=>s.id===id)?.name||"?").join(", ")}
                      </div>
                      {/* Add more blobs to religion */}
                      {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).length>0&&(
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:10,color:"#805060",marginBottom:4}}>Add to pantheon:</div>
                          {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).map(s=>(
                            <button key={s.id} style={{...C.smBtn,marginBottom:3,display:"block"}} onClick={()=>addBlobToReligion(s.id)}>
                              ⛪ {s.name} (+2 devotees)
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Hold Rites */}
                      <div style={{fontSize:10,color:"#904050",marginBottom:6}}>Hold a Rite:</div>
                      <div style={{display:"flex",flexDirection:"column",gap:5}}>
                        {RELIGION_RITES.map(rite=>(
                          <div key={rite.id} style={{background:"rgba(40,0,20,0.5)",border:"1px solid #80204040",borderRadius:7,padding:9}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                              <span style={{fontSize:12,fontWeight:700,color:"#e08090"}}>{rite.label}</span>
                              <span style={{fontSize:10,color:"#704050"}}>{rite.apCost} AP · +{rite.devoteeGain} devotees · +{rite.scrutiny} scrutiny</span>
                            </div>
                            <div style={{fontSize:10,color:"#905060",marginBottom:6}}>Blob gains +{Math.round(rite.blobBonus*divineRiteBlobMult)} lbs</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {religion.worshippedIds.map(bid=>{
                                const blob=students.find(s=>s.id===bid);
                                return blob?(
                                  <button key={bid} style={{...C.btn("#50102030"),fontSize:10}} onClick={()=>holdRite(rite,bid)}>
                                    {rite.label} for {blob.name}
                                  </button>
                                ):null;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Singularity rites (shown when a singularity student exists) */}
                      {singularities.length>0&&(
                        <div style={{marginTop:12}}>
                          <div style={{fontSize:10,color:"#a080c0",marginBottom:6}}>⚡ Singularity Rites:</div>
                          <div style={{display:"flex",flexDirection:"column",gap:5}}>
                            {SINGULARITY_RITES.map(rite=>{
                              const sgStudent=singularities[0];
                              const canAfford=ap>=rite.apCost&&religion.devotees>=(rite.devoteeMin||0)&&religion.devotees>=(rite.devoteeCost||0);
                              return(
                                <div key={rite.id} style={{background:"rgba(20,5,40,0.6)",border:"1px solid #6020a040",borderRadius:7,padding:9,opacity:canAfford?1:0.45}}>
                                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                                    <span style={{fontSize:11,fontWeight:700,color:"#c090e0"}}>{rite.label}</span>
                                    <span style={{fontSize:10,color:"#806090"}}>{rite.apCost} AP{rite.devoteeMin?` · ${rite.devoteeMin} dev min`:""}</span>
                                  </div>
                                  <div style={{fontSize:10,color:"#806070",marginBottom:5,fontStyle:"italic"}}>{rite.desc}</div>
                                  <button style={{...C.btn("#301050"),fontSize:10,width:"100%"}} onClick={()=>doSingularityRite(rite)}>
                                    {rite.label} ({sgStudent.name})
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {/* Primordial rites */}
                      {primordials.length>0&&(
                        <div style={{marginTop:12}}>
                          <div style={{fontSize:10,color:"#a06030",marginBottom:6}}>🌍 Primordial Rites:</div>
                          <div style={{display:"flex",flexDirection:"column",gap:5}}>
                            {PRIMORDIAL_RITES.map(rite=>{
                              const pgStudent=primordials[0];
                              const canAfford=ap>=rite.apCost&&religion.devotees>=(rite.devoteeMin||0)&&religion.devotees>=(rite.devoteeCost||0);
                              return(
                                <div key={rite.id} style={{background:"rgba(20,8,2,0.6)",border:"1px solid #a0603040",borderRadius:7,padding:9,opacity:canAfford?1:0.45}}>
                                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                                    <span style={{fontSize:11,fontWeight:700,color:"#c08040"}}>{rite.label}</span>
                                    <span style={{fontSize:10,color:"#806040"}}>{rite.apCost} AP{rite.devoteeMin?` · ${rite.devoteeMin} dev min`:""}</span>
                                  </div>
                                  <div style={{fontSize:10,color:"#806050",marginBottom:5,fontStyle:"italic"}}>{rite.desc}</div>
                                  <button style={{...C.btn("#3a1800"),fontSize:10,width:"100%"}} onClick={()=>doPrimordialRite(rite)}>
                                    {rite.label} ({pgStudent.name})
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
}
