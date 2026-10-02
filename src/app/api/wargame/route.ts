import { NextRequest, NextResponse } from 'next/server';
import { callNebiusNemotron, OFFICIAL_NEBIUS_MODEL, normalizeNebiusModel } from '@/lib/nebius';
import { searchTavily } from '@/lib/tavily';
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';

function extractJson(raw: string): Record<string, unknown> | null {
  if (!raw) return null;
  try { const d = JSON.parse(raw.trim()); if (d && typeof d === 'object') return d; } catch {}
  const cb = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (cb) { try { const d = JSON.parse(cb[1].trim()); if (d && typeof d === 'object') return d; } catch {} }
  const f = raw.indexOf('{'); const l = raw.lastIndexOf('}');
  if (f !== -1 && l > f) { try { const d = JSON.parse(raw.substring(f, l + 1)); if (d && typeof d === 'object') return d; } catch {} }
  return null;
}

// Build entity-aware dynamic node impact keys from the actual report
function buildNodeImpactKeys(report: IntelligenceReport): {
  compIds: string[];
  techIds: string[];
  moatIds: string[];
  wsIds: string[];
} {
  return {
    compIds: report.competitors.map(c => `node_${c.id}`),
    techIds: report.techStackAnalysis.map(t => `node_${t.id}`),
    moatIds: report.threatMoatMatrix.map(m => `node_${m.id}`),
    wsIds: report.marketWhitespace.map(w => `node_${w.id}`),
  };
}

// Deterministic but entity-aware heuristic fallback
function buildHeuristicWarGame(
  report: IntelligenceReport,
  scenario: string,
): Omit<WarGameScenario, 'id' | 'prompt'> {
  const lower = scenario.toLowerCase();
  const entity = report.targetEntity;
  const { compIds, techIds, moatIds, wsIds } = buildNodeImpactKeys(report);

  const isPriceWar = /price|slash|cut|discount|free tier|cheaper|50%|pricing/i.test(lower);
  const isOpenSource = /open.?source|self.?host|free|nebius|sovereign|open tier/i.test(lower);
  const isPrivacy = /restrict|privacy|ban|closed|llm|data.?leak|regulation|gdpr|ban/i.test(lower);
  const isAcquisition = /acqui|buy|merge|consolidat/i.test(lower);
  const isNewEntrant = /enter|new player|startup|new competitor|launch/i.test(lower);
  const isTechShift = /ai|llm|gpt|agent|automat|ml|model/i.test(lower);
  const isEconomy = /recession|budget|layoff|cut cost|economic/i.test(lower);

  const firstComp = report.competitors[0]?.name || 'primary competitor';

  if (isPriceWar) {
    const delta = -(10 + Math.round(report.verdictScore * 0.06));
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (compIds[0]) impacts[compIds[0]] = { status: 'strengthened', note: `${firstComp} price cut triggers defensive renewal locks and contract acceleration.` };
    if (compIds[1]) impacts[compIds[1]] = { status: 'squeezed', note: 'Challenger margin compressed — freemium tier loses price advantage.' };
    if (moatIds[1]) impacts[moatIds[1]] = { status: 'disrupted', note: 'Switching cost barrier lowers as price differential narrows to zero.' };
    if (moatIds[0]) impacts[moatIds[0]] = { status: 'disrupted', note: 'Data gravity weakens as migration incentives become financially attractive.' };
    if (wsIds[2]) impacts[wsIds[2]] = { status: 'strengthened', note: 'Usage-based pricing whitespace becomes immediately actionable.' };
    return {
      title: `${firstComp} Price War Shockwave`,
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `Aggressive incumbent price deflation erodes ${entity}'s premium tier pricing power by approximately ${Math.abs(delta)} composite moat points. Mid-market procurement teams will re-evaluate before renewing at current margins. Historical data shows 23% of procurement cycles re-open when the price gap closes below 40%. ${entity}'s strongest counter is non-price differentiation: developer ergonomics, API velocity, and sovereign infrastructure that ${firstComp} cannot easily replicate.`,
      recommendedTactics: [
        `Transition ${entity} from per-seat pricing to consumption-based compute sync — commoditize what the price war attacks.`,
        `Double down on the developer experience moat: keyboard velocity, API ergonomics, and local-first offline capabilities that price alone cannot replicate.`,
        `Accelerate enterprise compliance certifications (SOC2 Type II, GDPR, ISO 27001) to justify premium tier to regulated buyers who cannot use commodity alternatives.`,
        `Offer 1-click migration from ${firstComp} to remove switching friction for teams ready to move.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isOpenSource) {
    const delta = +(8 + Math.round(report.verdictScore * 0.04));
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (moatIds[2]) impacts[moatIds[2]] = { status: 'strengthened', note: `Sovereignty & Compliance moat surges — ${entity} gains regulated enterprise credibility.` };
    if (moatIds[3]) impacts[moatIds[3]] = { status: 'strengthened', note: 'Open community creates self-reinforcing contributor network effect.' };
    if (wsIds[0]) impacts[wsIds[0]] = { status: 'strengthened', note: 'Air-gapped sovereign deployment whitespace becomes immediately capturable.' };
    if (compIds[0]) impacts[compIds[0]] = { status: 'squeezed', note: `${firstComp} loses privacy-conscious enterprise accounts to ${entity}'s open tier.` };
    if (techIds[0]) impacts[techIds[0]] = { status: 'strengthened', note: 'Open data layer strengthens portability narrative vs. closed competitors.' };
    return {
      title: `${entity} Open-Source & Sovereign Wedge`,
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `Deploying an open, sovereign tier on Nebius GPU cloud bypasses enterprise procurement cycles for ${entity}, triggering rapid bottom-up developer adoption while simultaneously slashing third-party cloud infrastructure costs. European and regulated US defense customers immediately qualify. Historical open-source wedge deployments (e.g. GitLab vs. GitHub Enterprise) show 34% faster enterprise evaluation cycles when self-hosting is available. Composite moat jumps +${delta} points led by Sovereignty pillar surge.`,
      recommendedTactics: [
        `Market 100% data residency guarantees on Nebius Token Factory for EU GDPR and US defense regulated enterprise buyers.`,
        `Offer 1-click self-hosted deployment templates (Docker Compose + Helm charts) alongside the managed cloud tier.`,
        `Incentivize community contributions with a GitHub issue marketplace — each contributor becomes a distribution node.`,
        `Position ${entity}'s open tier as the NVIDIA Nemotron showcase deployment, attracting GPU hardware partnership opportunities.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isPrivacy) {
    const delta = +(7 + Math.round(report.verdictScore * 0.03));
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (techIds[1]) impacts[techIds[1]] = { status: 'strengthened', note: 'Open NVIDIA Nemotron architecture provides regulatory immunity vs. closed GPT APIs.' };
    if (moatIds[2]) impacts[moatIds[2]] = { status: 'strengthened', note: `Compliance pillar surges +20 pts — ${entity}'s zero-retention model becomes mandatory.` };
    if (compIds[0]) impacts[compIds[0]] = { status: 'squeezed', note: `${firstComp} faces regulatory scrutiny over opaque data practices.` };
    if (wsIds[0]) impacts[wsIds[0]] = { status: 'strengthened', note: 'Air-gapped sovereign deployment opportunity becomes urgent rather than optional.' };
    return {
      title: 'LLM Restriction & Privacy Regulation Shockwave',
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `Closed frontier model data restrictions catalyze enterprise flight toward open-weight alternatives. NVIDIA Nemotron on Nebius Token Factory becomes the infrastructure of choice for regulated industries. For ${entity}, this is a positive shockwave: sovereign, zero-retention model architecture becomes a competitive requirement rather than a premium add-on. Estimated +${delta} composite moat increase driven almost entirely by the Sovereignty & Compliance pillar surging to 90+/100.`,
      recommendedTactics: [
        `Enforce strict zero-retention open model guarantees via Nebius Token Factory — make this the centerpiece of ${entity}'s enterprise pitch deck.`,
        `Position local-first offline capabilities as risk mitigation against frontier cloud model outages and API rate limits.`,
        `Publish a transparency report detailing exactly what data enters ${entity}'s inference pipeline and what exits — no competitor will match this.`,
        `Partner with Nebius for a co-marketed "Privacy-First AI Deployment" certification that enterprise IT can show to their legal teams.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isAcquisition) {
    const delta = -9;
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (compIds[0]) impacts[compIds[0]] = { status: 'strengthened', note: `${firstComp} consolidation creates a dominant platform with combined resources.` };
    if (moatIds[1]) impacts[moatIds[1]] = { status: 'disrupted', note: 'Acquirer will integrate ${entity} workflows — switching cost barrier erodes.' };
    if (moatIds[3]) impacts[moatIds[3]] = { status: 'disrupted', note: 'Merged entity network effects reduce churn for all parties.' };
    if (wsIds[1]) impacts[wsIds[1]] = { status: 'strengthened', note: 'Acquisition vacuum creates whitespace for agile independent operator.' };
    return {
      title: `Competitor Consolidation: Acquisition Shockwave`,
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `A major acquisition event reshuffles the competitive landscape around ${entity}. The merged entity commands consolidated resources, distribution, and enterprise procurement leverage. Historical acquisition patterns (Atlassian/Trello, Salesforce/Slack) show acquired users experience 18–24 months of product degradation during integration — a critical window for ${entity} to capture dissatisfied users. Net composite moat impact: -${Math.abs(delta)} in the short term, with reversal potential in 12–18 months.`,
      recommendedTactics: [
        `Launch a targeted "Switching from [Acquired Product]" landing page within 48 hours of the acquisition announcement.`,
        `Offer guaranteed data migration tooling from the acquired product to ${entity} — zero friction, one click.`,
        `Contact the acquired product's power users and developer advocates directly — they often become vocal ${entity} champions post-acquisition chaos.`,
        `Accelerate ${entity}'s API-first strategy to make integrations trivially portable before the merged entity locks down APIs.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isEconomy) {
    const delta = -(6 + Math.round(report.verdictScore * 0.03));
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (moatIds[1]) impacts[moatIds[1]] = { status: 'disrupted', note: 'Budget pressure motivates migration audits — switching cost barrier weakens.' };
    if (compIds[1]) impacts[compIds[1]] = { status: 'strengthened', note: 'Free/open-source alternatives see surge in evaluation traffic.' };
    if (wsIds[2]) impacts[wsIds[2]] = { status: 'strengthened', note: 'Transparent usage-based pricing whitespace becomes highly attractive.' };
    if (techIds[2]) impacts[techIds[2]] = { status: 'squeezed', note: 'Expensive realtime infrastructure costs come under budget scrutiny.' };
    return {
      title: 'Economic Downturn & Budget Freeze Shockwave',
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `Macro economic pressure forces CFO-driven software budget reviews across all ${entity} customer segments. Enterprise renewals face 30–40% extended procurement cycles and multi-vendor competitive bids. Startups freeze discretionary tooling spend entirely. Historical downturns show bottom-up developer tools with transparent pricing weather budget cycles better than enterprise suite vendors — ${entity} should lean into its consumption-based pricing narrative immediately.`,
      recommendedTactics: [
        `Introduce a transparent ROI calculator showing exact hours saved and cost per resolved issue/query vs. manual alternatives.`,
        `Offer annual pre-pay discounts to lock in renewal before Q4 budget cycles close.`,
        `Position ${entity}'s open-source tier as a zero-cost pilot that IT budget approvers can sign off without procurement committee review.`,
        `Actively market the cost savings vs. legacy incumbent alternatives — quantify the TCO gap precisely.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isTechShift) {
    const delta = +(5 + Math.round(report.verdictScore * 0.02));
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (techIds[0]) impacts[techIds[0]] = { status: 'strengthened', note: 'AI-native data layer becomes strategic infrastructure, not a feature.' };
    if (moatIds[3]) impacts[moatIds[3]] = { status: 'strengthened', note: 'AI-first developer ecosystem creates new network effect flywheel.' };
    if (compIds[0]) impacts[compIds[0]] = { status: 'squeezed', note: `${firstComp} legacy architecture struggles to adopt AI-native workflows.` };
    if (wsIds[1]) impacts[wsIds[1]] = { status: 'strengthened', note: 'AI agentic workflow whitespace expands dramatically.' };
    return {
      title: 'AI Technology Shift Shockwave',
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `The accelerating AI capability shift rewards ${entity} if it moves fast to embed NVIDIA Nemotron inference directly into its core workflows. Legacy incumbents with monolithic architectures will lag 18–24 months behind in AI integration. ${entity} has a narrow window to become the AI-native category leader before incumbents retrofit AI wrappers. Composite moat increases +${delta} driven by tech stack modernity and network effects expansion.`,
      recommendedTactics: [
        `Embed NVIDIA Nemotron on Nebius Token Factory as the native intelligence layer — not an optional add-on.`,
        `Ship an agentic automation mode that proactively surfaces insights without requiring user queries.`,
        `Partner with AI-native developer tool companies for co-marketed "AI-ready" certification.`,
        `Open an API for third-party AI agents to interact with ${entity}'s data — create an agent ecosystem moat.`,
      ],
      nodeImpacts: impacts,
    };
  }

  if (isNewEntrant) {
    const delta = -8;
    const impacts: WarGameScenario['nodeImpacts'] = {};
    if (compIds[compIds.length - 1]) impacts[compIds[compIds.length - 1]] = { status: 'disrupted', note: 'New entrant captures attention and early adopter trial budget.' };
    if (moatIds[3]) impacts[moatIds[3]] = { status: 'disrupted', note: 'New ecosystem player fragments developer mindshare and conference buzz.' };
    if (wsIds[0]) impacts[wsIds[0]] = { status: 'squeezed', note: 'Sovereign whitespace becomes contested earlier than projected.' };
    if (moatIds[0]) impacts[moatIds[0]] = { status: 'strengthened', note: 'Data gravity moat becomes primary retention mechanism as new entrant lacks history.' };
    return {
      title: 'Well-Funded New Entrant Shockwave',
      compositeDelta: delta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
      casualtyReport: `A well-funded new entrant with fresh architecture and aggressive growth capital creates near-term turbulence for ${entity}. The new entrant will prioritize developer mindshare with free tiers and conference visibility. Historical patterns show new entrants typically achieve 5–8% market share in 18 months before hitting enterprise procurement barriers — ${entity}'s data gravity and switching costs provide the primary defensive moat during this period.`,
      recommendedTactics: [
        `Accelerate ${entity}'s flagship differentiating features that the new entrant will take 12+ months to replicate.`,
        `Offer existing customers multi-year lock-in incentives with retroactive pricing guarantees before trial churn spikes.`,
        `Respond with a transparent "why we're different" comparison page that addresses the new entrant's marketing directly.`,
        `Recruit 3–5 prominent developer advocates who can authentically defend ${entity}'s architecture in public forums.`,
      ],
      nodeImpacts: impacts,
    };
  }

  // Generic fallback — still entity-aware and specific
  const delta = -(6 + Math.round(report.verdictScore * 0.04));
  const impacts: WarGameScenario['nodeImpacts'] = {};
  if (moatIds[1]) impacts[moatIds[1]] = { status: 'disrupted', note: 'Switching cost barrier faces elevated pressure under scenario conditions.' };
  if (compIds[0]) impacts[compIds[0]] = { status: 'strengthened', note: `${firstComp} benefits from market disruption.` };
  if (wsIds[1]) impacts[wsIds[1]] = { status: 'strengthened', note: 'Autonomous workflow whitespace expands as manual processes prove fragile.' };
  return {
    title: `Strategic Shockwave: ${scenario.slice(0, 48)}...`,
    compositeDelta: delta,
    newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
    casualtyReport: `The simulated shockwave introduces friction across ${entity}'s customer acquisition and data gravity moats. Incumbents like ${firstComp} will accelerate feature velocity to defend their established accounts during the disruption window. ${entity}'s strongest defenses are its switching cost moat (${report.threatMoatMatrix.find(m => m.factor.includes('Switch'))?.moatStrengthScore ?? 80}/100) and data gravity (${report.threatMoatMatrix.find(m => m.factor.includes('Data'))?.moatStrengthScore ?? 80}/100). Focus counter-moves on reinforcing these two pillars.`,
    recommendedTactics: [
      `Reinforce ${entity}'s developer ecosystem integrations to raise switching costs before competitive pressure peaks.`,
      `Accelerate bidirectional data synchronization APIs to lock in institutional knowledge as a defensibility asset.`,
      `Position ${entity}'s Nebius Token Factory integration as the sovereign infrastructure play that legacy competitors cannot match.`,
    ],
    nodeImpacts: impacts,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { report, scenarioQuery, nebiusApiKey, tavilyApiKey, modelName }: {
      report: IntelligenceReport;
      scenarioQuery: string;
      nebiusApiKey?: string;
      tavilyApiKey?: string;
      modelName?: string;
    } = body;

    if (!scenarioQuery || !report) {
      return NextResponse.json({ error: 'Scenario query and report are required' }, { status: 400 });
    }

    const cleanScenario = scenarioQuery.trim().slice(0, 400);
    const effectiveModel = normalizeNebiusModel(modelName || process.env.NEBIUS_MODEL || OFFICIAL_NEBIUS_MODEL);

    // Stage 1: Tavily live grounding for the specific scenario
    let scenarioContext = '';
    try {
      const tavilyKey = tavilyApiKey || process.env.TAVILY_API_KEY;
      if (tavilyKey) {
        const searchQuery = `${report.targetEntity} ${scenarioQuery} market impact competitive response 2026`;
        const { sources } = await searchTavily(searchQuery, tavilyKey);
        if (sources.length > 0) {
          scenarioContext = `\n\nLive Tavily scenario context (${sources.length} citations):\n` +
            sources.slice(0, 4).map((s, i) => `[${i + 1}] ${s.title}: ${s.content.slice(0, 200)}`).join('\n');
        }
      }
    } catch { /* non-fatal */ }

    // Stage 2: Nebius Nemotron AI evaluation
    const hasKey = Boolean(nebiusApiKey || process.env.NEBIUS_API_KEY);
    if (hasKey) {
      const nodeIdList = [
        ...report.competitors.map(c => `node_${c.id} (competitor: ${c.name})`),
        ...report.techStackAnalysis.map(t => `node_${t.id} (tech: ${t.component})`),
        ...report.threatMoatMatrix.map(m => `node_${m.id} (moat: ${m.factor})`),
        ...report.marketWhitespace.map(w => `node_${w.id} (whitespace: ${w.opportunity})`),
      ].join(', ');

      const systemPrompt = `You are OmniBrief's Strategic War-Game Simulator powered by NVIDIA Nemotron on Nebius Token Factory.
Evaluate the strategic impact of a "What-If" counterfactual scenario on "${report.targetEntity}" (Current Moat Score: ${report.verdictScore}/100).
Respond ONLY with a raw JSON object. Begin with '{' and end with '}'. No preamble.

The node IDs in this canvas are: ${nodeIdList}

Schema:
{
  "title": "Short punchy scenario title (max 8 words)",
  "compositeDelta": -14,
  "newCompositeScore": 71,
  "casualtyReport": "3-4 sentence specific analysis of impact on ${report.targetEntity} with data-grounded reasoning",
  "recommendedTactics": ["Specific counter-tactic 1 for ${report.targetEntity}", "Specific counter-tactic 2", "Specific counter-tactic 3"],
  "nodeImpacts": {
    "node_comp_1": { "status": "strengthened", "note": "Why this specific competitor benefits or suffers" },
    "node_moat_1": { "status": "disrupted", "note": "How this specific moat pillar is affected" },
    "node_ws_1": { "status": "strengthened", "note": "How this whitespace opportunity is affected" }
  }
}

Rules:
- compositeDelta must be between -25 and +25 based on actual scenario severity
- newCompositeScore = ${report.verdictScore} + compositeDelta, clamped to 30-100
- nodeImpacts must use EXACT node IDs from the list above (node_comp_1, node_tech_2, etc.)
- casualtyReport must be specific to ${report.targetEntity}, NOT generic advice
- recommendedTactics must be actionable and specific to this entity and scenario`;

      const userPrompt = `Target Entity: ${report.targetEntity} (Current Moat: ${report.verdictScore}/100)
Scenario: "${cleanScenario}"
Active Competitors: ${report.competitors.map(c => c.name).join(', ')}
Moat Pillars: ${report.threatMoatMatrix.map(m => `${m.factor} (${m.moatStrengthScore}/100)`).join(', ')}
Tech Stack: ${report.techStackAnalysis.map(t => t.component).join(', ')}
${scenarioContext}

Evaluate how this scenario shifts the 4 moat pillars, competitive dynamics, and architecture viability for ${report.targetEntity}.`;

      const { rawJson } = await callNebiusNemotron(userPrompt, systemPrompt, nebiusApiKey, effectiveModel);
      if (rawJson) {
        try {
          const parsed = extractJson(rawJson);
          if (parsed) {
            const delta = Number(parsed.compositeDelta) || -8;
            const warGame: WarGameScenario = {
              id: `wg_${Date.now()}`,
              title: String(parsed.title || cleanScenario),
              prompt: cleanScenario,
              compositeDelta: Math.max(-25, Math.min(25, delta)),
              newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + delta)),
              casualtyReport: String(parsed.casualtyReport || ''),
              recommendedTactics: Array.isArray(parsed.recommendedTactics) ? parsed.recommendedTactics : [],
              nodeImpacts: (parsed.nodeImpacts && typeof parsed.nodeImpacts === 'object')
                ? parsed.nodeImpacts as WarGameScenario['nodeImpacts']
                : {},
            };
            return NextResponse.json({ warGame, groundedWithTavily: scenarioContext.length > 0 });
          }
        } catch (e) {
          console.error('Failed to parse War-Game AI response:', e);
        }
      }
    }

    // Fallback: rich heuristic with correct node IDs
    const heuristic = buildHeuristicWarGame(report, cleanScenario);
    const warGame: WarGameScenario = {
      id: `wg_${Date.now()}`,
      prompt: cleanScenario,
      ...heuristic,
    };

    return NextResponse.json({ warGame, groundedWithTavily: false });
  } catch (err: unknown) {
    console.error('War-Game API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
