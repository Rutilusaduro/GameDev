// ═══════════════════════════════════════════════════════════════
// SKILL TREE VIEW — Influence · Gluttony · Corruption
// Three trees side-by-side, tier-gated, ranked skills.
// ═══════════════════════════════════════════════════════════════
import { SKILLS, SKILL_TREES, TIER_THRESHOLDS, RANK_COSTS, PHYSICAL_TRAITS } from '../gameData/skillTrees.js';
import { C } from '../styles.js';

const TREE_ORDER = ["influence","gluttony","corruption"];

// ── sub-components ─────────────────────────────────────────────

function RankDots({ current, max, color }){
  return(
    <div style={{display:"flex",gap:4,alignItems:"center"}}>
      {Array.from({length:max},(_,i)=>(
        <div key={i} style={{
          width:10,height:10,borderRadius:"50%",
          background: i<current ? color : "rgba(255,255,255,0.08)",
          border: `1px solid ${i<current ? color : "rgba(255,255,255,0.15)"}`,
          boxShadow: i<current ? `0 0 6px ${color}80` : "none",
          transition:"all 0.2s",
        }}/>
      ))}
    </div>
  );
}

function SkillCard({ skill, owned, rank, canAfford, tierUnlocked, onBuy, onMax, color, tree }){
  const locked = !tierUnlocked;
  const maxed  = rank >= skill.maxRanks;
  const active = rank > 0;
  const singleRank = skill.maxRanks === 1;

  const cardBg = active
    ? `linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))`
    : locked ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.02)";
  const borderColor = active
    ? `${color}60`
    : locked ? "#110820" : "#1e0a38";
  const glow = active ? `0 0 12px ${color}25` : "none";

  return(
    <div style={{
      border:`1px solid ${borderColor}`,
      borderRadius:10,
      padding:"10px 12px",
      background:cardBg,
      boxShadow:glow,
      opacity: locked ? 0.45 : 1,
      transition:"all 0.2s",
      display:"flex",flexDirection:"column",gap:6,
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
        <div style={{display:"flex",gap:7,alignItems:"flex-start",flex:1}}>
          <span style={{fontSize:18,lineHeight:1}}>{skill.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:active?color:"#c8a8e8",lineHeight:1.2}}>{skill.name}</div>
            <div style={{fontSize:10,color:"#7a5a9a",marginTop:2,lineHeight:1.45}}>{skill.desc}</div>
          </div>
        </div>
        {skill.maxRanks > 1 && (
          <div style={{fontSize:9,color:active?color:"#5a4070",whiteSpace:"nowrap",textAlign:"right"}}>
            {rank}/{skill.maxRanks}
          </div>
        )}
      </div>

      {skill.maxRanks > 1 && (
        <RankDots current={rank} max={skill.maxRanks} color={color}/>
      )}

      {active && (
        <div style={{fontSize:10,color:`${color}cc`,fontStyle:"italic",lineHeight:1.45}}>
          {skill.rankDesc(rank)}
        </div>
      )}

      <div style={{display:"flex",gap:6,alignItems:"center",marginTop:2}}>
        {locked ? (
          <span style={{fontSize:10,color:"#4a2860"}}>Tier locked</span>
        ) : maxed ? (
          <span style={{fontSize:10,color:color}}>✓ {singleRank ? "Unlocked" : "Maxed"}</span>
        ) : (
          <button
            style={{
              ...C.btn(canAfford ? color : "#2a1048"),
              fontSize:11,padding:"5px 10px",opacity:canAfford?1:0.5,
            }}
            onClick={onBuy}
            disabled={!canAfford}
          >
            {singleRank ? `Unlock (${RANK_COSTS[skill.tier]}pt)` : `+Rank (${RANK_COSTS[skill.tier]}pt)`}
          </button>
        )}
        {skill.maxRanks > 1 && !maxed && !locked && rank < skill.maxRanks - 1 && canAfford && (
          <button
            style={{...C.btn("#1a0830"),fontSize:10,padding:"4px 8px",border:`1px solid ${color}40`}}
            onClick={onMax}
          >
            Max
          </button>
        )}
      </div>
    </div>
  );
}

function TierSection({ tierIdx, skills, treeColor, tierName, unlocked, pointsSpent, threshold, ownedSkills, availPts, onBuy, onMax }){
  const tierSkills = skills.filter(sk => sk.tier === tierIdx);
  const ptsNeeded  = TIER_THRESHOLDS[tierIdx];

  return(
    <div style={{marginBottom:14}}>
      {/* tier header */}
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"6px 10px",borderRadius:7,marginBottom:8,
        background: unlocked ? `${treeColor}18` : "rgba(0,0,0,0.25)",
        border: `1px solid ${unlocked ? treeColor+"40" : "#1a0830"}`,
      }}>
        <div style={{fontSize:9,letterSpacing:2,color:unlocked?treeColor:"#3a2060",fontWeight:700}}>
          TIER {tierIdx+1} — {tierName.toUpperCase()}
        </div>
        {!unlocked && (
          <div style={{fontSize:9,color:"#4a2870"}}>
            {pointsSpent}/{ptsNeeded} pts to unlock
          </div>
        )}
        {unlocked && tierIdx > 0 && (
          <div style={{fontSize:9,color:`${treeColor}99`}}>✓ Unlocked</div>
        )}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {tierSkills.map(sk => {
          const rank = ownedSkills[sk.id] || 0;
          const canAfford = availPts >= RANK_COSTS[tierIdx];
          return(
            <SkillCard
              key={sk.id}
              skill={sk}
              rank={rank}
              owned={rank > 0}
              canAfford={canAfford && unlocked}
              tierUnlocked={unlocked}
              color={treeColor}
              tree={sk.tree}
              onBuy={() => onBuy(sk)}
              onMax={() => onMax(sk)}
            />
          );
        })}
      </div>
    </div>
  );
}

function TreePanel({ treeId, ownedSkills, availPts, onBuy, onMax }){
  const meta = SKILL_TREES[treeId];
  const treeSkills = SKILLS.filter(sk => sk.tree === treeId);
  // points spent in this tree
  const spent = treeSkills.reduce((sum,sk) => {
    const r = ownedSkills[sk.id] || 0;
    return sum + r * RANK_COSTS[sk.tier];
  }, 0);

  const tier0Unlocked = true;
  const tier1Unlocked = spent >= TIER_THRESHOLDS[1];
  const tier2Unlocked = spent >= TIER_THRESHOLDS[2];
  const tierUnlocked  = [tier0Unlocked, tier1Unlocked, tier2Unlocked];

  return(
    <div style={{
      flex:1,minWidth:0,
      background: meta.bg,
      border:`1px solid ${meta.color}30`,
      borderRadius:12,
      padding:"14px 12px",
      display:"flex",flexDirection:"column",
    }}>
      {/* tree header */}
      <div style={{marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:22,marginBottom:4}}>{meta.emoji}</div>
        <div style={{fontSize:16,fontWeight:700,color:meta.color,letterSpacing:1}}>{meta.label}</div>
        <div style={{fontSize:10,color:`${meta.color}aa`,marginTop:3,lineHeight:1.5}}>{meta.blurb}</div>
        <div style={{
          marginTop:8,fontSize:10,color:`${meta.color}99`,
          background:`${meta.color}12`,
          borderRadius:6,padding:"3px 10px",display:"inline-block",
        }}>
          {spent} pts spent
        </div>
      </div>

      {/* tier progress bar */}
      <div style={{marginBottom:14,padding:"0 2px"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:`${meta.color}66`,marginBottom:4}}>
          <span>T1</span>
          <span>T2 @ {TIER_THRESHOLDS[1]}pt</span>
          <span>T3 @ {TIER_THRESHOLDS[2]}pt</span>
        </div>
        <div style={{height:5,background:"rgba(0,0,0,0.4)",borderRadius:3,overflow:"hidden",position:"relative"}}>
          <div style={{
            position:"absolute",left:0,top:0,height:"100%",
            width:`${Math.min((spent/TIER_THRESHOLDS[2])*100,100)}%`,
            background:`linear-gradient(90deg,${meta.color}88,${meta.color})`,
            borderRadius:3,transition:"width 0.4s",
          }}/>
          {/* tier markers */}
          <div style={{position:"absolute",top:0,left:`${(TIER_THRESHOLDS[1]/TIER_THRESHOLDS[2])*100}%`,width:1,height:"100%",background:`${meta.color}60`}}/>
        </div>
      </div>

      {/* tiers */}
      {[0,1,2].map(t=>(
        <TierSection
          key={t}
          tierIdx={t}
          skills={treeSkills}
          treeColor={meta.color}
          tierName={meta.tierNames[t]}
          unlocked={tierUnlocked[t]}
          pointsSpent={spent}
          threshold={TIER_THRESHOLDS[t]}
          ownedSkills={ownedSkills}
          availPts={availPts}
          onBuy={onBuy}
          onMax={onMax}
        />
      ))}
    </div>
  );
}

// ── physical traits panel ─────────────────────────────────────

function PhysicalTraitsPanel({ students, ownedSkills }){
  const hasBodysSurrender = (ownedSkills["bodys_surrender"] || 0) > 0;
  if(!hasBodysSurrender) return null;

  const allTraits = [];
  students.forEach(s => {
    (s.physicalTraits || []).forEach(tid => {
      const trait = PHYSICAL_TRAITS.find(t => t.id === tid);
      if(trait) allTraits.push({student:s, trait});
    });
  });

  if(allTraits.length === 0) return(
    <div style={{...C.card,padding:12,marginTop:8}}>
      <div style={{fontSize:10,letterSpacing:2,color:"#9b71cc",marginBottom:6}}>PHYSICAL TRAITS</div>
      <div style={{fontSize:11,color:"#6a4a88"}}>Body's Surrender is active. Traits will manifest as girls grow.</div>
    </div>
  );

  return(
    <div style={{...C.card,padding:12,marginTop:8}}>
      <div style={{fontSize:10,letterSpacing:2,color:"#9b71cc",marginBottom:8}}>PHYSICAL TRAITS</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {allTraits.map(({student,trait},i)=>(
          <div key={i} style={{borderLeft:`2px solid #7a3a9a`,paddingLeft:8,paddingTop:2,paddingBottom:2}}>
            <div style={{fontSize:11,color:"#c890e8",fontWeight:600}}>{trait.icon} {trait.name}</div>
            <div style={{fontSize:10,color:"#8a6aaa"}}>{student.name} — {trait.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── active bonuses summary ────────────────────────────────────

function ActiveBonuses({ effects }){
  const lines = [];
  if(effects.forceFeedBonus) lines.push({icon:"💪",text:`+${Math.round(effects.forceFeedBonus*100)}% force-feed success`,col:"#80e0a0"});
  if(effects.extremeBonus)   lines.push({icon:"⚡",text:`+${Math.round(effects.extremeBonus*100)}% extreme action success`,col:"#e0c060"});
  if(effects.conversionBonus)lines.push({icon:"⚗",text:`+${Math.round(effects.conversionBonus*100)}% digestion yield`,col:"#60c0e0"});
  if(effects.capacityBonus)  lines.push({icon:"🫙",text:`+${effects.capacityBonus} stomach capacity`,col:"#a0c0ff"});
  if(effects.calorieBonus)   lines.push({icon:"🍴",text:`+${Math.round(effects.calorieBonus*100)}% cals per feed`,col:"#e0a060"});
  if(effects.passiveLbs)     lines.push({icon:"📈",text:`+${effects.passiveLbs} passive lbs/week`,col:"#e080a0"});
  if(effects.unlockSuggestion) lines.push({icon:"🗣",text:`Suggest topics unlocked`,col:"#d0a0ff"});
  if(effects.unlockCommand)    lines.push({icon:"👑",text:`Command topics unlocked`,col:"#ffd060"});
  if(effects.devourersThreshold) lines.push({icon:"🩸",text:`Devour command unlocked`,col:"#ff6060"});
  if(effects.internalizedRole)   lines.push({icon:"🐷",text:`Submissive register unlocked`,col:"#ffb0c0"});
  if(effects.brokenMind)         lines.push({icon:"🫠",text:`Broken register unlocked`,col:"#c060a0"});
  if(effects.totalSurrender)     lines.push({icon:"🖤",text:`90+ corruption: no refusals`,col:"#e0c8e8"});
  if(effects.prideInRuin)        lines.push({icon:"🏛",text:`Stage 8+ girls +2 rel/week`,col:"#d0b080"});
  if(effects.gluttonsInstinct)   lines.push({icon:"🐺",text:`Girls may self-feed at week's end`,col:"#e0a040"});
  if(effects.endlessAppetite)    lines.push({icon:"🕳",text:`Refusal cap at 150% fullness`,col:"#9080e0"});
  if(effects.heavyHand)          lines.push({icon:"✋",text:`First post-cap feed guaranteed 1×/girl/wk`,col:"#80d0a0"});
  if(effects.echoedWill)         lines.push({icon:"🔁",text:`Force-feeds echoed by her own hand`,col:"#a0c8ff"});
  if(effects.breakResistance)    lines.push({icon:"⛓",text:`Override 1 refusal/week via Talk`,col:"#c0a060"});
  if(effects.mesmerizingAura)    lines.push({icon:"🌀",text:`Arm 1 girl: +35% all rolls/week`,col:"#b080ff"});
  if(effects.devouringPresence)  lines.push({icon:"😈",text:`Arm 1 girl: capacity ×2 + rolls +30%/week`,col:"#ff8060"});
  if(effects.bodysSurrender)     lines.push({icon:"🌺",text:`Physical traits active`,col:"#ff80c0"});

  if(!lines.length) return(
    <div style={{...C.card,padding:12}}>
      <div style={{fontSize:10,letterSpacing:2,color:"#6028b8",marginBottom:6}}>ACTIVE BONUSES</div>
      <div style={{fontSize:11,color:"#5a3870"}}>No skill bonuses yet.</div>
    </div>
  );

  return(
    <div style={{...C.card,padding:12}}>
      <div style={{fontSize:10,letterSpacing:2,color:"#6028b8",marginBottom:8}}>ACTIVE BONUSES</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {lines.map((l,i)=>(
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:5,
            background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:7,padding:"4px 8px",
          }}>
            <span style={{fontSize:13}}>{l.icon}</span>
            <span style={{fontSize:10,color:l.col}}>{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── main view ─────────────────────────────────────────────────

export function SkillTreeView({ availableSkillPoints, ownedSkills, skillEffects, students, onBuy, onMax, spiritLevel, spiritXp, spiritXpForNextLevel }){
  // ownedSkills: { skillId: rankCount, ... }
  // skillEffects: aggregated effect totals from skillEffect() helper
  const owned = ownedSkills || {};
  const effects = skillEffects || {};

  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>

      {/* header */}
      <div style={{...C.card,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:10,letterSpacing:3,color:"#9b71cc",marginBottom:4}}>SKILL TREES</div>
          <div style={{fontSize:22,color:"#f0c060",fontWeight:700}}>
            {availableSkillPoints} <span style={{fontSize:13,color:"#c8a8e8",fontWeight:400}}>skill points available</span>
          </div>
        </div>
        <div style={{fontSize:11,color:"#8d6db4",textAlign:"right"}}>
          {spiritLevel!=null&&(
            <div style={{marginBottom:4}}>
              Spirit Lv {spiritLevel} · {spiritXp??0}/{spiritXpForNextLevel??40} class lbs gained
            </div>
          )}
          Spend points in a tree to unlock higher tiers. Multiple ranks stack effects.
        </div>
      </div>

      {/* three trees */}
      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
        {TREE_ORDER.map(id=>(
          <TreePanel
            key={id}
            treeId={id}
            ownedSkills={owned}
            availPts={availableSkillPoints}
            onBuy={onBuy}
            onMax={onMax}
          />
        ))}
      </div>

      {/* active bonuses */}
      <ActiveBonuses effects={effects}/>

      {/* physical traits */}
      <PhysicalTraitsPanel students={students||[]} ownedSkills={owned}/>
    </div>
  );
}
