import type { Lesson } from "../lib/core";

export const m3: Lesson[] = [
  {
    id: "terminal-mental-model",
    title: "The Terminal Is a Conversation",
    volume: 1, module: 3, order: 1, level: "Foundation", status: "implemented", minutes: 40,
    summary: "Commands, flags, paths, pipes, and exit codes — the terminal as a precise conversation with your machine, and the PATH lookup behind 'command not found'.",
    prereqs: ["js-functions-scope"],
    objectives: [
      "Read a command as program + arguments + flags",
      "Navigate and inspect any directory; compose commands with pipes",
      "Explain what an exit code means and why CI is built on it",
      "Diagnose 'command not found' as a PATH lookup failure",
    ],
    concepts: ["shell", "PATH", "pipes", "exit code"],
    blocks: [
      { t: "lead", text: "The terminal feels like a relic, but it's the most precise interface your computer has: every action is a named command, every failure a numbered code. This lesson builds the mental model that makes the rest of the course's tooling — Git, Node, pnpm, deployments — feel like conversation instead of incantation." },
      { t: "why", text: [
        "Every professional tool you'll use lives in the terminal. More importantly, errors there are *structured*: a command either exits 0 or it doesn't, and that single fact is what CI, scripts, and automation are built from.",
        "Learning the shell also teaches the Unix philosophy — small tools composed with pipes — which quietly shapes how good software is designed.",
      ]},
      { t: "simple", text: [
        "A command is a sentence: **program** (the verb), **arguments** (the objects), **flags** (the adverbs). ls -la /tmp says 'list (ls), in long form including hidden files (-la), the directory /tmp'.",
        "The **pipe** | hands one command's output to the next as input, so tiny tools chain into powerful ones. And every command finishes with an **exit code**: 0 means success, anything else names a failure.",
      ]},
      { t: "model", title: "A clerk who does exactly what you say", text: [
        "The shell is a literal-minded clerk. It finds the program (by searching the **PATH** — an ordered list of directories), hands it your arguments, streams the output, and reports an exit code. It never guesses what you meant.",
        "Because the clerk is literal, errors are coordinates: 'command not found' means the search failed (PATH), 'permission denied' means access failed, a nonzero exit means the program itself reported failure. Each points at a different layer.",
      ], map: [
        ["A sentence: verb, objects, adverbs", "program + arguments + flags"],
        ["An assembly line of specialists", "Pipes composing small tools"],
        ["A receipt stamped 0 or an error number", "The exit code"],
        ["The clerk's list of where to find people", "The PATH"],
      ]},
      { t: "code", lang: "terminal", title: "The daily vocabulary", code:
"pwd                # where am I?\nls -la             # what's here, including hidden files?\ncd src             # move into src\ncd ..              # move up one level\n\ncat package.json   # print a file\nfind . -name \"*.ts\"  # locate files by pattern\n\n# Compose with pipes:\nfind . -name \"*.ts\" | wc -l      # count TypeScript files\ncat app.log | grep ERROR         # keep only error lines\n\n# Exit codes:\necho $?          # the previous command's exit code (0 = success)\nfalse            # a command that always exits 1\necho $?          # 1",
        notes: ["wc -l counts lines; grep filters lines; together via a pipe they answer questions no single tool can.", "$? is how you ask 'did that work?' — the same signal CI checks."] },
      { t: "debug", title: "Debugging lab — 'command not found'", scenario: "You installed a tool, but running it says command not found — while your teammate's identical install works.", error:
"$ zm\nzsh: command not found: zm",
        tells: "The shell searched every directory in PATH for an executable named zm and found none. The program may be installed fine — it just isn't anywhere the shell looks.",
        flow: [
          "Read the message literally: the lookup failed, not the program.",
          "Inspect: echo $PATH — is the install directory in that list?",
          "Compare with the working machine's PATH.",
          "Hypothesis — the new binary's directory isn't on PATH (or the shell hasn't re-read your rc file).",
          "Change one variable — add the directory to PATH / restart the terminal.",
          "Verify — which zm now prints a path and the command runs.",
        ], root: "The shell finds programs by scanning PATH. An install that puts a binary outside PATH — or a shell started before PATH was updated — yields 'command not found' even when the program exists.", prevent: "Know where your tools install; source your shell config (or open a fresh terminal) after changes; use which to confirm resolution." },
      { t: "vocab", terms: [
        ["Shell", "The program interpreting your commands."],
        ["PATH", "The ordered list of directories the shell searches for executables."],
        ["Pipe (|)", "Hands one command's output to the next command's input."],
        ["Exit code", "0 = success; nonzero = a specific failure. The signal CI automates on."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "In ls -la /tmp, the argument is…", options: ["ls", "-la", "/tmp", "the shell"], answer: [2], explain: "ls is the program, -la the flags, and /tmp the argument — the object the command acts on." },
        { id: "q2", type: "single", prompt: "An exit code of 0 means…", options: ["the command failed", "the command succeeded", "the command was not found", "nothing ran"], answer: [1], explain: "0 is the only success code. Any nonzero value signals a specific failure — the binary yes/no that CI automates on." },
        { id: "q3", type: "single", prompt: "'command not found' usually means…", options: ["the program crashed", "the binary isn't in any directory on PATH", "you lack permission", "the network is down"], answer: [1], explain: "The shell scans PATH for the executable and found nothing. The program may exist — it's just not where the shell looks." },
      ]},
      { t: "recap", items: [
        "A command = program + arguments + flags; the shell is literal.",
        "Pipes compose small tools; exit codes report success/failure.",
        "'command not found' is a PATH lookup failure.",
      ]},
      { t: "checkpoint", text: "From memory: count the .ts files in a folder using one piped command, then check the exit code of the last thing you ran." },
      { t: "bridge", text: "The shell can now run any program — including the one that frees JavaScript from the browser. Next: Node.js, the runtime, and the pnpm toolchain that keeps projects reproducible.", next: "node-and-runtime" },
    ],
  },

  {
    id: "node-and-runtime",
    title: "Node.js and the pnpm Toolchain",
    volume: 1, module: 3, order: 2, level: "Foundation", status: "implemented", minutes: 45,
    summary: "What a runtime provides, why Node freed JavaScript from the browser, and the package.json → lockfile → node_modules model that makes installs reproducible.",
    prereqs: ["terminal-mental-model"],
    objectives: [
      "Explain what a runtime provides (APIs, event loop, module system)",
      "Initialize and run a pnpm project; read package.json",
      "Distinguish dependencies from devDependencies",
      "Explain what the lockfile guarantees and why it's committed",
    ],
    concepts: ["runtime", "package manager", "lockfile", "node_modules"],
    blocks: [
      { t: "lead", text: "Until 2009, JavaScript only ran inside a browser. Node.js took the V8 engine out, gave it file, network, and process APIs, and suddenly the language of the web could also run servers, scripts, and build tools. This lesson covers the runtime and the toolchain that makes JavaScript projects reproducible." },
      { t: "why", text: [
        "You can't use any modern tooling — bundlers, test runners, servers, the course platform itself — without understanding the runtime and the package manager beneath it.",
        "The package model (intent → resolution → materialization) also teaches a pattern you'll reuse everywhere: declare what you want, record exactly what you got, rebuild it identically anywhere.",
      ]},
      { t: "simple", text: [
        "A **runtime** is the layer a language runs on: it executes your code and hands it capabilities. The browser runtime gives JavaScript the DOM and fetch; **Node** gives it files, networking, and processes. Same language, different powers.",
        "**pnpm** manages the libraries you depend on. package.json is your *intent* (what you asked for), the **lockfile** is the *resolution* (the exact versions for the whole tree), and node_modules is the *materialization* (the actual files). You commit intent + resolution; you rebuild materialization anywhere.",
      ]},
      { t: "model", title: "Intent → resolution → materialization", text: [
        "**package.json** declares ranges: \"dayjs\": \"^1.11.0\" means 'any 1.x at least 1.11.0'. That's intent — deliberately flexible.",
        "On install, the manager picks concrete versions for every package (and every transitive dependency) and writes them to **pnpm-lock.yaml**. That's resolution — exact and reproducible. Committing it means your teammate and your server get byte-identical trees.",
        "**node_modules** is just the materialization — a rebuildable cache, so it's gitignored. Delete it, reinstall, and you get exactly what the lockfile says.",
      ], map: [
        ["A shopping list with 'any ripe banana'", "package.json — ranges, your intent"],
        ["The itemized receipt with exact prices", "The lockfile — exact, committed, reproducible"],
        ["The groceries in your fridge", "node_modules — rebuildable, gitignored"],
      ]},
      { t: "code", lang: "terminal", title: "A project from scratch", code:
"mkdir demo && cd demo\npnpm init                 # creates package.json\n\npnpm add dayjs            # runtime dependency\npnpm add -D typescript    # devDependency (build tool, not runtime)\n\nnode index.js             # run a script with the Node runtime\npnpm run build            # run a script defined in package.json",
        notes: ["dependencies are what your program needs to run; devDependencies are what you need to develop/build it. Servers install only the former in production.", "The lockfile appears on your first add — commit it. node_modules should be gitignored."] },
      { t: "debug", title: "Debugging lab — 'works on my machine'", scenario: "Your app runs locally but crashes on a teammate's machine with a missing export from a library you both 'installed the same way'.", error:
"TypeError: (0 , dayjs__WEBPACK_IMPORTED_MODULE__.utc) is not a function",
        tells: "You resolved different versions of the same package. Without a committed lockfile, 'pnpm add dayjs' on two machines at two times can yield different concrete versions — and one lacks the export you used.",
        flow: [
          "Read the error — an export is missing, which smells like a version mismatch, not a logic bug.",
          "Compare: each machine prints its installed dayjs version. They differ.",
          "Hypothesis — no committed lockfile, so installs drifted.",
          "Change one variable — commit the lockfile, reinstall from it on both machines.",
          "Verify — identical versions, the export exists, the crash is gone.",
        ], root: "Ranges in package.json allow drift; only the lockfile pins the exact tree. Uncommitted lockfiles make installs non-reproducible across machines and time.", prevent: "Always commit the lockfile; in CI install with --frozen-lockfile so any drift fails loudly at build time instead of silently in production." },
      { t: "note", kind: "production", title: "Reproducibility is a deploy superpower", text: ["The same intent→resolution→materialization pattern underpins Docker images and CI caches. The rule of thumb: commit the thing that makes a build reproducible (lockfile), ignore the thing you can rebuild (node_modules), and fail loudly when they disagree (--frozen-lockfile)."] },
      { t: "vocab", terms: [
        ["Runtime", "The layer executing your code and providing APIs (browser vs Node)."],
        ["package.json", "Your declared intent: dependencies as version ranges."],
        ["Lockfile", "Exact resolved versions for the whole tree — committed for reproducibility."],
        ["node_modules", "The materialized packages — rebuildable, gitignored."],
        ["devDependency", "A tool needed to develop/build, not to run in production."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "What does Node.js add that the browser runtime lacks?", options: ["JavaScript itself", "File, network, and process APIs", "The event loop", "Variables"], answer: [1], explain: "Node runs the same JavaScript with different capabilities: files, networking, processes. The event loop exists in both." },
        { id: "q2", type: "single", prompt: "Which file makes installs reproducible and must be committed?", options: ["node_modules", "package.json alone", "the lockfile", "index.js"], answer: [2], explain: "package.json declares ranges (flexible); the lockfile records exact versions for the whole tree. Commit it so every machine resolves identically." },
        { id: "q3", type: "single", prompt: "A library you only need for building/testing belongs in…", options: ["dependencies", "devDependencies", "node_modules manually", "the lockfile only"], answer: [1], explain: "devDependencies are for developing/building; production servers install only runtime dependencies." },
      ]},
      { t: "recap", items: [
        "A runtime = engine + APIs; Node frees JS from the browser.",
        "package.json = intent, lockfile = resolution (committed), node_modules = materialization (ignored).",
        "devDependencies vs dependencies separate build tools from runtime needs.",
        "--frozen-lockfile turns drift into a loud CI failure.",
      ]},
      { t: "checkpoint", text: "Initialize a fresh project, add one runtime and one dev dependency, and explain what each of the three artifacts (package.json, lockfile, node_modules) is for." },
      { t: "bridge", text: "Your tools now run reproducibly. Last in this module: configuration and secrets — environment variables done safely, before you ever put a key in code.", next: "env-variables-secrets" },
    ],
  },

  {
    id: "env-variables-secrets",
    title: "Environment Variables and Secrets",
    volume: 1, module: 3, order: 3, level: "Foundation", status: "implemented", minutes: 35,
    summary: "Configuration vs secrets, the .env discipline, and the leaks that end careers early — with a fail-fast guard you'll reuse forever.",
    prereqs: ["node-and-runtime"],
    objectives: [
      "Separate configuration from secrets using one question",
      "Use .env, .env.example, and .gitignore correctly",
      "Write a requireEnv guard that fails fast at startup",
      "Respond correctly when a secret is committed",
    ],
    concepts: ["environment", "secrets", "config", ".env"],
    blocks: [
      { t: "lead", text: "Every real app needs values that change per environment (ports, URLs) and values that must never be shared (API keys, tokens). Conflating the two — especially committing secrets to Git — is the most common, most damaging mistake new developers make. This lesson draws the line clearly." },
      { t: "why", text: [
        "Code is public the moment it's pushed. A committed secret is public *forever* (Git history remembers), and rotating every leaked key is a bad day you can prevent with one habit.",
        "Separating config from code is also what lets the same build run in dev, staging, and production — a prerequisite for every deployment story later in the course.",
      ]},
      { t: "simple", text: [
        "Ask one question of every value: **does it grant access?** API keys, tokens, passwords, database URLs with credentials — those are **secrets**: never committed, never logged, never shipped to the browser. Ports, feature flags, public URLs — that's **configuration**: safe to template and share.",
        "Secrets travel with the *process*, not the repo: as environment variables, injected by the machine that runs the code.",
      ]},
      { t: "model", title: "Three files, one fence", text: [
        "**.env** holds the real values for your machine — and is gitignored. **.env.example** holds the same *names* with safe placeholder values — and IS committed, so teammates know what to fill in. **.gitignore** lists .env — set up on day zero, before any secret is written.",
        "The discipline: secrets live in .env (ignored), the schema lives in .env.example (shared), and the fence (.gitignore) goes up first.",
      ], map: [
        ["Your house keys", "Secrets — never handed out, never photographed"],
        ["A form listing which keys exist", ".env.example — names only, safe to share"],
        ["The lock on the door", ".gitignore — in place before you need it"],
      ]},
      { t: "code", lang: "js", title: "Fail fast with requireEnv", code:
"// config.js — read the environment ONCE, validate, export typed config\nfunction requireEnv(name) {\n  const value = process.env[name];\n  if (!value) {\n    // Fail at STARTUP, naming the variable — not mid-request, mysteriously\n    throw new Error(`Missing required environment variable: ${name}`);\n  }\n  return value;\n}\n\nexport const config = {\n  port: Number(process.env.PORT ?? 3000),          // config: safe default\n  apiUrl: requireEnv(\"API_URL\"),                    // required\n  dbUrl: requireEnv(\"DATABASE_URL\"),                // secret\n};\n\n// Values in process.env are always STRINGS — coerce at this boundary:\n// Number(...), === \"true\", new URL(...)",
        notes: ["Reading the environment in one module means one place to validate, coerce, and document.", "A missing secret should crash at boot with a clear name — not surface as a cryptic error three layers deep at runtime."] },
      { t: "debug", title: "Debugging lab — a committed secret", scenario: "A teammate pushed .env to the repo. The API key inside is now in Git history — and the repo is shared.", error:
"# .env was committed and pushed:\nDATABASE_URL=postgres://admin:hunter2@db.prod.example/app\nAPI_KEY=sk_live_9f8e7d6c5b4a…",
        tells: "The secret is in history, so deleting the file now is not enough — it's still recoverable. And 'deleting' isn't the first step anyway: exposure already happened, so the key must be treated as compromised regardless of cleanup.",
        flow: [
          "Recognize the order: ROTATE first. Revoke and reissue the key — exposure is a fact, cleanup is secondary.",
          "Then scrub history (git filter-repo / BFG) and force-push.",
          "Audit: check the provider's logs for unexpected use of the old key.",
          "Add .env to .gitignore and a pre-commit guard so it can't recur.",
          "Verify the new key works and the old one is dead.",
        ], root: "Git is append-only history; a committed secret survives file deletion. The only safe response is rotation first, scrubbing second, because the value must be assumed leaked the instant it was pushed.", prevent: ".gitignore on day zero, a pre-commit secret scanner, and .env.example so real values never need to be committed." },
      { t: "note", kind: "security", title: "Secrets never go to the browser", text: ["In full-stack apps (Volumes VII–VIII), a hard rule: anything prefixed for the server stays on the server. Next.js, for example, only exposes NEXT_PUBLIC_ variables to the client — everything else is stripped from the browser bundle. Design secrets so the client never needs them."] },
      { t: "vocab", terms: [
        ["Secret", "A value that grants access — never committed, logged, or client-shipped."],
        ["Configuration", "Per-environment values safe to template (ports, URLs, flags)."],
        [".env", "Local real values — gitignored."],
        [".env.example", "Committed names + safe placeholders."],
        ["Rotation", "Revoking and reissuing a compromised secret — always step one."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "The one question that separates a secret from configuration is…", options: ["Is it long?", "Does it grant access?", "Is it a string?", "Does it change often?"], answer: [1], explain: "If the value grants access (keys, tokens, credentialed URLs), it's a secret. Length, type, and volatility don't decide." },
        { id: "q2", type: "single", prompt: "A secret was committed and pushed. The FIRST step is…", options: ["Delete the file", "Rewrite history", "Rotate the key", "Add .gitignore"], answer: [2], explain: "Exposure already happened; the key is compromised no matter what you delete. Rotate (revoke + reissue) first, then scrub history." },
        { id: "q3", type: "boolean", prompt: "Deleting a committed .env file removes the secret from the repository.", options: ["True", "False"], answer: [1], explain: "False — Git history retains every committed version. The value stays recoverable; rotation is the real remedy." },
      ]},
      { t: "recap", items: [
        "'Does it grant access?' splits secrets from config.",
        ".env (ignored) + .env.example (shared) + .gitignore (first).",
        "requireEnv fails fast at startup, naming the missing variable.",
        "Leaked secret → rotate first, scrub history second.",
      ]},
      { t: "checkpoint", text: "Classify these from memory: PORT, STRIPE_SECRET_KEY, NEXT_PUBLIC_API_URL, DATABASE_URL — secret or config, and which one still needs care and why." },
      { t: "bridge", text: "Your workstation is professional: shell, runtime, toolchain, and safe configuration. The last tool in the Foundation toolbox is the one that keeps every change recoverable and shareable. Next: Git — three rooms and a snapshot graph.", next: "git-mental-model" },
    ],
  },
];
