'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { ThreatMoatItem } from '@/types/omnibrief';

interface MoatNodeProps {
  data: ThreatMoatItem;
}

export const MoatNode = React.memo(function MoatNode({ data }: MoatNodeProps) {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  return (
    <div className="relative group min-w-[270px] max-w-[300px] rounded-xl bg-zinc-950/90 border border-amber-500/40 p-4 shadow-xl shadow-amber-950/20 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:scale-[1.02]">
      <Handle type="target" position={Position.Right} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Top} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          Moat / Risk
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase border ${getRiskStyles(data.riskLevel)}`}>
          {data.riskLevel} Risk
        </span>
      </div>

      <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-200 transition-colors">
        {data.factor}
      </h4>

      {/* Defensibility Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
          <span>Defensibility Index</span>
          <span className="text-amber-400 font-bold">{data.defensibilityScore}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${data.defensibilityScore}%` }}
          />
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 line-clamp-2 mb-2">
        {data.details}
      </p>

      <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-emerald-400 flex items-start gap-1">
        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
        <span className="line-clamp-1 italic text-zinc-300">Wedge: {data.mitigation}</span>
      </div>
    </div>
  );
});
