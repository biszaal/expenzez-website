import React from "react";
import { Link } from "react-router-dom";
import { Wallet, Mail, MapPin } from "lucide-react";
import StoreButtons from "./StoreButtons";
import { SOCIAL } from "../config/links";

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
            <div className="button-group" style={{ justifyContent: "flex-start", marginBottom: 0 }}>
              <StoreButtons location="footer" variant="light" />
            </div>
          </div>

          <div>
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li>
                <a
                  href="https://apps.apple.com/gb/app/expenzez/id6751338089"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iOS app
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.biszaaltech.expenzez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android app
                </a>
              </li>
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

          <div>
            <h4>Follow</h4>
            <ul className="footer-links">
              <li>
                <a href={SOCIAL.reddit} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.01 14.04c.024.16.036.32.036.485 0 2.475-2.883 4.48-6.44 4.48s-6.44-2.005-6.44-4.48c0-.17.012-.337.038-.5a1.34 1.34 0 0 1-.74-1.198 1.34 1.34 0 0 1 2.27-.967 6.57 6.57 0 0 1 3.583-1.134l.68-3.2a.286.286 0 0 1 .34-.22l2.255.48a.953.953 0 1 1-.114.45l-2.016-.43-.61 2.872a6.56 6.56 0 0 1 3.54 1.137 1.34 1.34 0 0 1 2.265.969c0 .503-.276.94-.687 1.176zM8.4 13.05a.953.953 0 1 0 1.906 0 .953.953 0 0 0-1.906 0zm5.91 2.737c-.52.52-1.59.704-2.31.704-.72 0-1.79-.184-2.31-.704a.252.252 0 0 0-.357.357c.82.82 2.39.884 2.667.884.277 0 1.847-.064 2.667-.884a.252.252 0 1 0-.357-.357zm-.62-1.784a.953.953 0 1 0 .001-1.906.953.953 0 0 0-.001 1.906z"/>
                  </svg>
                  Reddit
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.012 4.85.07 1.17.054 1.8.249 2.23.413.56.218.96.478 1.38.898.42.42.68.82.9 1.38.163.43.358 1.06.412 2.23.058 1.27.07 1.65.07 4.85s-.012 3.58-.07 4.85c-.054 1.17-.249 1.8-.413 2.23-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.9-.43.163-1.06.358-2.23.412-1.27.058-1.65.07-4.85.07s-3.58-.012-4.85-.07c-1.17-.054-1.8-.249-2.23-.413-.56-.218-.96-.478-1.38-.898-.42-.42-.68-.82-.9-1.38-.163-.43-.358-1.06-.412-2.23-.058-1.27-.07-1.65-.07-4.85s.012-3.58.07-4.85c.054-1.17.249-1.8.413-2.23.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.9.43-.163 1.06-.358 2.23-.412C8.42 2.172 8.8 2.16 12 2.16zm0 1.44c-3.15 0-3.52.012-4.76.069-.99.045-1.53.21-1.89.35-.47.182-.81.4-1.16.75-.35.35-.568.69-.75 1.16-.14.36-.305.9-.35 1.89-.057 1.24-.069 1.61-.069 4.76s.012 3.52.069 4.76c.045.99.21 1.53.35 1.89.182.47.4.81.75 1.16.35.35.69.568 1.16.75.36.14.9.305 1.89.35 1.24.057 1.61.069 4.76.069s3.52-.012 4.76-.069c.99-.045 1.53-.21 1.89-.35.47-.182.81-.4 1.16-.75.35-.35.568-.69.75-1.16.14-.36.305-.9.35-1.89.057-1.24.069-1.61.069-4.76s-.012-3.52-.069-4.76c-.045-.99-.21-1.53-.35-1.89-.182-.47-.4-.81-.75-1.16-.35-.35-.69-.568-1.16-.75-.36-.14-.9-.305-1.89-.35-1.24-.057-1.61-.069-4.76-.069zm0 2.45a5.79 5.79 0 1 0 0 11.58 5.79 5.79 0 0 0 0-11.58zm0 9.55a3.76 3.76 0 1 1 0-7.52 3.76 3.76 0 0 1 0 7.52zm7.37-9.77a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0z"/>
                  </svg>
                  Instagram
                </a>
              </li>
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
