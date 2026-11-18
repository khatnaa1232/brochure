/* ═════════════════════════════════════════════════════════════
   Slides 10–14 · Khushig Valley Free Economic Zone (last 5.pptx)
   Same tokens as the main deck, but a distinct "chapter" frame:
   deeper blue field, left rail with chapter navigation, solid
   lime kicker, FEZ logo in the header.
   ═════════════════════════════════════════════════════════════ */
import { useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import {
  CircleCheck,
  Droplet,
  Droplets,
  Expand,
  MapPin,
  Plane,
  Route,
  TrainFront,
  Warehouse,
  Waves,
  Waypoints,
  X,
  Zap,
} from "lucide-react";
import fezLogo from "../assets/fez-logo.png";
import planImage from "../assets/fez-masterplan.png";
import mapSvg from "../assets/fez-map.svg?raw";
import photoSubstation from "../assets/fz-substation.jpg";
import photoSewage from "../assets/fz-sewage.jpg";
import photoFlood from "../assets/fz-flood.jpg";
import photoWaterSupply from "../assets/fz-water-supply.jpg";
import photoWaterStorage from "../assets/fz-water-storage.jpg";
import photoWaterDist from "../assets/fz-water-distribution.jpg";
import { AUTO, DECK_TITLE, IS_EXPORT, Pattern, delay, logoImage, pad2, useCountUp, useDeckNav, useSpotlight } from "./shared";

const FZ_FIRST = 9;
const FZ_PAGES = ["Khushig Valley", "Location", "Master plan", "Tax incentives", "Infrastructure"];

/* ─── chapter shell ─── */
function FzSlide({ page, kicker, title, size = 44, children, className = "", bare = false }: { page: number; kicker?: string; title?: ReactNode; size?: number; children: ReactNode; className?: string; bare?: boolean }) {
  const { goTo } = useDeckNav();
  return (
    <div className={`slide-root gx-slide fz-slide ${className}`}>
      <div className="fz-bg" />
      <div className="gx-grid fz-grid" />

      <aside className="fz-rail">
        <nav className="fz-rail-nav" aria-label="Khushig Valley chapter">
          {FZ_PAGES.map((label, i) => (
            <button key={label} type="button" title={label} className={FZ_FIRST + i === page ? "is-on" : ""} onClick={() => goTo(FZ_FIRST - 1 + i)} />
          ))}
        </nav>
        <span className="fz-rail-txt">Khushig Valley · Free Economic Zone</span>
        <span className="fz-rail-n">{pad2(page)}</span>
      </aside>

      {!bare && (
        <>
          <img className="fz-head-logo fade-in" src={fezLogo} alt="Free Economic Zone Khushig Valley" />
          <header className="fz-header">
            {kicker && <span className="fz-kicker fade-up">{kicker}</span>}
            {title && (
              <h2 className="gx-title fade-up" style={{ fontSize: size, ...delay(0.08) }}>
                {title}
              </h2>
            )}
          </header>
          <div className="gx-footer fz-footer">
            <img className="gx-footer-logo" src={logoImage} alt="Government of Mongolia — Ministry of Digital Development, Innovation and Communications" />
            <span className="gx-footer-sec">
              <b>05</b>Khushig Valley Free Economic Zone
            </span>
            <span className="gx-footer-page">{DECK_TITLE}</span>
          </div>
        </>
      )}
      <div className="gx-body fz-body">{children}</div>
    </div>
  );
}

/* ═════════════════════════════════════════
   10 · Chapter cover
   ═════════════════════════════════════════ */
export function S10() {
  return (
    <FzSlide page={9} bare className="fz-cover">
      <Pattern className="fzc-pattern" />
      <div className="fzc-plan-wrap" aria-hidden="true">
        <div className="fzc-plan">
          <img src={planImage} alt="" draggable={false} />
          <span className="fzc-plan-glow" />
        </div>
      </div>
      <div className="fzc-shade" />

      <div className="fzc-text">
        <img className="fzc-logo fade-up" src={fezLogo} alt="Free Economic Zone Khushig Valley" />
        <h1 className="fzc-title">
          <span className="cv-line is-light">
            <i style={delay(0.35)}>Khushig Valley</i>
          </span>
          <span className="cv-line is-bold">
            <i style={delay(0.5)}>Free Economic Zone</i>
          </span>
        </h1>
        <div className="fzc-facts">
          {[
            { icon: MapPin, v: "50 km", l: "from Ulaanbaatar City" },
            { icon: Plane, v: "700–800 m", l: "from the International Airport" },
            { icon: Waypoints, v: "1,000 Ha", l: "General development master plan" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.v} className="fzc-fact rise-in" style={delay(0.85 + i * 0.12)}>
                <Icon size={20} strokeWidth={2.2} />
                <b>{f.v}</b>
                <span>{f.l}</span>
              </div>
            );
          })}
        </div>
      </div>

      <svg className="fzc-curve" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 64 820 H 560 C 620 820 640 800 690 776 C 730 756 760 748 820 748 H 1620" />
      </svg>
      <div className="fz-cover-foot fade-up" style={delay(1.3)}>
        <img src={logoImage} alt="Government of Mongolia" />
        <span>
          <b>05</b> Investment location
        </span>
      </div>
    </FzSlide>
  );
}

/* ═════════════════════════════════════════
   11 · Location & investor-friendly environment
   ═════════════════════════════════════════ */
const LOCATION: { icon: ElementType; v: string; l: string }[] = [
  { icon: MapPin, v: "50 km", l: "from Ulaanbaatar City" },
  { icon: Plane, v: "700–800 m", l: "from the International Airport" },
  { icon: TrainFront, v: "Railway", l: "Connects to the Ulaanbaatar Railway" },
  { icon: Route, v: "Highway", l: "Connects to the International Highway" },
];
const INVESTOR_ENV = [
  "Centralized infrastructure meeting international standards",
  "Land use, incentives, and benefits",
  "Tax exemptions and reliefs",
  "Customs facilitation and flexible policies",
  "Fast-track registration and permitting system",
  "Stable legal and regulatory environment",
  "Development of a model for green growth and smart city planning",
];

export function S11() {
  return (
    <FzSlide page={10} kicker="Khushig Valley FEZ · Location" title={<>Location &amp; <em>investor-friendly environment</em></>} size={42}>
      <div className="lc-grid">
        <div className="lc-left">
          <p className="fz-label fade-up" style={delay(0.2)}>
            Location
          </p>
          <div className="lc-tiles">
            {LOCATION.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={t.v} className="lc-tile rise-in" style={delay(0.3 + i * 0.1)}>
                  <span className="lc-tile-ic">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <b>{t.v}</b>
                  <span>{t.l}</span>
                </div>
              );
            })}
          </div>
          <p className="fz-label fade-up" style={{ marginTop: 26, ...delay(0.6) }}>
            Investor-friendly environment
          </p>
          <ul className="lc-list">
            {INVESTOR_ENV.map((t, i) => (
              <li key={t} className="fade-up" style={delay(0.7 + i * 0.07)}>
                <CircleCheck size={17} strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lc-map rise-in" style={delay(0.25)}>
          <div className="lc-map-inner">
            <div className="lc-map-svg" dangerouslySetInnerHTML={{ __html: mapSvg }} />
            <span className="lc-pin" style={{ left: "63.96%", top: "50.45%" }}>
              <i />
              <span className="lc-pin-label pop-in" style={delay(2.2)}>
                <b>Khushig Valley FEZ</b>
                <small>50 km from Ulaanbaatar</small>
              </span>
            </span>
          </div>
        </div>
      </div>
    </FzSlide>
  );
}

/* ═════════════════════════════════════════
   12 · General development master plan
   Geometry measured from last 5.pptx (points, 960 × 540 slide)
   ═════════════════════════════════════════ */
const IT_ZONES = [
  "342.5,170.7 345.3,172.5 351.1,176.7 357.5,181.5 362.5,185.5 366.6,189.1 369.9,192.2 381.1,200.6 383.8,203 383,206.2 379.9,208.9 377.8,211.6 376,215.3 374.6,218 372.9,219.7 370.4,220.7 368.3,220.1 366.4,218.7 351,208.4 347.2,206.6 342.1,204.6 337.9,203.8 332.5,203.5 331.6,202.2 331.6,198.7 332.4,193.6 334,187.7 335.5,183.1 337.4,178.8 339.9,175 341.5,172.3",
  "331.5,205.4 334.2,205.4 337.6,205.8 341.3,207 344.6,208 348.6,209.5 352.8,211.8 361.4,217.6 365.1,220.6 368.5,223.6 366.2,224.2 364,226.9 362.3,229 360,231.1 356.8,232.9 353.8,235.3 351.9,237.6 351,240.6 345.4,238.3 338.4,235.9 331.3,233.7 327.6,232.8 329.7,227.6 331,221 331.7,214.3 331.4,210.9",
  "327.1,234.8 334.2,237 341.4,239.4 348.1,241.9 349.7,243 346,244.9 342.6,248.6 341.4,251.8 336.9,256.9 332.9,259.8 329.6,262.9 327.4,265.2 313.7,259.8",
  "389.2,206.7 396,210.6 395,213.9 393.3,217.8 391.3,222.2 389.1,226.2 386.7,230.3 385.3,231.9 383.2,230.9 379.3,228 375.6,225.1 376.9,222.4 377.2,219.6 379.3,216.9 382.9,215.1 385.1,213.3",
  "372.7,226.2 375.4,228.1 384,234.5 383.8,235.1 380.2,240.6 376.8,245.4 373,249.9 367.1,247.1 363.2,245.1 359.2,243 358.5,241.5 359.3,238.5 361,236.2 363,234.3 366,233.6 367.3,231.2 367,229.5 369.4,227.2 371.1,226.3",
  "355.8,244.8 362.8,247.7 368.3,250.3 370.9,251.6 367.8,255.4 363.8,260.5 359,267.1 352.5,278 340.4,271.6",
];
const SOLAR: [number, number][] = [
  [284.1, 127], [305.4, 128], [326.7, 129.3], [348.1, 130.6], [282.9, 137.7], [304.1, 138.7], [325.4, 140], [346.9, 141.4],
  [281.6, 148.6], [302.8, 149.6], [324.1, 150.9], [345.6, 152.3], [370.3, 136.4], [391.6, 137.4], [412.9, 138.7], [434.4, 140],
  [369.1, 147.1], [390.3, 148.1], [411.6, 149.4], [433.1, 150.8], [367.8, 158], [389, 159.1], [410.3, 160.3], [431.8, 161.7],
  [344.9, 164], [366.6, 169.1], [387.8, 170.3], [409.3, 171.7], [365.3, 179.8], [386.6, 181.1], [408, 182.4], [385.3, 192],
  [406.7, 193.4], [430.6, 185.6], [406.1, 205.2], [429.3, 196.3], [429.5, 208.6], [431.2, 173.4], [274, 157.7],
];
const PLANNED: [number, number, number, number][] = [
  [359, 290, 85, 163],
  [303, 268, 344, 200],
  [498, 335, 356, 288],
];
const INSTALLED: [number, number, number, number] = [824, 432, 500, 336];
const SUBSTATIONS = [
  { x: 499.5, y: 148.5, planned: false },
  { x: 408.5, y: 381.5, planned: true },
];
const LAYERS = [
  { key: "it", label: "Information Technology Cluster Zone", meta: "8.5 Ha" },
  { key: "solar", label: "Solar panels", meta: "20 Ha" },
  { key: "sub", label: "Substations", meta: "35/10 kV · planned 110/10 kV" },
  { key: "planned", label: "Planned fiber optic cable", meta: "96 core" },
  { key: "installed", label: "Installed fiber optic cable", meta: "48/96 core" },
];
const ZAP = "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";

function LayerSwatch({ k }: { k: string }) {
  if (k === "it") return <i className="mp-sw is-it" />;
  if (k === "solar") return <i className="mp-sw is-solar" />;
  if (k === "sub")
    return (
      <i className="mp-sw is-sub">
        <Zap size={13} strokeWidth={2.6} />
      </i>
    );
  return <i className={`mp-sw is-line is-${k}`} />;
}

export function S12() {
  const { active, pin } = useSpotlight(LAYERS.length, 3000, 3600);
  const ha = useCountUp(1000, { delay: 500, duration: 1600 });
  const focus = active >= 0 ? LAYERS[active].key : "";
  return (
    <FzSlide page={11} kicker="Khushig Valley FEZ · Master plan" title={<>General development master plan <em>of the free economic zone</em></>} size={36}>
      <div className="mp-grid">
        <aside className="mp-side">
          <div className="mp-area rise-in" style={delay(0.2)}>
            <div className="mp-area-num">
              {ha.toLocaleString("en-US")}
              <small>Ha</small>
            </div>
            <p className="mp-area-res">“Resolution No. 10 of Government of 2025”</p>
          </div>
          <div className="mp-legend">
            {LAYERS.map((l, i) => (
              <button
                key={l.key}
                type="button"
                className={`mp-layer fade-up ${focus === l.key ? "is-on" : ""}`}
                style={delay(0.45 + i * 0.08)}
                onMouseEnter={() => AUTO && pin(i)}
                onClick={() => pin(i)}
              >
                <LayerSwatch k={l.key} />
                <span>
                  {l.label}
                  <small>{l.meta}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className={`mp-map rise-in ${focus ? `focus-${focus}` : ""}`} style={delay(0.15)}>
          <svg viewBox="70 84 890 456" role="img" aria-label="Khushig Valley FEZ general development master plan">
            <defs>
              <filter id="mpGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <image className="mp-plan" href={planImage} x={245} y={109} width={602} height={428} preserveAspectRatio="none" />

            {/* cables */}
            <g className="mp-l mp-l-planned">
              {PLANNED.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
              <text className="mp-t" transform="translate(132 159) rotate(24.9)">
                Planned 96 core optic cable
              </text>
              <g className="mp-ub">
                <path d="M85 163 l5.75 8.18 M85 163 l9.96 -0.89" />
                <text className="mp-t" x={72} y={151}>
                  To UB City
                </text>
              </g>
            </g>
            <g className="mp-l mp-l-installed">
              <line className="mp-installed" x1={INSTALLED[0]} y1={INSTALLED[1]} x2={INSTALLED[2]} y2={INSTALLED[3]} />
              <path className="mp-leader is-cable" d="M824 432 L846 452" />
              <text className="mp-t is-cable" x={952} y={462} textAnchor="end">
                48/96 core optic cable
              </text>
              <text className="mp-t is-dim" x={952} y={476} textAnchor="end">
                <tspan x={952}>Connected with international</tspan>
                <tspan x={952} dy={12}>
                  cable network
                </tspan>
              </text>
              <g className="mp-plane" transform="translate(928 498) scale(0.95)">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </g>
            </g>

            {/* solar panels */}
            <g className="mp-l mp-l-solar">
              {SOLAR.map(([x, y], i) => (
                <rect key={i} x={x - 10} y={y - 4.35} width={20} height={8.7} rx={1.2} transform={`rotate(16.17 ${x} ${y})`} style={{ animationDelay: `${0.6 + i * 0.025}s` }} />
              ))}
              <g className="mp-tag" transform="translate(233 98)">
                <rect x={0} y={-11} width={98} height={18} rx={9} />
                <text x={49} y={2}>
                  20 Ha Solar Panel
                </text>
              </g>
            </g>

            {/* IT cluster */}
            <g className="mp-l mp-l-it">
              {IT_ZONES.map((pts, i) => (
                <polygon key={i} points={pts} style={{ animationDelay: `${1 + i * 0.08}s` }} />
              ))}
              <path className="mp-leader" d="M296 196 L330 205" />
              <g className="mp-tag is-lime" transform="translate(258 196)">
                <rect x={0} y={-11} width={46} height={18} rx={9} />
                <text x={23} y={2}>
                  8.5 Ha
                </text>
              </g>
            </g>

            {/* substations */}
            <g className="mp-l mp-l-sub">
              {SUBSTATIONS.map((s, i) => (
                <g key={i} transform={`translate(${s.x} ${s.y})`} className={s.planned ? "is-planned" : ""}>
                  <circle className="mp-sub-ring" r={13} />
                  <circle className="mp-sub-dot" r={12} />
                  <path d={ZAP} transform="translate(-8.4 -8.4) scale(0.7)" />
                </g>
              ))}
              <text className="mp-t is-strong" x={518} y={121}>
                <tspan x={518}>35/10 kV · 2×10 MVA</tspan>
                <tspan x={518} dy={12}>
                  Substation
                </tspan>
              </text>
              <text className="mp-t is-strong" x={346} y={408}>
                <tspan x={346}>Planned 110/10 kV</tspan>
                <tspan x={346} dy={12}>
                  2×40 MVA Substation
                </tspan>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </FzSlide>
  );
}

/* ═════════════════════════════════════════
   13 · Tax incentives
   ═════════════════════════════════════════ */
type Tax = { name: string; std?: string; from: number; decimals?: number; cond?: string };
const TAXES: Tax[] = [
  { name: "Value Added Tax", std: "10%", from: 10 },
  { name: "Customs Duties", std: "5–10%", from: 10 },
  { name: "Excise Tax", from: 0 },
  { name: "Property Tax", std: "0.6–2.0%", from: 2, decimals: 1 },
  { name: "Workplace Service Fee", from: 0 },
  { name: "Land Tax", from: 0, cond: "Up to 10 years" },
  { name: "Income Tax", from: 0, cond: "50% of foreign investment over US$300,000" },
];

function useCountDown(from: number, { delay: d = 600, duration = 1300, decimals = 0 } = {}) {
  const [value, setValue] = useState(IS_EXPORT ? 0 : from);
  useEffect(() => {
    if (IS_EXPORT || from === 0) return;
    setValue(from);
    let raf = 0;
    const start = performance.now() + d;
    const f = Math.pow(10, decimals);
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(Math.round(from * Math.pow(1 - p, 2) * f) / f);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, d, duration, decimals]);
  return value;
}

function TaxCard({ t, i, style }: { t: Tax; i: number; style?: CSSProperties }) {
  const v = useCountDown(t.from, { delay: 800 + i * 140, decimals: t.decimals ?? 0 });
  const done = v === 0;
  return (
    <article className={`tx-card rise-in ${t.cond ? "is-cond" : ""} ${done ? "is-zero" : ""}`} style={{ ...style, ...delay(0.3 + i * 0.09) }}>
      <span className="tx-idx">{pad2(i + 1)}</span>
      <h3>{t.name}</h3>
      <div className="tx-rate">
        {t.decimals && v !== 0 ? v.toFixed(t.decimals) : v}
        <small>%</small>
      </div>
      {t.std ? (
        <p className="tx-std">
          Standard <s>{t.std}</s>
        </p>
      ) : (
        <p className="tx-std">Fully exempt</p>
      )}
      {t.cond && <p className="tx-cond">{t.cond}</p>}
    </article>
  );
}

export function S13() {
  return (
    <FzSlide page={12} kicker="Khushig Valley FEZ · Incentives" title={<>Tax <em>incentives</em></>} size={52}>
      <div className="tx-grid">
        <section className="tx-hero rise-in" style={delay(0.15)}>
          <Pattern className="tx-hero-pattern" />
          <p className="fz-label">Inside the free economic zone</p>
          <div className="tx-hero-num">
            0<small>%</small>
          </div>
          <p className="tx-hero-cap">
            on <b>7</b> taxes and fees
          </p>
          <ul className="tx-hero-list">
            <li>
              <i className="is-full" />5 fully exempt
            </li>
            <li>
              <i className="is-cond" />2 with conditions
            </li>
          </ul>
        </section>
        <div className="tx-cards">
          <div className="tx-row">
            {TAXES.slice(0, 4).map((t, i) => (
              <TaxCard key={t.name} t={t} i={i} />
            ))}
          </div>
          <div className="tx-row is-offset">
            {TAXES.slice(4).map((t, i) => (
              <TaxCard key={t.name} t={t} i={i + 4} />
            ))}
          </div>
        </div>
      </div>
    </FzSlide>
  );
}

/* ═════════════════════════════════════════
   14 · Engineering infrastructure
   ═════════════════════════════════════════ */
const INFRA: { photo: string; icon: ElementType; value: string; unit?: string; label: string }[] = [
  { photo: photoSubstation, icon: Zap, value: "35/10 kV", unit: "2×10,000 kW", label: "Substation" },
  { photo: photoSewage, icon: Waves, value: "3,000", unit: "m³/day", label: "Sewage system" },
  { photo: photoFlood, icon: Route, value: "6.2", unit: "km", label: "Floodwater protection zone" },
  { photo: photoWaterSupply, icon: Droplet, value: "3,500", unit: "m³/day · 5 units", label: "Water supply system" },
  { photo: photoWaterStorage, icon: Warehouse, value: "2×2,000", unit: "m³", label: "Water storage" },
  { photo: photoWaterDist, icon: Droplets, value: "22", unit: "km", label: "Water distribution system" },
];

export function S14() {
  const [open, setOpen] = useState(-1);
  const item = open >= 0 ? INFRA[open] : null;
  return (
    <FzSlide page={13} kicker="Khushig Valley FEZ · On site" title={<>Engineering <em>infrastructure</em></>} size={50}>
      <div className="if-grid">
        {INFRA.map((c, i) => {
          const Icon = c.icon;
          return (
            <button key={c.label} type="button" className="if-card rise-in" style={delay(0.2 + i * 0.1)} onClick={() => setOpen(i)}>
              <span className="if-photo" style={{ backgroundImage: `url(${c.photo})` }} />
              <span className="if-shade" />
              <span className="if-ic">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span className="if-expand">
                <Expand size={16} strokeWidth={2.4} />
              </span>
              <span className="if-meta">
                <b>
                  {c.value}
                  {c.unit && <small>{c.unit}</small>}
                </b>
                <i>{c.label}</i>
              </span>
            </button>
          );
        })}
      </div>

      {item && (
        <div className="if-lightbox" onClick={() => setOpen(-1)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={item.photo} alt={item.label} />
            <figcaption>
              <b>
                {item.value} {item.unit}
              </b>
              {item.label}
            </figcaption>
            <button type="button" className="if-close" onClick={() => setOpen(-1)} aria-label="Close">
              <X size={18} strokeWidth={2.6} />
            </button>
          </figure>
        </div>
      )}
    </FzSlide>
  );
}

