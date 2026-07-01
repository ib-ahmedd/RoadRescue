import { LOCALE } from "@/lib/locale";
import styles from "../RequestTracker.module.css";

interface ConfirmCompletionModalProps {
  submitting: boolean;
  confirmSatisfied: boolean;
  confirmLiabilityAck: boolean;
  canConfirmCompletion: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onConfirmSatisfiedChange: (checked: boolean) => void;
  onConfirmLiabilityAckChange: (checked: boolean) => void;
}

export default function ConfirmCompletionModal({
  submitting,
  confirmSatisfied,
  confirmLiabilityAck,
  canConfirmCompletion,
  onClose,
  onConfirm,
  onConfirmSatisfiedChange,
  onConfirmLiabilityAckChange,
}: ConfirmCompletionModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={() => !submitting && onClose()}>
      <div className={`${styles.modal} ${styles.confirmModal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIcon}>✅</div>
        <h3 className={styles.modalTitle}>Confirm Job Completion</h3>
        <p className={styles.modalDesc}>
          Before marking this request complete, please review and confirm both statements below.
        </p>

        <div className={styles.confirmChecklist}>
          <label className={`${styles.confirmCheckItem} ${confirmSatisfied ? styles.confirmCheckItemChecked : ""}`}>
            <input
              id="confirm-satisfied"
              type="checkbox"
              className={styles.confirmCheckbox}
              checked={confirmSatisfied}
              onChange={(e) => onConfirmSatisfiedChange(e.target.checked)}
              disabled={submitting}
            />
            <span className={styles.confirmCheckBox} aria-hidden>
              {confirmSatisfied && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className={styles.confirmCheckText}>
              I confirm the roadside service was fulfilled to my satisfaction.
            </span>
          </label>

          <label className={`${styles.confirmCheckItem} ${confirmLiabilityAck ? styles.confirmCheckItemChecked : ""}`}>
            <input
              id="confirm-liability"
              type="checkbox"
              className={styles.confirmCheckbox}
              checked={confirmLiabilityAck}
              onChange={(e) => onConfirmLiabilityAckChange(e.target.checked)}
              disabled={submitting}
            />
            <span className={styles.confirmCheckBox} aria-hidden>
              {confirmLiabilityAck && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className={styles.confirmCheckText}>
              I acknowledge that {LOCALE.companyName} will not be liable if the request was incomplete and I mark it as completed.
            </span>
          </label>
        </div>

        <div className={styles.modalNote}>
          <span>⚠️</span>
          <span>If the job is not fully done, tap &quot;Not Yet&quot; and contact support or raise a dispute after completion.</span>
        </div>

        <div className={styles.modalActions}>
          <button
            id="cancel-confirm-btn"
            className="btn btn-outline"
            onClick={onClose}
            disabled={submitting}
          >
            Not Yet
          </button>
          <button
            id="submit-confirm-btn"
            className="btn btn-success"
            onClick={onConfirm}
            disabled={submitting || !canConfirmCompletion}
          >
            {submitting ? "Confirming..." : "✅ Yes, Job Completed"}
          </button>
        </div>
      </div>
    </div>
  );
}
