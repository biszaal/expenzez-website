import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Smartphone, CheckCircle2, Sparkles } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import Pill from "./Pill";
import HeroPhone from "./HeroPhone";

const Hero: React.FC = () => (
  <section style={{ position: "relative", overflow: "hidden" }}>
    {/* Ambient glow */}
    <div
      style={{
        position: "absolute",
        top: -200,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1000,
        height: 600,
        background: "radial-gradient(ellipse, rgba(157,91,255,0.25), transparent 60%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 100,
        right: -200,
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(197,242,92,0.10), transparent 65%)",
        pointerEvents: "none",
      }}
    />

    <div className="hero-grid" style={{ maxWidth: MAXW, margin: "0 auto", padding: "88px 32px 80px", position: "relative" }}>
      <div>
        <Pill accent>● NOW ON iOS &amp; ANDROID</Pill>
        <h1 style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 0.98, margin: "24px 0 0", color: W.text }}>
          Money that
          <br />
          <span
            style={{
              fontFamily: "Fraunces, serif",
              background: `linear-gradient(135deg, ${W.primary}, ${W.lime})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}
          >
            actually
          </span>
          <br />
          makes sense.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: W.dim, maxWidth: 480, marginTop: 28 }}>
          Track spending, budget effortlessly, and get instant AI insights — all in one beautiful app. Built for the UK, designed for everyone.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
          <Link
            to="/download"
            style={{
              padding: "15px 26px",
              borderRadius: 14,
              textDecoration: "none",
              background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: `0 16px 36px ${W.primaryGlow}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Download — it's free
            <ArrowRight size={15} />
          </Link>
          <a
            href="#features"
            style={{
              padding: "15px 24px",
              borderRadius: 14,
              textDecoration: "none",
              background: W.card,
              border: `1px solid ${W.borderHi}`,
              color: W.text,
              fontWeight: 600,
              fontSize: 15,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Explore features
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Honest trust strip — no fabricated metrics or ratings */}
        <div style={{ marginTop: 36, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap", color: W.dim, fontSize: 13 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Lock size={14} /> Bank-grade encryption
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Smartphone size={14} /> Face ID &amp; PIN
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <CheckCircle2 size={14} /> Free — no card needed
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <HeroPhone />
        {/* Floating AI insight card — no bank/sync claim */}
        <div
          style={{
            position: "absolute",
            top: -28,
            right: -32,
            width: 230,
            padding: 14,
            borderRadius: 16,
            background: "rgba(22,17,34,0.96)",
            border: `1px solid ${W.borderHi}`,
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            transform: "rotate(4deg)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                background: "rgba(197,242,92,0.16)",
                color: W.lime,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={14} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: W.text }}>AI insight</div>
              <div style={{ fontSize: 10.5, color: W.dim }}>You're £612 under budget</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
