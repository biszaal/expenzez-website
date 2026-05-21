import React from "react";
import { Apple, Play } from "lucide-react";
import { storeUrl } from "../config/links";
import { trackDownload } from "../lib/analytics";

interface Props {
  location: string; // "hero" | "cta" | "footer" | "download_page"
  variant?: "primary" | "light"; // light = on dark backgrounds
}

/**
 * The two app-store action buttons (App Store + Google Play) with click
 * tracking. Returns a fragment — wrap it in the layout container the surface
 * needs (e.g. `.button-group` or `.cta-buttons`).
 */
const StoreButtons: React.FC<Props> = ({ location, variant = "primary" }) => {
  const lightStyle =
    variant === "light" ? { background: "#fff", color: "#481B91" } : undefined;

  return (
    <>
      <a
        href={storeUrl("ios")}
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        style={lightStyle}
        onClick={() => trackDownload("ios", location)}
      >
        <Apple size={16} />
        App Store
      </a>
      <a
        href={storeUrl("android")}
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        style={lightStyle}
        onClick={() => trackDownload("android", location)}
      >
        <Play size={16} />
        Google Play
      </a>
    </>
  );
};

export default StoreButtons;
