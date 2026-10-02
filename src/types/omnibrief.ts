export type MoatStrengthLevel = 'Moderate' | 'Strong' | 'Dominant';
export type ExternalThreatLevel = 'Low' | 'Medium' | 'Elevated';
export type NodeWarGameImpact = 'strengthened' | 'squeezed' | 'disrupted' | 'neutral';
export type EUAIActRiskTier = 'Minimal Risk' | 'Limited Risk' | 'High Risk' | 'Unacceptable Risk';
export type DataResidency = 'European Union' | 'United States' | 'Global Multi-Region' | 'Unknown';

// Feature A: Live Citation DNA
export interface CitationDNAMatch {
  pillar: string;          // e.g. 'Data Gravity & History'
  claimText: string;       // the evidence sentence
  matchedSources: Array<{ title: string; url: string; excerpt: string; relevanceScore: number }>;
  overallConfidence: number; // 0-100
}

// Feature D: EU AI Act Sovereign Scorecard
export interface SovereignAudit {
  entityName: string;
  euAIActTier: EUAIActRiskTier;
  euAIActTierRationale: string;
  dataResidency: DataResidency;
  gdprCompliance: { score: number; notes: string; riskAreas: string[] };
  zeroRetentionAvailable: boolean;
  nebiusSovereignPath: { available: boolean; recommendation: string };
  overallSovereignScore: number;   // 0-100
  regulatoryRisks: string[];
  complianceAdvantages: string[];
  auditGeneratedAt: string;
}

export interface TavilySource {
  title: string;
  url: string;
  content: string;
  score?: number;
  publishedDate?: string;
}

export interface CompetitorData {
  id: string;
  name: string;
  marketShare: string;
  marketShareCitationUrl?: string;
  pricingModel: string;
  pricingEstimate?: string;
  strengths: string[];
  weaknesses: string[];
  url?: string;
  category: 'direct' | 'indirect' | 'emerging';
  lastVerified: string;
  status: 'active' | 'sunset' | 'acquired';
}

export interface TechStackItem {
  id: string;
  component: string;
  competitorChoice: string;
  recommendedOpenStack: string;
  whyItMatters: string;
  scalabilityRating: number;
  isRepoGrounded?: boolean;
  groundedSourceFile?: string;
  repoUrl?: string;
}

export interface ThreatMoatItem {
  id: string;
  factor: string;
  moatStrengthScore: number;
  moatStrengthLevel: MoatStrengthLevel;
  externalThreatLevel: ExternalThreatLevel;
  weightPercentage: number;
  pointContribution: number;
  details: string;
  mitigation: string;
}

export interface WhitespaceOpportunity {
  id: string;
  opportunity: string;
  addressableAudience: string;
  strategicAngle: string;
  estimatedImpact: 'High' | 'Very High' | 'Transformative';
}

export interface MoatRubricPillar {
  name: string;
  score: number;
  weight: number;
  pointsContributed: number;
  evidence: string;
  riskSummary: string;
}

export interface MoatRubric {
  compositeScore: number;
  formulaExplanation: string;
  dataGravity: MoatRubricPillar;
  switchingCosts: MoatRubricPillar;
  regulatoryCompliance: MoatRubricPillar;
  networkEffects: MoatRubricPillar;
}

export interface VerificationMetrics {
  totalClaimsChecked: number;
  verifiedGroundedClaims: number;
  uncorroboratedClaims: number;
  confidencePercentage: number;
  formula: string;
}

export interface AgentExecutionStep {
  id: string;
  agent: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: number;
  durationMs?: number;
  mode?: 'Live Nebius GPU' | 'Deterministic Baseline';
}

export interface WarGameScenario {
  id: string;
  title: string;
  prompt: string;
  compositeDelta: number; // e.g. -11 or +14
  newCompositeScore: number;
  casualtyReport: string;
  recommendedTactics: string[];
  nodeImpacts: {
    [nodeId: string]: {
      status: NodeWarGameImpact;
      note: string;
    };
  };
}

export interface HeadToHeadBattleCard {
  entityA: string;
  entityB: string;
  dimensions: Array<{
    dimension: string;
    scoreA: number;
    scoreB: number;
    winner: 'A' | 'B' | 'Tie';
    analysis: string;
  }>;
  overallAdvantage: string;
  tacticalWedge: string;
}

export interface IntelligenceReport {
  id: string;
  query: string;
  targetEntity: string;
  tagline: string;
  createdAt: string;
  verdictScore: number;
  moatRubric: MoatRubric;
  verificationMetrics: VerificationMetrics;
  executiveSummary: string;
  competitors: CompetitorData[];
  techStackAnalysis: TechStackItem[];
  threatMoatMatrix: ThreatMoatItem[];
  marketWhitespace: WhitespaceOpportunity[];
  citations: TavilySource[];
  executionSteps: AgentExecutionStep[];
  nebiusModelUsed: string;
  tavilyQueriesExecuted: string[];
  limitationsAndRisks: string[];
  executionMode: 'Live Nebius Token Factory' | 'Deterministic Baseline Mode';
  measuredLatencyMs?: number;
  activeWarGame?: WarGameScenario | null;
  headToHead?: HeadToHeadBattleCard | null;
  // Feature A: Live Citation DNA per moat pillar
  citationDNA?: CitationDNAMatch[];
  // Feature D: EU AI Act Sovereign Scorecard
  sovereignAudit?: SovereignAudit;
}

export type CanvasNodeType = 'rootEntity' | 'competitor' | 'techStack' | 'moat' | 'whitespace' | 'sharedClash';
