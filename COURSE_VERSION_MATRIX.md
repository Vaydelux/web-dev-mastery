# COURSE_VERSION_MATRIX

Version numbers are never welded into the governing curriculum spec. Before creating or materially updating any
technology-specific module, verify the current stable line against official release notes/changelogs and update
this matrix. Alpha/beta/RC/canary releases are never the teaching baseline.

Distinguish always: **repository version** (what lessons install) · **current stable** (what production runs) ·
**legacy** (what old codebases contain — taught for recognition only).

| Technology | Course (repository) | Latest verified stable | Verified | Notes |
|---|---|---|---|---|
| React | 18.x | 19.x stable | 2026-02 | Platform runs React 18; lessons teach hooks/function components (version-agnostic patterns). |
| Next.js | 15.x (App Router) | 15.x stable · 16.x observed | 2026-02 | App Router baseline; Pages Router = legacy literacy. |
| TypeScript | 5.7 | 5.x stable | 2026-02 | strict mode from the first TS lesson. |
| Node.js | 22 (Active LTS) | 24 LTS · 22 Active LTS | 2026-02 | Odd-numbered releases never used. |
| pnpm | 10.x | 10.x | 2026-02 | Lockfile always committed. |
| PostgreSQL | 17 | 17 stable · 18 observed | 2026-02 | Supabase pins majors per project; track both. |
| Supabase (JS SDK) | 2.x | 2.112.x | 2026-02 | v2 API; TS ≥ 5.0 required. |
| Course platform | React 18 + Vite 6 + Tailwind 4 | Vite 6.x · Tailwind 4.1.x | 2026-02 | Implements the Docusaurus component contract portably. |

## Migration ledger
_(empty — no deliberate upgrades performed yet; append here when a batch performs one, with reason,
diff summary, and affected lessons)_
