import { useEffect, useMemo, useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';

// ═══════════════════════════════════════════════════════════════
// WEIGH-IN MODAL
// Phase 1: a short narrated scene of the student being weighed
// Phase 2 (only if her weight stage id is above 4): an animated
//          analog bathroom scale that spins and settles on her
//          actual weight.
// ═══════════════════════════════════════════════════════════════

// Placeholder scene description. (Intentionally generic — designed
// to be swapped out for per-student / per-stage flavour later.)
function getScenePlaceholder(student){
  const lbs=Math.round(student.lbs);
  return (
    `[Placeholder scene] ${student.name} steps into the office for her weekly check-in. ` +
    `She sets her bag down with a soft thud, kicks off her shoes, and pads over to the ` +
    `old analog scale in the corner. There's a brief pause — a deep breath, a quick glance ` +
    `over her shoulder — and then she steps on. The platform creaks under her ${lbs} lbs ` +
    `and the dial begins to spin, the red needle whipping past number after number before ` +
    `it slows, hunting, hunting… and finally settles.`
  );
}

// ── Animated analog scale ────────────────────────────────────────
// SVG-based dial. The needle starts hidden behind the cover, sweeps
// past the target, oscillates, and settles on the student's weight.
function AnimatedScale({ lbs }){
  const safeLbs=Math.max(0,Math.round(lbs));

  // Dial max — scales with the student so the needle always lands
  // in a visually satisfying place (a bit before the right edge).
  const max=useMemo(()=>{
    const base=Math.max(300,Math.ceil(safeLbs*1.25/50)*50);
    return Math.min(1500,base);
  },[safeLbs]);

  // Needle angle: -90deg = 0 lbs (far left), +90deg = max (far right).
  const targetAngle=useMemo(()=>{
    const clamped=Math.min(safeLbs,max);
    return -90+(clamped/max)*180;
  },[safeLbs,max]);

  // Build a one-shot keyframe animation: sweep → overshoot → oscillate → settle.
  const animId=useMemo(()=>`weighinSpin_${Math.floor(Math.random()*1e9)}`,[]);
  const animCss=useMemo(()=>{
    const stops=[
      { pct:0,   angle:-90 },
      { pct:18,  angle:90 },
      { pct:32,  angle:targetAngle+28 },
      { pct:46,  angle:targetAngle-18 },
      { pct:60,  angle:targetAngle+11 },
      { pct:74,  angle:targetAngle-6 },
      { pct:87,  angle:targetAngle+3 },
      { pct:100, angle:targetAngle },
    ];
    const frames=stops.map(s=>`${s.pct}% { transform: rotate(${s.angle.toFixed(2)}deg); }`).join("\n");
    return `@keyframes ${animId} { ${frames} }
.${animId} { transform-origin: 100px 130px; animation: ${animId} 3.4s cubic-bezier(0.32,0,0.2,1) forwards; }`;
  },[animId,targetAngle]);

  // Reveal the read-out only once the needle has effectively settled.
  const [settled,setSettled]=useState(false);
  useEffect(()=>{
    setSettled(false);
    const t=setTimeout(()=>setSettled(true),3450);
    return ()=>clearTimeout(t);
  },[targetAngle]);

  // ── Tick marks & labels around the half-dial ──────────────────
  // The dial reads 0 on the left, max on the right.
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
    const x2=cx+Math.sin(angleRad)*(r-len);
    const y2=cy-Math.cos(angleRad)*(r-len);
    ticks.push(
      <line key={`t${v}`} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isMajor?"#1a1a1a":"#666"} strokeWidth={isMajor?1.4:0.8}/>
    );
    if(isMajor&&v>0&&v<max){
      const lx=cx+Math.sin(angleRad)*(r-18);
      const ly=cy-Math.cos(angleRad)*(r-18)+4;
      ticks.push(
        <text key={`l${v}`} x={lx} y={ly} fontSize="9" fill="#1a1a1a"
          textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">
          {v}
        </text>
      );
    }
  }

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <style>{animCss}</style>
      {/* Body of the scale — a white tile with subtle texture and shadow. */}
      <div style={{
        width:240,height:240,
        background:"linear-gradient(160deg,#f3f1ec,#dad6ce)",
        borderRadius:14,
        boxShadow:"0 8px 20px rgba(0,0,0,0.55), inset 0 0 0 4px #b8b4ac",
        padding:10,position:"relative",
        backgroundImage:`
          radial-gradient(circle at 20% 30%, rgba(0,0,0,0.04) 1px, transparent 1.5px),
          radial-gradient(circle at 60% 70%, rgba(0,0,0,0.04) 1px, transparent 1.5px),
          radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03) 1px, transparent 1.5px),
          linear-gradient(160deg,#f3f1ec,#dad6ce)
        `,
        backgroundSize:"14px 14px, 11px 11px, 17px 17px, 100% 100%",
      }}>
        {/* Dial face */}
        <div style={{
          position:"absolute",top:14,left:20,right:20,
          height:135,
          background:"linear-gradient(180deg,#cfe3ec,#a8c7d8)",
          borderTopLeftRadius:120,borderTopRightRadius:120,
          border:"2px solid #2a2a2a",
          overflow:"hidden",
        }}>
          <svg viewBox="0 0 200 140" style={{width:"100%",height:"100%",display:"block"}}>
            {/* Outer arc */}
            <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`}
              fill="none" stroke="#1a1a1a" strokeWidth="1.6"/>
            {ticks}
            {/* Red needle. Pivots around (cx, cy). */}
            <g className={animId}>
              <line x1={cx} y1={cy} x2={cx} y2={cy-r-4}
                stroke="#c41a1a" strokeWidth="1.8" strokeLinecap="round"/>
              <polygon points={`${cx-2},${cy-r-4} ${cx+2},${cy-r-4} ${cx},${cy-r-12}`}
                fill="#c41a1a"/>
            </g>
            {/* Center pivot cap */}
            <circle cx={cx} cy={cy} r="5" fill="#1a1a1a"/>
            <circle cx={cx} cy={cy} r="2" fill="#888"/>
            {/* Brand text + read-out window */}
            <text x={cx} y={cy-30} fontSize="8" fill="#1a1a1a"
              textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">
              PROF · SCALE
            </text>
            <rect x={cx-22} y={cy-22} width="44" height="14" rx="2"
              fill="#fff" stroke="#1a1a1a" strokeWidth="0.6"/>
            <text x={cx} y={cy-12} fontSize="9" fill="#c41a1a"
              textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">
              {settled?`${safeLbs} lbs`:"— lbs"}
            </text>
          </svg>
        </div>
        {/* Foot pads (decorative) */}
        <div style={{position:"absolute",left:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
        <div style={{position:"absolute",right:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
      </div>
      <div style={{fontSize:11,color:"#806840",fontStyle:"italic",marginTop:4,minHeight:14}}>
        {settled?`The dial settles at ${safeLbs} lbs.`:"The needle is still hunting…"}
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────
export function WeighInModal({ weighInState, setWeighInState }){
  if(!weighInState) return null;
  const{student,phase}=weighInState;
  if(!student) return null;
  const st=getStage(student.lbs);
  const showScaleAfter=st.id>4;

  const goToScale=()=>setWeighInState({...weighInState,phase:"scale"});
  const close=()=>setWeighInState(null);

  return (
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:520}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#a060ff",marginBottom:4}}>
          ⚖ WEIGH-IN · {student.name?.toUpperCase()}
        </div>
        <div style={{fontSize:14,color:"#d8a8ff",fontWeight:700,marginBottom:14}}>
          {student.name} — currently {st.label}
        </div>

        {phase==="scene"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(50,10,90,0.25)"),
              fontSize:13,color:"#e0d0b0",lineHeight:1.85,fontStyle:"italic",marginBottom:14,
            }}>
              {getScenePlaceholder(student)}
            </div>
            <div style={{display:"flex",gap:8}}>
              {showScaleAfter?(
                <button style={{...C.btn("#5818a8"),flex:1}} onClick={goToScale}>
                  Step onto the scale →
                </button>
              ):(
                <button style={{...C.btn("#5818a8"),flex:1}} onClick={close}>
                  Close ✓
                </button>
              )}
            </div>
          </>
        )}

        {phase==="scale"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(20,15,40,0.55)"),
              padding:14,marginBottom:14,
              display:"flex",justifyContent:"center",
            }}>
              <AnimatedScale lbs={student.lbs}/>
            </div>
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>
              Close ✓
            </button>
          </>
        )}
      </div>
    </div>
  );
}
