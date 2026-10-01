export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TavilySource {
  title: string;
  url: string;
  content: string;
  score?: number;
}

export interface CompetitorData {
  id: string;
  name: string;
  marketShare: string;
  pricingModel: string;
  pricingEstimate?: string;
  strengths: string[];
  weaknesses: string[];
  url?: string;
  category: 'direct' | 'indirect' | 'emerging';
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
  riskLevel: RiskLevel;
  defensibilityScore: number; // 0 to 100
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
  evidence: string;
  riskSummary: string;
}

export interface MoatRubric {
  compositeScore: number; // Weighted 0 to 100
  dataGravity: MoatRubricPillar;
  switchingCosts: MoatRubricPillar;
  regulatoryCompliance: MoatRubricPillar;
  networkEffects: MoatRubricPillar;
}

export interface AgentExecutionStep {
  id: string;
  agent: 'Scout Agent (Tavily)' | 'Reasoning Agent (Nemotron 3 Ultra)' | 'Critic & Verification Agent (Nemotron)' | 'Graph Topology Compiler (Nemotron Nano)';
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: number;
  details?: string;
}

export interface IntelligenceReport {
  id: string;
  query: string;
  targetEntity: string;
  tagline: string;
  createdAt: string;
  verdictScore: number; // Composite Moat Viability Index (0 to 100)
  moatRubric: MoatRubric;
  citationConfidenceScore: number; // 0 to 100 confidence verified by Critic Agent
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
}

export type CanvasNodeType = 'rootEntity' | 'competitor' | 'techStack' | 'moat' | 'whitespace';
