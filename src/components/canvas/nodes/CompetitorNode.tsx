'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Swords, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { CompetitorData } from '@/types/omnibrief';

interface CompetitorNodeProps {
  data: CompetitorData;
}

export function CompetitorNode({ data }: CompetitorNodeProps) {
  const isDirect = data.category === 'direct';

  return (
    <div className="relative group min-w-[270px] max-w-[310px] rounded-xl bg-zinc-950/90 border border-rose-500/40 p-4 shadow-xl shadow-rose-950/20 backdrop-blur-md transition-all duration-300 hover:border-rose-400 hover:scale-[1.02]">
      <Handle type="target" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-rose-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Left} className="!w-2.5 !h-2.5 !bg-rose-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-rose-400 !border-2 !border-zinc-950" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
          <Swords className="w-3.5 h-3.5 text-rose-400" />
          {isDirect ? 'Direct Competitor' : 'Adjacent Rival'}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
          {data.marketShare}
        </span>
      </div>

      <h4 className="text-base font-bold text-white mb-1 group-hover:text-rose-200 transition-colors">
        {data.name}
      </h4>

      <div className="flex items-center gap-1 text-xs text-zinc-400 mb-3 font-mono">
        <DollarSign className="w-3.5 h-3.5 text-amber-400" />
        <span>{data.pricingEstimate || data.pricingModel}</span>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-[11px]">
        {data.strengths[0] && (
          <div className="flex items-start gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{data.strengths[0]}</span>
          </div>
        )}
        {data.weaknesses[0] && (
          <div className="flex items-start gap-1.5 text-zinc-400">
            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{data.weaknesses[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
