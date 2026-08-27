import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useProgress, type Lesson } from "./lib/core";
import {
  BATTLE_REFS, BATCHES, COURSE, FLASHCARD_SETS, GLOSSARY, TROUBLESHOOTING,
  courseStats, flatLessons, getBattle, getLesson, getSet, moduleProgress, nextOf,
  orderedContent, prevOf, volumeProgress, volumeStatus,
} from "./data/model";
import { LessonBlocks, FlashcardSession, Quiz } from "./components/blocks";
import { buildIndex } from "./components/chrome";
import { Highlight, Icons, LevelChip, ProgressRing, Reveal, SectionTitle, StatusBadge, useReducedMotion } from "./components/ui";

/* ============================ HOME ============================ */
const MASTERY = [
  { name: "Foundation", desc: "Explain the web, build semantic pages, use Git and the terminal, write basic JavaScript and debug simple errors.", req: "Volume I" },
  { name: "Builder", desc: "Build React apps, model relational data, write SQL, use TypeScript safely, integrate APIs, ship secure CRUD.", req: "Volumes II–V" },
  { name: "Full-Stack", desc: "Independently build authenticated Next.js + PostgreSQL + Supabase apps with RLS, validation, search, files, tests, deployment.", req: "Volumes VI–VIII" },
  { name: "Production", desc: "Design security boundaries, CI/CD, monitoring, caching, queues, email, rate limits, migrations, backups, scaling.", req: "Volumes IX–X" },
  { name: "Mastery", desc: "Evaluate requirements, justify architecture, diagnose multi-layer incidents, review risk, maintain systems over years.", req: "Volume XI + capstones" },
];

function Terminal() {
  const { prog } = useProgress();
  const reduced = useReducedMotion();
  const authored = orderedContent();
  const done = authored.filter((l) => prog.lessons[l.id]?.done).length;
  const next = authored.find((l) => !prog.lessons[l.id]?.done);
  const pct = authored.length ? Math.round((done / authored.length) * 100) : 0;
  const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
  const lines = useMemo(() => [
    { text: "$ zm status --course full-stack", cls: "text-[#8ce9bb]" },
    { text: `volumes        ${COURSE.length} mapped · ${courseStats().modules} modules`, cls: "text-[#a8bcad]" },
    { text: `authored       ${authored.length} lessons · ${BATTLE_REFS.length} boss battle · ${FLASHCARD_SETS.reduce((n, s) => n + s.cards.length, 0)} flashcards`, cls: "text-[#a8bcad]" },
    { text: `progress       ${bar} ${pct}%`, cls: pct > 0 ? "text-[#3fd68f]" : "text-[#a8bcad]" },
    { text: next ? `next           → ${next.title}` : "next           → all authored lessons complete — manifest queues more", cls: "text-[#e3c58a]" },
    { text: "$ zm philosophy --loop", cls: "text-[#8ce9bb]" },
    { text: "learn → practice → break → debug → quiz → ship", cls: "text-[#d6e3d9]" },
  ], [authored.length, done, next, pct, bar]);
  const [reveal, setReveal] = useState(reduced ? lines.length : 0);
  useEffect(() => {
    if (reduced) { setReveal(lines.length); return; }
    setReveal(0);
    const iv = setInterval(() => setReveal((r) => { if (r >= lines.length) { clearInterval(iv); return r; } return r + 1; }), 260);
    return () => clearInterval(iv);
  }, [lines.length, reduced]);
  return (
    <div className="overflow-hidden rounded-xl border border-code-line bg-codebg shadow-hard">
      <div className="flex items-center gap-1.5 border-b border-code-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e87f73]" /><span className="h-2.5 w-2.5 rounded-full bg-[#e3a94e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#3fd68f]" />
        <span className="ml-2 font-mono text-[11px] text-[#63776b]">zm — course console</span>
      </div>
      <pre className="min-h-[190px] px-4 py-4 font-mono text-[12.5px] leading-[1.8]">
        {lines.slice(0, reveal).map((l, i) => <div key={i} className={l.cls}>{l.text}</div>)}
        <span className="inline-block h-4 w-2 translate-y-0.5 bg-[#3fd68f] opacity-80" style={{ animation: "blink 1.1s steps(2,start) infinite" }} />
      </pre>
    </div>
  );
}

function ContinueCard() {
  const { prog } = useProgress();
  const next = orderedContent().find((l) => !prog.lessons[l.id]?.done);
  const battle = next ? BATTLE_REFS.find((b) => b.volumeId === next.volume && b.afterModule === `v${next.volume}m${next.module}`) : undefined;
  return (
    <div className="card-hard mb-6 flex flex-col gap-4 border-acc/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <p className="eyebrow mb-1.5">{next ? "// continue where you left off" : "// all authored lessons complete"}</p>
        {next ? (
          <>
            <h3 className="truncate font-display text-lg font-bold text-ink sm:text-xl">{next.title}</h3>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-faint">volume {next.volume} · module {next.module} · ~{next.minutes} min</p>
          </>
        ) : (
          <h3 className="font-display text-lg font-bold text-ink sm:text-xl">You've cleared every authored lesson.</h3>
        )}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        {next && (
          <Link to={`/lesson/${next.id}`} className="group inline-flex items-center gap-2 rounded-lg border border-linestrong bg-ink px-5 py-3 font-mono text-[13px] font-semibold text-paper transition-all hover:-translate-y-0.5">
            start lesson <Icons.arrow size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
        {battle && (
          <Link to={`/battle/${battle.id}`} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-3 font-mono text-[12px] font-semibold text-soft transition-colors hover:border-err hover:text-err">
            <Icons.sword size={14} /> boss battle
          </Link>
        )}
        {!next && <Link to="/queue" className="link-acc inline-flex items-center gap-1.5 font-mono text-[12.5px] font-semibold"><Icons.clock size={14} /> generation queue →</Link>}
      </div>
    </div>
  );
}

export function Home() {
  const { prog } = useProgress();
  const stats = courseStats();
  const [openVols, setOpenVols] = useState<Record<number, boolean>>({ 1: true });
  const toggleVol = (id: number) => setOpenVols((o) => ({ ...o, [id]: !o[id] }));
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
      {/* Masthead — terminal first, not a centered hero */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow mb-3">// a living curriculum · batch-generated, review-gated</p>
          <h1 className="font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.2rem]">
            Full-Stack Web Development.<br />
            <span className="text-acc">Zero</span> <span className="text-faint">→</span> Mastery.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-soft">
            HTML to production incidents: a <strong className="font-semibold text-ink">manifest-driven</strong> curriculum covering JavaScript, TypeScript, React, Next.js, PostgreSQL, Supabase, security, testing, and deployment — taught the way hard things are actually learned:{" "}
            <em className="text-ink">model it, break it, debug it, ship it.</em>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/lesson/what-happens-when" className="group inline-flex items-center gap-2.5 rounded-lg border border-linestrong bg-ink px-6 py-3.5 font-mono text-[13.5px] font-bold uppercase tracking-wider text-paper transition-all hover:-translate-y-0.5 hover:shadow-hard">
              <Icons.play size={16} className="text-acc" /> Start with the web
              <Icons.arrow size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/queue" className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3.5 font-mono text-[12.5px] font-semibold text-soft transition-colors hover:border-acc hover:text-accink">
              <Icons.clock size={15} /> What ships next
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            {[
              [String(stats.volumes), "volumes mapped"],
              [String(stats.lessonsImplemented + stats.lessonsDraft), "lessons authored"],
              [String(FLASHCARD_SETS.reduce((n, s) => n + s.cards.length, 0)), "flashcards"],
              [String(GLOSSARY.length), "glossary terms"],
            ].map(([n, l]) => (
              <div key={l} className="bg-surface px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{l}</dt>
                <dd className="font-display text-xl font-bold text-ink">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Terminal />
      </div>

      {/* Curriculum map */}
      <section className="pt-16">
        <SectionTitle kicker="curriculum map" title="The whole journey, honestly statused" sub="Implemented lessons are complete learning loops; planned items are scoped for future bounded generation batches — never silently skipped." />
        <ContinueCard />
        <div className="space-y-3">
          {COURSE.map((vol, vi) => {
            const open = !!openVols[vol.id];
            const vp = volumeProgress(prog.lessons, vol);
            const st = volumeStatus(vol);
            const pct = vp.total ? (vp.done / vp.total) * 100 : 0;
            return (
              <Reveal key={vol.id} delay={Math.min(vi * 40, 200)}>
                <div className={`card overflow-hidden transition-shadow hover:shadow-hard-sm ${open ? "shadow-hard-sm" : ""}`}>
                  <button onClick={() => toggleVol(vol.id)} className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5" aria-expanded={open}>
                    <span className={`flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border font-display text-[15px] font-bold ${st === "implemented" ? "border-acc/50 bg-accsoft text-accink" : st === "draft" ? "border-amber/50 bg-ambersoft text-amber" : "border-line text-faint"}`}>{vol.numeral}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[16px] font-bold text-ink">{vol.title}</span>
                        <StatusBadge status={st} />
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-soft">{vol.blurb}</span>
                      {vp.total > 0 && (
                        <span className="mt-2 block h-1.5 max-w-xs overflow-hidden rounded-full bg-line">
                          <span className="block h-full rounded-full bg-acc transition-all duration-700" style={{ width: `${pct}%` }} />
                        </span>
                      )}
                    </span>
                    <span className="hidden shrink-0 font-mono text-[11px] text-faint sm:block">{vol.modules.length} modules</span>
                    <Icons.chevD size={16} className={`shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="grid gap-3 border-t border-line bg-paper/50 px-4 py-4 sm:grid-cols-2 sm:px-5">
                      {vol.modules.map((m) => {
                        const mp = moduleProgress(prog.lessons, m);
                        const battle = BATTLE_REFS.find((b) => b.afterModule === m.id);
                        return (
                          <div key={m.id} className="rounded-lg border border-line bg-surface p-3.5">
                            <p className="mb-1 flex items-center justify-between gap-2">
                              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-soft">M{m.num} · {m.title}</span>
                              <StatusBadge status={m.status} />
                            </p>
                            <p className="mb-2 text-[12.5px] leading-relaxed text-soft">{m.blurb}</p>
                            <ul className="space-y-1">
                              {m.lessons.map((l) => (
                                <li key={l.id}>
                                  <Link to={`/lesson/${l.id}`} className={`group flex items-center gap-2 text-[12.5px] transition-colors hover:text-accink ${prog.lessons[l.id]?.done ? "text-faint" : "text-soft"}`}>
                                    <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${prog.lessons[l.id]?.done ? "border-acc bg-acc text-paper" : "border-linestrong/40"}`}>
                                      {prog.lessons[l.id]?.done && <Icons.check size={9} />}
                                    </span>
                                    <span className={`truncate ${prog.lessons[l.id]?.done ? "line-through decoration-acc/40" : ""}`}>{l.title}</span>
                                    {l.status === "planned" && <span className="ml-auto shrink-0 rounded border border-line px-1 font-mono text-[8.5px] uppercase text-faint">queued</span>}
                                  </Link>
                                </li>
                              ))}
                              {m.lessons.length === 0 && <li className="font-mono text-[10.5px] italic text-faint">queued for a future batch</li>}
                            </ul>
                            {battle && <Link to={`/battle/${battle.id}`} className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-err hover:underline"><Icons.sword size={12} /> {battle.title}</Link>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Mastery rail */}
      <section className="pt-16">
        <SectionTitle kicker="mastery levels" title="Five stages, measured by what you can do" sub="Competency definitions, not badges for page visits. Each stage maps to the volumes that build it." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {MASTERY.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i * 60, 240)}>
              <div className="card-hard h-full p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-display text-[17px] font-bold text-ink">{i + 1}. {m.name}</span>
                  <LevelChip level={m.name as never} />
                </div>
                <p className="mb-3 text-[13px] leading-[1.7] text-soft">{m.desc}</p>
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{m.req}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Practice & reference */}
      <section className="pt-16">
        <SectionTitle kicker="practice & reference" title="Retrieval practice and lookup surfaces" sub="Flashcards for spaced repetition, boss battles for cumulative assessment, and references optimized for lookup — each cross-linked to its teaching lesson." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/flashcards", icon: "cards", title: "Flashcard Sets", sub: `${FLASHCARD_SETS.length} sets · ${FLASHCARD_SETS.reduce((n, s) => n + s.cards.length, 0)} cards`, desc: "Flip, self-grade, and let missed cards come back tomorrow." },
            { to: "/battle/gauntlet-m1", icon: "sword", title: "Boss Battles", sub: `${BATTLE_REFS.length} assessment · pass ≥ 70%`, desc: "Architecture + debugging + prediction, with remediation links." },
            { to: "/ref/glossary", icon: "book", title: "Glossary", sub: `${GLOSSARY.length} terms`, desc: "Every term defined where it's introduced, linked back to the lesson." },
            { to: "/ref/troubleshooting", icon: "bug", title: "Troubleshooting", sub: `${TROUBLESHOOTING.length} symptoms`, desc: "Diagnose by symptom: causes, layer, fix, and prevention." },
          ].map((c, i) => {
            const Ico = Icons[c.icon as keyof typeof Icons];
            return (
              <Reveal key={c.to} delay={Math.min(i * 60, 240)}>
                <Link to={c.to} className="card-hard group flex h-full flex-col p-5">
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-acc/40 bg-accsoft text-accink transition-transform group-hover:-rotate-6"><Ico size={17} /></span>
                  <span className="font-display text-[15.5px] font-bold text-ink">{c.title}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{c.sub}</span>
                  <span className="mt-2 text-[12.5px] leading-relaxed text-soft">{c.desc}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <p className="font-mono text-[11.5px] text-faint">Zero→Mastery · living curriculum — manifest-driven, gap-analyzed, version-verified.</p>
        <p className="font-mono text-[11.5px] text-faint"><LevelChip level="Foundation" /></p>
      </footer>
    </div>
  );
}

/* ============================ LESSON ============================ */
export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = id ? getLesson(id) : undefined;
  const tocRef = useRef<HTMLDivElement>(null);
  const [activeH, setActiveH] = useState<string>("");

  const headings = useMemo(() => (lesson?.blocks ?? []).filter((b) => b.t === "h2") as { t: "h2"; id: string; text: string }[], [lesson]);

  useEffect(() => {
    if (!headings.length) return;
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActiveH(e.target.id); },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    headings.forEach((h) => { const el = document.getElementById(h.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [headings]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="eyebrow mb-3">404 · lesson not found</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-ink">No lesson by that id.</h1>
        <Link to="/" className="link-acc font-mono text-[13px] font-semibold">← back to the roadmap</Link>
      </div>
    );
  }

  if (lesson.status === "planned") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <nav className="mb-6 font-mono text-[11.5px] text-faint" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accink">roadmap</Link> / <span>volume {lesson.volume}</span> / <span className="text-accink">{lesson.id}</span>
        </nav>
        <div className="card-hard p-8">
          <StatusBadge status="planned" className="mb-4" />
          <h1 className="mb-3 font-display text-2xl font-bold text-ink">{lesson.title}</h1>
          <p className="mb-4 text-[14.5px] leading-[1.8] text-soft">{lesson.summary}</p>
          <p className="mb-6 text-[13.5px] leading-[1.8] text-faint">This lesson is scoped in the manifest and will be authored during a future bounded generation batch. Nothing here is a placeholder pretending to be content.</p>
          <Link to="/queue" className="inline-flex items-center gap-2 rounded-lg border border-linestrong bg-ink px-5 py-3 font-mono text-[12.5px] font-semibold text-paper transition-transform hover:-translate-y-0.5">
            <Icons.clock size={15} /> See it on the generation queue
          </Link>
        </div>
      </div>
    );
  }

  const prev = prevOf(lesson.id);
  const next = nextOf(lesson.id);

  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="min-w-0">
        <nav className="mb-5 font-mono text-[11.5px] text-faint" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accink">roadmap</Link> / <Link to={`/#/`} className="hover:text-accink">volume {lesson.volume}</Link> / <span className="text-accink">module {lesson.module}</span>
        </nav>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <StatusBadge status={lesson.status} />
          <LevelChip level={lesson.level} />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[10.5px] text-faint"><Icons.clock size={11} /> ~{lesson.minutes} min</span>
        </div>
        <h1 className="mb-4 font-display text-[2rem] font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]">{lesson.title}</h1>
        <p className="mb-6 max-w-3xl text-[16px] leading-[1.85] text-soft">{lesson.summary}</p>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="card border-l-4 border-acc p-4">
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accink"><Icons.target size={13} /> You will learn to</p>
            <ul className="space-y-1.5">
              {lesson.objectives.map((o, i) => <li key={i} className="flex gap-2 text-[13px] leading-[1.6] text-soft"><Icons.check size={13} className="mt-0.5 shrink-0 text-acc" />{o}</li>)}
            </ul>
          </div>
          <div className="card border-l-4 border-info p-4">
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-info"><Icons.book size={13} /> Prerequisites & concepts</p>
            <p className="mb-2 text-[12.5px] leading-relaxed text-soft">
              {lesson.prereqs.length ? lesson.prereqs.map((pId, i) => { const pl = getLesson(pId); return pl ? <span key={pId}><Link to={`/lesson/${pId}`} className="link-acc font-mono text-[12px]">{pl.title}</Link>{i < lesson.prereqs.length - 1 && ", "}</span> : <span key={pId} className="font-mono text-[12px]">{pId}</span>; }) : "None — you're ready."}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lesson.concepts.map((c) => <span key={c} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10.5px] text-soft">{c}</span>)}
            </div>
          </div>
        </div>

        <LessonBlocks blocks={lesson.blocks ?? []} lessonId={lesson.id} />

        <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Lesson pagination">
          {prev ? (
            <Link to={`/lesson/${prev.id}`} className="card group p-4 transition-colors hover:border-acc">
              <p className="mb-1 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-faint"><Icons.arrow size={12} className="rotate-180" /> Previous</p>
              <p className="truncate text-[14px] font-semibold text-ink group-hover:text-accink">{prev.title}</p>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/lesson/${next.id}`} className="card group p-4 text-right transition-colors hover:border-acc sm:col-start-2">
              <p className="mb-1 flex items-center justify-end gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-faint">Next <Icons.arrow size={12} /></p>
              <p className="truncate text-[14px] font-semibold text-ink group-hover:text-accink">{next.title}</p>
            </Link>
          )}
        </nav>
      </article>

      {headings.length > 0 && (
        <aside className="hidden lg:block" aria-label="Table of contents">
          <div ref={tocRef} className="sticky top-20">
            <p className="eyebrow mb-3">On this page</p>
            <ul className="space-y-1 border-l border-line">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className={`-ml-px block border-l-2 py-1 pl-3 text-[12.5px] transition-colors ${activeH === h.id ? "border-acc font-semibold text-accink" : "border-transparent text-soft hover:text-ink"}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

/* ============================ BOSS BATTLE ============================ */
export function BattlePage() {
  const { id } = useParams<{ id: string }>();
  const battle = id ? getBattle(id) : undefined;
  const { prog, recordBattle } = useProgress();
  const [sectionResults, setSectionResults] = useState<Record<number, { score: number; total: number }>>({});

  const sections = battle?.sections ?? [];
  const totalQ = sections.reduce((n, s) => n + s.questions.length, 0);
  const totals = { score: Object.values(sectionResults).reduce((n, r) => n + r.score, 0), total: totalQ };
  const allDone = sections.length > 0 && sections.every((_, i) => sectionResults[i]);
  useEffect(() => {
    if (battle && allDone) recordBattle(battle.id, totals.score, totals.total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone, battle?.id]);

  if (!battle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="eyebrow mb-3">404 · battle not found</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-ink">No battle by that id.</h1>
        <Link to="/" className="link-acc font-mono text-[13px] font-semibold">← back to the roadmap</Link>
      </div>
    );
  }
  const saved = prog.battles[battle.id];
  const passed = totals.total > 0 && totals.score / totals.total >= battle.passPct / 100;
  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
      <nav className="mb-6 font-mono text-[11.5px] text-faint" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-accink">roadmap</Link> / <span className="text-accink">boss battle</span>
      </nav>
      <div className="card-hard mb-8 overflow-hidden">
        <div className="border-b border-code-line bg-codebg px-5 py-3"><p className="font-mono text-[11px] text-[#93a89b]"><span className="text-[#e87f73]">⚔</span> {battle.subtitle}</p></div>
        <div className="p-6">
          <h1 className="mb-2 font-display text-[1.9rem] font-bold tracking-tight text-ink">{battle.title}</h1>
          {battle.intro.map((p, i) => <p key={i} className="mb-2.5 max-w-2xl text-[14.5px] leading-[1.8] text-soft">{p}</p>)}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-lg border border-err/40 bg-errsoft px-3 py-1.5 font-mono text-[12px] font-bold text-err"><Icons.sword size={14} /> pass ≥ {battle.passPct}%</span>
            <span className="font-mono text-[11.5px] text-faint">{totalQ} questions · {battle.sections.length} fronts</span>
            {saved && <span className={`font-mono text-[11.5px] font-semibold ${saved.passed ? "text-acc" : "text-amber"}`}>best: {saved.score}/{saved.total} {saved.passed ? "· passed ✓" : ""}</span>}
          </div>
          <ul className="mt-4 space-y-1">
            {battle.rules.map((r, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-faint"><span className="text-acc">▸</span>{r}</li>)}
          </ul>
        </div>
      </div>
      <div className="space-y-10">
        {battle.sections.map((s, si) => (
          <section key={si}>
            <p className="eyebrow mb-1">{`// front ${si + 1}`}</p>
            <h2 className="mb-1 font-display text-xl font-bold text-ink">{s.title}</h2>
            <p className="mb-4 text-[13.5px] text-soft">{s.desc}</p>
            <Quiz questions={s.questions} onResult={(score, total) => setSectionResults((r) => ({ ...r, [si]: { score, total } }))} />
          </section>
        ))}
      </div>
      {allDone && (
        <div className={`card-hard mt-10 p-6 text-center ${passed ? "border-acc/50" : "border-err/50"}`}>
          <p className="eyebrow mb-2">{passed ? "// victory" : "// not yet"}</p>
          <h3 className={`mb-2 font-display text-2xl font-bold ${passed ? "text-accink" : "text-err"}`}>{totals.score}/{totals.total} — {passed ? "passed" : "below the bar"}</h3>
          <p className="mx-auto max-w-md text-[14px] leading-relaxed text-soft">
            {passed ? "The Foundation holds. Review any missed questions via their remediation links, then continue the roadmap." : `You need ${Math.ceil((battle.passPct / 100) * totals.total)} to pass. Every missed question links to its teaching lesson — remediation, not shame.`}
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================ FLASHCARDS ============================ */
export function FlashcardsIndex() {
  const { prog } = useProgress();
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <SectionTitle kicker="retrieval practice" title="Flashcard sets" sub="Drill the vocabulary and mental models each lesson introduced, so they survive past the quiz. Self-grade honestly — the scheduler is you." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLASHCARD_SETS.map((s, i) => {
          const known = (prog.cards[s.id] ?? []).length;
          const pct = (known / s.cards.length) * 100;
          return (
            <Reveal key={s.id} delay={Math.min(i * 70, 280)}>
              <Link to={`/flashcards/${s.id}`} className="card-hard group flex h-full flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-acc/40 bg-accsoft text-accink transition-transform group-hover:-rotate-6"><Icons.cards size={17} /></span>
                  <span className="font-mono text-[11px] text-faint">{s.cards.length} cards</span>
                </div>
                <h3 className="font-display text-[16.5px] font-bold text-ink">{s.title}</h3>
                <p className="mb-4 mt-1 text-[13px] leading-relaxed text-soft">{s.blurb}</p>
                <div className="mt-auto">
                  <div className="mb-1.5 flex justify-between font-mono text-[10.5px] text-faint"><span>known</span><span className={known === s.cards.length ? "text-acc" : ""}>{known}/{s.cards.length}</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-acc transition-all duration-700" style={{ width: `${pct}%` }} /></div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function FlashcardsSessionPage() {
  const { setId } = useParams<{ setId: string }>();
  const set = setId ? getSet(setId) : undefined;
  if (!set) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="eyebrow mb-3">404 · set not found</p>
        <Link to="/flashcards" className="link-acc font-mono text-[13px] font-semibold">← all flashcard sets</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
      <nav className="mb-6 font-mono text-[11.5px] text-faint" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-accink">roadmap</Link> / <Link to="/flashcards" className="hover:text-accink">flashcards</Link> / <span className="text-accink">{set.id}</span>
      </nav>
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">flashcard session</p>
        <h1 className="font-display text-[1.9rem] font-bold tracking-tight text-ink">{set.title}</h1>
      </div>
      <FlashcardSession set={set} />
    </div>
  );
}

/* ============================ SEARCH PAGE ============================ */
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [kind, setKind] = useState<string>("all");
  const index = useMemo(buildIndex, []);
  const all = useMemo(() => {
    if (!q.trim()) return index;
    const needle = q.trim().toLowerCase();
    return index.filter((h) => h.kw.toLowerCase().includes(needle));
  }, [q, index]);
  const kinds = useMemo(() => Array.from(new Set(all.map((h) => h.kind))), [all]);
  const results = kind === "all" ? all : all.filter((h) => h.kind === kind);
  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
      <SectionTitle kicker="course search" title="Search everything the course knows" sub="Lessons, boss battles, flashcards, and references — every term matched against titles, summaries, and concepts." />
      <label className="card-hard mb-5 flex items-center gap-3 px-4 py-3.5 focus-within:border-acc">
        <Icons.search size={18} className="shrink-0 text-acc" />
        <input autoFocus value={q} onChange={(e) => { setKind("all"); setParams(e.target.value ? { q: e.target.value } : {}, { replace: true }); }} placeholder="Try “render pipeline”, “closure”, “idempotent”…" className="w-full bg-transparent font-mono text-[15px] text-ink outline-none placeholder:text-faint" aria-label="Search the course" />
      </label>
      <div className="mb-6 flex flex-wrap gap-1.5">
        <button onClick={() => setKind("all")} className={`rounded-full border px-3 py-1.5 font-mono text-[11.5px] transition-colors ${kind === "all" ? "border-acc bg-accsoft font-bold text-accink" : "border-line text-soft hover:border-acc hover:text-accink"}`}>all · {all.length}</button>
        {kinds.map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`rounded-full border px-3 py-1.5 font-mono text-[11.5px] transition-colors ${kind === k ? "border-acc bg-accsoft font-bold text-accink" : "border-line text-soft hover:border-acc hover:text-accink"}`}>{k} · {all.filter((h) => h.kind === k).length}</button>
        ))}
      </div>
      {results.length === 0 ? (
        <p className="py-10 text-center font-mono text-[13px] text-faint">Nothing matches “{q}”. Try a broader term.</p>
      ) : (
        <div className="space-y-2">
          {results.map((h, i) => (
            <Link key={`${h.to}-${h.title}-${i}`} to={h.to} className="card group flex items-center gap-3.5 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-acc hover:shadow-hard-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-soft transition-colors group-hover:border-acc/50 group-hover:bg-accsoft group-hover:text-accink"><Icons.search size={15} /></span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-[14.5px] font-semibold ${h.planned ? "text-faint" : "text-ink"}`}><Highlight text={h.title} q={q} /></span>
                <span className="block truncate font-mono text-[11px] text-faint">{h.kind} · <Highlight text={h.sub} q={q} /></span>
              </span>
              {h.planned && <StatusBadge status="planned" className="hidden sm:inline-flex" />}
              <Icons.arrow size={15} className="shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-acc" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================ QUEUE ============================ */
export function QueuePage() {
  const meta: Record<string, { label: string; cls: string }> = {
    shipped: { label: "shipped", cls: "border-acc/50 bg-accsoft text-accink" },
    next: { label: "up next", cls: "border-amber/50 bg-ambersoft text-amber" },
    queued: { label: "queued", cls: "border-line text-soft" },
    future: { label: "future", cls: "border-line text-faint" },
  };
  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
      <SectionTitle kicker="bounded generation" title="The generation queue" sub="This course is developed in bounded, reviewable batches — one coherent scope per pass, then stop for review. Here's the pipeline, in order." />
      <div className="space-y-3">
        {BATCHES.map((b, i) => {
          const mt = meta[b.status];
          return (
            <Reveal key={b.id} delay={Math.min(i * 50, 250)}>
              <div className={`card-hard p-5 ${b.status === "next" ? "border-amber/60" : ""}`}>
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md border border-linestrong bg-ink px-2 py-0.5 font-mono text-[11px] font-bold text-paper">{b.id}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-wider ${mt.cls}`}>{mt.label}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{b.scope}</span>
                </div>
                <h3 className="font-display text-[16.5px] font-bold text-ink">{b.title}</h3>
                <p className="mt-1 text-[13.5px] leading-[1.7] text-soft">{b.summary}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="card mt-8 border-l-4 border-info p-4 text-[13.5px] leading-relaxed text-soft">
        <strong className="font-semibold text-ink">Why bounded?</strong> Quality and reviewability beat generation volume. Each batch implements one module or lesson group to production standard, updates the manifest, and stops — so every pass is inspectable and nothing ships half-done.
      </p>
    </div>
  );
}

/* ============================ REFERENCES ============================ */
function RefShell({ kicker, title, sub, children }: { kicker: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <SectionTitle kicker={kicker} title={title} sub={sub} />
      {children}
    </div>
  );
}

export function GlossaryPage() {
  const [q, setQ] = useState("");
  const list = GLOSSARY.filter((g) => (g.term + g.def).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <RefShell kicker="reference · vocabulary" title="Glossary" sub="Terms defined where they're introduced, linked back to the teaching lesson.">
      <label className="card mb-6 flex items-center gap-2.5 px-3.5 py-2.5 focus-within:border-acc">
        <Icons.search size={15} className="text-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter terms…" className="w-full bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-faint" aria-label="Filter glossary" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((g, i) => (
          <Reveal key={g.term} delay={Math.min((i % 6) * 40, 200)}>
            <div className="card h-full p-4 transition-shadow hover:shadow-hard-sm">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <h3 className="font-mono text-[14px] font-bold text-ink">{g.term}</h3>
                <span className="rounded bg-accsoft/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accink">{g.domain}</span>
              </div>
              <p className="text-[13.5px] leading-[1.65] text-soft">{g.def}</p>
              {g.lesson && <Link to={`/lesson/${g.lesson}`} className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold text-acc hover:text-accink"><Icons.book size={12} /> introduced in lesson →</Link>}
            </div>
          </Reveal>
        ))}
      </div>
      {list.length === 0 && <p className="py-10 text-center font-mono text-[13px] text-faint">No terms match “{q}”.</p>}
    </RefShell>
  );
}

export function TroubleshootingPage() {
  const [open, setOpen] = useState<string | null>(TROUBLESHOOTING[0]?.id ?? null);
  return (
    <RefShell kicker="reference · debugging index" title="Troubleshooting by symptom" sub="Engineers experience symptoms, not technology names. Each entry walks: causes → layer → diagnosis → fix → prevention.">
      <div className="space-y-3">
        {TROUBLESHOOTING.map((t) => {
          const isOpen = open === t.id;
          return (
            <div key={t.id} className={`card overflow-hidden transition-shadow ${isOpen ? "shadow-hard-sm" : ""}`}>
              <button onClick={() => setOpen(isOpen ? null : t.id)} className="flex w-full items-start gap-3 px-5 py-4 text-left" aria-expanded={isOpen}>
                <Icons.bug size={17} className="mt-0.5 shrink-0 text-err" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-semibold leading-snug text-ink">{t.symptom}</span>
                  <span className="mt-1 inline-block rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">layer: {t.layer}</span>
                </span>
                <Icons.chevD size={16} className={`mt-1 shrink-0 text-faint transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="grid gap-4 border-t border-line bg-paper/60 px-5 py-5 md:grid-cols-2">
                  <div>
                    <p className="mb-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-amber">Likely causes</p>
                    <ul className="space-y-1.5">{t.causes.map((c, i) => <li key={i} className="flex gap-2 text-[13.5px] leading-relaxed text-soft"><span className="text-amber">▸</span>{c}</li>)}</ul>
                    <p className="mb-1.5 mt-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-info">Diagnose</p>
                    <ol className="space-y-1.5">{t.diagnose.map((c, i) => <li key={i} className="flex gap-2 text-[13.5px] leading-relaxed text-soft"><span className="font-mono text-[11.5px] font-bold text-info">{i + 1}.</span>{c}</li>)}</ol>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-acc/40 bg-accsoft/40 p-3.5"><p className="mb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accink">Fix</p><p className="text-[13.5px] leading-relaxed text-soft">{t.fix}</p></div>
                    <div className="rounded-lg border border-info/40 bg-infosoft/40 p-3.5"><p className="mb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-info">Prevention</p><p className="text-[13.5px] leading-relaxed text-soft">{t.prevent}</p></div>
                    {t.related && <Link to={`/lesson/${t.related}`} className="link-acc inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold"><Icons.book size={13} /> taught in the debugging-first way →</Link>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </RefShell>
  );
}

/* ============================ A11Y CHECKLIST ============================ */
const A11Y_GROUPS: { title: string; icon: keyof typeof Icons; lesson: string; items: string[] }[] = [
  { title: "Semantic structure", icon: "layers", lesson: "html-as-structure", items: ["Exactly one <h1>; heading levels never skip", "Landmarks present: header, nav, main, footer", "Navigation lives in <nav>, content in <main>", "Lists use <ul>/<ol>, tables reserved for data"] },
  { title: "Forms & labels", icon: "book", lesson: "html-as-structure", items: ["Every input has an associated <label> (for/id or wrapping)", "No placeholder standing in for a label", "Related controls grouped with <fieldset>/<legend>", "Errors are described to the field (aria-describedby) and announced"] },
  { title: "Keyboard & focus", icon: "zap", lesson: "a11y-tree-keyboard", items: ["Every interactive control reachable by Tab, in visual order", "Visible :focus-visible style — never outline:none without replacement", "No positive tabindex anywhere", "Modals trap focus and return it to the trigger on close"] },
  { title: "Images & media", icon: "bulb", lesson: "html-as-structure", items: ["Informative images describe content; functional images describe the action", "Decorative images use empty alt=\"\" (attribute present)", "Video has captions; audio has a transcript"] },
  { title: "Color, contrast & motion", icon: "gauge", lesson: "a11y-tree-keyboard", items: ["Body text ≥ 4.5:1 contrast in BOTH themes", "Color is never the only signal (icon/text pairs it)", "prefers-reduced-motion honored", "Layout survives 200% zoom without horizontal scroll"] },
  { title: "Dynamic state & ARIA", icon: "a11y", lesson: "aria-when-needed", items: ["Native element used before any ARIA", "aria-expanded/pressed/current kept in sync by code", "Live regions: role=status (polite) vs role=alert (assertive), used correctly", "Icon-only controls have accessible names; decorative icons are aria-hidden"] },
];

const A11Y_KEY = "ztm.a11y-checks.v1";
function loadA11y(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(A11Y_KEY) ?? "[]") as string[]); } catch { return new Set(); }
}

export function A11yChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(loadA11y);
  useEffect(() => { try { localStorage.setItem(A11Y_KEY, JSON.stringify([...checked])); } catch { /* ignore */ } }, [checked]);
  const total = A11Y_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const pct = total ? (checked.size / total) * 100 : 0;
  const toggle = (id: string) => setChecked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  return (
    <RefShell kicker="reference · ship it accessibly" title="Accessibility Checklist" sub="Run these before calling any page done — progress saves in your browser. Each group links to the lesson that teaches it, so this stays a teaching tool, not a guilt list.">
      <div className="card-hard mb-8 flex flex-wrap items-center gap-5 p-5">
        <ProgressRing pct={pct} size={64} stroke={5} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold text-ink">{checked.size} of {total} checks verified</p>
          <p className="text-[13px] leading-relaxed text-soft">{pct === 100 ? "Every check passes — genuinely shippable. Re-run after your next feature; accessibility regresses silently." : "Work top-down: structure, then forms, then keyboard, then the ARIA residue. Don't skip to ARIA."}</p>
        </div>
        <button onClick={() => setChecked(new Set())} disabled={checked.size === 0} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 font-mono text-[11.5px] font-semibold text-soft transition-colors hover:border-err hover:text-err disabled:cursor-not-allowed disabled:opacity-40"><Icons.refresh size={13} /> Reset</button>
      </div>
      <div className="space-y-8">
        {A11Y_GROUPS.map((g, gi) => {
          const Ico = Icons[g.icon];
          const gDone = g.items.filter((it) => checked.has(g.title + it)).length;
          const full = gDone === g.items.length;
          return (
            <Reveal key={g.title} delay={Math.min(gi * 50, 200)}>
              <section aria-label={g.title}>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border border-acc/40 bg-accsoft text-accink`}><Ico size={15} /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[16px] font-bold text-ink">{g.title}</h3>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${full ? "border-acc/40 bg-accsoft text-accink" : "border-line text-faint"}`}>{gDone}/{g.items.length}</span>
                  <Link to={`/lesson/${g.lesson}`} className="link-acc inline-flex items-center gap-1 font-mono text-[11px] font-semibold"><Icons.book size={12} /> lesson</Link>
                </div>
                <div className="card divide-y divide-line overflow-hidden">
                  {g.items.map((it) => {
                    const id = g.title + it;
                    const on = checked.has(id);
                    return (
                      <button key={id} onClick={() => toggle(id)} aria-pressed={on} className={`group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${on ? "bg-accsoft/30" : "hover:bg-accsoft/20"}`}>
                        <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-all ${on ? "border-acc bg-acc text-paper" : "border-linestrong/50"}`}>{on && <Icons.check size={11} />}</span>
                        <span className={`text-[13.5px] leading-snug ${on ? "text-faint line-through decoration-acc/50" : "text-ink"}`}>{it}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
      <p className="card mt-8 border-l-4 border-acc p-4 text-[13.5px] leading-relaxed text-soft"><strong className="font-semibold text-ink">The ordering is the pedagogy:</strong> semantic HTML first, keyboard & focus second, ARIA last. Most "accessibility work" is over by the time you reach the ARIA section — if yours isn't, revisit <Link to="/lesson/html-as-structure" className="link-acc font-semibold">HTML Is Meaning</Link>.</p>
    </RefShell>
  );
}

const COLOR_TOKENS = [
  { group: "Surfaces", tokens: [["--paper", "page background"], ["--surface", "cards & panels"], ["--raise", "raised elements"], ["--code-bg", "code blocks"]] },
  { group: "Ink", tokens: [["--ink", "primary text"], ["--ink-soft", "body copy"], ["--ink-faint", "meta & captions"], ["--line", "hairline borders"]] },
  { group: "Semantic", tokens: [["--acc", "primary / success"], ["--amber", "draft / warning"], ["--err", "error / security"], ["--info", "informational"]] },
];

export function DesignTokensPage() {
  return (
    <RefShell kicker="reference · visual system" title="Design tokens" sub="Every component is built from these CSS custom properties — no hard-coded colors. Light and dark are two mappings of the same semantic names (flip the theme in the top bar to watch them remap live).">
      <div className="space-y-6">
        {COLOR_TOKENS.map((g) => (
          <div key={g.group}>
            <p className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{g.group}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {g.tokens.map(([name, use]) => (
                <div key={name} className="card flex items-center gap-3.5 p-3.5">
                  <span className="h-11 w-11 shrink-0 rounded-lg border border-line" style={{ background: `var(${name})` }} />
                  <span>
                    <span className="block font-mono text-[12.5px] font-bold text-ink">{name}</span>
                    <span className="block text-[12px] text-faint">{use}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="mb-4 mt-12 font-display text-lg font-bold text-ink">Typography</h3>
      <div className="card divide-y divide-line">
        {[
          ["Display — Space Grotesk 700", "font-display text-3xl font-bold", "Headlines and lesson titles"],
          ["Body — IBM Plex Sans 400", "font-body text-base", "Reading text at ~15.5px / 1.85 line height"],
          ["Mono — JetBrains Mono 500", "font-mono text-sm font-medium", "Eyebrows, chips, terminals, code"],
        ].map(([label, cls, note]) => (
          <div key={label} className="flex flex-wrap items-baseline justify-between gap-3 p-4">
            <span>
              <span className={`block text-ink ${cls}`}>{label.split("—")[0].trim()}</span>
              <span className="text-[12px] text-faint">{note}</span>
            </span>
            <code className="font-mono text-[11px] text-accink">{cls}</code>
          </div>
        ))}
      </div>
      <h3 className="mb-4 mt-12 font-display text-lg font-bold text-ink">Elevation & radius</h3>
      <div className="flex flex-wrap gap-6">
        <div className="card h-24 w-36 p-3" style={{ boxShadow: "3px 3px 0 0 var(--shadow-ink)" }}><code className="font-mono text-[10.5px] text-faint">shadow-hard-sm<br />3px offset</code></div>
        <div className="card h-24 w-36 p-3" style={{ boxShadow: "5px 5px 0 0 var(--shadow-ink)" }}><code className="font-mono text-[10.5px] text-faint">shadow-hard<br />5px offset</code></div>
        <div className="flex items-end gap-3">
          {[["6px", "rounded-md"], ["10px", "rounded-[10px]"], ["full", "rounded-full"]].map(([l, c]) => (
            <span key={l} className="flex flex-col items-center gap-1.5"><span className={`h-12 w-16 border-2 border-acc ${c}`} /><code className="font-mono text-[10.5px] text-faint">{l}</code></span>
          ))}
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-faint">Offset solid shadows (never blurred glass) give components their field-manual character; hover translates −2px and grows the shadow. Radii stay ≤ 10px; focus rings are a 2px solid <code className="font-mono text-accink">--acc</code>.</p>
    </RefShell>
  );
}

const VERSIONS = [
  ["React", "19.x", "19.x stable", "Function components + hooks baseline."],
  ["Next.js", "15.x App Router", "15.x stable · 16.x observed", "App Router baseline; Pages Router taught as legacy literacy."],
  ["TypeScript", "5.7+", "5.x stable", "strict mode from the first TS lesson."],
  ["Node.js", "22 (Active LTS)", "24 LTS · 22 Active LTS", "Odd-numbered releases never used."],
  ["pnpm", "10.x", "10.x", "Lockfile always committed."],
  ["PostgreSQL", "17", "17 stable · 18 observed", "Supabase pins majors per project; track both."],
  ["Supabase JS", "2.x", "2.112.x", "v2 API; TS ≥ 5.0 required."],
];

export function VersionsPage() {
  return (
    <RefShell kicker="reference · version policy" title="Version matrix" sub="No version numbers are welded into the curriculum. Before any technology-specific module is created or updated, its stable line is verified against official release notes. Alpha/beta/RC releases are never the baseline.">
      <div className="card mb-6 border-l-4 border-info p-5">
        <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-info">Three distinct versions, always labeled</p>
        <p className="text-[14px] leading-[1.75] text-soft"><strong className="font-semibold text-ink">Repository version</strong> — what lessons install. <strong className="font-semibold text-ink">Current stable</strong> — what production runs. <strong className="font-semibold text-ink">Legacy</strong> — what older codebases contain, taught for recognition, never as recommendation.</p>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="bg-paper font-mono text-[10.5px] uppercase tracking-wider text-faint">
              <th className="px-4 py-3 font-medium">Technology</th><th className="px-4 py-3 font-medium">Course version</th><th className="px-4 py-3 font-medium">Current stable</th><th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {VERSIONS.map(([tech, course, stable, note]) => (
              <tr key={tech} className="transition-colors hover:bg-accsoft/20">
                <td className="px-4 py-3 font-mono font-bold text-ink">{tech}</td>
                <td className="px-4 py-3"><span className="rounded bg-accsoft px-2 py-0.5 font-mono text-[11.5px] font-semibold text-accink">{course}</span></td>
                <td className="px-4 py-3 font-mono text-[12px] text-soft">{stable}</td>
                <td className="px-4 py-3 text-[12.5px] leading-relaxed text-soft">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RefShell>
  );
}

const LOG = [
  { batch: "Batch 00 · Scaffold", date: "2026-02", items: ["Design-token system + /ref/design-tokens", "Educational component library (objectives, mental models, code, debug labs, quizzes)", "Progress engine: localStorage completions, quiz best-scores, battle results, flashcard memory, reset", "Governance: COURSE_MANIFEST, COURSE_STATUS, COURSE_VERSION_MATRIX + initial gap-discovery pass"] },
  { batch: "Batch 01 · Volume I — How the Web Actually Works", date: "2026-02", items: ["what-happens-when: URL→render journey with dig/curl labs + NXDOMAIN debugging lab", "http-request-response: methods/idempotency, status classes, 401-vs-403, XHR→fetch outdated pair", "browser-rendering: DOM/CSSOM pipeline, defer, layout-thrashing lab, Core Web Vitals", "Foundation Gauntlet (9 Q, 3 fronts) + 4 flashcard sets + glossary + troubleshooting index"] },
  { batch: "Batch 02 · Volume I — JavaScript Foundations", date: "2026-02", items: ["js-values-types: value/reference split, typeof null, equality, 0.1+0.2", "js-control-flow: the complete falsy list, guard clauses, the silent = -in-condition bug", "js-functions-scope: scope chain, the backpack model, the 3,3,3 mystery solved"] },
  { batch: "Batch 03 · Volume I — Terminal, Node & Environment", date: "2026-02", items: ["terminal-mental-model: the literal clerk, pipes, exit codes, 'command not found'", "node-and-runtime: intent→resolution→materialization, 'works on my machine' lockfile lab", "env-variables-secrets: requireEnv, the committed-secret rotation-first response"] },
  { batch: "Batch 04 · Foundation Gauntlet + review", date: "2026-02", items: ["Cumulative checkpoint battle across Modules 1–3, with remediation links", "Initial curriculum review pass + gap ledger"] },
  { batch: "Batch 05 · Volume I — Git & GitHub Workflow", date: "2026-02", items: ["git-mental-model: three rooms + snapshot graph, 'old code in my commit' lab", "git-daily-workflow: status→diff→add→commit reflex, selective staging", "branches-prs-review: labels, merges, conflicts, the rebase golden rule", "git-recovery: the undo ladder + 'pushed or not?' rule, reflog safety net"] },
  { batch: "Batch 06 · Volume I — Semantic HTML & Accessibility", date: "2026-02", items: ["html-as-structure: landmarks, heading outline, forms, alt-by-role, div-soup refactor lab", "a11y-tree-keyboard: role/name/state, tab order, focus traps, 'unreachable button' lab", "aria-when-needed: the five rules, live regions, 'aria-expanded never updates' lab", "Accessibility Checklist reference (/ref/a11y) with persisted progress"] },
  { batch: "Batch 07 · Volume I — CSS & Responsive Design", date: "2026-02", items: ["css-mental-model: the cascade's three tiebreakers, specificity tuples, border-box, @layer", "layout-flex-grid: content-out vs layout-in, fr/minmax/auto-fit, the min-width:0 lab", "responsive-and-tokens: mobile-first, clamp(), container queries, semantic tokens"] },
  { batch: "Batch 08 · Volume I — TypeScript Foundations", date: "2026-02", items: ["why-types: bug archaeology, strict as the only default, reading red underlines", "ts-strict-basics: unions, literals, optional vs nullable, 'possibly undefined' lab", "narrowing: guards, discriminated unions, the never-check, satisfies", "ts-dom: lib.dom, event inference, parse→validate→trust, Volume I complete"] },
  { batch: "Batch 09 · Volume II — Modular JavaScript", date: "2026-02", items: ["es-modules: contracts, named vs default, hoisting, tree-shaking, CJS boundary lab", "module-boundaries: verb-shaped surfaces, one-way arrows, module state as singletons", "circular-and-dynamic: evaluation order, invert/extract/defer, dynamic import()", "Builder level opens · modular-js flashcards + glossary + troubleshooting entries"] },
  { batch: "Batch 10 · Volume II — Error Handling That Scales", date: "2026-02", items: ["error-taxonomy: bugs vs expected failures, cause chains, stack traces bottom-up, swallowed-catch lab", "result-pattern: Result as a discriminated union, compiler-forced handling, never-check exhaustiveness, throwing→Result refactor", "async-failure-modes: orphaned promises, allSettled, global alarms, retry policy, optimistic-UI rollback lab", "error-handling flashcards (16) · 7 glossary terms · 2 troubleshooting entries · 18 quiz questions · 3 debugging labs"] },
  { batch: "Batch 11 · Volume II — Tooling: Lint, Format, Build", date: "2026-02", items: ["lint-format: ESLint (correctness) vs Prettier (appearance) lanes, eslint-config-prettier, the whitespace-merge-conflict lab", "build-pipeline: transform→bundle→minify→emit, tree-shaking & side effects, source maps, the 'works in dev, breaks in prod' lab", "ci-gate: CI as a chain of exit codes, the essential 6-command gate + GitHub Actions, the 'passes locally, fails in CI' lab", "Builder Gauntlet (13 Q across V2 M1–M3) closes Volume II · tooling flashcards (14) · 7 glossary terms · 3 troubleshooting entries · 18 quiz questions · 3 debugging labs"] },
];

export function StatusPage() {
  return (
    <RefShell kicker="governance · living document" title="Generation log & course status" sub="Long curriculum projects die by amnesia. This page is the external memory: what shipped, what's missing, and exactly which batch runs next.">
      <div className="space-y-4">
        {LOG.map((b) => (
          <div key={b.batch} className="card-hard p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h3 className="font-display text-lg font-bold text-ink">{b.batch}</h3>
              <StatusBadge status="implemented" />
              <span className="font-mono text-[11px] text-faint">{b.date}</span>
            </div>
            <ul className="space-y-1.5">
              {b.items.map((it, i) => <li key={i} className="flex gap-2.5 text-[13.5px] leading-[1.65] text-soft"><Icons.check size={14} className="mt-1 shrink-0 text-acc" />{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="card mt-8 border-l-4 border-acc p-5">
        <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accink">Recommended next batch</p>
        <p className="text-[14.5px] leading-[1.75] text-soft"><strong className="font-semibold text-ink">Batch 12 — React (Volume III):</strong> mental models (UI as a function of state), the state-classification doctrine, effects discipline, and data fetching — the component era begins. Full scope on the <Link to="/queue" className="link-acc font-semibold">generation queue</Link> — it is the ordering authority.</p>
      </div>
    </RefShell>
  );
}

export function ManifestPage() {
  const [filter, setFilter] = useState<"all" | "implemented" | "draft" | "planned">("all");
  const lessons = flatLessons();
  const stats = courseStats();
  const list = lessons.filter((l) => filter === "all" || l.status === filter);
  return (
    <RefShell kicker="governance · source of truth" title="Course manifest" sub="Every curriculum item with identifier, status, level, and prerequisites. Sidebar presence never implies completion.">
      <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {[
          [String(stats.lessonsImplemented), "implemented"],
          [String(stats.lessonsDraft), "draft"],
          [String(stats.lessonsPlanned), "planned"],
          [String(stats.modules), "modules mapped"],
        ].map(([n, l]) => (
          <div key={l} className="bg-surface px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{l}</p>
            <p className="font-display text-xl font-bold text-ink">{n}</p>
          </div>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {(["all", "implemented", "draft", "planned"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3.5 py-1.5 font-mono text-[11.5px] capitalize transition-colors ${filter === f ? "border-acc bg-accsoft font-bold text-accink" : "border-line text-soft hover:border-acc hover:text-accink"}`}>{f}</button>
        ))}
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-[13px]">
          <thead>
            <tr className="bg-paper font-mono text-[10.5px] uppercase tracking-wider text-faint">
              <th className="px-4 py-3 font-medium">ID</th><th className="px-4 py-3 font-medium">Lesson</th><th className="px-4 py-3 font-medium">Location</th><th className="px-4 py-3 font-medium">Level</th><th className="px-4 py-3 font-medium">Min</th><th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((l) => (
              <tr key={l.id} className="transition-colors hover:bg-accsoft/20">
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-faint">{l.id}</td>
                <td className="px-4 py-2.5"><Link to={`/lesson/${l.id}`} className="font-medium text-ink hover:text-accink">{l.title}</Link></td>
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-soft">V{l.volume}·M{l.module}·L{l.order}</td>
                <td className="px-4 py-2.5"><LevelChip level={l.level} /></td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-soft">{l.minutes}</td>
                <td className="px-4 py-2.5"><StatusBadge status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RefShell>
  );
}
