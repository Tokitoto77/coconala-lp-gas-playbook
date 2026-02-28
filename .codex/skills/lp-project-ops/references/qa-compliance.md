# QA and Compliance Reference

## Priority Checks
1. Compliance risk (highest)
- exaggerated/superlative claims without support
- deterministic promises ("100%", "absolute", etc.)
- fear-based manipulative phrasing

2. Quality and trust
- typos/inconsistent wording
- broken links or placeholder links
- missing `alt` on non-decorative images
- readability issues on mobile

## Operational Checklist
- [ ] Claims are evidence-backed or softened.
- [ ] Scarcity/urgency statements are fact-based.
- [ ] No dead links (`href="#"`) in final output.
- [ ] Mobile readability is validated section by section.
- [ ] Japanese localization is complete (title, labels, date/weekday style as required).

## Audit Prompt (Reusable)
```markdown
# Role
You are the QA and compliance lead for a landing page production review.

# Input
The LP HTML code and/or full LP text.

# Checkpoints
1. Compliance/legal risk:
- Exaggerated claims, absolute guarantees, unsupported "No.1"/best claims
- Misleading benefit/efficacy language
- Excessive fear-based persuasion

2. Quality/reliability:
- Typos and inconsistent wording
- Broken links, placeholder anchors, missing non-decorative image alt text
- Mobile readability issues

# Output format
## QA and Compliance Report
### Must-fix Risks (count)
| Location | Current text | Risk reason | Suggested safer revision |
| --- | --- | --- | --- |

### Recommended Fixes (count)
- [ ] item

### Good Practices Found
- item
```

## Escalation Rule
- If any high-severity legal risk remains unresolved, block release and return to copy/offer steps.
