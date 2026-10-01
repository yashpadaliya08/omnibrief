'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Scale, Zap, ShieldAlert, ArrowLeftRight } from 'lucide-react';

interface SharedClashNodeProps {
  data: {
    title: string;
    category: string; // 'Shared Dependency' | 'Contested Customer Segment' | 'Contested Pricing Wedge'
    intensity: 'High' | 'Critical' | 'Moderate';
    advantageA: string;
    advantageB: string;
    winner: 'A' | 'B' | 'Contested';
    entityA: string;
    entityB: string;
  };
}

export const SharedClashNode = React.memo(function SharedClashNode({ data }: SharedClashNodeProps) {
  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'Critical':
        return 'text-rose-300 bg-rose-950/70 border-rose-500/50';
      case 'High':
        return 'text-amber-300 bg-amber-950/70 border-amber-500/50';
      default:
        return 'text-cyan-300 bg-cyan-950/70 border-cyan-500/50';
    }
  };

  return (
    <div className="relative group min-w-[300px] max-w-[340px] rounded-2xl bg-zinc-950/95 border-2 border-purple-500/50 p-4 shadow-2xl shadow-purple-950/30 backdrop-blur-xl transition-all duration-300 hover:border-purple-400 hover:scale-[1.02]">
      {/* Handles to connect Left Entity Root and Right Entity Root */}
      <Handle type="target" position={Position.Left} id="left-in" className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Right} id="right-out" className="!w-3 !h-3 !bg-rose-400 !border-2 !border-zinc-950" />
      <Handle type="target" position={Position.Right} id="right-in" className="!w-3 !h-3 !bg-rose-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Left} id="left-out" className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
          <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
          <span>{data.category}</span>
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase border ${getIntensityBadge(data.intensity)}`}>
          {data.intensity} Clash
        </span>
      </div>

      <h4 className="text-sm font-black text-white mb-2 group-hover:text-purple-200 transition-colors">
        {data.title}
      </h4>

      {/* Side by Side Comparison Pill */}
      <div className="space-y-1.5 pt-1 text-xs">
        <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30">
          <div className="text-[10px] font-mono font-bold text-indigo-400 flex items-center justify-between">
            <span>{data.entityA} Wedge:</span>
            {data.winner === 'A' && <span className="text-emerald-400 font-bold">👑 Advantaged</span>}
          </div>
          <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">{data.advantageA}</p>
        </div>

        <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30">
          <div className="text-[10px] font-mono font-bold text-rose-400 flex items-center justify-between">
            <span>{data.entityB} Wedge:</span>
            {data.winner === 'B' && <span className="text-emerald-400 font-bold">👑 Advantaged</span>}
          </div>
          <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">{data.advantageB}</p>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1">
          <Scale className="w-3 h-3 text-purple-400" />
          <span>Battleground Grounding</span>
        </span>
        <span className="text-purple-300 font-bold">
          {data.winner === 'Contested' ? 'Contested Lock' : `Advantage: ${data.winner === 'A' ? data.entityA : data.entityB}`}
        </span>
      </div>
    </div>
  );
});
