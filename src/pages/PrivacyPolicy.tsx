import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          
          <p className="last-updated">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
          </p>

          <h2>1. Introduction</h2>
          <p>
            Expenzez ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our 
            mobile application and related services (collectively, the "Service").
          </p>
          <p>
            By using our Service, you agree to the collection and use of information in accordance 
            with this policy.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>Name and email address</li>
            <li>Phone number</li>
            <li>Date of birth</li>
            <li>Address information</li>
            <li>Banking and financial account information (through secure third-party providers)</li>
          </ul>

          <h3>2.2 Financial Data</h3>
          <p>
            Through our secure integration with TrueLayer and other authorized financial service providers, 
            we access:
          </p>
          <ul>
            <li>Bank account information and balances</li>
            <li>Transaction history and details</li>
            <li>Account categorization and spending patterns</li>
          </ul>

          <h3>2.3 Usage Information</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>App usage patterns and preferences</li>
            <li>Device information (type, operating system, unique identifiers)</li>
            <li>Log files and crash reports</li>
            <li>Location data (only when necessary for functionality)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain our financial management services</li>
            <li>Process transactions and provide account information</li>
            <li>Generate AI-powered financial insights and recommendations</li>
            <li>Send notifications about your accounts and transactions</li>
            <li>Improve our app functionality and user experience</li>
            <li>Comply with legal obligations and prevent fraud</li>
            <li>Communicate with you about updates and support</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul>
            <li>End-to-end encryption for all data transmission</li>
            <li>Secure storage with bank-grade encryption</li>
            <li>Multi-factor authentication and biometric security</li>
            <li>Regular security audits and compliance monitoring</li>
            <li>Limited access controls for our staff</li>
          </ul>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third-party providers (like TrueLayer) who help us operate our services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfer:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
          </ul>

          <h2>6. Your Rights and Choices</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your personal data</li>
            <li>Restrict processing of your data</li>
            <li>Data portability</li>
            <li>Object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:privacy@expenzez.com" style={{ color: '#6366f1' }}>privacy@expenzez.com</a>.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to provide our services 
            and comply with legal obligations. Financial data is typically retained for 7 years as 
            required by UK financial regulations. You can request deletion of your account and data at any time.
          </p>

          <h2>8. International Transfers</h2>
          <p>
            Your data is processed within the UK and European Economic Area. If we need to transfer 
            data outside these regions, we ensure appropriate safeguards are in place to protect your information.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 16 years of age. We do not knowingly collect 
            personal information from children under 16. If you become aware that a child has provided us 
            with personal information, please contact us immediately.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
            advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
            <p><strong>Email:</strong> <a href="mailto:privacy@expenzez.com" style={{ color: '#6366f1' }}>privacy@expenzez.com</a></p>
            <p><strong>Support:</strong> <a href="mailto:support@expenzez.com" style={{ color: '#6366f1' }}>support@expenzez.com</a></p>
            <p><strong>Address:</strong> London, United Kingdom</p>
          </div>

          <div style={{ 
            background: '#eef4ff', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            marginTop: '2rem',
            border: '1px solid #c7d2fe'
          }}>
            <p style={{ color: '#1e40af', fontWeight: '500' }}>
              <strong>Regulatory Compliance:</strong> Expenzez operates in compliance with UK GDPR, 
              the Data Protection Act 2018, and FCA regulations for financial services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;