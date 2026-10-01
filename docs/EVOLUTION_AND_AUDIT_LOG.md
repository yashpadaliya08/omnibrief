# OmniBrief — Evolution, Audit Log & Upgrade Strategy

## 1. Executive Summary & Purpose
This document provides a transparent, engineering-grade record of **OmniBrief's development trajectory**, auditing the initial version's blindspots/mistakes, detailing the current version's concrete solutions, and outlining the next high-value technical upgrades.

---

## 2. Retrospective: Initial Version vs. Current Version (v1.1.0)

| Area | Initial Version (v0.1.0) Blindspots & Mistakes | Current Version (v1.1.0) Concrete Solution |
| :--- | :--- | :--- |
| **Moat Scoring** | **Black Box:** Single arbitrary score (e.g. "86/100") with no visible formula, evidence, or weighting. | **Transparent 4-Pillar Rubric:** Explicit mathematical formula: `(0.30 * Data Gravity) + (0.30 * Switching Costs) + (0.20 * Sovereignty) + (0.20 * Network Effects)`, each scored independently with cited evidence and risk summaries. |
| **Accuracy & Hallucinations** | **Overclaimed:** Claimed "doesn't hallucinate", which damages credibility since no LLM can guarantee zero hallucinations. | **Critic & Verification Agent:** Pipeline expanded to 4 stages with an explicit Critic Agent cross-referencing claims against citations and assigning a **Citation Confidence Score** (e.g. 92%). |
| **Marketing Language** | **Unproven Claims:** Used unmeasured claims like "30 seconds", "15 hours replaced", and "up to 65% cost reduction". | **Grounded Metrics:** Softened to verifiable estimates: *"reduces an estimated 10 to 20 hours of manual research"* and cited Nebius Token Factory's per-million token pricing relative to closed proprietary endpoints. |
| **Competitive Differentiation** | **Vague:** Did not plainly explain why someone wouldn't just use Perplexity or ChatGPT Deep Research. | **Defensible Positioning Matrix:** Highlighted the 3 core moats: 1) Interactive Spatial Graph (`@xyflow/react`) vs. text walls; 2) Dual Business + Engineering architecture teardowns; 3) Open, sovereign deployment on Nebius with Zero-Retention API guarantees. |
| **Target User & Persona** | **Unspecified:** Targeted "everyone" (founders, VCs, analysts, devs). | **Explicit Primary Persona:** Seed-to-Series A VC Associates & Technical Co-founders performing technical due diligence and system architecture evaluations. |
| **Analytical Boundaries** | **Ignored:** Did not discuss stale data or limitations. | **Explicit Limitations Section:** Added dedicated callouts for public web index lag, paywalled filings, and pricing fluidity. |
| **Model Context Protocol (MCP)** | **Mentioned without context:** Dropped "MCP" without explaining utility. | **Standardized Bundle Schema:** Fully documented JSON context pack conforming to the MCP specification, ready for Cursor, Claude Desktop, and Windsurf. |

---

## 3. Current Architecture & Solution Breakdown (v1.1.0)

### A. The 4-Stage Multi-Agent Swarm
```
1. SCOUT AGENT (Tavily AI Search)
   └── Executes concurrent deep web search queries for pricing, tech stacks, and discussions.
2. REASONING AGENT (NVIDIA Nemotron 3 Ultra on Nebius Token Factory)
   └── Evaluates competitive positioning, architecture tradeoffs, and 4-pillar moat metrics.
3. CRITIC & VERIFICATION AGENT (Nemotron Nano)
   └── Cross-references factual claims against citations and assigns a Confidence Score (0-100%).
4. GRAPH TOPOLOGY COMPILER (@xyflow/react)
   └── Transforms relational JSON into color-coded spatial clusters with animated edges.
```

### B. Transparent Moat Rubric Breakdown
1. **Data Gravity & History (30% Weight):** Schema lock-in, proprietary data formats, historical git commit linkages, audit trail retention, and export friction.
2. **Switching Costs & Muscle Memory (30% Weight):** Keyboard keymaps (Cmd+K), developer IDE hooks, sub-50ms local sync habits, and workflow entrenchment.
3. **Sovereignty & Compliance (20% Weight):** SOC2 Type II, GDPR, HIPAA, and exposure to emerging European / US enterprise data privacy mandates.
4. **Network & Ecosystem Effects (20% Weight):** Multiplayer sync, third-party webhook integrations, and public API developer ecosystems.

---

## 4. Next High-Value Upgrades & Roadmap

### Upgrade 1: Streaming Node Sprouts (Live Visual Sprouting)
- **Current State:** The entire graph renders at once when the backend finishes compilation.
- **Upgrade:** Stream Server-Sent Events (SSE) from `/api/analyze` so that as each stage completes:
  1. Root node appears and pulses.
  2. Competitor nodes pop up one by one with spring physics.
  3. Architecture nodes connect below.
  4. Moat and white-space nodes sprout on the flanks.
- **Why It Matters:** Gives the judge an unforgettable visual "wow" factor during the live demo video.

### Upgrade 2: Direct Branded PDF Export
- **Current State:** Exports Markdown (`.md`) and MCP JSON (`.json`).
- **Upgrade:** Integrate print CSS / `@react-pdf/renderer` for a 1-click **Download Investor Memo (PDF)** featuring clean dark/light theme options, radar charts, and formatted tables.
- **Why It Matters:** Investors and founders want an instant, professional deliverable to drop into pitch decks or email to their partners.

### Upgrade 3: 1-Click Mermaid & Architecture Diagram Export
- **Current State:** Architecture comparisons are viewable on the canvas and in markdown tables.
- **Upgrade:** Add a button to copy the architecture as a **Mermaid.js diagram** (`flowchart TD`) for direct pasting into GitHub PRs, Notion docs, or architecture RFCs.
- **Why It Matters:** Directly targets the developer audience and showcases technical utility.

### Upgrade 4: Side-by-Side Dual-Entity Benchmark Canvas
- **Current State:** Evaluates one company or domain at a time (e.g. `Linear.app`).
- **Upgrade:** Allow entering two targets (e.g., `Linear.app vs. Jira` or `Cursor vs. Windsurf`) and render a comparative canvas showing shared architectural nodes and diverging moats.

---

## 5. Devpost Submission Next Steps

1. **Step 2 (Project Overview):** Completed (Project name, elevator pitch, thumbnail).
2. **Step 3 (Project Details):** Paste the polished answers from [`docs/SUBMISSION_PITCH_GUIDE.md`](./SUBMISSION_PITCH_GUIDE.md) into the "What it does", "How we built it", "Challenges", "Accomplishments", and "What we learned" fields.
3. **Step 4 (Additional Info):** Select **Best Apps and Agents Track** and check the **Best Use of Tavily** bounty.
4. **Step 5 (Submit):** Provide public GitHub repo link and demo link.
