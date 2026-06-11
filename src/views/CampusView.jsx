// ═══════════════════════════════════════════════════════════════
// CAMPUS — text-adventure exploration with a live 18-node map
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import { C } from '../styles.js';
import { CAMPUS_NODES } from '../gameData/campus.js';

const MAP_W = 420, MAP_H = 300;
const px = (x) => (x / 100) * MAP_W;
const py = (y) => (y / 100) * MAP_H;

function CampusMap({ at, moveTo }){
  const nodes = Object.values(CAMPUS_NODES);
  const edges = [];
  const seen = new Set();
  for (const n of nodes) for (const ex of n.exits) {
    if(!CAMPUS_NODES[ex]) continue;
    const key = [n.id, ex].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push([n, CAMPUS_NODES[ex]]);
  }
  const current = CAMPUS_NODES[at];
  return(
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{width:"100%",maxWidth:520,background:"rgba(6,12,4,0.65)",border:"1px solid #233018",borderRadius:12}}>
      {/* path lines */}
      {edges.map(([a,b],i)=>{
        const active = a.id===at || b.id===at;
        return(
          <line key={i}
            x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)}
            stroke={active?"#6a9a5a":"#243018"}
            strokeWidth={active?1.8:1}
            strokeDasharray={active?"5 3":"3 4"}
            opacity={active?0.9:0.55}
          />
        );
      })}
      {/* nodes */}
      {nodes.map(n=>{
        const isAt = n.id===at;
        const reachable = current && current.exits.includes(n.id);
        return(
          <g key={n.id}
            style={{cursor:reachable?"pointer":"default"}}
            onClick={()=>reachable&&moveTo(n.id)}>
            {/* glow ring for current */}
            {isAt&&<circle cx={px(n.x)} cy={py(n.y)} r={17} fill="none" stroke="#80d060" strokeWidth={1} opacity={0.3}/>}
            <circle cx={px(n.x)} cy={py(n.y)} r={isAt?13:9.5}
              fill={isAt?"#2a5018":reachable?"#162610":"#0c1608"}
              stroke={isAt?"#90d060":reachable?"#4a7038":"#1e2c16"}
              strokeWidth={isAt?2:1}
              opacity={1}
            />
            <text x={px(n.x)} y={py(n.y)+4.5} textAnchor="middle" fontSize={isAt?"11":"10"}>{n.emoji}</text>
            {/* label above */}
            <text x={px(n.x)} y={py(n.y)-16} textAnchor="middle" fontSize="6.5"
              fill={isAt?"#b0f080":reachable?"#7a9a6a":"#3a4a30"}
              style={{letterSpacing:0.4,fontWeight:isAt?"bold":"normal"}}>
              {n.label.length>12 ? n.label.slice(0,11)+"…" : n.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CampusView({ campusState, moveToCampusNode, lookAround }){
  const node = CAMPUS_NODES[campusState.at] || CAMPUS_NODES["office"];
  const logRef = useRef(null);
  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; },[campusState.log]);
  return(
    <div>
      <p style={C.secT}>Campus — {node.emoji} {node.label}</p>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        {/* map column */}
        <div style={{flex:"0 0 auto"}}>
          <CampusMap at={campusState.at} moveTo={moveToCampusNode}/>
          <div style={{fontSize:9,color:"#3a5a2a",marginTop:5,letterSpacing:0.5}}>
            Click a connected location to move there. Walking costs no AP.
          </div>
        </div>
        {/* log + controls */}
        <div style={{flex:"1 1 320px",minWidth:280}}>
          <div style={{...C.card,borderColor:"#1a2a14",padding:0,overflow:"hidden",marginBottom:8}}>
            {/* location header */}
            <div style={{
              background:"linear-gradient(135deg,#0c1808,#131e0c)",
              borderBottom:"1px solid #1e2e14",
              padding:"10px 14px",
            }}>
              <div style={{fontSize:13,fontWeight:700,color:"#a0d080"}}>{node.emoji} {node.label}</div>
              <div style={{fontSize:11,color:"#5a7a4a",marginTop:3,lineHeight:1.5}}>{node.desc}</div>
            </div>
            {/* log */}
            <div ref={logRef} style={{height:200,overflowY:"auto",padding:"10px 14px"}}>
              {campusState.log.length === 0 && (
                <div style={{fontSize:11,color:"#3a5a2a",fontStyle:"italic"}}>You have just arrived. Look around.</div>
              )}
              {campusState.log.map((line,i)=>(
                <div key={i} style={{
                  fontSize:12,lineHeight:1.7,marginBottom:5,
                  color: line.startsWith("👁")?"#d0c890"
                       : line.startsWith("🎒")?"#90c878"
                       : line.startsWith("👋")?"#c0d0a0"
                       : line.startsWith("→")?"#6a8a5a"
                       : "#a8b898",
                  fontStyle:line.startsWith("→")?"normal":"italic",
                }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
          {/* action buttons */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button style={C.btn("#1e3a12")} onClick={lookAround}>👁 Look around</button>
            {node.exits.map(ex=>{
              const dest = CAMPUS_NODES[ex];
              if(!dest) return null;
              return(
                <button key={ex} style={C.smBtn} onClick={()=>moveToCampusNode(ex)}>
                  {dest.emoji} {dest.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
