import { C } from '../styles.js';

export function ActionsView({ ap, doClass, effectiveClassActions }){
  return(
            <div>
              <p style={C.secT}>Class-Wide Actions · {ap} AP remaining</p>
              <div style={C.grid2}>
                {effectiveClassActions.map(a=>(
                  <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}}>
                    <div style={{fontWeight:700,color:"#c090e8",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{a.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:a.cost===0?"#60c060":"#e07030"}}>{a.cost===0?"FREE":a.cost+" AP"}</span>
                      <span style={{fontSize:10,color:"#604030"}}>+{(a.cal[0]/1000).toFixed(0)}k–{(a.cal[1]/1000).toFixed(0)}k cal · {a.full} fullness</span>
                    </div>
                    <button style={{...C.btn(),width:"100%",opacity:ap<a.cost?0.4:1}} disabled={ap<a.cost} onClick={()=>doClass(a)}>Use Action</button>
                  </div>
                ))}
              </div>
            </div>
  );
}
