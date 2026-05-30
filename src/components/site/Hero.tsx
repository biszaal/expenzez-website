import React from "react";
import { ArrowRight, Lock, Smartphone, CheckCircle2, Sparkles, Apple, Play, Unlink } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import { storeUrl } from "../../config/links";
import { trackDownload } from "../../lib/analytics";
import Pill from "./Pill";
import HeroPhone from "./HeroPhone";
import HeroBackground from "./HeroBackground";

const Hero: React.FC = () => (
  <section style={{ position: "relative", overflow: "hidden" }}>
    <HeroBackground />

    <div className="hero-grid" style={{ maxWidth: MAXW, margin: "0 auto", padding: "88px 32px 80px", position: "relative", zIndex: 2 }}>
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
          No bank login required. Upload your bank statement and get instant AI-powered insights in seconds. Private by design.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={storeUrl("ios")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload("ios", "hero")}
            className="btn-press btn-glow"
            style={{
              padding: "15px 24px",
              borderRadius: 14,
              textDecoration: "none",
              background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: `0 16px 36px ${W.primaryGlow}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <Apple size={17} />
            Download on iOS
          </a>
          <a
            href={storeUrl("android")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload("android", "hero")}
            className="btn-press"
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
              gap: 9,
            }}
          >
            <Play size={16} />
            Get it on Android
          </a>
          <a
            href="#features"
            style={{
              textDecoration: "none",
              color: W.dim,
              fontWeight: 600,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Explore features
            <ArrowRight size={14} />
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Unlink size={14} /> No bank login ever required
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <div className="floaty">
          <HeroPhone />
        </div>
        {/* Floating AI insight card — no bank/sync claim */}
        <div
          className="floaty-card"
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
                background: "rgba(95,227,161,0.16)",
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
