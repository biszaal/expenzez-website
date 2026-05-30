import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import Pill from "./Pill";
import Reveal from "./Reveal";

const freeFeatures = [
  "Track unlimited transactions",
  "AI auto-categorisation",
  "Up to 5 budgets",
  "Spending insights & charts",
  "Manual & CSV import",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited AI assistant",
  "Credit health monitor",
  "Cost-of-living benchmarks",
  "Bill reminders",
  "Priority support",
];

const Pricing: React.FC = () => (
  <section id="pricing" style={{ padding: "40px 32px 120px" }}>
    <div style={{ maxWidth: MAXW, margin: "0 auto" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
        <Pill>SIMPLE PRICING</Pill>
        <h2 style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginTop: 18, color: W.text }}>
          Free forever. Pro when you need it.
        </h2>
      </Reveal>
      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 880, margin: "0 auto" }}>
        {/* Free */}
        <Reveal style={{ display: "flex" }}>
        <div className="lift" style={{ padding: 32, borderRadius: 24, background: W.card, border: `1px solid ${W.border}`, width: "100%" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: W.dim }}>Free</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
            <span style={{ fontFamily: W.mono, fontSize: 56, fontWeight: 500, letterSpacing: -2.4, color: W.text }}>£0</span>
            <span style={{ fontSize: 14, color: W.faint }}>/forever</span>
          </div>
          <p style={{ fontSize: 13.5, color: W.dim, marginTop: 6 }}>Everything you need to take control.</p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 11 }}>
            {freeFeatures.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: W.text }}>
                <Check size={16} strokeWidth={2.6} color={W.lime} />
                {f}
              </div>
            ))}
          </div>
          <Link
            to="/download"
            className="btn-press"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 28,
              padding: "14px 0",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              background: W.cardHi,
              color: W.text,
              textDecoration: "none",
              border: `1px solid ${W.borderHi}`,
            }}
          >
            Get started — free
          </Link>
        </div>
        </Reveal>

        {/* Pro */}
        <Reveal delay={120} style={{ display: "flex" }}>
        <div
          className="lift"
          style={{
            padding: 32,
            borderRadius: 24,
            position: "relative",
            background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
            border: `1px solid ${W.primary}`,
            color: "#fff",
            boxShadow: `0 24px 60px ${W.primaryGlow}`,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "radial-gradient(circle, rgba(95,227,161,0.3), transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Pro</div>
              <div style={{ background: W.lime, color: W.bg, padding: "4px 9px", borderRadius: 8, fontSize: 10, fontWeight: 800, letterSpacing: 0.8 }}>SAVE 40%</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
              <span style={{ fontFamily: W.mono, fontSize: 56, fontWeight: 500, letterSpacing: -2.4 }}>£4.99</span>
              <span style={{ fontSize: 14, opacity: 0.7 }}>/month, billed yearly</span>
            </div>
            <p style={{ fontSize: 13.5, opacity: 0.85, marginTop: 6 }}>Unlock AI, credit health, and more.</p>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 11 }}>
              {proFeatures.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                  <Check size={16} strokeWidth={2.6} color="#fff" />
                  {f}
                </div>
              ))}
            </div>
            <Link
              to="/download"
              className="btn-press"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 28,
                padding: "14px 0",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                background: W.lime,
                color: W.bg,
                textDecoration: "none",
              }}
            >
              Start 7-day free trial
            </Link>
            <div style={{ textAlign: "center", fontSize: 11, opacity: 0.75, marginTop: 10 }}>Cancel anytime</div>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Pricing;
