// ═══════════════════════════════════════════════════════════════
// SHARED INLINE-STYLE TOKENS
// ═══════════════════════════════════════════════════════════════
export const C={
  app:{fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",background:"#070510",minHeight:"100vh",color:"#ddd0b8",display:"flex",flexDirection:"column",fontSize:14},
  hdr:{background:"linear-gradient(135deg,#0f0620,#1c0838,#0f0620)",borderBottom:"2px solid #4a1590",padding:"10px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"},
  nav:{display:"flex",background:"#0c0718",borderBottom:"1px solid #200e40",flexWrap:"wrap"},
  navB:(a)=>({background:a?"#180c30":"transparent",border:"none",borderBottom:a?"2px solid #7a24d8":"2px solid transparent",color:a?"#c090ff":"#60409a",padding:"8px 16px",cursor:"pointer",fontSize:12,fontFamily:"inherit",letterSpacing:0.5,transition:"all 0.15s"}),
  body:{display:"flex",flex:1,overflow:"hidden",maxHeight:"calc(100vh - 90px)"},
  main:{flex:1,overflow:"auto",padding:14},
  side:{width:320,background:"#070410",borderLeft:"1px solid #180830",overflow:"hidden",padding:9,flexShrink:0,display:"flex",flexDirection:"column"},
  card:{background:"rgba(255,255,255,0.03)",border:"1px solid #180830",borderRadius:8,padding:10,marginBottom:7,cursor:"pointer",transition:"border-color 0.15s"},
  secT:{fontSize:10,letterSpacing:3,color:"#6028b8",textTransform:"uppercase",marginBottom:8,borderBottom:"1px solid #180830",paddingBottom:3},
  btn:(bg="#5818a8")=>({background:bg,border:"none",color:"#fff",borderRadius:6,padding:"7px 13px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,transition:"opacity 0.15s"}),
  smBtn:{background:"rgba(80,18,140,0.35)",border:"1px solid #4a1280",color:"#b080e8",borderRadius:5,padding:"4px 9px",cursor:"pointer",fontSize:11,fontFamily:"inherit",margin:"2px 2px",transition:"background 0.15s"},
  grid2:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:8},
  grid3:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:7},
  logE:{fontSize:12,padding:"3px 0",borderBottom:"1px solid rgba(80,18,140,0.12)",lineHeight:1.65,color:"#c0a888"},
  overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300},
  modal:{background:"#0e0820",border:"1px solid #5a18c8",borderRadius:12,padding:24,maxWidth:540,width:"93%",maxHeight:"88vh",overflow:"auto",boxShadow:"0 0 60px rgba(100,30,200,0.3)"},
  tag:(bg,color="#fff")=>({background:bg,color,borderRadius:10,padding:"2px 8px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}),
  infoBox:(bg)=>({background:bg,border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:10,marginBottom:9,lineHeight:1.75}),
};
