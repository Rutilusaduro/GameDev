import { useState } from 'react';
import { C } from '../styles.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { render, createContext, getSeason, relSize, _registryEntries } from '../textEngine/engine.js';
import { renderHiveIntake } from '../textEngine/scenes/hiveIntake.js';
import { DialogueLab } from './DialogueLab.jsx';

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__textEngine = { render, createContext, getSeason, relSize };
}

// Sweep the hive-intake scene across size/corruption/season combos
// to eyeball variant coverage and catch unresolved slots.
function sampleTextEngine(){
  const out=[];
  const combos=[
    { lilithLbs:110, victimLbs:380, corruption:0, week:6,  label:"tiny Lilith / huge victims / winter" },
    { lilithLbs:820, victimLbs:150, corruption:90, week:14, label:"colossal Lilith / thin victims / summer" },
    { lilithLbs:200, victimLbs:210, corruption:40, week:2,  label:"average Lilith / similar victims / fall" },
    { lilithLbs:340, victimLbs:340, corruption:90, week:10, label:"heavy Lilith / heavy victims / spring" },
    { lilithLbs:140, victimLbs:90,  corruption:0,  week:7,  label:"small Lilith / tiny victims / winter" },
    { lilithLbs:520, victimLbs:600, corruption:40, week:15, label:"massive both / summer" },
  ];
  for(const c of combos){
    const lilith={ name:"Lilith", lbs:c.lilithLbs, corruption:c.corruption, bodyType:"hourglass", relationship:50 };
    const victims=[
      { name:"a dorm resident", lbs:c.victimLbs, bodyType:"pear", corruption:0, relationship:0 },
      { name:"a dorm resident", lbs:c.victimLbs, bodyType:"apple", corruption:0, relationship:0 },
    ];
    out.push(`── ${c.label} (season: ${getSeason(c.week)}) ──\n${renderHiveIntake(lilith,victims,c.week)}`);
  }
  return out.join("\n\n");
}

export function DebugPanel({ adminScrutiny, ap, debugApply, debugInputs, setAdminScrutiny, setAp, setDebugInputs, setDebugOpen, setLilithUnlocked, setStudents, students }){
  const [textSample,setTextSample]=useState(null);
  const [labOpen,setLabOpen]=useState(false);
  return(
        <div style={{...C.overlay,alignItems:"flex-start",paddingTop:16,overflowY:"auto"}}>
          <div style={{...C.modal,maxWidth:700,width:"95%",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:11,letterSpacing:3,color:"#60b060"}}>🐛 DEBUG PANEL</div>
              <button style={C.btn("#333")} onClick={()=>setDebugOpen(false)}>✕ Close</button>
            </div>
            {/* Global controls */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,padding:10,background:"rgba(255,255,255,0.04)",borderRadius:8}}>
              <div style={{fontSize:10,color:"#888",width:"100%",marginBottom:4}}>GLOBAL</div>
              <label style={{fontSize:11,color:"#aaa",display:"flex",gap:6,alignItems:"center"}}>
                AP:
                <input type="number" defaultValue={ap} min={0} max={999} step={5}
                  style={{width:60,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:11}}
                  onChange={e=>setAp(parseInt(e.target.value)||0)}/>
              </label>
              <label style={{fontSize:11,color:"#aaa",display:"flex",gap:6,alignItems:"center"}}>
                Scrutiny:
                <input type="number" defaultValue={adminScrutiny} min={0} max={100} step={5}
                  style={{width:55,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:11}}
                  onChange={e=>setAdminScrutiny(parseInt(e.target.value)||0)}/>
              </label>
              <button style={{...C.smBtn,background:"rgba(60,100,60,0.4)"}}
                onClick={()=>setStudents(prev=>prev.map(s=>({...s,relationship:100})))}>Max All Rel</button>
              <button style={{...C.smBtn,background:"rgba(80,0,100,0.4)"}}
                onClick={()=>setLilithUnlocked(true)}>🌑 Unlock Lilith</button>
              <button style={{...C.smBtn,background:"rgba(60,30,0,0.5)"}}
                onClick={()=>setStudents(prev=>prev.map(s=>s.id===LILITH_ID?s:{...s,lbs:300}))}>⚖️ All 300 lbs</button>
            </div>
            {/* Text engine harness */}
            <div style={{marginBottom:14,padding:10,background:"rgba(255,255,255,0.04)",borderRadius:8}}>
              <div style={{fontSize:10,color:"#888",marginBottom:6}}>TEXT ENGINE — {_registryEntries().length} registered modules/pools</div>
              <div style={{fontSize:9,color:"#606878",marginBottom:8,lineHeight:1.5}}>
                Dialogue Lab sweeps weigh-in, talk, device ticks, campus devices, hunger interrupts, attitude, and hive intake.
              </div>
              <button style={{...C.smBtn,background:"rgba(100,60,140,0.4)"}}
                onClick={()=>setTextSample(sampleTextEngine())}>📜 Sample hive intake (6 combos)</button>
              <button style={{...C.smBtn,background:"rgba(60,100,140,0.4)",marginLeft:6}}
                onClick={()=>setLabOpen(true)}>🎲 Dialogue Lab</button>
              {labOpen&&<DialogueLab onClose={()=>setLabOpen(false)}/>}
              {textSample&&(
                <pre style={{fontSize:10,color:"#c8b8e0",whiteSpace:"pre-wrap",lineHeight:1.6,marginTop:8,maxHeight:240,overflowY:"auto",background:"rgba(0,0,0,0.3)",padding:8,borderRadius:6}}>
                  {textSample}
                </pre>
              )}
            </div>
            {/* Per-student rows */}
            <div style={{fontSize:10,color:"#888",marginBottom:6}}>STUDENTS</div>
            {students.map(s=>{
              const inp=debugInputs[s.id]||{lbs:String(Math.round(s.lbs)),rel:s.relationship};
              const set=(k,v)=>setDebugInputs(prev=>({...prev,[s.id]:{...inp,[k]:v}}));
              return(
                <div key={s.id} style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",padding:"7px 8px",borderRadius:6,marginBottom:4,background:"rgba(255,255,255,0.03)"}}>
                  <div style={{fontSize:11,color:"#c0a0e0",minWidth:90,fontWeight:700}}>{s.name}</div>
                  <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                    lbs:
                    <input type="number" value={inp.lbs} min={80} step={100}
                      style={{width:70,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                      onChange={e=>set("lbs",e.target.value)}/>
                  </label>
                  <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                    rel:
                    <input type="number" value={inp.rel} min={0} max={100} step={10}
                      style={{width:48,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                      onChange={e=>set("rel",e.target.value)}/>
                  </label>
                  <div style={{display:"flex",gap:4}}>
                    <button style={{...C.smBtn,background:"rgba(40,80,40,0.5)",fontSize:10}} onClick={()=>debugApply(s.id)}>Apply ✓</button>
                    <button style={{...C.smBtn,fontSize:10,background:"rgba(60,20,80,0.4)"}}
                      onClick={()=>{set("lbs","820");set("rel","100");}}>→ Blob</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  );
}
