// ═══════════════════════════════════════════════════════════════
// LILITH PIXEL ART — crisp sprite renderer
// ═══════════════════════════════════════════════════════════════
import { LILITH_SPRITES, LILITH_PALETTE, lilithSpriteTier, LILITH_TIER_LABELS } from '../gameData/lilithSprites.js';

export function LilithPixelArt({ stageId, size = 160 }){
  const tier = lilithSpriteTier(stageId);
  const grid = LILITH_SPRITES[tier];
  const rows = grid.length, cols = grid[0].length;
  return(
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:4}}>
      <svg viewBox={`0 0 ${cols} ${rows}`} width={size} height={size}
        style={{imageRendering:"pixelated",background:"radial-gradient(circle at 50% 60%, #1a0a20, #0a0510)",border:"1px solid #4a1850",borderRadius:10}}
        shapeRendering="crispEdges">
        {grid.map((row,y)=>{
          const rects=[];
          let x=0;
          while(x<row.length){
            const ch=row[x];
            if(ch==="."){x++;continue;}
            let run=1;
            while(x+run<row.length&&row[x+run]===ch) run++;
            rects.push(<rect key={x} x={x} y={y} width={run} height={1} fill={LILITH_PALETTE[ch]||"#f0f"}/>);
            x+=run;
          }
          return rects;
        })}
      </svg>
      <span style={{fontSize:9,letterSpacing:2,color:"#8a5a9a"}}>{LILITH_TIER_LABELS[tier].toUpperCase()}</span>
    </div>
  );
}
