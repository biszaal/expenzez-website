import React from "react";
import { Link } from "react-router-dom";
import { W } from "../../theme/tokens";
import Pill from "./Pill";
import { faqs } from "../../data/faqs";

const HomeFaq: React.FC = () => (
  <section id="faq" style={{ padding: "40px 32px 120px" }}>
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Pill>FAQ</Pill>
        <h2 style={{ fontSize: 48, fontWeight: 600, letterSpacing: -1.6, marginTop: 16, color: W.text }}>Questions, answered.</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.slice(0, 5).map((f) => (
          <div key={f.question} style={{ padding: "22px 26px", borderRadius: 18, background: W.card, border: `1px solid ${W.border}` }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: W.text, letterSpacing: -0.2 }}>{f.question}</div>
            <div style={{ fontSize: 14, color: W.dim, lineHeight: 1.6, marginTop: 8 }}>{f.answer}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <Link to="/support" style={{ color: W.primary, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          See all FAQs &amp; contact support →
        </Link>
      </div>
    </div>
  </section>
);

export default HomeFaq;
