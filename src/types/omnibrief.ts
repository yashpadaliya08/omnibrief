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

export interface AgentExecutionStep {
  id: string;
  agent: 'Scout Agent (Tavily)' | 'Reasoning Agent (Nemotron 3 Ultra)' | 'Graph Compiler (Nemotron Nano)' | 'Synthesizer';
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
  verdictScore: number; // 0 to 100 overall viability / moat index
  executiveSummary: string;
  competitors: CompetitorData[];
  techStackAnalysis: TechStackItem[];
  threatMoatMatrix: ThreatMoatItem[];
  marketWhitespace: WhitespaceOpportunity[];
  citations: TavilySource[];
  executionSteps: AgentExecutionStep[];
  nebiusModelUsed: string;
  tavilyQueriesExecuted: string[];
}

export type CanvasNodeType = 'rootEntity' | 'competitor' | 'techStack' | 'moat' | 'whitespace';
