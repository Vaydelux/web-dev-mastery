import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/core";
import { COURSE, BATTLE_REFS, FLASHCARD_SETS, courseStats, moduleProgress, volumeProgress } from "../data/model";
import { Icons, ProgressRing, StatusBadge } from "./ui";

/* ————— search index (shared by overlay + /search page) ————— */
export interface Hit { kind: string; title: string; sub: string; to: string; kw: string; planned?: boolean; }

export function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const vol of COURSE) for (const m of vol.modules) for (const l of m.lessons) {
    hits.push({ kind: "lesson", title: l.title, sub: `Volume ${l.volume} · Module ${l.module} · ${l.level}`, to: `/lesson/${l.id}`, kw: `${l.id} ${l.title} ${l.summary} ${l.concepts.join(" ")}`, planned: l.status === "planned" });
  }
  for (const b of BATTLE_REFS) hits.push({ kind: "battle", title: b.title, sub: "boss battle", to: `/battle/${b.id}`, kw: `${b.title} ${b.blurb}` });
  for (const s of FLASHCARD_SETS) hits.push({ kind: "flashcards", title: `Flashcards — ${s.title}`, sub: `${s.cards.length} cards`, to: `/flashcards/${s.id}`, kw: `${s.title} ${s.cards.map((c) => c.front).join(" ")}` });
  const refs: [string, string, string][] = [
    ["Course Roadmap", "/", "home volumes mastery"],
    ["Course Search", "/search", "find lessons terms"],
    ["Flashcard Sets", "/flashcards", "retrieval practice"],
    ["Generation Queue", "/queue", "batch roadmap planned"],
    ["Glossary", "/ref/glossary", "vocabulary terms"],
    ["Troubleshooting Index", "/ref/troubleshooting", "symptoms errors"],
    ["A11y Checklist", "/ref/a11y", "accessibility semantic keyboard aria wcag"],
    ["Design Tokens", "/ref/design-tokens", "colors typography"],
    ["Version Matrix", "/ref/versions", "react next supabase versions"],
    ["Generation Log", "/ref/status", "history gaps"],
    ["Course Manifest", "/ref/manifest", "inventory status"],
    ["Course Completion", "/completion", "certificate ledger gauntlets certified"],
  ];
  for (const [title, to, kw] of refs) hits.push({ kind: "reference", title, sub: to === "/" ? "home" : to, to, kw: `${title} ${kw}` });
  return hits;
}

/* ————— topbar ————— */
export function Topbar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const { theme, setTheme, prog } = useProgress();
  const stats = courseStats();
  const authoredTotal = stats.lessonsImplemented + stats.lessonsDraft;
  const doneN = Object.values(prog.lessons).filter((l) => l.done).length;
  const pct = authoredTotal ? (doneN / authoredTotal) * 100 : 0;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <button onClick={onMenu} className="rounded-lg border border-line p-2 text-soft transition-colors hover:border-acc hover:text-accink lg:hidden" aria-label="Open navigation">
          <Icons.menu size={17} />
        </button>
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-acc/50 bg-accsoft font-mono text-[13px] font-bold text-accink">{'</>'}</span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[15px] font-bold tracking-tight text-ink">Zero<span className="text-acc">→</span>Mastery</span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">full-stack web dev</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={onSearch} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[12px] text-faint transition-colors hover:border-acc hover:text-accink" aria-label="Search the course">
            <Icons.search size={14} />
            <span className="hidden md:inline">Search…</span>
            <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] md:inline">⌘K</kbd>
          </button>
          <div className="hidden items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-1 sm:flex" title={`${doneN} of ${authoredTotal} authored lessons complete`}>
            <ProgressRing pct={pct} size={26} stroke={3} />
            <span className="pr-1 font-mono text-[10.5px] text-faint">{doneN}/{authoredTotal}</span>
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-lg border border-line p-2 text-soft transition-colors hover:border-acc hover:text-accink" aria-label="Toggle theme">
            {theme === "dark" ? <Icons.sun size={16} /> : <Icons.moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ————— sidebar ————— */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { prog } = useProgress();
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true });
  const loc = useLocation();
  const toggle = (id: number) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const isActive = (to: string) => loc.pathname === to;

  const REF_LINKS = [
    { to: "/queue", label: "Generation Queue", icon: "clock" },
    { to: "/search", label: "Course Search", icon: "search" },
    { to: "/ref/glossary", label: "Glossary", icon: "book" },
    { to: "/ref/troubleshooting", label: "Troubleshooting", icon: "bug" },
    { to: "/ref/a11y", label: "A11y Checklist", icon: "a11y" },
    { to: "/ref/design-tokens", label: "Design Tokens", icon: "layers" },
    { to: "/ref/versions", label: "Version Matrix", icon: "refresh" },
    { to: "/ref/status", label: "Generation Log", icon: "terminal" },
    { to: "/ref/manifest", label: "Course Manifest", icon: "map" },
    { to: "/completion", label: "Course Completion", icon: "flag" },
  ] as const;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <nav className="flex-1 px-3 py-4" aria-label="Curriculum">
        <p className="eyebrow mb-3 px-2">Curriculum</p>
        {COURSE.map((vol) => {
          const isOpen = !!open[vol.id];
          const vp = volumeProgress(prog.lessons, vol);
          return (
            <div key={vol.id} className="mb-1">
              <button onClick={() => toggle(vol.id)} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-paper" aria-expanded={isOpen}>
                <span className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-[10.5px] font-bold ${vp.total > 0 && vp.done === vp.total ? "border-acc/50 bg-accsoft text-accink" : "border-line text-faint"}`}>{vol.numeral}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-ink">{vol.title}</span>
                  {vp.total > 0 && <span className="block font-mono text-[9.5px] uppercase tracking-wider text-faint">{vp.done}/{vp.total} lessons</span>}
                </span>
                <Icons.chevD size={14} className={`shrink-0 text-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="mb-2 ml-4 space-y-0.5 border-l border-line pl-3">
                  {vol.modules.map((m) => {
                    const mp = moduleProgress(prog.lessons, m);
                    const battle = BATTLE_REFS.find((b) => b.afterModule === m.id);
                    return (
                      <div key={m.id} className="pt-1.5">
                        <p className="mb-1 flex items-center justify-between gap-2 pr-1">
                          <span className="truncate font-mono text-[10.5px] font-semibold uppercase tracking-wider text-soft">M{m.num} · {m.title}</span>
                          {mp.total > 0 && <span className={`font-mono text-[9.5px] ${mp.done === mp.total ? "text-acc" : "text-faint"}`}>{mp.done}/{mp.total}</span>}
                        </p>
                        <ul className="space-y-0.5">
                          {m.lessons.map((l) => {
                            const ldone = prog.lessons[l.id]?.done;
                            const active = isActive(`/lesson/${l.id}`);
                            return (
                              <li key={l.id}>
                                <Link to={`/lesson/${l.id}`} onClick={onNavigate} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] transition-colors ${active ? "bg-accsoft font-semibold text-accink" : "text-soft hover:bg-paper hover:text-ink"} ${l.status === "planned" ? "opacity-55" : ""}`}>
                                  <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${ldone ? "border-acc bg-acc text-paper" : "border-linestrong/40"}`}>
                                    {ldone && <Icons.check size={9} />}
                                  </span>
                                  <span className="truncate">{l.title}</span>
                                  {l.status === "planned" && <span className="ml-auto shrink-0 rounded border border-line px-1 font-mono text-[8.5px] uppercase text-faint">soon</span>}
                                </Link>
                              </li>
                            );
                          })}
                          {m.lessons.length === 0 && (
                            <li className="px-2 py-1 font-mono text-[10.5px] italic text-faint">queued for a future batch</li>
                          )}
                        </ul>
                        {battle && (
                          <Link to={`/battle/${battle.id}`} onClick={onNavigate} className={`mt-1 flex items-center gap-2 rounded-md border border-err/30 bg-errsoft/25 px-2 py-1.5 text-[12px] font-semibold text-err transition-colors hover:bg-errsoft/40 ${isActive(`/battle/${battle.id}`) ? "ring-1 ring-err/50" : ""}`}>
                            <Icons.sword size={13} /> {battle.title}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <p className="eyebrow mb-3 mt-6 px-2">Practice</p>
        <Link to="/flashcards" onClick={onNavigate} className={`mb-1 flex items-center gap-2.5 rounded-md px-2 py-2 text-[13px] transition-colors ${isActive("/flashcards") ? "bg-accsoft font-semibold text-accink" : "text-soft hover:bg-paper hover:text-ink"}`}>
          <Icons.cards size={15} /> Flashcard Sets
        </Link>

        <p className="eyebrow mb-3 mt-6 px-2">Reference</p>
        {REF_LINKS.map((r) => {
          const Ico = Icons[r.icon as keyof typeof Icons];
          return (
            <Link key={r.to} to={r.to} onClick={onNavigate} className={`mb-0.5 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[12.5px] transition-colors ${isActive(r.to) ? "bg-accsoft font-semibold text-accink" : "text-soft hover:bg-paper hover:text-ink"}`}>
              <Ico size={14} /> {r.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line px-5 py-4">
        <p className="font-mono text-[10px] leading-relaxed text-faint">Zero→Mastery · a living curriculum. Manifest-driven, gap-analyzed, version-verified.</p>
      </div>
    </div>
  );
}

/* ————— search overlay ————— */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => {
    if (!q.trim()) return index.slice(0, 8);
    const needle = q.trim().toLowerCase();
    return index.filter((h) => h.kw.toLowerCase().includes(needle)).slice(0, 12);
  }, [q, index]);

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;
  const go = (to: string) => { onClose(); navigate(to); };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/50 px-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-hard" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Icons.search size={16} className="text-acc" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter" && results[active]) go(results[active].to);
            }}
            placeholder="Search lessons, terms, battles, references…"
            className="w-full bg-transparent font-mono text-[14px] text-ink outline-none placeholder:text-faint"
            aria-label="Search the course"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">esc</kbd>
        </div>
        <ul className="max-h-[46vh] overflow-y-auto py-1.5">
          {results.length === 0 && <li className="px-4 py-6 text-center font-mono text-[12.5px] text-faint">No matches — try “DNS”, “closure”, “idempotent”.</li>}
          {results.map((h, i) => (
            <li key={`${h.to}-${h.title}`}>
              <button onMouseEnter={() => setActive(i)} onClick={() => go(h.to)} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === active ? "bg-accsoft/60" : ""}`}>
                <Icons.search size={14} className={i === active ? "text-accink" : "text-faint"} />
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[14px] font-medium ${h.planned ? "text-faint" : "text-ink"}`}>{h.title}</span>
                  <span className="block truncate font-mono text-[10.5px] uppercase tracking-wider text-faint">{h.kind} · {h.sub}</span>
                </span>
                {h.planned && <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9.5px] uppercase text-faint">planned</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-line px-4 py-2.5">
          <button onClick={() => go(`/search${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`)} className="flex w-full items-center justify-between font-mono text-[11.5px] font-semibold text-acc transition-colors hover:text-accink">
            Open full search — filters, grouped results <Icons.arrow size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ————— mobile drawer ————— */
export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-[300px] border-r border-line bg-surface shadow-hard">
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          <span className="font-display text-[14px] font-bold text-ink">Navigation</span>
          <button onClick={onClose} className="rounded-lg border border-line p-1.5 text-soft hover:border-err hover:text-err" aria-label="Close navigation"><Icons.x size={15} /></button>
        </div>
        <div className="h-[calc(100%-3.5rem)]"><Sidebar onNavigate={onClose} /></div>
      </div>
    </div>
  );
}

/* ————— page shell ————— */
export function Shell({ children, sidebar = true }: { children: ReactNode; sidebar?: boolean }) {
  return (
    <div className="min-h-screen">
      {sidebar && (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-line bg-surface lg:block">
          <div className="h-14 border-b border-line" />
          <div className="h-[calc(100%-3.5rem)]"><Sidebar /></div>
        </aside>
      )}
      <div className={sidebar ? "lg:pl-[280px]" : ""}>
        <main>{children}</main>
      </div>
    </div>
  );
}

export { StatusBadge };
