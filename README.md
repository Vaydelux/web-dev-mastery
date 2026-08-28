# Zero→Mastery — Full-Stack Web Development

An interactive, manifest-driven course platform: **80 lessons across 11 volumes**, from how a URL becomes pixels to production incidents and architectural judgment. Every lesson is a complete loop — mental model → code → intentional failure → debugging lab → quiz — and every volume closes with a cumulative boss battle (pass ≥ 70%).

**Live content:** Foundations (web/HTTP, JS, terminal, Git, HTML/a11y, CSS, TypeScript) → Builder (modular JS, error handling, tooling) → React (6 modules) → Web Architecture (REST, auth, security) → PostgreSQL → Supabase & RLS → Next.js → Full-Stack Applications → Production Engineering (testing, queues, CI/CD, observability) → Architecture → Capstones & Mastery.

Plus: 24 flashcard sets (365 cards) with spaced self-grading, a 209-term glossary, a 61-entry symptom-based troubleshooting index, an accessibility checklist, a design-token reference, a version matrix, and a generation queue that documents how the curriculum itself is built.

---

## Deploy to Vercel

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL_HERE)

Replace `YOUR_REPO_URL_HERE` with this repository's HTTPS URL (e.g. `https://github.com/you/zero-to-mastery`).

### From the dashboard

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel auto-detects the **Vite** preset — leave everything as-is:
   - **Framework preset:** Vite
   - **Build command:** `npm run build` (runs `vite build`)
   - **Output directory:** `dist`
4. Deploy. Every push to `main` produces a new deployment; PRs get preview URLs automatically.

### From the CLI

```bash
npm i -g vercel
vercel          # first deploy (accept the detected Vite settings)
vercel --prod   # promote to production
```

### What's already configured

- `vercel.json` — SPA fallback rewrite (safe even though the app uses hash routing), immutable caching for hashed `/assets/*`, `no-cache` on `index.html` so new builds go live instantly, and a standard security-header set.
- `.nvmrc` — pins the build to Node 20.
- No environment variables, no database, no secrets — the app is a fully client-side SPA (progress persists in the visitor's `localStorage`).

---

## Local development

```bash
pnpm install     # or npm install
pnpm dev         # start the dev server (Vite)
pnpm build       # production build → dist/
pnpm typecheck   # tsc --noEmit
```

## Tech

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 (design tokens as CSS custom properties, light/dark themes) · react-router (hash routing — works on any static host) · Space Grotesk / IBM Plex Sans / JetBrains Mono.

## Repository layout

```
src/
  data/        the entire curriculum as typed data (lessons1–29.ts, model.ts)
  components/  lesson engine, chrome, labs
  pages.tsx    home, lesson, battle, flashcards, search, queue, references, completion
  lib/         progress + theme engine, types
COURSE_MANIFEST.md / COURSE_STATUS.md / COURSE_VERSION_MATRIX.md
               governance: what exists, what shipped, version policy
```

The curriculum is data, not markup — adding a lesson is one typed object in `src/data/`, and the sidebar, search, flashcards, gauntlet remediation links, and progress map all regenerate from it.
