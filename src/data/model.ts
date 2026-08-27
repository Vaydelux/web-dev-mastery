import type {
  BattleRef, BossBattle, FlashcardSet, GlossaryEntry, Lesson, LessonStatus, MasteryLevel,
  ModuleDef, TroubleEntry, VolumeDef,
} from "../lib/core";
import { m1 } from "./lessons1";
import { m2 } from "./lessons2";
import { m3 } from "./lessons3";
import { gitLessons as m4 } from "./lessons4";

/* ————— helpers ————— */
const mod = (id: string, num: number, title: string, blurb: string, status: LessonStatus, lessons: Lesson[]): ModuleDef => ({
  id, num, title, blurb, status, lessons,
});
const p = (id: string, title: string, volume: number, module: number, order: number, minutes: number, summary: string, prereqs: string[], concepts: string[]): Lesson => ({
  id, title, volume, module, order, level: (volume <= 1 ? "Foundation" : volume <= 5 ? "Builder" : volume <= 8 ? "Full-Stack" : volume <= 10 ? "Production" : "Mastery") as MasteryLevel,
  status: "planned", minutes, summary, prereqs, objectives: [], concepts,
});
const v = (id: number, numeral: string, title: string, phase: string, blurb: string, modules: ModuleDef[]): VolumeDef => ({
  id, numeral, title, phase, blurb, modules,
});

/* ————— curriculum tree ————— */
export const COURSE: VolumeDef[] = [
  v(1, "I", "Foundations", "Foundation Phase", "How the web actually works, the language itself, and a professional workstation.", [
    mod("v1m1", 1, "How the Web Actually Works", "From a URL to pixels: DNS, TCP, TLS, HTTP, and the render pipeline.", "implemented", m1),
    mod("v1m2", 2, "JavaScript Foundations", "Values, types, scope, functions — taught for mastery, not copy-paste.", "implemented", m2),
    mod("v1m3", 3, "Terminal, Node & Environment Setup", "Shell fluency, the Node runtime, pnpm, and environment variables done safely.", "implemented", m3),
    mod("v1m4", 4, "Git & GitHub Workflow", "Snapshots, branches, pull requests, and recovery — the undo ladder.", "implemented", m4),
    mod("v1m5", 5, "Semantic HTML & Accessibility", "HTML as meaning, the accessibility tree, and ARIA used sparingly.", "planned", [
      p("html-as-structure", "HTML Is Meaning: Structure Before Styling", 1, 5, 1, 45, "Landmarks, headings, forms, and images that carry real semantics.", ["git-recovery"], ["semantics", "landmarks"]),
      p("a11y-tree-keyboard", "The Accessibility Tree and the Keyboard-First Page", 1, 5, 2, 50, "Role/name/state, tab order, focus traps, and skip links.", ["html-as-structure"], ["a11y", "focus"]),
      p("aria-when-needed", "ARIA: Don't, Unless You Must", 1, 5, 3, 40, "The five rules of ARIA, live regions, and native-first thinking.", ["a11y-tree-keyboard"], ["aria"]),
    ]),
    mod("v1m6", 6, "CSS & Responsive Design", "The cascade referee, flex/grid layout, responsive thinking, and design tokens.", "planned", [
      p("css-mental-model", "The Cascade Is a Rulebook, Not a Battle", 1, 6, 1, 50, "Specificity tuples, the box model, and @layer.", ["aria-when-needed"], ["cascade", "specificity"]),
      p("layout-flex-grid", "Two Layout Systems, One Decision", 1, 6, 2, 60, "Flexbox vs grid, the axis model, and auto-fit.", ["css-mental-model"], ["flexbox", "grid"]),
      p("responsive-and-tokens", "Responsive Is a Mindset, Tokens Are the Contract", 1, 6, 3, 55, "Mobile-first, clamp(), container queries, and semantic tokens.", ["layout-flex-grid"], ["tokens", "responsive"]),
    ]),
    mod("v1m7", 7, "TypeScript Foundations", "Types as documentation the compiler enforces.", "planned", [
      p("why-types", "Why Types Change How You Code", 1, 7, 1, 40, "Bug archaeology and strict as the only default.", ["responsive-and-tokens"], ["typescript"]),
      p("ts-strict-basics", "Strict Mode: The Everyday Vocabulary", 1, 7, 2, 55, "Interfaces, unions, literals, and what strict enforces.", ["why-types"], ["union", "interface"]),
      p("narrowing", "Narrowing: The Compiler Reads Your If-Statements", 1, 7, 3, 50, "Guards, discriminated unions, and the never-check.", ["ts-strict-basics"], ["narrowing"]),
      p("ts-dom", "TypeScript Meets the Browser", 1, 7, 4, 55, "lib.dom, event inference, and parse → validate → trust.", ["narrowing"], ["dom", "unknown"]),
    ]),
  ]),
  v(2, "II", "Professional JavaScript", "Deep JavaScript", "Modular code, honest error handling, and the tooling that keeps large codebases healthy.", [
    mod("v2m1", 1, "Modular JavaScript", "Files with contracts: imports, exports, and boundaries.", "planned", [
      p("es-modules", "ES Modules: Files With Contracts", 2, 1, 1, 50, "Named vs default exports, hoisted imports, and tree-shaking.", ["ts-dom"], ["modules"]),
      p("module-boundaries", "Boundaries: What a Module Owes the World", 2, 1, 2, 55, "Small public surfaces and one-way dependency layers.", ["es-modules"], ["architecture"]),
    ]),
    mod("v2m2", 2, "Error Handling That Scales", "Fail loudly in development, gracefully in production.", "planned", [
      p("error-taxonomy", "Bugs vs Expected Failures", 2, 2, 1, 45, "An error taxonomy and throwing with intent.", ["module-boundaries"], ["errors"]),
      p("result-pattern", "The Result Pattern", 2, 2, 2, 50, "Modeling expected failures without exceptions.", ["error-taxonomy"], ["result"]),
    ]),
    mod("v2m3", 3, "Tooling: Lint, Format, Build", "ESLint, Prettier, and bundlers as team agreements.", "planned", [
      p("lint-format", "Lint and Format as Agreements", 2, 3, 1, 40, "ESLint + Prettier and why they end style debates.", ["result-pattern"], ["tooling"]),
    ]),
  ]),
  v(3, "III", "React", "React Phase", "Component thinking: state, rendering, effects discipline, architecture, testing, and performance.", [
    mod("v3m1", 1, "React Mental Models", "UI as a function of state; JSX, props, and composition.", "planned", []),
    mod("v3m2", 2, "State & the Rendering Model", "The state-classification doctrine and how React renders.", "planned", []),
    mod("v3m3", 3, "Effects Discipline & Data", "Effects done right, and the bridge to server state.", "planned", []),
  ]),
  v(4, "IV", "Web Architecture", "Web Architecture Phase", "HTTP in production depth: REST, cookies/sessions, authN vs authZ, caching, and security fundamentals.", [
    mod("v4m1", 1, "REST & API Design", "Resources, verbs, and contracts that age well.", "planned", []),
    mod("v4m2", 2, "Authentication & Authorization", "Cookies, sessions, JWTs, and the authN/authZ split.", "planned", []),
    mod("v4m3", 3, "Caching & Security Fundamentals", "Cache headers, XSS, CSRF, and the trust-boundary mindset.", "planned", []),
  ]),
  v(5, "V", "PostgreSQL", "Database Phase", "Relational modeling, SQL, transactions, indexes, and EXPLAIN.", [
    mod("v5m1", 1, "Relational Modeling", "Tables, keys, normalization, and ERDs.", "planned", []),
    mod("v5m2", 2, "SQL Fluency", "Joins, aggregates, CTEs, and window functions.", "planned", []),
    mod("v5m3", 3, "Performance", "Indexes, EXPLAIN, and query planning.", "planned", []),
  ]),
  v(6, "VI", "Supabase", "Supabase Phase", "Auth, RLS, Storage, Realtime, and local-first workflows.", [
    mod("v6m1", 1, "Supabase Foundations", "The platform, clients, and publishable vs privileged keys.", "planned", []),
    mod("v6m2", 2, "Row Level Security From First Principles", "Policies, and testing user-A vs user-B.", "planned", []),
  ]),
  v(7, "VII", "Next.js", "Next.js Phase", "App Router: Server/Client Components, data fetching, and secure mutations.", [
    mod("v7m1", 1, "App Router & Rendering", "Layouts, Server vs Client Components, execution boundaries.", "planned", []),
    mod("v7m2", 2, "Data & Mutations", "Fetching, caching, revalidation, and Route Handlers.", "planned", []),
  ]),
  v(8, "VIII", "Full-Stack Applications", "Full-Stack Phase", "Authenticated CRUD, search/filter/pagination, files, and multi-tenancy.", [
    mod("v8m1", 1, "Authenticated CRUD", "End-to-end features with RLS and validation.", "planned", []),
    mod("v8m2", 2, "Search, Filter, Pagination", "Server-side data access patterns.", "planned", []),
  ]),
  v(9, "IX", "Production Engineering", "Production Engineering Phase", "Testing, queues, caching, email, rate limiting, CI/CD, and observability.", [
    mod("v9m1", 1, "Testing That Matters", "Unit, integration, and the tests that earn their keep.", "planned", []),
    mod("v9m2", 2, "Background Jobs & Queues", "Producers, consumers, retries, and idempotency.", "planned", []),
    mod("v9m3", 3, "CI/CD & Observability", "Pipelines, deploys, logs, and alerts.", "planned", []),
  ]),
  v(10, "X", "Architecture", "Architecture Phase", "Modularity, tradeoffs, and distributed-system fundamentals.", [
    mod("v10m1", 1, "Pragmatic Architecture", "SOLID, boundaries, and decision records.", "planned", []),
  ]),
  v(11, "XI", "Capstones & Mastery", "Capstone & Mastery Phase", "Independent, portfolio-grade applications and architectural reasoning.", [
    mod("v11m1", 1, "Capstone Build", "Plan, build, deploy, and defend a production app.", "planned", []),
  ]),
];

/* ————— lookups ————— */
export const flatLessons = (): Lesson[] => COURSE.flatMap((vol) => vol.modules.flatMap((m) => m.lessons));
export const getLesson = (id: string): Lesson | undefined => flatLessons().find((l) => l.id === id);
export const orderedContent = (): Lesson[] => flatLessons().filter((l) => l.status !== "planned");
export const prevOf = (id: string): Lesson | undefined => {
  const all = orderedContent();
  const i = all.findIndex((l) => l.id === id);
  return i > 0 ? all[i - 1] : undefined;
};
export const nextOf = (id: string): Lesson | undefined => {
  const all = orderedContent();
  const i = all.findIndex((l) => l.id === id);
  return i >= 0 && i < all.length - 1 ? all[i + 1] : undefined;
};
export const moduleProgress = (lessons: Record<string, { done: boolean }>, m: ModuleDef) => {
  const scoped = m.lessons.filter((l) => l.status !== "planned");
  return { done: scoped.filter((l) => lessons[l.id]?.done).length, total: scoped.length };
};
export const volumeProgress = (lessons: Record<string, { done: boolean }>, vol: VolumeDef) => {
  const scoped = vol.modules.flatMap((m) => m.lessons).filter((l) => l.status !== "planned");
  return { done: scoped.filter((l) => lessons[l.id]?.done).length, total: scoped.length };
};
export const volumeStatus = (vol: VolumeDef): LessonStatus => {
  const all = vol.modules.flatMap((m) => m.lessons);
  if (all.length && all.every((l) => l.status === "implemented")) return "implemented";
  if (all.some((l) => l.status !== "planned")) return "draft";
  return "planned";
};
export const courseStats = () => {
  const all = flatLessons();
  return {
    volumes: COURSE.length,
    modules: COURSE.reduce((n, vol) => n + vol.modules.length, 0),
    lessonsImplemented: all.filter((l) => l.status === "implemented").length,
    lessonsDraft: all.filter((l) => l.status === "draft").length,
    lessonsPlanned: all.filter((l) => l.status === "planned").length,
  };
};

/* ————— boss battles ————— */
export const BATTLE_REFS: BattleRef[] = [
  { id: "gauntlet-m1", title: "Checkpoint · Foundation Gauntlet", volumeId: 1, afterModule: "v1m4", blurb: "A cumulative fight across the web, JavaScript, your workstation, and Git — pass at 70%." },
];

export const BATTLES: BossBattle[] = [
  {
    id: "gauntlet-m1",
    title: "Foundation Gauntlet",
    subtitle: "Modules 1–4 · pass ≥ 70%",
    passPct: 70,
    intro: [
      "This is not a memory test. Every question asks you to *reason* the way the lessons taught: trace a pipeline, predict an output, diagnose a failure, choose a fix.",
      "You pass at 70%. Missed questions link back to the lesson that teaches the idea — remediation, not shame.",
    ],
    rules: [
      "Answer every question, then submit.",
      "Multi-select questions are all-or-nothing.",
      "Predict-output questions: commit to an answer before checking.",
    ],
    sections: [
      {
        title: "The Wire & the Pixels",
        desc: "DNS, HTTP, and the render pipeline.",
        questions: [
          { id: "b1", type: "single", prompt: "A user reports NXDOMAIN but the site works for you. Where is the problem?", options: ["The server is down", "Their DNS resolver/cache", "TLS certificates", "The HTTP method"], answer: [1], explain: "NXDOMAIN fails at the DNS stage. A stale local resolver cache explains the discrepancy." },
          { id: "b2", type: "single", prompt: "Which change forces the browser to re-run layout?", options: ["opacity", "color", "width", "transform"], answer: [2], explain: "width is geometry → layout (expensive, cascading). opacity/transform stay on the GPU; color only repaints." },
          { id: "b3", type: "single", prompt: "403 (not 401) on an admin page means…", options: ["not logged in", "logged in but not allowed", "page missing", "server error"], answer: [1], explain: "403 = known identity, insufficient permission. 401 = unknown identity." },
        ],
      },
      {
        title: "The Language",
        desc: "Values, references, scope, and closures.",
        questions: [
          { id: "b4", type: "single", prompt: "const a=[1,2]; const b=a; b.push(3); a.length is…", code: "const a = [1, 2];\nconst b = a;\nb.push(3);\nconsole.log(a.length);", lang: "js", options: ["2", "3", "undefined", "throws"], answer: [1], explain: "b = a copied the reference. push mutated the one shared array." },
          { id: "b5", type: "single", prompt: "The var loop prints 3,3,3 because…", options: ["setTimeout gets the final value", "one shared binding is read after the loop", "engines cache loop vars", "console.log batches"], answer: [1], explain: "var gives one function-scoped binding; closures read it live after the loop completes." },
          { id: "b6", type: "boolean", prompt: "if ([]) runs the branch.", options: ["True", "False"], answer: [0], explain: "Every object is truthy, even an empty array. Check emptiness with .length." },
        ],
      },
      {
        title: "The Workstation",
        desc: "Shell, packages, and secrets.",
        questions: [
          { id: "b7", type: "single", prompt: "'command not found' usually means…", options: ["the program crashed", "the binary isn't on PATH", "no permission", "network down"], answer: [1], explain: "The shell scans PATH and found no matching executable." },
          { id: "b8", type: "single", prompt: "Which file makes installs reproducible and must be committed?", options: ["node_modules", "package.json alone", "the lockfile", "index.js"], answer: [2], explain: "The lockfile pins exact versions for the whole tree; node_modules is rebuildable." },
          { id: "b9", type: "single", prompt: "A secret was committed and pushed. First step?", options: ["delete the file", "rewrite history", "rotate the key", "add .gitignore"], answer: [2], explain: "Exposure already happened — rotate (revoke + reissue) first, then scrub history." },
        ],
      },
      {
        title: "The Workflow",
        desc: "Snapshots, branches, and the undo ladder.",
        questions: [
          { id: "b10", type: "single", prompt: "After git add app.js, the staged content lives in…", options: ["the working tree", "the index (staging area)", "history", "GitHub"], answer: [1], explain: "git add copies the file's current content into the index; it only reaches history on commit." },
          { id: "b11", type: "single", prompt: "A bad commit is already pushed and pulled by teammates. Undo it with…", options: ["git reset --hard + force-push", "git revert <commit>", "git commit --amend", "delete the repo"], answer: [1], explain: "Shared history is corrected additively: revert adds a new commit that inverts the bad one, keeping teammates' clones valid." },
          { id: "b12", type: "boolean", prompt: "A Git branch is a full copy of the repository.", options: ["True", "False"], answer: [1], explain: "False — a branch is a cheap movable label pointing at a commit; nothing is copied when you create one." },
        ],
      },
    ],
  },
];
export const getBattle = (id: string): BossBattle | undefined => BATTLES.find((b) => b.id === id);

/* ————— flashcards ————— */
export const FLASHCARD_SETS: FlashcardSet[] = [
  {
    id: "http-web-basics", title: "HTTP & Web Basics", blurb: "The wire, the conversation, the verdicts — Lessons 1–2.",
    cards: [
      { front: "DNS", back: "The distributed directory translating domain names to IP addresses; answers cached with a TTL.", lesson: "what-happens-when" },
      { front: "TTFB", back: "Time to First Byte: DNS + TCP + TLS + server thinking. Separates network/server from download/render.", lesson: "what-happens-when" },
      { front: "Idempotent", back: "Repeating the request changes nothing beyond the first success. GET/PUT/DELETE yes; POST no.", lesson: "http-request-response" },
      { front: "401 vs 403", back: "401: who are you? (authenticate). 403: I know you — not allowed (authorize).", lesson: "http-request-response" },
      { front: "Stateless", back: "HTTP keeps no memory between requests; cookies/sessions/tokens smuggle memory through.", lesson: "http-request-response" },
    ],
  },
  {
    id: "render-pipeline", title: "The Render Pipeline", blurb: "DOM to pixels — Lesson 3, drilled to reflex.",
    cards: [
      { front: "The six stages", back: "DOM + CSSOM → render tree → layout → paint → composite.", lesson: "browser-rendering" },
      { front: "Reflow (layout)", back: "Recomputing positions/sizes — the expensive, cascading stage.", lesson: "browser-rendering" },
      { front: "Layout thrashing", back: "Forced sync reflows from interleaved DOM reads/writes in a hot loop. Batch reads, then writes.", lesson: "browser-rendering" },
      { front: "defer", back: "Downloads in parallel, runs in order after parsing — nothing blocks the DOM.", lesson: "browser-rendering" },
    ],
  },
  {
    id: "js-values", title: "JavaScript Values & Scope", blurb: "Modules 2 — references, equality, closures, and control flow.",
    cards: [
      { front: "Value vs reference", back: "Primitives copy on assignment; objects copy the address — two variables can share one object.", lesson: "js-values-types" },
      { front: "Mutating array methods", back: "push, sort, reverse, splice mutate in place through every reference. Copying: spread, map, slice, toSorted.", lesson: "js-values-types" },
      { front: "The falsy list", back: "false, 0, -0, 0n, \"\", null, undefined, NaN — exactly eight. \"0\", [], {} are truthy.", lesson: "js-control-flow" },
      { front: "Guard clause", back: "An early return dismissing a failure case so the happy path stays flat.", lesson: "js-control-flow" },
      { front: "Closure", back: "A function plus its birth-scope bindings, carried wherever it runs later.", lesson: "js-functions-scope" },
      { front: "Why 3,3,3", back: "var = one shared binding; callbacks run after the loop; closures read the live variable (now 3).", lesson: "js-functions-scope" },
    ],
  },
  {
    id: "terminal-tooling", title: "Terminal, Node & Environment", blurb: "Module 3 — the shell, the runtime, and secrets.",
    cards: [
      { front: "Exit code 0", back: "The only success code. CI turns red on any nonzero step.", lesson: "terminal-mental-model" },
      { front: "A pipe (|)", back: "Hands one command's output to the next command's input.", lesson: "terminal-mental-model" },
      { front: "package.json vs lockfile", back: "Intent (ranges) vs resolution (exact, committed). node_modules is the rebuildable materialization.", lesson: "node-and-runtime" },
      { front: "Config vs secret", back: "Does it grant access? Keys/tokens → secret (never committed). Ports/URLs → config.", lesson: "env-variables-secrets" },
      { front: "Leaked secret order", back: "1) ROTATE, 2) scrub history, 3) audit. Deleting the file first is the classic wrong order.", lesson: "env-variables-secrets" },
    ],
  },
  {
    id: "git-workflow",
    title: "Git & GitHub",
    blurb: "Three rooms, branches as labels, and the undo ladder — Module 4 drilled to reflex.",
    cards: [
      { front: "The three rooms", back: "Working tree (desk), staging/index (dock), history (archive). git add → index; git commit → history.", lesson: "git-mental-model" },
      { front: "A commit", back: "A sealed, content-addressed snapshot with a parent pointer — a full picture, not a diff.", lesson: "git-mental-model" },
      { front: "git status", back: "Your map: which room each change lives in. Read it before every commit.", lesson: "git-daily-workflow" },
      { front: "diff vs diff --staged", back: "diff: working tree vs index. diff --staged: index vs last commit (what a commit will seal).", lesson: "git-daily-workflow" },
      { front: "git add -p", back: "Interactive patch staging: stage individual hunks within one file, keeping commits focused.", lesson: "git-daily-workflow" },
      { front: "A branch", back: "A cheap movable label pointing at a commit. Creating one copies nothing.", lesson: "branches-prs-review" },
      { front: "Fast-forward vs three-way", back: "Fast-forward slides the label when there's no divergence; three-way makes a two-parent merge commit when both moved.", lesson: "branches-prs-review" },
      { front: "Conflict markers", back: "<<<<<<< / ======= / >>>>>>> delimit overlapping edits Git can't auto-merge — you choose, then add + commit.", lesson: "branches-prs-review" },
      { front: "Rebase golden rule", back: "Never rebase commits you've pushed and others may have built on. Rebase only your private, unshared work.", lesson: "branches-prs-review" },
      { front: "Undo ladder", back: "restore → amend → revert → reset → reflog, safest first. Stop as soon as the problem is fixed.", lesson: "git-recovery" },
      { front: "Pushed or not?", back: "Unpushed → amend/reset (rewrite) is fine. Pushed/shared → revert (add a correction), never rewrite.", lesson: "git-recovery" },
      { front: "git reflog", back: "Local ledger of every HEAD position (~90 days). 'Lost' commits are usually just unreferenced and recoverable.", lesson: "git-recovery" },
    ],
  },
];
export const getSet = (id: string): FlashcardSet | undefined => FLASHCARD_SETS.find((s) => s.id === id);

/* ————— glossary ————— */
export const GLOSSARY: GlossaryEntry[] = [
  { term: "DNS", def: "The distributed directory translating domain names to IP addresses.", domain: "Web", lesson: "what-happens-when" },
  { term: "TCP", def: "Protocol opening a reliable, ordered, lossless pipe between two machines.", domain: "Web", lesson: "what-happens-when" },
  { term: "TLS", def: "The encryption + identity layer; https is HTTP inside TLS.", domain: "Web", lesson: "what-happens-when" },
  { term: "Idempotent", def: "Repeating a request changes nothing beyond the first success.", domain: "HTTP", lesson: "http-request-response" },
  { term: "Stateless", def: "HTTP keeps no memory between requests.", domain: "HTTP", lesson: "http-request-response" },
  { term: "DOM", def: "The live tree of nodes parsed from HTML.", domain: "Browser", lesson: "browser-rendering" },
  { term: "Reflow", def: "Recomputing layout geometry — the expensive render stage.", domain: "Browser", lesson: "browser-rendering" },
  { term: "Primitive", def: "One of seven copy-on-assign, immutable JavaScript types.", domain: "JavaScript", lesson: "js-values-types" },
  { term: "Reference", def: "An address pointing at an object; assignment copies the address.", domain: "JavaScript", lesson: "js-values-types" },
  { term: "Guard clause", def: "An early return that keeps the happy path flat.", domain: "JavaScript", lesson: "js-control-flow" },
  { term: "Closure", def: "A function plus its birth-scope bindings.", domain: "JavaScript", lesson: "js-functions-scope" },
  { term: "Hoisting", def: "Declarations registered before execution; let/const behind the TDZ.", domain: "JavaScript", lesson: "js-functions-scope" },
  { term: "PATH", def: "The ordered list of directories the shell searches for executables.", domain: "Shell", lesson: "terminal-mental-model" },
  { term: "Lockfile", def: "Exact resolved versions for the whole dependency tree — committed for reproducibility.", domain: "Tooling", lesson: "node-and-runtime" },
  { term: "Secret", def: "A value that grants access — never committed, logged, or client-shipped.", domain: "Security", lesson: "env-variables-secrets" },
  { term: "Staging (index)", def: "The proposed next snapshot; populated by git add, sealed by git commit.", domain: "Git", lesson: "git-mental-model" },
  { term: "Commit", def: "A sealed, content-addressed snapshot with a parent pointer.", domain: "Git", lesson: "git-mental-model" },
  { term: "Branch", def: "A movable label pointing at a commit; creating one copies nothing.", domain: "Git", lesson: "branches-prs-review" },
  { term: "Rebase", def: "Replaying commits onto a new base; rewrites history — unshared work only.", domain: "Git", lesson: "branches-prs-review" },
  { term: "Reflog", def: "Local ledger of every HEAD position; the recovery net for 'lost' commits.", domain: "Git", lesson: "git-recovery" },
];

/* ————— troubleshooting ————— */
export const TROUBLESHOOTING: TroubleEntry[] = [
  { id: "nxdomain", symptom: "'This site can't be reached — NXDOMAIN' while the same site works for teammates.", layer: "DNS / name resolution", causes: ["Stale or poisoned resolver/OS DNS cache", "Recent DNS record change your resolver hasn't refreshed", "A hosts-file entry hijacking the name"], diagnose: ["dig example.com +short — does YOUR machine resolve it?", "dig @8.8.8.8 example.com +short — does a public resolver?", "Check your hosts file for stray entries."], fix: "Flush the OS DNS cache or switch resolvers; retry. NXDOMAIN means the request never left the name-lookup stage.", prevent: "Lower TTLs a day before planned DNS changes so caches refresh quickly.", related: "what-happens-when" },
  { id: "unsupported-media-type", symptom: "POST returns 400 'Unsupported Media Type' from code but works from Postman.", layer: "HTTP headers", causes: ["fetch body sent without Content-Type", "Content-Type says text/plain while the body is JSON"], diagnose: ["DevTools → Network → failing request → Headers; compare with the working tool.", "Reproduce with curl -H 'Content-Type: application/json'."], fix: "Set headers: { \"Content-Type\": \"application/json\" } and JSON.stringify the body.", prevent: "Wrap fetch in a client that always sets Content-Type and checks res.ok.", related: "http-request-response" },
  { id: "command-not-found", symptom: "'command not found' for a tool you know is installed.", layer: "Shell / PATH", causes: ["The binary's directory isn't on PATH", "The shell started before PATH was updated"], diagnose: ["echo $PATH — is the install directory listed?", "which <tool> — does it resolve?"], fix: "Add the directory to PATH and open a fresh terminal (or source your rc file).", prevent: "Know where your tools install; confirm resolution with which.", related: "terminal-mental-model" },
  { id: "works-on-my-machine", symptom: "Runs locally but crashes on a teammate's machine with a missing library export.", layer: "Dependencies / lockfile", causes: ["No committed lockfile — installs drifted to different versions", "A dependency installed but never added to package.json"], diagnose: ["Compare installed versions of the failing package on both machines.", "Fresh-clone test: install from the lockfile only and run."], fix: "Commit the lockfile; reinstall from it on both machines.", prevent: "Install with --frozen-lockfile in CI so drift fails loudly at build time.", related: "node-and-runtime" },
  { id: "committed-secret", symptom: "A .env with real keys was committed and pushed.", layer: "Secrets / Git history", causes: [".gitignore missing or added after the secret", "No pre-commit secret scanning"], diagnose: ["Confirm the secret is in history: git log -p -- .env", "Check the provider's usage logs for the exposed key."], fix: "ROTATE the key first (revoke + reissue), then scrub history and force-push, then audit.", prevent: ".gitignore on day zero, a pre-commit secret scanner, and .env.example for names.", related: "env-variables-secrets" },
  { id: "merge-conflict", symptom: "git merge stops with 'CONFLICT (content)' and files full of <<<<<<< markers.", layer: "Git merge", causes: ["Two branches edited the same lines", "A long-lived branch diverging far from main"], diagnose: ["git status lists the conflicted files", "Open each file; markers delimit the two competing versions"], fix: "Edit out ALL markers keeping the correct combined result, then git add <file> and git commit to seal the merge.", prevent: "Merge main into your branch frequently so conflicts stay small and local.", related: "branches-prs-review" },
];

/* ————— batch queue ————— */
export interface Batch { id: string; title: string; scope: string; status: "shipped" | "next" | "queued" | "future"; summary: string; targets?: string[]; }
export const BATCHES: Batch[] = [
  { id: "B-00", title: "Scaffold & governance", scope: "platform", status: "shipped", summary: "Design tokens, lesson engine, progress, search, sidebar, and the manifest/status/version-matrix governance files." },
  { id: "B-01", title: "Volume I · How the Web Actually Works", scope: "V1·M1", status: "shipped", summary: "URL→render journey, HTTP conversation rules, and the browser render pipeline — with DNS, Content-Type, and layout-thrashing debugging labs." },
  { id: "B-02", title: "Volume I · JavaScript Foundations", scope: "V1·M2", status: "shipped", summary: "Values & references, control flow & guard clauses, and functions/scope/closures — including the 3,3,3 mystery solved." },
  { id: "B-03", title: "Volume I · Terminal, Node & Environment", scope: "V1·M3", status: "shipped", summary: "The shell conversation, the Node runtime + pnpm toolchain, and environment variables/secrets done safely." },
  { id: "B-04", title: "Foundation Gauntlet + review", scope: "V1 checkpoint", status: "shipped", summary: "The cumulative 12-question checkpoint battle across Modules 1–4 (web, JavaScript, workstation, Git), with remediation links." },
  { id: "B-05", title: "Git & GitHub Workflow", scope: "V1·M4", status: "shipped", summary: "Git as a snapshot graph, the daily loop with selective staging, branches/PRs/conflicts, and the undo ladder (restore/amend/revert/reset/reflog) — 20 quiz questions, 4 debugging labs." },
  { id: "B-06", title: "Semantic HTML & Accessibility", scope: "V1·M5", status: "next", summary: "HTML as meaning, the accessibility tree and keyboard flows, ARIA used sparingly, plus the Accessibility Checklist." },
  { id: "B-07", title: "CSS & Responsive Design", scope: "V1·M6", status: "queued", summary: "The cascade referee, flex/grid, responsive thinking, and design tokens." },
  { id: "B-08", title: "TypeScript Foundations", scope: "V1·M7", status: "queued", summary: "Why types, the strict vocabulary, narrowing, and TypeScript on the DOM." },
];
