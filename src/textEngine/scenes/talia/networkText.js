// ═══════════════════════════════════════════════════════════════
// SCENE: TALIA NETWORK — events, proposals (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import '../../modules.js';

// ── network.event — skeleton beat ─────────────────────────────
registerPool('network.event', [
  { when: { eventTier: 'positive' }, text: [
    '{net.eventLead}{join:net.eventDetail|prefix: — }.',
    '{net.eventLead}{join:net.eventDetail|prefix:; }.',
  ] },
  { when: { eventTier: 'negative' }, text: [
    '{net.eventLead}{join:net.eventDetail|prefix: — }.',
    'Alert: {net.eventLead}{join:net.eventDetail|prefix: — }.',
  ] },
  { when: { eventTier: 'critical' }, text: [
    'CRITICAL: {net.eventLead}{join:net.eventDetail|prefix: — }.',
  ] },
  { when: {}, text: ['{net.eventLead}.'] },
]);

registerPool('net.eventLead', [
  { when: { eventId: 'efficiency_surge' }, text: [
    'the mesh hits a temporary efficiency surge',
    'caloric throughput spikes across active feeder branches',
  ] },
  { when: { eventId: 'conditioning_breakthrough' }, text: [
    'a conditioning wave lands — compliance ticks up network-wide',
    'connected subjects soften all at once',
  ] },
  { when: { eventId: 'data_insight' }, text: [
    'sensor nodes dump a useful behavior snapshot',
    'telemetry clarifies who is ready for heavier routing',
  ] },
  { when: { eventId: 'synergy_pulse' }, text: [
    'slotted experiments resonate — the graph hums in sync',
    'cross-node synergy stabilizes the whole lattice',
  ] },
  { when: { eventId: 'malfunction' }, text: [
    'a node glitches offline mid-cycle',
    'a feeder branch hiccups and dumps calories wrong',
  ] },
  { when: { eventId: 'cascade_failure' }, text: [
    'one failure propagates — branches drop like dominoes',
    'cascade failure tears through weak links',
  ] },
  { when: { eventId: 'detection_complaint' }, text: [
    'someone files a complaint about "weird tubes" in the dorms',
    'campus chatter flags unnatural feeding patterns',
  ] },
  { when: { eventId: 'detection_investigation' }, text: [
    'facilities schedules an inspection of suspicious hardware',
    'an investigation thread opens on the network',
  ] },
  { when: { eventId: 'backlash' }, text: [
    'a high-influence subject pushes back against the mesh',
    'conditioned compliance frays at the edges',
  ] },
  { when: { eventId: 'overextension' }, text: [
    'the graph overextended — maintenance debt spikes',
    'coverage outran stability and the system wobbles',
  ] },
  { when: { eventId: 'system_rebellion' }, text: [
    'part of the network acts without Talia\'s intent',
    'automation rebels — branches reroute on their own',
  ] },
  { when: {}, text: ['the network registers an anomaly'] },
]);

registerPool('net.eventDetail', [
  { when: { eventId: 'efficiency_surge' }, text: [
    'gains should land heavier this week',
    'Talia barely had to touch a control panel',
  ] },
  { when: { eventId: 'malfunction' }, text: [
    'manual repair or maintenance nodes recommended',
    'stability takes a hit until someone intervenes',
  ] },
  { when: { eventId: 'detection_investigation' }, text: [
    'detection risk climbs',
    'stealth nodes might buy time',
  ] },
  { when: { eventId: 'system_rebellion' }, text: [
    'integration may be costing her more than she admits',
    'the system is hungry for autonomy',
  ] },
  { when: {}, text: ['', ''] },
]);

// ── network.proposal ──────────────────────────────────────────
registerPool('network.proposal', [
  { when: {}, text: [
    'The network proposes: {net.proposalAction}{join:net.proposalTarget|prefix: — }.',
    'Autonomous suggestion from the mesh: {net.proposalAction}{join:net.proposalTarget|prefix: — }.',
  ] },
]);

registerPool('net.proposalAction', [
  { when: { proposalType: 'expand_area' }, text: ['expand coverage', 'push into a new zone'] },
  { when: { proposalType: 'raise_automation' }, text: ['raise automation', 'reduce manual oversight'] },
  { when: { proposalType: 'add_conditioning' }, text: ['deploy a conditioning branch', 'add compliance routing'] },
  { when: { proposalType: 'stealth_retune' }, text: ['retune stealth signatures', 'dampen visible activity'] },
  { when: { proposalType: 'nexus_upgrade' }, text: ['upgrade the central nexus', 'deepen core throughput'] },
  { when: {}, text: ['optimize an existing branch'] },
]);

registerPool('net.proposalTarget', [
  { when: { proposalType: 'expand_area' }, text: [
    (ctx) => `target zone: ${ctx.globals?.areaLabel || 'campus fringe'}`,
    'new coverage would widen influence reach',
  ] },
  { when: {}, text: ['', ''] },
]);

const EVENT_TIERS = {
  efficiency_surge: 'positive',
  conditioning_breakthrough: 'positive',
  data_insight: 'positive',
  synergy_pulse: 'positive',
  malfunction: 'negative',
  cascade_failure: 'negative',
  detection_complaint: 'negative',
  detection_investigation: 'negative',
  backlash: 'negative',
  overextension: 'negative',
  system_rebellion: 'critical',
};

function networkCtx(globals) {
  return createContext({ week: globals.week ?? 1, globals });
}

export function renderNetworkEventLine(eventId, stats, labStage) {
  return render('{network.event}', networkCtx({
    eventId,
    eventTier: EVENT_TIERS[eventId] || 'negative',
    labStage,
    stability: stats?.stability,
    detectionRisk: stats?.detectionRisk,
  }));
}

export function renderProposalLine(proposalType, areaLabel, labStage) {
  return render('{network.proposal}', networkCtx({
    proposalType,
    areaLabel: areaLabel || null,
    labStage,
  }));
}
