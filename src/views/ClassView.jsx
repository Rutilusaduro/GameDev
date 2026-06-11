// ═══════════════════════════════════════════════════════════════
// CLASS VIEW — class roster
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { EVOLVED_FORM_META } from '../gameData/evolvedForms.js';
import { getAttitude, pharmacistTextOpts } from '../utils/gameHelpers.js';
import { addictionTint } from '../gameData/hungerAddiction.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';

export function ClassView({ view, students, lilithUnlocked, elaraDiscovered = false, avgLbs, setSelectedId, setView, week = 1, pharmacistState = null }){
  const textOpts = pharmacistTextOpts(pharmacistState, week);
  const rosterVisible=(s)=>!s.hidden||(s.id===15&&lilithUnlocked)||(s.id===17&&elaraDiscovered);
  return(<>
          {/* ── CLASS ROSTER ── */}
          {view==="class"&&(
            <div>
              <p style={C.secT}>Students — {students.filter(rosterVisible).length} enrolled · avg {avgLbs} lbs</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gridAutoRows:"minmax(140px,auto)",gap:8}}>
                {[...students].filter(rosterVisible).sort((a,b)=>a.id-b.id).map(s=>{
                  const st=getStage(s.lbs);
                  const evMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null;
                  const cardBorder=evMeta?`1px solid ${evMeta.color}80`:"1px solid #180830";
                  const cardBg=addictionTint(s)||"";
                  const nameColor=evMeta?evMeta.color:"#d8a8ff";
                  const barColor=st.color;
                  const barMax=1100;
                  return(
                    <div key={s.id} style={{...C.card,border:cardBorder,background:cardBg||C.card.background,position:"relative",overflow:"hidden"}} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                          <span style={{fontWeight:700,fontSize:15,color:nameColor}}>{s.name}</span>
                          {(()=>{const tier=getTier(s.relationship);return tier.id>0?<span style={{fontSize:12,opacity:0.9}}>{tier.emoji}</span>:null;})()}
                          {evMeta&&<span style={{fontSize:10,color:evMeta.color,fontWeight:600}}>✦ {evMeta.title}</span>}
                        </div>
                        <StageTag stage={st}/>
                      </div>
                      <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      <Bar val={s.lbs} max={barMax} color={barColor}/>
                      <div style={{fontSize:11,color:"#a88050",margin:"2px 0"}}>
                        {s.lbs.toLocaleString()} lbs  (+{s.lbs-s.startLbs}) · ❤ {s.relationship}%
                      </div>
                      <div style={{fontSize:10,color:"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {getAttitude(s, week, textOpts).slice(0, 62)}…
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
  </>);
}
