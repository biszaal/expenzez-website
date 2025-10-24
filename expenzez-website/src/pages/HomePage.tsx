import React from "react";
import {
  Shield,
  Brain,
  CreditCard,
  Zap,
  Download,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI Financial Assistant",
      description:
        "Your personal AI advisor analyzes spending patterns and provides intelligent recommendations to help you save money and reach financial goals faster.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smart Categorization",
      description:
        "AI automatically categorizes your transactions and identifies spending trends. Get instant insights without manual effort.",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Manual & CSV Import",
      description:
        "Add transactions manually or bulk import via CSV. Perfect for cash expenses, freelancers, and small businesses.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Predictive Analytics",
      description:
        "AI predicts future spending patterns and alerts you before you exceed budgets. Stay ahead of your finances.",
    },
    {
      icon: <Zap size={24} />,
      title: "Instant AI Insights",
      description:
        "Ask your AI assistant anything about your finances. Get instant answers, tips, and personalized advice in natural language.",
    },
    {
      icon: <Shield size={24} />,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption, biometric authentication, and PIN protection. Your financial data is always secure and private.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          {/* Badge */}
          <div className="badge">
            <Sparkles size={12} />
            Now Available - MVP Launch
          </div>

          <h1>
            AI-Powered Expense Tracking
            <span> That Understands You</span>
          </h1>

          <p>
            Your personal AI financial advisor that learns your spending habits,
            predicts future expenses, and helps you save money automatically.
          </p>

          <div className="button-group">
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download for iOS
            </a>

            <button className="btn btn-secondary">Learn More</button>
          </div>

          {/* App Screenshots */}
          <div className="screenshots">
            <div className="screenshot-card">
              <img src="/screenshot 1.png" alt="Expenzez Dashboard" />
              <h3>Dashboard</h3>
              <p>Track all accounts</p>
            </div>

            <div className="screenshot-card">
              <img src="/screenshot 2.png" alt="Budget Tracking" />
              <h3>Budget Tracking</h3>
              <p>Monitor spending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>AI That Works For You</h2>
          <p className="features-subtitle">
            Powered by advanced artificial intelligence to give you smarter
            financial insights and effortless expense management.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to let AI manage your expenses?</h2>

          <p>
            Join thousands of users who trust Expenzez AI to track, analyze, and
            optimize their spending. Get personalized insights in seconds.
          </p>

          <div className="cta-buttons">
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download for iOS
            </a>

            <div className="coming-soon">Android version coming soon</div>
          </div>

          <p
            style={{ marginTop: "2rem", color: "#6b7280", fontSize: "0.95rem" }}
          >
            Proudly developed by <strong>Biszaal Tech Ltd.</strong> - London,
            United Kingdom
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
