import React, { useState } from 'react';
import { Mail, MessageSquare, ChevronDown, Zap } from 'lucide-react';

const Support: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I connect my bank account to Expenzez?",
      answer: "Connecting your bank account is simple and secure. Go to the 'Banking' section in the app, tap 'Add Account', and select your bank. You'll be redirected to your bank's secure login page through TrueLayer. Once authenticated, your account will be connected and transactions will start syncing automatically."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We use bank-grade encryption and security measures. Your data is encrypted both in transit and at rest. We never store your banking credentials - authentication is handled securely through TrueLayer, an FCA-regulated provider. We also offer biometric authentication and PIN protection for additional security."
    },
    {
      question: "Which UK banks are supported?",
      answer: "We support all major UK banks including Barclays, HSBC, Lloyds Bank, Santander, NatWest, RBS, TSB, Nationwide, and many more. Our integration through TrueLayer supports over 200+ UK financial institutions including traditional banks, challenger banks, and building societies."
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI assistant analyzes your spending patterns, income, and financial goals to provide personalized insights and recommendations. It can help you understand your spending habits, suggest budget optimizations, and answer questions about your finances. All analysis is done securely within our system."
    },
    {
      question: "Can I disconnect my bank accounts?",
      answer: "Yes, you can disconnect your bank accounts at any time. Go to Settings > Connected Accounts, select the account you want to remove, and tap 'Disconnect'. You can also revoke access directly through your bank's online banking portal or through TrueLayer's dashboard."
    },
    {
      question: "Do you support joint accounts?",
      answer: "Yes, Expenzez supports joint accounts. When you connect a joint account, all transactions will be visible in your app. Both account holders can connect the same joint account to their individual Expenzez profiles if they wish."
    },
    {
      question: "How often do transactions sync?",
      answer: "Transactions typically sync in real-time or within a few minutes of being processed by your bank. Some banks may have slight delays, but most transactions appear within 15 minutes. You can also manually refresh by pulling down on the transactions screen."
    },
    {
      question: "What happens if I change my phone?",
      answer: "Simply download Expenzez on your new device and log in with your existing credentials. All your connected accounts and data will be restored. For added security, you may need to re-enable biometric authentication on the new device."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="support-page">
      <div className="container">
        {/* Header */}
        <div className="support-header">
          <h1>How can we help you?</h1>
          <p>
            Get support, find answers to common questions, or reach out to our team directly.
          </p>
        </div>

        {/* Contact Options */}
        <div className="support-options">
          <div className="support-card">
            <div className="support-card-icon">
              <Mail size={32} />
            </div>
            <h3>Email Support</h3>
            <p>Get help via email. We typically respond within 24 hours.</p>
            <a href="mailto:support@expenzez.com">
              support@expenzez.com
            </a>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <MessageSquare size={32} />
            </div>
            <h3>In-App Chat</h3>
            <p>Chat with our AI assistant or reach support directly in the app.</p>
            <span>Available in Expenzez app</span>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <Zap size={32} />
            </div>
            <h3>Quick Help</h3>
            <p>Browse our help center for instant answers to common questions.</p>
            <span>Available 24/7</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-icon ${expandedFaq === index ? 'expanded' : ''}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Still need help?</h2>
          <p style={{textAlign: 'center', color: '#6b7280', marginBottom: '2rem'}}>
            Biszaal Tech Ltd. - We're here to help you
          </p>

          <form>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-select">
                <option>General Question</option>
                <option>Account Connection Issue</option>
                <option>Transaction Not Appearing</option>
                <option>AI Assistant Question</option>
                <option>Security Concern</option>
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Please describe your issue or question in detail..."
              ></textarea>
            </div>

            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
