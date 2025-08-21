import React from 'react';
import { 
  Shield, 
  Brain, 
  CreditCard, 
  Bell, 
  Zap, 
  Download,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <CreditCard size={24} />,
      title: "UK Banking Integration",
      description: "Connect all your UK bank accounts securely via TrueLayer. Real-time transaction sync and categorization."
    },
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice from our intelligent AI assistant. Chat-based interface for instant guidance."
    },
    {
      icon: <Shield size={24} />,
      title: "Bank-Grade Security",
      description: "Advanced encryption, biometric authentication, and PIN protection. Your data is always secure."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Smart Analytics",
      description: "Visualize your spending patterns with beautiful charts and get actionable insights to improve your finances."
    },
    {
      icon: <Bell size={24} />,
      title: "Smart Notifications",
      description: "Real-time transaction alerts and spending notifications. Stay informed about your finances."
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Sync",
      description: "Lightning-fast transaction synchronization across all your connected accounts."
    }
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
            Smart Expense Tracking for
            <span> UK Users</span>
          </h1>
          
          <p>
            Connect your UK banks, track spending with AI insights, and take control of your finances.
          </p>
          
          <div className="button-group">
            <a
              href="https://apps.apple.com/app/expenzez"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download for iOS
            </a>
            
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
          
          {/* App Screenshots */}
          <div className="screenshots">
            <div className="screenshot-card">
              <img 
                src="/screenshot 1.png" 
                alt="Expenzez Dashboard"
              />
              <h3>Dashboard</h3>
              <p>Track all accounts</p>
            </div>
            
            <div className="screenshot-card">
              <img 
                src="/screenshot 2.png" 
                alt="Budget Tracking"
              />
              <h3>Budget Tracking</h3>
              <p>Monitor spending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <p className="features-subtitle">
            Everything you need to manage your UK finances in one secure app.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
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
          <h2>Ready to get started?</h2>
          
          <p>
            Download Expenzez today and start taking control of your finances with smart UK banking integration.
          </p>
          
          <div className="cta-buttons">
            <a
              href="https://apps.apple.com/app/expenzez"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download for iOS
            </a>
            
            <div className="coming-soon">
              Android version coming soon
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;