// ═══════════════════════════════════════════════════════════════
// PANTRY — inventory of foods & items usable on the girls
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { ITEMS } from '../gameData/items.js';

const RARITY_COLORS = { common:"#8a8a7a", uncommon:"#4a9a5a", rare:"#c8860a" };

export function InventoryView({ inventory, setItemTargetPicker }){
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
            <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{item.desc}</div>
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

export function ItemTargetPicker({ itemTargetPicker, setItemTargetPicker, students, lilithUnlocked, useItemOn }){
  const { item } = itemTargetPicker;
  return(
    <div style={C.overlay}>
      <div style={{...C.modal,maxWidth:460}}>
        <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>USE ITEM</div>
        <div style={{fontSize:14,fontWeight:700,color:"#c090e8",marginBottom:4}}>{item.emoji} {item.label}</div>
        <div style={{fontSize:11,color:"#5a3888",marginBottom:12}}>{item.cal.toLocaleString()} cal · {item.full} fullness — who's it for?</div>
        <div style={{maxHeight:320,overflowY:"auto",marginBottom:10}}>
          {students.filter(s=>!s.hidden||lilithUnlocked).map(s=>{
            const cap=s.stomachCapacity||100;
            const over=(s.fullness||0)+item.full>cap;
            return(
              <button key={s.id} style={{...C.smBtn,display:"flex",width:"100%",justifyContent:"space-between",marginBottom:3,padding:"7px 10px"}}
                onClick={()=>useItemOn(item,s.id)}>
                <span>{s.name}</span>
                <span style={{fontSize:10,color:over?"#e07030":"#60a060"}}>{s.fullness||0}/{cap}{over?" — over capacity!":""}</span>
              </button>
            );
          })}
        </div>
        <button style={{...C.btn("#333"),width:"100%"}} onClick={()=>setItemTargetPicker(null)}>Cancel</button>
      </div>
    </div>
  );
}
