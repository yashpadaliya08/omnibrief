'use client';

import React from 'react';
import { Node } from '@xyflow/react';
import { X, ExternalLink, ShieldCheck, Sparkles, AlertTriangle, Layers, Swords, Lightbulb } from 'lucide-react';
import { IntelligenceReport } from '@/types/omnibrief';

interface NodeInspectorDrawerProps {
  selectedNode: Node | null;
  report: IntelligenceReport | null;
  onClose: () => void;
}

export function NodeInspectorDrawer({ selectedNode, report, onClose }: NodeInspectorDrawerProps) {
  if (!selectedNode || !report) return null;

  const data = selectedNode.data as Record<string, unknown>;
  const nodeType = selectedNode.type;

  return (
    <aside aria-label="Node Inspector" className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-zinc-950/95 border-l border-zinc-800 backdrop-blur-2xl shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          {nodeType === 'rootEntity' && <Sparkles className="w-5 h-5 text-indigo-400" />}
          {nodeType === 'competitor' && <Swords className="w-5 h-5 text-rose-400" />}
          {nodeType === 'techStack' && <Layers className="w-5 h-5 text-cyan-400" />}
          {nodeType === 'moat' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          {nodeType === 'whitespace' && <Lightbulb className="w-5 h-5 text-emerald-400" />}
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            {nodeType === 'rootEntity' && 'Core Target Dossier'}
            {nodeType === 'competitor' && 'Competitor Profile'}
            {nodeType === 'techStack' && 'Architecture Teardown'}
            {nodeType === 'moat' && 'Threat & Moat Analysis'}
            {nodeType === 'whitespace' && 'Strategic White-Space'}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Inspector"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content based on Node Type */}
      {nodeType === 'rootEntity' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">{report.targetEntity}</h2>
            <p className="text-sm text-zinc-400">{report.tagline}</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Moat Viability Index</span>
              <span className="font-mono font-bold text-emerald-400 text-lg">{report.verdictScore}/100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Inference Architecture</span>
              <span className="font-mono text-indigo-300 text-xs">{report.nebiusModelUsed}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Verified Citations</span>
              <span className="text-zinc-200 text-xs">{report.citations.length} Grounded Sources</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Executive Summary</h4>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-sm text-zinc-300 leading-relaxed">
              {report.executiveSummary}
            </div>
          </div>
        </div>
      )}

      {nodeType === 'competitor' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono uppercase">
              {String(data.category)} Competitor
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{String(data.name)}</h2>
            <p className="text-sm font-mono text-zinc-400">Estimated Market Share: {String(data.marketShare)}</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs text-zinc-500 uppercase font-mono block mb-1">Pricing Model</span>
            <p className="text-white font-medium">{String(data.pricingEstimate || data.pricingModel)}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Key Strengths</h4>
            <ul className="space-y-2">
              {((data.strengths as string[]) || []).map((s, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Vulnerabilities & Attack Vectors</h4>
            <ul className="space-y-2">
              {((data.weaknesses as string[]) || []).map((w, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {nodeType === 'techStack' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono uppercase">
              System Component
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{String(data.component)}</h2>
            <p className="text-xs font-mono text-zinc-400">Scalability Rating: {Number(data.scalabilityRating)} / 5</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-xs text-zinc-500 uppercase font-mono block mb-1">Incumbent / Current Approach</span>
              <p className="text-sm font-semibold text-zinc-200">{String(data.competitorChoice)}</p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
              <span className="text-xs text-cyan-400 uppercase font-mono font-bold block mb-1">Recommended Open Architecture</span>
              <p className="text-sm font-semibold text-cyan-200">{String(data.recommendedOpenStack)}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Technical Rationale & Impact</h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              {String(data.whyItMatters)}
            </p>
          </div>
        </div>
      )}

      {nodeType === 'moat' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono uppercase">
              {String(data.riskLevel)} Risk Factor
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{String(data.factor)}</h2>
            <div className="mt-3">
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>Defensibility Score</span>
                <span className="font-bold text-amber-400">{Number(data.defensibilityScore)}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                  style={{ width: `${Number(data.defensibilityScore)}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Threat Details</h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              {String(data.details)}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Strategic Wedge / Countermeasure</h4>
            <p className="text-sm text-emerald-200 leading-relaxed bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
              {String(data.mitigation)}
            </p>
          </div>
        </div>
      )}

      {nodeType === 'whitespace' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono uppercase">
              {String(data.estimatedImpact)} Impact Opportunity
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{String(data.opportunity)}</h2>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-xs text-cyan-400 uppercase font-mono font-bold block mb-1">Target Addressable Audience</span>
            <p className="text-sm font-semibold text-zinc-200">{String(data.addressableAudience)}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Execution Wedge</h4>
            <p className="text-sm text-emerald-100 leading-relaxed bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30">
              {String(data.strategicAngle)}
            </p>
          </div>
        </div>
      )}

      {/* Grounded Sources & Citations */}
      {report.citations.length > 0 && (
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>Grounded Live Citations (Tavily AI Search)</span>
          </h4>
          <div className="space-y-2.5">
            {report.citations.map((c, i) => (
              <a
                key={i}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="block p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all text-xs group"
              >
                <div className="font-semibold text-zinc-200 group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                  <span className="line-clamp-1">{c.title}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{c.content}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
