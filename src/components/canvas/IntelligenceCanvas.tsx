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
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';
import { buildGraphFromReport } from '@/lib/graphMapper';
import { Compass, Maximize2, Minimize2, RotateCcw, Swords, Camera, Check, Loader2, AlertCircle } from 'lucide-react';
import { toPng } from 'html-to-image';

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
  tavilyApiKey?: string;
  modelName?: string;
}

export const IntelligenceCanvas = React.memo(function IntelligenceCanvas({
  report,
  onRefresh,
  onApplyWarGame,
  onResetWarGame,
  nebiusApiKey,
  tavilyApiKey,
  modelName,
}: IntelligenceCanvasProps) {
  const initialGraph = useMemo(() => buildGraphFromReport(report), [report]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [battleCardOpen, setBattleCardOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  // Synchronize nodes and edges whenever report updates
  useEffect(() => {
    const next = buildGraphFromReport(report);
    setNodes(next.nodes);
    setEdges(next.edges);
    setSelectedNode(null);
    if (flowInstanceRef.current) {
      setTimeout(() => {
        flowInstanceRef.current?.fitView({ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 });
      }, 100);
    }
  }, [report, setNodes, setEdges]);

  // Re-fit canvas smoothly when entering or exiting Focus Mode
  useEffect(() => {
    const timer = setTimeout(() => {
      flowInstanceRef.current?.fitView({ padding: 0.12, minZoom: 0.65, maxZoom: 1.15 });
    }, 150);
    return () => clearTimeout(timer);
  }, [isFocusMode]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    if (flowInstanceRef.current) {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
      const xOffset = isDesktop ? 180 : 0;
      flowInstanceRef.current.setCenter(
        node.position.x + xOffset,
        node.position.y + 30,
        {
          zoom: Math.max(flowInstanceRef.current.getZoom(), 0.78),
          duration: 400,
        }
      );
    }
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

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

  const handleExportPng = useCallback(async () => {
    if (!canvasWrapperRef.current || exportState === 'exporting') return;
    setExportState('exporting');
    try {
      const flowEl = canvasWrapperRef.current.querySelector('.react-flow') as HTMLElement | null;
      if (!flowEl) {
        throw new Error('Canvas element not found');
      }

      const exportOptions = {
        backgroundColor: '#09090b',
        pixelRatio: 2,
        skipFonts: true,
        cacheBust: false,
        filter: (node: HTMLElement) => {
          if (node instanceof HTMLElement) {
            if (
              node.classList.contains('react-flow__controls') ||
              node.classList.contains('react-flow__minimap') ||
              node.classList.contains('react-flow__panel') ||
              node.classList.contains('react-flow__attribution') ||
              node.classList.contains('canvas-export-ignore') ||
              node.getAttribute('data-export-ignore') === 'true'
            ) {
              return false;
            }
          }
          return true;
        },
      };

      let dataUrl: string;
      try {
        dataUrl = await toPng(flowEl, exportOptions);
      } catch (firstErr) {
        console.warn('Initial high-res PNG export attempt had an issue, retrying with standard ratio:', firstErr);
        dataUrl = await toPng(flowEl, { ...exportOptions, pixelRatio: 1 });
      }

      const cleanName = (report.targetEntity || 'canvas').toLowerCase().replace(/[^a-z0-9]/g, '_');
      const link = document.createElement('a');
      link.download = `omnibrief_${cleanName}_architecture_canvas.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportState('success');
      setTimeout(() => {
        setExportState('idle');
      }, 2500);
    } catch (err) {
      console.error('Failed to export canvas as PNG:', err);
      setExportState('error');
      setTimeout(() => {
        setExportState('idle');
      }, 3000);
    }
  }, [report.targetEntity, exportState]);

  return (
    <div
      ref={canvasWrapperRef}
      className={
        isFocusMode
          ? 'fixed inset-0 z-50 w-screen h-screen bg-zinc-950 overflow-hidden'
          : 'relative w-full h-[580px] sm:h-[640px] lg:h-[700px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/70 shadow-2xl backdrop-blur-md transition-all duration-300'
      }
    >
      {/* Top Canvas Toolbar Overlay (Unified Flex Bar - Guaranteed No Overlap) */}
      <div
        data-export-ignore="true"
        className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center justify-between gap-2.5 pointer-events-none transition-all duration-300 ${
          selectedNode ? 'right-3 sm:right-[480px]' : 'right-3 sm:right-4'
        }`}
      >
        {/* Left Cluster: Title & Legend */}
        <div className="flex items-center gap-2 pointer-events-auto min-w-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-300 shrink-0">
            <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden xl:inline text-zinc-400">Canvas View:</span>
            <span className="font-semibold text-zinc-200">Spatial Topology</span>
          </div>

          {/* Legend pills (cleanly hidden on narrower screens to prevent crowding) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md text-[11px] shrink-0">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Competitors
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-500" /> Architecture
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Moats
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> White-Space
            </span>
          </div>
        </div>

        {/* Right Cluster: Canvas Controls & Export Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          {report.headToHead && (
            <button
              onClick={() => setBattleCardOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 text-xs font-mono font-bold text-purple-200 transition-all shadow-lg cursor-pointer animate-pulse shrink-0"
              title="Open side-by-side comparative radar battle card"
            >
              <Swords className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span className="hidden sm:inline">🥊 Clash</span>
            </button>
          )}

          {/* 1-Click High-Res Image Export Button */}
          <button
            onClick={handleExportPng}
            disabled={exportState === 'exporting'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shadow-lg cursor-pointer disabled:opacity-60 shrink-0 ${
              exportState === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
                : exportState === 'error'
                ? 'bg-rose-950/90 border-rose-500/80 text-rose-200'
                : 'bg-zinc-900/90 hover:bg-emerald-950/60 border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-300'
            }`}
            title="Save canvas architecture as high-resolution PNG image"
          >
            {exportState === 'exporting' ? (
              <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
            ) : exportState === 'success' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : exportState === 'error' ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span className="hidden sm:inline">
              {exportState === 'exporting'
                ? 'Saving Image...'
                : exportState === 'success'
                ? 'Saved Image!'
                : exportState === 'error'
                ? 'Retry Export'
                : 'Save Image'}
            </span>
          </button>

          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-lg cursor-pointer shrink-0 ${
              isFocusMode
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-600/30'
                : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
            }`}
            title={isFocusMode ? 'Exit Full-Screen Canvas' : 'Maximize Canvas to fit your screen'}
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3 h-3 text-white shrink-0" />
                <span>Exit</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="hidden md:inline">Focus</span>
              </>
            )}
          </button>

          <button
            onClick={handleFitView}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors shadow-lg cursor-pointer shrink-0"
            title="Fit view to show all nodes"
          >
            <Maximize2 className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="hidden md:inline">Fit View</span>
          </button>

          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors shadow-lg cursor-pointer shrink-0"
            title="Reset zoom to 85% scale"
          >
            <RotateCcw className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors shadow-lg cursor-pointer shrink-0"
              title="Re-run analysis to refresh data"
            >
              <RotateCcw className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden md:inline">Refresh</span>
            </button>
          )}
        </div>
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
          className={`!bg-zinc-950/90 !border !border-zinc-800 !rounded-xl shadow-xl hidden md:block transition-all duration-300 ${
            selectedNode ? '!right-[480px]' : ''
          }`}
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
          report={report}
          onApplyScenario={onApplyWarGame}
          onResetScenario={onResetWarGame}
          nebiusApiKey={nebiusApiKey}
          tavilyApiKey={tavilyApiKey}
          modelName={modelName}
          isDrawerOpen={!!selectedNode}
        />
      )}

      {/* Slide-in Inspector Drawer */}
      <NodeInspectorDrawer
        selectedNode={selectedNode}
        report={report}
        onClose={handleCloseDrawer}
        nebiusApiKey={nebiusApiKey}
        modelName={modelName}
      />

      {/* Head-to-Head Clash Battle Card Modal */}
      {report.headToHead && (
        <HeadToHeadBattleCardModal
          battleCard={report.headToHead}
          isOpen={battleCardOpen}
          onClose={() => setBattleCardOpen(false)}
        />
      )}
    </div>
  );
});
