import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import Seo from '../components/Seo';

// Netlify Forms expects an application/x-www-form-urlencoded POST to the same
// origin, with the matching form-name field. The mirror form in index.html is
// what Netlify's build-time scanner registers.
const encodeForm = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const AccountDeletion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [botField, setBotField] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'deletion-request',
          'bot-field': botField,
          email,
          reason: reason || '(not provided)',
          confirmed: 'yes',
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('sent');
    } catch (err) {
      console.error('Account-deletion submission failed:', err);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="support-page">
        <div className="container">
          <div className="support-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h1>Request received</h1>
            <p>
              Thanks — your deletion request for <strong>{email}</strong> has been
              received by our privacy team.
            </p>
          </div>

          <div className="support-card" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#111827' }}>
                What happens next?
              </h3>
              <div style={{ textAlign: 'left', color: '#374151' }}>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
                  <li>We'll confirm receipt at <strong>{email}</strong> within 2 business days (we'll verify ownership before deleting)</li>
                  <li>Your account and all associated personal data will be permanently deleted, normally immediately and in any event within 30 days, per UK GDPR Art. 17</li>
                  <li>The fastest alternative is the in-app deletion: <strong>Settings → Data &amp; Privacy → Delete Account</strong></li>
                </ol>
                <p style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                  If you don't hear from us within 2 business days, please email{' '}
                  <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a> directly.
                </p>
              </div>
              <a href="/" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="support-page">
      <Seo
        title="Delete your Expenzez account"
        description="How to permanently delete your Expenzez account and data."
        path="/account-deletion"
      />
      <div className="container">
        <div className="support-header">
          <h1>Account Deletion Request</h1>
          <p>
            We're sorry to see you go. If you'd like to delete your Expenzez account,
            please fill out the form below or use the in-app deletion feature.
          </p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
            How to Delete Your Account
          </h2>

          <div className="support-options">
            <div className="support-card">
              <div className="support-card-icon">
                <span style={{ fontSize: '2rem' }}>🎯</span>
              </div>
              <h3>Method 1: In-App Deletion (Recommended)</h3>
              <ol style={{ textAlign: 'left', paddingLeft: '1.5rem', lineHeight: '1.8', color: '#6b7280' }}>
                <li>Open the Expenzez app</li>
                <li>Go to <strong>Settings → Data & Privacy</strong></li>
                <li>Tap <strong>"Delete Account"</strong></li>
                <li>Confirm your decision</li>
              </ol>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>
                This is the fastest method and takes effect immediately.
              </p>
            </div>

            <div className="support-card">
              <div className="support-card-icon">
                <Mail size={32} />
              </div>
              <h3>Method 2: Email Request</h3>
              <p style={{ textAlign: 'left', color: '#6b7280' }}>
                Send an email to{' '}
                <a href="mailto:privacy@expenzez.com" style={{ color: '#6366f1', fontWeight: '600' }}>
                  privacy@expenzez.com
                </a>{' '}
                with:
              </p>
              <ul style={{ textAlign: 'left', paddingLeft: '1.5rem', lineHeight: '1.8', color: '#6b7280', marginTop: '0.5rem' }}>
                <li>Subject: "Account Deletion Request"</li>
                <li>Your registered email address</li>
                <li>Reason for deletion (optional)</li>
              </ul>
            </div>

            <div className="support-card">
              <div className="support-card-icon">
                <span style={{ fontSize: '2rem' }}>📝</span>
              </div>
              <h3>Method 3: Web Form (Below)</h3>
              <p style={{ color: '#6b7280' }}>
                Fill out the form below to submit your deletion request.
              </p>
            </div>
          </div>

          <div className="contact-form" style={{ marginTop: '3rem' }}>
            <h2>Submit Deletion Request</h2>

            <form
              name="deletion-request"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              {/* Required so Netlify routes the SPA POST to the right form. */}
              <input type="hidden" name="form-name" value="deletion-request" />
              {/* Honeypot: real users leave this empty; bots fill every field. */}
              <p hidden>
                <label>
                  Don't fill this out:{' '}
                  <input
                    name="bot-field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Enter the email address associated with your Expenzez account
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  name="reason"
                  className="form-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Help us improve by telling us why you're leaving..."
                  rows={4}
                />
              </div>

              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <AlertTriangle size={24} color="#dc2626" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ color: '#991b1b', display: 'block', marginBottom: '0.5rem' }}>
                      Warning: This action cannot be undone
                    </strong>
                    <p style={{ color: '#7f1d1d', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      Deleting your account will permanently remove:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: '#7f1d1d', fontSize: '0.95rem', lineHeight: '1.8' }}>
                      <li>Your profile and login credentials</li>
                      <li>All transaction history and financial data</li>
                      <li>Budget settings and preferences</li>
                      <li>AI chat history and insights</li>
                      <li>Notification settings and tokens</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  required
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ color: '#374151', fontSize: '0.95rem' }}>
                  I understand this action is permanent and cannot be undone
                </span>
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
                style={{ opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Submitting…' : 'Submit Deletion Request'}
              </button>

              {status === 'error' && (
                <p
                  role="alert"
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                  }}
                >
                  Something went wrong submitting your request. Please email{' '}
                  <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a> instead.
                </p>
              )}
            </form>
          </div>

          <div className="support-card" style={{ marginTop: '3rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your Rights Under GDPR</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.8' }}>
              We comply with UK GDPR and data protection regulations. Your data will be
              deleted within 30 days of your request. For more information, see our{' '}
              <a href="/privacy" style={{ color: '#6366f1', fontWeight: '600' }}>Privacy Policy</a>.
            </p>
          </div>

          <div className="support-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Need Help?</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.8' }}>
              If you have questions about account deletion or data privacy, contact us at:
            </p>
            <p style={{ marginTop: '1rem', color: '#374151' }}>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@expenzez.com" style={{ color: '#6366f1', fontWeight: '600' }}>
                privacy@expenzez.com
              </a>
            </p>
            <p style={{ color: '#374151' }}>
              <strong>Support:</strong>{' '}
              <a href="mailto:support@expenzez.com" style={{ color: '#6366f1', fontWeight: '600' }}>
                support@expenzez.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
