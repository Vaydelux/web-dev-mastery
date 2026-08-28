import type { Lesson } from "../lib/core";

/* ================= MODULE 5 — SEMANTIC HTML & ACCESSIBILITY ================= */

const htmlAsStructure: Lesson = {
  id: "html-as-structure",
  title: "HTML Is Meaning: Structure Before Styling",
  volume: 1,
  module: 5,
  order: 1,
  level: "Foundation",
  status: "implemented",
  minutes: 45,
  summary:
    "HTML describes what content IS, not how it looks. Landmarks, heading outlines, wired forms, and honest images — the semantic base layer that does most of the accessibility and SEO work before a single ARIA attribute exists.",
  prereqs: ["git-recovery"],
  objectives: [
    "Explain who reads your HTML besides the browser (assistive tech, crawlers, future-you)",
    "Structure a page with landmarks and a gap-free heading outline",
    "Wire every form control to a real label, with groups, errors, and autocomplete",
    "Write alt text by role: informative, functional, decorative",
    "Refactor div soup into semantics and predict what each change unlocks",
  ],
  concepts: ["semantics", "landmarks", "heading outline", "labels", "alt text"],
  blocks: [
    {
      t: "lead",
      text: "For four modules you've built *behind* the page: the wire, the runtime, the shell, the history. Now you're building the page itself — and the first surprise is that HTML is not a visual language at all. It's a language of *claims*: this is a navigation, this is the main content, this button does that. Get the claims right and browsers, screen readers, and search engines do enormous work for free. Get them wrong and everything downstream — CSS, JavaScript, accessibility, SEO — fights uphill.",
    },
    {
      t: "why",
      text: [
        "Why separate meaning from appearance? The same document must render on a phone, a 40-inch monitor, a printer, a car dashboard, and a screen reader — and be indexed by a crawler that never 'sees' anything. Hard-coding appearance into content makes one presentation, badly. HTML-as-meaning makes *many* presentations from one source.",
        "This is also the single highest-leverage accessibility decision you will make: native semantics give assistive technology role, name, keyboard support, and announcements with zero extra code. ARIA (Lesson 3 of this module) exists for the gaps — and there are far fewer gaps than most codebases pretend.",
      ],
    },
    {
      t: "simple",
      text: [
        "Think of HTML as the **skeleton** and CSS as the skin. A skeleton says: here is a skull, here is a spine, here are the limbs — and every doctor (browser, screen reader, crawler) instantly knows how the body works. Div soup is a skeleton made of identical beige bones: technically alive, medically useless.",
        "Every element you choose is a claim about *what something is*. `<button>` claims 'this performs an action.' `<nav>` claims 'these links go places.' When your claims are true, the whole platform works with you.",
      ],
    },
    {
      t: "model",
      title: "A signed floor plan",
      text: [
        "A semantic page is a floor plan with every room signed. **Landmarks** — header, nav, main, aside, footer — let screen-reader users teleport between rooms instead of walking the corridors element by element. The **heading outline** — h1 through h6 — is the table of contents AT users skim first; a skipped level is a missing door in the plan.",
        "Inside the rooms, **labels** are the nameplates on every control, and **alt text** is the docent describing the pictures to someone facing the wall. None of this is decoration; it's the information architecture made machine-readable.",
      ],
      map: [
        ["Rooms with signs on the doors", "Landmarks: header, nav, main, aside, footer"],
        ["The table of contents", "The heading outline, levels in order"],
        ["Nameplates on every switch", "A <label> wired to each control"],
        ["The docent describing the art", "Alt text doing the image's real job"],
      ],
    },
    {
      t: "diagram",
      title: "The landmark skeleton",
      ascii: "┌───────────────────────────────────────┐\n│  <header>  logo · <nav> links </nav>  │  ← banner / navigation\n├───────────┬───────────────────────────┤\n│           │                           │\n│  <aside>  │   <main>                  │  ← complementary / the ONE main\n│  filters  │     <h1>…</h1>            │\n│           │     <section>…</section>  │\n│           │   </main>                 │\n├───────────┴───────────────────────────┤\n│  <footer> © · legal · contact         │  ← contentinfo\n└───────────────────────────────────────┘\n  Screen-reader users jump room-to-room; div soup makes them walk every corridor.",
    },
    {
      t: "code",
      lang: "html",
      title: "The same toolbar, claimed honestly",
      bad: true,
      code: "<!-- div soup: five identical 'generic' nodes -->\n<div class=\"top\">\n  <div class=\"bar\">\n    <div class=\"logo\" onclick=\"goHome()\">Acme</div>\n    <div class=\"link\" onclick=\"nav('/pricing')\">Pricing</div>\n    <div class=\"link\" onclick=\"nav('/docs')\">Docs</div>\n    <div class=\"box\" onclick=\"toggleMenu()\">☰</div>\n  </div>\n</div>",
      notes: [
        "A screen reader announces every one of these as 'group' or nothing at all: no roles, no names, no keyboard access, no tab stops. The onclick handlers work for mouse users only.",
      ],
    },
    {
      t: "code",
      lang: "html",
      title: "Semantics do the work",
      good: true,
      code: "<header class=\"top\">\n  <nav class=\"bar\" aria-label=\"Main\">\n    <a class=\"logo\" href=\"/\">Acme</a>\n    <a href=\"/pricing\">Pricing</a>\n    <a href=\"/docs\">Docs</a>\n    <button type=\"button\" aria-expanded=\"false\" aria-controls=\"menu\">\n      ☰ <span class=\"sr-only\">Menu</span>\n    </button>\n  </nav>\n</header>\n\n<!-- What this bought you, for free:\n     · roles: navigation, link, button — announced\n     · names: link text + aria-label fallback\n     · keyboard: Tab stops, Enter/Space activation\n     · AT jump targets: the nav is a landmark -->",
    },
    {
      t: "h2",
      id: "outline",
      text: "The heading outline: levels are depth, not font size",
    },
    {
      t: "code",
      lang: "html",
      title: "A readable outline (and a broken one)",
      code: "<!-- GOOD: one h1, levels never skip -->\n<h1>Mission Log</h1>\n  <h2>Missions</h2>\n    <h3>Active</h3>\n    <h3>Archived</h3>\n  <h2>Reports</h2>\n\n<!-- BROKEN: h1 → h3 skips a level, two h1s fight -->\n<h1>Mission Log</h1>\n<h1>Also the title??</h1>\n<h3>Sections appear from nowhere</h3>\n\n/* Style with CSS, not with heading levels:\n   h3.small-look { font-size: 1rem; }  ← legal\n   <p class=\"big-look\">…</p> as <h4>   ← a lie */",
      notes: [
        "Screen-reader users navigate by heading level; a skipped level reads like a chapter with no book. AT also counts headings per level — duplicates distort the map.",
      ],
    },
    {
      t: "h2",
      id: "forms",
      text: "Forms: every control gets a wired nameplate",
    },
    {
      t: "code",
      lang: "html",
      title: "Labels, groups, errors, autocomplete",
      code: "<form novalidate>\n  <!-- explicit association: for/id -->\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" type=\"email\"\n         autocomplete=\"email\" required\n         aria-describedby=\"email-err\" />\n  <p id=\"email-err\" class=\"error\" role=\"alert\" hidden>\n    Enter a valid email — like ada@example.com.\n  </p>\n\n  <!-- related controls get a real group name -->\n  <fieldset>\n    <legend>Notification channel</legend>\n    <label><input type=\"radio\" name=\"chan\" value=\"email\" checked> Email</label>\n    <label><input type=\"radio\" name=\"chan\" value=\"sms\"> SMS</label>\n  </fieldset>\n\n  <button type=\"submit\">Save settings</button>\n</form>",
      notes: [
        "Placeholder is a hint that vanishes on input — it is never a label. A label stays, enlarges the hit target, and gives AT a name.",
        "aria-describedby + role='alert' means the error is *announced* to AT the moment it appears, not just painted red (color is never the only signal).",
        "autocomplete powers password managers and autofill — 'email', 'name', 'cc-number' — and is required by WCAG for identity fields.",
      ],
    },
    {
      t: "h2",
      id: "images",
      text: "Alt text: describe the job, not the pixels",
    },
    {
      t: "code",
      lang: "html",
      title: "Three roles, three alt strategies",
      code: "<!-- 1. INFORMATIVE: describe the content it carries -->\n<img src=\"chart.png\"\n     alt=\"Bar chart: deploys per week rose from 2 to 9 in Q3\" />\n\n<!-- 2. FUNCTIONAL (inside a link/button): describe the ACTION -->\n<a href=\"/\"><img src=\"logo.svg\" alt=\"Acme home\" /></a>\n\n<!-- 3. DECORATIVE: deliberate empty alt, never a missing attribute -->\n<img src=\"squiggle.svg\" alt=\"\" />",
      notes: [
        "A missing alt makes AT guess (often reading the filename — 'IMG_2049.jpg' is not content). An empty alt is an explicit 'skip me.'",
        "Complex figures get the long description in text nearby (a caption or adjacent paragraph); alt carries the one-line essence.",
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'the page that reads like a wall of groups'",
      scenario: "A QA engineer using VoiceOver reports your dashboard is unusable: 'I can't find anything. Every element is just \"group\", and Tab does nothing until the very bottom.' Mouse users report no problems at all.",
      error: "<div class=\"app\">\n  <div class=\"hdr\">…</div>\n  <div class=\"side\">…</div>\n  <div class=\"content\">\n    <div class=\"title\">Missions</div>\n    <div class=\"card\" onclick=\"open(1)\">Apollo</div>\n    <div class=\"card\" onclick=\"open(2)\">Gemini</div>\n  </div>\n</div>\n<!-- VoiceOver rotor: headings — 0 found. landmarks — 0 found.\n     Tab key: no focusable elements until the browser URL bar. -->",
      tells: "Open the Accessibility pane in DevTools (Elements → Accessibility) or the rotor in VoiceOver: the page has ZERO landmarks, ZERO headings, ZERO interactive elements. The 'wall of groups' is literal — every node's computed role is 'generic'. Mouse users never notice because onclick and CSS supply everything eyes need; AT and keyboards get none of it.",
      flow: [
        "Reproduce with keyboard only: press Tab. If nothing is focusable, there are no interactive elements — only divs.",
        "Open DevTools' accessibility tree (or run an axe scan): confirm every node resolves to role 'generic'.",
        "Identify the layer — semantics, not CSS and not JavaScript. The structure itself carries no meaning.",
        "Fix by claim, not by ARIA: header/nav/main landmarks, real <h1>/<h2>, <button> for the cards, labels for inputs.",
        "Verify: the rotor now lists 3 landmarks and 2 headings; Tab stops on both mission buttons; Enter opens them.",
      ],
      root: "Div soup gives assistive tech nothing to navigate: no landmark jump targets, no heading skimming, no focusable controls. Semantics are the API between your document and every non-visual consumer of it.",
      prevent: "Reach for the semantic element first, every time — it's usually shorter than the div-plus-classes version. Run one axe scan and one 60-second keyboard pass per screen (the Accessibility Checklist at /ref/a11y makes this a habit).",
    },
    {
      t: "mistake",
      title: "Designing by div and class name",
      wrong: "<div class=\"button\" onclick=\"…\"> — a div performing a button's job with none of its contract.",
      right: "<button type=\"button\"> — role, name, keyboard activation, disabled state, and AT announcements included for free.",
      explain: "Every native element is a small bundle of behavior: focusability, activation keys, semantics, platform styling hooks. Rebuilding that bundle by hand costs more code and ships more bugs — the 'interactive div' is the single most common accessibility failure on the web.",
    },
    {
      t: "outdated",
      lang: "html",
      label: "Old codebases: layout tables and spacer GIFs",
      oldCode: "<!-- 1999 layout: a TABLE used as a grid -->\n<table width=\"100%\" cellpadding=\"0\">\n  <tr>\n    <td width=\"200\">sidebar</td>\n    <td>content</td>\n  </tr>\n</table>\n<img src=\"spacer.gif\" width=\"1\" height=\"20\" alt=\"\">",
      now: "CSS layout (flex/grid) over semantic structure",
      nowCode: "<div class=\"shell\">   <!-- or <main>/<aside> -->\n  <aside>sidebar</aside>\n  <main>content</main>\n</div>\n\n/* .shell { display: grid; grid-template-columns: 200px 1fr; } */",
      why: "Tables are for tabular *data* — AT announces rows and columns, which is correct for data and noise for layout. You'll meet layout tables in legacy code; recognize them by width/cellpadding attributes and nested tables. Screen readers still have a 'tables' mode that gets confused by them.",
    },
    {
      t: "note",
      kind: "a11y",
      title: "Color is never the only signal",
      text: [
        "'Required fields are red' fails for color-blind users; 'errors are the red box' fails for everyone in high-contrast mode. Pair every color-coded state with a second channel: an icon, an explicit label ('3 errors'), or text. Then the meaning survives grayscale printing, low vision, and forced-colors OS modes.",
      ],
    },
    {
      t: "note",
      kind: "info",
      title: "SEO reads meaning, not pixels",
      text: [
        "Crawlers build their model of your page from the same semantics: the <title>, the h1, landmark structure, link text, alt text. 'click here' links and image-only navigation are invisible to indexing. Semantic HTML is the original SEO — and unlike tricks, it never gets penalized. (Private dashboards are the exception: they shouldn't be indexed at all.)",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Take one screen of any page you've built and write down its landmark skeleton on paper. If you can't, the structure is missing — rebuild it with header/nav/main/footer.",
        "Refactor a 'div with onclick' into a real <button>, then prove the win: Tab to it, press Enter, and read its line in the DevTools accessibility tree.",
        "Write alt text for three images from a real site: one informative, one functional (in a link), one decorative. Compare yours to theirs.",
        "Stretch: run the same page through an axe scan (DevTools extension) and fix every 'serious' violation using only semantic HTML — no ARIA allowed.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "A page uses <h1> then <h3> for its sections. What breaks?", options: ["Nothing — levels are just sizes", "The heading outline: AT users skim by level and a skipped level is a structural hole", "CSS inheritance", "Page load speed"], answer: [1], explain: "Heading levels encode document depth. Screen-reader heading navigation relies on a coherent outline; h1→h3 announces a subsection of a section that was never declared. Size is CSS's job." },
        { id: "q2", type: "single", prompt: "Which is a correctly associated label?", options: ["<label>Email</label> near an input", "<label for=\"e\">Email</label> + <input id=\"e\">", "<input placeholder=\"Email\">", "<span aria-hidden=\"false\">Email</span>"], answer: [1], explain: "for/id (or wrapping the input in the label) creates the programmatic association AT reads. Proximity and placeholders create none — a placeholder is a hint, not a name." },
        { id: "q3", type: "single", prompt: "A logo image links to the homepage. Its alt should be…", options: ["\"logo.png\"", "\"company logo image graphic\"", "\"Acme home\" — the action the link performs", "omitted entirely"], answer: [2], explain: "Functional images describe the ACTION, because the image IS the link. 'Acme home' tells AT users what activating it does. Omitting the attribute makes AT guess." },
        { id: "q4", type: "multi", prompt: "Select everything native <button> gives you that <div onclick> does not.", options: ["A 'button' role announced by AT", "Tab focus and Enter/Space activation", "A working disabled state", "Automatic server-side validation"], answer: [0, 1, 2], explain: "The native element bundles role, keyboard contract, and disabled semantics. Server-side validation is your code either way." },
        { id: "q5", type: "boolean", prompt: "A decorative image should have no alt attribute at all.", options: ["True", "False"], answer: [1], explain: "False — it should have an EMPTY alt=\"\", which explicitly tells AT to skip it. A missing attribute makes AT fall back to reading the filename." },
        { id: "q6", type: "single", prompt: "An error message appears in red text below a field. The accessibility gap is…", options: ["The text is too small", "Color is the only signal; AT isn't told the error exists or which field it belongs to", "Red is a poor brand color", "Errors should be alerts()"], answer: [1], explain: "Painting red changes pixels, not the accessibility tree. Wire the message to the field (aria-describedby) and announce it (role='alert'); keep the color as a redundant second channel." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Landmark", "A signed region (header/nav/main/aside/footer) AT users can jump between."],
        ["Heading outline", "The h1–h6 tree encoding document depth; levels must not skip."],
        ["Label association", "for/id or wrapping — the programmatic link between a nameplate and its control."],
        ["Alt text", "The text alternative doing the image's job: informative, functional, or deliberately empty."],
        ["Div soup", "Structure built from generic divs; computes to 'generic' roles and nothing for AT."],
      ],
    },
    {
      t: "recap",
      items: [
        "HTML is a language of claims; browsers, AT, and crawlers all read the same semantics.",
        "Landmarks sign the rooms; the heading outline is the table of contents; never skip levels.",
        "Every control gets a wired label; groups get fieldset/legend; errors get described AND announced.",
        "Alt text describes the job: content, action, or a deliberate skip.",
        "Native elements are behavior bundles — prefer them over div-plus-JavaScript every time.",
      ],
    },
    { t: "checkpoint", text: "Open any page you've built and name its landmarks out loud. Then Tab across it: every control reachable, in visual order? If either fails, fix the structure before moving on." },
    { t: "bridge", text: "Semantics built the machine-readable page. But who reads it, and how? Next: the accessibility tree the browser constructs from your claims, and the keyboard flows that let anyone operate the result.", next: "a11y-tree-keyboard" },
  ],
};

const a11yTreeKeyboard: Lesson = {
  id: "a11y-tree-keyboard",
  title: "The Accessibility Tree and the Keyboard-First Page",
  volume: 1,
  module: 5,
  order: 2,
  level: "Foundation",
  status: "implemented",
  minutes: 50,
  summary:
    "The browser builds a second tree from your semantics — role, name, state — and screen readers read ONLY that tree. Learn how names are computed, how tab order really works, and the focus patterns (skip links, traps, :focus-visible) that make pages operable without a mouse.",
  prereqs: ["html-as-structure"],
  objectives: [
    "Explain what the accessibility tree is and why it, not the DOM, is what AT reads",
    "Predict an element's accessible name from the computation order",
    "Control tab order with DOM order (and know why positive tabindex is banned)",
    "Implement skip links, :focus-visible styling, and a modal focus trap",
    "Run a 60-second keyboard-only audit of any page",
  ],
  concepts: ["accessibility tree", "accessible name", "tab order", "focus management", "focus trap"],
  blocks: [
    {
      t: "lead",
      text: "Here is the fact that reorganizes everything: screen readers do not read your HTML, and they do not see your pixels. The browser compiles your document into a *second* tree — the accessibility tree — where every node is reduced to three things: a **role**, a **name**, and a **state**. That tree is the entire interface for assistive technology. This lesson teaches you to read it, because once you can, 'accessibility' stops being a vague virtue and becomes a spec you can check.",
    },
    {
      t: "why",
      text: [
        "Why a second tree? The DOM is full of information AT doesn't need (layout wrappers, styling hooks) and missing information AT desperately does (what a control is called, whether a menu is open). The accessibility tree is the browser's translation: semantics in, a clean contract out.",
        "And why obsess over the keyboard? Keyboard access is the *floor* of operability: screen-reader users navigate by keyboard, motor-impaired users may have no pointer, power users live on it, and — decisively — everything AT needs is a superset of what keyboard users need. Pass the keyboard test and you're most of the way to the AT test.",
      ],
    },
    {
      t: "simple",
      text: [
        "The accessibility tree is the page's **braille plaque** — a parallel description etched beside every element: 'Button. Submit order. Enabled.' 'Heading level 2. Reports.' 'Link. Pricing.' Screen readers read the plaques, never the painting.",
        "**Focus** is a spotlight the keyboard moves. Tab advances it, Shift+Tab retreats, Enter/Space press whatever's lit. If an element can't be lit, it doesn't exist for keyboard users.",
      ],
    },
    {
      t: "model",
      title: "Role, name, state — the whole contract",
      text: [
        "Every node AT cares about reduces to **role** (what it is: button, link, textbox, heading), **name** (what it's called: computed from content, label, or alt), and **state** (expanded/collapsed, checked, disabled). When a bug 'breaks accessibility,' it is almost always one of these three: a wrong role (div-as-button), a missing name (icon with no label), or a stale state (menu that never announces 'expanded').",
        "The name computation has a priority order: element content first (the text in a button), then associated label/alt, then aria-label as a last resort. Knowing the order tells you both what a control will announce and why your aria-label is being ignored.",
      ],
      map: [
        ["The braille plaque beside each element", "A node's role + name + state in the a11y tree"],
        ["The moving spotlight", "Keyboard focus"],
        ["A door with no handle", "A control that can't receive focus"],
      ],
    },
    {
      t: "code",
      lang: "html",
      title: "What the a11y tree actually says",
      code: "<!-- Your DOM -->\n<button>Submit order</button>\n<a href=\"/p\"><img src=\"cart.svg\" alt=\"Cart\"></a>\n<div class=\"btn\" onclick=\"buy()\">Buy</div>\n<input id=\"q\" aria-label=\"Search missions\">\n\n<!-- The accessibility tree (DevTools ▸ Accessibility) -->\nrole: button        name: \"Submit order\"      ← from content\nrole: link          name: \"Cart\"              ← from the img's alt\nrole: generic       name: \"\"                  ← the div: roleless, nameless\nrole: textbox       name: \"Search missions\"   ← from aria-label\n\n/* The div doesn't 'say the wrong thing.' It says NOTHING.\n   It is not in the contract at all. */",
      notes: [
        "Chrome DevTools → Elements → Accessibility pane (or the full Accessibility tab) shows this tree live. It's the single most useful a11y debugging surface you have.",
      ],
    },
    {
      t: "h2",
      id: "tab-order",
      text: "Tab order is DOM order — protect it",
    },
    {
      t: "code",
      lang: "html",
      title: "The tabindex scale",
      code: "<!-- tabbable by default: <a href>, <button>, <input>, <select>, <textarea> -->\n\n<!-- tabindex=\"-1\": focusable by SCRIPT only, skipped by Tab.\n     Legit use: the container a modal moves focus INTO. -->\n<div class=\"toast\" tabindex=\"-1\">Saved.</div>\n\n<!-- tabindex=\"0\": joins the natural tab order.\n     Legit use: rare — making a custom widget focusable. -->\n\n<!-- tabindex=\"3\", \"7\", \"42\": TELEPORTS focus around the page.\n     BANNED. It creates an order no one can predict or maintain. -->\n<button tabindex=\"3\">Why am I first?</button>",
      notes: [
        "DOM order IS tab order. If the visual order and tab order disagree, the fix is the DOM (or CSS order, with the reading-order caveat), never tabindex numbers.",
      ],
    },
    {
      t: "code",
      lang: "css",
      title: "Focus you can see, only when it matters",
      code: "/* The crime: removing the ring with no replacement */\n:focus { outline: none; }   /* keyboard users just lost their spotlight */\n\n/* The fix: visible for keyboards, quiet for mice */\n:focus-visible {\n  outline: 2px solid var(--acc);\n  outline-offset: 2px;\n}\n\n/* Skip link: first tab stop, hidden until used */\n.skip-link {\n  position: absolute;\n  transform: translateY(-200%);\n}\n.skip-link:focus-visible {\n  transform: none;\n  /* → jumps straight past repeated nav to the content */\n}",
    },
    {
      t: "walkthrough",
      title: "Annotated: a modal focus trap",
      lang: "js",
      steps: [
        {
          code: "function openModal(dialog) {\n  lastFocused = document.activeElement;  // remember the trigger\n  dialog.showModal();                    // native <dialog>: trap included\n  dialog.querySelector(\"input, button\")?.focus(); // land inside\n}",
          text: "The native <dialog> element with showModal() gives you the trap for free: Tab cycles inside, Esc closes, and the rest of the page is inert. Prefer it over hand-rolled overlays — the trap, the Esc key, and the inert background are the exact behaviors you'd otherwise rebuild.",
        },
        {
          code: "dialog.addEventListener(\"close\", () => {\n  lastFocused?.focus();   // RETURN focus to the trigger\n});",
          text: "The half everyone forgets: when the dialog closes, focus must go back to the element that opened it — not to the top of the page. Keyboard and AT users were 'standing at' the trigger; leave them where you found them.",
        },
      ],
    },
    {
      t: "debug",
      title: "Debugging lab — 'the dropdown you can't reach'",
      scenario: "Users report the account menu 'just doesn't work with a keyboard.' Mouse: click the avatar, menu opens, click an item. Keyboard: Tab skips the avatar entirely; there is no way in.",
      error: "<div class=\"avatar\" onclick=\"toggleMenu()\">\n  <img src=\"me.png\" alt=\"\">\n</div>\n<div class=\"menu\" hidden>…items…</div>\n\n<!-- Tab order: …search box… then straight to the footer.\n     The avatar has no href, no button role, no tabindex. -->",
      tells: "Tab through the page and watch the focus ring: it never lands on the avatar. In the a11y tree, the avatar is role 'generic' with no name — it isn't a control at all. The menu items may be real links, but they're unreachable because their door can't be opened without a pointer.",
      flow: [
        "Reproduce: press Tab repeatedly and confirm the avatar is skipped.",
        "Check the a11y tree: role is 'generic' — no button, no name.",
        "Identify the root cause: an interactive div. tabindex=\"0\" + a keydown handler would 'work'… and rebuild the button contract badly.",
        "Fix at the claim level: replace the div with <button type=\"button\" aria-expanded=\"false\" aria-haspopup=\"true\">.",
        "Verify: Tab lands on it, Enter/Space toggle the menu, aria-expanded flips, and menu items are reachable.",
      ],
      root: "Interactivity without semantics: onclick supplies the behavior for pointers only. A native button supplies role, name, focus, and activation keys together — the fix is to make the claim true, not to patch the div.",
      prevent: "Every clickable non-link is a <button>; every navigation is an <a href>. A 60-second Tab pass after building each screen catches these instantly — it's on the checklist.",
    },
    {
      t: "mistake",
      title: "outline: none with no replacement",
      wrong: "A global :focus { outline: none } to 'clean up' the default ring.",
      right: "Style :focus-visible with your own high-contrast ring (2px solid accent, offset 2px). The default may be ugly; invisible is a lockout.",
      explain: "The outline is the keyboard user's only position indicator. Removing it without replacement makes every page un-navigable for keyboard and many AT users — it's the accessibility equivalent of turning off the lights.",
    },
    {
      t: "note",
      kind: "a11y",
      title: "Contrast and motion are accessibility too",
      text: [
        "WCAG AA wants ≥4.5:1 for body text (3:1 for large text) — check both themes, not just the one you develop in. And honor prefers-reduced-motion: animation is decoration for most users but nausea or disorientation for some; nothing should *mean* something only through motion. Your design-token lesson will show both as two-line media queries.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Do the 60-second pass: open any real site, press Tab from the top. Count the stops until you reach the main content. Is there a skip link? Note the worst gap you find.",
        "Open DevTools' Accessibility pane on three elements of a page you built. Write down each role/name. Fix any 'generic' roles with real elements.",
        "Break a modal on purpose: remove the focus-return on close. Tab out and feel how disorienting 'focus escaped to the page top' is. Restore it.",
        "Stretch: build a disclosure (button + panel) using only <button aria-expanded> + hidden, zero ARIA beyond expanded. Confirm the a11y tree shows state flipping.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "Screen readers read…", options: ["the raw HTML source", "the pixels, via OCR", "the accessibility tree the browser builds from semantics", "the CSS layout"], answer: [2], explain: "AT consumes the a11y tree — role, name, state per node. Your HTML is the input to that tree; unsemantic HTML produces 'generic' nodes with nothing to read." },
        { id: "q2", type: "single", prompt: "<button><img alt=\"Trash\"> Delete</button> announces what name?", options: ["\"Trash\"", "\"Delete\"", "\"Trash Delete\" — content is concatenated", "\"button\""], answer: [2], explain: "The accessible name comes from ALL the element's content: the img's alt text plus the text node, in order. This is why icon+label buttons announce both." },
        { id: "q3", type: "single", prompt: "Why is tabindex=\"5\" banned?", options: ["It's deprecated HTML", "Positive values teleport focus into an unpredictable, unmaintainable order", "It breaks CSS", "It only works in Firefox"], answer: [1], explain: "Tab order should equal DOM order. Positive tabindex creates a parallel ordering that fragments as the page grows — the fix for wrong order is the DOM, not numbers." },
        { id: "q4", type: "single", prompt: "A modal closes. Where should focus go?", options: ["Top of the document", "Back to the element that opened it", "The nearest heading", "It doesn't matter"], answer: [1], explain: "Return focus to the trigger. Keyboard/AT users were 'standing' there; dropping them at page top loses their place. Native <dialog> does this for you." },
        { id: "q5", type: "boolean", prompt: ":focus-visible styles only for keyboard navigation, leaving mouse clicks unringed.", options: ["True", "False"], answer: [0], explain: "True — :focus-visible is the browser's 'this focus came from a keyboard' heuristic. You get visible rings for Tab users and clean clicks for pointer users." },
        { id: "q6", type: "multi", prompt: "Which are legitimate uses of tabindex=\"-1\"?", options: ["Removing a broken link from tab order permanently", "A container you programmatically focus (e.g., the panel a modal lands in)", "Making a div act like a button", "Hiding content from screen readers"], answer: [1], explain: "-1 means 'script-focusable, Tab-skipped' — right for managed focus targets. Hiding from AT is aria-hidden/inert's job, and fake buttons need real buttons, not tabindex." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["Accessibility tree", "The browser's translation of the document into role/name/state nodes AT consumes."],
        ["Accessible name", "What a control is called, computed from content → label/alt → aria-label."],
        ["Tab order", "The DOM order of focusable elements; the keyboard's route through the page."],
        [":focus-visible", "Focus styling applied for keyboard navigation, not pointer clicks."],
        ["Focus trap", "Confining Tab within an open overlay and returning focus to the trigger on close."],
      ],
    },
    {
      t: "recap",
      items: [
        "AT reads the accessibility tree (role/name/state), never your pixels — inspect it in DevTools.",
        "Names compute content-first: fix the claim, not the aria-label.",
        "DOM order is tab order; positive tabindex is banned; -1 is for managed focus.",
        "Rings are mandatory (:focus-visible), skip links jump past repeated chrome, modals trap and return.",
        "The 60-second keyboard pass is your fastest, cheapest a11y test.",
      ],
    },
    { t: "checkpoint", text: "Tab across this very course platform from the top: every control reachable, ring visible, in visual order? Then name one element's role+name from the a11y tree without hovering." },
    { t: "bridge", text: "You can now read the tree and drive the page by keyboard. The final piece is the gap-filler: ARIA — the attributes that add role, name, and state when native HTML genuinely can't. Used sparingly, it's a bridge; used casually, it's how accessible sites break.", next: "aria-when-needed" },
  ],
};

const ariaWhenNeeded: Lesson = {
  id: "aria-when-needed",
  title: "ARIA: Don't, Unless You Must — and What 'Must' Looks Like",
  volume: 1,
  module: 5,
  order: 3,
  level: "Foundation",
  status: "implemented",
  minutes: 40,
  summary:
    "ARIA adds what semantics lack — and nothing else. The five rules that keep it a bridge rather than a lie, the three patterns you'll actually use (expanded/pressed, live regions, described-by), and how to test that the tree tells the truth.",
  prereqs: ["a11y-tree-keyboard"],
  objectives: [
    "State the five ARIA rules and apply the 'native first' test to any widget",
    "Use aria-expanded/pressed/current to reflect real state in the tree",
    "Announce dynamic updates with polite (status) vs assertive (alert) live regions",
    "Give icon-only controls accessible names — and hide decorative ones",
    "Verify every ARIA claim against the live accessibility tree",
  ],
  concepts: ["ARIA", "live regions", "aria-expanded", "accessible name", "native-first"],
  blocks: [
    {
      t: "lead",
      text: "ARIA — Accessible Rich Internet Applications — is a vocabulary of attributes that *annotate* the accessibility tree: they add roles, names, and states HTML can't express. It exists because the web outgrew the original tag set — date pickers, tabs, toasts, tree views have no native element. But ARIA has a peculiar property that makes it dangerous: **it changes nothing about behavior.** It only changes what AT is *told*. Which means every ARIA attribute is a promise — and an unkept promise is worse than silence.",
    },
    {
      t: "why",
      text: [
        "Why 'don't, unless you must'? A native element ships its contract whole: role + name + keyboard behavior + platform integration, maintained by the browser vendor forever. ARIA supplies the first piece and leaves the rest to you — focus management, key handling, state updates. Teams add role=\"button\" to a div, skip the keyboard half, and now AT announces a button that keyboard users can't press. That's strictly worse than no announcement at all: it's a lie.",
        "The discipline: exhaust native HTML first (<button>, <a>, <details>, <dialog>, <progress>), then reach for ARIA only for the residue — and test the residue against the real tree.",
      ],
    },
    {
      t: "simple",
      text: [
        "ARIA is a **sticker you put on the braille plaque** — 'this panel is expanded,' 'this region updates live.' The sticker doesn't move the panel or fetch the updates; your JavaScript does. Put up a sticker that your code never updates, and the plaque now lies. Rule of thumb: if you can't point to the line of code that keeps an ARIA attribute true, don't write the attribute.",
      ],
    },
    {
      t: "model",
      title: "The five rules, in order",
      text: [
        "1. **No ARIA beats bad ARIA.** A missing attribute is silence; a wrong one is misinformation. When in doubt, leave it off and test.",
        "2. **Native first.** If an element or attribute does the job, use it. <button> over role=\"button\"; <label> over aria-label.",
        "3. **Never override native semantics.** role=\"button\" on a real <button> or a heading level via aria-level is noise at best, breakage at worst.",
        "4. **If it's interactive, it's keyboard-operable.** Adding a role makes a promise: focus, Enter/Space/arrow keys, Escape. No keyboard contract, no role.",
        "5. **State must be kept current.** aria-expanded, aria-checked, aria-busy must flip in the same commit as the visual change — ideally driven by the same source of truth.",
      ],
      map: [
        ["A sticker on the plaque, not a new plaque", "ARIA annotates the tree; it never adds behavior"],
        ["The native element's lifetime warranty", "Browser-maintained role + keys + announcements, free"],
        ["A contract with five clauses", "The ARIA rules — breaking any one makes the lie"],
      ],
    },
    {
      t: "code",
      lang: "html",
      title: "Pattern 1 — state that stays in sync",
      code: "<button type=\"button\"\n        aria-expanded=\"false\"\n        aria-controls=\"filters\">\n  Filters <span aria-hidden=\"true\">▾</span>\n</button>\n<div id=\"filters\" hidden>…</div>\n\n<script>\n  btn.addEventListener(\"click\", () => {\n    const open = filters.toggleAttribute(\"hidden\") === false;\n    btn.setAttribute(\"aria-expanded\", String(open)); // ONE source of truth\n  });\n</script>\n\n/* aria-pressed for toggles, aria-current=\"page\" for nav —\n   same rule: the attribute mirrors the state, every time. */",
      notes: [
        "Drive CSS from the attribute where you can (button[aria-expanded=\"true\"] { … }) so the visual and the announced state literally cannot drift.",
      ],
    },
    {
      t: "code",
      lang: "html",
      title: "Pattern 2 — live regions: polite vs assertive",
      code: "<!-- The region must EXIST before you inject content -->\n<div id=\"cart-status\" role=\"status\"></div>        <!-- polite -->\n<div id=\"form-errors\" role=\"alert\"></div>          <!-- assertive -->\n\n<script>\n  // 'Saved to your log' — waits for a pause, doesn't interrupt\n  cartStatus.textContent = `Added ${item}. ${count} total.`;\n\n  // 'Session expired — sign in again' — interrupts NOW\n  formErrors.textContent = \"Session expired. Please sign in.\";\n</script>",
      notes: [
        "role=\"status\" (polite) queues behind the current sentence — right for confirmations and counters. role=\"alert\" (assertive) cuts in — reserve it for errors that block the user. If everything is an alert, nothing is.",
      ],
    },
    {
      t: "code",
      lang: "html",
      title: "Pattern 3 — names and honest silence",
      code: "<!-- Icon-only control: the icon has no name, so the button needs one -->\n<button type=\"button\" aria-label=\"Delete mission\">\n  <svg aria-hidden=\"true\">…trash icon…</svg>\n</button>\n\n<!-- Decorative icon next to REAL text: hide the icon, keep the text -->\n<button type=\"button\">\n  <svg aria-hidden=\"true\">…</svg> Delete\n</button>\n\n<!-- aria-hidden on focusable content is a trap: -->\n<a href=\"/x\" aria-hidden=\"true\">Invisible link</a>\n<!-- AT can't see it, but Tab STILL lands on it — a nameless stop. -->",
    },
    {
      t: "debug",
      title: "Debugging lab — 'announced expanded, still collapsed'",
      scenario: "Screen-reader users report the filter panel is broken: the button always says 'expanded,' whether the panel is open or not. Sighted users see it toggle fine.",
      error: "<button aria-expanded=\"true\" onclick=\"toggle()\">Filters</button>\n\nfunction toggle() {\n  panel.classList.toggle(\"open\");   // visual state: correct\n  // …but nothing ever touches aria-expanded.\n}\n// The attribute was written once in the HTML and never updated.\n// AT reads the stale 'expanded' forever.",
      tells: "The a11y tree (DevTools → Accessibility) shows the button's state as 'expanded: true' while the panel is visually closed. Sighted users read pixels (class-based CSS); AT reads the tree (attribute-based state). The two sources of truth diverged the moment you styled from a class but announced from an attribute.",
      flow: [
        "Reproduce with the a11y tree, not the eyes: watch the button's expanded state while toggling.",
        "Confirm the divergence: the class flips, the attribute doesn't.",
        "Identify the layer — state synchronization, the #1 ARIA failure mode.",
        "Fix at the root: make the attribute the state (or derive both from one variable), and drive the CSS from [aria-expanded].",
        "Verify: tree and pixels now agree on every toggle; also add aria-controls pointing at the panel id.",
      ],
      root: "ARIA attributes are not reactive — they're strings your code must maintain. Any time visual state and announced state come from different sources, they will eventually disagree. Single source of truth isn't just architecture advice; it's an accessibility requirement.",
      prevent: "Write the state once (a boolean in your app state), render both the class AND the attribute from it, and prefer <details>/<dialog> where a native element already keeps its own state in sync.",
    },
    {
      t: "mistake",
      title: "role=\"button\" on a div (the original sin)",
      wrong: "<div role=\"button\" onclick=\"…\"> — announces 'button,' has no Tab stop, no Enter/Space, no disabled state.",
      right: "<button type=\"button\"> — or, if you genuinely can't use one, the FULL contract: tabindex=\"0\", keydown for Enter/Space, focus styles, disabled handling.",
      explain: "Rule 4 is the one teams break: ARIA supplied the role but nobody supplied the keyboard. AT now promises users a button that only a mouse can press. Nine times out of ten the real fix is simply using a button.",
    },
    {
      t: "outdated",
      lang: "html",
      label: "Old codebases: hand-rolled ARIA widgets where native now exists",
      oldCode: "<!-- 2015 disclosure, built by hand -->\n<div role=\"button\" tabindex=\"0\" aria-expanded=\"false\"\n     onclick=\"tgl()\" onkeydown=\"if(event.key==='Enter')tgl()\">\n  Details\n</div>\n<div role=\"region\" aria-labelledby=\"…\" hidden>…</div>\n\n<!-- hand-rolled modal: trap, Esc, and inert all manual -->\n<div role=\"dialog\" aria-modal=\"true\" tabindex=\"-1\">…</div>",
      now: "Native <details>, <dialog>, <progress> first",
      nowCode: "<details>\n  <summary>Details</summary>\n  <p>…</p>\n</details>\n\n<dialog id=\"d\">\n  <form method=\"dialog\"> … <button value=\"ok\">OK</button> </form>\n</dialog>\n<!-- showModal() gives trap + Esc + inert for free -->",
      why: "Much classic 'ARIA widget' code exists because the elements didn't. Browsers have since shipped native versions that maintain their own accessibility contract. Recognize the hand-rolled patterns in older repos — they still work — but new code should spend its ARIA budget where no native element exists (grids, comboboxes, live regions, tree views).",
    },
    {
      t: "note",
      kind: "a11y",
      title: "Test with real AT — it takes five minutes",
      text: [
        "Automated scanners catch ~30–40% of issues; the rest need a human reading the tree. VoiceOver (Cmd+F5 on macOS) and NVDA (free, Windows) both work in minutes: navigate your key flow by keyboard alone and listen. If you can complete the task with your eyes off the screen, the contract holds. Do this for one flow per feature, not per pixel.",
      ],
    },
    {
      t: "try",
      title: "Try it yourself",
      steps: [
        "Build a disclosure twice: once with <details>/<summary>, once with button + aria-expanded + hidden. Compare the code — and confirm both announce state correctly in the a11y tree.",
        "Add a polite live region to a small app: a counter that announces 'N items' on change without stealing focus. Then promote one message to role=\"alert\" and feel the interruption.",
        "Audit three icon-only buttons on a real site: do they have accessible names? Fix your own icon buttons with aria-label and verify in the tree.",
        "Stretch: find an aria-expanded (or aria-pressed) that your code never updates — introduce the bug on purpose, hear the lie with a screen reader, then fix it with a single source of truth.",
      ],
    },
    {
      t: "quiz",
      title: "Check your understanding",
      questions: [
        { id: "q1", type: "single", prompt: "The first question before adding any ARIA should be…", options: ["Which role is most descriptive?", "Does a native element or attribute already do this job?", "Will a screen reader need it?", "Does it pass axe?"], answer: [1], explain: "Native first. A native element ships role + keyboard + announcements as a maintained bundle; ARIA supplies only the announcement and leaves the behavior to you." },
        { id: "q2", type: "single", prompt: "role=\"button\" on a div, with no keyboard handler, is…", options: ["Fine — the role is what matters", "Worse than nothing: AT announces a button keyboard users cannot press", "Automatically keyboard-accessible", "Only a problem in Firefox"], answer: [1], explain: "ARIA never adds behavior. You've announced an interactive control that's unreachable by keyboard — a lie, and rule 4 violation. Use a real button." },
        { id: "q3", type: "single", prompt: "A 'Saved ✓' toast should use…", options: ["role=\"alert\" — always interrupt", "role=\"status\" — announce politely at the next pause", "aria-hidden — toasts are visual", "nothing; AT users don't need it"], answer: [1], explain: "Confirmations are polite: role=\"status\" waits for a break in speech. role=\"alert\" is for blocking errors. Hiding or skipping the toast leaves AT users wondering if anything happened." },
        { id: "q4", type: "boolean", prompt: "An aria-expanded attribute updates itself when the panel's class changes.", options: ["True", "False"], answer: [1], explain: "False — ARIA attributes are inert strings. Your code must set them in the same update as the visual state, ideally deriving both from one source of truth." },
        { id: "q5", type: "single", prompt: "An icon-only close button (✕ as an SVG) gets its accessible name from…", options: ["The SVG's filename", "aria-label=\"Close\" on the button, with aria-hidden on the SVG", "Nothing — icons are self-evident", "The page title"], answer: [1], explain: "The SVG contributes no text, so the button has no name — announce 'button.' aria-label names it; aria-hidden keeps the decorative graphic out of the name computation." },
        { id: "q6", type: "multi", prompt: "Which are valid reasons to reach for ARIA?", options: ["A tab interface with arrow-key navigation", "Announcing a live score update", "Making a div look like a button", "Marking the current page in navigation"], answer: [0, 1, 3], explain: "Tabs (role=tablist pattern), live regions, and aria-current have no full native equivalents. 'Div that looks like a button' has one: <button>." },
      ],
    },
    {
      t: "vocab",
      terms: [
        ["ARIA", "Attributes that add role/name/state to the accessibility tree — annotations, never behavior."],
        ["Live region", "An element (role=status/alert) whose content changes are announced to AT."],
        ["aria-expanded", "State attribute mirroring open/closed — must be updated by your code, every toggle."],
        ["Accessible name (via aria-label)", "The last-resort naming source, for controls with no text content."],
        ["Native-first", "Exhaust real elements before annotating; the ARIA budget is for the residue."],
      ],
    },
    {
      t: "recap",
      items: [
        "ARIA annotates the tree; it never adds behavior — every attribute is a promise your code keeps.",
        "Five rules: no-ARIA beats bad-ARIA, native first, never override, interactive means keyboardable, state stays current.",
        "Three daily patterns: expanded/pressed/current, polite-vs-assertive live regions, names + honest hiding.",
        "Single source of truth for visual AND announced state, or they will drift.",
        "Verify against the live a11y tree and one real screen-reader pass per feature.",
      ],
    },
    { t: "checkpoint", text: "State the five ARIA rules from memory, then find one aria-* attribute on a real site and locate the line of code that keeps it true. Both done? Module 5 complete — run the Accessibility Checklist at /ref/a11y to make it official." },
    { t: "bridge", text: "Structure and semantics are locked in. The next module gives the page its skin — and its own rulebook to decode: the CSS cascade, the box model, and the layout systems that replaced a decade of hacks.", next: "css-mental-model" },
  ],
};

export const m5: Lesson[] = [htmlAsStructure, a11yTreeKeyboard, ariaWhenNeeded];
