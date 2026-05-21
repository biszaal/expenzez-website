import React from "react";
import { APP_STORE_URL, PLAY_STORE_URL, SITE_URL, SOCIAL } from "../config/links";
import { faqs } from "../data/faqs";

function Json({ data }: { data: object }) {
  // CSR sets the script's textContent directly, so JSON is preserved verbatim
  // without HTML escaping. Data is fully static and developer-controlled.
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

export const OrganizationSchema: React.FC = () => (
  <Json
    data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Biszaal Tech Ltd",
      url: SITE_URL,
      logo: `${SITE_URL}/logo512.png`,
      sameAs: [SOCIAL.reddit, SOCIAL.instagram],
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
    }}
  />
);

export const AppSchema: React.FC = () => (
  <Json
    data={{
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: "Expenzez",
      applicationCategory: "FinanceApplication",
      operatingSystem: "iOS, Android",
      description:
        "AI-powered expense tracking, smart budgets, credit health, and instant insights. Built for the UK.",
      url: SITE_URL,
      downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      publisher: { "@type": "Organization", name: "Biszaal Tech Ltd" },
    }}
  />
);

export const FaqSchema: React.FC = () => (
  <Json
    data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }}
  />
);
