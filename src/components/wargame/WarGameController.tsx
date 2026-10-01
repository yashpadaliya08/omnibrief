'use client';

import React, { useState } from 'react';
import {
  Swords,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';

interface WarGameControllerProps {
  report: IntelligenceReport;
  onApplyScenario: (scenario: WarGameScenario) => void;
  onResetScenario: () => void;
  nebiusApiKey?: string;
  modelName?: string;
  isDrawerOpen?: boolean;
}

const PRESET_WAR_GAMES = [
  {
    title: 'Price War Shockwave',
    prompt: 'What if Jira cuts their enterprise pricing by 50%?',
    icon: '💸',
    badge: 'Margin Pressure',
  },
  {
    title: 'Nebius Open-Source Wedge',
    prompt: 'What if we offer a 100% free open-source tier deployed on Nebius Token Factory?',
    icon: '🚀',
    badge: 'Disruptive Wedge',
  },
  {
    title: 'Closed LLM Lockdown',
    prompt: 'What if OpenAI restricts third-party API data training terms & hikes inference pricing?',
    icon: '🔒',
    badge: 'Sovereignty Pivot',
  },
];

export const WarGameController = React.memo(function WarGameController({
  report,
  onApplyScenario,
  onResetScenario,
  nebiusApiKey,
  modelName,
  isDrawerOpen = false,
}: WarGameControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const active = report.activeWarGame;

  // Auto-collapse when user opens the node drawer to prevent visual overlap
  React.useEffect(() => {
    if (isDrawerOpen) {
      setIsOpen(false);
    }
  }, [isDrawerOpen]);

  const handleSimulate = async (scenarioQuery: string) => {
    if (!scenarioQuery.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/wargame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report,
          scenarioQuery,
          nebiusApiKey,
          modelName,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.warGame) {
          onApplyScenario(data.warGame);
        }
      }
    } catch (err) {
      console.error('Failed to run War-Game simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-20 w-[95%] max-w-xl pointer-events-auto">
      <div className="rounded-2xl border border-zinc-700/80 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header Bar */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/90 hover:bg-zinc-900 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-md shadow-rose-900/30 shrink-0">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide uppercase text-white font-mono">
                  War-Game Simulator
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hidden sm:inline">
                  Counterfactual Engine
                </span>
                {active && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      active.compositeDelta >= 0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {active.compositeDelta >= 0 ? `+${active.compositeDelta}` : active.compositeDelta} pts
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-1">
                {active ? active.title : 'Stress-test moat durability under hypothetical market shockwaves'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {active && (
              <button
                onClick={onResetScenario}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono transition-colors cursor-pointer"
                title="Reset simulation to base state"
              >
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={isOpen ? 'Collapse War-Game Simulator' : 'Expand War-Game Simulator'}
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-4 space-y-3.5 max-h-[380px] overflow-y-auto">
            {/* Active War Game Shockwave Banner */}
            {active ? (
              <div className="space-y-2.5 p-3 rounded-xl border border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-zinc-900 to-zinc-950">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white line-clamp-1">{active.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold">
                    <span className="text-zinc-400 line-through">{report.verdictScore}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span
                      className={
                        active.compositeDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }
                    >
                      {active.newCompositeScore}/100
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        active.compositeDelta >= 0
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {active.compositeDelta >= 0 ? `+${active.compositeDelta}` : active.compositeDelta} pts
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                  {active.casualtyReport}
                </p>

                {/* Recommended Tactics */}
                <div className="pt-2 border-t border-zinc-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Recommended Counter-Tactics:
                  </span>
                  <ul className="text-[11px] text-zinc-300 space-y-1 list-disc list-inside">
                    {active.recommendedTactics.map((tactic, i) => (
                      <li key={i} className="line-clamp-1">
                        {tactic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-zinc-400 flex items-center gap-2 px-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Select a strategic counterfactual to recalculate the canvas graph in real-time:</span>
              </div>
            )}

            {/* Quick Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_WAR_GAMES.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => handleSimulate(preset.prompt)}
                  disabled={loading}
                  className="flex flex-col items-start p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-base">{preset.icon}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {preset.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-200 group-hover:text-white line-clamp-1">
                    {preset.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Scenario Input Form */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Or custom: 'What if competitor offers 90% discount on Nebius?'..."
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSimulate(customPrompt);
                  }
                }}
              />
              <button
                onClick={() => handleSimulate(customPrompt)}
                disabled={loading || !customPrompt.trim()}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-lg shadow-rose-950/40"
              >
                {loading ? (
                  <span className="animate-spin text-xs">⚡</span>
                ) : (
                  <>
                    <span>Simulate</span>
                    <Zap className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
