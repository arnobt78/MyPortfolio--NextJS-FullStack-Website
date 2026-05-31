# Agile V Agent Skills Index (24)

<!-- Reference roster for C1 orchestration. Load paths: ~/.cursor/skills/ -->

## Core pipeline (6) — load first

| # | Skill | Role | When to load |
|---|-------|------|--------------|
| 1 | `agile-v-core` | Values, SCOPE-V, state persistence | **Always first** |
| 2 | `agile-v-pipeline` | 5-stage orchestration, waves, handoffs | Multi-agent pipelines |
| 3 | `agile-v-lifecycle` | Cycles, CRs, archival, re-entry | C2+, change requests |
| 4 | `agile-v-compliance` | Risk, CAPA, gates, revalidation | Gate 1/2, audits |
| 5 | `agile-v-quality-gates` | Interface/test/data/time gates | Before claiming complete |
| 6 | `agile-v-product-owner` | Backlog, sprints, REQ trace | Sprint planning |

## Left arm — decomposition (5)

| # | Skill | Role |
|---|-------|------|
| 7 | `discovery-analyst` | Messy inputs → hypotheses |
| 8 | `threat-modeler` | STRIDE, privacy, security REQs |
| 9 | `ux-spec-author` | Design specs → testable REQs |
| 10 | `requirement-architect` | PRD, user stories, REQ-XXXX |
| 11 | `logic-gatekeeper` | Validate REQs before synthesis |

## Apex — synthesis (6)

| # | Skill | Role |
|---|-------|------|
| 12 | `build-agent` | Language-agnostic synthesis |
| 13 | `build-agent-js` | **This project** — Next.js/React/TS |
| 14 | `build-agent-python` | Python backends |
| 15 | `build-agent-nestjs` | NestJS APIs |
| 16 | `build-agent-embedded` | C/C++ firmware |
| 17 | `build-agent-dart` | Flutter/Dart |

## Right arm — verification (4)

| # | Skill | Role |
|---|-------|------|
| 18 | `test-designer` | Tests from REQs only |
| 19 | `red-team-verifier` | Independent verification |
| 20 | `compliance-auditor` | Decision log, audit trail |
| 21 | `release-manager` | Rollout, rollback, sign-off |

## Support (3)

| # | Skill | Role |
|---|-------|------|
| 22 | `documentation-agent` | ISO/V-model docs suite |
| 23 | `observability-planner` | Metrics, dashboards, SLOs |
| 24 | `schematic-generator` | Hardware schematics/HDL |

## This project default stack (C1)

```
agile-v-core → agile-v-pipeline → build-agent-js → red-team-verifier (C2)
```

## Skill file locations

```
~/.cursor/skills/agile-v-*/SKILL.md
~/.cursor/skills/build-agent*/SKILL.md
~/.cursor/skills/{requirement-architect,logic-gatekeeper,...}/SKILL.md
```
