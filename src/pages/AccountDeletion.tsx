import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const AccountDeletion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="support-page">
        <div className="container">
          <div className="support-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h1>Request Submitted</h1>
            <p>
              Your account deletion request has been successfully submitted.
            </p>
          </div>

          <div className="support-card" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#111827' }}>
                Reference ID: DDR-{Date.now()}
              </h3>
              <div style={{ textAlign: 'left', color: '#374151' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>What happens next?</h4>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
                  <li>You will receive a confirmation email at <strong>{email}</strong></li>
                  <li>Your account and all associated data will be permanently deleted within 30 days</li>
                  <li>You will receive a final confirmation email once the deletion is complete</li>
                </ol>
                <p style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                  💡 If you need to contact us about this request, please reference the ID above.
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
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
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Submitting...' : 'Submit Deletion Request'}
              </button>
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
