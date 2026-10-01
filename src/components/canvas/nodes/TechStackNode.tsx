'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Layers, ArrowRight, Star } from 'lucide-react';
import { TechStackItem } from '@/types/omnibrief';

interface TechStackNodeProps {
  data: TechStackItem;
}

export function TechStackNode({ data }: TechStackNodeProps) {
  return (
    <div className="relative group min-w-[280px] max-w-[320px] rounded-xl bg-zinc-950/90 border border-cyan-500/40 p-4 shadow-xl shadow-cyan-950/20 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02]">
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-cyan-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Left} className="!w-2.5 !h-2.5 !bg-cyan-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-cyan-400 !border-2 !border-zinc-950" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          {data.component}
        </span>
        <div className="flex items-center gap-0.5 text-amber-400 text-xs">
          <Star className="w-3 h-3 fill-amber-400" />
          <span className="font-mono text-[10px] text-zinc-300">{data.scalabilityRating}/5</span>
        </div>
      </div>

      {/* Comparison Stack */}
      <div className="space-y-2 mb-2 text-xs">
        <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase font-mono">Current / Proprietary:</div>
          <div className="text-zinc-300 font-medium line-clamp-1">{data.competitorChoice}</div>
        </div>

        <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30">
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 uppercase font-mono font-bold">
            <ArrowRight className="w-3 h-3" />
            Recommended Open Stack:
          </div>
          <div className="text-cyan-200 font-medium line-clamp-1">{data.recommendedOpenStack}</div>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
        {data.whyItMatters}
      </p>
    </div>
  );
}
