import type { Lesson } from "../lib/core";

/* ================= MODULE 7 — TYPESCRIPT FOUNDATIONS ================= */

const whyTypes: Lesson = {
  id: "why-types",
  title: "Why Types Change How You Code",
  volume: 1,
  module: 7,
  order: 1,
  level: "Foundation",
  status: "implemented",
  minutes: 40,
  summary:
    "Types are documentation the compiler enforces. This lesson does bug archaeology on real JavaScript failure modes to show what types prevent, why strict is the only sane default, and how to read a compiler error as a set of directions rather than a judgment.",
  prereqs: ["responsive-and-tokens"],
  objectives: [
    "Explain what a type IS and why it costs nothing at runtime",
    "Name the bug categories TypeScript deletes (typos, wrong shapes, impossible states)",
    "Justify strict mode as the default, not an aspiration",
    "Read a compiler error as directions: file, line, expected vs actual",
    "Set up a tsconfig and run tsc --noEmit as a quality gate",
  ],
  concepts: ["type", "static analysis", "strict mode", "tsconfig", "compiler error"],
  blocks: [
    {
      t: "lead",
      text: "For six modules you've written JavaScript with the runtime as your only reviewer: bugs surface when the code *runs*, which on a real project means during a demo, a deploy, or at 2 a.m. TypeScript adds a second reviewer that reads your code *before* it runs — the compiler. This lesson isn't syntax; it's the case for why that reviewer earns its keep, made the honest way: by exhuming real bugs.",
    },
    {
      t: "why",
      text: [
        "JavaScript's freedom is real: any variable can hold any value, any function can be passed anything. That freedom is delightful in a 50-line script and lethal in a 50,000-line app, because *nothing remembers what anything is supposed to be*. Your memory is the type system — and memory doesn't survive a refactor, a new teammate, or three months.",
        "TypeScript puts those 'supposed to be' claims in the code itself, then mechanically checks every single one. The claims are erased at compile time — the browser never sees them — so you pay zero runtime cost for a permanent, tireless reviewer.",
      ],
    },
    {
      t: "simple",
      text: [
        "A **type** is a label you attach to a value: this is a number, this is an order with an id and items, this function takes a string and returns a boolean. From then on, the compiler checks every use against the label.",
        "Think of it as **spelling everything out for a very literal coworker** who never forgets, never gets tired, and reviews every line of every file on every save. Annoying? Occasionally. Wrong? Almost never.",
      ],
    },
    {
      t: "model",
      title: "Documentation that can't rot",
      text: [
        "The deepest idea: a type is *documentation that executes*. A comment saying '// takes a user' can silently become a lie; a signature (user: User) cannot — the compiler rejects the lie. This is why teams say TypeScript 'documents itself': the contract and the check are the same artifact.",
        "It also changes how you design. To write a type, you must first *decide* what a thing is — which states exist, which fields are optional, which values are legal. That decision, made explicitly and early, is where a huge fraction of bugs are killed before any code exists.",
      ],
      map: [
        ["A contract both sides sign", "A type: producer promises the shape, consumer relies on it"],
        ["A coworker who reviews every save", "The compiler: tireless, literal, always on"],
        ["Deciding the menu before cooking", "Designing types forces you to define states up front"],
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "Bug archaeology: three real failure modes",
      code: "// BUG 1 — the typo. JS runs it; it's undefined at runtime.\nconst total = cart.subTotal + cart.tax;\n//             ^ Property 'subTotal' does not exist on type\n//               '{ subtotal: number; tax: number }'.\n// TS: caught at compile time. You never ship it.\n\n// BUG 2 — the wrong shape. JS happily reads .name of undefined.\nfunction greet(user) { return `hi ${user.name}`; }\ngreet(fetchUser()); // fetchUser() returned undefined once, ever\n// TS: greet(user: User) — passing undefined is a type error.\n\n// BUG 3 — the impossible state. JS lets an order be\n// 'loading' AND 'error' AND 'done' at once.\ntype Status = \"loading\" | \"error\" | \"done\"; // union: exactly one\nlet s: Status = \"loading\";\n// s = \"loadingg\";  ← compile error: not in the union",
      notes: [
        "Notice none of these required running the program. The compiler read the claims and found the violations statically — 'static analysis' is the whole trick.",
        "The union in BUG 3 is a first taste of making illegal states unrepresentable: the type system can't stop every bug, but it can delete whole categories.",
      ],
    },
    {
      t: "h2",
      id: "strict",
      text: "Strict mode: the only sane default",
    },
    {
      t: "code",
      lang: "ts",
      title: "What strict actually turns on",
      code: "// tsconfig.json — a minimal, honest setup\n{\n  \"compilerOptions\": {\n    \"strict\": true,          // the umbrella: all checks below\n    \"noEmit\": true,          // type-check only; a bundler emits\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\"\n  },\n  \"include\": [\"src\"]\n}\n\n// The checks strict enables, in one line each:\n// strictNullChecks   — null/undefined are NOT silently in every type\n// noImplicitAny      — you may not leave types to guesswork\n// strictFunctionTypes— function params are checked contravariantly\n// noImplicitThis     — 'this' can't be a silent any\n\n// Run it as a gate:\n//   pnpm exec tsc --noEmit   ← the cheapest quality check you'll ever add",
      notes: [
        "A non-strict tsconfig is a half-built fence: it catches typos but lets null-flow bugs through — the exact bugs that wake you at 2 a.m. Start strict; it's far harder to tighten later.",
        "tsc --noEmit belongs in CI. It's the entire type system as one command, failing the build on any broken promise.",
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "Reading an error as directions",
      code: "src/cart.ts(14,22): error TS2339:\nProperty 'subTotal' does not exist on type 'Cart'.\n\n// Read it as four directions, not a judgment:\n//   WHERE   → src/cart.ts, line 14, column 22\n//   WHAT    → TS2339: a property access failed\n//   WHY     → 'subTotal' isn't on the Cart type\n//   FIX     → the property is 'subtotal' — or the type is wrong\n\n// The codeframe the editor shows points at the exact token.\n// 90% of learning TypeScript is learning to read these four\n// lines calmly instead of guessing.",
    },
    {
      t: "debug",
      title: "Debugging lab — 'it compiles, but the data is still wrong'",
      scenario: "You've typed a function that reads settings from localStorage. tsc is green, but at runtime settings.theme is undefined. The types said Settings. The data said otherwise. Who lied?",
      error: "interface Settings { theme: \"light\" | \"dark\"; }\n\nconst settings = JSON.parse(raw) as Settings; // the cast\nsettings.theme; // undefined at runtime — the key is missing\n\n// tsc passed. It always will: a cast is a PROMISE, not a check.",
      tells: "A type is a compile-time promise about YOUR code, not a runtime guarantee about THE WORLD. Data that crosses a boundary — fetch responses, localStorage, form input — arrives untyped no matter what your interface says. The cast performed confidence without evidence.",
      flow: [
        "Locate where external data enters: JSON.parse + a cast. That's the crime scene.",
        "Identify the layer — the boundary, not the rendering that trusted the contract.",
        "Reproduce: feed the function garbage/missing-key JSON; watch undefined flow through.",
        "Change one variable: parse to unknown, then VALIDATE the shape before trusting it.",
        "Verify: bad data now degrades to a default instead of poisoning the app.",
      ],
      root: "Types stop at the trust boundary. Only runtime inspection establishes truth about foreign data. The pattern is parse → validate → trust; a cast skips the middle step.",
      prevent: "Ban `as` on parse results. Type the validator's output, not the input. Volume IV formalizes this with real validators (zod); the instinct — 'never trust the shape of foreign data' — starts now.",
    },
    {
      t: "mistake",
      title: "Typing the symptom, not the contract",
      wrong: "function f(x: any) — silencing the compiler where you're unsure.",
      right: "Type what you mean. If you genuinely don't know, use unknown — it forces you to inspect before using, keeping the compiler engaged.",
      explain: "any is the compiler off-switch; it doesn't just skip checking that value, it lets the untyped-ness spread to everything it touches. unknown is the honest 'I don't know yet' that still makes you prove things.",
    },
    {
      t: "note",
      kind: "production",
      title: "Types are free at runtime — that's the point",
      text: [
        "TypeScript compiles to plain JavaScript: every annotation is erased. There is zero runtime cost, no library to ship, no performance debate — the entire value arrives before the code ever runs, as build-time errors. This is also why 'performance' is never a valid argument against types, and why CI failing on tsc --noEmit is the cheapest quality gate you will ever install.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Write the tsconfig above, add a src file with a deliberate typo'd property, and run pnpm exec tsc --noEmit. Read the error aloud using the WHERE/WHAT/WHY/FIX frame.",
        "Type a function from one of your earlier JS lessons (addTodo, area). Count the strict-mode errors; for each, write one sentence: what SHOULD happen here?",
        "Break the localStorage lab on purpose: cast bad JSON to Settings and watch undefined propagate. Then fix it with unknown + validation.",
        "Stretch: define a union type for a traffic light and a function that handles each case; try assigning an illegal value and read the error.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "What IS a type, precisely?", options: ["A runtime check the browser performs", "A compile-time claim about a value that the compiler enforces", "A kind of class", "A linting rule"], answer: [1], explain: "A type is a claim, checked statically, erased before runtime. The browser never sees it; the compiler checks every use against it." },
        { id: "q2", type: "single", prompt: "TypeScript's runtime performance cost is…", options: ["small but measurable", "zero — types are erased at compile time", "large for big apps", "dependent on strict mode"], answer: [1], explain: "All annotations compile away to plain JavaScript. The value is entirely pre-runtime, so 'performance' is never an argument against types." },
        { id: "q3", type: "multi", prompt: "Which bug categories does TypeScript delete?", options: ["Property-name typos", "Passing the wrong shape to a function", "Representing impossible states", "Server outages"], answer: [0, 1, 2], explain: "Typos, shape mismatches, and (via unions) illegal states are all caught statically. External failures like outages are runtime concerns." },
        { id: "q4", type: "single", prompt: "A cast (as Settings) on JSON.parse is risky because…", options: ["casts are slow", "a cast is a promise, not a check — the data is never validated", "it disables strict mode", "it mutates the data"], answer: [1], explain: "The compiler trusts the assertion without evidence. Foreign data must be validated at the boundary: parse → validate → trust." },
        { id: "q5", type: "boolean", prompt: "You should start new projects in strict mode.", options: ["True", "False"], answer: [0], explain: "True — strict catches the null-flow and implicit-any bugs that cause real incidents, and it's far harder to tighten a loose codebase later." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Type", "A compile-time claim about a value; checked statically, erased at runtime."],
        ["Static analysis", "Checking code without running it."],
        ["Strict mode", "The tsconfig umbrella enabling all the checks that keep types honest."],
        ["Cast (as T)", "An assertion the compiler trusts without checking — a promise, not a proof."],
        ["unknown", "The honest 'I don't know' type; you must inspect before using it."],
      ],
    },
    {
      t: "recap",
      items: [
        "Types are enforced documentation: the contract and the check are the same artifact.",
        "They delete whole bug categories — typos, wrong shapes, impossible states — before anything runs.",
        "strict is the default, not an aspiration; tsc --noEmit is a CI gate.",
        "Read errors as WHERE/WHAT/WHY/FIX directions.",
        "Types stop at trust boundaries: parse → validate → trust, never a bare cast.",
      ],
    },
    { t: "checkpoint", text: "Explain in one sentence why TypeScript has zero runtime cost. Then read a compiler error from any scratch file aloud using the four-part frame." },
    { t: "bridge", text: "You know WHY. Now the everyday WHAT: the vocabulary you'll actually type — primitives, arrays, objects, interfaces, unions, and what each strict flag enforces.", next: "ts-strict-basics" },
  ],
};

const tsStrictBasics: Lesson = {
  id: "ts-strict-basics",
  title: "Strict Mode: The Everyday Vocabulary",
  volume: 1,
  module: 7,
  order: 2,
  level: "Foundation",
  status: "implemented",
  minutes: 55,
  summary:
    "The 20% of TypeScript you'll use 95% of the time: primitives, arrays, objects, interfaces, unions, and literal types — plus what every strict flag actually enforces and how to resist any.",
  prereqs: ["why-types"],
  objectives: [
    "Annotate variables, parameters, and returns with primitives, arrays, and objects",
    "Model domain data with interfaces and unions of literal types",
    "Explain what strictNullChecks and noImplicitAny enforce",
    "Use optional (?) vs nullable (| null) deliberately",
    "Reach for unknown, not any, at untyped boundaries",
  ],
  concepts: ["interface", "union", "literal types", "optional", "nullable", "any vs unknown"],
  blocks: [
    {
      t: "lead",
      text: "This is the vocabulary lesson — the small set of constructs behind nearly every annotation you'll ever write. The goal isn't to enumerate the language (it's large); it's to make the everyday cases automatic, so your attention stays on design instead of syntax.",
    },
    {
      t: "why",
      text: [
        "Most TypeScript pain isn't advanced types — it's *mismodeling*: using string where three literals were meant, any where unknown was right, optional where nullable was meant. Each quietly switches the compiler off for a whole region of your code.",
        "Getting the basic vocabulary precise is what makes the compiler a partner: the more exactly you say what a thing is, the more work it does for you.",
      ],
    },
    {
      t: "simple",
      text: [
        "The everyday toolkit: **primitives** (string, number, boolean), **arrays** (string[]), **objects** ({ x: number }), **interfaces** (named object shapes), and **unions** (this OR that). A union of literal types — status: \"loading\" | \"done\" — is the single most useful trick in the language: it turns a vague string into a closed menu the compiler enforces.",
      ],
    },
    {
      t: "model",
      title: "Interfaces are contracts; unions are menus",
      text: [
        "An **interface** names a shape once — interface Order { id: string; items: Item[]; coupon?: string } — and every producer must satisfy it, every consumer may rely on it. It vanishes at compile time; it exists only as a shared promise.",
        "A **union** lists possibilities: Status = \"idle\" | \"loading\" | \"error\". status: string promises nothing; the union promises exhaustiveness. Combined, they let you model a domain so precisely that whole classes of 'forgot a case' bugs become compiler errors.",
      ],
      map: [
        ["A lease both sides sign", "An interface: producer satisfies, consumer relies"],
        ["A menu with exactly four dishes", "A union of literals: the compiler knows every possibility"],
        ["An optional topping vs an empty plate", "? (may be absent) vs | null (present but empty)"],
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "Primitives → objects → unions",
      code: "// primitives\nconst title: string = \"Mission Log\";\nconst version: number = 2;\nconst done: boolean = false;\n\n// arrays — two spellings, same type\nconst tags: string[] = [\"css\", \"types\"];\nconst scores: Array<number> = [98, 87];\n\n// an object shape, named once\ninterface Task {\n  id: string;\n  title: string;\n  done: boolean;\n  due?: string;          // OPTIONAL — the key may be absent\n  assignee: string | null; // NULLABLE — present, may be null\n}\n\n// unions + literal types: the end of string soup\ntype Status = \"idle\" | \"loading\" | \"success\" | \"error\";\nlet status: Status = \"idle\";\n// status = \"LOADING\"; ← compile error: not in the union",
      notes: [
        "optional (?) vs nullable (| null) is a real distinction: task.due may be MISSING (check with 'due' in task), while task.assignee is always present but may be null. Model what your data actually does.",
        "Interfaces and type aliases overlap hugely; interfaces are conventional for object shapes, type aliases are required for unions.",
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "Functions: parameters always, returns usually inferred",
      code: "// annotate params; let the return be inferred unless it's unclear\nfunction formatTask(task: Task): string {\n  return task.done ? `✓ ${task.title}` : task.title;\n}\n\n// callbacks: annotate the param, infer the rest\nconst titles = tasks.map((t) => t.title); // t: Task — inferred\n\n// void = returns nothing useful; never = never returns at all\nfunction logTask(t: Task): void { console.log(t.title); }\nfunction fail(msg: string): never { throw new Error(msg); }",
    },
    {
      t: "code",
      lang: "ts",
      title: "What the strict flags actually enforce",
      code: "// 1) noImplicitAny — no leaving types to guesswork\nfunction greet(name) { }        // error: 'name' implicitly has 'any'\nfunction greet2(name: string) {} // say what you mean\n\n// 2) strictNullChecks — null/undefined aren't secretly everywhere\nconst t: Task | undefined = findTask(\"x\");\nconsole.log(t.title);   // error: 't' is possibly 'undefined'\nconsole.log(t?.title);  // ok: you acknowledged the possibility\n\n// The lenient alternative, for contrast — never ship this:\n// { \"strict\": false } compiles all of the above and turns\n// TypeScript into expensive comments.",
      notes: ["strict is one switch for ~8 flags. New project → strict: true, no exceptions. Inherited a lenient codebase → migrate flag by flag."],
    },
    {
      t: "mistake",
      title: "Typing the JSON hole with any",
      wrong: "const data: any = JSON.parse(raw); then data.user.name — the compiler watches you walk into traffic.",
      right: "const data: unknown = JSON.parse(raw); then INSPECT before using.",
      explain: "JSON.parse returns any because it genuinely can't know. Widening to unknown keeps the compiler engaged at the one boundary where wrongness enters. any silences it everywhere downstream.",
    },
    {
      t: "debug",
      title: "Debugging lab — 'possibly undefined' is a direction, not a verdict",
      scenario: "You type an existing JS function and hit a wall of red: Object is possibly 'undefined'. The temptation is to sprinkle ! everywhere until it's quiet.",
      error: "function applySettings(s: Settings | undefined) {\n  document.body.dataset.theme = s.theme;\n  // error: 's' is possibly 'undefined'.\n}\n\n// Three tempting wrong fixes:\n// s!.theme        — 'trust me' (non-null assertion)\n// s as Settings   — 'stop checking' (cast)\n// s: any          — surrender\n// All three COMPILE. All three can crash at 2 a.m.",
      tells: "Read the error as the compiler's honest observation: this value CAN be undefined at runtime — some caller can pass nothing. The bang (!) doesn't remove that possibility; it removes the compiler's ability to warn. The question isn't 'how do I silence this' but 'what SHOULD happen when settings are missing'.",
      flow: [
        "Believe the signature: it says undefined is possible.",
        "Identify the layer — null-safety, not syntax.",
        "Ask the design question: missing means 'use defaults' or 'this can't run'?",
        "Fix accordingly: const s2 = s ?? DEFAULTS; or if (!s) return;",
        "Verify both branches are typed and total — no !, no as, no any.",
      ],
      root: "Every 'possibly undefined' is a fork the old JS code ran through blind. TypeScript forces you to pick a lane: handle the absence, or change the contract so absence is impossible.",
      prevent: "Treat the ! assertion like a loaded weapon: it needs a comment explaining why absence is impossible, and reviewers should flinch. Prefer narrowing (next lesson) and defaults.",
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Type addTodo(title: string, tags?: string[]) fully, then break it three ways and read each error.",
        "Define an interface for a flashcard (front, back, optional lesson link, difficulty union). Create one valid and two INVALID instances; collect the error messages.",
        "Annotate 10 lines of your own old JS. Count the strict errors; for each, write one sentence: what SHOULD happen?",
        "Stretch: write loadSettings(raw: string): Settings that survives garbage input by returning a default — no any, no !.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "strictNullChecks enforces…", options: ["variables can never be null", "null/undefined aren't silent members of every type — declare and handle them", "all params become optional", "runtime null checks"], answer: [1], explain: "Without it, string secretly means string|null|undefined everywhere. With it, absence is explicit and the compiler forces you to handle it." },
        { id: "q2", type: "single", prompt: "Which says 'this key might not exist at all'?", options: ["coupon: string | null", "coupon?: string", "coupon: any", "coupon: undefined"], answer: [1], explain: "? marks the PROPERTY optional — the key may be absent. string | null means present-but-possibly-null. Model the difference deliberately." },
        { id: "q3", type: "single", prompt: "status: \"idle\" | \"loading\" | \"error\" buys you…", options: ["nothing — same as string", "the compiler knows every legal value, so typos and forgotten cases become errors", "faster comparisons", "auto UI rendering"], answer: [1], explain: "Both compile to JS, but the union hands the compiler the full menu: 'LOADING' fails to assign, and exhaustive handling becomes checkable." },
        { id: "q4", type: "single", prompt: "The professional first move for untrusted JSON?", options: ["type it with your interface", "const x: unknown, then validate before use", "const x: any — flexibility", "cast it: as ApiResponse"], answer: [1], explain: "Interfaces promise about YOUR code, not the world. unknown keeps the compiler engaged at the exact point wrongness enters." },
        { id: "q5", type: "boolean", prompt: "Type annotations add runtime overhead.", options: ["True", "False"], answer: [1], explain: "False — all types are erased at compile time; the output is ordinary JavaScript. The value is entirely pre-runtime." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Interface", "A named object shape — a compile-time contract, erased at runtime."],
        ["Union", "A type listing exact possibilities: A | B | C."],
        ["Literal type", "A type that IS one value: \"idle\". Unions of literals replace string soup."],
        ["Optional (?)", "The key may be absent — distinct from a nullable value."],
        ["unknown", "'I don't know yet' — usable only after inspection."],
        ["any", "The compiler off-switch. Compiles now, crashes later, lies always."],
      ],
    },
    {
      t: "recap",
      items: [
        "Primitives, arrays, interfaces, and unions cover the everyday vocabulary.",
        "Unions of literals make illegal values unrepresentable.",
        "? means absent; | null means empty — model deliberately.",
        "strict is the baseline; possibly-undefined is a direction to a design decision.",
        "unknown at boundaries; any is surrender.",
      ],
    },
    { t: "checkpoint", text: "From memory, annotate a two-field interface with one optional and one nullable field, and explain the difference in one sentence." },
    { t: "bridge", text: "Unions give the compiler a complete menu — but programs must still choose among them at runtime. Next: narrowing, where the compiler reads your if-statements and proves your switch handled everything.", next: "narrowing" },
  ],
};

const narrowing: Lesson = {
  id: "narrowing",
  title: "Narrowing: The Compiler Reads Your If-Statements",
  volume: 1,
  module: 7,
  order: 3,
  level: "Foundation",
  status: "implemented",
  minutes: 50,
  summary:
    "Narrowing is where TypeScript stops checking what you wrote and starts checking what you proved. Guards shrink a union's possibilities branch by branch, discriminated unions model state machines without impossible states, and the never-check turns 'forgot a case' into a compile error.",
  prereqs: ["ts-strict-basics"],
  objectives: [
    "Explain narrowing as the compiler eliminating union members from your checks",
    "Use typeof, in, instanceof, and truthiness guards deliberately",
    "Model state as a discriminated union instead of optional-field soup",
    "Write an exhaustive switch the compiler verifies with the never-check",
    "Know when narrowing stops working (closures, async gaps) and what to do",
  ],
  concepts: ["narrowing", "type guard", "discriminated union", "exhaustiveness", "never"],
  blocks: [
    {
      t: "lead",
      text: "Most type systems check what you *wrote*. TypeScript checks what you *proved*. Every if-statement, every === comparison, every in check is evidence the compiler collects — and a few lines into a branch it often knows more about your value than you do. That ability is **narrowing**, and it's the feature that makes strict mode feel like a partner instead of a hall monitor.",
    },
    {
      t: "why",
      text: [
        "Strict mode creates a problem: values are honestly typed as unions (Settings | undefined, string | number), but real code must act on ONE case at a time. Without narrowing you'd cast everywhere, defeating the point. Narrowing lets you *earn* precision: show the compiler the check, and it removes the impossible cases for the rest of the branch. No casts, no assertions — just logic, verified.",
        "And real programs are state machines: idle → loading → success | error. The beginner model — one object with optional fields everywhere — allows impossible states like 'loading AND error AND data'. Discriminated unions make impossible states unrepresentable, and narrowing makes handling each state checkable.",
      ],
    },
    {
      t: "simple",
      text: [
        "A sealed envelope says on the outside: inside is either an **invoice** or a **receipt**. You open it and see 'invoice' printed at the top. From then on you *know* the total field exists — you don't keep checking. **Narrowing is the compiler doing exactly that**: it reads the label, discards the impossible option, and lets you use what's left without further questions.",
      ],
    },
    {
      t: "model",
      title: "A shrinking menu of possibilities",
      text: [
        "At any point, the compiler holds a value's type as a *set of possibilities*. Each guard removes members for the code below it. if (typeof x === \"string\") — inside, x is string; in the else, whatever's left. The set only shrinks, and it can shrink to never: the type with zero possibilities, which is how the compiler says 'this code is unreachable — and if it isn't, you forgot a case'.",
      ],
      map: [
        ["A menu where eaten dishes get crossed off", "The possibility set shrinking as guards run"],
        ["The label printed on the envelope", "The discriminant property: kind: \"invoice\""],
        ["An empty menu = kitchen closed", "never — reaching it means a missed case"],
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "The everyday guards",
      code: "function describe(value: string | number): string {\n  if (typeof value === \"string\") {\n    return value.toUpperCase();  // value: string here\n  }\n  return value.toFixed(2);       // value: number — the ONLY thing left\n}\n\ninterface Circle { radius: number }\ninterface Square { side: number }\nfunction area(shape: Circle | Square): number {\n  if (\"radius\" in shape) return Math.PI * shape.radius ** 2;\n  return shape.side ** 2;        // 'radius' impossible → Square\n}\n\n// truthiness narrows out null/undefined/\"\"/0 — mind the trap:\nfunction greet(name?: string) {\n  if (name) return `hi ${name}`; // name: string inside\n  return \"hi stranger\";\n}\n// But if (count) also kills 0 — wrong when 0 is valid.\n// Use if (count !== undefined) when zero is data.",
    },
    {
      t: "code",
      lang: "ts",
      title: "Discriminated unions: state without impossible states",
      code: "// Beginner model — every combination representable,\n// including the impossible ones:\ninterface BadFetch {\n  loading: boolean;\n  error?: string;\n  data?: string[];\n} // { loading:true, error:\"x\", data:[\"y\"] } compiles 😬\n\n// Discriminated union — one literal 'kind' labels each case:\ntype FetchState =\n  | { kind: \"idle\" }\n  | { kind: \"loading\" }\n  | { kind: \"success\"; data: string[] }\n  | { kind: \"error\"; message: string };\n\nfunction render(s: FetchState): string {\n  switch (s.kind) {\n    case \"idle\":    return \"Press start\";\n    case \"loading\": return \"Working…\";\n    case \"success\": return s.data.join(\", \"); // data GUARANTEED\n    case \"error\":   return `Failed: ${s.message}`;\n  }\n}\n// An impossible state cannot even be CONSTRUCTED.",
    },
    {
      t: "code",
      lang: "ts",
      title: "Exhaustiveness: 'forgot a case' as a compile error",
      code: "type Shape =\n  | { kind: \"circle\"; radius: number }\n  | { kind: \"square\"; side: number };\n  // imagine adding { kind: \"triangle\" } next month…\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case \"circle\": return Math.PI * s.radius ** 2;\n    case \"square\": return s.side ** 2;\n    default: {\n      // If every case returned above, s is `never` here.\n      // Add a kind and forget this switch → s is NOT never,\n      // and this line becomes a compile error:\n      const _exhaustive: never = s;\n      return _exhaustive;\n    }\n  }\n}\n// 'Type triangle is not assignable to type never'\n// — the compiler just did your code review.",
      notes: ["The never-assignment is the standard exhaustiveness check. It turns 'I hope I handled every case' into a build failure the moment a case is added — months before a user finds the missing branch."],
    },
    {
      t: "debug",
      title: "Debugging lab — the case the compiler caught before users did",
      scenario: "Six months ago you shipped a notification renderer for kind: \"email\" | \"sms\". Today a teammate adds \"push\" to the union for a new feature. On the old model this ships a blank screen. With a discriminated union, the build breaks — and the error is a gift.",
      error: "type Notice =\n  | { kind: \"email\"; to: string; subject: string }\n  | { kind: \"sms\"; phone: string }\n  | { kind: \"push\"; token: string };  // ← new feature\n\nfunction render(n: Notice): string {\n  switch (n.kind) {\n    case \"email\": return `To ${n.to}: ${n.subject}`;\n    case \"sms\":   return `SMS → ${n.phone}`;\n    default: {\n      const _exhaustive: never = n;\n      //    ~~~~~~~~~~ ERROR: Type '{ kind: \"push\"; … }'\n      //    is not assignable to type 'never'.\n      return _exhaustive;\n    }\n  }\n}",
      tells: "The error names the exact unhandled shape — { kind: \"push\"; token: string } — and points at the switch that missed it. A feature addition *forced* every renderer to acknowledge the new case. The optional-field alternative would have compiled fine and shipped a blank screen.",
      flow: [
        "The error is at the never-assignment, not the new feature — the new member is correct; the old switch is incomplete.",
        "Identify the layer — exhaustiveness, as designed.",
        "Remove the new union member: the error vanishes. Add it back: it returns. The check is live.",
        "Add case \"push\": return `Push → ${n.token}`; the never-check passes because s is unreachable again.",
        "Grep for other switches over Notice — the compiler already listed them; fix until green.",
      ],
      root: "Adding a possibility to a union is a contract change; exhaustiveness checks turn it into a compiler-enforced migration checklist, caught at merge time in CI.",
      prevent: "Policy: every state is a discriminated union; every switch over one ends with the never-check. The highest-leverage TypeScript habit in production codebases — reducers, API clients, and state machines all converge on it.",
    },
    {
      t: "mistake",
      title: "Narrowing that silently un-happens",
      wrong: "Checking value.kind === \"success\" then using value.data inside a callback or after an await — and getting 'still the full union'.",
      right: "Narrowing follows control flow in a straight line. A closure or async gap may run later, when the value could have changed — so the compiler refuses to trust the earlier check. Capture the narrowed value (const ok = value) or re-check inside.",
      explain: "This isn't pedantry: that closure genuinely might run after a reassignment. The compiler's 'amnesia' is correct caution. Learn its rules and it stops feeling arbitrary.",
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Write area() for circle/square/triangle WITH the never-check. Delete the triangle case and watch the build tell you. Add it back.",
        "Model a traffic light as a discriminated union (green has a seconds field) and a nextLight(light) function the compiler verifies as exhaustive.",
        "Hunt the truthiness trap: a function taking count: number | undefined that 'guards' with if (count). Prove 0 is mishandled; fix with !== undefined.",
        "Stretch: convert a piece of state you own (a filter: all/active/done) from strings to a literal union and let the compiler find every comparison site.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "Inside if (typeof value === \"string\"), value: string | number is…", options: ["unchanged", "string in the branch, number in the else", "any", "only checked at runtime"], answer: [1], explain: "The guard removes string in the else and everything-but-string in the branch. Both directions are tracked automatically." },
        { id: "q2", type: "single", prompt: "What makes a union 'discriminated'?", options: ["each member is an interface", "a shared property with a different LITERAL type in each member", "at least three members", "the extends keyword"], answer: [1], explain: "The discriminant (kind/status) is a literal-typed field unique per member. Comparing it tells the compiler exactly which member survives — no helpers needed." },
        { id: "q3", type: "single", prompt: "const _x: never = s in a switch default proves…", options: ["s is null-safe", "every member was handled — a missed case makes s non-never and errors", "the switch is faster", "runtime validation"], answer: [1], explain: "never is the empty type. If all cases returned, s can't exist at default and the assignment compiles; a missed case leaves a real type and fails the build, naming it." },
        { id: "q4", type: "single", prompt: "Why is { loading: boolean; error?: string; data?: string[] } worse than a discriminated union?", options: ["more memory", "impossible states compile and every consumer must re-verify consistency", "booleans are slow", "optional fields aren't supported"], answer: [1], explain: "Optional-field soup represents states the domain forbids, so bugs become 'forgot to check' instead of 'can't construct'. Unions make legal states the only states." },
        { id: "q5", type: "boolean", prompt: "Narrowing persists into callbacks and across await boundaries.", options: ["True", "False"], answer: [1], explain: "False — a closure/async gap may run after the value changed, so the compiler won't trust the earlier check. Capture the narrowed value or re-check inside." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Narrowing", "The compiler eliminating union members as it reads your guards, per branch."],
        ["Discriminant", "The shared literal-typed field labeling each union member."],
        ["Discriminated union", "A union whose members share a discriminant — impossible states unrepresentable."],
        ["never", "The empty type; assigning a leftover to it proves exhaustiveness."],
        ["Exhaustiveness check", "Assigning the leftover to never so missed cases fail the build."],
      ],
    },
    {
      t: "recap",
      items: [
        "Guards shrink the possibility set; the compiler tracks it per branch.",
        "Truthiness narrows too much when 0/'' are valid — check explicitly.",
        "Discriminated unions make illegal states unrepresentable.",
        "The never-check turns 'forgot a case' into a compile error.",
        "Narrowing doesn't cross closures/awaits — capture or re-check.",
      ],
    },
    { t: "checkpoint", text: "Without looking: write a 3-member discriminated union, a switch over it, and the never-check. Then state what the check reports if you delete a case." },
    { t: "bridge", text: "Armed with unions and narrowing, the last Foundation skill is meeting the outside world under types: the DOM, browser events, and untyped data at the boundary.", next: "ts-dom" },
  ],
};

const tsDom: Lesson = {
  id: "ts-dom",
  title: "TypeScript Meets the Browser",
  volume: 1,
  module: 7,
  order: 4,
  level: "Foundation",
  status: "implemented",
  minutes: 55,
  summary:
    "How TypeScript knows the DOM without any library (lib.dom.d.ts), how to type queries and events, and the parse → validate → trust discipline for every untyped boundary — capped by migrating a real vanilla-JS module to strict TypeScript.",
  prereqs: ["narrowing"],
  objectives: [
    "Explain what lib.dom.d.ts is and why document is typed out of the box",
    "Use querySelector generics and type element references safely",
    "Let addEventListener infer event types and narrow event targets",
    "Apply parse → validate → trust at every untyped boundary",
    "Migrate a real vanilla-JS module to strict TypeScript without changing behavior",
  ],
  concepts: ["lib.dom", "querySelector generic", "event inference", "unknown boundary", "migration"],
  blocks: [
    {
      t: "lead",
      text: "Here's a fact worth pausing on: document.querySelector has full, precise types in your editor — yet you installed nothing to get them. This lesson explains that (declaration files), types the event system you built in the DOM lesson, and then does the real work: migrating a slice of vanilla JS to strict TypeScript, line by line.",
    },
    {
      t: "why",
      text: [
        "TypeScript ships with *declaration files* — .d.ts files that describe libraries without containing code. lib.dom.d.ts declares the entire browser API surface. It's not magic and not a runtime library: it's thousands of lines of type-level documentation the compiler consults. Node's APIs come the same way via @types/node — which is why a bare Node project needs that one devDependency.",
        "And you migrate real code because real codebases get migrated, not born typed. Doing it once on a module you already understand is the cheapest way to learn what changes — and what doesn't.",
      ],
    },
    {
      t: "simple",
      text: [
        "Declaration files are the **instruction manual that ships in the box**. TypeScript reads the manual for the browser (lib.dom) and for Node (@types/node), so it knows every function's signature before you call it. Nothing new runs — you just finally have the manual open while you work.",
        "**Untyped boundaries** are doors the manual can't cover: JSON.parse, localStorage, fetch. Data comes through as unknown — 'something arrived; prove what it is.' Always: parse, validate, then trust.",
      ],
    },
    {
      t: "model",
      title: "Manuals for APIs, checkpoints for data",
      text: [
        "APIs get manuals: lib.dom tells the compiler querySelector returns Element | null, that HTMLInputElement has a value, that a click handler gets a MouseEvent. When the manual is too general, you add precision with a generic or a checked cast — annotating the margins.",
        "Data gets checkpoints: at every boundary, unknown in → validation → typed out. Tiny for your own localStorage schema, a real validator (Volume IV) for APIs. The rule is identical: nothing is trusted until it's inspected.",
      ],
      map: [
        ["The manual in the box", "lib.dom.d.ts / @types/node — type docs, zero runtime"],
        ["Writing in the manual's margins", "Generics and casts adding precision the generic manual lacks"],
        ["A border checkpoint", "parse → validate → trust at every untyped door"],
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "Query, cast, listen — all typed",
      code: "// querySelector returns Element | null — correct but generic\nconst el = document.querySelector(\"#title\");\nif (el) el.textContent = \"hi\";   // Element has textContent\n// el.value                      // error: Element has no 'value'\n\n// Supply the specifics — the generic parameter:\nconst input = document.querySelector<HTMLInputElement>(\"#task-input\");\ninput?.value;                    // HTMLInputElement has value\n\n// Events: addEventListener INFERS the event type from the name\nbutton.addEventListener(\"click\", (event) => {\n  event.clientX;                 // MouseEvent — inferred\n});\n\n// Narrowing the target — the daily move (recall event delegation):\nfunction onInput(e: Event) {\n  if (e.target instanceof HTMLInputElement) {\n    console.log(e.target.value); // narrowed: target IS an input\n  }\n}",
      notes: [
        "e.target is EventTarget because the target may be a CHILD of the element you listened on. instanceof narrowing is the type-safe version of closest().",
        "Prefer the querySelector<T> generic over as-casts; never cast to a type without checking the element actually is that type.",
      ],
    },
    {
      t: "code",
      lang: "ts",
      title: "localStorage, typed honestly",
      code: "interface Task { id: string; title: string; done: boolean }\nconst KEY = \"mission-log.tasks.v1\";\n\nfunction loadTasks(): Task[] {\n  const raw = localStorage.getItem(KEY);   // string | null\n  if (raw === null) return [];             // absence handled\n\n  const parsed: unknown = JSON.parse(raw); // NOT any: stay engaged\n\n  if (\n    Array.isArray(parsed) &&\n    parsed.every((t) =>\n      typeof t === \"object\" && t !== null &&\n      typeof (t as Task).id === \"string\" &&\n      typeof (t as Task).title === \"string\" &&\n      typeof (t as Task).done === \"boolean\")\n  ) {\n    return parsed;                         // proven → safe to trust\n  }\n  return [];                               // corrupt → degrade, don't crash\n}",
      notes: [
        "Version the key (v1). When the schema changes, old data fails validation and degrades to [] instead of poisoning the app.",
        "This hand-rolled check is fine for a schema you own; Volume IV replaces it with a validator (zod) that generates the type FROM the check.",
      ],
    },
    {
      t: "walkthrough",
      title: "Then vs Now: migrating a module to strict TypeScript",
      lang: "ts",
      steps: [
        {
          code: "// THEN — the original (mission-log.js):\nconst state = { tasks: [], filter: \"all\" };\n\nfunction addTask(title) {\n  state.tasks.push({ id: crypto.randomUUID(), title, done: false });\n  render();\n}",
          text: "The JavaScript works — nothing here is a contract. state could hold anything, addTask accepts a number, and the next reader must reverse-engineer the shape. Migration starts by writing down what was always true.",
        },
        {
          code: "// NOW — step 1: the model becomes a contract:\ninterface Task { id: string; title: string; done: boolean }\ntype Filter = \"all\" | \"active\" | \"done\";\n\ninterface AppState { tasks: Task[]; filter: Filter }\nconst state: AppState = { tasks: [], filter: \"all\" };\n\nfunction addTask(title: string): void {\n  state.tasks.push({ id: crypto.randomUUID(), title, done: false });\n  render();\n}",
          text: "Notice what did NOT change: the logic, the names, the flow. Migration is annotation, not rewrite. The literal-only Filter union means state.filter = \"All\" is now a compile error — string soup retired.",
        },
        {
          code: "// NOW — step 2: the DOM gets its margins annotated:\nconst list = document.querySelector<HTMLUListElement>(\"#task-list\")!;\n\nlist.addEventListener(\"click\", (event) => {\n  const row = (event.target as HTMLElement).closest(\"[data-id]\");\n  if (!(row instanceof HTMLLIElement)) return;\n  const id = row.dataset.id;\n  if (!id) return;\n  const task = state.tasks.find((t) => t.id === id);\n  if (task) { task.done = !task.done; render(); }\n});",
          text: "Each annotation is a margin note on the browser manual: THIS query is a list, THAT click's real target is found via closest, and the id might be missing — every 'might' the old code ran through blind is now a checked fork.",
        },
        {
          code: "// tsconfig — the one file that makes it all enforceable:\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2022\", \"DOM\", \"DOM.Iterable\"],\n    \"noEmit\": true\n  },\n  \"include\": [\"src\"]\n}\n// pnpm add -D typescript · pnpm exec tsc --noEmit → CI gate",
          text: "lib selects the manuals: ES2022 for the language, DOM for the browser. noEmit says 'type-check only' — a bundler handles output. And tsc --noEmit is the whole type system as one command.",
        },
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'localStorage lied to my types'",
      scenario: "A teammate's browser has tasks from the OLD schema (plain strings). Your typed loader returns Task[] and the UI renders each task as 'undefined'. The types said Task[]. The data said otherwise. Who lied?",
      error: "// Old saved data: [\"coffee\", \"stretch\"]  (strings!)\nconst tasks = JSON.parse(raw) as Task[];\n// The cast COMPILES. It always compiles. It's a promise,\n// not a check.\ntasks[0].title; // undefined — tasks[0] is \"coffee\"\n// No error. Just a UI full of 'undefined'.",
      tells: "A cast performs zero validation — it tells the compiler 'stop asking', the opposite of what a boundary needs. The symptom 'typed code, wrong data' always means a trust was granted without inspection: find the as on the boundary.",
      flow: [
        "Locate where external data enters: JSON.parse + as. Crime scene.",
        "Identify the layer — the boundary, not the rendering that trusted its contract.",
        "Set localStorage to the old schema in DevTools and reload; 'undefined' appears.",
        "Replace the cast with parse → validate → trust.",
        "Verify: old schema degrades to an empty list with zero errors; new data round-trips.",
      ],
      root: "Types describe your code's promises, not the world's behavior. At boundaries, only runtime inspection establishes truth. Casts move errors from compile time to 2 a.m. production.",
      prevent: "Ban as on parse results in review — unknown + validation is house style. Version storage keys and write one 'corrupt data' test per schema: garbage in, expect [] out.",
    },
    {
      t: "note",
      kind: "production",
      title: "The migration order professionals use",
      text: [
        "Real migrations run leaves-first: type the pure data functions (models, helpers) before the DOM-touching edges, because pure code is testable and everything else depends on its shapes. allowJs lets .ts and .js coexist while you move file by file. Migrations succeed as a hundred small green PRs, never as one heroic red one.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "In a scratch TS file: query a button and an input, wire a click that reads input.value using only the querySelector<T> generic, no casts. Predict each error before running tsc.",
        "Write isValidState for a two-field schema. Feed it tasks: \"not-an-array\", a missing done field, a filter of \"ALL\". All three must be rejected.",
        "Migrate ONE real function from your own code to strict TS. Rules: no any, no !, no as on parsed data. Time yourself; the second function is twice as fast.",
        "Stretch: add a new Filter value (\"today\") end to end — union member, render branch with never-check, validator. Count the compile errors that guided you.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "Why is document.querySelector typed with nothing installed?", options: ["TS downloads browser docs at compile time", "lib.dom.d.ts ships with TypeScript: declarations consulted at compile time, zero runtime", "the browser injects types", "inference from your HTML"], answer: [1], explain: "Declaration files are type-level manuals. lib.dom describes the browser surface; @types/node does the same for Node. Nothing ships to the browser." },
        { id: "q2", type: "single", prompt: "Inside button.addEventListener(\"click\", e => …), e is a MouseEvent because…", options: ["TS guesses from the name", "the DOM declarations overload addEventListener per event name", "all events are MouseEvent", "it's an implicit any"], answer: [1], explain: "lib.dom maps event names to event interfaces: \"click\" → MouseEvent, \"keydown\" → KeyboardEvent. The inference is the manual doing its job." },
        { id: "q3", type: "single", prompt: "JSON.parse(raw) as Task[] compiles but the UI shows 'undefined'. Why?", options: ["TS has an array bug", "the cast is a promise, not a check — real data violated the claimed type", "localStorage corrupts arrays", "render needs an annotation"], answer: [1], explain: "Casts silence the compiler without inspecting data. At boundaries the only truth is runtime: parse to unknown, validate, then trust." },
        { id: "q4", type: "multi", prompt: "Select ALL practices in a professional JS→TS migration.", options: ["type pure data/model functions first, DOM edges after", "allowJs so .ts/.js coexist", "strict: true from the first migrated file", "as any wherever errors appear, clean up later"], answer: [0, 1, 2], explain: "Leaves-first, coexistence via allowJs, strict from day one. 'as any for now' converts a bounded migration into permanent untyped holes — the 'later' never comes." },
        { id: "q5", type: "boolean", prompt: "A user-defined type guard (v is AppState) runs checks at runtime AND narrows the type when true.", options: ["True", "False"], answer: [0], explain: "True — a real boolean-returning function at runtime, whose truth the compiler accepts as proof, narrowing unknown to AppState at the call site." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Declaration file (.d.ts)", "Type-level manual for a library: signatures without code, erased at runtime."],
        ["lib.dom", "The browser API declarations bundled with TypeScript."],
        ["@types/node", "Community declarations for Node's APIs — a Node project's one devDependency."],
        ["Parse → validate → trust", "The boundary pattern: unknown in, runtime checks, typed out."],
        ["Type guard (v is T)", "A runtime check whose truth narrows the type at compile time."],
      ],
    },
    {
      t: "recap",
      items: [
        "The DOM is typed through declaration files — manuals, not libraries.",
        "querySelector<T> and inferred events cover the daily DOM; narrow targets with instanceof.",
        "Casts are promises; at boundaries only parse → validate → trust establishes truth.",
        "Migrations are annotation, leaves-first, strict from file one, tsc --noEmit in CI.",
      ],
    },
    { t: "checkpoint", text: "Explain why const t = JSON.parse(x) as Task[] is forbidden in one sentence, then write isValidState for any two-field schema from memory. That closes the Foundations volume — on to the checkpoint battle." },
    { t: "bridge", text: "That's the entire Foundations volume: the web, JavaScript, your workstation, Git, the accessible page, and enforced types. One gauntlet stands between you and the Builder level.", next: "battle-gauntlet-m1" },
  ],
};

export const m7: Lesson[] = [whyTypes, tsStrictBasics, narrowing, tsDom];
