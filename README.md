# OmniBrief ⚡
### Autonomous Market & Technical Due-Diligence Engine
**Built for the Nebius x NVIDIA Global AI Hackathon**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Nebius Token Factory](https://img.shields.io/badge/Nebius-Token%20Factory-indigo)](https://tokenfactory.nebius.com/)
[![NVIDIA Nemotron](https://img.shields.io/badge/NVIDIA-Nemotron%203%20Ultra-76B900)](https://build.nvidia.com/)
[![Tavily AI Search](https://img.shields.io/badge/Tavily-Live%20Search%20API-emerald)](https://tavily.com/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20Turbopack-black)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-cyan)](https://react.dev/)
[![XYFlow](https://img.shields.io/badge/@xyflow/react-Canvas-pink)](https://xyflow.com/)

---

## 🌟 Overview
**OmniBrief** transforms hours of manual competitive research, technology stack teardowns, and defensibility evaluations into an **instant, interactive visual intelligence canvas and executive memo**.

Instead of producing another wall of static markdown text, OmniBrief orchestrates a swarm of **NVIDIA Nemotron models on Nebius Token Factory** and **Tavily AI Search** to build a dynamic, relational node-graph topology that visualizes:
1. **Target Entity & Moat Index (0–100)**
2. **Direct, Adjacent, & Emerging Competitors** (pricing, market share, strengths, vulnerabilities)
3. **Architecture & Technology Teardowns** (incumbent proprietary choices vs. recommended open stack on Nebius)
4. **Threat & Defensibility Matrix** (data gravity, cloud lock-in, unit economics, and strategic countermeasures)
5. **Market White-Space Opportunities** (untapped wedges, target audiences, and high-impact differentiation)

---

## 🏗️ Multi-Agent Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │       User Query / Target Competitor         │
                  └──────────────────────┬───────────────────────┘
                                         │
                   ┌─────────────────────▼──────────────────────┐
                   │            Stage 1: Scout Agent            │
                   │      (Tavily Live Deep Web Search)         │
                   └─────────────────────┬──────────────────────┘
                                         │ Live Grounding & Citations
                   ┌─────────────────────▼──────────────────────┐
                   │         Stage 2: Reasoning Agent           │
                   │     (NVIDIA Nemotron 3 Ultra via           │
                   │       Nebius Token Factory GPU)            │
                   └─────────────────────┬──────────────────────┘
                                         │ Synthesized Relational JSON
                   ┌─────────────────────▼──────────────────────┐
                   │        Stage 3: Topology Compiler          │
                   │  (@xyflow/react Dynamic Node Generator)    │
                   └─────────────────────┬──────────────────────┘
                                         │
          ┌──────────────────────────────┴──────────────────────────────┐
          ▼                                                             ▼
┌───────────────────────────────┐                       ┌───────────────────────────────┐
│   Interactive Visual Canvas   │                       │    Executive Dossier Memo     │
│ - Topological Node Clusters   │                       │ - Executive Brief & Metrics   │
│ - Slide-In Inspector Drawer   │                       │ - 1-Click Markdown Export     │
│ - Live Tavily Citations Links │                       │ - Model Context Protocol (MCP)│
└───────────────────────────────┘                       └───────────────────────────────┘
```

---

## 🚀 Key Features

- **Interactive Dynamic Canvas (@xyflow/react):** Explore competitive ecosystems visually with color-coded nodes, animated edges, minimap, and click-to-inspect drawers.
- **NVIDIA Nemotron Models on Nebius Token Factory:** Deep reasoning using `nvidia/Llama-3.1-Nemotron-70B-Instruct-HF` and `nvidia/nemotron-4-340b-instruct` deployed on Nebius high-performance GPU cloud.
- **Tavily Live Grounding:** Automatically queries and cites real-time web intelligence, pricing changes, and GitHub issue discussions.
- **1-Click Executive Export:**
  - **Export Dossier (`.md`):** Formatted executive report ready for VCs, founders, and engineering teams.
  - **MCP Context Pack (`.json`):** Standard Model Context Protocol bundle that can be dropped directly into Cursor, Claude Desktop, or Windsurf.
- **Zero-Setup Simulation Fallback:** Built-in intelligent simulation mode enables judges to test any startup or domain immediately, even before adding custom API credentials.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Frontend & UI:** React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Graph & Visualization:** `@xyflow/react` (React Flow)
- **AI & Cloud Infrastructure:**
  - **Nebius Token Factory:** NVIDIA Nemotron inference API
  - **Tavily API:** Advanced web search and citation verification
- **Language:** TypeScript 5 (Strict mode)

---

## 🏁 Quickstart & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/omnibrief.git
cd omnibrief
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Create a `.env.local` file:
```env
# Nebius Token Factory API Key (Claim $25 free credits with code NEBIUS-DEVPOST-GLOBAL26)
NEBIUS_API_KEY=your_nebius_api_key_here
NEBIUS_BASE_URL=https://api.tokenfactory.nebius.com/v1
NEBIUS_MODEL=nvidia/Llama-3.1-Nemotron-70B-Instruct-HF

# Tavily AI Search API Key
TAVILY_API_KEY=your_tavily_api_key_here
```
*(Note: You can also enter API keys directly in the in-app **Settings** modal, stored securely in your browser session).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🎯 Hackathon Tracks & Bounties
- **Primary Track:** **Best Apps and Agents Track** (Autonomous copilot and due-diligence workflow powered by Nemotron models on Nebius Token Factory).
- **Partner Bounty:** **Best Use of Tavily ($3,000 cash)** (Real-time live search grounding, citation extraction, and competitive pricing analysis).

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
