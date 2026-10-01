'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { ThreatMoatItem } from '@/types/omnibrief';

interface MoatNodeProps {
  data: ThreatMoatItem;
}

export const MoatNode = React.memo(function MoatNode({ data }: MoatNodeProps) {
  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'Dominant':
        return 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40';
      case 'Strong':
        return 'text-cyan-300 bg-cyan-950/60 border-cyan-500/40';
      default:
        return 'text-amber-300 bg-amber-950/60 border-amber-500/40';
    }
  };

  const getThreatBadge = (threat: string) => {
    switch (threat) {
      case 'Elevated':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    }
  };

  return (
    <div className="relative group min-w-[280px] max-w-[320px] rounded-xl bg-zinc-950/95 border border-amber-500/40 p-4 shadow-xl shadow-amber-950/20 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:scale-[1.02]">
      <Handle type="target" position={Position.Right} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Top} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-amber-400 !border-2 !border-zinc-950" />

      {/* Header with Moat Strength & External Threat */}
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase border ${getStrengthBadge(data.moatStrengthLevel)}`}>
          {data.moatStrengthLevel} Moat
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase border ${getThreatBadge(data.externalThreatLevel)}`}>
          Threat: {data.externalThreatLevel}
        </span>
      </div>

      <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-200 transition-colors">
        {data.factor}
      </h4>

      {/* Defensibility Progress Bar & Point Contribution */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
          <span>Defensibility: <strong className="text-amber-300 font-bold">{data.moatStrengthScore}%</strong></span>
          <span className="text-emerald-400 font-bold">+{data.pointContribution} pts ({data.weightPercentage}%)</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${data.moatStrengthScore}%` }}
          />
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 line-clamp-2 mb-2 leading-relaxed">
        {data.details}
      </p>

      <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-300 flex items-start gap-1">
        <AlertCircle className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
        <span className="line-clamp-1 italic">Wedge: {data.mitigation}</span>
      </div>
    </div>
  );
});
