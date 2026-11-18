import { useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import {
  ArrowUpRight,
  BadgePercent,
  Banknote,
  Building2,
  Database,
  Earth,
  FileCheck,
  Gavel,
  Globe,
  Hourglass,
  Landmark,
  Leaf,
  Lock,
  Map as MapIcon,
  MountainSnow,
  ShieldCheck,
  Snowflake,
  Sun,
  Unlock,
  Wind,
  Zap,
} from "lucide-react";
import heroImage from "../assets/hero-datacenter.jpg";
import closingImage from "../assets/closing-landscape.jpg";
import { AUTO, Header, Pattern, Pill, Slide, delay, fmt, logoImage, useCountUp, useDeckNav, useSpotlight, useSteps, useTween } from "./shared";

/* ═════════════════════════════════════════
   01 · Cover
   ═════════════════════════════════════════ */
export function S01() {
  return (
    <div className="slide-root gx-slide gx-cover">
      <div className="gx-bg" />
      <div className="cv-photo" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="cv-shade" />
      <Pattern className="cv-pattern" />
      <div className="gx-grid" />

      <svg className="cv-curve" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <path className="cv-curve-glow" d="M -20 752 H 1210 C 1268 752 1292 772 1336 800 C 1372 822 1396 830 1440 830 H 1620" />
        <path className="cv-curve-line" d="M -20 752 H 1210 C 1268 752 1292 772 1336 800 C 1372 822 1396 830 1440 830 H 1620" />
      </svg>

      <div className="gx-body cv-body">
        <img className="cv-logo fade-up" src={logoImage} alt="Government of Mongolia — Ministry of Digital Development, Innovation and Communications" />

        <h1 className="cv-title">
          <span className="cv-line is-bold">
            <i style={delay(0.35)}>Powering Intelligence:</i>
          </span>
          <span className="cv-line is-light">
            <i style={delay(0.5)}>Mongolia’s Green</i>
          </span>
          <span className="cv-line is-light">
            <i style={delay(0.65)}>Data Center</i>
          </span>
          <span className="cv-line is-bold">
            <i style={delay(0.8)}>Opportunities</i>
          </span>
        </h1>

        <div className="cv-pills fade-up" style={delay(1.05)}>
          <Pill solid>2026</Pill>
          <Pill>
            Climate <b>·</b> Renewables <b>·</b> Land <b>·</b> Policy
          </Pill>
        </div>

        <p className="cv-foot fade-up" style={delay(1.3)}>
          Ministry of Digital Development, Innovation and Communications <span>Investor brochure</span>
        </p>
      </div>

      <div className="cv-stats">
        <CoverStat icon={Snowflake} value="<1.2" label="design PUE" style={{ left: 1068, top: 168, ...delay(1.2) }} />
        <CoverStat icon={Sun} value="2,600 GW" label="renewable potential" style={{ left: 1262, top: 300, ...delay(1.4) }} />
        <CoverStat icon={MapIcon} value="1.56mn" label="sq.km of territory" style={{ left: 1036, top: 418, ...delay(1.6) }} />
      </div>
    </div>
  );
}

function CoverStat({ icon: Icon, value, label, style }: { icon: ElementType; value: string; label: string; style: CSSProperties }) {
  return (
    <div className="cv-stat pop-in" style={style}>
      <span className="cv-stat-ic">
        <Icon size={20} strokeWidth={2.2} />
      </span>
      <span>
        <b>{value}</b>
        <i>{label}</i>
      </span>
    </div>
  );
}

/* ═════════════════════════════════════════
   02 · Natural advantage
   ═════════════════════════════════════════ */
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const FREEZING = new Set([0, 1, 2, 10, 11]);

type Pillar = { key: string; icon: ElementType; stat: ReactNode; unit: string; viz: ReactNode; points: string[] };

function NumStat({ to, decimals = 0, prefix = "", suffix = "", delayMs = 500 }: { to: number; decimals?: number; prefix?: string; suffix?: string; delayMs?: number }) {
  const v = useCountUp(to, { decimals, delay: delayMs });
  return (
    <>
      {prefix}
      {decimals ? v.toFixed(decimals) : fmt(v)}
      {suffix && <small>{suffix}</small>}
    </>
  );
}

export function S02() {
  const { active, pin } = useSpotlight(4, 3600, 2600);
  const pillars: Pillar[] = [
    {
      key: "Climate",
      icon: Snowflake,
      stat: (
        <>
          <small>&lt;</small>
          <NumStat to={1.2} decimals={1} delayMs={500} />
        </>
      ),
      unit: "design PUE",
      viz: (
        <div className="na-months" title="Mean temperatures below freezing, November–March">
          {MONTHS.map((m, i) => (
            <span key={i} className={FREEZING.has(i) ? "is-cold" : ""} style={delay(0.9 + i * 0.05)}>
              <i />
              {m}
            </span>
          ))}
        </div>
      ),
      points: [
        "Average annual temperature of about 2°C, with mean temperatures below freezing from November through March",
        "Cold, dry conditions support design PUE below 1.2 versus a global average of 1.54",
        "Cooling is one of the largest controllable costs in data center operations — a structural advantage Mongolia does not need to create",
      ],
    },
    {
      key: "Renewable resource",
      icon: Sun,
      stat: <NumStat to={2600} delayMs={650} />,
      unit: "GW renewable potential",
      viz: (
        <div className="na-meter">
          <div className="na-meter-row">
            <span>Solar</span>
            <b>1,200–1,600 kWh/m²/yr</b>
          </div>
          <div className="na-meter-row">
            <span>Wind</span>
            <b>~35% capacity factor</b>
          </div>
        </div>
      ),
      points: [
        "Solar resources of 1,200–1,600 kWh/m²/year, with close to 300 sunny days",
        "Average wind capacity factors of around 35%, complementing solar generation",
        "Estimated renewable resources equivalent to 5,457 TWh annually, compared with a national power system of under 2 GW",
      ],
    },
    {
      key: "Land",
      icon: MapIcon,
      stat: <NumStat to={1.56} decimals={2} suffix="mn" delayMs={800} />,
      unit: "sq.km of territory",
      viz: (
        <div className="na-land">
          <div className="na-land-bar">
            <span className="is-state" style={delay(1)} />
            <span className="is-private" />
          </div>
          <div className="na-land-legend">
            <span>
              <i className="is-private" />
              ~2% privately owned
            </span>
            <span>
              <i className="is-state" />
              Rest of territory
            </span>
          </div>
        </div>
      ),
      points: [
        "Only ~2% of land is privately owned, enabling government-led allocation without assembling multiple private titles",
        "Population density of ~2 people per km², among the lowest in the world",
        "86% of the territory is agricultural pastureland or open steppe — significant potential for large-scale development",
      ],
    },
    {
      key: "Position",
      icon: Landmark,
      stat: <span className="na-stat-text">Oasis of Democracy</span>,
      unit: "Independent · Non-aligned",
      viz: (
        <div className="na-chips">
          <span style={delay(1.1)}>Parliamentary democracy</span>
          <span style={delay(1.2)}>Non-aligned</span>
          <span style={delay(1.3)}>AI priority</span>
        </div>
      ),
      points: [
        "A parliamentary democracy with an independent, non-aligned foreign policy",
        "Land-linked to one of the world’s largest markets",
        "Digital transformation and AI are national development priorities",
      ],
    },
  ];

  return (
    <Slide page={2}>
      <Header kicker="Natural advantage" title={<>Mongolia’s natural advantage: <em>weather, power and land</em></>} size={44} />
      <div className="na-grid">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <article
              key={p.key}
              className={`na-card rise-in ${active === i ? "is-active" : ""} ${active !== -1 && active !== i ? "is-dim" : ""}`}
              style={delay(0.25 + i * 0.12)}
              onMouseEnter={() => AUTO && pin(i)}
              onClick={() => pin(i)}
            >
              <div className="na-card-head">
                <span className="na-ic">
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <span className="na-key">{p.key}</span>
                <span className="na-idx">0{i + 1}</span>
              </div>
              <div className="na-stat">{p.stat}</div>
              <p className="na-unit">{p.unit}</p>
              <div className="na-viz">{p.viz}</div>
              <ul className="na-points">
                {p.points.map((t, j) => (
                  <li key={j} className="fade-up" style={delay(0.8 + i * 0.12 + j * 0.1)}>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Slide>
  );
}

/* ═════════════════════════════════════════
   03–06 · Policy and legal environment
   ═════════════════════════════════════════ */
type Policy = { tag: string; icon: ElementType; stat: ReactNode; unit: string; viz: ReactNode; points: { icon: ElementType; text: string }[] };

function WhtViz() {
  return (
    <div className="pl-wht">
      <p>Withholding tax on eligible loan interest</p>
      <div className="pl-wht-row">
        <span>Before</span>
        <div className="pl-wht-track">
          <i className="is-before" style={{ width: "100%" }} />
        </div>
        <b>20%</b>
      </div>
      <div className="pl-wht-row">
        <span>Now</span>
        <div className="pl-wht-track">
          <i className="is-after" style={{ width: "25%" }} />
        </div>
        <b className="is-lime">5%</b>
      </div>
    </div>
  );
}

function YearsViz() {
  return (
    <div className="pl-years">
      <p>Tax environment fixed by stabilization certificate</p>
      <div className="pl-years-track">
        <i className="pl-years-band" />
        {Array.from({ length: 21 }, (_, y) => (
          <span key={y} className={`pl-years-tick ${y % 5 === 0 ? "is-major" : ""} ${y >= 10 ? "is-on" : ""}`} style={{ left: `${(y / 20) * 100}%` }} />
        ))}
      </div>
      <div className="pl-years-labels">
        <span style={{ left: "0%" }}>0</span>
        <span style={{ left: "50%" }}>10 yrs</span>
        <span style={{ left: "100%" }}>20 yrs</span>
      </div>
    </div>
  );
}

function ChipsViz({ label, chips }: { label: string; chips: string[] }) {
  return (
    <div className="pl-chips">
      <p>{label}</p>
      <div>
        {chips.map((c, i) => (
          <span key={c} className="pop-in" style={delay(1 + i * 0.12)}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

const POLICIES: Policy[] = [
  {
    tag: "Access & protection",
    icon: Unlock,
    stat: <span className="pl-stat-word">Open</span>,
    unit: "to foreign investors",
    viz: <ChipsViz label="Expressly open to foreign investment" chips={["Data centers", "AI", "Renewable energy"]} />,
    points: [
      { icon: Globe, text: "National treatment: data centers, AI and renewable energy are expressly open to foreign investment" },
      { icon: ShieldCheck, text: "Protection in law against unlawful expropriation, suspension or interference" },
      { icon: Gavel, text: "Investor grievance channel at the Investment and Trade Agency, with arbitration if a dispute is unresolved after six months" },
    ],
  },
  {
    tag: "Incentives",
    icon: BadgePercent,
    stat: <PolicyCount to={100} suffix="%" />,
    unit: "customs duty exemption",
    viz: <WhtViz />,
    points: [
      { icon: Database, text: "Full customs duty exemption on IT equipment for data centers and AI facilities" },
      { icon: BadgePercent, text: "Withholding tax cut from 20% to 5% on interest from eligible loans and debt instruments" },
      { icon: Building2, text: "Free zone regime adds customs, tax and land-fee incentives" },
    ],
  },
  {
    tag: "Stability",
    icon: Hourglass,
    stat: (
      <>
        <PolicyCount to={10} />
        <span className="pl-dash">–</span>
        <PolicyCount to={20} delayMs={800} />
      </>
    ),
    unit: "years of tax stabilization",
    viz: <YearsViz />,
    points: [
      { icon: FileCheck, text: "Stabilization certificates fix the tax environment for 10 to 20 years, with simplified eligibility" },
      { icon: Landmark, text: "Investment agreements give large projects long-term certainty" },
      { icon: Zap, text: "Lighter regulation: fewer permits, notification-based entry and no more than two overlapping inspections" },
    ],
  },
  {
    tag: "Data law",
    icon: Lock,
    stat: <span className="pl-stat-word is-small">Data Law</span>,
    unit: "data protection",
    viz: <ChipsViz label="Data centers covered by the law" chips={["Domestic", "Foreign", "Multinational", "Free zones"]} />,
    points: [
      { icon: Lock, text: "Data sovereignty in law: foreign data hosted in Mongolia would be inviolable, with state access only under a ratified treaty" },
      { icon: Earth, text: "A legal home for international data centers: the law covers domestic, foreign and multinational data centers, including operation in Mongolia’s free zones" },
      { icon: FileCheck, text: "One-stop permitting: single-window licensing with defined timelines and streamlined visas for specialist personnel" },
    ],
  },
];

function PolicyCount({ to, suffix = "", delayMs = 500 }: { to: number; suffix?: string; delayMs?: number }) {
  const v = useCountUp(to, { delay: delayMs, duration: 1300 });
  return (
    <>
      {v}
      {suffix && <small>{suffix}</small>}
    </>
  );
}

function PolicySlide({ idx }: { idx: number }) {
  const { goTo } = useDeckNav();
  const p = POLICIES[idx];
  const Icon = p.icon;
  return (
    <Slide page={3 + idx}>
      <Header kicker={`Policy & legal · ${idx + 1} of 4`} title={<>A policy and legal environment built for <em>international data center investors</em></>} size={40} maxWidth={1260} />
      <div className="pl-grid">
        <nav className="pl-steps fade-up" style={delay(0.2)} aria-label="Policy pillars">
          <span className="pl-steps-rail">
            <i style={{ height: `${(idx / 3) * 100}%` }} />
          </span>
          {POLICIES.map((q, i) => {
            const QIcon = q.icon;
            return (
              <button key={q.tag} type="button" className={`pl-step ${i === idx ? "is-current" : ""} ${i < idx ? "is-done" : ""}`} onClick={() => goTo(2 + i)}>
                <span className="pl-step-dot">
                  <QIcon size={16} strokeWidth={2.4} />
                </span>
                <span className="pl-step-txt">
                  <i>0{i + 1}</i>
                  {q.tag}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="pl-hero rise-in" style={delay(0.3)}>
          <div className="pl-hero-glow" />
          <span className="pl-hero-tag">{p.tag}</span>
          <div className="pl-hero-ic">
            <span className="pl-hero-ring" />
            <Icon size={34} strokeWidth={2} />
          </div>
          <div className="pl-stat">{p.stat}</div>
          <p className="pl-unit">{p.unit}</p>
          <div className="pl-viz fade-up" style={delay(0.9)}>
            {p.viz}
          </div>
        </div>

        <ol className="pl-points">
          {p.points.map((pt, i) => {
            const PIcon = pt.icon;
            return (
              <li key={i} className="pl-point slide-in" style={delay(0.55 + i * 0.18)}>
                <span className="pl-point-n">0{i + 1}</span>
                <p>{pt.text}</p>
                <span className="pl-point-ic">
                  <PIcon size={22} strokeWidth={2} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Slide>
  );
}

export const S03 = () => <PolicySlide idx={0} />;
export const S04 = () => <PolicySlide idx={1} />;
export const S05 = () => <PolicySlide idx={2} />;
export const S06 = () => <PolicySlide idx={3} />;

/* ═════════════════════════════════════════
   07 · Benchmark across 26 jurisdictions
   Positions measured from Brochure.pptx (track x 421 → 658.6 pt)
   ═════════════════════════════════════════ */
const T0 = 421;
const TW = 237.6;
const pos = (x: number) => Math.min(100, Math.max(0, ((x - T0) / TW) * 100));
const LEVERS: { lever: string; weak: string; strong: string; iqr: [number, number]; median: number; mongolia: number }[] = [
  { lever: "Power connection date", weak: "No commitment", strong: "Firm grid connection date", iqr: [488.2, 81.7], median: 548.5, mongolia: 539.8 },
  { lever: "Power price", weak: "Merchant market pricing", strong: "25-year fixed-price PPA", iqr: [480.4, 118.8], median: 546.7, mongolia: 558.8 },
  { lever: "Sovereignty", weak: "Host-state law and access", strong: "Statutory inviolability, treaty access only", iqr: [533.6, 34.4], median: 553.6, mongolia: 649.1 },
  { lever: "Concessional finance", weak: "None available", strong: "Full DFI syndication", iqr: [442.4, 104.7], median: 485.1, mongolia: 618.2 },
  { lever: "Licensing and approvals", weak: "No statutory deadline", strong: "45 days to determination", iqr: [469.2, 127.1], median: 494.9, mongolia: 639.8 },
  { lever: "Customs and VAT on equipment", weak: "No relief", strong: "Full exemption on import", iqr: [494.1, 109.6], median: 512.5, mongolia: 658.6 },
  { lever: "Corporate income tax holiday", weak: "No holiday", strong: "30 years, or 0% indefinitely", iqr: [458.7, 133.3], median: 520.1, mongolia: 539.8 },
  { lever: "Withholding tax", weak: "Full standard rate", strong: "Full exemption", iqr: [447.1, 87.9], median: 476.8, mongolia: 658.4 },
  { lever: "Property tax", weak: "No relief", strong: "Full exemption", iqr: [478.0, 95.0], median: 525.5, mongolia: 658.6 },
  { lever: "Land tenure and tariffs", weak: "Market rates, short tenure", strong: "Nil cost, 50-year tenure", iqr: [525.5, 90.5], median: 560.2, mongolia: 634.8 },
  { lever: "Community partnership", weak: "No framework", strong: "Model agreement, defined terms", iqr: [460.6, 59.4], median: 480.4, mongolia: 634.8 },
];

export function S07() {
  const { active, pin } = useSpotlight(LEVERS.length, 2600, 3200);
  return (
    <Slide page={7}>
      <Header kicker="Global benchmark" title={<>Mongolia chooses to lead <em>where it matters most</em></>} size={46} />
      <div className="bm-table fade-up" style={delay(0.2)}>
        <div className="bm-row is-head">
          <span>Lever</span>
          <span className="is-r">Weakest</span>
          <span className="is-c">Observed range across 26 jurisdictions</span>
          <span>Strongest</span>
        </div>
        {LEVERS.map((l, i) => {
          const a = pos(l.iqr[0]);
          const b = pos(l.iqr[0] + l.iqr[1]);
          return (
            <div key={l.lever} className={`bm-row ${active === i ? "is-active" : ""}`} onMouseEnter={() => AUTO && pin(i)} onClick={() => pin(i)}>
              <span className="bm-lever">{l.lever}</span>
              <span className="bm-weak is-r">{l.weak}</span>
              <span className="bm-track">
                <i className="bm-track-line" />
                <i className="bm-iqr" style={{ left: `${a}%`, width: `${b - a}%`, ...delay(0.45 + i * 0.06) }} />
                <i className="bm-median" style={{ left: `${pos(l.median)}%`, ...delay(0.8 + i * 0.06) }} />
                <i className="bm-dot-wrap" style={{ "--x": `${pos(l.mongolia)}%`, ...delay(1 + i * 0.07) } as CSSProperties}>
                  <i className="bm-dot" />
                </i>
              </span>
              <span className="bm-strong">{l.strong}</span>
            </div>
          );
        })}
        <div className="bm-legend fade-up" style={delay(1.9)}>
          <span>
            <i className="lg-iqr" />
            Middle half of the field
          </span>
          <span>
            <i className="lg-median" />
            Median
          </span>
          <span>
            <i className="lg-dot" />
            Mongolia, proposed
          </span>
        </div>
      </div>
    </Slide>
  );
}

/* ═════════════════════════════════════════
   08 · The opportunity — equity IRR
   ═════════════════════════════════════════ */
const IRR_STAGES = [
  { label: "Base case", sub: "Without policy support", value: 9, shown: "~9%" },
  { label: "Existing measures", sub: "IRR under existing measures", value: 14, shown: "~14%" },
  { label: "Proposed measures", sub: "Full policy support", value: 18, shown: ">18%" },
];
const OPPORTUNITY: { icon: ElementType; text: string }[] = [
  { icon: Banknote, text: "Existing $2bn in committed financing for green, renewable infrastructure" },
  { icon: ShieldCheck, text: "Data sovereignty guaranteed in law" },
  { icon: Zap, text: "Private sector offering 24 months to energization" },
  { icon: MapIcon, text: "Abundance of suitable land at low cost" },
  { icon: Snowflake, text: "Naturally cool climate reducing power cost" },
  { icon: FileCheck, text: "Existing and proposed supportive policy and tax package" },
];
const IRR_MAX = 20;
const CHART_H = 250;

export function S08() {
  const [step, setStep] = useSteps(3, 1300, 900);
  const stage = Math.max(1, step);
  const current = IRR_STAGES[stage - 1];
  const big = useTween(current.value);
  const h = (v: number) => (v / IRR_MAX) * CHART_H;

  return (
    <Slide page={8}>
      <Header kicker="The opportunity" title={<>A new frontier for <em>green digital infrastructure</em></>} size={46} />
      <div className="op-grid">
        <section className="op-irr rise-in" style={delay(0.2)}>
          <div className="op-irr-top">
            <div>
              <p className="op-eyebrow">{stage === 3 ? "Attractive equity returns of over" : `Equity IRR · ${current.label}`}</p>
              <div className="op-big">
                {stage === 3 && <small>&gt;</small>}
                {big}
                <small>%</small>
              </div>
              <p className="op-cap">Equity IRR uplift available to data center projects in Mongolia</p>
            </div>
            <div className="op-toggle" role="tablist" aria-label="Policy scenario">
              {IRR_STAGES.map((s, i) => (
                <button key={s.label} type="button" role="tab" aria-selected={stage === i + 1} className={stage === i + 1 ? "is-on" : ""} onClick={() => setStep(i + 1)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="op-chart" style={{ height: CHART_H + 64 }}>
            <div className="op-axis">
              {[0, 5, 10, 15, 20].map((t) => (
                <span key={t} style={{ bottom: h(t) }}>
                  <b>{t}%</b>
                </span>
              ))}
            </div>
            <div className="op-bars">
              {IRR_STAGES.map((s, i) => {
                const on = stage >= i + 1;
                return (
                  <div key={s.label} className={`op-col ${on ? "is-on" : ""} ${stage === i + 1 ? "is-current" : ""}`}>
                    <span className="op-val" style={{ bottom: 64 + (on ? h(s.value) : 0) + 10 }}>
                      {s.shown}
                    </span>
                    <div className="op-stack" style={{ height: on ? h(s.value) : 0 }}>
                      {i >= 2 && <i className="seg is-prop" style={{ height: h(4) }} />}
                      {i >= 1 && <i className="seg is-exist" style={{ height: h(5) }} />}
                      <i className="seg is-base" style={{ height: h(9) }} />
                    </div>
                    <p className="op-col-lbl">
                      <b>{s.label}</b>
                      {s.sub}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={`op-bracket ${stage === 3 ? "is-on" : ""}`} style={{ bottom: 64 + h(9), height: h(9) }}>
              <span>+900 bps</span>
            </div>
          </div>
          <p className="op-note">
            <ArrowUpRight size={16} strokeWidth={2.6} />
            Existing and proposed policy levers together add over 900 basis points of equity IRR to more than 18%
          </p>
        </section>

        <section className="op-list">
          <p className="op-list-title fade-up" style={delay(0.35)}>
            The Mongolia Opportunity
          </p>
          <div className="op-tiles">
            {OPPORTUNITY.map((o, i) => {
              const Icon = o.icon;
              return (
                <div key={i} className="op-tile rise-in" style={delay(0.5 + i * 0.1)}>
                  <span className="op-tile-ic">
                    <Icon size={22} strokeWidth={2.1} />
                  </span>
                  <p>{o.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Slide>
  );
}

/* ═════════════════════════════════════════
   09 · Closing
   ═════════════════════════════════════════ */
const VALUES: { icons: ElementType[]; label: string }[] = [
  { icons: [Snowflake], label: "Naturally cool climate" },
  { icons: [Wind, Sun], label: "Abundant renewable energy" },
  { icons: [Leaf], label: "Green & sustainable infrastructure" },
  { icons: [ShieldCheck], label: "Stable, neutral & reliable" },
  { icons: [Globe], label: "Bridging markets, connecting futures" },
];

export function S09() {
  const [hover, setHover] = useState(-1);
  return (
    <div className="slide-root gx-slide gx-closing">
      <div className="gx-bg" />
      <div className="cl-photo" style={{ backgroundImage: `url(${closingImage})` }} />
      <div className="cl-fade" />
      <Pattern className="cl-pattern" />
      <div className="gx-grid" />

      <div className="gx-body cl-body">
        <img className="cl-logo fade-up" src={logoImage} alt="Government of Mongolia — Ministry of Digital Development, Innovation and Communications" />
        <Pill className="cl-kicker fade-up" style={delay(0.15)}>
          Mongolia: Asia’s next green data hub
        </Pill>
        <h2 className="cl-title">
          <span className="cv-line is-bold">
            <i style={delay(0.3)}>Let’s build</i>
          </span>
          <span className="cv-line is-light">
            <i style={delay(0.45)}>the future together</i>
          </span>
        </h2>

        <div className="cl-values">
          {VALUES.map((v, i) => (
            <div
              key={v.label}
              className={`cl-value rise-in ${hover === i ? "is-hover" : ""}`}
              style={delay(0.7 + i * 0.12)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
            >
              <span className="cl-value-ic">
                {v.icons.map((I, k) => (
                  <I key={k} size={26} strokeWidth={1.9} />
                ))}
              </span>
              <p>{v.label}</p>
            </div>
          ))}
        </div>
      </div>

      <span className="cl-tag pop-in" style={{ left: 150, top: 690, ...delay(1.5) }}>
        <Sun size={15} strokeWidth={2.4} />
        Clean energy
      </span>
      <span className="cl-tag pop-in" style={{ right: 140, top: 640, ...delay(1.7) }}>
        <MountainSnow size={15} strokeWidth={2.4} />
        Naturally cool for efficiency
      </span>
    </div>
  );
}
