import { ACHIEVEMENT_LIST } from '../gameData/sessions.js';
import { C } from '../styles.js';
import { renderAchievementDesc } from '../textEngine/scenes/overhaul/leftoverMoreUi.js';

export function AchievementsView({ achievements }){
  const unlockedList = ACHIEVEMENT_LIST.filter((a) => achievements.includes(a.id));
  return(
            <div>
              <p style={C.secT}>Achievements — {unlockedList.length} earned</p>
              {unlockedList.length === 0 ? (
                <div style={{ fontSize: 12, color: '#6a5088', fontStyle: 'italic', lineHeight: 1.6 }}>
                  Nothing logged yet. Achievements appear here when you earn them.
                </div>
              ) : (
              <div style={C.grid2}>
                {unlockedList.map(a=>(
                    <div key={a.id} style={{...C.card,cursor:"default",border:"1px solid #4a18a0"}}>
                      <div style={{fontSize:16,marginBottom:4}}>{a.label}</div>
                      <div style={{fontSize:11,color:"#c0a0e8"}}>{renderAchievementDesc(a.id) || a.desc}</div>
                      <div style={{fontSize:10,color:"#7040c0",marginTop:4}}>✓ Unlocked</div>
                    </div>
                ))}
              </div>
              )}
            </div>
  );
}

