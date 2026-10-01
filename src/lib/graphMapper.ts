import { Node, Edge } from '@xyflow/react';
import { IntelligenceReport } from '@/types/omnibrief';

export function buildGraphFromReport(report: IntelligenceReport): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const rootId = 'root_node';

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
      verdictScore: report.verdictScore,
      modelUsed: report.nebiusModelUsed,
      citationsCount: report.citations.length,
      report,
    },
  });

  // 2. Competitors (Top Row - 3 cards centered above Root)
  const compStartX = 70;
  const compSpacingX = 390;
  const compStartY = 10;

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
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4,4' },
    });
  });

  // 3. Tech Stack Architecture (Bottom Row - 4 cards with neat gaps)
  const techStartX = -30;
  const techSpacingX = 320;
  const techStartY = 640;

  report.techStackAnalysis.forEach((tech, idx) => {
    const techNodeId = `node_${tech.id}`;
    nodes.push({
      id: techNodeId,
      type: 'techStack',
      position: { x: techStartX + idx * techSpacingX, y: techStartY },
      data: { ...tech, report },
    });

    edges.push({
      id: `edge_${rootId}_${techNodeId}`,
      source: rootId,
      target: techNodeId,
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 },
    });
  });

  // 4. Moats & Defensibility Pillars (Left Column - 4 cards stacked with clean gaps)
  const moatStartX = -260;
  const moatStartY = 120;
  const moatSpacingY = 175;

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
    });
  });

  // 5. Market Whitespace Opportunities (Right Column - 3 cards stacked)
  const wsStartX = 1240;
  const wsStartY = 180;
  const wsSpacingY = 200;

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
    });
  });

  return { nodes, edges };
}
