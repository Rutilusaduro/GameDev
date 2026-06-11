import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import {
  HIVE_TASKS,
  HIVE_VPS,
  HIVE_ROOM_COUNT,
  getHiveBmiTier,
  getHiveCapacity,
  getHiveControl,
  getHiveControlPct,
  getFrontierRooms,
} from '../gameData/mayaHive.js';

const HIVE_BG = "#07040d";
const HIVE_PANEL = "rgba(78, 36, 96, 0.28)";
const HIVE_ACC = "#d98cff";
const HIVE_ACC_2 = "#8f6cff";
const HIVE_TEXT = "#f2dfff";
const HIVE_SUB = "#b99ac8";
const HIVE_WARN = "#ffb36b";

function StatPill({label,value,sub,color=HIVE_ACC}){
  return(
    <div style={{background:HIVE_PANEL,border:`1px solid ${color}40`,borderRadius:10,padding:"8px 10px",boxShadow:`0 0 18px ${color}12`}}>
      <div style={{fontSize:8,letterSpacing:2,color:HIVE_SUB,textTransform:"uppercase"}}>{label}</div>
      <div style={{fontSize:17,fontWeight:800,color,marginTop:2}}>{value}</div>
      {sub&&<div style={{fontSize:9,color:HIVE_SUB,marginTop:2}}>{sub}</div>}
    </div>
  );
}

function Bar({pct,color=HIVE_ACC,height=7}){
  return(
    <div style={{height,background:"rgba(255,255,255,0.06)",borderRadius:999,overflow:"hidden",border:"1px solid rgba(255,255,255,0.05)"}}>
      <div style={{height:"100%",width:`${Math.max(0,Math.min(100,pct))}%`,background:`linear-gradient(90deg,${color},#ffffff)`,boxShadow:`0 0 12px ${color}80`,transition:"width .35s"}}/>
    </div>
  );
}

function RoomCell({room,selected,onSelect,frontier}){
  const conquered=room.status==="conquered";
  const softening=room.status==="softening";
  const bg=conquered
    ? "linear-gradient(145deg,rgba(216,140,255,.55),rgba(95,65,125,.65))"
    : softening
      ? "linear-gradient(145deg,rgba(143,108,255,.28),rgba(70,40,90,.35))"
      : frontier
        ? "linear-gradient(145deg,rgba(120,70,130,.15),rgba(30,20,42,.75))"
        : "rgba(255,255,255,.035)";
  const border=selected?HIVE_ACC:conquered?"#d98cff80":softening?"#8f6cff80":frontier?"#8f6cff40":"rgba(255,255,255,.08)";
  return(
    <button onClick={()=>onSelect(room.id)} style={{
      minHeight:58,
      border:`1px solid ${border}`,
      borderRadius:9,
      background:bg,
      color:HIVE_TEXT,
      padding:6,
      textAlign:"left",
      cursor:"pointer",
      position:"relative",
      overflow:"hidden",
      boxShadow:selected?`0 0 20px ${HIVE_ACC}55`:conquered?`0 0 16px ${HIVE_ACC}22`:"none",
    }}>
      {conquered&&<div style={{position:"absolute",inset:-20,background:"radial-gradient(circle,rgba(255,220,255,.22),transparent 55%)",pointerEvents:"none"}}/>}
      <div style={{position:"relative",fontSize:9,fontWeight:800,color:conquered?"#fff":HIVE_SUB}}>{room.id===9?"NEST":room.label}</div>
      <div style={{position:"relative",fontSize:8,color:HIVE_SUB,marginTop:4}}>{conquered?"claimed":softening?"softening":frontier?"frontier":"neutral"}</div>
      {!conquered&&<div style={{position:"relative",marginTop:5}}><Bar pct={room.progress} color={softening?HIVE_ACC_2:"#6c4c85"} height={4}/></div>}
      {conquered&&<div style={{position:"relative",fontSize:15,marginTop:4}}>🟣 🕯️</div>}
    </button>
  );
}

function TaskRow({task,count,canAdd,onAdjust}){
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
      <div>
        <div style={{fontSize:11,fontWeight:800,color:task.color}}>{task.icon} {task.label}</div>
        <div style={{fontSize:9,color:HIVE_SUB,lineHeight:1.4}}>{task.desc}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        <button style={{...C.btn("#25102d"),padding:"4px 8px",border:`1px solid ${task.color}40`}} onClick={()=>onAdjust(task.id,-1)} disabled={count<=0}>-</button>
        <div style={{minWidth:24,textAlign:"center",fontSize:14,fontWeight:800,color:HIVE_TEXT}}>{count}</div>
        <button style={{...C.btn("#3b1750"),padding:"4px 8px",border:`1px solid ${task.color}60`,opacity:canAdd?1:.45}} onClick={()=>onAdjust(task.id,1)} disabled={!canAdd}>+</button>
      </div>
    </div>
  );
}

export function MayaHiveModal({
  hiveState,
  students,
  lilithUnlocked,
  chooseHiveVP,
  adjustHiveAssignment,
  executeMayaHiveShift,
  doMayaHiveVisit,
  doMayaHivePhoto,
  doMayaHiveAbsorb,
  setMayaHiveState,
  closeMayaHive,
}){
  const hs=hiveState;
  const maya=students.find(s=>s.id===hs.mayaStudentId);
  if(!maya) return null;
  const stage=getStage(maya.lbs);
  const control=getHiveControl(hs.rooms);
  const controlPct=getHiveControlPct(hs.rooms);
  const capacity=getHiveCapacity(hs);
  const assigned=Object.values(hs.assignments).reduce((a,b)=>a+b,0);
  const unassigned=Math.max(0,hs.members-assigned);
  const selected=hs.rooms.find(r=>r.id===hs.selectedRoomId)||hs.rooms[0];
  const frontierIds=new Set(getFrontierRooms(hs.rooms).map(r=>r.id));
  const vp=hs.vpId?HIVE_VPS[hs.vpId]:null;
  const bmiTier=getHiveBmiTier(hs.avgBmi);

  const ModalShell=({children,maxWidth=1040})=>(
    <div style={{...C.overlay,zIndex:366}}>
      <div style={{...C.modal,maxWidth,background:`radial-gradient(circle at 50% -20%,rgba(217,140,255,.18),transparent 36%),linear-gradient(160deg,#050208,#13091d 48%,#06030a)`,border:`1px solid ${HIVE_ACC}55`,boxShadow:`0 0 40px ${HIVE_ACC}22`,maxHeight:"90vh",overflowY:"auto"}}>
        {children}
      </div>
    </div>
  );

  if(hs.view==="result"){
    const logs=hs.lastShift?.logs||[];
    return(
      <ModalShell maxWidth={650}>
        <div style={{fontSize:9,letterSpacing:4,color:HIVE_ACC,marginBottom:8}}>🕸️ SHIFT RESOLUTION</div>
        <div style={{fontSize:18,fontWeight:900,color:HIVE_TEXT,marginBottom:10}}>The Hive breathes outward.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
          <StatPill label="Biomass" value={`+${hs.lastShift?.biomassGain||0}`} />
          <StatPill label="Comfort" value={`+${hs.lastShift?.comfortGain||0}`} color="#9c7cff" />
          <StatPill label="Members" value={`+${hs.lastShift?.memberGain||0}`} color="#ff91b8" />
          <StatPill label="Resonance" value={`+${hs.lastShift?.resonanceGain||0}`} color="#f2b5ff" />
        </div>
        <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:10,padding:12,marginBottom:12}}>
          {logs.map((l,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <div style={{fontSize:8,letterSpacing:2,color:l.type==="milestone"?"#ffd36b":HIVE_ACC}}>{l.tag}</div>
              <div style={{fontSize:12,lineHeight:1.65,color:HIVE_TEXT}}>{l.text}</div>
            </div>
          ))}
        </div>
        <button style={{...C.btn(HIVE_ACC_2),width:"100%"}} onClick={()=>setMayaHiveState(p=>({...p,view:"main"}))}>Return to Central Nest</button>
      </ModalShell>
    );
  }

  if(hs.view==="vp"){
    return(
      <ModalShell maxWidth={720}>
        <div style={{fontSize:9,letterSpacing:4,color:HIVE_ACC,marginBottom:8}}>👑 CHOOSE VICE QUEEN</div>
        <div style={{fontSize:12,color:HIVE_SUB,lineHeight:1.6,marginBottom:14}}>Maya stays at the center. The VP moves through the dorm in her place, translating the Nest's warmth into policy, appetite, and habit.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {Object.entries(HIVE_VPS).map(([id,opt])=>{
            const student=students.find(s=>s.id===opt.studentId);
            const locked=opt.studentId===15&&!lilithUnlocked;
            const active=hs.vpId===id;
            return(
              <button key={id} disabled={locked} onClick={()=>chooseHiveVP(id)} style={{
                ...C.btn(active?opt.color:"#1a0c22"),
                textAlign:"left",
                padding:12,
                border:`1px solid ${opt.color}66`,
                opacity:locked?0.45:1,
                minHeight:112,
              }}>
                <div style={{fontSize:12,fontWeight:900,color:"#fff"}}>{opt.label}{active?" ✓":""}</div>
                <div style={{fontSize:9,color:HIVE_SUB,margin:"4px 0"}}>{student?`${student.name} · ${Math.round(student.lbs)} lbs`:"Not available"}{locked?" · locked":""}</div>
                <div style={{fontSize:10,lineHeight:1.5,color:HIVE_TEXT}}>{opt.passive}</div>
              </button>
            );
          })}
        </div>
        <button style={{...C.btn(HIVE_BG),width:"100%",marginTop:12,border:`1px solid ${HIVE_ACC_2}40`}} onClick={()=>setMayaHiveState(p=>({...p,view:"main"}))}>Back</button>
      </ModalShell>
    );
  }

  if(hs.view==="visit"||hs.view==="photo"){
    const scene=hs.subState||{};
    return(
      <ModalShell maxWidth={610}>
        <div style={{fontSize:9,letterSpacing:4,color:HIVE_ACC,marginBottom:8}}>{hs.view==="visit"?"🍽️ CENTRAL NEST VISIT":"📷 HIVE STATE"}</div>
        <div style={{fontSize:8,letterSpacing:2,color:HIVE_ACC_2,marginBottom:8}}>{scene.tag}</div>
        <div style={{fontSize:12,color:HIVE_TEXT,lineHeight:1.8,background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:10,padding:12,marginBottom:12}}>{scene.text}</div>
        {scene.gain>0&&<div style={{fontSize:12,fontWeight:800,color:HIVE_ACC,marginBottom:12}}>Maya +{scene.gain} lbs · Hive Biomass +{scene.biomass||0}</div>}
        <button style={{...C.btn(HIVE_ACC_2),width:"100%"}} onClick={()=>setMayaHiveState(p=>({...p,view:"main",subState:null}))}>Return to Hive</button>
      </ModalShell>
    );
  }

  return(
    <ModalShell>
      <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
        <div>
          <div style={{fontSize:9,letterSpacing:4,color:HIVE_ACC}}>🕸️ DELIVERY HIVE QUEEN</div>
          <div style={{fontSize:20,fontWeight:900,color:HIVE_TEXT,marginTop:4}}>Maya's Central Nest</div>
          <div style={{fontSize:10,color:HIVE_SUB,marginTop:3}}>Maya {Math.round(maya.lbs)} lbs · {stage.label} · Hive BMI {bmiTier}</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button style={{...C.btn(vp?vp.color:HIVE_ACC_2),fontSize:10}} onClick={()=>setMayaHiveState(p=>({...p,view:"vp"}))}>{vp?`VP: ${vp.name}`:"Choose VP"}</button>
          <button style={{...C.btn(HIVE_BG),fontSize:10,border:`1px solid ${HIVE_ACC_2}40`}} onClick={closeMayaHive}>Close</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:14}}>
        <StatPill label="Biomass" value={hs.hiveBiomass} sub="stored softness" />
        <StatPill label="Dorm Control" value={`${controlPct}%`} sub={`${control}/${HIVE_ROOM_COUNT} rooms`} color="#c78bff" />
        <StatPill label="Members" value={`${hs.members}/${capacity}`} sub={`${unassigned} idle`} color="#ff91b8" />
        <StatPill label="Nest Comfort" value={hs.nestComfort} sub={`capacity ${hs.centralNestCapacity}`} color="#9c7cff" />
        <StatPill label="Stability" value={`${hs.stability}%`} sub="maintenance" color={hs.stability<35?HIVE_WARN:"#80d8c0"} />
        <StatPill label="Resonance" value={hs.spiritResonance} sub="spirit pressure" color="#f2b5ff" />
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.2fr .9fr",gap:14}}>
        <div>
          <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:12,padding:12,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:9,letterSpacing:3,color:HIVE_ACC}}>DORM GRID</div>
              <div style={{fontSize:9,color:HIVE_SUB}}>Lavender rooms feed the center.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:7}}>
              {hs.rooms.map(room=><RoomCell key={room.id} room={room} selected={room.id===selected.id} frontier={frontierIds.has(room.id)} onSelect={(id)=>setMayaHiveState(p=>({...p,selectedRoomId:id}))}/>)}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:12,padding:12}}>
              <div style={{fontSize:9,letterSpacing:3,color:HIVE_ACC,marginBottom:8}}>SELECTED ROOM</div>
              <div style={{fontSize:14,fontWeight:900,color:HIVE_TEXT}}>{selected.label}</div>
              <div style={{fontSize:10,color:HIVE_SUB,margin:"5px 0"}}>{selected.status} · craving {selected.craving}%</div>
              <Bar pct={selected.status==="conquered"?100:selected.progress} color={selected.status==="conquered"?HIVE_ACC:HIVE_ACC_2}/>
              <div style={{fontSize:10,color:HIVE_TEXT,lineHeight:1.55,marginTop:8}}>
                <strong style={{color:HIVE_ACC}}>{selected.bonus?.label}</strong><br/>{selected.bonus?.desc}
              </div>
              {selected.lastTag&&<div style={{fontSize:8,letterSpacing:1,color:HIVE_ACC_2,marginTop:8}}>{selected.lastTag}</div>}
            </div>

            <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:12,padding:12}}>
              <div style={{fontSize:9,letterSpacing:3,color:HIVE_ACC,marginBottom:8}}>PROFESSOR ACTIONS</div>
              <button style={{...C.btn(HIVE_ACC_2),width:"100%",textAlign:"left",marginBottom:8}} onClick={doMayaHiveVisit}>🍽️ Visit Central Nest</button>
              <button style={{...C.btn("#3d224c"),width:"100%",textAlign:"left",marginBottom:8,border:`1px solid ${HIVE_ACC}33`}} onClick={doMayaHivePhoto}>📷 Observe Hive State</button>
              <button
                disabled={!vp?.effects?.absorb||hs.members<=1}
                style={{...C.btn(vp?.effects?.absorb?"#7a1530":"#2a1c30"),width:"100%",textAlign:"left",opacity:vp?.effects?.absorb&&hs.members>1?1:.45,border:"1px solid #e8294a55"}}
                onClick={doMayaHiveAbsorb}>
                🌑 Lilith: Absorb Devotee
              </button>
              <div style={{fontSize:9,color:HIVE_SUB,lineHeight:1.45,marginTop:8}}>Your gluttony-spirit influence gathers as resonance. Expansion automatically spends a little of it as a soft command through adjacent rooms.</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:12,padding:12,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:9,letterSpacing:3,color:HIVE_ACC}}>TASK BOARD</div>
              <div style={{fontSize:9,color:unassigned<0?HIVE_WARN:HIVE_SUB}}>Assigned {assigned}/{hs.members}</div>
            </div>
            {HIVE_TASKS.map(task=>(
              <TaskRow key={task.id} task={task} count={hs.assignments[task.id]||0} canAdd={assigned<hs.members} onAdjust={adjustHiveAssignment}/>
            ))}
            <button disabled={assigned>hs.members} style={{...C.btn(HIVE_ACC),width:"100%",marginTop:12,opacity:assigned<=hs.members?1:.45}} onClick={executeMayaHiveShift}>Execute Shift</button>
          </div>

          <div style={{background:HIVE_PANEL,border:`1px solid ${HIVE_ACC}33`,borderRadius:12,padding:12}}>
            <div style={{fontSize:9,letterSpacing:3,color:HIVE_ACC,marginBottom:8}}>HIVE LOG</div>
            <div style={{maxHeight:230,overflowY:"auto"}}>
              {hs.log.map((entry,i)=>(
                <div key={i} style={{padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontSize:8,letterSpacing:1,color:entry.type==="milestone"?"#ffd36b":HIVE_ACC_2}}>{entry.tag}</div>
                  <div style={{fontSize:10,color:HIVE_TEXT,lineHeight:1.45}}>{entry.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
