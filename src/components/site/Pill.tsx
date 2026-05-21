import React from "react";
import { W } from "../../theme/tokens";

const Pill: React.FC<{ children: React.ReactNode; accent?: boolean }> = ({ children, accent }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      borderRadius: 10,
      background: accent ? "rgba(197,242,92,0.10)" : "rgba(157,91,255,0.10)",
      border: `1px solid ${accent ? "rgba(197,242,92,0.25)" : "rgba(157,91,255,0.25)"}`,
      color: accent ? W.lime : W.primary,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.4,
    }}
  >
    {children}
  </span>
);

export default Pill;
