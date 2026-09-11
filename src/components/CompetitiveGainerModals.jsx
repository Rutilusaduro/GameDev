// ═══════════════════════════════════════════════════════════════
// COMPETITIVE GAINER — Group Chat modal + Main Evolved modal
// ═══════════════════════════════════════════════════════════════
import { useEffect } from 'react';
import { C } from '../styles.js';
import { CG_CONFIG, CG_CHAT_TEMPLATES } from '../gameData/evolvedForms.js';
import { cgDrive, cgDriveDelta, cgIsRaMessage, cgSubstateGain } from '../gameData/competitiveGainerState.js';
import { getStage } from '../gameData/stages.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { renderCGSceneBeat } from '../textEngine/scenes/competitiveGainer/index.js';

const CG_BG = '#0a0306';
const CG_ACC = '#e8294a';
const CG_DIM = '#7a1530';
const CG_TEXT = '#f0d0d8';
const CG_SUBTLE = '#c08090';

export function CompetitiveGainerChatModal({ competitiveGainerState, students, getCGDriveTier, cgRaReply, setCgChatOpen, soundEnabled = true }){
  useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled]);
        const cgS=competitiveGainerState;
        const priya=students.find(s=>s.evolvedForm==='competitive_gainer');
        if(!priya||!cgS) return null;
        const drive=cgDrive(cgS);
        const tier=getCGDriveTier(drive);
        const leaveChat=()=>{ playHallPassSound('click', soundEnabled); setCgChatOpen(false); };
        return(
          <ModalOverlay onClose={leaveChat} soundEnabled={soundEnabled} style={{ zIndex: 370 }}>
            <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:580,background:CG_BG,border:`1px solid ${CG_ACC}40`,maxHeight:"88vh",overflowY:"auto"}}>
              <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC}}>💬 SOFTENING STATS</div>
                <div style={{marginLeft:"auto",fontSize:9,color:CG_DIM}}>Drive {drive} · {tier.label}</div>
              </div>
              {/* Chat log */}
              <div style={{maxHeight:320,overflowY:"auto",marginBottom:12,padding:"8px 10px",background:"rgba(232,41,74,0.04)",border:`1px solid ${CG_DIM}40`,borderRadius:5}}>
                {cgS.chatLog.length===0&&<div style={{fontSize:11,color:CG_SUBTLE,fontStyle:"italic"}}>No posts yet. Visit the corkboard to trigger the first post.</div>}
                {cgS.chatLog.map((msg,i)=>(
                  <div key={i} style={{marginBottom:8,paddingLeft:8,borderLeft:`2px solid ${cgIsRaMessage(msg)?CG_ACC:CG_DIM}40`}}>
                    <div style={{fontSize:10,color:cgIsRaMessage(msg)?CG_ACC:CG_TEXT,lineHeight:1.65}}>{msg.text}</div>
                    <div style={{fontSize:8,color:CG_SUBTLE,marginTop:2}}>Week {msg.wk}</div>
                  </div>
                ))}
              </div>
              {/* RA reply */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:9,letterSpacing:3,color:CG_DIM,marginBottom:6}}>REPLY AS RA</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {CG_CHAT_TEMPLATES.raReplies.map(opt=>(
                    <button type="button" className="competitive-gainer-choice-row" key={opt.id} style={{...C.btn(CG_DIM),fontSize:10,padding:"5px 10px"}}
                      onClick={()=>{ playHallPassSound('click', soundEnabled); cgRaReply(opt.id); }}>
                      {opt.label} <span style={{color:CG_ACC,marginLeft:4}}>+{cgDriveDelta(opt)} drive</span>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_BG),width:"100%",border:`1px solid ${CG_DIM}30`}} onClick={leaveChat}>Leave Chat</button>
            </div>
          </ModalOverlay>
        );
}

export function CompetitiveGainerMainModal({ competitiveGainerState, students, week = 1, getCGDriveTier, getMeasurements, lilithUnlocked, doCGMeasurement, setCompetitiveGainerState, applyAndCloseCGBinge, doCGCorkboard, openCGMeasurementPicker, doCGSelfReview, ap, setAp, doCGBinge, closeCGModal, soundEnabled = true }){
        const cgS=competitiveGainerState;
        const priya=students.find(s=>s.id===cgS.priyaStudentId);
        useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, cgS?.view, cgS?.priyaStudentId]);
        if(!priya) return null;
        const drive=cgDrive(cgS);
        const tier=getCGDriveTier(drive);
        const priyaM=getMeasurements(priya.lbs,priya.bodyType);
        const tierBarPct=Math.min(100,drive/60*100);
        const isBlob=getStage(priya.lbs).id>=10;
        const closeCG=()=>{ playHallPassSound('click', soundEnabled); closeCGModal(); };
        const wrap=(children,{dismissible=false}={})=>(
          <ModalOverlay onClose={closeCG} dismissible={dismissible} soundEnabled={soundEnabled} style={{ zIndex: 365 }}>
            {children}
          </ModalOverlay>
        );

        // ── Corkboard view ──
        if(cgS.view==='corkboard'){
          const{sceneText}=cgS.subState||{};
          const gain=cgSubstateGain(cgS.subState);
          return wrap(
              <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:540,background:CG_BG,border:`1px solid ${CG_ACC}40`}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC,marginBottom:12}}>📌 CORKBOARD</div>
                <div style={{fontSize:12,color:CG_TEXT,lineHeight:1.8,marginBottom:14,padding:"10px 12px",background:"rgba(232,41,74,0.06)",borderRadius:5}}>{renderCGSceneBeat(sceneText,priya,week,tier.label,'corkboard')}</div>
                <div style={{fontSize:10,color:CG_ACC,marginBottom:12}}>Drive +{gain} · Now {tier.label} ({drive})</div>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_ACC),width:"100%"}} onClick={()=>setCompetitiveGainerState(p=>({...p,view:null,subState:null}))}>← Back</button>
              </div>
          );
        }

        // ── Self-review view ──
        if(cgS.view==='self_review'){
          const{sceneText}=cgS.subState||{};
          const gain=cgSubstateGain(cgS.subState);
          return wrap(
              <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:540,background:CG_BG,border:`1px solid ${CG_ACC}40`}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC,marginBottom:12}}>📏 SELF-REVIEW</div>
                <div style={{fontSize:12,color:CG_TEXT,lineHeight:1.8,marginBottom:12,padding:"10px 12px",background:"rgba(232,41,74,0.06)",borderRadius:5}}>{renderCGSceneBeat(sceneText,priya,week,tier.label,'self_review')}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                  {CG_CONFIG.categories.map(cat=>(
                    <div key={cat} style={{background:"rgba(232,41,74,0.05)",border:`1px solid ${CG_DIM}40`,borderRadius:4,padding:"6px 8px",textAlign:"center"}}>
                      <div style={{fontSize:8,letterSpacing:2,color:CG_DIM}}>{cat.toUpperCase()}</div>
                      <div style={{fontSize:14,fontWeight:700,color:CG_ACC}}>{priyaM[cat]}"</div>
                    </div>
                  ))}
                  <div style={{background:"rgba(232,41,74,0.05)",border:`1px solid ${CG_DIM}40`,borderRadius:4,padding:"6px 8px",textAlign:"center"}}>
                    <div style={{fontSize:8,letterSpacing:2,color:CG_DIM}}>WEIGHT</div>
                    <div style={{fontSize:14,fontWeight:700,color:CG_ACC}}>{Math.round(priya.lbs)} lbs</div>
                  </div>
                  {isBlob&&(
                    <div style={{background:"rgba(232,41,74,0.05)",border:`1px solid ${CG_ACC}40`,borderRadius:4,padding:"6px 8px",textAlign:"center",gridColumn:"span 2"}}>
                      <div style={{fontSize:8,letterSpacing:2,color:CG_DIM}}>BREAST WEIGHT (EST.)</div>
                      <div style={{fontSize:12,fontWeight:700,color:CG_ACC}}>{Math.round(0.08*Math.pow(Math.max(0,priyaM.bust-28),1.6))} lbs ea.</div>
                    </div>
                  )}
                </div>
                <div style={{fontSize:10,color:CG_ACC,marginBottom:12}}>Drive +{gain}</div>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_ACC),width:"100%"}} onClick={()=>setCompetitiveGainerState(p=>({...p,view:null,subState:null}))}>← Back</button>
              </div>
          );
        }

        // ── Measurement picker ──
        if(cgS.view==='measurement_picker'){
          const measurableStudents=students.filter(s=>s.id!==priya.id&&(!s.hidden||lilithUnlocked));
          return wrap(
              <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:560,background:CG_BG,border:`1px solid ${CG_ACC}40`}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC,marginBottom:12}}>📐 SELECT WHO TO MEASURE</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                  {measurableStudents.map(s=>{
                    const measured=cgS.measuredStudentIds.includes(s.id);
                    return(
                      <button type="button" className="competitive-gainer-choice-row" key={s.id}
                        style={{...C.btn(measured?CG_DIM:"#1a0308"),padding:"8px 10px",textAlign:"left",border:`1px solid ${measured?CG_ACC:CG_DIM}40`}}
                        onClick={()=>doCGMeasurement(s.id)}>
                        <div style={{fontSize:11,fontWeight:700,color:CG_TEXT}}>{s.name}</div>
                        <div style={{fontSize:9,color:CG_SUBTLE}}>{Math.round(s.lbs)} lbs{measured?" ✓":""}</div>
                      </button>
                    );
                  })}
                </div>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_BG),width:"100%",border:`1px solid ${CG_DIM}30`}} onClick={()=>setCompetitiveGainerState(p=>({...p,view:null,subState:null}))}>← Back</button>
              </div>
          );
        }

        // ── Measurement result ──
        if(cgS.view==='measurement_result'){
          const{targetStudentId,priyaM:pM,targetM:tM,sceneText,reactions,threats}=cgS.subState||{};
          const gain=cgSubstateGain(cgS.subState);
          const target=students.find(s=>s.id===targetStudentId);
          if(!target) return null;
          return wrap(
              <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:560,background:CG_BG,border:`1px solid ${CG_ACC}40`,maxHeight:"88vh",overflowY:"auto"}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC,marginBottom:12}}>📐 MEASURING {target.name.toUpperCase()}</div>
                <div style={{fontSize:12,color:CG_TEXT,lineHeight:1.8,marginBottom:14,padding:"10px 12px",background:"rgba(232,41,74,0.06)",borderRadius:5}}>{renderCGSceneBeat(sceneText,priya,week,tier.label,'measurement')}</div>
                {/* Comparison table */}
                <div style={{marginBottom:12}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:4}}>
                    <div style={{fontSize:9,letterSpacing:2,color:CG_DIM}}></div>
                    <div style={{fontSize:9,letterSpacing:2,color:CG_ACC,textAlign:"center"}}>PRIYA</div>
                    <div style={{fontSize:9,letterSpacing:2,color:CG_SUBTLE,textAlign:"center"}}>{target.name.toUpperCase()}</div>
                  </div>
                  {CG_CONFIG.categories.map(cat=>{
                    const priyaWins=pM[cat]>tM[cat];
                    const reaction=reactions?.[cat];
                    return(
                      <div key={cat}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:"4px 0",borderBottom:`1px solid ${CG_DIM}20`}}>
                          <div style={{fontSize:10,color:CG_SUBTLE,textTransform:"capitalize"}}>{cat}</div>
                          <div style={{fontSize:11,fontWeight:700,color:priyaWins?CG_ACC:CG_TEXT,textAlign:"center"}}>{pM[cat]}"</div>
                          <div style={{fontSize:11,fontWeight:700,color:priyaWins?CG_SUBTLE:CG_TEXT,textAlign:"center"}}>{tM[cat]}"</div>
                        </div>
                        {reaction&&<div style={{fontSize:9,color:CG_SUBTLE,fontStyle:"italic",padding:"2px 0 4px 8px"}}>{renderCGSceneBeat(reaction.text,priya,week,tier.label,'reaction')}</div>}
                      </div>
                    );
                  })}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:"4px 0"}}>
                    <div style={{fontSize:10,color:CG_SUBTLE}}>weight</div>
                    <div style={{fontSize:11,fontWeight:700,color:priya.lbs>target.lbs?CG_ACC:CG_TEXT,textAlign:"center"}}>{Math.round(priya.lbs)} lbs</div>
                    <div style={{fontSize:11,fontWeight:700,color:priya.lbs>target.lbs?CG_SUBTLE:CG_TEXT,textAlign:"center"}}>{Math.round(target.lbs)} lbs</div>
                  </div>
                </div>
                {threats.length>0&&<div style={{fontSize:10,color:"#e07040",marginBottom:8}}>⚠ Threat detected: {threats.join(", ")} · Drive +{gain}</div>}
                {!threats.length&&<div style={{fontSize:10,color:CG_ACC,marginBottom:8}}>✓ Priya leads all categories · Drive +{gain}</div>}
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_ACC),width:"100%"}} onClick={()=>setCompetitiveGainerState(p=>({...p,view:'measurement_picker',subState:null}))}>← Measure Another</button>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_BG),width:"100%",marginTop:6,border:`1px solid ${CG_DIM}30`}} onClick={()=>setCompetitiveGainerState(p=>({...p,view:null,subState:null}))}>← Back to Priya</button>
              </div>
          );
        }

        // ── Binge view ──
        if(cgS.view==='binge'){
          const{gain,sceneText}=cgS.subState||{};
          return wrap(
              <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:520,background:CG_BG,border:`1px solid ${CG_ACC}40`}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC,marginBottom:12}}>🔴 {tier.label.toUpperCase()} BINGE</div>
                <div style={{fontSize:12,color:CG_TEXT,lineHeight:1.8,marginBottom:14,padding:"10px 12px",background:"rgba(232,41,74,0.06)",borderRadius:5}}>{renderCGSceneBeat(sceneText,priya,week,tier.label,'binge')}</div>
                <div style={{fontSize:13,fontWeight:700,color:CG_ACC,textAlign:"center",marginBottom:14}}>+{gain} lbs</div>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_ACC),width:"100%"}} onClick={applyAndCloseCGBinge}>Apply Gains</button>
              </div>
          );
        }

        // ── Main modal ──
        return wrap(
            <div className="hall-pass-modal-in competitive-gainer-modal" style={{...C.modal,maxWidth:500,background:CG_BG,border:`1px solid ${CG_ACC}40`}}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:9,letterSpacing:4,color:CG_ACC}}>📊 COMPETITIVE GAINER</div>
                <div style={{marginLeft:"auto",fontSize:10,fontWeight:700,color:CG_TEXT}}>{Math.round(priya.lbs)} lbs</div>
              </div>
              {/* Drive bar */}
              <div style={{marginBottom:14,padding:"8px 10px",background:"rgba(232,41,74,0.05)",border:`1px solid ${CG_DIM}30`,borderRadius:5}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:9,letterSpacing:2,color:tier.color}}>COMPETITIVE DRIVE · {tier.label.toUpperCase()}</span>
                  <span style={{fontSize:9,color:CG_SUBTLE}}>{drive}</span>
                </div>
                <div style={{height:5,background:"#1a0308",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${tierBarPct}%`,background:tier.color,transition:"width 0.3s"}}/>
                </div>
              </div>
              {/* Measurements */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
                {CG_CONFIG.categories.map(cat=>(
                  <div key={cat} style={{background:"rgba(232,41,74,0.04)",border:`1px solid ${CG_DIM}30`,borderRadius:4,padding:"5px 8px",textAlign:"center"}}>
                    <div style={{fontSize:8,letterSpacing:2,color:CG_DIM}}>{cat.toUpperCase()}</div>
                    <div style={{fontSize:13,fontWeight:700,color:CG_ACC}}>{priyaM[cat]}"</div>
                  </div>
                ))}
              </div>
              {/* Action buttons */}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_DIM),textAlign:"left",padding:"10px 14px"}} onClick={doCGCorkboard}>
                  <span style={{fontWeight:700}}>📌 Observe at Corkboard</span>
                  <span style={{fontSize:9,color:CG_SUBTLE,marginLeft:8}}>Drive gain · triggers chat post</span>
                </button>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_DIM),textAlign:"left",padding:"10px 14px"}} onClick={openCGMeasurementPicker}>
                  <span style={{fontWeight:700}}>📐 Private Measurement Session</span>
                  <span style={{fontSize:9,color:CG_SUBTLE,marginLeft:8}}>Measure a resident · Drive gain on threats</span>
                </button>
                <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_DIM),textAlign:"left",padding:"10px 14px"}} onClick={doCGSelfReview}>
                  <span style={{fontWeight:700}}>🪞 Self-Review</span>
                  <span style={{fontSize:9,color:CG_SUBTLE,marginLeft:8}}>High Drive payoff</span>
                </button>
                <button
                  type="button"
                  className="competitive-gainer-choice-row"
                  style={{...C.btn(ap>=CG_CONFIG.bingeApCost?CG_ACC:CG_DIM),textAlign:"left",padding:"10px 14px",opacity:ap>=CG_CONFIG.bingeApCost?1:0.45}}
                  disabled={ap<CG_CONFIG.bingeApCost}
                  onClick={()=>{setAp(a=>a-CG_CONFIG.bingeApCost);doCGBinge();}}>
                  <span style={{fontWeight:700}}>🔴 Push Priya's Gains</span>
                  <span style={{fontSize:9,color:CG_SUBTLE,marginLeft:8}}>{CG_CONFIG.bingeApCost} AP · {tier.label} intensity</span>
                </button>
              </div>
              <button type="button" className="competitive-gainer-choice-row" style={{...C.btn(CG_BG),width:"100%",marginTop:12,border:`1px solid ${CG_DIM}30`}} onClick={closeCG}>Close</button>
            </div>,
          { dismissible: true },
        );
}
