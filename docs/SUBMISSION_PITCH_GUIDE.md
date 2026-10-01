# Devpost Submission Kit & Pitch Guide

Use this guide when submitting OmniBrief to the **Nebius x NVIDIA Global AI Hackathon** on Devpost and recording your 3-minute demonstration video.

---

## 1. Devpost Submission Form (Copy & Paste Ready)

### Project Title
**OmniBrief — Autonomous Market & Technical Due-Diligence Engine**

### Elevator Pitch / Tagline (120 characters max)
*Instant competitive intelligence, architecture teardowns, and defensibility moats on Nebius & NVIDIA Nemotron.*

---

### What it does
OmniBrief turns hours of tedious competitive research, architecture reviews, and pricing comparisons into an instant, interactive spatial intelligence canvas and executive memo.

When an analyst, founder, or engineer queries any product, competitor, or domain (e.g., Linear, Cursor, Supabase, or a new startup idea):
1. **Scout Agent (Tavily AI Search)** scans the live web for real-time pricing models, customer sentiment, and tech stack discussions.
2. **Reasoning Agent (NVIDIA Nemotron 3 Ultra on Nebius Token Factory)** evaluates competitive moats, performs architectural trade-off analysis, and identifies defensibility vulnerabilities.
3. **Graph Topology Compiler** maps the intelligence into an interactive `@xyflow/react` node canvas with color-coded nodes (Competitors, Architecture, Threat Moats, and Market White-Space).
4. Users can click any node to inspect deep-dive technical rationale with cited sources, export an **Executive Due-Diligence Memo (`.md`)**, or download an official **Model Context Protocol (MCP)** bundle for Cursor and Claude Desktop.

---

### How we built it
- **Nebius Token Factory & NVIDIA Models:** We deployed `nvidia/Llama-3.1-Nemotron-70B-Instruct-HF` and `nvidia/nemotron-4-340b-instruct` on Nebius GPU Cloud, leveraging its high-throughput inference for multi-agent reasoning and structured JSON output.
- **Tavily AI Search:** Integrated advanced search endpoints to ground the reasoning agents with live citations, pricing tiers, and community discussions.
- **Interactive Spatial Canvas:** Built with Next.js 16, React 19, and `@xyflow/react` to provide an interactive topological visualization rather than a static text chat.
- **Model Context Protocol (MCP):** Structured the synthesized output into standardized MCP JSON bundles that integrate directly with modern AI IDEs.

---

### Challenges we ran into
- **Balancing Reasoning Depth with Token Latency:** Running multi-agent evaluations can easily become slow. By optimizing structured prompt schemas and routing between Nemotron models on Nebius Token Factory, we achieved sub-second JSON generation.
- **Graph Topology Auto-Layout:** Ensuring dynamic node generation didn't produce overlapping nodes or tangled edges. We implemented an equidistant radial/hierarchical coordinate mapper that groups node clusters logically around the target entity.
- **Ensuring Zero-Setup Testability for Judges:** Many hackathon submissions fail because judges lack custom API keys. We engineered an autonomous simulation fallback that provides realistic, high-fidelity due diligence even if keys are omitted.

---

### Accomplishments that we're proud of
- Eliminating the "boring chat window" paradigm by delivering an interactive, spatial `@xyflow/react` canvas that visualizes business strategy alongside system architecture.
- Seamlessly integrating **NVIDIA Nemotron on Nebius Token Factory** with **Tavily AI Search**.
- Full end-to-end production build on Next.js 16 (Turbopack) with 100% strict TypeScript compliance.

---

### What we learned
- How NVIDIA Nemotron's structured reasoning capabilities significantly reduce hallucination in complex technical teardowns compared to standard instruction models.
- The efficiency of Nebius Token Factory's inference endpoints for multi-agent workflows.

---

### What's next for OmniBrief
- Background competitor monitoring via Nebius Serverless Jobs.
- Direct PDF report compilation with branded investor decks.
- Real-time streaming node sprouts on the canvas.

---

## 2. 3-Minute YouTube Video Script & Storyboard

| Timestamp | Screen Display | Voiceover / Script |
| :---: | :--- | :--- |
| **0:00 - 0:30** | Landing Page / Search Box | *"Hey everyone! Doing competitive market research and technical due diligence takes hours of jumping between 50 browser tabs. Today, we built OmniBrief for the Nebius x NVIDIA Global AI Hackathon."* |
| **0:30 - 1:15** | Typing query & clicking **Analyze** (e.g. `Linear.app` or `Cursor.sh`) | *"When we enter a query, OmniBrief launches a multi-agent swarm. First, the Scout Agent uses Tavily to scour the live web for pricing and GitHub discussions. Then, NVIDIA Nemotron 3 Ultra on Nebius Token Factory performs deep architectural and defensibility synthesis."* |
| **1:15 - 2:00** | Interactive XYFlow Canvas | *"Instead of giving you a wall of text, OmniBrief compiles an interactive spatial canvas using React Flow. Here we see competitors in rose, architecture teardowns in cyan, defensibility moats in amber, and market white-spaces in emerald. Clicking any node opens our slide-in inspector with verified Tavily citations."* |
| **2:00 - 2:30** | Executive Dossier Tab | *"Next, we switch to the Executive Dossier view. We get a 0-100 Moat Viability Index, an architecture comparison table recommending open cloud infrastructure on Nebius, and threat countermeasures."* |
| **2:30 - 3:00** | 1-Click Export & Conclusion | *"With 1 click, we can export this as a clean Markdown dossier or an official Model Context Protocol (MCP) pack for Cursor and Claude Desktop. Built with Next.js 16, React 19, Nebius Token Factory, and NVIDIA Nemotron. Thank you!"* |
