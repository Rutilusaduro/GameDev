import { useEffect, useMemo, useRef, useState } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';

// ═══════════════════════════════════════════════════════════════
// WEIGH-IN MODAL
// ─────────────────────────────────────────────────────────────
// Phase 1  "scene"    Short narrated weigh-in scene.
// Phase 2  "analog"   The old white analog scale.
//                      · ≤400 lbs → spins → settles normally.
//                      · >400 lbs → rapid sweep → cracks across
//                        the dial window → button becomes "Uh oh…"
// Phase 3  "break"    Unique per-student "I broke the scale" beat.
//                      · If the big scale hasn't been bought yet,
//                        professor announces he's getting one. The
//                        weigh-in ends here (no number yet).
//                      · Otherwise it leads into the swap beat.
// Phase 4  "swap"     "Hey fam, I got this — let me grab the
//                      heavy-duty one." (brief professor beat).
// Phase 5  "digital"  Larger, rugged digital scale that ticks up
//                      to her real weight on a 7-segment LCD.
//
// Girls who have already broken the small scale skip phases 2-4
// and go straight from "scene" to "digital".
// ═══════════════════════════════════════════════════════════════

// ── Phase 1: opening narration (placeholder) ────────────────────
function getScenePlaceholder(student,{ goesDirectlyToBig }){
  const lbs=Math.round(student.lbs);
  if(goesDirectlyToBig){
    return (
      `[Placeholder scene] ${student.name} returns for her weekly check-in. ` +
      `She knows the routine now — straight past the dusty white scale in the corner ` +
      `(the one she retired the hard way) and over to the heavy-duty platform you ` +
      `installed afterward. She toes off her shoes, breathes out, and steps up. The ` +
      `metal barely flexes. The LCD blinks awake and starts climbing toward her ${lbs} lbs.`
    );
  }
  return (
    `[Placeholder scene] ${student.name} steps into the office for her weekly check-in. ` +
    `She sets her bag down with a soft thud, kicks off her shoes, and pads over to the ` +
    `old white scale in the corner. There's a brief pause — a deep breath, a quick glance ` +
    `over her shoulder — and then she steps on. The platform creaks under her ${lbs} lbs ` +
    `and the dial begins to spin, the red needle whipping past number after number…`
  );
}

// ── Phase 3: unique "I broke the scale" beats per student ───────
// Keyed by student id (matches INIT_STUDENTS). Each value is a
// function so we can interpolate weight or other state later.
const BREAK_SCENES={
  0:(s)=>`Brittany hops off like she's dismounting a routine, hands on her hips, completely unbothered. "Okay, that one is on the scale, not me." She gives the cracked dial a little pat. "You're benched. Coach's call."`,
  1:(s)=>`Madeline tilts her head at the fractured window with quiet, academic interest. "Material failure under sustained load. Predictable, actually." She steps off, smooths her cardigan, and looks at you over her glasses. "You'll want a higher-rated instrument."`,
  2:(s)=>`Kylie is already filming. "Babe — babe, look at this. The scale literally couldn't." She angles the camera at the cracks, then back at her own face, grinning. "We're calling that a hard launch."`,
  3:(s)=>`Serena steps off and laughs once, sharp and pleased. "Yeah, I felt that one go. Cardio's still good, scale's done." She nudges it with her toe. "Get one that can keep up."`,
  4:(s)=>`Fiona crouches to study the crack pattern, head tilted. "It's actually beautiful, the way it spidered out — like a Klein piece." She glances up at you, dreamy. "I'll sketch it. You'll get a better one."`,
  5:(s)=>`Destiny doesn't even look down. She just hears the crunch, sighs through her nose, and says flatly, "Low durability item. Should've upgraded ages ago." She wanders back toward her chair.`,
  6:(s)=>`Tiffany shrieks with delight and immediately texts the group chat. "GIRLS. I broke the scale. No, like, broke broke." She looks up at you, eyes shining. "This is iconic. You have to get a bigger one."`,
  7:(s)=>`Priya is already pulling up a procurement form on her phone. "I'll send you three options. Industrial-rated, weight-rated to four-fifty minimum, ideally five." She doesn't pause typing. "Approve by end of day."`,
  8:(s)=>`Maya steps off without a word, looks at the cracks, then looks at you. She nods once — small, apologetic, almost amused — and goes back to her chair. The silence somehow says everything.`,
  9:(s)=>`Chloe lets out a single dry laugh. "Right. So your American scales are exactly as overbuilt as your portions, then." She steps off neatly. "Get one made for grown women."`,
 10:(s)=>`Reneé claps her hands together once, flour puffing off her sleeves. "Okay, that is the best review my cooking has ever gotten. I'm so sorry about your scale." She is not, in fact, sorry. She is delighted.`,
 11:(s)=>`Kaylee covers her mouth with both hands. "Oh — oh no, professor, I am so sorry, I'll absolutely pay for a new one." She's already crouching to inspect the damage like a patient she might still save. "It's okay. We'll get you something sturdier."`,
 12:(s)=>`Nadia doesn't react to the cracks. She reacts to you. Notebook out, pen moving. "Interesting. You looked at the scale first, then at me. We'll come back to that." She steps off, calm as ever.`,
 13:(s)=>`Daisy laughs — warm, embarrassed, completely unbothered. "Bless its little heart. I'll bring cookies tomorrow to make it up to you." She pats your arm. "You go on and get a bigger one, sugar."`,
 14:(s)=>`Mary Jane bursts out laughing. "Oh, sweetheart, back home we'd've put me on the hay scale weeks ago." She steps off, dusts her hands on her jeans. "Y'all need a proper one. Get the kind they use at the feed store."`,
 15:(s)=>`Lilith doesn't step off so much as flow off. She regards the cracked dial with quiet, predatory amusement. "Hm. Fragile little thing." She meets your eyes. "Get something that can hold me."`,
};
function getBreakScene(student){
  const fn=BREAK_SCENES[student.id];
  if(fn) return fn(student);
  return `${student.name} steps off and looks down at the fractured dial, then at you. ` +
         `She doesn't say anything for a long moment. Then, very evenly: "You're going to need a bigger scale."`;
}

// ── Phase 4: professor swap beat (paraphrased "I got this, fam") ─
function getSwapScene(student){
  return (
    `"Hey — it's fine, it's fine." You wave her off the cracked white scale before she can apologize. ` +
    `"I figured this would happen again. Got us a proper one after the first time." You drag the heavy ` +
    `industrial platform out from beside the desk and thump it down. Black rubber, reinforced steel, ` +
    `digital readout. "Step up whenever you're ready, ${student.name.split(" ")[0]}."`
  );
}

// ── Phase 3 alt: first-ever break — purchase announcement ───────
function getPurchaseScene(student){
  return (
    `You stare at the cracked dial for a second, then exhale a laugh. ` +
    `"Okay. Yeah. That's on me, not on ${student.name.split(" ")[0]}." You make a mental ` +
    `note — and a real one — to order a proper, heavy-duty scale before the next check-in. ` +
    `Reinforced platform, digital readout, the works. No more guessing games.`
  );
}

// ═══════════════════════════════════════════════════════════════
// Analog scale — handles both normal settle and the break sequence.
// ═══════════════════════════════════════════════════════════════
function AnalogScale({ lbs, willBreak, onBroken }){
  const safeLbs=Math.max(0,Math.round(lbs));

  // Dial max: scales with the student but capped — when she's
  // about to break the scale we cap the visible dial so it looks
  // overloaded (needle slams to the far right).
  const max=useMemo(()=>{
    if(willBreak) return 400;
    const base=Math.max(300,Math.ceil(safeLbs*1.25/50)*50);
    return Math.min(1500,base);
  },[safeLbs,willBreak]);

  // Needle angle: -90deg = 0 lbs, +90deg = max.
  const targetAngle=useMemo(()=>{
    if(willBreak) return 95; // slammed past the end
    const clamped=Math.min(safeLbs,max);
    return -90+(clamped/max)*180;
  },[safeLbs,max,willBreak]);

  const animId=useMemo(()=>`weighinSpin_${Math.floor(Math.random()*1e9)}`,[]);
  const animCss=useMemo(()=>{
    if(willBreak){
      // Rapid, brutal sweep — straight to the pin, then a tiny
      // recoil as the mechanism gives up.
      return `@keyframes ${animId} {
        0%   { transform: rotate(-90deg); }
        45%  { transform: rotate(95deg); }
        60%  { transform: rotate(88deg); }
        75%  { transform: rotate(96deg); }
        100% { transform: rotate(94deg); }
      }
.${animId} { transform-origin: 100px 130px; animation: ${animId} 0.95s cubic-bezier(0.6,0,0.4,1) forwards; }`;
    }
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
  },[animId,targetAngle,willBreak]);

  // settle / break flags are time-driven. We hold `onBroken` in a
  // ref so the parent re-creating the callback (which it does on
  // every render) doesn't restart the animation.
  const [settled,setSettled]=useState(false);
  const [cracked,setCracked]=useState(false);
  const onBrokenRef=useRef(onBroken);
  useEffect(()=>{ onBrokenRef.current=onBroken; },[onBroken]);
  const brokenFiredRef=useRef(false);
  useEffect(()=>{
    setSettled(false);
    setCracked(false);
    brokenFiredRef.current=false;
    if(willBreak){
      const t1=setTimeout(()=>{ setCracked(true); },950);
      const t2=setTimeout(()=>{
        setSettled(true);
        if(!brokenFiredRef.current){
          brokenFiredRef.current=true;
          if(onBrokenRef.current) onBrokenRef.current();
        }
      },1550);
      return ()=>{ clearTimeout(t1); clearTimeout(t2); };
    } else {
      const t=setTimeout(()=>setSettled(true),3450);
      return ()=>clearTimeout(t);
    }
  },[targetAngle,willBreak]);

  // ── Tick marks & labels around the half-dial ───────────────────
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

  // ── Crack overlay (only used when willBreak) ───────────────────
  const crackId=useMemo(()=>`weighinCrack_${Math.floor(Math.random()*1e9)}`,[]);
  const crackCss=`
@keyframes ${crackId}_in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.${crackId} { transform-origin: 100px 100px; animation: ${crackId}_in 0.35s ease-out forwards; }
`;

  // The little read-out text.
  let readout;
  if(willBreak){
    readout=cracked?"— ERR —":"— lbs";
  } else {
    readout=settled?`${safeLbs} lbs`:"— lbs";
  }
  const readoutColor=willBreak&&cracked?"#b00010":"#c41a1a";

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <style>{animCss}{willBreak?crackCss:""}</style>
      {/* Body of the small scale — white tile, subtle texture. */}
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
            {/* Red needle */}
            <g className={animId}>
              <line x1={cx} y1={cy} x2={cx} y2={cy-r-4}
                stroke={willBreak&&cracked?"#7a0010":"#c41a1a"} strokeWidth="1.8" strokeLinecap="round"/>
              <polygon points={`${cx-2},${cy-r-4} ${cx+2},${cy-r-4} ${cx},${cy-r-12}`}
                fill={willBreak&&cracked?"#7a0010":"#c41a1a"}/>
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
            {/* Brand text */}
            {/* Brand text + read-out window */}
            <text x={cx} y={cy-30} fontSize="8" fill="#1a1a1a"
              textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">
              PROF · SCALE
            </text>
            {/* Read-out window */}
            <rect x={cx-22} y={cy-22} width="44" height="14" rx="2"
              fill="#fff" stroke="#1a1a1a" strokeWidth="0.6"/>
            <text x={cx} y={cy-12} fontSize="9" fill={readoutColor}
              textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">
              {readout}
            </text>

            {/* ── Crack overlay (fades in when cracked) ── */}
            {willBreak&&cracked&&(
              <g className={crackId} stroke="#1a1a1a" strokeLinecap="round" fill="none">
                {/* Primary fissures radiating from the read-out */}
                <path d={`M ${cx} ${cy-15} L ${cx-18} ${cy-2} L ${cx-32} ${cy-28} L ${cx-46} ${cy-22}`} strokeWidth="1.1"/>
                <path d={`M ${cx} ${cy-15} L ${cx+14} ${cy-3} L ${cx+30} ${cy-26} L ${cx+50} ${cy-12}`} strokeWidth="1.1"/>
                <path d={`M ${cx-4} ${cy-18} L ${cx-12} ${cy-44} L ${cx-22} ${cy-66}`} strokeWidth="1.0"/>
                <path d={`M ${cx+3} ${cy-18} L ${cx+10} ${cy-48} L ${cx+24} ${cy-72}`} strokeWidth="1.0"/>
                <path d={`M ${cx+10} ${cy-30} L ${cx+40} ${cy-50} L ${cx+58} ${cy-58}`} strokeWidth="0.8"/>
                <path d={`M ${cx-10} ${cy-30} L ${cx-42} ${cy-44} L ${cx-58} ${cy-50}`} strokeWidth="0.8"/>
                {/* Hairline branches */}
                <path d={`M ${cx-32} ${cy-28} L ${cx-38} ${cy-46}`} strokeWidth="0.6"/>
                <path d={`M ${cx+30} ${cy-26} L ${cx+34} ${cy-44}`} strokeWidth="0.6"/>
                <path d={`M ${cx-12} ${cy-44} L ${cx-4} ${cy-58}`} strokeWidth="0.6"/>
                <path d={`M ${cx+10} ${cy-48} L ${cx+2} ${cy-62}`} strokeWidth="0.6"/>
                {/* Tiny chips around the readout */}
                <circle cx={cx-22} cy={cy-19} r="1.2" fill="#1a1a1a" stroke="none"/>
                <circle cx={cx+21} cy={cy-15} r="1.0" fill="#1a1a1a" stroke="none"/>
                <circle cx={cx-2} cy={cy-9} r="0.9" fill="#1a1a1a" stroke="none"/>
              </g>
            )}
          </svg>
        </div>
        {/* Foot pads */}
        <div style={{position:"absolute",left:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
        <div style={{position:"absolute",right:14,bottom:10,width:18,height:8,background:"#9e9a92",borderRadius:3}}/>
      </div>
      <div style={{fontSize:11,color:willBreak&&cracked?"#a03030":"#806840",fontStyle:"italic",marginTop:4,minHeight:14,textAlign:"center"}}>
        {willBreak
          ? (cracked
              ? "A sharp crack splinters across the dial window. The mechanism gives up."
              : "The needle slams past the end of the dial — there's a metallic groan…")
          : (settled?`The dial settles at ${safeLbs} lbs.`:"The needle is still hunting…")}
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

// ═══════════════════════════════════════════════════════════════
// Digital scale — large, rugged, LCD that ticks up to the weight.
// ═══════════════════════════════════════════════════════════════
function DigitalScale({ lbs }){
  const target=Math.max(0,Math.round(lbs));
  const [display,setDisplay]=useState(0);
  const [settled,setSettled]=useState(false);

  useEffect(()=>{
    setDisplay(0);
    setSettled(false);
    let raf;
    const start=performance.now();
    // Two-stage: a fast climb that overshoots slightly, then a
    // brief jitter that converges on the true reading.
    const climbMs=Math.min(2200, 700 + Math.round(target*1.6));
    const overshoot=Math.max(2, Math.round(target*0.04));
    const peak=target+overshoot;
    const tick=(now)=>{
      const t=Math.min(1,(now-start)/climbMs);
      // Ease-out cubic for the climb.
      const eased=1-Math.pow(1-t,3);
      const v=Math.round(eased*peak);
      setDisplay(v);
      if(t<1){
        raf=requestAnimationFrame(tick);
      } else {
        // Quick jitter pass that lands on `target`.
        const jitter=[target+overshoot, target-Math.ceil(overshoot/2), target+1, target-1, target];
        let i=0;
        const ji=setInterval(()=>{
          setDisplay(jitter[i]);
          i++;
          if(i>=jitter.length){
            clearInterval(ji);
            setSettled(true);
          }
        },110);
      }
    };
    raf=requestAnimationFrame(tick);
    return ()=>{ if(raf) cancelAnimationFrame(raf); };
  },[target]);

  // 7-segment-ish look via a monospaced display.
  const segStyle={
    fontFamily:"'Courier New', ui-monospace, monospace",
    fontSize:46,
    letterSpacing:4,
    color:"#1aff66",
    background:"#0a1f10",
    borderRadius:6,
    padding:"10px 18px",
    border:"2px inset #0c2a14",
    boxShadow:"inset 0 0 12px rgba(0,0,0,0.85), 0 0 8px rgba(26,255,102,0.25)",
    textShadow:"0 0 6px rgba(26,255,102,0.65)",
    minWidth:170,
    textAlign:"right",
    transition:settled?"color 0.2s":"none",
  };
  const padded=String(display).padStart(4," ");

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      {/* Body of the digital scale — wider, lower, darker. */}
      <div style={{
        width:300,height:200,
        background:"linear-gradient(180deg,#3a3d44,#1f2126 70%,#16181c)",
        borderRadius:14,
        boxShadow:"0 10px 24px rgba(0,0,0,0.7), inset 0 0 0 3px #14161a, inset 0 0 0 5px #4a4e58",
        padding:"22px 18px 18px",
        position:"relative",
        backgroundImage:`
          repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px),
          linear-gradient(180deg,#3a3d44,#1f2126 70%,#16181c)
        `,
      }}>
        {/* Brand strip */}
        <div style={{
          position:"absolute",top:6,left:0,right:0,textAlign:"center",
          fontFamily:"Arial, sans-serif",letterSpacing:5,fontSize:8,color:"#7a8090",fontWeight:700,
        }}>
          PROF · INDUSTRIAL · 1000LB
        </div>
        {/* LCD display */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:6}}>
          <div style={segStyle}>{padded}</div>
          <div style={{fontFamily:"Arial, sans-serif",color:"#1aff66",fontSize:14,fontWeight:700,letterSpacing:2,textShadow:"0 0 6px rgba(26,255,102,0.65)"}}>LB</div>
        </div>
        {/* Status row */}
        <div style={{
          marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",
          fontFamily:"Arial, sans-serif",fontSize:9,color:"#9aa0ac",letterSpacing:2,
        }}>
          <span style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:settled?"#1aff66":"#ffb01a",boxShadow:settled?"0 0 6px #1aff66":"0 0 6px #ffb01a"}}/>
            {settled?"STABLE":"WEIGHING"}
          </span>
          <span>CAPACITY 1000 LB</span>
        </div>
        {/* Rugged corner bolts */}
        {[
          {top:8,left:8},{top:8,right:8},{bottom:8,left:8},{bottom:8,right:8},
        ].map((p,i)=>(
          <div key={i} style={{
            position:"absolute",...p,width:8,height:8,borderRadius:"50%",
            background:"radial-gradient(circle at 30% 30%, #6a6e78, #1a1c20 70%)",
            boxShadow:"inset 0 0 2px rgba(0,0,0,0.8)",
          }}/>
        ))}
        {/* Big rubber feet */}
        <div style={{position:"absolute",left:14,bottom:-8,width:30,height:10,background:"#0a0a0e",borderRadius:4}}/>
        <div style={{position:"absolute",right:14,bottom:-8,width:30,height:10,background:"#0a0a0e",borderRadius:4}}/>
      </div>
      <div style={{fontSize:11,color:settled?"#80c898":"#806840",fontStyle:"italic",marginTop:6,minHeight:14,textAlign:"center"}}>
        {settled?`Stable reading: ${target} lbs.`:"The display climbs, hunts, and settles…"}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN MODAL
// ═══════════════════════════════════════════════════════════════
export function WeighInModal({ weighInState, setWeighInState, bigScaleUnlocked, brokeScaleIds, onBreakScale, onUnlockBigScale }){
// ── Main modal ────────────────────────────────────────────────
export function WeighInModal({ weighInState, setWeighInState }){
  if(!weighInState) return null;
  const{student,phase}=weighInState;
  if(!student) return null;
  const st=getStage(student.lbs);
  const lbs=Math.round(student.lbs);

  const alreadyBroke=(brokeScaleIds||[]).includes(student.id);
  const goesDirectlyToBig=alreadyBroke && bigScaleUnlocked;
  const showScaleAfter=st.id>4 || goesDirectlyToBig;
  const willBreakNow=lbs>400 && !alreadyBroke;

  const setPhase=(p)=>setWeighInState({...weighInState,phase:p});
  const close=()=>setWeighInState(null);

  const stepOntoScale=()=>{
    if(goesDirectlyToBig) setPhase("digital");
    else setPhase("analog");
  };

  const onAnalogBroken=()=>{
    // Fire upward state changes once when the cracks land.
    onBreakScale&&onBreakScale(student.id);
  };

  const handleUhOh=()=>{
    // After the small scale cracks, advance into the dialogue beat.
    setPhase("break");
  };

  const handleAfterBreak=()=>{
    if(!bigScaleUnlocked){
      // First time anyone has broken it — purchase the new scale
      // and end this weigh-in (no number yet).
      onUnlockBigScale&&onUnlockBigScale();
      setPhase("purchase");
    } else {
      // Big scale already exists — professor swaps to it.
      setPhase("swap");
    }
  };

  return (
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:560}}>
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

        {/* ── Phase 1: scene ── */}
        {phase==="scene"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(50,10,90,0.25)"),
              fontSize:13,color:"#e0d0b0",lineHeight:1.85,fontStyle:"italic",marginBottom:14,
            }}>
              {getScenePlaceholder(student,{ goesDirectlyToBig })}
            </div>
            {showScaleAfter?(
              <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={stepOntoScale}>
                {goesDirectlyToBig?"Step onto the heavy-duty scale →":"Step onto the scale →"}
              </button>
            ):(
              <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>
                Close ✓
              </button>
            )}
          </>
        )}

        {/* ── Phase 2: analog scale ── */}
        {phase==="analog"&&(
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
              <AnalogScale lbs={student.lbs} willBreak={willBreakNow} onBroken={onAnalogBroken}/>
            </div>
            {willBreakNow?(
              <UhOhButton onClick={handleUhOh}/>
            ):(
              <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>
                Close ✓
              </button>
            )}
          </>
        )}

        {/* ── Phase 3: break beat (unique per student) ── */}
        {phase==="break"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(60,5,15,0.5)"),
              border:"1px solid #80202040",
              fontSize:13,color:"#f0c0a0",lineHeight:1.85,fontStyle:"italic",marginBottom:14,
            }}>
              {getBreakScene(student)}
            </div>
            <button style={{...C.btn(bigScaleUnlocked?"#5818a8":"#7a2030"),width:"100%"}} onClick={handleAfterBreak}>
              {bigScaleUnlocked?"Let me grab the big one. →":"I'll get her a real scale. →"}
            </button>
          </>
        )}

        {/* ── Phase 3 alt: purchase announcement ── */}
        {phase==="purchase"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(40,20,60,0.45)"),
              border:"1px solid #5028a040",
              fontSize:13,color:"#e0d0b0",lineHeight:1.85,fontStyle:"italic",marginBottom:14,
            }}>
              {getPurchaseScene(student)}
            </div>
            <div style={{
              fontSize:11,color:"#a070d0",letterSpacing:1,marginBottom:12,textAlign:"center",
            }}>
              🛠 Heavy-duty scale unlocked · used automatically next time.
            </div>
            <button style={{...C.btn("#5818a8"),width:"100%"}} onClick={close}>
              Close ✓
            </button>
          </>
        )}

        {/* ── Phase 4: swap beat ── */}
        {phase==="swap"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(35,40,55,0.55)"),
              border:"1px solid #6a708040",
              fontSize:13,color:"#d0d8e0",lineHeight:1.85,fontStyle:"italic",marginBottom:14,
            }}>
              {getSwapScene(student)}
            </div>
            <button style={{...C.btn("#3a4250"),width:"100%"}} onClick={()=>setPhase("digital")}>
              Step onto the heavy-duty scale →
            </button>
          </>
        )}

        {/* ── Phase 5: digital scale ── */}
        {phase==="digital"&&(
          <>
            <div style={{
              ...C.infoBox("rgba(10,15,25,0.7)"),
              padding:16,marginBottom:14,
              display:"flex",justifyContent:"center",
            }}>
              <DigitalScale lbs={student.lbs}/>
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

// Small visual: "Uh oh…" button stays disabled until the cracks
// have actually landed, so the player can't skip the animation.
function UhOhButton({ onClick }){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    setReady(false);
    const t=setTimeout(()=>setReady(true),1600);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <button
      style={{
        ...C.btn(ready?"#7a2030":"#3a1018"),
        width:"100%",
        opacity:ready?1:0.55,
        cursor:ready?"pointer":"default",
        transition:"opacity 0.3s, background 0.3s",
      }}
      disabled={!ready}
      onClick={ready?onClick:undefined}>
      {ready?"Uh oh…":"…"}
    </button>
  );
}
