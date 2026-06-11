// ═══════════════════════════════════════════════════════════════
// CAMPUS — text-adventure exploration with a live map
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import { C } from '../styles.js';
import { CAMPUS_NODES } from '../gameData/campus.js';

const MAP_W = 320, MAP_H = 230;
const px = (x) => (x / 100) * MAP_W;
const py = (y) => (y / 100) * MAP_H;

function CampusMap({ at, moveTo }){
  const nodes = Object.values(CAMPUS_NODES);
  const edges = [];
  const seen = new Set();
  for (const n of nodes) for (const ex of n.exits) {
    const key = [n.id, ex].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push([n, CAMPUS_NODES[ex]]);
  }
  const current = CAMPUS_NODES[at];
  return(
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{width:"100%",maxWidth:480,background:"rgba(10,20,8,0.5)",border:"1px solid #2a4020",borderRadius:10}}>
      {edges.map(([a,b],i)=>(
        <line key={i} x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)}
          stroke={a.id===at||b.id===at?"#7ab06a":"#2e4426"} strokeWidth={a.id===at||b.id===at?2:1.2} strokeDasharray="4 3"/>
      ))}
      {nodes.map(n=>{
        const isAt = n.id===at;
        const reachable = current.exits.includes(n.id);
        return(
          <g key={n.id} style={{cursor:reachable?"pointer":"default"}} onClick={()=>reachable&&moveTo(n.id)}>
            <circle cx={px(n.x)} cy={py(n.y)} r={isAt?13:10}
              fill={isAt?"#3a6028":reachable?"#22381c":"#141f10"}
              stroke={isAt?"#a0e080":reachable?"#5a8a4a":"#2e4426"} strokeWidth={isAt?2:1}/>
            <text x={px(n.x)} y={py(n.y)+4} textAnchor="middle" fontSize="11">{n.emoji}</text>
            <text x={px(n.x)} y={py(n.y)-15} textAnchor="middle" fontSize="7.5"
              fill={isAt?"#c0f0a0":reachable?"#8aaa7a":"#4a5a42"} style={{letterSpacing:0.5}}>
              {n.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CampusView({ campusState, moveToCampusNode, lookAround }){
  const node = CAMPUS_NODES[campusState.at];
  const logRef = useRef(null);
  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; },[campusState.log]);
  return(
    <div>
      <p style={C.secT}>Campus — {node.emoji} {node.label}</p>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{flex:"1 1 340px",minWidth:300}}>
          <CampusMap at={campusState.at} moveTo={moveToCampusNode}/>
          <div style={{fontSize:10,color:"#4a6a3a",marginTop:4}}>Click a connected location to walk there. Walking is free.</div>
        </div>
        <div style={{flex:"1 1 360px",minWidth:300}}>
          <div ref={logRef} style={{...C.infoBox("rgba(8,14,6,0.6)"),height:240,overflowY:"auto"}}>
            {campusState.log.map((line,i)=>(
              <div key={i} style={{fontSize:12,lineHeight:1.7,marginBottom:6,
                color:line.startsWith("👁")?"#d8c8a0":line.startsWith("🎒")?"#a0c890":line.startsWith("→")?"#7a9a6a":"#b8c8a8",
                fontStyle:line.startsWith("→")?"normal":"italic"}}>
                {line}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
            <button style={C.btn("#2a4a1c")} onClick={lookAround}>👁 Look around</button>
            {node.exits.map(ex=>(
              <button key={ex} style={C.smBtn} onClick={()=>moveToCampusNode(ex)}>
                → {CAMPUS_NODES[ex].emoji} {CAMPUS_NODES[ex].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
