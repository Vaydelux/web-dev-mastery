import type { Lesson } from "../lib/core";

const capstoneApplications: Lesson = {
  id: "capstone-applications",
  title: "The Capstone: From Requirements to Launch, On Your Own",
  volume: 11,
  module: 1,
  order: 1,
  level: "Mastery",
  status: "implemented",
  minutes: 65,
  summary:
    "Ten volumes gave you every piece. The capstone is where you assemble them without a manual — an independent, portfolio-grade application that proves you can do the full lifecycle: requirements, data modeling, secure architecture, testing, deployment, and launch. This lesson is the playbook: how to scope it, how to build it in the right order, how to harden it, and how to score it against the Production Readiness Scorecard before you let the world use it.",
  prereqs: ["scaling-availability"],
  objectives: [
    "Scope a capstone to a shippable size using the 'one user, one pain, one promise' test",
    "Sequence the build: data model → auth → core CRUD → search/filter/pagination → deploy → harden",
    "Apply the Production Readiness Scorecard and pass every gate before launch",
    "Run your own security review, performance review, and accessibility review against your work",
    "Write the README, ERD, and architecture notes that make your work legible to a stranger",
  ],
  concepts: ["capstone", "production readiness", "lifecycle", "scoping", "self-review", "portfolio"],
  blocks: [
    {
      t: "lead",
      text: "Every lesson before this one taught you a law, a boundary, a vocabulary, or a debugging pass. But none of them asked the question that matters now: *can you do it all, in order, on your own, for a problem nobody has already decomposed for you?* The capstone is that question, answered in software. This is not a tutorial. There is no step-by-step here — deliberately. What follows is the *discipline*: how to scope, sequence, build, harden, and launch an application that you would put your name on. The building is yours to do. The standards are not negotiable.",
    },
    {
      t: "why",
      text: [
        "**Why a capstone at all?** Because the distance between 'I understand each piece' and 'I can ship a real system' is filled with decisions no lesson can make for you — which feature to cut, where to draw a boundary, what to cache, what to test. You only learn that judgment by making the calls under the weight of a whole system. The capstone compresses the full lifecycle into one project you own end to end, and it is the single strongest signal — to an employer, a client, or yourself — that you've crossed from learner to practitioner.",
        "**Why the Scorecard, not vibes?** Because 'it works on my machine' is not launch-ready, and enthusiasm is a poor substitute for a checklist. Professionals ship by verifying against a fixed standard: authorization actually enforced, migrations safe, secrets clean, backups restorable, monitoring wired. The Production Readiness Scorecard is that standard. You do not get to say it's done; you get to *prove* it's done, gate by gate.",
      ],
    },
    {
      t: "simple",
      text: [
        "Think of the capstone as **building your first house to sell**. You don't pour the foundation because it's fun — you pour it because the roof needs it. You build in a strict order (foundation → frame → systems → finish), you inspect at every stage, and before anyone moves in you walk the whole thing with a clipboard: does every door latch, does every outlet have power, is there a working smoke detector? The Scorecard is that clipboard. The capstone is the house. Your name is on the deed.",
      ],
    },
    {
      t: "model",
      title: "Scope tight, build in order, prove it's done",
      text: [
        "**Scope with 'one user, one pain, one promise.'** The capstone is not 'a social network.' It is 'a freelancer who forgets to invoice gets one screen that turns logged hours into a sendable invoice.' One user, one pain, one promise. Everything that doesn't serve that promise is cut — ruthlessly, in writing, before you build it. A small, *complete* app that you launched and hardened beats a large, half-finished one every time. Depth is the differentiator: search that works, pagination at scale, notifications that fire, an undo that's real.",
        "**Build in lifecycle order.** The order is not arbitrary; each step unlocks the next. Requirements → UX sketch → data model (ERD) → repository/Git → database + migrations → auth → authorization (RLS) → core CRUD → validation → search/filter/pagination → uploads → notifications/background jobs (only if the promise needs them) → tests → security review → accessibility review → performance review → production build → deployment + env config → CI/CD → monitoring → backup/restore rehearsal. Follow it. The instinct to skip ahead to 'the fun part' is precisely what produces apps that fall over at launch.",
        "**Prove it with the Scorecard.** Before launch, every gate on the Production Readiness Scorecard must pass: authorization tested user-A-vs-user-B, migrations safe and reversible, no secrets in bundles or logs, backups verified restorable, monitoring wired, the four golden signals instrumented, a11y at AA, performance budgets met. You don't launch when you're tired of building. You launch when the clipboard is clear.",
      ],
      map: [
        ["The house you build to sell", "A capstone: complete, hardened, and legible to a stranger"],
        ["The clipboard walkthrough", "The Production Readiness Scorecard — prove, don't assert"],
        ["Pour the foundation before the roof", "Lifecycle order: each stage unlocks the next"],
        ["One user, one pain, one promise", "Scoping: cut everything that doesn't serve the promise"],
      ],
    },
    {
      t: "diagram",
      title: "The capstone lifecycle, in order",
      ascii: `
   SCOPE                BUILD                    PROVE
  ┌──────────┐   ┌───────────────────────┐   ┌─────────────────┐
  │ 1 user   │   │ ERD → migrations      │   │ Tests           │
  │ 1 pain   │ → │ auth → RLS            │ → │ Security review │
  │ 1 promise│   │ CRUD → validation     │   │ A11y review     │
  └──────────┘   │ search/filter/paginate│   │ Perf review     │
                 │ uploads → jobs        │   │ Scorecard gates │
                 └───────────────────────┘   └────────┬────────┘
                                                      │ all clear
  ┌──────────────────────────────────────────────────┴──────────┐
  │  LAUNCH: prod build → deploy → env → CI/CD → monitoring     │
  │  → backup/restore rehearsal → announce → maintain           │
  └─────────────────────────────────────────────────────────────┘
`,
    },
    {
      t: "code",
      lang: "md",
      title: "The Production Readiness Scorecard — your launch clipboard",
      code: "# Production Readiness Scorecard — <your capstone>\n# Every box must be CHECKED with evidence before launch.\n\n## Authorization & security\n[ ] RLS policies exist for every user-owned table\n[ ] User-A-vs-user-B matrix tested (read AND write) in CI\n[ ] No secrets in client bundles (grep check passes)\n[ ] All inputs validated server-side at every mutation\n[ ] Webhook signatures verified (if any)\n\n## Data & operations\n[ ] Migrations are reversible and tested against a fresh DB\n[ ] Backup taken AND restore rehearsed (not just taken)\n[ ] Error rates / latency / queue depth alerting wired\n[ ] CI/CD deploys from main; rollback is one command\n\n## Quality\n[ ] Core business logic unit-tested; RLS integration-tested\n[ ] Accessibility: keyboard-navigable, AA contrast, labeled inputs\n[ ] Performance: LCP < 2.5s, no N+1 in the hot path, paginated lists\n\n## Legibility (the stranger test)\n[ ] README: what, why, how to run, how to test\n[ ] ERD + one-paragraph architecture rationale\n[ ] .env.example with safe placeholders",
      notes: [
        "Each unchecked box is a future incident. The discipline is to treat a missing box as 'not done', not 'nice to have'.",
        "The stranger test matters because your capstone is read by people who weren't in your head: recruiters, teammates, future-you.",
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'it works, but I'm not sure it's done'",
      scenario: "You've built the capstone. It runs. But a nagging feeling remains: did you actually test the hard parts? You click through as your own user — of course it works, you built it and your data is clean. The question isn't 'does it work for me', it's 'does it work for an adversarial stranger with messy data and a slow connection'.",
      error: "// The self-test trap: you only ever exercise the happy path\n// with your own account and your own clean data.\n//\n// What you DIDN'T test:\n//  - logging in as a DIFFERENT user and hitting your own IDs\n//  - submitting the form with a 10,000-char title\n//  - the second page of results on a slow connection\n//  - what happens when the notification job fails\n//  - restoring the backup you took but never tried to load",
      tells: "If you cannot point to a *test or rehearsal* for a claim, you don't have the feature — you have a hope. The gap between 'it runs for me' and 'it's done' is exactly the adversarial, messy, slow cases you haven't run. The Scorecard exists to turn those hopes into checkable evidence.",
      flow: [
        "List every 'it works' claim you've made; next to each, write the test or rehearsal that proves it.",
        "For claims with no evidence, run the adversarial version: another user's ID, oversized input, page 2 on throttled network, a failed job.",
        "Restore your backup to a fresh database — if you've never done it, it doesn't count.",
        "Walk the Scorecard top to bottom; any unchecked box sends you back to the build.",
        "Verify: the clipboard is fully checked with evidence, and the stranger test (README + ERD + run instructions) works for someone who's never seen the code.",
      ],
      root: "Completion is not a feeling; it's a verified set of gates. The self-test trap — testing only as yourself, with clean data, on the happy path — is why 'it works' so often precedes 'it broke in prod'.",
      prevent: "Adopt the stranger standard from day one: every feature is done when an adversarial user on a slow connection with messy data can't break it, and the Scorecard proves it.",
    },
    {
      t: "mistake",
      title: "Choosing the capstone to impress, not to finish",
      wrong: "Picking an 'impressive' scope — a real-time collaborative Figma clone with ML — because it sounds good, then abandoning it 60% through.",
      right: "Picking a scope you can take *fully* to launch: one user, one pain, one promise. Then making it impressive through depth — real pagination, real authorization, real monitoring, a restore you rehearsed. Depth and completion are what read as mastery.",
      explain: "A finished, hardened, documented small app demonstrates more mastery than an abandoned ambitious one. Employers can run the first; they can only pity the second. Cut scope, ship depth.",
    },
    {
      t: "note",
      kind: "production",
      title: "Launch is the beginning, not the end",
      text: [
        "The lifecycle doesn't stop at deploy. Real applications are *maintained*: dependencies get bumped deliberately, a dependency you rely on ships a breaking release and you read its release notes (next lesson), monitoring tells you a queue is backing up, a backup gets restored in anger. Budget for maintenance from the start — a capstone you keep improving for a few months is worth more than three you abandon after launch.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Write your capstone's one-line scope using 'one user, one pain, one promise'. Then list three features you're cutting, and why each doesn't serve the promise.",
        "Sketch the ERD (even on paper) and write a one-paragraph architecture rationale: which parts are Server Components, where does authorization live, what gets a queue.",
        "Copy the Scorecard into your repo and check every box you can already prove; the unchecked boxes are your remaining build list.",
        "Stretch: hand your README + run instructions to someone who hasn't seen the project and time how long it takes them to get it running. Fix whatever blocked them.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        {
          id: "q1",
          type: "single",
          prompt: "The strongest scoping test for a capstone is…",
          options: ["it uses the most technologies", "one user, one pain, one promise — everything else is cut", "it matches a trending product idea", "it's the biggest thing you can imagine"],
          answer: [1],
          explain: "Scope is about a complete promise to one user, not breadth. A small app you fully ship and harden demonstrates mastery; a big one you abandon demonstrates reach.",
          tags: ["capstone-applications"],
        },
        {
          id: "q2",
          type: "single",
          prompt: "Why does the lifecycle put data model + migrations before auth and CRUD?",
          options: ["databases are more fun", "each stage unlocks the next: authorization and CRUD are meaningless until the schema and its constraints exist", "it's alphabetical", "auth is harder so it goes last"],
          answer: [1],
          explain: "The order is dependency-driven. RLS policies reference tables; CRUD needs columns; validation needs constraints. Build the foundation before the roof.",
          tags: ["capstone-applications"],
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "Taking a database backup counts as proof that your data is recoverable.",
          options: ["True", "False"],
          answer: [1],
          explain: "False — only a *rehearsed restore* proves recoverability. A backup you've never loaded is a hope. Restore it to a fresh database before you claim the gate is passed.",
          tags: ["capstone-applications"],
        },
        {
          id: "q4",
          type: "single",
          prompt: "The difference between 'it works' and 'it's done' is best captured by…",
          options: ["how many features it has", "a verified Production Readiness Scorecard — every gate checked with evidence, including adversarial tests", "how long you worked on it", "whether it's deployed"],
          answer: [1],
          explain: "Done is a set of proven gates, not a feeling or a feature count. The Scorecard converts 'I think it's fine' into 'here's the evidence'.",
          tags: ["capstone-applications"],
        },
        {
          id: "q5",
          type: "multi",
          prompt: "Select ALL items that belong on the launch Scorecard.",
          options: ["user-A-vs-user-B authorization matrix tested in CI", "secrets absent from client bundles", "restore rehearsed", "a trending hashtag for the launch post"],
          answer: [0, 1, 2],
          explain: "Authorization evidence, clean bundles, and a proven restore are launch gates. Marketing is fine — it's just not a readiness gate.",
          tags: ["capstone-applications"],
        },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Capstone", "An independent, portfolio-grade application demonstrating the full lifecycle end to end."],
        ["One user, one pain, one promise", "The scoping test: a single complete promise to a single user."],
        ["Production Readiness Scorecard", "A fixed checklist of launch gates, each verified with evidence."],
        ["Lifecycle order", "The dependency-driven build sequence from scope to maintenance."],
        ["Stranger test", "Can someone who's never seen the code run, read, and review it?"],
      ],
    },
    {
      t: "recap",
      items: [
        "Scope to one user, one pain, one promise; cut everything else in writing.",
        "Build in lifecycle order — each stage unlocks the next; don't skip to the fun part.",
        "Done = Scorecard cleared with evidence, not 'it works on my machine'.",
        "Test as an adversarial stranger with messy data and a slow connection.",
        "A rehearsed restore, not a taken backup, is the data-recovery gate.",
        "Launch is the beginning: budget for maintenance and keep improving.",
      ],
    },
    {
      t: "checkpoint",
      text: "Write your capstone's one-line scope and the three features you're cutting. If you can't cut three features, your scope is still too big — cut until you can.",
    },
    {
      t: "bridge",
      text: "The capstone proves you can build and ship. Mastery is what happens after: debugging code you've never seen, reviewing it for security, reasoning about its architecture, and keeping your skills sharp as the ecosystem moves under you. The final lesson teaches the craftsman's habits — and closes the course with the Mastery Gauntlet.",
      next: "mastery-practices",
    },
  ],
};

const masteryPractices: Lesson = {
  id: "mastery-practices",
  title: "Mastery: The Craftsman's Habits That Outlive Any Framework",
  volume: 11,
  module: 1,
  order: 2,
  level: "Mastery",
  status: "implemented",
  minutes: 60,
  summary:
    "Frameworks come and go; the habits of a working professional do not. This final lesson teaches the durable crafts: reading and debugging unfamiliar code without fear, running a security review on someone else's work, reasoning about architecture and defending tradeoffs, reading release notes and evaluating libraries like a skeptic, writing documentation that gets read, and the continuous-learning loop that keeps you current without drowning. These are the skills that make you valuable in any codebase, any team, any year.",
  prereqs: ["capstone-applications"],
  objectives: [
    "Debug unfamiliar code with a systematic entry strategy instead of guess-and-check",
    "Run a focused security review using the trust-boundary checklist",
    "Articulate an architectural tradeoff and defend it with the tradeoff vocabulary",
    "Read release notes and evaluate libraries skeptically (cost, maintenance, lock-in)",
    "Write documentation that a stranger will actually read and act on",
    "Build a sustainable continuous-learning loop that survives a full-time job",
  ],
  concepts: ["debugging unfamiliar code", "security review", "tradeoff reasoning", "evaluating libraries", "documentation", "continuous learning"],
  blocks: [
    {
      t: "lead",
      text: "You can now build and ship a production application. But most of your career won't be spent on greenfield projects you designed from scratch — it'll be spent in codebases you inherited, on teams with history you didn't make, with libraries you didn't choose, under deadlines you didn't set. Mastery is not knowing every framework; it's the set of *durable habits* that make you effective in any of those situations. This lesson is about those habits — the ones that outlive React, outlive Next, outlive whatever comes next.",
    },
    {
      t: "why",
      text: [
        "**Why debugging unfamiliar code is the core skill.** Because 'I've never seen this codebase' is the default state of professional life, not the exception. The developer who can enter an unknown system, find the relevant path, form a hypothesis, and fix the bug *without breaking anything else* is worth more than the one who can only work in code they wrote. Everything you've learned — the debugging passes, the boundary mindset, the cache map — is a toolkit for exactly this.",
        "**Why skepticism about tools is a professional duty.** Because every library you adopt is a dependency you inherit: its bugs, its maintenance cadence, its breaking changes, its license. Choosing tools well — and reading release notes when they change — is how you protect your system and your team. The alternative is being surprised in production by someone else's decision.",
        "**Why documentation and learning loops matter.** Because knowledge that lives only in your head dies when you leave (or forget). The professional writes down the *why*, and keeps their own knowledge current deliberately — not by osmosis, but by a loop they can sustain alongside a full-time job.",
      ],
    },
    {
      t: "simple",
      text: [
        "Think of unfamiliar code as **a city you've never visited**. You don't wander randomly hoping to stumble on the address. You start at the entrance (the request's entry point), follow the main road (the call path), read the street signs (types, names, tests), and ask locals (Git blame, docs, logs). Debugging is navigation, and the habits in this lesson are the map-reading skills that work in every city.",
      ],
    },
    {
      t: "model",
      title: "Enter deliberately, reason in tradeoffs, stay current on purpose",
      text: [
        "**Unfamiliar code: enter at the boundary, not the middle.** Start where the symptom *enters* the system — a route, a handler, a failing test, an error in the logs. Trace one request's path using types and names as signposts. Reproduce before you change anything. Form one hypothesis, change one variable, verify. The whole Volume-I debugging discipline (read error → identify layer → reproduce → inspect → hypothesize → change one → verify → explain root cause) works identically in code you didn't write — you just navigate first.",
        "**Tradeoffs: finish 'it depends.'** Every architectural decision is a tradeoff along axes you now have names for: consistency vs availability, latency vs correctness, simplicity vs flexibility, build-vs-buy, coupling vs cohesion. Mastery is saying 'it depends' and then *finishing the sentence*: 'it depends on X, and here X is Y, so we choose Z and accept W.' That's the move that turns an opinion into a defensible decision.",
        "**Learning: a loop you can sustain.** Not 'read everything,' but a small, regular loop: follow a few high-signal sources (official changelogs, a couple of trusted engineers), skim release notes of what you depend on, build a tiny thing when something important lands, and write down one thing you learned. Ten focused minutes a day beats a panicked weekend bootcamp every time.",
      ],
      map: [
        ["A city you've never visited", "Unfamiliar code — navigate from the boundary, read the signs"],
        ["Finishing the sentence after 'it depends'", "Tradeoff reasoning: name the axis, the value, the choice, the cost"],
        ["A gardener, not a firefighter", "Continuous learning: small regular tending, not heroic cramming"],
        ["A tour guide, not a diary", "Good documentation: written for the stranger who needs to act"],
      ],
    },
    { t: "h2", id: "unfamiliar", text: "Entering unfamiliar code" },
    {
      t: "code",
      lang: "text",
      title: "The entry protocol for a codebase you've never seen",
      code: "1. REPRODUCE FIRST.\n   Get the symptom running locally before reading anything.\n   A reproducible bug is a flashlight; a described bug is a rumor.\n\n2. ENTER AT THE BOUNDARY.\n   Find where the symptom crosses into the system: the route, the\n   handler, the failing test, the log line. Don't start in utils/.\n\n3. FOLLOW ONE PATH.\n   Trace a single request end to end (entry → data → response).\n   Use types and names as street signs; ignore the 90% you don't need.\n\n4. READ THE TESTS.\n   Tests are executable documentation of intended behavior.\n   A passing test is a promise; a missing test is a gap.\n\n5. ONE HYPOTHESIS, ONE CHANGE.\n   Form a single theory, change one variable, verify.\n   Repeat. Never shotgun-edit unfamiliar code.\n\n6. EXPLAIN THE ROOT CAUSE.\n   If you can't say why it broke in one sentence, you don't\n   understand it yet — and your 'fix' is a guess.",
      notes: [
        "Git blame and recent commits are the fastest way to learn 'why does this look strange' — someone wrote it for a reason, and the reason is usually in the commit message.",
        "The goal of your first pass is a *map*, not a fix. Resist the urge to refactor what you don't yet understand.",
      ],
    },
    { t: "h2", id: "security-review", text: "Reviewing someone else's work for security" },
    {
      t: "code",
      lang: "text",
      title: "The trust-boundary review checklist",
      code: "For any code you're reviewing (yours or a teammate's), walk the\nboundaries where untrusted input crosses into trusted action:\n\nINPUT   Where does data enter? Is it validated server-side?\n        (forms, params, headers, webhooks, uploads, env)\n\nOUTPUT  Where does data land in HTML/SQL/URLs/commands?\n        Is it encoded / parameterized / escaped?\n\nAUTHN   How is the caller identified? Is the session/cookie\n        HttpOnly + Secure + SameSite? Any secret in the bundle?\n\nAUTHZ   For EVERY route and EVERY query: is ownership checked?\n        (the user-A-vs-user-B test — not just 'is logged in')\n\nSECRETS Any keys, tokens, or credentials in code, logs, commits,\n        or client bundles? Are they rotatable?\n\nDEPEND  What new dependency entered the lockfile? Who maintains\n        it? What does its license and CVE history look like?",
      notes: [
        "This is the same boundary discipline from Volume IV, now applied as a review you run on *others*. The value is in making it a habit, not a heroics.",
        "When you find an issue, report the *exploit* (what an attacker can do), not just the *flaw* — it's the difference between 'missing check' and 'any user can delete any project'.",
      ],
    },
    { t: "h2", id: "evaluate", text: "Reading release notes & evaluating libraries" },
    {
      t: "code",
      lang: "text",
      title: "The skeptic's library evaluation",
      code: "Before adopting (or keeping) a dependency, answer:\n\n1. WHAT DOES IT COST?  Bundle size, build time, API surface you\n   must learn, and the version-pinning burden.\n\n2. WHO MAINTAINS IT?   Commit recency, release cadence, issue\n   triage, bus factor (one maintainer = one resignation from risk).\n\n3. WHAT'S THE LOCK-IN? Can you remove it in a day, or is it\n   threaded through your architecture? Prefer thin wrappers you own.\n\n4. READ THE CHANGELOG. When it releases, skim for BREAKING and\n   SECURITY sections. A major version is a decision, not a `npm up`.\n\n5. IS IT STILL NEEDED? Re-ask periodically — the best dependency\n   is the one you deleted because the platform caught up.\n\nRed flags: a single unmaintained maintainer, no tests in the repo,\na giant API surface, 'works on my machine' install steps, and a\nlicense incompatible with your project.",
      notes: [
        "The platform-catches-up rule is real: native fetch replaced request; structuredClone replaced many deep-clone helpers; container queries replaced JS resize listeners. Periodically re-litigate your dependencies.",
        "Adopting a library is easy; removing one is the true cost. Choose as if you'll have to rip it out in a year — because you might.",
      ],
    },
    { t: "h2", id: "docs-learning", text: "Documentation that gets read, learning that sticks" },
    {
      t: "code",
      lang: "text",
      title: "Documentation: write for the stranger who must act",
      code: "A README / doc earns its keep if a stranger can ACT on it.\nStructure for the reader's journey, not your pride:\n\nWHAT    One or two sentences: what is this, who is it for?\nWHY     The problem it solves (the part no code shows).\nRUN     Exact commands to install + start (tested fresh — the\n        clean-room habit from Volume I).\nTEST    How to run the tests / prove it works.\nMAP     Where things live (a few lines, not a novel).\nTRADEOFFS  The one or two non-obvious decisions and why.\n\nAnti-patterns: a wall of badges, a feature list with no 'why',\n'left as an exercise', and instructions that only work on the\nauthor's machine. If a step isn't reproducible, it's a bug.",
      notes: [
        "The ADR habit from Volume X belongs here too: record the *why* of non-obvious decisions where a future reader will find them.",
        "Documentation rots. Treat it like code: review it in the same PR that changes the behavior it describes.",
      ],
    },
    {
      t: "code",
      lang: "text",
      title: "A sustainable continuous-learning loop",
      code: "Not 'learn everything' — a small loop you can keep for years:\n\nFOLLOW   2–3 high-signal sources: official changelogs of your\n         stack + a couple of trusted engineers. Unfollow the noise.\n\nSKIM     When a tool you depend on releases, read BREAKING and\n         SECURITY first. Ten minutes, not an afternoon.\n\nBUILD    When something important lands, build a tiny thing with\n         it. One afternoon > ten tutorials.\n\nWRITE    Note one thing you learned, in your own words, where\n         future-you will find it. Teaching yourself is retention.\n\nREVISIT  Every few months, re-litigate one dependency or one\n         assumption. The ecosystem moved; make sure you did too.\n\nThe loop that survives a full-time job is ten focused minutes a\nday — not the heroic weekend bootcamp you'll abandon by March.",
    },
    {
      t: "mistake",
      title: "Refactoring unfamiliar code before understanding it",
      wrong: "Seeing 'ugly' code in a new codebase and 'cleaning it up' in the same PR as your bug fix.",
      right: "Understand first, fix narrowly, refactor separately (if at all). Chesterton's Fence: don't remove a strange structure until you know why it was built — that weird branch may be a production bug fix nobody documented.",
      explain: "Mixing a fix with a cleanup makes it impossible to tell which change caused a regression, and 'ugly' code is often load-bearing. Earn the right to refactor by first being able to explain why it looks the way it does.",
    },
    {
      t: "note",
      kind: "production",
      title: "Mastery is a direction, not a destination",
      text: [
        "There is no point at which you 'know web development.' The platform will keep moving — new React capabilities, new Postgres features, new attack classes. Mastery is the confidence that you can *learn the next thing* because you understand the layer beneath it: HTTP, the event loop, the relational model, the trust boundary. Those foundations are why a framework change is a weekend for you, not a crisis. Keep the loop running, keep building, keep writing down what you learn. That's the whole secret — and it's a good one.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Pick an open-source repo you use but have never read. Reproduce one behavior locally, then trace ONE request path and write three sentences about how it works.",
        "Run the trust-boundary review checklist on your capstone (or any project). Report one finding as an exploit statement, not a flaw statement.",
        "Choose one dependency you rely on and read its last two release notes. Summarize: anything breaking? anything security? would you still adopt it today?",
        "Stretch: rewrite your capstone README using the WHAT/WHY/RUN/TEST/MAP/TRADEOFFS structure, then hand it to a stranger and time their setup.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        {
          id: "q1",
          type: "single",
          prompt: "The first step when debugging a symptom in an unfamiliar codebase is…",
          options: ["refactor the ugliest file", "reproduce the symptom locally before reading anything", "rewrite the module from scratch", "ask someone to explain the whole system"],
          answer: [1],
          explain: "A reproducible bug is a flashlight. Reproduce first, then enter at the boundary and trace one path — the whole Volume-I discipline, applied to code you didn't write.",
          tags: ["mastery-practices"],
        },
        {
          id: "q2",
          type: "single",
          prompt: "'It depends' becomes a defensible decision when you…",
          options: ["say it confidently", "name the tradeoff axis, the value of X in this context, the choice, and the cost you accept", "avoid committing to anything", "let the senior engineer decide"],
          answer: [1],
          explain: "Finishing the sentence — 'it depends on X; here X is Y; so we choose Z and accept W' — is what turns an opinion into a reasoned, reviewable decision.",
          tags: ["mastery-practices"],
        },
        {
          id: "q3",
          type: "single",
          prompt: "The most important sections of a release note to skim are…",
          options: ["the contributor list", "BREAKING and SECURITY", "the marketing headline", "the download counts"],
          answer: [1],
          explain: "Breaking changes decide whether you can upgrade safely; security notes may demand urgent action. Everything else is skimmable; these two are decision-relevant.",
          tags: ["mastery-practices"],
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "You should fix a bug and refactor the surrounding code in the same PR to save time.",
          options: ["True", "False"],
          answer: [1],
          explain: "False — keep the fix narrow and the refactor separate. Mixing them makes regressions unattributable and risks removing load-bearing structure you don't yet understand (Chesterton's Fence).",
          tags: ["mastery-practices"],
        },
        {
          id: "q5",
          type: "multi",
          prompt: "Select ALL red flags when evaluating a dependency.",
          options: ["a single unmaintained maintainer", "no tests in the repo", "a license incompatible with your project", "it has a focused, small API"],
          answer: [0, 1, 2],
          explain: "Bus-factor risk, untested code, and license incompatibility are genuine red flags. A small, focused API is a virtue — it's cheap to learn and cheap to remove.",
          tags: ["mastery-practices"],
        },
        {
          id: "q6",
          type: "single",
          prompt: "The continuous-learning approach most likely to survive a full-time job is…",
          options: ["a weekend bootcamp every few months", "ten focused minutes a day: skim changelogs, build tiny things, write down one lesson", "reading every blog post", "waiting until a project forces it"],
          answer: [1],
          explain: "Small, regular, sustainable beats heroic and abandoned. The loop — follow, skim, build, write, revisit — compounds without burning you out.",
          tags: ["mastery-practices"],
        },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Boundary entry", "Starting an unfamiliar-codebase investigation where the symptom crosses into the system."],
        ["Chesterton's Fence", "Don't remove a strange structure until you know why it exists."],
        ["Trust-boundary review", "A checklist walk of input, output, authn, authz, secrets, and dependencies."],
        ["Exploit statement", "Reporting a finding as what an attacker can do, not just the flaw."],
        ["Platform-catches-up", "Periodically re-litigate dependencies the platform has absorbed."],
        ["Continuous-learning loop", "Follow, skim, build, write, revisit — sustainably and regularly."],
      ],
    },
    {
      t: "recap",
      items: [
        "Unfamiliar code: reproduce, enter at the boundary, trace one path, read tests, one change at a time.",
        "Security review = walking the trust boundaries; report exploits, not flaws.",
        "'It depends' is finished by naming the axis, the value, the choice, and the accepted cost.",
        "Evaluate libraries by cost, maintenance, lock-in, and changelog; re-litigate periodically.",
        "Documentation is for the stranger who must act; keep it reviewed like code.",
        "Mastery is a direction: the foundations let you learn the next thing fast.",
      ],
    },
    {
      t: "checkpoint",
      text: "State your continuous-learning loop out loud — the sources you'll follow, the cadence, and where you'll write down what you learn. If it wouldn't survive a busy week, shrink it until it would.",
    },
    {
      t: "bridge",
      text: "That closes the teaching arc — ten volumes from the first HTTP request to the craftsman's habits. The Mastery Gauntlet is the final cumulative assessment: it draws on every phase and tests judgment, not recall. Pass it, and you've completed Full-Stack Web Development: Zero to Mastery. Then go build something, ship it, and keep the loop running.",
      next: "battle-gauntlet-m11",
    },
  ],
};

export const m29: Lesson[] = [capstoneApplications, masteryPractices];
