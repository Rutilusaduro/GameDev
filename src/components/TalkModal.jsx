// ═══════════════════════════════════════════════════════════════
// TALK MODAL — conversations with a student
// Topics gated by skill effects; responses by corruption tier.
// Register codas appended when corruption tier + skills qualify.
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { TALK_TOPICS, TALK_CONFIG } from '../gameData/talkSystem.js';
import { buildTalkResponse } from '../gameData/talkDialogue.js';
import { buildDevourScene } from '../gameData/devourScene.js';
import { getCorruptionTier } from '../gameData/corruption.js';
import { getStage } from '../gameData/stages.js';
import { createContext, render } from '../textEngine/engine.js';
import '../textEngine/scenes/talkCodas.js'; // registers talk.coda
import { getBodyDescRich } from '../utils/gameHelpers.js';
import { C } from '../styles.js';

// ── response builder ──────────────────────────────────────────

function buildResponse(topic, student, skillEffects, week){
  const corTier = getCorruptionTier(student.corruption || 0).id;

  let text;
  if (topic.sceneType === 'devour') {
    text = buildDevourScene(student, corTier, week);
  } else {
    text = buildTalkResponse(topic.id, student, corTier);
    const ctx = createContext({ subject: student, skillEffects });
    text += render("{talk.coda|prefix: }", ctx, { noSmooth: true });
  }

  return text;
}

// ── topic card ────────────────────────────────────────────────

const GROUP_COLORS = {
  talk:    "#8040c0",
  suggest: "#4080e0",
  command: "#d04040",
};

function TopicCard({ topic, student, skillEffects, onSelect, disabled }){
  const col = GROUP_COLORS[topic.group] || "#8040c0";
  return(
    <button
      style={{
        display:"flex",alignItems:"flex-start",gap:10,
        background: disabled ? "rgba(0,0,0,0.15)" : `${col}18`,
        border: `1px solid ${disabled ? "#1a0830" : col+"40"}`,
        borderRadius:10,padding:"10px 12px",cursor:disabled?"not-allowed":"pointer",
        textAlign:"left",opacity:disabled?0.4:1,
        transition:"background 0.15s, border-color 0.15s",width:"100%",
        fontFamily:"inherit",
      }}
      onClick={()=>!disabled&&onSelect(topic)}
    >
      <span style={{fontSize:20,lineHeight:1,flexShrink:0}}>{topic.icon}</span>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:6}}>
          <span style={{fontSize:12,fontWeight:700,color:disabled?"#4a2860":col}}>{topic.label}</span>
          {topic.extreme&&<span style={{...C.tag(`${col}22`,col),fontSize:8}}>EXTREME</span>}
        </div>
        {topic.effect&&(()=>{
          const parts=[];
          if(topic.effect.rel)   parts.push(`+${topic.effect.rel} rel`);
          if(topic.effect.corruption) parts.push(`+${topic.effect.corruption} corruption`);
          if(topic.effect.cals)  parts.push(`~${(topic.effect.cals/1000).toFixed(0)}k cal`);
          return parts.length ? <div style={{fontSize:9,color:`${col}88`,marginTop:2}}>{parts.join(" · ")}</div> : null;
        })()}
      </div>
    </button>
  );
}

// ── response display ──────────────────────────────────────────

function ResponseDisplay({ topic, text, student, week, onClose }){
  const col = GROUP_COLORS[topic.group] || "#8040c0";
  const st  = getStage(student.lbs);
  const isLong = topic.sceneType === 'devour' || (text && text.length > 600);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{fontSize:20}}>{topic.icon}</span>
        <div style={{fontSize:13,fontWeight:700,color:col}}>{topic.label}</div>
        {topic.extreme&&<span style={{...C.tag(`${col}22`,col),fontSize:8,marginLeft:4}}>EXTREME</span>}
      </div>

      <div style={{
        background:`${col}10`,
        border:`1px solid ${col}30`,
        borderRadius:10,
        padding:"14px 16px",
        fontSize:isLong?12:13,
        color:"#ddd0b8",
        lineHeight:1.85,
        fontStyle:"italic",
        maxHeight:isLong?340:"none",
        overflowY:isLong?"auto":"visible",
        whiteSpace:"pre-wrap",
      }}>
        {text}
      </div>

      {/* stage context — season-aware body flavor via the text engine */}
      <div style={{fontSize:10,color:"#8a6a98",textAlign:"right",fontStyle:"italic"}}>
        {getBodyDescRich(student, week)}
      </div>
      <div style={{fontSize:10,color:"#6a4a78",textAlign:"right"}}>
        {student.name} · {st.label} · {student.lbs.toLocaleString()} lbs
      </div>

      <button style={C.btn("#1a0830")} onClick={onClose}>← Back to topics</button>
    </div>
  );
}

// ── main modal ────────────────────────────────────────────────

export function TalkModal({ student, skillEffects, week, onClose, onApplyEffect }){
  const [activeResponse, setActiveResponse] = useState(null); // {topic, text}
  const corTier = getCorruptionTier(student.corruption || 0);
  const eff     = skillEffects || {};

  const isTopicAvailable = (t) => {
    if(!t.requires) return true;
    return !!eff[t.requires];
  };

  const handleSelect = (topic) => {
    // Check refusal (command topics only)
    if(topic.refusal && topic.effect?.full){
      const full = student.fullness || 0;
      const cap  = student.stomachCapacity || 100;
      if(full >= cap * 0.85 && !(eff.totalSurrender && (student.corruption||0) >= 90)){
        const refusalText = typeof topic.refusal === "function" ? topic.refusal(student) : topic.refusal;
        setActiveResponse({topic, text:refusalText, refused:true});
        return;
      }
    }

    const text = buildResponse(topic, student, eff, week);
    setActiveResponse({topic, text, refused:false});
  };

  const handleBack = () => {
    // Apply effect when going back if we got a response (not a refusal)
    if(activeResponse && !activeResponse.refused){
      onApplyEffect(activeResponse.topic.effect || {});
    }
    setActiveResponse(null);
  };

  const handleCloseFromResponse = () => {
    if(activeResponse && !activeResponse.refused){
      onApplyEffect(activeResponse.topic.effect || {});
    }
    onClose();
  };

  const groupedTopics = [
    { group:"talk",    label:"Conversation",   topics: TALK_TOPICS.filter(t=>t.group==="talk") },
    { group:"suggest", label:"Suggestion",     topics: TALK_TOPICS.filter(t=>t.group==="suggest") },
    { group:"command", label:"Command",        topics: TALK_TOPICS.filter(t=>t.group==="command") },
  ].filter(g=>g.topics.length>0);

  return(
    <div style={C.overlay} onClick={(e)=>{ if(e.target===e.currentTarget) handleCloseFromResponse(); }}>
      <div style={{
        ...C.modal,
        maxWidth: activeResponse?.topic?.sceneType === 'devour' ? 620 : 500,
        borderColor: activeResponse?.topic?.sceneType === 'devour' ? "#802030" : "#5a1890",
      }}>
        {/* header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontSize:10,letterSpacing:3,color:"#8040c0",marginBottom:4}}>TALKING WITH</div>
            <div style={{fontSize:17,fontWeight:700,color:"#d8a8ff"}}>{student.name}</div>
            <div style={{fontSize:10,color:"#7a4a90",marginTop:2}}>
              {corTier.label}
              {(student.corruption||0)>0 && ` · ${student.corruption} corruption`}
            </div>
          </div>
          <button style={{...C.btn("#1a0830"),fontSize:11}} onClick={handleCloseFromResponse}>✕ Close</button>
        </div>

        {/* AP cost note */}
        <div style={{fontSize:10,color:"#5a3870",marginBottom:12}}>
          Talking costs {TALK_CONFIG.apCost} AP.
        </div>

        {activeResponse ? (
          <ResponseDisplay
            topic={activeResponse.topic}
            text={activeResponse.text}
            student={student}
            week={week}
            onClose={handleBack}
          />
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {groupedTopics.map(({group,label,topics})=>(
              <div key={group}>
                <div style={{
                  fontSize:9,letterSpacing:2,
                  color:GROUP_COLORS[group]+"aa",
                  marginBottom:7,
                  borderBottom:`1px solid ${GROUP_COLORS[group]}20`,
                  paddingBottom:4,
                }}>
                  {label.toUpperCase()}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {topics.map(t=>(
                    <TopicCard
                      key={t.id}
                      topic={t}
                      student={student}
                      skillEffects={eff}
                      onSelect={handleSelect}
                      disabled={!isTopicAvailable(t)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
