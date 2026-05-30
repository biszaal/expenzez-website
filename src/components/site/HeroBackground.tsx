import React from "react";

/**
 * Hero-only ambient background — three stacked, pure-CSS loops behind the hero
 * content (see `.hero-bg`, `.ticker-layer`, `.hero-noise` in index.css):
 *   1. Drifting mesh-gradient blobs (purple / indigo / lime / cyan).
 *   2. Two rows of frosted "transaction" chips scrolling opposite directions.
 *   3. A faint SVG grain layer to kill gradient banding.
 * No JS animation, no video file. Respects prefers-reduced-motion via CSS.
 */

type Chip = { dot: string; label: string; amount: string };

const ROW_ONE: Chip[] = [
  { dot: "#FF95B0", label: "Tesco Stores", amount: "£32.40" },
  { dot: "#5FE3A1", label: "Salary · Lloyds", amount: "£2,950.00" },
  { dot: "#7AD4FF", label: "Uber", amount: "£14.50" },
  { dot: "#9CB4FF", label: "Spotify Premium", amount: "£9.99" },
  { dot: "#FFB48A", label: "Octopus Energy", amount: "£87.20" },
  { dot: "#5FE3A1", label: "Refund · ASOS", amount: "£24.99" },
  { dot: "#FFB48A", label: "Pret", amount: "£6.75" },
  { dot: "#5FE3A1", label: "Transfer · Sarah", amount: "£45.00" },
];

const ROW_TWO: Chip[] = [
  { dot: "#FFD97A", label: "Sainsbury's", amount: "£42.10" },
  { dot: "#9CB4FF", label: "Netflix", amount: "£14.99" },
  { dot: "#7AD4FF", label: "Train · TfL", amount: "£2.80" },
  { dot: "#FF95B0", label: "ATM", amount: "£50.00" },
  { dot: "#9FAFFF", label: "Pension", amount: "£200.00" },
  { dot: "#7BE5B0", label: "Gym", amount: "£39.00" },
  { dot: "#FFB48A", label: "Amazon UK", amount: "£18.45" },
  { dot: "#5FE3A1", label: "Salary · part-time", amount: "£340.00" },
];

// The set is rendered twice so a -50% translate loops seamlessly.
const TickerRow: React.FC<{ chips: Chip[]; reverse?: boolean; top: string; duration: string }> = ({
  chips,
  reverse,
  top,
  duration,
}) => (
  <div
    className={reverse ? "ticker-row ticker-reverse" : "ticker-row"}
    style={{ top, animationDuration: duration }}
    aria-hidden="true"
  >
    {[...chips, ...chips].map((c, i) => (
      <span className="chip" key={i}>
        <i style={{ background: c.dot }} />
        {c.label} <b>{c.amount}</b>
      </span>
    ))}
  </div>
);

const HeroBackground: React.FC = () => (
  <>
    {/* Layer 1: drifting mesh blobs */}
    <div className="hero-bg" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
    </div>

    {/* Layer 2: transaction ticker rows */}
    <div className="ticker-layer" aria-hidden="true">
      <TickerRow chips={ROW_ONE} top="12%" duration="38s" />
      <TickerRow chips={ROW_TWO} top="78%" duration="46s" reverse />
    </div>

    {/* Layer 3: film grain */}
    <div className="hero-noise" aria-hidden="true" />
  </>
);

export default HeroBackground;
