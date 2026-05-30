import React from "react";
import { Sparkles } from "lucide-react";
import { W } from "../../theme/tokens";

// Mini phone mockup of the app's Home screen. Sample data is illustrative
// (a UI preview), not a claim — standard for an app store hero.
const HeroPhone: React.FC = () => (
  <div
    style={{
      width: 290,
      height: 600,
      borderRadius: 42,
      overflow: "hidden",
      position: "relative",
      background: W.bg,
      boxShadow:
        "0 80px 120px rgba(0,0,0,0.5), 0 0 0 8px #1a1525, 0 0 0 9px rgba(255,255,255,0.05)",
      fontFamily: '"Geist", system-ui',
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 90,
        height: 26,
        borderRadius: 16,
        background: "#000",
        zIndex: 10,
      }}
    />
    <div style={{ padding: "52px 18px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: W.dim, whiteSpace: "nowrap" }}>Tuesday, 8 May</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2, color: W.text }}>
            Hi, Aisha<span style={{ color: W.primary }}>.</span>
          </div>
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            background: "linear-gradient(135deg, #7DA0FF, #4E7CFF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          A
        </div>
      </div>

      {/* Hero number */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 9, color: W.faint, letterSpacing: 1.2, fontWeight: 600 }}>
          NET CASHFLOW
        </div>
        <div style={{ display: "flex", alignItems: "baseline", marginTop: 4 }}>
          <span style={{ fontFamily: W.mono, fontSize: 38, fontWeight: 500, letterSpacing: -1.8, color: W.text, lineHeight: 1 }}>
            £2,481
          </span>
          <span style={{ fontFamily: W.mono, fontSize: 16, color: W.faint, letterSpacing: -0.6 }}>.50</span>
        </div>
        <div
          style={{
            marginTop: 6,
            display: "inline-block",
            background: "rgba(95,227,161,0.14)",
            color: W.lime,
            padding: "3px 8px",
            borderRadius: 7,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          ↑ +12.4%
        </div>
      </div>

      {/* Twin cards */}
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {[
          { l: "INCOME", v: "£4,250", c: W.lime },
          { l: "SPENT", v: "£1,768", c: W.rose },
        ].map((it) => (
          <div key={it.l} style={{ padding: 10, background: W.card, border: `1px solid ${W.border}`, borderRadius: 13 }}>
            <div style={{ fontSize: 8, color: it.c, fontWeight: 700, letterSpacing: 0.5 }}>{it.l}</div>
            <div style={{ fontFamily: W.mono, fontSize: 14, fontWeight: 500, marginTop: 5, color: W.text }}>{it.v}</div>
          </div>
        ))}
      </div>

      {/* Ring card */}
      <div
        style={{
          marginTop: 10,
          padding: 12,
          background: W.card,
          border: `1px solid ${W.border}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="28" cy="28" r="22" fill="none" stroke="url(#hg)" strokeWidth="5" strokeLinecap="round" strokeDasharray="138.23" strokeDashoffset="44" />
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={W.primary} />
                <stop offset="1" stopColor={W.lime} />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: W.mono, fontSize: 13, fontWeight: 600, color: W.text }}>
            68%
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: W.text, fontWeight: 600 }}>Monthly budget</div>
          <div style={{ fontSize: 9, color: W.dim, marginTop: 2 }}>£1,768 of £2,600</div>
          <div style={{ display: "inline-block", marginTop: 4, fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 5, background: "rgba(95,227,161,0.14)", color: W.lime }}>
            ON TRACK
          </div>
        </div>
      </div>

      {/* AI strip */}
      <div
        style={{
          marginTop: 10,
          padding: 11,
          borderRadius: 13,
          background: "linear-gradient(135deg, rgba(78,124,255,0.18), rgba(95,227,161,0.06))",
          border: "1px solid rgba(78,124,255,0.25)",
          display: "flex",
          gap: 9,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            flexShrink: 0,
            background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <Sparkles size={12} />
        </div>
        <div style={{ fontSize: 10.5, lineHeight: 1.4, color: W.text }}>
          Eating out down <span style={{ color: W.lime, fontWeight: 700 }}>43%</span> this month. Nice work.
        </div>
      </div>
    </div>
  </div>
);

export default HeroPhone;
