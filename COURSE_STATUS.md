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

### Batch 14 — Volume III · Effects Discipline & Data (M3) — implemented
- `effects-discipline` (concierge model, deps-as-contract, cleanup, infinite-loop + fresh-identity dep traps, misuse catalog, StrictMode), `data-fetching` (server-state laws, request union, race-condition lab with AbortController, cache-manager horizon).
- 12 quiz questions, 2 debugging labs; `react-effects-data` flashcard set (14 cards); 7 glossary terms; 3 troubleshooting entries.
- Running totals: 14 flashcard sets / 147 cards, 76 glossary terms, 24 troubleshooting entries, 42 lessons implemented.

### Batch 15 — Volume III · Forms & Controlled Inputs (M4) — implemented
- `controlled-forms` (value-down/intent-up loop for every input type, one-form-one-ledger reducers, ownership-flip debugging lab), `forms-validation-ux` (pure validate(), touched/submitted revelation gate, accessible error wiring, five-step submit pipeline, silent-exit debugging lab).
- 12 quiz questions, 2 debugging labs; `react-forms` flashcard set (14 cards); 7 glossary terms; 3 troubleshooting entries.
- Running totals: 15 flashcard sets / 161 cards, 83 glossary terms, 27 troubleshooting entries, 44 lessons implemented.
- Note: a prior session summary claimed this batch shipped without the lesson file persisting; this pass created `lessons14.ts` for real and verified the `data-fetching → controlled-forms` bridge before wiring.

### Batch 16 — Volume III · Component Architecture & Testing (M5) — implemented
- `component-patterns` (three placement questions, props/lift/context with the PA-system model, the context re-render-storm debugging lab, compound components + ARIA, custom hooks, render-props/HOC outdated pair), `testing-react` (query hierarchy, user-event act loops, the brittle-'40 tests break on a rename' debugging lab, boundary mocking, findBy, the earn-its-keep filter).
- 12 quiz questions, 2 debugging labs; `react-architecture` flashcard set (16 cards); 7 glossary terms; 3 troubleshooting entries.
- Running totals: 16 flashcard sets / 177 cards, 90 glossary terms, 30 troubleshooting entries, 46 lessons implemented.

### Batch 17 — Volume III · Performance, Profiling & Gauntlet (M6) — implemented
- `rendering-performance` (cost ladder + frame budget, memo discipline, list identity rules, 'list that janks while you type' lab, virtualization), `profiling-production` (five-step loop, three profiler verdicts, 'modal that stutters on open' long-task lab, Core Web Vitals).
- React Gauntlet `gauntlet-m3` (15 Q / 4 fronts / pass ≥70%) closes Volume III.
- `react-performance` flashcard set (14 cards); 7 glossary terms; 3 troubleshooting entries.
- Running totals: 17 flashcard sets / 191 cards, 97 glossary terms, 33 troubleshooting entries, 48 lessons implemented.
- **Volume III complete: all 6 modules, 12 lessons.** React Phase Review below.

### React Phase Review (after Volume III)
- The mental-model → doctrine → discipline arc held: every later lesson could cite an earlier law (immutability, identity, derive-don't-store) instead of re-teaching it.
- Visible-only-after-building: performance work kept surfacing identity as the root cause across M2/M5/M6 — reinforced the "identity first" teaching order.
- Pending demonstration: none for React itself; the Full-Stack assessment combining Volumes III–V remains queued.
- No misordering found; no content needed to move. Proceed to Volume IV — Web Architecture.

### Batch 18 — Volume IV · Web Architecture: Contracts & Identity (M1–M2) — implemented
- `rest-api-design` (three vocabularies, idempotency, status-code facts, URL-state pagination, PUT-clobbers-PATCH lab), `api-contracts-versioning` (client-memory test, additive rules, versioning, deprecation, breaking-change lab), `auth-models` (AuthN/AuthZ order, salted-slow hashing, opaque sessions, IDOR user-A-vs-user-B lab), `sessions-tokens` (HttpOnly/Secure/SameSite, XSS-token-theft lab, CSRF, JWT costs, rotating-refresh design).
- 24 quiz questions, 4 debugging labs, 2 outdated-pattern pairs; `web-architecture` flashcard set (19 cards); 16 glossary terms; 4 troubleshooting entries.
- Running totals: 18 flashcard sets / 210 cards, 113 glossary terms, 37 troubleshooting entries, 52 lessons implemented.
- Volume IV opens the Full-Stack level; M3 (Caching & Security) + the Web Architecture Gauntlet (`gauntlet-m4`) are scoped for B-18b.

### Batch 18b — Volume IV · Caching & Security + Gauntlet (M3) — implemented
- `caching-fundamentals` (four cache sites, Cache-Control vocabulary, ETag/304 handshake walkthrough, deploy-stale debugging lab, content hashing) and `web-security-fundamentals` (three boundary rules, output encoding + stored-XSS debugging lab, CORS/CSP as contracts, secret hygiene, five-minute review).
- 12 quiz questions, 2 debugging labs, 2 outdated-pattern pairs; Web Architecture Gauntlet `gauntlet-m4` (15 Q / 4 fronts) closes Volume IV.
- `caching-security` flashcard set (14 cards), 7 glossary terms, 3 troubleshooting entries.
- Running totals: 19 flashcard sets / 224 cards, 120 glossary terms, 40 troubleshooting entries, 54 lessons implemented.
- **Volume IV complete: all 3 modules.** Full-Stack level now has its first volume certified by `gauntlet-m4`.

### Batch 19 — Volume V · PostgreSQL: Modeling, SQL & Performance (M1–M3) — implemented
- `relational-thinking`, `tables-keys-constraints`, `normalization` (M1); `sql-select-discipline`, `sql-joins-aggregates`, `sql-ctes-transactions` (M2); `indexes`, `explain-analyze` (M3 core).
- 44 quiz questions, 7 debugging labs (orphan rows, customer-moved, precedence trap, double-counted revenue, partial write, slower-after-index, stale stats), 2 outdated-pattern pairs.
- `sql-postgres` flashcard set (21 cards), 15 SQL glossary terms, 3 PostgreSQL troubleshooting entries.
- Running totals: 20 flashcard sets / 245 cards, 135 glossary terms, 43 troubleshooting entries, 62 lessons implemented.
- The database phase opens; Volume V core complete. `query-tuning` + the PostgreSQL Gauntlet (`gauntlet-m5`) ship in B-19b.

### Batch 19b — Volume V · Query Tuning + Gauntlet (M3 finale) — implemented
- `query-tuning`: the N+1 trap (with the "endpoint fine until the list grows" debugging lab), OFFSET's cliff → keyset pagination, connection pooling (transaction mode), and the review loop.
- PostgreSQL Gauntlet `gauntlet-m5` (15 Q / 4 fronts, spans M1–M3) closes Volume V.
- 6 quiz questions, 1 debugging lab, 1 outdated-pattern pair; 7 flashcards, 6 glossary terms, 3 troubleshooting entries.
- Running totals: 20 flashcard sets / 252 cards, 141 glossary terms, 46 troubleshooting entries, 63 lessons implemented.
- **Volume V complete: all 3 modules + tuning.** Database phase certified by `gauntlet-m5`. Full-Stack level now has two volumes certified.

### Batch 20 — Volume VI · Supabase: Foundations & RLS (M1–M2) — implemented
- `supabase-foundation` (platform = Postgres + API coat, three roles + two keys, typed-client translation, migrations + generated types, service-key-in-bundle lab), `supabase-auth-storage` (profiles pattern, sessions, Storage/Realtime as rooms, trigger-drift lab), `rls-first-principles` (USING/WITH CHECK, default deny, policy composition, owner exemption, missing-WITH-CHECK exploit lab, admin-via-table), `rls-testing-discipline` (four-cell matrix, over-grant vs over-denial, storage/realtime policies, type-mismatch over-denial lab).
- 23 quiz questions, 3 debugging labs, 1 outdated-pattern pair; Supabase Gauntlet `gauntlet-m6` (15 Q / 4 fronts) closes Volume VI.
- `supabase-rls` flashcard set (19 cards), 13 Supabase/RLS glossary terms, 3 troubleshooting entries.
- Running totals: 21 flashcard sets / 271 cards, 154 glossary terms, 49 troubleshooting entries, 67 lessons implemented.
- **Volume VI complete: both modules.** Supabase phase certified by `gauntlet-m6`. Full-Stack level now has three volumes certified.

## Known gaps (classified)
- ~~`needs-practice` — Git muscle-memory exercises (V1·M4).~~ ✅ closed by Batch 05.
- ~~`needs-assessment` — Builder Gauntlet pending.~~ ✅ closed by Batch 11. Volumes III, IV, and V now each have cumulative gauntlets. A combined Volumes III–V cross-volume assessment remains pending (a candidate for a later review pass).
- `candidate-new-module` — Browser storage landscape before authenticated progress (V2/V3).
- ~~`misordered` — CORS deserves a dedicated debugging lesson in V4.~~ ✅ covered by the `cors-blocked-legit` troubleshooting entry + callouts in web-security-fundamentals.
- `needs-production-context` — Monitoring for render-pipeline metrics (V9).
- ✅ Production-topics ledger: search/filter/pagination and state management now have full lessons (Volume VIII, B-22). Remaining ledger items (queues, email, rate limiting, payments, i18n, scaling) land in Volumes IX–X.

## Technical debt
- Search index rebuilt once at load (fine at current corpus size; revisit >500 entries).
- Flashcard scheduling is user-driven (Leitner-lite); consider SM-2 as sets grow.

## Generation log (batches 21–22)

### Batch 21 — Volume VII · Next.js App Router Foundations (M1–M2) — implemented
- `nextjs-app-router` (filesystem routes, layouts/pages/loading/error, Server vs Client as execution boundary, streaming, secret-crossed-border lab), `server-client-boundary` (hydration + mismatch fix, two Supabase clients, three server doors, server-only guards, works-in-dev-mismatch lab), `nextjs-data-mutations` (three freshness layers, dirty-set revalidation, client-state staleness, Suspense/error, updated-but-stale lab).
- 18 quiz questions, 3 debugging labs, 2 outdated-pattern pairs; Next.js Gauntlet `gauntlet-m7` (15 Q / 4 fronts) closes Volume VII.
- `nextjs-foundations` flashcard set (18 cards), 12 Next.js glossary terms, 3 troubleshooting entries.

### Batch 22 — Volume VIII · Full-Stack Applications (M1–M2) — implemented
- `auth-crud-anatomy` (five gates, RLS zero-rows refusals, Result-returning actions, optimistic UI + rollback, save-silent-fail lab), `crud-states-resilience` (five-state matrix, double-submit idempotency, freshness guards, soft delete, click-once-two-records lab), `search-filter-url` (URL as query state, allow-list sort, page-reset invariant, results UX, page-3-after-filter lab), `pagination-keyset` (OFFSET cliff vs cursors, tiebreakers, opaque cursors, load-more-dup-gaps lab).
- 24 quiz questions, 3 debugging labs, 2 outdated-pattern pairs; Full-Stack Gauntlet `gauntlet-m8` (15 Q / 4 fronts) closes Volume VIII.
- `fullstack-apps` flashcard set (21 cards), 14 Full-Stack glossary terms, 4 troubleshooting entries.
- **Volumes VII and VIII complete.** Next.js and Full-Stack applications phases certified by `gauntlet-m7` and `gauntlet-m8`.

### Running totals after batch 22
- 74 lessons implemented · 8 gauntlets · 23 flashcard sets / 310 cards · 180 glossary terms · 56 troubleshooting entries.
- Search index, queue, sidebar, and all reference surfaces regenerate from the data model.

## Recommended next batch
**Batch 23 — Production Engineering (Volume IX):** testing that matters (unit, integration, and the
RLS/validation tests that earn their keep), background jobs & queues (producers, consumers, retries,
idempotency, dead-letters), and CI/CD + observability (pipelines, deploys, logs, alerts) — closing with a
Production Gauntlet. Full scope on the generation queue. Then STOP and request review (bounded generation
contract).

## Unresolved questions
- Should HTML/CSS modules (V1·M5–M6) precede JS completion for learners who need visual wins earlier?
