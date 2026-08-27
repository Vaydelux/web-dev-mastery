import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { highlight, useProgress, type Block, type FlashcardSet, type NoteKind, type Question } from "../lib/core";
import { getLesson, getBattle, BATTLE_REFS } from "../data/model";
import { Icons, Inline } from "./ui";

/* ============================ CODE BLOCK ============================ */
export function CodeBlock({ lang, title, code, bad, good, notes }: { lang: string; title: string; code: string; bad?: boolean; good?: boolean; notes?: string[] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1400); } catch { /* ignore */ }
  };
  const lines = code.split("\n");
  return (
    <div className="my-5 overflow-hidden rounded-lg border border-code-line bg-codebg">
      <div className="flex items-center justify-between gap-3 border-b border-code-line px-4 py-2.5">
        <p className="flex min-w-0 items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93a89b]">
          {bad && <span className="rounded bg-[#3a1f1c] px-1.5 py-0.5 text-[10px] font-bold text-[#e87f73]">✗ broken</span>}
          {good && <span className="rounded bg-[#13291e] px-1.5 py-0.5 text-[10px] font-bold text-[#3fd68f]">✓ fixed</span>}
          <span className="truncate normal-case tracking-normal text-[#d6e3d9]">{title}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[10px] uppercase text-[#63776b]">{lang}</span>
          <button onClick={copy} className="flex items-center gap-1 rounded border border-code-line px-2 py-1 font-mono text-[10.5px] text-[#93a89b] transition-colors hover:border-[#3fd68f] hover:text-[#3fd68f]">
            <Icons.copy size={12} />
            {copied ? "copied" : "copy"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.75]">
        <code>
          {lines.map((ln, i) => (
            <span key={i} className="flex">
              <span className="w-8 shrink-0 select-none pr-3 text-right text-[#4a5c51]">{i + 1}</span>
              <span className="whitespace-pre">{highlight(ln, lang)}{ln === "" ? " " : ""}</span>
            </span>
          ))}
        </code>
      </pre>
      {notes && notes.length > 0 && (
        <div className="space-y-1.5 border-t border-code-line bg-[#0e1511] px-4 py-3">
          {notes.map((n, i) => (
            <p key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-[#a8bcad]">
              <span className="mt-0.5 shrink-0 text-[#3fd68f]">▸</span>
              <Inline text={n} />
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================ QUIZ ============================ */
function setsEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const s = [...a].sort(); const t = [...b].sort();
  return s.every((vv, i) => vv === t[i]);
}

function QuestionCard({ q, index, onChecked }: { q: Question; index: number; onChecked: (q: Question, sel: number[]) => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = checked && setsEqual(selected, q.answer);
  const toggle = (i: number) => {
    if (checked) return;
    if (q.type === "multi") setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
    else setSelected([i]);
  };
  return (
    <div className="card p-5 sm:p-6">
      <p className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 shrink-0 rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] font-semibold text-soft">Q{index + 1}</span>
        <span className="text-[15px] font-medium leading-relaxed text-ink"><Inline text={q.prompt} /></span>
      </p>
      <p className="mb-4 font-mono text-[10.5px] uppercase tracking-widest text-faint">
        {q.type === "multi" ? "Select all that apply" : q.type === "boolean" ? "True or false" : "Choose one"}
      </p>
      {q.code && <CodeBlock lang={q.lang ?? "js"} title="predict the output" code={q.code} />}
      <div className="space-y-2" role="group" aria-label={`Question ${index + 1} options`}>
        {q.options.map((opt, i) => {
          const isSel = selected.includes(i);
          const isAns = q.answer.includes(i);
          let cls = "border-line bg-paper hover:border-acc/60 hover:bg-accsoft/40";
          if (checked) {
            if (isAns) cls = "border-acc bg-accsoft";
            else if (isSel) cls = "border-err bg-errsoft";
            else cls = "border-line bg-paper opacity-55";
          } else if (isSel) cls = "border-acc bg-accsoft/60";
          return (
            <button key={i} onClick={() => toggle(i)} disabled={checked} aria-pressed={isSel} className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] leading-snug transition-all duration-150 ${cls} disabled:cursor-default`}>
              <span className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full border ${checked && isAns ? "border-acc bg-acc text-paper" : checked && isSel ? "border-err bg-err text-paper" : isSel ? "border-acc bg-acc text-paper" : "border-linestrong/50"}`} style={{ width: 18, height: 18 }}>
                {(isSel || (checked && isAns)) && <>{checked && isSel && !isAns ? <Icons.x size={11} /> : <Icons.check size={11} />}</>}
              </span>
              <span className="text-soft"><Inline text={opt} /></span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {!checked ? (
          <button onClick={() => { setChecked(true); onChecked(q, selected); }} disabled={selected.length === 0} className="rounded-lg border border-linestrong bg-ink px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
            Check answer
          </button>
        ) : (
          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-wider ${correct ? "border-acc/40 bg-accsoft text-accink" : "border-err/40 bg-errsoft text-err"}`}>
            {correct ? <Icons.check size={13} /> : <Icons.x size={13} />}
            {correct ? "Correct" : "Not quite — read below"}
          </span>
        )}
      </div>
      {checked && (
        <div className={`mt-4 animate-fade-up rounded-lg border-l-4 px-4 py-3 text-[13.5px] leading-relaxed ${correct ? "border-acc bg-accsoft/50 text-soft" : "border-err bg-errsoft/50 text-soft"}`}>
          <Inline text={q.explain} />
        </div>
      )}
    </div>
  );
}

export function Quiz({ questions, lessonId, onResult }: { questions: Question[]; lessonId?: string; onResult?: (score: number, total: number) => void }) {
  const { prog, recordQuiz } = useProgress();
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const saved = lessonId ? prog.lessons[lessonId] : undefined;
  const allChecked = questions.every((q) => checkedMap[q.id]);
  const score = useMemo(() => questions.filter((q) => checkedMap[q.id] && setsEqual(answers[q.id] ?? [], q.answer)).length, [checkedMap, answers, questions]);
  useEffect(() => {
    if (allChecked) {
      if (lessonId) recordQuiz(lessonId, score, questions.length);
      onResult?.(score, questions.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChecked]);
  return (
    <div>
      {saved?.quizTotal !== undefined && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-acc/30 bg-accsoft px-3 py-1.5 font-mono text-[12px] text-accink">
          <Icons.check size={13} />
          Best saved score: {saved.quizScore}/{saved.quizTotal}
        </p>
      )}
      <div className="space-y-5">
        {questions.map((q, i) => (
          <QuestionCard key={q.id} q={q} index={i} onChecked={(qq, sel) => { setCheckedMap((m) => ({ ...m, [qq.id]: true })); setAnswers((a) => ({ ...a, [qq.id]: sel })); }} />
        ))}
      </div>
    </div>
  );
}

/* ============================ FLASHCARD SESSION ============================ */
function shuffle(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}

export function FlashcardSession({ set }: { set: FlashcardSet }) {
  const { prog, toggleCard } = useProgress();
  const known = useMemo(() => new Set(prog.cards[set.id] ?? []), [prog.cards, set.id]);
  const [order, setOrder] = useState<number[]>(() => shuffle(set.cards.length));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const finished = pos >= order.length;
  const idx = order[Math.min(pos, order.length - 1)];
  const card = set.cards[idx];
  const cardKey = String(idx);
  const grade = (knewIt: boolean) => {
    const isKnown = known.has(cardKey);
    if (knewIt && !isKnown) toggleCard(set.id, cardKey);
    if (!knewIt && isKnown) toggleCard(set.id, cardKey);
    setFlipped(false);
    setPos((p) => p + 1);
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped((f) => !f); }
      else if (e.key === "1") grade(false);
      else if (e.key === "2") grade(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const knownCount = [...known].filter((k) => Number(k) < set.cards.length).length;

  if (finished) {
    const missed = order.filter((i) => !known.has(String(i)));
    return (
      <div className="card-hard mx-auto max-w-xl p-8 text-center">
        <p className="eyebrow mb-2">Session complete</p>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">{knownCount}/{set.cards.length} in long-term rotation</h3>
        <p className="mb-6 text-[14.5px] leading-relaxed text-soft">
          {knownCount === set.cards.length
            ? "Every card answered confidently. Come back in a couple of days — retrieval beats cramming."
            : `${missed.length} card${missed.length === 1 ? "" : "s"} still need reps. Review the misses tomorrow, not next month.`}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {missed.length > 0 && (
            <button onClick={() => { setOrder(shuffle(missed.length).map((_, i2) => missed[i2])); setPos(0); setFlipped(false); }} className="inline-flex items-center gap-2 rounded-lg border border-linestrong bg-ink px-5 py-2.5 font-mono text-[12.5px] font-bold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5">
              <Icons.refresh size={14} /> Study the {missed.length} missed
            </button>
          )}
          <button onClick={() => { setOrder(shuffle(set.cards.length)); setPos(0); setFlipped(false); }} className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 font-mono text-[12.5px] font-semibold text-soft transition-colors hover:border-acc hover:text-accink">
            Full reshuffle
          </button>
        </div>
      </div>
    );
  }
  const lesson = card.lesson ? getLesson(card.lesson) : undefined;
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-center gap-1.5" aria-label={`Card ${pos + 1} of ${order.length}`}>
        {order.map((oi, i) => {
          const isKnown = known.has(String(oi));
          const isCurrent = i === pos;
          return <span key={i} className={`h-2 rounded-full transition-all duration-300 ${isCurrent ? "w-6 bg-acc" : isKnown ? "w-2 bg-acc/60" : i < pos ? "w-2 bg-amber/60" : "w-2 bg-line"}`} />;
        })}
        <span className="ml-3 font-mono text-[11.5px] text-faint">{pos + 1}/{order.length}</span>
      </div>
      <div className={`flip h-72 cursor-pointer select-none sm:h-80 ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((f) => !f)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } }} role="button" tabIndex={0} aria-label={flipped ? "Showing answer — activate to see term" : "Showing term — activate to reveal answer"}>
        <div className="flip-inner">
          <div className="flip-face card-hard flex flex-col items-center justify-center p-8">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-faint">term · {set.title}</p>
            <p className="text-center font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{card.front}</p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] text-acc"><Icons.refresh size={13} /> click / space to reveal</p>
          </div>
          <div className="flip-face flip-back flex flex-col items-center justify-center rounded-[10px] border border-acc/40 bg-ink p-8">
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-acc">definition</p>
            <p className="max-h-40 overflow-y-auto text-center text-[15px] leading-[1.75] text-paper">{card.back}</p>
            {lesson && (
              <Link to={`/lesson/${lesson.id}`} onClick={(e) => e.stopPropagation()} className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11.5px] text-acc transition-colors hover:text-accink">
                <Icons.book size={13} /> taught in: {lesson.title}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => grade(false)} className="rounded-lg border border-amber/50 bg-ambersoft/50 px-4 py-3 font-mono text-[12.5px] font-bold uppercase tracking-wider text-amber transition-all hover:-translate-y-0.5">
          <span className="mr-2 rounded border border-amber/50 px-1.5 text-[11px]">1</span> Still learning
        </button>
        <button onClick={() => grade(true)} className="rounded-lg border border-acc/50 bg-accsoft/60 px-4 py-3 font-mono text-[12.5px] font-bold uppercase tracking-wider text-accink transition-all hover:-translate-y-0.5">
          <span className="mr-2 rounded border border-acc/50 px-1.5 text-[11px]">2</span> Got it
        </button>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] text-faint">space flips · 1 = still learning · 2 = got it · {knownCount} known overall</p>
    </div>
  );
}

/* ============================ NOTE / CALLOUT META ============================ */
const NOTE_META: Record<NoteKind, { label: string; icon: keyof typeof Icons; border: string; bg: string; text: string }> = {
  security: { label: "Security", icon: "shield", border: "border-err", bg: "bg-errsoft/40", text: "text-err" },
  performance: { label: "Performance", icon: "gauge", border: "border-amber", bg: "bg-ambersoft/40", text: "text-amber" },
  a11y: { label: "Accessibility", icon: "a11y", border: "border-info", bg: "bg-infosoft/40", text: "text-info" },
  production: { label: "Production", icon: "server", border: "border-acc", bg: "bg-accsoft/40", text: "text-accink" },
  info: { label: "Note", icon: "info", border: "border-info", bg: "bg-infosoft/40", text: "text-info" },
  warning: { label: "Careful", icon: "bulb", border: "border-amber", bg: "bg-ambersoft/40", text: "text-amber" },
};

/* ============================ BLOCK RENDERER ============================ */
export function LessonBlocks({ blocks, lessonId }: { blocks: Block[]; lessonId: string }) {
  const { prog, toggleDone } = useProgress();
  const done = prog.lessons[lessonId]?.done;
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p": return <p key={i} className="my-4 text-[15px] leading-[1.85] text-soft"><Inline text={b.text} /></p>;
          case "lead": return <p key={i} className="my-5 border-l-4 border-acc pl-4 text-[16px] font-medium leading-[1.8] text-ink"><Inline text={b.text} /></p>;
          case "h2": return <h2 key={i} id={b.id} className="mt-10 mb-4 scroll-mt-24 font-display text-[1.45rem] font-bold tracking-tight text-ink">{b.text}</h2>;
          case "list": return b.ordered ? (
            <ol key={i} className="my-4 list-decimal space-y-2 pl-6 text-[15px] leading-[1.75] text-soft">{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ol>
          ) : (
            <ul key={i} className="my-4 space-y-2 text-[15px] leading-[1.75] text-soft">{b.items.map((it, j) => <li key={j} className="flex gap-2.5"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-acc" /><span><Inline text={it} /></span></li>)}</ul>
          );
          case "simple": return (
            <section key={i} className="card my-6 border-l-4 border-acc p-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accink"><Icons.sparkles size={14} /> In plain terms</p>
              {b.text.map((t, j) => <p key={j} className="mb-2.5 text-[14.5px] leading-[1.8] text-soft last:mb-0"><Inline text={t} /></p>)}
            </section>
          );
          case "why": return (
            <section key={i} className="card my-6 border-l-4 border-info p-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-info"><Icons.bulb size={14} /> Why this exists</p>
              {b.text.map((t, j) => <p key={j} className="mb-2.5 text-[14.5px] leading-[1.8] text-soft last:mb-0"><Inline text={t} /></p>)}
            </section>
          );
          case "model": {
            const Ico = Icons.target;
            return (
              <section key={i} className="card-hard my-6 p-5 sm:p-6">
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accink"><Ico size={14} /> Mental model · {b.title}</p>
                {b.text.map((t, j) => <p key={j} className="mb-2.5 text-[14.5px] leading-[1.8] text-soft last:mb-0"><Inline text={t} /></p>)}
                {b.map && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {b.map.map(([a, z], j) => (
                      <div key={j} className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed">
                        <span className="font-semibold text-ink">{a}</span>
                        <span className="mx-2 text-acc">→</span>
                        <span className="text-soft">{z}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          }
          case "diagram": return (
            <figure key={i} className="my-6 overflow-hidden rounded-lg border border-code-line bg-codebg">
              <figcaption className="border-b border-code-line px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93a89b]">{b.title}</figcaption>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-[1.6] text-[#8ce9bb]">{b.ascii}</pre>
            </figure>
          );
          case "code": return <CodeBlock key={i} lang={b.lang} title={b.title} code={b.code} bad={b.bad} good={b.good} notes={b.notes} />;
          case "walkthrough": return (
            <section key={i} className="my-6">
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-faint">{`// annotated walkthrough · ${b.title}`}</p>
              <div className="space-y-4">
                {b.steps.map((s, j) => (
                  <div key={j} className="grid gap-3 lg:grid-cols-2">
                    <CodeBlock lang={b.lang} title={`step ${j + 1}`} code={s.code} />
                    <p className="self-center rounded-lg border border-line bg-surface px-4 py-3 text-[13.5px] leading-[1.75] text-soft"><Inline text={s.text} /></p>
                  </div>
                ))}
              </div>
            </section>
          );
          case "try": return (
            <section key={i} className="card my-6 border-l-4 border-acc p-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accink"><Icons.play size={14} /> {b.title}</p>
              <ol className="space-y-2.5">
                {b.steps.map((s, j) => (
                  <li key={j} className="flex gap-3 text-[14px] leading-[1.75] text-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-acc/50 font-mono text-[10.5px] font-bold text-accink">{j + 1}</span>
                    <span><Inline text={s} /></span>
                  </li>
                ))}
              </ol>
            </section>
          );
          case "debug": return (
            <section key={i} className="my-6 overflow-hidden rounded-lg border border-err/40">
              <header className="flex items-center gap-2 bg-errsoft/60 px-5 py-3">
                <Icons.bug size={16} className="text-err" />
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-err">{b.title}</p>
              </header>
              <div className="space-y-4 bg-surface p-5">
                <p className="text-[14.5px] leading-[1.8] text-soft"><Inline text={b.scenario} /></p>
                <CodeBlock lang="js" title="the failure, as you'd see it" code={b.error} bad />
                <div className="rounded-lg border-l-4 border-err bg-errsoft/30 px-4 py-3">
                  <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-err">What this error is telling you</p>
                  <p className="text-[13.5px] leading-[1.75] text-soft"><Inline text={b.tells} /></p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-faint">The debugging pass</p>
                  <ol className="space-y-1.5">
                    {b.flow.map((f, j) => (
                      <li key={j} className="flex gap-2.5 text-[13.5px] leading-[1.7] text-soft">
                        <span className="font-mono text-[11.5px] font-bold text-err">{j + 1}.</span>
                        <span><Inline text={f} /></span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-acc/40 bg-accsoft/30 p-3.5">
                    <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-accink">Root cause</p>
                    <p className="text-[13px] leading-[1.7] text-soft">{b.root}</p>
                  </div>
                  <div className="rounded-lg border border-info/40 bg-infosoft/30 p-3.5">
                    <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-info">Prevention</p>
                    <p className="text-[13px] leading-[1.7] text-soft">{b.prevent}</p>
                  </div>
                </div>
              </div>
            </section>
          );
          case "mistake": return (
            <section key={i} className="my-6 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-err/40 bg-errsoft/25 p-4">
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-err"><Icons.x size={13} /> {b.title}</p>
                <p className="text-[13.5px] leading-[1.7] text-soft">{b.wrong}</p>
              </div>
              <div className="rounded-lg border border-acc/40 bg-accsoft/25 p-4">
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-accink"><Icons.check size={13} /> Instead</p>
                <p className="text-[13.5px] leading-[1.7] text-soft">{b.right}</p>
                <p className="mt-2 border-t border-acc/20 pt-2 text-[12.5px] leading-[1.65] text-faint">{b.explain}</p>
              </div>
            </section>
          );
          case "note": {
            const mt = NOTE_META[b.kind];
            const Ico = Icons[mt.icon];
            return (
              <aside key={i} className={`my-6 rounded-lg border-l-4 ${mt.border} ${mt.bg} p-5`}>
                <p className={`mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] ${mt.text}`}><Ico size={14} /> {b.title ?? mt.label}</p>
                {b.text.map((t, j) => <p key={j} className="mb-2 text-[14px] leading-[1.8] text-soft last:mb-0"><Inline text={t} /></p>)}
              </aside>
            );
          }
          case "outdated": return (
            <section key={i} className="my-6 overflow-hidden rounded-lg border border-amber/40">
              <header className="flex items-center gap-2 bg-ambersoft/60 px-5 py-3">
                <Icons.refresh size={15} className="text-amber" />
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-amber">Outdated pattern · {b.label}</p>
              </header>
              <div className="bg-surface p-4">
                <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-err">You'll still meet this</p>
                <CodeBlock lang={b.lang} title="the older shape" code={b.oldCode} bad />
                <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-accink">Current stable approach · {b.now}</p>
                <CodeBlock lang={b.lang} title="the modern shape" code={b.nowCode} good />
                <p className="mt-2 rounded-lg border border-line bg-paper px-4 py-3 text-[13px] leading-[1.7] text-soft"><Inline text={b.why} /></p>
              </div>
            </section>
          );
          case "vocab": return (
            <section key={i} className="card my-6 p-5">
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-faint">// vocabulary</p>
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {b.terms.map(([term, def], j) => (
                  <div key={j}>
                    <dt className="font-mono text-[13px] font-bold text-accink">{term}</dt>
                    <dd className="text-[13px] leading-[1.65] text-soft">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
          case "recap": return (
            <section key={i} className="card my-6 border-l-4 border-acc p-5">
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accink">// recap</p>
              <ul className="space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5 text-[14px] leading-[1.7] text-soft"><Icons.check size={15} className="mt-0.5 shrink-0 text-acc" /><span><Inline text={it} /></span></li>
                ))}
              </ul>
            </section>
          );
          case "checkpoint": return (
            <section key={i} className="my-6 rounded-lg border border-linestrong bg-ink p-5">
              <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-acc"><Icons.flag size={14} /> Checkpoint</p>
              <p className="text-[14.5px] leading-[1.8] text-paper">{b.text}</p>
            </section>
          );
          case "bridge": {
            const isBattle = b.next.startsWith("battle-");
            const battle = isBattle ? getBattle(b.next.slice(7)) : undefined;
            const next = isBattle ? undefined : getLesson(b.next);
            const queued = !isBattle && !next;
            const to = isBattle ? `/battle/${b.next.slice(7)}` : queued ? "/queue" : `/lesson/${b.next}`;
            const label = isBattle ? (battle?.title ?? "Boss battle") : queued ? "Queued for a future batch" : (next?.title ?? b.next);
            return (
              <section key={i} className={`card-hard my-8 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${queued ? "border-dashed border-line-strong/50" : "border-acc/30"}`}>
                <div>
                  <p className="eyebrow mb-1">{isBattle ? "Prove it" : queued ? "What's next" : "Next lesson"}</p>
                  <p className="max-w-xl text-[14.5px] leading-[1.7] text-soft">{b.text}</p>
                </div>
                <Link to={to} className={`group inline-flex shrink-0 items-center gap-2.5 rounded-lg border px-5 py-3 font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 ${queued ? "border-line text-soft hover:border-acc hover:text-accink" : "border-linestrong bg-ink text-paper"}`}>
                  {isBattle && <Icons.sword size={15} className="text-err" />}
                  {queued && <Icons.clock size={15} className="text-amber" />}
                  {label}
                  <Icons.arrow size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </section>
            );
          }
          case "quiz": return (
            <section key={i} className="my-8">
              <p className="mb-4 flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-faint"><Icons.list size={15} className="text-acc" /> {b.title}</p>
              <Quiz questions={b.questions} lessonId={lessonId} />
            </section>
          );
          default: return null;
        }
      })}

      {/* Mark-complete */}
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button onClick={() => toggleDone(lessonId)} className={`inline-flex items-center gap-2.5 rounded-lg border px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 ${done ? "border-acc/50 bg-accsoft text-accink" : "border-linestrong bg-ink text-paper"}`}>
          {done ? <Icons.check size={16} /> : <Icons.flag size={16} />}
          {done ? "Completed — tap to undo" : "Mark lesson complete"}
        </button>
        <p className="font-mono text-[11.5px] text-faint">Completion is saved in this browser and feeds your progress map.</p>
      </div>
    </>
  );
}

export { BATTLE_REFS };
