import type { RequestData } from "@/types/request";
import styles from "../RequestTracker.module.css";

interface ConfirmArrivalModalProps {
  request: RequestData;
  submitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmArrivalModal({
  request,
  submitting,
  onClose,
  onConfirm,
}: ConfirmArrivalModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={() => !submitting && onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIcon}>📍</div>
        <h3 className={styles.modalTitle}>Technician Has Arrived</h3>
        <p className={styles.modalDesc}>
          {request.assignedProvider ? (
            <>
              <strong>{request.assignedProvider.name}</strong> has marked themselves as arrived at your location.
              Please confirm they are with you before service begins.
            </>
          ) : (
            <>Your technician has marked themselves as arrived. Please confirm they are at your location.</>
          )}
        </p>
        <div className={styles.modalNote}>
          <span>ℹ️</span>
          <span>If they haven&apos;t arrived yet, tap &quot;Not Yet&quot; and we&apos;ll keep tracking their status.</span>
        </div>
        <div className={styles.modalActions}>
          <button
            id="cancel-arrival-btn"
            className="btn btn-outline"
            onClick={onClose}
            disabled={submitting}
          >
            Not Yet
          </button>
          <button
            id="submit-arrival-btn"
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? "Confirming..." : "Yes, They've Arrived"}
          </button>
        </div>
      </div>
    </div>
  );
}
