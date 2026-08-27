import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/* ============================ COURSE MODEL ============================ */

export type LessonStatus = "implemented" | "draft" | "planned";
export type MasteryLevel = "Foundation" | "Builder" | "Full-Stack" | "Production" | "Mastery";

export interface Question {
  id: string;
  type: "single" | "multi" | "boolean";
  prompt: string;
  code?: string;
  lang?: string;
  options: string[];
  answer: number[];
  explain: string;
  tags?: string[];
}

export type NoteKind = "security" | "performance" | "a11y" | "production" | "info" | "warning";

export type Block =
  | { t: "p"; text: string }
  | { t: "lead"; text: string }
  | { t: "h2"; id: string; text: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "simple"; text: string[] }
  | { t: "why"; text: string[] }
  | { t: "model"; title: string; text: string[]; map?: [string, string][] }
  | { t: "diagram"; title: string; ascii: string }
  | { t: "code"; lang: string; title: string; code: string; bad?: boolean; good?: boolean; notes?: string[] }
  | { t: "walkthrough"; title: string; lang: string; steps: { code: string; text: string }[] }
  | { t: "try"; title: string; steps: string[] }
  | { t: "debug"; title: string; scenario: string; error: string; tells: string; flow: string[]; root: string; prevent: string }
  | { t: "mistake"; title: string; wrong: string; right: string; explain: string }
  | { t: "note"; kind: NoteKind; title?: string; text: string[] }
  | { t: "outdated"; lang: string; label: string; oldCode: string; now: string; nowCode: string; why: string }
  | { t: "vocab"; terms: [string, string][] }
  | { t: "recap"; items: string[] }
  | { t: "checkpoint"; text: string }
  | { t: "bridge"; text: string; next: string }
  | { t: "quiz"; title: string; questions: Question[] };

export interface Lesson {
  id: string;
  title: string;
  volume: number;
  module: number;
  order: number;
  level: MasteryLevel;
  status: LessonStatus;
  minutes: number;
  summary: string;
  prereqs: string[];
  objectives: string[];
  concepts: string[];
  blocks?: Block[];
}

export interface ModuleDef { id: string; num: number; title: string; blurb: string; status: LessonStatus; lessons: Lesson[]; }
export interface VolumeDef { id: number; numeral: string; title: string; phase: string; blurb: string; modules: ModuleDef[]; }

export interface BattleSection { title: string; desc: string; questions: Question[]; }
export interface BossBattle { id: string; title: string; subtitle: string; passPct: number; intro: string[]; rules: string[]; sections: BattleSection[]; }
export interface Flashcard { front: string; back: string; lesson?: string; }
export interface FlashcardSet { id: string; title: string; blurb: string; cards: Flashcard[]; }
export interface GlossaryEntry { term: string; def: string; domain: string; lesson?: string; }
export interface TroubleEntry { id: string; symptom: string; layer: string; causes: string[]; diagnose: string[]; fix: string; prevent: string; related?: string; }
export interface BattleRef { id: string; title: string; volumeId: number; afterModule: string; blurb: string; }

/* ============================ SYNTAX HIGHLIGHTER ============================ */

type Tok = { text: string; cls: string };

const JS_KW = new Set("const let var function return if else for while do switch case break continue new typeof instanceof in of class extends super this import export from default async await yield try catch finally throw delete void static get set type interface enum implements readonly keyof infer declare namespace as satisfies is".split(" "));
const JS_LIT = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);
const JS_TYPE = new Set("String Number Boolean Object Array Function Promise Map Set Date JSON Math Error RegExp console document window React NodeJS Partial Required Record Omit Pick".split(" "));
const SQL_KW = new Set("select from where insert into values update set delete create table alter drop index on primary key foreign references not null unique check default constraint and or in exists between like ilike join inner left right full outer cross group by order having limit offset asc desc as distinct case when then else end returning with recursive union all begin commit rollback transaction".split(" "));
const SH_KW = new Set("sudo cd ls mkdir git node npm pnpm npx nvm curl dig cat echo code docker psql supabase brew export source touch rm cp mv grep which alias kill ps ssh tar chmod find sed head tail wc true false".split(" "));

function scan(code: string, re: RegExp, classify: (m: RegExpExecArray, code: string) => string): Tok[] {
  const toks: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) toks.push({ text: code.slice(last, m.index), cls: "plain" });
    toks.push({ text: m[0], cls: classify(m, code) });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  if (last < code.length) toks.push({ text: code.slice(last), cls: "plain" });
  return toks;
}

const JS_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(0x[\da-fA-F]+|\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)/g;
function jsClassify(m: RegExpExecArray, code: string): string {
  if (m[1]) return "com";
  if (m[2]) return "str";
  if (m[3]) return "num";
  const w = m[4];
  if (JS_KW.has(w)) return "kw";
  if (JS_LIT.has(w)) return "num";
  if (JS_TYPE.has(w) || /^[A-Z]/.test(w)) return "type";
  if (/^\s*\(/.test(code.slice(m.index + w.length))) return "fn";
  return "plain";
}
const SQL_RE = /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:''|[^'])*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][\w$]*)/g;
function sqlClassify(m: RegExpExecArray): string {
  if (m[1]) return "com";
  if (m[2]) return "str";
  if (m[3]) return "num";
  return SQL_KW.has(m[4].toLowerCase()) ? "kw" : "plain";
}
const SH_RE = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'[^']*')|(\$\{?[\w/:-]+\}?|--?[\w][\w-]*)|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][\w.-]*)/g;
function shClassify(m: RegExpExecArray): string {
  if (m[1]) return "com";
  if (m[2]) return "str";
  if (m[3]) return m[3].startsWith("$") ? "var" : "attr";
  if (m[4]) return "num";
  return SH_KW.has(m[5]) ? "kw" : "plain";
}
const HTML_RE = /(<!--[\s\S]*?-->)|("[^"]*"|'[^']*')|(<\/?[a-zA-Z][^<>]*>|<\/?[a-zA-Z]>)/g;
function htmlToks(code: string): Tok[] {
  return scan(code, HTML_RE, (m) => (m[1] ? "com" : m[2] ? "str" : "tag")).flatMap((t) => {
    if (t.cls !== "tag") return [t];
    return scan(t.text, /([a-zA-Z-]+)(?==)|(=|<|>|\/)/g, (m) => (m[1] ? "attr" : "pun"));
  });
}
const CSS_RE = /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(#[0-9a-fA-F]{3,8})\b|(@[\w-]+|--[\w-]+)|(-?[\d.]+(?:px|rem|em|%|vh|vw|s|ms|fr|ch|deg)?)|([a-zA-Z-]+(?=\s*:))/g;
function cssClassify(m: RegExpExecArray): string {
  if (m[1]) return "com";
  if (m[2]) return "str";
  if (m[3]) return "num";
  if (m[4]) return m[4].startsWith("--") ? "var" : "kw";
  if (m[5]) return "num";
  return "attr";
}

export function highlight(code: string, lang: string): ReactNode[] {
  let toks: Tok[];
  switch (lang) {
    case "sql": toks = scan(code, SQL_RE, sqlClassify); break;
    case "bash": case "sh": case "terminal": toks = scan(code, SH_RE, shClassify); break;
    case "html": case "xml": toks = htmlToks(code); break;
    case "css": toks = scan(code, CSS_RE, cssClassify); break;
    case "plain": case "text": toks = [{ text: code, cls: "plain" }]; break;
    default: toks = scan(code, JS_RE, jsClassify);
  }
  return toks.map((t, i) => (
    <span key={i} className={`tk-${t.cls}`}>{t.text}</span>
  ));
}

/* ============================ PROGRESS ============================ */

export interface LessonProg { done: boolean; quizScore?: number; quizTotal?: number; at?: number; }
export interface BattleProg { score: number; total: number; passed: boolean; at: number; }
export interface Prog { lessons: Record<string, LessonProg>; battles: Record<string, BattleProg>; cards: Record<string, string[]>; }

const KEY = "ztm.progress.v1";
const EMPTY: Prog = { lessons: {}, battles: {}, cards: {} };
function load(): Prog {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Prog) };
  } catch { /* storage unavailable — in-memory */ }
  return EMPTY;
}
function save(p: Prog) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } }

interface Ctx {
  prog: Prog;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  toggleDone: (id: string) => void;
  recordQuiz: (id: string, score: number, total: number) => void;
  recordBattle: (id: string, score: number, total: number) => void;
  toggleCard: (setId: string, cardId: string) => void;
  resetAll: () => void;
  completedCount: number;
}

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [prog, setProg] = useState<Prog>(load);
  const [theme, setThemeState] = useState<"dark" | "light">(() => {
    if (typeof document !== "undefined") {
      const t = document.documentElement.getAttribute("data-theme");
      if (t === "light" || t === "dark") return t;
    }
    return "dark";
  });
  useEffect(() => save(prog), [prog]);

  const setTheme = (t: "dark" | "light") => {
    setThemeState(t);
    try { localStorage.setItem("ztm.theme", t); } catch { /* ignore */ }
    if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", t);
  };

  const value = useMemo<Ctx>(
    () => ({
      prog, theme, setTheme,
      toggleDone: (id) => setProg((p) => {
        const cur = p.lessons[id];
        const done = !(cur && cur.done);
        return { ...p, lessons: { ...p.lessons, [id]: { ...(cur ?? {}), done, at: done ? Date.now() : cur?.at } } };
      }),
      recordQuiz: (id, score, total) => setProg((p) => {
        const cur = p.lessons[id];
        const better = !cur?.quizTotal || score / total >= cur.quizScore! / cur.quizTotal;
        return {
          ...p,
          lessons: {
            ...p.lessons,
            [id]: {
              ...(cur ?? { done: false }),
              quizScore: better ? score : cur!.quizScore!,
              quizTotal: better ? total : cur!.quizTotal!,
            },
          },
        };
      }),
      recordBattle: (id, score, total) => setProg((p) => {
        const cur = p.battles[id];
        if (cur && cur.score >= score) return p;
        return { ...p, battles: { ...p.battles, [id]: { score, total, passed: score / total >= 0.7, at: Date.now() } } };
      }),
      toggleCard: (setId, cardId) => setProg((p) => {
        const known = p.cards[setId] ?? [];
        const has = known.includes(cardId);
        return { ...p, cards: { ...p.cards, [setId]: has ? known.filter((c) => c !== cardId) : [...known, cardId] } };
      }),
      resetAll: () => setProg(EMPTY),
      completedCount: Object.values(prog.lessons).filter((l) => l.done).length,
    }),
    [prog, theme]
  );

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
