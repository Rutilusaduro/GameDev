import { useEffect, useMemo, useRef, useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import {
  renderWeighInIntro, renderWeighInReaction,
  renderWeighInBreak, renderWeighInSwap, renderWeighInPurchase,
} from '../textEngine/scenes/weighIn/index.js';
import { renderSettlingScene } from '../textEngine/scenes/settling/index.js';
import { getImmobilityTier } from '../gameData/immobilityArrival.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine, traceToFlagNodes } from '../textEngine/textFlagFormat.js';
import { createSessionUsed, weekUsedFromStudent, weekUsedToPatch, isSlenderEligible } from '../gameData/textContext.js';
import { renderSlenderMirrorBeat } from '../textEngine/scenes/earlyGain/index.js';
import { pickStudentMemory } from '../gameData/memory.js';

function renderWeighInPhase(renderFn, student, week, opts) {
  const trace = [];
  const text = renderFn(student, week, { ...opts, trace });
  return { text, traceNodes: traceToFlagNodes(trace) };
}

function AnalogScale({lbs,willBreak,onSnapComplete}){
  const safeLbs=Math.max(0,Math.round(lbs));
  const [settled,setSettled]=useState(false);
  const [cracked,setCracked]=useState(false);
  const firedRef=useRef(false);
  const onSnapCompleteRef=useRef(onSnapComplete);
  useEffect(()=>{ onSnapCompleteRef.current=onSnapComplete; },[onSnapComplete]);

  const max=willBreak?400:Math.min(1500,Math.max(300,Math.ceil(safeLbs*1.25/50)*50));
  const targetAngle=willBreak?94:-90+(Math.min(safeLbs,max)/max)*180;
  const animId=useMemo(()=>`weighinSpin_${Math.floor(Math.random()*1e9)}`,[]);
  const crackId=useMemo(()=>`weighinCrack_${Math.floor(Math.random()*1e9)}`,[]);
  const animCss=useMemo(()=>{
    if(willBreak){
      return `@keyframes ${animId}{0%{transform:rotate(-90deg)}45%{transform:rotate(95deg)}65%{transform:rotate(88deg)}100%{transform:rotate(94deg)}}.${animId}{transform-origin:100px 130px;animation:${animId} .95s cubic-bezier(.6,0,.4,1) forwards}`;
    }
    const stops=[
      [0,-90],[18,90],[32,targetAngle+28],[46,targetAngle-18],[60,targetAngle+11],[74,targetAngle-6],[87,targetAngle+3],[100,targetAngle],
    ];
    const frames=stops.map(([pct,angle])=>`${pct}%{transform:rotate(${angle.toFixed(2)}deg)}`).join("");
    return `@keyframes ${animId}{${frames}}.${animId}{transform-origin:100px 130px;animation:${animId} 3.4s cubic-bezier(.32,0,.2,1) forwards}`;
  },[animId,targetAngle,willBreak]);

  useEffect(()=>{
    setSettled(false);
    setCracked(false);
    firedRef.current=false;
    if(willBreak){
      const t1=setTimeout(()=>setCracked(true),950);
      const t2=setTimeout(()=>{
        setSettled(true);
        if(!firedRef.current){
          firedRef.current=true;
          onSnapCompleteRef.current&&onSnapCompleteRef.current();
        }
      },1550);
      return ()=>{ clearTimeout(t1); clearTimeout(t2); };
    }
    const t=setTimeout(()=>setSettled(true),3450);
    return ()=>clearTimeout(t);
  },[targetAngle,willBreak]);

  const cx=100, cy=130, r=78;
  const ticks=[];
  const labelStep=Math.max(10,Math.round((max/6)/10)*10);
  const minorStep=Math.max(2,Math.round(labelStep/5));
  for(let v=0;v<=max;v+=minorStep){
    const isMajor=v%labelStep===0;
    const angleDeg=-90+(v/max)*180;
    const angleRad=angleDeg*Math.PI/180;
    const x1=cx+Math.sin(angleRad)*r;
    const y1=cy-Math.cos(angleRad)*r;
    const len=isMajor?9:4;
    ticks.push(<line key={`t${v}`} x1={x1} y1={y1} x2={cx+Math.sin(angleRad)*(r-len)} y2={cy-Math.cos(angleRad)*(r-len)} stroke={isMajor?"#1a1a1a":"#666"} strokeWidth={isMajor?1.4:.8}/>);
    if(isMajor&&v>0&&v<max){
      ticks.push(<text key={`l${v}`} x={cx+Math.sin(angleRad)*(r-18)} y={cy-Math.cos(angleRad)*(r-18)+4} fontSize="9" fill="#1a1a1a" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">{v}</text>);
    }
  }

  const readout=willBreak?(cracked?"ERR":"--"):(settled?`${safeLbs}`:"--");
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <style>{animCss}{`@keyframes ${crackId}_in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.${crackId}{transform-origin:100px 100px;animation:${crackId}_in .35s ease-out forwards}`}</style>
      <div style={{
        width:240,height:240,background:"linear-gradient(160deg,#f3f1ec,#dad6ce)",borderRadius:14,
        boxShadow:"0 8px 20px rgba(0,0,0,.55), inset 0 0 0 4px #b8b4ac",padding:10,position:"relative",
      }}>
        <div style={{position:"absolute",top:14,left:20,right:20,height:135,background:"linear-gradient(180deg,#cfe3ec,#a8c7d8)",borderTopLeftRadius:120,borderTopRightRadius:120,border:"2px solid #2a2a2a",overflow:"hidden"}}>
          <svg viewBox="0 0 200 140" style={{width:"100%",height:"100%",display:"block"}}>
            <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`} fill="none" stroke="#1a1a1a" strokeWidth="1.6"/>
            {ticks}
            <g className={animId}>
              <line x1={cx} y1={cy} x2={cx} y2={cy-r-4} stroke={willBreak&&cracked?"#7a0010":"#c41a1a"} strokeWidth="1.8" strokeLinecap="round"/>
              <polygon points={`${cx-2},${cy-r-4} ${cx+2},${cy-r-4} ${cx},${cy-r-12}`} fill={willBreak&&cracked?"#7a0010":"#c41a1a"}/>
            </g>
            <circle cx={cx} cy={cy} r="5" fill="#1a1a1a"/>
            <circle cx={cx} cy={cy} r="2" fill="#888"/>
            <text x={cx} y={cy-30} fontSize="8" fill="#1a1a1a" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">PROF · SCALE</text>
            <rect x={cx-22} y={cy-22} width="44" height="14" rx="2" fill="#fff" stroke="#1a1a1a" strokeWidth=".6"/>
            <text x={cx} y={cy-12} fontSize="9" fill={willBreak&&cracked?"#b00010":"#c41a1a"} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">{readout} LB</text>
            {willBreak&&cracked&&(
              <g className={crackId} stroke="#1a1a1a" strokeLinecap="round" fill="none">
                <path d={`M ${cx} ${cy-15} L ${cx-18} ${cy-2} L ${cx-32} ${cy-28} L ${cx-46} ${cy-22}`} strokeWidth="1.1"/>
                <path d={`M ${cx} ${cy-15} L ${cx+14} ${cy-3} L ${cx+30} ${cy-26} L ${cx+50} ${cy-12}`} strokeWidth="1.1"/>
                <path d={`M ${cx-4} ${cy-18} L ${cx-12} ${cy-44} L ${cx-22} ${cy-66}`} strokeWidth="1"/>
                <path d={`M ${cx+3} ${cy-18} L ${cx+10} ${cy-48} L ${cx+24} ${cy-72}`} strokeWidth="1"/>
              </g>
            )}
          </svg>
        </div>
        <div style={{position:"absolute",left:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
        <div style={{position:"absolute",right:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
      </div>
      <div style={{fontSize:11,color:willBreak&&cracked?"#a03030":"#806840",fontStyle:"italic",minHeight:14,textAlign:"center"}}>
        {willBreak?(cracked?"A sharp crack splinters across the dial window.":"The needle slams past the end of the dial..."):(settled?`The dial settles at ${safeLbs} lbs.`:"The needle is still hunting...")}
      </div>
    </div>
  );
}

function DigitalScale({lbs}){
  const target=Math.max(0,Math.round(lbs));
  const [display,setDisplay]=useState(0);
  const [settled,setSettled]=useState(false);
  useEffect(()=>{
    setDisplay(0);
    setSettled(false);
    let raf;
    const start=performance.now();
    const climbMs=Math.min(2200,700+Math.round(target*1.6));
    const overshoot=Math.max(2,Math.round(target*.04));
    const peak=target+overshoot;
    const tick=(now)=>{
      const t=Math.min(1,(now-start)/climbMs);
      setDisplay(Math.round((1-Math.pow(1-t,3))*peak));
      if(t<1){
        raf=requestAnimationFrame(tick);
      } else {
        const jitter=[target+overshoot,target-Math.ceil(overshoot/2),target+1,target-1,target];
        let i=0;
        const ji=setInterval(()=>{
          setDisplay(jitter[i]);
          i++;
          if(i>=jitter.length){ clearInterval(ji); setSettled(true); }
        },110);
      }
    };
    raf=requestAnimationFrame(tick);
    return ()=>{ if(raf) cancelAnimationFrame(raf); };
  },[target]);

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      <div style={{width:300,height:200,background:"linear-gradient(180deg,#3a3d44,#1f2126 70%,#16181c)",borderRadius:14,boxShadow:"0 10px 24px rgba(0,0,0,.7), inset 0 0 0 3px #14161a, inset 0 0 0 5px #4a4e58",padding:"30px 18px 18px",position:"relative"}}>
        <div style={{position:"absolute",top:7,left:0,right:0,textAlign:"center",fontSize:8,letterSpacing:5,color:"#9aa0ac",fontWeight:700}}>PROF · INDUSTRIAL · 1000LB</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <div style={{fontFamily:"Courier New, ui-monospace, monospace",fontSize:46,letterSpacing:4,color:"#1aff66",background:"#0a1f10",borderRadius:6,padding:"10px 18px",border:"2px inset #0c2a14",boxShadow:"inset 0 0 12px rgba(0,0,0,.85), 0 0 8px rgba(26,255,102,.25)",textShadow:"0 0 6px rgba(26,255,102,.65)",minWidth:170,textAlign:"right"}}>{String(display).padStart(4," ")}</div>
          <div style={{color:"#1aff66",fontSize:14,fontWeight:700,letterSpacing:2}}>LB</div>
        </div>
        <div style={{marginTop:12,display:"flex",justifyContent:"space-between",fontSize:9,color:"#9aa0ac",letterSpacing:2}}>
          <span>{settled?"STABLE":"WEIGHING"}</span><span>CAPACITY 1000 LB</span>
        </div>
      </div>
      <div style={{fontSize:11,color:settled?"#80c898":"#806840",fontStyle:"italic",minHeight:14,textAlign:"center"}}>
        {settled?`Stable reading: ${target} lbs.`:"The display climbs, hunts, and settles..."}
      </div>
    </div>
  );
}


// Static load-cell readout for a settled girl — no needle, no climb. She isn't
// stepping on anything; the pads under her already hold the number.
function LoadCellReadout({lbs}){
  const total=Math.max(0,Math.round(lbs));
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      <div style={{width:300,background:"linear-gradient(180deg,#2a2620,#191612)",borderRadius:14,boxShadow:"0 10px 24px rgba(0,0,0,.7), inset 0 0 0 3px #14110c, inset 0 0 0 5px #4a4030",padding:"26px 18px 16px",position:"relative"}}>
        <div style={{position:"absolute",top:7,left:0,right:0,textAlign:"center",fontSize:8,letterSpacing:4,color:"#c0a060",fontWeight:700}}>LOAD-CELL ARRAY · FLOOR WEIGH</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <div style={{fontFamily:"Courier New, ui-monospace, monospace",fontSize:46,letterSpacing:4,color:"#ffb43a",background:"#241705",borderRadius:6,padding:"10px 18px",border:"2px inset #3a2608",boxShadow:"inset 0 0 12px rgba(0,0,0,.85), 0 0 8px rgba(255,180,58,.25)",textShadow:"0 0 6px rgba(255,180,58,.6)",minWidth:170,textAlign:"right"}}>{String(total).padStart(4," ")}</div>
          <div style={{color:"#ffb43a",fontSize:14,fontWeight:700,letterSpacing:2}}>LB</div>
        </div>
        <div style={{marginTop:12,display:"flex",justifyContent:"space-between",fontSize:9,color:"#b09050",letterSpacing:2}}>
          <span>4 PADS · SUMMED</span><span>NO PLATFORM</span>
        </div>
      </div>
      <div style={{fontSize:11,color:"#b09050",fontStyle:"italic",minHeight:14,textAlign:"center"}}>The pads under her total {total} lbs — gathered from beneath her, never over.</div>
    </div>
  );
}

export function WeighInModal({weighInState,setWeighInState,bigScaleUnlocked,brokeScaleIds,onBreakScale,onUnlockBigScale,onMandatorySkip,onPersistWeekTextUsed,onComplete,week,campusFattening=false,campusTier=0}){
  const student=weighInState?.student;
  const textSession=useMemo(()=>({
    sessionUsed:createSessionUsed(),
    weekUsed:weekUsedFromStudent(student),
  }),[student?.id,(student?.textUsedKeys||[]).join('|')]);
  if(!weighInState||!student) return null;
  const {phase,reactionText}=weighInState;
  const weighInOpts={
    campusFattening:!!campusFattening,
    campusTier:campusTier||(campusFattening?1:0),
    week:week||1,
    aibMandatory:!!weighInState?.aibMandatory,
    sessionUsed:textSession.sessionUsed,
    weekUsed:textSession.weekUsed,
  };
  const st=getStage(student.lbs);
  const lbs=Math.round(student.lbs);
  // Settled girls (stage 10+) can't mount a scale and can't come to the office.
  // The weigh-in goes to HER: load pads under where she rests. Separate flow.
  const settled=getImmobilityTier(student)>=1;
  const alreadyBroke=(brokeScaleIds||[]).includes(student.id);
  const goesDirectlyToBig=alreadyBroke&&bigScaleUnlocked;
  const showScaleAfter=st.id>4||goesDirectlyToBig;
  const willBreakNow=lbs>400&&!alreadyBroke;
  const setPhase=(nextPhase)=>setWeighInState({...weighInState,phase:nextPhase});
  const close=()=>{
    const patch=weekUsedToPatch(textSession.weekUsed);
    if(patch.textUsedKeys&&onPersistWeekTextUsed) onPersistWeekTextUsed(student.id,patch);
    onComplete?.(student);
    setWeighInState(null);
  };
  const stepOntoScale=()=>setPhase(goesDirectlyToBig?"digital":"analog");
  const goToBreak=()=>{
    if(willBreakNow&&onBreakScale) onBreakScale(student.id);
    setPhase("break");
  };
  // useMemo: phase texts are RNG-composed — keep them stable across re-renders
  const introBundle = useMemo(
    () => renderWeighInPhase(
      (s, w, o) => renderWeighInIntro(s, w, goesDirectlyToBig, o),
      student,
      week || 1,
      weighInOpts,
    ),
    [student.id, goesDirectlyToBig, weighInState?.aibMandatory, textSession],
  );
  const slenderMirrorBundle = useMemo(
    () => (!showScaleAfter && isSlenderEligible(student)
      ? renderWeighInPhase(renderSlenderMirrorBeat, student, week || 1, weighInOpts)
      : { text: '', traceNodes: [] }),
    [student.id, showScaleAfter, textSession],
  );
  const breakBundle = useMemo(
    () => (phase === 'break'
      ? renderWeighInPhase(renderWeighInBreak, student, week || 1, weighInOpts)
      : { text: '', traceNodes: [] }),
    [phase, student.id, textSession],
  );
  const purchaseBundle = useMemo(
    () => (phase === 'purchase'
      ? renderWeighInPhase(renderWeighInPurchase, student, week || 1, weighInOpts)
      : { text: '', traceNodes: [] }),
    [phase, student.id, textSession],
  );
  const swapBundle = useMemo(
    () => (phase === 'swap'
      ? renderWeighInPhase(renderWeighInSwap, student, week || 1, weighInOpts)
      : { text: '', traceNodes: [] }),
    [phase, student.id, textSession],
  );
  const reactionBundle = useMemo(
    () => (phase === 'reaction' && reactionText
      ? { text: reactionText, traceNodes: [] }
      : { text: '', traceNodes: [] }),
    [phase, reactionText],
  );
  const settledApproach = useMemo(
    () => (settled && phase === 'scene'
      ? renderSettlingScene('set.weigh.approach', student, { week: week || 1 })
      : ''),
    [settled, phase, student.id, textSession],
  );
  const settledResult = useMemo(
    () => (settled && phase === 'settledResult'
      ? renderSettlingScene('set.weigh.result', student, { week: week || 1 })
      : ''),
    [settled, phase, student.id, textSession],
  );
  const flagState = buildStateLine(student, { week: week || 1, stageLabel: st.label });
  const goToReaction=()=>{
    const memGlobals = pickStudentMemory(student, week || 1) ?? {};
    const bundle=renderWeighInPhase(
      (s, w, o) => renderWeighInReaction(s, w, { ...o, bigScale: phase === 'digital', ...memGlobals }),
      student,
      week || 1,
      weighInOpts,
    );
    setWeighInState({ ...weighInState, phase: 'reaction', reactionText: bundle.text, reactionTraceNodes: bundle.traceNodes });
  };
  const handleAfterBreak=()=>{
    if(!bigScaleUnlocked){
      onUnlockBigScale&&onUnlockBigScale();
      setPhase("purchase");
    } else {
      setPhase("swap");
    }
  };

  return(
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:560}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#a060ff",marginBottom:4}}>⚖ WEIGH-IN · {student.name?.toUpperCase()}</div>

        {settled&&phase==="scene"&&(
          <>
            <div style={{...C.infoBox("rgba(50,32,10,.3)"),border:"1px solid #c0a06040",fontSize:13,color:"#e8d8b8",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>
              {settledApproach}
            </div>
            <button style={{...C.btn("#8a6018"),width:"100%"}} onClick={()=>setPhase("settledResult")}>Read the pads →</button>
          </>
        )}

        {settled&&phase==="settledResult"&&(
          <>
            <div style={{...C.infoBox("rgba(20,15,8,.6)"),padding:16,marginBottom:14,display:"flex",justifyContent:"center"}}>
              <LoadCellReadout lbs={student.lbs}/>
            </div>
            <div style={{...C.infoBox("rgba(40,28,12,.4)"),fontSize:13,color:"#e8d8b8",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>
              {settledResult}
            </div>
            <button style={{...C.btn("#8a6018"),width:"100%"}} onClick={close}>Close ✓</button>
          </>
        )}

        {!settled&&phase==="scene"&&(
          <>
            <div style={{...C.infoBox("rgba(50,10,90,.25)"),fontSize:13,color:"#e0d0b0",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>
              {introBundle.text}
            </div>
            <TextFlagToolbar section="weighIn.intro" stateLine={flagState} text={introBundle.text} nodes={introBundle.traceNodes} />
            {slenderMirrorBundle.text && (
              <>
                <div style={{...C.infoBox("rgba(40,25,55,.35)"),border:"1px solid #6a408040",fontSize:13,color:"#e8d4f0",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>
                  {slenderMirrorBundle.text}
                </div>
                <TextFlagToolbar section="slender.mirror" stateLine={flagState} text={slenderMirrorBundle.text} nodes={slenderMirrorBundle.traceNodes} />
              </>
            )}
            {weighInState?.aibMandatory && onMandatorySkip && (
              <button style={{...C.btn("#502030"),width:"100%",marginBottom:8}} onClick={onMandatorySkip}>
                Refuse documented weigh-in (+12 scrutiny)
              </button>
            )}
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={showScaleAfter?stepOntoScale:close}>
              {showScaleAfter?(goesDirectlyToBig?"Step onto the heavy-duty scale →":"Step onto the scale →"):"Close ✓"}
            </button>
          </>
        )}

        {phase==="analog"&&(
          <>
            <div style={{...C.infoBox("rgba(20,15,40,.55)"),padding:14,marginBottom:14,display:"flex",justifyContent:"center"}}>
              <AnalogScale lbs={student.lbs} willBreak={willBreakNow} onSnapComplete={willBreakNow?goToBreak:undefined}/>
            </div>
            {!willBreakNow&&<button style={{...C.btn("#5818a8"),width:"100%"}} onClick={goToReaction}>Continue →</button>}
          </>
        )}

        {phase==="break"&&(
          <>
            <div style={{...C.infoBox("rgba(60,5,15,.5)"),border:"1px solid #80202040",fontSize:13,color:"#f0c0a0",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>{breakBundle.text}</div>
            <TextFlagToolbar section="weighIn.break" stateLine={flagState} text={breakBundle.text} nodes={breakBundle.traceNodes} />
            <button style={{...C.btn(bigScaleUnlocked?"#5818a8":"#7a2030"),width:"100%"}} onClick={handleAfterBreak}>{bigScaleUnlocked?"Let me grab the big one. →":"I'll get her a real scale. →"}</button>
          </>
        )}

        {phase==="purchase"&&(
          <>
            <div style={{...C.infoBox("rgba(40,20,60,.45)"),border:"1px solid #5028a040",fontSize:13,color:"#e0d0b0",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>{purchaseBundle.text}</div>
            <TextFlagToolbar section="weighIn.purchase" stateLine={flagState} text={purchaseBundle.text} nodes={purchaseBundle.traceNodes} />
            <div style={{fontSize:11,color:"#a070d0",letterSpacing:1,marginBottom:12,textAlign:"center"}}>🛠 Heavy-duty scale unlocked · used automatically next time.</div>
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>Close ✓</button>
          </>
        )}

        {phase==="swap"&&(
          <>
            <div style={{...C.infoBox("rgba(35,40,55,.55)"),border:"1px solid #6a708040",fontSize:13,color:"#d0d8e0",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>{swapBundle.text}</div>
            <TextFlagToolbar section="weighIn.swap" stateLine={flagState} text={swapBundle.text} nodes={swapBundle.traceNodes} />
            <button style={{...C.btn("#3a4250"),width:"100%"}} onClick={()=>setPhase("digital")}>Step onto the heavy-duty scale →</button>
          </>
        )}

        {phase==="digital"&&(
          <>
            <div style={{...C.infoBox("rgba(10,15,25,.7)"),padding:16,marginBottom:14,display:"flex",justifyContent:"center"}}>
              <DigitalScale lbs={student.lbs}/>
            </div>
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={goToReaction}>Continue →</button>
          </>
        )}

        {phase==="reaction"&&(
          <>
            <div style={{...C.infoBox("rgba(30,15,50,.35)"),fontSize:13,color:"#e8d8f8",lineHeight:1.85,fontStyle:"italic",marginBottom:8}}>
              {reactionText}
            </div>
            <TextFlagToolbar
              section="weighIn.reaction"
              stateLine={flagState}
              text={reactionText}
              nodes={weighInState?.reactionTraceNodes || reactionBundle.traceNodes}
            />
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>Close ✓</button>
          </>
        )}
      </div>
    </div>
  );
}
