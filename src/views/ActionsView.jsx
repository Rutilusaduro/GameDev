import { C } from '../styles.js';
import { renderFloorActionDesc } from '../textEngine/scenes/overhaul/leftoverUiBeats.js';

export function ActionsView({ ap, doFloorAction, effectiveHallActions, famineWeek = false }){
  const sortedActions=[...effectiveHallActions].sort((a,b)=>{
    if(famineWeek&&a.id==='refeast_ritual') return -1;
    if(famineWeek&&b.id==='refeast_ritual') return 1;
    return 0;
  });

  return(
            <div>
              {famineWeek && (
                <div style={{...C.infoBox('rgba(80,20,20,.35)'),border:'1px solid #80202050',fontSize:12,color:'#f0a0a0',lineHeight:1.7,marginBottom:16}}>
                  🕯️ <strong>Famine Week</strong> — the semester is frozen until you complete a <strong>Refeast Ritual</strong> (4 AP below). Next Week is disabled until scarcity eases.
                </div>
              )}
              <p style={C.secT}>Hall-Wide Actions · {ap} AP remaining</p>
              <div style={C.grid2}>
                {sortedActions.map(a=>(
                  <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1,border:famineWeek&&a.id==='refeast_ritual'?'1px solid #c0404060':undefined}}>
                    <div style={{fontWeight:700,color:famineWeek&&a.id==='refeast_ritual'?"#f08080":"#c090e8",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{renderFloorActionDesc(a.id) || a.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:a.cost===0?"#60c060":"#e07030"}}>{a.cost===0?"FREE":a.cost+" AP"}</span>
                      <span style={{fontSize:10,color:"#604030"}}>+{(a.cal[0]/1000).toFixed(0)}k–{(a.cal[1]/1000).toFixed(0)}k cal · {a.full} fullness</span>
                    </div>
                    <button style={{...C.btn(famineWeek&&a.id==='refeast_ritual'?"#6a2838":"#401890"),width:"100%",opacity:ap<a.cost?0.4:1}} disabled={ap<a.cost} onClick={()=>doFloorAction(a)}>Use Action</button>
                  </div>
                ))}
              </div>
            </div>
  );
}
