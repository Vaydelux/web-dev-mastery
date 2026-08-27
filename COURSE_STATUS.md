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

### Batch 06 — Volume I · Semantic HTML & Accessibility (M5) — implemented
- `html-as-structure`, `a11y-tree-keyboard`, `aria-when-needed` (18 quiz questions, 3 debugging labs).
- Accessibility Checklist reference (/ref/a11y) with persisted progress; `semantic-a11y` flashcard set (10 cards).

### Batch 07 — Volume I · CSS & Responsive Design (M6) — implemented
- `css-mental-model`, `layout-flex-grid`, `responsive-and-tokens` (15 quiz questions, 2 debugging labs).
- `css-layout` flashcard set (9 cards); gauntlet expanded with a Types & Styles front.

### Batch 08 — Volume I · TypeScript Foundations (M7) — implemented
- `why-types`, `ts-strict-basics`, `narrowing`, `ts-dom` (20 quiz questions, 3 debugging labs).
- `ts-foundations` flashcard set (10 cards). **Volume I complete: all 7 modules, 26 lessons.**
- Foundation Gauntlet spans all of Volume I (19 questions).

### Batch 09 — Volume II · Modular JavaScript (M1) — implemented
- `es-modules`, `module-boundaries`, `circular-and-dynamic` (18 quiz questions, 3 debugging labs).
- `modular-js` flashcard set (14 cards). **Builder level opens.**

### Batch 10 — Volume II · Error Handling That Scales (M2) — implemented
- `error-taxonomy`, `result-pattern`, `async-failure-modes` (18 quiz questions, 3 debugging labs).
- `error-handling` flashcard set (16 cards), 7 error glossary terms, 2 troubleshooting entries.
- Running totals: 10 flashcard sets / 91 cards, 47 glossary terms, 13 troubleshooting entries.

## Known gaps (classified)
- ~~`needs-practice` — Git muscle-memory exercises (V1·M4).~~ ✅ closed by Batch 05.
- `needs-assessment` — per-module quizzes + the Foundation Gauntlet (V1) exist; a combined Volumes II–III Builder assessment is pending (B-11 ships a Builder Gauntlet closing V2).
- `candidate-new-module` — Browser storage landscape before authenticated progress (V2/V3).
- `misordered` — CORS deserves a dedicated debugging lesson in V4, not only a callout.
- `needs-production-context` — Monitoring for render-pipeline metrics (V9).

## Technical debt
- Search index rebuilt once at load (fine at current corpus size; revisit >500 entries).
- Flashcard scheduling is user-driven (Leitner-lite); consider SM-2 as sets grow.

## Recommended next batch
**Batch 11 — Volume II · Tooling: Lint, Format, Build (V2·M3):** author `lint-format`, the build-pipeline
lesson, and CI-as-a-gate; ship ESLint + Prettier as team agreements and close Volume II with a Builder
Gauntlet spanning Modules 1–3 (modular JS, error handling, tooling). Full scope on the generation queue.
Then STOP and request review (bounded generation contract).

## Unresolved questions
- Should HTML/CSS modules (V1·M5–M6) precede JS completion for learners who need visual wins earlier?
