import type {
  BattleRef, BossBattle, FlashcardSet, GlossaryEntry, Lesson, LessonStatus, MasteryLevel,
  ModuleDef, TroubleEntry, VolumeDef,
} from "../lib/core";
import { m1 } from "./lessons1";
import { m2 } from "./lessons2";
import { m3 } from "./lessons3";
import { gitLessons as m4 } from "./lessons4";
import { m5 } from "./lessons5";
import { m6 } from "./lessons6";
import { m7 } from "./lessons7";
import { m8 } from "./lessons8";
import { m9 } from "./lessons9";

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
    mod("v1m5", 5, "Semantic HTML & Accessibility", "HTML as meaning, the accessibility tree, and ARIA used sparingly.", "implemented", m5),
    mod("v1m6", 6, "CSS & Responsive Design", "The cascade referee, flex/grid layout, responsive thinking, and design tokens.", "implemented", m6),
    mod("v1m7", 7, "TypeScript Foundations", "Types as documentation the compiler enforces.", "implemented", m7),
  ]),
  v(2, "II", "Professional JavaScript", "Deep JavaScript", "Modular code, honest error handling, and the tooling that keeps large codebases healthy.", [
    mod("v2m1", 1, "Modular JavaScript", "Files with contracts: imports, exports, boundaries, and the knots between them.", "implemented", m8),
    mod("v2m2", 2, "Error Handling That Scales", "Fail loudly in development, gracefully in production.", "implemented", m9),
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
  { id: "gauntlet-m1", title: "Checkpoint · Foundation Gauntlet", volumeId: 1, afterModule: "v1m7", blurb: "A cumulative fight across all of Volume I — the web, JavaScript, your workstation, Git, semantics, CSS, and TypeScript — pass at 70%." },
];

export const BATTLES: BossBattle[] = [
  {
    id: "gauntlet-m1",
    title: "Foundation Gauntlet",
    subtitle: "All of Volume I · pass ≥ 70%",
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
      {
        title: "Structure & Access",
        desc: "Semantics, the accessibility tree, and honest ARIA.",
        questions: [
          { id: "b13", type: "single", prompt: "A screen reader announcing every element as 'group' means…", options: ["the font is wrong", "the page is div soup — no semantics, so every node's role is generic", "the screen reader is outdated", "CSS is blocking it"], answer: [1], explain: "Divs compute to 'generic' roles. Landmarks, headings, and real controls give AT something to navigate." },
          { id: "b14", type: "single", prompt: "First resort for an interactive control?", options: ["role=\"button\" on a div", "a native <button>", "tabindex=\"0\" + keydown", "aria-label"], answer: [1], explain: "Native elements ship role + keyboard + announcements as a maintained bundle. ARIA and tabindex rebuild it by hand, badly." },
          { id: "b15", type: "boolean", prompt: "aria-expanded updates itself when the panel's CSS class changes.", options: ["True", "False"], answer: [1], explain: "False — ARIA attributes are inert strings; your code must set them in the same update as the visual state, or AT reads a lie." },
        ],
      },
      {
        title: "Types & Styles",
        desc: "The cascade, layout, and the compiler that reads your code.",
        questions: [
          { id: "b16", type: "single", prompt: "Which specificity wins: #main p or .card .card .title?", options: ["#main p — an ID outranks any number of classes", ".card .card .title — three classes beat one ID", "tie, source order decides", "both are invalid"], answer: [0], explain: "#main p is (0,1,0,1); the classes are (0,0,3,0). The ID column is more significant — compared left to right like a version number." },
          { id: "b17", type: "single", prompt: "A flex item with a long URL won't shrink. Fix?", options: ["flex-shrink: 1", "min-width: 0", "remove the gap", "use float instead"], answer: [1], explain: "Flex items default to min-width:auto (never smaller than content). min-width:0 restores leftover-space sizing." },
          { id: "b18", type: "boolean", prompt: "TypeScript adds runtime overhead because annotations ship to the browser.", options: ["True", "False"], answer: [1], explain: "False — all types are erased at compile time; the output is ordinary JavaScript. The value is entirely pre-runtime." },
          { id: "b19", type: "single", prompt: "The professional response to untrusted JSON at a boundary?", options: ["cast it: as ApiResponse", "type it with an interface and move on", "const x: unknown, then validate before use", "const x: any for flexibility"], answer: [2], explain: "Interfaces promise about YOUR code, not the world. unknown keeps the compiler engaged; validate at the boundary (parse → validate → trust)." },
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
  {
    id: "semantic-a11y", title: "Semantic HTML & Accessibility", blurb: "Module 5 — meaning, the accessibility tree, and ARIA discipline.",
    cards: [
      { front: "Landmark", back: "A signed region (header/nav/main/aside/footer) AT users can jump between instead of walking every element.", lesson: "html-as-structure" },
      { front: "Heading outline", back: "The h1–h6 tree encoding document depth. One h1, levels never skip — size is CSS's job.", lesson: "html-as-structure" },
      { front: "Alt by role", back: "Informative: describe the content. Functional: describe the action. Decorative: empty alt (never omit the attribute).", lesson: "html-as-structure" },
      { front: "Accessibility tree", back: "The browser's translation of the document into role/name/state nodes — the ONLY thing screen readers read.", lesson: "a11y-tree-keyboard" },
      { front: "Accessible name order", back: "Content first → associated label/alt → aria-label last resort. Fixes the claim, not the label.", lesson: "a11y-tree-keyboard" },
      { front: "Tab order rule", back: "DOM order IS tab order. Positive tabindex is banned; -1 is for script-managed focus.", lesson: "a11y-tree-keyboard" },
      { front: "Focus trap", back: "Modal: Tab cycles inside, Esc closes, and focus RETURNS to the trigger on close.", lesson: "a11y-tree-keyboard" },
      { front: "ARIA rule #1", back: "No ARIA beats bad ARIA. Native first; every attribute is a promise your code must keep.", lesson: "aria-when-needed" },
      { front: "Live regions", back: "role=status (polite) for confirmations; role=alert (assertive) for blocking errors. Region must exist before injection.", lesson: "aria-when-needed" },
      { front: "The ARIA lie", back: "ARIA changes what AT is TOLD, never behavior. An un-updated aria-expanded announces a permanent falsehood.", lesson: "aria-when-needed" },
    ],
  },
  {
    id: "css-layout", title: "CSS & Responsive Design", blurb: "Module 6 — the cascade referee, layout systems, and tokens.",
    cards: [
      { front: "The cascade's 3 tiebreakers", back: "Origin & importance → specificity → source order. Every conflict has exactly one deterministic winner.", lesson: "css-mental-model" },
      { front: "Specificity tuple", back: "(inline, IDs, classes, elements) compared left to right like a version number — a higher column always wins.", lesson: "css-mental-model" },
      { front: "border-box", back: "width counts content + padding + border. Set it globally; it makes width mean what it looks like.", lesson: "css-mental-model" },
      { front: "Flex vs grid", back: "One axis, content decides → flexbox (content-out). Two dimensions, structure decides → grid (layout-in).", lesson: "layout-flex-grid" },
      { front: "min-width: 0", back: "Flex items default to min-width:auto (never smaller than content). Set 0 so leftover-space sizing works.", lesson: "layout-flex-grid" },
      { front: "fr unit", back: "A share of LEFTOVER grid track space. 1fr 2fr splits the remainder 1:2, never the total.", lesson: "layout-flex-grid" },
      { front: "clamp()", back: "clamp(min, preferred, max) — fluid scaling between hard rem rails, no media queries.", lesson: "responsive-and-tokens" },
      { front: "Container query", back: "Responsive rules driven by an element's CONTAINER, not the viewport — the component adapts to its home.", lesson: "responsive-and-tokens" },
      { front: "Design token", back: "A named design decision (--acc, --space-4) defined once, referenced everywhere. Themes are remappings, not rewrites.", lesson: "responsive-and-tokens" },
    ],
  },
  {
    id: "ts-foundations", title: "TypeScript Foundations", blurb: "Module 7 — types as enforced documentation.",
    cards: [
      { front: "What a type IS", back: "A compile-time claim about a value; checked statically, erased at runtime. Zero runtime cost.", lesson: "why-types" },
      { front: "Strict mode", back: "The tsconfig umbrella enabling the checks (strictNullChecks, noImplicitAny, …) that keep types honest. The only sane default.", lesson: "why-types" },
      { front: "Union of literals", back: "status: \"idle\" | \"loading\" | \"error\" — a closed menu the compiler enforces. The end of string soup.", lesson: "ts-strict-basics" },
      { front: "optional vs nullable", back: "? means the key may be absent. | null means present-but-possibly-null. Model deliberately.", lesson: "ts-strict-basics" },
      { front: "any vs unknown", back: "any switches the compiler off (and spreads). unknown is 'I don't know' — you must inspect before using.", lesson: "ts-strict-basics" },
      { front: "Narrowing", back: "The compiler eliminating union members as it reads your guards, per branch. You earn precision by proving.", lesson: "narrowing" },
      { front: "Discriminated union", back: "Union members sharing a literal-typed discriminant (kind) — impossible states become unrepresentable.", lesson: "narrowing" },
      { front: "The never-check", back: "const _x: never = s in a switch default proves exhaustiveness; a missed case fails the build, naming it.", lesson: "narrowing" },
      { front: "lib.dom.d.ts", back: "The browser API declarations bundled with TypeScript — why document is typed with nothing installed.", lesson: "ts-dom" },
      { front: "Parse → validate → trust", back: "The boundary pattern for foreign data: unknown in, runtime checks, typed out. Never a bare cast.", lesson: "ts-dom" },
    ],
  },
  {
    id: "modular-js", title: "Modular JavaScript", blurb: "Volume II · M1 — contracts, boundaries, cycles, and lazy loading.",
    cards: [
      { front: "Module", back: "A file with its own scope; exports form its public contract, internals stay private.", lesson: "es-modules" },
      { front: "Named vs default export", back: "Named: exact name, statically checked, many per file. Default: one per file, any local name — renames surface only at runtime.", lesson: "es-modules" },
      { front: "Static analysis", back: "Imports/exports are known without running the file — what enables tree-shaking and safe renames.", lesson: "es-modules" },
      { front: "Tree-shaking", back: "Bundler dead-code elimination. Needs named exports + no top-level side effects; import * and side effects cancel it.", lesson: "es-modules" },
      { front: "ESM vs CJS", back: "Write ESM, read CJS, never mix in one file. ESM: hoisted, live bindings, analyzable. CJS: runtime, copies.", lesson: "es-modules" },
      { front: "Verb-shaped API", back: "Export operations (createTask), not raw data (tasks) — callers state intentions, internals stay yours.", lesson: "module-boundaries" },
      { front: "One-way arrows", back: "Imports point one direction (state → dom → app). An uphill import means a missing wiring layer, not a shortcut.", lesson: "module-boundaries" },
      { front: "Module state = singleton", back: "Module-level bindings are one shared instance per process. On servers: per-worker and mortal — not a source of truth.", lesson: "module-boundaries" },
      { front: "Module identity", back: "The RESOLVED specifier, not the file. Two spellings of one file = two modules = two copies of its state.", lesson: "module-boundaries" },
      { front: "Circular dependency", back: "a↔b imports; the later-entered module reads the earlier one mid-initialization (undefined or TDZ).", lesson: "circular-and-dynamic" },
      { front: "Why functions survive cycles", back: "Declarations hoist (usable early); const bindings sit in the TDZ — reading them before init throws.", lesson: "circular-and-dynamic" },
      { front: "The three cycle fixes", back: "Invert (pass it in), Extract (shared third module), Defer (await import). Invert/extract fix design; defer fixes timing.", lesson: "circular-and-dynamic" },
      { front: "Dynamic import()", back: "A promise for the module namespace — code splitting at coarse seams. Over-splitting causes request waterfalls.", lesson: "circular-and-dynamic" },
      { front: "Top-level await", back: "Awaiting in a module body stalls EVERY importer until resolved — contagious. Prefer awaiting inside functions.", lesson: "circular-and-dynamic" },
    ],
  },
  {
    id: "error-handling", title: "Error Handling That Scales", blurb: "Volume II · M2 — the taxonomy, Results, and async escape hatches.",
    cards: [
      { front: "Bug vs expected failure", back: "Bug: broken regardless of conditions → fail fast, fix code. Failure: normal world (input, network) → recover gracefully.", lesson: "error-taxonomy" },
      { front: "The sorting question", back: "'Would better conditions make this succeed?' Yes → handle it. No → fix the code. Asked before any try/catch.", lesson: "error-taxonomy" },
      { front: "Fail fast", back: "Bugs crash loudly in development so they surface NOW — a red screen today is a prevented incident tomorrow.", lesson: "error-taxonomy" },
      { front: "Cause chain", back: "new Error(msg, { cause: err }) — context up front, original failure preserved underneath. The end of log-then-rethrow.", lesson: "error-taxonomy" },
      { front: "Swallowed catch", back: "An empty catch converts every failure into silence. Every catch must recover, rethrow with cause, or report.", lesson: "error-taxonomy" },
      { front: "Two audiences", back: "Logs get the stack, ids, context. Users get what happened + what to do. Never send stacks to browsers.", lesson: "error-taxonomy" },
      { front: "Result", back: "Result<E, T> = { ok: true, value } | { ok: false, error } — failure as a typed return value the compiler can enforce.", lesson: "result-pattern" },
      { front: "Why exceptions are invisible", back: "throw exits through a door not in the signature; no caller is forced to acknowledge it. Result moves the failure INTO the type.", lesson: "result-pattern" },
      { front: "Result-vs-throw rule", back: "Results for weather (parsing, I/O, input); exceptions for earthquakes (bugs). Result-everywhere drowns the signal.", lesson: "result-pattern" },
      { front: "andThen / flatMap", back: "Run the next fallible step only on Success; Failures pass through — flat pipelines, first failure short-circuits.", lesson: "result-pattern" },
      { front: "Failure owner", back: "The specific line responsible for a promise's failure: await+catch, .catch, or a consumed Result. No owner = orphan.", lesson: "async-failure-modes" },
      { front: "Unhandled rejection", back: "A rejected promise nobody awaited — an event, not a crash, in browsers. Modern Node crashes on it by default.", lesson: "async-failure-modes" },
      { front: "all vs allSettled", back: "all: unit batch, first failure aborts the race. allSettled: independent items, every fate reported individually.", lesson: "async-failure-modes" },
      { front: "Smoke detectors", back: "Global unhandledrejection/error listeners REPORT escapes to your tracker; only local handling fixes the user's dead button.", lesson: "async-failure-modes" },
      { front: "Retry policy", back: "Only idempotent + transient failures; exponential backoff + jitter; a cap. Blind retries on POSTs charge twice.", lesson: "async-failure-modes" },
      { front: "Optimistic UI's debt", back: "Acting before confirmation obligates a visible rollback. No .catch = the UI silently diverges from the database.", lesson: "async-failure-modes" },
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
  { term: "Landmark", def: "A semantic region (header/nav/main/aside/footer) AT users can navigate between directly.", domain: "Accessibility", lesson: "html-as-structure" },
  { term: "Accessibility tree", def: "The browser's translation of the document into role/name/state nodes that assistive tech reads.", domain: "Accessibility", lesson: "a11y-tree-keyboard" },
  { term: "Accessible name", def: "What a control is announced as — computed from content, then label/alt, then aria-label.", domain: "Accessibility", lesson: "a11y-tree-keyboard" },
  { term: "Focus trap", def: "Confining keyboard focus inside an open overlay and returning it to the trigger on close.", domain: "Accessibility", lesson: "a11y-tree-keyboard" },
  { term: "ARIA", def: "Attributes adding role/name/state to the accessibility tree — annotations, never behavior.", domain: "Accessibility", lesson: "aria-when-needed" },
  { term: "Specificity", def: "A selector's rank as a tuple (inline, IDs, classes, elements), compared left to right.", domain: "CSS", lesson: "css-mental-model" },
  { term: "Box model", def: "content + padding + border + margin; border-box counts the first three in width.", domain: "CSS", lesson: "css-mental-model" },
  { term: "fr unit", def: "A share of leftover grid track space.", domain: "CSS", lesson: "layout-flex-grid" },
  { term: "Design token", def: "A named design decision defined once and referenced everywhere.", domain: "CSS", lesson: "responsive-and-tokens" },
  { term: "Union type", def: "A type listing exact possibilities (A | B); the compiler enforces exhaustiveness.", domain: "TypeScript", lesson: "ts-strict-basics" },
  { term: "Narrowing", def: "The compiler eliminating union members as it reads your guards.", domain: "TypeScript", lesson: "narrowing" },
  { term: "Discriminated union", def: "Union members sharing a literal-typed discriminant — impossible states unrepresentable.", domain: "TypeScript", lesson: "narrowing" },
  { term: "Declaration file", def: "A .d.ts file describing a library's types without runtime code.", domain: "TypeScript", lesson: "ts-dom" },
  { term: "Named export", def: "export const/fn/class — imported by exact name, statically checked at build time.", domain: "Modules", lesson: "es-modules" },
  { term: "Tree-shaking", def: "Bundler dead-code elimination made possible by statically analyzable exports.", domain: "Modules", lesson: "es-modules" },
  { term: "Public surface", def: "A module's exported symbols — the contract it promises to support.", domain: "Modules", lesson: "module-boundaries" },
  { term: "Barrel", def: "An index file re-exporting a boundary's public API; keep it narrow.", domain: "Modules", lesson: "module-boundaries" },
  { term: "Circular dependency", def: "Two modules importing each other; one always reads the other mid-initialization.", domain: "Modules", lesson: "circular-and-dynamic" },
  { term: "Code splitting", def: "Shipping code as separate chunks loaded on demand via dynamic import().", domain: "Modules", lesson: "circular-and-dynamic" },
  { term: "Top-level await", def: "Awaiting in a module body; stalls every importer until resolved.", domain: "Modules", lesson: "circular-and-dynamic" },
  { term: "Bug", def: "A violated contract — wrong regardless of conditions. Response: fail fast, fix the code.", domain: "Errors", lesson: "error-taxonomy" },
  { term: "Expected failure", def: "A normal outcome against an uncooperative world (bad input, network, absence). Response: recover gracefully.", domain: "Errors", lesson: "error-taxonomy" },
  { term: "Cause chain", def: "new Error(msg, { cause }) — the original error preserved when rethrowing with added context.", domain: "Errors", lesson: "error-taxonomy" },
  { term: "Result", def: "Result<E, T>: Success(value) | Failure(reason) — expected failure as a typed return value.", domain: "Errors", lesson: "result-pattern" },
  { term: "Failure owner", def: "The specific line responsible for a promise's failure: await+catch, .catch, or a consumed Result.", domain: "Errors", lesson: "async-failure-modes" },
  { term: "Unhandled rejection", def: "A rejected promise with no await or .catch — an event by default, a crash in modern Node.", domain: "Errors", lesson: "async-failure-modes" },
  { term: "Exponential backoff", def: "Retry waits that double (with jitter) and cap out — the polite way to retry transient failures.", domain: "Errors", lesson: "async-failure-modes" },
];

/* ————— troubleshooting ————— */
export const TROUBLESHOOTING: TroubleEntry[] = [
  { id: "nxdomain", symptom: "'This site can't be reached — NXDOMAIN' while the same site works for teammates.", layer: "DNS / name resolution", causes: ["Stale or poisoned resolver/OS DNS cache", "Recent DNS record change your resolver hasn't refreshed", "A hosts-file entry hijacking the name"], diagnose: ["dig example.com +short — does YOUR machine resolve it?", "dig @8.8.8.8 example.com +short — does a public resolver?", "Check your hosts file for stray entries."], fix: "Flush the OS DNS cache or switch resolvers; retry. NXDOMAIN means the request never left the name-lookup stage.", prevent: "Lower TTLs a day before planned DNS changes so caches refresh quickly.", related: "what-happens-when" },
  { id: "unsupported-media-type", symptom: "POST returns 400 'Unsupported Media Type' from code but works from Postman.", layer: "HTTP headers", causes: ["fetch body sent without Content-Type", "Content-Type says text/plain while the body is JSON"], diagnose: ["DevTools → Network → failing request → Headers; compare with the working tool.", "Reproduce with curl -H 'Content-Type: application/json'."], fix: "Set headers: { \"Content-Type\": \"application/json\" } and JSON.stringify the body.", prevent: "Wrap fetch in a client that always sets Content-Type and checks res.ok.", related: "http-request-response" },
  { id: "command-not-found", symptom: "'command not found' for a tool you know is installed.", layer: "Shell / PATH", causes: ["The binary's directory isn't on PATH", "The shell started before PATH was updated"], diagnose: ["echo $PATH — is the install directory listed?", "which <tool> — does it resolve?"], fix: "Add the directory to PATH and open a fresh terminal (or source your rc file).", prevent: "Know where your tools install; confirm resolution with which.", related: "terminal-mental-model" },
  { id: "works-on-my-machine", symptom: "Runs locally but crashes on a teammate's machine with a missing library export.", layer: "Dependencies / lockfile", causes: ["No committed lockfile — installs drifted to different versions", "A dependency installed but never added to package.json"], diagnose: ["Compare installed versions of the failing package on both machines.", "Fresh-clone test: install from the lockfile only and run."], fix: "Commit the lockfile; reinstall from it on both machines.", prevent: "Install with --frozen-lockfile in CI so drift fails loudly at build time.", related: "node-and-runtime" },
  { id: "committed-secret", symptom: "A .env with real keys was committed and pushed.", layer: "Secrets / Git history", causes: [".gitignore missing or added after the secret", "No pre-commit secret scanning"], diagnose: ["Confirm the secret is in history: git log -p -- .env", "Check the provider's usage logs for the exposed key."], fix: "ROTATE the key first (revoke + reissue), then scrub history and force-push, then audit.", prevent: ".gitignore on day zero, a pre-commit secret scanner, and .env.example for names.", related: "env-variables-secrets" },
  { id: "merge-conflict", symptom: "git merge stops with 'CONFLICT (content)' and files full of <<<<<<< markers.", layer: "Git merge", causes: ["Two branches edited the same lines", "A long-lived branch diverging far from main"], diagnose: ["git status lists the conflicted files", "Open each file; markers delimit the two competing versions"], fix: "Edit out ALL markers keeping the correct combined result, then git add <file> and git commit to seal the merge.", prevent: "Merge main into your branch frequently so conflicts stay small and local.", related: "branches-prs-review" },
  { id: "unreachable-control", symptom: "A menu/button works with the mouse but keyboard users can't reach or activate it.", layer: "HTML semantics / focus", causes: ["Interactivity built on a <div> or <span> with onclick", "No href on an <a>, so it isn't focusable", "outline removed with no visible focus style"], diagnose: ["Press Tab: does a focus ring ever land on the control?", "DevTools → Accessibility pane: what role/name does the node have?"], fix: "Use a native <button> (or <a href>) — role, keyboard activation, and focus come free. Style :focus-visible visibly.", prevent: "Every clickable non-link is a <button>; run a 60-second keyboard pass per screen.", related: "a11y-tree-keyboard" },
  { id: "css-not-applying", symptom: "A CSS rule silently doesn't apply; DevTools shows it struck through.", layer: "CSS specificity", causes: ["A higher-specificity rule targets the same property", "The selector doesn't actually match the element", "An ancestor sets a non-inheriting property you expected to flow down"], diagnose: ["Open DevTools Styles: find the struck-through rule and the one above it", "Compute both specificity tuples", "Check the Computed tab for where the value actually comes from"], fix: "Fix the rank, not the volume: lower the winner's specificity or raise yours honestly. Never reach for !important first.", prevent: "Keep selectors 1–2 classes deep; avoid IDs for styling; use @layer for framework overrides.", related: "css-mental-model" },
  { id: "possibly-undefined", symptom: "tsc reports 'Object is possibly undefined' and the urge is to sprinkle ! everywhere.", layer: "TypeScript null-safety", causes: ["A value genuinely can be undefined and the code doesn't handle it", "An API is typed too loosely (returns T | undefined when it needn't)"], diagnose: ["Read the signature: where can undefined come from?", "Ask the design question: missing means 'use a default' or 'this can't run'?"], fix: "Handle the fork: a default (?? fallback), an early return, or tighten the contract so absence is impossible. Avoid ! and casts.", prevent: "Treat ! like a loaded weapon needing a justifying comment; prefer narrowing and defaults.", related: "ts-strict-basics" },
  { id: "import-outside-module", symptom: "Uncaught SyntaxError: Cannot use import statement outside a module.", layer: "Module context", causes: ["The entry <script> lacks type=\"module\"", "A Node .js file uses ESM syntax but package.json has no \"type\": \"module\""], diagnose: ["Browser: inspect the <script> tag loading the file", "Node: check package.json for the type field and the file's extension"], fix: "Declare the module context: <script type=\"module\"> in HTML, or \"type\": \"module\" in package.json (or a .mjs extension).", prevent: "Declare the module system on day one of every project; don't mix ESM and CJS in one file.", related: "es-modules" },
  { id: "circular-undefined", symptom: "An exported value is defined in its file but undefined (or TDZ) when imported elsewhere; works when the file is tested alone.", layer: "Module graph / evaluation order", causes: ["Two modules import each other; one reads the other mid-initialization", "A const arrow/class binding is read before its initializer ran (TDZ)"], diagnose: ["Trace the import graph for a↔b cycles (madge --circular helps)", "Add a top-level log to each module; the one that runs second sees the uninitialized binding"], fix: "Break the cycle: invert (pass the dependency in), extract (shared third module), or defer (await import). Prefer invert/extract.", prevent: "Keep dependency arrows one-way; draw the arrow before adding an import that points at a module already pointing at you.", related: "circular-and-dynamic" },
  { id: "silent-nothing", symptom: "A button/action sometimes 'does nothing' — no error, no spinner, no message. The feature works most of the time.", layer: "Error handling / catch blocks", causes: ["An empty (or log-only) catch swallowing an expected failure", "An async call with no await and no .catch — the rejection is orphaned"], diagnose: ["Reproduce with the network throttled or the endpoint failing", "Grep for catch {, catch {}, and promise calls lacking await/.catch"], fix: "Give the failure an owner: render an error state, recover, or report with cause. Empty catches get a visible decision.", prevent: "Lint no-empty; review every catch as a sentence: 'when this fails, the user will…'", related: "error-taxonomy" },
  { id: "prod-silent-failure", symptom: "Works in development; in production, data silently goes stale or actions don't persist. No errors in logs or tracker.", layer: "Async failure routing", causes: ["A fire-and-forget promise whose rejection is never awaited (optimistic UI + no .catch)", "A rejection handled only by console.log, invisible in prod"], diagnose: ["Throttle the network / force a 500, perform the action, reload", "Check for 'Unhandled promise rejection' in the browser console"], fix: "Attach the failure: await + try/catch with rollback, or .catch that reports. Add a global unhandledrejection reporter.", prevent: "For every async call, point at the line that handles its failure; treat optimistic updates as requiring a written rollback path.", related: "async-failure-modes" },
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
  { id: "B-06", title: "Semantic HTML & Accessibility", scope: "V1·M5", status: "shipped", summary: "HTML as meaning (landmarks/outline/forms/images), the accessibility tree + keyboard flows, ARIA used sparingly — 18 quiz questions, 3 debugging labs, plus the Accessibility Checklist reference." },
  { id: "B-07", title: "CSS & Responsive Design", scope: "V1·M6", status: "shipped", summary: "The cascade as a rulebook (specificity tuples, box model, @layer), flex/grid layout with the min-width:0 lab, and responsive thinking + design tokens — 15 quiz questions, 2 debugging labs." },
  { id: "B-08", title: "TypeScript Foundations", scope: "V1·M7", status: "shipped", summary: "Why types (bug archaeology), the strict vocabulary, narrowing + discriminated unions + the never-check, and TypeScript on the browser — 20 quiz questions, 3 debugging labs, 1 migration walkthrough." },
  { id: "B-09", title: "Volume II · Modular JavaScript", scope: "V2·M1", status: "shipped", summary: "ES modules as contracts (named/default, hoisting, tree-shaking, CJS boundary), verb-shaped public surfaces & one-way arrows, module-level state as singletons, circular dependencies + dynamic import() — 18 quiz questions, 3 debugging labs. The Builder level opens." },
  { id: "B-10", title: "Volume II · Error Handling That Scales", scope: "V2·M2", status: "shipped", summary: "The bug-vs-failure taxonomy, throwing with intent (cause chains, domain classes), stack traces read bottom-up, the Result pattern as typed failures with exhaustiveness, and async escape hatches (orphaned promises, allSettled, global alarms, retry policy) — 18 quiz questions, 3 debugging labs." },
  { id: "B-11", title: "Volume II · Tooling: Lint, Format, Build", scope: "V2·M3", status: "next", summary: "ESLint + Prettier as team contracts, the build pipeline, and CI that fails loudly — closing Volume II with a Builder Gauntlet." },
  { id: "B-12", title: "React", scope: "Volume III", status: "queued", summary: "Mental models, state & rendering, effects & data — the component era begins." },
  { id: "B-13", title: "Web Architecture", scope: "Volume IV", status: "queued", summary: "REST, AuthN/AuthZ, caching & security — the browser/server boundary made rigorous." },
  { id: "B-14", title: "PostgreSQL", scope: "Volume V", status: "queued", summary: "Modeling, SQL, and performance — relational data done properly." },
];
