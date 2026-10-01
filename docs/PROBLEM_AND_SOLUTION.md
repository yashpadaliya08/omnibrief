# Problem Statement & Solution Architecture

## 1. The Core Problem: Due-Diligence is Broken

Founders, venture investors, technical leads, and product architects frequently need to answer critical strategic questions:
1. *Who are the true direct, adjacent, and emerging competitors in this domain?*
2. *What is their actual pricing model, and where are customers complaining about churn?*
3. *What does their underlying infrastructure look like, and where are the technical scalability bottlenecks?*
4. *What are the real defensibility moats (data gravity, switching costs, regulatory compliance)?*
5. *Where is the untapped white-space for a new entrant?*

### Today's Status Quo is Painfully Inefficient:
- **Manual Google & Gartner Sifting (10–20 Hours/Project):** Engineers and analysts jump between 40 open browser tabs, pricing pages, Reddit threads, and Hacker News posts.
- **Generic LLM Chatbots Hallucinate & Over-generalize:** Pasting a query into ChatGPT yields a generic wall of bullet points that lacks live pricing grounding, architecture analysis, or structured relationships.
- **Closed Cloud Lock-In & Astronomical Token Burn:** Using closed frontier models for repetitive recursive agent queries quickly becomes cost-prohibitive for startups and enterprises.
- **Static Walls of Text Lack Spatial Context:** Business strategy and software architecture are inherently relational networks. Text walls fail to convey how competitors, tech components, and moat risks interconnect.

---

## 2. The Solution: OmniBrief

**OmniBrief** is an autonomous market and technical due-diligence engine that replaces 15 hours of manual analysis with a **30-second multi-agent synthesis**.

Instead of a generic chat interface, OmniBrief produces two coordinated outputs:
1. **Interactive Spatial Knowledge Canvas (`@xyflow/react`):** A live topological node graph mapping the entity, rivals, architecture teardown, defensibility threats, and market white-spaces.
2. **Executive Due-Diligence Dossier:** A structured, verifiable executive memo ready for investment committees, board decks, and sprint roadmaps.

---

## 3. The Multi-Agent Workflow

```
[User Query]
      │
      ▼
┌────────────────────────────────────────────────────────┐
│ 1. SCOUT AGENT (Tavily AI Search)                      │
│ - Fires concurrent advanced web queries                │
│ - Scrapes pricing pages, discussions, and patch notes  │
│ - Filters and scores top ground-truth citations        │
└──────────────────────────┬─────────────────────────────┘
                           │ Grounded Context
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. REASONING AGENT (NVIDIA Nemotron 3 Ultra on Nebius) │
│ - Ingests live citations                               │
│ - Performs competitive positioning & moat calculation  │
│ - Conducts architectural trade-off analysis            │
│ - Formulates strategic wedges and counter-measures     │
└──────────────────────────┬─────────────────────────────┘
                           │ Structured JSON Schema
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. TOPOLOGY COMPILER (Nemotron Nano / Heuristic Engine)│
│ - Computes relational node graph coordinates           │
│ - Generates color-coded custom XYFlow nodes            │
│ - Connects animated dependency and threat edges        │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
[Interactive Visual Canvas]    [Executive Dossier Memo]
 - Drag, zoom, minimap          - Moat Viability Score
 - Slide-in node inspector      - Architecture teardown table
 - Source verification links    - 1-click MD & MCP Export
```

---

## 4. Why Nebius Token Factory & NVIDIA Nemotron?

| Advantage | Why It Matters for OmniBrief |
| :--- | :--- |
| **High-Throughput GPU Inference** | Nebius Token Factory provides ultra-low latency token generation, allowing our multi-agent pipeline to return deep synthesis in seconds rather than minutes. |
| **Nemotron 3 Ultra Reasoning** | NVIDIA Nemotron models excel at complex structured reasoning, architectural evaluation, and multi-step logic without hallucinating data models. |
| **Open Sovereign Infrastructure** | Running on Nebius ensures that proprietary startup concepts and sensitive enterprise due-diligence data are never leaked or used to train third-party models. |
| **Up to 65% Inference Cost Reduction** | Open-weight Nemotron inference on Nebius drastically lowers the cost per report compared to proprietary closed APIs, making high-volume analysis economically viable. |

---

## 5. Why the Interactive Visual Canvas Wins

1. **Immediate Cognitive Synthesis:** Users instantly perceive the competitive balance (direct vs. adjacent) and architectural weak points through visual clustering and color-coded risk levels.
2. **Interactive Drill-Down:** Clicking any node reveals the exact technical rationale, defensibility score, and direct Tavily source links.
3. **Dual Perspective (Business + Engineering):** Connects commercial metrics (pricing, market share, churn) directly with infrastructure choices (databases, sync engines, and edge compute).
