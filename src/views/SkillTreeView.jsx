import { ALL_SKILLS } from '../utils/gameHelpers.js';
import { C } from '../styles.js';

export function SkillTreeView({ availableSkillPoints, canUnlock, goddessSeen, skillApBonus, skillGainMult, skillPassiveBonus, skillScrutinyPassiveReduce, skillScrutinyReduce, skillSessionCapBonus, spentSkillPoints, spiritLevel, spiritXp, spiritXpForNextLevel, startSkillPurchase, totalSkillPoints, unlockedSkills }){
  const divineSkills=ALL_SKILLS
    .filter(sk=>sk.category==="divine")
    .sort((a,b)=>(a.tier-b.tier)||a.label.localeCompare(b.label));
  const unlockedDivine=divineSkills.filter(sk=>unlockedSkills.includes(sk.id));
  const xpIntoLevel=spiritXp%spiritXpForNextLevel;
  const xpPct=Math.round((xpIntoLevel/spiritXpForNextLevel)*100);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{...C.card,padding:14}}>
        <div style={{fontSize:10,letterSpacing:2,color:"#9b71cc",marginBottom:6}}>SPIRIT OF GLUTTONY</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
          <div style={{fontSize:24,color:"#f0c060",fontWeight:700}}>Level {spiritLevel}</div>
          <div style={{fontSize:12,color:"#c8a8e8"}}>{xpIntoLevel} / {spiritXpForNextLevel} XP to next level</div>
        </div>
        <div style={{height:8,background:"#1a0830",borderRadius:4,marginTop:8,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${xpPct}%`,background:"linear-gradient(90deg,#6a2cc0,#f0a060)"}}/>
        </div>
        <div style={{display:"flex",gap:18,marginTop:10,flexWrap:"wrap"}}>
          <div style={{fontSize:12,color:"#e0d0ff"}}>Total XP from class fattening: <strong style={{color:"#f0c060"}}>{spiritXp}</strong></div>
          <div style={{fontSize:12,color:"#e0d0ff"}}>Skill points: <strong style={{color:"#a0f0b0"}}>{availableSkillPoints}</strong> / {totalSkillPoints} (spent {spentSkillPoints})</div>
        </div>
        <div style={{fontSize:11,color:"#8d6db4",marginTop:8}}>
          🍽️ Take to Dinner is now a baseline ability and no longer part of the skill tree.
        </div>
      </div>

      {!goddessSeen&&(
        <div style={{...C.card,padding:14,fontSize:12,color:"#9070b0"}}>
          Mortal classroom skills have been retired. Divine skills unlock once the goddess path is revealed.
        </div>
      )}

      {goddessSeen&&(
        <div style={{...C.card,padding:14}}>
          <div style={{fontSize:10,letterSpacing:2,color:"#9b71cc",marginBottom:8}}>DIVINE SKILLS ({unlockedDivine.length}/{divineSkills.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {divineSkills.map(sk=>{
              const unlocked=unlockedSkills.includes(sk.id);
              const available=canUnlock(sk);
              const reqsMet=!sk.requires||sk.requires.every(r=>unlockedSkills.includes(r));
              return(
                <div key={sk.id} style={{border:"1px solid #2a1048",borderRadius:8,padding:10,background:unlocked?"rgba(20,50,20,0.35)":"rgba(20,8,40,0.55)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:unlocked?"#80e080":"#d8b0ff"}}>{sk.label}</div>
                      <div style={{fontSize:11,color:"#9270b2",marginTop:3}}>{sk.desc}</div>
                    </div>
                    <div style={{fontSize:11,color:"#f0c060",whiteSpace:"nowrap"}}>{sk.cost} pt</div>
                  </div>
                  {sk.requires?.length>0&&(
                    <div style={{fontSize:10,color:reqsMet?"#6ea070":"#905070",marginTop:6}}>
                      Requires: {sk.requires.map(r=>{
                        const match=divineSkills.find(d=>d.id===r);
                        return unlockedSkills.includes(r)?`✓ ${match?.label||r}`:(match?.label||r);
                      }).join(", ")}
                    </div>
                  )}
                  <div style={{fontSize:11,color:"#c090d0",fontStyle:"italic",marginTop:6}}>{sk.effect}</div>
                  <div style={{marginTop:8}}>
                    {unlocked
                      ? <span style={{fontSize:11,color:"#80e080"}}>✓ Unlocked</span>
                      : available
                        ? <button style={C.btn("#5020a0")} onClick={()=>startSkillPurchase(sk)}>Unlock ({sk.cost} pt)</button>
                        : <span style={{fontSize:11,color:"#6d4a88"}}>{reqsMet?"Not enough skill points.":"Unlock prerequisites first."}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{...C.card,padding:12}}>
        <div style={{fontSize:9,letterSpacing:2,color:"#8a62ba",marginBottom:6}}>ACTIVE BONUSES</div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          {skillPassiveBonus>0&&<div style={{fontSize:11,color:"#80e080"}}>+{skillPassiveBonus} passive lbs/week</div>}
          {skillApBonus>0&&<div style={{fontSize:11,color:"#80a0e0"}}>+{skillApBonus} AP/week (max 20)</div>}
          {skillGainMult>1&&<div style={{fontSize:11,color:"#e0a060"}}>×{skillGainMult.toFixed(2)} all gain multiplier</div>}
          {skillScrutinyReduce<1&&<div style={{fontSize:11,color:"#a0d0e0"}}>🔇 -{Math.round((1-skillScrutinyReduce)*100)}% scrutiny gain</div>}
          {skillScrutinyPassiveReduce>0&&<div style={{fontSize:11,color:"#a0d0e0"}}>🛡️ -{skillScrutinyPassiveReduce} scrutiny/week</div>}
          {skillSessionCapBonus>0&&<div style={{fontSize:11,color:"#d0a0e0"}}>🌙 +{skillSessionCapBonus} session capacity</div>}
          {skillPassiveBonus<=0&&skillApBonus<=0&&skillGainMult<=1&&skillScrutinyReduce>=1&&skillScrutinyPassiveReduce<=0&&skillSessionCapBonus<=0&&(
            <div style={{fontSize:11,color:"#6d4a88"}}>No active skill bonuses yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
