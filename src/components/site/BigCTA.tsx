import React from "react";
import { Apple, Play } from "lucide-react";
import { W } from "../../theme/tokens";
import { storeUrl } from "../../config/links";
import { trackDownload } from "../../lib/analytics";

const BigCTA: React.FC = () => (
  <section style={{ padding: "40px 32px 120px" }}>
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "80px 48px",
        borderRadius: 36,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
        boxShadow: `0 40px 100px ${W.primaryGlow}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 500,
          background: "radial-gradient(ellipse, rgba(197,242,92,0.4), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <h2 style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2.4, lineHeight: 1, color: "#fff", margin: 0 }}>
          Take control today.
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginTop: 18, maxWidth: 540, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>
          Free to download. No credit card. An AI money assistant in your pocket in under a minute.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <a
            href={storeUrl("ios")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload("ios", "big_cta")}
            style={{ padding: "15px 26px", borderRadius: 14, textDecoration: "none", background: W.lime, color: W.bg, fontWeight: 700, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Apple size={16} />
            Download for iPhone
          </a>
          <a
            href={storeUrl("android")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload("android", "big_cta")}
            style={{ padding: "15px 26px", borderRadius: 14, textDecoration: "none", background: "rgba(255,255,255,0.12)", color: "#fff", fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Play size={16} />
            Get it on Android
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default BigCTA;
