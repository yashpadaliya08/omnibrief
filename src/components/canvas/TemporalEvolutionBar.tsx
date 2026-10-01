'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { EvolutionYear, TEMPORAL_SNAPSHOTS } from '@/lib/temporalEngine';

interface TemporalEvolutionBarProps {
  currentYear: EvolutionYear;
  onYearChange: (year: EvolutionYear) => void;
}

const YEARS: EvolutionYear[] = [2023, 2024, 2025, 2026];

export const TemporalEvolutionBar = React.memo(function TemporalEvolutionBar({
  currentYear,
  onYearChange,
}: TemporalEvolutionBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const snapshot = TEMPORAL_SNAPSHOTS[currentYear];

  // Auto-play animation cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onYearChange(
          currentYear === 2026 ? 2023 : ((currentYear + 1) as EvolutionYear)
        );
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, onYearChange]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 p-2 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl backdrop-blur-xl text-xs pointer-events-auto">
      {/* Label & Play Toggle */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold">Timeline:</span>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
          title={isPlaying ? 'Pause timeline playback' : 'Auto-play historical evolution'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-zinc-300 text-zinc-300" />
              <span>Play</span>
            </>
          )}
        </button>
      </div>

      {/* Year Selection Buttons */}
      <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
        {YEARS.map((year) => {
          const isActive = currentYear === year;
          return (
            <button
              key={year}
              onClick={() => {
                setIsPlaying(false);
                onYearChange(year);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? year === 2026
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40'
                    : 'bg-zinc-800 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {year === 2026 ? '2026 (Active)' : year}
            </button>
          );
        })}
      </div>

      {/* Year Narrative Pill */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-[11px] text-zinc-300">
        <span className="font-mono font-bold text-amber-300">{snapshot.title}:</span>
        <span className="truncate max-w-[260px] text-zinc-400" title={snapshot.narrative}>
          {snapshot.narrative}
        </span>
        <span className="text-zinc-600">•</span>
        <span className="font-mono font-bold text-emerald-400 shrink-0">
          Moat: {snapshot.verdictScore}/100
        </span>
      </div>
    </div>
  );
});
