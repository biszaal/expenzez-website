import React from "react";
import { Sparkles, FileSpreadsheet, Target, TrendingUp, RefreshCw, BarChart3 } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import Pill from "./Pill";
import Reveal from "./Reveal";

const tileBase: React.CSSProperties = {
  gridColumn: "span 2",
  padding: 28,
  borderRadius: 24,
  background: W.card,
  border: `1px solid ${W.border}`,
};

const iconWrap = (bg: string, color: string): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: 13,
  background: bg,
  color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FeatureBento: React.FC = () => (
  <section id="features" style={{ padding: "120px 32px", position: "relative" }}>
    <div style={{ maxWidth: MAXW, margin: "0 auto" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
        <Pill>EVERYTHING IN ONE APP</Pill>
        <h2 style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginTop: 18, color: W.text }}>
          Smarter than a spreadsheet.
          <br />
          <span style={{ color: W.faint }}>Friendlier than your bank.</span>
        </h2>
      </Reveal>

      <Reveal>
      <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, gridAutoRows: "minmax(220px, auto)" }}>
        {/* Big AI tile */}
        <div
          className="bento-ai lift"
          style={{
            gridColumn: "span 4",
            gridRow: "span 2",
            padding: 36,
            borderRadius: 28,
            background: "linear-gradient(135deg, rgba(78,124,255,0.16), rgba(95,227,161,0.04))",
            border: `1px solid ${W.borderHi}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(78,124,255,0.2), transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ ...iconWrap(`linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`, "#fff"), width: 48, height: 48, borderRadius: 14, boxShadow: `0 12px 28px ${W.primaryGlow}` }}>
              <Sparkles size={24} />
            </div>
            <div style={{ fontSize: 11, color: W.primary, fontWeight: 700, letterSpacing: 1, marginTop: 28 }}>EXPENZEZ AI</div>
            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.8, lineHeight: 1.15, marginTop: 8, maxWidth: 480, color: W.text }}>
              Ask anything about your money. Get answers in seconds.
            </div>
            <p style={{ fontSize: 15, color: W.dim, lineHeight: 1.55, marginTop: 14, maxWidth: 460 }}>
              "How am I doing this month?" "Can I afford a holiday in August?" Your personal money assistant, available 24/7.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10, maxWidth: 360 }}>
              <div style={{ alignSelf: "flex-end", padding: "8px 14px", borderRadius: "14px 14px 4px 14px", background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`, fontSize: 13.5, color: "#fff", fontWeight: 500 }}>
                Can I afford £400 on a flight?
              </div>
              <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "4px 14px 14px 14px", background: W.card, border: `1px solid ${W.border}`, fontSize: 13.5, color: W.text }}>
                Yes — you'll still have <span style={{ color: W.lime, fontWeight: 700, fontFamily: W.mono }}>£612</span> safe spending this month.
              </div>
            </div>
          </div>
        </div>

        {/* Manual entry & CSV import (replaces auto bank-connect) */}
        <div className="lift" style={tileBase}>
          <div style={iconWrap("rgba(91,200,255,0.16)", W.cyan)}>
            <FileSpreadsheet size={22} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.3 }}>PDF, CSV &amp; manual import</div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.55, marginTop: 8 }}>
            Upload a statement PDF, import a CSV, or add cash in a tap. AI categorises every transaction automatically.
          </p>
        </div>

        {/* Budgets */}
        <div className="lift" style={tileBase}>
          <div style={iconWrap("rgba(95,227,161,0.14)", W.lime)}>
            <Target size={22} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.3 }}>Budgets that actually work</div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.55, marginTop: 8 }}>
            Set targets per category. Get nudges before you overspend, not after.
          </p>
        </div>

        {/* Credit health */}
        <div className="lift" style={tileBase}>
          <div style={iconWrap("rgba(255,107,138,0.14)", W.rose)}>
            <TrendingUp size={22} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.3 }}>Credit health, monthly</div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.55, marginTop: 8 }}>
            Track your score, get personalised tips, and watch it grow.
          </p>
          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: W.mono, fontSize: 22, fontWeight: 600, color: W.text, letterSpacing: -0.4 }}>764</span>
            <span style={{ fontSize: 10, color: W.lime, fontWeight: 700 }}>↑ +12</span>
          </div>
        </div>

        {/* Subscriptions — flag recurring charges from your transactions (no bank auto-cancel) */}
        <div className="lift" style={tileBase}>
          <div style={iconWrap("rgba(78,124,255,0.18)", "#9CB4FF")}>
            <RefreshCw size={22} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.3 }}>Spot recurring charges</div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.55, marginTop: 8 }}>
            Expenzez flags subscriptions across your transactions and reminds you before each bill is due.
          </p>
        </div>

        {/* Cost-of-living comparison (replaces receipt scanning) */}
        <div className="lift" style={tileBase}>
          <div style={iconWrap("rgba(245,179,66,0.16)", "#F5C77A")}>
            <BarChart3 size={22} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.3 }}>Cost-of-living comparison</div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.55, marginTop: 8 }}>
            Benchmark your spending against UK averages by category, so you know exactly where you stand.
          </p>
        </div>
      </div>
      </Reveal>
    </div>
  </section>
);

export default FeatureBento;
