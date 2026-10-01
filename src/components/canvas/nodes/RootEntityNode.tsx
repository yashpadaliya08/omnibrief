'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface RootEntityNodeProps {
  data: {
    title: string;
    tagline: string;
    verdictScore: number;
    modelUsed: string;
    citationsCount: number;
  };
}

export const RootEntityNode = React.memo(function RootEntityNode({ data }: RootEntityNodeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40';
    if (score >= 60) return 'text-amber-400 bg-amber-950/70 border-amber-500/40';
    return 'text-rose-400 bg-rose-950/70 border-rose-500/40';
  };

  return (
    <div className="relative group min-w-[280px] max-w-[340px] rounded-2xl bg-zinc-950/90 border-2 border-indigo-500/60 p-5 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400 hover:shadow-indigo-500/30">
      {/* Handles */}
      <Handle type="source" position={Position.Top} className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Left} className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-zinc-950" />

      {/* Glowing Header Aura */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-20 blur-sm group-hover:opacity-40 transition duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Entity</span>
          </div>

          <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${getScoreColor(data.verdictScore)}`}>
            Moat Index: {data.verdictScore}/100
          </div>
        </div>

        <h3 className="text-xl font-black tracking-tight text-white mb-1 group-hover:text-indigo-200 transition-colors">
          {data.title}
        </h3>

        <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
          {data.tagline}
        </p>

        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="truncate max-w-[120px] font-mono text-[10px]" title={data.modelUsed}>
              {data.modelUsed.split('/').pop()}
            </span>
          </span>

          <span className="flex items-center gap-1 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{data.citationsCount} Citations</span>
          </span>
        </div>
      </div>
    </div>
  );
});
