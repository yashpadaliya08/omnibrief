import { NextRequest, NextResponse } from 'next/server';
import { callNebiusNemotron, OFFICIAL_NEBIUS_MODEL } from '@/lib/nebius';
import { IntelligenceReport, WarGameScenario } from '@/types/omnibrief';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { report, scenarioQuery, nebiusApiKey, modelName }: { report: IntelligenceReport; scenarioQuery: string; nebiusApiKey?: string; modelName?: string } = body;

    if (!scenarioQuery || !report) {
      return NextResponse.json({ error: 'Scenario query and report are required' }, { status: 400 });
    }

    const cleanScenario = scenarioQuery.trim();
    const lowerScenario = cleanScenario.toLowerCase();
    const effectiveModel = modelName || process.env.NEBIUS_MODEL || OFFICIAL_NEBIUS_MODEL;

    // AI evaluation via Nebius Token Factory
    if (nebiusApiKey || process.env.NEBIUS_API_KEY) {
      const systemPrompt = `You are the OmniBrief Strategic War-Game Simulator powered by NVIDIA Nemotron on Nebius.
Evaluate the shockwave of a strategic 'What-If' counterfactual scenario against the target entity's market defensibility and architecture.
Return valid JSON matching this schema:
{
  "title": string,
  "compositeDelta": number (-25 to +25),
  "newCompositeScore": number (0 to 100),
  "casualtyReport": string,
  "recommendedTactics": string[],
  "nodeImpacts": {
    "[nodeId]": { "status": "strengthened" | "squeezed" | "disrupted" | "neutral", "note": string }
  }
}`;

      const userPrompt = `Target Entity: ${report.targetEntity} (Current Moat Score: ${report.verdictScore}/100)
Scenario: "${cleanScenario}"
Current Competitors: ${report.competitors.map(c => c.name).join(', ')}
Current Moats: ${report.threatMoatMatrix.map(m => m.factor).join(', ')}

Evaluate how this scenario shifts switching costs, data gravity, competitive pressure, and infrastructure viability.`;

      const { rawJson } = await callNebiusNemotron(userPrompt, systemPrompt, nebiusApiKey, effectiveModel);
      if (rawJson) {
        try {
          const parsed = JSON.parse(rawJson);
          const warGame: WarGameScenario = {
            id: `wg_${Date.now()}`,
            title: parsed.title || cleanScenario,
            prompt: cleanScenario,
            compositeDelta: parsed.compositeDelta ?? -8,
            newCompositeScore: parsed.newCompositeScore ?? Math.max(20, Math.min(100, report.verdictScore + (parsed.compositeDelta ?? -8))),
            casualtyReport: parsed.casualtyReport || 'Market dynamics shifted under scenario pressure.',
            recommendedTactics: parsed.recommendedTactics || ['Strengthen data portability', 'Introduce zero-friction developer wedges'],
            nodeImpacts: parsed.nodeImpacts || {},
          };
          return NextResponse.json({ warGame });
        } catch (e) {
          console.error('Failed to parse War-Game AI response:', e);
        }
      }
    }

    // Heuristic War-Game simulation based on scenario semantics
    let compositeDelta = -11;
    let casualty = '';
    const tactics: string[] = [];
    const impacts: WarGameScenario['nodeImpacts'] = {};

    if (lowerScenario.includes('price') || lowerScenario.includes('slashes') || lowerScenario.includes('cuts') || lowerScenario.includes('50%')) {
      compositeDelta = -14;
      casualty = `Aggressive incumbent price deflation erodes ${report.targetEntity}'s premium tier pricing power. Mid-market procurement teams will hesitate before paying per-seat margins.`;
      tactics.push('Transition from per-seat licensing to consumption-based API sync compute.');
      tactics.push('Highlight sub-50ms developer ergonomics and keyboard velocity as the unmatchable differentiator.');
      impacts['comp_comp_1'] = { status: 'strengthened', note: 'Price drop triggers defensive renewal locks.' };
      impacts['comp_comp_2'] = { status: 'squeezed', note: 'Freemium challenger margin gets compressed.' };
      impacts['node_moat_2'] = { status: 'disrupted', note: 'Switching cost barrier lowers as price gap widens.' };
    } else if (lowerScenario.includes('free') || lowerScenario.includes('open source') || lowerScenario.includes('nebius')) {
      compositeDelta = +12;
      casualty = `Deploying an open, sovereign tier on Nebius GPU cloud bypasses enterprise procurement cycles, triggering rapid bottom-up developer adoption while cutting third-party cloud expenses.`;
      tactics.push('Market 100% data residency guarantees for European and regulated enterprise clients.');
      tactics.push('Offer 1-click self-hosted deployment templates alongside managed cloud.');
      impacts['node_moat_3'] = { status: 'strengthened', note: 'Sovereignty moat surges to 95/100.' };
      impacts['node_ws_1'] = { status: 'strengthened', note: 'Captures air-gapped enterprise white-space.' };
      impacts['comp_comp_1'] = { status: 'squeezed', note: 'Legacy closed software loses privacy-conscious teams.' };
    } else if (lowerScenario.includes('restrict') || lowerScenario.includes('privacy') || lowerScenario.includes('closed llm')) {
      compositeDelta = +9;
      casualty = `Closed frontier model restrictions catalyze enterprise flight to open-weight models (NVIDIA Nemotron). Sovereign on-prem and private VPC deployments gain massive leverage.`;
      tactics.push('Enforce strict zero-retention open model guarantees via Nebius Token Factory.');
      tactics.push('Position local-first offline capabilities as risk mitigation against cloud model outages.');
      impacts['node_tech_2'] = { status: 'strengthened', note: 'Open Nemotron architecture provides immune system.' };
      impacts['node_moat_3'] = { status: 'strengthened', note: 'Compliance score jumps +20 points.' };
    } else {
      compositeDelta = -7;
      casualty = `Simulated shockwave introduces friction across customer acquisition and data gravity. Incumbents accelerate feature velocity to defend established accounts.`;
      tactics.push('Double down on developer ecosystem integrations.');
      tactics.push('Accelerate bidirectional synchronization with external issue trackers.');
    }

    const warGame: WarGameScenario = {
      id: `wg_${Date.now()}`,
      title: cleanScenario,
      prompt: cleanScenario,
      compositeDelta,
      newCompositeScore: Math.max(30, Math.min(100, report.verdictScore + compositeDelta)),
      casualtyReport: casualty,
      recommendedTactics: tactics,
      nodeImpacts: impacts,
    };

    return NextResponse.json({ warGame });
  } catch (err: unknown) {
    console.error('War-Game API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
