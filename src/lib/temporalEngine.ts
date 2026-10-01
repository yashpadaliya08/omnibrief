import { IntelligenceReport } from '@/types/omnibrief';

export type EvolutionYear = 2023 | 2024 | 2025 | 2026;

export interface TemporalSnapshot {
  year: EvolutionYear;
  title: string;
  narrative: string;
  verdictScore: number;
  marketDynamics: string;
  techMilestone: string;
}

export const TEMPORAL_SNAPSHOTS: Record<EvolutionYear, TemporalSnapshot> = {
  2023: {
    year: 2023,
    title: 'Incumbent Monolith & Cloud Lock-in Era',
    narrative: 'Jira holds 88% enterprise dominance. Linear is an early Series A challenger (10k users). Plane is v0.1 alpha.',
    verdictScore: 62,
    marketDynamics: 'Unchallenged incumbent monopolies; high server roundtrip latency (>1.5s); enterprise buyers default to Atlassian suite.',
    techMilestone: 'Monolithic AWS EC2/RDS; traditional server-side rendering; no browser CRDT sync.',
  },
  2024: {
    year: 2024,
    title: 'Local-First CRDT & SQLite WASM Dawn',
    narrative: 'Linear releases instant offline SQLite WASM sync engine. Plane crosses 15k GitHub stars. Modern dev tools decouple from Web 2.0.',
    verdictScore: 74,
    marketDynamics: 'Developer velocity movement accelerates; engineering squads push bottom-up adoption; seat-tax friction begins.',
    techMilestone: 'OPFS (Origin Private File System) + WASM SQLite cache; early WebSocket distributed gateways.',
  },
  2025: {
    year: 2025,
    title: 'Open Weights & Autonomous Agent Surge',
    narrative: 'AI coding tools (Cursor, Windsurf) and automated PR agents explode. Plane hits 25k stars. Open weights challenge proprietary cloud APIs.',
    verdictScore: 81,
    marketDynamics: 'Enterprises demand private VPC model execution; air-gapped data residency becomes critical procurement wedge.',
    techMilestone: 'Edge API routing (Cloudflare/Fastly); pgvector integrated into core relational schemas; early Nebius GPU inference.',
  },
  2026: {
    year: 2026,
    title: 'Active: Sovereign Multi-Agent & Zero-Latency Fabric',
    narrative: 'Mature 4-pillar defensibility. Plane reaches 30k+ stars. NVIDIA Nemotron-70B on Nebius Token Factory powers autonomous due diligence.',
    verdictScore: 85,
    marketDynamics: 'Sovereign cloud dominance; sub-50ms keyboard ergonomics; verified multi-agent due-diligence pipelines.',
    techMilestone: 'Distributed WebSockets + ElectricSQL/Yjs CRDTs + NVIDIA Llama-3.1-Nemotron-70B-Instruct on Nebius.',
  },
};

export function applyTemporalEvolution(report: IntelligenceReport, year: EvolutionYear): IntelligenceReport {
  const snapshot = TEMPORAL_SNAPSHOTS[year];

  // Adjust competitors based on historical year
  const evolvedCompetitors = report.competitors.map((comp) => {
    if (comp.name.toLowerCase().includes('jira')) {
      return {
        ...comp,
        marketShare: year === 2023 ? '88% Absolute Market Dominance' : year === 2024 ? '79% Dominant' : year === 2025 ? '72% Incumbent' : comp.marketShare,
        pricingEstimate: year === 2023 ? '$7.50 / user / mo' : year === 2024 ? '$8.50 - $15.00 / user' : comp.pricingEstimate,
      };
    }
    if (comp.name.toLowerCase().includes('plane')) {
      return {
        ...comp,
        marketShare: year === 2023 ? 'Early Alpha (v0.1 / 2k stars)' : year === 2024 ? '15k+ GitHub Stars' : year === 2025 ? '25k+ Stars' : comp.marketShare,
        pricingEstimate: year === 2023 ? 'Free Beta' : comp.pricingEstimate,
      };
    }
    return comp;
  });

  // Adjust tech stack based on historical evolution
  const evolvedTechStack = report.techStackAnalysis.map((tech) => {
    if (tech.component.toLowerCase().includes('data') || tech.component.toLowerCase().includes('sync')) {
      return {
        ...tech,
        competitorChoice: year === 2023 ? 'Monolithic PostgreSQL Server Queries' : year === 2024 ? 'WebSocket Polls + LocalStorage' : tech.competitorChoice,
        recommendedOpenStack: year === 2023 ? 'AWS RDS Aurora' : year === 2024 ? 'Redis Cache + WebSockets' : tech.recommendedOpenStack,
        scalabilityRating: year === 2023 ? 3 : year === 2024 ? 4 : tech.scalabilityRating,
      };
    }
    if (tech.component.toLowerCase().includes('client') || tech.component.toLowerCase().includes('offline')) {
      return {
        ...tech,
        competitorChoice: year === 2023 ? 'In-Memory React State (No Offline)' : year === 2024 ? 'IndexedDB Blob Cache' : tech.competitorChoice,
        recommendedOpenStack: year === 2023 ? 'Redux Toolkit + LocalStorage' : tech.recommendedOpenStack,
        scalabilityRating: year === 2023 ? 2 : year === 2024 ? 3 : tech.scalabilityRating,
      };
    }
    return tech;
  });

  return {
    ...report,
    verdictScore: snapshot.verdictScore,
    competitors: evolvedCompetitors,
    techStackAnalysis: evolvedTechStack,
    tagline: `${report.tagline} • [${year} Historical Snapshot: ${snapshot.title}]`,
  };
}
