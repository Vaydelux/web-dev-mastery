import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Accessibility, ArrowRight, BookOpen, Bug, Check, ChevronDown, ChevronRight, Clock, Copy,
  Database, Download, Flag, Gauge, Info, Layers, Lightbulb, Lock, Map as MapIcon, Menu, Moon, Play,
  RefreshCw, Search, Server, Shield, Sparkles, Sun, Sword, Terminal, WifiOff, X, Zap, Grid3x3, FileText, ListChecks,
} from "lucide-react";
import type { LessonStatus, MasteryLevel } from "../lib/core";

export const Icons = {
  arrow: ArrowRight, check: Check, x: X, shield: Shield, gauge: Gauge, a11y: Accessibility,
  server: Server, info: Info, bug: Bug, terminal: Terminal, book: BookOpen, layers: Layers,
  search: Search, sun: Sun, moon: Moon, menu: Menu, copy: Copy, chevD: ChevronDown, chevR: ChevronRight,
  cards: Grid3x3, target: Flag, bulb: Lightbulb, db: Database, lock: Lock, refresh: RefreshCw,
  map: MapIcon, zap: Zap, clock: Clock, play: Play, sword: Sword, sparkles: Sparkles, file: FileText, list: ListChecks,
  flag: Flag, download: Download, wifiOff: WifiOff,
};

/* ————— Markdown-lite inline renderer (`code` and **bold**) ————— */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((pt, i) => {
        if (pt.startsWith("`") && pt.endsWith("`") && pt.length > 2)
          return (
            <code key={i} className="rounded bg-accsoft px-1.5 py-0.5 font-mono text-[0.86em] font-medium text-accink">
              {pt.slice(1, -1)}
            </code>
          );
        if (pt.startsWith("**") && pt.endsWith("**") && pt.length > 4)
          return (
            <strong key={i} className="font-semibold text-ink">{pt.slice(2, -2)}</strong>
          );
        return <span key={i}>{pt}</span>;
      })}
    </>
  );
}

/* ————— Status + level chips ————— */
const STATUS_META: Record<LessonStatus, { label: string; cls: string; dot: string }> = {
  implemented: { label: "implemented", cls: "border-acc/35 bg-accsoft text-accink", dot: "bg-acc" },
  draft: { label: "draft", cls: "border-amber/35 bg-ambersoft text-amber", dot: "bg-amber" },
  planned: { label: "planned", cls: "border-line bg-transparent text-faint", dot: "bg-faint" },
};
export function StatusBadge({ status, className }: { status: LessonStatus; className?: string }) {
  const mt = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider ${mt.cls} ${className ?? ""}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${mt.dot} ${status !== "planned" ? "animate-pulse-dot" : ""}`} />
      {mt.label}
    </span>
  );
}

const LEVEL_CLS: Record<MasteryLevel, string> = {
  Foundation: "border-acc/40 text-accink",
  Builder: "border-info/40 text-info",
  "Full-Stack": "border-amber/40 text-amber",
  Production: "border-err/40 text-err",
  Mastery: "border-linestrong/60 text-soft",
};
export function LevelChip({ level, className }: { level: MasteryLevel; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border bg-transparent px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider ${LEVEL_CLS[level]} ${className ?? ""}`}>
      {level}
    </span>
  );
}

/* ————— Animated progress ring ————— */
export function ProgressRing({ pct, size = 46, stroke = 4 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(100, Math.max(0, pct)) / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`${Math.round(pct)} percent complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle className="ring-fg" cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--acc)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <span className="absolute font-mono text-[10px] font-semibold text-soft">{Math.round(pct)}%</span>
    </div>
  );
}

/* ————— Scroll reveal ————— */
export function Reveal({ children, className, delay }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className ?? ""} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-2">{`// ${kicker}`}</p>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.9rem]">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-soft">{sub}</p>}
    </div>
  );
}

export function Highlight({ text, q }: { text: string; q: string }) {
  const needle = q.trim().toLowerCase();
  if (!needle) return <>{text}</>;
  const lower = text.toLowerCase();
  const out: ReactNode[] = [];
  let i = 0; let k = 0; let guard = 0;
  while ((i = lower.indexOf(needle, i)) !== -1 && guard++ < 40) {
    if (i > k) out.push(text.slice(k, i));
    out.push(<mark key={`${i}-${guard}`} className="rounded-[3px] bg-accsoft px-0.5 font-semibold text-accink">{text.slice(i, i + needle.length)}</mark>);
    i += needle.length;
    k = i;
  }
  if (k < text.length) out.push(text.slice(k));
  return <>{out}</>;
}
