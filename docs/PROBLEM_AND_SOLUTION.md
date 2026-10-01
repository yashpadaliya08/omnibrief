# Problem Statement, Differentiation & Solution Architecture

## 1. The Real-World Problem: Manual Research is High-Friction and Unstructured

Founders, venture investors (especially seed and Series A associates), and engineering leads frequently need to evaluate competitive markets and technical systems before making investment or architecture commitments:
1. *Who are the true direct, adjacent, and emerging competitors in this domain?*
2. *What is their actual pricing model, and where are customers complaining about churn?*
3. *What does their underlying infrastructure look like, and where are the technical scalability bottlenecks?*
4. *What are the real defensibility moats (data gravity, switching costs, regulatory compliance)?*
5. *Where is the untapped white-space for a new entrant?*

### Today's Limitations & Industry Alternatives:
- **Manual Web Research (Estimated 10–20 Hours per Target):** Analysts manually jump between 30–50 open tabs—pricing tables, Reddit retrospectives, Hacker News threads, and GitHub repositories—synthesizing qualitative findings into ad-hoc slide decks.
- **Legacy Market Platforms (CB Insights, PitchBook, Gartner):** Extremely expensive ($15,000–$30,000/year contracts), inaccessible to early-stage founders, lagging behind modern open-source repositories, and lacking engineering architecture teardowns.
- **Generalist AI Chatbots (ChatGPT, Perplexity Pro):** Great for consumer conversational queries, but output static, linear walls of markdown. They lack spatial relational graphs, don't break down backend architectures (e.g. SQLite local sync vs. Postgres CRDTs), and provide opaque, unverified generalizations.

---

## 2. The Solution: OmniBrief

**OmniBrief turns a company or idea into a verified competitive map and memo in under a minute, powered by open models on Nebius.**

Instead of producing another wall of static text, OmniBrief provides:
1. **Interactive Spatial Knowledge Canvas (`@xyflow/react`):** A dynamic topological node graph visually mapping the central entity, direct/indirect rivals, architecture teardown, defensibility threats, and market white-spaces.
2. **Transparent 4-Pillar Moat Rubric:** Breaks down defensibility into quantifiable, evidence-backed scores rather than an arbitrary black box.
3. **Dual Business + Engineering Perspective:** Connects commercial metrics (pricing, market share, CAC) directly with technical architecture choices (databases, sync engines, and GPU compute).
4. **Critic & Verification Agent:** Mitigates hallucination risk by cross-referencing claims against extracted citations with an explicit confidence score.
5. **Model Context Protocol (MCP) Export:** 1-click export of an official MCP JSON bundle that drops directly into AI IDEs (Cursor, Claude Desktop, Windsurf).

---

## 3. Direct Competitor Comparison & Differentiation

| Feature / Dimension | Legacy Platforms (PitchBook / CB Insights) | Generalist AI (Perplexity / ChatGPT Deep Research) | **OmniBrief (Our Project)** |
| :--- | :--- | :--- | :--- |
| **Primary Audience** | Late-stage VCs, PE firms, enterprise execs | General consumers, students, knowledge workers | **Seed/Series A VC Associates & Technical Co-Founders** |
| **Output Format** | Static PDF / tabular database | Linear text / markdown stream | **Interactive Spatial Graph (@xyflow/react) + Executive Memo** |
| **Architecture Teardown** | ❌ None (financial/commercial only) | ❌ Superficial or generic | **✅ Deep Component-by-Component (Current vs. Recommended Open Stack)** |
| **Moat Scoring** | ⚠️ Proprietary / Black-Box | ❌ None | **✅ Transparent 4-Pillar Rubric with Evidence & Weights** |
| **Infrastructure** | Proprietary closed databases | Closed cloud endpoints (OpenAI / Anthropic) | **Open-weight NVIDIA Nemotron on Nebius Token Factory** |
| **Data Privacy Policy** | Enterprise silo | Closed provider retention policies | **Sovereign GPU Cloud with Zero-Retention API guarantees** |
| **Developer Integration** | None | Raw text copy-paste | **Official Model Context Protocol (MCP) JSON bundle** |

---

## 4. Transparent Moat Viability Rubric

Rather than presenting an arbitrary "black-box" number, OmniBrief's composite **Moat Viability Index (0–100)** is calculated via a strictly weighted, evidence-backed formula:

$$\text{Composite Score} = (0.30 \times \text{Data Gravity}) + (0.30 \times \text{Switching Costs}) + (0.20 \times \text{Sovereignty}) + (0.20 \times \text{Network Effects})$$

### The 4 Pillars:
1. **Data Gravity & History (30% Weight):** Evaluates proprietary schema formats, historical git commit linkages, audit trail retention, and export friction.
2. **Switching Costs & Muscle Memory (30% Weight):** Evaluates keyboard command palette familiarity (Cmd+K), developer IDE hooks, and workflow entrenchment.
3. **Sovereignty & Compliance (20% Weight):** Evaluates SOC2 Type II compliance, GDPR, HIPAA, and exposure to emerging European / US enterprise data privacy mandates.
4. **Network & Ecosystem Effects (20% Weight):** Evaluates multiplayer collaboration, third-party webhook integrations, and public API developer ecosystems.

---

## 5. Mitigating Hallucinations: The 4-Stage Agent Swarm

No LLM can guarantee zero hallucinations. OmniBrief explicitly mitigates this risk through a multi-agent validation pipeline:

```
[User Query / Target Competitor]
                │
                ▼
┌────────────────────────────────────────────────────────┐
│ 1. SCOUT AGENT (Tavily AI Search)                      │
│ - Executes concurrent advanced web queries             │
│ - Retrieves real-time pricing, sentiment, and filings  │
│ - Filters and extracts top ground-truth citations      │
└───────────────────────┬────────────────────────────────┘
                        │ Grounded Sources
                        ▼
┌────────────────────────────────────────────────────────┐
│ 2. REASONING AGENT (NVIDIA Nemotron 3 Ultra on Nebius) │
│ - Ingests live citations into structured prompt        │
│ - Evaluates competitive positioning & architecture     │
│ - Computes raw 4-pillar defensibility rubric           │
└───────────────────────┬────────────────────────────────┘
                        │ Candidate Report JSON
                        ▼
┌────────────────────────────────────────────────────────┐
│ 3. CRITIC & VERIFICATION AGENT (Nemotron Nano)         │
│ - Cross-references every factual assertion to a source │
│ - Flags unsupported claims & computes Confidence Score │
│ - Adds Analytical Limitations & Data Boundaries        │
└───────────────────────┬────────────────────────────────┘
                        │ Verified Schema
                        ▼
┌────────────────────────────────────────────────────────┐
│ 4. GRAPH TOPOLOGY COMPILER (@xyflow/react)             │
│ - Computes radial/hierarchical node coordinates        │
│ - Renders custom color-coded interactive canvas        │
└───────────────────────┬────────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
[Interactive Visual Canvas]    [Executive Dossier Memo]
 - Drag, zoom, minimap          - Moat Viability Score
 - Slide-in node inspector      - Architecture teardown table
 - Source verification links    - 1-click MD & MCP Export
```

---

## 6. Infrastructure & Sovereignty: Why Nebius & NVIDIA Nemotron?

- **Nebius Token Factory GPU Performance:** Delivers ultra-low latency token inference, enabling our multi-agent pipeline to return deep synthesis in under a minute.
- **Structured JSON Schema Fidelity:** NVIDIA Nemotron models demonstrate superior instruction adherence when generating nested, strictly typed JSON schemas for graph compilation.
- **Sovereign Data Guarantees:** Nebius Token Factory adheres to a strict Zero Data Retention policy for API inference, ensuring sensitive due-diligence data and proprietary concepts are never used for model re-training.

---

## 7. Limitations & Analytical Risks

To maintain rigorous credibility, OmniBrief acknowledges the following data boundaries:
1. **Public Web Index Lag:** Citations reflect publicly accessible web data and may lag private enterprise contracts or bespoke sales agreements.
2. **Paywalled Content:** Financial metrics are limited to public disclosures, press releases, and founder retrospectives.
3. **Pricing Fluidity:** SaaS pricing tiers update frequently; estimates should be confirmed directly with vendor sales teams.
