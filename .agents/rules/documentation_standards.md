# Permanent Engineering Rule: Comprehensive Documentation Discipline

## Core Principle
Every project must maintain a living, production-grade `docs/` directory that stays synchronized with the codebase. Never leave an application or hackathon project without structured, self-contained documentation.

## Mandatory Documentation Suite in `docs/`:
Whenever building or evolving a project, always create and actively update these core documentation files:

1. **`docs/REQUIREMENTS.md`**:
   - Explicit project requirements, hackathon rules, and sponsor constraints.
   - Model, infrastructure, and license requirements.
   - Strict deliverables and compliance checklist.

2. **`docs/PROBLEM_AND_SOLUTION.md`**:
   - Deep dive into the real-world problem, user persona pain points, and existing market failures.
   - Clear architectural narrative explaining how the solution solves the problem.
   - Why specific models, cloud providers, and visualization paradigms were selected.

3. **`docs/ARCHITECTURE_GUIDE.md`**:
   - Detailed directory map and component breakdown.
   - Data flow sequence diagrams and API schemas.
   - Custom component mechanics, state management, and edge cases.

4. **`docs/PROGRESS_AND_ROADMAP.md`**:
   - Active milestone tracker and changelog of completed features.
   - Test and build verification status.
   - Prioritized near-term and long-term roadmap.

5. **`docs/SUBMISSION_PITCH_GUIDE.md` (or Operation Runbook)**:
   - Copy-paste ready submission answers (what it does, how we built it, challenges, learnings).
   - Time-coded video demo script and presentation storyboard.
   - Rubric and judging criteria mapping.

## Maintenance Workflow:
- When modifying code or adding features, proactively update the corresponding documentation files.
- Always verify production builds (`next build` / `npm test` / `tsc --noEmit`) before completing milestones.
