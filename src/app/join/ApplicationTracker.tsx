"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { apiFetch, parseApiResponse } from "@/lib/api";
import styles from "./join.module.css";

interface ApplicationTrack {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  status: "pending" | "approved" | "rejected";
  providerId: string | null;
  registered: boolean;
  canRegister: boolean;
  createdAt: string;
}

const SPECIALITY_LABELS: Record<string, string> = {
  towing: "Towing & Recovery",
  battery: "Battery Jumpstart",
  "flat-tire": "Flat Tire Change",
  fuel: "Emergency Fuel Delivery",
  lockout: "Lockout Service",
  repair: "Minor Roadside Repair",
};

const TECHNICIAN_PORTAL_URL =
  process.env.NEXT_PUBLIC_TECHNICIAN_PORTAL_URL || "http://localhost:3002/login";

interface ApplicationTrackerProps {
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
}

export default function ApplicationTracker({ activeId, onActiveIdChange }: ApplicationTrackerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lookupId, setLookupId] = useState("");
  const [application, setApplication] = useState<ApplicationTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const fetchApplication = useCallback(async (id: string, isPoll = false) => {
    try {
      const response = await apiFetch(
        `/api/applications?id=${encodeURIComponent(id)}`,
        { bustCache: isPoll }
      );
      if (response.ok) {
        const data = await parseApiResponse<ApplicationTrack>(response);
        setApplication(data);
        setError("");
      } else if (!isPoll) {
        setError("Application not found. Please check your tracking ID.");
        setApplication(null);
      }
    } catch (err) {
      if (!isPoll) {
        setError(err instanceof Error ? err.message : "Failed to connect to the server.");
        setApplication(null);
      }
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeId) {
      setApplication(null);
      setLoading(false);
      return;
    }

    setLookupId(activeId);
    setLoading(true);
    fetchApplication(activeId);

    const interval = setInterval(() => fetchApplication(activeId, true), 5000);
    return () => clearInterval(interval);
  }, [activeId, fetchApplication]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = lookupId.trim().toUpperCase();
    if (!trimmed) return;
    onActiveIdChange(trimmed);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;

    setRegisterError("");
    setRegisterSuccess("");
    setRegisterLoading(true);

    try {
      const response = await apiFetch("/api/applications/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: application.id,
          ...registerForm,
        }),
      });

      const data = await parseApiResponse<{ message: string; application: ApplicationTrack }>(response);
      setApplication(data.application);
      setRegisterSuccess(data.message);
      setShowRegister(false);
      setRegisterForm({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const getStepState = (step: string) => {
    if (!application) return "upcoming";

    if (step === "submitted") return "done";
    if (step === "review") {
      if (application.status === "pending") return "active";
      return "done";
    }
    if (step === "decision") {
      if (application.status === "pending") return "upcoming";
      if (application.status === "rejected") return "rejected";
      return "done";
    }
    if (step === "register") {
      if (application.status !== "approved") return "upcoming";
      if (application.registered) return "done";
      return "active";
    }
    return "upcoming";
  };

  const stepClass = (state: string) => {
    if (state === "done") return styles.trackStepDone;
    if (state === "active") return styles.trackStepActive;
    if (state === "rejected") return styles.trackStepRejected;
    return "";
  };

  const needsRegistration =
    application?.status === "approved" && !application?.registered;

  const registerFormContent = (
    <form onSubmit={handleRegister} className={styles.trackRegisterForm}>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-username">Username</label>
        <input
          id="reg-username"
          className="form-input"
          value={registerForm.username}
          onChange={(e) => setRegisterForm((p) => ({ ...p, username: e.target.value }))}
          placeholder="e.g. jsmith_tow"
          required
          minLength={3}
          autoComplete="username"
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          className="form-input"
          type="password"
          value={registerForm.password}
          onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
          placeholder="At least 6 characters"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
        <input
          id="reg-confirm"
          className="form-input"
          type="password"
          value={registerForm.confirmPassword}
          onChange={(e) => setRegisterForm((p) => ({ ...p, confirmPassword: e.target.value }))}
          placeholder="Repeat password"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      {registerError && <div className={styles.errorMsg}>{registerError}</div>}
      <div className={styles.trackModalActions}>
        <button type="submit" className="btn btn-primary" disabled={registerLoading}>
          {registerLoading ? (
            <span className="dot-pulse"><span /><span /><span /></span>
          ) : (
            "Create Account →"
          )}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setShowRegister(false);
            setRegisterError("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <section ref={sectionRef} id="application-tracker" className={styles.trackSection}>
      <div className={styles.trackSectionHeader}>
        <span className="badge badge-amber">Application Tracking</span>
        <h2 className={styles.trackSectionTitle}>
          Track Your <span className="gradient-text">Application</span>
        </h2>
        <p className={styles.trackSectionSub}>
          Enter your tracking ID to follow review progress. Once approved, create your technician portal login below.
        </p>
      </div>

      <div className={styles.trackLookupCard}>
        <div className={styles.trackLookupLabel}>Tracking ID</div>
        <form onSubmit={handleLookup} className={styles.trackLookupRow}>
          <input
            className="form-input"
            placeholder="e.g. APP-851R"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Track →
          </button>
        </form>
      </div>

      {loading && (
        <div className={styles.trackEmptyState}>
          <span className="dot-pulse"><span /><span /><span /></span>
        </div>
      )}

      {error && !loading && (
        <div className={styles.errorMsg}>{error}</div>
      )}

      {application && !loading && (
        <>
          {needsRegistration && (
            <div className={styles.trackApprovedBanner}>
              <div>
                <strong>Your application was approved!</strong>
                <p>Create your technician portal username and password to start receiving jobs.</p>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => setShowRegister(true)}
              >
                Register for Portal →
              </button>
            </div>
          )}

        <div className={styles.trackLayout}>
          <div className={styles.trackPanel}>
            <h3 className={styles.trackPanelTitle}>Application Progress</h3>
            <div className={styles.trackTimeline}>
              <div className={`${styles.trackStep} ${stepClass(getStepState("submitted"))}`}>
                <div className={styles.trackStepIcon}>📨</div>
                <div>
                  <div className={styles.trackStepLabel}>Step 1</div>
                  <div className={styles.trackStepTitle}>Application Submitted</div>
                  <div className={styles.trackStepDesc}>Received on {formatDate(application.createdAt)}</div>
                </div>
              </div>

              <div className={`${styles.trackStep} ${stepClass(getStepState("review"))}`}>
                <div className={styles.trackStepIcon}>🔍</div>
                <div>
                  <div className={styles.trackStepLabel}>Step 2</div>
                  <div className={styles.trackStepTitle}>Under Review</div>
                  <div className={styles.trackStepDesc}>
                    {application.status === "pending"
                      ? "Our operations team is reviewing your credentials."
                      : "Review completed."}
                  </div>
                </div>
              </div>

              <div className={`${styles.trackStep} ${stepClass(getStepState("decision"))}`}>
                <div className={styles.trackStepIcon}>
                  {application.status === "rejected" ? "✕" : "✓"}
                </div>
                <div>
                  <div className={styles.trackStepLabel}>Step 3</div>
                  <div className={styles.trackStepTitle}>
                    {application.status === "rejected" ? "Not Approved" : "Decision"}
                  </div>
                  <div className={styles.trackStepDesc}>
                    {application.status === "pending" && "Awaiting approval decision."}
                    {application.status === "approved" && "Congratulations — your application was approved!"}
                    {application.status === "rejected" && "Unfortunately, your application was not approved at this time."}
                  </div>
                </div>
              </div>

              {application.status === "approved" && (
                <div className={`${styles.trackStep} ${stepClass(getStepState("register"))}`}>
                  <div className={styles.trackStepIcon}>🔐</div>
                  <div>
                    <div className={styles.trackStepLabel}>Step 4</div>
                    <div className={styles.trackStepTitle}>Portal Registration</div>
                    <div className={styles.trackStepDesc}>
                      {application.registered
                        ? "Your technician account is ready. Sign in to the portal."
                        : "Create your username and password to access the technician portal."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.trackPanel}>
            <h3 className={styles.trackPanelTitle}>Application Details</h3>
            <div className={styles.trackSummaryGrid}>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Tracking ID</div>
                <div className={`${styles.trackSummaryValue} ${styles.trackTrackingId}`}>{application.id}</div>
              </div>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Status</div>
                <div className={styles.trackSummaryValue}>
                  {application.registered
                    ? "Registered"
                    : application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
              </div>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Name</div>
                <div className={styles.trackSummaryValue}>{application.name}</div>
              </div>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Speciality</div>
                <div className={styles.trackSummaryValue}>
                  {SPECIALITY_LABELS[application.speciality] ?? application.speciality}
                </div>
              </div>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Vehicle</div>
                <div className={styles.trackSummaryValue}>{application.vehicle}</div>
              </div>
              <div className={styles.trackSummaryItem}>
                <div className={styles.trackSummaryLabel}>Plate</div>
                <div className={styles.trackSummaryValue}>{application.plate}</div>
              </div>
            </div>

            {needsRegistration && !showRegister && (
              <div className={styles.trackRegisterCard}>
                <div className={styles.trackRegisterTitle}>Create your technician login</div>
                <p className={styles.trackRegisterSub}>
                  You&apos;ll use this username and password to sign in at the technician portal.
                </p>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => setShowRegister(true)}
                >
                  Register Username &amp; Password →
                </button>
              </div>
            )}

            {registerSuccess && (
              <div className={styles.trackSuccessBox}>{registerSuccess}</div>
            )}

            {application.registered && (
              <div className={styles.trackRegisterCard}>
                <div className={styles.trackRegisterTitle}>Account ready</div>
                <p className={styles.trackRegisterSub}>
                  Sign in to the technician portal with the username and password you created.
                </p>
                <a href={TECHNICIAN_PORTAL_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Go to Technician Portal →
                </a>
              </div>
            )}

            {application.status === "rejected" && (
              <div className={`${styles.trackRegisterCard} ${styles.trackRegisterCardRejected}`}>
                <div className={styles.trackRegisterTitle}>Need help?</div>
                <p className={styles.trackRegisterSub}>
                  Contact our team if you have questions about this decision.
                </p>
                <Link href="/contact" className="btn btn-outline">
                  Contact Support
                </Link>
              </div>
            )}
          </div>
        </div>

        {showRegister && needsRegistration && (
          <div
            className={styles.trackModalOverlay}
            onClick={() => {
              setShowRegister(false);
              setRegisterError("");
            }}
            role="presentation"
          >
            <div
              className={styles.trackModal}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="register-modal-title"
            >
              <h3 id="register-modal-title" className={styles.trackModalTitle}>
                Create Technician Account
              </h3>
              <p className={styles.trackRegisterSub}>
                Choose a username and password you&apos;ll use to sign in to the technician portal.
              </p>
              {registerFormContent}
            </div>
          </div>
        )}
        </>
      )}

      {!activeId && !application && !loading && !error && (
        <div className={styles.trackEmptyState}>
          Enter your tracking ID above to view your application status.
        </div>
      )}
    </section>
  );
}
