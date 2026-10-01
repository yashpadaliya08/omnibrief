# Devpost Submission Kit & Pitch Guide

Use this guide when submitting OmniBrief to the **Nebius x NVIDIA Global AI Hackathon** on Devpost and recording your demonstration video.

---

## 1. Devpost Submission Form (Copy & Paste Ready)

### Project Title
**OmniBrief**

### Elevator Pitch / Tagline (161 characters)
*Turns any company or idea into a verified competitive map and technical due-diligence memo in under a minute, powered by NVIDIA Nemotron on Nebius Token Factory.*

---

### What it does
OmniBrief turns hours of fragmented competitive research and architecture teardowns into a verified spatial intelligence canvas and executive memo in under a minute.

When an analyst, founder, or engineer queries any product, competitor, or domain (e.g., Linear, Cursor, Supabase):
1. **Scout Agent (Tavily AI Search)** scans the live web for pricing tiers, customer sentiment, and tech stack discussions.
2. **Reasoning Agent (NVIDIA Nemotron 3 Ultra on Nebius Token Factory)** analyzes competitive positioning, evaluates architectural bottlenecks, and computes a transparent 4-pillar defensibility rubric (Data Gravity, Switching Costs, Sovereignty, and Network Effects).
3. **Critic & Verification Agent** cross-references claims against extracted citations, assigning a Citation Confidence Score to actively mitigate hallucinations.
4. **Graph Topology Compiler** maps the intelligence into an interactive `@xyflow/react` node canvas with color-coded clusters (Competitors, Architecture, Threat Moats, and Market White-Spaces).
5. Users can click any node to inspect deep-dive technical rationale with cited sources, export an **Executive Due-Diligence Memo (`.md`)**, or download an official **Model Context Protocol (MCP)** context bundle for AI IDEs like Cursor and Claude Desktop.

---

### How we built it
- **Nebius Token Factory & NVIDIA Models:** We deployed `nvidia/Llama-3.1-Nemotron-70B-Instruct-HF` on Nebius GPU Cloud, leveraging its high-throughput inference for multi-agent reasoning, strict JSON schema output, and sovereign zero-retention data guarantees.
- **Tavily AI Search:** Integrated advanced search endpoints to ground the reasoning agents with live citations, pricing tiers, and community discussions.
- **Interactive Spatial Canvas:** Built with Next.js 16, React 19, and `@xyflow/react` to provide an interactive topological visualization rather than a static text chat.
- **Model Context Protocol (MCP):** Structured the synthesized output into standardized MCP JSON bundles that integrate directly with modern AI IDEs.

---

### Challenges we ran into
- **Balancing Reasoning Depth with Latency:** Multi-agent pipelines can easily become sluggish. By structuring strict JSON schemas and utilizing Nebius Token Factory's fast inference, we streamlined the end-to-end multi-agent evaluation to under a minute.
- **Graph Topology Auto-Layout:** Ensuring dynamic node generation didn't produce overlapping nodes or tangled edges. We implemented an equidistant radial/hierarchical coordinate mapper that groups node clusters logically around the target entity.
- **Mitigating Hallucination Credibility:** Generalist LLMs often hallucinate facts. We implemented an explicit Critic Agent step that checks claims against citations and surfaces analytical limitations.
- **Ensuring Zero-Setup Testability for Judges:** We engineered an autonomous simulation fallback that provides realistic, high-fidelity due diligence even if judges omit API keys.

---

### Accomplishments that we're proud of
- Delivering an interactive, spatial `@xyflow/react` canvas that visualizes business strategy alongside system architecture.
- Replacing black-box scoring with a transparent, 4-pillar weighted Moat Rubric.
- Seamlessly integrating **NVIDIA Nemotron on Nebius Token Factory** with **Tavily AI Search**.
- Full end-to-end production build on Next.js 16 (Turbopack) with 100% strict TypeScript compliance.

---

### What we learned
- How NVIDIA Nemotron's structured reasoning capabilities significantly reduce hallucination in complex technical teardowns compared to standard instruction models.
- The power of spatial visual graphs over linear chat transcripts for complex decision-making.

---

### What's next for OmniBrief
- Background competitor monitoring via Nebius Serverless Jobs.
- Direct PDF report compilation with branded investor decks.
- Real-time streaming node sprouts on the canvas.

---

## 2. 2-Minute YouTube Video Script & Storyboard

| Timestamp | Screen Display | Voiceover / Script |
| :---: | :--- | :--- |
| **0:00 - 0:25** | Landing Page / Search Box | *"Doing competitive market research and technical due diligence takes 10 to 20 hours of jumping between 50 browser tabs. Today, we built OmniBrief for the Nebius x NVIDIA Global AI Hackathon."* |
| **0:25 - 0:50** | Typing query & clicking **Analyze** (e.g. `Linear.app` or `Cursor.sh`) | *"When we query a company, OmniBrief launches a 4-stage multi-agent swarm: Scout via Tavily retrieves live pricing; NVIDIA Nemotron 3 Ultra on Nebius Token Factory performs architectural reasoning; a Critic Agent validates citations; and our Topology Compiler builds the graph."* |
| **0:50 - 1:25** | Interactive XYFlow Canvas | *"Instead of a static text wall, we get an interactive spatial canvas using React Flow. Competitors in rose, architecture teardowns in cyan, threat moats in amber, and market white-spaces in emerald. Clicking any node opens our slide-in inspector with verified live citations."* |
| **1:25 - 1:45** | Executive Dossier & Rubric | *"In the Executive Dossier view, we get a transparent 4-pillar Moat Rubric—scoring Data Gravity, Switching Costs, Sovereignty, and Network Effects with evidence—plus an open architecture recommendation on Nebius."* |
| **1:45 - 2:00** | 1-Click Export & Conclusion | *"With 1 click, we can export this as a clean Markdown dossier or an official Model Context Protocol (MCP) pack for Cursor and Claude Desktop. Built on Next.js 16, React 19, Nebius Token Factory, and NVIDIA Nemotron. Thank you!"* |
