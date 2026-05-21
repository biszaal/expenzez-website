import React, { useState } from "react";
import { Mail, MessageSquare, ChevronDown, Sparkles } from "lucide-react";
import { faqs } from "../data/faqs";
import { FaqSchema } from "../components/StructuredData";
import Seo from "../components/Seo";

const Support: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General question");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`[Support] ${subject}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:support@expenzez.com?subject=${mailSubject}&body=${mailBody}`;
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="support-page">
      <Seo
        title="Expenzez Support & FAQ — Help with the app"
        description="Answers to common Expenzez questions: AI assistant, CSV import, budgets, credit tracking, security, and Android availability."
        path="/support"
      />
      <FaqSchema />
      <div className="container">
        <div className="support-header">
          <h1>How can we help?</h1>
          <p>
            Browse the FAQs below, reach out by email, or send us a message
            — we usually reply within a day.
          </p>
        </div>

        <div className="support-options">
          <div className="support-card">
            <div className="support-card-icon">
              <Mail size={22} strokeWidth={2} />
            </div>
            <h3>Email support</h3>
            <p>Drop us a line and we'll typically reply within 24 hours.</p>
            <a href="mailto:support@expenzez.com">support@expenzez.com</a>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <MessageSquare size={22} strokeWidth={2} />
            </div>
            <h3>In-app AI assistant</h3>
            <p>
              Ask your AI assistant inside the app — it knows your data and
              can answer instantly.
            </p>
            <span style={{ color: "rgba(26,20,48,0.42)", fontSize: "0.85rem" }}>
              Available in the Expenzez app
            </span>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <Sparkles size={22} strokeWidth={2} />
            </div>
            <h3>Feature requests</h3>
            <p>Got an idea? We're a small team and we read every message.</p>
            <a href="mailto:support@expenzez.com?subject=Feature%20request">
              Send us your idea
            </a>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently asked questions</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-icon ${expandedFaq === index ? "expanded" : ""}`}
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

        <div className="contact-form">
          <h2>Still need help?</h2>
          <p
            style={{
              textAlign: "center",
              color: "rgba(26,20,48,0.62)",
              marginBottom: "2rem",
            }}
          >
            Biszaal Tech Ltd · London, UK — we're here to help.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>General question</option>
                <option>AI assistant question</option>
                <option>CSV import issue</option>
                <option>Budget / goals question</option>
                <option>Credit tracking question</option>
                <option>Security concern</option>
                <option>Feature request</option>
                <option>Bug report</option>
                <option>Account deletion</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Please describe your question or issue in as much detail as possible…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="form-submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
