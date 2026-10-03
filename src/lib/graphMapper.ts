import { Node, Edge } from '@xyflow/react';
import { IntelligenceReport } from '@/types/omnibrief';

export function buildGraphFromReport(report: IntelligenceReport): { nodes: Node[]; edges: Edge[] } {
  if (report.headToHead) {
    return buildDualRootGraph(report);
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const rootId = 'root_node';
  const warGame = report.activeWarGame;
  const impacts = warGame?.nodeImpacts || {};

  // 1. Root Node (Center)
  const rootX = 460;
  const rootY = 320;

  nodes.push({
    id: rootId,
    type: 'rootEntity',
    position: { x: rootX, y: rootY },
    data: {
      title: report.targetEntity,
      tagline: report.tagline,
      verdictScore: warGame ? warGame.newCompositeScore : report.verdictScore,
      modelUsed: report.nebiusModelUsed,
      citationsCount: report.citations.length,
      warGameDelta: warGame?.compositeDelta,
      warGameTitle: warGame?.title,
      report,
    },
  });

  // Helper to find impact by id or loose matching
  const findImpact = (id: string, fallbackKey: string) => {
    return impacts[id] || impacts[fallbackKey] || impacts[`node_${id}`] || undefined;
  };

  // 2. Competitors (Top Row - dynamically centered above Root)
  const numComps = Math.max(1, report.competitors.length);
  const compSpacingX = 350;
  const compStartX = rootX - ((numComps - 1) * compSpacingX) / 2;
  const compStartY = 10;

  report.competitors.forEach((comp, idx) => {
    const compNodeId = `node_${comp.id}`;
    const compImpact = findImpact(comp.id, `comp_${comp.id}`) || (warGame ? impacts[`comp_${idx + 1}`] : undefined);

    nodes.push({
      id: compNodeId,
      type: 'competitor',
      position: { x: compStartX + idx * compSpacingX, y: compStartY },
      data: {
        ...comp,
        warGameImpact: compImpact,
        report,
      },
    });

    edges.push({
      id: `edge_${rootId}_${compNodeId}`,
      source: rootId,
      target: compNodeId,
      sourceHandle: 'root-top',
      targetHandle: 'comp-target',
      type: 'smoothstep',
      animated: true,
      label: comp.category === 'indirect' ? 'adjacent threat' : 'direct rival',
      labelStyle: { fill: '#f43f5e', fontFamily: 'monospace', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#18080a', fillOpacity: 0.85, rx: 4, ry: 4 },
      labelBgPadding: [4, 6],
      style: {
        stroke: compImpact?.status === 'squeezed' ? '#f43f5e' : compImpact?.status === 'strengthened' ? '#10b981' : '#f43f5e',
        strokeWidth: compImpact ? 3 : 2,
        strokeDasharray: '4,4',
      },
    });
  });

  // 3. Tech Stack Architecture (Bottom Row - dynamically centered below Root)
  const numTech = Math.max(1, report.techStackAnalysis.length);
  const techSpacingX = 310;
  const techStartX = rootX - ((numTech - 1) * techSpacingX) / 2;
  const techStartY = 640;

  report.techStackAnalysis.forEach((tech, idx) => {
    const techNodeId = `node_${tech.id}`;
    const techImpact = findImpact(tech.id, `tech_${tech.id}`) || impacts[`node_tech_${idx + 1}`];

    nodes.push({
      id: techNodeId,
      type: 'techStack',
      position: { x: techStartX + idx * techSpacingX, y: techStartY },
      data: {
        ...tech,
        warGameImpact: techImpact,
        report,
      },
    });

    edges.push({
      id: `edge_${rootId}_${techNodeId}`,
      source: rootId,
      target: techNodeId,
      sourceHandle: 'root-bottom',
      targetHandle: 'tech-target',
      type: 'smoothstep',
      animated: true,
      label: 'powers via',
      labelStyle: { fill: '#06b6d4', fontFamily: 'monospace', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#030f12', fillOpacity: 0.85, rx: 4, ry: 4 },
      labelBgPadding: [4, 6],
      style: {
        stroke: techImpact?.status === 'strengthened' ? '#10b981' : techImpact?.status === 'squeezed' ? '#f43f5e' : '#06b6d4',
        strokeWidth: techImpact ? 3 : 2,
      },
    });
  });

  // 4. Moats & Defensibility Pillars (Left Column - dynamically centered vertically)
  const numMoats = Math.max(1, report.threatMoatMatrix.length);
  const moatSpacingY = 170;
  const moatStartY = (rootY + 50) - ((numMoats - 1) * moatSpacingY) / 2;
  // Ensure left column doesn't collide with wide top/bottom rows
  const minSpreadLeft = Math.min(-260, compStartX - 330, techStartX - 330);
  const moatStartX = Math.min(-260, minSpreadLeft);

  report.threatMoatMatrix.forEach((moat, idx) => {
    const moatNodeId = `node_${moat.id}`;
    const moatImpact = findImpact(moat.id, `moat_${moat.id}`) || impacts[`node_moat_${idx + 1}`];

    nodes.push({
      id: moatNodeId,
      type: 'moat',
      position: { x: moatStartX, y: moatStartY + idx * moatSpacingY },
      data: {
        ...moat,
        warGameImpact: moatImpact,
        report,
      },
    });

    edges.push({
      id: `edge_${rootId}_${moatNodeId}`,
      source: rootId,
      target: moatNodeId,
      sourceHandle: 'root-left',
      targetHandle: 'moat-target',
      type: 'smoothstep',
      animated: true,
      label: 'fortifies',
      labelStyle: { fill: '#f59e0b', fontFamily: 'monospace', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#100a00', fillOpacity: 0.85, rx: 4, ry: 4 },
      labelBgPadding: [4, 6],
      style: {
        stroke: moatImpact?.status === 'strengthened' ? '#10b981' : moatImpact?.status === 'disrupted' ? '#f59e0b' : '#f59e0b',
        strokeWidth: moatImpact ? 3 : 2,
      },
    });
  });

  // 5. Market Whitespace Opportunities (Right Column - dynamically centered vertically)
  const numWs = Math.max(1, report.marketWhitespace.length);
  const wsSpacingY = 190;
  const wsStartY = (rootY + 50) - ((numWs - 1) * wsSpacingY) / 2;
  const maxSpreadRight = Math.max(
    1200,
    compStartX + (numComps - 1) * compSpacingX + 330,
    techStartX + (numTech - 1) * techSpacingX + 330
  );
  const wsStartX = Math.max(1200, maxSpreadRight);

  report.marketWhitespace.forEach((ws, idx) => {
    const wsNodeId = `node_${ws.id}`;
    const wsImpact = findImpact(ws.id, `ws_${ws.id}`) || impacts[`node_ws_${idx + 1}`];

    nodes.push({
      id: wsNodeId,
      type: 'whitespace',
      position: { x: wsStartX, y: wsStartY + idx * wsSpacingY },
      data: {
        ...ws,
        warGameImpact: wsImpact,
        report,
      },
    });

    edges.push({
      id: `edge_${rootId}_${wsNodeId}`,
      source: rootId,
      target: wsNodeId,
      sourceHandle: 'root-right',
      targetHandle: 'ws-target',
      type: 'smoothstep',
      animated: true,
      label: 'unlocks',
      labelStyle: { fill: '#10b981', fontFamily: 'monospace', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#001208', fillOpacity: 0.85, rx: 4, ry: 4 },
      labelBgPadding: [4, 6],
      style: {
        stroke: wsImpact?.status === 'strengthened' ? '#10b981' : '#10b981',
        strokeWidth: wsImpact ? 3 : 2,
      },
    });
  });

  return { nodes, edges };
}

function buildDualRootGraph(report: IntelligenceReport): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const clash = report.headToHead!;

  const rootAId = 'root_entity_a';
  const rootBId = 'root_entity_b';

  // 1. Root A (Left, Indigo)
  nodes.push({
    id: rootAId,
    type: 'rootEntity',
    position: { x: 180, y: 320 },
    data: {
      title: clash.entityA,
      tagline: `Challenger A • Modern High-Velocity Stack`,
      verdictScore: report.verdictScore,
      modelUsed: report.nebiusModelUsed,
      citationsCount: report.citations.length,
      report,
    },
  });

  // 2. Root B (Right, Rose - Incumbent Root)
  nodes.push({
    id: rootBId,
    type: 'competitor',
    position: { x: 1040, y: 320 },
    data: {
      id: 'entity_b_root',
      name: clash.entityB,
      category: 'direct',
      marketShare: 'Established Incumbent Leader',
      pricingModel: 'Enterprise Tiered / Seat Bundles',
      pricingEstimate: '$16 - $32 / user / mo',
      strengths: ['Global 2000 procurement penetration', '3,000+ ecosystem plugins & certifications'],
      weaknesses: ['Severe interface latency (>1.2s roundtrips)', 'High administrative bloat & seat tax'],
      lastVerified: 'October 2026',
      status: 'active',
      report,
    },
  });

  // 3. Center Contested Shared Cluster (Connected to both Root A and Root B)
  const sharedItems = [
    {
      id: 'shared_cust',
      title: 'Contested Mid-Market Segment',
      category: 'Contested Customer Segment',
      intensity: 'Critical' as const,
      advantageA: 'High velocity engineering squads voluntarily adopt and advocate.',
      advantageB: 'Central IT and procurement teams mandate suite billing.',
      winner: 'A' as const,
    },
    {
      id: 'shared_infra',
      title: 'Core Infrastructure: PostgreSQL & Realtime Gateway',
      category: 'Shared Infrastructure Dependency',
      intensity: 'Moderate' as const,
      advantageA: 'CRDT local-first sync with sub-50ms optimistic UI rendering.',
      advantageB: 'Decades of multi-tenant enterprise data partitioning & audit logs.',
      winner: 'Contested' as const,
    },
    {
      id: 'shared_price',
      title: 'Seat Tax vs Consumption Value Wedge',
      category: 'Contested Pricing Wedge',
      intensity: 'High' as const,
      advantageA: 'Transparent flat tiers without punishing growing startup teams.',
      advantageB: 'Bundled cross-product enterprise discounts (Atlassian Access).',
      winner: 'A' as const,
    },
  ];

  const sharedStartX = 600;
  const sharedStartY = 130;
  const sharedSpacingY = 220;

  sharedItems.forEach((item, idx) => {
    const sharedNodeId = `node_${item.id}`;
    nodes.push({
      id: sharedNodeId,
      type: 'sharedClash',
      position: { x: sharedStartX, y: sharedStartY + idx * sharedSpacingY },
      data: {
        ...item,
        entityA: clash.entityA,
        entityB: clash.entityB,
      },
    });

    // Dual edges from both roots!
    edges.push({
      id: `edge_${rootAId}_${sharedNodeId}`,
      source: rootAId,
      target: sharedNodeId,
      sourceHandle: 'root-right',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2.5 },
    });

    edges.push({
      id: `edge_${rootBId}_${sharedNodeId}`,
      source: rootBId,
      target: sharedNodeId,
      sourceHandle: 'comp-left',
      targetHandle: 'right-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#f43f5e', strokeWidth: 2.5, strokeDasharray: '4,4' },
    });
  });

  // 4. Outer Left Wing: Entity A Unique Wedges & Moats
  const leftWingStartX = -220;
  const leftWingStartY = 180;
  const leftWingSpacingY = 220;

  report.threatMoatMatrix.slice(0, 3).forEach((moat, idx) => {
    const moatNodeId = `node_left_${moat.id}`;
    nodes.push({
      id: moatNodeId,
      type: 'moat',
      position: { x: leftWingStartX, y: leftWingStartY + idx * leftWingSpacingY },
      data: { ...moat, report },
    });

    edges.push({
      id: `edge_${rootAId}_${moatNodeId}`,
      source: rootAId,
      target: moatNodeId,
      sourceHandle: 'root-left',
      targetHandle: 'moat-target',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 2 },
    });
  });

  // 5. Outer Right Wing: Entity B Incumbent Architecture & Moats
  const rightWingStartX = 1440;
  const rightWingStartY = 180;
  const rightWingSpacingY = 220;

  report.techStackAnalysis.slice(0, 3).forEach((tech, idx) => {
    const techNodeId = `node_right_${tech.id}`;
    nodes.push({
      id: techNodeId,
      type: 'techStack',
      position: { x: rightWingStartX, y: rightWingStartY + idx * rightWingSpacingY },
      data: { ...tech, report },
    });

    edges.push({
      id: `edge_${rootBId}_${techNodeId}`,
      source: rootBId,
      target: techNodeId,
      sourceHandle: 'comp-right',
      targetHandle: 'tech-left',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 },
    });
  });

  return { nodes, edges };
}
