'use client';

import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Layers,
  Swords,
  Lightbulb,
  ArrowLeftRight,
  MessageSquare,
  FileCheck,
  Link2,
  Dna,
} from 'lucide-react';
import { IntelligenceReport } from '@/types/omnibrief';
import { NodeInterrogator } from './NodeInterrogator';

interface NodeInspectorDrawerProps {
  selectedNode: Node | null;
  report: IntelligenceReport | null;
  onClose: () => void;
  nebiusApiKey?: string;
  modelName?: string;
}

type DrawerTab = 'profile' | 'interrogate' | 'sources';

export function NodeInspectorDrawer({
  selectedNode,
  report,
  onClose,
  nebiusApiKey,
  modelName,
}: NodeInspectorDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>('profile');

  if (!selectedNode || !report) return null;

  const data = selectedNode.data as Record<string, unknown>;
  const nodeType = selectedNode.type;

  const getNodeTitle = () => {
    if (data.title) return String(data.title);
    if (data.name) return String(data.name);
    if (data.factor) return String(data.factor);
    if (data.opportunity) return String(data.opportunity);
    if (data.component) return String(data.component);
    return 'Selected Node';
  };

  return (
    <aside
      aria-label="Node Inspector"
      data-export-ignore="true"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] max-w-full bg-zinc-950/95 border-l border-zinc-800 backdrop-blur-2xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
    >
      {/* Drawer Header */}
      <div className="p-5 pb-3 border-b border-zinc-800/90 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {nodeType === 'rootEntity' && <Sparkles className="w-5 h-5 text-indigo-400" />}
            {nodeType === 'competitor' && <Swords className="w-5 h-5 text-rose-400" />}
            {nodeType === 'techStack' && <Layers className="w-5 h-5 text-cyan-400" />}
            {nodeType === 'moat' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            {nodeType === 'whitespace' && <Lightbulb className="w-5 h-5 text-emerald-400" />}
            {nodeType === 'sharedClash' && <ArrowLeftRight className="w-5 h-5 text-purple-400" />}
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              {nodeType === 'rootEntity' && 'Core Target Dossier'}
              {nodeType === 'competitor' && 'Competitor Profile'}
              {nodeType === 'techStack' && 'Architecture Teardown'}
              {nodeType === 'moat' && 'Threat & Moat Analysis'}
              {nodeType === 'whitespace' && 'Strategic White-Space'}
              {nodeType === 'sharedClash' && 'Contested Battleground'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Inspector"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Node Title & Quick Tag */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white break-words leading-tight" title={getNodeTitle()}>{getNodeTitle()}</h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
            {String(nodeType)}
          </span>
        </div>

        {/* 3 Nav Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('interrogate')}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'interrogate'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'sources'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Sources</span>
            <span className="text-[10px] font-mono px-1 rounded bg-zinc-700/80 text-zinc-300">
              {report.citations.length}
            </span>
          </button>
        </div>
      </div>

      {/* Drawer Body - Scrollable content per tab */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* TAB 1: Profile & Node Content */}
        {activeTab === 'profile' && (
          <>
            {nodeType === 'rootEntity' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{report.targetEntity}</h3>
                  <p className="text-xs text-zinc-400">{report.tagline}</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Moat Viability Index</span>
                    <span className="font-mono font-bold text-emerald-400 text-base">{report.verdictScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Inference Architecture</span>
                    <span className="font-mono text-indigo-300">{report.nebiusModelUsed.split('/').pop()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Verified Citations</span>
                    <span className="text-zinc-200">{report.citations.length} Grounded Sources</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 font-mono">Executive Summary</h4>
                  <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-zinc-300 leading-relaxed">
                    {report.executiveSummary}
                  </div>
                </div>
              </div>
            )}

            {nodeType === 'competitor' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono uppercase font-bold">
                    {String(data.category)} Competitor
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Share: <strong className="text-white">{String(data.marketShare)}</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono uppercase text-[11px]">Pricing Model</span>
                  <span className="font-mono font-bold text-amber-300">{String(data.pricingEstimate || data.pricingModel)}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Key Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {((data.strengths as string[]) || []).map((s, idx) => (
                      <li key={idx} className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Vulnerabilities & Attack Vectors
                  </h4>
                  <ul className="space-y-1.5">
                    {((data.weaknesses as string[]) || []).map((w, idx) => (
                      <li key={idx} className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-rose-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {typeof data.url === 'string' && data.url ? (
                  <div className="pt-2">
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-mono underline"
                    >
                      <span>Visit Competitor Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            )}

            {nodeType === 'techStack' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono uppercase font-bold">
                    Architecture Component
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Scalability: <strong className="text-amber-300">{Number(data.scalabilityRating)}/5</strong>
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Incumbent / Current Approach</span>
                    <p className="text-xs font-medium text-zinc-200">{String(data.competitorChoice)}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                    <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold block mb-1">Recommended Open Architecture</span>
                    <p className="text-xs font-semibold text-cyan-200">{String(data.recommendedOpenStack)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 font-mono">Technical Rationale & Impact</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                    {String(data.whyItMatters)}
                  </p>
                </div>
              </div>
            )}

            {nodeType === 'moat' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono uppercase font-bold">
                    {String(data.moatStrengthLevel || data.riskLevel)} Moat
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Contribution: <strong className="text-emerald-400">+{String(data.pointContribution || 25)} pts</strong>
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Defensibility Score</span>
                    <span className="font-bold text-amber-400">{Number(data.moatStrengthScore || data.defensibilityScore)}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                      style={{ width: `${Number(data.moatStrengthScore || data.defensibilityScore)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 font-mono">Threat Details</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                    {String(data.details)}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 font-mono">Strategic Wedge / Countermeasure</h4>
                  <p className="text-xs text-emerald-200 leading-relaxed bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/20">
                    {String(data.mitigation)}
                  </p>
                </div>
              </div>
            )}

            {nodeType === 'whitespace' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono uppercase font-bold">
                    {String(data.estimatedImpact)} Impact Opportunity
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold block mb-1">Target Addressable Audience</span>
                  <p className="text-xs font-semibold text-zinc-200">{String(data.addressableAudience)}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 font-mono">Execution Wedge</h4>
                  <p className="text-xs text-emerald-100 leading-relaxed bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30">
                    {String(data.strategicAngle)}
                  </p>
                </div>
              </div>
            )}

            {nodeType === 'sharedClash' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono uppercase font-bold">
                    {String(data.category)}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Intensity: {String(data.intensity)}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">{String(data.entityA)} Advantage:</span>
                  <p className="text-xs text-zinc-200 leading-relaxed">{String(data.advantageA)}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">{String(data.entityB)} Advantage:</span>
                  <p className="text-xs text-zinc-200 leading-relaxed">{String(data.advantageB)}</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex justify-between items-center">
                  <span>Battleground Status:</span>
                  <span className="text-purple-300 font-bold">{String(data.winner === 'Contested' ? 'Contested Draw' : `Favors ${data.winner}`)}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 2: Tactical Copilot Interrogation */}
        {activeTab === 'interrogate' && (
          <NodeInterrogator
            nodeTitle={getNodeTitle()}
            nodeType={String(nodeType || 'node')}
            nodeData={data}
            report={report}
            nebiusApiKey={nebiusApiKey}
            modelName={modelName}
          />
        )}

        {/* TAB 3: Grounded Sources & Citations */}
        {activeTab === 'sources' && (
          <div className="space-y-3">
            {/* Feature A: Citation DNA — show per-pillar citations when a moat node is selected */}
            {nodeType === 'moat' && report.citationDNA && (() => {
              const pillarName = String(data.factor || '');
              const dnaMatch = report.citationDNA?.find(
                d => d.pillar === pillarName ||
                     pillarName.includes(d.pillar.split(' ')[0])
              );
              if (!dnaMatch) return null;
              return (
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Dna className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Citation DNA — {dnaMatch.pillar}</span>
                    <span className={`ml-auto px-2 py-0.5 text-[10px] font-mono rounded border ${
                      dnaMatch.overallConfidence >= 80 ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' :
                      dnaMatch.overallConfidence >= 60 ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' :
                      'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>{dnaMatch.overallConfidence}% confident</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 italic line-clamp-3 leading-relaxed border-l-2 border-indigo-500/30 pl-2">
                    &ldquo;{dnaMatch.claimText}&rdquo;
                  </p>
                  {dnaMatch.matchedSources.length > 0 ? (
                    <div className="space-y-2">
                      {dnaMatch.matchedSources.map((src, si) => (
                        <a key={si} href={src.url} target="_blank" rel="noreferrer"
                          className="block p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 transition-all group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-semibold text-zinc-200 group-hover:text-indigo-300 transition-colors line-clamp-1">{src.title}</span>
                            <span className="ml-2 shrink-0 px-1.5 py-0.5 text-[9px] font-mono bg-indigo-900/60 text-indigo-300 rounded border border-indigo-500/20">
                              {src.relevanceScore}% match
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{src.excerpt}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Link2 className="w-2.5 h-2.5 text-zinc-600" />
                            <span className="text-[9px] text-zinc-600 truncate">{src.url}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-500 italic">No direct citation matches — evidence derived from domain reasoning.</p>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
              <span>Primary Grounded Citations (Tavily AI)</span>
              <span className="font-mono text-[10px]">{report.citations.length} Verified</span>
            </div>

            <div className="space-y-2.5">
              {report.citations.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all text-xs group"
                >
                  <div className="font-semibold text-zinc-200 group-hover:text-indigo-300 transition-colors flex items-center justify-between mb-1">
                    <span className="line-clamp-1">{c.title}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{c.content}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
