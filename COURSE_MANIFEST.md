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
| V3·M5 | Component Architecture & Testing (2 lessons scoped) | Builder | — | — | planned (next · B-16) |
| V3·M6 | Performance & Profiling (2 lessons scoped) | Builder | — | — | planned |

## Volumes IV–XI (module-scoped; lessons authored per batch)

| Volume | Phase | Modules | Status |
|---|---|---|---|
| III — React | React Phase | 6 (Mental Models ✅, State/Rendering ✅, Effects/Data, Forms, Architecture/Testing, Performance) | in progress |
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
| Flashcard sets | 15 sets / 161 cards: …react-state-rendering (13), react-effects-data (14), react-forms (14) | implemented |
| Glossary | 83 terms, domain-tagged, lesson-linked | implemented |
| Troubleshooting index | 27 symptom-based entries | implemented |
| A11y Checklist | interactive reference at /ref/a11y — 6 groups, persisted progress | implemented |
| Design tokens + reference page | semantic light/dark system | implemented |
| Version matrix | see COURSE_VERSION_MATRIX.md | implemented |

## Required production topics (coverage ledger)

Background jobs/queues, caching, rate limiting, full-text search, email/notifications, scaling/availability,
search/filter/pagination, state management, SEO, i18n, payments/webhooks — each has a manifest home in Volumes IV–X;
coverage flips as batches ship. The gap ledger lives in COURSE_STATUS.md.
