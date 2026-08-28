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
import { m10 } from "./lessons10";
import { m11 } from "./lessons11";
import { m12 } from "./lessons12";
import { m13 } from "./lessons13";

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
    mod("v2m3", 3, "Tooling: Lint, Format, Build", "ESLint, Prettier, and bundlers as team agreements.", "implemented", m10),
  ]),
  v(3, "III", "React", "React Phase", "Component thinking: state, rendering, effects discipline, forms, architecture, testing, and performance.", [
    mod("v3m1", 1, "React Mental Models", "UI as a function of state; JSX, props, composition, and the render cycle.", "implemented", m11),
    mod("v3m2", 2, "State & the Rendering Model", "The state-classification doctrine and how React decides what to re-render.", "implemented", m12),
    mod("v3m3", 3, "Effects Discipline & Data", "Effects as synchronization, dependency honesty, and the bridge to server state.", "implemented", m13),
    mod("v3m4", 4, "Forms & Controlled Inputs", "Forms as controlled state: validation, UX, and accessible error surfacing.", "planned", [
      p("controlled-forms", "Controlled Inputs and the Single Source of Truth", 3, 4, 1, 50, "Value + onChange ownership, form events, and why uncontrolled has a place.", ["data-fetching"], ["forms"]),
      p("forms-validation-ux", "Validation UX: Errors That Help, Not Accuse", 3, 4, 2, 50, "Validate on blur/submit, accessible error wiring, and the submit pipeline.", ["controlled-forms"], ["validation"]),
    ]),
    mod("v3m5", 5, "Component Architecture & Testing", "Patterns that scale: composition, colocation, context boundaries, and meaningful tests.", "planned", [
      p("component-patterns", "Component Patterns: Colocation, Context, and When to Reach for Each", 3, 5, 1, 55, "Prop drilling vs context, compound components, and the colocation principle.", ["forms-validation-ux"], ["architecture"]),
      p("testing-react", "Testing React: Behavior, Not Implementation", 3, 5, 2, 55, "Testing Library queries, user events, and the tests that earn their keep.", ["component-patterns"], ["testing"]),
    ]),
    mod("v3m6", 6, "Performance & Profiling", "Measure first: renders, memo, lists, and the profiling loop that closes Volume III.", "planned", [
      p("rendering-performance", "Rendering Performance: Memo, Lists, and the Cost of a Render", 3, 6, 1, 55, "When re-renders are fine, when they aren't, and memo as a last resort.", ["testing-react"], ["performance"]),
      p("profiling-production", "Profiling: From Feeling Slow to Proving Why", 3, 6, 2, 50, "The DevTools profiler loop, virtualization, and the measurement habit.", ["rendering-performance"], ["profiling"]),
    ]),
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
  { id: "gauntlet-m2", title: "Checkpoint · Builder Gauntlet", volumeId: 2, afterModule: "v2m3", blurb: "A cumulative fight across all of Volume II — modules, boundaries, cycles, error ownership, Results, async failures, and the tooling that enforces it — pass at 70%." },
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
  {
    id: "gauntlet-m2",
    title: "Builder Gauntlet",
    subtitle: "All of Volume II · pass ≥ 70%",
    passPct: 70,
    intro: [
      "Volume II was about writing JavaScript that holds up: modules with contracts, failures you own, and machinery that enforces it all. This gauntlet asks you to reason through the same decisions, not recite them.",
      "Pass at 70%. Every missed question links back to the lesson that teaches the idea.",
    ],
    rules: [
      "Answer every question, then submit.",
      "Multi-select questions are all-or-nothing.",
      "Predict-output questions: commit to an answer before checking.",
    ],
    sections: [
      {
        title: "Modules & Boundaries",
        desc: "Contracts, arrows, singletons, and cycles.",
        questions: [
          { id: "m2b1", type: "single", prompt: "An exported value is defined in its file but undefined when imported; works when tested alone. Most likely cause?", options: ["The file has a syntax error", "A circular import — one module reads the other mid-initialization", "The export isn't exported", "The bundler dropped it"], answer: [1], explain: "In a↔b cycles, the later-entered module reads the earlier one before its const bindings initialized (TDZ). Functions survive (hoisted); const bindings don't." },
          { id: "m2b2", type: "single", prompt: "Why prefer named exports over a single default export for a library?", options: ["Defaults are slower", "Named imports are checked statically — a typo fails the build; a renamed default surfaces only at runtime", "You can only have one named export", "Tree-shaking ignores defaults"], answer: [1], explain: "Named imports are compile-time checked, so a misspelling or rename fails immediately. Default imports accept any local name, so rot surfaces at runtime." },
          { id: "m2b3", type: "single", prompt: "Module-level state (a let at the top of a module) is effectively…", options: ["A fresh value per import", "A singleton — one shared instance per process", "Thread-safe", "Impossible in ESM"], answer: [1], explain: "A module is evaluated once and its bindings shared by all importers — a singleton. On servers it's also per-worker and mortal, so it's never a source of truth." },
          { id: "m2b4", type: "single", prompt: "You need two modules to stop importing each other. The strongest fix?", options: ["Add a third module both import (extract), or pass the dependency in (invert)", "Use require instead of import", "Make both exports default", "Ignore it — cycles are harmless"], answer: [0], explain: "Invert or extract attacks the design; both remove the cycle at its root. defer (await import) only fixes timing, not the arrow." },
        ],
      },
      {
        title: "Error Ownership",
        desc: "The taxonomy, Results, and the async escapes.",
        questions: [
          { id: "m2b5", type: "single", prompt: "A payment declines. By the taxonomy, this is…", options: ["A bug — fix the code", "An expected failure — recover gracefully", "Undefined behavior", "A type error"], answer: [1], explain: "Would better conditions make it succeed? A different card would — so it's an expected failure: handle it, don't crash or retry blindly." },
          { id: "m2b6", type: "single", prompt: "The one question that sorts bugs from failures?", options: ["Is it in production?", "Would changing conditions (input, network, time) make this succeed?", "Does it throw?", "Is it logged?"], answer: [1], explain: "Yes → failure, handle it. No → bug, fix the code. Asked before any try/catch is written." },
          { id: "m2b7", type: "single", prompt: "Why does Result<E,T> scale better than exceptions for expected failures?", options: ["It's faster at runtime", "The failure is part of the return type, so the compiler forces every caller to handle it", "It prevents all bugs", "It removes the need for types"], answer: [1], explain: "throw exits through a door not in the signature; nothing forces a caller to catch it. Result puts the failure in the type, and narrowing/exhaustiveness make skipping it a compile error." },
          { id: "m2b8", type: "single", prompt: "A promise is created but never awaited or .catch'd, and it rejects. In a browser this is…", options: ["A hard crash", "An unhandled-rejection event — silent unless you listen; the user sees nothing", "Automatically retried", "A compile error"], answer: [1], explain: "The rejection is orphaned. Browsers fire an event but don't crash, so the failure is invisible unless you attach a global unhandledrejection reporter AND fix the missing owner." },
          { id: "m2b9", type: "single", prompt: "Promise.all vs Promise.allSettled — when does allSettled win?", options: ["Always", "When the items are independent and you want every fate reported, not aborted on first failure", "Never — all is strictly better", "Only for sync code"], answer: [1], explain: "all aborts the race on the first rejection (unit batches). allSettled waits for everything and reports each outcome individually (independent items like parallel fetches of widgets)." },
        ],
      },
      {
        title: "The Machinery",
        desc: "Lint, build, and the gate.",
        questions: [
          { id: "m2b10", type: "single", prompt: "Which concern belongs to Prettier, not ESLint?", options: ["Catching == vs ===", "Choosing single vs double quotes", "Flagging unused variables", "Detecting conditional hooks"], answer: [1], explain: "Quote style is pure appearance — Prettier's lane. The others are correctness and belong in the linter." },
          { id: "m2b11", type: "single", prompt: "A bug reproduces only after pnpm build, and the trace is minified. First move?", options: ["Add console.logs to source", "Serve the real dist/ output and use source maps to translate the trace", "Reinstall node_modules", "Disable minification forever"], answer: [1], explain: "Dev and prod are different programs. Reproduce with the same pipeline, then read the minified trace via source maps." },
          { id: "m2b12", type: "single", prompt: "A test passes locally but fails in CI. Best interpretation?", options: ["CI is flaky, retry until green", "The code depends on something in my local environment that isn't shipped", "The test should be skipped", "Disable CI for this branch"], answer: [1], explain: "CI runs on a clean machine, surfacing hidden local dependencies (undeclared packages, uncommitted files, timezone). That's CI working, not broken." },
          { id: "m2b13", type: "boolean", prompt: "Skipping a persistently-failing test to unblock a merge keeps the CI gate trustworthy.", options: ["True", "False"], answer: [1], explain: "False — every skipped check is an agreed hole in the wall and trains the team that red can be ignored. Fix the failure or change the rule deliberately in review." },
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
  {
    id: "tooling", title: "Tooling: Lint, Build, CI", blurb: "Volume II · M3 — the machinery that keeps habits enforced.",
    cards: [
      { front: "Linter vs formatter", back: "Linter = correctness (catches bugs); formatter = appearance (one shared style). Never let one tool do both.", lesson: "lint-format" },
      { front: "The linter's admission test", back: "'Does this rule prevent a defect?' Yes → linter. Cosmetic → Prettier or nowhere.", lesson: "lint-format" },
      { front: "eslint-config-prettier", back: "Goes LAST in the ESLint config to disable all formatting rules, giving Prettier sole ownership of appearance.", lesson: "lint-format" },
      { front: "prettier --check", back: "The CI mode: exits non-zero on unformatted files WITHOUT rewriting them — proves the gate.", lesson: "lint-format" },
      { front: "Whitespace merge conflicts", back: "Caused by divergent formatters — Git treats whitespace as content. Fix with one shared enforced formatter + format-on-save.", lesson: "lint-format" },
      { front: "The 4 build stages", back: "Transform → Bundle → Tree-shake/Minify → Emit. The browser runs the output, not your source.", lesson: "build-pipeline" },
      { front: "Tree-shaking's limit", back: "Only drops what it can PROVE is unused. A top-level side effect makes removal unsafe, so the module is kept.", lesson: "build-pipeline" },
      { front: "Source map", back: "Translates minified prod positions back to your original source lines — essential for prod debugging.", lesson: "build-pipeline" },
      { front: "'Works in dev, breaks in prod'", back: "Dev and prod are different programs. Reproduce by serving the real dist/ output, then read the trace via source maps.", lesson: "build-pipeline" },
      { front: "Exit code", back: "A process's result: 0 = success, non-zero = failure. CI is just a chain of these joined by &&.", lesson: "ci-gate" },
      { front: "The essential CI chain", back: "install --frozen-lockfile → tsc --noEmit → eslint → prettier --check → test → build. First non-zero exit fails the pipeline.", lesson: "ci-gate" },
      { front: "'Passes locally, fails in CI'", back: "CI runs on a clean machine — it surfaces hidden local dependencies (undeclared packages, uncommitted files, timezone). Good news, not flaky.", lesson: "ci-gate" },
      { front: "Reading a CI log", back: "Find the FIRST failing step and its first error line — later errors are usually consequences.", lesson: "ci-gate" },
      { front: "Why a slow gate fails", back: "People stop waiting and bypass it, so red loses meaning. Speed and trust are the same property.", lesson: "ci-gate" },
    ],
  },
  {
    id: "react-mental-models", title: "React Mental Models", blurb: "Volume III · M1 — describe don't update, props as contracts, state as remembered input.",
    cards: [
      { front: "UI = f(state)", back: "The screen is a pure OUTPUT of data. You change the input (state); React re-derives the picture. Describe, never poke.", lesson: "react-why" },
      { front: "The manual-DOM failure mode", back: "Two sources of truth — data and its mirrors in the DOM — synchronized by hand. Every forgotten mirror is a stale-UI bug.", lesson: "react-why" },
      { front: "Reconciliation", back: "React diffs this render's description against the last one and patches only what changed. Same type → keep; type change → rebuild that subtree.", lesson: "react-why" },
      { front: "Virtual DOM", back: "Not a second DOM — just this render's plain description objects, used for the diff.", lesson: "react-why" },
      { front: "What React does NOT own", back: "fetch, localStorage, routing, timers. React owns rendering + state plumbing; the browser APIs are still yours.", lesson: "react-why" },
      { front: "Derive, don't store", back: "If a value is computable from existing state, compute it during render. Derived values cannot drift from their source.", lesson: "react-why" },
      { front: "JSX's three rules", back: "{expression} anywhere a value goes; conditionals as && or ternary (if is a statement); lists as .map().", lesson: "jsx-props-composition" },
      { front: "key = identity", back: "Stable, unique, data-derived ID so reconciliation matches items across renders by identity, not position. Never the index for stateful/reorderable lists.", lesson: "jsx-props-composition" },
      { front: "Data down, events up", back: "Props flow down and are read-only. To change anything, a child calls a callback prop (onX) and the parent updates its state.", lesson: "jsx-props-composition" },
      { front: "children", back: "The prop holding everything between a component's tags — composition (flexible boxes) beats configuration (boolean swamps).", lesson: "jsx-props-composition" },
      { front: "State, precisely", back: "Data React remembers across renders whose change triggers a re-render. Memory + trigger. Plain variables die each render.", lesson: "state-render-model" },
      { front: "setState is a request", back: "It queues an update; the current handler keeps reading this render's snapshot. Batching gives one consistent render per event.", lesson: "state-render-model" },
      { front: "The undercount bug", back: "setX(x + 1) three times → +1, because all three read the same snapshot. Fix: updater form setX(prev => prev + 1) chains through the queue.", lesson: "state-render-model" },
      { front: "The silent no-op", back: "Mutating state then setItems(items) passes the SAME reference — React's comparison finds nothing, nothing renders. Produce new values (map/filter/spread).", lesson: "state-render-model" },
      { front: "State vs useRef", back: "A rendering question, not mutability: state changes re-render; ref changes are invisible to rendering (DOM nodes, timers, last-values).", lesson: "state-render-model" },
    ],
  },
  {
    id: "react-state-rendering", title: "State & the Rendering Model", blurb: "Volume III · M2 — the eight kinds of state and the two-phase render model.",
    cards: [
      { front: "The three-question filing test", back: "Q1 origin (API → server state)? Q2 computable (→ derive, don't store)? Q3 survive/share (→ persistent sink / URL)? Run in order; server-ness wins.", lesson: "state-classification" },
      { front: "Server state's real nature", back: "A CACHE of the server's truth with staleness laws: loading, error, refetch, invalidate. useState alone inherits none of them.", lesson: "state-classification" },
      { front: "The eight kinds", back: "Local UI · derived · form · URL · server · session/auth · global client · persistent. Most 'state management' pain is misfiled state.", lesson: "state-classification" },
      { front: "URL state buys", back: "Shareability, bookmarks, back/forward correctness, reload survival — and it's an accessibility win, not just a nicety.", lesson: "state-classification" },
      { front: "The escalation ladder", back: "local useState → lift to common parent → context (app-wide, rare-change) → a library only when a KIND demands it. Pay only the rung you need.", lesson: "state-classification" },
      { front: "Stored derived state", back: "The #1 drift bug: a computable value copied into useState and synced by effects. Fix: compute during render; it's correct by construction.", lesson: "state-classification" },
      { front: "Render phase", back: "Building descriptions: pure, interruptible, discardable; zero DOM touched. Cheap — re-renders are normal, not failure.", lesson: "how-react-renders" },
      { front: "Commit phase", back: "The single uninterrupted sweep: diff + minimal DOM patch. The only part users feel.", lesson: "how-react-renders" },
      { front: "The three re-render triggers", back: "Own state changed · parent re-rendered · subscribed context changed. The complete list — 'props would differ' is NOT one.", lesson: "how-react-renders" },
      { front: "Why parent re-renders are fine", back: "The child pays its function body, but an identical description is discarded by the diff → zero DOM work.", lesson: "how-react-renders" },
      { front: "The memo identity trap", back: "memo compares props by REFERENCE. Inline {}/[]/arrows are fresh identities every render → memo never bails. Stabilize with useMemo/useCallback.", lesson: "how-react-renders" },
      { front: "useMemo/useCallback really", back: "Identity stabilizers — they preserve the same reference across renders; they make nothing 'faster'.", lesson: "how-react-renders" },
      { front: "The optimization order", back: "Profile ('Why did this render?') → restructure state → stabilize identities → memo last, targeted. Never memoize speculatively.", lesson: "how-react-renders" },
    ],
  },
  {
    id: "react-effects-data", title: "Effects & Server State", blurb: "Volume III · M3 — synchronization, cleanup, and the laws of fetched data.",
    cards: [
      { front: "What effects are for", back: "Synchronizing React's world with systems outside it (network, timers, subscriptions, foreign DOM APIs) — and unsynchronizing when done. Nothing inside React needs one.", lesson: "effects-discipline" },
      { front: "The door with two handles", back: "The body opens the connection; the returned cleanup closes it. Cleanup runs before every re-run and at unmount — one handle is a bug.", lesson: "effects-discipline" },
      { front: "Dependency array = contract", back: "Lists every reactive value the effect READS; identity change triggers cleanup + re-run. It's not a perf knob — lying to it creates stale effects.", lesson: "effects-discipline" },
      { front: "Trap 1: self-feeding effect", back: "The effect writes the very state it depends on → every run triggers the next run → infinite loop. Derive instead, or move the logic to an event.", lesson: "effects-discipline" },
      { front: "Trap 2: fresh-identity deps", back: "Inline objects/arrays/arrows are born each render → deps 'change' every render → effect fires constantly. Depend on primitives or useMemo on honest deps.", lesson: "effects-discipline" },
      { front: "The three misuses", back: "Effect as event handler (toasts belong in handlers), as derived-state syncer (derive in render), and as 'on mount' ritual (say what you're connecting to — and clean up).", lesson: "effects-discipline" },
      { front: "StrictMode double-run", back: "Dev-only body→cleanup→body that smoke-tests your cleanup. Breakage is a real missing-cleanup bug — fix the effect, never remove StrictMode.", lesson: "effects-discipline" },
      { front: "Laws of server state", back: "It can go stale without your knowledge, duplicates across components, fails in transit, and is superseded by in-flight races. A copy of someone else's truth.", lesson: "data-fetching" },
      { front: "The request union", back: "{ idle } | { loading } | { error, message } | { success, data } — a discriminated union so impossible states (loading + stale error + stale data) can't exist.", lesson: "data-fetching" },
      { front: "The race condition", back: "Out-of-order responses: last-to-ARRIVE isn't last-to-ASK. Only slow networks expose it — localhost never does.", lesson: "data-fetching" },
      { front: "The race fix", back: "AbortController in the effect; cleanup aborts the superseded flight. Ignore AbortError — it's your own cancellation, not a failure.", lesson: "data-fetching" },
      { front: "Post-mutation staleness", back: "After a write, your stored copy is stale BY DEFINITION — the source changed and the snapshot didn't. Refetch or reconcile deliberately.", lesson: "data-fetching" },
      { front: "Cache managers", back: "TanStack Query/SWR are cache managers for server state — dedup, staleness windows, invalidation, retry — not fetch wrappers. Learn the raw machinery first.", lesson: "data-fetching" },
      { front: "Fetched = foreign", back: "Responses cross a trust boundary: parse → validate → trust, never render raw server text as markup, keep error details out of user-facing copy.", lesson: "data-fetching" },
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
  { term: "Linter", def: "A static analyzer that catches correctness problems before runtime (ESLint).", domain: "Tooling", lesson: "lint-format" },
  { term: "Formatter", def: "A tool enforcing one shared code appearance (Prettier); owns all formatting.", domain: "Tooling", lesson: "lint-format" },
  { term: "Tree-shaking", def: "Dropping provably-unused exports so they never ship; defeated by top-level side effects.", domain: "Tooling", lesson: "build-pipeline" },
  { term: "Source map", def: "Maps minified production positions back to original source lines.", domain: "Tooling", lesson: "build-pipeline" },
  { term: "Exit code", def: "A process's numeric result: 0 = success, non-zero = failure; the primitive CI chains on.", domain: "Tooling", lesson: "ci-gate" },
  { term: "CI gate", def: "The checks that must pass before merging; green is proven, not assumed.", domain: "Tooling", lesson: "ci-gate" },
  { term: "Frozen lockfile", def: "Installing exactly the locked dependency versions, failing on drift.", domain: "Tooling", lesson: "ci-gate" },
  { term: "Reconciliation", def: "React diffing two render descriptions and patching the real DOM minimally.", domain: "React", lesson: "react-why" },
  { term: "JSX", def: "Expression language producing description objects; hosts {expressions}, &&/ternary, and .map().", domain: "React", lesson: "jsx-props-composition" },
  { term: "Props", def: "Typed, read-only inputs flowing down from parent to child; events flow back up via callback props.", domain: "React", lesson: "jsx-props-composition" },
  { term: "key", def: "A stable, unique, data-derived identity for list items across renders.", domain: "React", lesson: "jsx-props-composition" },
  { term: "State (React)", def: "Data remembered across renders whose change requests a re-render — memory plus a trigger.", domain: "React", lesson: "state-render-model" },
  { term: "Updater form", def: "setState(prev => next): computes from the latest queued value instead of this render's snapshot.", domain: "React", lesson: "state-render-model" },
  { term: "Server state", def: "Fetched data treated as a cache of the server's truth, with staleness/refetch/invalidation laws.", domain: "React", lesson: "state-classification" },
  { term: "URL state", def: "View state serialized into the address bar: shareable, bookmarkable, history-aware.", domain: "React", lesson: "state-classification" },
  { term: "Derived state", def: "Values computed from other state during render — stored nowhere, so they cannot drift.", domain: "React", lesson: "state-classification" },
  { term: "Lifting state up", def: "Moving shared state to the nearest common parent so siblings share one source.", domain: "React", lesson: "state-classification" },
  { term: "Render phase", def: "Building fresh descriptions: pure, interruptible, discardable; no DOM touched.", domain: "React", lesson: "how-react-renders" },
  { term: "Commit phase", def: "The single uninterrupted sweep that diffs and patches the real DOM.", domain: "React", lesson: "how-react-renders" },
  { term: "memo", def: "Bails out of a child render when props are referentially unchanged.", domain: "React", lesson: "how-react-renders" },
  { term: "Referential identity", def: "Whether two values are the same reference — what memo and effect deps compare.", domain: "React", lesson: "how-react-renders" },
  { term: "Effect", def: "A synchronization between React and an outside system, with mandatory cleanup.", domain: "React", lesson: "effects-discipline" },
  { term: "Cleanup function", def: "The function an effect returns to undo exactly what its body did — run before each re-run and at unmount.", domain: "React", lesson: "effects-discipline" },
  { term: "Dependency array", def: "The contract of reactive values an effect reads; identity change restarts the synchronization.", domain: "React", lesson: "effects-discipline" },
  { term: "Server state", def: "A cached copy of the server's truth — subject to staleness, duplication, and transport failure.", domain: "React", lesson: "data-fetching" },
  { term: "Race condition", def: "Out-of-order responses where the last arrival, not the last request, writes state.", domain: "React", lesson: "data-fetching" },
  { term: "AbortController", def: "The cancellation handle whose signal a fetch obeys; aborting in cleanup kills superseded flights.", domain: "React", lesson: "data-fetching" },
  { term: "Request union", def: "idle/loading/error/success modeled as a discriminated union — every request moment has a face.", domain: "React", lesson: "data-fetching" },
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
  { id: "editor-format-war", symptom: "Files reformat on every save, or ESLint and your editor keep undoing each other's formatting.", layer: "Lint/format config", causes: ["ESLint formatting rules (indent/quotes/semi) enabled alongside Prettier", "Two different formatters configured", "Format-on-save off for some teammates, on for others"], diagnose: ["Check whether eslint-config-prettier is the LAST ESLint config entry", "Confirm one shared .prettierrc is committed and format-on-save is on for everyone"], fix: "Add eslint-config-prettier last to silence ESLint's formatting rules; commit one Prettier config; enable format-on-save team-wide.", prevent: "Prettier owns all appearance; the linter never formats. One owner per concern.", related: "lint-format" },
  { id: "works-in-dev-breaks-in-prod", symptom: "A feature works under the dev server but throws after pnpm build; the stack trace is minified (one-letter names).", layer: "Build pipeline", causes: ["A side effect made tree-shaking keep/drop the wrong module", "Code depending on a dev-only global or un-minified behavior", "Debugging the dev build while the prod build is what fails"], diagnose: ["Serve the real dist/ output locally and reproduce", "Load source maps (or an un-minified prod build) to read the trace"], fix: "Fix the root cause in source (declare side effects correctly, stop depending on dev-only globals), rebuild, and re-test dist/.", prevent: "Smoke-test the production build before deploy; ship source maps so prod traces are readable.", related: "build-pipeline" },
  { id: "passes-locally-fails-ci", symptom: "A branch is green locally but the CI pipeline is red.", layer: "CI / environment", causes: ["An undeclared dependency installed globally on your machine (phantom dependency)", "An uncommitted file that exists only locally", "A test sensitive to timezone/locale or a case-sensitive file path"], diagnose: ["Fresh-clone the repo, run pnpm install --frozen-lockfile, then the failing command", "Compare your local environment (globals, files, OS case-sensitivity) with CI's"], fix: "Commit missing files, declare every imported dependency, and make tests environment-independent.", prevent: "Develop with the clean-room habit; commit the lockfile; write tests that don't care about timezone or filesystem case.", related: "ci-gate" },
  { id: "click-no-update", symptom: "A button handler runs (you can log in it) but the screen doesn't change.", layer: "React state updates", causes: ["State was mutated in place, then the same reference was passed to the setter", "The changed value isn't state at all — it's a prop, a ref, or a plain variable"], diagnose: ["Log value === prevValue right before the setter — if true, you mutated", "Ask: does this value live in useState in THIS component?"], fix: "Produce a NEW value: map/filter/spread for collections, { ...obj, field } for objects, the updater form for counters.", prevent: "Treat state as read-only; lint with no-mutating-array-methods on state and always return new references.", related: "state-render-model" },
  { id: "counter-plus-one", symptom: "A handler calls setCount(count + 1) several times, but the counter only advances by one.", layer: "React update queue", causes: ["Every call reads the same render's snapshot (count) and queues the same next value"], diagnose: ["Log count on each line of the handler — identical values", "Check whether the next value is computed from the old one"], fix: "Use the updater form: setCount(c => c + 1) — each call chains from the latest queued value.", prevent: "Rule: 'computed from old → updater form.' Applies to any batched handler, retry loops, and rapid clicks.", related: "state-render-model" },
  { id: "key-warning", symptom: "Console warns 'Each child in a list should have a unique key' — or list rows show the wrong checked/input state after deleting or reordering.", layer: "React reconciliation", causes: ["No key on list items, or key={index} on a list that reorders/deletes/holds per-item state"], diagnose: ["Inspect the map(): what is each item's identity across renders?", "Delete or reorder an item; watch per-item state (checkboxes, inputs) stick to positions"], fix: "Key on a stable, unique, data-derived id (t.id). Index keys only for append-only, stateless, never-reordered lists.", prevent: "Every data type gets an id at creation (crypto.randomUUID()); key on it from day one.", related: "jsx-props-composition" },
  { id: "stale-total", symptom: "A total/count/flag is 'wrong, but only sometimes' — usually after editing one of its inputs.", layer: "React state classification", causes: ["A derivable value stored in useState and synced by an effect with an incomplete dependency list", "Two components each storing a copy that drifts"], diagnose: ["Ask: can this value be computed from other visible state? If yes, find its stored copy.", "Check the syncing effect's dependency array against the value's real inputs"], fix: "Delete the stored copy (and the sync effect); derive the value during render. One source, correct by construction.", prevent: "At every useState ask 'source or computable?'; lint against derived-state-in-useState patterns.", related: "state-classification" },
  { id: "memo-noop", symptom: "A memoized component still re-renders every parent render; the Profiler shows 'props changed'.", layer: "React rendering / identity", causes: ["Props created inline in JSX (fresh array/object/arrow-function identities each render)", "A dep of useMemo/useCallback is itself unstable"], diagnose: ["Profiler → 'Why did this render?' → which props changed", "Inspect each prop expression passed to the child for inline literals"], fix: "Stabilize identities with useMemo/useCallback (honest deps) — or better, restructure so the parent stops re-rendering (move state down).", prevent: "Profile before memoizing; remember memo compares by reference, not contents.", related: "how-react-renders" },
  { id: "effect-every-render", symptom: "An effect fires after every render — the network tab shows constant identical requests, or a console log inside the effect scrolls endlessly.", layer: "React effects / dep identity", causes: ["A dependency created during render (object/array/inline arrow) gets a fresh identity every render", "The dependency array is omitted entirely (runs after every render by design)"], diagnose: ["Log inside the effect and count fires per single user action", "List the effect's deps and ask: which one is born fresh each render?"], fix: "Depend on the primitives the value carries, or memoize it on honest deps; add the array if it was omitted. Never silence the exhaustive-deps lint to stop re-runs.", prevent: "Treat react-hooks/exhaustive-deps as an error; audit every dep's identity story when writing the effect.", related: "effects-discipline" },
  { id: "infinite-effect-loop", symptom: "The component renders continuously with no user input; the CPU spins; sometimes 'Maximum update depth exceeded'.", layer: "React effects / state cycle", causes: ["The effect writes state that is also in its dependency array — every run triggers the next", "An object written to state that a dep compares by identity"], diagnose: ["Profiler: the component renders with no events at all", "Check whether any setState target appears (directly or via a derivative) in the same effect's deps"], fix: "Break the cycle: derive the value in render instead of storing it, or move the write to an event handler. An effect should synchronize outward, not feed itself.", prevent: "Rule: an effect must never write state it (or its deps) reads. Lint plus code review for effects that call set* on their own inputs.", related: "effects-discipline" },
  { id: "stale-search-results", symptom: "Search/list results occasionally show the PREVIOUS query — never on localhost, regularly on slow connections.", layer: "Async / effect lifecycle", causes: ["An older, slower response resolving after a newer one and overwriting state", "No cancellation (abort) or staleness check tied to the current query"], diagnose: ["Throttle DevTools to Slow 3G, type two queries quickly, watch the Network order vs. the rendered result", "Check whether the fetch effect's cleanup aborts the in-flight request"], fix: "AbortController in the effect; cleanup aborts on query change/unmount; ignore AbortError in the catch.", prevent: "Make abort-on-cleanup the fetch template, not an optimization; test by resolving two requests out of order.", related: "data-fetching" },
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
  { id: "B-11", title: "Volume II · Tooling: Lint, Format, Build", scope: "V2·M3", status: "shipped", summary: "ESLint + Prettier as team agreements (the whitespace-merge-conflict lab), the build pipeline (transform→bundle→minify, tree-shaking, source maps, the 'works in dev, breaks in prod' lab), and CI as a chain of exit codes (the 'passes locally, fails in CI' lab) — 18 quiz questions, 3 debugging labs. Closes Volume II with the 13-question Builder Gauntlet." },
  { id: "B-12", title: "React Mental Models", scope: "V3·M1", status: "shipped", summary: "Why React exists (Then-vs-Now from the Volume I manual-DOM app, reconciliation traced), JSX's three embedding rules + keys-as-identity with the wrong-checkbox debugging lab, and state/events/render cycle with the undercount + silent-no-op labs — 16 quiz questions, 2 debugging labs. Volume III opens with 6 scoped modules (Mental Models, State & Rendering, Effects & Data, Forms, Architecture & Testing, Performance)." },
  { id: "B-13", title: "React · State & the Rendering Model", scope: "V3·M2", status: "shipped", summary: "The state-classification doctrine (eight kinds of state with the three-question filing test, server-vs-client laws, derive-don't-store debugging lab) and the two-phase render-commit model (three triggers, the memo identity trap debugging lab, measure-first discipline) — 12 quiz questions, 2 debugging labs." },
  { id: "B-14", title: "React · Effects Discipline & Data", scope: "V3·M3", status: "shipped", summary: "Effects as synchronization (the concierge model, deps-as-contract, cleanup as the second handle), the infinite-loop and fresh-identity dep traps with the 'fires every render' debugging lab, the three misuse catalog, and StrictMode as smoke alarm; then server state under its laws — the 4-state request union, the out-of-order race-condition debugging lab with AbortController cleanup, and the cache-manager horizon — 12 quiz questions, 2 debugging labs." },
  { id: "B-15", title: "React · Forms & Controlled Inputs", scope: "V3·M4", status: "next", summary: "Controlled components, the single-source-of-truth form, and accessible validation UX that helps instead of accuses." },
  { id: "B-16", title: "React · Component Architecture & Testing", scope: "V3·M5", status: "queued", summary: "Colocation, context boundaries, compound components, and Testing Library behavior tests." },
  { id: "B-17", title: "React · Performance, Profiling & Gauntlet", scope: "V3·M6", status: "queued", summary: "Rendering performance, the profiler loop, virtualization — closing Volume III with a React Gauntlet." },
  { id: "B-18", title: "Web Architecture", scope: "Volume IV", status: "queued", summary: "REST, AuthN/AuthZ, caching & security — the browser/server boundary made rigorous." },
  { id: "B-19", title: "PostgreSQL", scope: "Volume V", status: "queued", summary: "Modeling, SQL, and performance — relational data done properly." },
];
