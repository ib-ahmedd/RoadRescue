import type { RequestData } from "@/types/request";
import { formatNaira } from "@/lib/locale";
import TrackingTimeline from "./TrackingTimeline";
import styles from "./RequestTracker.module.css";

interface StatusStep {
  icon: string;
  label: string;
  desc: string;
}

interface TrackingStatusPanelProps {
  request: RequestData;
  currentStep: StatusStep;
  currentStatusIndex: number;
  progressPct: number;
  eta: number;
  onShowArrivalModal: () => void;
  onOpenDisputeModal: () => void;
  onOpenConfirmModal: () => void;
  onOpenQuotePayment: () => void;
}

export default function TrackingStatusPanel({
  request,
  currentStep,
  currentStatusIndex,
  progressPct,
  eta,
  onShowArrivalModal,
  onOpenDisputeModal,
  onOpenConfirmModal,
  onOpenQuotePayment,
}: TrackingStatusPanelProps) {
  return (
    <div className={styles.left}>
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

      {request.status === "arrived" && !request.arrivalConfirmed && (
        <div className={styles.confirmBanner}>
          <div className={styles.confirmBannerIcon}>📍</div>
          <div className={styles.confirmBannerText}>
            <p className={styles.confirmBannerTitle}>Confirm technician arrival</p>
            <p className={styles.confirmBannerSub}>
              Your technician has marked themselves as arrived. Please confirm they are at your location.
            </p>
          </div>
          <button
            id="confirm-arrival-btn"
            className="btn btn-primary btn-sm"
            onClick={onShowArrivalModal}
          >
            Confirm Arrival
          </button>
        </div>
      )}

      {(request.status === "awaiting-payment" ||
        (request.quoteStatus === "approved" && request.status !== "completed")) && (
        <div className={styles.confirmBanner}>
          <div className={styles.confirmBannerIcon}>💳</div>
          <div className={styles.confirmBannerText}>
            <p className={styles.confirmBannerTitle}>Service quote approved</p>
            <p className={styles.confirmBannerSub}>
              Your technician assessed the situation. Pay the additional service charge of{" "}
              {formatNaira(request.quoteAmount ?? 0)} (booking fee already paid separately).
            </p>
            {request.technicianAssessment && (
              <p className={styles.confirmBannerSub} style={{ marginTop: "0.5rem" }}>
                {request.technicianAssessment}
              </p>
            )}
          </div>
          <button
            id="pay-quote-btn"
            className="btn btn-primary btn-sm"
            onClick={onOpenQuotePayment}
          >
            Make payment
          </button>
        </div>
      )}

      {request.quoteStatus === "paid" && (
        <div className={styles.completedBanner}>
          <span style={{ fontSize: "1.5rem" }}>✅</span>
          <div>
            <p className={styles.confirmBannerTitle}>Service quote paid</p>
            <p className={styles.confirmBannerSub}>
              Reference: {request.quotePaymentReference || "—"}
            </p>
          </div>
        </div>
      )}

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
            onClick={onOpenDisputeModal}
          >
            ⚠️ Raise Dispute
          </button>
        </div>
      )}

      {request.status !== "completed" && (
        <div className={styles.etaCard} style={{
          border: request.assignedProvider ? "1px solid rgba(34,197,94,0.2)" : "1px solid var(--border-md)",
          background: request.assignedProvider
            ? "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.04))"
            : "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))"
        }}>
          {request.assignedProvider ? (
            ["arrived", "assessing", "awaiting-payment", "in-progress"].includes(request.status) ? (
              <>
                <div className={styles.etaMain}>
                  <span className={styles.etaNumber} style={{ fontSize: "1.25rem" }}>On site</span>
                </div>
                <div className={styles.etaDetails}>
                  <span>
                    {request.status === "awaiting-payment"
                      ? "💳 Awaiting your payment for the approved quote"
                      : request.status === "in-progress"
                        ? "🛠️ Technician is carrying out the service"
                        : request.status === "assessing"
                          ? "🔍 Technician is assessing your situation"
                          : "📍 Technician is at your location"}
                  </span>
                  <span>🚛 {request.assignedProvider.vehicle}</span>
                </div>
              </>
            ) : (
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
            )
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

      <TrackingTimeline
        currentStatusIndex={currentStatusIndex}
        progressPct={progressPct}
      />

      {(request.status === "in-progress" ||
        (request.status === "arrived" && request.arrivalConfirmed)) && (
        <div className={styles.completionCta} role="region" aria-label="Confirm job completion">
          <div className={styles.completionCtaGlow} aria-hidden />
          <div className={styles.completionCtaInner}>
            <div className={styles.completionCtaIconWrap}>
              <span className={styles.completionCtaIcon}>✅</span>
              <span className={styles.completionCtaPulse} aria-hidden />
            </div>
            <div className={styles.completionCtaBody}>
              <span className={styles.completionCtaEyebrow}>Action required</span>
              <h3 className={styles.completionCtaTitle}>Is your roadside issue resolved?</h3>
              <p className={styles.completionCtaSub}>
                Your technician is on site. Confirm completion once the job is finished.
              </p>
            </div>
            <button
              id="confirm-completion-btn"
              type="button"
              className={styles.completionCtaBtn}
              onClick={onOpenConfirmModal}
            >
              ✅ Confirm Job Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
