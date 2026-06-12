// ═══════════════════════════════════════════════════════════════
// CAMPUS — reactive exploration with secrets, quests, sightings
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from 'react';
import { C } from '../styles.js';
import { CAMPUS_NODES } from '../gameData/campus.js';
import { explorationSummary } from '../gameData/campusExploration.js';
import { availableSecretsAtNode } from '../gameData/campusSecrets.js';
import { availableElaraQuests } from '../gameData/relicHunter.js';
import { CAMPUS_NARRATIVE_LABELS } from '../gameData/pharmacistCampus.js';
import { CampusDeviceEncounterPanel } from '../components/CampusDeviceEncounterPanel.jsx';

const MAP_W = 420, MAP_H = 300;
const px = (x) => (x / 100) * MAP_W;
const py = (y) => (y / 100) * MAP_H;

function CampusMap({ at, moveTo, secretNodes, showSecretMarkers }){
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
  const secretSet = new Set(secretNodes || []);
  return(
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{width:"100%",maxWidth:520,background:"rgba(6,12,4,0.65)",border:"1px solid #233018",borderRadius:12}}>
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
      {nodes.map(n=>{
        const isAt = n.id===at;
        const reachable = current && current.exits.includes(n.id);
        const hasSecret = showSecretMarkers && secretSet.has(n.id);
        return(
          <g key={n.id}
            style={{cursor:reachable?"pointer":"default"}}
            onClick={()=>reachable&&moveTo(n.id)}>
            {isAt&&<circle cx={px(n.x)} cy={py(n.y)} r={17} fill="none" stroke="#80d060" strokeWidth={1} opacity={0.3}/>}
            {hasSecret&&!isAt&&<circle cx={px(n.x)} cy={py(n.y)} r={14} fill="none" stroke="#c0a040" strokeWidth={1} opacity={0.45} strokeDasharray="2 2"/>}
            <circle cx={px(n.x)} cy={py(n.y)} r={isAt?13:9.5}
              fill={isAt?"#2a5018":reachable?"#162610":"#0c1608"}
              stroke={isAt?"#90d060":reachable?"#4a7038":"#1e2c16"}
              strokeWidth={isAt?2:1}
              opacity={1}
            />
            <text x={px(n.x)} y={py(n.y)+4.5} textAnchor="middle" fontSize={isAt?"11":"10"}>{n.emoji}</text>
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

function logLineColor(line) {
  if (line.startsWith("👁")) return "#d0c890";
  if (line.startsWith("🎒") || line.startsWith("🌿")) return "#90c878";
  if (line.startsWith("👋") || line.startsWith("🗺️")) return "#c0d0a0";
  if (line.startsWith("🔓") || line.startsWith("🔍")) return "#d8c070";
  if (line.startsWith("🕯️") || line.startsWith("⚠️")) return "#c09070";
  if (line.startsWith("→")) return "#6a8a5a";
  if (line.startsWith("✨")) return "#a0e080";
  if (line.startsWith("🎯") || line.startsWith("📡") || line.startsWith("🎭") || line.startsWith("💧")) return "#c0a0e0";
  if (line.startsWith("🌙") || line.startsWith("🪑")) return "#a09070";
  return "#a8b898";
}

export function CampusView({
  campusState,
  moveToCampusNode,
  lookAround,
  searchCampus,
  beginElaraQuest,
  explorationCtx,
  campusTier = 0,
  elaraMet = false,
  deviceInventory,
  useCampusDevice,
  dismissCampusEncounter,
}){
  const node = CAMPUS_NODES[campusState.at] || CAMPUS_NODES["office"];
  const exploration = campusState.exploration || {};
  const summary = explorationSummary(exploration);
  const [logMinimized, setLogMinimized] = useState(false);
  const logRef = useRef(null);
  const secretsHere = elaraMet ? availableSecretsAtNode(campusState.at, exploration, explorationCtx || {}) : [];
  const quests = elaraMet ? availableElaraQuests(exploration, explorationCtx || {}) : [];
  const secretNodeIds = secretsHere.map(s => s.nodeId);
  const lastLine = campusState.log[campusState.log.length - 1];

  useEffect(()=>{ if(!logMinimized && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; },[campusState.log, logMinimized]);

  return(
    <div>
      <p style={C.secT}>Campus — {node.emoji} {node.label}</p>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{flex:"0 0 auto"}}>
          <CampusMap
            at={campusState.at}
            moveTo={moveToCampusNode}
            secretNodes={secretNodeIds}
            showSecretMarkers={elaraMet}
          />
          <div style={{fontSize:9,color:"#3a5a2a",marginTop:5,letterSpacing:0.5,lineHeight:1.5}}>
            Walk between locations for travel events. Search for hidden areas.
            {campusTier > 0 && (
              <span style={{display:"block",color:"#6a8a50",marginTop:3}}>
                Campus impact: {CAMPUS_NARRATIVE_LABELS[campusTier]}
              </span>
            )}
          </div>
          {elaraMet && (
            <div style={{...C.card,marginTop:8,padding:"8px 10px",borderColor:"#2a3a1a"}}>
              <div style={{fontSize:9,color:"#5a7a4a",letterSpacing:0.5,marginBottom:4}}>EXPLORATION</div>
              <div style={{fontSize:11,color:"#90b080"}}>
                Secrets: {summary.secretsSolved}/{summary.secretsTotal}
              </div>
              {summary.questLabel && (
                <div style={{fontSize:10,color:"#b0c090",marginTop:4}}>
                  Quest: {summary.questLabel} ({summary.questStep}/{summary.questSteps})
                </div>
              )}
              {secretsHere.length > 0 && (
                <div style={{fontSize:10,color:"#d0c080",marginTop:6,lineHeight:1.4}}>
                  {secretsHere[0].emoji} {secretsHere[0].hint}
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{flex:"1 1 320px",minWidth:280}}>
          <div style={{...C.card,borderColor:"#1a2a14",padding:0,overflow:"hidden",marginBottom:8}}>
            <div style={{
              background:"linear-gradient(135deg,#0c1808,#131e0c)",
              borderBottom:"1px solid #1e2e14",
              padding:"10px 14px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"flex-start",
              gap:8,
            }}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:"#a0d080"}}>{node.emoji} {node.label}</div>
                <div style={{fontSize:11,color:"#5a7a4a",marginTop:3,lineHeight:1.5}}>{node.desc}</div>
              </div>
              <button
                type="button"
                style={{...C.smBtn,flexShrink:0,fontSize:9,padding:"4px 8px"}}
                onClick={()=>setLogMinimized(v=>!v)}
                title={logMinimized ? "Expand exploration log" : "Minimize exploration log"}
              >
                {logMinimized ? "▸ Log" : "▾ Minimize"}
              </button>
            </div>
            {logMinimized ? (
              <div style={{padding:"8px 14px",fontSize:11,color:"#7a9a6a",fontStyle:"italic",lineHeight:1.5,borderTop:"1px solid #1a2a14"}}>
                {lastLine || "Log minimized."}
              </div>
            ) : (
              <div ref={logRef} style={{height:200,overflowY:"auto",padding:"10px 14px"}}>
                {campusState.log.length === 0 && (
                  <div style={{fontSize:11,color:"#3a5a2a",fontStyle:"italic"}}>You have just arrived. Look around or search for secrets.</div>
                )}
                {campusState.log.map((line,i)=>(
                  <div key={i} style={{
                    fontSize:12,lineHeight:1.7,marginBottom:5,
                    color: logLineColor(line),
                    fontStyle:line.startsWith("→")?"normal":"italic",
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
          {campusState.activeEncounter && useCampusDevice && (
            <CampusDeviceEncounterPanel
              encounter={campusState.activeEncounter}
              deviceInventory={deviceInventory}
              onUseDevice={useCampusDevice}
              onDismiss={dismissCampusEncounter}
            />
          )}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            <button style={C.btn("#1e3a12")} onClick={lookAround}>👁 Look around</button>
            <button style={C.btn("#2a3018")} onClick={searchCampus}>🔍 Search area</button>
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
          {elaraMet && quests.length > 0 && (
            <div style={{...C.card,borderColor:"#3a3520",padding:"10px 12px"}}>
              <div style={{fontSize:9,color:"#8a7a50",letterSpacing:0.5,marginBottom:6}}>INDIANA'S QUESTS</div>
              {quests.map(q=>(
                <div key={q.id} style={{marginBottom:8}}>
                  <div style={{fontSize:11,color:"#d0c8a0",fontWeight:600}}>{q.label}</div>
                  <div style={{fontSize:10,color:"#7a7a5a",marginBottom:4,lineHeight:1.4}}>{q.desc}</div>
                  <button style={C.smBtn} onClick={()=>beginElaraQuest(q.id)} disabled={!!exploration.questId}>
                    Accept quest
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
