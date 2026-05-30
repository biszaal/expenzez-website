import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { W, MAXW } from "../theme/tokens";

const LinksRow: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => (
  <>
    {[
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ].map((l) => (
      <a key={l.label} href={l.href} onClick={onNavigate} className="nav-link" style={{ fontSize: 14, color: W.dim, textDecoration: "none", fontWeight: 500 }}>
        {l.label}
      </a>
    ))}
    <Link to="/support" onClick={onNavigate} className="nav-link" style={{ fontSize: 14, color: W.dim, textDecoration: "none", fontWeight: 500 }}>
      Support
    </Link>
  </>
);

// The Expenzez "Spark" mark — cobalt squircle, chunky Baloo 2 "e", ivory sparkle.
const Logo: React.FC = () => (
  <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
    <div
      style={{
        position: "relative",
        width: 34,
        height: 34,
        borderRadius: 9,
        background: `linear-gradient(135deg, ${W.cyan}, ${W.primary} 55%, ${W.primaryDim})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 6px 18px ${W.primaryGlow}`,
      }}
    >
      <span
        style={{
          fontFamily: "'Baloo 2', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 23,
          lineHeight: 1,
          color: "#EEF1FA",
          marginTop: -1,
        }}
      >
        e
      </span>
      <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden style={{ position: "absolute", top: 4, right: 4 }}>
        <path d="M12 1 Q13.4 8.6 23 11 Q13.4 13.4 12 23 Q10.6 13.4 1 11 Q10.6 8.6 12 1 Z" fill="#EEF1FA" />
      </svg>
    </div>
    <span style={{ fontFamily: "'Baloo 2', system-ui, sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: -0.3, color: W.text }}>
      expenzez
    </span>
  </Link>
);

const ctaStyle: React.CSSProperties = {
  padding: "9px 16px",
  borderRadius: 11,
  fontSize: 13.5,
  fontWeight: 600,
  background: W.text,
  color: W.bg,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(10,18,38,0.7)",
        borderBottom: `1px solid ${W.border}`,
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />

        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <LinksRow />
          <Link to="/download" className="btn-press" style={ctaStyle}>
            Get the app
          </Link>
        </div>

        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            borderRadius: 10,
            color: W.text,
            border: `1px solid ${W.borderHi}`,
            background: W.card,
            cursor: "pointer",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" style={{ borderTop: `1px solid ${W.border}`, background: "rgba(10,18,38,0.96)", padding: "12px 24px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}>
            <LinksRow onNavigate={close} />
            <Link to="/download" onClick={close} className="btn-press" style={{ ...ctaStyle, textAlign: "center", marginTop: 6 }}>
              Get the app
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
