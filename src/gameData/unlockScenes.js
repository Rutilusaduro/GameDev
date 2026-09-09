// ═══════════════════════════════════════════════════════════════
// ROSTER UNLOCK SCENES — bespoke per-girl beats fired when a locked
// student crosses into the spirit's reach. One-shots, authored long;
// stored off the registerPool system so the 200-char text linter
// never scans them. Keyed by student id (unlock pool = ids 0-14).
// House voice: celebratory, sensual-literary, adults only.
// ═══════════════════════════════════════════════════════════════

export const UNLOCK_SCENES = {
  // Brittany — cheerleader, runs the squad on numbers
  0: "Brittany runs the squad on numbers: macros, reps, the protein shake measured to the scoop. This week the scoop gets careless. She laughs at herself for it, then does it again, louder, like she wants you to hear. The captain just handed you the count.",
  // Cassidy — bookworm, analytical
  1: "Cassidy studies everything, including the way the granola bar stopped being enough around Tuesday. So she writes it down. She underlines it. Somewhere in the margin of her own careful notes, she has started taking yours.",
  // Kylie — influencer, curated
  2: "Kylie shoots the acai bowl for the grid, then eats a second one off-camera where the brand can't follow. The off-camera version is the one you wanted. She's learning there's a feed she keeps just for you.",
  // Serena — athlete, competitive
  3: "Serena doesn't lose. So when the pasta portions creep up she calls it fuel, calls it gains, calls it anything but surrender, and clears the plate like it's a record to break. You let her keep the word. You take the rest.",
  // Fiona — artsy, dreamy
  4: "Fiona builds a cheese board like a still life and forgets to stop eating it. She drifts. The drift is new, and it drifts toward you. She'd call it inspiration if you asked. Don't ask yet.",
  // Destiny — gamer, dry
  5: "Destiny clocks the third bowl of ramen the way she reads a patch note: unbothered, already rebuilding around it. 'Guess that's the meta now,' she says to no one. The spirit hears it anyway.",
  // Tiffany — sorority president, performative
  6: "Tiffany hosts. Rosé, brie, a spread arranged for everyone that ends up mostly in her. In front of the chapter she'd never own the appetite. She owns it quietly, in the room where you're listening.",
  // Priya — overachiever, eats on the run
  7: "Priya eats the way she does everything: fast, between tasks, no time. This week she takes the time. She sits down, takes a second helping, and doesn't apologize to her planner for it. That pause is the door.",
  // Maya — quiet, observant
  8: "Maya watches from the back, sketchbook open, a pastry going soft beside her. For weeks she's drawn the same hand reaching for the same plate. Now she lets the hand be hers. She doesn't look up, but she knows you saw.",
  // Chloé — transfer, sultry
  9: "Chloé came for the architecture and stayed for the portions, scandalized and delighted in one breath. The restraint she packed from Paris thins by the week. 'You Americans,' she sighs, reaching again. She means it as a compliment now.",
  // Reneé — culinary, sensory
  10: "Reneé tastes everything she makes, and lately she makes more than the recipe needs. A cook's tax, she calls it. The tax keeps climbing. She talks about flavor the way other people talk about wanting, and the wanting has found your frequency.",
  // Kaylee — nursing, nurturing
  11: "Kaylee feeds everyone first; that's the whole shape of her. Which is why it stops you, this week, to catch her plating something only for herself and lingering over it. The girl who tends the room lets herself be tended. You step into the gap she left open.",
  // Nadia — psych PhD, clinical observer
  12: "Nadia takes notes on appetite like it's someone else's case study, coffee going cold, the watcher never the watched. Then the data turns personal. She catalogs her own second plate with clinical interest and a flush she doesn't record. You've become a variable she can't control for.",
  // Daisy — eced, snacks for everyone
  13: "Daisy always has snacks in her bag for everyone else. This week the bag empties before she reaches the kids. She laughs, refills it bigger, smells like cookies, and doesn't mind that some of them never leave her hands. The looking-after has turned inward, toward you.",
  // Mary Jane — farm girl, sunny
  14: "Mary Jane brought six kinds of jam on the first day, and a seventh showed up by Friday. Sweet potato pie for the class, two slices held back for herself, sunny about all of it. 'No sense being shy about good food,' she says, and hears your agreement like her own thought.",
};

/** Bespoke unlock prose for a student, or null for the generic fallback. */
export function getUnlockScene(studentId) {
  return UNLOCK_SCENES[studentId] || null;
}
