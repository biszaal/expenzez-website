import React from "react";
import {
  Shield,
  Brain,
  Sparkles,
  Download,
  TrendingUp,
  PieChart,
  Target,
  CreditCard,
  Wallet,
  BarChart3,
  FileSpreadsheet,
  Bell,
  ArrowRight,
  Lock,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/expenzez/id6751338089";

const features = [
  {
    icon: <Brain size={22} strokeWidth={2} />,
    accent: "default" as const,
    title: "AI financial assistant",
    description:
      "Ask anything in plain English. Your assistant learns your spending, answers in seconds, and surfaces savings you'd otherwise miss.",
  },
  {
    icon: <PieChart size={22} strokeWidth={2} />,
    accent: "cyan" as const,
    title: "Smart insights & trends",
    description:
      "Category breakdowns, monthly trend comparisons, and personalised charts that show where your money really goes.",
  },
  {
    icon: <Target size={22} strokeWidth={2} />,
    accent: "lime" as const,
    title: "Budgets & savings goals",
    description:
      "Set monthly budgets per category, track progress toward goals, and get nudged before you overspend.",
  },
  {
    icon: <CreditCard size={22} strokeWidth={2} />,
    accent: "default" as const,
    title: "Credit cards & debt tracking",
    description:
      "Track balances, due dates, and utilisation across all your cards. See payoff timelines and total interest at a glance.",
  },
  {
    icon: <TrendingUp size={22} strokeWidth={2} />,
    accent: "lime" as const,
    title: "Credit score monitor",
    description:
      "Watch your credit score move month-to-month, understand the factors behind it, and get tips to improve.",
  },
  {
    icon: <FileSpreadsheet size={22} strokeWidth={2} />,
    accent: "cyan" as const,
    title: "Manual entry & CSV import",
    description:
      "Add cash expenses in one tap, or bulk-import a bank statement. AI categorises everything automatically.",
  },
  {
    icon: <BarChart3 size={22} strokeWidth={2} />,
    accent: "default" as const,
    title: "Cost-of-living comparison",
    description:
      "Benchmark your spending against UK averages by category so you know exactly where you stand.",
  },
  {
    icon: <Bell size={22} strokeWidth={2} />,
    accent: "lime" as const,
    title: "Bill reminders",
    description:
      "Never miss a payment. Smart reminders for recurring bills, subscriptions, and credit card due dates.",
  },
  {
    icon: <Shield size={22} strokeWidth={2} />,
    accent: "default" as const,
    title: "Bank-grade security",
    description:
      "End-to-end encryption, Face ID and PIN protection, and zero data sharing. Your finances stay yours.",
  },
];

const stats = [
  { label: "Designed for", value: "🇬🇧 UK", tone: "purple" as const, copy: "GBP-first, with UK averages baked into every insight." },
  { label: "Setup time", value: "<60s", tone: "lime" as const, copy: "Sign up, add a transaction, and your dashboard is live." },
  { label: "Tabs in the app", value: "5", tone: "cyan" as const, copy: "Home, Spending, Goals, Health, Account — focused, fast." },
];

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="badge">
            <span className="dot" />
            v1.6 · Now on the App Store
          </div>

          <h1>
            Smarter money,<br />
            <span className="accent">powered by AI.</span>
          </h1>

          <p className="lede">
            Expenzez tracks your spending, manages budgets, monitors credit health, and
            answers your finance questions instantly — all in one beautifully simple app.
          </p>

          <div className="button-group">
            <a
              href={APP_STORE_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download for iOS
            </a>
            <a href="#features" className="btn btn-secondary">
              Explore features
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="trust-strip">
            <span><Lock size={14} /> Bank-grade encryption</span>
            <span><Smartphone size={14} /> Face ID & PIN</span>
            <span><CheckCircle2 size={14} /> UK GDPR compliant</span>
          </div>

          <div className="screenshots">
            <div className="screenshot-card">
              <img src="/screenshot-1.png" alt="Expenzez dashboard" />
              <div className="caption">
                <h3>Dashboard</h3>
                <p>Balance, budgets, AI tips at a glance</p>
              </div>
            </div>
            <div className="screenshot-card">
              <img src="/screenshot-2.png" alt="Spending and budget tracking" />
              <div className="caption">
                <h3>Spending & budgets</h3>
                <p>Categorised, charted, and trend-tracked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / highlight */}
      <section className="showcase">
        <div className="container">
          <div className="showcase-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className={`stat-value ${s.tone}`}>{s.value}</div>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">Everything in one app</span>
            <h2>The financial control panel you'll actually open every day.</h2>
            <p>
              Nine purpose-built features, one quiet, focused experience. No clutter, no
              upsells you didn't ask for — just clarity.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className={`feature-icon ${f.accent === "default" ? "" : f.accent}`}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Expenzez */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">Designed with care</span>
            <h2>Built around how you actually think about money.</h2>
            <p>
              Most finance apps drown you in numbers. Expenzez gives you the one
              answer you came for — then quietly helps you act on it.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon lime">
                <Sparkles size={22} strokeWidth={2} />
              </div>
              <h3>One tap to clarity</h3>
              <p>
                Open the app and see exactly where you stand this month. No drilling
                through menus to find the number that matters.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Wallet size={22} strokeWidth={2} />
              </div>
              <h3>UK-first by design</h3>
              <p>
                GBP throughout, UK cost-of-living benchmarks, and category averages
                drawn from real UK data — not a US template translated to pounds.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon cyan">
                <Lock size={22} strokeWidth={2} />
              </div>
              <h3>Privacy that's actually private</h3>
              <p>
                Your data is encrypted, biometrically locked, and never sold. Delete
                your account any time — and it's truly gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-card">
            <h2>Take back control of your money today.</h2>
            <p>
              Join the early Expenzez community. Free to download, no card required,
              and you'll have an AI advisor in your pocket in under a minute.
            </p>

            <div className="cta-buttons">
              <a
                href={APP_STORE_URL}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
                Download for iOS
              </a>
              <span className="coming-soon">Android coming soon</span>
            </div>

            <p className="small">
              Proudly built by <strong>Biszaal Tech Ltd.</strong> · London, UK
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
