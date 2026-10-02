'use client';

import React, { useState, useMemo } from 'react';
import {
  Swords,
  Zap,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';

interface WarGameControllerProps {
  report: IntelligenceReport;
  onApplyScenario: (scenario: WarGameScenario) => void;
  onResetScenario: () => void;
  nebiusApiKey?: string;
  tavilyApiKey?: string;
  modelName?: string;
  isDrawerOpen?: boolean;
}

// Build entity-aware dynamic presets from the actual report
function buildPresets(report: IntelligenceReport) {
  const entity = report.targetEntity;
  const firstComp = report.competitors[0]?.name || 'Competitor';
  const lower = entity.toLowerCase();

  const isFintech = /stripe|payment|plaid|fintech|banking/i.test(lower);
  const isDatabase = /supabase|firebase|postgres|neon|database/i.test(lower);
  const isAI = /openai|anthropic|llm|ai|agent|nebius|cursor/i.test(lower);
  const isDevTool = /linear|jira|plane|notion|cursor|code|ide|asana|monday/i.test(lower);

  if (isFintech) return [
    { title: 'Stablecoin Rail Disruption', prompt: `What if a stablecoin payment network bypasses ${firstComp} card rails with sub-1% fees?`, icon: '💸', badge: 'Rail Disruption' },
    { title: 'Open Banking Mandate', prompt: `What if EU Open Finance regulation mandates ${entity} share all transaction data via open APIs?`, icon: '🏛️', badge: 'Regulatory Shock' },
    { title: 'Nebius Sovereign Vault', prompt: `What if ${entity} deploys a sovereign HSM-backed token vault on Nebius, eliminating PCI-DSS third-party dependency?`, icon: '🔐', badge: 'Sovereignty Win' },
  ];

  if (isDatabase) return [
    { title: 'Edge CRDT Replication', prompt: `What if ${entity} ships multi-region active-active CRDT replication on Nebius, eliminating cross-continental latency?`, icon: '⚡', badge: 'Architecture Win' },
    { title: 'Firebase Price War', prompt: `What if Google drops Firebase prices by 60% and bundles it with Google Workspace at zero marginal cost?`, icon: '💸', badge: 'Margin Pressure' },
    { title: 'Sovereign Air-Gapped Tier', prompt: `What if ${entity} releases a 100% air-gapped sovereign on-premise edition for government and defense?`, icon: '🔒', badge: 'Sovereignty Wedge' },
  ];

  if (isAI) return [
    { title: 'OpenAI Data Lockdown', prompt: `What if OpenAI restricts third-party API data retention terms and hikes inference pricing by 3×?`, icon: '🔒', badge: 'Sovereignty Pivot' },
    { title: 'Nebius Open-Weight Wedge', prompt: `What if ${entity} deploys NVIDIA Nemotron open-weight models on Nebius with strict zero-retention SLAs?`, icon: '🚀', badge: 'Open Stack Win' },
    { title: 'New Foundation Model Entrant', prompt: `What if a new open-weight model from Meta/Mistral surpasses GPT-4 on benchmarks and is 10× cheaper?`, icon: '🌊', badge: 'Capability Shock' },
  ];

  if (isDevTool) return [
    { title: `${firstComp} Price War`, prompt: `What if ${firstComp} cuts their enterprise pricing by 50% and offers a free community tier?`, icon: '💸', badge: 'Margin Pressure' },
    { title: 'Nebius Open-Source Wedge', prompt: `What if ${entity} ships a free open-source self-hosted edition on Nebius Token Factory GPU?`, icon: '🚀', badge: 'Disruptive Wedge' },
    { title: 'AI Agent Takeover', prompt: `What if autonomous AI agents replace manual workflows, making traditional ${entity}-style tools obsolete?`, icon: '🤖', badge: 'Category Disruption' },
  ];

  return [
    { title: 'Price War Shockwave', prompt: `What if ${firstComp} slashes pricing by 50% to capture ${entity}'s market share?`, icon: '💸', badge: 'Margin Pressure' },
    { title: 'Nebius Sovereign Wedge', prompt: `What if ${entity} offers a 100% sovereign open-source tier on Nebius Token Factory?`, icon: '🚀', badge: 'Open Stack Win' },
    { title: 'AI Disruption Wave', prompt: `What if AI agents automate 80% of ${entity}'s core workflow, commoditizing the category?`, icon: '🤖', badge: 'Category Risk' },
  ];
}

export const WarGameController = React.memo(function WarGameController({
  report,
  onApplyScenario,
  onResetScenario,
  nebiusApiKey,
  tavilyApiKey,
  modelName,
  isDrawerOpen = false,
}: WarGameControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastGrounded, setLastGrounded] = useState(false);
  const active = report.activeWarGame;

  const presets = useMemo(() => buildPresets(report), [report.targetEntity]);

  React.useEffect(() => {
    if (isDrawerOpen) setIsOpen(false);
  }, [isDrawerOpen]);

  const handleSimulate = async (scenarioQuery: string) => {
    if (!scenarioQuery.trim() || loading) return;
    setLoading(true);
    setLastGrounded(false);
    try {
      const res = await fetch('/api/wargame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report, scenarioQuery, nebiusApiKey, tavilyApiKey, modelName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.warGame) {
          onApplyScenario(data.warGame);
          setLastGrounded(Boolean(data.groundedWithTavily));
        }
      }
    } catch (err) {
      console.error('Failed to run War-Game simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-export-ignore="true"
      className={`absolute bottom-4 z-20 w-[94%] sm:w-auto sm:min-w-[480px] max-w-xl pointer-events-auto transition-all duration-300 ${
        isDrawerOpen ? 'left-1/2 -translate-x-1/2 md:left-[calc(50%-180px)]' : 'left-1/2 -translate-x-1/2'
      }`}
    >
      <div className="rounded-2xl border border-zinc-700/80 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
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
                <span className="text-xs font-black tracking-wide uppercase text-white font-mono">War-Game Simulator</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hidden sm:inline">
                  Counterfactual Engine
                </span>
                {active && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    active.compositeDelta >= 0
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                  }`}>
                    {active.compositeDelta >= 0 ? `+${active.compositeDelta}` : active.compositeDelta} pts
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-1">
                {active ? active.title : `Stress-test ${report.targetEntity}'s moat under hypothetical shockwaves`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {active && (
              <button
                onClick={onResetScenario}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-4 space-y-3.5 max-h-[420px] overflow-y-auto">
            {active ? (
              <div className="space-y-2.5 p-3 rounded-xl border border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-zinc-900 to-zinc-950">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white line-clamp-1">{active.title}</span>
                    {lastGrounded && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        <Globe className="w-2.5 h-2.5" /> Live Grounded
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold">
                    <span className="text-zinc-400 line-through">{report.verdictScore}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span className={active.compositeDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {active.newCompositeScore}/100
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      active.compositeDelta >= 0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}>
                      {active.compositeDelta >= 0 ? `+${active.compositeDelta}` : active.compositeDelta} pts
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-300 leading-relaxed">{active.casualtyReport}</p>

                <div className="pt-2 border-t border-zinc-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Counter-Tactics for {report.targetEntity}:
                  </span>
                  <ul className="text-[11px] text-zinc-300 space-y-1.5">
                    {active.recommendedTactics.map((tactic, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 shrink-0 mt-0.5">▸</span>
                        <span>{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-zinc-400 flex items-center gap-2 px-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Select a strategic counterfactual to stress-test <strong className="text-white">{report.targetEntity}</strong>&apos;s moat durability:</span>
              </div>
            )}

            {/* Entity-aware Dynamic Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => handleSimulate(preset.prompt)}
                  disabled={loading}
                  title={preset.prompt}
                  className="flex flex-col items-start p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-base">{preset.icon}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {preset.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-200 group-hover:text-white leading-tight">
                    {preset.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={`Custom: 'What if ${report.targetEntity} faces...'`}
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSimulate(customPrompt); } }}
              />
              <button
                onClick={() => handleSimulate(customPrompt)}
                disabled={loading || !customPrompt.trim()}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-lg shadow-rose-950/40"
              >
                {loading ? <span className="animate-spin text-xs">⚡</span> : <><span>Simulate</span><Zap className="w-3.5 h-3.5" /></>}
              </button>
            </div>

            <p className="text-[10px] text-zinc-500 flex items-center gap-1 px-1">
              <Globe className="w-3 h-3 text-emerald-500 shrink-0" />
              Scenarios grounded with live Tavily AI Search + NVIDIA Nemotron reasoning on Nebius.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
