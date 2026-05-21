import React from "react";
import { W, MAXW } from "../../theme/tokens";

// Honest, non-fabricated proof points (no invented user counts / ratings / savings).
const stats = [
  { v: "🇬🇧 UK", l: "GBP-first, UK benchmarks built in" },
  { v: "<60s", l: "to your first insight" },
  { v: "5", l: "focused tabs — no clutter" },
  { v: "£0", l: "to download · Premium optional" },
];

const StatsStrip: React.FC = () => (
  <section style={{ padding: "64px 32px", background: W.bg2, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}` }}>
    <div className="stats-grid" style={{ maxWidth: MAXW, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
      {stats.map((s) => (
        <div key={s.l} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: W.mono, fontSize: 44, fontWeight: 600, letterSpacing: -2, color: W.text, lineHeight: 1 }}>{s.v}</div>
          <div style={{ fontSize: 13, color: W.dim, marginTop: 10, fontWeight: 500 }}>{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsStrip;
