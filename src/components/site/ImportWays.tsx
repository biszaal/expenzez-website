import React from "react";
import { FileText, FileSpreadsheet, PencilLine } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import Pill from "./Pill";
import Reveal from "./Reveal";

interface Way {
  icon: React.ReactNode;
  accent: string;
  bg: string;
  title: string;
  body: string;
  shot: string;
}

const ways: Way[] = [
  {
    icon: <FileText size={22} />,
    accent: W.primary,
    bg: "rgba(157,91,255,0.16)",
    title: "Upload a bank statement PDF",
    body: "Drop in the PDF your bank already gives you. Expenzez reads every transaction and categorises it with AI — no bank login, no Open Banking connection.",
    shot: "/screenshot-1.png",
  },
  {
    icon: <FileSpreadsheet size={22} />,
    accent: W.cyan,
    bg: "rgba(91,200,255,0.16)",
    title: "Import CSV from any UK bank",
    body: "Export a CSV from your online banking and import it in one tap. Works with Monzo, Barclays, HSBC, Lloyds, Starling and the rest.",
    shot: "/screenshot-2.png",
  },
  {
    icon: <PencilLine size={22} />,
    accent: W.lime,
    bg: "rgba(197,242,92,0.16)",
    title: "Add cash & side income manually",
    body: "Log cash spending, tips, or freelance income in seconds. Everything lands in the same dashboard alongside your imported transactions.",
    shot: "/screenshot-3.png",
  },
];

const ImportWays: React.FC = () => (
  <section id="how-it-works" style={{ padding: "120px 32px 40px", position: "relative" }}>
    <div style={{ maxWidth: MAXW, margin: "0 auto" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
        <Pill accent>NO BANK CONNECTION REQUIRED</Pill>
        <h2 style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginTop: 18, color: W.text }}>
          Get your money in,
          <br />
          <span style={{ color: W.faint }}>three private ways.</span>
        </h2>
        <p style={{ fontSize: 17, color: W.dim, lineHeight: 1.55, maxWidth: 560, margin: "18px auto 0" }}>
          You stay in control of your data. Bring your transactions in however suits you — Expenzez never asks to log into your bank.
        </p>
      </Reveal>

      <div className="import-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {ways.map((w, i) => (
          <Reveal key={w.title} delay={i * 90} style={{ display: "flex" }}>
          <div
            className="lift"
            style={{
              padding: 28,
              borderRadius: 24,
              background: W.card,
              border: `1px solid ${W.border}`,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  background: w.bg,
                  color: w.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {w.icon}
              </div>
              <span style={{ fontFamily: W.mono, fontSize: 13, color: W.faint, fontWeight: 600 }}>
                0{i + 1}
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginTop: 18, color: W.text, letterSpacing: -0.4 }}>
              {w.title}
            </div>
            <p style={{ fontSize: 14, color: W.dim, lineHeight: 1.6, marginTop: 10, flexGrow: 1 }}>
              {w.body}
            </p>
            <div
              className="shot-zoom"
              style={{
                marginTop: 24,
                height: 300,
                borderRadius: 18,
                overflow: "hidden",
                border: `1px solid ${W.borderHi}`,
                background: W.bg2,
              }}
            >
              <img
                src={w.shot}
                alt={w.title}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
              />
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ImportWays;
