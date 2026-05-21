import React from "react";
import Seo from "../components/Seo";
import { AppSchema, OrganizationSchema } from "../components/StructuredData";
import Hero from "../components/site/Hero";
import FeatureBento from "../components/site/FeatureBento";
import StatsStrip from "../components/site/StatsStrip";
import Pricing from "../components/site/Pricing";
import HomeFaq from "../components/site/HomeFaq";
import BigCTA from "../components/site/BigCTA";

const HomePage: React.FC = () => (
  <div className="home">
    <Seo
      title="Expenzez — AI-powered expense tracking for the UK"
      description="Track spending, manage budgets, monitor credit health, and get instant AI insights. Free on iOS & Android, built for the UK."
      path="/"
    />
    <AppSchema />
    <OrganizationSchema />

    <Hero />
    <FeatureBento />
    <StatsStrip />
    <Pricing />
    <HomeFaq />
    <BigCTA />
  </div>
);

export default HomePage;
