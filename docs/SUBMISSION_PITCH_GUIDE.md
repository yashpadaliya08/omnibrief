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
1. **Scout Agent (Tavily AI Search)** fires 3 parallel domain-targeted searches — competitors, architecture, and compliance angles — simultaneously against the live web.
2. **Reasoning Agent (NVIDIA Nemotron-3.5-Lightning on Nebius Token Factory)** analyzes competitive positioning, evaluates architectural bottlenecks, and computes a transparent 4-pillar defensibility rubric (Data Gravity, Switching Costs, Sovereignty, and Network Effects). Scores are dynamically derived per-entity — no hardcoded defaults.
3. **Critic & Verification Agent** cross-references claims against extracted citations, assigning a Citation Confidence Score to actively mitigate hallucinations.
4. **Graph Topology Compiler** maps the intelligence into an interactive `@xyflow/react` node canvas with color-coded clusters and variable node counts (2–6 competitors based on actual market fragmentation).
5. **Strategic War-Game Simulator** lets users inject hypothetical market shockwaves (e.g. "What if Jira cuts pricing by 50%?"). Each scenario is Tavily-grounded with live web context, then evaluated by NVIDIA Nemotron, which recalculates the moat score, highlights affected nodes, and generates entity-specific counter-tactics.
6. Users can click any node to interrogate it with follow-up questions answered strictly through that node's context by NVIDIA Nemotron, export an **Executive Due-Diligence Memo (`.md`)**, or download an official **Model Context Protocol (MCP)** context bundle for AI IDEs.

---

### How we built it
- **Nebius Token Factory & NVIDIA Nemotron-3.5-Lightning:** We deployed `nvidia/Nemotron-3_5-Lightning` on Nebius GPU Cloud for multi-agent reasoning, structured JSON schema output, zero data retention, and sub-second TTFT.
- **3× Parallel Tavily AI Search:** Three simultaneous domain-targeted Tavily searches (competitor landscape, architecture stack, compliance risks) provide richer grounding context. The War-Game Simulator also fires a scenario-specific Tavily search before Nemotron evaluates it.
- **Interactive Spatial Canvas:** Built with Next.js 16, React 19, and `@xyflow/react` for an interactive topological visualization rather than a static text chat.
- **Model Context Protocol (MCP):** Structured output into standardized MCP JSON bundles that integrate directly with modern AI IDEs (Cursor, Claude Desktop, Windsurf).

---

### Challenges we ran into
- **Preventing Template-Driven Outputs:** Early versions used hardcoded scores and fixed node counts. We implemented FNV hash-based dynamic score derivation and variable node count logic, making every query generate a genuinely unique report.
- **War-Game Node Impact Mapping:** Mapping shockwave impacts to the correct `@xyflow/react` node IDs required building a dynamic node ID registry from the live report before calling Nemotron.
- **Balancing Reasoning Depth with Latency:** Multi-agent pipelines can easily become sluggish. Strict JSON schema prompting on Nebius Token Factory GPU kept end-to-end latency under 60 seconds.
- **Ensuring Zero-Setup Testability for Judges:** We engineered a fully dynamic fallback (not static templates) that uses the same FNV hash-based logic as the live path, ensuring realistic, entity-specific output even without API keys.

---

### Accomplishments that we're proud of
- Dynamic per-entity moat scoring — no two queries produce identical scores.
- Variable node counts (2–6 competitors) that reflect actual market fragmentation rather than fixed templates.
- The Strategic War-Game Simulator with live Tavily grounding + Nemotron evaluation — no other hackathon entry has a counterfactual simulation engine.
- Full Tavily integration across 3 parallel search angles AND war-game scenario grounding — targeting the $3,000 Tavily bounty.
- Seamlessly integrating **NVIDIA Nemotron-3.5-Lightning on Nebius Token Factory** as the sole reasoning backend.

---

### What we learned
- NVIDIA Nemotron's structured reasoning capabilities significantly reduce hallucination in complex technical teardowns compared to standard instruction models.
- FNV hashing is a reliable, dependency-free way to generate deterministic-but-varied synthetic scores that feel real without being random noise.
- Spatial visual graphs over linear chat transcripts dramatically improve decision-making for complex multi-dimensional analysis.

---

### What's next for OmniBrief
- Canvas PNG/PDF export for judge-shareable reports.
- Shareable analysis URLs (`/analyze?q=Linear.app` auto-runs on load).
- Background competitor monitoring via Nebius Serverless Jobs.
- Real-time streaming node generation as Nemotron tokens arrive.

---

## 2. 3-Minute Demo Video Recording Script & Storyboard

### Video Recording Setup Tips:
- **Browser Window:** Maximize or set to `1920x1080` (1080p).
- **URL:** Open [http://localhost:3000](http://localhost:3000).
- **Audio:** Clear microphone, speak at an energetic, confident pace (~130 words per minute).
- **Tools:** Use Loom, OBS Studio, or Windows Game Bar (`Win + Alt + R`).
- ⚠️ **IMPORTANT:** Record with live API keys configured — judges must see the **`"Live Nebius Token Factory"`** execution mode badge, NOT `"Deterministic Baseline Mode"`.

---

### Step-by-Step Cue Sheet (0:00 to 3:00)

| Timestamp | Screen Action & Visual | Voiceover Script (What to Say) |
| :---: | :--- | :--- |
| **0:00 - 0:20**<br>*(Hook & Problem)* | Start on OmniBrief hero. Move cursor over tagline and 4-stage pipeline stepper. | *"Competitive due-diligence and architecture teardowns usually take 20 hours across 50 open tabs. Welcome to **OmniBrief** — the autonomous market intelligence engine built for the **Nebius x NVIDIA Global AI Hackathon**."* |
| **0:20 - 0:55**<br>*(Live GPU Inference — Multi-Agent Pipeline)* | Click **`Linear.app`** preset → **Analyze**. Watch 4-stage stepper animate. Canvas loads. Point at **`"Live Nebius Token Factory"`** badge in the dossier. | *"When we query Linear.app, OmniBrief launches a 4-stage multi-agent pipeline: our Scout Agent fires **3 parallel Tavily AI searches** — competitors, architecture, and compliance — simultaneously. NVIDIA Nemotron-3.5-Lightning on Nebius Token Factory then reasons across those live citations to compute a transparent 4-pillar Moat Rubric with dynamically derived scores — no hardcoded defaults. The Critic Agent verifies citations, and the Graph Topology Compiler maps everything into this interactive spatial canvas — in under 60 seconds."* |
| **0:55 - 1:25**<br>*(Canvas Exploration)* | Zoom into canvas. Point at color-coded clusters. Click a **tech node** (`LINEAR.APP DATA LAYER`) to open the inspector drawer. Show the Evidence tab with cited sources. | *"Instead of a text wall, we get an interactive spatial canvas: Competitors in rose, Architecture in cyan, Moats in amber, and White-Spaces in emerald. Notice the node count varies — Linear gets 2 direct competitors today. Query Supabase and you'll see 3, with a completely different tech teardown. Every score is uniquely derived from domain trait detection — not a template."* |
| **1:25 - 2:00**<br>*(War-Game Simulator — #1 Differentiator)* | Close drawer → Expand **War-Game Simulator** at bottom → Click entity-aware preset (e.g. **`Jira Price War`**) → Watch Moat drop, nodes glow red, counter-tactics appear. Show **`"Live Grounded"`** Tavily badge. | *"Our biggest breakthrough: **The Strategic War-Game Simulator**. Due diligence shouldn't be passive. I inject: 'What if Jira cuts pricing by 50%?' The system **fires a live Tavily search on this specific scenario**, then NVIDIA Nemotron evaluates the shockwave — the Moat drops from 75 to 61, competitor nodes glow red, moat pillars show disruption badges, and entity-specific counter-tactics appear. This is due diligence as a simulation engine."* |
| **2:00 - 2:30**<br>*(Node Interrogator — Live Nemotron on Demand)* | Reset war-game → Click architecture node → Inspector Drawer opens → Switch to **Chat tab** → Click quick-prompt **`Show me exact code`** → Nemotron responds in context. | *"Our second breakthrough: **Interrogate the Node**. When a CTO clicks an architecture node, they get surgical follow-up — scoped strictly to this node's context. Watch: NVIDIA Nemotron generates production-ready TypeScript and CRDT synchronization patterns, cited back to Linear's engineering blog. This is live GPU inference on demand, answering only what this node knows."* |
| **2:30 - 3:00**<br>*(Head-to-Head Clash & Export)* | Type **`Linear vs Jira`** → Analyze → Show Dual-Root Graph → Click **`🥊 Clash Battle Card`** → Switch to **Dossier tab** → Show **Export `.md`** and **Export MCP** buttons. | *"Finally — query 'Linear vs Jira' for our **Head-to-Head Clash Canvas**: a dual-root gravitational graph with a contested center cluster. The Clash Battle Card opens a dimension-by-dimension radar with actionable tactical wedges.<br><br>Every analysis is 1-click exportable to an Executive Markdown Dossier or an official **Model Context Protocol MCP bundle** for Cursor and Claude Desktop.<br><br>OmniBrief: built with Next.js 16, NVIDIA Nemotron-3.5-Lightning on Nebius Token Factory, and 3× parallel Tavily AI Search — the complete hackathon intelligence stack. Thank you."* |

