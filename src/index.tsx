import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

const container = document.getElementById("root") as HTMLElement;

// The site is prerendered (scripts/prerender.mjs) purely for crawlers, social
// unfurls, and fast first paint. On the client we mount a fresh root rather
// than hydrate: React replaces the static markup with an identical tree, which
// sidesteps hydration mismatches from React 19 metadata hoisting and from
// animated/markup that differs from the snapshot. SEO is unaffected — bots read
// the served prerendered HTML.
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
