import { ALL_SKILLS } from '../utils/gameHelpers.js';
import { C } from '../styles.js';
import { SKILL_CATEGORIES } from '../gameData/skills.js';

export function SkillTreeView({ canUnlock, dinnerUnlocked, goddessSeen, hasSkill, hovered, setHovered, setSkillCat, skillApBonus, skillCat, skillGainMult, skillPassiveBonus, skillScrutinyPassiveReduce, skillScrutinyReduce, skillSessionCapBonus, startSkillPurchase, totalGained, unlockedSkills }){
            // Node layout: 4 columns (categories), 5 rows (tiers)
            // Each cell: col index, row index -> pixel position
            const COL_W=240, ROW_H=170, PAD_X=30, PAD_Y=50;
            const CATS=["environment","feeding","efficiency","social","psychology","prestige",...(goddessSeen?["divine"]:[])];
            const CAT_COLORS={"environment":"#3a8060","feeding":"#804020","efficiency":"#304080","social":"#802040","psychology":"#206050","prestige":"#806010","divine":"#702030"};
            const TIERS=[1,2,3,4,5,6];
            const TIER_COSTS=[50,150,350,700,1200,2000];
            // Build node positions — group by tier, lay out horizontally per tier
            const filteredSkills=ALL_SKILLS.filter(sk=>sk.category===skillCat);
            const byTier={};
            filteredSkills.forEach(sk=>{if(!byTier[sk.tier])byTier[sk.tier]=[];byTier[sk.tier].push(sk);});
            const NODE_W=120,NODE_GAP=14;
            const maxPerTier=Math.max(1,...Object.values(byTier).map(g=>g.length));
            const svgContentW=maxPerTier*(NODE_W+NODE_GAP)-NODE_GAP;
            const svgW=PAD_X*2+svgContentW;
            const svgH=PAD_Y*2+TIERS.length*ROW_H;
            const nodes=filteredSkills.map(sk=>{
              const tierNodes=byTier[sk.tier]||[sk];
              const idx=tierNodes.indexOf(sk);
              const count=tierNodes.length;
              const groupW=count*NODE_W+(count-1)*NODE_GAP;
              const startX=PAD_X+(svgContentW-groupW)/2+NODE_W/2;
              const x=startX+idx*(NODE_W+NODE_GAP);
              const y=PAD_Y+(sk.tier-1)*ROW_H+ROW_H/2;
              return {...sk,x,y};
            });
            const hoveredNode=hovered?nodes.find(n=>n.id===hovered):null;
            // Build edges: each node's requires -> parent nodes
            const edges=[];
            nodes.forEach(n=>{
              if(n.requires) n.requires.forEach(reqId=>{
                const parent=nodes.find(p=>p.id===reqId);
                if(parent) edges.push({from:parent,to:n});
              });
            });
            return(
              <div>
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:10}}>
                    <p style={{...C.secT,margin:0}}>Classroom Upgrades</p>
                    <span style={{fontSize:22,fontWeight:700,color:"#f0c060",letterSpacing:-0.5,lineHeight:1}}>{totalGained}</span>
                    <span style={{fontSize:11,color:"#8050a0",letterSpacing:1}}>lbs gained</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {CATS.map(cat=>{
                      const active=cat===skillCat;
                      return(
                        <button key={cat}
                          style={{background:active?CAT_COLORS[cat]+"99":"transparent",border:`1px solid ${CAT_COLORS[cat]}${active?"":"55"}`,borderRadius:6,padding:"5px 13px",fontSize:11,color:active?"#fff":"#7060a0",cursor:"pointer",fontFamily:"inherit",fontWeight:active?700:400,transition:"all 0.15s"}}
                          onClick={()=>{setSkillCat(cat);setHovered(null);}}>
                          {SKILL_CATEGORIES[cat]?.label||cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  {/* SVG Tree */}
                  <div style={{overflowX:"auto",overflowY:"visible",flex:"0 0 auto"}}>
                    <svg width={svgW} height={svgH} style={{display:"block"}}>
                      {/* Tier labels */}
                      {TIERS.map((t,i)=>(
                        <text key={t} x={8} y={PAD_Y+i*ROW_H+ROW_H/2+5} fill="#3a2050" fontSize={9} letterSpacing={2}
                          fontFamily="'Palatino Linotype',serif">T{t} · {TIER_COSTS[i]}</text>
                      ))}
                      {/* Active category label */}
                      <text x={PAD_X+COL_W/2} y={22} fill={CAT_COLORS[skillCat]} fontSize={11}
                        textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                        {SKILL_CATEGORIES[skillCat]?.label||skillCat}
                      </text>
                      {/* Tier dividers */}
                      {TIERS.map((t,i)=>(
                        <line key={t} x1={PAD_X-10} y1={PAD_Y+i*ROW_H} x2={svgW-10} y2={PAD_Y+i*ROW_H}
                          stroke="#1a0830" strokeWidth={1}/>
                      ))}
                      {/* Edges */}
                      {edges.map((e,i)=>{
                        const fromUnlocked=unlockedSkills.includes(e.from.id);
                        const toUnlocked=unlockedSkills.includes(e.to.id);
                        const active=fromUnlocked&&toUnlocked;
                        const reachable=fromUnlocked&&!toUnlocked;
                        return(
                          <line key={i}
                            x1={e.from.x} y1={e.from.y+28}
                            x2={e.to.x} y2={e.to.y-28}
                            stroke={active?"#60a060":reachable?"#6030a0":"#200830"}
                            strokeWidth={active?2.5:reachable?1.5:1}
                            strokeDasharray={active?"none":"4,4"}
                            opacity={active?0.9:reachable?0.7:0.3}
                          />
                        );
                      })}
                      {/* Nodes */}
                      {nodes.map(sk=>{
                        const unlocked=unlockedSkills.includes(sk.id);
                        const available=canUnlock(sk);
                        const isHovered=hovered===sk.id;
                        const baseColor=CAT_COLORS[sk.category];
                        const fillColor=unlocked?"#1a4020":available?"#2a1048":"#0e0618";
                        const borderColor=unlocked?"#50c050":available?"#8030d0":isHovered?"#3a1060":"#200830";
                        const textColor=unlocked?"#80e080":available?"#c080f0":"#4a3060";
                        const nodeW=120, nodeH=52;
                        return(
                          <g key={sk.id}
                            onMouseEnter={()=>setHovered(sk.id)}
                            onMouseLeave={()=>setHovered(null)}
                            onClick={()=>available&&startSkillPurchase(sk)}
                            style={{cursor:available?"pointer":"default"}}>
                            <rect
                              x={sk.x-nodeW/2} y={sk.y-nodeH/2}
                              width={nodeW} height={nodeH} rx={8}
                              fill={fillColor}
                              stroke={borderColor}
                              strokeWidth={unlocked?2:isHovered?1.5:1}
                              opacity={unlocked||available?1:0.45}
                            />
                            {/* Glow for available */}
                            {available&&!unlocked&&(
                              <rect x={sk.x-nodeW/2} y={sk.y-nodeH/2} width={nodeW} height={nodeH} rx={8}
                                fill="none" stroke="#9040e0" strokeWidth={3} opacity={0.25}
                                style={{filter:"blur(3px)"}}/>
                            )}
                            {/* Unlock cost badge */}
                            {!unlocked&&(
                              <rect x={sk.x+nodeW/2-32} y={sk.y-nodeH/2-10} width={32} height={14} rx={5}
                                fill={totalGained>=sk.cost?"#4a2080":"#2a0830"}/>
                            )}
                            {!unlocked&&(
                              <text x={sk.x+nodeW/2-16} y={sk.y-nodeH/2-1} fill={totalGained>=sk.cost?"#d0a0ff":"#603050"}
                                fontSize={8} textAnchor="middle" fontFamily="serif">{sk.cost}</text>
                            )}
                            {/* Checkmark if unlocked */}
                            {unlocked&&(
                              <text x={sk.x+nodeW/2-10} y={sk.y-nodeH/2+12} fill="#60c060" fontSize={12} textAnchor="middle">✓</text>
                            )}
                            {/* Label */}
                            <text x={sk.x} y={sk.y-6} fill={textColor} fontSize={10}
                              textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                              {sk.label.length>18?sk.label.slice(0,17)+"…":sk.label}
                            </text>
                            {/* Category color bar at bottom of node */}
                            <rect x={sk.x-nodeW/2+4} y={sk.y+nodeH/2-8} width={nodeW-8} height={4} rx={2}
                              fill={baseColor} opacity={unlocked?0.8:0.3}/>
                            {/* Click hint */}
                            {available&&(
                              <text x={sk.x} y={sk.y+10} fill="#9060c0" fontSize={8}
                                textAnchor="middle" fontFamily="serif">click to unlock</text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  {/* Detail panel — shows hovered/active node info */}
                  <div style={{flex:"1 1 220px",minWidth:200,maxWidth:280,position:"sticky",top:0}}>
                    {hoveredNode?(()=>{
                      const sk=hoveredNode;
                      const unlocked=unlockedSkills.includes(sk.id);
                      const available=canUnlock(sk);

                      const reqsMet=!sk.requires||sk.requires.every(r=>unlockedSkills.includes(r));
                      const cat=SKILL_CATEGORIES[sk.category];
                      return(
                        <div style={{background:"rgba(20,8,40,0.95)",border:`1px solid ${CAT_COLORS[sk.category]}88`,borderRadius:10,padding:14}}>
                          <div style={{fontSize:9,letterSpacing:2,color:CAT_COLORS[sk.category],marginBottom:4}}>{cat?.label} · TIER {sk.tier}</div>
                          <div style={{fontWeight:700,fontSize:14,color:unlocked?"#80e080":available?"#c090f0":"#7a5090",marginBottom:6}}>{sk.label}</div>
                          <div style={{fontSize:11,color:"#9070b0",lineHeight:1.6,marginBottom:8}}>{sk.desc}</div>
                          <div style={{fontSize:11,color:"#c090d0",lineHeight:1.5,fontStyle:"italic",marginBottom:10}}>{sk.effect}</div>
                          {sk.requires&&(
                            <div style={{fontSize:10,color:"#5a3070",marginBottom:8}}>
                              Requires: {sk.requires.map(r=>{
                                const rsk=ALL_SKILLS.find(s=>s.id===r);
                                return <span key={r} style={{color:unlockedSkills.includes(r)?"#60a060":"#7a3060",marginRight:4}}>
                                  {unlockedSkills.includes(r)?"✓ ":""}{rsk?.label||r}
                                </span>;
                              })}
                            </div>
                          )}
                          {unlocked
                            ? <div style={{background:"rgba(30,60,30,0.5)",border:"1px solid #306030",borderRadius:6,padding:"6px 10px",fontSize:11,color:"#70c070"}}>✓ Unlocked</div>
                            : available
                            ? <button style={{...C.btn("#5020a0"),width:"100%"}} onClick={()=>startSkillPurchase(sk)}>Unlock — spend {sk.cost} lbs</button>
                            : !reqsMet
                            ? <div style={{fontSize:10,color:"#4a2050"}}>Unlock prerequisites first.</div>
                            : <div style={{fontSize:10,color:"#4a2050"}}>Need {sk.cost-totalGained} more lbs on the class total.</div>
                          }
                        </div>
                      );
                    })()
                    :<div style={{background:"rgba(10,5,20,0.6)",border:"1px solid #1a0830",borderRadius:10,padding:14,fontSize:11,color:"#3a2050",fontStyle:"italic"}}>
                      Hover a node to see details. Click an available node to unlock it.
                    </div>}
                    {/* Active bonuses */}
                    <div style={{marginTop:10,background:"rgba(20,8,40,0.8)",border:"1px solid #200838",borderRadius:10,padding:12}}>
                      <div style={{fontSize:9,letterSpacing:2,color:"#5028a0",marginBottom:8}}>ACTIVE BONUSES</div>
                      {unlockedSkills.length===0
                        ?<div style={{fontSize:10,color:"#3a2050"}}>None yet. Fatten the class to unlock Tier 1 ({Math.max(0,50-totalGained)} lbs away).</div>
                        :<div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {skillPassiveBonus>0&&<div style={{fontSize:11,color:"#80e080"}}>+{skillPassiveBonus} passive lbs/week</div>}
                          {skillApBonus>0&&<div style={{fontSize:11,color:"#80a0e0"}}>+{skillApBonus} AP/week (max 20)</div>}
                          {skillGainMult>1&&<div style={{fontSize:11,color:"#e0a060"}}>×{skillGainMult.toFixed(2)} all gain multiplier</div>}
                          {dinnerUnlocked&&<div style={{fontSize:11,color:"#c080f0"}}>🍽️ Dinner events active</div>}
                          {hasSkill("snack_station")&&<div style={{fontSize:11,color:"#60d090"}}>🍪 Desk Snacks FREE</div>}
                          {hasSkill("catering_contact")&&<div style={{fontSize:11,color:"#60d090"}}>🤝 Feast: -1 AP, +4 lbs</div>}
                          {hasSkill("private_kitchen")&&<div style={{fontSize:11,color:"#60d090"}}>🍳 Home-Cooked +4 lbs, Bake +3 lbs</div>}
                          {hasSkill("ap_mastery")&&<div style={{fontSize:11,color:"#60d090"}}>⚡ All single actions -1 AP</div>}
                          {hasSkill("full_catering")&&<div style={{fontSize:11,color:"#60d090"}}>🍾 On-Demand Feast unlocked</div>}
                          {hasSkill("group_dynamics")&&<div style={{fontSize:11,color:"#60d090"}}>👥 Group Dinner unlocked</div>}
                          {hasSkill("dinner_accessible")&&<div style={{fontSize:11,color:"#d0a030"}}>🌟 The Atelier unlocked</div>}
                          {skillScrutinyReduce<1&&<div style={{fontSize:11,color:"#a0d0e0"}}>🔇 -{Math.round((1-skillScrutinyReduce)*100)}% scrutiny gain</div>}
                          {skillScrutinyPassiveReduce>0&&<div style={{fontSize:11,color:"#a0d0e0"}}>🛡️ -{skillScrutinyPassiveReduce} scrutiny/week</div>}
                          {skillSessionCapBonus>0&&<div style={{fontSize:11,color:"#d0a0e0"}}>🌙 +{skillSessionCapBonus} session capacity</div>}
                          <div style={{fontSize:10,color:"#5a3070",marginTop:3}}>{unlockedSkills.length} / {ALL_SKILLS.length} skills</div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
}
