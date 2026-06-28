"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, parseApiResponse } from "@/lib/api";
import { LOCALE } from "@/lib/locale";
import ApplicationTracker from "./ApplicationTracker";
import styles from "./join.module.css";

const specialities = [
  { value: "towing", label: "🚛 Towing & Recovery" },
  { value: "battery", label: "🔋 Battery Jumpstart" },
  { value: "flat-tire", label: "🔧 Flat Tire Change" },
  { value: "fuel", label: "⛽ Emergency Fuel Delivery" },
  { value: "lockout", label: "🔑 Lockout Service" },
  { value: "repair", label: "🔩 Minor Roadside Repair" },
];

const LICENSE_ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_LICENSE_BYTES = 5 * 1024 * 1024;

export default function JoinForm() {
  const searchParams = useSearchParams();
  const trackerRef = useRef<HTMLDivElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);

  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [licenseImage, setLicenseImage] = useState("");
  const [licenseFileName, setLicenseFileName] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    plate: "",
    speciality: specialities[0].value,
    licenseId: "",
  });

  const [registeredData, setRegisteredData] = useState<{
    id: string;
    name: string;
    speciality: string;
    licenseId: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) setActiveTrackingId(id.trim().toUpperCase());
  }, [searchParams]);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const scrollToTracker = () => {
    trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearLicensePhoto = () => {
    setLicenseImage("");
    setLicenseFileName("");
    if (licenseInputRef.current) licenseInputRef.current.value = "";
  };

  const handleLicensePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, or WebP).");
      clearLicensePhoto();
      return;
    }

    if (file.size > MAX_LICENSE_BYTES) {
      setError("License photo must be under 5 MB.");
      clearLicensePhoto();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLicenseImage(reader.result);
        setLicenseFileName(file.name);
      }
    };
    reader.onerror = () => {
      setError("Could not read the selected image. Please try again.");
      clearLicensePhoto();
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!licenseImage) {
      setError("Please upload a clear photo of your valid driver's license or government ID.");
      return;
    }

    setLoading(true);

    const words = form.name.trim().split(/\s+/);
    let avatar = "SP";
    if (words.length >= 2) {
      avatar = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      avatar = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1 && words[0].length === 1) {
      avatar = (words[0][0] + "P").toUpperCase();
    }

    try {
      const response = await apiFetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, avatar, licenseImage }),
      });

      const data = await parseApiResponse(response);

      setRegisteredData(data);
      setSubmitted(true);
      setActiveTrackingId(data.id);
      setForm({
        name: "",
        phone: "",
        vehicle: "",
        plate: "",
        speciality: specialities[0].value,
        licenseId: "",
      });
      clearLicensePhoto();

      setTimeout(scrollToTracker, 300);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.grid}>
        <div className={`${styles.infoCol} animate-fadeIn`}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Partner with RoadRescue</h2>
            <p className={styles.infoDesc}>
              Join our network of certified roadside assistance technicians across Nigeria. Get dispatched instantly, work on your own schedule, and earn premium rates.
            </p>

            <div className={styles.benefitsList}>
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
                <span className={styles.simStatVal}>{LOCALE.avgTechEarnings}</span>
                <span className={styles.simStatLabel}>Avg. Payout</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.formCard} animate-fadeInUp delay-100`}>
          {!submitted ? (
            <>
              <h2 className={styles.formTitle}>Technician Registration</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="form-group">
                  <label className="form-label" htmlFor="tech-name">Full Name / Business Name</label>
                  <input
                    id="tech-name"
                    className="form-input"
                    type="text"
                    placeholder="e.g. Tunde Adeyemi or Swift Towing Ltd"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tech-phone">Mobile Phone Number</label>
                  <input
                    id="tech-phone"
                    className="form-input"
                    type="tel"
                    placeholder={LOCALE.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tech-license">Driver&apos;s License / Gov ID Number</label>
                  <input
                    id="tech-license"
                    className="form-input"
                    type="text"
                    placeholder="e.g. LAG-12345678"
                    value={form.licenseId}
                    onChange={(e) => update("licenseId", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tech-license-photo">
                    Photo of Valid License / Government ID <span style={{ color: "var(--danger)" }}>*</span>
                  </label>
                  <input
                    ref={licenseInputRef}
                    id="tech-license-photo"
                    type="file"
                    accept={LICENSE_ACCEPT}
                    capture="environment"
                    className={styles.licenseInputHidden}
                    onChange={handleLicensePhoto}
                    required={!licenseImage}
                  />
                  {!licenseImage ? (
                    <button
                      type="button"
                      className={styles.licenseUploadBox}
                      onClick={() => licenseInputRef.current?.click()}
                    >
                      <span className={styles.licenseUploadIcon}>📷</span>
                      <span className={styles.licenseUploadTitle}>Upload license photo</span>
                      <span className={styles.licenseUploadHint}>
                        JPG, PNG, or WebP · Max 5 MB · Must show your name and photo clearly
                      </span>
                    </button>
                  ) : (
                    <div className={styles.licensePreviewWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={licenseImage}
                        alt="License preview"
                        className={styles.licensePreviewImg}
                      />
                      <div className={styles.licensePreviewMeta}>
                        <span className={styles.licenseFileName}>{licenseFileName}</span>
                        <div className={styles.licensePreviewActions}>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => licenseInputRef.current?.click()}
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            style={{ borderColor: "rgba(239,68,68,0.4)", color: "var(--danger)" }}
                            onClick={clearLicensePhoto}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
                      placeholder={LOCALE.platePlaceholder}
                      value={form.plate}
                      onChange={(e) => update("plate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <div className={styles.errorMsg}>{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-full btn-lg"
                  id="tech-submit"
                  disabled={loading || !licenseImage}
                  style={{ marginTop: "0.5rem" }}
                >
                  {loading ? (
                    <span className="dot-pulse"><span /><span /><span /></span>
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
                Save your tracking ID below. Scroll down to track your application and complete portal registration once approved.
              </p>

              {registeredData && (
                <div className={styles.successSummaryCard}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Tracking ID:</span>
                    <span className={styles.summaryVal} style={{ fontFamily: "monospace", color: "var(--amber-light)" }}>
                      {registeredData.id}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Operator Name:</span>
                    <span className={styles.summaryVal}>{registeredData.name}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Speciality:</span>
                    <span className={styles.summaryVal}>
                      {specialities.find((s) => s.value === registeredData.speciality)?.label.split(" ").slice(1).join(" ") || registeredData.speciality}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Status:</span>
                    <span className={styles.summaryVal} style={{ color: "var(--amber)" }}>
                      ● {registeredData.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: "400px" }}>
                <button type="button" className="btn btn-primary w-full" onClick={scrollToTracker}>
                  View Application Status ↓
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline w-full"
                  id="tech-reset"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div ref={trackerRef}>
        <ApplicationTracker
          activeId={activeTrackingId}
          onActiveIdChange={setActiveTrackingId}
        />
      </div>
    </>
  );
}
