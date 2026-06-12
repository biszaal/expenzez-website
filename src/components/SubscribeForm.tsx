import React, { useState } from "react";
import { Link } from "react-router-dom";
import { W } from "../theme/tokens";
import { isValidEmail, subscribeEmail } from "../config/api";

type Status = "idle" | "loading" | "success" | "error";

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await subscribeEmail(email);
      setStatus("success");
      setMessage("Thanks — you're subscribed!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Subscription failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        marginTop: 48,
        paddingTop: 32,
        borderTop: `1px solid ${W.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      <div style={{ maxWidth: 420 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: W.text, marginBottom: 6 }}>
          Stay in the loop
        </div>
        <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.6, margin: 0 }}>
          Product updates, money tips and the occasional offer. No spam.
        </p>
      </div>

      <div style={{ minWidth: 280, flex: "1 1 320px", maxWidth: 420 }}>
        <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }} noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "11px 14px",
              borderRadius: 11,
              background: W.card,
              border: `1px solid ${W.border}`,
              color: W.text,
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "11px 18px",
              borderRadius: 11,
              border: "none",
              background: W.primary,
              color: "#0A1226",
              fontSize: 14,
              fontWeight: 700,
              cursor: status === "loading" ? "default" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {message ? (
          <div
            role="status"
            style={{
              marginTop: 8,
              fontSize: 12.5,
              color: status === "error" ? W.rose : W.lime,
            }}
          >
            {message}
          </div>
        ) : null}

        <p style={{ marginTop: 8, fontSize: 11.5, color: W.faint, lineHeight: 1.6 }}>
          By subscribing you agree to receive marketing emails. Unsubscribe
          anytime. See our{" "}
          <Link to="/privacy" style={{ color: W.cyan, textDecoration: "none" }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SubscribeForm;
