import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import logoImage from "../assets/logo.png";
import patternImage from "../assets/main_pattern.png";

/* ─── design tokens (hutulbur.jpg palette) ─── */
export const LIME = "#b6ff3b";
export const BLUE = "#183376";
export const TOTAL = 14;
export const DECK_TITLE = "Mongolia’s Green Data Center Opportunities";
export { logoImage, patternImage };

const MODE = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("export") : null;
/* static export: animations off, final state rendered immediately */
export const IS_EXPORT = MODE === "pdf" || MODE === "slide";
/* still capture: entrance animations run once, loops and auto-cycling off */
export const IS_STILL = MODE === "still";
export const AUTO = !IS_EXPORT && !IS_STILL;

/* ─── deck navigation ─── */
export const DeckNav = createContext<{ goTo: (index: number) => void; current: number }>({ goTo: () => {}, current: 0 });
export const useDeckNav = () => useContext(DeckNav);

/** Presentation chapters — `start` is the 0-based slide index */
export const SECTIONS = [
  { n: "01", title: "Natural advantage", start: 1 },
  { n: "02", title: "Policy & legal environment", start: 2 },
  { n: "03", title: "Global benchmark", start: 6 },
  { n: "04", title: "The opportunity", start: 7 },
  { n: "05", title: "Khushig Valley FEZ", start: 8 },
  { n: "06", title: "Partnership", start: 13 },
];

export function sectionOfPage(page: number) {
  let found: (typeof SECTIONS)[number] | null = null;
  for (const s of SECTIONS) if (page - 1 >= s.start) found = s;
  return found;
}

/* ─── hooks ─── */
export function useCountUp(target: number, { duration = 1500, delay = 450, decimals = 0 } = {}) {
  const [value, setValue] = useState(IS_EXPORT ? target : 0);
  useEffect(() => {
    if (IS_EXPORT) return;
    setValue(0);
    let raf = 0;
    const startAt = performance.now() + delay;
    const f = Math.pow(10, decimals);
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - startAt) / duration));
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target * f) / f);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, decimals]);
  return value;
}

/** Eases from the previous value to a new target (used by interactive toggles). */
export function useTween(target: number, duration = 850) {
  const [value, setValue] = useState(IS_EXPORT ? target : 0);
  const from = useRef(IS_EXPORT ? target : 0);
  useEffect(() => {
    if (IS_EXPORT) return;
    const f = from.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const v = f + (target - f) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setValue(Math.round(v));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/**
 * Auto-rotating spotlight for remote-controlled talks. A click pins an item;
 * the rotation resumes after a pause. `active = -1` before it starts.
 */
export function useSpotlight(count: number, ms = 3400, firstDelay = 2200) {
  const [active, setActive] = useState(-1);
  const [pinnedAt, setPinnedAt] = useState(0);
  useEffect(() => {
    if (!AUTO) return;
    const wait = pinnedAt ? 9000 : active === -1 ? firstDelay : ms;
    const id = window.setTimeout(() => {
      setPinnedAt(0);
      setActive((a) => (a + 1) % count);
    }, wait);
    return () => window.clearTimeout(id);
  }, [active, count, ms, firstDelay, pinnedAt]);
  const pin = (i: number) => {
    setActive(i);
    setPinnedAt(Date.now());
  };
  return { active, pin };
}

/** Sequential reveal 0 → total. Export/still render the final state. */
export function useSteps(total: number, ms = 700, start = 600) {
  const final = !AUTO;
  const [step, setStep] = useState(final ? total : 0);
  useEffect(() => {
    if (final || step >= total) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? start : ms);
    return () => window.clearTimeout(id);
  }, [final, step, total, ms, start]);
  return [step, setStep] as const;
}

export const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
export const pad2 = (n: number) => String(n).padStart(2, "0");
export const fmt = (n: number) => n.toLocaleString("en-US");

/* ─── slide shell ─── */
export function Slide({ page, children, className = "", pattern = "corner" }: { page: number; children: ReactNode; className?: string; pattern?: "corner" | "none" }) {
  return (
    <div className={`slide-root gx-slide ${className}`}>
      <div className="gx-bg" />
      <div className="gx-grid" />
      {pattern === "corner" && <Pattern className="gx-pattern-corner" />}
      <div className="gx-body">{children}</div>
      {page > 1 && <Footer page={page} />}
    </div>
  );
}

/** main_pattern.png with a light pulse travelling along its lines */
export function Pattern({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`gx-pattern ${className}`} style={style} aria-hidden="true">
      <img src={patternImage} alt="" draggable={false} />
      <span className="gx-pattern-glow" style={{ WebkitMaskImage: `url(${patternImage})`, maskImage: `url(${patternImage})` }} />
    </div>
  );
}

export function Footer({ page }: { page: number }) {
  const sec = sectionOfPage(page);
  return (
    <div className="gx-footer">
      <img className="gx-footer-logo" src={logoImage} alt="Government of Mongolia — Ministry of Digital Development, Innovation and Communications" />
      <span className="gx-footer-sec">
        {sec && (
          <>
            <b>{sec.n}</b>
            {sec.title}
          </>
        )}
      </span>
      <span className="gx-footer-page">
        {DECK_TITLE}
        <i>{pad2(page)}</i>
      </span>
    </div>
  );
}

/* ─── header ─── */
export function Header({ kicker, title, size = 46, right, maxWidth = 1180 }: { kicker?: ReactNode; title: ReactNode; size?: number; right?: ReactNode; maxWidth?: number }) {
  return (
    <header className="gx-header">
      <div style={{ minWidth: 0 }}>
        {kicker && (
          <div className="gx-kicker fade-up">
            <span className="gx-kicker-dot" />
            {kicker}
          </div>
        )}
        <h2 className="gx-title fade-up" style={{ fontSize: size, maxWidth, ...delay(0.08) }}>
          {title}
        </h2>
      </div>
      {right}
    </header>
  );
}

/** lime-outlined pill (hutulbur date / route pills) */
export function Pill({ children, solid = false, style, className = "" }: { children: ReactNode; solid?: boolean; style?: CSSProperties; className?: string }) {
  return (
    <span className={`gx-pill ${solid ? "is-solid" : ""} ${className}`} style={style}>
      {children}
    </span>
  );
}
