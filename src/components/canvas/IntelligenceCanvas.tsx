'use client';

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  BackgroundVariant,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RootEntityNode } from './nodes/RootEntityNode';
import { CompetitorNode } from './nodes/CompetitorNode';
import { TechStackNode } from './nodes/TechStackNode';
import { MoatNode } from './nodes/MoatNode';
import { WhitespaceNode } from './nodes/WhitespaceNode';
import { NodeInspectorDrawer } from './NodeInspectorDrawer';
import { IntelligenceReport } from '@/types/omnibrief';
import { buildGraphFromReport } from '@/lib/graphMapper';
import { Compass, Maximize2, RotateCcw } from 'lucide-react';

const STATIC_NODE_TYPES = {
  rootEntity: RootEntityNode,
  competitor: CompetitorNode,
  techStack: TechStackNode,
  moat: MoatNode,
  whitespace: WhitespaceNode,
};

interface IntelligenceCanvasProps {
  report: IntelligenceReport;
  onRefresh?: () => void;
}

export const IntelligenceCanvas = React.memo(function IntelligenceCanvas({ report }: IntelligenceCanvasProps) {
  const initialGraph = useMemo(() => buildGraphFromReport(report), [report]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null);

  // Synchronize nodes and edges whenever report updates
  useEffect(() => {
    const next = buildGraphFromReport(report);
    setNodes(next.nodes);
    setEdges(next.edges);
    setSelectedNode(null);
    if (flowInstanceRef.current) {
      setTimeout(() => {
        flowInstanceRef.current?.fitView({ padding: 0.1, minZoom: 0.65, maxZoom: 1.15 });
      }, 100);
    }
  }, [report, setNodes, setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleFitView = useCallback(() => {
    if (flowInstanceRef.current) {
      flowInstanceRef.current.fitView({ padding: 0.1, duration: 400 });
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    if (flowInstanceRef.current) {
      flowInstanceRef.current.setViewport({ x: 50, y: 50, zoom: 0.85 }, { duration: 400 });
    }
  }, []);

  return (
    <div className="relative w-full h-[760px] lg:h-[840px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/70 shadow-2xl backdrop-blur-md">
      {/* Top Overlay Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-300">
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Canvas View: Spatial Topology</span>
        </div>

        {/* Legend pills */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md text-[11px]">
          <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Competitors
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-500" /> Architecture
          </span>
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Moats / Defensibility
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> White-Space
          </span>
        </div>
      </div>

      {/* Top Right Canvas Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={handleFitView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors shadow-lg cursor-pointer"
          title="Fit view to show all nodes"
        >
          <Maximize2 className="w-3 h-3 text-cyan-400" />
          <span className="hidden sm:inline">Fit View</span>
        </button>

        <button
          onClick={handleResetZoom}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors shadow-lg cursor-pointer"
          title="Reset zoom to 85% scale"
        >
          <RotateCcw className="w-3 h-3 text-indigo-400" />
          <span className="hidden sm:inline">Reset Zoom</span>
        </button>
      </div>

      {/* Main Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={STATIC_NODE_TYPES}
        onNodeClick={onNodeClick}
        onInit={(instance) => {
          flowInstanceRef.current = instance;
          instance.fitView({ padding: 0.1, minZoom: 0.65, maxZoom: 1.15 });
        }}
        fitView
        fitViewOptions={{ padding: 0.1, minZoom: 0.65, maxZoom: 1.15 }}
        minZoom={0.3}
        maxZoom={2.0}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#27272a" />
        <Controls
          className="!bg-zinc-900/95 !border !border-zinc-800 !rounded-xl !p-1 !fill-zinc-400 shadow-xl"
        />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="!bg-zinc-950/90 !border !border-zinc-800 !rounded-xl shadow-xl hidden md:block"
          nodeColor={(n) => {
            if (n.type === 'rootEntity') return '#6366f1';
            if (n.type === 'competitor') return '#f43f5e';
            if (n.type === 'techStack') return '#06b6d4';
            if (n.type === 'moat') return '#f59e0b';
            if (n.type === 'whitespace') return '#10b981';
            return '#71717a';
          }}
        />
      </ReactFlow>

      {/* Slide-in Inspector Drawer */}
      <NodeInspectorDrawer
        selectedNode={selectedNode}
        report={report}
        onClose={handleCloseDrawer}
      />
    </div>
  );
});
