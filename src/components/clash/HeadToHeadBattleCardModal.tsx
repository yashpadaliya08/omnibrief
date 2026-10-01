'use client';

import React from 'react';
import {
  Swords,
  Trophy,
  Zap,
  ShieldCheck,
  CheckCircle2,
  X,
  Scale,
  Sparkles,
  ArrowRight,
  Gauge,
  DollarSign,
  Heart,
  Boxes,
} from 'lucide-react';
import { HeadToHeadBattleCard } from '@/types/omnibrief';

interface HeadToHeadBattleCardModalProps {
  battleCard: HeadToHeadBattleCard;
  isOpen: boolean;
  onClose: () => void;
}

export const HeadToHeadBattleCardModal = React.memo(function HeadToHeadBattleCardModal({
  battleCard,
  isOpen,
  onClose,
}: HeadToHeadBattleCardModalProps) {
  if (!isOpen) return null;

  const totalScoreA = Math.round(
    battleCard.dimensions.reduce((acc, d) => acc + d.scoreA, 0) / battleCard.dimensions.length
  );
  const totalScoreB = Math.round(
    battleCard.dimensions.reduce((acc, d) => acc + d.scoreB, 0) / battleCard.dimensions.length
  );

  const getDimensionIcon = (dimension: string) => {
    const lower = dimension.toLowerCase();
    if (lower.includes('latency') || lower.includes('speed')) return <Gauge className="w-4 h-4 text-cyan-400" />;
    if (lower.includes('compliance') || lower.includes('enterprise')) return <ShieldCheck className="w-4 h-4 text-amber-400" />;
    if (lower.includes('pricing') || lower.includes('cost')) return <DollarSign className="w-4 h-4 text-emerald-400" />;
    if (lower.includes('love') || lower.includes('developer')) return <Heart className="w-4 h-4 text-rose-400" />;
    return <Boxes className="w-4 h-4 text-purple-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-600 text-white shadow-lg shadow-purple-900/30">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-tight">
                  Head-to-Head Clash Battle Card
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Dual-Root Analysis
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Comparative defensibility, latency, and compliance audit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoreboard Hero Banner */}
        <div className="p-6 border-b border-zinc-800/80 bg-zinc-950/60 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center">
          {/* Entity A */}
          <div className="p-4 rounded-2xl border border-indigo-500/40 bg-indigo-950/20 space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              Challenger A
            </span>
            <h4 className="text-xl font-black text-white">{battleCard.entityA}</h4>
            <div className="text-2xl font-black text-indigo-400 font-mono">{totalScoreA}/100</div>
          </div>

          {/* VS Center Badge */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 text-xs font-mono font-black text-zinc-300 shadow-inner">
              VS
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Advantage: <strong className="text-emerald-400 font-bold">{battleCard.overallAdvantage}</strong>
            </div>
          </div>

          {/* Entity B */}
          <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-950/20 space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">
              Challenger B
            </span>
            <h4 className="text-xl font-black text-white">{battleCard.entityB}</h4>
            <div className="text-2xl font-black text-rose-400 font-mono">{totalScoreB}/100</div>
          </div>
        </div>

        {/* Scrollable Dimension Comparisons */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span>Evaluated Dimensions:</span>
            <span>Nebius Nemotron 70B Grounded Scoring</span>
          </div>

          <div className="space-y-3">
            {battleCard.dimensions.map((dim, idx) => {
              const aWins = dim.winner === 'A';
              const bWins = dim.winner === 'B';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-3 hover:border-zinc-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                        {getDimensionIcon(dim.dimension)}
                      </div>
                      <span className="text-sm font-bold text-white">{dim.dimension}</span>
                    </div>

                    {/* Score comparison pill */}
                    <div className="flex items-center gap-2 text-xs font-mono font-bold">
                      <span
                        className={`px-2.5 py-1 rounded-lg border ${
                          aWins
                            ? 'bg-indigo-950 text-indigo-300 border-indigo-500/50'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {battleCard.entityA}: {dim.scoreA}
                      </span>
                      <span className="text-zinc-600">|</span>
                      <span
                        className={`px-2.5 py-1 rounded-lg border ${
                          bWins
                            ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {battleCard.entityB}: {dim.scoreB}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        Winner: {dim.winner === 'Tie' ? 'Draw' : dim.winner === 'A' ? battleCard.entityA : battleCard.entityB}
                      </span>
                    </div>
                  </div>

                  {/* Dual comparative progress bar */}
                  <div className="space-y-1">
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${(dim.scoreA / (dim.scoreA + dim.scoreB)) * 100}%` }}
                        title={`${battleCard.entityA}: ${dim.scoreA}%`}
                      />
                      <div
                        className="h-full bg-rose-500 transition-all duration-500"
                        style={{ width: `${(dim.scoreB / (dim.scoreA + dim.scoreB)) * 100}%` }}
                        title={`${battleCard.entityB}: ${dim.scoreB}%`}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {dim.analysis}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tactical Wedge Callout */}
          <div className="p-4 rounded-2xl border border-purple-500/40 bg-purple-950/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Recommended Tactical Wedge:</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              {battleCard.tacticalWedge}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dual-Root Gravitational Topology Active</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Battle Card
          </button>
        </div>
      </div>
    </div>
  );
});
