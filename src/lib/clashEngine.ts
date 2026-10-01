import { HeadToHeadBattleCard, IntelligenceReport } from '@/types/omnibrief';

export function isHeadToHeadQuery(query: string): { isClash: boolean; entityA: string; entityB: string } {
  const clean = query.trim();
  const vsRegex = /\b(?:vs\.?|versus)\b/i;
  if (!vsRegex.test(clean)) {
    return { isClash: false, entityA: '', entityB: '' };
  }

  const parts = clean.split(vsRegex);
  if (parts.length >= 2) {
    const entityA = parts[0].trim();
    const entityB = parts[1].trim();
    if (entityA && entityB) {
      return { isClash: true, entityA, entityB };
    }
  }

  return { isClash: false, entityA: '', entityB: '' };
}

export function generateHeadToHeadBattleCard(entityA: string, entityB: string): HeadToHeadBattleCard {
  const normA = entityA.toLowerCase();
  const normB = entityB.toLowerCase();

  // Preset 1: Linear vs Jira
  if ((normA.includes('linear') && normB.includes('jira')) || (normA.includes('jira') && normB.includes('linear'))) {
    const isLinearFirst = normA.includes('linear');
    const linearName = isLinearFirst ? entityA : entityB;
    const jiraName = isLinearFirst ? entityB : entityA;

    return {
      entityA: linearName,
      entityB: jiraName,
      dimensions: [
        {
          dimension: 'Latency & Keyboard Ergonomics',
          scoreA: 98,
          scoreB: 42,
          winner: 'A',
          analysis: `${linearName}'s local-first CRDT sync engine and instant Cmd+K command palette enables sub-50ms interaction loops, whereas ${jiraName}'s legacy server-rendered DOM tables suffer from 1,200ms+ page roundtrips.`,
        },
        {
          dimension: 'Enterprise Compliance & Auditability',
          scoreA: 78,
          scoreB: 96,
          winner: 'B',
          analysis: `${jiraName} maintains 20+ years of enterprise trust, complex SOX compliance workflows, fine-grained multi-level permission schemes, and air-gapped GovCloud certifications.`,
        },
        {
          dimension: 'Pricing Transparency & TCO',
          scoreA: 89,
          scoreB: 54,
          winner: 'A',
          analysis: `${linearName} charges clean, predictable $8–$14/seat pricing without hidden maintenance tiers. ${jiraName} forces enterprise bundles, complex Atlassian Access add-on seat taxation, and consulting partner overhead.`,
        },
        {
          dimension: 'Developer Love & Velocity',
          scoreA: 95,
          scoreB: 35,
          winner: 'A',
          analysis: 'Developer sentiment strongly favors opinionated git-first issue tracking. Engineers voluntarily use Linear, while Jira is frequently perceived as an executive surveillance tool.',
        },
        {
          dimension: 'Ecosystem & Marketplace Extensibility',
          scoreA: 68,
          scoreB: 98,
          winner: 'B',
          analysis: `${jiraName}'s Atlassian Marketplace hosts over 3,000+ custom enterprise plugins, bespoke SAP/Salesforce connectors, and workflow automation extensions that keep legacy IT locked in.`,
        },
      ],
      overallAdvantage: `${linearName} (Modern High-Growth Teams) / ${jiraName} (Legacy Global 2000)`,
      tacticalWedge: `Wedge into enterprise accounts through high-performing engineering squads using bidirectional GitHub/GitLab issue mirrors, bypassing central IT procurement until departmental adoption reaches critical mass.`,
    };
  }

  // Preset 2: Cursor vs Windsurf
  if ((normA.includes('cursor') && normB.includes('windsurf')) || (normA.includes('windsurf') && normB.includes('cursor'))) {
    const isCursorFirst = normA.includes('cursor');
    const cName = isCursorFirst ? entityA : entityB;
    const wName = isCursorFirst ? entityB : entityA;

    return {
      entityA: cName,
      entityB: wName,
      dimensions: [
        {
          dimension: 'Multi-File Agentic Context Engine',
          scoreA: 94,
          scoreB: 91,
          winner: 'A',
          analysis: `${cName}'s custom shadow workspace and fast semantic indexing index entire codebases with sub-second retrieval, while ${wName} uses Cascade flows with deep agentic execution trees.`,
        },
        {
          dimension: 'Terminal & Tool Interrogation',
          scoreA: 88,
          scoreB: 93,
          winner: 'B',
          analysis: `${wName} excels at autonomous terminal command execution and persistent agent memory across multi-step shell environments.`,
        },
        {
          dimension: 'Developer Mindshare & Velocity',
          scoreA: 96,
          scoreB: 82,
          winner: 'A',
          analysis: `${cName} holds massive early-mover developer momentum, Twitter virality, and viral enterprise seat expansion across AI startups.`,
        },
        {
          dimension: 'Enterprise Privacy & Self-Hosted Fallback',
          scoreA: 85,
          scoreB: 87,
          winner: 'Tie',
          analysis: 'Both platforms offer SOC2 Type II compliance and zero-data-retention modes, but face enterprise scrutiny over proprietary code transmission to frontier LLM APIs.',
        },
      ],
      overallAdvantage: `${cName} (Ecosystem Mindshare) / ${wName} (Autonomous Shell Execution)`,
      tacticalWedge: `Deploy open-weight inference (NVIDIA Nemotron on Nebius Token Factory) directly into the agent backend to ensure zero third-party telemetry and air-gapped enterprise compliance.`,
    };
  }

  // Preset 3: Supabase vs Firebase
  if ((normA.includes('supabase') && normB.includes('firebase')) || (normA.includes('firebase') && normB.includes('supabase'))) {
    const isSupabaseFirst = normA.includes('supabase');
    const sName = isSupabaseFirst ? entityA : entityB;
    const fName = isSupabaseFirst ? entityB : entityA;

    return {
      entityA: sName,
      entityB: fName,
      dimensions: [
        {
          dimension: 'Relational Integrity & SQL Power',
          scoreA: 98,
          scoreB: 50,
          winner: 'A',
          analysis: `${sName} is built on raw PostgreSQL with extensions (pgvector, PostGIS, Row Level Security), eliminating NoSQL document querying limitations inherent to Firestore.`,
        },
        {
          dimension: 'Vendor Lock-in Freedom',
          scoreA: 97,
          scoreB: 35,
          winner: 'A',
          analysis: `${sName} is 100% open-source and self-hostable via Docker/Kubernetes. ${fName} is deeply coupled with Google Cloud Platform proprietary infrastructure.`,
        },
        {
          dimension: 'Mobile Push & Analytics Ecosystem',
          scoreA: 76,
          scoreB: 96,
          winner: 'B',
          analysis: `${fName} leverages Google's native mobile SDKs (FCM, Crashlytics, Remote Config, Google Analytics for mobile apps) seamlessly.`,
        },
        {
          dimension: 'Vector & AI Readiness (pgvector)',
          scoreA: 95,
          scoreB: 60,
          winner: 'A',
          analysis: `Native pgvector support allows ${sName} to act as the primary database AND vector store for RAG pipelines without requiring a separate vector database.`,
        },
      ],
      overallAdvantage: `${sName} (Relational & AI Dominance) / ${fName} (Mobile Push Ecosystem)`,
      tacticalWedge: `Leverage pgvector and zero vendor lock-in to capture modern AI-native applications migrating away from costly proprietary cloud databases.`,
    };
  }

  // Generic dynamic battle card generator for any two entities
  return {
    entityA,
    entityB,
    dimensions: [
      {
        dimension: 'Developer Ergonomics & Velocity',
        scoreA: 88,
        scoreB: 76,
        winner: 'A',
        analysis: `${entityA} demonstrates superior bottom-up developer appeal and keyboard-first velocity compared to ${entityB}.`,
      },
      {
        dimension: 'Enterprise Compliance & Security',
        scoreA: 75,
        scoreB: 92,
        winner: 'B',
        analysis: `${entityB} retains established enterprise governance frameworks, compliance certifications, and procurement relationships.`,
      },
      {
        dimension: 'Pricing Transparency & TCO',
        scoreA: 90,
        scoreB: 68,
        winner: 'A',
        analysis: `${entityA} offers more transparent consumption or seat tiers with lower friction to trial.`,
      },
      {
        dimension: 'Architectural Modernity & Extensibility',
        scoreA: 92,
        scoreB: 74,
        winner: 'A',
        analysis: `${entityA} utilizes modern decoupled, API-first architecture compared to ${entityB}'s legacy monolithic infrastructure.`,
      },
    ],
    overallAdvantage: `${entityA} (Modern Developer Velocity) / ${entityB} (Enterprise Scale)`,
    tacticalWedge: `Target dissatisfied mid-market users of ${entityB} by offering zero-friction migration scripts and local-first performance.`,
  };
}
