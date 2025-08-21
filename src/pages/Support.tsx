import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, HelpCircle, Zap } from 'lucide-react';

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
    <div className="page-container">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">How can we help you?</h1>
          <p className="page-subtitle">
            Get support, find answers to common questions, or reach out to our team directly.
          </p>
        </div>

        {/* Contact Options */}
        <div className="support-grid">
          <div className="support-card">
            <div className="support-icon">
              <Mail size={24} />
            </div>
            <h3>Email Support</h3>
            <p>Get help via email. We typically respond within 24 hours.</p>
            <a
              href="mailto:support@expenzez.com"
              style={{ color: '#6366f1', fontWeight: '500', textDecoration: 'none' }}
            >
              support@expenzez.com
            </a>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <MessageSquare size={24} />
            </div>
            <h3>In-App Chat</h3>
            <p>Chat with our AI assistant or reach support directly in the app.</p>
            <span style={{ color: '#8b5cf6', fontWeight: '500' }}>Available in Expenzez app</span>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <Zap size={24} />
            </div>
            <h3>Quick Help</h3>
            <p>Browse our help center for instant answers to common questions.</p>
            <span style={{ color: '#10b981', fontWeight: '500' }}>Available 24/7</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <HelpCircle size={20} style={{ 
                    color: '#6b7280',
                    transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} />
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

        {/* Emergency Contact */}
        <div style={{
          marginTop: '3rem',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            width: '4rem',
            height: '4rem',
            background: '#fee2e2',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            color: '#dc2626'
          }}>
            <Phone size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#7f1d1d', marginBottom: '1rem' }}>Security Concerns?</h3>
          <p style={{ color: '#991b1b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            If you notice any suspicious activity on your accounts or have security concerns, 
            contact us immediately and your bank directly.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <a
              href="mailto:security@expenzez.com"
              className="btn btn-primary"
              style={{ 
                background: '#dc2626', 
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Mail size={16} />
              security@expenzez.com
            </a>
            <span style={{ color: '#dc2626', fontWeight: '500' }}>
              Response time: Within 1 hour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;