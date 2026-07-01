"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import styles from "./contact.module.css";

const SUBJECTS = [
  "General Inquiry",
  "Partnership Opportunities",
  "Provider Registration",
  "Feedback & Suggestions",
  "Technical Support",
  "Billing Inquiry",
];

export default function ContactMessageForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.formCard} animate-fadeInUp delay-100`}>
      {!submitted ? (
        <>
          <h2 className={styles.formTitle}>Send a Message</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                Full Name
              </label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                className="form-input"
                type="email"
                placeholder="john.doe@gmail.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">
                Subject
              </label>
              <select
                id="contact-subject"
                className="form-input"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                required
              >
                {SUBJECTS.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="form-input"
                placeholder="How can we help you today?"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
              />
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg"
              id="contact-submit"
              disabled={loading}
              style={{ marginTop: "0.5rem" }}
            >
              {loading ? (
                <span className="dot-pulse">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                "Send Message →"
              )}
            </button>
          </form>
        </>
      ) : (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Message Sent!</h2>
          <p className={styles.successText}>
            Thank you for contacting RoadRescue. Our team has received your message and will respond to you within 24
            hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-outline" id="contact-reset">
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
}
