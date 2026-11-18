import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2, Minimize2 } from "lucide-react";
import { DeckNav, SECTIONS, SLIDES } from "./deck";

const SLIDE_W = 1600;
const SLIDE_H = 900;

/* ─── export modes (scripts/export_pdf.py) ─── */
function ExportDeck() {
  return (
    <div className="pdf-export-root">
      {SLIDES.map((slide, index) => {
        const Component = slide.component;
        return (
          <section
            key={slide.id}
            className="pdf-slide-page"
            style={{
              width: SLIDE_W,
              height: SLIDE_H,
              overflow: "hidden",
              pageBreakAfter: index === SLIDES.length - 1 ? "auto" : "always",
              breakAfter: index === SLIDES.length - 1 ? "auto" : "page",
            }}
          >
            <Component />
          </section>
        );
      })}
    </div>
  );
}

function SingleSlide({ index, className }: { index: number; className: string }) {
  const slide = SLIDES[Math.min(Math.max(index, 0), SLIDES.length - 1)];
  const Component = slide.component;
  return (
    <div className={className} style={{ width: SLIDE_W, height: SLIDE_H, overflow: "hidden" }}>
      <Component />
    </div>
  );
}

/* ═══════════════════════════
   MAIN APP
═══════════════════════════ */
function PresentationApp() {
  const total = SLIDES.length;
  const [current, setCurrent] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get("slide"));
    return Number.isFinite(n) && n >= 1 && n <= total ? n - 1 : 0;
  });
  const [viewport, setViewport] = useState({ width: SLIDE_W, height: SLIDE_H });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [overview, setOverview] = useState(false);
  const [uiAwake, setUiAwake] = useState(true);
  const idleRef = useRef<number | undefined>(undefined);
  const appRef = useRef<HTMLDivElement>(null);

  const wakeUi = () => {
    setUiAwake(true);
    window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => setUiAwake(false), 2200);
  };
  useEffect(() => {
    wakeUi();
    return () => window.clearTimeout(idleRef.current);
  }, [current]);

  const goTo = (i: number) => setCurrent(Math.min(Math.max(i, 0), total - 1));
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  /* keep the stage fitted to the window */
  useEffect(() => {
    const node = appRef.current;
    if (!node) return;
    const update = (w: number, h: number) => setViewport({ width: Math.max(320, w), height: Math.max(180, h) });
    update(node.clientWidth, node.clientHeight);
    const observer = new ResizeObserver((entries) => {
      const e = entries[0];
      if (e) update(e.contentRect.width, e.contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = event.key;
      if (k === "Escape") setOverview(false);
      if (k === "g" || k === "G") setOverview((o) => !o);
      if (k === "f" || k === "F") void toggleFullscreen();
      if (k === "Home") setCurrent(0);
      if (k === "End") setCurrent(total - 1);
      if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace", "p", "P"].includes(k)) {
        event.preventDefault();
        setCurrent((c) => Math.max(0, c - 1));
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n", "N"].includes(k)) {
        event.preventDefault();
        setCurrent((c) => Math.min(total - 1, c + 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  /* sync ?slide=N so a refresh keeps the current slide */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(current + 1));
    window.history.replaceState(null, "", url);
  }, [current]);

  useEffect(() => {
    const onChange = () => {
      const webkit = (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      setIsFullscreen(Boolean(document.fullscreenElement || webkit));
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange as EventListener);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange as EventListener);
    };
  }, []);

  async function toggleFullscreen() {
    const container = appRef.current as (HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void }) | null;
    const doc = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => Promise<void> | void };
    const inNative = Boolean(document.fullscreenElement || doc.webkitFullscreenElement);
    try {
      if (!inNative) {
        if (container?.requestFullscreen) await container.requestFullscreen();
        else if (container?.webkitRequestFullscreen) await container.webkitRequestFullscreen();
        else throw new Error("Fullscreen API is not supported");
        return;
      }
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
    } catch {
      setIsFullscreen((v) => !v);
    }
  }

  const fitScale = Math.min(viewport.width / SLIDE_W, viewport.height / SLIDE_H);
  const SlideComponent = SLIDES[current].component;
  const segments = [{ start: 0, end: SECTIONS[0].start }, ...SECTIONS.map((s, i) => ({ start: s.start, end: i < SECTIONS.length - 1 ? SECTIONS[i + 1].start : total }))];

  return (
    <div ref={appRef} className={`presentation-app ${isFullscreen ? "is-fullscreen" : ""} ${uiAwake || overview ? "ui-awake" : ""}`} onMouseMove={wakeUi}>
      <div className="deck-progress" aria-hidden="true">
        {segments.map((seg, i) => {
          const len = seg.end - seg.start;
          const fill = Math.min(1, Math.max(0, (current - seg.start + 1) / len));
          return (
            <span key={i} className={`deck-progress-seg ${current >= seg.start && current < seg.end ? "is-current" : ""}`} style={{ flex: len }}>
              <i style={{ transform: `scaleX(${fill})` }} />
            </span>
          );
        })}
      </div>

      <div className="presentation-main">
        <div className="presentation-stage-shell">
          <div className="presentation-stage">
            <div
              key={current}
              className="stage-enter slide-canvas"
              style={{ width: SLIDE_W, height: SLIDE_H, transform: `translate(-50%, -50%) scale(${fitScale})` }}
            >
              <DeckNav.Provider value={{ goTo, current }}>
                <SlideComponent />
              </DeckNav.Provider>
            </div>
          </div>
        </div>
      </div>

      <div className="deck-dock" data-interactive>
        <button type="button" onClick={prev} disabled={current === 0} className="deck-dock-btn" aria-label="Өмнөх slide">
          <ChevronLeft size={20} strokeWidth={2.6} />
        </button>
        <button type="button" className="deck-dock-info" onClick={() => setOverview((o) => !o)} title="Бүх slide (G)">
          <span className="deck-dock-num">
            <b key={current}>{String(current + 1).padStart(2, "0")}</b>
            <i>/ {String(total).padStart(2, "0")}</i>
          </span>
          <span className="deck-dock-title">{SLIDES[current].title}</span>
          <LayoutGrid size={15} strokeWidth={2.4} className="deck-dock-grid" />
        </button>
        <button type="button" onClick={next} disabled={current === total - 1} className="deck-dock-btn is-next" aria-label="Дараагийн slide">
          <ChevronRight size={20} strokeWidth={2.6} />
        </button>
        <span className="deck-dock-sep" />
        <button type="button" onClick={() => void toggleFullscreen()} className="deck-dock-btn is-ghost" aria-label={isFullscreen ? "Бүтэн дэлгэцээс гарах" : "Бүтэн дэлгэц"}>
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      </div>

      {overview && (
        <div className="deck-overview" data-interactive onClick={() => setOverview(false)}>
          <div className="deck-overview-panel" onClick={(e) => e.stopPropagation()}>
            <div className="deck-overview-head">
              <span>Бүх slide</span>
              <button type="button" onClick={() => setOverview(false)} aria-label="Хаах">
                ✕
              </button>
            </div>
            {segments.map((seg, si) => (
              <div key={si} className="deck-overview-group">
                <p className="deck-overview-sec">{si === 0 ? "Cover" : `${SECTIONS[si - 1].n} · ${SECTIONS[si - 1].title}`}</p>
                <div className="deck-overview-grid">
                  {SLIDES.slice(seg.start, seg.end).map((sl, j) => {
                    const i = seg.start + j;
                    return (
                      <button
                        key={sl.id}
                        type="button"
                        className={`deck-overview-item ${i === current ? "is-current" : ""}`}
                        onClick={() => {
                          setCurrent(i);
                          setOverview(false);
                        }}
                      >
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        <span>{sl.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const search = new URLSearchParams(window.location.search);
  const mode = search.get("export");
  const index = (Number(search.get("slide") ?? "1") || 1) - 1;
  if (mode === "pdf") return <ExportDeck />;
  if (mode === "still") return <SingleSlide index={index} className="still-root" />;
  if (mode === "slide") return <SingleSlide index={index} className="pdf-export-root" />;
  return <PresentationApp />;
}
