import React from "react";
import { Link } from "react-router-dom";
import { W, MAXW } from "../theme/tokens";
import Seo from "../components/Seo";

const NotFound: React.FC = () => (
  <section style={{ position: "relative", overflow: "hidden", minHeight: "70vh", display: "flex", alignItems: "center" }}>
    <Seo
      title="Page not found — Expenzez"
      description="The page you were looking for doesn't exist."
      path="/404"
      noindex
    />

    {/* Soft ambient glow, in keeping with the hero */}
    <div
      style={{
        position: "absolute",
        top: -160,
        left: "50%",
        transform: "translateX(-50%)",
        width: 800,
        height: 500,
        background: "radial-gradient(ellipse, rgba(157,91,255,0.18), transparent 62%)",
        pointerEvents: "none",
      }}
    />

    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "100px 32px", textAlign: "center", width: "100%", position: "relative" }}>
      <div style={{ fontFamily: W.mono, fontSize: 16, color: W.primary, fontWeight: 700, letterSpacing: 3 }}>404</div>
      <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginTop: 18, color: W.text }}>
        This page is an
        <br />
        <span
          style={{
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${W.primary}, ${W.lime})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          unplanned
        </span>{" "}
        expense.
      </h1>
      <p style={{ fontSize: 17, color: W.dim, lineHeight: 1.6, maxWidth: 440, margin: "20px auto 0" }}>
        We couldn't find what you were looking for. Let's get you back on budget.
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
        <Link
          to="/"
          className="btn-press btn-glow"
          style={{
            padding: "14px 24px",
            borderRadius: 14,
            textDecoration: "none",
            background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`,
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            boxShadow: `0 16px 36px ${W.primaryGlow}`,
          }}
        >
          Back to home
        </Link>
        <Link
          to="/support"
          className="btn-press"
          style={{
            padding: "14px 24px",
            borderRadius: 14,
            textDecoration: "none",
            background: W.card,
            border: `1px solid ${W.borderHi}`,
            color: W.text,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Contact support
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
