// ═══════════════════════════════════════════════════════════════
// SHARED PRESENTATIONAL COMPONENTS
// ═══════════════════════════════════════════════════════════════

export function Bar({ val, max=1100, color="#8030d0", height=8 }){
  return (
    <div style={{background:"#0d0816",borderRadius:4,height,overflow:"hidden",margin:"3px 0"}}>
      <div style={{width:`${Math.min(100,(val/max)*100)}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.5s ease"}}/>
    </div>
  );
}

export function StageTag({ stage }){
  return (
    <span style={{background:stage.color,color:"#fff",borderRadius:10,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}}>
      {stage.label.toUpperCase()}
    </span>
  );
}

export function MoodBadge({ mood }){
  const m={happy:"😊",focused:"📖",excited:"⚡",competitive:"🏆",dreamy:"🌙",dry:"😑",social:"🥂",driven:"📊",observant:"👁",curious:"🔍",content:"☁️",tired:"😴",stressed:"😰",nervous:"😬"};
  return <span style={{fontSize:12}}>{m[mood]||"😐"} {mood}</span>;
}
