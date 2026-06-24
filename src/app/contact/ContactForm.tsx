"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./contact.module.css";

const subjects = [
  "General Inquiry",
  "Partnership Opportunities",
  "Provider Registration",
  "Feedback & Suggestions",
  "Technical Support",
  "Billing Inquiry",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.grid}>
      {/* Information Column */}
      <div className={`${styles.infoCol} animate-fadeIn`}>
        {/* Info Card */}
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Connect with RoadRescue</h2>
          <p className={styles.infoDesc}>
            Have questions about our services, partnerships, or interested in becoming a certified provider? We're available 24/7.
          </p>

          <div className={styles.contactList}>
            {/* Phone */}
            <div className={styles.contactItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.74a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <div className={styles.itemLabel}>24/7 Support Hotline</div>
                <div className={styles.itemValue}>+1 (800) 555-ROAD</div>
              </div>
            </div>

            {/* Email */}
            <div className={styles.contactItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className={styles.itemLabel}>Email Address</div>
                <div className={styles.itemValue}>support@roadrescue.com</div>
              </div>
            </div>

            {/* Address */}
            <div className={styles.contactItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className={styles.itemLabel}>Headquarters</div>
                <div className={styles.itemValue}>100 Peachtree St NW, Atlanta, GA 30303</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Radar Graphic */}
        <div className={styles.radarContainer}>
          <div className={styles.radarGrid} />
          <div className={styles.radarSweep} />
          <div className={styles.radarPulse} />
          <div className={styles.radarPulse2} />
          
          <div className={styles.radarPin}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="2" fill="currentColor"/>
            </svg>
            <div className={styles.pinLabel}>Active Tow Truck SP-003</div>
          </div>

          <div className={styles.radarTitle}>
            <span className={styles.radarLiveDot} />
            <span>Live Dispatch Network Radar</span>
          </div>

          <div className={styles.radarCoords}>
            LAT: 33.7490° N | LON: 84.3880° W
          </div>
        </div>
      </div>

      {/* Form Column */}
      <div className={`${styles.formCard} animate-fadeInUp delay-100`}>
        {!submitted ? (
          <>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name</label>
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

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
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

              {/* Subject */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  className="form-input"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  required
                >
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
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

              {/* Submit Button */}
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
              Thank you for contacting RoadRescue. Our team has received your message and will respond to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn btn-outline"
              id="contact-reset"
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
