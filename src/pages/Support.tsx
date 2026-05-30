import React, { useState } from "react";
import { Mail, MessageSquare, ChevronDown, Sparkles } from "lucide-react";
import { faqs } from "../data/faqs";
import { FaqSchema } from "../components/StructuredData";
import Seo from "../components/Seo";

// Netlify Forms expects an application/x-www-form-urlencoded POST to the same
// origin, with the matching form-name field. This matches the hidden form in
// index.html that Netlify's build-time scanner sees.
const encodeForm = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const Support: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General question");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [botField, setBotField] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "support",
          "bot-field": botField,
          name,
          email,
          subject,
          message,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("General question");
      setMessage("");
    } catch (err) {
      console.error("Support form submission failed:", err);
      setStatus("error");
    }
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

          <form
            name="support"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Required so Netlify routes the SPA POST to the right form. */}
            <input type="hidden" name="form-name" value="support" />
            {/* Honeypot: real users leave this empty; bots fill every field. */}
            <p hidden>
              <label>
                Don't fill this out:{" "}
                <input
                  name="bot-field"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </label>
            </p>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
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
                name="email"
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
                name="subject"
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
                name="message"
                className="form-textarea"
                placeholder="Please describe your question or issue in as much detail as possible…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === "sending"}
              style={{ opacity: status === "sending" ? 0.7 : 1 }}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "sent" && (
              <p
                role="status"
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  background: "#ecfdf5",
                  color: "#065f46",
                  border: "1px solid #a7f3d0",
                }}
              >
                Thanks — your message is on its way. We usually reply within a day.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                }}
              >
                Something went wrong sending your message. Please email{" "}
                <a href="mailto:support@expenzez.com">support@expenzez.com</a> instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
