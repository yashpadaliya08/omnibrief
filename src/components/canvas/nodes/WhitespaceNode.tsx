'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Lightbulb, Users, Target } from 'lucide-react';
import { WhitespaceOpportunity } from '@/types/omnibrief';

interface WhitespaceNodeProps {
  data: WhitespaceOpportunity;
}

export const WhitespaceNode = React.memo(function WhitespaceNode({ data }: WhitespaceNodeProps) {
  return (
    <div className="relative group min-w-[270px] max-w-[310px] rounded-xl bg-zinc-950/90 border border-emerald-500/40 p-4 shadow-xl shadow-emerald-950/20 backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:scale-[1.02]">
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Top} className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-zinc-950" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
          White-Space
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          {data.estimatedImpact} Impact
        </span>
      </div>

      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">
        {data.opportunity}
      </h4>

      <div className="space-y-1.5 text-xs mb-2">
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <Users className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="line-clamp-1">{data.addressableAudience}</span>
        </div>
        <div className="flex items-start gap-1.5 text-[11px] text-zinc-300">
          <Target className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{data.strategicAngle}</span>
        </div>
      </div>
    </div>
  );
});
