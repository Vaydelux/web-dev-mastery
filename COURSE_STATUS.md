# COURSE_STATUS — generation history & working memory

Never rely on model memory alone to continue this project. Read MANIFEST + STATUS + VERSION_MATRIX first.

## Generation log

### Batch 00 — Scaffold (2026-02) — implemented
- Interactive course platform: routing, sidebar, breadcrumbs, TOC scrollspy, prev/next, ⌘K search, light/dark themes.
- Educational component library: objectives, mental models, annotated code, Try-It, debugging labs, outdated-pattern pairs, quizzes, checkpoints.
- Progress engine: localStorage-persisted completions, quiz best-scores, battle results, flashcard memory; reset flow.
- Design-token system + reference page; governance files + initial gap-discovery pass.

### Batch 01 — Volume I · How the Web Actually Works (M1) — implemented
- 3 full lessons (12 quiz questions, 3 debugging labs, 1 outdated-pattern pair).
- Foundation Gauntlet `gauntlet-m1` (9 Q / 3 fronts / pass ≥70%).
- 4 flashcard sets, glossary (15 terms), troubleshooting index (5 symptoms).

### Batch 02 — Volume I · JavaScript Foundations (M2) — implemented
- `js-values-types`, `js-control-flow`, `js-functions-scope` (12 quiz questions, 2 debugging labs).

### Batch 03 — Volume I · Terminal, Node & Environment (M3) — implemented
- `terminal-mental-model`, `node-and-runtime`, `env-variables-secrets` (9 quiz questions, 3 debugging labs).

### Batch 05 — Volume I · Git & GitHub Workflow (M4) — implemented
- `git-mental-model`, `git-daily-workflow`, `branches-prs-review`, `git-recovery` (20 quiz questions, 4 debugging labs).
- Foundation Gauntlet expanded to span Modules 1–4 (12 questions); repositioned after M4.
- Added `git-workflow` flashcard set (12 cards), 5 Git glossary terms, 1 merge-conflict troubleshooting entry.

## Known gaps (classified)
- ~~`needs-practice` — Git muscle-memory exercises (V1·M4).~~ ✅ closed by Batch 05.
- `needs-assessment` — per-module quizzes exist; a combined Volumes I–III phase assessment is pending.
- `candidate-new-module` — Browser storage landscape before authenticated progress (V2/V3).
- `misordered` — CORS deserves a dedicated debugging lesson in V4, not only a callout.
- `needs-production-context` — Monitoring for render-pipeline metrics (V9).

## Technical debt
- Search index rebuilt once at load (fine at current corpus size; revisit >500 entries).
- Flashcard scheduling is user-driven (Leitner-lite); consider SM-2 as sets grow.

## Recommended next batch
**Batch 06 — Semantic HTML & Accessibility (V1·M5):** author `html-as-structure`, `a11y-tree-keyboard`,
`aria-when-needed` (manifest ids); landmarks/headings/forms/images semantics, the accessibility tree and
keyboard flows, ARIA used sparingly; ship the Accessibility Checklist reference surface. Full scope on the
generation queue. Then STOP and request review (bounded generation contract).

## Unresolved questions
- Should HTML/CSS modules (V1·M5–M6) precede JS completion for learners who need visual wins earlier?
