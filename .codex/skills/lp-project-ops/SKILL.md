---
name: lp-project-ops
description: Standardize LP project operations from requirement lock to delivery with AI-human decision gates, minimal client questions, fixed step outputs, and compliance-aware QA.
---

# LP Project Ops

Use this skill when running a client LP project end-to-end and you need:
- minimal client back-and-forth,
- explicit AI vs human decision boundaries,
- fixed outputs per step,
- compliance-aware QA before delivery.

Typical triggers:
- "LP案件を要件確定から納品まで運用したい"
- "質問を減らして進めたい"
- "確認ポイントを固定したい"

## Core Rules
1. Do not skip decision gates. Move forward only after explicit human `OK` or option selection.
2. Ask the client for existing materials first; ask only missing high-impact items after draft output exists.
3. Keep LP constraints consistent with the agreed project baseline (for this workflow: max 8 sections, single CTA style).
4. AI drafts; human approves strategy, offer, tone, and legal final sign-off.

## Workflow
Use this sequence. For step-level details, open:
- [workflow.md](references/workflow.md)
- [requirements-template.md](references/requirements-template.md)
- [qa-compliance.md](references/qa-compliance.md)

### STEP0: Project Dictionary
- Build `LP_PROJECT_PARAMS` first.
- Required keys: goal, KPI, target, offer constraints, legal constraints, delivery timeline.
- Gate 0: human confirms dictionary correctness.

### STEP1: Strategy Summary + WBS
- Produce strategy summary and execution plan with risks.
- Gate 1: human approves success criteria and risk framing.

### STEP2-3: Research + Customer Psychology
- AI runs competitive and persona/objection analysis.
- No client ping unless blocked by missing core facts.

### STEP4: Offer Design (A/B/C)
- Provide 3 offer presentation options.
- Gate 4: human chooses one option.

### STEP5: Wireframe Structure
- Produce section order, role of each section, CTA placement timing.
- Gate 5: human approves structure.

### STEP6: Copy Set
- Generate FV/CTA/body copy options.
- Gate 6: human selects final wording set.

### STEP7-9: Design Spec, Build Spec, Measurement
- Produce design requirements, implementation spec, and analytics plan.

### STEP10: QA + Compliance
- Run quality/legal checks before delivery.
- Gate 10: human final approval required.

## Mandatory Decision Gates
The following six gates are mandatory:
1. STEP0 dictionary
2. STEP1 strategy summary
3. STEP4 offer option selection
4. STEP5 wireframe structure
5. STEP6 FV/CTA wording selection
6. STEP10 final QA/compliance sign-off

## Rollback Rules
- Legal/compliance issue: return to STEP6 copy first.
- Offer mismatch with client intent: return to STEP4.
- Information architecture mismatch: return to STEP5.
- Tracking/KPI mismatch: return to STEP1.

## Output Policy
Each step must produce a named artifact with date and version:
- `YYYY-MM-DD_client_step-output_vN.md`
- Avoid ambiguous filenames like `draft.md`.

When running inside a repo, save outputs under a stable folder (example):
- `docs/client_materials/notes/`
