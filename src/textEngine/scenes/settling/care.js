// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling care scenes — "Tend Her" action (set.care.tend).
// Refit + comfort milestone subs reuse immob.refit / immob.comfort.* via sceneKey.
// House voice: intimate, practical, sensory — caretaking at impossible scale.
import { registerPoolAutoDecompose } from '../decomposePools.js';

// ── set.care.tend.beat ────────────────────────────────────────
// The act of tending: cooling, adjusting, maintaining.
registerPoolAutoDecompose('set.care.tend.beat', [
  { when: {}, text: [
    `You tend {subject.name} where she rests — small necessary attentions at a scale that makes them intimate.`,
    `You move through the space around her, attending to what needs attending. She holds still for it.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `The pillow beneath the heavy slope of her hip gets repositioned. A cool cloth moved along the warm fold at her arm. Her position adjusted by degrees, each small correction an acknowledgment of her current reality.`,
    `You tend to {subject.name} where she rests — cooling the places she runs warm, adjusting the cushions beneath the weight of her, just present in the way that the vast soft terrain of her needs you to be.`,
    `There is a small geography to maintaining {subject.name} at this scale — the fold beneath each arm, the warm under-curves, the terrain that shifts when she breathes. You learn it by tending it.`,
    `Cushion under the right fold. Cool cloth across her shoulder where she runs warmest. A small adjustment to how she's settled. All of it taken in the practical, intimate register of someone who has memorized the exact shape of her needs.`,
    `You move through the attentions the way you move through a known room — unhurried, certain of where everything is. Cloth, cushion, the small cooling gestures that are entirely hers now.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `At her scale, tending takes time. You move through it unhurried — the vast territories of her attended piece by piece, each fold cooled, each weight redistributed, the full impossible warm expanse of her maintained by two hands that know exactly where to go.`,
    `She fills enough of the room that tending her is a route, not a gesture. You follow it: the cooling cloth, the repositioned pillow, the weight of a leg shifted by careful degrees. She goes still under the attention. Her breathing slows.`,
    `Maintenance at leviathan scale: you tend the whole warm country of her — cooling what runs hottest, supporting what furniture cannot reach, attending each fold and deep terrain until the room settles alongside her.`,
    `There is more of her than before. You tend all of it — the immense soft landscape of her, the heat she generates at rest, the specific needs of mass at this scale. It takes time. You give it without rushing.`,
    `You move through the tending methodically, learning the changes since last time: a new fold where the weight has redistributed, a new warm place that needs the cloth. She is not the same shape two visits running. You adjust accordingly.`,
  ]},
]);

// ── set.care.tend.react ───────────────────────────────────────
// Her response: corruption-keyed, stage-keyed.
registerPoolAutoDecompose('set.care.tend.react', [
  { when: {}, text: [
    `{subject.name} is quiet under the attention. Warmth and stillness.`,
    `She lets you tend her without commentary. Something in her settles.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `"You don't have to —" she starts, and doesn't finish. She lets you tend her anyway. Her breathing is different after.`,
    `She still gets a little caught on being maintained like this — the smallness of needing it, the enormity of receiving it. But she doesn't say stop.`,
    `She goes quiet and a little overwhelmed when you tend her. Not distress — something else. The particular weight of being cared for at this scale by someone who doesn't make it a thing.`,
    `"Thank you," she says when you're done. Quietly. Like she's still surprised you meant it.`,
    `There is a moment near the end where she watches you and doesn't speak. The gratitude is in that moment. You both know it.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She takes it with the ease of someone who decided a while ago that this is simply how things are now. No explanation needed.`,
    `She watches you work with something soft and satisfied in her expression — the look of someone who has made peace with being kept like this and found it exactly right.`,
    `"You're good at this," she says, almost to herself. She has stopped being surprised by the fact.`,
    `She settles into the attention the way weather settles — naturally, completely, without effort. She has stopped needing to frame it.`,
    `She closes her eyes before you finish. The tending has a rhythm she knows now. She breathes into it.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She accepts your attention with the still entitlement of something that has decided it is owed this and is not wrong.`,
    `"Good," she says when you're done. That's all. It's sufficient.`,
    `She watches you move through the tending with an expression that says: yes. More. Continue. She does not have to speak it for it to be clear.`,
    `She does not thank you. She receives the attention the way a court receives tribute — as the natural order, thoroughly deserved.`,
    `Her eyes stay on you as you work. Pleased. Proprietary. She will expect this again next time.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `At this scale, being tended is practical necessity, and she has found a way to receive it like tribute all the same.`,
    `She goes still under your hands — all that impossible warmth and weight, quieted by small attentions. She closes her eyes.`,
  ]},
  { when: { stageMin: 11, corruption: [2] }, weight: 4, text: [
    `She accepts the tending with the unhurried authority of something the room has organized itself around. At her scale, being attended is architectural fact. She simply receives it as due.`,
    `The expression she gives you when you finish is not gratitude. It is acknowledgment. The distinction matters to her. You have learned to know the difference.`,
  ]},
]);

// ── set.care.tend — composed skeleton ─────────────────────────
registerPoolAutoDecompose('set.care.tend', [
  { when: {}, text: [`{set.care.tend.beat} {set.care.tend.react}{set.enorm|prefix: }`] },
]);
