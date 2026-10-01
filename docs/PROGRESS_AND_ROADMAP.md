# Project Progress & Engineering Roadmap

## 1. Project Status Overview
- **Project Name:** OmniBrief
- **Current Milestone:** Version 1.0.0 (Feature Complete & Build Verified)
- **Turbopack Build:** Passing (`next build` compiled with 0 errors)
- **TypeScript Strict Check:** Passing (`tsc --noEmit` exited 0)
- **Browser Subagent Test:** Verified (Canvas rendering, node clicking, drawer slide-in, dossier tab switching)

---

## 2. Completed Milestones (Changelog)

### Phase 1: Core Foundation & Infrastructure
- [x] Initialized Next.js 16 app with TypeScript, Tailwind CSS v4, React 19, and Turbopack.
- [x] Installed and configured `@xyflow/react`, `lucide-react`, `clsx`, `tailwind-merge`, and `canvas-confetti`.
- [x] Configured global styling, custom dark-mode scrollbars, and React Flow stylesheet overrides in `globals.css`.
- [x] Defined strongly typed data contracts in `src/types/omnibrief.ts` for reports, competitors, tech stacks, moats, and white-spaces.

### Phase 2: Multi-Agent Intelligence Engine
- [x] Built Tavily Search client (`src/lib/tavily.ts`) with advanced depth search and fallback.
- [x] Built Nebius Token Factory client (`src/lib/nebius.ts`) with OpenAI-compatible JSON mode prompting for NVIDIA Nemotron models.
- [x] Created `/api/analyze/route.ts` orchestrator executing the 3-stage agent pipeline (Scout -> Reasoning -> Topology Compiler).
- [x] Built autonomous fallback synthesis engine for zero-setup instant testing.

### Phase 3: Spatial Visualization Canvas (`@xyflow/react`)
- [x] Developed 5 custom node components (`RootEntityNode`, `CompetitorNode`, `TechStackNode`, `MoatNode`, `WhitespaceNode`).
- [x] Implemented dynamic relational coordinate mapper (`src/lib/graphMapper.ts`) with color-coded, animated bezier edges.
- [x] Added interactive controls: MiniMap, Zoom/Pan controls, Background dots, and Topology Legend.
- [x] Built slide-in `NodeInspectorDrawer.tsx` for deep-dive inspection upon clicking any node on the canvas.

### Phase 4: Executive Dossier & Export Capabilities
- [x] Built tabbed `ExecutiveDossier.tsx` (Overview, Competitor Matrix, Architecture Table, Moat Scores, White-Space, Citations).
- [x] Implemented **1-Click Markdown Export (`.md`)** download.
- [x] Implemented **1-Click Model Context Protocol (MCP) AI Context Pack (`.json`)** download.
- [x] Added in-app `ApiConfigModal.tsx` for entering custom Nebius & Tavily credentials without editing `.env` files.
- [x] Created MIT License, comprehensive README, and hackathon documentation suite.

### Phase 5: Phase 1 Breakthrough Capabilities (War-Game, Clash, Repo Ingestion)
- [x] **1. ⚔️ Strategic War-Game Simulator (Counterfactual Engine):** Built `/api/wargame` route and floating `WarGameController.tsx` on canvas. Recalculates moat composite scores in real-time, displays tactical shockwave casualty reports, and updates canvas nodes with pulsing glow borders and status badges (`⚠️ Squeezed Margin`, `🛡️ Fortified Moat`, `⚡ Disrupted`).
- [x] **2. 🥊 Head-to-Head Clash Canvas (Dual-Root Gravitational Graph):** Implemented `clashEngine.ts` and `buildDualRootGraph` in `graphMapper.ts`. Supports `"Linear vs Jira"`, `"Cursor vs Windsurf"`, and `"Supabase vs Firebase"` with Dual-Root layout (Indigo Root A vs Rose Root B), center contested shared cluster (`SharedClashNode`), outer wings, and a dedicated `HeadToHeadBattleCardModal.tsx` comparing latency, compliance, pricing, and developer velocity.
- [x] **3. 🔍 GitHub Repo Reverse-Architecture Ingestion (Code-to-Graph Grounding):** Built `repoInspector.ts` detecting GitHub repository URLs (e.g. `makeplane/plane`, `supabase/supabase`). Inspects manifests (`package.json`, `schema.prisma`, `docker-compose.yml`) to ground real concrete architecture stacks with zero speculation, badging nodes with `📦 Grounded`.

### Phase 6: Phase 2 Breakthrough Capabilities (Node Chat & Temporal Evolution)
- [x] **4. 💬 "Interrogate the Node" (Contextual Node Dialogue):** Built `/api/interrogate` route and embedded `NodeInterrogator.tsx` directly inside `NodeInspectorDrawer.tsx`. Provides contextual quick inquiry chips tailored to each node type (e.g. procurement bypass tactics, exact SQL/WASM CRDT code snippets, and G2 verified vulnerabilities) powered by NVIDIA Nemotron-70B on Nebius Token Factory.
- [x] **5. ⏳ Temporal Evolution Slider (Historical Market Shifts 2023–2026):** Implemented `temporalEngine.ts` and `TemporalEvolutionBar.tsx` on the canvas. Features interactive scrubbable timeline and automated play loop ($2023 \rightarrow 2024 \rightarrow 2025 \rightarrow 2026$) showcasing how architectures evolved from legacy cloud monoliths to edge/local-first CRDTs and sovereign multi-agent systems.

### Phase 7: UI/UX & Spatial Overhaul (Small-Screen & Edge Routing Polish)
- [x] **Cardinal 4-Side Handle Routing:** Assigned explicit IDs (`root-top`, `root-bottom`, `root-left`, `root-right`) on the central entity node and corresponding target handles (`comp-target`, `tech-target`, `moat-target`, `ws-target`). Eliminated the tangled "bird's nest" bundle on top of the root node; all edges now route cleanly with smoothstep curves without colliding or crossing.
- [x] **3-Tab Drawer Architecture:** Redesigned `NodeInspectorDrawer.tsx` into 3 compact tabs:
  - **Tab 1 (Profile & Matrix):** Clean breakdown of category, share, pricing, strengths, and vulnerabilities.
  - **Tab 2 (Tactical Copilot):** Interrogation chat with structured markdown formatting (bold, headers, bullets, code blocks).
  - **Tab 3 (Evidence & Sources):** Grounded Tavily search citations with compact cards and external links. Eliminates endless vertical scrolling.
- [x] **JSON Envelope Parser & Markdown Formatter:** Fixed raw unparsed JSON output in `/api/interrogate` and `NodeInterrogator.tsx`. Automatically extracts `parsed.answer` and renders with rich typography.
- [x] **Dockable Bottom War-Game Bar:** Compacted `WarGameController.tsx` into a sleek collapsible bottom shelf that defaults to collapsed state, shows real-time score delta badges, and auto-minimizes when opening the node inspector to prevent visual overlap.
- [x] **Focus Canvas Mode (Fullscreen) & Small-Screen Responsiveness:** Added a 1-click **"Focus Canvas"** button in the canvas toolbar that expands the workspace to full viewport height (`calc(100vh - 80px)`), perfect for laptops (`1422×659`) without manual window resizing. Compacted default canvas height to `h-[580px] sm:h-[640px] lg:h-[700px]` with automatic viewport fitting.

---

## 3. Upcoming Enhancements (Roadmap)

### Phase 3 Polish & PDF Exports
- [ ] **Direct PDF Export:** Serverless HTML-to-PDF generation for downloadable investor pitch memos.
- [ ] **Streaming Node Sprouts:** Progressively animate each node appearing on the XYFlow canvas as the reasoning agent streams tokens.

### Post-Hackathon Horizon (Product Expansion)
- [ ] **Live Competitor Watcher:** Continuous background monitoring via Nebius Serverless Jobs that alerts users when competitors alter their pricing or deploy new SDKs.
- [ ] **Multi-Company Benchmark View:** Side-by-side comparative canvas for 3–5 simultaneous competitor URLs.
- [ ] **Native IDE Extension (Cursor / VS Code):** Query OmniBrief intelligence directly from within code editors using the built-in MCP server.
