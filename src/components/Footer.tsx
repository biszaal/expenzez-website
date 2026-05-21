import React from "react";
import { Link } from "react-router-dom";
import { W, MAXW } from "../theme/tokens";
import { SOCIAL, storeUrl } from "../config/links";
import { trackDownload } from "../lib/analytics";

const year = new Date().getFullYear();

type Item = { label: string; to?: string; href?: string };
const columns: { h: string; items: Item[] }[] = [
  {
    h: "Product",
    items: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "iOS app", href: storeUrl("ios") },
      { label: "Android app", href: storeUrl("android") },
    ],
  },
  {
    h: "Support",
    items: [
      { label: "Help & FAQ", to: "/support" },
      { label: "Contact", href: "mailto:support@expenzez.com" },
      { label: "Account deletion", to: "/account-deletion" },
    ],
  },
  {
    h: "Legal",
    items: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "GDPR", href: "mailto:privacy@expenzez.com" },
    ],
  },
  {
    h: "Follow",
    items: [
      { label: "Reddit", href: SOCIAL.reddit },
      { label: "Instagram", href: SOCIAL.instagram },
    ],
  },
];

const linkStyle: React.CSSProperties = { fontSize: 13.5, color: W.dim, textDecoration: "none" };

const ColLink: React.FC<{ item: Item }> = ({ item }) =>
  item.to ? (
    <Link to={item.to} style={linkStyle}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} target={item.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={linkStyle}>
      {item.label}
    </a>
  );

const Footer: React.FC = () => (
  <footer style={{ borderTop: `1px solid ${W.border}`, padding: "64px 32px 32px", background: W.bg }}>
    <div style={{ maxWidth: MAXW, margin: "0 auto" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${W.primary}, ${W.primaryDim})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 32 32">
                <path d="M5 24 L13 14 L18 18 L27 8" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 8 L27 8 L27 13" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: W.text }}>
              expenzez<span style={{ color: W.lime }}>.</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.6, margin: 0, maxWidth: 280 }}>
            The smarter way to track spending, budget effortlessly, and stay on top of your credit health. Built for the UK.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            <a
              href={storeUrl("ios")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDownload("ios", "footer")}
              style={{ padding: "8px 14px", borderRadius: 11, background: W.card, border: `1px solid ${W.border}`, fontSize: 12, fontWeight: 600, color: W.text, textDecoration: "none" }}
            >
              App Store
            </a>
            <a
              href={storeUrl("android")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDownload("android", "footer")}
              style={{ padding: "8px 14px", borderRadius: 11, background: W.card, border: `1px solid ${W.border}`, fontSize: 12, fontWeight: 600, color: W.text, textDecoration: "none" }}
            >
              Google Play
            </a>
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: W.faint, marginBottom: 16 }}>{c.h.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((item) => (
                <ColLink key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${W.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12, color: W.faint }}>
        <span>© {year} Biszaal Tech Ltd · London, United Kingdom.</span>
        <span>Made in London</span>
      </div>
    </div>
  </footer>
);

export default Footer;
