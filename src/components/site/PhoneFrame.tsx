import React from "react";
import { W } from "../../theme/tokens";

interface Props {
  src: string;
  alt: string;
  accent: string; // hex/rgba used for the ambient glow behind the device
}

/**
 * Presents a tall app screenshot inside a premium phone mockup — full screen
 * visible (no awkward crop), floating in an accent-tinted glow. The 3D tilt and
 * hover-straighten live in index.css (`.phone-frame`), and collapse flat on
 * mobile / reduced-motion.
 */
const PhoneFrame: React.FC<Props> = ({ src, alt, accent }) => (
  <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
    {/* ambient glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "118%",
        height: "72%",
        background: `radial-gradient(ellipse, ${accent}, transparent 68%)`,
        opacity: 0.22,
        filter: "blur(55px)",
        pointerEvents: "none",
      }}
    />

    <div
      className="phone-frame"
      style={{
        position: "relative",
        height: 540,
        aspectRatio: "1320 / 2868",
        borderRadius: 42,
        padding: 7,
        background: "#161220",
        boxShadow: "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.07)",
      }}
    >
      {/* notch */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 13,
          left: "50%",
          transform: "translateX(-50%)",
          width: 78,
          height: 20,
          borderRadius: 12,
          background: "#000",
          zIndex: 2,
        }}
      />
      <div style={{ width: "100%", height: "100%", borderRadius: 34, overflow: "hidden", background: W.bg }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            filter: "saturate(1.04) contrast(1.02)",
          }}
        />
      </div>
    </div>
  </div>
);

export default PhoneFrame;
