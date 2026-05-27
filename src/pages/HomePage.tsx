import React from "react";
import Seo from "../components/Seo";
import { AppSchema, OrganizationSchema } from "../components/StructuredData";
import Hero from "../components/site/Hero";
import ImportWays from "../components/site/ImportWays";
import FeatureBento from "../components/site/FeatureBento";
import StatsStrip from "../components/site/StatsStrip";
import Pricing from "../components/site/Pricing";
import HomeFaq from "../components/site/HomeFaq";
import BigCTA from "../components/site/BigCTA";

const HomePage: React.FC = () => (
  <div className="home">
    <Seo
      title="Expenzez — AI money insights, no bank login required"
      description="No bank connection needed. Upload your UK bank statement and get instant AI spending insights, smart budgets, and credit tracking — free on iOS & Android."
      path="/"
    />
    <AppSchema />
    <OrganizationSchema />

    <Hero />
    <ImportWays />
    <FeatureBento />
    <StatsStrip />
    <Pricing />
    <HomeFaq />
    <BigCTA />
  </div>
);

export default HomePage;
