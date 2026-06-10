// ═══════════════════════════════════════════════════════════════
// COMMUNITY RESEARCHER — Thesis / case study modal
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { THESIS_BOARD, CASE_STUDY_PAIRS, BOARD_REACTIONS, getSuspicionBracket, HAVE_A_CHAT_SCENES } from '../gameData/communityResearcher.js';
import { getStage } from '../gameData/stages.js';

export function CommunityResearcherModal({ communityResearcherState, students, lilithUnlocked, lilithKillCount, advanceThesisBoard, completeThesisDefense, selectCasePair, setCommunityResearcherState, completeCaseStudy, dismissBoardReaction, proceedFromFinalReview, makeHaveAChatChoice, closeThesisOutcome }){
        const crs=communityResearcherState;
        const blue="#4a6fa5"; const lblue="#8fa8e0";
        const madeline=students.find(s=>s.id===1);
        const mName=madeline?.name||"Madeline";
        const wrap=(children)=>(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:520,background:"linear-gradient(160deg,#010510,#020818,#010510)",border:`1px solid ${blue}60`,maxHeight:"88vh",overflowY:"auto"}}>
              {children}
            </div>
          </div>
        );

        // ── THESIS BOARD ──
        if(crs.modalPhase==='thesis_board') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 COMMUNITY RESEARCHER</div>
          <div style={{fontSize:13,fontWeight:700,color:lblue,marginBottom:10}}>PhD Proposal Defense</div>
          <div style={{fontSize:12,color:"#a0b8d0",lineHeight:1.9,marginBottom:14,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
            {THESIS_BOARD.phases[crs.boardPhase]?.(mName)||''}
          </div>
          {crs.boardPhase<2?(
            <button style={{...C.btn(blue),width:"100%"}} onClick={advanceThesisBoard}>Continue →</button>
          ):(
            <button style={{...C.btn(blue),width:"100%"}} onClick={()=>completeThesisDefense(madeline)}>
              ✓ Defense Complete — Approved
            </button>
          )}
        </>);

        // ── THESIS SUCCESS ──
        if(crs.modalPhase==='thesis_success') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 APPROVED</div>
          <div style={{fontSize:14,fontWeight:700,color:lblue,marginBottom:10}}>Thesis Accepted</div>
          <div style={{fontSize:12,color:"#a0b8d0",lineHeight:1.85,marginBottom:14}}>
            The panel approves unanimously. Dr. Ward's note about the waistline is already in the field journal. Case studies may now begin.
          </div>
          <button style={{...C.btn(blue),width:"100%"}} onClick={()=>completeThesisDefense(madeline)}>Begin Case Studies →</button>
        </>);

        // ── CASE STUDY GRID ──
        if(crs.modalPhase==='case_study_grid'){
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
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 CASE STUDY {crs.caseStudyStage+1} OF 4</div>
            <div style={{fontSize:13,fontWeight:700,color:lblue,marginBottom:4}}>Select a Case Study</div>
            <div style={{fontSize:10,color:"#5070a0",marginBottom:12}}>Pairs unlock when both participants reach Heavy stage + Close relationship. Used pairs are crossed out.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              {CASE_STUDY_PAIRS.map(pair=>{
                const avail=isCRPairAvailable(pair);
                const used=crs.pairsUsed.includes(pair.id);
                return(
                  <div key={pair.id}
                    onClick={()=>{if(avail&&madeline)selectCasePair(madeline,pair.id);}}
                    style={{padding:"10px 12px",borderRadius:8,border:`1px solid ${avail?"#4a6fa570":"#2030404a"}`,
                      background:avail?"rgba(10,20,50,0.6)":"rgba(5,8,18,0.4)",
                      cursor:avail?"pointer":"default",opacity:avail?1:0.5,position:"relative"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                      <div style={{fontSize:14}}>{pair.icon}</div>
                      <div style={{fontSize:8,color:avail?`hsl(${Math.round(30+(pair.suspicion-1)*15)},70%,55%)`:"#405060"}}>⚠ {pair.suspicion}/7</div>
                    </div>
                    <div style={{fontSize:11,fontWeight:700,color:avail?lblue:"#405060",textDecoration:used?"line-through":"none"}}>{pair.label}</div>
                    <div style={{fontSize:9,color:"#405875",marginTop:2}}>{pair.subtitle}</div>
                    {used&&<div style={{fontSize:8,color:"#3a5060",marginTop:2}}>✓ studied</div>}
                    {!avail&&!used&&<div style={{fontSize:8,color:"#304050",marginTop:2}}>🔒 locked</div>}
                  </div>
                );
              })}
            </div>
            <button style={{...C.btn("#1a2030"),width:"100%",fontSize:11}} onClick={()=>setCommunityResearcherState(prev=>({...prev,modalPhase:null}))}>Cancel</button>
          </>);
        }

        // ── CASE STUDY EVENT ──
        if(crs.modalPhase==='case_study_event') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 CASE STUDY {crs.caseStudyStage+1} OF 4</div>
          <div style={{fontSize:12,fontWeight:700,color:lblue,marginBottom:10}}>{CASE_STUDY_PAIRS.find(p=>p.id===crs.activePairId)?.label||''}</div>
          <div style={{fontSize:12,color:"#a0b8cc",lineHeight:1.9,marginBottom:16,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
            {crs.eventText||''}
          </div>
          <button style={{...C.btn(blue),width:"100%"}} onClick={()=>{if(madeline)completeCaseStudy(madeline);}}>
            Record Findings ✓ (1 AP)
          </button>
        </>);

        // ── BOARD REACTION ──
        if(crs.modalPhase==='board_reaction'){
          const reactionPair=CASE_STUDY_PAIRS.find(p=>p.id===crs.boardReactionPairId);
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 COMMITTEE RESPONSE</div>
            <div style={{fontSize:12,fontWeight:700,color:lblue,marginBottom:10}}>
              {reactionPair?.icon||'📋'} {reactionPair?.label||''}
            </div>
            <div style={{fontSize:11,color:"#8090b0",lineHeight:1.8,marginBottom:14,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
              {BOARD_REACTIONS[crs.boardReactionPairId]||''}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontSize:9,color:"#405070"}}>Suspicion total: <span style={{color:crs.totalSuspicion>17?"#c08060":crs.totalSuspicion>13?"#a09050":"#6080a0"}}>{crs.totalSuspicion||0}</span></div>
              <div style={{fontSize:9,color:"#405070"}}>Study {crs.caseStudyStage}/4 done</div>
            </div>
            <button style={{...C.btn(blue),width:"100%"}} onClick={dismissBoardReaction}>Continue →</button>
          </>);
        }

        // ── FINAL REVIEW ──
        if(crs.modalPhase==='final_review') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 FINAL REVIEW</div>
          <div style={{fontSize:12,fontWeight:700,color:lblue,marginBottom:10}}>Committee Hearing</div>
          <div style={{fontSize:11,color:"#a0b8cc",lineHeight:1.85,marginBottom:16,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
            {crs.finalReviewText||''}
          </div>
          <button style={{...C.btn(blue),width:"100%"}} onClick={proceedFromFinalReview}>
            {(getSuspicionBracket(crs.totalSuspicion||0)==='green'||getSuspicionBracket(crs.totalSuspicion||0)==='yellow')
              ?'Accept Verdict →':'Have Those Conversations →'}
          </button>
        </>);

        // ── HAVE A CHAT ──
        if(crs.modalPhase==='have_a_chat'){
          const scene=HAVE_A_CHAT_SCENES[crs.chatMemberIdx];
          const phase=scene?.phases[crs.chatPhaseIdx];
          const phaseText=typeof phase?.text==='function'?phase.text(crs.chatHistory):phase?.text;
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 OFF THE RECORD</div>
            <div style={{fontSize:12,fontWeight:700,color:lblue,marginBottom:8}}>{scene?.member||''}</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {HAVE_A_CHAT_SCENES.map((sc,i)=>(
                <div key={i} style={{fontSize:9,padding:"2px 8px",borderRadius:4,
                  background:crs.chatWon.includes(i)?'#0a2a18':i===crs.chatMemberIdx?'#0a1a38':'#080810',
                  color:crs.chatWon.includes(i)?'#5aaa70':i===crs.chatMemberIdx?lblue:'#2a3a5a',
                  border:`1px solid ${crs.chatWon.includes(i)?'#1a5a30':i===crs.chatMemberIdx?blue+'90':'#151530'}`}}>
                  {crs.chatWon.includes(i)?'✓ ':''}{sc.member.replace('Dr.','')}
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:"#a0b8cc",lineHeight:1.85,marginBottom:16,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
              {phaseText||''}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {(phase?.choices||[]).map(ch=>(
                <button key={ch.id} style={{...C.btn("#0e1a30"),textAlign:"left",fontSize:11,padding:"10px 14px",border:`1px solid ${blue}50`}}
                  onClick={()=>makeHaveAChatChoice(ch.id)}>
                  {ch.label}
                </button>
              ))}
            </div>
          </>);
        }

        // ── THESIS APPROVED ──
        if(crs.modalPhase==='thesis_approved'){
          const bracket=getSuspicionBracket(crs.totalSuspicion||0);
          const outcomeText=bracket==='green'
            ?`The committee approves without reservation. Madeline walks out of the building into the afternoon light and does not look back.`
            :bracket==='yellow'
            ?`Conditional approval. The ethics appendix will need to be written. Madeline has a great deal to say in it.`
            :`The private meetings were — productive. The thesis is approved. Whatever was said in those rooms stays in those rooms.`;
          return wrap(<>
            <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 THESIS</div>
            <div style={{fontSize:13,fontWeight:700,color:"#6aaa80",marginBottom:12}}>Approved</div>
            <div style={{fontSize:11,color:"#a0b8cc",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>{outcomeText}</div>
            <button style={{...C.btn(blue),width:"100%"}} onClick={()=>closeThesisOutcome(true)}>Close</button>
          </>);
        }

        // ── THESIS REJECTED ──
        if(crs.modalPhase==='thesis_rejected') return wrap(<>
          <div style={{fontSize:9,letterSpacing:4,color:blue,marginBottom:4}}>📋 THESIS</div>
          <div style={{fontSize:13,fontWeight:700,color:"#a05060",marginBottom:12}}>Not Approved</div>
          <div style={{fontSize:11,color:"#a0b8cc",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>
            The committee was not convinced. The file is closed. Madeline keeps the field notes — all of them, the edited and unedited both — and begins, in the margins of the last page, something that isn't a thesis and isn't a journal. Whatever it is, she'll finish it on her own terms.
          </div>
          <button style={{...C.btn(blue),width:"100%"}} onClick={()=>closeThesisOutcome(false)}>Close</button>
        </>);

        return null;
}
