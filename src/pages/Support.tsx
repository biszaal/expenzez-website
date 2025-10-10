import React, { useState } from 'react';
import { Mail, MessageSquare, ChevronDown, Zap } from 'lucide-react';

const Support: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI financial advisor work?",
      answer: "Our AI assistant analyzes your spending patterns, income, and financial goals to provide personalized insights and recommendations. It learns from your behavior, predicts future expenses, and proactively suggests ways to save money. Simply chat with it in natural language to get instant financial advice tailored to your unique situation."
    },
    {
      question: "How do I add transactions to Expenzez?",
      answer: "You can add transactions in two easy ways: 1) Manually enter each transaction with details like amount, category, and date. Perfect for cash payments and quick entries. 2) Bulk import via CSV file - ideal for freelancers, small businesses, or importing bank statements. Our AI automatically categorizes imported transactions."
    },
    {
      question: "Can the AI help me save money?",
      answer: "Absolutely! Our AI identifies spending patterns, finds unnecessary subscriptions, suggests budget adjustments, and alerts you before you overspend. It learns your financial habits and provides actionable recommendations to help you reach your savings goals faster. Think of it as your personal financial advisor, available 24/7."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, security is our top priority. We use bank-grade encryption for all data in transit and at rest. Your information is protected with biometric authentication (Face ID/Touch ID) and optional PIN protection. We never share your data with third parties, and all AI processing is done securely within our encrypted system."
    },
    {
      question: "What can I ask the AI assistant?",
      answer: "You can ask anything about your finances! Examples: 'Where am I spending the most?', 'Am I on track for my savings goal?', 'How much did I spend on groceries this month?', 'Can I afford this purchase?'. The AI understands natural language and provides instant, personalized answers based on your actual spending data."
    },
    {
      question: "How does CSV import work?",
      answer: "Go to Transactions > Import > Select CSV file. Our AI automatically maps columns (date, amount, description, category) and imports all transactions at once. Perfect for importing bank statements, credit card exports, or migrating from other apps. The AI then categorizes everything intelligently."
    },
    {
      question: "Does the AI work offline?",
      answer: "Yes! Once your transactions are synced, the AI can provide insights and answer questions about your existing data even without internet. However, you'll need connectivity to add new transactions or get the latest AI model updates."
    },
    {
      question: "What happens if I change my phone?",
      answer: "Simply download Expenzez on your new device and log in with your existing credentials. All your transactions, budgets, and AI insights will be restored automatically. For security, you'll need to set up biometric authentication or PIN on the new device."
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
