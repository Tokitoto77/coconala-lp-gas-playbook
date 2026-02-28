# LP Project Ops Workflow Reference

## Step I/O Contract
| Step | Input | Output | Human Gate |
| --- | --- | --- | --- |
| 0 | Client context + existing assets | LP_PROJECT_PARAMS | Yes |
| 1 | STEP0 dictionary | Strategy summary + WBS + risk log | Yes |
| 2 | STEP1 approved strategy | Competitor/pattern report | No |
| 3 | STEP2 report | Persona, objections, FAQ skeleton | No |
| 4 | STEP3 outputs | Offer design A/B/C | Yes |
| 5 | STEP4 selected option | Wireframe structure (max 8 sections) + CTA placement | Yes |
| 6 | STEP5 structure | FV/CTA/body copy options | Yes |
| 7 | STEP6 selected copy | Design requirements doc | No |
| 8 | STEP7 design requirements | Build spec + integration spec | No |
| 9 | STEP8 build spec | Measurement plan + A/B plan | No |
| 10 | STEP6-9 outputs | QA/compliance report + fix list | Yes |

## AI Units (Functional Split)
Use these as role labels; do not overcomplicate execution:
- Strategy/PMO
- Market Intelligence
- Persona/Offer/Journey
- IA/Wireframe
- Copywriting
- Visual Design Requirements
- Front-end Build Spec
- Analytics/CRO
- QA/Compliance

## Minimal-Question Client Workflow
1. Request existing materials first (service info, legal docs, assets, prior references).
2. Produce a draft with assumptions.
3. Ask only missing, decision-critical items (target: 4-6 questions).
4. Lock requirements and proceed.

## Decision Criteria Per Gate
- Gate 0: dictionary has no contradictory assumptions.
- Gate 1: KPI and success definition are explicit.
- Gate 4: one offer option chosen with rationale.
- Gate 5: section order and CTA timing approved.
- Gate 6: one copy set selected.
- Gate 10: no unresolved legal/high-risk QA items.

## Compatibility Notes
- Keep section count <= 8 when that is the active contract constraint.
- Use one CTA style consistently if contract says "single CTA type".
- Human owns final legal and brand-tone decisions.
