import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, grantConsent, denyConsent } from "../lib/analytics";

const ConsentBanner: React.FC = () => {
  const [decided, setDecided] = useState(() => getConsent() !== null);
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
        background: "#fff",
        border: "1px solid rgba(40,20,80,0.10)",
        borderRadius: 16,
        boxShadow: "0 18px 48px -12px rgba(40,20,80,0.28)",
        padding: "1rem 1.25rem",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#1A1430" }}>
        We use privacy-respecting analytics to improve Expenzez. See our{" "}
        <Link to="/privacy" style={{ color: "#7B3FE4" }}>
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
