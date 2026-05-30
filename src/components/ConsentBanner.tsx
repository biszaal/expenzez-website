import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, grantConsent, denyConsent } from "../lib/analytics";

const ConsentBanner: React.FC = () => {
  // Start "undecided" so the first client render matches the prerendered HTML
  // (which always shows the banner). Then hide it for visitors who already chose
  // — avoids a hydration mismatch for returning users.
  const [decided, setDecided] = useState(false);
  useEffect(() => {
    if (getConsent() !== null) setDecided(true);
  }, []);
  if (decided) return null;

  const accept = () => {
    grantConsent();
    setDecided(true);
  };
  const decline = () => {
    denyConsent();
    setDecided(true);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        maxWidth: 520,
        margin: "0 auto",
        background: "rgba(22,17,34,0.98)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 16,
        boxShadow: "0 18px 48px -12px rgba(0,0,0,0.6)",
        backdropFilter: "blur(16px)",
        padding: "1rem 1.25rem",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#F4F1FA" }}>
        We use privacy-respecting analytics to improve Expenzez. See our{" "}
        <Link to="/privacy" style={{ color: "#9CB4FF" }}>
          Privacy Policy
        </Link>
        .
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          marginTop: "0.85rem",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={decline}
          className="btn btn-secondary"
          style={{ padding: "0.5rem 1rem" }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="btn btn-primary"
          style={{ padding: "0.5rem 1rem" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
