"use client";

import { useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import styles from "./join.module.css";

const specialities = [
  { value: "towing", label: "🚛 Towing & Recovery" },
  { value: "battery", label: "🔋 Battery Jumpstart" },
  { value: "flat-tire", label: "🔧 Flat Tire Change" },
  { value: "fuel", label: "⛽ Emergency Fuel Delivery" },
  { value: "lockout", label: "🔑 Lockout Service" },
  { value: "repair", label: "🔩 Minor Roadside Repair" },
];

export default function JoinForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    plate: "",
    speciality: specialities[0].value,
    licenseId: "",
  });

  const [registeredData, setRegisteredData] = useState<any>(null);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Compute avatar initials on submit
    const words = form.name.trim().split(/\s+/);
    let avatar = "SP";
    if (words.length >= 2) {
      avatar = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      avatar = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1 && words[0].length === 1) {
      avatar = (words[0][0] + "P").toUpperCase();
    }

    const payload = {
      ...form,
      avatar,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setRegisteredData(data);
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        vehicle: "",
        plate: "",
        speciality: specialities[0].value,
        licenseId: "",
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during registration.");
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
          <h2 className={styles.infoTitle}>Partner with RoadRescue</h2>
          <p className={styles.infoDesc}>
            Join our nationwide network of certified roadside assistance technicians. Get dispatched instantly, work on your own schedule, and earn premium rates.
          </p>

          <div className={styles.benefitsList}>
            {/* Benefit 1 */}
            <div className={styles.benefitItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <h3 className={styles.benefitTitle}>Work on Your Own Terms</h3>
                <p className={styles.benefitDesc}>Set your own hours. Go online in the app when you are ready to take rescue jobs, and go offline when you are done.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className={styles.benefitItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h3 className={styles.benefitTitle}>Guaranteed Weekly Payouts</h3>
                <p className={styles.benefitDesc}>Get paid directly to your bank account every week. No invoicing, no chasing clients, no delay.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className={styles.benefitItem}>
              <div className={styles.iconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className={styles.benefitTitle}>Smart Dispatch Navigation</h3>
                <p className={styles.benefitDesc}>Our GPS-based routing finds the fastest paths to stranded drivers, reducing fuel costs and arrival times.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulation Card */}
        <div className={styles.simulationCard}>
          <div className={styles.simHeader}>
            <div className={styles.simTitle}>
              <span className={styles.liveDot} />
              <span>Live Network Activity</span>
            </div>
            <span className={styles.simBadge}>PROV-NET-V4</span>
          </div>

          <div className={styles.simStatsGrid}>
            <div className={styles.simStatBox}>
              <span className={styles.simStatVal}>12m</span>
              <span className={styles.simStatLabel}>Avg. Eta</span>
            </div>
            <div className={styles.simStatBox}>
              <span className={styles.simStatVal}>98%</span>
              <span className={styles.simStatLabel}>Rating</span>
            </div>
            <div className={styles.simStatBox}>
              <span className={styles.simStatVal}>$65+</span>
              <span className={styles.simStatLabel}>Avg. Payout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Column */}
      <div className={`${styles.formCard} animate-fadeInUp delay-100`}>
        {!submitted ? (
          <>
            <h2 className={styles.formTitle}>Technician Registration</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="tech-name">Full Name / Business Name</label>
                <input
                  id="tech-name"
                  className="form-input"
                  type="text"
                  placeholder="e.g. Robert Smith or Swift Towing LLC"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="tech-phone">Mobile Phone Number</label>
                <input
                  id="tech-phone"
                  className="form-input"
                  type="tel"
                  placeholder="e.g. +1 (555) 123-4567"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                />
              </div>

              {/* License/ID Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="tech-license">Driver's License / Gov ID Number</label>
                <input
                  id="tech-license"
                  className="form-input"
                  type="text"
                  placeholder="e.g. DL-9837482"
                  value={form.licenseId}
                  onChange={(e) => update("licenseId", e.target.value)}
                  required
                />
              </div>

              {/* Speciality */}
              <div className="form-group">
                <label className="form-label" htmlFor="tech-speciality">Primary Speciality / Service Type</label>
                <select
                  id="tech-speciality"
                  className="form-input"
                  value={form.speciality}
                  onChange={(e) => update("speciality", e.target.value)}
                  required
                >
                  {specialities.map((spec) => (
                    <option key={spec.value} value={spec.value}>
                      {spec.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Description and Plate in a row */}
              <div className={styles.formRow}>
                <div className="form-group">
                  <label className="form-label" htmlFor="tech-vehicle">Service Vehicle</label>
                  <input
                    id="tech-vehicle"
                    className="form-input"
                    type="text"
                    placeholder="e.g. Ford F-250 Flatbed"
                    value={form.vehicle}
                    onChange={(e) => update("vehicle", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tech-plate">License Plate</label>
                  <input
                    id="tech-plate"
                    className="form-input"
                    type="text"
                    placeholder="e.g. TX-98A7B"
                    value={form.plate}
                    onChange={(e) => update("plate", e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className={styles.errorMsg}>{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full btn-lg styles.submitBtn"
                id="tech-submit"
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
                  "Submit Registration →"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Application Submitted!</h2>
            <p className={styles.successText}>
              Thank you for applying. Your application has been received and is currently under review by our operations team. You will be contacted once approved.
            </p>

            {registeredData && (
              <div className={styles.successSummaryCard}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Application ID:</span>
                  <span className={styles.summaryVal} style={{ fontFamily: "monospace" }}>{registeredData.id}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Operator Name:</span>
                  <span className={styles.summaryVal}>{registeredData.name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Speciality:</span>
                  <span className={styles.summaryVal}>
                    {specialities.find(s => s.value === registeredData.speciality)?.label.split(" ").slice(1).join(" ") || registeredData.speciality}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>License/Gov ID:</span>
                  <span className={styles.summaryVal}>{registeredData.licenseId}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Status:</span>
                  <span className={styles.summaryVal} style={{ color: "var(--amber)" }}>● {registeredData.status.toUpperCase()}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setSubmitted(false)}
              className="btn btn-outline"
              id="tech-reset"
            >
              Submit Another Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
