# Hackathon Requirements & Compliance Guide

## 1. Challenge Overview
- **Event:** Nebius x NVIDIA Global AI Hackathon
- **Host:** Devpost, Nebius, and NVIDIA
- **Partner Sponsor:** Tavily
- **Submission Deadline:** **October 30, 2026 @ 10:00 AM PDT** (1:00 PM EDT)
- **Primary Track:** **Best Apps and Agents Track**
- **Target Partner Bounty:** **Best Use of Tavily ($3,000 in cash)**

---

## 2. Mandatory Technical Requirements
All submissions must comply with the following mandatory constraints:

| Requirement | Specification | OmniBrief Implementation | Compliance Status |
| :--- | :--- | :--- | :---: |
| **Inference Infrastructure** | Must run on either **Nebius Token Factory** or **Nebius AI Cloud** | Configured to query Nebius Token Factory endpoints (`https://api.tokenfactory.nebius.com/v1`) | ✅ Verified |
| **Model Selection** | Must utilize at least one **NVIDIA open-source model** | Uses `nvidia/Nemotron-3_5-Lightning` on Nebius Token Factory GPU | ✅ Verified |
| **Open Source License** | Public repository with an approved OSI license (MIT, Apache 2.0, MPL 2.0) visible at top level | Top-level [`LICENSE`](../LICENSE) file licensed under **MIT License** | ✅ Verified |
| **Public Repository** | Accessible Git repo URL (GitHub/GitLab/Bitbucket) | Git initialized, clean commit history, fully self-contained | ✅ Verified |
| **Working Demo** | Working live URL, hosted app, or verifiable test build | Production Next.js build tested with zero errors; ready for Vercel/Cloudflare | ✅ Verified |
| **Video Demonstration** | Public YouTube video ≤ 3 minutes highlighting Nebius + NVIDIA models | Storyboard and script documented in [`SUBMISSION_PITCH_GUIDE.md`](./SUBMISSION_PITCH_GUIDE.md) | ⏳ Ready to record |

---

## 3. Prize Track Requirements

### A. Best Apps and Agents Track
- **Track Goal:** Build any application or agent that solves real productivity hurdles, copilots, or autonomous workflows.
- **Model Recommendation:** Use **Nemotron 3 Ultra** for complex reasoning and **Nemotron Nano / Super** for fast daily calls to stretch tokens.
- **Cloud Recommendation:** Deploy with Nebius Serverless Endpoints or Jobs for background processing.
- **OmniBrief Alignment:** Orchestrates multi-agent reconnaissance, deep due-diligence reasoning, and relational graph compilation.

### B. Best Use of Tavily ($3,000 Cash Prize)
- **Requirement:** Integrate Tavily AI Search to fetch live web data, research, or scrape external context.
- **OmniBrief Alignment:** Built-in Scout Agent queries Tavily to retrieve real-time competitor pricing, market share reports, and GitHub architectural discussions.

---

## 4. Judging Rubric & Criteria Alignment

| Criteria | Weight | Judge Evaluation Focus | How OmniBrief Excels |
| :--- | :---: | :--- | :--- |
| **Technological Implementation** | 25% | Effective use of Nebius Token Factory and NVIDIA Nemotron models. | Multi-agent orchestration, structured JSON prompting, fallback resilience, and fast token generation. |
| **Design & UX** | 25% | Complete, coherent product experience—not just a raw terminal proof-of-concept. | Interactive `@xyflow/react` node canvas, dark-mode glassmorphism, animated edges, slide-in inspector drawer. |
| **Potential Impact** | 25% | Credible case for solving a real problem for a real audience. | Saves founders, analysts, VCs, and developers 10–20 hours of manual competitive research per deal/project. |
| **Quality of the Idea** | 25% | Creative, non-obvious use of models with genuine domain depth. | Bridges market intelligence with technical architecture teardowns and Model Context Protocol (MCP) exports. |

---

## 5. Deliverables Checklist
- [x] Functional web application with Next.js 16 + React 19 + TypeScript
- [x] `@xyflow/react` visual canvas with 5 custom node types
- [x] Live Nebius Token Factory client for `nvidia/Nemotron-3_5-Lightning`
- [x] 3× parallel Tavily AI Search integration (competitor, architecture, compliance angles)
- [x] Dynamic moat scores derived per-query (FNV hash + domain trait detection, no hardcoded defaults)
- [x] Variable node counts (2–6 competitors, 3–5 tech items based on market complexity)
- [x] Autonomous simulation fallback for zero-setup demoing
- [x] Slide-in Node Inspector Drawer with live citations & Nemotron interrogation
- [x] Strategic War-Game Simulator with Tavily-grounded + Nemotron-evaluated shockwaves
- [x] Entity-aware dynamic war-game presets (domain-specific: fintech, devtool, AI, database)
- [x] 1-Click Executive Markdown Dossier export
- [x] 1-Click Model Context Protocol (MCP) AI Context Pack export
- [x] In-app API configuration modal with Nebius & Tavily key management
- [x] Open source MIT License
- [x] Production build verification (`next build` with Turbopack)
- [ ] 3-minute YouTube walkthrough video
- [ ] Devpost submission form finalized
