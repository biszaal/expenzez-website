import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Mail, MapPin, Download } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Smartphone
                size={32}
                style={{ color: "#8b5cf6", marginRight: "0.5rem" }}
              />
              <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                Expenzez
              </span>
            </div>
            <p
              style={{
                color: "#d1d5db",
                marginBottom: "1.5rem",
                maxWidth: "400px",
                lineHeight: "1.6",
              }}
            >
              Transform your financial life with intelligent expense tracking,
              banking integration, and AI-powered insights designed for UK
              users.
            </p>
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Download size={16} />
              Download for iOS
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail size={16} style={{ color: "#9ca3af" }} />
                <a href="mailto:support@expenzez.com">support@expenzez.com</a>
              </li>
              <li
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MapPin size={16} style={{ color: "#9ca3af" }} />
                <span style={{ color: "#d1d5db" }}>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p>© {new Date().getFullYear()} Expenzez. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                to="/privacy"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
