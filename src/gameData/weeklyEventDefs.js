// Metadata for per-girl stage-up narrative beats — prose in textEngine/scenes/weeklyEvent/
// (The class-wide RANDOM_EVENTS / SEMESTER_EVENTS bulk-gain layer was removed: its
//  balance assumptions predate the current tuning.)
export const NARRATIVE_EVENTS = [
  { id: 'uniform_split', stageMin: 3, archetype: 'cheerleader', title: 'Uniform Incident', gain: [4, 8], rel: 12 },
  { id: 'chair_breaks', stageMin: 4, archetype: null, title: 'The Chair Incident', gain: [3, 5], rel: 18 },
  { id: 'viral_post', stageMin: 4, archetype: 'influencer', title: 'Going Viral', gain: [5, 9], rel: 20 },
  { id: 'thesis_rewrite', stageMin: 3, archetype: 'bookworm', title: 'Hall Log Pivot', gain: [3, 6], rel: 15 },
  { id: 'season_plan_rewrite', stageMin: 3, archetype: 'swimmer', title: 'Season Plan Pivot', gain: [3, 6], rel: 15 },
  { id: 'gaming_sponsor', stageMin: 5, archetype: 'gamer', title: 'Snack Sponsorship', gain: [5, 10], rel: 18 },
  { id: 'intervention_fails', stageMin: 4, archetype: 'sorority', title: "The Intervention That Wasn't", gain: [5, 8], rel: 22 },
  { id: 'art_exhibition', stageMin: 5, archetype: 'artsy', title: 'The Body Exhibition', gain: [4, 7], rel: 20 },
  { id: 'team_weigh_in', stageMin: 3, archetype: 'athlete', title: 'The Weigh-In', gain: [4, 7], rel: 15 },
  { id: 'quiet_opens_up', stageMin: 4, archetype: 'quiet', title: 'She Opens Up', gain: [3, 5], rel: 28 },
  { id: 'overachiever_pivot', stageMin: 4, archetype: 'overachiever', title: 'A Change of Season Plan', gain: [3, 6], rel: 20 },
  { id: 'transfer_settled', stageMin: 5, archetype: 'transfer', title: 'Finally Home', gain: [4, 8], rel: 22 },
  { id: 'custom_clothing', stageMin: 6, archetype: null, title: 'Shopping Trip', gain: [2, 5], rel: 16 },
  { id: 'immobility_peace', stageMin: 8, archetype: null, title: 'Comfortable', gain: [5, 12], rel: 22 },
  { id: 'blob_ending', stageMin: 10, archetype: null, title: 'Final Form', gain: [0, 0], rel: 35 },
];
