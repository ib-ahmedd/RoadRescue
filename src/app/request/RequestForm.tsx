"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./RequestForm.module.css";

const services = [
  { value: "towing",    label: "🚛 Towing",           time: "~30 min", price: "From $75" },
  { value: "battery",   label: "🔋 Battery Jump Start", time: "~20 min", price: "From $35" },
  { value: "flat-tire", label: "🔧 Flat Tire Change",   time: "~25 min", price: "From $45" },
  { value: "fuel",      label: "⛽ Fuel Delivery",      time: "~25 min", price: "From $40" },
  { value: "lockout",   label: "🔑 Lockout Service",    time: "~35 min", price: "From $55" },
  { value: "repair",    label: "🔩 Minor Repair",       time: "~45 min", price: "From $60" },
];

const vehicleTypes = ["Sedan", "SUV / Crossover", "Truck / Pickup", "Van / Minivan", "Motorcycle", "RV / Motorhome", "Other"];

export default function RequestForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    service: "",
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    location: "",
    landmark: "",
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const svc = params.get("service");
      if (svc && services.some((s) => s.value === svc)) {
        setForm((prev) => ({ ...prev, service: svc }));
      }
    }
  }, []);

  const selectedService = services.find((s) => s.value === form.service);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/track?id=${data.id}`);
      } else {
        const errData = await response.json();
        alert("Error: " + (errData.error || "Failed to submit request"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = form.service !== "";
  const isStep2Valid = form.vehicleType && form.location && form.name && form.phone;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left Panel */}
          <div className={styles.left}>
            <span className="badge badge-amber">Emergency Dispatch</span>
            <h1 className={styles.title}>
              Request<br />
              <span className="gradient-text">Roadside Help</span>
            </h1>
            <p className={styles.sub}>
              Fill in the form and our nearest technician will be dispatched immediately to your location.
            </p>

            {/* Steps Indicator */}
            <div className={styles.steps}>
              {[
                { n: 1, label: "Choose Service" },
                { n: 2, label: "Your Details" },
                { n: 3, label: "Confirm" },
              ].map((s) => (
                <div key={s.n} className={`${styles.stepItem} ${step === s.n ? styles.stepActive : ""} ${step > s.n ? styles.stepDone : ""}`}>
                  <div className={styles.stepBubble}>
                    {step > s.n ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : s.n}
                  </div>
                  <span className={styles.stepLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Live ETA card */}
            {selectedService && (
              <div className={styles.etaCard}>
                <div className={styles.etaDot} />
                <div>
                  <p className={styles.etaLabel}>Estimated Arrival</p>
                  <p className={styles.etaTime}>{selectedService.time}</p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <p className={styles.etaLabel}>Starting from</p>
                  <p className={styles.etaPrice}>{selectedService.price}</p>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className={styles.trust}>
              {["🛡️ Insured & Certified", "📍 GPS Tracked", "💳 Secure Payment", "⭐ 4.9 Rating"].map((t) => (
                <span key={t} className={styles.trustBadge}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className={styles.right}>
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>

                {/* ── Step 1: Service Selection ── */}
                {step === 1 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>What do you need?</h2>
                    <p className={styles.stepSub}>Select the service that best matches your situation.</p>
                    <div className={styles.serviceGrid}>
                      {services.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          id={`service-${s.value}`}
                          className={`${styles.serviceCard} ${form.service === s.value ? styles.serviceSelected : ""}`}
                          onClick={() => update("service", s.value)}
                        >
                          <span className={styles.serviceLabel}>{s.label}</span>
                          <span className={styles.serviceTime}>{s.time}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary w-full"
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      id="step1-next"
                      style={{ marginTop: "1.5rem", opacity: isStep1Valid ? 1 : 0.5 }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {/* ── Step 2: Details ── */}
                {step === 2 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>Your Details</h2>
                    <p className={styles.stepSub}>Help us find you and prepare the right equipment.</p>

                    <div className={styles.fieldGroups}>
                      <div className={styles.fieldGroup}>
                        <h3 className={styles.groupTitle}>📋 Contact Info</h3>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-name">Full Name *</label>
                          <input id="req-name" className="form-input" type="text" placeholder="John Smith"
                            value={form.name} onChange={(e) => update("name", e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-phone">Phone Number *</label>
                          <input id="req-phone" className="form-input" type="tel" placeholder="+1 (555) 000-0000"
                            value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-email">Email (optional)</label>
                          <input id="req-email" className="form-input" type="email" placeholder="you@email.com"
                            value={form.email} onChange={(e) => update("email", e.target.value)} />
                        </div>
                      </div>

                      <div className={styles.fieldGroup}>
                        <h3 className={styles.groupTitle}>📍 Your Location</h3>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-location">Street Address or GPS *</label>
                          <input id="req-location" className="form-input" type="text" placeholder="123 Main St, Atlanta, GA"
                            value={form.location} onChange={(e) => update("location", e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-landmark">Nearby Landmark</label>
                          <input id="req-landmark" className="form-input" type="text" placeholder="Near the Shell station on Oak Ave"
                            value={form.landmark} onChange={(e) => update("landmark", e.target.value)} />
                        </div>
                      </div>

                      <div className={styles.fieldGroup}>
                        <h3 className={styles.groupTitle}>🚗 Vehicle Info</h3>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-vtype">Vehicle Type *</label>
                          <select id="req-vtype" className="form-input"
                            value={form.vehicleType} onChange={(e) => update("vehicleType", e.target.value)} required>
                            <option value="">Select type...</option>
                            {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className={styles.row}>
                          <div className="form-group">
                            <label className="form-label" htmlFor="req-make">Make</label>
                            <input id="req-make" className="form-input" type="text" placeholder="Toyota"
                              value={form.vehicleMake} onChange={(e) => update("vehicleMake", e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="req-model">Model</label>
                            <input id="req-model" className="form-input" type="text" placeholder="Camry"
                              value={form.vehicleModel} onChange={(e) => update("vehicleModel", e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="req-year">Year</label>
                            <input id="req-year" className="form-input" type="text" placeholder="2021"
                              value={form.vehicleYear} onChange={(e) => update("vehicleYear", e.target.value)} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="req-color">Vehicle Color</label>
                          <input id="req-color" className="form-input" type="text" placeholder="Silver"
                            value={form.vehicleColor} onChange={(e) => update("vehicleColor", e.target.value)} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="req-notes">Additional Notes</label>
                        <textarea id="req-notes" className="form-input" rows={3}
                          placeholder="Describe your situation in more detail..."
                          value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                      </div>
                    </div>

                    <div className={styles.navBtns}>
                      <button type="button" className="btn btn-outline" onClick={prevStep} id="step2-back">← Back</button>
                      <button type="button" className="btn btn-primary" onClick={nextStep}
                        disabled={!isStep2Valid} id="step2-next"
                        style={{ flex: 1, opacity: isStep2Valid ? 1 : 0.5 }}>
                        Review Request →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Confirm ── */}
                {step === 3 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepTitle}>Confirm & Dispatch</h2>
                    <p className={styles.stepSub}>Review your request before we send help.</p>

                    <div className={styles.summary}>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Service</span>
                        <span className={styles.summaryVal}>{selectedService?.label}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Name</span>
                        <span className={styles.summaryVal}>{form.name}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Phone</span>
                        <span className={styles.summaryVal}>{form.phone}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Location</span>
                        <span className={styles.summaryVal}>{form.location}</span>
                      </div>
                      {form.vehicleMake && (
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryKey}>Vehicle</span>
                          <span className={styles.summaryVal}>
                            {[form.vehicleYear, form.vehicleMake, form.vehicleModel, form.vehicleColor].filter(Boolean).join(" ")}
                          </span>
                        </div>
                      )}
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Est. Arrival</span>
                        <span className={styles.summaryVal} style={{ color: "var(--success)" }}>
                          {selectedService?.time}
                        </span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Starting Price</span>
                        <span className={styles.summaryVal} style={{ color: "var(--amber)" }}>
                          {selectedService?.price}
                        </span>
                      </div>
                    </div>

                    <div className={styles.disclaimer}>
                      By submitting, you agree to our{" "}
                      <a href="#" style={{ color: "var(--amber)" }}>Terms of Service</a> and{" "}
                      <a href="#" style={{ color: "var(--amber)" }}>Privacy Policy</a>.
                      Final price may vary based on job complexity and distance.
                    </div>

                    <div className={styles.navBtns}>
                      <button type="button" className="btn btn-outline" onClick={prevStep} id="step3-back">← Edit</button>
                      <button type="submit" className="btn btn-primary btn-lg" id="step3-submit"
                        style={{ flex: 1 }} disabled={loading}>
                        {loading ? (
                          <span className="dot-pulse"><span/><span/><span/></span>
                        ) : (
                          "🚨 Dispatch Help Now"
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
