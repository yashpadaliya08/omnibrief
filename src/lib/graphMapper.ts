import { Node, Edge } from '@xyflow/react';
import { IntelligenceReport } from '@/types/omnibrief';

export function buildGraphFromReport(report: IntelligenceReport): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const rootId = 'root_node';

  // 1. Root Node (Center)
  nodes.push({
    id: rootId,
    type: 'rootEntity',
    position: { x: 500, y: 350 },
    data: {
      title: report.targetEntity,
      tagline: report.tagline,
      verdictScore: report.verdictScore,
      modelUsed: report.nebiusModelUsed,
      citationsCount: report.citations.length,
      report,
    },
  });

  // 2. Competitors (Top-Left & Top-Right)
  // Spread above the root node
  const compStartY = 40;
  const compStartX = 100;
  const compSpacingX = 380;

  report.competitors.forEach((comp, idx) => {
    const compNodeId = `node_${comp.id}`;
    nodes.push({
      id: compNodeId,
      type: 'competitor',
      position: { x: compStartX + idx * compSpacingX, y: compStartY },
      data: { ...comp, report },
    });

    edges.push({
      id: `edge_${rootId}_${compNodeId}`,
      source: rootId,
      target: compNodeId,
      animated: true,
      style: { stroke: '#f43f5e', strokeWidth: 2 },
      label: 'Competitor',
      labelStyle: { fill: '#fda4af', fontSize: 11, fontWeight: 600 },
      labelBgStyle: { fill: '#881337', fillOpacity: 0.8 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4,
    });
  });

  // 3. Tech Stack Architecture (Bottom-Left)
  const techStartY = 640;
  const techStartX = 60;
  const techSpacingX = 300;

  report.techStackAnalysis.forEach((tech, idx) => {
    const techNodeId = `node_${tech.id}`;
    nodes.push({
      id: techNodeId,
      type: 'techStack',
      position: { x: techStartX + idx * techSpacingX, y: techStartY + (idx % 2 === 0 ? 0 : 40) },
      data: { ...tech, report },
    });

    edges.push({
      id: `edge_${rootId}_${techNodeId}`,
      source: rootId,
      target: techNodeId,
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 },
      label: 'Architecture',
      labelStyle: { fill: '#67e8f9', fontSize: 11, fontWeight: 600 },
      labelBgStyle: { fill: '#164e63', fillOpacity: 0.8 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4,
    });
  });

  // 4. Moats & Threats (Far Left)
  const moatStartX = -220;
  const moatStartY = 200;
  const moatSpacingY = 180;

  report.threatMoatMatrix.forEach((moat, idx) => {
    const moatNodeId = `node_${moat.id}`;
    nodes.push({
      id: moatNodeId,
      type: 'moat',
      position: { x: moatStartX, y: moatStartY + idx * moatSpacingY },
      data: { ...moat, report },
    });

    edges.push({
      id: `edge_${rootId}_${moatNodeId}`,
      source: rootId,
      target: moatNodeId,
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      label: 'Moat Factor',
      labelStyle: { fill: '#fcd34d', fontSize: 11, fontWeight: 600 },
      labelBgStyle: { fill: '#78350f', fillOpacity: 0.8 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4,
    });
  });

  // 5. Market Whitespace Opportunities (Far Right)
  const wsStartX = 1150;
  const wsStartY = 220;
  const wsSpacingY = 190;

  report.marketWhitespace.forEach((ws, idx) => {
    const wsNodeId = `node_${ws.id}`;
    nodes.push({
      id: wsNodeId,
      type: 'whitespace',
      position: { x: wsStartX, y: wsStartY + idx * wsSpacingY },
      data: { ...ws, report },
    });

    edges.push({
      id: `edge_${rootId}_${wsNodeId}`,
      source: rootId,
      target: wsNodeId,
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      label: 'White-Space Opportunity',
      labelStyle: { fill: '#6ee7b7', fontSize: 11, fontWeight: 600 },
      labelBgStyle: { fill: '#064e3b', fillOpacity: 0.8 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4,
    });
  });

  return { nodes, edges };
}
