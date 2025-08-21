import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Expenzez ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our 
                mobile application and related services (collectively, the "Service").
              </p>
              <p className="text-gray-700">
                By using our Service, you agree to the collection and use of information in accordance 
                with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Address information</li>
                <li>Banking and financial account information (through secure third-party providers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Financial Data</h3>
              <p className="text-gray-700 mb-4">
                Through our secure integration with TrueLayer and other authorized financial service providers, 
                we access:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Bank account information and balances</li>
                <li>Transaction history and details</li>
                <li>Account categorization and spending patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Usage Information</h3>
              <p className="text-gray-700 mb-4">We automatically collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>App usage patterns and preferences</li>
                <li>Device information (type, operating system, unique identifiers)</li>
                <li>Log files and crash reports</li>
                <li>Location data (only when necessary for functionality)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain our financial management services</li>
                <li>Process transactions and provide account information</li>
                <li>Generate AI-powered financial insights and recommendations</li>
                <li>Send notifications about your accounts and transactions</li>
                <li>Improve our app functionality and user experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Communicate with you about updates and support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure storage with bank-grade encryption</li>
                <li>Multi-factor authentication and biometric security</li>
                <li>Regular security audits and compliance monitoring</li>
                <li>Limited access controls for our staff</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party providers (like TrueLayer) who help us operate our services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfer:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your personal data</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@expenzez.com" className="text-primary-600 hover:text-primary-700">privacy@expenzez.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information only for as long as necessary to provide our services 
                and comply with legal obligations. Financial data is typically retained for 7 years as 
                required by UK financial regulations. You can request deletion of your account and data at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Transfers</h2>
              <p className="text-gray-700">
                Your data is processed within the UK and European Economic Area. If we need to transfer 
                data outside these regions, we ensure appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our Service is not intended for children under 16 years of age. We do not knowingly collect 
                personal information from children under 16. If you become aware that a child has provided us 
                with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
                advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:privacy@expenzez.com" className="text-primary-600 hover:text-primary-700">privacy@expenzez.com</a></p>
                <p className="text-gray-700 mb-2"><strong>Support:</strong> <a href="mailto:support@expenzez.com" className="text-primary-600 hover:text-primary-700">support@expenzez.com</a></p>
                <p className="text-gray-700"><strong>Address:</strong> London, United Kingdom</p>
              </div>
            </section>

            <div className="bg-primary-50 p-6 rounded-lg mt-8">
              <p className="text-primary-800 font-medium">
                <strong>Regulatory Compliance:</strong> Expenzez operates in compliance with UK GDPR, 
                the Data Protection Act 2018, and FCA regulations for financial services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;