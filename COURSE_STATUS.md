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

### Batch 11 — Volume II · Tooling: Lint, Format, Build (M3) — implemented
- `lint-format`, `build-pipeline`, `ci-gate` (18 quiz questions, 3 debugging labs).
- Builder Gauntlet `gauntlet-m2` (13 Q / 3 fronts / pass ≥70%) closes Volume II.
- `tooling` flashcard set (14 cards), 7 tooling glossary terms, 3 troubleshooting entries.
- Running totals: 11 flashcard sets / 105 cards, 54 glossary terms, 16 troubleshooting entries.
- **Volume II complete: all 3 modules, 9 lessons.** Builder level certified by the Builder Gauntlet.

### Batch 12 — Volume III · React Mental Models (M1) — implemented
- `react-why` (Then-vs-Now from the Volume I manual-DOM app), `jsx-props-composition`, `state-render-model`.
- 16 quiz questions, 2 debugging labs; `react-mental-models` flashcard set (15 cards); 6 glossary terms; 3 troubleshooting entries.
- **Volume III opens the Full-Stack level, scoped to 6 modules.**

### Batch 13 — Volume III · State & the Rendering Model (M2) — implemented
- `state-classification` (eight kinds of state, three-question filing test, stale-total lab), `how-react-renders` (render/commit phases, three triggers, memo identity-trap lab).
- 12 quiz questions, 2 debugging labs; `react-state-rendering` flashcard set (13 cards); 9 glossary terms; 2 troubleshooting entries.
- Running totals: 13 flashcard sets / 133 cards, 69 glossary terms, 21 troubleshooting entries, 40 lessons implemented.

## Known gaps (classified)
- ~~`needs-practice` — Git muscle-memory exercises (V1·M4).~~ ✅ closed by Batch 05.
- ~~`needs-assessment` — Builder Gauntlet pending.~~ ✅ closed by Batch 11 (Builder Gauntlet `gauntlet-m2` spans V2 M1–M3). A combined Volumes III–V Full-Stack assessment remains pending.
- `candidate-new-module` — Browser storage landscape before authenticated progress (V2/V3).
- `misordered` — CORS deserves a dedicated debugging lesson in V4, not only a callout.
- `needs-production-context` — Monitoring for render-pipeline metrics (V9).

## Technical debt
- Search index rebuilt once at load (fine at current corpus size; revisit >500 entries).
- Flashcard scheduling is user-driven (Leitner-lite); consider SM-2 as sets grow.

## Recommended next batch
**Batch 14 — React · Effects Discipline & Data (V3·M3):** author `effects-discipline` (effects as
synchronization, the dependency array as a contract, cleanup) and `data-fetching` (server state in practice,
race conditions, the loading/error fork). Full scope on the generation queue. Then STOP and request review
(bounded generation contract).

## Unresolved questions
- Should HTML/CSS modules (V1·M5–M6) precede JS completion for learners who need visual wins earlier?
