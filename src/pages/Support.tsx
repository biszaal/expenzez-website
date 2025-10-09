import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, HelpCircle, Book, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get support, find answers to common questions, or reach out to our team directly.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Get help via email. We typically respond within 24 hours.</p>
            <a
              href="mailto:support@expenzez.com"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              support@expenzez.com
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">In-App Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our AI assistant or reach support directly in the app.</p>
            <span className="text-secondary-600 font-medium">Available in Expenzez app</span>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Help</h3>
            <p className="text-gray-600 mb-4">Browse our help center for instant answers to common questions.</p>
            <span className="text-green-600 font-medium">Available 24/7</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <HelpCircle className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-8 text-white">
            <Book className="h-12 w-12 text-primary-200 mb-4" />
            <h3 className="text-2xl font-bold mb-2">User Guide</h3>
            <p className="text-primary-100 mb-4">
              Learn how to make the most of Expenzez with our comprehensive user guide and tutorials.
            </p>
            <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              View User Guide
            </button>
          </div>

          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg p-8 text-white">
            <MessageSquare className="h-12 w-12 text-secondary-200 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Community Forum</h3>
            <p className="text-secondary-100 mb-4">
              Connect with other Expenzez users, share tips, and get help from the community.
            </p>
            <button className="bg-white text-secondary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Join Community
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">Security Concerns?</h3>
          <p className="text-red-700 mb-4">
            If you notice any suspicious activity on your accounts or have security concerns, 
            contact us immediately and your bank directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:security@expenzez.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              security@expenzez.com
            </a>
            <span className="text-red-600 font-medium px-6 py-3">
              Response time: Within 1 hour
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still need help?</h2>
          
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
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
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Please describe your issue or question in detail..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;