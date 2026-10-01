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
    position: { x: 550, y: 380 },
    data: {
      title: report.targetEntity,
      tagline: report.tagline,
      verdictScore: report.verdictScore,
      modelUsed: report.nebiusModelUsed,
      citationsCount: report.citations.length,
      report,
    },
  });

  // 2. Competitors (Top Row - Widened Spacing)
  const compStartY = -20;
  const compStartX = 120;
  const compSpacingX = 420;

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
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '5,5' },
    });
  });

  // 3. Tech Stack Architecture (Bottom Row - Widened Spacing to prevent overlap)
  const techStartY = 760;
  const techStartX = -50;
  const techSpacingX = 380;

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

  // 4. Moats & Defensibility Pillars (Left Column - 4 pillars matching the Rubric)
  const moatStartX = -280;
  const moatStartY = 160;
  const moatSpacingY = 190;

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

  // 5. Market Whitespace Opportunities (Right Column)
  const wsStartX = 1380;
  const wsStartY = 200;
  const wsSpacingY = 210;

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
