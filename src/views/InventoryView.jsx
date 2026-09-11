// ═══════════════════════════════════════════════════════════════
// PANTRY — inventory of foods & items usable on residents
// ═══════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from '../components/ModalOverlay.jsx';
import { ITEMS, itemUseModesForOwned } from '../gameData/items.js';
import { renderItemDesc } from '../textEngine/scenes/overhaul/leftoverCatalog.js';
import { foodProfile } from '../textEngine/scenes/feedReaction/index.js';

const RARITY_COLORS = { common:"#8a8a7a", uncommon:"#4a9a5a", rare:"#c8860a" };

export function InventoryView({ inventory, setItemTargetPicker, week = 1 }){
  const owned = ITEMS.filter(i => (inventory[i.id]||0) > 0);
  return(
    <div>
      <p style={C.secT}>Pantry — items restock weekly</p>
      {owned.length===0&&(
        <div style={{fontSize:12,color:"#5a3888",fontStyle:"italic"}}>
          The pantry is bare. New finds arrive at the start of each week.
        </div>
      )}
      <div style={C.grid2}>
        {owned.map(item=>(
          <div key={item.id} style={C.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <div style={{fontWeight:700,color:"#c090e8"}}>{item.emoji} {item.label}</div>
              <span style={{...C.tag(`${RARITY_COLORS[item.rarity]}30`,RARITY_COLORS[item.rarity])}}>×{inventory[item.id]}</span>
            </div>
            <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{renderItemDesc(item, null, week)}</div>
            {(()=>{const p=foodProfile(item.label,item.cal,item.full);return(
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,fontSize:10}}>
                <span style={{...C.tag(p.dense?"#7a3a1a30":"#3a5a7a30",p.dense?"#d88030":"#70a0d0")}}>{p.icon} {p.kindLabel}</span>
                <span style={{color:"#7a6a55",fontStyle:"italic"}}>{p.fill}</span>
              </div>
            );})()}
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:10,color:"#604030"}}>
              <span>{item.cal.toLocaleString()} cal</span>
              <span>{item.full} fullness</span>
              <span style={{color:RARITY_COLORS[item.rarity]}}>{item.exploration?"exploration":item.rarity}</span>
            </div>
            <button style={{...C.btn(),width:"100%"}} onClick={()=>setItemTargetPicker({item})}>Use on…</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItemTargetPicker({ itemTargetPicker, setItemTargetPicker, students, lilithUnlocked, useItemOn, owned = {}, soundEnabled = true }){
  const { item } = itemTargetPicker;
  const modes = itemUseModesForOwned(owned);
  const [modeId, setModeId] = useState('feed');
  useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, item?.id]);
  const dismiss = () => { playHallPassSound('click', soundEnabled); setItemTargetPicker(null); };
  return(
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in item-target-picker-modal" style={{...C.modal,maxWidth:460}}>
        <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>USE ITEM</div>
        <div style={{fontSize:14,fontWeight:700,color:"#c090e8",marginBottom:4}}>{item.emoji} {item.label}</div>
        {(()=>{const p=foodProfile(item.label,item.cal,item.full);return(
          <div style={{fontSize:11,color:"#5a3888",marginBottom:12}}>
            {p.icon} {p.kindLabel} · <span style={{fontStyle:"italic",color:"#7a6a55"}}>{p.fill}</span> — {item.cal.toLocaleString()} cal · {item.full} fullness — who's it for?
          </div>
        );})()}
        {modes.length>1&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
            {modes.map(mode=>(
              <button
                key={mode.id}
                type="button"
                style={{...C.smBtn,padding:"5px 10px",border:modeId===mode.id?"1px solid #c090e8":"1px solid transparent",opacity:modeId===mode.id?1:0.7}}
                onClick={()=>{ playHallPassSound('click', soundEnabled); setModeId(mode.id); }}
              >
                {mode.label}
              </button>
            ))}
          </div>
        )}
        <div style={{maxHeight:320,overflowY:"auto",marginBottom:10}}>
          {students.filter(s=>(!s.hidden||lilithUnlocked)&&s.lockState!=='locked').map(s=>{
            const cap=s.stomachCapacity||100;
            const mode=modes.find(m=>m.id===modeId)||modes[0];
            const fullCost=Math.round(item.full*(mode.fullMult||1));
            const over=(s.fullness||0)+fullCost>cap;
            return(
              <button key={s.id} style={{...C.smBtn,display:"flex",width:"100%",justifyContent:"space-between",marginBottom:3,padding:"7px 10px"}}
                onClick={()=>{ playHallPassSound('click', soundEnabled); useItemOn(item,s.id,modeId); }}>
                <span>{s.name}</span>
                <span style={{fontSize:10,color:over?"#e07030":"#60a060"}}>{s.fullness||0}/{cap}{over?" — over capacity!":""}</span>
              </button>
            );
          })}
        </div>
        <button style={{...C.btn("#333"),width:"100%"}} onClick={dismiss}>Cancel</button>
      </div>
    </ModalOverlay>
  );
}
