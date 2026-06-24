"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import styles from "./TrackView.module.css";

interface Provider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  rating: number;
  reviews: number;
  status: string;
  avatar: string;
}

interface RequestData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  vehicleType: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  location: string;
  landmark?: string;
  notes?: string;
  status: "received" | "matched" | "en-route" | "arrived" | "completed";
  assignedProvider: Provider | null;
  contacted: boolean;
  createdAt: string;
}

const STATUSES = [
  { key: "received",  label: "Request Received",     icon: "📋", desc: "Your request has been received and is being reviewed by our dispatcher." },
  { key: "matched",   label: "Technician Matched",   icon: "👷", desc: "We've matched you with a professional technician from our network." },
  { key: "en-route",  label: "Technician En Route",  icon: "🚛", desc: "Your technician is on the way to your location." },
  { key: "arrived",   label: "Technician Arrived",   icon: "📍", desc: "Your technician has arrived at your location." },
  { key: "completed", label: "Job Completed",        icon: "✅", desc: "Your assistance is complete. Drive safe!" },
];

const DISPUTE_REASONS = [
  "Technician did not arrive",
  "Service was incomplete or unsatisfactory",
  "Technician was unprofessional or rude",
  "Charged incorrectly or overcharged",
  "Technician arrived very late",
  "Vehicle was damaged during service",
  "Other issue",
];

export default function TrackView() {
  const params = useSearchParams();
  const router = useRouter();
  const requestId = params.get("id");
  
  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lookupId, setLookupId] = useState("");
  const [eta, setEta] = useState(15);

  // Confirm completion modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmSubmitting, setConfirmSubmitting] = useState(false);

  // Dispute modal
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState(DISPUTE_REASONS[0]);
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [disputeId, setDisputeId] = useState("");

  const fetchRequest = useCallback(async (id: string, isPoll = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/requests?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setRequest(data);
        setError("");
        
        // Dynamic mock ETA based on status
        if (data.status === "received") setEta(20);
        else if (data.status === "matched") setEta(15);
        else if (data.status === "en-route") setEta(8);
        else if (data.status === "arrived") setEta(0);
        else if (data.status === "completed") setEta(0);
      } else {
        if (!isPoll) {
          setError("Request not found. Please double check the ID.");
          setRequest(null);
        }
      }
    } catch (err) {
      console.error("Error fetching request:", err);
      if (!isPoll) {
        setError("Failed to connect to the server.");
      }
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  // Fetch on load and set up polling
  useEffect(() => {
    if (requestId) {
      setLoading(true);
      fetchRequest(requestId);

      const interval = setInterval(() => {
        fetchRequest(requestId, true);
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [requestId, fetchRequest]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupId.trim()) {
      router.push(`/track?id=${lookupId.trim().toUpperCase()}`);
    }
  };

  const handleDemoStatus = async (newStatusKey: string) => {
    if (!request) return;
    // If advancing to "completed", show the confirmation modal instead
    if (newStatusKey === "completed") {
      setShowConfirmModal(true);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id, status: newStatusKey }),
      });
      if (res.ok) {
        const data = await res.json();
        setRequest(data);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleConfirmCompletion = async () => {
    if (!request) return;
    setConfirmSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id, status: "completed" }),
      });
      if (res.ok) {
        const data = await res.json();
        setRequest(data);
        setShowConfirmModal(false);
      }
    } catch (err) {
      console.error("Failed to confirm completion:", err);
    } finally {
      setConfirmSubmitting(false);
    }
  };

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || !disputeDescription.trim()) return;
    setDisputeSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/disputes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: request.id,
          customerName: request.name,
          customerPhone: request.phone,
          reason: disputeReason,
          description: disputeDescription.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setDisputeId(data.dispute?.id || "");
        setDisputeSuccess(true);
        setDisputeDescription("");
      }
    } catch (err) {
      console.error("Failed to submit dispute:", err);
    } finally {
      setDisputeSubmitting(false);
    }
  };

  // Map status key to its index
  const currentStatusIndex = request
    ? STATUSES.findIndex((s) => s.key === request.status)
    : 0;

  const currentStep = STATUSES[currentStatusIndex];
  const progressPct = (currentStatusIndex / (STATUSES.length - 1)) * 100;

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <span className="badge badge-success">Live Tracking</span>
            <h1 className={styles.pageTitle}>
              Track Your <span className="gradient-text">Request</span>
            </h1>
            {request && (
              <p className={styles.pageSub}>
                Request ID: <strong style={{ color: "var(--amber)", fontFamily: "monospace" }}>{request.id}</strong>
              </p>
            )}
          </div>

          {/* Lookup form */}
          <form onSubmit={handleLookup} className={styles.lookupCard}>
            <p className={styles.lookupLabel}>Track a different request</p>
            <div className={styles.lookupRow}>
              <input
                id="track-lookup-input"
                className="form-input"
                type="text"
                placeholder="Enter Request ID (e.g. RR-ABC123)"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" id="track-lookup-btn">Search</button>
            </div>
          </form>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <span className="dot-pulse"><span/><span/><span/></span>
            <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>Loading tracking panel...</p>
          </div>
        ) : error || !request ? (
          <div style={{
            background: "var(--bg-800)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            padding: "4rem 2rem",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <span style={{ fontSize: "3rem" }}>🔍</span>
            <h2 style={{ margin: "1.5rem 0 0.5rem" }}>{error ? "Request Not Found" : "No Active Request"}</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              {error || "Submit a new request or enter an existing request ID above to track help live."}
            </p>
            <Link href="/request" className="btn btn-primary">
              🚨 Request Help Now
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Left — Status + Timeline */}
            <div className={styles.left}>

              {/* Status Hero */}
              <div className={styles.statusHero}>
                <div className={styles.statusIconWrap}>
                  <span className={styles.statusIcon}>{currentStep.icon}</span>
                  <span className={styles.statusPulse} />
                </div>
                <div>
                  <p className={styles.statusLabel}>Current Status</p>
                  <h2 className={styles.statusTitle}>{currentStep.label}</h2>
                  <p className={styles.statusDesc}>{currentStep.desc}</p>
                </div>
              </div>

              {/* Completion confirmation banner — shown when status is "arrived" */}
              {request.status === "arrived" && (
                <div className={styles.confirmBanner}>
                  <div className={styles.confirmBannerIcon}>📍</div>
                  <div className={styles.confirmBannerText}>
                    <p className={styles.confirmBannerTitle}>Technician has arrived!</p>
                    <p className={styles.confirmBannerSub}>Once the job is done, confirm completion below.</p>
                  </div>
                  <button
                    id="confirm-completion-btn"
                    className="btn btn-success btn-sm"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    ✅ Confirm Completion
                  </button>
                </div>
              )}

              {/* Completed — show dispute option */}
              {request.status === "completed" && (
                <div className={styles.completedBanner}>
                  <span style={{ fontSize: "1.5rem" }}>🎉</span>
                  <div>
                    <p className={styles.confirmBannerTitle}>Job Completed — Thank you!</p>
                    <p className={styles.confirmBannerSub}>Encountered an issue?</p>
                  </div>
                  <button
                    id="raise-dispute-btn"
                    className="btn btn-outline btn-sm"
                    style={{ borderColor: "rgba(239,68,68,0.4)", color: "var(--danger)", flexShrink: 0 }}
                    onClick={() => { setDisputeSuccess(false); setShowDisputeModal(true); }}
                  >
                    ⚠️ Raise Dispute
                  </button>
                </div>
              )}

              {/* ETA Card */}
              {request.status !== "completed" && (
                <div className={styles.etaCard} style={{
                  border: request.assignedProvider ? "1px solid rgba(34,197,94,0.2)" : "1px solid var(--border-md)",
                  background: request.assignedProvider 
                    ? "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.04))"
                    : "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))"
                }}>
                  {request.assignedProvider ? (
                    <>
                      <div className={styles.etaMain}>
                        <span className={styles.etaNumber}>{eta}</span>
                        <span className={styles.etaUnit}>min away</span>
                      </div>
                      <div className={styles.etaDetails}>
                        <span>📍 Nearby, en route to your location</span>
                        <span>🚛 {request.assignedProvider.vehicle}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.etaMain}>
                        <span className={styles.etaNumber}>--</span>
                        <span className={styles.etaUnit} style={{ color: "var(--amber)" }}>pending</span>
                      </div>
                      <div className={styles.etaDetails}>
                        <span>⏳ Waiting to assign nearest technician</span>
                        <span>📋 Request is under review by dispatcher</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Progress bar */}
              <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
                </div>
                <div className={styles.timeline}>
                  {STATUSES.map((s, i) => (
                    <div key={s.key} className={`${styles.timelineStep} ${i <= currentStatusIndex ? styles.done : ""} ${i === currentStatusIndex ? styles.current : ""}`}>
                      <div className={styles.tDot}>
                        {i < currentStatusIndex ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : i === currentStatusIndex ? (
                          <span className={styles.tDotInner} />
                        ) : null}
                      </div>
                      <div className={styles.tLabel}>
                        <span className={styles.tIcon}>{s.icon}</span>
                        <span>{s.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo controls */}
              <div className={styles.demoControls}>
                <p className={styles.demoLabel}>🎮 Demo: Simulate status change</p>
                <div className={styles.demoRow}>
                  <button className="btn btn-outline btn-sm" id="demo-prev"
                    onClick={() => handleDemoStatus(STATUSES[Math.max(currentStatusIndex - 1, 0)].key)}
                    disabled={currentStatusIndex === 0}>← Previous</button>
                  <button className="btn btn-primary btn-sm" id="demo-next"
                    onClick={() => handleDemoStatus(STATUSES[Math.min(currentStatusIndex + 1, STATUSES.length - 1)].key)}
                    disabled={currentStatusIndex === STATUSES.length - 1 || (!request.assignedProvider && currentStatusIndex === 0)}>
                    Next Status →
                  </button>
                </div>
                {!request.assignedProvider && currentStatusIndex === 0 && (
                  <p style={{ fontSize: "0.75rem", color: "var(--amber)", marginTop: "0.5rem" }}>
                    ℹ️ You can assign a provider in the Admin Dashboard to advance the status.
                  </p>
                )}
              </div>
            </div>

            {/* Right — Technician + Map placeholder */}
            <div className={styles.right}>
              {/* Technician card */}
              <div className={styles.techCard}>
                <h3 className={styles.techCardTitle}>Your Technician</h3>
                {request.assignedProvider ? (
                  <>
                    <div className={styles.techProfile}>
                      <div className={styles.techAvatar}>{request.assignedProvider.avatar}</div>
                      <div>
                        <p className={styles.techName}>{request.assignedProvider.name}</p>
                        <div className={styles.techRating}>
                          <span style={{ color: "var(--amber)" }}>★</span>
                          <span>{request.assignedProvider.rating}</span>
                          <span style={{ color: "var(--text-muted)" }}>({request.assignedProvider.reviews} reviews)</span>
                        </div>
                      </div>
                      <a href={`tel:${request.assignedProvider.phone}`} className={`btn btn-outline btn-sm ${styles.callBtn}`} id="tech-call-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 16 16 0 01-6.29-6.29A19.79 19.79 0 012.07 6.18 2 2 0 014 4h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 11.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                        Call
                      </a>
                    </div>
                    <div className={styles.techMeta}>
                      <span><strong>Vehicle:</strong> {request.assignedProvider.vehicle}</span>
                      <span><strong>Plate:</strong> {request.assignedProvider.plate}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "1rem 0", textAlign: "center", color: "var(--text-secondary)" }}>
                    <span style={{ fontSize: "2rem" }}>🔍</span>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: 500 }}>Searching for technician...</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      Once our dispatcher assigns a service provider, their details and phone number will appear here.
                    </p>
                  </div>
                )}
              </div>

              {/* Map placeholder */}
              <div className={styles.mapCard}>
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapGrid} />
                  
                  {request.assignedProvider ? (
                    <>
                      {/* Simulated route and pins */}
                      <div className={styles.mapTechPin}>
                        <span className={styles.mapPinPulse} />
                        <span className={styles.mapPinIcon}>🚛</span>
                      </div>
                      <div className={styles.mapYouPin}>
                        <span className={styles.mapYouPulse} />
                        <span className={styles.mapYouIcon}>📍</span>
                      </div>
                      <svg className={styles.mapRoute} viewBox="0 0 400 300" fill="none">
                        <path d="M80 80 Q200 120 320 240" stroke="var(--amber)" strokeWidth="2.5" strokeDasharray="8 4"/>
                      </svg>
                    </>
                  ) : (
                    <div className={styles.mapYouPin} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                      <span className={styles.mapYouPulse} />
                      <span className={styles.mapYouIcon}>📍</span>
                    </div>
                  )}
                  
                  <div className={styles.mapOverlay}>
                    <span>🗺️ Live GPS Tracking</span>
                    <span className={styles.mapNote}>
                      {request.assignedProvider ? "Tracking technician en route" : "GPS localized. Matching nearest unit."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency */}
              <div className={styles.emergencyCard}>
                <span className={styles.emergencyIcon}>🚨</span>
                <div>
                  <p className={styles.emergencyTitle}>Need immediate help?</p>
                  <p className={styles.emergencySub}>Call our 24/7 emergency line</p>
                </div>
                <a href="tel:+18005550199" className="btn btn-danger btn-sm" id="track-emergency-call">
                  Call Now
                </a>
              </div>

              <Link href="/request" className={`btn btn-outline w-full ${styles.newReq}`} id="track-new-request">
                + Submit a New Request
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Completion Modal ── */}
      {showConfirmModal && (
        <div className={styles.modalOverlay} onClick={() => !confirmSubmitting && setShowConfirmModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>✅</div>
            <h3 className={styles.modalTitle}>Confirm Job Completion</h3>
            <p className={styles.modalDesc}>
              Please confirm that the technician has completed the service to your satisfaction. 
              Once confirmed, this request will be marked as <strong>completed</strong>.
            </p>
            <div className={styles.modalNote}>
              <span>⚠️</span>
              <span>If you experienced any issues, you can raise a dispute after confirming.</span>
            </div>
            <div className={styles.modalActions}>
              <button
                id="cancel-confirm-btn"
                className="btn btn-outline"
                onClick={() => setShowConfirmModal(false)}
                disabled={confirmSubmitting}
              >
                Not Yet
              </button>
              <button
                id="submit-confirm-btn"
                className="btn btn-success"
                onClick={handleConfirmCompletion}
                disabled={confirmSubmitting}
              >
                {confirmSubmitting ? "Confirming..." : "✅ Yes, Job Completed"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Raise Dispute Modal ── */}
      {showDisputeModal && (
        <div className={styles.modalOverlay} onClick={() => !disputeSubmitting && setShowDisputeModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {disputeSuccess ? (
              <>
                <div className={styles.modalIcon}>🗂️</div>
                <h3 className={styles.modalTitle}>Dispute Submitted</h3>
                <p className={styles.modalDesc}>
                  Your dispute has been logged and our team will review it shortly.
                </p>
                {disputeId && (
                  <div className={styles.disputeIdBadge}>
                    Dispute ID: <strong style={{ fontFamily: "monospace", color: "var(--amber)" }}>{disputeId}</strong>
                  </div>
                )}
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Keep this ID for reference. We&apos;ll contact you at <strong>{request?.phone}</strong>.
                </p>
                <div className={styles.modalActions} style={{ marginTop: "1.5rem" }}>
                  <button className="btn btn-primary" onClick={() => setShowDisputeModal(false)}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.modalIcon} style={{ background: "rgba(239,68,68,0.1)", color: "var(--danger)" }}>⚠️</div>
                <h3 className={styles.modalTitle}>Raise a Dispute</h3>
                <p className={styles.modalDesc}>
                  We&apos;re sorry you had an issue. Please describe what went wrong and our team will investigate.
                </p>
                <form onSubmit={handleSubmitDispute} className={styles.disputeForm}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="dispute-reason">Reason for Dispute *</label>
                    <select
                      id="dispute-reason"
                      className="form-input"
                      style={{ background: "#0c1020" }}
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                    >
                      {DISPUTE_REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="dispute-description">Describe the Issue *</label>
                    <textarea
                      id="dispute-description"
                      className="form-input"
                      rows={4}
                      placeholder="Please provide as much detail as possible about what happened..."
                      value={disputeDescription}
                      onChange={(e) => setDisputeDescription(e.target.value)}
                      required
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  <div className={styles.modalActions} style={{ marginTop: "1.25rem" }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowDisputeModal(false)}
                      disabled={disputeSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      id="submit-dispute-btn"
                      type="submit"
                      className="btn btn-danger"
                      disabled={disputeSubmitting || !disputeDescription.trim()}
                    >
                      {disputeSubmitting ? "Submitting..." : "⚠️ Submit Dispute"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
