import { JOIN_SPECIALITIES } from "./TechnicianRegistrationForm";
import styles from "./join.module.css";

interface RegisteredData {
  id: string;
  name: string;
  speciality: string;
  licenseId: string;
  status: string;
}

interface JoinSuccessStateProps {
  registeredData: RegisteredData | null;
  onViewStatus: () => void;
  onReset: () => void;
}

export default function JoinSuccessState({ registeredData, onViewStatus, onReset }: JoinSuccessStateProps) {
  return (
    <div className={styles.successState}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>Application Submitted!</h2>
      <p className={styles.successText}>
        Save your tracking ID below. Scroll down to track your application and complete portal registration once
        approved.
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
              {JOIN_SPECIALITIES.find((s) => s.value === registeredData.speciality)?.label
                .split(" ")
                .slice(1)
                .join(" ") || registeredData.speciality}
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
        <button type="button" className="btn btn-primary w-full" onClick={onViewStatus}>
          View Application Status ↓
        </button>
        <button type="button" onClick={onReset} className="btn btn-outline w-full" id="tech-reset">
          Submit Another Application
        </button>
      </div>
    </div>
  );
}
