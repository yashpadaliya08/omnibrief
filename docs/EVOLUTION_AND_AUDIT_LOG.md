# OmniBrief — Evolution, Audit Log & Upgrade Strategy

## 1. Executive Summary & Purpose
This document provides a transparent, engineering-grade record of **OmniBrief's development trajectory**, auditing initial blindspots/mistakes, detailing concrete solutions, and outlining the next high-value technical upgrades.

---

## 2. Credibility & Precision Fixes Audit Log

| Dimension | Initial Blindspot | Current Engineering Solution (v1.2.0) |
| :--- | :--- | :--- |
| **Model Name Consistency** | Header said `Nemotron-70B`, traces said `Nemotron 3 Ultra`, and footer said `Nemotron 3 Ultra`. | **Standardized Everywhere:** Exact official Nebius identifier: `nvidia/Llama-3.1-Nemotron-70B-Instruct-HF` labeled consistently as **NVIDIA Llama-3.1-Nemotron-70B-Instruct** across Header, Stepper, Trace, Dossier, and Footer. |
| **Moat Score Reconciliation** | 4 Rubric pillars (Data Gravity, Switching Costs, Sovereignty, Network Effects) did not match the 4 canvas cards (which included "Unit Economics"), and the math wasn't shown. | **100% Reconciled Math:** Both canvas cards and the rubric tab match the 4 pillars. Arithmetic is explicitly shown: `(30% × 85) + (30% × 92) + (20% × 70) + (20% × 89) = 25.5 + 27.6 + 14.0 + 17.8 = 84.9 ≈ 85/100`. |
| **Critic Confidence Formula** | Claimed "92% confidence with 0 unsupported claims" without explaining why it wasn't 100%, based on only 2 sources. | **Grounded & Mathematical:** Expanded to **9 high-fidelity sources** with URLs and published dates. Formula is explicitly displayed: `(11 verified grounded claims / 12 total claims checked) × 100 = 91.7% ≈ 92%` (1 claim unverified in public web index). |
| **Stale Competitor Data** | `Height.app` was listed (shutting down). Uncited percentages like "42% Enterprise Dominance". | **Replaced & Verified:** Replaced with active open-source rival `Plane.so` (30k+ GitHub stars) and `Shortcut`, each with a `Verified October 2026` badge and direct benchmark citations (G2, GitHub). |
| **Confusing Moat vs Threat Labels** | High defensibility (85%) was confusingly tagged "HIGH RISK". | **Separated Semantics:** Separated **Moat Strength** (`Dominant Moat: 85%`) from **External Threat Level** (`External Threat: Low`) with distinct emerald vs. rose badges. |
| **Objective Architecture Teardown** | Recommended stack for Linear previously mentioned sponsor models directly, looking like pandering. | **Engineering Integrity:** Sponsor models strictly power the **OmniBrief engine**. Linear's recommended stack is realistic open engineering: `PostgreSQL + ElectricSQL / Yjs CRDTs` and `OPFS + SQLite WASM` for sub-50ms local sync. |
| **UI Polish & Controls Styling** | React Flow zoom controls were a white block; minimap had bright gray background; edge labels piled up around center node; title was "Create Next App". | **Complete Dark Mode Styling:** Fixed controls and minimap in deep `#18181b`, created dynamic SVG favicon (`icon.svg`), set browser title to `OmniBrief`, removed cluttered edge labels, and widened node spacing by 30% to prevent overlap. |

---

## 3. Reconciled 4-Pillar Moat Formula

$$\text{Composite Moat Score} = (0.30 \times 85) + (0.30 \times 92) + (0.20 \times 70) + (0.20 \times 89)$$
$$\text{Composite Moat Score} = 25.5 + 27.6 + 14.0 + 17.8 = 84.9 \approx 85/100$$

1. **Data Gravity & History (85% | 30% Weight):** Contributes **+25.5 pts**. Proprietary schema lock-in, historical issue audit trails.
2. **Switching Costs & Muscle Memory (92% | 30% Weight):** Contributes **+27.6 pts**. Keyboard shortcuts (Cmd+K), sub-50ms local sync habits.
3. **Sovereignty & Compliance (70% | 20% Weight):** Contributes **+14.0 pts**. Enterprise privacy exposure, SOC2, GDPR.
4. **Network & Ecosystem Effects (89% | 20% Weight):** Contributes **+17.8 pts**. Multiplayer sync, third-party webhook ecosystem.

---

## 4. Next High-Value Upgrades & Roadmap

### Upgrade 1: 1-Click Mermaid Architecture Diagram Export
- Add a button in the Executive Dossier allowing users to copy the architecture as a **Mermaid.js diagram** (`flowchart TD`) for instant pasting into GitHub issues, Notion, or system design RFCs.

### Upgrade 2: Direct Branded PDF Export
- 1-click **Download Investor Memo (PDF)** featuring clean dark/light theme options, radar charts, and formatted tables.

### Upgrade 3: Live Progressive Node Sprouting (SSE Streaming)
- Stream Server-Sent Events (SSE) so that as each stage completes (Scout → Reasoning → Critic → Topology), nodes pop onto the canvas one by one.
