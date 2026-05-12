import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wallet } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="nav-logo-mark">
            <Wallet size={20} strokeWidth={2.25} />
          </span>
          Expenzez
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://apps.apple.com/us/app/expenzez/id6751338089"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the app
          </a>
        </div>

        <div className="mobile-menu-btn">
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "12px",
              color: "#1A1430",
              border: "1px solid rgba(40,20,80,0.08)",
              background: "rgba(255,255,255,0.7)",
              cursor: "pointer",
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            background: "rgba(250,248,255,0.98)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(40,20,80,0.05)",
            padding: "1rem 1.25rem 1.25rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "block",
                  padding: "0.85rem 1rem",
                  textDecoration: "none",
                  color: isActive(link.to) ? "#7B3FE4" : "#1A1430",
                  fontWeight: 500,
                  borderRadius: "12px",
                  background: isActive(link.to) ? "rgba(123,63,228,0.08)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                marginTop: "0.85rem",
                textAlign: "center",
                justifyContent: "center",
              }}
              onClick={() => setIsOpen(false)}
            >
              Get the app
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
