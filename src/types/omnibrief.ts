export type MoatStrengthLevel = 'Moderate' | 'Strong' | 'Dominant';
export type ExternalThreatLevel = 'Low' | 'Medium' | 'Elevated';

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
  lastVerified: string; // e.g. "October 2026"
  status: 'active' | 'sunset' | 'acquired';
}

export interface TechStackItem {
  id: string;
  component: string;
  competitorChoice: string;
  recommendedOpenStack: string;
  whyItMatters: string;
  scalabilityRating: number; // 1 to 5
}

export interface ThreatMoatItem {
  id: string;
  factor: string;
  moatStrengthScore: number; // 0 to 100
  moatStrengthLevel: MoatStrengthLevel;
  externalThreatLevel: ExternalThreatLevel;
  weightPercentage: number; // e.g. 30 for 30%
  pointContribution: number; // e.g. 25.5
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
  score: number; // 0 to 100
  weight: number; // 0.0 to 1.0
  pointsContributed: number;
  evidence: string;
  riskSummary: string;
}

export interface MoatRubric {
  compositeScore: number; // Reconciled 0 to 100
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

export interface IntelligenceReport {
  id: string;
  query: string;
  targetEntity: string;
  tagline: string;
  createdAt: string;
  verdictScore: number; // Composite Moat Viability Index (0 to 100)
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
}

export type CanvasNodeType = 'rootEntity' | 'competitor' | 'techStack' | 'moat' | 'whitespace';
