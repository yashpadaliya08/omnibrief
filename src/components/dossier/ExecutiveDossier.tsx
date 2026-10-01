'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Code2,
  ExternalLink,
  ShieldCheck,
  Layers,
  Swords,
  AlertTriangle,
  Lightbulb,
  Cpu,
} from 'lucide-react';
import { IntelligenceReport } from '@/types/omnibrief';

interface ExecutiveDossierProps {
  report: IntelligenceReport;
}

export function ExecutiveDossier({ report }: ExecutiveDossierProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'competitors' | 'architecture' | 'moats' | 'whitespace' | 'sources'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = generateMarkdownExport(report);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownExport(report);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnibrief-${report.targetEntity.toLowerCase().replace(/[^a-z0-9]/g, '-')}-dossier.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMCP = () => {
    const mcpContext = {
      $schema: 'https://modelcontextprotocol.io/schema/context.json',
      version: '1.0.0',
      type: 'market-and-architecture-due-diligence',
      entity: report.targetEntity,
      moatScore: report.verdictScore,
      models: {
        reasoning: report.nebiusModelUsed,
        infrastructure: 'Nebius Token Factory / Nebius AI Cloud',
      },
      sources: report.citations,
      competitors: report.competitors,
      architecture: report.techStackAnalysis,
      moats: report.threatMoatMatrix,
      whitespaceOpportunities: report.marketWhitespace,
      summary: report.executiveSummary,
    };

    const blob = new Blob([JSON.stringify(mcpContext, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnibrief-${report.targetEntity.toLowerCase().replace(/[^a-z0-9]/g, '-')}-mcp-bundle.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shadow-2xl p-6 lg:p-8">
      {/* Header with Title and Export Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Verified Executive Dossier
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Generated: {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            {report.targetEntity} — Due Diligence Memo
          </h2>
          <p className="text-sm text-zinc-400 mt-1">{report.tagline}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dossier (.md)</span>
          </button>

          <button
            onClick={handleDownloadMCP}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
            title="Download Model Context Protocol (MCP) AI Context Pack"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>MCP Context Pack (.json)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 py-4 border-b border-zinc-800/80 no-scrollbar">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<FileText className="w-4 h-4" />}>
          Executive Overview
        </TabButton>
        <TabButton active={activeTab === 'competitors'} onClick={() => setActiveTab('competitors')} icon={<Swords className="w-4 h-4" />}>
          Competitor Landscape ({report.competitors.length})
        </TabButton>
        <TabButton active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} icon={<Layers className="w-4 h-4" />}>
          Architecture Teardown ({report.techStackAnalysis.length})
        </TabButton>
        <TabButton active={activeTab === 'moats'} onClick={() => setActiveTab('moats')} icon={<AlertTriangle className="w-4 h-4" />}>
          Moat & Threat Matrix ({report.threatMoatMatrix.length})
        </TabButton>
        <TabButton active={activeTab === 'whitespace'} onClick={() => setActiveTab('whitespace')} icon={<Lightbulb className="w-4 h-4" />}>
          White-Space Wedges ({report.marketWhitespace.length})
        </TabButton>
        <TabButton active={activeTab === 'sources'} onClick={() => setActiveTab('sources')} icon={<ExternalLink className="w-4 h-4" />}>
          Tavily Citations ({report.citations.length})
        </TabButton>
      </div>

      {/* Tab Panels */}
      <div className="pt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase font-mono block mb-1">Defensibility Moat Index</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-400 font-mono">{report.verdictScore}</span>
                  <span className="text-xs text-zinc-400">/ 100</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Based on switching cost, data gravity, and vendor lock-in.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase font-mono block mb-1">Inference Engine</span>
                <div className="flex items-center gap-1.5 text-sm font-mono text-indigo-300 font-bold mt-1">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>{report.nebiusModelUsed.split('/').pop()}</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Served on Nebius Token Factory high-performance GPUs.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase font-mono block mb-1">Grounding Citations</span>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">
                  {report.citations.length} Verified
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Live web intelligence retrieved via Tavily Search API.</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-2">Executive Summary</h3>
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-zinc-300 text-sm leading-relaxed">
                {report.executiveSummary}
              </div>
            </div>

            {/* Agent execution trace */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Multi-Agent Orchestration Log</h3>
              <div className="space-y-2">
                {report.executionSteps.map((step) => (
                  <div key={step.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-pulse" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-indigo-300">{step.agent}</span>
                        <span className="font-mono text-[10px] text-zinc-500">{new Date(step.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-zinc-400">{step.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.competitors.map((comp) => (
              <div key={comp.id} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                    {comp.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{comp.marketShare}</span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">{comp.name}</h4>
                  <p className="text-xs font-mono text-amber-400 mt-0.5">{comp.pricingEstimate || comp.pricingModel}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Key Strengths</span>
                  <ul className="space-y-1">
                    {comp.strengths.map((s, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Vulnerabilities</span>
                  <ul className="space-y-1">
                    {comp.weaknesses.map((w, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-900 text-zinc-400 border-b border-zinc-800 font-mono uppercase text-[10px]">
                  <th className="p-3.5">Component</th>
                  <th className="p-3.5">Incumbent Choice</th>
                  <th className="p-3.5 text-cyan-300">Recommended Open Architecture</th>
                  <th className="p-3.5">Scalability</th>
                  <th className="p-3.5">Technical Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {report.techStackAnalysis.map((tech) => (
                  <tr key={tech.id} className="hover:bg-zinc-900/40">
                    <td className="p-3.5 font-bold text-white">{tech.component}</td>
                    <td className="p-3.5 text-zinc-400">{tech.competitorChoice}</td>
                    <td className="p-3.5 font-semibold text-cyan-300 bg-cyan-950/10">{tech.recommendedOpenStack}</td>
                    <td className="p-3.5 font-mono text-amber-400">{tech.scalabilityRating}/5</td>
                    <td className="p-3.5 text-zinc-300 max-w-xs">{tech.whyItMatters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'moats' && (
          <div className="space-y-3">
            {report.threatMoatMatrix.map((moat) => (
              <div key={moat.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {moat.riskLevel} Risk
                    </span>
                    <h4 className="text-base font-bold text-white">{moat.factor}</h4>
                  </div>
                  <p className="text-xs text-zinc-400">{moat.details}</p>
                  <p className="text-xs text-emerald-300 mt-2 italic">
                    <span className="font-semibold text-emerald-400">Countermeasure:</span> {moat.mitigation}
                  </p>
                </div>
                <div className="md:w-36 shrink-0">
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Defensibility</span>
                    <span className="font-bold text-amber-400">{moat.defensibilityScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style={{ width: `${moat.defensibilityScore}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'whitespace' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.marketWhitespace.map((ws) => (
              <div key={ws.id} className="p-5 rounded-xl bg-zinc-900/60 border border-emerald-500/30 space-y-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  {ws.estimatedImpact} Impact
                </span>
                <h4 className="text-base font-bold text-white">{ws.opportunity}</h4>
                <div className="text-xs text-cyan-300 font-mono">Audience: {ws.addressableAudience}</div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  {ws.strategicAngle}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-3">
            {report.citations.map((c, idx) => (
              <a
                key={idx}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="block p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all text-xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">{c.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                </div>
                <p className="text-zinc-400 line-clamp-2">{c.content}</p>
                <span className="text-[10px] font-mono text-zinc-500 block mt-2">{c.url}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
        active
          ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function generateMarkdownExport(report: IntelligenceReport): string {
  return `# OmniBrief Executive Due-Diligence Dossier: ${report.targetEntity}
**Tagline:** ${report.tagline}  
**Defensibility Moat Index:** ${report.verdictScore}/100  
**Inference Engine:** ${report.nebiusModelUsed} on Nebius Token Factory  
**Generated Date:** ${new Date(report.createdAt).toUTCString()}  

---

## 1. Executive Summary
${report.executiveSummary}

---

## 2. Competitor Landscape
${report.competitors
  .map(
    (c) => `### ${c.name} (${c.category.toUpperCase()})
- **Market Share:** ${c.marketShare}
- **Pricing:** ${c.pricingEstimate || c.pricingModel}
- **Strengths:** ${c.strengths.join(', ')}
- **Vulnerabilities:** ${c.weaknesses.join(', ')}
`
  )
  .join('\n')}

---

## 3. Architecture & Tech Teardown (Open Infrastructure Recommendation)
| Component | Incumbent Approach | Recommended Open Stack | Scalability | Rationale |
| :--- | :--- | :--- | :---: | :--- |
${report.techStackAnalysis
  .map(
    (t) =>
      `| ${t.component} | ${t.competitorChoice} | **${t.recommendedOpenStack}** | ${t.scalabilityRating}/5 | ${t.whyItMatters} |`
  )
  .join('\n')}

---

## 4. Threat & Defensibility Moat Matrix
${report.threatMoatMatrix
  .map(
    (m) => `### ${m.factor} [Risk: ${m.riskLevel.toUpperCase()} | Score: ${m.defensibilityScore}%]
- **Details:** ${m.details}
- **Strategic Countermeasure:** ${m.mitigation}
`
  )
  .join('\n')}

---

## 5. Market White-Space Opportunities
${report.marketWhitespace
  .map(
    (w) => `### ${w.opportunity} (${w.estimatedImpact} Impact)
- **Target Audience:** ${w.addressableAudience}
- **Strategic Wedge:** ${w.strategicAngle}
`
  )
  .join('\n')}

---

## 6. Live Grounded Sources (Tavily AI Search)
${report.citations.map((c, i) => `${i + 1}. [${c.title}](${c.url}) - ${c.content}`).join('\n')}

---
*Generated by OmniBrief for the Nebius x NVIDIA Global AI Hackathon.*
`;
}
