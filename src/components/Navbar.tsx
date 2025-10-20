import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Smartphone } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <Smartphone size={28} style={{ color: "#6366f1" }} />
          Expenzez
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link
            to="/"
            style={{
              color: isActive("/") ? "#6366f1" : "#374151",
            }}
          >
            Home
          </Link>
          <Link
            to="/support"
            style={{
              color: isActive("/support") ? "#6366f1" : "#374151",
            }}
          >
            Support
          </Link>
          <Link
            to="/privacy"
            style={{
              color: isActive("/privacy") ? "#6366f1" : "#374151",
            }}
          >
            Privacy
          </Link>
          <a
            href="https://apps.apple.com/us/app/expenzez/id6751338089"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Download App
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn">
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              color: "#6b7280",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="mobile-menu"
          style={{
            background: "white",
            borderTop: "1px solid #e5e7eb",
            padding: "1rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link
              to="/"
              style={{
                display: "block",
                padding: "0.75rem",
                textDecoration: "none",
                color: isActive("/") ? "#6366f1" : "#374151",
                fontWeight: "500",
                borderRadius: "0.375rem",
                transition: "all 0.2s",
              }}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/support"
              style={{
                display: "block",
                padding: "0.75rem",
                textDecoration: "none",
                color: isActive("/support") ? "#6366f1" : "#374151",
                fontWeight: "500",
                borderRadius: "0.375rem",
                transition: "all 0.2s",
              }}
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <Link
              to="/privacy"
              style={{
                display: "block",
                padding: "0.75rem",
                textDecoration: "none",
                color: isActive("/privacy") ? "#6366f1" : "#374151",
                fontWeight: "500",
                borderRadius: "0.375rem",
                transition: "all 0.2s",
              }}
              onClick={() => setIsOpen(false)}
            >
              Privacy
            </Link>
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
