import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700">
                By accessing and using Expenzez ("the App", "our Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Expenzez is a financial management application that provides:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Banking integration and account management</li>
                <li>Transaction tracking and categorization</li>
                <li>AI-powered financial insights and recommendations</li>
                <li>Budgeting and expense monitoring tools</li>
                <li>Push notifications for financial activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
              <p className="text-gray-700">
                You must be at least 18 years old and have the legal capacity to enter into these Terms. 
                Our Service is currently available only to residents of the United Kingdom with UK bank accounts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Be responsible for all activities under your account</li>
                <li>Not share your account with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Banking Integration</h2>
              <p className="text-gray-700 mb-4">
                Our banking services are provided through secure third-party providers like TrueLayer:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You authorize us to access your banking information through these providers</li>
                <li>We cannot make transactions or move money from your accounts</li>
                <li>You can revoke access at any time through your bank or our app</li>
                <li>We are not responsible for issues with third-party banking services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not reverse engineer or modify the App</li>
                <li>Not use the Service to violate any laws or regulations</li>
                <li>Keep your device secure and protected</li>
                <li>Report any security issues or unauthorized access immediately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. AI and Automated Services</h2>
              <p className="text-gray-700">
                Our AI-powered insights and recommendations are provided for informational purposes only. 
                They do not constitute financial advice. You should consult with qualified financial advisors 
                for personalized financial guidance. We are not responsible for financial decisions made based 
                on our automated recommendations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of your personal information is 
                governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Service Availability</h2>
              <p className="text-gray-700">
                We strive to maintain high availability but cannot guarantee uninterrupted access to our Service. 
                We may temporarily suspend or restrict access for maintenance, updates, or security reasons. 
                We are not liable for any loss or damage caused by service interruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-gray-700">
                The Service, including all content, features, and functionality, is owned by Expenzez and 
                protected by copyright, trademark, and other intellectual property laws. You may not copy, 
                modify, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, EXPENZEZ SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, 
                LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM 
                ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Warranties of merchantability and fitness for a particular purpose</li>
                <li>Accuracy or completeness of financial data</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data transmission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account immediately, without prior notice, for any breach 
                of these Terms. You may also terminate your account at any time by contacting us. Upon 
                termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify you of any changes 
                by posting the new Terms on our website and updating the "Last updated" date. Your continued 
                use of the Service after changes become effective constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law</h2>
              <p className="text-gray-700">
                These Terms are governed by and construed in accordance with the laws of England and Wales. 
                Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the 
                courts of England and Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:legal@expenzez.com" className="text-primary-600 hover:text-primary-700">legal@expenzez.com</a></p>
                <p className="text-gray-700 mb-2"><strong>Support:</strong> <a href="mailto:support@expenzez.com" className="text-primary-600 hover:text-primary-700">support@expenzez.com</a></p>
                <p className="text-gray-700"><strong>Address:</strong> London, United Kingdom</p>
              </div>
            </section>

            <div className="bg-yellow-50 p-6 rounded-lg mt-8">
              <p className="text-yellow-800 font-medium">
                <strong>Important:</strong> These Terms constitute the entire agreement between you and Expenzez. 
                If any provision is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;