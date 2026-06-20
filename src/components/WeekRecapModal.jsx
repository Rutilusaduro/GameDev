// ═══════════════════════════════════════════════════════════════
// WEEKLY RÉSUMÉ MODAL — the narrated end-of-week payoff.
// Surfaces the girls who actually moved this week with an in-voice
// recap beat, so the off-screen digestion engine is felt, not hidden.
// Mobile-first: a single scrollable column of cards.
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';

export function WeekRecapModal({ weekRecap, onClose, onSelectGirl }){
  const { week, movers } = weekRecap;
  return(
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:480}}>
        <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:4}}>THE WEEK IN THEIR BODIES</div>
        <div style={{fontSize:15,fontWeight:700,color:"#c090e8",marginBottom:2}}>Week {week} — what the week made of them</div>
        <div style={{fontSize:11,color:"#5a3888",marginBottom:12}}>
          {movers.length} {movers.length===1?"of them carries":"of them carry"} the week differently now.
        </div>
        <div style={{maxHeight:"60vh",overflowY:"auto",marginBottom:10,display:"flex",flexDirection:"column",gap:8}}>
          {movers.map(m=>{
            const tappable=!!onSelectGirl;
            const journey=m.totalGained>0
              ? `Up ${m.totalGained} lbs since you began${m.journeyStages>0&&m.startStageLabel&&m.stageLabel?` · ${m.startStageLabel} → ${m.stageLabel}`:""}`
              : null;
            return(
              <div key={m.id}
                onClick={tappable?()=>onSelectGirl(m.id):undefined}
                role={tappable?"button":undefined}
                style={{...C.card,cursor:tappable?"pointer":"default",
                  borderLeft:m.stagedUp?"3px solid #c8860a":m.stuffed?"3px solid #b04880":"3px solid #5a3888"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                  <div style={{fontWeight:700,color:"#c090e8"}}>{m.name}{tappable&&<span style={{color:"#7050a0",fontWeight:400,fontSize:11}}> ›</span>}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {m.lbsGained>0&&<span style={{...C.tag("#3a5a3a30","#70b070")}}>+{m.lbsGained} lbs</span>}
                    {m.stagedUp&&<span style={{...C.tag("#7a5a1a30","#d8a030")}}>↑ {m.stageLabel}</span>}
                    {m.stuffed&&<span style={{...C.tag("#7a2a5a30","#d870b0")}}>stuffed all week</span>}
                  </div>
                </div>
                <div style={{fontSize:12.5,color:"#caa8e8",lineHeight:1.5}}>{m.prose}</div>
                {journey&&<div style={{marginTop:6,fontSize:10.5,color:"#8a6ab0",fontStyle:"italic"}}>{journey}</div>}
              </div>
            );
          })}
        </div>
        <button style={{...C.btn(),width:"100%"}} onClick={onClose}>Begin Week {week}</button>
      </div>
    </div>
  );
}
