// ═══════════════════════════════════════════════════════════════
// LILITH — Clue/Investigation modal + Feasting Beauty text adventure
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { LILITH_ID, HUNT_NODES, HUNT_MAP, HUNT_NODE_ACCESS, HUNT_MEN, PHYSICAL_MOVES, getEffectiveDifficulty, CLUE_INVESTIGATION } from '../gameData/lilith.js';
import { getStage } from '../gameData/stages.js';

export function LilithClueModal({ lilithClueModal, investigateClue, setLilithClueModal, confirmInvestigation }){
        const accent="#8020a0";
        return(
          <div style={{...C.overlay,zIndex:1300}}>
            <div style={{...C.modal,maxWidth:480,background:"linear-gradient(160deg,#0a000f,#14001a,#0a000f)",border:`1px solid ${accent}50`,maxHeight:"88vh",overflowY:"auto",padding:22}}>
              {lilithClueModal==='feast_clue'&&(<>
                <div style={{fontSize:9,letterSpacing:4,color:accent,marginBottom:6}}>SOMETHING'S OFF</div>
                <div style={{fontSize:15,fontWeight:700,color:"#d080e0",marginBottom:12}}>{CLUE_INVESTIGATION.title}</div>
                <div style={{fontSize:12,color:"#a070b0",lineHeight:1.8,marginBottom:16,whiteSpace:"pre-line"}}>{CLUE_INVESTIGATION.text}</div>
                <button style={{...C.btn("#500060"),width:"100%",fontSize:13,marginBottom:8}} onClick={investigateClue}>
                  {CLUE_INVESTIGATION.action}
                </button>
                <button style={{...C.btn("#200030"),width:"100%",fontSize:11}} onClick={()=>setLilithClueModal(null)}>
                  Ignore for now
                </button>
              </>)}
              {lilithClueModal==='result'&&(<>
                <div style={{fontSize:9,letterSpacing:4,color:accent,marginBottom:6}}>ROOM 312</div>
                <div style={{fontSize:15,fontWeight:700,color:"#d080e0",marginBottom:12}}>You knocked.</div>
                <div style={{fontSize:12,color:"#c0a0d0",lineHeight:1.85,marginBottom:16,whiteSpace:"pre-line",fontStyle:"italic"}}>
                  {CLUE_INVESTIGATION.resultText}
                </div>
                <button style={{...C.btn("#500060"),width:"100%",fontSize:13}} onClick={confirmInvestigation}>
                  She's on the roster now. ✓
                </button>
              </>)}
            </div>
          </div>
        );
}

export function LilithHuntModal({ lilithHuntState, students, setLilithHuntState, navigateHunt, deliveryScene, closeHunt, approachMan, consumeMan, encounterSetMode, makeReply, makeSeduction }){
        const{textLog,currentNode,encounter,deliveryMode,deliveryDone}=lilithHuntState;
        const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return null;
        const stageId=getStage(lilith.lbs).id;
        const accessibleNodes=HUNT_NODE_ACCESS[stageId]||[];
        const accent="#7010a0";

        // Pixel art silhouette — profile view (facing right), 2px/pixel
        // Colors: 1=skin(#f2eeff), 2=hair(#0a000e), 3=dress(#1c0030), 4=boots(#070010)
        const LILITH_PROFILES=[
          // ── Stage 0 — Slim (128 lbs). Moderate bust, flat belly, slight butt. 10×32 ──
          [[0,2,2,2,2,0,0,0,0,0],[2,2,2,2,2,2,0,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,1,1,1,1,1,0,0,0,0],[2,0,1,1,1,0,0,0,0,0],[2,0,0,1,1,0,0,0,0,0],[2,0,3,3,3,3,0,0,0,0],[2,3,3,3,3,3,3,3,0,0],[0,3,3,3,3,3,3,3,3,0],[0,3,3,3,3,3,3,3,0,0],[0,3,3,3,3,3,3,0,0,0],[2,0,3,3,3,3,3,0,0,0],[2,0,3,3,3,3,3,0,0,0],[2,0,3,3,3,3,3,0,0,0],[2,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,4,4,4,0,0,0,0,0],[0,4,4,4,4,0,0,0,0,0],[0,4,4,4,4,0,0,0,0,0],[0,4,4,4,4,0,0,0,0,0],[0,4,4,4,4,0,0,0,0,0],[4,4,4,4,4,0,0,0,0,0]],
          // ── Stage 1 — Soft (~155 lbs). Tiny belly, butt fills out, thighs +1px. 10×32 ──
          [[0,2,2,2,2,0,0,0,0,0],[2,2,2,2,2,2,0,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,1,1,1,1,1,0,0,0,0],[2,0,1,1,1,0,0,0,0,0],[2,0,0,1,1,0,0,0,0,0],[2,0,3,3,3,3,0,0,0,0],[2,3,3,3,3,3,3,3,0,0],[0,3,3,3,3,3,3,3,3,0],[0,3,3,3,3,3,3,3,0,0],[0,3,3,3,3,3,3,0,0,0],[2,0,3,3,3,3,3,3,0,0],[2,0,3,3,3,3,3,3,0,0],[2,0,3,3,3,3,3,0,0,0],[2,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,4,4,4,4,0,0,0,0],[0,4,4,4,4,4,0,0,0,0],[0,4,4,4,4,4,0,0,0,0],[0,4,4,4,4,4,0,0,0,0],[0,4,4,4,4,4,0,0,0,0],[4,4,4,4,4,4,0,0,0,0]],
          // ── Stage 2 — Plump (~195 lbs). Clear belly, no waist, thicker legs. 10×32 ──
          [[0,2,2,2,2,0,0,0,0,0],[2,2,2,2,2,2,0,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,2,1,1,1,1,1,0,0,0],[2,1,1,1,1,1,0,0,0,0],[2,0,1,1,1,0,0,0,0,0],[2,0,0,1,1,0,0,0,0,0],[2,0,3,3,3,3,3,0,0,0],[2,3,3,3,3,3,3,3,3,0],[0,3,3,3,3,3,3,3,3,0],[0,3,3,3,3,3,3,3,3,0],[0,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,0,0,0],[0,3,3,3,3,3,3,0,0,0],[0,3,3,3,3,3,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,4,4,4,4,4,0,0,0],[0,4,4,4,4,4,4,0,0,0],[0,4,4,4,4,4,4,0,0,0],[0,4,4,4,4,4,4,0,0,0],[0,4,4,4,4,4,4,0,0,0],[4,4,4,4,4,4,4,0,0,0]],
          // ── Stage 3 — Heavy (~240 lbs). Round bust+gut+booty, legs centered. 14×36 ──
          [[0,0,0,0,2,2,2,2,0,0,0,0,0,0],[0,0,0,2,2,2,2,2,2,0,0,0,0,0],[0,0,0,2,2,1,1,1,1,1,0,0,0,0],[0,0,0,2,2,1,1,1,1,1,0,0,0,0],[0,0,0,2,1,1,1,1,1,0,0,0,0,0],[0,0,0,2,0,1,1,1,0,0,0,0,0,0],[0,0,0,2,0,1,1,0,0,0,0,0,0,0],[0,0,0,2,0,3,3,3,3,0,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,0,0],[0,0,3,3,3,3,3,3,3,3,3,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,0],[3,3,3,3,3,3,3,3,3,3,3,3,0,0],[3,3,3,3,3,3,3,3,3,3,3,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,0,0,0],[0,3,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,3,3,3,3,3,3,3,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,4,4,4,4,4,4,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,0,0,0,0]],
          // ── Stage 4 — Fat (~295 lbs). Big round bust w/ 1px overflow, massive gut, very pronounced booty to col 0. 18×37 ──
          [[0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0],[0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0],[0,0,0,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,2,0,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,2,0,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],[0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0]],
          // ── Stage 5 — Very Fat (~365 lbs). Bust fully overflowing top (2px past dress), gut past bust, booty to col 0. 20×39 ──
          [[0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,3,3,3,3,3,3,3,3,3,3,1,1,0,0,0,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0],[0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],[0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0],[0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0],[0,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0]],
        ];
        const PIX=2;
        const PIX_C={1:'#f2eeff',2:'#0a000e',3:'#1c0030',4:'#070010'};
        const currentPix=LILITH_PROFILES[Math.min(5,stageId)];
        const pCols=currentPix[0]?.length||10, pRows=currentPix.length;
        const silScaleX=1.0, silScaleY=1.0;

        // Build choice list (nav/delivery/approach states only)
        const choices=[];
        const addNavChoices=(nodeId)=>{
          const connected=(HUNT_MAP[nodeId]||[]).filter(nid=>accessibleNodes.includes(nid)&&nid!=='dorm');
          connected.forEach(nid=>choices.push({id:`go_${nid}`,label:`→ ${HUNT_NODES[nid]?.label}`,action:()=>navigateHunt(nid),nav:true}));
        };
        const returnToLoc=()=>{
          const nd=HUNT_NODES[currentNode];
          setLilithHuntState(prev=>({...prev,encounter:null,textLog:[...prev.textLog,{text:nd?.label.toUpperCase()||'',type:'location'}]}));
        };

        if(deliveryMode){
          if(!deliveryDone) choices.push({id:'deliver',label:'📱 He knocks. You call him in.',action:deliveryScene,big:true});
          else choices.push({id:'close',label:'Close ✓',action:closeHunt,dim:true});
        } else if(!encounter){
          if(currentNode==='dorm'){
            choices.push({id:'go_quad',label:'→ Step out into the night',action:()=>navigateHunt('quad'),big:true});
            choices.push({id:'close',label:'← Stay in',action:closeHunt,dim:true});
          } else {
            const menHere=HUNT_MEN.filter(m=>m.location===currentNode&&m.difficulty>0);
            menHere.forEach(man=>{
              const eff=getEffectiveDifficulty(man.difficulty,stageId);
              const diffColor=eff<=1?"#40c060":eff===2?"#c0a030":"#c04030";
              choices.push({id:`approach_${man.id}`,label:`APPROACH  ${man.name}`,sublabel:`${man.tag} · ${eff<=1?"Easy":eff===2?"Medium":"Hard"}`,sublabelColor:diffColor,action:()=>approachMan(man.id),approach:true});
            });
            addNavChoices(currentNode);
            choices.push({id:'leave',label:'Leave the hunt',action:closeHunt,dim:true,small:true});
          }
        } else if(encounter.consumed||encounter.failed){
          if(encounter.consumed){
            choices.push({id:'again',label:'Hunt again ↩',action:returnToLoc,nav:true});
            choices.push({id:'close',label:'Return to campus',action:closeHunt,dim:true});
          } else {
            choices.push({id:'back',label:'↩ Back to the hunt',action:returnToLoc,nav:true});
            addNavChoices(currentNode);
            choices.push({id:'leave',label:'Leave the hunt',action:closeHunt,dim:true,small:true});
          }
        }

        const hasSeduce=Object.values(PHYSICAL_MOVES).some(m=>lilith.lbs>=m.unlockLbs);
        const btnBase={borderRadius:5,cursor:"pointer",textAlign:"left",lineHeight:1.4,fontFamily:"inherit",width:"100%",fontSize:12};

        return(
          <div style={{position:"fixed",inset:0,background:"#000",zIndex:1300,display:"flex",flexDirection:"column",fontFamily:"inherit"}}>

            {/* ── NIGHT SCENE HEADER ── */}
            <div style={{position:"relative",height:123,overflow:"hidden",flexShrink:0,background:"linear-gradient(180deg,#010008 0%,#060018 55%,#0d0026 100%)"}}>
              {/* Stars */}
              {[[7,22],[14,9],[23,16],[33,5],[41,19],[50,8],[58,13],[66,5],[74,21],[81,10],[88,7],[94,17],[4,32],[47,26],[71,29]].map(([x,y],i)=>(
                <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:i%3===0?2:1,height:i%3===0?2:1,borderRadius:"50%",background:"#fff",opacity:0.4+i%3*0.15,boxShadow:`0 0 ${i%4===0?4:2}px #ffffff60`}}/>
              ))}
              {/* Moon */}
              <div style={{position:"absolute",right:"9%",top:"10%",width:20,height:20,borderRadius:"50%",background:"#ccc8e0",boxShadow:"inset 5px -2px 0 #0a001c, 0 0 12px #9080c040"}}/>
              {/* Left building */}
              <div style={{position:"absolute",left:0,bottom:0,width:"28%",height:44,background:"#040010",clipPath:"polygon(0 100%,0 45%,8% 45%,8% 22%,14% 22%,14% 45%,22% 45%,22% 65%,28% 65%,28% 5%,34% 5%,34% 60%,42% 60%,42% 100%)"}}/>
              {/* Right building */}
              <div style={{position:"absolute",right:0,bottom:0,width:"32%",height:52,background:"#040010",clipPath:"polygon(0 100%,0 60%,6% 60%,6% 32%,12% 32%,12% 52%,20% 52%,20% 12%,26% 12%,26% 52%,36% 52%,36% 38%,42% 38%,42% 4%,48% 4%,48% 38%,62% 38%,62% 62%,72% 62%,72% 100%)"}}/>
              {/* Lilith pixel art silhouette — profile */}
              <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)"}}>
                <svg width={Math.round(pCols*PIX*silScaleX)} height={Math.round(pRows*PIX*silScaleY)} viewBox={`0 0 ${pCols*PIX} ${pRows*PIX}`} style={{display:"block",filter:"drop-shadow(1px 0 0 rgba(255,255,255,0.4)) drop-shadow(-1px 0 0 rgba(255,255,255,0.4)) drop-shadow(0 1px 0 rgba(255,255,255,0.4)) drop-shadow(0 -1px 0 rgba(255,255,255,0.4)) drop-shadow(0 0 3px rgba(180,100,255,0.25))",transition:"width 0.4s,height 0.4s"}}>
                  {currentPix.flatMap((row,y)=>row.map((c,x)=>{
                    if(!c) return null;
                    return <rect key={`${x}-${y}`} x={x*PIX} y={y*PIX} width={PIX} height={PIX} fill={PIX_C[c]}/>;
                  }))}
                </svg>
              </div>
              {/* Top bar */}
              <div style={{position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",padding:"5px 12px"}}>
                <div style={{fontSize:8,letterSpacing:4,color:"#6010a0",textShadow:"0 0 8px #7010a0"}}>🌑 FEASTING BEAUTY</div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:10,color:"#9030b0"}}>{Math.round(lilith.lbs)} lbs · {getStage(lilith.lbs).label}</span>
                  <button onClick={closeHunt} style={{background:"none",border:"1px solid #40104050",color:"#604060",fontSize:10,borderRadius:4,padding:"1px 7px",cursor:"pointer",lineHeight:"16px"}}>✕</button>
                </div>
              </div>
            </div>

            {/* ── TEXT LOG ── */}
            <div ref={el=>{if(el)el.scrollTop=el.scrollHeight}} style={{flex:1,overflowY:"auto",padding:"14px 16px 8px",display:"flex",flexDirection:"column",gap:7,background:"#03000e"}}>
              {textLog.map((entry,i)=>{
                const isLast=i===textLog.length-1;
                if(entry.type==='location') return(
                  <div key={i} style={{fontSize:9,letterSpacing:3,color:"#6010a0",textAlign:"center",padding:"8px 0 2px",opacity:0.9}}>〔 {entry.text} 〕</div>
                );
                if(entry.type==='system') return(
                  <div key={i} style={{fontSize:12,color:"#c060e0",fontWeight:700,textAlign:"center",letterSpacing:1,padding:"2px 0"}}>{entry.text}</div>
                );
                if(entry.type==='action') return(
                  <div key={i} style={{fontSize:12,color:isLast?"#ddb0ff":"#a070c0",lineHeight:1.8,fontStyle:"italic",opacity:isLast?1:0.75}}>{entry.text}</div>
                );
                if(entry.type==='guy') return(
                  <div key={i} style={{fontSize:12,color:isLast?"#90b8d8":"#4a6080",lineHeight:1.8,opacity:isLast?1:0.7}}>{entry.text}</div>
                );
                return(
                  <div key={i} style={{fontSize:12,color:isLast?"#c898e8":"#7d5090",lineHeight:1.9,fontStyle:"italic",opacity:isLast?1:0.65,whiteSpace:"pre-line"}}>{entry.text}</div>
                );
              })}
            </div>

            {/* ── CHOICES PANEL ── */}
            <div style={{flexShrink:0,background:"#050010",borderTop:"1px solid #30104050"}}>
              {/* Encounter status bars */}
              {encounter&&!encounter.consumed&&!encounter.failed&&(
                <div style={{padding:"10px 16px 4px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:9,color:"#7010a0",letterSpacing:2,minWidth:72}}>WILLPOWER</span>
                    <div style={{flex:1,height:6,background:"#1a0030",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",background:"linear-gradient(90deg,#c060d0,#7010a0)",width:`${encounter.willpower}%`,transition:"width 0.3s"}}/>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:9,color:"#601030",letterSpacing:2,minWidth:72}}>WARINESS</span>
                    <div style={{display:"flex",gap:4}}>
                      {Array.from({length:encounter.maxApprehension}).map((_,i)=>(
                        <div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<encounter.apprehension?"#c03050":"#1a0020",border:"1px solid #500030",transition:"background 0.2s"}}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:5,padding:"8px 14px 12px",maxHeight:"42vh",overflowY:"auto"}}>
                {/* Nav / delivery / approach states */}
                {(!encounter||encounter.consumed||encounter.failed)&&choices.map(ch=>(
                  <button key={ch.id} onClick={ch.action} style={{
                    ...btnBase,
                    background:ch.big?"#3a0060":ch.approach?"#260042":ch.nav?"#1a0030":"#130020",
                    border:`1px solid ${ch.approach?accent+"60":ch.nav?accent+"50":accent+"30"}`,
                    color:ch.dim?"#5a3860":ch.approach?"#d070f0":ch.nav?"#9860b8":"#b080d0",
                    padding:ch.big?"11px 16px":"8px 14px",
                    fontSize:ch.small?10:ch.big?13:12,fontWeight:ch.big?700:"normal",
                  }}>
                    {ch.label}
                    {ch.sublabel&&<span style={{fontSize:10,color:ch.sublabelColor||"#705080",marginLeft:8}}>{ch.sublabel}</span>}
                  </button>
                ))}
                {/* Won — take home */}
                {encounter&&encounter.won&&!encounter.consumed&&(
                  <button onClick={consumeMan} style={{...btnBase,background:"#3a0060",border:`1px solid ${accent}70`,color:"#d070f0",padding:"11px 16px",fontSize:13,fontWeight:700}}>
                    🌑 Take him home →
                  </button>
                )}
                {/* Idle — Reply / Seduce */}
                {encounter&&!encounter.won&&!encounter.failed&&!encounter.consumed&&encounter.mode==='idle'&&(<>
                  <button onClick={()=>encounterSetMode('replying')} style={{...btnBase,background:"#1a0040",border:`1px solid ${accent}60`,color:"#c080e0",padding:"10px 14px"}}>
                    💬 Reply…
                  </button>
                  {hasSeduce&&(
                    <button onClick={()=>encounterSetMode('seducing')} style={{...btnBase,background:"#250050",border:`1px solid ${accent}70`,color:"#d060e0",padding:"10px 14px"}}>
                      ✦ Seduce…
                    </button>
                  )}
                </>)}
                {/* Replying — 3 options */}
                {encounter&&encounter.mode==='replying'&&(<>
                  {(encounter.replyOptions||[]).map(opt=>(
                    <button key={opt.id} onClick={()=>makeReply(opt)} style={{...btnBase,background:"#150030",border:`1px solid ${accent}50`,color:"#c090d8",padding:"9px 14px"}}>
                      {opt.label}
                    </button>
                  ))}
                  <button onClick={()=>encounterSetMode('idle')} style={{...btnBase,background:"#0a0018",border:`1px solid ${accent}20`,color:"#604070",padding:"7px 14px",fontSize:10,marginTop:2}}>
                    ← Back
                  </button>
                </>)}
                {/* Seducing — physical moves (unlocked only) */}
                {encounter&&encounter.mode==='seducing'&&(<>
                  {Object.entries(PHYSICAL_MOVES).filter(([,m])=>lilith.lbs>=m.unlockLbs).map(([id,m])=>(
                    <button key={id} onClick={()=>makeSeduction(id)} style={{...btnBase,background:"#200040",border:`1px solid ${accent}60`,color:"#e080e0",padding:"9px 14px",fontWeight:600}}>
                      {m.label}
                    </button>
                  ))}
                  <button onClick={()=>encounterSetMode('idle')} style={{...btnBase,background:"#0a0018",border:`1px solid ${accent}20`,color:"#604070",padding:"7px 14px",fontSize:10,marginTop:2}}>
                    ← Back
                  </button>
                </>)}
              </div>
            </div>

          </div>
        );
}
