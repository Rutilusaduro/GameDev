import { C } from '../styles.js';
import { LILITH_ID } from '../gameData/lilith.js';

export function DebugPanel({ adminScrutiny, ap, debugApply, debugInputs, setAdminScrutiny, setAp, setDebugInputs, setDebugOpen, setLilithUnlocked, setStudents, students }){
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
