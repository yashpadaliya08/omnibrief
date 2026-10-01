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

## 2. 3-Minute Demo Video Recording Script & Storyboard

### Video Recording Setup Tips:
- **Browser Window:** Maximize or set to `1920x1080` (1080p).
- **URL:** Open [http://localhost:3000](http://localhost:3000).
- **Audio:** Clear microphone, speak at an energetic, confident pace (~130 words per minute).
- **Tools:** Use Loom, OBS Studio, or Windows Game Bar (`Win + Alt + R`).

---

### Step-by-Step Cue Sheet (0:00 to 3:00)

| Timestamp | Screen Action & Visual | Voiceover Script (What to Say) |
| :---: | :--- | :--- |
| **0:00 - 0:25**<br>*(Hook & Problem)* | Start on the OmniBrief hero section with dark aesthetic. Move cursor over the tagline and 4-stage pipeline stepper. | *"Competitive due-diligence and technical architecture teardowns usually take 20 hours across 50 open tabs. Static PDF analyst reports go stale the day they are printed. Welcome to **OmniBrief**—the autonomous market and architecture due-diligence engine built for the **Nebius x NVIDIA Global AI Hackathon**."* |
| **0:25 - 0:55**<br>*(Live GPU Inference & Multi-Agent Swarm)* | Click the **`Linear.app`** preset button $\rightarrow$ Click **Analyze**. Point at the 4-stage stepper animating (Scout $\rightarrow$ Reasoning $\rightarrow$ Critic $\rightarrow$ Topology). Show confetti burst. | *"When we query an entity like Linear, OmniBrief launches a 4-stage multi-agent pipeline: Scout via Tavily retrieves live pricing and citations; NVIDIA Nemotron on Nebius Token Factory executes deep architectural reasoning on real GPUs; our Critic Agent corroborates citations; and our Topology Compiler synthesizes an interactive 2D spatial coordinate graph."* |
| **0:55 - 1:30**<br>*(Interactive Canvas & Strategic War-Game)* | Zoom into the canvas showing color-coded nodes. Point cursor to bottom-left **Strategic War-Game Simulator** card. Click **`Price War Shockwave`** (*"What if Jira cuts pricing by 50%?"*). Watch Moat drop from 85 to 71 and nodes glow red. | *"Instead of a text wall, we explore an interactive spatial canvas: Competitors in rose, Architecture in cyan, Moats in amber, and White-Spaces in emerald.<br><br>Now, watch our first breakthrough: **The Strategic War-Game Simulator**. Due diligence shouldn't be passive. Here, we stress-test strategy in real-time. I'll inject a price war scenario: Nemotron recalculates the entire relational graph live—our Moat drops to 71, and vulnerability cards glow red showing who gets squeezed."* |
| **1:30 - 2:05**<br>*(Head-to-Head Clash Canvas)* | Scroll up to search bar $\rightarrow$ Click **`🥊 Linear vs Jira`** quick-try chip $\rightarrow$ Click **Analyze**. Show the canvas rendering the Dual-Root Graph. Click the pulsing **`🥊 Clash Battle Card`** button in the top right. | *"In the real world, teams don't analyze companies in isolation—they choose between two. Here is our second breakthrough: **The Head-to-Head Clash Canvas**.<br><br>OmniBrief compiles a Dual-Root Gravitational Graph: Linear on the left in Indigo, Jira on the right in Rose, and a center contested cluster representing contested mid-market accounts and shared PostgreSQL dependencies.<br><br>Clicking the Clash Battle Card opens a side-by-side radar comparing Latency, Enterprise Compliance, Pricing TCO, and Developer Velocity with actionable tactical wedges."* |
| **2:05 - 2:35**<br>*(Interrogate the Node & Code Generation)* | Close battle card $\rightarrow$ Click the **`Data Layer & Synchronization`** architecture node on the canvas. Slide-in drawer opens. Scroll down to **Interrogate This Node**. Click: *"Show me an exact SQL/WASM code pattern to implement this sync."* | *"Our third breakthrough: **Interrogate the Node**. When a founder or CTO inspects an architectural node, they don't want a generic chatbot. They want surgical follow-up answers.<br><br>I'll click 'Show me an exact SQL/WASM code pattern'—NVIDIA Nemotron answers strictly through this node's lens, generating production-ready TypeScript and Yjs CRDT synchronization code on the fly."* |
| **2:35 - 3:00**<br>*(Temporal Evolution Slider & Conclusion)* | Close drawer $\rightarrow$ Click **`2023`** on the **Timeline Bar** across the canvas header $\rightarrow$ Click **`▶️ Play`**. Watch the graph animate through 2023, 2024, 2025, and 2026. Switch to **Executive Dossier** tab for 1-click Markdown/MCP export. | *"Finally, our **Temporal Evolution Slider**: software markets change year-over-year. As we scrub from 2023 to 2026, you watch competitors emerge, legacy monoliths fade out, and architectures shift to edge and local-first CRDTs.<br><br>Every memo is 1-click exportable to Markdown or official Model Context Protocol (MCP) packs for Cursor and Claude Desktop.<br><br>OmniBrief: built with Next.js 16, React 19, Nebius Token Factory, and NVIDIA Nemotron. Thank you!"* |

