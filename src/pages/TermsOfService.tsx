import React from 'react';
import Seo from '../components/Seo';

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-page">
      <Seo
        title="Terms of Service — Expenzez"
        description="The terms governing your use of the Expenzez app and website."
        path="/terms"
      />
      <div className="container">
        <div className="terms-content">
          <h1>Terms of Service</h1>
          <p style={{color: '#6b7280', marginBottom: '2rem'}}>
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
          </p>

          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              Expenzez ("the App", "our Service") is operated by Biszaal Tech Ltd, a company registered in
              England and Wales (company number 16693100), whose registered office is at 71-75 Shelton
              Street, London, WC2H 9JQ. By accessing and using Expenzez, you agree to be bound by these
              Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Expenzez is a personal expense-tracking application that provides:
            </p>
            <ul>
              <li>Manual and CSV-based tracking of your expenses and income</li>
              <li>Transaction categorisation</li>
              <li>AI-powered insights and recommendations (for information only)</li>
              <li>Budgeting and expense monitoring tools</li>
              <li>Push notifications relating to your activity in the app</li>
            </ul>
            <p>
              Expenzez does not connect to your bank, does not access your bank accounts, and never moves
              money. It is not a bank, payment service, or regulated financial adviser.
            </p>
          </section>

          <section>
            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old and have the legal capacity to enter into these Terms.
              Our Service is available to all users who want to track their expenses manually or via CSV import.
            </p>
          </section>

          <section>
            <h2>4. Account Registration</h2>
            <p>
              To use our Service, you must:
            </p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not share your account with others</li>
            </ul>
          </section>

          <section>
            <h2>5. Transaction Data</h2>
            <p>
              Our service allows you to manage your financial data through:
            </p>
            <ul>
              <li>Manual entry of transactions with your own data</li>
              <li>CSV import of transaction history from bank statements or other sources</li>
              <li>You are responsible for the accuracy of data you input</li>
              <li>We do not have access to your actual bank accounts or move money</li>
              <li>You can delete your transaction data at any time</li>
            </ul>
          </section>

          <section>
            <h2>6. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not reverse engineer or modify the App</li>
              <li>Not use the Service to violate any laws or regulations</li>
              <li>Keep your device secure and protected</li>
              <li>Report any security issues or unauthorized access immediately</li>
            </ul>
          </section>

          <section>
            <h2>7. AI and Automated Services</h2>
            <p>
              Our AI-powered insights and recommendations are provided for informational purposes only.
              They do not constitute financial advice. You should consult with qualified financial advisors
              for personalized financial guidance. We are not responsible for financial decisions made based
              on our automated recommendations.
            </p>
          </section>

          <section>
            <h2>8. Subscriptions and Payments</h2>
            <p>
              Expenzez offers an optional paid subscription ("Expenzez Pro"). Subscriptions are purchased
              and billed through the Apple App Store or Google Play, not directly by us. The current price
              is shown in the app before you purchase.
            </p>
            <ul>
              <li>Subscriptions renew automatically at the end of each billing period unless cancelled.</li>
              <li>You can manage or cancel your subscription at any time in your Apple or Google account settings; cancellation takes effect at the end of the current billing period.</li>
              <li>Payments are processed by Apple or Google. We do not receive or store your card or payment details.</li>
              <li>Refunds are handled under the policies of the Apple App Store or Google Play.</li>
              <li>
                Where you have a statutory right to cancel a digital purchase, that right may be lost once
                the subscription content is made available to you immediately with your consent. Any
                cancellation rights are administered by the relevant app store.
              </li>
            </ul>
          </section>

          <section>
            <h2>9. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of your personal information is
              governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2>10. Service Availability</h2>
            <p>
              We strive to maintain high availability but cannot guarantee uninterrupted access to our Service.
              We may temporarily suspend or restrict access for maintenance, updates, or security reasons.
              We are not liable for any loss or damage caused by service interruptions.
            </p>
          </section>

          <section>
            <h2>11. Intellectual Property</h2>
            <p>
              The Service, including all content, features, and functionality, is owned by Expenzez and
              protected by copyright, trademark, and other intellectual property laws. You may not copy,
              modify, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2>12. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EXPENZEZ SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
              LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2>13. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM
              ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
            </p>
            <ul>
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Accuracy or completeness of financial data</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security of data transmission</li>
            </ul>
          </section>

          <section>
            <h2>14. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for any breach
              of these Terms. You may also terminate your account at any time by contacting us. Upon
              termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section>
            <h2>15. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any changes
              by posting the new Terms on our website and updating the "Last updated" date. Your continued
              use of the Service after changes become effective constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2>16. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of England and Wales.
              Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the
              courts of England and Wales.
            </p>
          </section>

          <section>
            <h2>17. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="terms-contact-box">
              <p><strong>Company:</strong> Biszaal Tech Ltd (company no. 16693100)</p>
              <p><strong>Email:</strong> <a href="mailto:legal@expenzez.com">legal@expenzez.com</a></p>
              <p><strong>Support:</strong> <a href="mailto:support@expenzez.com">support@expenzez.com</a></p>
              <p><strong>Address:</strong> 71-75 Shelton Street, London, WC2H 9JQ, United Kingdom</p>
            </div>
          </section>

          <div className="terms-notice-box">
            <p>
              <strong>Important:</strong> These Terms constitute the entire agreement between you and Expenzez.
              If any provision is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
