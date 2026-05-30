import React from "react";
import { FileText, FileSpreadsheet, PencilLine } from "lucide-react";
import { W, MAXW } from "../../theme/tokens";
import Pill from "./Pill";
import Reveal from "./Reveal";
import PhoneFrame from "./PhoneFrame";

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
    icon: <FileText size={24} />,
    accent: W.primary,
    bg: "rgba(78,124,255,0.16)",
    title: "Upload a bank statement PDF",
    body: "Drop in the PDF your bank already gives you. Expenzez reads every transaction and categorises it with AI — no bank login, no Open Banking connection.",
    shot: "/screenshot-1.png",
  },
  {
    icon: <FileSpreadsheet size={24} />,
    accent: W.cyan,
    bg: "rgba(91,200,255,0.16)",
    title: "Import CSV from any UK bank",
    body: "Export a CSV from your online banking and import it in one tap. Works with Monzo, Barclays, HSBC, Lloyds, Starling and the rest.",
    shot: "/screenshot-2.png",
  },
  {
    icon: <PencilLine size={24} />,
    accent: W.lime,
    bg: "rgba(95,227,161,0.16)",
    title: "Add cash & side income manually",
    body: "Log cash spending, tips, or freelance income in seconds. Everything lands in the same dashboard alongside your imported transactions.",
    shot: "/screenshot-3.png",
  },
];

const ImportWays: React.FC = () => (
  <section id="how-it-works" style={{ padding: "120px 32px 40px", position: "relative" }}>
    <div style={{ maxWidth: MAXW, margin: "0 auto" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 80 }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
        {ways.map((w, i) => (
          <Reveal key={w.title}>
            <div className={`how-row${i % 2 === 1 ? " how-row-rev" : ""}`}>
              <div className="how-stage">
                <PhoneFrame src={w.shot} alt={`Expenzez — ${w.title}`} accent={w.accent} />
              </div>

              <div className="how-copy">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 15,
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
                  <span style={{ fontFamily: W.mono, fontSize: 14, color: W.faint, fontWeight: 600, letterSpacing: 0.5 }}>
                    0{i + 1} / 03
                  </span>
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.8, lineHeight: 1.12, marginTop: 22, color: W.text }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 16, color: W.dim, lineHeight: 1.65, marginTop: 14, maxWidth: 440 }}>
                  {w.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ImportWays;
