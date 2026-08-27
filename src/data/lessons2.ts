import type { Lesson } from "../lib/core";

export const m2: Lesson[] = [
  {
    id: "js-values-types",
    title: "Values, Types, and Why typeof null Is 'object'",
    volume: 1, module: 2, order: 1, level: "Foundation", status: "implemented", minutes: 55,
    summary: "JavaScript's eight types, the value-vs-reference split behind 80% of beginner bugs, and equality rules that stop being mysterious once you see the engine's view.",
    prereqs: ["browser-rendering"],
    objectives: [
      "List the seven primitives and explain how objects differ",
      "Predict when assignment shares data vs copies it (value vs reference)",
      "Explain why === exists and when == would lie",
      "Diagnose the 'my function changed my array' bug from reference semantics",
    ],
    concepts: ["primitive", "reference", "dynamic typing", "immutability", "equality", "NaN"],
    blocks: [
      { t: "lead", text: "JavaScript was famously written in ten days in 1995, and it shows — but mostly in ways that are *explainable*. This lesson builds the value-and-type model that makes the language predictable. Every 'weird JS' story you've heard is a consequence of two design decisions you're about to see." },
      { t: "why", text: [
        "Early web pages were static; Netscape needed a tiny scripting language that ran *in the browser* to react to clicks without a network round-trip. That origin explains everything: dynamic typing (fast to write small scripts), loose equality (forgiving in 1995), and a standardization process (ECMAScript) that has steadily fixed the rough edges since.",
        "You're learning the mature language — but you'll meet its teenage self in old code, so we name the scars as we go.",
      ]},
      { t: "simple", text: [
        "A **value** is a piece of data: 7, \"hello\", true. A **type** is which category it belongs to, which decides what you may do with it. JavaScript is **dynamically typed**: *variables* don't have types — *values* do. A variable is just a name that can point at any value and re-point later.",
        "TypeScript (Module 7) will add a safety net over exactly this freedom.",
      ]},
      { t: "model", title: "Labels on coins vs labels on luggage tickets", text: [
        "Eight types. Seven are **primitives**: string, number, bigint, boolean, undefined, null, symbol. The eighth — **object** (arrays and functions included) — behaves completely differently.",
        "A primitive *is* the data: assigning it copies the value. An object value is really an **address** pointing at a bag of data elsewhere: assigning it copies the *address*, not the bag. Two variables, one bag — mutate through either, both see it.",
      ], map: [
        ["A stamped coin you hand over", "A primitive — copied on assignment"],
        ["A luggage claim ticket", "An object variable — a reference, not the luggage"],
        ["Two tickets, one suitcase", "Two variables referencing the same object"],
        ["Melting and re-stamping a coin", "You can't mutate a primitive — you make a new one"],
      ]},
      { t: "code", lang: "js", title: "typeof: the engine's own inventory", code:
"typeof \"hello\"     // \"string\"\ntypeof 42          // \"number\"\ntypeof true        // \"boolean\"\ntypeof undefined   // \"undefined\"\ntypeof null        // \"object\"   ← the famous 1995 bug, frozen in time\ntypeof {}          // \"object\"\ntypeof []          // \"object\"   ← arrays ARE objects\ntypeof function(){} // \"function\" (still an object underneath)",
        notes: ["typeof null === \"object\" is a genuine historical bug: null's internal tag bits matched objects' in the first engine. Fixing it would break billions of pages, so it stays. Check null with === null.", "Arrays are objects → they copy by reference, the source of the bug in the lab below."] },
      { t: "code", lang: "js", title: "Two assignments that mean different things", code:
"// Primitives: assignment COPIES the value\nlet a = 7;\nlet b = a;      // b gets its own 7\nb = 8;\nconsole.log(a); // 7 — untouched\n\n// Objects: assignment COPIES THE ADDRESS\nconst cart1 = [\"coffee\"];\nconst cart2 = cart1;   // same array, second ticket\ncart2.push(\"bagel\");\nconsole.log(cart1);    // [\"coffee\", \"bagel\"] — one bag, two tickets\n\n// A real copy requires intent:\nconst cart3 = [...cart1];              // shallow copy\nconst cart4 = structuredClone(cart1);  // deep copy",
        notes: ["The single most important line in early JavaScript: cart2 = cart1 does not copy the array.", "[...] and structuredClone are the two deliberate ways to copy — shallow vs deep."] },
      { t: "debug", title: "Debugging lab — 'my function changed my array'", scenario: "A helper is supposed to return a sorted copy of a list. The result is sorted — but so is the original, and your UI shows sorted data where the user's input order should be.", error:
"const original = [3, 1, 2];\nconst sorted = sortCopy(original);\nconsole.log(original); // 😱 [1, 2, 3]\n\nfunction sortCopy(list) {\n  return list.sort();   // ← the crime scene\n}",
        tells: "Nothing weird happened: .sort() sorts the array it's called on and returns that *same* array. list is just another ticket to the caller's suitcase. The bug is assuming a parameter is a copy — JavaScript never copies objects for you.",
        flow: [
          "Read the code — sort() is documented to mutate in place.",
          "Identify the layer — reference semantics, not the sort algorithm.",
          "Reproduce minimally; console.log(list === original) prints true.",
          "Hypothesis — the parameter and the argument are the same object.",
          "Change one variable — sort a copy: return [...list].sort().",
          "Verify — original stays [3,1,2]; the return is [1,2,3]; === is false.",
        ], root: "Objects are passed by sharing their reference. Any mutating method (sort, reverse, push, splice) reaches through every ticket to the one bag.", prevent: "Know your mutating methods vs copying ones (map, filter, slice, spread, toSorted). In React this exact distinction decides whether the UI updates at all — Volume III is built on it." },
      { t: "code", lang: "js", title: "Equality: === asks the right question", code:
"1 === 1        // true\n\"1\" === 1      // false — string vs number, no conversion\n\"1\" == 1       // true  — \"1\" is converted to 1 first 😬\nnull == undefined   // true  — a special-case rule\nnull === undefined  // false — different types\n\nNaN === NaN    // false — NaN means 'no number', even to itself\nNumber.isNaN(NaN)   // true — the honest way to ask\n\n[] == false    // true — yes, really. The rulebook strikes again.",
        notes: ["Professional rule: always ===, except null == undefined when you genuinely want 'either empty'.", "NaN !== NaN is the IEEE-754 standard, not a bug. Use Number.isNaN()."] },
      { t: "note", kind: "warning", title: "0.1 + 0.2 is not 0.3", text: ["0.1 + 0.2 === 0.3 is false (0.30000000000000004). Numbers are 64-bit binary floats, and some decimal fractions have no exact binary form — every language with IEEE-754 doubles behaves this way. For money, count cents (integers). Never float-compare currency."] },
      { t: "vocab", terms: [
        ["Primitive", "One of seven copy-on-assign, immutable types."],
        ["Reference", "An address pointing at an object; assignment copies the address."],
        ["Dynamic typing", "Values have types; variables are just re-pointable names."],
        ["Strict equality (===)", "Same type and same value, no conversion."],
        ["NaN", "'Not a number' — never equal to anything, even itself."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "Predict the output:\nconst a=[1,2]; const b=a; b.push(3); console.log(a.length);", code: "const a = [1, 2];\nconst b = a;\nb.push(3);\nconsole.log(a.length);", lang: "js", options: ["2", "3", "undefined", "It throws"], answer: [1], explain: "b = a copied the reference, not the array. push mutated the one shared array, so a.length is 3." },
        { id: "q2", type: "boolean", prompt: "typeof [] evaluates to \"array\".", options: ["True", "False"], answer: [1], explain: "False — arrays are objects, so typeof [] is \"object\". Use Array.isArray()." },
        { id: "q3", type: "single", prompt: "Which expression is true?", options: ["\"5\" === 5", "NaN === NaN", "null == undefined", "0 === false"], answer: [2], explain: "null == undefined is true by special loose-equality rule. The strict versions differ; \"5\"===5 fails on type; NaN is never === to anything." },
        { id: "q4", type: "multi", prompt: "Select ALL expressions that produce a NEW array without mutating arr.", options: ["arr.push(x)", "[...arr, x]", "arr.map(fn)", "arr.sort()", "arr.toSorted()"], answer: [1,2,4], explain: "Spread, map, and toSorted build new arrays. push and sort mutate in place — through every reference." },
      ]},
      { t: "recap", items: [
        "Variables hold values; primitives copy, objects share references.",
        "typeof is reliable except null — check null with === null.",
        "Always ===; treat NaN with Number.isNaN(); never float-compare money.",
        "Mutating array methods reach through every reference to the shared object.",
      ]},
      { t: "checkpoint", text: "Predict all four quiz outputs from memory before re-reading. If two surprised you, redo the debugging lab." },
      { t: "bridge", text: "Values behave predictably now. Next, decisions: conditionals, loops, and the guard-clause style professionals use to keep control flow readable.", next: "js-control-flow" },
    ],
  },

  {
    id: "js-control-flow",
    title: "Flow: Conditionals, Loops, and Guard Clauses",
    volume: 1, module: 2, order: 2, level: "Foundation", status: "implemented", minutes: 45,
    summary: "How JavaScript decides what runs next: truthiness (the complete falsy list), branch shapes, loop forms, and the early-return discipline that keeps functions flat.",
    prereqs: ["js-values-types"],
    objectives: [
      "Recite the complete falsy list and predict truthiness of any value",
      "Choose if/else, ternary, and switch deliberately — including the switch fallthrough trap",
      "Trace a loop's first and last lap to avoid fencepost errors",
      "Rewrite nested validation as guard clauses",
    ],
    concepts: ["truthiness", "guard clause", "loop", "switch", "fencepost"],
    blocks: [
      { t: "lead", text: "Control flow is the part of JavaScript beginners think they already know — right up until if (user) does something they didn't expect. This lesson makes the rules explicit: the exact falsy list, the shapes branches come in, and the loop discipline that prevents the classic off-by-one." },
      { t: "why", text: [
        "Every bug is either data going somewhere it shouldn't, or *control* going somewhere it shouldn't. Truthiness and loop bounds are the two places control silently misbehaves, because JavaScript's rules are looser than most languages'.",
        "Getting these right also shapes readable code: guard clauses and well-bounded loops are the difference between a function you can scan and one you must simulate in your head.",
      ]},
      { t: "simple", text: [
        "JavaScript treats every value as either **truthy** or **falsy** when a condition needs a yes/no. The falsy list is short and complete: false, 0, -0, 0n, \"\", null, undefined, NaN. *Everything else* — including [] and {} and \"0\" — is truthy.",
        "So if (arr) does not mean 'arr has items'; it means 'arr exists'. Emptiness is a length question, not a truthiness one.",
      ]},
      { t: "model", title: "Eight values say no; everything else says yes", text: [
        "The falsy list is exactly eight: false, 0, -0, 0n, \"\" (empty string), null, undefined, NaN. Memorize it as a *complete* set — the power is in knowing \"0\" and [] and {} are NOT on it.",
        "Branches come in shapes for jobs: **if/else** for side-effectful decisions, **ternary** for choosing between two *values*, **switch** for one value against many literals (with break!), and **guard clauses** — early returns that dismiss failure cases first so the happy path stays flat.",
        "Loops: **for** when you need the index, **for...of** when you need each element (and might break), **forEach** when you only want a side effect per item. Each can be wrong for the others' jobs.",
      ], map: [
        ["A bouncer with an eight-name blacklist", "Truthy/falsy — only those eight are turned away"],
        ["Checking IDs at the door, then relaxing", "Guard clauses — handle the bad cases first"],
        ["Counting fence posts, not gaps", "Loop bounds — the off-by-one lives here"],
      ]},
      { t: "code", lang: "js", title: "Truthiness, made explicit", code:
"// The COMPLETE falsy list:\n[false, 0, -0, 0n, \"\", null, undefined, NaN]\n  .every((v) => !v);          // true — every one is falsy\n\n// The surprises (all truthy):\nBoolean(\"0\");      // true — a non-empty string\nBoolean([]);       // true — an object, even empty\nBoolean({});       // true\nBoolean(\" \");      // true — a space is a character\n\n// So check emptiness explicitly, not by truthiness:\nconst arr = [];\nif (arr) { /* runs! arr exists */ }\nif (arr.length) { /* skips — arr is empty */ }",
        notes: ["if (user) means 'user exists'. To ask 'user has a name', write if (user.name) or if (user.name?.trim()).", "0 is falsy — so if (count) silently skips a legitimate zero. Use if (count !== undefined) when zero is valid."] },
      { t: "code", lang: "js", title: "Guard clauses: flatten the pyramid", code:
"// BEFORE — the pyramid of doom:\nfunction ship(order) {\n  if (order) {\n    if (order.paid) {\n      if (order.items.length) {\n        return dispatch(order);   // ← buried three levels deep\n      }\n    }\n  }\n  return null;\n}\n\n// AFTER — guard clauses, happy path flat:\nfunction ship(order) {\n  if (!order) return null;\n  if (!order.paid) return null;\n  if (!order.items.length) return null;\n  return dispatch(order);          // ← every precondition proven above\n}",
        notes: ["Each guard dismisses one failure case, so by the time you reach the real work, all preconditions are proven.", "Guard clauses also localize reasoning: a reader never has to remember three nested conditions at once."] },
      { t: "code", lang: "js", title: "Loop forms and the fencepost", code:
"const arr = [\"a\", \"b\", \"c\"];\n\n// for — you need the index:\nfor (let i = 0; i < arr.length; i++) {  // valid i: 0..length-1\n  console.log(i, arr[i]);\n}\n// FENCEPOST: i <= arr.length reads arr[3] → undefined. Off by one.\n\n// for...of — you need each element, and may break:\nfor (const item of arr) {\n  if (item === \"b\") break;   // allowed here\n}\n\n// forEach — side effect per item; NO break, returns undefined:\narr.forEach((item) => console.log(item));",
        notes: ["Valid indexes are 0..length-1. When a loop misbehaves, check the FIRST and LAST lap — that's where fencepost errors live.", "for...of iterates values and supports break/continue; forEach is a method with no early exit."] },
      { t: "debug", title: "Debugging lab — the silent assignment in a condition", scenario: "A filter is supposed to show only paid orders, but every order shows up. There's no error anywhere.", error:
"const paid = orders.filter((o) => {\n  if (o.status = \"paid\") {   // ← one equals sign\n    return true;\n  }\n  return false;\n});\nconsole.log(paid.length === orders.length); // true — everything passed",
        tells: "= assigns; === compares. o.status = \"paid\" *sets* the field and then evaluates to \"paid\" — a truthy string — so the condition is always true. Worse, it quietly rewrote every order's status as it went.",
        flow: [
          "Read the code slowly — spot = where a comparison belongs.",
          "Identify the layer — an expression bug, and a mutation side effect.",
          "Reproduce: (x = \"paid\") evaluates to \"paid\", which is truthy.",
          "Hypothesis — assignment in condition always passes and mutates data.",
          "Change one variable — use ===.",
          "Verify — only genuinely paid orders pass, and statuses are untouched.",
        ], root: "Assignment returns the assigned value, which is truthy for a non-empty string, so the branch always runs — and corrupts data as a side effect. The most dangerous bugs are the silent ones.", prevent: "A linter rule (no-cond-assign) makes this a hard error; and prefer === habitually so a single = stands out in review." },
      { t: "mistake", title: "Using == where === belongs", wrong: "if (input == 0) { … } — \"0\", 0, false, and [] can all pass depending on coercion.", right: "if (input === 0) { … } — same type and same value, no conversion surprises.", explain: "Loose == runs a coercion rulebook so baroque its author recommends never using it. === makes the comparison mean exactly what it says." },
      { t: "vocab", terms: [
        ["Truthy/falsy", "How any value is coerced in a condition; only eight values are falsy."],
        ["Guard clause", "An early return dismissing a failure case, keeping the happy path flat."],
        ["Fencepost error", "An off-by-one in loop bounds (0..length-1, not 0..length)."],
        ["for...of", "Value iteration supporting break/continue."],
        ["forEach", "A side-effect-per-item method with no early exit."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "multi", prompt: "Select ALL falsy values.", options: ["0", "\"0\"", "[]", "NaN", "undefined", "\" \""], answer: [0,3,4], explain: "0, NaN, and undefined are falsy. \"0\", [], and \" \" are all truthy — a non-empty string and any object pass." },
        { id: "q2", type: "single", prompt: "What does if ([]) evaluate to?", options: ["It skips the branch", "It runs the branch", "It throws", "It depends on the engine"], answer: [1], explain: "[] is an object, and every object is truthy — even an empty one. Check emptiness with arr.length, not truthiness." },
        { id: "q3", type: "single", prompt: "A valid index for an array of length n ranges over…", options: ["0 to n", "0 to n-1", "1 to n", "1 to n-1"], answer: [1], explain: "Indexes are 0-based and exclusive of length: 0..n-1. Using i <= length reads one past the end — the fencepost error." },
        { id: "q4", type: "single", prompt: "if (o.status = \"paid\") inside a filter causes…", options: ["A syntax error", "Only paid orders to pass", "Every order to pass, and every status to be overwritten", "Nothing"], answer: [2], explain: "A single = assigns, returns \"paid\" (truthy), so the branch always runs — and mutates each order's status as a side effect. A silent data-corruption bug." },
      ]},
      { t: "recap", items: [
        "The falsy list is exactly eight; \"0\", [], and {} are truthy.",
        "Check emptiness with length/keys, not truthiness; treat 0 carefully.",
        "Guard clauses flatten pyramids and prove preconditions.",
        "Loop bounds are 0..length-1; check first and last lap.",
        "=== always; a stray = in a condition is silent corruption.",
      ]},
      { t: "checkpoint", text: "Refactor any three-level nested if you can find (or the ship example) into guard clauses, and recite the falsy list without looking." },
      { t: "bridge", text: "You can steer control now. Next: functions, scope, and closures — the backpack model that explains the 3,3,3 loop mystery and underpins every callback you'll ever write.", next: "js-functions-scope" },
    ],
  },

  {
    id: "js-functions-scope",
    title: "Functions, Scope, and Closures",
    volume: 1, module: 2, order: 3, level: "Foundation", status: "implemented", minutes: 60,
    summary: "What scope is for, how the scope chain resolves names, why closures capture variables not values — and the full explanation of the 3,3,3 loop bug.",
    prereqs: ["js-control-flow"],
    objectives: [
      "Explain what problem scope solves and trace the scope chain for any snippet",
      "Distinguish declarations, expressions, and arrows — including hoisting and the TDZ",
      "Define closure precisely: a function plus the bindings it was born with",
      "Explain why the var loop prints 3,3,3 and let prints 0,1,2",
    ],
    concepts: ["scope", "closure", "hoisting", "TDZ", "scope chain"],
    blocks: [
      { t: "lead", text: "The most important idea in browser JavaScript is the **closure** — every event handler, callback, and timer you'll ever write is one. This lesson builds it from the ground up: scope, the scope chain, and the backpack model that turns 'closures are confusing' into 'closures are obvious'." },
      { t: "why", text: [
        "Functions create units of abstraction: name a behavior once, change it in one place. **Scope** is the visibility rulebook that makes large programs comprehensible — each stretch of code sees exactly the names it should, so collisions become impossible by construction.",
        "**Closures** exist because browsers are event-driven: 'when clicked, do X' must run *later*, long after setup finished. A closure lets a function carry its setup into the future. No closures, no event handlers — as simple as that.",
      ]},
      { t: "simple", text: [
        "A **function** is a recipe: ingredients in (parameters), work in a private kitchen, a dish out (return). Each cooking is a **fresh kitchen** — new ingredients every call.",
        "**Scope** is who can see what: a line of code can use variables from its own kitchen and every kitchen it's nested inside — nothing else.",
        "A **closure** is the surprise: when a recipe leaves its kitchen, it takes a **backpack** of the variables it used. Wherever it runs later, the backpack comes along.",
      ]},
      { t: "model", title: "Fresh kitchens + a birth backpack", text: [
        "Three rules dissolve the mystery. **(1) Every call creates a fresh frame** — call twice, get two independent sets of locals. **(2) Name lookup walks the scope chain** — current frame, then each enclosing frame, up to global; first hit wins. **(3) Functions remember where they were born** — each carries a hidden reference to its birth scope. Called later from anywhere, the chain starts there. That carried reference IS the closure.",
      ], map: [
        ["A recipe card", "Function declaration — reusable instructions"],
        ["A fresh kitchen per order", "A call frame — new params and locals each call"],
        ["Your shelf, then the pantry, then the store", "Scope-chain lookup, inner to outer"],
        ["A backpack packed at birth", "The closure — the birth-scope reference"],
      ]},
      { t: "code", lang: "js", title: "Three ways to define a function", code:
"// 1) Declaration — hoisted COMPLETELY, usable before its line\nconsole.log(greet(\"ada\"));      // works\nfunction greet(name) { return `hello, ${name}`; }\n\n// 2) Expression — a function in a variable; NOT hoisted as callable\nconst double = function (n) { return n * 2; };\n\n// 3) Arrow — concise; single expression = IMPLICIT return\nconst triple = (n) => n * 3;\nconst square = (n) => {         // braces = a BLOCK, you must return\n  return n * n;\n};\n\n// The arrow footgun: braces + no return = undefined\nconst bad = (n) => { n * 2 };   // returns undefined!",
        notes: ["let/const exist from frame start but sit in the Temporal Dead Zone until their line — reading early throws, which catches real bugs.", "To return an object literal directly from an arrow, wrap it: (n) => ({ value: n }) — bare braces read as a block."] },
      { t: "code", lang: "js", title: "A closure, made visible", code:
"function makeCounter() {\n  let count = 0;              // born in makeCounter's frame\n  return function () {\n    count = count + 1;        // reaches into its BIRTH frame\n    return count;\n  };\n}\n\nconst a = makeCounter();\nconst b = makeCounter();\na(); // 1  — a's backpack has its OWN count\na(); // 2\nb(); // 1  — a completely fresh kitchen + backpack\n\n// makeCounter has RETURNED — its frame should be gone.\n// It isn't: the returned function still references count,\n// so the engine keeps that frame alive. THAT is the closure.",
        notes: ["Closures capture VARIABLES, not values: if the captured variable changes later, the closure sees today's value.", "This is why once()/memoize() work: private state lives in the backpack, unreachable from outside."] },
      { t: "debug", title: "Debugging lab — the 3,3,3 mystery, solved", scenario: "A tutorial schedules three delayed logs in a loop. Expected 0 1 2; it prints 3 3 3. Swapping var for let fixes it — now prove you know why.", error:
"for (var i = 0; i < 3; i++) {\n  setTimeout(function () { console.log(i); }, 10);\n}\n// Prints: 3 3 3\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}\n// Prints: 0 1 2",
        tells: "Three ingredients combine: (1) setTimeout DELAYS the callback until after the loop finishes; (2) var is function-scoped, so there's ONE binding of i for the whole loop; (3) closures capture live variables, not snapshots. By the time any callback runs, the loop is done and i is 3 — all three read the same binding.",
        flow: [
          "Note WHEN callbacks run (after ~10ms) vs WHEN the loop runs (immediately, to completion).",
          "Identify the layer — scope, not timers: how many bindings of i exist?",
          "Verify: console.log(i) right after the var loop prints 3, before any timeout fires.",
          "Hypothesis — all three closures share one binding, read after mutation.",
          "Change one variable — var → let; the spec gives let-in-for a fresh binding per iteration.",
          "Verify — 0 1 2. Each backpack now points at its own lap's binding.",
        ], root: "One shared var binding + delayed reads + live-variable capture. let fixes it because per-iteration bindings give each closure a private variable.", prevent: "Never use var in modern code (a linter can enforce no-var). This shape recurs in event handlers, React lists, and retry loops — anywhere a function is stored now and run later." },
      { t: "note", kind: "performance", title: "Backpacks hold references — memory follows", text: ["A closure keeps its whole birth frame alive, including variables it never touches. A timer or listener registered once and never removed pins that backpack for the app's life — the classic long-running-page leak. Cleanup (clearTimeout, removeEventListener) is really closure hygiene; you'll feel this in React effects (Volume III)."] },
      { t: "vocab", terms: [
        ["Scope", "The visibility rulebook: which names a line of code can reference."],
        ["Scope chain", "Lookup order: current frame → enclosing frames → global."],
        ["Closure", "A function plus its birth-scope bindings, carried wherever it runs."],
        ["Hoisting", "Declarations registered before execution; let/const behind the TDZ."],
        ["TDZ", "Frame start until a let/const initializer — reading there throws."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "Predict:\nfunction makeCounter(){let c=0;return ()=>++c;}\nconst x=makeCounter(), y=makeCounter();\nconsole.log(x(),x(),y());", code: "function makeCounter() { let c = 0; return () => ++c; }\nconst x = makeCounter(), y = makeCounter();\nconsole.log(x(), x(), y());", lang: "js", options: ["1 2 1", "1 2 3", "1 1 1", "2 2 1"], answer: [0], explain: "Each call to makeCounter creates a fresh frame, so x and y close over different c. x increments its own twice (1,2); y's is untouched until its call (1)." },
        { id: "q2", type: "single", prompt: "Why does the var loop print 3 3 3?", options: ["setTimeout receives the final value", "var is function-scoped: one shared binding, and closures read it after the loop", "Engines cache loop variables", "console.log batches output"], answer: [1], explain: "One binding (var) + callbacks running after the loop + live-variable capture. All three read i's current value — 3." },
        { id: "q3", type: "boolean", prompt: "A closure copies the values of its outer variables when it's created.", options: ["True", "False"], answer: [1], explain: "False — closures capture the variables (live bindings), not snapshots. If the variable changes later, the closure sees the new value." },
        { id: "q4", type: "single", prompt: "In once(fn), where do called and result live between calls?", options: ["On the global object", "In the frame created when once() ran, kept alive by the returned closure", "Re-created every call", "Inside fn's scope"], answer: [1], explain: "The wrapper's backpack IS once()'s frame; GC can't reclaim it while the wrapper exists. That's the closure's privacy and its memory footprint." },
      ]},
      { t: "recap", items: [
        "Every call gets a fresh frame; lookup walks inner→outer.",
        "Closures capture live variables — 3,3,3 is one shared var binding read too late.",
        "Declarations hoist; let/const sit in the TDZ until initialized.",
        "Arrow braces mean 'block — write return yourself'.",
        "once()/memoize() = private state living in a backpack.",
      ]},
      { t: "checkpoint", text: "Explain 3,3,3 out loud in three sentences: binding count, when callbacks run, what closures capture." },
      { t: "bridge", text: "You now understand behavior and scope. The next volume deepens the language — modules, errors, and tooling — but first a checkpoint battle to prove the Foundations hold. Or continue to the boss battle for this module.", next: "battle-gauntlet-m1" },
    ],
  },
];
