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
import { SharedClashNode } from './nodes/SharedClashNode';
import { NodeInspectorDrawer } from './NodeInspectorDrawer';
import { WarGameController } from '@/components/wargame/WarGameController';
import { HeadToHeadBattleCardModal } from '@/components/clash/HeadToHeadBattleCardModal';
import { TemporalEvolutionBar } from './TemporalEvolutionBar';
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';
import { buildGraphFromReport } from '@/lib/graphMapper';
import { applyTemporalEvolution, EvolutionYear } from '@/lib/temporalEngine';
import { Compass, Maximize2, Minimize2, RotateCcw, Swords } from 'lucide-react';

const STATIC_NODE_TYPES = {
  rootEntity: RootEntityNode,
  competitor: CompetitorNode,
  techStack: TechStackNode,
  moat: MoatNode,
  whitespace: WhitespaceNode,
  sharedClash: SharedClashNode,
};

interface IntelligenceCanvasProps {
  report: IntelligenceReport;
  onRefresh?: () => void;
  onApplyWarGame?: (scenario: WarGameScenario) => void;
  onResetWarGame?: () => void;
  nebiusApiKey?: string;
  modelName?: string;
}

export const IntelligenceCanvas = React.memo(function IntelligenceCanvas({
  report,
  onApplyWarGame,
  onResetWarGame,
  nebiusApiKey,
  modelName,
}: IntelligenceCanvasProps) {
  const [evolutionYear, setEvolutionYear] = useState<EvolutionYear>(2026);
  const activeReport = useMemo(() => applyTemporalEvolution(report, evolutionYear), [report, evolutionYear]);

  const initialGraph = useMemo(() => buildGraphFromReport(activeReport), [activeReport]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [battleCardOpen, setBattleCardOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null);

  // Synchronize nodes and edges whenever activeReport updates
  useEffect(() => {
    const next = buildGraphFromReport(activeReport);
    setNodes(next.nodes);
    setEdges(next.edges);
    setSelectedNode(null);
    if (flowInstanceRef.current) {
      setTimeout(() => {
        flowInstanceRef.current?.fitView({ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 });
      }, 100);
    }
  }, [activeReport, setNodes, setEdges]);

  // Re-fit canvas smoothly when entering or exiting Focus Mode
  useEffect(() => {
    const timer = setTimeout(() => {
      flowInstanceRef.current?.fitView({ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 });
    }, 150);
    return () => clearTimeout(timer);
  }, [isFocusMode]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleFitView = useCallback(() => {
    if (flowInstanceRef.current) {
      flowInstanceRef.current.fitView({ padding: 0.12, duration: 400 });
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    if (flowInstanceRef.current) {
      flowInstanceRef.current.setViewport({ x: 50, y: 50, zoom: 0.85 }, { duration: 400 });
    }
  }, []);

  return (
    <div
      className={
        isFocusMode
          ? 'fixed inset-0 z-50 w-screen h-screen bg-zinc-950 overflow-hidden'
          : 'relative w-full h-[580px] sm:h-[640px] lg:h-[700px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/70 shadow-2xl backdrop-blur-md transition-all duration-300'
      }
    >
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

        {/* Temporal Evolution Slider */}
        <TemporalEvolutionBar currentYear={evolutionYear} onYearChange={setEvolutionYear} />
      </div>

      {/* Top Right Canvas Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-auto">
        {report.headToHead && (
          <button
            onClick={() => setBattleCardOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 text-xs font-mono font-bold text-purple-200 transition-all shadow-lg cursor-pointer animate-pulse"
            title="Open side-by-side comparative radar battle card"
          >
            <Swords className="w-3.5 h-3.5 text-purple-300" />
            <span>🥊 Clash Battle Card</span>
          </button>
        )}

        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-lg cursor-pointer ${
            isFocusMode
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-600/30'
              : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
          }`}
          title={isFocusMode ? 'Exit Full-Screen Canvas' : 'Maximize Canvas to fit your screen'}
        >
          {isFocusMode ? (
            <>
              <Minimize2 className="w-3 h-3 text-white" />
              <span>Exit Focus</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3 text-indigo-400" />
              <span className="hidden sm:inline">Focus Canvas</span>
            </>
          )}
        </button>

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
          instance.fitView({ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 });
        }}
        fitView
        fitViewOptions={{ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 }}
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

      {/* Floating Strategic War-Game Controller */}
      {onApplyWarGame && onResetWarGame && (
        <WarGameController
          report={activeReport}
          onApplyScenario={onApplyWarGame}
          onResetScenario={onResetWarGame}
          nebiusApiKey={nebiusApiKey}
          modelName={modelName}
          isDrawerOpen={!!selectedNode}
        />
      )}

      {/* Slide-in Inspector Drawer */}
      <NodeInspectorDrawer
        selectedNode={selectedNode}
        report={activeReport}
        onClose={handleCloseDrawer}
        nebiusApiKey={nebiusApiKey}
        modelName={modelName}
      />

      {/* Head-to-Head Clash Battle Card Modal */}
      {activeReport.headToHead && (
        <HeadToHeadBattleCardModal
          battleCard={activeReport.headToHead}
          isOpen={battleCardOpen}
          onClose={() => setBattleCardOpen(false)}
        />
      )}
    </div>
  );
});
