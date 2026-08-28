import type { Lesson } from "../lib/core";

export const m1: Lesson[] = [
  {
    id: "what-happens-when",
    title: "What Happens When You Hit Enter",
    volume: 1, module: 1, order: 1, level: "Foundation", status: "implemented", minutes: 45,
    summary: "The full journey from a URL to pixels: DNS, TCP, TLS, HTTP, and the render pipeline — the mental map every later lesson hangs on.",
    prereqs: [],
    objectives: [
      "Trace URL → DNS → TCP → TLS → HTTP → render in order, naming each hop's job",
      "Explain why DNS is cached and what a TTL means",
      "Distinguish TCP (reliable pipe) from TLS (encrypted, authenticated pipe)",
      "Use dig/curl/DevTools Network to observe each stage yourself",
    ],
    concepts: ["URL", "DNS", "TCP", "TLS", "HTTP", "TTFB"],
    blocks: [
      { t: "lead", text: "Type a URL, press Enter, and a page appears. It feels instant and magical. It is neither: it is a precisely ordered conversation between your machine and a server, and by the end of this lesson you can narrate every step — because every debugging skill later in this course depends on knowing *which step* went wrong." },
      { t: "why", text: [
        "The browser hides an enormous amount of machinery. When something breaks — a slow page, a certificate warning, a site that 'can't be reached' — the error points at one stage of the pipeline. If you don't know the pipeline, the error is noise. If you do, it's a coordinate.",
        "This map also explains *why* the web is built the way it is: stateless HTTP, caching, CDNs, and load balancers all exist because of what you're about to see.",
      ]},
      { t: "simple", text: [
        "Think of mailing a letter to a friend in another city. (1) You look up their address in a directory — that's **DNS**. (2) A reliable courier route is established so nothing gets lost — that's **TCP**. (3) The letter is sealed in tamper-proof wrapping only the recipient can open — that's **TLS**. (4) You write the actual request on the letter — that's **HTTP**. (5) Your friend reads it and sends a reply back the same way.",
        "Every web page load is this exact sequence, repeated, at the speed of light.",
      ]},
      { t: "model", title: "The five-stage pipeline", text: [
        "**1. DNS — name → address.** Browsers speak IP addresses, not names. DNS is a distributed directory that translates `example.com` → `93.184.216.34`. Answers are cached with a **TTL** (time-to-live), which is why DNS changes 'propagate' slowly.",
        "**2. TCP — a reliable pipe.** The two machines open a connection that guarantees ordered, lossless delivery, retransmitting anything lost. No HTTP yet — just plumbing.",
        "**3. TLS — prove + encrypt.** Over that pipe, the server proves its identity with a certificate and the two sides agree on encryption. `https` = HTTP inside TLS.",
        "**4. HTTP — the request/response.** Now the browser sends the actual request (method, path, headers); the server responds (status, headers, body).",
        "**5. Render — bytes → pixels.** The browser parses HTML/CSS/JS into a DOM and paints. This stage is its own lesson.",
      ], map: [
        ["A city directory", "DNS — translates names to IP addresses"],
        ["A guaranteed courier lane", "TCP — reliable, ordered delivery"],
        ["A sealed, signed envelope", "TLS — encryption + identity proof"],
        ["The letter's contents", "HTTP — the actual request and response"],
      ]},
      { t: "diagram", title: "The journey, end to end", ascii:
"  you                internet                  server\n  ┌──────┐   1 DNS    ┌──────────┐            ┌──────┐\n  │browser├──────────►│ resolver ├───────────►│ 93.… │  (IP found)\n  └──┬───┘            └──────────┘            └──┬───┘\n     │   2 TCP handshake (SYN/SYN-ACK/ACK)      │\n     ├──────────────────────────────────────────►│\n     │   3 TLS handshake (cert + keys)          │\n     ├──────────────────────────────────────────►│\n     │   4 HTTP: GET / HTTP/1.1                 │\n     ├──────────────────────────────────────────►│\n     │   4 HTTP: 200 OK + <html>…               │\n     │◄──────────────────────────────────────────┤\n     │   5 parse → DOM → paint                  │\n     ▼                                          " },
      { t: "code", lang: "terminal", title: "Observe it yourself", code:
"# 1 — DNS: what address does the name resolve to?\ndig example.com +short\n# 93.184.216.34\n\n# 2+3+4 — curl shows the TLS + HTTP conversation\ncurl -vI https://example.com\n# * Connected to example.com (93.184.216.34) port 443\n# * TLSv1.3 … certificate verified\n# < HTTP/2 200\n# < content-type: text/html",
        notes: ["dig answers the DNS question in isolation; curl -v shows the TCP/TLS/HTTP stages verbosely. Together they let you bisect a 'site won't load' problem.", "In the browser, DevTools → Network → Timing breaks TTFB into DNS, connect (TCP), TLS, and waiting — the same pipeline."] },
      { t: "debug", title: "Debugging lab — 'This site can't be reached'", scenario: "A teammate says a site is down for them but works for you. The browser shows DNS_PROBE_FINISHED_NXDOMAIN.", error:
"This site can’t be reached\nexample.dev’s server IP address could not be found.\nDNS_PROBE_FINISHED_NXDOMAIN",
        tells: "NXDOMAIN means the *name lookup* failed — the request never got past stage 1. TCP, TLS, and HTTP never ran. So the fix lives in DNS (stale cache, wrong resolver, a hosts-file entry), not in the app.",
        flow: [
          "Read the prefix: DNS_PROBE_FINISHED_NXDOMAIN → stage 1 (DNS), not the server.",
          "Compare: dig example.dev +short on your machine vs theirs. Yours resolves; theirs doesn't.",
          "Hypothesis: their resolver/OS cache holds a stale or poisoned answer.",
          "Change one variable: flush their DNS cache (or switch to 1.1.1.1).",
          "Verify: dig now returns an IP and the page loads. Root cause: stale resolver cache, not a down server.",
        ], root: "DNS answers are cached with a TTL. A stale negative answer (NXDOMAIN) can persist locally even after records are fixed — the classic 'works on my machine' at the network layer.", prevent: "Before changing DNS records, lower TTLs a day ahead so caches refresh quickly; and always check the resolver, not just the server, when a name won't resolve." },
      { t: "note", kind: "performance", text: ["Time to First Byte (TTFB) bundles stages 1–4: DNS + TCP + TLS + server thinking. A high TTFB means the *network or server* is slow; a low TTFB with a slow page means *download or render* is slow. Splitting them is how you aim performance work."] },
      { t: "vocab", terms: [
        ["DNS", "The distributed directory translating domain names to IP addresses."],
        ["TTL", "How long a cached DNS answer may be trusted before re-fetching."],
        ["TCP", "Protocol opening a reliable, ordered, lossless pipe between two machines."],
        ["TLS", "The encryption + identity layer; https is HTTP inside TLS."],
        ["TTFB", "Time to First Byte — DNS + TCP + TLS + server processing."],
        ["CDN", "Content Delivery Network — copies of your files on servers near users."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "Which stage translates example.com into an IP address?", options: ["TCP", "DNS", "TLS", "HTTP"], answer: [1], explain: "DNS is the directory lookup. TCP is the pipe, TLS is encryption, HTTP is the message — all of them need the IP first." },
        { id: "q2", type: "boolean", prompt: "https means the HTTP message itself is encrypted by TLS.", options: ["True", "False"], answer: [0], explain: "True — https is HTTP carried inside a TLS tunnel, so the request/response (and the server's identity) are protected." },
        { id: "q3", type: "single", prompt: "A user sees NXDOMAIN but the site works for you. Where is the problem most likely?", options: ["The server is down", "Their DNS resolver/cache", "Their TLS certificates", "The HTTP method"], answer: [1], explain: "NXDOMAIN fails at the DNS stage before any connection. A stale local resolver cache explains 'works for you, not them'." },
        { id: "q4", type: "single", prompt: "High TTFB, but fast rendering once bytes arrive. Where do you look first?", options: ["Paint / layout code", "Network + server (DNS/TCP/TLS/server time)", "Image sizes", "CSS specificity"], answer: [1], explain: "TTFB is stages 1–4. If it's high, the delay is before the first byte — network or server — not rendering." },
      ]},
      { t: "recap", items: [
        "URL → DNS → TCP → TLS → HTTP → render, in that order, every time.",
        "DNS is cached with a TTL; NXDOMAIN means the name stage failed.",
        "TCP = reliable pipe, TLS = encryption + identity, HTTP = the message.",
        "TTFB separates network/server slowness from download/render slowness.",
      ]},
      { t: "checkpoint", text: "Without looking, write the five stages in order and one sentence each. Then run dig on a real domain and name what you just asked for." },
      { t: "bridge", text: "Now that you can see the pipe, the next lesson opens the message itself: the HTTP request/response — methods, headers, and status codes. That's the conversation rules every API and web app obeys.", next: "http-request-response" },
    ],
  },

  {
    id: "http-request-response",
    title: "HTTP: The Conversation Rules",
    volume: 1, module: 1, order: 2, level: "Foundation", status: "implemented", minutes: 50,
    summary: "Methods, headers, status codes, idempotency, and statelessness — the contract every web exchange follows, and how to read it in DevTools.",
    prereqs: ["what-happens-when"],
    objectives: [
      "Name the four parts of a request and a response",
      "Choose GET/POST/PUT/PATCH/DELETE by semantics, and say which are idempotent",
      "Read status classes (2xx/3xx/4xx/5xx) and distinguish 401 from 403",
      "Explain why HTTP is stateless and how cookies/sessions compensate",
    ],
    concepts: ["method", "header", "status code", "idempotent", "stateless"],
    blocks: [
      { t: "lead", text: "HTTP is a text protocol with a small, strict grammar. Once you can read a request and a response line by line, APIs stop being black boxes and errors stop being mysteries. This is the single most-referenced lesson in the course — bookmark it mentally." },
      { t: "why", text: [
        "The web needed a shared language any client and any server could speak, decades apart. HTTP's answer: a tiny set of well-understood verbs, metadata as headers, and a numbered verdict system. Its deliberate simplicity — especially **statelessness** — is what lets the web scale behind load balancers and caches.",
        "Understanding the rules also tells you when a framework is *bending* them (SPAs, websockets, server components), which is a recurring theme from Volume III onward.",
      ]},
      { t: "simple", text: [
        "A request is an envelope with four parts: a **verb** (what you want done — GET, POST…), a **path** (which resource), **headers** (metadata: what you accept, who you are), and sometimes a **body** (the payload). A response mirrors it: a **status code** (the verdict), **headers**, and a **body**.",
        "That's the whole protocol. Everything else — auth, caching, APIs — is built from these four parts.",
      ]},
      { t: "model", title: "Verbs are promises about behavior", text: [
        "**GET** reads and changes nothing. **POST** creates (and is *not* idempotent — repeating it may create duplicates). **PUT** replaces a whole resource, **PATCH** changes part of it, **DELETE** removes it. **Idempotent** means 'doing it twice changes nothing beyond the first success' — GET, PUT, DELETE are; POST isn't. This matters for retries, caching, and webhooks (Volume IX).",
        "**Status classes** are the verdict: 2xx success · 3xx redirect · 4xx the client's fault · 5xx the server's fault. Two you must never confuse: **401** 'I don't know who you are' (authenticate) vs **403** 'I know you — you're not allowed' (authorize).",
        "HTTP is **stateless**: the server keeps no memory between requests. Cookies, sessions, and tokens exist to smuggle memory through a stateless protocol — the foundation of all authentication (Volume IV).",
      ], map: [
        ["A librarian who forgets you between visits", "A stateless HTTP server"],
        ["A stamped claim ticket you hand back", "A cookie/session carrying your identity"],
        ["Re-ringing a doorbell that only opens once", "A non-idempotent POST retried by mistake"],
      ]},
      { t: "code", lang: "http", title: "A request and response, annotated", code:
"GET /api/tasks?page=2 HTTP/1.1        ← method + path + version\nHost: app.example.com                  ← headers: metadata\nAccept: application/json\nAuthorization: Bearer eyJhbGc…        ← who you are (session/token)\n\n──────────────────────────────────────\n\nHTTP/1.1 200 OK                        ← status: the verdict\nContent-Type: application/json         ← headers\nCache-Control: no-store\n\n{\"tasks\":[{\"id\":1,\"title\":\"Ship\"}]}    ← body: the payload",
        notes: ["Everything above the blank line is metadata; everything after is the payload. DevTools → Network shows exactly this split per request.", "Authorization: Bearer … is how a stateless server learns who you are on every request."] },
      { t: "code", lang: "js", title: "The same exchange in fetch", code:
"const res = await fetch(\"/api/tasks?page=2\", {\n  headers: { Accept: \"application/json\" },\n});\n\nif (res.status === 401) {\n  // server doesn't know who you are → re-authenticate\n} else if (res.status === 403) {\n  // it knows you, but you lack permission → fix the role, not the login\n} else if (!res.ok) {\n  throw new Error(`Request failed: ${res.status}`);\n}\n\nconst data = await res.json();   // only parse the body when ok",
        notes: ["res.ok is shorthand for a 2xx status. Always branch on status *before* parsing the body.", "Treat 401 and 403 as different bugs: one is authentication, the other authorization."] },
      { t: "debug", title: "Debugging lab — 400 'Unsupported Media Type'", scenario: "Your POST works from Postman but returns 400 from code. Same payload, different result.", error:
"POST /api/tasks 400 (Bad Request)\n{\"error\":\"Unsupported Media Type: expected application/json\"}",
        tells: "The server refused the *envelope*, not the payload. Postman sets Content-Type automatically; your fetch didn't. The body was JSON, but the headers never said so.",
        flow: [
          "Read the code: 400 Unsupported Media Type → a header is missing or wrong, not the data.",
          "Compare working (Postman) vs failing (fetch) requests in DevTools → Headers.",
          "Hypothesis: fetch omits Content-Type: application/json.",
          "Change one variable: add the header.",
          "Verify: 201 Created. The payload was fine all along — the envelope was unlabeled.",
        ], root: "fetch sends a plain body with no Content-Type by default; the server can't assume JSON. The fix is a header, not a payload change.", prevent: "Wrap fetch in a small client that always sets Content-Type and inspects res.ok before parsing — one place to be correct instead of many." },
      { t: "outdated", lang: "js", label: "Old tutorials: XMLHttpRequest", oldCode:
"// The pre-fetch era (you'll still see it in older code):\nconst xhr = new XMLHttpRequest();\nxhr.open(\"GET\", \"/api/tasks\");\nxhr.onreadystatechange = () => {\n  if (xhr.readyState === 4 && xhr.status === 200) {\n    console.log(xhr.responseText);\n  }\n};\nxhr.send();", now: "fetch + async/await", nowCode:
"const res = await fetch(\"/api/tasks\");\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst tasks = await res.json();", why: "XHR predates Promises, so it's callback- and event-flag-driven — verbose and error-prone. fetch + async/await expresses the same exchange as a straight-line promise chain. Read XHR in old code; write fetch in new code." },
      { t: "note", kind: "security", text: ["Headers carry trust. Authorization and Cookie headers are how identity crosses a stateless protocol — and why they must be protected (HttpOnly, Secure, SameSite) once you build auth. Never log them, never trust them client-side; the server re-verifies every request."] },
      { t: "vocab", terms: [
        ["Method", "The verb declaring intent: GET, POST, PUT, PATCH, DELETE."],
        ["Idempotent", "Repeating the request changes nothing beyond the first success (GET/PUT/DELETE, not POST)."],
        ["Status class", "2xx success · 3xx redirect · 4xx client fault · 5xx server fault."],
        ["401 vs 403", "401 = unknown identity (authenticate); 403 = known but not allowed (authorize)."],
        ["Stateless", "The server keeps no memory between requests; cookies/tokens supply it."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "multi", prompt: "Select ALL idempotent methods.", options: ["GET", "POST", "PUT", "DELETE"], answer: [0,2,3], explain: "GET, PUT, and DELETE are idempotent — repeating them changes nothing beyond the first success. POST can create duplicates when retried, so it isn't." },
        { id: "q2", type: "single", prompt: "A logged-in user gets an error on an admin page. Which code tells you it's a permission problem, not a login problem?", options: ["401", "403", "404", "500"], answer: [1], explain: "403 means the server knows who you are but you lack the role. 401 would mean it doesn't recognize you at all." },
        { id: "q3", type: "boolean", prompt: "An HTTP server remembers your previous request by default.", options: ["True", "False"], answer: [1], explain: "False — HTTP is stateless. Cookies, sessions, and tokens are the mechanisms that smuggle memory through the protocol." },
        { id: "q4", type: "single", prompt: "POST returns 400 'Unsupported Media Type' from code but works in Postman. The fix is:", options: ["Change the payload", "Set Content-Type: application/json", "Switch to GET", "Retry with POST twice"], answer: [1], explain: "The server rejected the envelope, not the data. fetch doesn't send Content-Type by default; Postman does. Add the header." },
      ]},
      { t: "recap", items: [
        "A request = method + path + headers + body; a response = status + headers + body.",
        "Verbs carry semantics; GET/PUT/DELETE are idempotent, POST isn't.",
        "2xx/3xx/4xx/5xx are verdicts; 401 ≠ 403.",
        "HTTP is stateless — identity must be re-sent on every request.",
      ]},
      { t: "checkpoint", text: "Open DevTools Network on any site, pick a request, and name its method, one header, and status class from memory of this lesson." },
      { t: "bridge", text: "You can now read the message. Next: what the browser *does* with the bytes it receives — parsing, layout, and paint. That's the render pipeline, and it explains every 'slow page' and 'janky animation' you'll ever debug.", next: "browser-rendering" },
    ],
  },

  {
    id: "browser-rendering",
    title: "The Browser Is a Rendering Machine",
    volume: 1, module: 1, order: 3, level: "Foundation", status: "implemented", minutes: 40,
    summary: "DOM, CSSOM, layout, paint, composite — the pipeline that turns bytes into pixels, and why reflows, blocking scripts, and layout thrashing cost you frames.",
    prereqs: ["what-happens-when", "http-request-response"],
    objectives: [
      "Recite the render pipeline: DOM+CSSOM → render tree → layout → paint → composite",
      "Explain why a <script> without defer blocks parsing",
      "Distinguish reflow (layout) from repaint, and why layout is the expensive one",
      "Identify layout thrashing and the read/write batching fix",
    ],
    concepts: ["DOM", "CSSOM", "reflow", "layout thrashing", "Core Web Vitals"],
    blocks: [
      { t: "lead", text: "The browser is not a text viewer — it's a real-time rendering engine redrawing your page up to 60 times a second. Knowing the pipeline turns 'my page is slow' into a precise diagnosis, and it's the reason the HTML and CSS lessons (Modules 5–6) care so much about structure." },
      { t: "why", text: [
        "Every performance tool you'll use — Lighthouse, Core Web Vitals, the Performance tab — measures stages of this pipeline. LCP, CLS, and INP aren't arbitrary acronyms; they're coordinates on the same map.",
        "The pipeline also dictates *architecture*: why scripts go at the end or use defer, why images need dimensions, why animations should use transform. You'll follow these rules for the rest of the course — this is the why.",
      ]},
      { t: "simple", text: [
        "The browser reads your HTML into a tree of nodes (the **DOM**) and your CSS into a tree of computed styles (the **CSSOM**). It merges them, works out where every box goes (**layout**), colors in the pixels (**paint**), and stacks layers on the GPU (**composite**). Any change to structure or geometry forces it to redo the expensive middle steps.",
        "So the golden rule: don't make the browser re-measure and re-draw more than it has to.",
      ]},
      { t: "model", title: "A factory line, not a photograph", text: [
        "HTML + CSS arrive as raw text. The browser builds the **DOM** (what exists) and the **CSSOM** (how it should look), then a **render tree** of only the visible nodes. **Layout** computes geometry — every box's position and size. **Paint** rasterizes pixels. **Composite** assembles GPU layers into the final frame.",
        "The cost gradient is the key insight: changing `transform` or `opacity` only touches *composite* (cheap, GPU). Changing color touches *paint*. Changing width/position forces *layout* — and layout cascades, because one box's size affects its siblings and children. That's why geometry changes are the expensive ones.",
      ], map: [
        ["A blueprint and a styling guide", "The DOM (structure) and CSSOM (style)"],
        ["Measuring every room before building", "Layout — the expensive geometry pass"],
        ["Photographing vs rearranging furniture", "Repaint (cheap-ish) vs reflow (expensive)"],
      ]},
      { t: "diagram", title: "The pipeline, and where each change lands", ascii:
"  bytes ──► DOM + CSSOM ──► render tree ──► LAYOUT ──► PAINT ──► COMPOSITE ──► frame\n                                                ▲         ▲          ▲\n   width/height/font/resize ────────────────────┘         │          │   (reflow: expensive)\n   color/shadow/background ───────────────────────────────┘          │   (repaint)\n   transform/opacity ────────────────────────────────────────────────┘   (composite: cheap)" },
      { t: "code", lang: "html", title: "defer: don't block the factory line", code:
"<!-- A classic <script> PAUSES HTML parsing to download + run.\n     The DOM can't finish building until it returns. -->\n<script src=\"app.js\"></script>\n\n<!-- defer downloads in parallel and runs in order AFTER\n     the document is parsed. Nothing blocks the DOM. -->\n<script src=\"app.js\" defer></script>",
        notes: ["Blocking scripts delay the DOM, which delays layout and paint — the user stares at a blank page. defer keeps the factory line moving.", "async also avoids blocking but runs as soon as downloaded (order not guaranteed) — right for independent analytics, wrong for code that depends on other scripts."] },
      { t: "debug", title: "Debugging lab — scroll jank from layout thrashing", scenario: "A scroll handler updates a progress bar. Smooth on your machine, stuttering on a mid-range phone. The Performance tab shows long purple Layout bars on every scroll frame.", error:
"window.addEventListener(\"scroll\", () => {\n  // READ geometry, then WRITE style, then READ again — per frame:\n  const total = document.body.scrollHeight;   // read  (forces layout)\n  bar.style.width = (window.scrollY / total * 100) + \"%\"; // write (invalidates)\n  const pct = computePct(document.body.scrollTop); // read again → forced sync reflow\n});",
        tells: "Interleaving reads and writes forces the browser to re-run layout *synchronously*, mid-frame, repeatedly — layout thrashing. Each read after a write can't use the cached geometry, so it re-measures from scratch.",
        flow: [
          "Record the Performance tab while scrolling; note long Layout (purple) bars attributed to your handler.",
          "Identify the pattern: read → write → read inside one hot callback.",
          "Hypothesis: each post-write read forces a synchronous reflow.",
          "Change one variable: cache the measurement outside the loop / batch all reads, then all writes.",
          "Verify: Layout bars shrink to near-zero; frames hold 60fps.",
        ], root: "The browser caches layout until something invalidates it. Writing style then reading geometry forces it to recompute layout immediately — and doing that every frame is thrashing.", prevent: "Batch reads before writes, cache measurements, and for motion prefer transform/opacity which never trigger layout." },
      { t: "note", kind: "performance", text: ["Core Web Vitals map onto this pipeline: **LCP** (largest paint) suffers from blocking resources and slow servers; **CLS** (layout shift) is unwanted layout from images/ads without reserved space; **INP** (responsiveness) suffers from long JavaScript tasks. Reserve image dimensions and keep handlers under the 16.6ms frame budget."] },
      { t: "vocab", terms: [
        ["DOM", "The live tree of nodes parsed from HTML."],
        ["CSSOM", "The computed-style tree parsed from CSS."],
        ["Reflow (layout)", "Recomputing positions and sizes — the expensive, cascading stage."],
        ["Layout thrashing", "Forced synchronous reflows from interleaved DOM reads and writes."],
        ["Composite", "Assembling GPU layers — why transform/opacity animate cheaply."],
      ]},
      { t: "quiz", title: "Check your understanding", questions: [
        { id: "q1", type: "single", prompt: "Which change forces the browser to re-run layout (reflow)?", options: ["opacity", "color", "width", "transform"], answer: [2], explain: "width is geometry, so it forces layout — and layout cascades to affected siblings/children. opacity and transform only touch composite; color only repaint." },
        { id: "q2", type: "single", prompt: "Why does a plain <script> in <head> delay rendering?", options: ["It's larger than CSS", "It pauses HTML parsing to download and execute", "It invalidates the CSSOM", "It forces a repaint"], answer: [1], explain: "A classic script blocks the parser; the DOM can't finish building (and layout/paint can't start) until it returns. defer runs it after parsing instead." },
        { id: "q3", type: "single", prompt: "Layout thrashing is caused by…", options: ["too many images", "reading DOM geometry after writing styles inside a hot loop", "using flexbox", "large JavaScript bundles"], answer: [1], explain: "A post-write geometry read forces a synchronous reflow. Repeated per frame, it consumes the whole frame budget. Batch reads before writes." },
        { id: "q4", type: "boolean", prompt: "Animating transform is cheaper than animating left because transform skips layout and paint.", options: ["True", "False"], answer: [0], explain: "True — transform is handled at the composite stage on the GPU, so it never triggers layout or paint, unlike left/width." },
      ]},
      { t: "recap", items: [
        "DOM + CSSOM → render tree → layout → paint → composite, every frame.",
        "Geometry changes force layout (expensive); transform/opacity stay on the GPU.",
        "defer keeps scripts from blocking the DOM.",
        "Batch reads before writes to avoid layout thrashing.",
      ]},
      { t: "checkpoint", text: "Classify these from memory: changing box-shadow, changing margin, changing scale via transform — which stage does each touch?" },
      { t: "bridge", text: "The pipeline consumed bytes and produced pixels — but the *logic* that drives all of it is JavaScript. The next module starts the language itself: values, types, and the reference semantics that explain most beginner bugs.", next: "js-values-types" },
    ],
  },
];
