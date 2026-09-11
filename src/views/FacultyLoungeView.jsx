// ═══════════════════════════════════════════════════════════════
// STAFF LOUNGE VIEW — chat with fellow RAs and campus staff
// Dialogue trees gated by affinity; persisted per teacher.
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { FACULTY, FACULTY_CONFIG, FACULTY_AFFINITY_TIERS, getFacultyTier } from '../gameData/faculty.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from '../components/ModalOverlay.jsx';
import { C } from '../styles.js';
import { createContext, render } from '../textEngine/engine.js';
import '../textEngine/scenes/proseOverhaulPass4.js';

// ── affinity bar ──────────────────────────────────────────────

function AffinityBar({ value, color }){
  const pct = Math.min(100, Math.round((value / FACULTY_CONFIG.maxAffinity) * 100));
  return(
    <div style={{height:5,background:"rgba(0,0,0,0.3)",borderRadius:3,overflow:"hidden",marginTop:4}}>
      <div style={{
        height:"100%",width:`${pct}%`,
        background:`linear-gradient(90deg,${color}88,${color})`,
        borderRadius:3,transition:"width 0.4s",
      }}/>
    </div>
  );
}

// ── dialogue modal ────────────────────────────────────────────

function DialogueModal({ teacher, affinity, onClose, onAffinityGain, soundEnabled = true }){
  const [nodeId, setNodeId] = useState("hub");
  const node = teacher.tree[nodeId];
  if(!node) return null;

  const text = typeof node.text === "function" ? node.text(teacher, affinity) : node.text;
  const glow = (nodeId === 'nights' || nodeId === 'nights2')
    ? (render('{faculty.afterglow}', createContext({ week: 1 }))?.trim() || '')
    : '';
  const availableOptions = node.options.filter(opt => {
    if(opt.minAffinity && affinity < opt.minAffinity) return false;
    return true;
  });
  const handleOption = (opt) => {
    if(opt.end){
      onClose();
      return;
    }
    if(opt.affinity) onAffinityGain(opt.affinity);
    setNodeId(opt.next);
  };

  const tier = getFacultyTier(affinity);

  return(
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onClose(); }} soundEnabled={soundEnabled}>
      <div style={{
        ...C.modal,
        maxWidth:560,
        borderColor:`${teacher.color}60`,
        boxShadow:`0 0 60px ${teacher.color}25`,
      }}>
        {/* header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <span style={{fontSize:32}}>{teacher.emoji}</span>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:teacher.color}}>{teacher.name}</div>
              <div style={{fontSize:11,color:"#8a6aa0"}}>{teacher.role}</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{
              ...C.tag(`${tier.color}22`,tier.color),
              fontSize:9,
            }}>{tier.label.toUpperCase()}</div>
            <div style={{fontSize:10,color:"#7a5a90",marginTop:4}}>{affinity} / {FACULTY_CONFIG.maxAffinity}</div>
          </div>
        </div>

        <AffinityBar value={affinity} color={teacher.color}/>

        {/* speech bubble */}
        <div style={{
          background:`${teacher.color}10`,
          border:`1px solid ${teacher.color}30`,
          borderRadius:10,
          padding:"14px 16px",
          margin:"14px 0",
          fontSize:13,
          color:"#ddd0b8",
          lineHeight:1.75,
          fontStyle:"italic",
        }}>
          {text}
          {glow ? <div style={{ marginTop: 10, opacity: 0.85 }}>{glow}</div> : null}
        </div>

        {/* options */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {availableOptions.map((opt,i)=>(
            <button
              key={i}
              style={{
                ...C.btn(opt.end ? "#1a0830" : teacher.color),
                textAlign:"left",
                padding:"10px 14px",
                fontSize:12,
                lineHeight:1.4,
                border: opt.end ? `1px solid #2a1448` : "none",
                opacity: opt.end ? 0.7 : 1,
              }}
              onClick={()=>handleOption(opt)}
            >
              {opt.label}
              {opt.affinity > 0 && (
                <span style={{float:"right",fontSize:10,opacity:0.7,color:"#d0f0c0"}}>+{opt.affinity} affinity</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
}

// ── faculty card ──────────────────────────────────────────────

function FacultyCard({ teacher, affinity, onClick }){
  const tier = getFacultyTier(affinity);
  const pct  = Math.min(100, Math.round((affinity / FACULTY_CONFIG.maxAffinity) * 100));

  return(
    <div
      style={{
        ...C.card,
        border:`1px solid ${teacher.color}35`,
        borderRadius:10,
        padding:"12px 14px",
        cursor:"pointer",
        transition:"border-color 0.2s, box-shadow 0.2s",
        boxShadow: affinity >= 50 ? `0 0 14px ${teacher.color}20` : "none",
      }}
      onClick={onClick}
    >
      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
        <span style={{fontSize:28,lineHeight:1}}>{teacher.emoji}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
            <div style={{fontSize:14,fontWeight:700,color:teacher.color}}>{teacher.name}</div>
            <div style={{
              ...C.tag(`${tier.color}22`,tier.color),
              fontSize:9,flexShrink:0,
            }}>{tier.label}</div>
          </div>
          <div style={{fontSize:10,color:"#7a5a90",marginTop:2}}>{teacher.role}</div>
          <div style={{fontSize:11,color:"#9a7ab8",marginTop:5,lineHeight:1.5}}>{teacher.desc}</div>

          {/* affinity bar */}
          <div style={{marginTop:8}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#6a4a80",marginBottom:3}}>
              <span>Affinity</span>
              <span>{affinity} / {FACULTY_CONFIG.maxAffinity}</span>
            </div>
            <div style={{height:4,background:"rgba(0,0,0,0.3)",borderRadius:2,overflow:"hidden"}}>
              <div style={{
                height:"100%",width:`${pct}%`,
                background:`linear-gradient(90deg,${teacher.color}70,${teacher.color})`,
                borderRadius:2,transition:"width 0.4s",
              }}/>
            </div>
            {/* tier tick marks */}
            <div style={{position:"relative",height:8,marginTop:1}}>
              {FACULTY_AFFINITY_TIERS.slice(1).map(t=>{
                const pos = (t.min / FACULTY_CONFIG.maxAffinity) * 100;
                const reached = affinity >= t.min;
                return(
                  <div key={t.min} style={{
                    position:"absolute",
                    left:`${pos}%`,
                    fontSize:7,
                    color: reached ? t.color : "#3a2050",
                    transform:"translateX(-50%)",
                    whiteSpace:"nowrap",
                  }}>
                    ▲{t.min}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop:8,fontSize:11,
        color:teacher.color,
        opacity:0.7,
        textAlign:"right",
      }}>
        Talk →
      </div>
    </div>
  );
}

// ── main view ─────────────────────────────────────────────────

export function FacultyLoungeView({ facultyAffinity, setFacultyAffinity }){
  const [openTeacher, setOpenTeacher] = useState(null);
  const affinity = facultyAffinity || {};

  const handleAffinityGain = (teacherId, amount) => {
    setFacultyAffinity(prev => ({
      ...prev,
      [teacherId]: Math.min(FACULTY_CONFIG.maxAffinity, (prev[teacherId] || 0) + amount),
    }));
  };

  const activeTeacher = openTeacher ? FACULTY.find(t => t.id === openTeacher) : null;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>

      {/* header */}
      <div style={{...C.card,padding:"14px 16px"}}>
        <div style={{fontSize:10,letterSpacing:3,color:"#c46a4a",marginBottom:6}}>STAFF LOUNGE</div>
        <div style={{fontSize:13,color:"#b0a0a0",lineHeight:1.65}}>
          Fellow RAs, coaches, and campus staff. They've noticed what's happening on your floor. Some approve — enthusiastically. Build affinity through conversation to unlock deeper branches.
        </div>
        <div style={{fontSize:10,color:"#8a6060",marginTop:6}}>
          Conversations are free (0 AP). You can also encounter staff while exploring campus.
        </div>
      </div>

      {/* faculty grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
        {FACULTY.map(t=>(
          <FacultyCard
            key={t.id}
            teacher={t}
            affinity={affinity[t.id] || 0}
            onClick={()=>setOpenTeacher(t.id)}
          />
        ))}
      </div>

      {/* dialogue modal */}
      {activeTeacher && (
        <DialogueModal
          teacher={activeTeacher}
          affinity={affinity[activeTeacher.id] || 0}
          onClose={()=>setOpenTeacher(null)}
          onAffinityGain={(amt)=>handleAffinityGain(activeTeacher.id, amt)}
        />
      )}
    </div>
  );
}
