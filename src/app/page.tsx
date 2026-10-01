'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  FileText,
  Search,
  Sparkles,
  Settings,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { IntelligenceCanvas } from '@/components/canvas/IntelligenceCanvas';
import { ExecutiveDossier } from '@/components/dossier/ExecutiveDossier';
import { ApiConfigModal } from '@/components/config/ApiConfigModal';
import { IntelligenceReport } from '@/types/omnibrief';
import { generateSynthesizedReport } from '@/lib/nebius';

const PRESET_QUERIES = [
  { label: 'Linear.app', query: 'Linear.app issue tracking and project management' },
  { label: 'Cursor.sh', query: 'Cursor AI code editor and agentic IDE ecosystem' },
  { label: 'Perplexity AI', query: 'Perplexity AI conversational answer engine' },
  { label: 'Supabase', query: 'Supabase open source Firebase and Postgres platform' },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'dossier' | 'both'>('canvas');
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const [config, setConfig] = useState({
    nebiusApiKey: '',
    tavilyApiKey: '',
    modelName: 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF',
  });

  // Current report initialized with Linear as sample
  const [report, setReport] = useState<IntelligenceReport>(() =>
    generateSynthesizedReport('Linear.app issue tracking and project management', [
      {
        title: 'Linear: The issue tracking tool you will actually enjoy using',
        url: 'https://linear.app',
        content: 'Linear streamlines software projects, sprints, tasks, and bug tracking with high-performance sync engines.',
        score: 0.98,
      },
      {
        title: 'How Linear Built Its Local-First Realtime Architecture',
        url: 'https://linear.app/blog',
        content: 'Technical teardown of Linear synchronization architecture, optimistic local SQLite cache, and GraphQL synchronization.',
        score: 0.91,
      },
    ])
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(3);

  // Load saved credentials from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('omnibrief_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved config:', e);
      }
    }
  }, []);

  const handleSaveConfig = (newConfig: { nebiusApiKey: string; tavilyApiKey: string; modelName: string }) => {
    setConfig(newConfig);
    localStorage.setItem('omnibrief_config', JSON.stringify(newConfig));
  };

  const runAnalysis = async (targetQuery: string) => {
    if (!targetQuery.trim() || loading) return;

    setLoading(true);
    setCurrentStepIndex(1);

    try {
      // Step simulation for visual agent orchestration feedback
      const stepTimer1 = setTimeout(() => setCurrentStepIndex(2), 1400);
      const stepTimer2 = setTimeout(() => setCurrentStepIndex(3), 2800);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: targetQuery,
          nebiusApiKey: config.nebiusApiKey,
          tavilyApiKey: config.tavilyApiKey,
          modelName: config.modelName,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (res.ok) {
        const data = await res.json();
        if (data.report) {
          setReport(data.report);
          setCurrentStepIndex(3);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#6366f1', '#06b6d4', '#10b981'],
          });
        }
      } else {
        console.warn('API error, falling back to local synthesis');
        const fallback = generateSynthesizedReport(targetQuery, [], config.modelName);
        setReport(fallback);
      }
    } catch (err) {
      console.error('Analysis execution failed:', err);
      const fallback = generateSynthesizedReport(targetQuery, [], config.modelName);
      setReport(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runAnalysis(query);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">OmniBrief</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Nebius x NVIDIA
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Autonomous Market & Architecture Due-Diligence Engine</p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-2.5">
            {/* Model & Cloud Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400">Model:</span>
              <span className="text-indigo-300 font-bold">{config.modelName.split('/').pop()}</span>
            </div>

            {/* Config Settings Button */}
            <button
              onClick={() => setConfigModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 transition-all cursor-pointer"
              title="Configure Nebius & Tavily API Keys"
            >
              <Settings className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 space-y-8">
        {/* Search Hero Box */}
        <section className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-6 lg:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Agent Swarm: Tavily Search + Nemotron Reasoning on Nebius</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Competitive & <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Architecture Due Diligence</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Synthesize competitor pricing, architectural bottlenecks, defensibility moats, and open cloud wedges in seconds.
            </p>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Enter any product, competitor, or domain (e.g., Linear, Cursor, Supabase)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                  className="w-full px-5 py-4 pl-12 rounded-2xl bg-zinc-900/90 border-2 border-zinc-800 text-white placeholder:text-zinc-500 text-sm sm:text-base focus:outline-none focus:border-indigo-500 shadow-2xl transition-all"
                />
                <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-zinc-500">Quick Try:</span>
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setQuery(preset.query);
                    runAnalysis(preset.query);
                  }}
                  className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-all cursor-pointer hover:border-zinc-700"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Agent Progress Bar (Active when loading) */}
          {loading && (
            <div className="mt-8 pt-6 border-t border-zinc-800/80 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className={`p-3 rounded-xl border ${currentStepIndex >= 1 ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span>Stage 1: Scout</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Tavily Deep Web Search</p>
                </div>

                <div className={`p-3 rounded-xl border ${currentStepIndex >= 2 ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Stage 2: Reasoning</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Nebius Nemotron 3 Ultra</p>
                </div>

                <div className={`p-3 rounded-xl border ${currentStepIndex >= 3 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Stage 3: Graph</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">XYFlow Topology Compiler</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* View Toggle Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'canvas' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Interactive Visual Canvas</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'dossier' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Executive Dossier Memo</span>
            </button>

            <button
              onClick={() => setActiveTab('both')}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'both' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Split View</span>
            </button>
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span>Entity:</span>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              {report.targetEntity}
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-emerald-400 font-bold">Defensibility: {report.verdictScore}/100</span>
          </div>
        </section>

        {/* Active Content View */}
        <section className="space-y-8">
          {activeTab === 'canvas' && (
            <IntelligenceCanvas report={report} onRefresh={() => runAnalysis(report.query)} />
          )}

          {activeTab === 'dossier' && <ExecutiveDossier report={report} />}

          {activeTab === 'both' && (
            <div className="space-y-8">
              <IntelligenceCanvas report={report} onRefresh={() => runAnalysis(report.query)} />
              <ExecutiveDossier report={report} />
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 px-4 lg:px-8 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">OmniBrief</span>
            <span>—</span>
            <span>Built for the Nebius x NVIDIA Global AI Hackathon</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-indigo-400 font-mono">NVIDIA Nemotron 3 Ultra</span>
            <span className="text-zinc-700">•</span>
            <span className="text-cyan-400 font-mono">Nebius Token Factory</span>
            <span className="text-zinc-700">•</span>
            <span className="text-emerald-400 font-mono">Tavily AI Search</span>
          </div>
        </div>
      </footer>

      {/* API Config Modal */}
      <ApiConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        onSave={handleSaveConfig}
        currentConfig={config}
      />
    </div>
  );
}
