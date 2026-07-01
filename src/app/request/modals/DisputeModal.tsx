import { DISPUTE_REASONS } from "@/constants/requestTracker";
import styles from "../RequestTracker.module.css";

interface DisputeModalProps {
  submitting: boolean;
  success: boolean;
  disputeId: string;
  disputeReason: string;
  disputeDescription: string;
  customerPhone?: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onDisputeReasonChange: (reason: string) => void;
  onDisputeDescriptionChange: (description: string) => void;
}

export default function DisputeModal({
  submitting,
  success,
  disputeId,
  disputeReason,
  disputeDescription,
  customerPhone,
  onClose,
  onSubmit,
  onDisputeReasonChange,
  onDisputeDescriptionChange,
}: DisputeModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={() => !submitting && onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {success ? (
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
              Keep this ID for reference. We&apos;ll contact you at <strong>{customerPhone}</strong>.
            </p>
            <div className={styles.modalActions} style={{ marginTop: "1.5rem" }}>
              <button className="btn btn-primary" onClick={onClose}>
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
            <form onSubmit={onSubmit} className={styles.disputeForm}>
              <div className="form-group">
                <label className="form-label" htmlFor="dispute-reason">Reason for Dispute *</label>
                <select
                  id="dispute-reason"
                  className="form-input"
                  style={{ background: "#0c1020" }}
                  value={disputeReason}
                  onChange={(e) => onDisputeReasonChange(e.target.value)}
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
                  onChange={(e) => onDisputeDescriptionChange(e.target.value)}
                  required
                  style={{ resize: "vertical" }}
                />
              </div>
              <div className={styles.modalActions} style={{ marginTop: "1.25rem" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  id="submit-dispute-btn"
                  type="submit"
                  className="btn btn-danger"
                  disabled={submitting || !disputeDescription.trim()}
                >
                  {submitting ? "Submitting..." : "⚠️ Submit Dispute"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
