import React from "react";
import { Link } from "react-router-dom";
import { Wallet, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #7B3FE4 0%, #481B91 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 12px 32px -8px rgba(123,63,228,0.45)",
                }}
              >
                <Wallet size={20} strokeWidth={2.25} />
              </span>
              <span style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>
                Expenzez
              </span>
            </div>
            <p>
              The smarter way to track expenses, manage budgets, and stay on top of your
              credit health. Built for the UK, designed for everyone.
            </p>
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#fff", color: "#481B91" }}
            >
              Download for iOS
            </a>
          </div>

          <div>
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li>
                <a
                  href="https://apps.apple.com/us/app/expenzez/id6751338089"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iOS app
                </a>
              </li>
              <li><span style={{ opacity: 0.55 }}>Android · coming soon</span></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <span style={{ color: "rgba(232,218,251,0.78)" }}>
                  Biszaal Tech Ltd.
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <MapPin size={14} style={{ color: "rgba(232,218,251,0.5)" }} />
                <span>London, United Kingdom</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <Mail size={14} style={{ color: "rgba(232,218,251,0.5)" }} />
                <a href="mailto:support@expenzez.com">support@expenzez.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/account-deletion">Account deletion</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row">
            <p>© {year} Biszaal Tech Ltd. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <a href="mailto:privacy@expenzez.com">GDPR</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
