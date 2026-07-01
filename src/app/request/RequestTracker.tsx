"use client";

import { LOCALE } from "@/lib/locale";
import { useRequestTracking } from "@/hooks/useRequestTracking";
import RequestLookupForms from "./RequestLookupForms";
import TrackingStatusPanel from "./TrackingStatusPanel";
import TechnicianCard from "./TechnicianCard";
import TrackingMapPlaceholder from "./TrackingMapPlaceholder";
import ConfirmArrivalModal from "./modals/ConfirmArrivalModal";
import ConfirmCompletionModal from "./modals/ConfirmCompletionModal";
import DisputeModal from "./modals/DisputeModal";
import PaymentGatewayModal from "./PaymentGatewayModal";
import styles from "./RequestTracker.module.css";

interface RequestTrackerProps {
  activeId: string | null;
  onActiveIdChange: (id: string) => void;
  onTrackingActiveChange?: (active: boolean) => void;
  onClearTracking?: () => void;
}

export default function RequestTracker({
  activeId,
  onActiveIdChange,
  onTrackingActiveChange,
  onClearTracking,
}: RequestTrackerProps) {
  const t = useRequestTracking({ activeId, onActiveIdChange, onTrackingActiveChange, onClearTracking });

  return (
    <section id="track-request" className={styles.section}>
      <div className="container">
        {t.showLookupForms ? (
          <RequestLookupForms
            activeLookup={t.activeLookup}
            setActiveLookup={t.setActiveLookup}
            activeLookupLoading={t.activeLookupLoading}
            activeLookupError={t.activeLookupError}
            lookupId={t.lookupId}
            setLookupId={t.setLookupId}
            requestId={t.requestId}
            error={t.error}
            onActiveLookup={t.handleActiveLookup}
            onLookup={t.handleLookup}
          />
        ) : (
          <div className={styles.sectionHeader}>
            <span className="badge badge-success">Live Tracking</span>
            <h2 className={styles.sectionTitle}>
              Your <span className="gradient-text">Request</span>
            </h2>
            <p className={styles.sectionSub}>
              {t.request && (
                <>
                  Request ID:{" "}
                  <strong style={{ color: "var(--amber)", fontFamily: "monospace" }}>{t.request.id}</strong>
                </>
              )}
              {t.syncWarning && (
                <span style={{ display: "block", marginTop: "0.35rem", color: "var(--warning, #f59e0b)", fontSize: "0.85rem" }}>
                  {t.syncWarning}
                </span>
              )}
            </p>
          </div>
        )}

        {t.isTrackingActive && t.loading ? (
          <div className={styles.trackLoading}>
            <span className="dot-pulse"><span/><span/><span/></span>
            <p>Loading tracking panel...</p>
          </div>
        ) : t.isTrackingActive && t.request ? (
          <div className={styles.layout}>
            <TrackingStatusPanel
              request={t.request}
              currentStep={t.currentStep}
              currentStatusIndex={t.currentStatusIndex}
              progressPct={t.progressPct}
              eta={t.eta}
              onShowArrivalModal={() => t.setShowArrivalModal(true)}
              onOpenDisputeModal={t.openDisputeModal}
              onOpenConfirmModal={t.openConfirmModal}
              onOpenQuotePayment={() => t.setShowQuotePaymentModal(true)}
            />
            <div className={styles.right}>
              <TechnicianCard assignedProvider={t.request.assignedProvider} />
              <TrackingMapPlaceholder assignedProvider={t.request.assignedProvider} />
              <div className={styles.emergencyCard}>
                <span className={styles.emergencyIcon}>🚨</span>
                <div>
                  <p className={styles.emergencyTitle}>Need immediate help?</p>
                  <p className={styles.emergencySub}>Call our 24/7 emergency line</p>
                </div>
                <a href={`tel:${LOCALE.emergencyTel}`} className="btn btn-danger btn-sm" id="track-emergency-call">
                  Call Now
                </a>
              </div>
              <button
                type="button"
                className={`btn btn-outline w-full ${styles.newReq}`}
                id="track-new-request"
                onClick={() => onClearTracking?.()}
              >
                + Submit a New Request
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {t.showArrivalModal && t.request && (
        <ConfirmArrivalModal
          request={t.request}
          submitting={t.arrivalSubmitting}
          onClose={() => t.setShowArrivalModal(false)}
          onConfirm={t.handleConfirmArrival}
        />
      )}
      {t.showConfirmModal && (
        <ConfirmCompletionModal
          submitting={t.confirmSubmitting}
          confirmSatisfied={t.confirmSatisfied}
          confirmLiabilityAck={t.confirmLiabilityAck}
          canConfirmCompletion={t.canConfirmCompletion}
          onClose={t.closeConfirmModal}
          onConfirm={t.handleConfirmCompletion}
          onConfirmSatisfiedChange={t.setConfirmSatisfied}
          onConfirmLiabilityAckChange={t.setConfirmLiabilityAck}
        />
      )}
      {t.showDisputeModal && (
        <DisputeModal
          submitting={t.disputeSubmitting}
          success={t.disputeSuccess}
          disputeId={t.disputeId}
          disputeReason={t.disputeReason}
          disputeDescription={t.disputeDescription}
          customerPhone={t.request?.phone}
          onClose={() => t.setShowDisputeModal(false)}
          onSubmit={t.handleSubmitDispute}
          onDisputeReasonChange={t.setDisputeReason}
          onDisputeDescriptionChange={t.setDisputeDescription}
        />
      )}
      {t.request &&
        (t.request.status === "awaiting-payment" ||
          (t.request.quoteStatus === "approved" && t.request.status !== "completed")) && (
        <PaymentGatewayModal
          open={t.showQuotePaymentModal}
          title="Pay Service Quote"
          serviceLabel="Additional service charge"
          bookingFee={t.request.quoteAmount ?? 0}
          onClose={t.closeQuotePaymentModal}
          onSuccess={t.payQuoteAfterPayment}
        />
      )}
    </section>
  );
}
