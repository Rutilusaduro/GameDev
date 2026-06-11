import { C } from '../styles.js';
import { SOCIAL_EVENTS } from '../gameData/sessions.js';

export function SocialEventsView({ ap, socialWeeks, startSocialEvent, vaughan, vaughanAlly, week }){
  return(
            <div>
              <p style={C.secT}>Social Events</p>
              <div style={{fontSize:11,color:"#6050a0",marginBottom:12,lineHeight:1.7}}>
                Host events to feed multiple students at once, build relationships, and manage Dr. Vaughan's suspicion.
                One event per week.
                {socialWeeks.includes(week)&&<span style={{color:"#f0a040",marginLeft:8}}>✓ Event held this week</span>}
              </div>
              {vaughan&&!vaughanAlly&&(
                <div style={{...C.infoBox("rgba(10,30,50,0.4)"),fontSize:11,color:"#4080a0",marginBottom:12}}>
                  👓 Vaughan attends department socials, symposiums, and the end-of-term banquet. When she attends events, she gains weight and her suspicion drops.
                  Events that don't require her attendance still reduce suspicion passively.
                </div>
              )}
              <div style={C.grid2}>
                {SOCIAL_EVENTS.map(ev=>{
                  const canAfford=ap>=ev.apCost;
                  const heldThisWeek=socialWeeks.includes(week);
                  const locked=!canAfford||heldThisWeek;
                  return(
                    <div key={ev.id}
                      style={{...C.card,opacity:locked?0.5:1,cursor:locked?"not-allowed":"pointer",transition:"border-color 0.15s"}}
                      onClick={()=>!locked&&startSocialEvent(ev)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                        <span style={{fontWeight:700,fontSize:13,color:"#d8a8ff"}}>{ev.label}</span>
                        <span style={{fontSize:10,color:"#a080c0",background:"rgba(80,20,120,0.3)",borderRadius:8,padding:"1px 7px"}}>{ev.apCost} AP</span>
                      </div>
                      <div style={{fontSize:11,color:"#6a4870",lineHeight:1.5,marginBottom:6}}>{ev.desc}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontSize:10,color:"#5a3860"}}>
                        <span>+{ev.baseGain[0]}–{ev.baseGain[1]} lbs</span>
                        <span>+{ev.relBonus} rel</span>
                        <span>{ev.minStudents}–{ev.maxStudents} students</span>
                      </div>
                      {ev.vaughanAttends&&vaughan&&!vaughanAlly&&(
                        <div style={{fontSize:9,color:"#306070",marginTop:4}}>
                          👓 Vaughan attends · suspicion {ev.vaughanEffect}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
  );
}
