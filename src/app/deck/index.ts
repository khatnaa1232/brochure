import { S01, S02, S03, S04, S05, S06, S07, S08, S09 } from "./slides";
import { S10, S11, S12, S13, S14 } from "./fez";
import "../../styles/deck.css";
import "../../styles/fez.css";

export { DeckNav, SECTIONS } from "./shared";

/* 14 slides (9 from Brochure.pptx + 5 from last 5.pptx) — Powering Intelligence: Mongolia’s Green Data Center Opportunities (Brochure.pptx) */
export const SLIDES = [
  { id: 1, title: "Powering Intelligence", component: S01 },
  { id: 2, title: "Natural advantage", component: S02 },
  { id: 3, title: "Policy · Access & protection", component: S03 },
  { id: 4, title: "Policy · Incentives", component: S04 },
  { id: 5, title: "Policy · Stability", component: S05 },
  { id: 6, title: "Policy · Data law", component: S06 },
  { id: 7, title: "Benchmark · 26 jurisdictions", component: S07 },
  { id: 8, title: "The opportunity", component: S08 },
  { id: 9, title: "Khushig Valley FEZ", component: S10 },
  { id: 10, title: "FEZ · Location", component: S11 },
  { id: 11, title: "FEZ · Master plan", component: S12 },
  { id: 12, title: "FEZ · Tax incentives", component: S13 },
  { id: 13, title: "FEZ · Engineering infrastructure", component: S14 },
  { id: 14, title: "Let’s build the future together", component: S09 },
];
