# COURSE_MANIFEST — Full-Stack Web Development: Zero to Mastery

> Authoritative curriculum inventory. Sidebar presence never implies completion.
> Statuses: `planned` · `draft` · `implemented` · `review-needed` · `verified` · `deprecated` · `superseded`

## Volume I — Foundations (Foundation Phase)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `what-happens-when` | What Happens When You Hit Enter | Foundation | 45 | — | implemented |
| `http-request-response` | HTTP: The Conversation Rules | Foundation | 50 | what-happens-when | implemented |
| `browser-rendering` | The Browser Is a Rendering Machine | Foundation | 40 | what-happens-when, http-request-response | implemented |
| `js-values-types` | Values, Types, and Why typeof null Is 'object' | Foundation | 55 | browser-rendering | implemented |
| `js-control-flow` | Flow: Conditionals, Loops, and Guard Clauses | Foundation | 45 | js-values-types | implemented |
| `js-functions-scope` | Functions, Scope, and Closures | Foundation | 60 | js-control-flow | implemented |
| `terminal-mental-model` | The Terminal Is a Conversation | Foundation | 40 | js-functions-scope | implemented |
| `node-and-runtime` | Node.js and the pnpm Toolchain | Foundation | 45 | terminal-mental-model | implemented |
| `env-variables-secrets` | Environment Variables and Secrets | Foundation | 35 | node-and-runtime | implemented |
| `git-mental-model` | Git Is Three Rooms and a Snapshot Graph | Foundation | 45 | env-variables-secrets | implemented |
| `git-daily-workflow` | The Daily Loop: Status, Diff, Stage, Commit | Foundation | 45 | git-mental-model | implemented |
| `branches-prs-review` | Branches, Pull Requests, and Review Culture | Foundation | 50 | git-daily-workflow | implemented |
| `git-recovery` | The Undo Ladder: Restore, Amend, Revert, Reset, Reflog | Foundation | 55 | branches-prs-review | implemented |
| `gauntlet-m1` | Checkpoint · Foundation Gauntlet (12 Q, pass ≥70%) | Foundation | 20 | modules 1–4 | implemented |
| V1·M5 | Semantic HTML & Accessibility (3 lessons scoped) | Foundation | — | — | planned (next · B-06) |
| V1·M6 | CSS & Responsive Design (3 lessons scoped) | Foundation | — | — | planned |
| V1·M7 | TypeScript Foundations (4 lessons scoped) | Foundation | — | — | planned |

## Volumes II–XI (module-scoped; lessons authored per batch)

| Volume | Phase | Modules | Status |
|---|---|---|---|
| II — Professional JavaScript | Deep JavaScript | 3 (Modular JS, Error Handling, Tooling) | planned |
| III — React | React Phase | 3 (Mental Models, State/Rendering, Effects/Data) | planned |
| IV — Web Architecture | Web Architecture Phase | 3 (REST, AuthN/AuthZ, Caching/Security) | planned |
| V — PostgreSQL | Database Phase | 3 (Modeling, SQL, Performance) | planned |
| VI — Supabase | Supabase Phase | 2 (Foundations, RLS) | planned |
| VII — Next.js | Next.js Phase | 2 (App Router, Data/Mutations) | planned |
| VIII — Full-Stack Applications | Full-Stack Phase | 2 (Auth CRUD, Search/Filter/Pagination) | planned |
| IX — Production Engineering | Production Engineering Phase | 3 (Testing, Queues, CI/CD & Observability) | planned |
| X — Architecture | Architecture Phase | 1 (Pragmatic Architecture) | planned |
| XI — Capstones & Mastery | Capstone & Mastery Phase | 1 (Capstone Build) | planned |

## Cross-cutting assets

| Asset | Contents | Status |
|---|---|---|
| Flashcard sets | `http-web-basics` (5), `render-pipeline` (4), `js-values` (6), `terminal-tooling` (5), `git-workflow` (12) — 5 sets / 32 cards | implemented |
| Glossary | 20 terms, domain-tagged, lesson-linked | implemented |
| Troubleshooting index | 6 symptom-based entries | implemented |
| Design tokens + reference page | semantic light/dark system | implemented |
| Version matrix | see COURSE_VERSION_MATRIX.md | implemented |

## Required production topics (coverage ledger)

Background jobs/queues, caching, rate limiting, full-text search, email/notifications, scaling/availability,
search/filter/pagination, state management, SEO, i18n, payments/webhooks — each has a manifest home in Volumes IV–X;
coverage flips as batches ship. The gap ledger lives in COURSE_STATUS.md.
