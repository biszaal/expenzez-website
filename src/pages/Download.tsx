import React, { useEffect } from "react";
import { storeUrl } from "../config/links";
import { detectPlatform } from "../lib/platform";
import { trackDownload } from "../lib/analytics";
import StoreButtons from "../components/StoreButtons";
import Seo from "../components/Seo";

const Download: React.FC = () => {
  const platform = detectPlatform(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  useEffect(() => {
    if (platform === "ios" || platform === "android") {
      trackDownload(platform, "download_route");
      const params = new URLSearchParams(window.location.search);
      const utm =
        params.get("utm_source") ||
        params.get("utm_medium") ||
        params.get("utm_campaign")
          ? {
              source: params.get("utm_source") || "direct",
              medium: params.get("utm_medium") || "download_link",
              campaign: params.get("utm_campaign") || "app",
            }
          : undefined;
      window.location.replace(storeUrl(platform, utm));
    } else {
      trackDownload("unknown", "download_route");
    }
  }, [platform]);

  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <Seo
          title="Download Expenzez — iOS & Android"
          description="Get Expenzez on iPhone or Android. AI-powered expense tracking built for the UK."
          path="/download"
          noindex
        />
        <h1>Get Expenzez</h1>
        <p className="lede">
          {platform === "other"
            ? "Choose your platform to download the app."
            : "Redirecting you to the store…"}
        </p>
        <StoreButtons location="download_page" />
      </div>
    </section>
  );
};

export default Download;
