// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// One-shot comfort milestone scenes + clothing re-fit.
// House voice: celebratory, sensual-literary, never medicalized.
import { registerPool } from '../../engine.js';

// ── immob.refit ───────────────────────────────────────────────
// She gets measured and fitted to her current size.
registerPool('immob.refit', [
  { when: {}, text: [
    `New numbers. New garments. Everything made for what she actually is now.`,
    `She is measured and fitted — fabric in abundance, nothing straining. She receives the new clothes like her due.`,
    `Soft fabric arrives sized to her fullness — nothing pinches, nothing pretends she is smaller.`,
    `The tailor's work acknowledges her scale without apology. She wears the result like a crown.`,
  ]},
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    `New garments built for her current geography — wide, soft, unhurried about the measurements.`,
    `Fabric cut to her actual outline, not last semester's. She runs a hand along the seam and nods.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `The tailor's tape reads differently than it ever has. What comes back is made for her current reality — soft fabric, everything that fits her now.`,
    `She gets measured where she rests. The numbers are honest. The clothes that come back are built around her fullness — soft, sized, unhurried about it.`,
    `Garments arrive that do not fight her mass — engineered for comfort at immobile scale.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `Measurement at this scale is an exercise in acknowledgment. New garments arrive: impossible proportions, made real, fitted to what she has become.`,
    `What comes back fits. That's the statement — that this size can be clothed, and has been.`,
    `Fabric vast enough to drape her properly — no strain, no fiction, only soft acknowledgment of what she is.`,
  ]},
]);

// ── immob.comfort.bed ─────────────────────────────────────────
registerPool('immob.comfort.bed', [
  { when: {}, text: [
    `The new frame arrives — reinforced, wide, built to hold her. She settles onto it and something in her exhales completely. "This," she says, "is actually right."`,
    `The right bed finally. She finds the center without effort, redistributes, stills. The wood doesn't shift under her. "Better," she says.`,
    `She sinks into the reinforced frame and goes still — mass accepted, weight held, finally.`,
    `The bed does not complain. She notices. She appreciates it aloud.`,
  ]},
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    `A wider frame, built for her current scale. She tests it once and stops testing. "Keep this one," she says.`,
    `The mattress receives her mass without protest. She exhales like someone who has been waiting for this.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `The frame is built to her specification — vast and solid, engineered for the weight she carries. She settles onto it and the room goes quiet around her.`,
    `Immobility needs architecture. The new bed is architecture. She receives it without ceremony.`,
  ]},
]);

// ── immob.comfort.fan ─────────────────────────────────────────
registerPool('immob.comfort.fan', [
  { when: {}, text: [
    `The fan goes on and she closes her eyes into it. Cool air across the warm expanse of her — you watch her simply receive it. "Leave it running," she says.`,
    `Moving air against her warmth. She settles differently under it — easier, softer. "That helps," she says. "That actually helps."`,
    `The fan finds the places heat pools thickest. She breathes slower. "Yes," she murmurs.`,
    `Cool air crosses belly and thigh and the soft landscape between. She does not move to meet it. She lets it come to her.`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `At this scale, a fan is not luxury — it is infrastructure. She receives it like her due.`,
    `Moving air against immobile warmth — the room finally learns her needs.`,
  ]},
]);

// ── immob.comfort.position ────────────────────────────────────
registerPool('immob.comfort.position', [
  { when: {}, text: [
    `She shifts a little as you adjust — cushions repositioned, supports moved in. Something finds its place. She goes still. "There. That's the one."`,
    `The rearrangement takes two minutes. She settles into it and the tension she'd been holding releases — that small ongoing adjustment, finally done.`,
    `Cushions under hip and belly; supports where mass needs them. She tests the new geometry and stops moving.`,
    `"Better," she says once. Then silence — the good kind.`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `Position at this scale is engineering. You engineer; she settles; the room exhales.`,
    `Her mass finds the arrangement it has been asking for. She goes still — vast, warm, finally comfortable.`,
  ]},
]);

// ── immob.comfort.ac ──────────────────────────────────────────
registerPool('immob.comfort.ac', [
  { when: {}, text: [
    `The temperature finds itself for the first time. Her next breath is longer, slower. The heat she carries everywhere finally has somewhere to put itself.`,
    `Cool air, properly. She doesn't say anything, but the room is different. She is different in the room — easier, more settled. Less occupied with the warmth.`,
    `The climate adjusts to her, not the other way around. She breathes easier immediately.`,
    `Cool settles over warm mass like a blessing. She closes her eyes and receives it.`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `At immobile scale, temperature control is care. She receives the cool air like someone tended properly.`,
    `The room finally matches her needs — cool where she is warm, still where she is vast.`,
  ]},
]);

// ── immob.comfort.arrangement ─────────────────────────────────
registerPool('immob.comfort.arrangement', [
  { when: {}, text: [
    `Everything within reach. The room edited to her permanence — trays at height, paths cleared, space organized around what she is now. She looks at it, then at you. "You did this."`,
    `The room rearranged to fit her rather than the other way around. She surveys it without moving. "Good," she says. "Finally."`,
    `Trays, cushions, reach — all calibrated to immobile comfort. She approves with a slow nod.`,
    `The space stops fighting her size. She receives the rearrangement like her due.`,
  ]},
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    `The room learns her dimensions — wider paths, lower trays, furniture that does not flinch.`,
    `Everything she needs within arm's reach of where she rests. The geometry is finally honest.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `The room belongs to her completely now. You've made sure of it — every surface, every reach, every angle arranged for her settled permanence. She doesn't say thank you. She doesn't have to.`,
    `Court is not a metaphor anymore — the room is organized around her throne of warm mass.`,
  ]},
]);
