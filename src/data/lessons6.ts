import type { Lesson } from "../lib/core";

/* ================= MODULE 6 — CSS & RESPONSIVE DESIGN ================= */

const cssMentalModel: Lesson = {
  id: "css-mental-model",
  title: "The Cascade Is a Rulebook, Not a Battle",
  volume: 1,
  module: 6,
  order: 1,
  level: "Foundation",
  status: "implemented",
  minutes: 50,
  summary:
    "CSS feels like a fight only until you meet the referee: three tiebreakers resolve every conflict deterministically. Specificity is a tuple you compare left-to-right, the box model explains every width that 'doesn't add up', and @layer lets you stop shouting with !important.",
  prereqs: ["aria-when-needed"],
  objectives: [
    "State the cascade's resolution order: origin & importance → specificity → source order",
    "Compute specificity as a tuple and predict which of two rules wins",
    "Explain content-box vs border-box and why widths stop adding up without it",
    "Resolve a losing rule by changing its rank, not by adding !important",
    "Use @layer to control whole sections instead of individual declarations",
  ],
  concepts: ["cascade", "specificity", "box model", "inheritance", "@layer"],
  blocks: [
    {
      t: "lead",
      text: "Developers describe CSS as 'unpredictable' and 'a fight'. It is neither. CSS is one of the most precisely specified languages you will ever use — every conflict has exactly one deterministic winner, and you can compute it before you open DevTools. The frustration comes from trying to *guess* the outcome instead of *reading the rulebook*. This lesson hands you the rulebook.",
    },
    {
      t: "why",
      text: [
        "Why is it called the *cascade*? Styles arrive from multiple origins — browser defaults, your stylesheets, inline attributes — and they layer, with defined priority. When two rules disagree about the same property on the same element, a referee applies three tiebreakers in order. That flow of layered, prioritized styles is the cascade.",
        "Learning the referee matters because CSS only scales when conflicts are *computable*. On a 50,000-line codebase, 'I hope my rule wins' is not a strategy. Specificity-as-arithmetic is what lets teams reason about overrides without nuclear options.",
      ],
    },
    {
      t: "simple",
      text: [
        "Think of the cascade as a **courtroom**. Every rule targeting an element gets to speak. When two disagree, the judge applies tiebreakers in order: (1) *Where does the rule come from, and is it flagged important?* (2) *How specifically does it point at the element?* (3) *If still tied, the later rule wins.* That's the entire cascade — three questions, in order.",
        "Almost every 'CSS is broken' story is tiebreaker #2 — specificity — done by vibes instead of arithmetic. Today it becomes arithmetic.",
      ],
    },
    {
      t: "model",
      title: "A tuple you compare like a version number",
      text: [
        "Specificity is a four-slot tuple: (inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). You compare it **left to right**, like a version number: 1.0.0 beats 0.9.9 forever, because you never move to the next column until the current one ties. So one ID outranks any number of classes — not because IDs are 'worth 100 points', but because the ID column is more significant.",
        "The old 'points' folklore (ID=100, class=10, element=1) gives the right answer *most* of the time and the wrong one exactly when it matters (11 classes would 'beat' 1 ID in points — they don't). The tuple model is the real algorithm.",
      ],
      map: [
        ["A version number: 1.0.0 > 0.9.9", "Compare specificity columns left to right; a higher column always wins"],
        ["The judge's three questions, in order", "Origin/importance → specificity → source order"],
        ["Calling in a lawyer mid-argument", "!important — it wins, but everyone stops trusting the process"],
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "The tuple, worked by hand",
      code: "/* (0,0,0,1) — one element */\np { color: gray; }\n\n/* (0,0,1,1) — one class + one element */\np.intro { color: blue; }\n\n/* (0,0,2,0) — two classes */\n.card .title { color: green; }\n\n/* (0,1,0,1) — one ID + one element: beats ALL of the above,\n   because the ID column is more significant */\n#main p { color: black; }\n\n/* (1,0,0,0) — inline style attribute beats every selector.\n   And !important beats even that — which is exactly why\n   teams forbid it in code review. */",
      notes: [
        ":where(...) is the spec's official 'opt out' — it contributes (0,0,0,0). :not(...) doesn't count itself, but its argument does.",
        "Classes here include .class, [attribute], and :pseudo-classes like :hover. Elements include tag names and ::pseudo-elements.",
      ],
    },
    {
      t: "h2",
      id: "box-model",
      text: "The box model — why your widths don't add up",
    },
    {
      t: "code",
      lang: "css",
      title: "Two ways to measure a box",
      code: "/* content-box (the 1998 default): width = content ONLY.\n   padding + border ADD ON TOP. */\n.old {\n  box-sizing: content-box;\n  width: 300px; padding: 20px; border: 2px solid black;\n} /* occupies 300 + 40 + 4 = 344px 😬 */\n\n/* border-box (what every modern codebase sets):\n   width = content + padding + border. Done. */\n.new {\n  box-sizing: border-box;\n  width: 300px; padding: 20px; border: 2px solid black;\n} /* occupies exactly 300px */\n\n/* The two lines atop every modern reset: */\n*, *::before, *::after { box-sizing: border-box; margin: 0; }",
      notes: [
        "With border-box, width means what your eyes expect. Set it once globally and never think about it again — every framework reset does this for you.",
        "Margins never add to a box's own size, but adjacent vertical margins COLLAPSE (the larger wins) — a 1998 behavior you'll still meet in layouts.",
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'my utility class does nothing'",
      scenario: "You add a utility class to recolor one button. Nothing changes. No error — the style simply doesn't apply, and DevTools shows your declaration struck through with another rule above it.",
      error: "<button id=\"submit\" class=\"btn text-danger\">Delete</button>\n\n/* styles.css */\n#submit { color: black; }    /* (0,1,0,0) */\n\n/* utilities.css */\n.text-danger { color: red; } /* (0,0,1,0) — STRUCK THROUGH in DevTools */",
      tells: "The struck-through rule in the Styles panel is the whole diagnosis: a higher-ranked rule exists and DevTools shows it right above. Compare tuples — the ID selector (0,1,0,0) outranks the class (0,0,1,0) no matter which file loads later. Tiebreaker #2 decided before source order ever got a vote.",
      flow: [
        "Open DevTools Styles, find the struck-through declaration and the rule above it.",
        "Identify the layer — this is specificity (tiebreaker 2), not caching or syntax.",
        "Compute both tuples: (0,1,0,0) vs (0,0,1,0). The ID column wins.",
        "Fix at the rank, not the volume: style via class instead of #id, or raise the utility honestly (.btn.text-danger).",
        "Verify the red applies — with no !important anywhere in the diff.",
      ],
      root: "Styling by #id gives that one rule a permanently high rank that class-based systems can never overcome. The fix is architectural: stop selecting by ID for styling; keep specificity low and flat so overrides stay predictable.",
      prevent: "Team rule: IDs are for JavaScript hooks and fragment links, never styling. Keep selectors 1–2 classes deep. When a framework fights you, reach for @layer, not !important.",
    },
    {
      t: "mistake",
      title: "Fighting specificity with !important",
      wrong: "color: red !important; — then someone must override THAT, so they add !important later, then…",
      right: "Fix the rank: lower the loser's specificity (drop IDs, prefer classes), or put utilities in a later @layer.",
      explain: "Each !important moves the conflict from 'computable' to 'whoever shouts last'. Code review exists to reject the first one, because the tenth is un-reviewable.",
    },
    {
      t: "outdated",
      lang: "css",
      label: "Old codebases: floats, clearfix, and 'points' specificity",
      oldCode: "/* Pre-2015 layout: float elements into columns,\n   then 'clear' the collapse damage */\n.col { float: left; width: 33%; }\n.clearfix::after { content: \"\"; display: table; clear: both; }\n\n/* and the specificity folklore:\n   'IDs = 100 points, classes = 10, elements = 1'\n   — mostly right, wrong exactly when it matters */",
      now: "Flexbox/Grid layout + tuple specificity + :where() + @layer",
      nowCode: ".cols { display: grid; grid-template-columns: repeat(3, 1fr); }\n/* no floats, no clearfix — the next lesson teaches this */\n\n:where(.btn) { padding: 0; }  /* specificity (0,0,0,0): easy to override */",
      why: "Floats were a text-flow feature pressed into layout duty, with side effects (collapse) requiring the clearfix ritual; Grid replaced the whole pattern with one declaration. The 'points' folklore survives in old blog posts; the tuple model and :where() are what current docs teach. Read the old patterns — you'll inherit them — but write the new ones.",
    },
    {
      t: "note",
      kind: "info",
      title: "Inheritance: the properties that flow down",
      text: [
        "Some properties — color, font-*, line-height, text-align — are inherited by descendants automatically; most layout properties (width, margin, border, display) are not. Inheritance is why setting font on <body> styles the whole page. When text somewhere 'won't change', check whether the property even inherits — and remember the keywords inherit, initial, and revert for forcing the issue.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Predict, then verify: which wins — nav ul li a.active or .sidebar .nav a? Write both tuples on paper before checking.",
        "Reproduce the debugging lab in a scratch HTML file. Fix it three ways: drop the ID, raise the class specificity honestly, and with @layer. Note which you'd defend in review.",
        "Remove box-sizing: border-box from a page you've built and find one layout that breaks; explain the broken width arithmetic out loud.",
        "Stretch: style a whole component using only selectors of specificity (0,0,1,0) or lower. Feel how flat and predictable the cascade becomes.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "Which wins for the same property on the same element?", code: "#nav a { color: blue; }\n.menu .item a { color: green; }\na:hover { color: red; }", lang: "css", options: ["#nav a — an ID outranks any number of classes", ".menu .item a — three classes beat one ID", "a:hover — pseudo-classes rank highest", "Whichever appears last in the file"], answer: [0], explain: "#nav a is (0,1,0,1); .menu .item a is (0,0,3,1); a:hover is (0,0,1,1). The ID column decides immediately; source order never gets a vote." },
        { id: "q2", type: "single", prompt: "Specificity of article.card p.intro::first-line?", options: ["(0,0,2,2)", "(0,0,3,1)", "(0,1,2,1)", "(0,0,2,3)"], answer: [0], explain: "Classes: .card, .intro = 2. Elements: article, p, plus ::first-line (pseudo-elements count as elements) = 2. → (0,0,2,2)." },
        { id: "q3", type: "single", prompt: "content-box, width:200px, padding:10px, border:5px — rendered width?", options: ["200px", "215px", "220px", "230px"], answer: [3], explain: "content-box counts content only: 200 + 2×10 + 2×5 = 230px. This is why modern resets set border-box globally." },
        { id: "q4", type: "multi", prompt: "Select ALL professional fixes for a utility losing to an ID rule.", options: ["Stop styling via #id; select by class", "Put the ID rule in an early @layer, utilities in a later one", "Add !important to the utility", "Duplicate the selector (.x.x) to raise rank"], answer: [0, 1], explain: "Removing ID styling fixes the architecture; @layer controls whole sections. !important starts an arms race and duplication obscures intent — both get rejected in review." },
        { id: "q5", type: "boolean", prompt: ":where(.btn) and .btn match the same elements, but :where() contributes zero specificity.", options: ["True", "False"], answer: [0], explain: "True — that's its reason to exist: match with (0,0,0,0) so anything can override it. The modern tool for low-stakes defaults." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Cascade", "Layered styles from multiple origins, resolved by origin/importance → specificity → source order."],
        ["Specificity tuple", "(inline, IDs, classes, elements) compared left to right; a higher column always wins."],
        ["Box model", "content + padding + border + margin; border-box counts the first three in width."],
        ["@layer", "Explicit cascade layers: later-declared layers win regardless of specificity."],
        ["Inheritance", "Text-ish properties flow to descendants automatically; layout properties don't."],
      ],
    },
    {
      t: "recap",
      items: [
        "The cascade resolves every conflict with three tiebreakers, in order — nothing is arbitrary.",
        "Specificity is a tuple compared left to right; one ID beats a thousand classes.",
        "IDs are for hooks, not styling; keep selectors shallow; @layer before !important.",
        "border-box makes width mean what it looks like; set it globally.",
        "The struck-through rule in DevTools Styles is the diagnosis, not the mystery.",
      ],
    },
    { t: "checkpoint", text: "Rank these weakest→strongest with tuples: #app .card p, .card .card p, article p.intro. Then verify. All three right? Mark complete." },
    { t: "bridge", text: "With the referee understood, the next question is how boxes get arranged. The 1998 answer — floats — needed rituals; the modern answer is two layout systems with one decision between them.", next: "layout-flex-grid" },
  ],
};

const layoutFlexGrid: Lesson = {
  id: "layout-flex-grid",
  title: "Two Layout Systems, One Decision",
  volume: 1,
  module: 6,
  order: 2,
  level: "Foundation",
  status: "implemented",
  minutes: 60,
  summary:
    "Flexbox distributes content along one axis (content-out); grid places content into two dimensions you decide first (layout-in). Learn each system's axis model, the centering answers that ended a decade of hacks, and the min-width:0 bug that haunts every flex beginner exactly once.",
  prereqs: ["css-mental-model"],
  objectives: [
    "Choose flex vs grid from the shape of the problem, not habit",
    "Name the main/cross axis and predict justify-content vs align-items",
    "Read and write grid templates: tracks, fr, minmax, auto-fit",
    "Center things the modern way and explain why the old hacks existed",
    "Diagnose the flex item that refuses to shrink (min-width:auto)",
  ],
  concepts: ["flexbox", "grid", "main axis", "fr unit", "auto-fit"],
  blocks: [
    {
      t: "lead",
      text: "Between 1998 and 2015, developers laid out websites with float — a feature designed for wrapping text around images — plus a trail of hacks. Then browsers shipped two purpose-built layout systems within a few years: flexbox and grid. This lesson teaches both, plus the single question that chooses between them: *is this problem about one axis or two?*",
    },
    {
      t: "why",
      text: [
        "Layout has two fundamentally different problems. Sometimes you have *content of unknown size* and want to distribute it along one direction — a toolbar, a tag list, a navbar. That's flexbox: one-dimensional, content-out; the items' sizes influence the outcome. Sometimes you have a *structure in mind* — a page shell, a photo wall, a form — and want content to fill pre-decided regions. That's grid: two-dimensional, layout-in; the plan rules.",
        "Professional layouts combine both constantly: grid for the page skeleton, flex inside each region. The decision is never 'which is better' — it's 'which axis is this problem about'.",
      ],
    },
    {
      t: "simple",
      text: [
        "**Flexbox is a shelf.** Items sit on one line (or wrap to more shelves); you decide how they spread along the shelf (justify) and how they align across its depth (align). The items negotiate their sizes.",
        "**Grid is a city plan.** You draw the streets first — rows and columns with sizes — then assign buildings to plots. The plan exists whether or not anything is built on it yet.",
      ],
    },
    {
      t: "model",
      title: "Content-out vs layout-in",
      text: [
        "**Flexbox (content-out):** the container asks each item how big it wants to be, then distributes leftover space (or squeezes) along the **main axis**. justify-content acts on the main axis; align-items acts on the cross axis. If you can't name the axis a property acts on, you don't understand the property yet — and flex-direction defines which is which.",
        "**Grid (layout-in):** the container defines tracks — grid-template-columns: 240px 1fr 2fr — and items are placed into cells. The fr unit splits *leftover* space by ratio, which is what makes 'sidebar + fluid content' a one-liner.",
      ],
      map: [
        ["Books on a shelf", "Flex items negotiating along one axis"],
        ["A city plan with plots", "Grid tracks: structure first, content second"],
        ["Leftover pizza split by ratio", "fr units dividing remaining track space"],
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "Flexbox: the vocabulary, annotated",
      code: ".toolbar {\n  display: flex;              /* children become flex items */\n  gap: 12px;                  /* real space BETWEEN items — no margin hacks */\n  justify-content: space-between; /* main axis: spread to edges */\n  align-items: center;        /* cross axis: vertically centered */\n}\n\n.item {\n  flex: 1 1 0;    /* grow | shrink | basis — 'take an equal share' */\n  flex: 0 0 auto; /* 'never grow, never shrink, use my size' */\n}\n\n.tags { display: flex; flex-wrap: wrap; gap: 8px; }",
      notes: [
        "gap is the modern spacing tool for flex AND grid — it applies only between items, never on the outside, which margins get wrong.",
        "flex: 1 1 0 gives equal columns; flex: 1 1 auto gives equal GROWTH from unequal starts. The basis (third value) is where most 'uneven columns' confusion lives.",
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "Grid: draw the plan, then fill it",
      code: "/* 1) The classic app shell — structure first */\n.shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;   /* fixed sidebar + fluid rest */\n  grid-template-rows: 56px 1fr auto;\n  min-height: 100vh;\n}\n\n/* 2) Responsive card walls WITHOUT media queries:\n   'as many 240px-ish columns as fit, sharing leftover' */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}\n\n/* 3) The centering one-liner */\n.hero { display: grid; place-items: center; }",
      notes: [
        "auto-fit vs auto-fill: both create as many tracks as fit; auto-fit COLLAPSES empty tracks so items stretch to fill the row. For card walls you almost always want auto-fit.",
        "minmax(240px, 1fr) is the workhorse: 'never below 240, share all leftover'. Responsive layout in one value.",
      ],
    },
    {
      t: "mistake",
      title: "Centering with position hacks",
      wrong: "position:absolute; top:50%; left:50%; transform: translate(-50%,-50%);",
      right: "display:grid; place-items:center; (or flex + margin:auto on the child). Two properties, no coordinates.",
      explain: "The old recipe existed because no layout system could center both axes; it also yanks the element out of flow and clips overflow. If you see translate(-50%,-50%) in a codebase, it's a 2014 artifact worth modernizing.",
    },
    {
      t: "debug",
      title: "Debugging lab — 'the flex item that won't shrink'",
      scenario: "A sidebar + main layout. The main area holds a long unbreakable string (a URL, a code token). Instead of main shrinking and the string wrapping internally, the WHOLE layout explodes horizontally — the page grows a scrollbar.",
      error: ".shell { display: flex; }\n.sidebar { flex: 0 0 260px; }\n.main { flex: 1 1 0; }  /* 'I take leftover space…' */\n\n/* …but with a long URL inside .main, the page gets a\n   horizontal scrollbar instead. main refuses to go below\n   the URL's natural width. */",
      tells: "Measure .main in DevTools: it's exactly the URL's unbreakable width, not leftover space. Flex items default to min-width:auto — 'never smaller than my content'. Grid items don't have this default, which is why the same layout 'fixes itself' when switched to grid.",
      flow: [
        "Confirm the overflowed element's computed width equals its longest unbreakable content.",
        "Identify the layer — flex sizing rules, not your flex values (they're correct).",
        "Reproduce with any flex child holding a <pre>, a URL, or an <input>.",
        "Change one variable: .main { min-width: 0; } (plus overflow-wrap:anywhere for the text).",
        "Verify — the shell now honors 260px + fluid, and the URL wraps inside main.",
      ],
      root: "Flex items default to min-width:auto (minimum content size), so flex:1 means 'grow into leftover, but never below my content'. min-width:0 opts out and restores pure leftover-space behavior.",
      prevent: "Add min-width:0 to any flex child hosting arbitrary user text or code. This one rule prevents a whole family of 'my flexbox overflowed' tickets — and it's asked about in interviews precisely because everyone hits it once.",
    },
    {
      t: "note",
      kind: "a11y",
      title: "Visual order ≠ tab order — layout can lie",
      text: [
        "Flex's order property and grid placement can rearrange content VISUALLY without touching the DOM — and screen readers and Tab navigation follow the DOM, not your eyes. The rule: DOM order must stay a sensible reading order. Use these tools for genuine 2-D repositioning (image left/right at breakpoints), never to fake a different content sequence. Your accessibility checklist tests exactly this.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Build the app shell: header/sidebar/main/footer with grid-template-areas. Resize the window — the sidebar stays 240px while main absorbs everything.",
        "Reproduce the min-width:0 bug: a flex shell with a <pre> of a very long line in main. Confirm the scrollbar, apply the fix, confirm it vanishes.",
        "Make a card wall with repeat(auto-fit, minmax(240px, 1fr)). Add 2 cards, then 12 — no media queries, watch it adapt.",
        "Stretch: recreate a real site's homepage skeleton in grid areas in under 15 minutes, using only areas and fr units plus one fixed sidebar.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "A row of tags with unknown count that wraps and stays evenly spaced — which system?", options: ["Flexbox — one-dimensional, content decides", "Grid — wrapping needs rows and columns", "Grid with auto-fit, always", "Floats with clearfix"], answer: [0], explain: "Content of unknown size distributing along one direction is flexbox's definition. Grid shines when the STRUCTURE is decided ahead." },
        { id: "q2", type: "single", prompt: "With flex-direction: column, justify-content moves items…", options: ["horizontally", "vertically", "along both axes", "not at all"], answer: [1], explain: "justify-content always acts on the MAIN axis, and flex-direction defines it. column makes the main axis vertical." },
        { id: "q3", type: "single", prompt: "grid-template-columns: 200px 1fr 2fr, 1400px available. Middle column?", options: ["400px", "466px", "600px", "800px"], answer: [0], explain: "Leftover after the fixed track: 1400−200=1200. The fr units split it 1:2 → 400 and 800. fr divides leftover, never the total." },
        { id: "q4", type: "single", prompt: "A flex child with a long URL won't shrink. The fix?", options: ["flex-shrink: 1", "min-width: 0", "remove gap", "nothing can fix it"], answer: [1], explain: "Flex items default to min-width:auto — never smaller than content. min-width:0 restores pure leftover-space sizing; pair with overflow-wrap:anywhere." },
        { id: "q5", type: "boolean", prompt: "repeat(auto-fit, minmax(240px,1fr)) makes a card wall responsive with zero media queries.", options: ["True", "False"], answer: [0], explain: "True — the browser fits as many ≥240px tracks as allowed and stretches them with 1fr; auto-fit collapses empties so few cards widen. Content-driven responsiveness." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Main axis", "The direction flex distributes along — set by flex-direction."],
        ["Cross axis", "The perpendicular direction — where align-items acts."],
        ["fr unit", "A share of leftover grid track space; 1fr 2fr splits remainder 1:2."],
        ["minmax()", "Track bounds: never below X, may grow to Y — the responsive grid workhorse."],
        ["auto-fit", "As many tracks as fit; empty ones collapse so content stretches."],
      ],
    },
    {
      t: "recap",
      items: [
        "One axis, content decides → flexbox. Two dimensions, structure decides → grid. Real UIs use both.",
        "justify = main axis, align = cross axis; flex-direction rotates both.",
        "fr divides leftover space; minmax + auto-fit builds responsive walls without media queries.",
        "Centering is place-items:center or flex + margin:auto — position hacks are 2014 artifacts.",
        "min-width:0 on flex children hosting arbitrary content prevents the classic overflow.",
      ],
    },
    { t: "checkpoint", text: "Explain the min-width:0 bug in one sentence containing 'minimum content size'. Then center a box both ways from memory. Clean on both? Mark complete." },
    { t: "bridge", text: "Layout now works at any viewport size — but real products face thousands of devices, and hard-coded pixels crumble. The final CSS lesson goes responsive on purpose: fluid units, container queries, and the design-token contract that powers this platform's theming.", next: "responsive-and-tokens" },
  ],
};

const responsiveAndTokens: Lesson = {
  id: "responsive-and-tokens",
  title: "Responsive Is a Mindset, Tokens Are the Contract",
  volume: 1,
  module: 6,
  order: 3,
  level: "Foundation",
  status: "implemented",
  minutes: 55,
  summary:
    "Mobile-first constraints, fluid type with clamp(), container queries for component-level responsiveness, and design tokens as the single source of truth — the same custom-property system that lets this platform flip light/dark by remapping a handful of variables.",
  prereqs: ["layout-flex-grid"],
  objectives: [
    "Apply mobile-first thinking: base styles for small screens, min-width queries to enhance",
    "Use rem/em/vw deliberately and build fluid typography with clamp()",
    "Choose container queries when the component, not the viewport, decides",
    "Define semantic tokens with custom properties and refactor hard-coded styles to them",
    "Explain how one token set yields light/dark themes",
  ],
  concepts: ["mobile-first", "clamp", "container queries", "design tokens", "theming"],
  blocks: [
    {
      t: "lead",
      text: "A site that 'works on mobile' and a site that's *responsive* differ by one habit: whether the small screen was the starting constraint or an afterthought patched on. This lesson builds that habit, then introduces the discipline that keeps large codebases visually coherent — design tokens — using the exact system running under the page you're reading right now.",
    },
    {
      t: "why",
      text: [
        "**Why mobile-first?** Small screens force decisions: what actually matters, what can collapse, what must stay. Start there and *add* capacity with min-width queries as space appears. Start desktop-first and you spend the project *removing* things with max-width queries — subtractive design, which is how bloated mobile experiences are born.",
        "**Why tokens?** At some size, 'that green we use' becomes 47 slightly different greens across 200 files, and dark mode becomes a rewrite. Tokens name design decisions ONCE (--color-accent, --space-4) and reference the names everywhere. Theme switching, rebrands, and consistency audits all become one-file edits.",
      ],
    },
    {
      t: "simple",
      text: [
        "**Responsive:** design the phone version first, then say 'when there's MORE room than this, also do that.' The layout *grows into* space instead of being squeezed out of it.",
        "**Tokens:** instead of writing #0b7a51 forty times, write var(--acc) forty times and define the value once. The name is the contract between design intent and code.",
      ],
    },
    {
      t: "model",
      title: "Constraints first, names second",
      text: [
        "**Fluid over fixed:** prefer units that scale — rem for type and spacing (respects user font-size/zoom), % and fr for layout shares, vw cautiously. Reserve px for hairlines. clamp(min, preferred, max) gives a value that scales between bounds — the standard recipe for fluid headings.",
        "**Component over viewport:** media queries ask 'how big is the WINDOW?' Container queries ask 'how big is MY CONTAINER?' — the right question for a card that lives in a sidebar today and a full-width grid tomorrow.",
        "**Semantic over literal:** --color-success survives a rebrand; --color-green does not. Name tokens for their JOB, and map literal values to jobs per theme.",
      ],
      map: [
        ["Packing for a carry-on before checking a bag", "Mobile-first: small-screen constraints decide what's essential"],
        ["'The emergency exit sign', not 'that red rectangle'", "Semantic names survive redesigns"],
        ["A thermostat, not 40 space heaters", "One token source, referenced everywhere"],
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "Fluid type and space without breakpoint whack-a-mole",
      code: "/* grows with the viewport but never below 1.25rem / above 2.5rem\n   — no media queries */\nh1 { font-size: clamp(1.25rem, 1rem + 2.5vw, 2.5rem); }\n\n/* a readable measure with gutters, in one line */\n.prose { max-width: min(100% - 2rem, 68ch); }\n\n/* spacing scale as tokens, in rem so user zoom works */\n:root { --space-2: 0.5rem; --space-4: 1rem; --space-8: 2rem; }\n.card { padding: var(--space-4); gap: var(--space-2); }",
      notes: [
        "rem is relative to the ROOT font-size — the user's zoom and accessibility settings. em compounds from the parent. vw ignores user font settings — always clamp it between rem bounds.",
        "68ch ≈ the comfortable reading measure; min(100% - 2rem, 68ch) is the modern 'readable width with gutters' one-liner.",
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "Container queries: the component decides",
      code: "/* OLD: 'how big is the window?' — breaks when the card moves\n   from a 3-column grid to a sidebar */\n@media (max-width: 700px) { .card { flex-direction: column; } }\n\n/* NEW: 'how big is the card's CONTAINER?' — adapts to its\n   actual home, wherever that is */\n.card-zone { container-type: inline-size; }\n@container (max-width: 420px) {\n  .card { flex-direction: column; }\n}\n\n/* media queries still OWN page-level structure:\n   nav collapse, sidebar-vs-drawer, overall grids. */",
      notes: ["Rule of thumb: viewport changes the PAGE's structure → media query. The same component must adapt to different HOMES → container query. Both coexist happily."],
    },
    {
      t: "code",
      lang: "css",
      title: "Two mappings, one contract — the system under this page",
      code: ":root {\n  --acc: #0b7a51;      /* the accent's JOB: 'primary action' */\n  --surface: #f9fbf9;\n  --ink: #131c17;\n}\n\n[data-theme=\"dark\"] {\n  --acc: #3fd68f;      /* same JOB, different value */\n  --surface: #111813;\n  --ink: #e5efe8;\n}\n\n.button {\n  background: var(--acc);   /* components speak in JOBS */\n  color: var(--surface);\n}\n\n/* rebrand = one block. dark mode = one attribute.\n   audit = grep the names. */",
      notes: [
        "Contrast is now a THEME problem: --acc on --surface must clear 4.5:1 in BOTH mappings. Check each theme, not just the one you develop in.",
        "Browse /ref/design-tokens for this platform's full live token table — surfaces, ink, semantic state colors, and more.",
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'my site ignores the user's zoom'",
      scenario: "QA reports: a user with low vision sets browser font size to 200%. Your headings and spacing don't grow — the page stays small while everything else on the web scales. WCAG 1.4.4 (resize text) fails.",
      error: "/* the culprit pattern, repeated across the file */\nh1 { font-size: 32px; }\nh2 { font-size: 24px; }\np  { font-size: 14px; line-height: 20px; }\n.card { padding: 16px; margin-bottom: 24px; }",
      tells: "Everything that should scale is declared in px. Pixels are absolute: they honor the design file, not the user. rem is relative to the root font-size — exactly the number browser zoom and user preferences change. If 200% zoom doesn't grow your type, px is in the diff.",
      flow: [
        "Toggle browser zoom/font-size; confirm computed px values are unchanged.",
        "Identify the layer — units, not layout.",
        "Reproduce: any px-sized text ignores root font-size changes.",
        "Convert type and spacing to rem (16px → 1rem); keep px only for 1px hairlines.",
        "Verify — 200% zoom now scales the whole rhythm; unitless line-height (1.6) scales too.",
      ],
      root: "px severs the link between your sizes and the user's root font-size. rem restores it: 1rem = 'the user's idea of normal', and everything multiplies from there.",
      prevent: "Team rule: rem for type and spacing, unitless line-height, px reserved for borders and shadows. This is also why this platform's token scale is rem-based.",
    },
    {
      t: "mistake",
      title: "Device-targeted breakpoints",
      wrong: "@media (max-width: 375px) /* iPhone SE */ — breakpoints named after this year's phone lineup.",
      right: "Breakpoints belong to YOUR CONTENT: resize until the layout hurts, put the query there.",
      explain: "Device-specific queries rot the moment a new device lands between your numbers, and they encode 'mobile = small iPhone'. Content-driven breakpoints survive every hardware cycle.",
    },
    {
      t: "note",
      kind: "production",
      title: "Beyond the screen: print, motion, contrast",
      text: [
        "Production CSS answers more than viewport width: @media print strips chrome for paper; prefers-reduced-motion disables animation for users who need stillness; prefers-contrast and forced-colors keep things legible in high-contrast OS modes. Each is a two-line query you add once — the difference between 'works' and 'works for everyone'.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Take a small page you've built, list every color/spacing value, define them in :root with SEMANTIC names, and replace all literals with var(). Count how many lines a 'rebrand to blue' touches afterward (~5).",
        "Build a fluid h1 with clamp(): floor 1.5rem, ceiling 3rem, vw in the middle. Resize and confirm it never exits the bounds.",
        "Make a card container-query responsive: stacked below 420px container width, side-by-side above. Place it in a sidebar and a full-width grid — it must adapt to each with no media query.",
        "Stretch: audit this platform in DevTools — find where --acc is defined, where it's consumed, and predict exactly which CSS changes when you flip the theme.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "Mobile-first means base styles target…", options: ["small screens; min-width queries add capacity", "desktop; max-width removes features", "tablets, the middle", "no screen — base is screen-agnostic"], answer: [0], explain: "Base = smallest constraints (the essential design); min-width queries ENHANCE as room appears. Additive beats subtractive — you never ship accidental desktop bloat to phones." },
        { id: "q2", type: "single", prompt: "Which unit respects the user's browser font-size setting?", options: ["px", "rem", "vw", "pt"], answer: [1], explain: "rem multiplies from the ROOT font-size — exactly what zoom and user preferences change. vw tracks the window; px tracks neither. Use vw only clamped between rem bounds." },
        { id: "q3", type: "single", prompt: "clamp(1.25rem, 1rem + 2.5vw, 2.5rem) guarantees…", options: ["exactly 2.5vw always", "scaling with the viewport, never below 1.25rem or above 2.5rem", "media queries at the bounds", "the middle argument is ignored"], answer: [1], explain: "clamp(MIN, PREFERRED, MAX): the preferred value is used while it stays within the rem bounds. Fluid scaling, hard safety rails, zero queries." },
        { id: "q4", type: "single", prompt: "A card must adapt to a sidebar OR a full-width grid. Right tool?", options: ["viewport media query", "container query on the card's container", "JS measuring window.innerWidth", "two separate card components"], answer: [1], explain: "The question is 'how big is my home?', not 'how big is the window' — container queries answer it directly, making the component placement-independent." },
        { id: "q5", type: "boolean", prompt: "When this platform flips light/dark, the components' CSS changes.", options: ["True", "False"], answer: [1], explain: "False — components never change. Only the token MAPPING changes under [data-theme]; every var(--acc) resolves to the new value automatically. That's the whole payoff of tokens." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Mobile-first", "Base styles for small screens; min-width queries add capacity."],
        ["clamp()", "min/preferred/max in one value — fluid scaling with hard rails."],
        ["Container query", "Responsive rules driven by an element's container, not the viewport."],
        ["Design token", "A named design decision (--space-4, --acc) referenced everywhere, defined once."],
        ["Semantic naming", "Tokens named for jobs (success) not values (green) — rebrand-proof."],
      ],
    },
    {
      t: "recap",
      items: [
        "Start with small-screen constraints; enhance with min-width; breakpoints belong to your content.",
        "rem for type/space, unitless line-height, px only for hairlines; clamp() for fluid headlines.",
        "Media queries own page structure; container queries own component adaptability.",
        "Tokens = named decisions, one source, semantic names; themes are remappings, not rewrites.",
        "Zoom-respecting units are an accessibility requirement (WCAG 1.4.4), not a preference.",
      ],
    },
    { t: "checkpoint", text: "Flip this platform's theme and name the ONE thing that changes and the ONE thing that doesn't. Then write a clamp() headline without looking. Both right? Module 6 done." },
    { t: "bridge", text: "The page now has structure, semantics, and a skin that scales. The last Foundation module makes the whole thing provably correct: TypeScript, the compiler that reads your code like a careful reviewer — before it ever runs.", next: "why-types" },
  ],
};

export const m6: Lesson[] = [cssMentalModel, layoutFlexGrid, responsiveAndTokens];
