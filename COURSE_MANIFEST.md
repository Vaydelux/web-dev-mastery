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
| `html-as-structure` | HTML Is Meaning: Structure Before Styling | Foundation | 45 | git-recovery | implemented |
| `a11y-tree-keyboard` | The Accessibility Tree and the Keyboard-First Page | Foundation | 50 | html-as-structure | implemented |
| `aria-when-needed` | ARIA: Don't, Unless You Must | Foundation | 40 | a11y-tree-keyboard | implemented |
| `css-mental-model` | The Cascade Is a Rulebook, Not a Battle | Foundation | 50 | aria-when-needed | implemented |
| `layout-flex-grid` | Two Layout Systems, One Decision | Foundation | 60 | css-mental-model | implemented |
| `responsive-and-tokens` | Responsive Is a Mindset, Tokens Are the Contract | Foundation | 55 | layout-flex-grid | implemented |
| `why-types` | Why Types Change How You Code | Foundation | 40 | responsive-and-tokens | implemented |
| `ts-strict-basics` | Strict Mode: The Everyday Vocabulary | Foundation | 55 | why-types | implemented |
| `narrowing` | Narrowing: The Compiler Reads Your If-Statements | Foundation | 50 | ts-strict-basics | implemented |
| `ts-dom` | TypeScript Meets the Browser | Foundation | 55 | narrowing | implemented |
| `gauntlet-m1` | Checkpoint · Foundation Gauntlet (19 Q, pass ≥70%) | Foundation | 25 | all of Volume I | implemented |

## Volume II — Professional JavaScript (Builder level)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `es-modules` | ES Modules: Files With Contracts | Builder | 50 | ts-dom | implemented |
| `module-boundaries` | Boundaries: What a Module Owes the World | Builder | 55 | es-modules | implemented |
| `circular-and-dynamic` | Circular Dependencies and the Lazy Escape | Builder | 50 | module-boundaries | implemented |
| `error-taxonomy` | Bugs vs Expected Failures: The Taxonomy Nobody Taught You | Builder | 45 | circular-and-dynamic | implemented |
| `result-pattern` | The Result Pattern: Failures as Data, Not Explosions | Builder | 50 | error-taxonomy | implemented |
| `async-failure-modes` | Asynchronous Failures: The Ones That Escape | Builder | 50 | result-pattern | implemented |
| `lint-format` | Lint and Format as Agreements | Builder | 40 | async-failure-modes | implemented |
| `build-pipeline` | The Build Pipeline: From Source to Shipped | Builder | 45 | lint-format | implemented |
| `ci-gate` | CI: The Gate That Fails Loudly | Builder | 45 | build-pipeline | implemented |
| `gauntlet-m2` | Checkpoint · Builder Gauntlet (13 Q, pass ≥70%) | Builder | 25 | all of Volume II | implemented |

## Volume III — React (Full-Stack level)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `react-why` | Why React Exists: The End of Manual DOM Updates | Builder | 45 | ci-gate | implemented |
| `jsx-props-composition` | JSX, Props, and the Discipline of Composition | Builder | 55 | react-why | implemented |
| `state-render-model` | State, Events, and the Render Cycle | Builder | 60 | jsx-props-composition | implemented |
| `state-classification` | The Eight Kinds of State (and Where Each Lives) | Builder | 55 | state-render-model | implemented |
| `how-react-renders` | How React Renders: Render, Commit, and What Triggers Each | Builder | 50 | state-classification | implemented |
| `effects-discipline` | Effects Are Synchronization, Not Lifecycle | Builder | 60 | how-react-renders | implemented |
| `data-fetching` | Server State: Fetching, Races, and the Loading/Error Fork | Builder | 55 | effects-discipline | implemented |
| `controlled-forms` | Controlled Components: One Owner for Every Keystroke | Builder | 55 | data-fetching | implemented |
| `forms-validation-ux` | Validation UX: Errors That Help, Not Accuse | Builder | 55 | controlled-forms | implemented |
| `component-patterns` | Component Patterns: Colocation, Context, and When to Reach for Each | Builder | 55 | forms-validation-ux | implemented |
| `testing-react` | Testing React: Behavior, Not Implementation | Builder | 55 | component-patterns | implemented |
| `rendering-performance` | Rendering Performance: Memo, Lists, and the Cost of a Render | Builder | 55 | testing-react | implemented |
| `profiling-production` | Profiling: From Feeling Slow to Proving Why | Builder | 50 | rendering-performance | implemented |
| `gauntlet-m3` | Checkpoint · React Gauntlet (15 Q, pass ≥70%) | Builder | 25 | all of Volume III | implemented |

## Volume IV — Web Architecture (Full-Stack level)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `rest-api-design` | REST: Nouns in the URL, Verbs in the Method | Full-Stack | 55 | profiling-production | implemented |
| `api-contracts-versioning` | API Contracts: Changing Your Mind Without Breaking the World | Full-Stack | 50 | rest-api-design | implemented |
| `auth-models` | Authentication vs Authorization: The Two Questions, In Order | Full-Stack | 60 | api-contracts-versioning | implemented |
| `sessions-tokens` | Cookies, Tokens, and the Two Ways Sessions Get Stolen | Full-Stack | 55 | auth-models | implemented |
| `caching-fundamentals` | Caching: What May Be Remembered, by Whom, for How Long | Full-Stack | 50 | sessions-tokens | implemented |
| `web-security-fundamentals` | Security Fundamentals: The Trust-Boundary Mindset | Full-Stack | 55 | caching-fundamentals | implemented |
| `gauntlet-m4` | Checkpoint · Web Architecture Gauntlet (15 Q, pass ≥70%) | Full-Stack | 25 | all of Volume IV | implemented |

## Volume V — PostgreSQL (Full-Stack level)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `relational-thinking` | The Relational Model: Why Your Data Deserves a Schema | Full-Stack | 45 | web-security-fundamentals | implemented |
| `tables-keys-constraints` | Keys and Constraints: The Laws Your Database Won't Forget | Full-Stack | 55 | relational-thinking | implemented |
| `normalization` | Normalization: Every Fact Once — and When to Break the Rule | Full-Stack | 50 | tables-keys-constraints | implemented |
| `sql-select-discipline` | SELECT Discipline: Queries Run in an Order You Didn't Write | Full-Stack | 50 | normalization | implemented |
| `sql-joins-aggregates` | JOINs and Aggregates: Where the Relational Payoff Lives | Full-Stack | 55 | sql-select-discipline | implemented |
| `sql-ctes-transactions` | CTEs and Transactions: Readable Recipes, Atomic Facts | Full-Stack | 50 | sql-joins-aggregates | implemented |
| `indexes` | Indexes: The Table of Contents Your Database Reads First | Full-Stack | 55 | sql-ctes-transactions | implemented |
| `explain-analyze` | EXPLAIN ANALYZE: The Difference Between Guessing and Knowing | Full-Stack | 50 | indexes | implemented |
| `query-tuning` | Query Tuning in the Wild: N+1, Pagination, and Pools | Full-Stack | 50 | explain-analyze | implemented |
| `gauntlet-m5` | Checkpoint · PostgreSQL Gauntlet (15 Q, pass ≥70%) | Full-Stack | 25 | all of Volume V | implemented |

## Volume VI — Supabase (Full-Stack level)

| ID | Title | Level | Min | Prereqs | Status |
|---|---|---|---|---|---|
| `supabase-foundation` | Supabase Is Postgres Wearing an API Coat | Full-Stack | 50 | query-tuning | implemented |
| `supabase-auth-storage` | Auth, Storage, and Realtime: Rooms in the Same Building | Full-Stack | 55 | supabase-foundation | implemented |
| `rls-first-principles` | Row Level Security: The House Rules, Written in SQL | Full-Stack | 60 | supabase-auth-storage | implemented |
| `rls-testing-discipline` | Testing RLS: The Matrix That Makes Policies a Contract | Full-Stack | 55 | rls-first-principles | implemented |
| `gauntlet-m6` | Checkpoint · Supabase Gauntlet (15 Q, pass ≥70%) | Full-Stack | 25 | all of Volume VI | implemented |

## Volumes VI–XI (module-scoped; lessons authored per batch)

| Volume | Phase | Modules | Status |
|---|---|---|---|
| III — React | React Phase | 6 modules complete · React Gauntlet passed-ready | ✅ complete |
| IV — Web Architecture | Web Architecture Phase | 3 modules complete (REST, AuthN/AuthZ, Caching/Security) · Web Architecture Gauntlet passed-ready | ✅ complete |
| V — PostgreSQL | Database Phase | 9 lessons implemented (Modeling, SQL, Performance, Tuning) · PostgreSQL Gauntlet passed-ready | ✅ complete |
| VI — Supabase | Supabase Phase | 4 lessons implemented (Foundations, Auth/Storage/Realtime, RLS, RLS Testing) · Supabase Gauntlet passed-ready | ✅ complete |
| VII — Next.js | Next.js Phase | 2 (App Router, Data/Mutations) | next · B-21 |
| VIII — Full-Stack Applications | Full-Stack Phase | 2 (Auth CRUD, Search/Filter/Pagination) | planned |
| IX — Production Engineering | Production Engineering Phase | 3 (Testing, Queues, CI/CD & Observability) | planned |
| X — Architecture | Architecture Phase | 1 (Pragmatic Architecture) | planned |
| XI — Capstones & Mastery | Capstone & Mastery Phase | 1 (Capstone Build) | planned |

## Cross-cutting assets

| Asset | Contents | Status |
|---|---|---|
| Flashcard sets | 21 sets / 271 cards: …web-architecture (19), caching-security (14), sql-postgres (28), supabase-rls (19) | implemented |
| Glossary | 154 terms, domain-tagged, lesson-linked (incl. 13 Supabase/RLS) | implemented |
| Troubleshooting index | 49 symptom-based entries (incl. 3 Supabase/RLS) | implemented |
| A11y Checklist | interactive reference at /ref/a11y — 6 groups, persisted progress | implemented |
| Design tokens + reference page | semantic light/dark system | implemented |
| Version matrix | see COURSE_VERSION_MATRIX.md | implemented |

## Required production topics (coverage ledger)

Background jobs/queues, caching, rate limiting, full-text search, email/notifications, scaling/availability,
search/filter/pagination, state management, SEO, i18n, payments/webhooks — each has a manifest home in Volumes IV–X;
coverage flips as batches ship. The gap ledger lives in COURSE_STATUS.md.
